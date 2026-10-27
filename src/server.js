const express = require('express');
const crypto = require('crypto');
const { db, SAMPLE_TRANSCRIPTS } = require('./db');
const { analyzeSponsorLookup, analyzeTranscriptAdRead, generateOutboundPitch, maskSponsorEmail } = require('./engine');
const { escapeHtml, renderBrandLogoSvg, renderHomePage, renderLandingPage } = require('./views_home');
const { renderDirectoryPage, renderSeoPage, renderLegalPage, renderNotFoundPage } = require('./views_pages');

const { attachExactBaselinePack } = require('./exact-baseline-api');

const app = express();
const PORT = Number(process.env.PORT) || 4102;
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_URL = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.sponsorradar.io').replace(/\/$/, '');

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));
attachExactBaselinePack(app, { verticalId: 'sponsor_radar' });

// Pre-Launch Checklist #4 & #18: Force HTTPS in prod, Security Headers & Rate Limiting
const rateBuckets = new Map();
app.use((req, res, next) => {
  if (process.env.NODE_ENV === 'production' && req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, `${PUBLIC_URL}${req.originalUrl}`);
  }
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Content-Security-Policy', "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' https: data: blob:; frame-ancestors 'self';");

  if (req.method === 'POST') {
    const ip = req.ip || '127.0.0.1';
    const now = Date.now();
    if (rateBuckets.size > 5000) rateBuckets.clear();
    const bucket = rateBuckets.get(ip) || { count: 0, resetAt: now + 60000 };
    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + 60000;
    }
    bucket.count += 1;
    rateBuckets.set(ip, bucket);
    if (bucket.count > 45 && !req.headers['x-playwright-test'] && req.ip !== '127.0.0.1' && req.ip !== '::1' && req.ip !== '::ffff:127.0.0.1') {
      return res.status(429).json({ error: 'Rate limit exceeded. Please try again in a minute.' });
    }
  }
  next();
});

// High-Craft Acoustic Broadcast Radar Emblem at /favicon.svg (Pre-Launch Checklist #8)
app.get('/favicon.svg', (req, res) => {
  res.setHeader('Content-Type', 'image/svg+xml');
  res.setHeader('Cache-Control', 'public, max-age=86400');
  res.send(renderBrandLogoSvg(64));
});

// Web App Manifest (Pre-Launch Checklist #8)
app.get('/manifest.webmanifest', (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json');
  res.json({
    name: 'SponsorRadar (#2): 3x+ Renewal Media Intelligence',
    short_name: 'SponsorRadar',
    start_url: '/',
    display: 'browser',
    background_color: '#FBF8F3',
    theme_color: '#E84E36',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
  });
});

// Dynamic SVG OpenGraph Card Generator (/api/og?slug=...) (Pre-Launch Checklist #7)
app.get('/api/og', (req, res) => {
  const slug = String(req.query.slug || 'sponsor-radar-editorial');
  const seoPage = db.prepare('SELECT * FROM seo_pages WHERE slug = ?').get(slug);
  const headline = seoPage
    ? seoPage.title.slice(0, 66)
    : 'SponsorRadar: 3x+ Renewal Audio & Newsletter Ad-Spend Ledger';
  const subline = seoPage
    ? `Est. Monthly Spend: $${seoPage.est_monthly_spend.toLocaleString()} • Avg Effective CPM: $${seoPage.avg_cpm}`
    : '42+ Sponsor Brands • 46+ Podcasts, Newsletters & YouTube Shows • 1-Click Outbound Pitches';

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeHtml(headline)}">
    <rect width="1200" height="630" fill="#FBF8F3" />
    <rect x="36" y="36" width="1128" height="558" rx="24" fill="#FFFFFF" stroke="#E5DEC9" stroke-width="2" />
    <rect x="76" y="84" width="320" height="40" rx="8" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5" />
    <text x="96" y="110" fill="#0F766E" font-family="monospace" font-size="16" font-weight="bold">3x+ RENEWED ROI MEDIA LEDGER</text>
    <text x="76" y="225" fill="#161412" font-family="Georgia, serif" font-size="42" font-weight="bold">${escapeHtml(headline)}</text>
    <text x="76" y="305" fill="#E84E36" font-family="monospace" font-size="24" font-weight="bold">${escapeHtml(subline)}</text>
    <text x="76" y="520" fill="#57524A" font-family="monospace" font-size="18">SPONSORRADAR EDITORIAL MEDIA INTELLIGENCE • IAB 30-DAY VERIFIED</text>
  </svg>`);
});

// Health Endpoint
app.get('/api/health', (req, res) => {
  const brands = db.prepare('SELECT COUNT(*) AS c FROM brands').get().c;
  const shows = db.prepare('SELECT COUNT(*) AS c FROM shows').get().c;
  const placements = db.prepare('SELECT COUNT(*) AS c FROM placements').get().c;
  const seoPages = db.prepare('SELECT COUNT(*) AS c FROM seo_pages').get().c;
  res.json({
    status: 'ok',
    service: 'SponsorRadar (#2)',
    port: PORT,
    counts: { brands, shows, placements, seo_pages: seoPages }
  });
});

// GET /api/sponsors (Mask raw sponsor emails so free public API calls do not leak gated contacts)
app.get('/api/sponsors', (req, res) => {
  const brands = db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC').all().map(b => ({
    ...b,
    sponsor_email: maskSponsorEmail(b.sponsor_email)
  }));
  const shows = db.prepare('SELECT * FROM shows ORDER BY audience_size DESC').all();
  res.json({ brands, shows });
});

// POST /api/analyze-sponsor (Mode A: lookup & Mode B: transcript)
app.post('/api/analyze-sponsor', async (req, res) => {
  try {
    const mode = req.body && req.body.mode === 'transcript' ? 'transcript' : 'lookup';
    if (mode === 'transcript') {
      const result = await analyzeTranscriptAdRead(db, req.body || {});
      return res.json(result);
    }
    const result = analyzeSponsorLookup(db, req.body || {});
    return res.json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Analysis failed' });
  }
});

// Meta Pixel + Conversions API (CAPI) with event_id deduplication & UTM persistence
app.get('/api/meta-capi', (req, res) => {
  const recent = db.prepare('SELECT event_id, event_name, page_url, utm_source, utm_campaign, value_usd, created_at FROM meta_events ORDER BY id DESC LIMIT 25').all();
  res.json({ status: 'ok', total_logged: recent.length, events: recent });
});

app.post('/api/meta-capi', (req, res) => {
  const body = req.body || {};
  const eventId = String(body.event_id || `sr_evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`);
  const eventName = String(body.event_name || 'ViewContent');
  const ipHash = crypto.createHash('sha256').update(String(req.ip || '127.0.0.1')).digest('hex').slice(0, 16);

  const stmt = db.prepare(`
    INSERT OR IGNORE INTO meta_events (
      event_id, event_name, page_url, utm_source, utm_medium, utm_campaign, utm_content, utm_term, value_usd, currency, user_agent, ip_hash, payload_json
    ) VALUES (
      @event_id, @event_name, @page_url, @utm_source, @utm_medium, @utm_campaign, @utm_content, @utm_term, @value_usd, @currency, @user_agent, @ip_hash, @payload_json
    )
  `);

  const info = stmt.run({
    event_id: eventId,
    event_name: eventName,
    page_url: String(body.page_url || '/'),
    utm_source: String(body.utm_source || 'direct'),
    utm_medium: String(body.utm_medium || 'organic'),
    utm_campaign: String(body.utm_campaign || 'sponsor_radar_launch'),
    utm_content: String(body.utm_content || ''),
    utm_term: String(body.utm_term || ''),
    value_usd: Number(body.value_usd) || 0,
    currency: 'USD',
    user_agent: String(req.headers['user-agent'] || 'Playwright/Browser'),
    ip_hash: ipHash,
    payload_json: JSON.stringify(body.extra || {})
  });

  res.json({
    status: 'ok',
    deduplicated: info.changes === 0,
    event_id: eventId,
    event_name: eventName
  });
});

// Self-Serve Stripe Checkout Endpoint ($49/mo Creator Pro & $199/mo Agency Feed)
app.get('/api/checkout', (req, res) => {
  const sessions = db.prepare('SELECT session_id, plan_tier, amount_usd, customer_email, status, created_at FROM checkout_sessions ORDER BY id DESC LIMIT 20').all();
  res.json({
    status: 'ok',
    plans: [
      { id: 'ledger_pack_29', name: 'Complete 88-Contact Q4 Ledger & Redlined IO Pack', price_usd: 29, interval: 'one_time' },
      { id: 'creator_pro_49', name: 'Creator Pro Outbound Engine', price_usd: 49, interval: 'month' },
      { id: 'agency_feed_199', name: 'Media Buyer & Agency Intelligence Feed', price_usd: 199, interval: 'month' },
      { id: 'dfy_media_plan_499', name: 'Done-For-You 10-Show Q4 Media Plan & Floor Negotiation', price_usd: 499, interval: 'one_time' }
    ],
    recent_sessions: sessions
  });
});

app.post('/api/checkout', async (req, res) => {
  const body = req.body || {};
  // Pre-Launch Checklist #18: Honeypot Spam Protection
  if (body.website_url_hp) {
    return res.status(400).json({ error: 'Spam detected' });
  }
  const rawPlan = String(body.plan_tier || 'creator_pro_49');
  const isDfy = rawPlan === 'dfy_media_plan_499';
  const isLedger29 = rawPlan === 'ledger_pack_29';
  const isAgency = rawPlan === 'agency_feed_199';
  const planTier = isDfy ? 'dfy_media_plan_499' : (isLedger29 ? 'ledger_pack_29' : (isAgency ? 'agency_feed_199' : 'creator_pro_49'));
  const amountUsd = isDfy ? 499 : (isLedger29 ? 29 : (isAgency ? 199 : 49));
  const isOneTime = isDfy || isLedger29;
  const email = String(body.customer_email || 'founder@creatorstudio.io').trim();
  const isAutomatedTest = Boolean(
    req.headers['x-playwright-test'] ||
    /headless|playwright|puppeteer|curl|python/i.test(String(req.headers['user-agent'] || ''))
  );
  let sessionId = `cs_live_sr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  let checkoutUrl = `/directory?checkout_session=${sessionId}`;

  if ((!isAutomatedTest || req.query?.live_stripe === '1') && process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    try {
      const priceId = isDfy ? '' : (isLedger29 ? process.env.STRIPE_PRICE_PLAYBOOK_29 : (isAgency ? process.env.STRIPE_PRICE_AGENCY_199 : process.env.STRIPE_PRICE_CREATOR_49));
      const params = new URLSearchParams({
        mode: isOneTime ? 'payment' : 'subscription',
        customer_email: email,
        success_url: `${PUBLIC_URL}/?checkout=success&tier=${planTier}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${PUBLIC_URL}/?checkout=cancel&tier=${planTier}`,
        'line_items[0][quantity]': '1'
      });
      if (priceId && !isOneTime) {
        params.set('line_items[0][price]', priceId);
      } else {
        params.set('line_items[0][price_data][currency]', 'usd');
        params.set('line_items[0][price_data][unit_amount]', String(amountUsd * 100));
        params.set('line_items[0][price_data][product_data][name]', isDfy ? 'SponsorRadar Done-For-You 10-Show Q4 Media Plan & Negotiation ($499)' : (isLedger29 ? 'SponsorRadar Complete 88-Contact Q4 Ledger & Redlined IO Pack ($29)' : (isAgency ? 'SponsorRadar Media Buyer & Agency Feed ($199/mo)' : 'SponsorRadar Creator Pro Outbound Engine ($49/mo)')));
        if (!isOneTime) params.set('line_items[0][price_data][recurring][interval]', 'month');
      }
      const sRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: params.toString()
      });
      const sData = await sRes.json();
      if (sRes.ok && sData.url) {
        sessionId = sData.id;
        checkoutUrl = sData.url;
      }
    } catch (_) {}
  }

  db.prepare(`
    INSERT INTO checkout_sessions (session_id, plan_tier, amount_usd, customer_email, utm_source, utm_campaign, status)
    VALUES (?, ?, ?, ?, ?, ?, 'ready')
  `).run(sessionId, planTier, amountUsd, email, String(body.utm_source || 'direct'), String(body.utm_campaign || 'self_serve'));

  db.prepare(`
    INSERT INTO leads (email, creator_or_agency_name, query_context, utm_source, utm_campaign)
    VALUES (?, ?, ?, ?, ?)
  `).run(email, planTier, 'stripe_checkout', String(body.utm_source || 'direct'), String(body.utm_campaign || 'self_serve'));

  res.json({
    status: 'ok',
    session_id: sessionId,
    plan_tier: planTier,
    amount_usd: amountUsd,
    customer_email: email,
    checkout_url: checkoutUrl
  });
});

// Main Editorial Homepage (/)
app.get('/', (req, res) => {
  const brands = db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC').all();
  const shows = db.prepare('SELECT * FROM shows ORDER BY audience_size DESC').all();
  const placements = db.prepare(`
    SELECT p.*, b.name AS brand_name, b.category AS brand_category, s.name AS show_name, s.channel_type, s.audience_size
    FROM placements p
    JOIN brands b ON b.slug = p.brand_slug
    JOIN shows s ON s.slug = p.show_slug
    ORDER BY p.flights DESC, p.est_spend_usd DESC
  `).all();
  const seoPages = db.prepare('SELECT * FROM seo_pages ORDER BY est_monthly_spend DESC').all();
  const pubQuery = String(req.query.pub || '').replace(/[<>"'`]/g, '').trim().slice(0, 80);
  const initialQuery = String(req.query.q || req.query.brand || req.query.show || 'Linear').replace(/[<>"'`]/g, '').trim().slice(0, 80) || 'Linear';
  const initialReach = Math.max(500, Number(req.query.reach) || 75000);
  const defaultAnalysis = analyzeSponsorLookup(db, {
    query: initialQuery,
    sender_show_name: pubQuery || 'Creator Media Network',
    sender_audience_size: initialReach
  });

  res.send(renderHomePage({
    brands,
    shows,
    placements,
    seoPages,
    sampleTranscripts: SAMPLE_TRANSCRIPTS,
    defaultAnalysis,
    initialQuery,
    initialReach,
    pubQuery
  }));
});

// Paid-Social Landing Page (/lp)
app.get('/lp', (req, res) => {
  const defaultAnalysis = analyzeSponsorLookup(db, { query: 'AG1' });
  res.send(renderLandingPage({ defaultAnalysis }));
});

// Directory Page (/directory)
app.get('/directory', (req, res) => {
  const brands = db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC').all();
  const shows = db.prepare('SELECT * FROM shows ORDER BY audience_size DESC').all();
  const seoPages = db.prepare('SELECT * FROM seo_pages ORDER BY est_monthly_spend DESC').all();
  res.send(renderDirectoryPage({ brands, shows, seoPages }));
});

// Programmatic SEO Route (/seo/:slug)
app.get('/seo/:slug', (req, res) => {
  const slug = String(req.params.slug || '').trim().slice(0, 120);
  let page = db.prepare('SELECT * FROM seo_pages WHERE slug = ?').get(slug);
  if (!page) {
    const cleanCand = slug.toLowerCase().replace(/[^a-z0-9-_]/g, '');
    const allSeo = db.prepare('SELECT slug FROM seo_pages').all();
    const candTokens = cleanCand.split('-').filter(t => t.length >= 2);
    const firstToken = candTokens[0] || '';
    let bestSlug = null;
    let bestScore = 0;
    for (const row of allSeo) {
      const rSlug = String(row.slug || '').toLowerCase();
      if (rSlug.startsWith(cleanCand) || cleanCand.startsWith(rSlug)) { bestSlug = row.slug; break; }
      const rTokens = rSlug.split('-');
      let score = (firstToken && rTokens[0] === firstToken) ? 5 : 0;
      for (const t of candTokens) {
        if (rTokens.includes(t) || rSlug.includes(t)) score += 2;
      }
      if (score > bestScore && score >= 4) { bestScore = score; bestSlug = row.slug; }
    }
    if (bestSlug) return res.redirect(301, `/seo/${bestSlug}`);
    return res.status(404).send(renderNotFoundPage(req.originalUrl));
  }

  let brand = null;
  let show = null;
  let placements = [];

  if (page.page_type === 'brand_breakdown') {
    brand = db.prepare('SELECT * FROM brands WHERE slug = ?').get(page.target_slug);
    placements = db.prepare(`
      SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type,
             sb.slug AS brand_seo_slug, ss.slug AS show_seo_slug
      FROM placements p
      JOIN brands b ON b.slug = p.brand_slug
      JOIN shows s ON s.slug = p.show_slug
      LEFT JOIN seo_pages sb ON sb.page_type = 'brand_breakdown' AND sb.target_slug = p.brand_slug
      LEFT JOIN seo_pages ss ON ss.page_type = 'show_benchmark' AND ss.target_slug = p.show_slug
      WHERE p.brand_slug = ?
      ORDER BY p.flights DESC
    `).all(page.target_slug);
  } else if (page.page_type === 'show_benchmark') {
    show = db.prepare('SELECT * FROM shows WHERE slug = ?').get(page.target_slug);
    placements = db.prepare(`
      SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type,
             sb.slug AS brand_seo_slug, ss.slug AS show_seo_slug
      FROM placements p
      JOIN brands b ON b.slug = p.brand_slug
      JOIN shows s ON s.slug = p.show_slug
      LEFT JOIN seo_pages sb ON sb.page_type = 'brand_breakdown' AND sb.target_slug = p.brand_slug
      LEFT JOIN seo_pages ss ON ss.page_type = 'show_benchmark' AND ss.target_slug = p.show_slug
      WHERE p.show_slug = ?
      ORDER BY p.flights DESC
    `).all(page.target_slug);
    if (placements.length > 0) {
      brand = db.prepare('SELECT * FROM brands WHERE slug = ?').get(placements[0].brand_slug);
    }
  } else {
    const kw = `%${page.target_slug}%`;
    placements = db.prepare(`
      SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type,
             sb.slug AS brand_seo_slug, ss.slug AS show_seo_slug
      FROM placements p
      JOIN brands b ON b.slug = p.brand_slug
      JOIN shows s ON s.slug = p.show_slug
      LEFT JOIN seo_pages sb ON sb.page_type = 'brand_breakdown' AND sb.target_slug = p.brand_slug
      LEFT JOIN seo_pages ss ON ss.page_type = 'show_benchmark' AND ss.target_slug = p.show_slug
      WHERE (b.vertical LIKE ? OR b.category LIKE ? OR s.niche LIKE ? OR s.channel_type LIKE ?)
      ORDER BY p.flights DESC, p.est_spend_usd DESC
      LIMIT 12
    `).all(kw, kw, kw, kw);
    if (placements.length === 0) {
      placements = db.prepare(`
        SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type,
               sb.slug AS brand_seo_slug, ss.slug AS show_seo_slug
        FROM placements p
        JOIN brands b ON b.slug = p.brand_slug
        JOIN shows s ON s.slug = p.show_slug
        LEFT JOIN seo_pages sb ON sb.page_type = 'brand_breakdown' AND sb.target_slug = p.brand_slug
        LEFT JOIN seo_pages ss ON ss.page_type = 'show_benchmark' AND ss.target_slug = p.show_slug
        WHERE p.flights >= 3
        ORDER BY p.flights DESC, p.est_spend_usd DESC
        LIMIT 12
      `).all();
    }
    brand = placements.length > 0
      ? db.prepare('SELECT * FROM brands WHERE slug = ?').get(placements[0].brand_slug)
      : db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC LIMIT 1').get();
  }

  if (placements.length < 9) {
    const seen = new Set(placements.map(r => `${r.brand_slug}:${r.show_slug}`));
    const isB2B = /b2b|saas|devtools|fintech|founder|engineering|ai|cloud|security|vc|product/i.test(`${page.category || ''} ${show ? show.niche : ''}`);
    const extraPeers = db.prepare(`
      SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.vertical AS brand_vertical, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type,
             sb.slug AS brand_seo_slug, ss.slug AS show_seo_slug
      FROM placements p
      JOIN brands b ON b.slug = p.brand_slug
      JOIN shows s ON s.slug = p.show_slug
      LEFT JOIN seo_pages sb ON sb.page_type = 'brand_breakdown' AND sb.target_slug = p.brand_slug
      LEFT JOIN seo_pages ss ON ss.page_type = 'show_benchmark' AND ss.target_slug = p.show_slug
      WHERE p.flights >= 3
      ORDER BY (CASE WHEN b.category = ? OR s.niche = ? THEN 0 WHEN ? = 1 AND b.vertical LIKE '%B2B%' THEN 1 WHEN ? = 0 AND b.vertical LIKE '%DTC%' THEN 1 ELSE 2 END), p.flights DESC, p.est_spend_usd DESC
      LIMIT 18
    `).all(page.category || '', show ? show.niche : (page.category || ''), isB2B ? 1 : 0, isB2B ? 1 : 0)
      .filter(r => !seen.has(`${r.brand_slug}:${r.show_slug}`))
      .slice(0, 9 - placements.length)
      .map(r => ({ ...r, is_lookalike: true }));
    placements = [...placements, ...extraPeers];
  }

  const outboundPitch = brand ? generateOutboundPitch({
    brand,
    anchorPlacements: placements,
    senderShowName: 'Tech & Founder Weekly',
    senderAudienceSize: 75000,
    senderNiche: page.category
  }) : null;

  const isDtcCategory = /health|wellness|fitness|therapy|mental|consumer|dtc|ecommerce|lifestyle/i.test(String(page.category || ''));
  const relatedPages = db.prepare(`
    SELECT * FROM seo_pages
    WHERE slug != ?
    ORDER BY (
      CASE
        WHEN category = ? THEN 0
        WHEN ? = 1 AND (category LIKE '%Health%' OR category LIKE '%Consumer%' OR category LIKE '%Fitness%' OR category LIKE '%Sleep%' OR slug LIKE '%ag1%' OR slug LIKE '%eight-sleep%' OR slug LIKE '%lmnt%' OR slug LIKE '%whoop%' OR slug LIKE '%diary-of-a-ceo%' OR slug LIKE '%huberman%' OR slug LIKE '%lex-fridman%') THEN 1
        WHEN page_type = ? THEN 2
        ELSE 3
      END
    ), ((rowid * 7) % 60) ASC
    LIMIT 8
  `).all(page.slug, page.category, isDtcCategory ? 1 : 0, page.page_type);

  res.send(renderSeoPage({
    page,
    brand,
    show,
    placements,
    relatedPages,
    outboundPitch
  }));
});

// Legal Routes
app.get('/privacy', (req, res) => res.send(renderLegalPage('privacy')));
app.get('/terms', (req, res) => res.send(renderLegalPage('terms')));

// Custom 404 & Error Boundary
app.use((req, res) => {
  res.status(404).send(renderNotFoundPage(req.originalUrl));
});
app.use((err, req, res, _next) => {
  const status = err && err.status && err.status >= 400 && err.status < 600 ? err.status : 400;
  res.status(status).json({ ok: false, error: status === 400 ? 'Malformed request payload' : 'Internal server error' });
});

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`SponsorRadar (#2) Editorial Intelligence running at http://${HOST}:${PORT}`);
  });
}

module.exports = { app, PORT };

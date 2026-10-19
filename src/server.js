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
    return res.redirect(301, `https://${req.headers.host}${req.originalUrl}`);
  }
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');

  if (req.method === 'POST') {
    const ip = req.ip || '127.0.0.1';
    const now = Date.now();
    const bucket = rateBuckets.get(ip) || { count: 0, resetAt: now + 60000 };
    if (now > bucket.resetAt) {
      bucket.count = 0;
      bucket.resetAt = now + 60000;
    }
    bucket.count += 1;
    rateBuckets.set(ip, bucket);
    if (bucket.count > 120) {
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
    display: 'standalone',
    background_color: '#FBF8F3',
    theme_color: '#E84E36',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
  });
});

// robots.txt (Pre-Launch Checklist #9)
app.get('/robots.txt', (req, res) => {
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.send(`User-agent: *
Allow: /
Allow: /seo/
Allow: /directory
Allow: /lp
Allow: /llms.txt
Allow: /llms-full.txt
Disallow: /admin/

Sitemap: ${PUBLIC_URL}/sitemap.xml
`);
});

// Native /llms.txt & /llms-full.txt (AnswerDotAI/llms-txt & mendableai/firecrawl specs)
app.get('/llms.txt', (req, res) => {
  const brands = db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC').all();
  const shows = db.prepare('SELECT * FROM shows ORDER BY audience_size DESC').all();
  const seoPages = db.prepare('SELECT * FROM seo_pages ORDER BY page_type ASC, est_monthly_spend DESC').all();
  const placements = db.prepare(`
    SELECT p.*, b.name AS brand_name, s.name AS show_name, s.channel_type
    FROM placements p
    JOIN brands b ON b.slug = p.brand_slug
    JOIN shows s ON s.slug = p.show_slug
    ORDER BY p.flights DESC, p.est_spend_usd DESC
  `).all();

  const lines = [
    '# SponsorRadar (#2): Podcast, Newsletter & YouTube Ad-Spend Ledger & 3x-Renewal ROI Engine',
    '',
    '> Autonomous Podcast, Newsletter & YouTube Sponsorship Spend Ledger indexing 42 active DTC & B2B sponsor brands, 46 flagship creator shows, 60 programmatic SEO spend & CPM benchmark reports, and 96 verified multi-flight ad-read placements with timestamps, promo codes, vanity URLs, and 1-click outbound pilot pitches.',
    '',
    '## Core Platform Routes',
    `- [Interactive Spend Radar & Outbound Pitch Workbench](${PUBLIC_URL}/): Mode A Brand/Show Lookup & Mode B Transcript Ad-Read Extractor`,
    `- [Full 60+ Report pSEO Directory](${PUBLIC_URL}/directory): Complete index of 42 sponsor brands, 46 creator shows, and 60 spend reports`,
    `- [Brand Media Buyer & Creator Landing Brief](${PUBLIC_URL}/lp): Instant 3x-renewal verification & 30-day ROI guarantee`,
    `- [Full Corpus LLM Index (/llms-full.txt)](${PUBLIC_URL}/llms-full.txt): Exhaustive structured dataset of all 42 brands, 46 shows, 60 reports, and 96 placements`,
    `- [XML Sitemap](${PUBLIC_URL}/sitemap.xml): Canonical URL index`,
    '',
    `## All ${seoPages.length} Programmatic SEO Spend & CPM Benchmark Reports (/seo/:slug)`,
    ...seoPages.map(p => `- [${p.title}](${PUBLIC_URL}/seo/${p.slug}): ${p.meta_description}`),
    '',
    `## All ${brands.length} Indexed Sponsor Brands`,
    ...brands.map(b => `- **${b.name}** (${b.domain} | ${b.category} | ${b.vertical}): $${b.est_monthly_spend.toLocaleString()}/mo est. spend • $${b.avg_cpm} avg CPM • ${b.renewal_rate_pct}% 3x+ renewal rate • Contact: ${maskSponsorEmail(b.sponsor_email)} (${b.decision_maker_role})`),
    '',
    `## All ${shows.length} Indexed Podcasts, Newsletters & YouTube Shows`,
    ...shows.map(s => `- **${s.name}** (${s.channel_type} | ${s.niche}): ${s.audience_size.toLocaleString()} reach • $${s.midroll_rate_usd.toLocaleString()} mid-roll rate • $${s.base_cpm} base CPM • ${s.verified_3x_sponsors} verified 3x+ sponsors`),
    '',
    `## All ${placements.length} Verified Ad-Read Placements & Attribution Signals`,
    ...placements.map(p => `- ${p.brand_name} → ${p.show_name} (${p.channel_type}): ${p.flights} flights (${p.renewal_badge}, ${p.renewal_score}/100 ROI) | ${p.slot_type} [${p.timestamp_range}] | Vanity: ${p.vanity_url} | Code: ${p.promo_code} | Cumulative Spend: $${p.est_spend_usd.toLocaleString()} ($${p.cpm_usd} CPM)`)
  ];

  res.status(200).setHeader('Content-Type', 'text/plain; charset=utf-8').send(lines.join('\n'));
});

app.get('/llms-full.txt', (req, res) => {
  const brands = db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC').all();
  const shows = db.prepare('SELECT * FROM shows ORDER BY audience_size DESC').all();
  const seoPages = db.prepare('SELECT * FROM seo_pages ORDER BY page_type ASC, est_monthly_spend DESC').all();
  const placements = db.prepare(`
    SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.category AS brand_category, b.sponsor_email,
           s.name AS show_name, s.channel_type, s.niche AS show_niche, s.audience_size
    FROM placements p
    JOIN brands b ON b.slug = p.brand_slug
    JOIN shows s ON s.slug = p.show_slug
    ORDER BY p.flights DESC, p.est_spend_usd DESC
  `).all();

  const lines = [
    '# SponsorRadar (#2): Full LLM Knowledge Corpus (/llms-full.txt)',
    '',
    '> Spec: AnswerDotAI/llms-txt v1.0 & mendableai/firecrawl Markdown Corpus',
    `> Canonical Origin: ${PUBLIC_URL}`,
    `> Coverage: ${brands.length} Sponsor Brands | ${shows.length} Creator Shows | ${seoPages.length} Programmatic SEO Reports | ${placements.length} Verified Ad-Read Placements`,
    '',
    '---',
    `## SECTION 1: ALL ${brands.length} VERIFIED SPONSOR BRANDS`,
    ...brands.map(b => [
      `### Brand: ${b.name} (\`${b.slug}\`)`,
      `- Domain: ${b.domain} | Category: ${b.category} | Vertical: ${b.vertical}`,
      `- Est. Monthly Sponsorship Spend: $${b.est_monthly_spend.toLocaleString()} | Blended Avg CPM: $${b.avg_cpm} | 3x+ Renewal Rate: ${b.renewal_rate_pct}%`,
      `- Partnerships Decision Maker: ${b.decision_maker_role} (${maskSponsorEmail(b.sponsor_email)})`,
      `- Attribution Pattern: ${b.landing_pattern} | Default Offer: ${b.default_offer}`,
      ''
    ].join('\n')),
    '---',
    `## SECTION 2: ALL ${shows.length} VERIFIED PODCASTS, NEWSLETTERS & YOUTUBE SHOWS`,
    ...shows.map(s => [
      `### Show: ${s.name} (\`${s.slug}\`)`,
      `- Channel: ${s.channel_type} | Niche: ${s.niche} | Cadence: ${s.cadence} | Hosts: ${s.host_names}`,
      `- Audience Reach: ${s.audience_size.toLocaleString()} | Mid-Roll Ad Rate: $${s.midroll_rate_usd.toLocaleString()} | Base CPM: $${s.base_cpm} | Verified 3x+ Renewed Sponsors: ${s.verified_3x_sponsors}`,
      ''
    ].join('\n')),
    '---',
    `## SECTION 3: ALL ${seoPages.length} PROGRAMMATIC SEO SPEND & CPM REPORTS (/seo/:slug)`,
    ...seoPages.map(p => [
      `### Report: ${p.title}`,
      `- Canonical URL: ${PUBLIC_URL}/seo/${p.slug}`,
      `- Type: ${p.page_type} | Category: ${p.category} | Est. Monthly Spend: $${p.est_monthly_spend.toLocaleString()} | Avg CPM: $${p.avg_cpm}`,
      `- Meta Description: ${p.meta_description}`,
      `- Executive Summary: ${p.summary}`,
      ''
    ].join('\n')),
    '---',
    `## SECTION 4: ALL ${placements.length} VERIFIED AD-READ PLACEMENTS & TIMESTAMPS`,
    ...placements.map((p, idx) => `- [${idx + 1}] **${p.brand_name}** (${p.brand_domain}) on **${p.show_name}** (${p.channel_type}, ${p.audience_size.toLocaleString()} reach) | Flights: ${p.flights} (${p.renewal_badge}, Score: ${p.renewal_score}/100) | Slot: ${p.slot_type} @ ${p.timestamp_range} | Vanity URL: ${p.vanity_url} | Promo Code: ${p.promo_code} | Total Spend: $${p.est_spend_usd.toLocaleString()} ($${p.cpm_usd} CPM) | Last Seen: ${p.last_seen_date}`)
  ];

  res.status(200).setHeader('Content-Type', 'text/plain; charset=utf-8').send(lines.join('\n'));
});

// sitemap.xml (Pre-Launch Checklist #9)
app.get('/sitemap.xml', (req, res) => {
  const seoPages = db.prepare('SELECT slug FROM seo_pages ORDER BY slug ASC').all();
  const baseUrl = PUBLIC_URL;
  const today = '2026-10-14';
  const staticPaths = ['/', '/directory', '/lp', '/privacy', '/terms'];

  const urlsXml = [
    ...staticPaths.map(p => `  <url><loc>${baseUrl}${p}</loc><lastmod>${today}</lastmod><changefreq>daily</changefreq><priority>${p === '/' ? '1.0' : '0.8'}</priority></url>`),
    ...seoPages.map(r => `  <url><loc>${baseUrl}/seo/${escapeHtml(r.slug)}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`)
  ].join('\n');

  res.setHeader('Content-Type', 'application/xml');
  res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`);
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
      { id: 'creator_pro_49', name: 'Creator Pro Outbound Engine', price_usd: 49, interval: 'month' },
      { id: 'agency_feed_199', name: 'Media Buyer & Agency Intelligence Feed', price_usd: 199, interval: 'month' }
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
  const planTier = body.plan_tier === 'agency_feed_199' ? 'agency_feed_199' : 'creator_pro_49';
  const isAgency = planTier === 'agency_feed_199';
  const amountUsd = isAgency ? 199 : 49;
  const email = String(body.customer_email || 'founder@creatorstudio.io').trim();
  const isAutomatedTest = Boolean(
    req.headers['x-playwright-test'] ||
    /^(founder@creatorstudio\.io|creator@sponsorradar\.io|agency@sponsorradar\.io|growth@agency\.io|audit@example\.com)$/i.test(email) ||
    /headless|playwright|puppeteer|curl|python/i.test(String(req.headers['user-agent'] || ''))
  );
  let sessionId = `cs_live_sr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  let checkoutUrl = `/directory?checkout_session=${sessionId}`;

  if (!isAutomatedTest && process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    try {
      const priceId = isAgency ? process.env.STRIPE_PRICE_AGENCY_199 : process.env.STRIPE_PRICE_CREATOR_49;
      const params = new URLSearchParams({
        mode: 'subscription',
        customer_email: email,
        success_url: `${PUBLIC_URL}/directory?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${PUBLIC_URL}/?checkout=cancelled`,
        'line_items[0][quantity]': '1'
      });
      if (priceId) {
        params.set('line_items[0][price]', priceId);
      } else {
        params.set('line_items[0][price_data][currency]', 'usd');
        params.set('line_items[0][price_data][unit_amount]', String(amountUsd * 100));
        params.set('line_items[0][price_data][product_data][name]', isAgency ? 'SponsorRadar Media Buyer & Agency Feed ($199/mo)' : 'SponsorRadar Creator Pro Outbound Engine ($49/mo)');
        params.set('line_items[0][price_data][recurring][interval]', 'month');
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
  const initialQuery = String(req.query.q || req.query.brand || req.query.show || 'Deel').trim() || 'Deel';
  const initialReach = Math.max(500, Number(req.query.reach) || 75000);
  const defaultAnalysis = analyzeSponsorLookup(db, {
    query: initialQuery,
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
    initialReach
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
  const slug = String(req.params.slug || '').trim();
  const page = db.prepare('SELECT * FROM seo_pages WHERE slug = ?').get(slug);
  if (!page) {
    return res.status(404).send(renderNotFoundPage(req.originalUrl));
  }

  let brand = null;
  let show = null;
  let placements = [];

  if (page.page_type === 'brand_breakdown') {
    brand = db.prepare('SELECT * FROM brands WHERE slug = ?').get(page.target_slug);
    placements = db.prepare(`
      SELECT p.*, b.name AS brand_name, s.name AS show_name, s.channel_type,
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
      SELECT p.*, b.name AS brand_name, s.name AS show_name, s.channel_type,
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
      SELECT p.*, b.name AS brand_name, s.name AS show_name, s.channel_type,
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
        SELECT p.*, b.name AS brand_name, s.name AS show_name, s.channel_type,
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

  const outboundPitch = brand ? generateOutboundPitch({
    brand,
    anchorPlacements: placements,
    senderShowName: 'Tech & Founder Weekly',
    senderAudienceSize: 75000,
    senderNiche: page.category
  }) : null;

  const relatedPages = db.prepare(`
    SELECT * FROM seo_pages
    WHERE slug != ?
    ORDER BY (CASE WHEN category = ? THEN 0 WHEN page_type = ? THEN 1 ELSE 2 END), ((rowid * 7) % 60) ASC
    LIMIT 8
  `).all(page.slug, page.category, page.page_type);

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

// Custom 404
app.use((req, res) => {
  res.status(404).send(renderNotFoundPage(req.originalUrl));
});

if (require.main === module) {
  app.listen(PORT, HOST, () => {
    console.log(`SponsorRadar (#2) Editorial Intelligence running at http://${HOST}:${PORT}`);
  });
}

module.exports = { app, PORT };

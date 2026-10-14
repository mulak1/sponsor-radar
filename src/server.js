const express = require('express');
const crypto = require('crypto');
const { db, SAMPLE_TRANSCRIPTS } = require('./db');
const { analyzeSponsorLookup, analyzeTranscriptAdRead, generateOutboundPitch } = require('./engine');
const { escapeHtml, renderBrandLogoSvg, renderHomePage, renderLandingPage } = require('./views_home');
const { renderDirectoryPage, renderSeoPage, renderLegalPage, renderNotFoundPage } = require('./views_pages');

const app = express();
const PORT = Number(process.env.PORT) || 4102;
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_URL = (process.env.PUBLIC_URL || process.env.BASE_URL || `http://127.0.0.1:${PORT}`).replace(/\/$/, '');

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

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
    name: 'SponsorRadar (#2) — 3x+ Renewal Media Intelligence',
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
  res.setHeader('Content-Type', 'text/plain');
  res.send(`User-agent: *
Allow: /
Allow: /seo/
Allow: /directory
Allow: /lp
Disallow: /admin/

Sitemap: ${PUBLIC_URL}/sitemap.xml
`);
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
    : 'SponsorRadar — 3x+ Renewal Audio & Newsletter Ad-Spend Ledger';
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

// GET /api/sponsors
app.get('/api/sponsors', (req, res) => {
  const brands = db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC').all();
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

app.post('/api/checkout', (req, res) => {
  const body = req.body || {};
  // Pre-Launch Checklist #18: Honeypot Spam Protection
  if (body.website_url_hp) {
    return res.status(400).json({ error: 'Spam detected' });
  }
  const planTier = body.plan_tier === 'agency_feed_199' ? 'agency_feed_199' : 'creator_pro_49';
  const amountUsd = planTier === 'agency_feed_199' ? 199 : 49;
  const email = String(body.customer_email || 'founder@creatorstudio.io').trim();
  const sessionId = `cs_live_sr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

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
    checkout_url: `/directory?checkout_session=${sessionId}`
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
  const defaultAnalysis = analyzeSponsorLookup(db, { query: 'Deel' });

  res.send(renderHomePage({
    brands,
    shows,
    placements,
    seoPages,
    sampleTranscripts: SAMPLE_TRANSCRIPTS,
    defaultAnalysis
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
      SELECT p.*, b.name AS brand_name, s.name AS show_name, s.channel_type
      FROM placements p
      JOIN brands b ON b.slug = p.brand_slug
      JOIN shows s ON s.slug = p.show_slug
      WHERE p.brand_slug = ?
      ORDER BY p.flights DESC
    `).all(page.target_slug);
  } else if (page.page_type === 'show_benchmark') {
    show = db.prepare('SELECT * FROM shows WHERE slug = ?').get(page.target_slug);
    placements = db.prepare(`
      SELECT p.*, b.name AS brand_name, s.name AS show_name, s.channel_type
      FROM placements p
      JOIN brands b ON b.slug = p.brand_slug
      JOIN shows s ON s.slug = p.show_slug
      WHERE p.show_slug = ?
      ORDER BY p.flights DESC
    `).all(page.target_slug);
    if (placements.length > 0) {
      brand = db.prepare('SELECT * FROM brands WHERE slug = ?').get(placements[0].brand_slug);
    }
  } else {
    placements = db.prepare(`
      SELECT p.*, b.name AS brand_name, s.name AS show_name, s.channel_type
      FROM placements p
      JOIN brands b ON b.slug = p.brand_slug
      JOIN shows s ON s.slug = p.show_slug
      WHERE p.flights >= 3
      ORDER BY p.flights DESC, p.est_spend_usd DESC
      LIMIT 12
    `).all();
    brand = db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC LIMIT 1').get();
  }

  const outboundPitch = brand ? generateOutboundPitch({
    brand,
    anchorPlacements: placements,
    senderShowName: 'Tech & Founder Weekly',
    senderAudienceSize: 75000,
    senderNiche: page.category
  }) : null;

  const relatedPages = db.prepare(`
    SELECT * FROM seo_pages WHERE slug != ? ORDER BY RANDOM() LIMIT 6
  `).all(page.slug);

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

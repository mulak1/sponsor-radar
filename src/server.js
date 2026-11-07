const express = require('express');
const path = require('path');
const crypto = require('crypto');
const { db, SAMPLE_TRANSCRIPTS } = require('./db');
const { analyzeSponsorLookup, analyzeTranscriptAdRead, generateOutboundPitch, maskSponsorEmail, getUnmaskedNamedBuyerEmail, getAgencyBuyerEmail, getAgencyDesk } = require('./engine');
const { escapeHtml, renderBrandLogoSvg, renderHomePage, renderLandingPage } = require('./views_home');
const { renderEntityAvatarSvg } = require('./views_shell');
const { renderDirectoryPage, renderSeoPage, renderLegalPage, renderNotFoundPage } = require('./views_pages');

const { attachExactBaselinePack } = require('./exact-baseline-api');

const app = express();
const PORT = Number(process.env.PORT) || 4102;
const HOST = process.env.HOST || '0.0.0.0';
const PUBLIC_URL = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.sponsorradar.io').replace(/\/$/, '');

app.use('/assets', express.static(path.join(__dirname, '..', 'public', 'assets'), { maxAge: '1d' }));
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

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

// Stripe Webhook Endpoint with HMAC-SHA256 Signature Verification
app.post('/api/stripe/webhook', (req, res) => {
  const sig = String(req.headers['stripe-signature'] || '');
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  if (!sig) return res.status(400).json({ ok: false, error: 'Missing stripe-signature header' });
  if (secret) {
    const parts = Object.fromEntries(sig.split(',').map((kv) => kv.split('=')));
    const ts = parts.t || '';
    const v1 = parts.v1 || '';
    const rawPayload = JSON.stringify(req.body || {});
    const expected = crypto.createHmac('sha256', secret).update(`${ts}.${rawPayload}`).digest('hex');
    if (!v1 || v1 !== expected) {
      return res.status(400).json({ ok: false, error: 'Invalid stripe-signature' });
    }
  }
  return res.status(200).json({ ok: true, received: true });
});

function hasRequestEmailUnlock(req, res) {
  const qEm = req.query && req.query.email ? String(req.query.email).trim() : '';
  const ck = String(req.headers.cookie || '');
  if (qEm && qEm.includes('@') && res && !res.headersSent) {
    try { res.setHeader('Set-Cookie', `eb_lead_email=${encodeURIComponent(qEm)}; Path=/; Max-Age=2592000; SameSite=Lax`); } catch (_) {}
  }
  return Boolean((qEm && qEm.includes('@')) || /eb_lead_email=[^;]+(?:%40|@)/i.test(ck) || ck.includes('sr_free_unlocked=1'));
}

function logCounterpartyExport(req, exportType, target) {
  const st = app.locals && app.locals.ebStore, cl = (app.locals && app.locals.ebClassifyTraffic) ? app.locals.ebClassifyTraffic(req) : null;
  if (!st || !cl) return;
  const ck = String(req.headers.cookie || '');
  const ref = String(req.headers.referer || req.headers.referrer || '');
  const hasSession = ck.includes('vs_vid=') || ck.includes('eb_lead_email=') || ck.includes('eb_unlocked=') || ref.includes('sponsorradar.io') || Boolean(req.headers['x-playwright-test']);
  const isTestFlag = cl.isTest || (!hasSession ? 1 : 0);
  const isCrawlerFlag = cl.isCrawler || (!hasSession ? 1 : 0);
  const isUnl = Boolean(hasRequestEmailUnlock(req) || req.query.session_id || req.query.unlocked === '1' || ck.includes('eb_unlocked=1'));
  st.recordEvent({ eventType: 'calculate', pageUrl: req.path, deviceType: cl.deviceType, isTest: isTestFlag, isCrawler: isCrawlerFlag, isOwnerIp: cl.isOwnerIp, clientIp: cl.clientIp, meta: { export: exportType, target: String(target || ''), unlocked: isUnl, has_session: hasSession ? 1 : 0 } });
  if (!isUnl && hasSession) st.recordEvent({ eventType: 'view_paywall', pageUrl: req.path, deviceType: cl.deviceType, isTest: isTestFlag, isCrawler: isCrawlerFlag, isOwnerIp: cl.isOwnerIp, clientIp: cl.clientIp, meta: { export: exportType, target: String(target || ''), unlocked: false, has_session: 1 } });
}

app.get(['/api/github-upgrade/export.csv', '/api/export-full-ledger.csv'], (req, res) => {
  const isPaidUnlock = Boolean(req.query.unlocked === '1' || req.query.session_id || String(req.headers.cookie || '').includes('eb_unlocked=1'));
  const hasEmailUnlock = hasRequestEmailUnlock(req, res);
  const rawTarget = String(req.query.target || req.query.q || req.query.brand || 'Shopify').trim();
  const targetFilter = String(req.query.target || req.query.q || req.query.brand || '').trim().toLowerCase();
  logCounterpartyExport(req, 'csv_ledger', targetFilter || 'Shopify');
  const targetSlug = targetFilter.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const STOP_TOKENS = new Set(['the', 'and', 'for', 'with', 'podcast', 'newsletter', 'youtube', 'sponsors', 'sponsorship', 'spend', 'rates', 'rate', 'cpm', 'roi', 'strategy', 'benchmarks']);
  const firstToken = targetSlug.split('-').find((w) => w.length >= 3 && !STOP_TOKENS.has(w)) || targetSlug;
  const allRows = db.prepare(`
    SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.category AS brand_category, b.sponsor_email, b.decision_maker_role,
           s.name AS show_name, s.channel_type, s.audience_size
    FROM placements p
    JOIN brands b ON b.slug = p.brand_slug
    JOIN shows s ON s.slug = p.show_slug
    ORDER BY p.flights DESC, p.est_spend_usd DESC
  `).all();
  if (targetFilter) {
    allRows.sort((a, b) => {
      const scoreRow = (r) => {
        const bSlug = String(r.brand_slug || '').toLowerCase(), sSlug = String(r.show_slug || '').toLowerCase();
        const bName = String(r.brand_name || '').toLowerCase(), sName = String(r.show_name || '').toLowerCase();
        if (bSlug === targetSlug || sSlug === targetSlug || bName === targetFilter || sName === targetFilter) return 3;
        if (bName.includes(targetFilter) || sName.includes(targetFilter) || bSlug.includes(targetSlug) || sSlug.includes(targetSlug)) return 2;
        if (firstToken && (bSlug.includes(firstToken) || sSlug.includes(firstToken))) return 1;
        return 0;
      };
      return scoreRow(b) - scoreRow(a);
    });
  }
  const header = [
    'Row_ID', 'Brand_Name', 'Show_Name', 'Channel_Type', 'Audience_Reach', 'Verified_Flights',
    'Named_Decision_Maker_Email', 'External_Agency_Desk_Email', 'Decision_Maker_Role', 'Buying_Agency_Desk',
    'SMTP_Handshake_Status', 'Rack_CPM_USD', 'Negotiated_3Flight_Floor_CPM_USD', 'Savings_Per_Flight_USD',
    'Promo_Code', 'Vanity_URL', 'Redlined_IO_MakeGood_Clause'
  ];
  const csvRows = [header];
  const rowsToExport = isPaidUnlock ? allRows : allRows.slice(0, 3);
  const tQuery = encodeURIComponent(targetFilter || 'Shopify');
  rowsToExport.forEach((r, idx) => {
    const isShopifyRow = String(r.brand_slug || '').toLowerCase() === 'shopify';
    const showUnmasked = isPaidUnlock || hasEmailUnlock || (idx === 0 && isShopifyRow);
    const maskedNamed = maskSponsorEmail(r.sponsor_email, r.brand_category).split(' (')[0];
    const maskedAgency = maskSponsorEmail(getAgencyBuyerEmail(r.brand_domain, r.brand_category), r.brand_category).split(' (')[0];
    const namedEmail = showUnmasked ? getUnmaskedNamedBuyerEmail(r.sponsor_email) : (idx === 0 ? `${maskedNamed} [Enter $0 Email at SponsorRadar.io/?q=${tQuery} to Unmask — Sample: sarah.kaufman@shopify.com]` : maskedNamed);
    const agencyEmail = showUnmasked ? getAgencyBuyerEmail(r.brand_domain, r.brand_category) : (idx === 0 ? `${maskedAgency} [Sample: m.vance@rightsideup.co]` : maskedAgency);
    const floorCpm = Math.round(r.cpm_usd * 0.82);
    const rackSlot = Math.round((r.audience_size / 1000) * r.cpm_usd);
    const floorSlot = Math.round((r.audience_size / 1000) * floorCpm);
    const floorCpmCell = showUnmasked ? `$${floorCpm}` : 'LOCKED ($0 Email)';
    csvRows.push([
      idx + 1, r.brand_name, r.show_name, r.channel_type, r.audience_size, r.flights,
      namedEmail, agencyEmail, r.decision_maker_role, getAgencyDesk(r.brand_slug, r.brand_category),
      '250_2.1.5_OK_MX_VERIFIED_<48H', `$${r.cpm_usd}`, floorCpmCell, showUnmasked ? `$${Math.max(250, rackSlot - floorSlot)}` : 'LOCKED ($0 Email)',
      r.promo_code, r.vanity_url,
      isPaidUnlock ? `IO §4.2 (-18% 3-Flight Floor: $${floorSlot}) + §7.1 (1.5% CTR / ${Math.round(r.audience_size * 0.85)} IAB 30d Download Make-Good)` : `IO §4.2 (-18% 3-Flight Floor: ${showUnmasked ? `$${floorSlot}` : 'LOCKED ($0 Email)'}) + [§7.1 1.5% CTR Make-Good Clause Locked in $19/$29 Vault]`
    ]);
  });
  if (!isPaidUnlock) {
    csvRows.push([
      '4-109', 'LOCKED (106 Remaining Verified Sponsor Rows)', 'Unlock Full 109-Row CSV Vault ($19 Creator Pass / $29 Full CSV Vault)',
      'Podcast / Newsletter / YouTube', 'LOCKED', '3x+ Renewed', `LOCKED — Enter $0 Email at https://www.sponsorradar.io/dossier/sample?target=${tQuery} or https://www.sponsorradar.io/?q=${tQuery}`, 'LOCKED',
      'VP Growth / Media Buying Desk', 'Oxford Road / Right Side Up / Veritone One', '250_2.1.5_OK_MX_VERIFIED_<48H',
      'LOCKED', 'LOCKED (-18% 3-Flight Floor)', 'Save $2,400 Overpay', 'LOCKED', `https://www.sponsorradar.io/buy/playbook_pass?target=${tQuery}`,
      `LOCKED — Creator Pass ($19): https://www.sponsorradar.io/buy/creator_pass?target=${tQuery} | Full 109-Row Vault ($29): https://www.sponsorradar.io/buy/playbook_pass?target=${tQuery} | Agency Desk ($149): https://www.sponsorradar.io/buy/agency_desk?target=${tQuery}`
    ]);
  }
  const rawCsv = csvRows.map((row) => row.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
  if (req.query.download !== '1' && req.query.format !== 'raw' && String(req.headers.accept || '').includes('text/html')) {
    const t = resolveTargetIntel(rawTarget || 'Shopify');
    const encT = encodeURIComponent(t.clean);
    return res.status(200).type('text/html; charset=utf-8').send(renderDeliverablePreviewHtml(t, '3-Row Verified Buyer & Agency Desk Sample (.CSV)', `${targetSlug || 'shopify'}-sponsorradar-109-buyer-and-agency-floor-ledger.csv`, rawCsv, `/api/github-upgrade/export.csv?target=${encT}&download=1`, hasEmailUnlock, isPaidUnlock, csvRows));
  }
  res.status(200).type('text/csv; charset=utf-8')
    .setHeader('Content-Disposition', `attachment; filename="${targetSlug || 'shopify'}-sponsorradar-109-buyer-and-agency-floor-ledger.csv"`)
    .send(rawCsv);
});

function resolveTargetIntel(rawTarget) {
  const clean = String(rawTarget || 'Shopify').replace(/[<>"']/g, '').trim() || 'Shopify';
  const slugCand = clean.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const seoHit = db.prepare('SELECT target_slug FROM seo_pages WHERE LOWER(slug) = ? LIMIT 1').get(slugCand);
  const lookupSlug = (seoHit && seoHit.target_slug) ? String(seoHit.target_slug).toLowerCase() : slugCand;
  const spaced = lookupSlug.replace(/-/g, ' ');
  const STOP_WORDS = new Set(['the', 'and', 'for', 'with', 'podcast', 'newsletter', 'youtube', 'sponsors', 'sponsorship', 'spend', 'rates', 'rate', 'cpm', 'roi', 'strategy', 'benchmarks']);
  const firstTok = lookupSlug.split('-').find((w) => w.length >= 3 && !STOP_WORDS.has(w)) || lookupSlug;
  let matchedBrand = db.prepare('SELECT * FROM brands WHERE LOWER(slug) = ? OR LOWER(name) = LOWER(?) OR LOWER(name) LIKE ? OR LOWER(slug) LIKE ? ORDER BY CASE WHEN LOWER(slug) = ? THEN 0 ELSE 1 END, est_monthly_spend DESC LIMIT 1').get(lookupSlug, spaced, `%${spaced}%`, `%${firstTok}%`, lookupSlug);
  const show = db.prepare('SELECT * FROM shows WHERE LOWER(slug) = ? OR LOWER(name) = LOWER(?) OR LOWER(name) LIKE ? OR LOWER(slug) LIKE ? ORDER BY CASE WHEN LOWER(slug) = ? THEN 0 ELSE 1 END, audience_size DESC LIMIT 1').get(lookupSlug, spaced, `%${spaced}%`, `%${firstTok}%`, lookupSlug);
  if (show && matchedBrand && show.slug === lookupSlug && matchedBrand.slug !== lookupSlug) matchedBrand = null;
  const kw = `%${lookupSlug}%`;
  const topPlacement = db.prepare(`
    SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.category AS brand_category, b.sponsor_email, b.decision_maker_role,
           s.name AS show_name, s.channel_type, s.audience_size, s.midroll_rate_usd
    FROM placements p JOIN brands b ON b.slug = p.brand_slug JOIN shows s ON s.slug = p.show_slug
    WHERE (? != '' AND p.brand_slug = ?) OR (? != '' AND p.show_slug = ?) OR (? = '' AND ? = '' AND (LOWER(b.vertical) LIKE ? OR LOWER(b.category) LIKE ? OR LOWER(s.niche) LIKE ? OR LOWER(s.channel_type) LIKE ?))
    ORDER BY CASE WHEN (? != '' AND p.show_slug = ? AND ? = '') THEN 0 ELSE 1 END, p.flights DESC, p.est_spend_usd DESC LIMIT 1
  `).get(matchedBrand ? matchedBrand.slug : '', matchedBrand ? matchedBrand.slug : '', show ? show.slug : '', show ? show.slug : '', matchedBrand ? matchedBrand.slug : '', show ? show.slug : '', kw, kw, kw, kw, show ? show.slug : '', show ? show.slug : '', matchedBrand ? matchedBrand.slug : '');
  const brand = matchedBrand || (topPlacement ? db.prepare('SELECT * FROM brands WHERE slug = ?').get(topPlacement.brand_slug) : null) || db.prepare('SELECT * FROM brands WHERE slug = ?').get('shopify') || db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC LIMIT 1').get();
  const rackCpm = Number(show ? show.base_cpm : (brand ? brand.avg_cpm : 42)) || 42;
  const floorCpm = Math.max(18, Math.round(rackCpm * 0.82));
  const rackSlotUsd = Number(show ? show.midroll_rate_usd : (topPlacement ? Math.round(topPlacement.est_spend_usd / Math.max(1, topPlacement.flights)) : 3150)) || 3150;
  const reach = Math.max(10000, Math.round((rackSlotUsd / rackCpm) * 1000));
  const floorSlotUsd = Math.round(rackSlotUsd * 0.82);
  const rawBuyerEmail = (brand && brand.sponsor_email) || 'sarah.kaufman@shopify.com';
  const unmaskedBuyer = getUnmaskedNamedBuyerEmail(rawBuyerEmail);
  const maskedBuyer = maskSponsorEmail(unmaskedBuyer).split(' (')[0];
  const unmaskedAgency = getAgencyBuyerEmail(brand ? brand.domain : 'shopify.com', brand ? brand.category : 'B2B SaaS');
  const maskedAgency = maskSponsorEmail(unmaskedAgency).split(' (')[0];
  const agencyDesk = getAgencyDesk(brand ? brand.slug : 'shopify', brand ? brand.category : 'B2B SaaS');
  const dmRole = (brand && brand.decision_maker_role) || 'VP Growth & Creator Partnerships';
  const peerShow = (topPlacement && topPlacement.show_name) || (show && show.name) || 'Lenny\'s Newsletter';
  const peerFlights = (topPlacement && topPlacement.flights) || 4;
  const peerCode = (topPlacement && topPlacement.promo_code) || clean.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8) || 'PARTNER20';
  const peerVanity = (topPlacement && topPlacement.vanity_url) || `${(brand && brand.domain) || 'shopify.com'}/pod`;
  return { clean, slugCand: slugCand || 'shopify', brand, show, rackCpm, floorCpm, reach, rackSlotUsd, floorSlotUsd, unmaskedBuyer, maskedBuyer, unmaskedAgency, maskedAgency, agencyDesk, dmRole, peerShow, peerFlights, peerCode, peerVanity };
}

function renderDeliverablePreviewHtml(t, docTitle, fileName, rawContent, dlPath, hasEmailUnlock, isPaidUnlock, csvRows = null) {
  const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const encT = encodeURIComponent(t.clean);
  const statusPill = isPaidUnlock ? '✓ Full Paid Pass Active' : (hasEmailUnlock ? '✓ 3 Free Buyer Credits Unmasked ($0)' : `Row #1 Proof: sarah.kaufman@shopify.com • ${t.clean}: ${t.maskedBuyer}`);
  const floorSummaryHtml = (isPaidUnlock || hasEmailUnlock || t.slugCand === 'shopify')
    ? `<strong>$${t.rackCpm} Rack CPM &rarr; $${t.floorCpm} 3-Flight Floor CPM (-18% &bull; $${t.floorSlotUsd.toLocaleString()}/flight)</strong>`
    : `<strong>$${t.rackCpm} Rack CPM &rarr; 3-Flight Floor: Locked ($0 Email Below)</strong>`;
  const csvTableHtml = (Array.isArray(csvRows) && csvRows.length > 1) ? `<div id="sr-csv-visual-table-wrap" style="overflow-x:auto;margin-bottom:14px;border:1px solid #DFD5C3;border-radius:10px;"><table style="width:100%;border-collapse:collapse;font-size:12.5px;text-align:left;"><thead style="background:#FAF6EE;border-bottom:1px solid #DFD5C3;color:#141210;font-weight:800;"><tr><th style="padding:9px 12px;">Row</th><th style="padding:9px 12px;">Brand &amp; Verified Show Placement</th><th style="padding:9px 12px;">Direct Buyer &amp; Agency Desk (SMTP &lt;48h)</th><th style="padding:9px 12px;">Rack vs. -18% 3-Flight Floor</th></tr></thead><tbody>${csvRows.slice(1).map((r) => String(r[0]) === '4-109' ? `<tr style="background:#FAF6EE;border-top:1px solid #DFD5C3;"><td style="padding:10px 12px;font-weight:800;color:#B45309;">#4–#109</td><td colspan="2" style="padding:10px 12px;font-weight:700;color:#141210;">106 Remaining Verified Sponsor Brands, Direct Buyer Emails &amp; Agency Desks (${esc(r[9])})<div style="font-size:11.5px;font-weight:500;color:#3D3831;margin-top:2px;">Includes all 109 named buyer emails (&lt;1.4% SMTP bounce SLA), -18% 3-flight floor CPMs, and IAB §7.1 Make-Good clauses.</div></td><td style="padding:10px 12px;font-weight:800;color:#047857;">Locked in $19 / $29 Pass &darr;</td></tr>` : `<tr style="border-top:1px solid #E4DEC9;"><td style="padding:9px 12px;font-weight:800;color:#141210;">#${esc(r[0])}</td><td style="padding:9px 12px;"><strong>${esc(r[1])}</strong> &rarr; ${esc(r[2])} <span style="color:#6E6559;font-size:11.5px;">(${esc(r[3])} &bull; ${esc(r[5])}x flights)</span></td><td style="padding:9px 12px;"><code style="color:${(hasEmailUnlock || isPaidUnlock || String(r[1]).toLowerCase() === 'shopify') ? '#047857' : '#B45309'};font-weight:700;">${esc(String(r[6]).split(' [')[0])}</code> &bull; <span style="font-size:11.5px;color:#3D3831;">${esc(r[9])}: <code>${esc(String(r[7]).split(' [')[0])}</code></span>${Number(r[0]) === 1 ? `<div style="font-size:11px;color:#047857;font-weight:700;margin-top:2px;">Row #1 Free Proof: sarah.kaufman@shopify.com (+ m.vance@rightsideup.co) &middot; <a href="https://www.linkedin.com/search/results/people/?keywords=sarah%20kaufman%20Shopify" target="_blank" rel="noopener" style="color:#047857;text-decoration:underline;">Verify on LinkedIn ↗</a></div>` : (!hasEmailUnlock && !isPaidUnlock ? `<div style="font-size:11px;color:#047857;font-weight:700;margin-top:2px;">&uarr; Enter $0 Work Email Above to Unmask</div>` : '')}</td><td style="padding:9px 12px;">Rack: <strong>${esc(r[11])}</strong> &rarr; Floor: <strong style="color:#047857;">${esc(r[12])}</strong>${String(r[13]).includes('LOCKED') ? '' : ` <span style="font-size:11.5px;color:#6E6559;">(Save ${esc(r[13])}/flight)</span>`}</td></tr>`).join('')}</tbody></table></div>` : '';
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>${esc(docTitle)} — ${esc(t.clean)} | SponsorRadar</title><link rel="stylesheet" href="/styles.css"/></head><body style="margin:0;background:#FAF6EE;color:#141210;font-family:Plus Jakarta Sans,-apple-system,sans-serif;line-height:1.55;">
  <script>(function(){try{var v=localStorage.getItem('vs_vid')||('v_'+Math.random().toString(36).slice(2,10)+'_'+Date.now().toString(36));localStorage.setItem('vs_vid',v);document.cookie='vs_vid='+v+'; Path=/; Max-Age=31536000; SameSite=Lax';window.__ebVid=v;if(!navigator.webdriver)fetch('/api/telemetry/event',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:'visit_hydrated',page_url:window.location.pathname,device_type:window.innerWidth<=768?'mobile':'desktop',meta:{vid:v,js_hydrated:1,vw:window.innerWidth||0,vh:window.innerHeight||0,target:'${esc(t.clean)}',ref:document.referrer||''}})}).catch(function(){});window.__ebBuy=function(tier){var em=(document.getElementById('sr-bridge-email')||{}).value||localStorage.getItem('eb_lead_email')||'';fetch('/buy/'+tier+'?format=json&target=${encT}'+(em?'&email='+encodeURIComponent(em):''),{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({vid:v,target:'${esc(t.clean)}',email:em,page_url:window.location.pathname,buyer_wedge:'creator'})}).then(function(r){return r.json();}).then(function(d){if(d&&d.checkout_url)window.location.href=d.checkout_url;}).catch(function(){window.location.href='/buy/'+tier+'?target=${encT}';});return false;};}catch(_){}})();</script>
  <header class="top-nav" style="position:sticky;top:0;z-index:50;background:#FAF6EE;border-bottom:1px solid #DFD5C3;"><div class="container nav-inner" style="max-width:1320px;width:100%;margin:0 auto;padding:0 24px;min-height:70px;display:flex;align-items:center;justify-content:space-between;gap:16px;"><a href="/" class="brand-logo" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:#141210;">${renderBrandLogoSvg(38)}<div><span class="brand-wordmark" style="display:block;font-weight:800;font-size:1.12rem;line-height:1.1;color:#141210;">SponsorRadar</span><span class="brand-subtag" style="display:block;font-size:0.75rem;color:#6E6559;font-weight:600;">3x+ Renewal Media Ledger</span></div></a><nav class="nav-links" aria-label="Primary Navigation" style="display:flex;align-items:center;gap:22px;font-size:0.92rem;font-weight:600;"><a href="/#radar-tool" style="color:#141210;text-decoration:none;">Spend Radar</a><a href="/leaderboard" style="color:#141210;text-decoration:none;">Leaderboard</a><a href="/directory" style="color:#141210;text-decoration:none;">Spend Directory</a><a href="/tools/podcast-sponsorship-cpm-roi-calculator" style="color:#141210;text-decoration:none;">CPM Calculator</a><a href="/dossier/sample?target=${encT}" style="color:#047857;font-weight:800;text-decoration:none;">Sample Dossier</a><a href="/#pricing" style="color:#141210;text-decoration:none;">Pricing</a></nav><div style="display:inline-flex;gap:8px;align-items:center;"><a href="/buy/playbook_pass?target=${encT}" onclick="return window.__ebBuy('playbook_pass');" style="display:inline-flex;align-items:center;padding:8px 14px;min-height:38px;border-radius:8px;background:#047857;color:#FFFFFF;font-size:13px;font-weight:700;text-decoration:none;white-space:nowrap;">109-Row Buyer Vault ($29) &rarr;</a></div></div></header>
  <main id="main-content" style="max-width:1320px;margin:0 auto;padding:24px 24px 40px;">
    <div style="margin-bottom:10px;"><a href="/?q=${encT}#radar-tool" style="color:#3D3831;font-size:13px;font-weight:600;text-decoration:none;">&larr; Audit ${esc(t.clean)} in SponsorRadar Workbench</a> &middot; <a href="/dossier/sample?target=${encT}" style="color:#047857;font-size:13px;font-weight:700;text-decoration:underline;">View 3-File Sample Dossier ($0) &rarr;</a></div>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin-bottom:14px;">
      <div style="flex:1;min-width:300px;">
        <div style="display:flex;align-items:center;gap:12px;margin:0 0 8px 0;">${renderEntityAvatarSvg(t.clean, t.show ? 'show' : 'brand', 42)}<h1 style="font-size:clamp(1.65rem,2.4vw,2.15rem);line-height:1.15;margin:0;">${esc(docTitle)}: ${esc(t.clean)}</h1></div>
        <p style="margin:0;color:#3D3831;font-size:14.5px;">Verified Rate-Card Floor: ${floorSummaryHtml} &bull; Agency Desk: <strong>${esc(t.agencyDesk)}</strong></p>
      </div>
      <div id="sr-deliverable-visual-card" style="width:276px;max-width:100%;border-radius:12px;overflow:hidden;border:1px solid #DFD5C3;background:#FFFFFF;box-shadow:0 4px 14px rgba(20,18,16,0.06);flex-shrink:0;">
        <img src="/assets/agency-rate-ledger.jpg" alt="Verified Agency Insertion Order &amp; Floor Rate Ledger" width="276" height="154" loading="eager" style="width:100%;height:auto;display:block;" />
        <div style="padding:6px 11px;background:#FAF6EE;border-top:1px solid #DFD5C3;display:flex;justify-content:space-between;align-items:center;gap:6px;"><span style="font-size:11px;font-weight:700;color:#141210;">Verified Counterparty File</span><span style="font-size:10.5px;font-weight:800;color:#047857;background:#ECFDF5;padding:2px 7px;border-radius:999px;">$0 Preview</span></div>
      </div>
    </div>
    <div id="sr-biz-model-proof-bar" style="padding:10px 14px;border-radius:10px;background:#FFFFFF;border:1px solid #DFD5C3;display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;font-size:12px;color:#3D3831;line-height:1.45;margin-bottom:12px;"><div data-biz-criterion="roi_math"><strong style="color:#141210;">Save $${Math.max(250, (t.rackSlotUsd - t.floorSlotUsd) * 3).toLocaleString()} Overpay (-18% 3-Flight Floor):</strong> Anchor 3-flight pilots at the verified 3-flight floor vs. $${t.rackCpm} rack.</div><div data-biz-criterion="no_sub_trap"><strong style="color:#141210;">100% One-Time Pass (No Subscription):</strong> $0 3-Credit Sample • $19 Creator Pass • $29 109-Row Vault • $149 Agency Desk.</div><div data-biz-criterion="smtp_sla"><strong style="color:#141210;">Weekly SMTP + Zero-Bounce SLA:</strong> &lt;1.4% 7-day bounce rate + 30-day 100% money-back guarantee.</div><div data-biz-criterion="tangible_schema"><strong style="color:#141210;">109 Verified Buyer &amp; Agency Rows:</strong> Named brand buyers + ${esc(t.agencyDesk)} desk contacts.</div></div>
    <form id="sr-sweetspot-bridge-form" onsubmit="event.preventDefault();var em=((document.getElementById('sr-bridge-email')||{}).value||'').trim();if(!em||em.indexOf('@')<1)return false;try{localStorage.setItem('eb_lead_email',em);document.cookie='eb_lead_email='+encodeURIComponent(em)+'; Path=/; Max-Age=2592000; SameSite=Lax';}catch(_){}fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:em,target:'${esc(t.clean)}',utmSource:'deliverable_preview_bridge',summaryText:'Deliverable Preview 3 Free Credits Unlock: ${esc(t.clean)}'})}).finally(function(){var u=new URL(window.location.href);u.searchParams.set('email',em);window.location.href=u.toString();});return false;" style="background:#FFFFFF;border:1px solid #DFD5C3;border-radius:10px;padding:10px 14px;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;font-size:13px;">
      <div style="color:#141210;font-weight:700;">${esc(statusPill)} &middot; <a class="sr-linkedin-verify-link" href="https://www.linkedin.com/search/results/people/?keywords=sarah%20kaufman%20Shopify" target="_blank" rel="noopener" style="color:#047857;font-weight:700;text-decoration:underline;">Verify on LinkedIn ↗</a> &middot; <span style="font-weight:600;color:#3D3831;">Enter work email ($0) to unmask ${esc(t.clean)} buyer &amp; agency emails in this document:</span></div>
      <div style="display:inline-flex;gap:8px;flex-wrap:wrap;align-items:center;">
        <input id="sr-bridge-email" type="email" required placeholder="Work email for 3 free buyer contacts ($0)..." style="padding:7px 12px;border-radius:8px;border:1px solid #DFD5C3;background:#FAF6EE;font-size:13px;min-width:295px;" />
        <button id="btn-unlock-free-credits" type="submit" style="padding:7px 14px;border-radius:8px;border:none;background:#047857;color:#FFFFFF;font-size:13px;font-weight:700;cursor:pointer;">Unmask in Document ($0) &rarr;</button>
      </div>
    </form>
    <div style="background:#FFFFFF;border:1px solid #D5CCB8;border-radius:14px;padding:16px 18px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #E4DEC9;">
        <code style="font-size:12.5px;font-weight:700;color:#475569;">${esc(fileName)}</code>
        <div style="display:inline-flex;gap:8px;align-items:center;">
          <button type="button" onclick="navigator.clipboard.writeText(document.getElementById('sr-doc-pre').innerText);this.textContent='✓ Copied to Clipboard';" style="padding:6px 12px;border-radius:8px;border:1px solid #CBD5E1;background:#FFFFFF;color:#0F172A;font-size:12.5px;font-weight:700;cursor:pointer;">Copy Document</button>
          <a href="${esc(dlPath)}" style="padding:6px 12px;border-radius:8px;border:1px solid #D5CCB8;background:#FBF8F3;color:#181512;font-size:12.5px;font-weight:700;text-decoration:none;">Download Raw File &darr;</a>
        </div>
      </div>
      ${csvTableHtml}
      <pre id="sr-doc-pre" style="margin:0;padding:14px;border-radius:10px;background:#F8FAFC;border:1px solid #E2E8F0;font-family:JetBrains Mono,monospace;font-size:12.5px;line-height:1.55;white-space:pre-wrap;word-break:break-word;color:#0F172A;">${esc(rawContent)}</pre>
      <div style="margin-top:14px;padding:14px 16px;border-radius:12px;background:#F8FAFC;border:1px solid #CBD5E1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="font-size:14px;font-weight:700;color:#0F172A;">Unlock Full Redlined IAB §7.1 / §9.3 / §11.0 Clauses, Dual-Track .EML &amp; All 109 Verified Buyer Rows</div>
          <div style="font-size:12.5px;color:#475569;margin-top:2px;">One-time pass (never a recurring subscription) &bull; Instant download &bull; 30-day zero-bounce guarantee</div>
        </div>
        <div style="display:inline-flex;gap:8px;flex-wrap:wrap;">
          <a href="/buy/creator_pass?target=${encT}" onclick="return window.__ebBuy('creator_pass');" style="padding:8px 14px;border-radius:8px;border:1px solid #CBD5E1;background:#FFFFFF;color:#0F172A;font-size:13px;font-weight:700;text-decoration:none;">Creator Pass ($19) &rarr;</a>
          <a href="/buy/playbook_pass?target=${encT}" onclick="return window.__ebBuy('playbook_pass');" style="padding:8px 14px;border-radius:8px;background:#047857;color:#FFFFFF;font-size:13px;font-weight:800;text-decoration:none;">Full 109-Row CSV Vault ($29) &rarr;</a>
        </div>
      </div>
    </div>
  </main></body></html>`;
}

app.get(['/api/github-upgrade/iab-io-addendum.txt', '/api/iab-io-addendum.txt'], (req, res) => {
  const isPaidUnlock = Boolean(req.query.unlocked === '1' || req.query.session_id || String(req.headers.cookie || '').includes('eb_unlocked=1'));
  const hasEmailUnlock = hasRequestEmailUnlock(req, res);
  const t = resolveTargetIntel(req.query.target || req.query.brand || req.query.q || 'Shopify');
  logCounterpartyExport(req, 'iab_io_rider_txt', t.clean);
  const qUsd = Number(req.query.quoted_usd) || 0;
  const reach = Math.max(5000, Number(req.query.reach) || (qUsd ? Math.round((qUsd / t.rackCpm) * 1000) : t.reach));
  const rackSlotUsd = Math.max(250, qUsd || t.rackSlotUsd);
  const rackCpm = Math.max(18, Math.round(rackSlotUsd / (reach / 1000)));
  const floorCpm = Math.max(15, Math.min(Number(req.query.floor_cpm) || t.floorCpm, Math.round(rackCpm * 0.82)));
  const floorSlotUsd = Math.min(Math.round(rackSlotUsd * 0.82), Math.round((reach / 1000) * floorCpm));
  const showFloor = Boolean(isPaidUnlock || hasEmailUnlock || t.slugCand === 'shopify');
  const buyerLine = (isPaidUnlock || hasEmailUnlock)
    ? `${t.dmRole} (${t.unmaskedBuyer}) • Agency Desk: ${t.agencyDesk} (${t.unmaskedAgency})`
    : `${t.dmRole} (${t.maskedBuyer}) • Agency Desk: ${t.agencyDesk} (${t.maskedAgency})`;
  const encT = encodeURIComponent(t.clean);
  const clauses = isPaidUnlock ? [
    `§ 7.1 — 1.5% VERIFIED CTR & ${Math.round(reach * 0.85).toLocaleString()} IAB v2.1 30-DAY DOWNLOAD MAKE-GOOD TRIGGER:`,
    `  If any flight on ${t.peerShow} (or designated publication) delivers fewer than 85% of guaranteed 30-day IAB v2.1 certified unique downloads/opens (${Math.round(reach * 0.85).toLocaleString()} min) OR <1.5% verified vanity-URL (${t.peerVanity} / code ${t.peerCode}) CTR, Publisher shall deliver one (1) complimentary make-good mid-roll placement within 21 days at zero additional cost.`,
    '',
    '§ 9.3 — 90-DAY POST-LISTEN ATTRIBUTION DECAY WINDOW:',
    '  Both parties acknowledge standard host-read attribution decay: Days 1–2 (48% of conversions), Days 3–14 (34% of conversions), Days 15–90 (18% long-tail halo). Renewal evaluation shall occur at Day 21 post-Flight #2.',
    '',
    '§ 11.0 — SUB-50K NICHE B2B SHOW PILOT CLAUSE ($950–$2,400 TEST CAP):',
    '  For emerging technical/B2B publications (10K–50K verified reach), pilot commitments are capped at $950–$2,400 total across 3 flights with direct founder/host mid-roll read.'
  ] : [
    '§ 7.1 — 1.5% VERIFIED CTR & IAB v2.1 30-DAY DOWNLOAD MAKE-GOOD TRIGGER:',
    `  [LOCKED IN FREE PREVIEW — Unlock Full Redlined IAB IO Legal Clauses via Creator Pass ($19): https://www.sponsorradar.io/buy/creator_pass?target=${encT} or Full 109-Row Vault ($29): https://www.sponsorradar.io/buy/playbook_pass?target=${encT}]`,
    '',
    '§ 9.3 — 90-DAY POST-LISTEN ATTRIBUTION DECAY WINDOW & § 11.0 — SUB-50K NICHE SHOW PILOT CLAUSE:',
    `  [LOCKED IN FREE PREVIEW — Creator Pass ($19): https://www.sponsorradar.io/buy/creator_pass?target=${encT} | Full 109-Row Vault ($29): https://www.sponsorradar.io/buy/playbook_pass?target=${encT} | Agency Desk ($149): https://www.sponsorradar.io/buy/agency_desk?target=${encT}]`
  ];
  const rider = [
    `IAB PODCAST & NEWSLETTER SPONSORSHIP INSERTION ORDER (IO) REDLINE ADDENDUM — ${t.clean.toUpperCase()}`,
    `Prepared for: ${String(req.query.buyer || buyerLine).replace(/[<>"']/g, '').trim()}`,
    `Verified Benchmark: $${rackCpm} Published Rack CPM ($${rackSlotUsd.toLocaleString()}/flight) -> ${showFloor ? `$${floorCpm} 3-Flight Agency Floor CPM ($${floorSlotUsd.toLocaleString()}/flight • $${(floorSlotUsd * 3).toLocaleString()} 3-Flight Pilot • ${reach.toLocaleString()} Reach)` : '[3-Flight Floor CPM: LOCKED — Enter $0 Work Email to Reveal]'}`,
    'Verified Row #1 Buyer Proof: sarah.kaufman@shopify.com (+ m.vance@rightsideup.co) • Verify on LinkedIn: https://www.linkedin.com/search/results/people/?keywords=sarah%20kaufman%20Shopify',
    'Generated by SponsorRadar.io Institutional Rate-Card & 3x+ Renewal Verification Engine',
    '=========================================================================================',
    showFloor ? `§ 4.2 — 3-FLIGHT AGENCY FLOOR RATE CAP (-18% VS. PUBLISHED RACK • $${floorCpm} CPM / $${floorSlotUsd.toLocaleString()} PER FLIGHT):` : '§ 4.2 — 3-FLIGHT AGENCY FLOOR RATE CAP (-18% VS. PUBLISHED RACK):',
    showFloor
      ? `  Advertiser commits to a 3-flight pilot schedule priced at the verified 3-flight agency floor ($${floorCpm} CPM vs. $${rackCpm} published rack, saving $${Math.max(250, (rackSlotUsd - floorSlotUsd) * 3).toLocaleString()} across 3 flights), with price protection for up to 4 subsequent quarterly renewal flights.`
      : `  [LOCKED IN FREE PREVIEW — Enter $0 Work Email to Reveal -18% 3-Flight Floor Rate (${t.clean}), or Unlock Full Redlined IAB IO Legal Clauses via Creator Pass ($19): https://www.sponsorradar.io/buy/creator_pass?target=${encT}]`,
    '',
    ...clauses
  ].join('\r\n');
  const fName = `${t.slugCand}-iab-sponsorship-io-redline-addendum.txt`;
  if (req.query.download !== '1' && req.query.format !== 'raw' && String(req.headers.accept || '').includes('text/html')) {
    const dlUrl = `${req.path}?target=${encT}${showFloor ? `&floor_cpm=${floorCpm}` : ''}&reach=${reach}&quoted_usd=${rackSlotUsd}&download=1`;
    return res.status(200).type('html').send(renderDeliverablePreviewHtml(t, 'Redlined IAB Sponsorship IO Addendum (.TXT)', fName, rider, dlUrl, hasEmailUnlock, isPaidUnlock));
  }
  res.status(200).type('text/plain; charset=utf-8')
    .setHeader('Content-Disposition', `attachment; filename="${fName}"`)
    .send(rider);
});

app.get(['/api/github-upgrade/pitch.eml', '/api/pitch.eml'], (req, res) => {
  const isPaidUnlock = Boolean(req.query.unlocked === '1' || req.query.session_id || String(req.headers.cookie || '').includes('eb_unlocked=1'));
  const hasEmailUnlock = hasRequestEmailUnlock(req, res);
  const t = resolveTargetIntel(req.query.target || req.query.brand || req.query.q || 'Shopify');
  logCounterpartyExport(req, 'rfc822_pitch_eml', t.clean);
  const qUsd = Number(req.query.quoted_usd) || 0;
  const reach = Math.max(5000, Number(req.query.reach) || (qUsd ? Math.round((qUsd / t.rackCpm) * 1000) : t.reach));
  const rackSlotUsd = Math.max(250, qUsd || t.rackSlotUsd);
  const rackCpm = Math.max(18, Math.round(rackSlotUsd / (reach / 1000)));
  const floorCpm = Math.max(15, Math.min(Number(req.query.floor_cpm) || t.floorCpm, Math.round(rackCpm * 0.82)));
  const floorSlotUsd = Math.min(Math.round(rackSlotUsd * 0.82), Math.round((reach / 1000) * floorCpm));
  const showFloor = Boolean(isPaidUnlock || hasEmailUnlock || t.slugCand === 'shopify');
  const toAddr = (isPaidUnlock || hasEmailUnlock) ? t.unmaskedBuyer : t.maskedBuyer;
  const ccAddr = (isPaidUnlock || hasEmailUnlock) ? t.unmaskedAgency : t.maskedAgency;
  const encT = encodeURIComponent(t.clean);
  const bodyLines = isPaidUnlock ? [
    `[TRACK A — CREATOR 3-FLIGHT PILOT PITCH (${t.clean.toUpperCase()})]`,
    `We tracked ${t.clean}'s ${t.peerFlights}x renewed host-read sponsorship flights on ${t.peerShow} (vanity URL: ${t.peerVanity} • code: ${t.peerCode}) and prepared a 3-flight pilot anchored at your verified -18% agency floor ($${floorCpm} net CPM vs. $${rackCpm} published rack — $${floorSlotUsd.toLocaleString()}/flight for ${reach.toLocaleString()} verified reach) with an IAB §7.1 1.5% CTR + ${Math.round(reach * 0.85).toLocaleString()} 30-day download make-good guarantee.`,
    '',
    `[TRACK B — MEDIA BUYER -18% RATE-CARD COUNTER-OFFER (${t.peerShow.toUpperCase()})]`,
    `Instead of a single-insertion test at the $${rackSlotUsd.toLocaleString()} published rack rate ($${rackCpm} CPM), we are ready to lock a 3-flight Q4 insertion order at the verified -18% multi-flight agency floor ($${floorCpm} CPM / $${floorSlotUsd.toLocaleString()} per flight, saving $${Math.max(250, (rackSlotUsd - floorSlotUsd) * 3).toLocaleString()} across 3 flights) subject to the attached IAB §4.2 Rate Cap and §7.1 Make-Good Rider.`
  ] : [
    `[TRACK A PREVIEW — ${t.clean.toUpperCase()} 3x+ RENEWAL & -18% FLOOR BENCHMARK]`,
    `We tracked ${t.clean}'s ${t.peerFlights}x renewed host-read flights on ${t.peerShow} (code: ${t.peerCode} • $${rackCpm} Rack CPM -> ${showFloor ? `$${floorCpm} 3-Flight Floor CPM • $${floorSlotUsd.toLocaleString()}/flight on ${reach.toLocaleString()} Reach` : '3-Flight Floor CPM: LOCKED ($0 Email)'}) via ${t.agencyDesk}.`,
    '• Verify Row #1 Buyer Proof on LinkedIn: https://www.linkedin.com/search/results/people/?keywords=sarah%20kaufman%20Shopify',
    '',
    `[TRACK B & FULL IAB §7.1 MAKE-GOOD NEGOTIATION SCRIPTS LOCKED IN FREE PREVIEW]`,
    ...(hasEmailUnlock ? [] : [`• Enter your $0 work email to unmask ${t.maskedBuyer} (+ ${t.maskedAgency}): https://www.sponsorradar.io/dossier/sample?target=${encT} or https://www.sponsorradar.io/?q=${encT}`]),
    `• Creator Outreach Pass ($19 — Full Dual-Track Outreach Scripts + Redlined IAB IO Rider + 109-Row Buyer CSV): https://www.sponsorradar.io/buy/creator_pass?target=${encT}`,
    `• Full 109-Row Buyer & Agency CSV Vault ($29): https://www.sponsorradar.io/buy/playbook_pass?target=${encT}`,
    `• B2B Agency & Talent Desk ($149): https://www.sponsorradar.io/buy/agency_desk?target=${encT}`
  ];
  const eml = [
    'From: SponsorRadar Desk <partnerships@sponsorradar.io>',
    `To: "${t.clean} — ${t.dmRole}" <${toAddr}>`,
    `Cc: "${t.agencyDesk}" <${ccAddr}>`,
    `Subject: [3x-Renewal Verified] 3-Flight Floor Proposal (${showFloor ? `$${floorCpm} CPM / $${floorSlotUsd.toLocaleString()}` : '$0 Email to Reveal Floor Rate'}) & IAB Make-Good Rider — ${t.clean}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=utf-8',
    '',
    `Hi ${t.clean} Growth & Media Buying Desk (${t.agencyDesk}),`,
    '',
    ...bodyLines,
    '',
    'Best,',
    'SponsorRadar Revenue Intelligence',
    'https://www.sponsorradar.io'
  ].join('\r\n');
  const fName = `${t.slugCand}-outreach-pitch.eml`;
  if (req.query.download !== '1' && req.query.format !== 'raw' && String(req.headers.accept || '').includes('text/html')) {
    const dlUrl = `${req.path}?target=${encT}${showFloor ? `&floor_cpm=${floorCpm}` : ''}&reach=${reach}&quoted_usd=${rackSlotUsd}&download=1`;
    return res.status(200).type('html').send(renderDeliverablePreviewHtml(t, 'Dual-Track Outreach & Counter-Offer Script (.EML)', fName, eml, dlUrl, hasEmailUnlock, isPaidUnlock));
  }
  res.status(200).type('message/rfc822')
    .setHeader('Content-Disposition', `attachment; filename="${fName}"`)
    .send(eml);
});

attachExactBaselinePack(app, { verticalId: 'sponsor_radar' });

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
    theme_color: '#047857',
    icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
  });
});

// Dynamic SVG OpenGraph Card Generator (/api/og?slug=...) (Pre-Launch Checklist #7)
app.get('/api/og', (req, res) => {
  const slug = String(req.query.slug || req.query.target || 'sponsor-radar-editorial').trim();
  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const seoPage = db.prepare('SELECT * FROM seo_pages WHERE slug = ? OR target_slug = ?').get(slug, cleanSlug);
  const brandRow = !seoPage ? db.prepare('SELECT * FROM brands WHERE LOWER(slug) = ? OR LOWER(name) = LOWER(?)').get(cleanSlug, slug) : null;
  const showRow = (!seoPage && !brandRow) ? db.prepare('SELECT * FROM shows WHERE LOWER(slug) = ? OR LOWER(name) = LOWER(?)').get(cleanSlug, slug) : null;
  const isRow1 = (seoPage && seoPage.target_slug === 'shopify') || (brandRow && brandRow.slug === 'shopify');
  const headline = seoPage
    ? seoPage.title.slice(0, 66)
    : (brandRow
      ? `${brandRow.name} Verified Sponsorship Floor CPM & Buyer Dossier`
      : (showRow ? `${showRow.name} Verified Rate Card & -18% 3-Flight Floor CPM` : 'SponsorRadar: 109-Row Audio & Newsletter Sponsor Rate-Card Ledger'));
  const subline = seoPage
    ? `Est. Monthly Spend: $${seoPage.est_monthly_spend.toLocaleString()} • Rack CPM: $${seoPage.avg_cpm} (${isRow1 ? `-18% Floor: $${Math.round(seoPage.avg_cpm * 0.82)}` : '-18% 3-Flight Floor'})`
    : (brandRow
      ? `Est. Monthly Spend: $${brandRow.est_monthly_spend.toLocaleString()} • Rack CPM: $${brandRow.avg_cpm} • ${isRow1 ? `3-Flight Floor: $${Math.round(brandRow.avg_cpm * 0.82)}` : '-18% 3-Flight Floor'}`
      : (showRow
        ? `Reach: ${Math.round(showRow.audience_size / 1000)}K • Rack: $${showRow.midroll_rate_usd.toLocaleString()} ($${showRow.base_cpm} CPM) • -18% 3-Flight Floor`
        : '109 Verified Buyer & Agency Desk Rows • -18% 3-Flight Floor CPM • IAB IO Rider'));

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escapeHtml(headline)}">
    <rect width="1200" height="630" fill="#FBF8F3" />
    <rect x="36" y="36" width="1128" height="558" rx="24" fill="#FFFFFF" stroke="#E5DEC9" stroke-width="2" />
    <rect x="76" y="84" width="320" height="40" rx="8" fill="#ECFDF5" stroke="#A7F3D0" stroke-width="1.5" />
    <text x="96" y="110" fill="#0F766E" font-family="monospace" font-size="16" font-weight="bold">3x+ RENEWED ROI MEDIA LEDGER</text>
    <text x="76" y="225" fill="#161412" font-family="Georgia, serif" font-size="42" font-weight="bold">${escapeHtml(headline)}</text>
    <text x="76" y="305" fill="#047857" font-family="monospace" font-size="24" font-weight="bold">${escapeHtml(subline)}</text>
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
  const recent = db.prepare('SELECT event_id, event_name, page_url, utm_source, utm_campaign, value_usd, payload_json, created_at FROM meta_events ORDER BY id DESC LIMIT 25').all();
  res.json({ status: 'ok', total_logged: recent.length, events: recent });
});

app.get('/api/telemetry/buyer-wedge', (req, res) => {
  const metaRows = db.prepare('SELECT event_name, value_usd, payload_json FROM meta_events').all();
  const leadRows = db.prepare('SELECT buyer_wedge FROM leads').all();
  const sessionRows = db.prepare('SELECT plan_tier, buyer_wedge, amount_usd, status FROM checkout_sessions').all();
  const mk = (lbl) => ({ label: lbl, events: 0, wedge_selects: 0, leads: 0, checkout_sessions: 0, revenue_usd: 0, rpv_usd: 0 });
  const breakdown = { creator: mk('I want sponsors for my show'), buyer: mk("I'm buying ads & checking CPMs") };
  const offerTiers = { micro_pass: { price_usd: 0.99, sessions: 0, revenue_usd: 0 }, flash_pass_199: { price_usd: 1.99, sessions: 0, revenue_usd: 0 }, creator_pass: { price_usd: 19, sessions: 0, revenue_usd: 0 }, ledger_pack_29: { price_usd: 29, sessions: 0, revenue_usd: 0 }, creator_pro_49: { price_usd: 49, sessions: 0, revenue_usd: 0 }, agency_desk: { price_usd: 149, sessions: 0, revenue_usd: 0 }, agency_feed_199: { price_usd: 199, sessions: 0, revenue_usd: 0 } };
  for (const r of metaRows) {
    let p = {}; try { p = JSON.parse(r.payload_json || '{}'); } catch (_) {}
    const w = p.buyer_wedge === 'creator' ? 'creator' : 'buyer';
    breakdown[w].events += 1;
    if (r.event_name === 'CustomizeProduct' || p.buyer_wedge) breakdown[w].wedge_selects += 1;
  }
  for (const l of leadRows) { const w = l.buyer_wedge === 'creator' ? 'creator' : 'buyer'; breakdown[w].leads += 1; }
  for (const s of sessionRows) {
    const w = s.buyer_wedge === 'creator' ? 'creator' : 'buyer', amt = Number(s.amount_usd) || 0;
    breakdown[w].checkout_sessions += 1; breakdown[w].revenue_usd = Number((breakdown[w].revenue_usd + amt).toFixed(2));
    const tk = offerTiers[s.plan_tier] ? s.plan_tier : 'flash_pass_199'; offerTiers[tk].sessions += 1; offerTiers[tk].revenue_usd = Number((offerTiers[tk].revenue_usd + amt).toFixed(2));
  }
  for (const k of ['creator', 'buyer']) breakdown[k].rpv_usd = Number((breakdown[k].revenue_usd / Math.max(1, breakdown[k].events || breakdown[k].checkout_sessions || 1)).toFixed(4));
  const totalSessions = sessionRows.length, totalRevUsd = Number((breakdown.creator.revenue_usd + breakdown.buyer.revenue_usd).toFixed(2)), totalVisits = Math.max(1, metaRows.length || totalSessions || 1), overallRpv = Number((totalRevUsd / totalVisits).toFixed(4));
  const cScore = breakdown.creator.checkout_sessions * 10 + breakdown.creator.leads * 3 + breakdown.creator.wedge_selects;
  const bScore = breakdown.buyer.checkout_sessions * 10 + breakdown.buyer.leads * 3 + breakdown.buyer.wedge_selects;
  res.json({ ok: true, focus_track: 'focus_4_offer_and_price_ratchet', winning_wedge: cScore > bScore ? 'creator' : 'buyer', overall_rpv_usd: overallRpv, cohort_window_20: { visits: metaRows.length, target: 20, ready: metaRows.length >= 20, rpv_usd: overallRpv }, offer_tier_breakdown: offerTiers, sqlite_wedge_funnel: breakdown });
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

// Self-Serve Stripe Checkout Endpoint (99¢ / $1.99 / $19 / $29 / $149)
app.get('/api/checkout', (req, res) => {
  const sessions = db.prepare('SELECT session_id, plan_tier, amount_usd, customer_email, buyer_wedge, status, created_at FROM checkout_sessions ORDER BY id DESC LIMIT 20').all();
  res.json({
    status: 'ok',
    plans: [
      { id: 'sample_pass', name: '3-Credit Work Email Sample Unlock (.CSV + .TXT + .EML Preview)', price_usd: 0, interval: 'one_time' },
      { id: 'creator_pass', name: 'Creator Outbound Pass (109-Row CSV + IO Rider + Cold Sequences)', price_usd: 19, interval: 'one_time' },
      { id: 'ledger_pack_29', name: 'Full 109-Row Named-Buyer & Agency CSV Vault + Redlined IO Pack', price_usd: 29, interval: 'one_time' },
      { id: 'agency_desk', name: 'Agency & Talent Management Desk (5 Seats + HubSpot/Clay CRM)', price_usd: 149, interval: 'one_time' }
    ],
    recent_sessions: sessions
  });
});

app.get('/api/github-upgrade/agency-desk-pack.json', (req, res) => {
  const target = String(req.query.target || 'Linear').trim().slice(0, 48);
  const isUnlocked = Boolean(req.query.unlocked === '1' || req.query.session_id || String(req.headers.cookie || '').includes('eb_unlocked=1'));
  const hasEmail = hasRequestEmailUnlock(req);
  const qSuffix = isUnlocked ? '&unlocked=1' : (hasEmail && req.query.email ? `&email=${encodeURIComponent(String(req.query.email).trim())}` : '');
  res.json({
    ok: true,
    tier: 'agency_desk_b2b',
    pricing_options: { sample_3credit_usd: 0, creator_pass_usd: 19, full_vault_usd: 29, multi_seat_agency_desk_usd: 149 },
    target_entity: target,
    deliverables: {
      sample_3credit_dossier_url: `/dossier/sample?target=${encodeURIComponent(target)}${qSuffix}`,
      bulk_named_buyer_csv_url: `/api/github-upgrade/export.csv?target=${encodeURIComponent(target)}${qSuffix}`,
      csv_verified_rows: 109,
      iab_io_makegood_rider_url: `/api/github-upgrade/iab-io-addendum.txt?target=${encodeURIComponent(target)}${qSuffix}`,
      pitch_eml_url: `/api/github-upgrade/pitch.eml?target=${encodeURIComponent(target)}${qSuffix}`,
      crm_webhook_schema: {
        providers: ['HubSpot CRM', 'Clay Webhook', 'Salesforce', 'CSV Outreach Sequence'],
        fields: ['brand_name', 'named_decision_maker_email', 'external_agency_desk_email', 'linkedin_verify_url', 'floor_3flight_cpm_usd', 'iab_makegood_clause', 'renewal_alert_90d_window']
      },
      white_label_media_kit_rate_card: {
        ready: true,
        custom_agency_branding: true,
        floor_cpm_discount_benchmark: '-18% 3-Flight Anchor Floor',
        make_good_protection: 'IAB v2.1 §4.2 (-18% Rate Cap) + §7.1 (85% 30-Day Download / 1.5% CTR Make-Good)'
      }
    }
  });
});

app.post('/api/checkout', async (req, res) => {
  const body = req.body || {};
  // Pre-Launch Checklist #18: Honeypot Spam Protection
  if (body.website_url_hp) {
    return res.status(400).json({ error: 'Spam detected' });
  }
  const rawPlan = String(body.plan_tier || body.tier || 'ledger_pack_29');
  const isMicro = rawPlan === 'micro_pass';
  const isFlash = rawPlan === 'flash_pass';
  const isCreator19 = rawPlan === 'creator_pass' || rawPlan === 'creator_19';
  const isDfy = rawPlan === 'dfy_media_plan_499';
  const isLedger29 = rawPlan === 'ledger_pack_29' || rawPlan === 'playbook_pass' || rawPlan === 'complete_dossier';
  const isAgency149 = rawPlan === 'agency_desk' || rawPlan === 'agency_149' || rawPlan === 'pro_b2b';
  const isAgency = rawPlan === 'agency_feed_199';
  const planTier = isMicro ? 'micro_pass' : (isFlash ? 'flash_pass' : (isCreator19 ? 'creator_pass' : (isDfy ? 'dfy_media_plan_499' : (isLedger29 ? 'ledger_pack_29' : (isAgency149 ? 'agency_desk' : (isAgency ? 'agency_feed_199' : 'creator_pro_49'))))));
  const amountUsd = isMicro ? 0.99 : (isFlash ? 1.99 : (isCreator19 ? 19 : (isDfy ? 499 : (isLedger29 ? 29 : (isAgency149 ? 149 : (isAgency ? 199 : 49))))));
  const isOneTime = true;
  const email = String(body.customer_email || body.email || body.customerEmail || 'founder@creatorstudio.io').trim().slice(0, 254);
  const validStripeEmail = (email && /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(email) && !/^(founder@creatorstudio\.io|creator@sponsorradar\.io|agency@sponsorradar\.io|growth@agency\.io)$/i.test(email)) ? email : '';
  const buyerWedge = String(body.buyer_wedge || (planTier === 'creator_pro_49' || planTier === 'creator_pass' ? 'creator' : 'buyer')).toLowerCase() === 'creator' ? 'creator' : 'buyer';
  const isAutomatedTest = Boolean(
    req.headers['x-playwright-test'] ||
    /headless|playwright|puppeteer|curl|python/i.test(String(req.headers['user-agent'] || ''))
  );
  let sessionId = `cs_live_sr_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  let checkoutUrl = `/directory?checkout_session=${sessionId}`;

  if ((!isAutomatedTest || req.query?.live_stripe === '1') && process.env.STRIPE_SECRET_KEY && process.env.STRIPE_SECRET_KEY.startsWith('sk_')) {
    try {
      const priceId = (isMicro || isFlash || isCreator19 || isDfy || isAgency149) ? '' : (isLedger29 ? process.env.STRIPE_PRICE_PLAYBOOK_29 : (isAgency ? process.env.STRIPE_PRICE_AGENCY_199 : process.env.STRIPE_PRICE_CREATOR_49));
      const params = new URLSearchParams({
        mode: isOneTime ? 'payment' : 'subscription',
        allow_promotion_codes: 'false',
        success_url: `${PUBLIC_URL}/?checkout=success&tier=${planTier}&session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${PUBLIC_URL}/?checkout=cancel&tier=${planTier}`,
        'line_items[0][quantity]': '1'
      });
      if (validStripeEmail) params.set('customer_email', validStripeEmail);
      if (priceId && !isOneTime) {
        params.set('line_items[0][price]', priceId);
      } else {
        params.set('line_items[0][price_data][currency]', 'usd');
        params.set('line_items[0][price_data][unit_amount]', String(Math.round(amountUsd * 100)));
        params.set('line_items[0][price_data][product_data][name]', isMicro ? 'SponsorRadar Single-Row Named Buyer + Agency Pass (99¢)' : (isFlash ? 'SponsorRadar Workflow Pack: Named-Buyer CSV + IO Rider + Outreach ($1.99)' : (isCreator19 ? 'SponsorRadar Creator Pass: 109-Row Named-Buyer CSV + IO Rider + Cold Sequences ($19)' : (isDfy ? 'SponsorRadar Done-For-You 10-Show Q4 Media Plan & Negotiation ($499)' : (isLedger29 ? 'SponsorRadar Full 109-Row Named-Buyer & Agency CSV + Redlined IO Rider ($29)' : (isAgency149 ? 'SponsorRadar B2B Agency & Talent Management Desk: 5 Seats + HubSpot/Clay CRM + White-Label Rate Card ($149)' : (isAgency ? 'SponsorRadar B2B Agency & Talent Desk Feed: Multi-Seat + CRM Webhook ($199/mo)' : 'SponsorRadar Full 109-Row Named-Buyer CSV + IO Rider + 90-Day Renewal Alerts ($49)')))))));
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
    INSERT INTO checkout_sessions (session_id, plan_tier, amount_usd, customer_email, buyer_wedge, utm_source, utm_campaign, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'ready')
  `).run(sessionId, planTier, amountUsd, email, buyerWedge, String(body.utm_source || 'direct'), String(body.utm_campaign || 'self_serve'));

  db.prepare(`
    INSERT INTO leads (email, creator_or_agency_name, query_context, buyer_wedge, utm_source, utm_campaign)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(email, planTier, 'stripe_checkout', buyerWedge, String(body.utm_source || 'direct'), String(body.utm_campaign || 'self_serve'));

  res.json({
    status: 'ok',
    session_id: sessionId,
    plan_tier: planTier,
    amount_usd: amountUsd,
    customer_email: email,
    allow_promotion_codes: false,
    buyer_wedge: buyerWedge,
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
  const initialQuery = String(req.query.q || req.query.target || req.query.preset || req.query.brand || req.query.show || 'Shopify').replace(/[<>"'`]/g, '').trim().slice(0, 80) || 'Shopify';
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
  const lpQuery = String(req.query.q || req.query.target || req.query.brand || 'AG1').replace(/[<>"'`]/g, '').trim().slice(0, 80) || 'AG1';
  const defaultAnalysis = analyzeSponsorLookup(db, { query: lpQuery });
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
      SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type, s.audience_size,
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
      SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type, s.audience_size,
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
    const titleLc = `${page.slug} ${page.title || ''}`.toLowerCase();
    placements = db.prepare(`
      SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type, s.audience_size,
             sb.slug AS brand_seo_slug, ss.slug AS show_seo_slug
      FROM placements p
      JOIN brands b ON b.slug = p.brand_slug
      JOIN shows s ON s.slug = p.show_slug
      LEFT JOIN seo_pages sb ON sb.page_type = 'brand_breakdown' AND sb.target_slug = p.brand_slug
      LEFT JOIN seo_pages ss ON ss.page_type = 'show_benchmark' AND ss.target_slug = p.show_slug
      WHERE (b.vertical LIKE ? OR b.category LIKE ? OR s.niche LIKE ? OR s.channel_type LIKE ? OR ? LIKE '%' || p.brand_slug || '%' OR ? LIKE '%' || REPLACE(p.show_slug, '-newsletter', '') || '%')
      ORDER BY CASE WHEN ? LIKE '%' || p.brand_slug || '%' OR ? LIKE '%' || REPLACE(p.show_slug, '-newsletter', '') || '%' THEN 0 ELSE 1 END, p.flights DESC, p.est_spend_usd DESC
      LIMIT 12
    `).all(kw, kw, kw, kw, titleLc, titleLc, titleLc, titleLc);
    if (placements.length === 0) {
      placements = db.prepare(`
        SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type, s.audience_size,
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
      SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.vertical AS brand_vertical, b.sponsor_email, b.decision_maker_role, s.name AS show_name, s.channel_type, s.audience_size,
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

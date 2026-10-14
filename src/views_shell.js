/**
 * SponsorRadar (#2) — Bloomberg-Meets-Spotify Audio Ad-Spend Terminal UI Shell
 * Design Read: Dark Financial & Audio Media-Buying Terminal for Growth Marketers, Creators & Agencies
 * Canvas: #080B11 | Surface: #0E131D | Border: #1E293B | Spend Accent: #F59E0B | 3x+ ROI Accent: #10B981
 */

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderShell({ title, description, canonicalPath, ogSlug, jsonLd, hideTopNav = false, bodyHtml }) {
  const baseUrl = 'http://127.0.0.1:4102';
  const canonicalUrl = `${baseUrl}${canonicalPath || '/'}`;
  const ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(ogSlug || 'sponsor-radar-terminal')}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}" />
  <link rel="canonical" href="${canonicalUrl}" />
  <meta property="og:title" content="${escapeHtml(title)}" />
  <meta property="og:description" content="${escapeHtml(description)}" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="SponsorRadar Intelligence Terminal" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
  <style>
    :root {
      --bg-canvas: #080B11;
      --bg-surface: #0E131D;
      --bg-elevated: #141C2B;
      --bg-input: #0A0E17;
      --border-hairline: #1E293B;
      --border-bright: #334155;
      --text-primary: #F8FAFC;
      --text-secondary: #94A3B8;
      --text-muted: #64748B;
      --amber-gold: #F59E0B;
      --amber-dim: rgba(245, 158, 11, 0.14);
      --emerald-roi: #10B981;
      --emerald-dim: rgba(16, 185, 129, 0.14);
      --cyan-info: #38BDF8;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body {
      background-color: var(--bg-canvas);
      color: var(--text-primary);
      font-family: var(--font-sans);
      line-height: 1.55;
      max-width: 100vw;
      overflow-x: clip;
      -webkit-font-smoothing: antialiased;
    }
    a { color: inherit; text-decoration: none; }
    .mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
    .container { max-width: 1360px; width: 100%; margin: 0 auto; padding: 0 18px; }

    /* Live Ticker Bar */
    .ticker-bar {
      background: #05070B;
      border-bottom: 1px solid var(--border-hairline);
      padding: 8px 16px;
      font-family: var(--font-mono);
      font-size: 12px;
      color: var(--text-secondary);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .ticker-items {
      display: flex;
      align-items: center;
      gap: 18px;
      overflow-x: auto;
      max-width: 100%;
      white-space: nowrap;
      scrollbar-width: none;
    }
    .ticker-dot {
      display: inline-block;
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--emerald-roi);
      margin-right: 6px;
    }

    /* Top Nav */
    .top-nav {
      background: rgba(8, 11, 17, 0.92);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid var(--border-hairline);
      position: sticky;
      top: 0;
      z-index: 50;
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 64px;
      padding-top: 8px;
      padding-bottom: 8px;
      gap: 12px;
      flex-wrap: wrap;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-weight: 800;
      font-size: 17px;
      letter-spacing: -0.03em;
    }
    .brand-mark {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      background: var(--amber-dim);
      border: 1px solid var(--amber-gold);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 12px;
      font-weight: 700;
      color: var(--amber-gold);
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 14px;
      font-weight: 500;
      color: var(--text-secondary);
    }
    .nav-links a:hover { color: var(--text-primary); }

    /* Tactile Buttons */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      font-family: var(--font-sans);
      font-weight: 700;
      font-size: 14px;
      padding: 11px 16px;
      border-radius: 7px;
      border: 1px solid transparent;
      cursor: pointer;
      transition: transform 160ms ease-out, background-color 160ms ease-out, border-color 160ms ease-out;
      min-height: 44px;
      white-space: nowrap;
    }
    .btn:active { transform: scale(0.97); }
    .btn:focus-visible { outline: 2px solid var(--amber-gold); outline-offset: 2px; }
    .btn-amber { background: var(--amber-gold); color: #080B11; }
    .btn-amber:hover { background: #FBBF24; }
    .btn-emerald { background: var(--emerald-roi); color: #06130E; }
    .btn-emerald:hover { background: #34D399; }
    .btn-ghost { background: var(--bg-elevated); color: var(--text-primary); border-color: var(--border-bright); }
    .btn-ghost:hover { border-color: var(--amber-gold); }

    /* Pills */
    .pill-amber, .pill-emerald, .pill-slate {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 3px 8px;
      border-radius: 4px;
      font-family: var(--font-mono);
      font-size: 11.5px;
      font-weight: 600;
    }
    .pill-amber { background: var(--amber-dim); color: var(--amber-gold); border: 1px solid rgba(245, 158, 11, 0.35); }
    .pill-emerald { background: var(--emerald-dim); color: var(--emerald-roi); border: 1px solid rgba(16, 185, 129, 0.35); }
    .pill-slate { background: #162032; color: var(--text-secondary); border: 1px solid var(--border-hairline); }

    /* Panels */
    .panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-hairline);
      border-radius: 10px;
      max-width: 100%;
    }
    .panel-header {
      padding: 14px 18px;
      border-bottom: 1px solid var(--border-hairline);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .panel-body { padding: 18px; }

    /* Inputs & Responsive Form Grids */
    .lookup-form-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 10px;
      align-items: end;
    }
    @media (min-width: 768px) {
      .lookup-form-grid {
        grid-template-columns: 2fr 1.2fr 1fr auto;
      }
    }
    .two-col-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    @media (min-width: 640px) {
      .two-col-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .input-field, .select-field, .textarea-field {
      width: 100%;
      background: var(--bg-input);
      border: 1px solid var(--border-bright);
      color: var(--text-primary);
      font-family: var(--font-sans);
      font-size: 16px;
      padding: 10px 13px;
      border-radius: 7px;
      min-height: 44px;
      transition: border-color 150ms ease-out;
    }
    .textarea-field {
      font-family: var(--font-mono);
      font-size: 13px;
      line-height: 1.55;
      min-height: 124px;
      resize: vertical;
    }
    .input-field:focus, .select-field:focus, .textarea-field:focus {
      outline: none;
      border-color: var(--amber-gold);
    }

    /* Tables */
    .table-wrap {
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--border-hairline);
      border-radius: 8px;
    }
    table.ledger-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 13.5px;
    }
    table.ledger-table th {
      background: #0B0F18;
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 11px 13px;
      border-bottom: 1px solid var(--border-hairline);
      white-space: nowrap;
    }
    table.ledger-table td {
      padding: 11px 13px;
      border-bottom: 1px solid var(--border-hairline);
      vertical-align: middle;
    }

    /* Hero Layout */
    .hero-section {
      padding: 32px 0 28px;
      border-bottom: 1px solid var(--border-hairline);
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }
    .hero-grid > *, .two-col-grid > *, .pricing-grid > *, .lookup-form-grid > * {
      min-width: 0;
    }
    @media (min-width: 1024px) {
      .hero-grid {
        grid-template-columns: 5fr 7fr;
        align-items: start;
      }
    }
    .headline-xl {
      font-size: clamp(26px, 3.6vw, 44px);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.13;
      margin: 12px 0;
      word-break: break-word;
    }
    .subhead {
      color: var(--text-secondary);
      font-size: 15.5px;
      max-width: 60ch;
      margin-bottom: 18px;
    }

    /* Mode Tabs */
    .mode-tabs {
      display: flex;
      gap: 6px;
      background: #070A10;
      padding: 4px;
      border-radius: 8px;
      border: 1px solid var(--border-hairline);
      width: 100%;
      max-width: 360px;
    }
    .mode-tab {
      flex: 1;
      text-align: center;
      padding: 9px 10px;
      border-radius: 6px;
      font-size: 12.5px;
      font-weight: 700;
      cursor: pointer;
      color: var(--text-secondary);
      background: transparent;
      border: none;
      transition: background-color 150ms ease-out, color 150ms ease-out;
    }
    .mode-tab.active {
      background: var(--bg-elevated);
      color: var(--amber-gold);
      border: 1px solid rgba(245, 158, 11, 0.4);
    }

    /* Preset Chips */
    .preset-row {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin: 12px 0;
    }
    .preset-chip {
      background: #111826;
      border: 1px solid var(--border-bright);
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-size: 11.5px;
      padding: 6px 10px;
      border-radius: 5px;
      cursor: pointer;
      transition: transform 140ms ease-out, border-color 140ms ease-out, color 140ms ease-out;
    }
    .preset-chip:hover { border-color: var(--amber-gold); color: var(--text-primary); }
    .preset-chip:active { transform: scale(0.96); }

    /* KPI Strip */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
      gap: 10px;
      margin-bottom: 16px;
    }
    .kpi-box {
      background: #090D15;
      border: 1px solid var(--border-hairline);
      border-radius: 8px;
      padding: 11px 13px;
    }
    .kpi-label {
      font-size: 10.5px;
      font-family: var(--font-mono);
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 4px;
    }
    .kpi-val {
      font-size: 20px;
      font-weight: 800;
      font-family: var(--font-mono);
      word-break: break-word;
    }

    /* Outbound Pitch Box */
    .pitch-box {
      background: #070A10;
      border: 1px solid rgba(16, 185, 129, 0.35);
      border-radius: 8px;
      padding: 14px;
      margin-top: 16px;
    }
    .pitch-pre {
      white-space: pre-wrap;
      word-break: break-word;
      font-family: var(--font-mono);
      font-size: 12px;
      color: #E2E8F0;
      background: #05070B;
      border: 1px solid var(--border-hairline);
      border-radius: 6px;
      padding: 12px;
      margin-top: 10px;
      max-height: 250px;
      overflow-y: auto;
    }

    /* Pricing Grid */
    .pricing-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 20px;
    }
    @media (min-width: 860px) {
      .pricing-grid { grid-template-columns: 1fr 1fr; }
    }

    /* Cookie Consent */
    .cookie-bar {
      position: fixed;
      bottom: 14px;
      right: 14px;
      left: 14px;
      max-width: 540px;
      margin-left: auto;
      background: #0E1420;
      border: 1px solid var(--border-bright);
      border-radius: 10px;
      padding: 12px 16px;
      z-index: 90;
      display: none;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      box-shadow: 0 18px 40px rgba(0, 0, 0, 0.65);
    }
    @media (max-width: 768px) {
      .nav-links { display: none; }
      .nav-cta-secondary { display: none; }
      .cookie-bar { flex-direction: column; align-items: stretch; }
    }
  </style>
</head>
<body>
  <div class="ticker-bar">
    <div class="ticker-items">
      <span><span class="ticker-dot"></span>LIVE AD-SPEND LEDGER: <strong>42 BRANDS</strong> • <strong>46 SHOWS</strong> • <strong>96 VERIFIED FLIGHTS</strong></span>
      <span>AG1 → Huberman Lab <span style="color:var(--emerald-roi)">18x RENEWED</span> ($67.5K/flight)</span>
      <span>Deel → Lenny's Podcast <span style="color:var(--emerald-roi)">12x RENEWED</span> ($31.6K/flight)</span>
      <span>Ramp → Acquired <span style="color:var(--emerald-roi)">10x RENEWED</span> ($48.5K/flight)</span>
      <span>Sentry → Syntax.fm <span style="color:var(--emerald-roi)">24x RENEWED</span> ($9.8K/flight)</span>
    </div>
    <div class="mono" style="color:var(--amber-gold);">TERMINAL PORT :4102 • IAB 30-DAY VERIFIED</div>
  </div>

  ${hideTopNav ? '' : `
  <header class="top-nav">
    <div class="container nav-inner">
      <a href="/" class="brand-logo">
        <span class="brand-mark">SR</span>
        <span>SponsorRadar</span>
        <span class="pill-emerald">3x+ ROI</span>
      </a>
      <nav class="nav-links" aria-label="Main Navigation">
        <a href="/#radar-tool">Interactive Spend Radar</a>
        <a href="/#verified-ledger">3x-Renewal Ledger</a>
        <a href="/directory">pSEO Directory (60+)</a>
        <a href="/lp">Paid-Social LP</a>
        <a href="/#pricing">Pricing</a>
      </nav>
      <div style="display:flex; gap:8px;">
        <a href="/directory" class="btn btn-ghost nav-cta-secondary" style="padding:7px 12px; min-height:38px; font-size:12.5px;">Browse 60+ Reports</a>
        <a href="/#pricing" class="btn btn-amber" style="padding:7px 12px; min-height:38px; font-size:12.5px;">Unlock Feed ($49)</a>
      </div>
    </div>
  </header>
  `}

  <main>
    ${bodyHtml}
  </main>

  <footer style="border-top:1px solid var(--border-hairline); padding:40px 0; margin-top:64px; color:var(--text-secondary); font-size:13px;">
    <div class="container" style="display:flex; flex-wrap:wrap; justify-content:space-between; gap:24px;">
      <div>
        <div class="brand-logo" style="margin-bottom:8px;">
          <span class="brand-mark">SR</span>
          <span>SponsorRadar (#2)</span>
        </div>
        <p style="max-width:440px; color:var(--text-muted);">
          The Autonomous Podcast, Newsletter &amp; YouTube Ad-Read Spend Ledger, 3x-Renewal ROI Detector &amp; Outbound Media-Buying Engine.
        </p>
      </div>
      <div style="display:flex; gap:32px; flex-wrap:wrap;">
        <div>
          <div class="mono" style="color:var(--text-primary); font-weight:700; margin-bottom:8px;">TERMINAL</div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <a href="/">Live Sponsor Radar</a>
            <a href="/directory">60+ pSEO Spend Reports</a>
            <a href="/lp">Direct-Response Landing Page</a>
            <a href="/sitemap.xml">XML Sitemap</a>
          </div>
        </div>
        <div>
          <div class="mono" style="color:var(--text-primary); font-weight:700; margin-bottom:8px;">TOP 3x+ REPORTS</div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <a href="/seo/ag1-podcast-sponsorship-spend-and-roi">AG1 Spend &amp; 3x ROI</a>
            <a href="/seo/deel-newsletter-and-podcast-ad-spend">Deel B2B Ad Ledger</a>
            <a href="/seo/ramp-b2b-podcast-sponsorship-strategy">Ramp Podcast Strategy</a>
            <a href="/seo/lennys-podcast-sponsors-and-ad-rates">Lenny's Podcast CPMs</a>
          </div>
        </div>
        <div>
          <div class="mono" style="color:var(--text-primary); font-weight:700; margin-bottom:8px;">COMPLIANCE</div>
          <div style="display:flex; flex-direction:column; gap:6px;">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/robots.txt">robots.txt</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <div id="cookie-banner" class="cookie-bar" role="region" aria-label="Cookie consent">
    <div style="font-size:12.5px; color:var(--text-secondary);">
      <strong style="color:var(--text-primary);">Attribution &amp; Privacy Control:</strong> We use first-party UTM &amp; Meta CAPI deduplication cookies only after consent.
    </div>
    <div style="display:flex; gap:8px;">
      <button type="button" class="btn btn-ghost" style="padding:6px 12px; min-height:36px; font-size:12px;" onclick="setCookieConsent('rejected')">Reject</button>
      <button type="button" class="btn btn-amber" style="padding:6px 12px; min-height:36px; font-size:12px;" onclick="setCookieConsent('accepted')">Accept</button>
    </div>
  </div>

  <script>
    function getUtmParams() {
      const p = new URLSearchParams(window.location.search);
      return {
        utm_source: p.get('utm_source') || 'direct',
        utm_medium: p.get('utm_medium') || 'organic',
        utm_campaign: p.get('utm_campaign') || 'sponsor_radar_launch',
        utm_content: p.get('utm_content') || '',
        utm_term: p.get('utm_term') || ''
      };
    }

    async function fireMetaEvent(eventName, valueUsd, extraData) {
      try {
        const utms = getUtmParams();
        const eventId = 'sr_' + eventName.toLowerCase() + '_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7);
        await fetch('/api/meta-capi', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_id: eventId,
            event_name: eventName,
            page_url: window.location.href,
            value_usd: valueUsd || 0,
            ...utms,
            extra: extraData || {}
          })
        });
      } catch (_) {}
    }

    function setCookieConsent(choice) {
      try { localStorage.setItem('sr_cookie_consent', choice); } catch (_) {}
      const el = document.getElementById('cookie-banner');
      if (el) el.style.display = 'none';
      if (choice === 'accepted') fireMetaEvent('ViewContent', 0, { consent: true });
    }

    window.addEventListener('DOMContentLoaded', () => {
      let saved = null;
      try { saved = localStorage.getItem('sr_cookie_consent'); } catch (_) {}
      if (!saved) {
        const el = document.getElementById('cookie-banner');
        if (el) el.style.display = 'flex';
      }
      fireMetaEvent('ViewContent', 0, { path: window.location.pathname });
    });
  </script>
</body>
</html>`;
}

module.exports = {
  escapeHtml,
  renderShell
};

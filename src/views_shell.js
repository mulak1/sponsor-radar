/**
 * SponsorRadar (#2): Passionfroot + Beehiiv + Ramp Editorial Media Intelligence Design System
 * Core Personas:
 *   1. DTC & B2B Brand Media Buyers / Growth & Partnerships Managers (AG1, Eight Sleep, Ramp, Deel, Notion)
 *   2. Creator Economy Operators, Newsletter Publishers & Talent Agencies (Substack, Beehiiv, Passionfroot, Spotify)
 * Palette:
 *   Canvas: Warm Editorial Newsprint Ivory (#FBF8F3) & Soft Parchment (#F4EFE6)
 *   Surface: Pure Porcelain Bento Cards (#FFFFFF) with Warm Sand Borders (#E5DEC9)
 *   Ink: Deep Espresso (#161412) & Warm Charcoal (#57524A)
 *   Accents: Signal Vermilion (#E84E36), Botanical Emerald 3x+ ROI (#0F766E), Marigold CPM (#B45309)
 */

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderBrandLogoSvg(size = 38) {
  return `<svg class="brand-emblem-svg" width="${size}" height="${size}" viewBox="0 0 48 48" role="img" aria-label="SponsorRadar Acoustic Broadcast Radar Crest" xmlns="http://www.w3.org/2000/svg">
    <title>SponsorRadar Acoustic Broadcast Radar Crest</title>
    <defs>
      <linearGradient id="sr-vermilion-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF6B52" />
        <stop offset="100%" stop-color="#E84E36" />
      </linearGradient>
    </defs>
    <!-- Sculpted Espresso Squircle Outer Bezel -->
    <rect x="1.5" y="1.5" width="45" height="45" rx="13" fill="#161412" stroke="#D8CEBE" stroke-width="1.5" />
    <rect x="4.5" y="4.5" width="39" height="39" rx="10" fill="none" stroke="rgba(251, 248, 243, 0.12)" stroke-width="1" />
    <!-- Concentric Acoustic Radar Rings -->
    <circle cx="24" cy="24" r="14.5" fill="none" stroke="rgba(251, 248, 243, 0.22)" stroke-width="1.25" stroke-dasharray="3 2.5" />
    <circle cx="24" cy="24" r="9.5" fill="none" stroke="rgba(251, 248, 243, 0.38)" stroke-width="1.25" />
    <!-- Broadcast Frequency Wave Arc (Top Right Sector) -->
    <path d="M 24 9.5 A 14.5 14.5 0 0 1 38.5 24" fill="none" stroke="url(#sr-vermilion-grad)" stroke-width="2.4" stroke-linecap="round" />
    <path d="M 24 14.5 A 9.5 9.5 0 0 1 33.5 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" />
    <!-- Precision Radar Sweep Needle -->
    <line x1="24" y1="24" x2="35.5" y2="12.5" stroke="#E84E36" stroke-width="2.2" stroke-linecap="round" />
    <!-- 3x+ Verified Renewal Blip Node -->
    <circle cx="33.5" cy="14.5" r="3" fill="#10B981" stroke="#161412" stroke-width="1.2" />
    <!-- Acoustic Focal Core -->
    <circle cx="24" cy="24" r="3.4" fill="#FBF8F3" />
    <circle cx="24" cy="24" r="1.6" fill="#E84E36" />
  </svg>`;
}

function renderShell({ title, description, canonicalPath, ogSlug, jsonLd, bodyHtml }) {
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.sponsorradar.io').replace(/\/$/, '');
  const canonicalUrl = `${baseUrl}${canonicalPath || '/'}`;
  const ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(ogSlug || 'sponsor-radar-editorial')}`;

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
  <meta property="og:site_name" content="SponsorRadar Media Intelligence" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(title)}" />
  <meta name="twitter:description" content="${escapeHtml(description)}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="apple-touch-icon" href="/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,500;1,6..72,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
  ${jsonLd ? `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>` : ''}
  <style>
    :root {
      --bg-canvas: #FBF8F3;
      --bg-parchment: #F4EFE6;
      --bg-bezel: #EFE9DD;
      --bg-surface: #FFFFFF;
      --bg-elevated: #FAF6EE;
      --bg-input: #FFFFFF;
      --border-hairline: #E5DEC9;
      --border-strong: #CFC5B0;
      --text-primary: #161412;
      --text-secondary: #57524A;
      --text-muted: #78716C;
      --vermilion: #E84E36;
      --vermilion-hover: #D13D26;
      --vermilion-soft: #FFF1EE;
      --vermilion-border: #FFD5CC;
      --emerald-roi: #0F766E;
      --emerald-soft: #ECFDF5;
      --emerald-border: #A7F3D0;
      --amber-gold: #B45309;
      --amber-soft: #FEF3C7;
      --amber-border: #FDE68A;
      --cyan-info: #0369A1;
      --shadow-editorial: 0 18px 42px -12px rgba(24, 20, 16, 0.07), 0 4px 12px -2px rgba(24, 20, 16, 0.04);
      --shadow-subtle: 0 4px 14px rgba(24, 20, 16, 0.04);
      --font-serif: 'Newsreader', Georgia, serif;
      --font-sans: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      --font-mono: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html {
      scroll-behavior: smooth;
      background-color: var(--bg-canvas);
      color: var(--text-primary);
      font-family: var(--font-sans);
      line-height: 1.6;
      max-width: 100vw;
      overflow-x: clip;
      -webkit-font-smoothing: antialiased;
    }
    body {
      background-color: var(--bg-canvas);
      color: var(--text-primary);
      max-width: 100vw;
      overflow-x: clip;
    }
    a { color: inherit; text-decoration: none; }
    .mono { font-family: var(--font-mono); font-variant-numeric: tabular-nums; }
    .serif-italic { font-family: var(--font-serif); font-style: italic; font-weight: 500; }
    .container { max-width: 1320px; width: 100%; margin: 0 auto; padding: 0 20px; }

    /* Accessibility Skip Link */
    .skip-link {
      position: absolute;
      top: -60px;
      left: 16px;
      background: var(--text-primary);
      color: #FFFFFF;
      padding: 8px 14px;
      border-radius: 6px;
      z-index: 100;
      font-size: 13px;
      font-weight: 600;
    }
    .skip-link:focus { top: 12px; }

    /* Top Editorial Intelligence Ribbon */
    .ticker-bar {
      display: none;
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

    /* Sticky Editorial Header Navigation */
    .top-nav {
      background: rgba(251, 248, 243, 0.92);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--border-hairline);
      position: sticky;
      top: 0;
      z-index: 40;
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 70px;
      padding: 10px 0;
      gap: 14px;
      flex-wrap: wrap;
    }
    .brand-logo {
      display: inline-flex;
      align-items: center;
      gap: 11px;
      color: var(--text-primary);
      text-decoration: none;
      transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .brand-logo:hover { transform: translateY(-1px); }
    .brand-wordmark {
      font-family: var(--font-serif);
      font-weight: 700;
      font-size: 23px;
      letter-spacing: -0.03em;
      color: var(--text-primary);
      line-height: 1;
    }
    .brand-subtag {
      display: block;
      font-family: var(--font-mono);
      font-size: 12.5px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      margin-top: 2px;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 20px;
      font-size: 14.5px;
      font-weight: 600;
      color: var(--text-secondary);
      flex-wrap: wrap;
    }
    .nav-links a {
      padding: 4px 2px;
      transition: color 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .nav-links a:hover { color: var(--vermilion); }

    /* Tactile Agency Buttons & Button-in-Button Trailing Icon */
    .btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 9px;
      font-family: var(--font-sans);
      font-weight: 700;
      font-size: 14.5px;
      padding: 10px 18px;
      border-radius: 10px;
      border: 1px solid transparent;
      cursor: pointer;
      transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), background-color 180ms cubic-bezier(0.16, 1, 0.3, 1), border-color 180ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 180ms cubic-bezier(0.16, 1, 0.3, 1);
      min-height: 44px;
      white-space: nowrap;
    }
    .btn:active { transform: scale(0.98); }
    .btn:focus-visible { outline: 2px solid var(--vermilion); outline-offset: 2px; }
    .btn-vermilion, .btn-amber {
      background: var(--vermilion);
      color: #FFFFFF;
      box-shadow: 0 6px 18px -4px rgba(232, 78, 54, 0.38);
    }
    .btn-vermilion:hover, .btn-amber:hover {
      background: var(--vermilion-hover);
    }
    .btn-emerald {
      background: var(--emerald-roi);
      color: #FFFFFF;
      box-shadow: 0 6px 18px -4px rgba(15, 118, 110, 0.32);
    }
    .btn-emerald:hover { background: #0D635C; }
    .btn-ghost {
      background: var(--bg-surface);
      color: var(--text-primary);
      border-color: var(--border-strong);
      box-shadow: var(--shadow-subtle);
    }
    .btn-ghost:hover {
      border-color: var(--text-primary);
      background: var(--bg-elevated);
    }
    .btn-icon-circle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      font-size: 13px;
      transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .btn:hover .btn-icon-circle {
      transform: translate(1px, -1px);
    }

    /* Semantic Editorial Badges */
    .pill-amber, .pill-emerald, .pill-slate, .pill-vermilion {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 4px 10px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.02em;
    }
    .pill-vermilion {
      background: var(--vermilion-soft);
      color: #B9311C;
      border: 1px solid var(--vermilion-border);
    }
    .pill-amber {
      background: var(--amber-soft);
      color: var(--amber-gold);
      border: 1px solid var(--amber-border);
    }
    .pill-emerald {
      background: var(--emerald-soft);
      color: var(--emerald-roi);
      border: 1px solid var(--emerald-border);
    }
    .pill-slate {
      background: var(--bg-parchment);
      color: var(--text-secondary);
      border: 1px solid var(--border-hairline);
    }

    /* Double-Bezel Porcelain Bento Panels */
    .panel {
      background: var(--bg-surface);
      border: 1px solid var(--border-hairline);
      border-radius: 16px;
      box-shadow: none;
      max-width: 100%;
    }
    .double-bezel {
      background: var(--bg-bezel);
      padding: 6px;
      border-radius: 20px;
      border: 1px solid var(--border-hairline);
    }
    .panel-header {
      padding: 14px 20px;
      border-bottom: 1px solid var(--border-hairline);
      background: var(--bg-elevated);
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .panel-body { padding: 20px; }

    /* Responsive Form Grids */
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
      gap: 14px;
    }
    @media (min-width: 640px) {
      .two-col-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    .input-field, .select-field, .textarea-field {
      width: 100%;
      background: var(--bg-input);
      border: 1px solid var(--border-strong);
      color: var(--text-primary);
      font-family: var(--font-sans);
      font-size: 16px;
      padding: 10px 13px;
      border-radius: 9px;
      min-height: 44px;
      transition: border-color 160ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .textarea-field {
      font-family: var(--font-mono);
      font-size: 14px;
      line-height: 1.55;
      min-height: 124px;
      resize: vertical;
    }
    .input-field:focus, .select-field:focus, .textarea-field:focus {
      outline: none;
      border-color: var(--vermilion);
      box-shadow: 0 0 0 3px rgba(232, 78, 54, 0.14);
    }

    /* Editorial Financial Ledger Tables */
    .table-wrap {
      width: 100%;
      overflow-x: auto;
      border: 1px solid var(--border-hairline);
      border-radius: 12px;
      background: var(--bg-surface);
    }
    table.ledger-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 14.5px;
    }
    table.ledger-table th {
      background: var(--bg-parchment);
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      padding: 12px 14px;
      border-bottom: 1px solid var(--border-hairline);
      white-space: nowrap;
    }
    table.ledger-table td {
      padding: 12px 14px;
      border-bottom: 1px solid var(--border-hairline);
      vertical-align: middle;
      color: var(--text-primary);
    }
    table.ledger-table tr:hover td {
      background: var(--bg-elevated);
    }

    /* Editorial Hero Section */
    .hero-section {
      padding: 36px 0 36px;
      border-bottom: 1px solid var(--border-hairline);
      background: var(--bg-canvas);
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
        grid-template-columns: 6fr 6fr;
        align-items: stretch;
      }
    }
    .headline-xl {
      font-family: var(--font-serif);
      font-size: clamp(30px, 3.3vw, 44px);
      font-weight: 600;
      letter-spacing: -0.025em;
      line-height: 1.12;
      margin: 10px 0 12px;
      color: var(--text-primary);
      text-wrap: balance;
    }
    .subhead {
      color: var(--text-secondary);
      font-size: 16px;
      max-width: 58ch;
      margin-bottom: 16px;
      line-height: 1.6;
    }
    @media (max-width: 767px) {
      .ticker-bar { display: none; }
      .nav-inner { min-height: 48px; padding: 4px 0; gap: 6px; }
      .nav-links { gap: 8px; font-size: 13px; }
      .hero-section { padding: 12px 0 20px; }
      .headline-xl { font-size: 25px; margin: 6px 0; }
      .subhead { font-size: 14px; line-height: 1.45; margin-bottom: 8px; }
    }

    /* Mode Tabs */
    .mode-tabs {
      display: flex;
      gap: 6px;
      background: var(--bg-parchment);
      padding: 4px;
      border-radius: 10px;
      border: 1px solid var(--border-hairline);
      width: 100%;
      max-width: 370px;
    }
    .mode-tab {
      flex: 1;
      text-align: center;
      padding: 8px 10px;
      border-radius: 7px;
      font-size: 13.5px;
      font-weight: 700;
      cursor: pointer;
      color: var(--text-secondary);
      background: transparent;
      border: none;
      transition: background-color 160ms cubic-bezier(0.16, 1, 0.3, 1), color 160ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .mode-tab.active {
      background: var(--bg-surface);
      color: var(--vermilion);
      box-shadow: var(--shadow-subtle);
      border: 1px solid var(--border-hairline);
    }

    /* Preset Chips */
    .preset-row {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin: 12px 0;
    }
    .preset-chip {
      background: var(--bg-elevated);
      border: 1px solid var(--border-strong);
      color: var(--text-secondary);
      font-family: var(--font-mono);
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 7px;
      cursor: pointer;
      transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1), border-color 150ms cubic-bezier(0.16, 1, 0.3, 1), color 150ms cubic-bezier(0.16, 1, 0.3, 1), background-color 150ms cubic-bezier(0.16, 1, 0.3, 1);
    }
    .preset-chip:hover {
      border-color: var(--vermilion);
      color: var(--text-primary);
      background: var(--bg-surface);
    }
    .preset-chip:active { transform: scale(0.97); }

    /* KPI Strip */
    .kpi-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(145px, 1fr));
      gap: 10px;
      margin-bottom: 16px;
    }
    .kpi-box {
      background: var(--bg-elevated);
      border: 1px solid var(--border-hairline);
      border-radius: 10px;
      padding: 12px 14px;
    }
    .kpi-label {
      font-size: 13px;
      font-family: var(--font-mono);
      text-transform: uppercase;
      color: var(--text-muted);
      margin-bottom: 4px;
    }
    .kpi-val {
      font-size: 20px;
      font-weight: 800;
      font-family: var(--font-mono);
      color: var(--text-primary);
      word-break: break-word;
    }

    /* Outbound Pitch Box */
    .pitch-box {
      background: var(--emerald-soft);
      border: 1px solid var(--emerald-border);
      border-radius: 16px;
      padding: 20px 22px;
      margin-top: 16px;
    }
    .pitch-pre {
      white-space: pre-wrap;
      word-break: break-word;
      font-family: var(--font-mono);
      font-size: 13.5px;
      line-height: 1.65;
      color: var(--text-primary);
      background: var(--bg-surface);
      border: 1px solid var(--border-hairline);
      border-radius: 12px;
      padding: 16px 18px;
      margin-top: 12px;
      max-height: none;
      overflow: visible;
    }

    /* Pricing Grid */
    .pricing-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 22px;
    }
    @media (min-width: 860px) {
      .pricing-grid { grid-template-columns: 1fr 1fr; }
    }

    /* Docked Non-Overlapping Cookie Consent Bar */
    .cookie-bar {
      background: var(--bg-parchment);
      border-top: 1px solid var(--border-strong);
      border-bottom: 1px solid var(--border-hairline);
      padding: 14px 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      flex-wrap: wrap;
    }

    /* Honeypot invisible field */
    .hp-field {
      position: absolute;
      left: -9999px;
      width: 1px;
      height: 1px;
      opacity: 0;
      pointer-events: none;
    }

    .hero-steps-grid {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 10px;
      margin-bottom: 0;
    }

    @media (max-width: 768px) {
      .hero-steps-grid { grid-template-columns: 1fr; }
      .nav-inner { gap: 10px; }
      .nav-links {
        width: 100%;
        order: 3;
        justify-content: flex-start;
        gap: 14px;
        font-size: 13.5px;
        padding-top: 6px;
        border-top: 1px solid var(--border-hairline);
      }
      .nav-cta-secondary { display: none; }
    }
  </style>
</head>
<body>
  <a href="#main-content" class="skip-link">Skip to main content</a>

  <div class="ticker-bar">
    <div class="ticker-items">
      <span><span class="ticker-dot"></span>EDITORIAL AD-SPEND LEDGER: <strong>42 BRANDS</strong> • <strong>46 CREATOR SHOWS</strong> • <strong>96 VERIFIED FLIGHTS</strong></span>
      <span>AG1 → Huberman Lab <span style="color:var(--emerald-roi); font-weight:700;">18x RENEWED</span> ($67.5K/flight)</span>
      <span>Deel → Lenny's Podcast <span style="color:var(--emerald-roi); font-weight:700;">12x RENEWED</span> ($31.6K/flight)</span>
      <span>Ramp → Acquired <span style="color:var(--emerald-roi); font-weight:700;">10x RENEWED</span> ($48.5K/flight)</span>
    </div>
    <div class="mono" style="color:var(--amber-gold); font-weight:600;">IAB 30-DAY VERIFIED • LIVE Q4 LEDGER</div>
  </div>

  <header class="top-nav">
    <div class="container nav-inner">
      <a href="/" class="brand-logo" aria-label="SponsorRadar Home">
        ${renderBrandLogoSvg(38)}
        <div>
          <span class="brand-wordmark">SponsorRadar</span>
          <span class="brand-subtag">3x+ Renewal Media Ledger</span>
        </div>
      </a>
      <nav class="nav-links" aria-label="Primary Navigation">
        <a href="/#radar-tool">Spend Radar</a>
        <a href="/leaderboard" style="font-weight:700;color:var(--vermilion);">Leaderboard</a>
        <a href="/directory">Spend Directory</a>
        <a href="/#pricing">Pricing</a>
      </nav>
      <div style="display:flex; gap:10px; align-items:center;">
        <a href="/buy/flash_pass?source=header_nav" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:9px 18px; min-height:40px; font-size:13.5px; text-decoration:none;">
          <span>Unlock Sponsor Pack ($1.99) →</span>
        </a>
      </div>
    </div>
  </header>

  <main id="main-content">
    ${bodyHtml}
  </main>

  <!-- Docked Non-Overlapping GDPR/CCPA Cookie & Attribution Bar -->
  <aside id="cookie-banner" class="cookie-bar" role="region" aria-label="Cookie and attribution consent">
    <div class="container" style="display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap;">
      <div style="font-size:13.5px; color:var(--text-secondary);">
        <strong style="color:var(--text-primary);">Editorial Privacy &amp; Attribution Control:</strong> We use first-party UTM &amp; Meta CAPI deduplication cookies only after consent. Read our <a href="/privacy" style="text-decoration:underline; color:var(--vermilion);">Privacy Policy</a>.
      </div>
      <div style="display:flex; gap:8px;">
        <button type="button" class="btn btn-ghost" style="padding:7px 14px; min-height:38px; font-size:13px;" onclick="setCookieConsent('rejected')">Reject Non-Essential</button>
        <button type="button" class="btn btn-vermilion" style="padding:7px 14px; min-height:38px; font-size:13px;" onclick="setCookieConsent('accepted')">Accept Attribution</button>
      </div>
    </div>
  </aside>

  <footer style="border-top:1px solid var(--border-hairline); background:var(--bg-parchment); padding:48px 0; color:var(--text-secondary); font-size:14px;">
    <div class="container" style="display:flex; flex-wrap:wrap; justify-content:space-between; gap:28px;">
      <div>
        <a href="/" class="brand-logo" style="margin-bottom:10px;">
          ${renderBrandLogoSvg(34)}
          <div>
            <span class="brand-wordmark" style="font-size:20px;">SponsorRadar</span>
            <span class="brand-subtag">Creator &amp; Brand Media Intelligence</span>
          </div>
        </a>
        <p style="max-width:430px; color:var(--text-secondary); margin-top:8px;">
          Built for DTC &amp; B2B brand partnership managers, growth buyers, and newsletter/podcast operators. Track verified 3x+ sponsor renewals, negotiated CPM rates, and promo-code attribution.
        </p>
      </div>
      <div style="display:flex; gap:36px; flex-wrap:wrap;">
        <div>
          <div class="mono" style="color:var(--text-primary); font-weight:700; font-size:13px; margin-bottom:10px;">PLATFORM</div>
          <div style="display:flex; flex-direction:column; gap:7px;">
            <a href="/#radar-tool">Interactive Spend Radar</a>
            <a href="/leaderboard">🏆 Industry Leaderboard</a>
            <a href="/directory">60+ pSEO Spend Reports</a>
            <a href="/sitemap.xml">XML Sitemap</a>
          </div>
        </div>
        <div>
          <div class="mono" style="color:var(--text-primary); font-weight:700; font-size:13px; margin-bottom:10px;">VERIFIED SPEND LEDGERS</div>
          <div style="display:flex; flex-direction:column; gap:7px;">
            <a href="/seo/ag1-podcast-sponsorship-spend-and-roi">AG1 Spend &amp; 3x ROI</a>
            <a href="/seo/deel-newsletter-and-podcast-ad-spend">Deel B2B Ad Ledger</a>
            <a href="/seo/ramp-b2b-podcast-sponsorship-strategy">Ramp Podcast Strategy</a>
            <a href="/seo/lennys-podcast-sponsors-and-ad-rates">Lenny's Podcast CPMs</a>
          </div>
        </div>
        <div>
          <div class="mono" style="color:var(--text-primary); font-weight:700; font-size:13px; margin-bottom:10px;">LEGAL &amp; TRUST</div>
          <div style="display:flex; flex-direction:column; gap:7px;">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
            <a href="/robots.txt">robots.txt</a>
          </div>
        </div>
      </div>
    </div>
  </footer>

  <script>
    function getUtmParams() {
      const p = new URLSearchParams(window.location.search);
      return {
        utm_source: p.get('utm_source') || 'direct',
        utm_medium: p.get('utm_medium') || 'organic',
        utm_campaign: p.get('utm_campaign') || 'sponsor_radar_editorial',
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
      if (saved) {
        const el = document.getElementById('cookie-banner');
        if (el) el.style.display = 'none';
      }
      fireMetaEvent('ViewContent', 0, { path: window.location.pathname });
    });
  </script>
</body>
</html>`;
}

module.exports = {
  escapeHtml,
  renderBrandLogoSvg,
  renderShell
};

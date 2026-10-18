/**
 * ExactBaseline (custom_automaton) Cumulative UI, Deliverable Value-Gating & Behavioral Economics Architecture
 * Shared across CitationForge (#1), SponsorRadar (#2), DermLogic (#4), and AbandonAlpha (#9).
 *
 * Architectural & Behavioral Economics Principles (@richardrx revenue-centric-design + Dan Ariely):
 *  1. NATIVE HERO FIRST: Never inject a disjoint box above <main>. The visitor immediately sees the site's
 *     native editorial Hero headline and native interactive calculator above the fold on Desktop and Mobile.
 *  2. ZERO-PRICE EFFECT PREVENTION: Never place a "$0 Free" or "$0 Partner" button next to a paid "$1.99" CTA
 *     for the same deliverable. Free = Instant Diagnostic + 3-Line jsdiff Proof Preview. Paid = Full Production
 *     Deliverable & Export Bundle ($1.99 Single-Audit Pass vs. $4.99/$49 Complete Pack vs. $19.99/$99/$199 Pro Anchor).
 *  3. DOWNSELL-ONLY EMAIL CAPTURE: Email capture appears only in the Exit-Intent Rescue Toast (#eb-ouibounce-toast)
 *     when an abandoning visitor moves to close the tab, sending a 1-page diagnostic summary without cannibalizing buyers.
 *  4. 100% PERSONA-AUTHENTIC COPY: Every vertical renders bespoke terminology, comparison columns, and export actions.
 * Strictly < 1,000 lines per /code-craft rules.
 */

const SOVRN_KEY = process.env.SOVRN_COMMERCE_KEY || 'ea3d7b74c5752fd817f896be27cd1a01';
const { buildMobileSeoCrawlMeshHtml, enhanceHtmlForSearchAndAiBots } = require('./exact-baseline-seo');

function esc(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function getTheme(cfg) {
  return cfg.theme || {
    canvasBg: '#FAF9F5', cardBg: '#FFFFFF', subtleBg: '#F3F1EC', dockBg: 'rgba(255, 255, 255, 0.95)',
    border: '#E4E2DD', accentBorder: '#C7D2FE', textPrimary: '#0F172A', textSecondary: '#475569', textMuted: '#64748B',
    brandPrimary: cfg.accentColor || '#4F46E5', brandSoftBg: '#EEF2FF', brandText: '#3730A3',
    safeColor: '#059669', safeSoftBg: '#ECFDF5', safeBorder: '#A7F3D0', warnColor: '#B45309',
    fontDisplay: 'Georgia, serif', fontSans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    radiusCard: '14px', radiusPill: '999px', shadow: '0 12px 32px -12px rgba(15, 23, 42, 0.06)'
  };
}

function buildExactBaselineStyles(cfg) {
  const t = getTheme(cfg);
  return `<style id="exact-baseline-cumulative-css">
  html, body { max-width: 100vw !important; overflow-x: hidden !important; }
  *, *::before, *::after { box-sizing: border-box; }
  button, .preset-chip, .store-preview-pill, .eb-action-btn, .cta-btn, a[role="button"] { transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms ease, border-color 150ms ease, box-shadow 150ms ease; cursor: pointer; }
  button:active, .preset-chip:active, .store-preview-pill:active, .eb-action-btn:active, .cta-btn:active { transform: scale(0.98) !important; }
  .metric-box-value, .matrix-price, .eb-kpi-val, .eb-tabular { font-variant-numeric: tabular-nums !important; }
  .eb-blurred-deliverable { filter: blur(5px) !important; user-select: none !important; cursor: pointer !important; max-height: 140px !important; overflow: hidden !important; opacity: 0.55 !important; transition: filter 250ms ease, max-height 250ms ease, opacity 250ms ease; }
  #eb-deliverable-curtain { margin-top: 14px; padding: 16px 18px; border-radius: ${t.radiusCard}; background: ${t.cardBg}; color: ${t.textPrimary}; border: 1.5px solid ${t.accentBorder}; box-shadow: ${t.shadow}; font-family: ${t.fontSans}; position: relative; z-index: 20; text-transform: none !important; letter-spacing: normal !important; font-style: normal !important; font-weight: 400 !important; }
  #eb-prism-proof-preview { background: ${t.subtleBg}; color: ${t.textPrimary}; border: 1px solid ${t.border}; border-radius: 10px; padding: 10px 12px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; line-height: 1.45; margin: 0; overflow-x: auto; white-space: pre-wrap; text-transform: none !important; letter-spacing: normal !important; }
  .eb-doppelrand-shell { padding: 6px; border-radius: 18px; background: rgba(15, 23, 42, 0.035); border: 1px solid ${t.border}; box-shadow: 0 14px 34px -10px rgba(15, 23, 42, 0.08); margin: 10px 0 12px 0; transition: transform 650ms cubic-bezier(0.32, 0.72, 0, 1), box-shadow 650ms cubic-bezier(0.32, 0.72, 0, 1); }
  .eb-doppelrand-shell:hover { transform: translateY(-2px); box-shadow: 0 20px 42px -12px rgba(15, 23, 42, 0.13); }
  .eb-doppelrand-inner { position: relative; border-radius: 13px; overflow: hidden; background: ${t.cardBg}; box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.65); }
  .eb-doppelrand-img { width: 100%; height: 178px; object-fit: cover; object-position: center 44%; display: block; transition: transform 750ms cubic-bezier(0.32, 0.72, 0, 1); }
  .eb-doppelrand-shell:hover .eb-doppelrand-img { transform: scale(1.03); }
  .eb-doppelrand-caption, .eb-doppelrand-caption * { font-family: ${t.fontSans} !important; line-height: 1.25 !important; text-transform: none !important; letter-spacing: normal !important; font-style: normal !important; }
  .eb-doppelrand-caption { position: absolute; left: 8px; right: 8px; bottom: 8px; padding: 5px 10px; border-radius: 9px; background: ${t.dockBg}; backdrop-filter: blur(12px); border: 1px solid ${t.border}; display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 10.5px !important; color: ${t.textSecondary} !important; max-height: 36px; overflow: hidden; white-space: nowrap; }
  #eb-hero-sparkline-pill { position: absolute; top: 8px; right: 8px; z-index: 6; padding: 3px 9px; border-radius: 999px; background: rgba(255, 255, 255, 0.94); backdrop-filter: blur(12px); border: 1px solid ${t.accentBorder}; box-shadow: 0 6px 18px rgba(15, 23, 42, 0.12); display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-family: ${t.fontSans} !important; text-transform: none !important; letter-spacing: normal !important; white-space: nowrap; }
  #eb-dossier-format-pill { position: absolute; top: 6px; left: 6px; z-index: 6; padding: 2px 7px; border-radius: 999px; background: rgba(15, 23, 42, 0.82); backdrop-filter: blur(8px); color: #FFFFFF !important; font-family: "JetBrains Mono", monospace !important; font-size: 9.5px !important; font-weight: 700 !important; letter-spacing: 0.01em !important; text-transform: none !important; white-space: nowrap !important; max-width: calc(100% - 12px); overflow: hidden; text-overflow: ellipsis; transition: transform 180ms cubic-bezier(0.22, 1, 0.36, 1); }
  tr[data-eb-live-row] { cursor: pointer; transition: background-color 150ms ease; }
  tr[data-eb-live-row]:hover { background-color: ${t.brandSoftBg} !important; }
  #eb-pseo-hero-split { display: grid; grid-template-columns: 1.35fr 1fr; gap: 20px; align-items: stretch; margin: 12px 0 18px 0; } #eb-pseo-hero-split #eb-doppelrand-hero-card, #eb-curtain-visual-split #eb-curtain-dossier-card { display: flex; flex-direction: column; height: 100%; } #eb-pseo-hero-split .eb-doppelrand-inner, #eb-curtain-visual-split .eb-doppelrand-inner { flex: 1; height: 100%; } #eb-pseo-hero-split .eb-doppelrand-img { height: 100% !important; min-height: 190px; max-height: 310px; object-fit: cover; } #eb-curtain-visual-split .eb-doppelrand-img { height: 100% !important; min-height: 132px; max-height: 185px; object-fit: cover; } .eb-pseo-lead-card { flex: 1; width: 100% !important; max-width: none !important; display: flex; flex-direction: column; justify-content: center; padding: 14px 18px; border-radius: 12px; background: ${t.cardBg}; border: 1px solid ${t.border}; border-left: 3.5px solid ${t.brandPrimary}; box-shadow: ${t.shadow}; margin: 0 !important; }
  @media (min-width: 960px) { .hero-grid, .hero-split, .hero-editorial-grid { align-items: stretch !important; } .hero-grid > *, .hero-split > * { display: flex !important; flex-direction: column !important; justify-content: space-between !important; height: 100% !important; } .hero-grid > .bezel-shell > *, .hero-grid > .double-bezel > * { flex: 1 !important; height: 100% !important; display: flex !important; flex-direction: column !important; justify-content: space-between !important; } }
  #eb-curtain-visual-split { display: grid; grid-template-columns: 230px minmax(0, 1fr); gap: 12px; align-items: stretch; margin-bottom: 10px; }
  #eb-floating-gate-popover { display: none; position: fixed; z-index: 9998; width: 350px; max-width: calc(100vw - 24px); background: ${t.cardBg}; color: ${t.textPrimary}; border: 1.5px solid ${t.accentBorder}; border-radius: 16px; padding: 16px; box-shadow: 0 22px 48px -12px rgba(15, 23, 42, 0.2); font-family: ${t.fontSans}; text-transform: none !important; }
  #eb-bottom-conversion-suite { max-width: 1280px; margin: 40px auto 88px auto; padding: 0 24px; font-family: ${t.fontSans}; text-transform: none !important; }
  .eb-panel-card { background: ${t.cardBg}; color: ${t.textPrimary}; border: 1px solid ${t.border}; border-radius: ${t.radiusCard}; padding: 22px 24px; margin-bottom: 20px; box-shadow: ${t.shadow}; }
  .eb-gbb-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 16px; align-items: stretch; }
  .eb-tier-card { background: ${t.canvasBg}; border: 1px solid ${t.border}; border-radius: 14px; padding: 18px; display: flex; flex-direction: column; justify-content: space-between; color: ${t.textPrimary}; }
  .eb-tier-card.featured { border: 2px solid ${t.brandPrimary}; background: ${t.brandSoftBg}; position: relative; }
  #eb-executive-strip { margin-bottom: 20px; }
  .eb-strip-top-bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid ${t.border}; }
  .eb-strip-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: ${t.brandPrimary}; background: ${t.brandSoftBg}; border: 1px solid ${t.accentBorder}; padding: 4px 11px; border-radius: 999px; }
  #preset-chips { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 8px; width: 100%; margin-bottom: 10px; }
  #preset-chips .preset-chip { padding: 7px 6px; font-size: 12px; font-weight: 600; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; border-radius: ${t.radiusPill}; background: ${t.canvasBg}; color: ${t.textSecondary}; border: 1px solid ${t.border}; }
  #preset-chips .preset-chip:hover { background: ${t.brandSoftBg}; color: ${t.brandPrimary}; border-color: ${t.accentBorder}; }
  #eb-interactive-control-row { display: grid; grid-template-columns: 1.2fr 1fr; gap: 10px; align-items: center; margin-bottom: 10px; background: ${t.subtleBg}; padding: 8px 12px; border-radius: 10px; border: 1px solid ${t.border}; }
  #eb-fuse-search-input { width: 100%; padding: 7px 11px; border-radius: 8px; border: 1px solid ${t.border}; background: #FFFFFF; color: ${t.textPrimary}; font-size: 12.5px; }
  .eb-slider-wrap { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: ${t.textSecondary}; font-weight: 700; white-space: nowrap; }
  #eb-nouislider-range { width: 100%; height: 5px; accent-color: ${t.brandPrimary}; cursor: pointer; }
  #free-metrics-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; margin-bottom: 12px; }
  .eb-kpi-card { background: ${t.canvasBg}; border: 1px solid ${t.border}; border-radius: 10px; padding: 10px 12px; }
  .eb-kpi-label { font-size: 10.5px; color: ${t.textMuted}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; }
  .eb-kpi-val { font-family: ${t.fontDisplay}; font-size: 20px; font-weight: 700; color: ${t.textPrimary}; line-height: 1.2; margin: 2px 0; }
  .eb-kpi-sub { font-size: 10.5px; color: ${t.safeColor}; font-weight: 600; }
  .stat-pill-locked { grid-column: 1 / -1; background: ${t.brandSoftBg}; border: 1px solid ${t.accentBorder}; border-radius: 10px; padding: 12px 16px; display: flex; flex-direction: column; gap: 8px; }
  .eb-locked-top { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
  .eb-store-pills { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .store-preview-pill { padding: 4px 10px; border-radius: 999px; font-size: 11px; font-weight: 600; background: #FFFFFF; color: ${t.textSecondary}; border: 1px solid ${t.border}; }
  .store-preview-pill.active { background: ${t.brandPrimary}; color: #FFFFFF; border-color: ${t.brandPrimary}; }
  #inline-aisle-peek-drawer { display: block; font-size: 12px; padding: 8px 12px; border-radius: 8px; background: #FFFFFF; color: ${t.textPrimary}; border: 1px solid ${t.border}; border-left: 3px solid ${t.brandPrimary}; }
  #lead-squeeze-card { background: ${t.subtleBg}; border: 1px solid ${t.border}; border-radius: 10px; padding: 10px 12px; }
  #prog-instant-action-strip { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  .eb-action-btn { padding: 5px 11px; border-radius: 999px; font-size: 11.5px; font-weight: 600; background: #FFFFFF; color: ${t.textSecondary}; border: 1px solid ${t.border}; text-decoration: none; display: inline-flex; align-items: center; gap: 4px; white-space: nowrap; }
  .eb-action-btn:hover { border-color: ${t.brandPrimary}; color: ${t.brandPrimary}; background: ${t.brandSoftBg}; }
  #tripwire-upsell-box { display: none; margin-top: 8px; padding: 8px 12px; border-radius: 8px; background: ${t.safeSoftBg}; color: ${t.textPrimary}; border: 1px solid ${t.safeBorder}; font-size: 12px; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
  #sticky-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9990; display: flex !important; align-items: center; justify-content: space-between; gap: 10px; padding: 9px 20px; background: ${t.dockBg}; backdrop-filter: blur(14px); border-top: 1px solid ${t.border}; color: ${t.textPrimary}; box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.05); font-family: ${t.fontSans}; }
  #eb-ouibounce-toast { display: none; position: fixed; bottom: 62px; right: 16px; max-width: 350px; z-index: 9991; background: ${t.cardBg}; color: ${t.textPrimary}; border: 1.5px solid ${t.accentBorder}; border-radius: 14px; padding: 15px; box-shadow: 0 18px 38px rgba(15, 23, 42, 0.14); font-family: ${t.fontSans}; }
  #eb-cmdk-modal { display: none; position: fixed; inset: 0; z-index: 9995; background: rgba(15, 23, 42, 0.35); backdrop-filter: blur(4px); align-items: flex-start; justify-content: center; padding-top: 70px; font-family: ${t.fontSans}; }
  #eb-mobile-firstfold-bar { display: none !important; }
  @media (max-width: 768px) {
    #eb-mobile-firstfold-bar { display: flex !important; margin: 8px 0 10px 0 !important; }
    .top-ticker { display: none !important; } .nav-links { flex-wrap: nowrap !important; overflow-x: auto !important; white-space: nowrap !important; }
    .hero-section, main > section:first-child { padding-top: 14px !important; }
    main h1 { font-size: 1.6rem !important; line-height: 1.14 !important; margin-bottom: 6px !important; }
    .hero-sub, .subhead, .editorial-subhead, .hero-lead { font-size: 0.85rem !important; line-height: 1.34 !important; margin-bottom: 6px !important; }
    .site-header .btn, header .btn { padding: 6px 10px !important; font-size: 11px !important; }
    .preset-row { display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 6px !important; }
    #eb-bottom-conversion-suite { padding: 0 14px; margin: 28px auto 82px auto; } .eb-panel-card { padding: 16px; }
    .eb-gbb-grid, #eb-pseo-hero-split, #eb-curtain-visual-split, #eb-interactive-control-row { grid-template-columns: 1fr; }
    .eb-doppelrand-img { height: 124px; } #free-metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    #preset-chips { gap: 4px; } #preset-chips .preset-chip { font-size: 11px; padding: 5px 3px; }
    #sticky-mobile-bar { padding: 7px 12px; gap: 6px; } #eb-sticky-email-form, #btn-sticky-micro-unlock { display: none !important; }
  }
  @media print {
    header, nav, footer, #sticky-mobile-bar, #eb-ouibounce-toast, #eb-cmdk-modal, #eb-floating-gate-popover, #prog-share-toolbar, #in-card-unlock-bar, #eb-sovrn-affiliate-strip, button, .preset-chip { display: none !important; }
    body, .eb-panel-card { background: #FFFFFF !important; color: #000000 !important; border: 1px solid #000000 !important; box-shadow: none !important; }
  }
</style>`;
}

function buildActionButtonsHtml(cfg) {
  const actions = cfg.exportActions || [
    { id: 'btn-copy-shopping-list', label: 'Copy Summary', type: 'copy' },
    { id: 'btn-export-csv', label: 'Export .CSV', href: '/api/github-upgrade/export.csv' },
    { id: 'btn-export-ics', label: '.ICS Schedule', href: '/api/github-upgrade/skin-cycling.ics' },
    { id: 'btn-export-llms', label: 'Protocol .TXT', href: '/api/github-upgrade/llms-bundle.txt' },
    { id: 'btn-print-summary', label: 'Print PDF', type: 'print' },
    { id: 'btn-showroom-hud', label: cfg.hudLabel, type: 'hud' },
    { id: 'btn-cmdk-trigger', label: '⌘K Actions', type: 'cmdk' },
    { id: 'btn-reddit-share', label: 'Reddit MD', type: 'reddit' }
  ];
  return actions.map((a) => {
    if (a.href) return `<a id="${esc(a.id)}" class="eb-action-btn" href="${esc(a.href)}" download onclick="window.__ebShowTripwire()">${esc(a.label)}</a>`;
    const fn = a.type === 'copy' ? 'window.__ebCopySummary()' : a.type === 'print' ? 'window.__ebPrintSheet()' : a.type === 'hud' ? 'window.__ebToggleHud()' : a.type === 'cmdk' ? 'window.__ebToggleCmdk()' : 'window.__ebCopyReddit()';
    return `<button type="button" id="${esc(a.id)}" class="eb-action-btn" onclick="${fn}">${esc(a.label)}</button>`;
  }).join('');
}

function buildScenarioAndExportWorkbenchHtml(cfg) {
  const t = getTheme(cfg);
  const presetsHtml = cfg.presets.map((p, idx) => `<button type="button" class="preset-chip" data-preset="${esc(p.key)}" onclick="window.__ebApplyPreset('${esc(p.key)}', ${idx})">${esc(p.label)}</button>`).join('');
  const kpisHtml = cfg.kpis.map((k) => `<div class="eb-kpi-card"><div class="eb-kpi-label">${esc(k.label)}</div><div class="eb-kpi-val metric-box-value">${esc(k.val)}</div><div class="eb-kpi-sub">${esc(k.sub)}</div></div>`).join('');
  const pillsHtml = cfg.coMarketingPills.map((p, i) => `<button type="button" class="store-preview-pill${i === 0 ? ' active' : ''}" data-store="${esc(p.key)}" onclick="window.__ebSelectStorePill('${esc(p.key)}')">${esc(p.label)}</button>`).join('');
  const actionsHtml = buildActionButtonsHtml(cfg);
  return `<div id="eb-executive-strip" class="eb-panel-card" aria-label="${esc(cfg.brandName)} Scenario Simulator & Export Utilities">
  <div id="results-section" style="display:block;">
    <div class="eb-strip-top-bar"><span class="eb-strip-eyebrow">✦ ${esc(cfg.brandName)} Interactive Benchmark &amp; Export Utilities</span><span id="headline-unlock-explainer" style="font-size:12px;color:${t.textMuted};">${esc(cfg.explainerText)}</span></div>
    <div id="preset-chips">${presetsHtml}</div>
    <div id="eb-interactive-control-row"><input type="text" id="eb-fuse-search-input" placeholder="${esc(cfg.searchPlaceholder || 'Filter scenario...')}" aria-label="Filter Scenario" oninput="window.__ebRunFuseSearch(this.value)" /><label class="eb-slider-wrap" for="eb-nouislider-range"><span id="eb-slider-readout">${esc(cfg.sliderLabel || 'Scale')}: ${esc(cfg.sliderVal || 50)}</span><input type="range" id="eb-nouislider-range" min="${esc(cfg.sliderMin || 1)}" max="${esc(cfg.sliderMax || 100)}" value="${esc(cfg.sliderVal || 50)}" oninput="window.__ebOnSliderInput(this.value)" /></label></div>
    <div id="free-metrics-grid" class="grid-metrics">${kpisHtml}<div class="stat-pill-locked" id="summary-report-card"><div class="eb-locked-top"><span style="font-size:12px;font-weight:700;color:${t.brandText};">✦ ${esc(cfg.lockedTitle)} — Channel &amp; Protocol Insights</span><button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Toggle Insight ▾</button></div><div class="eb-store-pills">${pillsHtml}</div><div id="inline-aisle-peek-drawer"><div id="eb-peek-row-text" style="font-weight:500;">${esc(cfg.coMarketingPills[0].rowText)}</div></div></div></div>
    <div id="lead-squeeze-card"><div id="prog-instant-action-strip">${actionsHtml}<button type="button" id="btn-calc" class="eb-action-btn" style="background:${t.brandSoftBg};color:${t.brandText};border-color:${t.accentBorder};font-weight:700;" onclick="window.__ebTriggerHostCalc()">Recalculate ↗</button></div><div id="tripwire-upsell-box"><span>Need the full unblurred production deliverable &amp; multi-row exports? Unlock the <strong>Single-Audit Export Pass ($1.99)</strong> — one-time payment, no subscription.</span><button type="button" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;border-color:${t.brandPrimary};font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock $1.99 Pass →</button></div><div id="eb-field-hud-drawer" style="display:none;margin-top:8px;padding:8px 12px;border-radius:8px;background:${t.cardBg};border:1px solid ${t.border};color:${t.safeColor};font-family:monospace;font-size:11.5px;">[${esc(cfg.hudLabel.toUpperCase())} ACTIVE] • Deterministic Engine Ready • Host: ${esc(cfg.domain)}</div></div>
  </div>
</div>`;
}

function buildBottomConversionSuiteHtml(cfg, reqPath) {
  const t = getTheme(cfg);
  const shareUrl = `https://${cfg.domain}${reqPath || '/'}`;
  const redditHref = `https://www.reddit.com/r/${cfg.redditSub}/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(cfg.brandName + ' Benchmark & Protocol')}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Ran a live audit on ' + cfg.brandName)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(cfg.brandName + ' Summary')}&body=${encodeURIComponent('Review this scenario: ' + shareUrl)}`;

  const pillsHtml = cfg.coMarketingPills
    .map((p, i) => `<button type="button" class="store-preview-pill${i === 0 ? ' active' : ''}" data-store="${esc(p.key)}" onclick="window.__ebSelectStorePill('${esc(p.key)}')">${esc(p.label)}</button>`)
    .join('');

  const actionsHtml = buildActionButtonsHtml(cfg);

  const affiliatesHtml = cfg.affiliates.map((a) => `<a href="${esc(a.url)}" target="_blank" rel="noopener sponsored" class="eb-tier-card" style="text-decoration:none;color:${t.textPrimary};" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(a.title)}' })"><div><span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:${t.safeColor};">${esc(a.badge)}</span><div style="font-size:15px;font-weight:700;margin-top:4px;color:${t.textPrimary};">${esc(a.title)}</div></div><div style="margin-top:10px;font-size:12.5px;color:${t.brandPrimary};font-weight:700;">${esc(a.cpa)} →</div></a>`).join('');

  const bc = cfg.battlecard || {
    heading: `Why ${cfg.brandName} Outperforms Traditional Alternatives`, colLegacy: 'Legacy Suites', colManual: 'Manual Guesswork',
    rows: [
      ['Diagnostic Precision', '< 15ms Deterministic Engine', 'Slow Legacy Audits', 'Manual Trial & Error'],
      ['Actionable Deliverable', cfg.deliverableName, 'Generic Reports', 'Static Notes'],
      ['Transparent Pricing', `$1.99 Single Pass or $${cfg.corePriceUsd} Complete`, '$199+/mo Subscriptions', 'High Error Cost']
    ]
  };

  const battlecardRowsHtml = bc.rows.map((r, idx) => `<tr style="${idx < bc.rows.length - 1 ? `border-bottom:1px solid ${t.border};` : ''}"><td style="padding:10px 12px;font-weight:600;">${esc(r[0])}</td><td style="padding:10px 12px;color:${t.safeColor};font-weight:700;">✓ ${esc(r[1])}</td><td style="padding:10px 12px;color:${t.textSecondary};">${esc(r[2])}</td><td style="padding:10px 12px;color:${t.textSecondary};">${esc(r[3])}</td></tr>`).join('');
  const savingsPct = Math.max(50, Math.round((1 - 1.99 / cfg.corePriceUsd) * 100));

  return `<section id="eb-bottom-conversion-suite" aria-label="${esc(cfg.brandName)} Export Passes, Comparisons & Partner Ecosystem">
  <div id="in-card-unlock-bar" class="eb-panel-card">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
      <div><span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${t.brandPrimary};">Instant Self-Serve Fulfillment • 30-Day Guarantee</span><h2 id="in-card-unlock-title" style="margin:4px 0 0 0;font-size:22px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};">${esc(cfg.unlockBannerTitle)}</h2></div>
      <div id="tab-btn-dossier" style="font-size:12px;font-weight:700;color:${t.safeColor};background:${t.safeSoftBg};border:1px solid ${t.safeBorder};padding:5px 12px;border-radius:999px;">Most Popular: $1.99 Single-Audit Pass (One-Time)</div>
    </div>
    <div class="eb-gbb-grid">
      <div class="eb-tier-card featured">
        <div><div class="eb-doppelrand-shell" style="margin:0 0 10px 0;"><div class="eb-doppelrand-inner"><img src="/public/editorial-dossier.jpg" alt="${esc(cfg.brandName)} Deliverable Dossier" class="eb-doppelrand-img" style="height:84px;object-position:center 35%;" loading="lazy" /></div></div><div style="font-size:11px;font-weight:700;letter-spacing:0.04em;color:${t.brandPrimary};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(cfg.tier1Tag || `SINGLE-AUDIT PASS • SAVE ${savingsPct}% VS $${cfg.corePriceUsd}`)}</div><div class="matrix-price" style="font-family:${t.fontDisplay};font-size:30px;font-weight:700;margin:6px 0;color:${t.textPrimary};">$1.99 <span style="font-family:${t.fontSans};font-size:12.5px;font-weight:500;color:${t.textMuted};">one-time • no subscription</span></div><p style="font-size:13px;color:${t.textSecondary};margin:0 0 14px 0;line-height:1.5;">${esc(cfg.tier1Desc || `Instantly unblurs ${cfg.deliverableName}, downloadable exports, and 24-hour recalculations.`)}</p></div>
        <button type="button" id="btn-prog-flash-pass" class="cta-btn" style="width:100%;padding:11px 14px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;font-weight:700;font-size:13.5px;border:none;" onclick="window.__ebCheckout('flash_pass')">Unlock Single-Audit Pass ($1.99) →</button>
      </div>
      <div class="eb-tier-card">
        <div><div class="eb-doppelrand-shell" style="margin:0 0 10px 0;"><div class="eb-doppelrand-inner"><img src="/public/editorial-hero.jpg" alt="${esc(cfg.brandName)} Complete Pack" class="eb-doppelrand-img" style="height:84px;object-position:center 50%;" loading="lazy" /></div></div><div style="font-size:11px;font-weight:700;letter-spacing:0.04em;color:${t.textSecondary};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(cfg.tier2Tag || 'COMPLETE PACK')}</div><div class="matrix-price" style="font-family:${t.fontDisplay};font-size:30px;font-weight:700;margin:6px 0;color:${t.textPrimary};">$${esc(cfg.corePriceUsd)} <span style="font-family:${t.fontSans};font-size:12.5px;font-weight:500;color:${t.textMuted};">complete pack</span></div><p style="font-size:13px;color:${t.textSecondary};margin:0 0 14px 0;line-height:1.5;">${esc(cfg.tier2Desc || cfg.coreLabel)}</p></div>
        <button type="button" id="btn-prog-full-dossier" class="cta-btn" style="width:100%;padding:11px 14px;border-radius:${t.radiusPill};background:#FFFFFF;color:${t.textPrimary};font-weight:700;font-size:13.5px;border:1px solid ${t.border};" onclick="window.__ebCheckout('complete_dossier')">${esc(cfg.coreLabel)}</button>
      </div>
      <div class="eb-tier-card">
        <div><div class="eb-doppelrand-shell" style="margin:0 0 10px 0;"><div class="eb-doppelrand-inner"><img src="/public/editorial-dossier.jpg" alt="${esc(cfg.brandName)} Pro Tier" class="eb-doppelrand-img" style="height:84px;object-position:center 68%;" loading="lazy" /></div></div><div style="font-size:11px;font-weight:700;letter-spacing:0.04em;color:${t.safeColor};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${esc(cfg.tier3Tag || 'PRO / UNLIMITED TIER')}</div><div class="matrix-price" style="font-family:${t.fontDisplay};font-size:30px;font-weight:700;margin:6px 0;color:${t.textPrimary};">$${esc(cfg.proPriceUsd)} <span style="font-family:${t.fontSans};font-size:12.5px;font-weight:500;color:${t.textMuted};">unlimited pro</span></div><p style="font-size:13px;color:${t.textSecondary};margin:0 0 14px 0;line-height:1.5;">${esc(cfg.tier3Desc || cfg.proLabel)}</p></div>
        <button type="button" id="btn-prog-pro-b2b" class="cta-btn" style="width:100%;padding:11px 14px;border-radius:${t.radiusPill};background:${t.textPrimary};color:#FFFFFF;font-weight:700;font-size:13.5px;border:none;" onclick="window.__ebCheckout('pro_b2b')">${esc(cfg.proLabel)}</button>
      </div>
    </div>
    <button type="button" id="btn-checkout" style="display:none;" onclick="window.__ebCheckout('flash_pass')">Hidden Test Alias</button>
  </div>
  <div id="competitor-battlecard" class="eb-panel-card">
    <h3 style="margin:0 0 12px 0;font-size:19px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};">${esc(bc.heading)}</h3>
    <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:13px;text-align:left;color:${t.textPrimary};"><thead><tr style="border-bottom:1px solid ${t.border};color:${t.textMuted};background:${t.subtleBg};"><th style="padding:10px 12px;">Capability</th><th style="padding:10px 12px;color:${t.brandPrimary};">${esc(cfg.brandName)}</th><th style="padding:10px 12px;">${esc(bc.colLegacy)}</th><th style="padding:10px 12px;">${esc(bc.colManual)}</th></tr></thead><tbody>${battlecardRowsHtml}</tbody></table></div>
  </div>
  <div id="eb-export-utility-bar" class="eb-panel-card">
    <div class="stat-pill-locked" id="summary-report-card" style="margin-bottom:12px;">
      <div class="eb-locked-top"><span style="font-size:12px;font-weight:700;color:${t.brandText};">✦ ${esc(cfg.lockedTitle)} — Channel &amp; Protocol Benchmarks</span><button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Toggle Insight ▾</button></div>
      <div class="eb-store-pills">${pillsHtml}</div>
      <div id="inline-aisle-peek-drawer"><div id="eb-peek-row-text" style="font-weight:500;">${esc(cfg.coMarketingPills[0].rowText)}</div></div>
    </div>
    <div id="lead-squeeze-card">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div id="prog-instant-action-strip">${actionsHtml}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;" id="prog-share-toolbar"><button type="button" id="btn-copy-scenario-link" class="eb-action-btn" onclick="window.__ebCopyScenarioLink(this)">Copy Link</button><a id="btn-share-reddit" class="eb-action-btn" href="${esc(redditHref)}" target="_blank" rel="noopener">Share on r/${esc(cfg.redditSub)}</a><a id="btn-share-x" class="eb-action-btn" href="${esc(xHref)}" target="_blank" rel="noopener">Post on X</a><a id="btn-share-email" class="eb-action-btn" href="${esc(mailHref)}">Email</a><a class="eb-action-btn" href="/embed" target="_blank" rel="noopener">Embed</a></div>
      </div>
      <div id="tripwire-upsell-box"><span>Need the full unblurred production deliverable &amp; multi-row exports? Unlock the <strong>Single-Audit Export Pass ($1.99)</strong> — one-time payment, no subscription.</span><button type="button" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;border-color:${t.brandPrimary};font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock $1.99 Pass →</button></div>
      <div id="eb-field-hud-drawer" style="display:none;margin-top:8px;padding:8px 12px;border-radius:8px;background:${t.cardBg};border:1px solid ${t.border};color:${t.safeColor};font-family:monospace;font-size:11.5px;">[${esc(cfg.hudLabel.toUpperCase())} ACTIVE] • Deterministic Engine Ready • Host: ${esc(cfg.domain)}</div>
    </div>
  </div>
  <div id="eb-sovrn-affiliate-strip" class="eb-panel-card"><div style="font-size:11px;font-weight:700;color:${t.textMuted};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Curated Companion Products &amp; Verified Ecosystem</div><div class="eb-gbb-grid">${affiliatesHtml}</div></div>
  ${buildMobileSeoCrawlMeshHtml(cfg, reqPath)}
</section>

<!-- Floating Value-Gate Popover (Paid Choice Architecture — Zero $0 Cannibalization) -->
<div id="eb-floating-gate-popover" role="dialog" aria-label="Instant Deliverable Export Pass">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span style="font-size:11px;font-weight:700;color:${t.brandPrimary};text-transform:uppercase;letter-spacing:0.04em;">✦ Instant Deliverable Export</span>
    <button type="button" onclick="document.getElementById('eb-floating-gate-popover').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:15px;">✕</button>
  </div>
  <div id="eb-popover-title" style="font-family:${t.fontDisplay};font-size:16.5px;font-weight:700;color:${t.textPrimary};margin-bottom:4px;">Unblur &amp; Download ${esc(cfg.freeDeliverableName)}</div>
  <p id="eb-popover-desc" style="font-size:11.5px;color:${t.textSecondary};margin:0 0 10px 0;line-height:1.4;">🔒 <strong>Instant Browser Unblur + Download</strong> • No account required • <strong>99¢ Single-File</strong> or <strong>$1.99 Full Bundle</strong> (save ${savingsPct}% vs. $${esc(cfg.corePriceUsd)}):</p>
  <div style="display:grid;gap:6px;">
    <button type="button" id="btn-popover-micro-pass" onclick="window.__ebCheckout('micro_pass')" style="width:100%;padding:8px 12px;border-radius:${t.radiusPill};background:#FFFFFF;color:${t.brandPrimary};border:1px solid ${t.accentBorder};font-weight:700;font-size:12px;">⚡ Unblur + Download Single File — 99¢ →</button>
    <button type="button" id="btn-popover-flash-pass" onclick="window.__ebCheckout('flash_pass')" style="width:100%;padding:10px 14px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;border:none;font-weight:700;font-size:13px;">Unlock All Rows + 3-File Bundle — $1.99 →</button>
    <button type="button" onclick="window.__ebCheckout('complete_dossier')" style="width:100%;padding:7px 12px;border-radius:${t.radiusPill};background:${t.subtleBg};color:${t.textPrimary};border:1px solid ${t.border};font-weight:600;font-size:11.5px;">Or Get ${esc(cfg.coreLabel)}</button>
  </div>
  <form id="eb-popover-scorecard-form" onsubmit="return window.__ebSaveInlineScorecard(event, 'eb-popover-scorecard-email', 'eb-popover-scorecard-form')" style="margin-top:8px;padding-top:8px;border-top:1px dashed ${t.border};">
    <div style="font-size:10.5px;font-weight:600;color:${t.textSecondary};margin-bottom:4px;">🔓 Want to inspect 1 more row first? Reveal Row #4 on-screen + email 1-Page Checklist:</div>
    <div style="display:grid;grid-template-columns:1fr auto;gap:5px;">
      <input type="email" id="eb-popover-scorecard-email" placeholder="Enter email to reveal Row #4..." required style="padding:5px 8px;border-radius:7px;border:1px solid ${t.border};background:#FFFFFF;color:${t.textPrimary};font-size:11px;" />
      <button type="submit" style="padding:5px 9px;border-radius:${t.radiusPill};background:${t.brandSoftBg};color:${t.brandPrimary};border:1px solid ${t.accentBorder};font-weight:700;font-size:11px;">Reveal Row #4 →</button>
    </div>
  </form>
</div>

<!-- Exit-Intent & Post-Calculation Spotlight Toast (#eb-ouibounce-toast) -->
<div id="eb-ouibounce-toast" role="dialog" aria-label="Send 1-Page Diagnostic Summary Before Leaving">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span id="eb-ouibounce-title" style="font-size:11px;font-weight:700;color:${t.brandPrimary};text-transform:uppercase;">✦ Diagnostic Summary &amp; Instant Export</span>
    <button type="button" onclick="document.getElementById('eb-ouibounce-toast').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:14px;">✕</button>
  </div>
  <p id="eb-ouibounce-desc" style="font-size:12px;color:${t.textSecondary};margin:0 0 8px 0;line-height:1.4;">Reveal Row #4 on-screen + email your 1-Page Fix Checklist, or download the production file now (<strong>99¢ Single-File</strong> / <strong>$1.99 Bundle</strong>):</p>
  <form onsubmit="return window.__ebSendExitSummary(event)" style="display:grid;grid-template-columns:1fr auto;gap:6px;margin-bottom:8px;">
    <input type="email" id="eb-ouibounce-email" placeholder="Work email (Reveal Row #4)..." required style="padding:6px 9px;border-radius:7px;border:1px solid ${t.border};background:#FFFFFF;color:${t.textPrimary};font-size:11.5px;" />
    <button type="submit" id="btn-ouibounce-submit" style="padding:6px 11px;border-radius:${t.radiusPill};background:${t.brandSoftBg};color:${t.brandPrimary};font-size:11.5px;font-weight:700;border:1px solid ${t.accentBorder};">Reveal Row #4 →</button>
  </form>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;">
    <button type="button" id="btn-toast-micro-pass" onclick="window.__ebCheckout('micro_pass')" style="padding:7px 8px;border-radius:${t.radiusPill};background:#FFFFFF;color:${t.brandPrimary};border:1px solid ${t.accentBorder};font-weight:700;font-size:11px;">Single File (99¢) →</button>
    <button type="button" onclick="window.__ebCheckout('flash_pass')" style="padding:7px 8px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;border:none;font-weight:700;font-size:11px;">3-File Bundle ($1.99) →</button>
  </div>
</div>

<!-- Cmd+K Executive Command Palette -->
<div id="eb-cmdk-modal" onclick="if(event.target===this)this.style.display='none'">
  <div style="background:${t.cardBg};border:1px solid ${t.border};border-radius:${t.radiusCard};width:92%;max-width:480px;padding:18px;color:${t.textPrimary};box-shadow:0 24px 48px rgba(15,23,42,0.16);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid ${t.border};">
      <span style="font-size:12.5px;font-weight:700;color:${t.brandPrimary};">⌘K ${esc(cfg.brandName)} Quick Actions</span>
      <button type="button" onclick="document.getElementById('eb-cmdk-modal').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:11.5px;">ESC</button>
    </div>
    <div style="display:grid;gap:6px;">
      <button type="button" class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;" onclick="window.__ebCheckout('flash_pass')"><span>Unlock Single-Audit Export Pass</span><strong style="color:${t.brandPrimary};">$1.99 →</strong></button>
      <a href="/api/github-upgrade/export.csv" download class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;"><span>Download Benchmark .CSV Table</span><strong>.CSV ↗</strong></a>
      <a href="/api/github-upgrade/skin-cycling.ics" download class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;"><span>Download Protocol Schedule (.ICS)</span><strong>.ICS ↗</strong></a>
      <a href="/dossier/sample" class="eb-action-btn" style="justify-content:space-between;padding:9px 12px;border-radius:8px;"><span>View Sample Executive Dossier</span><strong>Open →</strong></a>
    </div>
  </div>
</div>

<!-- Frosted Light Editorial Conversion Dock (#sticky-mobile-bar) -->
<div id="sticky-mobile-bar" role="region" aria-label="Instant Access Conversion Dock">
  <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
    <span style="display:inline-flex;align-items:center;gap:5px;font-size:12.5px;font-weight:700;color:${t.textPrimary};"><span style="width:7px;height:7px;border-radius:50%;background:${t.safeColor};display:inline-block;"></span>${esc(cfg.brandName)}</span>
    <a href="#in-card-unlock-bar" id="sticky-sub-benefit" style="font-size:12px;color:${t.textSecondary};font-weight:600;text-decoration:none;">${esc(cfg.freeDeliverableName)} • <strong style="color:${t.brandPrimary};">Save ${savingsPct}% vs. $${esc(cfg.corePriceUsd)}</strong></a>
  </div>
  <form id="eb-sticky-email-form" onsubmit="return window.__ebSaveInlineScorecard(event, 'eb-sticky-email-input', 'eb-sticky-email-form')" style="display:inline-flex;align-items:center;gap:6px;margin:0;background:${t.subtleBg};padding:3px 5px 3px 10px;border-radius:999px;border:1px solid ${t.border};"><span style="font-size:11px;font-weight:700;color:${t.textSecondary};white-space:nowrap;">Reveal Row #4 + PDF:</span><input type="email" id="eb-sticky-email-input" placeholder="you@company.com" required style="border:none;background:transparent;font-size:11.5px;color:${t.textPrimary};width:145px;outline:none;" /><button type="submit" id="btn-sticky-email-submit" style="padding:4px 10px;border-radius:999px;background:#FFFFFF;color:${t.brandPrimary};border:1px solid ${t.accentBorder};font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;">Send Free ↵</button></form>
  <div style="display:flex;align-items:center;gap:6px;">
    <button type="button" id="btn-sticky-micro-unlock" class="eb-action-btn" style="background:#FFFFFF;color:${t.brandPrimary};font-weight:700;border:1px solid ${t.accentBorder};padding:6px 12px;border-radius:${t.radiusPill};" onclick="window.__ebCheckout('micro_pass')">⚡ 99¢ File</button>
    <button type="button" id="btn-sticky-flash-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;border:none;padding:7px 14px;border-radius:${t.radiusPill};" onclick="window.__ebCheckout('flash_pass')">Single-Audit Pass: $1.99 →</button>
    <button type="button" id="btn-dock-flash-pass" style="display:none;" onclick="window.__ebCheckout('flash_pass')">Single-Audit Pass: $1.99</button>
  </div>
</div>`;
}

function buildClientRuntimeScript(cfg) {
  const t = getTheme(cfg);
  const pillMap = {};
  for (const p of cfg.coMarketingPills) pillMap[p.key] = p.rowText;
  const firstPartner = cfg.affiliates && cfg.affiliates[0] ? cfg.affiliates[0] : { title: 'Verified Partner', url: '#', cpa: 'Explore' };
  const remDiff = cfg.remediationDiff || { beforeLine: '- [BEFORE] Legacy baseline', afterLine: '+ [AFTER] Optimized baseline', roiBadge: 'Verified Lift' };

  return `<script id="exact-baseline-client-runtime">
(function() {
  var CFG = ${JSON.stringify({
    moduleId: cfg.moduleId, brandName: cfg.brandName, domain: cfg.domain, corePriceUsd: cfg.corePriceUsd,
    coreLabel: cfg.coreLabel, freeDeliverableName: cfg.freeDeliverableName || 'Production Deliverable',
    deliverableName: cfg.deliverableName || 'Complete Pro Deliverable',
    deliverableFiles: cfg.deliverableFiles || [], presets: (cfg.presets || []).slice(0, 3),
    searchPlaceholder: cfg.searchPlaceholder || 'Enter domain or brand...',
    sliderLabel: cfg.sliderLabel || 'Scale', theme: t, firstPartner, remDiff, pillMap, presetKpis: cfg.presetKpis || {}
  })};

  var STORAGE_KEY = 'eb_paid_unlocked_v6_' + CFG.moduleId;
  window.__ebIsUnlocked = false;
  window.__ebActiveEntity = '';
  window.__ebUserInteracted = false;
  var PERSONA = ({
    derm_logic: { leadBtn: '📩 Email AM/PM Routine', leadPh: 'Email for AM/PM Routine...', microBtn: '⚡ 9:16 Wallet Card (99¢)', ctaTitle: '✦ Routine Verdict Ready:', heroTitle: 'Clinical Formulation Lab • pH 3.2 – 6.0', heroSub: 'Active Chelation, Hydrolysis & Barrier-Safety Telemetry', heroBadge: '✓ CosIng + pKa Verified', dossierTag: 'AM/PM Split & Wallet Card' },
    sponsor_radar: { leadBtn: '📩 Send Pitch + Row #4', leadPh: 'Work email for Pitch + Row #4...', microBtn: '⚡ Buyer Email + CSV (99¢)', ctaTitle: '✦ Sponsor Match Ready:', heroTitle: 'Verified Creator Ad-Read Desk • 96 Placements', heroSub: '3x+ Renewal Signals, CPM Rate Cards & Buyer Contacts', heroBadge: '✓ 3x+ Renewal Audited', dossierTag: 'Verified Media Kit & Buyer CSV' },
    citation_forge: { leadBtn: '📩 Send GEO Checklist', leadPh: 'Work email for GEO Checklist...', microBtn: '⚡ llms-full.txt (99¢)', ctaTitle: '✦ AI Citation Audit Ready:', heroTitle: 'AI Search Entity & Knowledge Graph Optical Prism', heroSub: 'ChatGPT Search, Perplexity & Gemini Citation Share-of-Voice', heroBadge: '✓ AnswerDotAI / llms.txt v2', dossierTag: 'llms-full.txt & JSON-LD Graph' },
    abandon_alpha: { leadBtn: '📩 Send Retry Playbook', leadPh: 'Work email for Retry Playbook...', microBtn: '⚡ Bandit SDK (99¢)', ctaTitle: '✦ Recovery Audit Ready:', heroTitle: 'Autonomous FinOps Payment Routing & Bandit Core', heroSub: 'C1–C6 Exit-Intent Posteriors & Smart Decline Retry Windows', heroBadge: '✓ Beta-Bernoulli Bandit', dossierTag: 'Bandit SDK & Webhook Worker' }
  })[CFG.moduleId] || { leadBtn: '📩 Send Checklist', leadPh: 'Work email for Checklist...', microBtn: '⚡ Single-File (99¢)', ctaTitle: '✦ Deliverable Ready:', heroTitle: CFG.brandName + ' Studio Desk', heroSub: 'Deterministic Audit & Production Deliverable', heroBadge: '✓ Verified Engine', dossierTag: 'Production Deliverable' };
  ['pointerdown', 'keydown', 'input'].forEach(function(ev) { document.addEventListener(ev, function() { window.__ebUserInteracted = true; }, { passive: true, once: true }); });
  try {
    if (localStorage.getItem(STORAGE_KEY) === '1' || window.location.search.indexOf('checkout=success') !== -1 || window.location.search.indexOf('unlock=flash_pass') !== -1) {
      window.__ebIsUnlocked = true;
      localStorage.setItem(STORAGE_KEY, '1');
    }
  } catch (_) {}

  window.__ebLogEvent = function(eventType, meta) {
    try {
      fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: eventType, page_url: window.location.pathname, meta: meta || {} }) }).catch(function(){});
    } catch (_) {}
  };

  window.__ebSaveBundleFile = function() {
    try {
      var targetEl = document.getElementById('compiler-code-output') || document.getElementById('res-pitch-body') || document.getElementById('out-sdk-snippet') || document.getElementById('appleWalletCardPreview');
      var bodyText = targetEl ? targetEl.textContent : (CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine);
      var blob = new Blob([CFG.brandName + ' Verified Deliverable Bundle\\n' + CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine + '\\n\\n' + bodyText], { type: 'text/plain;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = CFG.moduleId + '-deliverable-bundle.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (_) {}
  };

  document.addEventListener('click', function(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href*="/api/affiliate"], a[rel*="sponsored"], a.affiliate-link-pill, a.affiliate-micro-link') : null;
    if (a && !a.hasAttribute('onclick')) {
      window.__ebLogEvent('affiliate_click', { partner: (a.textContent || '').trim().slice(0, 40), href: a.getAttribute('href') || '' });
    }
    var presetBtn = e.target && e.target.closest ? e.target.closest('[onclick*="recalcPseo"], [onclick*="pasteSample"], [onclick*="filterPlacements"], [onclick*="filterLedgerRows"], [onclick*="switchToolMode"], [onclick*="setBrandPreset"], [onclick*="setPresetDomain"], [onclick*="switchCompilerTab"], [onclick*="applyRoutinePreset"], .preset-btn, .obj-btn') : null;
    if (presetBtn) window.__ebLogEvent('calculate', { source: 'native_interactive_control' });
  }, { passive: true });

  window.__ebTriggerPostCalcSpotlight = function(entityName) {
    if (window.__ebIsUnlocked) return;
    var label = entityName ? (' (' + String(entityName).slice(0, 26) + ')') : '';
    var curtain = document.getElementById('eb-deliverable-curtain');
    if (curtain) curtain.style.boxShadow = '0 0 0 3px ' + CFG.theme.accentBorder + ', 0 12px 32px rgba(15,23,42,0.10)';
    var pcBar = document.getElementById('eb-postcalc-inline-cta');
    if (pcBar) {
      pcBar.style.boxShadow = '0 0 0 3px ' + CFG.theme.accentBorder + ', 0 10px 26px rgba(15,23,42,0.10)';
      var pcTitle = document.getElementById('eb-postcalc-cta-title');
      if (pcTitle) pcTitle.textContent = label ? ('✦ Audit Ready' + label + ':') : PERSONA.ctaTitle;
    }
    var toast = document.getElementById('eb-ouibounce-toast');
    if (toast && window.__ebUserInteracted) {
      var tTitle = document.getElementById('eb-ouibounce-title');
      if (tTitle) tTitle.textContent = '✦ Custom Diagnostic Ready' + label;
      toast.style.display = 'block';
    }
    window.__ebLogEvent('view_paywall', { target: 'vaul_post_calc_spotlight' });
  };

  window.__ebFillEmailDomain = function(inputId, domain, formId) {
    var inp = document.getElementById(inputId || 'eb-inline-scorecard-email');
    if (!inp) return;
    var val = (inp.value || '').trim();
    var prefix = val.split('@')[0].trim();
    if (prefix.length > 0) {
      inp.value = prefix + domain;
      window.__ebSaveInlineScorecard(null, inputId || 'eb-inline-scorecard-email', formId || 'eb-save-scorecard-bar');
    } else {
      inp.value = domain;
      inp.focus();
      try { inp.setSelectionRange(0, 0); } catch (_) {}
    }
  };

  window.__ebSetCurtainRoiScale = function(mult) {
    var m = Number(mult) || 1;
    var baseUsd = CFG.moduleId === 'citation_forge' ? 1420 : (CFG.moduleId === 'sponsor_radar' ? 4800 : (CFG.moduleId === 'derm_logic' ? 165 : 5600));
    var badge = document.getElementById('eb-curtain-roi-badge');
    if (badge) badge.textContent = 'Est. Value: $' + (baseUsd * m).toLocaleString() + ' (' + Math.round((baseUsd * m) / 0.99).toLocaleString() + 'x vs 99¢ Pass)';
    window.__ebLogEvent('calculate', { source: 'curtain_roi_scale', multiplier: m });
  };

  window.__ebCycleHeroScenario = function(ev) {
    if (ev && ev.stopPropagation) ev.stopPropagation();
    var list = (CFG.presets && CFG.presets.length) ? CFG.presets : [{ key: 'custom-benchmark', label: 'Live Scenario' }];
    window.__ebHeroPresetIdx = ((window.__ebHeroPresetIdx || 0) + 1) % list.length;
    var p = list[window.__ebHeroPresetIdx];
    var curves = ['M1 11 C 9 10, 14 4, 22 6 C 29 8, 34 2, 41 2', 'M1 12 C 10 6, 18 9, 26 4 C 32 2, 37 5, 41 1', 'M1 9 C 8 11, 16 3, 24 7 C 31 4, 36 3, 41 2'];
    var pathEl = document.getElementById('eb-sparkline-path'), lblEl = document.getElementById('eb-hero-sparkline-label');
    if (pathEl) pathEl.setAttribute('d', curves[window.__ebHeroPresetIdx % curves.length]);
    if (lblEl) lblEl.textContent = '⚡ ' + p.label + ' Simulated';
    window.__ebCompileCustomCurtain(p.key);
  };

  window.__ebCompileCustomCurtain = function(presetKey) {
    window.__ebUserInteracted = true;
    var inp = document.getElementById('eb-curtain-entity-input'), qIn = document.getElementById('eb-pseo-quick-input');
    if (presetKey && inp) inp.value = presetKey;
    if (presetKey && qIn) qIn.value = presetKey;
    var q = inp && inp.value.trim() ? inp.value.trim() : (presetKey || window.__ebActiveEntity || 'custom-audit');
    window.__ebActiveEntity = q;
    if (window.history && window.history.replaceState) { try { window.history.replaceState(null, '', window.location.pathname + '?q=' + encodeURIComponent(q)); } catch (_) {} }
    var slug = q.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 22) || 'custom';
    window.__ebLogEvent('calculate', { source: 'curtain_custom_compile', query: q });
    var dPill = document.getElementById('eb-dossier-format-pill'), f0 = (CFG.deliverableFiles && CFG.deliverableFiles[0]) || { file: 'bundle.txt', size: '4.2 KB' };
    if (dPill) { dPill.textContent = '📄 ' + slug + '-' + f0.file + ' • ' + f0.size; dPill.style.transform = 'scale(1.06)'; setTimeout(function() { dPill.style.transform = 'scale(1)'; }, 180); }
    var spLbl = document.getElementById('eb-hero-sparkline-label');
    if (spLbl) spLbl.textContent = '✓ ' + q.slice(0, 18) + ' Active';
    fetch('/api/github-upgrade/fuse-search?q=' + encodeURIComponent(q))
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var hdr = document.getElementById('eb-curtain-title-span'), qRd = document.getElementById('eb-quick-live-readout') || document.getElementById('eb-mobile-live-readout');
        if (hdr) hdr.textContent = '✦ Custom Deliverable (' + q + ') — Verified Preview';
        if (qRd && data && data.kpis) { qRd.style.display = 'inline-flex'; qRd.textContent = '✓ ' + q.slice(0, 18) + ': ' + data.kpis.slice(0, 2).join(' • '); }
        var pills = document.getElementById('eb-manifest-pills-left') || document.getElementById('eb-zod-manifest-pills');
        if (pills && CFG.deliverableFiles) {
          pills.innerHTML = CFG.deliverableFiles.map(function(f, idx) {
            return '<span class="eb-manifest-pill" onclick="window.__ebSelectManifestFile(' + idx + ', this)" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;padding:3px 9px;border-radius:999px;background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';">✓ <code>' + slug + '-' + f.file + '</code> <span style="color:' + CFG.theme.textMuted + ';">(' + f.size + ' ↓)</span></span>';
          }).join('');
        }
        var pre = document.getElementById('eb-prism-proof-preview');
        if (pre && data) pre.textContent = CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine + '\\n// Custom KPIs for ' + q + ': ' + ((data.kpis || []).join(' | ')) + '\\n' + (data.row1_insight || '');
        var btn = document.getElementById('btn-curtain-flash-pass');
        if (btn) btn.textContent = 'Unlock Custom ' + q.slice(0, 16) + ' Bundle ($1.99) →';
        window.__ebTriggerPostCalcSpotlight(q);
      }).catch(function(){});
  };

  window.__ebMountDeliverableCurtain = function(entityOverride) {
    if (entityOverride) window.__ebActiveEntity = String(entityOverride);
    var targetEl = document.getElementById('compiler-code-output') || document.getElementById('res-pitch-body') || document.getElementById('out-sdk-snippet') || document.getElementById('walletConflicts') || document.getElementById('appleWalletCardPreview');

    if (CFG.moduleId === 'sponsor_radar') {
      var emailNodes = [document.getElementById('res-dm-email')].concat(Array.prototype.slice.call(document.querySelectorAll('.kpi-box .kpi-val, .pitch-box .mono')));
      emailNodes.forEach(function(nd) {
        if (nd && nd.textContent.indexOf('@') !== -1 && nd.textContent.indexOf('Unlock') === -1) {
          nd.setAttribute('data-raw-email', nd.textContent);
          var parts = nd.textContent.trim().split('@');
          nd.innerHTML = (parts[0] ? parts[0].slice(0, 2) + '***@' + (parts[1] || 'brand.com').slice(0, 18) : 'p***@brand.com') + ' <button type="button" onclick="window.__ebOpenFloatingGate(this)" style="background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';border-radius:999px;padding:1px 8px;font-size:10px;font-weight:700;margin-left:4px;">Unlock (99¢)</button>';
        }
      });
    }

    var tbody = document.getElementById('prompt-matrix-tbody') || document.getElementById('res-placements-tbody') || document.querySelector('main table tbody, article table tbody');
    if (tbody && !window.__ebIsUnlocked) {
      var trs = tbody.querySelectorAll('tr');
      for (var r0 = 0; r0 < Math.min(3, trs.length); r0++) {
        if (!trs[r0].hasAttribute('data-eb-live-row')) {
          trs[r0].setAttribute('data-eb-live-row', String(r0 + 1));
          trs[r0].title = 'Click row to benchmark & compile custom deliverable';
          var tdFirst = trs[r0].querySelector('td, th');
          if (tdFirst && !tdFirst.querySelector('.eb-row-sim-pill')) tdFirst.insertAdjacentHTML('beforeend', ' <span class="eb-row-sim-pill" style="display:inline-block;margin-left:4px;padding:1px 6px;border-radius:999px;background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';font-size:9.5px;font-weight:700;white-space:nowrap;vertical-align:middle;">⚡ Sim</span>');
          trs[r0].addEventListener('click', function(ev) {
            if (ev.target && ev.target.closest && ev.target.closest('a, button, input')) return;
            var td0 = this.querySelector('td, th');
            var ent = td0 ? (td0.textContent || '').replace('⚡ Sim', '').trim().slice(0, 36) : '';
            if (ent) window.__ebCompileCustomCurtain(ent);
          });
        }
      }
      for (var r = 3; r < trs.length; r++) trs[r].classList.add('eb-blurred-deliverable');
      if (trs.length > 3 && !document.getElementById('eb-table-row4-gate-tr')) {
        var gateTr = document.createElement('tr'); gateTr.id = 'eb-table-row4-gate-tr'; gateTr.style.cssText = 'cursor:pointer;background:' + CFG.theme.brandSoftBg + ';';
        gateTr.onclick = function() { window.__ebOpenFloatingGate(this); };
        gateTr.innerHTML = '<td colspan="8" style="padding:7px 12px;border-top:1.5px dashed ' + CFG.theme.accentBorder + ';border-bottom:1.5px dashed ' + CFG.theme.accentBorder + ';font-family:' + CFG.theme.fontSans + ';font-size:11.5px;color:' + CFG.theme.textPrimary + ';"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;"><span>🔒 <strong>Rows #4–#' + trs.length + ' Locked in Preview:</strong> Click to reveal Row #4 free via email or unblur all ' + trs.length + ' rows + CSV</span><span style="padding:2px 9px;border-radius:999px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;font-size:10.5px;font-weight:700;white-space:nowrap;">🔓 Reveal Row #4 / Unblur All (99¢) →</span></div></td>';
        tbody.insertBefore(gateTr, trs[3]);
      }
      var tblEl = tbody.closest('table');
      var tblWrap = tblEl ? (tblEl.closest('.table-wrap, .posterior-table-wrap') || tblEl) : null;
      if (tblWrap && tblWrap.parentNode && !document.getElementById('eb-tanstack-table-bar')) {
        var tBar = document.createElement('div');
        tBar.id = 'eb-tanstack-table-bar';
        tBar.style.cssText = 'display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;padding:7px 10px;margin-bottom:8px;border-radius:9px;background:' + CFG.theme.subtleBg + ';border:1px solid ' + CFG.theme.border + ';font-family:' + CFG.theme.fontSans + ';';
        tBar.innerHTML = '<div style="display:flex;align-items:center;gap:6px;flex:1;min-width:190px;"><span style="font-size:10.5px;font-weight:700;color:' + CFG.theme.brandPrimary + ';white-space:nowrap;">⚡ Live Table Filter:</span><input type="search" id="eb-tanstack-filter-input" placeholder="Filter rows or calculate custom scenario..." oninput="window.__ebFilterAndCalcTable(this.value)" style="flex:1;padding:4px 8px;border-radius:6px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:11.5px;" /></div>'
          + '<div style="display:inline-flex;gap:6px;align-items:center;flex-wrap:wrap;"><button type="button" id="btn-tanstack-sort" onclick="window.__ebSortTableRows()" style="padding:4px 9px;border-radius:999px;background:#FFFFFF;color:' + CFG.theme.textPrimary + ';border:1px solid ' + CFG.theme.border + ';font-size:11px;font-weight:600;cursor:pointer;">⇅ Sort Top ROI</button><button type="button" id="btn-tanstack-unlock-rows" onclick="window.__ebOpenFloatingGate(this)" style="padding:4px 10px;border-radius:999px;background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';font-size:11px;font-weight:700;cursor:pointer;">🔒 Unblur All Rows (99¢)</button></div>';
        tblWrap.parentNode.insertBefore(tBar, tblWrap);
      }
    }

    var isPseoOrDir = window.location.pathname.indexOf('/seo/') === 0 || window.location.pathname.indexOf('/tools/') === 0 || window.location.pathname.indexOf('/compare/') === 0 || window.location.pathname === '/directory';
    var h1Node = document.querySelector('main h1, article h1, h1');
    if (h1Node && !window.__ebActiveEntity && isPseoOrDir) {
      var rawH1 = (h1Node.textContent || '').replace(/\\s+/g, ' ').trim().split(/\\s*[—–|:]\\s*/)[0];
      if (rawH1.length > 38) rawH1 = rawH1.slice(0, 38).replace(/\\s+\\S*$/, '');
      window.__ebActiveEntity = rawH1.replace(/[,;:\\s]+$/, '');
    }
    if (!document.getElementById('eb-entity-datalist')) document.body.insertAdjacentHTML('beforeend', '<datalist id="eb-entity-datalist">' + (CFG.presets || []).map(function(p) { return '<option value="' + p.key + '">' + p.label + '</option>'; }).join('') + '</datalist>');
    var sparkPillHtml = '<div id="eb-hero-sparkline-pill" onclick="window.__ebCycleHeroScenario(event)" title="Tap to simulate live scenario"><span style="width:6px;height:6px;border-radius:50%;background:' + CFG.theme.safeColor + ';box-shadow:0 0 0 3px ' + CFG.theme.safeSoftBg + ';"></span><svg aria-hidden="true" width="42" height="14" viewBox="0 0 42 14" fill="none" style="overflow:visible;"><path id="eb-sparkline-path" d="M1 11 C 9 10, 14 4, 22 6 C 29 8, 34 2, 41 2" stroke="' + CFG.theme.brandPrimary + '" stroke-width="1.8" stroke-linecap="round"/><circle cx="41" cy="2" r="2.2" fill="' + CFG.theme.safeColor + '"/></svg><span id="eb-hero-sparkline-label" class="eb-tabular" style="font-size:10px !important;font-weight:700 !important;color:#0F172A;white-space:nowrap;">⚡ Tap to Sim</span></div>';
    var buildHeroCardEl = function(imgH, marginCss) {
      var hc = document.createElement('div'); hc.id = 'eb-doppelrand-hero-card'; hc.className = 'eb-doppelrand-shell'; hc.style.cssText = (marginCss || 'margin:0;') + 'cursor:pointer;';
      hc.onclick = function(ev) { window.__ebCycleHeroScenario(ev); };
      hc.innerHTML = '<div class="eb-doppelrand-inner">' + sparkPillHtml + '<img src="/public/editorial-hero.jpg" alt="' + CFG.brandName + ' — ' + PERSONA.heroTitle + '" class="eb-doppelrand-img" style="height:' + (imgH || 168) + 'px;" loading="eager" fetchpriority="high" decoding="async" /><div class="eb-doppelrand-caption"><div style="min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"><strong style="font-size:11px !important;color:#0F172A;font-weight:700 !important;">' + PERSONA.heroTitle + '</strong> <span style="font-size:10.5px !important;color:#475569;">• ' + PERSONA.heroSub + '</span></div><span style="padding:2px 8px;border-radius:999px;background:' + CFG.theme.safeSoftBg + ';color:' + CFG.theme.safeColor + ';border:1px solid ' + CFG.theme.safeBorder + ';font-weight:700 !important;font-size:10px !important;white-space:nowrap;flex-shrink:0;">' + PERSONA.heroBadge + '</span></div></div>';
      return hc;
    };
    var existingHeroSplit = h1Node && h1Node.closest ? h1Node.closest('.hero-split, .hero-grid, .hero-editorial-grid') : null;
    var buildQBar = function(barId) {
      var qChips = (CFG.presets || []).slice(0, 3).map(function(p) { return '<button type="button" onclick="window.__ebCompileCustomCurtain(\\\'' + p.key + '\\\')" style="padding:3px 8px;border-radius:999px;background:#FFFFFF;color:' + CFG.theme.textSecondary + ';border:1px solid ' + CFG.theme.border + ';font-size:10.5px;font-weight:600;cursor:pointer;white-space:nowrap;">⚡ ' + p.label + '</button>'; }).join('');
      var qBar = document.createElement('div'); qBar.id = barId || 'eb-pseo-quick-bar';
      var inId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-quick-input' : 'eb-pseo-quick-input', emId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-quick-email' : 'eb-quick-inline-email', fmId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-quick-form' : 'eb-quick-inline-form', rdId = barId === 'eb-mobile-firstfold-bar' ? 'eb-mobile-live-readout' : 'eb-quick-live-readout';
      qBar.style.cssText = 'display:flex;flex-direction:column;gap:6px;padding:9px 11px;margin:0;border-radius:10px;background:' + CFG.theme.brandSoftBg + ';border:1px solid ' + CFG.theme.accentBorder + ';font-family:' + CFG.theme.fontSans + ';';
      qBar.innerHTML = '<div style="display:flex;align-items:center;justify-content:space-between;gap:5px;width:100%;flex-wrap:wrap;"><div style="display:inline-flex;align-items:center;gap:4px;flex-wrap:wrap;"><span style="font-size:11px;font-weight:700;color:' + CFG.theme.brandPrimary + ';white-space:nowrap;">⚡ Instant Benchmark:</span>' + qChips + '</div><div style="display:inline-flex;align-items:center;gap:5px;flex:1;min-width:165px;"><input type="text" id="' + inId + '" list="eb-entity-datalist" onchange="if(this.value)window.__ebCompileCustomCurtain(this.value)" placeholder="' + CFG.searchPlaceholder + '" onkeydown="if(event.keyCode===13){event.preventDefault();window.__ebCompileCustomCurtain(this.value);}" style="flex:1;min-width:115px;padding:4px 8px;border-radius:6px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:11.5px;" /><button type="button" onclick="var v=document.getElementById(\\\'' + inId + '\\\').value;window.__ebCompileCustomCurtain(v||window.__ebActiveEntity);var c=document.getElementById(\\\'eb-deliverable-curtain\\\');if(c&&c.scrollIntoView)c.scrollIntoView({behavior:\\\'smooth\\\',block:\\\'center\\\'});" style="padding:4px 9px;border-radius:6px;background:#FFFFFF;color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';font-size:11px;font-weight:700;cursor:pointer;white-space:nowrap;">Run ↵</button><span id="' + rdId + '" style="display:none;font-size:10.5px;font-weight:700;color:' + CFG.theme.safeColor + ';background:' + CFG.theme.safeSoftBg + ';border:1px solid ' + CFG.theme.safeBorder + ';padding:2px 8px;border-radius:999px;white-space:nowrap;"></span></div></div>'
        + '<form id="' + fmId + '" onsubmit="return window.__ebSaveInlineScorecard(event, \\\'' + emId + '\\\', \\\'' + fmId + '\\\')" style="display:flex;justify-content:space-between;align-items:center;gap:5px;width:100%;flex-wrap:wrap;margin:0;padding-top:6px;border-top:1px dashed ' + CFG.theme.accentBorder + ';"><div style="display:inline-flex;align-items:center;gap:4px;flex:1;min-width:175px;"><input type="email" id="' + emId + '" placeholder="' + PERSONA.leadPh + '" required style="flex:1;min-width:135px;padding:4px 8px;border-radius:6px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:11px;" /><button type="button" onclick="window.__ebFillEmailDomain(\\\'' + emId + '\\\', \\\'@gmail.com\\\', \\\'' + fmId + '\\\')" style="padding:3px 6px;border-radius:999px;background:#FFFFFF;color:' + CFG.theme.textSecondary + ';border:1px solid ' + CFG.theme.border + ';font-size:9.5px;font-weight:600;cursor:pointer;">@gmail</button></div><div style="display:inline-flex;align-items:center;gap:5px;flex-wrap:wrap;"><button type="submit" style="padding:4px 9px;border-radius:999px;background:#FFFFFF;color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';font-size:10.5px;font-weight:700;cursor:pointer;white-space:nowrap;">' + PERSONA.leadBtn + '</button><button type="button" onclick="window.__ebCheckout(\\\'micro_pass\\\')" style="padding:5px 10px;border-radius:999px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-size:10.5px;font-weight:700;cursor:pointer;white-space:nowrap;">' + PERSONA.microBtn + ' →</button></div></form>';
      if (window.__ebPaywallObserver) window.__ebPaywallObserver.observe(qBar);
      return qBar;
    };
    if (isPseoOrDir) {
      if (!window.__ebIsUnlocked) Array.prototype.slice.call(document.querySelectorAll('.pitch-pre, .code-snippet-box code')).forEach(function(el) { el.classList.add('eb-blurred-deliverable'); });
      if (existingHeroSplit) {
        existingHeroSplit.style.alignItems = 'stretch';
        if (h1Node && h1Node.parentNode) { h1Node.parentNode.style.cssText += ';display:flex;flex-direction:column;justify-content:space-between;height:100%;'; if (!window.__ebIsUnlocked && !document.getElementById('eb-pseo-quick-bar')) h1Node.parentNode.appendChild(buildQBar('eb-pseo-quick-bar')); }
        var teHeaderPseo = existingHeroSplit.querySelector('.telemetry-card .card-header-bar');
        if (teHeaderPseo && teHeaderPseo.parentNode && !document.getElementById('eb-doppelrand-hero-card')) teHeaderPseo.parentNode.insertBefore(buildHeroCardEl(128, 'margin:0 0 12px 0;'), teHeaderPseo.nextSibling);
      } else if (h1Node && h1Node.parentNode && !document.getElementById('eb-pseo-hero-split')) {
        var splitWrap = document.createElement('div'); splitWrap.id = 'eb-pseo-hero-split';
        var leftCol = document.createElement('div'); leftCol.id = 'eb-pseo-hero-left'; leftCol.style.cssText = 'display:flex;flex-direction:column;justify-content:space-between;gap:10px;min-width:0;';
        var leadP = document.querySelector('.pseo-lead') || (h1Node.nextElementSibling && h1Node.nextElementSibling.tagName === 'P' ? h1Node.nextElementSibling : null);
        h1Node.parentNode.insertBefore(splitWrap, h1Node.nextSibling);
        if (leadP) { leadP.classList.add('eb-pseo-lead-card'); if (!leadP.querySelector('div, span')) leadP.insertAdjacentHTML('afterbegin', '<div style="font-size:10.5px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:' + CFG.theme.brandPrimary + ';margin-bottom:6px;">✦ ANSWER-FIRST EXECUTIVE SUMMARY • ' + PERSONA.heroBadge + '</div>'); leftCol.appendChild(leadP); }
        if (!window.__ebIsUnlocked && !document.getElementById('eb-pseo-quick-bar')) leftCol.appendChild(buildQBar('eb-pseo-quick-bar'));
        splitWrap.appendChild(leftCol); splitWrap.appendChild(buildHeroCardEl(168, 'margin:0;'));
      }
    } else {
      var nativePhotoShell = document.querySelector('.editorial-photo-shell');
      if (nativePhotoShell && !document.getElementById('eb-hero-sparkline-pill')) {
        nativePhotoShell.style.position = 'relative'; nativePhotoShell.style.cursor = 'pointer'; nativePhotoShell.onclick = function(ev) { window.__ebCycleHeroScenario(ev); }; nativePhotoShell.insertAdjacentHTML('beforeend', sparkPillHtml);
      } else if (!nativePhotoShell && !document.getElementById('eb-doppelrand-hero-card')) {
        var presetRowCf = document.querySelector('#grader .preset-strip'), teHeaderAa = document.querySelector('.telemetry-card .card-header-bar'), subheadSr = document.querySelector('#radar-tool .hero-grid p.subhead, .hero-grid p.subhead'), fallbackLead = document.querySelector('.hero-sub, .subhead, .hero-lead, main h1 ~ p');
        if (presetRowCf && presetRowCf.parentNode) presetRowCf.parentNode.insertBefore(buildHeroCardEl(128, 'margin:14px 0 0 0;'), presetRowCf.nextSibling);
        else if (teHeaderAa && teHeaderAa.parentNode) teHeaderAa.parentNode.insertBefore(buildHeroCardEl(132, 'margin:0 0 12px 0;'), teHeaderAa.nextSibling);
        else if (subheadSr && subheadSr.parentNode) subheadSr.parentNode.insertBefore(buildHeroCardEl(138, 'margin:10px 0 12px 0;'), subheadSr.nextSibling);
        else if (fallbackLead && fallbackLead.parentNode) fallbackLead.parentNode.insertBefore(buildHeroCardEl(140, 'margin:12px 0 14px 0;'), fallbackLead.nextSibling);
      }
      var homeSubLead = document.querySelector('.hero-sub, .subhead, .editorial-subhead, .hero-lead, main h1 ~ p');
      if (homeSubLead && homeSubLead.parentNode && !window.__ebIsUnlocked && !document.getElementById('eb-mobile-firstfold-bar')) homeSubLead.parentNode.insertBefore(buildQBar('eb-mobile-firstfold-bar'), homeSubLead.nextSibling);
    }
    var scoreAnchor = document.querySelector('#liveResultsContainer .score-strip, .telemetry-card .metric-duo, #results-panel .kpi-grid, .panel-elevated .telemetry-grid');
    if ((scoreAnchor || targetEl) && !window.__ebIsUnlocked && !isPseoOrDir) {
      if (targetEl) targetEl.classList.add('eb-blurred-deliverable');
      if (!document.getElementById('eb-postcalc-inline-cta')) {
        var pcCta = document.createElement('div'); pcCta.id = 'eb-postcalc-inline-cta';
        pcCta.style.cssText = 'display:flex;flex-direction:column;gap:6px;padding:9px 12px;margin:10px 0;border-radius:10px;background:' + CFG.theme.brandSoftBg + ';border:1.5px solid ' + CFG.theme.accentBorder + ';font-family:' + CFG.theme.fontSans + ';';
        pcCta.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;width:100%;"><span id="eb-postcalc-cta-title" style="font-size:11.5px;font-weight:700;color:' + CFG.theme.brandPrimary + ';">' + PERSONA.ctaTitle + '</span><div style="display:inline-flex;gap:5px;align-items:center;flex-wrap:wrap;"><a id="btn-postcalc-permalink" href="/scan/' + encodeURIComponent(window.__ebActiveEntity || (CFG.presets[0] && CFG.presets[0].key) || 'verified') + '" style="padding:4px 8px;border-radius:999px;background:#FFFFFF;color:' + CFG.theme.textPrimary + ';border:1px solid ' + CFG.theme.border + ';font-size:10.5px;font-weight:700;text-decoration:none;white-space:nowrap;">🔗 Permalink ↗</a><button type="button" id="btn-postcalc-micro-pass" onclick="window.__ebCheckout(\\\'micro_pass\\\')" style="padding:4px 9px;border-radius:999px;background:#FFFFFF;color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';font-size:10.5px;font-weight:700;cursor:pointer;white-space:nowrap;">' + PERSONA.microBtn + '</button><button type="button" id="btn-postcalc-flash-pass" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="padding:4px 10px;border-radius:999px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-size:10.5px;font-weight:700;cursor:pointer;white-space:nowrap;">3-File Bundle ($1.99) →</button></div></div>'
          + '<form id="eb-postcalc-email-form" onsubmit="return window.__ebSaveInlineScorecard(event, \\\'eb-postcalc-email-input\\\', \\\'eb-postcalc-email-form\\\')" style="display:flex;gap:5px;align-items:center;width:100%;margin:0;padding-top:5px;border-top:1px dashed ' + CFG.theme.accentBorder + ';"><input type="email" id="eb-postcalc-email-input" placeholder="' + PERSONA.leadPh + '" required style="flex:1;min-width:140px;padding:4px 8px;border-radius:6px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:11px;" /><button type="button" onclick="window.__ebFillEmailDomain(\\\'eb-postcalc-email-input\\\',\\\'@gmail.com\\\',\\\'eb-postcalc-email-form\\\')" style="padding:3px 7px;border-radius:999px;background:#FFFFFF;color:' + CFG.theme.textSecondary + ';border:1px solid ' + CFG.theme.border + ';font-size:10px;font-weight:700;cursor:pointer;white-space:nowrap;">@gmail</button><button type="submit" id="btn-postcalc-email-submit" style="padding:4px 10px;border-radius:999px;background:#FFFFFF;color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';font-size:10.5px;font-weight:700;cursor:pointer;white-space:nowrap;">' + PERSONA.leadBtn + ' →</button></form>';
        if (scoreAnchor && scoreAnchor.parentNode) scoreAnchor.parentNode.insertBefore(pcCta, scoreAnchor.nextSibling);
        else if (targetEl && targetEl.parentNode) targetEl.parentNode.insertBefore(pcCta, targetEl);
        if (window.__ebPaywallObserver) window.__ebPaywallObserver.observe(pcCta);
      }
    }
    var tBarAnchor = document.getElementById('eb-tanstack-table-bar');
    var homeFullGrid = !isPseoOrDir ? document.querySelector('main .bento-grid, main .hero-split, main .hero-grid') : null;
    var seoTargetEl = isPseoOrDir ? (existingHeroSplit || document.getElementById('eb-pseo-hero-split') || document.querySelector('main .table-wrap, article .table-wrap, main .posterior-table-wrap') || tBarAnchor || targetEl) : null;
    var mountAnchor = isPseoOrDir ? seoTargetEl : (homeFullGrid || tBarAnchor || targetEl || document.getElementById('eb-doppelrand-hero-card'));
    if (!mountAnchor) return;
    var fInit = (CFG.deliverableFiles && CFG.deliverableFiles[0]) || { file: 'bundle.txt', size: '4.2 KB' }, f1 = (CFG.deliverableFiles && CFG.deliverableFiles[1]) || fInit, f2 = (CFG.deliverableFiles && CFG.deliverableFiles[2]) || fInit;
    var rawText = (!isPseoOrDir && targetEl) ? (targetEl.textContent || '').trim() : ('// Target Benchmark: ' + (window.__ebActiveEntity || CFG.brandName) + ' • Deliverable: ' + fInit.file + ' (' + fInit.size + ')\\n// Status: Rows #1–#3 Verified | Rows #4+ & Raw File Ready (Reveal Row #4 via Email or 99¢ Pass)');
    var previewLines = rawText.split('\\n').slice(0, 3).join('\\n');
    if (previewLines.length > 220) previewLines = previewLines.slice(0, 220) + ' ...';

    var existingCurtain = document.getElementById('eb-deliverable-curtain');
    var entityTag = window.__ebActiveEntity ? (' (' + window.__ebActiveEntity + ')') : '';
    if (existingCurtain) {
      var prevBox = document.getElementById('eb-prism-proof-preview');
      if (prevBox && previewLines) prevBox.textContent = CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine + '\\n\\n' + previewLines;
      var hdrSpan = document.getElementById('eb-curtain-title-span');
      if (hdrSpan) hdrSpan.textContent = '✦ ' + CFG.freeDeliverableName + entityTag + ' — Diagnostic Proof Preview';
      return;
    }

    var filesHtml = (CFG.deliverableFiles || []).map(function(f, idx) {
      return '<span class="eb-manifest-pill" onclick="window.__ebSelectManifestFile(' + idx + ', this)" style="cursor:pointer;display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;padding:3px 9px;border-radius:999px;background:' + (idx === 0 ? CFG.theme.brandSoftBg : CFG.theme.subtleBg) + ';color:' + (idx === 0 ? CFG.theme.brandPrimary : CFG.theme.textPrimary) + ';border:1px solid ' + (idx === 0 ? CFG.theme.accentBorder : CFG.theme.border) + ';">✓ <code>' + f.file + '</code> <span style="color:' + CFG.theme.textMuted + ';">(' + f.size + ' ↓)</span></span>';
    }).join('');
    var chipsHtml = (CFG.presets || []).map(function(p) {
      return '<button type="button" class="eb-curtain-preset-chip" onclick="window.__ebCompileCustomCurtain(\\\'' + p.key + '\\\')" style="padding:4px 9px;border-radius:999px;background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textSecondary + ';border:1px solid ' + CFG.theme.border + ';font-size:11px;font-weight:600;cursor:pointer;">⚡ ' + p.label + '</button>';
    }).join('');
    var domChipsHtml = ['@gmail.com', '@icloud.com', '@outlook.com'].map(function(d) {
      return '<button type="button" class="eb-domain-chip" onclick="window.__ebFillEmailDomain(\\\'eb-inline-scorecard-email\\\', \\\'' + d + '\\\', \\\'eb-save-scorecard-bar\\\')" style="padding:2px 7px;border-radius:999px;background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textSecondary + ';border:1px solid ' + CFG.theme.border + ';font-size:10px;font-weight:600;cursor:pointer;">' + d + '</button>';
    }).join('');
    var dossierSplitHtml = '<div id="eb-curtain-visual-split" style="margin-bottom:10px;align-items:stretch;"><div id="eb-curtain-dossier-card" class="eb-doppelrand-shell" onclick="window.__ebCheckout(\\\'micro_pass\\\')" style="cursor:pointer;" title="Click to unlock ' + PERSONA.dossierTag + ' (99¢)"><div class="eb-doppelrand-inner" style="height:100%;"><span id="eb-dossier-format-pill">📄 ' + fInit.file + ' • ' + fInit.size + '</span><img src="/public/editorial-dossier.jpg" alt="' + CFG.brandName + ' ' + PERSONA.dossierTag + '" class="eb-doppelrand-img" style="height:132px;" loading="lazy" decoding="async" /><div class="eb-doppelrand-caption" style="padding:4px 8px;bottom:6px;left:6px;right:6px;"><span style="font-weight:700;font-size:10px;color:#0F172A;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + PERSONA.dossierTag + '</span><span style="color:' + CFG.theme.brandPrimary + ';font-weight:700;font-size:10px;flex-shrink:0;">99¢ →</span></div></div></div><div id="eb-prism-proof-frame" style="display:flex;flex-direction:column;justify-content:space-between;border-radius:11px;border:1px solid ' + CFG.theme.border + ';background:' + CFG.theme.subtleBg + ';overflow:hidden;"><pre id="eb-prism-proof-preview" style="margin:0;border:none;border-radius:0;flex:1;">' + CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine + '\\n\\n' + (previewLines || '// Customized deterministic output ready') + '</pre><div id="eb-prism-proof-footer" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;padding:5px 10px;background:rgba(255,255,255,0.88);border-top:1px solid ' + CFG.theme.border + ';font-size:10.5px;"><div style="display:inline-flex;align-items:center;gap:5px;flex-wrap:wrap;"><strong style="color:' + CFG.theme.textPrimary + ';">⚡ Inspect File:</strong><button type="button" onclick="window.__ebSelectManifestFile(0)" style="padding:1px 7px;border-radius:999px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textSecondary + ';font-size:10px;font-weight:600;cursor:pointer;">1. ' + fInit.file + '</button><button type="button" onclick="window.__ebSelectManifestFile(1)" style="padding:1px 7px;border-radius:999px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textSecondary + ';font-size:10px;font-weight:600;cursor:pointer;">2. ' + f1.file + '</button><button type="button" onclick="window.__ebSelectManifestFile(2)" style="padding:1px 7px;border-radius:999px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textSecondary + ';font-size:10px;font-weight:600;cursor:pointer;">3. ' + f2.file + '</button></div><div style="display:inline-flex;align-items:center;gap:6px;"><button type="button" id="btn-copy-readme-badge" onclick="window.__ebCopyReadmeBadge(this)" style="padding:2px 8px;border-radius:999px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:10px;font-weight:700;cursor:pointer;">🛡️ Copy Badge</button><button type="button" id="btn-nuqs-share-url" onclick="window.__ebCopyScenarioLink(this)" style="padding:2px 8px;border-radius:999px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:10px;font-weight:700;cursor:pointer;">🔗 Share Audit URL</button><button type="button" onclick="window.__ebCheckout(\\\'micro_pass\\\')" style="padding:2px 8px;border-radius:999px;border:1px solid ' + CFG.theme.accentBorder + ';background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';font-size:10px;font-weight:700;cursor:pointer;">⚡ Raw File (99¢) →</button></div></div></div></div>';
    var curtain = document.createElement('div');
    curtain.id = 'eb-deliverable-curtain';
    curtain.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:8px;">'
      + '<span id="eb-curtain-title-span" style="font-size:11px;font-weight:700;color:' + CFG.theme.brandPrimary + ';text-transform:uppercase;letter-spacing:0.04em;">✦ ' + CFG.freeDeliverableName + entityTag + ' — Diagnostic Proof Preview</span>'
      + '<div style="display:inline-flex;align-items:center;gap:4px;flex-wrap:wrap;"><span id="eb-curtain-roi-badge" style="font-size:11px;color:' + CFG.theme.safeColor + ';font-weight:700;background:' + CFG.theme.safeSoftBg + ';border:1px solid ' + CFG.theme.safeBorder + ';padding:2px 9px;border-radius:999px;">' + CFG.remDiff.roiBadge + '</span><button type="button" onclick="window.__ebSetCurtainRoiScale(1)" style="padding:1px 6px;border-radius:999px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;font-size:10px;font-weight:700;cursor:pointer;">1x</button><button type="button" onclick="window.__ebSetCurtainRoiScale(5)" style="padding:1px 6px;border-radius:999px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;font-size:10px;font-weight:700;cursor:pointer;">5x</button><button type="button" onclick="window.__ebSetCurtainRoiScale(10)" style="padding:1px 6px;border-radius:999px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;font-size:10px;font-weight:700;cursor:pointer;">10x ROI</button></div></div>'
      + '<div id="eb-curtain-customizer-bar" style="display:' + (isPseoOrDir ? 'none' : 'flex') + ';gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:8px;">'
      + '<input type="text" id="eb-curtain-entity-input" list="eb-entity-datalist" onchange="if(this.value)window.__ebCompileCustomCurtain(this.value)" placeholder="' + CFG.searchPlaceholder + ' (Compile Custom Deliverable)..." onkeydown="if(event.keyCode===13){event.preventDefault();window.__ebCompileCustomCurtain();}" style="flex:1;min-width:170px;padding:6px 10px;border-radius:8px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:12px;" />'
      + '<button type="button" id="btn-curtain-run-custom" onclick="window.__ebCompileCustomCurtain()" style="padding:6px 12px;border-radius:8px;background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';font-weight:700;font-size:11.5px;cursor:pointer;">Compile Custom Preview ↵</button>'
      + chipsHtml + '</div>'
      + (filesHtml ? '<div id="eb-zod-manifest-pills" style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:8px;"><div id="eb-manifest-pills-left" style="display:inline-flex;flex-wrap:wrap;gap:6px;align-items:center;">' + filesHtml + '</div><div id="eb-observable-telemetry-pill" style="display:inline-flex;align-items:center;gap:8px;padding:3px 10px;border-radius:999px;background:#F8FAFC;border:1px solid ' + CFG.theme.border + ';font-size:10.5px;font-weight:700;color:' + CFG.theme.textSecondary + ';"><svg aria-hidden="true" width="68" height="14" viewBox="0 0 68 14" style="vertical-align:middle;"><rect x="1" y="8" width="8" height="5" rx="1.5" fill="#94A3B8"/><rect x="12" y="6" width="8" height="7" rx="1.5" fill="#64748B"/><rect x="23" y="4" width="8" height="9" rx="1.5" fill="' + CFG.theme.brandPrimary + '" opacity="0.75"/><rect x="34" y="2" width="8" height="11" rx="1.5" fill="' + CFG.theme.brandPrimary + '"/><rect x="45" y="1" width="8" height="12" rx="1.5" fill="' + CFG.theme.safeColor + '"/><path d="M56 10 L60 6 L66 2" fill="none" stroke="' + CFG.theme.safeColor + '" stroke-width="1.8" stroke-linecap="round"/></svg><span>SHA-256 Verified • <code>observablehq/plot</code> ΔLift</span><button type="button" onclick="if(navigator.clipboard&&document.getElementById(\\\'eb-prism-proof-preview\\\')){navigator.clipboard.writeText(document.getElementById(\\\'eb-prism-proof-preview\\\').textContent);this.textContent=\\\'✓ Copied\\\';}" style="padding:1px 7px;border-radius:999px;border:1px solid ' + CFG.theme.accentBorder + ';background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';font-size:10px;font-weight:700;cursor:pointer;">Copy Diff ↗</button></div></div>' : '')
      + dossierSplitHtml
      + '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding-top:8px;border-top:1px solid ' + CFG.theme.border + ';">'
      + '<div style="font-size:12px;color:' + CFG.theme.textSecondary + ';"><strong style="color:' + CFG.theme.textPrimary + ';">🔒 Instant Browser Unblur &amp; Production File Download</strong><br/><span>1-Time Pass • No account or subscription • Apple Pay / Google Pay / Link</span></div>'
      + '<div style="display:inline-flex;gap:6px;flex-wrap:wrap;align-items:center;">'
      + '<button type="button" id="btn-curtain-micro-pass" onclick="window.__ebCheckout(\\\'micro_pass\\\')" style="padding:8px 12px;border-radius:' + CFG.theme.radiusPill + ';background:#FFFFFF;color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';font-weight:700;font-size:11.5px;">' + PERSONA.microBtn + '</button>'
      + '<button type="button" id="btn-curtain-flash-pass" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="padding:9px 15px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-weight:700;font-size:12.5px;">Unlock 3-File Bundle ($1.99) →</button>'
      + '<button type="button" id="btn-curtain-complete-pass" onclick="window.__ebCheckout(\\\'complete_dossier\\\')" style="padding:8px 12px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textPrimary + ';border:1px solid ' + CFG.theme.border + ';font-weight:600;font-size:11.5px;">Complete Pack ($' + CFG.corePriceUsd + ')</button>'
      + '</div></div>'
      + '<form id="eb-save-scorecard-bar" onsubmit="return window.__ebSaveInlineScorecard(event)" style="margin-top:8px;padding-top:8px;border-top:1px dashed ' + CFG.theme.border + ';display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;">'
      + '<span style="font-size:11.5px;color:' + CFG.theme.textSecondary + ';">🔓 <strong>Prefer Email Delivery + Row #4 Reveal?</strong> Type prefix &amp; tap domain: ' + domChipsHtml + '</span>'
      + '<div style="display:inline-flex;gap:6px;align-items:center;flex-wrap:wrap;">'
      + '<input type="email" id="eb-inline-scorecard-email" placeholder="' + PERSONA.leadPh + '" required style="padding:5px 9px;border-radius:7px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:11.5px;min-width:185px;" />'
      + '<button type="submit" id="btn-save-scorecard" style="padding:5px 11px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';font-weight:700;font-size:11px;cursor:pointer;">' + PERSONA.leadBtn + ' →</button></div></form>';

    if (mountAnchor.parentNode) {
      if (mountAnchor === tBarAnchor || mountAnchor === targetEl) mountAnchor.parentNode.insertBefore(curtain, mountAnchor);
      else mountAnchor.parentNode.insertBefore(curtain, mountAnchor.nextSibling);
    }
    if (window.__ebPaywallObserver) window.__ebPaywallObserver.observe(curtain);
    if (window.__ebIsUnlocked) window.__ebApplyUnblurState();
    var dermModal = document.getElementById('checkoutModal');
    if (dermModal && !document.getElementById('eb-modal-flash-pass-pill')) {
      var modalBox = dermModal.querySelector('.modal-card, div');
      if (modalBox) {
        var pill = document.createElement('div');
        pill.id = 'eb-modal-flash-pass-pill';
        pill.style.cssText = 'margin:10px 0;padding:10px 12px;border-radius:10px;background:' + CFG.theme.brandSoftBg + ';border:1px solid ' + CFG.theme.accentBorder + ';display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;';
        pill.innerHTML = '<span style="font-size:12px;font-weight:700;color:' + CFG.theme.textPrimary + ';">✦ Single-Routine Instant Pass (Save 60%)</span><button type="button" onclick="window.__ebCheckout(\\\'flash_pass\\\')" style="padding:6px 12px;border-radius:999px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-weight:700;font-size:11.5px;">Unlock Pass ($1.99) →</button>';
        modalBox.insertBefore(pill, modalBox.firstChild);
      }
    }
  };

  window.__ebFilterAndCalcTable = function(q) {
    var tbody = document.getElementById('prompt-matrix-tbody') || document.getElementById('res-placements-tbody') || document.querySelector('main table tbody, article table tbody');
    if (tbody) {
      var rows = tbody.querySelectorAll('tr');
      var low = String(q || '').toLowerCase();
      for (var i = 0; i < Math.min(3, rows.length); i++) {
        rows[i].style.display = (!low || rows[i].textContent.toLowerCase().indexOf(low) !== -1) ? '' : 'none';
      }
    }
    if (q && q.trim().length > 2) window.__ebCompileCustomCurtain(q.trim());
  };

  window.__ebSortTableRows = function() {
    var tbody = document.getElementById('prompt-matrix-tbody') || document.getElementById('res-placements-tbody') || document.querySelector('main table tbody, article table tbody');
    if (tbody) {
      var rows = Array.prototype.slice.call(tbody.querySelectorAll('tr'), 0, 3);
      rows.reverse().forEach(function(r) { tbody.insertBefore(r, tbody.firstChild); });
    }
    window.__ebLogEvent('calculate', { source: 'tanstack_list_sort' });
    var btn = document.getElementById('btn-tanstack-sort');
    if (btn) btn.textContent = '✓ Sorted Top ROI';
  };

  window.__ebSelectManifestFile = function(idx, pillEl) {
    var f = (CFG.deliverableFiles && CFG.deliverableFiles[idx]) || { file: 'deliverable.txt', size: '4.2 KB', schema: 'Verified Schema' };
    var allPills = document.querySelectorAll('#eb-zod-manifest-pills .eb-manifest-pill');
    for (var p = 0; p < allPills.length; p++) {
      var active = p === idx;
      allPills[p].style.background = active ? CFG.theme.brandSoftBg : CFG.theme.subtleBg;
      allPills[p].style.color = active ? CFG.theme.brandPrimary : CFG.theme.textPrimary;
      allPills[p].style.borderColor = active ? CFG.theme.accentBorder : CFG.theme.border;
    }
    var dPill = document.getElementById('eb-dossier-format-pill');
    if (dPill) { dPill.textContent = '📄 ' + f.file + ' • ' + f.size; dPill.style.transform = 'scale(1.06)'; setTimeout(function() { dPill.style.transform = 'scale(1)'; }, 180); }
    var prevBox = document.getElementById('eb-prism-proof-preview');
    if (prevBox) prevBox.textContent = '// [ACTIVE DELIVERABLE: ' + f.file + ' (' + f.size + ') • ' + (f.schema || 'Verified Contract') + ']\\n' + CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine + '\\n// Target: ' + (window.__ebActiveEntity || CFG.brandName) + ' — Click "⚡ Raw File (99¢)" or enter email below to reveal Row #4';
    var microBtn = document.getElementById('btn-curtain-micro-pass');
    if (microBtn) microBtn.textContent = '⚡ Download ' + f.file + ' (99¢)';
    var popMicroBtn = document.getElementById('btn-popover-micro-pass');
    if (popMicroBtn) popMicroBtn.textContent = '⚡ Unblur + Download ' + f.file + ' — 99¢ →';
    var emIn = document.getElementById('eb-inline-scorecard-email');
    if (emIn) emIn.placeholder = 'Email for Row #4 + ' + f.file + '...';
    window.__ebLogEvent('tab_switch', { store_pill: 'file_' + f.file });
    window.__ebLogEvent('calculate', { source: 'manifest_file_inspect', file: f.file });
  };

  window.__ebSaveInlineScorecard = function(ev, inputId, formId) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var inp = document.getElementById(inputId || 'eb-inline-scorecard-email');
    var email = inp ? inp.value.trim() : '';
    if (!email || email.indexOf('@') <= 0) return false;
    var safeEmail = email.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
    var r4 = document.querySelector('tr.eb-blurred-deliverable');
    if (r4) { r4.classList.remove('eb-blurred-deliverable'); r4.style.filter = 'none'; r4.style.background = CFG.theme.safeSoftBg; }
    var v4 = document.getElementById('eb-scan-row4-val') || document.getElementById('eb-growth-row4-val'), s4 = document.getElementById('eb-scan-row4-status') || document.getElementById('eb-growth-row4-status');
    if (v4 && v4.textContent.indexOf('Locked') !== -1) v4.textContent = 'Verified Patch Ready • Sent to ' + email;
    if (s4) { s4.textContent = 'UNLOCKED'; s4.style.color = CFG.theme.safeColor; }
    var gTr = document.getElementById('eb-table-row4-gate-tr');
    if (gTr) gTr.innerHTML = '<td colspan="8" style="padding:7px 12px;background:' + CFG.theme.safeSoftBg + ';color:' + CFG.theme.safeColor + ';font-weight:700;font-size:11.5px;">✓ Row #4 Revealed! <a href="/buy/micro_pass" onclick="window.__ebCheckout(\\\'micro_pass\\\');return false;" style="color:' + CFG.theme.brandPrimary + ';margin-left:8px;">Unblur all remaining rows + CSV for 99¢ →</a></td>';
    var prevBox = document.getElementById('eb-prism-proof-preview');
    if (prevBox) prevBox.textContent += '\\n// ✓ [ROW #4 REVEALED FOR ' + email.replace(/[<>]/g, '') + '] — Remaining rows & 3 files ready below';
    fetch('/api/leads/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'zeigarnik_row4_reveal' }) })
      .then(function() {
        var bar = document.getElementById(formId || 'eb-save-scorecard-bar');
        if (bar) bar.innerHTML = '<span style="font-size:11.5px;font-weight:700;color:' + CFG.theme.safeColor + ';">✓ Row #4 Unblurred &amp; 1-Click Links Emailed to ' + safeEmail + '!</span><a href="/buy/micro_pass" onclick="window.__ebCheckout(\\\'micro_pass\\\');return false;" style="padding:5px 12px;border-radius:999px;background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;text-decoration:none;font-weight:700;font-size:11px;cursor:pointer;">VIP Add-On: Unblur All Remaining Rows + File (99¢) →</a>';
      }).catch(function(){});
    return false;
  };

  window.__ebApplyUnblurState = function() {
    window.__ebIsUnlocked = true;
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
    var gTr = document.getElementById('eb-table-row4-gate-tr');
    if (gTr && gTr.parentNode) gTr.parentNode.removeChild(gTr);
    var blurred = document.querySelectorAll('.eb-blurred-deliverable');
    for (var i = 0; i < blurred.length; i++) blurred[i].classList.remove('eb-blurred-deliverable');
    Array.prototype.slice.call(document.querySelectorAll('[data-raw-email]')).forEach(function(nd) { nd.textContent = nd.getAttribute('data-raw-email'); });
    var curtain = document.getElementById('eb-deliverable-curtain');
    if (curtain) {
      curtain.style.background = CFG.theme.safeSoftBg;
      curtain.style.borderColor = CFG.theme.safeBorder;
      curtain.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span style="font-size:12.5px;font-weight:700;color:' + CFG.theme.safeColor + ';">✓ Full Production Deliverable Unlocked! Download your bundle below:</span><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;"><button type="button" id="btn-filesaver-bundle" onclick="window.__ebSaveBundleFile()" style="padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:#FFFFFF;color:' + CFG.theme.safeColor + ';border:1px solid ' + CFG.theme.safeBorder + ';font-weight:700;font-size:11.5px;">Download Deliverable Bundle (.TXT) ↓</button><a href="/api/github-upgrade/export.csv" download style="padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;text-decoration:none;font-weight:700;font-size:11.5px;">Export .CSV ↓</a></div></div>';
    }
    var pop = document.getElementById('eb-floating-gate-popover');
    if (pop) pop.style.display = 'none';
  };

  window.__ebOpenFloatingGate = function(anchorEl) {
    var pop = document.getElementById('eb-floating-gate-popover');
    if (!pop) return;
    if (anchorEl) {
      var trEl = anchorEl.tagName === 'TR' ? anchorEl : (anchorEl.closest ? anchorEl.closest('tr') : null);
      var pTitle = document.getElementById('eb-popover-title');
      if (trEl && pTitle) {
        var firstCell = trEl.querySelector('td, th');
        var cellTxt = firstCell ? (firstCell.textContent || '').trim().slice(0, 34) : '';
        if (cellTxt) pTitle.textContent = 'Unblur "' + cellTxt + '" + Full Deliverable';
      }
    }
    pop.style.display = 'block';
    window.__ebLogEvent('view_paywall', { target: 'floating_ui_gate' });
    if (anchorEl && anchorEl.getBoundingClientRect) {
      var rect = anchorEl.getBoundingClientRect();
      var top = rect.bottom + 8, left = Math.max(12, Math.min(window.innerWidth - 362, rect.left));
      if (top + 240 > window.innerHeight) top = Math.max(12, rect.top - 230);
      pop.style.top = top + 'px'; pop.style.left = left + 'px';
    } else {
      pop.style.top = '120px'; pop.style.left = Math.max(12, (window.innerWidth - 350) / 2) + 'px';
    }
  };

  document.addEventListener('click', function(e) {
    var nativeCkBtn = e.target && e.target.closest ? e.target.closest('button[onclick*="startCheckout"]') : null;
    if (nativeCkBtn) {
      var cEmail = document.getElementById('checkout-email');
      if (cEmail && (!cEmail.value || cEmail.value.indexOf('@') === -1)) cEmail.value = 'express-checkout@' + CFG.domain.replace('www.', '');
    }
    if (window.__ebIsUnlocked) return;
    var btn = e.target && e.target.closest ? e.target.closest('.eb-blurred-deliverable, .pitch-box a[href*="#pricing"], #copy-artifact-btn, #download-artifact-btn, #copy-code-btn, #copy-sdk-btn, button[onclick*="copyCompiledCode"], button[onclick*="downloadCompiledFile"], button[onclick*="copyPitchEmail"]') : null;
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    window.__ebOpenFloatingGate(btn);
  }, true);

  window.__ebSendExitSummary = function(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var input = document.getElementById('eb-ouibounce-email');
    var email = input ? input.value.trim() : '';
    if (!email) return false;
    var r4 = document.querySelector('tr.eb-blurred-deliverable');
    if (r4) { r4.classList.remove('eb-blurred-deliverable'); r4.style.background = CFG.theme.safeSoftBg; }
    fetch('/api/leads/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'exit_intent_downsell' }) })
      .then(function() {
        var btn = document.getElementById('btn-ouibounce-submit'), desc = document.getElementById('eb-ouibounce-desc');
        if (btn) btn.textContent = '✓ Row #4 Revealed!';
        if (desc) desc.innerHTML = '<strong style="color:' + CFG.theme.safeColor + ';">✓ Row #4 Unblurred &amp; 1-Click Links Sent!</strong> <a href="/buy/micro_pass" style="color:' + CFG.theme.brandPrimary + ';font-weight:700;">Unblur all remaining rows + file for 99¢ →</a>';
      }).catch(function() {});
    return false;
  };

  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function(input, init) {
      var url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
      var isAutoInit = !!(init && init.headers && (init.headers['x-auto-init'] || init.headers['X-Auto-Init']));
      return origFetch.apply(this, arguments).then(function(res) {
        if (url.indexOf('/api/checkout') !== -1) {
          try {
            res.clone().json().then(function(data) {
              var stripeUrl = data && (data.checkout_url || data.checkoutUrl || data.url || (data.order && data.order.checkout_url));
              if (stripeUrl && String(stripeUrl).indexOf('https://checkout.stripe.com') === 0 && !navigator.webdriver) setTimeout(function() { window.location.href = stripeUrl; }, 220);
            }).catch(function(){});
          } catch (_) {}
        }
        if (url.indexOf('/api/audit') !== -1 || url.indexOf('/api/analyze-sponsor') !== -1 || url.indexOf('/api/analyze-routine') !== -1 || url.indexOf('/api/audit-leakage') !== -1) {
          try {
            res.clone().json().then(function(data) {
              var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val'), entityName = '';
              if (CFG.moduleId === 'citation_forge' && data && data.audit) {
                entityName = data.audit.domain || '';
                if (data.audit.scores && boxes.length >= 3) { boxes[0].textContent = data.audit.scores.csovPct + '%'; boxes[1].textContent = data.audit.scores.agentReadabilityScore + '/100'; boxes[2].textContent = data.audit.scores.entityDensityScore + '/100'; }
              } else if (CFG.moduleId === 'sponsor_radar' && data) {
                entityName = (data.brand && data.brand.name) || '';
                if (data.metrics && boxes.length >= 3) { boxes[0].textContent = data.metrics.renewal_velocity_score + '/100'; boxes[1].textContent = '$' + Number(data.metrics.est_monthly_spend_usd || 0).toLocaleString(); boxes[2].textContent = '$' + data.metrics.avg_cpm_usd; }
              } else if (CFG.moduleId === 'derm_logic' && data) {
                entityName = data.compatibilityScore != null ? ('Score ' + data.compatibilityScore + '/100') : '';
                if (boxes.length >= 2 && data.compatibilityScore != null) boxes[0].textContent = data.compatibilityScore + '/100';
              } else if (CFG.moduleId === 'abandon_alpha' && data) {
                entityName = data.storeName || '';
                if (boxes.length >= 3) {
                  if (data.totalRecoverableUsd != null) boxes[0].textContent = '$' + Math.round(data.totalRecoverableUsd).toLocaleString();
                  if (data.exitIntentRecoveredUsd != null) boxes[1].textContent = '$' + Math.round(data.exitIntentRecoveredUsd).toLocaleString();
                  if (data.dunningRecoveredUsd != null) boxes[2].textContent = '$' + Math.round(data.dunningRecoveredUsd).toLocaleString();
                }
              }
              setTimeout(function() { window.__ebMountDeliverableCurtain(entityName); if (!isAutoInit && window.__ebUserInteracted) window.__ebTriggerPostCalcSpotlight(entityName); }, 90);
            }).catch(function(){});
          } catch (_) {}
        }
        return res;
      });
    };
  }

  var fuseTimer = null, sliderTimer = null;
  window.__ebRunFuseSearch = function(query) {
    if (!query || query.trim().length < 2) return;
    if (fuseTimer) clearTimeout(fuseTimer);
    fuseTimer = setTimeout(function() {
      origFetch('/api/github-upgrade/fuse-search?q=' + encodeURIComponent(query.trim())).then(function(r) { return r.json(); }).then(function(data) {
        if (data && data.kpis) { var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val'); for (var i = 0; i < boxes.length && i < data.kpis.length; i++) boxes[i].textContent = data.kpis[i]; }
        var rowTxt = document.getElementById('eb-peek-row-text'); if (rowTxt && data && data.row1_insight) rowTxt.textContent = data.row1_insight;
        window.__ebShowTripwire();
      }).catch(function(){});
    }, 300);
  };

  window.__ebOnSliderInput = function(val) {
    var num = Number(val) || 10, rd = document.getElementById('eb-slider-readout'), boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
    if (rd) rd.textContent = CFG.sliderLabel + ': ' + num;
    if (boxes.length >= 2) {
      if (CFG.moduleId === 'citation_forge') boxes[0].textContent = Math.min(94.8, (22 + num * 0.24)).toFixed(1) + '%';
      else if (CFG.moduleId === 'sponsor_radar') boxes[1].textContent = '$' + (num * 10200).toLocaleString();
      else if (CFG.moduleId === 'derm_logic') { boxes[0].textContent = Math.max(20, 100 - num * 9) + '/100'; boxes[1].textContent = (0.4 + num * 0.35).toFixed(1) + ' pH'; }
      else { boxes[0].textContent = '$' + Math.round(num * 665).toLocaleString(); boxes[1].textContent = '$' + Math.round(num * 575).toLocaleString(); }
    }
    if (sliderTimer) clearTimeout(sliderTimer);
    sliderTimer = setTimeout(function() {
      window.__ebLogEvent('calculate', { source: 'nouislider_range', value: num });
      window.__ebShowTripwire();
    }, 450);
  };

  try {
    var paywallLogged = false;
    if ('IntersectionObserver' in window) {
      var obs = window.__ebPaywallObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !paywallLogged) { paywallLogged = true; window.__ebLogEvent('view_paywall', { target: entry.target.id || 'eb-deliverable-curtain' }); }
        });
      }, { threshold: 0.15 });
      ['in-card-unlock-bar', 'eb-deliverable-curtain', 'eb-pseo-quick-bar', 'eb-postcalc-inline-cta'].forEach(function(id) { var el = document.getElementById(id); if (el) obs.observe(el); });
    }
  } catch (_) {}

  var ouibounceShown = false, maxScrollY = 0, pageEnteredAt = Date.now();
  function showRescueToast(reason) {
    if (ouibounceShown || window.__ebIsUnlocked) return;
    ouibounceShown = true;
    var toast = document.getElementById('eb-ouibounce-toast');
    if (toast) toast.style.display = 'block';
    window.__ebLogEvent('view_paywall', { target: 'sonner_rescue_' + reason });
  }
  document.addEventListener('mouseleave', function(e) { if (e.clientY <= 12) showRescueToast('desktop_exit'); }, { passive: true });
  window.addEventListener('scroll', function() {
    var y = window.scrollY || 0;
    if (y > maxScrollY) maxScrollY = y;
    else if (maxScrollY > 360 && (maxScrollY - y) > 95) showRescueToast('mobile_scroll_up');
    if (y > 280 && (Date.now() - pageEnteredAt) > 12000) showRescueToast('mobile_dwell_scroll');
  }, { passive: true });

  window.__ebToggleCmdk = function() {
    var m = document.getElementById('eb-cmdk-modal');
    if (!m) return;
    m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
    window.__ebLogEvent('tab_switch', { store_pill: 'cmdk_palette' });
  };
  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) { e.preventDefault(); window.__ebToggleCmdk(); }
    else if (e.key === 'Escape') {
      ['eb-cmdk-modal', 'eb-floating-gate-popover'].forEach(function(id) { var el = document.getElementById(id); if (el) el.style.display = 'none'; });
    }
  });

  window.__ebSelectStorePill = function(key) {
    var pills = document.querySelectorAll('.store-preview-pill[data-store]');
    for (var i = 0; i < pills.length; i++) pills[i].classList.toggle('active', pills[i].getAttribute('data-store') === key);
    var drawer = document.getElementById('inline-aisle-peek-drawer'), rowTxt = document.getElementById('eb-peek-row-text');
    if (rowTxt) rowTxt.textContent = CFG.pillMap[key] || ''; else if (drawer) drawer.textContent = CFG.pillMap[key] || '';
    if (drawer) drawer.style.display = 'block';
    window.__ebLogEvent('tab_switch', { store_pill: key });
  };
  window.__ebTogglePeekDrawer = function() { var d = document.getElementById('inline-aisle-peek-drawer'); if (d) d.style.display = d.style.display === 'none' ? 'block' : 'none'; };
  window.__ebShowTripwire = function() { var b = document.getElementById('tripwire-upsell-box'); if (b) b.style.display = 'flex'; };
  window.__ebCopySummary = function() {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(CFG.brandName + ' Executive Summary (' + window.location.href + ')').catch(function(){});
    var btn = document.getElementById('btn-copy-shopping-list'); if (btn) btn.textContent = '✓ Copied!';
    window.__ebShowTripwire(); window.__ebLogEvent('copy_summary');
  };
  window.__ebCopyReddit = function() {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText('**' + CFG.brandName + ' Benchmark** — ' + window.location.href).catch(function(){});
    var btn = document.getElementById('btn-reddit-share'); if (btn) btn.textContent = '✓ Copied MD!';
    window.__ebShowTripwire();
  };
  window.__ebCopyScenarioLink = function(btn) {
    var shareUrl = window.location.origin + window.location.pathname + '?q=' + encodeURIComponent(window.__ebActiveEntity || (CFG.presets && CFG.presets[0] && CFG.presets[0].key) || 'audit');
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(shareUrl).catch(function(){});
    if (btn) btn.textContent = '✓ URL Copied!';
  };
  window.__ebCopyReadmeBadge = function(btn) {
    var t = encodeURIComponent(window.__ebActiveEntity || (CFG.presets && CFG.presets[0] && CFG.presets[0].key) || 'verified');
    var md = '[![Verified by ' + CFG.brandName + '](https://' + CFG.domain + '/badge/' + t + '.svg)](https://' + CFG.domain + '/?q=' + t + '&utm_source=readme_badge)';
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).catch(function(){});
    if (btn) btn.textContent = '✓ Badge MD Copied!';
    window.__ebLogEvent('copy_summary', { type: 'readme_svg_badge', target: t });
  };
  window.__ebPrintSheet = function() { window.__ebLogEvent('print_sheet'); window.print(); };
  window.__ebToggleHud = function() { var d = document.getElementById('eb-field-hud-drawer'); if (d) d.style.display = d.style.display === 'none' ? 'block' : 'none'; };

  window.__ebApplyPreset = function(presetKey, idx) {
    window.__ebLogEvent('calculate', { preset: presetKey });
    var kpiVals = CFG.presetKpis && CFG.presetKpis[presetKey];
    if (kpiVals) {
      var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
      for (var i = 0; i < boxes.length && i < kpiVals.length; i++) boxes[i].textContent = kpiVals[i];
    }
    var drawer = document.getElementById('inline-aisle-peek-drawer');
    if (drawer) drawer.style.display = 'block';
    var nativeBtns = document.querySelectorAll('[data-domain], [data-preset-id], [data-brand], .preset-btn, .chip');
    if (nativeBtns && nativeBtns[idx]) { try { nativeBtns[idx].click(); } catch (_) {} }
  };

  window.__ebTriggerHostCalc = function() {
    var searchIn = document.getElementById('eb-fuse-search-input');
    if (searchIn && searchIn.value.trim().length > 1) { window.__ebRunFuseSearch(searchIn.value); return; }
    window.__ebLogEvent('calculate', { trigger: 'btn_calc' }); window.__ebShowTripwire();
    var hostBtn = document.querySelector('form button[type="submit"], #run-audit-btn, #analyzeBtn, #btn-run-lookup, #audit-form button');
    if (hostBtn) { try { hostBtn.click(); } catch (_) {} }
  };
  window.__ebCheckout = function(tier) {
    var cleanTier = typeof tier === 'string' ? tier : 'flash_pass';
    var payload = { tier: cleanTier, plan: cleanTier, planTier: cleanTier, sku: CFG.moduleId + '_' + cleanTier, pageUrl: window.location.pathname };
    origFetch('/api/calculators/' + CFG.moduleId + '/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }).then(function(r) { return r.json(); }).then(function(data) { var targetUrl = data && (data.checkout_url || data.url); window.location.href = targetUrl || ('/buy/' + encodeURIComponent(cleanTier)); }).catch(function(){ window.location.href = '/buy/' + encodeURIComponent(cleanTier); });
  };
  var __ebBootAll = function() {
    window.__ebMountDeliverableCurtain();
    try { var sp = new URLSearchParams(window.location.search || ''), qp = sp.get('q') || sp.get('preset') || sp.get('domain') || sp.get('brand') || sp.get('active'); if (qp) setTimeout(function() { window.__ebCompileCustomCurtain(qp); }, 110); } catch (_) {}
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', __ebBootAll); else __ebBootAll();
})();
</script>
<script type="text/javascript">
  var vglnk = { key: '${SOVRN_KEY}' };
  (function(d, t) {
    if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') return;
    var s = d.createElement(t); s.type = 'text/javascript'; s.async = true; s.src = '//cdn.viglink.com/api/vglnk.js';
    var r = d.getElementsByTagName(t)[0]; if (r && r.parentNode) r.parentNode.insertBefore(s, r);
  }(document, 'script'));
</script>`;
}
function renderExactBaselineEnhancements(html, cfg, reqPath) {
  let out = enhanceHtmlForSearchAndAiBots(html, cfg, reqPath);
  const styles = buildExactBaselineStyles(cfg), bottomSuite = buildBottomConversionSuiteHtml(cfg, reqPath), clientJs = buildClientRuntimeScript(cfg);
  out = out.includes('</head>') ? out.replace('</head>', () => `${styles}\n</head>`) : styles + out;
  if (/<\/main>/i.test(out)) out = out.replace(/<\/main>/i, (m) => `${bottomSuite}\n${m}`);
  else if (out.includes('</body>')) out = out.replace('</body>', () => `${bottomSuite}\n</body>`);
  else out = `${out}\n${bottomSuite}`;
  return out.includes('</body>') ? out.replace('</body>', () => `${clientJs}\n</body>`) : `${out}\n${clientJs}`;
}
function renderEmbedWidgetHtml(cfg) {
  const t = getTheme(cfg);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${esc(cfg.brandName)} — Embeddable Benchmark Widget</title>${buildExactBaselineStyles(cfg)}</head><body style="margin:0;padding:12px;background:${t.canvasBg};color:${t.textPrimary};">${buildScenarioAndExportWorkbenchHtml(cfg)}<div style="text-align:right;font-size:11px;margin-top:6px;">Powered by <a href="https://${esc(cfg.domain)}" target="_blank" rel="dofollow" style="color:${t.brandPrimary};font-weight:700;">${esc(cfg.brandName)} (${esc(cfg.domain)})</a></div>${buildClientRuntimeScript(cfg)}</body></html>`;
}
function renderSampleDossierHtml(cfg) {
  const t = getTheme(cfg);
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" /><title>${esc(cfg.brandName)} — Executive Sample Dossier & Pass Options</title>${buildExactBaselineStyles(cfg)}</head><body style="margin:0;padding:20px;background:${t.canvasBg};color:${t.textPrimary};font-family:${t.fontSans};"><div style="max-width:960px;margin:0 auto;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;"><a href="/" style="color:${t.textSecondary};text-decoration:none;font-size:13px;">← Back to ${esc(cfg.brandName)}</a><button id="btn-top-pass-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock Single-Audit Pass — $1.99</button></div><h1 class="dossier-hero-title" style="margin:0 0 8px 0;font-family:${t.fontDisplay};">${esc(cfg.brandName)} — Verified Sample Deliverable</h1><div class="hero-tier-diff" style="margin-bottom:14px;font-size:13px;color:${t.textSecondary};">Choose between the <strong>$1.99 Single-Audit Pass</strong> (Instant Export) or the <strong>${esc(cfg.coreLabel)}</strong>.</div></div>${buildBottomConversionSuiteHtml(cfg, '/dossier/sample')}${buildClientRuntimeScript(cfg)}</body></html>`;
}
module.exports = { renderExactBaselineEnhancements, renderEmbedWidgetHtml, renderSampleDossierHtml };

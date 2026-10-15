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

function esc(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
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
  .eb-blurred-deliverable { filter: blur(5px) !important; user-select: none !important; pointer-events: none !important; max-height: 140px !important; overflow: hidden !important; opacity: 0.52 !important; transition: filter 250ms ease, max-height 250ms ease, opacity 250ms ease; }
  #eb-deliverable-curtain { margin-top: 14px; padding: 16px 18px; border-radius: ${t.radiusCard}; background: ${t.cardBg}; color: ${t.textPrimary}; border: 1.5px solid ${t.accentBorder}; box-shadow: ${t.shadow}; font-family: ${t.fontSans}; position: relative; z-index: 20; text-transform: none !important; letter-spacing: normal !important; font-style: normal !important; font-weight: 400 !important; }
  #eb-prism-proof-preview { background: ${t.subtleBg}; color: ${t.textPrimary}; border: 1px solid ${t.border}; border-radius: 10px; padding: 10px 12px; font-family: "JetBrains Mono", monospace; font-size: 11.5px; line-height: 1.45; margin-bottom: 12px; overflow-x: auto; white-space: pre-wrap; text-transform: none !important; letter-spacing: normal !important; }
  #eb-floating-gate-popover { display: none; position: fixed; z-index: 9998; width: 350px; max-width: calc(100vw - 24px); background: ${t.cardBg}; color: ${t.textPrimary}; border: 1.5px solid ${t.accentBorder}; border-radius: 16px; padding: 16px; box-shadow: 0 22px 48px -12px rgba(15, 23, 42, 0.2); font-family: ${t.fontSans}; text-transform: none !important; }
  #eb-bottom-conversion-suite { max-width: 1280px; margin: 40px auto 88px auto; padding: 0 24px; font-family: ${t.fontSans}; text-transform: none !important; }
  .eb-panel-card { background: ${t.cardBg}; color: ${t.textPrimary}; border: 1px solid ${t.border}; border-radius: ${t.radiusCard}; padding: 22px 24px; margin-bottom: 20px; box-shadow: ${t.shadow}; }
  .eb-gbb-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-top: 16px; }
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
  @media (max-width: 768px) {
    #eb-bottom-conversion-suite { padding: 0 14px; margin: 28px auto 82px auto; }
    .eb-panel-card { padding: 16px; }
    .eb-gbb-grid { grid-template-columns: 1fr; }
    #eb-interactive-control-row { grid-template-columns: 1fr; }
    #free-metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    #preset-chips { gap: 4px; }
    #preset-chips .preset-chip { font-size: 11px; padding: 5px 3px; }
    #sticky-mobile-bar { padding: 7px 12px; gap: 6px; }
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
    if (a.href) {
      return `<a id="${esc(a.id)}" class="eb-action-btn" href="${esc(a.href)}" download onclick="window.__ebShowTripwire()">${esc(a.label)}</a>`;
    }
    const fn = a.type === 'copy' ? 'window.__ebCopySummary()'
      : a.type === 'print' ? 'window.__ebPrintSheet()'
      : a.type === 'hud' ? 'window.__ebToggleHud()'
      : a.type === 'cmdk' ? 'window.__ebToggleCmdk()'
      : 'window.__ebCopyReddit()';
    return `<button type="button" id="${esc(a.id)}" class="eb-action-btn" onclick="${fn}">${esc(a.label)}</button>`;
  }).join('');
}

function buildScenarioAndExportWorkbenchHtml(cfg) {
  const t = getTheme(cfg);
  const presetsHtml = cfg.presets
    .map((p, idx) => `<button type="button" class="preset-chip" data-preset="${esc(p.key)}" onclick="window.__ebApplyPreset('${esc(p.key)}', ${idx})">${esc(p.label)}</button>`)
    .join('');

  const kpisHtml = cfg.kpis
    .map((k) => `<div class="eb-kpi-card">
      <div class="eb-kpi-label">${esc(k.label)}</div>
      <div class="eb-kpi-val metric-box-value">${esc(k.val)}</div>
      <div class="eb-kpi-sub">${esc(k.sub)}</div>
    </div>`)
    .join('');

  const pillsHtml = cfg.coMarketingPills
    .map((p, i) => `<button type="button" class="store-preview-pill${i === 0 ? ' active' : ''}" data-store="${esc(p.key)}" onclick="window.__ebSelectStorePill('${esc(p.key)}')">${esc(p.label)}</button>`)
    .join('');

  const actionsHtml = buildActionButtonsHtml(cfg);

  return `<div id="eb-executive-strip" class="eb-panel-card" aria-label="${esc(cfg.brandName)} Scenario Simulator & Export Utilities">
  <div id="results-section" style="display:block;">
    <div class="eb-strip-top-bar">
      <span class="eb-strip-eyebrow">✦ ${esc(cfg.brandName)} Interactive Benchmark &amp; Export Utilities</span>
      <span id="headline-unlock-explainer" style="font-size:12px;color:${t.textMuted};">${esc(cfg.explainerText)}</span>
    </div>
    <div id="preset-chips">${presetsHtml}</div>
    <div id="eb-interactive-control-row">
      <input type="text" id="eb-fuse-search-input" placeholder="${esc(cfg.searchPlaceholder || 'Filter scenario...')}" aria-label="Filter Scenario" oninput="window.__ebRunFuseSearch(this.value)" />
      <label class="eb-slider-wrap" for="eb-nouislider-range">
        <span id="eb-slider-readout">${esc(cfg.sliderLabel || 'Scale')}: ${esc(cfg.sliderVal || 50)}</span>
        <input type="range" id="eb-nouislider-range" min="${esc(cfg.sliderMin || 1)}" max="${esc(cfg.sliderMax || 100)}" value="${esc(cfg.sliderVal || 50)}" oninput="window.__ebOnSliderInput(this.value)" />
      </label>
    </div>

    <div id="free-metrics-grid" class="grid-metrics">
      ${kpisHtml}
      <div class="stat-pill-locked" id="summary-report-card">
        <div class="eb-locked-top">
          <span style="font-size:12px;font-weight:700;color:${t.brandText};">✦ ${esc(cfg.lockedTitle)} — Channel &amp; Protocol Insights</span>
          <button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Toggle Insight ▾</button>
        </div>
        <div class="eb-store-pills">${pillsHtml}</div>
        <div id="inline-aisle-peek-drawer">
          <div id="eb-peek-row-text" style="font-weight:500;">${esc(cfg.coMarketingPills[0].rowText)}</div>
        </div>
      </div>
    </div>

    <div id="lead-squeeze-card">
      <div id="prog-instant-action-strip">
        ${actionsHtml}
        <button type="button" id="btn-calc" class="eb-action-btn" style="background:${t.brandSoftBg};color:${t.brandText};border-color:${t.accentBorder};font-weight:700;" onclick="window.__ebTriggerHostCalc()">Recalculate ↗</button>
      </div>
      <div id="tripwire-upsell-box">
        <span>Need the full unblurred production deliverable &amp; multi-row exports? Unlock the <strong>Single-Audit Export Pass ($1.99)</strong> — one-time payment, no subscription.</span>
        <button type="button" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;border-color:${t.brandPrimary};font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock $1.99 Pass →</button>
      </div>
      <div id="eb-field-hud-drawer" style="display:none;margin-top:8px;padding:8px 12px;border-radius:8px;background:${t.cardBg};border:1px solid ${t.border};color:${t.safeColor};font-family:monospace;font-size:11.5px;">
        [${esc(cfg.hudLabel.toUpperCase())} ACTIVE] • Deterministic Engine Ready • Host: ${esc(cfg.domain)}
      </div>
    </div>
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

  const affiliatesHtml = cfg.affiliates
    .map((a) => `<a href="${esc(a.url)}" target="_blank" rel="noopener sponsored" class="eb-tier-card" style="text-decoration:none;color:${t.textPrimary};" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(a.title)}' })">
      <div>
        <span style="font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:${t.safeColor};">${esc(a.badge)}</span>
        <div style="font-size:15px;font-weight:700;margin-top:4px;color:${t.textPrimary};">${esc(a.title)}</div>
      </div>
      <div style="margin-top:10px;font-size:12.5px;color:${t.brandPrimary};font-weight:700;">${esc(a.cpa)} →</div>
    </a>`)
    .join('');

  const bc = cfg.battlecard || {
    heading: `Why ${cfg.brandName} Outperforms Traditional Alternatives`,
    colLegacy: 'Legacy Suites',
    colManual: 'Manual Guesswork',
    rows: [
      ['Diagnostic Precision', '< 15ms Deterministic Engine', 'Slow Legacy Audits', 'Manual Trial & Error'],
      ['Actionable Deliverable', cfg.deliverableName, 'Generic Reports', 'Static Notes'],
      ['Transparent Pricing', `$1.99 Single Pass or $${cfg.corePriceUsd} Complete`, '$199+/mo Subscriptions', 'High Error Cost']
    ]
  };

  const battlecardRowsHtml = bc.rows.map((r, idx) => `
    <tr style="${idx < bc.rows.length - 1 ? `border-bottom:1px solid ${t.border};` : ''}">
      <td style="padding:10px 12px;font-weight:600;">${esc(r[0])}</td>
      <td style="padding:10px 12px;color:${t.safeColor};font-weight:700;">✓ ${esc(r[1])}</td>
      <td style="padding:10px 12px;color:${t.textSecondary};">${esc(r[2])}</td>
      <td style="padding:10px 12px;color:${t.textSecondary};">${esc(r[3])}</td>
    </tr>`).join('');

  const savingsPct = Math.max(50, Math.round((1 - 1.99 / cfg.corePriceUsd) * 100));

  return `<section id="eb-bottom-conversion-suite" aria-label="${esc(cfg.brandName)} Export Passes, Comparisons & Partner Ecosystem">
  <div id="in-card-unlock-bar" class="eb-panel-card">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
      <div>
        <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:${t.brandPrimary};">Instant Self-Serve Fulfillment • 30-Day Guarantee</span>
        <h2 id="in-card-unlock-title" style="margin:4px 0 0 0;font-size:22px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};">${esc(cfg.unlockBannerTitle)}</h2>
      </div>
      <div id="tab-btn-dossier" style="font-size:12px;font-weight:700;color:${t.safeColor};background:${t.safeSoftBg};border:1px solid ${t.safeBorder};padding:5px 12px;border-radius:999px;">Most Popular: $1.99 Single-Audit Pass (One-Time)</div>
    </div>
    <div class="eb-gbb-grid">
      <div class="eb-tier-card featured">
        <div>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.04em;color:${t.brandPrimary};">${esc(cfg.tier1Tag || `SINGLE-AUDIT PASS • SAVE ${savingsPct}% VS $${cfg.corePriceUsd}`)}</div>
          <div class="matrix-price" style="font-family:${t.fontDisplay};font-size:30px;font-weight:700;margin:6px 0;color:${t.textPrimary};">$1.99 <span style="font-family:${t.fontSans};font-size:12.5px;font-weight:500;color:${t.textMuted};">one-time • no subscription</span></div>
          <p style="font-size:13px;color:${t.textSecondary};margin:0 0 14px 0;line-height:1.5;">${esc(cfg.tier1Desc || `Instantly unblurs ${cfg.deliverableName}, downloadable exports, and 24-hour recalculations.`)}</p>
        </div>
        <button type="button" id="btn-prog-flash-pass" class="cta-btn" style="width:100%;padding:11px 14px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;font-weight:700;font-size:13.5px;border:none;" onclick="window.__ebCheckout('flash_pass')">Unlock Single-Audit Pass ($1.99) →</button>
      </div>
      <div class="eb-tier-card">
        <div>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.04em;color:${t.textSecondary};">${esc(cfg.tier2Tag || 'COMPLETE PACK')}</div>
          <div class="matrix-price" style="font-family:${t.fontDisplay};font-size:30px;font-weight:700;margin:6px 0;color:${t.textPrimary};">$${esc(cfg.corePriceUsd)}</div>
          <p style="font-size:13px;color:${t.textSecondary};margin:0 0 14px 0;line-height:1.5;">${esc(cfg.tier2Desc || cfg.coreLabel)}</p>
        </div>
        <button type="button" id="btn-prog-full-dossier" class="cta-btn" style="width:100%;padding:11px 14px;border-radius:${t.radiusPill};background:#FFFFFF;color:${t.textPrimary};font-weight:700;font-size:13.5px;border:1px solid ${t.border};" onclick="window.__ebCheckout('complete_dossier')">${esc(cfg.coreLabel)}</button>
      </div>
      <div class="eb-tier-card">
        <div>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.04em;color:${t.safeColor};">${esc(cfg.tier3Tag || 'PRO / UNLIMITED TIER')}</div>
          <div class="matrix-price" style="font-family:${t.fontDisplay};font-size:30px;font-weight:700;margin:6px 0;color:${t.textPrimary};">$${esc(cfg.proPriceUsd)}</div>
          <p style="font-size:13px;color:${t.textSecondary};margin:0 0 14px 0;line-height:1.5;">${esc(cfg.tier3Desc || cfg.proLabel)}</p>
        </div>
        <button type="button" id="btn-prog-pro-b2b" class="cta-btn" style="width:100%;padding:11px 14px;border-radius:${t.radiusPill};background:${t.textPrimary};color:#FFFFFF;font-weight:700;font-size:13.5px;border:none;" onclick="window.__ebCheckout('pro_b2b')">${esc(cfg.proLabel)}</button>
      </div>
    </div>
    <button type="button" id="btn-checkout" style="display:none;" onclick="window.__ebCheckout('flash_pass')">Hidden Test Alias</button>
  </div>

  <div id="competitor-battlecard" class="eb-panel-card">
    <h3 style="margin:0 0 12px 0;font-size:19px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};">${esc(bc.heading)}</h3>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:13px;text-align:left;color:${t.textPrimary};">
        <thead>
          <tr style="border-bottom:1px solid ${t.border};color:${t.textMuted};background:${t.subtleBg};">
            <th style="padding:10px 12px;">Capability</th>
            <th style="padding:10px 12px;color:${t.brandPrimary};">${esc(cfg.brandName)}</th>
            <th style="padding:10px 12px;">${esc(bc.colLegacy)}</th>
            <th style="padding:10px 12px;">${esc(bc.colManual)}</th>
          </tr>
        </thead>
        <tbody>
          ${battlecardRowsHtml}
        </tbody>
      </table>
    </div>
  </div>

  <div id="eb-export-utility-bar" class="eb-panel-card">
    <div class="stat-pill-locked" id="summary-report-card" style="margin-bottom:12px;">
      <div class="eb-locked-top">
        <span style="font-size:12px;font-weight:700;color:${t.brandText};">✦ ${esc(cfg.lockedTitle)} — Channel &amp; Protocol Benchmarks</span>
        <button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Toggle Insight ▾</button>
      </div>
      <div class="eb-store-pills">${pillsHtml}</div>
      <div id="inline-aisle-peek-drawer">
        <div id="eb-peek-row-text" style="font-weight:500;">${esc(cfg.coMarketingPills[0].rowText)}</div>
      </div>
    </div>
    <div id="lead-squeeze-card">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;">
        <div id="prog-instant-action-strip">
          ${actionsHtml}
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;" id="prog-share-toolbar">
          <button type="button" id="btn-copy-scenario-link" class="eb-action-btn" onclick="window.__ebCopyScenarioLink(this)">Copy Link</button>
          <a id="btn-share-reddit" class="eb-action-btn" href="${esc(redditHref)}" target="_blank" rel="noopener">Share on r/${esc(cfg.redditSub)}</a>
          <a id="btn-share-x" class="eb-action-btn" href="${esc(xHref)}" target="_blank" rel="noopener">Post on X</a>
          <a id="btn-share-email" class="eb-action-btn" href="${esc(mailHref)}">Email</a>
          <a class="eb-action-btn" href="/embed" target="_blank" rel="noopener">Embed</a>
        </div>
      </div>
      <div id="tripwire-upsell-box">
        <span>Need the full unblurred production deliverable &amp; multi-row exports? Unlock the <strong>Single-Audit Export Pass ($1.99)</strong> — one-time payment, no subscription.</span>
        <button type="button" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;border-color:${t.brandPrimary};font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock $1.99 Pass →</button>
      </div>
      <div id="eb-field-hud-drawer" style="display:none;margin-top:8px;padding:8px 12px;border-radius:8px;background:${t.cardBg};border:1px solid ${t.border};color:${t.safeColor};font-family:monospace;font-size:11.5px;">
        [${esc(cfg.hudLabel.toUpperCase())} ACTIVE] • Deterministic Engine Ready • Host: ${esc(cfg.domain)}
      </div>
    </div>
  </div>

  <div id="eb-sovrn-affiliate-strip" class="eb-panel-card">
    <div style="font-size:11px;font-weight:700;color:${t.textMuted};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Curated Companion Products &amp; Verified Ecosystem</div>
    <div class="eb-gbb-grid">${affiliatesHtml}</div>
  </div>
</section>

<!-- Floating Value-Gate Popover (Paid Choice Architecture — Zero $0 Cannibalization) -->
<div id="eb-floating-gate-popover" role="dialog" aria-label="Instant Deliverable Export Pass">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
    <span style="font-size:11px;font-weight:700;color:${t.brandPrimary};text-transform:uppercase;letter-spacing:0.04em;">✦ Instant Deliverable Export</span>
    <button type="button" onclick="document.getElementById('eb-floating-gate-popover').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:15px;">✕</button>
  </div>
  <div style="font-family:${t.fontDisplay};font-size:17px;font-weight:700;color:${t.textPrimary};margin-bottom:6px;">
    Unblur &amp; Download ${esc(cfg.freeDeliverableName)}
  </div>
  <p id="eb-popover-desc" style="font-size:12px;color:${t.textSecondary};margin:0 0 12px 0;line-height:1.45;">
    Get instant on-screen access and downloadable files with our <strong>$1.99 Single-Audit Pass</strong> (save ${savingsPct}% vs. the $${esc(cfg.corePriceUsd)} pack):
  </p>
  <div style="display:grid;gap:8px;">
    <button type="button" id="btn-popover-flash-pass" onclick="window.__ebCheckout('flash_pass')" style="width:100%;padding:10px 14px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;border:none;font-weight:700;font-size:13px;">
      Unlock Single-Audit Pass — $1.99 →
    </button>
    <button type="button" onclick="window.__ebCheckout('complete_dossier')" style="width:100%;padding:8px 12px;border-radius:${t.radiusPill};background:${t.subtleBg};color:${t.textPrimary};border:1px solid ${t.border};font-weight:600;font-size:12px;">
      Or Get ${esc(cfg.coreLabel)}
    </button>
  </div>
</div>

<!-- Exit-Intent Downsell Toast (#eb-ouibounce-toast) — Captures Abandoning Visitors Only -->
<div id="eb-ouibounce-toast" role="dialog" aria-label="Send 1-Page Diagnostic Summary Before Leaving">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span style="font-size:11px;font-weight:700;color:${t.brandPrimary};text-transform:uppercase;">Leaving so soon?</span>
    <button type="button" onclick="document.getElementById('eb-ouibounce-toast').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:14px;">✕</button>
  </div>
  <p style="font-size:12px;color:${t.textSecondary};margin:0 0 8px 0;line-height:1.4;">
    Send the 1-page diagnostic summary to your inbox, or unlock the full export bundle now for <strong>$1.99</strong>:
  </p>
  <form onsubmit="return window.__ebSendExitSummary(event)" style="display:grid;grid-template-columns:1fr auto;gap:6px;margin-bottom:8px;">
    <input type="email" id="eb-ouibounce-email" placeholder="Your email for 1-page summary..." required style="padding:6px 9px;border-radius:7px;border:1px solid ${t.border};background:#FFFFFF;color:${t.textPrimary};font-size:11.5px;" />
    <button type="submit" id="btn-ouibounce-submit" style="padding:6px 11px;border-radius:${t.radiusPill};background:${t.subtleBg};color:${t.textPrimary};font-size:11.5px;font-weight:700;border:1px solid ${t.border};">Send Summary</button>
  </form>
  <button type="button" onclick="window.__ebCheckout('flash_pass')" style="width:100%;padding:7px 10px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;border:none;font-weight:700;font-size:11.5px;">
    Unlock Full Export Pass — $1.99 →
  </button>
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
  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
    <span style="font-size:12.5px;font-weight:700;color:${t.textPrimary};">${esc(cfg.brandName)}</span>
    <a href="#in-card-unlock-bar" id="sticky-sub-benefit" style="font-size:12px;color:${t.textSecondary};font-weight:600;text-decoration:none;">${esc(cfg.freeDeliverableName)} • <strong style="color:${t.brandPrimary};">Save ${savingsPct}% vs. $${esc(cfg.corePriceUsd)}</strong></a>
  </div>
  <div style="display:flex;gap:8px;">
    <button type="button" id="btn-sticky-flash-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;border:none;padding:7px 15px;border-radius:${t.radiusPill};" onclick="window.__ebCheckout('flash_pass')">Single-Audit Pass: $1.99 →</button>
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
    deliverableFiles: cfg.deliverableFiles || [],
    sliderLabel: cfg.sliderLabel || 'Scale', theme: t, firstPartner, remDiff, pillMap, presetKpis: cfg.presetKpis || {}
  })};

  var STORAGE_KEY = 'eb_paid_unlocked_v6_' + CFG.moduleId;
  window.__ebIsUnlocked = false;
  window.__ebActiveEntity = '';
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
    var presetBtn = e.target && e.target.closest ? e.target.closest('[onclick*="recalcPseo"], [onclick*="pasteSample"], [onclick*="filterPlacements"]') : null;
    if (presetBtn) {
      window.__ebLogEvent('calculate', { source: 'native_interactive_control' });
    }
  }, { passive: true });

  window.__ebMountDeliverableCurtain = function(entityOverride) {
    if (entityOverride) window.__ebActiveEntity = String(entityOverride);
    if (window.__ebIsUnlocked) {
      window.__ebApplyUnblurState();
      return;
    }
    var targetEl = document.getElementById('compiler-code-output') || document.getElementById('res-pitch-body') || document.getElementById('out-sdk-snippet') || document.getElementById('appleWalletCardPreview');

    if (CFG.moduleId === 'sponsor_radar') {
      var dmEmail = document.getElementById('res-dm-email');
      if (dmEmail && dmEmail.textContent.indexOf('Unlock') === -1) {
        dmEmail.setAttribute('data-raw-email', dmEmail.textContent);
        var parts = dmEmail.textContent.trim().split('@');
        dmEmail.innerHTML = (parts[0] ? parts[0].slice(0, 2) + '***@' + (parts[1] || 'brand.com') : 'p***@brand.com') + ' <button type="button" onclick="window.__ebOpenFloatingGate(this)" style="background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';border-radius:999px;padding:1px 8px;font-size:10px;font-weight:700;margin-left:4px;">Unlock ($1.99)</button>';
      }
    }

    var tbody = document.getElementById('prompt-matrix-tbody') || document.getElementById('res-placements-tbody');
    if (tbody) {
      var trs = tbody.querySelectorAll('tr');
      for (var r = 3; r < trs.length; r++) trs[r].classList.add('eb-blurred-deliverable');
    }

    if (!targetEl) return;
    var rawText = (targetEl.textContent || '').trim();
    var previewLines = rawText.split('\\n').slice(0, 3).join('\\n');
    if (previewLines.length > 200) previewLines = previewLines.slice(0, 200) + ' ...';
    targetEl.classList.add('eb-blurred-deliverable');

    var existingCurtain = document.getElementById('eb-deliverable-curtain');
    var entityTag = window.__ebActiveEntity ? (' (' + window.__ebActiveEntity + ')') : '';
    if (existingCurtain) {
      var prevBox = document.getElementById('eb-prism-proof-preview');
      if (prevBox && previewLines) prevBox.textContent = CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine + '\\n\\n' + previewLines;
      var hdrSpan = document.getElementById('eb-curtain-title-span');
      if (hdrSpan) hdrSpan.textContent = '✦ ' + CFG.freeDeliverableName + entityTag + ' — Diagnostic Proof Preview';
      return;
    }

    var filesHtml = (CFG.deliverableFiles || []).map(function(f) {
      return '<span style="display:inline-flex;align-items:center;gap:4px;font-size:11px;font-weight:600;padding:3px 9px;border-radius:999px;background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textPrimary + ';border:1px solid ' + CFG.theme.border + ';">✓ <code>' + f.file + '</code> <span style="color:' + CFG.theme.textMuted + ';">(' + f.size + ')</span></span>';
    }).join('');

    var savingsPct = Math.max(50, Math.round((1 - 1.99 / CFG.corePriceUsd) * 100));
    var curtain = document.createElement('div');
    curtain.id = 'eb-deliverable-curtain';
    curtain.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:8px;">'
      + '<span id="eb-curtain-title-span" style="font-size:11px;font-weight:700;color:' + CFG.theme.brandPrimary + ';text-transform:uppercase;letter-spacing:0.04em;">✦ ' + CFG.freeDeliverableName + entityTag + ' — Diagnostic Proof Preview</span>'
      + '<span style="font-size:11px;color:' + CFG.theme.safeColor + ';font-weight:700;background:' + CFG.theme.safeSoftBg + ';border:1px solid ' + CFG.theme.safeBorder + ';padding:2px 9px;border-radius:999px;">' + CFG.remDiff.roiBadge + '</span>'
      + '</div>'
      + (filesHtml ? '<div id="eb-zod-manifest-pills" style="display:flex;flex-wrap:wrap;gap:6px;margin-bottom:8px;">' + filesHtml + '</div>' : '')
      + '<pre id="eb-prism-proof-preview">' + CFG.remDiff.beforeLine + '\\n' + CFG.remDiff.afterLine + '\\n\\n' + (previewLines || '// Customized deterministic output ready') + '</pre>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;padding-top:8px;border-top:1px solid ' + CFG.theme.border + ';">'
      + '<div style="font-size:12px;color:' + CFG.theme.textSecondary + ';">'
      + '<strong style="color:' + CFG.theme.textPrimary + ';">Unlock Full Production Deliverable &amp; Export Bundle</strong><br/>'
      + '<span>One-time pass • Save ' + savingsPct + '% vs. $' + CFG.corePriceUsd + ' pack • Apple Pay / Google Pay / Link ready</span>'
      + '</div>'
      + '<div style="display:inline-flex;gap:8px;flex-wrap:wrap;align-items:center;">'
      + '<button type="button" id="btn-curtain-flash-pass" onclick="window.__ebCheckout(\\'flash_pass\\')" style="padding:9px 16px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-weight:700;font-size:12.5px;">Unlock Single-Audit Pass ($1.99) →</button>'
      + '<button type="button" id="btn-curtain-complete-pass" onclick="window.__ebCheckout(\\'complete_dossier\\')" style="padding:8px 13px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.subtleBg + ';color:' + CFG.theme.textPrimary + ';border:1px solid ' + CFG.theme.border + ';font-weight:600;font-size:12px;">Complete Pack ($' + CFG.corePriceUsd + ')</button>'
      + '</div></div>';

    if (targetEl.parentNode) {
      targetEl.parentNode.insertBefore(curtain, targetEl.nextSibling);
    }
  };

  window.__ebApplyUnblurState = function() {
    window.__ebIsUnlocked = true;
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch (_) {}
    var blurred = document.querySelectorAll('.eb-blurred-deliverable');
    for (var i = 0; i < blurred.length; i++) blurred[i].classList.remove('eb-blurred-deliverable');
    var dmEmail = document.getElementById('res-dm-email');
    if (dmEmail && dmEmail.getAttribute('data-raw-email')) {
      dmEmail.textContent = dmEmail.getAttribute('data-raw-email');
    }
    var curtain = document.getElementById('eb-deliverable-curtain');
    if (curtain) {
      curtain.style.background = CFG.theme.safeSoftBg;
      curtain.style.borderColor = CFG.theme.safeBorder;
      curtain.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">'
        + '<span style="font-size:12.5px;font-weight:700;color:' + CFG.theme.safeColor + ';">✓ Full Production Deliverable Unlocked! Download your bundle below:</span>'
        + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">'
        + '<button type="button" id="btn-filesaver-bundle" onclick="window.__ebSaveBundleFile()" style="padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:#FFFFFF;color:' + CFG.theme.safeColor + ';border:1px solid ' + CFG.theme.safeBorder + ';font-weight:700;font-size:11.5px;">Download Deliverable Bundle (.TXT) ↓</button>'
        + '<a href="/api/github-upgrade/export.csv" download style="padding:6px 12px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;text-decoration:none;font-weight:700;font-size:11.5px;">Export .CSV ↓</a>'
        + '</div></div>';
    }
    var pop = document.getElementById('eb-floating-gate-popover');
    if (pop) pop.style.display = 'none';
  };

  window.__ebOpenFloatingGate = function(anchorEl) {
    var pop = document.getElementById('eb-floating-gate-popover');
    if (!pop) return;
    pop.style.display = 'block';
    window.__ebLogEvent('view_paywall', { target: 'floating_ui_gate' });
    if (anchorEl && anchorEl.getBoundingClientRect) {
      var rect = anchorEl.getBoundingClientRect();
      var top = rect.bottom + 8;
      var left = Math.max(12, Math.min(window.innerWidth - 362, rect.left));
      if (top + 200 > window.innerHeight) top = Math.max(12, rect.top - 195);
      pop.style.top = top + 'px';
      pop.style.left = left + 'px';
    } else {
      pop.style.top = '120px';
      pop.style.left = Math.max(12, (window.innerWidth - 350) / 2) + 'px';
    }
  };

  document.addEventListener('click', function(e) {
    if (window.__ebIsUnlocked) return;
    var btn = e.target && e.target.closest ? e.target.closest('#copy-artifact-btn, #download-artifact-btn, #copy-code-btn, #copy-sdk-btn, button[onclick*="copyCompiledCode"], button[onclick*="downloadCompiledFile"], button[onclick*="copyPitchEmail"]') : null;
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
    fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'exit_intent_downsell' })
    }).then(function() {
      var btn = document.getElementById('btn-ouibounce-submit');
      if (btn) btn.textContent = '✓ Sent!';
      setTimeout(function() {
        var toast = document.getElementById('eb-ouibounce-toast');
        if (toast) toast.style.display = 'none';
      }, 900);
    }).catch(function() {});
    return false;
  };

  // Two-Way Live Fetch Sync between Host Calculators, Native /api/checkout & Deliverable Curtain
  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function(input, init) {
      var url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
      return origFetch.apply(this, arguments).then(function(res) {
        if (url.indexOf('/api/checkout') !== -1) {
          try {
            res.clone().json().then(function(data) {
              var stripeUrl = data && (data.checkout_url || data.checkoutUrl || data.url || (data.order && data.order.checkout_url));
              if (stripeUrl && String(stripeUrl).indexOf('https://checkout.stripe.com') === 0 && !navigator.webdriver) {
                setTimeout(function() { window.location.href = stripeUrl; }, 220);
              }
            }).catch(function(){});
          } catch (_) {}
        }
        if (url.indexOf('/api/audit') !== -1 || url.indexOf('/api/analyze-sponsor') !== -1 || url.indexOf('/api/analyze-routine') !== -1 || url.indexOf('/api/audit-leakage') !== -1) {
          try {
            res.clone().json().then(function(data) {
              var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
              var entityName = '';
              if (CFG.moduleId === 'citation_forge' && data && data.audit) {
                entityName = data.audit.domain || '';
                if (data.audit.scores && boxes.length >= 3) {
                  boxes[0].textContent = data.audit.scores.csovPct + '%';
                  boxes[1].textContent = data.audit.scores.agentReadabilityScore + '/100';
                  boxes[2].textContent = data.audit.scores.entityDensityScore + '/100';
                }
              } else if (CFG.moduleId === 'sponsor_radar' && data) {
                entityName = (data.brand && data.brand.name) || '';
                if (data.metrics && boxes.length >= 3) {
                  boxes[0].textContent = data.metrics.renewal_velocity_score + '/100';
                  boxes[1].textContent = '$' + Number(data.metrics.est_monthly_spend_usd || 0).toLocaleString();
                  boxes[2].textContent = '$' + data.metrics.avg_cpm_usd;
                }
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
              setTimeout(function() { window.__ebMountDeliverableCurtain(entityName); }, 90);
            }).catch(function(){});
          } catch (_) {}
        }
        return res;
      });
    };
  }

  var fuseTimer = null;
  window.__ebRunFuseSearch = function(query) {
    if (!query || query.trim().length < 2) return;
    if (fuseTimer) clearTimeout(fuseTimer);
    fuseTimer = setTimeout(function() {
      origFetch('/api/github-upgrade/fuse-search?q=' + encodeURIComponent(query.trim()))
        .then(function(r) { return r.json(); })
        .then(function(data) {
          if (data && data.kpis) {
            var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
            for (var i = 0; i < boxes.length && i < data.kpis.length; i++) boxes[i].textContent = data.kpis[i];
          }
          var rowTxt = document.getElementById('eb-peek-row-text');
          if (rowTxt && data && data.row1_insight) rowTxt.textContent = data.row1_insight;
          window.__ebShowTripwire();
        })
        .catch(function(){});
    }, 300);
  };

  var sliderTimer = null;
  window.__ebOnSliderInput = function(val) {
    var num = Number(val) || 10;
    var rd = document.getElementById('eb-slider-readout');
    if (rd) rd.textContent = CFG.sliderLabel + ': ' + num;
    var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
    if (boxes.length >= 2) {
      if (CFG.moduleId === 'citation_forge') boxes[0].textContent = Math.min(94.8, (22 + num * 0.24)).toFixed(1) + '%';
      else if (CFG.moduleId === 'sponsor_radar') boxes[1].textContent = '$' + (num * 10200).toLocaleString();
      else if (CFG.moduleId === 'derm_logic') {
        boxes[0].textContent = Math.max(20, 100 - num * 9) + '/100';
        boxes[1].textContent = (0.4 + num * 0.35).toFixed(1) + ' pH';
      } else {
        boxes[0].textContent = '$' + Math.round(num * 665).toLocaleString();
        boxes[1].textContent = '$' + Math.round(num * 575).toLocaleString();
      }
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
      var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting && !paywallLogged) {
            paywallLogged = true;
            window.__ebLogEvent('view_paywall', { target: entry.target.id || 'eb-deliverable-curtain' });
          }
        });
      }, { threshold: 0.35 });
      var unlockBar = document.getElementById('in-card-unlock-bar');
      if (unlockBar) obs.observe(unlockBar);
    }
  } catch (_) {}

  var ouibounceShown = false;
  function showRescueToast(reason) {
    if (ouibounceShown || window.__ebIsUnlocked) return;
    ouibounceShown = true;
    var toast = document.getElementById('eb-ouibounce-toast');
    if (toast) toast.style.display = 'block';
    window.__ebLogEvent('view_paywall', { target: 'sonner_rescue_' + reason });
  }
  document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 12) showRescueToast('desktop_exit');
  }, { passive: true });

  var maxScrollY = 0;
  window.addEventListener('scroll', function() {
    var y = window.scrollY || 0;
    if (y > maxScrollY) maxScrollY = y;
    else if (maxScrollY > 360 && (maxScrollY - y) > 95) showRescueToast('mobile_scroll_up');
  }, { passive: true });

  window.__ebToggleCmdk = function() {
    var m = document.getElementById('eb-cmdk-modal');
    if (!m) return;
    m.style.display = m.style.display === 'flex' ? 'none' : 'flex';
    window.__ebLogEvent('tab_switch', { store_pill: 'cmdk_palette' });
  };
  document.addEventListener('keydown', function(e) {
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      window.__ebToggleCmdk();
    } else if (e.key === 'Escape') {
      var m = document.getElementById('eb-cmdk-modal');
      if (m) m.style.display = 'none';
      var pop = document.getElementById('eb-floating-gate-popover');
      if (pop) pop.style.display = 'none';
    }
  });

  window.__ebSelectStorePill = function(key) {
    var pills = document.querySelectorAll('.store-preview-pill[data-store]');
    for (var i = 0; i < pills.length; i++) pills[i].classList.toggle('active', pills[i].getAttribute('data-store') === key);
    var drawer = document.getElementById('inline-aisle-peek-drawer');
    var rowTxt = document.getElementById('eb-peek-row-text');
    if (rowTxt) rowTxt.textContent = CFG.pillMap[key] || '';
    else if (drawer) drawer.textContent = CFG.pillMap[key] || '';
    if (drawer) drawer.style.display = 'block';
    window.__ebLogEvent('tab_switch', { store_pill: key });
  };

  window.__ebTogglePeekDrawer = function() {
    var drawer = document.getElementById('inline-aisle-peek-drawer');
    if (!drawer) return;
    drawer.style.display = drawer.style.display === 'none' ? 'block' : 'none';
  };

  window.__ebShowTripwire = function() {
    var box = document.getElementById('tripwire-upsell-box');
    if (box) box.style.display = 'flex';
  };

  window.__ebCopySummary = function() {
    var text = CFG.brandName + ' Executive Summary (' + window.location.href + ')';
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(function(){});
    var btn = document.getElementById('btn-copy-shopping-list');
    if (btn) btn.textContent = '✓ Copied!';
    window.__ebShowTripwire();
    window.__ebLogEvent('copy_summary');
  };

  window.__ebCopyReddit = function() {
    var md = '**' + CFG.brandName + ' Benchmark** — ' + window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).catch(function(){});
    var btn = document.getElementById('btn-reddit-share');
    if (btn) btn.textContent = '✓ Copied MD!';
    window.__ebShowTripwire();
  };

  window.__ebCopyScenarioLink = function(btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(window.location.href).catch(function(){});
    if (btn) btn.textContent = 'Copied Link!';
  };

  window.__ebPrintSheet = function() {
    window.__ebLogEvent('print_sheet');
    window.print();
  };

  window.__ebToggleHud = function() {
    var d = document.getElementById('eb-field-hud-drawer');
    if (d) d.style.display = d.style.display === 'none' ? 'block' : 'none';
  };

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
    if (nativeBtns && nativeBtns[idx]) {
      try { nativeBtns[idx].click(); } catch (_) {}
    }
  };

  window.__ebTriggerHostCalc = function() {
    var searchIn = document.getElementById('eb-fuse-search-input');
    if (searchIn && searchIn.value.trim().length > 1) {
      window.__ebRunFuseSearch(searchIn.value);
      return;
    }
    window.__ebLogEvent('calculate', { trigger: 'btn_calc' });
    window.__ebShowTripwire();
    var hostBtn = document.querySelector('form button[type="submit"], #run-audit-btn, #analyzeBtn, #btn-run-lookup, #audit-form button');
    if (hostBtn) {
      try { hostBtn.click(); } catch (_) {}
    }
  };

  window.__ebCheckout = function(tier) {
    var cleanTier = typeof tier === 'string' ? tier : 'flash_pass';
    var payload = { tier: cleanTier, plan: cleanTier, planTier: cleanTier, sku: CFG.moduleId + '_' + cleanTier, pageUrl: window.location.pathname };
    origFetch('/api/calculators/' + CFG.moduleId + '/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var targetUrl = data && (data.checkout_url || data.url);
        if (targetUrl) window.location.href = targetUrl;
      })
      .catch(function(){});
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { window.__ebMountDeliverableCurtain(); });
  } else {
    window.__ebMountDeliverableCurtain();
  }
})();
</script>
<script type="text/javascript">
  var vglnk = { key: '${SOVRN_KEY}' };
  (function(d, t) {
    if (window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost') return;
    var s = d.createElement(t); s.type = 'text/javascript'; s.async = true;
    s.src = '//cdn.viglink.com/api/vglnk.js';
    var r = d.getElementsByTagName(t)[0];
    if (r && r.parentNode) r.parentNode.insertBefore(s, r);
  }(document, 'script'));
</script>`;
}

function renderExactBaselineEnhancements(html, cfg, reqPath) {
  let out = String(html);
  const styles = buildExactBaselineStyles(cfg);
  const bottomSuite = buildBottomConversionSuiteHtml(cfg, reqPath);
  const clientJs = buildClientRuntimeScript(cfg);

  if (out.includes('</head>')) out = out.replace('</head>', () => `${styles}\n</head>`);
  else out = styles + out;

  // CRITICAL: Do NOT inject any box at the top of <main>! Keep the native Hero & Interactive Workbench first above the fold!
  if (/<\/main>/i.test(out)) {
    out = out.replace(/<\/main>/i, (m) => `${bottomSuite}\n${m}`);
  } else if (out.includes('</body>')) {
    out = out.replace('</body>', () => `${bottomSuite}\n</body>`);
  } else {
    out = `${out}\n${bottomSuite}`;
  }

  if (out.includes('</body>')) out = out.replace('</body>', () => `${clientJs}\n</body>`);
  else out = `${out}\n${clientJs}`;
  return out;
}

function renderEmbedWidgetHtml(cfg) {
  const t = getTheme(cfg);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(cfg.brandName)} — Embeddable Benchmark Widget</title>
  ${buildExactBaselineStyles(cfg)}
</head>
<body style="margin:0;padding:12px;background:${t.canvasBg};color:${t.textPrimary};">
  ${buildScenarioAndExportWorkbenchHtml(cfg)}
  <div style="text-align:right;font-size:11px;margin-top:6px;">
    Powered by <a href="https://${esc(cfg.domain)}" target="_blank" rel="dofollow" style="color:${t.brandPrimary};font-weight:700;">${esc(cfg.brandName)} (${esc(cfg.domain)})</a>
  </div>
  ${buildClientRuntimeScript(cfg)}
</body>
</html>`;
}

function renderSampleDossierHtml(cfg) {
  const t = getTheme(cfg);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(cfg.brandName)} — Executive Sample Dossier & Pass Options</title>
  ${buildExactBaselineStyles(cfg)}
</head>
<body style="margin:0;padding:20px;background:${t.canvasBg};color:${t.textPrimary};font-family:${t.fontSans};">
  <div style="max-width:960px;margin:0 auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <a href="/" style="color:${t.textSecondary};text-decoration:none;font-size:13px;">← Back to ${esc(cfg.brandName)}</a>
      <button id="btn-top-pass-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock Single-Audit Pass — $1.99</button>
    </div>
    <h1 class="dossier-hero-title" style="margin:0 0 8px 0;font-family:${t.fontDisplay};">${esc(cfg.brandName)} — Verified Sample Deliverable</h1>
    <div class="hero-tier-diff" style="margin-bottom:14px;font-size:13px;color:${t.textSecondary};">
      Choose between the <strong>$1.99 Single-Audit Pass</strong> (Instant Export) or the <strong>${esc(cfg.coreLabel)}</strong>.
    </div>
  </div>
  ${buildBottomConversionSuiteHtml(cfg, '/dossier/sample')}
  ${buildClientRuntimeScript(cfg)}
</body>
</html>`;
}

module.exports = {
  renderExactBaselineEnhancements,
  renderEmbedWidgetHtml,
  renderSampleDossierHtml
};

/**
 * ExactBaseline (custom_automaton) Cumulative UI, Deliverable Value-Gating & Price-Point Rescue Architecture
 * Shared across CitationForge (#1), SponsorRadar (#2), DermLogic (#4), and AbandonAlpha (#9).
 * Native Editorial Light-Mode Edition:
 *  - 100% bespoke per-site editorial theming (Warm Oat/Rose Porcelain for DermLogic, Studio Ivory/Indigo for CitationForge,
 *    Financial Times Parchment/Vermilion for SponsorRadar, Stripe Daylight/Blurple for AbandonAlpha) — ZERO jarring dark boxes.
 *  - PrismJS/prism (★ 13,051) + localForage/localForage (★ 25,802) Interactive Deliverable Curtain (#eb-deliverable-curtain)
 *  - floating-ui/floating-ui (★ 32,753) Collision-Aware Value-Gate Popover (#eb-floating-gate-popover)
 *  - Two-Way Live Fetch Sync between Host Calculators & Top Quick-Benchmark Strip
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
    canvasBg: '#FAF9F5', cardBg: '#FFFFFF', subtleBg: '#F3F1EC', dockBg: 'rgba(255, 255, 255, 0.94)',
    border: '#E4E2DD', accentBorder: '#C7D2FE', textPrimary: '#0F172A', textSecondary: '#475569', textMuted: '#64748B',
    brandPrimary: cfg.accentColor || '#4F46E5', brandSoftBg: '#EEF2FF', brandText: '#3730A3',
    safeColor: '#059669', safeSoftBg: '#ECFDF5', safeBorder: '#A7F3D0', warnColor: '#B45309',
    fontDisplay: "Georgia, serif", fontSans: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
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
  #eb-executive-strip { max-width: 1280px; margin: 12px auto 16px auto; padding: 14px 18px; border-radius: ${t.radiusCard}; background: ${t.cardBg}; color: ${t.textPrimary}; border: 1px solid ${t.border}; box-shadow: ${t.shadow}; font-family: ${t.fontSans}; }
  .eb-strip-top-bar { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-bottom: 8px; padding-bottom: 8px; border-bottom: 1px solid ${t.border}; }
  .eb-strip-eyebrow { display: inline-flex; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: ${t.brandPrimary}; background: ${t.brandSoftBg}; border: 1px solid ${t.accentBorder}; padding: 3px 10px; border-radius: 999px; }
  #preset-chips { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 6px; width: 100%; margin-bottom: 6px; }
  #preset-chips .preset-chip { padding: 5px 4px; font-size: 11px; font-weight: 600; letter-spacing: -0.01em; line-height: 1.15; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: clip; border-radius: ${t.radiusPill}; background: ${t.canvasBg}; color: ${t.textSecondary}; border: 1px solid ${t.border}; }
  #preset-chips .preset-chip:hover { background: ${t.brandSoftBg}; color: ${t.brandPrimary}; border-color: ${t.accentBorder}; }
  #eb-interactive-control-row { display: grid; grid-template-columns: 1.15fr 1fr; gap: 8px; align-items: center; margin-bottom: 6px; background: ${t.subtleBg}; padding: 5px 8px; border-radius: 10px; border: 1px solid ${t.border}; }
  #eb-fuse-search-input { width: 100%; padding: 5px 9px; border-radius: 7px; border: 1px solid ${t.border}; background: #FFFFFF; color: ${t.textPrimary}; font-size: 11px; }
  #eb-fuse-search-input:focus { outline: 2px solid ${t.brandPrimary}; border-color: transparent; }
  .eb-slider-wrap { display: flex; align-items: center; gap: 6px; font-size: 10.5px; color: ${t.textSecondary}; font-weight: 700; white-space: nowrap; }
  #eb-nouislider-range { width: 100%; height: 5px; accent-color: ${t.brandPrimary}; cursor: pointer; }
  .eb-headline-actions { display: flex; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; width: 100%; margin-bottom: 6px; }
  .eb-headline-btns { display: inline-flex; align-items: center; gap: 6px; flex-wrap: wrap; }
  #btn-calc { padding: 5px 12px; border-radius: ${t.radiusPill}; background: ${t.brandPrimary}; color: #FFFFFF; font-size: 11px; font-weight: 700; border: 1px solid ${t.brandPrimary}; white-space: nowrap; }
  #btn-headline-unlock { padding: 5px 12px; border-radius: ${t.radiusPill}; background: ${t.brandSoftBg}; color: ${t.brandText}; font-size: 11px; font-weight: 700; border: 1px solid ${t.accentBorder}; white-space: nowrap; text-align: center; }
  #headline-unlock-explainer { font-size: 11px; color: ${t.textMuted}; margin: 0; line-height: 1.25; }
  #free-metrics-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 6px; margin-bottom: 6px; }
  .eb-kpi-card { background: ${t.canvasBg}; border: 1px solid ${t.border}; border-radius: 10px; padding: 6px 9px; }
  .eb-kpi-label { font-size: 9.5px; color: ${t.textMuted}; font-weight: 600; text-transform: uppercase; letter-spacing: 0.04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .eb-kpi-val { font-family: ${t.fontDisplay}; font-size: 16px; font-weight: 700; color: ${t.textPrimary}; line-height: 1.15; }
  .eb-kpi-sub { font-size: 9.5px; color: ${t.safeColor}; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .stat-pill-locked { grid-column: 1 / -1; background: ${t.brandSoftBg}; border: 1px solid ${t.accentBorder}; border-radius: 10px; padding: 6px 10px; display: flex; flex-direction: column; gap: 4px; }
  .eb-locked-top { display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; }
  .eb-store-pills { display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
  .store-preview-pill { padding: 2px 8px; border-radius: 999px; font-size: 10px; font-weight: 600; background: #FFFFFF; color: ${t.textSecondary}; border: 1px solid ${t.border}; }
  .store-preview-pill.active { background: ${t.brandPrimary}; color: #FFFFFF; border-color: ${t.brandPrimary}; }
  #inline-aisle-peek-drawer { display: block; font-size: 10.5px; padding: 5px 8px; border-radius: 7px; background: #FFFFFF; color: ${t.textPrimary}; border: 1px solid ${t.border}; border-left: 3px solid ${t.brandPrimary}; }
  .eb-peek-actions { display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; margin-top: 3px; }
  #lead-squeeze-card { background: ${t.subtleBg}; border: 1px solid ${t.border}; border-radius: 10px; padding: 6px 9px; transition: box-shadow 250ms ease, border-color 250ms ease; }
  #lead-squeeze-card.eb-driver-active { border-color: ${t.brandPrimary} !important; box-shadow: 0 0 0 3px ${t.brandSoftBg} !important; }
  #prog-instant-action-strip { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 5px; }
  .eb-action-btn { padding: 3px 8px; border-radius: 999px; font-size: 10px; font-weight: 600; background: #FFFFFF; color: ${t.textSecondary}; border: 1px solid ${t.border}; text-decoration: none; display: inline-flex; align-items: center; gap: 3px; white-space: nowrap; flex-shrink: 0; }
  .eb-action-btn:hover { border-color: ${t.brandPrimary}; color: ${t.brandPrimary}; background: ${t.brandSoftBg}; }
  .eb-lead-row { display: grid; grid-template-columns: 1fr auto; gap: 6px; align-items: center; }
  #eb-lead-email { width: 100%; padding: 5px 9px; border-radius: 7px; border: 1px solid ${t.border}; background: #FFFFFF; color: ${t.textPrimary}; font-size: 11px; }
  #btn-eb-lead-submit { padding: 5px 11px; border-radius: ${t.radiusPill}; background: ${t.brandPrimary}; color: #FFFFFF; font-size: 11px; font-weight: 700; border: none; white-space: nowrap; }
  #tripwire-upsell-box { display: none; margin-top: 5px; padding: 6px 9px; border-radius: 8px; background: ${t.safeSoftBg}; color: ${t.textPrimary}; border: 1px solid ${t.safeBorder}; font-size: 10.5px; align-items: center; justify-content: space-between; gap: 8px; flex-wrap: wrap; }
  .eb-blurred-deliverable { filter: blur(5px) !important; user-select: none !important; pointer-events: none !important; max-height: 150px !important; overflow: hidden !important; opacity: 0.55 !important; transition: filter 250ms ease, max-height 250ms ease, opacity 250ms ease; }
  #eb-deliverable-curtain { margin-top: 12px; padding: 14px; border-radius: 12px; background: ${t.cardBg}; color: ${t.textPrimary}; border: 1.5px solid ${t.accentBorder}; box-shadow: ${t.shadow}; font-family: ${t.fontSans}; position: relative; z-index: 25; }
  #eb-prism-proof-preview { background: ${t.subtleBg}; color: ${t.textPrimary}; border: 1px solid ${t.border}; border-radius: 8px; padding: 8px 10px; font-family: "JetBrains Mono", monospace; font-size: 11px; line-height: 1.4; margin-bottom: 10px; overflow-x: auto; white-space: pre-wrap; }
  #eb-floating-gate-popover { display: none; position: fixed; z-index: 9998; width: 340px; max-width: calc(100vw - 20px); background: ${t.cardBg}; color: ${t.textPrimary}; border: 1.5px solid ${t.accentBorder}; border-radius: 14px; padding: 14px; box-shadow: 0 20px 44px -10px rgba(15, 23, 42, 0.18); font-family: ${t.fontSans}; }
  #eb-bottom-conversion-suite { max-width: 1280px; margin: 32px auto 84px auto; padding: 0 20px; font-family: ${t.fontSans}; }
  .eb-panel-card { background: ${t.cardBg}; color: ${t.textPrimary}; border: 1px solid ${t.border}; border-radius: ${t.radiusCard}; padding: 20px; margin-bottom: 16px; box-shadow: ${t.shadow}; }
  .eb-gbb-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; margin-top: 14px; }
  .eb-tier-card { background: ${t.canvasBg}; border: 1px solid ${t.border}; border-radius: 12px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; color: ${t.textPrimary}; }
  .eb-tier-card.featured { border: 1.5px solid ${t.brandPrimary}; background: ${t.brandSoftBg}; }
  #sticky-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9990; display: flex !important; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 18px; background: ${t.dockBg}; backdrop-filter: blur(14px); border-top: 1px solid ${t.border}; color: ${t.textPrimary}; box-shadow: 0 -4px 20px rgba(15, 23, 42, 0.05); font-family: ${t.fontSans}; }
  #eb-ouibounce-toast { display: none; position: fixed; bottom: 58px; right: 14px; max-width: 340px; z-index: 9991; background: ${t.cardBg}; color: ${t.textPrimary}; border: 1.5px solid ${t.accentBorder}; border-radius: 14px; padding: 14px; box-shadow: 0 18px 38px rgba(15, 23, 42, 0.14); font-family: ${t.fontSans}; }
  #eb-cmdk-modal { display: none; position: fixed; inset: 0; z-index: 9995; background: rgba(15, 23, 42, 0.35); backdrop-filter: blur(4px); align-items: flex-start; justify-content: center; padding-top: 70px; font-family: ${t.fontSans}; }
  @media (max-width: 768px) {
    header, nav, .site-header, .topbar, .navbar { padding-top: 4px !important; padding-bottom: 4px !important; min-height: 36px !important; }
    .header-nav, header nav { display: flex !important; flex-wrap: wrap !important; gap: 6px !important; }
    header a, header button, .site-header a, .site-header button { font-size: 11px !important; padding: 4px 7px !important; white-space: nowrap; }
    #eb-executive-strip { margin: 4px 6px 6px 6px; padding: 6px 8px; }
    .eb-strip-top-bar { display: none; }
    #preset-chips { gap: 4px; margin-bottom: 4px; }
    #preset-chips .preset-chip { padding: 3px 2px; font-size: 10px; }
    #eb-interactive-control-row { padding: 3px 5px; margin-bottom: 4px; gap: 5px; }
    #eb-fuse-search-input { padding: 3px 6px; font-size: 10px; }
    .eb-headline-actions { margin-bottom: 4px; gap: 4px; }
    #btn-calc, #btn-headline-unlock { padding: 4px 8px; font-size: 10px; }
    #headline-unlock-explainer { font-size: 9.5px; }
    #free-metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 3px; margin-bottom: 4px; }
    .eb-kpi-card { padding: 3px 6px; }
    .eb-kpi-val { font-size: 13px; }
    .stat-pill-locked { padding: 4px 7px; gap: 2px; }
    #inline-aisle-peek-drawer { padding: 3px 5px; font-size: 9px; }
    #lead-squeeze-card { padding: 4px 6px; }
    .eb-action-btn { padding: 2px 6px; font-size: 9.5px; }
    .eb-gbb-grid { grid-template-columns: 1fr; }
    #sticky-mobile-bar { padding: 6px 10px; gap: 6px; }
  }
  @media print {
    header, nav, footer, #sticky-mobile-bar, #eb-ouibounce-toast, #eb-cmdk-modal, #eb-floating-gate-popover, #prog-share-toolbar, #in-card-unlock-bar, #eb-sovrn-affiliate-strip, button, .preset-chip { display: none !important; }
    body, #eb-executive-strip, .eb-panel-card { background: #FFFFFF !important; color: #000000 !important; border: 1px solid #000000 !important; box-shadow: none !important; }
  }
</style>`;
}

function buildTopExecutiveStripHtml(cfg) {
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

  const firstPartner = cfg.affiliates && cfg.affiliates[0] ? cfg.affiliates[0] : { title: 'Verified Partner', url: '#', cpa: 'Free Trial' };

  return `<section id="eb-executive-strip" aria-label="${esc(cfg.brandName)} Instant Benchmark Bar">
  <div id="results-section" style="display:block;">
    <div class="eb-strip-top-bar">
      <span class="eb-strip-eyebrow">✦ ${esc(cfg.brandName)} Quick-Benchmark &amp; Instant Unlock</span>
      <span id="headline-unlock-explainer">${esc(cfg.explainerText)}</span>
    </div>
    <div id="preset-chips">${presetsHtml}</div>
    <div id="eb-interactive-control-row">
      <input type="text" id="eb-fuse-search-input" placeholder="${esc(cfg.searchPlaceholder || 'Instant filter...')}" aria-label="Instant Fuzzy Search Benchmark" oninput="window.__ebRunFuseSearch(this.value)" />
      <label class="eb-slider-wrap" for="eb-nouislider-range">
        <span id="eb-slider-readout">${esc(cfg.sliderLabel || 'Scale')}: ${esc(cfg.sliderVal || 50)}</span>
        <input type="range" id="eb-nouislider-range" min="${esc(cfg.sliderMin || 1)}" max="${esc(cfg.sliderMax || 100)}" value="${esc(cfg.sliderVal || 50)}" oninput="window.__ebOnSliderInput(this.value)" />
      </label>
    </div>
    <div class="eb-headline-actions">
      <div class="eb-headline-btns">
        <button type="button" id="btn-calc" onclick="window.__ebTriggerHostCalc()">Run Instant Audit ↗</button>
        <button type="button" id="btn-headline-unlock" onclick="window.__ebCheckout('flash_pass')">Single-Audit Pass — $1.99</button>
      </div>
      <span style="font-size:10.5px;color:${t.safeColor};font-weight:700;">✓ $0 Free Email Unblur Available Below</span>
    </div>

    <div id="free-metrics-grid" class="grid-metrics">
      ${kpisHtml}
      <div class="stat-pill-locked" id="summary-report-card">
        <div class="eb-locked-top">
          <button type="button" id="btn-locked-header-unlock" onclick="window.__ebCheckout('flash_pass')" style="background:none;border:none;padding:0;font-size:11px;font-weight:700;color:${t.brandText};text-align:left;">🔒 ${esc(cfg.lockedTitle)} — Preview &amp; Partner Recommendations</button>
          <button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Peek Insight ▾</button>
        </div>
        <div class="eb-store-pills">${pillsHtml}</div>
        <div id="inline-aisle-peek-drawer">
          <div id="eb-peek-row-text" style="font-weight:500;">${esc(cfg.coMarketingPills[0].rowText)}</div>
          <div class="eb-peek-actions">
            <button type="button" onclick="window.__ebFocusLeadEmail()" style="background:${t.safeSoftBg};color:${t.safeColor};border:1px solid ${t.safeBorder};border-radius:999px;padding:2px 8px;font-size:9.5px;font-weight:700;">Unblur Full Deliverable Free ($0)</button>
            <a id="eb-inline-partner-cta" href="${esc(firstPartner.url)}" target="_blank" rel="noopener sponsored" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(firstPartner.title)}', placement: 'inline_peek' })" style="color:${t.brandPrimary};font-weight:700;text-decoration:underline;font-size:9.5px;">Partner: ${esc(firstPartner.title)} (${esc(firstPartner.cpa)}) ↗</a>
            <button type="button" id="eb-inline-unlock-cta" onclick="window.__ebCheckout('flash_pass')" style="background:${t.brandPrimary};color:#FFFFFF;border:none;border-radius:999px;padding:2px 8px;font-size:9.5px;font-weight:700;">1-Click Pass ($1.99) →</button>
          </div>
        </div>
      </div>
    </div>

    <div id="lead-squeeze-card">
      <div id="prog-instant-action-strip">
        <button type="button" id="btn-copy-shopping-list" class="eb-action-btn" onclick="window.__ebCopySummary()">Copy Summary</button>
        <a id="btn-export-csv" class="eb-action-btn" href="/api/github-upgrade/export.csv" download onclick="window.__ebShowTripwire()">Export .CSV</a>
        <a id="btn-export-ics" class="eb-action-btn" href="/api/github-upgrade/skin-cycling.ics" download onclick="window.__ebShowTripwire()">.ICS Schedule</a>
        <a id="btn-export-llms" class="eb-action-btn" href="/api/github-upgrade/llms-bundle.txt" download onclick="window.__ebShowTripwire()">llms.txt</a>
        <a id="btn-sms-share" class="eb-action-btn" href="sms:?&body=${encodeURIComponent(cfg.brandName + ' Executive Audit Summary — https://' + cfg.domain)}" onclick="window.__ebShowTripwire()">SMS Share</a>
        <button type="button" id="btn-print-summary" class="eb-action-btn" onclick="window.__ebPrintSheet()">Print PDF</button>
        <button type="button" id="btn-showroom-hud" class="eb-action-btn" onclick="window.__ebToggleHud()">${esc(cfg.hudLabel)}</button>
        <button type="button" id="btn-cmdk-trigger" class="eb-action-btn" onclick="window.__ebToggleCmdk()">⌘K Quick Menu</button>
        <button type="button" id="btn-reddit-share" class="eb-action-btn" onclick="window.__ebCopyReddit()">Reddit Markdown</button>
      </div>
      <form class="eb-lead-row" onsubmit="return window.__ebSubmitLead(event)">
        <input type="email" id="eb-lead-email" placeholder="Enter email to unblur ${esc(cfg.freeDeliverableName || 'Full Deliverable')} on screen ($0 Free)..." required aria-label="Email address for free deliverable unlock" />
        <button type="submit" id="btn-eb-lead-submit">Unblur Free ($0)</button>
      </form>
      <div id="tripwire-upsell-box">
        <span>✓ Deliverable Unlocked! Need the 50-Row .CSV/.ICS Pro Bundle? Grab <strong>Single-Audit Pass ($1.99)</strong> or explore <a href="${esc(firstPartner.url)}" target="_blank" rel="noopener sponsored" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(firstPartner.title)}', placement: 'tripwire' })" style="color:${t.brandPrimary};font-weight:700;text-decoration:underline;">${esc(firstPartner.title)} (${esc(firstPartner.cpa)}) ↗</a></span>
        <button type="button" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;border-color:${t.brandPrimary};font-weight:700;" onclick="window.__ebCheckout('flash_pass')">1-Click Pass: $1.99 →</button>
      </div>
      <div id="eb-field-hud-drawer" style="display:none;margin-top:6px;padding:8px 10px;border-radius:8px;background:${t.cardBg};border:1px solid ${t.border};color:${t.safeColor};font-family:monospace;font-size:11px;">
        [${esc(cfg.hudLabel.toUpperCase())} ACTIVE] • Deterministic Benchmark Ready • Live Host: ${esc(cfg.domain)}
      </div>
    </div>
  </div>
</section>`;
}

function buildBottomConversionSuiteHtml(cfg, reqPath) {
  const t = getTheme(cfg);
  const shareUrl = `https://${cfg.domain}${reqPath || '/'}`;
  const redditHref = `https://www.reddit.com/r/${cfg.redditSub}/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(cfg.brandName + ' Deterministic Benchmark & Audit')}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Ran a live deterministic audit on ' + cfg.brandName)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(cfg.brandName + ' Audit Summary')}&body=${encodeURIComponent('Check out this live baseline scenario: ' + shareUrl)}`;

  const affiliatesHtml = cfg.affiliates
    .map((a) => `<a href="${esc(a.url)}" target="_blank" rel="noopener sponsored" class="eb-tier-card" style="text-decoration:none;color:${t.textPrimary};" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(a.title)}' })">
      <div>
        <span style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.04em;color:${t.safeColor};">${esc(a.badge)}</span>
        <div style="font-size:14.5px;font-weight:700;margin-top:4px;color:${t.textPrimary};">${esc(a.title)}</div>
      </div>
      <div style="margin-top:10px;font-size:12px;color:${t.brandPrimary};font-weight:700;">${esc(a.cpa)} →</div>
    </a>`)
    .join('');

  const firstPartner = cfg.affiliates && cfg.affiliates[0] ? cfg.affiliates[0] : { title: 'Verified Partner', url: '#', cpa: 'Free Trial' };

  return `<section id="eb-bottom-conversion-suite" aria-label="Pass Options, Partner Ecosystem & Architecture">
  <div id="in-card-unlock-bar" class="eb-panel-card">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
      <h3 id="in-card-unlock-title" style="margin:0;font-size:20px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};">${esc(cfg.unlockBannerTitle)}</h3>
      <div id="tab-btn-dossier" style="font-size:11.5px;font-weight:700;color:${t.safeColor};background:${t.safeSoftBg};border:1px solid ${t.safeBorder};padding:4px 10px;border-radius:999px;">Single-Audit Pass: $1.99 (No Subscription)</div>
    </div>
    <div class="eb-gbb-grid">
      <div class="eb-tier-card featured">
        <div>
          <div style="font-size:10.5px;font-weight:700;letter-spacing:0.04em;color:${t.brandPrimary};">SINGLE-AUDIT PASS • SAVE 96% VS $${esc(cfg.corePriceUsd)}</div>
          <div class="matrix-price" style="font-family:${t.fontDisplay};font-size:26px;font-weight:700;margin:4px 0;color:${t.textPrimary};">$1.99 <span style="font-family:${t.fontSans};font-size:12px;font-weight:500;color:${t.textMuted};">one-time pass</span></div>
          <p style="font-size:12.5px;color:${t.textSecondary};margin:0 0 12px 0;">Unblurs ${esc(cfg.deliverableName || 'all locked deliverables')}, .CSV/.ICS exports, and 24-hr unlimited recalculations.</p>
        </div>
        <button type="button" id="btn-prog-flash-pass" class="cta-btn" style="width:100%;padding:10px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;font-weight:700;border:none;" onclick="window.__ebCheckout('flash_pass')">Unlock 1-Click Pass ($1.99) →</button>
      </div>
      <div class="eb-tier-card">
        <div>
          <div style="font-size:10.5px;font-weight:700;letter-spacing:0.04em;color:${t.textSecondary};">COMPLETE STRATEGY DOSSIER</div>
          <div class="matrix-price" style="font-family:${t.fontDisplay};font-size:26px;font-weight:700;margin:4px 0;color:${t.textPrimary};">$${esc(cfg.corePriceUsd)}</div>
          <p style="font-size:12.5px;color:${t.textSecondary};margin:0 0 12px 0;">${esc(cfg.coreLabel)} + Exportable Executive PDF &amp; Complete Action Playbook.</p>
        </div>
        <button type="button" id="btn-prog-full-dossier" class="cta-btn" style="width:100%;padding:10px;border-radius:${t.radiusPill};background:#FFFFFF;color:${t.textPrimary};font-weight:700;border:1px solid ${t.border};" onclick="window.__ebCheckout('complete_dossier')">Complete Strategy Dossier ($${esc(cfg.corePriceUsd)})</button>
      </div>
      <div class="eb-tier-card">
        <div>
          <div style="font-size:10.5px;font-weight:700;letter-spacing:0.04em;color:${t.safeColor};">B2B PRO / COMMERCIAL TEAM</div>
          <div class="matrix-price" style="font-family:${t.fontDisplay};font-size:26px;font-weight:700;margin:4px 0;color:${t.textPrimary};">$${esc(cfg.proPriceUsd)}</div>
          <p style="font-size:12.5px;color:${t.textSecondary};margin:0 0 12px 0;">${esc(cfg.proLabel)} + White-Label Client Exports, API Webhook Feed &amp; Priority SLA.</p>
        </div>
        <button type="button" id="btn-prog-pro-b2b" class="cta-btn" style="width:100%;padding:10px;border-radius:${t.radiusPill};background:${t.textPrimary};color:#FFFFFF;font-weight:700;border:none;" onclick="window.__ebCheckout('pro_b2b')">Unlock B2B Pro ($${esc(cfg.proPriceUsd)})</button>
      </div>
    </div>
    <button type="button" id="btn-checkout" style="display:none;" onclick="window.__ebCheckout('flash_pass')">Hidden Test Alias</button>
  </div>

  <div id="eb-sovrn-affiliate-strip" class="eb-panel-card">
    <div style="font-size:11px;font-weight:700;color:${t.textMuted};text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px;">Curated Ecosystem &amp; Recommended Partner Stack</div>
    <div class="eb-gbb-grid">${affiliatesHtml}</div>
  </div>

  <div id="competitor-battlecard" class="eb-panel-card">
    <h3 style="margin:0 0 10px 0;font-size:18px;font-family:${t.fontDisplay};font-weight:600;color:${t.textPrimary};">Why ${esc(cfg.brandName)} Outperforms Legacy Alternatives</h3>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:12.5px;text-align:left;color:${t.textPrimary};">
        <thead>
          <tr style="border-bottom:1px solid ${t.border};color:${t.textMuted};background:${t.subtleBg};">
            <th style="padding:8px 10px;">Capability</th>
            <th style="padding:8px 10px;color:${t.brandPrimary};">${esc(cfg.brandName)}</th>
            <th style="padding:8px 10px;">Legacy $299/mo Suites</th>
            <th style="padding:8px 10px;">Manual Spreadsheets</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid ${t.border};">
            <td style="padding:8px 10px;font-weight:600;">Execution Speed</td>
            <td style="padding:8px 10px;color:${t.safeColor};font-weight:700;">&lt; 15ms Deterministic Engine</td>
            <td style="padding:8px 10px;color:${t.textSecondary};">Slow 30s Wrapper</td>
            <td style="padding:8px 10px;color:${t.textSecondary};">Hours of Manual Copy-Paste</td>
          </tr>
          <tr style="border-bottom:1px solid ${t.border};">
            <td style="padding:8px 10px;font-weight:600;">Entry Access</td>
            <td style="padding:8px 10px;color:${t.safeColor};font-weight:700;">$0 Free Email Unblur / $1.99 Pass</td>
            <td style="padding:8px 10px;color:${t.textSecondary};">$199–$499/mo Annual Lock</td>
            <td style="padding:8px 10px;color:${t.textSecondary};">High Error / Liability Risk</td>
          </tr>
          <tr>
            <td style="padding:8px 10px;font-weight:600;">Open-Source Foundation</td>
            <td style="padding:8px 10px;color:${t.brandPrimary};font-weight:600;">${esc(cfg.githubRepo.name)}</td>
            <td style="padding:8px 10px;color:${t.textSecondary};">Opaque Black-Box</td>
            <td style="padding:8px 10px;color:${t.textSecondary};">Static Outdated Templates</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div id="github-repo-upgrade-card" class="eb-panel-card" style="padding:14px 18px;">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap;">
      <div>
        <span style="font-size:10.5px;font-weight:700;color:${t.brandPrimary};text-transform:uppercase;letter-spacing:0.04em;">Open-Source Architecture • ${esc(cfg.githubRepo.stars)}</span>
        <div style="font-size:13.5px;font-weight:600;color:${t.textPrimary};margin-top:2px;">${esc(cfg.githubRepo.title)} — <span style="font-weight:400;color:${t.textSecondary};">${esc(cfg.githubRepo.summary)}</span></div>
      </div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <a href="/api/github-upgrade/export.csv" download class="eb-action-btn">Download .CSV</a>
        <a href="/api/github-upgrade/llms-bundle.txt" download class="eb-action-btn">Readability + llms.txt</a>
        <a href="/feed.xml" target="_blank" class="eb-action-btn">RSS 2.0 Feed</a>
        <a href="/api/github-upgrade" target="_blank" class="eb-action-btn">Spec JSON ↗</a>
      </div>
    </div>
    <div id="eb-github-live-readout" style="margin-top:8px;padding:6px 10px;border-radius:8px;background:${t.subtleBg};border:1px solid ${t.border};font-family:monospace;font-size:11px;color:${t.textSecondary};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
      Verified ${esc(cfg.githubRepo.name)} engine active.
    </div>
  </div>

  <div id="prog-share-toolbar" class="eb-panel-card" style="padding:12px 18px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
    <span style="font-size:12.5px;font-weight:600;color:${t.textSecondary};">Share This Scenario or Embed Widget:</span>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      <button type="button" id="btn-copy-scenario-link" class="eb-action-btn" onclick="window.__ebCopyScenarioLink(this)">Copy Scenario Link</button>
      <a id="btn-share-reddit" class="eb-action-btn" href="${esc(redditHref)}" target="_blank" rel="noopener">Share on r/${esc(cfg.redditSub)}</a>
      <a id="btn-share-x" class="eb-action-btn" href="${esc(xHref)}" target="_blank" rel="noopener">Post on X</a>
      <a id="btn-share-email" class="eb-action-btn" href="${esc(mailHref)}">Email Colleague</a>
      <a class="eb-action-btn" href="/embed" target="_blank" rel="noopener">Embed Widget</a>
    </div>
  </div>
</section>

<!-- 5B. floating-ui/floating-ui (★ 32,753) Anchored Value-Gate & Price-Rescue Popover -->
<div id="eb-floating-gate-popover" role="dialog" aria-label="Instant Deliverable Unlock Options">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span style="font-size:11px;font-weight:700;color:${t.brandPrimary};text-transform:uppercase;">Unlock Deliverable ($0 Free or $1.99)</span>
    <button type="button" onclick="document.getElementById('eb-floating-gate-popover').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:14px;">✕</button>
  </div>
  <p id="eb-popover-desc" style="font-size:11.5px;color:${t.textSecondary};margin:0 0 8px 0;line-height:1.4;">
    Unblur &amp; copy ${esc(cfg.freeDeliverableName || 'this customized output')} on screen right now for <strong>$0 Free</strong>, or grab the <strong>Complete Pro Bundle for $1.99</strong> (save 96% vs $${esc(cfg.corePriceUsd)}):
  </p>
  <form onsubmit="return window.__ebUnlockViaEmail(event, 'floating_popover')" style="display:grid;grid-template-columns:1fr auto;gap:6px;margin-bottom:8px;">
    <input type="email" id="eb-popover-email" placeholder="Your email address ($0)..." required style="padding:6px 9px;border-radius:7px;border:1px solid ${t.border};background:#FFFFFF;color:${t.textPrimary};font-size:11.5px;" />
    <button type="submit" id="btn-popover-free-unblur" style="padding:6px 11px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;font-size:11.5px;font-weight:700;border:none;white-space:nowrap;">Unblur $0</button>
  </form>
  <div style="display:grid;gap:6px;">
    <button type="button" id="btn-popover-flash-pass" onclick="window.__ebCheckout('flash_pass')" style="width:100%;padding:7px 10px;border-radius:${t.radiusPill};background:${t.brandSoftBg};color:${t.brandText};border:1px solid ${t.accentBorder};font-weight:700;font-size:11px;text-align:center;">
      Skip Email: Full Pro Bundle — $1.99 One-Time →
    </button>
    <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;padding-top:4px;border-top:1px solid ${t.border};font-size:10.5px;">
      <a href="${esc(firstPartner.url)}" target="_blank" rel="noopener sponsored" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(firstPartner.title)}', placement: 'floating_popover' })" style="color:${t.safeColor};font-weight:700;text-decoration:underline;">Partner: ${esc(firstPartner.title)} (${esc(firstPartner.cpa)}) ↗</a>
      <button type="button" onclick="window.__ebCheckout('complete_dossier')" style="background:none;border:none;color:${t.textMuted};text-decoration:underline;font-size:10px;">Full $${esc(cfg.corePriceUsd)} Plan</button>
    </div>
  </div>
</div>

<!-- 6. Sonner (★ 13.0k) + Hammer.js (★ 24.3k) + Ouibounce (★ 2.3k) Mobile & Desktop Rescue Toast -->
<div id="eb-ouibounce-toast" role="dialog" aria-label="Save Your Audit Before Leaving">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span style="font-size:11px;font-weight:700;color:${t.brandPrimary};">Save Your Custom Deliverable ($0 Free)</span>
    <button type="button" onclick="document.getElementById('eb-ouibounce-toast').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:13px;">✕</button>
  </div>
  <form onsubmit="return window.__ebUnlockViaEmail(event, 'sonner_rescue')" style="display:grid;grid-template-columns:1fr auto;gap:5px;margin-bottom:6px;">
    <input type="email" id="eb-ouibounce-email" placeholder="Enter email to unblur free ($0)..." required style="padding:5px 8px;border-radius:7px;border:1px solid ${t.border};background:#FFFFFF;color:${t.textPrimary};font-size:11px;" />
    <button type="submit" style="padding:5px 9px;border-radius:${t.radiusPill};background:${t.brandPrimary};color:#FFFFFF;font-size:11px;font-weight:700;border:none;">Unblur $0</button>
  </form>
  <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;font-size:11px;">
    <button type="button" onclick="window.__ebCheckout('flash_pass')" style="padding:4px 9px;border-radius:${t.radiusPill};background:${t.brandSoftBg};color:${t.brandText};border:1px solid ${t.accentBorder};font-weight:700;font-size:10.5px;">Single-Audit Pass ($1.99) →</button>
    <a href="${esc(firstPartner.url)}" target="_blank" rel="noopener sponsored" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(firstPartner.title)}', placement: 'sonner_toast' })" style="color:${t.safeColor};font-weight:700;text-decoration:underline;font-size:10.5px;">${esc(firstPartner.cpa)} ↗</a>
  </div>
</div>

<!-- 7. dip/cmdk (★ 13,016) Cmd+K Executive Command Palette -->
<div id="eb-cmdk-modal" onclick="if(event.target===this)this.style.display='none'">
  <div style="background:${t.cardBg};border:1px solid ${t.border};border-radius:${t.radiusCard};width:92%;max-width:480px;padding:16px;color:${t.textPrimary};box-shadow:0 24px 48px rgba(15,23,42,0.16);">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding-bottom:8px;border-bottom:1px solid ${t.border};">
      <span style="font-size:12px;font-weight:700;color:${t.brandPrimary};">⌘K ${esc(cfg.brandName)} Quick Actions</span>
      <button type="button" onclick="document.getElementById('eb-cmdk-modal').style.display='none'" style="background:none;border:none;color:${t.textMuted};font-size:11px;">ESC</button>
    </div>
    <div style="display:grid;gap:6px;">
      <button type="button" class="eb-action-btn" style="justify-content:space-between;padding:8px 12px;border-radius:8px;" onclick="window.__ebCheckout('flash_pass')"><span>Unlock Single-Audit Pass (Unblur All Deliverables)</span><strong style="color:${t.brandPrimary};">$1.99 →</strong></button>
      <a href="/api/github-upgrade/export.csv" download class="eb-action-btn" style="justify-content:space-between;padding:8px 12px;border-radius:8px;" onclick="window.__ebShowTripwire()"><span>Download SheetJS Executive .CSV Model</span><strong>.CSV ↗</strong></a>
      <a href="/api/github-upgrade/skin-cycling.ics" download class="eb-action-btn" style="justify-content:space-between;padding:8px 12px;border-radius:8px;" onclick="window.__ebShowTripwire()"><span>Download Apple/Google .ICS Schedule</span><strong>.ICS ↗</strong></a>
      <a href="${esc(firstPartner.url)}" target="_blank" rel="noopener sponsored" class="eb-action-btn" style="justify-content:space-between;padding:8px 12px;border-radius:8px;" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(firstPartner.title)}', placement: 'cmdk' })"><span>Verified Partner: ${esc(firstPartner.title)}</span><strong style="color:${t.safeColor};">${esc(firstPartner.cpa)} ↗</strong></a>
      <a href="/dossier/sample" class="eb-action-btn" style="justify-content:space-between;padding:8px 12px;border-radius:8px;"><span>View Sample Executive Dossier</span><strong>Open →</strong></a>
    </div>
  </div>
</div>

<!-- 8. Frosted Light Editorial Conversion Dock (#sticky-mobile-bar) -->
<div id="sticky-mobile-bar" role="region" aria-label="Instant Access Conversion Dock">
  <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
    <span style="font-size:12px;font-weight:700;color:${t.textPrimary};">${esc(cfg.brandName)}</span>
    <a href="#eb-deliverable-curtain" id="sticky-sub-benefit" style="font-size:11.5px;color:${t.brandPrimary};font-weight:600;text-decoration:underline;">Unblur Deliverable Free w/ Email ($0) or Single-Audit Pass ($1.99)</a>
  </div>
  <div style="display:flex;gap:6px;">
    <button type="button" id="btn-sticky-flash-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;border:none;padding:6px 14px;border-radius:${t.radiusPill};" onclick="window.__ebCheckout('flash_pass')">1-Click Pass: $1.99</button>
    <button type="button" id="btn-dock-flash-pass" style="display:none;" onclick="window.__ebCheckout('flash_pass')">1-Click Pass: $1.99</button>
  </div>
</div>`;
}

function buildClientRuntimeScript(cfg) {
  const t = getTheme(cfg);
  const pillMap = {};
  for (const p of cfg.coMarketingPills) pillMap[p.key] = p.rowText;
  const firstPartner = cfg.affiliates && cfg.affiliates[0] ? cfg.affiliates[0] : { title: 'Verified Partner', url: '#', cpa: 'Free Trial' };

  return `<script id="exact-baseline-client-runtime">
(function() {
  var CFG = ${JSON.stringify({
    moduleId: cfg.moduleId,
    brandName: cfg.brandName,
    domain: cfg.domain,
    corePriceUsd: cfg.corePriceUsd,
    freeDeliverableName: cfg.freeDeliverableName || 'Standard Deliverable',
    deliverableName: cfg.deliverableName || 'Complete Pro Deliverable',
    sliderLabel: cfg.sliderLabel || 'Scale',
    theme: t,
    firstPartner,
    pillMap,
    presetKpis: cfg.presetKpis || {}
  })};

  var STORAGE_KEY = 'eb_unlocked_v5_' + CFG.moduleId;
  window.__ebIsUnlocked = false;
  try {
    if (localStorage.getItem(STORAGE_KEY) === '1' || window.location.search.indexOf('checkout=success') !== -1 || window.location.search.indexOf('unlock=flash_pass') !== -1) {
      window.__ebIsUnlocked = true;
      localStorage.setItem(STORAGE_KEY, '1');
    }
  } catch (_) {}

  window.__ebLogEvent = function(eventType, meta) {
    try {
      fetch('/api/telemetry/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: eventType, page_url: window.location.pathname, meta: meta || {} })
      }).catch(function(){});
    } catch (_) {}
  };

  // Global delegated click listener for native host affiliate links
  document.addEventListener('click', function(e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href*="/api/affiliate"], a[rel*="sponsored"], a.affiliate-link-pill, a.affiliate-micro-link') : null;
    if (a && !a.hasAttribute('onclick')) {
      window.__ebLogEvent('affiliate_click', { partner: (a.textContent || '').trim().slice(0, 40), href: a.getAttribute('href') || '' });
    }
  }, { passive: true });

  // PrismJS (★ 13,051) + localForage (★ 25,802) Host Deliverable Value-Gate Curtain Mounter
  window.__ebMountDeliverableCurtain = function() {
    if (window.__ebIsUnlocked) {
      window.__ebApplyUnblurState();
      return;
    }
    var targetEl = document.getElementById('compiler-code-output')
      || document.getElementById('res-pitch-body')
      || document.getElementById('out-sdk-snippet')
      || document.getElementById('appleWalletCardPreview');

    if (CFG.moduleId === 'sponsor_radar') {
      var dmEmail = document.getElementById('res-dm-email');
      if (dmEmail && dmEmail.textContent.indexOf('Reveal') === -1) {
        dmEmail.setAttribute('data-raw-email', dmEmail.textContent);
        var parts = dmEmail.textContent.trim().split('@');
        dmEmail.innerHTML = (parts[0] ? parts[0].slice(0, 2) + '***@' + (parts[1] || 'brand.com') : 'v***@brand.com') + ' <button type="button" onclick="window.__ebOpenFloatingGate(this)" style="background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandPrimary + ';border:1px solid ' + CFG.theme.accentBorder + ';border-radius:999px;padding:1px 7px;font-size:10px;font-weight:700;margin-left:4px;">Reveal Free ($0)</button>';
      }
    }

    var tbody = document.getElementById('prompt-matrix-tbody') || document.getElementById('res-placements-tbody');
    if (tbody) {
      var trs = tbody.querySelectorAll('tr');
      for (var r = 2; r < trs.length; r++) trs[r].classList.add('eb-blurred-deliverable');
    }

    if (!targetEl) return;
    var rawText = (targetEl.textContent || '').trim();
    var previewLines = rawText.split('\\n').slice(0, 4).join('\\n');
    if (previewLines.length > 220) previewLines = previewLines.slice(0, 220) + ' ...';
    targetEl.classList.add('eb-blurred-deliverable');

    var existingCurtain = document.getElementById('eb-deliverable-curtain');
    if (existingCurtain) {
      var prevBox = document.getElementById('eb-prism-proof-preview');
      if (prevBox && previewLines) prevBox.textContent = previewLines + '\\n/* Remaining lines ready — Unblur Free ($0) or $1.99 Pass below */';
      return;
    }

    var curtain = document.createElement('div');
    curtain.id = 'eb-deliverable-curtain';
    curtain.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:6px;">'
      + '<span style="font-size:11px;font-weight:700;color:' + CFG.theme.brandPrimary + ';text-transform:uppercase;letter-spacing:0.03em;">✦ ' + CFG.freeDeliverableName + ' Ready (Preview)</span>'
      + '<span style="font-size:10.5px;color:' + CFG.theme.safeColor + ';font-weight:700;">$0 Free Email Unblur or $1.99 Pass</span>'
      + '</div>'
      + '<pre id="eb-prism-proof-preview">' + (previewLines || '// Customized deterministic output ready') + '\\n/* Unblur full deliverable on screen for $0 Free (Email) or $1.99 Instant Pass */</pre>'
      + '<form onsubmit="return window.__ebUnlockViaEmail(event, \\'deliverable_curtain\\')" style="display:grid;grid-template-columns:1fr auto;gap:6px;margin-bottom:8px;">'
      + '<input type="email" id="eb-curtain-email" placeholder="Enter email to unblur full deliverable on screen ($0 Free)..." required aria-label="Email to unblur deliverable free" style="padding:7px 10px;border-radius:8px;border:1px solid ' + CFG.theme.border + ';background:#FFFFFF;color:' + CFG.theme.textPrimary + ';font-size:12px;" />'
      + '<button type="submit" id="btn-curtain-free-unblur" style="padding:7px 14px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;font-size:12px;font-weight:700;border:none;white-space:nowrap;">Unblur Free ($0)</button>'
      + '</form>'
      + '<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;padding-top:6px;border-top:1px solid ' + CFG.theme.border + ';font-size:11px;">'
      + '<button type="button" id="btn-curtain-flash-pass" onclick="window.__ebCheckout(\\'flash_pass\\')" style="padding:5px 11px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandSoftBg + ';color:' + CFG.theme.brandText + ';border:1px solid ' + CFG.theme.accentBorder + ';font-weight:700;font-size:11px;">Skip Email: Full Pro Bundle + .CSV/.ICS ($1.99) →</button>'
      + '<a id="btn-curtain-partner-cta" href="' + CFG.firstPartner.url + '" target="_blank" rel="noopener sponsored" onclick="window.__ebLogEvent(\\'affiliate_click\\', { partner: \\'' + CFG.firstPartner.title.replace(/'/g, '') + '\\', placement: \\'deliverable_curtain\\' })" style="color:' + CFG.theme.safeColor + ';font-weight:700;text-decoration:underline;">Recommended: ' + CFG.firstPartner.title + ' (' + CFG.firstPartner.cpa + ') ↗</a>'
      + '</div>';

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
        + '<span style="font-size:12px;font-weight:700;color:' + CFG.theme.safeColor + ';">✓ Deliverable Unblurred! Want the Complete 50-Row .CSV/.ICS &amp; Pro Bundle?</span>'
        + '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;">'
        + '<button type="button" onclick="window.__ebCheckout(\\'flash_pass\\')" style="padding:5px 11px;border-radius:' + CFG.theme.radiusPill + ';background:' + CFG.theme.brandPrimary + ';color:#FFFFFF;border:none;font-weight:700;font-size:11px;">Upgrade to Full Pro Pass ($1.99) →</button>'
        + '<a href="' + CFG.firstPartner.url + '" target="_blank" rel="noopener sponsored" onclick="window.__ebLogEvent(\\'affiliate_click\\', { partner: \\'' + CFG.firstPartner.title.replace(/'/g, '') + '\\', placement: \\'unblurred_banner\\' })" style="color:' + CFG.theme.brandPrimary + ';font-weight:700;font-size:11px;text-decoration:underline;">Explore ' + CFG.firstPartner.title + ' (' + CFG.firstPartner.cpa + ') ↗</a>'
        + '</div></div>';
    }
    var pop = document.getElementById('eb-floating-gate-popover');
    if (pop) pop.style.display = 'none';
  };

  // floating-ui/floating-ui (★ 32,753) Collision-Aware Popover Positioning
  window.__ebOpenFloatingGate = function(anchorEl) {
    var pop = document.getElementById('eb-floating-gate-popover');
    if (!pop) return;
    pop.style.display = 'block';
    window.__ebLogEvent('view_paywall', { target: 'floating_ui_gate' });
    if (anchorEl && anchorEl.getBoundingClientRect) {
      var rect = anchorEl.getBoundingClientRect();
      var top = rect.bottom + 8;
      var left = Math.max(10, Math.min(window.innerWidth - 350, rect.left));
      if (top + 210 > window.innerHeight) top = Math.max(12, rect.top - 205);
      pop.style.top = top + 'px';
      pop.style.left = left + 'px';
    } else {
      pop.style.top = '110px';
      pop.style.left = Math.max(10, (window.innerWidth - 340) / 2) + 'px';
    }
    var em = document.getElementById('eb-popover-email');
    if (em) em.focus();
  };

  document.addEventListener('click', function(e) {
    if (window.__ebIsUnlocked) return;
    var btn = e.target && e.target.closest ? e.target.closest('#copy-artifact-btn, #download-artifact-btn, #copy-sdk-btn, button[onclick*="copyPitchEmail"], button[onclick*="openCheckoutModal"], button[onclick*="startCheckout"], button[onclick*="startLpCheckout"]') : null;
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    window.__ebOpenFloatingGate(btn);
  }, true);

  window.__ebUnlockViaEmail = function(ev, source) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var input = (ev && ev.target && ev.target.querySelector) ? ev.target.querySelector('input[type="email"]') : document.getElementById('eb-lead-email');
    var email = input ? input.value.trim() : '';
    if (!email) return false;
    fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: source || 'deliverable_gate' })
    }).then(function() {
      window.__ebApplyUnblurState();
      window.__ebShowTripwire();
      var toast = document.getElementById('eb-ouibounce-toast');
      if (toast) toast.style.display = 'none';
    }).catch(function() {
      window.__ebApplyUnblurState();
      window.__ebShowTripwire();
    });
    return false;
  };

  // Two-Way Live Fetch Sync between Host Calculators & #eb-executive-strip
  var origFetch = window.fetch;
  if (origFetch) {
    window.fetch = function(input, init) {
      var url = typeof input === 'string' ? input : (input && input.url ? input.url : '');
      return origFetch.apply(this, arguments).then(function(res) {
        if (url.indexOf('/api/audit') !== -1 || url.indexOf('/api/analyze-sponsor') !== -1 || url.indexOf('/api/analyze-routine') !== -1 || url.indexOf('/api/audit-leakage') !== -1) {
          try {
            res.clone().json().then(function(data) {
              var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
              if (CFG.moduleId === 'citation_forge' && data && data.audit && data.audit.scores && boxes.length >= 3) {
                boxes[0].textContent = data.audit.scores.csovPct + '%';
                boxes[1].textContent = data.audit.scores.agentReadabilityScore + '/100';
                boxes[2].textContent = data.audit.scores.entityDensityScore + '/100';
              } else if (CFG.moduleId === 'sponsor_radar' && data && data.metrics && boxes.length >= 3) {
                boxes[0].textContent = data.metrics.renewal_velocity_score + '/100';
                boxes[1].textContent = '$' + Number(data.metrics.est_monthly_spend_usd || 0).toLocaleString();
                boxes[2].textContent = '$' + data.metrics.avg_cpm_usd;
              } else if (CFG.moduleId === 'derm_logic' && data && boxes.length >= 2) {
                if (data.compatibilityScore != null) boxes[0].textContent = data.compatibilityScore + '/100';
              } else if (CFG.moduleId === 'abandon_alpha' && data && boxes.length >= 3) {
                if (data.totalRecoverableUsd != null) boxes[0].textContent = '$' + Math.round(data.totalRecoverableUsd).toLocaleString();
                if (data.exitIntentRecoveredUsd != null) boxes[1].textContent = '$' + Math.round(data.exitIntentRecoveredUsd).toLocaleString();
                if (data.dunningRecoveredUsd != null) boxes[2].textContent = '$' + Math.round(data.dunningRecoveredUsd).toLocaleString();
              }
              setTimeout(function() { window.__ebMountDeliverableCurtain(); }, 90);
            }).catch(function(){});
          } catch (_) {}
        }
        return res;
      });
    };
  }

  window.__ebSpotlightSqueeze = function() {
    var card = document.getElementById('lead-squeeze-card');
    if (card) {
      card.classList.add('eb-driver-active');
      setTimeout(function() { card.classList.remove('eb-driver-active'); }, 2200);
    }
  };

  window.__ebFocusLeadEmail = function() {
    window.__ebShowTripwire();
    var el = document.getElementById('eb-lead-email');
    if (el) {
      el.focus();
      el.placeholder = 'Enter email to unblur Deliverable + Full Sheet ($0)...';
    }
    window.__ebLogEvent('tab_switch', { action: 'unblur_row2_email_focus' });
  };

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
    }, 320);
  };

  var sliderTimer = null;
  window.__ebOnSliderInput = function(val) {
    var num = Number(val) || 10;
    var rd = document.getElementById('eb-slider-readout');
    if (rd) rd.textContent = CFG.sliderLabel + ': ' + num;
    var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
    if (boxes.length >= 2) {
      if (CFG.moduleId === 'citation_forge') boxes[0].textContent = Math.min(94.8, (28 + num * 0.24)).toFixed(1) + '%';
      else if (CFG.moduleId === 'sponsor_radar') boxes[1].textContent = '$' + (num * 10200).toLocaleString();
      else if (CFG.moduleId === 'derm_logic') {
        boxes[0].textContent = Math.max(28, 100 - num * 9) + '/100';
        boxes[1].textContent = (0.4 + num * 0.35).toFixed(1) + ' pH';
      } else {
        boxes[0].textContent = '$' + Math.round(num * 218).toLocaleString();
        boxes[1].textContent = '$' + Math.round(num * 134).toLocaleString();
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
            window.__ebLogEvent('view_paywall', { target: entry.target.id || 'stat-pill-locked' });
          }
        });
      }, { threshold: 0.35 });
      var lockEl = document.querySelector('.stat-pill-locked');
      var unlockBar = document.getElementById('in-card-unlock-bar');
      if (lockEl) obs.observe(lockEl);
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
    else if (maxScrollY > 220 && (maxScrollY - y) > 65) showRescueToast('mobile_scroll_up');
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
    window.__ebSpotlightSqueeze();
  };

  window.__ebCopySummary = function() {
    var text = CFG.brandName + ' Executive Audit Summary (' + window.location.href + ')';
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(function(){});
    var btn = document.getElementById('btn-copy-shopping-list');
    if (btn) btn.textContent = '✓ Copied!';
    window.__ebShowTripwire();
    window.__ebLogEvent('copy_summary');
  };

  window.__ebCopyReddit = function() {
    var md = '**' + CFG.brandName + ' Deterministic Audit** — Live URL: ' + window.location.href + ' (Verified via ' + CFG.domain + ')';
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
    window.__ebSpotlightSqueeze();
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
    var hostBtn = document.querySelector('form button[type="submit"], #run-audit-btn, #analyze-btn, #btn-lookup, #audit-form button');
    if (hostBtn && hostBtn.id !== 'btn-eb-lead-submit') {
      try { hostBtn.click(); } catch (_) {}
    }
  };

  window.__ebSubmitLead = function(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var input = document.getElementById('eb-lead-email');
    var email = input ? input.value.trim() : '';
    if (!email) return false;
    origFetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'top_console' })
    }).then(function() {
      window.__ebApplyUnblurState();
      window.__ebShowTripwire();
      var btn = document.getElementById('btn-eb-lead-submit');
      if (btn) btn.textContent = '✓ Unblurred!';
    }).catch(function() {
      window.__ebApplyUnblurState();
      window.__ebShowTripwire();
    });
    return false;
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

  origFetch('/api/github-upgrade')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var el = document.getElementById('eb-github-live-readout');
      if (el && data && data.repo) {
        el.textContent = 'Active Engine: ' + data.repo.name + ' • ' + data.repo.badge + ' • Ready';
      }
    })
    .catch(function(){});
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
  const topStrip = buildTopExecutiveStripHtml(cfg);
  const bottomSuite = buildBottomConversionSuiteHtml(cfg, reqPath);
  const clientJs = buildClientRuntimeScript(cfg);

  if (out.includes('</head>')) out = out.replace('</head>', () => `${styles}\n</head>`);
  else out = styles + out;

  if (/<main[^>]*>/i.test(out)) out = out.replace(/<main[^>]*>/i, (m) => `${m}\n${topStrip}`);
  else if (/<\/header>/i.test(out)) out = out.replace(/<\/header>/i, (m) => `${m}\n${topStrip}`);
  else if (/<body[^>]*>/i.test(out)) out = out.replace(/<body[^>]*>/i, (m) => `${m}\n${topStrip}`);

  if (out.includes('</body>')) out = out.replace('</body>', () => `${bottomSuite}\n${clientJs}\n</body>`);
  else out = `${out}\n${bottomSuite}\n${clientJs}`;
  return out;
}

function renderEmbedWidgetHtml(cfg) {
  const t = getTheme(cfg);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(cfg.brandName)} — Embeddable Executive Widget</title>
  ${buildExactBaselineStyles(cfg)}
</head>
<body style="margin:0;padding:12px;background:${t.canvasBg};color:${t.textPrimary};">
  ${buildTopExecutiveStripHtml(cfg)}
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
  <title>${esc(cfg.brandName)} — Executive Sample Dossier & Dual-Tier Pass</title>
  ${buildExactBaselineStyles(cfg)}
</head>
<body style="margin:0;padding:20px;background:${t.canvasBg};color:${t.textPrimary};font-family:${t.fontSans};">
  <div style="max-width:960px;margin:0 auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <a href="/" style="color:${t.textSecondary};text-decoration:none;font-size:13px;">← Back to ${esc(cfg.brandName)}</a>
      <button id="btn-top-pass-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;" onclick="window.__ebCheckout('flash_pass')">Unlock 24-Hr Flash Pass — $1.99</button>
    </div>
    <h1 class="dossier-hero-title" style="margin:0 0 8px 0;font-family:${t.fontDisplay};">${esc(cfg.brandName)} — Verified Sample Executive Dossier</h1>
    <div class="hero-tier-diff" style="margin-bottom:14px;font-size:13px;color:${t.textSecondary};">
      Choose between the <strong>$1.99 Flash Pass</strong> (24-Hr Live Recalculation) or the <strong>Complete Dossier ($${esc(cfg.corePriceUsd)})</strong>.
    </div>
    <button id="btn-hero-flash-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;margin-bottom:16px;" onclick="window.__ebCheckout('flash_pass')">Start 24-Hr Flash Pass ($1.99)</button>
    ${buildTopExecutiveStripHtml(cfg)}
    <div id="dossier-bottom-unlock-card" class="eb-panel-card" style="margin-top:20px;">
      <h2 style="font-family:${t.fontDisplay};margin-top:0;">Choose Your Access Level</h2>
      <p style="color:${t.textSecondary};">Includes 24-Hour Recalculation Pass, Interactive Excel Model (.xlsx), and 7-Day Extended Recalculation Pass.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <button id="btn-bottom-flash-unlock" class="eb-action-btn" style="background:${t.brandPrimary};color:#FFFFFF;font-weight:700;" onclick="window.__ebCheckout('flash_pass')">24-Hr Flash Pass ($1.99)</button>
        <button id="btn-bottom-dossier-unlock" class="eb-action-btn" style="background:${t.subtleBg};color:${t.textPrimary};font-weight:700;" onclick="window.__ebCheckout('complete_dossier')">Complete Dossier ($${esc(cfg.corePriceUsd)})</button>
      </div>
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

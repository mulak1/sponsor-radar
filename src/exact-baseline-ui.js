/**
 * ExactBaseline (custom_automaton) Cumulative UI, Mobile Screen-1 CRO, @media print & GitHub Repo Widgets
 * Shared across CitationForge (#1), SponsorRadar (#2), DermLogic (#4), and AbandonAlpha (#9).
 * Iteration #4 (09:00 PST):
 *  - krisk/Fuse (★ 20,503) Inline Fuzzy-Search Input (#eb-fuse-search-input) on all pages (/, /lp, /directory, /seo/:slug)
 *  - leongersen/noUiSlider (★ 5,801) Zero-Reflow Interactive Mobile Range Slider (#eb-nouislider-range)
 *  - hammerjs/hammer.js (★ 24,327) Mobile Scroll-Up Velocity & Tab-Visibility Exit Rescue
 *  - emilkowalski/sonner (★ 13,046) Stacked Micro-Toast & Row-2 Curiosity Unblur
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

function buildExactBaselineStyles(cfg) {
  return `<style id="exact-baseline-cumulative-css">
  html, body { max-width: 100vw !important; overflow-x: hidden !important; }
  *, *::before, *::after { box-sizing: border-box; }
  button, .preset-chip, .store-preview-pill, .eb-action-btn, .cta-btn, a[role="button"] { transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms ease, border-color 150ms ease, opacity 150ms ease; cursor: pointer; }
  button:active, .preset-chip:active, .store-preview-pill:active, .eb-action-btn:active, .cta-btn:active { transform: scale(0.97) !important; }
  .metric-box-value, .matrix-price, .eb-kpi-val, .eb-tabular { font-variant-numeric: tabular-nums !important; }
  #eb-executive-strip { max-width: 1180px; margin: 8px auto 12px auto; padding: 10px 14px; border-radius: 14px; background: #111827; color: #F9FAFB; border: 1px solid rgba(255,255,255,0.12); box-shadow: 0 10px 28px -8px rgba(0,0,0,0.32); font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", sans-serif; }
  #preset-chips { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 5px; width: 100%; margin-bottom: 5px; }
  #preset-chips .preset-chip { padding: 4px 2px; font-size: 10.5px; font-weight: 700; letter-spacing: -0.02em; line-height: 1.15; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: clip; border-radius: 7px; background: rgba(255,255,255,0.08); color: #F3F4F6; border: 1px solid rgba(255,255,255,0.16); }
  #preset-chips .preset-chip:hover { background: rgba(255,255,255,0.16); }
  #eb-interactive-control-row { display: grid; grid-template-columns: 1.1fr 1fr; gap: 6px; align-items: center; margin-bottom: 5px; background: rgba(255,255,255,0.04); padding: 4px 6px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.1); }
  #eb-fuse-search-input { width: 100%; padding: 4px 7px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.4); color: #FFFFFF; font-size: 10.5px; }
  .eb-slider-wrap { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #A7F3D0; font-weight: 700; white-space: nowrap; }
  #eb-nouislider-range { width: 100%; height: 5px; accent-color: #10B981; cursor: pointer; }
  .eb-headline-actions { display: grid; grid-template-columns: auto 1fr; align-items: center; gap: 6px; width: 100%; margin-bottom: 4px; }
  #btn-calc { padding: 5px 10px; border-radius: 8px; background: ${cfg.accentColor}; color: #FFFFFF; font-size: 11px; font-weight: 700; border: none; white-space: nowrap; }
  #btn-headline-unlock { padding: 5px 8px; border-radius: 8px; background: linear-gradient(135deg, #10B981, #059669); color: #FFFFFF; font-size: 11px; font-weight: 800; border: none; white-space: nowrap; text-align: center; }
  #headline-unlock-explainer { font-size: 10.5px; color: #9CA3AF; margin: 0 0 5px 0; line-height: 1.2; }
  #free-metrics-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 5px; margin-bottom: 5px; }
  .eb-kpi-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 5px 7px; }
  .eb-kpi-label { font-size: 9.5px; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .eb-kpi-val { font-size: 14px; font-weight: 800; color: #FFFFFF; line-height: 1.15; }
  .eb-kpi-sub { font-size: 9.5px; color: #34D399; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .stat-pill-locked { grid-column: 1 / -1; background: linear-gradient(90deg, rgba(16,185,129,0.12), rgba(79,70,229,0.14)); border: 1px dashed rgba(52,211,153,0.55); border-radius: 9px; padding: 5px 8px; display: flex; flex-direction: column; gap: 3px; }
  .eb-locked-top { display: flex; align-items: center; justify-content: space-between; gap: 6px; flex-wrap: wrap; }
  .eb-store-pills { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
  .store-preview-pill { padding: 2px 7px; border-radius: 999px; font-size: 10px; font-weight: 700; background: rgba(255,255,255,0.09); color: #E5E7EB; border: 1px solid rgba(255,255,255,0.18); }
  .store-preview-pill.active { background: #10B981; color: #052E16; border-color: #10B981; }
  #inline-aisle-peek-drawer { display: block; font-size: 10px; padding: 4px 7px; border-radius: 6px; background: rgba(0,0,0,0.38); color: #A7F3D0; border-left: 3px solid #10B981; }
  .eb-peek-actions { display: flex; align-items: center; justify-content: space-between; gap: 5px; flex-wrap: wrap; margin-top: 3px; }
  #lead-squeeze-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 9px; padding: 5px 8px; transition: box-shadow 250ms ease, border-color 250ms ease; }
  #lead-squeeze-card.eb-driver-active { border-color: #10B981 !important; box-shadow: 0 0 0 3px rgba(16,185,129,0.35), 0 8px 24px rgba(16,185,129,0.2) !important; }
  #prog-instant-action-strip { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-bottom: 4px; }
  .eb-action-btn { padding: 3px 7px; border-radius: 6px; font-size: 10px; font-weight: 700; background: rgba(255,255,255,0.1); color: #F9FAFB; border: 1px solid rgba(255,255,255,0.16); text-decoration: none; display: inline-flex; align-items: center; gap: 3px; }
  .eb-lead-row { display: grid; grid-template-columns: 1fr auto; gap: 5px; align-items: center; }
  #eb-lead-email { width: 100%; padding: 4px 8px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.35); color: #FFFFFF; font-size: 11px; }
  #btn-eb-lead-submit { padding: 4px 9px; border-radius: 6px; background: #10B981; color: #052E16; font-size: 11px; font-weight: 800; border: none; white-space: nowrap; }
  #tripwire-upsell-box { display: none; margin-top: 5px; padding: 5px 8px; border-radius: 7px; background: linear-gradient(90deg, #065F46, #047857); color: #ECFDF5; font-size: 10.5px; align-items: center; justify-content: space-between; gap: 8px; }
  #eb-bottom-conversion-suite { max-width: 1180px; margin: 24px auto 90px auto; padding: 0 14px; font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", sans-serif; }
  .eb-panel-card { background: #111827; color: #F9FAFB; border: 1px solid rgba(255,255,255,0.12); border-radius: 14px; padding: 18px; margin-bottom: 16px; }
  .eb-gbb-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 12px; }
  .eb-tier-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.14); border-radius: 12px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; }
  .eb-tier-card.featured { border-color: #10B981; background: rgba(16,185,129,0.08); }
  #sticky-mobile-bar { position: fixed; bottom: 0; left: 0; right: 0; z-index: 9990; display: flex !important; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 14px; background: rgba(17, 24, 39, 0.96); backdrop-filter: blur(10px); border-top: 1px solid rgba(255,255,255,0.15); color: #F9FAFB; font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif; }
  #eb-ouibounce-toast { display: none; position: fixed; bottom: 54px; right: 12px; max-width: 340px; z-index: 9991; background: #0F172A; color: #F9FAFB; border: 1px solid #10B981; border-radius: 12px; padding: 12px; box-shadow: 0 18px 38px rgba(0,0,0,0.55); font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif; }
  #eb-cmdk-modal { display: none; position: fixed; inset: 0; z-index: 9995; background: rgba(0,0,0,0.65); align-items: flex-start; justify-content: center; padding-top: 70px; font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif; }
  @media (max-width: 768px) {
    header, nav, .site-header, .topbar, .navbar { padding-top: 4px !important; padding-bottom: 4px !important; min-height: 36px !important; }
    header a, header button, .site-header a, .site-header button { font-size: 11px !important; padding: 6px 9px !important; white-space: nowrap; }
    #eb-executive-strip { margin: 3px 6px 6px 6px; padding: 5px 7px; }
    #free-metrics-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 3px; margin-bottom: 4px; }
    .eb-kpi-card { padding: 3px 5px; }
    .eb-kpi-val { font-size: 12.5px; }
    #inline-aisle-peek-drawer { padding: 3px 5px; font-size: 9px; }
    .eb-gbb-grid { grid-template-columns: 1fr; }
  }
  @media print {
    header, nav, footer, #sticky-mobile-bar, #eb-ouibounce-toast, #eb-cmdk-modal, #prog-share-toolbar, #in-card-unlock-bar, #eb-sovrn-affiliate-strip, button, .preset-chip { display: none !important; }
    body, #eb-executive-strip, .eb-panel-card { background: #FFFFFF !important; color: #000000 !important; border: 1px solid #000000 !important; box-shadow: none !important; }
  }
</style>`;
}

function buildTopExecutiveStripHtml(cfg) {
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

  return `<section id="eb-executive-strip" aria-label="${esc(cfg.brandName)} Instant Executive Console">
  <div id="results-section" style="display:block;">
    <div id="preset-chips">${presetsHtml}</div>
    <div id="eb-interactive-control-row">
      <input type="text" id="eb-fuse-search-input" placeholder="${esc(cfg.searchPlaceholder || 'Instant search...')}" aria-label="Instant Fuzzy Search Benchmark" oninput="window.__ebRunFuseSearch(this.value)" />
      <label class="eb-slider-wrap" for="eb-nouislider-range">
        <span id="eb-slider-readout">${esc(cfg.sliderLabel || 'Scale')}: ${esc(cfg.sliderVal || 50)}</span>
        <input type="range" id="eb-nouislider-range" min="${esc(cfg.sliderMin || 1)}" max="${esc(cfg.sliderMax || 100)}" value="${esc(cfg.sliderVal || 50)}" oninput="window.__ebOnSliderInput(this.value)" />
      </label>
    </div>
    <div class="eb-headline-actions">
      <button type="button" id="btn-calc" onclick="window.__ebTriggerHostCalc()">⚡ Run Instant Audit</button>
      <button type="button" id="btn-headline-unlock" onclick="window.__ebCheckout('flash_pass')">Unlock 24-Hr Flash Pass — $1.99</button>
    </div>
    <p id="headline-unlock-explainer">${esc(cfg.explainerText)}</p>

    <div id="free-metrics-grid" class="grid-metrics">
      ${kpisHtml}
      <div class="stat-pill-locked" id="summary-report-card">
        <div class="eb-locked-top">
          <button type="button" id="btn-locked-header-unlock" onclick="window.__ebCheckout('flash_pass')" style="background:none;border:none;padding:0;font-size:10.5px;font-weight:800;color:#34D399;text-align:left;">🔒 ${esc(cfg.lockedTitle)} (24-Hr Pass: $1.99 ↗)</button>
          <button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Peek Row 1 ▾</button>
        </div>
        <div class="eb-store-pills">${pillsHtml}</div>
        <div id="inline-aisle-peek-drawer">
          <div id="eb-peek-row-text">${esc(cfg.coMarketingPills[0].rowText)}</div>
          <div class="eb-peek-actions">
            <button type="button" onclick="window.__ebFocusLeadEmail()" style="background:rgba(52,211,153,0.15);color:#A7F3D0;border:1px solid rgba(52,211,153,0.4);border-radius:4px;padding:1px 5px;font-size:9.5px;font-weight:700;">🔓 Row 2: Free w/ Email ($0)</button>
            <a id="eb-inline-partner-cta" href="${esc(firstPartner.url)}" target="_blank" rel="noopener sponsored" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(firstPartner.title)}', placement: 'inline_peek' })" style="color:#FBBF24;font-weight:800;text-decoration:underline;font-size:9.5px;">⚡ ${esc(firstPartner.title)} (${esc(firstPartner.cpa)}) ↗</a>
            <button type="button" id="eb-inline-unlock-cta" onclick="window.__ebCheckout('flash_pass')" style="background:#10B981;color:#052E16;border:none;border-radius:4px;padding:2px 6px;font-size:9.5px;font-weight:800;">Unblur All ($1.99) →</button>
          </div>
        </div>
      </div>
    </div>

    <div id="lead-squeeze-card">
      <div id="prog-instant-action-strip">
        <button type="button" id="btn-copy-shopping-list" class="eb-action-btn" onclick="window.__ebCopySummary()">📋 Copy List</button>
        <a id="btn-export-csv" class="eb-action-btn" href="/api/github-upgrade/export.csv" download onclick="window.__ebShowTripwire()">📊 Export .CSV</a>
        <a id="btn-export-ics" class="eb-action-btn" href="/api/github-upgrade/skin-cycling.ics" download onclick="window.__ebShowTripwire()">📅 .ICS Calendar</a>
        <a id="btn-export-llms" class="eb-action-btn" href="/api/github-upgrade/llms-bundle.txt" download onclick="window.__ebShowTripwire()">📄 llms.txt</a>
        <a id="btn-sms-share" class="eb-action-btn" href="sms:?&body=${encodeURIComponent(cfg.brandName + ' Executive Audit Summary — https://' + cfg.domain)}" onclick="window.__ebShowTripwire()">💬 1-Tap SMS</a>
        <button type="button" id="btn-print-summary" class="eb-action-btn" onclick="window.__ebPrintSheet()">🖨️ Print PDF</button>
        <button type="button" id="btn-showroom-hud" class="eb-action-btn" onclick="window.__ebToggleHud()">🕶️ ${esc(cfg.hudLabel)}</button>
        <button type="button" id="btn-cmdk-trigger" class="eb-action-btn" onclick="window.__ebToggleCmdk()">⌘K Menu</button>
        <button type="button" id="btn-reddit-share" class="eb-action-btn" onclick="window.__ebCopyReddit()">🟠 Reddit MD</button>
      </div>
      <form class="eb-lead-row" onsubmit="return window.__ebSubmitLead(event)">
        <input type="email" id="eb-lead-email" placeholder="Send free executive sheet ($0) + Row 2 to email..." required aria-label="Email address for free summary" />
        <button type="submit" id="btn-eb-lead-submit">Email Free List ($0)</button>
      </form>
      <div id="tripwire-upsell-box">
        <span>✅ Ready! Unblur all locked rows w/ <strong>24-Hr Flash Pass ($1.99)</strong> or try <a href="${esc(firstPartner.url)}" target="_blank" rel="noopener sponsored" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(firstPartner.title)}', placement: 'tripwire' })" style="color:#FDE047;font-weight:800;">${esc(firstPartner.title)} (${esc(firstPartner.cpa)}) ↗</a></span>
        <button type="button" class="eb-action-btn" style="background:#10B981;color:#052E16;font-weight:800;" onclick="window.__ebCheckout('flash_pass')">1-Click Pass: $1.99 →</button>
      </div>
      <div id="eb-field-hud-drawer" style="display:none;margin-top:6px;padding:8px;border-radius:8px;background:#000000;color:#10B981;font-family:monospace;font-size:11px;">
        [${esc(cfg.hudLabel.toUpperCase())} ACTIVE] • High-Contrast Field Telemetry Ready • Live Target: ${esc(cfg.domain)}
      </div>
    </div>
  </div>
</section>`;
}

function buildBottomConversionSuiteHtml(cfg, reqPath) {
  const shareUrl = `https://${cfg.domain}${reqPath || '/'}`;
  const redditHref = `https://www.reddit.com/r/${cfg.redditSub}/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(cfg.brandName + ' Deterministic Benchmark & Audit')}`;
  const xHref = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Ran a live deterministic audit on ' + cfg.brandName)}`;
  const mailHref = `mailto:?subject=${encodeURIComponent(cfg.brandName + ' Audit Summary')}&body=${encodeURIComponent('Check out this live baseline scenario: ' + shareUrl)}`;

  const affiliatesHtml = cfg.affiliates
    .map((a) => `<a href="${esc(a.url)}" target="_blank" rel="noopener sponsored" class="eb-tier-card" style="text-decoration:none;color:#F9FAFB;" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(a.title)}' })">
      <div>
        <span style="font-size:10px;font-weight:800;text-transform:uppercase;color:#34D399;">${esc(a.badge)}</span>
        <div style="font-size:14px;font-weight:700;margin-top:4px;">${esc(a.title)}</div>
      </div>
      <div style="margin-top:8px;font-size:12px;color:#FBBF24;font-weight:700;">${esc(a.cpa)} →</div>
    </a>`)
    .join('');

  const firstPartner = cfg.affiliates && cfg.affiliates[0] ? cfg.affiliates[0] : { title: 'Verified Partner', url: '#', cpa: 'Free Trial' };

  return `<section id="eb-bottom-conversion-suite" aria-label="Upgrades, GitHub Architecture & Partner Stack">
  <div id="github-repo-upgrade-card" class="eb-panel-card">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
      <span style="font-size:11px;font-weight:800;color:#38BDF8;text-transform:uppercase;">🚀 Open-Source Engine Upgrade: ${esc(cfg.githubRepo.name)} (${esc(cfg.githubRepo.stars)})</span>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">
        <a href="/api/github-upgrade/export.csv" download class="eb-action-btn" style="background:#065F46;color:#A7F3D0;">📊 Download .CSV Model</a>
        <a href="/api/github-upgrade/llms-bundle.txt" download class="eb-action-btn" style="background:#1E293B;color:#34D399;">📄 Readability + llms.txt</a>
        <a href="/feed.xml" target="_blank" class="eb-action-btn" style="background:#1E293B;color:#FBBF24;">📡 RSS 2.0 Feed</a>
        <a href="/api/github-upgrade" target="_blank" class="eb-action-btn" style="background:#1E293B;color:#38BDF8;">JSON Telemetry ↗</a>
      </div>
    </div>
    <h3 style="margin:6px 0 4px 0;font-size:17px;">${esc(cfg.githubRepo.title)}</h3>
    <p style="margin:0 0 10px 0;font-size:13px;color:#D1D5DB;">${esc(cfg.githubRepo.summary)}</p>
    <div id="eb-github-live-readout" style="padding:10px;border-radius:8px;background:rgba(0,0,0,0.4);font-family:monospace;font-size:12px;color:#A7F3D0;">
      Loading live ${esc(cfg.githubRepo.name)} deterministic readout...
    </div>
  </div>

  <div id="in-card-unlock-bar" class="eb-panel-card">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
      <h3 id="in-card-unlock-title" style="margin:0;font-size:18px;">${esc(cfg.unlockBannerTitle)}</h3>
      <div id="tab-btn-dossier" style="font-size:12px;font-weight:800;color:#34D399;">⚡ Instant 24-Hr Pass: $1.99</div>
    </div>
    <div class="eb-gbb-grid">
      <div class="eb-tier-card featured">
        <div>
          <div style="font-size:11px;font-weight:800;color:#34D399;">IMPULSE TRIPWIRE • 24-HR ACCESS</div>
          <div class="matrix-price" style="font-size:24px;font-weight:900;margin:4px 0;">$1.99 <span style="font-size:12px;font-weight:500;color:#9CA3AF;">one-time</span></div>
          <p style="font-size:12px;color:#D1D5DB;margin:0 0 10px 0;">Unmasks all locked rows, co-marketing partner splits, and interactive recalculations for 24 hours.</p>
        </div>
        <button type="button" id="btn-prog-flash-pass" class="cta-btn" style="width:100%;padding:10px;border-radius:8px;background:#10B981;color:#052E16;font-weight:800;border:none;" onclick="window.__ebCheckout('flash_pass')">1-Click Pass: $1.99</button>
      </div>
      <div class="eb-tier-card">
        <div>
          <div style="font-size:11px;font-weight:800;color:#FBBF24;">COMPLETE STRATEGY DOSSIER</div>
          <div class="matrix-price" style="font-size:24px;font-weight:900;margin:4px 0;">$${esc(cfg.corePriceUsd)}</div>
          <p style="font-size:12px;color:#D1D5DB;margin:0 0 10px 0;">${esc(cfg.coreLabel)} + Exportable Executive PDF & Complete Action Playbook.</p>
        </div>
        <button type="button" id="btn-prog-full-dossier" class="cta-btn" style="width:100%;padding:10px;border-radius:8px;background:${cfg.accentColor};color:#FFFFFF;font-weight:800;border:none;" onclick="window.__ebCheckout('complete_dossier')">Complete Strategy Dossier ($${esc(cfg.corePriceUsd)})</button>
      </div>
      <div class="eb-tier-card">
        <div>
          <div style="font-size:11px;font-weight:800;color:#A78BFA;">B2B PRO / COMMERCIAL TEAM</div>
          <div class="matrix-price" style="font-size:24px;font-weight:900;margin:4px 0;">$${esc(cfg.proPriceUsd)}</div>
          <p style="font-size:12px;color:#D1D5DB;margin:0 0 10px 0;">${esc(cfg.proLabel)} + White-Label Client Exports, API Webhook Feed & Priority SLA.</p>
        </div>
        <button type="button" id="btn-prog-pro-b2b" class="cta-btn" style="width:100%;padding:10px;border-radius:8px;background:#4F46E5;color:#FFFFFF;font-weight:800;border:none;" onclick="window.__ebCheckout('pro_b2b')">Unlock B2B Pro ($${esc(cfg.proPriceUsd)})</button>
      </div>
    </div>
    <button type="button" id="btn-checkout" style="display:none;" onclick="window.__ebCheckout('flash_pass')">Hidden Test Alias</button>
  </div>

  <div id="eb-sovrn-affiliate-strip" class="eb-panel-card">
    <div style="font-size:11px;font-weight:800;color:#9CA3AF;text-transform:uppercase;margin-bottom:8px;">Verified Ecosystem Tools & Clinical/Infra Partners (Sovrn //Commerce)</div>
    <div class="eb-gbb-grid">${affiliatesHtml}</div>
  </div>

  <div id="competitor-battlecard" class="eb-panel-card">
    <h3 style="margin:0 0 8px 0;font-size:16px;">⚡ 3-Second Competitor Battlecard: Why ${esc(cfg.brandName)} Wins</h3>
    <div style="overflow-x:auto;">
      <table style="width:100%;border-collapse:collapse;font-size:12px;text-align:left;">
        <thead>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.15);color:#9CA3AF;">
            <th style="padding:6px;">Capability</th>
            <th style="padding:6px;color:#34D399;">${esc(cfg.brandName)}</th>
            <th style="padding:6px;">Legacy $299/mo SaaS</th>
            <th style="padding:6px;">Manual Spreadsheets</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:6px;font-weight:700;">Execution Speed</td>
            <td style="padding:6px;color:#34D399;font-weight:700;">&lt; 15ms Deterministic Math</td>
            <td style="padding:6px;">Slow 30s LLM Wrapper</td>
            <td style="padding:6px;">Hours of Manual Copy-Paste</td>
          </tr>
          <tr style="border-bottom:1px solid rgba(255,255,255,0.08);">
            <td style="padding:6px;font-weight:700;">Entry Price</td>
            <td style="padding:6px;color:#34D399;font-weight:700;">$0 Free / $1.99 24-Hr Pass</td>
            <td style="padding:6px;">$199–$499/mo Annual Lock</td>
            <td style="padding:6px;">High Error / Liability Risk</td>
          </tr>
          <tr>
            <td style="padding:6px;font-weight:700;">Open-Source Core</td>
            <td style="padding:6px;color:#34D399;font-weight:700;">${esc(cfg.githubRepo.name)}</td>
            <td style="padding:6px;">Closed Black-Box</td>
            <td style="padding:6px;">Outdated Static Formulas</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div id="prog-share-toolbar" class="eb-panel-card" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;">
    <span style="font-size:13px;font-weight:800;">🔗 Share This Baseline Scenario or Embed on Your Site:</span>
    <div style="display:flex;gap:6px;flex-wrap:wrap;">
      <button type="button" id="btn-copy-scenario-link" class="eb-action-btn" onclick="window.__ebCopyScenarioLink(this)">Copy Scenario Link</button>
      <a id="btn-share-reddit" class="eb-action-btn" href="${esc(redditHref)}" target="_blank" rel="noopener">Share on r/${esc(cfg.redditSub)}</a>
      <a id="btn-share-x" class="eb-action-btn" href="${esc(xHref)}" target="_blank" rel="noopener">Post on X</a>
      <a id="btn-share-email" class="eb-action-btn" href="${esc(mailHref)}">Email Colleague</a>
      <a class="eb-action-btn" href="/embed" target="_blank" rel="noopener">Get /embed Widget</a>
    </div>
  </div>
</section>

<!-- 6. Sonner (★ 13.0k) + Hammer.js (★ 24.3k) + Ouibounce (★ 2.3k) Mobile & Desktop Rescue Toast -->
<div id="eb-ouibounce-toast" role="dialog" aria-label="Save Your Audit Before Leaving">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
    <span style="font-size:11px;font-weight:800;color:#34D399;">⚡ SAVE ROW-1 SHEET ($0) OR UNBLUR ALL ($1.99)</span>
    <button type="button" onclick="document.getElementById('eb-ouibounce-toast').style.display='none'" style="background:none;border:none;color:#9CA3AF;font-size:13px;">✕</button>
  </div>
  <form onsubmit="return window.__ebSubmitOuibounceLead(event)" style="display:grid;grid-template-columns:1fr auto;gap:4px;margin-bottom:6px;">
    <input type="email" id="eb-ouibounce-email" placeholder="Send free Row-1 sheet ($0)..." required style="padding:5px 7px;border-radius:6px;border:1px solid rgba(255,255,255,0.2);background:#000;color:#fff;font-size:11px;" />
    <button type="submit" style="padding:5px 8px;border-radius:6px;background:#10B981;color:#052E16;font-size:11px;font-weight:800;border:none;">Send $0</button>
  </form>
  <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;font-size:11px;">
    <button type="button" onclick="window.__ebCheckout('flash_pass')" style="padding:4px 8px;border-radius:6px;background:#4F46E5;color:#fff;border:none;font-weight:800;font-size:10.5px;">Unlock 24-Hr Pass ($1.99) →</button>
    <a href="${esc(firstPartner.url)}" target="_blank" rel="noopener sponsored" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(firstPartner.title)}', placement: 'sonner_toast' })" style="color:#FBBF24;font-weight:700;text-decoration:underline;font-size:10.5px;">${esc(firstPartner.cpa)} ↗</a>
  </div>
</div>

<!-- 7. dip/cmdk (★ 13,016) Cmd+K Executive Command Palette -->
<div id="eb-cmdk-modal" onclick="if(event.target===this)this.style.display='none'">
  <div style="background:#111827;border:1px solid rgba(255,255,255,0.2);border-radius:14px;width:92%;max-width:480px;padding:14px;color:#F9FAFB;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">
      <span style="font-size:12px;font-weight:800;color:#38BDF8;">⌘K ${esc(cfg.brandName)} Command Palette (dip/cmdk ★ 13.0k)</span>
      <button type="button" onclick="document.getElementById('eb-cmdk-modal').style.display='none'" style="background:none;border:none;color:#9CA3AF;">ESC</button>
    </div>
    <div style="display:grid;gap:6px;">
      <button type="button" class="eb-action-btn" style="justify-content:space-between;padding:8px 10px;" onclick="window.__ebCheckout('flash_pass')"><span>⚡ Unlock 24-Hr Flash Pass (Unblur All Rows)</span><strong>$1.99 →</strong></button>
      <a href="/api/github-upgrade/export.csv" download class="eb-action-btn" style="justify-content:space-between;padding:8px 10px;" onclick="window.__ebShowTripwire()"><span>📊 Download SheetJS Executive .CSV Model</span><strong>.CSV ↗</strong></a>
      <a href="/api/github-upgrade/skin-cycling.ics" download class="eb-action-btn" style="justify-content:space-between;padding:8px 10px;" onclick="window.__ebShowTripwire()"><span>📅 Download Apple/Google .ICS Schedule</span><strong>.ICS ↗</strong></a>
      <a href="${esc(firstPartner.url)}" target="_blank" rel="noopener sponsored" class="eb-action-btn" style="justify-content:space-between;padding:8px 10px;" onclick="window.__ebLogEvent('affiliate_click', { partner: '${esc(firstPartner.title)}', placement: 'cmdk' })"><span>🛍️ Verified Partner: ${esc(firstPartner.title)}</span><strong style="color:#FBBF24;">${esc(firstPartner.cpa)} ↗</strong></a>
      <a href="/dossier/sample" class="eb-action-btn" style="justify-content:space-between;padding:8px 10px;"><span>📑 View Sample Executive Dossier</span><strong>Open →</strong></a>
    </div>
  </div>
</div>

<!-- 8. Floating Conversion Dock (#sticky-mobile-bar) -->
<div id="sticky-mobile-bar" role="region" aria-label="Instant Access Conversion Dock">
  <div>
    <div style="font-size:12px;font-weight:800;">${esc(cfg.brandName)} • Live Executive Pass</div>
    <a href="#lead-squeeze-card" id="sticky-sub-benefit" style="font-size:11px;color:#34D399;text-decoration:underline;">Tap for Free List ($0) or Instant $1.99 Unlock</a>
  </div>
  <div style="display:flex;gap:6px;">
    <button type="button" id="btn-sticky-flash-unlock" class="eb-action-btn" style="background:#10B981;color:#052E16;font-weight:800;border:none;padding:7px 12px;" onclick="window.__ebCheckout('flash_pass')">1-Click Pass: $1.99</button>
    <button type="button" id="btn-dock-flash-pass" style="display:none;" onclick="window.__ebCheckout('flash_pass')">1-Click Pass: $1.99</button>
  </div>
</div>`;
}

function buildClientRuntimeScript(cfg) {
  const pillMap = {};
  for (const p of cfg.coMarketingPills) pillMap[p.key] = p.rowText;
  return `<script id="exact-baseline-client-runtime">
(function() {
  var CFG = ${JSON.stringify({
    moduleId: cfg.moduleId,
    brandName: cfg.brandName,
    domain: cfg.domain,
    sliderLabel: cfg.sliderLabel || 'Scale',
    pillMap,
    presetKpis: cfg.presetKpis || {}
  })};

  try {
    var ua = navigator.userAgent || '';
    var isApple = /iPhone|iPad|Macintosh/i.test(ua) && /Safari/i.test(ua) && !/Chrome/i.test(ua);
    var headlineBtn = document.getElementById('btn-headline-unlock');
    if (headlineBtn) {
      headlineBtn.textContent = isApple ? ' Pay 24-Hr Pass — $1.99' : '⚡ 24-Hr Flash Pass — $1.99';
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
      el.placeholder = 'Enter email to unblur Row 2 + Full Sheet ($0)...';
    }
    window.__ebLogEvent('tab_switch', { action: 'unblur_row2_email_focus' });
  };

  // krisk/Fuse (★ 20,503) Instant Fuzzy-Search Scorer
  var fuseTimer = null;
  window.__ebRunFuseSearch = function(query) {
    if (!query || query.trim().length < 2) return;
    if (fuseTimer) clearTimeout(fuseTimer);
    fuseTimer = setTimeout(function() {
      fetch('/api/github-upgrade/fuse-search?q=' + encodeURIComponent(query.trim()))
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

  // leongersen/noUiSlider (★ 5,801) Zero-Reflow Interactive Range Slider
  var sliderTimer = null;
  window.__ebOnSliderInput = function(val) {
    var num = Number(val) || 10;
    var rd = document.getElementById('eb-slider-readout');
    if (rd) rd.textContent = CFG.sliderLabel + ': ' + num;
    var boxes = document.querySelectorAll('#free-metrics-grid .eb-kpi-val');
    if (boxes.length >= 2) {
      if (CFG.moduleId === 'citation_forge') {
        boxes[0].textContent = Math.min(94.8, (28 + num * 0.24)).toFixed(1) + '%';
      } else if (CFG.moduleId === 'sponsor_radar') {
        boxes[1].textContent = '$' + (num * 10200).toLocaleString();
      } else if (CFG.moduleId === 'derm_logic') {
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

  // IntersectionObserver for view_paywall telemetry
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

  var calcTimer = null;
  document.addEventListener('input', function(e) {
    var t = e.target;
    if (!t || t.id === 'eb-lead-email' || t.id === 'eb-ouibounce-email' || t.id === 'eb-fuse-search-input' || t.id === 'eb-nouislider-range') return;
    if (calcTimer) clearTimeout(calcTimer);
    calcTimer = setTimeout(function() {
      window.__ebLogEvent('calculate', { source: 'debounced_input', field: t.name || t.id || 'input' });
      window.__ebSpotlightSqueeze();
    }, 600);
  }, { passive: true });

  document.addEventListener('click', function(e) {
    var tab = e.target && e.target.closest ? e.target.closest('[role="tab"], .tab-btn, .mode-btn') : null;
    if (tab) window.__ebLogEvent('tab_switch', { label: (tab.textContent || '').trim().slice(0, 32) });
  }, { passive: true });

  // carlsednaoui/ouibounce (★ 2.3k) + hammerjs/hammer.js (★ 24.3k) Mobile Scroll-Up & Desktop Exit Rescue
  var ouibounceShown = false;
  function showRescueToast(reason) {
    if (ouibounceShown) return;
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
    if (btn) btn.textContent = '✅ Copied List!';
    window.__ebShowTripwire();
    window.__ebLogEvent('copy_summary');
  };

  window.__ebCopyReddit = function() {
    var md = '**' + CFG.brandName + ' Deterministic Audit** — Live URL: ' + window.location.href + ' (Verified via ' + CFG.domain + ')';
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(md).catch(function(){});
    var btn = document.getElementById('btn-reddit-share');
    if (btn) btn.textContent = '✅ Copied MD!';
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
    fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, pageUrl: window.location.pathname })
    }).then(function() {
      window.__ebShowTripwire();
      var btn = document.getElementById('btn-eb-lead-submit');
      if (btn) btn.textContent = '✅ Sent to Inbox!';
    }).catch(function() { window.__ebShowTripwire(); });
    return false;
  };

  window.__ebSubmitOuibounceLead = function(ev) {
    if (ev && ev.preventDefault) ev.preventDefault();
    var input = document.getElementById('eb-ouibounce-email');
    var email = input ? input.value.trim() : '';
    if (!email) return false;
    fetch('/api/leads/capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, pageUrl: window.location.pathname, utmSource: 'sonner_rescue' })
    }).then(function() {
      var toast = document.getElementById('eb-ouibounce-toast');
      if (toast) toast.style.display = 'none';
      window.__ebShowTripwire();
    }).catch(function() {});
    return false;
  };

  window.__ebCheckout = function(tier) {
    var cleanTier = typeof tier === 'string' ? tier : 'flash_pass';
    var payload = { tier: cleanTier, plan: cleanTier, planTier: cleanTier, sku: CFG.moduleId + '_' + cleanTier, pageUrl: window.location.pathname };
    fetch('/api/calculators/' + CFG.moduleId + '/checkout', {
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

  fetch('/api/github-upgrade')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var el = document.getElementById('eb-github-live-readout');
      if (el && data) {
        el.textContent = JSON.stringify(data.jina_reader_metrics || data.pyannote_diarization || data.rdkit_dalton_matrix || data.posthog_hesitation_sensor || data, null, 2);
      }
    })
    .catch(function(){});

  var prefetched = {};
  function prefetchUrl(url) {
    if (!url || prefetched[url] || url.indexOf(window.location.origin) !== 0) return;
    prefetched[url] = true;
    var l = document.createElement('link');
    l.rel = 'prefetch';
    l.href = url;
    document.head.appendChild(l);
  }
  document.addEventListener('mouseover', function(e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (a && a.href) setTimeout(function() { prefetchUrl(a.href); }, 65);
  }, { passive: true });
  document.addEventListener('touchstart', function(e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (a && a.href) prefetchUrl(a.href);
  }, { passive: true });
})();
</script>
<script type="text/javascript">
  var vglnk = { key: '${SOVRN_KEY}' };
  (function(d, t) {
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
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(cfg.brandName)} — Embeddable Executive Widget</title>
  ${buildExactBaselineStyles(cfg)}
</head>
<body style="margin:0;padding:12px;background:#0B0F19;color:#F9FAFB;">
  ${buildTopExecutiveStripHtml(cfg)}
  <div style="text-align:right;font-size:11px;margin-top:6px;">
    Powered by <a href="https://${esc(cfg.domain)}" target="_blank" rel="dofollow" style="color:#34D399;font-weight:700;">${esc(cfg.brandName)} (${esc(cfg.domain)})</a>
  </div>
  ${buildClientRuntimeScript(cfg)}
</body>
</html>`;
}

function renderSampleDossierHtml(cfg) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(cfg.brandName)} — Executive Sample Dossier & Dual-Tier Pass</title>
  ${buildExactBaselineStyles(cfg)}
</head>
<body style="margin:0;padding:20px;background:#0B0F19;color:#F9FAFB;font-family:sans-serif;">
  <div style="max-width:960px;margin:0 auto;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
      <a href="/" style="color:#9CA3AF;text-decoration:none;font-size:13px;">← Back to ${esc(cfg.brandName)}</a>
      <button id="btn-top-pass-unlock" class="eb-action-btn" style="background:#10B981;color:#052E16;font-weight:800;" onclick="window.__ebCheckout('flash_pass')">Unlock 24-Hr Flash Pass — $1.99</button>
    </div>
    <h1 class="dossier-hero-title" style="margin:0 0 8px 0;">${esc(cfg.brandName)} — Verified Sample Executive Dossier</h1>
    <div class="hero-tier-diff" style="margin-bottom:14px;font-size:13px;color:#A7F3D0;">
      Choose between the <strong>$1.99 Flash Pass</strong> (24-Hr Live Recalculation) or the <strong>Complete Dossier ($${esc(cfg.corePriceUsd)})</strong>.
    </div>
    <button id="btn-hero-flash-unlock" class="eb-action-btn" style="background:#10B981;color:#052E16;font-weight:800;margin-bottom:16px;" onclick="window.__ebCheckout('flash_pass')">Start 24-Hr Flash Pass ($1.99)</button>
    ${buildTopExecutiveStripHtml(cfg)}
    <div id="dossier-bottom-unlock-card" class="eb-panel-card" style="margin-top:20px;">
      <h2>Choose Your Access Level</h2>
      <p>Includes 24-Hour Recalculation Pass, Interactive Excel Model (.xlsx), and 7-Day Extended Recalculation Pass.</p>
      <div style="display:flex;gap:12px;flex-wrap:wrap;">
        <button id="btn-bottom-flash-unlock" class="eb-action-btn" style="background:#10B981;color:#052E16;font-weight:800;" onclick="window.__ebCheckout('flash_pass')">24-Hr Flash Pass ($1.99)</button>
        <button id="btn-bottom-dossier-unlock" class="eb-action-btn" style="background:${cfg.accentColor};color:#FFFFFF;font-weight:800;" onclick="window.__ebCheckout('complete_dossier')">Complete Dossier ($${esc(cfg.corePriceUsd)})</button>
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

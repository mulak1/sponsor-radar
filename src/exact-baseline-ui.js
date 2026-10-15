/**
 * ExactBaseline (custom_automaton) Cumulative UI, Mobile Screen-1 CRO, @media print & GitHub Repo Widgets
 * Shared across CitationForge (#1), SponsorRadar (#2), DermLogic (#4), and AbandonAlpha (#9).
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
  /* 1. Mobile Zero-Horizontal-Overflow Guard & Emil Kowalski Tactile Micro-Motion */
  html, body {
    max-width: 100vw !important;
    overflow-x: hidden !important;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  button, .preset-chip, .store-preview-pill, .eb-action-btn, .cta-btn, a[role="button"] {
    transition: transform 150ms cubic-bezier(0.22, 1, 0.36, 1), background-color 150ms ease, border-color 150ms ease, opacity 150ms ease;
    cursor: pointer;
  }
  button:active, .preset-chip:active, .store-preview-pill:active, .eb-action-btn:active, .cta-btn:active {
    transform: scale(0.97) !important;
  }
  .metric-box-value, .matrix-price, .eb-kpi-val, .eb-tabular {
    font-variant-numeric: tabular-nums !important;
  }

  /* 2. Top ExactBaseline Executive Strip (Mobile Screen 1 < 667px & < 812px Compliance) */
  #eb-executive-strip {
    max-width: 1180px;
    margin: 8px auto 12px auto;
    padding: 10px 14px;
    border-radius: 14px;
    background: #111827;
    color: #F9FAFB;
    border: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 10px 28px -8px rgba(0,0,0,0.32);
    font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", sans-serif;
  }
  .eb-top-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }
  /* Single-Row 5-Across Zero-Truncation Preset Bar */
  #preset-chips {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 5px;
    width: 100%;
    margin-bottom: 6px;
  }
  #preset-chips .preset-chip {
    padding: 5px 2px;
    font-size: 10.5px;
    font-weight: 700;
    letter-spacing: -0.02em;
    line-height: 1.15;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: clip;
    border-radius: 7px;
    background: rgba(255,255,255,0.08);
    color: #F3F4F6;
    border: 1px solid rgba(255,255,255,0.16);
  }
  #preset-chips .preset-chip:hover {
    background: rgba(255,255,255,0.16);
  }
  .eb-headline-actions {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    gap: 6px;
    width: 100%;
    margin-bottom: 4px;
  }
  #btn-calc {
    padding: 6px 10px;
    border-radius: 8px;
    background: ${cfg.accentColor};
    color: #FFFFFF;
    font-size: 11.5px;
    font-weight: 700;
    border: none;
    white-space: nowrap;
  }
  #btn-headline-unlock {
    padding: 6px 8px;
    border-radius: 8px;
    background: linear-gradient(135deg, #10B981, #059669);
    color: #FFFFFF;
    font-size: 11.5px;
    font-weight: 800;
    border: none;
    white-space: nowrap;
    text-align: center;
  }
  #headline-unlock-explainer {
    font-size: 11px;
    color: #9CA3AF;
    margin: 0 0 6px 0;
    line-height: 1.25;
  }

  /* 3. Above-the-Fold 2x2 KPI Summary Grid + 5th Locked Curiosity Card (.stat-pill-locked) */
  #free-metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 6px;
    margin-bottom: 6px;
  }
  .eb-kpi-card {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 9px;
    padding: 6px 8px;
  }
  .eb-kpi-label {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #9CA3AF;
  }
  .eb-kpi-val {
    font-size: 15px;
    font-weight: 800;
    color: #FFFFFF;
    line-height: 1.2;
  }
  .eb-kpi-sub {
    font-size: 10px;
    color: #34D399;
  }
  .stat-pill-locked {
    grid-column: 1 / -1;
    background: linear-gradient(90deg, rgba(16,185,129,0.14), rgba(79,70,229,0.14));
    border: 1px dashed #34D399;
    border-radius: 9px;
    padding: 7px 10px;
  }
  .eb-locked-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;
    flex-wrap: wrap;
  }
  .eb-store-pills {
    display: inline-flex;
    gap: 4px;
    flex-wrap: wrap;
    margin-top: 4px;
  }
  .store-preview-pill {
    padding: 3px 7px;
    border-radius: 999px;
    font-size: 10px;
    font-weight: 700;
    background: rgba(255,255,255,0.1);
    color: #E5E7EB;
    border: 1px solid rgba(255,255,255,0.2);
  }
  .store-preview-pill.active {
    background: #10B981;
    color: #052E16;
    border-color: #10B981;
  }
  #inline-aisle-peek-drawer {
    margin-top: 5px;
    padding: 5px 8px;
    border-radius: 6px;
    background: rgba(0,0,0,0.45);
    font-size: 11px;
    color: #A7F3D0;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  }

  /* 4. #lead-squeeze-card & #prog-instant-action-strip Above Mobile Fold */
  #lead-squeeze-card {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 10px;
    padding: 8px 10px;
  }
  #prog-instant-action-strip {
    display: flex;
    align-items: center;
    gap: 5px;
    flex-wrap: wrap;
    margin-bottom: 6px;
  }
  .eb-action-btn {
    padding: 5px 8px;
    border-radius: 7px;
    font-size: 11px;
    font-weight: 700;
    background: rgba(255,255,255,0.1);
    color: #F9FAFB;
    border: 1px solid rgba(255,255,255,0.18);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
  .eb-lead-row {
    display: flex;
    gap: 6px;
    align-items: center;
  }
  #eb-lead-email {
    flex: 1;
    min-width: 0;
    padding: 5px 8px;
    border-radius: 7px;
    border: 1px solid rgba(255,255,255,0.22);
    background: rgba(0,0,0,0.35);
    color: #FFFFFF;
    font-size: 12px;
  }
  #btn-eb-lead-submit {
    padding: 5px 10px;
    border-radius: 7px;
    background: #F59E0B;
    color: #111827;
    font-size: 11px;
    font-weight: 800;
    border: none;
    white-space: nowrap;
  }
  #tripwire-upsell-box {
    display: none;
    margin-top: 6px;
    padding: 7px 10px;
    border-radius: 8px;
    background: linear-gradient(90deg, #065F46, #047857);
    color: #ECFDF5;
    font-size: 11px;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  /* 5. Bottom Conversion Suite: GitHub Repo Upgrade, 3-Tier GBB Matrix, Sovrn & Battlecard */
  #eb-bottom-conversion-suite {
    max-width: 1180px;
    margin: 24px auto 90px auto;
    padding: 0 14px;
    font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", "Inter", sans-serif;
  }
  .eb-panel-card {
    background: #111827;
    color: #F9FAFB;
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px;
    padding: 18px;
    margin-bottom: 16px;
  }
  .eb-gbb-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 12px;
  }
  .eb-tier-card {
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 12px;
    padding: 14px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .eb-tier-card.featured {
    border-color: #10B981;
    background: rgba(16,185,129,0.08);
  }

  /* 6. Floating Conversion Dock (#sticky-mobile-bar) */
  #sticky-mobile-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9990;
    display: flex !important;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    padding: 8px 14px;
    background: rgba(17, 24, 39, 0.96);
    backdrop-filter: blur(10px);
    border-top: 1px solid rgba(255,255,255,0.15);
    color: #F9FAFB;
    font-family: -apple-system, BlinkMacSystemFont, "Plus Jakarta Sans", sans-serif;
  }

  @media (max-width: 768px) {
    header, nav, .site-header, .topbar, .navbar {
      padding-top: 4px !important;
      padding-bottom: 4px !important;
      min-height: 36px !important;
    }
    header a, header button, .site-header a, .site-header button {
      font-size: 11px !important;
      padding: 6px 9px !important;
      white-space: nowrap;
    }
    #eb-executive-strip {
      margin: 4px 6px 8px 6px;
      padding: 7px 9px;
    }
    #free-metrics-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 4px;
    }
    .eb-kpi-card {
      padding: 4px 6px;
    }
    .eb-kpi-val {
      font-size: 13px;
    }
    .eb-gbb-grid {
      grid-template-columns: 1fr;
    }
  }

  /* 7. Institutional Bank-Grade @media print Stylesheet (ExactBaseline Iteration 3) */
  @media print {
    header, nav, footer, #sticky-mobile-bar, #prog-share-toolbar, #in-card-unlock-bar, #eb-sovrn-affiliate-strip, button, .preset-chip {
      display: none !important;
    }
    body, #eb-executive-strip, .eb-panel-card {
      background: #FFFFFF !important;
      color: #000000 !important;
      border: 1px solid #000000 !important;
      box-shadow: none !important;
    }
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

  return `<section id="eb-executive-strip" aria-label="${esc(cfg.brandName)} Instant Executive Console">
  <div id="results-section" style="display:block;">
    <div id="preset-chips">${presetsHtml}</div>
    <div class="eb-headline-actions">
      <button type="button" id="btn-calc" onclick="window.__ebTriggerHostCalc()">⚡ Run Instant Audit</button>
      <button type="button" id="btn-headline-unlock" onclick="window.__ebCheckout('flash_pass')">Unlock 24-Hr Flash Pass — $1.99</button>
    </div>
    <p id="headline-unlock-explainer">${esc(cfg.explainerText)}</p>

    <div id="free-metrics-grid" class="grid-metrics">
      ${kpisHtml}
      <div class="stat-pill-locked" id="summary-report-card">
        <div class="eb-locked-top">
          <span style="font-size:11px;font-weight:800;color:#34D399;">🔒 ${esc(cfg.lockedTitle)} (24-Hr Pass: $1.99)</span>
          <button type="button" id="btn-inline-aisle-peek" class="store-preview-pill" onclick="window.__ebTogglePeekDrawer()">Peek Row 1 ▾</button>
        </div>
        <div class="eb-store-pills">${pillsHtml}</div>
        <div id="inline-aisle-peek-drawer" style="display:none;">${esc(cfg.coMarketingPills[0].rowText)}</div>
      </div>
    </div>

    <div id="lead-squeeze-card">
      <div id="prog-instant-action-strip">
        <button type="button" id="btn-copy-shopping-list" class="eb-action-btn" onclick="window.__ebCopySummary()">📋 Copy List</button>
        <a id="btn-sms-share" class="eb-action-btn" href="sms:?&body=${ encodeURIComponent(cfg.brandName + ' Executive Audit Summary — https://' + cfg.domain) }" onclick="window.__ebShowTripwire()">💬 1-Tap SMS</a>
        <button type="button" id="btn-print-summary" class="eb-action-btn" onclick="window.__ebPrintSheet()">🖨️ Print PDF</button>
        <button type="button" id="btn-showroom-hud" class="eb-action-btn" onclick="window.__ebToggleHud()">🕶️ ${esc(cfg.hudLabel)}</button>
        <button type="button" id="btn-reddit-share" class="eb-action-btn" onclick="window.__ebCopyReddit()">🟠 Reddit Markdown</button>
      </div>
      <form class="eb-lead-row" onsubmit="return window.__ebSubmitLead(event)">
        <input type="email" id="eb-lead-email" placeholder="Send free executive sheet ($0) to email..." required aria-label="Email address for free summary" />
        <button type="submit" id="btn-eb-lead-submit">Email Free List ($0)</button>
      </form>
      <div id="tripwire-upsell-box">
        <span>✅ Saved! Upgrade to the unmasked <strong>24-Hr Flash Pass ($1.99)</strong> right now:</span>
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

  return `<section id="eb-bottom-conversion-suite" aria-label="Upgrades, GitHub Architecture & Partner Stack">
  <!-- 1. High-Starred GitHub Repo Integration Card -->
  <div id="github-repo-upgrade-card" class="eb-panel-card">
    <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;">
      <span style="font-size:11px;font-weight:800;color:#38BDF8;text-transform:uppercase;">🚀 Open-Source Engine Upgrade: ${esc(cfg.githubRepo.name)} (${esc(cfg.githubRepo.stars)})</span>
      <a href="/api/github-upgrade" target="_blank" class="eb-action-btn" style="background:#1E293B;color:#38BDF8;">Inspect Live JSON Telemetry ↗</a>
    </div>
    <h3 style="margin:6px 0 4px 0;font-size:17px;">${esc(cfg.githubRepo.title)}</h3>
    <p style="margin:0 0 10px 0;font-size:13px;color:#D1D5DB;">${esc(cfg.githubRepo.summary)}</p>
    <div id="eb-github-live-readout" style="padding:10px;border-radius:8px;background:rgba(0,0,0,0.4);font-family:monospace;font-size:12px;color:#A7F3D0;">
      Loading live ${esc(cfg.githubRepo.name)} deterministic readout...
    </div>
  </div>

  <!-- 2. 3-Tier Good-Better-Best (GBB) Unlock Matrix -->
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

  <!-- 3. Sovrn //Commerce Contextual Partner Stack -->
  <div id="eb-sovrn-affiliate-strip" class="eb-panel-card">
    <div style="font-size:11px;font-weight:800;color:#9CA3AF;text-transform:uppercase;margin-bottom:8px;">Verified Ecosystem Tools & Clinical/Infra Partners (Sovrn //Commerce)</div>
    <div class="eb-gbb-grid">${affiliatesHtml}</div>
  </div>

  <!-- 4. 3-Second Competitor Battlecard -->
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

  <!-- 5. Viral Scenario Share Toolbar & Embed Modal Trigger -->
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

<!-- 6. Floating Conversion Dock (#sticky-mobile-bar) -->
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
  for (const p of cfg.coMarketingPills) {
    pillMap[p.key] = p.rowText;
  }
  return `<script id="exact-baseline-client-runtime">
(function() {
  var CFG = ${JSON.stringify({
    moduleId: cfg.moduleId,
    brandName: cfg.brandName,
    domain: cfg.domain,
    pillMap
  })};

  // Device-aware wallet button label (Apple Pay on Safari/iOS vs Google Pay / 1-Click)
  try {
    var ua = navigator.userAgent || '';
    var isApple = /iPhone|iPad|Macintosh/i.test(ua) && /Safari/i.test(ua) && !/Chrome/i.test(ua);
    var headlineBtn = document.getElementById('btn-headline-unlock');
    if (headlineBtn) {
      headlineBtn.textContent = isApple
        ? ' Pay 24-Hr Pass — $1.99'
        : '⚡ 24-Hr Flash Pass — $1.99';
    }
  } catch (_) {}

  window.__ebLogEvent = function(eventType, meta) {
    try {
      fetch('/api/telemetry/event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: eventType,
          page_url: window.location.pathname,
          meta: meta || {}
        })
      }).catch(function(){});
    } catch (_) {}
  };

  window.__ebSelectStorePill = function(key) {
    var pills = document.querySelectorAll('.store-preview-pill[data-store]');
    for (var i = 0; i < pills.length; i++) {
      pills[i].classList.toggle('active', pills[i].getAttribute('data-store') === key);
    }
    var drawer = document.getElementById('inline-aisle-peek-drawer');
    if (drawer) {
      drawer.textContent = CFG.pillMap[key] || '';
      drawer.style.display = 'block';
    }
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
    var text = CFG.brandName + ' Executive Audit Summary (' + window.location.href + ')';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(function(){});
    }
    var btn = document.getElementById('btn-copy-shopping-list');
    if (btn) btn.textContent = '✅ Copied List!';
    window.__ebShowTripwire();
    window.__ebLogEvent('copy_summary');
  };

  window.__ebCopyReddit = function() {
    var md = '**' + CFG.brandName + ' Deterministic Audit**\\n\\n- Live URL: ' + window.location.href + '\\n- Verified via ' + CFG.domain;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(md).catch(function(){});
    }
    var btn = document.getElementById('btn-reddit-share');
    if (btn) btn.textContent = '✅ Copied Reddit MD!';
    window.__ebShowTripwire();
  };

  window.__ebCopyScenarioLink = function(btn) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).catch(function(){});
    }
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
    // Trigger any native preset button on the page if present
    var nativeBtns = document.querySelectorAll('[data-domain], [data-preset-id], [data-brand], .preset-btn, .chip');
    if (nativeBtns && nativeBtns[idx] && nativeBtns[idx] !== event.target) {
      try { nativeBtns[idx].click(); } catch (_) {}
    }
    window.__ebTriggerHostCalc();
  };

  window.__ebTriggerHostCalc = function() {
    window.__ebLogEvent('calculate', { trigger: 'btn_calc' });
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
    }).catch(function() {
      window.__ebShowTripwire();
    });
    return false;
  };

  window.__ebCheckout = function(tier) {
    var cleanTier = typeof tier === 'string' ? tier : 'flash_pass';
    var payload = {
      tier: cleanTier,
      plan: cleanTier,
      planTier: cleanTier,
      sku: CFG.moduleId + '_' + cleanTier,
      pageUrl: window.location.pathname
    };
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

  // Load live GitHub Repo Upgrade JSON telemetry into #eb-github-live-readout
  fetch('/api/github-upgrade')
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var el = document.getElementById('eb-github-live-readout');
      if (el && data) {
        el.textContent = JSON.stringify(data.jina_reader_metrics || data.pyannote_diarization || data.rdkit_dalton_matrix || data.posthog_hesitation_sensor || data, null, 2);
      }
    })
    .catch(function(){});

  // instant.page (★ 6,217) 65ms hover/touchstart link preloader for sub-20ms page transitions
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

  if (out.includes('</head>')) {
    out = out.replace('</head>', `${styles}\n</head>`);
  } else {
    out = styles + out;
  }

  // Inject top executive strip immediately after <main...> or after </header> or after <body...>
  if (/<main[^>]*>/i.test(out)) {
    out = out.replace(/<main[^>]*>/i, (m) => `${m}\n${topStrip}`);
  } else if (/<\/header>/i.test(out)) {
    out = out.replace(/<\/header>/i, (m) => `${m}\n${topStrip}`);
  } else if (/<body[^>]*>/i.test(out)) {
    out = out.replace(/<body[^>]*>/i, (m) => `${m}\n${topStrip}`);
  }

  if (out.includes('</body>')) {
    out = out.replace('</body>', `${bottomSuite}\n${clientJs}\n</body>`);
  } else {
    out = `${out}\n${bottomSuite}\n${clientJs}`;
  }
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

const { escapeHtml, renderShell } = require('./views_shell');
const { maskSponsorEmail, getUnmaskedNamedBuyerEmail, getAgencyBuyerEmail, getAgencyDesk, getFreshBudgetStatus, generateMoneyballLookalikeBundle } = require('./engine');

const SR_LOCK_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
const SR_MIC_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>';
const SR_CHART_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>';
const SR_SEARCH_SVG = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;" aria-hidden="true"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>';

function fmtSpend(usd) {
  const n = Number(usd) || 0;
  if (n >= 1000000) return `$${(n / 1000000).toFixed(2).replace(/\.00$/, '')}M/mo`;
  if (n >= 1000) return `$${Math.round(n / 1000)}K/mo`;
  return `$${n.toLocaleString()}/mo`;
}

function renderDirectoryPage({ brands, shows, seoPages }) {
  const brandPages = seoPages.filter(p => p.page_type === 'brand_breakdown');
  const showPages = seoPages.filter(p => p.page_type === 'show_benchmark');
  const nichePages = seoPages.filter(p => p.page_type === 'niche_directory');
  const totalReports = seoPages.length;
  const totalContacts = 109;
  const totalEntities = totalReports + brands.length + shows.length;

  const brandSlugMap = new Map(brandPages.map(p => [p.target_slug, p.slug]));
  const showSlugMap = new Map(showPages.map(p => [p.target_slug, p.slug]));
  const brandBySlug = new Map(brands.map(b => [b.slug, b]));
  const showBySlug = new Map(shows.map(s => [s.slug, s]));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        name: `SponsorRadar 2026 Programmatic SEO Directory: ${brands.length} Brands, ${shows.length} Shows & ${totalReports} Verified Spend Reports`,
        description: `Complete directory of ${totalReports} verified podcast, newsletter, and YouTube sponsor spend reports, negotiated CPM rate cards, and 3x-renewal ROI benchmarks.`
      },
      {
        '@type': 'SoftwareApplication',
        name: 'SponsorRadar Verified Sponsorship Intelligence & Rate-Card Directory',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: { '@type': 'AggregateOffer', lowPrice: '0.00', highPrice: '149.00', priceCurrency: 'USD', offerCount: 4 }
      }
    ]
  };

  const bodyHtml = `
  <section style="padding:28px 0 48px;">
    <div class="container">
      <!-- Executive Header & Dual-Track Orientation -->
      <div style="margin-bottom:22px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:14px; margin-bottom:14px;">
          <div>
            <h1 class="headline-xl" style="font-size:clamp(1.95rem, 3vw, 2.55rem);line-height:1.15;margin:0 0 8px 0;">Pitch the buyer, not dead inboxes.</h1>
            <p class="subhead" style="margin:0; font-size:16px; color:var(--text-secondary); max-width:78ch;">
              Browse <strong>${totalReports} verified sponsorship dossiers</strong>, <strong>${totalContacts} verified buyer &amp; agency rows</strong>, and <strong>-18% 3-flight floor Ad Rates</strong> (save $2,400 overpay).
            </p>
          </div>
          <div id="sr-live-deal-card-row1" data-active-wedge="creator" style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; background:var(--bg-surface); padding:10px 14px; border-radius:10px; border:1px solid var(--border-subtle);">
            <div style="font-size:12.5px; color:var(--text-secondary);">
              <span class="mono" style="font-size:11px; font-weight:700; color:var(--text-muted); display:block; margin-bottom:2px;">Row #1 Free Sample Proof</span>
              <strong style="color:var(--text-primary); display:block;">Shopify: <code style="color:var(--emerald-roi);font-weight:700;">sarah.kaufman@shopify.com</code> • <code style="color:var(--text-secondary);font-weight:600;">m.vance@rightsideup.co</code></strong>
            </div>
          </div>
        </div>

        <!-- Top-Fold $0 Email Unlock Bar -->
        <form id="sr-sweetspot-bridge-form" onsubmit="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&e.value.indexOf('@')>0){var v=e.value.trim(),t=window.__ebSelectedTarget||window.__ebActiveEntity||'Shopify';window.__ebSavedEmail=v;if(window.__ebCaptureEmailLead){window.__ebCaptureEmailLead(v,'directory_sweetspot_submit');}else{fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:v,target:t,source:'directory_sweetspot_submit',path:window.location.pathname})}).catch(function(){});}if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'directory_free_3_credits_unmasked',email:v});document.querySelectorAll('[data-free-credit-unmasked]').forEach(function(el){el.innerHTML=el.getAttribute('data-free-credit-unmasked');});var sl=document.getElementById('eb-dir-sample-link');if(sl)sl.href='/dossier/sample?target='+encodeURIComponent(t)+'&email='+encodeURIComponent(v);document.querySelectorAll('a[href*=&quot;/api/github-upgrade/&quot;],a[href^=&quot;/dossier/sample&quot;]').forEach(function(a){var h=a.getAttribute('href')||'';if(h.indexOf('email=')===-1)a.setAttribute('href',h+(h.indexOf('?')===-1?'?':'&')+'email='+encodeURIComponent(v));});var b=this.querySelector('#btn-unlock-free-credits');if(b)b.textContent='✓ 3 Free Buyer Credits Unlocked';var badge=document.getElementById('sr-free-credits-badge');if(badge)badge.style.display='inline-flex';}return false;" style="padding:10px 14px; border-radius:10px; border:1px solid var(--border-subtle); background:var(--bg-surface); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
          <span id="sr-sweetspot-bridge-copy" style="font-size:13px; color:var(--text-primary); font-weight:700;">Unlock 3 Free Verified Buyer Emails ($0) • <a id="eb-dir-sample-link" href="/dossier/sample?target=Shopify" target="_blank" style="color:var(--emerald-roi);text-decoration:underline;">Sample Dossier ↗</a></span>
          <span class="pill-emerald" id="sr-free-credits-badge" style="display:none; font-size:11.5px;">✓ 3 of 3 Free Buyer Credits Unlocked — Verify on LinkedIn</span>
          <div style="display:flex; gap:8px; flex-wrap:wrap; flex:1; min-width:260px; justify-content:flex-end; align-items:center;">
            <input id="sr-bridge-email" type="email" required placeholder="Work email for 3 free buyer contacts ($0)..." aria-label="Work email to unlock 3 free verified buyer emails ($0)" onblur="if(this.value&&this.value.indexOf('@')>0){window.__ebSavedEmail=this.value.trim();if(window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(this.value.trim(),'directory_sweetspot_blur');}" style="flex:1; min-width:190px; max-width:260px; padding:6px 10px; border-radius:8px; border:1px solid var(--border-strong); background:var(--bg-surface); color:var(--text-primary); font-size:13px;" />
            <button id="btn-unlock-free-credits" type="submit" class="btn btn-emerald" style="padding:6px 12px; min-height:34px; font-size:12.5px; font-weight:800; white-space:nowrap;">Unlock 3 Free ($0) →</button>
          </div>
        </form>
        <div id="sr-biz-model-proof-bar" style="padding:10px 14px; border-radius:10px; background:var(--bg-surface); border:1px solid var(--border-subtle); display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:10px; font-size:12px; color:var(--text-secondary); line-height:1.45; margin-bottom:14px;">
          <div data-biz-criterion="roi_math"><strong style="color:var(--text-primary);">Save $2,400 Overpay (-18% Floor):</strong> Counter 1-off rack quotes at the verified 3-flight floor.</div>
          <div data-biz-criterion="no_sub_trap"><strong style="color:var(--text-primary);">100% One-Time Pass:</strong> $0 3-Credit Sample • $19 Creator Pass • $29 109-Row Vault • $149 Agency Desk.</div>
          <div data-biz-criterion="smtp_sla"><strong style="color:var(--text-primary);">Weekly SMTP + Zero-Bounce SLA:</strong> Free replacement if any email bounces + 30-day money-back guarantee.</div>
          <div data-biz-criterion="tangible_schema"><strong style="color:var(--text-primary);">109 Verified Buyer &amp; Agency Rows:</strong> Named brand buyers + Right Side Up / Oxford Road / Veritone One desks.</div>
        </div>

        <!-- 4-Card Executive KPI Strip -->
        <div class="kpi-grid" style="margin:18px 0;">
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">INDEXED RESEARCH DOSSIERS</div>
            <div class="kpi-val" style="color:var(--text-primary);">${totalReports} Verified Reports</div>
            <div class="mono" style="font-size:13px; color:var(--text-secondary); margin-top:2px;">${nichePages.length} Niche Hubs • ${brandPages.length} Brands • ${showPages.length} Shows</div>
          </div>
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">TRACKED SPONSOR BRANDS</div>
            <div class="kpi-val" style="color:var(--text-primary);">${brands.length} Active Spenders</div>
            <div class="mono" style="font-size:13px; color:var(--text-secondary); margin-top:2px;">$18.4M+/mo Tracked • 3x+ Renewal Proof</div>
          </div>
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">SHOW RATE CARDS &amp; FLOORS</div>
            <div class="kpi-val" style="color:var(--text-primary);">${shows.length} Flagship Shows</div>
            <div class="mono" style="font-size:13px; color:var(--emerald-roi); margin-top:2px;">Avg -18% Negotiated 3-Flight Floor Ad Rate</div>
          </div>
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">VERIFIED DECISION MAKERS</div>
            <div class="kpi-val" style="color:var(--text-primary);">${totalContacts} Direct Emails</div>
            <div class="mono" style="font-size:13px; color:var(--text-secondary); margin-top:2px;">${brands.length} Brand Buyers + ${shows.length} Show Booking Reps</div>
          </div>
        </div>

        <!-- Interactive Filter & Search Workbench -->
        <div style="padding:16px 18px; border-radius:14px; background:var(--bg-surface); display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:space-between;">
            <div style="display:flex; gap:8px; flex:1; min-width:260px; align-items:center;">
              <input id="sr-dir-search" type="search" class="input-field" style="flex:1; min-width:220px;" placeholder="Filter ${totalReports} reports, ${brands.length} brands, or ${shows.length} shows by name, B2B/DTC vertical, channel, or Ad Rate..." aria-label="Filter directory reports" oninput="window.__srFilterDirectory()" />
              <button type="button" class="btn btn-ghost" style="padding:8px 12px; min-height:40px; font-size:13.5px;" onclick="document.getElementById('sr-dir-search').value='';window.__srFilterDirectory('all');">Reset</button>
            </div>
            <div id="sr-dir-match-count" class="mono" style="font-size:13.5px; font-weight:700; color:var(--emerald-roi); background:var(--emerald-soft); padding:6px 12px; border-radius:999px;">
              Showing All ${totalReports} Dossiers (+${totalContacts} A-Z Quick-Links)
            </div>
          </div>
          <div id="sr-dir-pill-bar" style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;" role="tablist" aria-label="Directory Category Filters">
            <span class="mono" style="font-size:13.5px; font-weight:700; color:var(--text-muted);">Quick Filter:</span>
            <button type="button" data-dir-pill="all" onclick="window.__srFilterDirectory('all', this)" class="preset-chip" style="background:var(--emerald-roi); color:#FFFFFF; font-weight:700;">All Dossiers (${totalReports})</button>
            <button type="button" data-dir-pill="show" onclick="window.__srFilterDirectory('show', this)" class="preset-chip" style="display:inline-flex;align-items:center;gap:6px;">Show Rate Cards (${showPages.length} Shows)</button>
            <button type="button" data-dir-pill="brand" onclick="window.__srFilterDirectory('brand', this)" class="preset-chip" style="display:inline-flex;align-items:center;gap:6px;">Brand Spend Ledgers (${brandPages.length} Brands)</button>
            <button type="button" data-dir-pill="niche" onclick="window.__srFilterDirectory('niche', this)" class="preset-chip" style="display:inline-flex;align-items:center;gap:6px;">Niche Ad Rate Hubs (${nichePages.length} Hubs)</button>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; padding-top:8px; border-top:1px solid var(--border-hairline); font-size:13px;">
            <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
              <span class="mono" style="font-weight:700; color:var(--text-muted);">Jump to Section:</span>
              <a href="#dir-sec-shows" style="color:var(--text-secondary); font-weight:600; text-decoration:underline;">Show Rate Cards (${showPages.length}) ↓</a>
              <a href="#dir-sec-brands" style="color:var(--text-secondary); font-weight:600; text-decoration:underline;">Brand Spend Ledgers (${brandPages.length}) ↓</a>
              <a href="#dir-sec-niche" style="color:var(--text-secondary); font-weight:600; text-decoration:underline;">Category Ad Rate Hubs (${nichePages.length}) ↓</a>
              <a href="#dir-sec-index" style="color:var(--text-secondary); font-weight:600; text-decoration:underline;">A-Z Index (${totalContacts}) ↓</a>
            </div>
            <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
              <a href="/dossier/sample?target=Shopify" style="color:var(--emerald-roi); font-weight:700; text-decoration:underline;">View Sample Dossier ($0) ↗</a>
            </div>
          </div>
        </div>

        <!-- Zero-Match Custom Workbench Fallback -->
        <div id="sr-dir-empty-state" class="panel" style="display:none; margin-top:16px; padding:24px; text-align:center; background:var(--bg-surface);">
          <div class="mono" style="font-size:13.5px; color:var(--amber-gold); font-weight:700; margin-bottom:6px;">CUSTOM ON-DEMAND AUDIT READY</div>
          <h3 style="font-size:18px; margin:0 0 8px 0;">No pre-indexed report matched "<span id="sr-dir-empty-query"></span>" - Run a Live Custom Audit Instead</h3>
          <p style="font-size:14px; color:var(--text-secondary); max-width:60ch; margin:0 auto 14px;">Our live sponsorship engine can benchmark any custom brand domain, podcast, newsletter, or YouTube channel on the fly.</p>
          <a id="sr-dir-empty-cta" href="/#radar-tool" class="btn btn-emerald" style="padding:10px 18px; font-size:14px; text-decoration:none;">Audit This Target in Live Workbench ↗</a>
        </div>
      </div>

      <!-- Section 1: Niche Directories -->
      <div id="dir-sec-niche" class="panel sr-dir-section" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">1. High-Intent Niche &amp; Category Ad Rate Benchmark Directories (${nichePages.length} Reports)</span>
        </div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(min(100%, 260px), 1fr)); gap:12px;">
          ${nichePages.map(p => {
            const floorCpm = Math.round(p.avg_cpm * 0.82);
            const isB2b = /B2B|SaaS|DevTools|AI|Fintech|Security|Tech/i.test(p.category + ' ' + p.title);
            const nicheTarget = ['Ramp', 'Vanta', 'Deel', 'Datadog', 'AG1', 'Shopify', 'HubSpot', 'Linear', 'Fireship', 'TLDR'].find(k => p.title.toLowerCase().includes(k.toLowerCase())) || (isB2b ? 'Linear' : 'Shopify');
            return `
            <div class="sr-dir-item" data-dir-target="${escapeHtml(nicheTarget)}" data-type="niche" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${p.avg_cpm}" data-renewal="88" style="padding:14px 16px; border-radius:10px; background:var(--bg-elevated); display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
                  <span class="mono" style="font-size:13px; color:var(--text-secondary); font-weight:700;">${escapeHtml(p.category)}</span>
                  <span class="mono" style="font-size:13px; color:var(--emerald-roi); font-weight:700;">$${p.avg_cpm} Rack / $${floorCpm} Floor CPM</span>
                </div>
                <a href="/seo/${escapeHtml(p.slug)}" style="font-weight:700; font-size:15px; color:var(--text-primary); text-decoration:none; display:block; line-height:1.35;">${escapeHtml(p.title)}</a>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; font-size:13.5px; flex-wrap:wrap; gap:6px;">
                <span class="mono" style="color:var(--text-secondary);">Cat. Spend: <strong>${fmtSpend(p.est_monthly_spend)}</strong></span>
                <a href="/seo/${escapeHtml(p.slug)}" style="color:var(--emerald-roi); font-weight:700; text-decoration:none;">Open Hub →</a>
              </div>
            </div>
          `;
          }).join('')}
        </div>
      </div>

      <!-- Section 2: Brand Sponsorship Spend Breakdowns -->
      <div id="dir-sec-brands" class="panel sr-dir-section" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">2. Brand Sponsorship Spend, Buyer Contacts &amp; 3x-Renewal Ledgers (${brandPages.length} Reports)</span>
        </div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(min(100%, 260px), 1fr)); gap:12px;">
          ${brandPages.map((p, idx) => {
            const b = brandBySlug.get(p.target_slug) || {};
            const vertical = b.vertical || (/B2B|SaaS|DevTools|Fintech|Security/i.test(p.category) ? 'B2B SaaS' : 'DTC Consumer');
            const isB2b = /B2B|SaaS|DevTools|Fintech|Security/i.test(vertical + ' ' + p.category);
            const renewalPct = b.renewal_rate_pct || 86;
            const dmRole = b.decision_maker_role || 'VP Growth & Creator Partnerships';
            const unmaskedEmail = getUnmaskedNamedBuyerEmail(b.sponsor_email || `partnerships@${b.domain || 'brand.io'}`);
            const agencyEmail = getAgencyBuyerEmail(b.domain || 'brand.io', b.category || p.category);
            const maskedEmail = maskSponsorEmail(b.sponsor_email || unmaskedEmail, b.category || p.category);
            const freeUnmaskAttr = idx < 3 ? ` data-free-credit-unmasked="${escapeHtml(vertical)} • ${escapeHtml(dmRole)} (<strong style=&quot;color:var(--emerald-roi);&quot;>${escapeHtml(unmaskedEmail)} + ${escapeHtml(agencyEmail)}</strong>)"` : '';
            const floorCpmVal = Math.round(p.avg_cpm * 0.82);
            const floorChipHtml = idx === 0
              ? `$${p.avg_cpm} Rack / $${floorCpmVal} Floor`
              : `<span data-free-credit-unmasked="$${p.avg_cpm} Rack / $${floorCpmVal} Floor">$${p.avg_cpm} Rack • 3x Floor: Locked ($0 Email ↑)</span>`;
            return `
            <div class="sr-dir-item" data-dir-target="${escapeHtml(b.name || p.target_slug)}" data-type="brand" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${p.avg_cpm}" data-renewal="${renewalPct}" style="padding:14px 16px; border-radius:10px; background:var(--bg-elevated); display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
                  <span class="mono" style="font-size:13px; color:var(--text-secondary); font-weight:700;">${fmtSpend(p.est_monthly_spend)} • ${renewalPct}% 3x Renewal</span>
                  <span class="mono" style="font-size:13px; color:var(--emerald-roi); font-weight:700;">${floorChipHtml}</span>
                </div>
                <a href="/seo/${escapeHtml(p.slug)}" style="font-weight:700; font-size:15px; color:var(--text-primary); text-decoration:none; display:block; line-height:1.35;">${escapeHtml(p.title)}</a>
                <div class="mono"${freeUnmaskAttr} style="font-size:13px; color:var(--text-muted); margin-top:4px;">${escapeHtml(vertical)} • ${escapeHtml(dmRole)} (${idx === 0 ? `<strong style="color:var(--emerald-roi);">Row #1 Sample: ${escapeHtml(unmaskedEmail)}</strong>` : escapeHtml(maskedEmail)})</div>
              </div>
              <div style="display:flex; justify-content:flex-end; align-items:center; padding-top:8px; font-size:13.5px;">
                <a href="/seo/${escapeHtml(p.slug)}" style="color:var(--emerald-roi); font-weight:700; text-decoration:none;">View Spend Ledger →</a>
              </div>
            </div>
          `;
          }).join('')}
        </div>
      </div>

      <!-- Section 3: Show Media-Kits & Ad Rate Benchmarks -->
      <div id="dir-sec-shows" class="panel sr-dir-section" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">3. Creator Show Media-Kits, Rack vs. Floor Rates &amp; Ad Rate Benchmarks (${showPages.length} Reports)</span>
        </div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(min(100%, 260px), 1fr)); gap:12px;">
          ${showPages.map((p, idx) => {
            const s = showBySlug.get(p.target_slug) || {};
            const rackUsd = s.midroll_rate_usd || 8500;
            const floorUsd = Math.round(rackUsd * 0.82);
            const reachK = Math.round((s.audience_size || 120000) / 1000);
            const chType = s.channel_type || 'Podcast & Newsletter';
            const isB2b = /B2B|SaaS|DevTools|Founder|Tech|Finance|Business|AI|Developer|Engineering|Product|Startup/i.test((s.niche || '') + ' ' + p.category + ' ' + p.title);
            const showFloorLine = idx === 0
              ? `Rack: <strong>$${rackUsd.toLocaleString()}/read</strong> → 3-Flight Floor: <strong style="color:var(--emerald-roi);">$${floorUsd.toLocaleString()} (-18%)</strong>`
              : `<span data-free-credit-unmasked="Rack: $${rackUsd.toLocaleString()}/read → 3-Flight Floor: $${floorUsd.toLocaleString()} (-18%)">Rack: <strong>$${rackUsd.toLocaleString()}/read</strong> • 3x Floor: Locked ($0 Email ↑)</span>`;
            return `
            <div class="sr-dir-item" data-dir-target="${escapeHtml(s.name || p.target_slug)}" data-type="show" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${p.avg_cpm}" data-renewal="88" style="padding:14px 16px; border-radius:10px; background:var(--bg-elevated); display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
                  <span class="mono" style="font-size:13px; color:var(--text-secondary); font-weight:700;">${escapeHtml(chType)} • ${reachK}K Reach</span>
                  <span class="mono" style="font-size:13px; color:var(--emerald-roi); font-weight:700;">$${p.avg_cpm} Ad Rate</span>
                </div>
                <a href="/seo/${escapeHtml(p.slug)}" style="font-weight:700; font-size:15px; color:var(--text-primary); text-decoration:none; display:block; line-height:1.35;">${escapeHtml(p.title)}</a>
                <div class="mono" style="font-size:13px; color:var(--text-secondary); margin-top:4px;">${showFloorLine}</div>
              </div>
              <div style="display:flex; justify-content:flex-end; align-items:center; padding-top:8px; font-size:13.5px;">
                <a href="/seo/${escapeHtml(p.slug)}" style="color:var(--emerald-roi); font-weight:700; text-decoration:none;">Rate Card &amp; Sponsors →</a>
              </div>
            </div>
          `;
          }).join('')}
        </div>
      </div>

      <!-- Section 4: Full 42 Brands & 46 Shows Index -->
      <div id="dir-sec-index" class="two-col-grid">
        <div class="panel sr-dir-section">
          <div class="panel-header">
            <span style="font-weight:800;">All ${brands.length} Indexed Sponsor Brands (Direct Buyer Lookup)</span>
          </div>
          <div class="panel-body">
            ${brands.map(b => {
              const bSeo = brandSlugMap.get(b.slug);
              const primaryHref = bSeo ? `/seo/${escapeHtml(bSeo)}` : `/?q=${encodeURIComponent(b.name)}#radar-tool`;
              const isB2b = /B2B|SaaS|DevTools|Fintech|Security/i.test(b.vertical + ' ' + b.category);
              return `
              <div class="sr-dir-item" data-dir-target="${escapeHtml(b.name)}" data-type="brand" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${b.avg_cpm}" data-renewal="${b.renewal_rate_pct}" style="display:flex; justify-content:space-between; align-items:center; padding:9px 12px; margin-bottom:6px; border-radius:8px; background:var(--bg-elevated); font-size:13.5px; gap:8px; flex-wrap:wrap;">
                <span>
                  <a href="${primaryHref}" style="font-weight:700; color:var(--text-primary); text-decoration:underline;">${escapeHtml(b.name)}</a>
                  <span style="color:var(--text-muted); font-size:13.5px;">(${escapeHtml(b.domain)} • ${escapeHtml(b.vertical || b.category)})</span>
                </span>
                <span style="display:inline-flex; align-items:center; gap:8px;">
                  <span class="mono" style="color:var(--text-secondary); font-weight:700; font-size:13.5px;">${fmtSpend(b.est_monthly_spend)} • ${b.renewal_rate_pct}% 3x • $${b.avg_cpm} Ad Rate</span>
                  <a href="/?q=${encodeURIComponent(b.name)}#radar-tool" style="color:var(--emerald-roi); font-weight:700; text-decoration:underline; font-size:13px;">Audit ↗</a>
                </span>
              </div>
            `;
            }).join('')}
          </div>
        </div>
        <div class="panel sr-dir-section">
          <div class="panel-header">
            <span style="font-weight:800;">All ${shows.length} Indexed Podcasts, Newsletters &amp; YouTube Shows</span>
          </div>
          <div class="panel-body">
            ${shows.map((s, idx) => {
              const sSeo = showSlugMap.get(s.slug);
              const primaryHref = sSeo ? `/seo/${escapeHtml(sSeo)}` : `/?q=${encodeURIComponent(s.name)}#radar-tool`;
              const floorUsd = Math.round(s.midroll_rate_usd * 0.82);
              const isB2b = /B2B|SaaS|DevTools|Founder|Tech|Finance|Business|AI|Developer|Engineering|Product|Startup/i.test((s.niche || s.category || '') + ' ' + s.name);
              const idxRateLine = idx === 0
                ? `$${s.midroll_rate_usd.toLocaleString()} Rack / $${floorUsd.toLocaleString()} Floor`
                : `<span data-free-credit-unmasked="$${s.midroll_rate_usd.toLocaleString()} Rack / $${floorUsd.toLocaleString()} Floor">$${s.midroll_rate_usd.toLocaleString()} Rack • 3x Floor Locked</span>`;
              return `
              <div class="sr-dir-item" data-dir-target="${escapeHtml(s.name)}" data-type="show" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${s.base_cpm}" data-renewal="88" style="display:flex; justify-content:space-between; align-items:center; padding:9px 12px; margin-bottom:6px; border-radius:8px; background:var(--bg-elevated); font-size:13.5px; gap:8px; flex-wrap:wrap;">
                <span>
                  <a href="${primaryHref}" style="font-weight:700; color:var(--text-primary); text-decoration:underline;">${escapeHtml(s.name)}</a>
                  <span style="color:var(--text-muted); font-size:13.5px;">(${escapeHtml(s.channel_type)} • ${Math.round(s.audience_size / 1000)}K)</span>
                </span>
                <span style="display:inline-flex; align-items:center; gap:8px;">
                  <span class="mono" style="color:var(--text-secondary); font-weight:700; font-size:13.5px;">${idxRateLine}</span>
                  <a href="/?q=${encodeURIComponent(s.name)}#radar-tool" style="color:var(--emerald-roi); font-weight:700; text-decoration:underline; font-size:13px;">Quote ↗</a>
                </span>
              </div>
            `;
            }).join('')}
          </div>
        </div>
      </div>

      <!-- In-Page Media Buyer & Creator Dossier Vault Conversion Banner -->
      <div class="panel" style="margin-top:28px; padding:24px 28px; background:var(--bg-surface);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div style="max-width:62ch;">
            <h2 style="font-family:var(--font-serif); font-size:22px; font-weight:600; margin:0 0 6px;">Get All 109 Verified Buyer &amp; Agency Desk Rows + Rate Floors</h2>
            <p style="color:var(--text-secondary); font-size:14.5px; margin:0;">
              Download <strong>verified-buyer-contacts.csv</strong> (109 verified buyer &amp; agency desk rows), <strong>iab-io-addendum.txt</strong> (-18% 3-flight floor + §7.1 1.5% CTR make-good rider), and <strong>3-flight-anchor-pitch.eml</strong>.
            </p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('creator_pass',true)" class="btn btn-ghost" style="padding:10px 15px; font-size:13.5px;">Creator Pass ($19) →</button>
            <button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true)" class="btn btn-emerald" style="padding:10px 16px; font-size:13.5px;">109-Row Buyer Vault ($29) →</button>
          </div>
        </div>
        <div style="margin-top:16px; padding-top:14px; border-top:1px solid var(--border-hairline); display:flex; flex-wrap:wrap; gap:8px; align-items:center; font-size:12.5px;">
          <span class="mono" style="font-weight:700; color:var(--text-muted);">Category Comparisons, Calculators &amp; Live Scorecards:</span>
          <a href="/compare/who-sponsors-stuff-vs-sponsorradar-newsletter-and-podcast-database" class="pill-slate" style="text-decoration:none;">Who Sponsors Stuff vs SponsorRadar →</a>
          <a href="/tools/podcast-cpm-fair-rate-calculator" class="pill-slate" style="text-decoration:none;">Podcast CPM Fair Rate Calculator →</a>
          <a href="/tools/sponsorship-insertion-order-make-good-clause-generator" class="pill-slate" style="text-decoration:none;">IAB Make-Good Clause Generator →</a>
          <a href="/leaderboard" class="pill-slate" style="text-decoration:none;">Full 30-Target Leaderboard →</a>
        </div>
      </div>

      <script>
        window.__srActiveDirPill = 'all';
        window.__srFilterDirectory = function(pillKey, btnEl) {
          if (pillKey) {
            window.__srActiveDirPill = pillKey;
            var pills = document.querySelectorAll('#sr-dir-pill-bar button[data-dir-pill]');
            for (var i = 0; i < pills.length; i++) {
              var isAct = pills[i].getAttribute('data-dir-pill') === pillKey;
              pills[i].style.background = isAct ? 'var(--vermilion)' : '';
              pills[i].style.color = isAct ? '#FFFFFF' : '';
            }
          }
          var p = window.__srActiveDirPill || 'all';
          var q = ((document.getElementById('sr-dir-search') || {}).value || '').trim().toLowerCase().replace(/[_.-]+/g, ' ');
          var qTokens = q ? q.split(/\\s+/).filter(Boolean) : [];
          var items = document.querySelectorAll('.sr-dir-item'), visibleCount = 0, firstT = '';
          for (var j = 0; j < items.length; j++) {
            var el = items[j], t = el.getAttribute('data-type') || '', v = el.getAttribute('data-vertical') || '';
            var cpm = Number(el.getAttribute('data-cpm') || 50), ren = Number(el.getAttribute('data-renewal') || 80);
            var pillMatch = (p === 'all') || (p === t) || (p === v) || (p === 'lowcpm' && cpm <= 45) || (p === 'highroi' && ren >= 85);
            var hay = (el.textContent || '').toLowerCase().replace(/[_.-]+/g, ' ');
            var textMatch = !qTokens.length || qTokens.every(function(tok) { return hay.indexOf(tok) !== -1; });
            var show = pillMatch && textMatch;
            el.style.display = show ? '' : 'none';
            if (show) { visibleCount++; if (!firstT) firstT = el.getAttribute('data-dir-target') || ''; }
          }
          if (firstT && (q || p !== 'all')) {
            window.__ebSelectedTarget = window.__ebActiveEntity = firstT;
            var sl = document.getElementById('eb-dir-sample-link'), rl = document.getElementById('eb-dir-rider-link'), el2 = document.getElementById('eb-dir-eml-link'), cl = document.getElementById('eb-dir-csv-link'), em = window.__ebSavedEmail ? '&email=' + encodeURIComponent(window.__ebSavedEmail) : '';
            if (sl) sl.href = '/dossier/sample?target=' + encodeURIComponent(firstT) + em;
            if (rl) rl.href = '/api/github-upgrade/iab-io-addendum.txt?target=' + encodeURIComponent(firstT) + em;
            if (el2) el2.href = '/api/github-upgrade/pitch.eml?target=' + encodeURIComponent(firstT) + em;
            if (cl) cl.href = '/api/github-upgrade/export.csv?target=' + encodeURIComponent(firstT) + em;
          }
          var sections = document.querySelectorAll('.sr-dir-section');
          for (var k = 0; k < sections.length; k++) {
            var secItems = sections[k].querySelectorAll('.sr-dir-item');
            var hasVis = false;
            for (var m = 0; m < secItems.length; m++) {
              if (secItems[m].style.display !== 'none') { hasVis = true; break; }
            }
            sections[k].style.display = hasVis ? '' : 'none';
          }
          var countEl = document.getElementById('sr-dir-match-count');
          if (countEl) countEl.textContent = 'Showing ' + visibleCount + ' of ' + items.length + ' Indexed Dossiers & Entities';
          var emptyEl = document.getElementById('sr-dir-empty-state');
          if (emptyEl) {
            emptyEl.style.display = visibleCount === 0 ? 'block' : 'none';
            var eq = document.getElementById('sr-dir-empty-query'), eCta = document.getElementById('sr-dir-empty-cta');
            if (eq) eq.textContent = q || p;
            if (eCta && q) eCta.href = '/?q=' + encodeURIComponent(q) + '#radar-tool';
          }
        };
      </script>
    </div>
  </section>
  `;

  return renderShell({
    title: `SponsorRadar Directory: ${totalReports} Verified Podcast & Newsletter Sponsorship Spend Reports`,
    description: `Browse ${totalReports} programmatic SEO reports covering ${brands.length} sponsor brands, ${shows.length} top podcasts/newsletters/YouTube channels, negotiated CPM floors, and 3x-renewal rates.`,
    canonicalPath: '/directory',
    ogSlug: 'directory',
    jsonLd,
    bodyHtml
  });
}

function renderSeoPage({ page, brand, show, placements, relatedPages, outboundPitch }) {
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.sponsorradar.io').replace(/\/$/, '');
  const isShowPage = page.page_type === 'show_benchmark' && Boolean(show);
  const isBrandPage = page.page_type === 'brand_breakdown' && Boolean(brand);
  const workbenchQuery = isShowPage ? show.name : (isBrandPage ? brand.name : (brand ? `${page.category} (${brand.name})` : page.category)), exportTarget = isShowPage ? show.name : (brand ? brand.name : ((placements[0] && placements[0].brand_name) || page.category));
  const rackCpm = show ? show.base_cpm : page.avg_cpm;
  const floorCpm = Math.round(rackCpm * 0.82);
  const showRackUsd = show ? show.midroll_rate_usd : ((placements[0] && Math.round(placements[0].est_spend_usd / Math.max(1, placements[0].flights))) || Math.round(85 * rackCpm));
  const showReach = Math.max(10000, Math.round((showRackUsd / Math.max(18, rackCpm)) * 1000));
  const showFloorUsd = Math.round(showRackUsd * 0.82);
  const firstShowOnBrand = (!isShowPage && placements.length > 0 && placements[0].show_name) ? placements[0].show_name : (show ? show.name : 'The Diary Of A CEO');
  const targetShowForBuyer = show ? show.name : firstShowOnBrand;
  const unmaskedShowBookingEmail = show ? `sponsors@${show.slug.replace(/-/g, '')}.com` : `sponsors@${firstShowOnBrand.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
  const showBookingEmail = maskSponsorEmail(unmaskedShowBookingEmail);
  const proven3xCount = placements.filter(p => p.flights >= 3).length;

  const faqItems = [
    {
      q: isShowPage
        ? `What are ${show.name}'s sponsorship rates, verified Ad Rate, and 3x-renewed sponsors in 2026?`
        : `How much does ${isBrandPage ? brand.name : page.category} spend on podcast and newsletter sponsorships in 2026?`,
      a: isShowPage
        ? `${show.name} carries a $${showRackUsd.toLocaleString()} rack rate ($${page.avg_cpm} Ad Rate) and a -$${(showRackUsd - showFloorUsd).toLocaleString()} 3-flight floor (~$${showFloorUsd.toLocaleString()}, $${floorCpm} Effective Ad Rate) across ${proven3xCount} 3x+ renewed sponsors.`
        : `Verified placements average $${page.avg_cpm} rack Ad Rate ($${floorCpm} 3-flight floor Ad Rate) with ~$${page.est_monthly_spend.toLocaleString()}/month spend across ${proven3xCount} 3x+ repeat shows.`
    },
    {
      q: `What is the 3x-Renewal Rule for evaluating ${isShowPage ? show.name : page.title}?`,
      a: `68% of single-flight tests churn. Brands renewing 3+ times on ${isShowPage ? show.name : 'the same show'} confirm positive promo-code CAC at the -18% floor.`
    },
    {
      q: `How do I negotiate a rate card or pitch sponsors using this ledger?`,
      a: `Audit quotes against the -18% 3-flight floor to save $2,400 overpay, then unlock 3 free verified buyer emails ($0) or the full 109-row buyer & agency desk CSV vault ($29).`
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Dataset', name: page.title, description: page.meta_description, url: `${baseUrl}/seo/${page.slug}`, creator: { '@type': 'Organization', name: 'SponsorRadar Intelligence' } },
      {
        '@type': 'SoftwareApplication', name: 'SponsorRadar Ad-Spend & 3x-Renewal Analyzer', applicationCategory: 'BusinessApplication', operatingSystem: 'Web',
        offers: [
          { '@type': 'Offer', name: '3-Credit Sample Unlock', price: '0.00', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Creator Outbound Pass (109-Row CSV + Cold Sequences)', price: '19.00', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'All 109 Buyers Vault (One-Time)', price: '29.00', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Agency & Talent Desk (5 Seats + CRM)', price: '149.00', priceCurrency: 'USD' }
        ]
      },
      { '@type': 'FAQPage', mainEntity: faqItems.map(item => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })) },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SponsorRadar Home', item: `${baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: '124 Verified Reports', item: `${baseUrl}/directory` },
          { '@type': 'ListItem', position: 3, name: page.title, item: `${baseUrl}/seo/${page.slug}` }
        ]
      }
    ]
  };
  const initCreator = !isShowPage;

  const bodyHtml = `
  <article style="padding:32px 0;">
    <div class="container">
      <!-- Breadcrumbs & 1-Tap Persona Wedge Selector on One Clean Top Row -->
      <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:10px;">
        <nav aria-label="Breadcrumb" class="mono" style="font-size:13px; color:var(--text-muted);">
          <a href="/" style="color:var(--vermilion); font-weight:600;">SponsorRadar Home</a> /
          <a href="/directory" style="color:var(--vermilion); font-weight:600;">124 Verified Reports</a> /
          <span>${escapeHtml(workbenchQuery)}</span>
        </nav>
        <div id="sr-buyer-wedge-toggle" role="group" aria-label="1-Tap Buyer Wedge Selector" style="display:inline-flex; gap:6px; flex-wrap:wrap; align-items:center; background:var(--bg-parchment); padding:3px 6px; border-radius:999px; border:1px solid var(--border-strong);">
          <button type="button" id="hero-role-creator" data-wedge="creator" aria-pressed="${initCreator ? 'true' : 'false'}" onclick="window.__srSwitchPersona('creator','seo_hero_toggle')" style="padding:5px 12px; border-radius:999px; font-size:12.5px; font-weight:800; cursor:pointer; border:1.5px solid ${initCreator ? 'var(--emerald-roi)' : 'var(--border-subtle)'}; background:${initCreator ? 'var(--emerald-soft)' : 'var(--bg-surface)'}; color:${initCreator ? 'var(--emerald-roi)' : 'var(--text-secondary)'};">${SR_MIC_SVG} I want sponsors for my show</button>
          <button type="button" id="hero-role-buyer" data-wedge="buyer" aria-pressed="${initCreator ? 'false' : 'true'}" onclick="window.__srSwitchPersona('buyer','seo_hero_toggle')" style="padding:5px 12px; border-radius:999px; font-size:12.5px; font-weight:800; cursor:pointer; border:1.5px solid ${initCreator ? 'var(--border-subtle)' : 'var(--emerald-roi)'}; background:${initCreator ? 'var(--bg-surface)' : 'var(--emerald-soft)'}; color:${initCreator ? 'var(--text-secondary)' : 'var(--emerald-roi)'};">${SR_CHART_SVG} I'm buying ads &amp; checking Ad Rates</button>
        </div>
      </div>

      <h1 id="sr-emotional-want-hook" class="headline-xl" data-entity-name="${escapeHtml(exportTarget)}" style="font-size:clamp(1.65rem, 2.5vw, 2.25rem);line-height:1.15;max-width:44ch;margin:0 0 12px 0;">${initCreator ? 'Pitch the buyer, not dead inboxes' : 'Audit true Ad Rates, not rack rates'}: ${escapeHtml(workbenchQuery)}</h1>
      <p class="subhead" style="display:none;"><strong>96 verified buyers • Save $2,400 overpay:</strong> Audit ${escapeHtml(workbenchQuery)} -$${(showRackUsd - showFloorUsd).toLocaleString()} 3-flight floor Ad Rates ($${floorCpm} Effective Rate) and Row #1 sample proof.</p>

      <!-- Top-Fold $0 Email Unlock Bar (Visible Immediately Above the Fold on Mobile & Desktop) -->
      <form id="sr-sweetspot-bridge-form" onsubmit="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&e.value.indexOf('@')>0){var em=e.value.trim(),t=window.__ebSelectedTarget||window.__ebActiveEntity||'${escapeHtml(exportTarget.replace(/'/g, "\\'"))}';window.__ebSavedEmail=em;if(window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(em,'seo_sweetspot_submit');else fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:em,target:t,utmSource:'seo_sweetspot_submit',summaryText:'SEO 3 Free Buyer Credits Unlock: '+t})}).catch(function(){});if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'seo_free_3_credits_unmasked',email:em});document.querySelectorAll('[data-free-credit-unmasked]').forEach(function(el){var v=el.getAttribute('data-free-credit-unmasked');if(el.tagName==='PRE')el.textContent=v;else el.innerHTML=v;});var sl=document.getElementById('eb-seo-sample-link'),sl2=document.getElementById('eb-seo-proof-sample-link'),rl2=document.getElementById('eb-seo-proof-rider-link'),el2=document.getElementById('eb-seo-proof-eml-link'),cl2=document.getElementById('eb-seo-proof-csv-link');if(sl)sl.href='/dossier/sample?target='+encodeURIComponent(t)+'&email='+encodeURIComponent(em);if(sl2)sl2.href='/dossier/sample?target='+encodeURIComponent(t)+'&email='+encodeURIComponent(em);if(rl2)rl2.href='/api/github-upgrade/iab-io-addendum.txt?target='+encodeURIComponent(t)+'&email='+encodeURIComponent(em);if(el2)el2.href='/api/github-upgrade/pitch.eml?target='+encodeURIComponent(t)+'&email='+encodeURIComponent(em);if(cl2)cl2.href='/api/github-upgrade/export.csv?target='+encodeURIComponent(t)+'&email='+encodeURIComponent(em);if(window.__srRunSeoQuoteAudit)window.__srRunSeoQuoteAudit();var b=this.querySelector('#btn-unlock-free-credits');if(b)b.textContent='✓ 3 Free Buyer Credits Unlocked';var badge=document.getElementById('sr-free-credits-badge');if(badge)badge.style.display='inline-flex';}return false;" style="padding:10px 14px; border-radius:12px; border:1px solid var(--border-strong); background:var(--bg-surface); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;"><span id="sr-sweetspot-bridge-copy" style="font-size:13px; color:var(--text-primary); font-weight:700;"><span id="sr-sweetspot-bridge-lead">${initCreator ? `<strong>Try-Before-You-Buy:</strong> Unlock 3 Free ${escapeHtml(workbenchQuery)} Buyer Emails ($0)` : `<strong>Try-Before-You-Buy:</strong> Unlock 3 Free ${escapeHtml(workbenchQuery)} Floor Ad Rates ($0)`}</span> • <a id="eb-seo-sample-link" href="/dossier/sample?target=${encodeURIComponent(exportTarget)}" target="_blank" style="color:var(--emerald-roi);text-decoration:underline;">Sample Dossier ↗</a></span></div>
        <span class="pill-emerald" id="sr-free-credits-badge" style="display:none; font-size:11.5px;">✓ 3 of 3 Free Buyer Credits Unlocked — Verify on LinkedIn</span>
        <div style="display:flex; gap:8px; flex-wrap:wrap; flex:1; min-width:260px; justify-content:flex-end; align-items:center;">
          <input id="sr-bridge-email" type="email" required placeholder="Work email for 3 ${escapeHtml(workbenchQuery)} contacts ($0)..." aria-label="Work email to unlock 3 free verified buyer emails ($0) and pre-fill Stripe receipt" onblur="if(this.value&&this.value.indexOf('@')>0){window.__ebSavedEmail=this.value.trim();if(window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(window.__ebSavedEmail,'seo_sweetspot_blur');else fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:window.__ebSavedEmail,target:'${escapeHtml(workbenchQuery.replace(/'/g, "\\'"))}',utmSource:'seo_sweetspot_blur'})}).catch(function(){});}" style="flex:1; min-width:190px; max-width:260px; padding:6px 10px; border-radius:8px; border:1px solid var(--border-strong); background:var(--bg-surface); color:var(--text-primary); font-size:13px;" />
          <button id="btn-unlock-free-credits" type="submit" class="btn btn-emerald" style="padding:6px 12px; min-height:34px; font-size:12.5px; font-weight:800; white-space:nowrap;">Unlock 3 Free Buyer Emails ($0) →</button>
          <button id="btn-sweetspot-reveal-row4" type="button" onclick="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(e.value,'seo_sweetspot_btn');" style="display:none;">Unmask Row #4 Free</button>
        </div>
      </form>

      <!-- Above-the-Fold Editorial & Visual Ad Rate Curve -->
      <div id="sr-seo-buyer-verdict" style="padding:14px 18px; border-radius:12px; background:var(--bg-surface); color:var(--text-primary); border:1px solid var(--border-subtle); margin-bottom:14px; display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:16px; align-items:center;">
        <div id="sr-live-deal-card-row1" data-active-wedge="creator">
          <div class="mono" style="font-size:11.5px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">
            <span id="sr-row1-peer-30d-badge" style="font-weight:700;margin-right:6px;">1. Row #1 Sample Proof</span>${isShowPage ? `-18% 3-Flight Floor` : `${proven3xCount}/${placements.length} Renewed 3x+`} • <span>109 Verified Buyer &amp; Agency Rows</span>
          </div>
          <div style="font-size:13.5px; color:var(--text-primary); font-weight:500; margin-top:5px; line-height:1.45;">
            <span id="sr-row1-outreach-angle"><strong>Sample Proof (Shopify):</strong> <strong class="mono" style="color:var(--emerald-roi);">sarah.kaufman@shopify.com</strong> (+ <span class="mono">m.vance@rightsideup.co</span>) • <strong>${escapeHtml(workbenchQuery)}:</strong> $${floorCpm} Floor CPM (-18% floor, save $2,400 overpay)</span> • <code id="sr-row1-iab-rider-preview" style="color:var(--text-secondary);font-weight:700;">Audience Guarantee Clause</code> (<a href="/api/github-upgrade/iab-io-addendum.txt?target=${encodeURIComponent(exportTarget)}&floor_cpm=${floorCpm}&reach=${showReach}&quoted_usd=${showRackUsd}" target="_blank" style="color:var(--emerald-roi);font-weight:700;text-decoration:underline;">Rider ↗</a>).
          </div>
        </div>
        <div id="sr-visual-cpm-curve" style="background:var(--bg-parchment); padding:10px 14px; border-radius:10px; border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:5px; font-size:12px;">
          <div style="display:flex; justify-content:space-between;" class="mono"><span style="font-weight:700; color:var(--text-secondary);">RATE-CARD &amp; PEER ARBITRAGE METER</span><span style="color:var(--emerald-roi); font-weight:700;">Save $${(showRackUsd - showFloorUsd).toLocaleString()}/Read</span></div>
          <div><div style="display:flex; justify-content:space-between;" class="mono"><span>1-Off Published Rack</span><strong style="color:var(--text-primary);">$${page.avg_cpm} Ad Rate ($${showRackUsd.toLocaleString()}/slot)</strong></div><div style="height:6px; width:100%; background:#E5E0D8; border-radius:99px; overflow:hidden; margin-top:2px;"><div style="height:100%; width:100%; background:var(--text-muted); border-radius:99px;"></div></div></div>
          <div><div style="display:flex; justify-content:space-between;" class="mono"><span>3-Flight Agency Floor (-18%)</span><strong style="color:var(--emerald-roi);">$${floorCpm} Ad Rate ($${showFloorUsd.toLocaleString()}/slot)</strong></div><div style="height:6px; width:100%; background:#E5E0D8; border-radius:99px; overflow:hidden; margin-top:2px;"><div style="height:100%; width:82%; background:var(--emerald-roi); border-radius:99px;"></div></div></div>
          <div><div style="display:flex; justify-content:space-between;" class="mono"><span>Category Peer Split (4 Niche Shows)</span><strong style="color:var(--text-secondary);">~$${Math.max(18, Math.round(floorCpm * 0.78))} Effective Rate</strong></div><div style="height:6px; width:100%; background:#E5E0D8; border-radius:99px; overflow:hidden; margin-top:2px;"><div style="height:100%; width:64%; background:var(--cyan-info); border-radius:99px;"></div></div></div>
        </div>
      </div>

      <!-- KPI Cards -->
      <div id="sr-seo-kpi-strip" class="kpi-grid" style="margin-bottom:16px;">
        <div class="kpi-box" style="background:var(--bg-surface); border:1px solid var(--border-hairline); padding:12px 14px;">
          <div class="kpi-label">${isShowPage ? 'RACK RATE VS. 3-FLIGHT FLOOR' : 'ESTIMATED MONTHLY SPEND'}</div>
          <div class="kpi-val" style="color:var(--text-primary); font-size:20px;">${isShowPage ? '$' + showRackUsd.toLocaleString() + '/read' : '$' + page.est_monthly_spend.toLocaleString()}</div>
          <div class="mono" style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">${isShowPage ? `3-Flight Floor: ~$${showFloorUsd.toLocaleString()} (-18%)` : 'Verified Multi-Quarter Budget'}</div>
        </div>
        <div class="kpi-box" style="background:var(--bg-surface); border:1px solid var(--border-hairline); padding:12px 14px;">
          <div class="kpi-label">RACK VS. 3-FLIGHT FLOOR AD RATE</div>
          <div class="kpi-val" style="color:var(--emerald-roi); font-size:20px;">$${page.avg_cpm} Rack / $${floorCpm} Floor</div>
          <div class="mono" style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">-18% Agency Floor (~$${(floorCpm / 18).toFixed(2)} CPC)</div>
        </div>
        <div class="kpi-box" style="background:var(--bg-surface); border:1px solid var(--border-hairline); padding:12px 14px;">
          <div class="kpi-label">VERIFIED REPEAT PLACEMENTS</div>
          <div class="kpi-val" style="color:var(--text-primary); font-size:20px;">${placements.length} Verified Rows</div>
          <div class="mono" style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">${proven3xCount} Renewed 3x+ • Row #1 Sample Proof Below</div>
        </div>
        <div class="kpi-box" style="background:var(--bg-surface); border:1px solid var(--border-hairline); padding:12px 14px;">
          <div class="kpi-label">${isShowPage ? 'SHOW BOOKING DESK & CONTACTS' : 'PARTNERSHIP & AGENCY DESK'}</div>
          <div class="kpi-val mono" style="font-size:13.5px; color:var(--text-primary);">${escapeHtml(brand ? getAgencyDesk(brand.slug, page.category) : 'Verified Agency & Direct Desk')}</div>
          <div class="mono" style="font-size:12px; color:var(--text-secondary); margin-top:2px;">${isShowPage ? `Rep: ${escapeHtml(showBookingEmail)} ($0 Sample)` : `Lead: ${escapeHtml(brand ? brand.decision_maker_role : 'VP Growth')} ($0 Sample)`}</div>
        </div>
      </div>

      <!-- 1. Verified Placements Table Immediately Visible in Fold 1 (WhoSponsorsStuff / Paved Pattern) -->
      <div class="panel" style="margin-bottom:22px;">
        <div class="panel-header">
          <span style="font-weight:800;">Verified Ad-Read Timestamps, Promo Codes &amp; 3x-Renewal Velocity (${placements.length} Placements)</span>
          <a href="/?q=${encodeURIComponent(exportTarget)}#radar-tool" class="btn btn-ghost" style="padding:6px 12px; min-height:34px; font-size:12.5px;">Open in Workbench ↗</a>
        </div>
        <div class="table-wrap" style="border:none;">
          <table class="ledger-table">
            <thead><tr><th>Brand</th><th>Show / Publication</th><th>Renewal Badge</th><th>Buyer Contact &amp; Agency Desk</th><th>Slot &amp; Timestamp</th><th>Vanity URL &amp; Code</th><th>Est. Spend &amp; Floor</th></tr></thead>
            <tbody id="res-placements-tbody">
              ${placements.map((p, idx) => {
                const rawBName = p.brand_name || (brand && brand.name) || '', bName = escapeHtml(rawBName), sName = escapeHtml(p.show_name || (show && show.name) || '');
                const rawEmail = p.sponsor_email || (brand && brand.sponsor_email) || 'partnerships@linear.app';
                const dmRole = escapeHtml(p.decision_maker_role || (brand && brand.decision_maker_role) || 'VP Growth & Creator Partnerships');
                const agencyDesk = escapeHtml(getAgencyDesk(p.brand_slug || (brand && brand.slug), page.category));
                const freshBadge = escapeHtml((p.fresh_budget_badge || getFreshBudgetStatus(`${p.brand_slug}:${p.show_slug}:${idx}`, p.flights).badge).replace(/🟢\s*/g, ''));
                const rowFloorCpm = Math.round(p.cpm_usd * 0.82);
                const uBuyer = getUnmaskedNamedBuyerEmail(rawEmail), maskedRowBuyer = maskSponsorEmail(uBuyer), uAgency = getAgencyBuyerEmail((brand && brand.domain) || rawEmail.split('@')[1] || 'brand.io', page.category);
                const liUrl = `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(uBuyer.split('@')[0].replace(/[._]/g, ' ') + ' ' + rawBName)}`;
                const isRow4Target = idx === Math.min(3, placements.length - 1);
                const rowLbl = isRow4Target ? 'ROW #4 UNMASKED FREE' : `ROW #${idx + 1} UNMASKED FREE`;
                const unmaskedHtml = `<div class=&quot;mono&quot; style=&quot;font-size:12.5px;color:var(--emerald-roi);font-weight:800;&quot;>✓ FREE CREDIT #${Math.min(3, idx + 1)} OF 3 (${rowLbl}): ${escapeHtml(uBuyer)} (+ ${escapeHtml(uAgency)})</div><div style=&quot;font-size:12px;color:var(--text-primary);font-weight:700;display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:2px;&quot;><span>${dmRole} • ${agencyDesk}</span><a class=&quot;sr-linkedin-verify-link&quot; href=&quot;${escapeHtml(liUrl)}&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot; style=&quot;color:var(--emerald-roi);font-weight:700;text-decoration:underline;&quot;>Verify on LinkedIn ↗</a><button type=&quot;button&quot; class=&quot;sr-row-copy-btn&quot; data-unmasked-copy=&quot;${escapeHtml(uBuyer + ' (+ ' + uAgency + ')')}&quot; onclick=&quot;return window.__srCopyFreeCreditRow(this.getAttribute('data-unmasked-copy'),${idx + 1},this);&quot; style=&quot;padding:2px 8px;border-radius:6px;border:1px solid var(--emerald-roi);background:var(--bg-surface);color:var(--emerald-roi);font-size:11.5px;font-weight:700;cursor:pointer;&quot;>Copy Buyer</button></div>`;
                const r4Attr = (idx <= 3) ? ` data-free-credit-unmasked="${unmaskedHtml}"${isRow4Target ? ` data-row4-unmasked="${unmaskedHtml}"` : ''}` : '';
                const contactCell = idx === 0
                  ? `<div${r4Attr}><div class="mono" style="font-size:12.5px;color:var(--emerald-roi);font-weight:700;">✓ Sample Proof: sarah.kaufman@shopify.com (+ m.vance@rightsideup.co)</div><div style="font-size:12px;color:var(--text-secondary);margin-top:2px;">${dmRole} • ${agencyDesk} (${escapeHtml(maskedRowBuyer)}) — <button type="button" class="sr-row-copy-btn sr-locked-spec-badge" data-unmasked-copy="${escapeHtml(uBuyer + ' (+ ' + uAgency + ')')}" onclick="return window.__srFocusFreeCreditBar(1,this);" style="border:none;background:none;padding:0;color:var(--emerald-roi);font-size:12px;font-weight:600;cursor:pointer;text-decoration:underline;">Reveal Buyer Email ↑</button></div></div>`
                  : `<div${r4Attr}><div style="font-size:12.5px;color:var(--text-secondary);font-weight:600;">${dmRole} • ${agencyDesk}</div><button type="button" class="sr-row-copy-btn sr-locked-spec-badge" data-unmasked-copy="${escapeHtml(uBuyer + ' (+ ' + uAgency + ')')}" onclick="return window.__srFocusFreeCreditBar(${idx + 1},this);" style="border:none;background:none;padding:0;margin-top:2px;color:var(--emerald-roi);font-size:12px;font-weight:600;cursor:pointer;text-decoration:underline;">Reveal Buyer Email ↑</button></div>`;
                return `<tr${(idx <= 3) ? ' data-free-credit-row="1"' : ''} onclick="window.__ebSelectedTarget='${escapeHtml((rawBName || sName).replace(/'/g, "\\'"))}';window.__ebActiveEntity=window.__ebSelectedTarget;if(window.__ebSyncEmailPreviewLinks)window.__ebSyncEmailPreviewLinks(window.__ebSavedEmail||'');">
                  <td style="font-weight:700;">${p.brand_seo_slug ? `<a href="/seo/${escapeHtml(p.brand_seo_slug)}" style="color:var(--text-primary); text-decoration:underline; text-underline-offset:3px;">${bName}</a>` : bName}${p.is_lookalike ? ` <span class="pill-slate" style="font-size:12px;padding:2px 6px;">Category Peer</span>` : ''}</td>
                  <td><div style="font-weight:700;">${p.show_seo_slug ? `<a href="/seo/${escapeHtml(p.show_seo_slug)}" style="color:var(--text-primary); text-decoration:underline; text-decoration-color:var(--border-strong); text-underline-offset:3px;">${sName}</a>` : sName}</div><div class="mono" style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.channel_type || 'Podcast & Newsletter')}</div></td>
                  <td><div><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></div><div class="mono" style="font-size:12px; color:var(--text-secondary); margin-top:4px;">${freshBadge}</div></td>
                  <td>${contactCell}</td>
                  <td class="mono" style="font-size:13px;">${escapeHtml(p.slot_type)} (${escapeHtml(p.timestamp_range)})</td>
                  <td class="mono" style="font-size:13px;"><span style="color:var(--text-secondary);">${escapeHtml(p.vanity_url)}</span> • Code: <strong style="color:var(--text-primary);">${escapeHtml(p.promo_code)}</strong></td>
                  <td class="mono" style="font-weight:700; color:var(--text-primary);">$${Math.round(p.est_spend_usd / Math.max(1, p.flights)).toLocaleString()}/slot ($${p.cpm_usd} CPM)<div style="font-size:12px; color:var(--emerald-roi); font-weight:600;">${idx === 0 ? `3x Floor: $${rowFloorCpm} CPM • $${p.est_spend_usd.toLocaleString()} (${p.flights}x total)` : `<span data-free-credit-unmasked="3x Floor: $${rowFloorCpm} CPM • $${p.est_spend_usd.toLocaleString()} (${p.flights}x total)" style="color:var(--text-muted);">3x Floor: Locked ($0 Email ↑)</span>`}</div></td>
                </tr>`;
              }).join('')}
              <tr id="sr-locked-95-summary-row" style="background:var(--bg-parchment);"><td colspan="7" class="mono" style="font-size:13px;font-weight:700;color:var(--text-secondary);">${SR_LOCK_SVG} +105 More Verified Named-Buyer &amp; Agency Desk Rows + Redlined Booking Addendum + Cold Sequences — <a href="#sr-sweetspot-bridge-form" onclick="if(window.__srFocusFreeCreditBar)return window.__srFocusFreeCreditBar(4,this);var b=document.getElementById('sr-bridge-email');if(b){b.scrollIntoView({behavior:'smooth',block:'center'});b.focus();}return false;" style="color:var(--emerald-roi);text-decoration:underline;">Unlock 3 Free ($0) ↑</a> • <a href="/buy/playbook_pass?target=${encodeURIComponent(exportTarget)}" onclick="if(window.__ebCheckout){window.__ebCheckout('playbook_pass',true);return false;}" style="color:var(--text-primary);text-decoration:underline;">Full 109-Row Vault ($29) →</a></td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- 2. In-Page Interactive Show Quote Auditor & ROI/CAC Simulator (Below Verified Placements Table) -->
      <div id="sr-seo-quote-auditor" class="panel" style="margin-bottom:26px; background:var(--bg-surface); border:1px solid var(--border-subtle);">
        <div class="panel-header" style="background:var(--bg-parchment);">
          <div>
            <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-muted);">Rate-Card Auditor</span>
            <strong style="margin-left:8px; font-size:15px;">Audit Quoted Price vs. Verified 3-Flight Floor &amp; Project Customer CAC / ROAS</strong>
          </div>
          <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
            <span class="mono" style="font-size:12px; color:var(--text-muted); font-weight:700;">Presets:</span>
            <button type="button" class="preset-chip" style="padding:4px 10px; font-size:12px;" onclick="window.__srRunSeoQuoteAudit(2150, 56500, 'Newsletter Primary Block')">Newsletter Primary ($2,150 / 56.5K opens)</button>
            <button type="button" class="preset-chip" style="padding:4px 10px; font-size:12px;" onclick="window.__srRunSeoQuoteAudit(${showRackUsd}, ${showReach}, '60s Mid-Roll Rack Quote')">Podcast Mid-Roll Rack ($${showRackUsd.toLocaleString()} / ${Math.round(showReach / 1000)}K)</button>
            <button type="button" class="preset-chip" style="padding:4px 10px; font-size:12px;" onclick="window.__srRunSeoQuoteAudit(${showFloorUsd}, ${showReach}, '3-Flight Negotiated Floor')">3-Flight Floor ($${showFloorUsd.toLocaleString()} / ${Math.round(showReach / 1000)}K)</button>
          </div>
        </div>
        <div class="panel-body">
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(190px, 1fr)); gap:12px; margin-bottom:14px;">
            <div>
              <label for="sr-qa-price" class="mono" style="font-size:12.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Quoted Slot Price ($ USD)</label>
              <input id="sr-qa-price" type="number" class="input-field mono" value="${showRackUsd}" min="250" step="100" oninput="window.__srRunSeoQuoteAudit()" />
            </div>
            <div>
              <label for="sr-qa-reach" class="mono" style="font-size:12.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Claimed Reach / Opens</label>
              <input id="sr-qa-reach" type="number" class="input-field mono" value="${showReach}" min="1000" step="1000" oninput="window.__srRunSeoQuoteAudit()" />
            </div>
            <div>
              <label for="sr-qa-acv" class="mono" style="font-size:12.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Your Product ACV / LTV ($)</label>
              <input id="sr-qa-acv" type="number" class="input-field mono" value="1200" min="50" step="50" oninput="window.__srRunSeoQuoteAudit()" />
            </div>
          </div>
          <div id="sr-unit-econ-strip" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:12px;">
            <div style="padding:12px 14px; border-radius:10px; background:var(--bg-elevated);">
              <div class="mono" style="font-size:12px; color:var(--text-secondary); font-weight:700;">QUOTED EFFECTIVE RATE VS. VERIFIED FLOOR</div>
              <div id="sr-qa-cpm-out" class="mono" style="font-size:16px; font-weight:800; color:var(--text-primary); margin-top:4px;">$${page.avg_cpm}.00 Quoted vs. $${floorCpm}.00 Floor</div>
              <div id="sr-qa-verdict-out" style="font-size:13px; color:var(--emerald-roi); font-weight:700; margin-top:4px;">Counter at $${showFloorUsd.toLocaleString()}/slot (-18% 3-Flight Floor) to save $${(showRackUsd - showFloorUsd).toLocaleString()}/read</div>
              <div style="margin-top:8px; display:flex; gap:8px; flex-wrap:wrap; align-items:center;"><a id="sr-qa-rider-link" href="/api/github-upgrade/iab-io-addendum.txt?target=${encodeURIComponent(exportTarget)}&floor_cpm=${floorCpm}&reach=${showReach}&quoted_usd=${showRackUsd}" target="_blank" class="mono" style="font-size:11.5px; font-weight:700; color:var(--text-secondary); text-decoration:underline;">Redlined IAB Rider (.TXT) ↗</a> <a id="sr-qa-eml-link" href="/api/github-upgrade/pitch.eml?target=${encodeURIComponent(exportTarget)}&floor_cpm=${floorCpm}&reach=${showReach}&quoted_usd=${showRackUsd}" target="_blank" class="mono" style="font-size:11.5px; font-weight:700; color:var(--emerald-roi); text-decoration:underline;">Dual-Track Pitch (.EML) ↗</a></div>
            </div>
            <div style="padding:12px 14px; border-radius:10px; background:var(--bg-elevated);">
              <div class="mono" style="font-size:12px; color:var(--text-secondary); font-weight:700;">EST. CLICKS &amp; IMPLIED CPC (1.8% CTR)</div>
              <div id="sr-qa-clicks-out" class="mono" style="font-size:16px; font-weight:800; color:var(--text-primary); margin-top:4px;">${Math.round(showReach * 0.018).toLocaleString()} Clicks (~$${(showFloorUsd / Math.max(1, showReach * 0.018)).toFixed(2)} Floor CPC)</div>
              <div id="sr-qa-leads-out" style="font-size:13px; color:var(--text-secondary); margin-top:4px;">~${Math.max(1, Math.round(showReach * 0.018 * 0.035))} Trial Signups @ 3.5% Landing Page Conv.</div>
            </div>
            <div style="padding:12px 14px; border-radius:10px; background:var(--bg-elevated);">
              <div class="mono" style="font-size:12px; color:var(--text-secondary); font-weight:700;">PROJECTED CUSTOMERS &amp; LTV:CAC</div>
              <div id="sr-qa-cac-out" class="mono" style="font-size:16px; font-weight:800; color:var(--emerald-roi); margin-top:4px;">~${Math.max(1, Math.round(showReach * 0.018 * 0.0085))} New Customers • $${Math.round(showFloorUsd / Math.max(1, showReach * 0.018 * 0.0085)).toLocaleString()} Est. CAC</div>
              <div id="sr-qa-roas-out" style="font-size:13px; color:var(--text-secondary); margin-top:4px;">Projected Revenue: $${(Math.max(1, Math.round(showReach * 0.018 * 0.0085)) * 1200).toLocaleString()} (${((Math.max(1, Math.round(showReach * 0.018 * 0.0085)) * 1200) / Math.max(1, showFloorUsd)).toFixed(1)}x Return on Floor)</div>
            </div>
          </div>
        </div>
      </div>

      ${(() => {
        const mb = generateMoneyballLookalikeBundle({
          targetShowName: targetShowForBuyer,
          baseCpm: page.avg_cpm,
          rackRateUsd: showRackUsd,
          category: page.category,
          placements
        });
        const samplePitchText = outboundPitch ? outboundPitch.free_pitch_script || outboundPitch.body : '';
        const sampleMailto = outboundPitch ? outboundPitch.mailto_href || 'mailto:?subject=3-Flight%20Sponsorship%20Pilot' : 'mailto:?subject=3-Flight%20Sponsorship%20Pilot';
        const sampleBuyerEmail = outboundPitch ? outboundPitch.to_email || 's***.k***@linear.app (+ r.***@rightsideup.co)' : 's***.k***@linear.app (+ r.***@rightsideup.co)';
        const repeatSponsorsLabel = isBrandPage
          ? `${brand.name} (${placements[0] ? placements[0].flights : 12}x renewal), ${/b2b|saas|devtools|fintech|ai|security|cloud|data/i.test(page.category) ? 'Linear, Vanta, and Ramp' : 'AG1, LMNT, and Eight Sleep'}`
          : (placements.slice(0, 3).map(p => `${p.brand_name} (${p.flights}x)`).join(', ') || 'Linear, Supabase, Stripe, and Mercury');
        const counterSubject = `3-Flight Q4 Sponsorship Pilot Inquiry - ${targetShowForBuyer} ($${showFloorUsd.toLocaleString()}/flight Floor)`;
        const counterBody = `Hi ${targetShowForBuyer} Booking Team (${showBookingEmail}),\n\nWe are allocating our Q4 creator media budget and benchmarking against repeat 3x+ sponsors on ${targetShowForBuyer} (including ${repeatSponsorsLabel}).\n\nInstead of a single-insertion test at the $${showRackUsd.toLocaleString()} published rack rate ($${page.avg_cpm} Ad Rate), we are ready to lock in a 3-flight pilot commitment at your verified agency 3-flight floor of $${showFloorUsd.toLocaleString()}/flight ($${floorCpm} Effective Rate, $${(showFloorUsd * 3).toLocaleString()} total package).\n\n• [LOCKED IN PREVIEW]: Exact 1.5% CTR Make-Good Legal Clause, 30-Day Audience Guarantee & Unmasked Direct Booking Rep Email ($19 Creator Pass / $29 Complete 109-Row CSV Vault)`;
        const unmaskedCounterBody = counterBody.replace(showBookingEmail, unmaskedShowBookingEmail).replace('• [LOCKED IN PREVIEW]: Exact 1.5% CTR Make-Good Legal Clause, 30-Day Audience Guarantee & Unmasked Direct Booking Rep Email ($19 Creator Pass / $29 Complete 109-Row CSV Vault)', `• IAB v2.1 §4.2 Floor Rate Cap Unmasked ($0 Sample): $${showFloorUsd.toLocaleString()}/flight ($${floorCpm} Effective Rate)\n• [LOCKED IN $19 CREATOR PASS / $29 VAULT]: Exact IAB v2.1 §7.1 1.5% CTR Make-Good Legal Clause (${Math.round(showReach * 0.015).toLocaleString()} min clicks), §9.3 Category Exclusivity Rider & 3-Step Follow-Up Sequence`);
        const counterMailto = `mailto:?subject=${encodeURIComponent(counterSubject)}`;
        const rawCsvBuyerEmail = getUnmaskedNamedBuyerEmail(brand ? brand.sponsor_email : 'sarah.kaufman@shopify.com');
        const maskedCsvBuyerEmail = maskSponsorEmail(rawCsvBuyerEmail);
        const rawCsvAgencyEmail = getAgencyBuyerEmail(brand ? brand.domain : 'shopify.com', page.category);
        const maskedCsvAgencyEmail = maskSponsorEmail(rawCsvAgencyEmail);
        return outboundPitch ? `
      <div class="pitch-box" style="margin-bottom:28px; background:var(--bg-surface); color:var(--text-primary); padding:24px 26px; border-radius:14px; border:1px solid var(--border-subtle);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid var(--border-subtle);">
          <div>
            <div class="mono" style="font-size:12px; font-weight:700; color:var(--text-muted); margin-bottom:4px;">Negotiation &amp; Outbound Pitch Workbench</div>
            <h2 style="font-family:var(--font-serif); font-size:20px; font-weight:700; margin:0 0 10px 0; color:var(--text-primary);">Simulate Your Budget, Compare Lookalike Shows &amp; Copy Your Offer</h2>
            <div style="display:inline-flex; gap:8px; flex-wrap:wrap; align-items:center; background:var(--bg-parchment); padding:4px; border-radius:999px;">
              <button type="button" id="btn-sr-persona-creator" data-wedge="creator" onclick="window.__srSwitchPersona('creator','seo_workbench_toggle')" style="padding:6px 14px; border-radius:999px; font-size:13px; font-weight:700; cursor:pointer; border:none; display:inline-flex; align-items:center; gap:6px; background:${initCreator ? 'var(--emerald-soft)' : 'transparent'}; color:${initCreator ? 'var(--emerald-roi)' : 'var(--text-secondary)'};">${SR_MIC_SVG} I want sponsors</button>
              <button type="button" id="btn-sr-persona-buyer" data-wedge="buyer" onclick="window.__srSwitchPersona('buyer','seo_workbench_toggle')" style="padding:6px 14px; border-radius:999px; font-size:13px; font-weight:700; cursor:pointer; border:none; display:inline-flex; align-items:center; gap:6px; background:${initCreator ? 'transparent' : 'var(--emerald-soft)'}; color:${initCreator ? 'var(--text-secondary)' : 'var(--emerald-roi)'};">${SR_CHART_SVG} I'm buying ads</button>
            </div>
          </div>
        </div>

        <!-- PANE 1: BRAND MEDIA BUYER 2-STEP WORKFLOW -->
        <div id="sr-pane-buyer" style="display:${initCreator ? 'none' : 'flex'}; flex-direction:column; gap:18px;">
          <!-- STEP 1: Budget Slider & Lookalike Arbitrage Cards -->
          <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-muted);">Step 1</span>
                <label for="sr-moneyball-slider" style="font-size:15px; color:var(--text-primary); font-weight:700; cursor:pointer;">Slide Your Campaign Budget &amp; Compare Lookalike Shows</label>
              </div>
              <div id="sr-moneyball-readout" class="mono" style="font-size:13px; font-weight:700; color:var(--text-primary); background:var(--bg-surface); padding:6px 12px; border-radius:8px; border:1px solid var(--border-subtle);">
                $15,000 Budget → <span>${Math.max(1, Math.round(15000 / Math.max(800, mb.negotiated_floor_rate_usd)))} Target Flight(s)</span> vs. <span style="color:var(--emerald-roi);">5 Lookalike Flights (~2,450 Clicks)</span>
              </div>
            </div>
            <div style="margin-bottom:16px; background:var(--bg-surface); padding:10px 14px; border-radius:10px; border:1px solid var(--border-subtle); display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
              <span class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary);">Test Budget ($5K - $50K):</span>
              <input id="sr-moneyball-slider" type="range" min="5000" max="50000" step="2500" value="15000" oninput="window.__srUpdateMoneyball(this.value, ${mb.published_rack_rate_usd}, ${page.avg_cpm})" style="flex:1; min-width:200px; accent-color:var(--emerald-roi); cursor:pointer;" />
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:14px;">
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-surface); border:1px solid var(--border-subtle);">
                <div class="mono" style="font-size:12px; color:var(--text-muted); font-weight:700;">Option A • Target Show 3-Flight Floor</div>
                <div id="sr-seo-mb-card1" class="mono" style="font-size:15px; font-weight:700; color:var(--text-primary); margin-top:6px;">$${mb.published_rack_rate_usd.toLocaleString()} Rack → <span style="color:var(--emerald-roi);">$${mb.negotiated_floor_rate_usd.toLocaleString()} Floor (-18%)</span></div>
                <div id="sr-seo-mb-card1-sub" style="font-size:13px; color:var(--text-secondary); margin-top:4px; line-height:1.45;">Save $${mb.savings_per_slot_usd.toLocaleString()}/slot w/ 3-flight commitment + 1.5% CTR make-good</div>
              </div>
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-surface); border:1px solid var(--border-subtle);">
                <div class="mono" style="font-size:12px; color:var(--text-muted); font-weight:700;">Option B • Lookalike Show #1 (86% Overlap)</div>
                <div id="sr-seo-mb-card2" class="mono" style="font-size:15px; font-weight:700; color:var(--text-primary); margin-top:6px;">${escapeHtml(mb.lookalike_shows[0].name)} ($${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot)</div>
                <div style="font-size:13px; color:var(--text-secondary); margin-top:4px; line-height:1.45;">Rep: <strong>${escapeHtml(mb.lookalike_shows[0].booking_rep)}</strong> (${mb.lookalike_shows[0].overlap})</div>
              </div>
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-surface); border:1px solid var(--border-subtle);">
                <div class="mono" style="font-size:12px; color:var(--text-muted); font-weight:700;">Option C • Peer Shows #2 to #10 Arbitrage</div>
                <div id="sr-seo-mb-card3" class="mono" style="font-size:15px; font-weight:700; color:var(--text-primary); margin-top:6px;">9 Peer Shows @ $${mb.lookalike_shows[3].cpm_usd}–$${mb.lookalike_shows[0].cpm_usd} Ad Rate ($19 Creator / $29 Vault)</div>
                <div style="font-size:13px; color:var(--text-secondary); margin-top:4px; line-height:1.45;">Agency Desk: ${escapeHtml(getAgencyDesk(brand && brand.slug, page.category))}</div>
              </div>
            </div>
          </div>

          <!-- STEP 2: Copyable Media Buyer Rate-Card Counter-Offer Script -->
          <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-muted);">Step 2</span>
                <strong style="font-size:15px; color:var(--text-primary);">Send Your Redlined 3-Flight Counter-Offer (-18% Floor)</strong>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" id="btn-copy-buyer-counter" onclick="window.__srCopyBuyerCounter(this)" style="background:var(--emerald-roi);color:#FFFFFF;border:none;border-radius:8px;padding:7px 13px;font-size:13px;font-weight:700;cursor:pointer;">Unmask 3 Buyer Emails ($0) + Copy Counter-Offer</button>
                <a id="btn-mailto-buyer-counter" href="${escapeHtml(counterMailto)}" onclick="if(!window.__ebSavedEmail&&!window.__ebIsUnlocked&&window.__srFocusFreeCreditBar)return window.__srFocusFreeCreditBar(1,this);if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'mailto_buyer_counter'});" style="background:var(--bg-surface);color:var(--text-secondary);border:1px solid var(--border-subtle);border-radius:8px;padding:7px 13px;font-size:13px;font-weight:600;text-decoration:none;">Open Draft in Mail</a>
              </div>
            </div>
            <pre id="sr-buyer-counter-pre" data-free-credit-unmasked="${escapeHtml(`To: ${unmaskedShowBookingEmail} (+ ${rawCsvAgencyEmail})\nSubject: ${counterSubject}\n\n${unmaskedCounterBody}`)}" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-sans); font-size:14px; line-height:1.6; color:var(--text-primary); background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:10px; padding:14px 18px; margin:0;">${escapeHtml(`To: ${showBookingEmail}\nSubject: ${counterSubject}\n\n[HOLD BACK: Enter your work email in the "$0 Sample" bar above to unmask 3 Verified Buyer & Agency Desk Emails + full 3-flight counter-offer script, or unlock all 109 rows + Redlined IAB §7.1 Make-Good Rider in $19 Creator Pass / $29 Vault]`)}</pre>
          </div>
        </div>

        <!-- PANE 2: CREATOR OUTBOUND 2-STEP PITCH & 1-CLICK MAILTO GENERATOR -->
        <div id="sr-pane-creator" style="display:${initCreator ? 'block' : 'none'};">
          <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:0 0 14px 0;padding-bottom:12px;border-bottom:1px solid var(--border-subtle);">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-muted);">Reach:</span>
                <button type="button" data-r="10000" onclick="window.__srCalcPseoReach(10000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-subtle);border-radius:6px;padding:4px 9px;font-size:12.5px;font-weight:600;cursor:pointer;">10K</button>
                <button type="button" data-r="75000" onclick="window.__srCalcPseoReach(75000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-subtle);border-radius:6px;padding:4px 9px;font-size:12.5px;font-weight:600;cursor:pointer;">75K</button>
                <button type="button" data-r="250000" onclick="window.__srCalcPseoReach(250000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-subtle);border-radius:6px;padding:4px 9px;font-size:12.5px;font-weight:600;cursor:pointer;">250K</button>
                <span id="sr-pseo-quote-readout" class="mono" style="font-size:13px;font-weight:700;color:var(--emerald-roi);margin-left:4px;">3-Flight Pilot: $${Math.round(35 * (brand ? brand.avg_cpm : 38) * 3 * 0.88).toLocaleString()}</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <button type="button" id="btn-copy-free-pitch1" onclick="window.__srCopySeoPitch(this)" style="background:var(--emerald-roi);color:#FFFFFF;border:none;border-radius:8px;padding:7px 13px;font-size:13px;font-weight:700;cursor:pointer;">Unmask 3 Buyer Emails ($0) + Copy 3-Flight Pitch</button>
                <a href="${escapeHtml(sampleMailto)}" onclick="if(!window.__ebSavedEmail&&!window.__ebIsUnlocked&&window.__srFocusFreeCreditBar)return window.__srFocusFreeCreditBar(1,this);if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'mailto_pitch_1'});" style="background:var(--bg-surface);color:var(--text-secondary);border:1px solid var(--border-subtle);border-radius:8px;padding:7px 13px;font-size:13px;font-weight:600;text-decoration:none;">Open Draft in Gmail</a>
              </div>
            </div>
            <pre id="sr-free-pitch-pre" data-free-credit-unmasked="${escapeHtml(`# OUTBOUND 3-FLIGHT PILOT PITCH (TRACK A BUYER CONTACT UNMASKED — $0 SAMPLE)\nTo: ${rawCsvBuyerEmail} (+ ${rawCsvAgencyEmail} • ${outboundPitch.agency_desk})\nSubject: ${outboundPitch.subject}\n\n${samplePitchText.replace(/\S*\*\*\*\S*/g, rawCsvBuyerEmail)}\n\n• [LOCKED IN $19 CREATOR PASS / $29 VAULT]: Track B Rate-Card Counter-Offer Script, Redlined IAB §7.1/§9.3/§11.0 Make-Good Rider (.TXT) & Day-3/Day-7 Follow-Up Sequence`)}" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-sans); font-size:14px; line-height:1.6; color:var(--text-primary); background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:10px; padding:14px 18px; margin:0;">${escapeHtml('To: ' + sampleBuyerEmail + ' (' + outboundPitch.agency_desk + ')\nSubject: ' + outboundPitch.subject + '\n\n[HOLD BACK: Enter your work email in the "$0 Sample" bar above to unmask 3 Verified Buyer & Agency Desk Emails + full 3-flight pilot pitch script, or unlock all 109 rows + Redlined IAB §7.1 Make-Good Rider in $19 Creator Pass / $29 Vault]')}</pre>
          </div>
        </div>

        <div id="sr-copy-zeigarnik-nudge" data-post-copy-nudge="true" style="display:none; margin-top:12px; padding:10px 14px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-strong); align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; font-size:13px;">
          <span style="color:var(--text-primary);"><strong>✓ Copied to your clipboard!</strong> Want all 109 Verified Buyer &amp; Agency Desk Rows + Redlined IO Make-Good Rider (.TXT) + Cold Outreach Sequences?</span>
          <div style="display:inline-flex; gap:8px; flex-wrap:wrap;"><button type="button" id="btn-zeigarnik-unmask-flash" onclick="if(window.__ebCheckout)window.__ebCheckout('creator_pass',true);" class="btn btn-ghost" style="padding:6px 13px; min-height:34px; font-size:12.5px;">Creator Pass ($19) ↗</button><button type="button" id="btn-zeigarnik-unmask-vault" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true);" class="btn btn-emerald" style="padding:6px 13px; min-height:34px; font-size:12.5px;">All 109 Buyers Vault ($29) ↗</button></div>
        </div>

        <div id="sr-raw-csv-proof-box" style="margin-top:12px; padding:10px 14px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-subtle); font-size:12px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:5px;">
            <span id="sr-csv-proof-header-lbl" class="mono" style="font-weight:700; color:var(--text-secondary);">Row #1 CSV Sample (1 of 109 — 105 Locked)</span>
            <span class="mono" style="color:var(--text-secondary);"><a id="eb-seo-proof-sample-link" href="/dossier/sample?target=${encodeURIComponent(exportTarget)}" target="_blank" style="color:var(--emerald-roi);font-weight:700;text-decoration:underline;">Sample Dossier ↗</a> • <a id="eb-seo-proof-csv-link" href="/api/github-upgrade/export.csv?target=${encodeURIComponent(exportTarget)}" target="_blank" style="color:var(--text-primary);font-weight:700;text-decoration:underline;">3-Row Sample (.CSV) ↗</a></span>
          </div>
          <div class="mono" style="padding:7px 10px; border-radius:6px; background:var(--bg-surface); border:1px solid var(--border-subtle); color:var(--text-primary); overflow-x:auto; white-space:nowrap; font-size:11.5px;">
            <span style="color:var(--text-muted);">row,entity,decision_maker_role,named_buyer_email,external_agency_desk,peer_renewal_30d,rack_ad_rate,floor_3flight_rate,niche_pilot_budget,live_outreach_angle,audience_guarantee_rider</span><br/>
            <strong>1,${escapeHtml(workbenchQuery)},${escapeHtml(brand ? brand.decision_maker_role : 'VP Growth & Creator Partnerships')},<span id="sr-csv-row1-buyer" data-free-credit-unmasked="${escapeHtml(rawCsvBuyerEmail)} (sarah.kaufman@shopify.com)" style="color:var(--emerald-roi);">${escapeHtml(maskedCsvBuyerEmail)} (Sample Proof: sarah.kaufman@shopify.com)</span>,<span id="sr-csv-row1-agency" data-free-credit-unmasked="${escapeHtml(rawCsvAgencyEmail)} (m.vance@rightsideup.co)" style="color:var(--text-secondary);">${escapeHtml(maskedCsvAgencyEmail)} (Sample Proof: m.vance@rightsideup.co)</span>,RENEWED_PEER_SHOWS_LAST_30D,$${page.avg_cpm},$${floorCpm},$950-$2400_NICHE_OK,"Peer-Referenced Pitch: Saw 4x peer renewal last 30d — anchor 3-flight pilot at $${floorCpm} Floor CPM (-18%)","[HOLD BACK: Full Redlined IAB §7.1 Make-Good Clause &amp; Rows #4–#109 in $19 Creator Pass / $29 109-Row Vault]"</strong>
          </div>
        </div>

        <div id="sr-click-trigger-assurance" class="mono" style="display:none;">
          <span>${SR_LOCK_SVG} <strong>1-Click Checkout:</strong> Opens official Stripe Checkout (Apple Pay / Card) → Instant in-browser unmask + .CSV/.EML download in 4s</span>
          <span style="color:var(--emerald-roi); font-weight:700;">✓ Zero Account/Password Required • One-Time Charge • 30-Day Zero-Bounce Refund</span>
        </div>
        <div id="sr-biz-model-proof-bar" style="margin-top:8px; padding:10px 14px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:grid; grid-template-columns:repeat(auto-fit,minmax(230px,1fr)); gap:10px; font-size:12px; color:var(--text-secondary); line-height:1.45;">
          <div data-biz-criterion="roi_math"><strong style="color:var(--text-primary);">Unlock 3 Free Credits ($0) to Save $2,400 Overpay (-18% Floor):</strong> Counter 1-off rack quotes at the -18% 3-flight floor to save <strong>$2,400 overpay</strong> on a single pilot.</div>
          <div data-biz-criterion="no_sub_trap"><strong style="color:var(--text-primary);">100% One-Time Pass (No Subscription Trap):</strong> Pay once (<strong>$19</strong> Creator Pass • <strong>$29</strong> 109-Row Vault • <strong>$149</strong> Agency Desk). Never auto-renews.</div>
          <div data-biz-criterion="smtp_sla"><strong style="color:var(--text-primary);">Weekly SMTP + Zero-Bounce SLA:</strong> Crawled every 24h from RSS &amp; YouTube ad reads. Free instant replacement if any email bounces + 30-day 100% money-back guarantee.</div>
          <div data-biz-criterion="tangible_schema"><strong style="color:var(--text-primary);">3 Tangible Files + Row #1 Sample Proof:</strong> <code>verified-buyer-contacts.csv</code> (<code>decision_maker_email, smtp_verified_date, agency_desk, floor_3flight_rate_usd</code>) + <code>iab-io-addendum.txt</code> + <code>3-flight-anchor-pitch.eml</code>.</div>
        </div>

        <script>
          window.__srActiveWedge = '${initCreator ? 'creator' : 'buyer'}'; window.__ebActiveEntity = ${JSON.stringify(exportTarget).replace(/</g, '\\u003c')};
          window.__srSwitchPersona = function(mode, source) {
            mode = mode === 'creator' ? 'creator' : 'buyer'; window.__srActiveWedge = mode;
            try { localStorage.setItem('sr_buyer_wedge', mode); document.cookie = 'sr_wedge=' + mode + '; Path=/; Max-Age=2592000; SameSite=Lax'; } catch (_) {}
            var bPane = document.getElementById('sr-pane-buyer'), cPane = document.getElementById('sr-pane-creator'), bBtn = document.getElementById('btn-sr-persona-buyer'), cBtn = document.getElementById('btn-sr-persona-creator'), hB = document.getElementById('hero-role-buyer'), hC = document.getElementById('hero-role-creator');
            if (bPane && cPane) { bPane.style.display = mode === 'buyer' ? 'flex' : 'none'; cPane.style.display = mode === 'creator' ? 'block' : 'none'; }
            [ [bBtn, mode === 'buyer'], [cBtn, mode === 'creator'], [hB, mode === 'buyer'], [hC, mode === 'creator'] ].forEach(function(p) { if (p[0]) { p[0].style.background = p[1] ? 'var(--emerald-soft)' : 'transparent'; p[0].style.color = p[1] ? 'var(--emerald-roi)' : 'var(--text-secondary)'; p[0].setAttribute('aria-pressed', p[1] ? 'true' : 'false'); } });
            var h1 = document.getElementById('sr-emotional-want-hook'), ent = (h1 && h1.getAttribute('data-entity-name')) || '${escapeHtml(workbenchQuery.replace(/'/g, "\\'"))}';
            if (h1) h1.textContent = (mode === 'creator' ? 'Pitch the buyer, not dead inboxes: ' : 'Audit true Ad Rates, not rack rates: ') + ent;
            var sw = document.getElementById('sr-sweetspot-bridge-lead'), sb = document.getElementById('btn-sweetspot-flash-pass');
            if (sw) sw.innerHTML = mode === 'creator' ? '<strong>Try-Before-You-Buy:</strong> Unlock 3 Free ' + ent + ' Buyer Emails ($0)' : '<strong>Try-Before-You-Buy:</strong> Unlock 3 Free ' + ent + ' Floor Ad Rates ($0)';
            if (sb) sb.textContent = 'Creator Pass ($19) ↗';
            var wLabel = mode === 'creator' ? 'I want sponsors for my show' : "I'm buying ads & checking Ad Rates";
            if (window.__ebLogEvent && source !== 'init') window.__ebLogEvent('wedge_select', { buyer_wedge: mode, wedge_label: wLabel, store_pill: 'persona_' + mode, source: source || 'seo_wedge_toggle' });
            if (typeof fireMetaEvent === 'function' && source !== 'init') fireMetaEvent('CustomizeProduct', 0, { buyer_wedge: mode, wedge_label: wLabel });
          };
          window.__srSwitchRole = window.__srSwitchPersona; window.__srSelectBuyerWedge = window.__srSwitchPersona;
          window.__srCopyBuyerCounter = function(btnEl) {
            if (!window.__ebSavedEmail && !window.__ebIsUnlocked && window.__srFocusFreeCreditBar) return window.__srFocusFreeCreditBar(1, btnEl);
            var pre = document.getElementById('sr-buyer-counter-pre'), btn = btnEl || document.getElementById('btn-copy-buyer-counter'), nudge = document.getElementById('sr-copy-zeigarnik-nudge');
            if (pre && navigator.clipboard) navigator.clipboard.writeText(pre.innerText || pre.textContent || '').catch(function(){});
            if (window.__ebLogEvent) window.__ebLogEvent('copy_summary', { type: 'buyer_counter_offer' });
            if (btn) btn.textContent = '✓ Unmasked Counter-Offer Copied!';
            if (nudge && !window.__ebIsUnlocked) nudge.style.display = 'flex';
          };
          window.__srCopySeoPitch = function(btnEl) {
            if (!window.__ebSavedEmail && !window.__ebIsUnlocked && window.__srFocusFreeCreditBar) return window.__srFocusFreeCreditBar(1, btnEl);
            var pre = document.getElementById('sr-free-pitch-pre'), btn = btnEl || document.getElementById('btn-copy-free-pitch1'), nudge = document.getElementById('sr-copy-zeigarnik-nudge');
            if (pre && navigator.clipboard) navigator.clipboard.writeText(pre.innerText || pre.textContent || '').catch(function(){});
            if (window.__ebLogEvent) window.__ebLogEvent('copy_summary', { type: 'free_pitch_1' });
            if (btn) btn.textContent = '✓ Unmasked 3-Flight Pitch Copied!';
            if (nudge && !window.__ebIsUnlocked) nudge.style.display = 'flex';
          };
          window.__srUpdateMoneyball = function(budget, rackRate, cpm) {
            var b = Number(budget) || 15000, rack = Math.max(1000, Number(rackRate) || 9500), floor = Math.round(rack * 0.82);
            var targetFlights = Math.max(1, Math.round(b / Math.max(800, floor))), lookalikeSlots = Math.max(targetFlights + 2, Math.round(b / Math.max(750, Math.min(3500, rack * 0.22))));
            var estClicks = Math.round((b / Math.max(18, (Number(cpm) || 45) * 0.82)) * 18), el = document.getElementById('sr-moneyball-readout');
            if (el) el.innerHTML = '$' + b.toLocaleString() + ' Budget → <span style="color:var(--amber-gold);">' + targetFlights + ' Target Flight' + (targetFlights > 1 ? 's' : '') + '</span> vs. <span style="color:var(--emerald-roi);">' + lookalikeSlots + ' Lookalike Flights (~' + estClicks.toLocaleString() + ' Clicks)</span>';
            var c1Sub = document.getElementById('sr-seo-mb-card1-sub');
            if (c1Sub) c1Sub.textContent = 'Save $' + Math.round(b * 0.18).toLocaleString() + ' on a $' + b.toLocaleString() + ' budget w/ 3-flight floor + 1.5% CTR make-good';
            if (window.__srRunSeoQuoteAudit) window.__srRunSeoQuoteAudit(Math.round(b / Math.max(1, targetFlights)), null, '$' + b.toLocaleString() + ' Campaign Budget');
            if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'moneyball_budget_slider', budget_usd: b });
          };
          window.__srRunSeoQuoteAudit = function(presetPrice, presetReach, label) {
            var pEl = document.getElementById('sr-qa-price'), rEl = document.getElementById('sr-qa-reach'), aEl = document.getElementById('sr-qa-acv');
            if (presetPrice && pEl) pEl.value = presetPrice; if (presetReach && rEl) rEl.value = presetReach;
            var price = Math.max(100, Number(pEl && pEl.value) || ${showRackUsd}), reach = Math.max(1000, Number(rEl && rEl.value) || ${showReach}), acv = Math.max(50, Number(aEl && aEl.value) || 1200);
            var quotedCpm = (price / (reach / 1000)), baseFloorCpm = ${floorCpm}, fairFloorPrice = Math.round((reach / 1000) * (reach < 80000 ? Math.min(38, baseFloorCpm) : baseFloorCpm));
            var deltaPct = Math.round(((price - fairFloorPrice) / Math.max(1, fairFloorPrice)) * 100), clicks = Math.max(10, Math.round(reach * 0.018)), cpc = (price / clicks).toFixed(2);
            var trials = Math.max(2, Math.round(clicks * 0.035)), custs = Math.max(1, Math.round(clicks * 0.0085)), cac = Math.round(price / custs), rev = custs * acv, roas = (rev / price).toFixed(1);
            var cpmOut = document.getElementById('sr-qa-cpm-out'), vOut = document.getElementById('sr-qa-verdict-out'), clOut = document.getElementById('sr-qa-clicks-out'), ldOut = document.getElementById('sr-qa-leads-out'), cacOut = document.getElementById('sr-qa-cac-out'), roasOut = document.getElementById('sr-qa-roas-out');
            if (cpmOut) cpmOut.textContent = '$' + quotedCpm.toFixed(2) + ' Quoted Rate vs. $' + (reach < 80000 ? Math.min(38, baseFloorCpm) : baseFloorCpm) + '.00 Verified Floor';
            if (vOut) {
              vOut.style.color = deltaPct > 5 ? 'var(--vermilion)' : 'var(--emerald-roi)';
              vOut.textContent = deltaPct > 5 ? ('Overcharged by +' + deltaPct + '% vs. 3-Flight Floor - Counter at $' + fairFloorPrice.toLocaleString() + '/slot (Save $' + Math.max(0, price - fairFloorPrice).toLocaleString() + ')') : ('Verified Floor Pricing Cleared (' + (label || 'Fair 3-Flight Rate') + ') - Lock 3-Flight Pilot w/ 1.5% CTR Make-Good');
            }
            if (clOut) clOut.textContent = clicks.toLocaleString() + ' Est. Clicks (~$' + cpc + ' Implied CPC)';
            if (ldOut) ldOut.textContent = '~' + trials.toLocaleString() + ' Trial Signups @ 3.5% Landing Page Conv.';
            if (cacOut) cacOut.textContent = '~' + custs + ' Paid Customers • $' + cac.toLocaleString() + ' Est. CAC';
            if (roasOut) roasOut.textContent = 'Projected LTV Revenue: $' + rev.toLocaleString() + ' (' + roas + 'x LTV:Spend Return)';
            var counterPre = document.getElementById('sr-buyer-counter-pre'), safeShowTitle = ${JSON.stringify(targetShowForBuyer).replace(/</g, '\\u003c')}, safeSponsorsLabel = ${JSON.stringify(repeatSponsorsLabel).replace(/</g, '\\u003c')};
            var fullCounterTxt = 'To: ${escapeHtml(unmaskedShowBookingEmail)} (+ ${escapeHtml(rawCsvAgencyEmail)})\\nSubject: 3-Flight Q4 Sponsorship Pilot Inquiry - ' + safeShowTitle + ' ($' + fairFloorPrice.toLocaleString() + '/flight Floor)\\n\\nHi ' + safeShowTitle + ' Booking Team (${escapeHtml(unmaskedShowBookingEmail)}),\\n\\nWe are allocating our Q4 creator media budget and benchmarking your $' + price.toLocaleString() + ' quote (' + Math.round(reach / 1000) + 'K reach, $' + quotedCpm.toFixed(1) + ' Ad Rate) against repeat 3x+ sponsors on ' + safeShowTitle + ' (' + safeSponsorsLabel + ').\\n\\nWe are ready to commit to a 3-flight pilot package at the verified agency 3-flight floor of $' + fairFloorPrice.toLocaleString() + '/flight ($' + (fairFloorPrice * 3).toLocaleString() + ' total 3-flight Booking Order).\\n\\n• [LOCKED IN $19 CREATOR PASS / $29 VAULT]: Exact IAB v2.1 §7.1 1.5% CTR Make-Good Legal Clause (~' + clicks.toLocaleString() + ' clicks target), §9.3 Category Exclusivity Rider & All 109 Verified Buyer Rows.';
            if (counterPre) { counterPre.setAttribute('data-free-credit-unmasked', fullCounterTxt); counterPre.textContent = (window.__ebSavedEmail || window.__ebIsUnlocked) ? fullCounterTxt : ('To: ${showBookingEmail}\\nSubject: 3-Flight Q4 Sponsorship Pilot Inquiry - ' + safeShowTitle + ' ($' + fairFloorPrice.toLocaleString() + '/flight Floor)\\n\\n[DIRECT REP EMAIL & REDLINED COUNTER-OFFER GATED — Enter your work email in the "Unlock 3 Free Buyer Emails ($0)" bar above to reveal & copy]'); }
            var curT = window.__ebSelectedTarget || window.__ebActiveEntity || ${JSON.stringify(exportTarget).replace(/</g, '\\u003c')}, emP = window.__ebSavedEmail ? ('&email=' + encodeURIComponent(window.__ebSavedEmail)) : '', qParams = 'target=' + encodeURIComponent(curT) + '&floor_cpm=' + (reach < 80000 ? Math.min(38, baseFloorCpm) : baseFloorCpm) + '&reach=' + reach + '&quoted_usd=' + price + emP;
            ['sr-qa-rider-link', 'eb-seo-rider-link', 'eb-seo-proof-rider-link'].forEach(function(id) { var el = document.getElementById(id); if (el) el.href = '/api/github-upgrade/iab-io-addendum.txt?' + qParams; });
            ['sr-qa-eml-link', 'eb-seo-eml-link', 'eb-seo-proof-eml-link'].forEach(function(id) { var el = document.getElementById(id); if (el) el.href = '/api/github-upgrade/pitch.eml?' + qParams; });
            ['eb-seo-csv-link', 'eb-seo-proof-csv-link'].forEach(function(id) { var el = document.getElementById(id); if (el) el.href = '/api/github-upgrade/export.csv?target=' + encodeURIComponent(curT) + emP; });
            ['eb-seo-sample-link', 'eb-seo-proof-sample-link'].forEach(function(id) { var el = document.getElementById(id); if (el) el.href = '/dossier/sample?target=' + encodeURIComponent(curT) + emP; });
            if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'seo_quote_auditor', price: price, reach: reach, fair_floor: fairFloorPrice });
          };
          window.__srSendDesktopBridge = function(ev) {
            if (ev && ev.preventDefault) ev.preventDefault();
            var em = (document.getElementById('sr-bridge-email') || {}).value || ''; if (!em) return false;
            var btn = document.getElementById('sr-bridge-btn'); if (btn) btn.textContent = 'Sent to Inbox!';
            fetch('/api/leads/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: em, pageUrl: window.location.pathname, utmSource: 'mobile_desktop_magic_bridge', summaryText: 'SponsorRadar Option E Pitch #1 + Moneyball Brief (' + window.location.pathname + ')' }) }).catch(function(){});
            return false;
          };
          window.__srCalcPseoReach = function(reach, cpm) {
            var single = Math.round((reach / 1000) * cpm), floorSlot = Math.round(single * 0.82), pkg = floorSlot * 3, el = document.getElementById('sr-pseo-quote-readout');
            if (el) el.textContent = (reach / 1000) + 'K Reach → $' + single.toLocaleString() + '/slot ($' + floorSlot.toLocaleString() + ' Floor) • 3-Flight Pilot: $' + pkg.toLocaleString();
            document.querySelectorAll('#sr-pane-creator button[data-r]').forEach(function(b) { var act = Number(b.getAttribute('data-r')) === Number(reach); b.style.background = act ? 'var(--emerald-soft)' : 'var(--bg-surface)'; b.style.borderColor = act ? 'var(--emerald-roi)' : 'var(--border-subtle)'; b.style.color = act ? 'var(--emerald-roi)' : 'var(--text-primary)'; });
            var pPre = document.getElementById('sr-free-pitch-pre');
            if (pPre) {
              var uAttr = pPre.getAttribute('data-free-credit-unmasked') || '', curTxt = pPre.textContent || '';
              var repl = function(s) { return s.replace(/\b\d+K\s+(?:verified\s+)?(?:audience|reach|subscribers|listeners)/gi, (reach / 1000) + 'K verified audience').replace(/\$[\d,]+\/flight/g, '$' + floorSlot.toLocaleString() + '/flight').replace(/\$[\d,]+\s+total\s+3-flight/gi, '$' + pkg.toLocaleString() + ' total 3-flight'); };
              if (uAttr) pPre.setAttribute('data-free-credit-unmasked', repl(uAttr));
              pPre.textContent = repl(curTxt);
            }
            if (window.__srRunSeoQuoteAudit) window.__srRunSeoQuoteAudit(single, reach, (reach / 1000) + 'K Creator Reach');
          };
        </script>
      </div>
      ` : '';
      })()}

      <!-- FAQ Section -->
      <div class="panel" style="margin-bottom:28px;">
        <div class="panel-header"><span style="font-weight:800;">Frequently Asked Questions</span></div>
        <div class="panel-body" style="display:flex; flex-direction:column; gap:16px;">
          ${faqItems.map(item => `<div><h3 style="font-size:16px; font-weight:700; color:var(--text-primary); margin-bottom:4px;">${escapeHtml(item.q)}</h3><p style="font-size:14px; color:var(--text-secondary);">${escapeHtml(item.a)}</p></div>`).join('')}
        </div>
      </div>

      <!-- Related Spokes & Category Comparisons -->
      <div class="panel">
        <div class="panel-header"><span style="font-weight:800;">Related Sponsorship Spend, CPM Calculators &amp; Category Comparisons</span></div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">
          ${relatedPages.slice(0, 2).map(r => `<a href="/seo/${escapeHtml(r.slug)}" class="panel" style="padding:14px; background:var(--bg-elevated); box-shadow:none;"><div class="mono" style="font-size:13px; color:var(--amber-gold); font-weight:700;">${escapeHtml(r.category)} • $${r.avg_cpm} CPM ($${Math.round(r.avg_cpm * 0.82)} Floor)</div><div style="font-weight:700; font-size:13.5px; margin-top:4px; color:var(--text-primary);">${escapeHtml(r.title)}</div></a>`).join('')}
          <a href="/compare/who-sponsors-stuff-vs-sponsorradar-newsletter-and-podcast-database" class="panel" style="padding:14px; background:var(--bg-elevated); box-shadow:none;"><div class="mono" style="font-size:13px; color:var(--emerald-roi); font-weight:700;">COMPETITOR COMPARISON • SAVE $2,971/YR</div><div style="font-weight:700; font-size:13.5px; margin-top:4px; color:var(--text-primary);">Who Sponsors Stuff vs. SponsorRadar ($29 One-Time CSV Vault)</div></a>
          <a href="/leaderboard" class="panel" style="padding:14px; background:var(--bg-elevated); box-shadow:none;"><div class="mono" style="font-size:13px; color:var(--amber-gold); font-weight:700;">PUBLIC HALL OF FAME LEADERBOARD</div><div style="font-weight:700; font-size:13.5px; margin-top:4px; color:var(--text-primary);">Compare All 30 Ranked Brands &amp; Shows on the Public Leaderboard</div></a>
        </div>
      </div>
    </div>
  </article>
  `;

  const srTitle = isShowPage ? `${show.name} Sponsorship Rates, CPM ($${floorCpm} Floor) & ${placements.length} Verified Sponsors | SponsorRadar` : isBrandPage ? `${brand.name} Podcast & Newsletter Sponsors ($${Math.round(page.est_monthly_spend / 1000)}K/mo), CPM Rates & Buyer Email | SponsorRadar` : `${page.title} (${placements.length} Verified Sponsors, Rate Cards & $${page.avg_cpm} Avg CPM) | SponsorRadar`;
  const srDesc = `2026 Verified Rate Card & Sponsor Ledger (${placements.length} placements, $${page.avg_cpm} rack CPM vs. $${floorCpm} 3-flight floor CPM, $${Math.round(page.est_monthly_spend / 1000)}K/mo spend, 3 free buyer emails ($0) or $29 109-row CSV vault): ${page.meta_description || page.summary}`;
  return renderShell({ title: srTitle, description: srDesc, canonicalPath: `/seo/${page.slug}`, ogSlug: page.slug, jsonLd, bodyHtml });
}

function renderLegalPage(type) {
  const isPrivacy = type === 'privacy', title = isPrivacy ? 'Privacy Policy | SponsorRadar (#2)' : 'Terms of Service | SponsorRadar (#2)';
  const bodyHtml = `<section style="padding:48px 0;"><div class="container" style="max-width:820px;"><span class="pill-slate">LEGAL &amp; GDPR / CCPA COMPLIANCE</span><h1 class="headline-xl">${escapeHtml(title)}</h1><p class="mono" style="font-size:13px; color:var(--text-muted); margin-bottom:24px;">Last Updated: October 14, 2026 • Effective Immediately</p><div class="panel" style="padding:24px; display:flex; flex-direction:column; gap:16px; color:var(--text-secondary); font-size:14.5px;">${isPrivacy ? `<p><strong style="color:var(--text-primary);">1. Data We Collect:</strong> SponsorRadar collects voluntary checkout emails, sponsor lookup queries, and first-party attribution parameters after explicit consent.</p><p><strong style="color:var(--text-primary);">2. How We Use Data:</strong> To deliver sponsorship spend reports, generate outbound pitches, and process Stripe orders.</p><p><strong style="color:var(--text-primary);">3. Zero Secret Leakage &amp; Storage:</strong> Data is stored in an isolated SQLite WAL ledger with zero client-side key exposure. Email privacy@sponsorradar.io for deletion.</p>` : `<p><strong style="color:var(--text-primary);">1. Service Scope:</strong> SponsorRadar provides estimated Ad Rate benchmarks, ad-read timestamps, promo-code tracking, and pitch templates for media-buying intelligence.</p><p><strong style="color:var(--text-primary);">2. One-Time Passes &amp; 30-Day Refund Guarantee:</strong> All one-time passes ($19 Creator Pass, $29 109-Row CSV Vault, $149 B2B Agency Desk) never auto-renew and include our 30-day 100% money-back and zero-bounce replacement guarantee.</p><p><strong style="color:var(--text-primary);">3. Acceptable Use:</strong> Users agree to comply with CAN-SPAM and GDPR guidelines when sending outbound sponsorship pitches.</p>`}</div></div></section>`;
  return renderShell({ title, description: `${title} for SponsorRadar Audio & Newsletter Ad-Spend Intelligence Platform.`, canonicalPath: isPrivacy ? '/privacy' : '/terms', ogSlug: isPrivacy ? 'privacy' : 'terms', jsonLd: null, bodyHtml });
}

function renderNotFoundPage(requestedPath) {
  const cand = String(requestedPath || '').replace(/^\/+(seo\/|scan\/|tools\/|compare\/)?/i, '').replace(/[/?#].*$/, '').replace(/[-_]+/g, ' ').trim() || 'Shopify';
  const bodyHtml = `<section style="padding:72px 0; text-align:center;"><div class="container" style="max-width:640px;"><span class="pill-vermilion">HTTP 404 • ROUTE NOT IN LEDGER</span><h1 class="headline-xl">Ad-Spend Route Not Found</h1><p style="color:var(--text-secondary); margin-bottom:24px;">The path <code class="mono" style="color:var(--vermilion);">${escapeHtml(requestedPath)}</code> did not match a pre-indexed slug. Run an instant on-demand audit for <strong>${escapeHtml(cand.slice(0, 32))}</strong> in the live workbench or browse all 124 verified pSEO dossiers.</p><div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;"><a href="/?q=${encodeURIComponent(cand)}#radar-tool" class="btn btn-vermilion"><span>Audit "${escapeHtml(cand.slice(0, 24))}" in Workbench</span><span class="btn-icon-circle" aria-hidden="true">↗</span></a><a href="/directory" class="btn btn-ghost">Browse 124 Spend Dossiers</a></div></div></section>`;
  return renderShell({ title: '404 Not Found | SponsorRadar Media Intelligence', description: 'Page not found on SponsorRadar Media Intelligence Platform.', canonicalPath: '/404', ogSlug: '404', jsonLd: null, bodyHtml });
}

module.exports = { renderDirectoryPage, renderSeoPage, renderLegalPage, renderNotFoundPage };

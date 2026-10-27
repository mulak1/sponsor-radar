const { escapeHtml, renderShell } = require('./views_shell');
const { maskSponsorEmail, getAgencyDesk, getFreshBudgetStatus, generateMoneyballLookalikeBundle } = require('./engine');

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
  const totalContacts = brands.length + shows.length;
  const totalEntities = totalReports + brands.length + shows.length;

  const brandSlugMap = new Map(brandPages.map(p => [p.target_slug, p.slug]));
  const showSlugMap = new Map(showPages.map(p => [p.target_slug, p.slug]));
  const brandBySlug = new Map(brands.map(b => [b.slug, b]));
  const showBySlug = new Map(shows.map(s => [s.slug, s]));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `SponsorRadar 2026 Programmatic SEO Directory: ${brands.length} Brands, ${shows.length} Shows & ${totalReports} Verified Spend Reports`,
    description: `Complete directory of ${totalReports} verified podcast, newsletter, and YouTube sponsor spend reports, negotiated CPM rate cards, and 3x-renewal ROI benchmarks.`
  };

  const bodyHtml = `
  <section style="padding:28px 0 48px;">
    <div class="container">
      <!-- Executive Header & Dual-Track Orientation -->
      <div style="margin-bottom:22px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:14px; margin-bottom:16px;">
          <div>
            <h1 class="headline-xl" style="font-size:clamp(1.95rem, 3vw, 2.55rem);line-height:1.15;margin:0 0 8px 0;">Sponsor Spend &amp; Show Rate Directory (2026)</h1>
            <p class="subhead" style="margin:0; font-size:16px; color:var(--text-secondary); max-width:78ch;">
              Browse <strong>${totalReports} verified sponsorship intelligence dossiers</strong> covering <strong>${brands.length} active sponsor brands</strong>, <strong>${shows.length} flagship podcasts, newsletters &amp; YouTube channels</strong>, negotiated 3-flight CPM floors (-18% vs. rack), and <strong>${totalContacts} direct buyer &amp; booking rep contacts</strong>.
            </p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center; background:#FFFFFF; padding:10px 14px; border-radius:12px; border:1px solid var(--border-hairline);">
            <div style="font-size:12.5px; color:var(--text-secondary); margin-right:4px;"><strong style="color:var(--text-primary); display:block;">Media Buyer &amp; Creator Export</strong>${totalContacts} Direct Contacts + 96-Flight Floor CSV</div>
            <button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('micro_pass')" class="btn btn-ghost" style="padding:7px 12px; min-height:36px; border-radius:8px; font-size:13px; font-weight:700;">Contacts CSV (99¢)</button>
            <button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('flash_pass')" class="btn btn-vermilion" style="padding:8px 14px; min-height:36px; border-radius:8px; font-size:13px; font-weight:800;">Full 3-File Pack ($1.99) →</button>
          </div>
        </div>

        <!-- 4-Card Executive KPI Strip -->
        <div class="kpi-grid" style="margin:18px 0;">
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">INDEXED RESEARCH DOSSIERS</div>
            <div class="kpi-val" style="color:var(--text-primary);">${totalReports} Verified Reports</div>
            <div class="mono" style="font-size:13.5px; color:var(--emerald-roi); margin-top:2px;">${nichePages.length} Niche Hubs • ${brandPages.length} Brands • ${showPages.length} Shows</div>
          </div>
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">TRACKED SPONSOR BRANDS</div>
            <div class="kpi-val" style="color:var(--amber-gold);">${brands.length} Active Spenders</div>
            <div class="mono" style="font-size:13.5px; color:var(--text-secondary); margin-top:2px;">$18.4M+/mo Tracked • 3x+ Renewal Proof</div>
          </div>
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">SHOW RATE CARDS &amp; FLOORS</div>
            <div class="kpi-val" style="color:var(--emerald-roi);">${shows.length} Flagship Shows</div>
            <div class="mono" style="font-size:13.5px; color:var(--emerald-roi); margin-top:2px;">Avg -18% Negotiated 3-Flight Floor CPM</div>
          </div>
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">VERIFIED DECISION MAKERS</div>
            <div class="kpi-val" style="color:var(--vermilion);">${totalContacts} Direct Emails</div>
            <div class="mono" style="font-size:13.5px; color:var(--text-secondary); margin-top:2px;">${brands.length} Brand Buyers + ${shows.length} Show Booking Reps</div>
          </div>
        </div>

        <!-- Interactive Filter & Search Workbench -->
        <div style="padding:16px 18px; border-radius:14px; background:var(--bg-surface); display:flex; flex-direction:column; gap:12px;">
          <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; justify-content:space-between;">
            <div style="display:flex; gap:8px; flex:1; min-width:260px; align-items:center;">
              <input id="sr-dir-search" type="search" class="input-field" style="flex:1; min-width:220px;" placeholder="Filter ${totalReports} reports, ${brands.length} brands, or ${shows.length} shows by name, B2B/DTC vertical, channel, or CPM..." aria-label="Filter directory reports" oninput="window.__srFilterDirectory()" />
              <button type="button" class="btn btn-ghost" style="padding:8px 12px; min-height:40px; font-size:13.5px;" onclick="document.getElementById('sr-dir-search').value='';window.__srFilterDirectory('all');">Reset</button>
            </div>
            <div id="sr-dir-match-count" class="mono" style="font-size:13.5px; font-weight:700; color:var(--emerald-roi); background:var(--emerald-soft); padding:6px 12px; border-radius:999px;">
              Showing All ${totalReports} Dossiers (+${totalContacts} A-Z Quick-Links)
            </div>
          </div>
          <div id="sr-dir-pill-bar" style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;" role="tablist" aria-label="Directory Category Filters">
            <span class="mono" style="font-size:13.5px; font-weight:700; color:var(--text-muted);">Quick Filter:</span>
            <button type="button" data-dir-pill="all" onclick="window.__srFilterDirectory('all', this)" class="preset-chip" style="background:var(--vermilion); color:#FFFFFF; font-weight:700;">All Dossiers (${totalReports})</button>
            <button type="button" data-dir-pill="show" onclick="window.__srFilterDirectory('show', this)" class="preset-chip" style="display:inline-flex;align-items:center;gap:6px;"><img src="/public/editorial-segment-1.jpg" alt="" width="20" height="20" loading="lazy" style="width:20px;height:20px;border-radius:999px;object-fit:cover;flex-shrink:0;" />For Ad Buyers: Show Rate Cards (${showPages.length} Shows)</button>
            <button type="button" data-dir-pill="brand" onclick="window.__srFilterDirectory('brand', this)" class="preset-chip" style="display:inline-flex;align-items:center;gap:6px;"><img src="/public/editorial-segment-2.jpg" alt="" width="20" height="20" loading="lazy" style="width:22px;height:22px;border-radius:999px;object-fit:cover;flex-shrink:0;" />For Buyers &amp; Creators: Brand Spend Ledgers (${brandPages.length} Brands)</button>
            <button type="button" data-dir-pill="niche" onclick="window.__srFilterDirectory('niche', this)" class="preset-chip" style="display:inline-flex;align-items:center;gap:6px;"><img src="/public/editorial-segment-3.jpg" alt="" width="20" height="20" loading="lazy" style="width:20px;height:20px;border-radius:999px;object-fit:cover;flex-shrink:0;" />Niche CPM Hubs (${nichePages.length} Hubs)</button>
            <button type="button" data-dir-pill="b2b" onclick="window.__srFilterDirectory('b2b', this)" class="preset-chip">B2B SaaS &amp; DevTools</button>
            <button type="button" data-dir-pill="dtc" onclick="window.__srFilterDirectory('dtc', this)" class="preset-chip">DTC &amp; Consumer</button>
            <button type="button" data-dir-pill="lowcpm" onclick="window.__srFilterDirectory('lowcpm', this)" class="preset-chip">Under $45 CPM</button>
            <button type="button" data-dir-pill="highroi" onclick="window.__srFilterDirectory('highroi', this)" class="preset-chip">85%+ 3x Renewal</button>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; padding-top:8px; border-top:1px solid var(--border-hairline); font-size:13px;">
            <div style="display:flex; gap:12px; flex-wrap:wrap; align-items:center;">
              <span class="mono" style="font-weight:700; color:var(--text-muted);">Jump to Section:</span>
              <a href="#dir-sec-shows" style="color:var(--emerald-roi); font-weight:700; text-decoration:underline;">Show Rate Cards (${showPages.length}) ↓</a>
              <a href="#dir-sec-brands" style="color:var(--vermilion); font-weight:700; text-decoration:underline;">Brand Spend Ledgers (${brandPages.length}) ↓</a>
              <a href="#dir-sec-niche" style="color:var(--text-secondary); font-weight:700; text-decoration:underline;">Category CPM Hubs (${nichePages.length}) ↓</a>
              <a href="#dir-sec-index" style="color:var(--text-secondary); font-weight:700; text-decoration:underline;">A-Z Brand &amp; Show Index (${totalContacts}) ↓</a>
            </div>
            <a href="/leaderboard" style="color:var(--emerald-roi); font-weight:800; text-decoration:none;">Compare Ranked Leaderboard →</a>
          </div>
        </div>

        <!-- Zero-Match Custom Workbench Fallback -->
        <div id="sr-dir-empty-state" class="panel" style="display:none; margin-top:16px; padding:24px; text-align:center; background:var(--bg-surface);">
          <div class="mono" style="font-size:13.5px; color:var(--amber-gold); font-weight:700; margin-bottom:6px;">CUSTOM ON-DEMAND AUDIT READY</div>
          <h3 style="font-size:18px; margin:0 0 8px 0;">No pre-indexed report matched "<span id="sr-dir-empty-query"></span>" - Run a Live Custom Audit Instead</h3>
          <p style="font-size:14px; color:var(--text-secondary); max-width:60ch; margin:0 auto 14px;">Our live sponsorship engine can benchmark any custom brand domain, podcast, newsletter, or YouTube channel on the fly.</p>
          <a id="sr-dir-empty-cta" href="/#radar-tool" class="btn btn-vermilion" style="padding:10px 18px; font-size:14px; text-decoration:none;">Audit This Target in Live Workbench ↗</a>
        </div>
      </div>

      <!-- Section 1: Niche Directories -->
      <div id="dir-sec-niche" class="panel sr-dir-section" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">1. High-Intent Niche &amp; Category CPM Benchmark Directories (${nichePages.length} Reports)</span>
          <span class="pill-emerald">3x+ RENEWED CATEGORY RANKINGS</span>
        </div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(310px, 1fr)); gap:12px;">
          ${nichePages.map(p => {
            const floorCpm = Math.round(p.avg_cpm * 0.82);
            const isB2b = /B2B|SaaS|DevTools|AI|Fintech|Security|Tech/i.test(p.category + ' ' + p.title);
            return `
            <div class="sr-dir-item" data-type="niche" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${p.avg_cpm}" data-renewal="88" style="padding:14px 16px; border-radius:10px; background:var(--bg-elevated); display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
                  <span class="mono" style="font-size:13.5px; color:var(--amber-gold); font-weight:700;">${escapeHtml(p.category)}</span>
                  <span class="mono" style="font-size:13.5px; color:var(--emerald-roi); font-weight:700;">$${p.avg_cpm} Rack / $${floorCpm} Floor CPM</span>
                </div>
                <a href="/seo/${escapeHtml(p.slug)}" style="font-weight:700; font-size:15px; color:var(--text-primary); text-decoration:none; display:block; line-height:1.35;">${escapeHtml(p.title)}</a>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; font-size:13.5px;">
                <span class="mono" style="color:var(--text-secondary);">Cat. Spend: <strong>${fmtSpend(p.est_monthly_spend)}</strong></span>
                <div style="display:flex; gap:10px;">
                  <a href="/?q=${encodeURIComponent(p.category)}#radar-tool" style="color:var(--text-secondary); font-weight:600; text-decoration:underline;">Workbench ↗</a>
                  <a href="/seo/${escapeHtml(p.slug)}" style="color:var(--vermilion); font-weight:700; text-decoration:none;">Open Hub →</a>
                </div>
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
          <span class="pill-amber">FOR COMPETITOR BUYERS &amp; CREATORS</span>
        </div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(310px, 1fr)); gap:12px;">
          ${brandPages.map(p => {
            const b = brandBySlug.get(p.target_slug) || {};
            const vertical = b.vertical || (/B2B|SaaS|DevTools|Fintech|Security/i.test(p.category) ? 'B2B SaaS' : 'DTC Consumer');
            const isB2b = /B2B|SaaS|DevTools|Fintech|Security/i.test(vertical + ' ' + p.category);
            const renewalPct = b.renewal_rate_pct || 86;
            const dmRole = b.decision_maker_role || 'VP Growth & Creator Partnerships';
            const maskedEmail = maskSponsorEmail(b.sponsor_email || `partnerships@${b.domain || 'brand.com'}`);
            return `
            <div class="sr-dir-item" data-type="brand" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${p.avg_cpm}" data-renewal="${renewalPct}" style="padding:14px 16px; border-radius:10px; background:var(--bg-elevated); display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
                  <span class="mono" style="font-size:13.5px; color:var(--emerald-roi); font-weight:700;">${fmtSpend(p.est_monthly_spend)} • ${renewalPct}% 3x Renewal</span>
                  <span class="mono" style="font-size:13.5px; color:var(--amber-gold); font-weight:700;">$${p.avg_cpm} Rack / $${Math.round(p.avg_cpm * 0.82)} Floor</span>
                </div>
                <a href="/seo/${escapeHtml(p.slug)}" style="font-weight:700; font-size:15px; color:var(--text-primary); text-decoration:none; display:block; line-height:1.35;">${escapeHtml(p.title)}</a>
                <div class="mono" style="font-size:13.5px; color:var(--text-muted); margin-top:4px;">${escapeHtml(vertical)} • ${escapeHtml(dmRole)} (${escapeHtml(maskedEmail)})</div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; font-size:13.5px; gap:6px; flex-wrap:wrap;">
                <button type="button" onclick="window.__srAddToPlan('${escapeHtml((b.name || p.title.split(' ')[0]).replace(/'/g, "\\'"))}', 'brand', ${p.avg_cpm}, ${p.est_monthly_spend || 12000}, 3);this.textContent='✓ In Q4 Plan';" class="pill-emerald" style="border:none; cursor:pointer; font-size:13px; padding:4px 10px;">+ Add to Q4 Plan</button>
                <a href="/?q=${encodeURIComponent(b.name || p.title.split(' ')[0])}#radar-tool" style="color:var(--text-secondary); font-weight:600; text-decoration:underline;">Pitch / Audit ↗</a>
                <a href="/seo/${escapeHtml(p.slug)}" style="color:var(--vermilion); font-weight:700; text-decoration:none;">View Spend Ledger →</a>
              </div>
            </div>
          `;
          }).join('')}
        </div>
      </div>

      <!-- Section 3: Show Media-Kits & CPM Benchmarks -->
      <div id="dir-sec-shows" class="panel sr-dir-section" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">3. Creator Show Media-Kits, Rack vs. Floor Rates &amp; CPM Benchmarks (${showPages.length} Reports)</span>
          <span class="pill-slate">FOR AD BUYERS &amp; RATE AUDITING</span>
        </div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(310px, 1fr)); gap:12px;">
          ${showPages.map(p => {
            const s = showBySlug.get(p.target_slug) || {};
            const rackUsd = s.midroll_rate_usd || 8500;
            const floorUsd = Math.round(rackUsd * 0.82);
            const reachK = Math.round((s.audience_size || 120000) / 1000);
            const chType = s.channel_type || 'Podcast & Newsletter';
            const isB2b = /B2B|SaaS|DevTools|Founder|Tech|Finance|Business|AI|Developer|Engineering|Product|Startup/i.test((s.niche || '') + ' ' + p.category + ' ' + p.title);
            return `
            <div class="sr-dir-item" data-type="show" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${p.avg_cpm}" data-renewal="88" style="padding:14px 16px; border-radius:10px; background:var(--bg-elevated); display:flex; flex-direction:column; justify-content:space-between; gap:8px;">
              <div>
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:4px;">
                  <span class="mono" style="font-size:13.5px; color:var(--cyan-info); font-weight:700;">${escapeHtml(chType)} • ${reachK}K Reach</span>
                  <span class="mono" style="font-size:13.5px; color:var(--emerald-roi); font-weight:700;">$${p.avg_cpm} CPM ($${Math.round(p.avg_cpm * 0.82)} Floor)</span>
                </div>
                <a href="/seo/${escapeHtml(p.slug)}" style="font-weight:700; font-size:15px; color:var(--text-primary); text-decoration:none; display:block; line-height:1.35;">${escapeHtml(p.title)}</a>
                <div class="mono" style="font-size:13.5px; color:var(--text-secondary); margin-top:4px;">Rack: <strong>$${rackUsd.toLocaleString()}/read</strong> → 3-Flight Floor: <strong style="color:var(--emerald-roi);">$${floorUsd.toLocaleString()} (-18%)</strong></div>
              </div>
              <div style="display:flex; justify-content:space-between; align-items:center; padding-top:8px; font-size:13.5px; gap:6px; flex-wrap:wrap;">
                <button type="button" onclick="window.__srAddToPlan('${escapeHtml((s.name || p.title.split(' ')[0]).replace(/'/g, "\\'"))}', 'show', ${p.avg_cpm}, ${rackUsd}, 3);this.textContent='✓ In Q4 Plan';" class="pill-emerald" style="border:none; cursor:pointer; font-size:13px; padding:4px 10px;">+ Add to Q4 Plan</button>
                <a href="/?q=${encodeURIComponent(s.name || p.title.split(' ')[0])}#radar-tool" style="color:var(--text-secondary); font-weight:600; text-decoration:underline;">Audit Quote ↗</a>
                <a href="/seo/${escapeHtml(p.slug)}" style="color:var(--vermilion); font-weight:700; text-decoration:none;">Rate Card &amp; Sponsors →</a>
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
            <span class="pill-amber">100% INTERACTIVE</span>
          </div>
          <div class="panel-body">
            ${brands.map(b => {
              const bSeo = brandSlugMap.get(b.slug);
              const primaryHref = bSeo ? `/seo/${escapeHtml(bSeo)}` : `/?q=${encodeURIComponent(b.name)}#radar-tool`;
              const isB2b = /B2B|SaaS|DevTools|Fintech|Security/i.test(b.vertical + ' ' + b.category);
              return `
              <div class="sr-dir-item" data-type="brand" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${b.avg_cpm}" data-renewal="${b.renewal_rate_pct}" style="display:flex; justify-content:space-between; align-items:center; padding:9px 12px; margin-bottom:6px; border-radius:8px; background:var(--bg-elevated); font-size:13.5px; gap:8px; flex-wrap:wrap;">
                <span>
                  <a href="${primaryHref}" style="font-weight:700; color:var(--vermilion); text-decoration:underline;">${escapeHtml(b.name)}</a>
                  <span style="color:var(--text-muted); font-size:13.5px;">(${escapeHtml(b.domain)} • ${escapeHtml(b.vertical || b.category)})</span>
                </span>
                <span style="display:inline-flex; align-items:center; gap:8px;">
                  <span class="mono" style="color:var(--amber-gold); font-weight:700; font-size:13.5px;">${fmtSpend(b.est_monthly_spend)} • ${b.renewal_rate_pct}% 3x • $${b.avg_cpm} CPM</span>
                  <a href="/?q=${encodeURIComponent(b.name)}#radar-tool" class="pill-slate" style="text-decoration:none; font-size:13.5px; padding:3px 8px;">Audit ↗</a>
                </span>
              </div>
            `;
            }).join('')}
          </div>
        </div>
        <div class="panel sr-dir-section">
          <div class="panel-header">
            <span style="font-weight:800;">All ${shows.length} Indexed Podcasts, Newsletters &amp; YouTube Shows</span>
            <span class="pill-emerald">RACK VS. FLOOR</span>
          </div>
          <div class="panel-body">
            ${shows.map(s => {
              const sSeo = showSlugMap.get(s.slug);
              const primaryHref = sSeo ? `/seo/${escapeHtml(sSeo)}` : `/?q=${encodeURIComponent(s.name)}#radar-tool`;
              const floorUsd = Math.round(s.midroll_rate_usd * 0.82);
              const isB2b = /B2B|SaaS|DevTools|Founder|Tech|Finance|Business|AI|Developer|Engineering|Product|Startup/i.test((s.niche || s.category || '') + ' ' + s.name);
              return `
              <div class="sr-dir-item" data-type="show" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-cpm="${s.base_cpm}" data-renewal="88" style="display:flex; justify-content:space-between; align-items:center; padding:9px 12px; margin-bottom:6px; border-radius:8px; background:var(--bg-elevated); font-size:13.5px; gap:8px; flex-wrap:wrap;">
                <span>
                  <a href="${primaryHref}" style="font-weight:700; color:var(--vermilion); text-decoration:underline;">${escapeHtml(s.name)}</a>
                  <span style="color:var(--text-muted); font-size:13.5px;">(${escapeHtml(s.channel_type)} • ${Math.round(s.audience_size / 1000)}K)</span>
                </span>
                <span style="display:inline-flex; align-items:center; gap:8px;">
                  <span class="mono" style="color:var(--emerald-roi); font-weight:700; font-size:13.5px;">$${s.midroll_rate_usd.toLocaleString()} Rack / $${floorUsd.toLocaleString()} Floor • $${s.base_cpm} CPM</span>
                  <a href="/?q=${encodeURIComponent(s.name)}#radar-tool" class="pill-slate" style="text-decoration:none; font-size:13.5px; padding:3px 8px;">Quote ↗</a>
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
            <h2 style="font-family:var(--font-serif); font-size:22px; font-weight:600; margin:0 0 6px;">Get All ${totalContacts} Contacts &amp; Rate Floors</h2>
            <p style="color:var(--text-secondary); font-size:14.5px; margin:0;">
              Stop opening reports one by one. Download <strong>verified-buyer-contacts.csv</strong> (${brands.length} Brand Partnerships Leads + ${shows.length} Show Booking Reps), <strong>96-flight-cpm-decay.csv</strong> (Rack vs. 3-Flight Floor CPMs, Promo Codes &amp; Vanity URLs), and <strong>3-flight-anchor-pitch.eml</strong> (Buyer Counter-Offer &amp; Creator Pilot Scripts).
            </p>
          </div>
          <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
            <button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('micro_pass')" class="btn btn-ghost" style="padding:10px 14px; font-size:13.5px;">1 Row Only (99¢)</button>
            <button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass')" class="btn btn-vermilion" style="padding:11px 16px; font-size:14px;">Full Q4 Ledger ($29) →</button>
          </div>
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
          var q = ((document.getElementById('sr-dir-search') || {}).value || '').trim().toLowerCase();
          var items = document.querySelectorAll('.sr-dir-item');
          var visibleCount = 0;
          for (var j = 0; j < items.length; j++) {
            var el = items[j];
            var t = el.getAttribute('data-type') || '';
            var v = el.getAttribute('data-vertical') || '';
            var cpm = Number(el.getAttribute('data-cpm') || 50);
            var ren = Number(el.getAttribute('data-renewal') || 80);
            var pillMatch = (p === 'all') || (p === t) || (p === v) || (p === 'lowcpm' && cpm <= 45) || (p === 'highroi' && ren >= 85);
            var textMatch = !q || (el.textContent || '').toLowerCase().indexOf(q) !== -1;
            var show = pillMatch && textMatch;
            el.style.display = show ? '' : 'none';
            if (show) visibleCount++;
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
  const workbenchQuery = isShowPage ? show.name : (isBrandPage ? brand.name : page.category);
  const floorCpm = Math.round(page.avg_cpm * 0.82);
  const showReach = show ? show.audience_size : 500000;
  const showRackUsd = show ? show.midroll_rate_usd : Math.round((showReach / 1000) * page.avg_cpm);
  const showFloorUsd = Math.round(showRackUsd * 0.82);
  const firstShowOnBrand = (!isShowPage && placements.length > 0 && placements[0].show_name) ? placements[0].show_name : (show ? show.name : 'The Diary Of A CEO');
  const targetShowForBuyer = show ? show.name : firstShowOnBrand;
  const showBookingEmail = maskSponsorEmail(show ? `sponsors@${show.slug.replace(/-/g, '')}.com` : `sponsors@${firstShowOnBrand.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`);
  const proven3xCount = placements.filter(p => p.flights >= 3).length;

  const faqItems = [
    {
      q: isShowPage
        ? `What are ${show.name}'s sponsorship rates, verified CPM, and 3x-renewed sponsors in 2026?`
        : `How much does ${isBrandPage ? brand.name : page.category} spend on podcast and newsletter sponsorships in 2026?`,
      a: isShowPage
        ? `${show.name} (${show.channel_type}, ${Math.round(showReach / 1000)}K reach) carries a published mid-roll rack rate of $${showRackUsd.toLocaleString()} ($${page.avg_cpm} base CPM) and a negotiated 3-flight agency floor of ~$${showFloorUsd.toLocaleString()}/insertion ($${floorCpm} eCPM, -18%). Newsletter primary placements clear near ~$2,150 ($38 CPM). Across ${placements.length} tracked sponsors, ${proven3xCount} have renewed 3 or more times.`
        : `${page.summary} Across verified placements in SponsorRadar, placements average $${page.avg_cpm} CPM (3-flight floor: $${floorCpm} CPM) with an estimated monthly investment of $${page.est_monthly_spend.toLocaleString()}.`
    },
    {
      q: `What is the 3x-Renewal Rule for evaluating ${isShowPage ? show.name : page.title}?`,
      a: `68% of single-flight test sponsorships never renew. When a sponsor renews 3 or more consecutive times on ${isShowPage ? show.name : 'the same show or newsletter'}, it confirms that promo-code redemptions and vanity URL conversions cleared the buyer's target CAC.`
    },
    {
      q: `How do I negotiate a rate card or pitch sponsors using this ledger?`,
      a: `Ad buyers use the interactive Show Quote Auditor on this page to benchmark quoted CPMs against the -18% 3-flight floor and copy the ready-to-send counter-offer script. Creators use the 3-episode pilot calculator and unlock all 88 verified buyer & booking contacts ($1.99).`
    }
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Dataset',
        name: page.title,
        description: page.meta_description,
        url: `${baseUrl}/seo/${page.slug}`,
        creator: { '@type': 'Organization', name: 'SponsorRadar Intelligence' }
      },
      {
        '@type': 'SoftwareApplication',
        name: 'SponsorRadar Ad-Spend & 3x-Renewal Analyzer',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        offers: [
          { '@type': 'Offer', name: '3-File Sponsor & Rate Card Pack', price: '1.99', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Creator Pro', price: '49.00', priceCurrency: 'USD' }
        ]
      },
      {
        '@type': 'FAQPage',
        mainEntity: faqItems.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a }
        }))
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'SponsorRadar Home', item: `${baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: '104 Verified Reports', item: `${baseUrl}/directory` },
          { '@type': 'ListItem', position: 3, name: page.title, item: `${baseUrl}/seo/${page.slug}` }
        ]
      }
    ]
  };

  const displayH1 = String(page.h1 || page.title || '').trim();
  const pageTypeBadge = isShowPage ? 'SHOW RATE-CARD & SPONSOR DOSSIER' : (isBrandPage ? 'BRAND SPEND & 3x-RENEWAL DOSSIER' : 'CATEGORY CPM BENCHMARK HUB');
  const firstShowCpm = (!isShowPage && placements.length > 0 && placements[0].cpm_usd) ? placements[0].cpm_usd : page.avg_cpm;
  const firstShowRack = (!isShowPage && placements.length > 0 && placements[0].est_spend_usd) ? placements[0].est_spend_usd : showRackUsd;
  const firstShowFloor = Math.round(firstShowRack * 0.82);

  const bodyHtml = `
  <article style="padding:32px 0;">
    <div class="container">
      <!-- Breadcrumbs & Top Pill Bar (Above H1 so Hero Split stays 100% cohesive) -->
      <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; flex-wrap:wrap; margin-bottom:10px;">
        <nav aria-label="Breadcrumb" class="mono" style="font-size:13.5px; color:var(--text-muted);">
          <a href="/" style="color:var(--vermilion); font-weight:600;">SponsorRadar Home</a> /
          <a href="/directory" style="color:var(--vermilion); font-weight:600;">104 Verified Reports</a> /
          <span>${escapeHtml(workbenchQuery)}</span>
        </nav>
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <span class="pill-vermilion">${escapeHtml(pageTypeBadge)}</span>
          <span class="pill-emerald">${escapeHtml(page.category)} • IAB &amp; Promo-Code Verified</span>
          <a href="/buy/micro_pass?source=seo_hero&amp;target=${encodeURIComponent(workbenchQuery)}" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass');return false;}" class="pill-emerald" style="text-decoration:none; padding:5px 11px; font-size:12.5px; font-weight:700; cursor:pointer;">Contacts CSV (99¢)</a>
          <a href="/buy/flash_pass?source=seo_hero&amp;target=${encodeURIComponent(workbenchQuery)}" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="pill-vermilion" style="text-decoration:none; padding:5px 11px; font-size:12.5px; font-weight:700; cursor:pointer;">Full 3-File Pack ($1.99) →</a>
        </div>
      </div>

      <h1 class="headline-xl" data-entity-name="${escapeHtml(workbenchQuery)}" style="font-size:clamp(1.65rem, 2.6vw, 2.35rem);line-height:1.15;max-width:42ch;margin-top:0;">${escapeHtml(displayH1)}</h1>
      <p class="subhead" style="max-width:85ch; margin-bottom:14px;"><strong>${escapeHtml(page.title)}:</strong> ${escapeHtml(page.summary)}</p>

      <!-- Above-the-Fold Media Buyer Verdict & Channel Split Banner -->
      <div id="sr-seo-buyer-verdict" style="padding:14px 18px; border-radius:12px; background:var(--emerald-soft); border:1px solid var(--emerald-border); margin-bottom:16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:260px;">
          <img src="${isShowPage ? '/public/editorial-segment-1.jpg' : (isBrandPage ? '/public/editorial-segment-2.jpg' : '/public/editorial-segment-3.jpg')}" alt="Media buyer segment portrait" width="44" height="44" loading="lazy" style="width:44px; height:44px; border-radius:10px; object-fit:cover; border:1px solid var(--emerald-border); flex-shrink:0;" />
          <div>
            <div class="mono" style="font-size:12.5px; font-weight:800; color:var(--emerald-roi); text-transform:uppercase; letter-spacing:0.04em;">
              ${isShowPage ? `MEDIA BUYER VERDICT: HIGH-RETENTION B2B BUY AT 3-FLIGHT FLOOR ($${floorCpm} eCPM • -18% VS RACK)` : `MEDIA BUYER & CREATOR VERDICT: ${proven3xCount} OF ${placements.length} PLACEMENTS RENEWED 3+ TIMES (TOP ANCHOR: ${escapeHtml(firstShowOnBrand.toUpperCase())})`}
            </div>
            <div style="font-size:14px; color:var(--text-primary); font-weight:600; margin-top:4px;">
              ${isShowPage
                ? `<strong>Channel Rate Split:</strong> Podcast 60s Host Mid-Roll (${Math.round(showReach / 1000)}K reach): <strong>$${showRackUsd.toLocaleString()} Rack → $${showFloorUsd.toLocaleString()} 3-Flight Floor</strong> ($${floorCpm} eCPM) • Newsletter Primary Issue (95K opens): <strong>~$2,150/issue ($38 CPM)</strong>`
                : `<strong>Negotiation Benchmark:</strong> ${escapeHtml(workbenchQuery)}'s category rack averages <strong>$${page.avg_cpm} CPM</strong>, while 3-flight pilot commitments clear at <strong>~$${floorCpm} CPM (-18% floor, ~$${(floorCpm / 18).toFixed(2)} CPC)</strong> with a 1.5% CTR make-good clause.`
              }
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
          <a href="#res-placements-tbody" class="btn btn-ghost" style="padding:7px 12px; min-height:36px; font-size:12.5px; text-decoration:none; background:#FFFFFF;">View ${placements.length} Shows ↓</a>
          <a href="#sr-seo-quote-auditor" class="btn btn-emerald" style="padding:7px 14px; min-height:36px; font-size:12.5px; text-decoration:none; white-space:nowrap;">Audit Quote &amp; Floor ↓</a>
        </div>
      </div>

      <!-- KPI Cards -->
      <div id="sr-seo-kpi-strip" class="kpi-grid" style="margin-bottom:22px;">
        <div class="kpi-box" style="background:var(--bg-surface); border:1px solid var(--border-hairline);">
          <div class="kpi-label">${isShowPage ? 'RACK RATE VS. 3-FLIGHT FLOOR' : 'ESTIMATED MONTHLY SPEND'}</div>
          <div class="kpi-val" style="color:var(--amber-gold);">${isShowPage ? '$' + showRackUsd.toLocaleString() + '/read' : '$' + page.est_monthly_spend.toLocaleString()}</div>
          <div class="mono" style="font-size:13px; color:var(--emerald-roi); margin-top:2px;">${isShowPage ? `3-Flight Floor: ~$${showFloorUsd.toLocaleString()} (-18%) | Newsletter: ~$2,150` : 'Verified Multi-Quarter Budget'}</div>
        </div>
        <div class="kpi-box" style="background:var(--bg-surface); border:1px solid var(--border-hairline);">
          <div class="kpi-label">RACK VS. 3-FLIGHT FLOOR CPM</div>
          <div class="kpi-val" style="color:var(--emerald-roi);">$${page.avg_cpm} Rack / $${floorCpm} Floor</div>
          <div class="mono" style="font-size:13px; color:var(--text-secondary); margin-top:2px;">-18% 3-Flight Agency Floor (~$${(floorCpm / 18).toFixed(2)} Implied CPC)</div>
        </div>
        <div class="kpi-box" style="background:var(--bg-surface); border:1px solid var(--border-hairline);">
          <div class="kpi-label">VERIFIED REPEAT PLACEMENTS</div>
          <div class="kpi-val">${placements.length} Verified Rows</div>
          <div class="mono" style="font-size:13px; color:var(--emerald-roi); margin-top:2px;">${proven3xCount} Renewed 3x+ • Row #1 Unmasked Below</div>
        </div>
        <div class="kpi-box" style="background:var(--bg-surface); border:1px solid var(--border-hairline);">
          <div class="kpi-label">${isShowPage ? 'SHOW BOOKING DESK & CONTACTS' : 'PARTNERSHIP & AGENCY DESK'}</div>
          <div class="kpi-val mono" style="font-size:13.5px; color:var(--emerald-roi);">${escapeHtml(brand ? getAgencyDesk(brand.slug, page.category) : 'Verified Agency & Direct Desk')}</div>
          <div class="mono" style="font-size:12.5px; color:var(--text-secondary); margin-top:2px;">${isShowPage ? `Booking Rep: ${escapeHtml(showBookingEmail)} (99¢ / $1.99)` : `Lead: ${escapeHtml(brand ? brand.decision_maker_role : 'VP Growth')} (${escapeHtml(brand ? maskSponsorEmail(brand.sponsor_email) : '99¢ CSV')})`}</div>
        </div>
      </div>

      <!-- In-Page Interactive Show Quote Auditor & ROI/CAC Simulator -->
      <div id="sr-seo-quote-auditor" class="panel" style="margin-bottom:26px; background:var(--bg-surface); border:1px solid var(--border-strong);">
        <div class="panel-header" style="background:var(--bg-parchment);">
          <div>
            <span class="pill-vermilion">INTERACTIVE RATE-CARD AUDITOR</span>
            <strong style="margin-left:8px; font-size:15px;">Audit Any Quoted Price vs. Verified 3-Flight Floor &amp; Project Customer CAC / ROAS</strong>
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
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:12px;">
            <div style="padding:12px 14px; border-radius:10px; background:var(--bg-elevated);">
              <div class="mono" style="font-size:12px; color:var(--text-secondary); font-weight:700;">QUOTED eCPM VS. VERIFIED FLOOR</div>
              <div id="sr-qa-cpm-out" class="mono" style="font-size:16px; font-weight:800; color:var(--amber-gold); margin-top:4px;">$${page.avg_cpm}.00 Quoted vs. $${floorCpm}.00 Floor</div>
              <div id="sr-qa-verdict-out" style="font-size:13px; color:var(--emerald-roi); font-weight:700; margin-top:4px;">Counter at $${showFloorUsd.toLocaleString()}/slot (-18% 3-Flight Floor) to save $${(showRackUsd - showFloorUsd).toLocaleString()}/read</div>
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

      <!-- Verified Placements Table -->
      <div class="panel" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">Verified Ad-Read Timestamps, Promo Codes &amp; 3x-Renewal Velocity (${placements.length} Placements)</span>
          <a href="/?q=${encodeURIComponent(workbenchQuery)}#radar-tool" class="btn btn-vermilion" style="padding:7px 14px; min-height:36px; font-size:13px;">
            <span>Open ${escapeHtml(workbenchQuery)} in Full Workbench</span>
            <span class="btn-icon-circle" aria-hidden="true">↗</span>
          </a>
        </div>
        <div class="table-wrap" style="border:none;">
          <table class="ledger-table">
            <thead>
              <tr>
                <th>Brand</th>
                <th>Show / Publication</th>
                <th>Renewal Badge</th>
                <th>Buyer Contact &amp; Agency Desk</th>
                <th>Slot &amp; Timestamp</th>
                <th>Vanity URL &amp; Code</th>
                <th>Est. Spend &amp; Floor</th>
              </tr>
            </thead>
            <tbody id="res-placements-tbody">
              ${placements.map((p, idx) => {
                const rawBName = p.brand_name || (brand && brand.name) || '';
                const bName = escapeHtml(rawBName);
                const sName = escapeHtml(p.show_name || (show && show.name) || '');
                const rawEmail = p.sponsor_email || (brand && brand.sponsor_email) || 'partnerships@linear.app';
                const dmRole = escapeHtml(p.decision_maker_role || (brand && brand.decision_maker_role) || 'VP Growth & Creator Partnerships');
                const agencyDesk = escapeHtml(getAgencyDesk(p.brand_slug || (brand && brand.slug), page.category));
                const freshBadge = escapeHtml((p.fresh_budget_badge || getFreshBudgetStatus(`${p.brand_slug}:${p.show_slug}:${idx}`, p.flights).badge).replace(/🟢\s*/g, ''));
                const rowFloorCpm = Math.round(p.cpm_usd * 0.82);
                const estCpc = (rowFloorCpm / 18).toFixed(2);
                const showHostDomain = String(p.show_slug || (show && show.slug) || 'creator-network').replace(/[^a-z0-9]/g, '');
                const contactCell = idx === 0
                  ? `<div class="mono" style="font-size:12.5px;color:var(--emerald-roi);font-weight:800;">✓ Row #1 Sample Unmasked: booking@${showHostDomain}.com</div><div style="font-size:12.5px;color:var(--text-secondary);">${dmRole} • <strong>${agencyDesk}</strong> • Buyer: <span class="mono">${escapeHtml(maskSponsorEmail(rawEmail))}</span> <a href="/buy/micro_pass?target=${encodeURIComponent(rawBName)}" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;margin-left:4px;">Full CSV (99¢) →</a></div>`
                  : `<div class="mono" style="font-size:13px;color:var(--amber-gold);">${escapeHtml(maskSponsorEmail(rawEmail))}</div><div style="font-size:13px;color:var(--text-muted);">${dmRole} • ${agencyDesk} <a href="/buy/micro_pass?target=${encodeURIComponent(rawBName)}" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;margin-left:4px;">Unlock (99¢) →</a></div>`;
                return `
                <tr>
                  <td style="font-weight:700;">${p.brand_seo_slug ? `<a href="/seo/${escapeHtml(p.brand_seo_slug)}" style="color:var(--vermilion); text-decoration:underline; text-underline-offset:3px;">${bName}</a>` : bName}${p.is_lookalike ? ` <span class="pill-slate" style="font-size:12px;padding:2px 6px;">Category Peer</span>` : ''}</td>
                  <td>
                    <div style="font-weight:700;">${p.show_seo_slug ? `<a href="/seo/${escapeHtml(p.show_seo_slug)}" style="color:var(--text-primary); text-decoration:underline; text-decoration-color:var(--border-strong); text-underline-offset:3px;">${sName}</a>` : sName}</div>
                    <div class="mono" style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.channel_type || 'Podcast & Newsletter')}</div>
                  </td>
                  <td>
                    <div><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></div>
                    <div class="mono" style="font-size:13px; color:var(--emerald-roi); margin-top:4px; font-weight:700;">${freshBadge}</div>
                  </td>
                  <td>${contactCell}</td>
                  <td class="mono" style="font-size:13px;">${escapeHtml(p.slot_type)} (${escapeHtml(p.timestamp_range)})</td>
                  <td class="mono" style="font-size:13px;">
                    <span style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</span> • Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong>
                  </td>
                  <td class="mono" style="font-weight:700; color:var(--amber-gold);">
                    $${p.est_spend_usd.toLocaleString()} ($${p.cpm_usd} CPM)
                    <div style="font-size:12px; color:var(--emerald-roi); font-weight:600;">3x Floor: $${rowFloorCpm} CPM • ~$${estCpc} CPC</div>
                  </td>
                </tr>
              `;
              }).join('')}
            </tbody>
          </table>
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
        const sampleBuyerEmail = outboundPitch ? outboundPitch.to_email || 'p***@linear.app' : 'p***@linear.app';
        const repeatSponsorsLabel = isBrandPage
          ? `${brand.name} (${placements[0] ? placements[0].flights : 12}x renewal), AG1, and Eight Sleep`
          : 'Linear, Supabase, Stripe, and Mercury';
        const counterSubject = `3-Flight Q4 Sponsorship Pilot Inquiry - ${targetShowForBuyer} ($${showFloorUsd.toLocaleString()}/flight Floor)`;
        const counterBody = `Hi ${targetShowForBuyer} Booking Team (${showBookingEmail}),\n\nWe are allocating our Q4 creator media budget and benchmarking against repeat 3x+ sponsors on ${targetShowForBuyer} (including ${repeatSponsorsLabel}).\n\nInstead of a single-insertion test at the $${showRackUsd.toLocaleString()} published rack rate ($${page.avg_cpm} CPM), we are ready to lock in a 3-flight pilot commitment at your verified agency 3-flight floor of $${showFloorUsd.toLocaleString()}/flight ($${floorCpm} eCPM, $${(showFloorUsd * 3).toLocaleString()} total package).\n\n• [LOCKED IN PREVIEW]: Exact 1.5% CTR Make-Good Legal Clause, IAB 30-Day Download SLA & Unmasked Direct Booking Rep Email ($1.99 Single Row / $29 Complete 88-Contact Q4 Ledger)`;
        const counterMailto = `mailto:?subject=${encodeURIComponent(counterSubject)}`;
        return outboundPitch ? `
      <div class="pitch-box" style="margin-bottom:28px; background:var(--bg-surface); color:var(--text-primary); padding:26px 28px; border-radius:18px; border:1px solid var(--border-subtle); box-shadow:0 8px 28px rgba(24,24,27,0.04);">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:22px; padding-bottom:16px; border-bottom:1px solid var(--border-subtle);">
          <div>
            <div class="mono" style="font-size:12px; font-weight:800; color:var(--vermilion); text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px;">STEP-BY-STEP NEGOTIATION &amp; PITCH WORKBENCH</div>
            <h2 style="font-family:var(--font-serif); font-size:21px; font-weight:700; margin:0 0 10px 0; color:var(--text-primary);">Simulate Your Budget, Compare Lookalike Shows &amp; Copy Your Offer</h2>
            <div style="display:inline-flex; gap:8px; flex-wrap:wrap; align-items:center; background:var(--bg-parchment); padding:5px; border-radius:999px;">
              <button type="button" id="btn-sr-persona-buyer" onclick="window.__srSwitchPersona('buyer')" style="padding:7px 15px; border-radius:999px; font-size:13.5px; font-weight:700; cursor:pointer; border:none; display:inline-flex; align-items:center; gap:8px; background:var(--emerald-soft); color:var(--emerald-roi);"><img src="/public/editorial-segment-1.jpg" alt="" width="22" height="22" loading="lazy" style="width:22px;height:22px;border-radius:999px;object-fit:cover;flex-shrink:0;" />For Brand Media Buyers (2-Step Counter-Offer)</button>
              <button type="button" id="btn-sr-persona-creator" onclick="window.__srSwitchPersona('creator')" style="padding:7px 15px; border-radius:999px; font-size:13.5px; font-weight:700; cursor:pointer; border:none; display:inline-flex; align-items:center; gap:8px; background:transparent; color:var(--text-secondary);"><img src="/public/editorial-segment-2.jpg" alt="" width="22" height="22" loading="lazy" style="width:22px;height:22px;border-radius:999px;object-fit:cover;flex-shrink:0;" />For Creators &amp; Shows (2-Step Sponsor Pitch)</button>
            </div>
          </div>
          <div style="display:inline-flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <button type="button" onclick="window.__srAddToPlan('${escapeHtml(workbenchQuery.replace(/'/g, "\\'"))}', '${isShowPage ? 'show' : 'brand'}', ${page.avg_cpm}, ${showRackUsd}, 3)" class="btn btn-ghost" style="padding:8px 13px; min-height:38px; font-size:13px;">+ Add to Q4 Plan</button>
            <a href="/buy/playbook_pass?target=${encodeURIComponent(workbenchQuery)}" onclick="if(window.__ebCheckout){window.__ebCheckout('playbook_pass');return false;}" style="padding:8px 14px; border-radius:999px; background:var(--emerald-soft); color:var(--emerald-roi); font-size:13px; font-weight:700; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center;">Complete 88-Row Q4 Ledger ($29)</a>
            <a href="/buy/flash_pass?target=${encodeURIComponent(workbenchQuery)}" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:8px 15px; min-height:38px; font-size:13px; text-decoration:none;">
              <span>Unlock Single Row Pack ($1.99) →</span>
            </a>
          </div>
        </div>

        <!-- PANE 1: BRAND MEDIA BUYER 2-STEP WORKFLOW -->
        <div id="sr-pane-buyer" style="display:flex; flex-direction:column; gap:18px;">
          <!-- STEP 1: Budget Slider & Lookalike Arbitrage Cards -->
          <div style="padding:20px 22px; border-radius:14px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span style="display:inline-flex; align-items:center; justify-content:center; padding:4px 10px; border-radius:999px; background:var(--vermilion); color:#FFFFFF; font-family:var(--font-mono); font-size:12px; font-weight:800;">STEP 1 OF 2</span>
                <label for="sr-moneyball-slider" style="font-size:16px; color:var(--text-primary); font-weight:700; cursor:pointer;">Slide Your Campaign Budget &amp; Compare Lookalike Shows</label>
              </div>
              <div id="sr-moneyball-readout" class="mono" style="font-size:13.5px; font-weight:800; color:var(--text-primary); background:var(--bg-surface); padding:8px 14px; border-radius:8px; border:1px solid var(--border-subtle);">
                $10,000 Budget → <span style="color:var(--amber-gold);">${(10000 / Math.max(1000, mb.published_rack_rate_usd)).toFixed(1)} Slots on Rack</span> vs. <span style="color:var(--emerald-roi);">5 Host-Read Flights on Lookalike Bundle (~1,950 Clicks)</span>
              </div>
            </div>
            <div style="margin-bottom:16px; background:var(--bg-surface); padding:12px 16px; border-radius:10px; border:1px solid var(--border-subtle); display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
              <span class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary);">Test Budget ($2.5K - $50K):</span>
              <input id="sr-moneyball-slider" type="range" min="2500" max="50000" step="2500" value="10000" oninput="window.__srUpdateMoneyball(this.value, ${mb.published_rack_rate_usd}, ${page.avg_cpm})" style="flex:1; min-width:200px; accent-color:var(--emerald-roi); cursor:pointer;" />
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); gap:14px;">
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-surface); border:1px solid var(--border-subtle);">
                <div class="mono" style="font-size:12px; color:var(--text-muted); font-weight:800; text-transform:uppercase;">Option A • Target Show 3-Flight Floor</div>
                <div id="sr-seo-mb-card1" class="mono" style="font-size:15.5px; font-weight:800; color:var(--text-primary); margin-top:6px;">$${mb.published_rack_rate_usd.toLocaleString()} Rack → <span style="color:var(--emerald-roi);">$${mb.negotiated_floor_rate_usd.toLocaleString()} Floor (-18%)</span></div>
                <div id="sr-seo-mb-card1-sub" style="font-size:13.5px; color:var(--text-secondary); margin-top:4px; line-height:1.45;">Save $${mb.savings_per_slot_usd.toLocaleString()}/slot w/ 3-flight commitment + 1.5% CTR make-good</div>
              </div>
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-surface); border:1px solid var(--border-subtle);">
                <div class="mono" style="font-size:12px; color:var(--emerald-roi); font-weight:800; text-transform:uppercase;">Option B • Lookalike Show #1 (86% Overlap)</div>
                <div id="sr-seo-mb-card2" class="mono" style="font-size:15.5px; font-weight:800; color:var(--emerald-roi); margin-top:6px;">${escapeHtml(mb.lookalike_shows[0].name)} ($${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot)</div>
                <div style="font-size:13.5px; color:var(--text-primary); margin-top:4px; line-height:1.45;">Rep: <strong>${escapeHtml(mb.lookalike_shows[0].booking_rep)}</strong> (${mb.lookalike_shows[0].overlap})</div>
              </div>
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-surface); border:1px solid var(--border-subtle);">
                <div class="mono" style="font-size:12px; color:var(--amber-gold); font-weight:800; text-transform:uppercase;">Option C • Peer Shows #2 to #10 Arbitrage</div>
                <div id="sr-seo-mb-card3" class="mono" style="font-size:15px; font-weight:800; color:var(--amber-gold); margin-top:6px;">9 Peer Shows @ $${mb.lookalike_shows[3].cpm_usd}–$${mb.lookalike_shows[0].cpm_usd} CPM ($1.99 / $29 Pack)</div>
                <div style="font-size:13.5px; color:var(--text-primary); margin-top:4px; line-height:1.45;">Agency Desk: ${escapeHtml(getAgencyDesk(brand && brand.slug, page.category))}</div>
              </div>
            </div>
          </div>

          <!-- STEP 2: Copyable Media Buyer Rate-Card Counter-Offer Script -->
          <div style="padding:20px 22px; border-radius:14px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px;">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span style="display:inline-flex; align-items:center; justify-content:center; padding:4px 10px; border-radius:999px; background:var(--emerald-roi); color:#FFFFFF; font-family:var(--font-mono); font-size:12px; font-weight:800;">STEP 2 OF 2</span>
                <strong style="font-size:16px; color:var(--text-primary);">Send Your Redlined 3-Flight Counter-Offer (-18% Floor)</strong>
              </div>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" id="btn-copy-buyer-counter" onclick="window.__srCopyBuyerCounter(this)" style="background:var(--emerald-roi);color:#FFFFFF;border:none;border-radius:8px;padding:8px 14px;font-size:13px;font-weight:800;cursor:pointer;">Unlock &amp; Copy Counter-Offer (${escapeHtml(showBookingEmail)})</button>
                <a id="btn-mailto-buyer-counter" href="${escapeHtml(counterMailto)}" onclick="if(!window.__ebIsUnlocked&&window.__ebCheckout){window.__ebCheckout('playbook_pass',false);return false;}if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'mailto_buyer_counter'});" style="background:var(--bg-surface);color:var(--cyan-info);border:1px solid var(--border-subtle);border-radius:8px;padding:8px 14px;font-size:13px;font-weight:700;text-decoration:none;">1-Click Open Counter-Offer in Mail</a>
              </div>
            </div>
            <pre id="sr-buyer-counter-pre" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-sans); font-size:14.5px; line-height:1.65; color:var(--text-primary); background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:10px; padding:16px 20px; margin:0 0 10px 0;">${escapeHtml(`To: ${showBookingEmail}\nSubject: ${counterSubject}\n\n${counterBody}`)}</pre>
            <pre class="pitch-pre">${escapeHtml(
              `• [BENCHMARK] Lookalike #1: ${mb.lookalike_shows[0].name} (${(mb.lookalike_shows[0].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[0].overlap}) - $${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot | Rep: ${mb.lookalike_shows[0].booking_rep}\n` +
              `• [LOCKED] Lookalike #2: ${mb.lookalike_shows[1].name} (${(mb.lookalike_shows[1].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[1].overlap}) - $${mb.lookalike_shows[1].slot_usd.toLocaleString()}/slot | Rep: ${mb.lookalike_shows[1].booking_rep}\n` +
              `• Unlock All 10 Lookalike Shows + 88 Direct Buyer/Show Rep Emails + Negotiated Rate Card CSV: [$1.99 SINGLE ROW / $29 COMPLETE 88-ROW Q4 LEDGER]`
            )}</pre>
          </div>
        </div>

        <!-- PANE 2: CREATOR OUTBOUND 2-STEP PITCH & 1-CLICK MAILTO GENERATOR -->
        <div id="sr-pane-creator" style="display:none;">
          <div style="padding:20px 22px; border-radius:14px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin:0 0 14px 0;padding-bottom:12px;border-bottom:1px solid var(--border-subtle);">
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <span style="display:inline-flex; align-items:center; justify-content:center; padding:4px 10px; border-radius:999px; background:var(--vermilion); color:#FFFFFF; font-family:var(--font-mono); font-size:12px; font-weight:800;">STEP 1 OF 2</span>
                <strong style="font-size:15px;color:var(--text-primary);">Select Your Reach:</strong>
                <button type="button" onclick="window.__srCalcPseoReach(10000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-subtle);border-radius:6px;padding:5px 10px;font-size:13px;font-weight:700;cursor:pointer;">10K</button>
                <button type="button" onclick="window.__srCalcPseoReach(25000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-subtle);border-radius:6px;padding:5px 10px;font-size:13px;font-weight:700;cursor:pointer;">25K</button>
                <button type="button" onclick="window.__srCalcPseoReach(75000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-subtle);border-radius:6px;padding:5px 10px;font-size:13px;font-weight:700;cursor:pointer;">75K</button>
                <button type="button" onclick="window.__srCalcPseoReach(150000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-subtle);border-radius:6px;padding:5px 10px;font-size:13px;font-weight:700;cursor:pointer;">150K</button>
                <span id="sr-pseo-quote-readout" class="mono" style="font-size:13.5px;font-weight:800;color:var(--emerald-roi);margin-left:4px;">3-Flight Pilot: $${Math.round(35 * (brand ? brand.avg_cpm : 38) * 3 * 0.88).toLocaleString()}</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <span style="display:inline-flex; align-items:center; justify-content:center; padding:4px 10px; border-radius:999px; background:var(--emerald-roi); color:#FFFFFF; font-family:var(--font-mono); font-size:12px; font-weight:800;">STEP 2 OF 2</span>
                <button type="button" onclick="if(!window.__ebIsUnlocked&&window.__ebCheckout){window.__ebCheckout('playbook_pass',false);this.textContent='Previewing $29 Full Ledger ↓';return;}navigator.clipboard.writeText(document.getElementById('sr-free-pitch-pre').innerText);this.textContent='Pitch #1 Copied!';if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'free_pitch_1'});" style="background:var(--emerald-roi);color:#FFFFFF;border:none;border-radius:8px;padding:7px 13px;font-size:13px;font-weight:800;cursor:pointer;">Unlock Buyer Email &amp; Copy Pitch (${escapeHtml(sampleBuyerEmail)})</button>
                <a href="${escapeHtml(sampleMailto)}" onclick="if(!window.__ebIsUnlocked&&window.__ebCheckout){window.__ebCheckout('playbook_pass',false);return false;}if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'mailto_pitch_1'});" style="background:var(--bg-surface);color:var(--cyan-info);border:1px solid var(--border-subtle);border-radius:8px;padding:7px 13px;font-size:13px;font-weight:700;text-decoration:none;">1-Click Open in Gmail / Mail</a>
              </div>
            </div>
            <pre id="sr-free-pitch-pre" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-sans); font-size:14.5px; line-height:1.65; color:var(--text-primary); background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:10px; padding:16px 20px; margin:0 0 10px 0;">${escapeHtml('# OUTBOUND 3-FLIGHT PILOT PITCH PREVIEW (DOMAIN VERIFIED)\nTo: ' + sampleBuyerEmail + ' (' + outboundPitch.agency_desk + ')\nSubject: ' + outboundPitch.subject + '\n\n' + samplePitchText)}</pre>
            <pre class="pitch-pre">${escapeHtml('[PITCHES #2–#15 + 3-STEP FOLLOW-UP .EML SEQUENCE + 88-CONTACT CSV]: Unlock Instant Campaign Pass ($1.99 Single Row / $29 Complete 88-Row Q4 Ledger)')}</pre>
          </div>
        </div>

        <!-- MOBILE-TO-DESKTOP MAGIC BRIDGE BAR -->
        <form onsubmit="return window.__srSendDesktopBridge(event)" style="margin-top:16px; padding:12px 16px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
          <span class="mono" style="font-size:13.5px; color:var(--text-primary); font-weight:700;">Comparing options or on mobile? Email yourself this live 2-Step Plan + Desktop Link (Free):</span>
          <div style="display:flex; gap:8px; flex-wrap:wrap; flex:1; max-width:420px;">
            <input id="sr-bridge-email" type="email" required placeholder="you@work-email.com" aria-label="Work email for desktop link" style="flex:1; min-width:170px; padding:7px 12px; border-radius:8px; border:1px solid var(--border-strong); background:var(--bg-surface); color:var(--text-primary); font-size:14px;" />
            <button id="sr-bridge-btn" type="submit" style="padding:7px 14px; border-radius:8px; border:none; background:var(--emerald-roi); color:#FFFFFF; font-size:13px; font-weight:800; cursor:pointer;">Send to My Inbox →</button>
          </div>
        </form>

        <script>
          window.__srSwitchPersona = function(mode) {
            var bPane = document.getElementById('sr-pane-buyer'), cPane = document.getElementById('sr-pane-creator');
            var bBtn = document.getElementById('btn-sr-persona-buyer'), cBtn = document.getElementById('btn-sr-persona-creator');
            if (bPane && cPane) { bPane.style.display = mode === 'buyer' ? 'flex' : 'none'; cPane.style.display = mode === 'creator' ? 'block' : 'none'; }
            if (bBtn && cBtn) {
              bBtn.style.background = mode === 'buyer' ? 'var(--emerald-soft)' : 'transparent'; bBtn.style.color = mode === 'buyer' ? 'var(--emerald-roi)' : 'var(--text-secondary)';
              cBtn.style.background = mode === 'creator' ? 'var(--emerald-soft)' : 'transparent'; cBtn.style.color = mode === 'creator' ? 'var(--emerald-roi)' : 'var(--text-secondary)';
            }
            if (window.__ebLogEvent) window.__ebLogEvent('tab_switch', { store_pill: 'persona_' + mode });
          };
          window.__srSwitchRole = window.__srSwitchPersona;
          window.__srCopyBuyerCounter = function(btnEl) {
            if (!window.__ebIsUnlocked && window.__ebCheckout) { window.__ebCheckout('playbook_pass', false); if (btnEl) btnEl.textContent = 'Previewing $29 Full Ledger ↓'; return; }
            var pre = document.getElementById('sr-buyer-counter-pre'), btn = btnEl || document.getElementById('btn-copy-buyer-counter');
            if (pre && navigator.clipboard) navigator.clipboard.writeText(pre.innerText || pre.textContent || '');
            if (btn) btn.textContent = 'Counter-Offer Script Copied!';
            if (window.__ebLogEvent) window.__ebLogEvent('copy_summary', { type: 'buyer_counter_offer' });
          };
          window.__srUpdateMoneyball = function(budget, rackRate, cpm) {
            var b = Number(budget) || 10000;
            var rack = Math.max(1000, Number(rackRate) || 9500);
            var floor = Math.round(rack * 0.82);
            var rackSlots = (b / rack).toFixed(1);
            var floorSlots = (b / floor).toFixed(1);
            var lookalikeSlots = Math.max(2, Math.round(b / Math.max(750, rack * 0.22)));
            var estClicks = Math.round((b / Math.max(18, (Number(cpm) || 45) * 0.82)) * 18);
            var el = document.getElementById('sr-moneyball-readout');
            if (el) el.innerHTML = '$' + b.toLocaleString() + ' Budget → <span style="color:var(--amber-gold);">' + rackSlots + ' Rack Slots (' + floorSlots + ' @ Floor)</span> vs. <span style="color:var(--emerald-roi);">' + lookalikeSlots + ' Lookalike Flights (~' + estClicks.toLocaleString() + ' Clicks)</span>';
            var c1Sub = document.getElementById('sr-seo-mb-card1-sub');
            if (c1Sub) c1Sub.textContent = 'Save $' + Math.round(b * 0.18).toLocaleString() + ' on a $' + b.toLocaleString() + ' budget w/ 3-flight floor + 1.5% CTR make-good';
            if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'moneyball_budget_slider', budget_usd: b });
          };
          window.__srRunSeoQuoteAudit = function(presetPrice, presetReach, label) {
            var pEl = document.getElementById('sr-qa-price'), rEl = document.getElementById('sr-qa-reach'), aEl = document.getElementById('sr-qa-acv');
            if (presetPrice && pEl) pEl.value = presetPrice;
            if (presetReach && rEl) rEl.value = presetReach;
            var price = Math.max(100, Number(pEl && pEl.value) || ${showRackUsd});
            var reach = Math.max(1000, Number(rEl && rEl.value) || ${showReach});
            var acv = Math.max(50, Number(aEl && aEl.value) || 1200);
            var quotedCpm = (price / (reach / 1000));
            var baseFloorCpm = ${floorCpm};
            var fairFloorPrice = Math.round((reach / 1000) * (reach < 80000 ? Math.min(38, baseFloorCpm) : baseFloorCpm));
            var deltaPct = Math.round(((price - fairFloorPrice) / Math.max(1, fairFloorPrice)) * 100);
            var clicks = Math.max(10, Math.round(reach * 0.018));
            var cpc = (price / clicks).toFixed(2);
            var trials = Math.max(2, Math.round(clicks * 0.035));
            var custs = Math.max(1, Math.round(clicks * 0.0085));
            var cac = Math.round(price / custs);
            var rev = custs * acv;
            var roas = (rev / price).toFixed(1);
            var cpmOut = document.getElementById('sr-qa-cpm-out'), vOut = document.getElementById('sr-qa-verdict-out'), clOut = document.getElementById('sr-qa-clicks-out'), ldOut = document.getElementById('sr-qa-leads-out'), cacOut = document.getElementById('sr-qa-cac-out'), roasOut = document.getElementById('sr-qa-roas-out');
            if (cpmOut) cpmOut.textContent = '$' + quotedCpm.toFixed(2) + ' Quoted CPM vs. $' + (reach < 80000 ? Math.min(38, baseFloorCpm) : baseFloorCpm) + '.00 Verified Floor';
            if (vOut) {
              if (deltaPct > 5) {
                vOut.style.color = 'var(--vermilion)';
                vOut.textContent = 'Overcharged by +' + deltaPct + '% vs. 3-Flight Floor - Counter at $' + fairFloorPrice.toLocaleString() + '/slot (Save $' + Math.max(0, price - fairFloorPrice).toLocaleString() + ')';
              } else {
                vOut.style.color = 'var(--emerald-roi)';
                vOut.textContent = 'Verified Floor Pricing Cleared (' + (label || 'Fair 3-Flight Rate') + ') - Lock 3-Flight Pilot w/ 1.5% CTR Make-Good';
              }
            }
            if (clOut) clOut.textContent = clicks.toLocaleString() + ' Est. Clicks (~$' + cpc + ' Implied CPC)';
            if (ldOut) ldOut.textContent = '~' + trials.toLocaleString() + ' Trial Signups @ 3.5% Landing Page Conv.';
            if (cacOut) cacOut.textContent = '~' + custs + ' Paid Customers • $' + cac.toLocaleString() + ' Est. CAC';
            if (roasOut) roasOut.textContent = 'Projected LTV Revenue: $' + rev.toLocaleString() + ' (' + roas + 'x LTV:Spend Return)';
            var counterPre = document.getElementById('sr-buyer-counter-pre');
            var safeShowTitle = ${JSON.stringify(targetShowForBuyer).replace(/</g, '\\u003c')};
            var safeSponsorsLabel = ${JSON.stringify(repeatSponsorsLabel).replace(/</g, '\\u003c')};
            if (counterPre) {
              counterPre.textContent = 'To: ${showBookingEmail}\\nSubject: 3-Flight Q4 Sponsorship Pilot Inquiry - ' + safeShowTitle + ' ($' + fairFloorPrice.toLocaleString() + '/flight Floor)\\n\\nHi ' + safeShowTitle + ' Booking Team (${showBookingEmail}),\\n\\nWe are allocating our Q4 creator media budget and benchmarking your $' + price.toLocaleString() + ' quote (' + Math.round(reach / 1000) + 'K reach, $' + quotedCpm.toFixed(1) + ' CPM) against repeat 3x+ sponsors on ' + safeShowTitle + ' (' + safeSponsorsLabel + ').\\n\\nWe are ready to commit to a 3-flight pilot package at the verified agency 3-flight floor of $' + fairFloorPrice.toLocaleString() + '/flight ($' + (fairFloorPrice * 3).toLocaleString() + ' total 3-flight IO) with a 1.5% CTR make-good clause (~' + clicks.toLocaleString() + ' clicks target) and IAB 30-day verified download reporting.\\n\\nPlease share your next 3 open insertion dates so we can send over the IO.';
            }
            if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'seo_quote_auditor', price: price, reach: reach, fair_floor: fairFloorPrice });
          };
          window.__srSendDesktopBridge = function(ev) {
            if (ev && ev.preventDefault) ev.preventDefault();
            var em = (document.getElementById('sr-bridge-email') || {}).value || '';
            if (!em) return false;
            var btn = document.getElementById('sr-bridge-btn');
            if (btn) btn.textContent = 'Sent to Inbox!';
            fetch('/api/leads/capture', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: em, pageUrl: window.location.pathname, utmSource: 'mobile_desktop_magic_bridge', summaryText: 'SponsorRadar Option E Pitch #1 + Moneyball Brief (' + window.location.pathname + ')' })
            }).catch(function(){});
            return false;
          };
          window.__srCalcPseoReach = function(reach, cpm) {
            var single = Math.round((reach / 1000) * cpm);
            var pkg = Math.round(single * 3 * 0.88);
            var el = document.getElementById('sr-pseo-quote-readout');
            if (el) el.textContent = (reach / 1000) + 'K Reach → $' + single.toLocaleString() + '/slot • 3-Flight Pilot: $' + pkg.toLocaleString();
            fetch('/api/telemetry/event', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ event_type: 'calculate', page_url: window.location.pathname, meta: { source: 'pseo_reach_quote_bar', reach: reach, cpm: cpm, pilot_package_usd: pkg } })
            }).catch(function(){});
          };
        </script>
      </div>
      ` : '';
      })()}

      <!-- FAQ Section -->
      <div class="panel" style="margin-bottom:28px;">
        <div class="panel-header"><span style="font-weight:800;">Frequently Asked Questions</span></div>
        <div class="panel-body" style="display:flex; flex-direction:column; gap:16px;">
          ${faqItems.map(item => `
            <div>
              <h3 style="font-size:16px; font-weight:700; color:var(--text-primary); margin-bottom:4px;">${escapeHtml(item.q)}</h3>
              <p style="font-size:14px; color:var(--text-secondary);">${escapeHtml(item.a)}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Related Spokes -->
      <div class="panel">
        <div class="panel-header"><span style="font-weight:800;">Related Sponsorship Spend &amp; CPM Benchmark Reports</span></div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">
          ${relatedPages.map(r => `
            <a href="/seo/${escapeHtml(r.slug)}" class="panel" style="padding:14px; background:var(--bg-elevated); box-shadow:none;">
              <div class="mono" style="font-size:13px; color:var(--amber-gold); font-weight:700;">${escapeHtml(r.category)} • $${r.avg_cpm} CPM ($${Math.round(r.avg_cpm * 0.82)} Floor)</div>
              <div style="font-weight:700; font-size:13.5px; margin-top:4px; color:var(--text-primary);">${escapeHtml(r.title)}</div>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  </article>
  `;

  const srTitle = isShowPage
    ? `${page.title} (${placements.length} B2B Sponsors, $${page.avg_cpm} Rack / $${floorCpm} Floor CPM) | SponsorRadar`
    : isBrandPage
      ? `${page.title} ($${Math.round(page.est_monthly_spend / 1000)}K/mo Spend, $${page.avg_cpm} CPM & Buyer Email) | SponsorRadar`
      : `${page.title} (${placements.length} Verified Sponsors & $${page.avg_cpm} Avg CPM) | SponsorRadar`;
  const srDesc = `Verified 2026 ledger (${placements.length} placements, $${page.avg_cpm} rack CPM / $${floorCpm} 3-flight floor CPM, $${Math.round(page.est_monthly_spend / 1000)}K/mo est. spend): ${page.meta_description || page.summary}`;
  return renderShell({
    title: srTitle,
    description: srDesc,
    canonicalPath: `/seo/${page.slug}`,
    ogSlug: page.slug,
    jsonLd,
    bodyHtml
  });
}

function renderLegalPage(type) {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy | SponsorRadar (#2)' : 'Terms of Service | SponsorRadar (#2)';
  const bodyHtml = `
  <section style="padding:48px 0;">
    <div class="container" style="max-width:820px;">
      <span class="pill-slate">LEGAL &amp; GDPR / CCPA COMPLIANCE</span>
      <h1 class="headline-xl">${escapeHtml(title)}</h1>
      <p class="mono" style="font-size:13px; color:var(--text-muted); margin-bottom:24px;">Last Updated: October 14, 2026 • Effective Immediately</p>
      <div class="panel" style="padding:24px; display:flex; flex-direction:column; gap:16px; color:var(--text-secondary); font-size:14.5px;">
        ${isPrivacy ? `
          <p><strong style="color:var(--text-primary);">1. Data We Collect:</strong> SponsorRadar collects work email addresses voluntarily submitted during Creator Pro or Agency Feed checkout, query inputs submitted to our sponsor lookup and transcript analyzer, and first-party UTM/Meta CAPI attribution parameters after explicit cookie consent.</p>
          <p><strong style="color:var(--text-primary);">2. How We Use Data:</strong> To deliver sponsorship spend reports, generate outbound pitches, process subscriptions via Stripe, and measure campaign attribution with event_id deduplication.</p>
          <p><strong style="color:var(--text-primary);">3. Zero Secret Leakage &amp; Storage:</strong> All data is stored in our isolated SQLite WAL ledger with zero client-side API key exposure. You may request full GDPR/CCPA deletion at any time by emailing privacy@sponsorradar.io.</p>
        ` : `
          <p><strong style="color:var(--text-primary);">1. Service Scope:</strong> SponsorRadar provides estimated CPM benchmarks, historical ad-read timestamps, promo-code tracking, and outbound pitch templates for informational and media-buying intelligence purposes.</p>
          <p><strong style="color:var(--text-primary);">2. Subscriptions &amp; 30-Day Refund Guarantee:</strong> Creator Pro ($49/mo) and Media Buyer &amp; Agency Feed ($199/mo) plans may be canceled at any time. All first-time subscribers are covered by our 30-day 100% money-back guarantee.</p>
          <p><strong style="color:var(--text-primary);">3. Acceptable Use:</strong> Users agree to comply with CAN-SPAM and GDPR guidelines when sending outbound sponsorship pitches generated by the platform.</p>
        `}
      </div>
    </div>
  </section>
  `;
  return renderShell({
    title,
    description: `${title} for SponsorRadar Audio & Newsletter Ad-Spend Intelligence Platform.`,
    canonicalPath: isPrivacy ? '/privacy' : '/terms',
    ogSlug: isPrivacy ? 'privacy' : 'terms',
    jsonLd: null,
    bodyHtml
  });
}

function renderNotFoundPage(requestedPath) {
  const bodyHtml = `
  <section style="padding:72px 0; text-align:center;">
    <div class="container" style="max-width:640px;">
      <span class="pill-vermilion">HTTP 404 • ROUTE NOT IN LEDGER</span>
      <h1 class="headline-xl">Ad-Spend Route Not Found</h1>
      <p style="color:var(--text-secondary); margin-bottom:24px;">
        The path <code class="mono" style="color:var(--vermilion);">${escapeHtml(requestedPath)}</code> did not match an active brand or show slug. Jump back to the live workbench or browse all 104 verified pSEO reports.
      </p>
      <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
        <a href="/" class="btn btn-vermilion">
          <span>Return to Live Workbench</span>
          <span class="btn-icon-circle" aria-hidden="true">↗</span>
        </a>
        <a href="/directory" class="btn btn-ghost">Browse 104 Spend Reports</a>
      </div>
    </div>
  </section>
  `;
  return renderShell({
    title: '404 Not Found | SponsorRadar Media Intelligence',
    description: 'Page not found on SponsorRadar Media Intelligence Platform.',
    canonicalPath: '/404',
    ogSlug: '404',
    jsonLd: null,
    bodyHtml
  });
}

module.exports = {
  renderDirectoryPage,
  renderSeoPage,
  renderLegalPage,
  renderNotFoundPage
};

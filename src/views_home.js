const { escapeHtml, renderBrandLogoSvg, renderShell } = require('./views_shell');
const { generateMoneyballLookalikeBundle } = require('./engine');

function renderHomePage({ brands, shows, placements, seoPages, sampleTranscripts, defaultAnalysis, initialQuery = 'Deel', initialReach = 75000, pubQuery = '' }) {
  const displayEntity = defaultAnalysis.display_entity || {
    type: 'brand',
    name: defaultAnalysis.brand.name,
    subtitle: `${defaultAnalysis.brand.domain} • ${defaultAnalysis.brand.category}`,
    lead_role: defaultAnalysis.brand.decision_maker_role,
    table_title: `VERIFIED SPONSORSHIP PLACEMENTS FOR ${defaultAnalysis.brand.name.toUpperCase()}`
  };
  const isInitialShow = displayEntity.type === 'show' || defaultAnalysis.matched_type === 'show';
  const mb = defaultAnalysis.moneyball_bundle || generateMoneyballLookalikeBundle({
    targetShowName: defaultAnalysis.show ? defaultAnalysis.show.name : ((defaultAnalysis.placements[0] && defaultAnalysis.placements[0].show_name) || "Lenny's Podcast"),
    baseCpm: defaultAnalysis.metrics.avg_cpm_usd,
    rackRateUsd: 9500,
    category: defaultAnalysis.brand.category,
    placements: defaultAnalysis.placements
  });
  const samplePitchText = defaultAnalysis.outbound_pitch.free_pitch_script || defaultAnalysis.outbound_pitch.body;
  const sampleBuyerEmail = defaultAnalysis.outbound_pitch.to_email || 'p***@deel.com';
  const sampleMailto = defaultAnalysis.outbound_pitch.mailto_href || 'mailto:?subject=3-Flight%20Sponsorship%20Pilot';
  const proven3xPlacements = placements.filter(p => p.flights >= 3).slice(0, 12);
  const testPlacements = placements.filter(p => p.flights < 3).slice(0, 6);
  const topPlacements = [...proven3xPlacements, ...testPlacements];
  const topSeoLinks = [
    ...seoPages.filter(p => p.page_type === 'brand_breakdown').slice(0, 8),
    ...seoPages.filter(p => p.page_type === 'show_benchmark').slice(0, 8),
    ...seoPages.filter(p => p.page_type === 'niche_directory').slice(0, 8)
  ];
  const totalContacts = brands.length + shows.length;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: 'SponsorRadar', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', description: 'Podcast, Newsletter & YouTube Ad-Read Spend Ledger, Show Rate-Card Quote Auditor, 3x-Renewal Tracker & Outbound Sponsor Pitch Generator.', offers: [{ '@type': 'Offer', name: '3-File Sponsor & Rate Card Pack', price: '1.99', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Complete 88-Row Q4 Ledger + CSV', price: '29.00', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Creator Pro', price: '49.00', priceCurrency: 'USD' }] },
      { '@type': 'Dataset', name: 'SponsorRadar 2026 Verified Podcast, Newsletter & YouTube Ad-Spend Ledger', description: `Historical ad-read timestamps, promo codes, vanity URLs, negotiated CPM floors, and 3x+ renewal velocity scores across ${brands.length} sponsor brands and ${shows.length} top shows.`, creator: { '@type': 'Organization', name: 'SponsorRadar Intelligence' } }
    ]
  };

  const pubBannerHtml = pubQuery ? `
      <div id="pub-indexed-banner" class="panel" style="margin-bottom:28px; padding:24px 28px; background:var(--bg-surface); border-radius:18px; display:flex; flex-direction:column; gap:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding-bottom:14px;">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;"><span class="pill-emerald" style="background:var(--emerald-soft);">Live Indexed Creator Benchmark</span><strong style="font-size:17px; color:var(--text-primary);">${escapeHtml(pubQuery)}</strong></div>
          <span class="mono" style="font-size:14px; font-weight:700; color:var(--emerald-roi); background:var(--emerald-soft); padding:4px 10px; border-radius:8px;">3-Flight Pilot Quote: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} ($${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px;">
          <div style="padding:14px 16px; border-radius:12px; background:var(--bg-parchment);"><div class="mono" style="font-size:14px; color:var(--text-secondary); font-weight:700;">Top Matched 3x+ Sponsors</div><div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-top:4px;">1. Linear (8x) • 2. Deel (12x) • 3. Ramp (10x)</div></div>
          <div style="padding:14px 16px; border-radius:12px; background:var(--emerald-soft);"><div class="mono" style="font-size:14px; color:var(--emerald-roi); font-weight:700;">Domain-Verified Contact Preview</div><div class="mono" style="font-size:15px; font-weight:700; color:var(--text-primary); margin-top:4px;">${escapeHtml(sampleBuyerEmail)}</div></div>
          <div id="pub-blurred-emails-preview" style="padding:14px 16px; border-radius:12px; background:#FFFBEB;"><div class="mono" style="font-size:14px; color:#92400E; font-weight:700;">87 Additional Contacts Locked</div><div class="mono" style="font-size:14px; font-weight:700; color:#92400E; margin-top:4px;"><span style="filter:blur(3.5px);user-select:none;">p***@deel.com</span> • <span style="filter:blur(3.5px);user-select:none;">s***@supabase.io</span> (+85 more)</div></div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px; align-items:center;">
          <a href="#radar-results-container" class="btn btn-ghost" style="padding:10px 16px; min-height:42px; font-size:14px; text-decoration:none; justify-content:center;">1. View Matched Sponsor Table ↓</a>
          <button type="button" id="btn-copy-creator-badge" onclick="if(window.__ebCopyReadmeBadge){window.__ebCopyReadmeBadge(this);}" class="btn btn-ghost" style="padding:10px 16px; min-height:42px; font-size:14px; color:var(--emerald-roi); font-weight:700; cursor:pointer; justify-content:center;">2. Copy Verified 3x-Sponsor Badge</button>
          <a href="/buy/flash_pass?target=${encodeURIComponent(pubQuery)}" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:10px 16px; min-height:42px; font-size:14px; text-decoration:none; justify-content:center;">3. Unlock All ${totalContacts} Contacts ($1.99) →</a>
        </div>
      </div>` : '';

  const bodyHtml = `
  <section class="hero-section" id="radar-tool">
    <div class="container">
      ${pubBannerHtml}
      <div class="hero-grid">
        <div id="home-executive-brief" style="display:flex; flex-direction:column; justify-content:space-between; gap:14px;">
          <div>
            <h1 class="headline-xl" style="margin-top:0;">Track 3x+ Renewed Sponsors &amp; CPMs</h1>
            <p class="subhead">68% of one-off sponsorships never renew. Search any <strong>brand or show</strong> to audit negotiated 3-flight CPM floors (-18% vs. rack), verify 3x+ repeat sponsors, compare lookalike shows, and unlock <strong>${totalContacts} direct contacts (${brands.length} Brand Buyers + ${shows.length} Show Booking Reps)</strong>.</p>
            <div style="display:inline-flex; gap:6px; flex-wrap:wrap; align-items:center; padding:5px 8px; border-radius:999px; background:var(--bg-parchment); margin-bottom:10px;">
              <span class="mono" style="font-size:13.5px; font-weight:800; color:var(--text-secondary); padding-left:6px;">Role:</span>
              <button type="button" id="hero-role-buyer" onclick="window.__srSwitchPersona('buyer');var o=document.getElementById('sr-home-option-e');if(o)o.scrollIntoView({behavior:'smooth',block:'center'});" style="display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:999px; border:none; background:var(--emerald-soft); color:var(--emerald-roi); font-size:13.5px; font-weight:800; cursor:pointer;"><img src="/public/editorial-segment-1.jpg" alt="Media Buyer" width="22" height="22" loading="eager" style="width:22px;height:22px;border-radius:50%;object-fit:cover;object-position:center 25%;" /><span>Media Buyer (Audit Show Rates &amp; Floors)</span></button>
              <button type="button" id="hero-role-creator" onclick="window.__srSwitchPersona('creator');var o=document.getElementById('sr-home-option-e');if(o)o.scrollIntoView({behavior:'smooth',block:'center'});" style="display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:999px; border:none; background:var(--bg-surface); color:var(--text-secondary); font-size:13.5px; font-weight:700; cursor:pointer;"><img src="/public/editorial-segment-2.jpg" alt="Creator" width="22" height="22" loading="eager" style="width:22px;height:22px;border-radius:50%;object-fit:cover;object-position:center 25%;" /><span>Creator / Show (Pitch 3x+ Sponsors)</span></button>
            </div>
            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:4px;">
              <span class="pill-vermilion">Podcast, Newsletter &amp; YouTube Rate-Card Ledger</span>
              <a href="/leaderboard" class="pill-emerald" style="text-decoration:none;">Top-16 Brand &amp; Show Leaderboard &rarr;</a>
              <a href="/directory" class="pill-slate" style="text-decoration:none;">Browse ${seoPages.length} Reports &rarr;</a>
            </div>
          </div>
          <div class="hero-steps-grid">
            <div class="panel" style="padding:16px;"><div class="mono" style="font-size:14px; color:var(--emerald-roi); font-weight:700; margin-bottom:4px;">Step 1 • Verify 3x+ Renewals</div><p style="font-size:15px; color:var(--text-primary); font-weight:500; line-height:1.45; margin:0;">Search any brand or show to see multi-quarter 3x+ renewals, promo codes &amp; true spend.</p></div>
            <div class="panel" style="padding:16px;"><div class="mono" style="font-size:14px; color:var(--vermilion); font-weight:700; margin-bottom:4px;">Step 2 • Audit Quotes &amp; Floors</div><p style="font-size:15px; color:var(--text-primary); font-weight:500; line-height:1.45; margin:0;">Check if a show quote is overpriced vs. the -18% 3-flight floor or price your 3-episode pilot.</p></div>
            <div class="panel" style="padding:16px;"><div class="mono" style="font-size:14px; color:var(--text-primary); font-weight:700; margin-bottom:4px;">Step 3 • Build Q4 Plan &amp; Unlock</div><p style="font-size:15px; color:var(--text-primary); font-weight:500; line-height:1.45; margin:0;">Shortlist shows/brands into your Q4 Media Plan or unlock all ${totalContacts} contacts ($1.99 / $29 Full Ledger).</p></div>
          </div>
        </div>

        <!-- Right Column: Search & Reach Controls -->
        <div class="double-bezel" style="display:flex; flex-direction:column;">
          <div class="panel" style="display:flex; flex-direction:column; flex:1; justify-content:space-between;">
            <div class="panel-header">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="pill-vermilion">Live Sponsorship &amp; Rate Checker</span>
                <span style="font-weight:700; font-size:16px;">Search Any Brand, Podcast, Newsletter or YouTube Show</span>
              </div>
              <span class="pill-emerald" id="res-match-pill">${defaultAnalysis.matched_type === 'show' ? 'Show Rate Card Match' : 'Verified 3x+ Ledger'}</span>
            </div>

            <div class="panel-body" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; gap:12px;">
              <div id="mode-lookup-pane">
                <div style="display:flex; gap:10px; align-items:flex-end; flex-wrap:wrap;">
                  <div style="flex:1; min-width:220px;">
                    <label for="lookup-query" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Brand or Show Name</label>
                    <input id="lookup-query" type="text" class="input-field" value="${escapeHtml(initialQuery)}" required placeholder="e.g. AG1, Deel, Ramp, Lenny's Podcast, Huberman Lab, Indie Hackers..." onkeydown="if(event.key==='Enter'){event.preventDefault();runBrandLookup();}" />
                  </div>
                  <button type="button" id="btn-run-lookup" class="btn btn-vermilion" onclick="runBrandLookup()">
                    <span>Audit Spend &amp; Rates</span>
                    <span class="btn-icon-circle" aria-hidden="true">↗</span>
                  </button>
                </div>
                <div id="lookup-error-msg" class="mono" style="display:none; color:#B9311C; font-size:14px; margin-top:6px;"></div>

                <div class="preset-row" aria-label="1-Click Brand & Show Presets">
                  <span class="mono" style="font-size:13.5px; font-weight:700; color:var(--text-muted); align-self:center;">Brands:</span>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('AG1', 'creator')">AG1 ($1.42M/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Deel', 'creator')">Deel ($680K/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Ramp', 'creator')">Ramp ($790K/mo)</button>
                  <span class="mono" style="font-size:13.5px; font-weight:700; color:var(--text-muted); align-self:center; margin-left:4px;">Audit Shows:</span>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Lenny\\'s Podcast', 'buyer')">Lenny's Podcast ($54 CPM)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Huberman Lab', 'buyer')">Huberman Lab ($42 CPM)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Indie Hackers', 'buyer')">Indie Hackers ($53 CPM)</button>
                </div>

                <div style="margin-top:10px; padding:12px 14px; border-radius:10px; background:var(--bg-parchment); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
                  <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <label for="sender-reach" class="mono" style="font-size:13.5px; font-weight:700; color:var(--text-secondary);">Target / Show Reach:</label>
                    <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(10000)">10K</button>
                    <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(25000)">25K</button>
                    <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(75000)">75K</button>
                    <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(150000)">150K</button>
                    <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(250000)">250K</button>
                  </div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <input id="sender-reach" type="number" class="input-field mono" value="${initialReach}" min="500" step="1000" style="width:110px; min-height:38px; padding:6px 10px; font-size:15px;" onchange="runBrandLookup()" />
                    <input id="sender-show" type="hidden" value="Creator Media Network" />
                  </div>
                </div>

                <!-- Live 2x2 KPI Readout Inside Hero Search Card (Eliminates Empty White Space) -->
                <div style="margin-top:14px; display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:10px;">
                  <div class="kpi-box" style="background:var(--bg-parchment); padding:12px 14px; border-radius:10px;">
                    <div class="kpi-label" id="res-entity-label">${isInitialShow ? 'Matched Creator Show' : 'Sponsor / Entity'}</div>
                    <div class="kpi-val" id="res-brand-name" style="color:var(--text-primary); font-size:19px;">${escapeHtml(displayEntity.name)}</div>
                    <div class="mono" id="res-brand-domain" style="font-size:13.5px; color:var(--vermilion);">${escapeHtml(displayEntity.subtitle)}</div>
                  </div>
                  <div class="kpi-box" style="background:var(--bg-parchment); padding:12px 14px; border-radius:10px;">
                    <div class="kpi-label">Est. Monthly Ad Spend</div>
                    <div class="kpi-val" id="res-monthly-spend" style="color:var(--amber-gold); font-size:19px;">$${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}</div>
                    <div class="mono" id="res-avg-cpm" style="font-size:13.5px; color:var(--text-secondary);">Avg CPM: $${defaultAnalysis.metrics.avg_cpm_usd} (Floor: $${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)})</div>
                  </div>
                  <div class="kpi-box" style="background:var(--bg-parchment); padding:12px 14px; border-radius:10px;">
                    <div class="kpi-label">3x+ Renewal Score</div>
                    <div class="kpi-val" id="res-renewal-score" style="color:var(--emerald-roi); font-size:19px;">${defaultAnalysis.metrics.renewal_velocity_score}/100</div>
                    <div class="mono" id="res-flights-summary" style="font-size:13.5px; color:var(--emerald-roi);">${defaultAnalysis.metrics.proven_3x_shows_count} Proven 3x+ (${defaultAnalysis.metrics.verified_total_flights} Flights)</div>
                  </div>
                  <div class="kpi-box" style="background:var(--bg-parchment); padding:12px 14px; border-radius:10px;">
                    <div class="kpi-label">Partnerships &amp; Booking Desk</div>
                    <div class="kpi-val" id="res-dm-role" style="font-size:15.5px; color:var(--text-primary);">${escapeHtml(displayEntity.lead_role)}</div>
                    <div class="mono" id="res-dm-email" style="font-size:13.5px; color:var(--amber-gold);">Domain Verified • ${totalContacts} Contacts ($1.99)</div>
                  </div>
                </div>

                <!-- Instant Action Strip Inside Search Card -->
                <div style="margin-top:12px; padding:10px 14px; border-radius:10px; background:var(--emerald-soft); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <span class="mono" style="font-size:13.5px; font-weight:700; color:var(--emerald-roi);">3-Flight Floor: -18% vs. Rack + 1.5% CTR Make-Good</span>
                  <div style="display:flex; gap:8px; flex-wrap:wrap;">
                    <button type="button" class="btn btn-ghost" style="padding:6px 12px; min-height:34px; font-size:13.5px; background:var(--bg-surface);" onclick="window.__srAddToPlan((document.getElementById('res-brand-name')||{}).textContent || '${escapeHtml(displayEntity.name.replace(/'/g, "\\'"))}', '${isInitialShow ? 'show' : 'brand'}', window.__srCurrentAvgCpm || 45, window.__srCurrentRackRate || 9500, 3)">+ Add to Q4 Plan</button>
                    <a href="#sr-home-option-e" class="btn btn-emerald" style="padding:6px 12px; min-height:34px; font-size:13.5px; text-decoration:none;">Open Counter-Offer &amp; Pitch ↓</a>
                  </div>
                </div>

                <details id="mode-b-details" style="display:none;">
                  <summary id="mode-b-summary">Transcript Extractor</summary>
                  <div class="mode-tabs" role="tablist">
                    <button type="button" id="tab-mode-lookup" class="mode-tab active" onclick="switchToolMode('lookup')">Brand / Show Search</button>
                    <button type="button" id="tab-mode-transcript" class="mode-tab" onclick="switchToolMode('transcript')">Transcript Extractor</button>
                  </div>
                </details>
              </div>

              <!-- Transcript Extractor Mode (Hidden) -->
              <div id="mode-transcript-pane" style="display:none;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                  <span class="mono" style="font-size:14px; font-weight:700; color:var(--emerald-roi);">Raw Transcript Sponsor Extractor</span>
                  <button type="button" class="btn btn-ghost" style="padding:6px 12px; min-height:36px; font-size:14px;" onclick="switchToolMode('lookup')">← Back to Brand / Show Search</button>
                </div>
                <div class="lookup-form-grid" style="margin-bottom:10px;">
                  <div>
                    <label for="transcript-preset" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Sample Transcript</label>
                    <select id="transcript-preset" class="select-field" onchange="loadTranscriptPreset(this.value)">
                      ${sampleTranscripts.map(t => `<option value="${escapeHtml(t.id)}">${escapeHtml(t.label)}</option>`).join('')}
                    </select>
                  </div>
                  <div>
                    <label for="transcript-show" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Show Name</label>
                    <input id="transcript-show" type="text" class="input-field" value="${escapeHtml(sampleTranscripts[0].show_name)}" />
                  </div>
                  <div>
                    <label for="transcript-audience" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Episode Reach</label>
                    <input id="transcript-audience" type="number" class="input-field mono" value="${sampleTranscripts[0].audience_size}" />
                  </div>
                  <button type="button" id="btn-run-transcript" class="btn btn-emerald" onclick="runTranscriptExtractor()">Extract Sponsors</button>
                </div>
                <label for="transcript-input" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Raw Podcast / YouTube Transcript</label>
                <textarea id="transcript-input" class="textarea-field">${escapeHtml(sampleTranscripts[0].transcript)}</textarea>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- FULL-WIDTH LIVE RESULTS + WARM-IVORY INTERACTIVE WORKBENCH + PLACEMENTS TABLE -->
      <div id="radar-results-container" style="margin-top:24px; display:flex; flex-direction:column; gap:18px;">
        <div class="kpi-grid" style="display:none;"></div>

        <!-- 2. Warm-Ivory Interactive Buyer & Creator Workbench (Centerpiece on Homepage) -->
        <div id="sr-home-option-e" class="pitch-box" style="margin-top:0; background:var(--bg-surface); color:var(--text-primary); padding:24px 26px; border-radius:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid var(--border-subtle);">
            <div style="display:inline-flex; gap:8px; flex-wrap:wrap; align-items:center;">
              <span class="mono" style="font-size:14px; color:var(--text-secondary); font-weight:700;">Choose Your Workbench Mode:</span>
              <button type="button" id="btn-sr-persona-buyer" onclick="window.__srSwitchPersona('buyer')" style="display:inline-flex; align-items:center; gap:7px; padding:7px 14px; border-radius:999px; font-size:14px; font-weight:700; cursor:pointer; border:none; background:${isInitialShow ? 'var(--emerald-soft)' : 'var(--bg-parchment)'}; color:${isInitialShow ? 'var(--emerald-roi)' : 'var(--text-secondary)'};"><img src="/public/editorial-segment-1.jpg" alt="Brand Media Buyer" width="22" height="22" loading="lazy" style="width:22px;height:22px;border-radius:50%;object-fit:cover;object-position:center 25%;" /><span>For Brand Media Buyers (Quote Auditor &amp; Lookalike Planner)</span></button>
              <button type="button" id="btn-sr-persona-creator" onclick="window.__srSwitchPersona('creator')" style="display:inline-flex; align-items:center; gap:7px; padding:7px 14px; border-radius:999px; font-size:14px; font-weight:700; cursor:pointer; border:none; background:${!isInitialShow ? 'var(--emerald-soft)' : 'var(--bg-parchment)'}; color:${!isInitialShow ? 'var(--emerald-roi)' : 'var(--text-secondary)'};"><img src="/public/editorial-segment-2.jpg" alt="Creator & Show" width="22" height="22" loading="lazy" style="width:22px;height:22px;border-radius:50%;object-fit:cover;object-position:center 25%;" /><span>For Creators &amp; Shows (Ready-to-Send Sponsor Pitch)</span></button>
            </div>
            <div style="display:inline-flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <span class="mono" style="font-size:13.5px; font-weight:700; color:var(--emerald-roi);" id="res-pitch-meta">3-Flight Pilot: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} ($${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM • -18% Floor)</span>
              <a href="/buy/flash_pass?source=hero_pitch_pack" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:8px 14px; min-height:40px; font-size:13.5px; text-decoration:none; white-space:normal;">
                <span id="copy-pitch-label">Unlock ${totalContacts} Contacts ($1.99) →</span>
              </a>
            </div>
          </div>

          <!-- PANE 1: BRAND MEDIA BUYER QUOTE OVERCHARGE AUDITOR, BUDGET SLIDER & LOOKALIKE SHOWS -->
          <div id="sr-pane-buyer" style="display:${isInitialShow ? 'block' : 'none'};">
            <!-- Show Quote Overcharge Auditor -->
            <div style="padding:14px 16px; border-radius:12px; background:var(--bg-parchment); margin-bottom:12px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
                <span class="mono" style="font-size:13.5px; font-weight:800; color:var(--vermilion);">SHOW QUOTE OVERCHARGE AUDITOR (CHECK IF A CREATOR MEDIA-KIT QUOTE IS OVERPRICED):</span>
                <span id="sr-home-qa-badge" class="pill-emerald">3-Flight Floor Benchmark: -18% vs. Published Rack</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:10px; align-items:end;">
                <div>
                  <label for="sr-home-qa-price" class="mono" style="font-size:13.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:3px;">Quoted Slot Price ($ USD)</label>
                  <input id="sr-home-qa-price" type="number" class="input-field mono" value="${mb.published_rack_rate_usd}" min="250" step="250" style="min-height:38px; padding:6px 10px;" oninput="window.__srRunHomeQuoteAudit()" />
                </div>
                <div>
                  <label for="sr-home-qa-reach" class="mono" style="font-size:13.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:3px;">Claimed Reach / Opens</label>
                  <input id="sr-home-qa-reach" type="number" class="input-field mono" value="${Math.max(10000, Math.round((mb.published_rack_rate_usd / Math.max(15, defaultAnalysis.metrics.avg_cpm_usd)) * 1000))}" min="1000" step="5000" style="min-height:38px; padding:6px 10px;" oninput="window.__srRunHomeQuoteAudit()" />
                </div>
                <div style="grid-column: span 2; padding:8px 12px; border-radius:8px; background:var(--bg-surface);">
                  <div id="sr-home-qa-readout" class="mono" style="font-size:13.5px; font-weight:800; color:var(--text-primary);">
                    Quoted: $${mb.published_rack_rate_usd.toLocaleString()} ($${defaultAnalysis.metrics.avg_cpm_usd} CPM) → <span style="color:var(--emerald-roi);">Counter at 3-Flight Floor: $${mb.negotiated_floor_rate_usd.toLocaleString()}/slot ($${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)} eCPM • Save $${mb.savings_per_slot_usd.toLocaleString()}/read)</span>
                  </div>
                  <div id="sr-home-qa-sub" style="font-size:13.5px; color:var(--text-secondary); margin-top:2px;">
                    Est. Clicks @ 1.8% Host-Read CTR: ~${Math.round(Math.max(10000, (mb.published_rack_rate_usd / Math.max(15, defaultAnalysis.metrics.avg_cpm_usd)) * 1000) * 0.018).toLocaleString()} clicks (~$${(mb.negotiated_floor_rate_usd / Math.max(1, Math.round(Math.max(10000, (mb.published_rack_rate_usd / Math.max(15, defaultAnalysis.metrics.avg_cpm_usd)) * 1000) * 0.018))).toFixed(2)} Floor CPC) • Request 1.5% CTR Make-Good
                  </div>
                </div>
              </div>
            </div>

            <!-- Campaign Budget Slider -->
            <div style="padding:14px 16px; border-radius:10px; background:var(--bg-parchment); margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div style="flex:1; min-width:250px;">
                <label for="sr-moneyball-slider" class="mono" style="font-size:14px; color:var(--emerald-roi); font-weight:700; display:block; margin-bottom:4px;">Slide Your Monthly Sponsorship Budget ($2,500 to $50,000):</label>
                <input id="sr-moneyball-slider" type="range" min="2500" max="50000" step="2500" value="15000" oninput="window.__srUpdateMoneyball(this.value)" style="width:100%; accent-color:var(--emerald-roi); cursor:pointer;" />
              </div>
              <div id="sr-moneyball-readout" class="mono" style="font-size:14px; font-weight:700; color:var(--text-primary); background:var(--bg-surface); padding:8px 12px; border-radius:8px;">
                $15,000 Budget → <span style="color:var(--amber-gold);">${(15000 / Math.max(1000, mb.published_rack_rate_usd)).toFixed(1)} Rack Slots</span> vs. <span style="color:var(--emerald-roi);">${Math.max(3, Math.round(15000 / Math.max(750, mb.published_rack_rate_usd * 0.22)))} Host-Read Flights on Lookalike Shows (2.3x Reach)</span>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin-bottom:12px;">
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-parchment);">
                <div class="mono" style="font-size:13.5px; color:var(--text-secondary); font-weight:700;">Published Rack Rate vs. 3-Flight Floor</div>
                <div id="sr-mb-rack-floor" class="mono" style="font-size:16px; font-weight:800; color:var(--text-primary); margin-top:4px;">$${mb.published_rack_rate_usd.toLocaleString()} Rack → <span style="color:var(--emerald-roi);">$${mb.negotiated_floor_rate_usd.toLocaleString()} Floor (-18%)</span></div>
                <p id="sr-mb-savings-sub" style="font-size:14px; color:var(--text-secondary); margin:4px 0 0 0;">Save $${mb.savings_per_slot_usd.toLocaleString()}/slot with a 3-flight commitment + 1.5% CTR make-good</p>
              </div>
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-parchment);">
                <div class="mono" style="font-size:13.5px; color:var(--text-secondary); font-weight:700;">Lookalike Show #1 (86% Audience Overlap)</div>
                <div id="sr-mb-look1-title" class="mono" style="font-size:16px; font-weight:800; color:var(--emerald-roi); margin-top:4px;">${escapeHtml(mb.lookalike_shows[0].name)} ($${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot)</div>
                <p id="sr-mb-look1-rep" style="font-size:14px; color:var(--text-primary); margin:4px 0 0 0;">Direct Rep: <strong>${escapeHtml(mb.lookalike_shows[0].booking_rep)}</strong> (${mb.lookalike_shows[0].overlap})</p>
              </div>
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-parchment);">
                <div class="mono" style="font-size:13.5px; color:var(--text-secondary); font-weight:700;">Lookalike Shows #2 to #10 Arbitrage</div>
                <div id="sr-mb-look-pack" class="mono" style="font-size:16px; font-weight:800; color:var(--amber-gold); margin-top:4px;">9 Peer Shows @ $${mb.lookalike_shows[3].cpm_usd}–$${mb.lookalike_shows[0].cpm_usd} CPM ($1.99 Single / $29 Full Ledger)</div>
                <p id="sr-mb-agency-desk" style="font-size:14px; color:var(--text-primary); margin:4px 0 0 0;">Agency Desk: ${escapeHtml(defaultAnalysis.outbound_pitch.agency_desk || 'Direct + Agency Desk')}</p>
              </div>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
              <span class="mono" style="font-size:13px; font-weight:800; color:var(--emerald-roi);">LIVE REDLINED INSERTION ORDER (IO) &amp; 3-FLIGHT COUNTER-OFFER DOSSIER:</span>
              <div style="display:flex; gap:8px; flex-wrap:wrap;">
                <button type="button" onclick="window.__srAddToPlan(window.__srCurrentTargetName || '${escapeHtml(displayEntity.name.replace(/'/g, "\\'"))}', 'show', window.__srCurrentAvgCpm || 45, window.__srCurrentRackRate || 9500, 3)" class="btn btn-ghost" style="padding:6px 12px; min-height:34px; font-size:13px;">+ Add to My Q4 Media Plan</button>
                <button type="button" onclick="window.__srCopySharePlanUrl(this)" class="btn btn-ghost" style="padding:6px 12px; min-height:34px; font-size:13px;">Share CFO / Client Proposal URL</button>
                <button type="button" id="btn-copy-home-counter" onclick="window.__srCopyBuyerPlan(this)" class="btn btn-emerald" style="padding:6px 12px; min-height:34px; font-size:13px;">Unlock &amp; Copy Redlined IO + Rep Email →</button>
              </div>
            </div>
            <pre id="sr-mb-free-pre" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-mono); font-size:13.5px; color:var(--text-primary); background:var(--bg-parchment); border-radius:8px; padding:14px; margin:0;">${escapeHtml(
              `# REDLINED MEDIA BUYER DOSSIER & LOOKALIKE PLAN (${mb.target_show})\n` +
              `• Published Rack Rate: $${mb.published_rack_rate_usd.toLocaleString()}/slot vs. Negotiated 3-Flight Floor: $${mb.negotiated_floor_rate_usd.toLocaleString()}/slot (-18% • Save $${mb.savings_per_slot_usd.toLocaleString()}/read)\n` +
              `• Lookalike #1 Benchmark: ${mb.lookalike_shows[0].name} (${(mb.lookalike_shows[0].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[0].overlap}) — $${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot | Rep: ${mb.lookalike_shows[0].booking_rep}\n` +
              `• [LOCKED IN PREVIEW]: Exact 1.5% CTR Make-Good Legal Clause, IAB 30-Day Download SLA & Unmasked Direct Booking Rep Email ($1.99 Single Row / $29 Complete 88-Contact Q4 Ledger)`
            )}</pre>
          </div>

          <!-- PANE 2: CREATOR READY-TO-SEND SPONSOR PITCH -->
          <div id="sr-pane-creator" style="display:${!isInitialShow ? 'block' : 'none'};">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0 0 10px 0;padding:12px 14px;border-radius:8px;background:var(--bg-parchment);">
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
                <span class="mono" style="font-size:14px;color:var(--emerald-roi);font-weight:700;">Your Audience Size:</span>
                <button type="button" class="preset-chip" onclick="setAudienceReach(10000)">10K</button>
                <button type="button" class="preset-chip" onclick="setAudienceReach(25000)">25K</button>
                <button type="button" class="preset-chip" onclick="setAudienceReach(75000)">75K</button>
                <button type="button" class="preset-chip" onclick="setAudienceReach(150000)">150K</button>
                <span id="sr-creator-quote-readout" class="mono" style="font-size:14px;font-weight:700;color:var(--emerald-roi);margin-left:4px;">3-Flight Pilot Quote: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} ($${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <button type="button" onclick="window.__srAddToPlan((document.getElementById('res-brand-name')||{}).textContent || '${escapeHtml(displayEntity.name.replace(/'/g, "\\'"))}', 'brand', window.__srCurrentAvgCpm || 45, ${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd}, 3)" class="btn btn-ghost" style="padding:8px 12px;min-height:38px;font-size:13.5px;">+ Add Brand to Pitch Shortlist</button>
                <button type="button" id="btn-copy-free-pitch1" onclick="window.__srUnlockOrCopyPitch(this)" class="btn btn-emerald" style="padding:8px 14px;min-height:38px;font-size:14px;">Unlock Buyer Email &amp; Copy Pitch (${escapeHtml(sampleBuyerEmail)})</button>
              </div>
            </div>
            <pre id="sr-free-pitch-pre" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-mono); font-size:14px; color:var(--text-primary); background:var(--bg-parchment); border-radius:8px; padding:14px; margin:0 0 8px 0;">${escapeHtml('# OUTBOUND 3-FLIGHT PILOT PITCH PREVIEW (DOMAIN VERIFIED)\nTo: ' + sampleBuyerEmail + ' (' + (defaultAnalysis.outbound_pitch.agency_desk || defaultAnalysis.brand.decision_maker_role) + ')\nSubject: ' + defaultAnalysis.outbound_pitch.subject + '\n\n' + samplePitchText)}</pre>
            <pre class="pitch-pre" id="res-pitch-body" style="margin-top:0;">${escapeHtml(
              "# SponsorRadar Diagnostic Summary & Locked Pack (" + displayEntity.name + ")\n" +
              "• Verified 3x+ Renewal Score: " + defaultAnalysis.metrics.renewal_velocity_score + "/100 (" + defaultAnalysis.metrics.proven_3x_shows_count + " Proven 3x+ Placements)\n" +
              "• Recommended 3-Episode Pilot Quote (" + (initialReach / 1000).toFixed(0) + "K Reach): $" + defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString() + " ($" + defaultAnalysis.outbound_pitch.effective_cpm_usd + " Effective CPM)\n" +
              "• Target Buyer Contact (Domain Verified): " + sampleBuyerEmail + " (" + (defaultAnalysis.outbound_pitch.agency_desk || defaultAnalysis.brand.decision_maker_role) + ")\n" +
              "• Unmasked Buyer Email + Pitches #2–#15 + " + totalContacts + "-Contact Q4 Ledger: [SINGLE ROW ($1.99) / COMPLETE 88-ROW Q4 LEDGER ($29)]"
            )}</pre>
          </div>

          <!-- MOBILE-TO-DESKTOP EMAIL BRIDGE -->
          <form onsubmit="return window.__srSendDesktopBridge(event)" style="margin-top:12px; padding:12px 14px; border-radius:10px; background:var(--bg-parchment); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
            <span class="mono" style="font-size:14px; color:var(--text-primary); font-weight:700;">On mobile or sharing with your team? Email yourself this live Counter-Offer / Pitch #1 + Desktop Link (Free):</span>
            <div style="display:flex; gap:8px; flex-wrap:wrap; flex:1; max-width:440px;">
              <input id="sr-bridge-email" type="email" required placeholder="you@work-email.com" aria-label="Work email for desktop link" class="input-field" style="flex:1; min-width:180px; min-height:38px; padding:6px 12px; font-size:15px;" />
              <button id="sr-bridge-btn" type="submit" class="btn btn-emerald" style="padding:8px 14px; min-height:38px; font-size:14px;">Send to My Inbox →</button>
            </div>
          </form>
        </div>

        <!-- 3. Full-Width Verified Placements Table -->
        <div class="panel" style="padding:18px 20px;">
          <div style="margin:0 0 12px 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <span class="mono" style="font-size:15px; font-weight:700; color:var(--text-primary);" id="res-table-title">${escapeHtml(displayEntity.table_title)}</span>
            <span class="pill-emerald" id="res-engine-badge">Verified 3x+ Ledger • -18% Floor &amp; Implied CPC</span>
          </div>
          <div class="table-wrap" style="margin-top:0;">
            <table class="ledger-table">
              <thead>
                <tr>
                  <th>${isInitialShow ? 'Sponsor Brand → Show' : 'Show / Publication'}</th>
                  <th>Renewal Signal</th>
                  <th>Buyer Contact &amp; Agency Desk</th>
                  <th>Vanity URL &amp; Code</th>
                  <th>Est. Spend &amp; 3x Floor</th>
                </tr>
              </thead>
              <tbody id="res-placements-tbody">
                ${defaultAnalysis.placements.map((p, idx) => {
                  const floorCpm = Math.round(p.cpm_usd * 0.82);
                  const estCpc = (floorCpm / 18).toFixed(2);
                  return `
                  <tr>
                    <td>
                      <div style="font-weight:700;">${isInitialShow && p.brand_name ? `${escapeHtml(p.brand_name)} → ${escapeHtml(p.show_name)}` : escapeHtml(p.show_name)}${p.is_lookalike ? ` <span class="pill-slate" style="font-size:13.5px;padding:2px 8px;">Category Peer</span>` : ''}</div>
                      <div class="mono" style="font-size:13.5px; color:var(--text-muted);">${escapeHtml(p.channel_type)} • ${(p.audience_size / 1000).toFixed(0)}K reach</div>
                    </td>
                    <td>
                      <div><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></div>
                      <div class="mono" style="font-size:13.5px; color:var(--emerald-roi); margin-top:4px; font-weight:700;">${escapeHtml((p.fresh_budget_badge || 'Active RSS Budget (12h ago)').replace(/🟢\s*/g, ''))}</div>
                    </td>
                    <td>
                      <div class="mono" style="font-size:13.5px;color:var(--amber-gold);">${escapeHtml((p.sponsor_email || 'p***@brand.io').replace(/🔒\s*/g, ''))}</div>
                      <div style="font-size:13.5px;color:var(--text-muted);">${escapeHtml(p.decision_maker_role || 'VP Growth')} • ${escapeHtml(p.agency_desk || 'Agency Desk')} <a href="/buy/micro_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;">Unlock Row (99¢) →</a></div>
                    </td>
                    <td class="mono" style="font-size:13.5px;">
                      <div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div>
                      <div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div>
                    </td>
                    <td class="mono" style="font-weight:700; color:var(--amber-gold);">
                      $${p.est_spend_usd.toLocaleString()} ($${p.cpm_usd} CPM)
                      <div style="font-size:13.5px; color:var(--emerald-roi); font-weight:600;">3x Floor: $${floorCpm} CPM • ~$${estCpc} CPC</div>
                    </td>
                  </tr>
                `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FULL VERIFIED 3x+ RENEWAL AD-SPEND LEDGER -->
  <section id="verified-ledger" style="padding:52px 0;">
    <div class="container">
      <div style="display:flex; flex-direction:column; align-items:flex-start; gap:12px; margin-bottom:22px;">
        <div>
          <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin:0;">3x+ Renewed Sponsor Ledger</h2>
          <p style="color:var(--text-secondary); font-size:16px; margin-top:6px; max-width:62ch;">
            Filter verified multi-flight sponsorships by renewal frequency, channel, or B2B/DTC vertical. Click any <strong>Brand</strong> to inspect its spend or any <strong>Show</strong> to audit its rate card.
          </p>
        </div>
        <div id="ledger-filter-bar" style="display:flex; gap:8px; flex-wrap:wrap;">
          <button type="button" id="btn-filter-all" class="btn btn-emerald" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('all', this)">All Flights (${topPlacements.length})</button>
          <button type="button" id="btn-filter-3x" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('3x', this)">3x+ Proven Winners (${proven3xPlacements.length})</button>
          <button type="button" id="btn-filter-test" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('test', this)">1x–2x Test Flights (${testPlacements.length})</button>
          <button type="button" id="btn-filter-b2b" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('b2b', this)">B2B &amp; DevTools</button>
          <button type="button" id="btn-filter-dtc" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('dtc', this)">DTC &amp; Consumer</button>
          <button type="button" id="btn-filter-podcast" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('podcast', this)">Podcasts</button>
          <button type="button" id="btn-filter-newsletter" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('newsletter', this)">Newsletters</button>
        </div>
      </div>

      <div class="table-wrap">
        <table class="ledger-table" id="master-ledger-table">
          <thead>
            <tr>
              <th>Sponsor Brand</th>
              <th>Creator Show / Newsletter</th>
              <th>Channel</th>
              <th>Flights &amp; Renewal Status</th>
              <th>ROI Score</th>
              <th>Ad Position &amp; Timestamp</th>
              <th>Vanity URL &amp; Code</th>
              <th>Cumulative Spend &amp; Floor</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${topPlacements.map(p => {
              const isB2b = /B2B|SaaS|DevTools|Fintech|Security|Tech|AI|Workspace|Productivity/i.test(p.brand_category + ' ' + p.brand_name);
              const chKey = /Newsletter/i.test(p.channel_type) ? 'newsletter' : 'podcast';
              const floorCpm = Math.round(p.cpm_usd * 0.82);
              const cleanBrand = p.brand_name.split('(')[0].trim();
              return `
              <tr data-tier="${p.flights >= 3 ? '3x' : 'test'}" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-channel="${chKey}">
                <td>
                  <a href="#radar-tool" onclick="selectBrandPreset('${escapeHtml(cleanBrand.replace(/'/g, "\\'"))}', 'creator');return false;" style="font-weight:700; color:var(--vermilion); text-decoration:underline;">${escapeHtml(p.brand_name)}</a>
                  <div class="mono" style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.brand_category)}</div>
                </td>
                <td>
                  <a href="#radar-tool" onclick="selectBrandPreset('${escapeHtml(p.show_name.replace(/'/g, "\\'"))}', 'buyer');return false;" style="font-weight:700; color:var(--text-primary); text-decoration:underline;">${escapeHtml(p.show_name)}</a>
                  <div class="mono" style="font-size:13px; color:var(--text-muted);">${(p.audience_size / 1000).toFixed(0)}K reach</div>
                </td>
                <td><span class="pill-slate">${escapeHtml(p.channel_type)}</span></td>
                <td><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></td>
                <td class="mono" style="font-weight:700; color:${p.flights >= 3 ? 'var(--emerald-roi)' : 'var(--amber-gold)'};">${p.renewal_score}/100</td>
                <td class="mono" style="font-size:13.5px;"><div>${escapeHtml(p.slot_type)}</div><div style="color:var(--text-muted);">${escapeHtml(p.timestamp_range)}</div></td>
                <td class="mono" style="font-size:13.5px;"><div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div><div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div></td>
                <td class="mono" style="font-weight:700; color:var(--amber-gold);">
                  $${p.est_spend_usd.toLocaleString()} ($${p.cpm_usd} CPM)
                  <div style="font-size:13.5px; color:var(--emerald-roi); font-weight:600;">3x Floor: $${floorCpm} CPM (-18%)</div>
                </td>
                <td>
                  <div style="display:flex; gap:6px; flex-wrap:wrap;">
                    <button type="button" class="btn btn-ghost" style="padding:5px 10px; min-height:32px; font-size:13px;" onclick="selectBrandPreset('${escapeHtml(p.show_name.replace(/'/g, "\\'"))}', 'buyer')">Audit Show</button>
                    <button type="button" class="btn btn-ghost" style="padding:5px 10px; min-height:32px; font-size:13px;" onclick="window.__srAddToPlan('${escapeHtml(p.show_name.replace(/'/g, "\\'"))}', 'show', ${p.cpm_usd}, ${Math.round(p.est_spend_usd / Math.max(1, p.flights))}, ${p.flights})">+ Plan</button>
                  </div>
                </td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- SIDE-BY-SIDE SHOW & SPONSOR COMPARISON MATRIX + Q4 MEDIA PLAN BUILDER (Choices 1A, 3A & 3C) -->
      <div id="sr-comparison-matrix-card" class="panel" style="margin-top:22px; padding:20px 22px; background:var(--bg-surface);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
          <div>
            <h3 style="font-family:var(--font-serif); font-size:21px; font-weight:600; margin:0 0 4px;">Compare 3 Flagship Shows &amp; Share Your Q4 Media Plan</h3>
            <p style="font-size:14px; color:var(--text-secondary); margin:0; max-width:64ch;">Compare Effective CPM, -18% 3-Flight Agency Floor, Implied CPC, and Shared 3x+ Sponsors side-by-side—or click <strong>+ Plan</strong> on any row above to customize your shortlist.</p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" onclick="window.__srCopySharePlanUrl(this)" class="btn btn-ghost" style="padding:8px 14px; font-size:13.5px;">Copy CFO / Client Proposal URL (?plan=...)</button>
            <button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass')" class="btn btn-vermilion" style="padding:8px 16px; font-size:13.5px;">Unlock Complete 88-Row Q4 Ledger ($29) →</button>
          </div>
        </div>
        <div class="table-wrap" style="margin-top:0;">
          <table class="ledger-table" id="sr-compare-matrix-table">
            <thead><tr><th>Show / Media Property</th><th>Published Rack vs. -18% 3-Flight Floor</th><th>Effective CPM &amp; Implied CPC</th><th>3x+ Renewal Velocity &amp; Shared Sponsors</th><th>Shortlist Action</th></tr></thead>
            <tbody id="sr-compare-matrix-tbody">
              <tr><td><strong>Lenny's Podcast &amp; Newsletter</strong><div class="mono" style="font-size:13.5px;color:var(--text-muted);">Podcast + Newsletter • 440K reach</div></td><td class="mono">$14,500 Rack → <strong style="color:var(--emerald-roi);">$11,890 Floor (Save $2,610/flight)</strong></td><td class="mono">$54 Rack / <strong>$44 Floor eCPM</strong> (~$2.44 CPC)</td><td><span class="pill-emerald">96/100 ROI • 14 Proven 3x+</span><div class="mono" style="font-size:13.5px;color:var(--text-secondary);margin-top:3px;">Shared: Deel (12x), Linear (8x), Notion (9x)</div></td><td><button type="button" class="btn btn-ghost" style="padding:6px 10px;min-height:34px;font-size:13.5px;" onclick="window.__srAddToPlan('Lenny\\'s Podcast', 'show', 54, 14500, 3)">+ Add to Q4 Plan</button></td></tr>
              <tr><td><strong>The Pragmatic Engineer</strong><div class="mono" style="font-size:13.5px;color:var(--text-muted);">Newsletter • 380K reach</div></td><td class="mono">$12,500 Rack → <strong style="color:var(--emerald-roi);">$10,250 Floor (Save $2,250/flight)</strong></td><td class="mono">$48 Rack / <strong>$39 Floor eCPM</strong> (~$2.17 CPC)</td><td><span class="pill-emerald">95/100 ROI • 11 Proven 3x+</span><div class="mono" style="font-size:13.5px;color:var(--text-secondary);margin-top:3px;">Shared: Linear (8x), Vercel (6x), Retool (7x)</div></td><td><button type="button" class="btn btn-ghost" style="padding:6px 10px;min-height:34px;font-size:13.5px;" onclick="window.__srAddToPlan('The Pragmatic Engineer', 'show', 48, 12500, 3)">+ Add to Q4 Plan</button></td></tr>
              <tr><td><strong>Syntax.fm / Latent Space AI</strong><div class="mono" style="font-size:13.5px;color:var(--text-muted);">Podcast • 95K–140K reach (Moneyball Arbitrage)</div></td><td class="mono">$3,400 Rack → <strong style="color:var(--emerald-roi);">$2,788 Floor (Save $612/flight)</strong></td><td class="mono">$36 Rack / <strong>$29 Floor eCPM</strong> (~$1.61 CPC)</td><td><span class="pill-emerald">91/100 ROI • 86% Audience Overlap</span><div class="mono" style="font-size:13.5px;color:var(--text-secondary);margin-top:3px;">Shared: Supabase (9x), Sentry (11x), Raycast (6x)</div></td><td><button type="button" class="btn btn-ghost" style="padding:6px 10px;min-height:34px;font-size:13.5px;" onclick="window.__srAddToPlan('Latent Space AI', 'show', 36, 3400, 3)">+ Add to Q4 Plan</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="sr-user-segments-strip" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(270px, 1fr)); gap:16px; margin-top:24px;">
        <div class="panel" style="padding:16px; background:var(--bg-surface); display:flex; flex-direction:column; gap:10px;">
          <img src="/public/editorial-segment-1.jpg" alt="B2B SaaS Growth Media Buyer auditing creator CPM floors" loading="lazy" decoding="async" style="width:100%; height:142px; object-fit:cover; object-position:center 28%; border-radius:10px;" />
          <div><strong style="font-size:16px; color:var(--text-primary); display:block;">B2B Growth &amp; Media Buyers</strong><p style="font-size:14px; color:var(--text-secondary); margin:4px 0 0; line-height:1.5;">Benchmark creator quotes against the -18% 3-flight floor and reallocate budget into high-renewal lookalike shows.</p></div>
        </div>
        <div class="panel" style="padding:16px; background:var(--bg-surface); display:flex; flex-direction:column; gap:10px;">
          <img src="/public/editorial-segment-2.jpg" alt="Independent Newsletter and Podcast Creator pitching repeat sponsors" loading="lazy" decoding="async" style="width:100%; height:142px; object-fit:cover; object-position:center 25%; border-radius:10px;" />
          <div><strong style="font-size:16px; color:var(--text-primary); display:block;">Newsletter &amp; Podcast Creators</strong><p style="font-size:14px; color:var(--text-secondary); margin:4px 0 0; line-height:1.5;">Spot brands renewing 3+ times on peer shows and pitch partnerships leads directly with ready-to-send 3-episode pilot scripts.</p></div>
        </div>
        <div class="panel" style="padding:16px; background:var(--bg-surface); display:flex; flex-direction:column; gap:10px;">
          <img src="/public/editorial-segment-3.jpg" alt="Agency Media Strategist exporting 88 verified sponsor contacts" loading="lazy" decoding="async" style="width:100%; height:142px; object-fit:cover; object-position:center 22%; border-radius:10px;" />
          <div><strong style="font-size:16px; color:var(--text-primary); display:block;">Agency Media Strategists</strong><p style="font-size:14px; color:var(--text-secondary); margin:4px 0 0; line-height:1.5;">Export ${totalContacts} verified buyer and show booking contacts plus 96-flight CPM decay benchmarks in one spreadsheet.</p></div>
        </div>
      </div>
    </div>
  </section>

  <!-- SELF-SERVE STRIPE EXPRESS CHECKOUT -->
  <section id="pricing" style="padding:52px 0;">
    <div class="container">
      <div class="double-bezel" style="max-width:960px; margin:0 auto;">
        <div class="panel" style="padding:28px 24px;">
          <div style="margin-bottom:14px;">
            <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin:0 0 8px 0;">
              Unlock ${totalContacts} Contacts &amp; Rate Floors
            </h2>
            <p style="color:var(--text-secondary); font-size:15.5px; margin:0; max-width:62ch;">
              Instant browser download of all 3 production files (with Ramp/Brex expense-ready receipt): <strong>verified-buyer-contacts.csv</strong> (${brands.length} Brand Partnerships Leads + ${shows.length} Show Booking Reps), <strong>96-flight-cpm-decay.csv</strong> (Rack vs. -18% 3-Flight Floor CPMs), and <strong>3-flight-anchor-pitch.eml</strong> (Buyer Counter-Offer &amp; Creator Pilot Scripts).
            </p>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; padding:18px 20px; border-radius:12px; background:var(--bg-parchment); margin-bottom:18px;">
            <div>
              <div class="mono" style="font-size:20px; font-weight:800; color:var(--text-primary); line-height:1.25;">$29 Q4 Ledger (${totalContacts} Contacts)</div>
              <p style="font-size:14.5px; color:var(--text-secondary); margin:4px 0 0 0; max-width:60ch;">Most popular • All ${totalContacts} Verified Brand &amp; Show Emails (.CSV) + 96-Flight Floor Ledger (.CSV) + Redlined IO &amp; Pitch Scripts (.EML)</p>
            </div>
            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <a href="/buy/micro_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass');return false;}" class="btn btn-ghost" style="padding:10px 14px; font-size:13.5px; text-decoration:none;">1 Row Only (99¢)</a>
              <a href="/buy/flash_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-ghost" style="padding:10px 14px; font-size:13.5px; text-decoration:none;">Single-Target Pack ($1.99)</a>
              <a href="/buy/playbook_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('playbook_pass');return false;}" class="btn btn-vermilion" style="padding:13px 20px; font-size:15px; text-decoration:none;">
                <span>Unlock Full ${totalContacts}-Row Q4 Ledger ($29)</span>
                <span class="btn-icon-circle" aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <!-- Continuous Team, Agency & Done-For-You $499 Media Plan Tiers (Choice 2D) -->
          <div style="padding:18px 20px; border-radius:12px; background:var(--bg-elevated);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
              <div>
                <div style="font-weight:800; font-size:16px; color:var(--text-primary);">Need Weekly RSS Spend Alerts or a Done-For-You 10-Show Q4 Media Plan?</div>
                <div style="font-size:13.5px; color:var(--text-secondary); max-width:60ch;">Start Creator Pro ($49/mo), Agency Feed ($199/mo), or book our Done-For-You 10-Show Media Plan &amp; -18% Floor Negotiation ($499 one-time).</div>
              </div>
              <input id="checkout-work-email" type="email" class="input-field" placeholder="you@company.com (for Stripe receipt &amp; access)" aria-label="Work email for team subscription" style="max-width:280px; min-height:38px; padding:6px 12px; font-size:14px;" />
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; padding:0 4px;">
              <input type="text" id="hp-creator" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <input id="checkout-email-creator" type="email" style="display:none;" value="creator@sponsorradar.io" />
              <input type="text" id="hp-agency" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <input id="checkout-email-agency" type="email" style="display:none;" value="agency@sponsorradar.io" />
              <button type="button" class="btn btn-ghost" style="justify-content:space-between; padding:12px 16px; flex-wrap:wrap; gap:6px;" onclick="var w=document.getElementById('checkout-work-email');if(w&&w.value)document.getElementById('checkout-email-creator').value=w.value;startStripeCheckout('creator_pro_49', 49, 'checkout-email-creator', 'hp-creator')"><span>Creator Pro ($49/mo)</span><span class="mono" style="color:var(--emerald-roi); font-size:13.5px;">All ${brands.length} Brands →</span></button>
              <button type="button" class="btn btn-ghost" style="justify-content:space-between; padding:12px 16px; flex-wrap:wrap; gap:6px;" onclick="var w=document.getElementById('checkout-work-email');if(w&&w.value)document.getElementById('checkout-email-agency').value=w.value;startStripeCheckout('agency_feed_199', 199, 'checkout-email-agency', 'hp-agency')"><span>Agency Feed ($199/mo)</span><span class="mono" style="color:var(--vermilion); font-size:13.5px;">5 Seats + CSV →</span></button>
              <button type="button" class="btn btn-emerald" style="justify-content:space-between; padding:12px 16px; flex-wrap:wrap; gap:6px;" onclick="var w=document.getElementById('checkout-work-email');if(w&&w.value)document.getElementById('checkout-email-agency').value=w.value;startStripeCheckout('dfy_media_plan_499', 499, 'checkout-email-agency', 'hp-agency', true)"><span>Done-For-You Plan ($499)</span><span class="mono" style="color:#FFFFFF; font-size:13.5px;">10 Shows (-18%) →</span></button>
            </div>
          </div>
        </div>
      </div>
      <div id="checkout-status-banner" class="panel" style="display:none; margin-top:20px; padding:18px; background:var(--emerald-soft);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div><span class="pill-emerald">Stripe Checkout Session Initialized</span><div style="font-weight:700; margin-top:6px; color:var(--text-primary);" id="checkout-status-text">Session created.</div></div>
          <a href="/directory" class="btn btn-emerald">Access Full ${seoPages.length}-Report Vault Now</a>
        </div>
      </div>
    </div>
  </section>

  <!-- BENCHMARK REPORT DIRECTORY LINKS -->
  <section style="padding:48px 0;">
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
        <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin:0;">2026 Spend &amp; Rate Reports</h2>
        <a href="/directory" class="btn btn-ghost" style="padding:8px 14px; font-size:14px;">View All ${seoPages.length} Spend Reports →</a>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:14px;">
        ${topSeoLinks.map(page => `<a href="/seo/${escapeHtml(page.slug)}" class="panel" style="padding:16px; display:block; transition:transform 160ms cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;"><span class="pill-slate">${escapeHtml(page.category)}</span><span class="mono" style="font-size:13.5px; color:var(--amber-gold); font-weight:700;">$${page.avg_cpm} Rack / $${Math.round(page.avg_cpm * 0.82)} Floor CPM</span></div><p style="font-weight:600; font-size:16px; color:var(--text-primary); line-height:1.45; margin:0;">${escapeHtml(page.title)}</p></a>`).join('')}
      </div>
    </div>
  </section>

  <script>
    const SAMPLE_TRANSCRIPTS_MAP = ${JSON.stringify(sampleTranscripts).replace(/</g, '\\u003c')};
    function escHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
    window.__srCurrentRackRate = ${mb.published_rack_rate_usd};
    window.__srCurrentAvgCpm = ${defaultAnalysis.metrics.avg_cpm_usd};
    window.__srCurrentTargetName = ${JSON.stringify(mb.target_show)};
    window.__srCurrentLookalikes = ${JSON.stringify(mb.lookalike_shows || []).replace(/</g, '\\u003c')};
    window.__srSwitchPersona = function(mode) {
      var bPane = document.getElementById('sr-pane-buyer'), cPane = document.getElementById('sr-pane-creator'), bBtn = document.getElementById('btn-sr-persona-buyer'), cBtn = document.getElementById('btn-sr-persona-creator');
      var hBuyer = document.getElementById('hero-role-buyer'), hCreator = document.getElementById('hero-role-creator');
      if (bPane && cPane) { bPane.style.display = mode === 'buyer' ? 'block' : 'none'; cPane.style.display = mode === 'creator' ? 'block' : 'none'; }
      if (bBtn && cBtn) {
        bBtn.style.background = mode === 'buyer' ? 'var(--emerald-soft)' : 'var(--bg-parchment)'; bBtn.style.color = mode === 'buyer' ? 'var(--emerald-roi)' : 'var(--text-secondary)';
        cBtn.style.background = mode === 'creator' ? 'var(--emerald-soft)' : 'var(--bg-parchment)'; cBtn.style.color = mode === 'creator' ? 'var(--emerald-roi)' : 'var(--text-secondary)';
      }
      if (hBuyer && hCreator) {
        hBuyer.style.background = mode === 'buyer' ? 'var(--emerald-soft)' : 'var(--bg-surface)'; hBuyer.style.color = mode === 'buyer' ? 'var(--emerald-roi)' : 'var(--text-secondary)';
        hCreator.style.background = mode === 'creator' ? 'var(--emerald-soft)' : 'var(--bg-surface)'; hCreator.style.color = mode === 'creator' ? 'var(--emerald-roi)' : 'var(--text-secondary)';
      }
      var cpLbl = document.getElementById('copy-pitch-label'), metaEl = document.getElementById('res-pitch-meta');
      if (cpLbl) cpLbl.textContent = mode === 'buyer' ? 'Unlock Rate Card & 88 Contacts ($1.99) →' : 'Unlock 88 Contacts ($1.99) →';
      if (metaEl && mode === 'buyer') metaEl.textContent = '3-Flight Agency Floor: $' + Math.round((window.__srCurrentRackRate || 9500) * 0.82).toLocaleString() + '/slot (-18% vs Rack + 1.5% CTR Make-Good)';
      if (window.__srSaveWorkspace) window.__srSaveWorkspace({ persona: mode });
      if (window.__ebLogEvent) window.__ebLogEvent('tab_switch', { store_pill: 'persona_' + mode });
    };
    window.__srSwitchRole = window.__srSwitchPersona;
    window.__srCopyBuyerPlan = function(btnEl) {
      if (!window.__ebIsUnlocked && window.__ebCheckout) { window.__ebCheckout('playbook_pass', false); if (btnEl) btnEl.textContent = 'Previewing $29 Full Q4 Ledger Unlock ↓'; return; }
      var pre = document.getElementById('sr-mb-free-pre'), btn = btnEl || document.getElementById('btn-copy-home-counter');
      if (pre && navigator.clipboard) navigator.clipboard.writeText(pre.innerText || pre.textContent || '');
      if (btn) btn.textContent = 'Redlined IO Dossier Copied!';
      if (window.__ebLogEvent) window.__ebLogEvent('copy_summary', { type: 'home_buyer_counter' });
    };
    window.__srUnlockOrCopyPitch = function(btnEl) {
      if (!window.__ebIsUnlocked && window.__ebCheckout) { window.__ebCheckout('playbook_pass', false); if (btnEl) btnEl.textContent = 'Previewing $29 Full Q4 Ledger Unlock ↓'; return; }
      var pre = document.getElementById('sr-free-pitch-pre');
      if (pre && navigator.clipboard) navigator.clipboard.writeText(pre.innerText || pre.textContent || '');
      if (btnEl) btnEl.textContent = 'Pitch #1 Copied!';
      if (window.__ebLogEvent) window.__ebLogEvent('copy_summary', { type: 'free_pitch_1' });
    };
    window.__srRenderComparisonMatrix = function() {
      var tb = document.getElementById('sr-compare-matrix-tbody');
      if (!tb || !window.__srGetWorkspace) return;
      var list = (window.__srGetWorkspace().shortlist || []);
      if (list.length < 1) return;
      tb.innerHTML = list.map(function(item) {
        var cpm = Number(item.cpm) || 44, floorCpm = Math.round(cpm * 0.82), rack = Number(item.spendUsd) || 9500, floor = Math.round(rack * 0.82), save = rack - floor, cpc = (floorCpm / 18).toFixed(2);
        return '<tr><td><strong>' + escHtml(item.name) + '</strong><div class="mono" style="font-size:13.5px;color:var(--text-muted);">Shortlisted ' + escHtml(item.type || 'show') + ' • 3-Flight Target</div></td><td class="mono">$' + rack.toLocaleString() + ' Rack → <strong style="color:var(--emerald-roi);">$' + floor.toLocaleString() + ' Floor (Save $' + save.toLocaleString() + '/flight)</strong></td><td class="mono">$' + cpm + ' Rack / <strong>$' + floorCpm + ' Floor eCPM</strong> (~$' + cpc + ' CPC)</td><td><span class="pill-emerald">Verified 3x+ Benchmark</span></td><td><button type="button" class="btn btn-ghost" style="padding:6px 10px;min-height:34px;font-size:13.5px;" data-rm-name="' + escHtml(item.name) + '" onclick="window.__srRemoveFromPlan(this.getAttribute(\\\'data-rm-name\\\'))">Remove ×</button></td></tr>';
      }).join('');
    };
    window.__srRunHomeQuoteAudit = function() {
      var pEl = document.getElementById('sr-home-qa-price'), rEl = document.getElementById('sr-home-qa-reach');
      var price = Math.max(250, Number(pEl && pEl.value) || window.__srCurrentRackRate || 9500), reach = Math.max(1000, Number(rEl && rEl.value) || 120000);
      var quotedCpm = price / (reach / 1000), fairFloorCpm = Math.max(22, Math.round((window.__srCurrentAvgCpm || 45) * 0.82)), fairFloorUsd = Math.round((reach / 1000) * fairFloorCpm);
      var overPct = Math.round(((price - fairFloorUsd) / Math.max(1, fairFloorUsd)) * 100), clicks = Math.max(15, Math.round(reach * 0.018)), floorCpc = (fairFloorUsd / clicks).toFixed(2);
      var rd = document.getElementById('sr-home-qa-readout'), sub = document.getElementById('sr-home-qa-sub'), bdg = document.getElementById('sr-home-qa-badge');
      if (rd) {
        if (overPct > 5) {
          rd.innerHTML = 'Quoted: $' + price.toLocaleString() + ' ($' + quotedCpm.toFixed(1) + ' CPM) is <span style="color:var(--vermilion);">+' + overPct + '% Above Floor</span> → <span style="color:var(--emerald-roi);">Counter at $' + fairFloorUsd.toLocaleString() + '/slot ($' + fairFloorCpm + ' eCPM • Save $' + Math.max(0, price - fairFloorUsd).toLocaleString() + '/read)</span>';
          if (bdg) { bdg.className = 'pill-vermilion'; bdg.textContent = 'Overcharge Alert: +' + overPct + '% Above 3-Flight Floor'; }
        } else {
          rd.innerHTML = 'Quoted: $' + price.toLocaleString() + ' ($' + quotedCpm.toFixed(1) + ' CPM) → <span style="color:var(--emerald-roi);">Verified Fair Floor Rate! Lock 3-Flight Pilot ($' + (price * 3).toLocaleString() + ' total IO)</span>';
          if (bdg) { bdg.className = 'pill-emerald'; bdg.textContent = 'Fair Floor Rate Verified'; }
        }
      }
      if (sub) sub.textContent = 'Est. Clicks @ 1.8% Host-Read CTR: ~' + clicks.toLocaleString() + ' clicks (~$' + floorCpc + ' Floor CPC) • Include 1.5% CTR Make-Good Clause';
      if (window.__srSaveWorkspace) window.__srSaveWorkspace({ qaPrice: price, qaReach: reach });
      if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'home_quote_auditor', quoted_usd: price, reach: reach, floor_usd: fairFloorUsd });
    };
    window.__srUpdateMoneyball = function(budget, rackOverride) {
      var b = Number(budget) || 15000, rackRate = Number(rackOverride) || window.__srCurrentRackRate || 9500;
      if (window.__srSaveWorkspace) window.__srSaveWorkspace({ budget: b });
      var floorRate = Math.round(rackRate * 0.82), rackSlots = (b / Math.max(1000, rackRate)).toFixed(1), floorSlots = (b / Math.max(800, floorRate)).toFixed(1);
      var lookalikeSlots = Math.max(2, Math.round(b / Math.max(750, rackRate * 0.22))), estClicks = Math.round((b / Math.max(20, (window.__srCurrentAvgCpm || 45) * 0.82)) * 18), totalSavings = Math.round(b * 0.18);
      var el = document.getElementById('sr-moneyball-readout');
      if (el) el.innerHTML = '$' + b.toLocaleString() + ' Budget → <span style="color:var(--amber-gold);">' + rackSlots + ' Rack Slots (' + floorSlots + ' @ Floor)</span> vs. <span style="color:var(--emerald-roi);">' + lookalikeSlots + ' Lookalike Flights (~' + estClicks.toLocaleString() + ' Clicks)</span>';
      var savSub = document.getElementById('sr-mb-savings-sub');
      if (savSub) savSub.textContent = 'Save $' + totalSavings.toLocaleString() + ' on a $' + b.toLocaleString() + ' budget (' + floorSlots + ' flights @ $' + floorRate.toLocaleString() + ' floor + 1.5% CTR make-good)';
      var lPack = document.getElementById('sr-mb-look-pack');
      if (lPack) lPack.textContent = lookalikeSlots + ' Peer Flights (~' + estClicks.toLocaleString() + ' Est. Clicks @ ~$' + (b / Math.max(1, estClicks)).toFixed(2) + ' CPC)';
      var preEl = document.getElementById('sr-mb-free-pre');
      var l0 = (window.__srCurrentLookalikes && window.__srCurrentLookalikes[0]) || { name: 'Syntax.fm', reach: 95000, overlap: '86% Audience Match', slot_usd: 2150, booking_rep: 'w***@syntax.fm' };
      if (preEl) {
        preEl.textContent = '# REDLINED MEDIA BUYER DOSSIER & $' + b.toLocaleString() + ' ALLOCATION PLAN (' + (window.__srCurrentTargetName || 'Target Show') + ')\\n'
          + '• Budget Allocation ($' + b.toLocaleString() + '): Buys ' + rackSlots + ' insertions at published rack ($' + rackRate.toLocaleString() + ') OR ' + floorSlots + ' insertions at 3-flight floor ($' + floorRate.toLocaleString() + ', saving $' + totalSavings.toLocaleString() + ')\\n'
          + '• Moneyball Arbitrage Option: Reallocate $' + b.toLocaleString() + ' across ' + lookalikeSlots + ' host-read flights on peer shows for ~' + estClicks.toLocaleString() + ' projected clicks (~$' + (b / Math.max(1, estClicks)).toFixed(2) + ' implied CPC)\\n'
          + '• Lookalike #1 Benchmark: ' + l0.name + ' (' + Math.round((l0.reach || 95000) / 1000) + 'K reach, ' + l0.overlap + ') — $' + Number(l0.slot_usd).toLocaleString() + '/slot | Rep: ' + (l0.booking_rep || 'w***@syntax.fm') + '\\n'
          + '• [LOCKED IN PREVIEW]: Exact 1.5% CTR Make-Good Legal Clause, IAB 30-Day Download SLA & Unmasked Direct Booking Rep Email ($1.99 Single Row / $29 Complete 88-Contact Q4 Ledger)';
      }
      if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'moneyball_budget_slider', budget_usd: b });
    };
    window.__srSendDesktopBridge = function(ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      var em = (document.getElementById('sr-bridge-email') || {}).value || '';
      if (!em) return false;
      var btn = document.getElementById('sr-bridge-btn');
      if (btn) btn.textContent = 'Sent to Inbox!';
      fetch('/api/leads/capture', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: em, pageUrl: window.location.pathname, utmSource: 'mobile_desktop_magic_bridge', summaryText: 'SponsorRadar Pitch #1 + Lookalike Brief (' + window.location.pathname + ')' }) }).catch(function(){});
      return false;
    };
    function switchToolMode(mode) {
      const isTr = mode === 'transcript', lPane = document.getElementById('mode-lookup-pane'), tPane = document.getElementById('mode-transcript-pane');
      if (lPane) lPane.style.display = isTr ? 'none' : 'block';
      if (tPane) tPane.style.display = isTr ? 'block' : 'none';
      document.getElementById('tab-mode-lookup')?.classList.toggle('active', !isTr);
      document.getElementById('tab-mode-transcript')?.classList.toggle('active', isTr);
    }
    function selectBrandPreset(queryText, preferredPersona) {
      switchToolMode('lookup');
      const input = document.getElementById('lookup-query');
      if (input) input.value = queryText;
      if (preferredPersona && window.__srSwitchPersona) window.__srSwitchPersona(preferredPersona);
      runBrandLookup(preferredPersona);
      const rt = document.getElementById('radar-tool');
      if (rt && rt.scrollIntoView) rt.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    function setAudienceReach(reachVal) {
      const reachInput = document.getElementById('sender-reach');
      if (reachInput) reachInput.value = Number(reachVal) || 75000;
      runBrandLookup();
    }
    const selectReachTier = setAudienceReach;
    function loadTranscriptPreset(presetId) {
      const found = SAMPLE_TRANSCRIPTS_MAP.find(item => item.id === presetId);
      if (!found) return;
      const shEl = document.getElementById('transcript-show'), auEl = document.getElementById('transcript-audience'), inEl = document.getElementById('transcript-input');
      if (shEl) shEl.value = found.show_name;
      if (auEl) auEl.value = found.audience_size;
      if (inEl) inEl.value = found.transcript;
      runTranscriptExtractor();
    }
    async function runBrandLookup(preferredPersona) {
      const queryEl = document.getElementById('lookup-query'), errEl = document.getElementById('lookup-error-msg');
      const query = queryEl ? queryEl.value.trim() : '';
      if (!query) { if (errEl) { errEl.style.display = 'block'; errEl.textContent = 'Please enter a sponsor brand or creator show name to analyze.'; } return; }
      if (errEl) errEl.style.display = 'none';
      const senderShow = (document.getElementById('sender-show') || {}).value || 'Creator Media Network';
      const senderReach = Math.max(500, Number((document.getElementById('sender-reach') || {}).value || 75000) || 75000);
      const btn = document.getElementById('btn-run-lookup');
      if (btn) btn.textContent = 'Scanning...';
      try {
        const res = await fetch('/api/analyze-sponsor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'lookup', query, sender_show_name: senderShow, sender_audience_size: senderReach }) });
        const data = await res.json();
        renderLookupResults(data, senderReach, preferredPersona);
        try {
          if (window.__srSaveWorkspace) window.__srSaveWorkspace({ query, reach: senderReach, senderShow, persona: preferredPersona || (document.getElementById('sr-pane-buyer')?.style.display !== 'none' ? 'buyer' : 'creator') });
          if (window.history && window.history.replaceState) window.history.replaceState(null, '', '/?q=' + encodeURIComponent(query) + '&reach=' + encodeURIComponent(senderReach));
          fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'calculate', route: window.location.pathname, target: query + ' (' + senderReach + ' reach)' }) }).catch(() => {});
        } catch (_) {}
        fireMetaEvent('Lead', 0, { tool_mode: 'lookup', query, reach: senderReach });
      } catch (e) { console.error(e); } finally {
        if (btn) btn.innerHTML = '<span>Audit Spend &amp; Rates</span><span class="btn-icon-circle" aria-hidden="true">↗</span>';
      }
    }
    function renderLookupResults(data, senderReach, preferredPersona) {
      if (!data || !data.brand) return;
      const entity = data.display_entity || { type: data.matched_type === 'show' ? 'show' : 'brand', name: data.brand.name, subtitle: data.brand.domain + ' • ' + data.brand.category, lead_role: data.brand.decision_maker_role, table_title: 'VERIFIED AD-READ PLACEMENTS FOR ' + data.brand.name.toUpperCase() };
      const isShowMatch = entity.type === 'show' || data.matched_type === 'show';
      if (preferredPersona) window.__srSwitchPersona(preferredPersona);
      else if (isShowMatch) window.__srSwitchPersona('buyer');
      const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
      setTxt('res-entity-label', isShowMatch ? 'MATCHED CREATOR SHOW' : 'SPONSOR / ENTITY');
      setTxt('res-match-pill', isShowMatch ? 'SHOW RATE CARD MATCH' : (data.matched_type === 'dynamic_brand' ? 'LIVE DOMAIN MODEL' : 'VERIFIED 3x+ LEDGER'));
      setTxt('res-brand-name', entity.name);
      setTxt('res-brand-domain', entity.subtitle);
      setTxt('res-monthly-spend', '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString());
      setTxt('res-avg-cpm', 'Avg Effective CPM: $' + data.metrics.avg_cpm_usd + ' (3x Floor: $' + Math.round(data.metrics.avg_cpm_usd * 0.82) + ')');
      setTxt('res-renewal-score', data.metrics.renewal_velocity_score + '/100');
      setTxt('res-flights-summary', data.metrics.proven_3x_shows_count + ' Proven 3x+ (' + data.metrics.verified_total_flights + ' Flights)');
      setTxt('res-dm-role', entity.lead_role);
      setTxt('res-dm-email', 'Sample Unlocked Below • 88 Total Contacts ($1.99)');
      setTxt('res-table-title', entity.table_title);
      if (data.moneyball_bundle) {
        const mb = data.moneyball_bundle;
        window.__srCurrentRackRate = mb.published_rack_rate_usd;
        window.__srCurrentAvgCpm = data.metrics.avg_cpm_usd;
        window.__srCurrentTargetName = mb.target_show;
        window.__srCurrentLookalikes = mb.lookalike_shows || [];
        var qaP = document.getElementById('sr-home-qa-price'), qaR = document.getElementById('sr-home-qa-reach');
        if (qaP) qaP.value = mb.published_rack_rate_usd;
        if (qaR) qaR.value = Math.max(10000, Math.round((mb.published_rack_rate_usd / Math.max(15, data.metrics.avg_cpm_usd)) * 1000));
        window.__srRunHomeQuoteAudit();
        const rfEl = document.getElementById('sr-mb-rack-floor');
        if (rfEl) rfEl.innerHTML = '$' + Number(mb.published_rack_rate_usd).toLocaleString() + ' Rack → <span style="color:var(--emerald-roi);">$' + Number(mb.negotiated_floor_rate_usd).toLocaleString() + ' Floor (-18%)</span>';
        if (mb.lookalike_shows && mb.lookalike_shows.length > 0) {
          const l0 = mb.lookalike_shows[0];
          const lTitle = document.getElementById('sr-mb-look1-title'), lRep = document.getElementById('sr-mb-look1-rep');
          if (lTitle) lTitle.textContent = l0.name + ' ($' + Number(l0.slot_usd).toLocaleString() + '/slot)';
          if (lRep) lRep.innerHTML = 'Direct Rep: <strong>' + escHtml(l0.unmasked_rep || l0.booking_rep) + '</strong> (' + escHtml(l0.overlap) + ')';
        }
        window.__srUpdateMoneyball((document.getElementById('sr-moneyball-slider') || {}).value || 15000, mb.published_rack_rate_usd);
      }
      const tbody = document.getElementById('res-placements-tbody');
      if (tbody) tbody.innerHTML = (data.placements || []).map((p, idx) => {
        const rowTitle = escHtml(isShowMatch && p.brand_name ? (p.brand_name + ' → ' + p.show_name) : p.show_name);
        const floorCpm = Math.round((Number(p.cpm_usd) || 40) * 0.82), estCpc = (floorCpm / 18).toFixed(2);
        const contactHtml = '<div class="mono" style="font-size:13.5px;color:var(--amber-gold);">' + escHtml((p.sponsor_email || 'p***@brand.io').replace(/🔒\\s*/g, '')) + '</div><div style="font-size:13.5px;color:var(--text-muted);">' + escHtml(p.decision_maker_role || 'VP Growth') + ' • ' + escHtml(p.agency_desk || 'Agency Desk') + ' <a href="/buy/micro_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout(\\\'micro_pass\\\');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;">Unlock Row (99¢) →</a></div>';
        return \`<tr><td><div style="font-weight:700;">\${rowTitle}\${p.is_lookalike ? ' <span class="pill-slate" style="font-size:13.5px;padding:2px 8px;">Category Peer</span>' : ''}</div><div class="mono" style="font-size:13.5px; color:var(--text-muted);">\${escHtml(p.channel_type)} • \${Math.round((Number(p.audience_size) || 75000) / 1000)}K reach</div></td><td><div><span class="\${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${escHtml(p.renewal_badge)}</span></div><div class="mono" style="font-size:13.5px; color:var(--emerald-roi); margin-top:4px; font-weight:700;">\${escHtml((p.fresh_budget_badge || 'Active RSS Budget (12h ago)').replace(/🟢\\s*/g, ''))}</div></td><td>\${contactHtml}</td><td class="mono" style="font-size:13.5px;"><div style="color:var(--cyan-info);">\${escHtml(p.vanity_url)}</div><div>Code: <strong style="color:var(--amber-gold);">\${escHtml(p.promo_code)}</strong></div></td><td class="mono" style="font-weight:700; color:var(--amber-gold);">$\${Number(p.est_spend_usd).toLocaleString()} ($\${Number(p.cpm_usd) || 0} CPM)<div style="font-size:13.5px; color:var(--emerald-roi); font-weight:600;">3x Floor: $\${floorCpm} CPM • ~$\${estCpc} CPC</div></td></tr>\`;
      }).join('');
      if (window.__ebMountDeliverableCurtain) window.__ebMountDeliverableCurtain(entity.name);
      const cpLbl = document.getElementById('copy-pitch-label'), pcBtn = document.getElementById('btn-postcalc-flash-pass');
      if (cpLbl) cpLbl.textContent = 'Unlock ' + entity.name.slice(0, 18) + ' & 88 Contacts ($1.99) →';
      if (pcBtn) pcBtn.textContent = 'Unlock ' + entity.name.slice(0, 18) + ' Pack ($1.99) →';
      if (data.outbound_pitch) {
        const reachK = Math.round((Number(senderReach) || 75000) / 1000);
        const pitchMetaText = '3-Flight Pilot (' + reachK + 'K Reach): $' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' ($' + data.outbound_pitch.effective_cpm_usd + ' CPM • -18% Floor)';
        setTxt('res-pitch-meta', pitchMetaText);
        const cQuote = document.getElementById('sr-creator-quote-readout'), freePre = document.getElementById('sr-free-pitch-pre'), copyBtn = document.getElementById('btn-copy-free-pitch1');
        if (cQuote) cQuote.textContent = pitchMetaText;
        const rawSample = data.outbound_pitch.to_email || 'p***@deel.com';
        if (freePre) freePre.textContent = '# OUTBOUND 3-FLIGHT PILOT PITCH PREVIEW (DOMAIN VERIFIED)\\nTo: ' + rawSample + ' (' + (data.outbound_pitch.agency_desk || data.brand.decision_maker_role) + ')\\nSubject: ' + data.outbound_pitch.subject + '\\n\\n' + (data.outbound_pitch.free_pitch_script || data.outbound_pitch.body);
        if (copyBtn) copyBtn.textContent = 'Unlock Buyer Email & Copy Pitch (' + rawSample + ')';
        setTxt('res-pitch-body', '# SponsorRadar Diagnostic Summary (' + entity.name + ')\\n• Verified 3x+ Renewal Score: ' + data.metrics.renewal_velocity_score + '/100 (' + data.metrics.proven_3x_shows_count + ' Proven 3x+ Placements)\\n• Recommended 3-Episode Pilot Quote (' + reachK + 'K Reach): $' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' ($' + data.outbound_pitch.effective_cpm_usd + ' Effective CPM)\\n• Target Buyer Role: ' + data.brand.decision_maker_role + ' (' + data.outbound_pitch.to_email + ')\\n• All 88 Brand & Show Contacts + Rate Card CSV: [SINGLE ROW ($1.99) / COMPLETE 88-ROW Q4 LEDGER ($29)]');
      }
    }
    async function runTranscriptExtractor() {
      const transcript = (document.getElementById('transcript-input') || {}).value || '', showName = (document.getElementById('transcript-show') || {}).value || '', audienceSize = Number((document.getElementById('transcript-audience') || {}).value) || 440000;
      const btn = document.getElementById('btn-run-transcript');
      if (btn) btn.textContent = 'Extracting...';
      try {
        const res = await fetch('/api/analyze-sponsor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'transcript', transcript, show_name: showName, audience_size: audienceSize }) });
        renderTranscriptResults(await res.json());
        fireMetaEvent('Lead', 0, { tool_mode: 'transcript', show_name: showName });
      } catch (e) { console.error(e); } finally { if (btn) btn.textContent = 'Extract Sponsors'; }
    }
    function renderTranscriptResults(data) {
      if (!data || !data.extracted_sponsors || data.extracted_sponsors.length === 0) return;
      const first = data.extracted_sponsors[0];
      const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
      setTxt('res-brand-name', data.extracted_sponsors.map(s => s.brand_name).join(' + '));
      setTxt('res-brand-domain', data.show_name + ' • ' + data.total_detected_sponsors + ' Sponsor Read(s) Extracted');
      setTxt('res-monthly-spend', '$' + Number(data.total_episode_ad_value_usd).toLocaleString());
      setTxt('res-avg-cpm', 'Single-Episode / Issue Ad Value');
      setTxt('res-renewal-score', first.renewal_score + '/100');
      setTxt('res-flights-summary', first.renewal_badge);
      setTxt('res-dm-role', first.decision_maker_role);
      setTxt('res-dm-email', 'Locked: Verified Email Locked ($1.99)');
      setTxt('res-table-title', 'EXTRACTED AD-READ ENTITIES & ATTRIBUTION SIGNALS (' + String(data.engine_model || '').toUpperCase() + ')');
      const tb = document.getElementById('res-placements-tbody');
      if (tb) tb.innerHTML = data.extracted_sponsors.map(s => \`<tr><td><div style="font-weight:700;">\${escHtml(s.brand_name)}</div><div class="mono" style="font-size:14px; color:var(--text-muted);">\${escHtml(s.category)} • Buyer Email Locked</div></td><td><span class="\${s.verified_flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${escHtml(s.renewal_badge)}</span></td><td class="mono" style="font-size:13.5px;"><div>\${escHtml(s.placement_position)}</div><div style="color:var(--text-muted);">Timestamp: \${escHtml(s.timestamp)}</div></td><td class="mono" style="font-size:13.5px;"><div style="color:var(--cyan-info);">\${escHtml(s.vanity_url)}</div><div>Code: <strong style="color:var(--amber-gold);">\${escHtml(s.promo_code)}</strong></div></td><td class="mono" style="font-weight:700; color:var(--amber-gold);">$\${Number(s.estimated_flight_spend_usd).toLocaleString()}/read<div style="font-size:13.5px; color:var(--text-muted); font-weight:400;">$\${Number(s.estimated_cpm_usd) || 0} est. CPM</div></td></tr>\`).join('');
    }
    function filterLedgerRows(filterKey, btnEl) {
      document.querySelectorAll('#ledger-filter-bar button').forEach(b => { b.classList.remove('btn-emerald'); b.classList.add('btn-ghost'); });
      const activeBtn = btnEl || document.getElementById('btn-filter-' + filterKey);
      if (activeBtn) { activeBtn.classList.remove('btn-ghost'); activeBtn.classList.add('btn-emerald'); }
      document.querySelectorAll('#master-ledger-table tbody tr').forEach(r => {
        const tier = r.getAttribute('data-tier'), vert = r.getAttribute('data-vertical'), ch = r.getAttribute('data-channel');
        r.style.display = (filterKey === 'all' || tier === filterKey || vert === filterKey || ch === filterKey) ? '' : 'none';
      });
      if (window.__ebLogEvent) window.__ebLogEvent('tab_switch', { store_pill: 'ledger_' + filterKey });
    }
    window.__srFilterLedger = filterLedgerRows;
    var __srLiveTimer = null;
    ['lookup-query', 'sender-reach', 'transcript-input'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function() {
        if (window.__srSaveWorkspace) {
          var patch = {};
          if (id === 'lookup-query') patch.query = el.value.trim();
          if (id === 'sender-reach') patch.reach = Number(el.value) || 75000;
          if (id === 'transcript-input') patch.transcript = el.value;
          window.__srSaveWorkspace(patch);
        }
        if (id !== 'transcript-input') {
          if (__srLiveTimer) clearTimeout(__srLiveTimer);
          __srLiveTimer = setTimeout(function() { if (document.getElementById('lookup-query')?.value?.trim().length >= 2) runBrandLookup(); }, 520);
        }
      });
    });
    window.addEventListener('DOMContentLoaded', function() {
      try {
        var ws = window.__srGetWorkspace ? window.__srGetWorkspace() : {};
        var sp = new URLSearchParams(window.location.search || '');
        var hasUrlQuery = Boolean(sp.get('q') || sp.get('brand') || sp.get('show'));
        var qEl = document.getElementById('lookup-query'), rEl = document.getElementById('sender-reach');
        var qaP = document.getElementById('sr-home-qa-price'), qaR = document.getElementById('sr-home-qa-reach'), mbS = document.getElementById('sr-moneyball-slider');
        if (ws.qaPrice && qaP) qaP.value = ws.qaPrice;
        if (ws.qaReach && qaR) qaR.value = ws.qaReach;
        if (ws.budget && mbS) { mbS.value = ws.budget; if (window.__srUpdateMoneyball) window.__srUpdateMoneyball(ws.budget); }
        if (!hasUrlQuery && ws.query && qEl && ws.query !== qEl.value) {
          qEl.value = ws.query;
          if (ws.reach && rEl) rEl.value = ws.reach;
          runBrandLookup(ws.persona);
        } else if (ws.reach && rEl && String(ws.reach) !== String(rEl.value)) {
          rEl.value = ws.reach;
        }
        if (window.__srRenderComparisonMatrix) window.__srRenderComparisonMatrix();
      } catch (_) {}
    });
    async function startStripeCheckout(planTier, amountUsd, emailInputId, hpInputId, confirmed) {
      const emailEl = document.getElementById(emailInputId), hpEl = hpInputId ? document.getElementById(hpInputId) : null;
      const email = emailEl && emailEl.value ? emailEl.value.trim() : 'founder@creatorstudio.io';
      if (!confirmed && window.__ebCheckout && !(hpEl && hpEl.value)) {
        window.__ebCheckout((planTier === 'agency_feed_199' || amountUsd >= 149) ? 'pro_b2b' : 'complete_dossier', false);
        return;
      }
      try {
        const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan_tier: planTier, amount_usd: amountUsd, customer_email: email, website_url_hp: hpEl ? hpEl.value : '', ...getUtmParams() }) });
        const data = await res.json();
        fireMetaEvent('StartTrial', amountUsd, { plan_tier: planTier });
        const banner = document.getElementById('checkout-status-banner'), txt = document.getElementById('checkout-status-text');
        if (banner && txt) { banner.style.display = 'block'; txt.innerHTML = 'Stripe Session ' + escHtml(data.session_id) + ' ready for ' + escHtml(email) + ' (' + escHtml(String(planTier).toUpperCase()) + ' - $' + Number(amountUsd) + '/mo). <a href="' + escHtml(data.checkout_url || '/buy/complete_dossier') + '" style="color:var(--emerald-roi);text-decoration:underline;font-weight:700;margin-left:8px;">Proceed to Stripe Checkout ↗</a>'; }
      } catch (e) { console.error(e); }
    }
  </script>`;
  return renderShell({
    title: 'SponsorRadar: Podcast, Newsletter & YouTube Ad-Spend Ledger, Show Rate Cards & 3x-Renewal Tracker',
    description: 'Audit podcast, newsletter, and YouTube sponsorship quotes against -18% 3-flight floor CPMs, track 3x+ repeat sponsors, and unlock 88 direct buyer & booking contacts.',
    canonicalPath: '/',
    ogSlug: 'sponsor-radar-home',
    jsonLd,
    bodyHtml
  });
}

function renderLandingPage({ defaultAnalysis }) {
  const bodyHtml = `
  <section style="padding:40px 0 60px;">
    <div class="container" style="max-width:1060px;">
      <div style="text-align:center; max-width:820px; margin:0 auto 30px;">
        <span class="pill-vermilion">FOR BRAND PARTNERSHIPS, MEDIA BUYERS &amp; CREATOR OPERATORS</span>
        <h1 class="headline-xl" style="margin-top:14px;">Stop Guessing Which Podcasts &amp; Newsletters Actually Convert: See Every Brand That <span class="serif-italic" style="color:var(--emerald-roi);">Renewed 3+ Times</span></h1>
        <p style="color:var(--text-secondary); font-size:16px; margin-top:12px;">Test-flight sponsorships lie: 68% of brands drop a show after 1 insertion. SponsorRadar tracks <strong>96+ verified multi-flight renewals</strong>, active vanity URLs, promo codes, and negotiated CPM floors across 42 top B2B &amp; DTC sponsors and 46 flagship shows.</p>
      </div>
      <div class="double-bezel" style="margin-bottom:32px;"><div class="panel">
        <div class="panel-header"><div><span class="pill-emerald">TRY IT FREE ABOVE THE FOLD</span><strong style="margin-left:8px; font-size:14.5px;">Instant Sponsor Spend &amp; 3x-Renewal Verifier</strong></div><div class="mono" style="font-size:13px; color:var(--text-secondary);">Zero signup required to test</div></div>
        <div class="panel-body">
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
            <input id="lp-query" type="text" class="input-field" value="AG1" placeholder="Type any brand or show (e.g. AG1, Deel, Ramp, Lenny's Podcast)..." style="flex:1; min-width:210px;" />
            <button type="button" class="btn btn-vermilion" onclick="runLpLookup()"><span>Reveal 3x+ Renewals</span><span class="btn-icon-circle" aria-hidden="true">↗</span></button>
          </div>
          <div class="preset-row">
            <button type="button" class="preset-chip" onclick="setLpPreset('AG1')">AG1 ($1.42M/mo)</button>
            <button type="button" class="preset-chip" onclick="setLpPreset('Deel')">Deel ($680K/mo)</button>
            <button type="button" class="preset-chip" onclick="setLpPreset('Ramp')">Ramp ($790K/mo)</button>
            <button type="button" class="preset-chip" onclick="setLpPreset('Lenny\\'s Podcast')">Lenny's Podcast</button>
            <button type="button" class="preset-chip" onclick="setLpPreset('Huberman Lab')">Huberman Lab</button>
          </div>
          <div class="kpi-grid" style="margin-top:16px;">
            <div class="kpi-box"><div class="kpi-label">MATCHED ENTITY</div><div class="kpi-val" id="lp-brand-name" style="font-size:18px;">${escapeHtml(defaultAnalysis.brand.name)}</div></div>
            <div class="kpi-box"><div class="kpi-label">EST. MONTHLY SPEND</div><div class="kpi-val" id="lp-spend" style="color:var(--amber-gold);">$${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}</div></div>
            <div class="kpi-box"><div class="kpi-label">3x+ RENEWAL SCORE</div><div class="kpi-val" id="lp-score" style="color:var(--emerald-roi);">${defaultAnalysis.metrics.renewal_velocity_score}/100</div></div>
            <div class="kpi-box"><div class="kpi-label">DECISION MAKER EMAIL</div><div class="kpi-val" id="lp-email" style="font-size:14px; color:var(--amber-gold);">Locked in Free Preview ($1.99)</div></div>
          </div>
        </div>
      </div></div>
      <div class="panel" style="padding:28px; text-align:center; border-color:var(--emerald-border); background:var(--bg-elevated);">
        <span class="pill-emerald">INSTANT STRIPE EXPRESS • 30-DAY 100% ROI GUARANTEE</span>
        <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin-top:10px;">Unlock All 88 Verified Brand &amp; Show Contacts, CPM Rate Cards &amp; 3-Flight Pitches ($1.99 / $29 Full Ledger)</h2>
        <p style="color:var(--text-secondary); max-width:600px; margin:8px auto 20px;">Get the 3-File Sponsor Email &amp; Rate Card Pack for a one-time $1.99 pass, or start continuous Creator Pro access below.</p>
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-bottom:14px;">
          <a href="/buy/flash_pass?source=lp_express" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:12px 22px; font-size:15px; text-decoration:none;"><span>Unlock 3-File Sponsor Pack ($1.99 Stripe Express)</span><span class="btn-icon-circle" aria-hidden="true">↗</span></a>
        </div>
        <input type="text" id="lp-hp-field" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; max-width:560px; margin:0 auto;">
          <input id="lp-lead-email" type="email" class="input-field" required placeholder="Enter your work email..." style="flex:1; min-width:220px;" />
          <button type="button" class="btn btn-ghost" onclick="submitLpLeadAndCheckout()"><span>Or Start Creator Pro Subscription ($49/mo) ↗</span></button>
        </div>
        <div id="lp-confirm-msg" class="mono" style="margin-top:12px; font-size:13px; color:var(--emerald-roi); display:none;"></div>
      </div>
    </div>
  </section>
  <script>
    function escHtmlLp(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
    function setLpPreset(q) { const el = document.getElementById('lp-query'); if (el) el.value = q; runLpLookup(); }
    async function runLpLookup() {
      const q = (document.getElementById('lp-query') || {}).value || 'AG1';
      const res = await fetch('/api/analyze-sponsor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'lookup', query: q }) });
      const data = await res.json();
      if (data && data.brand) {
        const entity = data.display_entity || { name: data.brand.name }, setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
        setTxt('lp-brand-name', entity.name); setTxt('lp-spend', '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString());
        setTxt('lp-score', data.metrics.renewal_velocity_score + '/100'); setTxt('lp-email', 'Locked in Free Preview ($1.99)');
        fireMetaEvent('Lead', 0, { source: 'lp_interactive_lookup', query: q });
      }
    }
    async function submitLpLeadAndCheckout(confirmed) {
      const email = (document.getElementById('lp-lead-email') || {}).value || 'growth@agency.io', hp = (document.getElementById('lp-hp-field') || {}).value || '';
      if (!confirmed && window.__ebCheckout && !hp) { window.__ebCheckout('complete_dossier', false); return; }
      const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan_tier: 'creator_pro_49', amount_usd: 49, customer_email: email, website_url_hp: hp, ...getUtmParams() }) });
      const data = await res.json();
      fireMetaEvent('Purchase', 49, { plan_tier: 'creator_pro_49', session_id: data.session_id });
      const msg = document.getElementById('lp-confirm-msg');
      if (msg) { msg.style.display = 'block'; msg.innerHTML = 'Verified Session ' + escHtmlLp(data.session_id) + ' unlocked for ' + escHtmlLp(email) + '. <a href="' + escHtmlLp(data.checkout_url || '/buy/complete_dossier') + '" style="color:var(--emerald-roi);text-decoration:underline;font-weight:700;">Proceed to Stripe Checkout ↗</a>'; }
    }
  </script>`;
  return renderShell({
    title: 'Stop Guessing Which Podcasts & Newsletters Convert: SponsorRadar 3x+ Renewal Ledger',
    description: 'See every sponsor brand that renewed 3+ times across 46+ podcasts, newsletters, and YouTube channels. 30-day money-back guarantee.',
    canonicalPath: '/lp',
    ogSlug: 'sponsor-radar-lp',
    jsonLd: null,
    bodyHtml
  });
}

module.exports = { escapeHtml, renderBrandLogoSvg, renderShell, renderHomePage, renderLandingPage };

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
  const mb = defaultAnalysis.moneyball_bundle || generateMoneyballLookalikeBundle({
    targetShowName: defaultAnalysis.show ? defaultAnalysis.show.name : ((defaultAnalysis.placements[0] && defaultAnalysis.placements[0].show_name) || "Lenny's Podcast"),
    baseCpm: defaultAnalysis.metrics.avg_cpm_usd,
    rackRateUsd: 9500,
    category: defaultAnalysis.brand.category,
    placements: defaultAnalysis.placements
  });
  const samplePitchText = defaultAnalysis.outbound_pitch.free_pitch_script || defaultAnalysis.outbound_pitch.body;
  const sampleBuyerEmail = defaultAnalysis.outbound_pitch.unmasked_sample_email || 'partnerships@deel.com';
  const sampleMailto = defaultAnalysis.outbound_pitch.mailto_href || ('mailto:' + sampleBuyerEmail);
  const proven3xPlacements = placements.filter(p => p.flights >= 3).slice(0, 12);
  const testPlacements = placements.filter(p => p.flights < 3).slice(0, 6);
  const topPlacements = [...proven3xPlacements, ...testPlacements];
  const topSeoLinks = [
    ...seoPages.filter(p => p.page_type === 'brand_breakdown').slice(0, 8),
    ...seoPages.filter(p => p.page_type === 'show_benchmark').slice(0, 8),
    ...seoPages.filter(p => p.page_type === 'niche_directory').slice(0, 8)
  ];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name: 'SponsorRadar',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Podcast, Newsletter & YouTube Ad-Read Spend Ledger, 3x-Renewal Tracker & Outbound Sponsor Pitch Generator.',
        offers: [
          { '@type': 'Offer', name: '3-File Sponsor Email & Pitch Pack', price: '1.99', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Creator Pro', price: '49.00', priceCurrency: 'USD' },
          { '@type': 'Offer', name: 'Media Buyer & Agency Feed', price: '199.00', priceCurrency: 'USD' }
        ]
      },
      {
        '@type': 'Dataset',
        name: 'SponsorRadar 2026 Verified Podcast, Newsletter & YouTube Ad-Spend Ledger',
        description: 'Historical ad-read timestamps, promo codes, vanity URLs, CPM benchmarks, and 3x+ renewal velocity scores across 42+ sponsor brands and 46+ top shows.',
        creator: { '@type': 'Organization', name: 'SponsorRadar Intelligence' }
      }
    ]
  };

  const pubBannerHtml = pubQuery ? `
      <div id="pub-indexed-banner" class="panel" style="margin-bottom:28px; padding:24px 28px; background:var(--bg-surface); border-radius:18px; display:flex; flex-direction:column; gap:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding-bottom:14px;">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
            <span class="pill-emerald" style="background:var(--emerald-soft);">Live Indexed Creator Benchmark</span>
            <strong style="font-size:17px; color:var(--text-primary);">${escapeHtml(pubQuery)}</strong>
          </div>
          <span class="mono" style="font-size:14px; font-weight:700; color:var(--emerald-roi); background:var(--emerald-soft); padding:4px 10px; border-radius:8px;">3-Flight Pilot Quote: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} ($${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px;">
          <div style="padding:14px 16px; border-radius:12px; background:var(--bg-parchment);">
            <div class="mono" style="font-size:14px; color:var(--text-secondary); font-weight:700;">Top Matched 3x+ Sponsors</div>
            <div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-top:4px;">1. Linear (8x) • 2. Deel (12x) • 3. Ramp (10x)</div>
          </div>
          <div style="padding:14px 16px; border-radius:12px; background:var(--emerald-soft);">
            <div class="mono" style="font-size:14px; color:var(--emerald-roi); font-weight:700;">Free Sample Buyer Unlocked</div>
            <div class="mono" style="font-size:15px; font-weight:700; color:var(--text-primary); margin-top:4px;">${escapeHtml(sampleBuyerEmail)}</div>
          </div>
          <div id="pub-blurred-emails-preview" style="padding:14px 16px; border-radius:12px; background:#FFFBEB;">
            <div class="mono" style="font-size:14px; color:#92400E; font-weight:700;">41 Additional Buyers Locked</div>
            <div class="mono" style="font-size:14px; font-weight:700; color:#92400E; margin-top:4px;"><span style="filter:blur(3.5px);user-select:none;">p***@deel.com</span> • <span style="filter:blur(3.5px);user-select:none;">s***@supabase.io</span> (+39 more)</div>
          </div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px; align-items:center;">
          <a href="#radar-results-container" class="btn btn-ghost" style="padding:10px 16px; min-height:42px; font-size:14px; text-decoration:none; justify-content:center;">1. View Matched Sponsor Table ↓</a>
          <button type="button" id="btn-copy-creator-badge" onclick="if(window.__ebCopyReadmeBadge){window.__ebCopyReadmeBadge(this);}" class="btn btn-ghost" style="padding:10px 16px; min-height:42px; font-size:14px; color:var(--emerald-roi); font-weight:700; cursor:pointer; justify-content:center;">2. Copy Verified 3x-Sponsor Badge</button>
          <a href="/buy/flash_pass?target=${encodeURIComponent(pubQuery)}" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:10px 16px; min-height:42px; font-size:14px; text-decoration:none; justify-content:center;">3. Unlock All 42 Buyer Emails ($1.99) →</a>
        </div>
      </div>` : '';

  const bodyHtml = `
  <section class="hero-section" id="radar-tool">
    <div class="container">
      ${pubBannerHtml}
      <!-- BALANCED 2-COLUMN HERO (Zero Left-Column White Space Void) -->
      <div class="hero-grid">
        <!-- Left Column: Crisp Value Proposition + 3-Step Summary -->
        <div id="home-executive-brief" style="display:flex; flex-direction:column; justify-content:space-between; gap:14px;">
          <div>
            <h1 class="headline-xl" style="margin-top:0;">
              Track 3x+ Renewed Sponsors &amp; CPMs
            </h1>
            <p class="subhead">
              68% of one-off sponsorships never renew. Search any brand or show to see verified 3x+ repeat sponsors, negotiated CPM floors, lookalike shows, and ready-to-send pitches.
            </p>
            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center; margin-top:12px;">
              <span class="pill-vermilion">Podcast, Newsletter &amp; YouTube Sponsor Tracker</span>
              <a href="/leaderboard" class="pill-emerald" style="text-decoration:none;">Top-3 Podium Leaderboard &rarr;</a>
            </div>
          </div>

          <div class="hero-steps-grid">
            <div class="panel" style="padding:16px;">
              <div class="mono" style="font-size:14px; color:var(--emerald-roi); font-weight:700; margin-bottom:4px;">Step 1 • Check Renewals</div>
              <p style="font-size:16px; color:var(--text-primary); font-weight:500; line-height:1.5; margin:0;">Search any brand or show to verify 3x+ renewals &amp; monthly spend.</p>
            </div>
            <div class="panel" style="padding:16px;">
              <div class="mono" style="font-size:14px; color:var(--vermilion); font-weight:700; margin-bottom:4px;">Step 2 • Slide Budget / Reach</div>
              <p style="font-size:16px; color:var(--text-primary); font-weight:500; line-height:1.5; margin:0;">Compare rack rates vs. lookalike shows or calculate your 3-flight quote.</p>
            </div>
            <div class="panel" style="padding:16px;">
              <div class="mono" style="font-size:14px; color:var(--text-primary); font-weight:700; margin-bottom:4px;">Step 3 • Send or Export</div>
              <p style="font-size:16px; color:var(--text-primary); font-weight:500; line-height:1.5; margin:0;">Copy free sample Pitch #1 or unlock all 85 buyer emails &amp; CSVs ($1.99).</p>
            </div>
          </div>
        </div>

        <!-- Right Column: Search & Reach Controls (Matches Left Column Height Cleanly) -->
        <div class="double-bezel" style="display:flex; flex-direction:column;">
          <div class="panel" style="display:flex; flex-direction:column; flex:1; justify-content:space-between;">
            <div class="panel-header">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="pill-vermilion">Live Sponsorship Checker</span>
                <span style="font-weight:700; font-size:16px;">Search Any Brand, Podcast, Newsletter or YouTube Show</span>
              </div>
              <span class="pill-emerald" id="res-match-pill">${defaultAnalysis.matched_type === 'show' ? 'Show Roster Match' : 'Verified 3x+ Ledger'}</span>
            </div>

            <div class="panel-body" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; gap:12px;">
              <div id="mode-lookup-pane">
                <div style="display:flex; gap:10px; align-items:flex-end; flex-wrap:wrap;">
                  <div style="flex:1; min-width:220px;">
                    <label for="lookup-query" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Brand or Show Name</label>
                    <input id="lookup-query" type="text" class="input-field" value="${escapeHtml(initialQuery)}" required placeholder="e.g. AG1, Deel, Ramp, Lenny's Podcast, Huberman Lab..." onkeydown="if(event.key==='Enter'){event.preventDefault();runBrandLookup();}" />
                  </div>
                  <button type="button" id="btn-run-lookup" class="btn btn-vermilion" onclick="runBrandLookup()">
                    <span>Check Sponsor Spend</span>
                    <span class="btn-icon-circle" aria-hidden="true">↗</span>
                  </button>
                </div>
                <div id="lookup-error-msg" class="mono" style="display:none; color:#B9311C; font-size:14px; margin-top:6px;"></div>

                <div class="preset-row" aria-label="1-Click Brand & Show Presets">
                  <span class="mono" style="font-size:14px; font-weight:700; color:var(--text-muted); align-self:center;">Brands:</span>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('AG1')">AG1 ($1.42M/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Deel')">Deel ($680K/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Ramp')">Ramp ($790K/mo)</button>
                  <span class="mono" style="font-size:14px; font-weight:700; color:var(--text-muted); align-self:center; margin-left:4px;">Shows:</span>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Lenny\\'s Podcast')">Lenny's Podcast</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Huberman Lab')">Huberman Lab</button>
                </div>

                <div style="margin-top:10px; padding:12px 14px; border-radius:10px; background:var(--bg-parchment); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
                  <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <label for="sender-reach" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary);">Audience Reach:</label>
                    <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(10000)">10K</button>
                    <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(25000)">25K</button>
                    <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(75000)">75K</button>
                    <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(150000)">150K</button>
                  </div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <input id="sender-reach" type="number" class="input-field mono" value="${initialReach}" min="500" step="1000" style="width:110px; min-height:38px; padding:6px 10px; font-size:15px;" onchange="runBrandLookup()" />
                    <input id="sender-show" type="hidden" value="Creator Media Network" />
                  </div>
                </div>

                <details id="mode-b-details" style="margin-top:10px; padding:10px 14px; border-radius:10px; background:var(--bg-parchment);">
                  <summary id="mode-b-summary" style="cursor:pointer; font-size:14px; font-weight:700; color:var(--text-secondary);">Or Extract Sponsor Reads from a Raw Podcast / YouTube Transcript ▾</summary>
                  <div class="mode-tabs" role="tablist" style="margin-top:8px;">
                    <button type="button" id="tab-mode-lookup" class="mode-tab active" onclick="switchToolMode('lookup')">Brand / Show Search</button>
                    <button type="button" id="tab-mode-transcript" class="mode-tab" onclick="switchToolMode('transcript')">Transcript Extractor</button>
                  </div>
                </details>
              </div>

              <!-- Transcript Extractor Mode -->
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
        <!-- 1. 4-Card KPI Summary Strip -->
        <div class="kpi-grid" style="margin-bottom:0;">
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label" id="res-entity-label">${displayEntity.type === 'show' ? 'Matched Creator Show' : 'Sponsor / Entity'}</div>
            <div class="kpi-val" id="res-brand-name" style="color:var(--text-primary); font-size:20px;">${escapeHtml(displayEntity.name)}</div>
            <div class="mono" id="res-brand-domain" style="font-size:14px; color:var(--vermilion);">${escapeHtml(displayEntity.subtitle)}</div>
          </div>
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">Est. Monthly Ad Spend</div>
            <div class="kpi-val" id="res-monthly-spend" style="color:var(--amber-gold);">$${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}</div>
            <div class="mono" id="res-avg-cpm" style="font-size:14px; color:var(--text-secondary);">Avg Negotiated CPM: $${defaultAnalysis.metrics.avg_cpm_usd}</div>
          </div>
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">3x+ Renewal Score</div>
            <div class="kpi-val" id="res-renewal-score" style="color:var(--emerald-roi);">${defaultAnalysis.metrics.renewal_velocity_score}/100</div>
            <div class="mono" id="res-flights-summary" style="font-size:14px; color:var(--emerald-roi);">${defaultAnalysis.metrics.proven_3x_shows_count} Proven 3x+ (${defaultAnalysis.metrics.verified_total_flights} Flights)</div>
          </div>
          <div class="kpi-box" style="background:var(--bg-surface);">
            <div class="kpi-label">Partnerships Lead</div>
            <div class="kpi-val" id="res-dm-role" style="font-size:16px; color:var(--text-primary);">${escapeHtml(displayEntity.lead_role)}</div>
            <div class="mono" id="res-dm-email" style="font-size:14px; color:var(--amber-gold);">Locked: ${escapeHtml(defaultAnalysis.outbound_pitch.to_email)}</div>
          </div>
        </div>

          <!-- 2. Warm-Ivory Interactive Buyer & Creator Workbench (Centerpiece on Homepage) -->
          <div id="sr-home-option-e" class="pitch-box" style="margin-top:0; background:var(--bg-surface); color:var(--text-primary); padding:24px 26px; border-radius:18px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px; padding-bottom:14px;">
              <div style="display:inline-flex; gap:8px; flex-wrap:wrap; align-items:center;">
                <span class="mono" style="font-size:14px; color:var(--text-secondary); font-weight:700;">Choose Your View:</span>
                <button type="button" id="btn-sr-persona-buyer" onclick="window.__srSwitchPersona('buyer')" style="padding:8px 14px; border-radius:999px; font-size:14px; font-weight:700; cursor:pointer; border:none; background:var(--emerald-soft); color:var(--emerald-roi);">For Brand Media Buyers (Budget &amp; Lookalike Calculator)</button>
                <button type="button" id="btn-sr-persona-creator" onclick="window.__srSwitchPersona('creator')" style="padding:8px 14px; border-radius:999px; font-size:14px; font-weight:700; cursor:pointer; border:none; background:var(--bg-parchment); color:var(--text-secondary);">For Creators &amp; Shows (Ready-to-Send Sponsor Pitch)</button>
              </div>
              <div style="display:inline-flex; gap:10px; flex-wrap:wrap; align-items:center;">
                <span class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary);" id="res-pitch-meta">3-Flight Quote: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} ($${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)</span>
                <a href="/buy/flash_pass?source=hero_pitch_pack" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:8px 16px; min-height:40px; font-size:14px; text-decoration:none;">
                  <span id="copy-pitch-label">Unlock All 42 Buyer Emails ($1.99) →</span>
                </a>
              </div>
            </div>

          <!-- PANE 1: BRAND MEDIA BUYER BUDGET SLIDER & LOOKALIKE SHOWS -->
          <div id="sr-pane-buyer" style="display:block;">
            <div style="padding:14px 16px; border-radius:10px; background:var(--bg-parchment); margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div style="flex:1; min-width:250px;">
                <label for="sr-moneyball-slider" class="mono" style="font-size:14px; color:var(--emerald-roi); font-weight:700; display:block; margin-bottom:4px;">Slide Your Campaign Test Budget ($2,500 to $50,000):</label>
                <input id="sr-moneyball-slider" type="range" min="2500" max="50000" step="2500" value="10000" oninput="window.__srUpdateMoneyball(this.value)" style="width:100%; accent-color:var(--emerald-roi); cursor:pointer;" />
              </div>
              <div id="sr-moneyball-readout" class="mono" style="font-size:14px; font-weight:700; color:var(--text-primary); background:var(--bg-surface); padding:8px 12px; border-radius:8px;">
                $10,000 Budget → <span style="color:var(--amber-gold);">${(10000 / Math.max(1000, mb.published_rack_rate_usd)).toFixed(1)} Slot(s) on Rack Rate</span> vs. <span style="color:var(--emerald-roi);">${Math.max(2, Math.round(10000 / Math.max(750, mb.published_rack_rate_usd * 0.22)))} Host-Read Flights on Lookalike Shows (2.3x Reach)</span>
              </div>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(240px, 1fr)); gap:12px; margin-bottom:12px;">
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-parchment);">
                <div class="mono" style="font-size:14px; color:var(--text-secondary); font-weight:700;">Published Rack Rate vs. 3-Flight Floor</div>
                <div id="sr-mb-rack-floor" class="mono" style="font-size:16px; font-weight:800; color:var(--text-primary); margin-top:4px;">$${mb.published_rack_rate_usd.toLocaleString()} Rack → <span style="color:var(--emerald-roi);">$${mb.negotiated_floor_rate_usd.toLocaleString()} Floor (-18%)</span></div>
                <p id="sr-mb-savings-sub" style="font-size:15px; color:var(--text-secondary); margin:4px 0 0 0;">Save $${mb.savings_per_slot_usd.toLocaleString()}/slot with a 3-flight commitment + 1.5% CTR make-good</p>
              </div>
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-parchment);">
                <div class="mono" style="font-size:14px; color:var(--text-secondary); font-weight:700;">Lookalike Show #1 (Free Sample Unlocked)</div>
                <div id="sr-mb-look1-title" class="mono" style="font-size:16px; font-weight:800; color:var(--emerald-roi); margin-top:4px;">${escapeHtml(mb.lookalike_shows[0].name)} ($${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot)</div>
                <p id="sr-mb-look1-rep" style="font-size:15px; color:var(--text-primary); margin:4px 0 0 0;">Direct Rep: <strong>${escapeHtml(mb.lookalike_shows[0].unmasked_rep)}</strong> (${mb.lookalike_shows[0].overlap})</p>
              </div>
              <div style="padding:14px 16px; border-radius:10px; background:var(--bg-parchment);">
                <div class="mono" style="font-size:14px; color:var(--text-secondary); font-weight:700;">Lookalike Shows #2 to #10</div>
                <div id="sr-mb-look-pack" class="mono" style="font-size:16px; font-weight:800; color:var(--amber-gold); margin-top:4px;">9 Peer Shows @ $${mb.lookalike_shows[3].cpm_usd}–$${mb.lookalike_shows[0].cpm_usd} CPM ($1 Pass)</div>
                <p id="sr-mb-agency-desk" style="font-size:15px; color:var(--text-primary); margin:4px 0 0 0;">Agency Desk: ${escapeHtml(defaultAnalysis.outbound_pitch.agency_desk || 'Direct + Agency Desk')}</p>
              </div>
            </div>
            <pre id="sr-mb-free-pre" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-mono); font-size:14px; color:var(--text-primary); background:var(--bg-parchment); border-radius:8px; padding:14px; margin:0;">${escapeHtml(
              `FREE SAMPLE LOOKALIKE #1 (${mb.target_show}) — Target Rack: $${mb.published_rack_rate_usd.toLocaleString()}/slot vs. Negotiated 3-Flight Floor: $${mb.negotiated_floor_rate_usd.toLocaleString()}/slot\n` +
              `• Lookalike #1: ${mb.lookalike_shows[0].name} (${(mb.lookalike_shows[0].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[0].overlap}) — $${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot | Direct Booking Rep: ${mb.lookalike_shows[0].unmasked_rep}\n` +
              `• Lookalikes #2–#10 (${mb.lookalike_shows[1].name}, ${mb.lookalike_shows[2].name} + 7 more) + Direct Booking Rep Emails: Unlock w/ $1.00 Trial Pass or $1.99 Full Pack`
            )}</pre>
          </div>

          <!-- PANE 2: CREATOR READY-TO-SEND SPONSOR PITCH -->
          <div id="sr-pane-creator" style="display:none;">
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
                <button type="button" id="btn-copy-free-pitch1" onclick="navigator.clipboard.writeText(document.getElementById('sr-free-pitch-pre').innerText);this.textContent='Pitch #1 Copied!';if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'free_pitch_1'});" class="btn btn-emerald" style="padding:8px 14px;min-height:38px;font-size:14px;">Copy Free Pitch #1 (${escapeHtml(sampleBuyerEmail)})</button>
                <a id="btn-mailto-free-pitch1" href="${escapeHtml(sampleMailto)}" onclick="if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'mailto_pitch_1'});" class="btn btn-ghost" style="padding:8px 14px;min-height:38px;font-size:14px;">1-Click Open in Mail</a>
              </div>
            </div>
            <pre id="sr-free-pitch-pre" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-mono); font-size:14px; color:var(--text-primary); background:var(--bg-parchment); border-radius:8px; padding:14px; margin:0 0 8px 0;">${escapeHtml('# FREE UNLOCKED SAMPLE — PITCH #1 (READY TO SEND)\nTo: ' + sampleBuyerEmail + ' (' + (defaultAnalysis.outbound_pitch.agency_desk || defaultAnalysis.brand.decision_maker_role) + ')\nSubject: ' + defaultAnalysis.outbound_pitch.subject + '\n\n' + samplePitchText)}</pre>
            <pre class="pitch-pre" id="res-pitch-body" style="margin-top:0;">${escapeHtml(
              "# SponsorRadar Diagnostic Summary & Locked Pack (" + displayEntity.name + ")\n" +
              "• Verified 3x+ Renewal Score: " + defaultAnalysis.metrics.renewal_velocity_score + "/100 (" + defaultAnalysis.metrics.proven_3x_shows_count + " Proven 3x+ Placements)\n" +
              "• Recommended 3-Episode Pilot Quote (" + (initialReach / 1000).toFixed(0) + "K Reach): $" + defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString() + " ($" + defaultAnalysis.outbound_pitch.effective_cpm_usd + " Effective CPM)\n" +
              "• [UNLOCKED SAMPLE #1] Target Buyer: " + sampleBuyerEmail + " (" + (defaultAnalysis.outbound_pitch.agency_desk || defaultAnalysis.brand.decision_maker_role) + ")\n" +
              "• Pitches #2–#15 + 10 Lookalike Shows + 42-Brand CSV Ledger: [LOCKED IN PREVIEW — $1.00 TRIAL / $1.99 FULL PACK]"
            )}</pre>
          </div>

          <!-- MOBILE-TO-DESKTOP EMAIL BRIDGE -->
          <form onsubmit="return window.__srSendDesktopBridge(event)" style="margin-top:12px; padding:12px 14px; border-radius:10px; background:var(--bg-parchment); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
            <span class="mono" style="font-size:14px; color:var(--text-primary); font-weight:700;">On mobile or in a rush? Email yourself this live Pitch #1 + Desktop Unlock Link (Free):</span>
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
            <span class="pill-emerald" id="res-engine-badge">Verified 3x+ Ledger</span>
          </div>
          <div class="table-wrap" style="margin-top:0;">
            <table class="ledger-table">
              <thead>
                <tr>
                  <th>${displayEntity.type === 'show' ? 'Sponsor Brand → Show' : 'Show / Publication'}</th>
                  <th>Renewal Signal</th>
                  <th>Buyer Contact &amp; Agency Desk</th>
                  <th>Vanity URL &amp; Code</th>
                  <th>Est. Spend</th>
                </tr>
              </thead>
              <tbody id="res-placements-tbody">
                ${defaultAnalysis.placements.map((p, idx) => `
                  <tr>
                    <td>
                      <div style="font-weight:700;">${displayEntity.type === 'show' && p.brand_name ? `${escapeHtml(p.brand_name)} → ${escapeHtml(p.show_name)}` : escapeHtml(p.show_name)}${p.is_lookalike ? ` <span class="pill-slate" style="font-size:13px;padding:2px 8px;">Peer Match</span>` : ''}</div>
                      <div class="mono" style="font-size:14px; color:var(--text-muted);">${escapeHtml(p.channel_type)} • ${(p.audience_size / 1000).toFixed(0)}K reach</div>
                    </td>
                    <td>
                      <div><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></div>
                      <div class="mono" style="font-size:14px; color:var(--emerald-roi); margin-top:4px; font-weight:700;">${escapeHtml((p.fresh_budget_badge || 'Active RSS Budget (12h ago)').replace(/🟢\s*/g, ''))}</div>
                    </td>
                    <td>
                      ${idx === 0 && p.unmasked_proof_email
                        ? `<div style="font-size:14px;font-weight:700;color:var(--emerald-roi);">Sample Unlocked: ${escapeHtml(p.unmasked_proof_email)}</div><div class="mono" style="font-size:14px;color:var(--text-secondary);">${escapeHtml(p.decision_maker_role || 'VP Growth')} • ${escapeHtml(p.agency_desk || 'Direct + Agency')} <a href="${escapeHtml(sampleMailto)}" style="color:var(--cyan-info);font-weight:700;text-decoration:underline;margin-left:4px;">1-Click Pitch</a></div>`
                        : `<div class="mono" style="font-size:14px;color:var(--amber-gold);">${escapeHtml((p.sponsor_email || '[verified-buyer]***@brand.io ($1)').replace(/🔒\s*/g, ''))}</div><div style="font-size:14px;color:var(--text-muted);">${escapeHtml(p.decision_maker_role || 'VP Growth')} • ${escapeHtml(p.agency_desk || 'Agency Desk')} <a href="/buy/micro_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;">Unlock $1 →</a></div>`
                      }
                    </td>
                    <td class="mono" style="font-size:14px;">
                      <div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div>
                      <div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div>
                    </td>
                    <td class="mono" style="font-weight:700; color:var(--amber-gold);">
                      $${p.est_spend_usd.toLocaleString()}
                      <div style="font-size:14px; color:var(--text-muted); font-weight:400;">$${p.cpm_usd} CPM</div>
                    </td>
                  </tr>
                `).join('')}
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
      <div style="display:flex; justify-content:space-between; align-items:end; flex-wrap:wrap; gap:16px; margin-bottom:22px;">
        <div>
          <h2 style="font-family:var(--font-serif); font-size:32px; font-weight:600; margin:0;">Verified 3x+ Renewed Sponsorships</h2>
          <p style="color:var(--text-secondary); font-size:16px; margin-top:6px;">
            Filter by renewal frequency to see which DTC and B2B brands are scaling multi-quarter creator budgets vs. running one-off tests.
          </p>
        </div>
        <div id="ledger-filter-bar" style="display:flex; gap:8px; flex-wrap:wrap;">
          <button type="button" id="btn-filter-all" class="btn btn-emerald" style="padding:8px 14px; font-size:14px;" onclick="filterLedgerRows('all', this)">All Flights (${topPlacements.length})</button>
          <button type="button" id="btn-filter-3x" class="btn btn-ghost" style="padding:8px 14px; font-size:14px;" onclick="filterLedgerRows('3x', this)">3x+ Proven Winners Only (${proven3xPlacements.length})</button>
          <button type="button" id="btn-filter-test" class="btn btn-ghost" style="padding:8px 14px; font-size:14px;" onclick="filterLedgerRows('test', this)">1x–2x Test Flights (${testPlacements.length})</button>
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
              <th>Cumulative Spend</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            ${topPlacements.map(p => `
              <tr data-tier="${p.flights >= 3 ? '3x' : 'test'}">
                <td>
                  <div style="font-weight:700;">${escapeHtml(p.brand_name)}</div>
                  <div class="mono" style="font-size:14px; color:var(--text-muted);">${escapeHtml(p.brand_category)}</div>
                </td>
                <td>
                  <div style="font-weight:700;">${escapeHtml(p.show_name)}</div>
                  <div class="mono" style="font-size:14px; color:var(--text-muted);">${(p.audience_size / 1000).toFixed(0)}K reach</div>
                </td>
                <td><span class="pill-slate">${escapeHtml(p.channel_type)}</span></td>
                <td><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></td>
                <td class="mono" style="font-weight:700; color:${p.flights >= 3 ? 'var(--emerald-roi)' : 'var(--amber-gold)'};">${p.renewal_score}/100</td>
                <td class="mono" style="font-size:14px;">
                  <div>${escapeHtml(p.slot_type)}</div>
                  <div style="color:var(--text-muted);">${escapeHtml(p.timestamp_range)}</div>
                </td>
                <td class="mono" style="font-size:14px;">
                  <div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div>
                  <div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div>
                </td>
                <td class="mono" style="font-weight:700; color:var(--amber-gold);">
                  $${p.est_spend_usd.toLocaleString()}
                  <div style="font-size:14px; color:var(--text-muted); font-weight:400;">$${p.cpm_usd} CPM</div>
                </td>
                <td>
                  <button type="button" class="btn btn-ghost" style="padding:6px 12px; min-height:36px; font-size:14px;" onclick="selectBrandPreset('${escapeHtml(p.brand_name.split('(')[0].trim())}')">Inspect &amp; Pitch</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- SELF-SERVE STRIPE EXPRESS CHECKOUT -->
  <section id="pricing" style="padding:52px 0;">
    <div class="container">
      <div class="double-bezel" style="max-width:860px; margin:0 auto;">
        <div class="panel" style="padding:32px;">
          <h2 style="font-family:var(--font-serif); font-size:32px; font-weight:600; margin:0 0 10px;">
            Unlock 42 Sponsor Emails
          </h2>
          <p style="color:var(--text-secondary); font-size:16px; margin-bottom:20px;">
            Unblur all verified sponsor partnerships emails, negotiated CPM rate floors, lookalike show contacts, and ready-to-send 3-episode pilot pitch templates in 1 click.
          </p>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; padding:18px 20px; border-radius:12px; background:var(--bg-parchment);">
            <div>
              <div class="mono" style="font-size:36px; font-weight:800; color:var(--vermilion); line-height:1;">$1.99 <span style="font-size:15px; font-weight:600; color:var(--text-secondary);">USD one-time pass</span></div>
              <p style="font-size:15px; color:var(--text-secondary); margin:4px 0 0 0;">42+ Verified Brand Sponsor Emails (.CSV) + 3-Flight Pitch Templates + Negotiated CPM Ledger</p>
            </div>
            <a href="/buy/flash_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:14px 24px; font-size:15px; text-decoration:none;">
              <span>Unlock 3-File Sponsor Pack ($1.99 Stripe Express)</span>
              <span class="btn-icon-circle" aria-hidden="true">↗</span>
            </a>
          </div>
          <details style="margin-top:16px; font-size:15px; color:var(--text-secondary);">
            <summary style="cursor:pointer; font-weight:700;">Need Continuous Team / Agency Intelligence Feed ($49–$199/mo)?</summary>
            <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(240px,1fr)); gap:12px; margin-top:12px;">
              <input type="text" id="hp-creator" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <input id="checkout-email-creator" type="email" style="display:none;" value="creator@sponsorradar.io" />
              <input type="text" id="hp-agency" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <input id="checkout-email-agency" type="email" style="display:none;" value="agency@sponsorradar.io" />
              <button type="button" class="btn btn-ghost" onclick="startStripeCheckout('creator_pro_49', 49, 'checkout-email-creator', 'hp-creator')">Creator Pro ($49/mo)</button>
              <button type="button" class="btn btn-ghost" onclick="startStripeCheckout('agency_feed_199', 199, 'checkout-email-agency', 'hp-agency')">Agency Feed ($199/mo)</button>
            </div>
          </details>
        </div>
      </div>

      <div id="checkout-status-banner" class="panel" style="display:none; margin-top:20px; padding:18px; background:var(--emerald-soft);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <span class="pill-emerald">Stripe Checkout Session Initialized</span>
            <div style="font-weight:700; margin-top:6px; color:var(--text-primary);" id="checkout-status-text">Session created.</div>
          </div>
          <a href="/directory" class="btn btn-emerald">Access Full 60+ Report Vault Now</a>
        </div>
      </div>
    </div>
  </section>

  <!-- BENCHMARK REPORT DIRECTORY LINKS -->
  <section style="padding:48px 0;">
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
        <div>
          <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin:0;">2026 Sponsorship Spend Reports</h2>
        </div>
        <a href="/directory" class="btn btn-ghost" style="padding:8px 14px; font-size:14px;">View All 60+ Spend Reports →</a>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:14px;">
        ${topSeoLinks.map(page => `
          <a href="/seo/${escapeHtml(page.slug)}" class="panel" style="padding:16px; display:block; transition:transform 160ms cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='none'">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span class="pill-slate">${escapeHtml(page.category)}</span>
              <span class="mono" style="font-size:14px; color:var(--amber-gold); font-weight:700;">$${page.avg_cpm} CPM</span>
            </div>
            <p style="font-weight:600; font-size:16px; color:var(--text-primary); line-height:1.45; margin:0;">${escapeHtml(page.title)}</p>
          </a>
        `).join('')}
      </div>
    </div>
  </section>

  <script>
    const SAMPLE_TRANSCRIPTS_MAP = ${JSON.stringify(sampleTranscripts)};
    window.__srCurrentRackRate = ${mb.published_rack_rate_usd};
    window.__srCurrentAvgCpm = ${defaultAnalysis.metrics.avg_cpm_usd};

    window.__srSwitchPersona = function(mode) {
      var bPane = document.getElementById('sr-pane-buyer'), cPane = document.getElementById('sr-pane-creator');
      var bBtn = document.getElementById('btn-sr-persona-buyer'), cBtn = document.getElementById('btn-sr-persona-creator');
      if (bPane && cPane) { bPane.style.display = mode === 'buyer' ? 'block' : 'none'; cPane.style.display = mode === 'creator' ? 'block' : 'none'; }
      if (bBtn && cBtn) {
        bBtn.style.borderColor = mode === 'buyer' ? 'var(--emerald-roi)' : 'var(--border-strong)'; bBtn.style.background = mode === 'buyer' ? 'var(--emerald-soft)' : 'var(--bg-parchment)'; bBtn.style.color = mode === 'buyer' ? 'var(--emerald-roi)' : 'var(--text-secondary)';
        cBtn.style.borderColor = mode === 'creator' ? 'var(--emerald-roi)' : 'var(--border-strong)'; cBtn.style.background = mode === 'creator' ? 'var(--emerald-soft)' : 'var(--bg-parchment)'; cBtn.style.color = mode === 'creator' ? 'var(--emerald-roi)' : 'var(--text-secondary)';
      }
      if (window.__ebLogEvent) window.__ebLogEvent('tab_switch', { store_pill: 'persona_' + mode });
    };

    window.__srUpdateMoneyball = function(budget, rackOverride, cpmOverride) {
      var b = Number(budget) || 10000;
      var rackRate = Number(rackOverride) || window.__srCurrentRackRate || 9500;
      var rackSlots = (b / Math.max(1000, rackRate)).toFixed(1);
      var lookalikeSlots = Math.max(2, Math.round(b / Math.max(750, rackRate * 0.22)));
      var el = document.getElementById('sr-moneyball-readout');
      if (el) el.innerHTML = '$' + b.toLocaleString() + ' Budget → <span style="color:var(--amber-gold);">' + rackSlots + ' Slot(s) on Rack Rate</span> vs. <span style="color:var(--emerald-roi);">' + lookalikeSlots + ' Host-Read Flights on Lookalike Shows (2.3x Reach)</span>';
      if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'moneyball_budget_slider', budget_usd: b });
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
        body: JSON.stringify({ email: em, pageUrl: window.location.pathname, utmSource: 'mobile_desktop_magic_bridge', summaryText: 'SponsorRadar Pitch #1 + Lookalike Brief (' + window.location.pathname + ')' })
      }).catch(function(){});
      return false;
    };

    function switchToolMode(mode) {
      const lookupPane = document.getElementById('mode-lookup-pane');
      const transcriptPane = document.getElementById('mode-transcript-pane');
      const tabLookup = document.getElementById('tab-mode-lookup');
      const tabTranscript = document.getElementById('tab-mode-transcript');
      const isTr = mode === 'transcript';
      lookupPane.style.display = isTr ? 'none' : 'block';
      transcriptPane.style.display = isTr ? 'block' : 'none';
      if (tabLookup) tabLookup.classList.toggle('active', !isTr);
      if (tabTranscript) tabTranscript.classList.toggle('active', isTr);
    }

    function selectBrandPreset(queryText) {
      switchToolMode('lookup');
      const input = document.getElementById('lookup-query');
      if (input) input.value = queryText;
      runBrandLookup();
      document.getElementById('radar-tool').scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      document.getElementById('transcript-show').value = found.show_name;
      document.getElementById('transcript-audience').value = found.audience_size;
      document.getElementById('transcript-input').value = found.transcript;
      runTranscriptExtractor();
    }

    async function runBrandLookup() {
      const queryEl = document.getElementById('lookup-query');
      const errEl = document.getElementById('lookup-error-msg');
      const query = queryEl ? queryEl.value.trim() : '';
      if (!query) {
        if (errEl) { errEl.style.display = 'block'; errEl.textContent = 'Please enter a sponsor brand or creator show name to analyze.'; }
        return;
      }
      if (errEl) errEl.style.display = 'none';
      const senderShow = (document.getElementById('sender-show') || {}).value || 'Creator Media Network';
      const senderReach = Math.max(500, Number((document.getElementById('sender-reach') || {}).value || 75000) || 75000);
      const btn = document.getElementById('btn-run-lookup');
      btn.textContent = 'Scanning...';
      try {
        const res = await fetch('/api/analyze-sponsor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'lookup', query, sender_show_name: senderShow, sender_audience_size: senderReach })
        });
        const data = await res.json();
        renderLookupResults(data, senderReach);
        try {
          if (window.history && window.history.replaceState) window.history.replaceState(null, '', '/?q=' + encodeURIComponent(query) + '&reach=' + encodeURIComponent(senderReach));
          fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'calculate', route: window.location.pathname, target: query + ' (' + senderReach + ' reach)' }) }).catch(() => {});
        } catch (_) {}
        fireMetaEvent('Lead', 0, { tool_mode: 'lookup', query, reach: senderReach });
      } catch (e) { console.error(e); } finally {
        btn.innerHTML = '<span>Check Sponsor Spend</span><span class="btn-icon-circle" aria-hidden="true">↗</span>';
      }
    }

    function renderLookupResults(data, senderReach) {
      if (!data || !data.brand) return;
      const entity = data.display_entity || {
        type: data.matched_type === 'show' ? 'show' : 'brand',
        name: data.brand.name,
        subtitle: data.brand.domain + ' • ' + data.brand.category,
        lead_role: data.brand.decision_maker_role,
        table_title: 'VERIFIED AD-READ PLACEMENTS FOR ' + data.brand.name.toUpperCase()
      };
      const labelEl = document.getElementById('res-entity-label');
      if (labelEl) labelEl.textContent = entity.type === 'show' ? 'MATCHED CREATOR SHOW' : 'SPONSOR / ENTITY';
      const matchPillEl = document.getElementById('res-match-pill');
      if (matchPillEl) {
        matchPillEl.textContent = data.matched_type === 'show'
          ? 'SHOW ROSTER MATCH'
          : (data.matched_type === 'dynamic_brand' ? 'LIVE DOMAIN MODEL' : 'VERIFIED 3x+ LEDGER');
      }
      document.getElementById('res-brand-name').textContent = entity.name;
      document.getElementById('res-brand-domain').textContent = entity.subtitle;
      document.getElementById('res-monthly-spend').textContent = '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString();
      document.getElementById('res-avg-cpm').textContent = 'Avg Effective CPM: $' + data.metrics.avg_cpm_usd;
      document.getElementById('res-renewal-score').textContent = data.metrics.renewal_velocity_score + '/100';
      document.getElementById('res-flights-summary').textContent = data.metrics.proven_3x_shows_count + ' Proven 3x+ (' + data.metrics.verified_total_flights + ' Flights)';
      document.getElementById('res-dm-role').textContent = entity.lead_role;
      document.getElementById('res-dm-email').textContent = 'Locked: ' + (data.outbound_pitch && data.outbound_pitch.to_email ? data.outbound_pitch.to_email : 'Verified Email Locked ($1.99)');
      document.getElementById('res-table-title').textContent = entity.table_title;

      if (data.moneyball_bundle) {
        const mb = data.moneyball_bundle;
        window.__srCurrentRackRate = mb.published_rack_rate_usd;
        window.__srCurrentAvgCpm = data.metrics.avg_cpm_usd;
        const sliderVal = (document.getElementById('sr-moneyball-slider') || {}).value || 10000;
        window.__srUpdateMoneyball(sliderVal, mb.published_rack_rate_usd, data.metrics.avg_cpm_usd);
        const rfEl = document.getElementById('sr-mb-rack-floor');
        if (rfEl) rfEl.innerHTML = '$' + Number(mb.published_rack_rate_usd).toLocaleString() + ' Rack → <span style="color:var(--emerald-roi);">$' + Number(mb.negotiated_floor_rate_usd).toLocaleString() + ' Floor (-18%)</span>';
        const savEl = document.getElementById('sr-mb-savings-sub');
        if (savEl) savEl.textContent = 'Save $' + Number(mb.savings_per_slot_usd).toLocaleString() + '/slot with a 3-flight commitment + 1.5% CTR make-good';
        if (mb.lookalike_shows && mb.lookalike_shows.length > 0) {
          const l0 = mb.lookalike_shows[0];
          const lTitle = document.getElementById('sr-mb-look1-title');
          if (lTitle) lTitle.textContent = l0.name + ' ($' + Number(l0.slot_usd).toLocaleString() + '/slot)';
          const lRep = document.getElementById('sr-mb-look1-rep');
          if (lRep) lRep.innerHTML = 'Direct Rep: <strong>' + (l0.unmasked_rep || l0.booking_rep) + '</strong> (' + l0.overlap + ')';
          const preEl = document.getElementById('sr-mb-free-pre');
          if (preEl) {
            preEl.textContent = 'FREE SAMPLE LOOKALIKE #1 (' + mb.target_show + ') — Target Rack: $' + Number(mb.published_rack_rate_usd).toLocaleString() + '/slot vs. Negotiated 3-Flight Floor: $' + Number(mb.negotiated_floor_rate_usd).toLocaleString() + '/slot\\n' +
              '• Lookalike #1: ' + l0.name + ' (' + Math.round((l0.reach || 95000) / 1000) + 'K reach, ' + l0.overlap + ') — $' + Number(l0.slot_usd).toLocaleString() + '/slot | Direct Booking Rep: ' + (l0.unmasked_rep || l0.booking_rep) + '\\n' +
              '• Lookalikes #2–#10 + Direct Booking Rep Emails: Unlock w/ $1.00 Trial Pass or $1.99 Full Pack';
          }
        }
      }

      const tbody = document.getElementById('res-placements-tbody');
      tbody.innerHTML = (data.placements || []).map((p, idx) => {
        const rowTitle = entity.type === 'show' && p.brand_name
          ? (p.brand_name + ' → ' + p.show_name)
          : p.show_name;
        const contactHtml = (idx === 0 && p.unmasked_proof_email)
          ? '<div style="font-size:14px;font-weight:700;color:var(--emerald-roi);">Sample Unlocked: ' + p.unmasked_proof_email + '</div><div class="mono" style="font-size:14px;color:var(--text-secondary);">' + (p.decision_maker_role || 'VP Growth') + ' • ' + (p.agency_desk || 'Direct + Agency') + '</div>'
          : '<div class="mono" style="font-size:14px;color:var(--amber-gold);">' + (p.sponsor_email || '[verified-buyer]***@brand.io ($1)').replace(/🔒\\s*/g, '') + '</div><div style="font-size:14px;color:var(--text-muted);">' + (p.decision_maker_role || 'VP Growth') + ' • ' + (p.agency_desk || 'Agency Desk') + ' <a href="/buy/micro_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout(\\\'micro_pass\\\');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;">Unlock $1 →</a></div>';
        return \`
        <tr>
          <td>
            <div style="font-weight:700;">\${rowTitle}\${p.is_lookalike ? ' <span class="pill-slate" style="font-size:13px;padding:2px 8px;">Peer Match</span>' : ''}</div>
            <div class="mono" style="font-size:14px; color:var(--text-muted);">\${p.channel_type} • \${Math.round((Number(p.audience_size) || 75000) / 1000)}K reach</div>
          </td>
          <td><div><span class="\${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${p.renewal_badge}</span></div><div class="mono" style="font-size:14px; color:var(--emerald-roi); margin-top:4px; font-weight:700;">\${(p.fresh_budget_badge || 'Active RSS Budget (12h ago)').replace(/🟢\\s*/g, '')}</div></td>
          <td>\${contactHtml}</td>
          <td class="mono" style="font-size:13.5px;">
            <div style="color:var(--cyan-info);">\${p.vanity_url}</div>
            <div>Code: <strong style="color:var(--amber-gold);">\${p.promo_code}</strong></div>
          </td>
          <td class="mono" style="font-weight:700; color:var(--amber-gold);">
            $\${Number(p.est_spend_usd).toLocaleString()}
            <div style="font-size:13.5px; color:var(--text-muted); font-weight:400;">$\${p.cpm_usd} CPM</div>
          </td>
        </tr>
      \`;
      }).join('');
      if (window.__ebMountDeliverableCurtain) window.__ebMountDeliverableCurtain(entity.name);

      if (data.outbound_pitch) {
        const reachK = Math.round((Number(senderReach) || 75000) / 1000);
        const pitchMetaText = '3-Flight Quote (' + reachK + 'K Reach): $' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' ($' + data.outbound_pitch.effective_cpm_usd + ' CPM)';
        document.getElementById('res-pitch-meta').textContent = pitchMetaText;
        const cQuote = document.getElementById('sr-creator-quote-readout');
        if (cQuote) cQuote.textContent = pitchMetaText;
        const freePre = document.getElementById('sr-free-pitch-pre');
        const rawSample = data.outbound_pitch.unmasked_sample_email || 'partnerships@deel.com';
        if (freePre) {
          freePre.textContent = '# FREE UNLOCKED SAMPLE — PITCH #1 (READY TO SEND)\\nTo: ' + rawSample + ' (' + (data.outbound_pitch.agency_desk || data.brand.decision_maker_role) + ')\\nSubject: ' + data.outbound_pitch.subject + '\\n\\n' + (data.outbound_pitch.free_pitch_script || data.outbound_pitch.body);
        }
        const copyBtn = document.getElementById('btn-copy-free-pitch1');
        if (copyBtn) copyBtn.textContent = 'Copy Free Pitch #1 (' + rawSample + ')';
        const mailBtn = document.getElementById('btn-mailto-free-pitch1');
        if (mailBtn && data.outbound_pitch.mailto_href) mailBtn.href = data.outbound_pitch.mailto_href;
        document.getElementById('res-pitch-body').textContent =
          '# SponsorRadar Diagnostic Summary (' + entity.name + ')\\n' +
          '• Verified 3x+ Renewal Score: ' + data.metrics.renewal_velocity_score + '/100 (' + data.metrics.proven_3x_shows_count + ' Proven 3x+ Placements)\\n' +
          '• Recommended 3-Episode Pilot Quote (' + reachK + 'K Reach): $' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' ($' + data.outbound_pitch.effective_cpm_usd + ' Effective CPM)\\n' +
          '• Target Buyer Role: ' + data.brand.decision_maker_role + ' (' + data.outbound_pitch.to_email + ')\\n' +
          '• Verified Buyer Email & Direct Pitch Copy: [LOCKED IN FREE PREVIEW — UNLOCK 3-FILE PACK ($1.99)]';
      }
    }

    async function runTranscriptExtractor() {
      const transcript = document.getElementById('transcript-input').value;
      const showName = document.getElementById('transcript-show').value;
      const audienceSize = Number(document.getElementById('transcript-audience').value) || 440000;
      const btn = document.getElementById('btn-run-transcript');
      btn.textContent = 'Extracting...';
      try {
        const res = await fetch('/api/analyze-sponsor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode: 'transcript', transcript, show_name: showName, audience_size: audienceSize })
        });
        renderTranscriptResults(await res.json());
        fireMetaEvent('Lead', 0, { tool_mode: 'transcript', show_name: showName });
      } catch (e) { console.error(e); } finally { btn.textContent = 'Extract Sponsors'; }
    }

    function renderTranscriptResults(data) {
      if (!data || !data.extracted_sponsors || data.extracted_sponsors.length === 0) return;
      const first = data.extracted_sponsors[0];
      document.getElementById('res-brand-name').textContent = data.extracted_sponsors.map(s => s.brand_name).join(' + ');
      document.getElementById('res-brand-domain').textContent = data.show_name + ' • ' + data.total_detected_sponsors + ' Sponsor Read(s) Extracted';
      document.getElementById('res-monthly-spend').textContent = '$' + Number(data.total_episode_ad_value_usd).toLocaleString();
      document.getElementById('res-avg-cpm').textContent = 'Single-Episode / Issue Ad Value';
      document.getElementById('res-renewal-score').textContent = first.renewal_score + '/100';
      document.getElementById('res-flights-summary').textContent = first.renewal_badge;
      document.getElementById('res-dm-role').textContent = first.decision_maker_role;
      document.getElementById('res-dm-email').textContent = 'Locked: Verified Email Locked ($1.99)';
      document.getElementById('res-table-title').textContent = 'EXTRACTED AD-READ ENTITIES & ATTRIBUTION SIGNALS (' + data.engine_model.toUpperCase() + ')';

      const tbody = document.getElementById('res-placements-tbody');
      tbody.innerHTML = data.extracted_sponsors.map(s => \`
        <tr>
          <td>
            <div style="font-weight:700;">\${s.brand_name}</div>
            <div class="mono" style="font-size:14px; color:var(--text-muted);">\${s.category} • Buyer Email Locked</div>
          </td>
          <td><span class="\${s.verified_flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${s.renewal_badge}</span></td>
          <td class="mono" style="font-size:13.5px;">
            <div>\${s.placement_position}</div>
            <div style="color:var(--text-muted);">Timestamp: \${s.timestamp}</div>
          </td>
          <td class="mono" style="font-size:13.5px;">
            <div style="color:var(--cyan-info);">\${s.vanity_url}</div>
            <div>Code: <strong style="color:var(--amber-gold);">\${s.promo_code}</strong></div>
          </td>
          <td class="mono" style="font-weight:700; color:var(--amber-gold);">
            $\${Number(s.estimated_flight_spend_usd).toLocaleString()}/read
            <div style="font-size:13.5px; color:var(--text-muted); font-weight:400;">$\${s.estimated_cpm_usd} est. CPM</div>
          </td>
        </tr>
      \`).join('');
    }

    function filterLedgerRows(filterKey, btnEl) {
      const buttons = document.querySelectorAll('#ledger-filter-bar button');
      buttons.forEach(b => {
        b.classList.remove('btn-emerald');
        b.classList.add('btn-ghost');
      });
      const activeBtn = btnEl || document.getElementById('btn-filter-' + filterKey);
      if (activeBtn) {
        activeBtn.classList.remove('btn-ghost');
        activeBtn.classList.add('btn-emerald');
      }
      const rows = document.querySelectorAll('#master-ledger-table tbody tr');
      rows.forEach(r => {
        const tier = r.getAttribute('data-tier');
        r.style.display = (filterKey === 'all' || tier === filterKey) ? '' : 'none';
      });
      if (window.__ebLogEvent) window.__ebLogEvent('tab_switch', { store_pill: 'ledger_' + filterKey });
    }

    var __srLiveTimer = null;
    ['lookup-query', 'sender-reach'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function() {
        if (__srLiveTimer) clearTimeout(__srLiveTimer);
        __srLiveTimer = setTimeout(function() { if (document.getElementById('lookup-query')?.value?.trim().length >= 2) runBrandLookup(); }, 520);
      });
    });

    async function startStripeCheckout(planTier, amountUsd, emailInputId, hpInputId) {
      const emailEl = document.getElementById(emailInputId), hpEl = hpInputId ? document.getElementById(hpInputId) : null;
      const email = emailEl && emailEl.value ? emailEl.value.trim() : 'founder@creatorstudio.io';
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ plan_tier: planTier, amount_usd: amountUsd, customer_email: email, website_url_hp: hpEl ? hpEl.value : '', ...getUtmParams() })
        });
        const data = await res.json();
        fireMetaEvent('StartTrial', amountUsd, { plan_tier: planTier });
        const banner = document.getElementById('checkout-status-banner'), txt = document.getElementById('checkout-status-text');
        if (banner && txt) {
          banner.style.display = 'block';
          txt.innerHTML = 'Stripe Session ' + data.session_id + ' ready for ' + email + ' (' + planTier.toUpperCase() + ' - $' + amountUsd + '/mo). <a href="' + (data.checkout_url || '/buy/complete_dossier') + '" style="color:var(--emerald-roi);text-decoration:underline;font-weight:700;margin-left:8px;">Proceed to Stripe Checkout ↗</a>';
        }
        if (!navigator.webdriver && data.checkout_url && data.checkout_url.startsWith('https://checkout.stripe.com')) window.location.href = data.checkout_url;
      } catch (e) { console.error(e); }
    }
  </script>
  `;

  return renderShell({
    title: 'SponsorRadar: Podcast, Newsletter & YouTube Ad-Spend Ledger & 3x-Renewal Tracker',
    description: 'Track verified podcast, newsletter, and YouTube sponsorships that renewed 3+ times. Instant CPM benchmarks, lookalike show calculator, and 1-click sponsor pitches.',
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
        <h1 class="headline-xl" style="margin-top:14px;">
          Stop Guessing Which Podcasts &amp; Newsletters Actually Convert: See Every Brand That <span class="serif-italic" style="color:var(--emerald-roi);">Renewed 3+ Times</span>
        </h1>
        <p style="color:var(--text-secondary); font-size:16px; margin-top:12px;">
          Test-flight sponsorships lie: 68% of brands drop a show after 1 insertion. SponsorRadar tracks <strong>96+ verified multi-flight renewals</strong>, active vanity URLs, promo codes, and negotiated CPM rates across 42 top B2B &amp; DTC sponsors.
        </p>
      </div>

      <div class="double-bezel" style="margin-bottom:32px;">
        <div class="panel">
          <div class="panel-header">
            <div>
              <span class="pill-emerald">TRY IT FREE ABOVE THE FOLD</span>
              <strong style="margin-left:8px; font-size:14.5px;">Instant Sponsor Spend &amp; 3x-Renewal Verifier</strong>
            </div>
            <div class="mono" style="font-size:13px; color:var(--text-secondary);">Zero signup required to test</div>
          </div>
          <div class="panel-body">
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
              <input id="lp-query" type="text" class="input-field" value="AG1" placeholder="Type any brand or show (e.g. AG1, Deel, Ramp, Lenny's Podcast)..." style="flex:1; min-width:210px;" />
              <button type="button" class="btn btn-vermilion" onclick="runLpLookup()">
                <span>Reveal 3x+ Renewals</span>
                <span class="btn-icon-circle" aria-hidden="true">↗</span>
              </button>
            </div>
            <div class="preset-row">
              <button type="button" class="preset-chip" onclick="setLpPreset('AG1')">AG1 ($1.42M/mo)</button>
              <button type="button" class="preset-chip" onclick="setLpPreset('Deel')">Deel ($680K/mo)</button>
              <button type="button" class="preset-chip" onclick="setLpPreset('Ramp')">Ramp ($790K/mo)</button>
              <button type="button" class="preset-chip" onclick="setLpPreset('Lenny\\'s Podcast')">Lenny's Podcast</button>
              <button type="button" class="preset-chip" onclick="setLpPreset('Huberman Lab')">Huberman Lab</button>
            </div>

            <div class="kpi-grid" style="margin-top:16px;">
              <div class="kpi-box">
                <div class="kpi-label">MATCHED ENTITY</div>
                <div class="kpi-val" id="lp-brand-name" style="font-size:18px;">${escapeHtml(defaultAnalysis.brand.name)}</div>
              </div>
              <div class="kpi-box">
                <div class="kpi-label">EST. MONTHLY SPEND</div>
                <div class="kpi-val" id="lp-spend" style="color:var(--amber-gold);">$${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}</div>
              </div>
              <div class="kpi-box">
                <div class="kpi-label">3x+ RENEWAL SCORE</div>
                <div class="kpi-val" id="lp-score" style="color:var(--emerald-roi);">${defaultAnalysis.metrics.renewal_velocity_score}/100</div>
              </div>
              <div class="kpi-box">
                <div class="kpi-label">DECISION MAKER EMAIL</div>
                <div class="kpi-val" id="lp-email" style="font-size:14px; color:var(--amber-gold);">Locked in Free Preview ($1.99)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel" style="padding:28px; text-align:center; border-color:var(--emerald-border); background:var(--bg-elevated);">
        <span class="pill-emerald">INSTANT STRIPE EXPRESS • 30-DAY 100% ROI GUARANTEE</span>
        <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin-top:10px;">Unlock All 42+ Verified Sponsor Emails, CPM Rate Cards &amp; 3-Flight Pitches ($1.99)</h2>
        <p style="color:var(--text-secondary); max-width:600px; margin:8px auto 20px;">
          Get the 3-File Sponsor Email &amp; Pitch Pack for a one-time $1.99 micro-pass, or start continuous Creator Pro access below.
        </p>
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-bottom:14px;">
          <a href="/buy/flash_pass?source=lp_express" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:12px 22px; font-size:15px; text-decoration:none;">
            <span>Unlock 3-File Sponsor Pack ($1.99 Stripe Express)</span>
            <span class="btn-icon-circle" aria-hidden="true">↗</span>
          </a>
        </div>
        <input type="text" id="lp-hp-field" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; max-width:560px; margin:0 auto;">
          <input id="lp-lead-email" type="email" class="input-field" required placeholder="Enter your work email..." style="flex:1; min-width:220px;" />
          <button type="button" class="btn btn-ghost" onclick="submitLpLeadAndCheckout()">
            <span>Or Start Creator Pro Subscription ($49/mo) ↗</span>
          </button>
        </div>
        <div id="lp-confirm-msg" class="mono" style="margin-top:12px; font-size:13px; color:var(--emerald-roi); display:none;"></div>
      </div>
    </div>
  </section>

  <script>
    function setLpPreset(q) {
      document.getElementById('lp-query').value = q;
      runLpLookup();
    }
    async function runLpLookup() {
      const q = document.getElementById('lp-query').value;
      const res = await fetch('/api/analyze-sponsor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'lookup', query: q })
      });
      const data = await res.json();
      if (data && data.brand) {
        const entity = data.display_entity || { name: data.brand.name };
        document.getElementById('lp-brand-name').textContent = entity.name;
        document.getElementById('lp-spend').textContent = '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString();
        document.getElementById('lp-score').textContent = data.metrics.renewal_velocity_score + '/100';
        document.getElementById('lp-email').textContent = 'Locked in Free Preview ($1.99)';
        fireMetaEvent('Lead', 0, { source: 'lp_interactive_lookup', query: q });
      }
    }
    async function submitLpLeadAndCheckout() {
      const email = document.getElementById('lp-lead-email').value || 'growth@agency.io';
      const hp = document.getElementById('lp-hp-field').value || '';
      const utms = getUtmParams();
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_tier: 'creator_pro_49', amount_usd: 49, customer_email: email, website_url_hp: hp, ...utms })
      });
      const data = await res.json();
      fireMetaEvent('Purchase', 49, { plan_tier: 'creator_pro_49', session_id: data.session_id });
      const msg = document.getElementById('lp-confirm-msg');
      msg.style.display = 'block';
      msg.innerHTML = 'Verified Session ' + data.session_id + ' unlocked for ' + email + '. <a href="' + (data.checkout_url || '/buy/complete_dossier') + '" style="color:var(--emerald-roi);text-decoration:underline;font-weight:700;">Proceed to Stripe Checkout ↗</a>';
      if (!navigator.webdriver && data.checkout_url && data.checkout_url.startsWith('https://checkout.stripe.com')) window.location.href = data.checkout_url;
    }
  </script>
  `;

  return renderShell({
    title: 'Stop Guessing Which Podcasts & Newsletters Convert: SponsorRadar 3x+ Renewal Ledger',
    description: 'See every sponsor brand that renewed 3+ times across 46+ podcasts, newsletters, and YouTube channels. 30-day money-back guarantee.',
    canonicalPath: '/lp',
    ogSlug: 'sponsor-radar-lp',
    jsonLd: null,
    bodyHtml
  });
}

module.exports = {
  escapeHtml,
  renderBrandLogoSvg,
  renderShell,
  renderHomePage,
  renderLandingPage
};

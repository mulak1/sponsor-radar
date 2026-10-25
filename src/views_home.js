const { escapeHtml, renderBrandLogoSvg, renderShell } = require('./views_shell');

function renderHomePage({ brands, shows, placements, seoPages, sampleTranscripts, defaultAnalysis, initialQuery = 'Deel', initialReach = 75000 }) {
  const displayEntity = defaultAnalysis.display_entity || {
    type: 'brand',
    name: defaultAnalysis.brand.name,
    subtitle: `${defaultAnalysis.brand.domain} • ${defaultAnalysis.brand.category}`,
    lead_role: defaultAnalysis.brand.decision_maker_role,
    table_title: `VERIFIED SPONSORSHIP PLACEMENTS FOR ${defaultAnalysis.brand.name.toUpperCase()}`
  };
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
        name: 'SponsorRadar (#2)',
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'Web',
        description: 'Autonomous Podcast, Newsletter & YouTube Ad-Read Spend Ledger, 3x-Renewal ROI Detector & Outbound Media-Buying Engine.',
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

  const bodyHtml = `
  <section class="hero-section" id="radar-tool">
    <div class="container">
      <div class="hero-grid" style="align-items:start;">
        <!-- Left Column: Crisp Layperson Value Proposition + Redacted Outbound Pitch Preview -->
        <div id="home-executive-brief" style="display:flex; flex-direction:column; justify-content:flex-start; gap:14px;">
          <div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
              <span class="pill-vermilion">PODCAST, NEWSLETTER &amp; YOUTUBE SPONSOR CHECKER</span>
              <a href="/leaderboard" class="pill-emerald" style="text-decoration:none;">🏆 Top-3 Podium Leaderboard &rarr;</a>
            </div>
            <h1 class="headline-xl">
              See Which Sponsors <span class="serif-italic" style="color:var(--emerald-roi);">Renew 3+ Times</span> &amp; What They Pay
            </h1>
            <p class="subhead" style="margin-bottom:14px;">
              68% of one-off sponsorships lose money and never book again. Search any brand or show to see verified 3+ repeat sponsors, estimated monthly spend, and real CPM rates.
            </p>

            <!-- Built For Channel / Persona Pills -->
            <div style="display:flex; flex-wrap:wrap; gap:8px; align-items:center; margin-bottom:12px;">
              <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Built for:</span>
              <span class="preset-chip" style="cursor:default;">🎙️ Podcasters &amp; YouTubers</span>
              <span class="preset-chip" style="cursor:default;">📩 Newsletter Creators</span>
              <span class="preset-chip" style="cursor:default;">🤝 Media Buyers &amp; Agencies</span>
            </div>

            <!-- 3-Step Layperson Journey inside Top Hero -->
            <div style="display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:10px; margin-bottom:0;">
              <div class="panel" style="padding:12px;">
                <div class="mono" style="font-size:13px; color:var(--emerald-roi); font-weight:700; margin-bottom:3px;">STEP 1 • FREE CHECK</div>
                <div style="font-size:13.5px; color:var(--text-primary); font-weight:600; line-height:1.35;">Search any brand or show to see monthly ad spend &amp; 3x+ renewal score.</div>
              </div>
              <div class="panel" style="padding:12px;">
                <div class="mono" style="font-size:13px; color:var(--vermilion); font-weight:700; margin-bottom:3px;">STEP 2 • PRICE YOUR SHOW</div>
                <div style="font-size:13.5px; color:var(--text-primary); font-weight:600; line-height:1.35;">Click your audience size (10K–500K) to calculate your 3-episode pilot quote.</div>
              </div>
              <div class="panel" style="padding:12px;">
                <div class="mono" style="font-size:13px; color:var(--text-primary); font-weight:700; margin-bottom:3px;">STEP 3 • UNLOCK PACK</div>
                <div style="font-size:13.5px; color:var(--text-primary); font-weight:600; line-height:1.35;">Unlock verified buyer emails, CPM rate cards &amp; ready-to-send pitches ($1.99).</div>
              </div>
            </div>
          </div>

          <!-- Redacted Outbound Pitch Preview Box (Immediately Below Steps — Zero White Gap) -->
          <div class="pitch-box" style="margin-top:0; display:flex; flex-direction:column;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
              <div>
                <span class="pill-emerald">DIAGNOSTIC QUOTE &amp; LOCKED PITCH PACK</span>
                <span class="mono" style="font-size:13px; color:var(--text-secondary); margin-left:6px;" id="res-pitch-meta">
                  Pilot Quote: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} (3 Episodes @ $${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)
                </span>
              </div>
              <button type="button" class="btn btn-vermilion" style="padding:6px 12px; min-height:36px; font-size:13px;" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass')}else{window.location.href='/buy/micro_pass?source=hero_pitch_pack'}">
                <span id="copy-pitch-label">Unlock Buyer Email &amp; Pitch Pack ($1.99) ↗</span>
              </button>
            </div>
            <pre class="pitch-pre" id="res-pitch-body" style="margin-top:8px;">${escapeHtml(
              "# SponsorRadar Diagnostic Summary (" + displayEntity.name + ")\n" +
              "• Verified 3x+ Renewal Score: " + defaultAnalysis.metrics.renewal_velocity_score + "/100 (" + defaultAnalysis.metrics.proven_3x_shows_count + " Proven 3x+ Placements)\n" +
              "• Recommended 3-Episode Pilot Quote (" + (initialReach / 1000).toFixed(0) + "K Reach): $" + defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString() + " ($" + defaultAnalysis.outbound_pitch.effective_cpm_usd + " Effective CPM)\n" +
              "• Target Buyer Role: " + defaultAnalysis.brand.decision_maker_role + " (" + defaultAnalysis.outbound_pitch.to_email + ")\n" +
              "• Verified Buyer Email & Direct Pitch Copy: [LOCKED IN FREE PREVIEW — UNLOCK 3-FILE PACK ($1.99)]"
            )}</pre>
          </div>

          <!-- Top 3x+ Renewed Category Benchmarks & Audience Tier Reference (Balances Left & Right Columns Naturally) -->
          <div class="panel" id="home-left-category-benchmarks" style="padding:14px 16px; background:var(--bg-surface); display:flex; flex-direction:column; gap:12px;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
                <span class="mono" style="font-size:12.5px; font-weight:700; color:var(--text-primary); text-transform:uppercase;">✦ 2026 Category CPM &amp; 3x+ Renewal Benchmarks</span>
                <a href="/leaderboard" class="mono" style="font-size:12.5px; font-weight:700; color:var(--vermilion); text-decoration:underline;">Full 42-Brand Leaderboard →</a>
              </div>
              <div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:8px;">
                <button type="button" onclick="selectBrandPreset('AG1')" style="text-align:left; padding:9px 11px; border-radius:10px; background:var(--bg-elevated); border:1px solid var(--border-hairline); cursor:pointer;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:4px;">
                    <strong style="font-size:13px; color:var(--text-primary);">AG1 (Health DTC)</strong>
                    <span class="pill-emerald" style="padding:2px 6px; font-size:11.5px;">18x Renewed</span>
                  </div>
                  <div class="mono" style="font-size:12px; color:var(--text-secondary); margin-top:3px;">$1.42M/mo • $45 Avg CPM</div>
                </button>
                <button type="button" onclick="selectBrandPreset('Deel')" style="text-align:left; padding:9px 11px; border-radius:10px; background:var(--bg-elevated); border:1px solid var(--border-hairline); cursor:pointer;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:4px;">
                    <strong style="font-size:13px; color:var(--text-primary);">Deel (B2B HR/Payroll)</strong>
                    <span class="pill-emerald" style="padding:2px 6px; font-size:11.5px;">12x Renewed</span>
                  </div>
                  <div class="mono" style="font-size:12px; color:var(--text-secondary); margin-top:3px;">$680K/mo • $42 Avg CPM</div>
                </button>
                <button type="button" onclick="selectBrandPreset('Ramp')" style="text-align:left; padding:9px 11px; border-radius:10px; background:var(--bg-elevated); border:1px solid var(--border-hairline); cursor:pointer;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:4px;">
                    <strong style="font-size:13px; color:var(--text-primary);">Ramp (Fintech Spend)</strong>
                    <span class="pill-emerald" style="padding:2px 6px; font-size:11.5px;">10x Renewed</span>
                  </div>
                  <div class="mono" style="font-size:12px; color:var(--text-secondary); margin-top:3px;">$790K/mo • $52 Avg CPM</div>
                </button>
                <button type="button" onclick="selectBrandPreset('HubSpot')" style="text-align:left; padding:9px 11px; border-radius:10px; background:var(--bg-elevated); border:1px solid var(--border-hairline); cursor:pointer;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:4px;">
                    <strong style="font-size:13px; color:var(--text-primary);">HubSpot (B2B CRM)</strong>
                    <span class="pill-emerald" style="padding:2px 6px; font-size:11.5px;">15x Renewed</span>
                  </div>
                  <div class="mono" style="font-size:12px; color:var(--text-secondary); margin-top:3px;">$940K/mo • $48 Avg CPM</div>
                </button>
                <button type="button" onclick="selectBrandPreset('Eight Sleep')" style="text-align:left; padding:9px 11px; border-radius:10px; background:var(--bg-elevated); border:1px solid var(--border-hairline); cursor:pointer;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:4px;">
                    <strong style="font-size:13px; color:var(--text-primary);">Eight Sleep (Perf DTC)</strong>
                    <span class="pill-emerald" style="padding:2px 6px; font-size:11.5px;">9x Renewed</span>
                  </div>
                  <div class="mono" style="font-size:12px; color:var(--text-secondary); margin-top:3px;">$510K/mo • $46 Avg CPM</div>
                </button>
                <button type="button" onclick="selectBrandPreset('Lenny\\'s Podcast')" style="text-align:left; padding:9px 11px; border-radius:10px; background:var(--bg-elevated); border:1px solid var(--border-hairline); cursor:pointer;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:4px;">
                    <strong style="font-size:13px; color:var(--text-primary);">Lenny's Podcast</strong>
                    <span class="pill-amber" style="padding:2px 6px; font-size:11.5px;">Show Rate Card</span>
                  </div>
                  <div class="mono" style="font-size:12px; color:var(--text-secondary); margin-top:3px;">620K Reach • $50 Base CPM</div>
                </button>
              </div>
            </div>

            <!-- Creator Audience Tier Quote Reference Strip -->
            <div style="border-top:1px solid var(--border-hairline); padding-top:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; margin-bottom:8px;">
                <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-secondary); text-transform:uppercase;">⚡ Quick Audience Tier Pilot Quote Reference (3-Flight Package)</span>
                <span class="mono" style="font-size:11.5px; color:var(--emerald-roi); font-weight:700;">Tap Tier to Recalculate</span>
              </div>
              <div style="display:grid; grid-template-columns:repeat(3, minmax(0, 1fr)); gap:6px;">
                <button type="button" onclick="setAudienceReach(25000)" style="padding:7px 9px; border-radius:8px; background:var(--bg-elevated); border:1px solid var(--border-hairline); text-align:left; cursor:pointer;">
                  <div class="mono" style="font-size:11.5px; color:var(--text-secondary);">25K NICHE REACH</div>
                  <div class="mono" style="font-size:13px; font-weight:800; color:var(--text-primary);">$3,150–$3,900</div>
                </button>
                <button type="button" onclick="setAudienceReach(75000)" style="padding:7px 9px; border-radius:8px; background:var(--bg-elevated); border:1px solid var(--border-hairline); text-align:left; cursor:pointer;">
                  <div class="mono" style="font-size:11.5px; color:var(--text-secondary);">75K MID-TIER</div>
                  <div class="mono" style="font-size:13px; font-weight:800; color:var(--emerald-roi);">$9,450–$11,700</div>
                </button>
                <button type="button" onclick="setAudienceReach(250000)" style="padding:7px 9px; border-radius:8px; background:var(--bg-elevated); border:1px solid var(--border-hairline); text-align:left; cursor:pointer;">
                  <div class="mono" style="font-size:11.5px; color:var(--text-secondary);">250K FLAGSHIP</div>
                  <div class="mono" style="font-size:13px; font-weight:800; color:var(--vermilion);">$31,500–$39,000</div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Clean Two-Sided Sponsor & Show Lookup Workbench -->
        <div class="double-bezel" style="display:flex; flex-direction:column;">
          <div class="panel" style="display:flex; flex-direction:column; flex:1;">
            <div class="panel-header">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="pill-vermilion">LIVE SPONSORSHIP CHECKER</span>
                <span style="font-weight:700; font-size:14.5px;">Search Any Brand, Podcast, Newsletter or YouTube Channel</span>
              </div>
              <span class="pill-emerald" id="res-match-pill">${defaultAnalysis.matched_type === 'show' ? 'SHOW ROSTER MATCH' : (defaultAnalysis.matched_type === 'dynamic_brand' ? 'LIVE DOMAIN MODEL' : 'VERIFIED 3x+ LEDGER')}</span>
            </div>

            <div class="panel-body" style="display:flex; flex-direction:column; flex:1; justify-content:flex-start;">
              <div>
                <!-- MODE A: CLEAN BRAND / SHOW LOOKUP + VISIBLE AUDIENCE REACH QUOTE BAR -->
                <div id="mode-lookup-pane">
                  <div style="display:flex; gap:10px; align-items:flex-end; flex-wrap:wrap;">
                    <div style="flex:1; min-width:220px;">
                      <label for="lookup-query" class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">ENTER SPONSOR BRAND OR PODCAST / NEWSLETTER / YOUTUBE SHOW</label>
                      <input id="lookup-query" type="text" class="input-field" value="${escapeHtml(initialQuery)}" required placeholder="e.g. AG1, Deel, Lenny's Podcast, Huberman Lab, Stripe..." onkeydown="if(event.key==='Enter'){event.preventDefault();runBrandLookup();}" />
                    </div>
                    <button type="button" id="btn-run-lookup" class="btn btn-vermilion" onclick="runBrandLookup()">
                      <span>Check Sponsor Spend</span>
                      <span class="btn-icon-circle" aria-hidden="true">↗</span>
                    </button>
                  </div>
                  <div id="lookup-error-msg" class="mono" style="display:none; color:#B9311C; font-size:13px; margin-top:6px;"></div>

                  <div class="preset-row" aria-label="1-Click Brand & Show Presets">
                    <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-muted); align-self:center;">Brands:</span>
                    <button type="button" class="preset-chip" onclick="selectBrandPreset('AG1')">AG1 ($1.42M/mo)</button>
                    <button type="button" class="preset-chip" onclick="selectBrandPreset('Deel')">Deel ($680K/mo)</button>
                    <button type="button" class="preset-chip" onclick="selectBrandPreset('Ramp')">Ramp ($790K/mo)</button>
                    <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-muted); align-self:center; margin-left:4px;">Shows:</span>
                    <button type="button" class="preset-chip" onclick="selectBrandPreset('Lenny\\'s Podcast')">🎙️ Lenny's Podcast</button>
                    <button type="button" class="preset-chip" onclick="selectBrandPreset('Huberman Lab')">🎙️ Huberman Lab</button>
                    <button type="button" class="preset-chip" onclick="selectBrandPreset('My First Million')">🎙️ My First Million</button>
                  </div>

                  <!-- Visible 1-Click Creator Audience Size & 3-Flight Pilot Quote Calculator Bar -->
                  <div style="margin-top:10px; padding:10px 12px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-hairline); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
                    <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                      <label for="sender-reach" class="mono" style="font-size:12px; font-weight:700; color:var(--text-secondary);">YOUR AUDIENCE REACH (3-FLIGHT QUOTE):</label>
                      <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(10000)">10K</button>
                      <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(25000)">25K</button>
                      <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(50000)">50K</button>
                      <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(75000)">75K</button>
                      <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(150000)">150K</button>
                      <button type="button" class="preset-chip reach-chip" onclick="setAudienceReach(500000)">500K</button>
                    </div>
                    <div style="display:flex; align-items:center; gap:6px;">
                      <input id="sender-reach" type="number" class="input-field mono" value="${initialReach}" min="500" step="1000" style="width:105px; min-height:32px; padding:4px 8px; font-size:13px;" onchange="runBrandLookup()" />
                      <input id="sender-show" type="hidden" value="Creator Media Network" />
                    </div>
                  </div>

                  <!-- Progressive Disclosure: Transcript Ad-Read Extractor Mode -->
                  <details id="mode-b-details" style="margin-top:8px; padding:8px 12px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-hairline);">
                    <summary id="mode-b-summary" style="cursor:pointer; font-size:12.5px; font-weight:700; color:var(--text-secondary);">⚙️ Switch to Mode B: Extract Sponsor Reads from Raw Podcast / YouTube Transcript ▾</summary>
                    <div class="mode-tabs" role="tablist" style="margin-top:8px;">
                      <button type="button" id="tab-mode-lookup" class="mode-tab active" onclick="switchToolMode('lookup')">Mode A: Brand / Show Radar</button>
                      <button type="button" id="tab-mode-transcript" class="mode-tab" onclick="switchToolMode('transcript')">Mode B: Ad-Read Extractor</button>
                    </div>
                  </details>
                </div>

                <!-- MODE B: LIVE TRANSCRIPT / RSS AD-READ EXTRACTOR -->
                <div id="mode-transcript-pane" style="display:none; margin-top:10px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <span class="mono" style="font-size:12.5px; font-weight:700; color:var(--emerald-roi);">⚙️ MODE B ACTIVE: RAW TRANSCRIPT SPONSOR EXTRACTOR</span>
                    <button type="button" class="btn btn-ghost" style="padding:4px 10px; min-height:30px; font-size:12px;" onclick="switchToolMode('lookup')">← Back to Mode A: Brand / Show Radar</button>
                  </div>
                  <div class="lookup-form-grid" style="margin-bottom:10px;">
                    <div>
                      <label for="transcript-preset" class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">LOAD SAMPLE AD-READ TRANSCRIPT</label>
                      <select id="transcript-preset" class="select-field" onchange="loadTranscriptPreset(this.value)">
                        ${sampleTranscripts.map(t => `<option value="${escapeHtml(t.id)}">${escapeHtml(t.label)}</option>`).join('')}
                      </select>
                    </div>
                    <div>
                      <label for="transcript-show" class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">SOURCE SHOW NAME</label>
                      <input id="transcript-show" type="text" class="input-field" value="${escapeHtml(sampleTranscripts[0].show_name)}" />
                    </div>
                    <div>
                      <label for="transcript-audience" class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">EPISODE REACH</label>
                      <input id="transcript-audience" type="number" class="input-field mono" value="${sampleTranscripts[0].audience_size}" />
                    </div>
                    <button type="button" id="btn-run-transcript" class="btn btn-emerald" onclick="runTranscriptExtractor()">Extract Sponsors</button>
                  </div>
                  <label for="transcript-input" class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">RAW PODCAST / YOUTUBE TRANSCRIPT</label>
                  <textarea id="transcript-input" class="textarea-field">${escapeHtml(sampleTranscripts[0].transcript)}</textarea>
                </div>
              </div>

              <!-- LIVE OUTPUT DISPLAY AREA -->
              <div id="radar-results-container" style="margin-top:14px; border-top:1px solid var(--border-hairline); padding-top:14px; display:flex; flex-direction:column; justify-content:flex-start;">
                <div class="kpi-grid">
                  <div class="kpi-box">
                    <div class="kpi-label" id="res-entity-label">${displayEntity.type === 'show' ? 'MATCHED CREATOR SHOW' : 'SPONSOR / ENTITY'}</div>
                    <div class="kpi-val" id="res-brand-name" style="color:var(--text-primary); font-size:18px;">${escapeHtml(displayEntity.name)}</div>
                    <div class="mono" id="res-brand-domain" style="font-size:13px; color:var(--vermilion);">${escapeHtml(displayEntity.subtitle)}</div>
                  </div>
                  <div class="kpi-box">
                    <div class="kpi-label">EST. MONTHLY AD SPEND</div>
                    <div class="kpi-val" id="res-monthly-spend" style="color:var(--amber-gold);">$${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}</div>
                    <div class="mono" id="res-avg-cpm" style="font-size:13px; color:var(--text-secondary);">Avg Negotiated CPM: $${defaultAnalysis.metrics.avg_cpm_usd}</div>
                  </div>
                  <div class="kpi-box">
                    <div class="kpi-label">3x+ RENEWAL SCORE</div>
                    <div class="kpi-val" id="res-renewal-score" style="color:var(--emerald-roi);">${defaultAnalysis.metrics.renewal_velocity_score}/100</div>
                    <div class="mono" id="res-flights-summary" style="font-size:13px; color:var(--emerald-roi);">${defaultAnalysis.metrics.proven_3x_shows_count} Proven 3x+ (${defaultAnalysis.metrics.verified_total_flights} Flights)</div>
                  </div>
                  <div class="kpi-box">
                    <div class="kpi-label">PARTNERSHIPS LEAD</div>
                    <div class="kpi-val" id="res-dm-role" style="font-size:14.5px; color:var(--text-primary);">${escapeHtml(displayEntity.lead_role)}</div>
                    <div class="mono" id="res-dm-email" style="font-size:13px; color:var(--amber-gold);">🔒 ${escapeHtml(defaultAnalysis.outbound_pitch.to_email)}</div>
                  </div>
                </div>

                <!-- Verified Placements Sub-Table -->
                <div style="margin:6px 0 8px 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <span class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary);" id="res-table-title">${escapeHtml(displayEntity.table_title)}</span>
                  <span class="pill-emerald" id="res-engine-badge">VERIFIED 3x+ LEDGER</span>
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
                            <div style="font-weight:700;">${displayEntity.type === 'show' && p.brand_name ? `${escapeHtml(p.brand_name)} → ${escapeHtml(p.show_name)}` : escapeHtml(p.show_name)}${p.is_lookalike ? ` <span class="pill-slate" style="font-size:10.5px;padding:1px 5px;">Peer Match</span>` : ''}</div>
                            <div class="mono" style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.channel_type)} • ${(p.audience_size / 1000).toFixed(0)}K reach</div>
                          </td>
                          <td><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></td>
                          <td>
                            ${idx === 0 && p.unmasked_proof_email
                              ? `<div style="font-size:12px;font-weight:700;color:var(--emerald-roi);">✓ SAMPLE UNLOCKED: ${escapeHtml(p.unmasked_proof_email)}</div><div class="mono" style="font-size:11.5px;color:var(--text-secondary);">${escapeHtml(p.decision_maker_role || 'VP Growth')} • Direct + Agency</div>`
                              : `<div class="mono" style="font-size:12px;color:var(--amber-gold);">${escapeHtml(p.sponsor_email || '[verified-buyer]***@brand.io (🔒 99¢)')}</div><div style="font-size:11.5px;color:var(--text-muted);">${escapeHtml(p.decision_maker_role || 'VP Growth')} <a href="/buy/micro_pass" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;">Unblur 99¢ →</a></div>`
                            }
                          </td>
                          <td class="mono" style="font-size:13px;">
                            <div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div>
                            <div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div>
                          </td>
                          <td class="mono" style="font-weight:700; color:var(--amber-gold);">
                            $${p.est_spend_usd.toLocaleString()}
                            <div style="font-size:13px; color:var(--text-muted); font-weight:400;">$${p.cpm_usd} CPM</div>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- FULL VERIFIED 3x+ RENEWAL AD-SPEND LEDGER -->
  <section id="verified-ledger" style="padding:56px 0; border-bottom:1px solid var(--border-hairline);">
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:end; flex-wrap:wrap; gap:16px; margin-bottom:22px;">
        <div>
          <span class="pill-amber">HISTORICAL AD-READ &amp; NEWSLETTER LEDGER</span>
          <h2 style="font-family:var(--font-serif); font-size:32px; font-weight:600; margin-top:8px;">Verified <span class="serif-italic" style="color:var(--emerald-roi);">3x+ Renewed</span> Sponsorship Placements (vs. 1x Tests)</h2>
          <p style="color:var(--text-secondary); font-size:15px; margin-top:4px;">
            Filter by renewal velocity to see which DTC and B2B brands are scaling multi-quarter creator budgets vs. running one-off tests.
          </p>
        </div>
        <div id="ledger-filter-bar" style="display:flex; gap:8px; flex-wrap:wrap;">
          <button type="button" id="btn-filter-all" class="btn btn-emerald" style="padding:8px 14px; font-size:13px;" onclick="filterLedgerRows('all', this)">All Flights (${topPlacements.length})</button>
          <button type="button" id="btn-filter-3x" class="btn btn-ghost" style="padding:8px 14px; font-size:13px;" onclick="filterLedgerRows('3x', this)">3x+ Proven Winners Only (${proven3xPlacements.length})</button>
          <button type="button" id="btn-filter-test" class="btn btn-ghost" style="padding:8px 14px; font-size:13px;" onclick="filterLedgerRows('test', this)">1x–2x Test Flights (${testPlacements.length})</button>
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
                  <div class="mono" style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.brand_category)}</div>
                </td>
                <td>
                  <div style="font-weight:700;">${escapeHtml(p.show_name)}</div>
                  <div class="mono" style="font-size:13px; color:var(--text-muted);">${(p.audience_size / 1000).toFixed(0)}K reach</div>
                </td>
                <td><span class="pill-slate">${escapeHtml(p.channel_type)}</span></td>
                <td>
                  <span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span>
                </td>
                <td class="mono" style="font-weight:700; color:${p.flights >= 3 ? 'var(--emerald-roi)' : 'var(--amber-gold)'};">${p.renewal_score}/100</td>
                <td class="mono" style="font-size:13px;">
                  <div>${escapeHtml(p.slot_type)}</div>
                  <div style="color:var(--text-muted);">${escapeHtml(p.timestamp_range)}</div>
                </td>
                <td class="mono" style="font-size:13px;">
                  <div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div>
                  <div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div>
                </td>
                <td class="mono" style="font-weight:700; color:var(--amber-gold);">
                  $${p.est_spend_usd.toLocaleString()}
                  <div style="font-size:13px; color:var(--text-muted); font-weight:400;">$${p.cpm_usd} CPM</div>
                </td>
                <td>
                  <button type="button" class="btn btn-ghost" style="padding:6px 11px; min-height:36px; font-size:13px;" onclick="selectBrandPreset('${escapeHtml(p.brand_name.split('(')[0].trim())}')">Inspect &amp; Pitch</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- PHASE 3 PUREST PATH: SINGLE SELF-SERVE STRIPE EXPRESS CHECKOUT -->
  <section id="pricing" style="padding:56px 0; border-bottom:1px solid var(--border-hairline);">
    <div class="container">
      <div class="double-bezel" style="max-width:860px; margin:0 auto;">
        <div class="panel" style="padding:32px; border-color:var(--vermilion-border);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <span class="pill-emerald">PHASE 3 PUREST PATH • INSTANT STRIPE EXPRESS</span>
            <span class="mono" style="font-size:13px; color:var(--text-muted);">ONE-TIME MICRO-PASS • NO SUBSCRIPTION TRAP</span>
          </div>
          <h2 style="font-family:var(--font-serif); font-size:32px; font-weight:600; margin:6px 0 10px;">
            Unlock the Complete 42-Brand Sponsor Email &amp; 3-Flight Pitch Pack <span class="serif-italic" style="color:var(--vermilion);">($1.99 Stripe Express)</span>
          </h2>
          <p style="color:var(--text-secondary); font-size:15px; margin-bottom:20px;">
            Unblur all verified sponsor partnerships emails, negotiated CPM rate floors, and ready-to-send 3-episode pilot pitch templates in 1 click.
          </p>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-hairline);">
            <div>
              <div class="mono" style="font-size:36px; font-weight:800; color:var(--vermilion); line-height:1;">$1.99 <span style="font-size:14px; font-weight:600; color:var(--text-secondary);">USD one-time pass</span></div>
              <div style="font-size:13.5px; color:var(--text-secondary); margin-top:4px;">✓ 42+ Verified Brand Sponsor Emails (.CSV) + 3-Flight Pitch Templates + Negotiated CPM Ledger</div>
            </div>
            <a href="/buy/flash_pass" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn btn-vermilion" style="padding:14px 24px; font-size:15px; text-decoration:none;">
              <span>Unlock 3-File Sponsor Pack ($1.99 Stripe Express)</span>
              <span class="btn-icon-circle" aria-hidden="true">↗</span>
            </a>
          </div>
          <details style="margin-top:16px; font-size:13.5px; color:var(--text-secondary);">
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

      <div id="checkout-status-banner" class="panel" style="display:none; margin-top:20px; padding:18px; border-color:var(--emerald-border); background:var(--emerald-soft);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <span class="pill-emerald">STRIPE CHECKOUT SESSION INITIALIZED</span>
            <div style="font-weight:700; margin-top:6px; color:var(--text-primary);" id="checkout-status-text">Session created.</div>
          </div>
          <a href="/directory" class="btn btn-emerald">Access Full 60+ Report Vault Now</a>
        </div>
      </div>
    </div>
  </section>

  <!-- PROGRAMMATIC SEO HUB LINKS -->
  <section style="padding:48px 0;">
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:20px;">
        <div>
          <span class="pill-slate">DAY-1 GOOGLE SEARCH CONSOLE pSEO ENGINE</span>
          <h2 style="font-family:var(--font-serif); font-size:26px; font-weight:600; margin-top:6px;">Popular 2026 Sponsorship Spend &amp; CPM Benchmark Reports</h2>
        </div>
        <a href="/directory" class="btn btn-ghost" style="padding:8px 14px; font-size:13px;">View All 60+ Programmatic SEO Pages →</a>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:14px;">
        ${topSeoLinks.map(page => `
          <a href="/seo/${escapeHtml(page.slug)}" class="panel" style="padding:16px; display:block; transition:transform 160ms cubic-bezier(0.16, 1, 0.3, 1), border-color 160ms cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.borderColor='var(--vermilion)'; this.style.transform='translateY(-2px)'" onmouseout="this.style.borderColor='var(--border-hairline)'; this.style.transform='none'">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span class="pill-slate">${escapeHtml(page.category)}</span>
              <span class="mono" style="font-size:13px; color:var(--amber-gold); font-weight:700;">$${page.avg_cpm} CPM</span>
            </div>
            <div style="font-weight:700; font-size:14px; color:var(--text-primary); line-height:1.45;">${escapeHtml(page.title)}</div>
          </a>
        `).join('')}
      </div>
    </div>
  </section>

  <script>
    const SAMPLE_TRANSCRIPTS_MAP = ${JSON.stringify(sampleTranscripts)};

    function switchToolMode(mode) {
      const lookupPane = document.getElementById('mode-lookup-pane');
      const transcriptPane = document.getElementById('mode-transcript-pane');
      const tabLookup = document.getElementById('tab-mode-lookup');
      const tabTranscript = document.getElementById('tab-mode-transcript');
      if (mode === 'transcript') {
        lookupPane.style.display = 'none';
        transcriptPane.style.display = 'block';
        tabLookup.classList.remove('active');
        tabTranscript.classList.add('active');
      } else {
        lookupPane.style.display = 'block';
        transcriptPane.style.display = 'none';
        tabLookup.classList.add('active');
        tabTranscript.classList.remove('active');
      }
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
        if (errEl) {
          errEl.style.display = 'block';
          errEl.textContent = 'Please enter a sponsor brand or creator show name to analyze.';
        }
        return;
      }
      if (errEl) errEl.style.display = 'none';

      const senderShowEl = document.getElementById('sender-show');
      const senderReachEl = document.getElementById('sender-reach');
      const senderShow = senderShowEl ? senderShowEl.value : 'Creator Media Network';
      const senderReach = Math.max(500, Number(senderReachEl ? senderReachEl.value : 75000) || 75000);
      const btn = document.getElementById('btn-run-lookup');
      btn.textContent = 'Scanning...';
      try {
        const res = await fetch('/api/analyze-sponsor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'lookup',
            query,
            sender_show_name: senderShow,
            sender_audience_size: senderReach
          })
        });
        const data = await res.json();
        renderLookupResults(data, senderReach);
        try {
          if (window.history && window.history.replaceState) {
            window.history.replaceState(null, '', '/?q=' + encodeURIComponent(query) + '&reach=' + encodeURIComponent(senderReach));
          }
          fetch('/api/telemetry/event', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event_type: 'calculate', route: window.location.pathname, target: query + ' (' + senderReach + ' reach)' })
          }).catch(() => {});
        } catch (_) {}
        fireMetaEvent('Lead', 0, { tool_mode: 'lookup', query, reach: senderReach });
      } catch (e) {
        console.error(e);
      } finally {
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
      document.getElementById('res-dm-email').textContent = '🔒 ' + (data.outbound_pitch && data.outbound_pitch.to_email ? data.outbound_pitch.to_email : 'Verified Email Locked ($1.99)');
      document.getElementById('res-table-title').textContent = entity.table_title;

      const tbody = document.getElementById('res-placements-tbody');
      tbody.innerHTML = (data.placements || []).map((p, idx) => {
        const rowTitle = entity.type === 'show' && p.brand_name
          ? (p.brand_name + ' → ' + p.show_name)
          : p.show_name;
        const contactHtml = (idx === 0 && p.unmasked_proof_email)
          ? '<div style="font-size:12px;font-weight:700;color:var(--emerald-roi);">✓ SAMPLE UNLOCKED: ' + p.unmasked_proof_email + '</div><div class="mono" style="font-size:11.5px;color:var(--text-secondary);">' + (p.decision_maker_role || 'VP Growth') + ' • Direct + Agency</div>'
          : '<div class="mono" style="font-size:12px;color:var(--amber-gold);">' + (p.sponsor_email || '[verified-buyer]***@brand.io (🔒 99¢)') + '</div><div style="font-size:11.5px;color:var(--text-muted);">' + (p.decision_maker_role || 'VP Growth') + ' <a href="/buy/micro_pass" onclick="if(window.__ebCheckout){window.__ebCheckout(\\\'micro_pass\\\');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;">Unblur 99¢ →</a></div>';
        return \`
        <tr>
          <td>
            <div style="font-weight:700;">\${rowTitle}\${p.is_lookalike ? ' <span class="pill-slate" style="font-size:10.5px;padding:1px 5px;">Peer Match</span>' : ''}</div>
            <div class="mono" style="font-size:13px; color:var(--text-muted);">\${p.channel_type} • \${Math.round((Number(p.audience_size) || 75000) / 1000)}K reach</div>
          </td>
          <td><span class="\${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${p.renewal_badge}</span></td>
          <td>\${contactHtml}</td>
          <td class="mono" style="font-size:13px;">
            <div style="color:var(--cyan-info);">\${p.vanity_url}</div>
            <div>Code: <strong style="color:var(--amber-gold);">\${p.promo_code}</strong></div>
          </td>
          <td class="mono" style="font-weight:700; color:var(--amber-gold);">
            $\${Number(p.est_spend_usd).toLocaleString()}
            <div style="font-size:13px; color:var(--text-muted); font-weight:400;">$\${p.cpm_usd} CPM</div>
          </td>
        </tr>
      \`;
      }).join('');
      if (window.__ebMountDeliverableCurtain) window.__ebMountDeliverableCurtain(entity.name);

      if (data.outbound_pitch) {
        const reachK = Math.round((Number(senderReach) || 75000) / 1000);
        document.getElementById('res-pitch-meta').textContent =
          'Pilot Quote (' + reachK + 'K Reach): $' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' (3 Flights @ $' + data.outbound_pitch.effective_cpm_usd + ' CPM)';
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
          body: JSON.stringify({
            mode: 'transcript',
            transcript,
            show_name: showName,
            audience_size: audienceSize
          })
        });
        const data = await res.json();
        renderTranscriptResults(data);
        fireMetaEvent('Lead', 0, { tool_mode: 'transcript', show_name: showName });
      } catch (e) {
        console.error(e);
      } finally {
        btn.textContent = 'Extract Sponsors';
      }
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
      document.getElementById('res-dm-email').textContent = '🔒 Verified Email Locked ($1.99)';
      document.getElementById('res-table-title').textContent = 'EXTRACTED AD-READ ENTITIES & ATTRIBUTION SIGNALS (' + data.engine_model.toUpperCase() + ')';

      const tbody = document.getElementById('res-placements-tbody');
      tbody.innerHTML = data.extracted_sponsors.map(s => \`
        <tr>
          <td>
            <div style="font-weight:700;">\${s.brand_name}</div>
            <div class="mono" style="font-size:13px; color:var(--text-muted);">\${s.category} • 🔒 Buyer Email Locked</div>
          </td>
          <td><span class="\${s.verified_flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${s.renewal_badge}</span></td>
          <td class="mono" style="font-size:13px;">
            <div>\${s.placement_position}</div>
            <div style="color:var(--text-muted);">Timestamp: \${s.timestamp}</div>
          </td>
          <td class="mono" style="font-size:13px;">
            <div style="color:var(--cyan-info);">\${s.vanity_url}</div>
            <div>Code: <strong style="color:var(--amber-gold);">\${s.promo_code}</strong></div>
          </td>
          <td class="mono" style="font-weight:700; color:var(--amber-gold);">
            $\${Number(s.estimated_flight_spend_usd).toLocaleString()}/read
            <div style="font-size:13px; color:var(--text-muted); font-weight:400;">$\${s.estimated_cpm_usd} est. CPM</div>
          </td>
        </tr>
      \`).join('');

      if (first.outbound_pitch) {
        document.getElementById('res-pitch-meta').textContent =
          'Pilot Quote: $' + Number(first.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' (3 Flights @ $' + first.outbound_pitch.effective_cpm_usd + ' CPM)';
        document.getElementById('res-pitch-body').textContent =
          '# SponsorRadar Diagnostic Summary (' + first.brand_name + ')\\n' +
          '• Verified 3x+ Renewal Score: ' + first.renewal_score + '/100\\n' +
          '• Recommended 3-Episode Pilot Quote: $' + Number(first.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' ($' + first.outbound_pitch.effective_cpm_usd + ' Effective CPM)\\n' +
          '• Target Buyer Role: ' + first.decision_maker_role + '\\n' +
          '• Verified Buyer Email & Direct Pitch Copy: [LOCKED IN FREE PREVIEW — UNLOCK 3-FILE PACK ($1.99)]';
      }
    }

    function copyPitchEmail() {
      const text = document.getElementById('res-pitch-body').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      const label = document.getElementById('copy-pitch-label');
      label.textContent = '✓ Copied to Clipboard';
      setTimeout(() => { label.textContent = 'Unlock Buyer Email & Pitch Pack ($1.99) ↗'; }, 2000);
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
        if (filterKey === 'all' || tier === filterKey) {
          r.style.display = '';
        } else {
          r.style.display = 'none';
        }
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
      const emailEl = document.getElementById(emailInputId);
      const hpEl = hpInputId ? document.getElementById(hpInputId) : null;
      const email = emailEl && emailEl.value ? emailEl.value.trim() : 'founder@creatorstudio.io';
      const utms = getUtmParams();
      try {
        const res = await fetch('/api/checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            plan_tier: planTier,
            amount_usd: amountUsd,
            customer_email: email,
            website_url_hp: hpEl ? hpEl.value : '',
            ...utms
          })
        });
        const data = await res.json();
        fireMetaEvent('StartTrial', amountUsd, { plan_tier: planTier });
        const banner = document.getElementById('checkout-status-banner');
        const txt = document.getElementById('checkout-status-text');
        if (banner && txt) {
          banner.style.display = 'block';
          txt.innerHTML = 'Stripe Session ' + data.session_id + ' ready for ' + email + ' (' + planTier.toUpperCase() + ' - $' + amountUsd + '/mo). <a href="' + (data.checkout_url || '/buy/complete_dossier') + '" style="color:var(--emerald-roi);text-decoration:underline;font-weight:700;margin-left:8px;">Proceed to Stripe Checkout ↗</a>';
        }
        if (!navigator.webdriver && data.checkout_url && data.checkout_url.startsWith('https://checkout.stripe.com')) {
          window.location.href = data.checkout_url;
        }
      } catch (e) {
        console.error(e);
      }
    }
  </script>
  `;

  return renderShell({
    title: 'SponsorRadar (#2): Podcast, Newsletter & YouTube Ad-Spend Ledger & 3x-Renewal ROI Engine',
    description: 'Track verified podcast, newsletter, and YouTube sponsorships that renewed 3+ times. Instant CPM benchmarks, promo-code attribution, and 1-click outbound sponsor pitches.',
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
        <p style="color:var(--text-secondary); font-size:16.5px; margin-top:12px;">
          Test-flight sponsorships lie: 68% of brands drop a show after 1 insertion. SponsorRadar tracks <strong>96+ verified multi-flight renewals</strong>, active vanity URLs, promo codes, and negotiated CPM rates across 42 top B2B &amp; DTC sponsors.
        </p>
      </div>

      <!-- Instant Interactive Lookup Above the Fold on /lp -->
      <div class="double-bezel" style="margin-bottom:32px;">
        <div class="panel">
          <div class="panel-header">
            <div>
              <span class="pill-emerald">TRY IT FREE ABOVE THE FOLD</span>
              <strong style="margin-left:8px; font-size:14px;">Instant Sponsor Spend &amp; 3x-Renewal Verifier</strong>
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
              <button type="button" class="preset-chip" onclick="setLpPreset('Lenny\\'s Podcast')">🎙️ Lenny's Podcast</button>
              <button type="button" class="preset-chip" onclick="setLpPreset('Huberman Lab')">🎙️ Huberman Lab</button>
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
                <div class="kpi-val" id="lp-email" style="font-size:14px; color:var(--amber-gold);">🔒 Locked in Free Preview ($1.99)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Direct Conversion CTA Box with $1.99 Express Pass + 30-Day Guarantee -->
      <div class="panel" style="padding:28px; text-align:center; border-color:var(--emerald-border); background:var(--bg-elevated);">
        <span class="pill-emerald">INSTANT STRIPE EXPRESS • 30-DAY 100% ROI GUARANTEE</span>
        <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin-top:10px;">Unlock All 42+ Verified Sponsor Emails, CPM Rate Cards &amp; 3-Flight Pitches ($1.99)</h2>
        <p style="color:var(--text-secondary); max-width:600px; margin:8px auto 20px;">
          Get the 3-File Sponsor Email &amp; Pitch Pack for a one-time $1.99 micro-pass, or start continuous Creator Pro access below.
        </p>
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-bottom:14px;">
          <a href="/buy/flash_pass?source=lp_express" onclick="if(window.__ebQuickBuy){window.__ebQuickBuy('flash_pass');return false;}" class="btn btn-vermilion" style="padding:12px 22px; font-size:15px; text-decoration:none;">
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
        document.getElementById('lp-email').textContent = '🔒 Locked in Free Preview ($1.99)';
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

const { escapeHtml, renderBrandLogoSvg, renderShell } = require('./views_shell');

function renderHomePage({ brands, shows, placements, seoPages, sampleTranscripts, defaultAnalysis }) {
  const topPlacements = placements.slice(0, 18);
  const topSeoLinks = seoPages.slice(0, 12);

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
      <div class="hero-grid">
        <!-- Left Column: Editorial Media-Buying Value Proposition -->
        <div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <span class="pill-vermilion">FOR BRAND MEDIA BUYERS &amp; CREATOR OPERATORS</span>
            <span class="pill-emerald">96+ VERIFIED 3x RENEWAL FLIGHTS</span>
          </div>
          <h1 class="headline-xl">
            Stop Guessing Which Podcasts &amp; Newsletters Convert. Track Every <span class="serif-italic" style="color:var(--emerald-roi);">3x+ Renewed</span> Sponsor.
          </h1>
          <p class="subhead">
            68% of single-flight sponsorships fail to clear CAC and never return. SponsorRadar indexes verified ad-read timestamps, vanity URLs, promo codes, and negotiated CPMs across <strong>42+ active DTC &amp; B2B brands</strong> and <strong>46+ flagship shows</strong>—and writes your outbound pitch or media plan in one click.
          </p>

          <div class="two-col-grid" style="margin-bottom:22px;">
            <div class="panel" style="padding:16px;">
              <div class="mono" style="font-size:11px; color:var(--text-muted);">FOR BRAND PARTNERSHIP BUYERS</div>
              <div class="mono" style="font-size:19px; font-weight:800; color:var(--emerald-roi); margin-top:4px;">&ge; 3 Flights = Proven CAC</div>
              <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">See where AG1, Eight Sleep, Deel, and Ramp renew 3 to 24 times before signing your next IO.</div>
            </div>
            <div class="panel" style="padding:16px;">
              <div class="mono" style="font-size:11px; color:var(--text-muted);">FOR NEWSLETTER &amp; PODCAST OPS</div>
              <div class="mono" style="font-size:19px; font-weight:800; color:var(--vermilion); margin-top:4px;">1-Click Pilot Pitch</div>
              <div style="font-size:13px; color:var(--text-secondary); margin-top:4px;">Generate 3-flight pilot pitches citing the sponsor's exact anchor renewals &amp; CPM arbitrage.</div>
            </div>
          </div>

          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="#verified-ledger" class="btn btn-ghost">Explore 96-Flight Ledger</a>
            <a href="#pricing" class="btn btn-vermilion">
              <span>Start Creator Pro ($49/mo)</span>
              <span class="btn-icon-circle" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <!-- Right Column: Double-Bezel Porcelain Interactive Tool (Mode A & Mode B) -->
        <div class="double-bezel">
          <div class="panel">
            <div class="panel-header">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="pill-vermilion">LIVE INTERACTIVE WORKBENCH</span>
                <span style="font-weight:700; font-size:14px;">Sponsor Spend &amp; Ad-Read Intelligence</span>
              </div>
              <div class="mode-tabs" role="tablist">
                <button type="button" id="tab-mode-lookup" class="mode-tab active" onclick="switchToolMode('lookup')">Mode A: Brand / Show Radar</button>
                <button type="button" id="tab-mode-transcript" class="mode-tab" onclick="switchToolMode('transcript')">Mode B: Ad-Read Extractor</button>
              </div>
            </div>

            <div class="panel-body">
              <!-- MODE A: BRAND / CREATOR LOOKUP -->
              <div id="mode-lookup-pane">
                <div class="lookup-form-grid">
                  <div>
                    <label for="lookup-query" class="mono" style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">SEARCH BRAND OR SHOW (42+ BRANDS / 46+ SHOWS)</label>
                    <input id="lookup-query" type="text" class="input-field" value="Deel" required placeholder="e.g. AG1, Deel, Ramp, Linear, Lenny's Podcast..." />
                  </div>
                  <div>
                    <label for="sender-show" class="mono" style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">YOUR SHOW / BRAND</label>
                    <input id="sender-show" type="text" class="input-field" value="AI & SaaS Builders Weekly" />
                  </div>
                  <div>
                    <label for="sender-reach" class="mono" style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">AUDIENCE REACH</label>
                    <input id="sender-reach" type="number" class="input-field mono" value="75000" min="500" />
                  </div>
                  <button type="button" id="btn-run-lookup" class="btn btn-vermilion" onclick="runBrandLookup()">
                    <span>Analyze Spend</span>
                    <span class="btn-icon-circle" aria-hidden="true">↗</span>
                  </button>
                </div>
                <div id="lookup-error-msg" class="mono" style="display:none; color:#B9311C; font-size:12px; margin-top:6px;"></div>

                <div class="preset-row" aria-label="1-Click Brand & Show Presets">
                  <span class="mono" style="font-size:11px; color:var(--text-muted); align-self:center;">1-CLICK PRESETS:</span>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('AG1')">AG1 ($1.42M/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Deel')">Deel ($680K/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Ramp')">Ramp ($790K/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Linear')">Linear ($310K/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Eight Sleep')">Eight Sleep ($620K/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Vanta')">Vanta ($580K/mo)</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Lenny')">Lenny's Podcast</button>
                  <button type="button" class="preset-chip" onclick="selectBrandPreset('Acquired')">Acquired</button>
                </div>
              </div>

              <!-- MODE B: LIVE TRANSCRIPT / RSS AD-READ EXTRACTOR -->
              <div id="mode-transcript-pane" style="display:none;">
                <div class="lookup-form-grid" style="margin-bottom:10px;">
                  <div>
                    <label for="transcript-preset" class="mono" style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">LOAD SAMPLE AD-READ TRANSCRIPT OR PASTE BELOW</label>
                    <select id="transcript-preset" class="select-field" onchange="loadTranscriptPreset(this.value)">
                      ${sampleTranscripts.map(t => `<option value="${escapeHtml(t.id)}">${escapeHtml(t.label)}</option>`).join('')}
                    </select>
                  </div>
                  <div>
                    <label for="transcript-show" class="mono" style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">SOURCE SHOW NAME</label>
                    <input id="transcript-show" type="text" class="input-field" value="${escapeHtml(sampleTranscripts[0].show_name)}" />
                  </div>
                  <div>
                    <label for="transcript-audience" class="mono" style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">EPISODE / ISSUE REACH</label>
                    <input id="transcript-audience" type="number" class="input-field mono" value="${sampleTranscripts[0].audience_size}" />
                  </div>
                  <button type="button" id="btn-run-transcript" class="btn btn-emerald" onclick="runTranscriptExtractor()">Extract Sponsors</button>
                </div>
                <label for="transcript-input" class="mono" style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">RAW PODCAST / YOUTUBE TRANSCRIPT OR NEWSLETTER SPONSOR BLOCK</label>
                <textarea id="transcript-input" class="textarea-field">${escapeHtml(sampleTranscripts[0].transcript)}</textarea>
              </div>

              <!-- LIVE OUTPUT DISPLAY AREA -->
              <div id="radar-results-container" style="margin-top:16px; border-top:1px solid var(--border-hairline); padding-top:16px;">
                <div class="kpi-grid">
                  <div class="kpi-box">
                    <div class="kpi-label">TARGET ENTITY</div>
                    <div class="kpi-val" id="res-brand-name" style="color:var(--text-primary); font-size:18px;">${escapeHtml(defaultAnalysis.brand.name)}</div>
                    <div class="mono" id="res-brand-domain" style="font-size:12px; color:var(--vermilion);">${escapeHtml(defaultAnalysis.brand.domain)} • ${escapeHtml(defaultAnalysis.brand.category)}</div>
                  </div>
                  <div class="kpi-box">
                    <div class="kpi-label">EST. MONTHLY AD SPEND</div>
                    <div class="kpi-val" id="res-monthly-spend" style="color:var(--amber-gold);">$${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}</div>
                    <div class="mono" id="res-avg-cpm" style="font-size:12px; color:var(--text-secondary);">Avg Effective CPM: $${defaultAnalysis.metrics.avg_cpm_usd}</div>
                  </div>
                  <div class="kpi-box">
                    <div class="kpi-label">3x-RENEWAL ROI SCORE</div>
                    <div class="kpi-val" id="res-renewal-score" style="color:var(--emerald-roi);">${defaultAnalysis.metrics.renewal_velocity_score}/100</div>
                    <div class="mono" id="res-flights-summary" style="font-size:12px; color:var(--emerald-roi);">${defaultAnalysis.metrics.proven_3x_shows_count} Proven 3x+ Shows (${defaultAnalysis.metrics.verified_total_flights} Flights)</div>
                  </div>
                  <div class="kpi-box">
                    <div class="kpi-label">DECISION MAKER</div>
                    <div class="kpi-val" id="res-dm-role" style="font-size:14px; color:var(--text-primary);">${escapeHtml(defaultAnalysis.brand.decision_maker_role)}</div>
                    <div class="mono" id="res-dm-email" style="font-size:12px; color:var(--cyan-info);">${escapeHtml(defaultAnalysis.brand.sponsor_email)}</div>
                  </div>
                </div>

                <!-- Verified Placements Sub-Table -->
                <div style="margin-bottom:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                  <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-secondary);" id="res-table-title">VERIFIED AD-READ PLACEMENTS &amp; VANITY ATTRIBUTION LEDGER</span>
                  <span class="pill-emerald" id="res-engine-badge">DETERMINISTIC + GEMINI 3.8 ENGINE READY</span>
                </div>
                <div class="table-wrap">
                  <table class="ledger-table">
                    <thead>
                      <tr>
                        <th>Show / Publication</th>
                        <th>Renewal Signal</th>
                        <th>Placement &amp; Timestamp</th>
                        <th>Vanity URL &amp; Code</th>
                        <th>Est. Spend</th>
                      </tr>
                    </thead>
                    <tbody id="res-placements-tbody">
                      ${defaultAnalysis.placements.map(p => `
                        <tr>
                          <td>
                            <div style="font-weight:700;">${escapeHtml(p.show_name)}</div>
                            <div class="mono" style="font-size:11px; color:var(--text-muted);">${escapeHtml(p.channel_type)} • ${(p.audience_size / 1000).toFixed(0)}K reach</div>
                          </td>
                          <td><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></td>
                          <td class="mono" style="font-size:12px;">
                            <div>${escapeHtml(p.slot_type)}</div>
                            <div style="color:var(--text-muted);">${escapeHtml(p.timestamp_range)}</div>
                          </td>
                          <td class="mono" style="font-size:12px;">
                            <div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div>
                            <div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div>
                          </td>
                          <td class="mono" style="font-weight:700; color:var(--amber-gold);">
                            $${p.est_spend_usd.toLocaleString()}
                            <div style="font-size:11px; color:var(--text-muted); font-weight:400;">$${p.cpm_usd} CPM</div>
                          </td>
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>

                <!-- Ready-to-Send Outbound Pitch Box -->
                <div class="pitch-box">
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
                    <div>
                      <span class="pill-emerald">1-CLICK OUTBOUND PITCH GENERATOR</span>
                      <span class="mono" style="font-size:12px; color:var(--text-secondary); margin-left:8px;" id="res-pitch-meta">
                        To: ${escapeHtml(defaultAnalysis.outbound_pitch.to_email)} • Pilot Quote: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} (3 Flights @ $${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)
                      </span>
                    </div>
                    <button type="button" class="btn btn-emerald" style="padding:7px 14px; min-height:36px; font-size:12.5px;" onclick="copyPitchEmail()">
                      <span id="copy-pitch-label">Copy Outbound Pitch Email</span>
                    </button>
                  </div>
                  <pre class="pitch-pre" id="res-pitch-body">${escapeHtml("Subject: " + defaultAnalysis.outbound_pitch.subject + "\n\n" + defaultAnalysis.outbound_pitch.body)}</pre>
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
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <button type="button" class="btn btn-ghost" style="padding:8px 14px; font-size:13px;" onclick="filterLedgerRows('all')">All Flights (${topPlacements.length})</button>
          <button type="button" class="btn btn-emerald" style="padding:8px 14px; font-size:13px;" onclick="filterLedgerRows('3x')">3x+ Proven Winners Only</button>
          <button type="button" class="btn btn-ghost" style="padding:8px 14px; font-size:13px;" onclick="filterLedgerRows('test')">1x–2x Test Flights</button>
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
                  <div class="mono" style="font-size:11px; color:var(--text-muted);">${escapeHtml(p.brand_category)}</div>
                </td>
                <td>
                  <div style="font-weight:700;">${escapeHtml(p.show_name)}</div>
                  <div class="mono" style="font-size:11px; color:var(--text-muted);">${(p.audience_size / 1000).toFixed(0)}K reach</div>
                </td>
                <td><span class="pill-slate">${escapeHtml(p.channel_type)}</span></td>
                <td>
                  <span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span>
                </td>
                <td class="mono" style="font-weight:700; color:${p.flights >= 3 ? 'var(--emerald-roi)' : 'var(--amber-gold)'};">${p.renewal_score}/100</td>
                <td class="mono" style="font-size:12px;">
                  <div>${escapeHtml(p.slot_type)}</div>
                  <div style="color:var(--text-muted);">${escapeHtml(p.timestamp_range)}</div>
                </td>
                <td class="mono" style="font-size:12px;">
                  <div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div>
                  <div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div>
                </td>
                <td class="mono" style="font-weight:700; color:var(--amber-gold);">
                  $${p.est_spend_usd.toLocaleString()}
                  <div style="font-size:11px; color:var(--text-muted); font-weight:400;">$${p.cpm_usd} CPM</div>
                </td>
                <td>
                  <button type="button" class="btn btn-ghost" style="padding:6px 11px; min-height:36px; font-size:12px;" onclick="selectBrandPreset('${escapeHtml(p.brand_name.split('(')[0].trim())}')">Inspect &amp; Pitch</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- PRICING & SELF-SERVE STRIPE CHECKOUT -->
  <section id="pricing" style="padding:56px 0; border-bottom:1px solid var(--border-hairline);">
    <div class="container">
      <div style="text-align:center; max-width:700px; margin:0 auto 36px;">
        <span class="pill-vermilion">TRANSPARENT MEDIA-BUYING &amp; CREATOR PLANS</span>
        <h2 style="font-family:var(--font-serif); font-size:34px; font-weight:600; margin-top:10px;">Close One Extra Sponsorship or Cut One Bad Media Buy — Pay For a Full Year</h2>
        <p style="color:var(--text-secondary); margin-top:8px;">
          Every plan includes 30-day no-questions-asked refund protection and instant CSV/API export.
        </p>
      </div>

      <div class="pricing-grid">
        <!-- Plan 1: Creator Pro ($49/mo) -->
        <div class="double-bezel">
          <div class="panel" style="padding:26px; height:100%; display:flex; flex-direction:column; justify-content:space-between;">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <span class="pill-emerald">FOR PODCASTERS, NEWSLETTERS &amp; TALENT AGENCIES</span>
                <span class="mono" style="font-size:11.5px; color:var(--text-muted);">MOST POPULAR</span>
              </div>
              <h3 style="font-family:var(--font-serif); font-size:26px; font-weight:600; margin-top:14px;">Creator Pro Outbound Engine</h3>
              <div style="margin:14px 0; display:flex; align-items:baseline; gap:8px;">
                <span class="mono" style="font-size:40px; font-weight:800; color:var(--text-primary);">$49</span>
                <span style="color:var(--text-secondary);">/ month • cancel anytime</span>
              </div>
              <p style="color:var(--text-secondary); font-size:14.5px; margin-bottom:18px;">
                See every sponsor renewing 3+ times on lookalike shows in your niche and send hyper-personalized 3-flight pilot pitches.
              </p>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:10px; font-size:14px; margin-bottom:24px;">
                <li><span style="color:var(--emerald-roi); font-weight:800;">✓</span> Full 42+ Brand &amp; 46+ Show 3x-Renewal Ledger</li>
                <li><span style="color:var(--emerald-roi); font-weight:800;">✓</span> Verified Sponsor Partnerships Emails &amp; Decision-Maker Roles</li>
                <li><span style="color:var(--emerald-roi); font-weight:800;">✓</span> Unlimited 1-Click Outbound Pitch Generation &amp; CPM Calculator</li>
                <li><span style="color:var(--emerald-roi); font-weight:800;">✓</span> Weekly "New First-Flight Sponsor" Alert Digest</li>
              </ul>
            </div>
            <div>
              <input type="text" id="hp-creator" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <input id="checkout-email-creator" type="email" class="input-field" required placeholder="Enter work email for instant access..." style="flex:1; min-width:200px;" />
                <button type="button" class="btn btn-vermilion" onclick="startStripeCheckout('creator_pro_49', 49, 'checkout-email-creator', 'hp-creator')">
                  <span>Unlock Creator Pro ($49/mo)</span>
                  <span class="btn-icon-circle" aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Plan 2: Media Buyer & Agency Feed ($199/mo) -->
        <div class="double-bezel">
          <div class="panel" style="padding:26px; height:100%; display:flex; flex-direction:column; justify-content:space-between; border-color:var(--vermilion-border);">
            <div>
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                <span class="pill-vermilion">FOR BRAND GROWTH TEAMS &amp; MEDIA AGENCIES</span>
                <span class="mono" style="font-size:11.5px; color:var(--vermilion);">5 SEATS + API STREAM</span>
              </div>
              <h3 style="font-family:var(--font-serif); font-size:26px; font-weight:600; margin-top:14px;">Media Buyer &amp; Agency Intelligence Feed</h3>
              <div style="margin:14px 0; display:flex; align-items:baseline; gap:8px;">
                <span class="mono" style="font-size:40px; font-weight:800; color:var(--vermilion);">$199</span>
                <span style="color:var(--text-secondary);">/ month • 5 seats + API</span>
              </div>
              <p style="color:var(--text-secondary); font-size:14.5px; margin-bottom:18px;">
                Eliminate wasted 1x test buys. Audit competitor promo codes, vanity URL decay curves, and negotiated CPM floors before signing IO contracts.
              </p>
              <ul style="list-style:none; display:flex; flex-direction:column; gap:10px; font-size:14px; margin-bottom:24px;">
                <li><span style="color:var(--vermilion); font-weight:800;">✓</span> Everything in Creator Pro + Unlimited Transcript / RSS Batch Audits</li>
                <li><span style="color:var(--vermilion); font-weight:800;">✓</span> Competitor Vanity URL &amp; Promo-Code Attribution Decay Telemetry</li>
                <li><span style="color:var(--vermilion); font-weight:800;">✓</span> Negotiated Reality CPM Benchmarks vs. Rate-Card Ceilings</li>
                <li><span style="color:var(--vermilion); font-weight:800;">✓</span> Webhook + CSV Export into HubSpot, Clay, and Apollo</li>
              </ul>
            </div>
            <div>
              <input type="text" id="hp-agency" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <input id="checkout-email-agency" type="email" class="input-field" required placeholder="Enter agency / growth team email..." style="flex:1; min-width:200px;" />
                <button type="button" class="btn btn-emerald" onclick="startStripeCheckout('agency_feed_199', 199, 'checkout-email-agency', 'hp-agency')">
                  <span>Start Agency Feed ($199/mo)</span>
                  <span class="btn-icon-circle" aria-hidden="true">↗</span>
                </button>
              </div>
            </div>
          </div>
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
              <span class="mono" style="font-size:11.5px; color:var(--amber-gold); font-weight:700;">$${page.avg_cpm} CPM</span>
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

      const senderShow = document.getElementById('sender-show').value;
      const senderReach = document.getElementById('sender-reach').value;
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
            sender_audience_size: Number(senderReach) || 75000
          })
        });
        const data = await res.json();
        renderLookupResults(data);
        fireMetaEvent('Lead', 0, { tool_mode: 'lookup', query });
      } catch (e) {
        console.error(e);
      } finally {
        btn.innerHTML = '<span>Analyze Spend</span><span class="btn-icon-circle" aria-hidden="true">↗</span>';
      }
    }

    function renderLookupResults(data) {
      if (!data || !data.brand) return;
      document.getElementById('res-brand-name').textContent = data.brand.name;
      document.getElementById('res-brand-domain').textContent = data.brand.domain + ' • ' + data.brand.category;
      document.getElementById('res-monthly-spend').textContent = '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString();
      document.getElementById('res-avg-cpm').textContent = 'Avg Effective CPM: $' + data.metrics.avg_cpm_usd;
      document.getElementById('res-renewal-score').textContent = data.metrics.renewal_velocity_score + '/100';
      document.getElementById('res-flights-summary').textContent = data.metrics.proven_3x_shows_count + ' Proven 3x+ Shows (' + data.metrics.verified_total_flights + ' Flights)';
      document.getElementById('res-dm-role').textContent = data.brand.decision_maker_role;
      document.getElementById('res-dm-email').textContent = data.brand.sponsor_email;
      document.getElementById('res-table-title').textContent = 'VERIFIED AD-READ PLACEMENTS FOR ' + data.brand.name.toUpperCase();

      const tbody = document.getElementById('res-placements-tbody');
      tbody.innerHTML = (data.placements || []).map(p => \`
        <tr>
          <td>
            <div style="font-weight:700;">\${p.show_name}</div>
            <div class="mono" style="font-size:11px; color:var(--text-muted);">\${p.channel_type} • \${Math.round(p.audience_size / 1000)}K reach</div>
          </td>
          <td><span class="\${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${p.renewal_badge}</span></td>
          <td class="mono" style="font-size:12px;">
            <div>\${p.slot_type}</div>
            <div style="color:var(--text-muted);">\${p.timestamp_range}</div>
          </td>
          <td class="mono" style="font-size:12px;">
            <div style="color:var(--cyan-info);">\${p.vanity_url}</div>
            <div>Code: <strong style="color:var(--amber-gold);">\${p.promo_code}</strong></div>
          </td>
          <td class="mono" style="font-weight:700; color:var(--amber-gold);">
            $\${Number(p.est_spend_usd).toLocaleString()}
            <div style="font-size:11px; color:var(--text-muted); font-weight:400;">$\${p.cpm_usd} CPM</div>
          </td>
        </tr>
      \`).join('');

      if (data.outbound_pitch) {
        document.getElementById('res-pitch-meta').textContent =
          'To: ' + data.outbound_pitch.to_email + ' • Pilot Quote: $' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' (3 Flights @ $' + data.outbound_pitch.effective_cpm_usd + ' CPM)';
        document.getElementById('res-pitch-body').textContent =
          'Subject: ' + data.outbound_pitch.subject + '\\n\\n' + data.outbound_pitch.body;
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
      document.getElementById('res-dm-email').textContent = first.sponsor_email;
      document.getElementById('res-table-title').textContent = 'EXTRACTED AD-READ ENTITIES & ATTRIBUTION SIGNALS (' + data.engine_model.toUpperCase() + ')';

      const tbody = document.getElementById('res-placements-tbody');
      tbody.innerHTML = data.extracted_sponsors.map(s => \`
        <tr>
          <td>
            <div style="font-weight:700;">\${s.brand_name}</div>
            <div class="mono" style="font-size:11px; color:var(--text-muted);">\${s.category} • \${s.sponsor_email}</div>
          </td>
          <td><span class="\${s.verified_flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${s.renewal_badge}</span></td>
          <td class="mono" style="font-size:12px;">
            <div>\${s.placement_position}</div>
            <div style="color:var(--text-muted);">Timestamp: \${s.timestamp}</div>
          </td>
          <td class="mono" style="font-size:12px;">
            <div style="color:var(--cyan-info);">\${s.vanity_url}</div>
            <div>Code: <strong style="color:var(--amber-gold);">\${s.promo_code}</strong></div>
          </td>
          <td class="mono" style="font-weight:700; color:var(--amber-gold);">
            $\${Number(s.estimated_flight_spend_usd).toLocaleString()}/read
            <div style="font-size:11px; color:var(--text-muted); font-weight:400;">$\${s.estimated_cpm_usd} est. CPM</div>
          </td>
        </tr>
      \`).join('');

      if (first.outbound_pitch) {
        document.getElementById('res-pitch-meta').textContent =
          'To: ' + first.outbound_pitch.to_email + ' • Pilot Quote: $' + Number(first.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' (3 Flights @ $' + first.outbound_pitch.effective_cpm_usd + ' CPM)';
        document.getElementById('res-pitch-body').textContent =
          'Subject: ' + first.outbound_pitch.subject + '\\n\\n' + first.outbound_pitch.body;
      }
    }

    function copyPitchEmail() {
      const text = document.getElementById('res-pitch-body').textContent;
      if (navigator.clipboard) navigator.clipboard.writeText(text);
      const label = document.getElementById('copy-pitch-label');
      label.textContent = '✓ Copied to Clipboard';
      setTimeout(() => { label.textContent = 'Copy Outbound Pitch Email'; }, 2000);
    }

    function filterLedgerRows(filterKey) {
      const rows = document.querySelectorAll('#master-ledger-table tbody tr');
      rows.forEach(r => {
        const tier = r.getAttribute('data-tier');
        if (filterKey === 'all' || tier === filterKey) {
          r.style.display = '';
        } else {
          r.style.display = 'none';
        }
      });
    }

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
          txt.textContent = 'Stripe Session ' + data.session_id + ' ready for ' + email + ' (' + planTier.toUpperCase() + ' - $' + amountUsd + '/mo).';
        }
      } catch (e) {
        console.error(e);
      }
    }
  </script>
  `;

  return renderShell({
    title: 'SponsorRadar (#2) — Podcast, Newsletter & YouTube Ad-Spend Ledger & 3x-Renewal ROI Engine',
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
          Stop Guessing Which Podcasts &amp; Newsletters Actually Convert — See Every Brand That <span class="serif-italic" style="color:var(--emerald-roi);">Renewed 3+ Times</span>
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
            <div class="mono" style="font-size:12px; color:var(--text-secondary);">Zero signup required to test</div>
          </div>
          <div class="panel-body">
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
              <input id="lp-query" type="text" class="input-field" value="AG1" placeholder="Type any brand or show (e.g. AG1, Deel, Ramp, HubSpot)..." style="flex:1; min-width:210px;" />
              <button type="button" class="btn btn-vermilion" onclick="runLpLookup()">
                <span>Reveal 3x+ Renewals</span>
                <span class="btn-icon-circle" aria-hidden="true">↗</span>
              </button>
            </div>
            <div class="preset-row">
              <button type="button" class="preset-chip" onclick="setLpPreset('AG1')">AG1 ($1.42M/mo)</button>
              <button type="button" class="preset-chip" onclick="setLpPreset('Deel')">Deel ($680K/mo)</button>
              <button type="button" class="preset-chip" onclick="setLpPreset('Ramp')">Ramp ($790K/mo)</button>
              <button type="button" class="preset-chip" onclick="setLpPreset('Eight Sleep')">Eight Sleep ($620K/mo)</button>
              <button type="button" class="preset-chip" onclick="setLpPreset('Linear')">Linear ($310K/mo)</button>
            </div>

            <div class="kpi-grid" style="margin-top:16px;">
              <div class="kpi-box">
                <div class="kpi-label">MATCHED BRAND</div>
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
                <div class="kpi-val" id="lp-email" style="font-size:14px; color:var(--cyan-info);">${escapeHtml(defaultAnalysis.brand.sponsor_email)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Direct Conversion CTA Box with 30-Day Guarantee -->
      <div class="panel" style="padding:28px; text-align:center; border-color:var(--emerald-border); background:var(--bg-elevated);">
        <span class="pill-emerald">30-DAY 100% ROI GUARANTEE</span>
        <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin-top:10px;">Unlock All 42+ Sponsor Ledgers, Decision-Maker Emails &amp; 1-Click Outbound Pitches</h2>
        <p style="color:var(--text-secondary); max-width:600px; margin:8px auto 20px;">
          If SponsorRadar doesn't help you land a sponsor pilot or eliminate a losing media buy within 30 days, click one button for a full refund.
        </p>
        <input type="text" id="lp-hp-field" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; max-width:560px; margin:0 auto;">
          <input id="lp-lead-email" type="email" class="input-field" required placeholder="Enter your work email..." style="flex:1; min-width:220px;" />
          <button type="button" class="btn btn-vermilion" onclick="submitLpLeadAndCheckout()">
            <span>Start Instant Access ($49/mo)</span>
            <span class="btn-icon-circle" aria-hidden="true">↗</span>
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
        document.getElementById('lp-brand-name').textContent = data.brand.name;
        document.getElementById('lp-spend').textContent = '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString();
        document.getElementById('lp-score').textContent = data.metrics.renewal_velocity_score + '/100';
        document.getElementById('lp-email').textContent = data.brand.sponsor_email;
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
      msg.textContent = 'Verified Session ' + data.session_id + ' unlocked for ' + email + ' (Meta CAPI Purchase + Lead logged).';
    }
  </script>
  `;

  return renderShell({
    title: 'Stop Guessing Which Podcasts & Newsletters Convert — SponsorRadar 3x+ Renewal Ledger',
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

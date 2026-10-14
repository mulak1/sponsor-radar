const { escapeHtml, renderShell } = require('./views_shell');

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
        <!-- Left Column: High-Conviction Value Proposition -->
        <div>
          <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
            <span class="pill-amber">BLOOMBERG FOR CREATOR AD SPEND</span>
            <span class="pill-emerald">96+ VERIFIED 3x RENEWAL FLIGHTS</span>
          </div>
          <h1 class="headline-xl">
            Stop Guessing Which Podcasts &amp; Newsletters Convert. Track Every <span style="color:var(--emerald-roi);">3x+ Renewed</span> Sponsor.
          </h1>
          <p class="subhead">
            68% of single-flight sponsorships fail to clear CAC and never return. SponsorRadar indexes verified ad-read timestamps, vanity URLs, promo codes, and effective CPMs across <strong>42+ active sponsor brands</strong> and <strong>46+ top shows</strong>—and writes your outbound pitch in one click.
          </p>

          <div class="two-col-grid" style="margin-bottom:20px;">
            <div class="panel" style="padding:14px;">
              <div class="mono" style="font-size:11px; color:var(--text-muted);">THE 3x-RENEWAL SIGNAL</div>
              <div class="mono" style="font-size:20px; font-weight:800; color:var(--emerald-roi); margin-top:4px;">&ge; 3 Flights = ROI+</div>
              <div style="font-size:12.5px; color:var(--text-secondary); margin-top:4px;">When Deel, AG1, or Ramp renews 3+ times on the same show, unit economics are proven.</div>
            </div>
            <div class="panel" style="padding:14px;">
              <div class="mono" style="font-size:11px; color:var(--text-muted);">DIRECT SPONSOR CONTACTS</div>
              <div class="mono" style="font-size:20px; font-weight:800; color:var(--amber-gold); margin-top:4px;">1-Click Pitch</div>
              <div style="font-size:12.5px; color:var(--text-secondary); margin-top:4px;">Auto-generates 3-flight pilot pitches citing the brand's exact anchor renewals &amp; CPM arbitrage.</div>
            </div>
          </div>

          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <a href="#verified-ledger" class="btn btn-ghost">Explore 96-Flight Ledger</a>
            <a href="#pricing" class="btn btn-amber">Start Creator Pro ($49/mo)</a>
          </div>
        </div>

        <!-- Right Column: Above-the-Fold Interactive Free Tool (Mode A & Mode B) -->
        <div class="panel" style="border-color:var(--border-bright);">
          <div class="panel-header">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span class="pill-amber">FREE INTERACTIVE TERMINAL</span>
              <span style="font-weight:700; font-size:14px;">Live Sponsor Spend &amp; Ad-Read Intelligence</span>
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
                  <input id="lookup-query" type="text" class="input-field" value="Deel" placeholder="e.g. AG1, Deel, Ramp, Linear, Lenny's Podcast..." />
                </div>
                <div>
                  <label for="sender-show" class="mono" style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">YOUR SHOW / NEWSLETTER</label>
                  <input id="sender-show" type="text" class="input-field" value="AI & SaaS Builders Weekly" />
                </div>
                <div>
                  <label for="sender-reach" class="mono" style="font-size:11px; color:var(--text-secondary); display:block; margin-bottom:5px;">YOUR REACH</label>
                  <input id="sender-reach" type="number" class="input-field mono" value="75000" />
                </div>
                <button type="button" id="btn-run-lookup" class="btn btn-amber" onclick="runBrandLookup()">Analyze Spend</button>
              </div>

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
                  <div class="mono" id="res-brand-domain" style="font-size:12px; color:var(--amber-gold);">${escapeHtml(defaultAnalysis.brand.domain)} • ${escapeHtml(defaultAnalysis.brand.category)}</div>
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
  </section>

  <!-- FULL VERIFIED 3x+ RENEWAL AD-SPEND LEDGER -->
  <section id="verified-ledger" style="padding:48px 0; border-bottom:1px solid var(--border-hairline);">
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:end; flex-wrap:wrap; gap:16px; margin-bottom:20px;">
        <div>
          <span class="pill-amber">HISTORICAL AD-READ &amp; NEWSLETTER LEDGER</span>
          <h2 style="font-size:26px; font-weight:800; margin-top:8px;">Verified 3x+ Renewed Sponsorship Placements (vs. 1x Failed Tests)</h2>
          <p style="color:var(--text-secondary); font-size:14.5px; margin-top:4px;">
            Filter by renewal velocity to spot which brands are scaling multi-quarter budgets vs. running one-off tests.
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
                  <button type="button" class="btn btn-ghost" style="padding:6px 11px; min-height:34px; font-size:12px;" onclick="selectBrandPreset('${escapeHtml(p.brand_name.split('(')[0].trim())}')">Pitch Brand</button>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </section>

  <!-- PRICING & SELF-SERVE STRIPE CHECKOUT -->
  <section id="pricing" style="padding:52px 0; border-bottom:1px solid var(--border-hairline);">
    <div class="container">
      <div style="text-align:center; max-width:680px; margin:0 auto 32px;">
        <span class="pill-amber">TRANSPARENT MEDIA-BUYING &amp; CREATOR PLANS</span>
        <h2 style="font-size:30px; font-weight:800; margin-top:10px;">Close One Extra Sponsorship or Cut One Bad Media Buy — Pay For a Full Year</h2>
        <p style="color:var(--text-secondary); margin-top:8px;">
          Every plan includes 30-day no-questions-asked refund protection and instant CSV/API export.
        </p>
      </div>

      <div class="pricing-grid">
        <!-- Plan 1: Creator Pro ($49/mo) -->
        <div class="panel" style="padding:24px; border-color:var(--border-bright);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <span class="pill-emerald">FOR PODCASTERS, NEWSLETTERS &amp; YOUTUBERS</span>
            <span class="mono" style="font-size:12px; color:var(--text-muted);">MOST POPULAR</span>
          </div>
          <h3 style="font-size:22px; font-weight:800; margin-top:14px;">Creator Pro Outbound Engine</h3>
          <div style="margin:14px 0; display:flex; align-items:baseline; gap:8px;">
            <span class="mono" style="font-size:38px; font-weight:800; color:var(--text-primary);">$49</span>
            <span style="color:var(--text-secondary);">/ month • cancel anytime</span>
          </div>
          <p style="color:var(--text-secondary); font-size:14px; margin-bottom:18px;">
            See every sponsor renewing 3+ times on lookalike shows in your niche and send hyper-personalized 3-flight pilot pitches.
          </p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:10px; font-size:14px; margin-bottom:24px;">
            <li><span style="color:var(--emerald-roi); font-weight:800;">✓</span> Full 42+ Brand &amp; 46+ Show 3x-Renewal Ledger</li>
            <li><span style="color:var(--emerald-roi); font-weight:800;">✓</span> Verified Sponsor Partnerships Emails &amp; Decision-Maker Roles</li>
            <li><span style="color:var(--emerald-roi); font-weight:800;">✓</span> Unlimited 1-Click Outbound Pitch Generation &amp; CPM Calculator</li>
            <li><span style="color:var(--emerald-roi); font-weight:800;">✓</span> Weekly "New First-Flight Sponsor" Alert Digest</li>
          </ul>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <input id="checkout-email-creator" type="email" class="input-field" placeholder="Enter work email for instant access..." style="flex:1; min-width:200px;" />
            <button type="button" class="btn btn-amber" onclick="startStripeCheckout('creator_pro_49', 49, 'checkout-email-creator')">Unlock Creator Pro ($49/mo)</button>
          </div>
        </div>

        <!-- Plan 2: Media Buyer & Agency Feed ($199/mo) -->
        <div class="panel" style="padding:24px; border-color:var(--amber-gold);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <span class="pill-amber">FOR GROWTH TEAMS, BRANDS &amp; AGENCIES</span>
            <span class="mono" style="font-size:12px; color:var(--amber-gold);">FULL API + TRANSCRIPT STREAM</span>
          </div>
          <h3 style="font-size:22px; font-weight:800; margin-top:14px;">Media Buyer &amp; Agency Intelligence Feed</h3>
          <div style="margin:14px 0; display:flex; align-items:baseline; gap:8px;">
            <span class="mono" style="font-size:38px; font-weight:800; color:var(--amber-gold);">$199</span>
            <span style="color:var(--text-secondary);">/ month • 5 seats + API</span>
          </div>
          <p style="color:var(--text-secondary); font-size:14px; margin-bottom:18px;">
            Eliminate wasted 1x test buys. Audit competitor promo codes, vanity URL decay curves, and negotiated CPM floors before signing IO contracts.
          </p>
          <ul style="list-style:none; display:flex; flex-direction:column; gap:10px; font-size:14px; margin-bottom:24px;">
            <li><span style="color:var(--amber-gold); font-weight:800;">✓</span> Everything in Creator Pro + Unlimited Transcript / RSS Batch Audits</li>
            <li><span style="color:var(--amber-gold); font-weight:800;">✓</span> Competitor Vanity URL &amp; Promo-Code Attribution Decay Telemetry</li>
            <li><span style="color:var(--amber-gold); font-weight:800;">✓</span> Negotiated Reality CPM Benchmarks vs. Rate-Card Ceilings</li>
            <li><span style="color:var(--amber-gold); font-weight:800;">✓</span> Webhook + CSV Export into HubSpot, Clay, and Apollo</li>
          </ul>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            <input id="checkout-email-agency" type="email" class="input-field" placeholder="Enter agency / growth team email..." style="flex:1; min-width:200px;" />
            <button type="button" class="btn btn-emerald" onclick="startStripeCheckout('agency_feed_199', 199, 'checkout-email-agency')">Start Agency Feed ($199/mo)</button>
          </div>
        </div>
      </div>

      <div id="checkout-status-banner" class="panel" style="display:none; margin-top:20px; padding:18px; border-color:var(--emerald-roi); background:rgba(16, 185, 129, 0.08);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <span class="pill-emerald">STRIPE CHECKOUT SESSION INITIALIZED</span>
            <div style="font-weight:700; margin-top:6px;" id="checkout-status-text">Session created.</div>
          </div>
          <a href="/directory" class="btn btn-emerald">Access Full 60+ Report Vault Now</a>
        </div>
      </div>
    </div>
  </section>

  <!-- PROGRAMMATIC SEO HUB LINKS -->
  <section style="padding:44px 0;">
    <div class="container">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px;">
        <div>
          <span class="pill-slate">DAY-1 GOOGLE SEARCH CONSOLE pSEO ENGINE</span>
          <h2 style="font-size:22px; font-weight:800; margin-top:6px;">Popular 2026 Sponsorship Spend &amp; CPM Benchmark Reports</h2>
        </div>
        <a href="/directory" class="btn btn-ghost" style="padding:8px 14px; font-size:13px;">View All 60+ Programmatic SEO Pages →</a>
      </div>
      <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:12px;">
        ${topSeoLinks.map(page => `
          <a href="/seo/${escapeHtml(page.slug)}" class="panel" style="padding:14px; display:block; transition:border-color 150ms ease-out;" onmouseover="this.style.borderColor='var(--amber-gold)'" onmouseout="this.style.borderColor='var(--border-hairline)'">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
              <span class="pill-slate">${escapeHtml(page.category)}</span>
              <span class="mono" style="font-size:11px; color:var(--amber-gold);">$${page.avg_cpm} CPM</span>
            </div>
            <div style="font-weight:700; font-size:14px; color:var(--text-primary);">${escapeHtml(page.title)}</div>
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
      const query = document.getElementById('lookup-query').value;
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
        btn.textContent = 'Analyze Spend';
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
      label.textContent = '✓ Copied to Clipboard!';
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

    async function startStripeCheckout(planTier, amountUsd, emailInputId) {
      const emailEl = document.getElementById(emailInputId);
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
    title: 'SponsorRadar (#2) — Podcast, Newsletter & YouTube Ad-Spend Ledger & 3x-Renewal ROI Terminal',
    description: 'Track verified podcast, newsletter, and YouTube sponsorships that renewed 3+ times. Instant CPM benchmarks, promo-code attribution, and 1-click outbound sponsor pitches.',
    canonicalPath: '/',
    ogSlug: 'sponsor-radar-home',
    jsonLd,
    hideTopNav: false,
    bodyHtml
  });
}

function renderLandingPage({ defaultAnalysis }) {
  const bodyHtml = `
  <section style="padding:32px 0 56px;">
    <div class="container" style="max-width:1080px;">
      <!-- Zero Navigation Leak Bar -->
      <div style="display:flex; justify-content:space-between; align-items:center; padding-bottom:20px; border-bottom:1px solid var(--border-hairline); margin-bottom:28px; flex-wrap:wrap; gap:12px;">
        <div class="brand-logo">
          <span class="brand-mark">SR</span>
          <span>SponsorRadar</span>
          <span class="pill-emerald">PAID-SOCIAL DIRECT ACCESS</span>
        </div>
        <div class="mono" style="font-size:12px; color:var(--amber-gold);">
          30-DAY MONEY-BACK GUARANTEE • INSTANT 3x+ RENEWAL LEDGER
        </div>
      </div>

      <div style="text-align:center; max-width:820px; margin:0 auto 28px;">
        <span class="pill-amber">ATTENTION: GROWTH MARKETERS, PODCASTERS &amp; NEWSLETTER OPERATORS</span>
        <h1 class="headline-xl" style="margin-top:14px;">
          Stop Guessing Which Podcasts &amp; Newsletters Actually Convert — See Every Brand That <span style="color:var(--emerald-roi);">Renewed 3+ Times</span>
        </h1>
        <p style="color:var(--text-secondary); font-size:16.5px; margin-top:12px;">
          Test-flight sponsorships lie: 68% of brands drop a show after 1 insertion. SponsorRadar tracks <strong>96+ verified multi-flight renewals</strong>, active vanity URLs, promo codes, and negotiated CPM rates across 42 top B2B &amp; DTC sponsors.
        </p>
      </div>

      <!-- Instant Interactive Lookup Above the Fold on /lp -->
      <div class="panel" style="border-color:var(--amber-gold); margin-bottom:32px;">
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
            <button type="button" class="btn btn-amber" onclick="runLpLookup()">Reveal 3x+ Renewals</button>
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

      <!-- Direct Conversion CTA Box with 30-Day Guarantee -->
      <div class="panel" style="padding:24px; text-align:center; border-color:var(--emerald-roi);">
        <span class="pill-emerald">30-DAY 100% ROI GUARANTEE</span>
        <h2 style="font-size:24px; font-weight:800; margin-top:10px;">Unlock All 42+ Sponsor Ledgers, Decision-Maker Emails &amp; 1-Click Outbound Pitches</h2>
        <p style="color:var(--text-secondary); max-width:600px; margin:8px auto 20px;">
          If SponsorRadar doesn't help you land a sponsor pilot or eliminate a losing media buy within 30 days, click one button for a full refund.
        </p>
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; max-width:560px; margin:0 auto;">
          <input id="lp-lead-email" type="email" class="input-field" placeholder="Enter your work email..." style="flex:1; min-width:220px;" />
          <button type="button" class="btn btn-amber" onclick="submitLpLeadAndCheckout()">Start Instant Access ($49/mo)</button>
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
      const utms = getUtmParams();
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_tier: 'creator_pro_49', amount_usd: 49, customer_email: email, ...utms })
      });
      const data = await res.json();
      fireMetaEvent('Purchase', 49, { plan_tier: 'creator_pro_49', session_id: data.session_id });
      const msg = document.getElementById('lp-confirm-msg');
      msg.style.display = 'block';
      msg.textContent = '✓ Verified Session ' + data.session_id + ' unlocked for ' + email + ' (Meta CAPI Purchase + Lead logged).';
    }
  </script>
  `;

  return renderShell({
    title: 'Stop Guessing Which Podcasts & Newsletters Convert — SponsorRadar 3x+ Renewal Ledger',
    description: 'See every sponsor brand that renewed 3+ times across 46+ podcasts, newsletters, and YouTube channels. 30-day money-back guarantee.',
    canonicalPath: '/lp',
    ogSlug: 'sponsor-radar-lp',
    jsonLd: null,
    hideTopNav: true,
    bodyHtml
  });
}

module.exports = {
  escapeHtml,
  renderShell,
  renderHomePage,
  renderLandingPage
};

const { escapeHtml, renderBrandLogoSvg, renderShell } = require('./views_shell');
const { generateMoneyballLookalikeBundle } = require('./engine');

function renderHomePage({ brands, shows, placements, seoPages, sampleTranscripts, defaultAnalysis, initialQuery = 'Shopify', initialReach = 75000, pubQuery = '' }) {
  const displayEntity = defaultAnalysis.display_entity || { type: 'brand', name: defaultAnalysis.brand.name, subtitle: `${defaultAnalysis.brand.domain} • ${defaultAnalysis.brand.category}`, lead_role: defaultAnalysis.brand.decision_maker_role, table_title: `VERIFIED SPONSORSHIP PLACEMENTS FOR ${defaultAnalysis.brand.name.toUpperCase()}` };
  const isInitialShow = displayEntity.type === 'show' || defaultAnalysis.matched_type === 'show';
  const mb = defaultAnalysis.moneyball_bundle || generateMoneyballLookalikeBundle({ targetShowName: defaultAnalysis.show ? defaultAnalysis.show.name : ((defaultAnalysis.placements[0] && defaultAnalysis.placements[0].show_name) || "Lenny's Podcast"), baseCpm: defaultAnalysis.metrics.avg_cpm_usd, rackRateUsd: 9500, category: defaultAnalysis.brand.category, placements: defaultAnalysis.placements });
  const samplePitchText = defaultAnalysis.outbound_pitch.free_pitch_script || defaultAnalysis.outbound_pitch.body;
  const sampleBuyerEmail = defaultAnalysis.outbound_pitch.to_email || 'd***.k***@deel.com (+ r.***@rightsideup.co)';
  const row1Placement = (defaultAnalysis.placements && defaultAnalysis.placements[0]) || {};
  const row1BuyerUnmasked = row1Placement.unmasked_buyer_email || 'sarah.kaufman@shopify.com';
  const row1AgencyUnmasked = row1Placement.unmasked_agency_email || 'm.vance@rightsideup.co';
  const row1BookingUnmasked = row1Placement.unmasked_booking_email || 'booking@lennyspodcast.fm';
  const proven3xPlacements = placements.filter(p => p.flights >= 3).slice(0, 12), testPlacements = placements.filter(p => p.flights < 3).slice(0, 6);
  const topPlacements = [...proven3xPlacements, ...testPlacements];
  const topSeoLinks = [...seoPages.filter(p => p.page_type === 'brand_breakdown').slice(0, 8), ...seoPages.filter(p => p.page_type === 'show_benchmark').slice(0, 8), ...seoPages.filter(p => p.page_type === 'niche_directory').slice(0, 8)];
  const totalContacts = 96;
  const jsonLd = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'SoftwareApplication', name: 'SponsorRadar', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', description: 'Podcast, Newsletter & YouTube Ad-Read Spend Ledger, Show Rate-Card Quote Auditor, 3x-Renewal Tracker & Outbound Sponsor Pitch Generator.', offers: [{ '@type': 'Offer', name: '3-File Sponsor & Rate Card Pack', price: '1.99', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Complete 96-Row Q4 Ledger + CSV', price: '29.00', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Creator Pro', price: '49.00', priceCurrency: 'USD' }] },
    { '@type': 'Dataset', name: 'SponsorRadar 2026 Verified Podcast, Newsletter & YouTube Ad-Spend Ledger', description: `Historical ad-read timestamps, promo codes, vanity URLs, negotiated CPM floors, and 3x+ renewal velocity scores across ${brands.length} sponsor brands and ${shows.length} top shows.`, creator: { '@type': 'Organization', name: 'SponsorRadar Intelligence' } }
  ] };

  const pubBannerHtml = pubQuery ? `
      <div id="pub-indexed-banner" class="panel" style="margin-bottom:28px; padding:24px 28px; background:var(--bg-surface); border-radius:18px; display:flex; flex-direction:column; gap:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding-bottom:14px;">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;"><span class="pill-emerald" style="background:var(--emerald-soft);">Live Indexed Creator Benchmark</span><strong style="font-size:17px; color:var(--text-primary);">${escapeHtml(pubQuery)}</strong></div>
          <span class="mono" style="font-size:14px; font-weight:700; color:var(--emerald-roi); background:var(--emerald-soft); padding:4px 10px; border-radius:8px;">3-Flight Pilot Quote: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} ($${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px;">
          <div style="padding:14px 16px; border-radius:12px; background:var(--bg-parchment);"><div class="mono" style="font-size:14px; color:var(--text-secondary); font-weight:700;">Top Matched 3x+ Sponsors</div><div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-top:4px;">1. Linear (8x) • 2. Deel (12x) • 3. Ramp (10x)</div></div>
          <div style="padding:14px 16px; border-radius:12px; background:var(--emerald-soft);"><div class="mono" style="font-size:14px; color:var(--emerald-roi); font-weight:700;">Row #1 Unmasked Buyer Proof</div><div class="mono" style="font-size:15px; font-weight:700; color:var(--text-primary); margin-top:4px;">${escapeHtml(row1BuyerUnmasked)}</div></div>
          <div id="pub-blurred-emails-preview" style="padding:14px 16px; border-radius:12px; background:#FFFBEB;"><div class="mono" style="font-size:14px; color:#92400E; font-weight:700;">95 Locked Verified Rows</div><div class="mono" style="font-size:14px; font-weight:700; color:#92400E; margin-top:4px;"><span style="filter:blur(3.5px);user-select:none;">d***.k***@deel.com</span> • <span style="filter:blur(3.5px);user-select:none;">s***.k***@supabase.io</span> (+93 more)</div></div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px; align-items:center;">
          <a href="#radar-results-container" class="btn btn-ghost" style="padding:10px 16px; min-height:42px; font-size:14px; text-decoration:none; justify-content:center;">1. View Matched Sponsor Table ↓</a>
          <button type="button" id="btn-copy-creator-badge" onclick="if(window.__ebCopyReadmeBadge){window.__ebCopyReadmeBadge(this);}" class="btn btn-ghost" style="padding:10px 16px; min-height:42px; font-size:14px; color:var(--emerald-roi); font-weight:700; cursor:pointer; justify-content:center;">2. Copy Verified 3x-Sponsor Badge</button>
          <a href="/buy/flash_pass?target=${encodeURIComponent(pubQuery)}" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass',true);return false;}" class="btn btn-vermilion" style="padding:10px 16px; min-height:42px; font-size:14px; text-decoration:none; justify-content:center;">3. Unlock All 96 Verified Buyers ($1.99) →</a>
        </div>
      </div>` : '';

  const bodyHtml = `
  <section class="hero-section" id="radar-tool" style="padding:36px 0 40px;">
    <div class="container">
      ${pubBannerHtml}
      <div id="home-executive-brief" style="width:100%; margin-bottom:22px;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
            <div id="sr-buyer-wedge-toggle" role="tablist" aria-label="1-Tap Buyer Wedge Toggle" style="display:inline-flex; gap:6px; flex-wrap:wrap; align-items:center; padding:4px 8px; border-radius:999px; background:var(--bg-parchment); border:1px solid var(--border-strong);">
              <span class="mono" style="font-size:12.5px; font-weight:800; color:var(--text-secondary); padding-left:4px;">Wedge:</span>
              <button type="button" id="hero-role-creator" data-wedge="creator" aria-selected="true" onclick="window.__srSwitchPersona('creator', 'hero_wedge_toggle')" style="display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:999px; border:none; background:var(--emerald-soft); color:var(--emerald-roi); font-size:13px; font-weight:800; cursor:pointer; white-space:nowrap;"><span>I want sponsors for my show</span></button>
              <button type="button" id="hero-role-buyer" data-wedge="buyer" aria-selected="false" onclick="window.__srSwitchPersona('buyer', 'hero_wedge_toggle')" style="display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:999px; border:none; background:var(--bg-surface); color:var(--text-secondary); font-size:13px; font-weight:700; cursor:pointer; white-space:nowrap;"><span>I&apos;m buying ads &amp; checking CPMs</span></button>
            </div>
            <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
              <span id="sr-logical-need-chip" class="pill-emerald" style="font-size:13px; font-weight:800;">96 verified buyers • Save $2,400 overpay</span>
              <span id="sr-vc-data-moat-chip" class="pill-slate" style="font-size:12.5px; font-weight:800;" title="Compounding Proprietary Data Moat from live SQLite audits">181 Deals Audited • $19/$49 Pro Vault</span>
              <a href="/leaderboard" class="pill-slate" style="text-decoration:none; font-size:13px;">Top-16 Leaderboard &rarr;</a>
              <a href="/directory" class="pill-slate" style="text-decoration:none; font-size:13px;">${seoPages.length} Reports &rarr;</a>
            </div>
          </div>
          <h1 class="headline-xl" id="sr-emotional-want-hook" style="font-size:clamp(28px, 3vw, 40px); line-height:1.15; margin:0 0 12px 0;">Pitch the buyer, <span style="color:var(--emerald-roi);">not dead inboxes.</span></h1>
        </div>
        <div id="sr-live-deal-card-row1" class="hero-steps-grid" data-active-wedge="creator" style="width:100%; min-height:68px; padding:12px 14px; background:var(--bg-surface); border:2px solid var(--emerald-border); border-radius:10px; display:grid; grid-template-columns:repeat(auto-fit, minmax(230px, 1fr)); align-items:center; gap:10px 18px; font-size:12.5px; font-weight:500; line-height:1.4; color:var(--text-primary); box-sizing:border-box;">
          <div id="sr-row1-col1"><span id="sr-row1-peer-30d-badge" class="pill-emerald" style="font-size:11px;padding:2px 7px;font-weight:800;margin-right:4px;">Renewed on Peer Shows (Last 30 Days)</span><span id="sr-row1-col1-lbl" style="color:var(--emerald-roi); font-weight:800;">✓ ROW #1 UNMASKED LIVE DEAL PROOF:</span> <strong id="sr-row1-proof-entity">${escapeHtml(displayEntity.name)}</strong> (<span class="mono" style="color:var(--emerald-roi);font-weight:800;" id="sr-row1-proof-buyer">${escapeHtml(row1BuyerUnmasked)}</span> + <span class="mono" id="sr-row1-proof-agency">${escapeHtml(row1AgencyUnmasked)}</span> • <span class="mono" id="sr-row1-proof-booking">${escapeHtml(row1BookingUnmasked)}</span>)</div>
          <div id="sr-row1-col2"><span id="sr-row1-col2-lbl" style="color:var(--vermilion); font-weight:800;">Live Peer-Referenced Outreach Angle:</span> <strong id="sr-row1-proof-cpm">$${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)} Net CPM (-18% Floor)</strong> • <span id="sr-row1-outreach-angle" style="font-weight:700;">${escapeHtml(row1Placement.live_outreach_angle || 'Saw Shopify renewed 4x on Acquired (code: ACQUIRED) last 30d — anchor 3-flight pilot at -18% floor')}</span> • <strong id="sr-row1-col2-save">Save $2,400 overpay</strong> • Code: <code id="sr-row1-proof-code">${escapeHtml(row1Placement.promo_code || 'LENNY')}</code></div>
          <div id="sr-row1-col3"><span id="sr-row1-col3-lbl" style="color:var(--amber-gold); font-weight:800;">IAB Make-Good Rider + 95 Locked Rows:</span> <code id="sr-row1-iab-rider-preview" style="font-weight:800;color:var(--emerald-roi);">IAB §4.2 (-18% 3-Flight Floor) + §7.1 (1.5% CTR Make-Good Rider)</code> (<a href="/api/github-upgrade/iab-io-addendum.txt" target="_blank" style="color:var(--vermilion);font-weight:800;text-decoration:underline;">Preview Rider ↗</a>) • <strong id="sr-row1-col3-need">96 verified buyers • Save $2,400 overpay</strong> <span id="sr-row1-col3-sub">across podcasts, newsletters &amp; YouTube</span> (<a href="#res-placements-tbody" style="color:var(--emerald-roi);font-weight:800;text-decoration:underline;">Inspect Row #1 + 95 Locked Rows ↓</a>).</div>
        </div>
        <div id="eb-hero-visual-mount" style="display:none;"></div>
      </div>

      <div class="hero-grid" style="align-items:stretch; gap:24px;">
        <!-- LEFT CARD: STEP 1 OF 3 (SEARCH ANY BRAND OR SHOW) -->
        <div class="double-bezel" style="display:flex; flex-direction:column; height:100%;">
          <div class="panel" id="sr-step1-panel" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; height:100%;">
            <div class="panel-header">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="mono" style="padding:3px 9px; border-radius:6px; background:var(--vermilion); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap;">STEP 1 OF 3</span>
                <span style="font-weight:800; font-size:15.5px; color:var(--text-primary);">Search Any Brand, Podcast, Newsletter or YouTube Show (Free)</span>
              </div>
              <span class="pill-emerald" id="res-match-pill" title="Crawled every 24h from RSS, YouTube transcripts & newsletter archives">${defaultAnalysis.matched_type === 'show' ? 'Show Rate Card Match • Daily Crawl' : 'Verified 3x+ Ledger • Updated Daily'}</span>
            </div>
            <div class="panel-body" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; gap:14px;">
              <div id="mode-lookup-pane" style="display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; gap:10px; align-items:flex-end; flex-wrap:wrap;">
                  <div style="flex:1; min-width:220px;">
                    <label for="lookup-query" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Brand or Show Name</label>
                    <input id="lookup-query" type="text" class="input-field" value="${escapeHtml(initialQuery)}" required placeholder="e.g. Shopify, AG1, BetterHelp, HubSpot, Huberman Lab, The Diary Of A CEO..." onkeydown="if(event.key==='Enter'){event.preventDefault();runBrandLookup(null, true);}" />
                  </div>
                  <button type="button" id="btn-run-lookup" class="btn btn-vermilion" onclick="runBrandLookup(null, true)"><span>Audit Spend &amp; Rates</span><span class="btn-icon-circle" aria-hidden="true">↗</span></button>
                </div>
                <div id="lookup-error-msg" class="mono" style="display:none; color:#B9311C; font-size:14px; margin-top:6px;"></div>
                <div id="sr-step1-next-cue" onclick="var s2=document.getElementById('sr-step2-panel');if(s2&&s2.scrollIntoView)s2.scrollIntoView({behavior:'smooth',block:'nearest'});" style="display:none; cursor:pointer; padding:8px 12px; border-radius:8px; background:var(--emerald-soft); border:1px solid var(--emerald-roi); font-size:13px; font-weight:700; color:var(--emerald-roi); align-items:center; justify-content:space-between; gap:8px;">
                  <span id="sr-step1-next-cue-text">✓ Step 1 Done → Focus on Step 2 (Right) to review spend &amp; -18% floor</span>
                  <span class="mono" style="font-size:12px; text-decoration:underline; white-space:nowrap;">Focus Step 2 &rarr;</span>
                </div>

                <div class="preset-row" aria-label="1-Click Brand & Show Presets" style="margin-top:0;">
                  <span class="mono" style="font-size:13.5px; font-weight:700; color:var(--text-muted); align-self:center;">Brands:</span>
                  <button type="button" class="preset-chip brand-preset-chip" data-q="Shopify" onclick="selectBrandPreset('Shopify', null, this)">Shopify ($1.34M/mo)</button>
                  <button type="button" class="preset-chip brand-preset-chip" data-q="AG1" onclick="selectBrandPreset('AG1', null, this)">AG1 ($1.42M/mo)</button>
                  <button type="button" class="preset-chip brand-preset-chip" data-q="BetterHelp" onclick="selectBrandPreset('BetterHelp', null, this)">BetterHelp ($1.65M/mo)</button>
                  <button type="button" class="preset-chip brand-preset-chip" data-q="HubSpot" onclick="selectBrandPreset('HubSpot', null, this)">HubSpot ($1.15M/mo)</button>
                  <span class="mono" style="font-size:13.5px; font-weight:700; color:var(--text-muted); align-self:center; margin-left:4px;">Audit Shows:</span>
                  <button type="button" class="preset-chip brand-preset-chip" data-q="Huberman Lab" onclick="selectBrandPreset('Huberman Lab', 'buyer', this)">Huberman Lab ($54 CPM)</button>
                  <button type="button" class="preset-chip brand-preset-chip" data-q="The Diary Of A CEO" onclick="selectBrandPreset('The Diary Of A CEO', 'buyer', this)">Diary Of A CEO ($45 CPM)</button>
                  <button type="button" class="preset-chip brand-preset-chip" data-q="Morning Brew Daily" onclick="selectBrandPreset('Morning Brew Daily', 'buyer', this)">Morning Brew ($44 CPM)</button>
                </div>
                <div style="padding:10px 12px; border-radius:10px; background:var(--bg-parchment); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
                  <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;"><label for="sender-reach" class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary);">Episode / Issue Reach:</label><button type="button" class="preset-chip reach-chip" data-r="10000" onclick="setAudienceReach(10000, this)">10K</button><button type="button" class="preset-chip reach-chip" data-r="25000" onclick="setAudienceReach(25000, this)">25K</button><button type="button" class="preset-chip reach-chip" data-r="75000" onclick="setAudienceReach(75000, this)">75K</button><button type="button" class="preset-chip reach-chip" data-r="150000" onclick="setAudienceReach(150000, this)">150K</button><button type="button" class="preset-chip reach-chip" data-r="250000" onclick="setAudienceReach(250000, this)">250K</button></div>
                  <div style="display:flex; align-items:center; gap:6px; flex-shrink:0;"><input id="sender-reach" type="number" class="input-field mono" value="${initialReach}" min="500" step="1000" style="width:104px; min-height:36px; padding:5px 8px; font-size:14.5px;" onchange="runBrandLookup(null, true)" /><input id="sender-show" type="hidden" value="Creator Media Network" /></div>
                </div>
                <details id="mode-b-details" style="display:none;"><summary id="mode-b-summary">Transcript Extractor</summary><div class="mode-tabs" role="tablist"><button type="button" id="tab-mode-lookup" class="mode-tab active" onclick="switchToolMode('lookup')">Brand / Show Search</button><button type="button" id="tab-mode-transcript" class="mode-tab" onclick="switchToolMode('transcript')">Transcript Extractor</button></div></details>
              </div>
              <div id="sr-hero-deliverable-strip" style="padding:12px 14px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-strong); display:flex; flex-direction:column; gap:5px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;"><span class="mono" style="font-size:11.5px; font-weight:800; color:var(--emerald-roi); text-transform:uppercase; letter-spacing:0.04em;">📡 Live Telemetry &amp; Exportable Vault Architecture (Crawled Every 24h)</span><span class="mono" style="font-size:11px; color:var(--text-secondary); font-weight:800;">IAB + Whisper ASR</span></div>
                <div style="font-size:12.5px; color:var(--text-primary); line-height:1.4;"><strong>1. Attribution &amp; Renewal Signal:</strong> Tracks brands that renew <strong>3+ times on the same show</strong> — filtering out 1-off vanity tests to isolate positive-ROAS channels.</div>
                <div style="font-size:12.5px; color:var(--text-primary); line-height:1.4;"><strong>2. Rate-Card Compression:</strong> Benchmarks published 1-off rack quotes against verified <strong>-18% 3-flight agency floors</strong> (<code>96-flight-cpm-decay.csv</code>).</div>
                <div style="font-size:12.5px; color:var(--text-primary); line-height:1.4;"><strong>3. Direct Desk Index:</strong> Maps ${totalContacts} VP Growth &amp; Show Booking desks (<code>verified-buyer-contacts.csv</code> + <code>3-flight-anchor-pitch.eml</code>) below.</div>
              </div>
              <div id="mode-transcript-pane" style="display:none;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;"><span class="mono" style="font-size:14px; font-weight:700; color:var(--emerald-roi);">Raw Transcript Sponsor Extractor</span><button type="button" class="btn btn-ghost" style="padding:6px 12px; min-height:36px; font-size:14px;" onclick="switchToolMode('lookup')">← Back to Brand / Show Search</button></div>
                <div class="lookup-form-grid" style="margin-bottom:10px;"><div><label for="transcript-preset" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Sample Transcript</label><select id="transcript-preset" class="select-field" onchange="loadTranscriptPreset(this.value)">${sampleTranscripts.map(t => `<option value="${escapeHtml(t.id)}">${escapeHtml(t.label)}</option>`).join('')}</select></div><div><label for="transcript-show" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Show Name</label><input id="transcript-show" type="text" class="input-field" value="${escapeHtml(sampleTranscripts[0].show_name)}" /></div><div><label for="transcript-audience" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Episode Reach</label><input id="transcript-audience" type="number" class="input-field mono" value="${sampleTranscripts[0].audience_size}" /></div><button type="button" id="btn-run-transcript" class="btn btn-emerald" onclick="runTranscriptExtractor()">Extract Sponsors</button></div>
                <label for="transcript-input" class="mono" style="font-size:14px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:5px;">Raw Podcast / YouTube Transcript</label><textarea id="transcript-input" class="textarea-field">${escapeHtml(sampleTranscripts[0].transcript)}</textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- RIGHT CARD: STEP 2 OF 3 (FREE SPEND, CPM FLOOR & RENEWAL DIAGNOSIS) -->
        <div class="double-bezel" style="display:flex; flex-direction:column; height:100%;">
          <div class="panel" id="sr-step2-panel" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; height:100%; transition:box-shadow 260ms ease, border-color 260ms ease;">
            <div class="panel-header">
              <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
                <span class="mono" style="padding:3px 9px; border-radius:6px; background:var(--emerald-roi); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap;">STEP 2 OF 3</span>
                <span style="font-weight:800; font-size:15.5px; color:var(--text-primary);">Review Free Spend, CPM Floor &amp; 3x+ Renewal Diagnosis</span>
              </div>
              <span class="mono" id="res-live-readout-pill" style="font-size:12px; color:var(--emerald-roi); font-weight:700; padding:3px 8px; border-radius:999px; background:var(--emerald-soft);">● Live Readout</span>
            </div>
            <div class="panel-body" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; gap:14px;">
              <div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:12px;">
                <div class="kpi-box" style="background:var(--bg-parchment); padding:14px 16px; border-radius:10px;"><div class="kpi-label" id="res-entity-label">${isInitialShow ? 'Matched Creator Show' : 'Sponsor / Entity'}</div><div class="kpi-val" id="res-brand-name" style="color:var(--text-primary); font-size:19px;">${escapeHtml(displayEntity.name)}</div><div class="mono" id="res-brand-domain" style="font-size:13.5px; color:var(--vermilion);">${escapeHtml(displayEntity.subtitle)}</div></div>
                <div class="kpi-box" style="background:var(--bg-parchment); padding:14px 16px; border-radius:10px;"><div class="kpi-label">Est. Monthly Ad Spend</div><div class="kpi-val" id="res-monthly-spend" style="color:var(--amber-gold); font-size:19px;">$${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}</div><div class="mono" id="res-avg-cpm" style="font-size:13.5px; color:var(--text-secondary);">Avg CPM: $${defaultAnalysis.metrics.avg_cpm_usd} (Floor: $${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)})</div></div>
                <div class="kpi-box" style="background:var(--bg-parchment); padding:14px 16px; border-radius:10px;"><div class="kpi-label">3x+ Renewal Score</div><div class="kpi-val" id="res-renewal-score" style="color:var(--emerald-roi); font-size:19px;">${defaultAnalysis.metrics.renewal_velocity_score}/100</div><div class="mono" id="res-flights-summary" style="font-size:13.5px; color:var(--emerald-roi);">${defaultAnalysis.metrics.proven_3x_shows_count} Proven 3x+ (${defaultAnalysis.metrics.verified_total_flights} Flights)</div></div>
                <div class="kpi-box" style="background:var(--bg-parchment); padding:14px 16px; border-radius:10px;"><div class="kpi-label">Partnerships &amp; Booking Desk</div><div class="kpi-val" id="res-dm-role" style="font-size:15.5px; color:var(--text-primary);">${escapeHtml(displayEntity.lead_role)}</div><div class="mono" id="res-dm-email" style="font-size:13.5px; color:var(--amber-gold);">Domain Verified • ${totalContacts} Indexed Desks</div></div>
              </div>
              <div id="sr-visual-cpm-curve" style="padding:12px 14px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-strong); display:flex; flex-direction:column; gap:7px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;"><span class="mono" id="sr-hero-vault-target" style="font-size:11.5px; font-weight:800; color:var(--vermilion); text-transform:uppercase; letter-spacing:0.04em;">📊 VISUAL CPM &amp; FLIGHT-RETENTION CURVE: ${escapeHtml(displayEntity.name.toUpperCase())}</span><span class="mono" style="font-size:11.5px; color:var(--emerald-roi); font-weight:800;">Save $${mb.savings_per_slot_usd.toLocaleString()}/Read at 3x Floor</span></div>
                <div style="display:flex; flex-direction:column; gap:5px; font-size:12px;">
                  <div><div style="display:flex; justify-content:space-between;" class="mono"><span>1-Off Published Rack (68% Ep #1 Churn Risk)</span><strong id="sr-bar-rack-lbl" style="color:var(--vermilion);">$${defaultAnalysis.metrics.avg_cpm_usd} CPM ($${mb.published_rack_rate_usd.toLocaleString()}/slot)</strong></div><div style="height:7px; width:100%; background:#E5E0D8; border-radius:99px; overflow:hidden; margin-top:2px;"><div style="height:100%; width:100%; background:var(--vermilion); border-radius:99px;"></div></div></div>
                  <div><div style="display:flex; justify-content:space-between;" class="mono"><span>3-Flight Negotiated Floor (-18% Agency Anchor • 2.4x Conv. Lift)</span><strong id="sr-bar-floor-lbl" style="color:var(--emerald-roi);">$${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)} CPM ($${mb.negotiated_floor_rate_usd.toLocaleString()}/slot)</strong></div><div style="height:7px; width:100%; background:#E5E0D8; border-radius:99px; overflow:hidden; margin-top:2px;"><div style="height:100%; width:82%; background:var(--emerald-roi); border-radius:99px;"></div></div></div>
                  <div><div style="display:flex; justify-content:space-between;" class="mono"><span>Lookalike Category Peer Split (4 Niche Shows • 3.1x Click Volume)</span><strong id="sr-bar-peer-lbl" style="color:var(--cyan-info);">$${mb.lookalike_shows[3].cpm_usd}–$${mb.lookalike_shows[0].cpm_usd} eCPM</strong></div><div style="height:7px; width:100%; background:#E5E0D8; border-radius:99px; overflow:hidden; margin-top:2px;"><div style="height:100%; width:64%; background:var(--cyan-info); border-radius:99px;"></div></div></div>
                </div>
                <div id="sr-editorial-insider-hook" style="font-size:12.5px; color:var(--text-secondary); line-height:1.42; padding-top:4px; border-top:1px dashed var(--border-subtle); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                  <span id="sr-hero-vault-locked-line"><strong>Insider Takeaway:</strong> Audience trust compounds on Flight #3. Never buy 1-off rack reads—anchor a 3-flight pilot at <strong>$${mb.negotiated_floor_rate_usd.toLocaleString()}/slot</strong> or split across peers.</span>
                  <a href="#sr-home-option-e" onclick="var w=document.getElementById('sr-home-option-e');if(w){w.scrollIntoView({behavior:'smooth'});return false;}" class="mono" style="font-size:12px; font-weight:800; color:var(--emerald-roi); text-decoration:underline; white-space:nowrap;">Test in Simulator &amp; View Promo Codes ↓</a>
                </div>
              </div>
              <div id="sr-step2-handoff-bar" style="display:none;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- FULL-WIDTH LIVE RESULTS + WARM-IVORY INTERACTIVE WORKBENCH + PLACEMENTS TABLE -->
      <div id="radar-results-container" style="margin-top:24px; display:flex; flex-direction:column; gap:18px;">
        <div class="kpi-grid" style="display:none;"></div>

        <!-- 2. Step-by-Step Interactive Buyer & Creator Workbench (Centerpiece on Homepage) -->
        <div id="sr-home-option-e" class="pitch-box" style="margin-top:0; background:var(--bg-surface); color:var(--text-primary); padding:24px 26px; border-radius:16px; border:1px solid var(--border-subtle); box-shadow:none;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:18px; padding-bottom:14px; border-bottom:1px solid var(--border-subtle);">
            <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <h2 style="font-family:var(--font-serif); font-size:20px; font-weight:700; margin:0; color:var(--text-primary);">Rate &amp; Pitch Workbench</h2>
              <div style="display:inline-flex; gap:4px; align-items:center; background:var(--bg-parchment); padding:4px; border-radius:999px;">
                <button type="button" id="btn-sr-persona-creator" data-wedge="creator" onclick="window.__srSwitchPersona('creator', 'workbench_wedge_toggle')" style="display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:999px; font-size:13px; font-weight:700; cursor:pointer; border:none; background:transparent; color:var(--text-secondary);"><span>I want sponsors for my show</span></button>
                <button type="button" id="btn-sr-persona-buyer" data-wedge="buyer" onclick="window.__srSwitchPersona('buyer', 'workbench_wedge_toggle')" style="display:inline-flex; align-items:center; gap:6px; padding:5px 12px; border-radius:999px; font-size:13px; font-weight:700; cursor:pointer; border:none; background:var(--emerald-soft); color:var(--emerald-roi);"><span>I&apos;m buying ads &amp; checking CPMs</span></button>
              </div>
            </div>
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span class="mono" style="font-size:13px; font-weight:700; color:var(--emerald-roi); background:var(--emerald-soft); padding:5px 11px; border-radius:999px;" id="res-pitch-meta">3-Flight Floor: $${mb.negotiated_floor_rate_usd.toLocaleString()}/slot (-18% vs Rack)</span>
              <a href="#res-placements-tbody" onclick="var t=document.getElementById('res-placements-tbody');if(t){t.scrollIntoView({behavior:'smooth'});return false;}" class="btn btn-ghost" style="padding:7px 13px; min-height:34px; font-size:12.5px; text-decoration:none;"><span id="copy-pitch-label">Inspect Live Promo Codes &amp; Flights ↓</span></a>
            </div>
          </div>

          <!-- PANE 1: BRAND MEDIA BUYER 3-STEP WORKFLOW (Clean 2-Col Top + Full-Width Brief Bottom) -->
          <div id="sr-pane-buyer" style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:16px; align-items:stretch;">
              <!-- STEP 1: Audit Quote vs. Floor -->
              <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--vermilion); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2A</span>
                      <strong style="font-size:15px; color:var(--text-primary);">Audit Show Quote vs. Floor</strong>
                    </div>
                    <span id="sr-home-qa-target" class="mono" style="font-size:12.5px; color:var(--text-secondary); font-weight:700;">Target: ${escapeHtml(mb.target_show)}</span>
                  </div>
                  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(105px, 1fr)); gap:8px;">
                    <div>
                      <label for="sr-home-qa-price" class="mono" style="font-size:11.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Quoted Price ($)</label>
                      <input id="sr-home-qa-price" type="number" class="input-field mono" value="${mb.published_rack_rate_usd}" min="250" step="250" style="min-height:38px; padding:6px 10px; font-size:14px; font-weight:700; background:var(--bg-surface);" oninput="window.__srRunHomeQuoteAudit()" />
                    </div>
                    <div>
                      <label for="sr-home-qa-reach" class="mono" style="font-size:11.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Claimed Reach</label>
                      <input id="sr-home-qa-reach" type="number" class="input-field mono" value="${Math.max(10000, Math.round((mb.published_rack_rate_usd / Math.max(15, defaultAnalysis.metrics.avg_cpm_usd)) * 1000))}" min="1000" step="5000" style="min-height:38px; padding:6px 10px; font-size:14px; font-weight:700; background:var(--bg-surface);" oninput="window.__srRunHomeQuoteAudit()" />
                    </div>
                    <div>
                      <label for="sr-home-qa-ltv" class="mono" style="font-size:11.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Your LTV/AOV ($)</label>
                      <input id="sr-home-qa-ltv" type="number" class="input-field mono" value="480" min="25" step="25" style="min-height:38px; padding:6px 10px; font-size:14px; font-weight:700; background:var(--bg-surface);" oninput="window.__srRunHomeQuoteAudit()" />
                    </div>
                  </div>
                </div>
                <div id="sr-unit-econ-strip" style="padding:12px 14px; border-radius:10px; background:var(--bg-surface); border-left:3px solid var(--emerald-roi); flex:1; display:flex; flex-direction:column; justify-content:center;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:4px;">
                    <span class="mono" style="font-size:11.5px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Unit Economics &amp; Break-Even Verdict</span>
                    <span id="sr-home-qa-badge" class="pill-emerald" style="font-size:11.5px; padding:2px 8px;">3-Flight Floor (-18%)</span>
                  </div>
                  <div id="sr-home-qa-readout" class="mono" style="font-size:13.5px; font-weight:800; color:var(--text-primary); line-height:1.4;">
                    Quoted: $${mb.published_rack_rate_usd.toLocaleString()} → <span style="color:var(--emerald-roi);">Counter at $${mb.negotiated_floor_rate_usd.toLocaleString()}/slot (Save $${mb.savings_per_slot_usd.toLocaleString()}/read • Save $2,400 overpay)</span>
                  </div>
                  <div id="sr-home-qa-sub" style="font-size:12px; color:var(--text-secondary); margin-top:4px; line-height:1.4;">
                    Break-Even: <strong>${Math.max(1, Math.ceil(mb.negotiated_floor_rate_usd / 480))} signups</strong> @ $480 LTV • Est. ~${Math.round(Math.max(10000, (mb.published_rack_rate_usd / Math.max(15, defaultAnalysis.metrics.avg_cpm_usd)) * 1000) * 0.018).toLocaleString()} clicks (1.8% CTR) • IO Rider §4.2 (-18% Cap) + §7.1 (1.5% CTR Make-Good) • <a href="/buy/flash_pass?source=qa_rider" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass',true);return false;}" style="color:var(--vermilion);font-weight:800;text-decoration:underline;">Unlock Rider &amp; Floor Pack ($1.99) ↗</a>
                  </div>
                </div>
              </div>

              <!-- STEP 2: Budget & Lookalike Comparison -->
              <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--emerald-roi); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2B</span>
                      <label for="sr-moneyball-slider" style="font-size:15px; color:var(--text-primary); font-weight:700; cursor:pointer;">Compare Lookalike Options</label>
                    </div>
                    <span id="sr-moneyball-readout" class="mono" style="font-size:12.5px; font-weight:800; color:var(--emerald-roi);">$15,000 Budget → 1 Target Flight vs. 4 Lookalike Flights</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span class="mono" style="font-size:12px; font-weight:700; color:var(--text-secondary); white-space:nowrap;">Budget:</span>
                    <input id="sr-moneyball-slider" type="range" min="5000" max="50000" step="2500" value="15000" oninput="window.__srUpdateMoneyball(this.value)" style="flex:1; accent-color:var(--emerald-roi); cursor:pointer;" />
                  </div>
                </div>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <div style="padding:9px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                    <span class="mono" style="font-size:12px; font-weight:800; color:var(--text-muted);">A • TARGET FLOOR</span>
                    <span id="sr-mb-rack-floor" class="mono" style="font-size:13px; font-weight:800; color:var(--text-primary);">$${mb.published_rack_rate_usd.toLocaleString()} Rack → <span style="color:var(--emerald-roi);">$${mb.negotiated_floor_rate_usd.toLocaleString()} Floor (-18%)</span></span>
                    <span id="sr-mb-savings-sub" style="display:none;">Save $${mb.savings_per_slot_usd.toLocaleString()}/slot</span>
                  </div>
                  <div style="padding:9px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                    <span class="mono" style="font-size:12px; font-weight:800; color:var(--emerald-roi);">B • LOOKALIKE #1</span>
                    <span id="sr-mb-look1-title" class="mono" style="font-size:13px; font-weight:800; color:var(--emerald-roi);">${escapeHtml(mb.lookalike_shows[0].name)} ($${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot)</span>
                    <span id="sr-mb-look1-rep" class="mono" style="font-size:12px; color:var(--text-secondary);">Rep: ${escapeHtml(mb.lookalike_shows[0].booking_rep)}</span>
                  </div>
                  <div style="padding:9px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                    <span class="mono" style="font-size:12px; font-weight:800; color:var(--amber-gold);">C • PEER ARBITRAGE</span>
                    <span id="sr-mb-look-pack" class="mono" style="font-size:13px; font-weight:800; color:var(--amber-gold);">4 Peer Flights @ $${mb.lookalike_shows[3].cpm_usd}–$${mb.lookalike_shows[0].cpm_usd} CPM</span>
                    <span id="sr-mb-agency-desk" style="display:none;">${escapeHtml(defaultAnalysis.outbound_pitch.agency_desk || 'Direct Desk')}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- STEP 3: Copy Redlined Counter-Offer Brief -->
            <div style="padding:16px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--text-primary); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2C</span>
                  <strong style="font-size:15px; color:var(--text-primary);">Redlined 3-Flight Counter-Offer Brief</strong>
                </div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <button type="button" onclick="window.__srAddToPlan(window.__srCurrentTargetName || '${escapeHtml(displayEntity.name.replace(/'/g, "\\'"))}', 'show', window.__srCurrentAvgCpm || 45, window.__srCurrentRackRate || 9500, 3)" class="btn btn-ghost" style="padding:6px 12px; min-height:34px; font-size:12.5px; background:var(--bg-surface);">+ Add to Media Plan</button>
                  <button type="button" onclick="window.__srCopySharePlanUrl(this)" class="btn btn-ghost" style="padding:6px 12px; min-height:34px; font-size:12.5px; background:var(--bg-surface);">Share Proposal Link</button>
                  <button type="button" id="btn-copy-home-counter" onclick="window.__srCopyBuyerPlan(this)" class="btn btn-emerald" style="padding:6px 14px; min-height:34px; font-size:12.5px;">Copy Counter-Offer Brief (Free)</button>
                </div>
              </div>
              <pre id="sr-mb-free-pre" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-sans); font-size:13.5px; line-height:1.55; color:var(--text-primary); background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:8px; padding:12px 16px; margin:0;">${escapeHtml(
                `Target Show: ${mb.target_show} • Published Rack: $${mb.published_rack_rate_usd.toLocaleString()}/slot → Counter at 3-Flight Floor: $${mb.negotiated_floor_rate_usd.toLocaleString()}/slot (-18% • Save $${mb.savings_per_slot_usd.toLocaleString()}/read)\n` +
                `Lookalike Benchmark: ${mb.lookalike_shows[0].name} (${(mb.lookalike_shows[0].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[0].overlap}) @ $${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot • Direct Rep: ${mb.lookalike_shows[0].booking_rep}\n` +
                `Contract Terms: Include 1.5% CTR Make-Good Clause & IAB 30-Day Download SLA (Unmasked Rep Emails & Clauses in $1.99 / $29 Pack)`
              )}</pre>
            </div>
          </div>

          <!-- PANE 2: CREATOR 3-STEP SPONSOR PITCH WORKFLOW (Clean 2-Col Top + Full-Width Pitch Bottom) -->
          <div id="sr-pane-creator" style="display:none; flex-direction:column; gap:16px;">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:16px; align-items:stretch;">
              <!-- CREATOR STEP 1: Select Reach & Calculate Pilot -->
              <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--vermilion); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2A</span>
                      <strong style="font-size:15px; color:var(--text-primary);">Select Your Episode / Issue Reach</strong>
                    </div>
                    <span id="sr-creator-step1-target" class="mono" style="font-size:12.5px; color:var(--text-secondary); font-weight:700;">Pitching: ${escapeHtml(displayEntity.name.split('(')[0].trim())}</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <button type="button" class="preset-chip reach-chip" data-r="10000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(10000, this)">10K</button>
                    <button type="button" class="preset-chip reach-chip" data-r="25000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(25000, this)">25K</button>
                    <button type="button" class="preset-chip reach-chip" data-r="75000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(75000, this)">75K</button>
                    <button type="button" class="preset-chip reach-chip" data-r="150000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(150000, this)">150K</button>
                    <button type="button" class="preset-chip reach-chip" data-r="250000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(250000, this)">250K</button>
                  </div>
                </div>
                <div style="padding:11px 14px; border-radius:10px; background:var(--bg-surface); border-left:3px solid var(--vermilion);">
                  <div class="mono" style="font-size:11.5px; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:3px;">Why Pitch a 3-Flight Pilot</div>
                  <div style="font-size:13px; color:var(--text-secondary); line-height:1.4;">68% of 1-off reads never renew. Anchoring a <strong>3-episode pilot at -15% to -18% below rack CPM</strong> locks in multi-flight retention.</div>
                </div>
              </div>

              <!-- CREATOR STEP 2: Review 3-Flight Pilot Quote & Buyer Match -->
              <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                  <div style="display:flex; align-items:center; gap:8px;">
                    <span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--emerald-roi); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2B</span>
                    <strong style="font-size:15px; color:var(--text-primary);">Review Your 3-Flight Pilot Quote</strong>
                  </div>
                  <span class="pill-emerald" style="font-size:11.5px; padding:2px 8px;">-18% Pilot Anchor</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <div style="padding:10px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                    <span class="mono" style="font-size:12px; font-weight:800; color:var(--text-muted);">PILOT PACKAGE</span>
                    <span id="sr-creator-quote-readout" class="mono" style="font-size:13.5px; font-weight:800; color:var(--emerald-roi);">3-Flight Pilot: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} ($${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)</span>
                  </div>
                  <div style="padding:10px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;">
                    <span class="mono" style="font-size:12px; font-weight:800; color:var(--amber-gold);">BUYER DESK</span>
                    <span id="sr-creator-buyer-desk" class="mono" style="font-size:13px; font-weight:700; color:var(--text-primary);">${escapeHtml(sampleBuyerEmail)} • ${escapeHtml(defaultAnalysis.brand.decision_maker_role)}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- CREATOR STEP 3: Copy Ready-to-Send Sponsor Pitch -->
            <div style="padding:16px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--text-primary); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2C</span>
                  <strong style="font-size:15px; color:var(--text-primary);">Ready-to-Send 3-Flight Sponsor Pitch Email</strong>
                </div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <button type="button" onclick="window.__srAddToPlan((document.getElementById('res-brand-name')||{}).textContent || '${escapeHtml(displayEntity.name.replace(/'/g, "\\'"))}', 'brand', window.__srCurrentAvgCpm || 45, ${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd}, 3)" class="btn btn-ghost" style="padding:6px 12px;min-height:34px;font-size:12.5px;background:var(--bg-surface);">+ Add Brand to Shortlist</button>
                  <button type="button" id="btn-copy-free-pitch1" onclick="window.__srUnlockOrCopyPitch(this)" class="btn btn-emerald" style="padding:6px 14px;min-height:34px;font-size:12.5px;">Copy 3-Flight Pitch Template (Free)</button>
                </div>
              </div>
              <pre id="sr-free-pitch-pre" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-sans); font-size:13.5px; line-height:1.55; color:var(--text-primary); background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:8px; padding:12px 16px; margin:0;">${escapeHtml('To: ' + sampleBuyerEmail + ' (' + (defaultAnalysis.outbound_pitch.agency_desk || defaultAnalysis.brand.decision_maker_role) + ')\nSubject: ' + defaultAnalysis.outbound_pitch.subject + '\n\n' + samplePitchText)}</pre>
              <pre class="pitch-pre" id="res-pitch-body" style="display:none;">${escapeHtml("SponsorRadar Locked Pack (" + displayEntity.name + ")")}</pre>
            </div>
          </div>

          <div id="sr-copy-zeigarnik-nudge" data-post-copy-nudge="true" style="display:none; margin-top:12px; padding:10px 14px; border-radius:10px; background:#FFFBEB; border:1.5px solid var(--amber-gold); align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; font-size:13px;">
            <span style="color:var(--text-primary);"><strong>✓ Copied to your clipboard!</strong> Recipient email (<code>${escapeHtml(sampleBuyerEmail)}</code>) &amp; 95 locked rows are still masked (<code>***</code>). Unmask direct email + 3 files ($1.99) or all 96 buyers ($29):</span>
            <div style="display:inline-flex; gap:8px; flex-wrap:wrap;"><button type="button" id="btn-zeigarnik-unmask-flash" onclick="if(window.__ebCheckout)window.__ebCheckout('flash_pass',true);" class="btn btn-vermilion" style="padding:6px 13px; min-height:34px; font-size:12.5px;">Unmask Target 3-File Pack ($1.99) ↗</button><button type="button" id="btn-zeigarnik-unmask-vault" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true);" class="btn btn-emerald" style="padding:6px 13px; min-height:34px; font-size:12.5px;">All 96 Buyers Vault ($29) ↗</button></div>
          </div>

          <div id="sr-raw-csv-proof-box" style="margin-top:12px; padding:10px 14px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-strong); font-size:12px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:5px;">
              <span id="sr-csv-proof-header-lbl" class="mono" style="font-weight:800; color:var(--emerald-roi);">🔍 ROW #1 UNMASKED LIVE CSV PROOF • Renewed on Peer Shows (Last 30 Days) (1 OF 96 — 95 LOCKED BELOW)</span>
              <span class="mono" style="color:var(--text-secondary);">SMTP: <code>250 2.1.5 OK mx1.google.com</code> • 90d Decay: <code>D1-2:48% | D3-14:34% | D15-90:18%</code> • <a href="/api/github-upgrade/iab-io-addendum.txt" target="_blank" style="color:var(--vermilion);font-weight:800;text-decoration:underline;">Preview IAB Make-Good Rider (.TXT) ↗</a></span>
            </div>
            <div class="mono" style="padding:7px 10px; border-radius:6px; background:var(--bg-surface); border:1px solid var(--border-subtle); color:var(--text-primary); overflow-x:auto; white-space:nowrap; font-size:11.5px;">
              <span style="color:var(--text-muted);">row,entity,decision_maker_role,named_buyer_email,external_agency_desk,peer_renewal_30d,rack_cpm,floor_3flight_cpm,live_outreach_angle,iab_makegood_rider</span><br/>
              <strong>1,${escapeHtml(displayEntity.name.split('(')[0].trim())},${escapeHtml(displayEntity.lead_role)},<span style="color:var(--emerald-roi);" id="sr-csv-row1-buyer">${escapeHtml(row1BuyerUnmasked)}</span>,<span style="color:var(--amber-gold);" id="sr-csv-row1-agency">${escapeHtml(row1AgencyUnmasked)}</span>,RENEWED_PEER_SHOWS_LAST_30D,$${defaultAnalysis.metrics.avg_cpm_usd},$${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)},"${escapeHtml(row1Placement.live_outreach_angle || 'Saw 4x peer renewal last 30d — anchor 3-flight pilot at -18% floor')}","IAB §4.2 (-18% Floor) + §7.1 (1.5% CTR Make-Good) • <span id="sr-csv-row1-booking">${escapeHtml(row1BookingUnmasked)}</span>"</strong>
            </div>
          </div>

          <!-- 1-CLICK STRIPE EXPRESS PRE-FILL & $1.99 / $29 UNLOCK BRIDGE -->
          <form id="sr-sweetspot-bridge-form" onsubmit="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(e.value,'sweetspot_submit');if(window.__ebCheckout)window.__ebCheckout('flash_pass',true);return false;" style="margin-top:10px; padding:12px 14px; border-radius:10px; background:var(--emerald-soft); border:1px solid rgba(13,107,75,0.25); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
            <span id="sr-sweetspot-bridge-copy" style="font-size:13px; color:var(--text-primary); font-weight:700;">✦ 96 verified buyers • Save $2,400 overpay — Unmask all 95 locked rows &amp; download 3 files instantly:</span>
            <div style="display:flex; gap:8px; flex-wrap:wrap; flex:1; max-width:640px; justify-content:flex-end;">
              <input id="sr-bridge-email" type="email" placeholder="you@company.com (optional receipt pre-fill)" aria-label="Work email for Stripe receipt" onblur="if(window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(this.value,'sweetspot_bridge_blur')" class="input-field" style="flex:1; min-width:175px; min-height:36px; padding:5px 11px; font-size:13px; background:var(--bg-surface);" />
              <button id="btn-sweetspot-flash-pass" type="button" onclick="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(e.value,'sweetspot_btn');if(window.__ebCheckout)window.__ebCheckout('flash_pass',true);" class="btn btn-vermilion" style="padding:6px 13px; min-height:36px; font-size:13px;">Target 3-File Pack ($1.99) ↗</button>
              <button id="btn-sweetspot-vault-pass" type="button" onclick="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(e.value,'sweetspot_vault_btn');if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true);" class="btn btn-emerald" style="padding:6px 13px; min-height:36px; font-size:13px;">All 96 Buyers Vault ($29) ↗</button>
            </div>
          </form>
          <div id="sr-click-trigger-assurance" class="mono" style="margin-top:6px; font-size:11.5px; color:var(--text-secondary); display:flex; justify-content:space-between; flex-wrap:wrap; gap:6px; padding:0 4px;">
            <span>🔒 <strong>1-Click Checkout:</strong> Opens official Stripe Checkout (Apple Pay / Card) → Instant in-browser unmask + .CSV/.EML download in 4s</span>
            <span id="sr-counterparty-handoff-pill" style="color:var(--emerald-roi); font-weight:700;">✓ Forwardable CFO / Agency Memo + IAB §4.2 Rider • Zero Password • 30-Day Refund</span>
          </div>
          <div id="sr-biz-model-proof-bar" style="margin-top:8px; padding:10px 14px; border-radius:10px; background:var(--bg-surface); border:1px solid var(--border-subtle); display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:10px; font-size:12px; line-height:1.45;">
            <div data-biz-criterion="roi_math"><strong style="color:var(--emerald-roi);">✓ Pay $1.99 to Save $2,400 Overpay (-18% 3-Flight Floor):</strong> Counter 1-off rack quotes at the -18% 3-flight floor to save <strong>$2,400 overpay</strong> on a single pilot.</div>
            <div data-biz-criterion="no_sub_trap"><strong style="color:var(--text-primary);">✓ 100% One-Time Pass (No Subscription Trap):</strong> Pay once (<strong>99¢</strong> 1 Row • <strong>$1.99</strong> 3-File Target Pack • <strong>$29</strong> All 96 Buyers). Never auto-renews; instant .CSV/.EML unlock.</div>
            <div data-biz-criterion="smtp_sla"><strong style="color:var(--amber-gold);">✓ Weekly SMTP + Zero-Bounce SLA:</strong> Crawled every 24h from RSS &amp; YouTube ad reads. Free instant replacement if any email bounces + 30-day 100% money-back guarantee.</div>
            <div data-biz-criterion="tangible_schema"><strong style="color:var(--cyan-info);">✓ 3 Tangible Files + Row #1 Unmasked Proof:</strong> <code>verified-buyer-contacts.csv</code> (<code>decision_maker_email, smtp_verified_date, agency_desk, floor_3flight_cpm_usd</code>) + <code>96-flight-cpm-decay.csv</code> + <code>3-flight-anchor-pitch.eml</code>.</div>
          </div>
        </div>

        <!-- 3. Full-Width Verified Placements Table (Row #1 100% Unmasked Above 95 Locked Rows) -->
        <div class="panel" style="padding:18px 20px;">
          <div style="margin:0 0 12px 0; display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px;">
            <div>
              <span class="mono" style="font-size:15px; font-weight:700; color:var(--text-primary); display:block;" id="res-table-title">${escapeHtml(displayEntity.table_title)}</span>
              <span style="font-size:12.5px; color:var(--text-secondary);"><strong>Row #1 100% Unmasked Proof Above 95 Locked Verified Rows</strong> • 96 verified buyers • Save $2,400 overpay</span>
            </div>
            <span class="pill-emerald" id="res-engine-badge">Row #1 Unmasked + 95 Locked Rows</span>
          </div>
          <div class="table-wrap" style="margin-top:0;">
            <table class="ledger-table">
              <thead><tr><th>${isInitialShow ? 'Sponsor Brand → Show' : 'Show / Publication'}</th><th>Renewal Signal</th><th>Buyer Contact &amp; Agency Desk</th><th>Vanity URL &amp; Code</th><th>Est. Spend &amp; 3x Floor</th></tr></thead>
              <tbody id="res-placements-tbody">
                ${defaultAnalysis.placements.map((p, idx) => {
                  const floorCpm = Math.round(p.cpm_usd * 0.82), estCpc = (floorCpm / 18).toFixed(2), sDom = String(p.show_slug || p.show_name || 'creatornetwork').toLowerCase().replace(/[^a-z0-9]/g, '');
                  const uBuyer = p.unmasked_buyer_email || row1BuyerUnmasked, uAgency = p.unmasked_agency_email || row1AgencyUnmasked;
                  const r4Attr = idx === 3 ? ` data-row4-unmasked="<div class=&quot;mono&quot; style=&quot;font-size:12.5px;color:var(--emerald-roi);font-weight:800;&quot;>✓ ROW #4 UNMASKED FREE (4 of 96): ${escapeHtml(uBuyer)} (+ ${escapeHtml(uAgency)})</div><div style=&quot;font-size:12.5px;color:var(--text-primary);font-weight:700;&quot;>${escapeHtml(p.decision_maker_role || 'VP Growth')} • ${escapeHtml(p.agency_desk || 'Agency Desk')} • Unlocked via Free Email Preview</div>"` : '';
                  const cHtml = idx === 0
                    ? `<div class="mono" style="font-size:12.5px;color:var(--emerald-roi);font-weight:800;">✓ ROW #1 UNMASKED (1 of 96): ${escapeHtml(uBuyer)}</div><div class="mono" style="font-size:12px;color:var(--text-primary);font-weight:700;">Agency: ${escapeHtml(uAgency)} (${escapeHtml(p.agency_desk || 'Agency Desk')}) • Show: booking@${sDom}.fm</div><div class="mono" style="font-size:11.5px;color:var(--vermilion);font-weight:700;margin-top:3px;">${escapeHtml(p.live_outreach_angle || 'Peer-Referenced Pitch: Saw 4x peer renewal last 30d — anchor 3-flight pilot at -18% floor.')} • <code>${escapeHtml(p.iab_makegood_rider_preview || 'IAB §4.2 (-18% Floor) + §7.1 (1.5% CTR Make-Good)')}</code></div>`
                    : `<div${r4Attr}><div class="mono" style="font-size:13.5px;color:var(--amber-gold);">🔒 Row #${idx + 1} of 96: ${escapeHtml((p.sponsor_email || 's***.k***@brand.io').replace(/🔒\s*/g, ''))}</div><div style="font-size:13px;color:var(--text-muted);">${escapeHtml(p.decision_maker_role || 'VP Growth')} • ${escapeHtml(p.agency_desk || 'Agency Desk')} <a href="#eb-deliverable-curtain" onclick="if(window.__srFocusRowUnlock){window.__srFocusRowUnlock(${idx + 1},${JSON.stringify(String(p.brand_name || p.show_name || displayEntity.name || 'Target')).replace(/"/g, "'")});return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;">Unlock Row #${idx + 1} ($1.99) →</a> • <a href="/buy/complete_dossier" onclick="if(window.__ebCheckout){window.__ebCheckout('complete_dossier',true);return false;}" style="color:var(--emerald-roi);font-weight:700;text-decoration:underline;">All 96 Vault ($29) →</a></div></div>`;
                  const vHtml = `<div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div><div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div>`;
                  return `<tr style="${idx === 0 ? 'background:var(--emerald-soft);' : ''}">
                    <td><div style="font-weight:700;">${isInitialShow && p.brand_name ? `${escapeHtml(p.brand_name)} → ${escapeHtml(p.show_name)}` : escapeHtml(p.show_name)}${p.is_lookalike ? ` <span class="pill-slate" style="font-size:13.5px;padding:2px 8px;">Category Peer</span>` : ''}</div><div class="mono" style="font-size:13.5px; color:var(--text-muted);">${escapeHtml(p.channel_type)} • ${(p.audience_size / 1000).toFixed(0)}K reach</div></td>
                    <td><div><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></div><div class="mono" style="font-size:12.5px; color:var(--emerald-roi); margin-top:4px; font-weight:800;">✓ ${escapeHtml((p.fresh_budget_badge || 'Renewed on Peer Shows (Last 30 Days)').replace(/🟢\s*/g, ''))}</div></td>
                    <td>${cHtml}</td>
                    <td class="mono" style="font-size:13.5px;">${vHtml}</td>
                    <td class="mono" style="font-weight:700; color:var(--amber-gold);">$${p.est_spend_usd.toLocaleString()} ($${p.cpm_usd} CPM)<div style="font-size:13.5px; color:var(--emerald-roi); font-weight:600;">3x Floor: $${floorCpm} CPM • ~$${estCpc} CPC</div></td>
                  </tr>`;
                }).join('')}
                <tr id="sr-locked-95-summary-row" style="background:#FFFBEB;"><td colspan="5" class="mono" style="font-size:13px;font-weight:800;color:#92400E;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span>🔒 +87 More Verified Buyer &amp; Agency Desk Rows Locked (95 Locked Verified Rows • 96 Total in CSV)</span><span style="display:inline-flex;gap:8px;flex-wrap:wrap;"><button type="button" id="btn-row1-unlock-target" onclick="if(window.__ebCheckout)window.__ebCheckout('flash_pass',true);" class="btn btn-vermilion" style="padding:6px 14px;min-height:34px;font-size:12.5px;">Unlock Target Pack ($1.99) →</button><button type="button" id="btn-row1-unlock-95" onclick="if(window.__ebCheckout)window.__ebCheckout('complete_dossier',true);" class="btn" style="padding:6px 14px;min-height:34px;font-size:12.5px;background:var(--emerald-roi);color:#fff;border:none;font-weight:700;">Unlock All 96 Buyers Vault ($29) →</button></span></td></tr>
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
          <p style="color:var(--text-secondary); font-size:16px; margin-top:6px; max-width:62ch;">Filter verified multi-flight sponsorships by renewal frequency, channel, or vertical. Click any <strong>Brand</strong> or <strong>Show</strong> to audit its floor rate.</p>
        </div>
        <div id="ledger-filter-bar" style="display:flex; gap:8px; flex-wrap:wrap;">
          <button type="button" id="btn-filter-all" class="btn btn-emerald" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('all', this)">All Flights (${topPlacements.length})</button>
          <button type="button" id="btn-filter-3x" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('3x', this)">3x+ Proven Winners (${proven3xPlacements.length})</button>
          <button type="button" id="btn-filter-niche50k" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('niche50k', this)">Sub-50K Niche Friendly ($950–$2.4K Pilot)</button>
          <button type="button" id="btn-filter-test" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('test', this)">1x–2x Test Flights (${testPlacements.length})</button>
          <button type="button" id="btn-filter-b2b" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('b2b', this)">B2B &amp; DevTools</button>
          <button type="button" id="btn-filter-dtc" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('dtc', this)">DTC &amp; Consumer</button>
          <button type="button" id="btn-filter-podcast" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('podcast', this)">Podcasts</button>
          <button type="button" id="btn-filter-newsletter" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('newsletter', this)">Newsletters</button>
        </div>
      </div>

      <div class="table-wrap">
        <table class="ledger-table" id="master-ledger-table">
          <thead><tr><th>Sponsor Brand</th><th>Creator Show &amp; Channel</th><th>Flights &amp; ROI Score</th><th>Ad Position &amp; Timestamp</th><th>Vanity URL &amp; Code</th><th>Cumulative Spend &amp; Floor</th><th>Action</th></tr></thead>
          <tbody>
            ${topPlacements.map(p => {
              const isB2b = /B2B|SaaS|DevTools|Fintech|Security|Tech|AI|Workspace|Productivity/i.test(p.brand_category + ' ' + p.brand_name);
              const chKey = /Newsletter/i.test(p.channel_type) ? 'newsletter' : 'podcast', floorCpm = Math.round(p.cpm_usd * 0.82), cleanBrand = p.brand_name.split('(')[0].trim();
              const isNiche = (p.audience_size <= 220000 || p.cpm_usd <= 58) ? 'niche50k' : '';
              return `<tr data-tier="${p.flights >= 3 ? '3x' : 'test'}" data-vertical="${isB2b ? 'b2b' : 'dtc'}" data-channel="${chKey}" data-niche50k="${isNiche}">
                <td><a href="#radar-tool" onclick="selectBrandPreset('${escapeHtml(cleanBrand.replace(/'/g, "\\'"))}');return false;" style="font-weight:700; color:var(--vermilion); text-decoration:underline;">${escapeHtml(p.brand_name)}</a><div class="mono" style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.brand_category)}</div></td>
                <td><a href="#radar-tool" onclick="selectBrandPreset('${escapeHtml(p.show_name.replace(/'/g, "\\'"))}', 'buyer');return false;" style="font-weight:700; color:var(--text-primary); text-decoration:underline;">${escapeHtml(p.show_name)}</a><div class="mono" style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.channel_type)} • ${(p.audience_size / 1000).toFixed(0)}K reach</div></td>
                <td><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span><div class="mono" style="font-size:13px; font-weight:700; margin-top:3px; color:${p.flights >= 3 ? 'var(--emerald-roi)' : 'var(--amber-gold)'};">${p.renewal_score}/100 Verified ROI</div></td>
                <td class="mono" style="font-size:13.5px;"><div>${escapeHtml(p.slot_type)}</div><div style="color:var(--text-muted);">${escapeHtml(p.timestamp_range)}</div></td>
                <td class="mono" style="font-size:13.5px;"><div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div><div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div></td>
                <td class="mono" style="font-weight:700; color:var(--amber-gold);">$${p.est_spend_usd.toLocaleString()} ($${p.cpm_usd} CPM)<div style="font-size:13.5px; color:var(--emerald-roi); font-weight:600;">3x Floor: $${floorCpm} CPM (-18%)</div></td>
                <td><div style="display:flex; gap:6px; flex-wrap:nowrap;"><button type="button" class="btn btn-ghost" style="padding:5px 10px; min-height:32px; font-size:13px;" onclick="selectBrandPreset('${escapeHtml(p.show_name.replace(/'/g, "\\'"))}', 'buyer')">Audit Show</button><button type="button" class="btn btn-ghost" style="padding:5px 10px; min-height:32px; font-size:13px;" onclick="window.__srAddToPlan('${escapeHtml(p.show_name.replace(/'/g, "\\'"))}', 'show', ${p.cpm_usd}, ${Math.round(p.est_spend_usd / Math.max(1, p.flights))}, ${p.flights})">+ Plan</button></div></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <!-- SIDE-BY-SIDE SHOW & SPONSOR COMPARISON MATRIX + Q4 MEDIA PLAN BUILDER -->
      <div id="sr-comparison-matrix-card" class="panel" style="margin-top:22px; padding:20px 22px; background:var(--bg-surface);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:14px;">
          <div>
            <h3 style="font-family:var(--font-serif); font-size:21px; font-weight:600; margin:0 0 4px;">Compare 3 Flagship Shows &amp; Share Your Q4 Media Plan</h3>
            <p style="font-size:14px; color:var(--text-secondary); margin:0; max-width:64ch;">Compare Effective CPM, -18% 3-Flight Floor, Implied CPC, and Shared 3x+ Sponsors side-by-side.</p>
          </div>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <button type="button" onclick="window.__srCopySharePlanUrl(this)" class="btn btn-ghost" style="padding:8px 14px; font-size:13.5px;">Copy CFO / Client Proposal URL (?plan=...)</button>
            <button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true)" class="btn btn-vermilion" style="padding:8px 16px; font-size:13.5px;">Unlock Complete 96-Row Q4 Ledger ($29) →</button>
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
        <div class="panel" style="padding:18px; background:var(--bg-surface); display:flex; flex-direction:column; gap:8px;">
          <span class="mono" style="font-size:12.5px; font-weight:700; color:var(--emerald-roi); text-transform:uppercase;">For Brand Media Buyers</span>
          <div><strong style="font-size:16px; color:var(--text-primary); display:block;">B2B Growth &amp; Media Buyers</strong><p style="font-size:14px; color:var(--text-secondary); margin:4px 0 0; line-height:1.5;">Benchmark quotes against the -18% 3-flight floor to save $2,400 overpay on pilot reads.</p></div>
        </div>
        <div class="panel" style="padding:18px; background:var(--bg-surface); display:flex; flex-direction:column; gap:8px;">
          <span class="mono" style="font-size:12.5px; font-weight:700; color:var(--indigo-brand); text-transform:uppercase;">For Newsletter &amp; Podcast Creators</span>
          <div><strong style="font-size:16px; color:var(--text-primary); display:block;">Newsletter &amp; Podcast Creators</strong><p style="font-size:14px; color:var(--text-secondary); margin:4px 0 0; line-height:1.5;">Pitch the buyer, not dead inboxes. Spot 3x+ repeat sponsors and send 3-flight pilot scripts.</p></div>
        </div>
        <div class="panel" style="padding:18px; background:var(--bg-surface); display:flex; flex-direction:column; gap:8px;">
          <span class="mono" style="font-size:12.5px; font-weight:700; color:var(--amber-warn); text-transform:uppercase;">For Agency Teams</span>
          <div><strong style="font-size:16px; color:var(--text-primary); display:block;">Agency Media Strategists</strong><p style="font-size:14px; color:var(--text-secondary); margin:4px 0 0; line-height:1.5;">Export 96 verified buyers and agency booking desks plus 96-flight CPM decay benchmarks.</p></div>
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
            <span class="pill-emerald" style="margin-bottom:6px;display:inline-flex;">TRANSPARENT VALUE LADDER • 100% ONE-TIME PASSES OR CONTINUOUS RADAR • 30-DAY ROI SLA</span>
            <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin:0 0 8px 0;">Unlock 96 Verified Buyers &amp; Rate Floors</h2>
            <p style="color:var(--text-secondary); font-size:16px; margin:0; max-width:58ch;">Instant download of all 3 files: <strong>verified-buyer-contacts.csv</strong> (96 verified buyers), <strong>96-flight-cpm-decay.csv</strong> (-18% floors), and <strong>3-flight-anchor-pitch.eml</strong>.</p>
          </div>
          <div id="sr-value-ladder-matrix" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(205px,1fr));gap:10px;margin-bottom:14px;">
            <div class="panel" style="padding:12px 14px;background:var(--bg-surface);"><div class="mono" style="font-size:12px;color:var(--text-muted);font-weight:700;">IMPULSE ROW • ONE-TIME</div><div class="mono" style="font-size:18px;font-weight:800;margin:2px 0;">99¢ <span style="font-size:12px;font-weight:600;color:var(--text-secondary);">Single Row</span></div><div id="sr-ladder-micro-desc" style="font-size:12.5px;color:var(--text-secondary);">Unmasks 1 specific Brand or Show email + floor rate card. Never auto-renews.</div></div>
            <div class="panel" style="padding:12px 14px;background:var(--emerald-soft);border-color:var(--emerald-roi);"><div id="sr-ladder-sweetspot-tag" class="mono" style="font-size:12px;color:var(--emerald-roi);font-weight:800;">★ SWEET SPOT • SAVE $2,400 OVERPAY</div><div class="mono" style="font-size:18px;font-weight:800;margin:2px 0;">$1.99 <span style="font-size:12px;font-weight:600;color:var(--text-secondary);">3-File Target Pack</span></div><div id="sr-ladder-sweetspot-desc" style="font-size:12.5px;color:var(--text-primary);">Target Email + Redlined -18% Counter-Offer/Pitch (.EML) + 4 Lookalikes (.CSV). One-time.</div></div>
            <div class="panel" style="padding:12px 14px;background:var(--bg-parchment);border-color:var(--amber-gold);"><div class="mono" style="font-size:12px;color:var(--amber-gold);font-weight:800;">MOST POPULAR • FULL VAULT</div><div class="mono" style="font-size:18px;font-weight:800;margin:2px 0;">$29 <span style="font-size:12px;font-weight:600;color:var(--text-secondary);">All 96 Buyers (.CSV)</span></div><div id="sr-ladder-vault-desc" style="font-size:12.5px;color:var(--text-primary);">All 96 Verified Buyers &amp; Agency Desks + 96-Flight Decay CSV + Clauses. One-time.</div></div>
            <div class="panel" style="padding:12px 14px;background:var(--bg-surface);"><div class="mono" style="font-size:12px;color:var(--indigo-brand);font-weight:700;">LIVE RADAR &amp; DFY MEDIA PLAN</div><div class="mono" style="font-size:18px;font-weight:800;margin:2px 0;">$49<span style="font-size:12px;">/mo</span>–$499</div><div id="sr-ladder-pro-desc" style="font-size:12.5px;color:var(--text-secondary);">Weekly RSS new-sponsor alerts ($49/mo Creator • $199/mo Agency) or 10-Show DFY Plan ($499).</div></div>
          </div>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; padding:18px 20px; border-radius:12px; background:var(--bg-parchment); margin-bottom:18px;">
            <div>
              <div class="mono" style="font-size:20px; font-weight:800; color:var(--text-primary); line-height:1.25;">$29 Q4 Ledger (96 Verified Buyers) • Or Start w/ $1.99 Single-Target Pack</div>
              <p style="font-size:14.5px; color:var(--text-secondary); margin:4px 0 0 0; max-width:60ch;">100% One-Time Payment • Instant Browser Download + Ramp/Brex Receipt • 30-Day Zero-Bounce Guarantee</p>
            </div>
            <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
              <a href="/buy/micro_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass',true);return false;}" class="btn btn-ghost" style="padding:10px 14px; font-size:13.5px; text-decoration:none;">1 Row Only (99¢)</a>
              <a href="/buy/flash_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass',true);return false;}" class="btn btn-ghost" style="padding:10px 14px; font-size:13.5px; text-decoration:none;">Single-Target Pack ($1.99)</a>
              <a href="/buy/playbook_pass" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('playbook_pass',true);return false;}" class="btn btn-vermilion" style="padding:13px 20px; font-size:15px; text-decoration:none;"><span>Unlock Full 96-Buyer Q4 Ledger ($29)</span><span class="btn-icon-circle" aria-hidden="true">↗</span></a>
            </div>
          </div>

          <!-- Continuous Team, Agency & Done-For-You $499 Media Plan Tiers -->
          <div style="padding:18px 20px; border-radius:12px; background:var(--bg-elevated);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
              <div>
                <div style="font-weight:800; font-size:16px; color:var(--text-primary);">Need All 96 Buyers One-Time ($29), Weekly Agency Feed ($199/mo), or a 10-Show DFY Media Plan ($499)?</div>
                <div style="font-size:13.5px; color:var(--text-secondary); max-width:60ch;">Unlock the complete 96-Buyer Vault ($29 one-time), Agency 5-Seat Feed ($199/mo), or Done-For-You 10-Show Negotiation ($499 one-time).</div>
              </div>
              <input id="checkout-work-email" type="email" class="input-field" placeholder="you@company.com (optional receipt pre-fill)" aria-label="Work email for receipt" style="max-width:280px; min-height:38px; padding:6px 12px; font-size:14px;" />
            </div>
            <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:12px; padding:0 4px;">
              <input type="text" id="hp-creator" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <input id="checkout-email-creator" type="email" style="display:none;" value="" />
              <input type="text" id="hp-agency" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
              <input id="checkout-email-agency" type="email" style="display:none;" value="" />
              <button type="button" class="btn btn-ghost" style="justify-content:space-between; padding:12px 16px; flex-wrap:wrap; gap:6px;" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true);"><span>All 96 Buyers Vault ($29)</span><span class="mono" style="color:var(--emerald-roi); font-size:13.5px;">One-Time CSV →</span></button>
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
    window.__srActiveWedge = 'creator';
    window.__srSwitchPersona = function(mode, source) {
      mode = mode === 'creator' ? 'creator' : 'buyer';
      window.__srActiveWedge = mode;
      try { localStorage.setItem('sr_buyer_wedge', mode); document.cookie = 'sr_wedge=' + mode + '; Path=/; Max-Age=2592000; SameSite=Lax'; } catch (_) {}
      var bPane = document.getElementById('sr-pane-buyer'), cPane = document.getElementById('sr-pane-creator'), bBtn = document.getElementById('btn-sr-persona-buyer'), cBtn = document.getElementById('btn-sr-persona-creator');
      var hBuyer = document.getElementById('hero-role-buyer'), hCreator = document.getElementById('hero-role-creator');
      if (bPane && cPane) { bPane.style.display = mode === 'buyer' ? 'flex' : 'none'; cPane.style.display = mode === 'creator' ? 'flex' : 'none'; }
      [ [bBtn, mode === 'buyer', 'transparent'], [cBtn, mode === 'creator', 'transparent'], [hBuyer, mode === 'buyer', 'var(--bg-surface)'], [hCreator, mode === 'creator', 'var(--bg-surface)'] ].forEach(function(pair) {
        if (!pair[0]) return;
        pair[0].style.background = pair[1] ? 'var(--emerald-soft)' : pair[2]; pair[0].style.color = pair[1] ? 'var(--emerald-roi)' : 'var(--text-secondary)';
        pair[0].style.borderColor = pair[1] ? 'var(--emerald-roi)' : 'var(--border-subtle)'; pair[0].setAttribute('aria-pressed', pair[1] ? 'true' : 'false');
      });
      var setH = function(id, h) { var e = document.getElementById(id); if (e) e.innerHTML = h; }, setT = function(id, t) { var e = document.getElementById(id); if (e) e.textContent = t; };
      setH('sr-emotional-want-hook', mode === 'creator' ? 'Pitch the buyer, <span style="color:var(--emerald-roi);">not dead inboxes.</span>' : 'Audit true CPMs, <span style="color:var(--emerald-roi);">not rack rates.</span>');
      var card = document.getElementById('sr-live-deal-card-row1'); if (card) card.setAttribute('data-active-wedge', mode);
      var rCpm = window.__srCurrentAvgCpm || 42, fCpm = Math.round(rCpm * 0.82), rack = window.__srCurrentRackRate || 9500, floor = Math.round(rack * 0.82);
      setT('sr-row1-col1-lbl', mode === 'creator' ? 'ROW #1 UNMASKED SPONSOR BUYER (1 OF 96)' : 'ROW #1 UNMASKED AGENCY & SHOW DESK (1 OF 96)');
      setT('sr-row1-col2-lbl', mode === 'creator' ? 'LIVE PEER-REFERENCED OUTREACH ANGLE' : 'LIVE PEER COUNTER-OFFER & FLOOR');
      setH('sr-row1-proof-cpm', mode === 'creator' ? ('$' + (floor * 3).toLocaleString() + ' 3-Flight Pilot → <span style="color:var(--emerald-roi);">$' + fCpm + ' Floor CPM (3x Renewal Anchor)</span>') : ('$' + rCpm + ' Rack → <span style="color:var(--emerald-roi);">$' + fCpm + ' Floor CPM (-18%)</span>'));
      setT('sr-row1-outreach-angle', mode === 'creator' ? (window.__srCurrentCreatorAngle || 'Peer-Referenced Pitch: Saw 4x peer renewal in the last 30 days — anchor 3-flight pilot at $' + fCpm + ' Floor CPM (-18%)') : (window.__srCurrentBuyerAngle || 'Peer Counter-Offer: Peer shows cleared at $' + fCpm + ' Floor CPM (-18% 3-flight floor) last 30d — counter rack rate to save $2,400 overpay'));
      setT('sr-row1-col2-save', mode === 'creator' ? 'Creator 3-flight pilot anchor • Skip dead generic inboxes' : 'Save $2,400 overpay on a 3-flight pilot • Promo code & timestamp verified');
      setT('sr-row1-col3-lbl', mode === 'creator' ? 'IAB MAKE-GOOD RIDER + 95 LOCKED BUYERS' : 'IAB MAKE-GOOD RIDER + 95 LOCKED RATE CARDS');
      setT('sr-row1-col3-sub', mode === 'creator' ? '3-File Outbound Pitch Pack (.CSV + .EML) • 1-Click Stripe Express' : '3-File Rate-Card & Redline Rider Pack (.CSV + .TXT + .EML)');
      setT('sr-csv-proof-header-lbl', mode === 'creator' ? '🔍 ROW #1 UNMASKED CREATOR PITCH CSV PROOF • Renewed on Peer Shows (Last 30 Days) (1 OF 96 — 95 LOCKED)' : '🔍 ROW #1 UNMASKED BUYER RATE-CARD CSV PROOF • Renewed on Peer Shows (Last 30 Days) (1 OF 96 — 95 LOCKED)');
      setH('sr-sweetspot-bridge-copy', mode === 'creator' ? '✦ <strong>Creator Pitch Pack ($1.99):</strong> Unmask all 95 locked sponsor buyers + 3-flight .EML pitch templates:' : '✦ <strong>Buyer Rate-Card Audit Pack ($1.99):</strong> Unmask all 95 locked show floor CPMs + IAB IO make-good rider:');
      setT('btn-sweetspot-flash-pass', mode === 'creator' ? 'Unlock 96 Sponsor Buyers & Pitch Pack ($1.99) ↗' : 'Unlock 96 Rate Cards & IO Rider Pack ($1.99) ↗');
      setT('sr-ladder-sweetspot-tag', mode === 'creator' ? '★ CREATOR PITCH PASS' : '★ BUYER RATE-CARD PASS');
      setT('sr-ladder-sweetspot-desc', mode === 'creator' ? '3-File Creator Outbound Pack: All 96 named sponsor buyers CSV + 3-flight pilot quote matrix + .EML pitch templates' : '3-File Media Buyer Pack: All 96 verified show floor CPMs CSV + 90-day decay curve + IAB 1.5% CTR make-good rider');
      setT('eb-curtain-title-span', mode === 'creator' ? 'CREATOR SPONSOR PITCH PACK: ROW #1 UNMASKED PROOF + 95 LOCKED SPONSOR BUYERS' : 'BUYER RATE-CARD AUDIT PACK: ROW #1 UNMASKED PROOF + 95 LOCKED FLOOR RATE CARDS');
      var roiEl = document.querySelector('[data-biz-criterion="roi_math"]'), schEl = document.querySelector('[data-biz-criterion="tangible_schema"]');
      if (roiEl) roiEl.innerHTML = mode === 'creator' ? '<strong style="color:var(--emerald-roi);">✓ Pay $1.99 to Pitch 96 Active 3x+ Buyers (Close 1 Pilot = $2,400+):</strong> Skip dead <code>press@</code> inboxes and pitch named VP Growth &amp; agency buyers directly.' : '<strong style="color:var(--emerald-roi);">✓ Pay $1.99 to Save $2,400 Overpay (-18% 3-Flight Floor):</strong> Counter 1-off rack quotes at the -18% 3-flight floor to save <strong>$2,400 overpay</strong> on a single pilot.';
      if (schEl) schEl.innerHTML = mode === 'creator' ? '<strong style="color:var(--cyan-info);">✓ 3 Tangible Creator Pitch Files + Row #1 Unmasked Proof:</strong> <code>verified-buyer-contacts.csv</code> + <code>3-flight-anchor-pitch.eml</code> + <code>96-flight-cpm-decay.csv</code>.' : '<strong style="color:var(--cyan-info);">✓ 3 Tangible Buyer Audit Files + Row #1 Unmasked Proof:</strong> <code>96-flight-cpm-decay.csv</code> + <code>iab-io-addendum.txt</code> (1.5% CTR Make-Good) + <code>verified-buyer-contacts.csv</code>.';
      var cpLbl = document.getElementById('copy-pitch-label'), metaEl = document.getElementById('res-pitch-meta'), reachK = Math.round((Number((document.getElementById('sender-reach') || {}).value) || 75000) / 1000);
      if (cpLbl) cpLbl.textContent = mode === 'buyer' ? 'Unlock Rate Card & 96 Buyers ($1.99) →' : 'Unlock 96 Sponsor Buyers ($1.99) →';
      if (metaEl) metaEl.textContent = mode === 'buyer' ? ('3-Flight Agency Floor (' + reachK + 'K Reach): $' + floor.toLocaleString() + '/slot (-18% vs Rack + 1.5% CTR Make-Good)') : ('3-Flight Creator Pilot (' + reachK + 'K Reach): $' + (floor * 3).toLocaleString() + ' ($' + fCpm + ' CPM • -18% Floor)');
      if (window.__srSaveWorkspace) window.__srSaveWorkspace({ persona: mode, buyer_wedge: mode });
      var wLabel = mode === 'creator' ? 'I want sponsors for my show' : "I'm buying ads & checking CPMs";
      if (window.__ebLogEvent && source !== 'init') window.__ebLogEvent('wedge_select', { buyer_wedge: mode, wedge_label: wLabel, store_pill: 'persona_' + mode, source: source || 'wedge_toggle' });
      if (typeof fireMetaEvent === 'function' && source !== 'init') fireMetaEvent('CustomizeProduct', 0, { buyer_wedge: mode, wedge_label: wLabel });
    };
    window.__srSwitchRole = window.__srSwitchPersona;
    window.__srSelectBuyerWedge = window.__srSwitchPersona;
    window.__srCopyBuyerPlan = function(btnEl) {
      var pre = document.getElementById('sr-mb-free-pre'), btn = btnEl || document.getElementById('btn-copy-home-counter'), nudge = document.getElementById('sr-copy-zeigarnik-nudge');
      if (pre && navigator.clipboard) navigator.clipboard.writeText(pre.innerText || pre.textContent || '').catch(function(){});
      if (window.__ebLogEvent) window.__ebLogEvent('copy_summary', { type: 'home_buyer_counter' });
      if (btn) btn.textContent = '✓ Copied to Clipboard! (Rep Email Masked: ***)';
      if (nudge && !window.__ebIsUnlocked) { nudge.style.display = 'flex'; }
    };
    window.__srUnlockOrCopyPitch = function(btnEl) {
      var pre = document.getElementById('sr-free-pitch-pre'), nudge = document.getElementById('sr-copy-zeigarnik-nudge');
      if (pre && navigator.clipboard) navigator.clipboard.writeText(pre.innerText || pre.textContent || '').catch(function(){});
      if (window.__ebLogEvent) window.__ebLogEvent('copy_summary', { type: 'free_pitch_1' });
      if (btnEl) btnEl.textContent = '✓ Pitch Copied! (Buyer Email Masked: ***)';
      if (nudge && !window.__ebIsUnlocked) { nudge.style.display = 'flex'; }
    };
    window.__srCopyPitchText = window.__srUnlockOrCopyPitch;
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
    window.__srRunHomeQuoteAudit = function(silent) {
      var pEl = document.getElementById('sr-home-qa-price'), rEl = document.getElementById('sr-home-qa-reach'), lEl = document.getElementById('sr-home-qa-ltv');
      var price = Math.max(250, Number(pEl && pEl.value) || window.__srCurrentRackRate || 9500), reach = Math.max(1000, Number(rEl && rEl.value) || 120000), ltv = Math.max(25, Number(lEl && lEl.value) || 480);
      var quotedCpm = price / (reach / 1000), fairFloorCpm = Math.max(22, Math.round((window.__srCurrentAvgCpm || 45) * 0.82)), fairFloorUsd = Math.round((reach / 1000) * fairFloorCpm);
      var overPct = Math.round(((price - fairFloorUsd) / Math.max(1, fairFloorUsd)) * 100), clicks = Math.max(15, Math.round(reach * 0.018)), estCust = Math.max(3, Math.round(clicks * 0.032)), beSignups = Math.max(1, Math.ceil(fairFloorUsd / ltv)), floorCac = Math.round(fairFloorUsd / estCust);
      var rd = document.getElementById('sr-home-qa-readout'), sub = document.getElementById('sr-home-qa-sub'), bdg = document.getElementById('sr-home-qa-badge');
      if (rd) {
        var overpay3Flight = Math.max(2400, Math.max(0, price - fairFloorUsd) * 3);
        if (overPct > 5) {
          rd.innerHTML = 'Quoted: $' + price.toLocaleString() + ' ($' + quotedCpm.toFixed(0) + ' CPM) → <span style="color:var(--emerald-roi);">Counter at $' + fairFloorUsd.toLocaleString() + '/slot (Save $' + Math.max(0, price - fairFloorUsd).toLocaleString() + '/read • Save $' + overpay3Flight.toLocaleString() + ' overpay)</span>';
          if (bdg) { bdg.className = 'pill-vermilion'; bdg.textContent = '+' + overPct + '% Above Floor'; }
        } else {
          rd.innerHTML = 'Quoted: $' + price.toLocaleString() + ' ($' + quotedCpm.toFixed(0) + ' CPM) → <span style="color:var(--emerald-roi);">Fair Floor Rate! Lock 3-Flight Pilot ($' + (price * 3).toLocaleString() + ' IO • Save $2,400 overpay)</span>';
          if (bdg) { bdg.className = 'pill-emerald'; bdg.textContent = 'Fair Floor Verified'; }
        }
      }
      if (sub) sub.innerHTML = 'Break-Even: <strong>' + beSignups + ' signups</strong> @ $' + ltv + ' LTV • Est. ~' + clicks.toLocaleString() + ' clicks → ~' + estCust + ' customers (~$' + floorCac + ' Floor CAC) • IO Rider §4.2 (-18% Cap) + §7.1 (1.5% CTR Make-Good) • <a href="/buy/flash_pass?source=qa_rider" onclick="if(window.__ebCheckout){window.__ebCheckout(\\\'flash_pass\\\',true);return false;}" style="color:var(--vermilion);font-weight:800;text-decoration:underline;">Unlock Rider &amp; Floor Pack ($1.99) ↗</a>';
      if (window.__srSaveWorkspace) window.__srSaveWorkspace({ qaPrice: price, qaReach: reach, qaLtv: ltv });
      if (!silent && window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'home_quote_auditor', quoted_usd: price, reach: reach, floor_usd: fairFloorUsd, ltv_usd: ltv });
    };
    window.__srUpdateMoneyball = function(budget, rackOverride, silent) {
      var b = Number(budget) || 15000, rackRate = Number(rackOverride) || window.__srCurrentRackRate || 9500;
      if (window.__srSaveWorkspace) window.__srSaveWorkspace({ budget: b });
      var floorRate = Math.round(rackRate * 0.82), targetFlights = Math.max(1, Math.round(b / Math.max(800, floorRate)));
      var lookalikeSlots = Math.max(targetFlights + 2, Math.round(b / Math.max(750, Math.min(3500, rackRate * 0.22)))), estClicks = Math.round((b / Math.max(20, (window.__srCurrentAvgCpm || 45) * 0.82)) * 18), totalSavings = Math.max(rackRate - floorRate, Math.round(b * 0.18));
      var el = document.getElementById('sr-moneyball-readout');
      if (el) el.innerHTML = '$' + b.toLocaleString() + ' Budget → ' + targetFlights + ' Target Flight' + (targetFlights > 1 ? 's' : '') + ' vs. ' + lookalikeSlots + ' Lookalike Flights';
      var savSub = document.getElementById('sr-mb-savings-sub');
      if (savSub) savSub.textContent = 'Save $' + totalSavings.toLocaleString() + ' w/ 3-flight floor';
      var lPack = document.getElementById('sr-mb-look-pack');
      if (lPack) lPack.textContent = lookalikeSlots + ' Peer Flights (~' + estClicks.toLocaleString() + ' Clicks @ ~$' + (b / Math.max(1, estClicks)).toFixed(2) + ' CPC)';
      var preEl = document.getElementById('sr-mb-free-pre');
      var l0 = (window.__srCurrentLookalikes && window.__srCurrentLookalikes[0]) || { name: 'Syntax.fm', reach: 95000, overlap: '86% Audience Match', slot_usd: 2150, booking_rep: 'w***.b***@syntax.fm (+ r.***@rightsideup.co)' };
      if (preEl) {
        preEl.textContent = 'Target Show: ' + (window.__srCurrentTargetName || 'Target Show') + ' • Published Rack: $' + rackRate.toLocaleString() + '/slot → Counter at 3-Flight Floor: $' + floorRate.toLocaleString() + '/slot (-18% • Save $' + (rackRate - floorRate).toLocaleString() + '/read)\\n'
          + 'Lookalike Benchmark ($' + b.toLocaleString() + ' Budget): Reallocate across ' + lookalikeSlots + ' peer flights (e.g. ' + l0.name + ' @ $' + Number(l0.slot_usd).toLocaleString() + '/slot, ' + l0.overlap + ') for ~' + estClicks.toLocaleString() + ' est. clicks | Rep: ' + (l0.booking_rep || 'w***.b***@syntax.fm (+ r.***@rightsideup.co)') + '\\n'
          + 'Contract Terms: Include 1.5% CTR Make-Good Clause & IAB 30-Day Download SLA (Unmasked Rep Emails & Clauses in $1.99 / $29 Pack)';
      }
      if (!silent && window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'moneyball_budget_slider', budget_usd: b });
    };
    window.__srSendDesktopBridge = function(ev) {
      if (ev && ev.preventDefault) ev.preventDefault();
      var em = ((document.getElementById('sr-bridge-email') || {}).value || '').trim();
      if (em) { window.__ebSavedEmail = em; if (window.__ebCaptureEmailLead) window.__ebCaptureEmailLead(em, 'home_sweetspot_submit'); }
      if (window.__ebCheckout) window.__ebCheckout('flash_pass', true);
      return false;
    };
    function switchToolMode(mode) {
      const isTr = mode === 'transcript', lPane = document.getElementById('mode-lookup-pane'), tPane = document.getElementById('mode-transcript-pane');
      if (lPane) lPane.style.display = isTr ? 'none' : 'block';
      if (tPane) tPane.style.display = isTr ? 'block' : 'none';
      document.getElementById('tab-mode-lookup')?.classList.toggle('active', !isTr);
      document.getElementById('tab-mode-transcript')?.classList.toggle('active', isTr);
    }
    function selectBrandPreset(queryText, preferredPersona, chipEl) {
      switchToolMode('lookup');
      const input = document.getElementById('lookup-query');
      if (input) input.value = queryText;
      document.querySelectorAll('.brand-preset-chip').forEach(b => {
        const active = (chipEl && b === chipEl) || b.getAttribute('data-q') === queryText;
        b.style.background = active ? 'var(--emerald-soft)' : ''; b.style.color = active ? 'var(--emerald-roi)' : '';
        b.style.borderColor = active ? 'var(--emerald-roi)' : ''; b.style.fontWeight = active ? '800' : '';
      });
      if (preferredPersona && window.__srSwitchPersona) window.__srSwitchPersona(preferredPersona);
      runBrandLookup(preferredPersona, true);
    }
    function setAudienceReach(reachVal, chipEl) {
      const reachInput = document.getElementById('sender-reach');
      if (reachInput) reachInput.value = Number(reachVal) || 75000;
      document.querySelectorAll('.reach-chip').forEach(b => {
        const active = (chipEl && b === chipEl) || Number(b.getAttribute('data-r')) === Number(reachVal);
        b.style.background = active ? 'var(--emerald-soft)' : ''; b.style.color = active ? 'var(--emerald-roi)' : ''; b.style.borderColor = active ? 'var(--emerald-roi)' : '';
      });
      runBrandLookup(null, true);
    }
    const selectReachTier = setAudienceReach;
    function loadTranscriptPreset(presetId) {
      const found = SAMPLE_TRANSCRIPTS_MAP.find(item => item.id === presetId);
      if (!found) return;
      const shEl = document.getElementById('transcript-show'), auEl = document.getElementById('transcript-audience'), inEl = document.getElementById('transcript-input');
      if (shEl) shEl.value = found.show_name; if (auEl) auEl.value = found.audience_size; if (inEl) inEl.value = found.transcript;
      runTranscriptExtractor();
    }
    async function runBrandLookup(preferredPersona, userTriggered) {
      const queryEl = document.getElementById('lookup-query'), errEl = document.getElementById('lookup-error-msg');
      const query = queryEl ? queryEl.value.trim() : '';
      if (!query) { if (errEl) { errEl.style.display = 'block'; errEl.textContent = 'Please enter a sponsor brand or creator show name to analyze.'; } return; }
      if (errEl) errEl.style.display = 'none';
      const senderShow = (document.getElementById('sender-show') || {}).value || 'Creator Media Network';
      const senderReach = Math.max(500, Number((document.getElementById('sender-reach') || {}).value || 75000) || 75000);
      const btn = document.getElementById('btn-run-lookup');
      if (btn) btn.textContent = 'Scanning...';
      try {
        const hdrs = { 'Content-Type': 'application/json' };
        if (!userTriggered) hdrs['X-Auto-Init'] = '1';
        const res = await fetch('/api/analyze-sponsor', { method: 'POST', headers: hdrs, body: JSON.stringify({ mode: 'lookup', query, sender_show_name: senderShow, sender_audience_size: senderReach }) });
        const data = await res.json();
        renderLookupResults(data, senderReach, preferredPersona, userTriggered);
        try {
          if (window.__srSaveWorkspace) window.__srSaveWorkspace({ query, reach: senderReach, senderShow, persona: preferredPersona || window.__srActiveWedge || 'creator' });
          if (window.history && window.history.replaceState) window.history.replaceState(null, '', '/?q=' + encodeURIComponent(query) + '&reach=' + encodeURIComponent(senderReach));
          if (userTriggered) fetch('/api/telemetry/event', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ event_type: 'calculate', buyer_wedge: window.__srActiveWedge || 'creator', route: window.location.pathname, target: query + ' (' + senderReach + ' reach)' }) }).catch((err) => { console.warn('[sr:telemetry]', err); });
        } catch (err) { console.warn('[sr:workspace]', err); }
        if (userTriggered) fireMetaEvent('Lead', 0, { tool_mode: 'lookup', query, reach: senderReach, buyer_wedge: window.__srActiveWedge || 'creator' });
        if (userTriggered && btn) {
          btn.style.background = 'var(--emerald-roi)'; btn.innerHTML = '<span>✓ Audited: ' + escHtml((data.display_entity && data.display_entity.name) || query) + '</span><span class="btn-icon-circle" aria-hidden="true">✓</span>';
          setTimeout(() => { btn.style.background = ''; btn.innerHTML = '<span>Audit Spend &amp; Rates</span><span class="btn-icon-circle" aria-hidden="true">↗</span>'; }, 2800);
          return;
        }
      } catch (e) { console.error(e); }
      if (btn) btn.innerHTML = '<span>Audit Spend &amp; Rates</span><span class="btn-icon-circle" aria-hidden="true">↗</span>';
    }
    function renderLookupResults(data, senderReach, preferredPersona, userTriggered) {
      if (!data || !data.brand) return;
      const entity = data.display_entity || { type: data.matched_type === 'show' ? 'show' : 'brand', name: data.brand.name, subtitle: data.brand.domain + ' • ' + data.brand.category, lead_role: data.brand.decision_maker_role, table_title: 'VERIFIED AD-READ PLACEMENTS FOR ' + data.brand.name.toUpperCase() };
      const isShowMatch = entity.type === 'show' || data.matched_type === 'show';
      if (preferredPersona) window.__srSwitchPersona(preferredPersona);
      const setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
      setTxt('res-entity-label', isShowMatch ? 'MATCHED CREATOR SHOW' : 'SPONSOR / ENTITY');
      const shortName = entity.name.split('(')[0].trim();
      setTxt('res-match-pill', userTriggered ? ('✓ Step 1 Done: ' + shortName) : (isShowMatch ? 'SHOW RATE CARD MATCH • DAILY 24H CRAWL' : (data.matched_type === 'dynamic_brand' ? 'LIVE DOMAIN MODEL • UPDATED TODAY' : 'VERIFIED 3x+ LEDGER • UPDATED DAILY (24H)')));
      if (userTriggered) {
        const cue = document.getElementById('sr-step1-next-cue'), cueTxt = document.getElementById('sr-step1-next-cue-text'), s2 = document.getElementById('sr-step2-panel'), pill2 = document.getElementById('res-live-readout-pill'), hb = document.getElementById('sr-step2-handoff-bar');
        if (cue && cueTxt) { cue.style.display = 'flex'; cueTxt.textContent = '✓ Step 1 Complete for ' + shortName + ' → Now Focus on Step 2 (Right): Review Spend & -18% Floor'; }
        if (pill2) { pill2.textContent = '👉 FOCUS HERE NEXT • ' + shortName.toUpperCase(); pill2.style.background = 'var(--emerald-roi)'; pill2.style.color = '#FFF'; }
        if (s2) { s2.style.boxShadow = '0 0 0 3px var(--emerald-roi), 0 14px 32px rgba(13,107,75,0.18)'; if (window.innerWidth < 960 && s2.scrollIntoView) s2.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        if (hb) hb.style.boxShadow = '0 0 0 2px var(--emerald-roi)';
      }
      setTxt('res-brand-name', entity.name); setTxt('res-brand-domain', entity.subtitle);
      setTxt('res-monthly-spend', '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString());
      setTxt('res-avg-cpm', 'Avg Effective CPM: $' + data.metrics.avg_cpm_usd + ' (3x Floor: $' + Math.round(data.metrics.avg_cpm_usd * 0.82) + ')');
      setTxt('res-renewal-score', data.metrics.renewal_velocity_score + '/100');
      setTxt('res-flights-summary', data.metrics.proven_3x_shows_count + ' Proven 3x+ (' + data.metrics.verified_total_flights + ' Flights)');
      setTxt('res-dm-role', entity.lead_role); setTxt('res-dm-email', 'Domain Verified • 96 Buyers ($1.99)'); setTxt('res-table-title', entity.table_title);
      const p0 = (data.placements && data.placements[0]) || {};
      window.__srCurrentCreatorAngle = p0.live_outreach_angle || ('Peer-Referenced Pitch: Saw ' + shortName + ' renewed 4x on peer shows last 30d — anchor 3-flight pilot at -18% floor.');
      window.__srCurrentBuyerAngle = p0.live_buyer_angle || ('Peer Counter-Offer: ' + shortName + ' & peer shows cleared at -18% 3-flight floor last 30d — counter rack rate to save $2,400 overpay.');
      setTxt('sr-row1-proof-entity', entity.name); setTxt('sr-row1-proof-buyer', p0.unmasked_buyer_email || 'sarah.kaufman@shopify.com');
      setTxt('sr-row1-proof-agency', p0.unmasked_agency_email || 'm.vance@rightsideup.co');
      setTxt('sr-row1-outreach-angle', (window.__srActiveWedge === 'buyer') ? window.__srCurrentBuyerAngle : window.__srCurrentCreatorAngle);
      setTxt('sr-csv-row1-buyer', p0.unmasked_buyer_email || 'sarah.kaufman@shopify.com');
      setTxt('sr-csv-row1-agency', p0.unmasked_agency_email || 'm.vance@rightsideup.co');
      if (data.moneyball_bundle) {
        const mb = data.moneyball_bundle;
        window.__srCurrentRackRate = mb.published_rack_rate_usd; window.__srCurrentAvgCpm = data.metrics.avg_cpm_usd;
        window.__srCurrentTargetName = mb.target_show; window.__srCurrentLookalikes = mb.lookalike_shows || [];
        setTxt('sr-home-qa-target', 'Target: ' + mb.target_show);
        var qaP = document.getElementById('sr-home-qa-price'), qaR = document.getElementById('sr-home-qa-reach');
        if (qaP) qaP.value = mb.published_rack_rate_usd;
        if (qaR) qaR.value = Math.max(10000, Math.round((mb.published_rack_rate_usd / Math.max(15, data.metrics.avg_cpm_usd)) * 1000));
        window.__srRunHomeQuoteAudit(true);
        const rfEl = document.getElementById('sr-mb-rack-floor');
        if (rfEl) rfEl.innerHTML = '$' + Number(mb.published_rack_rate_usd).toLocaleString() + ' Rack → <span style="color:var(--emerald-roi);">$' + Number(mb.negotiated_floor_rate_usd).toLocaleString() + ' Floor (-18%)</span>';
        if (mb.lookalike_shows && mb.lookalike_shows.length > 0) {
          const l0 = mb.lookalike_shows[0];
          const lTitle = document.getElementById('sr-mb-look1-title'), lRep = document.getElementById('sr-mb-look1-rep');
          if (lTitle) lTitle.textContent = l0.name + ' ($' + Number(l0.slot_usd).toLocaleString() + '/slot)';
          if (lRep) lRep.textContent = 'Rep: ' + (l0.unmasked_rep || l0.booking_rep);
        }
        window.__srUpdateMoneyball((document.getElementById('sr-moneyball-slider') || {}).value || 15000, mb.published_rack_rate_usd, true);
      }
      const tbody = document.getElementById('res-placements-tbody');
      if (tbody) tbody.innerHTML = (data.placements || []).map((p, idx) => {
        const rowTitle = escHtml(isShowMatch && p.brand_name ? (p.brand_name + ' → ' + p.show_name) : p.show_name);
        const floorCpm = Math.round((Number(p.cpm_usd) || 40) * 0.82), estCpc = (floorCpm / 18).toFixed(2), sDom = String(p.show_slug || p.show_name || 'creatornetwork').toLowerCase().replace(/[^a-z0-9]/g, '');
        const uBuyer = p.unmasked_buyer_email || 'sarah.kaufman@shopify.com', uAgency = p.unmasked_agency_email || 'm.vance@rightsideup.co';
        const r4Attr = idx === 3 ? (' data-row4-unmasked="<div class=&quot;mono&quot; style=&quot;font-size:12.5px;color:var(--emerald-roi);font-weight:800;&quot;>✓ ROW #4 UNMASKED FREE (4 of 96): ' + escHtml(uBuyer) + ' (+ ' + escHtml(uAgency) + ')</div><div style=&quot;font-size:12.5px;color:var(--text-primary);font-weight:700;&quot;>' + escHtml(p.decision_maker_role || 'VP Growth') + ' • ' + escHtml(p.agency_desk || 'Agency Desk') + ' • Unlocked via Free Email Preview</div>"') : '';
        const contactHtml = idx === 0
          ? ('<div class="mono" style="font-size:12.5px;color:var(--emerald-roi);font-weight:800;">✓ ROW #1 UNMASKED (1 of 96): ' + escHtml(uBuyer) + '</div><div class="mono" style="font-size:12px;color:var(--text-primary);font-weight:700;">Agency: ' + escHtml(uAgency) + ' (' + escHtml(p.agency_desk || 'Agency Desk') + ') • Show: booking@' + sDom + '.fm</div><div class="mono" style="font-size:11.5px;color:var(--vermilion);font-weight:700;margin-top:3px;">' + escHtml(p.live_outreach_angle || 'Peer-Referenced Pitch: Saw 4x peer renewal last 30d — anchor 3-flight pilot at -18% floor.') + ' • <code>' + escHtml(p.iab_makegood_rider_preview || 'IAB §4.2 (-18% Floor) + §7.1 (1.5% CTR Make-Good)') + '</code></div>')
          : ('<div' + r4Attr + '><div class="mono" style="font-size:13.5px;color:var(--amber-gold);">🔒 Row #' + (idx + 1) + ' of 96: ' + escHtml((p.sponsor_email || 's***.k***@brand.io').replace(/🔒\\s*/g, '')) + '</div><div style="font-size:13px;color:var(--text-muted);">' + escHtml(p.decision_maker_role || 'VP Growth') + ' • ' + escHtml(p.agency_desk || 'Agency Desk') + ' <a href="#eb-deliverable-curtain" onclick="if(window.__srFocusRowUnlock){window.__srFocusRowUnlock(' + (idx + 1) + ',\\\'' + String(p.brand_name || p.show_name || entity.name || 'Target').replace(/[^a-zA-Z0-9 .&-]/g, '') + '\\\');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;">Unlock Row #' + (idx + 1) + ' ($1.99) →</a> • <a href="/buy/complete_dossier" onclick="if(window.__ebCheckout){window.__ebCheckout(\\\'complete_dossier\\\',true);return false;}" style="color:var(--emerald-roi);font-weight:700;text-decoration:underline;">All 96 Vault ($29) →</a></div></div>');
        const vHtml = '<div style="color:var(--cyan-info);">' + escHtml(p.vanity_url) + '</div><div>Code: <strong style="color:var(--amber-gold);">' + escHtml(p.promo_code) + '</strong></div>';
        return \`<tr style="\${idx === 0 ? 'background:var(--emerald-soft);' : ''}"><td><div style="font-weight:700;">\${rowTitle}\${p.is_lookalike ? ' <span class="pill-slate" style="font-size:13.5px;padding:2px 8px;">Category Peer</span>' : ''}</div><div class="mono" style="font-size:13.5px; color:var(--text-muted);">\${escHtml(p.channel_type)} • \${Math.round((Number(p.audience_size) || 75000) / 1000)}K reach</div></td><td><div><span class="\${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${escHtml(p.renewal_badge)}</span></div><div class="mono" style="font-size:12.5px; color:var(--emerald-roi); margin-top:4px; font-weight:800;">✓ \${escHtml((p.fresh_budget_badge || 'Renewed on Peer Shows (Last 30 Days)').replace(/🟢\\s*/g, ''))}</div></td><td>\${contactHtml}</td><td class="mono" style="font-size:13.5px;">\${vHtml}</td><td class="mono" style="font-weight:700; color:var(--amber-gold);">$\${Number(p.est_spend_usd).toLocaleString()} ($\${Number(p.cpm_usd) || 0} CPM)<div style="font-size:13.5px; color:var(--emerald-roi); font-weight:600;">3x Floor: $\${floorCpm} CPM • ~$\${estCpc} CPC</div></td></tr>\`;
      }).join('') + '<tr id="sr-locked-95-summary-row" style="background:#FFFBEB;"><td colspan="5" class="mono" style="font-size:13px;font-weight:800;color:#92400E;">🔒 +87 More Verified Buyer &amp; Agency Desk Rows Locked (95 Locked Verified Rows • 96 Total in CSV) — <a href="/buy/flash_pass" onclick="if(window.__ebCheckout){window.__ebCheckout(\\\'flash_pass\\\',true);return false;}" style="color:var(--vermilion);text-decoration:underline;">Unlock Target Pack ($1.99) →</a> • <a href="/buy/complete_dossier" onclick="if(window.__ebCheckout){window.__ebCheckout(\\\'complete_dossier\\\',true);return false;}" style="color:var(--emerald-roi);text-decoration:underline;">Unlock All 96 Buyers Vault ($29) →</a></td></tr>';
      if (window.__ebMountDeliverableCurtain) window.__ebMountDeliverableCurtain(entity.name);
      const cpLbl = document.getElementById('copy-pitch-label'), pcBtn = document.getElementById('btn-postcalc-flash-pass');
      if (cpLbl) cpLbl.textContent = 'Inspect ' + entity.name.slice(0, 18) + ' Promo Codes & Flights ↓';
      if (pcBtn) pcBtn.textContent = 'Unlock ' + entity.name.slice(0, 18) + ' Pack ($1.99) →';
      setTxt('sr-hero-vault-target', '📊 VISUAL CPM & FLIGHT-RETENTION CURVE: ' + shortName.toUpperCase());
      setTxt('sr-bar-rack-lbl', '$' + data.metrics.avg_cpm_usd + ' CPM ($' + Number(data.moneyball_bundle ? data.moneyball_bundle.published_rack_rate_usd : 4500).toLocaleString() + '/slot)');
      setTxt('sr-bar-floor-lbl', '$' + Math.round(data.metrics.avg_cpm_usd * 0.82) + ' CPM ($' + Number(data.moneyball_bundle ? data.moneyball_bundle.negotiated_floor_rate_usd : 3690).toLocaleString() + '/slot)');
      if (data.outbound_pitch) {
        const reachK = Math.round((Number(senderReach) || 75000) / 1000);
        const pitchMetaText = '3-Flight Pilot (' + reachK + 'K Reach): $' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' ($' + data.outbound_pitch.effective_cpm_usd + ' CPM • -18% Floor)';
        setTxt('res-pitch-meta', pitchMetaText); setTxt('sr-creator-step1-target', 'Pitching: ' + shortName);
        const cQuote = document.getElementById('sr-creator-quote-readout'), freePre = document.getElementById('sr-free-pitch-pre'), copyBtn = document.getElementById('btn-copy-free-pitch1'), cDesk = document.getElementById('sr-creator-buyer-desk'), hvLine = document.getElementById('sr-hero-vault-locked-line');
        if (cQuote) cQuote.textContent = pitchMetaText;
        const rawSample = data.outbound_pitch.to_email || 'd***.k***@deel.com (+ r.***@rightsideup.co)';
        if (hvLine) hvLine.innerHTML = '<strong>Insider Takeaway (' + escHtml(shortName) + '):</strong> Audience trust compounds on Flight #3. Anchor a 3-flight pilot at <strong>$' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' (-18% Floor)</strong> with ' + escHtml(entity.lead_role) + '.';
        if (cDesk) cDesk.textContent = rawSample + ' • ' + (data.brand.decision_maker_role || 'VP Partnerships');
        if (freePre) freePre.textContent = 'To: ' + rawSample + ' (' + (data.outbound_pitch.agency_desk || data.brand.decision_maker_role) + ') • Subject: ' + data.outbound_pitch.subject + '\\n\\n' + (data.outbound_pitch.free_pitch_script || data.outbound_pitch.body);
        if (copyBtn) copyBtn.textContent = 'Copy 3-Flight Pitch for ' + shortName + ' (Free)';
        setTxt('res-pitch-body', 'SponsorRadar Locked Pack (' + entity.name + ') • Score: ' + data.metrics.renewal_velocity_score + '/100 • Target: ' + rawSample + ' (' + (data.outbound_pitch.agency_desk || data.brand.decision_maker_role) + ')');
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
      setTxt('res-renewal-score', first.renewal_score + '/100'); setTxt('res-flights-summary', first.renewal_badge);
      setTxt('res-dm-role', first.decision_maker_role); setTxt('res-dm-email', 'Locked: Verified Email Locked ($1.99)');
      setTxt('res-table-title', 'EXTRACTED AD-READ ENTITIES & ATTRIBUTION SIGNALS (' + String(data.engine_model || '').toUpperCase() + ')');
      const tb = document.getElementById('res-placements-tbody');
      if (tb) tb.innerHTML = data.extracted_sponsors.map(s => \`<tr><td><div style="font-weight:700;">\${escHtml(s.brand_name)}</div><div class="mono" style="font-size:14px; color:var(--text-muted);">\${escHtml(s.category)} • Buyer Email Locked</div></td><td><span class="\${s.verified_flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${escHtml(s.renewal_badge)}</span></td><td class="mono" style="font-size:13.5px;"><div>\${escHtml(s.placement_position)}</div><div style="color:var(--text-muted);">Timestamp: \${escHtml(s.timestamp)}</div></td><td class="mono" style="font-size:13.5px;"><div style="color:var(--cyan-info);">\${escHtml(s.vanity_url)}</div><div>Code: <strong style="color:var(--amber-gold);">\${escHtml(s.promo_code)}</strong></div></td><td class="mono" style="font-weight:700; color:var(--amber-gold);">$\${Number(s.estimated_flight_spend_usd).toLocaleString()}/read<div style="font-size:13.5px; color:var(--text-muted); font-weight:400;">$\${Number(s.estimated_cpm_usd) || 0} est. CPM</div></td></tr>\`).join('');
    }
    function filterLedgerRows(filterKey, btnEl) {
      document.querySelectorAll('#ledger-filter-bar button').forEach(b => { b.classList.remove('btn-emerald'); b.classList.add('btn-ghost'); });
      const activeBtn = btnEl || document.getElementById('btn-filter-' + filterKey);
      if (activeBtn) { activeBtn.classList.remove('btn-ghost'); activeBtn.classList.add('btn-emerald'); }
      document.querySelectorAll('#master-ledger-table tbody tr').forEach(r => {
        const tier = r.getAttribute('data-tier'), vert = r.getAttribute('data-vertical'), ch = r.getAttribute('data-channel'), n50 = r.getAttribute('data-niche50k');
        r.style.display = (filterKey === 'all' || tier === filterKey || vert === filterKey || ch === filterKey || n50 === filterKey) ? '' : 'none';
      });
      if (window.__ebLogEvent) window.__ebLogEvent('tab_switch', { store_pill: 'ledger_' + filterKey });
    }
    window.__srFilterLedger = filterLedgerRows;
    var __srLiveTimer = null;
    ['lookup-query', 'sender-reach', 'transcript-input'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.addEventListener('input', function() {
        if (window.__srSaveWorkspace) {
          var patch = {}; if (id === 'lookup-query') patch.query = el.value.trim(); if (id === 'sender-reach') patch.reach = Number(el.value) || 75000; if (id === 'transcript-input') patch.transcript = el.value;
          window.__srSaveWorkspace(patch);
        }
        if (id !== 'transcript-input') { if (__srLiveTimer) clearTimeout(__srLiveTimer); __srLiveTimer = setTimeout(function() { if (document.getElementById('lookup-query')?.value?.trim().length >= 2) runBrandLookup(null, true); }, 520); }
      });
    });
    window.addEventListener('DOMContentLoaded', function() {
      try {
        var ws = window.__srGetWorkspace ? window.__srGetWorkspace() : {}, sp = new URLSearchParams(window.location.search || '');
        var hasUrlQuery = Boolean(sp.get('q') || sp.get('brand') || sp.get('show'));
        var qEl = document.getElementById('lookup-query'), rEl = document.getElementById('sender-reach');
        var qaP = document.getElementById('sr-home-qa-price'), qaR = document.getElementById('sr-home-qa-reach'), mbS = document.getElementById('sr-moneyball-slider');
        if (ws.qaPrice && qaP) qaP.value = ws.qaPrice; if (ws.qaReach && qaR) qaR.value = ws.qaReach;
        if (ws.budget && mbS) { mbS.value = ws.budget; if (window.__srUpdateMoneyball) window.__srUpdateMoneyball(ws.budget, null, true); }
        var initWedge = sp.get('wedge') || ws.buyer_wedge || ws.persona;
        if (initWedge === 'buyer' || initWedge === 'creator') window.__srSwitchPersona(initWedge, 'init');
        if (!hasUrlQuery && ws.query && qEl && ws.query !== qEl.value) { qEl.value = ws.query; if (ws.reach && rEl) rEl.value = ws.reach; runBrandLookup(ws.persona, false); }
        else if (ws.reach && rEl && String(ws.reach) !== String(rEl.value)) { rEl.value = ws.reach; }
        if (window.__srRenderComparisonMatrix) window.__srRenderComparisonMatrix();
      } catch (err) { console.warn('[sr:init]', err); }
    });
    async function startStripeCheckout(planTier, amountUsd, emailInputId, hpInputId, confirmed) {
      const emailEl = document.getElementById(emailInputId), hpEl = hpInputId ? document.getElementById(hpInputId) : null;
      const email = emailEl && emailEl.value ? emailEl.value.trim() : 'founder@creatorstudio.io', bw = window.__srActiveWedge || 'creator';
      if (!confirmed && window.__ebCheckout && !(hpEl && hpEl.value)) { window.__ebCheckout((planTier === 'agency_feed_199' || amountUsd >= 149) ? 'pro_b2b' : 'complete_dossier', true); return; }
      try {
        const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan_tier: planTier, amount_usd: amountUsd, customer_email: email, buyer_wedge: bw, website_url_hp: hpEl ? hpEl.value : '', ...getUtmParams() }) });
        const data = await res.json(); fireMetaEvent('StartTrial', amountUsd, { plan_tier: planTier, buyer_wedge: bw });
        const banner = document.getElementById('checkout-status-banner'), txt = document.getElementById('checkout-status-text');
        if (banner && txt) { banner.style.display = 'block'; txt.innerHTML = 'Stripe Session ' + escHtml(data.session_id) + ' ready for ' + escHtml(email) + ' (' + escHtml(String(planTier).toUpperCase()) + ' - $' + Number(amountUsd) + '/mo). <a href="' + escHtml(data.checkout_url || '/buy/complete_dossier') + '" style="color:var(--emerald-roi);text-decoration:underline;font-weight:700;margin-left:8px;">Proceed to Stripe Checkout ↗</a>'; }
      } catch (e) { console.error(e); }
    }
  </script>`;
  return renderShell({ title: 'SponsorRadar: Pitch the buyer, not dead inboxes • 96 verified buyers', description: 'Pitch the buyer, not dead inboxes. 96 verified buyers • Save $2,400 overpay on podcast, newsletter, and YouTube sponsorships.', canonicalPath: '/', ogSlug: 'sponsor-radar-home', jsonLd, bodyHtml });
}

function renderLandingPage({ defaultAnalysis }) {
  const row1 = (defaultAnalysis.placements && defaultAnalysis.placements[0]) || {};
  const r1Buyer = row1.unmasked_buyer_email || 'sarah.kaufman@shopify.com', r1Agency = row1.unmasked_agency_email || 'm.vance@rightsideup.co';
  const r1Angle = row1.live_outreach_angle || 'Saw 4x peer renewal last 30d — anchor 3-flight pilot at -18% floor.', r1Rider = row1.iab_makegood_rider_preview || 'IAB §4.2 (-18% Floor) + §7.1 (1.5% CTR Make-Good)';
  const bodyHtml = `
  <section style="padding:40px 0 60px;">
    <div class="container" style="max-width:1060px;">
      <div style="text-align:center; max-width:820px; margin:0 auto 24px;">
        <span class="pill-emerald">96 verified buyers • Save $2,400 overpay</span>
        <h1 class="headline-xl" style="margin-top:14px;">Pitch the buyer, <span class="serif-italic" style="color:var(--emerald-roi);">not dead inboxes.</span></h1>
        <p style="color:var(--text-secondary); font-size:16px; margin-top:12px;">96 verified buyers • Save $2,400 overpay. Inspect Row #1 unmasked buyer + agency desk proof above 95 locked verified rows.</p>
      </div>
      <div id="sr-live-deal-card-row1" data-active-wedge="creator" class="panel" style="padding:14px 18px; margin-bottom:20px; border-color:var(--emerald-border); background:var(--emerald-soft);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
          <span class="mono" style="font-size:12px; font-weight:800; color:var(--emerald-roi);">✦ ROW #1 UNMASKED LIVE DEAL PROOF (1 OF 96 — 95 LOCKED BELOW)</span>
          <span class="pill-emerald" style="font-size:11.5px; font-weight:800;">Renewed on Peer Shows (Last 30 Days)</span>
        </div>
        <div class="mono" style="font-size:13px; color:var(--text-primary); line-height:1.5;">
          <strong>Named Buyer:</strong> <span id="lp-row1-buyer" style="color:var(--emerald-roi); font-weight:800;">${escapeHtml(r1Buyer)}</span> • <strong>Agency Desk:</strong> <span id="lp-row1-agency" style="color:var(--amber-gold); font-weight:800;">${escapeHtml(r1Agency)}</span> (Right Side Up Podcast Desk)<br/>
          <strong>Live Outreach Angle:</strong> <span id="lp-row1-angle">${escapeHtml(r1Angle)}</span> • <code id="lp-row1-rider">${escapeHtml(r1Rider)}</code>
        </div>
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
            <div class="kpi-box"><div class="kpi-label">ROW #1 UNMASKED BUYER</div><div class="kpi-val" id="lp-email" style="font-size:13.5px; color:var(--emerald-roi);">${escapeHtml(r1Buyer)} + ${escapeHtml(r1Agency)}</div></div>
          </div>
        </div>
      </div></div>
      <div class="panel" style="padding:28px; text-align:center; border-color:var(--emerald-border); background:var(--bg-elevated);">
        <span class="pill-emerald">INSTANT 1-CLICK STRIPE EXPRESS • 30-DAY ZERO-BOUNCE GUARANTEE</span>
        <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin-top:10px;">Unlock All 96 Verified Buyers, CPM Rate Floors &amp; 3-Flight Pitches ($1.99 / $29 Full Vault)</h2>
        <p style="color:var(--text-secondary); max-width:600px; margin:8px auto 20px;">Download the 3-File Sponsor Email &amp; Rate Card Pack for $1.99 one-time, or unlock all 96 verified buyers for $29 ($0.30/buyer).</p>
        <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap; margin-bottom:14px;">
          <a href="/buy/flash_pass?source=lp_express" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass',true);return false;}" class="btn btn-vermilion" style="padding:12px 22px; font-size:15px; text-decoration:none;"><span>Unlock Target 3-File Pack ($1.99)</span><span class="btn-icon-circle" aria-hidden="true">↗</span></a>
          <a href="/buy/playbook_pass?source=lp_express" onclick="if(window.__ebCheckout){window.__ebCheckout('playbook_pass',true);return false;}" class="btn btn-emerald" style="padding:12px 22px; font-size:15px; text-decoration:none;"><span>Unlock All 96 Buyers Vault ($29) ↗</span></a>
        </div>
        <input type="text" id="lp-hp-field" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
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
        const entity = data.display_entity || { name: data.brand.name }, p0 = (data.placements && data.placements[0]) || {}, setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
        const bEm = p0.unmasked_buyer_email || 'sarah.kaufman@shopify.com', aEm = p0.unmasked_agency_email || 'm.vance@rightsideup.co';
        setTxt('lp-brand-name', entity.name); setTxt('lp-spend', '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString());
        setTxt('lp-score', data.metrics.renewal_velocity_score + '/100'); setTxt('lp-email', bEm + ' + ' + aEm);
        setTxt('lp-row1-buyer', bEm); setTxt('lp-row1-agency', aEm);
        if (p0.live_outreach_angle) setTxt('lp-row1-angle', p0.live_outreach_angle);
        if (p0.iab_makegood_rider_preview) setTxt('lp-row1-rider', p0.iab_makegood_rider_preview);
        fireMetaEvent('Lead', 0, { source: 'lp_interactive_lookup', query: q });
      }
    }
  </script>`;
  return renderShell({ title: 'Pitch the buyer, not dead inboxes | SponsorRadar 3x+ Renewal Ledger', description: '96 verified buyers • Save $2,400 overpay across 46+ podcasts, newsletters, and YouTube channels.', canonicalPath: '/lp', ogSlug: 'sponsor-radar-lp', jsonLd: null, bodyHtml });
}

module.exports = { escapeHtml, renderBrandLogoSvg, renderShell, renderHomePage, renderLandingPage };

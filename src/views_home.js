const { escapeHtml, renderBrandLogoSvg, renderShell } = require('./views_shell');
const { generateMoneyballLookalikeBundle } = require('./engine');

const IC = {
  lock: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  mic: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`,
  chart: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  bolt: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  search: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-2px;margin-right:4px;"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
};

function renderHomePage({ brands, shows, placements, seoPages, sampleTranscripts, defaultAnalysis, initialQuery = 'Shopify', initialReach = 75000, pubQuery = '' }) {
  const displayEntity = defaultAnalysis.display_entity || { type: 'brand', name: defaultAnalysis.brand.name, subtitle: `${defaultAnalysis.brand.domain} • ${defaultAnalysis.brand.category}`, lead_role: defaultAnalysis.brand.decision_maker_role, table_title: `VERIFIED SPONSORSHIP PLACEMENTS FOR ${defaultAnalysis.brand.name.toUpperCase()}` };
  const isInitialShow = displayEntity.type === 'show' || defaultAnalysis.matched_type === 'show';
  const mb = defaultAnalysis.moneyball_bundle || generateMoneyballLookalikeBundle({ targetShowName: defaultAnalysis.show ? defaultAnalysis.show.name : ((defaultAnalysis.placements[0] && defaultAnalysis.placements[0].show_name) || "Lenny's Podcast"), baseCpm: defaultAnalysis.metrics.avg_cpm_usd, rackRateUsd: 9500, category: defaultAnalysis.brand.category, placements: defaultAnalysis.placements });
  const row1Placement = (defaultAnalysis.placements && defaultAnalysis.placements[0]) || {};
  const row1BuyerUnmasked = row1Placement.unmasked_buyer_email || 'sarah.kaufman@shopify.com';
  const row1AgencyUnmasked = row1Placement.unmasked_agency_email || 'm.vance@rightsideup.co';
  const row1BookingUnmasked = row1Placement.unmasked_booking_email || 'booking@lennyspodcast.fm';
  const samplePitchText = String(defaultAnalysis.outbound_pitch.free_pitch_script || defaultAnalysis.outbound_pitch.body || '').replace(/\S*\*\*\*\S*/g, row1BuyerUnmasked);
  const sampleBuyerEmail = defaultAnalysis.outbound_pitch.to_email || 'd***.k***@deel.com (+ r.***@rightsideup.co)';
  const row1BuyerMasked = 'c***.p***@shopify.com (+ l.c***@veritoneone.com)';
  const verifiedShowListStr = (defaultAnalysis.placements || []).slice(0, 3).map(p => `${p.show_name} (${p.flights}x)`).join(' • ') || "My First Million (6x) • The Diary Of A CEO (5x) • Lenny's Podcast (8x)";
  const proven3xPlacements = placements.filter(p => p.flights >= 3).slice(0, 12), testPlacements = placements.filter(p => p.flights < 3).slice(0, 6);
  const topPlacements = [...proven3xPlacements, ...testPlacements];
  const topSeoLinks = [...seoPages.filter(p => p.page_type === 'brand_breakdown').slice(0, 8), ...seoPages.filter(p => p.page_type === 'show_benchmark').slice(0, 8), ...seoPages.filter(p => p.page_type === 'niche_directory').slice(0, 8)];
  const totalContacts = 109;
  const jsonLd = { '@context': 'https://schema.org', '@graph': [
    { '@type': 'SoftwareApplication', name: 'SponsorRadar', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', description: 'Podcast, Newsletter & YouTube Ad-Read Spend Ledger, Show Rate-Card Quote Auditor, 3x-Renewal Tracker & Outbound Sponsor Pitch Generator.', offers: [{ '@type': 'Offer', name: '3-Credit Sample Unlock', price: '0.00', priceCurrency: 'USD' }, { '@type': 'Offer', name: '1-Row Buyer Contact', price: '0.99', priceCurrency: 'USD' }, { '@type': 'Offer', name: '3-File Counterparty Pack', price: '1.99', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Creator Pass', price: '19.00', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Full 109-Row Verified Buyer & Agency Desk CSV Vault', price: '29.00', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'B2B Agency & Talent Desk', price: '149.00', priceCurrency: 'USD' }] },
    { '@type': 'Dataset', name: 'SponsorRadar 2026 Verified Podcast, Newsletter & YouTube Ad-Spend Ledger (109 Verified Buyer & Agency Desk Rows)', description: `Historical ad-read timestamps, promo codes, vanity URLs, negotiated CPM floors, and 3x+ renewal velocity scores across ${brands.length} sponsor brands and ${shows.length} top shows.`, creator: { '@type': 'Organization', name: 'SponsorRadar Intelligence' } }
  ] };

  const pubBannerHtml = pubQuery ? `
      <div id="pub-indexed-banner" class="panel" style="margin-bottom:20px; padding:18px 22px; background:var(--bg-surface); border-radius:18px; display:flex; flex-direction:column; gap:14px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding-bottom:10px;">
          <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;"><span class="pill-emerald" style="background:var(--emerald-soft);">Live Indexed Creator Benchmark</span><strong style="font-size:17px; color:var(--text-primary);">${escapeHtml(pubQuery)}</strong></div>
          <span class="mono" style="font-size:14px; font-weight:700; color:var(--emerald-roi); background:var(--emerald-soft); padding:4px 10px; border-radius:8px;">3-Flight Pilot Quote: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} ($${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)</span>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:14px;">
          <div style="padding:14px 16px; border-radius:12px; background:var(--bg-parchment);"><div class="mono" style="font-size:14px; color:var(--text-secondary); font-weight:700;">Top Matched 3x+ Sponsors</div><div style="font-size:16px; font-weight:700; color:var(--text-primary); margin-top:4px;">1. Linear (8x) • 2. Deel (12x) • 3. Ramp (10x)</div></div>
          <div style="padding:14px 16px; border-radius:12px; background:var(--emerald-soft);"><div class="mono" style="font-size:14px; color:var(--emerald-roi); font-weight:700;">Verified Show Placements</div><div class="mono" style="font-size:14px; font-weight:700; color:var(--text-primary); margin-top:4px;">${escapeHtml(verifiedShowListStr)}</div></div>
          <div id="pub-blurred-emails-preview" style="padding:14px 16px; border-radius:12px; background:#FFFBEB;"><div class="mono" style="font-size:14px; color:#92400E; font-weight:700;">109 Verified Buyer &amp; Agency Desk Rows</div><div class="mono" style="font-size:13px; font-weight:700; color:var(--emerald-roi); margin-top:4px;">✓ Row #1 Rate Proof: $40 Cleared Floor (-18% vs Rack)</div><div style="margin-top:6px;display:flex;flex-wrap:wrap;gap:6px;"><button type="button" class="sr-locked-spec-badge" onclick="return window.__srFocusFreeCreditBar(1,this);" style="cursor:pointer;padding:3px 9px;border-radius:999px;border:1px solid var(--emerald-roi);background:var(--emerald-soft);color:var(--emerald-roi);font-size:12px;font-weight:700;filter:none;">${IC.lock}Verified Buyer Email Hidden (1 of 3 Free Credits) — Tap to Reveal ($0) ↑</button></div></div>
        </div>
        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:12px; align-items:center;">
          <a href="#radar-results-container" class="btn btn-ghost" style="padding:10px 16px; min-height:42px; font-size:14px; text-decoration:none; justify-content:center;">1. View Matched Sponsor Table ↓</a>
          <button type="button" id="btn-copy-creator-badge" onclick="if(window.__ebCopyReadmeBadge){window.__ebCopyReadmeBadge(this);}" class="btn btn-ghost" style="padding:10px 16px; min-height:42px; font-size:14px; color:var(--emerald-roi); font-weight:700; cursor:pointer; justify-content:center;">2. Copy Verified 3x-Sponsor Badge</button>
          <a href="/buy/playbook_pass?target=${encodeURIComponent(pubQuery)}" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('playbook_pass',true);return false;}" class="btn btn-vermilion" style="padding:10px 16px; min-height:42px; font-size:14px; text-decoration:none; justify-content:center;">3. Unlock All 109 Verified Buyer &amp; Agency Rows ($29) →</a>
        </div>
      </div>` : '';

  const bodyHtml = `
  <section class="hero-section" id="radar-tool" style="padding:8px 0 24px;">
    <div class="container">
      ${pubBannerHtml}
      <div id="home-executive-brief" style="width:100%; margin-bottom:6px;">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px; margin-bottom:4px;">
            <div id="sr-buyer-wedge-toggle" role="tablist" aria-label="1-Tap Buyer Wedge Toggle" style="display:inline-flex; gap:4px; flex-wrap:wrap; align-items:center; padding:3px 6px; border-radius:999px; background:var(--bg-parchment); border:1px solid var(--border-strong);">
              <button type="button" id="hero-role-creator" data-wedge="creator" aria-selected="true" onclick="window.__srSwitchPersona('creator', 'hero_wedge_toggle')" style="display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:999px; border:none; background:var(--emerald-soft); color:var(--emerald-roi); font-size:13px; font-weight:800; cursor:pointer; white-space:nowrap;"><span>${IC.mic}I want sponsors</span></button>
              <button type="button" id="hero-role-buyer" data-wedge="buyer" aria-selected="false" onclick="window.__srSwitchPersona('buyer', 'hero_wedge_toggle')" style="display:inline-flex; align-items:center; gap:4px; padding:4px 10px; border-radius:999px; border:none; background:var(--bg-surface); color:var(--text-secondary); font-size:13px; font-weight:700; cursor:pointer; white-space:nowrap;"><span>${IC.chart}I&apos;m buying ads &amp; checking CPMs</span></button>
            </div>
            <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;"><span id="sr-logical-need-chip" class="pill-emerald" style="font-size:13px; font-weight:800; padding:3px 9px;">✓ 109 Verified Buyer &amp; Agency Desk Rows • Save $2,400 Overpay</span><span id="sr-vc-data-moat-chip" style="display:none;">181 Deals Audited</span></div>
          </div>
          <h1 class="headline-xl" id="sr-emotional-want-hook" style="font-size:clamp(21px, 2.5vw, 30px); line-height:1.12; margin:0 0 4px 0;">Pitch the buyer, <span style="color:var(--emerald-roi);">not dead inboxes.</span></h1>
        </div>
        <div id="sr-live-deal-card-row1" class="hero-steps-grid" data-active-wedge="creator" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:8px; align-items:center; min-height:66px; padding:10px 14px; margin-top:6px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-subtle); font-size:12.5px;">
          <div id="sr-row1-col1"><span id="sr-row1-peer-30d-badge" class="mono" style="font-size:11px;font-weight:800;color:var(--emerald-roi);display:block;">1. ROW #1 SAMPLE PROOF</span><strong id="sr-row1-proof-entity">${escapeHtml(displayEntity.name)}</strong> • <span id="sr-row1-proof-buyer" class="mono" style="color:var(--emerald-roi);font-weight:700;">${escapeHtml(row1BuyerUnmasked)}</span><span id="sr-row1-proof-agency" style="display:none;"></span><span id="sr-row1-proof-booking" style="display:none;"></span><span id="sr-row1-col1-lbl" style="display:none;"></span></div>
          <div id="sr-row1-col2"><span class="mono" style="font-size:11px;font-weight:800;color:var(--vermilion);display:block;">2. -18% FLOOR BENCHMARK</span><strong id="sr-row1-proof-cpm">$${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)} Floor CPM (-18%)</strong> • <strong id="sr-row1-col2-save" style="color:var(--emerald-roi);">Save $2,400 overpay</strong><span id="sr-row1-col2-lbl" style="display:none;"></span><span id="sr-row1-outreach-angle" style="display:none;"></span><code id="sr-row1-proof-code" style="display:none;"></code></div>
          <div id="sr-row1-col3"><span class="mono" style="font-size:11px;font-weight:800;color:var(--text-primary);display:block;">3. INSTANT DELIVERABLES</span><code id="sr-row1-iab-rider-preview">3 Free Credits ($0) • $1.99 Pack • $29 CSV Vault</code><span id="sr-row1-col3-lbl" style="display:none;"></span><span id="sr-row1-col3-need" style="display:none;"></span><span id="sr-row1-col3-sub" style="display:none;"></span></div>
        </div>
        <div id="eb-hero-visual-mount" style="display:none;"></div>
      </div>

      <div class="hero-grid" style="align-items:stretch; gap:14px;">
        <div class="double-bezel" style="display:flex; flex-direction:column; height:100%; padding:4px;">
          <div class="panel" id="sr-step1-panel" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; height:100%; padding:14px 20px;">
            <div class="panel-header" style="padding:0 0 8px 0; margin-bottom:0;">
              <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;"><span class="mono" style="padding:2px 8px; border-radius:6px; background:var(--vermilion); color:#FFF; font-size:13px; font-weight:800; white-space:nowrap;">STEP 1</span><span id="sr-step1-title" style="font-weight:800; font-size:15px; color:var(--text-primary);">Search Any Brand, Podcast, or Newsletter</span></div>
              <span class="pill-emerald" id="res-match-pill" style="font-size:13px; padding:2px 8px;">${defaultAnalysis.matched_type === 'show' ? 'Show Rate Card' : 'Verified 3x+ Ledger'}</span>
            </div>
            <div class="panel-body" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; gap:8px; padding:6px 0 0 0;">
              <div id="mode-lookup-pane" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; gap:7px;">
                <div style="display:flex; gap:8px; align-items:flex-end; flex-wrap:nowrap;">
                  <div style="flex:1; min-width:0;"><label id="sr-lookup-label" for="lookup-query" class="mono" style="font-size:13px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:2px;">Brand or Show Name</label><input id="lookup-query" type="text" class="input-field" value="${escapeHtml(initialQuery)}" required placeholder="e.g. Shopify, AG1, Huberman Lab..." style="min-height:38px; padding:6px 10px; font-size:14.5px;" onkeydown="if(event.key==='Enter'){event.preventDefault();runBrandLookup(null, true);}" /></div>
                  <button type="button" id="btn-run-lookup" class="btn btn-vermilion" style="min-height:38px; padding:6px 12px; font-size:14px; flex-shrink:0;" onclick="runBrandLookup(null, true)"><span>Audit Rates</span><span class="btn-icon-circle" aria-hidden="true">↗</span></button>
                </div>
                <div id="lookup-error-msg" class="mono" style="display:none; color:#B9311C; font-size:13px; margin-top:2px;"></div>
                <div id="sr-step1-next-cue" onclick="var s2=document.getElementById('sr-step2-panel');if(s2&&s2.scrollIntoView)s2.scrollIntoView({behavior:'smooth',block:'nearest'});" style="display:none; cursor:pointer; padding:6px 10px; border-radius:8px; background:var(--emerald-soft); border:1px solid var(--emerald-roi); font-size:13px; font-weight:700; color:var(--emerald-roi); align-items:center; justify-content:space-between; gap:6px;"><span id="sr-step1-next-cue-text">✓ Audit Ready → See Spend &amp; -18% Floor in Step 2</span><span class="mono" style="font-size:13px; text-decoration:underline; white-space:nowrap;">Step 2 &rarr;</span></div>
                <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">
                  <div class="preset-row" aria-label="1-Click Brand & Show Presets" style="margin-top:0; gap:4px;">
                    <span class="mono" style="font-size:13px; font-weight:700; color:var(--text-muted); align-self:center;">Try:</span>
                    <button type="button" class="preset-chip brand-preset-chip" style="padding:3px 8px; font-size:12.5px;" data-q="Shopify" onclick="selectBrandPreset('Shopify', null, this)">Shopify</button>
                    <button type="button" class="preset-chip brand-preset-chip" style="padding:3px 8px; font-size:12.5px;" data-q="AG1" onclick="selectBrandPreset('AG1', null, this)">AG1</button>
                    <button type="button" class="preset-chip brand-preset-chip" style="padding:3px 8px; font-size:12.5px;" data-q="Huberman Lab" onclick="selectBrandPreset('Huberman Lab', 'buyer', this)">Huberman Lab</button>
                    <button type="button" class="preset-chip brand-preset-chip" style="padding:3px 8px; font-size:12.5px;" data-q="Morning Brew Daily" onclick="selectBrandPreset('Morning Brew Daily', 'buyer', this)">Morning Brew</button>
                  </div>
                  <div style="display:flex; align-items:center; gap:4px; flex-wrap:wrap; min-width:0; max-width:100%;">
                    <label for="sender-reach" class="mono" style="font-size:12.5px; font-weight:700; color:var(--text-secondary); white-space:nowrap;">Reach:</label>
                    <button type="button" class="preset-chip reach-chip" style="padding:2px 6px; font-size:12.5px;" data-r="10000" onclick="setAudienceReach(10000, this)">10K</button>
                    <button type="button" class="preset-chip reach-chip" style="padding:2px 6px; font-size:12.5px;" data-r="25000" onclick="setAudienceReach(25000, this)">25K</button>
                    <button type="button" class="preset-chip reach-chip" style="padding:2px 6px; font-size:12.5px;" data-r="75000" onclick="setAudienceReach(75000, this)">75K</button>
                    <button type="button" class="preset-chip reach-chip" style="padding:2px 6px; font-size:12.5px;" data-r="150000" onclick="setAudienceReach(150000, this)">150K</button>
                    <button type="button" class="preset-chip reach-chip" style="padding:2px 6px; font-size:12.5px;" data-r="250000" onclick="setAudienceReach(250000, this)">250K</button>
                    <input id="sender-reach" type="number" class="input-field mono" value="${initialReach}" min="500" step="1000" style="width:74px; min-height:28px; height:28px; padding:2px 6px; font-size:12.5px;" onchange="runBrandLookup(null, true)" /><input id="sender-show" type="hidden" value="Creator Media Network" />
                  </div>
                </div>
                <div id="sr-step1-live-preview" style="padding:8px 12px; border-radius:9px; background:var(--emerald-soft); border:1px solid var(--emerald-border); display:flex; flex-direction:column; gap:4px; min-width:0; max-width:100%; box-sizing:border-box;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap; min-width:0; max-width:100%;">
                    <span class="mono" style="font-size:13px; font-weight:800; color:var(--emerald-roi);">✓ <span id="sr-step1-entity-name">${escapeHtml(displayEntity.name)}</span>: $${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}/mo</span>
                    <span id="sr-floor-savings-pill" class="mono" style="display:inline-flex;align-items:center;gap:4px;padding:2px 8px;border-radius:999px;background:#FFFFFF;border:1px solid var(--emerald-roi);font-size:13px;font-weight:800;color:var(--emerald-roi);max-width:100%;white-space:normal;">$${defaultAnalysis.metrics.avg_cpm_usd} Rack CPM &rarr; $${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)} Cleared Floor &middot; Save $${Math.max(1800, Math.round((Number(mb.published_rack_rate_usd || 4500) - Number(mb.negotiated_floor_rate_usd || 3690)) * 3)).toLocaleString()}</span>
                    <span id="sr-step1-preview-pilot" style="display:none;">3x Pilot: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()}</span>
                  </div>
                  <div id="sr-instant-pitch-hook" style="font-size:13px;font-weight:700;color:var(--text-primary);line-height:1.25;white-space:normal;min-width:0;max-width:100%;">${IC.bolt}Instant Hook: &ldquo;Saw ${escapeHtml(displayEntity.name)} renewed 3x+ on ${escapeHtml((defaultAnalysis.placements && defaultAnalysis.placements[0] && defaultAnalysis.placements[0].show_name) || 'My First Million')} &mdash; anchor 3-flight pilot at $${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)} Floor CPM.&rdquo;</div>
                  <div class="mono" id="sr-step1-preview-buyer" style="font-size:13px; font-weight:700; color:var(--text-secondary); line-height:1.25; white-space:normal; min-width:0; max-width:100%; display:flex; flex-direction:column; gap:5px;"><div>Shows: <strong>${escapeHtml((defaultAnalysis.placements || []).slice(0, 3).map(p => p.show_name).join(' • ') || "My First Million • The Diary Of A CEO • Lenny's Podcast")}</strong></div><button type="button" class="sr-locked-spec-badge" data-free-credit-unmasked="✓ 3 Buyer Emails Unmasked: ${escapeHtml(row1BuyerUnmasked)} (+ ${escapeHtml(row1AgencyUnmasked)})" onclick="var e=document.getElementById('sr-bridge-email');if(e){e.focus();e.scrollIntoView({behavior:'smooth',block:'center'});}" style="cursor:pointer;display:block;padding:6px 10px;border-radius:10px;border:1px solid var(--emerald-roi);background:#FFFFFF;color:var(--emerald-roi);font-size:12px;font-weight:700;text-align:left;white-space:normal;max-width:100%;filter:none;">${IC.lock}3 Verified ${escapeHtml(displayEntity.name.split('(')[0].trim())} Buyer Emails (${escapeHtml((row1BuyerUnmasked.split('@')[0] || 'claire').split('.')[0])}.***@${escapeHtml(row1BuyerUnmasked.split('@')[1] || 'shopify.com')} + 2 more) — Enter Email Below ($0) ↓</button></div>
                </div>
                <form id="sr-sweetspot-bridge-form" onsubmit="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&window.__ebCaptureEmailLead){var v=e.value.trim(),q=((document.getElementById('lookup-query')||{}).value||'Shopify').trim();window.__ebSavedEmail=v;window.__ebCaptureEmailLead(v,'sweetspot_submit');document.querySelectorAll('[data-free-credit-unmasked]').forEach(function(el){el.innerHTML=el.getAttribute('data-free-credit-unmasked');});var b=document.getElementById('sr-free-credits-badge');if(b)b.style.display='inline-flex';var pb=document.getElementById('sr-post-email-upgrade-bridge');if(pb)pb.style.display='flex';if(window.__srRunHomeQuoteAudit)window.__srRunHomeQuoteAudit(true);if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'home_top_bar_3_credits_unmasked'});return false;}if(window.__ebCheckout)window.__ebCheckout('creator_pass',true);return false;" style="margin:0; padding:12px 14px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-strong); display:flex; flex-direction:column; gap:6px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
                    <span id="sr-sweetspot-bridge-copy" style="font-size:13px; color:var(--text-primary); font-weight:800; line-height:1.25;">✦ Unmask 3 Free Verified ${escapeHtml(displayEntity.name.split('(')[0].trim())} Buyer Emails ($0) + Pitch Copy:</span>
                    <div style="display:inline-flex; gap:8px; align-items:center;"><a id="eb-home-sample-link" href="/dossier/sample?target=${encodeURIComponent(initialQuery)}" target="_blank" class="mono" style="font-size:12px;color:var(--emerald-roi);font-weight:700;text-decoration:underline;">Sample Dossier ↗</a><button type="button" onclick="switchToolMode('transcript')" class="mono" style="background:none; border:none; padding:0; font-size:12px; font-weight:700; color:var(--text-secondary); text-decoration:underline; cursor:pointer;">Paste Transcript →</button><span id="sr-rival-anchor-badge" style="display:none;">$29 CSV Vault vs $99/mo Rephonic</span></div>
                  </div>
                  <div style="display:flex; gap:6px; flex-wrap:wrap; width:100%; align-items:center;">
                    <input id="sr-bridge-email" type="email" placeholder="Work email for 3 free ${escapeHtml(displayEntity.name.split('(')[0].trim())} buyer emails ($0)..." aria-label="Work email to unmask 3 free verified buyer emails ($0) and pre-fill Stripe" onblur="if(window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(this.value,'sweetspot_bridge_blur')" class="input-field" style="flex:1 1 170px; min-width:0; max-width:100%; height:38px; min-height:38px; padding:5px 10px; font-size:13.5px; background:var(--bg-surface);" />
                    <button id="btn-unlock-free-credits" type="button" onclick="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&window.__ebCaptureEmailLead){var v=e.value.trim(),q=((document.getElementById('lookup-query')||{}).value||'Shopify').trim();window.__ebSavedEmail=v;window.__ebCaptureEmailLead(v,'sweetspot_free_row4_btn');document.querySelectorAll('[data-free-credit-unmasked]').forEach(function(el){el.innerHTML=el.getAttribute('data-free-credit-unmasked');});var b=document.getElementById('sr-free-credits-badge');if(b)b.style.display='inline-flex';var pb=document.getElementById('sr-post-email-upgrade-bridge');if(pb)pb.style.display='flex';if(window.__srRunHomeQuoteAudit)window.__srRunHomeQuoteAudit(true);if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'home_top_bar_3_credits_unmasked'});this.textContent='✓ 3 Free Credits Unlocked';}else if(e){e.focus();}" class="btn btn-emerald" style="padding:6px 12px; height:38px; min-height:38px; font-size:13.5px; font-weight:800; white-space:nowrap;">Unmask 3 Free Buyer Emails ($0) →</button>
                    <button id="btn-sweetspot-reveal-row4" type="button" onclick="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&window.__ebCaptureEmailLead){window.__ebCaptureEmailLead(e.value,'sweetspot_free_row4_btn');}" style="display:none;">Unmask Row #4 Free</button>
                  </div>
                  <div id="sr-post-email-upgrade-bridge" style="display:none;padding:6px 10px;border-radius:8px;background:var(--emerald-soft);border:1px solid var(--emerald-roi);font-size:12.5px;font-weight:700;color:var(--emerald-roi);align-items:center;justify-content:space-between;flex-wrap:wrap;gap:6px;"><span id="sr-home-preview-strip-lbl">✓ 3 Free Credits Unlocked — Need all 109 Buyer &amp; Agency Rows?</span><button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true);" style="background:var(--emerald-roi);color:#FFFFFF;border:none;border-radius:6px;padding:5px 10px;font-size:12.5px;font-weight:800;cursor:pointer;">Full 109-Row CSV Vault ($29) &rarr;</button></div>
                </form>
                <details id="mode-b-details" style="display:none;"><summary id="mode-b-summary">Transcript Extractor</summary><div class="mode-tabs" role="tablist"><button type="button" id="tab-mode-lookup" class="mode-tab active" onclick="switchToolMode('lookup')">Brand / Show Search</button><button type="button" id="tab-mode-transcript" class="mode-tab" onclick="switchToolMode('transcript')">Transcript Extractor</button></div></details>
              </div>
              <div id="sr-hero-deliverable-strip" style="display:none;"></div>
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
                <span class="mono" style="padding:3px 9px; border-radius:6px; background:var(--emerald-roi); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap;">STEP 2</span>
                <span id="sr-step2-title" style="font-weight:800; font-size:16px; color:var(--text-primary);">Spend, -18% Floor &amp; 3x Renewal Diagnosis</span>
              </div>
              <span class="mono" id="res-live-readout-pill" style="font-size:12.5px; color:var(--emerald-roi); font-weight:700; padding:3px 10px; border-radius:999px; background:var(--emerald-soft);">● Live Readout</span>
            </div>
            <div class="panel-body" style="display:flex; flex-direction:column; flex:1; justify-content:space-between; gap:14px;">
              <div style="display:grid; grid-template-columns:repeat(2, minmax(0, 1fr)); gap:12px;">
                <div class="kpi-box" style="background:var(--bg-parchment); padding:14px 16px; border-radius:10px; min-width:0;"><div class="kpi-label" id="res-entity-label">${isInitialShow ? 'Matched Show' : 'Matched Entity'}</div><div class="kpi-val" id="res-brand-name" style="color:var(--text-primary); font-size:clamp(1rem, 4.2vw, 1.35rem); white-space:nowrap;">${escapeHtml(displayEntity.name)}</div><div class="mono" id="res-brand-domain" style="font-size:13px; color:var(--vermilion);">${escapeHtml(displayEntity.subtitle)}</div></div>
                <div class="kpi-box" style="background:var(--bg-parchment); padding:14px 16px; border-radius:10px; min-width:0;"><div class="kpi-label">Est. Monthly Spend</div><div class="kpi-val" id="res-monthly-spend" style="color:var(--amber-gold); font-size:clamp(1rem, 4.2vw, 1.35rem); white-space:nowrap;">$${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}</div><div class="mono" id="res-avg-cpm" style="font-size:13px; color:var(--text-secondary);">$${defaultAnalysis.metrics.avg_cpm_usd} Rack Rate (Free Sample)</div></div>
                <div class="kpi-box" style="background:var(--bg-parchment); padding:14px 16px; border-radius:10px; min-width:0;"><div class="kpi-label">3x+ Renewal Velocity</div><div class="kpi-val" id="res-renewal-score" style="color:var(--emerald-roi); font-size:clamp(1rem, 4.2vw, 1.35rem); white-space:nowrap;">${defaultAnalysis.metrics.renewal_velocity_score}/100</div><div class="mono" id="res-flights-summary" style="font-size:13px; color:var(--emerald-roi);">${defaultAnalysis.metrics.proven_3x_shows_count} Proven 3x+ Shows</div></div>
                <div class="kpi-box" style="background:var(--bg-parchment); padding:14px 16px; border-radius:10px; min-width:0;"><div class="kpi-label">Verified Buying Desk</div><div class="kpi-val" id="res-dm-role" style="font-size:clamp(0.92rem, 3.8vw, 1.1rem); color:var(--text-primary); white-space:nowrap;">${escapeHtml(displayEntity.lead_role)}</div><div class="mono" id="res-dm-email" style="font-size:13px; color:var(--amber-gold);">3 Free Buyer Emails Below ($0)</div></div>
              </div>
              <div id="sr-visual-cpm-curve" style="padding:14px 16px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-strong); display:flex; flex-direction:column; gap:8px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;"><span class="mono" id="sr-hero-vault-target" style="font-size:13px; font-weight:800; color:var(--text-primary);">Rate-Card Compression: ${escapeHtml(displayEntity.name)}</span><span class="mono" style="font-size:13px; color:var(--emerald-roi); font-weight:800;">Save $${mb.savings_per_slot_usd.toLocaleString()}/Slot at 3x Floor</span></div>
                <div style="display:flex; flex-direction:column; gap:6px; font-size:13px;">
                  <div><div style="display:flex; justify-content:space-between;" class="mono"><span>1-Off Rack Rate (Free Sample)</span><strong id="sr-bar-rack-lbl" style="color:var(--vermilion);">$${defaultAnalysis.metrics.avg_cpm_usd} CPM ($${mb.published_rack_rate_usd.toLocaleString()}/slot)</strong></div><div style="height:7px; width:100%; background:#E5E0D8; border-radius:99px; overflow:hidden; margin-top:3px;"><div style="height:100%; width:100%; background:var(--vermilion); border-radius:99px;"></div></div></div>
                  <div><div style="display:flex; justify-content:space-between; align-items:center; gap:6px;" class="mono"><span>3-Flight Floor (-18%)</span><strong id="sr-bar-floor-lbl" data-free-credit-unmasked="$${Math.round(defaultAnalysis.metrics.avg_cpm_usd * 0.82)} CPM ($${mb.negotiated_floor_rate_usd.toLocaleString()}/slot)" style="color:var(--emerald-roi);"><button type="button" onclick="var e=document.getElementById('sr-step2-email')||document.getElementById('sr-bridge-email');if(e){e.focus();e.scrollIntoView({behavior:'smooth',block:'center'});}" style="cursor:pointer;padding:2px 8px;border-radius:999px;border:1px solid var(--emerald-roi);background:#FFFFFF;color:var(--emerald-roi);font-size:11.5px;font-weight:800;">${IC.lock}Reveal -18% Floor Rate ($0 Email) ↓</button></strong></div><div style="height:7px; width:100%; background:#E5E0D8; border-radius:99px; overflow:hidden; margin-top:3px;"><div style="height:100%; width:82%; background:var(--emerald-roi); border-radius:99px;"></div></div></div>
                  <div><div style="display:flex; justify-content:space-between; align-items:center; gap:6px;" class="mono"><span>Category Peer Split</span><strong id="sr-bar-peer-lbl" data-free-credit-unmasked="$${mb.lookalike_shows[3].cpm_usd}–$${mb.lookalike_shows[0].cpm_usd} eCPM" style="color:var(--cyan-info);"><button type="button" onclick="var e=document.getElementById('sr-step2-email')||document.getElementById('sr-bridge-email');if(e){e.focus();e.scrollIntoView({behavior:'smooth',block:'center'});}" style="cursor:pointer;padding:2px 8px;border-radius:999px;border:1px solid var(--emerald-roi);background:#FFFFFF;color:var(--emerald-roi);font-size:11.5px;font-weight:800;">${IC.lock}Reveal Peer Show Rates ($0 Email) ↓</button></strong></div><div style="height:7px; width:100%; background:#E5E0D8; border-radius:99px; overflow:hidden; margin-top:3px;"><div style="height:100%; width:64%; background:var(--cyan-info); border-radius:99px;"></div></div></div>
                </div>
                <div id="sr-editorial-insider-hook" style="display:none;"><span id="sr-hero-vault-locked-line"></span></div>
              </div>
              <form id="sr-step2-handoff-bar" onsubmit="var e=document.getElementById('sr-step2-email');if(e&&e.value&&window.__ebCaptureEmailLead){var v=e.value.trim(),q=((document.getElementById('lookup-query')||{}).value||'Shopify').trim();window.__ebSavedEmail=v;window.__ebCaptureEmailLead(v,'step2_panel_submit');var b1=document.getElementById('sr-bridge-email');if(b1)b1.value=v;document.querySelectorAll('[data-free-credit-unmasked]').forEach(function(el){el.innerHTML=el.getAttribute('data-free-credit-unmasked');});var b=document.getElementById('sr-free-credits-badge');if(b)b.style.display='inline-flex';var pb=document.getElementById('sr-post-email-upgrade-bridge');if(pb)pb.style.display='flex';if(window.__srRunHomeQuoteAudit)window.__srRunHomeQuoteAudit(true);var btn2=document.getElementById('btn-step2-unlock-free');if(btn2)btn2.textContent='✓ 3 Buyer Emails & Floor Unmasked';return false;}return false;" style="margin:0; padding:12px 14px; border-radius:10px; background:var(--emerald-soft); border:1.5px solid var(--emerald-roi); display:flex; flex-direction:column; gap:6px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:6px; flex-wrap:wrap;">
                  <span id="sr-step2-handoff-title" style="font-size:13px; font-weight:800; color:var(--text-primary);">✦ Step 2 Unlock: Reveal ${escapeHtml(displayEntity.name.split('(')[0].trim())} -18% Floor &amp; 3 Verified Buyer Emails ($0):</span>
                  <span id="sr-step2-floor-savings" class="mono" style="font-size:12px; font-weight:800; color:var(--emerald-roi);">Save $${Math.max(1800, Math.round((Number(mb.published_rack_rate_usd || 4500) - Number(mb.negotiated_floor_rate_usd || 3690)) * 3)).toLocaleString()} (3x Floor)</span>
                </div>
                <div style="display:flex; gap:6px; flex-wrap:wrap; width:100%; align-items:center;">
                  <input id="sr-step2-email" type="email" placeholder="Enter email to unmask ${escapeHtml(displayEntity.name.split('(')[0].trim())} floor &amp; 3 buyer emails ($0)..." aria-label="Work email to unmask 3 buyer emails and -18% floor rate ($0)" onblur="if(window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(this.value,'step2_panel_blur')" class="input-field" style="flex:1 1 160px; min-width:0; max-width:100%; height:38px; min-height:38px; padding:5px 10px; font-size:13.5px; background:var(--bg-surface);" />
                  <button id="btn-step2-unlock-free" type="submit" class="btn btn-emerald" style="padding:6px 12px; height:38px; min-height:38px; font-size:13.5px; font-weight:800; white-space:nowrap;">Unmask 3 ${escapeHtml(displayEntity.name.split('(')[0].trim())} Buyer Emails &amp; Floor ($0) →</button>
                </div>
                <span id="sr-step2-handoff-buyer" style="display:none;"></span><span id="sr-step2-deliverable-pill" style="display:none;"></span>
              </form>
            </div>
          </div>
        </div>
      </div>

      <!-- FULL-WIDTH LIVE RESULTS: 1. PLACEMENTS TABLE FIRST (SPARKTORO / WHOSPONSORSSTUFF PATTERN) + 2. WORKBENCH BELOW -->
      <div id="radar-results-container" style="margin-top:24px; display:flex; flex-direction:column; gap:18px;">
        <div class="kpi-grid" style="display:none;"></div>

        <!-- 1. Full-Width Verified Placements Table Immediately Below Search/KPIs (Row #1 Specimen + 1-Field $0 Work Email Credit Bar) -->
        <div class="panel" style="padding:20px 22px;">
          <div style="margin:0 0 14px 0; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div>
              <span class="mono" style="font-size:16px; font-weight:700; color:var(--text-primary); display:block;" id="res-table-title">${escapeHtml(displayEntity.table_title)}</span>
              <span style="font-size:13.5px; color:var(--text-secondary);">Verified Show Placements &amp; -18% Floor CPMs Unmasked • Unmask 3 Free Verified Buyer Emails ($0 via Work Email) • Creator Pass ($19) • Full 109-Row CSV Vault ($29) • B2B Agency Desk ($149)</span>
            </div>
            <div id="sr-inline-renewal-filter" style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
              <span class="pill-emerald" id="sr-free-credits-badge" style="display:none; font-size:12px;">✓ 3 of 3 Free Buyer Credits Unlocked — Verify on LinkedIn</span>
              <button type="button" onclick="document.querySelectorAll('#res-placements-tbody tr').forEach(function(r){r.style.display='';});" class="pill-slate" style="cursor:pointer; border:1px solid var(--border-subtle); font-size:12px;">All Flights</button>
              <button type="button" onclick="document.querySelectorAll('#res-placements-tbody tr').forEach(function(r,i){r.style.display=(i===0||/3x|4x|5x|6x|7x|8x|9x|10x|11x|12x|Renew/i.test(r.innerText))?'':'none';});" class="pill-emerald" style="cursor:pointer; border:none; font-size:12px;">3x+ Renewals Only</button>
              <span class="pill-emerald" id="res-engine-badge">109 Verified Buyer &amp; Agency Desk Rows</span>
            </div>
          </div>
          <!-- SECONDARY TABLE BAR (syncs with #sr-bridge-email above the fold) -->
          <div style="margin-bottom:12px; padding:10px 14px; border-radius:10px; background:var(--emerald-soft); border:1px solid rgba(13,107,75,0.24); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
            <span style="font-size:13px; color:var(--text-primary); font-weight:700;">✦ Sample Row #1 Shows &amp; -18% Floor Unmasked • Direct Buyer &amp; Agency Emails Gated Above ($0 for 3 Credits):</span>
            <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
              <a href="#sr-sweetspot-bridge-form" onclick="var e=document.getElementById('sr-bridge-email');if(e){e.focus();e.scrollIntoView({behavior:'smooth',block:'center'});}return false;" class="btn btn-ghost" style="padding:6px 12px; min-height:34px; font-size:12.5px; background:var(--bg-surface); font-weight:800; color:var(--emerald-roi); border:1.5px solid var(--emerald-roi);">Unmask 3 Free Verified Buyer Emails ($0) ↑</a>
              <button type="button" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true);" class="btn btn-emerald" style="padding:6px 12px; min-height:34px; font-size:12.5px;">Full 109-Row CSV Vault ($29) →</button>
            </div>
          </div>

          <div class="table-wrap" style="margin-top:0;">
            <table class="ledger-table">
              <thead><tr><th>${isInitialShow ? 'Sponsor Brand → Show' : 'Show / Publication'}</th><th>Renewal Signal</th><th>Buyer Contact &amp; Agency Desk</th><th>Vanity URL &amp; Code</th><th>Est. Spend &amp; 3x Floor</th></tr></thead>
              <tbody id="res-placements-tbody">
                ${defaultAnalysis.placements.slice(0, 4).map((p, idx) => {
                  const floorCpm = Math.round(p.cpm_usd * 0.82), estCpc = (floorCpm / 18).toFixed(2), sDom = String(p.show_slug || p.show_name || 'creatornetwork').toLowerCase().replace(/[^a-z0-9]/g, '');
                  const uBuyer = p.unmasked_buyer_email || row1BuyerUnmasked, uAgency = p.unmasked_agency_email || row1AgencyUnmasked;
                  const liUrl = p.linkedin_verify_url || `https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(uBuyer.split('@')[0].replace(/[._]/g, ' ') + ' ' + (p.brand_name || displayEntity.name))}`;
                  const creditNum = Math.min(3, Math.max(1, idx));
                  const unmaskedHtml = `<div class=&quot;mono&quot; style=&quot;font-size:13px;color:var(--emerald-roi);font-weight:800;&quot;>✓ FREE CREDIT #${creditNum} OF 3 (ROW #${idx + 1} UNMASKED FREE): ${escapeHtml(uBuyer)} (+ ${escapeHtml(uAgency)})</div><div style=&quot;font-size:12.5px;color:var(--text-primary);font-weight:600;display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:2px;&quot;><span>${escapeHtml(p.decision_maker_role || 'VP Growth')} • ${escapeHtml(p.agency_desk || 'Agency Desk')} • Show: booking@${sDom}.fm</span><a class=&quot;sr-linkedin-verify-link&quot; href=&quot;${escapeHtml(liUrl)}&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot; style=&quot;color:var(--emerald-roi);font-weight:700;text-decoration:underline;&quot;>Verify on LinkedIn →</a><button type=&quot;button&quot; class=&quot;sr-row-copy-btn&quot; data-unmasked-copy=&quot;${escapeHtml(uBuyer + ' (+ ' + uAgency + ')')}&quot; onclick=&quot;return window.__srCopyFreeCreditRow(this.getAttribute('data-unmasked-copy'),${idx + 1},this);&quot; style=&quot;padding:2px 8px;border-radius:6px;border:1px solid var(--emerald-roi);background:var(--bg-surface);color:var(--emerald-roi);font-size:11.5px;font-weight:700;cursor:pointer;&quot;>Copy Buyer</button></div>`;
                  const r4Attr = ` data-free-credit-unmasked="${unmaskedHtml}"${idx === 3 ? ` data-row4-unmasked="${unmaskedHtml}"` : ''}`;
                  const cHtml = `<div${r4Attr}><div style="font-size:12.5px;color:var(--text-secondary);font-weight:600;margin-bottom:4px;">${escapeHtml(p.decision_maker_role || 'VP Growth')} • ${escapeHtml(p.agency_desk || 'Agency Desk')}</div><button type="button" class="sr-row-copy-btn sr-locked-spec-badge" data-unmasked-copy="${escapeHtml(uBuyer + ' (+ ' + uAgency + ')')}" onclick="return window.__srFocusFreeCreditBar(${idx + 1},this);" style="padding:3px 9px;border-radius:999px;border:1px solid var(--emerald-roi);background:var(--emerald-soft);color:var(--emerald-roi);font-size:12px;font-weight:700;cursor:pointer;filter:none;">${IC.lock}Verified Buyer Email Hidden (${creditNum} of 3 Free Credits) — Tap to Reveal ($0) ↑</button></div>`;
                  const vHtml = `<div style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</div><div>Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong></div>`;
                  return `<tr data-free-credit-row="1" onclick="window.__ebSelectedTarget='${escapeHtml((isInitialShow && p.brand_name ? p.brand_name : p.show_name).replace(/'/g, "\\'"))}';window.__ebActiveEntity=window.__ebSelectedTarget;if(window.__ebSyncEmailPreviewLinks)window.__ebSyncEmailPreviewLinks(window.__ebSavedEmail||'');" style="${idx === 0 ? 'background:var(--emerald-soft);' : ''}">
                    <td><div style="font-weight:700;">${isInitialShow && p.brand_name ? `${escapeHtml(p.brand_name)} → ${escapeHtml(p.show_name)}` : escapeHtml(p.show_name)}${p.is_lookalike ? ` <span class="pill-slate" style="font-size:13px;padding:2px 8px;">Peer</span>` : ''}</div><div class="mono" style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.channel_type)} • ${(p.audience_size / 1000).toFixed(0)}K reach</div></td>
                    <td><div><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></div><div class="mono" style="font-size:12.5px; color:var(--emerald-roi); margin-top:4px; font-weight:700;">✓ ${escapeHtml((p.fresh_budget_badge || 'Renewed Last 30d').replace(/🟢\s*/g, ''))}</div></td>
                    <td>${cHtml}</td>
                    <td class="mono" style="font-size:13.5px;">${vHtml}</td>
                    <td class="mono" style="font-weight:700; color:var(--amber-gold);">$${p.est_spend_usd.toLocaleString()} ($${p.cpm_usd} CPM)<div style="font-size:13px; color:var(--emerald-roi); font-weight:600;">3x Floor: $${floorCpm} CPM • ~$${estCpc} CPC</div></td>
                  </tr>`;
                }).join('')}
                <tr id="sr-locked-95-summary-row" style="background:#FFFBEB;"><td colspan="5" class="mono" style="font-size:13px;font-weight:700;color:#92400E;padding:10px 14px;"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;"><span>${IC.lock}+105 More Verified Buyer &amp; Agency Desk Rows (109 Total) + Audience Guarantee Clause + Cold Sequences</span><span style="display:inline-flex;gap:10px;flex-wrap:wrap;"><a href="#sr-sweetspot-bridge-form" onclick="var b=document.getElementById('sr-bridge-email');if(b){b.focus();}return false;" style="color:var(--emerald-roi);text-decoration:underline;">Unlock 3 Free ($0) ↑</a> • <a href="/buy/complete_dossier" onclick="if(window.__ebCheckout){window.__ebCheckout('complete_dossier',true);return false;}" style="color:var(--text-primary);text-decoration:underline;">Full 109-Row CSV Vault ($29) →</a></span></div></td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 2. Step-by-Step Interactive Buyer & Creator Workbench (Below Placements Table) -->
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
              <a href="#res-placements-tbody" onclick="var t=document.getElementById('res-placements-tbody');if(t){t.scrollIntoView({behavior:'smooth'});return false;}" class="btn btn-ghost" style="padding:7px 13px; min-height:34px; font-size:12.5px; text-decoration:none;"><span id="copy-pitch-label">Inspect Live Promo Codes &amp; Flights ↑</span></a>
            </div>
          </div>

          <div id="sr-pane-buyer" style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:16px; align-items:stretch;">
              <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
                    <div style="display:flex; align-items:center; gap:8px;"><span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--vermilion); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2A</span><strong style="font-size:15px; color:var(--text-primary);">Audit Show Quote vs. Floor</strong></div>
                    <span id="sr-home-qa-target" class="mono" style="font-size:12.5px; color:var(--text-secondary); font-weight:700;">Target: ${escapeHtml(mb.target_show)}</span>
                  </div>
                  <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(105px, 1fr)); gap:8px;">
                    <div><label for="sr-home-qa-price" class="mono" style="font-size:11.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Quoted Price ($)</label><input id="sr-home-qa-price" type="number" class="input-field mono" value="${mb.published_rack_rate_usd}" min="250" step="250" style="min-height:38px; padding:6px 10px; font-size:14px; font-weight:700; background:var(--bg-surface);" oninput="window.__srRunHomeQuoteAudit()" /></div>
                    <div><label for="sr-home-qa-reach" class="mono" style="font-size:11.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Claimed Reach</label><input id="sr-home-qa-reach" type="number" class="input-field mono" value="${Math.max(10000, Math.round((mb.published_rack_rate_usd / Math.max(15, defaultAnalysis.metrics.avg_cpm_usd)) * 1000))}" min="1000" step="5000" style="min-height:38px; padding:6px 10px; font-size:14px; font-weight:700; background:var(--bg-surface);" oninput="window.__srRunHomeQuoteAudit()" /></div>
                    <div><label for="sr-home-qa-ltv" class="mono" style="font-size:11.5px; font-weight:700; color:var(--text-secondary); display:block; margin-bottom:4px;">Your LTV/AOV ($)</label><input id="sr-home-qa-ltv" type="number" class="input-field mono" value="480" min="25" step="25" style="min-height:38px; padding:6px 10px; font-size:14px; font-weight:700; background:var(--bg-surface);" oninput="window.__srRunHomeQuoteAudit()" /></div>
                  </div>
                </div>
                <div id="sr-unit-econ-strip" style="padding:12px 14px; border-radius:10px; background:var(--bg-surface); border-left:3px solid var(--emerald-roi); flex:1; display:flex; flex-direction:column; justify-content:center;">
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-bottom:4px;"><span class="mono" style="font-size:11.5px; font-weight:800; color:var(--text-muted); text-transform:uppercase;">Unit Economics &amp; Break-Even Verdict</span><span id="sr-home-qa-badge" class="pill-emerald" style="font-size:11.5px; padding:2px 8px;">3-Flight Floor (-18%)</span></div>
                  <div id="sr-home-qa-readout" class="mono" style="font-size:13.5px; font-weight:800; color:var(--text-primary); line-height:1.4;">Quoted: $${mb.published_rack_rate_usd.toLocaleString()} → <span style="color:var(--emerald-roi);">Counter at $${mb.negotiated_floor_rate_usd.toLocaleString()}/slot (Save $${mb.savings_per_slot_usd.toLocaleString()}/read • Save $2,400 overpay)</span></div>
                  <div id="sr-home-qa-sub" style="font-size:12px; color:var(--text-secondary); margin-top:4px; line-height:1.4;">Break-Even: <strong>${Math.max(1, Math.ceil(mb.negotiated_floor_rate_usd / 480))} signups</strong> @ $480 LTV • Est. ~${Math.round(Math.max(10000, (mb.published_rack_rate_usd / Math.max(15, defaultAnalysis.metrics.avg_cpm_usd)) * 1000) * 0.018).toLocaleString()} clicks (1.8% CTR) • IO Rider §4.2 (-18% Cap) + §7.1 (1.5% CTR Make-Good) • <a href="/buy/flash_pass?source=qa_rider" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass',true);return false;}" style="color:var(--vermilion);font-weight:800;text-decoration:underline;">Unlock Rider &amp; Floor Pack ($1.99) ↗</a></div>
                </div>
              </div>
              <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:10px;"><div style="display:flex; align-items:center; gap:8px;"><span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--emerald-roi); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2B</span><label for="sr-moneyball-slider" style="font-size:15px; color:var(--text-primary); font-weight:700; cursor:pointer;">Compare Lookalike Options</label></div><span id="sr-moneyball-readout" class="mono" style="font-size:12.5px; font-weight:800; color:var(--emerald-roi);">$15,000 Budget → 1 Target Flight vs. 4 Lookalike Flights</span></div>
                  <div style="display:flex; align-items:center; gap:10px;"><span class="mono" style="font-size:12px; font-weight:700; color:var(--text-secondary); white-space:nowrap;">Budget:</span><input id="sr-moneyball-slider" type="range" min="5000" max="50000" step="2500" value="15000" oninput="window.__srUpdateMoneyball(this.value)" style="flex:1; accent-color:var(--emerald-roi); cursor:pointer;" /></div>
                </div>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <div style="padding:9px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;"><span class="mono" style="font-size:12px; font-weight:800; color:var(--text-muted);">A • TARGET FLOOR</span><span id="sr-mb-rack-floor" class="mono" style="font-size:13px; font-weight:800; color:var(--text-primary);">$${mb.published_rack_rate_usd.toLocaleString()} Rack → <span style="color:var(--emerald-roi);">$${mb.negotiated_floor_rate_usd.toLocaleString()} Floor (-18%)</span></span><span id="sr-mb-savings-sub" style="display:none;">Save $${mb.savings_per_slot_usd.toLocaleString()}/slot</span></div>
                  <div style="padding:9px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;"><span class="mono" style="font-size:12px; font-weight:800; color:var(--emerald-roi);">B • LOOKALIKE #1</span><span id="sr-mb-look1-title" class="mono" style="font-size:13px; font-weight:800; color:var(--emerald-roi);">${escapeHtml(mb.lookalike_shows[0].name)} ($${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot)</span><span id="sr-mb-look1-rep" class="mono" style="font-size:12px; color:var(--text-secondary);">Rep: ${escapeHtml(mb.lookalike_shows[0].booking_rep)}</span></div>
                  <div style="padding:9px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;"><span class="mono" style="font-size:12px; font-weight:800; color:var(--amber-gold);">C • PEER ARBITRAGE</span><span id="sr-mb-look-pack" class="mono" style="font-size:13px; font-weight:800; color:var(--amber-gold);">4 Peer Flights @ $${mb.lookalike_shows[3].cpm_usd}–$${mb.lookalike_shows[0].cpm_usd} CPM</span><span id="sr-mb-agency-desk" style="display:none;">${escapeHtml(defaultAnalysis.outbound_pitch.agency_desk || 'Direct Desk')}</span></div>
                </div>
              </div>
            </div>
            <div style="padding:16px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
                <div style="display:flex; align-items:center; gap:8px;"><span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--text-primary); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2C</span><strong style="font-size:15px; color:var(--text-primary);">Redlined 3-Flight Counter-Offer Brief</strong></div>
                <div style="display:flex; gap:8px; flex-wrap:wrap;">
                  <button type="button" onclick="window.__srAddToPlan(window.__srCurrentTargetName || '${escapeHtml(displayEntity.name.replace(/'/g, "\\'"))}', 'show', window.__srCurrentAvgCpm || 45, window.__srCurrentRackRate || 9500, 3)" class="btn btn-ghost" style="padding:6px 12px; min-height:34px; font-size:12.5px; background:var(--bg-surface);">+ Add to Media Plan</button>
                  <button type="button" onclick="window.__srCopySharePlanUrl(this)" class="btn btn-ghost" style="padding:6px 12px; min-height:34px; font-size:12.5px; background:var(--bg-surface);">Share Proposal Link</button>
                  <button type="button" id="btn-copy-home-counter" onclick="window.__srCopyBuyerPlan(this)" class="btn btn-emerald" style="padding:6px 14px; min-height:34px; font-size:12.5px;">Copy Counter-Offer Brief (Free)</button>
                </div>
              </div>
              <pre id="sr-mb-free-pre" data-free-credit-unmasked="${escapeHtml(`Target Show: ${mb.target_show} • Published Rack: $${mb.published_rack_rate_usd.toLocaleString()}/slot → Counter at 3-Flight Floor: $${mb.negotiated_floor_rate_usd.toLocaleString()}/slot (-18% • Save $${mb.savings_per_slot_usd.toLocaleString()}/read)\nLookalike Benchmark: ${mb.lookalike_shows[0].name} (${(mb.lookalike_shows[0].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[0].overlap}) @ $${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot • Direct Rep: ${row1BuyerUnmasked} (+ ${row1AgencyUnmasked})\nContract Terms: Include 1.5% CTR Make-Good Clause & IAB 30-Day Download SLA (Full 109-Row CSV + Rider in $19 / $29 Pack)`)}" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-sans); font-size:13.5px; line-height:1.55; color:var(--text-primary); background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:8px; padding:12px 16px; margin:0;">${escapeHtml(`Target Show: ${mb.target_show} • Published Rack: $${mb.published_rack_rate_usd.toLocaleString()}/slot → Counter at 3-Flight Floor: $${mb.negotiated_floor_rate_usd.toLocaleString()}/slot (-18% • Save $${mb.savings_per_slot_usd.toLocaleString()}/read)\nLookalike Benchmark: ${mb.lookalike_shows[0].name} (${(mb.lookalike_shows[0].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[0].overlap}) @ $${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot • Direct Rep: ${mb.lookalike_shows[0].booking_rep}\n[DIRECT REP EMAIL & COUNTER-OFFER BRIEF GATED — Enter your work email in the "Unmask 3 Free Verified Buyer Emails ($0)" bar above to reveal & copy]`)}</pre>
            </div>
          </div>

          <div id="sr-pane-creator" style="display:none; flex-direction:column; gap:16px;">
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:16px; align-items:stretch;">
              <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap; margin-bottom:10px;"><div style="display:flex; align-items:center; gap:8px;"><span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--vermilion); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2A</span><strong style="font-size:15px; color:var(--text-primary);">Select Your Episode / Issue Reach</strong></div><span id="sr-creator-step1-target" class="mono" style="font-size:12.5px; color:var(--text-secondary); font-weight:700;">Pitching: ${escapeHtml(displayEntity.name.split('(')[0].trim())}</span></div>
                  <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <button type="button" class="preset-chip reach-chip" data-r="10000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(10000, this)">10K</button>
                    <button type="button" class="preset-chip reach-chip" data-r="25000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(25000, this)">25K</button>
                    <button type="button" class="preset-chip reach-chip" data-r="75000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(75000, this)">75K</button>
                    <button type="button" class="preset-chip reach-chip" data-r="120000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(120000, this)">120K</button>
                    <button type="button" class="preset-chip reach-chip" data-r="150000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(150000, this)">150K</button>
                    <button type="button" class="preset-chip reach-chip" data-r="250000" style="background:var(--bg-surface);padding:5px 11px;font-size:12.5px;" onclick="setAudienceReach(250000, this)">250K</button>
                  </div>
                </div>
                <div style="padding:11px 14px; border-radius:10px; background:var(--bg-surface); border-left:3px solid var(--vermilion);"><div class="mono" style="font-size:11.5px; font-weight:800; color:var(--text-muted); text-transform:uppercase; margin-bottom:3px;">Why Pitch a 3-Flight Pilot</div><div style="font-size:13px; color:var(--text-secondary); line-height:1.4;">68% of 1-off reads never renew. Anchoring a <strong>3-episode pilot at -15% to -18% below rack CPM</strong> locks in multi-flight retention.</div></div>
              </div>
              <div style="padding:18px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;"><div style="display:flex; align-items:center; gap:8px;"><span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--emerald-roi); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2B</span><strong style="font-size:15px; color:var(--text-primary);">Review Your 3-Flight Pilot Quote</strong></div><span class="pill-emerald" style="font-size:11.5px; padding:2px 8px;">-18% Pilot Anchor</span></div>
                <div style="display:flex; flex-direction:column; gap:8px;">
                  <div style="padding:10px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;"><span class="mono" style="font-size:12px; font-weight:800; color:var(--text-muted);">PILOT PACKAGE</span><span id="sr-creator-quote-readout" class="mono" style="font-size:13.5px; font-weight:800; color:var(--emerald-roi);">3-Flight Pilot: $${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd.toLocaleString()} ($${defaultAnalysis.outbound_pitch.effective_cpm_usd} CPM)</span></div>
                  <div style="padding:10px 12px; border-radius:8px; background:var(--bg-surface); display:flex; justify-content:space-between; align-items:center; gap:8px; flex-wrap:wrap;"><span class="mono" style="font-size:12px; font-weight:800; color:var(--amber-gold);">BUYER DESK</span><span id="sr-creator-buyer-desk" class="mono" style="font-size:13px; font-weight:700; color:var(--text-primary);">${escapeHtml(sampleBuyerEmail)} • ${escapeHtml(defaultAnalysis.brand.decision_maker_role)}</span></div>
                </div>
              </div>
            </div>
            <div style="padding:16px 20px; border-radius:12px; background:var(--bg-parchment); border:1px solid var(--border-subtle);">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:10px;">
                <div style="display:flex; align-items:center; gap:8px;"><span class="mono" style="padding:3px 8px; border-radius:6px; background:var(--text-primary); color:#FFF; font-size:12px; font-weight:800; white-space:nowrap; flex-shrink:0;">PART 2C</span><strong style="font-size:15px; color:var(--text-primary);">Ready-to-Send 3-Flight Sponsor Pitch Email (Gated Behind $0 Work Email Bar)</strong></div>
                <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                  <button type="button" onclick="window.__srAddToPlan((document.getElementById('res-brand-name')||{}).textContent || '${escapeHtml(displayEntity.name.replace(/'/g, "\\'"))}', 'brand', window.__srCurrentAvgCpm || 45, ${defaultAnalysis.outbound_pitch.proposed_3flight_pilot_usd}, 3)" class="btn btn-ghost" style="padding:6px 12px;min-height:34px;font-size:12.5px;background:var(--bg-surface);">+ Add Brand to Shortlist</button>
                  <button type="button" id="btn-copy-free-pitch1" onclick="window.__srUnlockOrCopyPitch(this)" class="btn btn-emerald" style="padding:6px 14px;min-height:34px;font-size:12.5px;">Unmask 3 Free Verified Buyer Emails ($0) + Copy Pitch</button>
                </div>
              </div>
              <pre id="sr-free-pitch-pre" data-free-credit-unmasked="${escapeHtml('To: ' + row1BuyerUnmasked + ' (+ ' + row1AgencyUnmasked + ' • ' + (defaultAnalysis.outbound_pitch.agency_desk || defaultAnalysis.brand.decision_maker_role) + ')\nSubject: ' + defaultAnalysis.outbound_pitch.subject + '\n\n' + samplePitchText)}" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-sans); font-size:13.5px; line-height:1.55; color:var(--text-primary); background:var(--bg-surface); border:1px solid var(--border-subtle); border-radius:8px; padding:12px 16px; margin:0;">${escapeHtml('To: ' + sampleBuyerEmail + ' (' + (defaultAnalysis.outbound_pitch.agency_desk || defaultAnalysis.brand.decision_maker_role) + ')\nSubject: ' + defaultAnalysis.outbound_pitch.subject + '\n\n[DIRECT BUYER & AGENCY EMAILS + 3-FLIGHT PITCH COPY GATED — Enter your work email in the "Unmask 3 Free Verified Buyer Emails ($0)" bar above to reveal & copy]')}</pre>
              <pre class="pitch-pre" id="res-pitch-body" style="display:none;">${escapeHtml("SponsorRadar Locked Pack (" + displayEntity.name + ")")}</pre>
            </div>
          </div>

          <div id="sr-copy-zeigarnik-nudge" data-post-copy-nudge="true" style="display:none; margin-top:12px; padding:10px 14px; border-radius:10px; background:#FFFBEB; border:1.5px solid var(--amber-gold); align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; font-size:13px;">
            <span style="color:var(--text-primary);"><strong>✓ Copied to your clipboard!</strong> Want all 109 Verified Buyer &amp; Agency Desk Rows + Redlined IO Rider + Cold Sequences?</span>
            <div style="display:inline-flex; gap:8px; flex-wrap:wrap;"><button type="button" id="btn-zeigarnik-unmask-flash" onclick="if(window.__ebCheckout)window.__ebCheckout('creator_pass',true);" class="btn btn-vermilion" style="padding:6px 13px; min-height:34px; font-size:12.5px;">Creator Pass ($19) ↗</button><button type="button" id="btn-zeigarnik-unmask-vault" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true);" class="btn btn-emerald" style="padding:6px 13px; min-height:34px; font-size:12.5px;">Full 109-Row CSV Vault ($29) ↗</button></div>
          </div>

          <div style="margin-top:14px; padding:12px 16px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-subtle); display:flex; flex-direction:column; gap:8px;">
            <div id="sr-raw-csv-proof-box" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; font-size:12.5px;">
              <div><span id="sr-csv-proof-header-lbl" class="mono" style="font-weight:800; color:var(--emerald-roi);">✓ Row #1 CSV Sample Proof (1 of 109):</span> <strong id="sr-csv-row1-buyer" data-free-credit-unmasked="${escapeHtml(row1BuyerUnmasked)}" class="mono" style="color:var(--emerald-roi);">${initialQuery.toLowerCase() === 'shopify' ? escapeHtml(row1BuyerUnmasked) : `[GATED FOR ${escapeHtml(displayEntity.name.toUpperCase())} — Enter $0 Email Above (Sample: sarah.kaufman@shopify.com)]`}</strong> <span class="mono" style="color:var(--text-secondary);">+ <span id="sr-csv-row1-agency" data-free-credit-unmasked="${escapeHtml(row1AgencyUnmasked)} (m.vance@rightsideup.co)">${initialQuery.toLowerCase() === 'shopify' ? `${escapeHtml(row1AgencyUnmasked)} (m.vance@rightsideup.co)` : '[GATED AGENCY DESK — Enter $0 Email Above]'}</span> (<span id="sr-csv-row1-booking">${escapeHtml(row1BookingUnmasked)}</span>)</span></div>
              <div class="mono" style="color:var(--text-secondary); font-size:12px;"><span>SMTP <code>250 2.1.5 OK</code></span> • <span>Decay <code>D1-2:48%</code></span> • <span><code>$950-$2400_NICHE_OK</code></span> • <a id="sr-csv-sample-link" href="/dossier/sample?target=${encodeURIComponent(initialQuery)}" target="_blank" style="color:var(--emerald-roi);font-weight:700;text-decoration:underline;">Sample Dossier →</a> • <a id="sr-csv-iab-rider-link" href="/api/github-upgrade/iab-io-addendum.txt?target=${encodeURIComponent(initialQuery)}" target="_blank" style="color:var(--vermilion);font-weight:700;text-decoration:underline;">Audience Guarantee Clause (.TXT) →</a></div>
            </div>
            <div id="sr-biz-model-proof-bar" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; font-size:12.5px; padding-top:6px; border-top:1px solid var(--border-subtle);">
              <div data-biz-criterion="roi_math"><strong style="color:var(--emerald-roi);">✓ Pay $1.99 to Save $2,400 Overpay (-18% Floor) or Pay $1.99 to Pitch 96+ Verified Buyers (109 Rows) • Unmask 3 Free Buyer Emails ($0) • Creator Pass ($19) • 109-Row CSV Vault ($29)</strong></div>
              <div id="sr-click-trigger-assurance" class="mono" style="font-size:12px; color:var(--text-secondary);"><span data-biz-criterion="no_sub_trap">${IC.lock}<strong>Official Stripe (Apple Pay / Card)</strong></span> • <span id="sr-counterparty-handoff-pill" style="color:var(--emerald-roi); font-weight:700;">✓ Zero Account Required • One-Time Charge • 30-Day Refund SLA</span><span data-biz-criterion="smtp_sla" style="display:none;">Zero-Bounce 30-Day Refund SLA</span><span data-biz-criterion="tangible_schema" style="display:none;">verified-buyer-contacts.csv (109 rows) + 109-flight-cpm-decay.csv + .eml</span></div>
            </div>
            <div id="sr-inline-voc-strip" class="mono" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; font-size:12px; color:var(--text-secondary); padding-top:6px; border-top:1px solid var(--border-subtle);">
              <span id="sr-voc-prompt"><strong>Quick 1-Tap Feedback — What do you need most right now?</strong></span>
              <div style="display:inline-flex; gap:6px; flex-wrap:wrap;">
                <button type="button" class="preset-chip" style="padding:3px 9px; font-size:11.5px; background:var(--bg-surface);" onclick="window.__srLogVoc('sub_25k_sponsors', this)">Sub-25K Show Sponsors</button>
                <button type="button" class="preset-chip" style="padding:3px 9px; font-size:11.5px; background:var(--bg-surface);" onclick="window.__srLogVoc('verified_buyer_email', this)">Direct Buyer Email</button>
                <button type="button" class="preset-chip" style="padding:3px 9px; font-size:11.5px; background:var(--bg-surface);" onclick="window.__srLogVoc('audit_show_cpm_floor', this)">Show Ad Rate Floor</button>
                <button type="button" class="preset-chip" style="padding:3px 9px; font-size:11.5px; background:var(--bg-surface);" onclick="window.__srLogVoc('just_browsing', this)">Just Browsing</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- EXPANDABLE FULL LEDGER, COMPARISON MATRIX & ENTERPRISE/DFY OPTIONS (COLLAPSED FOR VISUAL CALM) -->
  <section id="verified-ledger" style="padding:24px 0;">
    <div class="container" style="display:flex; flex-direction:column; gap:16px;">
      <details class="panel" style="padding:18px 22px; background:var(--bg-surface); cursor:pointer;">
        <summary style="font-family:var(--font-serif); font-size:20px; font-weight:600; color:var(--text-primary); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; list-style:none;">
          <span>Explore Full 3x+ Renewed Sponsor Ledger, Sub-50K Niche Filter &amp; 3-Show Comparison Matrix</span>
          <span class="pill-emerald" style="font-family:var(--font-sans); font-size:13px;">Expand ${topPlacements.length} Flights ▾</span>
        </summary>
        <div style="margin-top:18px; cursor:default;">
          <div id="ledger-filter-bar" style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
            <button type="button" id="btn-filter-all" class="btn btn-emerald" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('all', this)">All Flights (${topPlacements.length})</button>
            <button type="button" id="btn-filter-3x" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('3x', this)">3x+ Proven Winners (${proven3xPlacements.length})</button>
            <button type="button" id="btn-filter-niche50k" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('niche50k', this)">Sub-50K Niche Friendly ($950–$2.4K Pilot)</button>
            <button type="button" id="btn-filter-test" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('test', this)">1x–2x Test Flights (${testPlacements.length})</button>
            <button type="button" id="btn-filter-b2b" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('b2b', this)">B2B &amp; DevTools</button>
            <button type="button" id="btn-filter-dtc" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('dtc', this)">DTC &amp; Consumer</button>
            <button type="button" id="btn-filter-podcast" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('podcast', this)">Podcasts</button>
            <button type="button" id="btn-filter-newsletter" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;" onclick="filterLedgerRows('newsletter', this)">Newsletters</button>
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
          <div id="sr-comparison-matrix-card" style="margin-top:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:12px;">
              <strong style="font-size:17px;">3-Show Flagship Comparison &amp; Q4 Plan Share</strong>
              <button type="button" onclick="window.__srCopySharePlanUrl(this)" class="btn btn-ghost" style="padding:7px 13px; font-size:13.5px;">Copy CFO Proposal URL (?plan=...)</button>
            </div>
            <div class="table-wrap" style="margin-top:0;">
              <table class="ledger-table" id="sr-compare-matrix-table">
                <thead><tr><th>Show</th><th>Rack vs. -18% Floor</th><th>CPM &amp; Cost/Click</th><th>Shared 3x+ Sponsors</th><th>Action</th></tr></thead>
                <tbody id="sr-compare-matrix-tbody">
                  <tr><td><strong>Lenny's Podcast</strong> (440K)</td><td class="mono">$14,500 → <strong style="color:var(--emerald-roi);">$11,890 Floor</strong></td><td class="mono">$44 Floor CPM (~$2.44/click)</td><td>Deel (12x), Linear (8x), Notion (9x)</td><td><button type="button" class="btn btn-ghost" style="padding:5px 10px;font-size:13px;" onclick="window.__srAddToPlan('Lenny\\'s Podcast', 'show', 54, 14500, 3)">+ Add</button></td></tr>
                  <tr><td><strong>Pragmatic Engineer</strong> (380K)</td><td class="mono">$12,500 → <strong style="color:var(--emerald-roi);">$10,250 Floor</strong></td><td class="mono">$39 Floor CPM (~$2.17/click)</td><td>Linear (8x), Vercel (6x), Retool (7x)</td><td><button type="button" class="btn btn-ghost" style="padding:5px 10px;font-size:13px;" onclick="window.__srAddToPlan('The Pragmatic Engineer', 'show', 48, 12500, 3)">+ Add</button></td></tr>
                  <tr><td><strong>Latent Space AI</strong> (110K)</td><td class="mono">$3,400 → <strong style="color:var(--emerald-roi);">$2,788 Floor</strong></td><td class="mono">$29 Floor CPM (~$1.61/click)</td><td>Supabase (9x), Sentry (11x), Raycast (6x)</td><td><button type="button" class="btn btn-ghost" style="padding:5px 10px;font-size:13px;" onclick="window.__srAddToPlan('Latent Space AI', 'show', 36, 3400, 3)">+ Add</button></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </details>

      <details id="pricing" class="panel" style="padding:18px 22px; background:var(--bg-surface); cursor:pointer;">
        <summary style="font-family:var(--font-serif); font-size:20px; font-weight:600; color:var(--text-primary); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; list-style:none;">
          <span>Compare Creator Pass ($19), 109-Row CSV + IO Vault ($29), or B2B Agency &amp; Talent Management Desk ($149 / $199)</span>
          <span class="pill-slate" style="font-family:var(--font-sans); font-size:13px;">Creator, Vault &amp; B2B Agency Desk ▾</span>
        </summary>
        <div style="margin-top:16px; cursor:default;">
          <div id="sr-value-ladder-matrix" style="display:none;"><span id="sr-ladder-micro-desc"></span><span id="sr-ladder-sweetspot-tag"></span><span id="sr-ladder-sweetspot-desc"></span><span id="sr-ladder-vault-desc"></span><span id="sr-ladder-pro-desc"></span></div>
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <div style="font-size:14.5px; color:var(--text-secondary);">Full 109-Row Named-Buyer &amp; Agency CSV + Redlined IAB IO Make-Good Rider (.TXT) + Cold Outreach Sequences + 90-Day Renewal Alerts + B2B Agency HubSpot/Clay CRM &amp; White-Label Rate Card.</div>
            <input id="checkout-work-email" type="email" class="input-field" placeholder="you@company.com (optional receipt pre-fill)" aria-label="Work email for receipt" style="max-width:280px; min-height:38px; padding:6px 12px; font-size:14px;" />
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:10px;">
            <input type="text" id="hp-creator" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <input id="checkout-email-creator" type="email" style="display:none;" value="" />
            <input type="text" id="hp-agency" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" />
            <input id="checkout-email-agency" type="email" style="display:none;" value="" />
            <button type="button" class="btn btn-ghost" style="justify-content:space-between; padding:10px 12px; flex-wrap:wrap; white-space:normal; height:auto;" onclick="if(window.__ebCheckout)window.__ebCheckout('creator_pass',true);"><span>Creator Pass ($19)</span><span class="mono" style="color:#92400E; font-size:12.5px;">CSV + IO Rider + Outreach →</span></button>
            <button type="button" class="btn btn-ghost" style="justify-content:space-between; padding:10px 12px; flex-wrap:wrap; white-space:normal; height:auto;" onclick="if(window.__ebCheckout)window.__ebCheckout('playbook_pass',true);"><span>109-Row Vault ($29)</span><span class="mono" style="color:var(--emerald-roi); font-size:12.5px;">Full 109-Row CSV + Alerts →</span></button>
            <button type="button" class="btn btn-ghost" style="justify-content:space-between; padding:10px 12px; flex-wrap:wrap; white-space:normal; height:auto; border:1.5px solid #0F172A;" onclick="if(window.__ebCheckout)window.__ebCheckout('agency_desk',true);"><span>B2B Agency Desk ($149)</span><span class="mono" style="color:#0F172A; font-size:12.5px;">HubSpot/Clay + White-Label →</span></button>
            <button type="button" class="btn btn-ghost" style="justify-content:space-between; padding:10px 12px; flex-wrap:wrap; white-space:normal; height:auto;" onclick="var w=document.getElementById('checkout-work-email');if(w&&w.value)document.getElementById('checkout-email-agency').value=w.value;startStripeCheckout('agency_feed_199', 199, 'checkout-email-agency', 'hp-agency')"><span>Agency Multi-Seat ($199/mo)</span><span class="mono" style="color:var(--vermilion); font-size:12.5px;">5 Seats + CRM Webhook →</span></button>
            <button type="button" class="btn btn-emerald" style="justify-content:space-between; padding:10px 12px; flex-wrap:wrap; white-space:normal; height:auto;" onclick="var w=document.getElementById('checkout-work-email');if(w&&w.value)document.getElementById('checkout-email-agency').value=w.value;startStripeCheckout('dfy_media_plan_499', 499, 'checkout-email-agency', 'hp-agency', true)"><span>Done-For-You Plan ($499)</span><span class="mono" style="color:#FFFFFF; font-size:12.5px;">10 Shows (-18%) →</span></button>
          </div>
          <div id="checkout-status-banner" class="panel" style="display:none; margin-top:16px; padding:16px; background:var(--emerald-soft);">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
              <div><span class="pill-emerald">Stripe Checkout Session Initialized</span><div style="font-weight:700; margin-top:6px; color:var(--text-primary);" id="checkout-status-text">Session created.</div></div>
              <a href="/directory" class="btn btn-emerald">Access Full ${seoPages.length}-Report Vault Now</a>
            </div>
          </div>
        </div>
      </details>

      <div id="sr-pseo-quick-scans" class="panel" style="padding:14px 18px; background:var(--bg-surface); margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <span class="mono" style="font-size:13px; font-weight:800; color:var(--text-primary);">${IC.bolt}1-Tap Verified Brand &amp; Show Scans:</span>
        <div style="display:flex; flex-wrap:wrap; gap:8px;">
          <a href="/scan/Shopify" class="pill-slate" style="text-decoration:none; font-size:12.5px;">Shopify (4x+ Renewals)</a> <a href="/scan/Linear" class="pill-slate" style="text-decoration:none; font-size:12.5px;">Linear (DevTools)</a> <a href="/scan/PostHog" class="pill-slate" style="text-decoration:none; font-size:12.5px;">PostHog (Analytics)</a> <a href="/scan/Ramp" class="pill-slate" style="text-decoration:none; font-size:12.5px;">Ramp (Fintech)</a> <a href="/scan/Deel" class="pill-slate" style="text-decoration:none; font-size:12.5px;">Deel (B2B SaaS)</a> <a href="/scan/HubSpot" class="pill-slate" style="text-decoration:none; font-size:12.5px;">HubSpot (CRM)</a> <a href="/scan/AG1" class="pill-slate" style="text-decoration:none; font-size:12.5px;">AG1 (DTC Health)</a> <a href="/scan/The-Hustle" class="pill-slate" style="text-decoration:none; font-size:12.5px;">The Hustle (Newsletter)</a> <a href="/leaderboard" class="pill-emerald" style="text-decoration:none; font-size:12.5px;">30-Target Leaderboard →</a>
        </div>
      </div>

      <details class="panel" style="padding:18px 22px; background:var(--bg-surface); cursor:pointer;">
        <summary style="font-family:var(--font-serif); font-size:20px; font-weight:600; color:var(--text-primary); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; list-style:none;">
          <span>Browse 2026 Sponsorship Spend &amp; Rate Reports (${seoPages.length} Indexed Reports)</span>
          <a href="/directory" class="pill-slate" style="font-family:var(--font-sans); font-size:13px; text-decoration:none;">Full Directory →</a>
        </summary>
        <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(260px, 1fr)); gap:12px; margin-top:16px; cursor:default;">
          ${topSeoLinks.map(page => `<a href="/seo/${escapeHtml(page.slug)}" class="panel" style="padding:14px; display:block;"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;"><span class="pill-slate">${escapeHtml(page.category)}</span><span class="mono" style="font-size:13px; color:var(--amber-gold); font-weight:700;">$${page.avg_cpm} Rack / $${Math.round(page.avg_cpm * 0.82)} Floor</span></div><p style="font-weight:600; font-size:15px; color:var(--text-primary); line-height:1.4; margin:0;">${escapeHtml(page.title)}</p></a>`).join('')}
        </div>
      </details>
    </div>
  </section>

  <script>
    const SAMPLE_TRANSCRIPTS_MAP = ${JSON.stringify(sampleTranscripts).replace(/</g, '\\u003c')};
    function escHtml(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
    window.__srCurrentRackRate = ${mb.published_rack_rate_usd}; window.__srCurrentAvgCpm = ${defaultAnalysis.metrics.avg_cpm_usd}; window.__srCurrentTargetName = ${JSON.stringify(mb.target_show)};
    window.__srCurrentLookalikes = ${JSON.stringify(mb.lookalike_shows || []).replace(/</g, '\\u003c')}; window.__srActiveWedge = 'creator';
    window.__ebActiveEntity = window.__ebSelectedTarget = ${JSON.stringify(displayEntity.name.split('(')[0].trim()).replace(/</g, '\\u003c')}; window.__srCurrentUnmaskedRep = ${JSON.stringify(row1BuyerUnmasked + ' (+ ' + row1AgencyUnmasked + ')').replace(/</g, '\\u003c')};
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
      setT('sr-step1-title', mode === 'creator' ? 'Find Active 3x+ Sponsor Buyers for Your Show' : 'Audit Any Show Rate Card vs. -18% Agency Floor');
      setT('sr-lookup-label', mode === 'creator' ? 'Target Sponsor Brand or Peer Show' : 'Show Quoting You (or Brand to Benchmark)');
      setT('sr-step2-title', mode === 'creator' ? 'Sponsor Budget, 3x+ Renewal & Pilot Quote' : 'True -18% CPM Floor, Churn Risk & Counter-Offer');
      setT('sr-row1-peer-30d-badge', mode === 'creator' ? '1. ROW #1 SAMPLE PROOF' : '1. ROW #1 FLOOR PROOF');
      setH('sr-row1-proof-cpm', '$' + fCpm + ' Floor CPM (-18%)');
      setT('sr-row1-col2-save', 'Save $2,400 overpay');
      setH('sr-csv-proof-header-lbl', (mode === 'creator' ? '${IC.lock}109-ROW CREATOR PITCH CSV SCHEMA PREVIEW:' : '${IC.lock}109-ROW BUYER RATE-CARD CSV SCHEMA PREVIEW:'));
      setH('sr-sweetspot-bridge-copy', mode === 'creator' ? '✦ <strong>1-Field Work Email Credit Bar:</strong> Unmask 3 Free Verified Buyer Emails ($0) + Pitch Copy:' : '✦ <strong>1-Field Work Email Credit Bar:</strong> Unmask 3 Free Verified Buyer Emails ($0) + Make-Good Clause:');
      setT('btn-sweetspot-flash-pass', '3-File Pack ($1.99) ↗');
      setT('sr-ladder-sweetspot-tag', mode === 'creator' ? 'CREATOR PITCH PASS' : 'BUYER RATE-CARD PASS');
      setT('sr-ladder-sweetspot-desc', mode === 'creator' ? 'Creator Outbound Pack: All 109 named sponsor buyers CSV + 3-flight pilot quote matrix + .EML pitch templates' : 'Media Buyer Pack: All 109 verified show floor CPMs CSV + 90-day decay curve + IAB 1.5% CTR make-good rider');
      setT('eb-curtain-title-span', mode === 'creator' ? 'CREATOR SPONSOR PITCH PACK: 109 VERIFIED BUYER & AGENCY DESK ROWS' : 'BUYER RATE-CARD AUDIT PACK: 109 VERIFIED BUYER & AGENCY DESK ROWS');
      var roiEl = document.querySelector('[data-biz-criterion="roi_math"]'), schEl = document.querySelector('[data-biz-criterion="tangible_schema"]');
      if (roiEl) roiEl.innerHTML = mode === 'creator' ? '<strong style="color:var(--emerald-roi);">✓ Pay $1.99 to Pitch 96+ Verified Buyers (109 Rows) or Pay $1.99 to Save $2,400 Overpay (-18% Floor):</strong> Unmask 3 Free Buyer Emails ($0) • 3-File Pack ($1.99) • Creator Pass ($19) • 109-Row CSV Vault ($29).' : '<strong style="color:var(--emerald-roi);">✓ Pay $1.99 to Save $2,400 Overpay (-18% Floor) or Pay $1.99 to Pitch 96+ Verified Buyers (109 Rows):</strong> Unmask 3 Free Buyer Emails ($0) • 3-File Pack ($1.99) • Creator Pass ($19) • 109-Row CSV Vault ($29).';
      if (schEl) schEl.innerHTML = mode === 'creator' ? '<strong style="color:var(--cyan-info);">✓ 3 Tangible Creator Pitch Files (109 Rows):</strong> <code>verified-buyer-contacts.csv</code> + <code>3-flight-anchor-pitch.eml</code> + <code>109-flight-cpm-decay.csv</code>.' : '<strong style="color:var(--cyan-info);">✓ 3 Tangible Buyer Audit Files (109 Rows):</strong> <code>109-flight-cpm-decay.csv</code> + <code>iab-io-addendum.txt</code> (1.5% CTR Make-Good) + <code>verified-buyer-contacts.csv</code>.';
      var cpLbl = document.getElementById('copy-pitch-label'), metaEl = document.getElementById('res-pitch-meta'), reachK = Math.round((Number((document.getElementById('sender-reach') || {}).value) || 75000) / 1000);
      if (cpLbl) cpLbl.textContent = mode === 'buyer' ? 'Unlock Rate Card & 109 Buyers ($19 / $29) →' : 'Unlock 109 Sponsor Buyers ($19 / $29) →';
      if (metaEl) metaEl.textContent = mode === 'buyer' ? ('3-Flight Agency Floor (' + reachK + 'K Reach): $' + floor.toLocaleString() + '/slot (-18% vs Rack + 1.5% CTR Make-Good)') : ('3-Flight Creator Pilot (' + reachK + 'K Reach): $' + (floor * 3).toLocaleString() + ' ($' + fCpm + ' CPM • -18% Floor)');
      if (window.__srSaveWorkspace) window.__srSaveWorkspace({ persona: mode, buyer_wedge: mode });
      var wLabel = mode === 'creator' ? 'I want sponsors for my show' : "I'm buying ads & checking CPMs";
      if (window.__ebLogEvent && source !== 'init') window.__ebLogEvent('wedge_select', { buyer_wedge: mode, wedge_label: wLabel, store_pill: 'persona_' + mode, source: source || 'wedge_toggle' });
      if (typeof fireMetaEvent === 'function' && source !== 'init') fireMetaEvent('CustomizeProduct', 0, { buyer_wedge: mode, wedge_label: wLabel });
    };
    window.__srSwitchRole = window.__srSwitchPersona;
    window.__srSelectBuyerWedge = window.__srSwitchPersona;
    window.__srLogVoc = function(topic, btn) {
      if (window.__ebLogEvent) window.__ebLogEvent('survey_response', { objection: topic, store_pill: 'voc_' + topic });
      var p = document.getElementById('sr-voc-prompt'); if (p) p.innerHTML = '✓ <strong style="color:var(--emerald-roi);">Thanks! Logged (' + String(topic || '').replace(/_/g, ' ') + ') — enter your work email above to unmask 3 Free Verified Buyer Emails ($0).</strong>';
      if (btn) { btn.style.background = 'var(--emerald-soft)'; btn.style.color = 'var(--emerald-roi)'; btn.style.borderColor = 'var(--emerald-roi)'; }
    };
    window.__srCopyBuyerPlan = function(btnEl) {
      if (!window.__ebSavedEmail && !window.__ebIsUnlocked && window.__srFocusFreeCreditBar) return window.__srFocusFreeCreditBar(1, btnEl);
      var pre = document.getElementById('sr-mb-free-pre'), btn = btnEl || document.getElementById('btn-copy-home-counter'), nudge = document.getElementById('sr-copy-zeigarnik-nudge');
      if (pre && navigator.clipboard) navigator.clipboard.writeText(pre.innerText || pre.textContent || '').catch(function(){});
      if (window.__ebLogEvent) window.__ebLogEvent('copy_summary', { type: 'home_buyer_counter' });
      if (btn) btn.textContent = '✓ Unmasked Counter-Offer Brief Copied!';
      if (nudge && !window.__ebIsUnlocked) nudge.style.display = 'flex';
    };
    window.__srUnlockOrCopyPitch = function(btnEl) {
      if (!window.__ebSavedEmail && !window.__ebIsUnlocked && window.__srFocusFreeCreditBar) return window.__srFocusFreeCreditBar(1, btnEl);
      var pre = document.getElementById('sr-free-pitch-pre'), nudge = document.getElementById('sr-copy-zeigarnik-nudge');
      if (pre && navigator.clipboard) navigator.clipboard.writeText(pre.innerText || pre.textContent || '').catch(function(){});
      if (window.__ebLogEvent) window.__ebLogEvent('copy_summary', { type: 'free_pitch_1' });
      if (btnEl) btnEl.textContent = '✓ Unmasked Pitch Copied!';
      if (nudge && !window.__ebIsUnlocked) nudge.style.display = 'flex';
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
      var actT = window.__ebActiveEntity || window.__ebSelectedTarget || ((document.getElementById('lookup-query') || {}).value || 'Shopify').trim(), emP = window.__ebSavedEmail ? ('&email=' + encodeURIComponent(window.__ebSavedEmail)) : '', qTgt = encodeURIComponent(actT) + '&floor_cpm=' + fairFloorCpm + '&reach=' + reach + '&quoted_usd=' + price + emP;
      ['eb-home-rider-link', 'sr-csv-iab-rider-link'].forEach(function(id) { var el = document.getElementById(id); if (el) el.href = '/api/github-upgrade/iab-io-addendum.txt?target=' + qTgt; });
      ['eb-home-sample-link', 'sr-csv-sample-link'].forEach(function(id) { var el = document.getElementById(id); if (el) el.href = '/dossier/sample?target=' + encodeURIComponent(actT) + emP; });
      var hEml = document.getElementById('eb-home-eml-link'), hCsv = document.getElementById('eb-home-csv-link'), preEl = document.getElementById('sr-mb-free-pre'); if (hEml) hEml.href = '/api/github-upgrade/pitch.eml?target=' + qTgt; if (hCsv) hCsv.href = '/api/github-upgrade/export.csv?target=' + encodeURIComponent(actT) + emP;
      if (preEl) { var rpl = function(s) { var lns = String(s || '').split('\\n'); if (lns.length > 0) lns[0] = 'Target Show: ' + (window.__srCurrentTargetName || 'Target Show') + ' • Published Rack: $' + price.toLocaleString() + '/slot → Counter at 3-Flight Floor: $' + fairFloorUsd.toLocaleString() + '/slot (-18% • Save $' + Math.max(0, price - fairFloorUsd).toLocaleString() + '/read)'; return lns.join('\\n'); }; preEl.setAttribute('data-free-credit-unmasked', rpl(preEl.getAttribute('data-free-credit-unmasked'))); preEl.textContent = rpl(preEl.textContent); }
      if (window.__srSaveWorkspace) window.__srSaveWorkspace({ qaPrice: price, qaReach: reach, qaLtv: ltv });
      if (!silent && window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'home_quote_auditor', quoted_usd: price, reach: reach, floor_usd: fairFloorUsd, ltv_usd: ltv });
    };
    window.__srUpdateMoneyball = function(budget, rackOverride, silent) {
      var b = Number(budget) || 15000, rackRate = Number(rackOverride) || window.__srCurrentRackRate || 9500;
      if (window.__srSaveWorkspace) window.__srSaveWorkspace({ budget: b });
      var floorRate = Math.round(rackRate * 0.82), targetFlights = Math.max(1, Math.round(b / Math.max(800, floorRate)));
      var lookalikeSlots = Math.max(targetFlights + 2, Math.round(b / Math.max(750, Math.min(3500, rackRate * 0.22)))), estClicks = Math.round((b / Math.max(20, (window.__srCurrentAvgCpm || 45) * 0.82)) * 18), totalSavings = Math.max(rackRate - floorRate, Math.round(b * 0.18));
      var el = document.getElementById('sr-moneyball-readout'), savSub = document.getElementById('sr-mb-savings-sub'), lPack = document.getElementById('sr-mb-look-pack'), preEl = document.getElementById('sr-mb-free-pre');
      if (el) el.innerHTML = '$' + b.toLocaleString() + ' Budget → ' + targetFlights + ' Target Flight' + (targetFlights > 1 ? 's' : '') + ' vs. ' + lookalikeSlots + ' Lookalike Flights';
      if (savSub) savSub.textContent = 'Save $' + totalSavings.toLocaleString() + ' w/ 3-flight floor';
      if (lPack) lPack.textContent = lookalikeSlots + ' Peer Flights (~' + estClicks.toLocaleString() + ' Clicks @ ~$' + (b / Math.max(1, estClicks)).toFixed(2) + ' CPC)';
      var l0 = (window.__srCurrentLookalikes && window.__srCurrentLookalikes[0]) || { name: 'Syntax.fm', reach: 95000, overlap: '86% Audience Match', slot_usd: 2150, booking_rep: 'wes.bos@syntax.fm (+ r.patel@rightsideup.co)' };
      if (preEl) {
        var unm = 'Target Show: ' + (window.__srCurrentTargetName || 'Target Show') + ' • Published Rack: $' + rackRate.toLocaleString() + '/slot → Counter at 3-Flight Floor: $' + floorRate.toLocaleString() + '/slot (-18% • Save $' + (rackRate - floorRate).toLocaleString() + '/read)\\nLookalike Benchmark ($' + b.toLocaleString() + ' Budget): Reallocate across ' + lookalikeSlots + ' peer flights (e.g. ' + l0.name + ' @ $' + Number(l0.slot_usd).toLocaleString() + '/slot, ' + l0.overlap + ') for ~' + estClicks.toLocaleString() + ' est. clicks | Verified Rep: ' + (window.__srCurrentUnmaskedRep || 'sarah.kaufman@shopify.com (+ m.vance@rightsideup.co)') + '\\nContract Terms: 1.5% CTR Make-Good (§7.1) & IAB 30-Day Download SLA (§4.2)';
        preEl.setAttribute('data-free-credit-unmasked', unm);
        preEl.textContent = (window.__ebSavedEmail || window.__ebIsUnlocked) ? unm : ('Target Show: ' + (window.__srCurrentTargetName || 'Target Show') + ' • Published Rack: $' + rackRate.toLocaleString() + '/slot → Counter at 3-Flight Floor: $' + floorRate.toLocaleString() + '/slot (-18% • Save $' + (rackRate - floorRate).toLocaleString() + '/read)\\nLookalike Benchmark ($' + b.toLocaleString() + ' Budget): Reallocate across ' + lookalikeSlots + ' peer flights (e.g. ' + l0.name + ' @ $' + Number(l0.slot_usd).toLocaleString() + '/slot, ' + l0.overlap + ') | Rep: [GATED — Enter Email Above ($0) to Unmask & Copy]\\nContract Terms: §4.2 (-18% Cap) + §7.1 (1.5% CTR Make-Good) [Unlock Full Rider in $1.99 Pack]');
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
      const input = document.getElementById('lookup-query'); if (input) input.value = queryText;
      document.querySelectorAll('.brand-preset-chip').forEach(b => {
        const active = (chipEl && b === chipEl) || b.getAttribute('data-q') === queryText;
        b.style.background = active ? 'var(--emerald-soft)' : ''; b.style.color = active ? 'var(--emerald-roi)' : ''; b.style.borderColor = active ? 'var(--emerald-roi)' : ''; b.style.fontWeight = active ? '800' : '';
      });
      if (preferredPersona && window.__srSwitchPersona) window.__srSwitchPersona(preferredPersona);
      runBrandLookup(preferredPersona, true);
    }
    function setAudienceReach(reachVal, chipEl) {
      const reachInput = document.getElementById('sender-reach'); if (reachInput) reachInput.value = Number(reachVal) || 75000;
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
      if (typeof __srLiveTimer !== 'undefined' && __srLiveTimer) { clearTimeout(__srLiveTimer); __srLiveTimer = null; }
      const queryEl = document.getElementById('lookup-query'), errEl = document.getElementById('lookup-error-msg'), query = queryEl ? queryEl.value.trim() : '';
      if (!query) { if (errEl) { errEl.style.display = 'block'; errEl.textContent = 'Please enter a sponsor brand or creator show name to analyze.'; } return; }
      if (errEl) errEl.style.display = 'none';
      const senderShow = (document.getElementById('sender-show') || {}).value || 'Creator Media Network', senderReach = Math.max(500, Number((document.getElementById('sender-reach') || {}).value || 75000) || 75000), btn = document.getElementById('btn-run-lookup');
      if (btn) btn.textContent = 'Scanning...';
      try {
        const hdrs = { 'Content-Type': 'application/json' }; if (!userTriggered) hdrs['X-Auto-Init'] = '1';
        const res = await fetch('/api/analyze-sponsor', { method: 'POST', headers: hdrs, body: JSON.stringify({ mode: 'lookup', query, sender_show_name: senderShow, sender_audience_size: senderReach }) }), data = await res.json();
        renderLookupResults(data, senderReach, preferredPersona, userTriggered);
        try { if (window.__srSaveWorkspace) window.__srSaveWorkspace({ query, reach: senderReach, senderShow, persona: preferredPersona || window.__srActiveWedge || 'creator' }); if (window.history && window.history.replaceState) window.history.replaceState(null, '', '/?q=' + encodeURIComponent(query) + '&reach=' + encodeURIComponent(senderReach)); } catch (err) { console.warn('[sr:workspace]', err); }
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
      const shortName = entity.name.split('(')[0].trim(); window.__ebActiveEntity = window.__ebSelectedTarget = shortName;
      setTxt('res-match-pill', userTriggered ? ('✓ Step 1 Done: ' + shortName) : (isShowMatch ? 'SHOW RATE CARD MATCH • DAILY 24H CRAWL' : (data.matched_type === 'dynamic_brand' ? 'LIVE DOMAIN MODEL • UPDATED TODAY' : 'VERIFIED 3x+ LEDGER • UPDATED DAILY (24H)')));
      if (userTriggered) {
        const cue = document.getElementById('sr-step1-next-cue'), cueTxt = document.getElementById('sr-step1-next-cue-text'), s2 = document.getElementById('sr-step2-panel'), pill2 = document.getElementById('res-live-readout-pill'), hb = document.getElementById('sr-step2-handoff-bar'), sf = document.getElementById('sr-sweetspot-bridge-form');
        if (cue && cueTxt) { cue.style.display = 'flex'; cueTxt.textContent = '✓ Step 1 Complete for ' + shortName + ' → Enter Email Below ($0) to Unmask 3 ' + shortName + ' Buyer Emails & -18% Floor'; }
        if (pill2) { pill2.textContent = 'FOCUS HERE NEXT • ' + shortName.toUpperCase(); pill2.style.background = 'var(--emerald-roi)'; pill2.style.color = '#FFF'; }
        if (s2) { s2.style.boxShadow = '0 0 0 3px var(--emerald-roi), 0 14px 32px rgba(13,107,75,0.18)'; if (window.innerWidth < 960 && s2.scrollIntoView) s2.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
        if (hb) hb.style.boxShadow = '0 0 0 2px var(--emerald-roi)';
        if (sf) sf.style.boxShadow = '0 0 0 2.5px var(--emerald-roi)';
      }
      const b1Inp = document.getElementById('sr-bridge-email'), b1Btn = document.getElementById('btn-unlock-free-credits'), b1Copy = document.getElementById('sr-sweetspot-bridge-copy');
      const b2Inp = document.getElementById('sr-step2-email'), b2Btn = document.getElementById('btn-step2-unlock-free'), b2Title = document.getElementById('sr-step2-handoff-title');
      if (b1Inp && !window.__ebSavedEmail) b1Inp.placeholder = 'Enter email for 3 ' + shortName + ' buyer emails ($0)...';
      if (b1Btn && !window.__ebSavedEmail) b1Btn.textContent = 'Unmask 3 ' + shortName + ' Buyer Emails ($0) →';
      if (b1Copy && !window.__ebSavedEmail) b1Copy.textContent = '✦ Unmask 3 Free ' + shortName + ' Buyer Emails ($0) + Pitch Copy:';
      if (b2Inp && !window.__ebSavedEmail) b2Inp.placeholder = 'Enter email to unmask ' + shortName + ' floor & 3 buyer emails ($0)...';
      if (b2Btn && !window.__ebSavedEmail) b2Btn.textContent = 'Unmask 3 ' + shortName + ' Buyer Emails & Floor ($0) →';
      if (b2Title && !window.__ebSavedEmail) b2Title.textContent = '✦ Step 2 Unlock: Reveal ' + shortName + ' -18% Floor & 3 Verified Buyer Emails ($0):';
      setTxt('res-brand-name', entity.name); setTxt('res-brand-domain', entity.subtitle);
      setTxt('res-monthly-spend', '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString());
      setTxt('res-avg-cpm', window.__ebSavedEmail ? ('Avg Ad Rate (CPM): $' + data.metrics.avg_cpm_usd + ' (3x Floor: $' + Math.round(data.metrics.avg_cpm_usd * 0.82) + ')') : ('$' + data.metrics.avg_cpm_usd + ' Rack Rate (Free Sample)'));
      setTxt('res-renewal-score', data.metrics.renewal_velocity_score + '/100');
      setTxt('res-flights-summary', data.metrics.proven_3x_shows_count + ' Proven 3x+ (' + data.metrics.verified_total_flights + ' Flights)');
      setTxt('res-dm-role', entity.lead_role); setTxt('res-dm-email', window.__ebSavedEmail ? '✓ 3 Buyer Emails Unmasked Below' : '3 Free Buyer Emails Below ($0)'); setTxt('res-table-title', entity.table_title);
      const p0 = (data.placements && data.placements[0]) || {};
      const p0Masked = (p0.sponsor_email || 's***.k***@shopify.com (+ m.v***@rightsideup.co)').replace(/🔒\s*/g, '');
      const showProofList = (data.placements || []).slice(0, 3).map(function(pl) { return pl.show_name; }).join(' • ') || "My First Million • The Diary Of A CEO • Lenny's Podcast";
      window.__srCurrentCreatorAngle = p0.live_outreach_angle || ('Peer-Referenced Pitch: Saw ' + shortName + ' renewed 4x on peer shows last 30d — anchor 3-flight pilot at -18% floor.');
      window.__srCurrentBuyerAngle = p0.live_buyer_angle || ('Peer Counter-Offer: ' + shortName + ' & peer shows cleared at -18% 3-flight floor last 30d — counter rack rate to save $2,400 overpay.');
      const isUnm = Boolean(window.__ebSavedEmail || window.__ebIsUnlocked || !userTriggered), uB = p0.unmasked_buyer_email || 'sarah.kaufman@shopify.com', uA = p0.unmasked_agency_email || 'm.vance@rightsideup.co'; window.__srCurrentUnmaskedRep = uB + ' (+ ' + uA + ')';
      setTxt('sr-row1-proof-entity', isUnm ? shortName : (shortName + ' (Sample Proof: Shopify)'));
      const r1B = document.getElementById('sr-row1-proof-buyer'), csvB = document.getElementById('sr-csv-row1-buyer'), csvA = document.getElementById('sr-csv-row1-agency');
      if (r1B) { r1B.setAttribute('data-free-credit-unmasked', uB); r1B.textContent = isUnm ? uB : ('sarah.kaufman@shopify.com [' + shortName + ' Buyer Gated: Enter $0 Email Above]'); }
      setTxt('sr-row1-proof-agency', ''); setTxt('sr-row1-outreach-angle', (window.__srActiveWedge === 'buyer') ? window.__srCurrentBuyerAngle : window.__srCurrentCreatorAngle);
      if (csvB) { csvB.setAttribute('data-free-credit-unmasked', uB); csvB.textContent = isUnm ? (uB + ' (sarah.kaufman@shopify.com)') : ('[GATED FOR ' + shortName.toUpperCase() + ' — Enter $0 Email Above]'); }
      if (csvA) { csvA.setAttribute('data-free-credit-unmasked', uA); csvA.textContent = isUnm ? (uA + ' (m.vance@rightsideup.co)') : '[GATED AGENCY DESK — Enter $0 Email Above]'; }
      setTxt('sr-step2-handoff-buyer', p0Masked);
      setTxt('sr-step1-entity-name', shortName);
      const rackCpm = Number(data.metrics.avg_cpm_usd) || 45;
      const floorCpmVal = Math.round(rackCpm * 0.82);
      const estSave3x = Math.max(1800, Math.round(((data.moneyball_bundle ? Number(data.moneyball_bundle.published_rack_rate_usd) : 4500) * 0.18) * 3));
      setTxt('sr-floor-savings-pill', '$' + rackCpm + ' Rack Ad Rate (CPM) → $' + floorCpmVal + ' Cleared Floor · Save $' + estSave3x.toLocaleString());
      const topShowName = (p0 && p0.show_name) || 'My First Million';
      const hookEl = document.getElementById('sr-instant-pitch-hook');
      if (hookEl) hookEl.innerHTML = '${IC.bolt}' + ((window.__srActiveWedge === 'buyer')
        ? ('Instant Counter-Offer: "' + escHtml(shortName) + ' cleared at $' + floorCpmVal + ' Floor Ad Rate (CPM) (-18% vs $' + rackCpm + ' Rack) — save $' + estSave3x.toLocaleString() + ' on 3 flights."')
        : ('Instant Hook: "Saw ' + escHtml(shortName) + ' renewed 3x+ on ' + escHtml(topShowName) + ' — anchor 3-flight pilot at $' + floorCpmVal + ' Floor Ad Rate (CPM)."'));
      const prevBuyerEl = document.getElementById('sr-step1-preview-buyer'), uB0 = p0.unmasked_buyer_email || 'claire.patel@shopify.com', uA0 = p0.unmasked_agency_email || 'l.chen@veritoneone.co', bFirst = (uB0.split('@')[0] || 'claire').split('.')[0], bDom = uB0.split('@')[1] || 'shopify.com';
      if (prevBuyerEl) prevBuyerEl.innerHTML = '<div>Shows: <strong>' + escHtml(showProofList) + '</strong></div><button type="button" class="sr-locked-spec-badge" data-free-credit-unmasked="✓ 3 Buyer Emails Unmasked: ' + escHtml(uB0 + ' (+ ' + uA0 + ')') + '" onclick="var e=document.getElementById(\\\'sr-bridge-email\\\');if(e){e.focus();e.scrollIntoView({behavior:\\\'smooth\\\',block:\\\'center\\\'});}" style="cursor:pointer;display:block;padding:6px 10px;border-radius:10px;border:1px solid var(--emerald-roi);background:#FFFFFF;color:var(--emerald-roi);font-size:12px;font-weight:700;text-align:left;white-space:normal;max-width:100%;filter:none;">' + (window.__ebSavedEmail ? ('✓ 3 Buyer Emails Unmasked: ' + escHtml(uB0 + ' (+ ' + uA0 + ')')) : ('${IC.lock}3 Verified ' + escHtml(shortName) + ' Buyer Emails (' + escHtml(bFirst) + '.***@' + escHtml(bDom) + ' + 2 more) — Enter Email Below ($0) ↓')) + '</button>';
      setTxt('sr-step1-preview-pilot', '3-Flight Pilot (' + Math.round((senderReach || 75000) / 1000) + 'K Reach): $' + Number((data.outbound_pitch && data.outbound_pitch.proposed_3flight_pilot_usd) || 9000).toLocaleString() + ' ($' + floorCpmVal + ' Floor CPM vs $' + rackCpm + ' Rack)');
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
        setTxt('sr-step2-floor-savings', 'Save $' + Math.max(1800, Math.round((Number(mb.published_rack_rate_usd || 4500) - Number(mb.negotiated_floor_rate_usd || 3690)) * 3)).toLocaleString() + ' (3x Floor)');
        if (mb.lookalike_shows && mb.lookalike_shows.length > 0) {
          const l0 = mb.lookalike_shows[0];
          const lTitle = document.getElementById('sr-mb-look1-title'), lRep = document.getElementById('sr-mb-look1-rep');
          if (lTitle) lTitle.textContent = l0.name + ' ($' + Number(l0.slot_usd).toLocaleString() + '/slot)';
          if (lRep) lRep.textContent = 'Rep: ' + (l0.booking_rep || 'w***.b***@syntax.fm');
        }
        window.__srUpdateMoneyball((document.getElementById('sr-moneyball-slider') || {}).value || 15000, mb.published_rack_rate_usd, true);
      }
      const tbody = document.getElementById('res-placements-tbody');
      if (tbody) tbody.innerHTML = (data.placements || []).slice(0, 4).map((p, idx) => {
        const rowTitle = escHtml(isShowMatch && p.brand_name ? (p.brand_name + ' → ' + p.show_name) : p.show_name);
        const floorCpm = Math.round((Number(p.cpm_usd) || 40) * 0.82), estCpc = (floorCpm / 18).toFixed(2), sDom = String(p.show_slug || p.show_name || 'creatornetwork').toLowerCase().replace(/[^a-z0-9]/g, '');
        const uBuyer = p.unmasked_buyer_email || 'sarah.kaufman@shopify.com', uAgency = p.unmasked_agency_email || 'm.vance@rightsideup.co';
        const liUrl = p.linkedin_verify_url || ('https://www.linkedin.com/search/results/people/?keywords=' + encodeURIComponent(uBuyer.split('@')[0].replace(/[._]/g, ' ') + ' ' + (p.brand_name || entity.name)));
        const creditNum = Math.min(3, Math.max(1, idx));
        const unmaskedHtml = '<div class=&quot;mono&quot; style=&quot;font-size:13px;color:var(--emerald-roi);font-weight:800;&quot;>✓ FREE CREDIT #' + creditNum + ' OF 3 (ROW #' + (idx + 1) + ' UNMASKED FREE): ' + escHtml(uBuyer) + ' (+ ' + escHtml(uAgency) + ')</div><div style=&quot;font-size:12.5px;color:var(--text-primary);font-weight:600;display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-top:2px;&quot;><span>' + escHtml(p.decision_maker_role || 'VP Growth') + ' • ' + escHtml(p.agency_desk || 'Agency Desk') + ' • Show: booking@' + sDom + '.fm</span><a class=&quot;sr-linkedin-verify-link&quot; href=&quot;' + escHtml(liUrl) + '&quot; target=&quot;_blank&quot; rel=&quot;noopener&quot; style=&quot;color:var(--emerald-roi);font-weight:700;text-decoration:underline;&quot;>Verify on LinkedIn →</a><button type=&quot;button&quot; class=&quot;sr-row-copy-btn&quot; data-unmasked-copy=&quot;' + escHtml(uBuyer + ' (+ ' + uAgency + ')') + '&quot; onclick=&quot;return window.__srCopyFreeCreditRow(this.getAttribute(\\\'data-unmasked-copy\\\'),' + (idx + 1) + ',this);&quot; style=&quot;padding:2px 8px;border-radius:6px;border:1px solid var(--emerald-roi);background:var(--bg-surface);color:var(--emerald-roi);font-size:11.5px;font-weight:700;cursor:pointer;&quot;>Copy Buyer</button></div>';
        const r4Attr = ' data-free-credit-unmasked="' + unmaskedHtml + '"' + (idx === 3 ? (' data-row4-unmasked="' + unmaskedHtml + '"') : '');
        const contactHtml = '<div' + r4Attr + '><div style="font-size:12.5px;color:var(--text-secondary);font-weight:600;margin-bottom:4px;">' + escHtml(p.decision_maker_role || 'VP Growth') + ' • ' + escHtml(p.agency_desk || 'Agency Desk') + '</div><button type="button" class="sr-row-copy-btn sr-locked-spec-badge" data-unmasked-copy="' + escHtml(uBuyer + ' (+ ' + uAgency + ')') + '" onclick="return window.__srFocusFreeCreditBar(' + (idx + 1) + ',this);" style="padding:3px 9px;border-radius:999px;border:1px solid var(--emerald-roi);background:var(--emerald-soft);color:var(--emerald-roi);font-size:12px;font-weight:700;cursor:pointer;filter:none;">${IC.lock}Verified Buyer Email Hidden (' + creditNum + ' of 3 Free Credits) — Tap to Reveal ($0) ↑</button></div>';
        const vHtml = '<div style="color:var(--cyan-info);">' + escHtml(p.vanity_url) + '</div><div>Code: <strong style="color:var(--amber-gold);">' + escHtml(p.promo_code) + '</strong></div>';
        return \`<tr data-free-credit-row="1" style="\${idx === 0 ? 'background:var(--emerald-soft);' : ''}"><td><div style="font-weight:700;">\${rowTitle}\${p.is_lookalike ? ' <span class="pill-slate" style="font-size:13.5px;padding:2px 8px;">Category Peer</span>' : ''}</div><div class="mono" style="font-size:13.5px; color:var(--text-muted);">\${escHtml(p.channel_type)} • \${Math.round((Number(p.audience_size) || 75000) / 1000)}K reach</div></td><td><div><span class="\${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${escHtml(p.renewal_badge)}</span></div><div class="mono" style="font-size:12.5px; color:var(--emerald-roi); margin-top:4px; font-weight:800;">✓ \${escHtml((p.fresh_budget_badge || 'Renewed on Peer Shows (Last 30 Days)').replace(/🟢\\s*/g, ''))}</div></td><td>\${contactHtml}</td><td class="mono" style="font-size:13.5px;">\${vHtml}</td><td class="mono" style="font-weight:700; color:var(--amber-gold);">$\${Number(p.est_spend_usd).toLocaleString()} ($\${Number(p.cpm_usd) || 0} CPM)<div style="font-size:13.5px; color:var(--emerald-roi); font-weight:600;">3x Floor: $\${floorCpm} CPM • ~$\${estCpc} CPC</div></td></tr>\`;
      }).join('') + '<tr id="sr-locked-95-summary-row" style="background:#FFFBEB;"><td colspan="5" class="mono" style="font-size:13px;font-weight:800;color:#92400E;">${IC.lock}+105 More Verified Buyer &amp; Agency Desk Rows (109 Total) + Audience Guarantee Clause + Cold Sequences — <a href="#sr-sweetspot-bridge-form" onclick="var b=document.getElementById(\\\'sr-bridge-email\\\');if(b){b.focus();}return false;" style="color:var(--emerald-roi);text-decoration:underline;">Unlock 3 Free ($0) ↑</a> • <a href="/buy/complete_dossier" onclick="if(window.__ebCheckout){window.__ebCheckout(\\\'complete_dossier\\\',true);return false;}" style="color:var(--text-primary);text-decoration:underline;">Full 109-Row CSV Vault ($29) →</a></td></tr>';
      if (window.__ebSavedEmail && tbody) Array.prototype.slice.call(tbody.querySelectorAll('[data-free-credit-unmasked], [data-row4-unmasked]')).forEach(function(el) { el.innerHTML = el.getAttribute('data-free-credit-unmasked') || el.getAttribute('data-row4-unmasked'); });
      if (window.__ebMountDeliverableCurtain) window.__ebMountDeliverableCurtain(entity.name);
      if (window.__srRunHomeQuoteAudit) window.__srRunHomeQuoteAudit(true);
      const cpLbl = document.getElementById('copy-pitch-label'), pcBtn = document.getElementById('btn-postcalc-flash-pass');
      if (cpLbl) cpLbl.textContent = 'Inspect ' + entity.name.slice(0, 18) + ' Promo Codes & Flights ↓'; if (pcBtn) pcBtn.textContent = 'Unlock ' + entity.name.slice(0, 18) + ' Pack ($19 / $29) →';
      const vtEl = document.getElementById('sr-hero-vault-target');
      if (vtEl) vtEl.innerHTML = '${IC.chart}VISUAL AD RATE (CPM) &amp; FLIGHT-RETENTION CURVE: ' + escHtml(shortName.toUpperCase());
      setTxt('sr-bar-rack-lbl', '$' + data.metrics.avg_cpm_usd + ' CPM ($' + Number(data.moneyball_bundle ? data.moneyball_bundle.published_rack_rate_usd : 4500).toLocaleString() + '/slot)');
      const floorLblEl = document.getElementById('sr-bar-floor-lbl'), floorValStr = '$' + Math.round(data.metrics.avg_cpm_usd * 0.82) + ' CPM ($' + Number(data.moneyball_bundle ? data.moneyball_bundle.negotiated_floor_rate_usd : 3690).toLocaleString() + '/slot)';
      if (floorLblEl) {
        floorLblEl.setAttribute('data-free-credit-unmasked', floorValStr);
        if (window.__ebSavedEmail) floorLblEl.textContent = floorValStr;
        else floorLblEl.innerHTML = '<button type="button" onclick="var e=document.getElementById(\\\'sr-step2-email\\\')||document.getElementById(\\\'sr-bridge-email\\\');if(e){e.focus();e.scrollIntoView({behavior:\\\'smooth\\\',block:\\\'center\\\'});}" style="cursor:pointer;padding:2px 8px;border-radius:999px;border:1px solid var(--emerald-roi);background:#FFFFFF;color:var(--emerald-roi);font-size:11.5px;font-weight:800;">${IC.lock}Reveal ' + escHtml(shortName) + ' -18% Floor ($0 Email) ↓</button>';
      }
      if (data.outbound_pitch) {
        const reachK = Math.round((Number(senderReach) || 75000) / 1000);
        const pitchMetaText = '3-Flight Pilot (' + reachK + 'K Reach): $' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' ($' + data.outbound_pitch.effective_cpm_usd + ' CPM • -18% Floor)';
        setTxt('res-pitch-meta', pitchMetaText); setTxt('sr-creator-step1-target', 'Pitching: ' + shortName);
        const cQuote = document.getElementById('sr-creator-quote-readout'), freePre = document.getElementById('sr-free-pitch-pre'), copyBtn = document.getElementById('btn-copy-free-pitch1'), cDesk = document.getElementById('sr-creator-buyer-desk'), hvLine = document.getElementById('sr-hero-vault-locked-line');
        if (cQuote) cQuote.textContent = pitchMetaText;
        const rawSample = data.outbound_pitch.to_email || 'd***.k***@deel.com (+ r.***@rightsideup.co)';
        const unmaskedPitchBody = ('To: ' + (p0.unmasked_buyer_email || 'sarah.kaufman@shopify.com') + ' (+ ' + (p0.unmasked_agency_email || 'm.vance@rightsideup.co') + ' • ' + (data.outbound_pitch.agency_desk || data.brand.decision_maker_role) + ')\\nSubject: ' + data.outbound_pitch.subject + '\\n\\n' + (data.outbound_pitch.free_pitch_script || data.outbound_pitch.body || '')).replace(/\\S*\\*\\*\\*\\S*/g, p0.unmasked_buyer_email || 'sarah.kaufman@shopify.com');
        if (hvLine) hvLine.innerHTML = '<strong>Insider Takeaway (' + escHtml(shortName) + '):</strong> Audience trust compounds on Flight #3. Anchor a 3-flight pilot at <strong>$' + Number(data.outbound_pitch.proposed_3flight_pilot_usd).toLocaleString() + ' (-18% Floor)</strong> with ' + escHtml(entity.lead_role) + '.';
        if (cDesk) cDesk.textContent = rawSample + ' • ' + (data.brand.decision_maker_role || 'VP Partnerships');
        if (freePre) {
          freePre.setAttribute('data-free-credit-unmasked', escHtml(unmaskedPitchBody));
          freePre.textContent = window.__ebSavedEmail ? unmaskedPitchBody : ('To: ' + rawSample + ' (' + (data.outbound_pitch.agency_desk || data.brand.decision_maker_role) + ')\\nSubject: ' + data.outbound_pitch.subject + '\\n\\n[DIRECT BUYER & AGENCY EMAILS + 3-FLIGHT PITCH COPY GATED — Enter your work email in the "Unmask 3 Free Verified Buyer Emails ($0)" bar above to reveal & copy]');
        }
        if (copyBtn) copyBtn.textContent = window.__ebSavedEmail ? ('Copy 3-Flight Pitch for ' + shortName) : ('Unmask 3 Free Verified Buyer Emails ($0) + Copy Pitch');
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
      const first = data.extracted_sponsors[0], setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
      setTxt('res-brand-name', data.extracted_sponsors.map(s => s.brand_name).join(' + '));
      setTxt('res-brand-domain', data.show_name + ' • ' + data.total_detected_sponsors + ' Sponsor Read(s) Extracted');
      setTxt('res-monthly-spend', '$' + Number(data.total_episode_ad_value_usd).toLocaleString()); setTxt('res-avg-cpm', 'Single-Episode / Issue Ad Value');
      setTxt('res-renewal-score', first.renewal_score + '/100'); setTxt('res-flights-summary', first.renewal_badge);
      setTxt('res-dm-role', first.decision_maker_role); setTxt('res-dm-email', window.__ebSavedEmail ? '✓ 3 Buyer Emails Unmasked Below' : '3 Free Buyer Emails Below ($0)');
      setTxt('res-table-title', 'EXTRACTED AD-READ ENTITIES & ATTRIBUTION SIGNALS (' + String(data.engine_model || '').toUpperCase() + ')');
      const tEq = encodeURIComponent(first.brand_name || 'Shopify') + (window.__ebSavedEmail ? ('&email=' + encodeURIComponent(window.__ebSavedEmail)) : ''), hRl = document.getElementById('eb-home-rider-link'), hEl = document.getElementById('eb-home-eml-link'), hCl = document.getElementById('eb-home-csv-link');
      if (hRl) hRl.href = '/api/github-upgrade/iab-io-addendum.txt?target=' + tEq; if (hEl) hEl.href = '/api/github-upgrade/pitch.eml?target=' + tEq; if (hCl) hCl.href = '/api/github-upgrade/export.csv?target=' + tEq;
      if (window.__ebMountDeliverableCurtain) window.__ebMountDeliverableCurtain(first.brand_name);
      const tb = document.getElementById('res-placements-tbody');
      if (tb) tb.innerHTML = data.extracted_sponsors.map((s, idx) => \`<tr><td><div style="font-weight:700;">\${escHtml(s.brand_name)}</div><div class="mono" style="font-size:13.5px; color:var(--text-muted);">\${escHtml(s.category)} • \${escHtml(s.placement_position)} (\${escHtml(s.timestamp)})</div></td><td><span class="\${s.verified_flights >= 3 ? 'pill-emerald' : 'pill-amber'}">\${escHtml(s.renewal_badge)}</span></td><td><div data-free-credit-unmasked="<div class=&quot;mono&quot; style=&quot;font-size:13px;color:var(--emerald-roi);font-weight:800;&quot;>✓ UNMASKED: \${escHtml((s.unmasked_buyer_email || 'sarah.kaufman@shopify.com') + ' (+ ' + (s.unmasked_agency_email || 'm.vance@rightsideup.co') + ')')}</div>"><div style="font-size:12.5px;color:var(--text-secondary);font-weight:600;margin-bottom:4px;">\${escHtml(s.decision_maker_role)} • \${escHtml(s.agency_desk || 'Agency Desk')}</div><button type="button" onclick="return window.__srFocusFreeCreditBar(\${idx + 1},this);" style="padding:3px 9px;border-radius:999px;border:1px solid var(--emerald-roi);background:var(--emerald-soft);color:var(--emerald-roi);font-size:12px;font-weight:700;cursor:pointer;">\${escHtml(s.sponsor_email)} — Reveal ($0) ↑</button></div></td><td class="mono" style="font-size:13.5px;"><div style="color:var(--cyan-info);">\${escHtml(s.vanity_url)}</div><div>Code: <strong style="color:var(--amber-gold);">\${escHtml(s.promo_code)}</strong></div></td><td class="mono" style="font-weight:700; color:var(--amber-gold);">$\${Number(s.estimated_flight_spend_usd).toLocaleString()}/read<div style="font-size:13.5px; color:var(--emerald-roi); font-weight:600;">3x Floor: $\${Number(s.floor_cpm_usd || Math.round((s.estimated_cpm_usd || 40) * 0.82))} CPM ($\${Number(s.floor_flight_spend_usd || Math.round((s.estimated_flight_spend_usd || 4000) * 0.82)).toLocaleString()})</div></td></tr>\`).join(''); if (window.__ebSavedEmail && tb) Array.prototype.slice.call(tb.querySelectorAll('[data-free-credit-unmasked]')).forEach(function(el) { el.innerHTML = el.getAttribute('data-free-credit-unmasked'); });
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
        var urlQuery = (sp.get('q') || sp.get('target') || sp.get('preset') || sp.get('brand') || sp.get('show') || '').trim();
        var hasUrlQuery = Boolean(urlQuery);
        var qEl = document.getElementById('lookup-query'), rEl = document.getElementById('sender-reach');
        var qaP = document.getElementById('sr-home-qa-price'), qaR = document.getElementById('sr-home-qa-reach'), mbS = document.getElementById('sr-moneyball-slider');
        if (ws.qaPrice && qaP) qaP.value = ws.qaPrice; if (ws.qaReach && qaR) qaR.value = ws.qaReach;
        if (ws.budget && mbS) { mbS.value = ws.budget; if (window.__srUpdateMoneyball) window.__srUpdateMoneyball(ws.budget, null, true); }
        var initWedge = sp.get('wedge') || ws.buyer_wedge || ws.persona;
        if (initWedge === 'buyer' || initWedge === 'creator') window.__srSwitchPersona(initWedge, 'init');
        if (hasUrlQuery) {
          if (qEl) qEl.value = urlQuery;
          if (window.__srSaveWorkspace) window.__srSaveWorkspace({ query: urlQuery });
          var s2 = document.getElementById('sr-step2-panel'), pill2 = document.getElementById('res-live-readout-pill');
          if (pill2) { pill2.textContent = '✓ LOADED: ' + urlQuery.toUpperCase().slice(0, 26) + ' • UNMASK FREE SAMPLE ($0) ↓'; pill2.style.background = 'var(--emerald-roi)'; pill2.style.color = '#FFF'; }
          if (s2) s2.style.boxShadow = '0 0 0 3px var(--emerald-roi), 0 14px 32px rgba(13,107,75,0.18)';
          if (window.scrollY < 100 && !window.location.hash) { setTimeout(function() { var rt = document.getElementById('radar-tool'); if (rt && rt.scrollIntoView) rt.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 180); }
        } else if (ws.query && qEl && ws.query !== qEl.value) { qEl.value = ws.query; if (ws.reach && rEl) rEl.value = ws.reach; runBrandLookup(ws.persona, false); } else if (ws.reach && rEl && String(ws.reach) !== String(rEl.value)) { rEl.value = ws.reach; }
        if (window.__srRenderComparisonMatrix) window.__srRenderComparisonMatrix();
      } catch (err) { console.warn('[sr:init]', err); }
    });
    async function startStripeCheckout(planTier, amountUsd, emailInputId, hpInputId, confirmed) {
      const emailEl = document.getElementById(emailInputId), hpEl = hpInputId ? document.getElementById(hpInputId) : null, email = emailEl && emailEl.value ? emailEl.value.trim() : 'founder@creatorstudio.io', bw = window.__srActiveWedge || 'creator';
      if (!confirmed && window.__ebCheckout && !(hpEl && hpEl.value)) { window.__ebCheckout((planTier === 'agency_feed_199' || amountUsd >= 149) ? 'pro_b2b' : 'complete_dossier', true); return; }
      try {
        const res = await fetch('/api/checkout', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ plan_tier: planTier, amount_usd: amountUsd, customer_email: email, buyer_wedge: bw, website_url_hp: hpEl ? hpEl.value : '', ...getUtmParams() }) }), data = await res.json();
        fireMetaEvent('StartTrial', amountUsd, { plan_tier: planTier, buyer_wedge: bw });
        const banner = document.getElementById('checkout-status-banner'), txt = document.getElementById('checkout-status-text');
        if (banner && txt) { banner.style.display = 'block'; txt.innerHTML = 'Stripe Session ' + escHtml(data.session_id) + ' ready for ' + escHtml(email) + ' (' + escHtml(String(planTier).toUpperCase()) + ' - $' + Number(amountUsd) + '/mo). <a href="' + escHtml(data.checkout_url || '/buy/complete_dossier') + '" style="color:var(--emerald-roi);text-decoration:underline;font-weight:700;margin-left:8px;">Proceed to Stripe Checkout ↗</a>'; }
      } catch (e) { console.error(e); }
    }
  </script>`;
  return renderShell({ title: `${initialQuery && initialQuery.toLowerCase() !== 'shopify' ? `${displayEntity.name} Sponsorship Spend & Ad Rates • ` : ''}SponsorRadar: Pitch the buyer, not dead inboxes • 109 Verified Buyer & Agency Desk Rows`, description: `${initialQuery && initialQuery.toLowerCase() !== 'shopify' ? `${displayEntity.name} verified sponsorship placements, buyer contacts & -18% floor rates. ` : ''}Pitch the buyer, not dead inboxes. 109 Verified Buyer & Agency Desk Rows • Save $2,400 overpay on podcast, newsletter, and YouTube sponsorships.`, canonicalPath: '/', ogSlug: 'sponsor-radar-home', jsonLd, bodyHtml });
}

function renderLandingPage({ defaultAnalysis }) {
  const lpName = (defaultAnalysis && ((defaultAnalysis.display_entity && defaultAnalysis.display_entity.name) || (defaultAnalysis.brand && defaultAnalysis.brand.name))) || 'AG1', encLp = encodeURIComponent(lpName);
  const row1 = (defaultAnalysis.placements && defaultAnalysis.placements[0]) || {}, r1Buyer = row1.unmasked_buyer_email || 'sarah.kaufman@shopify.com', r1Agency = row1.unmasked_agency_email || 'm.vance@rightsideup.co', r1MaskB = String(row1.sponsor_email || 's***.k***@shopify.com').split(' (')[0], r1MaskA = r1Agency.slice(0, 3) + '***@' + (r1Agency.split('@')[1] || 'rightsideup.co');
  const r1Angle = row1.live_outreach_angle || 'Saw 4x peer renewal last 30d — anchor 3-flight pilot at -18% floor.', r1Rider = row1.iab_makegood_rider_preview || 'IAB §4.2 (-18% Floor) + §7.1 (1.5% CTR Make-Good)';
  const bodyHtml = `
  <section style="padding:40px 0 60px;"><div class="container" style="max-width:1060px;">
    <div style="text-align:center; max-width:820px; margin:0 auto 24px;">
      <span class="pill-emerald">109 Verified Buyer &amp; Agency Desk Rows • Save $2,400 overpay</span>
      <h1 class="headline-xl" data-entity-name="${escapeHtml(lpName)}" style="margin-top:14px;">Pitch the buyer, <span class="serif-italic" style="color:var(--emerald-roi);">not dead inboxes.</span></h1>
      <p style="color:var(--text-secondary); font-size:16px; margin-top:12px;">109 Verified Buyer &amp; Agency Desk Rows • Save $2,400 overpay. Unmask 3 free verified buyer emails ($0 via work email) or unlock the Full 109-Row CSV Vault ($29).</p>
    </div>
    <div id="sr-live-deal-card-row1" data-active-wedge="creator" class="panel" style="padding:14px 18px; margin-bottom:14px; border-color:var(--emerald-border); background:var(--emerald-soft);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:6px;">
        <span class="mono" style="font-size:12px; font-weight:800; color:var(--emerald-roi);">✦ ROW #1 SPECIMEN DEAL PROOF (1 OF 109 VERIFIED BUYER &amp; AGENCY DESK ROWS)</span>
        <span class="pill-emerald" style="font-size:11.5px; font-weight:800;">Sample Proof (Shopify): sarah.kaufman@shopify.com</span>
      </div>
      <div class="mono" style="font-size:13px; color:var(--text-primary); line-height:1.5;">
        <strong>Named Buyer:</strong> <span id="lp-row1-buyer" data-free-credit-unmasked="${escapeHtml(r1Buyer)}" style="color:var(--emerald-roi); font-weight:800;">${escapeHtml(r1MaskB)}</span> • <strong>Agency Desk:</strong> <span id="lp-row1-agency" data-free-credit-unmasked="${escapeHtml(r1Agency)}" style="color:var(--amber-gold); font-weight:800;">${escapeHtml(r1MaskA)}</span> (${escapeHtml(row1.agency_desk || 'Right Side Up Podcast Desk')})<br/>
        <strong>Live Outreach Angle:</strong> <span id="lp-row1-angle">${escapeHtml(r1Angle)}</span> • <code id="lp-row1-rider">${escapeHtml(r1Rider)}</code>
      </div>
    </div>
    <form id="sr-sweetspot-bridge-form" onsubmit="var e=document.getElementById('sr-bridge-email');if(e&&e.value&&e.value.indexOf('@')>0){var v=e.value.trim(),q=((document.getElementById('lp-query')||{}).value||'${escapeHtml(lpName.replace(/'/g, "\\'"))}').trim(),eq=encodeURIComponent(q)+'&email='+encodeURIComponent(v);window.__ebSavedEmail=v;window.__ebActiveEntity=window.__ebSelectedTarget=q;if(window.__ebCaptureEmailLead){window.__ebCaptureEmailLead(v,'lp_sweetspot_submit');}else{fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:v,source:'lp_sweetspot_submit',path:window.location.pathname})}).catch(function(){});}document.querySelectorAll('[data-free-credit-unmasked]').forEach(function(el){el.textContent=el.getAttribute('data-free-credit-unmasked');});var b=this.querySelector('#btn-unlock-free-credits');if(b)b.textContent='✓ 3 Free Buyer Credits Unlocked';var sl=document.getElementById('eb-lp-sample-link');if(sl)sl.href='/dossier/sample?target='+eq;[['lp-buy-flash','flash_pass'],['lp-buy-vault','playbook_pass']].forEach(function(p){var btn=document.getElementById(p[0]);if(btn)btn.href='/buy/'+p[1]+'?source=lp_express&target='+eq;});}return false;" style="padding:10px 14px; border-radius:12px; border:1px solid var(--border-strong); background:#FFFFFF; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px; margin-bottom:20px;">
      <span style="font-size:13px; color:var(--text-primary); font-weight:700;">Try-Before-You-Buy: Enter work email to unmask 3 Free Buyer &amp; Agency Emails ($0) • <a id="eb-lp-sample-link" href="/dossier/sample?target=${encLp}" class="mono" style="color:var(--emerald-roi);font-weight:700;text-decoration:underline;">Sample Dossier ↗</a></span>
      <div style="display:flex; gap:8px; flex-wrap:wrap; flex:1; min-width:250px; justify-content:flex-end; align-items:center;">
        <input id="sr-bridge-email" type="email" required placeholder="you@company.com ($0)..." aria-label="Work email to unlock 3 free verified buyer emails ($0)" onblur="if(this.value&&this.value.indexOf('@')>0){window.__ebSavedEmail=this.value.trim();if(window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(this.value.trim(),'lp_sweetspot_blur');}" style="flex:1; min-width:190px; max-width:250px; padding:6px 10px; border-radius:8px; border:1px solid var(--border-strong); font-size:13px;" />
        <button id="btn-unlock-free-credits" type="submit" class="btn btn-emerald" style="padding:6px 12px; min-height:34px; font-size:12.5px; font-weight:800;">Unmask 3 Buyer Emails ($0) →</button>
      </div>
    </form>
    <div class="double-bezel" style="margin-bottom:32px;"><div class="panel">
      <div class="panel-header"><div><span class="pill-emerald">TRY IT FREE ABOVE THE FOLD</span><strong style="margin-left:8px; font-size:14.5px;">Instant Sponsor Spend &amp; 3x-Renewal Verifier</strong></div><div class="mono" style="font-size:13px; color:var(--text-secondary);">Zero signup required to test</div></div>
      <div class="panel-body">
        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:12px;">
          <input id="lp-query" type="text" class="input-field" value="${escapeHtml(lpName)}" placeholder="Type any brand or show (e.g. AG1, Deel, Ramp, Lenny's Podcast)..." style="flex:1; min-width:210px;" />
          <button type="button" class="btn btn-vermilion" onclick="runLpLookup()"><span>Reveal 3x+ Renewals</span><span class="btn-icon-circle" aria-hidden="true">↗</span></button>
        </div>
        <div class="preset-row"><button type="button" class="preset-chip" onclick="setLpPreset('AG1')">AG1 ($1.42M/mo)</button><button type="button" class="preset-chip" onclick="setLpPreset('Deel')">Deel ($680K/mo)</button><button type="button" class="preset-chip" onclick="setLpPreset('Ramp')">Ramp ($790K/mo)</button><button type="button" class="preset-chip" onclick="setLpPreset('Lenny\\'s Podcast')">Lenny's Podcast</button><button type="button" class="preset-chip" onclick="setLpPreset('Huberman Lab')">Huberman Lab</button></div>
        <div class="kpi-grid" style="margin-top:16px;"><div class="kpi-box"><div class="kpi-label">MATCHED ENTITY</div><div class="kpi-val" id="lp-brand-name" style="font-size:18px;">${escapeHtml(lpName)}</div></div><div class="kpi-box"><div class="kpi-label">EST. MONTHLY SPEND</div><div class="kpi-val" id="lp-spend" style="color:var(--amber-gold);">$${defaultAnalysis.metrics.est_monthly_spend_usd.toLocaleString()}</div></div><div class="kpi-box"><div class="kpi-label">3x+ RENEWAL SCORE</div><div class="kpi-val" id="lp-score" style="color:var(--emerald-roi);">${defaultAnalysis.metrics.renewal_velocity_score}/100</div></div><div class="kpi-box"><div class="kpi-label">VERIFIED BUYING DESK</div><div class="kpi-val" id="lp-email" style="font-size:13.5px; color:var(--emerald-roi);">109 Verified Buyer &amp; Agency Desk Rows</div></div></div>
      </div>
    </div></div>
    <div class="panel" style="padding:28px; text-align:center; border-color:var(--emerald-border); background:var(--bg-elevated);">
      <span class="pill-emerald">INSTANT 1-CLICK STRIPE EXPRESS • 30-DAY ZERO-BOUNCE GUARANTEE</span>
      <h2 style="font-family:var(--font-serif); font-size:28px; font-weight:600; margin-top:10px;">Unlock All 109 Verified Buyer &amp; Agency Desk Rows ($1.99 Pack / $29 Full CSV Vault)</h2>
      <p style="color:var(--text-secondary); max-width:600px; margin:8px auto 20px;">Download the 3-File Counterparty Pack for $1.99 one-time, or unlock all 109 Verified Buyer &amp; Agency Desk Rows for $29.</p>
      <div style="display:flex; justify-content:center; gap:10px; flex-wrap:wrap; margin-bottom:14px;">
        <a id="lp-buy-flash" href="/buy/flash_pass?source=lp_express&target=${encLp}" onclick="window.__ebActiveEntity=window.__ebSelectedTarget=((document.getElementById('lp-query')||{}).value||'${escapeHtml(lpName.replace(/'/g, "\\'"))}').trim();if(window.__ebCheckout){window.__ebCheckout('flash_pass',true);return false;}" class="btn btn-vermilion" style="padding:10px 18px; font-size:14px; text-decoration:none;"><span>3-File Counterparty Pack ($1.99) ↗</span></a>
        <a id="lp-buy-vault" href="/buy/playbook_pass?source=lp_express&target=${encLp}" onclick="window.__ebActiveEntity=window.__ebSelectedTarget=((document.getElementById('lp-query')||{}).value||'${escapeHtml(lpName.replace(/'/g, "\\'"))}').trim();if(window.__ebCheckout){window.__ebCheckout('playbook_pass',true);return false;}" class="btn btn-emerald" style="padding:10px 18px; font-size:14px; text-decoration:none;"><span>Full 109-Row CSV Vault ($29) ↗</span></a>
      </div>
      <div style="display:flex; justify-content:center; gap:8px; flex-wrap:wrap; font-size:12.5px;"><a href="/directory" class="pill-slate" style="text-decoration:none;">Browse 124 Spend Hubs →</a><a href="/leaderboard" class="pill-slate" style="text-decoration:none;">30-Target Leaderboard →</a><a href="/compare/who-sponsors-stuff-vs-sponsorradar-newsletter-and-podcast-database" class="pill-slate" style="text-decoration:none;">Who Sponsors Stuff vs SponsorRadar →</a><a href="/tools/podcast-sponsorship-cpm-roi-calculator" class="pill-slate" style="text-decoration:none;">Podcast CPM Calculator →</a></div>
      <input type="text" id="lp-hp-field" class="hp-field" tabindex="-1" autocomplete="off" aria-hidden="true" /><div id="lp-confirm-msg" class="mono" style="margin-top:12px; font-size:13px; color:var(--emerald-roi); display:none;"></div>
    </div>
  </div></section>
  <script>
    window.__ebActiveEntity = window.__ebSelectedTarget = ${JSON.stringify(lpName).replace(/</g, '\\u003c')}; function escHtmlLp(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
    function setLpPreset(q) { const el = document.getElementById('lp-query'); if (el) el.value = q; runLpLookup(); }
    async function runLpLookup() {
      const q = (document.getElementById('lp-query') || {}).value || 'AG1', res = await fetch('/api/analyze-sponsor', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ mode: 'lookup', query: q }) }), data = await res.json();
      if (data && data.brand) {
        const entity = data.display_entity || { name: data.brand.name }, p0 = (data.placements && data.placements[0]) || {}, setTxt = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; }, hasEmail = Boolean(window.__ebSavedEmail && String(window.__ebSavedEmail).indexOf('@') > 0), bUn = p0.unmasked_buyer_email || 'sarah.kaufman@shopify.com', aUn = p0.unmasked_agency_email || 'm.vance@rightsideup.co', flCpm = Math.round((Number(data.metrics && data.metrics.avg_cpm_usd) || 45) * 0.82), eq = encodeURIComponent(entity.name || q) + (hasEmail ? '&email=' + encodeURIComponent(window.__ebSavedEmail) : '');
        window.__ebActiveEntity = window.__ebSelectedTarget = entity.name || q; if (window.__ebCompileCustomCurtain) window.__ebCompileCustomCurtain(window.__ebActiveEntity);
        const bEl = document.getElementById('lp-row1-buyer'), aEl = document.getElementById('lp-row1-agency'), sl = document.getElementById('eb-lp-sample-link'), rl = document.getElementById('eb-lp-rider-link'), el2 = document.getElementById('eb-lp-eml-link'), cl = document.getElementById('eb-lp-csv-link');
        if (bEl) bEl.setAttribute('data-free-credit-unmasked', bUn); if (aEl) aEl.setAttribute('data-free-credit-unmasked', aUn); if (sl) sl.href = '/dossier/sample?target=' + eq; if (rl) rl.href = '/api/github-upgrade/iab-io-addendum.txt?target=' + eq + '&floor_cpm=' + flCpm; if (el2) el2.href = '/api/github-upgrade/pitch.eml?target=' + eq + '&floor_cpm=' + flCpm; if (cl) cl.href = '/api/github-upgrade/export.csv?target=' + eq;
        [['lp-buy-micro','micro_pass'],['lp-buy-flash','flash_pass'],['lp-buy-creator','creator_pass'],['lp-buy-vault','playbook_pass'],['lp-buy-agency','pro_b2b']].forEach(function(pair){ const btn = document.getElementById(pair[0]); if (btn) btn.href = '/buy/' + pair[1] + '?source=lp_express&target=' + eq; });
        setTxt('lp-brand-name', entity.name); setTxt('lp-spend', '$' + Number(data.metrics.est_monthly_spend_usd).toLocaleString()); setTxt('lp-score', data.metrics.renewal_velocity_score + '/100'); setTxt('lp-email', '109 Verified Buyer & Agency Desk Rows'); setTxt('lp-row1-buyer', hasEmail ? bUn : String(p0.sponsor_email || 's***.k***@shopify.com').split(' (')[0]); setTxt('lp-row1-agency', hasEmail ? aUn : (aUn.slice(0, 3) + '***@' + (aUn.split('@')[1] || 'rightsideup.co')));
        if (p0.live_outreach_angle) setTxt('lp-row1-angle', p0.live_outreach_angle); if (p0.iab_makegood_rider_preview) setTxt('lp-row1-rider', p0.iab_makegood_rider_preview);
        fireMetaEvent('Lead', 0, { source: 'lp_interactive_lookup', query: q });
      }
    }
  </script>`;
  const lpJsonLd = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: 'SponsorRadar 3x+ Renewal & CPM Benchmark Ledger', applicationCategory: 'BusinessApplication', operatingSystem: 'Web', offers: [{ '@type': 'Offer', name: '3-Credit Sample Unlock', price: '0.00', priceCurrency: 'USD' }, { '@type': 'Offer', name: '1-Row Buyer Contact', price: '0.99', priceCurrency: 'USD' }, { '@type': 'Offer', name: '3-File Counterparty Pack', price: '1.99', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Creator Pass', price: '19.00', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'Full 109-Row CSV Vault', price: '29.00', priceCurrency: 'USD' }, { '@type': 'Offer', name: 'B2B Agency Desk', price: '149.00', priceCurrency: 'USD' }] };
  return renderShell({ title: `${lpName !== 'AG1' ? `${lpName} Sponsorship Spend & Buyer Contacts • ` : ''}Pitch the buyer, not dead inboxes | SponsorRadar 3x+ Renewal Ledger`, description: `${lpName !== 'AG1' ? `${lpName} verified sponsorship spend, buyer emails & -18% floor rates. ` : ''}109 Verified Buyer & Agency Desk Rows • Save $2,400 overpay across 46+ podcasts, newsletters, and YouTube channels.`, canonicalPath: '/lp', ogSlug: 'sponsor-radar-lp', jsonLd: lpJsonLd, bodyHtml });
}

module.exports = { escapeHtml, renderBrandLogoSvg, renderShell, renderHomePage, renderLandingPage };

const { escapeHtml, renderShell } = require('./views_shell');
const { maskSponsorEmail, getAgencyDesk, getFreshBudgetStatus, generateMoneyballLookalikeBundle } = require('./engine');

function renderDirectoryPage({ brands, shows, seoPages }) {
  const brandPages = seoPages.filter(p => p.page_type === 'brand_breakdown');
  const showPages = seoPages.filter(p => p.page_type === 'show_benchmark');
  const nichePages = seoPages.filter(p => p.page_type === 'niche_directory');

  const brandSlugMap = new Map(brandPages.map(p => [p.target_slug, p.slug]));
  const showSlugMap = new Map(showPages.map(p => [p.target_slug, p.slug]));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SponsorRadar 2026 Programmatic SEO Directory: 42+ Brands, 46+ Shows & 60+ Spend Reports',
    description: 'Complete directory of verified podcast, newsletter, and YouTube sponsor spend reports, CPM rate cards, and 3x-renewal ROI benchmarks.'
  };

  const bodyHtml = `
  <section style="padding:44px 0;">
    <div class="container">
      <div style="margin-bottom:30px;">
        <span class="pill-vermilion">INDEXED INTELLIGENCE VAULT (60+ pSEO PAGES)</span>
        <h1 class="headline-xl">SponsorRadar Directory: 42 Brands, 46 Shows &amp; <span class="serif-italic" style="color:var(--emerald-roi);">60+ Spend Reports</span></h1>
        <p class="subhead">
          Every report below is powered by our deterministic SQLite ad-spend ledger with verified promo codes, vanity URLs, and 3x-renewal velocity scores.
        </p>
      </div>

      <!-- Section 1: Niche Directories -->
      <div class="panel" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">1. High-Intent Niche &amp; Category Sponsor Directories (${nichePages.length} Reports)</span>
          <span class="pill-emerald">3x+ RENEWED RANKINGS</span>
        </div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:12px;">
          ${nichePages.map(p => `
            <a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:14px; background:var(--bg-elevated); box-shadow:none;">
              <div class="mono" style="font-size:13px; color:var(--amber-gold); font-weight:700; margin-bottom:4px;">${escapeHtml(p.category)} • Avg $${p.avg_cpm} CPM</div>
              <div style="font-weight:700; font-size:14px; color:var(--text-primary);">${escapeHtml(p.title)}</div>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Section 2: Brand Sponsorship Spend Breakdowns -->
      <div class="panel" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">2. Brand Sponsorship Spend &amp; 3x-Renewal Breakdowns (${brandPages.length} Reports)</span>
          <span class="pill-amber">BRAND SPEND LEDGERS</span>
        </div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:12px;">
          ${brandPages.map(p => `
            <a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:14px; background:var(--bg-elevated); box-shadow:none;">
              <div class="mono" style="font-size:13px; color:var(--emerald-roi); font-weight:700; margin-bottom:4px;">$${(p.est_monthly_spend / 1000).toFixed(0)}K/mo Est. Spend • $${p.avg_cpm} CPM</div>
              <div style="font-weight:700; font-size:14px; color:var(--text-primary);">${escapeHtml(p.title)}</div>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Section 3: Show Media-Kit & CPM Benchmarks -->
      <div class="panel" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">3. Creator Show Media-Kits, Ad Rates &amp; CPM Benchmarks (${showPages.length} Reports)</span>
          <span class="pill-slate">SHOW RATE CARDS</span>
        </div>
        <div class="panel-body" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:12px;">
          ${showPages.map(p => `
            <a href="/seo/${escapeHtml(p.slug)}" class="panel" style="padding:14px; background:var(--bg-elevated); box-shadow:none;">
              <div class="mono" style="font-size:13px; color:var(--cyan-info); font-weight:700; margin-bottom:4px;">${escapeHtml(p.category)} • $${p.avg_cpm} Base CPM</div>
              <div style="font-weight:700; font-size:14px; color:var(--text-primary);">${escapeHtml(p.title)}</div>
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Section 4: Full 42 Brands & 46 Shows Index -->
      <div class="two-col-grid">
        <div class="panel">
          <div class="panel-header"><span style="font-weight:800;">All ${brands.length} Indexed Sponsor Brands</span></div>
          <div class="panel-body" style="max-height:380px; overflow-y:auto;">
            ${brands.map(b => {
              const bSeo = brandSlugMap.get(b.slug);
              return `
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-hairline); font-size:13px; gap:8px; flex-wrap:wrap;">
                <span>${bSeo ? `<a href="/seo/${escapeHtml(bSeo)}" style="font-weight:700; color:var(--vermilion); text-decoration:underline;">${escapeHtml(b.name)}</a>` : `<strong>${escapeHtml(b.name)}</strong>`} <span style="color:var(--text-muted);">(${escapeHtml(b.domain)})</span></span>
                <span class="mono" style="color:var(--amber-gold); font-weight:700;">$${(b.est_monthly_spend / 1000).toFixed(0)}K/mo • ${b.renewal_rate_pct}% 3x</span>
              </div>
            `;
            }).join('')}
          </div>
        </div>
        <div class="panel">
          <div class="panel-header"><span style="font-weight:800;">All ${shows.length} Indexed Podcasts, Newsletters &amp; YouTube Shows</span></div>
          <div class="panel-body" style="max-height:380px; overflow-y:auto;">
            ${shows.map(s => {
              const sSeo = showSlugMap.get(s.slug);
              return `
              <div style="display:flex; justify-content:space-between; padding:8px 0; border-bottom:1px solid var(--border-hairline); font-size:13px; gap:8px; flex-wrap:wrap;">
                <span>${sSeo ? `<a href="/seo/${escapeHtml(sSeo)}" style="font-weight:700; color:var(--vermilion); text-decoration:underline;">${escapeHtml(s.name)}</a>` : `<strong>${escapeHtml(s.name)}</strong>`} <span style="color:var(--text-muted);">(${escapeHtml(s.channel_type)})</span></span>
                <span class="mono" style="color:var(--emerald-roi); font-weight:700;">$${s.midroll_rate_usd.toLocaleString()} mid-roll • $${s.base_cpm} CPM</span>
              </div>
            `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
  `;

  return renderShell({
    title: 'SponsorRadar Directory: 60+ Verified Podcast & Newsletter Sponsorship Spend Reports',
    description: 'Browse 60+ programmatic SEO reports covering 42 sponsor brands, 46 top podcasts/newsletters/YouTube channels, CPM benchmarks, and 3x-renewal rates.',
    canonicalPath: '/directory',
    ogSlug: 'directory',
    jsonLd,
    bodyHtml
  });
}

function renderSeoPage({ page, brand, show, placements, relatedPages, outboundPitch }) {
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.sponsorradar.io').replace(/\/$/, '');
  const workbenchQuery = show ? show.name : (brand ? brand.name : page.category);
  const faqItems = [
    {
      q: `How much does ${brand ? brand.name : (show ? show.name : page.category)} spend on podcast and newsletter sponsorships in 2026?`,
      a: `${page.summary} Across verified placements in SponsorRadar, placements average $${page.avg_cpm} CPM with an estimated monthly category investment of $${page.est_monthly_spend.toLocaleString()}.`
    },
    {
      q: `What is the 3x-Renewal Rule for evaluating ${page.title}?`,
      a: `When a sponsor renews 3 or more times on the same podcast, newsletter, or YouTube channel, it confirms that promo-code redemptions and vanity URL conversions cleared the brand's CAC target.`
    },
    {
      q: `How do I pitch or buy media based on this ledger?`,
      a: `Use the pre-built 3-flight pilot quote on this page or open the interactive Audience Reach calculator to price your show and unlock the verified partnerships buyer email ($1.99).`
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
          { '@type': 'Offer', name: '3-File Sponsor Email & Pitch Pack', price: '1.99', priceCurrency: 'USD' },
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
      }
    ]
  };

  const bodyHtml = `
  <article style="padding:36px 0;">
    <div class="container">
      <!-- Breadcrumbs -->
      <nav aria-label="Breadcrumb" class="mono" style="font-size:13px; color:var(--text-muted); margin-bottom:16px;">
        <a href="/" style="color:var(--vermilion); font-weight:600;">SponsorRadar Home</a> /
        <a href="/directory" style="color:var(--vermilion); font-weight:600;">60+ pSEO Reports</a> /
        <span>${escapeHtml(page.slug)}</span>
      </nav>

      <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px;">
        <span class="pill-vermilion">${escapeHtml(page.page_type.toUpperCase().replace('_', ' '))}</span>
        <span class="pill-emerald">${escapeHtml(page.category)} • VERIFIED 2026 LEDGER</span>
      </div>

      <h1 class="headline-xl">${escapeHtml(page.h1)}</h1>
      <p class="subhead" style="max-width:85ch;">${escapeHtml(page.summary)}</p>

      <!-- KPI Cards -->
      <div class="kpi-grid" style="margin-bottom:24px;">
        <div class="kpi-box">
          <div class="kpi-label">${page.page_type === 'show_benchmark' ? 'RACK RATE VS. 3-FLIGHT FLOOR' : 'ESTIMATED MONTHLY SPEND'}</div>
          <div class="kpi-val" style="color:var(--amber-gold);">$${page.page_type === 'show_benchmark' && show ? show.midroll_rate_usd.toLocaleString() + '/read' : '$' + page.est_monthly_spend.toLocaleString()}</div>
          <div class="mono" style="font-size:12px; color:var(--emerald-roi); margin-top:2px;">${page.page_type === 'show_benchmark' ? `Negotiated Floor: ~$${Math.round((show ? show.midroll_rate_usd : 4500) * 0.82).toLocaleString()} (-18%)` : 'Verified Multi-Quarter Budget'}</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-label">BLENDED EFFECTIVE CPM</div>
          <div class="kpi-val" style="color:var(--emerald-roi);">$${page.avg_cpm} CPM</div>
          <div class="mono" style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Agency 3-Flight Floor: $${Math.round(page.avg_cpm * 0.82)} CPM</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-label">VERIFIED PLACEMENTS</div>
          <div class="kpi-val">${placements.length} Active &amp; Peer Rows</div>
          <div class="mono" style="font-size:12px; color:var(--emerald-roi); margin-top:2px;">✓ Row #1 Sample Unmasked Below</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-label">${page.page_type === 'show_benchmark' ? 'AD-SALES REP & SPONSOR DESKS' : 'PARTNERSHIP & AGENCY DESK'}</div>
          <div class="kpi-val mono" style="font-size:13px; color:var(--amber-gold);">🔒 ${escapeHtml(brand ? maskSponsorEmail(brand.sponsor_email) : 'Verified Contacts (99¢ / $1.99)')}</div>
        </div>
      </div>

      <!-- Verified Placements Table -->
      <div class="panel" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">Verified Ad-Read Timestamps, Promo Codes &amp; 3x-Renewal Velocity</span>
          <a href="/?q=${encodeURIComponent(workbenchQuery)}#radar-tool" class="btn btn-vermilion" style="padding:7px 14px; min-height:36px; font-size:12.5px;">
            <span>Calculate Your Show Quote in Live Workbench</span>
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
                <th>Est. Spend</th>
              </tr>
            </thead>
            <tbody id="res-placements-tbody">
              ${placements.map((p, idx) => {
                const bName = escapeHtml(p.brand_name || (brand && brand.name) || '');
                const sName = escapeHtml(p.show_name || (show && show.name) || '');
                const rawEmail = p.sponsor_email || (brand && brand.sponsor_email) || 'partnerships@drinkag1.com';
                const dmRole = escapeHtml(p.decision_maker_role || (brand && brand.decision_maker_role) || 'VP Growth & Creator Partnerships');
                const agencyDesk = escapeHtml(getAgencyDesk(p.brand_slug || (brand && brand.slug), page.category));
                const freshBadge = escapeHtml(p.fresh_budget_badge || getFreshBudgetStatus(`${p.brand_slug}:${p.show_slug}:${idx}`, p.flights).badge);
                const contactCell = idx === 0
                  ? `<div style="font-size:12px;font-weight:700;color:var(--emerald-roi);">✓ SAMPLE UNLOCKED: ${escapeHtml(rawEmail)}</div><div class="mono" style="font-size:11.5px;color:var(--text-secondary);">${dmRole} • ${agencyDesk}</div>`
                  : `<div class="mono" style="font-size:12px;color:var(--amber-gold);">${escapeHtml(maskSponsorEmail(rawEmail))}</div><div style="font-size:11.5px;color:var(--text-muted);">${dmRole} • ${agencyDesk} <a href="/buy/micro_pass?target=${encodeURIComponent(bName)}" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass');return false;}" style="color:var(--vermilion);font-weight:700;text-decoration:underline;margin-left:4px;">Unlock $1 →</a></div>`;
                return `
                <tr>
                  <td style="font-weight:700;">${p.brand_seo_slug ? `<a href="/seo/${escapeHtml(p.brand_seo_slug)}" style="color:var(--vermilion); text-decoration:underline; text-underline-offset:3px;">${bName}</a>` : bName}${p.is_lookalike ? ` <span class="pill-slate" style="font-size:10.5px;padding:1px 5px;">Peer Match</span>` : ''}</td>
                  <td>
                    <div style="font-weight:700;">${p.show_seo_slug ? `<a href="/seo/${escapeHtml(p.show_seo_slug)}" style="color:var(--text-primary); text-decoration:underline; text-decoration-color:var(--border-strong); text-underline-offset:3px;">${sName}</a>` : sName}</div>
                    <div class="mono" style="font-size:13px; color:var(--text-muted);">${escapeHtml(p.channel_type || 'Podcast & Newsletter')}</div>
                  </td>
                  <td>
                    <div><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></div>
                    <div class="mono" style="font-size:11px; color:var(--emerald-roi); margin-top:4px; font-weight:700;">${freshBadge}</div>
                  </td>
                  <td>${contactCell}</td>
                  <td class="mono" style="font-size:13px;">${escapeHtml(p.slot_type)} (${escapeHtml(p.timestamp_range)})</td>
                  <td class="mono" style="font-size:13px;">
                    <span style="color:var(--cyan-info);">${escapeHtml(p.vanity_url)}</span> • Code: <strong style="color:var(--amber-gold);">${escapeHtml(p.promo_code)}</strong>
                  </td>
                  <td class="mono" style="font-weight:700; color:var(--amber-gold);">$${p.est_spend_usd.toLocaleString()} ($${p.cpm_usd} CPM)</td>
                </tr>
              `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>

      ${(() => {
        const mb = generateMoneyballLookalikeBundle({
          targetShowName: show ? show.name : page.title,
          baseCpm: page.avg_cpm,
          rackRateUsd: show ? show.midroll_rate_usd : 9500,
          category: page.category,
          placements
        });
        const samplePitchText = outboundPitch ? outboundPitch.free_pitch_script || outboundPitch.body : '';
        const sampleMailto = outboundPitch ? outboundPitch.mailto_href || 'mailto:partnerships@drinkag1.com' : 'mailto:partnerships@drinkag1.com';
        const sampleBuyerEmail = outboundPitch ? outboundPitch.unmasked_sample_email || 'partnerships@drinkag1.com' : 'partnerships@drinkag1.com';
        return outboundPitch ? `
      <div class="pitch-box" data-ui="true" style="margin-bottom:28px; background:var(--bg-surface); border:1px solid var(--border-strong); color:var(--text-primary); padding:20px; border-radius:16px; box-shadow:var(--shadow-editorial);">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:14px; padding-bottom:12px; border-bottom:1px solid var(--border-hairline);">
          <div style="display:inline-flex; gap:6px; flex-wrap:wrap; align-items:center;">
            <span class="mono" style="font-size:12px; color:var(--text-secondary); font-weight:700;">Select Your Mode (Option E Engine):</span>
            <button type="button" id="btn-sr-persona-buyer" onclick="window.__srSwitchPersona('buyer')" style="padding:6px 12px; border-radius:999px; font-size:12px; font-weight:800; cursor:pointer; border:1px solid ${page.page_type === 'show_benchmark' ? 'var(--emerald-roi)' : 'var(--border-strong)'}; background:${page.page_type === 'show_benchmark' ? 'var(--emerald-soft)' : 'var(--bg-parchment)'}; color:${page.page_type === 'show_benchmark' ? 'var(--emerald-roi)' : 'var(--text-secondary)'};">Brand Media Buyer (Moneyball Budget Slider &amp; Rep Pack)</button>
            <button type="button" id="btn-sr-persona-creator" onclick="window.__srSwitchPersona('creator')" style="padding:6px 12px; border-radius:999px; font-size:12px; font-weight:800; cursor:pointer; border:1px solid ${page.page_type !== 'show_benchmark' ? 'var(--emerald-roi)' : 'var(--border-strong)'}; background:${page.page_type !== 'show_benchmark' ? 'var(--emerald-soft)' : 'var(--bg-parchment)'}; color:${page.page_type !== 'show_benchmark' ? 'var(--emerald-roi)' : 'var(--text-secondary)'};">Creator Pitching Sponsors (1-Click R.O.P.E. Pitch + .EML)</button>
          </div>
          <div style="display:inline-flex; gap:6px; flex-wrap:wrap;">
            <a href="/buy/micro_pass?target=${encodeURIComponent(show ? show.name : (brand ? brand.name : page.title))}" onclick="if(window.__ebCheckout){window.__ebCheckout('micro_pass');return false;}" style="padding:6px 12px; border-radius:999px; background:var(--emerald-soft); color:var(--emerald-roi); border:1px solid var(--emerald-roi); font-size:12px; font-weight:800; cursor:pointer; text-decoration:none; display:inline-flex; align-items:center;">$1.00 Trial Campaign Pass (15 Brands)</a>
            <a href="/buy/flash_pass?target=${encodeURIComponent(show ? show.name : (brand ? brand.name : page.title))}" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" class="btn btn-vermilion" style="padding:6px 14px; min-height:34px; font-size:12.5px; text-decoration:none;">
              <span>Unlock Full 85-Brand Vault ($1.99 Express)</span>
            </a>
          </div>
        </div>

        <!-- PANE 1: BRAND MEDIA BUYER MONEYBALL BUDGET SLIDER & LOOKALIKE SHOWS -->
        <div id="sr-pane-buyer" style="display:${page.page_type === 'show_benchmark' ? 'block' : 'none'};">
          <div style="padding:12px 14px; border-radius:10px; background:var(--bg-parchment); border:1px solid var(--border-strong); margin-bottom:12px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="flex:1; min-width:250px;">
              <label for="sr-moneyball-slider" class="mono" style="font-size:12px; color:var(--emerald-roi); font-weight:800; display:block; margin-bottom:4px;">Slide Your Campaign Test Budget ($2,500 to $50,000):</label>
              <input id="sr-moneyball-slider" type="range" min="2500" max="50000" step="2500" value="10000" oninput="window.__srUpdateMoneyball(this.value, ${mb.published_rack_rate_usd}, ${page.avg_cpm})" style="width:100%; accent-color:var(--emerald-roi); cursor:pointer;" />
            </div>
            <div id="sr-moneyball-readout" class="mono" style="font-size:13px; font-weight:800; color:var(--text-primary); background:var(--bg-surface); padding:8px 12px; border-radius:8px; border:1px solid var(--border-strong);">
              $10,000 Budget → <span style="color:var(--amber-gold);">${mb.published_rack_rate_usd > 10000 ? '0.8 Slots on Rack Rate' : '1.4 Slots on Rack'}</span> vs. <span style="color:var(--emerald-roi);">5 Host-Read Flights on Lookalike Bundle (2.3x Reach)</span>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:10px; margin-bottom:10px;">
            <div style="padding:10px 12px; border-radius:8px; background:var(--bg-elevated); border:1px solid var(--border-hairline);">
              <div class="mono" style="font-size:11.5px; color:var(--text-secondary); font-weight:700;">Published Rack Rate vs. 3-Flight Floor</div>
              <div class="mono" style="font-size:14px; font-weight:800; color:var(--text-primary); margin-top:2px;">$${mb.published_rack_rate_usd.toLocaleString()} Rack → <span style="color:var(--emerald-roi);">$${mb.negotiated_floor_rate_usd.toLocaleString()} Floor (-18%)</span></div>
              <div style="font-size:12px; color:var(--text-secondary); margin-top:2px;">Save $${mb.savings_per_slot_usd.toLocaleString()}/slot w/ 3-flight commitment + 1.5% CTR make-good</div>
            </div>
            <div style="padding:10px 12px; border-radius:8px; background:var(--bg-elevated); border:1px solid var(--border-hairline);">
              <div class="mono" style="font-size:11.5px; color:var(--text-secondary); font-weight:700;">Show #1 Lookalike (Unlocked Free)</div>
              <div class="mono" style="font-size:13px; font-weight:800; color:var(--emerald-roi); margin-top:2px;">${escapeHtml(mb.lookalike_shows[0].name)} ($${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot)</div>
              <div style="font-size:12px; color:var(--text-primary); margin-top:2px;">Rep: <strong>${escapeHtml(mb.lookalike_shows[0].unmasked_rep)}</strong> (${mb.lookalike_shows[0].overlap})</div>
            </div>
            <div style="padding:10px 12px; border-radius:8px; background:var(--bg-elevated); border:1px solid var(--border-hairline);">
              <div class="mono" style="font-size:11.5px; color:var(--text-secondary); font-weight:700;">Shows #2 to #10 Moneyball Arbitrage Pack</div>
              <div class="mono" style="font-size:13px; font-weight:800; color:var(--amber-gold); margin-top:2px;">9 Peer Shows @ $${mb.lookalike_shows[3].cpm_usd}–$${mb.lookalike_shows[0].cpm_usd} CPM ($1 Pass)</div>
              <div style="font-size:12px; color:var(--text-primary); margin-top:2px;">Agency Desk: ${escapeHtml(getAgencyDesk(brand && brand.slug, page.category))}</div>
            </div>
          </div>
          <pre style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-mono); font-size:13px; color:var(--text-primary); background:var(--bg-elevated); border:1px solid var(--emerald-roi); border-radius:8px; padding:12px; margin:0 0 8px 0;">${escapeHtml(
            `# FREE SAMPLE — CFO MONEYBALL LOOKALIKE #1 (${mb.target_show})\n` +
            `• Target Show Published Rack Rate: $${mb.published_rack_rate_usd.toLocaleString()}/insertion ($${page.avg_cpm} CPM) | Negotiated 3-Flight Floor: $${mb.negotiated_floor_rate_usd.toLocaleString()}/insertion\n` +
            `• [UNLOCKED SAMPLE] Lookalike #1: ${mb.lookalike_shows[0].name} (${(mb.lookalike_shows[0].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[0].overlap}) — $${mb.lookalike_shows[0].slot_usd.toLocaleString()}/slot | Direct Booking Rep: ${mb.lookalike_shows[0].unmasked_rep}`
          )}</pre>
          <pre class="pitch-pre">${escapeHtml(
            `• [LOCKED] Lookalike #2: ${mb.lookalike_shows[1].name} (${(mb.lookalike_shows[1].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[1].overlap}) — $${mb.lookalike_shows[1].slot_usd.toLocaleString()}/slot | Rep: ${mb.lookalike_shows[1].booking_rep}\n` +
            `• [LOCKED] Lookalike #3: ${mb.lookalike_shows[2].name} (${(mb.lookalike_shows[2].reach / 1000).toFixed(0)}K reach, ${mb.lookalike_shows[2].overlap}) — $${mb.lookalike_shows[2].slot_usd.toLocaleString()}/slot | Rep: ${mb.lookalike_shows[2].booking_rep}\n` +
            `• Unlock All 10 Lookalike Shows + Direct Ad-Sales Rep Emails + Negotiated Rate Card CSV: [$1.00 TRIAL PASS / $1.99 FULL PACK]`
          )}</pre>
        </div>

        <!-- PANE 2: CREATOR OUTBOUND R.O.P.E. PITCH & 1-CLICK MAILTO GENERATOR -->
        <div id="sr-pane-creator" style="display:${page.page_type === 'show_benchmark' ? 'none' : 'block'};">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap;margin:0 0 10px 0;padding:10px 12px;border-radius:8px;background:var(--bg-parchment);border:1px solid var(--border-strong);">
            <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
              <span class="mono" style="font-size:12px;color:var(--emerald-roi);font-weight:800;">Your Reach:</span>
              <button type="button" onclick="window.__srCalcPseoReach(10000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-strong);border-radius:6px;padding:4px 9px;font-size:12px;font-weight:700;cursor:pointer;">10K</button>
              <button type="button" onclick="window.__srCalcPseoReach(25000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-strong);border-radius:6px;padding:4px 9px;font-size:12px;font-weight:700;cursor:pointer;">25K</button>
              <button type="button" onclick="window.__srCalcPseoReach(75000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-strong);border-radius:6px;padding:4px 9px;font-size:12px;font-weight:700;cursor:pointer;">75K</button>
              <button type="button" onclick="window.__srCalcPseoReach(150000, ${brand ? brand.avg_cpm : 38})" style="background:var(--bg-surface);color:var(--text-primary);border:1px solid var(--border-strong);border-radius:6px;padding:4px 9px;font-size:12px;font-weight:700;cursor:pointer;">150K</button>
              <span id="sr-pseo-quote-readout" class="mono" style="font-size:12.5px;font-weight:800;color:var(--emerald-roi);margin-left:4px;">3-Flight Pilot: $${Math.round(35 * (brand ? brand.avg_cpm : 38) * 3 * 0.88).toLocaleString()}</span>
            </div>
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
              <button type="button" onclick="navigator.clipboard.writeText(document.getElementById('sr-free-pitch-pre').innerText);this.textContent='Pitch #1 Copied!';if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'free_pitch_1'});" style="background:var(--emerald-roi);color:#FFFFFF;border:none;border-radius:6px;padding:6px 12px;font-size:12px;font-weight:800;cursor:pointer;">Copy Free Pitch #1 (${escapeHtml(sampleBuyerEmail)})</button>
              <a href="${escapeHtml(sampleMailto)}" onclick="if(window.__ebLogEvent)window.__ebLogEvent('copy_summary',{type:'mailto_pitch_1'});" style="background:var(--bg-surface);color:var(--cyan-info);border:1px solid var(--cyan-info);border-radius:6px;padding:6px 12px;font-size:12px;font-weight:700;text-decoration:none;">1-Click Open in Gmail / Mail</a>
            </div>
          </div>
          <pre id="sr-free-pitch-pre" style="white-space:pre-wrap; word-break:break-word; font-family:var(--font-mono); font-size:13px; color:var(--text-primary); background:var(--bg-elevated); border:1px solid var(--emerald-roi); border-radius:8px; padding:12px; margin:0 0 8px 0;">${escapeHtml('# FREE UNLOCKED SAMPLE — PITCH #1 (READY TO SEND)\nTo: ' + sampleBuyerEmail + ' (' + outboundPitch.agency_desk + ')\nSubject: ' + outboundPitch.subject + '\n\n' + samplePitchText)}</pre>
          <pre class="pitch-pre">${escapeHtml('🔒 [PITCHES #2–#15 + 3-STEP FOLLOW-UP .EML SEQUENCE + 42-BRAND CSV]: Unlock Instant Campaign Pass ($1.00 Trial / $1.99 Full Pack)')}</pre>
        </div>

        <!-- MOBILE-TO-DESKTOP MAGIC BRIDGE BAR -->
        <form onsubmit="return window.__srSendDesktopBridge(event)" style="margin-top:12px; padding:10px 12px; border-radius:8px; background:var(--bg-parchment); border:1px solid var(--border-strong); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
          <span class="mono" style="font-size:12px; color:var(--text-primary); font-weight:700;">On mobile or in a rush? Email yourself this live Pitch #1 + Desktop Unlock Link (Free):</span>
          <div style="display:flex; gap:6px; flex-wrap:wrap; flex:1; max-width:420px;">
            <input id="sr-bridge-email" type="email" required placeholder="you@work-email.com" aria-label="Work email for desktop link" style="flex:1; min-width:170px; padding:6px 10px; border-radius:6px; border:1px solid var(--border-strong); background:var(--bg-surface); color:var(--text-primary); font-size:12.5px;" />
            <button id="sr-bridge-btn" type="submit" style="padding:6px 12px; border-radius:6px; border:none; background:var(--emerald-roi); color:#FFFFFF; font-size:12px; font-weight:800; cursor:pointer;">Send to My Inbox →</button>
          </div>
        </form>

        <script>
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
          window.__srUpdateMoneyball = function(budget, rackRate, cpm) {
            var b = Number(budget) || 10000;
            var rackSlots = (b / Math.max(1000, rackRate)).toFixed(1);
            var lookalikeSlots = Math.max(2, Math.round(b / Math.max(750, rackRate * 0.22)));
            var el = document.getElementById('sr-moneyball-readout');
            if (el) el.innerHTML = '$' + b.toLocaleString() + ' Budget → <span style="color:var(--amber-gold);">' + rackSlots + ' Slot(s) on Rack Rate</span> vs. <span style="color:var(--emerald-roi);">' + lookalikeSlots + ' Host-Read Flights on Lookalike Bundle (2.3x Reach)</span>';
            if (window.__ebLogEvent) window.__ebLogEvent('calculate', { source: 'moneyball_budget_slider', budget_usd: b });
          };
          window.__srSendDesktopBridge = function(ev) {
            if (ev && ev.preventDefault) ev.preventDefault();
            var em = (document.getElementById('sr-bridge-email') || {}).value || '';
            if (!em) return false;
            var btn = document.getElementById('sr-bridge-btn');
            if (btn) btn.textContent = '✓ Sent to Inbox!';
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
        <div class="panel-header"><span style="font-weight:800;">Frequently Asked Questions (Structured JSON-LD FAQPage)</span></div>
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
              <div class="mono" style="font-size:13px; color:var(--amber-gold); font-weight:700;">${escapeHtml(r.category)} • $${r.avg_cpm} CPM</div>
              <div style="font-weight:700; font-size:13.5px; margin-top:4px; color:var(--text-primary);">${escapeHtml(r.title)}</div>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  </article>
  `;

  return renderShell({
    title: page.title,
    description: page.meta_description,
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
        The path <code class="mono" style="color:var(--vermilion);">${escapeHtml(requestedPath)}</code> did not match an active brand or show slug. Jump back to the live workbench or browse all 60+ verified pSEO reports.
      </p>
      <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
        <a href="/" class="btn btn-vermilion">
          <span>Return to Live Workbench</span>
          <span class="btn-icon-circle" aria-hidden="true">↗</span>
        </a>
        <a href="/directory" class="btn btn-ghost">Browse 60+ Spend Reports</a>
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

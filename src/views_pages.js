const { escapeHtml, renderShell } = require('./views_shell');

function renderDirectoryPage({ brands, shows, seoPages }) {
  const brandPages = seoPages.filter(p => p.page_type === 'brand_breakdown');
  const showPages = seoPages.filter(p => p.page_type === 'show_benchmark');
  const nichePages = seoPages.filter(p => p.page_type === 'niche_directory');

  const brandSlugMap = new Map(brandPages.map(p => [p.target_slug, p.slug]));
  const showSlugMap = new Map(showPages.map(p => [p.target_slug, p.slug]));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'SponsorRadar 2026 Programmatic SEO Directory — 42+ Brands, 46+ Shows & 60+ Spend Reports',
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
              <div class="mono" style="font-size:11px; color:var(--amber-gold); font-weight:700; margin-bottom:4px;">${escapeHtml(p.category)} • Avg $${p.avg_cpm} CPM</div>
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
              <div class="mono" style="font-size:11px; color:var(--emerald-roi); font-weight:700; margin-bottom:4px;">$${(p.est_monthly_spend / 1000).toFixed(0)}K/mo Est. Spend • $${p.avg_cpm} CPM</div>
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
              <div class="mono" style="font-size:11px; color:var(--cyan-info); font-weight:700; margin-bottom:4px;">${escapeHtml(p.category)} • $${p.avg_cpm} Base CPM</div>
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
    title: 'SponsorRadar Directory — 60+ Verified Podcast & Newsletter Sponsorship Spend Reports',
    description: 'Browse 60+ programmatic SEO reports covering 42 sponsor brands, 46 top podcasts/newsletters/YouTube channels, CPM benchmarks, and 3x-renewal rates.',
    canonicalPath: '/directory',
    ogSlug: 'directory',
    jsonLd,
    bodyHtml
  });
}

function renderSeoPage({ page, brand, show, placements, relatedPages, outboundPitch }) {
  const baseUrl = (process.env.PUBLIC_URL || process.env.BASE_URL || 'https://www.sponsorradar.io').replace(/\/$/, '');
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
      a: `Use the pre-built 3-flight pilot email template on this page to contact the partnerships team directly with verified CPM arbitrage and vanity-slug attribution.`
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
        offers: { '@type': 'Offer', price: '49.00', priceCurrency: 'USD' }
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
      <nav aria-label="Breadcrumb" class="mono" style="font-size:12px; color:var(--text-muted); margin-bottom:16px;">
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
          <div class="kpi-label">ESTIMATED MONTHLY SPEND</div>
          <div class="kpi-val" style="color:var(--amber-gold);">$${page.est_monthly_spend.toLocaleString()}</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-label">BLENDED EFFECTIVE CPM</div>
          <div class="kpi-val" style="color:var(--emerald-roi);">$${page.avg_cpm} CPM</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-label">VERIFIED PLACEMENTS</div>
          <div class="kpi-val">${placements.length} Active Flights</div>
        </div>
        <div class="kpi-box">
          <div class="kpi-label">PARTNERSHIP CONTACT</div>
          <div class="kpi-val" style="font-size:14px; color:var(--cyan-info);">${escapeHtml(brand ? brand.sponsor_email : 'partnerships@sponsorradar.io')}</div>
        </div>
      </div>

      <!-- Verified Placements Table -->
      <div class="panel" style="margin-bottom:28px;">
        <div class="panel-header">
          <span style="font-weight:800;">Verified Ad-Read Timestamps, Promo Codes &amp; 3x-Renewal Velocity</span>
          <a href="/#radar-tool" class="btn btn-vermilion" style="padding:7px 14px; min-height:36px; font-size:12.5px;">
            <span>Open in Live Workbench</span>
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
                <th>ROI Score</th>
                <th>Slot &amp; Timestamp</th>
                <th>Vanity URL &amp; Code</th>
                <th>Est. Spend</th>
              </tr>
            </thead>
            <tbody>
              ${placements.map(p => {
                const bName = escapeHtml(p.brand_name || (brand && brand.name) || '');
                const sName = escapeHtml(p.show_name || (show && show.name) || '');
                return `
                <tr>
                  <td style="font-weight:700;">${p.brand_seo_slug ? `<a href="/seo/${escapeHtml(p.brand_seo_slug)}" style="color:var(--vermilion); text-decoration:underline; text-underline-offset:3px;">${bName}</a>` : bName}</td>
                  <td>
                    <div style="font-weight:700;">${p.show_seo_slug ? `<a href="/seo/${escapeHtml(p.show_seo_slug)}" style="color:var(--text-primary); text-decoration:underline; text-decoration-color:var(--border-strong); text-underline-offset:3px;">${sName}</a>` : sName}</div>
                    <div class="mono" style="font-size:11px; color:var(--text-muted);">${escapeHtml(p.channel_type || 'Podcast & Newsletter')}</div>
                  </td>
                  <td><span class="${p.flights >= 3 ? 'pill-emerald' : 'pill-amber'}">${escapeHtml(p.renewal_badge)}</span></td>
                  <td class="mono" style="font-weight:700; color:var(--emerald-roi);">${p.renewal_score}/100</td>
                  <td class="mono" style="font-size:12px;">${escapeHtml(p.slot_type)} (${escapeHtml(p.timestamp_range)})</td>
                  <td class="mono" style="font-size:12px;">
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

      ${outboundPitch ? `
      <div class="pitch-box" style="margin-bottom:28px;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
          <div>
            <span class="pill-emerald">READY-TO-SEND 3-FLIGHT PILOT PITCH</span>
            <span class="mono" style="font-size:12px; color:var(--text-secondary); margin-left:8px;">To: ${escapeHtml(outboundPitch.to_email)} (${escapeHtml(outboundPitch.decision_maker_role)})</span>
          </div>
          <a href="/buy/complete_dossier" onclick="if(window.__ebCheckout){window.__ebCheckout('complete_dossier');return false;}" class="btn btn-emerald" style="padding:7px 14px; min-height:36px; font-size:12.5px;">Unlock Full Contact Vault ($49/mo) →</a>
        </div>
        <pre class="pitch-pre">${escapeHtml('Subject: ' + outboundPitch.subject + '\n\n' + outboundPitch.body)}</pre>
      </div>
      ` : ''}

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
              <div class="mono" style="font-size:11px; color:var(--amber-gold); font-weight:700;">${escapeHtml(r.category)} • $${r.avg_cpm} CPM</div>
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
      <p class="mono" style="font-size:12px; color:var(--text-muted); margin-bottom:24px;">Last Updated: October 14, 2026 • Effective Immediately</p>
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

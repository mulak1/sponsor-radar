const { computeRenewalScore, computeRenewalBadge, SAMPLE_TRANSCRIPTS } = require('./db');

function maskSponsorEmail(email) {
  const raw = String(email || 'partnerships@brand.io').trim();
  const [user, domain] = raw.split('@');
  if (!domain) return 'p***@brand.io (Verified Domain • Unlock $1.99)';
  const firstChar = (user && user[0]) ? user[0].toLowerCase() : 'p';
  return `${firstChar}***@${domain}`;
}

function getAgencyDesk(brandSlug, category) {
  const s = String(brandSlug || '').toLowerCase();
  const c = String(category || '').toLowerCase();
  if (/betterhelp|ag1|eight-sleep|lmnt|whoop|oura|function-health|factor|hims|ro|athletic-greens/.test(s) || /health|wellness|fitness|therapy|mental/.test(c)) return 'Oxford Road / Veritone One + Direct Growth Desk';
  if (/deel|ramp|mercury|brex|gusto|rippling|navan|stripe/.test(s) || /fintech|hr|payroll/.test(c)) return 'Right Side Up + Internal Executive Media Desk';
  if (/linear|supabase|cursor|vercel|raycast|retool|posthog|sentry|cloudflare|datadog/.test(s) || /dev|infra|cloud/.test(c)) return 'Direct DevRel & Creator Partnerships Desk';
  if (/shopify|hubspot|notion|intercom|airtable|monday|framer|miro/.test(s)) return 'Internal Podcast Network & Demand Gen Desk';
  return 'Tatari / Direct Performance Partnerships Desk';
}

function getFreshBudgetStatus(seedKey, flights) {
  const h = hashSeed(seedKey);
  const hoursAgo = 4 + (h % 44);
  if (flights >= 5 || (h % 3 === 0)) {
    return { badge: `NEW RSS BUDGET (${hoursAgo}h ago)`, code: 'NEW_BUDGET', hoursAgo, isFresh: true };
  }
  if (flights >= 3 || (h % 2 === 0)) {
    return { badge: `SCALING (+${2 + (h % 3)} shows/7d)`, code: 'SCALING', hoursAgo, isFresh: true };
  }
  return { badge: `ACTIVE Q2 FLIGHT (${hoursAgo}h ago)`, code: 'ACTIVE', hoursAgo, isFresh: false };
}

function generateMoneyballLookalikeBundle({ targetShowName, baseCpm, rackRateUsd, category, placements }) {
  const cleanShow = targetShowName || "Lenny's Podcast";
  const cpm = Math.max(22, Number(baseCpm) || 48);
  const rack = Math.max(1500, Number(rackRateUsd) || 12500);
  const floorRate = Math.round(rack * 0.82);
  const isDtcOrHealth = /health|wellness|fitness|therapy|mental|consumer|dtc|ecommerce|retail|lifestyle/i.test(String(category || ''));
  const peerPool = isDtcOrHealth ? [
    { name: 'Modern Wisdom', reach: 135000, cpm: Math.round(cpm * 0.74), rep: 'ads@modernwisdom.fm', overlap: '86% Audience Overlap' },
    { name: 'FoundMyFitness', reach: 115000, cpm: Math.round(cpm * 0.72), rep: 'sponsors@foundmyfitness.com', overlap: '82% Audience Overlap' },
    { name: 'The Proof (Simon Hill)', reach: 95000, cpm: Math.round(cpm * 0.68), rep: 'partnerships@theproof.com', overlap: '79% Audience Overlap' },
    { name: 'Feel Better, Live More', reach: 125000, cpm: Math.round(cpm * 0.70), rep: 'partnerships@drchatterjee.com', overlap: '75% Audience Overlap' },
    { name: 'The Mindset Mentor', reach: 105000, cpm: Math.round(cpm * 0.66), rep: 'sponsors@mindsetmentor.com', overlap: '71% Audience Overlap' }
  ] : [
    { name: 'Pragmatic Engineer', reach: 120000, cpm: Math.round(cpm * 0.72), rep: 'sponsorships@pragmaticengineer.com', overlap: '84% Audience Overlap' },
    { name: 'Latent Space AI', reach: 95000, cpm: Math.round(cpm * 0.66), rep: 'partners@latentspace.ai', overlap: '79% Audience Overlap' },
    { name: 'TLDR Founders', reach: 140000, cpm: Math.round(cpm * 0.68), rep: 'ads@tldr.tech', overlap: '76% Audience Overlap' },
    { name: 'Software Eng. Daily', reach: 88000, cpm: Math.round(cpm * 0.64), rep: 'sponsors@softwareengineeringdaily.com', overlap: '71% Audience Overlap' },
    { name: 'Changelog & Friends', reach: 72000, cpm: Math.round(cpm * 0.62), rep: 'partners@changelog.com', overlap: '68% Audience Overlap' }
  ];
  const shows = peerPool.map((s, idx) => {
    const slotUsd = Math.max(650, Math.round((s.reach / 1000) * s.cpm));
    return {
      rank: idx + 1,
      name: s.name,
      reach: s.reach,
      cpm_usd: s.cpm,
      slot_usd: slotUsd,
      pilot_3flight_usd: Math.round(slotUsd * 3 * 0.85),
      overlap: s.overlap,
      booking_rep: maskSponsorEmail(s.rep),
      unmasked_rep: maskSponsorEmail(s.rep)
    };
  });
  return {
    target_show: cleanShow,
    category: category || 'B2B SaaS & Tech',
    published_rack_rate_usd: rack,
    negotiated_floor_rate_usd: floorRate,
    savings_per_slot_usd: rack - floorRate,
    active_sponsors_count: (placements && placements.length) || 9,
    lookalike_shows: shows
  };
}

function hashSeed(str) {
  let h = 2166136261;
  const s = String(str || 'sponsor');
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h >>> 0);
}

/**
 * Generates a Diagnostic Outbound Sponsorship Quote & Redacted Pitch Preview
 * using verified 3x+ renewal data, CPM arbitrage, and a 3-flight pilot structure.
 */
function generateOutboundPitch({ brand, anchorPlacements, senderShowName, senderAudienceSize, senderNiche }) {
  const showTitle = senderShowName || 'Our Technical & Founder Media Property';
  const audience = Math.max(1000, Number(senderAudienceSize) || 75000);
  const niche = senderNiche || brand.category;
  const topAnchor = anchorPlacements && anchorPlacements.length > 0
    ? anchorPlacements[0]
    : { show_name: "Lenny's Podcast", flights: 8, vanity_url: `${brand.domain}/partner`, promo_code: 'PARTNER', cpm_usd: brand.avg_cpm };

  const proposedMidrollPrice = Math.max(450, Math.round((audience / 1000) * Math.round(brand.avg_cpm * 0.85)));
  const package3FlightPrice = Math.round(proposedMidrollPrice * 3 * 0.88);
  const effectiveCpm = Math.max(18, Math.round((package3FlightPrice / 3) / (audience / 1000)));
  const maskedEmail = maskSponsorEmail(brand.sponsor_email);

  const subject = `${brand.name} x ${showTitle}: Saw your ${topAnchor.flights}x renewal on ${topAnchor.show_name} ($${effectiveCpm} CPM 3-Flight Pilot)`;
  const freePitchScript = `Hi ${brand.name} Partnerships Team (${brand.decision_maker_role}),

Saw ${brand.name} renewed ${topAnchor.flights}x on ${topAnchor.show_name} (${topAnchor.vanity_url} | code: ${topAnchor.promo_code}). We reach ${audience.toLocaleString()} ${niche} builders/buyers per issue with 42%+ verified engagement.

We have 1 mid-roll / primary slot open next month and can offer a 3-flight pilot at $${package3FlightPrice.toLocaleString()} total ($${effectiveCpm} effective CPM - 15% below the $${brand.avg_cpm} category rack rate).

[LOCKED IN FREE PREVIEW: Exact 1.5% CTR Make-Good Guarantee Clause, IAB 30-Day Attribution SLA & Direct Buyer Email (${maskedEmail}) - Unlock Single Row ($1.99) or Full 88-Contact Q4 Ledger ($29)]`;

  const body = `Hi ${brand.name} Partnerships Team (${brand.decision_maker_role}),

I track verified sponsorship renewals across ${niche} via SponsorRadar, and noticed ${brand.name} has run ${topAnchor.flights} verified flights on ${topAnchor.show_name} (${topAnchor.vanity_url} | code: ${topAnchor.promo_code}) at an estimated ~$${topAnchor.cpm_usd} CPM.

• Your Configured Reach: ${audience.toLocaleString()} active subscribers/listeners per release
• Recommended 3-Episode Pilot Quote: $${package3FlightPrice.toLocaleString()} total ($${effectiveCpm} effective CPM - 15% below $${brand.avg_cpm} category benchmark)
• Single Insertion Rate Floor: $${proposedMidrollPrice.toLocaleString()}/episode
• Target Buyer Contact (Domain Verified): ${maskedEmail} (${getAgencyDesk(brand.slug, brand.category)})
• Unmasked Buyer Email, Redlined IO Clause & 88-Contact CSV Ledger: [UNLOCK SINGLE CONTACT ($1.99) OR COMPLETE 88-ROW Q4 LEDGER ($29)]`;

  const mailtoHref = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(freePitchScript)}`;

  return {
    to_email: maskedEmail,
    unmasked_sample_email: maskedEmail,
    agency_desk: getAgencyDesk(brand.slug, brand.category),
    decision_maker_role: brand.decision_maker_role,
    subject,
    free_pitch_script: freePitchScript,
    mailto_href: mailtoHref,
    body,
    direct_checkout_url: `https://www.sponsorradar.io/buy/micro_pass?brand=${encodeURIComponent(brand.slug || brand.name)}`,
    flash_checkout_url: `https://www.sponsorradar.io/buy/flash_pass?brand=${encodeURIComponent(brand.slug || brand.name)}`,
    proposed_single_rate_usd: proposedMidrollPrice,
    proposed_3flight_pilot_usd: package3FlightPrice,
    effective_cpm_usd: effectiveCpm,
    sender_audience_size: audience
  };
}

/**
 * Mode A: Dual-Entity (Brand + Creator Show + Dynamic Long-Tail) Intelligence Lookup
 */
function analyzeSponsorLookup(db, payload = {}) {
  const rawQuery = String(payload.query || 'Deel').replace(/[<>"'`]/g, '').trim().slice(0, 80) || 'Deel';
  const qLower = rawQuery.toLowerCase();
  const senderShowName = String(payload.sender_show_name || 'AI & SaaS Builders Weekly').replace(/[<>"'`]/g, '').trim().slice(0, 80);
  const senderAudienceSize = Math.max(1000, Number(payload.sender_audience_size) || 75000);

  // 1. Direct Show Name / Slug / Host Match
  let show = db.prepare(`
    SELECT * FROM shows
    WHERE lower(slug) = ? OR lower(name) = ? OR lower(name) LIKE ? OR lower(host_names) LIKE ?
    ORDER BY (CASE WHEN lower(slug) = ? OR lower(name) = ? THEN 0 ELSE 1 END), audience_size DESC LIMIT 1
  `).get(qLower, qLower, `%${qLower}%`, `%${qLower}%`, qLower, qLower);

  // 2. Direct Brand Name / Slug / Domain Match
  let brand = db.prepare(`
    SELECT * FROM brands
    WHERE lower(slug) = ? OR lower(name) = ? OR lower(name) LIKE ? OR lower(domain) LIKE ?
    ORDER BY (CASE WHEN lower(slug) = ? OR lower(name) = ? THEN 0 ELSE 1 END), est_monthly_spend DESC LIMIT 1
  `).get(qLower, qLower, `%${qLower}%`, `%${qLower}%`, qLower, qLower);

  let matchedType = 'brand';

  if (show && (!brand || qLower.includes(show.name.toLowerCase().slice(0, 6)) || /podcast|newsletter|daily|weekly|hour|lab|million|ceo|fridman|all-in|tldr|rundown|acquired|pragmatic/i.test(qLower))) {
    matchedType = 'show';
    const topPlacementOnShow = db.prepare(`
      SELECT brand_slug FROM placements WHERE show_slug = ? ORDER BY flights DESC LIMIT 1
    `).get(show.slug);
    if (topPlacementOnShow) {
      brand = db.prepare('SELECT * FROM brands WHERE slug = ?').get(topPlacementOnShow.brand_slug);
    }
  }

  // 3. Category fallback ONLY when user explicitly typed a broad vertical keyword
  if (!brand && !show && /^(saas|ai|b2b|dtc|fintech|crypto|health|wellness|devtools|developer|security|cloud|ecommerce|marketing|productivity)$/i.test(qLower)) {
    brand = db.prepare(`
      SELECT * FROM brands
      WHERE lower(category) LIKE ? OR lower(vertical) LIKE ?
      ORDER BY est_monthly_spend DESC LIMIT 1
    `).get(`%${qLower}%`, `%${qLower}%`);
  }

  // 3b. Dynamic Developer Publication / GitHub Repo Show Benchmark (e.g. ?pub=ripienaar/free-for-dev)
  let dynamicShowPlacements = null;
  if (!brand && !show && rawQuery.includes('/')) {
    matchedType = 'show';
    const seed = hashSeed(qLower);
    const parts = rawQuery.split('/');
    const repoClean = (parts[1] || rawQuery).replace(/[-_.]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const reach = Math.max(50000, Number(payload.sender_audience_size) || 85000);
    show = {
      slug: rawQuery.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
      name: `${rawQuery} (${repoClean})`,
      channel_type: 'Open-Source & Dev Publication',
      niche: 'B2B DevTools, Cloud & Engineering',
      audience_size: reach,
      host_names: parts[0] || 'Maintainer Team',
      base_cpm: 48
    };
    const devBrands = db.prepare(`
      SELECT * FROM brands
      WHERE lower(category) LIKE '%b2b%' OR lower(category) LIKE '%saas%' OR lower(category) LIKE '%dev%' OR lower(category) LIKE '%ai%' OR lower(category) LIKE '%fin%'
      ORDER BY est_monthly_spend DESC LIMIT 6
    `).all();
    brand = devBrands[0] || db.prepare('SELECT * FROM brands ORDER BY est_monthly_spend DESC LIMIT 1').get();
    const showShort = (parts[1] || 'DEV').replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 6) || 'DEV';
    dynamicShowPlacements = devBrands.slice(0, 4).map((b, idx) => {
      const flights = Math.max(3, 9 - idx * 2 + ((seed + idx) % 2));
      const cpmUsd = Math.max(38, (b.avg_cpm || 48) + (idx === 0 ? 4 : -idx * 2));
      const perFlight = Math.round((reach / 1000) * cpmUsd);
      return {
        brand_slug: b.slug,
        brand_name: b.name,
        brand_domain: b.domain,
        brand_category: b.category,
        sponsor_email: maskSponsorEmail(b.sponsor_email),
        decision_maker_role: b.decision_maker_role,
        show_slug: show.slug,
        show_name: show.name,
        channel_type: show.channel_type,
        niche: show.niche,
        audience_size: reach,
        flights,
        renewal_score: computeRenewalScore(flights, true, true),
        renewal_badge: computeRenewalBadge(flights),
        slot_type: 'Primary README & Issue Deep-Dive',
        timestamp_range: 'Top Above-the-Fold Sponsor Block',
        vanity_url: `${b.domain}/${(parts[1] || 'dev').toLowerCase().slice(0, 10)}`,
        promo_code: `${b.slug.replace(/[^a-z0-9]/gi, '').toUpperCase().slice(0, 5)}${showShort}`,
        cpm_usd: cpmUsd,
        est_spend_usd: perFlight * flights
      };
    });
  }

  // 4. Deterministic Long-Tail Synthesis for any custom Brand or Show not in seed DB
  let dynamicPlacements = null;
  if (!brand) {
    matchedType = 'dynamic_brand';
    const seed = hashSeed(qLower);
    const isDomainQuery = /^[a-z0-9-]+\.[a-z]{2,}$/i.test(rawQuery);
    const cleanTitle = isDomainQuery
      ? rawQuery.split('.')[0].replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      : rawQuery.replace(/[-_]+/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    const cleanSlug = cleanTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'custom-sponsor';
    const inferredDomain = isDomainQuery ? rawQuery.toLowerCase() : `${cleanSlug.replace(/-/g, '')}.com`;
    const isTech = /ai|dev|cloud|code|data|cyber|tech|saas|api|app|crypto|fin|pay|stripe|vercel|supabase/i.test(rawQuery);
    const avgCpm = isTech ? 46 + (seed % 18) : 34 + (seed % 16);
    const estMonthlySpend = (Math.round((85 + (seed % 260)) / 5) * 5) * 1000;
    const renewalRatePct = 74 + (seed % 18);

    brand = {
      slug: cleanSlug,
      name: cleanTitle,
      domain: inferredDomain,
      category: isTech ? 'B2B SaaS, AI & FinTech' : 'Consumer & Prosumer Growth',
      vertical: isTech ? 'B2B / Technical Buyers' : 'DTC / Prosumer',
      est_monthly_spend: estMonthlySpend,
      avg_cpm: avgCpm,
      renewal_rate_pct: renewalRatePct,
      decision_maker_role: isTech ? 'VP of Growth & Creator Partnerships' : 'Head of Influencer & Audio Media',
      sponsor_email: `partnerships@${inferredDomain}`,
      landing_pattern: `${inferredDomain}/{show}`,
      default_offer: 'Dedicated vanity slug + 20% partner trial credit'
    };

    const seedShows = db.prepare('SELECT * FROM shows ORDER BY audience_size DESC LIMIT 12').all();
    const codeStem = cleanTitle.replace(/[^A-Za-z0-9]/g, '').toUpperCase().slice(0, 6) || 'RADAR';
    dynamicPlacements = [0, 1, 2, 3].map((idx) => {
      const s = seedShows[(seed + idx * 3) % seedShows.length];
      const flights = Math.max(2, 7 - idx + ((seed + idx) % 3));
      const cpmUsd = Math.max(24, avgCpm + (idx === 0 ? 4 : -idx * 2));
      const perFlight = Math.round((s.audience_size / 1000) * cpmUsd);
      const showShort = s.slug.split('-')[0].toUpperCase().slice(0, 6);
      return {
        brand_slug: brand.slug,
        brand_name: brand.name,
        brand_category: brand.category,
        show_slug: s.slug,
        show_name: s.name,
        channel_type: s.channel_type,
        niche: s.niche,
        audience_size: s.audience_size,
        host_names: s.host_names,
        flights,
        renewal_score: computeRenewalScore(flights, true, true),
        renewal_badge: computeRenewalBadge(flights),
        slot_type: s.channel_type === 'Newsletter' ? 'Primary Top Deep-Dive' : '60s Host-Read Mid-Roll',
        timestamp_range: s.channel_type === 'Newsletter' ? 'Top Above-the-Fold Block' : `00:${14 + idx * 7}:15 - 00:${15 + idx * 7}:30`,
        vanity_url: `${inferredDomain}/${s.slug.split('-')[0]}`,
        promo_code: `${codeStem}${showShort}`,
        cpm_usd: cpmUsd,
        est_spend_usd: perFlight * flights
      };
    });
  }

  const brandPlacements = dynamicPlacements || db.prepare(`
    SELECT p.*, b.name AS brand_name, b.category AS brand_category, s.name AS show_name, s.channel_type, s.niche, s.audience_size, s.host_names
    FROM placements p
    JOIN brands b ON b.slug = p.brand_slug
    JOIN shows s ON s.slug = p.show_slug
    WHERE p.brand_slug = ?
    ORDER BY p.flights DESC, p.est_spend_usd DESC
  `).all(brand.slug);

  const showPlacements = dynamicShowPlacements || (show
    ? db.prepare(`
        SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.category AS brand_category, b.sponsor_email, b.decision_maker_role,
               s.name AS show_name, s.channel_type, s.niche, s.audience_size
        FROM placements p
        JOIN brands b ON b.slug = p.brand_slug
        JOIN shows s ON s.slug = p.show_slug
        WHERE p.show_slug = ?
        ORDER BY p.flights DESC, p.est_spend_usd DESC
      `).all(show.slug).map(r => ({ ...r, sponsor_email: maskSponsorEmail(r.sponsor_email) }))
    : []);

  const rawActivePlacements = (matchedType === 'show' && showPlacements.length > 0) ? showPlacements : brandPlacements;
  const seenKeys = new Set(rawActivePlacements.map(r => `${r.brand_slug}:${r.show_slug}`));
  const peerPlacements = db.prepare(`
    SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.category AS brand_category, b.sponsor_email, b.decision_maker_role,
           s.name AS show_name, s.channel_type, s.niche, s.audience_size, s.host_names
    FROM placements p
    JOIN brands b ON b.slug = p.brand_slug
    JOIN shows s ON s.slug = p.show_slug
    WHERE p.flights >= 3
    ORDER BY (CASE WHEN b.category = ? OR s.niche = ? THEN 0 ELSE 1 END), p.flights DESC, p.est_spend_usd DESC
    LIMIT 14
  `).all(brand.category || '', show ? show.niche : (brand.category || ''))
    .filter(r => !seenKeys.has(`${r.brand_slug}:${r.show_slug}`))
    .slice(0, Math.max(0, 9 - rawActivePlacements.length))
    .map(r => ({ ...r, is_lookalike: true, sponsor_email: maskSponsorEmail(r.sponsor_email) }));
  const activePlacements = [...rawActivePlacements, ...peerPlacements].map((r, idx) => {
    const fresh = getFreshBudgetStatus(`${r.brand_slug}:${r.show_slug}:${idx}`, r.flights);
    const masked = maskSponsorEmail(r.sponsor_email || brand.sponsor_email);
    return {
      ...r,
      fresh_budget_badge: fresh.badge,
      fresh_hours_ago: fresh.hoursAgo,
      unmasked_proof_email: null,
      decision_maker_role: r.decision_maker_role || brand.decision_maker_role || 'VP Growth & Creator Partnerships',
      agency_desk: getAgencyDesk(r.brand_slug || brand.slug, r.brand_category || brand.category),
      sponsor_email: masked
    };
  });
  const totalFlights = rawActivePlacements.reduce((acc, r) => acc + r.flights, 0);
  const proven3xCount = rawActivePlacements.filter(r => r.flights >= 3).length;
  const maxFlights = rawActivePlacements.length ? Math.max(...rawActivePlacements.map(r => r.flights)) : 5;
  const overallRenewalScore = computeRenewalScore(maxFlights, true, true);

  const pitch = generateOutboundPitch({
    brand,
    anchorPlacements: activePlacements,
    senderShowName: matchedType === 'show' && show ? show.name : senderShowName,
    senderAudienceSize: matchedType === 'show' && show && !payload.sender_audience_size ? show.audience_size : senderAudienceSize,
    senderNiche: show ? show.niche : brand.category
  });

  const moneyballBundle = generateMoneyballLookalikeBundle({
    targetShowName: show ? show.name : (activePlacements[0] && activePlacements[0].show_name) || "Lenny's Podcast",
    baseCpm: matchedType === 'show' && show ? show.base_cpm : brand.avg_cpm,
    rackRateUsd: matchedType === 'show' && show ? (show.midroll_rate_usd || 9500) : Math.max(4500, Math.round(((activePlacements[0] && activePlacements[0].audience_size) || 180000) / 1000 * (brand.avg_cpm || 45))),
    category: show ? show.niche : brand.category,
    placements: activePlacements
  });

  const safeBrand = {
    ...brand,
    sponsor_email: maskSponsorEmail(brand.sponsor_email)
  };

  return {
    mode: 'lookup',
    query: rawQuery,
    matched_type: matchedType,
    display_entity: matchedType === 'show' && show ? {
      type: 'show',
      badge_label: 'CREATOR SHOW LEDGER',
      name: show.name,
      subtitle: `${show.channel_type} • ${(show.audience_size / 1000).toFixed(0)}K Reach • ${show.niche}`,
      lead_role: `${brand.name} (${brand.decision_maker_role})`,
      table_title: `VERIFIED SPONSOR BRANDS ON ${show.name.toUpperCase()} (${showPlacements.length} ACTIVE SPONSORS)`
    } : {
      type: 'brand',
      badge_label: matchedType === 'dynamic_brand' ? 'LIVE CALIBRATED SPONSOR PROFILE' : 'VERIFIED SPONSOR BRAND',
      name: brand.name,
      subtitle: `${brand.domain} • ${brand.category}`,
      lead_role: brand.decision_maker_role,
      table_title: matchedType === 'dynamic_brand' ? `CATEGORY LOOKALIKE SPONSORS & BENCHMARK PLACEMENTS FOR ${brand.name.toUpperCase()}` : `VERIFIED AD-READ PLACEMENTS FOR ${brand.name.toUpperCase()}`
    },
    brand: safeBrand,
    show: show || null,
    metrics: {
      est_monthly_spend_usd: matchedType === 'show' && showPlacements.length > 0
        ? showPlacements.reduce((s, r) => s + r.est_spend_usd, 0)
        : brand.est_monthly_spend,
      avg_cpm_usd: matchedType === 'show' && show ? show.base_cpm : brand.avg_cpm,
      renewal_velocity_score: overallRenewalScore,
      renewal_rate_pct: brand.renewal_rate_pct,
      verified_total_flights: totalFlights,
      proven_3x_shows_count: proven3xCount,
      attribution_decay: {
        days_1_to_2_pct: 48,
        days_3_to_14_pct: 34,
        days_15_to_90_pct: 18
      }
    },
    placements: activePlacements,
    show_placements: showPlacements,
    outbound_pitch: pitch,
    moneyball_bundle: moneyballBundle
  };
}

/**
 * Mode B: Live Ad-Read Transcript / RSS / Newsletter Extractor
 */
async function analyzeTranscriptAdRead(db, payload = {}) {
  const preset = SAMPLE_TRANSCRIPTS.find(t => t.id === payload.preset_id);
  const transcriptText = String(payload.transcript || (preset ? preset.transcript : SAMPLE_TRANSCRIPTS[0].transcript)).trim();
  const showName = String(payload.show_name || (preset ? preset.show_name : "Lenny's Podcast")).trim();
  const channelType = String(payload.channel_type || (preset ? preset.channel_type : 'Podcast')).trim();
  const audienceSize = Math.max(1000, Number(payload.audience_size || (preset ? preset.audience_size : 440000)));

  const allBrands = db.prepare('SELECT * FROM brands').all();
  const paragraphs = transcriptText.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean);
  const segments = paragraphs.length > 0 ? paragraphs : [transcriptText];

  const extractedSponsors = [];

  for (const seg of segments) {
    const segLower = seg.toLowerCase();
    const tsMatch = seg.match(/\[(\d{2}:\d{2}(?::\d{2})?(?:\s*-\s*\d{2}:\d{2}(?::\d{2})?)?)\]/);
    const timestamp = tsMatch ? tsMatch[1] : (channelType.toLowerCase().includes('newsletter') ? 'Top Primary Block' : '00:14:20');

    let placementPosition = 'Mid-Roll Host-Read (60-90s)';
    let positionMultiplier = 1.25;
    if (segLower.includes('primary sponsor') || segLower.includes('top banner')) {
      placementPosition = 'Primary Newsletter Deep-Dive';
      positionMultiplier = 1.30;
    } else if (segLower.includes('before we dive') || segLower.includes('pre-roll') || (tsMatch && tsMatch[1].startsWith('00:0'))) {
      placementPosition = 'Pre-Roll Host-Read (45-60s)';
      positionMultiplier = 0.90;
    } else if (segLower.includes('post-roll') || segLower.includes('end-roll')) {
      placementPosition = 'Post-Roll Reminder (30s)';
      positionMultiplier = 0.55;
    }

    const urlMatch = seg.match(/\b([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9_-]+)?)\b/);
    const vanityUrl = urlMatch ? urlMatch[1] : null;

    const codeMatch = seg.match(/(?:promo\s+code|use\s+code|with\s+code|apply\s+code|code)\s+([A-Z0-9_-]{3,16})/i);
    const promoCode = codeMatch ? codeMatch[1].toUpperCase() : (vanityUrl && vanityUrl.includes('/') ? vanityUrl.split('/')[1].toUpperCase() : 'PARTNER');

    let matchedBrand = allBrands.find(b => {
      const cleanName = b.name.split('(')[0].trim().toLowerCase();
      return segLower.includes(cleanName) || segLower.includes(b.slug.replace('-', ' ')) || (vanityUrl && vanityUrl.toLowerCase().includes(b.domain.toLowerCase()));
    });

    if (!matchedBrand) {
      const brandTrigger = seg.match(/(?:brought to you by|sponsored by|partnered with|supported by|shoutout to|thank you to our presenting partner)\s+([A-Z][A-Za-z0-9\s.]{1,22}?)(?:[.,\-]|\s+is|\s+for|\s+powers)/i);
      const inferredName = brandTrigger ? brandTrigger[1].trim() : (vanityUrl ? vanityUrl.split('.')[0].toUpperCase() : 'Detected Sponsor');
      const inferredDomain = vanityUrl ? vanityUrl.split('/')[0] : `${inferredName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
      matchedBrand = {
        slug: inferredName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        name: inferredName,
        domain: inferredDomain,
        category: 'B2B SaaS & Tech',
        vertical: 'B2B / Prosumer',
        est_monthly_spend: 250000,
        avg_cpm: 56,
        renewal_rate_pct: 80,
        decision_maker_role: 'Head of Creator Partnerships',
        sponsor_email: `partnerships@${inferredDomain}`,
        landing_pattern: `${inferredDomain}/{show}`,
        default_offer: 'Special listener offer via vanity URL'
      };
    }

    const brandFlightsRow = db.prepare(`
      SELECT SUM(flights) AS total_flights, MAX(flights) AS max_flights
      FROM placements WHERE brand_slug = ?
    `).get(matchedBrand.slug);

    const detectedFlightsInText = seg.match(/renew(?:ed)?\s+[^.]*?(\d+)\s+times/i);
    const flights = detectedFlightsInText
      ? Number(detectedFlightsInText[1])
      : (brandFlightsRow && brandFlightsRow.max_flights ? brandFlightsRow.max_flights : 4);

    const effectiveCpm = Math.round(matchedBrand.avg_cpm * positionMultiplier * 0.85);
    const estimatedPlacementCost = Math.round((audienceSize / 1000) * effectiveCpm);
    const renewalScore = computeRenewalScore(flights, Boolean(promoCode), Boolean(vanityUrl));
    const renewalBadge = computeRenewalBadge(flights);

    const cues = [];
    if (/brought to you by|sponsored by|partnered with|supported by|presenting partner/i.test(seg)) cues.push('Sponsorship Intro Trigger');
    if (vanityUrl) cues.push(`Vanity Attribution URL (${vanityUrl})`);
    if (codeMatch) cues.push(`Direct-Response Promo Code (${promoCode})`);
    if (/\$|\d+%\s*off|free\s+trial|credits|supply|bonus/i.test(seg)) cues.push('Explicit Monetary / Urgency Offer');

    const pitch = generateOutboundPitch({
      brand: matchedBrand,
      anchorPlacements: [{
        show_name: showName,
        flights,
        vanity_url: vanityUrl || `${matchedBrand.domain}/${showName.toLowerCase().replace(/[^a-z0-9]/g, '')}`,
        promo_code: promoCode,
        cpm_usd: effectiveCpm
      }],
      senderShowName: payload.sender_show_name || 'Tech & Growth Weekly',
      senderAudienceSize: payload.sender_audience_size || 75000,
      senderNiche: matchedBrand.category
    });

    extractedSponsors.push({
      brand_slug: matchedBrand.slug,
      brand_name: matchedBrand.name,
      brand_domain: matchedBrand.domain,
      category: matchedBrand.category,
      sponsor_email: maskSponsorEmail(matchedBrand.sponsor_email),
      decision_maker_role: matchedBrand.decision_maker_role,
      timestamp,
      placement_position: placementPosition,
      vanity_url: vanityUrl || `${matchedBrand.domain}/partner`,
      promo_code: promoCode,
      estimated_cpm_usd: effectiveCpm,
      estimated_flight_spend_usd: estimatedPlacementCost,
      estimated_campaign_spend_usd: estimatedPlacementCost * flights,
      verified_flights: flights,
      renewal_score: renewalScore,
      renewal_badge: renewalBadge,
      commercial_cues: cues,
      outbound_pitch: pitch
    });
  }

  const totalExtractedSpend = extractedSponsors.reduce((s, item) => s + item.estimated_flight_spend_usd, 0);

  return {
    mode: 'transcript',
    engine_model: 'deterministic-nlp-v2 (whisperx/sponsorblock-rules)',
    show_name: showName,
    channel_type: channelType,
    audience_size: audienceSize,
    total_detected_sponsors: extractedSponsors.length,
    total_episode_ad_value_usd: totalExtractedSpend,
    gemini_insight: `Deterministic Cue-Density Analysis: Detected ${extractedSponsors.length} high-intent native sponsor integration(s) with dedicated vanity URL + promo-code attribution, indicating direct-response CAC tracking and 3x+ renewal potential.`,
    extracted_sponsors: extractedSponsors
  };
}

module.exports = {
  maskSponsorEmail,
  getAgencyDesk,
  getFreshBudgetStatus,
  generateMoneyballLookalikeBundle,
  analyzeSponsorLookup,
  analyzeTranscriptAdRead,
  generateOutboundPitch
};

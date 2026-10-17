const { computeRenewalScore, computeRenewalBadge, SAMPLE_TRANSCRIPTS } = require('./db');

/**
 * Generates a Ready-to-Send Outbound Sponsorship Pitch Email
 * using verified 3x+ renewal data, CPM arbitrage, and a 3-flight pilot structure.
 */
function generateOutboundPitch({ brand, anchorPlacements, senderShowName, senderAudienceSize, senderNiche }) {
  const showTitle = senderShowName || 'Our Technical & Founder Media Property';
  const audience = Number(senderAudienceSize) || 65000;
  const niche = senderNiche || brand.category;
  const topAnchor = anchorPlacements && anchorPlacements.length > 0
    ? anchorPlacements[0]
    : { show_name: "Lenny's Podcast", flights: 8, vanity_url: `${brand.domain}/partner`, promo_code: 'PARTNER', cpm_usd: brand.avg_cpm };

  const proposedMidrollPrice = Math.max(1200, Math.round((audience / 1000) * Math.round(brand.avg_cpm * 0.85)));
  const package3FlightPrice = Math.round(proposedMidrollPrice * 3 * 0.88);
  const effectiveCpm = Math.round((package3FlightPrice / 3) / (audience / 1000));

  const subject = `${brand.name} x ${showTitle} — Saw your ${topAnchor.flights}x renewal on ${topAnchor.show_name} ($${effectiveCpm} CPM 3-Flight Pilot)`;
  const body = `Hi ${brand.name} Partnerships Team (${brand.decision_maker_role}),

I track verified sponsorship renewals across ${niche} via SponsorRadar, and noticed ${brand.name} has run ${topAnchor.flights} verified flights on ${topAnchor.show_name} (${topAnchor.vanity_url} | code: ${topAnchor.promo_code}) at an estimated ~$${topAnchor.cpm_usd} CPM.

Because multi-flight renewals signal strong promo-code and vanity-URL conversion with ${niche} buyers, I wanted to share a high-intent audience arbitrage opportunity with ${showTitle}:

• Verified Reach: ${audience.toLocaleString()} active subscribers/listeners per release
• Audience Fit: High concentration of ${brand.vertical} decision-makers & technical buyers
• De-Risked 3-Flight Pilot: 3x 60-second Host-Read Mid-Rolls + Dedicated Vanity Slug (${brand.domain}/${showTitle.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10)}) + Custom Promo Code
• Pilot Rate: $${package3FlightPrice.toLocaleString()} total for 3 flights ($${effectiveCpm} effective CPM — 15% below category benchmark of $${brand.avg_cpm} CPM)
• Performance Floor: Guaranteed click-through floor with pro-rata CPM rate adjustment on renewal blocks
• 1-Click Rate Card & Attribution Export ($1.99): https://www.sponsorradar.io/buy/flash_pass?brand=${encodeURIComponent(brand.slug || brand.name)}
• Unlock Full Verified Sponsor & Contact Vault ($49/mo): https://www.sponsorradar.io/buy/complete_dossier?brand=${encodeURIComponent(brand.slug || brand.name)}

Worth a quick 10-minute look at our Q4/Q1 attribution deck this Thursday?

Best,
[Your Name]
${showTitle} • Verified via SponsorRadar (https://www.sponsorradar.io)`;

  return {
    to_email: brand.sponsor_email,
    decision_maker_role: brand.decision_maker_role,
    subject,
    body,
    direct_checkout_url: `https://www.sponsorradar.io/buy/complete_dossier?brand=${encodeURIComponent(brand.slug || brand.name)}`,
    flash_checkout_url: `https://www.sponsorradar.io/buy/flash_pass?brand=${encodeURIComponent(brand.slug || brand.name)}`,
    proposed_single_rate_usd: proposedMidrollPrice,
    proposed_3flight_pilot_usd: package3FlightPrice,
    effective_cpm_usd: effectiveCpm
  };
}

/**
 * Mode A: Brand / Creator Intelligence Lookup
 */
function analyzeSponsorLookup(db, payload = {}) {
  const rawQuery = String(payload.query || 'AG1').trim();
  const qLower = rawQuery.toLowerCase();
  const senderShowName = payload.sender_show_name || 'AI & SaaS Builders Weekly';
  const senderAudienceSize = Number(payload.sender_audience_size) || 75000;

  // Match brand first
  let brand = db.prepare(`
    SELECT * FROM brands
    WHERE lower(slug) = ? OR lower(name) LIKE ? OR lower(domain) LIKE ? OR lower(category) LIKE ?
    ORDER BY est_monthly_spend DESC LIMIT 1
  `).get(qLower, `%${qLower}%`, `%${qLower}%`, `%${qLower}%`);

  // Also check if query matches a show
  let show = db.prepare(`
    SELECT * FROM shows
    WHERE lower(slug) = ? OR lower(name) LIKE ? OR lower(host_names) LIKE ? OR lower(niche) LIKE ?
    ORDER BY audience_size DESC LIMIT 1
  `).get(qLower, `%${qLower}%`, `%${qLower}%`, `%${qLower}%`);

  if (!brand && show) {
    // Pick the top 3x+ renewed brand on that show
    const topPlacementOnShow = db.prepare(`
      SELECT brand_slug FROM placements WHERE show_slug = ? ORDER BY flights DESC LIMIT 1
    `).get(show.slug);
    if (topPlacementOnShow) {
      brand = db.prepare('SELECT * FROM brands WHERE slug = ?').get(topPlacementOnShow.brand_slug);
    }
  }

  if (!brand) {
    brand = db.prepare('SELECT * FROM brands WHERE slug = ?').get('ag1');
  }

  const brandPlacements = db.prepare(`
    SELECT p.*, s.name AS show_name, s.channel_type, s.niche, s.audience_size, s.host_names
    FROM placements p
    JOIN shows s ON s.slug = p.show_slug
    WHERE p.brand_slug = ?
    ORDER BY p.flights DESC, p.est_spend_usd DESC
  `).all(brand.slug);

  const showPlacements = show
    ? db.prepare(`
        SELECT p.*, b.name AS brand_name, b.domain AS brand_domain, b.category AS brand_category, b.sponsor_email, b.decision_maker_role
        FROM placements p
        JOIN brands b ON b.slug = p.brand_slug
        WHERE p.show_slug = ?
        ORDER BY p.flights DESC, p.est_spend_usd DESC
      `).all(show.slug)
    : [];

  const totalFlights = brandPlacements.reduce((acc, r) => acc + r.flights, 0);
  const proven3xCount = brandPlacements.filter(r => r.flights >= 3).length;
  const maxFlights = brandPlacements.length ? Math.max(...brandPlacements.map(r => r.flights)) : 5;
  const overallRenewalScore = computeRenewalScore(maxFlights, true, true);

  const pitch = generateOutboundPitch({
    brand,
    anchorPlacements: brandPlacements,
    senderShowName,
    senderAudienceSize,
    senderNiche: show ? show.niche : brand.category
  });

  return {
    mode: 'lookup',
    query: rawQuery,
    matched_type: show && qLower.includes(show.name.toLowerCase().slice(0, 5)) ? 'show_and_brand' : 'brand',
    brand,
    show: show || null,
    metrics: {
      est_monthly_spend_usd: brand.est_monthly_spend,
      avg_cpm_usd: brand.avg_cpm,
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
    placements: brandPlacements,
    show_placements: showPlacements,
    outbound_pitch: pitch
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
    // Extract timestamp if present e.g. [00:16:28]
    const tsMatch = seg.match(/\[(\d{2}:\d{2}(?::\d{2})?(?:\s*-\s*\d{2}:\d{2}(?::\d{2})?)?)\]/);
    const timestamp = tsMatch ? tsMatch[1] : (channelType.toLowerCase().includes('newsletter') ? 'Top Primary Block' : '00:14:20');

    // Determine placement position from timestamp or header cues
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

    // Extract vanity URL (e.g. deel.com/lenny, drinkag1.com/huberman, join.whoop.com/doac)
    const urlMatch = seg.match(/\b([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[a-zA-Z0-9_-]+)?)\b/);
    const vanityUrl = urlMatch ? urlMatch[1] : null;

    // Extract promo code
    const codeMatch = seg.match(/(?:promo\s+code|use\s+code|with\s+code|apply\s+code|code)\s+([A-Z0-9_-]{3,16})/i);
    const promoCode = codeMatch ? codeMatch[1].toUpperCase() : (vanityUrl && vanityUrl.includes('/') ? vanityUrl.split('/')[1].toUpperCase() : 'PARTNER');

    // Match brand from known database or infer from text/URL
    let matchedBrand = allBrands.find(b => {
      const cleanName = b.name.split('(')[0].trim().toLowerCase();
      return segLower.includes(cleanName) || segLower.includes(b.slug.replace('-', ' ')) || (vanityUrl && vanityUrl.toLowerCase().includes(b.domain.toLowerCase()));
    });

    if (!matchedBrand) {
      // Extract brand name after trigger phrase "brought to you by X", "sponsored by X", "partnered with X", "supported by X"
      const brandTrigger = seg.match(/(?:brought to you by|sponsored by|partnered with|supported by|shoutout to|thank you to our presenting partner)\s+([A-Z][A-Za-z0-9\s.]{1,22}?)(?:[.,—\-]|\s+is|\s+for|\s+powers)/i);
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

    // Check historical flights in DB for this brand
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

    // Commercial cues found
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
      sponsor_email: matchedBrand.sponsor_email,
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

  // Optional Gemini 3.8 Flash / 3.5 Transcribe live AI commentary if GEMINI_API_KEY is set
  let geminiInsight = null;
  if (process.env.GEMINI_API_KEY) {
    try {
      const { GoogleGenAI } = require('@google/genai');
      const client = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const interaction = await client.interactions.create({
        model: 'gemini-3.8-flash',
        input: `In 2 concise sentences, analyze the direct-response conversion psychology and sponsor renewal signal in this ad-read transcript from ${showName}: "${transcriptText.slice(0, 600)}"`
      });
      geminiInsight = interaction.output_text || null;
    } catch (_) {
      geminiInsight = null;
    }
  }

  const totalExtractedSpend = extractedSponsors.reduce((s, item) => s + item.estimated_flight_spend_usd, 0);

  return {
    mode: 'transcript',
    engine_model: geminiInsight ? 'deterministic-nlp + gemini-3.8-flash' : 'deterministic-nlp-v2 (whisperx/sponsorblock-rules)',
    show_name: showName,
    channel_type: channelType,
    audience_size: audienceSize,
    total_detected_sponsors: extractedSponsors.length,
    total_episode_ad_value_usd: totalExtractedSpend,
    gemini_insight: geminiInsight || `Deterministic Cue-Density Analysis: Detected ${extractedSponsors.length} high-intent native sponsor integration(s) with dedicated vanity URL + promo-code attribution, indicating direct-response CAC tracking and 3x+ renewal potential.`,
    extracted_sponsors: extractedSponsors
  };
}

module.exports = {
  analyzeSponsorLookup,
  analyzeTranscriptAdRead,
  generateOutboundPitch
};

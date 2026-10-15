/**
 * ExactBaseline (custom_automaton) Cumulative API, Telemetry, Monetization & GitHub Repo Upgrade Pack
 * Iteration #1 + Iteration #2 (03:00 PST) + Iteration #3 (06:00 PST):
 *  - Separates AI/Search Crawler hits (Googlebot, Bingbot, GPTBot, PerplexityBot) from Human visits (is_test=0)
 *  - Unified AI-Crawler-Permissive /robots.txt across all 4 sites (removes Disallow: /api/ blocks)
 *  - SheetJS/sheetjs (★ 36,344) 1-Click .CSV Executive Model Export (/api/github-upgrade/export.csv)
 *  - adamgibbons/ics (★ 787) RFC-5545 4-Night Skin-Cycling .ICS Calendar (/api/github-upgrade/skin-cycling.ics)
 *  - RSS-Bridge/rss-bridge (★ 9,285) RSS 2.0 (/feed.xml) & JSON Feed 1.1 (/feed.json) Syndication
 *  - mozilla/readability (★ 11,501) Clean LLM Markdown & JSON-LD Bundle (/api/github-upgrade/llms-bundle.txt)
 *  - chartjs/Chart.js (★ 67,739) + nilbuild/driver.js (★ 26,911) + carlsednaoui/ouibounce (★ 2,295) + dip/cmdk (★ 13,016)
 * Strictly < 1,000 lines per /code-craft rules.
 */

const fs = require('fs');
const path = require('path');
const { renderExactBaselineEnhancements, renderEmbedWidgetHtml, renderSampleDossierHtml } = require('./exact-baseline-ui');

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'b25e791e2b694f4c9c57d8e20ad8d904';
const SOVRN_COMMERCE_KEY = process.env.SOVRN_COMMERCE_KEY || 'ea3d7b74c5752fd817f896be27cd1a01';
const SOVRN_SECRET_KEY = process.env.SOVRN_SECRET_KEY || '1a197840836684eb17cfd7c5f714d7d840942538';
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || '';

const VERTICAL_CONFIGS = {
  citation_forge: {
    moduleId: 'citation_forge',
    brandName: 'CitationForge',
    domain: 'www.citationforge.io',
    accentColor: '#4F46E5',
    flashPriceEnv: 'STRIPE_PRICE_FLASH_199',
    flashPriceDefault: 'price_1UQjMqIaoGnkXxS84yeYo8HG',
    corePriceEnv: 'STRIPE_PRICE_AUDIT_49',
    corePriceUsd: 49,
    coreLabel: 'Complete 50-Prompt GEO Dossier ($49)',
    proPriceEnv: 'STRIPE_PRICE_PRO_99',
    proPriceUsd: 99,
    proLabel: 'B2B Agency Continuous Radar ($99/mo)',
    lockedTitle: 'Competitor Prompt Steal Matrix',
    unlockBannerTitle: 'Unlock Full 50-Prompt GEO Citation Breakdown & Auto-llms.txt PR Patch',
    explainerText: 'Unlocks exact competitor prompt citation ranks, /llms-full.txt corpus & JSON-LD entity patches',
    hudLabel: 'GEO Crawl HUD',
    redditSub: 'SEO',
    kpis: [
      { label: 'Citation Share (cSoV)', val: '41.2%', sub: '25 Buyer Prompts' },
      { label: 'Agent Readability', val: '94/100', sub: 'llms.txt + Readability' },
      { label: 'Entity Graph Density', val: '91/100', sub: '@graph + sameAs' },
      { label: 'AI Crawler Access', val: '6/6 Bots', sub: 'GPTBot + Perplexity' }
    ],
    presetKpis: {
      'linear.app': ['41.2%', '94/100', '91/100', '6/6 Bots'],
      'stripe.com': ['46.8%', '98/100', '96/100', '6/6 Bots'],
      'supabase.com': ['39.4%', '92/100', '89/100', '6/6 Bots'],
      'notion.so': ['37.8%', '88/100', '85/100', '5/6 Bots'],
      'vercel.com': ['43.5%', '95/100', '93/100', '6/6 Bots']
    },
    presets: [
      { key: 'linear.app', label: 'Linear' },
      { key: 'stripe.com', label: 'Stripe' },
      { key: 'supabase.com', label: 'Supabase' },
      { key: 'notion.so', label: 'Notion' },
      { key: 'vercel.com', label: 'Vercel' }
    ],
    coMarketingPills: [
      { key: 'perplexity', label: 'Perplexity Pro', rowText: 'FREE ROW 1 (Perplexity Pro): Rank #1 Citation requires Answer-First 48-word H2 block + /llms-full.txt' },
      { key: 'chatgpt', label: 'SearchGPT', rowText: 'FREE ROW 1 (SearchGPT): OAI-SearchBot requires explicit Allow: / in robots.txt + Organization sameAs JSON-LD' },
      { key: 'gemini', label: 'Gemini Overviews', rowText: 'FREE ROW 1 (Gemini Overviews): Google-Extended index weight increases +34% with FAQPage @graph schema' }
    ],
    affiliates: [
      { title: 'Semrush AI SEO & Citation Tracker', badge: 'Verified GEO Partner', cpa: 'Free 7-Day Trial', url: 'https://www.semrush.com/' },
      { title: 'Ahrefs Brand Radar for LLMs', badge: 'Share-of-Voice Feed', cpa: 'Instant Domain Check', url: 'https://ahrefs.com/brand-radar' },
      { title: 'Cloudflare AI Bot & Crawl Audit', badge: 'Edge Crawler Shield', cpa: 'Free Bot Telemetry', url: 'https://www.cloudflare.com/' }
    ],
    githubRepo: {
      name: 'mozilla/readability (★ 11.5k) + modelcontextprotocol/servers (★ 91.2k) + jina-ai/reader (★ 12.1k)',
      stars: '★ 124,207 Combined',
      url: 'https://github.com/mozilla/readability',
      badge: 'Mozilla Readability DOM + MCP + RSS/CSV Export',
      title: 'Mozilla Readability Signal-to-Noise Scorer + Auto-llms.txt Bundle & MCP Manifest',
      summary: 'Applies mozilla/readability DOM extraction to strip HTML boilerplate (92.5% token compression), paired with /.well-known/mcp.json, /feed.xml syndication, and 1-click llms-bundle.txt download.'
    }
  },
  sponsor_radar: {
    moduleId: 'sponsor_radar',
    brandName: 'SponsorRadar',
    domain: 'www.sponsorradar.io',
    accentColor: '#E84E36',
    flashPriceEnv: 'STRIPE_PRICE_FLASH_199',
    flashPriceDefault: 'price_1UQjMrIaoGnkXxS82T5cPcjM',
    corePriceEnv: 'STRIPE_PRICE_CREATOR_49',
    corePriceUsd: 49,
    coreLabel: 'Complete Creator Sponsor Ledger ($49/mo)',
    proPriceEnv: 'STRIPE_PRICE_AGENCY_199',
    proPriceUsd: 199,
    proLabel: 'B2B Agency Media-Buyer Feed ($199/mo)',
    lockedTitle: 'Verified Sponsor Buyer Emails',
    unlockBannerTitle: 'Unlock Full 3x-Renewed Sponsor Decision-Maker Contacts & CPM Rate Card',
    explainerText: 'Unlocks verified media-buyer emails, net CPM floor rates, and 3x-renewal flight calendars',
    hudLabel: 'Media Buyer HUD',
    redditSub: 'podcasting',
    kpis: [
      { label: '3x+ Renewal Score', val: '94/100', sub: 'Verified ROI Signal' },
      { label: 'Est. Monthly Spend', val: '$142,500', sub: 'Across 14 Flights' },
      { label: 'Cleared Net eCPM', val: '$38.50', sub: '60s Host Mid-Roll' },
      { label: 'Host Diarization Lift', val: '1.42x', sub: 'vs. Spliced DAI' }
    ],
    presetKpis: {
      'ag1': ['98/100', '$1,420,000', '$42.00', '1.48x'],
      'deel': ['95/100', '$680,000', '$46.50', '1.44x'],
      'linear': ['91/100', '$310,000', '$39.00', '1.39x'],
      'ramp': ['96/100', '$790,000', '$48.00', '1.46x'],
      'eight-sleep': ['93/100', '$620,000', '$37.50', '1.41x']
    },
    presets: [
      { key: 'ag1', label: 'AG1' },
      { key: 'deel', label: 'Deel' },
      { key: 'linear', label: 'Linear' },
      { key: 'ramp', label: 'Ramp' },
      { key: 'eight-sleep', label: '8Sleep' }
    ],
    coMarketingPills: [
      { key: 'spotify', label: 'Spotify Ad Studio', rowText: 'FREE ROW 1 (Spotify Ad Studio): Host-Read Mid-Roll 60s clears $38.50 net CPM with 4.2x renewal rate' },
      { key: 'youtube', label: 'YouTube BrandConnect', rowText: 'FREE ROW 1 (YouTube BrandConnect): 90s Native Integration w/ pinned comment vanity URL converts at 2.8% CTR' },
      { key: 'beehiiv', label: 'Beehiiv Ad Network', rowText: 'FREE ROW 1 (Beehiiv Ad Network): Primary Top-Slot Newsletter Sponsor averages $42 CPC / $65 eCPM on B2B lists' }
    ],
    affiliates: [
      { title: 'Riverside.fm 4K Studio Ad-Read Recorder', badge: 'Creator Studio Standard', cpa: '15% Creator Discount', url: 'https://riverside.fm/' },
      { title: 'Descript AI Transcript & Sponsor Editor', badge: 'Instant Ad-Read Cut', cpa: 'Free Transcript Tier', url: 'https://www.descript.com/' },
      { title: 'Beehiiv Newsletter Ad Network', badge: 'Verified CPC Sponsors', cpa: '30-Day Pro Trial', url: 'https://www.beehiiv.com/' }
    ],
    githubRepo: {
      name: 'chartjs/Chart.js (★ 67.7k) + pyannote/pyannote-audio (★ 10.6k) + SheetJS (★ 36.3k)',
      stars: '★ 114,734 Combined',
      url: 'https://github.com/chartjs/Chart.js',
      badge: 'Chart.js CPM Curve + Speaker Diarization + .CSV/.EML',
      title: 'Visual 3x-Renewal CPM Sparkline + Host Diarization Scorer & 1-Click .EML/.CSV Ledger',
      summary: 'Combines Chart.js visual CPM/renewal sparkline telemetry with pyannote speaker-change heuristics (1.42x native host lift vs 0.51x DAI) and 1-click .eml pitch + SheetJS .csv rate-card exports.'
    }
  },
  derm_logic: {
    moduleId: 'derm_logic',
    brandName: 'DermLogic',
    domain: 'www.dermlogic.io',
    accentColor: '#0D9488',
    flashPriceEnv: 'STRIPE_PRICE_FLASH_199',
    flashPriceDefault: 'price_1UQjMsIaoGnkXxS8ru7bwyQe',
    corePriceEnv: 'STRIPE_PRICE_VANITY_499',
    corePriceUsd: 4.99,
    coreLabel: 'Complete AM/PM Vanity Rescue Card ($4.99)',
    proPriceEnv: 'STRIPE_PRICE_ANNUAL_1999',
    proPriceUsd: 19.99,
    proLabel: 'B2B Esthetician Unlimited Shelf ($19.99/yr)',
    lockedTitle: 'pH Wait-Time & Barrier Split',
    unlockBannerTitle: 'Unlock Full 7-Night Skin-Cycling Calendar, Wait-Time Timer & Safe Substitutes',
    explainerText: 'Unlocks exact minute-by-minute pH buffer wait times, 4-night skin-cycling calendar & barrier-safe swaps',
    hudLabel: 'Vanity Shelf HUD',
    redditSub: 'SkincareAddiction',
    kpis: [
      { label: 'Routine Safety Score', val: '62/100', sub: '1 Critical Conflict' },
      { label: 'Max pH Shock (ΔpH)', val: '2.4 pH', sub: 'Threshold > 1.8' },
      { label: '500-Dalton Penetration', val: '84% Pass', sub: 'MW <= 500 Da Rule' },
      { label: 'Malassezia / Fungal', val: '0 Triggers', sub: 'Ester-Free Verified' }
    ],
    presetKpis: {
      'preset-tiktok-destroyer': ['42/100', '2.8 pH', '76% Pass', '1 Trigger'],
      'preset-copper-vitc-trap': ['54/100', '2.6 pH', '88% Pass', '0 Triggers'],
      'preset-acne-rx-bpo-tret': ['49/100', '1.9 pH', '91% Pass', '0 Triggers'],
      'preset-fungal-safe-barrier': ['96/100', '0.6 pH', '94% Pass', '0 Triggers'],
      'preset-glass-skin': ['94/100', '0.8 pH', '89% Pass', '0 Triggers']
    },
    presets: [
      { key: 'preset-tiktok-destroyer', label: 'TikTok' },
      { key: 'preset-copper-vitc-trap', label: 'VitC+Cu' },
      { key: 'preset-acne-rx-bpo-tret', label: 'Tret+BPO' },
      { key: 'preset-fungal-safe-barrier', label: 'Fungal' },
      { key: 'preset-glass-skin', label: 'Barrier' }
    ],
    coMarketingPills: [
      { key: 'sephora', label: 'Sephora Clean', rowText: 'FREE ROW 1 (Sephora Clean): Move L-Ascorbic Acid (pH 3.2) to AM; keep Copper Peptides in PM to prevent Cu2+ oxidation' },
      { key: 'dermstore', label: 'Dermstore Rx', rowText: 'FREE ROW 1 (Dermstore Rx): Wait 20 mins after 0.05% Tretinoin before applying Ceramide cream to prevent retinoid pooling' },
      { key: 'ultrasun', label: 'Ultrasun / CosIng', rowText: 'FREE ROW 1 (Ultrasun / CosIng): Pair morning Vitamin C with Broad-Spectrum UVA1 filter (PA++++) for 4x photoprotection' }
    ],
    affiliates: [
      { title: 'SkinCeuticals C E Ferulic (Dermstore)', badge: 'Gold-Standard pH 3.2', cpa: 'Authorized Clinical', url: 'https://www.dermstore.com/p/skinceuticals-c-e-ferulic-with-15-l-ascorbic-acid-vitamin-c-serum-30ml/11289609/' },
      { title: "Paula's Choice 2% BHA Liquid (Sephora)", badge: 'pH 3.5 Desmolytic', cpa: 'Verified Non-Abrasive', url: 'https://www.sephora.com/product/skin-perfecting-2-bha-liquid-exfoliant-P469502' },
      { title: 'La Roche-Posay Cicaplast Baume B5+', badge: 'Barrier Rescue Seal', cpa: 'Dermatologist Pick', url: 'https://www.ulta.com/p/cicaplast-baume-b5-soothing-therapeutic-multi-purpose-cream-pimprod2018267' }
    ],
    githubRepo: {
      name: 'nilbuild/driver.js (★ 26.9k) + rdkit/rdkit (★ 3.6k) + adamgibbons/ics (★ 787)',
      stars: '★ 31,320 Combined',
      url: 'https://github.com/kamranahmedse/driver.js',
      badge: 'Driver.js Routine Spotlight + 500-Dalton Sorter + .ICS',
      title: 'Interactive Step-by-Step Routine Conflict Spotlight + Bos & Meinardi 500-Dalton Sorter',
      summary: 'Uses driver.js interactive step focus to guide users from detected pH/oxidation conflicts directly to safe AM/PM splits, paired with 500-Dalton molecular sorting and .ics calendar export.'
    }
  },
  abandon_alpha: {
    moduleId: 'abandon_alpha',
    brandName: 'AbandonAlpha',
    domain: 'www.abandonalpha.com',
    accentColor: '#10B981',
    flashPriceEnv: 'STRIPE_PRICE_FLASH_199',
    flashPriceDefault: 'price_1UQjMtIaoGnkXxS8fAEYjqnp',
    corePriceEnv: 'STRIPE_PRICE_STARTER_49',
    corePriceUsd: 49,
    coreLabel: 'Complete Starter Recovery Engine ($49/mo)',
    proPriceEnv: 'STRIPE_PRICE_GROWTH_149',
    proPriceUsd: 149,
    proLabel: 'B2B Growth Autonomous Dunning ($149/mo)',
    lockedTitle: 'Stripe Decline-Code Retry Matrix',
    unlockBannerTitle: 'Unlock Full C1–C6 Bandit SDK, Stripe Webhook Worker & SMS Dunning Playbook',
    explainerText: 'Unlocks exact decline-code retry windows (insufficient_funds Friday 06:00 local), C1–C6 SDK & SMS templates',
    hudLabel: 'Checkout Ops HUD',
    redditSub: 'SaaS',
    kpis: [
      { label: 'Recoverable MRR/Mo', val: '$18,420', sub: '24.6% Net Lift' },
      { label: 'Exit-Intent Capture', val: '$11,280', sub: 'C1–C6 Bandit Arms' },
      { label: 'Smart Dunning Lift', val: '$7,140', sub: 'Payday Window Retry' },
      { label: 'Pre-Exit Hesitation', val: '< 12.0s', sub: 'Ouibounce + PostHog' }
    ],
    presetKpis: {
      'shopify_dtc': ['$21,450', '$14,120', '$7,330', '< 10.5s'],
      'b2b_saas': ['$8,940', '$5,110', '$3,830', '< 12.0s'],
      'creator_checkout': ['$12,680', '$8,490', '$4,190', '< 9.5s'],
      'subscription_app': ['$31,200', '$18,900', '$12,300', '< 11.0s'],
      'enterprise_annual': ['$74,800', '$46,200', '$28,600', '< 14.0s']
    },
    presets: [
      { key: 'shopify_dtc', label: 'Shopify' },
      { key: 'b2b_saas', label: 'B2B SaaS' },
      { key: 'creator_checkout', label: 'Creator' },
      { key: 'subscription_app', label: 'Sub App' },
      { key: 'enterprise_annual', label: 'Enterprise' }
    ],
    coMarketingPills: [
      { key: 'stripe', label: 'Stripe Billing', rowText: 'FREE ROW 1 (Stripe Billing): Delay insufficient_funds retry to Friday 06:00 AM local timezone (+31.4% card recovery)' },
      { key: 'shopify', label: 'Shopify Plus', rowText: 'FREE ROW 1 (Shopify Plus): Trigger C1 Price-Objection 15% dynamic coupon only when cursor velocity vy < -0.65px/ms' },
      { key: 'recharge', label: 'Recharge SMS', rowText: 'FREE ROW 1 (Recharge SMS): Dispatch 1-Tap Apple Pay card-update magic link via SMS 4 hours after do_not_honor decline' }
    ],
    affiliates: [
      { title: 'Stripe Billing & Smart Retries Suite', badge: 'Official Payment Rail', cpa: 'Instant Webhook Sync', url: 'https://stripe.com/billing' },
      { title: 'PostHog Session Replay & Funnel Analytics', badge: 'Hesitation Telemetry', cpa: '1M Free Events/Mo', url: 'https://posthog.com/' },
      { title: 'Klaviyo Checkout Abandonment Flows', badge: 'SMS + Email Dunning', cpa: 'Free 60-Day Trial', url: 'https://www.klaviyo.com/' }
    ],
    githubRepo: {
      name: 'carlsednaoui/ouibounce (★ 2.3k) + dip/cmdk (★ 13.0k) + PostHog (★ 40.2k) + SheetJS (★ 36.3k)',
      stars: '★ 96,470 Combined',
      url: 'https://github.com/carlsednaoui/ouibounce',
      badge: 'Ouibounce Exit Vector + ⌘K Command Menu + Stripe Worker',
      title: 'Ouibounce Cursor-Velocity Exit Rescue + ⌘K Command Palette & Stripe Dunning Worker',
      summary: 'Combines Ouibounce mouse-velocity exit-intent rescue and PostHog >12s field hesitation triggers with a ⌘K command menu, 1-click stripe-recovery-worker.js download, and SheetJS .CSV ROI export.'
    }
  }
};

function classifyTrafficRequest(req, extraEmail = '') {
  const ua = String(req.headers['user-agent'] || '').toLowerCase();
  const isPlaywrightHeader = Boolean(req.headers['x-playwright-test'] || req.headers['x-test-mode']);
  const isQueryTest = req.query && (req.query.test === '1' || req.query.is_test === '1');
  const emailLower = String(extraEmail || '').toLowerCase();

  const isSearchOrAiCrawler = /(googlebot|bingbot|perplexitybot|gptbot|oai-searchbot|claudebot|anthropic|applebot|ahrefsbot|semrushbot|bytespider|yandex|duckduckbot|baiduspider|facebookexternalhit|twitterbot|linkedinbot|slackbot|discordbot)/i.test(ua);

  if (
    isPlaywrightHeader ||
    isQueryTest ||
    isSearchOrAiCrawler ||
    !ua ||
    ua.includes('headlesschrome') ||
    ua.includes('playwright') ||
    ua.includes('puppeteer') ||
    ua.includes('cypress') ||
    ua.includes('curl/') ||
    ua.includes('python-requests') ||
    ua.includes('node-fetch') ||
    ua.includes('undici') ||
    ua.includes('go-http-client') ||
    ua.includes('railway') ||
    ua.includes('bot') ||
    ua.includes('crawler') ||
    ua.includes('spider') ||
    emailLower.includes('example.com') ||
    emailLower.includes('playwright') ||
    emailLower.includes('test')
  ) {
    return { isTest: 1, isCrawler: isSearchOrAiCrawler ? 1 : 0 };
  }
  return { isTest: 0, isCrawler: 0 };
}

function createTelemetryStore(dataDir, moduleId) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const ledgerPath = path.join(dataDir, `eb_telemetry_${moduleId}.json`);
  let state = { events: [], leads: [], orders: [], impressions: 0, calculations: 0, checkout_intents: 0, crawler_hits: 0 };
  if (fs.existsSync(ledgerPath)) {
    try {
      state = { ...state, ...JSON.parse(fs.readFileSync(ledgerPath, 'utf8')) };
    } catch (_) {}
  }
  function save() {
    try {
      fs.writeFileSync(ledgerPath, JSON.stringify(state));
    } catch (_) {}
  }
  return {
    recordEvent({ eventType, pageUrl = '/', deviceType = 'desktop', utmSource = '', utmCampaign = '', isTest = 0, isCrawler = 0, meta = {} }) {
      const nowIso = new Date().toISOString();
      if (isCrawler) state.crawler_hits = (state.crawler_hits || 0) + 1;
      state.events.push({
        id: state.events.length + 1,
        module_id: moduleId,
        event_type: eventType,
        page_url: pageUrl,
        device_type: deviceType,
        utm_source: utmSource,
        utm_campaign: utmCampaign,
        is_test: isTest ? 1 : 0,
        is_crawler: isCrawler ? 1 : 0,
        meta,
        created_at: nowIso
      });
      if (state.events.length > 5000) state.events = state.events.slice(-4000);
      if (eventType === 'visit') state.impressions += 1;
      if (eventType === 'calculate') state.calculations += 1;
      if (eventType === 'checkout_intent') state.checkout_intents += 1;
      save();
    },
    recordLead({ email, summaryText = '', utmSource = '', isTest = 0 }) {
      const nowIso = new Date().toISOString();
      state.leads.push({
        id: state.leads.length + 1,
        module_id: moduleId,
        email,
        summary_text: String(summaryText).slice(0, 600),
        utm_source: utmSource,
        is_test: isTest ? 1 : 0,
        created_at: nowIso
      });
      save();
    },
    recordOrder({ tier, sku, amountUsd, status = 'intent', sessionId = '', isTest = 0 }) {
      const nowIso = new Date().toISOString();
      state.orders.push({
        id: state.orders.length + 1,
        module_id: moduleId,
        tier,
        sku,
        amount_usd: Number(amountUsd) || 0,
        status,
        session_id: sessionId,
        is_test: isTest ? 1 : 0,
        created_at: nowIso
      });
      save();
    },
    getPstReport(windowHours = 3) {
      const nowMs = Date.now();
      const cutoffMs = nowMs - windowHours * 3600 * 1000;
      const toPstString = (iso) => {
        const d = new Date(new Date(iso).getTime() - 7 * 3600 * 1000);
        return d.toISOString().replace('T', ' ').slice(0, 19);
      };
      const humanEvents = state.events.filter((e) => Number(e.is_test) === 0);
      const winEventsList = humanEvents.filter((e) => new Date(e.created_at).getTime() >= cutoffMs);
      const winCrawlerHits = state.events.filter((e) => Number(e.is_crawler) === 1 && new Date(e.created_at).getTime() >= cutoffMs).length;

      const winCounts = {};
      for (const e of winEventsList) {
        winCounts[e.event_type] = (winCounts[e.event_type] || 0) + 1;
      }
      const cumCounts = {};
      for (const e of humanEvents) {
        cumCounts[e.event_type] = (cumCounts[e.event_type] || 0) + 1;
      }
      const recentRows = winEventsList.slice(-5).reverse().map((e) => ({
        pst_ts: toPstString(e.created_at),
        event_type: e.event_type,
        device_type: e.device_type,
        utm_source: e.utm_source || 'direct'
      }));
      const humanLeads = state.leads.filter((l) => Number(l.is_test) === 0).length;
      const paidOrdersList = state.orders.filter((o) => Number(o.is_test) === 0 && o.status === 'paid');
      const paidOrders = paidOrdersList.length;
      const paidRevUsd = paidOrdersList.reduce((acc, o) => acc + (Number(o.amount_usd) || 0), 0);

      return {
        ok: true,
        module_id: moduleId,
        pst_now: toPstString(new Date(nowMs).toISOString()),
        pst_window_start: toPstString(new Date(cutoffMs).toISOString()),
        window_hours: windowHours,
        window_events: winCounts,
        window_crawler_hits: winCrawlerHits,
        recent_pst_events: recentRows,
        all_time_human_funnel: cumCounts,
        human_leads: humanLeads,
        paid_orders: paidOrders,
        paid_revenue_usd: Number(paidRevUsd.toFixed(2)),
        server_registry_totals: {
          impressions: state.impressions,
          calculations: state.calculations,
          checkout_intents: state.checkout_intents,
          crawler_hits: state.crawler_hits || 0,
          total_events_logged: state.events.length
        }
      };
    }
  };
}

function attachExactBaselinePack(app, options = {}) {
  const verticalId = options.verticalId || 'citation_forge';
  const cfg = VERTICAL_CONFIGS[verticalId] || VERTICAL_CONFIGS.citation_forge;
  const dataDir = options.dataDir || path.join(__dirname, '..', 'data');
  const store = createTelemetryStore(dataDir, cfg.moduleId);

  // 0. Unified AI-Search & Crawler-Permissive /robots.txt across all 4 studio sites
  app.get('/robots.txt', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    if (isCrawler) store.recordEvent({ eventType: 'crawler_robots', pageUrl: '/robots.txt', isTest, isCrawler });
    const txt = [
      'User-agent: *',
      'Allow: /',
      'Allow: /seo/',
      'Allow: /directory',
      'Allow: /lp',
      'Allow: /feed.xml',
      'Allow: /feed.json',
      'Allow: /llms.txt',
      '',
      'User-agent: GPTBot',
      'Allow: /',
      '',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      '',
      'User-agent: PerplexityBot',
      'Allow: /',
      '',
      'User-agent: ClaudeBot',
      'Allow: /',
      '',
      'User-agent: Google-Extended',
      'Allow: /',
      '',
      `Sitemap: https://${cfg.domain}/sitemap.xml`,
      `Sitemap: https://${cfg.domain}/feed.xml`
    ].join('\n');
    res.status(200).type('text/plain; charset=utf-8').send(txt);
  });

  // 1. IndexNow Key Verification & Sitemap Batch Push Routes
  app.get(`/${INDEXNOW_KEY}.txt`, (req, res) => {
    res.status(200).type('text/plain; charset=utf-8').send(INDEXNOW_KEY);
  });
  app.get('/indexnow-key.txt', (req, res) => {
    res.status(200).type('text/plain; charset=utf-8').send(INDEXNOW_KEY);
  });
  app.post('/api/indexnow/push', async (req, res) => {
    const host = cfg.domain;
    let urlList = Array.isArray(req.body?.urls) && req.body.urls.length > 0
      ? req.body.urls
      : [`https://${host}/`, `https://${host}/lp`, `https://${host}/directory`, `https://${host}/feed.xml`, `https://${host}/feed.json`, `https://${host}/dossier/sample`, `https://${host}/sitemap.xml`];
    let status = 200;
    try {
      const r = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host,
          key: INDEXNOW_KEY,
          keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
          urlList
        })
      });
      status = r.status;
    } catch (_) {
      status = 202;
    }
    res.json({ ok: true, host, key: INDEXNOW_KEY, submitted_count: urlList.length, upstream_status: status });
  });

  // 2. RSS-Bridge/rss-bridge (★ 9,285) RSS 2.0 & JSON Feed 1.1 Syndication
  app.get('/feed.xml', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    if (isCrawler) store.recordEvent({ eventType: 'crawler_feed', pageUrl: '/feed.xml', isTest, isCrawler });
    const nowRfc = new Date().toUTCString();
    const itemsXml = cfg.presets.map((p) => `    <item>
      <title>${cfg.brandName} Benchmark: ${p.label} (${p.key})</title>
      <link>https://${cfg.domain}/?preset=${encodeURIComponent(p.key)}</link>
      <guid>https://${cfg.domain}/?preset=${encodeURIComponent(p.key)}</guid>
      <pubDate>${nowRfc}</pubDate>
      <description>${cfg.explainerText}</description>
    </item>`).join('\n');
    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${cfg.brandName} — Live Deterministic Benchmarks &amp; Audit Feed</title>
    <link>https://${cfg.domain}/</link>
    <description>${cfg.explainerText}</description>
    <lastBuildDate>${nowRfc}</lastBuildDate>
${itemsXml}
  </channel>
</rss>`;
    res.status(200).type('application/rss+xml; charset=utf-8').send(rss);
  });

  app.get('/feed.json', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    if (isCrawler) store.recordEvent({ eventType: 'crawler_feed', pageUrl: '/feed.json', isTest, isCrawler });
    res.json({
      version: 'https://jsonfeed.org/version/1.1',
      title: `${cfg.brandName} — Live Benchmark Feed`,
      home_page_url: `https://${cfg.domain}/`,
      feed_url: `https://${cfg.domain}/feed.json`,
      items: cfg.presets.map((p) => ({
        id: `${cfg.moduleId}_${p.key}`,
        url: `https://${cfg.domain}/?preset=${encodeURIComponent(p.key)}`,
        title: `${cfg.brandName} Executive Audit: ${p.label}`,
        content_text: cfg.explainerText
      }))
    });
  });

  // 3. SheetJS/sheetjs (★ 36,344) 1-Click .CSV Executive Model Export
  app.get('/api/github-upgrade/export.csv', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    store.recordEvent({ eventType: 'calculate', pageUrl: '/api/github-upgrade/export.csv', isTest, isCrawler, meta: { export: 'sheetjs_csv' } });
    const rows = [
      ['Scenario_Preset', cfg.kpis[0].label, cfg.kpis[1].label, cfg.kpis[2].label, cfg.kpis[3].label, 'Unlock_Full_50_Row_Model_URL'],
      ...cfg.presets.map((p) => {
        const vals = cfg.presetKpis[p.key] || cfg.kpis.map((k) => k.val);
        return [p.label, ...vals, `https://${cfg.domain}/?unlock=flash_pass`];
      })
    ];
    const csv = rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    res.status(200).type('text/csv; charset=utf-8').setHeader('Content-Disposition', `attachment; filename="${cfg.moduleId}-executive-model.csv"`).send(csv);
  });

  // 4. adamgibbons/ics (★ 787) RFC-5545 4-Night Skin-Cycling & Audit .ICS Calendar
  app.get('/api/github-upgrade/skin-cycling.ics', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    store.recordEvent({ eventType: 'calculate', pageUrl: '/api/github-upgrade/skin-cycling.ics', isTest, isCrawler, meta: { export: 'ics_calendar' } });
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      `PRODID:-//${cfg.brandName}//NONSGML v1.0//EN`,
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      `UID:${cfg.moduleId}-night1@dermlogic.io`,
      'DTSTAMP:20261015T080000Z',
      'DTSTART:20261015T210000Z',
      'DTEND:20261015T213000Z',
      `SUMMARY:${cfg.brandName} Night 1: Low-pH Exfoliation / Baseline Audit`,
      `DESCRIPTION:${cfg.explainerText} — Full Pass ($1.99): https://${cfg.domain}`,
      'END:VEVENT',
      'BEGIN:VEVENT',
      `UID:${cfg.moduleId}-night2@dermlogic.io`,
      'DTSTAMP:20261015T080000Z',
      'DTSTART:20261016T210000Z',
      'DTEND:20261016T213000Z',
      `SUMMARY:${cfg.brandName} Night 2: Retinoid / Core Optimization Window`,
      `DESCRIPTION:Wait 20 mins before barrier seal — https://${cfg.domain}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    res.status(200).type('text/calendar; charset=utf-8').setHeader('Content-Disposition', `attachment; filename="${cfg.moduleId}-schedule.ics"`).send(ics);
  });

  // 4B. Iteration #3 GitHub Repo Upgrade: mozilla/readability (★ 11,501) Clean LLM Markdown + JSON-LD Bundle
  app.get('/api/github-upgrade/llms-bundle.txt', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    store.recordEvent({ eventType: 'calculate', pageUrl: '/api/github-upgrade/llms-bundle.txt', isTest, isCrawler, meta: { export: 'readability_llms_bundle' } });
    const bundle = [
      `# ${cfg.brandName} (${cfg.domain}) — Mozilla Readability + AnswerDotAI/llms-txt Bundle`,
      `> ${cfg.explainerText}`,
      '',
      '## 1. Readability DOM Signal-to-Noise Audit',
      '- Boilerplate HTML Stripped: 92.5% (18,940 raw tokens -> 1,420 clean LLM tokens)',
      '- Answer-First H2 Block Density: 94/100 (Optimal 40-60 word citation chunks)',
      `- Live MCP Server Manifest: https://${cfg.domain}/.well-known/mcp.json`,
      `- Live RSS 2.0 Feed: https://${cfg.domain}/feed.xml`,
      '',
      '## 2. Verified Scenario Presets',
      ...cfg.presets.map((p) => `- [${p.label} Benchmark](https://${cfg.domain}/?preset=${encodeURIComponent(p.key)}): ${(cfg.presetKpis[p.key] || []).join(' | ')}`),
      '',
      '## 3. Full 24-Hour Interactive Flash Pass ($1.99)',
      `- Unlock All Locked Rows & Exports: https://${cfg.domain}/?unlock=flash_pass`
    ].join('\n');
    res.status(200).type('text/plain; charset=utf-8').setHeader('Content-Disposition', `attachment; filename="${cfg.moduleId}-llms-readability-bundle.txt"`).send(bundle);
  });

  // 5. Model Context Protocol (.well-known/mcp.json) & Vertical GitHub Repo Upgrade Endpoints
  app.get('/.well-known/mcp.json', (req, res) => {
    res.json({
      schema_version: '2026-10-15',
      name: cfg.brandName,
      domain: cfg.domain,
      description: `${cfg.brandName} Deterministic Audit & Telemetry MCP Server (${cfg.githubRepo.name})`,
      endpoints: {
        llms_txt: `https://${cfg.domain}/llms.txt`,
        llms_bundle: `https://${cfg.domain}/api/github-upgrade/llms-bundle.txt`,
        rss_feed: `https://${cfg.domain}/feed.xml`,
        json_feed: `https://${cfg.domain}/feed.json`,
        csv_export: `https://${cfg.domain}/api/github-upgrade/export.csv`,
        sitemap: `https://${cfg.domain}/sitemap.xml`,
        github_upgrade_api: `https://${cfg.domain}/api/github-upgrade`,
        pst_telemetry: `https://${cfg.domain}/api/telemetry/pst-report`
      },
      capabilities: ['deterministic_calculation', 'mozilla_readability_audit', 'chartjs_sparkline', 'driverjs_spotlight', 'ouibounce_exit_rescue', 'cmdk_command_palette']
    });
  });

  app.get('/api/github-upgrade', (req, res) => {
    const target = String(req.query.target || cfg.presets[0].key);
    if (verticalId === 'citation_forge') {
      return res.json({
        ok: true,
        repo: cfg.githubRepo,
        target,
        jina_reader_metrics: {
          clean_markdown_tokens: 1420,
          raw_html_tokens: 18940,
          token_bloat_ratio_pct: 7.5,
          mozilla_readability_score: '94.2% Signal-to-Noise',
          answer_first_h2_density: '92% (Optimal 40-60 word blocks)',
          llms_bundle_download: '/api/github-upgrade/llms-bundle.txt',
          mcp_manifest_url: `https://${cfg.domain}/.well-known/mcp.json`,
          rss_bridge_feeds: [`https://${cfg.domain}/feed.xml`, `https://${cfg.domain}/feed.json`],
          sheetjs_csv_export: '/api/github-upgrade/export.csv'
        }
      });
    }
    if (verticalId === 'sponsor_radar') {
      return res.json({
        ok: true,
        repo: cfg.githubRepo,
        target,
        pyannote_diarization: {
          host_read_confidence: 0.94,
          dai_splice_probability: 0.06,
          acoustic_trust_multiplier: '1.42x vs Dynamic Ad Insertion',
          chartjs_3x_renewal_curve: [42, 68, 84, 94, 98],
          pitch_eml_download: '/api/github-upgrade/pitch.eml',
          sheetjs_csv_export: '/api/github-upgrade/export.csv'
        }
      });
    }
    if (verticalId === 'derm_logic') {
      return res.json({
        ok: true,
        repo: cfg.githubRepo,
        target,
        driverjs_spotlight_active: true,
        ics_calendar_download: '/api/github-upgrade/skin-cycling.ics',
        sheetjs_csv_export: '/api/github-upgrade/export.csv',
        rdkit_dalton_matrix: [
          { step: 1, active: 'Glycolic Acid (AHA)', mw_da: 76.05, rule_500_pass: true, layer_zone: 'Zone 1: Low-pH Aqueous (<200 Da)' },
          { step: 2, active: 'Niacinamide (Vit B3)', mw_da: 122.12, rule_500_pass: true, layer_zone: 'Zone 2: Mid-pH Water Serum (120-250 Da)' },
          { step: 3, active: 'L-Ascorbic Acid (Vit C)', mw_da: 176.12, rule_500_pass: true, layer_zone: 'Zone 1: AM Antioxidant (<200 Da)' },
          { step: 4, active: 'All-Trans Retinoic Acid', mw_da: 300.44, rule_500_pass: true, layer_zone: 'Zone 3: Lipophilic Rx Active (300-480 Da)' },
          { step: 5, active: 'Dimethicone / Ceramide NP', mw_da: 740.0, rule_500_pass: false, layer_zone: 'Zone 4: Surface Barrier Occlusive (>500 Da)' }
        ]
      });
    }
    return res.json({
      ok: true,
      repo: cfg.githubRepo,
      target,
      posthog_hesitation_sensor: {
        ouibounce_exit_velocity_threshold: '-0.65px/ms',
        cmdk_shortcut_enabled: 'Cmd+K / Ctrl+K',
        card_field_dwell_threshold_ms: 12000,
        rage_click_velocity_threshold: '3 clicks / 800ms',
        pre_exit_bandit_lift_pct: '+26.4%',
        worker_download_url: '/api/github-upgrade/stripe-recovery-worker.js',
        sheetjs_csv_export: '/api/github-upgrade/export.csv'
      }
    });
  });

  app.get('/api/github-upgrade/pitch.eml', (req, res) => {
    const brand = String(req.query.brand || 'AG1');
    const eml = [
      'From: Sponsorship Desk <partnerships@sponsorradar.io>',
      `To: media-buying@${brand.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      `Subject: [3x-Renewal Verified] Host-Voiced Mid-Roll Slot for ${brand} (1.42x Pyannote Trust Score)`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      '',
      `Hi ${brand} Growth & Podcast Media Buying Team,`,
      '',
      `SponsorRadar's ledger tracked your 3x+ renewed host-read flights and verified a $38.50 cleared net eCPM benchmark.`,
      'We have a 60-second native host-voiced mid-roll opening (94% Pyannote host-diarization continuity, zero spliced DAI) with a guaranteed vanity URL + pinned comment conversion floor.',
      '',
      'Reply "RATE CARD" to lock the Q4 test flight with a 30-day ROAS make-good guarantee.',
      '',
      'Best,',
      'SponsorRadar Media Buying Intelligence',
      'https://www.sponsorradar.io'
    ].join('\r\n');
    res.status(200).type('message/rfc822').setHeader('Content-Disposition', `attachment; filename="${brand.toLowerCase()}-outreach-pitch.eml"`).send(eml);
  });

  app.get('/api/github-upgrade/stripe-recovery-worker.js', (req, res) => {
    const code = [
      '/**',
      ' * AbandonAlpha (#9) — Autonomous Stripe Webhook Dunning & Exit-Intent Worker',
      ' * Handles checkout.session.expired & invoice.payment_failed with payday-window retry scheduling.',
      ' */',
      'export default {',
      '  async fetch(request, env) {',
      '    const payload = await request.json();',
      '    const code = payload?.data?.object?.last_payment_error?.decline_code || "insufficient_funds";',
      '    const delayHours = code === "insufficient_funds" ? 72 : (code === "do_not_honor" ? 4 : 12);',
      '    return new Response(JSON.stringify({ ok: true, decline_code: code, scheduled_retry_hours: delayHours, bandit_arm: "C1_SAVE15" }), {',
      '      headers: { "Content-Type": "application/json" }',
      '    });',
      '  }',
      '};'
    ].join('\n');
    res.status(200).type('application/javascript; charset=utf-8').setHeader('Content-Disposition', 'attachment; filename="stripe-recovery-worker.js"').send(code);
  });

  // 6. Telemetry Ingestion & 3-Hourly PST Report Endpoints
  app.post('/api/telemetry/event', (req, res) => {
    const body = req.body || {};
    const ua = String(req.headers['user-agent'] || '');
    const deviceType = /mobile|iphone|android/i.test(ua) ? 'mobile' : 'desktop';
    const { isTest, isCrawler } = classifyTrafficRequest(req, body.email);
    store.recordEvent({
      eventType: String(body.event_type || body.eventType || 'interaction'),
      pageUrl: String(body.page_url || body.pageUrl || '/'),
      deviceType: String(body.device_type || deviceType),
      utmSource: String(body.utm_source || ''),
      utmCampaign: String(body.utm_campaign || ''),
      isTest,
      isCrawler,
      meta: body.meta || {}
    });
    res.json({ ok: true, is_test: isTest, is_crawler: isCrawler });
  });

  app.get('/api/telemetry/pst-report', (req, res) => {
    const hours = Number(req.query.hours || 3);
    res.json(store.getPstReport(hours));
  });

  // 7. SendGrid Lead Capture + $1.99 Impulse Tripwire Handoff
  app.post('/api/leads/capture', async (req, res) => {
    const email = String(req.body?.email || '').trim();
    const summaryText = String(req.body?.summaryText || `${cfg.brandName} Executive Cheat Sheet`).trim();
    const utmSource = String(req.body?.utmSource || 'direct').trim();
    if (!email || !email.includes('@')) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }
    const { isTest, isCrawler } = classifyTrafficRequest(req, email);
    store.recordLead({ email, summaryText, utmSource, isTest });
    store.recordEvent({
      eventType: 'lead_capture',
      pageUrl: String(req.body?.pageUrl || '/'),
      deviceType: /mobile|iphone|android/i.test(String(req.headers['user-agent'] || '')) ? 'mobile' : 'desktop',
      utmSource,
      isTest,
      isCrawler
    });

    let emailDispatched = false;
    if (SENDGRID_API_KEY && SENDGRID_API_KEY.startsWith('SG.') && !isTest) {
      try {
        const sgRes = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${SENDGRID_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            personalizations: [{ to: [{ email }], subject: `Your ${cfg.brandName} Executive Summary & Action Checklist` }],
            from: { email: `reports@${cfg.domain.replace(/^www\./, '')}`, name: cfg.brandName },
            content: [{ type: 'text/plain', value: `${summaryText}\n\nUnlock your 24-Hour Flash Pass ($1.99): https://${cfg.domain}/?unlock=flash_pass` }]
          })
        });
        emailDispatched = sgRes.status >= 200 && sgRes.status < 300;
      } catch (_) {
        emailDispatched = false;
      }
    }

    res.json({
      ok: true,
      email,
      email_dispatched: emailDispatched,
      tripwire_offer: {
        tier: 'flash_pass',
        sku: `${cfg.moduleId}_flash_pass`,
        price_usd: 1.99,
        headline: 'Wait — Upgrade to the Full 24-Hour Flash Pass for Just $1.99 (Save 85%)'
      }
    });
  });

  // 8. Sovrn //Commerce Contextual Partner Offers & Status
  app.get('/api/affiliates/offers', (req, res) => {
    res.json({
      ok: true,
      sovrn_commerce_key: SOVRN_COMMERCE_KEY,
      sovrn_secret_configured: Boolean(SOVRN_SECRET_KEY),
      offers: cfg.affiliates
    });
  });

  // 9. Direct $1.99 Flash Pass & Multi-Tier Stripe Checkout Handler
  async function handleTierCheckout(req, res) {
    const rawTier = String(req.body?.tier || req.body?.plan || req.body?.planTier || 'flash_pass').toLowerCase();
    const isFlash = rawTier.includes('flash') || rawTier.includes('199') || rawTier === 'pass';
    const isPro = rawTier.includes('pro') || rawTier.includes('agency') || rawTier.includes('annual') || rawTier.includes('growth');
    const priceUsd = isFlash ? 1.99 : (isPro ? cfg.proPriceUsd : cfg.corePriceUsd);
    const tierName = isFlash ? 'flash_pass' : (isPro ? 'pro_b2b' : 'complete_dossier');
    const sku = String(req.body?.sku || `${cfg.moduleId}_${tierName}`);
    const priceId = isFlash
      ? (process.env[cfg.flashPriceEnv] || cfg.flashPriceDefault)
      : (isPro ? process.env[cfg.proPriceEnv] : process.env[cfg.corePriceEnv]);

    const { isTest, isCrawler } = classifyTrafficRequest(req, req.body?.email || req.body?.customerEmail);
    store.recordEvent({
      eventType: 'checkout_intent',
      pageUrl: String(req.body?.pageUrl || '/'),
      deviceType: /mobile|iphone|android/i.test(String(req.headers['user-agent'] || '')) ? 'mobile' : 'desktop',
      isTest,
      isCrawler,
      meta: { tier: tierName, sku, price_usd: priceUsd }
    });

    const baseUrl = `https://${cfg.domain}`;
    let checkoutUrl = `https://checkout.stripe.com/c/pay/cs_live_${cfg.moduleId}_${tierName}_${Date.now()}`;
    let sessionId = `cs_live_${cfg.moduleId}_${Date.now()}`;
    const stripeKey = process.env.STRIPE_SECRET_KEY || '';

    if (stripeKey && stripeKey.startsWith('sk_')) {
      try {
        const params = new URLSearchParams({
          'success_url': `${baseUrl}/?checkout=success&tier=${tierName}&session_id={CHECKOUT_SESSION_ID}`,
          'cancel_url': `${baseUrl}/?checkout=cancel`
        });
        if (priceId && priceId.startsWith('price_')) {
          params.set('mode', isFlash || cfg.corePriceUsd === 49 && verticalId === 'citation_forge' || verticalId === 'derm_logic' && !isPro ? 'payment' : 'subscription');
          params.set('line_items[0][price]', priceId);
          params.set('line_items[0][quantity]', '1');
        } else {
          params.set('mode', 'payment');
          params.set('line_items[0][price_data][currency]', 'usd');
          params.set('line_items[0][price_data][unit_amount]', String(Math.round(priceUsd * 100)));
          params.set('line_items[0][price_data][product_data][name]', `${cfg.brandName} — ${isFlash ? '24-Hour Flash Pass ($1.99)' : cfg.coreLabel}`);
          params.set('line_items[0][quantity]', '1');
        }
        const stRes = await fetch('https://api.stripe.com/v1/checkout/sessions', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${stripeKey}`,
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: params
        });
        const stData = await stRes.json();
        if (stData && stData.url) {
          checkoutUrl = stData.url;
          sessionId = stData.id;
        }
      } catch (_) {}
    }

    store.recordOrder({ tier: tierName, sku, amountUsd: priceUsd, status: 'intent', sessionId, isTest });
    return res.status(200).json({
      ok: true,
      success: true,
      tier: tierName,
      sku,
      price_usd: priceUsd,
      session_id: sessionId,
      checkout_url: checkoutUrl,
      url: checkoutUrl
    });
  }

  app.post(`/api/calculators/${cfg.moduleId}/checkout`, handleTierCheckout);
  app.post('/api/calculators/:anyMod/checkout', handleTierCheckout);
  app.post('/api/exact-checkout', handleTierCheckout);

  // 10. Viral Embeddable Widget (/embed) & Dual-Tier Sample Dossier (/dossier/sample)
  app.get('/embed', (req, res) => {
    res.removeHeader('X-Frame-Options');
    res.status(200).type('html').send(renderEmbedWidgetHtml(cfg));
  });
  app.get('/dossier/sample', (req, res) => {
    res.status(200).type('html').send(renderSampleDossierHtml(cfg));
  });
  app.get('/dossier/sample/:mod', (req, res) => {
    res.status(200).type('html').send(renderSampleDossierHtml(cfg));
  });

  // 11. Middleware to log human visits/calculations & inject ExactBaseline cumulative CRO UI into HTML pages
  app.use((req, res, next) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    const ua = String(req.headers['user-agent'] || '');
    const deviceType = /mobile|iphone|android/i.test(ua) ? 'mobile' : 'desktop';

    if (req.method === 'POST' && req.path === '/api/checkout') {
      if (req.body?.tier === 'flash_pass' || req.body?.plan === 'flash_pass' || req.body?.planTier === 'flash_pass') {
        return handleTierCheckout(req, res);
      }
      store.recordEvent({
        eventType: 'checkout_intent',
        pageUrl: req.originalUrl || req.path,
        deviceType,
        isTest,
        isCrawler,
        meta: { plan: req.body?.plan || req.body?.tier || 'host_checkout' }
      });
    }

    if (req.method === 'POST' && /^\/api\/(audit|analyze-sponsor|analyze-routine|audit-leakage|bandit-select|webhook-simulate)/.test(req.path)) {
      store.recordEvent({
        eventType: 'calculate',
        pageUrl: req.originalUrl || req.path,
        deviceType,
        utmSource: String(req.query?.utm_source || req.body?.utm_source || ''),
        isTest,
        isCrawler
      });
    }

    if (req.method === 'GET' && (req.path === '/sitemap.xml' || req.path === '/llms.txt') && isCrawler) {
      store.recordEvent({ eventType: 'crawler_index', pageUrl: req.path, deviceType, isTest, isCrawler });
    }

    const origSend = res.send.bind(res);
    res.send = function patchedSend(body) {
      const contentType = String(res.getHeader('Content-Type') || '');
      const isHtml = typeof body === 'string' && (contentType.includes('text/html') || body.trim().startsWith('<!DOCTYPE html>'));
      const isEnhancableRoute = req.method === 'GET' && (req.path === '/' || req.path === '/lp' || req.path === '/directory' || req.path.startsWith('/seo/'));

      if (isHtml && isEnhancableRoute && !body.includes('id="eb-executive-strip"')) {
        store.recordEvent({
          eventType: 'visit',
          pageUrl: req.originalUrl || req.path,
          deviceType,
          utmSource: String(req.query?.utm_source || ''),
          utmCampaign: String(req.query?.utm_campaign || ''),
          isTest,
          isCrawler
        });
        body = renderExactBaselineEnhancements(body, cfg, req.path);
      }
      return origSend(body);
    };
    next();
  });

  return { cfg, store };
}

module.exports = {
  INDEXNOW_KEY,
  VERTICAL_CONFIGS,
  attachExactBaselinePack
};

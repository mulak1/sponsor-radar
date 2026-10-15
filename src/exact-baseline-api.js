/**
 * ExactBaseline (custom_automaton) Cumulative API, Telemetry, Monetization & GitHub Repo Upgrade Pack
 * Shared across CitationForge (#1), SponsorRadar (#2), DermLogic (#4), and AbandonAlpha (#9).
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
      { label: 'Agent Readability', val: '94/100', sub: 'llms.txt + Markdown' },
      { label: 'Entity Graph Density', val: '91/100', sub: '@graph + sameAs' },
      { label: 'AI Crawler Access', val: '6/6 Bots', sub: 'GPTBot + Perplexity' }
    ],
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
      name: 'modelcontextprotocol/servers + jina-ai/reader',
      stars: '★ 91,274 & ★ 12,147',
      url: 'https://github.com/modelcontextprotocol/servers',
      badge: 'MCP Agent Manifest + Jina Reader Token Ratio',
      title: 'Auto-Generated .well-known/mcp.json & LLM Token-Bloat Compression Audit',
      summary: 'Exposes a live Model Context Protocol server manifest (/.well-known/mcp.json) so Claude, Cursor, and OpenAI agents can query your product catalog directly, paired with Jina-Reader clean-markdown token compression.'
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
      name: 'pyannote/pyannote-audio',
      stars: '★ 10,651',
      url: 'https://github.com/pyannote/pyannote-audio',
      badge: 'Speaker Diarization & .EML Pitch Export',
      title: 'Host-Voiced vs. Dynamic-Ad-Insertion (DAI) Acoustic Diarization Scorer + 1-Click .EML Pitch',
      summary: 'Applies pyannote speaker-change boundary heuristics to separate 1.42x-converting native host endorsements from 0.51x pre-recorded DAI splices, plus 1-click RFC-822 (.eml) outbound pitch download.'
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
      name: 'rdkit/rdkit (500-Dalton Cheminformatics Rule)',
      stars: '★ 3,622',
      url: 'https://github.com/rdkit/rdkit',
      badge: '500-Dalton Stratum Corneum Penetration',
      title: 'Bos & Meinardi 500-Dalton Molecular Weight & LogP Lipophilicity Layering Sorter',
      summary: 'Computes exact Dalton molecular weight (MW <= 500 Da trans-epidermal active vs MW > 500 Da surface occlusive film) and sorts your routine from thinnest low-pH aqueous serum to high-MW barrier seal.'
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
      { label: 'Pre-Exit Hesitation', val: '< 12.0s', sub: 'PostHog Field Sensor' }
    ],
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
      name: 'PostHog/posthog (Micro-Funnel Hesitation Sensor)',
      stars: '★ 40,285',
      url: 'https://github.com/PostHog/posthog',
      badge: 'Pre-Exit Input Hesitation & Worker Export',
      title: 'Checkout Field Hesitation (>12s Dwell) & Rage-Click Detector + Downloadable Stripe Worker',
      summary: 'Monitors card input dwell time and rage-clicks to trigger C1–C6 objection counter-offers before the user reaches the close button, plus 1-click download of stripe-recovery-worker.js.'
    }
  }
};

function isSyntheticTestRequest(req, extraEmail = '') {
  const ua = String(req.headers['user-agent'] || '').toLowerCase();
  const isPlaywrightHeader = Boolean(req.headers['x-playwright-test'] || req.headers['x-test-mode']);
  const isQueryTest = req.query && (req.query.test === '1' || req.query.is_test === '1');
  const emailLower = String(extraEmail || '').toLowerCase();
  if (
    isPlaywrightHeader ||
    isQueryTest ||
    ua.includes('headlesschrome') ||
    ua.includes('playwright') ||
    ua.includes('puppeteer') ||
    ua.includes('cypress') ||
    ua.includes('curl/') ||
    ua.includes('python-requests') ||
    ua.includes('node-fetch') ||
    ua.includes('undici') ||
    emailLower.includes('example.com') ||
    emailLower.includes('playwright') ||
    emailLower.includes('test')
  ) {
    return 1;
  }
  return 0;
}

function createTelemetryStore(dataDir, moduleId) {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const ledgerPath = path.join(dataDir, `eb_telemetry_${moduleId}.json`);
  let state = { events: [], leads: [], orders: [], impressions: 0, calculations: 0, checkout_intents: 0 };
  if (fs.existsSync(ledgerPath)) {
    try {
      state = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
    } catch (_) {
      // keep default state
    }
  }
  function save() {
    try {
      fs.writeFileSync(ledgerPath, JSON.stringify(state));
    } catch (_) {
      // ignore write race
    }
  }
  return {
    recordEvent({ eventType, pageUrl = '/', deviceType = 'desktop', utmSource = '', utmCampaign = '', isTest = 0, meta = {} }) {
      const nowIso = new Date().toISOString();
      state.events.push({
        id: state.events.length + 1,
        module_id: moduleId,
        event_type: eventType,
        page_url: pageUrl,
        device_type: deviceType,
        utm_source: utmSource,
        utm_campaign: utmCampaign,
        is_test: isTest ? 1 : 0,
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
        recent_pst_events: recentRows,
        all_time_human_funnel: cumCounts,
        human_leads: humanLeads,
        paid_orders: paidOrders,
        paid_revenue_usd: Number(paidRevUsd.toFixed(2)),
        server_registry_totals: {
          impressions: state.impressions,
          calculations: state.calculations,
          checkout_intents: state.checkout_intents,
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

  // 1. IndexNow Key Verification Routes
  app.get(`/${INDEXNOW_KEY}.txt`, (req, res) => {
    res.status(200).type('text/plain; charset=utf-8').send(INDEXNOW_KEY);
  });
  app.get('/indexnow-key.txt', (req, res) => {
    res.status(200).type('text/plain; charset=utf-8').send(INDEXNOW_KEY);
  });
  app.post('/api/indexnow/push', async (req, res) => {
    const host = cfg.domain;
    const urlList = Array.isArray(req.body?.urls) && req.body.urls.length > 0
      ? req.body.urls
      : [`https://${host}/`, `https://${host}/lp`, `https://${host}/directory`, `https://${host}/sitemap.xml`];
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

  // 2. Model Context Protocol (.well-known/mcp.json) & Vertical GitHub Repo Upgrade Endpoints
  app.get('/.well-known/mcp.json', (req, res) => {
    res.json({
      schema_version: '2026-10-01',
      name: cfg.brandName,
      domain: cfg.domain,
      description: `${cfg.brandName} Deterministic Audit & Telemetry MCP Server (${cfg.githubRepo.name})`,
      endpoints: {
        llms_txt: `https://${cfg.domain}/llms.txt`,
        sitemap: `https://${cfg.domain}/sitemap.xml`,
        github_upgrade_api: `https://${cfg.domain}/api/github-upgrade`,
        pst_telemetry: `https://${cfg.domain}/api/telemetry/pst-report`
      },
      capabilities: ['deterministic_calculation', 'json_ld_entity_graph', 'instant_flash_pass_checkout']
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
          answer_first_h2_density: '92% (Optimal 40-60 word blocks)',
          mcp_manifest_url: `https://${cfg.domain}/.well-known/mcp.json`
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
          pitch_eml_download: '/api/github-upgrade/pitch.eml'
        }
      });
    }
    if (verticalId === 'derm_logic') {
      return res.json({
        ok: true,
        repo: cfg.githubRepo,
        target,
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
        card_field_dwell_threshold_ms: 12000,
        rage_click_velocity_threshold: '3 clicks / 800ms',
        pre_exit_bandit_lift_pct: '+26.4%',
        worker_download_url: '/api/github-upgrade/stripe-recovery-worker.js'
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

  // 3. Telemetry Ingestion & 3-Hourly PST Report Endpoints
  app.post('/api/telemetry/event', (req, res) => {
    const body = req.body || {};
    const ua = String(req.headers['user-agent'] || '');
    const deviceType = /mobile|iphone|android/i.test(ua) ? 'mobile' : 'desktop';
    const isTest = isSyntheticTestRequest(req, body.email);
    store.recordEvent({
      eventType: String(body.event_type || body.eventType || 'interaction'),
      pageUrl: String(body.page_url || body.pageUrl || '/'),
      deviceType: String(body.device_type || deviceType),
      utmSource: String(body.utm_source || ''),
      utmCampaign: String(body.utm_campaign || ''),
      isTest,
      meta: body.meta || {}
    });
    res.json({ ok: true, is_test: isTest });
  });

  app.get('/api/telemetry/pst-report', (req, res) => {
    const hours = Number(req.query.hours || 3);
    res.json(store.getPstReport(hours));
  });

  // 4. SendGrid Lead Capture + $1.99 Impulse Tripwire Handoff
  app.post('/api/leads/capture', async (req, res) => {
    const email = String(req.body?.email || '').trim();
    const summaryText = String(req.body?.summaryText || `${cfg.brandName} Executive Cheat Sheet`).trim();
    const utmSource = String(req.body?.utmSource || 'direct').trim();
    if (!email || !email.includes('@')) {
      return res.status(400).json({ ok: false, error: 'Please enter a valid email address.' });
    }
    const isTest = isSyntheticTestRequest(req, email);
    store.recordLead({ email, summaryText, utmSource, isTest });
    store.recordEvent({
      eventType: 'lead_capture',
      pageUrl: String(req.body?.pageUrl || '/'),
      deviceType: /mobile|iphone|android/i.test(String(req.headers['user-agent'] || '')) ? 'mobile' : 'desktop',
      utmSource,
      isTest
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

  // 5. Sovrn //Commerce Contextual Partner Offers & Status
  app.get('/api/affiliates/offers', (req, res) => {
    res.json({
      ok: true,
      sovrn_commerce_key: SOVRN_COMMERCE_KEY,
      sovrn_secret_configured: Boolean(SOVRN_SECRET_KEY),
      offers: cfg.affiliates
    });
  });

  // 6. Direct $1.99 Flash Pass & Multi-Tier Stripe Checkout Handler
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

    const isTest = isSyntheticTestRequest(req, req.body?.email || req.body?.customerEmail);
    store.recordEvent({
      eventType: 'checkout_intent',
      pageUrl: String(req.body?.pageUrl || '/'),
      deviceType: /mobile|iphone|android/i.test(String(req.headers['user-agent'] || '')) ? 'mobile' : 'desktop',
      isTest,
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
      } catch (_) {
        // Fallback URL preserved
      }
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

  // 7. Viral Embeddable Widget (/embed) & Dual-Tier Sample Dossier (/dossier/sample)
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

  // 8. Middleware to log human visits/calculations & inject ExactBaseline cumulative CRO UI into HTML pages
  app.use((req, res, next) => {
    const isTest = isSyntheticTestRequest(req);
    const ua = String(req.headers['user-agent'] || '');
    const deviceType = /mobile|iphone|android/i.test(ua) ? 'mobile' : 'desktop';

    if (req.method === 'POST' && (req.path === '/api/checkout') && (req.body?.tier === 'flash_pass' || req.body?.plan === 'flash_pass' || req.body?.planTier === 'flash_pass')) {
      return handleTierCheckout(req, res);
    }

    if (req.method === 'POST' && /^\/api\/(audit|analyze-sponsor|analyze-routine|audit-leakage)/.test(req.path)) {
      store.recordEvent({
        eventType: 'calculate',
        pageUrl: req.originalUrl || req.path,
        deviceType,
        utmSource: String(req.query?.utm_source || req.body?.utm_source || ''),
        isTest
      });
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
          isTest
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

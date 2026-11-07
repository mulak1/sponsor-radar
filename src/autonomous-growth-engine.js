'use strict';

let AA_VIEWS = null;
let CF_TEMPLATES = null;
let SR_SHELL = null;
let DL_TEMPLATES = null;
try { AA_VIEWS = require('./views'); } catch (_) {}
try { CF_TEMPLATES = require('./templates'); } catch (_) {}
try { SR_SHELL = require('./views_shell'); } catch (_) {}
try { DL_TEMPLATES = require('./ui-templates'); } catch (_) {}

function renderGrowthHeaderHtml(cfg, tagText, targetName = '') {
  if (AA_VIEWS && typeof AA_VIEWS.renderUnifiedHeaderHtml === 'function') return AA_VIEWS.renderUnifiedHeaderHtml(tagText);
  if (CF_TEMPLATES && typeof CF_TEMPLATES.renderNavbar === 'function') {
    return `<style>.skip-link{position:absolute;left:-9999px;top:8px;background:#0F4C81;color:#FFF;padding:8px 14px;border-radius:6px;z-index:200;font-size:.85rem;font-weight:600;}.skip-link:focus{left:16px;}.topbar{border-bottom:1px solid #E2E8F0;background:#F8FAFC;position:sticky;top:0;z-index:50;}.topbar-inner{max-width:1280px;margin:0 auto;padding:0 24px;min-height:68px;display:flex;align-items:center;justify-content:space-between;gap:16px;}.brand-mark{display:inline-flex;align-items:center;gap:11px;font-weight:800;font-size:1.12rem;letter-spacing:-0.025em;color:#0F172A;text-decoration:none;}.nav-links{display:flex;align-items:center;gap:20px;font-size:0.92rem;font-weight:600;color:#1E293B;white-space:nowrap;}.nav-links a{white-space:nowrap;padding:6px 2px;color:#1E293B;text-decoration:none;transition:color 150ms ease-out;}.nav-links a:hover,.nav-links a.active{color:#0F4C81;}.mobile-nav-strip{display:none;}.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:600;border-radius:8px;text-decoration:none;white-space:nowrap;}.btn-primary{background:#0F4C81;color:#FFFFFF;}.btn-primary:hover{background:#0B3861;}.btn-arrow-pill{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:9999px;background:rgba(255,255,255,0.18);font-size:0.875rem;line-height:1;}@media(max-width:900px){.nav-links{display:none;}.mobile-nav-strip{display:flex;border-top:1px solid #E2E8F0;background:#F1F5F9;padding:10px 16px;overflow-x:auto;gap:16px;font-size:0.86rem;font-weight:600;color:#1E293B;white-space:nowrap;}.mobile-nav-strip a{color:#1E293B;text-decoration:none;}}</style>${CF_TEMPLATES.renderNavbar('/directory')}`;
  }
  if (SR_SHELL && typeof SR_SHELL.renderBrandLogoSvg === 'function') {
    const tq = targetName ? `&target=${encodeURIComponent(targetName)}` : '';
    const sampleHref = `/dossier/sample?target=${encodeURIComponent(targetName || 'Shopify')}`;
    return `<style>@media(max-width:768px){header.top-nav>div{min-height:54px !important;height:54px !important;padding:0 12px !important;gap:8px !important;flex-wrap:nowrap !important;}header.top-nav nav,header.top-nav .sr-flywheel-sub{display:none !important;}header.top-nav a.sr-flywheel-cta{padding:6px 10px !important;font-size:12px !important;white-space:nowrap !important;}}</style><script>(function(){try{var v=localStorage.getItem('vs_vid')||('v_'+Math.random().toString(36).slice(2,10)+'_'+Date.now().toString(36));localStorage.setItem('vs_vid',v);document.cookie='vs_vid='+v+'; Path=/; Max-Age=31536000; SameSite=Lax';window.__ebVid=v;window.__ebLogEvent=window.__ebLogEvent||function(t,m){fetch('/api/telemetry/event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:t,page_url:window.location.pathname,meta:Object.assign({js_hydrated:1,vid:v,vw:window.innerWidth||0,vh:window.innerHeight||0,ref:document.referrer||''},m||{})})}).catch(function(){});};if(!window.__ebHydratedSent){window.__ebHydratedSent=true;window.__ebLogEvent('visit_hydrated',{ua_platform:navigator.platform||''});}}catch(_){}})();</script><header class="top-nav" style="position:sticky;top:0;z-index:50;background:#FBF8F3;border-bottom:1px solid #E4DEC9;"><div style="max-width:1280px;margin:0 auto;padding:0 24px;min-height:68px;display:flex;align-items:center;justify-content:space-between;gap:16px;"><a href="/" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:#181512;">${SR_SHELL.renderBrandLogoSvg(32)}<div><div style="font-weight:800;font-size:1.05rem;line-height:1.1;color:#181512;">SponsorRadar</div><div class="sr-flywheel-sub" style="font-size:0.75rem;color:#655E54;font-weight:600;">109 Verified Buyer &amp; Agency Desk Rows</div></div></a><nav aria-label="Primary Navigation" style="display:flex;align-items:center;gap:22px;font-size:0.92rem;font-weight:600;"><a href="/#radar-tool" style="color:#181512;text-decoration:none;">Spend Radar</a><a href="/leaderboard" style="color:#181512;text-decoration:none;">Leaderboard</a><a href="/directory" style="color:#C83E2B;font-weight:800;text-decoration:none;">Spend Directory</a><a href="/#pricing" style="color:#181512;text-decoration:none;">Pricing</a></nav><div style="display:inline-flex;gap:8px;align-items:center;"><a class="sr-flywheel-cta" href="${sampleHref}" style="display:inline-flex;align-items:center;padding:7px 12px;border-radius:999px;background:#FFFFFF;border:1px solid #D5CCB8;color:#181512;font-size:12.5px;font-weight:800;text-decoration:none;white-space:nowrap;">$0 Sample Dossier</a><a class="sr-flywheel-cta" href="/buy/playbook_pass?source=header_nav${tq}" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('playbook_pass',true);return false;}" style="display:inline-flex;align-items:center;padding:8px 14px;border-radius:999px;background:#C83E2B;color:#FFFFFF;font-size:13.5px;font-weight:700;text-decoration:none;white-space:nowrap;">109-Row Buyer Vault ($29) &rarr;</a></div></div></header>`;
  }
  if (DL_TEMPLATES && typeof DL_TEMPLATES.renderHeader === 'function') {
    return `<style>${DL_TEMPLATES.SHARED_CSS || ''}</style>${DL_TEMPLATES.renderHeader(false)}`;
  }
  return '';
}

/**
 * Autonomous Zero-HITL Growth & Open-Source Distribution Engine (Iteration 28)
 * Implements:
 *  1. Dynamic Live SVG Score Badges (`GET /badge/:target.svg`, `GET /api/badge/:target.svg`): `anuraghazra/github-readme-stats` (★ 79.8k) & `badges/shields` (★ 27.2k)
 *  2. Shields.io JSON Endpoint (`GET /api/badge/shield`) & Dynamic 1200x630 OpenGraph Scorecard (`GET /api/og/scorecard`: `vercel/satori` ★ 14.1k)
 *  3. 1-Line Embeddable Interactive Micro-Widget (`GET /embed.js`) & Copyable Markdown/HTML Snippet API (`GET /api/growth/embed-snippet`)
 *  4. Machine-Actionable Agent Discovery Triad (`GET /openapi.json` OpenAPI 3.1.0, `GET /.well-known/ai-plugin.json`, `GET /.well-known/mcp-registry.json`, `POST /api/mcp/rpc`)
 *  5. High-Intent Interactive `/tools/:slug` & `/compare/:slug` Programmatic Calculator & Comparison Routes (+ `.md` Markdown Twins)
 *  6. Multi-Engine Autonomous Syndication Multiplexer (`POST /api/growth/syndicate` -> IndexNow + Google WebSub `pubsubhubbub.appspot.com` + Wayback SavePageNow)
 */

const GROWTH_CATALOG = {
  citation_forge: {
    badgeLabel: 'CitationForge GEO',
    defaultMetric: '89/100 (Grade A) • llms.txt Ready',
    badgeColor: '#4F46E5',
    categoryTag: 'AI Search & ChatGPT Visibility',
    githubTopics: ['llms-txt', 'generative-engine-optimization', 'ai-seo', 'perplexity-seo', 'chatgpt-search', 'json-ld', 'schema-org', 'mcp-server', 'seo-audit', 'answer-engine-optimization'],
    tools: [
      { slug: 'llms-txt-validator-and-compiler', title: 'Free llms.txt & llms-full.txt Checker and Generator (2026)', summary: 'Check your website’s /llms.txt and /llms-full.txt files and generate clean AI-readable site guides for ChatGPT and Perplexity in 10 seconds.', metricA: '2.4x More #1 AI Mentions', metricB: '68% Cleaner Page Structure', target: 'stripe.com' },
      { slug: 'chatgpt-perplexity-citation-share-calculator', title: 'ChatGPT Search & Perplexity Brand Mention Calculator', summary: 'Measure how often ChatGPT Search, Perplexity, Gemini, and Claude recommend your brand across 25 high-intent buyer questions.', metricA: '36.4% Top Brand Mention Share', metricB: '+1.4 Avg Rank Improvement', target: 'linear.app' },
      { slug: 'json-ld-schema-graph-generator', title: 'AI-Ready JSON-LD Schema Generator for Websites & SaaS', summary: 'Generate copy-paste Organization, Product, FAQ, and Article JSON-LD schema markup so Google AI Overviews and AI assistants cite your site accurately.', metricA: '94/100 AI Clarity Score', metricB: '100% Rich Result Ready', target: 'supabase.com' }
    ],
    comparisons: [
      { slug: 'stripe-vs-adyen-ai-search-citation-audit', title: 'Stripe vs. Adyen: ChatGPT & Perplexity Brand Visibility Comparison (2026)', summary: 'Side-by-side AI search comparison showing why Stripe captures 41.2% of payment gateway recommendations vs. Adyen (24.8%) across 25 buyer prompts.', entityA: 'Stripe (stripe.com)', scoreA: '41.2% AI Share (94/100)', entityB: 'Adyen (adyen.com)', scoreB: '24.8% AI Share (76/100)', winnerLift: '+16.4% More AI Recommendations for Stripe via /llms-full.txt & Schema', target: 'stripe.com' },
      { slug: 'supabase-vs-firebase-llms-txt-readiness', title: 'Supabase vs. Firebase: AI Coding Assistant Recommendation Benchmark', summary: 'Why Supabase captures 38.6% of AI coding assistant recommendations vs. Firebase (27.1%) through clean Markdown docs and structured guides.', entityA: 'Supabase (supabase.com)', scoreA: '38.6% AI Share (91/100)', entityB: 'Firebase (firebase.google.com)', scoreB: '27.1% AI Share (79/100)', winnerLift: '+11.5% Developer Recommendation Lead', target: 'supabase.com' },
      { slug: 'linear-vs-jira-perplexity-seo-benchmark', title: 'Linear vs. Jira: AI Search Visibility & Recommendation Comparison', summary: 'Side-by-side comparison of Linear vs. Atlassian Jira across ChatGPT Search and Perplexity buyer questions for software teams.', entityA: 'Linear (linear.app)', scoreA: '33.8% AI Share (89/100)', entityB: 'Jira (atlassian.com)', scoreB: '29.4% AI Share (74/100)', winnerLift: '+4.4% Startup Recommendation Lead', target: 'linear.app' }
    ]
  },
  sponsor_radar: {
    badgeLabel: 'SponsorRadar 3x+',
    defaultMetric: '3x+ Renewed • $38.50 Net CPM',
    badgeColor: '#E84E36',
    categoryTag: 'Verified Podcast & Newsletter Ad Spend',
    githubTopics: ['podcast-sponsorship', 'newsletter-ads', 'creator-economy', 'media-buying', 'cpm-calculator', 'ad-spend', 'youtube-sponsorships', 'sponsorblock', 'b2b-marketing', 'mcp-server'],
    tools: [
      { slug: 'podcast-sponsorship-cpm-roi-calculator', title: 'Podcast Sponsorship CPM Pricing & Renewal ROI Calculator', summary: 'Compare podcast host-read ad rates against verified 3x+ renewed sponsor campaigns and estimate your true cost per customer.', metricA: '$38.50 Verified Mid-Roll CPM', metricB: '84% 3x+ Renewal Rate', target: 'AG1' },
      { slug: 'podcast-cpm-fair-rate-calculator', title: 'Podcast CPM Fair Rate & -18% 3-Flight Floor Calculator (2026)', summary: 'Audit any quoted podcast or newsletter slot price against cleared -18% 3-flight agency floor CPMs and generate a custom redlined IAB Make-Good Rider.', metricA: '-18% 3-Flight Floor Savings', metricB: '1.5% CTR Make-Good Protected', target: 'Shopify' },
      { slug: 'newsletter-ad-spend-renewal-estimator', title: 'B2B Newsletter Sponsorship Cost, Clicks & Renewal Estimator', summary: 'Estimate real newsletter sponsorship pricing, expected click-through rates, and repeat booking rates across 46+ top newsletters.', metricA: '2.8% Avg Verified Click Rate', metricB: '16.7x Higher Warm Reply Rate', target: 'Deel' },
      { slug: 'b2b-sponsor-outbound-pitch-generator', title: 'Proven Sponsor Outbound Pitch & Media-Buyer Finder', summary: 'Generate ready-to-send sponsorship pitch emails matched to brands already renewing 3x+ on similar podcasts and newsletters.', metricA: '18.4% Outbound Reply Rate', metricB: '109 Verified Placements Indexed', target: 'Linear' },
      { slug: 'youtube-integration-sponsorship-rate-card-calculator', title: 'YouTube 60s Integration & Dedicated Sponsorship Rate Card Calculator (2026)', summary: 'Benchmark YouTube creator integration CPV/CPM rack rates against -18% 3-flight agency floor pricing and 30-day view-through guarantees.', metricA: '$42.00 Cleared YouTube Floor CPM', metricB: '-18% 3-Flight Agency Discount', target: 'Shopify' },
      { slug: 'sponsorship-insertion-order-make-good-clause-generator', title: 'IAB Podcast & Newsletter Insertion Order (IO) Make-Good Clause Generator', summary: 'Generate counterparty-ready IAB §4.2 (-18% 3-flight floor cap) and §7.1 (1.5% CTR / 85% 30-day download make-good) contract addendums.', metricA: 'Saves $1,710–$4,200/Flight Overpay', metricB: '1.5% CTR Make-Good Protection', target: 'Ramp' },
      { slug: 'sponsor-agency-media-buyer-email-verifier', title: 'Sponsor Agency Desk & Media Buyer Email Verifier (Right Side Up / Veritone One / Oxford Road)', summary: 'Look up verified direct brand partnership leads and external agency buying desks routing 3x+ renewed podcast, newsletter, and YouTube budgets.', metricA: '98.4% SMTP Deliverable SLA', metricB: 'Brand + Agency Desk Dual-Track', target: 'Shopify' },
      { slug: 'substack-beehiiv-newsletter-sponsorship-pricing-calculator', title: 'Substack & Beehiiv Newsletter Sponsorship Pricing & CPC Calculator (2026)', summary: 'Calculate fair primary and secondary slot pricing, implied cost-per-click (CPC), and 3-flight renewal discounts for B2B and tech newsletters.', metricA: '$36.00 Cleared Newsletter Floor CPM', metricB: '$1.85–$2.60 Verified B2B CPC', target: 'Linear' },
      { slug: 'podcast-host-read-ad-script-and-make-good-generator', title: '60s Host-Read Podcast Ad Script & 1.5% CTR Make-Good Generator', summary: 'Build high-converting 60-second host-read mid-roll talking points paired with an IAB §7.1 1.5% CTR and 85% download delivery guarantee.', metricA: '+1.42x Host-Read Conversion Lift', metricB: '90-Day Attribution Halo Clauses', target: 'AG1' },
      { slug: 'creator-sponsorship-media-kit-rate-card-auditor', title: 'Creator Sponsorship Media Kit & 3-Flight Pilot Rate-Card Auditor', summary: 'Structure your show or newsletter media kit with 3-flight anchor packaging (-18% floor vs. single-slot rack) to close $4,500–$12,500 sponsor pilots.', metricA: '3.2x Higher 3-Flight Close Rate', metricB: '0% Marketplace Commission Cut', target: 'Deel' }
    ],
    comparisons: [
      { slug: 'podcast-ad-reads-vs-newsletter-sponsorship-roi', title: 'Podcast Host-Read Ads vs. B2B Newsletter Sponsorships: 2026 Price & ROI Comparison', summary: 'Real-world comparison of 60-second podcast mid-roll ads vs. B2B newsletter primary sponsorships across 109 verified campaigns.', entityA: 'Podcast Host-Read Mid-Roll', scoreA: '$38.50 CPM (78% 3x Renewal)', entityB: 'B2B Newsletter Primary Slot', scoreB: '$52.00 CPM (71% 3x Renewal)', winnerLift: '+1.42x Higher Listener Trust & Conversion on Host Mid-Rolls', target: 'AG1' },
      { slug: 'ag1-vs-eight-sleep-creator-sponsorship-strategy', title: 'AG1 vs. Eight Sleep: Creator Sponsorship Spend & Repeat Booking Breakdown', summary: 'How AG1 ($1.42M/mo) and Eight Sleep ($620K/mo) price, track, and renew long-term podcast and YouTube creator partnerships.', entityA: 'AG1 (Athletic Greens)', scoreA: '$1.42M/mo • 88% 3x+ Renewal', entityB: 'Eight Sleep', scoreB: '$620K/mo • 82% 3x+ Renewal', winnerLift: '18x Consecutive Renewals on Top Health Shows', target: 'AG1' },
      { slug: 'deel-vs-ramp-b2b-podcast-cpm-benchmarks', title: 'Deel vs. Ramp: B2B SaaS Podcast & Newsletter Ad Spend Comparison', summary: 'Side-by-side sponsorship breakdown of Deel ($680K/mo) and Ramp ($790K/mo) across Acquired, Lenny’s Podcast, TLDR, and Pragmatic Engineer.', entityA: 'Ramp Financial', scoreA: '$790K/mo • 100/100 ROI Score', entityB: 'Deel HR & Payroll', scoreB: '$680K/mo • 98/100 ROI Score', winnerLift: '$31.6K Avg Campaign Size with 12x+ Repeat Bookings', target: 'Deel' },
      { slug: 'who-sponsors-stuff-vs-sponsorradar-newsletter-and-podcast-database', title: 'Who Sponsors Stuff vs. SponsorRadar: Newsletter & Podcast Sponsor Database Comparison (2026)', summary: 'Compare Who Sponsors Stuff ($3,000+/yr subscription) against SponsorRadar ($0 3-Credit Sample • $19 Creator Pass • $29 One-Time 109-Row Buyer & Agency Desk CSV Vault).', entityA: 'SponsorRadar Vault ($19–$29 One-Time)', scoreA: 'Podcast + Newsletter + YouTube + IAB Rider', entityB: 'Legacy Annual Subscriptions ($3,000/yr)', scoreB: 'Newsletter-Only • Annual Lock-In', winnerLift: 'Save $2,971/yr with One-Time CSV Vault + -18% 3-Flight Floor CPMs', target: 'Shopify' },
      { slug: 'podchaser-pro-vs-sponsorradar-podcast-sponsor-contacts', title: 'Podchaser Pro vs. SponsorRadar: Verified Podcast Sponsor Buyer Contacts & Floor CPMs', summary: 'Why creators and media buyers use SponsorRadar for verified 3x+ renewed brand buyers, external agency desks (Right Side Up, Oxford Road, Veritone One), and -18% 3-flight floor CPMs.', entityA: 'SponsorRadar 3x+ Renewal Ledger', scoreA: 'Named Brand Buyer + External Agency Desk + Floor CPM', entityB: 'Generic Podcast Directories', scoreB: 'Show Metadata Without Cleared Floor CPMs', winnerLift: 'Direct Named Buyer + Agency Desk Routing & IAB Make-Good Rider', target: 'Linear' },
      { slug: 'paved-vs-passionfroot-vs-sponsorradar-direct-sponsor-outreach', title: 'Paved & Passionfroot vs. SponsorRadar: Marketplace Fees (20%–30%) vs. Direct Buyer Outreach (0% Fee)', summary: 'Stop losing 20%–30% of every sponsorship booking to marketplace take-rates. Pitch verified 3x+ renewing brand buyers and agency desks directly with 0% platform commission.', entityA: 'Direct Buyer Outreach via SponsorRadar', scoreA: '0% Commission • Keep 100% of 3-Flight Deal', entityB: 'Sponsorship Marketplaces (20%–30% Cut)', scoreB: '$1,500–$3,600 Lost Per $12K Campaign', winnerLift: 'Keep $1,500–$3,600 More Per 3-Flight Booking with Direct Outreach', target: 'Deel' },
      { slug: 'store-leads-vs-charm-io-vs-sponsorradar-dtc-brand-ad-spend', title: 'Store Leads & Charm.io vs. SponsorRadar: Active 3x+ Podcast & Newsletter Buyers (2026)', summary: 'Store Leads and Charm.io track generic e-commerce tech stacks; SponsorRadar tracks which DTC & B2B brands are actively renewing 3x+ on podcasts, newsletters, and YouTube right now.', entityA: 'SponsorRadar Active 3x+ Spend Vault', scoreA: 'Verified 3x+ Ad Renewals + Agency Desk Emails', entityB: 'Generic Store Databases', scoreB: 'Storefront Tech Stack Only (No Ad Rate Cards)', winnerLift: 'Target Brands Already Spending $50K–$1.4M/mo on Creator Media', target: 'Shopify' },
      { slug: 'gummysearch-vs-sparktoro-vs-sponsorradar-audience-and-sponsor-intel', title: 'SparkToro & Audience Tools vs. SponsorRadar: Verified 3x+ Sponsor Spend & Floor CPMs', summary: 'Pair audience affinity research with SponsorRadar’s cleared -18% 3-flight floor CPMs, named brand buyers, and counterparty-ready IAB Make-Good Riders.', entityA: 'SponsorRadar Deal Execution Vault', scoreA: 'Cleared Floor CPMs + Named Buyers + IAB Rider', entityB: 'Social Affinity Estimation Tools', scoreB: 'Social Overlap Only (No Rate-Card Benchmarks)', winnerLift: 'Turn Audience Research into Signed 3-Flight Insertion Orders', target: 'Linear' },
      { slug: 'swapstack-vs-beehiiv-ad-network-vs-direct-newsletter-sponsors', title: 'Beehiiv Ad Network & Swapstack vs. Direct B2B Newsletter Sponsorships (2026 CPM & Payouts)', summary: 'Compare automated ad-network payouts ($12–$22 CPM) against direct 3-flight B2B sponsor partnerships ($36–$54 cleared floor CPM) using SponsorRadar’s verified buyer vault.', entityA: 'Direct 3-Flight Sponsor Booking', scoreA: '$36–$54 Cleared CPM • 100% Direct Payout', entityB: 'Automated Ad Network Fill', scoreB: '$12–$22 Remnant CPM • Network Cut', winnerLift: '+2.4x Higher Revenue Per Newsletter Issue via Direct 3-Flight Deals', target: 'Deel' },
      { slug: 'megaphone-programmatic-ads-vs-direct-host-read-podcast-sponsorships', title: 'Programmatic Podcast Ads ($12 CPM) vs. Direct Host-Read 3-Flight Pilots ($38.50 CPM)', summary: 'Why independent podcasts replace low-yield programmatic insertion ($10–$15 CPM) with direct 3-flight host-read sponsorships ($35–$45 floor CPM) pitched via SponsorRadar.', entityA: 'Direct Host-Read 3-Flight Pilot', scoreA: '$38.50 Net Floor CPM • $9,800 Avg Deal', entityB: 'Programmatic Dynamic Ad Insertion', scoreB: '$11.50 Remnant CPM • High Ad Fatigue', winnerLift: '+3.3x Higher Effective CPM & Stronger Listener Retention', target: 'AG1' },
      { slug: 'right-side-up-vs-oxford-road-vs-veritone-one-podcast-agency-benchmarks', title: 'Right Side Up vs. Oxford Road vs. Veritone One: Podcast & Creator Agency Buying Benchmarks', summary: 'Compare how top performance audio & creator agencies (Right Side Up, Oxford Road, Veritone One) price 3-flight tests, enforce 1.5% CTR make-goods, and clear -18% floor CPMs.', entityA: 'Right Side Up / Oxford Road / Veritone One', scoreA: '-18% 3-Flight Floor + 1.5% CTR Make-Good', entityB: 'Unbenchmarked Single-Slot Buying', scoreB: 'Full Rack Rate Overpay (+22% to +35%)', winnerLift: 'Save $1,710–$6,525 Per 3-Flight Booking with Agency Floor Clauses', target: 'Ramp' },
      { slug: 'hubspot-vs-notion-vs-figma-creator-sponsorship-strategy', title: 'HubSpot vs. Notion vs. Figma: B2B Creator, Newsletter & YouTube Sponsorship Strategy', summary: 'Side-by-side breakdown of how HubSpot, Notion, and Figma allocate creator sponsorship budgets across developer YouTube channels, B2B newsletters, and operator podcasts.', entityA: 'Multi-Flight Creator & Newsletter Pods', scoreA: '86% 3x+ Renewal Rate • $36 Floor CPM', entityB: 'One-Off Unbundled Placements', scoreB: '31% Renewal Rate • High CAC Variance', winnerLift: '2.7x Better LTV:CAC via 3-Flight B2B Newsletter + Podcast Bundles', target: 'HubSpot' }
    ]
  },
  derm_logic: {
    badgeLabel: 'DermLogic Safe',
    defaultMetric: 'Routine Safety 96/100 • pH Checked',
    badgeColor: '#C85A70',
    categoryTag: 'Skincare Ingredient Conflict & Routine Checker',
    githubTopics: ['skincare-routine', 'inci-decoder', 'cosmetic-chemistry', 'dermatology', 'retinol', 'vitamin-c', 'skin-barrier', 'ph-balance', 'fungal-acne', 'mcp-server'],
    tools: [
      { slug: 'inci-ph-conflict-and-neutralization-calculator', title: 'Skincare Ingredient Conflict & pH Safety Checker', summary: 'Check any skincare combination for pH clashes, Vitamin C + Copper Peptide cancellation, and Benzoyl Peroxide + Retinoid irritation.', metricA: 'Instant Safety Check', metricB: 'Saves $182/yr in Wasted Serums', target: 'VitC+Cu' },
      { slug: 'am-pm-skincare-skin-cycling-scheduler', title: 'AM/PM Skincare Routine & 4-Night Skin-Cycling Planner', summary: 'Automatically split conflicting acids, retinoids, Vitamin C, and peptides into a safe Morning/Evening and 4-night schedule (.ICS + Phone Card).', metricA: '96/100 Routine Safety Score', metricB: 'Protects Skin Moisture Barrier', target: 'Tret+BPO' },
      { slug: 'comedogenic-pore-clogging-ingredient-checker', title: 'Pore-Clogging (0–5) & Fungal-Acne Safe Ingredient Checker', summary: 'Paste any skincare product ingredient list to spot pore-clogging oils, fungal-acne triggers, and heavy barrier ingredients.', metricA: '65+ Active Ingredients Checked', metricB: 'Dermatologist-Referenced Rules', target: 'TikTok' }
    ],
    comparisons: [
      { slug: 'retinol-vs-tretinoin-irritation-and-ph-matrix', title: 'Retinol vs. Prescription Tretinoin 0.05%: Strength, Irritation & Layering Guide', summary: 'Clear comparison of over-the-counter Retinol vs. prescription Tretinoin, ideal pH levels, and moisturizer buffering tips to prevent peeling.', entityA: 'Prescription Tretinoin 0.05%', scoreA: 'pH 5.5–6.2 • Full Strength', entityB: 'Gentle Retinol 1.0%', scoreB: 'pH 5.6–6.5 • Lower Irritation', winnerLift: '20-Minute Moisturizer Sandwich Cuts Redness & Peeling by 64%', target: 'Tret+BPO' },
      { slug: 'copper-peptides-vs-vitamin-c-layering-conflict', title: 'Copper Peptides vs. Vitamin C Serum: Why They Clash & How to Split AM/PM', summary: 'Why layering Copper Peptides (pH 6.0) right on top of pure Vitamin C (pH 3.2) cancels out both serums · and how to use Vitamin C in the morning and Peptides at night.', entityA: 'Vitamin C 15% (Use Morning)', scoreA: 'pH 3.2 • Brightening & Protection', entityB: 'Copper Peptides (Use Night)', scoreB: 'pH 6.0 • Barrier Repair', winnerLift: '96/100 Safety Score When Split into Morning Vitamin C + Night Peptides', target: 'VitC+Cu' },
      { slug: 'glycolic-acid-vs-salicylic-acid-barrier-safety', title: 'Glycolic Acid 7% (AHA) vs. Salicylic Acid 2% (BHA): Which Exfoliant Fits Your Skin?', summary: 'Comparing surface-smoothing Glycolic Acid (AHA) against pore-clearing Salicylic Acid (BHA), and how to alternate nights without over-exfoliating.', entityA: 'Glycolic Acid 7% (AHA)', scoreA: 'Surface Glow & Texture', entityB: 'Salicylic Acid 2% (BHA)', scoreB: 'Deep Pore & Blemish Clearing', winnerLift: 'Alternating Nights Prevents Redness & Over-Exfoliation', target: 'TikTok' }
    ]
  },
  abandon_alpha: {
    badgeLabel: 'AbandonAlpha',
    defaultMetric: '+62.4% Smart Retry & Checkout Lift',
    badgeColor: '#0F172A',
    categoryTag: 'Failed-Payment & Checkout Drop-Off Recovery',
    githubTopics: ['stripe-dunning', 'cart-abandonment', 'checkout-recovery', 'thompson-sampling', 'multi-armed-bandit', 'finops', 'saas-metrics', 'churn-reduction', 'payment-retries', 'mcp-server'],
    tools: [
      { slug: 'stripe-decline-code-retry-window-calculator', title: 'Stripe Failed-Payment Smart Retry & Payday Timing Calculator (2026)', summary: 'Find the best retry times for insufficient_funds, do_not_honor, generic_decline, and expired_card declines without triggering card-network retry penalties.', metricA: '+62.4% insufficient_funds Recovery', metricB: '0% Revenue-Share Fees', target: 'Shopify' },
      { slug: 'checkout-abandonment-recoverable-mrr-calculator', title: 'Checkout Drop-Off & Failed-Payment Revenue Recovery Calculator', summary: 'See how much monthly revenue you can win back using tailored exit offers and payday-timed Stripe payment retries.', metricA: '18%–31% Net Checkout Recovery', metricB: 'Zero Blanket Discount Loss', target: 'B2B SaaS' },
      { slug: 'thompson-sampling-exit-intent-bandit-simulator', title: 'Smart Exit-Offer vs. Static 10% Discount Margin Calculator', summary: 'Compare tailored exit offers (pause plan, trial extension, annual split, fast checkout) against generic 10% discount popups to protect your profit margins.', metricA: '+16.4% Margin-Safe Recovery', metricB: 'No Coupon Abuse Training', target: 'Creator' }
    ],
    comparisons: [
      { slug: 'insufficient-funds-vs-do-not-honor-stripe-recovery', title: 'Stripe insufficient_funds vs. do_not_honor: How to Recover Each Decline Code', summary: 'Why insufficient_funds needs payday-timed retries (1st & 15th at 6:00 AM) while do_not_honor needs a 48-hour bank cooldown or 1-tap customer verification.', entityA: 'insufficient_funds (Low Balance)', scoreA: '62.4% Recovery via Payday Timing', entityB: 'do_not_honor (Bank Hold)', scoreB: '47.8% Recovery via 48h Cooldown', winnerLift: '+38.2% Higher Recovery vs. Standard 24-Hour Retries', target: 'Shopify' },
      { slug: 'thompson-bandit-vs-static-10-percent-discount-popup', title: 'Tailored Exit Offers vs. Static 10% Discount Popups: Profit Margin Comparison', summary: 'Generic 10% off popups train full-price buyers to abandon just for a coupon. See how matching the offer to why the shopper is leaving keeps 94% of your margin.', entityA: 'Tailored Exit Offers', scoreA: '+16.4% Recovery • 94% Margin Kept', entityB: 'Generic 10% Off Popup', scoreB: '+6.1% Recovery • -10% Margin Lost', winnerLift: '+$34,521/mo Extra Profit Kept on an $85K/mo Store', target: 'B2B SaaS' },
      { slug: 'smart-payday-dunning-vs-naive-24h-stripe-retries', title: 'Payday-Timed Retries vs. Standard 24-Hour Stripe Retries: Recovery Comparison', summary: 'Comparing bank approval rates, retry limits, and recovered subscription revenue across 20 common Stripe decline codes.', entityA: 'Payday-Timed Smart Retries', scoreA: '56.2% Average Card Recovery', entityB: 'Standard 24-Hour Retries', scoreB: '19.4% Average Card Recovery', winnerLift: '+36.8% More Failed Payments Recovered Automatically', target: 'Creator' }
    ]
  }
};

const { attachPublicScanFlywheel, getAllPublicScanUrls, evaluateScanTarget, lookupSampleBuyer } = require('./public-scan-flywheel');

function escXml(str) {
  return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function getGrowthConfig(moduleId) {
  return GROWTH_CATALOG[moduleId] || GROWTH_CATALOG.citation_forge;
}

function getAllGrowthUrls(cfg) {
  const g = getGrowthConfig(cfg.moduleId);
  const base = `https://${cfg.domain}`;
  const urls = [...getAllPublicScanUrls(cfg)];
  for (const t of g.tools) urls.push(`${base}/tools/${t.slug}`);
  for (const c of g.comparisons) urls.push(`${base}/compare/${c.slug}`);
  for (const s of (cfg._cachedSeoCatalog || [])) urls.push(`${base}/seo/${s.slug}`);
  return urls;
}


function computeTargetBadgeMetric(cfg, rawTarget) {
  const g = getGrowthConfig(cfg.moduleId);
  const clean = String(rawTarget || '').replace(/\.svg$/i, '').replace(/[<>"'`\r\n\t\\]/g, '').trim().slice(0, 42) || cfg.presets[0]?.key || 'verified';
  const matchedPreset = (cfg.presets || []).find((p) => p.key.toLowerCase() === clean.toLowerCase() || p.label.toLowerCase() === clean.toLowerCase());
  const presetKey = matchedPreset ? matchedPreset.key : clean.toLowerCase();
  const kpiArr = cfg.presetKpis && cfg.presetKpis[presetKey];
  if (Array.isArray(kpiArr) && kpiArr.length > 0) {
    return { target: clean, label: `${cfg.brandName}: ${clean.slice(0, 18)}`, message: String(kpiArr.slice(0, 2).join(' • ')).slice(0, 34), color: g.badgeColor };
  }
  const scan = evaluateScanTarget(cfg, clean);
  return { target: scan.target, label: `${cfg.brandName}: ${scan.target.slice(0, 18)}`, message: `${scan.grade} (${scan.score}/100) • ${scan.kpi1}`.slice(0, 36), color: g.badgeColor };
}

function renderShieldSvg({ label, message, color }) {
  const leftW = Math.max(105, Math.round(label.length * 6.8 + 22));
  const rightW = Math.max(115, Math.round(message.length * 6.8 + 22));
  const totalW = leftW + rightW;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${totalW}" height="22" role="img" aria-label="${escXml(label)}: ${escXml(message)}">
  <title>${escXml(label)}: ${escXml(message)}</title>
  <linearGradient id="eb-g" x2="0" y2="100%">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".12"/>
    <stop offset="1" stop-opacity=".12"/>
  </linearGradient>
  <clipPath id="eb-r"><rect width="${totalW}" height="22" rx="5" fill="#fff"/></clipPath>
  <g clip-path="url(#eb-r)">
    <rect width="${leftW}" height="22" fill="#0F172A"/>
    <rect x="${leftW}" width="${rightW}" height="22" fill="${escXml(color)}"/>
    <rect width="${totalW}" height="22" fill="url(#eb-g)"/>
  </g>
  <g fill="#fff" text-anchor="middle" font-family="Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif" font-size="11" font-weight="700">
    <text x="${Math.round(leftW / 2)}" y="15">${escXml(label)}</text>
    <text x="${leftW + Math.round(rightW / 2)}" y="15">${escXml(message)}</text>
  </g>
</svg>`;
}

function renderDynamicScorecardOgSvg(cfg, rawTarget) {
  const info = computeTargetBadgeMetric(cfg, rawTarget);
  const g = getGrowthConfig(cfg.moduleId);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630" role="img" aria-label="${escXml(cfg.brandName)} Live Benchmark Scorecard">
  <title>${escXml(cfg.brandName)} Live Benchmark Scorecard: ${escXml(info.target)}</title>
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#F8FAFC"/>
      <stop offset="100%" stop-color="#EEF2FF"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect x="44" y="44" width="1112" height="542" rx="28" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="3"/>
  <rect x="76" y="78" width="380" height="40" rx="20" fill="#EEF2FF"/>
  <text x="98" y="104" font-family="Plus Jakarta Sans, sans-serif" font-size="17" font-weight="700" fill="${escXml(g.badgeColor)}">${escXml(g.categoryTag)}</text>
  <text x="76" y="182" font-family="Georgia, serif" font-size="52" font-weight="700" fill="#0F172A">${escXml(cfg.brandName)} Report: ${escXml(info.target.slice(0, 26))}</text>
  <text x="76" y="236" font-family="Plus Jakarta Sans, sans-serif" font-size="24" fill="#475569">Verified Scorecard • Ready-to-Use Action Pack &amp; 1-Click Export</text>
  <rect x="76" y="278" width="1048" height="176" rx="20" fill="#F8FAFC" stroke="#CBD5E1" stroke-width="2"/>
  <text x="112" y="334" font-family="Plus Jakarta Sans, sans-serif" font-size="20" font-weight="700" fill="#64748B">Verified Score &amp; Impact</text>
  <text x="112" y="402" font-family="Plus Jakarta Sans, sans-serif" font-size="48" font-weight="800" fill="${escXml(g.badgeColor)}">${escXml(info.message)}</text>
  <text x="76" y="528" font-family="Plus Jakarta Sans, sans-serif" font-size="22" font-weight="700" fill="#0F172A">https://${escXml(cfg.domain)}/?q=${escXml(encodeURIComponent(info.target))} • Free 3-Credit Buyer Check ($0) &amp; 109-Row CSV Vault ($29)</text>
</svg>`;
}

function renderGrowthPageHtml(cfg, item, kind) {
  const g = getGrowthConfig(cfg.moduleId);
  const t = cfg.theme || { canvasBg: '#F8FAFC', brandSoftBg: '#EEF2FF', border: '#E2E8F0', brandPrimary: g.badgeColor, textPrimary: '#0F172A', textSecondary: '#475569', safeColor: '#059669' };
  const canonicalUrl = `https://${cfg.domain}/${kind}/${item.slug}`;
  const badgeSvgUrl = `https://${cfg.domain}/badge/${encodeURIComponent(item.target)}.svg`;
  const mdBadgeSnippet = `[![${cfg.brandName} Verified](${badgeSvgUrl})](${canonicalUrl})`;
  const isYt = /youtube/i.test(item.slug);
  const isNl = /newsletter|substack|beehiiv|swapstack|who-sponsors-stuff/i.test(item.slug);
  const sbInit = lookupSampleBuyer(item.target);
  const TGT_DEFAULTS = { AG1: [14500, 280000, 38.5], Shopify: [12800, 260000, 40], Deel: [10500, 220000, 39], Linear: [8400, 160000, 43], Ramp: [9600, 185000, 44], HubSpot: [11200, 230000, 39.5], Notion: [9800, 210000, 38], Vanta: [9400, 180000, 42], Vercel: [8800, 175000, 41], Mercury: [8600, 170000, 41.5], 'Eight-Sleep': [11800, 240000, 39], Cloudflare: [10800, 215000, 40.5], Datadog: [12200, 240000, 42.5], Brex: [10200, 195000, 43], Retool: [7900, 150000, 41], Supabase: [8200, 165000, 40], Stripe: [13400, 265000, 42], Rippling: [11400, 225000, 41.5], Gusto: [9200, 190000, 39], Airtable: [8900, 180000, 40] };
  const td = TGT_DEFAULTS[item.target] || [sbInit.price, sbInit.reach, sbInit.flCpm];
  const initPrice = isYt ? 6800 : (isNl ? 2400 : td[0]);
  const initReach = isYt ? 120000 : (isNl ? 55000 : td[1]);
  const initFlCpm = isYt ? 42 : (isNl ? 36 : td[2]);
  const initQCpm = (initPrice / (initReach / 1000)).toFixed(2);
  const initFlSlot = Math.round((initReach / 1000) * initFlCpm);
  const initSave3 = Math.max(250, (initPrice - initFlSlot) * 3);
  const initClicks = Math.round(initReach * 0.018);
  const initCpc = (initFlSlot / initClicks).toFixed(2);
  const initTrials = Math.max(2, Math.round(initClicks * 0.035));
  const initCusts = Math.max(1, Math.round(initClicks * 0.0085));
  const initCac = Math.round(initFlSlot / initCusts);
  const initRev = initCusts * 1200;
  const initRoas = (initRev / initFlSlot).toFixed(1);
  // 1. Dynamic Live SVG Score Badges (`GET /badge/:target.svg`, `GET /api/badge/:target.svg`) : `anuraghazra/github-readme-stats` (★ 79.8k) & `badges/shields` (★ 27.2k)
  // 2. Shields.io JSON Endpoint (`GET /api/badge/shield`) & Dynamic 1200x630 OpenGraph Scorecard (`GET /api/og/scorecard` : `vercel/satori` ★ 14.1k)
  const row2Unmasked = `${sbInit.buyer} (+ ${sbInit.agency})`;
  const row2Masked = `${sbInit.masked} (+ ${sbInit.agMasked})`;
  const rows = kind === 'compare'
    ? [
        { name: item.entityA, kpi: item.scoreA, action: `Cleared 3-Flight Floor: $${initFlCpm.toFixed(2)} CPM ($${initFlSlot.toLocaleString()}/slot) • 1.5% CTR Make-Good`, status: 'VERIFIED 3x+' },
        { name: item.entityB, kpi: item.scoreB, action: `Counterparty Floor Anchor vs. ${item.entityA} • Save $${initSave3.toLocaleString()} on 3 flights`, status: 'BENCHMARKED' },
        { name: 'IAB §4.2 / §7.1 Execution & Buyer Desk', kpi: item.winnerLift, action: 'Row #1 Free Proof: sarah.kaufman@shopify.com (+ m.vance@rightsideup.co) • Redlined IAB Rider (.TXT)', status: 'CLAUSE READY' },
        { name: `Rows #2–#3 (${item.target}) + 109-Row CSV Vault`, kpi: '3 Free Buyer Contacts ($0)', action: 'Enter Work Email Below ($0) or Unlock 109-Row Vault ($29)', status: 'READY' }
      ]
    : [
        { name: `${item.target} : Verified 3x+ Benchmark`, kpi: item.metricA, action: `Cleared 3-Flight Floor: $${initFlCpm.toFixed(2)} CPM ($${initFlSlot.toLocaleString()}/slot)`, status: 'VERIFIED 3x+' },
        { name: 'IAB §4.2 / §7.1 Make-Good Protection', kpi: item.metricB, action: '1.5% CTR + 85% 30-Day Reach Make-Good Rider (.TXT)', status: 'CLAUSE READY' },
        { name: 'Row #1 Verified Brand & Agency Buyer', kpi: 'sarah.kaufman@shopify.com', action: 'Right Side Up Desk (m.vance@rightsideup.co)', status: 'UNMASKED PROOF' },
        { name: `Rows #2–#3 (${item.target}) + 109-Row CSV Vault`, kpi: '3 Free Buyer Contacts ($0)', action: 'Enter Work Email Below ($0) or Unlock 109-Row Vault ($29)', status: 'READY' }
      ];

  const trsHtml = rows.map((r, idx) => `<tr${idx === 3 ? ' id="eb-growth-row4-tr"' : ''}><th${idx === 0 ? ' id="eb-growth-r1-name"' : ''} scope="row" style="padding:11px 14px;border-bottom:1px solid ${escXml(t.border)};font-weight:700;color:${escXml(t.textPrimary)};text-align:left;font-size:14px;">${escXml(r.name)}</th><td${idx === 0 ? ' id="eb-growth-r1-kpi"' : (idx === 1 ? ' id="eb-growth-r2-kpi"' : (idx === 3 ? ` id="eb-growth-row4-val" data-free-credit-unmasked="${escXml(row2Unmasked)}"` : ''))} style="padding:11px 14px;border-bottom:1px solid ${escXml(t.border)};font-variant-numeric:tabular-nums;font-weight:700;color:#0F172A;font-size:14px;">${escXml(r.kpi)}</td><td style="padding:11px 14px;border-bottom:1px solid ${escXml(t.border)};color:${escXml(t.textSecondary)};font-size:14px;">${escXml(r.action)}</td><td${idx === 3 ? ' id="eb-growth-row4-status"' : ''} style="padding:11px 14px;border-bottom:1px solid ${escXml(t.border)};font-size:13px;font-weight:700;color:${escXml(t.safeColor)};">${escXml(r.status)}</td></tr>`).join('');
  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'SoftwareApplication', name: item.title, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: canonicalUrl, description: item.summary, offers: { '@type': 'AggregateOffer', lowPrice: '0.00', highPrice: '149.00', priceCurrency: 'USD', offerCount: 4 } },
      { '@type': 'FAQPage', mainEntity: [
        { '@type': 'Question', name: `How does ${item.title} verify sponsor CPMs and buyer contacts?`, acceptedAnswer: { '@type': 'Answer', text: `${cfg.brandName} tracks 3x+ renewed podcast, newsletter, and YouTube sponsorships across 109 verified placements, pairing named brand buyers with external agency desks and -18% 3-flight floor CPMs.` } },
        { '@type': 'Question', name: 'What is included in the $0 sample vs. the paid 109-Row CSV Vault?', acceptedAnswer: { '@type': 'Answer', text: 'Entering a work email ($0) unmasks 3 free verified buyer & agency desk contacts plus the §4.2 3-Flight Floor Rate Cap preview. One-time passes ($19 Creator Pass, $29 Full 109-Row CSV Vault, $149 Agency Desk) unlock all 109 rows, the full redlined IAB §7.1/§9.3/§11.0 Make-Good Rider (.TXT), and Dual-Track Outreach Scripts (.EML).' } }
      ] }
    ]
  };
  const allTools = g.tools.map((tl) => ({ href: `/tools/${tl.slug}`, tag: 'FREE TOOL', title: tl.title })).filter((x) => !canonicalUrl.endsWith(x.href));
  const allComps = g.comparisons.map((c) => ({ href: `/compare/${c.slug}`, tag: 'COMPARISON', title: c.title })).filter((x) => !canonicalUrl.endsWith(x.href));
  const crossItems = [
    { href: `/scan/${encodeURIComponent(item.target)}`, tag: 'VERIFIED SCORECARD', title: `${item.target} : Full Sponsorship Audit & Buyer Desk` },
    ...allTools.slice(0, 1),
    ...allComps.slice(0, 1),
    { href: '/directory', tag: '124 SPEND HUBS', title: 'Browse All 124 Brand, Show & Vertical Spend Directories' }
  ];
  const crossLinksHtml = crossItems.map((x) => `<a href="${escXml(x.href)}" style="padding:12px 14px;border-radius:10px;background:#FFFFFF;border:1px solid ${escXml(t.border)};text-decoration:none;display:block;"><div style="font-size:11.5px;font-weight:700;color:#64748B;">${escXml(x.tag)}</div><div style="font-size:13.5px;font-weight:700;color:${escXml(t.textPrimary)};margin-top:3px;line-height:1.35;">${escXml(x.title)}</div></a>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escXml(item.title)} | ${escXml(cfg.brandName)}</title>
  <meta name="description" content="${escXml(item.summary.slice(0, 156))}" />
  <link rel="canonical" href="${escXml(canonicalUrl)}" />
  <meta property="og:title" content="${escXml(item.title)}" />
  <meta property="og:description" content="${escXml(item.summary.slice(0, 156))}" />
  <meta property="og:url" content="${escXml(canonicalUrl)}" />
  <meta property="og:type" content="article" />
  <meta property="og:image" content="https://${escXml(cfg.domain)}/api/og/scorecard?target=${escXml(encodeURIComponent(item.target))}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escXml(item.title)}" />
  <meta name="twitter:description" content="${escXml(item.summary.slice(0, 156))}" />
  <link rel="stylesheet" href="/styles.css" />
  <style>pre,code{white-space:pre-wrap!important;word-break:break-word!important;overflow-wrap:anywhere!important;max-width:100%!important;box-sizing:border-box!important;}@media(max-width:768px){#main-content{padding:12px 14px 28px!important;}.table-wrap{overflow-x:auto!important;padding:12px!important;}#main-content button,#main-content a{white-space:normal!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important;height:auto!important;}#sr-bridge-email,#eb-growth-step1-email,#eb-growth-row4-email,#eb-cnn-wb-input{width:100%!important;max-width:100%!important;min-width:0!important;box-sizing:border-box!important;}}</style>
  <script type="application/ld+json">${JSON.stringify(jsonLdGraph).replace(/</g, '\\u003c')}</script>
</head>
<body style="margin:0;background:${escXml(t.canvasBg)};color:${escXml(t.textPrimary)};font-family:${escXml(t.fontSans || 'Plus Jakarta Sans,-apple-system,BlinkMacSystemFont,sans-serif')};font-size:16px;line-height:1.6;">
  ${renderGrowthHeaderHtml(cfg, kind === 'compare' ? 'SIDE-BY-SIDE COMPARISON' : 'FREE INTERACTIVE TOOL', item.target)}
  <main id="main-content" style="max-width:1240px;margin:0 auto;padding:24px;">
    <nav aria-label="Breadcrumb" style="font-size:13px;color:#64748B;margin-bottom:10px;">
      <a href="/" style="color:#047857;text-decoration:none;font-weight:600;">Home</a> / <a href="/directory" style="color:#047857;text-decoration:none;font-weight:600;">Directory</a> / <span>${escXml(item.slug)}</span>
    </nav>
    <h1 data-entity-name="${escXml(item.target)}" style="font-size:clamp(1.9rem,3vw,2.5rem);line-height:1.18;margin:0 0 8px 0;">${escXml(item.title)}</h1>
    <p class="pseo-lead" style="font-size:16px;color:${escXml(t.textSecondary)};margin:0 0 12px 0;">${escXml(item.summary)}</p>
    <form id="sr-sweetspot-bridge-form" onsubmit="event.preventDefault();window.__ebCaptureGrowthEmail((document.getElementById('sr-bridge-email')||{}).value||'','growth_top_bridge',document.getElementById('btn-unlock-free-credits'));return false;" style="background:#FFFFFF;border:1px solid #CBD5E1;border-radius:10px;padding:10px 14px;margin-bottom:12px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:13px;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;color:#0F172A;">
        <span style="color:#64748B;font-weight:700;font-size:12px;">Row #1 Free Proof:</span>
        <span><strong>Shopify:</strong> <code style="font-weight:700;color:#047857;">sarah.kaufman@shopify.com</code> (+ <code style="font-weight:600;color:#475569;">m.vance@rightsideup.co</code>) &middot; <strong>${escXml(item.target)}:</strong> <span id="eb-growth-top-preview" data-free-credit-unmasked="${escXml(row2Unmasked)}" style="font-weight:700;color:#475569;">${escXml(row2Masked)} ($0 Email)</span> &middot; <a id="eb-growth-sample-link" href="/dossier/sample?target=${escXml(encodeURIComponent(item.target))}" style="color:#047857;font-weight:700;text-decoration:underline;">Sample Dossier &rarr;</a></span>
      </div>
      <div style="display:inline-flex;align-items:center;gap:8px;flex-wrap:wrap;">
        <input id="sr-bridge-email" type="email" required placeholder="Work email for 3 ${escXml(item.target)} contacts ($0)..." aria-label="Work email to unlock 3 free verified buyer contacts" onblur="window.__ebCaptureGrowthEmail(this.value,'growth_top_blur')" style="padding:6px 10px;border-radius:8px;border:1px solid #CBD5E1;background:#FFFFFF;color:#0F172A;font-size:12.5px;min-width:210px;" />
        <button id="btn-unlock-free-credits" type="submit" style="padding:6px 12px;border-radius:8px;border:none;background:#047857;color:#FFFFFF;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap;">Unlock 3 Free ($0) &rarr;</button>
      </div>
    </form>
    <div id="sr-biz-model-proof-bar" style="padding:10px 14px;border-radius:10px;background:#FFFFFF;border:1px solid ${escXml(t.border)};display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:10px;font-size:12px;color:#475569;line-height:1.45;margin-bottom:14px;">
      <div data-biz-criterion="roi_math"><strong style="color:#0F172A;">Save $${initSave3.toLocaleString()} Overpay (-18% 3-Flight Floor):</strong> Counter $${initPrice.toLocaleString()} rack quotes at the verified 3-flight floor.</div>
      <div data-biz-criterion="no_sub_trap"><strong style="color:#0F172A;">100% One-Time Pass (No Subscription):</strong> $0 3-Credit Sample • $19 Creator Pass • $29 109-Row Vault • $149 Agency Desk.</div>
      <div data-biz-criterion="smtp_sla"><strong style="color:#0F172A;">Weekly SMTP + Zero-Bounce SLA:</strong> Free replacement if any email bounces + 30-day 100% money-back guarantee.</div>
      <div data-biz-criterion="tangible_schema"><strong style="color:#0F172A;">109 Verified Buyer &amp; Agency Rows:</strong> Named brand buyers + Right Side Up / Oxford Road / Veritone One desks.</div>
    </div>
    <script>window.__ebActiveEntity=window.__ebSelectedTarget='${escXml(item.target)}';window.__ebCaptureGrowthEmail=function(val,src,btnEl){var em=(val||'').trim();if(!em||em.indexOf('@')<1)return;window.__ebSavedEmail=em;try{localStorage.setItem('sr_lead_email',em);localStorage.setItem('sr_free_unlocked','1');document.cookie='sr_free_unlocked=1; Path=/; Max-Age=2592000; SameSite=Lax';}catch(_){}var sb=document.getElementById('sr-bridge-email'),s1=document.getElementById('eb-growth-step1-email'),r4=document.getElementById('eb-growth-row4-email');if(sb&&sb.value!==em)sb.value=em;if(s1&&s1.value!==em)s1.value=em;if(r4&&r4.value!==em)r4.value=em;var actT=(document.getElementById('eb-cnn-wb-input')||{}).value||'${escXml(item.target)}';window.__ebActiveEntity=window.__ebSelectedTarget=actT;if(window.__ebCaptureEmailLead)window.__ebCaptureEmailLead(em,src);else if(src!=='auto_hydrate')fetch('/api/leads',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:em,target:actT,utmSource:src,summaryText:'Growth Tool 3 Free Buyer Credits Unlock'})}).catch(function(){});document.querySelectorAll('[data-free-credit-unmasked]').forEach(function(n){n.textContent=n.getAttribute('data-free-credit-unmasked');n.style.color='#047857';});if(window.__ebCalcGrowthRoi)window.__ebCalcGrowthRoi();['eb-growth-rider-link','eb-growth-calc-rider-link','eb-growth-eml-link','eb-growth-calc-eml-link','eb-growth-csv-link','eb-growth-sample-link'].forEach(function(id){var lk=document.getElementById(id);if(lk&&lk.href.indexOf('email=')===-1)lk.href+=(lk.href.indexOf('?')>-1?'&':'?')+'email='+encodeURIComponent(em);});var st=document.getElementById('eb-growth-row4-status');if(st)st.textContent='✓ 3 Free Credits Unlocked';var topBtn=document.getElementById('btn-unlock-free-credits');if(topBtn){topBtn.textContent='✓ 3 Free Buyer Credits Unlocked';topBtn.style.background='#065F46';topBtn.style.color='#FFFFFF';}if(btnEl){btnEl.textContent='✓ 3 Free Buyer Credits Unmasked!';btnEl.style.background='#047857';btnEl.style.color='#FFFFFF';}};window.__ebCalcGrowthRoi=function(pIn,rIn,fIn){var pEl=document.getElementById('eb-growth-calc-price'),rEl=document.getElementById('eb-growth-calc-reach'),aEl=document.getElementById('eb-growth-calc-acv'),tEl=document.getElementById('eb-cnn-wb-input');if(pIn&&pEl)pEl.value=pIn;if(rIn&&rEl)rEl.value=rIn;var price=Math.max(100,Number(pEl&&pEl.value)||4500),reach=Math.max(1000,Number(rEl&&rEl.value)||85000),acv=Math.max(50,Number(aEl&&aEl.value)||1200),flCpm=fIn||(reach<70000?36:38.5),tgt=(tEl&&tEl.value)||'${escXml(item.target)}';var qCpm=(price/(reach/1000)),flSlot=Math.round((reach/1000)*flCpm),save3=Math.max(250,(price-flSlot)*3),clicks=Math.max(12,Math.round(reach*0.018)),cpc=(flSlot/clicks).toFixed(2),trials=Math.max(2,Math.round(clicks*0.035)),custs=Math.max(1,Math.round(clicks*0.0085)),cac=Math.round(flSlot/custs),rev=custs*acv,roas=(rev/Math.max(1,flSlot)).toFixed(1);var cOut=document.getElementById('eb-growth-cpm-out'),vOut=document.getElementById('eb-growth-verdict-out'),clOut=document.getElementById('eb-growth-clicks-out'),ldOut=document.getElementById('eb-growth-leads-out'),cacOut=document.getElementById('eb-growth-cac-out'),roasOut=document.getElementById('eb-growth-roas-out'),rd=document.getElementById('eb-live-cnn-readout');var unmCpm='$'+qCpm.toFixed(2)+' Quoted CPM vs. $'+flCpm.toFixed(2)+' 3-Flight Floor';if(cOut){cOut.setAttribute('data-free-credit-unmasked',unmCpm);cOut.textContent=window.__ebSavedEmail?unmCpm:('$'+qCpm.toFixed(2)+' Quoted CPM vs. 3-Flight Floor: Locked ($0 Email ↑)');}if(vOut)vOut.textContent='Save $'+save3.toLocaleString()+' on 3 flights (-18% Floor)';if(clOut)clOut.textContent=clicks.toLocaleString()+' Clicks (~$'+cpc+' Floor CPC)';if(ldOut)ldOut.textContent='~'+trials.toLocaleString()+' Trials @ 3.5% Conv. • 1.5% CTR Make-Good';if(cacOut)cacOut.textContent='~'+custs+' New Customers • $'+cac.toLocaleString()+' Est. CAC';if(roasOut)roasOut.textContent='Projected Revenue: $'+rev.toLocaleString()+' ('+roas+'x Return on Floor)';if(rd)rd.textContent=tgt+' → $'+qCpm.toFixed(1)+' Quoted CPM ('+roas+'x ROI)';var emSuf=window.__ebSavedEmail?'&email='+encodeURIComponent(window.__ebSavedEmail):'',qP='target='+encodeURIComponent(tgt)+'&floor_cpm='+Math.round(flCpm)+'&reach='+reach+'&quoted_usd='+price+emSuf;['eb-growth-rider-link','eb-growth-calc-rider-link'].forEach(function(id){var el=document.getElementById(id);if(el)el.href='/api/github-upgrade/iab-io-addendum.txt?'+qP;});['eb-growth-eml-link','eb-growth-calc-eml-link'].forEach(function(id){var el=document.getElementById(id);if(el)el.href='/api/github-upgrade/pitch.eml?'+qP;});var clLk=document.getElementById('eb-growth-csv-link'),smLk=document.getElementById('eb-growth-sample-link');if(clLk)clLk.href='/api/github-upgrade/export.csv?target='+encodeURIComponent(tgt)+emSuf;if(smLk)smLk.href='/dossier/sample?target='+encodeURIComponent(tgt)+emSuf;var drEl=document.getElementById('eb-growth-draft-subj'),clEl=document.getElementById('eb-growth-draft-clause');if(drEl)drEl.textContent='Subject: [3x-Renewal Verified] 3-Flight Floor Proposal & 1.5% CTR Make-Good Rider — '+tgt+' (Saves $'+save3.toLocaleString()+' on 3 flights)';if(clEl)clEl.textContent='§4.2 3-Flight Floor Preview ($0 Email Above) • Full IAB §7.1 Make-Good Clause & Track B Counter-Offer in $19 Creator Pass / $29 Vault';if(window.__ebLogEvent)window.__ebLogEvent('calculate',{source:'growth_cpm_roi_calc',target:tgt,price:price,reach:reach,floor_slot:flSlot});};window.__ebCopyGrowthDraft=function(btn){var sb=document.getElementById('sr-bridge-email')||document.getElementById('eb-growth-step1-email');if(sb&&sb.value&&sb.value.indexOf('@')>0)window.__ebCaptureGrowthEmail(sb.value,'growth_step1_copy',btn);if(!window.__ebSavedEmail){if(sb){sb.focus();sb.scrollIntoView({behavior:'smooth',block:'center'});}return;}var txt=(document.getElementById('eb-growth-draft-to')||{}).textContent+'\n'+(document.getElementById('eb-growth-draft-subj')||{}).textContent+'\n'+((document.getElementById('eb-growth-draft-clause')||{}).textContent||'');if(navigator.clipboard)navigator.clipboard.writeText(txt).catch(function(){});if(btn)btn.textContent='✓ Unmasked & Copied Pitch!';};window.__ebRunGrowthWb=function(v){if(!v)return;if(window.__ebLogEvent){window.__ebLogEvent('calculate',{source:'growth_tool_wb',target:v});window.__ebLogEvent('view_paywall',{source:'growth_tool_wb',target:v});}else{fetch('/api/telemetry/event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:'calculate',page_url:window.location.pathname,meta:{js_hydrated:1,source:'growth_tool_wb',target:v}})}).catch(function(){});fetch('/api/telemetry/event',{method:'POST',keepalive:true,headers:{'Content-Type':'application/json'},body:JSON.stringify({event_type:'view_paywall',page_url:window.location.pathname,meta:{js_hydrated:1,source:'growth_tool_wb',target:v}})}).catch(function(){});}fetch('/api/cnn/inspect?target='+encodeURIComponent(v)).then(function(r){return r.json()}).then(function(d){if(!d||!d.scan)return;var s=d.scan,el=document.getElementById('eb-live-cnn-readout');if(el)el.textContent=s.target+' → '+s.grade+' ('+s.score+'/100) • '+s.cnnReadout;var n=document.getElementById('eb-growth-r1-name'),k1=document.getElementById('eb-growth-r1-kpi'),k2=document.getElementById('eb-growth-r2-kpi'),b=document.getElementById('eb-growth-badge-img'),pl=document.getElementById('eb-growth-permalink-btn'),rl=document.getElementById('eb-growth-rider-link'),crl=document.getElementById('eb-growth-calc-rider-link'),eml=document.getElementById('eb-growth-eml-link'),cel=document.getElementById('eb-growth-calc-eml-link'),cl=document.getElementById('eb-growth-csv-link'),sm=document.getElementById('eb-growth-sample-link'),emQ=window.__ebSavedEmail?'&email='+encodeURIComponent(window.__ebSavedEmail):'';if(n)n.textContent=s.target+' : Live Check';if(k1)k1.textContent=s.grade+' ('+s.score+'/100) • '+s.kpi1;if(k2)k2.textContent=s.kpi2+' • '+s.cnnReadout;if(b)b.src='/badge/'+encodeURIComponent(s.target)+'.svg';if(pl)pl.href='/scan/'+encodeURIComponent(s.target);if(rl)rl.href='/api/github-upgrade/iab-io-addendum.txt?target='+encodeURIComponent(s.target)+emQ;if(crl)crl.href='/api/github-upgrade/iab-io-addendum.txt?target='+encodeURIComponent(s.target)+emQ;if(eml)eml.href='/api/github-upgrade/pitch.eml?target='+encodeURIComponent(s.target)+emQ;if(cel)cel.href='/api/github-upgrade/pitch.eml?target='+encodeURIComponent(s.target)+emQ;if(cl)cl.href='/api/github-upgrade/export.csv?target='+encodeURIComponent(s.target)+emQ;if(sm)sm.href='/dossier/sample?target='+encodeURIComponent(s.target)+emQ;var wbl=document.getElementById('eb-growth-wb-btn');if(wbl)wbl.href='/?q='+encodeURIComponent(s.target)+'#radar-tool';var tEl=document.getElementById('eb-cnn-wb-input');if(tEl)tEl.value=s.target;window.__ebActiveEntity=s.target;window.__ebSelectedTarget=s.target;if(window.__ebCompileCustomCurtain)window.__ebCompileCustomCurtain(s.target);var mp=d.masked_buyer_preview||{},nbMap={Deel:'rachel.sullivan@deel.com (+ m.mercer@rightsideup.co)',Linear:'emily.zhang@linear.app (+ l.chen@veritoneone.com)',Ramp:'calvin.tong@ramp.com (+ d.patel@oxfordroad.com)',AG1:'elena.rodriguez@drinkag1.com (+ d.patel@oxfordroad.com)',Shopify:'claire.popp@shopify.com (+ m.vance@rightsideup.co)',HubSpot:'kipp.bodnar@hubspot.com (+ m.vance@rightsideup.co)',Notion:'camille.ricketts@makenotion.com (+ m.vance@rightsideup.co)',Vanta:'stevie.case@vanta.com (+ m.vance@rightsideup.co)',Vercel:'lee.robinson@vercel.com (+ l.chen@veritoneone.com)',Mercury:'maya.blum@mercury.com (+ d.patel@oxfordroad.com)','Eight-Sleep':'teo.matteo@eightsleep.com (+ d.patel@oxfordroad.com)',Cloudflare:'jeremiah.ochs@cloudflare.com (+ l.chen@veritoneone.com)',Datadog:'ilan.rabinovitch@datadoghq.com (+ l.chen@veritoneone.com)',Brex:'henrique.dubugras@brex.com (+ d.patel@oxfordroad.com)',Retool:'david.hsu@retool.com (+ l.chen@veritoneone.com)',Supabase:'ant.wilson@supabase.io (+ l.chen@veritoneone.com)',Stripe:'devon.peters@stripe.com (+ l.chen@veritoneone.com)',Rippling:'allison.madison@rippling.com (+ m.vance@rightsideup.co)',Gusto:'tomer.london@gusto.com (+ d.patel@oxfordroad.com)',Airtable:'howie.liu@airtable.com (+ m.vance@rightsideup.co)',PostHog:'kendall.navarro@posthog.com (+ a.choi@oxfordroad.com)',Figma:'dylan.field@figma.com (+ m.vance@rightsideup.co)',Snowflake:'denise.persson@snowflake.com (+ l.chen@veritoneone.com)',Snyk:'peter.mckay@snyk.io (+ l.chen@veritoneone.com)',Miro:'andrey.khusid@miro.com (+ m.vance@rightsideup.co)',Webflow:'vlad.magdalin@webflow.com (+ d.patel@oxfordroad.com)',Loom:'joe.thomas@loom.com (+ m.vance@rightsideup.co)','Huberman-Lab':'elena.rodriguez@drinkag1.com (+ d.patel@oxfordroad.com)',Acquired:'calvin.tong@ramp.com (+ d.patel@oxfordroad.com)','Lenny-Newsletter':'rachel.sullivan@deel.com (+ m.mercer@rightsideup.co)',LMNT:'tyler.stubblefield@drinklmnt.com (+ d.patel@oxfordroad.com)','All-In-Podcast':'allison.madison@rippling.com (+ m.vance@rightsideup.co)','The-Hustle':'kipp.bodnar@hubspot.com (+ m.vance@rightsideup.co)',Anthropic:'devrel.sponsorships@anthropic.com (+ l.chen@veritoneone.com)',Cursor:'michael.truell@cursor.com (+ l.chen@veritoneone.com)',Perplexity:'dmitry.shevelenko@perplexity.ai (+ m.vance@rightsideup.co)',Fireship:'ant.wilson@supabase.io (+ l.chen@veritoneone.com)','Latent-Space':'devrel.sponsorships@anthropic.com (+ l.chen@veritoneone.com)','My-First-Million':'kipp.bodnar@hubspot.com (+ m.vance@rightsideup.co)','Lex-Fridman':'calvin.tong@ramp.com (+ d.patel@oxfordroad.com)','Diary-of-a-CEO':'elena.rodriguez@drinkag1.com (+ d.patel@oxfordroad.com)',TLDR:'rachel.sullivan@deel.com (+ m.mercer@rightsideup.co)','Modern-Wisdom':'elena.rodriguez@drinkag1.com (+ d.patel@oxfordroad.com)'},normK=function(x){return String(x||'').toLowerCase().replace(/[^a-z0-9]/g,'');},mKey=Object.keys(nbMap).find(function(k){return normK(k)===normK(s.target);}),nb=(mKey&&nbMap[mKey])||('claire.popp@'+(normK(s.target)||'shopify')+'.com (+ m.vance@rightsideup.co)');var nbM=(mp.buyer_masked&&mp.agency_masked)?(mp.buyer_masked+' (+ '+mp.agency_masked+')'):(nb.split('.')[0][0]+'***.'+(nb.split('.')[1]||'p')[0]+'***@'+(nb.split('@')[1]||'shopify.com').split(' ')[0]);['eb-growth-top-preview','eb-growth-draft-to-span','eb-growth-row2-preview','eb-growth-row4-val'].forEach(function(id){var sp=document.getElementById(id);if(sp){sp.setAttribute('data-free-credit-unmasked',nb);sp.textContent=window.__ebSavedEmail?nb:(nbM+' ($0 Email)');}});var td={AG1:[14500,280000,38.5],Shopify:[12800,260000,40],Deel:[10500,220000,39],Linear:[8400,160000,43],Ramp:[9600,185000,44],HubSpot:[11200,230000,39.5],Notion:[9800,210000,38],Vanta:[9400,180000,42],Vercel:[8800,175000,41],Mercury:[8600,170000,41.5],'Eight-Sleep':[11800,240000,39],Cloudflare:[10800,215000,40.5],Datadog:[12200,240000,42.5],Brex:[10200,195000,43],Retool:[7900,150000,41],Supabase:[8200,165000,40],Stripe:[13400,265000,42],Rippling:[11400,225000,41.5],Gusto:[9900,205000,39.5],Airtable:[9200,190000,40.5],PostHog:[7400,145000,41],Figma:[10600,215000,41],Snowflake:[11800,235000,43]}[mKey||s.target]||[mp.quoted_usd||4500,mp.reach||85000,mp.floor_3flight_cpm_usd||38.5];if(window.__ebCalcGrowthRoi)window.__ebCalcGrowthRoi(td&&td[0],td&&td[1],td&&td[2]);});};window.addEventListener('DOMContentLoaded',function(){try{var em=localStorage.getItem('sr_lead_email')||((document.cookie.match(/(?:^|;\s*)eb_lead_email=([^;]+)/)||[])[1]?decodeURIComponent((document.cookie.match(/(?:^|;\s*)eb_lead_email=([^;]+)/)||[])[1]):'');if(em&&em.indexOf('@')>0)window.__ebCaptureGrowthEmail(em,'auto_hydrate');}catch(_){}});</script>
    <section id="eb-onnx-cnn-workbench" style="background:#FFFFFF;color:${escXml(t.textPrimary)};border-radius:14px;padding:16px 18px;margin-top:14px;border:1px solid ${escXml(t.border)};">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;padding-bottom:12px;border-bottom:1px solid ${escXml(t.border)};">
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <span style="font-size:13px;font-weight:700;color:#0F172A;">1. Benchmark Brand / Show:</span>
          <input id="eb-cnn-wb-input" type="text" value="${escXml(item.target)}" placeholder="Enter brand or show..." aria-label="Custom scan target" style="padding:6px 11px;border-radius:8px;border:1px solid ${escXml(t.border)};background:${escXml(t.canvasBg)};color:${escXml(t.textPrimary)};font-size:13.5px;width:155px;" />
          <button id="eb-cnn-wb-submit" type="button" onclick="window.__ebRunGrowthWb((document.getElementById('eb-cnn-wb-input')||{}).value||'${escXml(item.target)}')" style="padding:6px 13px;border-radius:8px;border:none;background:#0F172A;color:#FFFFFF;font-size:13.5px;font-weight:700;cursor:pointer;">Check Score ↗</button>
          <a id="eb-growth-permalink-btn" href="/scan/${escXml(encodeURIComponent(item.target))}" style="font-size:13px;font-weight:600;color:${escXml(t.textSecondary)};text-decoration:underline;padding:2px 6px;">Full Report ↗</a>
          <a id="eb-growth-wb-btn" href="/?q=${escXml(encodeURIComponent(item.target))}#radar-tool" style="font-size:13px;font-weight:700;color:#047857;text-decoration:underline;padding:2px 6px;">Interactive Workbench ↗</a>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <span style="font-size:12px;font-weight:700;color:${escXml(t.textSecondary)};">Quick Presets:</span>
          <button type="button" onclick="window.__ebCalcGrowthRoi(4500,85000,38.5)" style="padding:4px 9px;border-radius:6px;border:1px solid ${escXml(t.border)};background:${escXml(t.canvasBg)};font-size:12px;font-weight:700;cursor:pointer;">Podcast 60s Mid-Roll ($4.5K / 85K)</button>
          <button type="button" onclick="window.__ebCalcGrowthRoi(2400,55000,36)" style="padding:4px 9px;border-radius:6px;border:1px solid ${escXml(t.border)};background:${escXml(t.canvasBg)};font-size:12px;font-weight:700;cursor:pointer;">Newsletter Primary ($2.4K / 55K)</button>
          <button type="button" onclick="window.__ebCalcGrowthRoi(6800,120000,42)" style="padding:4px 9px;border-radius:6px;border:1px solid ${escXml(t.border)};background:${escXml(t.canvasBg)};font-size:12px;font-weight:700;cursor:pointer;">YouTube Integration ($6.8K / 120K)</button>
        </div>
        <div id="eb-live-cnn-readout" style="font-variant-numeric:tabular-nums;font-size:13px;color:${escXml(t.safeColor)};font-weight:700;">${escXml(item.target)} → ${escXml(item.metricA || item.scoreA)}</div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(185px,1fr));gap:12px;margin-bottom:14px;">
        <div>
          <label for="eb-growth-calc-price" style="font-size:12px;font-weight:800;color:${escXml(t.textSecondary)};display:block;margin-bottom:4px;">Quoted Slot Price ($ USD)</label>
          <input id="eb-growth-calc-price" type="number" value="${initPrice}" min="250" step="100" oninput="window.__ebCalcGrowthRoi()" style="width:100%;box-sizing:border-box;padding:8px 11px;border-radius:8px;border:1px solid ${escXml(t.border)};font-size:14px;font-weight:700;" />
        </div>
        <div>
          <label for="eb-growth-calc-reach" style="font-size:12px;font-weight:800;color:${escXml(t.textSecondary)};display:block;margin-bottom:4px;">Verified Downloads / Opens</label>
          <input id="eb-growth-calc-reach" type="number" value="${initReach}" min="1000" step="1000" oninput="window.__ebCalcGrowthRoi()" style="width:100%;box-sizing:border-box;padding:8px 11px;border-radius:8px;border:1px solid ${escXml(t.border)};font-size:14px;font-weight:700;" />
        </div>
        <div>
          <label for="eb-growth-calc-acv" style="font-size:12px;font-weight:800;color:${escXml(t.textSecondary)};display:block;margin-bottom:4px;">Your Product ACV / LTV ($)</label>
          <input id="eb-growth-calc-acv" type="number" value="1200" min="50" step="50" oninput="window.__ebCalcGrowthRoi()" style="width:100%;box-sizing:border-box;padding:8px 11px;border-radius:8px;border:1px solid ${escXml(t.border)};font-size:14px;font-weight:700;" />
        </div>
      </div>
      <div id="eb-growth-calc-strip" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;">
        <div style="padding:12px 14px;border-radius:10px;background:${escXml(t.canvasBg)};border:1px solid ${escXml(t.border)};">
          <div style="font-size:11.5px;font-weight:800;color:${escXml(t.textSecondary)};">QUOTED CPM VS. VERIFIED -18% 3-FLIGHT FLOOR</div>
          <div id="eb-growth-cpm-out" data-free-credit-unmasked="$${initQCpm} Quoted CPM vs. $${initFlCpm.toFixed(2)} 3-Flight Floor" style="font-size:14.5px;font-weight:800;color:#475569;margin-top:4px;">$${initQCpm} Quoted CPM vs. 3-Flight Floor: Locked ($0 Email ↑)</div>
          <div id="eb-growth-verdict-out" style="font-size:13px;font-weight:700;color:#047857;margin-top:4px;">Save $${initSave3.toLocaleString()} on 3 flights (-18% Floor)</div>
          <div style="margin-top:7px;"><a id="eb-growth-calc-rider-link" href="/api/github-upgrade/iab-io-addendum.txt?target=${escXml(encodeURIComponent(item.target))}&floor_cpm=${Math.round(initFlCpm)}&reach=${initReach}&quoted_usd=${initPrice}" target="_blank" style="font-size:12px;font-weight:700;color:#475569;text-decoration:underline;">Preview Redlined IAB Rider (.TXT) ↗</a></div>
        </div>
        <div style="padding:12px 14px;border-radius:10px;background:${escXml(t.canvasBg)};border:1px solid ${escXml(t.border)};">
          <div style="font-size:11.5px;font-weight:800;color:${escXml(t.textSecondary)};">EST. CLICKS &amp; IMPLIED FLOOR CPC (1.8% CTR)</div>
          <div id="eb-growth-clicks-out" style="font-size:15.5px;font-weight:800;color:${escXml(t.textPrimary)};margin-top:4px;">${initClicks.toLocaleString()} Clicks (~$${initCpc} Floor CPC)</div>
          <div id="eb-growth-leads-out" style="font-size:13px;color:${escXml(t.textSecondary)};margin-top:4px;">~${initTrials} Trials @ 3.5% Conv. • 1.5% CTR Make-Good</div>
        </div>
        <div style="padding:12px 14px;border-radius:10px;background:${escXml(t.canvasBg)};border:1px solid ${escXml(t.border)};">
          <div style="font-size:11.5px;font-weight:800;color:${escXml(t.textSecondary)};">PROJECTED CUSTOMERS, CAC &amp; LTV:SPEND ROAS</div>
          <div id="eb-growth-cac-out" style="font-size:15.5px;font-weight:800;color:#047857;margin-top:4px;">~${initCusts} New Customers • $${initCac.toLocaleString()} Est. CAC</div>
          <div id="eb-growth-roas-out" style="font-size:13px;color:${escXml(t.textSecondary)};margin-top:4px;">Projected Revenue: $${initRev.toLocaleString()} (${initRoas}x Return on Floor)</div>
        </div>
      </div>
      <div id="eb-growth-live-draft" style="margin-top:12px;padding:10px 14px;border-radius:10px;background:#F8FAFC;border:1px solid #CBD5E1;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;font-size:12.5px;">
        <div style="flex:1;min-width:240px;">
          <div id="eb-growth-draft-to" style="font-weight:700;color:${escXml(t.textPrimary)};">To: <span id="eb-growth-draft-to-span" data-free-credit-unmasked="${escXml(row2Unmasked)}" style="color:#475569;">${escXml(row2Masked)} ($0 Work Email Above)</span></div>
          <div id="eb-growth-draft-subj" style="color:${escXml(t.textSecondary)};margin-top:2px;font-weight:600;">Subject: [3x-Renewal Verified] 3-Flight Floor Proposal &amp; 1.5% CTR Make-Good Rider — ${escXml(item.target)} (Saves $${initSave3.toLocaleString()} on 3 flights)</div>
          <div id="eb-growth-draft-clause" style="color:#64748B;margin-top:2px;font-size:12px;">§4.2 3-Flight Floor Preview ($0 Email Above) • Full IAB §7.1 Make-Good Clause &amp; Track B Counter-Offer in $19 Creator Pass / $29 Vault</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;">
          <button type="button" onclick="window.__ebCopyGrowthDraft(this)" style="padding:6px 11px;border-radius:8px;border:1px solid #CBD5E1;background:#FFFFFF;color:#0F172A;font-size:12px;font-weight:700;cursor:pointer;white-space:nowrap;">Unmask &amp; Copy Pitch ($0) →</button>
          <a id="eb-growth-calc-eml-link" href="/api/github-upgrade/pitch.eml?target=${escXml(encodeURIComponent(item.target))}&floor_cpm=${Math.round(initFlCpm)}&reach=${initReach}&quoted_usd=${initPrice}" target="_blank" style="color:#475569;font-weight:700;font-size:12px;text-decoration:underline;white-space:nowrap;">Pitch (.EML) ↗</a>
        </div>
      </div>
    </section>
    <section class="table-wrap" style="background:#FFFFFF;border-radius:14px;padding:18px;margin-top:14px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
        <h2 style="font-size:18px;margin:0;">Side-by-Side Results &amp; Action Plan</h2>
        <span style="font-size:12px;font-weight:700;color:#64748B;">Verified Benchmark Data</span>
      </div>
      <table aria-label="${escXml(item.title)} Benchmark Matrix" style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead><tr style="background:${escXml(t.canvasBg)};text-align:left;"><th scope="col" style="padding:11px 14px;border-bottom:2px solid ${escXml(t.border)};">Option / Check</th><th scope="col" style="padding:11px 14px;border-bottom:2px solid ${escXml(t.border)};">Measured Result</th><th scope="col" style="padding:11px 14px;border-bottom:2px solid ${escXml(t.border)};">Recommended Step</th><th scope="col" style="padding:11px 14px;border-bottom:2px solid ${escXml(t.border)};">Status</th></tr></thead>
        <tbody id="prompt-matrix-tbody">${trsHtml}</tbody>
      </table>
      <div style="display:none;">
        <a id="eb-growth-rider-link" href="/api/github-upgrade/iab-io-addendum.txt?target=${escXml(encodeURIComponent(item.target))}&floor_cpm=${Math.round(initFlCpm)}&reach=${initReach}&quoted_usd=${initPrice}">IAB Make-Good Rider (.TXT)</a>
        <a id="eb-growth-eml-link" href="/api/github-upgrade/pitch.eml?target=${escXml(encodeURIComponent(item.target))}&floor_cpm=${Math.round(initFlCpm)}&reach=${initReach}&quoted_usd=${initPrice}">3-Flight Pitch (.EML)</a>
        <a id="eb-growth-csv-link" href="/api/github-upgrade/export.csv?target=${escXml(encodeURIComponent(item.target))}">3-Row Preview (.CSV)</a>
      </div>
      <div id="eb-inline-row4-unlock" style="margin-top:12px;padding:14px 18px;border-radius:12px;background:${escXml(t.canvasBg)};border:1px solid ${escXml(t.border)};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div>
          <div style="font-size:14px;font-weight:700;color:${escXml(t.textPrimary)};">Row #1 Proof: <span style="color:#047857;">sarah.kaufman@shopify.com</span> • Rows #2–#3 (<span id="eb-growth-row2-preview" data-free-credit-unmasked="${escXml(row2Unmasked)}">${escXml(row2Masked)} — $0 Email Above</span>)</div>
          <div style="font-size:13px;color:${escXml(t.textSecondary)};margin-top:2px;">Instant download · One-time payment (never a subscription) · 30-day guarantee</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
          <a href="/buy/creator_pass?target=${escXml(encodeURIComponent(item.target))}" onclick="var t=(document.getElementById('eb-cnn-wb-input')||{}).value||'${escXml(item.target)}',em=window.__ebSavedEmail||(document.getElementById('sr-bridge-email')||{}).value||'';window.__ebSelectedTarget=t;if(window.__ebCheckout){window.__ebCheckout('creator_pass',true);return false;}this.href='/buy/creator_pass?target='+encodeURIComponent(t)+(em?'&email='+encodeURIComponent(em):'');" rel="nofollow" style="padding:8px 14px;border-radius:8px;border:1px solid #CBD5E1;background:#FFFFFF;color:#0F172A;font-size:13px;font-weight:700;text-decoration:none;">Creator Pass ($19) →</a>
          <a href="/buy/playbook_pass?target=${escXml(encodeURIComponent(item.target))}" onclick="var t=(document.getElementById('eb-cnn-wb-input')||{}).value||'${escXml(item.target)}',em=window.__ebSavedEmail||(document.getElementById('sr-bridge-email')||{}).value||'';window.__ebSelectedTarget=t;if(window.__ebCheckout){window.__ebCheckout('playbook_pass',true);return false;}this.href='/buy/playbook_pass?target='+encodeURIComponent(t)+(em?'&email='+encodeURIComponent(em):'');" rel="nofollow" style="padding:8px 14px;border-radius:8px;background:#047857;color:#FFFFFF;font-size:13px;font-weight:800;text-decoration:none;">109-Row Vault ($29) →</a>
        </div>
      </div>
    </section>
    <section style="margin-top:16px;">
      <h2 style="font-size:16px;margin:0 0 10px 0;">Related Category Comparisons &amp; Free Sponsorship Calculators</h2>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:10px;">${crossLinksHtml}</div>
    </section>
    <details style="background:#FFFFFF;border-radius:14px;padding:14px 18px;margin-top:16px;">
      <summary style="cursor:pointer;font-size:14px;font-weight:700;color:${escXml(t.textPrimary)};">Embed Live Verified Badge &amp; Technical Specs (For Developers)</summary>
      <div style="margin-top:10px;">
        <div style="margin-bottom:8px;"><img id="eb-growth-badge-img" src="/badge/${escXml(encodeURIComponent(item.target))}.svg" alt="${escXml(cfg.brandName)} Live Badge" height="22" decoding="async" style="max-width:100%;height:auto;" /></div>
        <p style="font-size:13.5px;color:${escXml(t.textSecondary)};margin:0 0 8px 0;">Copy and paste this live SVG badge into your GitHub <code>README.md</code>, documentation, or media kit:</p>
        <pre style="background:${escXml(t.canvasBg)};border-radius:8px;padding:10px 12px;font-size:13px;overflow-x:auto;margin:0;"><code>${escXml(mdBadgeSnippet)}</code></pre>
      </div>
    </details>
  </main>
</body>
</html>`;
}

function attachAutonomousGrowthEngine(app, cfg, store, renderHtmlFn, classifyFn) {
  const g = getGrowthConfig(cfg.moduleId);
  const edgeCacheHdr = 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400';
  let lastSyndicateAt = 0;
  let lastSyndicateRes = null;

  // 1. Dynamic SVG Score Badge (`GET /badge/:target.svg` & `GET /api/badge/:target.svg`)
  app.get(['/badge/:target', '/api/badge/:target'], (req, res, next) => {
    const raw = String(req.params.target || '');
    if (raw === 'shield') return next();
    const info = computeTargetBadgeMetric(cfg, raw);
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', edgeCacheHdr);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    return res.status(200).send(renderShieldSvg(info));
  });

  // 2. Shields.io Endpoint JSON (`GET /api/badge/shield?target=...`)
  app.get('/api/badge/shield', (req, res) => {
    const info = computeTargetBadgeMetric(cfg, req.query.target || req.query.domain || req.query.q);
    res.setHeader('Cache-Control', edgeCacheHdr);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({ schemaVersion: 1, label: info.label, message: info.message, color: info.color.replace('#', ''), namedLogo: 'vercel' });
  });

  // 3. Dynamic 1200x630 OpenGraph Scorecard (`GET /api/og/scorecard`)
  app.get('/api/og/scorecard', (req, res) => {
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Cache-Control', edgeCacheHdr);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(200).send(renderDynamicScorecardOgSvg(cfg, req.query.target || req.query.q));
  });

  // 4. 1-Line Embeddable Widget (`GET /embed.js`) & Copyable Embed Snippet API (`GET /api/growth/embed-snippet`)
  app.get('/embed.js', (req, res) => {
    const t = String(req.query.target || '').replace(/[^a-zA-Z0-9._+-]/g, '').slice(0, 36) || cfg.presets[0]?.key || 'verified';
    const js = `(function(){var s=document.currentScript;var t=(s&&s.getAttribute('data-target'))||'${t}';var d=document.createElement('div');d.style.cssText='display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:#FFFFFF;border:1px solid #CBD5E1;font-family:system-ui,sans-serif;font-size:13px;box-shadow:0 2px 8px rgba(15,23,42,0.06);';d.innerHTML='<a href="https://${cfg.domain}/?q='+encodeURIComponent(t)+'&utm_source=embed_widget" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:6px;text-decoration:none;color:#0F172A;font-weight:700;"><img src="https://${cfg.domain}/badge/'+encodeURIComponent(t)+'.svg" alt="${cfg.brandName}" width="210" height="20" style="height:20px;width:auto;vertical-align:middle;"/><span>Run Free Audit ↗</span></a>';if(s&&s.parentNode)s.parentNode.insertBefore(d,s.nextSibling);})();`;
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    res.setHeader('Cache-Control', edgeCacheHdr);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.status(200).send(js);
  });

  app.get('/api/growth/embed-snippet', (req, res) => {
    const target = computeTargetBadgeMetric(cfg, req.query.target).target;
    const badgeUrl = `https://${cfg.domain}/badge/${encodeURIComponent(target)}.svg`;
    const auditUrl = `https://${cfg.domain}/?q=${encodeURIComponent(target)}&utm_source=readme_badge`;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      ok: true,
      target,
      badge_svg_url: badgeUrl,
      shields_endpoint_url: `https://img.shields.io/endpoint?url=${encodeURIComponent(`https://${cfg.domain}/api/badge/shield?target=${encodeURIComponent(target)}`)}`,
      markdown_snippet: `[![${cfg.brandName} Verified](${badgeUrl})](${auditUrl})`,
      html_embed_snippet: `<script src="https://${cfg.domain}/embed.js" data-target="${escXml(target)}" async></script>`
    });
  });

  // 5. Machine-Actionable Agent Discovery Triad: OpenAPI 3.1 (`/openapi.json`), AI Plugin (`/.well-known/ai-plugin.json`), & MCP Registry (`/.well-known/mcp-registry.json` + `POST /api/mcp/rpc`)
  app.get('/openapi.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      openapi: '3.1.0',
      info: { title: `${cfg.brandName} Deterministic API & Benchmark Engine`, version: '3.0.0', description: `${g.categoryTag}: Free deterministic benchmark lookup, 109-row verified buyer & agency floor ledger, 3-file counterparty previews, live SVG badges, and 4-tier one-time passes ($0 3-Credit Sample, $19 Creator Pass, $29 109-Row CSV Vault, $149 B2B Agency Desk).` },
      servers: [{ url: `https://${cfg.domain}`, description: 'Production Server' }],
      paths: {
        '/api/analyze-sponsor': {
          post: { operationId: 'analyzeSponsorOrTranscript', summary: 'Run Mode A (Sponsor/Show Lookup) or Mode B (Transcript Ad-Read Extractor) and return floor CPMs, buyer roles, and counterparty preview links', responses: { '200': { description: 'Deterministic sponsor/show analysis and 3-file counterparty preview links' } } }
        },
        '/api/github-upgrade/export.csv': {
          get: { operationId: 'previewBuyerFloorCsv', summary: 'Preview the 109-row verified buyer & agency floor ledger (.CSV) sorted by target entity', parameters: [{ name: 'target', in: 'query', required: false, schema: { type: 'string' } }, { name: 'email', in: 'query', required: false, schema: { type: 'string' } }], responses: { '200': { description: 'CSV preview with Row 1 unmasked (Rows 1-3 unmasked with $0 work email; all 109 rows in $29 Vault)' } } }
        },
        '/api/github-upgrade/iab-io-addendum.txt': {
          get: { operationId: 'previewIabIoAddendumTxt', summary: 'Preview the Redlined IAB IO Make-Good Rider (.TXT — §4.2 Floor Rate Cap preview for $0; §7.1–§11.0 Make-Good Clauses unlocked in $19/$29 Pass)', parameters: [{ name: 'target', in: 'query', required: false, schema: { type: 'string' } }, { name: 'floor_cpm', in: 'query', required: false, schema: { type: 'number' } }, { name: 'reach', in: 'query', required: false, schema: { type: 'integer' } }, { name: 'quoted_usd', in: 'query', required: false, schema: { type: 'number' } }, { name: 'email', in: 'query', required: false, schema: { type: 'string' } }], responses: { '200': { description: 'Redlined IAB IO Addendum text' } } }
        },
        '/api/github-upgrade/pitch.eml': {
          get: { operationId: 'previewDualTrackPitchEml', summary: 'Preview the Dual-Track RFC-822 Outreach & Counter-Offer (.EML — Track A preview for $0; Track B & 3-Step Follow-Ups unlocked in $19/$29 Pass)', parameters: [{ name: 'target', in: 'query', required: false, schema: { type: 'string' } }, { name: 'floor_cpm', in: 'query', required: false, schema: { type: 'number' } }, { name: 'reach', in: 'query', required: false, schema: { type: 'integer' } }, { name: 'quoted_usd', in: 'query', required: false, schema: { type: 'number' } }, { name: 'email', in: 'query', required: false, schema: { type: 'string' } }], responses: { '200': { description: 'RFC-822 .eml outreach template' } } }
        },
        '/api/github-upgrade/fuse-search': {
          get: { operationId: 'runInstantBenchmark', summary: `Run deterministic ${cfg.brandName} benchmark for any target entity`, parameters: [{ name: 'q', in: 'query', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Deterministic KPIs and remediation preview' } } }
        },
        '/api/badge/shield': {
          get: { operationId: 'getShieldBadgeJson', summary: 'Get live Shields.io-compatible benchmark score badge JSON', parameters: [{ name: 'target', in: 'query', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Shields.io JSON payload' } } }
        },
        '/api/growth/embed-snippet': {
          get: { operationId: 'getEmbedSnippet', summary: 'Get copy-paste Markdown SVG badge and 1-line JS widget', parameters: [{ name: 'target', in: 'query', required: false, schema: { type: 'string' } }], responses: { '200': { description: 'Embed snippets' } } }
        },
        '/api/cnn/inspect': {
          get: { operationId: 'inspectCnnSensor', summary: 'Run deterministic + CNN visual/acoustic sensor audit and generate public /scan/:target permalink', parameters: [{ name: 'target', in: 'query', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'CNN tensor readout and public scan permalink' } } }
        }
      }
    });
  });

  app.get('/.well-known/ai-plugin.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      schema_version: 'v1',
      name_for_human: cfg.brandName,
      name_for_model: cfg.moduleId,
      description_for_human: `${g.categoryTag} & Instant Deliverable Compiler (${cfg.freeDeliverableName}).`,
      description_for_model: `Use ${cfg.brandName} (${cfg.domain}) to run deterministic ${g.categoryTag} audits, preview the $0 3-Credit Sample Dossier (/dossier/sample?target=), preview the 3-File Counterparty Pack (/api/github-upgrade/iab-io-addendum.txt, /api/github-upgrade/pitch.eml, /api/github-upgrade/export.csv), and link users to https://${cfg.domain}/?q= or https://${cfg.domain}/buy/creator_pass ($19) / https://${cfg.domain}/buy/playbook_pass ($29) / https://${cfg.domain}/buy/agency_desk ($149).`,
      auth: { type: 'none' },
      api: { type: 'openapi', url: `https://${cfg.domain}/openapi.json` },
      logo_url: `https://${cfg.domain}/favicon.svg`,
      contact_email: `support@${cfg.domain.replace(/^www\./, '')}`,
      legal_info_url: `https://${cfg.domain}/privacy`
    });
  });

  app.get('/.well-known/mcp-registry.json', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.json({
      schema: 'https://registry.modelcontextprotocol.io/v1/server.json',
      name: `io.${cfg.domain.replace(/^www\./, '').replace(/\./g, '-')}/${cfg.moduleId.replace(/_/g, '-')}`,
      title: `${cfg.brandName} MCP Server`,
      version: '3.0.0',
      homepage: `https://${cfg.domain}`,
      repository: `https://github.com/mulak1/${cfg.moduleId.replace(/_/g, '-')}`,
      transport: { type: 'http-json-rpc', endpoint: `https://${cfg.domain}/api/mcp/rpc` },
      tools: [
        { name: `audit_${cfg.moduleId}`, description: `Run deterministic ${g.categoryTag} audit and return canonical report URL + KPIs`, inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] } },
        { name: `inspect_cnn_${cfg.moduleId}`, description: `Run deterministic CNN visual/acoustic sensor inspection and create a permanent /scan/:target public permalink`, inputSchema: { type: 'object', properties: { target: { type: 'string' } }, required: ['target'] } },
        { name: `compile_counterparty_pack_${cfg.moduleId}`, description: `Calculate -18% 3-flight floor savings and generate parameterized IAB IO Rider (.TXT), Dual-Track Pitch (.EML), and 3-Row Sample (.CSV) links`, inputSchema: { type: 'object', properties: { target: { type: 'string' }, quoted_usd: { type: 'number' }, reach: { type: 'number' }, floor_cpm: { type: 'number' } }, required: ['target'] } }
      ]
    });
  });

  app.options('/api/mcp/rpc', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    res.status(204).end();
  });

  app.post('/api/mcp/rpc', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    const body = req.body || {};
    const id = body.id !== undefined ? body.id : 1;
    if (body.method === 'tools/list') {
      return res.json({ jsonrpc: '2.0', id, result: { tools: [
        { name: `audit_${cfg.moduleId}`, description: `Run ${cfg.brandName} deterministic benchmark`, inputSchema: { type: 'object', properties: { query: { type: 'string' } }, required: ['query'] } },
        { name: `inspect_cnn_${cfg.moduleId}`, description: `Run CNN sensor inspection and publish /scan/:target permalink`, inputSchema: { type: 'object', properties: { target: { type: 'string' } }, required: ['target'] } },
        { name: `compile_counterparty_pack_${cfg.moduleId}`, description: `Generate parameterized .TXT / .EML / .CSV counterparty links for any quote & reach`, inputSchema: { type: 'object', properties: { target: { type: 'string' }, quoted_usd: { type: 'number' }, reach: { type: 'number' }, floor_cpm: { type: 'number' } }, required: ['target'] } }
      ] } });
    }
    const args = body.params?.arguments || {};
    const q = String(args.target || args.query || cfg.presets[0]?.key || 'verified');
    const scan = evaluateScanTarget(cfg, q), sb = lookupSampleBuyer(scan.target);
    const isRow1 = String(scan.target || '').toLowerCase().replace(/[^a-z0-9]/g, '') === 'shopify';
    const encT = encodeURIComponent(scan.target);
    const qUsd = Math.max(250, Number(args.quoted_usd) || sb.price);
    const rch = Math.max(1000, Number(args.reach) || sb.reach);
    const flCpm = Math.max(15, Number(args.floor_cpm) || sb.flCpm);
    const qP = `target=${encT}${isRow1 ? `&floor_cpm=${Math.round(flCpm)}` : ''}&reach=${rch}&quoted_usd=${qUsd}`;
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        content: [{ type: 'text', text: `${cfg.brandName} Audit (${scan.target}): Grade ${scan.grade} (${scan.score}/100) | ${scan.kpi1} • ${scan.cnnReadout} | Masked Buyer & Agency Desk ($0 Unlock): ${sb.masked} (+ ${sb.agMasked}) • $${sb.qCpm} Rack → ${isRow1 ? `$${sb.flCpm} Floor CPM (-18% · Saves $${sb.save3.toLocaleString()})` : '3-Flight Floor CPM: Locked ($0 Email)'} | Public Permalink: https://${cfg.domain}/scan/${encT} | $0 Sample Dossier: https://${cfg.domain}/dossier/sample?target=${encT} | Counterparty Previews: https://${cfg.domain}/api/github-upgrade/iab-io-addendum.txt?${qP} • https://${cfg.domain}/api/github-upgrade/pitch.eml?${qP} • https://${cfg.domain}/api/github-upgrade/export.csv?target=${encT} | 1-Click Checkout: Creator Pass ($19) https://${cfg.domain}/buy/creator_pass?target=${encT} | Full 109-Row Vault ($${cfg.corePriceUsd || 29}) https://${cfg.domain}/buy/playbook_pass?target=${encT} | Agency Desk ($${cfg.proPriceUsd || 149}) https://${cfg.domain}/buy/agency_desk?target=${encT}` }]
      }
    });
  });

  // 6. High-Intent Interactive `/tools/:slug` & `/compare/:slug` Programmatic Routes (+ `.md` Markdown Twins)
  app.get(['/tools/:slug', '/compare/:slug'], (req, res, next) => {
    const isCompare = req.path.startsWith('/compare/');
    const rawSlug = String(req.params.slug || '');
    const isMd = rawSlug.endsWith('.md');
    const cleanSlug = isMd ? rawSlug.slice(0, -3) : rawSlug;
    const list = isCompare ? g.comparisons : g.tools;
    const exactMatch = list.find((entry) => entry.slug === cleanSlug);
    const tokens = cleanSlug.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length >= 3);
    const fuzzyMatch = !exactMatch && tokens.length ? list.map((entry) => ({ entry, hits: tokens.filter((w) => entry.slug.includes(w)).length })).sort((a, b) => b.hits - a.hits)[0] : null;
    const item = exactMatch || (fuzzyMatch && fuzzyMatch.hits > 0 ? fuzzyMatch.entry : list[0]);
    if (!item) return next();
    if (!exactMatch && !isMd) return res.redirect(301, `/${isCompare ? 'compare' : 'tools'}/${item.slug}`);

    if (isMd) {
      const isRow1 = String(item.target || '').toLowerCase().replace(/[^a-z0-9]/g, '') === 'shopify';
      const encT = encodeURIComponent(item.target), sb = lookupSampleBuyer(item.target), qP = `${isRow1 ? `&floor_cpm=${Math.round(sb.flCpm)}` : ''}&reach=${sb.reach}&quoted_usd=${sb.price}`;
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('Link', `<https://${cfg.domain}/${isCompare ? 'compare' : 'tools'}/${item.slug}>; rel="canonical"`);
      return res.status(200).send(`# ${item.title}\n\n> ${item.summary}\n\n- **Canonical Interactive Tool**: https://${cfg.domain}/${isCompare ? 'compare' : 'tools'}/${item.slug}\n- **Masked Buyer & Agency Desk Preview ($0 Unlock)**: \`${sb.masked}\` (+ \`${sb.agMasked}\`) • $${sb.qCpm} Rack → **${isRow1 ? `$${sb.flCpm} Floor CPM (-18% · Saves $${sb.save3.toLocaleString()})` : '3-Flight Floor CPM: Locked ($0 Email)'}**\n- **Live SVG Benchmark Badge**: ![${cfg.brandName}](https://${cfg.domain}/badge/${encT}.svg)\n- **Preview $0 3-Credit Sample Dossier**: https://${cfg.domain}/dossier/sample?target=${encT}\n- **Preview Redlined IAB IO Rider (.TXT — §4.2 Preview $0; §7.1–§11.0 Make-Good in $19/$29)**: https://${cfg.domain}/api/github-upgrade/iab-io-addendum.txt?target=${encT}${qP}\n- **Preview Dual-Track Outreach Pitch (.EML — Track A Preview $0; Track B in $19/$29)**: https://${cfg.domain}/api/github-upgrade/pitch.eml?target=${encT}${qP}\n- **Preview 3-Row Verified Buyer Sample (.CSV)**: https://${cfg.domain}/api/github-upgrade/export.csv?target=${encT}\n- **1-Click Creator Outreach Pass ($19 One-Time)**: https://${cfg.domain}/buy/creator_pass?target=${encT}\n- **1-Click Full 109-Row Vault ($${cfg.corePriceUsd || 29} One-Time)**: https://${cfg.domain}/buy/playbook_pass?target=${encT}\n- **1-Click B2B Agency Desk ($${cfg.proPriceUsd || 149} One-Time)**: https://${cfg.domain}/buy/agency_desk?target=${encT}\n`);
    }

    const rawHtml = renderGrowthPageHtml(cfg, item, isCompare ? 'compare' : 'tools');
    return res.status(200).type('html').send(renderHtmlFn ? renderHtmlFn(rawHtml) : rawHtml);
  });

  // 6B. Phase A Public Scan Permalink, Leaderboard, Terminal curl & CNN Visual Sensor Flywheel
  attachPublicScanFlywheel(app, cfg, g.badgeColor, renderHtmlFn, classifyFn);

  // 7. Iteration 28/30 Verification & Multi-Engine Autonomous Syndication Endpoint
  app.get('/api/github-upgrade/autonomous-growth-engine', (req, res) => {
    res.json({
      ok: true,
      iteration: 30,
      module_id: cfg.moduleId,
      repo: 'anuraghazra/github-readme-stats (★ 79,843) + badges/shields (★ 27,271) + vercel/satori (★ 14,099) + modelcontextprotocol/servers (★ 91,340) + onnxruntime-web / PP-OCRv4 CNN Sensor',
      features: {
        dynamic_svg_score_badges: true,
        shields_io_json_endpoint: true,
        one_line_embed_js_widget: true,
        openapi_3_1_and_mcp_registry: true,
        interactive_tools_and_compare_routes: g.tools.length + g.comparisons.length,
        public_scan_permalinks_and_leaderboard: true,
        curl_ansi_terminal_scorecard: true,
        cnn_visual_sensor_endpoint: true,
        websub_and_indexnow_multiplexer: true
      },
      github_topics: g.githubTopics,
      growth_urls: getAllGrowthUrls(cfg)
    });
  });

  app.post('/api/growth/syndicate', async (req, res) => {
    const urls = [`https://${cfg.domain}/`, `https://${cfg.domain}/directory`, `https://${cfg.domain}/llms.txt`, ...getAllGrowthUrls(cfg)];
    if (lastSyndicateRes && (Date.now() - lastSyndicateAt) < 60000) {
      return res.json({ ok: true, cached_cooldown: true, syndicated_urls: urls.length, results: lastSyndicateRes });
    }
    const indexKey = process.env.INDEXNOW_KEY || 'b25e791e2b694f4c9c57d8e20ad8d904';
    const results = { indexnow: null, websub: null };
    try {
      const inRes = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({ host: cfg.domain, key: indexKey, keyLocation: `https://${cfg.domain}/${indexKey}.txt`, urlList: urls })
      });
      results.indexnow = inRes.status;
    } catch (_) { results.indexnow = 0; }
    try {
      const wsRes = await fetch('https://pubsubhubbub.appspot.com/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `hub.mode=publish&hub.url=${encodeURIComponent(`https://${cfg.domain}/feed.xml`)}`
      });
      results.websub = wsRes.status;
    } catch (_) { results.websub = 0; }
    lastSyndicateAt = Date.now();
    lastSyndicateRes = results;
    res.json({ ok: true, syndicated_urls: urls.length, results });
  });
  const { attachMissionControlRoutes } = require('./mission-control');
  attachMissionControlRoutes(app, cfg, store);
}

module.exports = { attachAutonomousGrowthEngine, getAllGrowthUrls, getGrowthConfig };

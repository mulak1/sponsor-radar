/**
 * SponsorRadar (#2): Rich Seed Dataset
 * 42 Active B2B & Consumer Sponsor Brands
 * 46 Top Podcasts, Newsletters & YouTube Channels
 * 95+ Historical Ad-Read Placements with Timestamps, Promo Codes, Vanity URLs & 3x+ Renewal Counts
 * 60+ High-Intent Programmatic SEO Pages
 */

const BRANDS = [
  { slug: 'ag1', name: 'AG1 (Athletic Greens)', domain: 'drinkag1.com', category: 'Health & Performance', vertical: 'DTC Wellness', est_monthly_spend: 1420000, avg_cpm: 42, renewal_rate_pct: 88, decision_maker_role: 'VP of Creator Partnerships', sponsor_email: 'partnerships@drinkag1.com', landing_pattern: 'drinkag1.com/{show}', default_offer: 'Free 1-year supply of Vitamin D3+K2 + 5 free AG1 travel packs' },
  { slug: 'deel', name: 'Deel', domain: 'deel.com', category: 'B2B SaaS / HR & Payroll', vertical: 'B2B Enterprise', est_monthly_spend: 680000, avg_cpm: 64, renewal_rate_pct: 84, decision_maker_role: 'Head of Global Media Buying', sponsor_email: 'creators@deel.com', landing_pattern: 'deel.com/{show}', default_offer: '$500 off first global contractor or EOR onboarding' },
  { slug: 'ramp', name: 'Ramp', domain: 'ramp.com', category: 'Fintech / Corporate Cards', vertical: 'B2B Fintech', est_monthly_spend: 790000, avg_cpm: 68, renewal_rate_pct: 86, decision_maker_role: 'Director of Growth & Podcasts', sponsor_email: 'sponsorships@ramp.com', landing_pattern: 'ramp.com/{show}', default_offer: '$250 signup bonus when you switch your corporate spend to Ramp' },
  { slug: 'linear', name: 'Linear', domain: 'linear.app', category: 'DevTools & Product Management', vertical: 'B2B DevTools', est_monthly_spend: 310000, avg_cpm: 58, renewal_rate_pct: 82, decision_maker_role: 'Head of Brand & Developer Marketing', sponsor_email: 'marketing@linear.app', landing_pattern: 'linear.app/{show}', default_offer: '2 months free on Linear Plus for engineering teams' },
  { slug: 'hubspot', name: 'HubSpot', domain: 'hubspot.com', category: 'B2B CRM & Marketing', vertical: 'B2B SaaS', est_monthly_spend: 1150000, avg_cpm: 54, renewal_rate_pct: 85, decision_maker_role: 'VP Podcast Network & Media', sponsor_email: 'creators@hubspot.com', landing_pattern: 'hubspot.com/{show}', default_offer: 'Free AI Marketing & Sales Hub Starter Suite' },
  { slug: 'eight-sleep', name: 'Eight Sleep', domain: 'eightsleep.com', category: 'Health & Biohacking', vertical: 'DTC Hardware', est_monthly_spend: 620000, avg_cpm: 46, renewal_rate_pct: 89, decision_maker_role: 'Head of Performance Influencer Marketing', sponsor_email: 'partners@eightsleep.com', landing_pattern: 'eightsleep.com/{show}', default_offer: '$350 off the Pod 4 Ultra with code {CODE}' },
  { slug: 'shopify', name: 'Shopify', domain: 'shopify.com', category: 'Ecommerce Infrastructure', vertical: 'B2B / SMB Commerce', est_monthly_spend: 1340000, avg_cpm: 49, renewal_rate_pct: 91, decision_maker_role: 'Director of Audio & Creator Acquisition', sponsor_email: 'audio@shopify.com', landing_pattern: 'shopify.com/{show}', default_offer: '$1 per month trial for your first 90 days' },
  { slug: 'notion', name: 'Notion', domain: 'notion.so', category: 'Workspace & AI Productivity', vertical: 'B2B / Prosumer SaaS', est_monthly_spend: 540000, avg_cpm: 52, renewal_rate_pct: 80, decision_maker_role: 'Global Creator Marketing Lead', sponsor_email: 'creators@makenotion.com', landing_pattern: 'notion.com/{show}', default_offer: 'Try Notion AI free + 6 months Startup Plus plan' },
  { slug: 'mercury', name: 'Mercury', domain: 'mercury.com', category: 'Startup Banking & Treasury', vertical: 'B2B Fintech', est_monthly_spend: 490000, avg_cpm: 66, renewal_rate_pct: 87, decision_maker_role: 'Brand Partnerships Lead', sponsor_email: 'sponsorships@mercury.com', landing_pattern: 'mercury.com/{show}', default_offer: '$500 cash bonus with $10K deposit in 90 days' },
  { slug: 'expressvpn', name: 'ExpressVPN', domain: 'expressvpn.com', category: 'Cybersecurity & Privacy', vertical: 'Consumer Security', est_monthly_spend: 890000, avg_cpm: 34, renewal_rate_pct: 79, decision_maker_role: 'Head of YouTube & Podcast Buying', sponsor_email: 'media@expressvpn.com', landing_pattern: 'expressvpn.com/{show}', default_offer: '3 extra months free on a 12-month plan' },
  { slug: 'retool', name: 'Retool', domain: 'retool.com', category: 'Internal Software & DevTools', vertical: 'B2B DevTools', est_monthly_spend: 285000, avg_cpm: 62, renewal_rate_pct: 77, decision_maker_role: 'Developer Relations & Media Lead', sponsor_email: 'sponsor@retool.com', landing_pattern: 'retool.com/{show}', default_offer: 'Build internal apps 10x faster: up to $25k startup credits' },
  { slug: 'lmnt', name: 'LMNT Electrolytes', domain: 'drinklmnt.com', category: 'Health & Performance', vertical: 'DTC Wellness', est_monthly_spend: 560000, avg_cpm: 39, renewal_rate_pct: 90, decision_maker_role: 'Director of Podcast Partnerships', sponsor_email: 'partnerships@drinklmnt.com', landing_pattern: 'drinklmnt.com/{show}', default_offer: 'Free 8-count LMNT Sample Pack with any order' },
  { slug: 'ridge', name: 'Ridge Wallet', domain: 'ridge.com', category: 'Everyday Carry & Hardware', vertical: 'DTC Consumer', est_monthly_spend: 470000, avg_cpm: 32, renewal_rate_pct: 76, decision_maker_role: 'VP Creator & YouTube Media', sponsor_email: 'creators@ridge.com', landing_pattern: 'ridge.com/{show}', default_offer: '15% off sitewide with code {CODE}' },
  { slug: 'framer', name: 'Framer', domain: 'framer.com', category: 'Web Design & Publishing', vertical: 'Design & DevTools', est_monthly_spend: 260000, avg_cpm: 48, renewal_rate_pct: 81, decision_maker_role: 'Head of Creator Growth', sponsor_email: 'partners@framer.com', landing_pattern: 'framer.com/{show}', default_offer: '3 months free on Framer Pro annual subscription' },
  { slug: 'clerk', name: 'Clerk', domain: 'clerk.com', category: 'Auth & User Management', vertical: 'B2B DevTools', est_monthly_spend: 240000, avg_cpm: 59, renewal_rate_pct: 83, decision_maker_role: 'DevRel & Creator Sponsorships', sponsor_email: 'devrel@clerk.com', landing_pattern: 'clerk.com/{show}', default_offer: '10,000 Monthly Active Users free + $500 Pro credits' },
  { slug: 'vanta', name: 'Vanta', domain: 'vanta.com', category: 'Security & Compliance (SOC 2)', vertical: 'B2B Security', est_monthly_spend: 580000, avg_cpm: 69, renewal_rate_pct: 88, decision_maker_role: 'Director of Demand Gen & Audio', sponsor_email: 'sponsorships@vanta.com', landing_pattern: 'vanta.com/{show}', default_offer: '$1,000 off automated SOC 2, ISO 27001 & HIPAA compliance' },
  { slug: 'rippling', name: 'Rippling', domain: 'rippling.com', category: 'Workforce Management & IT/HR', vertical: 'B2B Enterprise', est_monthly_spend: 640000, avg_cpm: 65, renewal_rate_pct: 84, decision_maker_role: 'VP Growth Marketing', sponsor_email: 'media@rippling.com', landing_pattern: 'rippling.com/{show}', default_offer: '6 months free when you unify HR, IT, and Finance' },
  { slug: 'whoop', name: 'WHOOP', domain: 'whoop.com', category: 'Biometric Wearable', vertical: 'DTC Fitness', est_monthly_spend: 530000, avg_cpm: 44, renewal_rate_pct: 86, decision_maker_role: 'Head of Audio & Athlete Media', sponsor_email: 'audio@whoop.com', landing_pattern: 'join.whoop.com/{show}', default_offer: 'Free WHOOP 4.0 strap + first month membership free' },
  { slug: 'cursor', name: 'Cursor AI', domain: 'cursor.com', category: 'AI Code Editor', vertical: 'B2B DevTools / AI', est_monthly_spend: 220000, avg_cpm: 60, renewal_rate_pct: 85, decision_maker_role: 'Developer Community Lead', sponsor_email: 'community@cursor.com', landing_pattern: 'cursor.com/{show}', default_offer: '14-day Pro trial with 500 fast frontier requests' },
  { slug: 'supabase', name: 'Supabase', domain: 'supabase.com', category: 'Postgres Backend-as-a-Service', vertical: 'B2B DevTools', est_monthly_spend: 270000, avg_cpm: 56, renewal_rate_pct: 84, decision_maker_role: 'Head of DevRel & Sponsorships', sponsor_email: 'growth@supabase.io', landing_pattern: 'supabase.com/{show}', default_offer: '$300 in Supabase Pro compute credits' },
  { slug: 'raycast', name: 'Raycast', domain: 'raycast.com', category: 'Developer Productivity', vertical: 'B2B DevTools', est_monthly_spend: 165000, avg_cpm: 52, renewal_rate_pct: 79, decision_maker_role: 'Head of Community', sponsor_email: 'sponsors@raycast.com', landing_pattern: 'raycast.com/{show}', default_offer: '30% off Raycast Pro + AI commands' },
  { slug: 'vercel', name: 'Vercel', domain: 'vercel.com', category: 'Frontend Cloud & AI SDK', vertical: 'B2B DevTools', est_monthly_spend: 390000, avg_cpm: 61, renewal_rate_pct: 82, decision_maker_role: 'VP Developer Experience', sponsor_email: 'creators@vercel.com', landing_pattern: 'vercel.com/{show}', default_offer: '$500 Vercel Pro team deployment credits' },
  { slug: 'brex', name: 'Brex', domain: 'brex.com', category: 'AI Spend Management', vertical: 'B2B Fintech', est_monthly_spend: 510000, avg_cpm: 67, renewal_rate_pct: 78, decision_maker_role: 'Head of Executive Channels', sponsor_email: 'media@brex.com', landing_pattern: 'brex.com/{show}', default_offer: '30,000 bonus points + waived implementation fees' },
  { slug: 'gusto', name: 'Gusto', domain: 'gusto.com', category: 'SMB Payroll & Benefits', vertical: 'B2B SMB SaaS', est_monthly_spend: 480000, avg_cpm: 47, renewal_rate_pct: 83, decision_maker_role: 'Audio Acquisition Lead', sponsor_email: 'podcasts@gusto.com', landing_pattern: 'gusto.com/{show}', default_offer: '3 months free when you run your first payroll' },
  { slug: 'superhuman', name: 'Superhuman', domain: 'superhuman.com', category: 'AI Executive Email', vertical: 'B2B Productivity', est_monthly_spend: 295000, avg_cpm: 58, renewal_rate_pct: 81, decision_maker_role: 'Growth Partnerships Manager', sponsor_email: 'partners@superhuman.com', landing_pattern: 'superhuman.com/{show}', default_offer: 'First month free for your entire leadership team' },
  { slug: 'perplexity', name: 'Perplexity AI', domain: 'perplexity.ai', category: 'AI Answer Engine', vertical: 'AI / Enterprise', est_monthly_spend: 430000, avg_cpm: 53, renewal_rate_pct: 84, decision_maker_role: 'Head of Brand & Media', sponsor_email: 'partnerships@perplexity.ai', landing_pattern: 'perplexity.ai/{show}', default_offer: '30 days of Perplexity Enterprise Pro free' },
  { slug: 'intercom', name: 'Intercom (Fin AI)', domain: 'intercom.com', category: 'AI Customer Service', vertical: 'B2B SaaS', est_monthly_spend: 410000, avg_cpm: 63, renewal_rate_pct: 80, decision_maker_role: 'Director of Demand Generation', sponsor_email: 'sponsorships@intercom.com', landing_pattern: 'intercom.com/{show}', default_offer: '90% off Intercom Early Stage + Fin AI Agent credits' },
  { slug: 'datadog', name: 'Datadog', domain: 'datadoghq.com', category: 'Cloud Observability & APM', vertical: 'B2B Infrastructure', est_monthly_spend: 520000, avg_cpm: 66, renewal_rate_pct: 85, decision_maker_role: 'Technical Media Buyer', sponsor_email: 'community@datadoghq.com', landing_pattern: 'datadoghq.com/{show}', default_offer: '14-day free trial + iconic Datadog purple plushie/t-shirt' },
  { slug: 'cloudflare', name: 'Cloudflare Workers', domain: 'cloudflare.com', category: 'Edge Cloud & AI Inference', vertical: 'B2B Infrastructure', est_monthly_spend: 460000, avg_cpm: 60, renewal_rate_pct: 82, decision_maker_role: 'Developer Marketing Lead', sponsor_email: 'devmarketing@cloudflare.com', landing_pattern: 'cloudflare.com/{show}', default_offer: '$1,000 Workers AI & R2 storage credits' },
  { slug: 'posthog', name: 'PostHog', domain: 'posthog.com', category: 'Product OS & Analytics', vertical: 'B2B DevTools', est_monthly_spend: 195000, avg_cpm: 55, renewal_rate_pct: 87, decision_maker_role: 'Head of Newsletter & Creator Buying', sponsor_email: 'sponsors@posthog.com', landing_pattern: 'posthog.com/{show}', default_offer: '1M free events/mo + $50,000 PostHog for Startups credit' },
  { slug: 'zapier', name: 'Zapier', domain: 'zapier.com', category: 'AI Automation & Workflows', vertical: 'B2B SaaS', est_monthly_spend: 440000, avg_cpm: 51, renewal_rate_pct: 79, decision_maker_role: 'Creator Partnerships Lead', sponsor_email: 'creators@zapier.com', landing_pattern: 'zapier.com/{show}', default_offer: '14-day Pro trial + AI Agent workflow templates' },
  { slug: 'airtable', name: 'Airtable', domain: 'airtable.com', category: 'Connected Apps Platform', vertical: 'B2B Enterprise', est_monthly_spend: 380000, avg_cpm: 57, renewal_rate_pct: 77, decision_maker_role: 'Media Buying Manager', sponsor_email: 'media@airtable.com', landing_pattern: 'airtable.com/{show}', default_offer: '$500 in Airtable Cobuilder AI credits' },
  { slug: 'miro', name: 'Miro', domain: 'miro.com', category: 'Visual Workspace', vertical: 'B2B Collaboration', est_monthly_spend: 330000, avg_cpm: 49, renewal_rate_pct: 75, decision_maker_role: 'Head of Brand Sponsorships', sponsor_email: 'sponsors@miro.com', landing_pattern: 'miro.com/{show}', default_offer: '3 free unlimited Innovation Workspace boards' },
  { slug: 'loom', name: 'Loom (Atlassian)', domain: 'loom.com', category: 'Async Video Messaging', vertical: 'B2B Productivity', est_monthly_spend: 290000, avg_cpm: 50, renewal_rate_pct: 78, decision_maker_role: 'Creator Growth Manager', sponsor_email: 'creators@loom.com', landing_pattern: 'loom.com/{show}', default_offer: '30 days free of Loom Business + AI summaries' },
  { slug: 'betterhelp', name: 'BetterHelp', domain: 'betterhelp.com', category: 'Online Therapy & Mental Health', vertical: 'DTC Healthcare', est_monthly_spend: 1650000, avg_cpm: 29, renewal_rate_pct: 92, decision_maker_role: 'SVP Podcast Acquisition', sponsor_email: 'podcast@betterhelp.com', landing_pattern: 'betterhelp.com/{show}', default_offer: '10% off your first month of therapy' },
  { slug: 'athletic-brewing', name: 'Athletic Brewing Co.', domain: 'athleticbrewing.com', category: 'Non-Alcoholic Craft Brew', vertical: 'DTC Beverage', est_monthly_spend: 340000, avg_cpm: 36, renewal_rate_pct: 84, decision_maker_role: 'Director of Audio & Sports Media', sponsor_email: 'media@athleticbrewing.com', landing_pattern: 'athleticbrewing.com/{show}', default_offer: '20% off your first online order with code {CODE}' },
  { slug: 'kalshi', name: 'Kalshi', domain: 'kalshi.com', category: 'Regulated Prediction Markets', vertical: 'Fintech / Markets', est_monthly_spend: 420000, avg_cpm: 55, renewal_rate_pct: 83, decision_maker_role: 'Head of Creator & Podcast Growth', sponsor_email: 'creators@kalshi.com', landing_pattern: 'kalshi.com/{show}', default_offer: '$25 market trading bonus on first $100 deposit' },
  { slug: 'anthropic', name: 'Anthropic (Claude)', domain: 'anthropic.com', category: 'Frontier AI & Claude Code', vertical: 'AI / Enterprise', est_monthly_spend: 510000, avg_cpm: 68, renewal_rate_pct: 86, decision_maker_role: 'Enterprise & Developer Marketing', sponsor_email: 'sponsorships@anthropic.com', landing_pattern: 'anthropic.com/{show}', default_offer: '$500 API workbench credit for engineering teams' },
  { slug: 'snowflake', name: 'Snowflake', domain: 'snowflake.com', category: 'AI Data Cloud', vertical: 'B2B Data Infrastructure', est_monthly_spend: 610000, avg_cpm: 72, renewal_rate_pct: 81, decision_maker_role: 'Global Media Director', sponsor_email: 'media@snowflake.com', landing_pattern: 'snowflake.com/{show}', default_offer: '$400 free compute trial on Snowflake Cortex AI' },
  { slug: 'stripe', name: 'Stripe', domain: 'stripe.com', category: 'Financial Infrastructure & Billing', vertical: 'B2B Fintech', est_monthly_spend: 590000, avg_cpm: 70, renewal_rate_pct: 85, decision_maker_role: 'Head of Ecosystem & Publications', sponsor_email: 'publications@stripe.com', landing_pattern: 'stripe.com/{show}', default_offer: '$25,000 in fee-free payment processing for startups' },
  { slug: 'sentry', name: 'Sentry', domain: 'sentry.io', category: 'Application Monitoring & Error Tracking', vertical: 'B2B DevTools', est_monthly_spend: 315000, avg_cpm: 58, renewal_rate_pct: 88, decision_maker_role: 'Head of Developer Sponsorships', sponsor_email: 'sponsorships@sentry.io', landing_pattern: 'sentry.io/{show}', default_offer: '3 months free of Sentry Team plan with code {CODE}' },
  { slug: 'warp', name: 'Warp Terminal', domain: 'warp.dev', category: 'AI Developer Terminal', vertical: 'B2B DevTools', est_monthly_spend: 175000, avg_cpm: 54, renewal_rate_pct: 80, decision_maker_role: 'Growth & Creator Lead', sponsor_email: 'creators@warp.dev', landing_pattern: 'warp.dev/{show}', default_offer: 'Free Warp Pro trial + 2x AI agent requests' }
];

const SHOWS = [
  { slug: 'all-in-podcast', name: 'The All-In Podcast', channel_type: 'Podcast & YouTube', niche: 'Tech, VC, Markets & Geopolitics', audience_size: 680000, base_cpm: 65, midroll_rate_usd: 44200, cadence: 'Weekly (Fridays)', host_names: 'Chamath Palihapitiya, Jason Calacanis, David Sacks, David Friedberg', verified_3x_sponsors: 14 },
  { slug: 'acquired', name: 'Acquired', channel_type: 'Podcast', niche: 'Deep-Dive Tech History & Strategy', audience_size: 520000, base_cpm: 78, midroll_rate_usd: 40500, cadence: 'Monthly 4-Hour Epics', host_names: 'Ben Gilbert & David Rosenthal', verified_3x_sponsors: 11 },
  { slug: 'lennys-podcast', name: "Lenny's Podcast & Newsletter", channel_type: 'Podcast & Newsletter', niche: 'Product Management, Growth & B2B SaaS', audience_size: 440000, base_cpm: 72, midroll_rate_usd: 31600, cadence: '2x Weekly', host_names: 'Lenny Rachitsky', verified_3x_sponsors: 19 },
  { slug: 'my-first-million', name: 'My First Million', channel_type: 'Podcast & YouTube', niche: 'Entrepreneurship, SMB & Internet Business', audience_size: 410000, base_cpm: 58, midroll_rate_usd: 23780, cadence: '3x Weekly', host_names: 'Sam Parr & Shaan Puri', verified_3x_sponsors: 16 },
  { slug: 'lex-fridman', name: 'Lex Fridman Podcast', channel_type: 'Podcast & YouTube', niche: 'AI, Science, Engineering & Philosophy', audience_size: 950000, base_cpm: 48, midroll_rate_usd: 45600, cadence: 'Weekly', host_names: 'Lex Fridman', verified_3x_sponsors: 15 },
  { slug: 'tldr-newsletter', name: 'TLDR Newsletter', channel_type: 'Newsletter', niche: 'Daily Tech, Startups & Programming', audience_size: 1350000, base_cpm: 52, midroll_rate_usd: 28000, cadence: 'Daily (Mon-Fri)', host_names: 'Dan Ni', verified_3x_sponsors: 22 },
  { slug: 'pragmatic-engineer', name: 'The Pragmatic Engineer', channel_type: 'Newsletter & Podcast', niche: 'Big Tech & Senior Software Engineering', audience_size: 720000, base_cpm: 74, midroll_rate_usd: 26500, cadence: '2x Weekly', host_names: 'Gergely Orosz', verified_3x_sponsors: 17 },
  { slug: 'stratechery', name: 'Stratechery / Sharp Tech', channel_type: 'Newsletter & Podcast', niche: 'Tech Strategy & Executive Analysis', audience_size: 290000, base_cpm: 76, midroll_rate_usd: 22000, cadence: 'Weekly', host_names: 'Ben Thompson & Andrew Sharp', verified_3x_sponsors: 10 },
  { slug: 'huberman-lab', name: 'Huberman Lab', channel_type: 'Podcast & YouTube', niche: 'Neuroscience, Health & Human Performance', audience_size: 1250000, base_cpm: 54, midroll_rate_usd: 67500, cadence: '2x Weekly', host_names: 'Dr. Andrew Huberman', verified_3x_sponsors: 13 },
  { slug: 'theo-t3-gg', name: 'Theo: t3.gg', channel_type: 'YouTube', niche: 'Full-Stack TypeScript, Web Dev & AI Engineering', audience_size: 185000, base_cpm: 62, midroll_rate_usd: 11470, cadence: '3x Weekly', host_names: 'Theo Browne', verified_3x_sponsors: 18 },
  { slug: 'fireship', name: 'Fireship', channel_type: 'YouTube & Newsletter', niche: 'High-Velocity Code Report & Dev News', audience_size: 820000, base_cpm: 55, midroll_rate_usd: 45100, cadence: '2x Weekly', host_names: 'Jeff Delaney', verified_3x_sponsors: 14 },
  { slug: 'hard-fork', name: 'Hard Fork (NYT)', channel_type: 'Podcast', niche: 'Silicon Valley, AI & Tech Culture', audience_size: 460000, base_cpm: 60, midroll_rate_usd: 27600, cadence: 'Weekly', host_names: 'Kevin Roose & Casey Newton', verified_3x_sponsors: 11 },
  { slug: '20vc', name: '20VC with Harry Stebbings', channel_type: 'Podcast', niche: 'Venture Capital, SaaS Scaling & Founders', audience_size: 320000, base_cpm: 70, midroll_rate_usd: 22400, cadence: '3x Weekly', host_names: 'Harry Stebbings', verified_3x_sponsors: 15 },
  { slug: 'diary-of-a-ceo', name: 'The Diary Of A CEO', channel_type: 'Podcast & YouTube', niche: 'Business Leadership, Health & Mindset', audience_size: 1450000, base_cpm: 45, midroll_rate_usd: 65250, cadence: '2x Weekly', host_names: 'Steven Bartlett', verified_3x_sponsors: 16 },
  { slug: 'darknet-diaries', name: 'Darknet Diaries', channel_type: 'Podcast', niche: 'Cybersecurity, Penetration Testing & InfoSec', audience_size: 310000, base_cpm: 64, midroll_rate_usd: 19840, cadence: 'Bi-Weekly', host_names: 'Jack Rhysider', verified_3x_sponsors: 12 },
  { slug: 'syntax-fm', name: 'Syntax.fm', channel_type: 'Podcast & YouTube', niche: 'Full-Stack Web Development (Sentry)', audience_size: 175000, base_cpm: 56, midroll_rate_usd: 9800, cadence: '2x Weekly', host_names: 'Wes Bos & Scott Tolinski', verified_3x_sponsors: 13 },
  { slug: 'latent-space', name: 'Latent Space: The AI Engineer Podcast', channel_type: 'Podcast & Newsletter', niche: 'AI Engineering, LLMs & Infrastructure', audience_size: 210000, base_cpm: 75, midroll_rate_usd: 15750, cadence: '2x Weekly', host_names: 'Swyx & Alessio Fanelli', verified_3x_sponsors: 14 },
  { slug: 'bens-bites', name: "Ben's Bites", channel_type: 'Newsletter', niche: 'Daily AI Tools, Workflows & Launches', audience_size: 260000, base_cpm: 58, midroll_rate_usd: 7500, cadence: '3x Weekly', host_names: 'Ben Tossell', verified_3x_sponsors: 15 },
  { slug: 'morning-brew', name: 'Morning Brew Daily', channel_type: 'Newsletter & Podcast', niche: 'Business, Finance & Tech News', audience_size: 4100000, base_cpm: 44, midroll_rate_usd: 55000, cadence: 'Daily', host_names: 'Neal Freyman & Toby Howell', verified_3x_sponsors: 24 },
  { slug: 'the-hustle', name: 'The Hustle & Trends', channel_type: 'Newsletter', niche: 'Tech Business & Offbeat Entrepreneurship', audience_size: 2100000, base_cpm: 46, midroll_rate_usd: 32000, cadence: 'Daily', host_names: 'HubSpot Media Team', verified_3x_sponsors: 19 },
  { slug: 'bytebytego', name: 'ByteByteGo Newsletter & YouTube', channel_type: 'Newsletter & YouTube', niche: 'System Design & Distributed Architecture', audience_size: 980000, base_cpm: 66, midroll_rate_usd: 24500, cadence: '2x Weekly', host_names: 'Alex Xu', verified_3x_sponsors: 14 },
  { slug: 'mkbhd-waveform', name: 'Waveform: The MKBHD Podcast', channel_type: 'Podcast & YouTube', niche: 'Consumer Hardware, EVs & Tech Reviews', audience_size: 540000, base_cpm: 52, midroll_rate_usd: 28080, cadence: 'Weekly', host_names: 'Marques Brownlee & Andrew Manganelli', verified_3x_sponsors: 15 },
  { slug: 'coldfusion', name: 'ColdFusion', channel_type: 'YouTube', niche: 'Macro Tech, Business Documentaries & AI', audience_size: 620000, base_cpm: 46, midroll_rate_usd: 28520, cadence: 'Weekly', host_names: 'Dagogo Altraide', verified_3x_sponsors: 11 },
  { slug: 'patrick-boyle', name: 'Patrick Boyle On Finance', channel_type: 'YouTube & Podcast', niche: 'Quantitative Finance, Hedge Funds & Markets', audience_size: 340000, base_cpm: 59, midroll_rate_usd: 20060, cadence: 'Weekly', host_names: 'Patrick Boyle', verified_3x_sponsors: 10 },
  { slug: 'founders-podcast', name: 'Founders Podcast', channel_type: 'Podcast', niche: 'Biographies of Great Entrepreneurs', audience_size: 285000, base_cpm: 76, midroll_rate_usd: 21660, cadence: 'Weekly', host_names: 'David Senra', verified_3x_sponsors: 12 },
  { slug: 'invest-like-the-best', name: 'Invest Like the Best (Colossus)', channel_type: 'Podcast', niche: 'Institutional Investing, Capital Allocation & CEOs', audience_size: 330000, base_cpm: 79, midroll_rate_usd: 26070, cadence: 'Weekly', host_names: 'Patrick OShaughnessy', verified_3x_sponsors: 13 },
  { slug: 'prof-g-markets', name: 'Prof G Markets', channel_type: 'Podcast & Newsletter', niche: 'Public Tech Equities, M&A & Strategy', audience_size: 390000, base_cpm: 63, midroll_rate_usd: 24570, cadence: 'Daily', host_names: 'Scott Galloway & Ed Elson', verified_3x_sponsors: 14 },
  { slug: 'odd-lots', name: 'Odd Lots (Bloomberg)', channel_type: 'Podcast', niche: 'Macroeconomics, Supply Chains & Rates', audience_size: 420000, base_cpm: 68, midroll_rate_usd: 28560, cadence: '2x Weekly', host_names: 'Joe Weisenthal & Tracy Alloway', verified_3x_sponsors: 11 },
  { slug: 'not-boring', name: 'Not Boring by Packy McCormick', channel_type: 'Newsletter & Podcast', niche: 'Deep Tech, Frontier Startups & Optimism', audience_size: 235000, base_cpm: 68, midroll_rate_usd: 15980, cadence: 'Weekly', host_names: 'Packy McCormick', verified_3x_sponsors: 13 },
  { slug: 'refactoring-luca', name: 'Refactoring', channel_type: 'Newsletter', niche: 'Engineering Management & Dev Productivity', audience_size: 165000, base_cpm: 64, midroll_rate_usd: 5200, cadence: 'Weekly', host_names: 'Luca Rossi', verified_3x_sponsors: 12 },
  { slug: 'growth-unhinged', name: 'Growth Unhinged', channel_type: 'Newsletter', niche: 'PLG Pricing, SaaS GTM & AI Growth', audience_size: 140000, base_cpm: 69, midroll_rate_usd: 4900, cadence: 'Weekly', host_names: 'Kyle Poyar', verified_3x_sponsors: 11 },
  { slug: 'creator-science', name: 'Creator Science', channel_type: 'Podcast & Newsletter', niche: 'Creator Economy & Media Operations', audience_size: 125000, base_cpm: 54, midroll_rate_usd: 6750, cadence: 'Weekly', host_names: 'Jay Clouse', verified_3x_sponsors: 10 },
  { slug: 'marketing-against-the-grain', name: 'Marketing Against The Grain', channel_type: 'Podcast & YouTube', niche: 'B2B Growth Marketing & AI Experiments', audience_size: 215000, base_cpm: 58, midroll_rate_usd: 12470, cadence: '2x Weekly', host_names: 'Kipp Bodnar & Kieran Flanagan', verified_3x_sponsors: 12 },
  { slug: 'saastr-official', name: 'SaaStr Official Podcast', channel_type: 'Podcast & Newsletter', niche: 'B2B Cloud Founders, CROs & VP Sales', audience_size: 240000, base_cpm: 71, midroll_rate_usd: 17040, cadence: '2x Weekly', host_names: 'Jason Lemkin', verified_3x_sponsors: 14 },
  { slug: 'changelog', name: 'The Changelog', channel_type: 'Podcast & Newsletter', niche: 'Open Source, Systems & Software Craft', audience_size: 160000, base_cpm: 57, midroll_rate_usd: 9120, cadence: 'Weekly', host_names: 'Adam Stacoviak & Jerod Santo', verified_3x_sponsors: 11 },
  { slug: 'software-engineering-daily', name: 'Software Engineering Daily', channel_type: 'Podcast', niche: 'Cloud Infrastructure, Databases & AI', audience_size: 195000, base_cpm: 61, midroll_rate_usd: 11895, cadence: 'Daily', host_names: 'SE Daily Engineering Hosts', verified_3x_sponsors: 13 },
  { slug: 'indie-hackers', name: 'Indie Hackers', channel_type: 'Newsletter & Podcast', niche: 'Bootstrapped SaaS & Solo Founders', audience_size: 180000, base_cpm: 53, midroll_rate_usd: 9540, cadence: 'Weekly', host_names: 'Channing Allen & Courtland Allen', verified_3x_sponsors: 9 },
  { slug: 'animal-spirits', name: 'Animal Spirits', channel_type: 'Podcast & YouTube', niche: 'Wealth Management, ETFs & Housing Market', audience_size: 230000, base_cpm: 60, midroll_rate_usd: 13800, cadence: '2x Weekly', host_names: 'Michael Batnick & Ben Carlson', verified_3x_sponsors: 11 },
  { slug: 'milk-road', name: 'Milk Road Daily', channel_type: 'Newsletter & Podcast', niche: 'Digital Assets, Macro & Onchain Finance', audience_size: 310000, base_cpm: 56, midroll_rate_usd: 11200, cadence: 'Daily', host_names: 'Milk Road Desk', verified_3x_sponsors: 10 },
  { slug: 'dense-discovery', name: 'Dense Discovery', channel_type: 'Newsletter', niche: 'Design Systems, Web Craft & Creative Tech', audience_size: 95000, base_cpm: 49, midroll_rate_usd: 2600, cadence: 'Weekly', host_names: 'Kai Brach', verified_3x_sponsors: 9 },
  { slug: 'pointer-io', name: 'Pointer.io', channel_type: 'Newsletter', niche: 'Engineering Leadership & Architecture', audience_size: 110000, base_cpm: 62, midroll_rate_usd: 3800, cadence: '2x Weekly', host_names: 'Surana Editorial', verified_3x_sponsors: 8 },
  { slug: 'plain-bagel', name: 'The Plain Bagel', channel_type: 'YouTube', niche: 'Financial Analysis, Valuation & Investing', audience_size: 380000, base_cpm: 54, midroll_rate_usd: 20520, cadence: 'Weekly', host_names: 'Richard Coffin, CFA', verified_3x_sponsors: 10 },
  { slug: 'yc-podcast', name: 'Y Combinator Lightcone Podcast', channel_type: 'YouTube & Podcast', niche: 'Early-Stage Founders, AI Agents & Hard Tech', audience_size: 410000, base_cpm: 74, midroll_rate_usd: 30340, cadence: 'Weekly', host_names: 'Garry Tan, Jared Friedman, Harj Taggar, Diana Hu', verified_3x_sponsors: 8 },
  { slug: 'cloudcast', name: 'The Cloudcast', channel_type: 'Podcast', niche: 'DevOps, Kubernetes, Platform Engineering', audience_size: 135000, base_cpm: 59, midroll_rate_usd: 7965, cadence: 'Weekly', host_names: 'Aaron Delp & Brian Gracely', verified_3x_sponsors: 9 },
  { slug: 'elena-verna-plg', name: "Elena's Growth Scoop", channel_type: 'Newsletter', niche: 'B2B Growth Loops, Monetization & PLG', audience_size: 120000, base_cpm: 68, midroll_rate_usd: 4200, cadence: 'Weekly', host_names: 'Elena Verna', verified_3x_sponsors: 9 },
  { slug: 'superhuman-ai-news', name: 'Superhuman AI Newsletter', channel_type: 'Newsletter', niche: 'Enterprise AI Adoption & Productivity', audience_size: 850000, base_cpm: 50, midroll_rate_usd: 18500, cadence: 'Daily', host_names: 'Zain Kahn', verified_3x_sponsors: 16 }
];

const PLACEMENT_PAIRS = [
  // [brandSlug, showSlug, flights, slotType, timestampRange, promoCode, vanityUrl, spendUsd, cpmUsd, lastSeenDate]
  ['ag1', 'huberman-lab', 18, 'Mid-Roll Host-Read (90s)', '00:12:40 - 00:14:12', 'HUBERMAN', 'drinkag1.com/huberman', 67500, 54, '2026-10-11'],
  ['ag1', 'lex-fridman', 15, 'Pre-Roll Host-Read (60s)', '00:01:45 - 00:02:50', 'LEX', 'drinkag1.com/lex', 45600, 48, '2026-10-09'],
  ['ag1', 'diary-of-a-ceo', 14, 'Mid-Roll Host-Read (75s)', '00:24:10 - 00:25:25', 'DOAC', 'drinkag1.com/doac', 65250, 45, '2026-10-12'],
  ['ag1', 'my-first-million', 9, 'Mid-Roll Host-Read (60s)', '00:18:05 - 00:19:08', 'MFM', 'drinkag1.com/mfm', 23780, 58, '2026-10-04'],
  ['deel', 'lennys-podcast', 12, 'Mid-Roll Host-Read (75s)', '00:16:30 - 00:17:45', 'LENNY', 'deel.com/lenny', 31600, 72, '2026-10-10'],
  ['deel', '20vc', 11, 'Pre-Roll Host-Read (45s)', '00:00:52 - 00:01:38', '20VC', 'deel.com/20vc', 22400, 70, '2026-10-08'],
  ['deel', 'tldr-newsletter', 14, 'Primary Top Deep-Dive', 'Top Banner Block #1', 'TLDR500', 'deel.com/tldr', 28000, 52, '2026-10-13'],
  ['deel', 'pragmatic-engineer', 7, 'Primary Newsletter Sponsor', 'Issue Header Slot', 'PRAGMATIC', 'deel.com/pragmatic', 26500, 74, '2026-09-29'],
  ['ramp', 'acquired', 10, 'Title Mid-Roll Deep-Dive (120s)', '01:12:00 - 01:14:04', 'ACQUIRED', 'ramp.com/acquired', 48500, 78, '2026-10-06'],
  ['ramp', 'all-in-podcast', 8, 'Mid-Roll Host-Read (60s)', '00:29:15 - 00:30:18', 'ALLIN', 'ramp.com/allin', 44200, 65, '2026-10-11'],
  ['ramp', 'odd-lots', 9, 'Mid-Roll Host-Read (60s)', '00:19:40 - 00:20:42', 'ODDLOTS', 'ramp.com/oddlots', 28560, 68, '2026-10-07'],
  ['ramp', 'morning-brew', 15, 'Primary Newsletter Integration', 'Primary Story #1', 'BREW250', 'ramp.com/brew', 55000, 44, '2026-10-12'],
  ['linear', 'pragmatic-engineer', 9, 'Primary Newsletter Deep-Dive', 'Engineering Lead Slot', 'PRAGMATIC', 'linear.app/pragmatic', 26500, 74, '2026-10-08'],
  ['linear', 'lennys-podcast', 8, 'Mid-Roll Host-Read (60s)', '00:21:10 - 00:22:15', 'LENNY', 'linear.app/lenny', 31600, 72, '2026-10-05'],
  ['linear', 'theo-t3-gg', 6, 'YouTube Integrated Segment (70s)', '00:04:12 - 00:05:22', 'THEO', 'linear.app/theo', 11470, 62, '2026-10-03'],
  ['linear', 'refactoring-luca', 7, 'Primary Newsletter Block', 'Top Editorial Block', 'REFACTOR', 'linear.app/refactoring', 5200, 64, '2026-10-02'],
  ['hubspot', 'my-first-million', 22, 'Mid-Roll Host-Read (75s)', '00:14:50 - 00:16:05', 'MFM', 'hubspot.com/mfm', 23780, 58, '2026-10-13'],
  ['hubspot', 'marketing-against-the-grain', 20, 'Title Sponsor Segment (60s)', '00:08:20 - 00:09:20', 'MATG', 'hubspot.com/matg', 12470, 58, '2026-10-11'],
  ['hubspot', 'the-hustle', 19, 'Primary Daily Takeover', 'Header Callout', 'HUSTLEAI', 'hubspot.com/hustle', 32000, 46, '2026-10-13'],
  ['eight-sleep', 'huberman-lab', 16, 'Mid-Roll Host-Read (90s)', '00:28:10 - 00:29:40', 'HUBERMAN', 'eightsleep.com/huberman', 67500, 54, '2026-10-10'],
  ['eight-sleep', 'lex-fridman', 14, 'Pre-Roll Host-Read (60s)', '00:02:55 - 00:03:55', 'LEX', 'eightsleep.com/lex', 45600, 48, '2026-10-08'],
  ['eight-sleep', 'founders-podcast', 11, 'Pre-Roll Host-Read (60s)', '00:01:10 - 00:02:14', 'FOUNDERS', 'eightsleep.com/founders', 21660, 76, '2026-10-09'],
  ['eight-sleep', 'mkbhd-waveform', 7, 'Mid-Roll Host-Read (60s)', '00:31:00 - 00:32:05', 'WAVEFORM', 'eightsleep.com/waveform', 28080, 52, '2026-10-01'],
  ['shopify', 'my-first-million', 17, 'Mid-Roll Host-Read (60s)', '00:26:40 - 00:27:42', 'MFM', 'shopify.com/mfm', 23780, 58, '2026-10-12'],
  ['shopify', 'diary-of-a-ceo', 15, 'Pre-Roll Host-Read (60s)', '00:00:40 - 00:01:40', 'DOAC', 'shopify.com/doac', 65250, 45, '2026-10-11'],
  ['shopify', 'prof-g-markets', 12, 'Mid-Roll Host-Read (60s)', '00:15:10 - 00:16:12', 'PROFG', 'shopify.com/profg', 24570, 63, '2026-10-09'],
  ['notion', 'lennys-podcast', 10, 'Mid-Roll Host-Read (60s)', '00:11:20 - 00:12:24', 'LENNY', 'notion.com/lenny', 31600, 72, '2026-10-07'],
  ['notion', 'theo-t3-gg', 5, 'YouTube Mid-Roll Integration', '00:06:15 - 00:07:20', 'THEONOTION', 'notion.com/theo', 11470, 62, '2026-09-28'],
  ['notion', 'bens-bites', 8, 'Primary AI Tool Spotlight', 'Top Feature Card', 'BENSBITES', 'notion.com/bensbites', 7500, 58, '2026-10-06'],
  ['mercury', 'acquired', 9, 'Pre-Roll Host-Read (90s)', '00:03:10 - 00:04:40', 'ACQUIRED', 'mercury.com/acquired', 40500, 78, '2026-10-05'],
  ['mercury', '20vc', 10, 'Mid-Roll Host-Read (60s)', '00:17:45 - 00:18:45', '20VC', 'mercury.com/20vc', 22400, 70, '2026-10-09'],
  ['mercury', 'not-boring', 8, 'Primary Deep-Dive Sponsor', 'Header Essay Intro', 'NOTBORING', 'mercury.com/notboring', 15980, 68, '2026-10-08'],
  ['expressvpn', 'lex-fridman', 13, 'Mid-Roll Host-Read (60s)', '00:04:10 - 00:05:12', 'LEX', 'expressvpn.com/lex', 45600, 48, '2026-10-04'],
  ['expressvpn', 'darknet-diaries', 15, 'Mid-Roll Host-Read (75s)', '00:22:00 - 00:23:15', 'DARKNET', 'expressvpn.com/darknet', 19840, 64, '2026-10-06'],
  ['expressvpn', 'coldfusion', 9, 'YouTube End-Roll Segment (60s)', '00:14:20 - 00:15:20', 'COLDFUSION', 'expressvpn.com/coldfusion', 28520, 46, '2026-10-02'],
  ['retool', 'pragmatic-engineer', 6, 'Primary Newsletter Sponsor', 'Top Engineering Slot', 'PRAGMATIC', 'retool.com/pragmatic', 26500, 74, '2026-10-01'],
  ['retool', 'software-engineering-daily', 8, 'Mid-Roll Host-Read (60s)', '00:13:15 - 00:14:15', 'SED', 'retool.com/sedaily', 11895, 61, '2026-10-04'],
  ['lmnt', 'huberman-lab', 17, 'Pre-Roll Host-Read (60s)', '00:01:05 - 00:02:05', 'HUBERMAN', 'drinklmnt.com/huberman', 67500, 54, '2026-10-12'],
  ['lmnt', 'lex-fridman', 11, 'Mid-Roll Host-Read (60s)', '00:05:30 - 00:06:30', 'LEX', 'drinklmnt.com/lex', 45600, 48, '2026-10-07'],
  ['ridge', 'mkbhd-waveform', 12, 'Mid-Roll Host-Read (60s)', '00:19:50 - 00:20:52', 'WAVEFORM', 'ridge.com/waveform', 28080, 52, '2026-10-05'],
  ['ridge', 'plain-bagel', 6, 'YouTube Mid-Roll (60s)', '00:07:40 - 00:08:40', 'BAGEL', 'ridge.com/bagel', 20520, 54, '2026-09-30'],
  ['framer', 'theo-t3-gg', 7, 'YouTube Native Segment (65s)', '00:05:10 - 00:06:15', 'THEO', 'framer.com/theo', 11470, 62, '2026-10-08'],
  ['framer', 'dense-discovery', 9, 'Primary Design Feature', 'Lead Sponsor Box', 'DENSE', 'framer.com/dense', 2600, 49, '2026-10-09'],
  ['clerk', 'theo-t3-gg', 14, 'YouTube Mid-Roll Integration', '00:03:45 - 00:04:50', 'THEO', 'clerk.com/theo', 11470, 62, '2026-10-12'],
  ['clerk', 'fireship', 8, 'YouTube Code Report Sponsor (45s)', '00:02:55 - 00:03:40', 'FIRESHIP', 'clerk.com/fireship', 45100, 55, '2026-10-10'],
  ['clerk', 'syntax-fm', 6, 'Mid-Roll Host-Read (60s)', '00:15:30 - 00:16:30', 'SYNTAX', 'clerk.com/syntax', 9800, 56, '2026-10-04'],
  ['vanta', 'acquired', 11, 'Mid-Roll Host-Read (90s)', '01:45:10 - 01:46:40', 'ACQUIRED', 'vanta.com/acquired', 40500, 78, '2026-10-11'],
  ['vanta', 'lennys-podcast', 13, 'Pre-Roll Host-Read (60s)', '00:00:45 - 00:01:45', 'LENNY', 'vanta.com/lenny', 31600, 72, '2026-10-12'],
  ['vanta', 'darknet-diaries', 10, 'Mid-Roll Host-Read (60s)', '00:18:20 - 00:19:20', 'DARKNET', 'vanta.com/darknet', 19840, 64, '2026-10-07'],
  ['vanta', 'saastr-official', 9, 'Mid-Roll Host-Read (60s)', '00:12:00 - 00:13:00', 'SAASTR', 'vanta.com/saastr', 17040, 71, '2026-10-05'],
  ['rippling', 'all-in-podcast', 7, 'Mid-Roll Host-Read (60s)', '00:34:10 - 00:35:15', 'ALLIN', 'rippling.com/allin', 44200, 65, '2026-10-06'],
  ['rippling', '20vc', 9, 'Mid-Roll Host-Read (60s)', '00:22:15 - 00:23:15', '20VC', 'rippling.com/20vc', 22400, 70, '2026-10-09'],
  ['whoop', 'huberman-lab', 12, 'Mid-Roll Host-Read (75s)', '00:41:00 - 00:42:15', 'HUBERMAN', 'join.whoop.com/huberman', 67500, 54, '2026-10-08'],
  ['whoop', 'diary-of-a-ceo', 10, 'Mid-Roll Host-Read (60s)', '00:33:20 - 00:34:20', 'DOAC', 'join.whoop.com/doac', 65250, 45, '2026-10-07'],
  ['cursor', 'latent-space', 8, 'Mid-Roll Host-Read (60s)', '00:19:10 - 00:20:12', 'LATENT', 'cursor.com/latentspace', 15750, 75, '2026-10-11'],
  ['cursor', 'theo-t3-gg', 9, 'YouTube Integration (60s)', '00:05:40 - 00:06:40', 'THEO', 'cursor.com/theo', 11470, 62, '2026-10-10'],
  ['supabase', 'fireship', 9, 'YouTube Code Report Sponsor (45s)', '00:03:05 - 00:03:50', 'FIRESHIP', 'supabase.com/fireship', 45100, 55, '2026-10-09'],
  ['supabase', 'tldr-newsletter', 11, 'Primary Dev Newsletter Block', 'Top Banner Block #1', 'TLDRSUPA', 'supabase.com/tldr', 28000, 52, '2026-10-11'],
  ['raycast', 'theo-t3-gg', 6, 'YouTube Mid-Roll (60s)', '00:04:50 - 00:05:50', 'THEO30', 'raycast.com/theo', 11470, 62, '2026-10-02'],
  ['raycast', 'changelog', 5, 'Mid-Roll Host-Read (60s)', '00:16:40 - 00:17:40', 'CHANGELOG', 'raycast.com/changelog', 9120, 57, '2026-09-29'],
  ['vercel', 'latent-space', 7, 'Pre-Roll Host-Read (60s)', '00:01:20 - 00:02:20', 'LATENT', 'vercel.com/latentspace', 15750, 75, '2026-10-06'],
  ['vercel', 'bytebytego', 8, 'Primary System Design Sponsor', 'Header Callout', 'BYTEBYTEGO', 'vercel.com/bytebytego', 24500, 66, '2026-10-08'],
  ['brex', 'invest-like-the-best', 9, 'Pre-Roll Host-Read (60s)', '00:01:05 - 00:02:05', 'COLOSSUS', 'brex.com/colossus', 26070, 79, '2026-10-07'],
  ['brex', 'saastr-official', 8, 'Mid-Roll Host-Read (60s)', '00:18:10 - 00:19:10', 'SAASTR', 'brex.com/saastr', 17040, 71, '2026-10-04'],
  ['gusto', 'my-first-million', 11, 'Pre-Roll Host-Read (45s)', '00:01:15 - 00:02:00', 'MFM', 'gusto.com/mfm', 23780, 58, '2026-10-08'],
  ['gusto', 'creator-science', 7, 'Mid-Roll Host-Read (60s)', '00:14:20 - 00:15:20', 'CREATOR', 'gusto.com/creator', 6750, 54, '2026-10-03'],
  ['superhuman', 'lennys-podcast', 9, 'Mid-Roll Host-Read (60s)', '00:25:10 - 00:26:10', 'LENNY', 'superhuman.com/lenny', 31600, 72, '2026-10-09'],
  ['superhuman', 'stratechery', 6, 'Podcast Mid-Roll (60s)', '00:17:00 - 00:18:00', 'SHARP', 'superhuman.com/sharp', 22000, 76, '2026-10-01'],
  ['perplexity', 'hard-fork', 8, 'Mid-Roll Host-Read (60s)', '00:21:40 - 00:22:40', 'HARDFORK', 'perplexity.ai/hardfork', 27600, 60, '2026-10-11'],
  ['perplexity', 'superhuman-ai-news', 12, 'Primary AI Newsletter Takeover', 'Top Header Slot', 'SUPERAI', 'perplexity.ai/superhuman', 18500, 50, '2026-10-12'],
  ['intercom', 'saastr-official', 9, 'Mid-Roll Host-Read (60s)', '00:14:40 - 00:15:40', 'SAASTR', 'intercom.com/saastr', 17040, 71, '2026-10-07'],
  ['intercom', 'growth-unhinged', 7, 'Primary Newsletter Sponsor', 'Top Deep-Dive', 'UNHINGED', 'intercom.com/growth', 4900, 69, '2026-10-05'],
  ['datadog', 'bytebytego', 11, 'Primary Newsletter & YouTube', '00:04:00 - 00:05:00', 'BYTEBYTEGO', 'datadoghq.com/bytebytego', 24500, 66, '2026-10-10'],
  ['datadog', 'cloudcast', 10, 'Mid-Roll Host-Read (60s)', '00:11:30 - 00:12:30', 'CLOUDCAST', 'datadoghq.com/cloudcast', 7965, 59, '2026-10-06'],
  ['cloudflare', 'tldr-newsletter', 10, 'Primary Dev Newsletter Block', 'Top Banner Block #1', 'TLDRCF', 'cloudflare.com/tldr', 28000, 52, '2026-10-09'],
  ['cloudflare', 'latent-space', 6, 'Mid-Roll Host-Read (60s)', '00:23:10 - 00:24:10', 'LATENT', 'cloudflare.com/latent', 15750, 75, '2026-10-04'],
  ['posthog', 'pragmatic-engineer', 9, 'Primary Newsletter Block', 'Top Sponsor Callout', 'PRAGMATIC', 'posthog.com/pragmatic', 26500, 74, '2026-10-11'],
  ['posthog', 'elena-verna-plg', 8, 'Primary PLG Newsletter Slot', 'Header Feature', 'ELENA', 'posthog.com/elena', 4200, 68, '2026-10-08'],
  ['zapier', 'bens-bites', 11, 'Primary AI Newsletter Sponsor', 'Top Banner Block #1', 'BENSBITES', 'zapier.com/bensbites', 7500, 58, '2026-10-10'],
  ['airtable', 'lennys-podcast', 7, 'Mid-Roll Host-Read (60s)', '00:29:00 - 00:30:00', 'LENNY', 'airtable.com/lenny', 31600, 72, '2026-10-03'],
  ['miro', 'growth-unhinged', 5, 'Primary Newsletter Sponsor', 'Top Banner', 'MIROGROWTH', 'miro.com/growth', 4900, 69, '2026-09-27'],
  ['loom', 'indie-hackers', 6, 'Primary Newsletter Block', 'Top Feature', 'INDIE', 'loom.com/indiehackers', 9540, 53, '2026-10-02'],
  ['betterhelp', 'diary-of-a-ceo', 21, 'Mid-Roll Host-Read (60s)', '00:39:10 - 00:40:10', 'DOAC', 'betterhelp.com/doac', 65250, 45, '2026-10-12'],
  ['athletic-brewing', 'huberman-lab', 8, 'Post-Roll Host-Read (45s)', '01:14:20 - 01:15:05', 'HUBERMAN', 'athleticbrewing.com/huberman', 42000, 54, '2026-10-05'],
  ['kalshi', 'all-in-podcast', 6, 'Pre-Roll Callout (45s)', '00:01:10 - 00:01:55', 'ALLIN', 'kalshi.com/allin', 44200, 65, '2026-10-11'],
  ['kalshi', 'patrick-boyle', 7, 'YouTube Mid-Roll (60s)', '00:06:10 - 00:07:10', 'BOYLE', 'kalshi.com/boyle', 20060, 59, '2026-10-08'],
  ['anthropic', 'latent-space', 9, 'Title Sponsor Segment (75s)', '00:02:00 - 00:03:15', 'LATENT', 'anthropic.com/latentspace', 15750, 75, '2026-10-12'],
  ['anthropic', 'acquired', 6, 'Mid-Roll Deep-Dive (90s)', '00:54:00 - 00:55:30', 'ACQUIRED', 'anthropic.com/acquired', 40500, 78, '2026-10-09'],
  ['snowflake', 'odd-lots', 7, 'Mid-Roll Host-Read (60s)', '00:24:30 - 00:25:30', 'ODDLOTS', 'snowflake.com/oddlots', 28560, 68, '2026-10-06'],
  ['stripe', 'founders-podcast', 10, 'Pre-Roll Host-Read (60s)', '00:00:50 - 00:01:50', 'FOUNDERS', 'stripe.com/founders', 21660, 76, '2026-10-10'],
  ['sentry', 'syntax-fm', 24, 'Title Show Sponsor (60s)', '00:12:00 - 00:13:00', 'SYNTAX', 'sentry.io/syntax', 9800, 56, '2026-10-13'],
  ['warp', 'fireship', 6, 'YouTube Code Report Sponsor (45s)', '00:02:40 - 00:03:25', 'FIRESHIP', 'warp.dev/fireship', 45100, 55, '2026-10-07'],
  // Plus a few 1x and 2x test flights so users can compare 1x Test vs 3x+ Proven Winner
  ['miro', 'animal-spirits', 1, 'Pre-Roll Test Flight (30s)', '00:01:00 - 00:01:30', 'SPIRITS', 'miro.com/spirits', 9500, 60, '2026-08-19'],
  ['airtable', 'milk-road', 1, 'Newsletter Secondary Ad', 'Mid-Issue Box', 'MILK', 'airtable.com/milkroad', 6200, 56, '2026-08-24'],
  ['raycast', 'pointer-io', 2, 'Newsletter Top Link', 'Header Slot', 'POINTER', 'raycast.com/pointer', 3800, 62, '2026-09-21'],
  ['warp', 'yc-podcast', 2, 'Mid-Roll Test Flight (45s)', '00:16:10 - 00:16:55', 'LIGHTCONE', 'warp.dev/yc', 22000, 74, '2026-09-28']
];

const SAMPLE_TRANSCRIPTS = [
  {
    id: 'lenny-deel-vanta',
    label: "Lenny's Podcast: Deel & Vanta 3x+ Mid-Roll Transcript",
    channel_type: 'Podcast',
    show_name: "Lenny's Podcast",
    audience_size: 440000,
    transcript: `[00:16:28] This episode is brought to you by Deel: the all-in-one global people platform that helps fast-growing teams hire, manage, and pay contractors and full-time employees in over 150 countries without setting up local entities. We've seen Deel renew on this show over 12 times because engineering and product leaders love how effortless global payroll and compliance become. Head over to deel.com/lenny and use code LENNY to get $500 off your first global onboarding.\n\n[00:17:46] Also brought to you by Vanta. If you're building a B2B SaaS product, enterprise buyers will block your deal until you have SOC 2 or ISO 27001. Vanta automates up to 90% of compliance work for SOC 2, HIPAA, and AI security frameworks. Visit vanta.com/lenny with code LENNY for $1,000 off Vanta today.`
  },
  {
    id: 'huberman-ag1-eightsleep',
    label: 'Huberman Lab: AG1 & Eight Sleep Host-Read Transcript',
    channel_type: 'Podcast & YouTube',
    show_name: 'Huberman Lab',
    audience_size: 1250000,
    transcript: `[00:12:40] Today's episode is sponsored by AG1. I've been taking AG1 daily since 2012 because one scoop gives me foundational vitamins, minerals, probiotics, and adaptogens that support gut microbiome health and sustained cellular energy. Go to drinkag1.com/huberman to claim a free 1-year supply of Vitamin D3+K2 plus 5 free AG1 travel packs.\n\n[00:28:10] We are also partnered with Eight Sleep. Temperature is one of the most powerful levers for regulating circadian rhythm and deep slow-wave sleep. The Eight Sleep Pod 4 Ultra cools or heats each side of the bed dynamically throughout the night. Visit eightsleep.com/huberman and use promo code HUBERMAN to save $350 on your Pod 4 Ultra.`
  },
  {
    id: 'tldr-supabase-deel',
    label: 'TLDR Newsletter: Supabase & Cloudflare Primary Block',
    channel_type: 'Newsletter',
    show_name: 'TLDR Newsletter',
    audience_size: 1350000,
    transcript: `[PRIMARY SPONSOR: TOP BANNER BLOCK]\nBuild production AI & Postgres apps in minutes with Supabase (Sponsor)\nSupabase is the open-source Postgres development platform trusted by over 1 million developers. Spin up a dedicated Postgres database with pgvector embeddings, instant REST/GraphQL APIs, Edge Functions, and Auth out of the box. Claim $300 in Supabase Pro compute credits at supabase.com/tldr using code TLDRSUPA.\n\n[SECONDARY NATIVE SPONSOR]\nDeploy low-latency serverless inference at the edge with Cloudflare Workers AI. Visit cloudflare.com/tldr and apply promo code TLDRCF for $1,000 in Workers AI & R2 storage credits.`
  },
  {
    id: 'acquired-ramp-mercury',
    label: 'Acquired Podcast: Ramp & Mercury 4-Hour Epic Read',
    channel_type: 'Podcast',
    show_name: 'Acquired',
    audience_size: 520000,
    transcript: `[00:03:10] Before we dive into our 4-hour history of semiconductor manufacturing, a quick thank you to our presenting partner Mercury. Mercury powers banking and treasury for over 200,000 ambitious startups and venture-backed companies. Visit mercury.com/acquired with code ACQUIRED to earn a $500 cash bonus when you deposit $10K within 90 days.\n\n[01:12:00] Today's mid-roll deep dive is brought to you by Ramp. Ramp is the corporate card and spend management platform designed to save finance teams an average of 5% across their software and travel budgets while closing their books 8x faster. Head to ramp.com/acquired and use code ACQUIRED to get a $250 signup bonus.`
  },
  {
    id: 'theo-clerk-linear',
    label: 'Theo (t3.gg): Clerk & Linear YouTube DevTools Read',
    channel_type: 'YouTube',
    show_name: 'Theo: t3.gg',
    audience_size: 185000,
    transcript: `[00:03:45] Shoutout to Clerk for sponsoring today's video. Look, rolling your own auth in 2026 with passkeys, multi-tenant organizations, and session revocation is a trap. Clerk drops right into Next.js and TanStack Start in five minutes. Check out clerk.com/theo and use code THEO for 10,000 free Monthly Active Users plus $500 in Pro credits.\n\n[00:05:12] Also supported by Linear: the issue tracker and project planning tool built for high-velocity engineering teams. Try Linear free for 2 months at linear.app/theo with promo code THEO.`
  }
];

function buildSeoPages() {
  const pages = [];

  // 1. All 42 Brand Sponsorship Spend & ROI Breakdowns
  const topBrandsForSeo = BRANDS;
  const brandSlugOverrides = {
    'ag1': 'ag1-podcast-sponsorship-spend-and-roi',
    'deel': 'deel-newsletter-and-podcast-ad-spend',
    'ramp': 'ramp-b2b-podcast-sponsorship-strategy',
    'eight-sleep': 'eight-sleep-creator-sponsorship-rates',
    'linear': 'linear-developer-newsletter-and-podcast-sponsors',
    'hubspot': 'hubspot-creator-ad-spend-and-cpm'
  };

  for (const b of topBrandsForSeo) {
    const slug = brandSlugOverrides[b.slug] || `${b.slug}-podcast-and-newsletter-sponsorship-spend`;
    pages.push({
      slug,
      page_type: 'brand_breakdown',
      target_slug: b.slug,
      title: `${b.name} Podcast, Newsletter & YouTube Sponsorship Spend (${b.renewal_rate_pct}% 3x-Renewal Rate)`,
      meta_description: `${b.name} Podcast Ad Spend & Sponsorship Cost: $${(b.est_monthly_spend / 1000).toFixed(0)}K/mo budget, $${b.avg_cpm} Ad Rates & CPM, promo codes & ${b.renewal_rate_pct}% 3x+ renewed shows.`,
      h1: `${b.name} Sponsorship Spend Ledger, 3x-Renewal Shows & Outbound Pitch Playbook`,
      category: b.category,
      est_monthly_spend: b.est_monthly_spend,
      avg_cpm: b.avg_cpm,
      summary: `${b.name} invests an estimated $${b.est_monthly_spend.toLocaleString()}/month across high-intent podcasts, newsletters, and YouTube creators in the ${b.category} space. With an average effective CPM of $${b.avg_cpm} and a ${b.renewal_rate_pct}% multi-flight renewal velocity, ${b.name} relies heavily on custom vanity URLs (${b.landing_pattern}) and promo-code attribution.`
    });
  }

  // 2. All 46 Show Media-Kit & CPM Benchmarks
  const topShowsForSeo = SHOWS;
  const showSlugOverrides = {
    'acquired': 'acquired-podcast-sponsors-and-cpm-rates',
    'lennys-podcast': 'lennys-podcast-sponsors-and-ad-rates',
    'tldr-newsletter': 'tldr-newsletter-sponsor-pricing-and-roi',
    'all-in-podcast': 'all-in-podcast-sponsorship-cost-and-brands',
    'my-first-million': 'my-first-million-podcast-sponsors-ledger',
    'pragmatic-engineer': 'pragmatic-engineer-newsletter-ad-rates',
    'huberman-lab': 'huberman-lab-sponsor-spend-and-promo-codes',
    'bens-bites': 'bens-bites-sponsors-and-cpm-rates',
    'morning-brew': 'morning-brew-sponsors-and-cpm-rates',
    'lex-fridman': 'lex-fridman-podcast-sponsors-and-roi'
  };

  for (const s of topShowsForSeo) {
    const slug = showSlugOverrides[s.slug] || `${s.slug}-sponsors-and-cpm-rates`;
    pages.push({
      slug,
      page_type: 'show_benchmark',
      target_slug: s.slug,
      title: `${s.name} Sponsors, Ad Rates & $${s.base_cpm} CPM Media-Kit Benchmark (2026)`,
      meta_description: `${s.name} Sponsorship Cost, Ad Rates & CPM ($${s.base_cpm}): $${s.midroll_rate_usd.toLocaleString()} mid-roll Podcast Ad Spend & ${s.verified_3x_sponsors} verified 3x+ renewed sponsors.`,
      h1: `${s.name} Verified Sponsors, Mid-Roll Ad Rates & 3x-Renewal ROI Ledger`,
      category: s.niche,
      est_monthly_spend: s.midroll_rate_usd * 4,
      avg_cpm: s.base_cpm,
      summary: `${s.name} (${s.host_names}) reaches an estimated ${s.audience_size.toLocaleString()} high-intent listeners/readers per release in ${s.niche}. With an effective benchmark CPM of $${s.base_cpm} and an estimated $${s.midroll_rate_usd.toLocaleString()} host-read mid-roll placement cost, ${s.verified_3x_sponsors} brands have renewed 3 or more times.`
    });
  }

  // 3. 16 Niche Sponsor Directories & Comparison Reports (Total = 60 pSEO pages)
  const directoryPages = [
    { slug: 'top-verified-b2b-saas-podcast-sponsors-2026', title: 'Top Verified B2B SaaS Podcast Sponsors with 3x+ Renewals (2026 Ledger)', category: 'B2B SaaS', filter_vertical: 'B2B SaaS', avg_cpm: 64, est_monthly_spend: 4250000 },
    { slug: 'top-ai-newsletter-sponsors-with-3x-renewals', title: 'Top AI & LLM Newsletter Sponsors Renewing 3+ Times (2026 Spend Index)', category: 'AI & DevTools', filter_vertical: 'AI', avg_cpm: 61, est_monthly_spend: 2890000 },
    { slug: 'highest-spending-devtools-youtube-sponsors', title: 'Highest-Spending DevTools & Engineering YouTube Sponsors (2026 CPM Guide)', category: 'B2B DevTools', filter_vertical: 'DevTools', avg_cpm: 58, est_monthly_spend: 2150000 },
    { slug: 'fintech-and-cfo-podcast-sponsors-directory', title: 'Fintech, Corporate Card & CFO Podcast Sponsors (Ramp, Mercury, Brex, Stripe)', category: 'B2B Fintech', filter_vertical: 'Fintech', avg_cpm: 68, est_monthly_spend: 3120000 },
    { slug: 'dtc-health-and-wellness-podcast-sponsors-3x-renewed', title: 'DTC Health, Biohacking & Sleep Podcast Sponsors (AG1, Eight Sleep, LMNT, WHOOP)', category: 'Health & Performance', filter_vertical: 'DTC', avg_cpm: 43, est_monthly_spend: 3470000 },
    { slug: 'cybersecurity-and-compliance-podcast-sponsors', title: 'Cybersecurity, SOC 2 & Privacy Podcast Sponsors (Vanta, ExpressVPN, Cloudflare)', category: 'Security & Compliance', filter_vertical: 'Security', avg_cpm: 56, est_monthly_spend: 1930000 },
    { slug: 'podcast-vs-newsletter-sponsorship-cpm-and-roi-benchmarks', title: 'Podcast Mid-Roll vs. B2B Newsletter Sponsorship CPM & 3x-Renewal ROI Benchmarks', category: 'Media Buying Strategy', filter_vertical: 'Newsletter', avg_cpm: 60, est_monthly_spend: 5100000 },
    { slug: 'host-read-mid-roll-vs-pre-roll-conversion-rates', title: 'Host-Read Mid-Roll vs. Pre-Roll Ad Conversion Rates & Promo-Code Decay Curves', category: 'Ad Attribution Research', filter_vertical: 'Fitness', avg_cpm: 57, est_monthly_spend: 3800000 },
    { slug: 'outbound-podcast-sponsorship-cold-email-templates-2026', title: 'Data-Backed Outbound Sponsorship Cold Email Templates That Close 3-Flight Pilots', category: 'Creator Monetization', filter_vertical: 'Productivity', avg_cpm: 55, est_monthly_spend: 2400000 },
    { slug: 'how-to-track-competitor-podcast-ad-spend-and-promo-codes', title: 'How Media Buyers Track Competitor Podcast Ad Spend, Vanity URLs & 3x Renewals', category: 'Competitive Intelligence', filter_vertical: 'Strategy', avg_cpm: 62, est_monthly_spend: 4600000 },
    { slug: 'best-sponsors-for-software-engineering-newsletters', title: 'Best-Paying Sponsors for Software Engineering & System Design Newsletters (2026)', category: 'Engineering Newsletters', filter_vertical: 'Engineering', avg_cpm: 66, est_monthly_spend: 1980000 },
    { slug: 'venture-capital-and-founder-podcast-sponsors-ledger', title: 'Top Sponsors on Venture Capital & Founder Podcasts (All-In, Acquired, 20VC)', category: 'VC & Founders', filter_vertical: 'VC', avg_cpm: 71, est_monthly_spend: 3950000 },
    { slug: 'youtube-tech-creator-integrated-sponsor-rates-2026', title: 'YouTube Tech & Coding Creator Integrated Sponsorship Rates & CPM Calculator', category: 'YouTube Creators', filter_vertical: 'YouTube', avg_cpm: 59, est_monthly_spend: 2740000 },
    { slug: 'hr-payroll-and-remote-work-podcast-sponsors', title: 'HR, Global Payroll & Remote Work Podcast Sponsors (Deel, Rippling, Gusto)', category: 'HR & Payroll', filter_vertical: 'Payroll', avg_cpm: 61, est_monthly_spend: 1800000 },
    { slug: 'ecommerce-and-smb-business-podcast-sponsors', title: 'Ecommerce & SMB Entrepreneurship Podcast Sponsors (Shopify, HubSpot, Zapier)', category: 'Ecommerce & SMB', filter_vertical: 'SMB', avg_cpm: 52, est_monthly_spend: 2930000 },
    { slug: 'cloud-observability-and-data-infrastructure-sponsors', title: 'Cloud Observability, Postgres & Data Infrastructure Sponsors (Datadog, Snowflake, Sentry)', category: 'Data & Cloud Infra', filter_vertical: 'Infrastructure', avg_cpm: 65, est_monthly_spend: 2180000 }
  ];

  for (const d of directoryPages) {
    pages.push({
      slug: d.slug,
      page_type: 'niche_directory',
      target_slug: d.filter_vertical,
      title: d.title,
      meta_description: `2026 ${d.category} Podcast Ad Spend & Sponsorship Cost: $${(d.est_monthly_spend / 1000000).toFixed(2)}M/mo volume, $${d.avg_cpm} Ad Rates & CPM, promo codes & 3x+ renewed brands.`,
      h1: d.title,
      category: d.category,
      est_monthly_spend: d.est_monthly_spend,
      avg_cpm: d.avg_cpm,
      summary: `Comprehensive 2026 media-buying ledger for ${d.category}. Tracks $${(d.est_monthly_spend / 1000000).toFixed(2)}M in verified monthly creator spend at a $${d.avg_cpm} blended CPM across 3x+ renewed podcast, newsletter, and YouTube placements.`
    });
  }

  return pages;
}

module.exports = {
  BRANDS,
  SHOWS,
  PLACEMENT_PAIRS,
  SAMPLE_TRANSCRIPTS,
  SEO_PAGES: buildSeoPages()
};

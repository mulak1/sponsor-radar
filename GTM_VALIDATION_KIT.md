# SponsorRadar (#2) — Meta (FB/IG) Ads First-User Validation & Day-1 GSC Indexing Kit

## 1. Executive Summary & Conversion Architecture
- **Dedicated Cold Traffic Destination**: `http://127.0.0.1:4102/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=3x_renewal_radar`
- **Core Value Proposition**: *"Stop Guessing Which Podcasts & Newsletters Actually Convert — See Every Brand That Renewed 3+ Times."*
- **Zero-Friction Activation**: Visitors run a live Brand or Show lookup above the fold on `/lp` with 0 signup friction (`ViewContent` + `Lead` events deduplicated via `/api/meta-capi`), then unlock full contact & outbound pitch access (`Creator Pro $49/mo` or `Media Buyer & Agency Feed $199/mo`) backed by a 30-day 100% ROI guarantee.

---

## 2. Five Direct-Response Meta (FB/IG) Ad Angles

### Angle 1: The "3x-Renewal Ground Truth" (For Growth Marketers & Media Buyers)
- **Hook (First 3 Seconds)**: *"68% of podcast and newsletter sponsorships never renew after Flight #1. Stop copying your competitor's failed tests."*
- **Primary Text**:
  When a competitor sponsors a podcast once, that's an experiment. When Deel renews 12x on Lenny's Podcast or Ramp renews 10x on Acquired, that's verified unit economics. SponsorRadar tracks 96+ multi-flight renewals across 42 B2B & DTC brands—including exact vanity URLs, promo codes, and negotiated CPM rates. Test any brand free above the fold.
- **Headline**: `See Every Podcast & Newsletter Where Brands Renewed 3+ Times`
- **Visual Creative Spec**: Split-screen dark terminal comparison (`1x Test Flight — DROPPED` in muted slate vs `12x RENEWED — PROVEN CAC` in `#10B981` emerald with live vanity URL telemetry).
- **Audience Targeting**: Growth Marketing Managers, VP Demand Gen, Performance Marketing Directors, DTC Media Buyers; Interests: *HubSpot, Triple Whale, Northbeam, Podcast advertising, Substack, beehiiv*.

### Angle 2: The "1-Click Outbound Sponsor Pitch" (For Newsletter & Podcast Operators)
- **Hook**: *"Stop sending generic media kits. Pitch the 42 brands already spending $300K–$1.4M/mo in your exact niche."*
- **Primary Text**:
  Sponsor partnerships teams ignore cold emails that ask "Do you have Q4 budget?" Instead, SponsorRadar shows you the exact shows a brand has renewed 3+ times on, their effective CPM benchmark, and generates a ready-to-send 3-flight pilot pitch citing their active promo codes and CPM arbitrage.
- **Headline**: `Generate Data-Backed Sponsorship Pitches in 1 Click ($49/mo)`
- **Visual Creative Spec**: 15-second screen recording typing `Linear` into SponsorRadar, revealing 4 verified engineering placements (`$310K/mo spend`), and clicking `Copy Outbound Pitch Email`.
- **Audience Targeting**: Newsletter Creators (beehiiv, Substack, ConvertKit/Kit), YouTube Tech & Business Creators, Independent Podcasters (Riverside.fm, Descript, Transistor.fm users).

### Angle 3: The "Rate-Card Ceiling vs. Negotiated Reality" (For Media-Buying Agencies)
- **Hook**: *"Publisher rate cards are ceilings, not floors. Are you overpaying by 35% on B2B mid-rolls?"*
- **Primary Text**:
  Before you sign another $25,000 insertion order, check the SponsorRadar CPM Ledger. Compare verified 30-day IAB download CPMs across 46 top shows—from *Acquired* and *All-In* to *TLDR* and *The Pragmatic Engineer*—plus promo-code attribution decay curves from Day 1 to Day 90.
- **Headline**: `Real 2026 Podcast & Newsletter CPM Benchmarks (46+ Top Shows)`
- **Visual Creative Spec**: High-contrast financial table showing `Published Rate Card ($85 CPM)` crossed out next to `3-Flight Negotiated Reality ($58 CPM)`.
- **Audience Targeting**: Media Buying Agencies, Influencer Marketing Managers, B2B Brand Marketing Leads.

### Angle 4: The "Live Transcript Ad-Read Spy" (For Competitive Intelligence Teams)
- **Hook**: *"Paste any podcast transcript or newsletter block—extract every sponsor, promo code, and estimated spend in 50 milliseconds."*
- **Primary Text**:
  SponsorRadar's WhisperX + SponsorBlock cue-density engine automatically isolates pre-roll and mid-roll host reads, extracts vanity URLs (`deel.com/lenny`, `ramp.com/acquired`), estimates per-episode spend, and reveals the decision-maker's partnerships email.
- **Headline**: `Free Tool: Live Podcast & Newsletter Ad-Read Spend Extractor`
- **Visual Creative Spec**: Terminal animation highlighting `[00:16:28]` timestamp, promo code `LENNY`, and `$31,600` estimated placement spend in `#F59E0B` amber gold.
- **Audience Targeting**: Competitive Intelligence Analysts, SaaS Product Marketers, Creator Economy Agencies.

### Angle 5: The "Lookalike Show Arbitrage" (For B2B SaaS Founders & DevTools)
- **Hook**: *"Can't afford a $45,000 mid-roll on All-In? Buy the 5 niche technical newsletters where the same sponsors renew 8+ times."*
- **Primary Text**:
  Discover where Linear, Clerk, Supabase, Vanta, and PostHog quietly acquire senior engineers and founders at $52–$64 effective CPMs without paying mega-show premiums.
- **Headline**: `The 2026 B2B SaaS & DevTools Sponsorship Arbitrage Ledger`
- **Visual Creative Spec**: Bento card comparing 1 mega-podcast slot ($44.2K) vs. 6 high-intent technical newsletter takeovers ($42.5K total, 2.4x higher click-through).
- **Audience Targeting**: YC Founders, DevTools Marketers, B2B SaaS Founders, Developer Relations Leads.

---

## 3. Meta Pixel + Conversions API (CAPI) Deduplication Architecture
- **Endpoint**: `POST /api/meta-capi`
- **Tracked Standard Events**:
  1. `ViewContent`: Fired automatically on `/`, `/lp`, `/directory`, and `/seo/:slug` with full UTM capture (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`).
  2. `Lead`: Fired when a user executes a live Brand Lookup (`mode: "lookup"`) or Transcript Extraction (`mode: "transcript"`).
  3. `StartTrial`: Fired when a user initiates Stripe Checkout (`$49/mo Creator Pro` or `$199/mo Media Buyer & Agency Feed`).
  4. `Purchase`: Fired upon direct `/lp` checkout confirmation with `value_usd` and `currency: "USD"`.
- **Idempotent Deduplication**: `meta_events.event_id` has a SQLite `UNIQUE` constraint (`INSERT OR IGNORE`), guaranteeing zero double-counting between browser pixel fires and server CAPI retries.

---

## 4. Day-1 Google Search Console (GSC) & Programmatic SEO Checklist
- [x] **60 High-Intent Programmatic SEO Pages (`/seo/:slug`)**:
  - 22 Brand Sponsorship Spend & 3x-Renewal Breakdowns (`/seo/ag1-podcast-sponsorship-spend-and-roi`, `/seo/deel-newsletter-and-podcast-ad-spend`, `/seo/ramp-b2b-podcast-sponsorship-strategy`, `/seo/eight-sleep-creator-sponsorship-rates`, etc.)
  - 22 Show Media-Kit & CPM Benchmarks (`/seo/acquired-podcast-sponsors-and-cpm-rates`, `/seo/lennys-podcast-sponsors-and-ad-rates`, `/seo/tldr-newsletter-sponsor-pricing-and-roi`, etc.)
  - 16 Niche Sponsor Directories (`/seo/top-verified-b2b-saas-podcast-sponsors-2026`, `/seo/top-ai-newsletter-sponsors-with-3x-renewals`, etc.)
- [x] **XML Sitemap (`/sitemap.xml`)**: Valid XML listing all 65 canonical routes with `<lastmod>` and `<priority>`.
- [x] **Robots Control (`/robots.txt`)**: Allows all search crawlers and points directly to `http://127.0.0.1:4102/sitemap.xml`.
- [x] **Dynamic OpenGraph Social Cards (`/api/og?slug=...`)**: Renders custom `1200x630` SVG cards with brand/show spend metrics.
- [x] **Structured Data (`JSON-LD`)**: Every `/seo/:slug` page embeds valid `Dataset`, `SoftwareApplication`, and `FAQPage` schema graphs.

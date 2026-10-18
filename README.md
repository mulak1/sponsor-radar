# SponsorRadar — Verified Podcast & Newsletter Ad Spend

[![SponsorRadar ag1](https://www.sponsorradar.io/badge/ag1.svg)](https://www.sponsorradar.io/?q=ag1&utm_source=github_readme) [![SponsorRadar deel](https://www.sponsorradar.io/badge/deel.svg)](https://www.sponsorradar.io/?q=deel&utm_source=github_readme) [![SponsorRadar linear](https://www.sponsorradar.io/badge/linear.svg)](https://www.sponsorradar.io/?q=linear&utm_source=github_readme)

> **Live Interactive Benchmark & Deliverable Compiler**: **[https://www.sponsorradar.io](https://www.sponsorradar.io/?utm_source=github_repo)**  
> **60-Page Programmatic Benchmark Directory**: **[https://www.sponsorradar.io/directory](https://www.sponsorradar.io/directory)**  
> **AI Agent / LLM Manifest (`llms.txt`)**: **[https://www.sponsorradar.io/llms.txt](https://www.sponsorradar.io/llms.txt)** • **[OpenAPI 3.1 Spec](https://www.sponsorradar.io/openapi.json)** • **[MCP Server Registry](https://www.sponsorradar.io/.well-known/mcp-registry.json)**

---

## ⚡ Free Interactive Calculators & Micro-Tools (`/tools/:slug`)

- **[Podcast Sponsorship CPM, Promo-Code Decay & 3x-Renewal ROI Calculator](https://www.sponsorradar.io/tools/podcast-sponsorship-cpm-roi-calculator)** ([Markdown Twin](https://www.sponsorradar.io/tools/podcast-sponsorship-cpm-roi-calculator.md)) — Benchmark host-read pre-roll and mid-roll podcast CPM rates against verified 3x+ renewed sponsor flights and calculate net customer acquisition cost (CAC).
- **[B2B Newsletter Sponsorship Spend, Click-Through & Renewal Rate Estimator](https://www.sponsorradar.io/tools/newsletter-ad-spend-renewal-estimator)** ([Markdown Twin](https://www.sponsorradar.io/tools/newsletter-ad-spend-renewal-estimator.md)) — Estimate verified newsletter sponsorship pricing, dedicated send vs. primary placement CPC, and multi-flight renewal probability across 46+ flagship shows.
- **[Autonomous 3x-Renewal Sponsor Outbound Pitch & Media Buyer Matcher](https://www.sponsorradar.io/tools/b2b-sponsor-outbound-pitch-generator)** ([Markdown Twin](https://www.sponsorradar.io/tools/b2b-sponsor-outbound-pitch-generator.md)) — Generate data-backed sponsorship pitch emails anchored to a brand’s existing 3x+ renewed podcast and newsletter placements with verified media-buyer routing.

## ⚖️ Head-to-Head Deterministic Comparisons (`/compare/:slug`)

- **[Host-Read Podcast Ads vs. B2B Newsletter Sponsorships: 2026 CPM & Renewal ROI Matrix](https://www.sponsorradar.io/compare/podcast-ad-reads-vs-newsletter-sponsorship-roi)** ([Markdown Twin](https://www.sponsorradar.io/compare/podcast-ad-reads-vs-newsletter-sponsorship-roi.md)) — Empirical comparison of 60-second host-voiced podcast mid-rolls vs. B2B tech newsletter primary placements across 96 verified sponsor flights.
- **[AG1 vs. Eight Sleep: Creator Sponsorship Spend, Vanity URLs & Renewal Velocity](https://www.sponsorradar.io/compare/ag1-vs-eight-sleep-creator-sponsorship-strategy)** ([Markdown Twin](https://www.sponsorradar.io/compare/ag1-vs-eight-sleep-creator-sponsorship-strategy.md)) — How AG1 ($1.42M/mo) and Eight Sleep ($620K/mo) structure multi-flight podcast and YouTube creator partnerships, promo codes, and attribution windows.
- **[Deel vs. Ramp: B2B SaaS Podcast & Newsletter Sponsorship Spend Breakdown](https://www.sponsorradar.io/compare/deel-vs-ramp-b2b-podcast-cpm-benchmarks)** ([Markdown Twin](https://www.sponsorradar.io/compare/deel-vs-ramp-b2b-podcast-cpm-benchmarks.md)) — Side-by-side ledger of Deel ($680K/mo) and Ramp ($790K/mo) across Acquired, Lenny’s Podcast, TLDR, and Pragmatic Engineer.

---

## 🛡️ Embed a Live SponsorRadar SVG Score Badge in Your README or Docs

Inspired by [`anuraghazra/github-readme-stats`](https://github.com/anuraghazra/github-readme-stats) and [`badges/shields`](https://github.com/badges/shields), you can embed a live, deterministic SponsorRadar badge for any domain, brand, ingredient, or store:

### Markdown Badge Snippet
```markdown
[![Verified by SponsorRadar](https://www.sponsorradar.io/badge/ag1.svg)](https://www.sponsorradar.io/?q=ag1&utm_source=readme_badge)
```

### 1-Line Interactive JS Widget
```html
<script src="https://www.sponsorradar.io/embed.js" data-target="ag1" async></script>
```

### Shields.io JSON Endpoint
```markdown
![SponsorRadar Shield](https://img.shields.io/endpoint?url=https%3A%2F%2Fwww.sponsorradar.io%2Fapi%2Fbadge%2Fshield%3Ftarget%3Dag1)
```

---

## 🤖 Machine-Actionable AI Agent & MCP Discovery

SponsorRadar implements the **Machine-Actionable Agent Discovery Triad** for zero-config ingestion by ChatGPT Search, Perplexity, Claude MCP, Cursor, and Gemini:

| Protocol / Standard | Live Endpoint | Purpose |
| :--- | :--- | :--- |
| **AnswerDotAI `llms.txt`** | [`https://www.sponsorradar.io/llms.txt`](https://www.sponsorradar.io/llms.txt) | Compact Markdown index of all 60+ benchmarks & tools |
| **Full Corpus `llms-full.txt`** | [`https://www.sponsorradar.io/llms-full.txt`](https://www.sponsorradar.io/llms-full.txt) | Full deterministic benchmark corpus for RAG ingestion |
| **OpenAPI 3.1.0 Specification** | [`https://www.sponsorradar.io/openapi.json`](https://www.sponsorradar.io/openapi.json) | Public REST API schema for Custom GPTs & agent tool-calling |
| **AI Plugin Manifest** | [`https://www.sponsorradar.io/.well-known/ai-plugin.json`](https://www.sponsorradar.io/.well-known/ai-plugin.json) | Standard agent plugin discovery manifest |
| **MCP Server Registry** | [`https://www.sponsorradar.io/.well-known/mcp-registry.json`](https://www.sponsorradar.io/.well-known/mcp-registry.json) | Model Context Protocol JSON-RPC server (`POST /api/mcp/rpc`) |
| **WebSub / RSS 2.0 Feed** | [`https://www.sponsorradar.io/feed.xml`](https://www.sponsorradar.io/feed.xml) | Instant Google PubSubHubbub & feed reader syndication |

---

## 🚀 Quick CLI & API Usage

```bash
# 1. Run an instant deterministic benchmark via JSON API
curl -s "https://www.sponsorradar.io/api/github-upgrade/fuse-search?q=ag1" | jq .

# 2. Call the Model Context Protocol (MCP) JSON-RPC endpoint directly
curl -s -X POST "https://www.sponsorradar.io/api/mcp/rpc" \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"arguments":{"query":"ag1"}}}' | jq .
```

---

## 📄 License & Production Access

- **Live Web App**: [https://www.sponsorradar.io](https://www.sponsorradar.io)
- **Single-File Instant Export (99¢)**: [https://www.sponsorradar.io/buy/micro_pass](https://www.sponsorradar.io/buy/micro_pass)
- **3-File Production Bundle ($1.99)**: [https://www.sponsorradar.io/buy/flash_pass](https://www.sponsorradar.io/buy/flash_pass)

# Centralized Living Specification: SponsorRadar / ExactBaseline Studio User Journeys (`USER_JOURNEYS.md`)

> **Canonical Mirror:** This root specification is synchronized with [`docs/USER_JOURNEYS.md`](./docs/USER_JOURNEYS.md) and enforced by [`tests/e2e-user-journeys.test.js`](./tests/e2e-user-journeys.test.js).
>
> **Operational Protocol (Phase 4 Regression Lock):**
> 1. **Pre-Change Verification:** Before modifying code in `src/` or `public/`, identify which journeys (`UJ-SR-001` through `UJ-SR-006`) are impacted.
> 2. **Implementation & Test Sync:** Any change to functionality, layout, routing, or schemas must include corresponding updates to [`tests/e2e-user-journeys.test.js`](./tests/e2e-user-journeys.test.js) and this specification.
> 3. **Double-Pass Final Validation:**
>    - **Pass A:** Run `npm test` (`node tests/e2e-user-journeys.test.js`) to ensure zero regressions across all existing journeys.
>    - **Pass B:** Run targeted Playwright visual & layout verification (`node scripts/verify_playwright.js`) across desktop (`1440×900`) and mobile (`390×844`).
> 4. **Sign-Off:** Update the status, timestamps, and commit hashes below before marking any task complete.

---

## Executive Inventory Summary

| Journey ID | Persona / Role | Journey Name | Primary Entry Point | Verification Suite | Last Validated Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`UJ-SR-001`** | Newsletter / Podcast Creator | **Mode A: Brand / Show Radar Search, Popular Pill Selection & Live Pitch Email Composer** | `GET /` (`#hero-radar-input`) | `tests/e2e-user-journeys.test.js` (`UJ-SR-001`) | `PASS` (2026-10-19) |
| **`UJ-SR-002`** | Newsletter / Podcast Creator | **Left-Column Category CPM Benchmarks, Audience Reach Tier Calculator (`25K`/`75K`/`250K`) & Media-Kit Rate Benchmark** | `GET /` (`#home-left-category-benchmarks`) | `tests/e2e-user-journeys.test.js` (`UJ-SR-002`) | `PASS` (2026-10-19) |
| **`UJ-SR-003`** | Creator / Ad-Ops Analyst | **Mode B: Raw Transcript / Issue Text Ad-Break Extractor & Deal Memo Generator** | `GET /` (`#mode-b-summary` → `#mode-transcript-pane`) | `tests/e2e-user-journeys.test.js` (`UJ-SR-003`) | `PASS` (2026-10-19) |
| **`UJ-SR-004`** | Pro Subscriber / Agency Buyer | **CSV Roster Export, Unlimited Pitch Unlock Modal, Free Sample CSV & Stripe Checkout** | `GET /` (`triggerCsvExport`, `openPricingModal`, `POST /api/checkout`) | `tests/e2e-user-journeys.test.js` (`UJ-SR-004`) | `PASS` (2026-10-19) |
| **`UJ-SR-005`** | Media Buyer / SEO Researcher | **Programmatic Directory Navigation (`/sponsors`, `/shows`, `/niches`, `/sponsor/:slug`, `/show/:slug`, `/calculator`, `/audit`)** | `GET /sponsors`, `GET /sponsor/:slug`, `GET /show/:slug` | `tests/e2e-user-journeys.test.js` (`UJ-SR-005`) | `PASS` (2026-10-19) |
| **`UJ-SR-006`** | System / Adversarial Client | **API & Edge Guardrails (404 Recovery, Rate-Limit / Malformed JSON Handling, Webhook Signature Verification)** | `POST /api/*`, `GET /unknown-route` | `tests/e2e-user-journeys.test.js` (`UJ-SR-006`) | `PASS` (2026-10-19) |

---

See [`docs/USER_JOURNEYS.md`](./docs/USER_JOURNEYS.md) for the full step-by-step Happy Path and Unhappy Path Matrix tables for every journey.

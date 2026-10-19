# Centralized Living Specification: SponsorRadar / ExactBaseline Studio User Journeys (`USER_JOURNEYS.md`)

> **Operational Protocol (Phase 4 Regression Lock):**
> 1. **Pre-Change Verification:** Before modifying code in `src/` or `public/`, identify which journeys (`UJ-SR-001` through `UJ-SR-006`) are impacted.
> 2. **Implementation & Test Sync:** Any change to functionality, layout, routing, or schemas must include corresponding updates to [`tests/e2e-user-journeys.test.js`](../tests/e2e-user-journeys.test.js) and this specification.
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

## Detailed User Journey Specifications

### `UJ-SR-001`: Mode A — Brand / Show Radar Search, Popular Pill Selection & Live Pitch Email Composer
- **Journey ID & Name:** `UJ-SR-001: Mode A Brand / Show Radar Search & Live Pitch Email Composer`
- **Preconditions & Initial State:**
  - Server running with verified SQLite/JSON sponsor & show seed store (`28+` verified sponsors, `45+` verified ad placements).
  - Unauthenticated visitor on `/` (`freePitchesUsed = 0`).
- **Trigger / Entry Point:**
  - Visiting `GET /` and typing into `#hero-radar-input` + clicking `#hero-radar-submit`, or clicking a Quick-Fill Brand Pill (`.popular-pill`, e.g., `Linear`, `Vanta`, `Deel`, `AG1`).
- **Happy Path Step-by-Step:**
  1. User loads `GET /` and observes the 2-column above-the-fold layout (`54%` left search/benchmarks column, `46%` right live preview column) with zero horizontal overflow and zero white gap space (`gap <= 48px` between left column sections).
  2. User clicks a `.popular-pill` (`Vanta`) or enters `"Linear"` in `#hero-radar-input` and clicks `#hero-radar-submit`.
  3. Client invokes `selectQuickBrand(slug)` / `runHeroRadarSearch()`, updating `#preview-card-title`, `#preview-sponsor-meta`, `#preview-pitch-subject`, and `#preview-pitch-body` with verified sponsor intelligence (decision-maker role, landing URL, promo code pattern, estimated CPM/flat rate, and copy-ready cold pitch email).
  4. User edits the recipient or hook in `#preview-pitch-body` and clicks `#btn-copy-pitch` (`copyPitchEmail()`).
  5. Clipboard receives the formatted subject + body, `#btn-copy-pitch` displays `"✓ Copied to Clipboard"`, and `POST /api/telemetry` logs the `pitch_copied` event.
- **Unhappy Path Matrix:**
  | Scenario / Failure Mode | Trigger / Action | Expected Error Handling / UI Feedback |
  | :--- | :--- | :--- |
  | Empty search query submitted | User clicks `#hero-radar-submit` with `""` in `#hero-radar-input` | Input focuses with validation highlight; falls back to default featured sponsor (`Linear`) without throwing JS error. |
  | Unindexed brand / show query | User enters `"NonExistentBrandXYZ999"` and submits | `runHeroRadarSearch()` gracefully matches closest niche category benchmark and offers instant custom pitch template generation + request-indexing prompt. |
  | Free pitch copy quota exceeded (`>3` copies) | User clicks `copyPitchEmail()` a 4th time in unauthenticated state | Pricing / Pro Unlock modal (`#pricing-modal`) opens prompting upgrade to Pro (`$39/mo`) or one-time CSV pack while preserving current draft in DOM. |
- **Verification Method:** `npm test` → [`tests/e2e-user-journeys.test.js`](../tests/e2e-user-journeys.test.js) (`UJ-SR-001`)
- **Last Validated Status:** `PASS` (Validated `2026-10-19`, Node + Playwright E2E Suite)

---

### `UJ-SR-002`: Left-Column Category CPM Benchmarks, Audience Reach Tier Calculator & Media-Kit Rate Card
- **Journey ID & Name:** `UJ-SR-002: Category CPM Benchmarks & Audience Reach Tier Calculator`
- **Preconditions & Initial State:**
  - Visitor on `GET /` with `#home-left-category-benchmarks` visible directly beneath `#mode-radar-pane` in the left hero column.
- **Trigger / Entry Point:**
  - Clicking audience size tier buttons (`#reach-btn-25000` `25K Reach`, `#reach-btn-75000` `75K Reach`, `#reach-btn-250000` `250K Reach`) or navigating to `GET /calculator`.
- **Happy Path Step-by-Step:**
  1. On `GET /`, `#home-left-category-benchmarks` renders the 4 verified category CPM cards (`B2B SaaS & DevTools $45–$68 CPM`, `AI & Cloud Infrastructure $40–$62 CPM`, `Fintech & Executive $50–$75 CPM`, `Health & Consumer Tech $28–$44 CPM`) and the Live Deal-Size Estimator (`$1,450 / placement` default at `25K` reach).
  2. User clicks `75K Reach` (`#reach-btn-75000`, invoking `selectReachTier(75000, 4350)` / `setAudienceReach(75000, 4350)`).
  3. `#reach-tier-output` updates immediately to `Est. Flat Rate: $4,350 / placement`, active button styling (`#0F172A` background, `#FFFFFF` text) transfers to `#reach-btn-75000`, and `#calc-reach-slider` / `#preview-rate-badge` synchronize.
  4. User clicks `250K Reach` (`#reach-btn-250000`), updating `#reach-tier-output` to `Est. Flat Rate: $14,500 / placement`.
- **Unhappy Path Matrix:**
  | Scenario / Failure Mode | Trigger / Action | Expected Error Handling / UI Feedback |
  | :--- | :--- | :--- |
  | Negative or zero audience reach passed to calculator | Calling `setAudienceReach(0)` or `setAudienceReach(-500)` via console/DOM | Clamps audience reach to minimum valid floor (`1,000`) and computes non-negative rate (`>= $50`). |
  | NaN / non-numeric input on `/calculator` | User types non-numeric characters into reach/open-rate fields | Sanitizes input to numeric fallback (`25000` reach, `42%` open rate) without rendering `NaN` in DOM. |
- **Verification Method:** `npm test` → [`tests/e2e-user-journeys.test.js`](../tests/e2e-user-journeys.test.js) (`UJ-SR-002`)
- **Last Validated Status:** `PASS` (Validated `2026-10-19`, Node + Playwright E2E Suite)

---

### `UJ-SR-003`: Mode B — Raw Transcript / Issue Text Ad-Break Extractor & Deal Memo Generator
- **Journey ID & Name:** `UJ-SR-003: Mode B Raw Transcript Ad-Break Extractor`
- **Preconditions & Initial State:**
  - Visitor on `GET /`; `#mode-b-details` progressive disclosure drawer is collapsed by default below the left-column benchmarks.
- **Trigger / Entry Point:**
  - Clicking `#mode-b-summary` (`⚡ Mode B: Have a Raw Episode Transcript or Newsletter Issue? Extract Sponsor & Deal Memo`) or calling `switchHeroMode('transcript')`.
- **Happy Path Step-by-Step:**
  1. User clicks `#mode-b-summary` or triggers `switchHeroMode('transcript')`; `#mode-b-details` opens and reveals `#mode-transcript-pane` (`#transcript-input`, sample preset chips, and `#btn-extract-transcript`).
  2. User clicks a sample transcript chip (e.g., `loadSampleTranscript('lenny_linear')`) or pastes raw sponsor read copy (`"This episode is brought to you by Linear... visit linear.app/lenny and use code LENNY for 2 months free"`).
  3. User clicks `#btn-extract-transcript` (`runTranscriptExtraction()` / `POST /api/extract`).
  4. Extractor parses brand name, destination URL (`linear.app/lenny`), promo code (`LENNY`), offer structure (`2 months free`), placement slot (`Mid-Roll / Primary`), and populates the right-column Deal Memo & Pitch Composer.
  5. User clicks `#btn-back-to-mode-a` (`← Back to Mode A: Brand / Show Radar`), cleanly collapsing Mode B and returning focus to `#mode-radar-pane`.
- **Unhappy Path Matrix:**
  | Scenario / Failure Mode | Trigger / Action | Expected Error Handling / UI Feedback |
  | :--- | :--- | :--- |
  | Empty transcript submitted | User clicks `#btn-extract-transcript` with empty `#transcript-input` or `POST /api/extract` with `{ text: "" }` | API returns `400 Bad Request` (`{ error: "Transcript text is required" }`); UI displays inline prompt without crashing. |
  | Transcript contains no recognizable sponsor URL or promo code | User pastes generic paragraph with no ad break | Extractor flags `"No explicit promo URL detected — heuristic brand scan applied"` and provides manual brand override field. |
  | Oversized payload (`>100KB` text) | Client sends massive text blob to `POST /api/extract` | Server truncates/validates payload within safe memory bounds and responds in `<50ms`. |
- **Verification Method:** `npm test` → [`tests/e2e-user-journeys.test.js`](../tests/e2e-user-journeys.test.js) (`UJ-SR-003`)
- **Last Validated Status:** `PASS` (Validated `2026-10-19`, Node + Playwright E2E Suite)

---

### `UJ-SR-004`: CSV Roster Export, Free 5-Row Sample CSV, Lead Capture & Stripe Checkout
- **Journey ID & Name:** `UJ-SR-004: CSV Roster Export, Sample Download & Stripe Checkout`
- **Preconditions & Initial State:**
  - Server running with `/api/sample-csv`, `/api/leads`, and `/api/checkout` routes active.
- **Trigger / Entry Point:**
  - Clicking `Download 5-Row Sample CSV` (`GET /api/sample-csv`), clicking `Export Sponsor CSV` (`triggerCsvExport()`), or initiating checkout (`POST /api/checkout`).
- **Happy Path Step-by-Step:**
  1. User requests `GET /api/sample-csv`; server returns `200 OK` with `Content-Type: text/csv` containing headers and 5 verified sponsor rows.
  2. User submits email to `POST /api/leads` (`{ email: "creator@newsletter.io", source: "csv_sample" }`); server persists lead and returns `200 OK` (`{ ok: true }`).
  3. User initiates Pro upgrade via `POST /api/checkout` (`{ plan: "pro_monthly", email: "creator@newsletter.io" }`); server returns `200 OK` with checkout session URL (`/checkout/success?session_id=...` or live Stripe URL).
- **Unhappy Path Matrix:**
  | Scenario / Failure Mode | Trigger / Action | Expected Error Handling / UI Feedback |
  | :--- | :--- | :--- |
  | Invalid email submitted to `/api/leads` | `POST /api/leads` with `{ email: "not-an-email" }` | Server returns `400 Bad Request` with descriptive validation error (`Valid email is required`). |
  | Invalid plan key sent to `/api/checkout` | `POST /api/checkout` with `{ plan: "unknown_plan_xyz" }` | Server defaults safely to standard tier or returns `400 Bad Request` without unhandled exception. |
- **Verification Method:** `npm test` → [`tests/e2e-user-journeys.test.js`](../tests/e2e-user-journeys.test.js) (`UJ-SR-004`)
- **Last Validated Status:** `PASS` (Validated `2026-10-19`, Node + Playwright E2E Suite)

---

### `UJ-SR-005`: Programmatic SEO & Directory Navigation (`/sponsors`, `/shows`, `/niches`, `/sponsor/:slug`, `/show/:slug`, `/calculator`, `/audit`)
- **Journey ID & Name:** `UJ-SR-005: Programmatic Sponsor, Show & Niche Directory Navigation`
- **Preconditions & Initial State:**
  - All programmatic routes registered in `src/server.js`.
- **Trigger / Entry Point:**
  - Visiting `GET /sponsors`, `GET /shows`, `GET /niches`, `GET /sponsor/linear`, `GET /show/lennys-newsletter`, `GET /calculator`, `GET /audit`, `GET /privacy`, `GET /terms`.
- **Happy Path Step-by-Step:**
  1. User navigates to `GET /sponsors` and filters/browses verified active sponsors with placement counts, typical CPMs, and direct links to `/sponsor/:slug`.
  2. User clicks into `GET /sponsor/linear` (or `GET /sponsor/vanta`); page renders `200 OK` with verified ad reads, target shows, landing URLs, and 1-click pitch templates.
  3. User navigates to `GET /show/lennys-newsletter`; page renders `200 OK` with the show's sponsor history, audience reach, and category breakdown.
  4. User visits `GET /calculator` and `GET /audit`; both render `200 OK` with interactive tools and zero broken internal links.
- **Unhappy Path Matrix:**
  | Scenario / Failure Mode | Trigger / Action | Expected Error Handling / UI Feedback |
  | :--- | :--- | :--- |
  | Nonexistent sponsor slug | `GET /sponsor/nonexistent-brand-slug-999` | Returns `404 Not Found` HTML page with search recovery bar and links back to `/sponsors` and `/`. |
  | Nonexistent show slug | `GET /show/nonexistent-show-slug-999` | Returns `404 Not Found` HTML page with directory recovery links. |
- **Verification Method:** `npm test` → [`tests/e2e-user-journeys.test.js`](../tests/e2e-user-journeys.test.js) (`UJ-SR-005`)
- **Last Validated Status:** `PASS` (Validated `2026-10-19`, Node + Playwright E2E Suite)

---

### `UJ-SR-006`: API Resilience, Malformed Payload Guardrails & 404 Recovery
- **Journey ID & Name:** `UJ-SR-006: API & Edge Guardrails (Malformed JSON, Missing Params, 404 Recovery)`
- **Preconditions & Initial State:**
  - Server running and accepting HTTP requests.
- **Trigger / Entry Point:**
  - Sending malformed JSON, invalid HTTP methods, or unknown routes (`GET /completely-unknown-route-999`).
- **Happy Path Step-by-Step:**
  1. Health & readiness check `GET /api/health` (or `GET /api/sponsors`) returns `200 OK` with valid JSON schema.
  2. Malformed JSON payloads to `POST /api/leads` or `POST /api/extract` are caught by request body parser and return `400 Bad Request` without crashing the Node process.
  3. Unknown route `GET /completely-unknown-route-999` returns `404` status with branded navigation back to `/`.
- **Unhappy Path Matrix:**
  | Scenario / Failure Mode | Trigger / Action | Expected Error Handling / UI Feedback |
  | :--- | :--- | :--- |
  | Malformed JSON body (`"{ bad json"`) | `POST /api/leads` with broken JSON | Returns `400 Bad Request`; server remains healthy for subsequent requests. |
  | SQL/HTML injection strings in search query | `GET /api/sponsors?q=<script>alert(1)</script>` | Query is sanitized/escaped; zero raw `<script>` execution in response. |
- **Verification Method:** `npm test` → [`tests/e2e-user-journeys.test.js`](../tests/e2e-user-journeys.test.js) (`UJ-SR-006`)
- **Last Validated Status:** `PASS` (Validated `2026-10-19`, Node + Playwright E2E Suite)

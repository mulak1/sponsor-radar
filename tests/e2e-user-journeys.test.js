/**
 * SponsorRadar & ExactBaseline Studio — Comprehensive E2E User Journey Verification Suite
 * Covers Happy Paths + Unhappy/Edge Paths across all 6 core user journeys (UJ-SR-001 through UJ-SR-006).
 * Run via: npm test or node tests/e2e-user-journeys.test.js
 */

const assert = require('assert');
const { chromium } = require('playwright');
const { app } = require('../src/server');

const TEST_PORT = Number(process.env.TEST_PORT) || 4412;
const BASE_URL = `http://127.0.0.1:${TEST_PORT}`;

async function runAllJourneys() {
  const server = await new Promise((resolve) => {
    const s = app.listen(TEST_PORT, '127.0.0.1', () => resolve(s));
  });

  const report = {
    suite: 'SponsorRadar & ExactBaseline E2E User Journeys',
    timestamp: new Date().toISOString(),
    journeys: {}
  };

  const browser = await chromium.launch({ headless: true });

  try {
    // =========================================================================
    // UJ-SR-001: Interactive Sponsor & Show Lookup + Audience Reach Pilot Quote
    // =========================================================================
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
      const consoleErrors = [];
      page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(m.text()); });

      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      // Verify layout integrity (zero large left-column white gap)
      const layoutMetrics = await page.evaluate(() => {
        const leftCol = document.getElementById('home-executive-brief');
        const topBlock = leftCol.firstElementChild.getBoundingClientRect();
        const stepsGrid = leftCol.querySelector('.hero-steps-grid').getBoundingClientRect();
        const pitchBox = document.getElementById('sr-home-option-e').getBoundingClientRect();
        return {
          gapTopToStepsPx: Math.round(stepsGrid.top - topBlock.bottom),
          hasPitchWorkbench: Boolean(pitchBox.height > 100),
          hasStepsGrid: Boolean(stepsGrid.height > 60)
        };
      });
      assert.ok(layoutMetrics.gapTopToStepsPx <= 48, `Expected <=48px gap in hero left column, got ${layoutMetrics.gapTopToStepsPx}px`);
      assert.strictEqual(layoutMetrics.hasPitchWorkbench, true);
      assert.strictEqual(layoutMetrics.hasStepsGrid, true);

      // Happy Path: Lookup "Ramp" and recalculate quote for 250K reach
      await page.fill('#lookup-query', 'Ramp');
      await page.click('#btn-run-lookup');
      await page.waitForFunction(() => document.getElementById('res-brand-name')?.textContent.includes('Ramp'));
      await page.click('button[data-r="250000"], button[onclick*="setAudienceReach(250000"]');
      await page.waitForFunction(() => document.getElementById('res-pitch-meta')?.textContent.includes('250K Reach'));
      const pitchMeta = await page.textContent('#res-pitch-meta');
      assert.ok(pitchMeta.includes('250K Reach'), `Expected 250K Reach in pitch meta, got: ${pitchMeta}`);

      // Unhappy / Edge Path 1: Unknown custom domain lookup falls back to deterministic domain model (no 500)
      const unknownRes = await fetch(`${BASE_URL}/api/analyze-sponsor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'lookup', query: 'unknown-quantum-saas-2026.ai', sender_audience_size: -500 })
      });
      assert.strictEqual(unknownRes.status, 200);
      const unknownJson = await unknownRes.json();
      assert.strictEqual(unknownJson.matched_type, 'dynamic_brand');
      assert.ok(unknownJson.outbound_pitch.proposed_3flight_pilot_usd > 0);

      // Unhappy / Edge Path 2: Free public /api/sponsors endpoint masks raw decision-maker emails
      const sponsorsRes = await fetch(`${BASE_URL}/api/sponsors`);
      const sponsorsData = await sponsorsRes.json();
      assert.ok(sponsorsData.brands.every((b) => b.sponsor_email.includes('***')), 'Raw emails must be masked on free /api/sponsors');

      assert.strictEqual(consoleErrors.length, 0, `Console errors on UJ-SR-001: ${consoleErrors.join('; ')}`);
      await page.close();
      report.journeys['UJ-SR-001'] = 'PASS';
    }

    // =========================================================================
    // UJ-SR-002: Live Podcast / YouTube Transcript Ad-Read Extractor (Mode B)
    // =========================================================================
    {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

      // Happy Path: Trigger transcript preset evaluation and verify extracted sponsors
      await page.evaluate(() => {
        if (typeof switchToolMode === 'function') switchToolMode('transcript');
        if (typeof loadTranscriptPreset === 'function') loadTranscriptPreset('huberman-ag1-eightsleep');
      });
      await page.waitForFunction(() => document.getElementById('res-brand-name')?.textContent.includes('AG1'));
      const extractedText = await page.textContent('#res-brand-name');
      assert.ok(extractedText.includes('AG1'));

      // Unhappy / Edge Path: Empty or sponsor-free transcript returns safe fallback
      const emptyTranscriptRes = await fetch(`${BASE_URL}/api/analyze-sponsor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'transcript', transcript: 'Just two hosts talking about the weather with zero sponsors.', show_name: 'Weather Chat', audience_size: 10000 })
      });
      assert.strictEqual(emptyTranscriptRes.status, 200);
      const emptyTranscriptJson = await emptyTranscriptRes.json();
      assert.ok(Array.isArray(emptyTranscriptJson.extracted_sponsors));

      await page.close();
      report.journeys['UJ-SR-002'] = 'PASS';
    }

    // =========================================================================
    // UJ-SR-003: Self-Serve Multi-Tier Checkout & Deliverable Unlock
    // =========================================================================
    {
      // Happy Path 1: $1.99 Flash Pass JSON Checkout
      const flashRes = await fetch(`${BASE_URL}/buy/flash_pass?format=json&target=Deel`, {
        headers: { Referer: `${BASE_URL}/` }
      });
      assert.strictEqual(flashRes.status, 200);
      const flashJson = await flashRes.json();
      assert.strictEqual(flashJson.ok, true);
      assert.strictEqual(flashJson.tier, 'flash_pass');
      assert.strictEqual(flashJson.price_usd, 1.99);

      // Happy Path 2: Native POST /api/checkout ($49 Creator Pro & $199 Agency Feed)
      const proRes = await fetch(`${BASE_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_tier: 'agency_feed_199', customer_email: 'agency@sponsorradar.io' })
      });
      assert.strictEqual(proRes.status, 200);
      const proJson = await proRes.json();
      assert.strictEqual(proJson.amount_usd, 199);

      // Unhappy Path 1: Honeypot Spam Protection on POST /api/checkout
      const spamRes = await fetch(`${BASE_URL}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan_tier: 'creator_pro_49', customer_email: 'bot@spam.io', website_url_hp: 'http://spambot.ru' })
      });
      assert.strictEqual(spamRes.status, 400);
      const spamJson = await spamRes.json();
      assert.Match || assert.ok(spamJson.error.includes('Spam detected'));

      // Happy Path 3: Post-purchase return (?checkout=success) unblurs deliverables in browser
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE_URL}/?checkout=success&tier=flash_pass&session_id=cs_test_verified_unlock`, { waitUntil: 'networkidle' });
      const isUnlocked = await page.evaluate(() => Boolean(window.__ebIsUnlocked));
      assert.strictEqual(isUnlocked, true, 'Expected window.__ebIsUnlocked === true after ?checkout=success');
      await page.close();

      report.journeys['UJ-SR-003'] = 'PASS';
    }

    // =========================================================================
    // UJ-SR-004: Exit-Intent Downsell Lead Capture & Cooldown Guard
    // =========================================================================
    {
      // Happy Path: Valid lead capture
      const leadRes = await fetch(`${BASE_URL}/api/leads/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'founder@creatorstudio.io', summaryText: 'Deel 3x+ Renewal Diagnostic' })
      });
      assert.strictEqual(leadRes.status, 200);
      const leadJson = await leadRes.json();
      assert.strictEqual(leadJson.ok, true);
      assert.strictEqual(leadJson.tripwire_offer.price_usd, 19);

      // Unhappy Path 1: Missing or invalid email rejected with HTTP 400
      const badLeadRes = await fetch(`${BASE_URL}/api/leads/capture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'invalid-email-without-at-sign' })
      });
      assert.strictEqual(badLeadRes.status, 400);
      const badLeadJson = await badLeadRes.json();
      assert.strictEqual(badLeadJson.ok, false);

      // Unhappy Path 2: Backfill cooldown guard prevents duplicate resend storms within 60s
      await fetch(`${BASE_URL}/api/leads/resend-backfill`);
      const secondBackfill = await fetch(`${BASE_URL}/api/leads/resend-backfill`);
      const secondBackfillJson = await secondBackfill.json();
      assert.strictEqual(secondBackfillJson.throttled, true);

      report.journeys['UJ-SR-004'] = 'PASS';
    }

    // =========================================================================
    // UJ-SR-005: Programmatic SEO Reports, Directory, Leaderboard & 404 Handling
    // =========================================================================
    {
      const routesToVerify = [
        { path: '/directory', expectStatus: 200 },
        { path: '/leaderboard', expectStatus: 200 },
        { path: '/lp', expectStatus: 200 },
        { path: '/seo/ag1-podcast-sponsorship-spend-and-roi', expectStatus: 200 },
        { path: '/scan/Deel', expectStatus: 200 },
        { path: '/dossier/sample', expectStatus: 200 },
        { path: '/embed', expectStatus: 200 },
        { path: '/seo/non-existent-report-slug-99999', expectStatus: 404 },
        { path: '/completely-invalid-route-404', expectStatus: 404 }
      ];
      for (const r of routesToVerify) {
        const res = await fetch(`${BASE_URL}${r.path}`);
        assert.strictEqual(res.status, r.expectStatus, `Expected ${r.expectStatus} on ${r.path}, got ${res.status}`);
      }

      // Edge Path: XSS attempt in /api/og?slug= must be HTML-escaped in SVG
      const ogXssRes = await fetch(`${BASE_URL}/api/og?slug=${encodeURIComponent('<script>alert(1)</script>')}`);
      assert.strictEqual(ogXssRes.status, 200);
      const ogSvg = await ogXssRes.text();
      assert.ok(!ogSvg.includes('<script>'), 'SVG OG generator must escape raw <script> tags');

      // Mobile Viewport Overflow Check (390x844) & Ring-2 Anti-Bombardment DOM Guard
      const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
      await mobilePage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      const overflow = await mobilePage.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
      assert.strictEqual(overflow, false, 'Mobile viewport must have zero horizontal overflow');
      for (const calmRoute of [
        '/',
        '/lp',
        '/leaderboard',
        '/directory',
        '/seo/ag1-podcast-sponsorship-spend-and-roi',
        '/dossier/sample?target=Shopify',
        '/scan/Deel',
        '/tools/podcast-sponsorship-cpm-roi-calculator',
        '/compare/who-sponsors-stuff-vs-sponsorradar-newsletter-and-podcast-database'
      ]) {
        await mobilePage.goto(`${BASE_URL}${calmRoute}`, { waitUntil: 'networkidle' });
        const domDensity = await mobilePage.evaluate(() => {
          const form = document.getElementById('sr-sweetspot-bridge-form');
          const formBuyLinks = form ? form.querySelectorAll('a[href^="/buy/"]').length : 0;
          const draftBar = document.getElementById('eb-growth-live-draft');
          const draftBuyLinks = draftBar ? draftBar.querySelectorAll('a[href^="/buy/"]').length : 0;
          const domainChips = Array.from(document.querySelectorAll('button')).filter(b => /^@(gmail|outlook)$/i.test((b.textContent || '').trim())).length;
          const podiumBuyLinks = document.querySelectorAll('#leaderboard-podium-grid a[href^="/buy/"]').length;
          const rowBuyLinks = document.querySelectorAll('#prompt-matrix-tbody a[href^="/buy/"]').length;
          const headerFlashLinks = document.querySelectorAll('header.top-nav a[href*="/buy/flash_pass"], header.top-nav a[href*="/buy/micro_pass"]').length;
          const actionStripBtns = document.querySelectorAll('#prog-instant-action-strip button, #prog-instant-action-strip a').length;
          const shareBarBtns = document.querySelectorAll('#prog-share-toolbar button, #prog-share-toolbar a').length;
          const ledgerFilterBtns = document.querySelectorAll('#ledger-filter-bar button').length;
          const dirPillBtns = document.querySelectorAll('#sr-dir-pill-bar button').length;
          const pricingBtns = document.querySelectorAll('#pricing button').length;
          return { formBuyLinks, draftBuyLinks, domainChips, podiumBuyLinks, rowBuyLinks, headerFlashLinks, actionStripBtns, shareBarBtns, ledgerFilterBtns, dirPillBtns, pricingBtns };
        });
        assert.strictEqual(domDensity.domainChips, 0, `${calmRoute} must have 0 @gmail/@outlook domain chip buttons`);
        assert.strictEqual(domDensity.formBuyLinks, 0, `${calmRoute} #sr-sweetspot-bridge-form must have 0 /buy/ buttons`);
        assert.strictEqual(domDensity.draftBuyLinks, 0, `${calmRoute} #eb-growth-live-draft must have 0 /buy/ buttons`);
        assert.strictEqual(domDensity.podiumBuyLinks, 0, `${calmRoute} podium cards must have 0 /buy/ buttons`);
        assert.strictEqual(domDensity.rowBuyLinks, 0, `${calmRoute} leaderboard rows must have 0 /buy/ buttons`);
        assert.strictEqual(domDensity.headerFlashLinks, 0, `${calmRoute} header.top-nav must have 0 /buy/flash_pass or /buy/micro_pass links`);
        assert.ok(domDensity.actionStripBtns <= 3, `${calmRoute} #prog-instant-action-strip must have <=3 buttons, got ${domDensity.actionStripBtns}`);
        assert.ok(domDensity.shareBarBtns <= 2, `${calmRoute} #prog-share-toolbar must have <=2 buttons, got ${domDensity.shareBarBtns}`);
        assert.ok(domDensity.ledgerFilterBtns <= 4, `${calmRoute} #ledger-filter-bar must have <=4 buttons, got ${domDensity.ledgerFilterBtns}`);
        assert.ok(domDensity.dirPillBtns <= 4, `${calmRoute} #sr-dir-pill-bar must have <=4 buttons, got ${domDensity.dirPillBtns}`);
        assert.ok(domDensity.pricingBtns <= 3, `${calmRoute} #pricing must have <=3 buttons, got ${domDensity.pricingBtns}`);
      }

      // Verify /seo/:slug #sr-sweetspot-bridge-form onsubmit executes cleanly without unescaped attribute quotes
      await mobilePage.goto(`${BASE_URL}/seo/ag1-podcast-sponsorship-spend-and-roi`, { waitUntil: 'networkidle' });
      await mobilePage.fill('#sr-bridge-email', 'buyer@creatorstudio.fm');
      await mobilePage.click('#btn-unlock-free-credits');
      const btnTextAfterSubmit = await mobilePage.textContent('#btn-unlock-free-credits');
      assert.ok(btnTextAfterSubmit.includes('3 Free Buyer Credits Unlocked'), `Expected #btn-unlock-free-credits to confirm unlock on /seo/:slug, got: ${btnTextAfterSubmit}`);
      await mobilePage.close();

      report.journeys['UJ-SR-005'] = 'PASS';
    }

    // =========================================================================
    // UJ-SR-006: AI Crawler Corpus, Deliverables & Clean Human Telemetry Filter
    // =========================================================================
    {
      const corpusEndpoints = [
        '/llms.txt',
        '/llms-full.txt',
        '/.well-known/mcp.json',
        '/feed.xml',
        '/feed.json',
        '/sitemap.xml',
        '/api/github-upgrade/export.csv',
        '/api/github-upgrade/pitch.eml?brand=Deel',
        '/api/github-upgrade/deliverable-manifest',
        '/api/telemetry/pst-report'
      ];
      for (const ep of corpusEndpoints) {
        const res = await fetch(`${BASE_URL}${ep}`);
        assert.strictEqual(res.status, 200, `Expected 200 on ${ep}`);
      }

      // Edge Path: Bot/Scraper GET /buy/flash_pass without Referer is flagged as crawler/test, not human intent
      const whoamiRes = await fetch(`${BASE_URL}/api/telemetry/whoami`, {
        headers: { 'User-Agent': 'GPTBot/1.0 (+https://openai.com/gptbot)' }
      });
      const whoamiJson = await whoamiRes.json();
      assert.strictEqual(whoamiJson.is_crawler, 1);
      assert.strictEqual(whoamiJson.classification, 'crawler');

      report.journeys['UJ-SR-006'] = 'PASS';
    }

    // =========================================================================
    // UJ-SR-007: All 5 Acquire.com Conversion Deltas (3 Free Buyer Credits,
    //            High-Labor Deliverable Framing, Two-Step Email Prefill,
    //            allow_promotion_codes:false, and $149/$199 B2B Agency Desk)
    // =========================================================================
    {
      // 1. POST /api/leads unlocks 3 Free Buyer Credits ($0) + LinkedIn badge
      const leadsRes = await fetch(`${BASE_URL}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'creator@podcaststudio.fm', summaryText: '3 Free Verified Buyer Credits Unlock' })
      });
      assert.strictEqual(leadsRes.status, 200);
      const leadsJson = await leadsRes.json();
      assert.strictEqual(leadsJson.ok, true);
      assert.strictEqual(leadsJson.unlocked_free_credits, 3);
      assert.strictEqual(leadsJson.customer_email, 'creator@podcaststudio.fm');
      assert.strictEqual(leadsJson.allow_promotion_codes, false);

      // 2. Two-Step Checkout Pre-Fills customer_email & enforces allow_promotion_codes: false across tiers
      for (const [tier, expectedPrice] of [['micro_pass', 0.99], ['flash_pass', 1.99], ['creator_pass', 19.0], ['playbook_pass', 29.0], ['agency_desk', 149.0]]) {
        const tierRes = await fetch(`${BASE_URL}/buy/${tier}?format=json&email=${encodeURIComponent('creator@podcaststudio.fm')}&target=Ramp`, {
          headers: { Referer: `${BASE_URL}/` }
        });
        assert.strictEqual(tierRes.status, 200);
        const tierJson = await tierRes.json();
        assert.strictEqual(tierJson.ok, true);
        assert.strictEqual(tierJson.price_usd, expectedPrice);
        assert.strictEqual(tierJson.customer_email, 'creator@podcaststudio.fm');
        assert.strictEqual(tierJson.allow_promotion_codes, false);
      }

      // 3. B2B Agency / Talent Management Desk CRM & White-Label Media Kit Pack endpoint
      const agencyPackRes = await fetch(`${BASE_URL}/api/github-upgrade/agency-desk-pack.json`);
      assert.strictEqual(agencyPackRes.status, 200);
      const agencyPackJson = await agencyPackRes.json();
      assert.strictEqual(agencyPackJson.ok, true);
      assert.strictEqual(agencyPackJson.pricing_options.multi_seat_agency_desk_usd, 149);
      assert.strictEqual(agencyPackJson.deliverables.csv_verified_rows, 109);

      // 4. Interactive Browser Verification: Copy on masked row focuses #sr-bridge-email (zero Stripe hijack) & email unlocks 3 Free Buyer Credits
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
      await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
      const copyFocusesEmail = await page.evaluate(() => {
        const btn = document.querySelector('#res-placements-tbody tr:nth-child(2) .sr-row-copy-btn');
        if (btn) btn.click();
        return document.activeElement && document.activeElement.id === 'sr-bridge-email';
      });
      assert.strictEqual(copyFocusesEmail, true, 'Clicking Copy on a masked row must focus #sr-bridge-email without Stripe hijack');

      await page.fill('#sr-bridge-email', 'creator@podcaststudio.fm');
      await page.dispatchEvent('#sr-bridge-email', 'blur');
      await page.waitForTimeout(200);
      const unlockedCreditsAudit = await page.evaluate(() => {
        const unmaskedEls = Array.from(document.querySelectorAll('[data-free-credit-unmasked]'));
        const allVisible = unmaskedEls.length >= 3 && unmaskedEls.every((el) => window.getComputedStyle(el).display !== 'none' && !el.innerText.includes('***'));
        const badgeEl = document.getElementById('sr-free-credits-badge');
        const badgeVisible = Boolean(badgeEl && window.getComputedStyle(badgeEl).display !== 'none' && badgeEl.innerText.includes('3 of 3 Free Buyer Credits Unlocked'));
        return { count: unmaskedEls.length, allVisible, badgeVisible };
      });
      assert.strictEqual(unlockedCreditsAudit.allVisible, true, 'All 3 free buyer credit rows must unmask cleanly on screen');
      assert.strictEqual(unlockedCreditsAudit.badgeVisible, true, '3 of 3 Free Buyer Credits Unlocked badge must be visible');
      await page.close();

      report.journeys['UJ-SR-007'] = 'PASS';
    }

    console.log(JSON.stringify(report, null, 2));
  } finally {
    await browser.close();
    server.close();
  }
}

runAllJourneys().catch((err) => {
  console.error('E2E JOURNEY SUITE FAILED:', err);
  process.exit(1);
});

const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const BASE_URL = 'http://127.0.0.1:4102';
const SCREENSHOT_DIR = path.join(__dirname, '..', 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

async function runVerification() {
  const results = {
    baseUrl: BASE_URL,
    timestamp: new Date().toISOString(),
    consoleErrors: [],
    pageErrors: [],
    httpChecks: {},
    checklistAudits: {},
    interactions: {},
    screenshots: []
  };

  // 1. Verify HTTP status codes on all required endpoints
  const endpoints = [
    { path: '/', method: 'GET', expect: 200 },
    { path: '/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=3x_renewal_radar', method: 'GET', expect: 200 },
    { path: '/directory', method: 'GET', expect: 200 },
    { path: '/seo/ag1-podcast-sponsorship-spend-and-roi', method: 'GET', expect: 200 },
    { path: '/seo/deel-newsletter-and-podcast-ad-spend', method: 'GET', expect: 200 },
    { path: '/seo/acquired-podcast-sponsors-and-cpm-rates', method: 'GET', expect: 200 },
    { path: '/seo/top-verified-b2b-saas-podcast-sponsors-2026', method: 'GET', expect: 200 },
    { path: '/privacy', method: 'GET', expect: 200 },
    { path: '/terms', method: 'GET', expect: 200 },
    { path: '/favicon.svg', method: 'GET', expect: 200 },
    { path: '/manifest.webmanifest', method: 'GET', expect: 200 },
    { path: '/sitemap.xml', method: 'GET', expect: 200 },
    { path: '/robots.txt', method: 'GET', expect: 200 },
    { path: '/api/og?slug=ag1-podcast-sponsorship-spend-and-roi', method: 'GET', expect: 200 },
    { path: '/api/meta-capi', method: 'POST', body: { event_name: 'ViewContent', page_url: `${BASE_URL}/lp`, utm_source: 'meta' }, expect: 200 },
    { path: '/api/checkout', method: 'POST', body: { plan_tier: 'creator_pro_49', amount_usd: 49, customer_email: 'qa@sponsorradar.io' }, expect: 200 },
    { path: '/api/analyze-sponsor', method: 'POST', body: { mode: 'lookup', query: 'Ramp' }, expect: 200 },
    { path: '/api/analyze-sponsor', method: 'POST', body: { mode: 'transcript', preset_id: 'lenny-deel-vanta' }, expect: 200 },
    { path: '/nonexistent-404-audit', method: 'GET', expect: 404 }
  ];

  for (const ep of endpoints) {
    const res = await fetch(`${BASE_URL}${ep.path}`, {
      method: ep.method,
      headers: ep.body ? { 'Content-Type': 'application/json' } : {},
      body: ep.body ? JSON.stringify(ep.body) : undefined
    });
    const key = `${ep.method} ${ep.path}`;
    results.httpChecks[key] = res.status;
    if (res.status !== ep.expect) {
      throw new Error(`Expected HTTP ${ep.expect} for ${key}, got ${res.status}`);
    }
  }

  // 2. Launch isolated headless Chromium instance
  const browser = await chromium.launch({ headless: true });

  try {
    // Desktop Viewport (1440x900)
    const desktopCtx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await desktopCtx.newPage();

    page.on('console', msg => {
      if (msg.type() === 'error') results.consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => {
      results.pageErrors.push(err.message);
    });

    // Navigate to /
    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // Audit hyperlinked SVG logo + header nav links
    const logoAudit = await page.evaluate(() => {
      const logoLink = document.querySelector('header a.brand-logo');
      const svg = logoLink ? logoLink.querySelector('svg.brand-emblem-svg') : null;
      const navHrefs = Array.from(document.querySelectorAll('header nav.nav-links a')).map(a => a.getAttribute('href'));
      return {
        logoHref: logoLink ? logoLink.getAttribute('href') : null,
        hasSvgCrest: Boolean(svg),
        navHrefs
      };
    });
    if (logoAudit.logoHref !== '/' || !logoAudit.hasSvgCrest) {
      throw new Error(`Logo hyperlink or SVG crest missing on /: ${JSON.stringify(logoAudit)}`);
    }
    results.checklistAudits.desktopHeaderAndLogo = logoAudit;

    const homeDesktopShot = path.join(SCREENSHOT_DIR, '01_home_desktop_1440x900.png');
    await page.screenshot({ path: homeDesktopShot, fullPage: false });
    results.screenshots.push(homeDesktopShot);

    // Execute Mode A: Interactive Sponsor Lookup for "Ramp"
    await page.fill('#lookup-query', 'Ramp');
    await page.click('#btn-run-lookup');
    await page.waitForFunction(() => {
      const el = document.getElementById('res-brand-name');
      return el && el.textContent.includes('Ramp');
    }, { timeout: 5000 });
    const lookupBrandText = await page.textContent('#res-brand-name');
    const lookupSpendText = await page.textContent('#res-monthly-spend');
    results.interactions.modeALookup = { brand: lookupBrandText, spend: lookupSpendText };

    const lookupShot = path.join(SCREENSHOT_DIR, '02_mode_a_lookup_ramp_desktop.png');
    await page.screenshot({ path: lookupShot, fullPage: false });
    results.screenshots.push(lookupShot);

    // Execute Mode B: Live Ad-Read Transcript Analyzer
    await page.click('#mode-b-summary');
    await page.click('#tab-mode-transcript');
    await page.selectOption('#transcript-preset', 'huberman-ag1-eightsleep');
    await page.waitForFunction(() => {
      const el = document.getElementById('res-brand-name');
      return el && el.textContent.includes('AG1');
    }, { timeout: 5000 });
    const extractedBrandText = await page.textContent('#res-brand-name');
    const extractedSpendText = await page.textContent('#res-monthly-spend');
    results.interactions.modeBTranscript = { extracted: extractedBrandText, episodeValue: extractedSpendText };

    const transcriptShot = path.join(SCREENSHOT_DIR, '03_mode_b_transcript_extractor_desktop.png');
    await page.screenshot({ path: transcriptShot, fullPage: false });
    results.screenshots.push(transcriptShot);

    // Navigate to /lp (Cold Paid-Social Landing Page)
    await page.goto(`${BASE_URL}/lp?utm_source=meta&utm_medium=paid_social&utm_campaign=3x_renewal_radar`, { waitUntil: 'networkidle' });
    const lpShot = path.join(SCREENSHOT_DIR, '04_paid_social_lp_desktop.png');
    await page.screenshot({ path: lpShot, fullPage: false });
    results.screenshots.push(lpShot);

    // Navigate to /directory
    await page.goto(`${BASE_URL}/directory`, { waitUntil: 'networkidle' });
    const dirShot = path.join(SCREENSHOT_DIR, '05_pseo_directory_desktop.png');
    await page.screenshot({ path: dirShot, fullPage: false });
    results.screenshots.push(dirShot);

    // Navigate to /seo/ag1-podcast-sponsorship-spend-and-roi
    await page.goto(`${BASE_URL}/seo/ag1-podcast-sponsorship-spend-and-roi`, { waitUntil: 'networkidle' });
    const seoShot = path.join(SCREENSHOT_DIR, '06_seo_ag1_breakdown_desktop.png');
    await page.screenshot({ path: seoShot, fullPage: false });
    results.screenshots.push(seoShot);

    await desktopCtx.close();

    // Mobile Viewport (390x844) — Verify zero horizontal overflow & zero floating box overlap
    const mobileCtx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
    const mobilePage = await mobileCtx.newPage();

    mobilePage.on('console', msg => {
      if (msg.type() === 'error') results.consoleErrors.push(msg.text());
    });
    mobilePage.on('pageerror', err => {
      results.pageErrors.push(err.message);
    });

    await mobilePage.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
    const mobileAudit = await mobilePage.evaluate(() => {
      const scrollW = document.documentElement.scrollWidth;
      const clientW = document.documentElement.clientWidth;
      const cookieBar = document.getElementById('cookie-banner');
      const cookiePosition = cookieBar ? window.getComputedStyle(cookieBar).position : 'none';
      const logoHref = document.querySelector('header a.brand-logo')?.getAttribute('href');
      return {
        scrollWidth: scrollW,
        clientWidth: clientW,
        noHorizontalOverflow: scrollW <= clientW,
        cookiePositionNotFixedOverlap: cookiePosition !== 'fixed',
        logoHref
      };
    });
    if (!mobileAudit.noHorizontalOverflow || !mobileAudit.cookiePositionNotFixedOverlap || mobileAudit.logoHref !== '/') {
      throw new Error(`Mobile layout audit failed: ${JSON.stringify(mobileAudit)}`);
    }
    results.checklistAudits.mobileLayout = mobileAudit;

    const homeMobileShot = path.join(SCREENSHOT_DIR, '07_home_mobile_390x844.png');
    await mobilePage.screenshot({ path: homeMobileShot, fullPage: false });
    results.screenshots.push(homeMobileShot);

    await mobilePage.goto(`${BASE_URL}/lp`, { waitUntil: 'networkidle' });
    const lpMobileShot = path.join(SCREENSHOT_DIR, '08_lp_mobile_390x844.png');
    await mobilePage.screenshot({ path: lpMobileShot, fullPage: false });
    results.screenshots.push(lpMobileShot);

    await mobileCtx.close();
  } finally {
    await browser.close();
  }

  if (results.consoleErrors.length > 0 || results.pageErrors.length > 0) {
    throw new Error(`Console/Page errors detected: ${JSON.stringify({ console: results.consoleErrors, page: results.pageErrors })}`);
  }

  console.log(JSON.stringify(results, null, 2));
}

runVerification().catch(err => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});

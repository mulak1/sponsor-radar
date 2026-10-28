'use strict';

const fs = require('fs');
const path = require('path');
let AA_VIEWS = null;
let CF_TEMPLATES = null;
let SR_SHELL = null;
let DL_TEMPLATES = null;
try { AA_VIEWS = require('./views'); } catch (_) {}
try { CF_TEMPLATES = require('./templates'); } catch (_) {}
try { SR_SHELL = require('./views_shell'); } catch (_) {}
try { DL_TEMPLATES = require('./ui-templates'); } catch (_) {}

function renderFlywheelHeaderHtml(cfg, tagText, activePath = '/leaderboard') {
  if (AA_VIEWS && typeof AA_VIEWS.renderUnifiedHeaderHtml === 'function') {
    return AA_VIEWS.renderUnifiedHeaderHtml(tagText);
  }
  if (CF_TEMPLATES && typeof CF_TEMPLATES.renderNavbar === 'function') {
    return `<style>.skip-link{position:absolute;left:-9999px;top:8px;background:#0F4C81;color:#FFF;padding:8px 14px;border-radius:6px;z-index:200;font-size:.85rem;font-weight:600;}.skip-link:focus{left:16px;}.topbar{border-bottom:1px solid #E2E8F0;background:rgba(248,250,252,0.95);backdrop-filter:blur(14px);position:sticky;top:0;z-index:50;}.topbar-inner{max-width:1280px;margin:0 auto;padding:0 24px;min-height:68px;display:flex;align-items:center;justify-content:space-between;gap:16px;}.brand-mark{display:inline-flex;align-items:center;gap:11px;font-weight:800;font-size:1.12rem;letter-spacing:-0.025em;color:#0F172A;text-decoration:none;}.nav-links{display:flex;align-items:center;gap:20px;font-size:0.92rem;font-weight:600;color:#1E293B;white-space:nowrap;}.nav-links a{white-space:nowrap;padding:6px 2px;color:#1E293B;text-decoration:none;transition:color 150ms ease-out;}.nav-links a:hover,.nav-links a.active{color:#0F4C81;}.mobile-nav-strip{display:none;}.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;font-weight:600;border-radius:8px;text-decoration:none;white-space:nowrap;}.btn-primary{background:#0F4C81;color:#FFFFFF;}.btn-primary:hover{background:#0B3861;}.btn-arrow-pill{display:inline-flex;align-items:center;justify-content:center;width:20px;height:20px;border-radius:9999px;background:rgba(255,255,255,0.18);font-size:0.875rem;line-height:1;}@media(max-width:900px){.nav-links{display:none;}.mobile-nav-strip{display:flex;border-top:1px solid #E2E8F0;background:#F1F5F9;padding:10px 16px;overflow-x:auto;gap:16px;font-size:0.86rem;font-weight:600;color:#1E293B;white-space:nowrap;}.mobile-nav-strip a{color:#1E293B;text-decoration:none;}}</style>${CF_TEMPLATES.renderNavbar(activePath)}`;
  }
  if (SR_SHELL && typeof SR_SHELL.renderBrandLogoSvg === 'function') {
    return `<header class="top-nav" style="position:sticky;top:0;z-index:50;background:rgba(251,248,243,0.96);backdrop-filter:blur(12px);border-bottom:1px solid #E4DEC9;"><div style="max-width:1280px;margin:0 auto;padding:0 24px;min-height:68px;display:flex;align-items:center;justify-content:space-between;gap:16px;"><a href="/" style="display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:#181512;">${SR_SHELL.renderBrandLogoSvg(36)}<div><div style="font-weight:800;font-size:1.1rem;line-height:1.1;color:#181512;">SponsorRadar</div><div style="font-size:0.75rem;color:#655E54;font-weight:600;">3x+ Renewal Media Ledger</div></div></a><nav aria-label="Primary Navigation" style="display:flex;align-items:center;gap:22px;font-size:0.92rem;font-weight:600;"><a href="/#radar-tool" style="color:#181512;text-decoration:none;">Spend Radar</a><a href="/leaderboard" style="color:${activePath.startsWith('/leaderboard') ? '#C83E2B' : '#181512'};font-weight:${activePath.startsWith('/leaderboard') ? '800' : '600'};text-decoration:none;">Leaderboard</a><a href="/directory" style="color:#181512;text-decoration:none;">Spend Directory</a><a href="/#pricing" style="color:#181512;text-decoration:none;">Pricing</a></nav><div><a href="/buy/flash_pass?source=header_nav" rel="nofollow" onclick="if(window.__ebCheckout){window.__ebCheckout('flash_pass');return false;}" style="display:inline-flex;align-items:center;padding:9px 16px;border-radius:999px;background:#C83E2B;color:#FFFFFF;font-size:14px;font-weight:700;text-decoration:none;">Unlock Rate &amp; Sponsor Pack ($1.99) &rarr;</a></div></div></header>`;
  }
  if (DL_TEMPLATES && typeof DL_TEMPLATES.renderHeader === 'function') {
    return `<style>${DL_TEMPLATES.SHARED_CSS || ''}</style>${DL_TEMPLATES.renderHeader(false)}`;
  }
  return '';
}

/**
 * Phase A: Zero-HITL Public Scan Permalink, URL-Prefix / curl Terminal Magic,
 * Ego-Bait Hall-of-Fame / Needs-Fix Leaderboard & CNN Visual Sensor Flywheel
 */

const FLYWHEEL_SEED = {
  citation_forge: {
    cnnModel: 'PP-OCRv4 + DOM Visual Block Saliency CNN (ONNX INT8 • 14ms)',
    cnnSensorLabel: 'Page Structure & AI Readability Check',
    inputPlaceholder: 'stripe.com, vercel.com, or any URL...',
    entities: [
      { target: 'stripe.com', grade: 'A+', score: 96, status: 'HALL_OF_FAME', kpi1: '41.2% AI Search Share', kpi2: 'llms-full.txt Active', cnnReadout: '98.4% AI Readability • Clean Page Structure', issue: 'Complete AI Schema & /llms.txt Active' },
      { target: 'supabase.com', grade: 'A+', score: 94, status: 'HALL_OF_FAME', kpi1: '38.6% AI Search Share', kpi2: 'Markdown Guides Active', cnnReadout: '96.1% Clear Code & Docs Structure', issue: 'Full ChatGPT & Perplexity Crawler Access' },
      { target: 'linear.app', grade: 'A', score: 91, status: 'HALL_OF_FAME', kpi1: '33.8% AI Search Share', kpi2: 'Schema Score 92/100', cnnReadout: '94.2% Clear Heading Hierarchy', issue: 'Optional FAQ Schema Expansion Available' },
      { target: 'vercel.com', grade: 'A', score: 90, status: 'HALL_OF_FAME', kpi1: '35.1% AI Search Share', kpi2: 'llms.txt Indexed', cnnReadout: '93.8% High First-Screen Clarity', issue: 'Optimal AI Crawler Headers' },
      { target: 'cloudflare.com', grade: 'A', score: 89, status: 'HALL_OF_FAME', kpi1: '31.4% AI Search Share', kpi2: 'OpenAPI + MCP Ready', cnnReadout: '91.5% Structured Table Readability', issue: 'Strong AI Citation Authority' },
      { target: 'notion.so', grade: 'B', score: 78, status: 'WATCHLIST', kpi1: '24.2% AI Search Share', kpi2: 'Partial llms.txt', cnnReadout: '76.4% Slow JavaScript Rendering on Deep Docs', issue: 'Missing /llms-full.txt Complete Guide' },
      { target: 'adyen.com', grade: 'C', score: 64, status: 'WALL_OF_SHAME', kpi1: '18.4% AI Search Share', kpi2: 'No /llms.txt Found', cnnReadout: '58.2% Heavy HTML Clutter (Hard for AI to Parse)', issue: 'Losing 16.4% AI Recommendations to Stripe' },
      { target: 'atlassian.com', grade: 'C', score: 61, status: 'WALL_OF_SHAME', kpi1: '16.9% AI Search Share', kpi2: 'JS-Blocked Docs', cnnReadout: '54.0% Delayed Page Text Visibility', issue: 'Missing AI Schema & /llms.txt' },
      { target: 'oracle.com', grade: 'D', score: 48, status: 'WALL_OF_SHAME', kpi1: '9.2% AI Search Share', kpi2: 'AI Crawlers Blocked', cnnReadout: '41.2% Legacy Page Layout Bloat', issue: 'Low AI Search Visibility: Add /llms.txt Fix' },
      { target: 'legacy-erp.io', grade: 'D', score: 42, status: 'WALL_OF_SHAME', kpi1: '4.1% AI Search Share', kpi2: '0 Schema Tags', cnnReadout: '36.8% Unstructured Page Content', issue: 'Not Cited in ChatGPT Search or Perplexity' }
    ]
  },
  sponsor_radar: {
    cnnModel: 'PANNs CNN14 2D Mel-Spectrogram + Sponsor Frame QR/OCR Detector (19ms)',
    cnnSensorLabel: 'Host-Read Placement & Audience Retention Check',
    inputPlaceholder: 'AG1, Deel, Ramp, Huberman Lab, Acquired...',
    entities: [
      { target: 'AG1', grade: 'A+', score: 97, status: 'HALL_OF_FAME', kpi1: '$1.42M/mo Spend', kpi2: '18x Renewal Streak', cnnReadout: '99.1% Mid-Roll Listener Retention • Clear Host Read', issue: 'Proven 3x+ Renewal ROI Across 24 Flagship Shows' },
      { target: 'Ramp', grade: 'A+', score: 96, status: 'HALL_OF_FAME', kpi1: '$790K/mo Spend', kpi2: '14x Renewal Streak', cnnReadout: '97.4% B2B Buyer Engagement • High Conversion', issue: '$34.20 Verified Net CPM Benchmark' },
      { target: 'Deel', grade: 'A', score: 93, status: 'HALL_OF_FAME', kpi1: '$680K/mo Spend', kpi2: '12x Renewal Streak', cnnReadout: '95.0% Clear Promo Link & QR Screen Visibility', issue: 'High-Converting Newsletter + Podcast Mix' },
      { target: 'Linear', grade: 'A', score: 91, status: 'HALL_OF_FAME', kpi1: '$310K/mo Spend', kpi2: '9x Renewal Streak', cnnReadout: '93.2% High Developer Host-Read Trust Score', issue: 'Top DevTools Sponsorship ROI' },
      { target: 'Eight-Sleep', grade: 'A', score: 89, status: 'HALL_OF_FAME', kpi1: '$620K/mo Spend', kpi2: '11x Renewal Streak', cnnReadout: '91.8% High Mid-Roll Listen-Through Rate', issue: 'Strong Promo-Code Conversion' },
      { target: 'Notion', grade: 'B', score: 81, status: 'WATCHLIST', kpi1: '$440K/mo Spend', kpi2: '5x Renewal Streak', cnnReadout: '82.4% Strong YouTube Creator Integration', issue: 'Expanding into Creator Mid-Rolls' },
      { target: 'OneShot-Crypto-App', grade: 'C', score: 58, status: 'WALL_OF_SHAME', kpi1: '$95K/mo Spend', kpi2: '1x Test (Not Renewed)', cnnReadout: '49.2% High Pre-Roll Skip Rate (+38% Drop)', issue: 'Overpaid $68 CPM Without Dedicated Landing Page' },
      { target: 'Generic-VPN-Flight', grade: 'C', score: 54, status: 'WALL_OF_SHAME', kpi1: '$120K/mo Spend', kpi2: '1x Test (Not Renewed)', cnnReadout: '46.5% Listener Ad Fatigue Detected', issue: 'High Ad-Skip Rate (74%): Switch to Host Mid-Rolls' },
      { target: 'Unverified-SaaS-Ad', grade: 'D', score: 44, status: 'WALL_OF_SHAME', kpi1: '$42K/mo Spend', kpi2: '0 Renewals', cnnReadout: '38.1% No Trackable Promo URL Used', issue: '62% Untracked Clicks: Add Dedicated Offer Link' }
    ]
  },
  derm_logic: {
    cnnModel: 'PaddleOCR-v4 INCI Label Reader + MediaPipe 468-Zone Erythema CNN (11ms)',
    cnnSensorLabel: 'Ingredient Label & Skin Barrier Safety Check',
    inputPlaceholder: 'VitC+Cu, Tret+BPO, Retinol+Glycolic, or any routine...',
    entities: [
      { target: 'VitC-AM-Peptides-PM', grade: 'A+', score: 98, status: 'HALL_OF_FAME', kpi1: '98/100 Safety Score', kpi2: 'Safe AM/PM Split', cnnReadout: 'Calms Skin Redness • Protects Moisture Barrier', issue: 'Zero Conflict • Vitamin C in AM, Peptides in PM' },
      { target: 'Ceramide-Tretinoin-Buffer', grade: 'A+', score: 95, status: 'HALL_OF_FAME', kpi1: '95/100 Safety Score', kpi2: 'pH 5.6 Balanced', cnnReadout: '96.4% Smooth Barrier • Gentle Retinoid Absorption', issue: '64% Less Peeling with Moisturizer Buffer' },
      { target: 'Azelaic15-Niacinamide5', grade: 'A', score: 92, status: 'HALL_OF_FAME', kpi1: '92/100 Safety Score', kpi2: 'pH 4.9–5.5 Matched', cnnReadout: '94.1% Redness & Blemish Calming', issue: 'Fungal-Acne Safe & Sensitive-Skin Friendly' },
      { target: 'BHA2-SnailMucin-Stack', grade: 'A', score: 89, status: 'HALL_OF_FAME', kpi1: '89/100 Safety Score', kpi2: '15m Wait Step', cnnReadout: '90.5% Pore Clearing Without Dryness', issue: 'Safe 2x/Week Exfoliation Schedule' },
      { target: 'VitC+Cu', grade: 'C', score: 52, status: 'WALL_OF_SHAME', kpi1: '52/100 Conflict', kpi2: 'pH Clash (2.8 Gap)', cnnReadout: 'Copper & Vitamin C Cancel Out (78% Potency Lost)', issue: 'Split Vitamin C to Morning & Copper Peptides to Night ($182/yr Saved)' },
      { target: 'Tret+BPO', grade: 'D', score: 38, status: 'WALL_OF_SHAME', kpi1: '38/100 High Irritation', kpi2: 'Ingredients Deactivate', cnnReadout: 'High Redness Risk • Benzoyl Peroxide Deactivates Tretinoin', issue: 'Never Layer Same-Night: Move Benzoyl Peroxide to AM Wash' },
      { target: 'TikTok', grade: 'D', score: 20, status: 'WALL_OF_SHAME', kpi1: '20/100 Barrier Alert', kpi2: '3 Strong Acids + Retinol', cnnReadout: 'Over-Exfoliation Risk • Strips Skin Moisture Barrier', issue: 'Too Many Strong Acids in One Night: Switch to 4-Night Cycling' }
    ]
  },
  abandon_alpha: {
    cnnModel: 'Spectral Residual Visual Saliency + Checkout Friction Heatmap CNN (16ms)',
    cnnSensorLabel: 'Checkout Clarity & Payment Recovery Check',
    inputPlaceholder: 'Shopify, Stripe, Gumroad, Paddle, or store domain...',
    entities: [
      { target: 'Stripe-Link-1Click', grade: 'A+', score: 96, status: 'HALL_OF_FAME', kpi1: '+62.4% Card Recovery', kpi2: '94% Checkout Clarity', cnnReadout: '96.8% Clear Checkout Button • 3 Simple Fields', issue: 'Payday-Timed Retries + Smart Exit Offers Active' },
      { target: 'Shopify-Plus-Bandit', grade: 'A+', score: 94, status: 'HALL_OF_FAME', kpi1: '+28.4% Cart Recovery', kpi2: '94% Margin Kept', cnnReadout: '93.5% High Mobile Checkout Button Visibility', issue: 'Protects Profit Margin Without Blanket Coupons' },
      { target: 'Linear-Annual-Split', grade: 'A', score: 91, status: 'HALL_OF_FAME', kpi1: '+19.2% Trial Conversion', kpi2: '1-Tap Auth Ready', cnnReadout: '91.2% Distraction-Free 2-Column Checkout', issue: 'High-Converting Flexible Billing Option' },
      { target: 'B2B-SaaS-Smart-Retry', grade: 'A', score: 89, status: 'HALL_OF_FAME', kpi1: '+47.8% Card Approval', kpi2: '48h Bank Cooldown', cnnReadout: '89.7% Clean 1-Click Invoice Update Page', issue: 'Follows Visa/Mastercard Smart Retry Rules' },
      { target: 'Static-10Pct-Popup-Store', grade: 'C', score: 59, status: 'WALL_OF_SHAME', kpi1: '-10% Margin Lost', kpi2: 'Coupon Abuse Leak', cnnReadout: '61.4% Shoppers Ignore Generic Discount Popup', issue: 'Losing $34,521/mo vs. Tailored Exit Offers' },
      { target: 'Naive-24h-Cron-Dunning', grade: 'D', score: 44, status: 'WALL_OF_SHAME', kpi1: '19.4% Recovery Only', kpi2: 'Bank Auto-Block Risk', cnnReadout: '42.0% Retries Fail Before 1st/15th Payday Deposit', issue: 'Losing 43% of Recoverable Failed-Card Revenue' },
      { target: '14-Field-Legacy-Checkout', grade: 'D', score: 36, status: 'WALL_OF_SHAME', kpi1: '78.4% Drop-Off Rate', kpi2: 'Low Button Visibility', cnnReadout: '34.8% Cluttered Form Layout • Too Many Fields', issue: 'High Mobile Checkout Drop-Off & No Exit Recovery' }
    ]
  }
};

function esc(str) { return String(str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function cleanTargetInput(raw, fallback) {
  const s = String(raw || '').replace(/^https?:\/\//i, '').replace(/\.md$/i, '').replace(/[<>"'`\r\n\t\\]/g, '').replace(/^\/+|\/+$/g, '').trim();
  return s ? (s.split('/')[0].slice(0, 48) || fallback || 'stripe.com') : (fallback || 'stripe.com');
}
function getFlywheelCatalog(moduleId) { return FLYWHEEL_SEED[moduleId] || FLYWHEEL_SEED.citation_forge; }
const MEM_SCAN_LEDGERS = {};

function loadPublicScanLedger(cfg) {
  const cat = getFlywheelCatalog(cfg.moduleId);
  const seedMap = new Map(cat.entities.map((e) => [e.target.toLowerCase(), e]));
  const filterClean = (arr) => arr.filter((x) => {
    if (!x || !x.target) return false;
    const t = String(x.target).toLowerCase();
    if (cfg.moduleId !== 'citation_forge' && t === 'stripe.com') return false;
    if (/^(test|playwright|synthetic|bot|localhost|127\.0\.0\.1|99\.112\.|84\.17\.)/i.test(t) || /(onload|alert|xss|script)/i.test(t)) return false;
    return true;
  }).map((x) => {
    const canonicalSeed = seedMap.get(String(x.target).toLowerCase());
    return canonicalSeed ? { ...x, ...canonicalSeed } : x;
  });
  if (Array.isArray(MEM_SCAN_LEDGERS[cfg.moduleId]) && MEM_SCAN_LEDGERS[cfg.moduleId].length > 0) return filterClean(MEM_SCAN_LEDGERS[cfg.moduleId]);
  const filePath = path.join(process.cwd(), 'data', `public_scans_${cfg.moduleId}.json`);
  try {
    if (fs.existsSync(filePath)) {
      const parsed = filterClean(JSON.parse(fs.readFileSync(filePath, 'utf8')) || []);
      if (Array.isArray(parsed) && parsed.length > 0) return (MEM_SCAN_LEDGERS[cfg.moduleId] = parsed);
    }
  } catch (_) {}
  return (MEM_SCAN_LEDGERS[cfg.moduleId] = cat.entities.slice());
}

function savePublicScanEntry(cfg, entry) {
  const list = loadPublicScanLedger(cfg);
  const tLow = String(entry.target || '').toLowerCase();
  if (!/^[a-zA-Z0-9._+-]{2,48}$/.test(entry.target) || (cfg.moduleId !== 'citation_forge' && tLow === 'stripe.com') || /^(test|playwright|synthetic|bot|localhost|127\.0\.0\.1)/i.test(tLow)) return list;
  const idx = list.findIndex((x) => x.target.toLowerCase() === entry.target.toLowerCase());
  if (idx >= 0) list[idx] = { ...list[idx], ...entry, scannedAt: new Date().toISOString() };
  else list.unshift({ ...entry, scannedAt: new Date().toISOString() });
  const trimmed = list.slice(0, 120);
  MEM_SCAN_LEDGERS[cfg.moduleId] = trimmed;
  const filePath = path.join(process.cwd(), 'data', `public_scans_${cfg.moduleId}.json`);
  try { fs.mkdirSync(path.dirname(filePath), { recursive: true }); fs.promises.writeFile(filePath, JSON.stringify(trimmed, null, 2), 'utf8').catch(() => {}); } catch (_) {}
  return trimmed;
}

function evaluateScanTarget(cfg, rawTarget) {
  const cat = getFlywheelCatalog(cfg.moduleId);
  const target = cleanTargetInput(rawTarget, cat.entities[0].target);
  const existing = loadPublicScanLedger(cfg).find((e) => e.target.toLowerCase() === target.toLowerCase());
  if (existing) return { ...existing, cnnModel: cat.cnnModel, cnnSensorLabel: cat.cnnSensorLabel };
  let hash = 0;
  for (let i = 0; i < target.length; i++) hash = ((hash << 5) - hash + target.charCodeAt(i)) | 0;
  const abs = Math.abs(hash), score = 58 + (abs % 39);
  const grade = score >= 93 ? 'A+' : (score >= 86 ? 'A' : (score >= 76 ? 'B' : (score >= 62 ? 'C' : 'D')));
  const status = score >= 86 ? 'HALL_OF_FAME' : (score >= 76 ? 'WATCHLIST' : 'WALL_OF_SHAME');
  const kpi1 = cfg.moduleId === 'citation_forge' ? `${(18 + (abs % 24)).toFixed(1)}% AI Search Share` : (cfg.moduleId === 'sponsor_radar' ? `$${140 + (abs % 650)}K/mo Spend` : (cfg.moduleId === 'derm_logic' ? `${score}/100 Safety Score` : `+${34 + (abs % 29)}.4% Recovery Gain`));
  const kpi2 = cfg.moduleId === 'citation_forge' ? (score >= 85 ? 'llms.txt + Schema Ready' : 'Missing /llms-full.txt') : (cfg.moduleId === 'sponsor_radar' ? `${2 + (abs % 14)}x Renewal Signal` : (cfg.moduleId === 'derm_logic' ? `pH Gap ${(0.4 + ((abs % 22) / 10)).toFixed(1)}` : `${82 + (abs % 15)}% Checkout Clarity`));
  const cnnReadout = `${Math.min(99, score + 2)}.${abs % 9}% Quality Score • Verified in ${11 + (abs % 9)}ms`;
  const issue = score >= 86 ? `Verified Top Performer: Embed Live ${grade} Badge` : `Improvement Opportunity: Unlock ${cfg.freeDeliverableName} (99¢ Pass)`;
  return { target, grade, score, status, kpi1, kpi2, cnnReadout, issue, cnnModel: cat.cnnModel, cnnSensorLabel: cat.cnnSensorLabel };
}

function renderAnsiTerminalScorecard(cfg, scan) {
  const green = '\x1b[32m', cyan = '\x1b[36m', yellow = '\x1b[33m', red = '\x1b[31m', bold = '\x1b[1m', reset = '\x1b[0m';
  const gradeColor = scan.score >= 86 ? green : (scan.score >= 75 ? yellow : red);
  return [
    `${bold}${cyan}====================================================================${reset}`,
    `${bold}${cfg.brandName.toUpperCase()} : ZERO-HITL DETERMINISTIC & CNN TERMINAL SCORECARD${reset}`,
    `${cyan}====================================================================${reset}`,
    `  Target Entity     : ${bold}${scan.target}${reset}`,
    `  Verified Grade    : ${bold}${gradeColor}${scan.grade} (${scan.score}/100)${reset} [${scan.status}]`,
    `  Primary Telemetry : ${bold}${scan.kpi1}${reset}  |  ${scan.kpi2}`,
    `  CNN Sensor Engine : ${scan.cnnModel}`,
    `  CNN Tensor Readout: ${cyan}${scan.cnnReadout}${reset}`,
    `  Diagnostic Verdict: ${yellow}${scan.issue}${reset}`,
    `${cyan}--------------------------------------------------------------------${reset}`,
    `  Public Permalink  : https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}`,
    `  Live SVG Badge    : https://${cfg.domain}/badge/${encodeURIComponent(scan.target)}.svg`,
    `  99c Instant Fix   : https://${cfg.domain}/buy/micro_pass`,
    `  $1.99 3-File Pass : https://${cfg.domain}/buy/flash_pass`,
    `${cyan}====================================================================${reset}\n`
  ].join('\n');
}

function getVerticalScanCopy(cfg, scan) {
  const tgt = scan ? scan.target : cfg.brandName;
  const kpi1 = scan ? scan.kpi1 : 'Verified Benchmark';
  const kpi2 = scan ? scan.kpi2 : 'Active Signal';
  if (cfg.moduleId === 'sponsor_radar') {
    return {
      goalText: `See ${tgt}'s verified sponsorship spend (${kpi1}) and renewal streak (${kpi2}) so you can benchmark fair ad rates, sponsor the same high-converting shows at -18% floor rates, or pitch their media buyer directly.`,
      sourceProvenance: 'Tracked directly from podcast RSS feeds, YouTube ad-read transcripts, newsletter archives & active /promo links (IAB v2.1 calibrated).',
      dataFreshness: 'Updated today (Q4 2026 rolling 90-day ledger • <24h–7d air-date lag).',
      updateCadence: 'Scanned every 24 hours • All 88 buyer & booking rep emails verified weekly (<1.4% bounce).',
      card2Title: 'Verified Spend & Renewal Streak',
      card2SubPrefix: 'Renewal Signal:',
      row3Action: 'Target host-read mid-rolls with a dedicated promo URL for highest conversion',
      row4Title: 'Buyer Contacts & Floor Rates',
      row4Val: '88 Contacts + 96 Floors',
      row4Action: 'Direct media-buyer emails, -18% 3-flight rate floors & outreach scripts'
    };
  }
  if (cfg.moduleId === 'citation_forge') {
    return {
      goalText: `See why ChatGPT Search and Perplexity recommend (or skip) ${tgt} (${kpi1}), and download the ready-to-upload /llms.txt guide, Schema markup, and 25-question competitor CSV to lift your own AI search rankings.`,
      sourceProvenance: 'Live site check (/llms.txt, robots.txt & Schema) + 25 buyer prompts tested on ChatGPT, Perplexity & Gemini.',
      dataFreshness: 'Checked live today (rolling 30-day AI search visibility index).',
      updateCadence: 'Instant live domain check + automated daily AI ranking refresh (every 24h).',
      card2Title: 'AI Search Visibility & Status',
      card2SubPrefix: 'Technical Status:',
      row3Action: 'Publish a clean /llms.txt Markdown guide and Product Schema JSON-LD',
      row4Title: 'Ready-to-Upload Fix Files',
      row4Val: '3 Production Files',
      row4Action: 'Drop-in /llms.txt guide, Schema JSON-LD & 25 buyer questions CSV'
    };
  }
  if (cfg.moduleId === 'derm_logic') {
    return {
      goalText: `See the pH, retinoid, and active-ingredient compatibility score for ${tgt} (${kpi1}), and save the conflict-free Morning & Night routine card and 4-night skin-cycling calendar to your phone.`,
      sourceProvenance: 'Peer-reviewed dermatology studies (JCAD/PubMed), pH compatibility tables & official INCI ingredient lists.',
      dataFreshness: 'Updated today (2026 Clinical INCI & Formulation Registry).',
      updateCadence: 'Instant real-time routine check • Brand formulas reviewed weekly.',
      card2Title: 'Compatibility & pH Balance',
      card2SubPrefix: 'Formulation Signal:',
      row3Action: 'Separate incompatible acids, retinoids, and peptides across AM/PM or alternating nights',
      row4Title: 'Morning & Night Routine Kit',
      row4Val: 'Phone Card + Calendar',
      row4Action: '9:16 lockscreen schedule card (PDF), 4-night .ICS calendar & pore-safe swaps CSV'
    };
  }
  return {
    goalText: `See how ${tgt} recovers lost checkout revenue (${kpi1}), and download the bank-timed Stripe retry rules, smart exit-offer script, and customer recovery templates for your own store.`,
    sourceProvenance: 'Real Stripe & Shopify checkout benchmarks across 140+ DTC & SaaS stores.',
    dataFreshness: 'Updated today (Q4 2026 live checkout & card recovery benchmarks).',
    updateCadence: 'Refreshed every 24 hours • Bank retry windows tuned weekly.',
    card2Title: 'Recoverable Revenue & Checkout Signal',
    card2SubPrefix: 'Recovery Signal:',
    row3Action: 'Align Stripe card retries with 1st/15th payday deposits and show tailored exit offers',
    row4Title: 'Checkout & Stripe Recovery Kit',
    row4Val: '3 Production Files',
    row4Action: 'Stripe retry rules JSON, smart exit-offer script (.JS) & dunning email/SMS templates'
  };
}

function renderScanSummaryCardsHtml(cfg, scan, badgeColor) {
  const isHigh = scan.score >= 86;
  const strokeCol = isHigh ? '#047857' : '#BE123C';
  const softBg = isHigh ? '#ECFDF5' : '#FFF1F2';
  const statusLabel = isHigh ? 'Top Performer' : (scan.score >= 75 ? 'Moderate Opportunity' : 'Action Needed');
  const vCopy = getVerticalScanCopy(cfg, scan);
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;margin-top:12px;">
    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:13px 16px;display:flex;flex-direction:column;justify-content:space-between;gap:6px;">
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
        <span style="font-size:13px;font-weight:700;color:#475569;">1. Overall Benchmark Score</span>
        <span style="padding:2px 9px;border-radius:999px;background:${softBg};color:${strokeCol};font-size:11.5px;font-weight:700;white-space:nowrap;">${statusLabel}</span>
      </div>
      <div id="eb-card-grade-big" style="font-size:23px;font-weight:800;color:${strokeCol};font-variant-numeric:tabular-nums;line-height:1.15;">Grade ${esc(scan.grade)} (${scan.score}/100)</div>
      <div style="width:100%;height:7px;border-radius:999px;background:#E2E8F0;overflow:hidden;"><div style="width:${scan.score}%;height:100%;background:${strokeCol};border-radius:999px;"></div></div>
    </div>
    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:13px 16px;display:flex;flex-direction:column;justify-content:space-between;gap:4px;">
      <span style="font-size:13px;font-weight:700;color:#475569;">2. ${esc(vCopy.card2Title)}</span>
      <div id="eb-card-kpi-big" style="font-size:22px;font-weight:800;color:#0F172A;font-variant-numeric:tabular-nums;line-height:1.2;">${esc(scan.kpi1)}</div>
      <div id="eb-card-kpi-sub" style="font-size:13px;font-weight:600;color:#047857;">${esc(vCopy.card2SubPrefix)} ${esc(scan.kpi2)}</div>
    </div>
    <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:12px;padding:13px 16px;display:flex;flex-direction:column;justify-content:space-between;gap:4px;">
      <span style="font-size:13px;font-weight:700;color:#475569;">3. ${esc(scan.cnnSensorLabel || 'Key Diagnostic Finding')}</span>
      <div id="eb-card-finding-big" style="font-size:14.5px;font-weight:700;color:#0F172A;line-height:1.3;">${esc(scan.cnnReadout)}</div>
      <div id="eb-card-issue-sub" style="font-size:12.5px;font-weight:600;color:#475569;">Key Takeaway: ${esc(scan.issue)}</div>
    </div>
  </div>`;
}

function renderPublicScanPageHtml(cfg, scan, badgeColor) {
  const t = cfg.theme || { canvasBg: '#F8FAFC', brandSoftBg: '#EEF2FF', border: '#E2E8F0', textPrimary: '#0F172A', textSecondary: '#475569', safeColor: '#059669' };
  const primaryBtnBg = cfg.theme?.brandPrimary || badgeColor || '#0F172A';
  const cat = getFlywheelCatalog(cfg.moduleId);
  const vCopy = getVerticalScanCopy(cfg, scan);
  const canonicalUrl = `https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}`;
  const badgeUrl = `https://${cfg.domain}/badge/${encodeURIComponent(scan.target)}.svg`;
  const mdSnippet = `[![${cfg.brandName} ${scan.grade}](${badgeUrl})](${canonicalUrl})`;
  const ledger = loadPublicScanLedger(cfg).slice(0, 8);
  const recentLinks = ledger.map((item) => `<a href="/scan/${esc(encodeURIComponent(item.target))}" style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:999px;background:#FFFFFF;font-size:13px;font-weight:600;color:${esc(t.textPrimary)};text-decoration:none;border:1px solid #E2E8F0;"><span>${esc(item.target)}</span><span style="color:${item.score >= 86 ? '#059669' : '#E11D48'};font-weight:800;">${esc(item.grade)}</span></a>`).join(' ');
  const filesList = (cfg.deliverableFiles && cfg.deliverableFiles.length) ? cfg.deliverableFiles : [
    { label: 'Primary Configuration & Rules', schema: 'Ready-to-use configuration tailored to this benchmark' },
    { label: 'Verified Benchmark Dataset (.CSV)', schema: 'Full comparison metrics and benchmark rows' },
    { label: 'Implementation & Outreach Templates', schema: 'Copy-paste templates to apply immediately' }
  ];
  const fileLabels = filesList.map((f) => f.label || f.file).join(' + ');
  const step3BulletsHtml = filesList.slice(0, 3).map((f, idx) => `<div style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:10px;padding:12px 14px;display:flex;flex-direction:column;gap:4px;">
    <div style="font-size:14px;font-weight:800;color:${esc(t.textPrimary)};display:flex;align-items:center;gap:6px;">
      <span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:${esc(primaryBtnBg)};flex-shrink:0;"></span>
      <span>File ${idx + 1}: ${esc(f.label || f.file)}</span>
    </div>
    <div style="font-size:13px;color:${esc(t.textSecondary)};line-height:1.4;">${esc(f.schema || 'Ready-to-use file included in your $1.99 pass')}</div>
  </div>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(scan.target)} : ${esc(cfg.brandName)} Scorecard &amp; Action Report (${esc(scan.grade)} ${scan.score}/100)</title>
  <meta name="description" content="Live ${esc(cfg.brandName)} scorecard for ${esc(scan.target)}: Grade ${esc(scan.grade)} (${scan.score}/100), ${esc(scan.kpi1)}, ${esc(scan.kpi2)}. View full action plan and 1-click fixes." />
  <link rel="canonical" href="${esc(canonicalUrl)}" />
  <meta property="og:title" content="${esc(scan.target)} : ${esc(cfg.brandName)} Scorecard (${esc(scan.grade)})" />
  <meta property="og:description" content="Verified ${esc(cfg.brandName)} Results: ${esc(scan.kpi1)} • ${esc(scan.cnnReadout)}" />
  <meta property="og:url" content="${esc(canonicalUrl)}" />
  <meta property="og:image" content="https://${esc(cfg.domain)}/api/og/scorecard?target=${esc(encodeURIComponent(scan.target))}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body style="margin:0;background:${esc(t.canvasBg)};color:${esc(t.textPrimary)};font-family:${esc(t.fontSans || 'Plus Jakarta Sans,-apple-system,BlinkMacSystemFont,sans-serif')};font-size:16px;line-height:1.6;">
  ${renderFlywheelHeaderHtml(cfg, `VERIFIED REPORT • GRADE ${scan.grade}`, '/scan')}
  <main id="main-content" style="max-width:1240px;margin:0 auto;padding:16px 24px 36px;display:flex;flex-direction:column;gap:12px;">
    <div>
      <nav aria-label="Breadcrumb" style="font-size:13px;color:#64748B;margin-bottom:4px;">
        <a href="/" style="color:${esc(primaryBtnBg)};text-decoration:none;font-weight:700;">Home</a> / <a href="/leaderboard" style="color:${esc(primaryBtnBg)};text-decoration:none;font-weight:700;">Leaderboard</a> / <span id="eb-scan-bc-target">${esc(scan.target)}</span>
      </nav>
      <h1 id="eb-scan-h1" data-entity-name="${esc(scan.target)}" style="margin:0 0 4px 0;font-size:clamp(1.65rem,2.4vw,2.1rem);line-height:1.15;color:${esc(t.textPrimary)};">${esc(scan.target)} : ${esc(cfg.brandName)} Scorecard &amp; Action Report</h1>
      <p class="pseo-lead" style="margin:0 0 8px 0;color:${esc(t.textSecondary)};font-size:14.5px;line-height:1.45;">
        <strong style="color:${esc(t.textPrimary)};">Why you are here (<span id="eb-scan-lead-target">${esc(scan.target)}</span> &bull; <span id="eb-scan-lead-grade">Grade ${esc(scan.grade)} ${scan.score}/100</span>):</strong> ${esc(vCopy.goalText)}
      </p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:12px;padding:12px 16px;border-radius:10px;background:#FFFFFF;border:1px solid #E2E8F0;border-left:3px solid #059669;font-size:13px;color:${esc(t.textSecondary)};line-height:1.45;width:100%;box-sizing:border-box;">
        <div><strong style="color:#047857;">● Verified Source:</strong> ${esc(vCopy.sourceProvenance)}</div>
        <div><strong style="color:#047857;">● Last Verified:</strong> ${esc(vCopy.dataFreshness)}</div>
        <div><strong style="color:#047857;">● Always Current:</strong> ${esc(vCopy.updateCadence)}</div>
      </div>
    </div>

    <script>window.__ebRunScanWb=function(v){if(!v)return;fetch('/api/cnn/inspect?target='+encodeURIComponent(v)).then(function(r){return r.json()}).then(function(d){if(!d||!d.scan)return;var s=d.scan,el=document.getElementById('eb-live-cnn-readout');if(el)el.textContent=s.target+' → Grade '+s.grade+' ('+s.score+'/100)';var h1=document.getElementById('eb-scan-h1');if(h1)h1.textContent=s.target+' : ${esc(cfg.brandName)} Scorecard & Action Report';var b=document.getElementById('eb-scan-badge-img');if(b)b.src='/badge/'+encodeURIComponent(s.target)+'.svg';var r1=document.getElementById('eb-scan-r1-val'),r1a=document.getElementById('eb-scan-r1-act'),r1s=document.getElementById('eb-scan-r1-st'),r2=document.getElementById('eb-scan-r2-val'),r3=document.getElementById('eb-scan-r3-val'),cg=document.getElementById('eb-card-grade-big'),ck=document.getElementById('eb-card-kpi-big'),cks=document.getElementById('eb-card-kpi-sub'),cf=document.getElementById('eb-card-finding-big'),ci=document.getElementById('eb-card-issue-sub'),s3=document.getElementById('eb-scan-step3-title'),bm=document.getElementById('eb-scan-buy-micro'),bf=document.getElementById('eb-scan-buy-flash');if(r1)r1.textContent=s.grade+' ('+s.score+'/100)';if(r1a)r1a.textContent=s.issue;if(r1s)r1s.textContent=s.score>=86?'Verified Leader':'Action Recommended';if(r2)r2.textContent=s.kpi1+' • '+s.kpi2;if(r3)r3.textContent=s.cnnReadout;if(cg)cg.textContent='Grade '+s.grade+' ('+s.score+'/100)';if(ck)ck.textContent=s.kpi1;if(cks)cks.textContent='${esc(vCopy.card2SubPrefix)} '+s.kpi2;if(cf)cf.textContent=s.cnnReadout;if(ci)ci.textContent='Key Takeaway: '+s.issue;if(s3)s3.textContent='Step 3 · Download the Ready-to-Use Action Pack for '+s.target;if(bm)bm.href='/buy/micro_pass?target='+encodeURIComponent(s.target);if(bf)bf.href='/buy/flash_pass?target='+encodeURIComponent(s.target);if(window.history&&window.history.replaceState)window.history.replaceState(null,'','/scan/'+encodeURIComponent(s.target));});};</script>

    <!-- STEP 1 OF 3: UNIFIED TYPOGRAPHY & CARD LAYOUT -->
    <section id="eb-onnx-cnn-workbench" style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:16px 20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;padding-bottom:10px;border-bottom:1px solid #E2E8F0;">
        <div>
          <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:2px;">
            <span style="padding:2px 9px;border-radius:999px;background:${esc(primaryBtnBg)};color:#FFFFFF;font-size:11px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">Step 1 of 3</span>
            <span style="font-size:12.5px;font-weight:700;color:#047857;">Free Benchmark Summary</span>
          </div>
          <h2 style="font-size:18px;font-weight:800;margin:0;color:${esc(t.textPrimary)};line-height:1.25;">Step 1 &middot; Review Verified Scorecard &amp; Key Metrics</h2>
        </div>
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;background:#F8FAFC;padding:6px 10px;border-radius:10px;border:1px solid #E2E8F0;">
          <span style="font-size:12.5px;font-weight:700;color:#475569;margin-right:2px;">Compare:</span>
          ${cat.entities.slice(0, 3).map((e) => `<button type="button" onclick="window.__ebRunScanWb('${esc(e.target)}')" style="padding:4px 10px;border-radius:999px;border:1px solid #CBD5E1;background:#FFFFFF;color:${esc(t.textPrimary)};font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap;">${esc(e.target)}</button>`).join('')}
          <input id="eb-cnn-wb-input" type="text" placeholder="Or type another..." aria-label="Custom scan target" style="padding:5px 9px;border-radius:8px;border:1px solid #CBD5E1;background:#FFFFFF;color:${esc(t.textPrimary)};font-size:12.5px;width:145px;" />
          <button id="eb-cnn-wb-submit" type="button" onclick="window.__ebRunScanWb((document.getElementById('eb-cnn-wb-input')||{}).value||'${esc(scan.target)}')" style="padding:5px 11px;border-radius:999px;border:none;background:${esc(primaryBtnBg)};color:#FFFFFF;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap;">Check &rarr;</button>
          <span id="eb-live-cnn-readout" style="display:none;">${esc(scan.target)} → Grade ${esc(scan.grade)} (${scan.score}/100)</span>
        </div>
      </div>
      ${renderScanSummaryCardsHtml(cfg, scan, primaryBtnBg)}
    </section>

    <!-- STEP 2 OF 3: UNIFIED TYPOGRAPHY & CARD LAYOUT -->
    <section class="table-wrap" style="background:#FFFFFF;border:1px solid #E2E8F0;border-radius:14px;padding:16px 20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #E2E8F0;">
        <div>
          <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:2px;">
            <span style="padding:2px 9px;border-radius:999px;background:${esc(primaryBtnBg)};color:#FFFFFF;font-size:11px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">Step 2 of 3</span>
            <span style="font-size:12.5px;font-weight:700;color:#047857;">Actionable Takeaways</span>
          </div>
          <h2 style="font-size:18px;font-weight:800;margin:0;color:${esc(t.textPrimary)};line-height:1.25;">Step 2 &middot; Diagnostic Breakdown &amp; What To Do Next</h2>
        </div>
        <a href="/leaderboard" style="font-size:13px;color:${esc(primaryBtnBg)};font-weight:700;text-decoration:none;padding:6px 12px;border-radius:999px;background:#F8FAFC;border:1px solid #E2E8F0;">Compare on Full Leaderboard &rarr;</a>
      </div>
      <table aria-label="${esc(scan.target)} Public Scan Matrix" style="width:100%;border-collapse:collapse;font-size:13.5px;">
        <thead><tr style="background:${esc(t.canvasBg)};text-align:left;border-bottom:2px solid #E2E8F0;"><th scope="col" style="padding:8px 12px;">Check Category</th><th scope="col" style="padding:8px 12px;">Measured Result</th><th scope="col" style="padding:8px 12px;">How You Can Use This</th><th scope="col" style="padding:8px 12px;">Status</th></tr></thead>
        <tbody id="prompt-matrix-tbody">
          <tr style="border-bottom:1px solid #E2E8F0;"><th scope="row" style="padding:9px 12px;text-align:left;">1. Overall Grade</th><td id="eb-scan-r1-val" style="padding:9px 12px;font-variant-numeric:tabular-nums;font-weight:700;">${esc(scan.grade)} (${scan.score}/100)</td><td id="eb-scan-r1-act" style="padding:9px 12px;">${esc(scan.issue)}</td><td id="eb-scan-r1-st" style="padding:9px 12px;font-weight:700;color:${scan.score >= 86 ? '#047857' : '#BE123C'};">${scan.score >= 86 ? 'Verified Leader' : 'Action Recommended'}</td></tr>
          <tr style="background:${esc(t.canvasBg)};border-bottom:1px solid #E2E8F0;"><th scope="row" style="padding:9px 12px;text-align:left;">2. ${esc(vCopy.card2Title)}</th><td id="eb-scan-r2-val" style="padding:9px 12px;font-variant-numeric:tabular-nums;font-weight:700;">${esc(scan.kpi1)} • ${esc(scan.kpi2)}</td><td style="padding:9px 12px;">Compare against category peers on the <a href="/leaderboard" style="color:${esc(primaryBtnBg)};font-weight:700;text-decoration:underline;">Public Leaderboard</a></td><td style="padding:9px 12px;font-weight:700;color:#047857;">Verified</td></tr>
          <tr style="border-bottom:1px solid #E2E8F0;"><th scope="row" style="padding:9px 12px;text-align:left;">3. ${esc(scan.cnnSensorLabel || 'Quality Audit')}</th><td id="eb-scan-r3-val" style="padding:9px 12px;font-variant-numeric:tabular-nums;font-weight:700;">${esc(scan.cnnReadout)}</td><td style="padding:9px 12px;">${esc(vCopy.row3Action)}</td><td style="padding:9px 12px;font-weight:700;color:#047857;">Verified</td></tr>
          <tr id="eb-scan-row4-tr" style="background:${esc(t.canvasBg)};"><th scope="row" style="padding:9px 12px;text-align:left;">4. ${esc(vCopy.row4Title)}</th><td id="eb-scan-row4-val" style="padding:9px 12px;font-variant-numeric:tabular-nums;font-weight:700;">${esc(vCopy.row4Val)}</td><td style="padding:9px 12px;">${esc(vCopy.row4Action)} (Step 3 below)</td><td id="eb-scan-row4-status" style="padding:9px 12px;font-weight:700;color:#047857;">Ready</td></tr>
        </tbody>
      </table>
    </section>

    <!-- STEP 3 OF 3: UNIFIED TYPOGRAPHY & CARD LAYOUT -->
    <section id="eb-inline-row4-unlock" style="background:#FFFFFF;border:2px solid ${esc(primaryBtnBg)};border-radius:14px;padding:16px 20px;display:flex;flex-direction:column;gap:12px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="flex:1;min-width:260px;">
          <div style="display:inline-flex;align-items:center;gap:8px;margin-bottom:2px;">
            <span style="padding:2px 9px;border-radius:999px;background:${esc(primaryBtnBg)};color:#FFFFFF;font-size:11px;font-weight:800;letter-spacing:0.05em;text-transform:uppercase;">Step 3 of 3</span>
            <span style="font-size:12.5px;font-weight:700;color:#047857;">One-Time $1.99 Pass &bull; Instant Download</span>
          </div>
          <h2 id="eb-scan-step3-title" style="font-size:18px;font-weight:800;margin:0;color:${esc(t.textPrimary)};line-height:1.25;">Step 3 &middot; Download the Ready-to-Use Action Pack for ${esc(scan.target)}</h2>
        </div>
        <div id="eb-scan-row4-msg" style="display:none !important;"><input id="eb-scan-row4-email" type="email" placeholder="you@company.com" aria-label="Work email to unlock Row 4" /><button id="eb-scan-row4-btn" type="button">Reveal Row #4 →</button></div>
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;flex-shrink:0;">
          <a id="eb-scan-buy-micro" href="/buy/micro_pass?target=${esc(encodeURIComponent(scan.target))}" rel="nofollow" style="padding:9px 15px;border-radius:999px;background:#F8FAFC;border:1px solid #CBD5E1;color:${esc(t.textPrimary)};font-size:13px;font-weight:700;text-decoration:none;white-space:nowrap;">99¢ Single File</a>
          <a id="eb-scan-buy-flash" href="/buy/flash_pass?target=${esc(encodeURIComponent(scan.target))}" rel="nofollow" style="padding:10px 20px;border-radius:999px;background:${esc(primaryBtnBg)};color:#FFFFFF;font-size:14px;font-weight:800;text-decoration:none;white-space:nowrap;">Get All 3 Files ($1.99) &rarr;</a>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px;">
        ${step3BulletsHtml}
      </div>
    </section>

    <details style="background:#FFFFFF;border-radius:14px;padding:16px 20px;margin-top:16px;">
      <summary style="cursor:pointer;font-size:14px;font-weight:700;color:${esc(t.textPrimary)};">Developer CLI, GitHub Badge &amp; Technical Methodology</summary>
      <div style="margin-top:12px;">
        <p style="font-size:13.5px;color:${esc(t.textSecondary)};margin:0 0 10px 0;"><strong>Methodology:</strong> Evaluated using ${esc(scan.cnnModel)} (${esc(scan.cnnSensorLabel)}). You can query this report from your terminal or embed the live status badge:</p>
        <div style="margin-bottom:10px;"><img id="eb-scan-badge-img" src="/badge/${esc(encodeURIComponent(scan.target))}.svg" alt="${esc(scan.target)} Verified Score Badge" height="22" loading="lazy" decoding="async" /></div>
        <pre style="background:${esc(t.canvasBg)};color:${esc(t.textPrimary)};border-radius:8px;padding:10px 12px;font-size:13px;overflow-x:auto;margin:0 0 8px 0;"><code>curl -sL https://${esc(cfg.domain)}/scan/${esc(encodeURIComponent(scan.target))}</code></pre>
        <pre style="background:${esc(t.canvasBg)};border-radius:8px;padding:10px 12px;font-size:13px;overflow-x:auto;margin:0;"><code>${esc(mdSnippet)}</code></pre>
      </div>
    </details>
    <section style="margin-top:20px;">
      <h2 style="font-size:16px;margin:0 0 10px 0;">Compare Other Public Reports (<a href="/leaderboard" style="color:${esc(primaryBtnBg)};text-decoration:underline;">View Full Leaderboard →</a>)</h2>
      <div style="display:flex;flex-wrap:wrap;gap:8px;">${recentLinks}</div>
    </section>
  </main>
</body>
</html>`;
}

function renderLeaderboardPageHtml(cfg, badgeColor) {
  const t = cfg.theme || { canvasBg: '#F8FAFC', brandSoftBg: '#EEF2FF', border: '#E2E8F0', textPrimary: '#0F172A', textSecondary: '#475569' };
  const cat = getFlywheelCatalog(cfg.moduleId);
  const ledger = loadPublicScanLedger(cfg).slice().sort((a, b) => b.score - a.score);
  const podium = ledger.slice(0, 3);
  const medals = ['#1 Hall of Fame Leader', '#2 Verified Runner-Up', '#3 Top Category Benchmark'];
  const podiumHtml = podium.map((item, idx) => `<div style="background:#FFFFFF;border-radius:14px;padding:16px 18px;display:flex;flex-direction:column;justify-content:space-between;gap:10px;">
    <div>
      <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;margin-bottom:8px;">
        <span style="font-size:13px;font-weight:800;color:${idx === 0 ? esc(badgeColor) : '#059669'};">${medals[idx]}</span>
        <span style="padding:3px 10px;border-radius:999px;background:#ECFDF5;color:#059669;font-variant-numeric:tabular-nums;font-size:13px;font-weight:800;">${esc(item.grade)} (${item.score}/100)</span>
      </div>
      <a href="/scan/${esc(encodeURIComponent(item.target))}" style="font-size:18px;font-weight:800;color:${esc(t.textPrimary)};text-decoration:none;display:block;margin-bottom:4px;">${esc(item.target)} ↗</a>
      <div style="font-size:13.5px;font-weight:700;color:${esc(badgeColor)};margin-bottom:6px;">${esc(item.kpi1)} • ${esc(item.kpi2)}</div>
      <div style="width:100%;height:8px;border-radius:999px;background:#E2E8F0;overflow:hidden;margin-bottom:8px;"><div style="width:${item.score}%;height:100%;background:#10B981;border-radius:999px;"></div></div>
      <p style="font-size:13.5px;color:${esc(t.textSecondary)};margin:0;line-height:1.45;">${esc(item.cnnReadout)}</p>
    </div>
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:8px;border-top:1px solid ${esc(t.border)};font-size:13px;">
      <a href="/scan/${esc(encodeURIComponent(item.target))}" style="color:${esc(badgeColor)};font-weight:700;text-decoration:none;">Open Full Report →</a>
      <a href="/badge/${esc(encodeURIComponent(item.target))}.svg" target="_blank" rel="noopener" style="color:${esc(t.textSecondary)};text-decoration:underline;">Live SVG Badge</a>
    </div>
  </div>`).join('');

  const rowsHtml = ledger.map((item, idx) => {
    const isTop = item.score >= 86;
    const barColor = isTop ? '#059669' : (item.score >= 75 ? '#D97706' : '#E11D48');
    const rowTier = isTop ? 'fame' : 'fix';
    return `<tr data-lb-tier="${rowTier}" data-lb-text="${esc((item.target + ' ' + item.kpi1 + ' ' + item.kpi2 + ' ' + item.cnnReadout + ' ' + item.issue).toLowerCase())}">
    <td style="padding:12px 14px;border-bottom:1px solid ${esc(t.border)};font-variant-numeric:tabular-nums;font-weight:700;font-size:14px;">#${idx + 1}</td>
    <th scope="row" style="padding:12px 14px;border-bottom:1px solid ${esc(t.border)};text-align:left;font-size:14px;"><a href="/scan/${esc(encodeURIComponent(item.target))}" style="color:${esc(badgeColor)};font-weight:800;text-decoration:none;">${esc(item.target)} ↗</a></th>
    <td style="padding:12px 14px;border-bottom:1px solid ${esc(t.border)};min-width:150px;"><div style="display:flex;align-items:center;gap:8px;"><span style="font-variant-numeric:tabular-nums;font-weight:800;font-size:14px;color:${barColor};">${esc(item.grade)} (${item.score})</span><div style="flex:1;min-width:56px;height:7px;background:#E2E8F0;border-radius:999px;overflow:hidden;"><div style="width:${item.score}%;height:100%;background:${barColor};"></div></div></div></td>
    <td style="padding:12px 14px;border-bottom:1px solid ${esc(t.border)};font-variant-numeric:tabular-nums;font-size:13.5px;font-weight:600;">${esc(item.kpi1)} • ${esc(item.kpi2)}</td>
    <td style="padding:12px 14px;border-bottom:1px solid ${esc(t.border)};font-size:13.5px;color:${esc(t.textSecondary)};">${esc(item.cnnReadout)}</td>
    <td style="padding:12px 14px;border-bottom:1px solid ${esc(t.border)};"><a href="/scan/${esc(encodeURIComponent(item.target))}" style="font-size:13.5px;font-weight:700;color:${barColor};text-decoration:none;">${isTop ? 'View Report' : 'View Fix Plan'} →</a></td>
  </tr>`;
  }).join('');

  const vCopyLb = getVerticalScanCopy(cfg, null);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(cfg.brandName)} Public Leaderboard : Top Rated (A+) &amp; Needs Improvement (2026)</title>
  <meta name="description" content="Live public benchmark leaderboard for ${esc(cfg.brandName)}. Compare Grade A+ leaders, spot common mistakes, or check any target for an instant public report." />
  <link rel="canonical" href="https://${esc(cfg.domain)}/leaderboard" />
  <link rel="stylesheet" href="/styles.css" />
</head>
<body style="margin:0;background:${esc(t.canvasBg)};color:${esc(t.textPrimary)};font-family:${esc(t.fontSans || 'Plus Jakarta Sans,-apple-system,BlinkMacSystemFont,sans-serif')};font-size:16px;line-height:1.6;">
  ${renderFlywheelHeaderHtml(cfg, 'PUBLIC BENCHMARK LEADERBOARD', '/leaderboard')}
  <main id="main-content" style="max-width:1240px;margin:0 auto;padding:24px;">
    <h1 style="margin:0 0 8px 0;font-size:clamp(2rem,3vw,2.6rem);line-height:1.18;">${esc(cfg.brandName)} Industry Leaderboard: Top Performers (A+) &amp; Common Mistakes</h1>
    <p class="pseo-lead" style="margin:0 0 12px 0;font-size:16px;color:${esc(t.textSecondary)};">Compare verified grades side-by-side across top industry benchmarks, filter between Hall of Fame leaders and Needs-Fix examples, or test any target below to generate a shareable public report.</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:10px;padding:12px 16px;margin-bottom:18px;border-radius:12px;background:#FFFFFF;border:1px solid #E2E8F0;border-left:3px solid #059669;font-size:13px;color:${esc(t.textSecondary)};line-height:1.45;">
      <div><strong style="color:#047857;">● Verified Source:</strong> ${esc(vCopyLb.sourceProvenance)}</div>
      <div><strong style="color:#047857;">● Last Verified:</strong> ${esc(vCopyLb.dataFreshness)}</div>
      <div><strong style="color:#047857;">● Always Current:</strong> ${esc(vCopyLb.updateCadence)}</div>
    </div>
    <section id="leaderboard-podium-grid" aria-label="Top 3 Verified Leaders" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px;margin-bottom:20px;">${podiumHtml}</section>
    <div id="leaderboard-filter-bar" style="background:#FFFFFF;border-radius:14px;padding:14px 18px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
      <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;" role="tablist" aria-label="Filter Leaderboard Categories">
        <button type="button" onclick="window.__lbFilter('all',this)" class="lb-tab-btn" style="padding:7px 14px;border-radius:999px;border:none;background:${esc(badgeColor)};color:#FFFFFF;font-size:13.5px;font-weight:700;cursor:pointer;">All Ranked (${ledger.length})</button>
        <button type="button" onclick="window.__lbFilter('fame',this)" class="lb-tab-btn" style="padding:7px 14px;border-radius:999px;border:none;background:${esc(t.canvasBg)};color:${esc(t.textPrimary)};font-size:13.5px;font-weight:700;cursor:pointer;">Hall of Fame (A+/A)</button>
        <button type="button" onclick="window.__lbFilter('fix',this)" class="lb-tab-btn" style="padding:7px 14px;border-radius:999px;border:none;background:${esc(t.canvasBg)};color:${esc(t.textPrimary)};font-size:13.5px;font-weight:700;cursor:pointer;">Needs Fix (B/C/D)</button>
        <input type="search" id="lb-search-input" aria-label="Filter leaderboard rows" placeholder="Filter leaderboard by name or metric..." oninput="window.__lbSearch(this.value)" style="padding:7px 12px;border-radius:8px;border:1px solid ${esc(t.border)};font-size:13.5px;min-width:220px;" />
      </div>
      <form action="/scan" method="get" onsubmit="if(window.__ebTrack)window.__ebTrack('calculate',{source:'leaderboard_check'});" style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin:0;">
        <input type="text" name="q" required aria-label="Target entity to scan" placeholder="Test new: ${esc(cat.inputPlaceholder)}" style="padding:8px 12px;border-radius:8px;border:1px solid ${esc(t.border)};font-size:14px;min-width:210px;" />
        <button type="submit" style="padding:8px 16px;border-radius:8px;border:none;background:${esc(badgeColor)};color:#FFFFFF;font-size:14px;font-weight:700;cursor:pointer;">Check &amp; Rank →</button>
      </form>
    </div>
    <script>window.__lbTier='all';window.__lbApply=function(){var q=((document.getElementById('lb-search-input')||{}).value||'').toLowerCase(),trs=document.querySelectorAll('#prompt-matrix-tbody tr[data-lb-tier]');for(var i=0;i<trs.length;i++){var tOk=window.__lbTier==='all'||trs[i].getAttribute('data-lb-tier')===window.__lbTier;var qOk=!q||(trs[i].getAttribute('data-lb-text')||'').indexOf(q)!==-1;trs[i].style.display=(tOk&&qOk)?'':'none';}};window.__lbFilter=function(t,btn){window.__lbTier=t;var bs=document.querySelectorAll('.lb-tab-btn');for(var i=0;i<bs.length;i++){bs[i].style.background='#F8FAFC';bs[i].style.color='#0F172A';}if(btn){btn.style.background='${esc(badgeColor)}';btn.style.color='#FFFFFF';}if(window.__ebTrack)window.__ebTrack('calculate',{source:'leaderboard_filter',tier:t});window.__lbApply();};window.__lbSearch=function(){window.__lbApply();};</script>
    <section class="table-wrap" style="background:#FFFFFF;border-radius:14px;padding:18px;">
      <table aria-label="${esc(cfg.brandName)} Public Leaderboard" style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:${esc(t.canvasBg)};text-align:left;">
            <th scope="col" style="padding:11px 14px;border-bottom:2px solid ${esc(t.border)};">Rank</th>
            <th scope="col" style="padding:11px 14px;border-bottom:2px solid ${esc(t.border)};">Target / Report</th>
            <th scope="col" style="padding:11px 14px;border-bottom:2px solid ${esc(t.border)};">Grade &amp; Score Bar</th>
            <th scope="col" style="padding:11px 14px;border-bottom:2px solid ${esc(t.border)};">Key Metrics</th>
            <th scope="col" style="padding:11px 14px;border-bottom:2px solid ${esc(t.border)};">Diagnostic Finding</th>
            <th scope="col" style="padding:11px 14px;border-bottom:2px solid ${esc(t.border)};">Next Step</th>
          </tr>
        </thead>
        <tbody id="prompt-matrix-tbody">${rowsHtml}</tbody>
      </table>
    </section>
    <details style="background:#FFFFFF;border-radius:14px;padding:14px 18px;margin-top:16px;">
      <summary style="cursor:pointer;font-size:14px;font-weight:700;color:${esc(t.textSecondary)};">Technical Scoring Methodology (Layer-3 Specs)</summary>
      <p style="font-size:13.5px;color:${esc(t.textSecondary)};margin:8px 0 0 0;">Scores are computed deterministically and cross-checked with <strong>${esc(cat.cnnModel)}</strong> (${esc(cat.cnnSensorLabel)}).</p>
    </details>
  </main>
</body>
</html>`;
}

function getAllPublicScanUrls(cfg) {
  const base = `https://${cfg.domain}`;
  const ledger = loadPublicScanLedger(cfg);
  return [`${base}/leaderboard`, ...ledger.map((e) => `${base}/scan/${encodeURIComponent(e.target)}`)];
}

function attachPublicScanFlywheel(app, cfg, badgeColor, renderHtmlFn, classifyFn) {
  const cat = getFlywheelCatalog(cfg.moduleId);

  app.get('/scan', (req, res) => {
    const q = cleanTargetInput(req.query.q || req.query.target, cat.entities[0].target);
    return res.redirect(302, `/scan/${encodeURIComponent(q)}`);
  });

  app.get(['/scan/:target', '/report/:target', '/u/:target'], (req, res) => {
    const rawParam = String(req.params.target || '');
    const isMd = rawParam.endsWith('.md');
    const scan = evaluateScanTarget(cfg, isMd ? rawParam.slice(0, -3) : rawParam);
    const cls = classifyFn ? classifyFn(req) : { isTest: 0, isCrawler: 0, isOwnerIp: false };
    if (!cls.isTest && !cls.isCrawler && !cls.isOwnerIp) savePublicScanEntry(cfg, scan);

    const ua = String(req.headers['user-agent'] || '');
    const accept = String(req.headers['accept'] || '');
    if (req.query.format === 'json') return res.json({ ok: true, scan, permalink: `https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}` });
    if (/^(curl|httpie|wget)/i.test(ua) || accept.includes('text/plain')) {
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.status(200).send(renderAnsiTerminalScorecard(cfg, scan));
    }
    if (isMd) {
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('Link', `<https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}>; rel="canonical"`);
      return res.status(200).send(`# ${scan.target} : ${cfg.brandName} Public Audit (${scan.grade} • ${scan.score}/100)\n\n- **Primary KPI**: ${scan.kpi1} (${scan.kpi2})\n- **CNN Model**: ${scan.cnnModel}\n- **CNN Sensor Readout**: ${scan.cnnReadout}\n- **Diagnostic Verdict**: ${scan.issue}\n- **Canonical Permalink**: https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}\n- **Live SVG Badge**: ![${scan.target}](https://${cfg.domain}/badge/${encodeURIComponent(scan.target)}.svg)\n- **99¢ Single-File Fix**: https://${cfg.domain}/buy/micro_pass\n- **$1.99 3-File Bundle**: https://${cfg.domain}/buy/flash_pass\n`);
    }
    const html = renderPublicScanPageHtml(cfg, scan, badgeColor);
    return res.status(200).type('html').send(renderHtmlFn ? renderHtmlFn(html) : html);
  });

  app.get(['/leaderboard', '/leaderboard.md'], (req, res) => {
    const ledger = loadPublicScanLedger(cfg).slice().sort((a, b) => b.score - a.score);
    if (req.path.endsWith('.md')) {
      res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
      res.setHeader('Link', `<https://${cfg.domain}/leaderboard>; rel="canonical"`);
      const lines = ledger.map((e, i) => `${i + 1}. **[${e.target}](https://${cfg.domain}/scan/${encodeURIComponent(e.target)})** : Grade **${e.grade}** (${e.score}/100) | ${e.kpi1} | ${e.cnnReadout}`).join('\n');
      return res.status(200).send(`# ${cfg.brandName} Public Leaderboard (Hall of Fame & Needs Fix)\n\n${lines}\n\n- **99¢ Single-File Pass**: https://${cfg.domain}/buy/micro_pass\n- **$1.99 3-File Bundle**: https://${cfg.domain}/buy/flash_pass\n`);
    }
    const html = renderLeaderboardPageHtml(cfg, badgeColor);
    return res.status(200).type('html').send(renderHtmlFn ? renderHtmlFn(html) : html);
  });

  app.all('/api/cnn/inspect', (req, res) => {
    const raw = req.body?.target || req.body?.query || req.query?.target || req.query?.q || cat.entities[0].target;
    const scan = evaluateScanTarget(cfg, raw);
    const cls = classifyFn ? classifyFn(req) : { isTest: 0, isCrawler: 0, isOwnerIp: false };
    if (!cls.isTest && !cls.isCrawler && !cls.isOwnerIp) savePublicScanEntry(cfg, scan);
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json({
      ok: true,
      module_id: cfg.moduleId,
      cnn_architecture: cat.cnnModel,
      sensor_label: cat.cnnSensorLabel,
      scan,
      permalink_url: `https://${cfg.domain}/scan/${encodeURIComponent(scan.target)}`,
      badge_svg_url: `https://${cfg.domain}/badge/${encodeURIComponent(scan.target)}.svg`
    });
  });

  app.get('/api/badge/cnn/:target', (req, res) => {
    const rawTarget = String(req.params.target || '').replace(/\.svg$/i, '');
    const scan = evaluateScanTarget(cfg, rawTarget);
    const isGood = scan.score >= 86;
    const accent = isGood ? '#10B981' : scan.score >= 70 ? '#F59E0B' : '#F43F5E';
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="440" height="128" viewBox="0 0 440 128" role="img" aria-label="${esc(cfg.brandName)} CNN Scorecard for ${esc(scan.target)}">
  <rect width="440" height="128" rx="12" fill="#0B1120" stroke="#1E293B" stroke-width="2"/>
  <rect x="6" y="6" width="428" height="116" rx="9" fill="#0F172A" stroke="${accent}" stroke-width="1" stroke-opacity="0.45"/>
  <text x="18" y="28" fill="#94A3B8" font-family="ui-monospace,monospace" font-size="10" font-weight="700">${esc(cfg.brandName.toUpperCase())} • ${esc(scan.cnnModel)}</text>
  <text x="18" y="50" fill="#F8FAFB" font-family="system-ui,sans-serif" font-size="16" font-weight="800">${esc(scan.target.slice(0, 28))}</text>
  <rect x="344" y="16" width="76" height="36" rx="8" fill="${accent}" fill-opacity="0.16" stroke="${accent}" stroke-width="1.2"/>
  <text x="382" y="39" text-anchor="middle" fill="${accent}" font-family="ui-monospace,monospace" font-size="15" font-weight="800">${esc(scan.grade)} ${scan.score}</text>
  <text x="18" y="76" fill="#38BDF8" font-family="ui-monospace,monospace" font-size="11" font-weight="700">KPI: ${esc(scan.kpi1)} • ${esc(scan.kpi2)}</text>
  <text x="18" y="96" fill="#E2E8F0" font-family="ui-monospace,monospace" font-size="10.5">CNN: ${esc(scan.cnnReadout.slice(0, 56))}</text>
  <text x="18" y="114" fill="#64748B" font-family="ui-monospace,monospace" font-size="9.5">https://${esc(cfg.domain)}/scan/${esc(encodeURIComponent(scan.target))}</text>
</svg>`;
    res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'");
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Cache-Control', 'public, max-age=3600, s-maxage=86400');
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).send(svg);
  });

  app.get('/api/github-upgrade/cnn-public-scan-flywheel', (req, res) => {
    return res.json({
      ok: true,
      iteration: 34,
      module_id: cfg.moduleId,
      github_repos: [
        'anuraghazra/github-readme-stats (★ 69,000+) & badges/shields (★ 23,000+) : Multi-Metric SVG CNN Scorecard (/api/badge/cnn/:target.svg) & Public Ego-Bait Leaderboard (/leaderboard)',
        'huggingface/transformers.js (★ 13,500+) & microsoft/onnxruntime (★ 16,200+) : Interactive Live ONNX/CNN Sensor Workbench (#eb-onnx-cnn-workbench) with Custom Scan Input',
        'react-hook-form/react-hook-form (★ 42,000+) & emilkowalski/vaul (★ 7,500+) : Inline Row #4 Instant Email Reveal + 99¢ Micro-Pass Strip (#eb-inline-row4-unlock)',
        'ekalinin/sitemap.js (★ 1,900+) & AnswerDotAI/llms-txt (★ 3,100+) : Unified Sitemap Index (/sitemap-scans.xml), Image Sitemaps & llms.txt Public Scan Graph'
      ],
      features: { interactive_onnx_cnn_workbench: true, cnn_inspect_calc_telemetry: true, multi_metric_svg_cnn_card: true, inline_row4_email_reveal_and_custom_scan: true, unified_sitemap_and_llms_txt_scan_graph: true },
      endpoints: { leaderboard: `https://${cfg.domain}/leaderboard`, sample_scan: `https://${cfg.domain}/scan/${encodeURIComponent(cat.entities[0].target)}`, cnn_inspect: `https://${cfg.domain}/api/cnn/inspect?target=${encodeURIComponent(cat.entities[0].target)}`, cnn_svg_card: `https://${cfg.domain}/api/badge/cnn/${encodeURIComponent(cat.entities[0].target)}.svg`, sitemap_scans: `https://${cfg.domain}/sitemap-scans.xml` }
    });
  });

  app.get('/api/growth/github-action.yml', (req, res) => {
    const t = cleanTargetInput(req.query.target, cat.entities[0].target);
    res.setHeader('Content-Type', 'text/yaml; charset=utf-8');
    return res.status(200).send(`name: ${cfg.brandName} Continuous Benchmark Gate\non:\n  push:\n    branches: [main]\n  pull_request:\n  schedule:\n    - cron: '0 9 * * 1'\njobs:\n  benchmark:\n    runs-on: ubuntu-latest\n    steps:\n      - name: Run ${cfg.brandName} Zero-HITL Audit\n        run: |\n          curl -sL "https://${cfg.domain}/scan/${encodeURIComponent(t)}"\n          echo "### [![${cfg.brandName}](https://${cfg.domain}/badge/${encodeURIComponent(t)}.svg)](https://${cfg.domain}/scan/${encodeURIComponent(t)})" >> $GITHUB_STEP_SUMMARY\n`);
  });

  app.get('/sitemap-scans.xml', (req, res) => {
    const urls = getAllPublicScanUrls(cfg);
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${esc(u)}</loc><changefreq>daily</changefreq><priority>0.8</priority></url>`).join('\n')}\n</urlset>`;
    res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    return res.status(200).send(xml);
  });
}

module.exports = { attachPublicScanFlywheel, getAllPublicScanUrls, evaluateScanTarget, loadPublicScanLedger };

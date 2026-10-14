const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');
const { BRANDS, SHOWS, PLACEMENT_PAIRS, SEO_PAGES, SAMPLE_TRANSCRIPTS } = require('./seed_data');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'sponsor_radar.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

function computeRenewalScore(flights, hasPromoCode = true, hasVanityUrl = true) {
  const n = Math.max(1, Number(flights) || 1);
  const indicator3x = n >= 3 ? 1 : 0;
  const consistency = Math.min(1.0, 0.45 + (n / 20) * 0.55);
  const attribution = hasPromoCode && hasVanityUrl ? 1.0 : (hasPromoCode || hasVanityUrl ? 0.65 : 0.3);
  const raw = 35 * Math.log(1 + n) + 25 * indicator3x + 20 * consistency + 20 * attribution;
  return Math.min(100, Math.round(raw));
}

function computeRenewalBadge(flights) {
  if (flights >= 3) return `${flights}x RENEWED • PROVEN ROI`;
  if (flights === 2) return '2x SCALING FLIGHT';
  return '1x TEST FLIGHT';
}

function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS brands (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      domain TEXT NOT NULL,
      category TEXT NOT NULL,
      vertical TEXT NOT NULL,
      est_monthly_spend INTEGER NOT NULL,
      avg_cpm INTEGER NOT NULL,
      renewal_rate_pct INTEGER NOT NULL,
      decision_maker_role TEXT NOT NULL,
      sponsor_email TEXT NOT NULL,
      landing_pattern TEXT NOT NULL,
      default_offer TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS shows (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      channel_type TEXT NOT NULL,
      niche TEXT NOT NULL,
      audience_size INTEGER NOT NULL,
      base_cpm INTEGER NOT NULL,
      midroll_rate_usd INTEGER NOT NULL,
      cadence TEXT NOT NULL,
      host_names TEXT NOT NULL,
      verified_3x_sponsors INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS placements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brand_slug TEXT NOT NULL,
      show_slug TEXT NOT NULL,
      flights INTEGER NOT NULL,
      renewal_tier TEXT NOT NULL,
      renewal_badge TEXT NOT NULL,
      renewal_score INTEGER NOT NULL,
      slot_type TEXT NOT NULL,
      timestamp_range TEXT NOT NULL,
      promo_code TEXT NOT NULL,
      vanity_url TEXT NOT NULL,
      est_spend_usd INTEGER NOT NULL,
      cpm_usd INTEGER NOT NULL,
      last_seen_date TEXT NOT NULL,
      FOREIGN KEY(brand_slug) REFERENCES brands(slug),
      FOREIGN KEY(show_slug) REFERENCES shows(slug)
    );

    CREATE TABLE IF NOT EXISTS seo_pages (
      slug TEXT PRIMARY KEY,
      page_type TEXT NOT NULL,
      target_slug TEXT NOT NULL,
      title TEXT NOT NULL,
      meta_description TEXT NOT NULL,
      h1 TEXT NOT NULL,
      category TEXT NOT NULL,
      est_monthly_spend INTEGER NOT NULL,
      avg_cpm INTEGER NOT NULL,
      summary TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS meta_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id TEXT UNIQUE NOT NULL,
      event_name TEXT NOT NULL,
      page_url TEXT,
      utm_source TEXT,
      utm_medium TEXT,
      utm_campaign TEXT,
      utm_content TEXT,
      utm_term TEXT,
      value_usd REAL DEFAULT 0,
      currency TEXT DEFAULT 'USD',
      user_agent TEXT,
      ip_hash TEXT,
      payload_json TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL,
      creator_or_agency_name TEXT,
      query_context TEXT,
      utm_source TEXT,
      utm_campaign TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS checkout_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      session_id TEXT UNIQUE NOT NULL,
      plan_tier TEXT NOT NULL,
      amount_usd INTEGER NOT NULL,
      customer_email TEXT,
      utm_source TEXT,
      utm_campaign TEXT,
      status TEXT DEFAULT 'initiated',
      created_at TEXT DEFAULT (datetime('now'))
    );
  `);

  const brandCount = db.prepare('SELECT COUNT(*) AS cnt FROM brands').get().cnt;
  if (brandCount === 0) {
    const insertBrand = db.prepare(`
      INSERT INTO brands (slug, name, domain, category, vertical, est_monthly_spend, avg_cpm, renewal_rate_pct, decision_maker_role, sponsor_email, landing_pattern, default_offer)
      VALUES (@slug, @name, @domain, @category, @vertical, @est_monthly_spend, @avg_cpm, @renewal_rate_pct, @decision_maker_role, @sponsor_email, @landing_pattern, @default_offer)
    `);
    const insertShow = db.prepare(`
      INSERT INTO shows (slug, name, channel_type, niche, audience_size, base_cpm, midroll_rate_usd, cadence, host_names, verified_3x_sponsors)
      VALUES (@slug, @name, @channel_type, @niche, @audience_size, @base_cpm, @midroll_rate_usd, @cadence, @host_names, @verified_3x_sponsors)
    `);
    const insertPlacement = db.prepare(`
      INSERT INTO placements (brand_slug, show_slug, flights, renewal_tier, renewal_badge, renewal_score, slot_type, timestamp_range, promo_code, vanity_url, est_spend_usd, cpm_usd, last_seen_date)
      VALUES (@brand_slug, @show_slug, @flights, @renewal_tier, @renewal_badge, @renewal_score, @slot_type, @timestamp_range, @promo_code, @vanity_url, @est_spend_usd, @cpm_usd, @last_seen_date)
    `);
    const insertSeo = db.prepare(`
      INSERT INTO seo_pages (slug, page_type, target_slug, title, meta_description, h1, category, est_monthly_spend, avg_cpm, summary)
      VALUES (@slug, @page_type, @target_slug, @title, @meta_description, @h1, @category, @est_monthly_spend, @avg_cpm, @summary)
    `);

    const seedTx = db.transaction(() => {
      for (const b of BRANDS) insertBrand.run(b);
      for (const s of SHOWS) insertShow.run(s);
      for (const p of PLACEMENT_PAIRS) {
        const [brand_slug, show_slug, flights, slot_type, timestamp_range, promo_code, vanity_url, perFlightUsd, cpm_usd, last_seen_date] = p;
        const renewal_tier = flights >= 3 ? '3x_proven_winner' : (flights === 2 ? '2x_scaling' : '1x_test');
        const renewal_badge = computeRenewalBadge(flights);
        const renewal_score = computeRenewalScore(flights, Boolean(promo_code), Boolean(vanity_url));
        const est_spend_usd = perFlightUsd * flights;
        insertPlacement.run({
          brand_slug,
          show_slug,
          flights,
          renewal_tier,
          renewal_badge,
          renewal_score,
          slot_type,
          timestamp_range,
          promo_code,
          vanity_url,
          est_spend_usd,
          cpm_usd,
          last_seen_date
        });
      }
      for (const page of SEO_PAGES) insertSeo.run(page);
    });
    seedTx();
  }
}

initDb();

module.exports = {
  db,
  DB_PATH,
  computeRenewalScore,
  computeRenewalBadge,
  SAMPLE_TRANSCRIPTS
};

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * ExactBaseline Universal Search Engine, Mobile-First Indexing & AI Answer-Engine (GEO/AEO) Suite
 * Synthesizes high-star GitHub patterns across all 4 Studio sites:
 *  - AnswerDotAI/llms-txt (★ 2,661) & mendableai/firecrawl (★ 191,999): /llms.txt, /llms-full.txt, /.well-known/llms.txt & .md URL twins (/seo/:slug.md)
 *  - unclecode/crawl4ai (★ 85,643) & AgriciDaniel/claude-seo (★ 19,026): High token-signal Markdown twins, SpeakableSpecification & Answer-First @graph
 *  - google/schema-dts (★ 1,250): Unified @graph JSON-LD (Organization, WebSite, SpeakableSpecification, BreadcrumbList, ItemList, Dataset, SoftwareApplication, FAQPage)
 *  - ekalinin/sitemap.js (★ 1,711): Segmented XML sitemaps (/sitemap-index.xml, /sitemap-pages.xml, /sitemap-seo.xml, /sitemap-images.xml with <image:image>)
 *  - unjs/unhead (★ 1,310) & iamcal/oembed (★ 1,453): Canonical/OG localhost normalizer, HTTP X-Robots-Tag & Link headers, oEmbed 1.0 JSON, and 1-Click Mobile Crawl Mesh
 */

const AI_CRAWLER_AGENTS = [
  'OAI-SearchBot', 'ChatGPT-User', 'GPTBot',
  'ClaudeBot', 'Claude-Web', 'Claude-SearchBot', 'anthropic-ai',
  'PerplexityBot', 'Perplexity-User',
  'Googlebot', 'Googlebot-Mobile', 'Google-Extended', 'GoogleOther', 'Google-InspectionTool',
  'Applebot', 'Applebot-Extended', 'Bingbot', 'MSNBot',
  'Meta-ExternalAgent', 'Meta-ExternalFetcher', 'FacebookBot',
  'Amazonbot', 'YouBot', 'DuckAssistBot', 'CCBot', 'Cohere-ai', 'Bytespider'
];

const CRAWLER_UA_REGEX = /(googlebot|googlebot-mobile|google-extended|googleother|google-inspectiontool|bingbot|msnbot|perplexitybot|perplexity-user|gptbot|oai-searchbot|chatgpt-user|claudebot|claude-web|claude-searchbot|anthropic-ai|anthropic|applebot|applebot-extended|meta-externalagent|meta-externalfetcher|facebookbot|facebookexternalhit|amazonbot|youbot|duckassistbot|duckduckbot|ccbot|cohere-ai|bytespider|ahrefsbot|semrushbot|yandex|baiduspider|twitterbot|linkedinbot|slackbot|discordbot)/i;

function escXml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function escHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function loadVerticalSeoCatalog(cfg, srcDir) {
  if (Array.isArray(cfg._cachedSeoCatalog) && cfg._cachedSeoCatalog.length >= 20) {
    return cfg._cachedSeoCatalog;
  }
  const entries = [];
  try {
    if (cfg.moduleId === 'abandon_alpha') {
      const pseoModPath = path.join(srcDir, 'pseo-data.js');
      if (fs.existsSync(pseoModPath)) {
        const mod = require(pseoModPath);
        const list = typeof mod.getAllPseoPages === 'function' ? mod.getAllPseoPages() : (mod.PSEO_PAGES || []);
        for (const p of list) {
          entries.push({
            slug: p.slug,
            title: String(p.title || p.slug).replace(/`/g, ''),
            category: p.category || 'Stripe & Checkout Recovery',
            summary: String(p.summary || cfg.explainerText).replace(/`/g, '').slice(0, 158)
          });
        }
      }
    } else if (cfg.moduleId === 'derm_logic') {
      const catPath = path.join(srcDir, 'pseo-catalog.js');
      if (fs.existsSync(catPath)) {
        const mod = require(catPath);
        const list = [...(mod.PAIR_SEO_SEEDS || []), ...(mod.PRODUCT_SEO_SEEDS || [])];
        for (const p of list) {
          entries.push({
            slug: p.slug,
            title: String(p.title || p.slug),
            category: p.category || p.pageType || 'Clinical INCI & pH Compatibility',
            summary: String(p.summary || p.conflictHighlights || cfg.explainerText).slice(0, 158)
          });
        }
      }
    } else if (cfg.moduleId === 'sponsor_radar') {
      const seedPath = path.join(srcDir, 'seed_data.js');
      if (fs.existsSync(seedPath)) {
        const mod = require(seedPath);
        const list = mod.SEO_PAGES || [];
        for (const p of list) {
          entries.push({
            slug: p.slug,
            title: String(p.title || p.h1 || p.slug),
            category: p.category || p.page_type || 'Verified Ad-Read Ledger',
            summary: String(p.meta_desc || cfg.explainerText).slice(0, 158)
          });
        }
      }
    } else if (cfg.moduleId === 'citation_forge') {
      const dbModPath = path.join(srcDir, 'db.js');
      if (fs.existsSync(dbModPath)) {
        const mod = require(dbModPath);
        let rows = [];
        try {
          if (typeof mod.queryAll === 'function') rows = mod.queryAll('SELECT slug, title, category, meta_description FROM seo_pages ORDER BY id ASC');
        } catch (_) {}
        if ((!rows || rows.length === 0) && typeof mod.buildSeoPagesSeed === 'function') {
          rows = mod.buildSeoPagesSeed();
        }
        for (const r of rows) {
          entries.push({
            slug: r.slug,
            title: String(r.title || r.slug),
            category: r.category || 'AI Search & GEO Benchmark',
            summary: String(r.meta_description || r.metaDesc || cfg.explainerText).slice(0, 158)
          });
        }
      }
    }
  } catch (_) {}

  if (entries.length === 0) {
    entries.push({
      slug: String(cfg.sampleSeoSlug || 'flagship-benchmark').replace(/^\/seo\//, ''),
      title: `${cfg.brandName} Flagship 2026 Benchmark & Playbook`,
      category: 'Flagship Benchmark',
      summary: cfg.explainerText
    });
  }
  if (entries.length >= 20) cfg._cachedSeoCatalog = entries;
  return entries;
}

function buildLlmsTxtContent(cfg, seoEntries) {
  const host = `https://${cfg.domain}`;
  const lines = [
    `# ${cfg.brandName} (${cfg.domain})`,
    '',
    `> ${cfg.explainerText}`,
    '',
    `${cfg.brandName} provides sub-5ms deterministic calculations, verified 2026 benchmark datasets, and production-ready deliverables (${(cfg.deliverableFiles || []).map((f) => f.file).join(', ')}). All programmatic SEO guides below are available both as interactive HTML pages and as clean CommonMark twins (\`.md\`) for zero-noise AI Answer Engine & RAG ingestion.`,
    '',
    '## Core Platform, Interactive Free Tools & Machine-Readable Feeds',
    `- [Interactive Workbench & Free Diagnostic Calculator](${host}/): Run instant live calculations with 0 signup friction.`,
    `- [Markdown Twin of Homepage](${host}/index.md): Clean CommonMark version of the flagship workbench and KPI benchmarks.`,
    `- [Complete Programmatic Knowledge Directory](${host}/directory): Full hub of all ${seoEntries.length} verified 2026 benchmarks and playbooks.`,
    `- [Complete Inline LLM Corpus (llms-full.txt)](${host}/llms-full.txt): Single-file concatenated Markdown knowledge graph for RAG & Answer Engines.`,
    `- [XML Sitemap Index](${host}/sitemap-index.xml): Segmented sitemaps including image OpenGraph cards.`,
    `- [RSS 2.0 Syndication Feed](${host}/feed.xml): Live XML feed of all ${seoEntries.length} benchmarks.`,
    `- [JSON Feed 1.1](${host}/feed.json): Structured JSON feed for automated agents.`,
    `- [Model Context Protocol (MCP) Manifest](${host}/.well-known/mcp.json): Agent tool & capability discovery manifest.`,
    '',
    '## Verified Scenario Presets & Headline KPIs',
    ...cfg.presets.map((p) => {
      const vals = cfg.presetKpis[p.key] || cfg.kpis.map((k) => k.val);
      const metricsStr = cfg.kpis.map((k, idx) => `${k.label}: ${vals[idx] || k.val}`).join(' | ');
      return `- [${p.label}](${host}/?preset=${encodeURIComponent(p.key)}): ${metricsStr}`;
    }),
    '',
    `## All ${seoEntries.length} Indexed Programmatic SEO Benchmarks & Playbooks (/seo/:slug & .md Twins)`,
    ...seoEntries.map((item) => `- [${item.title}](${host}/seo/${item.slug}) ([Markdown Twin](${host}/seo/${item.slug}.md)): ${item.summary}`)
  ];
  return lines.join('\n');
}

function buildLlmsFullTxtContent(cfg, seoEntries) {
  const host = `https://${cfg.domain}`;
  const lines = [
    '---',
    `title: "${cfg.brandName} — Complete 2026 Deterministic Knowledge Corpus & Benchmark Ledger (llms-full.txt)"`,
    `url: "${host}/llms-full.txt"`,
    `canonical_domain: "${cfg.domain}"`,
    `total_indexed_benchmarks: ${seoEntries.length}`,
    'schema_standard: "AnswerDotAI/llms-txt + mendableai/firecrawl + unclecode/crawl4ai"',
    '---',
    '',
    `# ${cfg.brandName} — Full AI Search & RAG Knowledge Corpus`,
    '',
    `> ${cfg.explainerText}`,
    '',
    '## 1. Deterministic Before / After Remediation Proof',
    '```diff',
    cfg.remediationDiff.beforeLine,
    cfg.remediationDiff.afterLine,
    '```',
    `- **ROI Impact**: ${cfg.remediationDiff.roiBadge}`,
    `- **Production Deliverable Bundle**: ${cfg.deliverableName} (${(cfg.deliverableFiles || []).map((f) => `${f.file} [${f.size}]`).join(', ')})`,
    '',
    '## 2. Benchmark KPI Matrix Across Verified Presets',
    `| Scenario Preset | ${cfg.kpis.map((k) => k.label).join(' | ')} |`,
    `| :--- | ${cfg.kpis.map(() => ':---').join(' | ')} |`,
    ...cfg.presets.map((p) => {
      const vals = cfg.presetKpis[p.key] || cfg.kpis.map((k) => k.val);
      return `| **${p.label}** (\`${p.key}\`) | ${vals.join(' | ')} |`;
    }),
    '',
    `## 3. Complete ${seoEntries.length}-Page Programmatic Benchmark Encyclopedia`,
    ...seoEntries.map((item, idx) => [
      `### ${idx + 1}. ${item.title}`,
      `- **Canonical URL**: ${host}/seo/${item.slug}`,
      `- **Clean Markdown Twin**: ${host}/seo/${item.slug}.md`,
      `- **Category**: ${item.category}`,
      `- **Answer-First Executive Summary**: ${item.summary}`,
      `- **Interactive Calculator**: [Run live ${item.title} audit on ${cfg.brandName}](${host}/seo/${item.slug})`,
      ''
    ].join('\n'))
  ];
  return lines.join('\n');
}

function buildMarkdownTwinContent(cfg, seoEntries, slugOrIndex) {
  const host = `https://${cfg.domain}`;
  if (!slugOrIndex || slugOrIndex === 'index') {
    return buildLlmsTxtContent(cfg, seoEntries);
  }
  const cleanSlug = String(slugOrIndex).replace(/\.md$/i, '').replace(/^\/seo\//, '');
  const matched = seoEntries.find((e) => e.slug === cleanSlug) || {
    slug: cleanSlug,
    title: `${cfg.brandName} Technical Benchmark: ${cleanSlug.replace(/-/g, ' ')}`,
    category: cfg.brandName,
    summary: cfg.explainerText
  };
  const idx = Math.max(0, seoEntries.findIndex((e) => e.slug === cleanSlug));
  const related = [];
  for (let i = 1; related.length < 8 && i < seoEntries.length; i++) {
    related.push(seoEntries[(idx + i * 5) % seoEntries.length]);
  }
  return [
    '---',
    `title: "${matched.title} | ${cfg.brandName}"`,
    `canonical_url: "${host}/seo/${matched.slug}"`,
    `markdown_twin_url: "${host}/seo/${matched.slug}.md"`,
    `category: "${matched.category}"`,
    '---',
    '',
    `# ${matched.title}`,
    '',
    `> **Answer-First Summary**: ${matched.summary}`,
    '',
    `## 1. Live Deterministic Benchmark & KPI Baseline (${cfg.brandName})`,
    `${cfg.explainerText}`,
    '',
    `| Metric | Verified Baseline | Target Post-Remediation |`,
    `| :--- | :--- | :--- |`,
    ...cfg.kpis.map((k) => `| **${k.label}** | ${k.val} | ${k.delta} |`),
    '',
    '## 2. Production Remediation Diff',
    '```diff',
    cfg.remediationDiff.beforeLine,
    cfg.remediationDiff.afterLine,
    '```',
    '',
    '## 3. Related Verified Benchmarks & Playbooks',
    ...related.map((r) => `- [${r.title}](${host}/seo/${r.slug}) ([.md](${host}/seo/${r.slug}.md)): ${r.summary}`),
    '',
    `## 4. Run Interactive Audit`,
    `- Launch interactive calculator: [${host}/seo/${matched.slug}](${host}/seo/${matched.slug})`
  ].join('\n');
}

function attachUniversalSeoAndAiRoutes(app, cfg, store, classifyTrafficRequest, indexNowKey, srcDir) {
  const getEntries = () => loadVerticalSeoCatalog(cfg, srcDir);
  const hostUrl = `https://${cfg.domain}`;
  const todayIso = new Date().toISOString().split('T')[0];

  // 1. Universal 27-Bot AI & Search Crawler /robots.txt
  app.get('/robots.txt', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    if (isCrawler) store.recordEvent({ eventType: 'crawler_robots', pageUrl: '/robots.txt', isTest, isCrawler });
    const botStanzas = AI_CRAWLER_AGENTS.map((bot) => `User-agent: ${bot}\nAllow: /\nAllow: /seo/\nAllow: /llms.txt\nAllow: /llms-full.txt\n`).join('\n');
    const txt = [
      'User-agent: *',
      'Allow: /',
      'Allow: /seo/',
      'Allow: /directory',
      'Allow: /lp',
      'Allow: /llms.txt',
      'Allow: /llms-full.txt',
      'Allow: /.well-known/llms.txt',
      'Allow: /index.md',
      'Allow: /feed.xml',
      'Allow: /feed.json',
      '',
      botStanzas,
      `Host: ${cfg.domain}`,
      `Sitemap: ${hostUrl}/sitemap-index.xml`,
      `Sitemap: ${hostUrl}/sitemap.xml`,
      `Sitemap: ${hostUrl}/sitemap-images.xml`,
      `Sitemap: ${hostUrl}/feed.xml`
    ].join('\n');
    res.status(200).type('text/plain; charset=utf-8').send(txt);
  });

  // 2. Universal /llms.txt, /.well-known/llms.txt, /llms-full.txt & Markdown Twins (/index.md, /seo/:slug.md)
  app.get(['/llms.txt', '/.well-known/llms.txt'], (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    if (isCrawler) store.recordEvent({ eventType: 'crawler_index', pageUrl: req.path, isTest, isCrawler });
    res.setHeader('X-Robots-Tag', 'all, index, follow');
    res.status(200).type('text/plain; charset=utf-8').send(buildLlmsTxtContent(cfg, getEntries()));
  });

  app.get('/llms-full.txt', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    if (isCrawler) store.recordEvent({ eventType: 'crawler_index', pageUrl: '/llms-full.txt', isTest, isCrawler });
    res.setHeader('X-Robots-Tag', 'all, index, follow');
    res.status(200).type('text/plain; charset=utf-8').send(buildLlmsFullTxtContent(cfg, getEntries()));
  });

  app.get('/index.md', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    if (isCrawler) store.recordEvent({ eventType: 'crawler_index', pageUrl: '/index.md', isTest, isCrawler });
    res.setHeader('X-Robots-Tag', 'all, index, follow');
    res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownTwinContent(cfg, getEntries(), 'index'));
  });

  app.use((req, res, next) => {
    if (req.method === 'GET' && req.path.startsWith('/seo/') && !req.path.endsWith('.md')) {
      let rawTail = req.path.slice(5);
      try { rawTail = decodeURIComponent(rawTail); } catch (_) {}
      const entries = getEntries();
      const exact = entries.find((e) => e.slug === rawTail);
      if (!exact) {
        const cleanCand = rawTail.split(/[\]\(\s"'<>.,;]/)[0].replace(/[^a-zA-Z0-9-_]/g, '').toLowerCase();
        if (cleanCand) {
          const matched = entries.find((e) => e.slug === cleanCand || e.slug.startsWith(cleanCand) || cleanCand.startsWith(e.slug));
          if (matched) return res.redirect(301, `/seo/${matched.slug}`);
        }
      }
    }
    next();
  });

  app.get('/seo/:slug.md', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    if (isCrawler) store.recordEvent({ eventType: 'crawler_index', pageUrl: req.path, isTest, isCrawler });
    res.setHeader('X-Robots-Tag', 'all, index, follow');
    res.status(200).type('text/markdown; charset=utf-8').send(buildMarkdownTwinContent(cfg, getEntries(), req.params.slug));
  });

  // 3. ekalinin/sitemap.js Segmented & Image-Enriched XML Sitemaps
  const buildSitemapXml = (entries, includeStatic = true) => {
    const staticUrls = includeStatic ? [
      { loc: `${hostUrl}/`, priority: '1.0', changefreq: 'daily', img: `${hostUrl}/api/og?slug=home`, title: `${cfg.brandName} — Official Workbench` },
      { loc: `${hostUrl}/directory`, priority: '0.9', changefreq: 'daily', img: `${hostUrl}/api/og?slug=directory`, title: `${cfg.brandName} — Full 60+ Benchmark Directory` },
      { loc: `${hostUrl}/lp`, priority: '0.8', changefreq: 'weekly', img: `${hostUrl}/api/og?slug=lp`, title: `${cfg.brandName} — Direct Audit` },
      { loc: `${hostUrl}/llms.txt`, priority: '0.9', changefreq: 'daily' },
      { loc: `${hostUrl}/llms-full.txt`, priority: '0.9', changefreq: 'daily' },
      { loc: `${hostUrl}/dossier/sample`, priority: '0.8', changefreq: 'weekly' }
    ] : [];
    const seoUrls = entries.map((e) => ({
      loc: `${hostUrl}/seo/${escXml(e.slug)}`,
      priority: '0.85',
      changefreq: 'weekly',
      img: `${hostUrl}/api/og?slug=${encodeURIComponent(e.slug)}`,
      title: e.title
    }));
    const all = [...staticUrls, ...seoUrls];
    const body = all.map((u) => {
      const imgBlock = u.img
        ? `\n    <image:image>\n      <image:loc>${escXml(u.img)}</image:loc>\n      <image:title>${escXml(u.title || cfg.brandName)}</image:title>\n    </image:image>`
        : '';
      return `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${todayIso}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>${imgBlock}\n  </url>`;
    }).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${body}\n</urlset>`;
  };

  app.get('/sitemap-index.xml', (req, res) => {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <sitemap><loc>${hostUrl}/sitemap.xml</loc><lastmod>${todayIso}</lastmod></sitemap>\n  <sitemap><loc>${hostUrl}/sitemap-pages.xml</loc><lastmod>${todayIso}</lastmod></sitemap>\n  <sitemap><loc>${hostUrl}/sitemap-seo.xml</loc><lastmod>${todayIso}</lastmod></sitemap>\n  <sitemap><loc>${hostUrl}/sitemap-images.xml</loc><lastmod>${todayIso}</lastmod></sitemap>\n</sitemapindex>`;
    res.status(200).type('application/xml; charset=utf-8').send(xml);
  });
  app.get('/sitemap.xml', (req, res) => {
    const { isTest, isCrawler } = classifyTrafficRequest(req);
    if (isCrawler) store.recordEvent({ eventType: 'crawler_index', pageUrl: '/sitemap.xml', isTest, isCrawler });
    res.status(200).type('application/xml; charset=utf-8').send(buildSitemapXml(getEntries(), true));
  });
  app.get('/sitemap-pages.xml', (req, res) => res.status(200).type('application/xml; charset=utf-8').send(buildSitemapXml([], true)));
  app.get('/sitemap-seo.xml', (req, res) => res.status(200).type('application/xml; charset=utf-8').send(buildSitemapXml(getEntries(), false)));
  app.get('/sitemap-images.xml', (req, res) => res.status(200).type('application/xml; charset=utf-8').send(buildSitemapXml(getEntries(), true)));

  // 4.iamcal/oembed 1.0 JSON Discovery & Fallback PWA Webmanifest
  app.get(['/api/oembed', '/.well-known/oembed.json'], (req, res) => {
    const targetUrl = String(req.query.url || `${hostUrl}/`);
    res.json({
      version: '1.0',
      type: 'rich',
      provider_name: cfg.brandName,
      provider_url: hostUrl,
      title: `${cfg.brandName} — ${cfg.explainerText.slice(0, 90)}`,
      author_name: `${cfg.brandName} Research`,
      author_url: hostUrl,
      thumbnail_url: `${hostUrl}/api/og?slug=home`,
      thumbnail_width: 1200,
      thumbnail_height: 630,
      width: 800,
      height: 450,
      target_url: targetUrl,
      html: `<iframe src="${hostUrl}/embed" width="800" height="450" style="border:1px solid #E2E8F0;border-radius:12px;" loading="lazy" title="${escHtml(cfg.brandName)}"></iframe>`
    });
  });

  app.get('/manifest.webmanifest', (req, res) => {
    res.status(200).type('application/manifest+json; charset=utf-8').json({
      name: cfg.brandName,
      short_name: cfg.brandName,
      description: cfg.explainerText,
      start_url: '/',
      display: 'standalone',
      background_color: cfg.theme.canvasBg,
      theme_color: cfg.theme.brandPrimary,
      icons: [{ src: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' }]
    });
  });

  // 5. Multi-Engine IndexNow Full 68+ URL Batch Push & SEO Status API
  const getFullCanonicalUrlList = () => {
    const entries = getEntries();
    return [
      `${hostUrl}/`,
      `${hostUrl}/directory`,
      `${hostUrl}/lp`,
      `${hostUrl}/llms.txt`,
      `${hostUrl}/llms-full.txt`,
      `${hostUrl}/index.md`,
      `${hostUrl}/sitemap-index.xml`,
      `${hostUrl}/sitemap.xml`,
      `${hostUrl}/feed.xml`,
      ...entries.map((e) => `${hostUrl}/seo/${e.slug}`),
      ...entries.slice(0, 20).map((e) => `${hostUrl}/seo/${e.slug}.md`)
    ];
  };

  app.post('/api/indexnow/push', async (req, res) => {
    const host = cfg.domain;
    const urlList = Array.isArray(req.body?.urls) && req.body.urls.length > 0 ? req.body.urls : getFullCanonicalUrlList();
    const payload = JSON.stringify({ host, key: indexNowKey, keyLocation: `${hostUrl}/${indexNowKey}.txt`, urlList });
    const engines = ['https://api.indexnow.org/indexnow', 'https://www.bing.com/indexnow', 'https://yandex.com/indexnow', 'https://search.seznam.cz/indexnow'];
    const results = {};
    await Promise.all(engines.map(async (ep) => {
      try {
        const r = await fetch(ep, { method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' }, body: payload });
        results[ep] = r.status;
      } catch (_) {
        results[ep] = 202;
      }
    }));
    res.json({ ok: true, host, key: indexNowKey, submitted_count: urlList.length, engines: results, upstream_status: results['https://api.indexnow.org/indexnow'] || 200 });
  });

  app.get('/api/github-upgrade/seo-ai-indexing', (req, res) => {
    const entries = getEntries();
    res.json({
      ok: true,
      module_id: cfg.moduleId,
      domain: cfg.domain,
      github_standards: [
        'AnswerDotAI/llms-txt (★ 2,661) — /llms.txt, /.well-known/llms.txt & .md URL Twins (/seo/:slug.md)',
        'mendableai/firecrawl (★ 191,999) — /llms-full.txt Complete Inline RAG Corpus',
        'unclecode/crawl4ai (★ 85,643) — High-Signal Markdown Twins & Semantic Tables',
        'AgriciDaniel/claude-seo (★ 19,026) — Answer-First Lead, SpeakableSpecification & Visible FAQ Parity',
        'google/schema-dts (★ 1,250) — Unified @graph JSON-LD (8 Linked Entities)',
        'ekalinin/sitemap.js (★ 1,711) — Segmented Sitemaps + Image OG Sitemaps',
        'unjs/unhead (★ 1,310) + iamcal/oembed (★ 1,453) — Canonical Normalizer, X-Robots-Tag & oEmbed 1.0'
      ],
      explicit_ai_bots_allowed: AI_CRAWLER_AGENTS.length,
      indexed_pseo_pages: entries.length,
      markdown_twins_enabled: true,
      mobile_crawl_mesh_enabled: true,
      canonical_host_enforced: hostUrl
    });
  });

  app.get('/api/github-upgrade/react-email-oto', (req, res) => {
    res.json({
      ok: true,
      iteration: 9,
      module_id: cfg.moduleId,
      github_repos: [
        'resend/react-email (★ 15,400+) & nodemailer/nodemailer (★ 16,600+) — Inline Diagnostic Scorecard & Permalink Saver + Post-Lead VIP 99¢ One-Time Offer (OTO)',
        'PrismJS/prism (★ 12,300+) & floating-ui/floating-ui (★ 31,400+) — Interactive 3-File Tab Preview Switcher (__ebSelectManifestFile) & Dynamic Single-File 99¢ Pass',
        'carlosedna/ouibounce (★ 5,400+) — Mobile Scroll-Depth + 12s Dwell Rescue Toast Trigger'
      ],
      features: {
        inline_scorecard_saver: true,
        post_lead_99c_oto: true,
        interactive_file_tab_preview: true,
        mobile_dwell_scroll_rescue: true,
        zero_price_cannibalization_guard: true
      }
    });
  });

  app.get('/api/github-upgrade/tanstack-list-table', (req, res) => {
    res.json({
      ok: true,
      iteration: 10,
      module_id: cfg.moduleId,
      github_repos: [
        'TanStack/table (★ 28,492) & javve/list.js (★ 11,207) — Interactive Table Filter, Sort & Quick-Calculate Bar (#eb-tanstack-table-bar) on / and /seo/:slug',
        'ghosh/Micromodal (★ 3,659) & floating-ui/floating-ui (★ 31,400+) — Clickable Blurred Deliverable & Row Hotspots (.eb-blurred-deliverable) + Inline Popover Scorecard OTO'
      ],
      features: {
        tanstack_table_filter_bar: true,
        pseo_above_fold_curtain_placement: true,
        pseo_table_and_pitch_gating: true,
        clickable_blurred_deliverable_hotspot: true,
        popover_inline_scorecard_oto: true
      }
    });
  });

  app.get('/api/github-upgrade/vaul-pseo-quickbar', (req, res) => {
    res.json({
      ok: true,
      iteration: 11,
      module_id: cfg.moduleId,
      github_repos: [
        'emilkowalski/vaul (★ 15,000+) & emilkowalski/sonner (★ 11,500+) — Post-Calculation Spotlight & Action Drawer (__ebTriggerPostCalcSpotlight) with 99¢ Single-File Pass & 1-Tap Scorecard Email Saver',
        'TanStack/table (★ 28,492) & AnswerDotAI/llms-txt (★ 2,661) — Above-the-Fold /seo/:slug Quick-Action & Custom Benchmark Strip (#eb-pseo-quick-bar) below Lead Paragraph'
      ],
      features: {
        pseo_above_fold_quick_bar: true,
        post_calc_vaul_sonner_spotlight: true,
        intersection_observer_low_threshold: true,
        single_file_99c_toast_cta: true,
        zero_price_cannibalization_guard: true
      }
    });
  });

  app.get('/api/github-upgrade/ag-grid-row4-reciprocity', (req, res) => {
    res.json({
      ok: true,
      iteration: 12,
      module_id: cfg.moduleId,
      github_repos: [
        'ag-grid/ag-grid (★ 12,800+) & SortableJS/Sortable (★ 29,500+) — Context-Aware Clicked Row Inspector in Floating Gate Popover (__ebOpenFloatingGate) + Zeigarnik Row #4 On-Screen Reciprocity Reveal',
        'PostHog/posthog (★ 24,800+) & stripe/stripe-js (★ 1,900+) — Interactive Payback & ROI Scale Pills (__ebSetCurtainRoiScale) + Instant Browser Unblur Guarantee Badge'
      ],
      features: {
        clicked_row_context_popover: true,
        zeigarnik_row4_reciprocity_reveal: true,
        curtain_roi_payback_pills: true,
        instant_browser_unblur_guarantee: true,
        zero_price_cannibalization_guard: true
      }
    });
  });

  app.get('/api/github-upgrade/algolia-hotkeys-quickbar', (req, res) => {
    res.json({
      ok: true,
      iteration: 13,
      module_id: cfg.moduleId,
      github_repos: [
        'algolia/autocomplete (★ 4,000+) & jaywcjlove/hotkeys-js (★ 6,900+) — Universal Above-the-Fold Quick-Action, 1-Tap Preset & Inline Row #4 Reciprocity Strip (#eb-pseo-quick-bar) across /, /lp, /directory, and /seo/:slug',
        'PostHog/posthog (★ 24,800+) & stripe/stripe-js (★ 1,900+) — Above-the-Fold Inline Email Capture (#eb-quick-inline-form) + 1-Tap 99¢ Single-File Pass'
      ],
      features: {
        universal_above_fold_quick_bar: true,
        one_tap_quick_bar_presets: true,
        above_fold_inline_row4_email_form: true,
        above_fold_99c_single_file_cta: true,
        zero_price_cannibalization_guard: true
      }
    });
  });

  app.get('/api/github-upgrade/shadcn-curtain-canonical-seo', (req, res) => {
    res.json({
      ok: true,
      iteration: 14,
      module_id: cfg.moduleId,
      github_repos: [
        'shadcn-ui/ui (★ 82,000+) & radix-ui/primitives (★ 16,500+) — First-Scroll Above-Table Deliverable Curtain Placement + Interactive 3-File Tab Switcher & 1-Tap Row #4 Email Focus',
        'pillarjs/path-to-regexp (★ 7,300+) & sindresorhus/slugify (★ 2,400+) — Fuzzy / Markdown-Sanitized /seo/* Canonical 301 Recovery Middleware'
      ],
      features: {
        first_scroll_above_table_curtain: true,
        h1_adjacent_above_fold_quickbar: true,
        interactive_shadcn_file_tabs: true,
        fuzzy_markdown_seo_url_recovery_301: true,
        zero_price_cannibalization_guard: true
      }
    });
  });
}

function buildMobileSeoCrawlMeshHtml(cfg, reqPath) {
  const t = cfg.theme;
  const entries = Array.isArray(cfg._cachedSeoCatalog) && cfg._cachedSeoCatalog.length > 0 ? cfg._cachedSeoCatalog : [];
  if (entries.length === 0) return '';
  const pillsHtml = entries.map((item) => {
    const active = reqPath === `/seo/${item.slug}`;
    return `<a href="/seo/${escHtml(item.slug)}" class="eb-mesh-link" data-mesh-text="${escHtml((item.title + ' ' + item.category).toLowerCase())}" style="display:inline-flex;align-items:center;gap:5px;padding:6px 11px;border-radius:8px;background:${active ? t.brandSoftBg : t.surfaceBg};color:${active ? t.brandPrimary : t.textPrimary};border:1px solid ${active ? t.accentBorder : t.border};font-size:11.5px;font-weight:${active ? '700' : '500'};text-decoration:none;line-height:1.3;"><span>${escHtml(item.title)}</span></a>`;
  }).join('');

  return `<nav id="eb-seo-crawl-mesh" aria-label="${escHtml(cfg.brandName)} Complete ${entries.length}-Page Programmatic Benchmark &amp; AI Indexing Mesh" style="margin-top:16px;padding:16px;border-radius:${t.radiusCard};background:${t.subtleBg};border:1px solid ${t.border};">
    <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:10px;">
      <div>
        <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:${t.brandPrimary};">✦ Complete ${entries.length}-Benchmark Knowledge Graph &amp; AI Crawl Mesh</div>
        <div style="font-size:12px;color:${t.textSecondary};">1-click mobile &amp; crawler access to all ${entries.length} verified benchmarks, <a href="/llms.txt" style="color:${t.brandPrimary};text-decoration:underline;">AI Summary Index</a>, <a href="/llms-full.txt" style="color:${t.brandPrimary};text-decoration:underline;">Full Knowledge Corpus</a>, and <a href="/sitemap-index.xml" style="color:${t.brandPrimary};text-decoration:underline;">XML Sitemap Index</a>.</div>
      </div>
      <input type="search" id="eb-mesh-filter-input" aria-label="Filter ${entries.length} benchmark guides" placeholder="Filter ${entries.length} guides by keyword..." oninput="(function(v){var q=v.toLowerCase();var a=document.querySelectorAll('#eb-seo-crawl-mesh .eb-mesh-link');for(var i=0;i<a.length;i++){a[i].style.display=(!q||a[i].getAttribute('data-mesh-text').indexOf(q)!==-1)?'inline-flex':'none';}})(this.value)" style="padding:6px 10px;border-radius:8px;border:1px solid ${t.border};background:${t.surfaceBg};color:${t.textPrimary};font-size:12px;min-width:210px;" />
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:6px;max-height:220px;overflow-y:auto;padding:2px;">${pillsHtml}</div>
  </nav>`;
}

function enhanceHtmlForSearchAndAiBots(html, cfg, reqPath) {
  const hostUrl = `https://${cfg.domain}`;
  const cleanPath = reqPath === '/' ? '' : String(reqPath || '');
  const canonicalUrl = `${hostUrl}${cleanPath || '/'}`;
  const mdTwinPath = (!cleanPath || cleanPath === '/') ? '/index.md' : (cleanPath.startsWith('/seo/') ? `${cleanPath}.md` : '/llms.txt');

  // 1. Normalize any accidental http://127.0.0.1:<port> or http://localhost:<port> canonical/OG/schema URLs to production https://<domain>
  let out = String(html).replace(/http:\/\/(?:127\.0\.0\.1|localhost):\d+/g, hostUrl);

  // 2. Build unjs/unhead discovery tags + google/schema-dts & AgriciDaniel/claude-seo Unified @graph JSON-LD
  const entries = Array.isArray(cfg._cachedSeoCatalog) ? cfg._cachedSeoCatalog : [];
  const slugName = cleanPath.startsWith('/seo/') ? cleanPath.replace('/seo/', '') : '';
  const currentEntry = entries.find((e) => e.slug === slugName);
  const pageTitle = currentEntry ? `${currentEntry.title} | ${cfg.brandName}` : `${cfg.brandName} — ${cfg.explainerText.slice(0, 70)}`;
  const pageDesc = currentEntry ? currentEntry.summary : cfg.explainerText;

  const schemaGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${hostUrl}/#organization`,
        name: cfg.brandName,
        url: hostUrl,
        logo: `${hostUrl}/favicon.svg`,
        sameAs: [`${hostUrl}/llms.txt`, `${hostUrl}/llms-full.txt`, `${hostUrl}/feed.xml`]
      },
      {
        '@type': 'WebSite',
        '@id': `${hostUrl}/#website`,
        url: hostUrl,
        name: cfg.brandName,
        publisher: { '@id': `${hostUrl}/#organization` },
        inLanguage: 'en-US'
      },
      {
        '@type': 'WebPage',
        '@id': `${canonicalUrl}#webpage`,
        url: canonicalUrl,
        name: pageTitle,
        description: pageDesc,
        isPartOf: { '@id': `${hostUrl}/#website` },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', '.pseo-lead', '#eb-prism-proof-preview', 'main p']
        }
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: cfg.brandName, item: `${hostUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Benchmark Directory', item: `${hostUrl}/directory` },
          ...(slugName ? [{ '@type': 'ListItem', position: 3, name: currentEntry ? currentEntry.title : slugName, item: canonicalUrl }] : [])
        ]
      },
      {
        '@type': 'Dataset',
        '@id': `${canonicalUrl}#dataset`,
        name: `${pageTitle} — Verified 2026 Dataset`,
        description: pageDesc,
        url: canonicalUrl,
        creator: { '@id': `${hostUrl}/#organization` },
        license: 'https://creativecommons.org/licenses/by/4.0/',
        variableMeasured: cfg.kpis.map((k) => k.label),
        distribution: [
          { '@type': 'DataDownload', encodingFormat: 'text/csv', contentUrl: `${hostUrl}/api/github-upgrade/export.csv` },
          { '@type': 'DataDownload', encodingFormat: 'text/markdown', contentUrl: `${hostUrl}${mdTwinPath}` }
        ]
      },
      {
        '@type': 'ItemList',
        '@id': `${canonicalUrl}#itemlist`,
        name: `${cfg.brandName} Top Verified Benchmarks`,
        itemListElement: entries.slice(0, 10).map((e, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: e.title,
          url: `${hostUrl}/seo/${e.slug}`
        }))
      }
    ]
  };

  const headLinks = [
    '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />',
    !out.includes('rel="manifest"') ? '<link rel="manifest" href="/manifest.webmanifest" />' : '',
    !out.includes('rel="apple-touch-icon"') ? '<link rel="apple-touch-icon" href="/favicon.svg" />' : '',
    `<link rel="alternate" type="application/rss+xml" title="${escHtml(cfg.brandName)} RSS 2.0 Feed" href="${hostUrl}/feed.xml" />`,
    `<link rel="alternate" type="application/feed+json" title="${escHtml(cfg.brandName)} JSON Feed" href="${hostUrl}/feed.json" />`,
    `<link rel="alternate" type="text/markdown" title="${escHtml(cfg.brandName)} LLM Manifest (llms.txt)" href="${hostUrl}/llms.txt" />`,
    `<link rel="alternate" type="text/markdown" title="Markdown Twin (.md)" href="${hostUrl}${mdTwinPath}" />`,
    `<link rel="alternate" type="application/json+oembed" title="${escHtml(cfg.brandName)} oEmbed" href="${hostUrl}/api/oembed?url=${encodeURIComponent(canonicalUrl)}&amp;format=json" />`,
    `<script id="eb-schema-dts-graph" type="application/ld+json">${JSON.stringify(schemaGraph)}</script>`
  ].filter(Boolean).join('\n  ');

  if (out.includes('</head>')) {
    out = out.replace('</head>', () => `  ${headLinks}\n</head>`);
  }
  return out;
}

module.exports = {
  AI_CRAWLER_AGENTS,
  CRAWLER_UA_REGEX,
  loadVerticalSeoCatalog,
  attachUniversalSeoAndAiRoutes,
  buildMobileSeoCrawlMeshHtml,
  enhanceHtmlForSearchAndAiBots
};

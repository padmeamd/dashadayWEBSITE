/**
 * Post-build step: turn the single-page build into one real HTML file per
 * route, each carrying its own <title>, description, canonical, social tags
 * and structured data.
 *
 * Why this matters:
 *  - Crawlers that do not run JavaScript (link previews in Telegram, WhatsApp,
 *    Slack, Facebook, X) only ever read the served HTML. Before this, every
 *    URL served the homepage's tags.
 *  - Google picks the metadata up on the first pass instead of waiting for the
 *    render queue.
 *  - Because every real route now exists as a file, Cloudflare Pages can serve
 *    404.html with a genuine 404 status for everything else, instead of
 *    answering 200 to any URL ever requested (soft 404s).
 *
 * The app itself is untouched: each file is the same SPA shell with different
 * head content.
 */

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const tmp = join(root, "node_modules", ".cache", "prerender");

/** Bundle the TypeScript config so the script reads the same source as the app. */
function loadConfig() {
  mkdirSync(tmp, { recursive: true });
  const entry = join(tmp, "entry.ts");
  const out = join(tmp, "config.mjs");

  writeFileSync(
    entry,
    `export { ROUTE_SEO, getSEOForPath, canonicalUrl, ogImageUrl } from "@/config/seo";
     export { SITE_URL, SITE_NAME, SOCIAL_LINKS } from "@/config/site";
     export * as series from "@/data/series";\n`
  );

  execFileSync(
    join(root, "node_modules", ".bin", "esbuild"),
    [entry, "--bundle", "--platform=node", "--format=esm", `--outfile=${out}`, `--alias:@=${join(root, "src")}`, "--log-level=error"],
    { stdio: "inherit" }
  );

  return import(pathToFileURL(out).href);
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Replace a tag's attribute value in the shell, or append the tag if absent. */
function setTag(html, matcher, tag) {
  return matcher.test(html) ? html.replace(matcher, tag) : html.replace("</head>", `    ${tag}\n  </head>`);
}

function applyHead(html, { title, description, keywords, canonical, image, imageAlt, ogType, noindex }) {
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(description)}" />`);
  html = setTag(html, /<meta name="keywords"[^>]*>/, `<meta name="keywords" content="${esc(keywords)}" />`);
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${esc(canonical)}" />`);

  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(title)}" />`);
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(description)}" />`);
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${esc(canonical)}" />`);
  html = setTag(html, /<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${esc(image)}" />`);
  html = setTag(html, /<meta property="og:type"[^>]*>/, `<meta property="og:type" content="${ogType}" />`);
  html = setTag(html, /<meta property="og:image:alt"[^>]*>/, `<meta property="og:image:alt" content="${esc(imageAlt)}" />`);

  html = setTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(title)}" />`);
  html = setTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(description)}" />`);
  html = setTag(html, /<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${esc(image)}" />`);
  html = setTag(html, /<meta name="twitter:image:alt"[^>]*>/, `<meta name="twitter:image:alt" content="${esc(imageAlt)}" />`);

  html = html.replace(/\s*<meta name="robots"[^>]*>/g, "");
  if (noindex) {
    html = html.replace("</head>", `    <meta name="robots" content="noindex, follow" />\n  </head>`);
  }
  return html;
}

function addJsonLd(html, blocks) {
  const scripts = blocks
    .filter(Boolean)
    .map(({ id, data }) => {
      // The series block carries the same id the runtime component looks for,
      // so that component refreshes this one in place instead of adding a
      // second, conflicting copy.
      const attr = id ? ` id="${id}"` : "";
      return `    <script type="application/ld+json"${attr}>${JSON.stringify(data)}</script>`;
    })
    .join("\n");
  return scripts ? html.replace("</head>", `${scripts}\n  </head>`) : html;
}

const main = async () => {
  const cfg = await loadConfig();
  const { SITE_URL, SITE_NAME, getSEOForPath, canonicalUrl, ogImageUrl, ROUTE_SEO, series } = cfg;
  const shell = readFileSync(join(dist, "index.html"), "utf8");

  const albumSlugs = ["things-i-shouldnt-say", "great-romance", "phobia", "work-of-art"];
  const routes = [
    ...Object.keys(ROUTE_SEO),
    "/things-i-shouldnt-say",
    ...albumSlugs.map((s) => `/album/${s}`),
  ];

  /* ── Structured data reused across pages ───────────────────────────────── */

  const published = series.getPublishedEpisodes();
  const stills = [series.SERIES_STILLS.hall, series.SERIES_STILLS.arrival, series.SERIES_STILLS.encounter];

  const seriesLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    name: series.SERIES.title,
    url: `${SITE_URL}/#${series.SERIES_ANCHOR_ID}`,
    description: `${series.SERIES.intro.lead} ${series.SERIES.intro.body}`,
    image: stills.map((s) => `${SITE_URL}${s.src}`),
    genre: [...series.SERIES.genre, "Period Drama", "Supernatural Mystery"],
    inLanguage: "en",
    creator: { "@type": "Person", name: "Dasha Day", url: SITE_URL },
    productionCompany: { "@type": "Organization", name: "DAYD Media", url: `${SITE_URL}/dayd-media` },
    contentLocation: { "@type": "Place", name: "Alderwick University, England" },
    numberOfEpisodes: series.EPISODES.length,
    sameAs: [series.SERIES_LINKS.telegram],
    // Only episodes already out in public — listing an unreleased one would
    // advertise it as available.
    episode: published.map(({ episode, datePublished }) => ({
      "@type": "TVEpisode",
      episodeNumber: Number(episode.number),
      ...(episode.title ? { name: episode.title } : {}),
      ...(episode.description ? { description: episode.description } : {}),
      datePublished,
      url: series.SERIES_LINKS.telegram,
    })),
  };

  const breadcrumb = (name, path) => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name, item: `${SITE_URL}${path}` },
    ],
  });

  const albumLd = (slug, title) => ({
    "@context": "https://schema.org",
    "@type": "MusicAlbum",
    name: title,
    url: `${SITE_URL}/album/${slug}`,
    byArtist: { "@type": "MusicGroup", name: "DashaDay", url: SITE_URL },
    genre: ["Cinematic Pop", "Alternative Pop"],
  });

  /* ── Write one file per route ──────────────────────────────────────────── */

  let written = 0;
  for (const route of routes) {
    const seo = getSEOForPath(route);
    const isHome = route === "/";

    // The series URL is a redirect into the homepage section, so it points its
    // canonical there rather than competing with it.
    const canonical = route === "/things-i-shouldnt-say" ? `${SITE_URL}/` : canonicalUrl(seo.path ?? route);

    const image = isHome || route === "/things-i-shouldnt-say"
      ? `${SITE_URL}${series.SERIES_STILLS.hall.src}`
      : ogImageUrl(seo.ogImage);
    const imageAlt = isHome || route === "/things-i-shouldnt-say"
      ? series.SERIES_STILLS.hall.alt
      : `${SITE_NAME} — ${seo.title}`;

    let html = applyHead(shell, {
      title: seo.title,
      description: seo.description,
      keywords: seo.keywords,
      canonical,
      image,
      imageAlt,
      ogType: isHome ? "website" : "article",
      noindex: Boolean(seo.noindex),
    });

    const blocks = [];
    if (isHome) blocks.push({ id: "series-structured-data", data: seriesLd });
    if (!isHome && route !== "/things-i-shouldnt-say") {
      blocks.push({ data: breadcrumb(seo.title.split("|")[0].split("—")[0].trim(), seo.path ?? route) });
    }
    if (route.startsWith("/album/")) {
      const slug = route.replace("/album/", "");
      blocks.push({ data: albumLd(slug, seo.title.split("—")[0].trim()) });
    }
    html = addJsonLd(html, blocks);

    // "<route>.html", not "<route>/index.html": Cloudflare Pages serves the
    // former at /links and the latter at /links/, 308-redirecting /links to
    // it. Every internal link, canonical and sitemap entry here is
    // slash-free, so the flat filename is the one that matches.
    const target = isHome ? join(dist, "index.html") : join(dist, `${route.slice(1)}.html`);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, html);
    written += 1;
  }

  /* ── A real 404 for everything that is not a route ─────────────────────── */

  const notFound = applyHead(shell, {
    title: "Page Not Found | DashaDay",
    description: "The page you are looking for could not be found.",
    keywords: getSEOForPath("/").keywords,
    canonical: `${SITE_URL}/`,
    image: ogImageUrl(),
    imageAlt: SITE_NAME,
    ogType: "website",
    noindex: true,
  });
  writeFileSync(join(dist, "404.html"), notFound);

  rmSync(tmp, { recursive: true, force: true });
  console.log(`prerender: ${written} routes + 404.html`);
};

main().catch((err) => {
  console.error("prerender failed:", err);
  process.exit(1);
});

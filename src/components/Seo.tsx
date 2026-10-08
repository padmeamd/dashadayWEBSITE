import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { canonicalUrl, getSEOForPath, ogImageUrl, SITE_NAME } from "@/config/seo";

/** Find an existing head tag, or create it once and reuse it afterwards. */
function upsertMeta(selector: string, attrs: Record<string, string>) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    document.head.appendChild(el);
  }
  for (const [key, value] of Object.entries(attrs)) el.setAttribute(key, value);
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

/**
 * Keeps the document head in step with the current route.
 *
 * index.html ships one static set of tags, so without this every route served
 * the homepage's title, description and — most damaging — a canonical URL
 * pointing at "/", which tells search engines not to index any other page.
 */
const Seo = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = getSEOForPath(pathname);
    const canonical = canonicalUrl(seo.path ?? pathname);
    const image = ogImageUrl(seo.ogImage);

    document.title = seo.title;

    upsertMeta('meta[name="description"]', { name: "description", content: seo.description });
    upsertMeta('meta[name="keywords"]', { name: "keywords", content: seo.keywords });
    upsertLink("canonical", canonical);

    upsertMeta('meta[property="og:title"]', { property: "og:title", content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: seo.description });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonical });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:type"]', {
      property: "og:type",
      content: pathname === "/" ? "website" : "article",
    });

    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: seo.description });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: image });

    // Placeholder pages must be removable from the index again on navigation,
    // so the tag is deleted rather than left behind with a different value.
    const robots = document.head.querySelector('meta[name="robots"]');
    if (seo.noindex) {
      upsertMeta('meta[name="robots"]', { name: "robots", content: "noindex, follow" });
    } else if (robots) {
      robots.remove();
    }
  }, [pathname]);

  return null;
};

export default Seo;

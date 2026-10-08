import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/config/site";

export type PageSEOConfig = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
};

const defaultKeywords =
  "DashaDay, pop artist, songwriter, cinematic pop, London musician, Things I Shouldn't Say, music videos, alternative pop, " +
  "Things I Shouldn't Say series, Alderwick University, dark academia series, gothic romance series, AI film series";

export const HOME_SEO: PageSEOConfig = {
  title: "DashaDay | Cinematic Pop Artist & Creator of Things I Shouldn't Say",
  description:
    "Official website of DashaDay — London-based cinematic pop artist, songwriter and filmmaker. Watch the original dark academia series Things I Shouldn't Say and stream the album of the same name.",
  path: "/",
};

export const ROUTE_SEO: Record<string, PageSEOConfig> = {
  "/": HOME_SEO,
  "/music": {
    title: "Music | DashaDay",
    description:
      "Stream and explore DashaDay's albums and singles — cinematic pop from Things I Shouldn't Say to Great Romance, Phobia, and Work of Art.",
    path: "/music",
  },
  "/listen": {
    title: "Listen | DashaDay",
    description: "Listen to DashaDay on Spotify, Apple Music, Amazon Music, YouTube Music, and more.",
    path: "/listen",
  },
  "/videos": {
    title: "Music Videos | DashaDay",
    description: "Watch DashaDay's cinematic music videos and visual storytelling.",
    path: "/videos",
  },
  "/contact": {
    title: "Contact | DashaDay",
    description: "Contact DashaDay for collaborations, press, and creative inquiries.",
    path: "/contact",
  },
  "/dayd-media": {
    title: "DAYD Media | DashaDay",
    description: "DAYD Media — creative visuals, tech, and cinematic content by DashaDay.",
    path: "/dayd-media",
  },
  "/predictions": {
    title: "Predictions | DashaDay",
    description: "Open the prediction letter — an interactive cinematic experience from DashaDay.",
    path: "/predictions",
  },
  "/about": {
    title: "About DashaDay | Cinematic Pop Artist",
    description:
      "Learn about DashaDay — London-based pop artist, songwriter, and developer creating cinematic music and immersive digital experiences.",
    path: "/about",
    // Placeholder page ("coming soon") — thin content, so it stays unindexed
    // until it has something to say.
    noindex: true,
  },
  "/links": {
    title: "All Links | DashaDay",
    description:
      "Every DashaDay link in one place — streaming, music videos, the series Things I Shouldn't Say, and social profiles.",
    path: "/links",
  },
  "/live": {
    title: "Live Shows | DashaDay",
    description: "Live performances and upcoming shows from DashaDay.",
    path: "/live",
  },
  "/merch": {
    title: "Merch | DashaDay",
    description: "DashaDay merchandise — coming soon.",
    path: "/merch",
    noindex: true,
  },
  "/lyrics": {
    title: "Lyrics | DashaDay",
    description: "Lyrics from Things I Shouldn't Say and more — coming soon.",
    path: "/lyrics",
    noindex: true,
  },
};

/**
 * Proper titles for the released albums. Deriving them from the slug drops
 * punctuation — "things-i-shouldnt-say" became "Things I Shouldnt Say", which
 * misses the apostrophe people actually search for.
 */
const ALBUM_TITLES: Record<string, string> = {
  "things-i-shouldnt-say": "Things I Shouldn't Say",
  "great-romance": "Great Romance",
  phobia: "Phobia",
  "work-of-art": "Work of Art",
};

export function getSEOForPath(pathname: string): PageSEOConfig & { keywords: string } {
  if (pathname.startsWith("/album/")) {
    const slug = pathname.replace("/album/", "");
    const title =
      ALBUM_TITLES[slug] ??
      slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
    return {
      title: `${title} — Album by DashaDay`,
      description: `Listen to ${title} by DashaDay on Spotify, Apple Music, YouTube Music and more.`,
      path: pathname,
      keywords: defaultKeywords,
    };
  }

  const base = ROUTE_SEO[pathname] ?? {
    title: "Page Not Found | DashaDay",
    description: "The page you are looking for could not be found.",
    path: pathname,
    noindex: true,
  };

  return { ...base, keywords: defaultKeywords };
}

export function canonicalUrl(path = "/"): string {
  if (path === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function ogImageUrl(image?: string): string {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.startsWith("http")) return image;
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}

export { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL };

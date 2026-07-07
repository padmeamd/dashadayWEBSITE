import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/config/site";

export type PageSEOConfig = {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
  noindex?: boolean;
};

const defaultKeywords =
  "DashaDay, pop artist, songwriter, cinematic pop, London musician, Things I Shouldn't Say, music videos, alternative pop";

export const HOME_SEO: PageSEOConfig = {
  title: "DashaDay Official Website | Cinematic Pop Artist & Songwriter",
  description:
    "Official website of DashaDay — London-based cinematic pop artist and songwriter. Stream the debut album Things I Shouldn't Say, watch music videos, and get concert tickets.",
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

export function getSEOForPath(pathname: string): PageSEOConfig & { keywords: string } {
  if (pathname.startsWith("/album/")) {
    const slug = pathname.replace("/album/", "");
    const title = slug
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
    return {
      title: `${title} | DashaDay`,
      description: `Stream ${title} by DashaDay on your favorite platform.`,
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

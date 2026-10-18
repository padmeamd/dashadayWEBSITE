import { SERIES_ROUTE } from "@/data/series";

export type SiteNavItem =
  | { label: string; href: string; type: "section" }
  | { label: string; href: string; type: "route" }
  /** A real document outside the app — needs a full page load, not the router. */
  | { label: string; href: string; type: "external" };

export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { label: "The Series", href: SERIES_ROUTE, type: "route" },
  { label: "Music", href: "#music", type: "section" },
  { label: "Videos", href: "#videos", type: "section" },
  { label: "DAYD Media", href: "/dayd-media", type: "route" },
  { label: "Media Kit", href: "/media-kit/", type: "external" },
  { label: "Links", href: "/links", type: "route" },
  { label: "Contact", href: "/contact", type: "route" },
];

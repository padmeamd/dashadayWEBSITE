export type SiteNavItem =
  | { label: string; href: string; type: "section" }
  | { label: string; href: string; type: "route" };

export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { label: "Music", href: "#music", type: "section" },
  { label: "Videos", href: "#videos", type: "section" },
  { label: "Visuals", href: "#visuals", type: "section" },
  { label: "Live Shows", href: "/live", type: "route" },
  { label: "DAYD Media", href: "/dayd-media", type: "route" },
  { label: "Links", href: "/links", type: "route" },
  { label: "Contact", href: "/contact", type: "route" },
];

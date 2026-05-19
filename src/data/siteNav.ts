export type SiteNavItem =
  | { label: string; href: string; type: "section" }
  | { label: string; href: string; type: "route" };

export const SITE_NAV_ITEMS: SiteNavItem[] = [
  { label: "Music", href: "#music", type: "section" },
  { label: "Videos", href: "#videos", type: "section" },
  { label: "Lyrics", href: "#lyrics", type: "section" },
  { label: "Visuals", href: "#visuals", type: "section" },
  { label: "DAYD Media", href: "/dayd-media", type: "route" },
  { label: "Contact", href: "/contact", type: "route" },
];

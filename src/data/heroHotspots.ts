import type { CSSProperties } from "react";

export type HeroHotspotDef = {
  id: string;
  /** Client route path (React Router). */
  to: string;
  objectLabel: string;
  actionLabel: string;
  style: CSSProperties;
  /** Optional override below md breakpoint (same route, adjusted position only). */
  mobileStyle?: CSSProperties;
  labelClassName: string;
};

/** Hero object → route map (same on mobile and desktop). */
export const HERO_HOTSPOTS: HeroHotspotDef[] = [
  {
    id: "phone",
    to: "/contact",
    objectLabel: "TELEPHONE",
    actionLabel: "CONTACT",
    style: { left: "1%", top: "59%", width: "24%", height: "34%" },
    mobileStyle: { left: "0%", top: "42%", width: "26%", height: "32%" },
    labelClassName:
      "absolute left-[58%] top-[2%] flex -translate-x-1/2 max-md:left-[55%] max-md:-top-[6%] md:left-[62%] md:top-[3%]",
  },
  {
    id: "candles",
    to: "/predictions",
    objectLabel: "CANDLES",
    actionLabel: "PREDICTIONS",
    style: { left: "48%", top: "30%", width: "20%", height: "44%" },
    labelClassName: "absolute top-[0%] right-[2%] md:top-[2%]",
  },
  {
    id: "vinyl",
    to: "/videos",
    objectLabel: "VINYL PLAYER",
    actionLabel: "VIDEOS",
    style: { left: "57%", top: "32%", width: "30%", height: "38%" },
    labelClassName: "absolute bottom-[14%] left-1/2 flex -translate-x-1/2 md:bottom-[16%]",
  },
  {
    id: "perfume",
    to: "/music",
    objectLabel: "PERFUME",
    actionLabel: "MUSIC",
    style: { left: "20%", top: "50%", width: "7%", height: "22%" },
    mobileStyle: { left: "18%", top: "36%", width: "9%", height: "24%" },
    labelClassName:
      "absolute bottom-[4%] left-1/2 flex -translate-x-1/2 max-md:bottom-[14%]",
  },
  {
    id: "jewelry",
    to: "/dayd-media",
    objectLabel: "JEWELRY TRAY",
    actionLabel: "DAYD MEDIA",
    style: { left: "28%", top: "56%", width: "28%", height: "24%" },
    labelClassName: "absolute bottom-[4%] left-1/2 flex -translate-x-1/2",
  },
  {
    id: "dress",
    to: "/merch",
    objectLabel: "DRESS",
    actionLabel: "MERCH",
    style: { left: "48%", top: "12%", width: "42%", height: "20%" },
    mobileStyle: { left: "46%", top: "6%", width: "44%", height: "22%" },
    labelClassName:
      "absolute left-[78%] top-[82%] flex -translate-x-1/2 max-md:left-[76%] max-md:top-[76%] md:left-[82%] md:top-[85%]",
  },
];

export function heroHotspotZIndex(id: string): number | undefined {
  if (id === "candles") return 60;
  if (id === "vinyl") return 50;
  return undefined;
}

export function resolveHeroHotspotStyle(spot: HeroHotspotDef, isMobile: boolean): CSSProperties {
  return {
    ...spot.style,
    ...(isMobile && spot.mobileStyle ? spot.mobileStyle : {}),
  };
}

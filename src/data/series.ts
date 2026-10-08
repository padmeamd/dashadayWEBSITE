/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THINGS I SHOULDN'T SAY — series configuration
 * ─────────────────────────────────────────────────────────────────────────────
 *  Everything the homepage series section and the hero teaser render lives
 *  here. Edit this file — no component changes needed.
 *
 *  • Stills ............ SERIES_STILLS  (files live in /public/image/series)
 *  • Links / CTAs ...... SERIES_LINKS
 *  • Titles & synopsis . SERIES
 *  • Episodes & dates .. EPISODES  (add Chapter 03 by appending an object)
 *  • Membership ........ MEMBERSHIP
 *  • Guide banner ...... GUIDE
 *
 *  Dates: `date` is the machine-readable ISO day (used for <time> and the
 *  released/upcoming marker) and `label` is the exact text shown to visitors.
 *  The label is a plain string, so an announced premiere date reads
 *  identically in every timezone.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { SOCIAL_LINKS } from "@/config/site";

/** Section anchor — used by the "The Series" nav item and the hero teaser. */
export const SERIES_ANCHOR_ID = "the-series";

/** Where every CTA points. Change a URL once and it updates everywhere. */
export const SERIES_LINKS = {
  /** Telegram channel — full episodes + updates. */
  telegram: "https://t.me/daydmedia",
  /** Members' community — early access + behind the scenes. */
  membership: "https://buymeacoffee.com/daydmedia",
  /** AI filmmaking guide. */
  guide: "https://buymeacoffee.com/daydmedia/e/583487",
  /** Pulled from the site-wide socials so they never drift apart. */
  instagram: SOCIAL_LINKS.find((l) => l.label === "Instagram")?.href ?? "",
  youtube: SOCIAL_LINKS.find((l) => l.label === "YouTube")?.href ?? "",
} as const;

export type SeriesCta = {
  label: string;
  href: string;
};

export type SeriesStill = {
  src: string;
  /** Intrinsic size — reserves space so the image never shifts the layout. */
  width: number;
  height: number;
  alt: string;
};

/**
 * STILLS — real frames from the series.
 * Web-optimised JPEGs; the untouched originals stay in
 * `src/components/series/pics/`. To swap one, drop the new file in
 * /public/image/series/ and update `src` + `width`/`height` below.
 */
export const SERIES_STILLS = {
  /** Dominant establishing shot: the great hall. */
  hall: {
    src: "/image/series/alderwick-hall.jpg",
    width: 2000,
    height: 1100,
    alt: "Dasha and a fellow student meet beneath the stained glass and chandeliers of Alderwick University's great hall",
  },
  /** Secondary frame: arriving through the gothic archways. */
  arrival: {
    src: "/image/series/alderwick-arrival.jpg",
    width: 1400,
    height: 728,
    alt: "Dasha and a fellow student walk past the gothic stone archways of Alderwick University",
  },
  /** Secondary frame: the close, candlelit encounter. */
  encounter: {
    src: "/image/series/alderwick-encounter.jpg",
    width: 1134,
    height: 636,
    alt: "Dasha and a fellow student face one another in close candlelight inside Alderwick University",
  },
} satisfies Record<string, SeriesStill>;

/* ── Title treatment & story introduction ─────────────────────────────────── */

export const SERIES = {
  eyebrow: "An Original Series by Dasha Day",
  /** Rendered as two stacked lines in the title lockup. */
  titleLines: ["Things I", "Shouldn't Say"],
  /** Flat title for alt text, aria labels and the hero teaser. */
  title: "Things I Shouldn't Say",
  genre: ["Dark Academia", "Gothic Romance", "Mystery"],
  tagline: "Some invitations change everything.",
  /** Caption printed under the dominant frame. */
  locationCaption: "Alderwick University · England, 1890s",
  intro: {
    heading: "Welcome to Alderwick",
    lead: "One invitation. An ancient university. A secret that was never meant to be discovered.",
    body: "When Dasha arrives at Alderwick University, she expects an ordinary visit. Instead, she discovers a world of forbidden romance, ancient legends, and a secret society that has been waiting for her.",
  },
  /** Production slate printed beside the stills, like film-campaign credits. */
  credits: [
    { label: "Created by", value: "Dasha Day" },
    { label: "Format", value: "Original cinematic AI-produced series" },
    { label: "Setting", value: "Alderwick University, England, 1890s" },
    { label: "Inspired by", value: "The album Things I Shouldn't Say" },
  ],
  primaryCta: { label: "Watch the Series", href: SERIES_LINKS.telegram } satisfies SeriesCta,
  secondaryCta: {
    label: "Enter the Alderwick Society",
    href: SERIES_LINKS.membership,
  } satisfies SeriesCta,
} as const;

/* ── Hero teaser (inside the homepage hero) ───────────────────────────────── */

export const HERO_TEASER = {
  label: "Now Streaming · An Original Series",
  title: SERIES.title,
  cta: "Enter the World of Alderwick",
  /** Which still to preview. Any key of SERIES_STILLS. */
  still: "encounter",
} as const;

/* ── Chapters ─────────────────────────────────────────────────────────────── */

export type ReleaseMilestone = {
  /** ISO day — machine readable, drives the released/upcoming marker. */
  date: string;
  /** Exactly what visitors read. Timezone-independent by design. */
  label: string;
  /** What happens on that date. */
  note: string;
  /** Optional override; otherwise derived from `date`. */
  released?: boolean;
};

export type EpisodeStatus = "streaming" | "early-access" | "upcoming";

export type Episode = {
  /** Stable key, also used for list ordering. */
  id: string;
  /** "01", "02", … */
  number: string;
  /** Leave undefined until the official title is announced. */
  title?: string;
  status: EpisodeStatus;
  statusLabel: string;
  description?: string;
  schedule: ReleaseMilestone[];
  cta: SeriesCta;
};

export const EPISODES: Episode[] = [
  {
    id: "ep-01",
    number: "01",
    title: "The Invitation",
    status: "streaming",
    statusLabel: "Now Streaming",
    description:
      "Dasha arrives at Alderwick University for the first time, unaware that her invitation will lead her into a world of ancient secrets, unexpected connections, and a mysterious legend.",
    schedule: [
      {
        date: "2026-10-05",
        label: "5 October 2026",
        note: "Full episode released",
      },
    ],
    cta: { label: "Watch Now", href: SERIES_LINKS.telegram },
  },
  {
    id: "ep-02",
    number: "02",
    status: "early-access",
    statusLabel: "Members Early Access Available",
    schedule: [
      {
        date: "2026-10-05",
        label: "5 October 2026",
        note: "Members premiere",
      },
      {
        date: "2026-10-12",
        label: "12 October 2026",
        note: "Part One public release",
      },
      {
        date: "2026-10-15",
        label: "15 October 2026",
        note: "Full public premiere",
      },
    ],
    cta: { label: "Watch Early", href: SERIES_LINKS.membership },
  },
  /**
   * Add future chapters here, e.g.:
   * {
   *   id: "ep-03",
   *   number: "03",
   *   status: "upcoming",
   *   statusLabel: "Coming Soon",
   *   schedule: [{ date: "2026-10-22", label: "22 October 2026", note: "Members premiere" }],
   *   cta: { label: "Watch Early", href: SERIES_LINKS.membership },
   * },
   */
];

export const SCHEDULE = {
  heading: "The Chapters",
  subheading: "New episodes every Thursday. Members watch first.",
} as const;

/* ── Membership ───────────────────────────────────────────────────────────── */

export const MEMBERSHIP = {
  eyebrow: "A Private Invitation",
  heading: "The Alderwick Society",
  quote: "Some secrets are revealed only to those who enter first.",
  description:
    "Watch new episodes before their public release, discover behind-the-scenes content, and follow the creation of the series.",
  price: "£4",
  priceInterval: "per month",
  benefits: [
    "Early access to full episodes",
    "Behind-the-scenes updates",
    "Sneak peeks of upcoming chapters",
  ],
  cta: { label: "Become a Member", href: SERIES_LINKS.membership } satisfies SeriesCta,
} as const;

/* ── Follow the story ─────────────────────────────────────────────────────── */

export type FollowChannel = {
  name: "telegram" | "instagram" | "youtube";
  label: string;
  description: string;
  href: string;
};

export const FOLLOW = {
  heading: "Follow the Story",
  channels: [
    {
      name: "telegram",
      label: "Telegram",
      description: "Watch full episodes and receive updates",
      href: SERIES_LINKS.telegram,
    },
    {
      name: "instagram",
      label: "Instagram",
      description: "Watch episode clips and follow announcements",
      href: SERIES_LINKS.instagram,
    },
    {
      name: "youtube",
      label: "YouTube",
      description: "Watch upcoming public releases",
      href: SERIES_LINKS.youtube,
    },
  ] satisfies FollowChannel[],
} as const;

/* ── AI filmmaking guide ──────────────────────────────────────────────────── */

export const GUIDE = {
  heading: "Behind the Magic",
  question: "Ever wondered how an entire cinematic series can be created with AI?",
  guideTitle: "Create Your Own Film with AI",
  cta: { label: "Explore the Guide", href: SERIES_LINKS.guide } satisfies SeriesCta,
} as const;

/* ── Helpers ──────────────────────────────────────────────────────────────── */

/**
 * Has this milestone already happened? Compares ISO day strings against the
 * visitor's local calendar day — the printed `label` never changes, only the
 * small released/upcoming marker beside it.
 */
export function isMilestoneReleased(milestone: ReleaseMilestone, today = new Date()): boolean {
  if (typeof milestone.released === "boolean") return milestone.released;
  const localToday = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}`;
  return milestone.date <= localToday;
}

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

import { SITE_URL, SOCIAL_LINKS } from "@/config/site";

/** The series' own page. Everything that says "the series" leads here. */
export const SERIES_ROUTE = "/things-i-shouldnt-say";

/** The society archive, and the sorting it invites visitors into. */
export const societyRoute = (slug: string) => `${SERIES_ROUTE}/societies/${slug}`;
export const SOCIETY_QUIZ_ROUTE = `${SERIES_ROUTE}/discover-your-society`;

/** Section anchor for the series block that still sits on the homepage. */
export const SERIES_ANCHOR_ID = "the-series";

/** Where every CTA points. Change a URL once and it updates everywhere. */
export const SERIES_LINKS = {
  /** Telegram channel — full episodes + updates. */
  telegram: "https://t.me/daydmedia",
  /** Episode One, free and in full on YouTube, in English. */
  youtubeEpisodeOne: "https://youtu.be/pbTrzJmW4Kw",
  /** Episode Two, free and in full on YouTube since 5 November 2026. */
  youtubeEpisodeTwo: "https://youtu.be/gXE93cxrjBE",
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
    // This paragraph is also the series' schema.org description, so a spoiler
    // here does not stay on the page — it goes to search engines and link
    // previews. It says what the first episode shows and no further.
    body: "When Dasha arrives at Alderwick University, she expects an ordinary visit. Instead she finds a conductor she cannot account for, visions of rooms she is not standing in, and a university whose history has been carefully edited.",
  },
  /** Production slate printed beside the stills, like film-campaign credits. */
  credits: [
    { label: "Created by", value: "Dasha Day" },
    { label: "Format", value: "Original cinematic AI-produced series" },
    { label: "Setting", value: "Alderwick University, England, 1890s" },
    { label: "Inspired by", value: "The album Things I Shouldn't Say" },
  ],
  primaryCta: {
    label: "Watch Episode One",
    href: SERIES_LINKS.youtubeEpisodeOne,
  } satisfies SeriesCta,
  /** Printed under the buttons so the offer is unmistakable. */
  watchNote:
    "Episode One — The Invitation is out now on YouTube: the full episode, in English, free to watch. Episode Two is on Telegram.",
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
  /**
   * Set on milestones that put the episode in front of the general public.
   * Only these are ever promoted by the new-episode popup — members-only
   * premieres must stay `false`/absent so nothing unreleased is advertised.
   */
  isPublic?: boolean;
  /** Extra wording for a partial release, e.g. "Part One". */
  promoLabel?: string;
  /** Where the popup sends viewers; defaults to the Telegram channel. */
  watchHref?: string;
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
  /** Short availability note: runtime, language, where to watch. */
  availability?: string;
  /** A frame from the episode, shown beside its row. */
  still?: SeriesStill;
  schedule: ReleaseMilestone[];
  cta: SeriesCta;
};

/** Episode previews. Her own frames; the alt text describes only what is
 *  visible, so nothing about the story is given away by a screen reader. */
const preview = (n: string, alt: string): SeriesStill => ({
  src: `/image/series/episode-${n}.jpg`,
  width: 1200,
  height: 675,
  alt,
});

export const EPISODES: Episode[] = [
  {
    id: "ep-01",
    number: "01",
    title: "The Invitation",
    status: "streaming",
    statusLabel: "Now Streaming on YouTube",
    description:
      "Dasha arrives at Alderwick University for the first time, unaware that her invitation will lead her into a world of ancient secrets, unexpected connections, and a mysterious legend.",
    availability: "Full episode · 9 minutes · in English · free on YouTube",
    still: preview("01", "Dasha and a fellow student sit together in a candlelit Alderwick hall"),
    schedule: [
      {
        date: "2026-10-05",
        label: "5 October 2026",
        note: "Full episode released",
        isPublic: true,
      },
      {
        date: "2026-10-12",
        label: "12 October 2026",
        note: "Now on YouTube — full episode, in English",
        isPublic: true,
        watchHref: SERIES_LINKS.youtubeEpisodeOne,
      },
    ],
    cta: { label: "Watch on YouTube", href: SERIES_LINKS.youtubeEpisodeOne },
  },
  {
    id: "ep-02",
    number: "02",
    status: "streaming",
    statusLabel: "Now Streaming on YouTube",
    // It opened on Telegram and reached YouTube on 5 November. Both dates stay
    // in the schedule — the channel got it first and that is worth showing —
    // but every link now points at the video, because that is where anyone
    // arriving today can watch it without joining anything.
    availability: "Full episode · 8 minutes · in English · free on YouTube",
    still: preview("02", "Three students at a breakfast table in a long hall of stained glass and portraits"),
    schedule: [
      {
        date: "2026-10-05",
        label: "5 October 2026",
        note: "Members premiere",
      },
      {
        date: "2026-10-12",
        label: "12 October 2026",
        note: "Part One — public on Telegram",
        isPublic: true,
        promoLabel: "Part One",
        watchHref: SERIES_LINKS.telegram,
      },
      {
        date: "2026-10-15",
        label: "15 October 2026",
        note: "Full public premiere on Telegram",
        isPublic: true,
        watchHref: SERIES_LINKS.telegram,
      },
      {
        date: "2026-11-05",
        label: "5 November 2026",
        note: "Now on YouTube — full episode, in English",
        isPublic: true,
        watchHref: SERIES_LINKS.youtubeEpisodeTwo,
      },
    ],
    cta: { label: "Watch on YouTube", href: SERIES_LINKS.youtubeEpisodeTwo },
  },
  {
    id: "ep-03",
    number: "03",
    status: "streaming",
    statusLabel: "Now on Telegram",
    // Out on the channel, but not on YouTube: there it has a trailer and
    // nothing more. No milestone, because no date for it was given to me and
    // a guessed date on a public page is worse than an absent one — which
    // also keeps it out of the structured data until a real date arrives.
    availability: "On Telegram, in full · free on YouTube from 19 November",
    still: preview("03", "A student in a scarf looks past Dasha in a stone courtyard"),
    schedule: [
      {
        date: "2026-11-19",
        label: "19 November 2026",
        note: "Free on YouTube — full episode, in English",
        // Dated ahead, which is safe: both the popup and the structured data
        // skip an isPublic milestone until its day arrives. On the 19th it
        // starts promoting itself with no edit needed.
        isPublic: true,
        // The video does not exist yet, so this points at the channel. Swap
        // it for the watch URL once the episode is up, or the popup will send
        // people to a channel page instead of the episode.
        watchHref: SERIES_LINKS.youtube,
      },
    ],
    cta: { label: "Watch on Telegram", href: SERIES_LINKS.telegram },
  },
  {
    id: "ep-04",
    number: "04",
    status: "early-access",
    statusLabel: "For Members",
    availability: "For members, on Telegram",
    still: preview("04", "Close on a gold filigree masquerade mask set with stones"),
    schedule: [
      {
        date: "2026-11-05",
        label: "5 November 2026",
        // No `isPublic`: members paid to see this first, and the popup and the
        // structured data both read that flag. Without it neither can advertise
        // an episode the public cannot watch.
        note: "Members premiere",
      },
    ],
    cta: { label: "Watch Early", href: SERIES_LINKS.membership },
  },
  {
    id: "ep-05",
    number: "05",
    status: "upcoming",
    statusLabel: "Coming Soon",
    // Not out anywhere yet. It carries a preview because she asked for one and
    // the sneak peek is already public on her channel; it carries no date,
    // because none has been announced.
    still: preview("05", "Two characters face one another by candlelight in evening dress"),
    schedule: [],
    cta: { label: "Watch Early", href: SERIES_LINKS.membership },
  },
  /**
   * Add future chapters here, e.g.:
   * {
   *   id: "ep-05",
   *   number: "05",
   *   status: "upcoming",
   *   statusLabel: "Coming Soon",
   *   schedule: [
   *     { date: "2026-11-19", label: "19 November 2026", note: "Members premiere" },
   *     { date: "2026-11-26", label: "26 November 2026", note: "Public premiere", isPublic: true },
   *   ],
   *   cta: { label: "Watch Early", href: SERIES_LINKS.membership },
   * },
   *
   * `isPublic` is the one flag that matters: it is what the popup and the
   * structured data read. A members premiere must not carry it.
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
      description: "Watch full episodes in English, starting with The Invitation",
      href: SERIES_LINKS.youtube,
    },
  ] satisfies FollowChannel[],
} as const;

/* ── AI filmmaking guide ──────────────────────────────────────────────────── */

export const GUIDE = {
  heading: "Behind the Magic",
  question: "Ever wondered how an entire cinematic series can be created with AI?",
  guideTitle: "Create Your Own Film with AI",
  /** Straight from the guide's own page — no price here, it varies by tier. */
  subtitle: "A step-by-step guide to creating a realistic AI film or mini-series",
  cta: { label: "Get the Guide", href: SERIES_LINKS.guide } satisfies SeriesCta,
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

/* ── New-episode popup ────────────────────────────────────────────────────── */

/**
 * The homepage announcement. Everything about how it looks, what it says and
 * how often it appears is set here.
 *
 * What it promotes is NOT set here — it is derived from EPISODES, so adding a
 * chapter with an `isPublic` milestone is enough for the popup to start
 * promoting it on that date. See `getLatestPublicRelease`.
 *
 * To preview it at any time, open the homepage with `?popup=1` — that ignores
 * both the 7-day dismissal and the editor-preview check.
 */
export const EPISODE_POPUP = {
  /** Flip to false to retire the popup without removing the code. */
  enabled: true,
  /** How long after the homepage settles before it appears. */
  delayMs: 2000,
  /** A dismissal silences this release for this many days. */
  dismissDays: 7,
  /** localStorage key holding `{ releaseId, dismissedAt }`. */
  storageKey: "dashaday:episode-popup",
  /** Banner image — any key of SERIES_STILLS. */
  still: "arrival",
  eyebrow: "An Original Series by Dasha Day",
  title: SERIES.title,
  badge: "New Episode",
  description: "Your invitation to Alderwick awaits. Discover the mystery.",
  primaryCta: { label: "Watch the New Episode", href: SERIES_LINKS.telegram } satisfies SeriesCta,
  secondaryCta: {
    label: "Explore the Series",
    href: `${SITE_URL}${SERIES_ROUTE}`,
  } satisfies SeriesCta,
} as const;

export type PublicRelease = {
  /** Stable id for this exact release — also the dismissal key. */
  id: string;
  /** ISO UK release day. */
  date: string;
  episodeNumber: string;
  /** What the popup calls it, e.g. "The Invitation" or "Episode 02 — Part One". */
  title: string;
  watchHref: string;
  /** Runtime / language / platform, when the episode declares one. */
  availability?: string;
};

/**
 * Today's date in the UK, as `YYYY-MM-DD`.
 *
 * Release dates are announced as UK dates, so every visitor must be judged
 * against the London calendar — otherwise someone in Auckland would see a new
 * episode advertised half a day early, and someone in Los Angeles half a day
 * late.
 */
export function ukToday(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(now);
}

/**
 * The newest episode (or part) that is genuinely out in public, or null while
 * nothing has been released yet. Members-only premieres are never returned, so
 * the popup cannot advertise something the public cannot watch.
 */
export function getLatestPublicRelease(now = new Date()): PublicRelease | null {
  const today = ukToday(now);
  let latest: PublicRelease | null = null;

  for (const episode of EPISODES) {
    for (const milestone of episode.schedule) {
      if (!milestone.isPublic || milestone.date > today) continue;

      const base = episode.title ?? `Episode ${episode.number}`;
      const candidate: PublicRelease = {
        id: `${episode.id}@${milestone.date}`,
        date: milestone.date,
        episodeNumber: episode.number,
        title: milestone.promoLabel ? `${base} — ${milestone.promoLabel}` : base,
        watchHref: milestone.watchHref ?? EPISODE_POPUP.primaryCta.href,
        availability: episode.availability,
      };

      // Strictly greater, so when two releases share a day the earlier entry
      // in EPISODES keeps the slot. That is deliberate: it leaves the choice
      // of which one to headline in the hands of whoever orders this list.
      if (!latest || candidate.date > latest.date) latest = candidate;
    }
  }

  return latest;
}

/**
 * Episodes that are genuinely out in public, each with the date it became
 * available. Drives the search-engine structured data, so nothing unreleased
 * is ever described as published.
 */
export function getPublishedEpisodes(now = new Date()): Array<{
  episode: Episode;
  datePublished: string;
  watchHref: string;
}> {
  const today = ukToday(now);

  return EPISODES.flatMap((episode) => {
    const live = episode.schedule
      .filter((m) => m.isPublic && m.date <= today)
      .sort((a, b) => a.date.localeCompare(b.date));
    if (!live.length) return [];
    // Earliest public date is when it came out; the most recent milestone
    // holds the best place to watch it today.
    const newest = live[live.length - 1];
    return [
      {
        episode,
        datePublished: live[0].date,
        watchHref: newest.watchHref ?? episode.cta.href,
      },
    ];
  });
}

/**
 * UPDATES — the running log on /things-i-shouldnt-say.
 *
 * Newest first. Add an entry whenever something happens: an episode lands, a
 * date moves, behind-the-scenes goes out. `link` is optional; when present the
 * card becomes clickable.
 */
export type SeriesUpdate = {
  date: string;        // ISO day, for <time> and sorting
  label: string;       // what the reader sees
  title: string;
  body: string;
  link?: SeriesCta;
};

export const SERIES_UPDATES: SeriesUpdate[] = [
  {
    date: "2026-11-05",
    label: "5 November 2026",
    title: "Chapter Two is on YouTube",
    body:
      "The second chapter is now free and in full on YouTube, in English. " +
      "Chapters three and four are with members on Telegram, where every " +
      "episode lands first.",
    link: { label: "Watch on YouTube", href: SERIES_LINKS.youtubeEpisodeTwo },
  },
  {
    date: "2026-10-12",
    label: "12 October 2026",
    title: "Chapter Two is out",
    body:
      "The second chapter is up on Telegram, where public episodes land first. " +
      "Members see each one before its public release.",
    link: { label: "Watch on Telegram", href: SERIES_LINKS.telegram },
  },
  {
    date: "2026-10-05",
    label: "5 October 2026",
    title: "Chapter One: The Invitation",
    body:
      "Dasha arrives at Alderwick for the first time. The full episode is free " +
      "and in English on YouTube.",
    link: { label: "Watch on YouTube", href: SERIES_LINKS.youtubeEpisodeOne },
  },
];

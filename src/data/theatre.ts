/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  THE THEATRE OF FATE — asset manifest and stage copy
 * ─────────────────────────────────────────────────────────────────────────────
 *  Every image the series page paints with, mapped once. The originals are the
 *  PNGs in src/new_assets; these are the WebP versions in public/image/theatre,
 *  which is what actually ships — the originals total 34 MB and have no place
 *  on a page anyone has to load.
 *
 *  `alpha` records which files are genuinely cut out, verified by reading the
 *  alpha channel rather than trusting the filename. It decides whether a piece
 *  can be layered over the stage or has to sit in a frame of its own.
 *
 *  Story copy lives here too, so the components stay layout and nothing else.
 *  Names, titles and quotes come from the brief; nothing is invented.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type TheatreAsset = {
  src: string;
  width: number;
  height: number;
  alpha: boolean;
  alt: string;
};

const asset = (
  slug: string,
  width: number,
  height: number,
  alpha: boolean,
  alt: string,
): TheatreAsset => ({ src: `/image/theatre/${slug}.webp`, width, height, alpha, alt });

export const STAGE = {
  /** Scene 1 — the theatre revealed when the curtains part. */
  candlelit: asset("stage-candlelit", 1600, 900, false,
    "A miniature Victorian theatre, its stage set with a gothic university and lit by footlight candles"),
  /** An empty lit stage, used as the frame each character stands in. */
  empty: asset("stage-empty", 1600, 900, false,
    "An ornate miniature theatre with burgundy velvet curtains drawn back from a dark stage"),
  /** Scene 2 — the paper diorama of the university itself. */
  alderwick: asset("alderwick-scenery", 1600, 900, false,
    "A paper diorama of Alderwick University: cloisters, a clock tower and climbing roses"),
  /** One curtain panel, mirrored for the other side. */
  curtain: asset("curtain", 1024, 1536, true,
    "A burgundy velvet curtain panel held back with a gold tassel"),
  /** Scene 4 — the blank playbill each chapter is printed into. */
  playbill: asset("playbill-frame", 1000, 1333, false,
    "An ornate Victorian playbill frame of blank parchment"),
  /** Scene 5 — the album. */
  gramophone: asset("gramophone", 1100, 1375, false,
    "A gilded gramophone on a candlelit gothic stage, sheet music scattered at its foot"),
  /** Scene 6 — the sealed invitation. */
  envelope: asset("envelope", 1200, 800, true,
    "An antique envelope closed with a crimson wax seal"),
} as const;

export type Player = {
  id: string;
  name: string;
  /** The billing under the name, as it appears on the playbill. */
  title: string;
  quote: string;
  /** The photographed miniature theatre this character is presented in. */
  portrait: TheatreAsset;
  /** The cut-out paper puppet, hung inside the stage. */
  puppet: TheatreAsset;
  /** Stage wash behind the puppet when this character takes the stage. */
  wash: string;
};

export const PLAYERS: Player[] = [
  {
    id: "dasha",
    name: "Dasha",
    title: "The Girl of the Prophecy",
    quote:
      "She came to Alderwick looking for answers. But perhaps Alderwick was waiting for her.",
    portrait: asset("portrait-dasha", 1100, 1375, false,
      "Dasha behind a miniature theatre, watching the scene set inside it"),
    puppet: asset("puppet-dasha", 900, 1350, true,
      "A paper puppet of Dasha in a crimson Victorian gown"),
    wash: "rgba(87, 33, 45, 0.55)",
  },
  {
    id: "gregory",
    name: "Gregory",
    title: "The Conductor of Fate",
    quote: "He can control an orchestra. But can he control his own destiny?",
    portrait: asset("portrait-gregory", 1100, 1375, false,
      "Gregory raising a baton over a miniature theatre where two dancers turn"),
    puppet: asset("puppet-gregory", 900, 1350, true,
      "A paper puppet of Gregory in a black tailcoat, baton in hand"),
    wash: "rgba(25, 21, 17, 0.6)",
  },
  {
    id: "theo",
    name: "Theo",
    title: "The Beautiful Experiment",
    quote: "He understands the human heart. But some feelings cannot be dissected.",
    portrait: asset("portrait-theo", 1100, 1375, false,
      "Theo reaching into a miniature theatre filled with flowers and tiny figures"),
    puppet: asset("puppet-theo", 900, 1350, true,
      "A paper puppet of Theo in an emerald embroidered coat"),
    wash: "rgba(40, 54, 44, 0.58)",
  },
];

/** Scene 1. */
export const OVERTURE = {
  title: "Things I Shouldn't Say",
  line: "Some stories were never meant to be told.",
} as const;

/** Scene 2. */
export const ALDERWICK_ACT = {
  place: "Alderwick University, 1890s.",
  body:
    "Behind its ancient walls lies a secret society, an impossible prophecy, and a love that could destroy everything.",
} as const;

/** Scene 5. */
export const OVERTURE_MUSIC = {
  heading: "Before there was a story, there were nineteen songs.",
  body:
    "Every song holds a feeling. Every feeling hides a story. And some love songs are actually warnings.",
} as const;

/** Scene 6 — the closing line, after the invitation is opened. */
export const CLOSING = {
  first: "You thought you were watching their story.",
  second: "But someone has been watching you.",
} as const;

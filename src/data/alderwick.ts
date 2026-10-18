/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  ALDERWICK — everything the series page renders, in one editable place.
 * ─────────────────────────────────────────────────────────────────────────────
 *  Episodes live in series.ts, which already holds the verified chapters.
 *  This file adds the page's own material: characters, the Vesper clues, and
 *  the categories updates are filed under.
 *
 *  ASSET SLOTS. Images referenced here that do not exist yet are listed in
 *  MISSING_ASSETS at the foot of the file. Until a file is supplied the page
 *  shows a composed placeholder frame rather than a stand-in photograph — no
 *  invented faces, no stock.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Character = {
  id: string;
  name: string;
  role: string;
  /** One line shown on the frame. */
  line: string;
  /** The dossier. Keep it free of anything that spoils a later chapter. */
  dossier: string;
  /** Drop a file at this path to fill the frame. */
  portrait: string;
};

export const CHARACTERS: Character[] = [
  {
    id: "dasha",
    name: "Dasha",
    role: "The visitor",
    line: "She came for one day.",
    dossier:
      "A prospective student with a single day to decide whether Alderwick is hers. " +
      "She arrives curious and leaves changed, carrying something she cannot yet explain.",
    portrait: "/image/series/characters/dasha.jpg",
  },
  {
    id: "gregory",
    name: "Gregory",
    role: "The conductor",
    line: "He has something to say about everything.",
    dossier:
      "Conducts the university orchestra and treats a campus tour as a duel. " +
      "Infuriating, watchful, and harder to leave behind than she expects.",
    portrait: "/image/series/characters/gregory.jpg",
  },
  {
    id: "sam",
    name: "Sam",
    role: "The guide",
    line: "He shows visitors the parts they are meant to see.",
    dossier:
      "Guides prospective students through Alderwick's halls and traditions. " +
      "Warm, practised, and careful about which doors he opens.",
    portrait: "/image/series/characters/sam.jpg",
  },
  {
    id: "theo",
    name: "Theo",
    role: "The biologist",
    line: "He notices what other people walk past.",
    dossier:
      "A biology student whose place in Alderwick's story is quieter than the rest, " +
      "and no less consequential for it.",
    portrait: "/image/series/characters/theo.jpg",
  },
  {
    id: "violet",
    name: "Violet",
    role: "A new presence",
    line: "Nobody can quite say when she arrived.",
    dossier:
      "New to Alderwick, or newly visible there. The difference matters more than it sounds.",
    portrait: "/image/series/characters/violet.jpg",
  },
];

export type Clue = {
  id: string;
  /** The engraving a visitor uncovers. */
  inscription: string;
  /** What it is attached to, in the fiction. */
  source: string;
};

/** Add a line here as the series reveals more; the seal unlocks them in order. */
export const VESPER_CLUES: Clue[] = [
  {
    id: "i",
    inscription: "The university remembers what others forget.",
    source: "Cut into the lintel above a door nobody uses",
  },
  {
    id: "ii",
    inscription: "We keep the hour that has no bell.",
    source: "Inked inside the cover of a ledger held in the archive",
  },
];

export const UPDATE_CATEGORIES = [
  "Episode",
  "Behind the scenes",
  "Music",
  "Cast",
  "Production diary",
] as const;

export type UpdateCategory = (typeof UPDATE_CATEGORIES)[number];

/**
 * What the page still needs from you. Each path is live: drop a file there and
 * the frame fills itself, no code change.
 */
export const MISSING_ASSETS = [
  "/image/series/characters/dasha.jpg — portrait, 4:5, ideally in costume",
  "/image/series/characters/gregory.jpg — portrait, 4:5",
  "/image/series/characters/sam.jpg — portrait, 4:5",
  "/image/series/characters/theo.jpg — portrait, 4:5",
  "/image/series/characters/violet.jpg — portrait, 4:5",
  "/image/series/hero.jpg — the widest, most atmospheric frame you have, 16:9 or wider",
  "/image/series/episodes/ep-01.jpg, ep-02.jpg — one still per chapter, 16:9",
] as const;

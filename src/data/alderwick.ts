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
  /** One line shown on the frame. Empty where none has been written yet. */
  line: string;
  /** The dossier. Keep it free of anything that spoils a later chapter. */
  dossier: string;
  /** Drop a file at this path to fill the frame. */
  portrait: string;
};

export const CHARACTERS: Character[] = [
  {
    id: "dasha",
    name: "Dasha Day",
    role: "The visitor",
    line: "She came for one day.",
    dossier:
      "A London musician, songwriter and poet, visiting Alderwick for a single day to " +
      "decide whether she belongs there. Intelligent, independent, quick-witted and " +
      "curious. Her arrival sets an extraordinary story in motion.",
    portrait: "/image/series/characters/dasha.jpg",
  },
  {
    id: "gregory",
    name: "Gregory",
    role: "The conductor",
    line: "He has something to say about everything.",
    dossier:
      "A charismatic and accomplished young conductor who leads Alderwick's university " +
      "orchestra. Charming, cultured, confident and effortlessly witty. Behind his easy " +
      "smile lies a deeper connection to the university's traditions.",
    portrait: "/image/series/characters/gregory.jpg",
  },
  {
    id: "theo",
    name: "Theo Ashbourne",
    role: "Natural Sciences",
    line: "He notices what other people walk past.",
    dossier:
      "A brilliant, observant Natural Sciences student. Intelligent, sharp-tongued and " +
      "difficult to impress. He has little patience for appearances, and even less for " +
      "people who accept everything they are told.",
    portrait: "/image/series/characters/theo.jpg",
  },
  {
    id: "sam",
    name: "Sam",
    role: "The guide",
    line: "He shows visitors the parts they are meant to see.",
    dossier:
      "A charming and sociable Alderwick student who guides prospective students around " +
      "the university. Friendly, witty and effortlessly welcoming. He introduces Dasha to " +
      "Alderwick and its traditions.",
    portrait: "/image/series/characters/sam.jpg",
  },
  {
    id: "mina",
    name: "Mina",
    role: "Alderwick",
    line: "",
    // Her entry stays a portrait and a name until the bible's wording arrives.
    // Writing a biography here would be inventing one.
    dossier: "",
    portrait: "/image/series/characters/mina.jpg",
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
  "Mina's biography — portrait and name are in place, the text is not",
  "/image/series/hero.jpg — the widest, most atmospheric frame you have, 16:9 or wider",
  "/image/series/episodes/ep-01.jpg, ep-02.jpg — one still per chapter, 16:9",
] as const;

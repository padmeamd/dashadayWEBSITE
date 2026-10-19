/**
 * THE SOCIETIES OF ALDERWICK.
 *
 * The university's own account of itself. Everything here is public record —
 * what a visitor could read in a prospectus or an archive catalogue — and
 * nothing in it belongs to a later chapter of the series.
 *
 * One distinction the copy has to hold carefully: Vesper is one of the three
 * societies the story turns on, but the institution publicly regards it as
 * defunct. The archive speaks in the institution's voice, so it says so.
 * Anything that would contradict that is not written here.
 */

export type SocietyPalette = {
  /** The page ground for this society's own profile. */
  ground: string;
  /** Hairlines, rules, small caps. Never a glow. */
  accent: string;
  /** Running text on the society's ground. */
  text: string;
  /** Quieter running text. */
  textSoft: string;
};

export type Society = {
  id: string;
  /** URL segment under /things-i-shouldnt-say/societies/. */
  slug: string;
  name: string;
  /** "The Society of the Unseen" and the like. */
  identity: string;
  archetype: string;
  motto: string;
  /** Symbol only; the name beneath it stays live text, not pixels. */
  crest: string;
  symbolDescription: string;
  /** Named colours, for the profile page to describe its own house. */
  colourNames: string;
  palette: SocietyPalette;
  /** The registry entry. Paragraphs, split on blank lines. */
  description: string;
  traits: string[];
  /** Every house has one. Written plainly rather than as a warning. */
  shadow: string[];
  signatureLine: string;
  /** What the society looks like, for anyone building on this later. */
  visualDirection: string[];
  /** The catalogue's own note on the state of the records. */
  archival: string;
  /** Whether the institution still lists it as operating. */
  standing: "recognised" | "defunct";
  /** Surfaces on a second look at the symbol. Optional by design. */
  hidden?: string;
  /** For the profile page's <title> and description. */
  seo: { title: string; description: string };
  /**
   * The sorting's verdict, in the society's own voice. Kept beside the
   * society rather than in the quiz, because it is the house speaking.
   */
  verdict: {
    /** Why this house, of the three, reached for this person. */
    chosen: string;
    /** One flaw, named precisely. Not a list — a sentence that lands. */
    flaw: string;
    /** The line left hanging. Intrigue, never revelation. */
    closing: string;
    /** The acceptance, as the certificate words it. */
    acceptance: string;
    /** A later hand, in the margin. Found by those who look. */
    marginalia: string;
  };
};

export const SOCIETIES: Society[] = [
  {
    id: "vesper",
    slug: "vesper",
    name: "The Vesper Society",
    identity: "The Society of the Unseen",
    archetype: "The Visionary",
    motto: "What is hidden is not necessarily meant to remain so.",
    crest: "/image/series/societies/vesper.webp",
    symbolDescription: "A closed eye surrounded by seven stars",
    colourNames: "Midnight black, antique silver, deep indigo",
    palette: {
      ground: "#090a10",
      accent: "#9aa2b2",
      text: "#e8e9ef",
      textSoft: "rgba(232, 233, 239, 0.66)",
    },
    description:
      "Once devoted to the mysteries of human perception, the Vesper Society occupied a " +
      "singular place in Alderwick's history. Its members believed that the visible world " +
      "was only a fraction of what could be understood, and that extraordinary insight " +
      "carried an extraordinary responsibility.\n\n" +
      "Today, Vesper is widely regarded as a vanished society. Its surviving records are " +
      "fragmentary, its final years obscured by conflicting accounts.\n\n" +
      "Yet its emblem still appears in places where no one remembers putting it.",
    traits: [
      "Perceptive",
      "Intuitive",
      "Empathetic",
      "Independent",
      "Observant",
      "Fascinated by mysteries",
      "Unwilling to accept convenient explanations",
    ],
    shadow: [
      "Obsession",
      "Secrecy",
      "Excessive curiosity",
      "The temptation to control others in the name of protecting them",
    ],
    signatureLine: "You notice what others overlook.",
    visualDirection: [
      "Blackened university corridors",
      "Silver engravings",
      "Candlelight",
      "Antique astronomy charts",
      "Handwritten annotations",
      "Sealed letters",
    ],
    archival: "Historical records incomplete. Society not currently recognised.",
    standing: "defunct",
    hidden: "Not every record was meant to survive.",
    seo: {
      title: "The Vesper Society — The Societies of Alderwick",
      description:
        "The Society of the Unseen. Once devoted to the mysteries of human perception, Vesper is now widely regarded as a vanished society — from Things I Shouldn't Say, an original series by DashaDay.",
    },
    verdict: {
      chosen:
        "You were not chosen for what you know. You were chosen for what you noticed " +
        "and did not mention — and for how comfortable the silence afterwards was.",
      flaw:
        "You will mistake knowing for protecting. The first time you keep a truth from " +
        "someone for their own good, you will be certain you were right, and you may " +
        "even have been.",
      closing:
        "Nothing in the archive says Vesper is still choosing. Nothing in the archive " +
        "says it stopped.",
      acceptance:
        "has been found, by observation rather than application, to possess the quality " +
        "the Society declines to name in writing.",
      marginalia: "— and was not told how long they had been watched.",
    },
  },
  {
    id: "linnaean",
    slug: "linnaean",
    name: "The Linnaean Circle",
    identity: "The Society of the Natural Order",
    archetype: "The Scholar",
    motto: "Everything has a cause. Everything has a consequence.",
    crest: "/image/series/societies/linnaean.webp",
    symbolDescription: "Intertwined botanical roots forming a circle",
    colourNames: "Forest green, aged bronze, ivory",
    palette: {
      ground: "#0d1410",
      accent: "#95a688",
      text: "#eef0e8",
      textSoft: "rgba(238, 240, 232, 0.66)",
    },
    description:
      "The Linnaean Circle was founded upon the conviction that every mystery, however " +
      "extraordinary, must have an explanation.\n\n" +
      "Its members are natural philosophers, physicians, investigators, and scholars who " +
      "seek to understand the hidden mechanisms of the living world.\n\n" +
      "Where others see destiny, the Circle sees patterns. Where others surrender to " +
      "wonder, its members ask for evidence.\n\n" +
      "Knowledge, they believe, is only valuable when it can withstand examination.",
    traits: [
      "Analytical",
      "Intellectually curious",
      "Disciplined",
      "Sceptical",
      "Patient",
      "Methodical",
      "Protective of individual autonomy",
    ],
    shadow: [
      "Emotional detachment",
      "Intellectual arrogance",
      "Rigidity",
      "The willingness to sacrifice uncertainty for control",
    ],
    signatureLine: "You question what others believe.",
    visualDirection: [
      "Victorian botanical illustration",
      "Pressed flowers",
      "Laboratory notebooks",
      "Brass instruments",
      "Natural history cabinets",
      "Ivy over stone",
    ],
    archival: "Records held in the natural sciences collection.",
    standing: "recognised",
    seo: {
      title: "The Linnaean Circle — The Societies of Alderwick",
      description:
        "The Society of the Natural Order. Everything has a cause; everything has a consequence — the scholars of Alderwick University, from Things I Shouldn't Say by DashaDay.",
    },
    verdict: {
      chosen:
        "The Circle does not gather the clever; cleverness is common and arrives " +
        "uninvited. It gathers those who can sit inside not knowing without hurrying to " +
        "fill the gap with a story.",
      flaw:
        "Certainty will arrive one day dressed as evidence, and you will be too tired, " +
        "or too pleased, to ask it for papers.",
      closing:
        "The Circle keeps its findings where they can be examined. It has been markedly " +
        "less careful about who examines them.",
      acceptance:
        "has demonstrated the patience to withhold judgement, and is accordingly admitted " +
        "to the study of causes and their consequences.",
      marginalia: "— the Circle asked for evidence. It did not ask for consent.",
    },
  },
  {
    id: "aurelian",
    slug: "aurelian",
    name: "The Aurelian Society",
    identity: "The Society of the Golden Legacy",
    archetype: "The Luminary",
    motto: "To be remembered is to live forever.",
    crest: "/image/series/societies/aurelian.webp",
    symbolDescription: "A golden laurel wreath surrounding a rising sun",
    colourNames: "Burgundy, antique gold, warm ivory",
    palette: {
      ground: "#120709",
      accent: "#c3a269",
      text: "#f3eade",
      textSoft: "rgba(243, 234, 222, 0.68)",
    },
    description:
      "At Alderwick, brilliance is not merely discovered. It is cultivated, celebrated, " +
      "and remembered.\n\n" +
      "The Aurelian Society has long gathered the university's most ambitious artists, " +
      "poets, musicians, writers, and future leaders.\n\n" +
      "Its members believe that art, beauty, and influence are forces capable of changing " +
      "history.\n\n" +
      "To the Aurelians, a life without legacy is a story left unwritten.",
    traits: [
      "Creative",
      "Expressive",
      "Ambitious",
      "Charismatic",
      "Romantic",
      "Imaginative",
      "Socially perceptive",
    ],
    shadow: [
      "Vanity",
      "Elitism",
      "Manipulation",
      "Hunger for recognition",
      "The temptation to confuse admiration with genuine connection",
    ],
    signatureLine: "You were never meant to be forgotten.",
    visualDirection: [
      "Burgundy velvet",
      "Gilded frames",
      "Victorian portraiture",
      "Candlelit music rooms",
      "Handwritten poetry",
      "Laurel motifs",
    ],
    archival: "Records held in the university's cultural collection.",
    standing: "recognised",
    seo: {
      title: "The Aurelian Society — The Societies of Alderwick",
      description:
        "The Society of the Golden Legacy. Alderwick's artists, poets and future leaders, who believe that to be remembered is to live forever — from Things I Shouldn't Say by DashaDay.",
    },
    verdict: {
      chosen:
        "The Society noticed that a room changes when you enter it — and, rather more " +
        "to the point, that you already knew it did.",
      flaw:
        "You will take being admired for being known. The difference is invisible for " +
        "years, and then it costs you one particular person.",
      closing:
        "Aurelian remembers everyone it gathers. You may find that is not always offered " +
        "as a kindness.",
      acceptance:
        "is received into the Society's company of artists, scholars and future names, " +
        "and is expected to leave something behind worth the remembering.",
      marginalia: "— every name on this roll was promised it would be remembered.",
    },
  },
];

export const societyBySlug = (slug?: string) => SOCIETIES.find((s) => s.slug === slug);

/**
 * THE MISSING FOUR.
 *
 * Seven societies in the oldest fragments, three in the recognised histories.
 * The other four are deliberately empty: no names, no histories, no reasons.
 * Inventing any of that here would write canon the series has not written.
 */
export const LOST_SOCIETIES = [
  { id: "iv", index: "IV", archive: "ALD/SOC/IV", note: "Entry struck through. Hand unidentified." },
  { id: "v", index: "V", archive: "ALD/SOC/V", note: "Pages removed prior to binding." },
  { id: "vi", index: "VI", archive: "ALD/SOC/VI", note: "Catalogued. Contents absent." },
  { id: "vii", index: "VII", archive: "ALD/SOC/VII", note: "Reference survives in a single footnote." },
] as const;

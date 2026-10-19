/**
 * Lyrics.
 *
 * These lived inline on the homepage, which is the one place a full set of
 * lyrics does not belong: the homepage is an introduction, and /lyrics was a
 * "coming soon" placeholder with nothing in it. The words moved to the page
 * that was already waiting for them.
 *
 * A blank string is a stanza break.
 */

export type Song = {
  slug: string;
  title: string;
  /** From which record, for the page's own subtitle. */
  album: string;
  /** Lines, with "" between stanzas. */
  lines: string[];
};

export const SONGS: Song[] = [
  {
    slug: "be-that",
    title: "Be That",
    album: "Things I Shouldn't Say",
    lines: [
      "Someone's broken, someone's burned,",
      "Someone's waiting, never learned.",
      "Someone's counting days in fear,",
      "Someone's lost why they are here.",
      "",
      "Someone's trading soul for shame,",
      "Fading slow in someone's name.",
      "Someone's praying, scared to hope,",
      "Wakes up crying, barely copes.",
      "",
      "Call me chaos, call me bright —",
      "I've been broken, still I bite.",
      "Painted tears and velvet rage,",
      "Watch me set fire to the cage.",
      "",
      "Be the one who walks through smoke,",
      "Holds the dream you never spoke.",
      "Don't just ache — become the fire,",
      "Turn your scars into desire.",
      "Be that.",
      "",
      "Be that bitch, be that flame,",
      "Be the thunder in the rain.",
      "Be that dream they said was dead —",
      "Rise in heels and paint it red.",
      "",
      "Someone's drowning in the blue,",
      "Drinks the ache like bitter truth.",
      "Hears the voices in the dark,",
      "Still they chase that distant spark.",
      "",
      "There are some who walk through smoke,",
      "Holding tight to dreams they spoke.",
      "They don't break, they bend like fire—",
      "Turning scars into desire.",
    ],
  },
];

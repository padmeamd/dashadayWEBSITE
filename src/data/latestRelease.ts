/**
 * The newest release.
 *
 * One place for the record that is currently out front. When the next single
 * lands, this file changes and the homepage follows; when a platform goes
 * live, it is one line here.
 *
 * Only platforms that are actually live belong in `platforms` — a link that
 * 404s on release day is worse than a link that is not there yet.
 */

export type ReleasePlatform = {
  label: string;
  href: string;
  /** The one a visitor should reach for first. */
  primary?: boolean;
};

export const LATEST_RELEASE = {
  kind: "Single",
  title: "FAMOUS",
  artist: "DashaDay",
  cover: "/image/albums/famous.webp",
  /** The artwork, described for anyone who cannot see it. */
  coverAlt:
    "FAMOUS single cover — DashaDay on a red carpet in silver armoured couture, surrounded by photographers",
  /** Kept short: this sits under a 3000px cover, not in a press release. */
  blurb:
    "A red carpet, a wall of shutters, and the particular loneliness of being looked at. Out now.",
  platforms: [
    { label: "Spotify", href: "https://open.spotify.com/album/7zFg1L8KTNEeCCqvNGqmpb", primary: true },
    { label: "Apple Music", href: "https://music.apple.com/gb/album/famous-single/6825275124" },
    { label: "YouTube", href: "https://www.youtube.com/watch?v=SadGMoMdgcQ&list=OLAK5uy_kr5t1O2cN1ux5cwTz4T4Xlzn239ZRARqM" },
    { label: "Deezer", href: "https://www.deezer.com/en/album/1126980151" },
    // Artist profile rather than the release itself — the direct album URL
    // has not been supplied yet, so this one lands a step away from FAMOUS.
    { label: "Amazon Music", href: "https://music.amazon.co.uk/artists/B08H51P4F6/dashaday" },
  ] satisfies ReleasePlatform[],
  /** Out everywhere now. */
  moreComing: false,
  /**
   * The official video. The poster is a real frame, letterboxed to 16:9 the
   * same way the player will letterbox the 4:3 film, so nothing jumps when it
   * starts.
   */
  video: {
    title: "FAMOUS (Official Music Video)",
    youtubeId: "fYLnqxIs84o",
    href: "https://youtu.be/fYLnqxIs84o",
    poster: "/image/albums/famous-video.webp",
  },
} as const;

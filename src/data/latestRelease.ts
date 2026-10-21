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
    { label: "YouTube", href: "https://www.youtube.com/watch?v=SadGMoMdgcQ&list=OLAK5uy_kr5t1O2cN1ux5cwTz4T4Xlzn239ZRARqM" },
  ] satisfies ReleasePlatform[],
  /** Shown while the rest of the stores are still catching up. */
  moreComing: true,
} as const;

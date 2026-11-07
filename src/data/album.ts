/**
 * The album, and where it can be heard.
 *
 * These URLs used to live inside the /listen page, which was fine while that
 * page was the only thing that needed them. The mobile welcome now offers the
 * same six, and two copies of a streaming link is two chances to be wrong, so
 * they moved here. The page keeps its icons; only the addresses are shared.
 */

export type AlbumPlatform = {
  /** Also the key the /listen page draws its icon from — keep the spelling. */
  name: string;
  url: string;
};

export const ALBUM = {
  title: "Things I Shouldn't Say",
  /** The record sleeve, as used on the album page. */
  cover: "/image/albums/tiss.webp",
  coverAlt: "Things I Shouldn't Say — album artwork by DashaDay",
  /** Where the whole thing lives on this site. */
  route: "/listen",
  platforms: [
    { name: "Spotify", url: "https://open.spotify.com/album/1ROwGXAQFQnqVBL0n3cI4E" },
    { name: "Apple Music", url: "https://music.apple.com/us/album/things-i-shouldnt-say/6770379845" },
    { name: "Amazon Music", url: "https://music.amazon.co.uk/albums/B0H2471FPX" },
    { name: "Deezer", url: "https://www.deezer.com/en/album/985067481" },
    { name: "SoundCloud", url: "https://soundcloud.com/heydashaday" },
    {
      name: "YouTube Music",
      url: "https://music.youtube.com/playlist?list=OLAK5uy_k3BpYvBuVCdV4L8DMI62g5umR1sf7Y00U",
    },
  ] satisfies AlbumPlatform[],
} as const;

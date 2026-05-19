import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";

const albums: Record<
  string,
  { title: string; year: string; color: string; coverImage?: string }
> = {
  "things-i-shouldnt-say": {
    title: "Things I Shouldn't Say",
    year: "2026",
    color: "from-gold/20 to-night-soft",
    coverImage: "/image/albums/tiss.jpg",
  },
  "great-romance": {
    title: "Great Romance",
    year: "2025",
    color: "from-night-card to-night",
    coverImage: "/image/albums/greatromance.jpg",
  },
  phobia: {
    title: "Phobia",
    year: "2023",
    color: "from-secondary to-night-card",
    coverImage: "/image/albums/phobia.JPG",
  },
  "work-of-art": {
    title: "Work of Art",
    year: "2021",
    color: "from-night-soft to-secondary",
    coverImage: "/image/albums/workofart.png",
  },
};

const platformIcons = {
  spotify: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  apple: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.997 6.124a9.23 9.23 0 00-.24-2.19 5.07 5.07 0 00-.4-1.09 4.66 4.66 0 00-.67-.9 4.66 4.66 0 00-.9-.67 5.07 5.07 0 00-1.09-.4 9.23 9.23 0 00-2.19-.24c-.51-.02-1.19-.03-2.48-.03H7.97c-1.29 0-1.97.01-2.48.03a9.23 9.23 0 00-2.19.24 5.07 5.07 0 00-1.09.4c-.32.17-.62.4-.9.67a4.66 4.66 0 00-.67.9c-.18.34-.32.7-.4 1.09a9.23 9.23 0 00-.24 2.19c-.02.51-.03 1.19-.03 2.48v6.88c0 1.29.01 1.97.03 2.48a9.23 9.23 0 00.24 2.19c.08.39.22.75.4 1.09.17.32.4.62.67.9.28.27.58.5.9.67.34.18.7.32 1.09.4a9.23 9.23 0 002.19.24c.51.02 1.19.03 2.48.03h8.06c1.29 0 1.97-.01 2.48-.03a9.23 9.23 0 002.19-.24 5.07 5.07 0 001.09-.4c.32-.17.62-.4.9-.67.27-.28.5-.58.67-.9.18-.34.32-.7.4-1.09a9.23 9.23 0 00.24-2.19c.02-.51.03-1.19.03-2.48V8.6c0-1.29-.01-1.97-.03-2.48z" />
    </svg>
  ),
  youtube: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228 18.228 15.432 18.228 12 15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z" />
    </svg>
  ),
  deezer: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38H6.27zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.594v3.027h5.189v-3.027H6.27zm6.27 0v3.027h5.19v-3.027h-5.19zm6.27 0v3.027H24v-3.027h-5.19zM0 16.81v3.029h5.19v-3.03H0zm6.27 0v3.029h5.189v-3.03H6.27zm6.27 0v3.029h5.19v-3.03h-5.19zm6.27 0v3.029H24v-3.03h-5.19z" />
    </svg>
  ),
  amazon: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.659.659 0 01-.75.071c-1.054-.876-1.244-1.283-1.822-2.117-1.742 1.778-2.977 2.31-5.235 2.31-2.673 0-4.756-1.649-4.756-4.951 0-2.578 1.396-4.332 3.386-5.192 1.725-.756 4.133-.891 5.977-1.1v-.41c0-.756.059-1.649-.386-2.302-.384-.58-1.124-.82-1.777-.82-1.209 0-2.286.62-2.549 1.903-.054.285-.261.567-.549.58l-3.063-.333c-.259-.057-.547-.266-.472-.66C6.036 1.57 9.198.074 12.015.074c1.432 0 3.304.38 4.434 1.458 1.433 1.349 1.295 3.149 1.295 5.11v4.632c0 1.393.578 2.004 1.121 2.756.19.264.231.579-.009.775-.603.501-1.68 1.434-2.272 1.958l-.44.032z" />
    </svg>
  ),
  soundcloud: (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
      <path d="M1.175 13.5c-.645 0-1.175.53-1.175 1.175v2.65c0 .645.53 1.175 1.175 1.175S2.35 17.97 2.35 17.325v-2.65c0-.645-.53-1.175-1.175-1.175zm2.65 1.5c-.645 0-1.175.53-1.175 1.175v1.15c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-1.15c0-.645-.53-1.175-1.175-1.175zm2.65-1c-.645 0-1.175.53-1.175 1.175v2.15c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-2.15c0-.645-.53-1.175-1.175-1.175zm2.65-.75c-.645 0-1.175.53-1.175 1.175v2.9c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-2.9c0-.645-.53-1.175-1.175-1.175zm2.65-1.25c-.645 0-1.175.53-1.175 1.175v4.15c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-4.15c0-.645-.53-1.175-1.175-1.175zm2.65-1.5c-.645 0-1.175.53-1.175 1.175v5.65c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-5.65c0-.645-.53-1.175-1.175-1.175zm2.65-2c-.645 0-1.175.53-1.175 1.175v8.15c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-8.15c0-.645-.53-1.175-1.175-1.175zm3.325-.5c0-3.59 2.91-6.5 6.5-6.5 1.54 0 2.95.535 4.06 1.43.24.18.29.52.11.76-.18.24-.52.29-.76.11a5.456 5.456 0 00-3.41-1.19c-2.76 0-5 2.24-5 5 0 .28-.22.5-.5.5h-1.225z" />
    </svg>
  ),
};

type PlatformKey = keyof typeof platformIcons;

const albumStreaming: Record<
  string,
  { name: string; key: PlatformKey; url: string }[]
> = {
  "work-of-art": [
    { name: "Apple Music", key: "apple", url: "https://music.apple.com/us/album/work-of-art/1566948706" },
    { name: "Spotify", key: "spotify", url: "https://open.spotify.com/album/0QvIpLRH4wMZQxn4DcELEA" },
    { name: "Amazon Music", key: "amazon", url: "https://music.amazon.co.uk/albums/B094MRTB4K" },
    { name: "Deezer", key: "deezer", url: "https://www.deezer.com/en/album/229246972" },
    { name: "SoundCloud", key: "soundcloud", url: "https://soundcloud.com/heydashaday" },
    { name: "YouTube Music", key: "youtube", url: "https://music.youtube.com/playlist?list=OLAK5uy_mzc56qZlMYdAzNiXy_y7MLF3AowOKSl0o" },
  ],
  phobia: [
    { name: "Apple Music", key: "apple", url: "https://music.apple.com/us/album/phobia/1696876488" },
    { name: "Spotify", key: "spotify", url: "https://open.spotify.com/album/46D4Q3nRv3cc0OSYNzmJp9" },
    { name: "Amazon Music", key: "amazon", url: "https://music.amazon.co.uk/albums/B0CBL9F8MM" },
    { name: "Deezer", key: "deezer", url: "https://www.deezer.com/en/album/463111605" },
    { name: "SoundCloud", key: "soundcloud", url: "https://soundcloud.com/heydashaday" },
    { name: "YouTube Music", key: "youtube", url: "https://music.youtube.com/playlist?list=OLAK5uy_ke-K6aDC9vIkGOukygUfgGo-ISHAv3cRE" },
  ],
  "great-romance": [
    { name: "Apple Music", key: "apple", url: "https://music.apple.com/us/album/great-romance/1812424141" },
    { name: "Spotify", key: "spotify", url: "https://open.spotify.com/album/1YNyLhVf6CKWkRPKsny8ll" },
    { name: "Amazon Music", key: "amazon", url: "https://music.amazon.co.uk/albums/B0F7GG4TDP" },
    { name: "SoundCloud", key: "soundcloud", url: "https://soundcloud.com/heydashaday" },
    { name: "Deezer", key: "deezer", url: "https://www.deezer.com/en/album/751632131" },
    { name: "YouTube Music", key: "youtube", url: "https://music.youtube.com/playlist?list=OLAK5uy_n3P9Jjorb3CMvwy6d1TrBngm5JjyzMQso" },
  ],
  "things-i-shouldnt-say": [
    { name: "Spotify", key: "spotify", url: "https://open.spotify.com/album/1ROwGXAQFQnqVBL0n3cI4E" },
    { name: "Apple Music", key: "apple", url: "https://music.apple.com/us/album/things-i-shouldnt-say/6770379845" },
    { name: "Amazon Music", key: "amazon", url: "https://music.amazon.co.uk/albums/B0H2471FPX" },
    { name: "Deezer", key: "deezer", url: "https://www.deezer.com/en/album/985067481" },
    { name: "SoundCloud", key: "soundcloud", url: "https://soundcloud.com/heydashaday" },
    { name: "YouTube Music", key: "youtube", url: "https://music.youtube.com/playlist?list=OLAK5uy_k3BpYvBuVCdV4L8DMI62g5umR1sf7Y00U" },
  ],
};

const AlbumDetail = () => {
  const { slug } = useParams();
  const album = albums[slug || ""];
  const streamingPlatforms = albumStreaming[slug || ""] ?? [];

  if (!album) {
    return (
      <main className="bg-night min-h-screen flex items-center justify-center">
        <p className="text-ivory">Album not found</p>
      </main>
    );
  }

  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <LightLeaksOverlay />

      <div className="fixed inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${album.color} opacity-20`} />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/90 to-night" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-8 sm:py-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 w-full max-w-2xl self-start sm:mb-10"
        >
          <Link
            to="/#music"
            className="inline-flex min-h-11 items-center gap-3 text-ivory/50 transition-colors hover:text-ivory group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Back</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`w-48 h-48 mx-auto mb-8 overflow-hidden glow-gold ${
              album.coverImage ? "" : `bg-gradient-to-br ${album.color}`
            }`}
          >
            {album.coverImage ? (
              <img
                src={album.coverImage}
                alt={`${album.title} album cover`}
                className="h-full w-full object-cover"
              />
            ) : null}
          </motion.div>
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            {album.year}
          </p>
          <h1
            className="text-editorial-display text-ivory mb-2 leading-tight"
            style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)" }}
          >
            {album.title}
          </h1>
          <p className="text-ivory/40 text-sm tracking-widest">by DashaDay</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 md:grid-cols-3"
        >
          {streamingPlatforms.map((platform, index) => (
            <motion.a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="group flex min-h-[120px] flex-col items-center justify-center gap-3 border border-ivory/10 bg-night/50 p-5 backdrop-blur-sm transition-all duration-500 hover:border-gold/50 hover:bg-gold/5 sm:gap-4 sm:p-8"
            >
              <span className="text-ivory/60 group-hover:text-gold transition-colors duration-500">
                {platformIcons[platform.key]}
              </span>
              <span className="text-ivory/70 group-hover:text-ivory text-sm tracking-widest transition-colors">
                {platform.name}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default AlbumDetail;

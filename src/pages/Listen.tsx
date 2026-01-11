import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FilmGrain from "@/components/FilmGrain";
import VHSScratchOverlay from "@/components/VHSScratchOverlay";
import heroImage from "@/assets/hero-dashaday.jpg";

const streamingPlatforms = [
  {
    name: "Spotify",
    url: "https://open.spotify.com",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.997 6.124a9.23 9.23 0 00-.24-2.19 5.07 5.07 0 00-.4-1.09 4.66 4.66 0 00-.67-.9 4.66 4.66 0 00-.9-.67 5.07 5.07 0 00-1.09-.4 9.23 9.23 0 00-2.19-.24c-.51-.02-1.19-.03-2.48-.03H7.97c-1.29 0-1.97.01-2.48.03a9.23 9.23 0 00-2.19.24 5.07 5.07 0 00-1.09.4c-.32.17-.62.4-.9.67a4.66 4.66 0 00-.67.9c-.18.34-.32.7-.4 1.09a9.23 9.23 0 00-.24 2.19c-.02.51-.03 1.19-.03 2.48v6.88c0 1.29.01 1.97.03 2.48a9.23 9.23 0 00.24 2.19c.08.39.22.75.4 1.09.17.32.4.62.67.9.28.27.58.5.9.67.34.18.7.32 1.09.4a9.23 9.23 0 002.19.24c.51.02 1.19.03 2.48.03h8.06c1.29 0 1.97-.01 2.48-.03a9.23 9.23 0 002.19-.24 5.07 5.07 0 001.09-.4c.32-.17.62-.4.9-.67.27-.28.5-.58.67-.9.18-.34.32-.7.4-1.09a9.23 9.23 0 00.24-2.19c.02-.51.03-1.19.03-2.48V8.6c0-1.29-.01-1.97-.03-2.48zM16.85 16.26c0 .38-.22.7-.56.82-.1.04-.22.06-.34.06-.24 0-.46-.1-.62-.28l-2.82-3.02v2.96c0 .38-.22.7-.56.82-.1.04-.22.06-.34.06-.24 0-.46-.1-.62-.28l-2.82-3.02v2.7c0 .44-.36.8-.8.8s-.8-.36-.8-.8V7.44c0-.38.22-.7.56-.82.1-.04.22-.06.34-.06.24 0 .46.1.62.28l2.82 3.02V7.16c0-.38.22-.7.56-.82.1-.04.22-.06.34-.06.24 0 .46.1.62.28l2.82 3.02v-2.7c0-.44.36-.8.8-.8s.8.36.8.8v9.38z"/>
      </svg>
    ),
  },
  {
    name: "YouTube Music",
    url: "https://music.youtube.com",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.376 0 0 5.376 0 12s5.376 12 12 12 12-5.376 12-12S18.624 0 12 0zm0 19.104c-3.924 0-7.104-3.18-7.104-7.104S8.076 4.896 12 4.896s7.104 3.18 7.104 7.104-3.18 7.104-7.104 7.104zm0-13.332c-3.432 0-6.228 2.796-6.228 6.228S8.568 18.228 12 18.228 18.228 15.432 18.228 12 15.432 5.772 12 5.772zM9.684 15.54V8.46L15.816 12l-6.132 3.54z"/>
      </svg>
    ),
  },
  {
    name: "Deezer",
    url: "https://www.deezer.com",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38H6.27zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.594v3.027h5.189v-3.027H6.27zm6.27 0v3.027h5.19v-3.027h-5.19zm6.27 0v3.027H24v-3.027h-5.19zM0 16.81v3.029h5.19v-3.03H0zm6.27 0v3.029h5.189v-3.03H6.27zm6.27 0v3.029h5.19v-3.03h-5.19zm6.27 0v3.029H24v-3.03h-5.19z"/>
      </svg>
    ),
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.com",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.659.659 0 01-.75.071c-1.054-.876-1.244-1.283-1.822-2.117-1.742 1.778-2.977 2.31-5.235 2.31-2.673 0-4.756-1.649-4.756-4.951 0-2.578 1.396-4.332 3.386-5.192 1.725-.756 4.133-.891 5.977-1.1v-.41c0-.756.059-1.649-.386-2.302-.384-.58-1.124-.82-1.777-.82-1.209 0-2.286.62-2.549 1.903-.054.285-.261.567-.549.58l-3.063-.333c-.259-.057-.547-.266-.472-.66C6.036 1.57 9.198.074 12.015.074c1.432 0 3.304.38 4.434 1.458 1.433 1.349 1.295 3.149 1.295 5.11v4.632c0 1.393.578 2.004 1.121 2.756.19.264.231.579-.009.775-.603.501-1.68 1.434-2.272 1.958l-.44.032z"/>
        <path d="M21.681 19.682C19.071 21.7 15.343 22.8 12.103 22.8c-4.56 0-8.67-1.687-11.775-4.494-.244-.22-.026-.522.267-.35C4.019 20.297 8.092 21.6 12.35 21.6c2.635 0 5.531-.547 8.198-1.68.402-.174.739.264.353.562l-.22.2z"/>
      </svg>
    ),
  },
  {
    name: "Tidal",
    url: "https://tidal.com",
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0L8 4l4 4-4 4 4 4 4-4-4-4 4-4-4-4zm-8 8l-4 4 4 4 4-4-4-4zm16 0l-4 4 4 4 4-4-4-4z"/>
      </svg>
    ),
  },
];

const Listen = () => {
  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <VHSScratchOverlay />

      {/* Background image */}
      <div className="fixed inset-0">
        <img
          src={heroImage}
          alt=""
          className="w-full h-full object-cover opacity-20 blur-xl scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-night via-night/90 to-night" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-8 py-24">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-8 left-8"
        >
          <Link
            to="/"
            className="flex items-center gap-3 text-ivory/50 hover:text-ivory transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Back</span>
          </Link>
        </motion.div>

        {/* Album info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <p className="text-gold text-xs tracking-[0.4em] uppercase mb-4">
            Stream Now
          </p>
          <h1 className="text-hero text-editorial-display text-ivory mb-2">
            Midnight Hour
          </h1>
          <p className="text-ivory/40 text-sm tracking-widest">
            by DashaDay
          </p>
        </motion.div>

        {/* Streaming platforms grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl w-full"
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
              className="flex flex-col items-center gap-4 p-8 border border-ivory/10 hover:border-gold/50 bg-night/50 backdrop-blur-sm hover:bg-gold/5 transition-all duration-500 group"
            >
              <span className="text-ivory/60 group-hover:text-gold transition-colors duration-500">
                {platform.icon}
              </span>
              <span className="text-ivory/70 group-hover:text-ivory text-sm tracking-widest transition-colors">
                {platform.name}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <p className="text-ivory/30 text-xs tracking-widest uppercase mb-6">
            Follow DashaDay
          </p>
          <div className="flex items-center gap-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/40 hover:text-gold transition-colors text-sm tracking-widest"
            >
              Instagram
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/40 hover:text-gold transition-colors text-sm tracking-widest"
            >
              X
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-ivory/40 hover:text-gold transition-colors text-sm tracking-widest"
            >
              TikTok
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default Listen;

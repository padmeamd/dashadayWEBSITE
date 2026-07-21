import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";

const PLATFORMS = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/3XVaHujuNOBwtjM4XNpxRr",
    color: "from-[#1DB954]/20 to-[#1DB954]/5",
    borderHover: "hover:border-[#1DB954]/40",
    iconColor: "group-hover:text-[#1DB954]",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/us/artist/dashaday/1529962263",
    color: "from-[#fc3c44]/20 to-[#fc3c44]/5",
    borderHover: "hover:border-[#fc3c44]/40",
    iconColor: "group-hover:text-[#fc3c44]",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.997 6.124a9.23 9.23 0 00-.24-2.19 5.07 5.07 0 00-.4-1.09 4.66 4.66 0 00-.67-.9 4.66 4.66 0 00-.9-.67 5.07 5.07 0 00-1.09-.4 9.23 9.23 0 00-2.19-.24c-.51-.02-1.19-.03-2.48-.03H7.97c-1.29 0-1.97.01-2.48.03a9.23 9.23 0 00-2.19.24 5.07 5.07 0 00-1.09.4c-.32.17-.62.4-.9.67a4.66 4.66 0 00-.67.9c-.18.34-.32.7-.4 1.09a9.23 9.23 0 00-.24 2.19c-.02.51-.03 1.19-.03 2.48v6.88c0 1.29.01 1.97.03 2.48a9.23 9.23 0 00.24 2.19c.08.39.22.75.4 1.09.17.32.4.62.67.9.28.27.58.5.9.67.34.18.7.32 1.09.4a9.23 9.23 0 002.19.24c.51.02 1.19.03 2.48.03h8.06c1.29 0 1.97-.01 2.48-.03a9.23 9.23 0 002.19-.24 5.07 5.07 0 001.09-.4c.32-.17.62-.4.9-.67.27-.28.5-.58.67-.9.18-.34.32-.7.4-1.09a9.23 9.23 0 00.24-2.19c.02-.51.03-1.19.03-2.48V8.6c0-1.29-.01-1.97-.03-2.48zM16.94 17.49c-.16.29-.35.38-.62.22-.19-.1-1.17-.62-2.87-1.21-1.58-.54-3.29-.83-5.09-.83-.74 0-1.48.06-2.19.18-.25.04-.43-.04-.49-.25-.06-.21.04-.43.25-.49.78-.14 1.58-.2 2.39-.2 1.92 0 3.74.31 5.43.89 1.79.62 2.84 1.17 3.07 1.3.23.13.28.33.12.59z" />
      </svg>
    ),
  },
  {
    name: "Amazon Music",
    url: "https://music.amazon.co.uk/artists/B08H51P4F6/dashaday",
    color: "from-[#25d1da]/20 to-[#25d1da]/5",
    borderHover: "hover:border-[#25d1da]/40",
    iconColor: "group-hover:text-[#25d1da]",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.659.659 0 01-.75.071c-1.054-.876-1.244-1.283-1.822-2.117-1.742 1.778-2.977 2.31-5.235 2.31-2.673 0-4.756-1.649-4.756-4.951 0-2.578 1.396-4.332 3.386-5.192 1.725-.756 4.133-.891 5.977-1.1v-.41c0-.756.059-1.649-.386-2.302-.384-.58-1.124-.82-1.777-.82-1.209 0-2.286.62-2.549 1.903-.054.285-.261.567-.549.58l-3.063-.333c-.259-.057-.547-.266-.472-.66C6.036 1.57 9.198.074 12.015.074c1.432 0 3.304.38 4.434 1.458 1.433 1.349 1.295 3.149 1.295 5.11v4.632c0 1.393.578 2.004 1.121 2.756.19.264.231.579-.009.775-.603.501-1.68 1.434-2.272 1.958l-.44.032z" />
      </svg>
    ),
  },
  {
    name: "SoundCloud",
    url: "https://soundcloud.com/heydashaday",
    color: "from-[#ff5500]/20 to-[#ff5500]/5",
    borderHover: "hover:border-[#ff5500]/40",
    iconColor: "group-hover:text-[#ff5500]",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.175 13.5c-.645 0-1.175.53-1.175 1.175v2.65c0 .645.53 1.175 1.175 1.175S2.35 17.97 2.35 17.325v-2.65c0-.645-.53-1.175-1.175-1.175zm2.65 1.5c-.645 0-1.175.53-1.175 1.175v1.15c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-1.15c0-.645-.53-1.175-1.175-1.175zm2.65-1c-.645 0-1.175.53-1.175 1.175v2.15c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-2.15c0-.645-.53-1.175-1.175-1.175zm2.65-.75c-.645 0-1.175.53-1.175 1.175v2.9c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-2.9c0-.645-.53-1.175-1.175-1.175zm2.65-1.25c-.645 0-1.175.53-1.175 1.175v4.15c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-4.15c0-.645-.53-1.175-1.175-1.175zm2.65-1.5c-.645 0-1.175.53-1.175 1.175v5.65c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-5.65c0-.645-.53-1.175-1.175-1.175zm2.65-2c-.645 0-1.175.53-1.175 1.175v8.15c0 .645.53 1.175 1.175 1.175s1.175-.53 1.175-1.175v-8.15c0-.645-.53-1.175-1.175-1.175zm3.325-.5c0-3.59 2.91-6.5 6.5-6.5 1.54 0 2.95.535 4.06 1.43.24.18.29.52.11.76-.18.24-.52.29-.76.11a5.456 5.456 0 00-3.41-1.19c-2.76 0-5 2.24-5 5 0 .28-.22.5-.5.5h-1.225z" />
      </svg>
    ),
  },
  {
    name: "Deezer",
    url: "https://www.deezer.com/en/artist/105704202",
    color: "from-[#a238ff]/20 to-[#a238ff]/5",
    borderHover: "hover:border-[#a238ff]/40",
    iconColor: "group-hover:text-[#a238ff]",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.81 4.16v3.03H24V4.16h-5.19zM6.27 8.38v3.027h5.189V8.38H6.27zm12.54 0v3.027H24V8.38h-5.19zM6.27 12.594v3.027h5.189v-3.027H6.27zm6.27 0v3.027h5.19v-3.027h-5.19zm6.27 0v3.027H24v-3.027h-5.19zM0 16.81v3.029h5.19v-3.03H0zm6.27 0v3.029h5.189v-3.03H6.27zm6.27 0v3.029h5.19v-3.03h-5.19zm6.27 0v3.029H24v-3.03h-5.19z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UC8WRkNqusG6IorUIzdeBl6w",
    color: "from-[#FF0000]/20 to-[#FF0000]/5",
    borderHover: "hover:border-[#FF0000]/40",
    iconColor: "group-hover:text-[#FF0000]",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const SOCIALS = [
  {
    name: "Instagram",
    handle: "@heydashaday",
    url: "https://www.instagram.com/heydashaday/",
    color: "from-[#E4405F]/20 via-[#FCAF45]/10 to-[#833AB4]/20",
    borderHover: "hover:border-[#E4405F]/40",
    iconColor: "group-hover:text-[#E4405F]",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    handle: "@dashadaymusic",
    url: "https://www.tiktok.com/@dashadaymusic",
    color: "from-[#00f2ea]/15 to-[#ff0050]/15",
    borderHover: "hover:border-[#00f2ea]/40",
    iconColor: "group-hover:text-[#00f2ea]",
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
];

const Links = () => {
  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <LightLeaksOverlay />

      {/* Decorative background glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-gold/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-[#E4405F]/[0.02] blur-[100px]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center px-4 py-8 sm:px-8 sm:py-14">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 w-full max-w-lg self-start sm:mb-8"
        >
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-3 text-ivory/50 transition-colors hover:text-ivory group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Back</span>
          </Link>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 flex flex-col items-center text-center"
        >
          <div className="relative mb-5">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/40 via-[#E4405F]/20 to-gold/30 blur-sm" />
            <img
              src="/image/logod.png"
              alt="DashaDay"
              className="relative w-24 h-24 rounded-full border-2 border-gold/20 object-cover"
            />
          </div>
          <h1 className="text-editorial-display text-3xl text-ivory mb-1.5">DashaDay</h1>
          <p className="text-ivory/40 text-sm tracking-[0.25em] uppercase mb-4">Cinematic Pop Artist</p>
          <p className="text-ivory/30 text-xs max-w-xs leading-relaxed">
            London-based artist creating immersive musical and visual experiences
          </p>
        </motion.div>

        {/* Content */}
        <div className="w-full max-w-lg">
          {/* Music platforms */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4 text-center font-light">
              Stream My Music
            </p>

            <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-8">
              {PLATFORMS.map((platform, i) => (
                <motion.a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
                  className={`group relative flex items-center gap-3 rounded-xl border border-ivory/[0.08] bg-white/[0.02] px-4 py-3.5 transition-all duration-300 ${platform.borderHover} hover:bg-white/[0.04] hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r ${platform.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                  <span className={`relative text-ivory/40 ${platform.iconColor} transition-colors duration-300`}>
                    {platform.icon}
                  </span>
                  <span className="relative flex-1 text-ivory/70 group-hover:text-ivory text-sm tracking-wider transition-colors duration-300">
                    {platform.name}
                  </span>
                  <svg
                    className="relative w-3.5 h-3.5 text-ivory/15 group-hover:text-ivory/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mx-auto mb-8"
          />

          {/* Social section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75 }}
          >
            <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4 text-center font-light">
              Follow Me
            </p>

            <div className="space-y-2.5 mb-8">
              {SOCIALS.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.85 + i * 0.08 }}
                  className={`group relative flex items-center gap-4 rounded-xl border border-ivory/[0.08] bg-white/[0.02] px-5 py-4 transition-all duration-300 ${social.borderHover} hover:bg-white/[0.04] hover:scale-[1.02] active:scale-[0.98]`}
                >
                  <div className={`pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                  <span className={`relative text-ivory/40 ${social.iconColor} transition-colors duration-300`}>
                    {social.icon}
                  </span>
                  <div className="relative flex-1 min-w-0">
                    <span className="block text-ivory/80 group-hover:text-ivory text-sm tracking-wider transition-colors duration-300">
                      {social.name}
                    </span>
                    <span className="block text-ivory/25 group-hover:text-ivory/40 text-xs tracking-wide transition-colors duration-300">
                      {social.handle}
                    </span>
                  </div>
                  <svg
                    className="relative w-3.5 h-3.5 text-ivory/15 group-hover:text-ivory/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mb-8"
          >
            <Link
              to="/contact"
              className="group relative flex items-center justify-center gap-3 rounded-xl border border-gold/20 bg-gold/[0.04] px-5 py-4 transition-all duration-300 hover:border-gold/40 hover:bg-gold/[0.08] hover:scale-[1.02] active:scale-[0.98]"
            >
              <svg className="w-5 h-5 text-gold/60 group-hover:text-gold transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              <span className="text-gold/70 group-hover:text-gold text-sm tracking-[0.2em] uppercase transition-colors">
                Get in Touch
              </span>
            </Link>
          </motion.div>

          {/* Website link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-center pb-4"
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-ivory/20 hover:text-gold/50 text-xs tracking-[0.25em] uppercase transition-colors duration-300"
            >
              heydashaday.com
            </Link>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default Links;

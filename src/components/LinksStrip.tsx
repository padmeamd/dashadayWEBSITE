import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink } from "lucide-react";

const LINKS = [
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/3XVaHujuNOBwtjM4XNpxRr",
    color: "#1DB954",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/us/artist/dashaday/1529962263",
    color: "#fc3c44",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 361 361" fill="currentColor">
        <path d="M255.5 0h-150C47.3 0 0 47.3 0 105.5v150C0 313.7 47.3 361 105.5 361h150c58.2 0 105.5-47.3 105.5-105.5v-150C361 47.3 313.7 0 255.5 0zM280 236.8c0 32.7-22.7 60.3-53.4 67.6-4.3 1-8.8 1.6-13.3 1.6-11.2 0-21.5-3.6-29.9-9.8-11.3-8.3-18.7-21.7-18.7-36.8 0-24.9 20.2-45.1 45.1-45.1 4.9 0 9.6.8 14 2.2V142l-104 22.3v114.5c0 32.7-22.7 60.3-53.4 67.6-4.3 1-8.8 1.6-13.3 1.6-11.2 0-21.5-3.6-29.9-9.8-11.3-8.3-18.7-21.7-18.7-36.8 0-24.9 20.2-45.1 45.1-45.1 4.9 0 9.6.8 14 2.2V119.8c0-10.1 7.1-18.8 17-20.9l118-25.3c6.1-1.3 12.3.4 17 4.5 4.6 4.1 7.3 10 7.3 16.4V236.8z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/heydashaday/",
    color: "#E1306C",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@dashadaymusic",
    color: "#ff0050",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/channel/UC8WRkNqusG6IorUIzdeBl6w",
    color: "#FF0000",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

const LinksStrip = () => (
  <section className="relative z-10 py-8 sm:py-10 overflow-hidden">
    <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/15" />
        <span className="text-gold/40 text-[10px] tracking-[0.4em] uppercase font-light flex items-center gap-2">
          <ExternalLink className="w-3 h-3" />
          Find Me
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/15" />
      </motion.div>

      {/* Platform icons row */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex items-center justify-center gap-3 sm:gap-4 mb-5"
      >
        {LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-ivory/[0.08] bg-ivory/[0.03] text-ivory/40 transition-all duration-300 hover:scale-110"
            style={{
              ["--link-color" as string]: link.color,
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = `${link.color}66`;
              el.style.color = link.color;
              el.style.boxShadow = `0 0 20px ${link.color}22`;
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.borderColor = "";
              el.style.color = "";
              el.style.boxShadow = "";
            }}
            aria-label={link.name}
          >
            {link.icon}
          </a>
        ))}
      </motion.div>

      {/* See all button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-center"
      >
        <Link
          to="/links"
          className="inline-flex items-center gap-2 border border-gold/20 px-6 py-2.5 text-[11px] tracking-[0.25em] uppercase text-gold/50 transition-all duration-400 hover:bg-gold/[0.06] hover:border-gold/35 hover:text-gold/70"
        >
          See All Links
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default LinksStrip;

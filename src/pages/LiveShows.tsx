import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Clock, Ticket } from "lucide-react";
import { useRef, useMemo } from "react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";

/* ────────────────────────── DATA ────────────────────────── */

const SHOWS = [
  {
    id: "jul-30",
    dateNum: "30",
    month: "July",
    day: "Wednesday",
    year: "2026",
    time: "Doors 7 PM",
    title: "Flamboyant Bone + Gravity Riot",
    venue: "The Bread and Roses",
    city: "London",
    ticketUrl:
      "https://dice.fm/event/k6yglp-flamboyant-bone-gravity-riot-30th-jul-the-bread-and-roses-london-tickets",
    diary: "A warm pub stage, close enough to feel the crowd breathe with you.",
  },
  {
    id: "aug-2",
    dateNum: "2",
    month: "August",
    day: "Saturday",
    year: "2026",
    time: "Doors 7 PM",
    title: "DashaDay: Pre-Birthday Celebration",
    venue: "Aces & Eights Saloon Bar",
    city: "London",
    ticketUrl:
      "https://www.bandsintown.com/t/108619704?app_id=50017ce9c97df54ca7dfca64854274b1&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
    featured: true,
    diary:
      "The night before everything changes. A celebration of the songs, the stories, and the people who made it all matter.",
  },
];

/* ────────────────────────── ATMOSPHERE ────────────────────────── */

function DustMotes() {
  const particles = useMemo(
    () =>
      Array.from({ length: 35 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 11) % 100}%`,
        top: `${(i * 43 + 7) % 100}%`,
        size: 1 + (i % 3) * 0.5,
        dur: 14 + (i % 9) * 2.5,
        delay: (i % 7) * 0.4,
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] overflow-hidden" aria-hidden>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-[hsl(40_28%_88%/0.08)]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{
            y: [0, -18, 6, -12, 0],
            x: [0, 5, -4, 7, 0],
            opacity: [0.03, 0.12, 0.05, 0.1, 0.03],
          }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
        />
      ))}
    </div>
  );
}

function MarqueeBulbs() {
  const bulbs = useMemo(() => Array.from({ length: 24 }, (_, i) => i), []);
  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3" aria-hidden>
      {bulbs.map((i) => (
        <motion.span
          key={i}
          className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(38 80% 65%) 0%, hsl(38 60% 40%) 60%, hsl(38 40% 25%) 100%)",
            boxShadow: "0 0 6px hsl(38 70% 50% / 0.5), 0 0 12px hsl(38 60% 40% / 0.2)",
          }}
          animate={{
            opacity: [0.3, 0.9, 0.5, 1, 0.4, 0.85, 0.3],
            scale: [0.9, 1.1, 0.95, 1.15, 0.9],
          }}
          transition={{
            duration: 2.5 + (i % 5) * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.12,
          }}
        />
      ))}
    </div>
  );
}

function VelvetCurtains() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden>
      {/* Left curtain */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[15%] sm:w-[12%]"
        initial={{ x: 0 }}
        animate={{ x: [0, -2, 1, -1, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to right, hsl(350 35% 8% / 0.95) 0%, hsl(350 30% 12% / 0.7) 30%, hsl(350 28% 14% / 0.4) 60%, hsl(350 25% 10% / 0.15) 80%, transparent 100%)",
          }}
        />
        {/* Curtain fold highlights */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(to right, transparent 0%, hsl(350 20% 18% / 0.08) 8%, transparent 16%, hsl(38 30% 30% / 0.04) 24%, transparent 32%)",
          }}
        />
      </motion.div>

      {/* Right curtain */}
      <motion.div
        className="absolute right-0 top-0 bottom-0 w-[15%] sm:w-[12%]"
        initial={{ x: 0 }}
        animate={{ x: [0, 2, -1, 1, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className="h-full w-full"
          style={{
            background:
              "linear-gradient(to left, hsl(350 35% 8% / 0.95) 0%, hsl(350 30% 12% / 0.7) 30%, hsl(350 28% 14% / 0.4) 60%, hsl(350 25% 10% / 0.15) 80%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "repeating-linear-gradient(to left, transparent 0%, hsl(350 20% 18% / 0.08) 8%, transparent 16%, hsl(38 30% 30% / 0.04) 24%, transparent 32%)",
          }}
        />
      </motion.div>

      {/* Top drape */}
      <div
        className="absolute top-0 left-0 right-0 h-12 sm:h-20"
        style={{
          background:
            "linear-gradient(to bottom, hsl(350 35% 7% / 0.85) 0%, hsl(350 28% 8% / 0.4) 50%, transparent 100%)",
        }}
      />

      {/* Curtain tassels */}
      <motion.div
        className="absolute left-[12%] sm:left-[10%] top-8 sm:top-14 w-4 h-16 sm:h-20"
        animate={{ rotate: [0, 1.5, -1, 0.5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-0.5 h-full mx-auto bg-gradient-to-b from-gold/30 via-gold/15 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-gold/20 bg-gold/5" />
      </motion.div>
      <motion.div
        className="absolute right-[12%] sm:right-[10%] top-8 sm:top-14 w-4 h-16 sm:h-20"
        animate={{ rotate: [0, -1.5, 1, -0.5, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-0.5 h-full mx-auto bg-gradient-to-b from-gold/30 via-gold/15 to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border border-gold/20 bg-gold/5" />
      </motion.div>
    </div>
  );
}

function ChandelierGlow() {
  return (
    <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 z-[3] w-full max-w-4xl" aria-hidden>
      {/* Main chandelier warm pool */}
      <motion.div
        className="mx-auto w-[300px] h-[300px] sm:w-[500px] sm:h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, hsl(38 65% 50% / 0.08) 0%, hsl(30 50% 35% / 0.04) 40%, transparent 70%)",
        }}
        animate={{ opacity: [0.6, 0.9, 0.7, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Chandelier fixture hint */}
      <motion.div
        className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-8 sm:h-12"
        style={{ background: "linear-gradient(to bottom, hsl(38 40% 50% / 0.15), transparent)" }}
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function BackstageSmoke() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[4] overflow-hidden" aria-hidden>
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[40%]"
        style={{
          background:
            "linear-gradient(to top, hsl(350 20% 10% / 0.3) 0%, hsl(350 15% 12% / 0.08) 40%, transparent 100%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.5, 0.65, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[20%] w-[60%] h-[30%] rounded-full"
        style={{
          background: "radial-gradient(ellipse, hsl(30 15% 20% / 0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ x: [-20, 30, -10, 20, -20], opacity: [0.3, 0.5, 0.35, 0.45, 0.3] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ────────────────────────── HERO ────────────────────────── */

function TheatreHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div ref={ref} className="relative min-h-[70vh] sm:min-h-[80vh] flex flex-col items-center justify-center px-4">
      <ChandelierGlow />

      <motion.div
        style={{ y: titleY, opacity: titleOpacity }}
        className="relative z-10 text-center max-w-3xl mx-auto"
      >
        {/* Marquee bulbs top */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <MarqueeBulbs />
        </motion.div>

        {/* Theatre signage title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-editorial-display text-ivory mb-3"
          style={{
            fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
            lineHeight: 1,
            textShadow:
              "0 0 60px hsl(38 65% 50% / 0.2), 0 0 120px hsl(38 50% 40% / 0.08), 0 4px 30px hsl(0 0% 0% / 0.6)",
            letterSpacing: "0.08em",
          }}
        >
          Live Shows
        </motion.h1>

        {/* Marquee bulbs bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.7 }}
          className="mb-8 sm:mb-10"
        >
          <MarqueeBulbs />
        </motion.div>

        {/* Ornamental divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold/30" />
          <svg className="w-4 h-4 text-gold/40" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
          </svg>
          <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold/30" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1 }}
          className="font-serif text-ivory/40 text-base sm:text-lg italic leading-relaxed max-w-lg mx-auto"
          style={{ textShadow: "0 2px 12px hsl(0 0% 0% / 0.5)" }}
        >
          Every performance tells a story. Every city becomes part of it.
        </motion.p>
      </motion.div>
    </div>
  );
}

/* ────────────────────────── SHOW POSTER ────────────────────────── */

function VintagePoster({
  show,
  index,
}: {
  show: (typeof SHOWS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const tilt = index % 2 === 0 ? -1.2 : 1.2;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotate: tilt * 2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: tilt } : {}}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Shadow / depth */}
      <div className="absolute inset-0 translate-y-2 translate-x-1 rounded-sm bg-black/30 blur-xl transition-all duration-700 group-hover:translate-y-4 group-hover:blur-2xl" />

      {/* Poster frame */}
      <motion.div
        whileHover={{ rotate: 0, scale: 1.02, y: -6 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`relative overflow-hidden border transition-all duration-700 ${
          show.featured
            ? "border-gold/30 shadow-[0_0_50px_hsl(38_60%_40%/0.1),inset_0_0_60px_hsl(38_50%_30%/0.05)]"
            : "border-gold/10 shadow-[0_0_30px_hsl(0_0%_0%/0.3)]"
        }`}
        style={{ background: "linear-gradient(135deg, hsl(350 25% 9%) 0%, hsl(350 20% 7%) 50%, hsl(345 22% 8%) 100%)" }}
      >
        {/* Paper texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gold foil border inset */}
        <div className="absolute inset-3 sm:inset-4 border border-gold/[0.08] pointer-events-none z-[1]" />
        <div className="absolute inset-4 sm:inset-5 border border-gold/[0.04] pointer-events-none z-[1]" />

        {/* Corner ornaments */}
        {[
          "top-3 left-3 sm:top-4 sm:left-4",
          "top-3 right-3 sm:top-4 sm:right-4 -scale-x-100",
          "bottom-3 left-3 sm:bottom-4 sm:left-4 -scale-y-100",
          "bottom-3 right-3 sm:bottom-4 sm:right-4 -scale-x-100 -scale-y-100",
        ].map((pos, ci) => (
          <div key={ci} className={`absolute ${pos} pointer-events-none z-[1]`}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold/15">
              <path d="M0 0v8c0-2 2-4 4-4h4c-4 0-6 0-8-4z" fill="currentColor" />
              <path d="M0 0h8M0 0v8" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            </svg>
          </div>
        ))}

        {/* Warm light sweep on hover */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "linear-gradient(120deg, transparent 20%, hsl(38 60% 50% / 0.04) 40%, hsl(38 70% 55% / 0.06) 50%, hsl(38 60% 50% / 0.04) 60%, transparent 80%)",
          }}
        />

        {/* Content */}
        <div className="relative z-[3] p-6 sm:p-8 md:p-10">
          {/* Featured wax seal */}
          {show.featured && (
            <motion.div
              className="absolute -top-1 -right-1 sm:top-2 sm:right-2 z-10"
              animate={{ rotate: [0, 2, -2, 1, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative w-14 h-14 sm:w-16 sm:h-16">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 35% 35%, hsl(350 50% 30%) 0%, hsl(350 45% 22%) 50%, hsl(350 40% 16%) 100%)",
                    boxShadow: "0 2px 8px hsl(0 0% 0% / 0.4), inset 0 1px 2px hsl(350 30% 40% / 0.3)",
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center font-hand text-gold/70 text-lg sm:text-xl">
                  D
                </span>
              </div>
            </motion.div>
          )}

          {/* Date presentation */}
          <div className="text-center mb-6 sm:mb-8">
            <motion.span
              className="block text-gold/40 text-[10px] tracking-[0.4em] uppercase font-light"
              animate={show.featured ? { opacity: [0.4, 0.7, 0.4] } : {}}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              {show.day}
            </motion.span>
            <span
              className="block text-editorial-display text-ivory text-5xl sm:text-7xl leading-none mt-2"
              style={{
                textShadow: show.featured
                  ? "0 0 30px hsl(38 70% 50% / 0.15), 0 2px 12px hsl(0 0% 0% / 0.4)"
                  : "0 2px 12px hsl(0 0% 0% / 0.4)",
              }}
            >
              {show.dateNum}
            </span>
            <span className="block text-ivory/25 text-xs tracking-[0.3em] uppercase mt-2 font-light">
              {show.month} {show.year}
            </span>
          </div>

          {/* Gold ornamental line */}
          <div className="flex items-center justify-center gap-2 mb-6 sm:mb-8">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/15" />
            <svg className="w-3 h-3 text-gold/20" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
              <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12 3.75 7.5 0 4.5h4.5z" />
            </svg>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/15" />
          </div>

          {/* Title */}
          <h3
            className="text-editorial-display text-ivory text-xl sm:text-2xl md:text-3xl text-center mb-6 leading-tight"
            style={{ textShadow: "0 2px 16px hsl(0 0% 0% / 0.5)" }}
          >
            {show.title}
          </h3>

          {/* Venue & city */}
          <div className="text-center space-y-2 mb-6">
            <div className="flex items-center justify-center gap-2 text-ivory/50">
              <MapPin className="w-3.5 h-3.5 text-gold/40" />
              <span className="font-serif text-sm tracking-wider">{show.venue}</span>
            </div>
            <span className="block text-ivory/25 text-xs tracking-[0.2em] uppercase">{show.city}</span>
            <div className="flex items-center justify-center gap-2 text-ivory/30">
              <Clock className="w-3 h-3 text-gold/30" />
              <span className="text-xs tracking-wider">{show.time}</span>
            </div>
          </div>

          {/* Diary note */}
          {show.diary && (
            <div className="mb-8 text-center">
              <p className="font-hand text-gold/30 text-lg sm:text-xl leading-relaxed max-w-xs mx-auto">
                &ldquo;{show.diary}&rdquo;
              </p>
            </div>
          )}

          {/* Ticket button */}
          <div className="text-center">
            <a
              href={show.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`group/btn inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.25em] uppercase transition-all duration-500 ${
                show.featured
                  ? "border border-gold/40 bg-gold/[0.08] text-gold hover:bg-gold/15 hover:border-gold/60 hover:shadow-[0_0_30px_hsl(38_60%_40%/0.15)]"
                  : "border border-ivory/15 text-ivory/60 hover:border-gold/30 hover:text-gold hover:bg-gold/[0.04]"
              }`}
            >
              <Ticket className="w-4 h-4 transition-transform duration-300 group-hover/btn:rotate-12" />
              <span>Get Tickets</span>
            </a>
          </div>
        </div>

        {/* Aged edge effect */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            boxShadow:
              "inset 0 0 60px hsl(350 25% 6% / 0.4), inset 0 0 120px hsl(350 20% 5% / 0.2)",
          }}
        />
      </motion.div>

      {/* Pin / tack */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-20">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background: "radial-gradient(circle at 35% 35%, hsl(38 60% 65%) 0%, hsl(38 50% 40%) 100%)",
            boxShadow: "0 2px 4px hsl(0 0% 0% / 0.4)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ────────────────────────── INVITATION (featured) ────────────────────────── */

function FeaturedInvitation({ show }: { show: (typeof SHOWS)[number] }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative max-w-xl mx-auto"
    >
      {/* Envelope shadow */}
      <div className="absolute inset-0 translate-y-4 bg-black/20 blur-2xl rounded-sm" />

      <div
        className="relative overflow-hidden border border-gold/20"
        style={{
          background:
            "linear-gradient(160deg, hsl(38 20% 14% / 0.9) 0%, hsl(35 18% 10% / 0.95) 50%, hsl(350 15% 9% / 0.9) 100%)",
        }}
      >
        {/* Cream paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Ribbon */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 sm:w-10 z-10">
          <div className="w-full h-16 sm:h-20 bg-gradient-to-b from-[hsl(350_45%_25%)] via-[hsl(350_40%_20%)] to-[hsl(350_35%_18%)] shadow-[0_2px_8px_hsl(0_0%_0%/0.3)]" />
          <div className="w-0 h-0 mx-auto border-l-[16px] sm:border-l-[20px] border-r-[16px] sm:border-r-[20px] border-t-[10px] sm:border-t-[12px] border-l-[hsl(350_45%_25%)] border-r-[hsl(350_45%_25%)] border-t-[hsl(350_40%_20%)] border-b-0 border-b-transparent" style={{ borderBottomColor: 'transparent' }} />
        </div>

        {/* Wax seal */}
        <motion.div
          className="absolute top-10 sm:top-12 left-1/2 -translate-x-1/2 z-20"
          animate={{ rotate: [0, 1, -1, 0.5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative w-12 h-12 sm:w-14 sm:h-14">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 40% 35%, hsl(350 50% 32%) 0%, hsl(350 45% 24%) 40%, hsl(350 40% 18%) 100%)",
                boxShadow:
                  "0 3px 10px hsl(0 0% 0% / 0.5), inset 0 1px 3px hsl(350 30% 45% / 0.3), inset 0 -1px 2px hsl(0 0% 0% / 0.2)",
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-hand text-gold/60 text-xl sm:text-2xl">
              D
            </span>
          </div>
        </motion.div>

        {/* Content */}
        <div className="relative z-[3] px-6 pt-28 pb-8 sm:px-10 sm:pt-32 sm:pb-10 text-center">
          <span className="block text-gold/30 text-[9px] tracking-[0.5em] uppercase mb-6 font-light">
            You are cordially invited
          </span>

          <h3
            className="font-hand text-gold/70 text-3xl sm:text-4xl mb-2"
            style={{ textShadow: "0 0 20px hsl(38 60% 50% / 0.1)" }}
          >
            {show.title}
          </h3>

          <div className="flex items-center justify-center gap-2 my-6">
            <div className="flex-1 max-w-16 h-px bg-gradient-to-r from-transparent to-gold/20" />
            <span className="text-gold/25 text-lg">&#10043;</span>
            <div className="flex-1 max-w-16 h-px bg-gradient-to-l from-transparent to-gold/20" />
          </div>

          <div className="space-y-3 mb-8">
            <p className="text-editorial-display text-ivory/80 text-xl sm:text-2xl">
              {show.dateNum} {show.month} {show.year}
            </p>
            <p className="font-serif text-ivory/45 text-sm tracking-wider">{show.venue}</p>
            <p className="text-ivory/25 text-xs tracking-[0.3em] uppercase">{show.city}</p>
            <p className="text-ivory/30 text-xs tracking-wider">{show.time}</p>
          </div>

          {show.diary && (
            <p className="font-serif text-ivory/25 text-sm italic leading-relaxed max-w-sm mx-auto mb-8">
              &ldquo;{show.diary}&rdquo;
            </p>
          )}

          <a
            href={show.ticketUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 border border-gold/30 bg-gold/[0.06] px-10 py-4 text-xs tracking-[0.3em] uppercase text-gold transition-all duration-500 hover:bg-gold/15 hover:border-gold/50 hover:shadow-[0_0_40px_hsl(38_60%_40%/0.12)]"
          >
            <Ticket className="w-4 h-4" />
            Reserve Your Place
          </a>
        </div>

        {/* Aged vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: "inset 0 0 80px hsl(350 20% 6% / 0.5), inset 0 0 160px hsl(350 15% 4% / 0.3)",
          }}
        />
      </div>
    </motion.div>
  );
}

/* ────────────────────────── SOFFIT LIGHTS ────────────────────────── */

const SOFFIT_COLORS = [
  "hsl(38 75% 50%)",
  "hsl(350 50% 40%)",
  "hsl(38 65% 45%)",
  "hsl(350 45% 35%)",
  "hsl(30 60% 42%)",
];

function SoffitRig() {
  return (
    <div className="pointer-events-none relative w-full max-w-2xl mx-auto h-40 sm:h-52 mt-16" aria-hidden>
      {/* Truss */}
      <div className="absolute top-0 left-[5%] right-[5%] h-1 bg-gradient-to-r from-transparent via-ivory/[0.06] to-transparent rounded-full" />

      {SOFFIT_COLORS.map((color, i) => {
        const xPos = 10 + i * 20;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${xPos}%`, top: 0 }}
            animate={{ x: [0, (i % 2 ? 3 : -3), 0] }}
            transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Beam */}
            <motion.div
              className="absolute top-3 left-1/2 -translate-x-1/2 w-0 h-0"
              style={{
                borderLeft: "40px solid transparent",
                borderRight: "40px solid transparent",
                borderTop: `${140 + i * 10}px solid ${color.replace(")", " / 0.06)")}`,
                filter: "blur(8px)",
              }}
              animate={{ opacity: [0.3, 0.7, 0.4, 0.6, 0.3] }}
              transition={{ duration: 4 + i * 0.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
            />
            {/* Fixture */}
            <div
              className="relative w-4 h-3 rounded-b-sm mx-auto"
              style={{ background: "hsl(0 0% 20% / 0.6)" }}
            />
            {/* Lens glow */}
            <motion.div
              className="absolute top-2.5 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full"
              style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                boxShadow: `0 0 8px ${color.replace(")", " / 0.4)")}`,
              }}
              animate={{ opacity: [0.4, 0.9, 0.5, 0.8, 0.4], scale: [0.9, 1.2, 0.95, 1.1, 0.9] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
            />
          </motion.div>
        );
      })}

      {/* Floor reflection */}
      <motion.div
        className="absolute bottom-0 left-[10%] right-[10%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, hsl(38 50% 45% / 0.15), hsl(350 40% 40% / 0.1), hsl(38 50% 45% / 0.15), transparent)",
        }}
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ────────────────────────── PAGE ────────────────────────── */

const LiveShows = () => {
  const featuredShow = SHOWS.find((s) => s.featured);
  const otherShows = SHOWS.filter((s) => !s.featured);

  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <LightLeaksOverlay />
      <VelvetCurtains />
      <BackstageSmoke />
      <DustMotes />

      {/* Warm ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 30%, hsl(350 25% 9%) 0%, hsl(350 28% 5%) 100%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-[max(1rem,env(safe-area-inset-top))] left-4 sm:left-8 z-50"
        >
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-3 text-ivory/40 transition-colors hover:text-ivory group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Back</span>
          </Link>
        </motion.div>

        {/* ── HERO ── */}
        <TheatreHero />

        {/* ── FEATURED INVITATION ── */}
        {featuredShow && (
          <section className="relative px-4 sm:px-8 pb-20 sm:pb-28">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center mb-10 sm:mb-14"
            >
              <span className="text-gold/30 text-[10px] tracking-[0.5em] uppercase font-light">
                Next Performance
              </span>
            </motion.div>
            <FeaturedInvitation show={featuredShow} />
          </section>
        )}

        {/* ── BACKSTAGE WALL — OTHER SHOWS ── */}
        {otherShows.length > 0 && (
          <section className="relative px-4 sm:px-8 pb-16 sm:pb-24">
            {/* Section divider */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-center mb-12 sm:mb-16"
            >
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/15" />
                <span className="text-gold/25 text-[10px] tracking-[0.5em] uppercase font-light">
                  Also Playing
                </span>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/15" />
              </div>
            </motion.div>

            <div className="max-w-md mx-auto space-y-8">
              {otherShows.map((show, i) => (
                <VintagePoster key={show.id} show={show} index={i} />
              ))}
            </div>
          </section>
        )}

        {/* ── NEWSLETTER NUDGE ── */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative px-4 sm:px-8 pb-8 text-center"
        >
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex-1 max-w-12 h-px bg-gradient-to-r from-transparent to-gold/10" />
              <svg className="w-3 h-3 text-gold/15" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12 3.75 7.5 0 4.5h4.5z" />
              </svg>
              <div className="flex-1 max-w-12 h-px bg-gradient-to-l from-transparent to-gold/10" />
            </div>
            <p className="font-serif text-ivory/20 text-sm italic leading-relaxed mb-2">
              More dates are being written into the story.
            </p>
            <p className="text-ivory/15 text-xs tracking-[0.15em] leading-relaxed">
              Follow on socials or{" "}
              <Link
                to="/"
                className="text-gold/30 hover:text-gold/60 underline underline-offset-4 decoration-gold/15 transition-colors"
              >
                subscribe to the newsletter
              </Link>{" "}
              to know first.
            </p>
          </div>
        </motion.section>

        {/* ── SOFFIT LIGHTS ── */}
        <SoffitRig />

        <motion.p
          className="text-center text-ivory/10 text-[10px] tracking-[0.5em] uppercase pb-12 mt-4"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          See you under the lights
        </motion.p>
      </div>
    </main>
  );
};

export default LiveShows;

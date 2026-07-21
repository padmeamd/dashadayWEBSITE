import { motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Calendar, Clock, Ticket } from "lucide-react";
import { useRef } from "react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";

const SHOWS = [
  {
    id: "jul-30",
    date: "Jul 30",
    day: "Wednesday",
    year: "2026",
    time: "Doors 7 PM",
    title: "Flamboyant Bone + Gravity Riot",
    venue: "The Bread and Roses",
    city: "London, UK",
    ticketUrl: "https://dice.fm/event/k6yglp-flamboyant-bone-gravity-riot-30th-jul-the-bread-and-roses-london-tickets",
    badge: "Next Up",
  },
  {
    id: "aug-2",
    date: "Aug 2",
    day: "Saturday",
    year: "2026",
    time: "Doors 7 PM",
    title: "DashaDay: Pre-Birthday Celebration",
    venue: "Aces & Eights Saloon Bar",
    city: "London, UK",
    ticketUrl:
      "https://www.bandsintown.com/t/108619704?app_id=50017ce9c97df54ca7dfca64854274b1&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
    badge: "Special Show",
    featured: true,
  },
];

function SpotlightBeam() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
      <motion.div
        className="absolute -top-32 left-1/2 h-[120vh] w-[1px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(38 70% 60% / 0.06) 10%, hsl(38 80% 55% / 0.12) 30%, hsl(38 70% 50% / 0.04) 60%, transparent 80%)",
        }}
        animate={{ x: [-120, 120, -80, 60, -120], opacity: [0.4, 0.7, 0.5, 0.8, 0.4] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -top-32 left-[45%] h-[120vh] w-[1px]"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, hsl(38 60% 50% / 0.04) 15%, hsl(38 70% 55% / 0.08) 35%, transparent 65%)",
        }}
        animate={{ x: [60, -100, 80, -60, 60], opacity: [0.3, 0.6, 0.4, 0.7, 0.3] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(38 70% 50% / 0.05) 0%, hsl(350 30% 8% / 0.02) 50%, transparent 70%)",
        }}
      />
    </div>
  );
}

function StageFloorReflection() {
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-48" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, hsl(350 28% 5% / 0.9) 0%, hsl(38 40% 20% / 0.04) 40%, transparent 100%)",
        }}
      />
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px]"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, hsl(38 60% 55% / 0.15) 20%, hsl(38 70% 60% / 0.25) 50%, hsl(38 60% 55% / 0.15) 80%, transparent 100%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.5, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function ShowCard({
  show,
  index,
}: {
  show: (typeof SHOWS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
        show.featured
          ? "border-gold/25 bg-gradient-to-br from-gold/[0.06] via-white/[0.02] to-gold/[0.04] hover:border-gold/40 shadow-[0_0_40px_hsl(38_60%_40%/0.08)]"
          : "border-ivory/[0.08] bg-white/[0.02] hover:border-ivory/20"
      }`}
    >
      {show.featured && (
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, transparent 0deg, hsl(38 70% 50% / 0.08) 60deg, transparent 120deg, hsl(38 60% 55% / 0.06) 240deg, transparent 360deg)",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      )}

      <div className="relative z-10 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-8">
          {/* Date block */}
          <div className="flex shrink-0 flex-col items-center sm:items-center">
            <span className="text-gold/50 text-[10px] tracking-[0.3em] uppercase font-light">
              {show.day}
            </span>
            <span
              className="text-editorial-display text-ivory text-4xl sm:text-5xl leading-none mt-1"
              style={{
                textShadow: show.featured
                  ? "0 0 20px hsl(38 70% 50% / 0.2)"
                  : "none",
              }}
            >
              {show.date.split(" ")[1]}
            </span>
            <span className="text-ivory/30 text-xs tracking-[0.2em] uppercase mt-1">
              {show.date.split(" ")[0]} {show.year}
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-3 mb-3 flex-wrap">
              {show.badge && (
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] tracking-[0.2em] uppercase ${
                    show.featured
                      ? "bg-gold/15 text-gold border border-gold/20"
                      : "bg-ivory/[0.06] text-ivory/50 border border-ivory/10"
                  }`}
                >
                  {show.badge}
                </span>
              )}
            </div>

            <h3 className="text-editorial-display text-ivory text-xl sm:text-2xl mb-3 leading-tight">
              {show.title}
            </h3>

            <div className="space-y-2 mb-5">
              <div className="flex items-center gap-2.5 text-ivory/50 text-sm">
                <MapPin className="w-4 h-4 text-gold/50 shrink-0" />
                <span>
                  {show.venue} <span className="text-ivory/25">—</span>{" "}
                  <span className="text-ivory/35">{show.city}</span>
                </span>
              </div>
              <div className="flex items-center gap-2.5 text-ivory/40 text-sm">
                <Clock className="w-4 h-4 text-gold/40 shrink-0" />
                <span>{show.time}</span>
              </div>
            </div>

            <a
              href={show.ticketUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2.5 rounded-xl px-6 py-3 text-xs tracking-[0.2em] uppercase transition-all duration-300 ${
                show.featured
                  ? "bg-gradient-to-r from-gold/90 to-[hsl(38_65%_42%)] text-[hsl(350_28%_7%)] font-medium shadow-[0_2px_20px_hsl(38_60%_40%/0.25)] hover:shadow-[0_4px_30px_hsl(38_60%_40%/0.4)] hover:brightness-110"
                  : "border border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/50"
              }`}
            >
              <Ticket className="w-4 h-4" />
              Get Tickets
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const SOFFIT_LIGHTS = [
  { x: 30, color: "hsl(38 80% 55%)", beamEnd: 260, delay: 0, sway: [-3, 4, -2, 3, -3] },
  { x: 110, color: "hsl(350 65% 50%)", beamEnd: 240, delay: 0.4, sway: [2, -3, 4, -2, 2] },
  { x: 190, color: "hsl(220 60% 55%)", beamEnd: 255, delay: 0.8, sway: [-4, 2, -3, 5, -4] },
  { x: 270, color: "hsl(38 70% 50%)", beamEnd: 245, delay: 1.2, sway: [3, -4, 2, -3, 3] },
  { x: 350, color: "hsl(280 50% 55%)", beamEnd: 250, delay: 0.6, sway: [-2, 5, -4, 2, -2] },
  { x: 430, color: "hsl(350 60% 48%)", beamEnd: 235, delay: 1.0, sway: [4, -2, 3, -5, 4] },
  { x: 510, color: "hsl(160 45% 45%)", beamEnd: 260, delay: 0.2, sway: [-3, 3, -2, 4, -3] },
];

function SoffitLightsIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="relative mx-auto mt-20 mb-8 flex flex-col items-center overflow-hidden"
    >
      <svg
        viewBox="0 0 540 280"
        className="w-full max-w-lg h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          {SOFFIT_LIGHTS.map((light, i) => (
            <radialGradient key={`glow-${i}`} id={`soffit-glow-${i}`} cx="50%" cy="0%" r="80%">
              <stop offset="0%" stopColor={light.color} stopOpacity="0.9" />
              <stop offset="60%" stopColor={light.color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={light.color} stopOpacity="0" />
            </radialGradient>
          ))}
          {SOFFIT_LIGHTS.map((light, i) => (
            <linearGradient key={`beam-${i}`} id={`soffit-beam-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={light.color} stopOpacity="0.18" />
              <stop offset="40%" stopColor={light.color} stopOpacity="0.06" />
              <stop offset="100%" stopColor={light.color} stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        {/* Truss bar */}
        <rect x="10" y="8" width="520" height="6" rx="3" fill="hsl(0 0% 30% / 0.4)" stroke="hsl(0 0% 45% / 0.2)" strokeWidth="0.5" />
        <rect x="10" y="10" width="520" height="2" rx="1" fill="hsl(0 0% 50% / 0.08)" />

        {/* Truss details */}
        {[70, 150, 230, 310, 390, 470].map((tx) => (
          <line key={tx} x1={tx} y1="8" x2={tx} y2="14" stroke="hsl(0 0% 50% / 0.15)" strokeWidth="0.8" />
        ))}

        {SOFFIT_LIGHTS.map((light, i) => (
          <motion.g
            key={i}
            animate={{ x: light.sway }}
            transition={{ duration: 8 + i * 1.5, repeat: Infinity, ease: "easeInOut", delay: light.delay }}
          >
            {/* Light beam cone */}
            <motion.polygon
              points={`${light.x - 8},30 ${light.x - 55},${light.beamEnd} ${light.x + 55},${light.beamEnd} ${light.x + 8},30`}
              fill={`url(#soffit-beam-${i})`}
              animate={{ opacity: [0.5, 0.85, 0.6, 0.9, 0.5] }}
              transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: light.delay }}
            />

            {/* Fixture housing */}
            <rect
              x={light.x - 10}
              y="14"
              width="20"
              height="16"
              rx="2"
              fill="hsl(0 0% 15% / 0.7)"
              stroke="hsl(0 0% 35% / 0.3)"
              strokeWidth="0.8"
            />

            {/* Fixture lens */}
            <motion.ellipse
              cx={light.x}
              cy="30"
              rx="7"
              ry="3"
              fill={`url(#soffit-glow-${i})`}
              animate={{ opacity: [0.6, 1, 0.7, 0.95, 0.6] }}
              transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: light.delay }}
            />

            {/* Bright point */}
            <motion.circle
              cx={light.x}
              cy="30"
              r="3"
              fill={light.color}
              animate={{ opacity: [0.5, 0.9, 0.6, 1, 0.5], scale: [1, 1.15, 1, 1.1, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: light.delay }}
            />

            {/* Haze in beam */}
            <motion.ellipse
              cx={light.x}
              cy={140 + i * 8}
              rx={25 + i * 3}
              ry={40}
              fill={light.color.replace(")", " / 0.02)")}
              animate={{ opacity: [0.3, 0.6, 0.3], cy: [130 + i * 8, 150 + i * 8, 130 + i * 8] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: light.delay + 1 }}
            />
          </motion.g>
        ))}

        {/* Stage floor line */}
        <motion.line
          x1="20"
          y1="268"
          x2="520"
          y2="268"
          stroke="hsl(38 40% 50% / 0.12)"
          strokeWidth="0.8"
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      <motion.p
        className="text-ivory/15 text-[10px] tracking-[0.4em] uppercase mt-2"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        See you on stage
      </motion.p>
    </motion.div>
  );
}

const LiveShows = () => {
  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <LightLeaksOverlay />
      <SpotlightBeam />

      <div className="relative z-10 min-h-screen px-4 py-8 sm:px-8 sm:py-14 md:px-16">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 sm:mb-16"
        >
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-3 text-ivory/50 transition-colors hover:text-ivory group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Back</span>
          </Link>
        </motion.div>

        {/* Header */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="text-center mb-16"
          >
            <motion.div
              className="inline-flex items-center gap-3 mb-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-8 h-px bg-gold/30" />
              <Calendar className="w-4 h-4 text-gold/50" />
              <div className="w-8 h-px bg-gold/30" />
            </motion.div>

            <h1
              className="text-editorial-display text-ivory mb-4"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 4rem)",
                lineHeight: 1.05,
                textShadow: "0 0 40px hsl(38 60% 50% / 0.12), 0 2px 20px hsl(0 0% 0% / 0.5)",
              }}
            >
              Live Shows
            </h1>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mb-6" />
            <p className="text-ivory/35 text-sm sm:text-base tracking-wider max-w-md mx-auto leading-relaxed">
              Catch DashaDay live with Gravity Riot. Every show is a cinematic experience.
            </p>
          </motion.div>

          {/* Upcoming shows */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gold/50 text-[10px] tracking-[0.4em] uppercase mb-6 text-center"
          >
            Upcoming Dates
          </motion.p>

          <div className="space-y-5 mb-8">
            {SHOWS.map((show, i) => (
              <ShowCard key={show.id} show={show} index={i} />
            ))}
          </div>

          {/* Newsletter nudge */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <p className="text-ivory/25 text-xs tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
              More dates coming soon. Follow on socials or{" "}
              <Link to="/" className="text-gold/50 hover:text-gold/80 underline underline-offset-4 decoration-gold/20 transition-colors">
                subscribe to the newsletter
              </Link>{" "}
              to be the first to know.
            </p>
          </motion.div>

          {/* Mic + guitar illustration */}
          <SoffitLightsIllustration />

          <StageFloorReflection />
        </div>
      </div>
    </main>
  );
};

export default LiveShows;

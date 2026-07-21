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

function MicrophoneIllustration() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: 0.5 }}
      className="relative mx-auto mt-20 mb-8 flex flex-col items-center"
    >
      <svg
        viewBox="0 0 120 280"
        className="w-16 sm:w-20 h-auto"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Mic head glow */}
        <motion.ellipse
          cx="60"
          cy="60"
          rx="44"
          ry="44"
          fill="hsl(38 60% 50% / 0.04)"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Mic head */}
        <path
          d="M60 10 C35 10 30 30 30 50 C30 75 35 95 60 95 C85 95 90 75 90 50 C90 30 85 10 60 10Z"
          stroke="hsl(40 30% 70% / 0.5)"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Grille lines */}
        {[25, 35, 45, 55, 65, 75, 85].map((y) => (
          <motion.line
            key={y}
            x1={y < 50 ? 36 + (50 - y) * 0.2 : 36 + (y - 50) * 0.2}
            y1={y}
            x2={y < 50 ? 84 - (50 - y) * 0.2 : 84 - (y - 50) * 0.2}
            y2={y}
            stroke="hsl(40 25% 60% / 0.2)"
            strokeWidth="0.8"
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: y * 0.03 }}
          />
        ))}

        {/* Ring / connector */}
        <rect
          x="48"
          y="95"
          width="24"
          height="8"
          rx="2"
          stroke="hsl(40 30% 65% / 0.4)"
          strokeWidth="1"
          fill="hsl(40 30% 50% / 0.05)"
        />

        {/* Stand */}
        <line
          x1="60"
          y1="103"
          x2="60"
          y2="240"
          stroke="hsl(40 25% 60% / 0.25)"
          strokeWidth="2"
        />

        {/* Stand base */}
        <motion.path
          d="M30 240 Q60 248 90 240"
          stroke="hsl(40 25% 60% / 0.2)"
          strokeWidth="1.5"
          fill="none"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Guitar leaning against stand */}
        <g transform="translate(78, 130) rotate(15)">
          {/* Guitar neck */}
          <line
            x1="0"
            y1="0"
            x2="0"
            y2="-70"
            stroke="hsl(30 40% 55% / 0.3)"
            strokeWidth="2.5"
          />
          {/* Tuning pegs */}
          {[-68, -63, -58].map((y) => (
            <g key={y}>
              <line x1="-4" y1={y} x2="4" y2={y} stroke="hsl(40 30% 65% / 0.25)" strokeWidth="1" />
            </g>
          ))}
          {/* Guitar body */}
          <ellipse cx="0" cy="18" rx="14" ry="20" stroke="hsl(30 35% 50% / 0.3)" strokeWidth="1.2" fill="hsl(30 40% 20% / 0.06)" />
          <ellipse cx="0" cy="38" rx="16" ry="22" stroke="hsl(30 35% 50% / 0.3)" strokeWidth="1.2" fill="hsl(30 40% 20% / 0.06)" />
          {/* Sound hole */}
          <circle cx="0" cy="20" r="5" stroke="hsl(30 30% 45% / 0.25)" strokeWidth="0.8" fill="none" />
          {/* Strings */}
          {[-2, 0, 2].map((x) => (
            <line key={x} x1={x} y1={-55} x2={x} y2={45} stroke="hsl(40 20% 70% / 0.1)" strokeWidth="0.4" />
          ))}
        </g>
      </svg>

      <motion.p
        className="text-ivory/15 text-[10px] tracking-[0.4em] uppercase mt-4"
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
          <MicrophoneIllustration />

          <StageFloorReflection />
        </div>
      </div>
    </main>
  );
};

export default LiveShows;

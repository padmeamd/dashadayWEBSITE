import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, X, MapPin, Clock, Ticket } from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";

/* ═══════════════════════════════ DATA ═══════════════════════════════ */

type Show = {
  id: string;
  dateNum: string;
  month: string;
  year: string;
  day: string;
  time: string;
  title: string;
  venue: string;
  city: string;
  ticketUrl: string;
  status: "upcoming" | "past";
  stamp?: string;
  diary?: string;
  guests?: string;
};

const SHOWS: Show[] = [
  {
    id: "jul-30",
    dateNum: "30",
    month: "July",
    year: "2026",
    day: "Wednesday",
    time: "Doors 7 PM",
    title: "Flamboyant Bone + Gravity Riot",
    venue: "The Bread and Roses",
    city: "London",
    ticketUrl:
      "https://dice.fm/event/k6yglp-flamboyant-bone-gravity-riot-30th-jul-the-bread-and-roses-london-tickets",
    status: "upcoming",
    diary: "A warm pub stage, close enough to feel the crowd breathe with you.",
    guests: "Flamboyant Bone, Gravity Riot",
  },
  {
    id: "aug-2",
    dateNum: "2",
    month: "August",
    year: "2026",
    day: "Saturday",
    time: "Doors 7 PM",
    title: "DashaDay: Pre-Birthday Celebration",
    venue: "Aces & Eights Saloon Bar",
    city: "London",
    ticketUrl:
      "https://www.bandsintown.com/t/108619704?app_id=50017ce9c97df54ca7dfca64854274b1&came_from=267&utm_medium=api&utm_source=public_api&utm_campaign=ticket",
    status: "upcoming",
    diary:
      "The night before everything changes. A celebration of the songs, the stories, and the people who made it all matter.",
    guests: "Live band: Gravity Riot",
  },
];

/*
  Each invitation gets a unique hand-placed position on the wall.
  Coordinates are percentage-based. Rotations are small and varied.
  This is the heart of the "scattered memory wall" feel.
*/
const PLACEMENTS = [
  { left: "4%",  top: "6%",  rotate: -2.8, z: 4, scale: 1 },
  { left: "52%", top: "2%",  rotate: 1.6,  z: 6, scale: 1.04 },
  { left: "28%", top: "38%", rotate: -1.2, z: 3, scale: 0.97 },
  { left: "62%", top: "42%", rotate: 2.4,  z: 5, scale: 1.01 },
  { left: "8%",  top: "68%", rotate: 1.8,  z: 2, scale: 0.98 },
  { left: "48%", top: "72%", rotate: -3.1, z: 7, scale: 1.02 },
];

/* ═══════════════════════════════ ATMOSPHERE ═══════════════════════════════ */

function VelvetBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {/* Deep burgundy velvet base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 40%, hsl(350 30% 10%) 0%, hsl(350 35% 7%) 40%, hsl(350 28% 5%) 100%)",
        }}
      />
      {/* Velvet texture — soft fiber grain */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='v'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23v)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Second texture layer for depth */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='f'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23f)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Warm vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, hsl(350 35% 4% / 0.5) 100%)",
        }}
      />
    </div>
  );
}

function CandlelightAmbience() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden>
      {/* Main warm pool — top center */}
      <motion.div
        className="absolute top-[-5%] left-[45%] w-[500px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(38 65% 50% / 0.07) 0%, hsl(30 50% 35% / 0.03) 45%, transparent 70%)",
        }}
        animate={{ opacity: [0.5, 0.85, 0.6, 0.9, 0.5], x: [-10, 10, -5, 8, -10] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Left wall sconce */}
      <motion.div
        className="absolute top-[20%] left-[-2%] w-[300px] h-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, hsl(30 55% 40% / 0.05) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.45, 0.65, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      {/* Right wall sconce */}
      <motion.div
        className="absolute top-[35%] right-[-2%] w-[300px] h-[350px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, hsl(38 50% 42% / 0.04) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.35, 0.6, 0.4, 0.55, 0.35] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}

function FloatingDust() {
  const motes = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${(i * 41 + 13) % 100}%`,
        top: `${(i * 37 + 9) % 100}%`,
        size: 1 + (i % 3) * 0.4,
        dur: 16 + (i % 8) * 2.5,
        delay: (i % 6) * 0.5,
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      {motes.map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full bg-[hsl(38_30%_85%/0.06)]"
          style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
          animate={{
            y: [0, -14, 5, -10, 0],
            x: [0, 4, -3, 6, 0],
            opacity: [0.02, 0.09, 0.04, 0.08, 0.02],
          }}
          transition={{ duration: m.dur, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════ INVITATION CARD ═══════════════════════════════ */

function InvitationCard({
  show,
  placement,
  onOpen,
}: {
  show: Show;
  placement: (typeof PLACEMENTS)[number];
  onOpen: () => void;
}) {
  const isUpcoming = show.status === "upcoming";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="absolute block text-left cursor-pointer outline-none group"
      style={{
        left: placement.left,
        top: placement.top,
        zIndex: placement.z,
        width: "clamp(260px, 38vw, 380px)",
      }}
      initial={{ opacity: 0, y: 30, rotate: placement.rotate }}
      animate={{ opacity: 1, y: 0, rotate: placement.rotate }}
      transition={{ duration: 0.9, delay: placement.z * 0.12, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        scale: 1.06,
        rotate: 0,
        zIndex: 50,
        y: -12,
        transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      {/* Growing shadow on hover */}
      <div className="absolute inset-0 translate-y-2 bg-black/20 blur-lg rounded-sm transition-all duration-500 group-hover:translate-y-6 group-hover:blur-2xl group-hover:bg-black/30" />

      {/* Warm glow on hover */}
      <div className="pointer-events-none absolute -inset-4 rounded-lg bg-[radial-gradient(ellipse_at_center,hsl(38_60%_45%/0.08),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Brass pushpin — stays fixed */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30">
        <div
          className="w-3.5 h-3.5 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, hsl(38 65% 68%) 0%, hsl(38 55% 45%) 50%, hsl(38 45% 32%) 100%)",
            boxShadow: "0 2px 6px hsl(0 0% 0% / 0.5), 0 1px 2px hsl(0 0% 0% / 0.3)",
          }}
        />
        <div
          className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: "hsl(38 80% 80% / 0.6)" }}
        />
      </div>

      {/* The invitation paper */}
      <div
        className={`relative overflow-hidden border transition-all duration-500 ${
          isUpcoming
            ? "border-gold/15 group-hover:border-gold/30"
            : "border-ivory/[0.06] group-hover:border-ivory/12"
        }`}
        style={{
          background: isUpcoming
            ? "linear-gradient(145deg, hsl(38 18% 14% / 0.95) 0%, hsl(35 15% 11% / 0.97) 50%, hsl(38 12% 10% / 0.95) 100%)"
            : "linear-gradient(145deg, hsl(350 18% 10% / 0.95) 0%, hsl(348 15% 8% / 0.97) 50%, hsl(350 12% 7% / 0.95) 100%)",
        }}
      >
        {/* Paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Past show: aged effects */}
        {!isUpcoming && (
          <>
            {/* Coffee stain */}
            <div
              className="pointer-events-none absolute top-[15%] right-[10%] w-16 h-14 rounded-full opacity-[0.04]"
              style={{
                background:
                  "radial-gradient(ellipse at 45% 50%, hsl(30 40% 30%) 0%, hsl(25 30% 20% / 0.5) 40%, transparent 70%)",
              }}
            />
            {/* Fold crease */}
            <div
              className="pointer-events-none absolute top-0 bottom-0 left-[48%] w-px opacity-[0.06]"
              style={{
                background: "linear-gradient(to bottom, transparent 10%, hsl(0 0% 40%) 30%, hsl(0 0% 40%) 70%, transparent 90%)",
              }}
            />
          </>
        )}

        {/* Upcoming: shimmer sweep */}
        {isUpcoming && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, transparent 30%, hsl(38 60% 60% / 0.04) 45%, hsl(38 70% 65% / 0.06) 50%, hsl(38 60% 60% / 0.04) 55%, transparent 70%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }}
          />
        )}

        {/* Gold inset border for upcoming */}
        {isUpcoming && (
          <div className="absolute inset-3 border border-gold/[0.06] pointer-events-none" />
        )}

        {/* Content */}
        <div className="relative z-10 p-5 sm:p-7">
          {/* Wax seal for upcoming */}
          {isUpcoming && (
            <div className="absolute -top-1 -right-1 w-10 h-10 sm:w-11 sm:h-11">
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle at 38% 35%, hsl(350 50% 30%) 0%, hsl(350 42% 20%) 60%, hsl(350 38% 15%) 100%)",
                  boxShadow: "0 2px 6px hsl(0 0% 0% / 0.4), inset 0 1px 2px hsl(350 30% 40% / 0.25)",
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center font-hand text-gold/55 text-base">
                D
              </span>
            </div>
          )}

          {/* Date */}
          <div className="mb-4">
            <span className="block text-gold/30 text-[9px] tracking-[0.35em] uppercase font-light">
              {show.day}
            </span>
            <span
              className={`block text-editorial-display leading-none mt-1 ${
                isUpcoming ? "text-ivory text-4xl" : "text-ivory/60 text-3xl"
              }`}
              style={{
                textShadow: isUpcoming
                  ? "0 0 20px hsl(38 60% 50% / 0.1)"
                  : "none",
              }}
            >
              {show.dateNum}
            </span>
            <span className={`block text-xs tracking-[0.2em] uppercase mt-1 font-light ${isUpcoming ? "text-ivory/30" : "text-ivory/15"}`}>
              {show.month} {show.year}
            </span>
          </div>

          {/* Thin gold line */}
          <div className={`w-12 h-px mb-4 ${isUpcoming ? "bg-gold/15" : "bg-ivory/[0.06]"}`} />

          {/* Title */}
          <h3
            className={`font-serif text-base sm:text-lg leading-snug mb-3 ${
              isUpcoming ? "text-ivory/85" : "text-ivory/45"
            }`}
          >
            {show.title}
          </h3>

          {/* Venue */}
          <div className="flex items-center gap-1.5 mb-1">
            <MapPin className={`w-3 h-3 shrink-0 ${isUpcoming ? "text-gold/30" : "text-ivory/15"}`} />
            <span className={`text-xs tracking-wider ${isUpcoming ? "text-ivory/40" : "text-ivory/20"}`}>
              {show.venue}
            </span>
          </div>
          <span className={`block text-[10px] tracking-[0.2em] uppercase ml-[18px] ${isUpcoming ? "text-ivory/20" : "text-ivory/10"}`}>
            {show.city}
          </span>

          {/* Status stamp for past shows */}
          {show.stamp && (
            <div className="absolute bottom-4 right-4 rotate-[-8deg]">
              <span
                className="inline-block border-2 border-[hsl(350_40%_30%/0.4)] text-[hsl(350_40%_35%/0.35)] text-[10px] tracking-[0.3em] uppercase px-3 py-1 font-serif font-light"
                style={{ textShadow: "0 0 4px hsl(350 30% 20% / 0.2)" }}
              >
                {show.stamp}
              </span>
            </div>
          )}

          {/* Upcoming: subtle prompt */}
          {isUpcoming && (
            <div className="mt-5 flex items-center gap-1.5">
              <Ticket className="w-3 h-3 text-gold/25" />
              <span className="text-gold/25 text-[9px] tracking-[0.25em] uppercase font-light">
                Tap to open
              </span>
            </div>
          )}
        </div>

        {/* Aged vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: isUpcoming
              ? "inset 0 0 40px hsl(38 15% 8% / 0.3), inset 0 0 80px hsl(350 20% 5% / 0.15)"
              : "inset 0 0 50px hsl(350 20% 5% / 0.5), inset 0 0 100px hsl(350 25% 4% / 0.3)",
          }}
        />
      </div>
    </motion.button>
  );
}

/* ═══════════════════════════════ OPENED INVITATION ═══════════════════════════════ */

function OpenedInvitation({
  show,
  onClose,
}: {
  show: Show;
  onClose: () => void;
}) {
  const isUpcoming = show.status === "upcoming";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />

      {/* Opened invitation */}
      <motion.div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-lg overflow-hidden border"
          style={{
            borderColor: isUpcoming ? "hsl(38 40% 35% / 0.2)" : "hsl(350 20% 20% / 0.15)",
            background: isUpcoming
              ? "linear-gradient(160deg, hsl(38 18% 13%) 0%, hsl(35 14% 10%) 40%, hsl(38 10% 8%) 100%)"
              : "linear-gradient(160deg, hsl(350 16% 10%) 0%, hsl(348 14% 8%) 40%, hsl(350 12% 6%) 100%)",
          }}
          initial={{ scale: 0.85, y: 40, rotateX: 8 }}
          animate={{ scale: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.88, y: 30, rotateX: 6 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Paper texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.02]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Gold inset border */}
          {isUpcoming && (
            <>
              <div className="absolute inset-3 border border-gold/[0.06] pointer-events-none z-[1]" />
              <div className="absolute inset-4 border border-gold/[0.03] pointer-events-none z-[1]" />
            </>
          )}

          {/* Corner ornaments */}
          {isUpcoming &&
            [
              "top-3 left-3",
              "top-3 right-3 -scale-x-100",
              "bottom-3 left-3 -scale-y-100",
              "bottom-3 right-3 -scale-x-100 -scale-y-100",
            ].map((pos, ci) => (
              <div key={ci} className={`absolute ${pos} pointer-events-none z-[1]`}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-gold/10">
                  <path d="M0 0v8c0-2 2-4 4-4h4c-4 0-6 0-8-4z" fill="currentColor" />
                </svg>
              </div>
            ))}

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ivory/10 bg-black/20 text-ivory/50 backdrop-blur-sm transition-colors hover:bg-black/40 hover:text-ivory"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-10 md:p-12">
            {/* Wax seal */}
            {isUpcoming && (
              <div className="flex justify-center mb-6">
                <div className="relative w-14 h-14">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle at 38% 35%, hsl(350 50% 32%) 0%, hsl(350 42% 22%) 50%, hsl(350 38% 16%) 100%)",
                      boxShadow:
                        "0 3px 10px hsl(0 0% 0% / 0.5), inset 0 1px 3px hsl(350 30% 45% / 0.3)",
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center font-hand text-gold/60 text-xl">
                    D
                  </span>
                </div>
              </div>
            )}

            {isUpcoming && (
              <p className="text-center text-gold/25 text-[9px] tracking-[0.5em] uppercase font-light mb-6">
                You are cordially invited
              </p>
            )}

            {/* Title */}
            <h2
              className={`text-center font-serif text-2xl sm:text-3xl leading-tight mb-2 ${
                isUpcoming ? "text-ivory" : "text-ivory/60"
              }`}
              style={{
                textShadow: isUpcoming
                  ? "0 0 30px hsl(38 60% 50% / 0.1), 0 2px 12px hsl(0 0% 0% / 0.4)"
                  : "0 2px 8px hsl(0 0% 0% / 0.3)",
              }}
            >
              {show.title}
            </h2>

            {/* Ornamental divider */}
            <div className="flex items-center justify-center gap-2 my-6">
              <div className={`flex-1 max-w-14 h-px ${isUpcoming ? "bg-gold/15" : "bg-ivory/[0.06]"}`} />
              <svg className={`w-3 h-3 ${isUpcoming ? "text-gold/20" : "text-ivory/10"}`} viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12 3.75 7.5 0 4.5h4.5z" />
              </svg>
              <div className={`flex-1 max-w-14 h-px ${isUpcoming ? "bg-gold/15" : "bg-ivory/[0.06]"}`} />
            </div>

            {/* Date, venue, details */}
            <div className="text-center space-y-3 mb-8">
              <p className={`text-editorial-display text-2xl ${isUpcoming ? "text-ivory/90" : "text-ivory/50"}`}>
                {show.day}, {show.dateNum} {show.month} {show.year}
              </p>
              <div className="flex items-center justify-center gap-2">
                <MapPin className={`w-3.5 h-3.5 ${isUpcoming ? "text-gold/35" : "text-ivory/15"}`} />
                <span className={`font-serif text-sm tracking-wider ${isUpcoming ? "text-ivory/50" : "text-ivory/30"}`}>
                  {show.venue}
                </span>
              </div>
              <p className={`text-xs tracking-[0.25em] uppercase ${isUpcoming ? "text-ivory/25" : "text-ivory/12"}`}>
                {show.city}
              </p>
              <div className="flex items-center justify-center gap-2">
                <Clock className={`w-3 h-3 ${isUpcoming ? "text-gold/25" : "text-ivory/12"}`} />
                <span className={`text-xs tracking-wider ${isUpcoming ? "text-ivory/30" : "text-ivory/15"}`}>
                  {show.time}
                </span>
              </div>
            </div>

            {/* Guests */}
            {show.guests && (
              <div className="text-center mb-6">
                <span className={`text-[9px] tracking-[0.35em] uppercase font-light ${isUpcoming ? "text-gold/25" : "text-ivory/15"}`}>
                  Featuring
                </span>
                <p className={`font-serif text-sm mt-1 ${isUpcoming ? "text-ivory/40" : "text-ivory/20"}`}>
                  {show.guests}
                </p>
              </div>
            )}

            {/* Diary note */}
            {show.diary && (
              <div className="text-center mb-8">
                <p className={`font-hand text-lg sm:text-xl leading-relaxed max-w-sm mx-auto ${isUpcoming ? "text-gold/30" : "text-ivory/15"}`}>
                  &ldquo;{show.diary}&rdquo;
                </p>
              </div>
            )}

            {/* Stamp for past */}
            {show.stamp && (
              <div className="flex justify-center mb-8">
                <span
                  className="inline-block border-2 border-[hsl(350_40%_30%/0.35)] text-[hsl(350_40%_35%/0.3)] text-sm tracking-[0.3em] uppercase px-5 py-2 font-serif font-light rotate-[-4deg]"
                >
                  {show.stamp}
                </span>
              </div>
            )}

            {/* Ticket button */}
            {isUpcoming && (
              <div className="text-center">
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-gold/25 bg-gold/[0.06] px-10 py-4 text-xs tracking-[0.3em] uppercase text-gold transition-all duration-500 hover:bg-gold/12 hover:border-gold/45 hover:shadow-[0_0_40px_hsl(38_60%_40%/0.12)]"
                >
                  <Ticket className="w-4 h-4" />
                  Get Tickets
                </a>
              </div>
            )}
          </div>

          {/* Aged vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow:
                "inset 0 0 60px hsl(350 20% 5% / 0.4), inset 0 0 120px hsl(350 15% 4% / 0.2)",
            }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

/* ═══════════════════════════════ MOBILE STACK ═══════════════════════════════ */

function MobileCard({
  show,
  index,
  onOpen,
}: {
  show: Show;
  index: number;
  onOpen: () => void;
}) {
  const isUpcoming = show.status === "upcoming";
  const rotations = [-1.8, 2.2, -1, 1.6, -2.4, 0.8];
  const rot = rotations[index % rotations.length];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="relative block w-full text-left cursor-pointer outline-none group"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate: `${rot}deg` }}
      whileHover={{ rotate: 0, scale: 1.03 }}
    >
      {/* Shadow */}
      <div className="absolute inset-0 translate-y-2 bg-black/20 blur-lg rounded-sm" />

      {/* Pushpin */}
      <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 z-20">
        <div
          className="w-3 h-3 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, hsl(38 65% 68%) 0%, hsl(38 55% 45%) 50%, hsl(38 45% 32%) 100%)",
            boxShadow: "0 2px 4px hsl(0 0% 0% / 0.4)",
          }}
        />
      </div>

      {/* Card */}
      <div
        className={`relative overflow-hidden border p-5 ${
          isUpcoming ? "border-gold/12" : "border-ivory/[0.05]"
        }`}
        style={{
          background: isUpcoming
            ? "linear-gradient(145deg, hsl(38 18% 13% / 0.95), hsl(35 14% 10% / 0.97))"
            : "linear-gradient(145deg, hsl(350 16% 10% / 0.95), hsl(348 14% 8% / 0.97))",
        }}
      >
        {/* Paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Shimmer for upcoming */}
        {isUpcoming && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, transparent 30%, hsl(38 60% 60% / 0.04) 45%, hsl(38 70% 65% / 0.06) 50%, transparent 70%)",
            }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }}
          />
        )}

        {/* Wax seal */}
        {isUpcoming && (
          <div className="absolute top-3 right-3 w-8 h-8">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 38% 35%, hsl(350 50% 30%), hsl(350 42% 20%) 60%, hsl(350 38% 15%))",
                boxShadow: "0 2px 4px hsl(0 0% 0% / 0.4)",
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-hand text-gold/55 text-xs">
              D
            </span>
          </div>
        )}

        <div className="relative z-10">
          <span className={`block text-[9px] tracking-[0.3em] uppercase font-light ${isUpcoming ? "text-gold/30" : "text-ivory/15"}`}>
            {show.day}
          </span>
          <span className={`block text-editorial-display leading-none mt-1 ${isUpcoming ? "text-ivory text-3xl" : "text-ivory/50 text-2xl"}`}>
            {show.dateNum}
          </span>
          <span className={`block text-[10px] tracking-[0.2em] uppercase mt-1 font-light ${isUpcoming ? "text-ivory/25" : "text-ivory/12"}`}>
            {show.month} {show.year}
          </span>

          <div className={`w-8 h-px my-3 ${isUpcoming ? "bg-gold/12" : "bg-ivory/[0.05]"}`} />

          <h3 className={`font-serif text-base leading-snug mb-2 ${isUpcoming ? "text-ivory/80" : "text-ivory/40"}`}>
            {show.title}
          </h3>

          <div className="flex items-center gap-1.5">
            <MapPin className={`w-3 h-3 ${isUpcoming ? "text-gold/25" : "text-ivory/10"}`} />
            <span className={`text-xs tracking-wider ${isUpcoming ? "text-ivory/35" : "text-ivory/15"}`}>
              {show.venue}, {show.city}
            </span>
          </div>

          {show.stamp && (
            <div className="absolute bottom-3 right-3 rotate-[-8deg]">
              <span className="inline-block border-2 border-[hsl(350_40%_30%/0.3)] text-[hsl(350_40%_35%/0.25)] text-[9px] tracking-[0.25em] uppercase px-2 py-0.5 font-serif">
                {show.stamp}
              </span>
            </div>
          )}

          {isUpcoming && (
            <div className="mt-4 flex items-center gap-1.5">
              <Ticket className="w-3 h-3 text-gold/20" />
              <span className="text-gold/20 text-[8px] tracking-[0.25em] uppercase font-light">
                Tap to open
              </span>
            </div>
          )}
        </div>

        {/* Vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: isUpcoming
              ? "inset 0 0 30px hsl(38 15% 8% / 0.3)"
              : "inset 0 0 40px hsl(350 20% 5% / 0.5)",
          }}
        />
      </div>
    </motion.button>
  );
}

/* ═══════════════════════════════ PAGE ═══════════════════════════════ */

const LiveShows = () => {
  const [openShow, setOpenShow] = useState<Show | null>(null);
  const close = useCallback(() => setOpenShow(null), []);

  // Calculate wall height based on number of shows
  const wallHeight = Math.max(600, SHOWS.length * 320);

  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <VelvetBackground />
      <CandlelightAmbience />
      <FloatingDust />

      {/* Film grain + light leaks */}
      <div className="relative z-[3]">
        <div className="film-grain pointer-events-none fixed inset-0 z-[3]" aria-hidden />
      </div>
      <LightLeaksOverlay />

      <div className="relative z-10">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-[max(1rem,env(safe-area-inset-top))] left-4 sm:left-8 z-[60]"
        >
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-3 text-ivory/35 transition-colors hover:text-ivory group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Back</span>
          </Link>
        </motion.div>

        {/* Page header — subtle, not dominating */}
        <div className="pt-24 sm:pt-28 pb-6 sm:pb-10 px-4 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.3 }}
            className="text-gold/20 text-[9px] tracking-[0.5em] uppercase font-light mb-3"
          >
            Backstage
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-editorial-display text-ivory/80 mb-4"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 3rem)",
              lineHeight: 1.1,
              textShadow: "0 0 40px hsl(38 50% 45% / 0.08), 0 2px 16px hsl(0 0% 0% / 0.5)",
            }}
          >
            Live Shows
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="font-serif text-ivory/20 text-sm italic max-w-md mx-auto"
          >
            Every performance tells a story. Every city becomes part of it.
          </motion.p>
        </div>

        {/* ── DESKTOP: Scattered memory wall ── */}
        <div
          className="hidden md:block relative mx-auto max-w-5xl px-8"
          style={{ height: `${wallHeight}px` }}
        >
          {SHOWS.map((show, i) => {
            const p = PLACEMENTS[i % PLACEMENTS.length];
            return (
              <InvitationCard
                key={show.id}
                show={show}
                placement={p}
                onOpen={() => setOpenShow(show)}
              />
            );
          })}
        </div>

        {/* ── MOBILE: Stacked scrapbook ── */}
        <div className="block md:hidden px-6 sm:px-10 space-y-8 pb-4">
          {SHOWS.map((show, i) => (
            <MobileCard
              key={show.id}
              show={show}
              index={i}
              onOpen={() => setOpenShow(show)}
            />
          ))}
        </div>

        {/* Newsletter nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="text-center px-4 py-16 sm:py-20"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-gold/10" />
            <svg className="w-2.5 h-2.5 text-gold/12" viewBox="0 0 12 12" fill="currentColor" aria-hidden>
              <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12 3.75 7.5 0 4.5h4.5z" />
            </svg>
            <div className="w-8 h-px bg-gold/10" />
          </div>
          <p className="font-serif text-ivory/15 text-sm italic mb-1">
            More dates are being written into the story.
          </p>
          <p className="text-ivory/10 text-xs tracking-[0.15em]">
            <Link
              to="/"
              className="text-gold/20 hover:text-gold/45 underline underline-offset-4 decoration-gold/10 transition-colors"
            >
              Subscribe
            </Link>{" "}
            to know first.
          </p>
        </motion.div>

        {/* Quiet sign-off */}
        <motion.p
          className="text-center text-ivory/[0.06] text-[9px] tracking-[0.5em] uppercase pb-10"
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          See you under the lights
        </motion.p>
      </div>

      {/* Opened invitation overlay */}
      <AnimatePresence>
        {openShow && <OpenedInvitation show={openShow} onClose={close} />}
      </AnimatePresence>
    </main>
  );
};

export default LiveShows;

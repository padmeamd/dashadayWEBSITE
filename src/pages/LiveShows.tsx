import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, X, MapPin, Clock, Ticket } from "lucide-react";
import { useState, useMemo, useCallback, useEffect } from "react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";

/* ═══════════════════════════ DATA ═══════════════════════════ */

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

/* ═══════════════════════════ ATMOSPHERE ═══════════════════════════ */

function StageSpotlights() {
  const spots = [
    { left: "15%", color: "hsl(38 75% 55%)", delay: 0 },
    { left: "40%", color: "hsl(350 50% 45%)", delay: 0.5 },
    { left: "60%", color: "hsl(38 65% 50%)", delay: 1 },
    { left: "85%", color: "hsl(30 60% 48%)", delay: 1.5 },
  ];
  return (
    <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden>
      {spots.map((s, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{
            left: s.left,
            width: "2px",
            height: "100vh",
            background: `linear-gradient(to bottom, ${s.color.replace(")", " / 0.25)")} 0%, ${s.color.replace(")", " / 0.06)")} 40%, transparent 70%)`,
            filter: "blur(20px)",
          }}
          animate={{
            x: [0, 30, -20, 15, 0],
            opacity: [0.3, 0.6, 0.35, 0.55, 0.3],
          }}
          transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}
      {/* Warm overhead pool */}
      <motion.div
        className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, hsl(38 70% 50% / 0.12) 0%, hsl(30 55% 40% / 0.05) 40%, transparent 65%)",
        }}
        animate={{ opacity: [0.6, 1, 0.7, 0.9, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Side warm glows */}
      <motion.div
        className="absolute top-[15%] left-0 w-[350px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at 20% 50%, hsl(38 55% 45% / 0.08) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-[25%] right-0 w-[350px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, hsl(30 50% 42% / 0.07) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
    </div>
  );
}

function MarqueeBulbs({ count = 20 }: { count?: number }) {
  const bulbs = useMemo(() => Array.from({ length: count }, (_, i) => i), [count]);
  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-3.5" aria-hidden>
      {bulbs.map((i) => (
        <motion.span
          key={i}
          className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, hsl(38 85% 72%) 0%, hsl(38 70% 55%) 50%, hsl(38 55% 38%) 100%)",
            boxShadow:
              "0 0 8px hsl(38 75% 55% / 0.6), 0 0 16px hsl(38 65% 45% / 0.3), 0 0 24px hsl(38 55% 40% / 0.15)",
          }}
          animate={{
            opacity: [0.35, 1, 0.5, 0.9, 0.4, 0.95, 0.35],
            scale: [0.85, 1.15, 0.9, 1.1, 0.85],
          }}
          transition={{
            duration: 2 + (i % 4) * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  );
}

function FloatingDust() {
  const motes = useMemo(
    () =>
      Array.from({ length: 30 }, (_, i) => ({
        id: i,
        left: `${(i * 41 + 13) % 100}%`,
        top: `${(i * 37 + 9) % 100}%`,
        size: 1 + (i % 3) * 0.5,
        dur: 14 + (i % 8) * 2.5,
        delay: (i % 6) * 0.5,
      })),
    []
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[2] overflow-hidden" aria-hidden>
      {motes.map((m) => (
        <motion.span
          key={m.id}
          className="absolute rounded-full bg-[hsl(38_35%_80%/0.1)]"
          style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
          animate={{
            y: [0, -16, 5, -10, 0],
            x: [0, 5, -3, 6, 0],
            opacity: [0.03, 0.14, 0.05, 0.11, 0.03],
          }}
          transition={{ duration: m.dur, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
        />
      ))}
    </div>
  );
}

function SoffitLightsRig() {
  const lights = [
    { x: "10%", color: "hsl(38 80% 55%)", delay: 0 },
    { x: "25%", color: "hsl(350 55% 45%)", delay: 0.3 },
    { x: "40%", color: "hsl(30 65% 50%)", delay: 0.6 },
    { x: "55%", color: "hsl(38 70% 48%)", delay: 0.9 },
    { x: "70%", color: "hsl(350 50% 42%)", delay: 0.4 },
    { x: "85%", color: "hsl(38 60% 52%)", delay: 0.7 },
  ];
  return (
    <div className="pointer-events-none relative w-full max-w-3xl mx-auto h-44 sm:h-56 mt-8 mb-4" aria-hidden>
      {/* Truss bar */}
      <div className="absolute top-0 left-[5%] right-[5%] h-1.5 rounded-full bg-gradient-to-r from-ivory/[0.04] via-ivory/[0.08] to-ivory/[0.04]" />

      {lights.map((light, i) => (
        <motion.div
          key={i}
          className="absolute top-0"
          style={{ left: light.x }}
          animate={{ x: [0, i % 2 ? 4 : -4, 0] }}
          transition={{ duration: 7 + i, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Beam cone */}
          <motion.div
            className="absolute top-4 left-1/2 -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: "45px solid transparent",
              borderRight: "45px solid transparent",
              borderTop: `${160 + i * 8}px solid ${light.color.replace(")", " / 0.08)")}`,
              filter: "blur(12px)",
            }}
            animate={{ opacity: [0.4, 0.8, 0.45, 0.7, 0.4] }}
            transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: "easeInOut", delay: light.delay }}
          />
          {/* Fixture */}
          <div className="relative w-5 h-3.5 rounded-b-sm mx-auto bg-[hsl(0_0%_18%/0.8)] border-b border-x border-ivory/[0.06]" />
          {/* Lens glow */}
          <motion.div
            className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{
              background: `radial-gradient(circle, ${light.color} 0%, ${light.color.replace(")", " / 0.4)")} 50%, transparent 70%)`,
              boxShadow: `0 0 12px ${light.color.replace(")", " / 0.5)")}, 0 0 24px ${light.color.replace(")", " / 0.2)")}`,
            }}
            animate={{
              opacity: [0.5, 1, 0.6, 0.9, 0.5],
              scale: [0.9, 1.2, 0.95, 1.15, 0.9],
            }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: light.delay }}
          />
        </motion.div>
      ))}

      {/* Stage floor reflection */}
      <motion.div
        className="absolute bottom-0 left-[8%] right-[8%] h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, hsl(38 55% 50% / 0.2), hsl(350 45% 45% / 0.12), hsl(38 55% 50% / 0.2), transparent)",
        }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

/* ═══════════════════════════ SHOW CARD ═══════════════════════════ */

function ShowCard({
  show,
  index,
  onOpen,
}: {
  show: Show;
  index: number;
  onOpen: () => void;
}) {
  const isUpcoming = show.status === "upcoming";
  const rotations = [-1.5, 1.8, -0.8, 2.1];
  const rot = rotations[index % rotations.length];

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="relative block w-full text-left cursor-pointer outline-none group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotate: `${rot}deg` }}
      whileHover={{ rotate: 0, scale: 1.03, y: -8 }}
    >
      {/* Shadow */}
      <div className="absolute inset-0 translate-y-3 bg-black/25 blur-xl rounded-sm transition-all duration-500 group-hover:translate-y-6 group-hover:blur-2xl group-hover:bg-black/35" />

      {/* Warm hover glow */}
      <div className="pointer-events-none absolute -inset-6 rounded-xl bg-[radial-gradient(ellipse_at_center,hsl(350_55%_45%/0.12),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Brass pushpin */}
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30">
        <div
          className="w-4 h-4 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, hsl(38 70% 72%) 0%, hsl(38 60% 50%) 50%, hsl(38 48% 35%) 100%)",
            boxShadow: "0 2px 6px hsl(0 0% 0% / 0.5), 0 0 8px hsl(38 60% 50% / 0.2)",
          }}
        />
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[hsl(38_80%_82%/0.7)]" />
      </div>

      {/* Card body */}
      <div
        className={`relative overflow-hidden border transition-all duration-500 ${
          isUpcoming
            ? "border-[hsl(350_50%_40%/0.35)] group-hover:border-[hsl(350_55%_50%/0.5)] shadow-[0_0_35px_hsl(350_50%_35%/0.12)]"
            : "border-ivory/[0.08] group-hover:border-ivory/15"
        }`}
        style={{
          background: isUpcoming
            ? "linear-gradient(145deg, hsl(350 35% 18%) 0%, hsl(350 28% 14%) 50%, hsl(350 22% 12%) 100%)"
            : "linear-gradient(145deg, hsl(350 18% 11%) 0%, hsl(348 15% 9%) 50%, hsl(350 12% 8%) 100%)",
        }}
      >
        {/* Paper texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Gold shimmer sweep for upcoming */}
        {isUpcoming && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(110deg, transparent 25%, hsl(350 60% 55% / 0.08) 42%, hsl(350 70% 60% / 0.14) 50%, hsl(350 60% 55% / 0.08) 58%, transparent 75%)",
            }}
            animate={{ x: ["-120%", "220%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }}
          />
        )}

        {/* Gold inset border */}
        {isUpcoming && <div className="absolute inset-3 border border-[hsl(350_45%_45%/0.12)] pointer-events-none" />}

        {/* Wax seal */}
        {isUpcoming && (
          <div className="absolute top-4 right-4 w-11 h-11 sm:w-12 sm:h-12">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 38% 35%, hsl(350 55% 35%) 0%, hsl(350 45% 24%) 50%, hsl(350 40% 18%) 100%)",
                boxShadow: "0 3px 8px hsl(0 0% 0% / 0.5), inset 0 1px 3px hsl(350 35% 45% / 0.3)",
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center font-hand text-gold/65 text-lg">
              D
            </span>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-7">
            {/* Date block */}
            <div className="shrink-0 text-center sm:text-left">
              <span className="block text-gold/40 text-[10px] tracking-[0.35em] uppercase font-light">
                {show.day}
              </span>
              <span
                className={`block text-editorial-display leading-none mt-1 ${
                  isUpcoming ? "text-ivory text-5xl sm:text-6xl" : "text-ivory/50 text-4xl sm:text-5xl"
                }`}
                style={{
                  textShadow: isUpcoming
                    ? "0 0 30px hsl(38 65% 50% / 0.2), 0 2px 12px hsl(0 0% 0% / 0.3)"
                    : "none",
                }}
              >
                {show.dateNum}
              </span>
              <span className={`block text-xs tracking-[0.2em] uppercase mt-1 font-light ${isUpcoming ? "text-ivory/35" : "text-ivory/18"}`}>
                {show.month} {show.year}
              </span>
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h3
                className={`font-serif text-lg sm:text-xl leading-snug mb-3 ${
                  isUpcoming ? "text-ivory/90" : "text-ivory/45"
                }`}
                style={{
                  textShadow: isUpcoming ? "0 1px 8px hsl(0 0% 0% / 0.3)" : "none",
                }}
              >
                {show.title}
              </h3>

              <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className={`w-3.5 h-3.5 shrink-0 ${isUpcoming ? "text-gold/40" : "text-ivory/15"}`} />
                  <span className={`text-sm tracking-wider ${isUpcoming ? "text-ivory/50" : "text-ivory/25"}`}>
                    {show.venue}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={`w-3.5 h-3.5 shrink-0 ${isUpcoming ? "text-gold/30" : "text-ivory/12"}`} />
                  <span className={`text-xs tracking-wider ${isUpcoming ? "text-ivory/35" : "text-ivory/18"}`}>
                    {show.time} &middot; {show.city}
                  </span>
                </div>
              </div>

              {/* CTA */}
              {isUpcoming && (
                <div className="flex items-center gap-2 mt-5">
                  <Ticket className="w-4 h-4 text-gold/50" />
                  <span className="text-gold/50 text-xs tracking-[0.2em] uppercase font-light group-hover:text-gold/80 transition-colors">
                    Tap for tickets
                  </span>
                </div>
              )}

              {show.stamp && (
                <div className="mt-4 rotate-[-6deg] inline-block">
                  <span className="inline-block border-2 border-[hsl(350_45%_35%/0.4)] text-[hsl(350_45%_40%/0.4)] text-[10px] tracking-[0.3em] uppercase px-3 py-1 font-serif">
                    {show.stamp}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Aged vignette */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: isUpcoming
              ? "inset 0 0 40px hsl(38 15% 8% / 0.25)"
              : "inset 0 0 50px hsl(350 20% 5% / 0.4)",
          }}
        />
      </div>
    </motion.button>
  );
}

/* ═══════════════════════════ OPENED INVITATION ═══════════════════════════ */

function OpenedInvitation({ show, onClose }: { show: Show; onClose: () => void }) {
  const isUpcoming = show.status === "upcoming";

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        onClick={onClose}
      />
      <motion.div
        className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="relative w-full max-w-lg overflow-hidden border max-h-[90vh] overflow-y-auto"
          style={{
            borderColor: isUpcoming ? "hsl(38 45% 38% / 0.25)" : "hsl(350 20% 20% / 0.15)",
            background: isUpcoming
              ? "linear-gradient(160deg, hsl(38 20% 14%) 0%, hsl(35 16% 11%) 40%, hsl(38 12% 9%) 100%)"
              : "linear-gradient(160deg, hsl(350 16% 10%) 0%, hsl(348 14% 8%) 100%)",
          }}
          initial={{ scale: 0.88, y: 40, rotateX: 6 }}
          animate={{ scale: 1, y: 0, rotateX: 0 }}
          exit={{ scale: 0.9, y: 30, rotateX: 4 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Paper texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='p'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23p)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Gold borders */}
          {isUpcoming && (
            <>
              <div className="absolute inset-3 border border-gold/[0.08] pointer-events-none z-[1]" />
              <div className="absolute inset-4 border border-gold/[0.04] pointer-events-none z-[1]" />
            </>
          )}

          {/* Corner ornaments */}
          {isUpcoming &&
            ["top-3 left-3", "top-3 right-3 -scale-x-100", "bottom-3 left-3 -scale-y-100", "bottom-3 right-3 -scale-x-100 -scale-y-100"].map((pos, ci) => (
              <div key={ci} className={`absolute ${pos} pointer-events-none z-[1]`}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="text-gold/12">
                  <path d="M0 0v8c0-2 2-4 4-4h4c-4 0-6 0-8-4z" fill="currentColor" />
                </svg>
              </div>
            ))}

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-ivory/12 bg-black/25 text-ivory/50 backdrop-blur-sm transition-colors hover:bg-black/40 hover:text-ivory"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative z-10 p-8 sm:p-10 md:p-12">
            {/* Wax seal */}
            {isUpcoming && (
              <div className="flex justify-center mb-5">
                <div className="relative w-14 h-14">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "radial-gradient(circle at 38% 35%, hsl(350 55% 34%) 0%, hsl(350 45% 22%) 50%, hsl(350 40% 16%) 100%)",
                      boxShadow: "0 3px 10px hsl(0 0% 0% / 0.5), inset 0 1px 3px hsl(350 30% 45% / 0.3)",
                    }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center font-hand text-gold/65 text-xl">D</span>
                </div>
              </div>
            )}

            {isUpcoming && (
              <p className="text-center text-gold/30 text-[9px] tracking-[0.5em] uppercase font-light mb-5">
                You are cordially invited
              </p>
            )}

            <h2
              className={`text-center font-serif text-2xl sm:text-3xl leading-tight mb-2 ${isUpcoming ? "text-ivory" : "text-ivory/60"}`}
              style={{ textShadow: isUpcoming ? "0 0 30px hsl(38 60% 50% / 0.12), 0 2px 12px hsl(0 0% 0% / 0.4)" : "none" }}
            >
              {show.title}
            </h2>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 my-6">
              <div className={`flex-1 max-w-14 h-px ${isUpcoming ? "bg-gold/18" : "bg-ivory/[0.06]"}`} />
              <svg className={`w-3 h-3 ${isUpcoming ? "text-gold/25" : "text-ivory/10"}`} viewBox="0 0 12 12" fill="currentColor" aria-hidden>
                <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12 3.75 7.5 0 4.5h4.5z" />
              </svg>
              <div className={`flex-1 max-w-14 h-px ${isUpcoming ? "bg-gold/18" : "bg-ivory/[0.06]"}`} />
            </div>

            <div className="text-center space-y-3 mb-8">
              <p className={`text-editorial-display text-2xl ${isUpcoming ? "text-ivory/90" : "text-ivory/50"}`}>
                {show.day}, {show.dateNum} {show.month} {show.year}
              </p>
              <div className="flex items-center justify-center gap-2">
                <MapPin className={`w-3.5 h-3.5 ${isUpcoming ? "text-gold/40" : "text-ivory/15"}`} />
                <span className={`font-serif text-sm tracking-wider ${isUpcoming ? "text-ivory/55" : "text-ivory/30"}`}>{show.venue}</span>
              </div>
              <p className={`text-xs tracking-[0.25em] uppercase ${isUpcoming ? "text-ivory/30" : "text-ivory/12"}`}>{show.city}</p>
              <div className="flex items-center justify-center gap-2">
                <Clock className={`w-3 h-3 ${isUpcoming ? "text-gold/30" : "text-ivory/12"}`} />
                <span className={`text-xs tracking-wider ${isUpcoming ? "text-ivory/35" : "text-ivory/15"}`}>{show.time}</span>
              </div>
            </div>

            {show.guests && (
              <div className="text-center mb-6">
                <span className={`text-[9px] tracking-[0.35em] uppercase font-light ${isUpcoming ? "text-gold/30" : "text-ivory/15"}`}>Featuring</span>
                <p className={`font-serif text-sm mt-1 ${isUpcoming ? "text-ivory/45" : "text-ivory/20"}`}>{show.guests}</p>
              </div>
            )}

            {show.diary && (
              <div className="text-center mb-8">
                <p className={`font-hand text-lg sm:text-xl leading-relaxed max-w-sm mx-auto ${isUpcoming ? "text-gold/35" : "text-ivory/18"}`}>
                  &ldquo;{show.diary}&rdquo;
                </p>
              </div>
            )}

            {show.stamp && (
              <div className="flex justify-center mb-8">
                <span className="inline-block border-2 border-[hsl(350_45%_35%/0.35)] text-[hsl(350_45%_40%/0.3)] text-sm tracking-[0.3em] uppercase px-5 py-2 font-serif rotate-[-4deg]">
                  {show.stamp}
                </span>
              </div>
            )}

            {isUpcoming && (
              <div className="text-center">
                <a
                  href={show.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 border border-gold/30 bg-gold/[0.08] px-10 py-4 text-xs tracking-[0.3em] uppercase text-gold transition-all duration-500 hover:bg-gold/15 hover:border-gold/50 hover:shadow-[0_0_40px_hsl(38_60%_40%/0.15)]"
                >
                  <Ticket className="w-4 h-4" />
                  Get Tickets
                </a>
              </div>
            )}
          </div>

          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 60px hsl(350 20% 5% / 0.35)" }}
          />
        </motion.div>
      </motion.div>
    </>
  );
}

/* ═══════════════════════════ PAGE ═══════════════════════════ */

const LiveShows = () => {
  const [openShow, setOpenShow] = useState<Show | null>(null);
  const close = useCallback(() => setOpenShow(null), []);

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(165deg, hsl(350 40% 12%) 0%, hsl(350 30% 8%) 25%, hsl(0 0% 5%) 55%, hsl(350 25% 7%) 80%, hsl(350 35% 10%) 100%)" }}>
      <FilmGrain />
      <LightLeaksOverlay />
      <StageSpotlights />
      <FloatingDust />

      {/* Red ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-[1]" aria-hidden>
        <motion.div
          className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, hsl(350 50% 25% / 0.2) 0%, transparent 65%)" }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[40%] -right-[5%] w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, hsl(350 45% 22% / 0.18) 0%, transparent 60%)" }}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-0 left-[30%] w-[700px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse at center, hsl(350 40% 18% / 0.15) 0%, transparent 55%)" }}
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />
      </div>

      {/* Background hero image */}
      <div
        className="pointer-events-none fixed inset-0 z-[2] bg-[center_top_15%] bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/image/imgs/dasha_guitar.PNG')",
          opacity: 0.12,
          maskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 85%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, transparent 85%)",
        }}
      />

      <div className="relative z-10">
        {/* Back */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed top-[max(1rem,env(safe-area-inset-top))] left-4 sm:left-8 z-[60]"
        >
          <Link to="/" className="inline-flex min-h-11 items-center gap-3 text-ivory/40 transition-colors hover:text-ivory group">
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm tracking-widest uppercase">Back</span>
          </Link>
        </motion.div>

        {/* ══ HERO ══ */}
        <div className="relative pt-24 sm:pt-28 pb-4 sm:pb-6 px-4 text-center">
          {/* Marquee bulbs top */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.3 }}
            className="mb-5 sm:mb-6"
          >
            <MarqueeBulbs count={18} />
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-editorial-display text-ivory mb-2"
            style={{
              fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
              lineHeight: 1,
              letterSpacing: "0.06em",
              textShadow:
                "0 0 60px hsl(38 70% 50% / 0.25), 0 0 120px hsl(38 55% 45% / 0.1), 0 4px 24px hsl(0 0% 0% / 0.5)",
            }}
          >
            Live Shows
          </motion.h1>

          {/* Marquee bulbs bottom */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="mb-3 sm:mb-4"
          >
            <MarqueeBulbs count={18} />
          </motion.div>

          {/* Ornamental divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="flex items-center justify-center gap-3 mb-2"
          >
            <div className="w-14 sm:w-24 h-px bg-gradient-to-r from-transparent to-gold/25" />
            <svg className="w-4 h-4 text-gold/30" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 0l2 6h6l-5 4 2 6-5-4-5 4 2-6-5-4h6z" />
            </svg>
            <div className="w-14 sm:w-24 h-px bg-gradient-to-l from-transparent to-gold/25" />
          </motion.div>

        </div>

        {/* ══ UPCOMING SECTION ══ */}
        <section className="max-w-2xl mx-auto px-5 sm:px-8 pb-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-gold/15" />
            <span className="text-gold/40 text-[10px] tracking-[0.4em] uppercase font-light">
              Upcoming Shows
            </span>
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-gold/15" />
          </motion.div>

          <div className="space-y-7">
            {SHOWS.filter((s) => s.status === "upcoming").map((show, i) => (
              <ShowCard key={show.id} show={show} index={i} onOpen={() => setOpenShow(show)} />
            ))}
          </div>
        </section>

        {/* ══ PAST SHOWS (if any) ══ */}
        {SHOWS.some((s) => s.status === "past") && (
          <section className="max-w-2xl mx-auto px-5 sm:px-8 pb-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent to-ivory/[0.06]" />
              <span className="text-ivory/20 text-[10px] tracking-[0.4em] uppercase font-light">
                Past Shows
              </span>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent to-ivory/[0.06]" />
            </motion.div>
            <div className="space-y-6">
              {SHOWS.filter((s) => s.status === "past").map((show, i) => (
                <ShowCard key={show.id} show={show} index={i} onOpen={() => setOpenShow(show)} />
              ))}
            </div>
          </section>
        )}

        {/* ══ QUOTE ══ */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-serif text-ivory/40 text-base sm:text-lg italic max-w-lg mx-auto leading-relaxed text-center px-4 py-8 sm:py-12"
          style={{ textShadow: "0 2px 12px hsl(0 0% 0% / 0.4)" }}
        >
          Every performance tells a story. Every city becomes part of it.
        </motion.p>

        {/* ══ SOFFIT LIGHTS ══ */}
        <SoffitLightsRig />

        {/* Newsletter nudge */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center px-4 py-10 sm:py-14"
        >
          <p className="font-serif text-ivory/25 text-sm italic mb-2">
            More dates coming soon.
          </p>
          <p className="text-ivory/15 text-xs tracking-[0.15em]">
            <Link to="/" className="text-gold/30 hover:text-gold/55 underline underline-offset-4 decoration-gold/15 transition-colors">
              Subscribe
            </Link>{" "}
            to know first.
          </p>
        </motion.div>

        {/* Sign-off */}
        <motion.p
          className="text-center text-ivory/[0.08] text-[9px] tracking-[0.5em] uppercase pb-10"
          animate={{ opacity: [0.08, 0.18, 0.08] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          See you under the lights
        </motion.p>
      </div>

      {/* Opened invitation */}
      <AnimatePresence>
        {openShow && <OpenedInvitation show={openShow} onClose={close} />}
      </AnimatePresence>
    </main>
  );
};

export default LiveShows;

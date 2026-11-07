import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";

import vinylRecord from "@/assets/vinyl-record.png";
import Ornament from "@/components/series/Ornament";
import { ALBUM } from "@/data/album";
import { LATEST_RELEASE } from "@/data/latestRelease";
import { SERIES_LINKS, getLatestPublicRelease } from "@/data/series";

/** Dismissed for this visit only — a new tab is a new invitation. */
const STORAGE_KEY = "dashaday:mobile-welcome";

/** Phones and small tablets. Above this the site is left exactly as it was. */
const MOBILE_QUERY = "(max-width: 767px)";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The gilded room: gold gown, oxblood velvet, chandeliers. Already on the
 * site under /about — the one photograph whose own colours are the brand's.
 * Framed high so the gown and the chair carry the text, not her face.
 */
const PORTRAIT = "/image/about-artist.jpg";
const PORTRAIT_ALT =
  "DashaDay seated in a gold gown in a gilded, candlelit room";

type Screen = "doors" | "music";

/** An arched plaque with a numeral — a door, small enough to sit in a list. */
const Arch = ({ numeral }: { numeral: string }) => (
  <span
    aria-hidden
    className="relative flex h-12 w-9 shrink-0 items-end justify-center overflow-hidden
               border border-gold/35 pb-1.5 [border-radius:9999px_9999px_2px_2px]"
    style={{
      background:
        "linear-gradient(to bottom, hsl(var(--burgundy)/0.55), hsl(var(--burgundy-deep)/0.25))",
    }}
  >
    <span className="font-serif text-[12px] leading-none tracking-[0.1em] text-gold">
      {numeral}
    </span>
    <span className="absolute left-1/2 top-2.5 h-1 w-1 -translate-x-1/2 rotate-45 bg-gold/55" />
  </span>
);

/** One streaming address. Quiet, and large enough to hit with a thumb. */
const Platform = ({ name, url }: { name: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex min-h-11 items-center justify-center rounded-[2px] border border-gold/20
               bg-burgundy-deep/40 px-3 text-center font-sans text-[10px] uppercase
               tracking-[0.16em] text-ivory/75 transition-colors duration-300
               hover:border-gold/55 hover:text-gold focus-visible:border-gold/70
               focus-visible:text-gold focus-visible:outline-none"
  >
    {name}
  </a>
);

/**
 * The welcome, on phones only — built as the cover of an invitation.
 *
 * Her photograph carries the top of the screen because the five destinations
 * underneath are a list, and a list is not a reason to stay. The gradient
 * over it is oxblood rather than black so the gown and the gilding keep their
 * colour while the type stays legible, and the site's own grain sits on top
 * so it matches every other surface here.
 *
 * Five doors: someone arriving from a reel wants the music, someone from a
 * press list wants the kit, and guessing wrong costs the visit. Music opens a
 * second screen rather than a link, because the album is six addresses and
 * the single five more.
 *
 * Modal — focus trapped, page behind held still — unlike the new-episode
 * popup, which sits beside the content. This one is the way in.
 */
const MobileWelcome = () => {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("doors");
  /* `?welcome` previews it at any width; without this the CSS guard hides
     the very thing the flag exists to show. */
  const [forced, setForced] = useState(false);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  const latestEpisode = getLatestPublicRelease();

  /* Decided once, on mount. Dragging a desktop window narrow should not
     summon a welcome at somebody already reading the page. */
  useEffect(() => {
    const isForced = new URLSearchParams(window.location.search).has("welcome");
    setForced(isForced);
    if (!isForced) {
      if (!window.matchMedia(MOBILE_QUERY).matches) return;
      try {
        if (window.sessionStorage.getItem(STORAGE_KEY)) return;
      } catch {
        /* Storage blocked — show it; worst case it appears once more. */
      }
    }
    restoreFocusTo.current = document.activeElement as HTMLElement | null;
    const timer = window.setTimeout(() => setOpen(true), reduceMotion ? 0 : 400);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  const close = useCallback(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* Nothing to do: it will simply greet them again next time. */
    }
    setOpen(false);
    restoreFocusTo.current?.focus?.();
  }, []);

  /* Escape closes, Tab stays inside, the page behind holds still. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown, true);
    /* Focus the panel, not the close button: a screen reader should hear the
       invitation before it hears how to leave. */
    window.setTimeout(() => dialogRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, close]);

  if (!open) return null;

  const onMusic = screen === "music";

  const swap = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
      };

  const doors = [
    {
      numeral: "I",
      label: "Listen to my music",
      hint: "The album, and the new single",
      onClick: () => setScreen("music"),
    },
    {
      numeral: "II",
      label: "Watch my series",
      hint: latestEpisode ? `${latestEpisode.title} — out now` : "Things I Shouldn't Say",
      href: latestEpisode?.watchHref ?? SERIES_LINKS.telegram,
      external: true,
    },
    {
      numeral: "III",
      label: "Support the project",
      hint: "Keep the series being made",
      href: SERIES_LINKS.membership,
      external: true,
    },
    {
      numeral: "IV",
      label: "Explore the site",
      hint: "Carry on through the front door",
      onClick: close,
    },
    {
      numeral: "V",
      label: "Media kit",
      hint: "For press and collaborators",
      /* A static folder, not a route — a full load is correct here. */
      href: "/media-kit/",
      external: false,
    },
  ];

  const rowClass =
    "group relative flex w-full items-center gap-3.5 overflow-hidden border-b " +
    "border-ivory/[0.08] py-3 pl-1 pr-1 text-left transition-colors duration-300 " +
    "hover:border-gold/30 focus-visible:border-gold/50 focus-visible:outline-none";

  const rowBody = (door: (typeof doors)[number]) => (
    <>
      {/* Oxblood warms in from the left as the finger lands. */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full opacity-0
                   transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100
                   group-focus-visible:translate-x-0 group-focus-visible:opacity-100
                   motion-reduce:transition-none"
        style={{
          background:
            "linear-gradient(to right, hsl(var(--burgundy)/0.35), transparent 70%)",
        }}
      />
      <Arch numeral={door.numeral} />
      <span className="relative min-w-0 flex-1">
        <span className="block font-serif text-[15px] leading-tight text-ivory transition-colors duration-300 group-hover:text-gold">
          {door.label}
        </span>
        <span className="mt-0.5 block font-sans text-[11px] font-light leading-snug text-ivory/45">
          {door.hint}
        </span>
      </span>
      <span
        aria-hidden
        className="relative shrink-0 font-serif text-base text-gold/50 transition-transform
                   duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
      >
        →
      </span>
    </>
  );

  return (
    <div
      className={`fixed inset-0 z-[70] ${forced ? "" : "md:hidden"}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descId}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.5 }}
        className="absolute inset-0 bg-night/95 backdrop-blur-md"
        onClick={close}
      />

      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-0 right-0 mx-auto flex max-w-[430px] flex-col
                   overflow-y-auto border-x border-gold/15 bg-night outline-none"
      >
        {/* ── The cover ───────────────────────────────────────────────── */}
        <div
          className="relative shrink-0 overflow-hidden transition-[height] duration-700"
          style={{ height: onMusic ? "22vh" : "42vh", minHeight: onMusic ? 140 : 260 }}
        >
          <motion.img
            src={PORTRAIT}
            alt={PORTRAIT_ALT}
            initial={reduceMotion ? false : { scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full object-cover"
            style={{ objectPosition: onMusic ? "center 4%" : "center 18%" }}
          />

          {/* Candlelight from the top-left, the way the room is already lit. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(70% 55% at 18% 12%, hsl(var(--gold)/0.22), transparent 65%)",
            }}
          />
          {/* Oxblood rather than black, so the gilding keeps its colour. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 18%, hsl(var(--burgundy-deep)/0.55) 62%, hsl(var(--night)) 99%)",
            }}
          />
          {/* The site's own grain, so this surface matches every other one. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
            style={{ backgroundImage: "url('/image/grain.webp')", backgroundSize: "340px" }}
          />
          {/* A hairline frame, inset like a plate in a book. */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-3 border border-gold/20"
          />

          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center
                       rounded-full border border-ivory/15 bg-night/50 text-ivory/80
                       backdrop-blur-sm transition-colors duration-300 hover:border-gold/50
                       hover:text-gold focus-visible:border-gold focus-visible:text-gold
                       focus-visible:outline-none"
            aria-label="Close and continue to the site"
          >
            <X className="h-4.5 w-4.5" strokeWidth={1.5} />
          </button>

          <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
            <p className="font-sans text-[9.5px] uppercase tracking-[0.34em] text-gold">
              You are invited
            </p>
            <h2
              id={titleId}
              className="mt-2 font-serif text-[30px] leading-[1.05] text-ivory"
              style={{ textShadow: "0 2px 24px hsl(var(--night)/0.8)" }}
            >
              {onMusic ? ALBUM.title : "Choose your door"}
            </h2>
          </div>
        </div>

        {/* ── The choices ─────────────────────────────────────────────── */}
        <div className="flex-1 px-6 pb-8 pt-3">
          <AnimatePresence mode="wait">
            {screen === "doors" ? (
              <motion.div key="doors" {...swap} transition={{ duration: reduceMotion ? 0 : 0.3 }}>
                <p
                  id={descId}
                  className="font-sans text-[12px] font-light leading-relaxed text-ivory/55"
                >
                  Cinematic pop on one side, an old university with a secret
                  on the other.
                </p>

                <Ornament className="my-3" width="max-w-full" />

                <nav aria-label="Where would you like to go">
                  {doors.map((door) =>
                    door.href ? (
                      <a
                        key={door.numeral}
                        href={door.href}
                        {...(door.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        onClick={close}
                        className={rowClass}
                      >
                        {rowBody(door)}
                      </a>
                    ) : (
                      <button key={door.numeral} type="button" onClick={door.onClick} className={rowClass}>
                        {rowBody(door)}
                      </button>
                    )
                  )}
                </nav>
              </motion.div>
            ) : (
              <motion.div key="music" {...swap} transition={{ duration: reduceMotion ? 0 : 0.3 }}>
                <button
                  type="button"
                  onClick={() => setScreen("doors")}
                  className="inline-flex min-h-11 items-center gap-2 font-sans text-[9.5px]
                             uppercase tracking-[0.26em] text-ivory/55 transition-colors
                             duration-300 hover:text-gold focus-visible:text-gold
                             focus-visible:outline-none"
                >
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.4} />
                  The doors
                </button>

                <div className="relative mt-2 flex items-center gap-4">
                  {/* The record slides out from behind the sleeve, off a shelf. */}
                  <motion.img
                    src={vinylRecord}
                    alt=""
                    aria-hidden
                    initial={reduceMotion ? false : { x: -16, rotate: -14, opacity: 0 }}
                    animate={{ x: 0, rotate: 0, opacity: 0.9 }}
                    transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.1 }}
                    className="absolute left-11 h-[84px] w-[84px] object-contain"
                  />
                  <img
                    src={ALBUM.cover}
                    alt={ALBUM.coverAlt}
                    width={84}
                    height={84}
                    className="relative h-[84px] w-[84px] shrink-0 border border-gold/25 object-cover"
                  />
                  <Link
                    to={ALBUM.route}
                    onClick={close}
                    className="relative ml-auto inline-flex min-h-11 items-center rounded-[2px]
                               border border-gold/55 bg-gold/[0.08] px-4 font-sans text-[9.5px]
                               uppercase tracking-[0.2em] text-gold transition-colors duration-300
                               hover:bg-gold/20 focus-visible:bg-gold/20 focus-visible:outline-none"
                  >
                    Album page
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-2">
                  {ALBUM.platforms.map((p) => (
                    <Platform key={p.name} name={p.name} url={p.url} />
                  ))}
                </div>

                <Ornament className="my-5" width="max-w-full" />

                <h3 className="font-serif text-[20px] leading-tight text-ivory">
                  {LATEST_RELEASE.title}
                </h3>
                <p className="mt-1 font-sans text-[9.5px] uppercase tracking-[0.22em] text-gold/75">
                  The new {LATEST_RELEASE.kind.toLowerCase()}
                </p>

                <div className="mt-3 flex items-center gap-4">
                  <img
                    src={LATEST_RELEASE.cover}
                    alt={LATEST_RELEASE.coverAlt}
                    width={72}
                    height={72}
                    className="h-[72px] w-[72px] shrink-0 border border-gold/25 object-cover"
                  />
                  <p className="font-sans text-[11.5px] font-light leading-relaxed text-ivory/55">
                    {LATEST_RELEASE.blurb}
                  </p>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  {LATEST_RELEASE.platforms.map((p) => (
                    <Platform key={p.label} name={p.label} url={p.href} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileWelcome;

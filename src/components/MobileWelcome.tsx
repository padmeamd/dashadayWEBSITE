import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { Link } from "react-router-dom";

import vinylRecord from "@/assets/vinyl-record.png";
import { ALBUM } from "@/data/album";
import { LATEST_RELEASE } from "@/data/latestRelease";
import { SERIES_LINKS, getLatestPublicRelease } from "@/data/series";

/** Dismissed for this visit only — a new tab is a new invitation. */
const STORAGE_KEY = "dashaday:mobile-welcome";

/** Phones and small tablets. Above this the site is left exactly as it was. */
const MOBILE_QUERY = "(max-width: 767px)";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The gilded room: gold gown, oxblood velvet, chandeliers. The site's own
 * copy is the largest one there is (1280×1498) — larger than the original
 * still in Downloads — so nothing new had to be added for this.
 */
const PORTRAIT = "/image/about-artist.jpg";
const PORTRAIT_ALT = "DashaDay seated in a gold gown in a gilded, candlelit room";

type Screen = "doors" | "music";

/** A punched edge, where the photograph is torn from the invitation. */
const TicketEdge = () => (
  <span aria-hidden className="pointer-events-none absolute inset-x-0 -top-[7px] flex justify-between px-2">
    {Array.from({ length: 17 }).map((_, i) => (
      <span key={i} className="h-3.5 w-3.5 rounded-full bg-night" />
    ))}
  </span>
);

/** Three glints, placed where the chandeliers already are. */
const Glints = ({ still }: { still: boolean }) => (
  <>
    {[
      { top: "14%", left: "22%", delay: 0 },
      { top: "9%", left: "68%", delay: 1.1 },
      { top: "27%", left: "86%", delay: 2.2 },
    ].map((g, i) => (
      <motion.span
        key={i}
        aria-hidden
        className="pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-gold-glow"
        style={{ top: g.top, left: g.left, boxShadow: "0 0 10px 2px hsl(var(--gold-glow)/0.7)" }}
        initial={{ opacity: still ? 0.5 : 0, scale: 1 }}
        animate={
          still
            ? { opacity: 0.5 }
            : { opacity: [0, 0.9, 0], scale: [0.6, 1.25, 0.6] }
        }
        transition={
          still
            ? { duration: 0 }
            : { duration: 3.2, delay: g.delay, repeat: Infinity, repeatDelay: 2.4, ease: "easeInOut" }
        }
      />
    ))}
  </>
);

/** One streaming address. Champagne on burgundy, thumb-sized. */
const Platform = ({ name, url }: { name: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex min-h-11 items-center justify-center rounded-[3px] border border-gold/25
               bg-burgundy/25 px-2 text-center font-sans text-[9.5px] uppercase
               tracking-[0.14em] text-ivory/85 transition-colors duration-300
               hover:border-gold/70 hover:bg-burgundy/45 hover:text-gold
               focus-visible:border-gold focus-visible:text-gold focus-visible:outline-none"
  >
    {name}
  </a>
);

/**
 * The welcome, on phones only — a cinematic invitation rather than a modal.
 *
 * Her photograph is the top half and is left bright: the warm gradient sits
 * only along its lower edge, enough to carry type, so the gilding and her
 * face keep their own light. An earlier version washed the whole frame in
 * oxblood and the face went with it.
 *
 * Underneath, two cards instead of a list. Five identical rows made every
 * destination look equally likely, when in truth almost everyone arriving
 * here wants either the music or the series; the other three belong as a
 * quiet line beneath.
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
  const still = Boolean(reduceMotion);
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
    const timer = window.setTimeout(() => setOpen(true), still ? 0 : 350);
    return () => window.clearTimeout(timer);
  }, [still]);

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

  const onMusic = screen === "music";

  /** Everything enters the same way: a short rise, staggered by its turn. */
  const rise = (delay: number) => ({
    initial: still ? { opacity: 0 } : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: still ? 0 : 0.55, delay: still ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  const swap = still
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  const small = [
    { label: "Support the project", href: SERIES_LINKS.membership, external: true },
    { label: "Explore the site", onClick: close },
    /* A static folder, not a route — a full load is correct here. */
    { label: "Media kit", href: "/media-kit/", external: false },
  ];

  return (
    <AnimatePresence>
      {open && (
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
            exit={{ opacity: 0 }}
            transition={{ duration: still ? 0 : 0.45 }}
            className="absolute inset-0 bg-night/95 backdrop-blur-md"
            onClick={close}
          />

          <motion.div
            ref={dialogRef}
            tabIndex={-1}
            initial={still ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: still ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 right-0 mx-auto flex max-w-[430px] flex-col
                       overflow-y-auto bg-night outline-none"
            style={{ boxShadow: "0 0 90px -20px hsl(var(--burgundy)/0.9)" }}
          >
            {/* ── The plate ───────────────────────────────────────────── */}
            <div
              className="relative shrink-0 overflow-hidden transition-[height] duration-700"
              style={{ height: onMusic ? "24vh" : "54vh", minHeight: onMusic ? 155 : 330 }}
            >
              <motion.img
                src={PORTRAIT}
                alt={PORTRAIT_ALT}
                initial={still ? { opacity: 0 } : { opacity: 0, scale: 1.07 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: still ? 0 : 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="h-full w-full object-cover"
                style={{ objectPosition: onMusic ? "center 4%" : "center 20%" }}
              />

              {/* Candlelight, from where the room is already lit. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(60% 45% at 20% 10%, hsl(var(--gold)/0.20), transparent 62%)",
                }}
              />
              {/* Warmth along the lower edge only. The face stays its own
                  brightness — the version that washed the whole frame took
                  her with it. */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%]"
                style={{
                  background:
                    "linear-gradient(to bottom, transparent, hsl(var(--burgundy-deep)/0.70) 52%, hsl(var(--burgundy)) 100%)",
                }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
                style={{ backgroundImage: "url('/image/grain.webp')", backgroundSize: "320px" }}
              />
              <span aria-hidden className="pointer-events-none absolute inset-2.5 border border-gold/25" />

              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-28"
                style={{ background: "linear-gradient(to bottom, hsl(var(--night)/0.72), transparent)" }}
              />

              <Glints still={still} />

              <motion.button
                {...rise(0.15)}
                type="button"
                onClick={close}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center
                           rounded-full border border-ivory/25 bg-night/45 text-ivory
                           backdrop-blur-sm transition-colors duration-300 hover:border-gold
                           hover:text-gold focus-visible:border-gold focus-visible:text-gold
                           focus-visible:outline-none"
                aria-label="Close and continue to the site"
              >
                <X className="h-4 w-4" strokeWidth={1.6} />
              </motion.button>

              <motion.p
                {...rise(0.3)}
                className="absolute left-6 top-6 font-sans text-[9px] uppercase tracking-[0.36em] text-gold-glow"
                style={{ textShadow: "0 1px 10px hsl(var(--night)/0.9)" }}
              >
                An invitation · London
              </motion.p>

              <motion.div {...rise(0.45)} className="absolute inset-x-0 bottom-0 px-6 pb-6">
                <h2
                  id={titleId}
                  className="font-serif text-[29px] leading-[1.06] text-ivory"
                  style={{ textShadow: "0 2px 22px hsl(var(--night)/0.85)" }}
                >
                  {onMusic ? ALBUM.title : "A night inside my world"}
                </h2>
              </motion.div>
            </div>

            {/* The perforation sits on the join, outside the clipped frame
                above — inside it, the photograph simply ate it. */}
            <div className="relative h-0">
              <span aria-hidden className="absolute inset-x-0 -top-px h-px bg-gold/35" />
              <TicketEdge />
            </div>

            {/* ── The choosing ────────────────────────────────────────── */}
            <div className="flex flex-1 flex-col justify-between px-5 pb-8 pt-7">
              <AnimatePresence mode="wait">
                {screen === "doors" ? (
                  <motion.div key="doors" {...swap} transition={{ duration: still ? 0 : 0.3 }}>
                    <motion.p
                      {...rise(0.55)}
                      id={descId}
                      className="text-center font-sans text-[11.5px] font-light leading-relaxed text-ivory/60"
                    >
                      Cinematic pop on one side, an old university with a
                      secret on the other.
                    </motion.p>

                    <div className="mt-5 grid grid-cols-2 gap-3">
                      <motion.button
                        {...rise(0.68)}
                        whileTap={still ? undefined : { scale: 0.975 }}
                        type="button"
                        onClick={() => setScreen("music")}
                        className="group relative overflow-hidden rounded-[4px] border border-gold/35
                                   px-4 pb-4 pt-5 text-left transition-colors duration-300
                                   hover:border-gold/75 focus-visible:border-gold focus-visible:outline-none"
                        style={{
                          background:
                            "linear-gradient(155deg, hsl(var(--burgundy)/0.55), hsl(var(--night)) 78%)",
                        }}
                      >
                        <img src={vinylRecord} alt="" aria-hidden className="h-7 w-7 opacity-80" />
                        <span className="mt-3 block font-serif text-[17px] leading-tight text-ivory">
                          The Soundtrack
                        </span>
                        <span className="mt-1 block font-sans text-[10.5px] font-light leading-snug text-ivory/55">
                          The album, and the new single
                        </span>
                      </motion.button>

                      <motion.a
                        {...rise(0.8)}
                        whileTap={still ? undefined : { scale: 0.975 }}
                        href={latestEpisode?.watchHref ?? SERIES_LINKS.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={close}
                        className="group relative overflow-hidden rounded-[4px] border border-gold/35
                                   px-4 pb-4 pt-5 text-left transition-colors duration-300
                                   hover:border-gold/75 focus-visible:border-gold focus-visible:outline-none"
                        style={{
                          background:
                            "linear-gradient(155deg, hsl(var(--burgundy-deep)/0.85), hsl(var(--night)) 78%)",
                        }}
                      >
                        {/* A lit doorway, drawn rather than imported. */}
                        <span
                          aria-hidden
                          className="flex h-7 w-[22px] items-end justify-center border border-gold/55
                                     [border-radius:9999px_9999px_1px_1px]"
                          style={{ background: "linear-gradient(to top, hsl(var(--gold)/0.3), transparent)" }}
                        />
                        <span className="mt-3 block font-serif text-[17px] leading-tight text-ivory">
                          The Story
                        </span>
                        <span className="mt-1 block font-sans text-[10.5px] font-light leading-snug text-ivory/55">
                          {latestEpisode ? `${latestEpisode.title} — out now` : "Things I Shouldn't Say"}
                        </span>
                      </motion.a>
                    </div>

                    <motion.div
                      {...rise(0.95)}
                      className="mt-6 flex items-center justify-center gap-x-3 gap-y-2 text-center"
                    >
                      {small.map((item, i) => (
                        <span key={item.label} className="flex items-center gap-3">
                          {i > 0 && <span aria-hidden className="h-1 w-1 rotate-45 bg-gold/45" />}
                          {item.href ? (
                            <a
                              href={item.href}
                              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              onClick={close}
                              className="inline-flex min-h-11 items-center font-sans text-[9.5px] uppercase
                                         tracking-[0.16em] text-ivory/60 transition-colors duration-300
                                         hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                            >
                              {item.label}
                            </a>
                          ) : (
                            <button
                              type="button"
                              onClick={item.onClick}
                              className="inline-flex min-h-11 items-center font-sans text-[9.5px] uppercase
                                         tracking-[0.16em] text-ivory/60 transition-colors duration-300
                                         hover:text-gold focus-visible:text-gold focus-visible:outline-none"
                            >
                              {item.label}
                            </button>
                          )}
                        </span>
                      ))}
                    </motion.div>
                  </motion.div>
                ) : (
                  <motion.div key="music" {...swap} transition={{ duration: still ? 0 : 0.3 }}>
                    <button
                      type="button"
                      onClick={() => setScreen("doors")}
                      className="inline-flex min-h-11 items-center gap-2 font-sans text-[9.5px]
                                 uppercase tracking-[0.24em] text-ivory/60 transition-colors
                                 duration-300 hover:text-gold focus-visible:text-gold
                                 focus-visible:outline-none"
                    >
                      <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.4} />
                      Back
                    </button>

                    <div className="relative mt-1 flex items-center gap-4">
                      <motion.img
                        src={vinylRecord}
                        alt=""
                        aria-hidden
                        initial={still ? false : { x: -16, rotate: -14, opacity: 0 }}
                        animate={{ x: 0, rotate: 0, opacity: 0.9 }}
                        transition={{ duration: still ? 0 : 0.85, delay: still ? 0 : 0.1 }}
                        className="absolute left-11 h-[82px] w-[82px] object-contain"
                      />
                      <img
                        src={ALBUM.cover}
                        alt={ALBUM.coverAlt}
                        width={82}
                        height={82}
                        className="relative h-[82px] w-[82px] shrink-0 border border-gold/35 object-cover"
                      />
                      <Link
                        to={ALBUM.route}
                        onClick={close}
                        className="relative ml-auto inline-flex min-h-11 items-center rounded-[3px]
                                   border border-gold/60 bg-gold/[0.1] px-4 font-sans text-[9.5px]
                                   uppercase tracking-[0.18em] text-gold transition-colors duration-300
                                   hover:bg-gold/25 focus-visible:bg-gold/25 focus-visible:outline-none"
                      >
                        Album page
                      </Link>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {ALBUM.platforms.map((p) => (
                        <Platform key={p.name} name={p.name} url={p.url} />
                      ))}
                    </div>

                    <div className="my-5 flex items-center gap-3" aria-hidden>
                      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
                      <span className="h-1.5 w-1.5 rotate-45 bg-gold/50" />
                      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
                    </div>

                    <div className="flex items-center gap-4">
                      <img
                        src={LATEST_RELEASE.cover}
                        alt={LATEST_RELEASE.coverAlt}
                        width={70}
                        height={70}
                        className="h-[70px] w-[70px] shrink-0 border border-gold/35 object-cover"
                      />
                      <div className="min-w-0">
                        <h3 className="font-serif text-[19px] leading-tight text-ivory">
                          {LATEST_RELEASE.title}
                        </h3>
                        <p className="mt-0.5 font-sans text-[9px] uppercase tracking-[0.2em] text-gold-glow">
                          The new {LATEST_RELEASE.kind.toLowerCase()}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
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
      )}
    </AnimatePresence>
  );
};

export default MobileWelcome;

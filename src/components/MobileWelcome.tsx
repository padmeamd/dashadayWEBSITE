import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
 * copy (1280×1498) is the largest there is — larger than the original left
 * in Downloads — so nothing new had to be added for this.
 */
const PORTRAIT = "/image/about-artist.jpg";
const PORTRAIT_ALT = "DashaDay seated in a gold gown in a gilded, candlelit room";

/** Spelled out, because "Episode 02" reads like a placeholder. */
const ORDINAL = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven"];

type Screen = "doors" | "music";

type Choice = {
  key: string;
  label: string;
  hint: string;
  /** Her own artwork. Same square, same corner, on every card. */
  art: string;
  href?: string;
  external?: boolean;
  onClick?: () => void;
};

/** A punched edge, where the photograph tears away from the invitation. */
const TicketEdge = () => (
  <span aria-hidden className="pointer-events-none absolute inset-x-0 -top-[7px] flex justify-between px-2">
    {Array.from({ length: 17 }).map((_, i) => (
      <span key={i} className="h-3.5 w-3.5 rounded-full bg-night" />
    ))}
  </span>
);

/** Three glints, placed where the chandeliers already hang. */
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
        animate={still ? { opacity: 0.5 } : { opacity: [0, 0.9, 0], scale: [0.6, 1.25, 0.6] }}
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
 * Her photograph is the plate at the top, left bright: the warm gradient sits
 * only along its lower edge, so the gilding and her face keep their own light.
 *
 * Underneath, five cards of one size. An earlier version ranked them — two
 * large, three as small text — which quietly decided for the visitor that the
 * media kit mattered less than the music. It does to most people and not at
 * all to a journalist, and the welcome cannot tell which has arrived. Each
 * card carries a square of her own artwork, same size and same corner, so
 * five destinations read as one set.
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
  const navigate = useNavigate();
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
    transition: { duration: still ? 0 : 0.5, delay: still ? 0 : delay, ease: [0.22, 1, 0.36, 1] },
  });

  const swap = still
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  /* Named where it has a name, spelled out where it does not. */
  const episodeLabel = latestEpisode
    ? latestEpisode.title.startsWith("Episode ")
      ? `Chapter ${ORDINAL[Number(latestEpisode.episodeNumber)] ?? latestEpisode.episodeNumber}`
      : latestEpisode.title
    : "Things I Shouldn't Say";

  const choices: Choice[] = [
    {
      key: "music",
      label: "Listen to my music",
      hint: "The album, and the new single",
      art: ALBUM.cover,
      onClick: () => setScreen("music"),
    },
    {
      key: "series",
      label: "Watch my series",
      hint: `${episodeLabel} — free on YouTube`,
      /* Its own still, so the card shows the chapter it opens. */
      art: "/image/series/episode-02.jpg",
      href: latestEpisode?.watchHref ?? SERIES_LINKS.telegram,
      external: true,
    },
    {
      key: "support",
      label: "Support the project",
      hint: "Keep the series being made",
      art: "/image/series/alderwick-encounter.jpg",
      href: SERIES_LINKS.membership,
      external: true,
    },
    {
      key: "site",
      label: "Explore the website",
      hint: "All of Alderwick, and the music",
      art: "/image/series/alderwick-hall.jpg",
      onClick: close,
    },
    {
      key: "kit",
      label: "Media kit",
      hint: "For press and collaborators",
      art: LATEST_RELEASE.cover,
      /* A static folder, not a route — a full load is correct here. */
      href: "/media-kit/",
      external: false,
    },
  ];

  /* One card, one size. A fixed minimum rather than stretch, so the fifth
     can be centred in the last row without growing to fill it. */
  const cardClass =
    "group flex min-h-[112px] flex-col rounded-[4px] border border-gold/30 p-3 text-left " +
    "transition-colors duration-300 hover:border-gold/80 focus-visible:border-gold " +
    "focus-visible:outline-none";
  const cardStyle = {
    background: "linear-gradient(155deg, hsl(var(--burgundy)/0.45), hsl(var(--night)) 80%)",
  };

  const cardBody = (c: Choice) => (
    <>
      <img
        src={c.art}
        alt=""
        aria-hidden
        width={38}
        height={38}
        className="h-[38px] w-[38px] shrink-0 rounded-[2px] border border-gold/35 object-cover"
      />
      <span className="mt-2.5 block font-serif text-[13.5px] leading-[1.15] text-ivory transition-colors duration-300 group-hover:text-gold">
        {c.label}
      </span>
      <span className="mt-1 block font-sans text-[9.5px] font-light leading-snug text-ivory/55">
        {c.hint}
      </span>
    </>
  );

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
            initial={still ? { opacity: 0 } : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={still ? { opacity: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: still ? 0 : 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 left-0 right-0 mx-auto max-w-[430px] bg-night"
            style={{ boxShadow: "0 0 90px -20px hsl(var(--burgundy)/0.9)" }}
          >
            {/* Outside the scrolling area, so a short phone can scroll the
                invitation without the way out scrolling away with it. */}
            <motion.button
              {...rise(0.15)}
              type="button"
              onClick={close}
              className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center
                         rounded-full border border-ivory/25 bg-night/55 text-ivory
                         backdrop-blur-sm transition-colors duration-300 hover:border-gold
                         hover:text-gold focus-visible:border-gold focus-visible:text-gold
                         focus-visible:outline-none"
              aria-label="Close and continue to the site"
            >
              <X className="h-4 w-4" strokeWidth={1.6} />
            </motion.button>

            <div
              ref={dialogRef}
              tabIndex={-1}
              className="flex h-full flex-col overflow-y-auto outline-none"
            >
              {/* ── The plate ─────────────────────────────────────────── */}
              <div
                className="relative shrink-0 overflow-hidden transition-[height] duration-700"
                style={{ height: onMusic ? "24vh" : "38vh", minHeight: onMusic ? 150 : 240 }}
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

                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(60% 45% at 20% 10%, hsl(var(--gold)/0.20), transparent 62%)",
                  }}
                />
                {/* Warmth along the lower edge only; her face keeps its own. */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%]"
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
                  className="pointer-events-none absolute inset-x-0 top-0 h-24"
                  style={{ background: "linear-gradient(to bottom, hsl(var(--night)/0.72), transparent)" }}
                />

                <Glints still={still} />

                <motion.p
                  {...rise(0.3)}
                  className="absolute left-6 top-6 font-sans text-[9px] uppercase tracking-[0.36em] text-gold-glow"
                  style={{ textShadow: "0 1px 10px hsl(var(--night)/0.9)" }}
                >
                  An invitation · London
                </motion.p>

                <motion.div {...rise(0.45)} className="absolute inset-x-0 bottom-0 px-6 pb-5">
                  <h2
                    id={titleId}
                    className="font-serif text-[25px] leading-[1.06] text-ivory"
                    style={{ textShadow: "0 2px 22px hsl(var(--night)/0.85)" }}
                  >
                    {onMusic ? ALBUM.title : "A night inside my world"}
                  </h2>
                </motion.div>
              </div>

              <div className="relative h-0">
                <span aria-hidden className="absolute inset-x-0 -top-px h-px bg-gold/35" />
                <TicketEdge />
              </div>

              {/* ── The choosing ──────────────────────────────────────── */}
              <div className="flex-1 px-5 pb-7 pt-6">
                <AnimatePresence mode="wait">
                  {screen === "doors" ? (
                    <motion.div key="doors" {...swap} transition={{ duration: still ? 0 : 0.3 }}>
                      <motion.p
                        {...rise(0.55)}
                        id={descId}
                        className="text-center font-sans text-[11px] font-light leading-relaxed text-ivory/60"
                      >
                        Cinematic pop on one side, an old university with a
                        secret on the other.
                      </motion.p>

                      <div className="mt-4 grid grid-cols-2 gap-2.5">
                        {choices.map((c, i) => {
                          /* The odd one out keeps the others' width and sits
                             in the middle rather than stretching the row. */
                          const lone =
                            choices.length % 2 === 1 && i === choices.length - 1
                              ? "col-span-2 w-[calc(50%-0.3125rem)] justify-self-center"
                              : "";
                          const props = {
                            ...rise(0.66 + i * 0.07),
                            whileTap: still ? undefined : { scale: 0.97 },
                            className: `${cardClass} ${lone}`,
                            style: cardStyle,
                          };
                          return c.href ? (
                            <motion.a
                              key={c.key}
                              {...props}
                              href={c.href}
                              {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                              onClick={close}
                            >
                              {cardBody(c)}
                            </motion.a>
                          ) : (
                            <motion.button key={c.key} {...props} type="button" onClick={c.onClick}>
                              {cardBody(c)}
                            </motion.button>
                          );
                        })}
                      </div>
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
                        <button
                          type="button"
                          onClick={() => {
                            close();
                            navigate(ALBUM.route);
                          }}
                          className="relative ml-auto inline-flex min-h-11 items-center rounded-[3px]
                                     border border-gold/60 bg-gold/[0.1] px-4 font-sans text-[9.5px]
                                     uppercase tracking-[0.18em] text-gold transition-colors duration-300
                                     hover:bg-gold/25 focus-visible:bg-gold/25 focus-visible:outline-none"
                        >
                          Album page
                        </button>
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default MobileWelcome;

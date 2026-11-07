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

type Screen = "doors" | "music";

/** An arched plaque with a numeral — the door itself, small enough for a list. */
const Arch = ({ numeral }: { numeral: string }) => (
  <span
    aria-hidden
    className="relative flex h-14 w-10 shrink-0 items-end justify-center border border-gold/30
               bg-gradient-to-b from-gold/[0.07] to-transparent pb-2
               [border-radius:9999px_9999px_2px_2px]"
  >
    <span className="font-serif text-[13px] leading-none tracking-[0.1em] text-gold/80">
      {numeral}
    </span>
    <span className="absolute left-1/2 top-3 h-1 w-1 -translate-x-1/2 rotate-45 bg-gold/40" />
  </span>
);

/** One streaming address. Small, quiet, and large enough to hit with a thumb. */
const Platform = ({ name, url }: { name: string; url: string }) => (
  <a
    href={url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex min-h-11 items-center justify-center border border-ivory/12 bg-night/60 px-3
               text-center font-sans text-[10.5px] uppercase tracking-[0.16em] text-ivory/70
               transition-colors duration-300 hover:border-gold/45 hover:text-gold
               focus-visible:border-gold/60 focus-visible:text-gold focus-visible:outline-none"
  >
    {name}
  </a>
);

/**
 * The welcome, on phones only.
 *
 * Five doors rather than one offer: someone arriving from a reel wants the
 * music, someone from a press list wants the kit, and guessing wrong costs
 * the visit. Music opens a second screen instead of a link, because the album
 * is six addresses and a row of six chips under a headline is a worse answer
 * than a page of its own.
 *
 * It is modal — focus is trapped and the page behind it does not scroll —
 * which is the opposite of the new-episode popup. That one sits beside the
 * content; this one is the way in, and is dismissed in one tap.
 */
const MobileWelcome = () => {
  const [open, setOpen] = useState(false);
  const [screen, setScreen] = useState<Screen>("doors");
  /* `?welcome` previews it on any width. Without this the CSS guard below
     hides the very thing the flag exists to show, and it can only be looked
     at on a real phone. */
  const [forced, setForced] = useState(false);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  const latestEpisode = getLatestPublicRelease();

  /* Decide once, on mount. Resizing a desktop window narrow should not
     summon a welcome at someone already reading the page. */
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
    const timer = window.setTimeout(() => setOpen(true), reduceMotion ? 0 : 450);
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
    /* Focus the panel itself, not the close button: a screen reader should
       hear the invitation before it hears how to leave. */
    window.setTimeout(() => dialogRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown, true);
    };
  }, [open, close]);

  if (!open) return null;

  const fade = reduceMotion
    ? { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    : {
        initial: { opacity: 0, y: 14 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -10 },
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
      hint: latestEpisode
        ? `${latestEpisode.title} — out now`
        : "Things I Shouldn't Say",
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
    "group flex w-full items-center gap-4 border-b border-ivory/10 py-3.5 text-left " +
    "transition-colors duration-300 hover:border-gold/30 focus-visible:border-gold/50 " +
    "focus-visible:outline-none";

  const rowBody = (door: (typeof doors)[number]) => (
    <>
      <Arch numeral={door.numeral} />
      <span className="min-w-0 flex-1">
        <span className="block font-serif text-[15px] leading-tight text-ivory transition-colors duration-300 group-hover:text-gold">
          {door.label}
        </span>
        <span className="mt-1 block font-sans text-[11.5px] font-light leading-snug text-ivory/50">
          {door.hint}
        </span>
      </span>
      <span aria-hidden className="shrink-0 font-serif text-base text-gold/45 transition-transform duration-300 group-hover:translate-x-0.5">
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
        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-y-0 left-0 right-0 mx-auto flex max-w-[420px] flex-col
                   overflow-y-auto border-x border-gold/15 bg-charcoal/95 px-6 pb-10 pt-5 outline-none"
      >
        <button
          type="button"
          onClick={close}
          className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center
                     text-ivory/55 transition-colors duration-300 hover:text-gold
                     focus-visible:text-gold focus-visible:outline-none"
          aria-label="Close and continue to the site"
        >
          <X className="h-5 w-5" strokeWidth={1.4} />
        </button>

        <AnimatePresence mode="wait">
          {screen === "doors" ? (
            <motion.div key="doors" {...fade} transition={{ duration: reduceMotion ? 0 : 0.35 }}>
              <p className="mt-8 font-sans text-[10px] uppercase tracking-[0.3em] text-gold/70">
                You are invited
              </p>
              <h2 id={titleId} className="mt-3 font-serif text-[27px] leading-tight text-ivory">
                Choose your door
              </h2>
              <p id={descId} className="mt-2 max-w-[30ch] font-sans text-[12.5px] font-light leading-relaxed text-ivory/55">
                Cinematic pop on one side, an old university with a secret on
                the other. Pick whichever you came for.
              </p>

              <Ornament className="my-6" width="max-w-full" />

              <nav aria-label="Where would you like to go">
                {doors.map((door) =>
                  door.href ? (
                    <a
                      key={door.numeral}
                      href={door.href}
                      {...(door.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
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
            <motion.div key="music" {...fade} transition={{ duration: reduceMotion ? 0 : 0.35 }}>
              <button
                type="button"
                onClick={() => setScreen("doors")}
                className="mt-8 inline-flex min-h-11 items-center gap-2 font-sans text-[10px]
                           uppercase tracking-[0.26em] text-ivory/55 transition-colors
                           duration-300 hover:text-gold focus-visible:text-gold focus-visible:outline-none"
              >
                <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.4} />
                The doors
              </button>

              <h2 className="mt-4 font-serif text-[25px] leading-tight text-ivory">
                {ALBUM.title}
              </h2>
              <p className="mt-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-gold/70">
                The album
              </p>

              <div className="relative mt-5 flex items-center gap-4">
                {/* The record slides out from behind the sleeve, as it would
                    on a shelf. Still for anyone who asked for less motion. */}
                <motion.img
                  src={vinylRecord}
                  alt=""
                  aria-hidden
                  initial={reduceMotion ? false : { x: -18, rotate: -12, opacity: 0 }}
                  animate={{ x: 0, rotate: 0, opacity: 0.85 }}
                  transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.15 }}
                  className="absolute left-12 h-24 w-24 object-contain"
                />
                <img
                  src={ALBUM.cover}
                  alt={ALBUM.coverAlt}
                  width={96}
                  height={96}
                  className="relative h-24 w-24 shrink-0 border border-ivory/15 object-cover"
                />
                <Link
                  to={ALBUM.route}
                  onClick={close}
                  className="relative ml-auto inline-flex min-h-11 items-center border border-gold/50
                             px-4 font-sans text-[10px] uppercase tracking-[0.2em] text-gold
                             transition-colors duration-300 hover:bg-gold/10
                             focus-visible:bg-gold/10 focus-visible:outline-none"
                >
                  Album page
                </Link>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-2">
                {ALBUM.platforms.map((p) => (
                  <Platform key={p.name} name={p.name} url={p.url} />
                ))}
              </div>

              <Ornament className="my-7" width="max-w-full" />

              <h3 className="font-serif text-[21px] leading-tight text-ivory">
                {LATEST_RELEASE.title}
              </h3>
              <p className="mt-1.5 font-sans text-[11px] uppercase tracking-[0.2em] text-gold/70">
                The new {LATEST_RELEASE.kind.toLowerCase()}
              </p>

              <div className="mt-4 flex items-center gap-4">
                <img
                  src={LATEST_RELEASE.cover}
                  alt={LATEST_RELEASE.coverAlt}
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 border border-ivory/15 object-cover"
                />
                <p className="font-sans text-[12px] font-light leading-relaxed text-ivory/55">
                  {LATEST_RELEASE.blurb}
                </p>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {LATEST_RELEASE.platforms.map((p) => (
                  <Platform key={p.label} name={p.label} url={p.href} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MobileWelcome;

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import {
  EPISODE_POPUP,
  SERIES_ANCHOR_ID,
  SERIES_STILLS,
  getLatestPublicRelease,
  type PublicRelease,
} from "@/data/series";

type Dismissal = { releaseId: string; dismissedAt: number };

const DAY_MS = 24 * 60 * 60 * 1000;

/** Everything focusable inside the dialog, for the focus trap. */
const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Has this exact release already been dismissed, and is that dismissal still
 * inside its window? A different release always gets a fresh chance, so a new
 * episode re-announces itself even to someone who closed the last one.
 */
function isSilenced(release: PublicRelease): boolean {
  try {
    const raw = window.localStorage.getItem(EPISODE_POPUP.storageKey);
    if (!raw) return false;
    const saved = JSON.parse(raw) as Partial<Dismissal>;
    if (saved?.releaseId !== release.id || typeof saved.dismissedAt !== "number") return false;
    return Date.now() - saved.dismissedAt < EPISODE_POPUP.dismissDays * DAY_MS;
  } catch {
    // Private mode, disabled storage, corrupted value — just show it.
    return false;
  }
}

function silence(release: PublicRelease) {
  try {
    const payload: Dismissal = { releaseId: release.id, dismissedAt: Date.now() };
    window.localStorage.setItem(EPISODE_POPUP.storageKey, JSON.stringify(payload));
  } catch {
    /* Storage unavailable — the popup simply reappears next visit. */
  }
}

/** Embedded editor previews run the site in a cross-origin frame. */
function isEmbeddedPreview(): boolean {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
}

/**
 * Cinematic announcement for the newest publicly released episode of
 * "Things I Shouldn't Say".
 *
 * It appears once per release per visitor, waits for the homepage to settle
 * first, and is driven entirely by EPISODES in `@/data/series` — nothing here
 * needs editing when a chapter is added.
 */
const NewEpisodePopup = () => {
  const [release, setRelease] = useState<PublicRelease | null>(null);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const descId = useId();

  /* Decide whether to show it, then wait out the delay. */
  useEffect(() => {
    if (!EPISODE_POPUP.enabled) return;

    /** `?popup=1` previews it on demand, ignoring dismissal and the frame check. */
    const forced = new URLSearchParams(window.location.search).has("popup");
    if (!forced && isEmbeddedPreview()) return;

    const latest = getLatestPublicRelease();
    if (!latest || (!forced && isSilenced(latest))) return;

    /* Wait until the hero has actually been seen. A timer fired two seconds after

       load put a full-screen dialog over the first impression, which is the one

       thing the homepage cannot afford. Forced previews still show at once. */

    let timer = 0;

    const reveal = () => {

      restoreFocusTo.current = document.activeElement as HTMLElement | null;

      setRelease(latest);

      setOpen(true);

    };


    if (forced) {

      timer = window.setTimeout(reveal, 400);

      return () => window.clearTimeout(timer);

    }


    const onScroll = () => {

      if (window.scrollY < window.innerHeight * 0.75) return;

      window.removeEventListener("scroll", onScroll);

      timer = window.setTimeout(reveal, EPISODE_POPUP.delayMs);

    };

    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();


    return () => {

      window.removeEventListener("scroll", onScroll);

      window.clearTimeout(timer);

    };
  }, []);

  const close = useCallback(() => {
    if (release) silence(release);
    setOpen(false);
    restoreFocusTo.current?.focus?.();
  }, [release]);

  /* Escape to close, Tab trapped inside, background scroll locked. */
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

    /* The page stays scrollable and focus stays where the visitor left it: this

       is an announcement beside the content, not a gate in front of it. Trapping

       focus in something non-modal would strand keyboard users. */

    document.addEventListener("keydown", onKeyDown, true);


    return () => {

      document.removeEventListener("keydown", onKeyDown, true);

    };
  }, [open, close]);

  /** "Explore the series" stays on the page when the section is right here. */
  const onExplore = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      const target = document.getElementById(SERIES_ANCHOR_ID);
      if (!target) return; // Let the browser follow the real URL.
      event.preventDefault();
      close();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: Math.max(0, top), behavior: reduceMotion ? "auto" : "smooth" });
    },
    [close, reduceMotion]
  );

  const still = SERIES_STILLS[EPISODE_POPUP.still];

  if (!open || !release) return null;

  // Rendered without AnimatePresence on purpose: an exit animation left the
  // full-screen overlay mounted at opacity 0, silently swallowing every click
  // on the page behind it. Closing unmounts immediately instead.
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[120] flex justify-center p-3 sm:inset-x-auto sm:bottom-6 sm:right-6 sm:justify-end sm:p-0">
      <motion.div
        ref={dialogRef}
        role="complementary"
        aria-labelledby={titleId}
        aria-describedby={descId}
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto relative flex max-h-[78dvh] w-full max-w-[26rem] flex-col overflow-y-auto overscroll-contain border border-ivory/[0.14] bg-[hsl(var(--charcoal))] shadow-[0_40px_120px_-40px_hsl(0_0%_0%/0.95)] sm:max-w-[21rem]"
      >
          {/* Close */}
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close announcement"
            className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border border-ivory/20 bg-[hsl(0_0%_2%/0.65)] text-ivory/80 backdrop-blur-sm transition-colors duration-300 hover:border-gold/45 hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
          >
            <X className="h-4 w-4" strokeWidth={1.4} aria-hidden />
          </button>

          {/* Banner */}
          <div className="relative aspect-[21/9] w-full shrink-0 overflow-hidden">
            <img
              src={still.src}
              alt={still.alt}
              width={still.width}
              height={still.height}
              sizes="(min-width: 640px) 480px, 100vw"
              loading="eager"
              decoding="async"
              draggable={false}
              className="h-full w-full select-none object-cover object-top"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, hsl(var(--charcoal)) 2%, hsl(0 0% 2% / 0.45) 38%, transparent 72%)",
              }}
            />
            <span aria-hidden className="pointer-events-none absolute inset-[6px] border border-ivory/[0.1]" />
          </div>

          {/* Copy */}
          <div className="relative -mt-4 px-5 pb-6 sm:px-6 sm:pb-7">
            <p className="font-serif text-[9px] uppercase tracking-[0.32em] text-gold/75 sm:text-[10px] sm:tracking-[0.38em]">
              {EPISODE_POPUP.eyebrow}
            </p>

            <h2
              id={titleId}
              className="mt-3 font-serif text-[1.35rem] font-light uppercase leading-[1.08] tracking-[0.07em] text-ivory sm:text-[1.5rem]"
            >
              {EPISODE_POPUP.title}
            </h2>

            <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 border border-gold/45 bg-gold/[0.08] px-2.5 py-1.5 font-sans text-[9px] uppercase leading-none tracking-[0.24em] text-gold sm:text-[9.5px]">
                <span className="relative flex h-1.5 w-1.5 shrink-0" aria-hidden>
                  <span className="absolute inset-0 animate-ping rounded-full bg-gold/70 motion-reduce:animate-none" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-gold" />
                </span>
                {EPISODE_POPUP.badge}
              </span>
              <span className="font-serif text-[12.5px] uppercase tracking-[0.14em] text-ivory/85 sm:text-[13.5px]">
                {release.title}
              </span>
            </p>

            <p
              id={descId}
              className="mt-4 font-serif text-[0.98rem] font-light italic leading-snug text-ivory/70 sm:text-[1.05rem]"
            >
              &ldquo;{EPISODE_POPUP.description}&rdquo;
            </p>

            {release.availability ? (
              <p className="mt-3 font-sans text-[10.5px] uppercase tracking-[0.18em] text-gold/75">
                {release.availability}
              </p>
            ) : null}

            <a
              href={release.watchHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-6 flex min-h-12 w-full items-center justify-center border border-gold/70 bg-gold/[0.14] px-6 text-center font-sans text-[11px] uppercase tracking-[0.24em] text-gold shadow-[0_0_36px_-18px_hsl(var(--gold)/0.7)] transition-colors duration-500 hover:border-gold hover:bg-gold/25 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--charcoal))] sm:text-[12px]"
            >
              {EPISODE_POPUP.primaryCta.label}
            </a>

            <a
              href={EPISODE_POPUP.secondaryCta.href}
              onClick={onExplore}
              className="link-subtle mx-auto mt-5 block w-fit font-sans text-[10px] uppercase tracking-[0.24em] text-ivory/50 transition-colors duration-500 hover:text-ivory/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/50 sm:text-[10.5px]"
            >
              {EPISODE_POPUP.secondaryCta.label}
            </a>
          </div>
    </motion.div>
    </div>
  );
};

export default NewEpisodePopup;

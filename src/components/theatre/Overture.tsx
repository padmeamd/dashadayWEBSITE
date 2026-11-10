import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { OVERTURE, PLAYERS, STAGE } from "@/data/theatre";
import { SERIES_LINKS } from "@/data/series";

/**
 * SCENE ONE — the curtains open, and the bill is unrolled.
 *
 * One stage across the whole container, with four things living on it: the
 * painted backdrop, two velvet curtains, the three paper puppets, and the
 * title scroll hung above them.
 *
 * The curtains do double duty. They are the entrance — closed over the stage
 * on a first visit, then drawn aside — and they stay as the dressing, so the
 * opening and the hover are the same two pieces of cloth rather than two sets
 * that have to agree with each other. Only one panel was drawn; the other is
 * that panel mirrored, which is also how a real pair is made.
 *
 * The title is in the artwork, so the artwork is decorative and the real H1
 * sits beside it for screen readers and for search. Nothing on the page says
 * the title twice to a sighted reader.
 */

const SEEN = "tf-overture-seen";

/* Resting offsets for the open curtains, as a share of each panel's width.
   Closed is 0. */
const OPEN_X = 42;
const HOVER_X = 48;

/* Left to right across the stage, which is also the order they are read in.
   Dasha holds the centre because the society is the thing being asked for. */
const DOORS = [
  {
    id: "gregory",
    puppet: PLAYERS[1].puppet,
    href: "#chapters",
    label: "Watch the chapters",
    note: "Episodes one to five",
    external: false,
  },
  {
    id: "dasha",
    puppet: PLAYERS[0].puppet,
    href: SERIES_LINKS.membership,
    label: "Become a member",
    note: "Support the series",
    external: true,
  },
  {
    id: "theo",
    puppet: PLAYERS[2].puppet,
    href: "#alderwick",
    label: "Discover Alderwick",
    note: "The university and its secrets",
    external: false,
  },
] as const;

const Overture = () => {
  const reduced = useReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inView = useInView(scrollRef, { once: true, margin: "-80px" });

  // Assume the overture has played until we have looked, so the first paint
  // and the prerendered markup agree and the curtains cannot flash shut on a
  // repeat visit.
  const [drawn, setDrawn] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [lifted, setLifted] = useState<string | null>(null);
  const [replay, setReplay] = useState(0);

  useEffect(() => {
    const fit = () => {
      const header = document.querySelector("header");
      const reserve = stageRef.current?.closest("main")?.parentElement;
      if (!header || !reserve) return;
      const overhang =
        header.getBoundingClientRect().height -
        parseFloat(getComputedStyle(reserve).paddingTop || "0");
      document.documentElement.style.setProperty(
        "--tf-hero-offset",
        `${Math.max(0, Math.round(overhang))}px`,
      );
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  useEffect(() => {
    if (reduced) return;
    try {
      if (sessionStorage.getItem(SEEN)) return;
    } catch {
      // Private browsing refuses storage; play it and move on.
    }
    setDrawn(false);
  }, [reduced]);

  const open = useCallback(() => {
    setDrawn(true);
    try {
      sessionStorage.setItem(SEEN, "1");
    } catch {
      /* nothing to remember it with — it will simply play again */
    }
  }, []);

  useEffect(() => {
    if (drawn) return;
    const curtain = window.setTimeout(open, 2000);
    const skip = () => open();
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("touchstart", skip, { passive: true });
    return () => {
      window.clearTimeout(curtain);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
    };
  }, [drawn, open]);

  const parted = drawn ? (hovered ? HOVER_X : OPEN_X) : 0;
  const curtainMove = {
    duration: drawn ? 1.9 : 0,
    ease: [0.4, 0, 0.1, 1] as const,
  };

  /* The scroll unrolls once, when it first comes into view, and again on
     demand. `replay` is the key that restarts it. */
  const unrolled = reduced || (inView && true);

  return (
    <section className="relative px-0 pb-8 pt-[var(--tf-hero-offset,0px)] sm:pb-10">
      <div
        ref={stageRef}
        className="tf-proscenium relative mx-auto aspect-[16/10] w-full sm:aspect-[16/9]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => {
          setHovered(false);
          setLifted(null);
        }}
      >
        <img
          src={STAGE.candlelit.src}
          width={STAGE.candlelit.width}
          height={STAGE.candlelit.height}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* ── The company, as three ways in ───────────────────────────
            Each puppet is a door. Gregory stands left and leads to the
            chapters, Dasha holds the centre and leads to the society, Theo
            stands right and leads back into Alderwick.

            They are real links with real text under them, not hotspots on a
            picture: the label is what a screen reader announces and what a
            visitor on a touchscreen can read without hovering anything. */}
        {DOORS.map((door, i) => {
          const spot = [23, 50, 77][i];
          const up = lifted === door.id;
          return (
            <motion.div
              key={door.id}
              className="absolute bottom-[6%] z-10 flex h-[52%] flex-col items-center sm:h-[58%]"
              style={{ left: `${spot}%`, x: "-50%", transformOrigin: "50% 100%" }}
              animate={reduced ? undefined : { y: up ? -14 : 0, scale: up ? 1.05 : 1 }}
              transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <a
                href={door.href}
                {...(door.external
                  ? { target: "_blank", rel: "noreferrer noopener" }
                  : {})}
                onMouseEnter={() => setLifted(door.id)}
                onFocus={() => setLifted(door.id)}
                onBlur={() => setLifted(null)}
                className="tf-door flex h-full flex-col items-center justify-end"
              >
                <img
                  src={door.puppet.src}
                  width={door.puppet.width}
                  height={door.puppet.height}
                  alt=""
                  aria-hidden
                  className={`tf-puppet min-h-0 flex-1 w-auto object-contain ${
                    reduced ? "" : ["tf-sway", "tf-sway tf-sway--slow", "tf-sway tf-sway--fast"][i]
                  }`}
                  style={{
                    filter: "drop-shadow(0 18px 22px rgba(0,0,0,0.6))",
                    opacity: up ? 1 : 0.94,
                    transition: "opacity 0.45s ease",
                  }}
                />
                <span className="tf-door-plate mt-2">
                  <span className="tf-door-label">{door.label}</span>
                  {door.note && <span className="tf-door-note">{door.note}</span>}
                </span>
              </a>
            </motion.div>
          );
        })}

        {/* ── The title scroll ──────────────────────────────────────────
            Hung above the company. The rolled scroll and the open one are
            drawn on the same canvas, so the open one is uncovered by a mask
            growing out from the centre while the rolled one eases apart and
            fades — paper unrolling, not a card being flipped. */}
        <div
          ref={scrollRef}
          className="absolute inset-x-0 top-[5%] z-40 flex justify-center px-[6%]"
        >
          <button
            type="button"
            onClick={() => setReplay((n) => n + 1)}
            className="tf-scroll group relative block w-full max-w-[19rem] sm:max-w-[26rem] lg:max-w-[34rem]"
          >
            <span className="sr-only">Unroll the title scroll again</span>

            <motion.img
              key={`rolled-${replay}`}
              src={STAGE.scrollRolled.src}
              width={STAGE.scrollRolled.width}
              height={STAGE.scrollRolled.height}
              alt=""
              aria-hidden
              className="w-full"
              initial={reduced ? false : { opacity: 1, scaleX: 1 }}
              animate={unrolled ? { opacity: 0, scaleX: 1.04 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: reduced ? 0 : 0.85, ease: [0.3, 0, 0.2, 1] }}
            />

            <motion.div
              key={`open-${replay}`}
              aria-hidden
              className="absolute inset-0"
              initial={reduced ? false : { clipPath: "inset(0 50% 0 50%)" }}
              animate={
                unrolled
                  ? { clipPath: "inset(0 0% 0 0%)" }
                  : { clipPath: "inset(0 50% 0 50%)" }
              }
              transition={{ duration: reduced ? 0 : 1.25, ease: [0.22, 0.65, 0.2, 1] }}
            >
              <motion.img
                src={STAGE.scrollOpen.src}
                width={STAGE.scrollOpen.width}
                height={STAGE.scrollOpen.height}
                alt=""
                className="w-full"
                initial={reduced ? false : { opacity: 0.55 }}
                animate={unrolled ? { opacity: 1 } : { opacity: 0.55 }}
                transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 0.5 }}
              />
            </motion.div>
          </button>
        </div>

        {/* ── The curtains ──────────────────────────────────────────────
            Closed over everything on a first visit, then drawn to the sides,
            where they stay and breathe a little when the stage is pointed
            at. One drawn panel, mirrored for its pair. */}
        <motion.img
          src={STAGE.curtain.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-30 h-full w-[56%] object-cover object-right"
          initial={false}
          animate={{ x: `-${parted}%` }}
          transition={curtainMove}
        />
        <motion.img
          src={STAGE.curtain.src}
          alt=""
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-30 h-full w-[56%] object-cover object-right"
          style={{ scaleX: -1 }}
          initial={false}
          animate={{ x: `${parted}%` }}
          transition={curtainMove}
        />

        {!drawn && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20"
            style={{
              background:
                "radial-gradient(ellipse at 50% 72%, rgba(183,150,92,0.5), transparent 62%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1 }}
          />
        )}

        <div className="tf-footlight tf-flicker z-20" aria-hidden />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {!drawn && (
          <div className="mt-5 text-center">
            <button type="button" onClick={open} className="tf-button tf-button--quiet text-[0.72rem]">
              Skip the overture
            </button>
          </div>
        )}

        {/* The closing lines and the two ways on, standing on the plate
            rather than floating on the page below the stage. The artwork is
            3:1 with a plain damask field across its upper half; the type sits
            in that field, and object-cover lets the plate grow to whatever
            height the words and buttons come to without the ornament being
            stretched. */}
        <div className="relative mx-auto mt-8 max-w-4xl sm:mt-10">
          <img
            src={STAGE.plate.src}
            width={STAGE.plate.width}
            height={STAGE.plate.height}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full select-none object-cover"
            style={{ objectPosition: "center 26%" }}
          />

          <div className="relative px-6 py-10 text-center sm:px-12 sm:py-12">
            <p className="tf-label" style={{ color: "#f0dfc0" }}>
              A gothic fantasy series
            </p>
            {/* The title is painted into the scroll above the stage. This is
                the same words for anyone the picture does not reach. */}
            <h1 className="sr-only">{OVERTURE.title}</h1>
            <p
              className="tf-display mx-auto mt-4 max-w-xl text-lg italic sm:text-xl"
              style={{ color: "#f4e7cf" }}
            >
              {OVERTURE.line}
            </p>

            <div className="mt-6 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-6">
              <a href="#alderwick" className="tf-plate-btn tf-plate-btn--burgundy">
                Enter Alderwick
              </a>
              <a href="#chapters" className="tf-plate-btn tf-plate-btn--cream">
                Watch the series
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overture;

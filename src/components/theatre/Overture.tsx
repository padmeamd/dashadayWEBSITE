import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { OVERTURE, STAGE } from "@/data/theatre";
import { SERIES_LINKS } from "@/data/series";

/**
 * SCENE ONE — the curtains open.
 *
 * Two rules shape this. It plays once per session, not once per visit: an
 * entrance that cannot be got past is a door that sticks. And it is skippable
 * from the first frame, by click, by key, or by scrolling — a visitor who came
 * back for the episode links should not have to sit through the overture to
 * reach them.
 */

const SEEN = "tf-overture-seen";

const Overture = () => {
  const reduced = useReducedMotion();
  // Assume it has played until we have looked, so the server-rendered markup
  // and the first paint agree and the curtains cannot flash shut on a repeat
  // visit.
  const [drawn, setDrawn] = useState(true);

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

  // The title and buttons wait for the stage when the curtain is running, and
  // are simply there when it is not.
  const reveal = {
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay: drawn ? 0.15 : 1.5, ease: [0.2, 0.7, 0.2, 1] as const },
  };

  return (
    <section className="relative px-4 pb-12 pt-20 sm:px-8 sm:pb-16 sm:pt-24">
      <div className="mx-auto max-w-5xl">
        <div className="tf-proscenium aspect-[16/9] w-full">
          <img
            src={STAGE.candlelit.src}
            width={STAGE.candlelit.width}
            height={STAGE.candlelit.height}
            alt={STAGE.candlelit.alt}
            /* The stage is the first thing on the page; it is above the fold
               and wants no lazy hint. React 18 warns on the fetchPriority
               attribute either spelling, so it is simply left off. */
            className="h-full w-full object-cover"
          />
          <div className="tf-footlight tf-flicker" aria-hidden />

          {/* The curtains sit inside the frame, so they part across the stage
              rather than across the browser window. */}
          <AnimatePresence>
            {!drawn && (
              <>
                <motion.img
                  key="left"
                  src={STAGE.curtain.src}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute inset-y-0 left-0 h-full w-[58%] object-cover object-right"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: "-104%" }}
                  transition={{ duration: 1.9, ease: [0.4, 0, 0.1, 1] }}
                />
                <motion.img
                  key="right"
                  src={STAGE.curtain.src}
                  alt=""
                  aria-hidden
                  /* One panel was drawn; the other is the same cloth turned
                     over. Mirroring keeps the tassels facing outward. */
                  style={{ transform: "scaleX(-1)" }}
                  className="pointer-events-none absolute inset-y-0 right-0 h-full w-[58%] object-cover object-right"
                  initial={{ x: 0 }}
                  animate={{ x: 0 }}
                  exit={{ x: "104%" }}
                  transition={{ duration: 1.9, ease: [0.4, 0, 0.1, 1] }}
                />
                {/* Warm light behind the cloth, before it moves. */}
                <motion.div
                  key="glow"
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 72%, rgba(183,150,92,0.5), transparent 62%)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1 }}
                />
              </>
            )}
          </AnimatePresence>
        </div>

        {!drawn && (
          <div className="mt-5 text-center">
            <button type="button" onClick={open} className="tf-button tf-button--quiet text-[0.7rem]">
              Skip the overture
            </button>
          </div>
        )}

        <motion.div {...reveal} className="mt-12 text-center sm:mt-16">
          <p className="tf-label">A gothic fantasy series</p>
          <h1 className="tf-display mt-5 text-4xl uppercase leading-[1.08] tracking-[0.12em] sm:text-6xl">
            {OVERTURE.title}
          </h1>
          <p
            className="tf-display mx-auto mt-5 max-w-xl text-lg italic sm:text-xl"
            style={{ color: "var(--tf-ivory-soft)" }}
          >
            {OVERTURE.line}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <a href="#alderwick" className="tf-button w-full sm:w-auto">
              Enter Alderwick
            </a>
            <a href="#chapters" className="tf-button tf-button--quiet w-full sm:w-auto">
              Watch the series
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Overture;

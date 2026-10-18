import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import Crest from "./Crest";

/**
 * The invitation that opens the series page.
 *
 * Shown once. After a visitor opens it — or skips it — the choice is
 * remembered, so returning readers land straight on Alderwick. Anyone who has
 * asked for reduced motion never sees it at all: the sequence is decoration,
 * and the page behind it is the content.
 */
const SEEN_KEY = "alderwick:invitation";

const Invitation = () => {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState<"checking" | "sealed" | "opening" | "gone">("checking");
  const timer = useRef<number>();

  useEffect(() => {
    const seen = (() => {
      try {
        return window.localStorage.getItem(SEEN_KEY) === "1";
      } catch {
        return false; // private browsing: show it, remember nothing
      }
    })();
    setStage(seen || reduced ? "gone" : "sealed");
  }, [reduced]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const remember = () => {
    try {
      window.localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* nothing to remember it with; no harm done */
    }
  };

  const open = () => {
    remember();
    setStage("opening");
    timer.current = window.setTimeout(() => setStage("gone"), 1900);
  };

  const skip = () => {
    remember();
    setStage("gone");
  };

  if (stage === "checking" || stage === "gone") return null;

  return (
    <AnimatePresence>
      <motion.div
        key="invitation"
        className="alderwick fixed inset-0 z-[100] flex items-center justify-center px-6"
        style={{ background: "var(--aw-black)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        role="dialog"
        aria-modal="true"
        aria-label="Your invitation to Alderwick"
      >
        <span className="aw-dust" aria-hidden />

        <motion.div
          className="relative w-full max-w-md text-center"
          animate={stage === "opening" ? { scale: 1.08, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
        >
          {/* The envelope. Its flap lifts when the seal breaks. */}
          <div
            className="relative mx-auto aspect-[1.5/1] w-full overflow-hidden"
            style={{ background: "var(--aw-walnut)", border: "1px solid var(--aw-rule)" }}
          >
            <motion.div
              className="absolute inset-x-0 top-0 origin-top"
              style={{
                height: "62%",
                background: "linear-gradient(170deg, #2f2624 0%, #1b1514 100%)",
                borderBottom: "1px solid var(--aw-rule)",
                clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                // Decoration only: the flap sits over the seal and would
                // otherwise swallow the one click this screen asks for.
                pointerEvents: "none",
              }}
              animate={stage === "opening" ? { rotateX: -168 } : { rotateX: 0 }}
              transition={{ duration: 1.1, ease: [0.3, 0.8, 0.3, 1] }}
            />

            <Crest className="pointer-events-none absolute left-1/2 top-[18%] h-16 w-16 -translate-x-1/2 opacity-70" />

            {/* The wax seal: the thing you press. */}
            <motion.button
              type="button"
              onClick={open}
              aria-label="Break the seal and open your invitation"
              className="absolute left-1/2 top-[58%] z-10 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
              style={{
                background: "radial-gradient(circle at 36% 30%, #8a1a33 0%, #650f25 52%, #45091a 100%)",
                boxShadow: "0 10px 26px rgba(0,0,0,0.55), inset 0 2px 6px rgba(255,255,255,0.12)",
                outlineColor: "var(--aw-gold)",
              }}
              whileHover={stage === "sealed" ? { scale: 1.04 } : undefined}
              animate={
                stage === "opening"
                  ? { scale: [1, 1.12, 0.2], opacity: [1, 1, 0], rotate: [0, -8, -22] }
                  : {}
              }
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <Crest className="mx-auto h-12 w-12 opacity-80" />
            </motion.button>
          </div>

          <p
            className="aw-display mt-10 text-xl leading-relaxed sm:text-2xl"
            style={{ color: "var(--aw-ivory)" }}
          >
            Some invitations are better left unopened.
          </p>

          <button
            type="button"
            onClick={open}
            className="aw-label mt-7 border-b pb-1 transition-opacity hover:opacity-80"
            style={{ borderColor: "var(--aw-rule)" }}
          >
            Open your invitation
          </button>

          <div className="mt-6">
            <button
              type="button"
              onClick={skip}
              className="text-[11px] uppercase tracking-[0.2em]"
              style={{ color: "var(--aw-ivory-faint)" }}
            >
              Skip
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Invitation;

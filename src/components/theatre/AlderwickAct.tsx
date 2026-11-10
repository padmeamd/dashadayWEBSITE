import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Link } from "react-router-dom";

import Players from "@/components/theatre/Players";
import { STAGE } from "@/data/theatre";
import { SOCIETY_QUIZ_ROUTE } from "@/data/series";
import { VESPER_CLUES } from "@/data/alderwick";

/**
 * SCENE TWO — enter Alderwick.
 *
 * The diorama fills the whole container, as the stage above it does, and
 * everything that belongs to the scene stands inside it: the place, the
 * sentence that introduces it, and the sealed letter.
 *
 * Three layers of the same flat move at different rates, so scrolling reads
 * as walking into a paper model rather than sliding a picture about. Text
 * sits over the lower third, where a scrim holds it against the painted
 * stonework — the scenery is busy, and type laid straight onto it would be
 * decoration rather than something anyone could read.
 *
 * The seal is the letter itself, at the size of a thing you could pick up. It
 * is a real button with a real accessible name, and the clues it uncovers
 * leave the document entirely when it is shut.
 */

const AlderwickAct = () => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const cluesId = useId();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Back wall barely moves, the wings move most: the further away a flat is,
  // the less it should travel.
  const back = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.25]);


  return (
    <section
      id="alderwick"
      ref={ref}
      className="relative overflow-hidden px-4 pb-14 pt-12 sm:px-8 sm:pb-16 sm:pt-14"
      style={{ background: "var(--tf-black)" }}
    >
      {/* The scenery is the ground for the whole scene now, not a picture in
          a box above it: the introduction, the company and the letter all
          stand on it. It covers the section at whatever height the content
          comes to, anchored so the courtyard stays behind the type. */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.img
          src={STAGE.alderwick.src}
          width={STAGE.alderwick.width}
          height={STAGE.alderwick.height}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-[108%] w-full object-cover"
          style={reduced ? { y: 0 } : { y: back }}
        />
        {/* Enough to read small caps on painted stonework, little enough that
            the stonework is still there. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(rgba(14,11,9,0.88), rgba(14,11,9,0.8) 35%, rgba(14,11,9,0.86) 70%, rgba(14,11,9,0.94))",
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            opacity: reduced ? 0.22 : glow,
            background:
              "radial-gradient(ellipse at 50% 18%, rgba(183,150,92,0.4), transparent 60%)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* The company, with the introduction that explains them. */}
        <Players />

        {/* And the letter the university keeps, at the foot of the scene. */}
        <div className="mt-12 flex flex-col items-center text-center sm:mt-14">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={cluesId}
            className="tf-seal group block w-full max-w-[14rem] sm:max-w-[17rem]"
          >
            <span className="sr-only">
              {open
                ? "Close the letter from the Vesper Society"
                : "Break the seal on a letter from the Vesper Society"}
            </span>
            <motion.img
              src={STAGE.envelope.src}
              width={STAGE.envelope.width}
              height={STAGE.envelope.height}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="w-full"
              style={{ filter: "drop-shadow(0 16px 26px rgba(0,0,0,0.65))" }}
              animate={
                reduced
                  ? undefined
                  : { rotate: open ? -2 : -0.6, y: open ? -8 : 0, scale: open ? 1.03 : 1 }
              }
              transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1] }}
            />
            <span className="tf-label mt-3 block text-[0.72rem]" aria-hidden>
              {open ? "Seal the letter" : "Break the seal"}
            </span>
          </button>
        </div>
      </div>

      {/* The letter opens over the whole scene. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id={cluesId}
            key="clues"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-20 flex items-center justify-center px-5 sm:px-8"
            style={{
              background: "rgba(14,11,9,0.975)",
              backdropFilter: "blur(7px)",
              WebkitBackdropFilter: "blur(7px)",
            }}
          >
            <motion.div
              initial={reduced ? false : { y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.2, 0.7, 0.2, 1] }}
              className="w-full max-w-xl"
            >
              <p className="tf-label text-center">From the Vesper archive</p>
              <ul className="mt-6 space-y-5 text-left sm:mt-7">
                {VESPER_CLUES.map((clue) => (
                  <li
                    key={clue.id}
                    className="border-l pl-5"
                    style={{ borderColor: "var(--tf-gold-faint)" }}
                  >
                    <p className="tf-display text-[1.1rem] italic leading-[1.6] sm:text-[1.2rem]">
                      “{clue.inscription}”
                    </p>
                    <p
                      className="mt-2 text-[0.76rem] uppercase tracking-[0.14em]"
                      style={{ color: "var(--tf-ivory-faint)" }}
                    >
                      {clue.source}
                    </p>
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
                <Link to={SOCIETY_QUIZ_ROUTE} className="tf-button w-full sm:w-auto">
                  Discover your society
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="tf-button tf-button--quiet w-full text-[0.72rem] sm:w-auto"
                >
                  Seal the letter
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default AlderwickAct;

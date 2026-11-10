import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Link } from "react-router-dom";

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
  const mid = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.25]);

  const still = { y: 0 };

  return (
    <section
      id="alderwick"
      ref={ref}
      className="relative overflow-hidden px-0 pb-8 pt-10 sm:pb-10 sm:pt-12"
      style={{ background: "linear-gradient(var(--tf-black), #120f0c)" }}
    >
      <div className="tf-proscenium relative w-full">
        {/* Tall enough on a phone that the letter and the sentence are not
            fighting for the same few hundred pixels. */}
        <div className="relative aspect-[3/4] w-full sm:aspect-[16/10] lg:aspect-[16/9]">
          <motion.img
            src={STAGE.alderwick.src}
            width={STAGE.alderwick.width}
            height={STAGE.alderwick.height}
            alt={STAGE.alderwick.alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-[112%] w-full object-cover"
            style={reduced ? still : { y: back }}
          />
          {/* The same flat again, darkened and moving faster: the wings
              standing in front of the back wall. */}
          <motion.div
            aria-hidden
            className="absolute inset-0 h-[112%] w-full"
            style={{
              ...(reduced ? still : { y: mid }),
              backgroundImage: `url(${STAGE.alderwick.src})`,
              backgroundSize: "140% auto",
              backgroundPosition: "center 60%",
              maskImage: "linear-gradient(to top, black 22%, transparent 55%)",
              WebkitMaskImage: "linear-gradient(to top, black 22%, transparent 55%)",
              filter: "brightness(0.42) saturate(0.85)",
            }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              opacity: reduced ? 0.35 : glow,
              background:
                "radial-gradient(ellipse at 50% 84%, rgba(183,150,92,0.5), transparent 58%)",
              mixBlendMode: "screen",
            }}
          />

          {/* The scrim. Without it the sentence sits on carved stone and
              stops being a sentence. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(16,13,10,0.97) 8%, rgba(16,13,10,0.92) 30%, rgba(16,13,10,0.72) 52%, rgba(16,13,10,0.3) 72%, transparent 92%)",
            }}
          />

          {/* ── Everything the scene has to say, inside the scene ────── */}
          {/* The place and the sentence that introduces it have moved to the
              characters below, where they belong: they describe the three
              people standing there. What stays here is the scenery and the
              letter the university keeps. */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-5 pb-7 text-center sm:px-8 sm:pb-10">
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

          {/* The letter opens over the scene, as a sheet laid on the stage. */}
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
                /* Near-opaque and blurred. At 0.88 the sentence and the
                   envelope underneath read straight through the letter and
                   the two sets of words fought each other. */
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
                  {/* The letter ends where the reader can do something with
                      it: the archive already has a page that sorts a visitor
                      into one of the societies, and this is the moment they
                      would want it. The route is the existing one. */}
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

          <div className="tf-footlight tf-flicker" aria-hidden />
        </div>
      </div>
    </section>
  );
};

export default AlderwickAct;

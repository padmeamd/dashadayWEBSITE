import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import Crest from "@/components/alderwick/Crest";
import { ALDERWICK_ACT, STAGE } from "@/data/theatre";
import { VESPER_CLUES } from "@/data/alderwick";

/**
 * SCENE TWO — enter Alderwick.
 *
 * The university arrives as scenery rather than as a photograph: three layers
 * of the same diorama moving at different rates, so scrolling reads as walking
 * into a paper model rather than sliding a picture about.
 *
 * The Vesper seal is a real button, not a decorated div, because it does
 * something — and whatever can be clicked has to be reachable by keyboard.
 */

const AlderwickAct = () => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Back wall barely moves, the stage floor moves most: the further away a
  // flat is, the less it should travel.
  const back = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const mid = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.25, 0.55, 0.25]);

  const still = { y: 0 };

  return (
    <section
      id="alderwick"
      ref={ref}
      className="relative overflow-hidden px-4 py-24 sm:px-8 sm:py-32"
      style={{ background: "linear-gradient(var(--tf-black), #120f0c)" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="tf-proscenium aspect-[16/9] w-full">
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
          {/* The same flat again, darkened and moving faster, reads as the
              wings standing in front of the back wall. */}
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
                "radial-gradient(ellipse at 50% 84%, rgba(183,150,92,0.55), transparent 58%)",
              mixBlendMode: "screen",
            }}
          />
          <div className="tf-footlight tf-flicker" aria-hidden />
        </div>

        <div className="mx-auto mt-14 max-w-2xl text-center">
          <p className="tf-label">{ALDERWICK_ACT.place}</p>
          <h2 className="tf-display mt-6 text-2xl leading-[1.5] sm:text-[1.9rem]">
            {ALDERWICK_ACT.body}
          </h2>

          <div className="mt-12">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="vesper-clues"
              className="group inline-flex flex-col items-center gap-3"
            >
              <Crest
                className={`h-16 w-16 transition-opacity duration-500 ${
                  open ? "opacity-100" : "opacity-55 group-hover:opacity-90"
                }`}
              />
              <span className="tf-label text-[0.65rem]">
                {open ? "Seal the letter" : "Break the seal"}
              </span>
            </button>
          </div>

          <motion.div
            id="vesper-clues"
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.6, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden"
          >
            <ul className="mt-8 space-y-4 text-left">
              {VESPER_CLUES.map((clue) => (
                <li
                  key={clue.id}
                  className="border-l pl-5"
                  style={{ borderColor: "var(--tf-gold-faint)" }}
                >
                  <p className="tf-display text-[1.1rem] italic leading-[1.6]">
                    “{clue.inscription}”
                  </p>
                  <p
                    className="mt-2 text-[0.78rem] uppercase tracking-[0.16em]"
                    style={{ color: "var(--tf-ivory-faint)" }}
                  >
                    {clue.source}
                  </p>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AlderwickAct;

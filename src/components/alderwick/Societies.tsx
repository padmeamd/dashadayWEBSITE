import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { SOCIETIES } from "@/data/societies";
import { SOCIETY_QUIZ_ROUTE, societyRoute } from "@/data/series";

/**
 * The three societies, presented as a page from the university's registry.
 *
 * The crests are the artwork; everything written — names, mottoes, records —
 * is live text, so it can be read aloud, searched and corrected without
 * touching an image. The crests carry real transparency — alpha taken from
 * the engraving's own brightness, which is what "gold leaf on black" means
 * physically — so the same file sits correctly on black here and on each
 * society's own coloured ground.
 *
 * Each card opens that society's own page rather than a panel. A panel cannot
 * be linked to, shared, or indexed, and these entries are meant to be found.
 */

const Divider = ({ tint }: { tint: string }) => (
  <span aria-hidden className="mt-4 flex items-center justify-center gap-2">
    <span className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, ${tint})` }} />
    <span className="h-[5px] w-[5px] rotate-45" style={{ background: tint, opacity: 0.8 }} />
    <span className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, ${tint})` }} />
  </span>
);

const Societies = () => {
  const reduced = useReducedMotion();

  return (
    <section id="societies" className="relative px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="societies-title">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="aw-label">Alderwick University Archives</p>
          <h2 id="societies-title" className="aw-display mt-5 text-[clamp(2rem,5.5vw,3.4rem)] uppercase tracking-[0.06em]">
            The Societies of Alderwick
          </h2>
          <p className="aw-display mx-auto mt-4 max-w-2xl text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
            Three legacies. Three philosophies. One university built upon secrets.
          </p>
          <p className="mx-auto mt-7 max-w-2xl text-[0.98rem] leading-[1.85]" style={{ color: "var(--aw-ivory-soft)" }}>
            At Alderwick, belonging is never simply a matter of choice. Behind the university's
            ancient walls lie societies whose influence has shaped generations of scholars,
            artists, and visionaries. Each offers a different understanding of what it means to
            leave a mark upon the world. But some histories have been deliberately forgotten.
          </p>
        </motion.div>

        <ul className="mt-16 grid gap-14 sm:gap-10 lg:grid-cols-3">
          {SOCIETIES.map((society, n) => (
            <motion.li
              key={society.id}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              /* Unveiled one after another, the way a cloth comes off a frame. */
              transition={{ duration: 1, delay: reduced ? 0 : n * 0.22, ease: [0.2, 0.7, 0.2, 1] }}
              className="group text-center"
            >
              <Link
                to={societyRoute(society.slug)}
                className="block w-full no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8"
                style={{ outlineColor: society.palette.accent }}
              >
                <span className="relative mx-auto block w-full max-w-[20rem]">
                  <img
                    src={society.crest}
                    alt={`${society.name} — ${society.symbolDescription}`}
                    width={591}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-contain transition-[transform,filter] duration-700 ease-out group-hover:-translate-y-1.5 group-hover:brightness-[1.18] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                </span>

                <h3 className="aw-display mt-2 text-2xl">{society.name}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--aw-ivory-faint)" }}>
                  {society.identity}
                </p>

                <Divider tint={society.palette.accent} />

                <p
                  className="aw-display mx-auto mt-4 max-w-[22rem] text-base italic leading-relaxed"
                  style={{ color: "var(--aw-ivory-soft)" }}
                >
                  {society.motto}
                </p>

                <span className="aw-label mt-5 inline-block border-b pb-1" style={{ borderColor: `${society.palette.accent}55` }}>
                  Read the record
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* ── The invitation ─────────────────────────────────────────── */}
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9 }}
          className="mt-20 text-center"
        >
          <span aria-hidden className="aw-rule-ornament mx-auto max-w-sm">
            <span className="aw-diamond" />
          </span>

          <p className="aw-display mx-auto mt-8 max-w-xl text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
            Some are born to question. Some to create. Others to see what the world refuses to
            reveal.
          </p>

          <Link
            to={SOCIETY_QUIZ_ROUTE}
            className="aw-label aw-cta-solid mt-8 inline-block px-8 py-4 no-underline"
          >
            Discover your society
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Societies;

import { motion, useReducedMotion } from "framer-motion";

import { LOST_SOCIETIES, SOCIETIES } from "@/data/societies";

/**
 * THE MISSING FOUR.
 *
 * Four entries that are deliberately empty. No names, no histories, no
 * reasons — only the shape of the gap where a record should be, and the
 * catalogue's own notes about why it is not there.
 *
 * The temptation with a section like this is to fill it in. Inventing four
 * society names here would write canon the series has not written, and would
 * then have to be unwritten later.
 */

/** Seven points on a circle; three of them still joined. */
const SevenPoints = () => {
  const points = Array.from({ length: 7 }, (_, i) => {
    const angle = (i / 7) * Math.PI * 2 - Math.PI / 2;
    return { x: 60 + Math.cos(angle) * 42, y: 60 + Math.sin(angle) * 42, known: i < SOCIETIES.length };
  });

  return (
    <svg viewBox="0 0 120 120" aria-hidden focusable="false" className="mx-auto h-28 w-28">
      <circle cx="60" cy="60" r="42" fill="none" stroke="var(--aw-rule-faint)" strokeWidth="0.6" />
      {/* Only the surviving three are still connected to one another. */}
      <polygon
        points={points.filter((p) => p.known).map((p) => `${p.x},${p.y}`).join(" ")}
        fill="none"
        stroke="var(--aw-rule)"
        strokeWidth="0.7"
      />
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.known ? 3 : 2.2}
          fill={p.known ? "var(--aw-gold)" : "transparent"}
          stroke="var(--aw-rule)"
          strokeWidth="0.7"
          strokeDasharray={p.known ? undefined : "1.5 1.5"}
        />
      ))}
    </svg>
  );
};

const LostSocieties = () => {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative px-5 py-20 sm:px-8 sm:py-24"
      style={{ background: "var(--aw-walnut)" }}
      aria-labelledby="missing-title"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <SevenPoints />
          <p className="aw-label mt-6">Restricted holdings</p>
          <h2 id="missing-title" className="aw-display mt-4 text-[clamp(1.8rem,4.6vw,2.8rem)] uppercase tracking-[0.07em]">
            The Missing Four
          </h2>

          <div className="mx-auto mt-7 max-w-xl space-y-4 text-[0.98rem] leading-[1.85]" style={{ color: "var(--aw-ivory-soft)" }}>
            <p>
              According to fragments preserved in Alderwick's oldest archives, there were once
              seven societies.
            </p>
            <p>Only three remain in the university's recognised histories.</p>
            <p>What became of the others is a question few scholars have dared to answer.</p>
          </div>
        </motion.div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2">
          {LOST_SOCIETIES.map((entry, n) => (
            <motion.li
              key={entry.id}
              initial={reduced ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: reduced ? 0 : n * 0.12 }}
              className="group relative p-6"
              style={{ border: "1px solid var(--aw-rule-faint)", background: "rgba(10, 9, 9, 0.5)" }}
            >
              <p className="aw-label opacity-70">Society {entry.index}</p>

              {/* The name is gone from the record, not hidden behind a click. */}
              <p
                aria-label="Name struck from the record"
                className="mt-4 select-none text-2xl"
                style={{
                  fontFamily: "var(--aw-display)",
                  color: "transparent",
                  textShadow: "0 0 14px rgba(240, 233, 223, 0.42)",
                }}
              >
                ████████ ███████
              </p>

              <p className="mt-4 text-sm italic" style={{ color: "var(--aw-ivory-soft)" }}>
                {entry.note}
              </p>

              <p className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.24em]">
                <span style={{ color: "var(--aw-ivory-faint)" }}>{entry.archive}</span>
                <span style={{ color: "var(--aw-oxblood-bright, #9c3350)" }}>Record restricted</span>
              </p>
            </motion.li>
          ))}
        </ul>

        <motion.p
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="aw-display mt-14 text-center text-lg italic"
          style={{ color: "var(--aw-ivory-soft)" }}
        >
          Not everything forgotten is gone.
        </motion.p>
      </div>
    </section>
  );
};

export default LostSocieties;

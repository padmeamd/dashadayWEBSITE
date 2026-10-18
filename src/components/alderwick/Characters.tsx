import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { CHARACTERS, type Character } from "@/data/alderwick";

/**
 * The portrait corridor.
 *
 * Five frames hung the way a university hangs them: not in a neat row, but at
 * heights that make you walk past and look up. Dasha holds the centre because
 * the story is hers; the others step back from her by a few degrees.
 *
 * A frame with no biography written yet still opens — it shows the portrait and
 * says plainly that the record is unwritten, rather than inventing one.
 */

/** How far each frame hangs below the line, and how much room it takes. */
const HANGING: Record<string, string> = {
  dasha: "lg:col-span-4 lg:order-2 lg:mt-0",
  gregory: "lg:col-span-3 lg:order-1 lg:mt-16",
  theo: "lg:col-span-3 lg:order-3 lg:mt-10",
  sam: "lg:col-span-3 lg:order-4 lg:mt-24",
  mina: "lg:col-span-3 lg:order-5 lg:mt-6",
};

const Dossier = ({ person, onClose }: { person: Character; onClose: () => void }) => {
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<Element | null>(null);

  useEffect(() => {
    returnTo.current = document.activeElement;
    panel.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") return onClose();
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'button, [href], input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      (returnTo.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-4 py-10"
      style={{ background: "rgba(10, 9, 9, 0.93)" }}
      onClick={onClose}
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${person.id}-dossier-name`}
        onClick={(event) => event.stopPropagation()}
        className="aw-grain relative w-full max-w-3xl outline-none sm:grid sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
        style={{
          background: "linear-gradient(180deg, #221c1b 0%, #15110f 100%)",
          border: "1px solid var(--aw-rule)",
        }}
      >
        <img
          src={person.portrait}
          alt={`Portrait of ${person.name}`}
          width={848}
          height={1000}
          className="h-64 w-full object-cover object-[50%_22%] sm:h-full sm:object-[50%_25%]"
        />

        <div className="p-7 sm:p-9">
          <p className="aw-label">Alderwick University — {person.role}</p>
          <h3 id={`${person.id}-dossier-name`} className="aw-display mt-3 text-3xl">
            {person.name}
          </h3>

          {person.line && (
            <p className="aw-display mt-3 text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
              {person.line}
            </p>
          )}

          <span aria-hidden className="mt-5 flex items-center gap-2" style={{ color: "var(--aw-gold)" }}>
            <span className="h-px flex-1" style={{ background: "var(--aw-rule)" }} />
            <span className="aw-diamond" />
            <span className="h-px flex-1" style={{ background: "var(--aw-rule)" }} />
          </span>

          <p className="mt-5 text-sm leading-[1.85]" style={{ color: "var(--aw-ivory-soft)" }}>
            {person.dossier || "Her record has not yet been written into the archive."}
          </p>

          <button
            type="button"
            onClick={onClose}
            className="aw-label mt-8 border-b pb-1"
            style={{ borderColor: "var(--aw-rule)" }}
          >
            Close the record
          </button>
        </div>
      </div>
    </div>
  );
};

const Characters = () => {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<Character | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="people" className="relative px-5 py-20 sm:px-8 sm:py-28" aria-labelledby="people-title">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <p className="aw-label">Alderwick University</p>
          <h2 id="people-title" className="aw-display mt-5 text-[clamp(2rem,5.5vw,3.4rem)] uppercase tracking-[0.06em]">
            The People of Alderwick
          </h2>
          <p className="aw-display mx-auto mt-4 max-w-xl text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
            Everyone has a story. Not everyone tells the truth.
          </p>
        </motion.div>

        <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-10 lg:items-start lg:gap-7">
          {CHARACTERS.map((person, n) => (
            <motion.li
              key={person.id}
              initial={reduced ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.9, delay: reduced ? 0 : n * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              className={`group ${HANGING[person.id] ?? "lg:col-span-3"}`}
            >
              <button
                type="button"
                onClick={() => setOpen(person)}
                aria-haspopup="dialog"
                aria-label={`Open the record for ${person.name}`}
                className="block w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
                style={{ outlineColor: "var(--aw-gold)" }}
              >
                {/* The frame: a hairline that warms as you approach it. */}
                <span
                  className="relative block overflow-hidden transition-colors duration-700"
                  style={{ border: "1px solid var(--aw-rule-faint)" }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 z-10 border opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    style={{ borderColor: "rgba(165, 138, 104, 0.55)" }}
                  />
                  <img
                    src={person.portrait}
                    alt={`Portrait of ${person.name}`}
                    width={848}
                    height={1000}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[5/6] w-full object-cover object-[50%_20%] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.035] motion-reduce:transform-none motion-reduce:transition-none"
                  />
                  {/* Candlelight crossing the varnish. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                    style={{
                      background:
                        "linear-gradient(190deg, rgba(10,9,9,0) 35%, rgba(10,9,9,0.72) 100%)",
                    }}
                  />
                </span>

                <h3 className="aw-display mt-4 text-xl">{person.name}</h3>
                <p className="text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--aw-ivory-faint)" }}>
                  {person.role}
                </p>
                {person.line && (
                  <p
                    className="mt-2 text-sm italic opacity-80 transition-opacity duration-500 sm:opacity-0 sm:group-hover:opacity-100"
                    style={{ color: "var(--aw-ivory-soft)", fontFamily: "var(--aw-display)" }}
                  >
                    {person.line}
                  </p>
                )}
                <span className="aw-label mt-3 block opacity-55">Open the record</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {open && <Dossier person={open} onClose={close} />}
    </section>
  );
};

export default Characters;

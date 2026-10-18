import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { SOCIETIES, type Society } from "@/data/alderwick";

/**
 * The three societies, presented as a page from the university's registry.
 *
 * The crests are the artwork; everything written — names, mottoes, records —
 * is live text, so it can be read aloud, searched and corrected without
 * touching an image. The symbols sit on the same black as the section, which
 * is why they need no transparency: keying the black out would have eaten the
 * engraved lines where they meet the dark discs.
 */

const Divider = ({ tint }: { tint: string }) => (
  <span aria-hidden className="mt-4 flex items-center justify-center gap-2">
    <span className="h-px w-10" style={{ background: `linear-gradient(to right, transparent, ${tint})` }} />
    <span className="h-[5px] w-[5px] rotate-45" style={{ background: tint, opacity: 0.8 }} />
    <span className="h-px w-10" style={{ background: `linear-gradient(to left, transparent, ${tint})` }} />
  </span>
);

const Dossier = ({ society, onClose }: { society: Society; onClose: () => void }) => {
  const panel = useRef<HTMLDivElement>(null);
  const returnTo = useRef<Element | null>(null);
  const [secret, setSecret] = useState(false);

  useEffect(() => {
    returnTo.current = document.activeElement;
    panel.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;

      // Keep the tab ring inside the record while it is open.
      const focusable = panel.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      (returnTo.current as HTMLElement | null)?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto px-4 py-10"
      style={{ background: "rgba(10, 9, 9, 0.92)" }}
      onClick={onClose}
    >
      <div
        ref={panel}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${society.id}-name`}
        onClick={(event) => event.stopPropagation()}
        className="aw-grain relative w-full max-w-lg p-7 sm:p-10"
        style={{
          background: "linear-gradient(180deg, #221c1b 0%, #171312 100%)",
          border: `1px solid ${society.accent}55`,
          outline: "none",
        }}
      >
        <span aria-hidden className="pointer-events-none absolute inset-3 border" style={{ borderColor: `${society.accent}22` }} />

        <p className="aw-label text-center" style={{ color: society.accent }}>
          Alderwick University — Society Records
        </p>

        <img
          src={society.crest}
          alt=""
          aria-hidden
          width={591}
          height={600}
          className="mx-auto mt-6 block h-36 w-36 object-contain"
          style={{
            maskImage: "radial-gradient(circle at 50% 47%, #000 62%, transparent 78%)",
            WebkitMaskImage: "radial-gradient(circle at 50% 47%, #000 62%, transparent 78%)",
          }}
        />

        <h3 id={`${society.id}-name`} className="aw-display mt-5 text-center text-3xl">
          {society.name}
        </h3>
        <p className="aw-display mt-2 text-center text-base italic" style={{ color: "var(--aw-ivory-soft)" }}>
          {society.motto}
        </p>

        <Divider tint={society.accent} />

        {society.description.split("\n\n").map((paragraph) => (
          <p key={paragraph.slice(0, 24)} className="mt-4 text-sm leading-[1.8]" style={{ color: "var(--aw-ivory-soft)" }}>
            {paragraph}
          </p>
        ))}

        <p className="mt-6 text-[11px] uppercase tracking-[0.2em]" style={{ color: "var(--aw-ivory-faint)" }}>
          {society.archival}
        </p>

        {society.hidden && (
          <p className="mt-5 text-center">
            <button
              type="button"
              onClick={() => setSecret((open) => !open)}
              className="text-[11px] uppercase tracking-[0.24em] underline-offset-4 hover:underline"
              style={{ color: society.accent }}
              aria-expanded={secret}
            >
              {secret ? society.hidden : "Examine the symbol"}
            </button>
          </p>
        )}

        <div className="mt-8 text-center">
          <button type="button" onClick={onClose} className="aw-label border-b pb-1" style={{ borderColor: `${society.accent}55` }}>
            Close the record
          </button>
        </div>
      </div>
    </div>
  );
};

const Societies = () => {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState<Society | null>(null);
  const close = useCallback(() => setOpen(null), []);

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
            The Three Societies
          </h2>
          <p className="aw-display mx-auto mt-4 max-w-xl text-lg italic" style={{ color: "var(--aw-ivory-soft)" }}>
            Every mind has its place. Every society has its secrets.
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
              <button
                type="button"
                onClick={() => setOpen(society)}
                className="block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8"
                style={{ outlineColor: society.accent }}
                aria-haspopup="dialog"
                aria-label={`Open the record for ${society.name}`}
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
                    style={{
                      maskImage: "radial-gradient(circle at 50% 47%, #000 62%, transparent 78%)",
                      WebkitMaskImage: "radial-gradient(circle at 50% 47%, #000 62%, transparent 78%)",
                    }}
                  />
                  {/* Candlelight crossing the metal, not a glow behind it. */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 motion-reduce:transition-none"
                    style={{
                      background: `radial-gradient(60% 45% at 50% 38%, ${society.accent}22 0%, transparent 70%)`,
                    }}
                  />
                </span>

                <h3 className="aw-display mt-6 text-2xl uppercase tracking-[0.14em]">{society.name}</h3>
                <Divider tint={society.accent} />
                <span
                  className="mt-4 block text-sm italic opacity-70 transition-opacity duration-500 group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
                  style={{ color: "var(--aw-ivory-soft)", fontFamily: "var(--aw-display)" }}
                >
                  {society.motto}
                </span>
                <span className="aw-label mt-5 block opacity-60" style={{ color: society.accent }}>
                  Open the record
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>

      {open && <Dossier society={open} onClose={close} />}
    </section>
  );
};

export default Societies;

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { CLOSING, STAGE } from "@/data/theatre";
import { MEMBERSHIP, SERIES_LINKS } from "@/data/series";

/**
 * SCENE SIX — the secret invitation.
 *
 * A sealed envelope that opens into the letter. The terms inside are the real
 * ones from data/series.ts — the same price, the same benefits, the same two
 * addresses the rest of the site uses. An invitation that promises something
 * the membership does not give is worse than no invitation.
 *
 * The envelope is a button, and the letter is always in the document: closed,
 * it is hidden from everyone equally, so a screen reader is not read a letter
 * the page has not opened yet.
 */

const SealedLetter = () => {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <section
      id="invitation"
      className="relative px-4 py-14 text-center sm:px-8 sm:py-16"
      style={{ background: "linear-gradient(#15110e, var(--tf-black))" }}
    >
      <div className="mx-auto max-w-3xl">
        {/* The one place the blackletter is used: a single word, as a
            maker's mark. Any more of it and it stops being decoration. */}
        <p className="tf-gothic text-2xl" style={{ color: "var(--tf-gold)" }}>
          Vesper
        </p>
        <h2 className="tf-display mt-5 text-3xl uppercase tracking-[0.12em] sm:text-4xl">
          The secret invitation
        </h2>

        <div className="mt-14 min-h-[20rem]">
          <AnimatePresence mode="wait" initial={false}>
            {!open ? (
              <motion.button
                key="sealed"
                type="button"
                onClick={() => setOpen(true)}
                aria-expanded={false}
                className="group mx-auto block w-full max-w-md"
                initial={reduced ? false : { opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <img
                  src={STAGE.envelope.src}
                  width={STAGE.envelope.width}
                  height={STAGE.envelope.height}
                  alt={STAGE.envelope.alt}
                  loading="lazy"
                  decoding="async"
                  className="w-full transition-transform duration-700 group-hover:-translate-y-2 group-focus-visible:-translate-y-2"
                  style={{ filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.65))" }}
                />
                <span className="tf-label mt-7 block text-[0.65rem]">
                  Break the seal
                </span>
              </motion.button>
            ) : (
              <motion.div
                key="letter"
                initial={reduced ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.2, 0.7, 0.2, 1] }}
                className="mx-auto max-w-xl border px-7 py-10 text-left sm:px-10 sm:py-12"
                style={{
                  borderColor: "var(--tf-gold-faint)",
                  background:
                    "linear-gradient(rgba(233,221,198,0.06), rgba(87,33,45,0.1))",
                }}
              >
                <p className="tf-label text-center">{MEMBERSHIP.eyebrow}</p>
                <h3 className="tf-display mt-5 text-center text-2xl uppercase tracking-[0.14em]">
                  {MEMBERSHIP.heading}
                </h3>
                <p
                  className="tf-display mt-5 text-center text-lg italic"
                  style={{ color: "var(--tf-ivory-soft)" }}
                >
                  {MEMBERSHIP.quote}
                </p>

                <p
                  className="mt-7 text-[0.98rem] leading-[1.8]"
                  style={{ color: "var(--tf-ivory-soft)" }}
                >
                  {MEMBERSHIP.description}
                </p>

                <ul className="mt-7 space-y-3">
                  {MEMBERSHIP.benefits.map((benefit) => (
                    <li
                      key={benefit}
                      className="flex gap-3 text-[0.95rem] leading-[1.7]"
                      style={{ color: "var(--tf-ivory-soft)" }}
                    >
                      <span aria-hidden style={{ color: "var(--tf-gold)" }}>
                        ✦
                      </span>
                      {benefit}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a
                    href={SERIES_LINKS.membership}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tf-button flex-1"
                  >
                    Join the society
                    <ArrowUpRight className="h-4 w-4" aria-hidden />
                  </a>
                  <a
                    href={SERIES_LINKS.guide}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="tf-button tf-button--quiet flex-1"
                  >
                    Support the story
                  </a>
                </div>

                <p
                  className="mt-5 text-center text-[0.72rem] uppercase tracking-[0.18em]"
                  style={{ color: "var(--tf-ivory-faint)" }}
                >
                  {MEMBERSHIP.price} {MEMBERSHIP.priceInterval}
                </p>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="tf-label mx-auto mt-8 block text-[0.6rem] underline underline-offset-4"
                >
                  Fold the letter away
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-14">
          <p className="tf-display text-xl italic sm:text-2xl">{CLOSING.first}</p>
          <p
            className="tf-display mt-3 text-xl italic sm:text-2xl"
            style={{ color: "var(--tf-gold)" }}
          >
            {CLOSING.second}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SealedLetter;

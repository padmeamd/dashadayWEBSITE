import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/**
 * The last word on the page, aimed at the people who arrive for work rather
 * than for the music: press, brands, bookers.
 *
 * It deliberately does not repeat the social links — those sit directly above
 * in the listening strip, and a homepage that lists Instagram twice is the
 * sort of thing this reorganisation exists to stop.
 */

const CONTACT_INBOX = "dashadaymanagement@gmail.com";

const CollaborateSection = () => {
  const reduced = useReducedMotion();

  return (
    <section className="section-cinematic bg-night py-20 sm:py-28" aria-labelledby="collaborate-title">
      <div className="section-container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 id="collaborate-title" className="text-section-title text-editorial text-ivory/90">
            Let's create something extraordinary
          </h2>

          <p className="mx-auto mt-6 max-w-[62ch] text-[1.02rem] leading-[1.8] text-ivory/60">
            For press, brand partnerships, licensing, bookings and collaborations — the media kit
            has the figures and the formats, and the inbox is read by me.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/media-kit/"
              className="inline-flex items-center gap-2 border border-ivory/25 px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-ivory no-underline transition-colors hover:border-gold/60 hover:text-gold"
            >
              Media kit <ArrowUpRight size={13} aria-hidden />
            </a>
            <Link
              to="/contact"
              className="border border-ivory/25 px-7 py-3.5 font-sans text-[11px] uppercase tracking-[0.3em] text-ivory no-underline transition-colors hover:border-gold/60 hover:text-gold"
            >
              Business contact
            </Link>
          </div>

          <p className="mt-8 font-sans text-xs tracking-[0.18em] text-ivory/35">
            <a href={`mailto:${CONTACT_INBOX}`} className="no-underline transition-colors hover:text-ivory/70">
              {CONTACT_INBOX}
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborateSection;

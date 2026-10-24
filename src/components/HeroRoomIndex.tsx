import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { HERO_HOTSPOTS } from "@/data/heroHotspots";

/**
 * The room, as an index — the phone-sized counterpart to the hero's still life.
 *
 * On a 390px screen the six hotspot labels landed on top of the hero's own
 * copy: "Telephone — Contact" sat across the Watch the Series button, "Perfume
 * — Music" across Explore My Music, and "Predictions" ran out behind a candle.
 * Six floating labels cannot be read over a photograph that small, so the
 * photograph stays as the picture it is and the objects are listed here
 * instead: same objects, same destinations, one source of truth in
 * HERO_HOTSPOTS, but legible and with targets a thumb can hit.
 */
const HeroRoomIndex = () => {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative border-y border-ivory/[0.08] bg-[hsl(var(--charcoal))] lg:hidden"
      aria-labelledby="room-index-title"
    >
      <div className="shell band-tight">
        <h2
          id="room-index-title"
          className="font-serif text-[11px] uppercase tracking-[0.34em] text-gold/75"
        >
          The room
        </h2>
        <p className="mt-2 font-serif text-[1.05rem] font-light italic leading-snug text-ivory/60">
          Everything on the dressing table leads somewhere.
        </p>

        <ul className="mt-6">
          {HERO_HOTSPOTS.map((spot, i) => (
            <motion.li
              key={spot.id}
              initial={reduced ? false : { opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: reduced ? 0 : i * 0.06 }}
              className="border-t border-ivory/[0.1] first:border-t-0"
            >
              <Link
                to={spot.to}
                className="group flex min-h-[3.5rem] items-baseline justify-between gap-4 py-3 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <span className="font-serif text-[13.5px] uppercase tracking-[0.2em] text-ivory/90 transition-colors group-hover:text-gold">
                  {spot.objectLabel}
                </span>
                <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.24em] text-gold/70">
                  {spot.actionLabel}
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default HeroRoomIndex;

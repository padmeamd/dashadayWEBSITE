import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";

import { SERIES_ROUTE } from "@/data/series";

/**
 * Three doors.
 *
 * The homepage introduces; this is where it hands over. One image, one line,
 * one destination each — so a visitor who has scrolled this far can choose
 * what they came for instead of scrolling further hoping to find it.
 */

const DOORS = [
  {
    to: "/music",
    label: "Music",
    line: "Four records, from Things I Shouldn't Say back to Work of Art.",
    image: "/image/albums/tiss.webp",
  },
  {
    to: SERIES_ROUTE,
    label: "Series",
    line: "Alderwick University, 1890s. An original cinematic series.",
    image: "/image/og/series.jpg",
  },
  {
    to: "/dayd-media",
    label: "DAYD Media",
    line: "The studio behind the films, the campaigns and the worlds.",
    image: "/image/mainpic.webp",
  },
] as const;

const ExploreWorld = () => {
  const reduced = useReducedMotion();

  return (
    <section className="section-cinematic bg-night py-20 sm:py-28" aria-labelledby="explore-title">
      <div className="section-container">
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
        >
          <h2 id="explore-title" className="text-section-title text-editorial text-ivory/90">
            Explore my world
          </h2>
          <p className="mt-4 font-sans text-sm uppercase tracking-[0.25em] text-ivory/40">
            Three ways in
          </p>
        </motion.div>

        <ul className="mt-12 grid gap-6 sm:mt-16 sm:grid-cols-3">
          {DOORS.map((door, n) => (
            <motion.li
              key={door.to}
              initial={reduced ? false : { opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: reduced ? 0 : n * 0.12 }}
            >
              <Link to={door.to} className="group block no-underline">
                <span className="relative block aspect-[4/3] overflow-hidden">
                  <img
                    src={door.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transform-none"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 transition-colors duration-700 group-hover:bg-night/25"
                    style={{ background: "linear-gradient(180deg, hsl(350 28% 4% / 0.25) 0%, hsl(350 28% 4% / 0.72) 100%)" }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 border border-ivory/10 transition-colors duration-700 group-hover:border-gold/40"
                  />
                </span>

                <h3 className="mt-5 font-serif text-2xl text-ivory">{door.label}</h3>
                <p className="mt-2 max-w-[34ch] text-[0.95rem] leading-[1.7] text-ivory/55">{door.line}</p>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ExploreWorld;

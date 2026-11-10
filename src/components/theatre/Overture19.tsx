import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { OVERTURE_MUSIC, STAGE } from "@/data/theatre";
import { ALBUM } from "@/data/album";

/**
 * SCENE FIVE — the music behind the story.
 *
 * The gramophone keeps its own small stage. It does not play: nothing on this
 * page makes a sound without being asked, so the link goes where the record
 * already lives rather than starting it here.
 *
 * Addresses come from data/album.ts, which is the one place they are written
 * down — the /listen page reads the same six.
 */

const Overture19 = () => {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const drift = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  const spotify = ALBUM.platforms.find((p) => p.name === "Spotify")?.url ?? ALBUM.route;

  return (
    <section
      ref={ref}
      className="relative overflow-hidden px-4 py-14 sm:px-8 sm:py-16"
      style={{ background: "linear-gradient(var(--tf-black), #15110e)" }}
    >
      <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="tf-proscenium relative mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/5] overflow-hidden">
            <motion.img
              src={STAGE.gramophone.src}
              width={STAGE.gramophone.width}
              height={STAGE.gramophone.height}
              alt={STAGE.gramophone.alt}
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-[108%] w-full object-cover"
              style={reduced ? undefined : { y: drift }}
            />
            <div className="tf-footlight tf-flicker" aria-hidden />
          </div>
        </div>

        <div className="text-center lg:text-left">
          <p className="tf-label">The record</p>
          <h2 className="tf-display mt-5 text-3xl leading-[1.25] sm:text-[2.4rem]">
            {OVERTURE_MUSIC.heading}
          </h2>
          <p
            className="tf-display mt-6 text-lg italic leading-[1.7]"
            style={{ color: "var(--tf-ivory-soft)" }}
          >
            {OVERTURE_MUSIC.body}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:gap-4 lg:items-start lg:justify-start">
            <a
              href={spotify}
              target="_blank"
              rel="noreferrer noopener"
              className="tf-button w-full sm:w-auto"
            >
              Listen to the album
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
            <Link to={ALBUM.route} className="tf-button tf-button--quiet w-full sm:w-auto">
              All platforms
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Overture19;

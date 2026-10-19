import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

import Seo from "@/components/Seo";
import { SONGS } from "@/data/lyrics";

/** Group lines into stanzas; a blank line closes one. */
const stanzasOf = (lines: string[]) =>
  lines.reduce<string[][]>((acc, line) => {
    if (line === "") {
      if (acc[acc.length - 1]?.length) acc.push([]);
    } else {
      (acc[acc.length - 1] ??= []).push(line);
    }
    return acc;
  }, [[]]).filter((stanza) => stanza.length);

/**
 * The lyrics page.
 *
 * It was a "coming soon" placeholder while a full set of lyrics sat on the
 * homepage. The words live here now, where someone looking for them will
 * actually look.
 */
const Lyrics = () => {
  const reduced = useReducedMotion();

  return (
    <main className="min-h-screen bg-night">
      <Seo />

      <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <Link
          to="/music"
          className="inline-flex items-center gap-2 font-sans text-[11px] uppercase tracking-[0.3em] text-ivory/50 no-underline transition-colors hover:text-ivory"
        >
          <ArrowLeft size={13} aria-hidden /> Music
        </Link>

        <h1 className="mt-10 font-serif text-[clamp(2rem,6vw,3.2rem)] text-ivory">Lyrics</h1>

        {SONGS.map((song, n) => (
          <motion.section
            key={song.slug}
            id={song.slug}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-70px" }}
            transition={{ duration: 0.8, delay: reduced ? 0 : n * 0.08 }}
            className="mt-16"
          >
            <h2 className="font-serif text-2xl text-ivory sm:text-3xl">{song.title}</h2>
            <p className="mt-2 font-sans text-[11px] uppercase tracking-[0.26em] text-ivory/40">
              From {song.album}
            </p>

            <div className="mt-9 grid grid-cols-1 gap-x-12 gap-y-7 sm:grid-cols-2">
              {stanzasOf(song.lines).map((stanza, si) => (
                <div key={si} className="space-y-1.5">
                  {stanza.map((line, li) => (
                    <p key={li} className="font-serif text-[0.98rem] leading-[1.75] tracking-wide text-ivory/75">
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>
          </motion.section>
        ))}
      </div>
    </main>
  );
};

export default Lyrics;

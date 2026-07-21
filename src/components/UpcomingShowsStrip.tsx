import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Calendar, ArrowRight } from "lucide-react";

const SHOWS = [
  {
    id: "jul-30",
    dateNum: "30",
    month: "Jul",
    venue: "The Bread and Roses",
    city: "London",
  },
  {
    id: "aug-2",
    dateNum: "2",
    month: "Aug",
    venue: "Aces & Eights Saloon Bar",
    city: "London",
  },
];

const UpcomingShowsStrip = () => (
  <section className="relative z-10 py-8 sm:py-10 overflow-hidden">
    {/* Subtle red glow behind */}
    <div
      className="pointer-events-none absolute inset-0"
      style={{
        background:
          "linear-gradient(180deg, transparent 0%, hsl(350 35% 10% / 0.4) 30%, hsl(350 35% 10% / 0.4) 70%, transparent 100%)",
      }}
    />

    <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="flex items-center gap-3 mb-5"
      >
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[hsl(350_45%_40%/0.25)]" />
        <span className="text-[hsl(350_55%_60%)] text-[10px] tracking-[0.4em] uppercase font-light flex items-center gap-2">
          <Calendar className="w-3 h-3" />
          Upcoming Shows
        </span>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[hsl(350_45%_40%/0.25)]" />
      </motion.div>

      {/* Show rows */}
      <div className="space-y-2.5">
        {SHOWS.map((show, i) => (
          <motion.div
            key={show.id}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
          >
            <Link
              to="/live"
              className="group flex items-center gap-4 sm:gap-5 px-4 sm:px-5 py-3 sm:py-3.5 rounded border border-[hsl(350_40%_30%/0.2)] bg-[hsl(350_25%_12%/0.35)] backdrop-blur-sm transition-all duration-300 hover:border-[hsl(350_50%_45%/0.4)] hover:bg-[hsl(350_30%_15%/0.5)] hover:shadow-[0_0_20px_hsl(350_45%_35%/0.1)]"
            >
              {/* Date badge */}
              <div className="shrink-0 text-center w-12">
                <span className="block text-ivory/90 text-xl sm:text-2xl font-serif leading-none">
                  {show.dateNum}
                </span>
                <span className="block text-[hsl(350_50%_60%)] text-[9px] tracking-[0.2em] uppercase mt-0.5">
                  {show.month}
                </span>
              </div>

              {/* Divider */}
              <div className="shrink-0 w-px h-8 bg-[hsl(350_40%_40%/0.2)]" />

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-ivory/75 text-sm sm:text-base font-serif truncate group-hover:text-ivory transition-colors">
                  {show.venue}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <MapPin className="w-2.5 h-2.5 text-ivory/25" />
                  <span className="text-ivory/30 text-[11px] tracking-wider">
                    {show.city}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <ArrowRight className="shrink-0 w-4 h-4 text-ivory/20 group-hover:text-[hsl(350_55%_60%)] group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* See all button */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-5 text-center"
      >
        <Link
          to="/live"
          className="inline-flex items-center gap-2 border border-[hsl(350_45%_40%/0.3)] px-6 py-2.5 text-[11px] tracking-[0.25em] uppercase text-[hsl(350_55%_65%)] transition-all duration-400 hover:bg-[hsl(350_40%_20%/0.3)] hover:border-[hsl(350_55%_50%/0.45)] hover:text-[hsl(350_60%_72%)] hover:shadow-[0_0_25px_hsl(350_50%_40%/0.12)]"
        >
          See All Shows
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </motion.div>
    </div>
  </section>
);

export default UpcomingShowsStrip;

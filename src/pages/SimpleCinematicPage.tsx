import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";

type SimpleCinematicPageProps = {
  title: string;
  subtitle?: string;
};

const SimpleCinematicPage = ({ title, subtitle }: SimpleCinematicPageProps) => {
  return (
    <main className="bg-night min-h-screen relative overflow-hidden">
      <FilmGrain />
      <LightLeaksOverlay />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 py-12 text-center sm:px-8 sm:py-20 md:px-16 md:py-24">
        <Link
          to="/"
          className="absolute left-4 top-[max(1rem,env(safe-area-inset-top))] inline-flex min-h-11 items-center gap-3 text-ivory/50 transition-colors hover:text-ivory group sm:left-8 md:left-16"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm tracking-widest uppercase">Back</span>
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="text-section-title text-editorial-display text-ivory mb-4">{title}</h1>
          <div className="w-16 h-px bg-gold/40 mx-auto mb-8" />
          {subtitle ? (
            <p className="mx-auto max-w-md text-base leading-relaxed text-ivory/50 sm:text-lg">{subtitle}</p>
          ) : null}
        </motion.div>
      </div>
    </main>
  );
};

export default SimpleCinematicPage;

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
      <div className="relative z-10 min-h-screen px-8 md:px-16 py-24 flex flex-col items-center justify-center text-center">
        <Link
          to="/"
          className="absolute top-8 left-8 md:left-16 inline-flex items-center gap-3 text-ivory/50 hover:text-ivory transition-colors group"
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
            <p className="text-ivory/50 text-lg max-w-md mx-auto leading-relaxed">{subtitle}</p>
          ) : null}
        </motion.div>
      </div>
    </main>
  );
};

export default SimpleCinematicPage;

import { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import FilmGrain from "@/components/FilmGrain";
import LightLeaksOverlay from "@/components/LightLeaksOverlay";
import PredictionLetter from "@/components/PredictionLetter";
import { PREDICTIONS, pickNextPredictionIndex } from "@/data/predictions";

const Predictions = () => {
  const navigate = useNavigate();
  const reduced = Boolean(useReducedMotion());
  const [predictionIdx, setPredictionIdx] = useState(() => pickNextPredictionIndex(null));
  const lastIdxRef = useRef<number | null>(null);

  const onNext = useCallback(() => {
    const next = pickNextPredictionIndex(lastIdxRef.current ?? predictionIdx);
    lastIdxRef.current = next;
    setPredictionIdx(next);
  }, [predictionIdx]);

  const prediction = PREDICTIONS[predictionIdx];

  return (
    <main className="relative min-h-[100dvh] overflow-hidden bg-night">
      <FilmGrain />
      <LightLeaksOverlay />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-8 md:px-12"
        >
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-3 touch-manipulation text-ivory/50 transition-colors hover:text-ivory"
          >
            <ArrowLeft className="h-5 w-5" strokeWidth={1.25} />
            <span className="font-serif text-sm uppercase tracking-widest">Back</span>
          </Link>
        </motion.div>

        <PredictionLetter
          layout="page"
          prediction={prediction}
          open
          reduced={reduced}
          onNext={onNext}
          onClose={() => navigate("/")}
        />
      </div>
    </main>
  );
};

export default Predictions;

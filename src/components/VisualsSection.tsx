import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { X } from "lucide-react";
import heroImage from "@/assets/hero-dashaday.jpg";

const visuals = [
  { id: 1, aspect: "portrait", offset: "md:mt-0" },
  { id: 2, aspect: "landscape", offset: "md:mt-24" },
  { id: 3, aspect: "portrait", offset: "md:mt-12" },
  { id: 4, aspect: "square", offset: "md:mt-32" },
];

const VisualsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedVisual, setSelectedVisual] = useState<number | null>(null);

  return (
    <>
      <section
        id="visuals"
        ref={ref}
        className="section-cinematic bg-night py-32 md:py-48 min-h-screen"
      >
        <div className="container mx-auto px-8 md:px-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2 }}
            className="mb-20 md:mb-32"
          >
            <h2 className="text-section-title text-editorial text-ivory/90 mb-4">
              Visuals
            </h2>
            <p className="text-ivory/40 text-sm tracking-widest uppercase">
              Private archive
            </p>
          </motion.div>

          {/* Staggered asymmetric layout */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {visuals.map((visual, index) => (
              <motion.button
                key={visual.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.1 + index * 0.1 }}
                onClick={() => setSelectedVisual(visual.id)}
                className={`group relative overflow-hidden cursor-pointer ${visual.offset} ${
                  visual.aspect === "portrait"
                    ? "aspect-[3/4]"
                    : visual.aspect === "landscape"
                    ? "aspect-[4/3] col-span-2 md:col-span-1"
                    : "aspect-square"
                }`}
              >
                <motion.img
                  src={heroImage}
                  alt={`Visual ${visual.id}`}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1 }}
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-night/30 group-hover:bg-night/10 transition-all duration-700" />
                
                {/* Grain overlay on images */}
                <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedVisual && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-night/98 backdrop-blur-md"
          onClick={() => setSelectedVisual(null)}
        >
          <button
            onClick={() => setSelectedVisual(null)}
            className="absolute top-8 right-8 text-ivory/40 hover:text-ivory transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          <motion.img
            src={heroImage}
            alt="Visual"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-[90vw] max-h-[85vh] object-contain"
          />
        </motion.div>
      )}
    </>
  );
};

export default VisualsSection;

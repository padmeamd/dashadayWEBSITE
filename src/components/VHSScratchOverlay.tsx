import { motion } from "framer-motion";

const VHSScratchOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* Horizontal scratches */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute h-px bg-ivory/10"
          style={{
            width: `${Math.random() * 200 + 100}px`,
            top: `${Math.random() * 100}%`,
            left: `-200px`,
          }}
          animate={{
            x: ["0vw", "120vw"],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
      
      {/* Vertical scratches */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute w-px bg-ivory/5"
          style={{
            height: `${Math.random() * 150 + 50}px`,
            left: `${Math.random() * 100}%`,
            top: `-150px`,
          }}
          animate={{
            y: ["0vh", "120vh"],
          }}
          transition={{
            duration: Math.random() * 5 + 4,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "linear",
          }}
        />
      ))}

      {/* Flicker bands */}
      {[...Array(2)].map((_, i) => (
        <motion.div
          key={`band-${i}`}
          className="absolute left-0 right-0 bg-ivory/[0.02]"
          style={{
            height: `${Math.random() * 20 + 10}px`,
            top: `-30px`,
          }}
          animate={{
            y: ["0vh", "120vh"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 4 + Math.random() * 2,
            ease: "linear",
          }}
        />
      ))}

      {/* Random glitch lines */}
      <motion.div
        className="absolute left-0 right-0 h-0.5 bg-ivory/[0.03]"
        animate={{
          top: ["0%", "100%"],
          opacity: [0, 0.1, 0, 0.05, 0],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "linear",
        }}
      />
    </div>
  );
};

export default VHSScratchOverlay;

import { motion } from "framer-motion";

const LightLeaksOverlay = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {/* Warm light leak from top left */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,175,55,0.15) 0%, rgba(212,175,55,0.05) 40%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [1, 1.1, 1],
          x: [0, 30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Golden light leak from top right */}
      <motion.div
        className="absolute -top-1/3 -right-1/4 w-2/3 h-2/3 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(245,235,220,0.12) 0%, rgba(212,175,55,0.06) 30%, transparent 60%)",
          filter: "blur(80px)",
        }}
        animate={{
          opacity: [0.2, 0.5, 0.2],
          scale: [1.1, 1, 1.1],
          x: [0, -40, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Subtle amber glow bottom left */}
      <motion.div
        className="absolute -bottom-1/4 -left-1/3 w-1/2 h-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,200,100,0.1) 0%, rgba(212,175,55,0.04) 50%, transparent 70%)",
          filter: "blur(100px)",
        }}
        animate={{
          opacity: [0.15, 0.35, 0.15],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Champagne light leak right side */}
      <motion.div
        className="absolute top-1/4 -right-1/4 w-1/3 h-full rounded-full"
        style={{
          background: "linear-gradient(180deg, rgba(212,175,55,0.08) 0%, rgba(245,235,220,0.1) 50%, transparent 100%)",
          filter: "blur(70px)",
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
          x: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Soft flare overlay */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, rgba(212,175,55,0.03) 0%, transparent 50%)",
        }}
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default LightLeaksOverlay;

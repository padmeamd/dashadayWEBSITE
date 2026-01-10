import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroImage from "@/assets/hero-dashaday.jpg";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-night"
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <motion.img
          src={heroImage}
          alt="DashaDay"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="h-full w-full object-cover object-top"
        />
        {/* Depth overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-night/60 via-transparent to-night/60" />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-end pb-24 md:pb-32"
      >
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
          className="text-hero text-editorial-display text-ivory mb-4"
        >
          DashaDay
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 2, delay: 2.5 }}
          className="text-sm tracking-[0.4em] uppercase text-ivory-muted font-light"
        >
          music after midnight
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-ivory/40 to-transparent"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;

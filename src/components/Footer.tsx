import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import NewsletterSignup from "@/components/NewsletterSignup";

const Footer = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const socialLinks = [
    { label: "Instagram", href: "#" },
    { label: "TikTok", href: "#" },
    { label: "Spotify", href: "#" },
    { label: "Apple Music", href: "#" },
  ];

  return (
    <footer ref={ref} className="bg-night py-20 md:py-32">
      <div className="container mx-auto px-8 md:px-16">
        <NewsletterSignup />
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1.5 }}
          className="flex flex-col items-center text-center"
        >
          <h3 className="text-editorial-display text-3xl md:text-4xl text-ivory/90 mb-4">
            DashaDay
          </h3>
          <p className="text-ivory/30 text-xs tracking-[0.3em] uppercase mb-12">
            music after midnight
          </p>

          <div className="flex items-center gap-10 mb-16">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="link-subtle text-xs tracking-[0.2em] uppercase text-ivory/40 hover:text-ivory transition-colors duration-500"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="w-16 h-px bg-ivory/10 mb-8" />

          <p className="text-ivory/20 text-xs tracking-widest">
            © 2025 DashaDay. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

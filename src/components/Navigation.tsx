import { motion, useScroll, useTransform } from "framer-motion";

const Navigation = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 300], [0, 1]);
  const y = useTransform(scrollY, [100, 300], [-20, 0]);

  const navItems = [
    { label: "Music", href: "#music" },
    { label: "Lyrics", href: "#lyrics" },
    { label: "Visuals", href: "#visuals" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      style={{ opacity, y }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-16"
    >
      <a
        href="#"
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className="text-editorial text-sm tracking-[0.3em] text-ivory/80 hover:text-gold transition-colors duration-500"
      >
        DashaDay
      </a>

      <div className="flex items-center gap-10">
        {navItems.map((item) => (
          <button
            key={item.label}
            onClick={() => scrollToSection(item.href)}
            className="link-subtle text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-ivory transition-colors duration-500"
          >
            {item.label}
          </button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;

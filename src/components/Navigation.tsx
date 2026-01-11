import { motion, useScroll, useTransform } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [100, 300], [0, 1]);
  const y = useTransform(scrollY, [100, 300], [-20, 0]);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const navItems = [
    { label: "Music", href: "#music", isSection: true },
    { label: "Lyrics", href: "#lyrics", isSection: true },
    { label: "Visuals", href: "#visuals", isSection: true },
    { label: "DAYD Media", href: "/dayd-media", isSection: false },
    { label: "Contact", href: "/contact", isSection: false },
  ];

  const scrollToSection = (href: string) => {
    if (!isHomePage) {
      window.location.href = "/" + href;
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      style={isHomePage ? { opacity, y } : { opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6 md:px-16 bg-night/80 backdrop-blur-sm"
    >
      <Link
        to="/"
        className="text-editorial text-sm tracking-[0.3em] text-ivory/80 hover:text-gold transition-colors duration-500"
      >
        DashaDay
      </Link>

      <div className="flex items-center gap-6 md:gap-10">
        {navItems.map((item) => (
          item.isSection ? (
            <button
              key={item.label}
              onClick={() => scrollToSection(item.href)}
              className="link-subtle text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-ivory transition-colors duration-500 hidden md:block"
            >
              {item.label}
            </button>
          ) : (
            <Link
              key={item.label}
              to={item.href}
              className="link-subtle text-xs tracking-[0.2em] uppercase text-ivory/60 hover:text-ivory transition-colors duration-500"
            >
              {item.label}
            </Link>
          )
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;

import { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronRight, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";

import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";
import tourGorilla from "@/assets/tour-gorilla.jpg";
import tourLake from "@/assets/tour-lake.jpg";
import tourCulture from "@/assets/tour-culture.jpg";
import tourNyungwe from "@/assets/tour-nyungwe.jpg";
import tourAkagera from "@/assets/tour-akagera.jpg";
import tourTwinlakes from "@/assets/tour-twinlakes.jpg";
import academyLogo from "@/assets/academy-logo.jpg";
import img7 from "@/assets/img7.jpg";

interface SubLink {
  label: string;
  to: string;
  image: string;
}

interface NavItem {
  label: string;
  to: string;
  image: string;
  subLinks?: SubLink[];
}

const navLinks: NavItem[] = [
  { label: "Home", to: "/", image: hero1 },
  {
    label: "Destinations",
    to: "/destinations",
    image: hero2,
    subLinks: [
      { label: "Volcanoes National Park", to: "/destinations", image: tourGorilla },
      { label: "Akagera National Park", to: "/destinations", image: tourAkagera },
      { label: "Nyungwe Forest", to: "/destinations", image: tourNyungwe },
      { label: "Lake Kivu", to: "/destinations", image: tourLake },
      { label: "Twin Lakes", to: "/destinations", image: tourTwinlakes },
      { label: "Kigali City", to: "/destinations", image: tourCulture },
    ],
  },
  {
    label: "Tour Packages",
    to: "/tours",
    image: tourGorilla,
    subLinks: [
      { label: "Gorilla Trekking", to: "/tours/gorilla-trekking", image: tourGorilla },
      { label: "Lake Kivu Retreat", to: "/tours/lake-kivu-retreat", image: tourLake },
      { label: "Nyungwe Forest Explorer", to: "/tours/nyungwe-forest", image: tourNyungwe },
      { label: "Akagera Safari", to: "/tours/akagera-safari", image: tourAkagera },
      { label: "Cultural Rwanda", to: "/tours/cultural-rwanda", image: tourCulture },
      { label: "Twin Lakes Discovery", to: "/tours/twin-lakes", image: tourTwinlakes },
    ],
  },
  {
    label: "Our Academy",
    to: "/academy",
    image: academyLogo,
    subLinks: [
      { label: "Candidat Libre Programs", to: "/academy", image: img7 },
      { label: "Tourism Internship", to: "/academy", image: hero4 },
    ],
  },
  { label: "Gallery", to: "/gallery", image: tourLake },
  { label: "About Us", to: "/about", image: tourCulture },
  { label: "Contact", to: "/contact", image: hero4 },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredSub, setHoveredSub] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState(hero1);
  const [previewLabel, setPreviewLabel] = useState("Bright Horizon");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setActiveIndex(null);
    setHoveredSub(null);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
      document.body.style.top = "";
    };
  }, [open]);

  const updatePreview = useCallback((image: string, label: string) => {
    setPreviewImage(image);
    setPreviewLabel(label);
  }, []);

  const activeItem = activeIndex !== null ? navLinks[activeIndex] : null;

  const handleMainHover = (i: number) => {
    setActiveIndex(i);
    setHoveredSub(null);
    updatePreview(navLinks[i].image, navLinks[i].label);
  };

  const handleSubHover = (si: number) => {
    setHoveredSub(si);
    if (activeItem?.subLinks?.[si]) {
      updatePreview(activeItem.subLinks[si].image, activeItem.subLinks[si].label);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setActiveIndex(null);
    setHoveredSub(null);
  };

  const handleNavClick = (link: NavItem, i: number) => {
    if (link.subLinks) {
      setActiveIndex(activeIndex === i ? null : i);
      setHoveredSub(null);
    } else {
      handleClose();
      navigate(link.to);
    }
  };

  return (
    <>
      {/* HEADER BAR - always visible */}
      <header
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled && !open
            ? "bg-section-dark/90 backdrop-blur-xl shadow-lg"
            : open
            ? "bg-transparent"
            : "bg-section-dark/20 backdrop-blur-sm"
        }`}
      >
        <nav className="container mx-auto flex items-center justify-between px-6 py-3">
          <button
            onClick={() => {
              if (open) handleClose();
              else { setOpen(true); setActiveIndex(null); setHoveredSub(null); }
            }}
            className="flex items-center gap-2.5 text-primary-foreground/90 hover:text-primary transition-colors relative z-[110]"
            aria-label="Toggle menu"
          >
            <span className="w-11 h-11 rounded-full border-2 border-primary-foreground/50 flex items-center justify-center bg-section-dark/40 backdrop-blur-sm">
              {open ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
            </span>
            <span className="font-body text-xs tracking-[0.3em] uppercase hidden sm:inline font-semibold">
              {open ? "Close" : "Menu"}
            </span>
          </button>

          <Link to="/" className="absolute left-1/2 -translate-x-1/2 z-[110]" onClick={handleClose}>
            <img
              src={logo}
              alt="Bright Horizon Travel & Tours"
              className="h-14 w-auto object-contain drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
            />
          </Link>

          <Link
            to="/tours"
            onClick={handleClose}
            className="px-5 py-2.5 rounded border border-primary bg-primary text-primary-foreground font-body text-xs font-bold tracking-[0.2em] uppercase hover:bg-accent transition-colors relative z-[110]"
          >
            Enquire Now
          </Link>
        </nav>
      </header>

      {/* FULL-SCREEN OVERLAY MENU – reduced height/padding */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[99] bg-[hsl(160,30%,4%)] overflow-hidden"
          >
            <div className="h-full flex flex-col pt-16"> {/* ← reduced from pt-20 */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden">
                <div className="container mx-auto px-6 py-6 lg:py-10"> {/* ← reduced padding */}
                  <div className="flex flex-col lg:flex-row gap-0 min-h-[55vh]"> {/* ← reduced from 60vh */}
                    
                    {/* LEFT COLUMN: Main navigation links */}
                    <div className="w-full lg:w-[280px] lg:flex-shrink-0 lg:border-r lg:border-primary-foreground/10 lg:pr-8">
                      <ul>
                        {navLinks.map((link, i) => (
                          <motion.li
                            key={link.label}
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                          >
                            <button
                              onClick={() => handleNavClick(link, i)}
                              onMouseEnter={() => handleMainHover(i)}
                              className={`w-full flex items-center justify-between py-4 border-b border-primary-foreground/8 font-body text-[13px] tracking-[0.3em] uppercase transition-all duration-300 text-left group ${
                                activeIndex === i
                                  ? "text-primary font-bold border-b-primary/50"
                                  : "text-primary-foreground/70 hover:text-primary-foreground"
                              }`}
                            >
                              <span>{link.label}</span>
                              {link.subLinks && (
                                <ArrowRight
                                  size={16}
                                  className={`transition-all duration-300 ${
                                    activeIndex === i 
                                      ? "text-primary translate-x-1" 
                                      : "text-primary-foreground/20 group-hover:text-primary-foreground/40"
                                  }`}
                                />
                              )}
                            </button>

                            <AnimatePresence>
                              {activeIndex === i && link.subLinks && (
                                <motion.ul
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="overflow-hidden lg:hidden pl-4 bg-primary-foreground/3"
                                >
                                  {link.subLinks.map((sub, si) => (
                                    <li key={si}>
                                      <Link
                                        to={sub.to}
                                        onClick={handleClose}
                                        className="block py-3 font-body text-xs tracking-[0.2em] uppercase text-primary-foreground/50 hover:text-primary transition-colors"
                                      >
                                        {sub.label}
                                      </Link>
                                    </li>
                                  ))}
                                  <li>
                                    <Link
                                      to={link.to}
                                      onClick={handleClose}
                                      className="inline-flex items-center gap-1.5 py-3 font-body text-xs tracking-[0.2em] uppercase text-primary hover:text-accent transition-colors font-semibold"
                                    >
                                      Explore All <ChevronRight size={12} />
                                    </Link>
                                  </li>
                                </motion.ul>
                              )}
                            </AnimatePresence>
                          </motion.li>
                        ))}
                      </ul>

                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-8 pt-6 border-t border-primary-foreground/8 space-y-2 lg:hidden"
                      >
                        <p className="font-body text-[10px] tracking-[0.3em] uppercase text-primary mb-3 font-bold">Contact</p>
                        <p className="font-body text-sm text-primary-foreground/40">info@brighthorizon.rw</p>
                        <p className="font-body text-sm text-primary-foreground/40">+250 788 000 000</p>
                      </motion.div>
                    </div>

                    {/* MIDDLE COLUMN: Sub-links (desktop only) */}
                    <div className="hidden lg:block lg:w-[300px] lg:flex-shrink-0 lg:pl-10 lg:pr-8">
                      <AnimatePresence mode="wait">
                        {activeItem?.subLinks ? (
                          <motion.div
                            key={`sub-${activeIndex}`}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            transition={{ duration: 0.25 }}
                          >
                            <ul>
                              {activeItem.subLinks.map((sub, si) => (
                                <motion.li
                                  key={`${sub.label}-${si}`}
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: si * 0.04 }}
                                >
                                  <Link
                                    to={sub.to}
                                    onClick={handleClose}
                                    onMouseEnter={() => handleSubHover(si)}
                                    onMouseLeave={() => setHoveredSub(null)}
                                    className={`block py-3.5 border-b border-primary-foreground/8 font-body text-[13px] tracking-[0.2em] uppercase transition-all duration-200 ${
                                      hoveredSub === si
                                        ? "text-primary-foreground font-semibold border-b-primary-foreground/30"
                                        : "text-primary-foreground/50 hover:text-primary-foreground/80"
                                    }`}
                                  >
                                    {sub.label}
                                  </Link>
                                </motion.li>
                              ))}
                            </ul>

                            <Link
                              to={activeItem.to}
                              onClick={handleClose}
                              className="mt-8 inline-flex items-center gap-2 px-6 py-3 border border-primary-foreground/20 text-primary-foreground/80 font-body text-xs tracking-[0.25em] uppercase hover:border-primary hover:text-primary transition-all duration-300"
                            >
                              Explore {activeItem.label}
                              <ChevronRight size={14} />
                            </Link>
                          </motion.div>
                        ) : activeItem ? (
                          <motion.div
                            key={`no-sub-${activeIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="pt-4"
                          >
                            <Link
                              to={activeItem.to}
                              onClick={handleClose}
                              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary font-body text-xs tracking-[0.25em] uppercase hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                            >
                              Go to {activeItem.label}
                              <ArrowRight size={14} />
                            </Link>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>

                    {/* RIGHT COLUMN: Preview image (desktop only) */}
                    <div className="hidden lg:flex flex-1 items-start justify-end pl-8">
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="relative w-full max-w-[400px] aspect-[4/5] rounded-xl overflow-hidden"
                      >
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={previewImage}
                            src={previewImage}
                            alt="Preview"
                            initial={{ opacity: 0, scale: 1.08 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(160,30%,4%)] via-transparent to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-5">
                          <div className="flex items-center gap-3">
                            <span className="w-9 h-9 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                              <ArrowRight size={15} className="text-primary-foreground" />
                            </span>
                            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary-foreground font-bold">
                              {previewLabel}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0 py-4 text-center border-t border-primary-foreground/5">
                <p className="font-body text-[10px] text-primary-foreground/20 italic tracking-[0.3em] uppercase">
                  "Expanding Your World, One Journey at a Time."
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
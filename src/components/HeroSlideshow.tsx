import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

const slides = [
  { image: hero1, subtitle: "Land of a Thousand Hills", title: "Discover Rwanda's\nUntamed Beauty" },
  { image: hero2, subtitle: "Breathtaking Sunsets", title: "Lake Kivu\nAwaits You" },
  { image: hero3, subtitle: "Wildlife Encounters", title: "Meet the Gentle\nGiants" },
  { image: hero4, subtitle: "Adventure Awaits", title: "Walk Above\nthe Canopy" },
];

const HeroSlideshow = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="h-full w-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 hero-overlay" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-2xl"
            >
              <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
                {slides[current].subtitle}
              </p>
              <h1 className="font-display text-5xl md:text-7xl font-medium leading-tight text-primary-foreground whitespace-pre-line mb-8">
                {slides[current].title}
              </h1>
              <div className="flex gap-4 flex-wrap">
                <Link
                  to="/tours"
                  className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors"
                >
                  Explore Tours
                </Link>
                <Link
                  to="/tours"
                  className="px-8 py-3.5 rounded-lg glass text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-primary/20 transition-colors"
                >
                  Plan Your Trip
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Slide indicators */}
          <div className="absolute bottom-10 left-6 flex gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current ? "w-10 bg-primary" : "w-4 bg-primary-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSlideshow;

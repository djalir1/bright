import { motion } from "framer-motion";
import TourCard from "./TourCard";
import { tours } from "@/data/tours";
import { Link } from "react-router-dom";
import hero1 from "@/assets/hero-1.jpg";

const FeaturedTours = () => {
  const featured = tours.slice(0, 3);

  return (
    <section className="relative py-24 overflow-hidden">
      {/* Blurred scenic background */}
      <div className="absolute inset-0">
        <img src={hero1} alt="" className="h-full w-full object-cover blur-sm scale-105" />
        <div className="absolute inset-0 bg-section-dark/80" />
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">
            Our Experiences
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-primary-foreground">
            Popular Tour Packages
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {featured.map((tour, i) => (
            <TourCard key={tour.id} tour={tour} index={i} />
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/tours"
            className="inline-flex px-8 py-3.5 rounded-lg glass text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-primary/20 transition-colors"
          >
            View All Tours
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTours;

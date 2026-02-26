import { Link } from "react-router-dom";
import { MapPin, Clock, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { Tour } from "@/data/tours";

const TourCard = ({ tour, index = 0 }: { tour: Tour; index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group relative w-full max-w-[360px] mx-auto rounded-xl overflow-hidden"
      style={{ height: "480px" }}
    >
      {/* Image - top 60% */}
      <div className="relative h-[60%] overflow-hidden">
        <img
          src={tour.image}
          alt={tour.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-section-dark/60" />
      </div>

      {/* Glass content - bottom 40% */}
      <div className="absolute bottom-0 left-0 right-0 h-[42%] glass-dark rounded-t-2xl p-5 flex flex-col justify-between">
        <div>
          <h3 className="font-display text-xl font-semibold text-primary-foreground mb-1.5">
            {tour.name}
          </h3>
          <p className="font-body text-xs text-primary-foreground/70 leading-relaxed line-clamp-2 mb-3">
            {tour.shortDescription}
          </p>
          <div className="flex flex-wrap gap-3 text-primary-foreground/60">
            <span className="flex items-center gap-1 text-xs font-body">
              <Clock size={13} /> {tour.duration}
            </span>
            <span className="flex items-center gap-1 text-xs font-body">
              <MapPin size={13} /> {tour.location}
            </span>
            <span className="flex items-center gap-1 text-xs font-body">
              <Users size={13} /> Max {tour.maxPeople}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="font-display text-lg text-primary font-semibold">
            ${tour.price}
            <span className="text-xs text-primary-foreground/50 font-body font-normal"> /person</span>
          </span>
          <Link
            to={`/tours/${tour.slug}`}
            className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-body font-semibold tracking-wider uppercase hover:bg-accent transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TourCard;

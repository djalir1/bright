import { motion } from "framer-motion";
import hero3 from "@/assets/hero-3.jpg";

const WhoWeAre = () => (
  <section className="py-24 bg-section-dark">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary">
            Who We Are
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-section-dark-foreground leading-tight">
            Welcome to Bright Horizon Travel & Tours
          </h2>
          <div className="space-y-4">
            <p className="font-body text-sm text-section-dark-foreground/70 leading-relaxed">
              We are a Rwanda-based tourism company dedicated to showcasing the extraordinary beauty
              of the Land of a Thousand Hills. With locally managed tour packages and deep roots in
              our communities, we create unforgettable journeys that connect travelers to Rwanda's
              stunning landscapes, incredible wildlife, and vibrant culture.
            </p>
            <p className="font-body text-sm text-section-dark-foreground/70 leading-relaxed">
              Our mission is to deliver world-class, sustainable tourism experiences that empower
              local communities and preserve Rwanda's natural heritage. We believe every journey
              should leave a positive footprint.
            </p>
          </div>
          <p className="font-display text-lg text-primary italic">
            "Expanding Your World, One Journey at a Time."
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="rounded-2xl overflow-hidden aspect-[4/5]">
            <img
              src={hero3}
              alt="Rwanda wildlife"
              className="h-full w-full object-cover"
            />
          </div>
          {/* Decorative accent */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full border-2 border-primary/30 hidden lg:block" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhoWeAre;

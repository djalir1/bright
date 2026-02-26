import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { destinations } from "@/data/destinations";

const IconicDestinations = () => {
  const featured = destinations.slice(0, 4);

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Iconic Destinations
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
            Places to Visit in Rwanda
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {featured.map((dest, i) => (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3]"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-section-dark/90 via-section-dark/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="glass-dark rounded-xl p-5">
                  <h3 className="font-display text-xl font-semibold text-primary-foreground mb-2">
                    {dest.name}
                  </h3>
                  <p className="font-body text-xs text-primary-foreground/70 leading-relaxed line-clamp-2">
                    {dest.shortDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            to="/destinations"
            className="inline-flex px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors"
          >
            View All Destinations
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IconicDestinations;

import { motion } from "framer-motion";
import { Heart, Shield, Star, Lightbulb, Clock, Leaf } from "lucide-react";

const values = [
  { icon: Heart, title: "Customer Commitment", description: "Your satisfaction and safety are our top priorities on every journey." },
  { icon: Shield, title: "Integrity", description: "Transparent pricing, honest advice, and ethical tourism practices." },
  { icon: Star, title: "Excellence", description: "Every tour is crafted to the highest standards of quality and service." },
  { icon: Lightbulb, title: "Innovation", description: "We continuously evolve our experiences with creative, modern approaches." },
  { icon: Clock, title: "Reliability", description: "Dependable service from booking to departure — always on time, always prepared." },
  { icon: Leaf, title: "Sustainability", description: "We protect Rwanda's natural heritage and invest in local communities." },
];

const WhyChooseUs = () => (
  <section className="py-24 bg-background">
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
          Our Values
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-medium text-foreground">
          Why Bright Horizon?
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {values.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="text-center p-6"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-5">
              <v.icon size={28} />
            </div>
            <h3 className="font-display text-lg font-semibold text-foreground mb-3">{v.title}</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;

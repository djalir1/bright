import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";

const About = () => (
  <div className="min-h-screen">
    <Navbar />

    {/* Hero */}
    <section className="relative h-[45vh] min-h-[350px] overflow-hidden">
      <img src={hero2} alt="About" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-section-dark via-section-dark/50 to-section-dark/30" />
      <div className="relative z-10 flex h-full items-end pb-10">
        <div className="container mx-auto px-6 text-center">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Our Story</p>
          <h1 className="font-display text-5xl md:text-6xl font-medium text-primary-foreground">About Us</h1>
        </div>
      </div>
    </section>

    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-5xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
            <h2 className="font-display text-3xl font-semibold text-foreground">Helping People Make Memories</h2>
            <p className="font-body text-muted-foreground leading-relaxed">
              Bright Horizon Travel & Tours is a Rwanda-based tourism company dedicated to showcasing the beauty of the Land of a Thousand Hills. Founded with a passion for authentic African experiences, we offer carefully curated tour packages that connect travelers with Rwanda's stunning landscapes, incredible wildlife, and vibrant culture.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Our team of experienced local guides brings decades of knowledge about Rwanda's national parks, communities, and hidden gems. We believe in responsible tourism that benefits both visitors and the communities we operate in.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-2xl overflow-hidden aspect-[4/3]">
              <img src={hero3} alt="Rwanda wildlife" className="h-full w-full object-cover" />
            </div>
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">Our Mission</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              To deliver world-class, sustainable tourism experiences that empower local communities, preserve Rwanda's natural heritage, and create unforgettable memories for every traveler.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-xl border border-border bg-card p-8">
            <h3 className="font-display text-xl font-semibold text-foreground mb-3">Our Vision</h3>
            <p className="font-body text-sm text-muted-foreground leading-relaxed">
              To be Rwanda's most trusted and innovative tourism company, setting the standard for responsible travel across East Africa and beyond.
            </p>
          </motion.div>
        </div>
      </div>
    </section>

    <Footer />
  </div>
);

export default About;

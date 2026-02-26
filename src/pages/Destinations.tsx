import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { destinationCategories } from "@/data/destinations";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import hero2 from "@/assets/hero-2.jpg";

const DestinationSlideshow = ({ images, name }: { images: string[]; name: string }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % images.length), 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-lg group">
      {images.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`${name} ${i + 1}`}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === current ? "opacity-100" : "opacity-0"
          }`}
          loading="lazy"
        />
      ))}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((p) => (p - 1 + images.length) % images.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-section-dark/60 text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % images.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-section-dark/60 text-primary-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight size={16} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === current ? "w-6 bg-primary" : "w-1.5 bg-primary-foreground/40"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const Destinations = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero2} alt="" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-section-dark via-section-dark/50 to-section-dark/30" />
        </div>
        <div className="relative z-10 flex h-full items-end pb-10">
          <div className="container mx-auto px-6 text-center">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Explore Rwanda</p>
            <h1 className="font-display text-5xl md:text-6xl font-medium text-primary-foreground">Destinations</h1>
          </div>
        </div>
      </section>

      {/* Categorized Destinations */}
      {destinationCategories.map((cat) => (
        <section key={cat.id} className="py-16 bg-background">
          <div className="container mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-3xl font-semibold text-foreground mb-10 border-l-4 border-primary pl-4"
            >
              {cat.category}
            </motion.h2>

            <div className="space-y-16">
              {cat.destinations.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
                >
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <DestinationSlideshow images={dest.images} name={dest.name} />
                  </div>
                  <div className={`space-y-4 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="font-body text-xs tracking-[0.2em] uppercase text-primary">{dest.location}</p>
                    <h3 className="font-display text-3xl font-semibold text-foreground">{dest.name}</h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">{dest.description}</p>
                    <p className="font-body text-sm text-muted-foreground/80 italic">{dest.culturalSignificance}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <Footer />
    </div>
  );
};

export default Destinations;

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { tours } from "@/data/tours";
import { destinations } from "@/data/destinations";
import { X } from "lucide-react";

// Assets
import galleryHero from "@/assets/gallery-hero.jpg";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

// 1. Collect all potential images
const rawImages = [
  ...tours.map((t) => ({ src: t.image, alt: t.name, category: "Tours" })),
  ...destinations.map((d) => ({ src: d.image, alt: d.name, category: "Destinations" })),
  { src: hero1, alt: "Rwanda Landscape", category: "Landscapes" },
  { src: hero2, alt: "Lake Kivu Sunset", category: "Landscapes" },
  { src: hero3, alt: "Wildlife", category: "Landscapes" },
  { src: hero4, alt: "Forest Canopy", category: "Landscapes" },
];

// 2. Remove duplicates by Source URL
// Using a Map ensures that each unique 'src' only exists once in the array.
const allImages = Array.from(
  new Map(rawImages.map((img) => [img.src, img])).values()
);

const categories = ["All", ...new Set(allImages.map((i) => i.category))];

const Gallery = () => {
  const [modalImage, setModalImage] = useState<{ src: string; alt: string; category: string } | null>(null);
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All" ? allImages : allImages.filter((i) => i.category === filter);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero — zebra safari image */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={galleryHero}
            alt="Safari Gallery"
            className="h-full w-full object-cover object-center"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-section-dark via-section-dark/50 to-section-dark/30" />
        </div>
        <div className="relative z-10 flex h-full items-end pb-10">
          <div className="container mx-auto px-6 text-center">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Visual Stories</p>
            <h1 className="font-display text-5xl md:text-6xl font-medium text-primary-foreground">Gallery</h1>
          </div>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="py-4 bg-background border-b border-border">
        <div className="container mx-auto px-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-lg font-body text-xs tracking-wider uppercase transition-colors ${
                filter === c
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Gallery grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img) => (
              <motion.div
                key={img.src} // Using src as key is more stable than index
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
                onClick={() => setModalImage(img)}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-section-dark/0 group-hover:bg-section-dark/40 transition-colors duration-300 flex items-end">
                  <div className="p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-body text-xs tracking-wider uppercase text-primary">{img.category}</p>
                    <p className="font-display text-sm text-primary-foreground">{img.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {modalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-section-dark/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setModalImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-primary-foreground/70 hover:text-primary transition-colors"
              onClick={() => setModalImage(null)}
            >
              <X size={28} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={modalImage.src}
              alt={modalImage.alt}
              className="max-w-full max-h-[85vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Gallery;
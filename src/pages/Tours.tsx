import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TourCard from "@/components/TourCard";
import { tours } from "@/data/tours";
import { motion } from "framer-motion";
import { SlidersHorizontal, Sparkles } from "lucide-react";
import hero1 from "@/assets/hero-1.jpg";

const tourTypes = ["All", "Wildlife", "Cultural", "Adventure", "Luxury", "Budget"];

const Tours = () => {
  const [filter, setFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [sort, setSort] = useState<string>("default");
  const navigate = useNavigate();

  const durations = ["all", ...new Set(tours.map((t) => t.duration))];

  let filtered = filter === "all" ? tours : tours.filter((t) => t.duration === filter);

  if (typeFilter !== "All") {
    const keyword = typeFilter.toLowerCase();
    filtered = filtered.filter(
      (t) =>
        t.name.toLowerCase().includes(keyword) ||
        t.description.toLowerCase().includes(keyword) ||
        t.shortDescription.toLowerCase().includes(keyword) ||
        (keyword === "wildlife" && (t.slug.includes("gorilla") || t.slug.includes("akagera") || t.slug.includes("nyungwe"))) ||
        (keyword === "cultural" && t.slug.includes("cultural")) ||
        (keyword === "adventure" && (t.slug.includes("nyungwe") || t.slug.includes("twin"))) ||
        (keyword === "luxury" && t.price >= 1200) ||
        (keyword === "budget" && t.price < 900)
    );
  }

  if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero1} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-section-dark via-section-dark/60 to-section-dark/30" />
        </div>
        <div className="relative z-10 flex h-full items-end pb-12">
          <div className="container mx-auto px-6">
            <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-3">Explore Rwanda</p>
            <h1 className="font-display text-5xl md:text-6xl font-medium text-primary-foreground mb-2">Our Tour Packages</h1>
            <p className="font-body text-sm text-primary-foreground/60 max-w-xl">
              Discover curated experiences across Rwanda's most breathtaking landscapes.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-background border-b border-border">
        <div className="container mx-auto px-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal size={16} className="text-muted-foreground" />
            <div className="flex flex-wrap gap-2">
              {durations.map((d) => (
                <button
                  key={d}
                  onClick={() => setFilter(d)}
                  className={`px-4 py-2 rounded-lg font-body text-xs tracking-wider uppercase transition-colors ${
                    filter === d ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {d === "all" ? "All Durations" : d}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 justify-between">
            <div className="flex flex-wrap gap-2">
              {tourTypes.map((t) => (
                <button
                  key={t}
                  onClick={() => setTypeFilter(t)}
                  className={`px-4 py-2 rounded-lg font-body text-xs tracking-wider uppercase transition-colors ${
                    typeFilter === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-secondary"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-2 rounded-lg bg-muted text-foreground font-body text-xs border border-border"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
            </select>
          </div>
        </div>
      </section>

      {/* Tour grid */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero1} alt="" className="h-full w-full object-cover blur-sm scale-105" />
          <div className="absolute inset-0 bg-section-dark/80" />
        </div>
        <div className="relative z-10 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filtered.map((tour, i) => (
              <TourCard key={tour.id} tour={tour} index={i} />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-primary-foreground/60 font-body py-12">No tours match your filters.</p>
          )}
        </div>
      </section>

      {/* Custom Itinerary CTA Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Can't find your perfect trip?
            </h2>
            <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">
              Let our Rwanda specialists design a <strong className="text-foreground">fully personalised itinerary</strong> just for you — based on your dates, interests, budget, and travel style.
            </p>
            <Link
              to="/custom-itinerary"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-section-dark text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-primary transition-colors shadow-lg"
            >
              <Sparkles size={18} />
              Request a Customised Itinerary
            </Link>
            <p className="font-body text-xs text-muted-foreground mt-4">
              Free • No obligation • Expert suggestions within 24 hours
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Tours;

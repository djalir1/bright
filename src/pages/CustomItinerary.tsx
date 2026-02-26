import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Check } from "lucide-react";
import hero2 from "@/assets/hero-2.jpg";

const experiences = ["Gorilla Trekking", "Chimpanzee Trekking", "Big Five Safari", "Golden Monkeys", "Culture & Villages", "Lake Relaxation"];
const budgetOptions = ["Under $1,000", "$1,000 – $2,500", "$2,500 – $5,000", "$5,000+"];
const durationOptions = ["2–3 Days", "4–5 Days", "6–7 Days", "8+ Days"];

const CustomItinerary = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userName, setUserName] = useState("");

  const [selectedExperiences, setSelectedExperiences] = useState<string[]>([]);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [budget, setBudget] = useState("");
  const [duration, setDuration] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [flexible, setFlexible] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const toggleExperience = (exp: string) => {
    setSelectedExperiences((prev) =>
      prev.includes(exp) ? prev.filter((e) => e !== exp) : [...prev, exp]
    );
  };

  const handleChildrenChange = (count: number) => {
    setChildren(count);
    setChildrenAges(prev => {
      if (count > prev.length) return [...prev, ...Array(count - prev.length).fill(5)];
      return prev.slice(0, count);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUserName(name);
    // Mock submit — data would go to backend
    await new Promise(r => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero2} alt="" className="h-full w-full object-cover" loading="eager" />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/60 to-section-dark/40" />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center px-6">
            <Sparkles size={36} className="text-primary-foreground mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl font-medium text-primary-foreground mb-2">
              Create Your Perfect Rwanda Journey
            </h1>
            <p className="font-body text-sm text-primary-foreground/80">
              Our experts will design a bespoke itinerary just for you
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                <div className="bg-primary p-8 text-center">
                  <Sparkles size={40} className="text-primary-foreground mx-auto mb-4" />
                  <h2 className="font-display text-3xl font-bold text-primary-foreground mb-2">
                    Create Your Perfect Rwanda Journey
                  </h2>
                  <p className="font-body text-sm text-primary-foreground/80">Our experts will design a bespoke itinerary just for you</p>
                </div>
                <div className="bg-[hsl(160_35%_22%)] p-8 text-center">
                  <p className="text-3xl mb-3">🎉</p>
                  <h3 className="font-display text-2xl font-bold text-primary-foreground mb-3">
                    Thank You, {userName}!
                  </h3>
                  <p className="font-body text-sm text-primary-foreground/90 max-w-md mx-auto leading-relaxed">
                    Your custom itinerary request has been successfully submitted.
                    We will contact you within 24 hours with personalised suggestions.
                  </p>
                  <a
                    href="/contact"
                    className="inline-block mt-6 px-6 py-3 rounded-lg bg-primary-foreground text-primary font-body text-sm font-semibold hover:bg-primary-foreground/90 transition-colors"
                  >
                    Contact Us
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleSubmit}
                className="space-y-8"
              >
                {/* Experiences */}
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground text-center mb-2">What experiences interest you most?</h3>
                  <p className="font-body text-xs text-muted-foreground text-center mb-4">(Select all that apply)</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {experiences.map((exp) => (
                      <button
                        key={exp}
                        type="button"
                        onClick={() => toggleExperience(exp)}
                        className={`px-4 py-3 rounded-lg border font-body text-xs tracking-wider transition-colors text-center ${
                          selectedExperiences.includes(exp) ? "border-primary bg-primary/10 text-primary font-semibold" : "border-border text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        {exp}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Travel Date */}
                <div>
                  <label className="font-body text-sm font-semibold text-foreground mb-2 block">Preferred Travel Date</label>
                  <input
                    type="date"
                    min={todayStr}
                    value={travelDate}
                    onChange={(e) => { setTravelDate(e.target.value); setFlexible(false); }}
                    className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground focus:ring-2 focus:ring-primary/30 outline-none"
                  />
                  <label className="flex items-center gap-2 mt-2 cursor-pointer">
                    <input type="checkbox" checked={flexible} onChange={(e) => { setFlexible(e.target.checked); if (e.target.checked) setTravelDate(""); }} className="accent-primary" />
                    <span className="font-body text-sm text-muted-foreground">I'm flexible with dates</span>
                  </label>
                </div>

                {/* Travelers */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-semibold text-foreground mb-2 block">Adults (18+)</label>
                    <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground">
                      {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-sm font-semibold text-foreground mb-2 block">Children (under 18)</label>
                    <select value={children} onChange={(e) => handleChildrenChange(Number(e.target.value))} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground">
                      <option value={0}>None</option>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                    </select>
                  </div>
                </div>

                {/* Children ages */}
                {children > 0 && (
                  <div className="space-y-2">
                    <label className="font-body text-sm font-semibold text-foreground block">Children's Ages</label>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                      {childrenAges.map((age, idx) => (
                        <div key={idx}>
                          <label className="font-body text-xs text-muted-foreground mb-1 block">Child {idx + 1}</label>
                          <select
                            value={age}
                            onChange={(e) => {
                              const updated = [...childrenAges];
                              updated[idx] = Number(e.target.value);
                              setChildrenAges(updated);
                            }}
                            className="w-full px-3 py-2 rounded-lg border border-input bg-background font-body text-sm text-foreground"
                          >
                            {Array.from({ length: 18 }, (_, i) => (
                              <option key={i} value={i}>{i} yr{i !== 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Budget & Duration */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-semibold text-foreground mb-2 block">Budget per person (USD) *</label>
                    <select required value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground">
                      <option value="">-- Select budget --</option>
                      {budgetOptions.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="font-body text-sm font-semibold text-foreground mb-2 block">Preferred trip length *</label>
                    <select required value={duration} onChange={(e) => setDuration(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground">
                      <option value="">-- Select duration --</option>
                      {durationOptions.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="border-t border-border pt-6 space-y-4">
                  <h3 className="font-display text-lg font-semibold text-foreground">Your Contact Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required placeholder="Full Name *" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                    <input required placeholder="Email Address *" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required placeholder="Phone (+country code) *" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                    <input placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                  </div>
                  <textarea placeholder="Any special requests or additional details?" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none resize-none" />
                </div>

                <button
                  type="submit"
                  disabled={loading || !budget || !duration}
                  className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-body text-sm font-bold tracking-wider uppercase hover:bg-accent transition-colors disabled:opacity-50 shadow-lg flex items-center justify-center gap-2"
                >
                  {loading ? "Submitting..." : (
                    <>
                      <Check size={18} />
                      Submit My Custom Request
                    </>
                  )}
                </button>
                <p className="font-body text-xs text-muted-foreground text-center">Free • No obligation • Expert suggestions within 24 hours</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CustomItinerary;

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { GraduationCap, Code, UtensilsCrossed, Plane, Briefcase } from "lucide-react";
import academyLogo from "@/assets/academy-logo.jpg";

const candidatLibrePrograms = [
  { icon: Code, name: "Software Development", description: "Learn full-stack web development with modern technologies and real-world projects." },
  { icon: UtensilsCrossed, name: "Food & Beverage", description: "Master culinary arts, restaurant management, and hospitality service excellence." },
  { icon: Plane, name: "Tourism", description: "Comprehensive training in tour operations, customer service, and Rwanda's tourism industry." },
];

const internshipPrograms = [
  { icon: Briefcase, name: "Tourism Internship Program", description: "Gain hands-on experience working alongside industry professionals in Rwanda's top tourism companies." },
];

const Academy = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", country: "", program: "", message: "" });

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock submit
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero — academy-specific, no mountain image, green gradient */}
      <section className="relative h-[45vh] min-h-[350px] overflow-hidden bg-gradient-to-br from-[hsl(160_35%_15%)] via-[hsl(160_30%_20%)] to-[hsl(160_25%_25%)]">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(160 45% 40% / 0.3) 0%, transparent 70%)" }} />
        </div>
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="text-center px-6">
            <img src={academyLogo} alt="Bright Horizon Academy" className="h-24 w-auto mx-auto mb-6 drop-shadow-lg" />
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Education & Training</p>
            <h1 className="font-display text-5xl md:text-6xl font-medium text-primary-foreground">Our Academy</h1>
          </div>
        </div>
      </section>

      {/* Candidat Libre Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-semibold text-foreground mb-8"
          >
            Candidat Libre Programs
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {candidatLibrePrograms.map((prog, i) => (
              <motion.div
                key={prog.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 space-y-4 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <prog.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{prog.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{prog.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Internship Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl font-semibold text-foreground mb-8"
          >
            Internship Program
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {internshipPrograms.map((prog, i) => (
              <motion.div
                key={prog.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-border bg-card p-6 space-y-4 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <prog.icon size={22} className="text-primary" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{prog.name}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{prog.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <GraduationCap size={40} className="text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl font-semibold text-foreground mb-2">Apply Now</h2>
            <p className="font-body text-sm text-muted-foreground">Fill out the form below to apply for any of our programs.</p>
          </motion.div>

          {submitted ? (
            <div className="text-center py-12 rounded-xl border border-primary/30 bg-primary/5 p-8">
              <p className="font-display text-2xl text-primary mb-2">Application Submitted!</p>
              <p className="font-body text-sm text-muted-foreground">We'll review your application and get back to you soon.</p>
            </div>
          ) : (
            <form className="space-y-4 rounded-xl border border-border bg-card p-8 shadow-sm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required placeholder="Full Name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                <input required placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
              </div>
              <input placeholder="Phone Number (with country code)" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
              <input placeholder="Country" value={form.country} onChange={(e) => setForm({...form, country: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
              <select required value={form.program} onChange={(e) => setForm({...form, program: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground focus:ring-2 focus:ring-primary/30 outline-none">
                <option value="">Select Program</option>
                <optgroup label="Candidat Libre">
                  <option value="Software Development">Software Development</option>
                  <option value="Food & Beverage">Food & Beverage</option>
                  <option value="Tourism">Tourism</option>
                </optgroup>
                <optgroup label="Internship">
                  <option value="Tourism Internship Program">Tourism Internship Program</option>
                </optgroup>
              </select>
              <textarea placeholder="Why are you interested in this program?" rows={4} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none resize-none" />
              <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors disabled:opacity-50">
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Academy;

import { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import hero4 from "@/assets/hero-4.jpg";

const Contact = () => {
  const location = useLocation();
  const fromCustom = location.state?.fromCustom;
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await supabase.from("contact_messages").insert({
      full_name: `${form.firstName} ${form.lastName}`.trim(),
      email: form.email,
      phone: form.phone,
      message: form.message,
    });
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[45vh] min-h-[350px] overflow-hidden">
        <img src={hero4} alt="Contact" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-section-dark via-section-dark/50 to-section-dark/30" />
        <div className="relative z-10 flex h-full items-end pb-10">
          <div className="container mx-auto px-6 text-center">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Get In Touch</p>
            <h1 className="font-display text-5xl md:text-6xl font-medium text-primary-foreground">Contact Us</h1>
          </div>
        </div>
      </section>

      {/* Custom request success banner */}
      {fromCustom && (
        <div className="bg-primary/10 border-b border-primary/20">
          <div className="container mx-auto px-6 py-4 flex items-center gap-3">
            <CheckCircle className="text-primary" size={20} />
            <p className="font-body text-sm text-foreground">
              <strong>Your custom itinerary request has been submitted!</strong> Our team will respond within 24 hours. Feel free to contact us below for any additional questions.
            </p>
          </div>
        </div>
      )}

      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
            {/* Contact info */}
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-semibold text-foreground mb-4">Let's Plan Your Adventure</h2>
                <p className="font-body text-muted-foreground leading-relaxed">
                  Ready to explore Rwanda? Reach out to us and we'll help you plan the perfect trip.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">Address</p>
                    <p className="font-body text-sm text-muted-foreground">Kigali, Rwanda</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">Phone</p>
                    <p className="font-body text-sm text-muted-foreground">+250 788 000 000</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="text-primary" size={20} />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-foreground">Email</p>
                    <p className="font-body text-sm text-muted-foreground">info@brighthorizon.rw</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-foreground mb-3">Connect With Us</p>
                <div className="flex gap-4">
                  <a href="https://wa.me/250788000000" target="_blank" rel="noopener noreferrer" className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-body text-sm hover:bg-primary/20 transition-colors">WhatsApp</a>
                  <a href="#" className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-body text-sm hover:bg-primary/20 transition-colors">Instagram</a>
                  <a href="#" className="px-4 py-2 rounded-lg bg-primary/10 text-primary font-body text-sm hover:bg-primary/20 transition-colors">Facebook</a>
                </div>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              {submitted ? (
                <div className="rounded-xl border border-border bg-card p-8 text-center">
                  <CheckCircle className="text-primary mx-auto mb-4" size={40} />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">Message Sent!</h3>
                  <p className="font-body text-sm text-muted-foreground">Our team will respond within 24 hours.</p>
                </div>
              ) : (
                <form className="space-y-4 rounded-xl border border-border bg-card p-8 shadow-sm" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input required placeholder="First Name" value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                    <input required placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                  </div>
                  <input required placeholder="Email Address" type="email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                  <input placeholder="Phone Number" value={form.phone} onChange={(e) => setForm({...form, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                  <textarea required placeholder="Your Message" rows={5} value={form.message} onChange={(e) => setForm({...form, message: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none resize-none" />
                  <button type="submit" disabled={loading} className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors disabled:opacity-50">
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;

import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { tours } from "@/data/tours";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Users, Check, X, ChevronLeft, ChevronRight, Minus, Plus, Camera } from "lucide-react";
import { useState } from "react";

type Tab = "overview" | "itinerary" | "pricing";

const TourDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const tour = tours.find((t) => t.slug === slug);
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [enquiryModal, setEnquiryModal] = useState(false);
  const [enquiryStep, setEnquiryStep] = useState<"dates" | "details" | "done">("dates");
  const [tripData, setTripData] = useState({ startDate: "", adults: 1, children: 0 });
  const [childrenAges, setChildrenAges] = useState<number[]>([]);
  const [personalData, setPersonalData] = useState({ name: "", email: "", country: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);

  const [galleryModal, setGalleryModal] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [galleryTitle, setGalleryTitle] = useState("");

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Tour Not Found</h1>
          <Link to="/tours" className="text-primary font-body hover:underline">← Back to Tours</Link>
        </div>
      </div>
    );
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "itinerary", label: "Itinerary" },
    { key: "pricing", label: "Pricing" },
  ];

  const durationDays = parseInt(tour.duration) || 3;
  const endDate = tripData.startDate
    ? new Date(new Date(tripData.startDate).getTime() + (durationDays - 1) * 86400000).toISOString().split("T")[0]
    : "";
  const todayStr = new Date().toISOString().split("T")[0];

  const openGallery = (images: string[], title: string) => {
    setGalleryImages(images);
    setGalleryTitle(title);
    setGalleryIndex(0);
    setGalleryModal(true);
  };

  const handleChildrenChange = (count: number) => {
    setTripData({ ...tripData, children: count });
    setChildrenAges(prev => {
      if (count > prev.length) return [...prev, ...Array(count - prev.length).fill(5)];
      return prev.slice(0, count);
    });
  };

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Mock submit
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    setEnquiryStep("done");
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img src={tour.image} alt={tour.name} className="absolute inset-0 h-full w-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-gradient-to-t from-section-dark via-section-dark/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="container mx-auto px-6 pb-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-2">
                {durationDays} Days / {durationDays - 1} Nights
              </p>
              <h1 className="font-display text-3xl md:text-5xl font-medium text-primary-foreground mb-1">{tour.name}</h1>
              <p className="font-body text-sm text-primary-foreground/60 italic mb-3">{tour.shortDescription}</p>
            </motion.div>
          </div>
          {/* Price bar */}
          <div className="bg-primary">
            <div className="container mx-auto px-6 py-3 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="font-body text-xs text-primary-foreground/70">Starting From:</span>
                <span className="font-display text-xl text-primary-foreground font-bold ml-2">${tour.price} pp USD</span>
              </div>
              <button
                onClick={() => { setEnquiryModal(true); setEnquiryStep("dates"); }}
                className="px-6 py-2.5 rounded-lg bg-section-dark text-primary-foreground font-body text-xs font-semibold tracking-wider uppercase hover:bg-section-dark/80 transition-colors"
              >
                📅 Book / Enquire Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="bg-background border-b border-border sticky top-[68px] z-30">
        <div className="container mx-auto px-6">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 font-body text-sm tracking-wider uppercase transition-colors border-b-2 ${
                  activeTab === tab.key
                    ? "text-primary border-primary font-semibold"
                    : "text-muted-foreground border-transparent hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          {activeTab === "overview" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-8">
              <div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Tour Overview & Highlights</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-body text-xs text-muted-foreground font-semibold">Duration:</p>
                    <p className="font-body text-sm text-foreground">{tour.duration}</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-body text-xs text-muted-foreground font-semibold">Regions Visited:</p>
                    <p className="font-body text-sm text-foreground">{tour.location}</p>
                  </div>
                  <div className="border border-border rounded-lg p-4">
                    <p className="font-body text-xs text-muted-foreground font-semibold">Max Group Size:</p>
                    <p className="font-body text-sm text-foreground">{tour.maxPeople} people</p>
                  </div>
                </div>
                <p className="font-body text-muted-foreground leading-relaxed">{tour.description}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">What's Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                        <Check size={16} className="text-primary flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-4">What's Excluded</h3>
                  <ul className="space-y-2">
                    {tour.excluded.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                        <X size={16} className="text-destructive flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "itinerary" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-3xl space-y-6">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">Detailed Daily Journey</h2>
              {tour.itinerary.map((day) => (
                <motion.div
                  key={day.day}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="border border-border rounded-xl p-6"
                >
                  <h3 className="font-display text-lg font-bold text-primary mb-1">Day {day.day}: {day.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mb-3">{day.activities}</p>
                  {day.accommodation !== "N/A" && (
                    <div className="mt-3">
                      <p className="font-body text-xs text-muted-foreground mb-1">
                        <span className="font-semibold text-primary">Overnight Accommodation:</span>
                      </p>
                      <p className="font-body text-sm text-foreground font-semibold mb-2">🏨 {day.accommodation}</p>
                      {/* Accommodation gallery thumbnails */}
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 mt-2">
                        {tour.gallery.slice(0, 5).map((img, idx) => (
                          <div
                            key={idx}
                            className="aspect-square rounded-lg overflow-hidden cursor-pointer group"
                            onClick={() => openGallery(tour.gallery, day.accommodation)}
                          >
                            <img src={img} alt={`${day.accommodation} ${idx + 1}`} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-300" loading="lazy" />
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => openGallery(tour.gallery, day.accommodation)}
                        className="mt-2 flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground font-body text-xs font-semibold hover:bg-accent transition-colors"
                      >
                        <Camera size={14} /> View All Photos ({tour.gallery.length})
                      </button>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeTab === "pricing" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl space-y-6">
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">Pricing Details</h2>
              <div className="rounded-xl border border-border bg-card p-6 space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-body text-sm text-muted-foreground">Price per person</span>
                  <span className="font-display text-xl text-primary font-semibold">${tour.price}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-body text-sm text-muted-foreground">Duration</span>
                  <span className="font-body text-sm text-foreground font-semibold">{tour.duration}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border">
                  <span className="font-body text-sm text-muted-foreground">Max group size</span>
                  <span className="font-body text-sm text-foreground font-semibold">{tour.maxPeople} people</span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="font-body text-sm text-muted-foreground">Location</span>
                  <span className="font-body text-sm text-foreground font-semibold">{tour.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">What's Included</h3>
                  <ul className="space-y-2">
                    {tour.included.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                        <Check size={14} className="text-primary flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-3">What's Excluded</h3>
                  <ul className="space-y-2">
                    {tour.excluded.map((item) => (
                      <li key={item} className="flex items-center gap-2 font-body text-sm text-muted-foreground">
                        <X size={14} className="text-destructive flex-shrink-0" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button
                onClick={() => { setEnquiryModal(true); setEnquiryStep("dates"); }}
                className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors"
              >
                Enquire Now
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Enquiry Modal */}
      <AnimatePresence>
        {enquiryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-section-dark/70 backdrop-blur-sm p-4"
            onClick={() => setEnquiryModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
            >
              {enquiryStep === "done" ? (
                <div className="text-center py-12 px-8">
                  <p className="text-4xl mb-3">🎉</p>
                  <p className="font-display text-2xl text-primary mb-2">Enquiry Sent!</p>
                  <p className="font-body text-sm text-muted-foreground mb-6">Our team will respond to you within 24 hours.</p>
                  <button onClick={() => { setEnquiryModal(false); navigate("/contact"); }} className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-body text-sm">Contact Us</button>
                </div>
              ) : enquiryStep === "dates" ? (
                <div>
                  <div className="bg-primary rounded-t-xl px-6 py-4 flex items-center justify-between">
                    <h3 className="font-display text-lg font-bold text-primary-foreground">Book Your Adventure</h3>
                    <button onClick={() => setEnquiryModal(false)} className="text-primary-foreground/70 hover:text-primary-foreground">
                      <X size={20} />
                    </button>
                  </div>
                  <div className="p-6 space-y-5">
                    <div>
                      <label className="font-body text-sm font-semibold text-foreground mb-1 block">Desired Start Date <span className="text-destructive">*</span></label>
                      <input type="date" required min={todayStr} value={tripData.startDate} onChange={(e) => setTripData({...tripData, startDate: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="font-body text-sm font-semibold text-foreground mb-2 block">Adults (18+)</label>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => setTripData({...tripData, adults: Math.max(1, tripData.adults - 1)})} className="w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary/10 transition-colors"><Minus size={16} /></button>
                          <span className="font-body text-lg font-semibold text-foreground w-8 text-center">{tripData.adults}</span>
                          <button type="button" onClick={() => setTripData({...tripData, adults: tripData.adults + 1})} className="w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary/10 transition-colors"><Plus size={16} /></button>
                        </div>
                      </div>
                      <div>
                        <label className="font-body text-sm font-semibold text-foreground mb-2 block">Children (Under 18)</label>
                        <div className="flex items-center gap-3">
                          <button type="button" onClick={() => handleChildrenChange(Math.max(0, tripData.children - 1))} className="w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary/10 transition-colors"><Minus size={16} /></button>
                          <span className="font-body text-lg font-semibold text-foreground w-8 text-center">{tripData.children}</span>
                          <button type="button" onClick={() => handleChildrenChange(tripData.children + 1)} className="w-9 h-9 rounded-full border border-primary text-primary flex items-center justify-center hover:bg-primary/10 transition-colors"><Plus size={16} /></button>
                        </div>
                      </div>
                    </div>

                    {/* Children ages */}
                    {tripData.children > 0 && (
                      <div className="space-y-2 border-t border-border pt-4">
                        <label className="font-body text-sm font-semibold text-foreground block">Children's Ages</label>
                        <div className="grid grid-cols-3 gap-3">
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

                    <button
                      onClick={() => tripData.startDate && setEnquiryStep("details")}
                      disabled={!tripData.startDate}
                      className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-body text-sm font-bold tracking-wider uppercase hover:bg-accent transition-colors disabled:opacity-40 flex items-center justify-center gap-2 shadow-lg"
                    >
                      ✉ Proceed to Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="p-6 space-y-4">
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">Your Trip Details</h3>

                  <div className="rounded-lg bg-muted p-4 space-y-2">
                    <div className="flex justify-between font-body text-xs">
                      <span className="text-muted-foreground">Tour</span>
                      <span className="text-foreground font-semibold">{tour.name}</span>
                    </div>
                    <div className="flex justify-between font-body text-xs">
                      <span className="text-muted-foreground">Travelers</span>
                      <span className="text-foreground">{tripData.adults} adults{tripData.children > 0 ? `, ${tripData.children} children` : ""}</span>
                    </div>
                    <div className="flex justify-between font-body text-xs">
                      <span className="text-muted-foreground">Start Date</span>
                      <span className="text-foreground">{tripData.startDate}</span>
                    </div>
                    {endDate && (
                      <div className="flex justify-between font-body text-xs">
                        <span className="text-muted-foreground">End Date</span>
                        <span className="text-foreground">{endDate}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-body text-xs border-t border-border pt-2 mt-2">
                      <span className="text-muted-foreground">Price per person</span>
                      <span className="text-primary font-semibold">${tour.price}</span>
                    </div>
                  </div>

                  <input required placeholder="Full Name" value={personalData.name} onChange={(e) => setPersonalData({...personalData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                  <input required placeholder="Email Address" type="email" value={personalData.email} onChange={(e) => setPersonalData({...personalData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                  <input required placeholder="Country of Residence" value={personalData.country} onChange={(e) => setPersonalData({...personalData, country: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                  <input required placeholder="Phone (with country code)" value={personalData.phone} onChange={(e) => setPersonalData({...personalData, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none" />
                  <textarea placeholder="Optional message" rows={2} value={personalData.message} onChange={(e) => setPersonalData({...personalData, message: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-input bg-background font-body text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/30 outline-none resize-none" />

                  <div className="flex gap-3">
                    <button type="button" onClick={() => setEnquiryStep("dates")} className="px-6 py-3 rounded-lg border border-border text-foreground font-body text-sm hover:bg-muted transition-colors">Back</button>
                    <button type="submit" disabled={loading} className="flex-1 py-3 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold tracking-wider uppercase hover:bg-accent transition-colors disabled:opacity-50">
                      {loading ? "Sending..." : "Send Enquiry"}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Accommodation Image Gallery Modal */}
      <AnimatePresence>
        {galleryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-section-dark/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setGalleryModal(false)}
          >
            <div className="absolute top-6 left-6 z-10">
              <p className="font-display text-lg text-primary-foreground font-semibold">{galleryTitle}</p>
            </div>
            <button className="absolute top-6 right-6 text-primary-foreground/70 hover:text-primary transition-colors z-10" onClick={() => setGalleryModal(false)}>
              <X size={28} />
            </button>

            {galleryImages.length > 1 && (
              <>
                <button
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-section-dark/60 text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex - 1 + galleryImages.length) % galleryImages.length); }}
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-section-dark/60 text-primary-foreground flex items-center justify-center hover:bg-primary transition-colors z-10"
                  onClick={(e) => { e.stopPropagation(); setGalleryIndex((galleryIndex + 1) % galleryImages.length); }}
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}

            <motion.img
              key={galleryIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              src={galleryImages[galleryIndex]}
              alt={galleryTitle}
              className="max-w-full max-h-[80vh] rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Thumbnails */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={(e) => { e.stopPropagation(); setGalleryIndex(idx); }}
                  className={`w-14 h-10 rounded-md overflow-hidden border-2 transition-colors ${galleryIndex === idx ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default TourDetails;

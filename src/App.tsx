import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Destinations from "./pages/Destinations";
import Academy from "./pages/Academy";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enquire from "./pages/Enquire";
import CustomItinerary from "./pages/CustomItinerary";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminCustomRequests from "./pages/admin/AdminCustomRequests";
import AdminTours from "./pages/admin/AdminTours";
import AdminDestinations from "./pages/admin/AdminDestinations";
import AdminAcademy from "./pages/admin/AdminAcademy";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminGallery from "./pages/admin/AdminGallery";

const queryClient = new QueryClient();

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:slug" element={<TourDetails />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/academy" element={<Academy />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/enquire" element={<Enquire />} />
            <Route path="/custom-itinerary" element={<CustomItinerary />} />
            
            {/* Admin routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="enquiries" element={<AdminEnquiries />} />
              <Route path="custom-requests" element={<AdminCustomRequests />} />
              <Route path="tours" element={<AdminTours />} />
              <Route path="destinations" element={<AdminDestinations />} />
              <Route path="academy" element={<AdminAcademy />} />
              <Route path="messages" element={<AdminMessages />} />
              <Route path="gallery" element={<AdminGallery />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;

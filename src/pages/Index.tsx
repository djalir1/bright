import Navbar from "@/components/Navbar";
import HeroSlideshow from "@/components/HeroSlideshow";
import WhoWeAre from "@/components/WhoWeAre";
import IconicDestinations from "@/components/IconicDestinations";
import FeaturedTours from "@/components/FeaturedTours";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlideshow />
      <WhoWeAre />
      <IconicDestinations />
      <FeaturedTours />
      <WhyChooseUs />
      <Footer />
    </div>
  );
};

export default Index;

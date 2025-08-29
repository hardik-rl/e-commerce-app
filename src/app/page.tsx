import Footer from "@/components/common/Footer";
import BrowseByStyle from "@/components/home/BrowseByStyle";
import HeroBanner from "@/components/home/HeroBanner";
import NewArrivals from "@/components/home/NewArrivals";
import Newsletter from "@/components/home/Newsletter";
import Testimonials from "@/components/home/Testimonials";
import TopSellings from "@/components/home/TopSellings";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <NewArrivals />
      <TopSellings />
      <BrowseByStyle />
      <Testimonials />
      <Newsletter />
      <Footer />
    </>
  );
}

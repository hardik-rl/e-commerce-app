import BrowseByStyle from "@/components/home/BrowseByStyle";
import HeroBanner from "@/components/home/HeroBanner";
import NewArrivals from "@/components/home/NewArrivals";
import TopSellings from "@/components/home/TopSellings";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <NewArrivals />
      <TopSellings />
      <BrowseByStyle />
    </>
  );
}

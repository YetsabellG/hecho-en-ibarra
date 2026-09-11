import Header from "./components/layout/Header";
import Hero from "./components/home/Hero";
import LiveStats from "./components/home/LiveStats";
import Categories from "./components/categories/Categories";
import Featured from "./components/featured/Featured";
import Recent from "./components/recent/Recent";
import Promotions from "./components/promotions/Promotions";
import Events from "./components/events/Events";
import Plans from "./components/plans/Plans";
import About from "./components/about/About";
import Footer from "./components/footer/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <LiveStats />
      <Categories />
      <Featured />
      <Recent />
      <Promotions />
      <Events />
      <Plans />
<About />
<Footer />
    </>
  );
}

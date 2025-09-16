/** @format */

import Visions from "../components/Home/Visions";
import Hero from "../components/Home/Hero";
import Footer from "../components/shared/Footer";
import Features from "../components/Home/Features";
import Navbar from "../components/shared/Navbar";
import AboutUs from "../components/Home/AboutUs";

export default function Home() {
  return (
    <>
      <div className="bg-[url('./assets/bg/bg-1.png')] bg-cover bg-no-repeat bg-center">
        <Navbar />
        <Hero />
      </div>
      <Visions />
      <Features />
      <AboutUs />
      <Footer />
    </>
  );
}

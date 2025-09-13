import React from "react";
import Hero from "./section/Hero";
import NavBar from "../../components/navbar";

const LandingPage = () => {
  return (
    <div className="min-h-screen w-screen bg-[url('./assets/base-background.png')] bg-cover bg-no-repeat bg-center lg:px-30 md:px-10 px-4">
      <NavBar />
      <Hero />
    </div>
  );
};

export default LandingPage;
// src/pages/Home.tsx
import React from "react";

import HomeSlider from "../components/home/Slider";
import HomeContent from "../components/home/HomeContent"; // 👈 Sahi file ka naam

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <main className="flex-1">
        <HomeSlider />
        <HomeContent />
      </main>
    </div>
  );
};

export default Home;

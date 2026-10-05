import { useEffect } from "react";

import HomeTopSection from "../components/home/HomeTopSection";
import WhyTrustRupeeDial from "../components/home/WhyTrustRupeeDial";
import HowItWorksSection from "../components/home/HowItWorksSection";
import LoanProductsSlider from "../components/home/LoanProductsSlider";
import HomeBottomSection from "../components/home/HomeBottomSection";

const Home = () => {
  useEffect(() => {
    document.title =
      "RupeeDial | Financial Marketplace & Distribution Network";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Compare loans across 50+ lenders, get expert assistance, or grow as a RupeeDial financial partner. MSME, home, personal and business finance. No advance fees."
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://rupeedial.com/");
  }, []);

  return (
    <main className="bg-white overflow-x-hidden max-w-[100vw]">
      <HomeTopSection />
      <HowItWorksSection />
      <LoanProductsSlider />
      <WhyTrustRupeeDial />
      <HomeBottomSection />
    </main>
  );
};

export default Home;

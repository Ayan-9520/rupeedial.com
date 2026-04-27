import { useEffect } from "react";

import HomeTopSection from "../components/home/HomeTopSection";
import WhyTrustRupeeDial from "../components/home/WhyTrustRupeeDial";
import HowItWorksSection from "../components/home/HowItWorksSection";
import LoanProductsSlider from "../components/home/LoanProductsSlider";
import HomeBottomSection from "../components/home/HomeBottomSection";

const HomeContent = () => {

  useEffect(() => {
    // TITLE
    document.title =
      "RupeeDial";

    // META DESCRIPTION
    const metaDesc = document.querySelector(
      "meta[name='description']"
    ) || document.createElement("meta");

    metaDesc.setAttribute("name", "description");
    metaDesc.setAttribute(
      "content",
      "Compare and apply for MSME, personal, home and business loans in India. Check eligibility online across top banks & NBFCs with RupeeDial."
    );

    document.head.appendChild(metaDesc);

    // CANONICAL
    let canonical = document.querySelector("link[rel='canonical']");
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://rupeedial.com/");
  }, []);

  return (
    <main className="bg-white">
      <HomeTopSection />
      
      <HowItWorksSection />
      
      <LoanProductsSlider />
      <WhyTrustRupeeDial />
      <HomeBottomSection />
    </main>
  );
};

export default HomeContent;

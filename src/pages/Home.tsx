import HomeTopSection from "../components/home/HomeTopSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import LoanProductsSlider from "../components/home/LoanProductsSlider";
import HomeBottomSection from "../components/home/HomeBottomSection";

const HomeContent = () => {
  return (
    <main className="bg-white">
      <HomeTopSection />

      <HowItWorksSection />

   <LoanProductsSlider />

      <HomeBottomSection />
    </main>
  );
};

export default HomeContent;

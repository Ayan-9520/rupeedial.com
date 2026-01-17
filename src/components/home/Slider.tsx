// src/components/home/HomeSlider.tsx
import { useEffect, useState } from "react";
import msmeLoan from "../../assets/images/msme-loan.png";
import mudraLoan from "../../assets/images/mudra-loan.png";
import homeLoan from "../../assets/images/home-loan.png";
import lap from "../../assets/images/lap.png";
import personalLoan from "../../assets/images/personal-loan.png";
import carLoan from "../../assets/images/car-loan.png";

interface Slide {
  id: number;
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  sub: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  img: string;
  link: string;
}

const slidesData: Slide[] = [
  {
    id: 1,
    eyebrow: "Empower Your Business",
    titlePrefix: "",
    titleHighlight: "MSME",
    titleSuffix: " Loan",
    sub: "Empowering Small & Medium Enterprises — Fuel Your Business Expansion.",
    primaryLabel: "Check Rates →",
    primaryHref: "msme-loan",
    secondaryLabel: "Contact Us",
    secondaryHref: "contact",
    img: msmeLoan,
    link: "msme-loan",
  },
  {
    id: 2,
    eyebrow: "Grow Your Micro Business",
    titlePrefix: "",
    titleHighlight: "Mudra",
    titleSuffix: " Loan",
    sub: "Accessible Credit for Micro Enterprises — Your First Step Toward Business Success.",
    primaryLabel: "Check Rates →",
    primaryHref: "mudra-loan",
    secondaryLabel: "Contact Us",
    secondaryHref: "contact",
    img: mudraLoan,
    link: "mudra-loan",
  },
  {
    id: 3,
    eyebrow: "Make Your Dream Home Real",
    titlePrefix: "",
    titleHighlight: "Home",
    titleSuffix: " Loan",
    sub: "Buy, Build or Renovate with Confidence — Affordable EMI, Faster Approval.",
    primaryLabel: "Check Rates →",
    primaryHref: "home-loan",
    secondaryLabel: "Contact Us",
    secondaryHref: "contact",
    img: homeLoan,
    link: "home-loan",
  },
  {
    id: 4,
    eyebrow: "Grow your",
    titlePrefix: "",
    titleHighlight: "LAP ",
    titleSuffix: "Loan",
    sub: "Turn Your Property Into Financial Strength — Big Loans Made Affordable.",
    primaryLabel: "Check Offers →",
    primaryHref: "lap-loan",
    secondaryLabel: "Contact us",
    secondaryHref: "contact",
    img: lap,
    link: "lap-loan",
  },
  {
    id: 5,
    eyebrow: "Finance Your Personal Needs",
    titlePrefix: "",
    titleHighlight: "Personal",
    titleSuffix: " Loan",
    sub: "Get Money When You Need It Most — Fast, Flexible Personal Finance.",
    primaryLabel: "Check EMI →",
    primaryHref: "personal-loan",
    secondaryLabel: "Contact us",
    secondaryHref: "contact",
    img: personalLoan,
    link: "personal-loan",
  },
  {
    id: 6,
    eyebrow: "Drive Your Dream Car",
    titlePrefix: "",
    titleHighlight: "Car",
    titleSuffix: " Loan",
    sub: "Get the Key to Your New Car.",
    primaryLabel: "Compare Plans →",
    primaryHref: "auto-loan",
    secondaryLabel: "Contact us",
    secondaryHref: "contact",
    img: carLoan,
    link: "auto-loan",
  },
];

const HomeSlider = () => {
  const [current, setCurrent] = useState<number>(0);
  const [isHover, setIsHover] = useState<boolean>(false);
  const total = slidesData.length;

  // auto slide, hover pe pause
  useEffect(() => {
    const id = setInterval(() => {
      if (!isHover) {
        setCurrent((prev) => (prev + 1) % total);
      }
    }, 4500);
    return () => clearInterval(id);
  }, [total, isHover]);

  const goTo = (index: number) => {
    setCurrent(index < 0 ? total - 1 : index % total);
  };

  return (
    <section className="mt-[-30px]">
      <div
        className="relative w-full bg-[#f5fff8]  overflow-hidden flex items-center py-4 md:py-0"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        {/* SLIDES STRIP */}
        <div
          className="flex w-full transition-transform duration-700 ease-[cubic-bezier(.22,.9,.35,1)]"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slidesData.map((slide) => (
            <div
              key={slide.id}
              className="w-full shrink-0 flex justify-center"
              onClick={() => (window.location.href = slide.link)}
            >
              {/* inner layout */}
              <div className="max-w-6xl pt-8 w-full mx-auto flex flex-col md:flex-row items-center md:items-center justify-between gap-4 md:gap-6 px-3 md:px-4">
                {/* LEFT CONTENT */}
                <div className="flex-1 w-full flex flex-col items-center text-center md:items-start md:text-left md:mt-4">
                  <p className="text-[#390A5D] font-semibold mb-1 text-sm md:text-base">
                    {slide.eyebrow}
                  </p>

                  <h2 className="text-[28px] md:text-[40px] font-extrabold leading-tight text-[#390A5D] mb-2">
                    {slide.titlePrefix}
                    <span className="text-[#10662A]">
                      {slide.titleHighlight}
                    </span>
                    {slide.titleSuffix}
                  </h2>

                  <p className="text-[14px] md:text-[17px] text-[#390A5D] mb-4 md:mb-5 max-w-2xl">
                    {slide.sub}
                  </p>

                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    <a
                      href={slide.primaryHref}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-2 bg-[#10662A] text-white px-6 py-2.5 rounded-md font-semibold shadow-md hover:shadow-lg text-sm md:text-base"
                    >
                      {slide.primaryLabel}
                    </a>

                    <a
                      href={slide.secondaryHref}
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center justify-center gap-2 bg-white text-[#10662A] border border-[#d8efe6] px-6 py-2.5 rounded-md font-semibold text-sm md:text-base"
                    >
                      {slide.secondaryLabel}
                    </a>
                  </div>
                </div>

                {/* RIGHT IMAGE */}
                <div className="flex-1 w-full flex justify-center md:justify-end">
                  {/* fixed height box so sab images top se same distance par */}
                  <div className="w-full max-w-[270px] md:max-w-[320px] h-[210px] md:h-[240px] flex items-start">
                    <img
                      src={slide.img}
                      alt="loan visual"
                      className="w-full h-full object-contain rounded-md"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LEFT ARROW */}
        <button
          type="button"
          aria-label="Previous slide"
          onClick={(e) => {
            e.stopPropagation();
            goTo(current - 1);
          }}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-xl z-10"
        >
          ‹
        </button>

        {/* RIGHT ARROW */}
        <button
          type="button"
          aria-label="Next slide"
          onClick={(e) => {
            e.stopPropagation();
            goTo(current + 1);
          }}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-11 md:h-11 rounded-full bg-white shadow-lg flex items-center justify-center text-xl z-10"
        >
          ›
        </button>

        {/* DOTS */}
        <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
          {slidesData.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goTo(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-transform ${
                index === current
                  ? "bg-[#2ea46d] scale-110"
                  : "bg-black/15 hover:bg-black/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeSlider;

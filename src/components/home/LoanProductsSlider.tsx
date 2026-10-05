import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

// images same hi rahengi
import msmeLoan from "../../assets/images/msme-loan.png";
import mudraLoan from "../../assets/images/mudra-loan.png";
import homeLoan from "../../assets/images/home-loan.png";
import lap from "../../assets/images/lap.png";
import personalLoan from "../../assets/images/personal-loan.png";
import autoLoan from "../../assets/images/auto-loan.png";
import machinery from "../../assets/images/Machinery-loan.png";
import creditcards from "../../assets/images/creditcard.png";
import educationloan from "../../assets/images/education-loan.png";

const loanProducts = [
  { title: "MSME Business Loan up to ₹5 Crore", img: msmeLoan, points: ["working capital support","business expansion & machinery","gst / itr / bank statement"], link: "/msme-loan" },
  { title: "Business Loan up to ₹5 Crore", img: msmeLoan, points: ["unsecured & secured options","quick processing","flexible tenure"], link: "/business-loan" },
  { title: "Mudra loan upto ₹10 lac", img: mudraLoan, points: ["shishu / kishore / tarun loan","gst / trade income","bank statement 6 months"], link: "/mudra-loan" },
  { title: "Home loan upto ₹25 cr.", img: homeLoan, points: ["income / return details","bank statement 6 months","property I.D documents"], link: "/home-loan" },
  { title: "LAP loan upto ₹10 cr.", img: lap, points: ["residential / commercial property","itr & financials","bank statement 6–12 months"], link: "/lap-loan" },
  { title: "Personal loan upto ₹1 cr.", img: personalLoan, points: ["income / return details","bank statement 6 months","personal & address proof"], link: "/personal-loan" },
  { title: "Auto loan upto ₹5 cr.", img: autoLoan, points: ["income / return details","bank statement 6 months","vehicle & I.D documents"], link: "/auto-loan" },
  { title: "Education loan upto ₹1.5 cr.", img: educationloan, points: ["india & abroad studies","moratorium available","co-applicant required"], link: "/education-loan" },
  { title: "Machinery loan upto ₹3 cr.", img: machinery, points: ["new / used machinery","business expansion","easy EMI options"], link: "/machinery-loan" },
  { title: "Credit Card", img: creditcards, points: ["lifetime free cards","instant approval","reward benefits"], link: "/credit-cards" },
];

const LoanProductsSlider = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = loanProducts.length;

  // 🔥 AUTO SLIDE (ALL DEVICES)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((p) => (p + 1) % total);
    }, 3500);
    return () => clearInterval(interval);
  }, [total]);

  // 🔥 SCROLL (ALL DEVICES)
  useEffect(() => {
    if (!sliderRef.current) return;

    const container = sliderRef.current;
    const card = container.querySelector<HTMLDivElement>("[data-card]");
    if (!card) return;

    const gap = 16; // gap-4
    const cardWidth = card.offsetWidth + gap;

    container.scrollTo({
      left: current * cardWidth,
      behavior: "smooth",
    });
  }, [current]);

  return (
    <section className="w-full bg-gradient-to-b from-white to-green-50 py-4">
      <div className="max-w-7xl mx-auto px-4 relative">

        <h2 className="text-center text-2xl font-bold text-[#10662A] mb-2">
          Loan Products Offered by RupeeDial
        </h2>
  <p className="text-[14px] font-semibold text-[#390A5D] text-center">
          We offer MSME business loans, Mudra loans, personal loans, home loans,
          loan against property, education loans, machinery loans and credit cards
          through trusted bank & NBFC partners.
        </p>
        {/* SLIDER */}
        <div
          ref={sliderRef}
          className="flex gap-4 mt-4 overflow-x-hidden scroll-smooth"
        >
          {loanProducts.map((loan) => (
            <div
              key={loan.title}
              data-card
              className="
                flex-shrink-0
                w-[90vw] sm:w-[48%] lg:w-[32%]
              "
            >
              <div className="bg-white rounded-xl shadow p-5 min-h-[220px] flex">

                <div className="flex flex-col justify-between w-[65%]">
                  <div>
                    <h3 className="text-[#10662A] font-semibold text-[16px] mb-2 line-clamp-2">
                      {loan.title}
                    </h3>
                    <ul className="text-xs text-[#390A5D] list-disc list-inside space-y-1">
                      {loan.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Link to={loan.link} className="bg-[#10662A] text-white text-xs px-3 py-1.5 rounded-md font-semibold">
                      Apply Now
                    </Link>
                    <Link to={loan.link} className="border border-[#10662A] text-xs text-[#10662A] px-3 py-1.5 rounded-md">
                      More Details
                    </Link>
                  </div>
                </div>

                <div className="w-[35%] flex items-center justify-center">
                  <img src={loan.img} alt={loan.title} className="max-w-[120px] max-h-[120px] object-contain" />
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* DOTS */}
        <div className="flex justify-center gap-2 mt-6">
          {loanProducts.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2.5 h-2.5 rounded-full ${i === current ? "bg-[#10662A]" : "bg-gray-300"}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default LoanProductsSlider;


    
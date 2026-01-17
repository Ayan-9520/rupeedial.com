// src/components/home/HomeContent.tsx

import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import eligibility from "../../assets/images/eligibility.png";
import image from "../../assets/images/image.png";
import personalLoan from "../../assets/images/personal-loan.png";
import homeLoan from "../../assets/images/home-loan.png";
import mudraLoan from "../../assets/images/mudra-loan.png";
import autoLoan from "../../assets/images/auto-loan.png";
import msmeLoan from "../../assets/images/msme-loan.png";
import lap from "../../assets/images/lap.png";

import sbi from "../../assets/images/sbi.png";
import bob from "../../assets/images/bob.png";
import pnb from "../../assets/images/pnb.png";
import indian from "../../assets/images/indian-bank.png";
import canara from "../../assets/images/canara.png";
import central from "../../assets/images/central.png";
import axis from "../../assets/images/axis.png";
import bandhan from "../../assets/images/bandhan.jpg";
import idbi from "../../assets/images/idbi.png";
import kotak from "../../assets/images/kotak.png"
import au from "../../assets/images/au.jpg"
import hdbi from "../../assets/images/hdbi.jpg"
import tcl from "../../assets/images/tcl-logo.webp"
import bajaj from "../../assets/images/bajaj.jpg"
import mahindra from "../../assets/images/mahindra.jpg"
import boi from "../../assets/images/boi.png";
import uco from "../../assets/images/uco.png";
import union from "../../assets/images/union.png";
import ios from "../../assets/images/ios.jpg";
import hdfc from "../../assets/images/hdfc-b.png";
import icici from "../../assets/images/icici.png";
import yes from "../../assets/images/yes.png";
import psb from "../../assets/images/psb.jpg";
import maharastra from "../../assets/images/maharastra.png";

import yashpal from "../../assets/images/yashpal.jpg";
import vipin from "../../assets/images/vipin.jpg";

import msme from "../../assets/images/msme.png";
import rxil from "../../assets/images/rxil.png";
import gst from "../../assets/images/gst.png";
import udyog from "../../assets/images/udhyog.png";
import gem from "../../assets/images/gem.png";
import udyam from "../../assets/images/udyam.png";
import mudra from "../../assets/images/mudra.png";

const stats = [
  { label: "Partner Banks", value: "20+" },
  { label: "Journeys Completed", value: "7.5 lac+" },
  { label: "Loans Disbursed", value: "74,000 cr.+" },
  { label: "Video Testimonials", value: "6,300+" },
];

// 6 cards + link
const loanProducts = [
  {
    title: "MSME loan upto ₹5 cr.",
    img: msmeLoan,
    points: [
      "working capital support",
      "business expansion & machinery",
      "gst / itr / bank statement",
    ],
    link: "/msme-loan",
  },
  {
    title: "Mudra loan upto ₹10 lac",
    img: mudraLoan,
    points: [
      "shishu / kishore / tarun loan",
      "gst / trade income",
      "bank statement 6 months",
    ],
    link: "/mudra-loan",
  },
  {
    title: "Home loan upto ₹25 cr.",
    img: homeLoan,
    points: [
      "income / return details",
      "bank statement 6 months",
      "property I.D documents",
    ],
    link: "/home-loan",
  },
  {
    title: "LAP loan upto ₹10 cr.",
    img: lap,
    points: [
      "residential / commercial property",
      "itr & financials",
      "bank statement 6–12 months",
    ],
    link: "/lap-loan",
  },
  {
    title: "Personal loan upto ₹1 cr.",
    img: personalLoan,
    points: [
      "income / return details",
      "bank statement 6 months",
      "personal & address proof",
    ],
    link: "/personal-loan",
  },
  {
    title: "Auto loan upto ₹5 cr.",
    img: autoLoan,
    points: [
      "income / return details",
      "bank statement 6 months",
      "vehicle & I.D documents",
    ],
    link: "/auto-loan",
  },
];

const stories = [
  {
    name: "Yashpal Singh.",
    city: "Delhi • 2 months ago",
    img: yashpal,
    text: "Amazing service — got my loan processed quickly. Documents were verified within a day and team followed up constantly.",
  },
  {
    name: "Vipin Bhel",
    city: "Mumbai • 1 month ago",
    img: vipin,
    text: "Smooth experience. Competitive interest rate and the digital process saved a lot of time. Highly recommended.",
  },
  {
    name: "Anita S.",
    city: "Bengaluru • 3 months ago",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "Quick approvals and great support. The dashboard to track the application was very useful.",
  },
  {
    name: "Vikram P.",
    city: "Chennai • 2 weeks ago",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "Excellent — bank partners offered multiple options and I chose the best one. Team was friendly.",
  },
  {
    name: "Sunita M.",
    city: "Hyderabad • 10 days ago",
    img: "https://randomuser.me/api/portraits/women/22.jpg",
    text: "Very helpful service. Document upload was simple and the whole process was transparent.",
  },
  {
    name: "Arjun S.",
    city: "Pune • 4 days ago",
    img: "https://randomuser.me/api/portraits/men/88.jpg",
    text: "Fast disbursal and clear communication. Would use again for my next loan needs.",
  },
];

// ---- Partner Banks (same order as lenders page, 6 cards per row) ----
type BankLogo = {
  name: string;
  logo?: string; // optional: card tab bhi rahega, logo ho to dikhega
};

const bankLogos: BankLogo[] = [
  // Row 1
  { name: "Punjab & Sind Bank", logo: psb }, // no logo file
  { name: "Union Bank of India", logo: union },
  { name: "Bank of Baroda", logo: bob },
  { name: "Bank of India (BOI)", logo: boi },
  { name: "Indian Bank", logo: indian },
  { name: "Canara Bank", logo: canara },

  // Row 2
  { name: "Indian Overseas Bank", logo: ios }, // no logo file
  { name: "Bank of Maharashtra", logo: maharastra },
  { name: "Central Bank of India", logo: central },
  { name: "UCO Bank", logo: uco },
  { name: "Punjab National Bank", logo: pnb },
  { name: "State Bank of India", logo: sbi },

  // Row 3
  { name: "HDFC Bank", logo: hdfc }, // no logo file
  { name: "Axis Bank", logo: axis },
  { name: "Yes Bank", logo: yes },
  { name: "Bandhan Bank", logo: bandhan }, // no logo file
  { name: "Kotak Mahindra Prime", logo: kotak }, // no logo file
  { name: "AU Small Finance Bank", logo: au }, // no logo file

  // Row 4
  { name: "ICICI Bank", logo: icici },
  { name: "IDBI Bank", logo: idbi },
  { name: "HDB Financial Services", logo: hdbi }, // no logo file
  { name: "Tata Capital", logo: tcl }, // no logo file
  { name: "Bajaj Finance", logo: bajaj }, // no logo file
  { name: "Mahindra Finance", logo: mahindra }, // no logo file
];

const relatedServices = [
  { alt: "msme", src: msme },
  { alt: "rxil", src: rxil },
  { alt: "gst", src: gst },
  { alt: "udyog", src: udyog },
  { alt: "gem", src: gem },
  { alt: "udyam", src: udyam },
  { alt: "mudra", src: mudra },
];

const HomeContent: React.FC = () => {
  const storiesRef = useRef<HTMLDivElement | null>(null);

  const scrollStories = (direction: "left" | "right") => {
    if (!storiesRef.current) return;
    const amount = 280;
    storiesRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const speed = 1;
    const intervalTime = 30;

    const interval = setInterval(() => {
      const el = storiesRef.current;
      if (!el) return;

      const maxScrollLeft = el.scrollWidth - el.clientWidth;

      if (el.scrollLeft >= maxScrollLeft) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft = el.scrollLeft + speed;
      }
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-white">
      {/* HERO */}
      <section
        id="slider-sec"
        aria-label="Hero section: Check eligibility"
        className="bg-white"
      >
        <div className="w-full bg-white">
          <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              {/* LEFT CONTENT */}
              <div className="flex-1 max-w-xl text-center md:text-left">
                <h1 className="text-[22px] md:text-[26px] font-black text-[#10662A] leading-tight mb-2">
                  Check online eligibility with comparison across Top Banks
                </h1>
                <h2 className="text-[18px] text-[#390A5D] font-semibold mb-3">
                  Multiple Eligibility from Top Financial Institutions
                </h2>
                <p className="text-[14px] md:text-[15px] text-[#390A5D] mb-4">
                  Get instant indicative quotes from multiple lenders. Compare
                  rates, EMIs and choose the best offer that fits your needs.
                </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center rounded-md bg-[#10662A] border border-[#10662A] px-4 py-2 text-sm font-semibold text-white"
                  >
                    Compare Loan Rates
                  </a>
                  <Link
                    to="/expert"
                    className="inline-flex items-center rounded-md border border-[#10662A] px-4 py-2 text-sm font-bold text-[#10662A] bg-white"
                  >
                    Talk to an Expert
                  </Link>
                </div>
              </div>

              {/* RIGHT IMAGE */}
              <div className="flex-1 flex justify-center md:justify-end">
                <div className="w-full max-w-[420px]">
                  <img
                    src={eligibility}
                    alt="Compare loan rates across banks"
                    className="w-full h-[260px] md:h-[280px] object-contain rounded-md"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        className="w-full bg-[#F5FFF8] py-6 md:py-8"
        aria-label="key stats"
      >
        <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-10 px-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <h2 className="text-[22px] md:text-[24px] text-[#10662A] font-bold">
                {s.value}
              </h2>
              <p className="mt-1 text-[16px] text-[#390A5D]">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* APPLY / CHOOSE SECTION */}
      <section className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-center text-[22px] md:text-[26px] text-[#10662A] font-bold mb-6">
          Get digital loan approval in 5 minutes
        </h1>

        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-10">
          {/* LEFT CONTENT */}
          <div className="flex-1 text-center  md:text-left">
            <h3 className="text-[22px] md:text-[26px] font-semibold text-[#10662A] mb-4">
              Apply, Choose, Get loan
            </h3>
            <ul className="space-y-2 text-[15px] text-[#390A5D] inline-block text-left">
              <li>one application</li>
              <li>multiple banks</li>
              <li>multiple loan offers</li>
              <li>comfort of your home</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/msme-loan"
                className="bg-[#10662A] text-white px-4 py-2 rounded-md text-sm font-semibold shadow-md"
              >
                apply now
              </Link>
              <Link
                to="/msme-loan"
                className="border border-[#10662A] text-[#10662A] px-4 py-2 rounded-md text-sm font-semibold"
              >
                more details
              </Link>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-[0_0_380px] flex justify-center md:justify-end">
            <img
              src={image}
              alt="illustration"
              className="w-full max-w-[320px] rounded-md object-contain"
            />
          </div>
        </div>
      </section>

      {/* BOTTOM 3 BOXES */}
      <section className="max-w-[600px]  mx-auto px-4 pb-10">
        <div className="flex flex-wrap  justify-between gap-4">
          <div className="flex-1 min-w-[160px] text-center bg-white border border-gray-100 rounded-xl shadow-[0_6px_20px_rgba(16,102,42,0.15)] px-4 py-5 flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828743.png"
              alt="CGTMSE"
              className="w-12 h-12 mb-3 object-contain"
            />
            <p className="text-[14px] font-medium text-[#390A5D]">
              integrated with CGTMSE
              <br />
              (collateral free loan)
            </p>
          </div>
          <div className="flex-1 min-w-[160px] text-center bg-white border border-gray-100 rounded-xl shadow-[0_6px_20px_rgba(16,102,42,0.15)] px-4 py-5 flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828642.png"
              alt="turnaround"
              className="w-12 h-12 mb-3 object-contain"
            />
            <p className="text-[14px] font-medium text-[#390A5D]">
              minimum turnaround time
            </p>
          </div>
          <div className="flex-1 min-w-[160px] text-center bg-white border border-gray-100 rounded-xl shadow-[0_6px_20px_rgba(16,102,42,0.15)] px-4 py-5 flex flex-col items-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1828/1828859.png"
              alt="support"
              className="w-12 h-12 mb-3 object-contain"
            />
            <p className="text-[14px] font-medium text-[#390A5D]">
              365 days online customer support
            </p>
          </div>
        </div>
      </section>

      {/* 6 LOAN PRODUCT CARDS */}
      <section className="py-10 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {loanProducts.map((loan) => (
              <div
                key={loan.title}
                className="flex items-center gap-5 bg-white p-4 rounded-xl shadow-[0_6px_20px_rgba(16,102,42,0.15)]"
              >
                <div>
                  <h3 className="text-[18px] text-[#10662A] font-semibold mb-2">
                    {loan.title}
                  </h3>
                  <ul className="list-disc list-inside mb-3 text-[#390A5D] text-[14px] space-y-1">
                    {loan.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      to={loan.link}
                      className="bg-[#10662A] text-white text-xs px-3 py-1.5 rounded-md inline-flex items-center justify-center"
                    >
                      apply now
                    </Link>
                    <Link
                      to={loan.link}
                      className="border border-[#10662A] text-xs text-[#10662A] px-3 py-1.5 rounded-md inline-flex items-center justify-center"
                    >
                      more details
                    </Link>
                  </div>
                </div>

                <img
                  src={loan.img}
                  alt={loan.title}
                  className="w-[150px] md:w-[180px] object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CUSTOMER STORIES SLIDER */}
      <section className="py-10 bg-[#fffff]">
        <div className="max-w-6xl mx-auto px-4 relative">
          <h2 className="text-center text-[24px] md:text-[26px] font-semibold text-[#10662A] mb-6">
            Customer Stories
          </h2>

          <div className="relative">
            <div ref={storiesRef} className="flex gap-4 overflow-hidden pb-2">
              {stories.map((s) => (
                <article
                  key={s.name}
                  className="flex-[0_0_260px] bg-white rounded-xl shadow-md p-4 flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg overflow-hidden bg-[#f0f4ff]">
                      <img
                        src={s.img}
                        alt={s.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <strong className="block text-sm">{s.name}</strong>
                      <small className="block text-xs text-[#6b6f82]">
                        {s.city}
                      </small>
                    </div>
                  </div>
                  <p className="text-[14px] text-[#333] leading-snug">
                    {s.text}
                  </p>
                </article>
              ))}
            </div>

            <button
              type="button"
              aria-label="Previous stories"
              onClick={() => scrollStories("left")}
              className="hidden md:flex absolute left-[-18px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow items-center justify-center text-lg"
            >
              ‹
            </button>
            <button
              type="button"
              aria-label="Next stories"
              onClick={() => scrollStories("right")}
              className="hidden md:flex absolute right-[-18px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow items-center justify-center text-lg"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* PARTNER BANKS – 6 cards per row, logo + name only */}
      <section className="py-10 bg-bg-[#f5fff8]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-[24px] md:text-[26px] font-semibold text-[#10662A] mb-4">
            Partner Banks
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 justify-items-center">
            {bankLogos.map((b) => (
              <div
                key={b.name}
                className="w-[150px] h-[140px] bg-white rounded-2xl shadow-[0_10px_30px_rgba(18,28,56,0.08)] flex flex-col items-center justify-center px-3 text-center"
              >
                {b.logo && (
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-w-[72px] max-h-[40px] object-contain mb-2"
                  />
                )}
                <p className="text-[11px] sm:text-[12px] font-medium text-[#390A5D] leading-snug">
                  {b.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="text-[22px] font-bold text-[#10662A] mb-3">
            Related Services
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 mt-4">
            {relatedServices.map((r) => (
              <div
                key={r.alt}
                className="w-[100px] h-[50px] bg-white border border-black/5 rounded-lg shadow-md flex items-center justify-center px-2"
              >
                <img
                  src={r.src}
                  alt={r.alt}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomeContent;

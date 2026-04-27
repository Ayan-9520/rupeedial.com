import { useRef, useState } from "react";
import yashpal from "../../assets/images/yashpal.jpg";
import vipin from "../../assets/images/vipin.jpg";
import Anita from "../../assets/images/Anita Singh.png";
import Ayan from "../../assets/images/Ayan.jpeg";

import sbi from "../../assets/images/sbi.png";
import bob from "../../assets/images/bob.png";
import pnb from "../../assets/images/pnb.png";
import indian from "../../assets/images/indian-bank.png";
import canara from "../../assets/images/canara.png";
import central from "../../assets/images/central.png";
import axis from "../../assets/images/axis.png";
import bandhan from "../../assets/images/bandhan.jpg";
import idbi from "../../assets/images/idbi.png";
import kotak from "../../assets/images/kotak.png";
import au from "../../assets/images/au.jpg";
import hdbi from "../../assets/images/hdbi.jpg";
import tcl from "../../assets/images/tcl-logo.webp";
import bajaj from "../../assets/images/bajaj.jpg";
import mahindra from "../../assets/images/mahindra.jpg";
import boi from "../../assets/images/boi.png";
import uco from "../../assets/images/uco.png";
import union from "../../assets/images/union.png";
import ios from "../../assets/images/ios.jpg";
import hdfc from "../../assets/images/hdfc-b.png";
import icici from "../../assets/images/icici.png";
import yes from "../../assets/images/yes.png";
import psb from "../../assets/images/psb.jpg";
import maharastra from "../../assets/images/maharastra.png";

import msme from "../../assets/images/msme.png";
import rxil from "../../assets/images/rxil.png";
import gst from "../../assets/images/gst.png";
import udyog from "../../assets/images/udhyog.png";
import gem from "../../assets/images/gem.png";
import udyam from "../../assets/images/udyam.png";
import mudra from "../../assets/images/mudra.png";

/* ================= STORIES ================= */
const stories = [
  { name: "Yashpal Singh.", city: "Delhi • 2 months ago", img: yashpal, text: "Amazing service — got my loan processed quickly." },
  { name: "Vipin Bhel", city: "Mumbai • 1 month ago", img: vipin, text: "Smooth experience. Highly recommended." },
  { name: "Anita Singh", city: "Bengaluru • 3 months ago", img: Anita, text: "Quick approvals and great support." },
  { name: "Mohd Ayan", city: "Uttar Pradesh • 2 weeks ago", img: Ayan, text: "Excellent — friendly team and best offers." },
];

/* ================= BANK LOGOS ================= */
const bankLogos = [
  { name: "Punjab & Sind Bank", logo: psb },
  { name: "Union Bank of India", logo: union },
  { name: "Bank of Baroda", logo: bob },
  { name: "Bank of India", logo: boi },
  { name: "Indian Bank", logo: indian },
  { name: "Canara Bank", logo: canara },
  { name: "Indian Overseas Bank", logo: ios },
  { name: "Bank of Maharashtra", logo: maharastra },
  { name: "Central Bank of India", logo: central },
  { name: "UCO Bank", logo: uco },
  { name: "Punjab National Bank", logo: pnb },
  { name: "State Bank of India", logo: sbi },
  { name: "HDFC Bank", logo: hdfc },
  { name: "Axis Bank", logo: axis },
  { name: "Yes Bank", logo: yes },
  { name: "Bandhan Bank", logo: bandhan },
  { name: "Kotak Mahindra", logo: kotak },
  { name: "AU Small Finance Bank", logo: au },
  { name: "ICICI Bank", logo: icici },
  { name: "IDBI Bank", logo: idbi },
  { name: "HDB Financial", logo: hdbi },
  { name: "Tata Capital", logo: tcl },
  { name: "Bajaj Finance", logo: bajaj },
  { name: "Mahindra Finance", logo: mahindra },
];

/* ================= RELATED SERVICES ================= */
const relatedServices = [
  { alt: "msme", src: msme },
  { alt: "rxil", src: rxil },
  { alt: "gst", src: gst },
  { alt: "udyog", src: udyog },
  { alt: "gem", src: gem },
  { alt: "udyam", src: udyam },
  { alt: "mudra", src: mudra },
];

/* ================= FAQ ================= */
const faqs = [
  {
    q: "Is RupeeDial a direct loan provider?",
    a: "No. RupeeDial is a loan assistance and comparison platform. We help customers compare loan offers across multiple banks and NBFCs.",
  },
  {
    q: "Do you charge any fees?",
    a: "RupeeDial does not charge any advance or hidden fees. All approvals are subject to bank or NBFC policies.",
  },
  {
    q: "Which loans can I compare on RupeeDial?",
    a: "You can compare MSME loans, personal loans, home loans, Mudra loans, LAP, education loans and business loans.",
  },
  {
    q: "Is my data safe on RupeeDial?",
    a: "Yes. We follow secure data handling practices and work only with verified banking partners.",
  },
];

const HomeBottomSection = () => {
  const storiesRef = useRef<HTMLDivElement | null>(null);
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const scrollStories = (dir: "left" | "right") => {
    if (!storiesRef.current) return;
    storiesRef.current.scrollBy({
      left: dir === "left" ? -320 : 320,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ================= CUSTOMER STORIES ================= */}
      <section className="py-10 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-[26px] font-semibold text-[#10662A] mb-6">
            Trusted by Customers Across India
          </h2>

          {/* ✅ RELATIVE WRAPPER (KEY FIX) */}
          <div className="relative">
            {/* SLIDER */}
          <div
  ref={storiesRef}
  className="flex gap-4 overflow-hidden scroll-smooth px-[7.5%] pb-4"
>
  {stories.map((s) => (
    <article
      key={s.name}
      className="flex-shrink-0 w-[260px] bg-white rounded-xl shadow p-4"
    >
                  <div className="flex items-center gap-3 mb-2">
                    <img
                      src={s.img}
                      alt={s.name}
                      className="w-11 h-11 rounded-lg object-cover"
                    />
                    <div>
                      <strong className="block text-sm">{s.name}</strong>
                      <small className="text-xs text-gray-500">{s.city}</small>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{s.text}</p>
                </article>
              ))}
            </div>

            {/* LEFT ARROW */}
            <button
              onClick={() => scrollStories("left")}
              className="
                absolute left-2 sm:left-[-18px]
                top-1/2 -translate-y-1/2
                w-9 h-9 bg-white shadow rounded-full
                flex items-center justify-center z-20
              "
            >
              ‹
            </button>

            {/* RIGHT ARROW */}
            <button
              onClick={() => scrollStories("right")}
              className="
                absolute right-2 sm:right-[-18px]
                top-1/2 -translate-y-1/2
                w-9 h-9 bg-white shadow rounded-full
                flex items-center justify-center z-20
              "
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="py-6 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#390A5D]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-[#10662A] text-sm md:text-base">
              Everything you need to know about RupeeDial loan services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((f, i) => (
              <div key={i} className="bg-white rounded-xl shadow">
                <button
                  onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  className="w-full flex justify-between items-center px-6 py-4"
                >
                  <h3 className="font-semibold text-[#10662A]">{f.q}</h3>
                  <span>{openFAQ === i ? "−" : "+"}</span>
                </button>
                {openFAQ === i && (
                  <div className="px-6 pb-4 text-sm text-[#390A5D]">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BANKS ================= */}
      <section className="py-10 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-[26px] font-semibold text-[#10662A] mb-6">
            Our Bank & NBFC Partners
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {bankLogos.map((b) => (
              <div key={b.name} className="bg-white p-4 rounded-xl shadow text-center">
                <img src={b.logo} alt={b.name} className="mx-auto max-h-10 mb-2" />
                <p className="text-xs text-[#390A5D]">{b.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= RELATED SERVICES ================= */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-[22px] font-bold text-[#10662A] mb-4">
            Related Services
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {relatedServices.map((r) => (
              <div key={r.alt} className="w-[100px] h-[50px] border rounded-lg shadow flex items-center justify-center">
                <img src={r.src} alt={r.alt} className="max-h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <p className="text-xs text-center text-[#390A5D] mb-4 max-w-4xl mx-auto">
        RupeeDial is a loan assistance & comparison platform. We do not provide loans directly.
        Final approval is subject to bank & NBFC policies.
      </p>
    </>
  );
};

export default HomeBottomSection;

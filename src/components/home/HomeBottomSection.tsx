import { useRef } from "react";

import yashpal from "../../assets/images/yashpal.jpg";
import vipin from "../../assets/images/vipin.jpg";

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

// ================= STORIES =================
const stories = [
  { name: "Yashpal Singh.", city: "Delhi • 2 months ago", img: yashpal, text: "Amazing service — got my loan processed quickly." },
  { name: "Vipin Bhel", city: "Mumbai • 1 month ago", img: vipin, text: "Smooth experience. Highly recommended." },
  { name: "Anita S.", city: "Bengaluru • 3 months ago", img: "https://randomuser.me/api/portraits/women/65.jpg", text: "Quick approvals and great support." },
  { name: "Vikram P.", city: "Chennai • 2 weeks ago", img: "https://randomuser.me/api/portraits/men/12.jpg", text: "Excellent — friendly team and best offers." },
];

// ================= BANK LOGOS =================
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

// ================= RELATED SERVICES =================
const relatedServices = [
  { alt: "msme", src: msme },
  { alt: "rxil", src: rxil },
  { alt: "gst", src: gst },
  { alt: "udyog", src: udyog },
  { alt: "gem", src: gem },
  { alt: "udyam", src: udyam },
  { alt: "mudra", src: mudra },
];

const HomeBottomSection = () => {
  const storiesRef = useRef<HTMLDivElement | null>(null);

  const scrollStories = (direction: "left" | "right") => {
    if (!storiesRef.current) return;
    storiesRef.current.scrollBy({
      left: direction === "left" ? -280 : 280,
      behavior: "smooth",
    });
  };

  return (
    <>
    
      {/* ===== CUSTOMER STORIES ===== */}
      <section className="py-10 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4 relative">
          <h2 className="text-center text-[26px] font-semibold text-[#10662A] mb-6">
            Customer Stories
          </h2>

          <div ref={storiesRef} className="flex gap-4 overflow-hidden pb-2">
            {stories.map((s) => (
              <article key={s.name} className="flex-[0_0_260px] bg-white rounded-xl shadow p-4">
                <div className="flex items-center gap-3 mb-2">
                  <img src={s.img} className="w-11 h-11 rounded-lg object-cover" />
                  <div>
                    <strong className="block text-sm">{s.name}</strong>
                    <small className="text-xs text-gray-500">{s.city}</small>
                  </div>
                </div>
                <p className="text-sm text-gray-700">{s.text}</p>
              </article>
            ))}
          </div>

          <button onClick={() => scrollStories("left")} className="absolute left-[-18px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow rounded-full">‹</button>
          <button onClick={() => scrollStories("right")} className="absolute right-[-18px] top-1/2 -translate-y-1/2 w-8 h-8 bg-white shadow rounded-full">›</button>
        </div>
      </section>

      {/* ===== PARTNER BANKS ===== */}
      <section className="py-10 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-[26px] font-semibold text-[#10662A] mb-6">
            Partner Banks
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {bankLogos.map((b) => (
              <div key={b.name} className="bg-white p-4 rounded-xl shadow text-center">
                <img src={b.logo} className="mx-auto max-h-10 mb-2" />
                <p className="text-xs text-[#390A5D]">{b.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== RELATED SERVICES ===== */}
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-[22px] font-bold text-[#10662A] mb-4">
            Related Services
          </h3>

          <div className="flex flex-wrap justify-center gap-6">
            {relatedServices.map((r) => (
              <div key={r.alt} className="w-[100px] h-[50px] border rounded-lg shadow flex items-center justify-center">
                <img src={r.src} className="max-h-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeBottomSection;

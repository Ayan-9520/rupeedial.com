import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0A3F1C] pt-12 pb-6 mt-10">
      <div className="max-w-7xl mx-auto px-6">

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-[#B0E9B2] font-extrabold text-2xl mb-3">
              Rupee<span className="text-white">Dial</span>
            </h2>
            <p className="text-white/80 text-sm leading-relaxed">
              Empowering India with smarter financial solutions.
              Compare, apply, and get instant approvals from trusted banking partners.
            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-[#B0E9B2] font-bold text-sm mb-4">
              Contact Us
            </h3>

            <ul className="space-y-4 text-sm text-white/85">
              <li className="flex items-start gap-3">
  <div className="h-9 w-9 flex-shrink-0 bg-[#F5FFF8] rounded-full flex items-center justify-center shadow mt-1">
    <FaMapMarkerAlt className="text-[#0A3F1C]" />
  </div>
  <span className="leading-relaxed">
    Office No. 292, Anarkali Commercial Complex,
    Jhandewalan, Near Videocon Tower,
    New Delhi – 110055, India
  </span>
</li>


              <li className="flex items-center gap-3">
                <div className="h-9 w-9 bg-[#F5FFF8] rounded-full flex items-center justify-center shadow">
                  <FaPhoneAlt className="text-[#0A3F1C]" />
                </div>
                <a href="tel:+917982953129" className="hover:text-white">
                  +91 79829 53129
                </a>
              </li>

              <li className="flex items-center gap-3">
                <div className="h-9 w-9 bg-[#F5FFF8] rounded-full flex items-center justify-center shadow">
                  <FaEnvelope className="text-[#0A3F1C]" />
                </div>
                <a
                  href="mailto:info@rupeedial.com"
                  className="hover:text-white"
                >
                  info@rupeedial.com
                </a>
              </li>
            </ul>
          </div>

          {/* LOAN LINKS */}
          <div>
            <h3 className="text-[#B0E9B2] font-bold text-sm mb-4">
              Loan Services
            </h3>
            <ul className="space-y-2 text-sm text-white/85">
              <li><Link to="/msme-loan" className="hover:text-white">MSME Loan</Link></li>
              <li><Link to="/mudra-loan" className="hover:text-white">Mudra Loan</Link></li>
              <li><Link to="/home-loan" className="hover:text-white">Home Loan</Link></li>
              <li><Link to="/lap-loan" className="hover:text-white">LAP Loan</Link></li>
              <li><Link to="/personal-loan" className="hover:text-white">Personal Loan</Link></li>
              <li><Link to="/auto-loan" className="hover:text-white">Auto Loan</Link></li>
              <li><Link to="/credit-cards" className="hover:text-white">Credit Cards</Link></li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[#B0E9B2] font-bold text-sm mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/85">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/expert" className="hover:text-white">Talk to Expert</Link></li>
              <li><Link to="/eligibility" className="hover:text-white">Check Eligibility</Link></li>
              <li><Link to="/learn&earn" className="hover:text-white">Learn & Earn</Link></li>
              <li><Link to="/insurance" className="hover:text-white">Insurance</Link></li>
              <li><Link to="/career" className="hover:text-white">Career</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              <li><Link to="/login" className="hover:text-white">Login</Link></li>
            </ul>
          </div>
        </div>

        {/* SOCIAL ICONS */}
        <div className="mt-10 flex items-center justify-center gap-4">
          {[
            { icon: <FaInstagram />, link: "#" },
            { icon: <FaFacebookF />, link: "#" },
            { icon: <FaTwitter />, link: "#" },
            { icon: <FaWhatsapp />, link: "#" },
            { icon: <FaLinkedinIn />, link: "#" },
          ].map((item, idx) => (
            <a
              key={idx}
              href={item.link}
              className="
                h-10 w-10 flex items-center justify-center rounded-full
                bg-[#F5FFF2] text-[#0A3F1C] text-lg
                transition-all duration-300
                hover:bg-[#0A3F1C] hover:text-white hover:scale-110
                shadow-md
              "
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* COPYRIGHT */}
        <p className="text-center text-xs text-white/70 mt-8 pt-5 border-t border-white/20">
          © {new Date().getFullYear()} RupeeDial.com — All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

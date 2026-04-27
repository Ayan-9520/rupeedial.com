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
    <footer className="bg-[#0A3F1C] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* ================= TOP : BRAND + CONTACT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* BRAND */}
          <div>
            <h2 className="text-[#B0E9B2] font-extrabold text-2xl mb-3">
              Rupee<span className="text-white">Dial</span>
            </h2>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
            Empowering India with smart loan & insurance solutions — compare offers, check eligibility and get expert assistance from trusted banks and NBFCs.

            </p>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-[#B0E9B2] font-semibold text-base mb-4">
              Contact Information
            </h3>

            <ul className="space-y-4 text-sm text-white/85">

              {/* ADDRESS */}
              <li className="flex items-start gap-3">
                <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5FFF8]">
                  <FaMapMarkerAlt className="text-[#0A3F1C]" />
                </span>
                <span className="leading-relaxed">
                  Office No. 292, Anarkali Commercial Complex,<br />
                  Jhandewalan, Near Videocon Tower,<br />
                  New Delhi – 110055, India
                </span>
              </li>

              {/* PHONE */}
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5FFF8]">
                  <FaPhoneAlt className="text-[#0A3F1C]" />
                </span>
                <a href="tel:+917982953129" className="hover:text-white">
                  +91 79829 53129
                </a>
              </li>

              {/* EMAIL */}
              <li className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F5FFF8]">
                  <FaEnvelope className="text-[#0A3F1C]" />
                </span>
                <a
                  href="mailto:contact@rupeedial.com"
                  className="hover:text-white break-all"
                >
                  contact@rupeedial.com
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-8 border-t border-white/20" />

        {/* ================= LINKS ================= */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">

          {/* LOANS */}
          <div>
            <h3 className="text-[#B0E9B2] font-semibold mb-4">
              Loan Services
            </h3>
            <ul className="space-y-2 text-sm text-white/85">
              <li><Link to="/msme-loan" className="hover:text-white">MSME Loan</Link></li>
              <li><Link to="/mudra-loan" className="hover:text-white">Mudra Loan</Link></li>
              <li><Link to="/home-loan" className="hover:text-white">Home Loan</Link></li>
              <li><Link to="/lap-loan" className="hover:text-white">Loan Against Property</Link></li>
              <li><Link to="/personal-loan" className="hover:text-white">Personal Loan</Link></li>
              <li><Link to="/auto-loan" className="hover:text-white">Auto Loan</Link></li>
              <li><Link to="/credit-cards" className="hover:text-white">Credit Cards</Link></li>
              <li><Link to="/machinery-loan" className="hover:text-white">Machinery Loan</Link></li>
              <li><Link to="/education-loan" className="hover:text-white">Education Loan</Link></li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-[#B0E9B2] font-semibold mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-white/85">
              <li><Link to="/about" className="hover:text-white">About Us</Link></li>
              <li><Link to="/expert" className="hover:text-white">Talk to Expert</Link></li>
              <li><Link to="/check-eligibility" className="hover:text-white">Check Eligibility</Link></li>
              <li><Link to="/insurance" className="hover:text-white">Insurance</Link></li>
              <li><Link to="/career" className="hover:text-white">Careers</Link></li>
              <li><Link to="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-[#B0E9B2] font-semibold mb-4">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-white/85">
              <li><Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link to="/refund-policy" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* ================= SOCIAL ================= */}
        <div className="mt-10 flex justify-center gap-4">
      <div className="mt-10 flex justify-center gap-4">

  <a
    href="https://www.instagram.com/rupee.dial/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full
    bg-[#F5FFF8] text-[#0A3F1C] text-lg
    hover:bg-[#0A3F1C] hover:text-white transition"
  >
    <FaInstagram />
  </a>

  <a
    href="https://www.facebook.com/profile.php?id=61581416535147"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full
    bg-[#F5FFF8] text-[#0A3F1C] text-lg
    hover:bg-[#0A3F1C] hover:text-white transition"
  >
    <FaFacebookF />
  </a>

  <a
    href="https://x.com/rupee_dial"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full
    bg-[#F5FFF8] text-[#0A3F1C] text-lg
    hover:bg-[#0A3F1C] hover:text-white transition"
  >
    <FaTwitter />
  </a>

  <a
  href="https://wa.me/917982953129"
  target="_blank"
  rel="noopener noreferrer"
  className="flex h-10 w-10 items-center justify-center rounded-full
  bg-[#F5FFF8] text-[#0A3F1C] text-lg
  hover:bg-[#0A3F1C] hover:text-white transition"
>
  <FaWhatsapp />
</a>

  <a
    href="https://www.linkedin.com/in/rupeedial-a4960b3b5/"
    target="_blank"
    rel="noopener noreferrer"
    className="flex h-10 w-10 items-center justify-center rounded-full
    bg-[#F5FFF8] text-[#0A3F1C] text-lg
    hover:bg-[#0A3F1C] hover:text-white transition"
  >
    <FaLinkedinIn />
  </a>

</div>
        </div>

        {/* DISCLAIMER */}
        <p className="text-center text-xs text-white/80 max-w-4xl mx-auto mt-8 leading-relaxed">
          RupeeDial is a loan assistance & comparison platform. We do not provide
          loans directly. Loan approval, interest rate and disbursal are subject
          to bank & NBFC policies.
        </p>

        {/* COPYRIGHT */}
        <p className="text-center text-xs text-white/70 mt-4 pt-4 border-t border-white/20">
          © {new Date().getFullYear()} RupeeDial.com — All Rights Reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { allProductLinks, productMenus } from "../../data/navProducts";
import {
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaWhatsapp,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaChevronDown,
} from "react-icons/fa";

const COMPANY_LINKS = [
  { to: "/about", label: "About Us" },
  { to: "/blog", label: "Blog" },
  { to: "/expert", label: "Talk to Expert" },
  { to: "/contact", label: "Contact Us" },
];

const PARTNER_LINKS = [
  { to: "/leadboard", label: "LeadBoard" },
  { to: "/partners", label: "Partner Directory" },
  { to: "/pricing", label: "Partner Pricing" },
  { to: "/partner-login", label: "Become a Partner" },
  { to: "/learn&earn", label: "Learn & Earn" },
  { to: "/career", label: "Careers" },
  { to: "/bnpl-partners", label: "BNPL Partners" },
];

const CUSTOMER_LINKS = [
  { to: "/check-eligibility", label: "Check Eligibility" },
  { to: "/insurance", label: "Insurance" },
  { to: "/personal-loan", label: "Personal Loan" },
  { to: "/home-loan", label: "Home Loan" },
];

const LEGAL_LINKS = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/refund-policy", label: "Refund Policy" },
];

const SOCIAL = [
  { href: "https://www.instagram.com/rupee.dial/", label: "Instagram", Icon: FaInstagram },
  { href: "https://www.facebook.com/profile.php?id=61581416535147", label: "Facebook", Icon: FaFacebookF },
  { href: "https://x.com/rupee_dial", label: "X", Icon: FaTwitter },
  { href: "https://wa.me/917982953129", label: "WhatsApp", Icon: FaWhatsapp },
  { href: "https://www.linkedin.com/in/rupeedial-a4960b3b5/", label: "LinkedIn", Icon: FaLinkedinIn },
];

const linkClass =
  "text-[13px] text-white/70 transition-colors duration-200 hover:text-[#B0E9B2]";

function FooterAccordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-white/10 md:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-3.5 text-left md:pointer-events-none md:cursor-default md:py-0 md:mb-4"
        aria-expanded={open}
      >
        <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#B0E9B2]">
          {title}
        </span>
        <FaChevronDown
          className={`h-3 w-3 text-[#B0E9B2]/80 transition-transform duration-300 md:hidden ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out md:!grid-rows-[1fr] ${
          open ? "grid-rows-[1fr] pb-4 md:pb-0" : "grid-rows-[0fr] md:grid-rows-[1fr]"
        }`}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}

const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden text-white">
      {/* Atmosphere */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-[#062816] via-[#0A3F1C] to-[#0d4a22]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-[#10662A]/35 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-[-10%] h-64 w-64 rounded-full bg-[#390A5D]/25 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.55) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Brand + contact */}
        <div className="grid gap-10 border-b border-white/10 py-12 lg:grid-cols-12 lg:gap-12 lg:py-14">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-block group">
              <span className="text-3xl font-extrabold tracking-tight text-[#B0E9B2] transition-colors group-hover:text-white sm:text-[2rem]">
                Rupee<span className="text-white">Dial</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/65">
              India&apos;s financial marketplace and distribution network — customers
              compare loans, partners build their finance business, with expert
              assistance from banks and NBFCs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/check-eligibility"
                className="inline-flex items-center justify-center rounded-xl bg-[#B0E9B2] px-4 py-2.5 text-sm font-semibold text-[#0A3F1C] shadow-[0_8px_24px_rgba(176,233,178,0.25)] transition-all duration-300 hover:scale-[1.02] hover:bg-white"
              >
                Check Eligibility
              </Link>
              <Link
                to="/partner-login"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#B0E9B2]/50 hover:bg-white/10"
              >
                Become a Partner
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7">
            <h3 className="mb-5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#B0E9B2]">
              Contact
            </h3>
            <ul className="grid gap-4 sm:grid-cols-2">
              <li className="sm:col-span-2 flex gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#10662A]/40 text-[#B0E9B2]">
                  <FaMapMarkerAlt className="h-4 w-4" />
                </span>
                <span className="text-sm leading-relaxed text-white/75">
                  Office No. 292, Anarkali Commercial Complex,
                  <br />
                  Jhandewalan, Near Videocon Tower,
                  <br />
                  New Delhi – 110055, India
                </span>
              </li>
              <li>
                <a
                  href="tel:+917982953129"
                  className="flex h-full items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-[#B0E9B2]/35 hover:bg-white/[0.07]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#10662A]/40 text-[#B0E9B2]">
                    <FaPhoneAlt className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      Call
                    </span>
                    <span className="text-sm font-semibold text-white">+91 79829 53129</span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@rupeedial.com"
                  className="flex h-full items-center gap-3.5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-colors hover:border-[#B0E9B2]/35 hover:bg-white/[0.07]"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-[#10662A]/40 text-[#B0E9B2]">
                    <FaEnvelope className="h-3.5 w-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/45">
                      Email
                    </span>
                    <span className="block truncate text-sm font-semibold text-white">
                      contact@rupeedial.com
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Link columns */}
        <nav className="border-b border-white/10 py-2 md:py-12" aria-label="Footer">
          {/* Desktop: products + company / partners / legal */}
          <div className="hidden md:block space-y-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 items-start">
              {productMenus.map((menu) => (
                <div key={menu.title}>
                  <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B0E9B2] leading-snug">
                    {menu.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {menu.links.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className={linkClass}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8 border-t border-white/10 pt-10">
              <div>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B0E9B2]">
                  Company
                </h3>
                <ul className="space-y-2.5">
                  {COMPANY_LINKS.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B0E9B2]">
                  Partners
                </h3>
                <ul className="space-y-2.5">
                  {PARTNER_LINKS.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B0E9B2]">
                  Customers
                </h3>
                <ul className="space-y-2.5">
                  {CUSTOMER_LINKS.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-[#B0E9B2]">
                  Legal
                </h3>
                <ul className="space-y-2.5">
                  {LEGAL_LINKS.map((link) => (
                    <li key={link.to}>
                      <Link to={link.to} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Mobile accordions */}
          <div className="md:hidden">
            <FooterAccordion title="Loan products" defaultOpen>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {allProductLinks.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
            <FooterAccordion title="Partners">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {PARTNER_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
            <FooterAccordion title="Company">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
                {[...COMPANY_LINKS, ...CUSTOMER_LINKS].map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
            <FooterAccordion title="Legal">
              <ul className="space-y-2.5">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className={linkClass}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </FooterAccordion>
          </div>
        </nav>

        {/* Bottom bar */}
        <div className="flex flex-col items-center gap-5 border-t border-white/10 py-8 sm:flex-row sm:justify-between sm:gap-6">
          <div className="flex items-center gap-2.5">
            {SOCIAL.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/[0.06] text-white/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B0E9B2]/50 hover:bg-[#B0E9B2] hover:text-[#0A3F1C]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="text-center text-[11px] leading-relaxed text-white/45 sm:text-right max-w-md">
            Loan assistance &amp; comparison platform — approval &amp; rates subject to bank / NBFC
            policies.
            <span className="mt-1 block text-white/55">
              © {new Date().getFullYear()} RupeeDial.com — All Rights Reserved.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

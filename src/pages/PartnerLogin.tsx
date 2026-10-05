import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Landmark, MapPinned, ShieldCheck } from "lucide-react";
import partner from "../assets/images/partnerlogin.png";
import PartnerApplyWizard from "../components/partner/PartnerApplyWizard";
import { PARTNER_TYPES } from "../data/partnerTypes";

const STEPS = [
  {
    title: "Apply",
    text: "Choose your partner type and submit KYC, agreement, bank, products and city.",
  },
  {
    title: "Verification",
    text: "RupeeDial reviews the application inside the CRM before any login is created.",
  },
  {
    title: "Activation",
    text: "After approval you get a login, training is assigned, and the account goes live.",
  },
];

const NEEDS = [
  { icon: BadgeCheck, title: "KYC", text: "PAN and Aadhaar" },
  { icon: Landmark, title: "Bank", text: "Account and proof" },
  { icon: MapPinned, title: "Coverage", text: "Products and city" },
  { icon: ShieldCheck, title: "Consent", text: "Agreement and contact" },
];

const BecomePartner = () => {
  useEffect(() => {
    document.title = "Become a RupeeDial Financial Partner";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Join RupeeDial as a DSA, consultant, CA, telecaller or referral partner. Complete KYC, agreement and bank details to get activated."
    );
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://rupeedial.com/become-partner");
  }, []);

  return (
    <div className="rd-market-bg">
      <section className="relative overflow-hidden py-10 sm:py-14">
        <div className="pointer-events-none absolute -left-16 top-10 h-72 w-72 rounded-full bg-[#B0E9B2]/40 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-0 h-80 w-80 rounded-full bg-[#10662A]/10 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-start gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe7d5] bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#10662A] shadow-sm">
              <ShieldCheck className="h-3.5 w-3.5" />
              RupeeDial partner network
            </span>
            <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.12] text-[#390A5D] sm:text-5xl">
              Become a RupeeDial
              <span className="block text-[#10662A]">Financial Partner</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#390A5D]/80 sm:text-lg">
              One registration for DSAs, consultants, CAs, telecallers and referral partners.
              KYC to activation, on the same platform customers use to compare loans.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-3 max-w-lg">
              {[
                ["50+", "Lender network"],
                ["24–48h", "Review time"],
                ["₹0", "Joining fee"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-2xl border border-[#d7eadb] bg-white/90 px-3 py-3 text-center shadow-sm">
                  <p className="font-display text-lg font-extrabold text-[#10662A]">{value}</p>
                  <p className="text-[11px] text-slate-500">{label}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-3xl border border-[#d7eadb] bg-white shadow-[0_20px_50px_rgba(16,102,42,0.1)]">
              <img src={partner} alt="RupeeDial partner onboarding" className="w-full object-cover" />
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {PARTNER_TYPES.map((t) => (
                <span
                  key={t.value}
                  className="rounded-full border border-[#d7eadb] bg-white px-3 py-1.5 text-xs font-semibold text-[#0D4F20] shadow-sm"
                >
                  {t.label}
                </span>
              ))}
            </div>
            <p className="mt-5 text-sm text-slate-600">
              Already approved?{" "}
              <Link to="/login" className="font-semibold text-[#10662A] underline-offset-4 hover:underline">
                Partner login
              </Link>
            </p>
          </div>
          <PartnerApplyWizard />
        </div>
      </section>

      <section className="border-t border-[#e5f3e8] bg-white py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-extrabold text-[#390A5D]">How activation works</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {STEPS.map((item, i) => (
              <li key={item.title} className="rounded-3xl border border-[#d7eadb] bg-[#F7FBF8] p-6">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-[#10662A] text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-[#390A5D]">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5c4d72]">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-center font-display text-3xl font-extrabold text-[#390A5D]">What you need</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {NEEDS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="rounded-3xl border border-[#d7eadb] bg-white p-5 shadow-sm">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#E8F7EC] text-[#10662A]">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-semibold text-[#390A5D]">{title}</h3>
                <p className="mt-1 text-sm text-[#5c4d72]">{text}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-[#5c4d72]">
            <Link to="/pricing" className="font-semibold text-[#10662A]">
              Partner plans
            </Link>
            <span className="mx-2 text-[#d7eadb]">|</span>
            <Link to="/partners" className="font-semibold text-[#10662A]">
              Partner directory
            </Link>
            <span className="mx-2 text-[#d7eadb]">|</span>
            <Link to="/learn&earn" className="font-semibold text-[#10662A]">
              Learn & Earn
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
};

export default BecomePartner;

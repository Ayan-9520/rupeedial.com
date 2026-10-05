import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Phone,
  MapPin,
  ArrowRight,
  TrendingUp,
  Building2,
  Briefcase,
  Home,
  Wallet,
} from "lucide-react";
import campare from "../../assets/images/campare.png";

const stats = [
  { value: "50+", label: "Banks & NBFCs" },
  { value: "₹500Cr+", label: "Loans Assisted" },
  { value: "10K+", label: "Happy Customers" },
  { value: "4.8★", label: "Partner Rating" },
];

const quickProducts = [
  { label: "MSME Loan", path: "/msme-loan", icon: Building2 },
  { label: "Business Loan", path: "/business-loan", icon: Briefcase },
  { label: "Home Loan", path: "/home-loan", icon: Home },
  { label: "Personal Loan", path: "/personal-loan", icon: Wallet },
];

const HomeTopSection = () => {
  return (
    <section className="relative overflow-hidden border-b border-[#d7eadb] bg-gradient-to-br from-[#F5FFF8] via-white to-[#E8F7EC]">
      <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#10662A]/8 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[#B0E9B2]/50 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid min-w-0 grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14 items-center">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe7d5] bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#10662A] shadow-sm">
              <TrendingUp className="w-3.5 h-3.5" />
              India&apos;s Financial Marketplace &amp; Distribution Network
            </div>

            <h1 className="mt-5 max-w-full text-3xl sm:text-4xl md:text-[2.45rem] font-extrabold leading-[1.15] text-[#390A5D] [overflow-wrap:anywhere]">
              Compare Loans. Get Expert Assistance.{" "}
              <span className="text-[#10662A]">Grow as a Financial Partner.</span>
            </h1>

            <p className="mt-4 text-base md:text-lg text-[#390A5D]/85 leading-relaxed max-w-xl">
              Customers compare and apply across 50+ lenders. Partners build a
              loan distribution business on the same platform.{" "}
              <span className="font-semibold text-[#10662A]">
                No advance fees. 100% transparent.
              </span>
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                { icon: ShieldCheck, text: "100% Secure" },
                { icon: Phone, text: "Expert Call 24h" },
                { icon: MapPin, text: "Pan-India" },
              ].map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#d7eadb] bg-white px-3 py-1.5 text-xs font-medium text-[#390A5D] shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-[#10662A]" />
                  {text}
                </span>
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to="/check-eligibility"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10662A] to-[#0D4F20] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_32px_rgba(16,102,42,0.28)] transition hover:scale-[1.02]"
              >
                I Need Finance
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/partner-login"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-[#10662A] px-6 py-3.5 text-center text-sm font-semibold text-[#10662A] transition hover:bg-[#10662A] hover:text-white"
              >
                I Want to Earn as a Partner
              </Link>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              {quickProducts.map(({ label, path, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#E8F7EC]/80 px-3 py-1.5 text-[11px] font-semibold text-[#10662A] transition hover:bg-[#10662A] hover:text-white"
                >
                  <Icon className="w-3 h-3" />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="relative min-w-0 max-w-full">
            <div className="rounded-3xl border border-[#d7eadb] bg-white/80 p-4 shadow-[0_24px_64px_rgba(16,102,42,0.12)] backdrop-blur-sm">
              <img
                src={campare}
                alt="Compare loans across banks in India with RupeeDial"
                loading="eager"
                width={420}
                height={360}
                className="w-full rounded-2xl"
              />
            </div>

            <div className="absolute -left-2 sm:-left-4 top-8 rounded-2xl border border-[#d7eadb] bg-white px-4 py-3 shadow-lg animate-fade-in">
              <p className="text-[10px] text-slate-500 uppercase tracking-wide">Avg. approval</p>
              <p className="text-lg font-extrabold text-[#10662A]">48 hours</p>
            </div>

            <div className="absolute -right-2 sm:-right-4 bottom-12 rounded-2xl border border-[#d7eadb] bg-gradient-to-br from-[#10662A] to-[#0D4F20] px-4 py-3 shadow-lg text-white">
              <p className="text-[10px] opacity-90">Starting rates from</p>
              <p className="text-xl font-extrabold">8.40% p.a.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-[#d7eadb] bg-white/90 px-4 py-4 text-center shadow-sm backdrop-blur-sm"
            >
              <p className="text-xl md:text-2xl font-extrabold text-[#10662A]">{s.value}</p>
              <p className="text-[11px] text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeTopSection;

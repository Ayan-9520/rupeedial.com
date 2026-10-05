import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Share2,
  Wallet,
  TrendingUp,
  Users,
  ShieldCheck,
  Zap,
  BarChart3,
  Headphones,
  CheckCircle,
  ArrowRight,
  Star,
  GraduationCap,
  Home,
  Briefcase,
  Smartphone,
  PlayCircle,
  IndianRupee,
  Clock,
  MapPin,
} from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Register Free",
    desc: "Sign up as a Learn & Earn partner in under 5 minutes. No fees, no targets.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Learn & Get Tools",
    desc: "Access training videos, product guides, referral link & WhatsApp creatives.",
    icon: PlayCircle,
  },
  {
    step: "03",
    title: "Refer Customers",
    desc: "Share leads for home, personal, MSME, Mudra, LAP, auto & more loan types.",
    icon: Share2,
  },
  {
    step: "04",
    title: "Earn Commission",
    desc: "RupeeDial handles bank coordination & disbursal — you earn after approval.",
    icon: Wallet,
  },
];

const pillars = [
  {
    icon: BookOpen,
    title: "Learn Loan Products",
    desc: "Short modules on eligibility, documents, rates & bank policies for 20+ products.",
  },
  {
    icon: Share2,
    title: "Refer With Confidence",
    desc: "Dedicated referral link, QR code & expert support for every lead you share.",
  },
  {
    icon: Wallet,
    title: "Earn Transparently",
    desc: "Track leads & payouts in partner dashboard. Commissions as per disbursed amount.",
  },
];

const earningTiers = [
  {
    referrals: "5 / month",
    type: "Personal & small ticket",
    range: "₹12,000 – ₹25,000",
    highlight: false,
  },
  {
    referrals: "10 / month",
    type: "Mixed loan products",
    range: "₹35,000 – ₹75,000",
    highlight: true,
  },
  {
    referrals: "20+ / month",
    type: "MSME + home + LAP",
    range: "₹1,00,000+",
    highlight: false,
  },
];

const commissionRows = [
  { product: "Personal Loan", payout: "0.5% – 1.5% of disbursal", example: "₹5K – ₹15K on ₹10L" },
  { product: "Home Loan", payout: "0.25% – 0.75% of disbursal", example: "₹12K – ₹37K on ₹50L" },
  { product: "MSME / Business Loan", payout: "1% – 2% of disbursal", example: "₹10K – ₹40K on ₹20L" },
  { product: "Loan Against Property", payout: "0.4% – 1% of disbursal", example: "₹16K – ₹40K on ₹40L" },
  { product: "Auto Loan", payout: "0.5% – 1.2% of disbursal", example: "₹4K – ₹12K on ₹8L" },
  { product: "Mudra / Govt. Schemes", payout: "Fixed + % based", example: "₹2K – ₹8K per case" },
];

const audiences = [
  { icon: GraduationCap, title: "Students", desc: "Flexible part-time income alongside studies." },
  { icon: Home, title: "Homemakers", desc: "Work from home with phone & local network." },
  { icon: Briefcase, title: "Working Professionals", desc: "Monetize contacts without quitting your job." },
  { icon: Smartphone, title: "Digital Creators", desc: "CA, agents, influencers & community admins." },
  { icon: Users, title: "DSA / Agents", desc: "Expand payout with RupeeDial's lender network." },
  { icon: MapPin, title: "Local Consultants", desc: "Property, insurance & tax advisors." },
];

const trainingModules = [
  "Personal & instant loan basics",
  "Home loan & balance transfer",
  "MSME, Mudra & working capital",
  "LAP, auto & education loans",
  "Credit cards & insurance referrals",
  "Lead quality & CIBIL tips",
];

const testimonials = [
  {
    name: "Ravi Sharma",
    city: "New Delhi",
    earning: "₹42,000/mo",
    text: "I started with zero finance background. Training videos helped me close 8 home loans in 3 months.",
    initial: "R",
  },
  {
    name: "Neha Verma",
    city: "Mumbai",
    earning: "₹58,000/mo",
    text: "No field visits — I refer from my CA client base. Payouts are transparent and on time.",
    initial: "N",
    featured: true,
  },
  {
    name: "Amit Singh",
    city: "Lucknow",
    earning: "₹31,000/mo",
    text: "Best side income I've tried. RupeeDial's team handles bank follow-ups completely.",
    initial: "A",
  },
];

const trustStats = [
  { value: "10,000+", label: "Active Partners" },
  { value: "50+", label: "Lender Tie-ups" },
  { value: "16+ Yrs", label: "Team Experience" },
  { value: "4.8★", label: "Partner Rating" },
];

const benefits = [
  { icon: IndianRupee, title: "Zero Joining Fee" },
  { icon: BarChart3, title: "Live Lead Dashboard" },
  { icon: Zap, title: "Fast Payout Cycle" },
  { icon: Headphones, title: "Dedicated RM" },
  { icon: ShieldCheck, title: "Compliant Process" },
];

const faqs = [
  {
    q: "Is there any investment to join Learn & Earn?",
    a: "No. Registration is 100% free. You earn only when a referred loan is disbursed as per lender payout norms.",
  },
  {
    q: "Do I need a finance license or DSA certificate?",
    a: "Referral partners don't need a license. Channel / franchise partners may need standard KYC & agreement signing.",
  },
  {
    q: "How soon do I receive commission?",
    a: "Typically within 7–21 working days after loan disbursal, depending on the bank/NBFC payout cycle.",
  },
  {
    q: "Which loan products can I refer?",
    a: "Personal, home, MSME, Mudra, LAP, auto, education, machinery, working capital, insurance & more via RupeeDial.",
  },
  {
    q: "Will RupeeDial contact my customer directly?",
    a: "Yes — our loan experts handle eligibility, documentation and bank coordination. You stay updated on status.",
  },
  {
    q: "Can I work from any city in India?",
    a: "Yes. The program is fully digital — refer customers pan-India from your phone or laptop.",
  },
];

const sectionTitle =
  "text-2xl md:text-3xl font-extrabold text-[#10662A] text-center";
const sectionSub =
  "text-sm md:text-base text-[#390A5D] max-w-2xl mx-auto text-center mt-3";

export default function LearnEarn() {
  const [monthlyReferrals, setMonthlyReferrals] = useState(10);

  useEffect(() => {
    document.title =
      "Learn & Earn Program | Become RupeeDial Partner & Earn Commission";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Join RupeeDial Learn & Earn — free partner program. Refer loans, learn products, track earnings. Zero investment. Earn commission on home, personal, MSME & more."
    );

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://rupeedial.com/learn&earn");
  }, []);

  const estimatedEarning =
    monthlyReferrals <= 5
      ? "₹12,000 – ₹25,000"
      : monthlyReferrals <= 12
        ? "₹35,000 – ₹75,000"
        : "₹80,000 – ₹1,50,000+";

  return (
    <main className="bg-[#F5FFF8] text-[#390A5D]">
      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative overflow-hidden border-b border-[#d7eadb] bg-gradient-to-br from-[#E8F7EC] via-[#F5FFF8] to-white">
        <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-[#10662A]/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#B0E9B2]/40 blur-3xl" />

        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-[#cfe7d5] bg-white/90 px-4 py-1.5 text-xs font-semibold text-[#10662A] shadow-sm">
                <TrendingUp className="w-3.5 h-3.5" />
                India&apos;s Growing Partner Program
              </span>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-[2.75rem] font-extrabold leading-tight text-[#10662A]">
                Learn. Refer.{" "}
                <span className="text-[#390A5D]">Earn More.</span>
              </h1>

              <p className="mt-4 text-base md:text-lg text-[#390A5D]/90 leading-relaxed max-w-xl">
                Join RupeeDial&apos;s <strong>Learn & Earn</strong> program —
                refer loan applications across 50+ banks & NBFCs and earn
                high commissions with{" "}
                <span className="text-[#10662A] font-semibold">
                  zero investment
                </span>
                .
              </p>

              <ul className="mt-6 space-y-2.5">
                {[
                  "Free registration & training access",
                  "20+ loan & insurance products to refer",
                  "Dedicated partner manager support",
                  "Live lead tracking & payout visibility",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-[#390A5D]">
                    <CheckCircle className="w-4 h-4 text-[#10662A] shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/partner-login"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#10662A] to-[#0D4F20] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(16,102,42,0.3)] transition hover:scale-[1.02]"
                >
                  Become a Partner
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-[#10662A] px-6 py-3 text-sm font-semibold text-[#10662A] transition hover:bg-[#10662A] hover:text-white"
                >
                  How It Works
                </a>
              </div>

              <p className="mt-5 text-xs text-slate-500">
                🔒 RBI-compliant process · Trusted by 10,000+ partners
              </p>
            </div>

            {/* Hero stats card */}
            <div className="rounded-3xl border border-[#d7eadb] bg-white/90 p-6 md:p-8 shadow-[0_20px_60px_rgba(16,102,42,0.12)] backdrop-blur-sm">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#10662A]">
                Program at a glance
              </p>
              <div className="mt-5 grid grid-cols-2 gap-4">
                {trustStats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-[#e8f5ec] bg-[#F5FFF8] p-4 text-center"
                  >
                    <p className="text-xl md:text-2xl font-extrabold text-[#10662A]">
                      {s.value}
                    </p>
                    <p className="text-[11px] text-slate-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-r from-[#10662A] to-[#0D4F20] p-5 text-white">
                <p className="text-xs opacity-90">Top partners earn up to</p>
                <p className="text-3xl font-extrabold mt-1">₹50,000+</p>
                <p className="text-xs opacity-80 mt-1">per month · part-time friendly</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-medium text-[#10662A]">
                <span className="rounded-full bg-[#E8F7EC] px-3 py-1">No targets</span>
                <span className="rounded-full bg-[#E8F7EC] px-3 py-1">Work anywhere</span>
                <span className="rounded-full bg-[#E8F7EC] px-3 py-1">Pan-India</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT IS ═══════════════ */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={sectionTitle}>What is Learn & Earn?</h2>
          <p className={sectionSub}>
            A digital partner program where you learn loan products, refer
            customers to RupeeDial, and earn commission on successful disbursals.
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {pillars.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group rounded-2xl border border-[#d7eadb] bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(16,102,42,0.1)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8F7EC] text-[#10662A] transition group-hover:scale-110">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-[#10662A]">{title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="py-12 md:py-16 px-4 bg-white border-y border-[#d7eadb]">
        <div className="max-w-6xl mx-auto">
          <h2 className={sectionTitle}>How It Works</h2>
          <p className={sectionSub}>Start earning in 4 simple steps</p>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map(({ step, title, desc, icon: Icon }, i) => (
              <div key={step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-[#10662A]/40 to-transparent" />
                )}
                <div className="rounded-2xl border border-[#d7eadb] bg-[#F5FFF8] p-5 h-full text-center hover:border-[#10662A]/30 transition">
                  <span className="inline-block rounded-full bg-[#10662A] px-3 py-0.5 text-[10px] font-bold text-white">
                    STEP {step}
                  </span>
                  <div className="mx-auto mt-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-md text-[#10662A]">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="mt-4 font-bold text-[#10662A]">{title}</h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ EARNINGS ═══════════════ */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={sectionTitle}>How Much Can You Earn?</h2>
          <p className={sectionSub}>
            Income depends on loan type, ticket size & approval rate
          </p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {earningTiers.map((tier) => (
              <div
                key={tier.referrals}
                className={`rounded-2xl p-6 text-center transition ${
                  tier.highlight
                    ? "bg-gradient-to-br from-[#10662A] to-[#0D4F20] text-white shadow-[0_16px_48px_rgba(16,102,42,0.25)] scale-[1.02]"
                    : "bg-white border border-[#d7eadb] shadow-sm"
                }`}
              >
                {tier.highlight && (
                  <span className="inline-block mb-3 rounded-full bg-white/20 px-3 py-0.5 text-[10px] font-semibold">
                    Most Popular
                  </span>
                )}
                <p className={`text-sm ${tier.highlight ? "opacity-90" : "text-slate-500"}`}>
                  {tier.referrals} referrals
                </p>
                <p className={`text-xs mt-1 ${tier.highlight ? "opacity-80" : "text-slate-400"}`}>
                  {tier.type}
                </p>
                <p className={`text-2xl md:text-3xl font-extrabold mt-4 ${tier.highlight ? "" : "text-[#10662A]"}`}>
                  {tier.range}
                </p>
                <p className={`text-xs mt-2 ${tier.highlight ? "opacity-75" : "text-slate-400"}`}>
                  per month (indicative)
                </p>
              </div>
            ))}
          </div>

          {/* Interactive estimator */}
          <div className="mt-10 rounded-2xl border border-[#d7eadb] bg-white p-6 md:p-8 shadow-sm">
            <h3 className="text-lg font-bold text-[#10662A] text-center">
              Quick Earnings Estimator
            </h3>
            <p className="text-center text-xs text-slate-500 mt-1">
              Slide to see indicative monthly range
            </p>
            <input
              type="range"
              min={3}
              max={25}
              value={monthlyReferrals}
              onChange={(e) => setMonthlyReferrals(Number(e.target.value))}
              className="mt-6 w-full accent-[#10662A]"
            />
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl bg-[#F5FFF8] px-5 py-4">
              <div className="text-center sm:text-left">
                <p className="text-xs text-slate-500">Monthly referrals</p>
                <p className="text-2xl font-extrabold text-[#10662A]">
                  {monthlyReferrals}
                </p>
              </div>
              <div className="text-center sm:text-right">
                <p className="text-xs text-slate-500">Estimated earnings</p>
                <p className="text-2xl font-extrabold text-[#0D4F20]">
                  {estimatedEarning}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ COMMISSION TABLE ═══════════════ */}
      <section className="py-12 md:py-16 px-4 bg-white border-y border-[#d7eadb]">
        <div className="max-w-6xl mx-auto">
          <h2 className={sectionTitle}>Commission Structure</h2>
          <p className={sectionSub}>
            Indicative partner payouts — final commission per lender agreement
          </p>

          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#d7eadb] shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#10662A] text-white">
                  <th className="px-4 py-3 text-left font-semibold">Loan Product</th>
                  <th className="px-4 py-3 text-left font-semibold">Payout Range</th>
                  <th className="px-4 py-3 text-left font-semibold">Example</th>
                </tr>
              </thead>
              <tbody>
                {commissionRows.map((row, i) => (
                  <tr
                    key={row.product}
                    className={i % 2 === 0 ? "bg-white" : "bg-[#F5FFF8]"}
                  >
                    <td className="px-4 py-3 font-medium text-[#390A5D] border-t border-[#e8f5ec]">
                      {row.product}
                    </td>
                    <td className="px-4 py-3 text-slate-600 border-t border-[#e8f5ec]">
                      {row.payout}
                    </td>
                    <td className="px-4 py-3 text-[#10662A] font-semibold border-t border-[#e8f5ec]">
                      {row.example}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-center text-[10px] text-slate-500">
            *Actual commission varies by lender, loan amount, profile & partner tier.
          </p>
        </div>
      </section>

      {/* ═══════════════ TRAINING ═══════════════ */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#10662A]">
              Free Training & Resources
            </h2>
            <p className="mt-3 text-sm text-[#390A5D] leading-relaxed">
              Every partner gets access to structured learning — no prior finance
              experience needed. Complete modules and start referring with confidence.
            </p>
            <ul className="mt-6 space-y-3">
              {trainingModules.map((m) => (
                <li key={m} className="flex items-start gap-2 text-sm text-[#390A5D]">
                  <PlayCircle className="w-4 h-4 text-[#10662A] mt-0.5 shrink-0" />
                  {m}
                </li>
              ))}
            </ul>
            <Link
              to="/partner-login"
              className="inline-flex items-center gap-2 mt-6 text-sm font-semibold text-[#10662A] hover:underline"
            >
              Access partner portal <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="rounded-2xl border border-[#d7eadb] bg-white p-6 shadow-[0_12px_40px_rgba(16,102,42,0.08)]">
            <div className="flex items-center gap-3 border-b border-[#e8f5ec] pb-4">
              <div className="h-10 w-10 rounded-xl bg-[#E8F7EC] flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#10662A]" />
              </div>
              <div>
                <p className="font-semibold text-[#10662A]">Partner Learning Hub</p>
                <p className="text-xs text-slate-500">Included free with registration</p>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {[
                { label: "Product knowledge videos", pct: 100 },
                { label: "WhatsApp & social creatives", pct: 100 },
                { label: "Eligibility cheat-sheets", pct: 100 },
                { label: "Lead status notifications", pct: 100 },
              ].map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#390A5D]">{item.label}</span>
                    <span className="text-[#10662A] font-semibold">✓</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#E8F7EC] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[#10662A] transition-all duration-700"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-5 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-3.5 h-3.5" />
              Average onboarding time: under 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-12 md:py-16 px-4 bg-white border-y border-[#d7eadb]">
        <div className="max-w-6xl mx-auto">
          <h2 className={sectionTitle}>Partner Success Stories</h2>
          <p className={sectionSub}>Real partners. Real earnings.</p>

          <div className="mt-10 grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className={`rounded-2xl p-6 transition ${
                  t.featured
                    ? "bg-gradient-to-br from-[#10662A] to-[#0D4F20] text-white shadow-lg"
                    : "bg-[#F5FFF8] border border-[#d7eadb]"
                }`}
              >
                <div className={`flex gap-0.5 ${t.featured ? "text-yellow-300" : "text-yellow-500"}`}>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className={`mt-4 text-sm leading-relaxed ${t.featured ? "opacity-95" : "text-slate-600"}`}>
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-full font-bold text-sm ${
                      t.featured
                        ? "bg-white text-[#10662A]"
                        : "bg-[#10662A] text-white"
                    }`}
                  >
                    {t.initial}
                  </div>
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className={`text-xs ${t.featured ? "opacity-80" : "text-slate-500"}`}>
                      {t.city} · {t.earning}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHO CAN JOIN ═══════════════ */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className={sectionTitle}>Who Can Join?</h2>
          <p className={sectionSub}>No license required · No field work · No sales targets</p>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {audiences.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex gap-4 rounded-2xl border border-[#d7eadb] bg-white p-5 shadow-sm hover:shadow-md transition"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#E8F7EC] text-[#10662A]">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-[#10662A]">{title}</h3>
                  <p className="text-xs text-slate-600 mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHY TRUST ═══════════════ */}
      <section className="py-12 md:py-16 px-4 bg-gradient-to-br from-[#10662A] to-[#0D4F20] text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold">Why Partners Trust RupeeDial</h2>
          <p className="mt-3 text-sm opacity-90 max-w-xl mx-auto">
            16+ years of lending expertise · Transparent payouts · Full compliance
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {benefits.map(({ icon: Icon, title }) => (
              <div
                key={title}
                className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 border border-white/20"
              >
                <Icon className="w-6 h-6 mx-auto opacity-90" />
                <p className="mt-2 text-xs font-semibold">{title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section className="py-12 md:py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className={sectionTitle}>Frequently Asked Questions</h2>
          <div className="mt-8 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-[#d7eadb] bg-[#F5FFF8] open:bg-white open:shadow-sm"
              >
                <summary className="cursor-pointer px-5 py-4 text-sm font-semibold text-[#390A5D] list-none flex items-center justify-between gap-2">
                  {faq.q}
                  <span className="text-[#10662A] transition group-open:rotate-45 text-lg leading-none">
                    +
                  </span>
                </summary>
                <p className="px-5 pb-4 text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section className="py-14 md:py-16 px-4">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-[#d7eadb] bg-white p-8 md:p-12 shadow-[0_20px_60px_rgba(16,102,42,0.1)]">
          <h2 className="text-2xl md:text-4xl font-extrabold text-[#10662A]">
            Start Your Learn & Earn Journey Today
          </h2>
          <p className="mt-4 text-[#390A5D]">
            Join thousands earning every month — registration takes under 5 minutes.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs font-medium text-[#10662A]">
            <span className="rounded-full bg-[#E8F7EC] px-4 py-1.5">✓ 100% Free</span>
            <span className="rounded-full bg-[#E8F7EC] px-4 py-1.5">✓ Pan-India</span>
            <span className="rounded-full bg-[#E8F7EC] px-4 py-1.5">✓ Fast Payouts</span>
          </div>

          <Link
            to="/partner-login"
            className="inline-flex items-center gap-2 mt-8 rounded-xl bg-gradient-to-r from-[#10662A] to-[#0D4F20] px-10 py-4 text-base font-semibold text-white shadow-[0_12px_32px_rgba(16,102,42,0.3)] transition hover:scale-[1.02]"
          >
            Become a Learn & Earn Partner
            <ArrowRight className="w-5 h-5" />
          </Link>

          <p className="mt-6 text-xs text-slate-500">
            Questions? Call{" "}
            <a href="tel:+917982953129" className="text-[#10662A] font-semibold hover:underline">
              +91 79829 53129
            </a>{" "}
            or{" "}
            <Link to="/contact" className="text-[#10662A] font-semibold hover:underline">
              contact us
            </Link>
          </p>

          <div className="mt-8 rounded-xl border border-[#e8f5ec] bg-[#F5FFF8] p-4 text-left text-[10px] text-slate-500 leading-relaxed">
            <strong className="text-[#390A5D]">Disclaimer:</strong> RupeeDial is a loan
            assistance & referral platform. Partners do not disburse loans directly.
            Commission is subject to lender approval, disbursal & payout policies.
          </div>
        </div>
      </section>
    </main>
  );
}

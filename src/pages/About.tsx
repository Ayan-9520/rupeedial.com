// src/pages/AboutPage.tsx

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import about from "../assets/images/about.png";
  import { useEffect } from "react";
const AboutPage: React.FC = () => {


useEffect(() => {
  document.title = "About RupeeDial | India’s Digital Loan & Credit Marketplace";

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute(
    "content",
    "Learn about RupeeDial – India’s digital lending marketplace helping customers compare loans, credit cards and financial products from banks & NBFCs."
  );

  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", "https://rupeedial.com/about");
}, []);

  const navigate = useNavigate();

  return (
    <main className="bg-[#ffffff] min-h-screen">
      {/* TOP: Digital lending ecosystem + What Rupeedial Does */}
      <section className="bg-gradient-to-br from-[#ffffff] via-white to-white pt-10 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          {/* Small label */}
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d8efe6] bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#10662A]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10662A]" />
            India’s Digital Lending Ecosystem
          </span>

          {/* Grid */}
          <div className="mt-5 grid gap-8 md:grid-cols-2 items-stretch">
            {/* LEFT – text + products + points */}
            <div className="rounded-2xl border border-[#d8efe6] bg-[#F5FFF8] p-5 md:p-7 shadow-[0_16px_40px_rgba(8,60,24,0.06)]">
              <h1 className="text-[26px] md:text-[30px] font-extrabold leading-snug text-[#10662A]">
                <h1>
  About RupeeDial – India’s Digital Lending Marketplace
</h1>

              </h1>
              <p className="mt-2 text-sm md:text-[15px] text-[#390A5D]">
                Where every customer can access the best loan offers instantly —
                anytime, anywhere.
              </p>

              {/* Vision box */}
              <div className="mt-4 rounded-xl border border-[#E4E2F8] bg-white px-4 py-3 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#F5F0FF,transparent_60%)] opacity-90" />
                <div className="relative">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#390A5D] mb-1.5">
                    Our Vision
                  </div>
                  <p className="text-[13px] md:text-[14px] text-[#3A4250]">
                    To build a{" "}
                    <span className="font-semibold text-[#10662A]">
                      unified, secure and transparent platform
                    </span>{" "}
                    that connects borrowers with the right lenders in seconds – so
                    that taking a loan becomes as simple and trustworthy as any
                    everyday digital transaction.
                  </p>
                </div>
              </div>
               {/* Vision box */}
              <div className="mt-4 rounded-xl border border-[#E4E2F8] bg-white px-4 py-3 relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,#F5F0FF,transparent_60%)] opacity-90" />
                <div className="relative">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#390A5D] mb-1.5">
                    Our Mission
                  </div>
                  <p className="text-[13px] md:text-[14px] text-[#3A4250]">
                   Our mission is to simplify access to credit by enabling customers to compare
verified loan offers from multiple banks and NBFCs through a single digital
journey, supported by expert assistance and transparent processes.

                  </p>
                </div>
              </div>

              {/* What Rupeedial does */}
              <h2 className="mt-5 text-[16px] font-semibold text-[#390A5D]">
                What Rupeedial Does
              </h2>
              <p className="mt-1 text-[13px] md:text-[14px] text-[#5B6473]">
                Rupeedial acts as a unified loan marketplace where customers can
                explore, compare and apply for multiple loan &amp; credit products
                through a single digital application.
              </p>

              {/* Products chips – WITH LINKS */}
              <div className="mt-4 flex flex-wrap gap-2.5">
                {[
                  { code: "PL", label: "Msme loan", path: "/msme-loan" },
                  { code: "BL", label: "Mudra Loan", path: "/mudra-loan" },
                  { code: "HL", label: "Home Loan", path: "/home-loan" },
                  {
                    code: "AL",
                    label: " Loan Against Property",
                    path: "/lap-loan",
                  },
                  { code: "LAP", label: "Personal Loan", path: "/personal-loan" },
                  { code: "CC", label: "Auto Loan", path: "/auto-loan" },
                  { code: "CC", label: "Credit Cards", path: "/credit-card" },
                  { code: "IN", label: "Insurance ", path: "/insurance" },
                ].map((item) => (
                  <Link
                    key={item.code + item.label}
                    to={item.path}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] md:text-[12px] text-slate-700 shadow-[0_6px_16px_rgba(8,50,24,0.04)] hover:border-[#10662A] hover:bg-[#F5FFF8]"
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#10662A] text-[10px] font-bold text-white">
                      {item.code}
                    </span>
                    <span className="font-semibold">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Feature bullets */}
              <div className="mt-4 grid gap-x-5 gap-y-3 text-[13px] md:text-[14px] text-[#3B4252] md:grid-cols-2">
                <div className="flex gap-2">
                  <span className="mt-[2px] text-[16px]">⚡</span>
                  <p>
                    <span className="font-semibold text-[#10662A]">
                      Real-time eligibility &amp; offer comparison
                    </span>
                    <br />
                    Live checks with lender systems so you only see offers that
                    fit your profile and income.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="mt-[2px] text-[16px]">📲</span>
                  <p>
                    <span className="font-semibold text-[#10662A]">
                      Instant approval from multiple lenders
                    </span>
                    <br />
                    One Rupeedial application is securely shared with partner
                    banks / NBFCs to fetch instant approvals.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="mt-[2px] text-[16px]">📝</span>
                  <p>
                    <span className="font-semibold text-[#10662A]">
                      Digital KYC &amp; paperless onboarding
                    </span>
                    <br />
                    Complete e-KYC, income verification and form fill-up online
                    without branch visits.
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="mt-[2px] text-[16px]">💼</span>
                  <p>
                    <span className="font-semibold text-[#10662A]">
                      Secure document sharing
                    </span>
                    <br />
                    Bank-grade encryption with controlled access to your
                    documents and financial data.
                  </p>
                </div>
                <div className="flex gap-2 md:col-span-2">
                  <span className="mt-[2px] text-[16px]">🔍</span>
                  <p>
                    <span className="font-semibold text-[#10662A]">
                      Transparent offers with no hidden charges
                    </span>
                    <br />
                    Clear view of interest rate, fees, EMI and tenure before you
                    decide – no surprises after disbursal.
                  </p>
                </div>
              </div>

              {/* CTA buttons */}
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#10662A] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,102,42,0.35)] transition hover:bg-[#0B4B20] hover:shadow-[0_14px_32px_rgba(16,102,42,0.40)]"
                  onClick={() => {
                    const el = document.getElementById("about-main-content");
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Check Loan Eligibility
                  <span className="text-base">→</span>
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#10662A] bg-white px-4 py-2.5 text-sm font-semibold text-[#10662A] transition hover:bg-[#E7F5EC]"
                  onClick={() => navigate("/expert")}
                >
                  Talk to a Loan Expert
                </button>
              </div>
            </div>

            {/* RIGHT – image + highlight cards */}
            <div className="flex flex-col gap-4">
              <div className="relative flex items-center justify-center rounded-2xl bg-white">
                <img
                  src={about}
                  alt="RupeeDial digital lending platform connecting borrowers with banks and NBFCs"

                  className="h-56 md:h-[400px] w-auto max-w-full object-contain p-4"
                />
                <div className="pointer-events-none absolute -top-6 -left-6 h-16 w-16 rounded-3xl bg-[#E4F6EA] blur-2xl opacity-70" />
                <div className="pointer-events-none absolute -bottom-6 -right-6 h-16 w-16 rounded-3xl bg-[#F5F0FF] blur-2xl opacity-70" />
              </div>

              {/* Small highlight cards below image */}
              <div className="grid gap-3 md:grid-cols-1">
                <div className="rounded-xl border mb-4 border-[#D8EFE6] bg-[#F5FFF8] px-4 py-3 text-xs md:text-[13px] text-[#390A5D] shadow-sm">
                  <div className="text-[19px] p-2 font-semibold uppercase tracking-[0.16em] text-[#10662A]">
                    For Customers
                  </div>
                  <p className="mt-1.5 text-[14px] p-2">
                    Apply once, compare offers from multiple lenders, and choose
                    the{" "}
                    <span className="font-semibold text-[#10662A]">
                      best EMI &amp; rate
                    </span>{" "}
                    for your needs.
                  </p>
                </div>
                <div className="rounded-xl border border-[#E4E2F8] bg-[#F5F0FF] px-4 py-3 text-xs md:text-[13px] text-[#390A5D] shadow-sm">
                  <div className="text-[19px] p-2 font-semibold uppercase tracking-[0.16em] text-[#390A5D]">
                    For Lenders
                  </div>
                  <p className="mt-1.5 text-[14px]">
                    API-first integrations,{" "}
                    <span className="font-semibold text-[#10662A]">
                      pre-validated profiles
                    </span>{" "}
                    and digital document kits for faster underwriting.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content (existing about) */}
      <section id="about-main-content" className="py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 space-y-10">
          <div className="rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-[#3A4250]">
  <strong>Important Disclosure:</strong> RupeeDial is a loan assistance and
  comparison platform. We do not provide loans directly and do not act as a
  lender. Loan approval, interest rates, fees, and disbursal timelines are
  determined solely by banks and NBFC partners as per their internal policies.
</div>

          {/* Intro block */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 md:p-7 space-y-4 text-sm md:text-[15px] leading-relaxed text-[#390A5D] shadow-[0_16px_40px_rgba(9,30,66,0.06)]">
            <p>
              The definition of the banking sector has changed in recent years.
              Applying for loans is no longer a lengthy process filled with
              stress and tension. New digital instruments now provide better and
              more efficient services to people.
            </p>

            <p>
              A personal loan can be a dream come true for people as it can
              fulfil requirements like higher education, home renovation,
              vacation, or a medical emergency. The best part is that you
              don&apos;t need to pledge anything and it can get approved within
              24 hours of the request.
            </p>

            <p>
              We understand how difficult it is to frequently visit banks or
              financial institutions to get your loan processed. So we bring you
              a digital platform where you can apply online for a fast process
              and convenient experience.
            </p>

            <p>
              <strong className="text-[#10662A]">Rupeedial</strong>has over 16 years of experience in the financial services ecosystem,
working closely with leading banks and NBFCs to assist customers in finding
suitable loan and credit options through a transparent digital platform.
            </p>

            <p>
             This approach has helped us assist thousands of customers across India
by connecting them with suitable loan options from trusted banking and
NBFC partners through a transparent digital process.

            </p>

           

            <p>
              Rupeedial provides one-stop solutions for all types of loans and
              cards in India including personal loans, home loans, credit cards,
              education loans, car loans, loan against property and many more.
              We have highly proficient experts who deliver high-quality
              services in a limited span of time.
            </p>

            <p>
              We have tie-ups with leading institutions including HDFC Bank,
              ICICI Bank, YES Bank, Bajaj Finance, Indiabulls and many more.
            </p>

            <p>
              one of India’s growing digital marketplaces for customised loan
and credit comparisons on loans and credit cards. We deal in loan products with
              some of the lowest interest rates and believe in quick loan
              disbursal to meet the urgent needs of customers.
            </p>

            <p>
              We are one of the fastest growing businesses in the retail loan
              aggregation arena. Affected by endless bank visits and false
              promise calls, we created a financial advisory system that is
              superior and more customer-friendly. Led by passionate
              problem-solvers and backed by top-level ex-bankers, we&apos;ve
              been trendsetters since the inception of Rupeedial.
            </p>

            <p>
              <strong className="text-[#10662A]">Rupeedial</strong> is
              India&apos;s largest marketplace for instant customised quotes on
              loans and credit cards. We offer credit products with low interest
              rates and fast disbursal, delivered in a safe and transparent
              manner.
            </p>

            <p>
              Instead of relying on endless bank visits and phone calls with
              false commitments, we have built a financial advisory system
              focused on real value and better outcomes for customers.
            </p>
          </div>

         

          {/* Why choose us */}
        
        </div>
      </section>
      <section className="bg-white py-6">
  <h2 className="text-xl font-bold text-[#10662A] text-center mb-4">
    About RupeeDial – FAQs
  </h2>

  <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-4 px-4">
    <details className="bg-green-50 border rounded-lg p-4">
      <summary className="font-semibold text-sm">
        Is RupeeDial a bank or NBFC?
      </summary>
      <p className="mt-2 text-xs text-slate-600">
        No. RupeeDial is a loan comparison & assistance platform and does not
        provide loans directly.
      </p>
    </details>

    <details className="bg-green-50 border rounded-lg p-4">
      <summary className="font-semibold text-sm">
        How does RupeeDial earn revenue?
      </summary>
      <p className="mt-2 text-xs text-slate-600">
        RupeeDial may receive a service fee from partner banks or NBFCs when a
        customer successfully avails a product.
      </p>
    </details>
  </div>
</section>

    </main>
  );
};

export default AboutPage;

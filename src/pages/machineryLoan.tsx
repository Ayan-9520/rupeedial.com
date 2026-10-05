import React, { useState, useEffect } from "react";
import { apiUrl } from "../config/api";
import {
  CheckCircle,
  Factory,
  Settings,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";



/* ================= TYPES ================= */

interface EnquiryForm {
  companyName: string;
  fullName: string;
  email: string;
  mobile: string;
  machineryType: string;
  loanAmount: string;
  city: string;
}

/* ================= STYLES ================= */
const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10662A]";


const sectionTitle =
  "text-2xl md:text-3xl font-extrabold text-[#10662A] mb-3 text-center";

const sectionSub =
  "text-sm md:text-base text-[#390A5D] max-w-4xl mx-auto text-center";

/* ================= COMPONENT ================= */

const MachineryLoan: React.FC = () => {
  useEffect(() => {
  // ✅ Page Title
  document.title =
    "Machinery Loan for Business | Equipment & Plant Financing | RupeeDial";

  // ✅ Meta Description
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute(
    "content",
    "Apply for machinery loan for new or used equipment. Get financing for manufacturing, textile, construction & industrial machinery with flexible tenure and fast approval."
  );

  // ✅ Canonical URL
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute(
    "href",
    "https://rupeedial.com/machinery-loan"
  );
}, []);

const [successMsg, setSuccessMsg] = useState<string | null>(null);
const [submitting, setSubmitting] = useState(false);


  const [form, setForm] = useState<EnquiryForm>({
    companyName: "",
    fullName: "",
    email: "",
    mobile: "",
    machineryType: "",
    loanAmount: "",
    city: "",
  });
  // ================= EMI CALCULATOR STATE =================
  const [emiInput, setEmiInput] = useState({
    loanAmount: 1000000,
    rate: 10,
    tenure: 60,
  });

  const calculateEmi = () => {
    const rate = Math.min(30, Math.max(8, emiInput.rate || 0));
    const r = rate / 12 / 100;
    const n = Math.min(84, Math.max(1, Math.round(emiInput.tenure || 0)));
    if (!emiInput.loanAmount || emiInput.loanAmount <= 0) return 0;
    const emi =
      (emiInput.loanAmount * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

   const handleSubmit = async () => {
  // 🔒 double submit block
  if (submitting) return;

  // 🔴 basic validation
  if (!form.fullName || !form.mobile || !form.loanAmount) {
    alert("Please fill all mandatory fields");
    return;
  }

  // 📱 mobile validation
  if (!/^[6-9]\d{9}$/.test(form.mobile)) {
    alert("Please enter a valid 10-digit mobile number");
    return;
  }

  // 💰 loan amount validation
  const loanAmt = Number(form.loanAmount);
  if (!loanAmt || loanAmt <= 0) {
    alert("Please enter a valid loan amount");
    return;
  }

  setSubmitting(true); // ✅ yahin lagta hai

  try {
    const res = await fetch(
      apiUrl("machinery-loan/apply"),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (!res.ok || data.success === false) {
      throw new Error(data.message || "Submission failed");
    }

    // ✅ success
    setSuccessMsg(
      "Thank you! Our machinery loan expert will contact you shortly."
    );

    setForm({
      companyName: "",
      fullName: "",
      email: "",
      mobile: "",
      machineryType: "",
      loanAmount: "",
      city: "",
    });

    setTimeout(() => {
      setSuccessMsg(null);
    }, 3000);
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Something went wrong");
    }
  } finally {
    setSubmitting(false); // ✅ yahin aata hai
  }
};


  return (
    <main className="bg-green-50">

      {/* ================= HERO + FORM ================= */}
     <section className="bg-[#F5FFF8] border-b border-slate-100">
  <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

    {/* ================= LEFT CONTENT ================= */}
    <div>

      {/* Small badge */}
      <span className="inline-block mb-4 bg-green-100 text-[#10662A] px-4 py-1 rounded-full text-sm font-semibold">
        Business Equipment Financing
      </span>

      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#10662A] mb-4 leading-tight">
        Machinery Loan for <br className="hidden sm:block" />
        Growing Businesses
      </h1>

      <p className="text-[#390A5D] mb-6 leading-relaxed max-w-lg">
        Finance new or used machinery for manufacturing, construction, textile,
        pharma, food processing and other industrial operations with fast approvals.
      </p>

      <ul className="space-y-3 text-sm text-[#390A5D] max-w-lg">
        {[
          "Loans for new & used machinery",
          "Ideal for MSMEs, manufacturers & traders",
          "Attractive interest rates & flexible tenure",
          "Funding from leading banks & NBFCs",
        ].map((t) => (
          <li key={t} className="flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#10662A] mt-0.5 flex-shrink-0" />
            <span>{t}</span>
          </li>
        ))}
      </ul>

      {/* Trust line */}
      <div className="mt-6 flex items-center gap-4 text-xs text-slate-500">
        <span>✔ No hidden charges</span>
        <span>✔ Soft enquiry only</span>
        <span>✔ Quick processing</span>
      </div>
      <ul className="mt-4 space-y-2 text-left text-xs text-slate-500">

  <li className="flex items-start gap-2">
    🔒 <span>100% Secure — No impact on credit score</span>
  </li>

  <li className="flex items-start gap-2">
    ⏱️ <span>Our loan expert will call you within <b>24 working hours</b></span>
  </li>

  <li className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
    📜{" "}
    <span>
      By submitting this form, you agree to be contacted by RupeeDial and its
      partner banks/NBFCs for loan assistance as per our privacy policy.
    </span>
  </li>

</ul>


    </div>

    {/* ================= RIGHT FORM ================= */}
    <div className="bg-green-50 rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-7">

      {/* SUCCESS MESSAGE */}
     {successMsg && (
  <div className="mb-3 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-xs text-green-700 flex items-center gap-2">
    <span className="text-sm">✅</span>
    <span>{successMsg}</span>
  </div>
)}


      <h3 className="text-lg font-bold text-[#10662A] mb-1">
        Apply for Machinery Loan
      </h3>

      <p className="text-sm text-slate-500 mb-5">
        Fill this form to get a call from our machinery loan expert.
      </p>

      <div className="grid grid-col-2 gap-3">

        <input
          name="companyName"
          placeholder="Company Name"
          className={inputClass}
          value={form.companyName}
          onChange={handleChange}
        />

        <input
          name="fullName"
          placeholder="Your Name*"
          className={inputClass}
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email Address"
          className={inputClass}
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="mobile"
          placeholder="Mobile Number*"
          className={inputClass}
          value={form.mobile}
          onChange={handleChange}
        />

        <input
          name="machineryType"
          placeholder="Machinery Type (CNC, Textile, Packaging etc.)"
          className={inputClass}
          value={form.machineryType}
          onChange={handleChange}
        />

        <input
          name="loanAmount"
          placeholder="Required Loan Amount (₹)*"
          className={inputClass}
          value={form.loanAmount}
          onChange={handleChange}
        />

        <input
          name="city"
          placeholder="City"
          className={inputClass}
          value={form.city}
          onChange={handleChange}
        />

        <button
  disabled={submitting}
  onClick={handleSubmit}
  className={`
    mt-2 flex items-center justify-center gap-2 rounded-lg py-3
    text-sm font-semibold text-white transition
    ${submitting ? "bg-slate-400" : "bg-[#10662A] hover:bg-[#0e5a25]"}
  `}
>
  {submitting ? "Submitting..." : "Get Loan Assistance"}
  <ArrowRight className="w-4 h-4" />
</button>


        <p className="text-xs text-slate-500 text-center mt-2">
          🔒 100% Secure | No impact on credit score
        </p>
      </div>
    </div>
  </div>
</section>

      {/* ================= EMI CALCULATOR ================= */}
<section className="py-4 bg-[#F5FFF8] border-t border-slate-200">

  <h2 className={sectionTitle}>Machinery Loan EMI Calculator</h2>
  <p className={sectionSub}>
    Estimate your monthly EMI based on loan amount, interest rate & tenure.
  </p>

  <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-3 gap-6 px-4">

  {/* Loan Amount */}
  <div>
    <label className="block mb-1 text-sm font-semibold text-[#390A5D]">
      Loan Amount (₹)
    </label>
    <input
      type="number"
      className={inputClass}
      value={emiInput.loanAmount}
      onChange={(e) =>
        setEmiInput({ ...emiInput, loanAmount: Number(e.target.value) })
      }
      placeholder="e.g. 10,00,000"
    />
  </div>

  {/* Interest Rate */}
  <div>
    <label className="block mb-1 text-sm font-semibold text-[#390A5D]">
      Interest Rate (% p.a.)
    </label>
    <div className="relative">
  <input
    type="number"
    min={8}
    max={30}
    step={0.1}
    className={`${inputClass} pr-10`}
    value={emiInput.rate}
    onChange={(e) =>
      setEmiInput({ ...emiInput, rate: Number(e.target.value) })
    }
    onBlur={() =>
      setEmiInput((prev) => ({
        ...prev,
        rate: Math.min(30, Math.max(8, prev.rate || 8)),
      }))
    }
    placeholder="e.g. 10.5"
  />

  {/* % SIGN */}
  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
    %
  </span>
</div>

  </div>

  {/* Tenure */}
  <div>
    <label className="block mb-1 text-sm font-semibold text-[#390A5D]">
      Tenure (Months)
    </label>
    <input
  type="number"
  min={12}
  max={84}
  step={1}
  className={inputClass}
  value={emiInput.tenure}
  onChange={(e) =>
    setEmiInput({ ...emiInput, tenure: Number(e.target.value) })
  }
  onBlur={() =>
    setEmiInput((prev) => ({
      ...prev,
      tenure: Math.min(84, Math.max(12, Math.round(prev.tenure || 12))),
    }))
  }
  placeholder="e.g. 60"
/>

  </div>

</div>


  <div className="text-center mt-6">
    <div className="inline-block bg-white border-2 border-[#10662A] rounded-2xl px-8 py-5 shadow-md">

      <p className="text-sm text-[#390A5D]">Estimated Monthly EMI</p>

    <p className="text-sm text-slate-500 mb-1">
  Per month for {emiInput.tenure} months
</p>

<p className="text-2xl font-extrabold text-[#10662A]">
  ₹ {calculateEmi().toLocaleString("en-IN")}
</p>

    </div>
  </div>
  <div className="mt-6 text-center">
  <p className="text-xs text-slate-500">
    EMI shown is indicative. Final EMI depends on bank approval & credit profile.
  </p>
</div>

</section>

      {/* ================= WHAT IS MACHINERY LOAN ================= */}
      <section className="py-6">
        <h2 className={sectionTitle}>What is a Machinery Loan?</h2>
        <p className={sectionSub}>
          A machinery loan enables businesses to finance plant & machinery for
          expansion, modernization and productivity enhancement.
        </p>

        <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-3 gap-6 px-4">
          <div className="border bg-white rounded-xl p-6 text-center shadow-sm">
            <Factory className="mx-auto mb-3 text-[#10662A]" />
            <h3 className="font-semibold  text-[#390A5D] mb-2">Business Growth</h3>
            <p className="text-sm text-slate-600">
              Expand capacity without impacting working capital.
            </p>
          </div>

          <div className="border bg-white rounded-xl p-6 text-center shadow-sm">
            <Settings className="mx-auto mb-3 text-[#10662A]" />
            <h3 className="font-semibold text-[#390A5D] mb-2">
              Technology Upgrade
            </h3>
            <p className="text-sm text-slate-600">
              Invest in modern & efficient machinery.
            </p>
          </div>

          <div className="border  bg-white rounded-xl p-6 text-center shadow-sm">
            <TrendingUp className="mx-auto mb-3 text-[#10662A]" />
            <h3 className="font-semibold text-[#390A5D] mb-2">
              Higher Productivity
            </h3>
            <p className="text-sm text-slate-600">
              Improve output quality & profitability.
            </p>
          </div>
        </div>
      </section>

      {/* ================= ELIGIBILITY ================= */}
      <section className="bg-[#F5FFF8] py-6">
        <h2 className={sectionTitle}>Machinery Loan Eligibility</h2>

        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-6 px-4">
          {[
            "Business operational for minimum 2 years",
            "Stable turnover & income profile",
            "Valid GST registration (where applicable)",
            "Acceptable credit & repayment history",
            "Machinery quotation or invoice available",
          ].map((e) => (
            <div
              key={e}
              className="flex items-start gap-3 border rounded-lg p-4 bg-white shadow-sm"
            >
              <ShieldCheck className="text-[#10662A] w-5 h-5 mt-1" />
              <p className="text-sm text-[#390A5D]">{e}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= DOCUMENTS ================= */}
      <section className="py-6">
        <h2 className={sectionTitle}>Documents Required</h2>

        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-6 px-4 text-sm text-[#390A5D]">
          <ul className="space-y-2 list-disc pl-5">
            <li>KYC of applicant & business</li>
            <li>PAN & Aadhaar</li>
            <li>GST registration certificate</li>
            <li>Business address proof</li>
          </ul>
          <ul className="space-y-2 list-disc pl-5">
            <li>Last 6–12 months bank statements</li>
            <li>ITR / financials (2–3 years)</li>
            <li>Machinery quotation / invoice</li>
            <li>Existing loan details (if any)</li>
          </ul>
        </div>
      </section>

<section className="py-6 bg-green-50">
  <h2 className={sectionTitle}>Why Businesses Choose Rupeedial</h2>

  <div className="max-w-5xl  mx-auto mt-8 grid md:grid-cols-3 gap-6 px-4 text-sm text-[#390A5D]">
    <div className="border  bg-white rounded-xl p-6 shadow-sm">
      ✓ Multiple banks & NBFCs comparison
    </div>
    <div className="border bg-white rounded-xl p-6 shadow-sm">
      ✓ Dedicated relationship manager
    </div>
    <div className="border bg-white rounded-xl p-6 shadow-sm">
      ✓ Faster approval & transparent process
    </div>
  </div>
</section>

      {/* ================= CTA ================= */}
      <section className="py-6 border-t text-center">
        <h2 className="text-2xl font-bold text-[#10662A] mb-3">
          Upgrade Your Machinery. Grow Your Business.
        </h2>
        <p className="text-sm text-[#390A5D] mb-5">
          Get expert guidance & best machinery loan offers with Rupeedial.
        </p>
        <a
          href="/expert"
          className="inline-block bg-[#10662A] text-white px-6 py-3 rounded-lg text-sm font-semibold"
        >
          Talk to Machinery Loan Expert
        </a>
      </section>
      <section className="mt-10 bg-[#F5FFF8] py-6">
  <div className="max-w-6xl mx-auto px-4">

    <h2 className="text-xl font-bold text-[#10662A] text-center mb-4">
      Machinery Loan – FAQs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          What is a machinery loan?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          A machinery loan helps businesses purchase new or used machinery for
          manufacturing, construction and industrial operations.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          Can I get loan for used machinery?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Yes, banks and NBFCs finance used machinery depending on age, condition
          and business financials.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          How much loan can I get on machinery?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          You can get up to 70–85% of the machinery value based on lender policy
          and credit profile.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          What is the tenure of machinery loan?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Machinery loan tenure usually ranges from 3 to 7 years depending on
          the lender and machinery type.
        </p>
      </details>

    </div>
  </div>
</section>

    </main>
  );
};

export default MachineryLoan;

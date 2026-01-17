import React, { useState } from "react";
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
  "w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#10662A]";

const sectionTitle =
  "text-2xl md:text-3xl font-extrabold text-[#10662A] mb-3 text-center";

const sectionSub =
  "text-sm md:text-base text-[#390A5D] max-w-4xl mx-auto text-center";

/* ================= COMPONENT ================= */

const MachineryLoan: React.FC = () => {
const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
    const r = emiInput.rate / 12 / 100;
    const n = emiInput.tenure;
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
    if (!form.fullName || !form.mobile || !form.loanAmount) {
      alert("Please fill all mandatory fields");
      return;
    }

    try {
     const res = await fetch(
  "https://rupeedial.com/rupeedial-backend/public/index.php?action=machinery-loan/apply",
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

setSuccessMsg("Thank you! Our machinery loan expert will contact you shortly.");

setForm({
  companyName: "",
  fullName: "",
  email: "",
  mobile: "",
  machineryType: "",
  loanAmount: "",
  city: "",
});

/* 🔥 AUTO HIDE AFTER 3 SECONDS */
setTimeout(() => {
  setSuccessMsg(null);
}, 3000);



   } catch (err) {
  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("Something went wrong");
  }
}

  };

  return (
    <main className="bg-white">

      {/* ================= HERO + FORM ================= */}
      <section className="bg-[#F5FFF8] border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-10 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#10662A] mb-4">
              Machinery Loan for Businesses
            </h1>
            <p className="text-[#390A5D] mb-6 leading-relaxed">
              Machinery loans help businesses purchase new or used machines
              required for manufacturing, processing, construction, packaging,
              textile, pharma, food processing and other industrial operations.
            </p>

            <ul className="space-y-3 text-sm text-[#390A5D]">
              {[
                "Loans for new & used machinery",
                "Ideal for MSMEs, manufacturers & traders",
                "Attractive interest rates & flexible tenure",
                "Funding from leading banks & NBFCs",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10662A] mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-xl shadow-lg border p-6">
              {/* ✅ SUCCESS MESSAGE (YAHAN LAGANA HAI) */}
  {successMsg && (
    <div className="mb-4 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800">
      ✅ {successMsg}
    </div>
  )}

            <h3 className="text-lg font-semibold text-[#10662A] mb-4">
              Apply for Machinery Loan
            </h3>

            <div className="grid gap-4">
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
                onClick={handleSubmit}
                className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#10662A] py-3 text-sm font-semibold text-white"
              >
                Get Loan Assistance <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-slate-500 text-center mt-2">
  🔒 100% Secure | No impact on credit score
</p>

            </div>
          </div>
        </div>
      </section>
      {/* ================= EMI CALCULATOR ================= */}
<section className="py-14 bg-[#F5FFF8] border-t border-slate-200">

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
    onChange={(e) => {
      let value = Number(e.target.value);

      if (value < 8) value = 8;
      if (value > 30) value = 30;

      setEmiInput({ ...emiInput, rate: value });
    }}
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
      <section className="py-14">
        <h2 className={sectionTitle}>What is a Machinery Loan?</h2>
        <p className={sectionSub}>
          A machinery loan enables businesses to finance plant & machinery for
          expansion, modernization and productivity enhancement.
        </p>

        <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-3 gap-6 px-4">
          <div className="border rounded-xl p-6 text-center shadow-sm">
            <Factory className="mx-auto mb-3 text-[#10662A]" />
            <h3 className="font-semibold text-[#390A5D] mb-2">Business Growth</h3>
            <p className="text-sm text-slate-600">
              Expand capacity without impacting working capital.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center shadow-sm">
            <Settings className="mx-auto mb-3 text-[#10662A]" />
            <h3 className="font-semibold text-[#390A5D] mb-2">
              Technology Upgrade
            </h3>
            <p className="text-sm text-slate-600">
              Invest in modern & efficient machinery.
            </p>
          </div>

          <div className="border rounded-xl p-6 text-center shadow-sm">
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
      <section className="bg-[#F5FFF8] py-14">
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
      <section className="py-14">
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
{/* ================= FAQ ================= */}
<section className="bg-[#F5FFF8] py-14">
  <h2 className={sectionTitle}>Machinery Loan FAQs</h2>

  <div className="max-w-3xl mx-auto mt-8 px-4 space-y-3">
    {[
      {
        q: "Can I get a loan for used machinery?",
        a: "Yes, most banks & NBFCs provide financing for used machinery depending on age and condition.",
      },
      {
        q: "What is the maximum tenure for machinery loan?",
        a: "Tenure typically ranges from 3 to 7 years depending on lender and machinery type.",
      },
      {
        q: "Is GST mandatory for machinery loan?",
        a: "GST is preferred but not mandatory in all cases. Eligibility depends on lender policy.",
      },
      {
        q: "How much loan can I get on machinery?",
        a: "Up to 70–85% of machinery value depending on condition and financial profile.",
      },
    ].map((f, i) => (
      <div
        key={i}
        className="border rounded-lg bg-white shadow-sm"
      >
        <button
          onClick={() => setOpenFaq(openFaq === i ? null : i)}
          className="w-full flex justify-between items-center px-4 py-3 text-sm font-semibold text-[#390A5D]"
        >
          {f.q}
          <span>{openFaq === i ? "−" : "+"}</span>
        </button>
        {openFaq === i && (
          <div className="px-4 pb-3 text-sm text-slate-600">
            {f.a}
          </div>
        )}
      </div>
    ))}
  </div>
</section>
<section className="py-14 bg-white">
  <h2 className={sectionTitle}>Why Businesses Choose Rupeedial</h2>

  <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-3 gap-6 px-4 text-sm text-[#390A5D]">
    <div className="border rounded-xl p-6 shadow-sm">
      ✓ Multiple banks & NBFCs comparison
    </div>
    <div className="border rounded-xl p-6 shadow-sm">
      ✓ Dedicated relationship manager
    </div>
    <div className="border rounded-xl p-6 shadow-sm">
      ✓ Faster approval & transparent process
    </div>
  </div>
</section>

      {/* ================= CTA ================= */}
      <section className="py-12 border-t text-center">
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
    </main>
  );
};

export default MachineryLoan;

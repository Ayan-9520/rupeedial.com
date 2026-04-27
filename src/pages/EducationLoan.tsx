import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Globe,
  Wallet,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react";

/* ================= STYLES ================= */

const inputClass =
  "w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E8A4B]";

const sectionTitle =
  "text-2xl md:text-3xl font-extrabold text-green-800 text-center";

const sectionSub =
  "text-sm md:text-base text-slate-600 text-center max-w-3xl mx-auto";

/* ================= COMPONENT ================= */

const EducationLoanNew: React.FC = () => {
  useEffect(() => {
  // ✅ Title
  document.title =
    "Education Loan for India & Abroad | Low Interest Rates | RupeeDial";

  // ✅ Meta Description
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute(
    "content",
    "Apply for education loan for India and abroad. Get student loans up to ₹1.5 Crore with low interest rates, moratorium benefits and expert guidance from RupeeDial."
  );

  // ✅ Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute(
    "href",
    "https://rupeedial.com/education-loan"
  );
}, []);


  /* ✅ SUCCESS MESSAGE STATE */
  const [success, setSuccess] = useState<string | null>(null);
const [submitting, setSubmitting] = useState(false);

  /* ✅ FORM STATE */
  const [form, setForm] = useState({
  studentName: "",
  mobile: "",
  email: "",
  course: "",
  studyLocation: "",
  loanAmount: "",
  city: "",
});


  /* ================= HANDLERS ================= */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
  if (submitting) return;

  if (
    !form.studentName ||
    !form.mobile ||
    !form.loanAmount ||
    !form.studyLocation
  ) {
    alert("Please fill all mandatory fields");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(form.mobile)) {
    alert("Please enter a valid 10-digit mobile number");
    return;
  }

  const loanAmt = Number(form.loanAmount);
  if (!loanAmt || loanAmt <= 0) {
    alert("Please enter a valid loan amount");
    return;
  }

  setSubmitting(true);

  try {
    const res = await fetch(
      "https://rupeedial.com/rupeedial-backend/public/index.php?action=education-loan/apply",
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

    setSuccess(
      "Thank you! Our education loan expert will contact you shortly."
    );

    setForm({
      studentName: "",
      mobile: "",
      email: "",
      course: "",
      studyLocation: "",
      loanAmount: "",
      city: "",
    });

    setTimeout(() => setSuccess(null), 3000);
  } catch {
    alert("Something went wrong. Please try again.");
  } finally {
    setSubmitting(false);
  }
};


  return (
    <main className="bg-white">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-green-50 border-b">
  <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">

    {/* LEFT CONTENT */}
    <div>
      <span className="inline-block mb-4 bg-white text-[#0E8A4B] px-4 py-1 rounded-full text-xs font-semibold">
        Trusted Education Financing
      </span>

      <h1 className="text-3xl md:text-5xl  text-green-800 font-extrabold leading-tight mb-5">
        Study Without <br /> Financial Stress
      </h1>

      <p className="text-slate-600 mb-6 max-w-lg">
        Get education loans for India & abroad with low interest rates,
        flexible repayment and expert guidance from RupeeDial.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700">
        {[
          "Loans up to ₹1.5 Crore",
          "Moratorium available",
          "India & Overseas studies",
          "Top banks & NBFCs",
        ].map((t) => (
          <div key={t} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-[#0E8A4B]" />
            <span>{t}</span>
          </div>
        ))}
        {/* TRUST TEXT */}
        <ul className="mt-3 space-y-2 text-left text-xs text-slate-500">
          <li className="flex items-start gap-2">
            🔒 <span>100% Secure — No impact on credit score</span>
          </li>
          <li className="flex items-start gap-2">
            ⏱️ <span>Our loan expert will call you within <b>24 working hours</b></span>
          </li>
          <li className="flex items-start gap-2 text-[11px] text-slate-400">
            📜{" "}
            <span>
              By submitting this form, you agree to be contacted by RupeeDial and its
              partner banks/NBFCs for loan assistance as per our privacy policy.
            </span>
          </li>
        </ul>
      </div>
    </div>

    {/* RIGHT FORM */}
    <div className="bg-white rounded-2xl shadow-lg border p-6">

      {success && (
        <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2 rounded text-sm">
          ✅ {success}
        </div>
      )}

      <h3 className="text-lg text-green-800 font-bold mb-4">
        Check Your Loan Eligibility
      </h3>

      {/* FORM FIELDS */}
      <div className="grid grid-cols-1 gap-4">

        <input
          name="studentName"
          value={form.studentName}
          onChange={handleChange}
          className={inputClass}
          placeholder="Student Name*"
        />

        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          className={inputClass}
          placeholder="Mobile Number*"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className={inputClass}
          placeholder="Email Address"
        />

        <input
          name="course"
          value={form.course}
          onChange={handleChange}
          className={inputClass}
          placeholder="Course / Degree"
        />

        <select
          name="studyLocation"
          value={form.studyLocation}
          onChange={handleChange}
          className={inputClass}
        >
          <option value="">Study Location</option>
          <option value="India">India</option>
          <option value="Abroad">Abroad</option>
        </select>

        <input
          name="loanAmount"
          value={form.loanAmount}
          onChange={handleChange}
          className={inputClass}
          placeholder="Required Loan Amount (₹)"
        />

        {/* 🔥 LAST ROW: City + Button */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            className={inputClass}
            placeholder="City"
          />

         <button
  onClick={handleSubmit}
  disabled={submitting}
  className={`
    flex items-center justify-center gap-2 rounded-lg py-3
    text-sm font-semibold text-white w-full
    ${submitting ? "bg-slate-400" : "bg-[#0E8A4B] hover:bg-[#0A6F3D]"}
  `}
>
  {submitting ? "Submitting..." : "Get Best Loan Offers"}
  <ArrowRight className="w-4 h-4" />
</button>


        </div>

        

      </div>
    </div>
  </div>
</section>


      {/* ================= HOW IT WORKS ================= */}
      <section className="py-6   bg-green-50">
        <h2 className={sectionTitle} >How RupeeDial Helps You</h2>
        <p className={sectionSub}>
          Simple, transparent & student-friendly education loan process
        </p>

        <div className="max-w-5xl mx-auto mt-10 grid md:grid-cols-3 gap-6 px-4">
          {[
            {
              icon: GraduationCap,
              title: "Apply Online",
              desc: "Share basic details & course information",
            },
            {
              icon: Globe,
              title: "Compare Banks",
              desc: "Get best loan offers from multiple lenders",
            },
            {
              icon: Wallet,
              title: "Fast Disbursal",
              desc: "Funds released directly to institution",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border bg-white p-6 text-center hover:shadow-md transition"
            >
              <c.icon className="mx-auto mb-4 text-[#0E8A4B]" />
              <h3 className="font-semibold text-slate-900 mb-2">
                {c.title}
              </h3>
              <p className="text-sm text-slate-600">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="py-6 bg-green-50">
    <h2 className={`${sectionTitle} text-[#0E8A4B]`}>
  Why Students Choose RupeeDial
</h2>


        <div className="max-w-4xl mx-auto mt-10 grid md:grid-cols-2 gap-6 px-4">
          {[
            "Personalised guidance from loan experts",
            "Low interest rates & flexible tenure",
            "Collateral & non-collateral options",
            "Support till final disbursal",
          ].map((t) => (
            <div
              key={t}
              className="flex items-start gap-3 bg-white p-5 rounded-xl border"
            >
              <ShieldCheck className="text-[#0E8A4B] mt-1" />
              <p className="text-sm text-slate-700">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="py-6 bg-gradient-to-r from-[#0E8A4B] to-[#0A5C38] text-center text-white">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
          Turn Your Education Dreams Into Reality
        </h2>
        <p className="text-white/90 mb-6">
          Get the right education loan with expert support at every step.
        </p>
        <a
          href="/expert"
          className="inline-block bg-white text-[#0E8A4B] px-8 py-3 rounded-xl font-semibold text-sm"
        >
          Talk to Education Loan Expert
        </a>
      </section>
      <section className=" bg-green-50 py-6">
  <div className="max-w-6xl mx-auto px-4">

    <h2 className="text-xl font-bold text-green-800 text-center mb-4">
      Education Loan – FAQs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-700">
          What is an education loan?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          An education loan helps students finance higher studies in India or
          abroad, covering tuition fees and related expenses.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-700">
          Can I get education loan without collateral?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Yes, education loans up to a certain limit are available without
          collateral depending on bank and student profile.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-700">
          What is the maximum education loan amount?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Loan amount can go up to ₹1.5 crore for overseas studies, subject to
          bank eligibility and course type.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-slate-700">
          When does education loan repayment start?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Repayment usually starts after course completion plus moratorium
          period, as per bank policy.
        </p>
      </details>

    </div>
  </div>
</section>

    </main>
  );
};

export default EducationLoanNew;


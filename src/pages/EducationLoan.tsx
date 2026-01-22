import React, { useState } from "react";
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
  "text-2xl md:text-3xl font-extrabold text-slate-900 text-center";

const sectionSub =
  "text-sm md:text-base text-slate-600 text-center max-w-3xl mx-auto";

/* ================= COMPONENT ================= */

const EducationLoanNew: React.FC = () => {

  /* ✅ SUCCESS MESSAGE STATE */
  const [success, setSuccess] = useState<string | null>(null);

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
  if (
    !form.studentName ||
    !form.mobile ||
    !form.loanAmount ||
    !form.studyLocation   // ✅ YE LINE ADD KARO
  ) {
    alert("Please fill all mandatory fields");
    return;
  }


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
        city:"",
      });

      /* 🔥 AUTO HIDE SUCCESS */
      setTimeout(() => setSuccess(null), 3000);
    } catch  {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="bg-slate-50">

      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-green-50 border-b">
  <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="text-slate-900">
            <span className="inline-block mb-4 bg-emerald-50 text-[#0E8A4B] px-4 py-1 rounded-full text-xs font-semibold">

              Trusted Education Financing
            </span>

            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-6">
              Study Without <br /> Financial Stress
            </h1>

            <p className="text-slate-600 mb-6">
              Get education loans for India & abroad with low interest rates,
              flexible repayment and expert guidance from RupeeDial.
            </p>

            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                "Loans up to ₹1.5 Crore",
                "Moratorium available",
                "India & Overseas studies",
                "Top banks & NBFCs",
              ].map((t) => (
                <div key={t} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#0E8A4B]" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-3xl shadow-2xl p-8">

            {/* ✅ SUCCESS MESSAGE */}
            {success && (
              <div className="mb-4 bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-3 rounded-lg text-sm">
                ✅ {success}
              </div>
            )}

            <h3 className="text-xl font-bold text-slate-900 mb-6">
              Check Your Loan Eligibility
            </h3>

            <div className="grid gap-4">
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
  name="city"
  value={form.city}
  onChange={handleChange}
  className={inputClass}
  placeholder="City"
/>
              <input
                name="loanAmount"
                value={form.loanAmount}
                onChange={handleChange}
                className={inputClass}
                placeholder="Required Loan Amount (₹)"
              />

              <button
                onClick={handleSubmit}
                className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#0E8A4B] py-3 text-sm font-semibold text-white"
              >
                Get Best Loan Offers <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-center text-slate-500">
                🔒 Secure & Confidential | No Credit Score Impact
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="py-16 bg-white">
        <h2 className={sectionTitle}>How RupeeDial Helps You</h2>
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
              className="rounded-2xl border bg-slate-50 p-6 text-center hover:shadow-md transition"
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
      <section className="py-16 bg-slate-50">
        <h2 className={sectionTitle}>Why Students Choose RupeeDial</h2>

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
      <section className="py-16 bg-gradient-to-r from-[#0E8A4B] to-[#0A5C38] text-center text-white">
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
    </main>
  );
};

export default EducationLoanNew;

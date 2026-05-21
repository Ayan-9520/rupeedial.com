import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle,
  ShieldCheck,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";
import type { LoanProductConfig } from "../../data/loanProductPages";

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10662A]";

const sectionTitle =
  "text-2xl md:text-3xl font-extrabold text-[#10662A] mb-3 text-center";

const sectionSub =
  "text-sm md:text-base text-[#390A5D] max-w-4xl mx-auto text-center";

type FormState = Record<string, string>;

interface Props {
  config: LoanProductConfig;
}

const LoanProductPage: React.FC<Props> = ({ config }) => {
  const {
    slug,
    seo,
    hero,
    form,
    emi,
    rates,
    whatIs,
    eligibility,
    documents,
    benefits,
    faqs,
    showEmiCalculator = true,
  } = config;

  useEffect(() => {
    document.title = seo.title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", seo.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `https://rupeedial.com/${slug}`);
  }, [seo, slug]);

  const initialForm: FormState = {
    companyName: "",
    fullName: "",
    email: "",
    mobile: "",
    loanAmount: "",
    city: "",
    product: config.productName,
    ...Object.fromEntries(
      (form.extraFields ?? []).map((f) => [f.name, ""])
    ),
  };

  const [formState, setFormState] = useState<FormState>(initialForm);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [emiInput, setEmiInput] = useState({
    loanAmount: emi.defaultAmount,
    rate: emi.defaultRate,
    tenure: emi.defaultTenureMonths,
  });

  const calculateEmi = () => {
    const r = emiInput.rate / 12 / 100;
    const n = emiInput.tenure;
    if (!r || !n) return 0;
    const emi =
      (emiInput.loanAmount * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    if (!formState.fullName?.trim() || !formState.mobile?.trim() || !formState.loanAmount?.trim()) {
      alert("Please fill all mandatory fields");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(formState.mobile)) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }
    const loanAmt = Number(formState.loanAmount);
    if (!loanAmt || loanAmt <= 0) {
      alert("Please enter a valid loan amount");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(
        `https://rupeedial.com/rupeedial-backend/public/index.php?action=${slug}/apply`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formState),
        }
      );
      const data = await res.json();
      if (!res.ok || data.success === false) {
        throw new Error(data.message || "Submission failed");
      }
      setSuccessMsg(form.successMessage);
      setFormState(initialForm);
      setTimeout(() => setSuccessMsg(null), 4000);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again or call our expert.");
    } finally {
      setSubmitting(false);
    }
  };

  const FeatureIcon = ({ icon: Icon }: { icon: LucideIcon }) => (
    <Icon className="mx-auto mb-3 text-[#10662A] w-8 h-8" />
  );

  return (
    <main className="bg-green-50">
      <section className="bg-[#F5FFF8] border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          <div>
            <span className="inline-block mb-4 bg-green-100 text-[#10662A] px-4 py-1 rounded-full text-sm font-semibold">
              {hero.badge}
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#10662A] mb-4 leading-tight">
              {hero.title}
            </h1>
            <p className="text-[#390A5D] mb-6 leading-relaxed max-w-lg">
              {hero.description}
            </p>
            <ul className="space-y-3 text-sm text-[#390A5D] max-w-lg">
              {hero.bullets.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-[#10662A] mt-0.5 flex-shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-slate-500">
              <span>✔ No hidden charges</span>
              <span>✔ Soft enquiry only</span>
              <span>✔ Quick processing</span>
            </div>
            <ul className="mt-4 space-y-2 text-left text-xs text-slate-500">
              <li className="flex items-start gap-2">
                🔒 <span>100% Secure — No impact on credit score</span>
              </li>
              <li className="flex items-start gap-2">
                ⏱️{" "}
                <span>
                  Our loan expert will call you within{" "}
                  <b>24 working hours</b>
                </span>
              </li>
              <li className="flex items-start gap-2 text-[11px] text-slate-400 leading-relaxed">
                📜{" "}
                <span>
                  By submitting this form, you agree to be contacted by
                  RupeeDial and its partner banks/NBFCs for loan assistance as
                  per our privacy policy.
                </span>
              </li>
            </ul>
            <Link
              to="/check-eligibility"
              className="inline-block mt-6 px-5 py-2.5 rounded-lg border border-[#10662A] text-[#10662A] text-sm font-semibold hover:bg-[#10662A] hover:text-white transition"
            >
              Check Eligibility Free
            </Link>
          </div>

          <div className="bg-green-50 rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-7">
            {successMsg && (
              <div className="mb-3 rounded-md border border-green-300 bg-green-50 px-3 py-2 text-xs text-green-700 flex items-center gap-2">
                <span className="text-sm">✅</span>
                <span>{successMsg}</span>
              </div>
            )}
            <h3 className="text-lg font-bold text-[#10662A] mb-1">
              {form.title}
            </h3>
            <p className="text-sm text-slate-500 mb-5">{form.subtitle}</p>
            <div className="grid grid-cols-1 gap-3">
              {form.showCompanyName !== false && (
                <input
                  name="companyName"
                  placeholder="Company / Business Name"
                  className={inputClass}
                  value={formState.companyName}
                  onChange={handleChange}
                />
              )}
              <input
                name="fullName"
                placeholder="Your Name*"
                className={inputClass}
                value={formState.fullName}
                onChange={handleChange}
              />
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                className={inputClass}
                value={formState.email}
                onChange={handleChange}
              />
              <input
                name="mobile"
                placeholder="Mobile Number*"
                className={inputClass}
                value={formState.mobile}
                onChange={handleChange}
                maxLength={10}
              />
              {(form.extraFields ?? []).map((field) =>
                field.type === "select" ? (
                  <select
                    key={field.name}
                    name={field.name}
                    className={inputClass}
                    value={formState[field.name] ?? ""}
                    onChange={handleChange}
                  >
                    <option value="">{field.placeholder}</option>
                    {(field.options ?? []).map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    key={field.name}
                    name={field.name}
                    placeholder={field.placeholder}
                    className={inputClass}
                    value={formState[field.name] ?? ""}
                    onChange={handleChange}
                  />
                )
              )}
              <input
                name="loanAmount"
                placeholder={form.loanAmountPlaceholder ?? "Required Amount (₹)*"}
                className={inputClass}
                value={formState.loanAmount}
                onChange={handleChange}
              />
              <input
                name="city"
                placeholder="City*"
                className={inputClass}
                value={formState.city}
                onChange={handleChange}
              />
              <button
                type="button"
                disabled={submitting}
                onClick={handleSubmit}
                className={`mt-2 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold text-white transition ${
                  submitting ? "bg-slate-400" : "bg-[#10662A] hover:bg-[#0e5a25]"
                }`}
              >
                {submitting ? "Submitting..." : form.submitLabel}
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-slate-500 text-center mt-2">
                🔒 100% Secure | No impact on credit score
              </p>
            </div>
          </div>
        </div>
      </section>

      {showEmiCalculator && (
        <section className="py-6 bg-[#F5FFF8] border-t border-slate-200">
          <h2 className={sectionTitle}>{config.productName} EMI Calculator</h2>
          <p className={sectionSub}>{emi.subtitle}</p>
          <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-3 gap-6 px-4">
            <div>
              <label className="block mb-1 text-sm font-semibold text-[#390A5D]">
                Loan Amount (₹)
              </label>
              <input
                type="number"
                className={inputClass}
                value={emiInput.loanAmount}
                onChange={(e) =>
                  setEmiInput({
                    ...emiInput,
                    loanAmount: Number(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-[#390A5D]">
                Interest Rate (% p.a.)
              </label>
              <input
                type="number"
                min={emi.minRate}
                max={emi.maxRate}
                step={0.1}
                className={inputClass}
                value={emiInput.rate}
                onChange={(e) => {
                  let value = Number(e.target.value);
                  if (value < emi.minRate) value = emi.minRate;
                  if (value > emi.maxRate) value = emi.maxRate;
                  setEmiInput({ ...emiInput, rate: value });
                }}
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-semibold text-[#390A5D]">
                Tenure (Months)
              </label>
              <input
                type="number"
                min={emi.minTenure}
                max={emi.maxTenure}
                className={inputClass}
                value={emiInput.tenure}
                onChange={(e) =>
                  setEmiInput({
                    ...emiInput,
                    tenure: Number(e.target.value),
                  })
                }
              />
            </div>
          </div>
          <div className="text-center mt-6">
            <div className="inline-block bg-white border-2 border-[#10662A] rounded-2xl px-8 py-5 shadow-md">
              <p className="text-sm text-[#390A5D]">Estimated Monthly EMI</p>
              <p className="text-2xl font-extrabold text-[#10662A]">
                ₹ {calculateEmi().toLocaleString("en-IN")}
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-slate-500 px-4">
            EMI shown is indicative. Final terms depend on bank approval & credit
            profile.
          </p>
        </section>
      )}

      <section className="py-6 px-4">
        <h2 className={sectionTitle}>Interest Rates & Charges</h2>
        <p className={sectionSub + " mb-6"}>{rates.note}</p>
        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full text-sm border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
            <thead>
              <tr className="bg-[#10662A] text-white">
                <th className="px-4 py-3 text-left font-semibold">Parameter</th>
                <th className="px-4 py-3 text-left font-semibold">Typical Range</th>
              </tr>
            </thead>
            <tbody>
              {rates.rows.map((row, i) => (
                <tr
                  key={row.label}
                  className={i % 2 === 0 ? "bg-white" : "bg-[#f5fcf7]"}
                >
                  <td className="px-4 py-3 text-[#390A5D] font-medium border-t border-slate-100">
                    {row.label}
                  </td>
                  <td className="px-4 py-3 text-slate-600 border-t border-slate-100">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-6">
        <h2 className={sectionTitle}>{whatIs.title}</h2>
        <p className={sectionSub}>{whatIs.description}</p>
        <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-3 gap-6 px-4">
          {whatIs.cards.map(({ title, description, icon: Icon }) => (
            <div
              key={title}
              className="border bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <FeatureIcon icon={Icon} />
              <h3 className="font-semibold text-[#390A5D] mb-2">{title}</h3>
              <p className="text-sm text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F5FFF8] py-6">
        <h2 className={sectionTitle}>{config.productName} Eligibility</h2>
        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-6 px-4">
          {eligibility.map((e) => (
            <div
              key={e}
              className="flex items-start gap-3 border rounded-lg p-4 bg-white shadow-sm"
            >
              <ShieldCheck className="text-[#10662A] w-5 h-5 mt-1 flex-shrink-0" />
              <p className="text-sm text-[#390A5D]">{e}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6">
        <h2 className={sectionTitle}>Documents Required</h2>
        <div className="max-w-4xl mx-auto mt-8 grid md:grid-cols-2 gap-6 px-4 text-sm text-[#390A5D]">
          <ul className="space-y-2 list-disc pl-5">
            {documents.left.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
          <ul className="space-y-2 list-disc pl-5">
            {documents.right.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-6 bg-green-50">
        <h2 className={sectionTitle}>Key Features & Benefits</h2>
        <div className="max-w-5xl mx-auto mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
          {benefits.map((b) => (
            <div
              key={b}
              className="border bg-white rounded-xl p-5 shadow-sm text-sm text-[#390A5D] flex gap-2"
            >
              <CheckCircle className="w-5 h-5 text-[#10662A] flex-shrink-0" />
              <span>{b}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-6 bg-[#F5FFF8]">
        <h2 className={sectionTitle}>Why Choose RupeeDial</h2>
        <div className="max-w-5xl mx-auto mt-6 grid md:grid-cols-3 gap-6 px-4 text-sm text-[#390A5D]">
          <div className="border bg-white rounded-xl p-6 shadow-sm">
            ✓ Compare 50+ banks & NBFCs in one place
          </div>
          <div className="border bg-white rounded-xl p-6 shadow-sm">
            ✓ Dedicated relationship manager support
          </div>
          <div className="border bg-white rounded-xl p-6 shadow-sm">
            ✓ Transparent process with faster turnaround
          </div>
        </div>
      </section>

      <section className="py-6 border-t text-center px-4">
        <h2 className="text-2xl font-bold text-[#10662A] mb-3">{hero.ctaTitle}</h2>
        <p className="text-sm text-[#390A5D] mb-5">{hero.ctaSubtitle}</p>
        <Link
          to="/expert"
          className="inline-block bg-[#10662A] text-white px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[#0D4F20] transition"
        >
          Talk to {config.productName} Expert
        </Link>
      </section>

      <section className="pb-10 bg-[#F5FFF8]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-xl font-bold text-[#10662A] text-center mb-4">
            {config.productName} – FAQs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="bg-white border rounded-lg p-4"
              >
                <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
                  {faq.q}
                </summary>
                <p className="mt-2 text-xs text-slate-600">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default LoanProductPage;

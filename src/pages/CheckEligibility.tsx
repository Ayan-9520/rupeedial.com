import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Clock,
  Download,
  FileUp,
  Loader2,
  Lock,
  PhoneCall,
  ShieldCheck,
  X,
} from "lucide-react";
import { apiUrl } from "../config/api";
import { CRM_API_URL, CRM_APP_URL } from "../data/partnerPlans";
import {
  ASSUMED_CIBIL,
  DOCUMENTS,
  LENDER_KIND_LABEL,
  PRODUCTS,
  PRODUCT_GROUPS,
  docBucket,
  evaluateAll,
  formatINR,
  formatShortINR,
  incomeLabel,
  isProduct,
  needsPropertyValue,
  tenureLabel,
  type DocBucket,
  type Employment,
  type Offer,
  type Product,
} from "../data/eligibility";

type Step = 1 | 2 | 3 | 4;
type SortKey = "amount" | "rate" | "monthly";

interface FormState {
  product: Product | "";
  employment: Employment | "";
  fullName: string;
  mobile: string;
  email: string;
  city: string;
  monthlyIncome: string;
  existingEmi: string;
  requestedAmount: string;
  cibil: string;
  propertyValue: string;
  courseFee: string;
  acceptConsent: boolean;
}

const CIBIL_BANDS = [
  { value: "0", label: "I don't know" },
  { value: "820", label: "800 or above" },
  { value: "775", label: "750 – 799" },
  { value: "725", label: "700 – 749" },
  { value: "675", label: "650 – 699" },
  { value: "625", label: "600 – 649" },
  { value: "580", label: "Below 600" },
];

const STEPS = ["Your details", "Compare offers", "Documents", "Submitted"];

const emptyFiles: Record<DocBucket, File[]> = { kyc: [], incomeProof: [], bankStatement: [], other: [] };

const digits = (v: string) => v.replace(/\D/g, "");
const toNum = (v: string) => Number(digits(v)) || 0;
const groupINR = (v: string) => (digits(v) ? Number(digits(v)).toLocaleString("en-IN") : "");

const fieldBase =
  "w-full h-12 rounded-xl border bg-white px-4 text-[15px] text-gray-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-4 focus:ring-[#10662A]/10 focus:border-[#10662A]/50";

const Field: React.FC<{ label: string; error?: string; hint?: string; children: React.ReactNode }> = ({
  label,
  error,
  hint,
  children,
}) => (
  <label className="block">
    <span className="mb-1.5 block text-[13px] font-semibold text-gray-900">{label}</span>
    {children}
    {error ? (
      <span className="mt-1 block text-xs font-medium text-red-600">{error}</span>
    ) : hint ? (
      <span className="mt-1 block text-xs text-slate-500">{hint}</span>
    ) : null}
  </label>
);

const MoneyInput: React.FC<{
  name: keyof FormState;
  value: string;
  placeholder: string;
  invalid?: boolean;
  onChange: (name: keyof FormState, value: string) => void;
}> = ({ name, value, placeholder, invalid, onChange }) => (
  <div className="relative">
    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">₹</span>
    <input
      inputMode="numeric"
      className={`${fieldBase} pl-8 ${invalid ? "border-red-400" : "border-slate-200"}`}
      placeholder={placeholder}
      value={groupINR(value)}
      onChange={(e) => onChange(name, digits(e.target.value).slice(0, 11))}
    />
  </div>
);

const chanceStyle: Record<Offer["chance"], string> = {
  High: "text-green-700",
  Good: "text-sky-700",
  Fair: "text-amber-700",
};

const LoanEligibilityPage: React.FC = () => {
  const location = useLocation();
  const queryProduct = new URLSearchParams(location.search).get("product");
  const stateProduct = (location.state as { product?: string } | null)?.product;
  const initialProduct = isProduct(stateProduct) ? stateProduct : isProduct(queryProduct) ? queryProduct : "";

  const [step, setStep] = useState<Step>(1);
  const [part, setPart] = useState(1);
  const [crmLogin, setCrmLogin] = useState<{ email: string; password: string | null } | null>(null);
  const [form, setForm] = useState<FormState>({
    product: initialProduct,
    employment: "",
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    monthlyIncome: "",
    existingEmi: "",
    requestedAmount: "",
    cibil: "0",
    propertyValue: "",
    courseFee: "",
    acceptConsent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("amount");
  const [showUnmatched, setShowUnmatched] = useState(false);
  const [files, setFiles] = useState<Record<DocBucket, File[]>>(emptyFiles);
  const [submitting, setSubmitting] = useState(false);
  const [leadId, setLeadId] = useState("");

  useEffect(() => {
    document.title = "Check Loan Eligibility Online | Compare 20+ Banks | RupeeDial";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Check your loan eligibility for personal, home, MSME, education, auto loans and more. Compare eligible amount, interest rate and EMI across 20+ banks & NBFCs instantly with RupeeDial."
    );
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", "https://rupeedial.com/check-eligibility");
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const set = (name: keyof FormState, value: string | boolean) => {
    setForm((p) => ({ ...p, [name]: value }));
    setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const input = useMemo(() => {
    if (!form.product) return null;
    return {
      product: form.product,
      employment: form.employment,
      monthlyIncome: toNum(form.monthlyIncome),
      existingEmi: toNum(form.existingEmi),
      cibil: Number(form.cibil) || 0,
      propertyValue: toNum(form.propertyValue) || undefined,
      courseFee: toNum(form.courseFee) || undefined,
    };
  }, [form]);

  const offers = useMemo(() => (input && input.monthlyIncome > 0 ? evaluateAll(input) : []), [input]);
  const eligibleOffers = useMemo(() => {
    const list = offers.filter((o) => o.eligible);
    return [...list].sort((a, b) =>
      sortKey === "amount" ? b.amount - a.amount : sortKey === "rate" ? a.rate - b.rate : a.monthly - b.monthly
    );
  }, [offers, sortKey]);
  const unmatched = offers.filter((o) => !o.eligible);
  const bestAmount = eligibleOffers.reduce((m, o) => Math.max(m, o.amount), 0);
  const lowestRate = eligibleOffers.reduce((m, o) => Math.min(m, o.rate), Infinity);
  const amountsAllEqual = eligibleOffers.every((o) => o.amount === bestAmount);
  const selectedOffer = eligibleOffers.find((o) => o.lender.name === selected) ?? null;
  const productKind = form.product ? PRODUCTS[form.product].kind : "term";
  const income = toNum(form.monthlyIncome);
  const obligation = income ? Math.min(1, toNum(form.existingEmi) / income) : 0;
  const requested = toNum(form.requestedAmount);

  const validate = () => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.product) e.product = "Choose a loan product";
    if (!form.employment) e.employment = "Choose employment type";
    if (form.fullName.trim().length < 3) e.fullName = "Enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    if (!income) e.monthlyIncome = "Enter your monthly income";
    else if (form.product && income < PRODUCTS[form.product].minIncome)
      e.monthlyIncome = `Minimum ₹${PRODUCTS[form.product].minIncome.toLocaleString("en-IN")}/month for ${form.product}`;
    if (needsPropertyValue(form.product) && !toNum(form.propertyValue)) e.propertyValue = "Enter property value";
    if (form.product === "Education Loan" && !toNum(form.courseFee)) e.courseFee = "Enter total course fee";
    if (!form.acceptConsent) e.acceptConsent = "Please accept to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validatePart = (current: number) => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (current === 1) {
      if (form.fullName.trim().length < 3) e.fullName = "Enter your full name";
      if (!/^[6-9]\d{9}$/.test(form.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Enter a valid email";
    }
    if (current === 2 && !form.product) e.product = "Choose a loan product";
    if (current === 3) {
      if (!form.employment) e.employment = "Choose employment type";
      if (!income) e.monthlyIncome = "Enter your monthly income";
      else if (form.product && income < PRODUCTS[form.product].minIncome)
        e.monthlyIncome = `Minimum ₹${PRODUCTS[form.product].minIncome.toLocaleString("en-IN")}/month for ${form.product}`;
    }
    if (current === 4) {
      if (needsPropertyValue(form.product) && !toNum(form.propertyValue)) e.propertyValue = "Enter property value";
      if (form.product === "Education Loan" && !toNum(form.courseFee)) e.courseFee = "Enter total course fee";
    }
    if (current === 5 && !form.acceptConsent) e.acceptConsent = "Please accept to continue";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleCheck = () => {
    if (!validate()) {
      document.getElementById("eligibility-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    setSelected(null);
    setStep(2);
  };

  const continuePart = () => {
    if (!validatePart(part)) return;
    if (part >= 5) {
      handleCheck();
      return;
    }
    setPart((value) => value + 1);
  };

  const requiredDocs = form.product ? DOCUMENTS[form.product] : [];
  const docFiles = (doc: string) => files[docBucket(doc)];

  const addFiles = (doc: string, list: FileList | null) => {
    if (!list) return;
    const key = docBucket(doc);
    setFiles((prev) => ({
      ...prev,
      [key]: [...prev[key], ...Array.from(list).filter((f) => !prev[key].some((p) => p.name === f.name))],
    }));
  };

  const removeFile = (key: DocBucket, name: string) =>
    setFiles((prev) => ({ ...prev, [key]: prev[key].filter((f) => f.name !== name) }));

  const handleSubmit = async () => {
    if (submitting || !selectedOffer) return;
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append(
        "formData",
        JSON.stringify({
          product: form.product,
          fullName: form.fullName.trim(),
          mobile: form.mobile,
          email: form.email.trim(),
          city: form.city.trim(),
          employment: form.employment,
          monthlyIncome: income,
          existingEmi: toNum(form.existingEmi),
          cibil: Number(form.cibil) || 0,
          propertyValue: toNum(form.propertyValue),
          courseFee: toNum(form.courseFee),
          requestedAmount: requested,
          eligibleAmount: selectedOffer.amount,
          interestRate: selectedOffer.rate,
          tenureMonths: selectedOffer.tenureMonths,
          emi: selectedOffer.monthly,
          acceptConsent: form.acceptConsent,
        })
      );
      fd.append("selectedBank", selectedOffer.lender.name);
      (Object.keys(files) as DocBucket[]).forEach((k) => files[k].forEach((f) => fd.append(`${k}[]`, f)));

      if (import.meta.env.DEV) {
        const key =
          (import.meta.env.VITE_CRM_PUBLIC_API_KEY as string | undefined) ||
          "rupeedial-website-key-change-me";
        const res = await fetch(`${CRM_API_URL}/api/public/eligibility`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-API-Key": key },
          body: JSON.stringify({
            full_name: form.fullName.trim(),
            mobile: form.mobile,
            email: form.email.trim(),
            city: form.city.trim(),
            product: form.product,
            employment: form.employment,
            monthly_income: income,
            existing_emi: toNum(form.existingEmi),
            requested_amount: requested,
            cibil: Number(form.cibil) || 0,
            selected_bank: selectedOffer.lender.name,
            eligible_amount: selectedOffer.amount,
            interest_rate: selectedOffer.rate,
            emi: selectedOffer.monthly,
            documents: requiredDocs,
            website_lead_id: `ELIG-${Date.now()}`,
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data?.success) throw new Error(data.detail || data.message || "Submission failed");
        setLeadId(data.lead_id || "");
        setCrmLogin({ email: data.email || form.email.trim(), password: data.temporary_password || null });
        setStep(4);
        return;
      }

      const res = await fetch(apiUrl("eligibility/apply"), { method: "POST", body: fd });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.success) throw new Error(data?.message || "Submission failed");
      setLeadId(data.leadId || "");
      setStep(4);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Server error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const resetAll = () => {
    setForm((p) => ({
      ...p,
      monthlyIncome: "",
      existingEmi: "",
      requestedAmount: "",
      propertyValue: "",
      courseFee: "",
      cibil: "0",
    }));
    setFiles(emptyFiles);
    setSelected(null);
    setLeadId("");
    setCrmLogin(null);
    setPart(1);
    setStep(1);
  };

  const downloadSummary = () => {
    if (!selectedOffer) return;
    const text = [
      "RupeeDial — Loan Application Summary",
      "",
      `Reference ID: ${leadId || "—"}`,
      `Product: ${form.product}`,
      `Applicant: ${form.fullName}`,
      `Mobile: ${form.mobile}`,
      `Email: ${form.email}`,
      `Lender: ${selectedOffer.lender.name}`,
      `Eligible amount: ${formatINR(selectedOffer.amount)}`,
      `Indicative rate: ${selectedOffer.rate}% p.a.`,
      productKind === "term" ? `Tenure: ${tenureLabel(selectedOffer.tenureMonths)}` : "",
      productKind === "term" ? `Estimated EMI: ${formatINR(selectedOffer.monthly)}` : "",
      "",
      "Figures are indicative. Final approval depends on lender policy.",
    ]
      .filter(Boolean)
      .join("\n");
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `RupeeDial_${leadId || "Application"}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const amountLabel = productKind === "card" ? "Card limit" : productKind === "revolving" ? "Facility limit" : "Loan amount";
  const monthlyLabel = productKind === "revolving" ? "Interest at full use" : "EMI";

  return (
    <main className="min-h-screen bg-gray-50 pb-24 sm:pb-12">
      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pt-8 sm:px-6 sm:pt-12">
        <h1 className="text-2xl font-extrabold leading-tight text-[#10662A] sm:text-3xl">Check Loan Eligibility</h1>
        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          Compare amount, interest rate and EMI from 20+ banks and NBFCs. No effect on your CIBIL score.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-gray-600 sm:text-sm">
          <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-[#10662A]" /> No CIBIL impact</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-4 w-4 text-[#10662A]" /> Result in 30 seconds</span>
          <span className="inline-flex items-center gap-1.5"><Building2 className="h-4 w-4 text-[#10662A]" /> 22 lenders</span>
        </div>

        {/* STEPPER */}
        <ol className="mt-6 grid grid-cols-4 gap-2">
          {STEPS.map((label, i) => {
            const n = (i + 1) as Step;
            const done = step > n;
            const active = step === n;
            return (
              <li key={label} className="flex flex-col gap-2">
                <div className={`h-1.5 rounded-full transition-colors ${done || active ? "bg-[#10662A]" : "bg-[#10662A]/15"}`} />
                <span className={`flex items-center gap-1.5 text-[11px] font-semibold sm:text-xs ${active ? "text-[#10662A]" : done ? "text-gray-900" : "text-slate-400"}`}>
                  {done ? <CheckCircle2 className="h-3.5 w-3.5 shrink-0" /> : <span className="hidden sm:inline">{n}.</span>}
                  <span className="truncate">{label}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </section>

      {/* STEP 1 — FORM */}
      {step === 1 && (
        <section id="eligibility-form" className="mx-auto mt-6 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_340px]">
          <div className="rd-rise rd-rise-delay-2 rounded-xl border border-[#e2efe6] bg-white p-5 shadow-sm sm:p-8">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#10662A]">Step {part} of 5</p>
            <h2 className="text-lg font-bold text-gray-900">
              {["Basic details", "Product", "Income / business", "Requirement", "Bureau consent"][part - 1]}
            </h2>

            {part === 2 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Loan product*" error={errors.product}>
                <div className="relative">
                  <select
                    className={`${fieldBase} appearance-none pr-10 ${errors.product ? "border-red-400" : "border-slate-200"}`}
                    value={form.product}
                    onChange={(e) => set("product", e.target.value)}
                  >
                    <option value="">Select a product</option>
                    {PRODUCT_GROUPS.map((g) => (
                      <optgroup key={g.label} label={g.label}>
                        {g.items.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
                </Field>
            </div>
            )}

            {part === 3 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Employment type*" error={errors.employment}>
                <div className="grid grid-cols-3 gap-2 sm:col-span-2">
                  {(["Salaried", "Self-Employed", "Business Owner"] as Employment[]).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set("employment", opt)}
                      className={`h-12 rounded-xl border px-2 text-[13px] font-semibold leading-tight transition ${
                        form.employment === opt
                          ? "border-[#10662A] bg-[#E8F7EC] text-[#10662A] ring-2 ring-[#10662A]/15"
                          : errors.employment
                            ? "border-red-300 text-slate-600"
                            : "border-slate-200 text-slate-600 hover:border-[#10662A]/40"
                      }`}
                    >
                      {opt === "Self-Employed" ? "Self employed" : opt === "Business Owner" ? "Business" : opt}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label={`${incomeLabel(form.product)}*`} error={errors.monthlyIncome}>
                <MoneyInput name="monthlyIncome" value={form.monthlyIncome} placeholder="e.g. 50,000" invalid={!!errors.monthlyIncome} onChange={set} />
              </Field>
              <Field label="Existing EMIs per month" hint="Total of all current loan EMIs. Leave empty if none.">
                <MoneyInput name="existingEmi" value={form.existingEmi} placeholder="0" onChange={set} />
              </Field>
            </div>
            )}

            {part === 4 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Amount you need" hint="Optional — helps us highlight matching offers">
                <MoneyInput name="requestedAmount" value={form.requestedAmount} placeholder="e.g. 5,00,000" onChange={set} />
              </Field>
              {needsPropertyValue(form.product) && (
                <Field label="Property market value*" error={errors.propertyValue}>
                  <MoneyInput name="propertyValue" value={form.propertyValue} placeholder="e.g. 50,00,000" invalid={!!errors.propertyValue} onChange={set} />
                </Field>
              )}
              {form.product === "Education Loan" && (
                <Field label="Total course fee*" error={errors.courseFee}>
                  <MoneyInput name="courseFee" value={form.courseFee} placeholder="e.g. 12,00,000" invalid={!!errors.courseFee} onChange={set} />
                </Field>
              )}
            </div>
            )}

            {part === 1 && (
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Field label="Full name*" error={errors.fullName}>
                <input
                  className={`${fieldBase} ${errors.fullName ? "border-red-400" : "border-slate-200"}`}
                  placeholder="As per PAN"
                  value={form.fullName}
                  onChange={(e) => set("fullName", e.target.value)}
                />
              </Field>
              <Field label="Mobile number*" error={errors.mobile}>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">+91</span>
                  <input
                    inputMode="numeric"
                    className={`${fieldBase} pl-12 ${errors.mobile ? "border-red-400" : "border-slate-200"}`}
                    placeholder="10-digit mobile"
                    value={form.mobile}
                    onChange={(e) => set("mobile", digits(e.target.value).slice(0, 10))}
                  />
                </div>
              </Field>
              <Field label="Email*" error={errors.email}>
                <input
                  type="email"
                  className={`${fieldBase} ${errors.email ? "border-red-400" : "border-slate-200"}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                />
              </Field>
              <Field label="City">
                <input className={`${fieldBase} border-slate-200`} placeholder="e.g. Delhi" value={form.city} onChange={(e) => set("city", e.target.value)} />
              </Field>
            </div>
            )}

            {part === 5 && (
            <>
            <div className="mt-6 max-w-md">
              <Field label="CIBIL score" hint={form.cibil === "0" ? `We'll assume ${ASSUMED_CIBIL} until a bureau check. This does not hit your score.` : undefined}>
                <div className="relative">
                  <select
                    className={`${fieldBase} appearance-none border-slate-200 pr-10`}
                    value={form.cibil}
                    onChange={(e) => set("cibil", e.target.value)}
                  >
                    {CIBIL_BANDS.map((b) => (
                      <option key={b.value} value={b.value}>
                        {b.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                </div>
              </Field>
            </div>
            <label className={`mt-6 flex cursor-pointer items-start gap-3 rounded-xl border p-3.5 text-xs leading-relaxed ${errors.acceptConsent ? "border-red-300 bg-red-50/50 text-red-700" : "border-slate-200 text-gray-600"}`}>
              <input
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-[#10662A]"
                checked={form.acceptConsent}
                onChange={(e) => set("acceptConsent", e.target.checked)}
              />
              <span>
                I authorise RupeeDial and its partner banks/NBFCs to contact me by call, SMS, WhatsApp or email about my loan, as per the{" "}
                <Link to="/privacy-policy" className="font-semibold text-[#10662A] underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
            </>
            )}

            <div className="mt-6 flex gap-2">
              {part > 1 && (
                <button type="button" onClick={() => setPart((value) => value - 1)} className="rounded-xl border border-[#10662A]/35 px-4 text-sm font-semibold text-[#10662A]">
                  Back
                </button>
              )}
              <button
                type="button"
                onClick={continuePart}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#10662A] py-3.5 text-[15px] font-semibold text-white transition hover:bg-[#0c5222]"
              >
                {part < 5 ? "Continue" : "See matched offers"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-slate-500">
              <Lock className="h-3.5 w-3.5" /> Your details are encrypted and never shared without consent
            </p>
          </div>

          {/* LIVE ESTIMATE */}
          <aside className="rd-rise rd-rise-delay-3 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="rounded-xl border border-green-200 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-gray-900">Your estimate</p>
              {bestAmount > 0 ? (
                <>
                  <p className="mt-3 text-xs text-gray-500">You may get up to</p>
                  <p className="text-2xl font-extrabold tabular-nums text-[#10662A]">{formatShortINR(bestAmount)}</p>
                  <p className="mt-1 text-xs text-gray-600">
                    {eligibleOffers.length} lender{eligibleOffers.length === 1 ? "" : "s"} match
                    {Number.isFinite(lowestRate) && productKind !== "card" ? ` · rates from ${lowestRate}%` : ""}
                  </p>
                  {requested > 0 && (
                    <p className={`mt-3 rounded-lg px-3 py-2 text-xs font-medium ${requested <= bestAmount ? "bg-green-50 text-green-800" : "bg-amber-50 text-amber-800"}`}>
                      {requested <= bestAmount
                        ? `${formatShortINR(requested)} is within your eligibility`
                        : `${formatShortINR(requested)} is more than your current eligibility`}
                    </p>
                  )}
                </>
              ) : (
                <p className="mt-2 text-xs leading-relaxed text-gray-500">
                  {form.product
                    ? `Enter your ${incomeLabel(form.product).toLowerCase()} to see your estimate.`
                    : "Select a product and enter your income to see your estimate."}
                </p>
              )}

              {income > 0 && productKind === "term" && (
                <div className="mt-4 border-t border-gray-100 pt-3">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Income going to EMIs</span>
                    <span className="font-semibold text-gray-900">{Math.round(obligation * 100)}%</span>
                  </div>
                  <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full ${obligation > 0.5 ? "bg-amber-400" : "bg-[#10662A]"}`}
                      style={{ width: `${Math.max(3, obligation * 100)}%` }}
                    />
                  </div>
                  <p className="mt-1.5 text-[11px] text-gray-500">Banks prefer this below 50%.</p>
                </div>
              )}
            </div>
            <div className="mt-4 rounded-2xl border border-[#e2efe6] bg-white p-5 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">Need help choosing?</p>
              <p className="mt-1 text-xs leading-relaxed">Talk to a RupeeDial loan expert — free, no obligation.</p>
              <Link to="/expert" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#10662A]">
                <PhoneCall className="h-4 w-4" /> Talk to an expert
              </Link>
            </div>
          </aside>
        </section>
      )}

      {/* STEP 2 — OFFERS */}
      {step === 2 && (
        <section className="mx-auto mt-6 max-w-6xl px-4 sm:px-6">
          <div className="mb-4 rounded-xl border border-[#e2efe6] bg-white p-4 text-sm text-gray-700">
            <p className="font-semibold text-gray-900">Next best action</p>
            <p className="mt-1">Pick a matched offer, then upload documents. Lender decisioning stays with the bank. Need help?</p>
            <Link to="/expert" className="mt-2 inline-flex items-center gap-1.5 font-semibold text-[#10662A]">
              <PhoneCall className="h-4 w-4" /> Talk to an expert
            </Link>
          </div>
          {eligibleOffers.length === 0 ? (
            <div className="rd-rise rounded-xl border border-[#e2efe6] bg-white p-8 text-center shadow-sm sm:p-12">
              <p className="text-xl font-bold text-gray-900">No lender matches yet</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">
                {unmatched[0]?.reason ?? "Try adjusting your details."} Reducing existing EMIs, adding a co-applicant or improving your CIBIL score usually helps.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={() => setStep(1)} className="rounded-xl border border-[#10662A]/40 px-6 py-3 text-sm font-semibold text-[#10662A]">
                  Edit details
                </button>
                <Link to="/expert" className="rounded-xl bg-[#10662A] px-6 py-3 text-sm font-semibold text-white">
                  Talk to an expert
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="rd-rise grid gap-3 rounded-xl border border-[#e2efe6] bg-white p-5 shadow-sm sm:grid-cols-3 sm:p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Highest {amountLabel.toLowerCase()}</p>
                  <p className="mt-0.5 text-xl font-extrabold tabular-nums text-[#10662A]">{formatShortINR(bestAmount)}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{productKind === "card" ? "Product" : "Lowest rate"}</p>
                  <p className="mt-0.5 text-xl font-extrabold text-gray-900">{productKind === "card" ? "Credit card" : `${lowestRate}%`}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Matching lenders</p>
                  <p className="mt-0.5 text-xl font-extrabold text-gray-900">
                    {eligibleOffers.length}
                    <span className="text-lg font-semibold text-slate-400"> / {offers.length}</span>
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-gray-600">
                  Select one lender for <span className="font-semibold text-gray-900">{form.product}</span>
                  {form.cibil === "0" && <span className="text-slate-400"> · assuming CIBIL {ASSUMED_CIBIL}</span>}
                </p>
                <div className="flex w-full rounded-xl border border-[#d8ecdd] bg-white p-1 sm:w-auto">
                  {(
                    [
                      ["amount", "Highest amount"],
                      ["rate", "Lowest rate"],
                      ...(productKind === "card" ? [] : [["monthly", productKind === "revolving" ? "Lowest cost" : "Lowest EMI"]]),
                    ] as [SortKey, string][]
                  ).map(([k, label]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => setSortKey(k)}
                      className={`flex-1 rounded-lg px-3 py-2 text-xs font-semibold transition sm:flex-none ${sortKey === k ? "bg-[#10662A] text-white" : "text-gray-600 hover:text-gray-900"}`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="hidden grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_1fr_24px] items-center gap-3 border-b border-gray-200 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-500 md:grid">
                  <span>Bank</span>
                  <span>{amountLabel}</span>
                  <span>Interest rate</span>
                  <span>{productKind === "term" ? "Tenure" : "Review"}</span>
                  <span>{productKind === "card" ? "Fee" : monthlyLabel}</span>
                  <span />
                </div>
                {eligibleOffers.map((o) => {
                  const isSel = selected === o.lender.name;
                  const showBestAmount = !amountsAllEqual && o.amount === bestAmount;
                  const showLowestRate = productKind !== "card" && o.rate === lowestRate;
                  const rateText = productKind === "card" ? "~3% pm" : `${o.rate}%`;
                  const tenureText =
                    productKind === "term" ? tenureLabel(o.tenureMonths) : productKind === "card" ? "—" : "Yearly";
                  const monthlyText = productKind === "card" ? "Varies" : formatINR(o.monthly);
                  return (
                    <button
                      type="button"
                      key={o.lender.name}
                      onClick={() => setSelected(o.lender.name)}
                      className={`grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2 border-b border-gray-100 px-4 py-3 text-left transition last:border-b-0 md:grid-cols-[minmax(0,2fr)_1fr_1fr_1fr_1fr_24px] ${
                        isSel ? "bg-green-50" : "hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <img src={o.lender.logo} alt="" className="h-8 w-12 shrink-0 object-contain" loading="lazy" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-900">{o.lender.name}</p>
                          <p className="flex flex-wrap items-center gap-x-2 text-xs text-gray-500">
                            {LENDER_KIND_LABEL[o.lender.kind]}
                            {showLowestRate && <span className="font-semibold text-[#10662A]">Lowest rate</span>}
                            {showBestAmount && <span className="font-semibold text-[#10662A]">Highest amount</span>}
                            <span className={chanceStyle[o.chance]}>{o.chance} chance</span>
                          </p>
                        </div>
                      </div>

                      <span
                        className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 md:order-last ${isSel ? "border-[#10662A] bg-[#10662A]" : "border-gray-300"}`}
                        aria-hidden
                      >
                        {isSel && <span className="h-2 w-2 rounded-full bg-white" />}
                      </span>

                      <div className="col-span-2 grid grid-cols-4 gap-2 text-xs md:col-span-4 md:text-sm">
                        <p>
                          <span className="block text-gray-500 md:hidden">Amount</span>
                          <span className="font-bold text-[#10662A]">{formatShortINR(o.amount)}</span>
                        </p>
                        <p>
                          <span className="block text-gray-500 md:hidden">Rate</span>
                          <span className="font-semibold text-gray-900">{rateText}</span>
                        </p>
                        <p>
                          <span className="block text-gray-500 md:hidden">{productKind === "term" ? "Tenure" : "Review"}</span>
                          <span className="font-semibold text-gray-900">{tenureText}</span>
                        </p>
                        <p>
                          <span className="block text-gray-500 md:hidden">{productKind === "card" ? "Fee" : monthlyLabel}</span>
                          <span className="font-semibold text-gray-900">{monthlyText}</span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
              {requested > 0 && eligibleOffers.some((o) => o.amount >= requested) && (
                <p className="mt-2 text-xs text-gray-500">
                  Banks showing {formatShortINR(requested)} or more can cover the amount you asked for.
                </p>
              )}

              {unmatched.length > 0 && (
                <div className="mt-6 rounded-2xl border border-[#e2efe6] bg-white/70">
                  <button
                    type="button"
                    onClick={() => setShowUnmatched((v) => !v)}
                    className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-gray-600"
                  >
                    {unmatched.length} lender{unmatched.length === 1 ? "" : "s"} didn't match — see why
                    <ChevronDown className={`h-4 w-4 transition ${showUnmatched ? "rotate-180" : ""}`} />
                  </button>
                  {showUnmatched && (
                    <ul className="grid gap-2 border-t border-[#eef5f0] p-4 sm:grid-cols-2">
                      {unmatched.map((o) => (
                        <li key={o.lender.name} className="flex items-center gap-3 rounded-xl bg-white px-3 py-2.5 text-xs">
                          <img src={o.lender.logo} alt="" className="h-6 w-10 object-contain opacity-60" loading="lazy" />
                          <span className="min-w-0">
                            <span className="block font-semibold text-gray-900">{o.lender.name}</span>
                            <span className="text-slate-500">{o.reason}</span>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#e2efe6] bg-white/95 px-4 py-3 backdrop-blur sm:static sm:mt-8 sm:border-0 sm:bg-transparent sm:p-0">
                <div className="mx-auto flex max-w-6xl items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex h-12 items-center gap-1.5 rounded-xl border border-[#10662A]/35 px-4 text-sm font-semibold text-[#10662A] sm:px-6"
                  >
                    <ArrowLeft className="h-4 w-4" /> <span className="hidden sm:inline">Edit details</span>
                  </button>
                  <button
                    type="button"
                    disabled={!selectedOffer}
                    onClick={() => setStep(3)}
                    className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#10662A] px-6 text-sm font-semibold text-white hover:bg-[#0c5222] transition disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                  >
                    {selectedOffer ? `Continue with ${selectedOffer.lender.name}` : "Select a lender to continue"}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      {/* STEP 3 — DOCUMENTS */}
      {step === 3 && selectedOffer && (
        <section className="mx-auto mt-6 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_340px]">
          <div className="rd-rise rounded-xl border border-[#e2efe6] bg-white p-5 shadow-sm sm:p-8">
            <h2 className="text-lg font-bold text-gray-900">Upload documents</h2>
            <p className="mt-1 text-sm text-gray-600">
              Optional now — uploading speeds up approval. You can also share them later with your RupeeDial expert.
            </p>

            <ul className="mt-6 space-y-3">
              {requiredDocs.map((doc) => {
                const bucket = docBucket(doc);
                const list = docFiles(doc);
                return (
                  <li key={doc} className="rounded-2xl border border-slate-200 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-3">
                        <span className={`grid h-9 w-9 place-items-center rounded-full ${list.length ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-400"}`}>
                          {list.length ? <CheckCircle2 className="h-5 w-5" /> : <FileUp className="h-4 w-4" />}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{doc}</p>
                          <p className="text-xs text-slate-500">PDF, JPG or PNG</p>
                        </div>
                      </div>
                      <label className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#10662A]/35 px-4 py-2.5 text-sm font-semibold text-[#10662A] hover:bg-[#E8F7EC]">
                        <FileUp className="h-4 w-4" /> Choose file
                        <input
                          type="file"
                          multiple
                          accept=".pdf,.jpg,.jpeg,.png"
                          className="sr-only"
                          onChange={(e) => {
                            addFiles(doc, e.target.files);
                            e.target.value = "";
                          }}
                        />
                      </label>
                    </div>
                    {list.length > 0 && (
                      <ul className="mt-3 flex flex-wrap gap-2">
                        {list.map((f) => (
                          <li key={f.name} className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[#f4faf6] py-1 pl-3 pr-1 text-xs text-gray-900">
                            <span className="truncate">{f.name}</span>
                            <button type="button" onClick={() => removeFile(bucket, f.name)} className="grid h-5 w-5 place-items-center rounded-full hover:bg-white" aria-label={`Remove ${f.name}`}>
                              <X className="h-3 w-3" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
              <button type="button" onClick={() => setStep(2)} className="flex h-12 items-center justify-center gap-1.5 rounded-xl border border-[#10662A]/35 px-6 text-sm font-semibold text-[#10662A]">
                <ArrowLeft className="h-4 w-4" /> Back to offers
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={submitting}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#10662A] px-6 text-sm font-semibold text-white hover:bg-[#0c5222] disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
                  </>
                ) : (
                  <>
                    Submit application <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          <aside className="rd-rise rd-rise-delay-1 lg:sticky lg:top-[calc(var(--header-h)+1.5rem)] lg:self-start">
            <div className="rounded-xl border border-[#e2efe6] bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Your selected offer</p>
              <div className="mt-3 flex items-center gap-3">
                <img src={selectedOffer.lender.logo} alt="" className="h-10 w-14 object-contain" />
                <p className="font-semibold text-gray-900">{selectedOffer.lender.name}</p>
              </div>
              <dl className="mt-5 space-y-2.5 text-sm">
                <div className="flex justify-between"><dt className="text-slate-500">{form.product}</dt><dd className="font-bold text-[#10662A]">{formatINR(selectedOffer.amount)}</dd></div>
                {productKind !== "card" && <div className="flex justify-between"><dt className="text-slate-500">Rate</dt><dd className="font-semibold text-gray-900">{selectedOffer.rate}% p.a.</dd></div>}
                {productKind === "term" && (
                  <>
                    <div className="flex justify-between"><dt className="text-slate-500">Tenure</dt><dd className="font-semibold text-gray-900">{tenureLabel(selectedOffer.tenureMonths)}</dd></div>
                    <div className="flex justify-between"><dt className="text-slate-500">EMI</dt><dd className="font-semibold text-gray-900">{formatINR(selectedOffer.monthly)}</dd></div>
                  </>
                )}
              </dl>
            </div>
          </aside>
        </section>
      )}

      {/* STEP 4 — DONE */}
      {step === 4 && selectedOffer && (
        <section className="mx-auto mt-6 max-w-2xl px-4 sm:px-6">
          <div className="rd-rise rounded-xl border border-[#e2efe6] bg-white p-6 text-center shadow-sm sm:p-10">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-[#E8F7EC]">
              <CheckCircle2 className="h-8 w-8 text-[#10662A]" />
            </div>
            <h2 className="mt-4 text-xl font-bold text-gray-900 sm:text-2xl">Application submitted</h2>
            <p className="mt-2 text-sm text-gray-600">
              A RupeeDial expert will call you within 24 working hours to take your {form.product} forward with {selectedOffer.lender.name}.
            </p>

            <dl className="mt-6 grid gap-3 rounded-2xl bg-[#f4faf6] p-5 text-left text-sm sm:grid-cols-2">
              <div><dt className="text-xs text-slate-500">Reference ID</dt><dd className="font-mono font-semibold text-gray-900">{leadId || "—"}</dd></div>
              <div><dt className="text-xs text-slate-500">Applicant</dt><dd className="font-semibold text-gray-900">{form.fullName}</dd></div>
              <div><dt className="text-xs text-slate-500">Lender</dt><dd className="font-semibold text-gray-900">{selectedOffer.lender.name}</dd></div>
              <div><dt className="text-xs text-slate-500">{amountLabel}</dt><dd className="font-semibold text-[#10662A]">{formatINR(selectedOffer.amount)}</dd></div>
            </dl>

            {crmLogin && (
              <div className="mt-6 rounded-2xl border border-[#d7eadb] bg-white p-4 text-left text-sm">
                <p className="font-semibold text-[#390A5D]">Your customer login</p>
                <p className="mt-1 text-[#5c4d72]">Email {crmLogin.email}</p>
                {crmLogin.password ? <p className="mt-1 text-[#5c4d72]">Password {crmLogin.password}</p> : <p className="mt-1 text-[#5c4d72]">Use the password from your first eligibility check.</p>}
                <a href={`${CRM_APP_URL}/auth`} className="mt-3 inline-flex font-semibold text-[#10662A]">Open customer dashboard</a>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <button type="button" onClick={downloadSummary} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#10662A] px-6 text-sm font-semibold text-white">
                <Download className="h-4 w-4" /> Download summary
              </button>
              <button type="button" onClick={resetAll} className="h-12 rounded-xl border border-[#10662A]/35 px-6 text-sm font-semibold text-[#10662A]">
                Check another product
              </button>
            </div>
          </div>
        </section>
      )}

      {/* TRUST */}
      {step !== 4 && (
        <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { t: "Negotiated offers", d: "We compare 20+ banks & NBFCs and negotiate better terms on your behalf." },
              { t: "Guided paperwork", d: "A dedicated expert helps with documents — paperless wherever possible." },
              { t: "No hidden charges", d: "Checking eligibility is free and never affects your credit score." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl border border-[#e2efe6] bg-white/80 p-5">
                <CheckCircle2 className="h-5 w-5 text-[#10662A]" />
                <p className="mt-3 font-semibold text-gray-900">{c.t}</p>
                <p className="mt-1 text-sm leading-relaxed text-gray-600">{c.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-[11px] leading-relaxed text-slate-500">
            Eligibility shown is indicative and based on your inputs and typical lender policies. Final approval, amount, interest rate and disbursal depend on the lender's assessment.
          </p>
        </section>
      )}
    </main>
  );
};

export default LoanEligibilityPage;

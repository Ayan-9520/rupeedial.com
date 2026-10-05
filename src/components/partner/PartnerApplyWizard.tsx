import { useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { apiUrl } from "../../config/api";
import { CRM_API_URL, CRM_APP_URL } from "../../data/partnerPlans";
import {
  JOURNEY_STEPS,
  PARTNER_PRODUCTS,
  PARTNER_TYPES,
  type PartnerType,
} from "../../data/partnerTypes";

const STEPS = ["You", "KYC", "Agreement", "Bank", "Work"] as const;

type Docs = { pan?: File; aadhaar?: File; bank?: File };

const inputClass =
  "mt-1.5 h-12 w-full rounded-xl border border-[#d7eadb] bg-[#f8fdf9] px-4 text-sm text-[#390A5D] outline-none transition focus:border-[#10662A] focus:bg-white focus:ring-4 focus:ring-[#10662A]/10";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-[13px] font-semibold text-[#390A5D]">
      {label}
      {children}
    </label>
  );
}

function readFile(
  file: File,
  key: keyof Docs,
  setDocs: Dispatch<SetStateAction<Docs>>,
  setError: (message: string) => void,
) {
  if (file.size > 2 * 1024 * 1024) {
    setError("File must be less than 2MB");
    return;
  }
  const allowed = ["image/jpeg", "image/png", "application/pdf"];
  if (!allowed.includes(file.type)) {
    setError("Only JPG, PNG or PDF");
    return;
  }
  setError("");
  setDocs((prev) => ({ ...prev, [key]: file }));
}

function ifscError(value: string) {
  const code = value.toUpperCase().replace(/\s/g, "");
  if (/^[A-Z]{4}0[A-Z0-9]{6}$/.test(code)) return "";
  if (code.length !== 11) {
    return `IFSC is 11 characters. You entered ${code.length}. Example: SBIN0001234`;
  }
  return "IFSC looks like SBIN0001234: 4 letters, then 0, then 6 letters or numbers";
}

export default function PartnerApplyWizard() {
  const [params] = useSearchParams();
  const sponsor = (params.get("ref") || "").trim();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const [partnerType, setPartnerType] = useState<PartnerType>("dsa");
  const [fullName, setFullName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [pan, setPan] = useState("");
  const [aadhaarLast4, setAadhaarLast4] = useState("");
  const [docs, setDocs] = useState<Docs>({});
  const [agreement, setAgreement] = useState(false);
  const [consent, setConsent] = useState(false);
  const [accountHolder, setAccountHolder] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [products, setProducts] = useState<string[]>(["personal_loan"]);
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [experience, setExperience] = useState("1");
  const [error, setError] = useState("");

  const toggleProduct = (value: string) => {
    setProducts((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const next = () => {
    if (step === 0) {
      if (fullName.trim().length < 2) return setError("Enter your full name");
      if (!/^[6-9]\d{9}$/.test(mobile)) return setError("Enter a 10-digit mobile number");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError("Enter a valid email");
    }
    if (step === 1) {
      if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(pan.toUpperCase())) return setError("PAN format: ABCDE1234F");
      if (!/^\d{4}$/.test(aadhaarLast4)) return setError("Enter the last 4 digits of Aadhaar");
      if (!docs.pan || !docs.aadhaar) return setError("Upload PAN and Aadhaar");
    }
    if (step === 2 && (!agreement || !consent)) {
      return setError("Accept the partner agreement and contact consent");
    }
    if (step === 3) {
      if (accountHolder.trim().length < 2) return setError("Enter the account holder name");
      if (!/^\d{9,18}$/.test(bankAccount)) return setError("Enter a valid account number");
      const bankCodeError = ifscError(ifsc);
      if (bankCodeError) return setError(bankCodeError);
      if (!docs.bank) return setError("Upload bank proof");
    }
    setError("");
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const submit = async () => {
    if (products.length === 0) return setError("Select at least one product");
    if (city.trim().length < 2) return setError("Enter your city");
    if (!/^\d{6}$/.test(pincode)) return setError("Enter a 6-digit pincode");
    setError("");
    setLoading(true);

    const profile = {
      pan: pan.toUpperCase(),
      aadhaar_last4: aadhaarLast4,
      pan_file: docs.pan?.name || "",
      aadhaar_file: docs.aadhaar?.name || "",
      bank_file: docs.bank?.name || "",
      agreement_accepted: "yes",
      consent: "yes",
      account_holder: accountHolder.trim(),
      bank_account: bankAccount,
      ifsc: ifsc.toUpperCase(),
      products: products.join(","),
      pincode,
      experience_years: experience,
      journey: {
        kyc: "submitted",
        verification: "pending",
        agreement: "accepted",
        bank: "submitted",
        products: "selected",
        geography: "submitted",
        experience: "submitted",
        training: "pending",
        activation: "pending",
      },
      sponsor_code: sponsor,
    };

    try {
      if (import.meta.env.DEV) {
        const key =
          (import.meta.env.VITE_CRM_PUBLIC_API_KEY as string | undefined) ||
          "rupeedial-website-key-change-me";
        const websiteLeadId = `DSA-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(
          100000 + Math.random() * 900000
        )}`;
        const res = await fetch(`${CRM_API_URL}/api/public/partners`, {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-API-Key": key },
          body: JSON.stringify({
            website_lead_id: websiteLeadId,
            dsa_type: partnerType,
            full_name: fullName.trim(),
            mobile,
            phone: mobile,
            email: email.trim(),
            city: city.trim(),
            state: stateName.trim() || null,
            ref_code: sponsor || null,
            documents: profile,
            status: "PENDING",
          }),
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.detail || data.message || "Could not save application");
        setLeadId(data.website_lead_id || websiteLeadId);
      } else {
        const formData = new FormData();
        formData.append("dsaType", partnerType);
        formData.append("fullName", fullName.trim());
        formData.append("mobile", mobile);
        formData.append("email", email.trim());
        formData.append("city", city.trim());
        formData.append("state", stateName.trim());
        formData.append("profile", JSON.stringify(profile));
        if (docs.pan) formData.append("pan", docs.pan);
        if (docs.aadhaar) formData.append("aadhar", docs.aadhaar);
        if (docs.bank) formData.append("bank", docs.bank);
        const res = await fetch(apiUrl("partner/apply"), { method: "POST", body: formData });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.message || "Submission failed");
        setLeadId(data.leadId);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Server error");
    } finally {
      setLoading(false);
    }
  };

  if (leadId) {
    return (
      <div className="rounded-3xl border border-[#d7eadb] bg-white p-6 shadow-[0_24px_64px_rgba(16,102,42,0.12)] sm:p-8">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#10662A]">Application received</p>
        <h2 className="mt-2 font-display text-2xl font-extrabold text-[#390A5D]">You are in the partner queue</h2>
        <p className="mt-2 text-sm text-[#390A5D]">
          Application ID <span className="font-mono font-bold">{leadId}</span>
        </p>
        <ol className="mt-4 space-y-2 text-sm text-[#390A5D]">
          {JOURNEY_STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold ${
                  i < 7 ? "bg-[#10662A] text-white" : "bg-[#E8F7EC] text-[#10662A]"
                }`}
              >
                {i + 1}
              </span>
              <span>
                {label}
                {i < 7 ? " — done" : " — after RupeeDial verifies you"}
              </span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-sm text-slate-600">
          After approval you get a login. Training is assigned, then the account is activated.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row">
          <Link
            to="/login"
            className="inline-flex justify-center rounded-xl bg-[#10662A] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Partner login
          </Link>
          <a
            href={`${CRM_APP_URL}/auth`}
            className="inline-flex justify-center rounded-xl border border-[#10662A] px-4 py-2.5 text-sm font-semibold text-[#10662A]"
          >
            Open CRM
          </a>
          <Link
            to="/"
            className="inline-flex justify-center rounded-xl px-4 py-2.5 text-sm font-semibold text-[#390A5D]"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-white/80 bg-white p-5 shadow-[0_24px_64px_rgba(16,102,42,0.14)] sm:p-7 lg:sticky lg:top-24">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#10662A]">
            Step {step + 1} of {STEPS.length}
          </p>
          <h2 className="font-display text-xl font-extrabold text-[#390A5D]">{STEPS[step]}</h2>
          {sponsor ? <p className="mt-1 text-xs font-semibold text-[#10662A]">Invited with code {sponsor}</p> : null}
        </div>
        <span className="rounded-full bg-[#E8F7EC] px-3 py-1 text-xs font-bold text-[#10662A]">
          {Math.round(((step + 1) / STEPS.length) * 100)}%
        </span>
      </div>
      <div className="mb-6 grid grid-cols-5 gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="text-center">
            <span
              className={`mx-auto grid h-8 w-8 place-items-center rounded-full text-xs font-bold ${
                i <= step ? "bg-[#10662A] text-white" : "bg-[#E8F7EC] text-[#10662A]"
              }`}
            >
              {i + 1}
            </span>
            <span className={`mt-1 block text-[10px] font-semibold ${i === step ? "text-[#0D4F20]" : "text-slate-400"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      {step === 0 && (
        <div className="space-y-3.5">
          <Field label="Partner type">
            <select
              className={inputClass}
              value={partnerType}
              onChange={(e) => setPartnerType(e.target.value as PartnerType)}
            >
              {PARTNER_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Full name">
            <input className={inputClass} placeholder="Your name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          </Field>
          <Field label="Mobile">
            <input
              className={inputClass}
              placeholder="10-digit mobile"
              inputMode="numeric"
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
            />
          </Field>
          <Field label="Email">
            <input className={inputClass} placeholder="name@email.com" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-3.5">
          <Field label="PAN">
            <input
              className={inputClass}
              placeholder="ABCDE1234F"
              value={pan}
              onChange={(e) => setPan(e.target.value.toUpperCase().slice(0, 10))}
            />
          </Field>
          <Field label="Aadhaar last 4 digits">
            <input
              className={inputClass}
              placeholder="1234"
              inputMode="numeric"
              value={aadhaarLast4}
              onChange={(e) => setAadhaarLast4(e.target.value.replace(/\D/g, "").slice(0, 4))}
            />
          </Field>
          <Field label={docs.pan ? `PAN file · ${docs.pan.name}` : "PAN file · JPG, PNG or PDF"}>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="mt-1.5 block w-full text-sm text-slate-600" onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0], "pan", setDocs, setError)} />
          </Field>
          <Field label={docs.aadhaar ? `Aadhaar file · ${docs.aadhaar.name}` : "Aadhaar file · JPG, PNG or PDF"}>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="mt-1.5 block w-full text-sm text-slate-600" onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0], "aadhaar", setDocs, setError)} />
          </Field>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3 text-sm leading-relaxed text-[#390A5D]">
          <div className="rounded-2xl border border-[#d7eadb] bg-[#f8fdf9] p-4">
            I agree to work as a RupeeDial financial partner, follow lender and compliance rules, and share
            customer data only with consent.
          </div>
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={agreement} onChange={(e) => setAgreement(e.target.checked)} className="mt-1" />
            I accept the partner agreement.
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
            I agree to the{" "}
            <Link to="/terms" className="font-semibold text-[#10662A]">
              Terms
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="font-semibold text-[#10662A]">
              Privacy Policy
            </Link>
            , and allow contact by call, SMS, WhatsApp and email.
          </label>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3.5">
          <Field label="Account holder name">
            <input className={inputClass} placeholder="Name on the account" value={accountHolder} onChange={(e) => setAccountHolder(e.target.value)} />
          </Field>
          <Field label="Account number">
            <input
              className={inputClass}
              placeholder="9 to 18 digits"
              inputMode="numeric"
              value={bankAccount}
              onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, "").slice(0, 18))}
            />
          </Field>
          <Field label="IFSC">
            <input
              className={inputClass}
              placeholder="HDFC0001234"
              value={ifsc}
              maxLength={11}
              onChange={(e) => {
                setIfsc(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 11));
                setError("");
              }}
            />
            <span className="mt-1 block text-xs font-medium text-slate-500">11 characters, for example SBIN0001234</span>
          </Field>
          <Field label={docs.bank ? `Bank proof · ${docs.bank.name}` : "Bank proof · cancelled cheque or statement"}>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" className="mt-1.5 block w-full text-sm text-slate-600" onChange={(e) => e.target.files?.[0] && readFile(e.target.files[0], "bank", setDocs, setError)} />
          </Field>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-3">
          <p className="text-sm font-semibold text-[#390A5D]">Products</p>
          <div className="grid grid-cols-2 gap-2">
            {PARTNER_PRODUCTS.map((p) => {
              const on = products.includes(p.value);
              return (
                <label
                  key={p.value}
                  className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold ${
                    on ? "border-[#10662A] bg-[#E8F7EC] text-[#0D4F20]" : "border-[#d7eadb] bg-white text-[#390A5D]"
                  }`}
                >
                  <input type="checkbox" className="accent-[#10662A]" checked={on} onChange={() => toggleProduct(p.value)} />
                  {p.label}
                </label>
              );
            })}
          </div>
          <input className={inputClass} placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
          <input className={inputClass} placeholder="State" value={stateName} onChange={(e) => setStateName(e.target.value)} />
          <input
            className={inputClass}
            placeholder="Pincode"
            inputMode="numeric"
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
          />
          <label className="block text-sm text-[#390A5D]">
            Years of experience
            <input
              className={`${inputClass} mt-1`}
              type="number"
              min={0}
              max={40}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </label>
        </div>
      )}

      {error ? (
        <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-900">{error}</p>
      ) : null}

      <div className="mt-5 flex gap-2">
        {step > 0 && (
          <button
            type="button"
            onClick={() => setStep((s) => s - 1)}
            className="rounded-xl border border-[#d7eadb] px-4 py-2.5 text-sm font-semibold text-[#390A5D]"
          >
            Back
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={next} className="h-12 flex-1 rounded-xl bg-gradient-to-r from-[#10662A] to-[#0D4F20] text-sm font-bold text-white shadow-[0_10px_24px_rgba(16,102,42,0.28)]">
            Continue
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={() => void submit()}
            className="h-12 flex-1 rounded-xl bg-gradient-to-r from-[#10662A] to-[#0D4F20] text-sm font-bold text-white shadow-[0_10px_24px_rgba(16,102,42,0.28)] disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit application"}
          </button>
        )}
      </div>
    </div>
  );
}

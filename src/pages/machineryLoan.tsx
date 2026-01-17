import React, { useMemo, useState } from "react";
import {
  
  ClipboardCheck,
  CreditCard,
  CheckCheck,
  Calculator
} from "lucide-react";
import machineryImg from "../assets/images/auto-loan.png"; // reuse image or replace

/* ================= TYPES ================= */

type Step = 1 | 2 | 3 | 4;

interface MachineryForm {
  fullName: string;
  mobile: string;
  email: string;
  city: string;

  machineryType: string;
  machineryPrice: string;
  machineryCondition: "new" | "used";

  monthlyIncome: string;
  existingEmi: string;

  agree: boolean;
}

interface Offer {
  id: string;
  bankName: string;
  interestRate: number;
  emi: number;
  processingTime: string;
}

/* ================= RULES ================= */

const MACHINERY_RULES = {
  new: { ltv: 0.8, baseRate: 9.5 },
  used: { ltv: 0.65, baseRate: 11.5 },
} as const;

/* ================= OFFERS ================= */

const OFFERS: Offer[] = [
  {
    id: "hdfc",
    bankName: "HDFC Bank",
    interestRate: 9.8,
    emi: 0,
    processingTime: "5–7 Days",
  },
  {
    id: "sbi",
    bankName: "State Bank of India",
    interestRate: 9.6,
    emi: 0,
    processingTime: "7–10 Days",
  },
  {
    id: "icici",
    bankName: "ICICI Bank",
    interestRate: 10.2,
    emi: 0,
    processingTime: "5–7 Days",
  },
  {
    id: "bajaj",
    bankName: "Bajaj Finance",
    interestRate: 11.9,
    emi: 0,
    processingTime: "2–4 Days",
  },
];

/* ================= UI CLASSES ================= */

const inputClass =
  "mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10662A]";

/* ================= COMPONENT ================= */

const MachineryLoanPage: React.FC = () => {
  const [step, setStep] = useState<Step>(1);

  const [form, setForm] = useState<MachineryForm>({
    fullName: "",
    mobile: "",
    email: "",
    city: "",
    machineryType: "",
    machineryPrice: "",
    machineryCondition: "new",
    monthlyIncome: "",
    existingEmi: "0",
    agree: false,
  });

  /* ===== Eligibility ===== */


  const maxLoan = useMemo(() => {
    const price = Number(form.machineryPrice || 0);
    const rule = MACHINERY_RULES[form.machineryCondition];
    if (!price) return 0;
    return Math.floor(price * rule.ltv);
  }, [form.machineryPrice, form.machineryCondition]);

  /* ===== Offers ===== */


  const calculatedOffers = useMemo(() => {
    if (!maxLoan) return [];

    return OFFERS.map((o) => {
      const rate =
        o.interestRate +
        (MACHINERY_RULES[form.machineryCondition].baseRate - 9.5);

      const r = rate / 12 / 100;
      const n = 60;
      const emi = Math.round(
        (maxLoan * r * Math.pow(1 + r, n)) /
          (Math.pow(1 + r, n) - 1)
      );

      return {
        ...o,
        interestRate: Number(rate.toFixed(2)),
        emi,
      };
    });
  }, [maxLoan, form.machineryCondition]);

  /* ===== Handlers ===== */

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      setForm((p) => ({ ...p, agree: !p.agree }));
    } else {
      setForm((p) => ({ ...p, [name]: value }));
    }
  };

  const next = () => setStep((s) => (s < 4 ? ((s + 1) as Step) : s));
  const back = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  /* ================= JSX ================= */

  return (
    <div className="w-full bg-white">
      {/* HERO */}
      <section className="bg-[#F5FFF8] border-b border-slate-100">
        <div className="mx-auto max-w-6xl px-4 py-6 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-[#10662A]">
              Machinery Loan
            </h1>
            <p className="mt-2 text-[#390A5D]">
              Finance new or used machinery with flexible repayment & fast
              approval.
            </p>
          </div>
          <img
            src={machineryImg}
            alt="Machinery Loan"
            className="w-[280px]"
          />
        </div>
      </section>

      {/* STEP 1 */}
      {step === 1 && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <div className="rounded-xl border shadow p-6 space-y-5">
            <h2 className="font-semibold text-[#10662A] flex items-center gap-2">
              <Calculator className="w-5 h-5" /> Machinery Details
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                name="machineryType"
                placeholder="Machinery Type*"
                className={inputClass}
                value={form.machineryType}
                onChange={handleChange}
              />
              <select
                name="machineryCondition"
                className={inputClass}
                value={form.machineryCondition}
                onChange={handleChange}
              >
                <option value="new">New Machinery</option>
                <option value="used">Used Machinery</option>
              </select>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="number"
                name="machineryPrice"
                placeholder="Machinery Price (₹)*"
                className={inputClass}
                value={form.machineryPrice}
                onChange={handleChange}
              />
              <input
                readOnly
                value={
                  maxLoan
                    ? `Eligible Loan ₹ ${maxLoan.toLocaleString("en-IN")}`
                    : ""
                }
                className={`${inputClass} bg-[#F5FFF8] font-semibold`}
              />
            </div>

            <button
              onClick={next}
              className="w-full bg-[#10662A] text-white py-3 rounded-lg font-semibold"
            >
              Check Eligibility
            </button>
          </div>
        </section>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <section className="max-w-5xl mx-auto px-4 py-8">
          <h2 className="text-lg font-semibold text-[#10662A] mb-4 flex items-center gap-2">
            <ClipboardCheck className="w-5 h-5" />
            Compare Offers
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {calculatedOffers.map((o) => (
              <div
                key={o.id}
                className="border rounded-lg p-4 flex justify-between"
              >
                <div>
                  <p className="font-semibold">{o.bankName}</p>
                  <p className="text-sm text-[#390A5D]">
                    Interest: {o.interestRate}%
                  </p>
                  <p className="text-sm text-[#390A5D]">
                    EMI: ₹ {o.emi.toLocaleString("en-IN")}
                  </p>
                </div>
                <button
                  onClick={next}
                  className="bg-[#10662A] text-white px-4 py-2 rounded-md text-sm"
                >
                  Select
                </button>
              </div>
            ))}
          </div>

          <button onClick={back} className="mt-4 text-sm text-[#10662A]">
            ← Back
          </button>
        </section>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <section className="max-w-4xl mx-auto px-4 py-8">
          <h2 className="font-semibold text-[#10662A] mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Applicant Details
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <input
              name="fullName"
              placeholder="Full Name*"
              className={inputClass}
              value={form.fullName}
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
              name="email"
              placeholder="Email*"
              className={inputClass}
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="city"
              placeholder="City*"
              className={inputClass}
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <button
            onClick={next}
            className="mt-6 w-full bg-[#10662A] text-white py-3 rounded-lg"
          >
            Submit Application
          </button>
        </section>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <section className="max-w-xl mx-auto px-4 py-12 text-center">
          <CheckCheck className="mx-auto w-14 h-14 text-green-600" />
          <h2 className="mt-4 text-xl font-semibold text-green-700">
            Application Submitted!
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Our loan expert will contact you shortly.
          </p>
        </section>
      )}
    </div>
  );
};

export default MachineryLoanPage;

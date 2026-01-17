import React, { useState } from "react";

/* ================= TYPES ================= */

type Product =
  | "Personal Loan"
  | "Home Loan"
  | "MSME Loan"
  | "Mudra Loan"
  | "Auto Loan"
  | "Credit Card"
  | "Loan Against Property";

interface FormData {
  product: Product | "";
  purpose: string;
  fullName: string;
  pan: string;
  aadhaar: string;
  mobile: string;
  email: string;
  city: string;
  employment: string;
  companyName: string;
  monthlyIncome: number | "";
  existingEmi: number | "";
  cibil: number | "";
  propertyValue?: number | "";
  acceptConsent: boolean;
}

/* ================= RULES ================= */

const PRODUCT_RULES: Record<Product, { minIncome: number; multiplier: number }> =
{
  "Personal Loan": { minIncome: 15000, multiplier: 20 },
  "Home Loan": { minIncome: 25000, multiplier: 60 },
  "MSME Loan": { minIncome: 20000, multiplier: 36 },
  "Mudra Loan": { minIncome: 10000, multiplier: 12 },
  "Auto Loan": { minIncome: 18000, multiplier: 30 },
  "Credit Card": { minIncome: 18000, multiplier: 30 },
  "Loan Against Property": { minIncome: 30000, multiplier: 80 },
};

/* ================= BANK LOGOS ================= */

import eligibilities from "../assets/images/eligibilities.png";
import union from "../assets/images/union.png";
import bob from "../assets/images/bob.png";
import boi from "../assets/images/boi.png";
import indian from "../assets/images/indian-bank.png";
import canara from "../assets/images/canara.png";

import maha from "../assets/images/maharastra.png";
import central from "../assets/images/central.png";
import uco from "../assets/images/uco.png";
import pnb from "../assets/images/pnb.png";
import sbi from "../assets/images/sbi.png";
import hdfc from "../assets/images/hdfc-b.png";
import axis from "../assets/images/axis.png";
import yes from "../assets/images/yes.png";
import bandhan from "../assets/images/bandhan.jpg";
import kotak from "../assets/images/kotak.png";
import au from "../assets/images/au.jpg";
import icici from "../assets/images/icici.png";
import idbi from "../assets/images/idbi.png";
import hdb from "../assets/images/hdbi.jpg";
import tata from "../assets/images/tcl-logo.webp";
import bajaj from "../assets/images/bajaj.jpg";
import mahindra from "../assets/images/mahindra.jpg";

/* ================= BANK DATA ================= */
interface BankRule {
  name: string;
  logo: string;
  productMultiplier: Partial<Record<Product, number>>;
  emiFactor: number;
  lowCibilFactor: number;
}


const BANKS: BankRule[] = [
  {
    name: "Union Bank of India",
    logo: union,
    emiFactor: 7,
    lowCibilFactor: 0.8,
    productMultiplier: {
      "Personal Loan": 18,
      "Home Loan": 60,
      "Auto Loan": 26,
      "MSME Loan": 24,
      "Loan Against Property": 70,
      "Mudra Loan": 10,
    },
  },
  {
    name: "Bank of Baroda",
    logo: bob,
    emiFactor: 7,
    lowCibilFactor: 0.82,
    productMultiplier: {
      "Personal Loan": 19,
      "Home Loan": 62,
      "Auto Loan": 27,
      "MSME Loan": 25,
      "Loan Against Property": 72,
      "Mudra Loan": 11,
    },
  },
  {
    name: "Bank of India",
    logo: boi,
    emiFactor: 7,
    lowCibilFactor: 0.8,
    productMultiplier: {
      "Personal Loan": 18,
      "Home Loan": 60,
      "Auto Loan": 26,
      "MSME Loan": 24,
      "Loan Against Property": 70,
      "Mudra Loan": 10,
    },
  },
  {
    name: "Indian Bank",
    logo: indian,
    emiFactor: 6,
    lowCibilFactor: 0.78,
    productMultiplier: {
      "Personal Loan": 17,
      "Home Loan": 58,
      "Auto Loan": 25,
      "MSME Loan": 23,
      "Loan Against Property": 68,
      "Mudra Loan": 10,
    },
  },
  {
    name: "Canara Bank",
    logo: canara,
    emiFactor: 7,
    lowCibilFactor: 0.8,
    productMultiplier: {
      "Personal Loan": 19,
      "Home Loan": 61,
      "Auto Loan": 27,
      "MSME Loan": 25,
      "Loan Against Property": 72,
      "Mudra Loan": 11,
    },
  },

  {
    name: "Bank of Maharashtra",
    logo: maha,
    emiFactor: 6,
    lowCibilFactor: 0.78,
    productMultiplier: {
      "Personal Loan": 17,
      "Home Loan": 58,
      "Auto Loan": 25,
      "MSME Loan": 23,
      "Loan Against Property": 68,
      "Mudra Loan": 9,
    },
  },
  {
    name: "Central Bank of India",
    logo: central,
    emiFactor: 6,
    lowCibilFactor: 0.78,
    productMultiplier: {
      "Personal Loan": 17,
      "Home Loan": 58,
      "Auto Loan": 25,
      "MSME Loan": 23,
      "Loan Against Property": 68,
      "Mudra Loan": 9,
    },
  },
  {
    name: "UCO Bank",
    logo: uco,
    emiFactor: 6,
    lowCibilFactor: 0.75,
    productMultiplier: {
      "Personal Loan": 16,
      "Home Loan": 56,
      "Auto Loan": 24,
      "MSME Loan": 22,
      "Loan Against Property": 66,
      "Mudra Loan": 9,
    },
  },
  {
    name: "Punjab National Bank",
    logo: pnb,
    emiFactor: 8,
    lowCibilFactor: 0.83,
    productMultiplier: {
      "Personal Loan": 20,
      "Home Loan": 65,
      "Auto Loan": 28,
      "MSME Loan": 26,
      "Loan Against Property": 75,
      "Mudra Loan": 11,
    },
  },
  {
    name: "State Bank of India",
    logo: sbi,
    emiFactor: 8,
    lowCibilFactor: 0.85,
    productMultiplier: {
      "Personal Loan": 20,
      "Home Loan": 70,
      "Auto Loan": 28,
      "MSME Loan": 26,
      "Loan Against Property": 80,
      "Mudra Loan": 10,
    },
  },

  {
    name: "HDFC Bank",
    logo: hdfc,
    emiFactor: 9,
    lowCibilFactor: 0.9,
    productMultiplier: {
      "Personal Loan": 22,
      "Home Loan": 65,
      "Auto Loan": 30,
      "MSME Loan": 28,
      "Loan Against Property": 75,
      "Mudra Loan": 12,
    },
  },
  {
    name: "Axis Bank",
    logo: axis,
    emiFactor: 8,
    lowCibilFactor: 0.88,
    productMultiplier: {
      "Personal Loan": 21,
      "Home Loan": 63,
      "Auto Loan": 29,
      "MSME Loan": 27,
      "Loan Against Property": 74,
      "Mudra Loan": 11,
    },
  },
  {
    name: "Yes Bank",
    logo: yes,
    emiFactor: 8,
    lowCibilFactor: 0.86,
    productMultiplier: {
      "Personal Loan": 21,
      "Home Loan": 64,
      "Auto Loan": 29,
      "MSME Loan": 27,
      "Loan Against Property": 74,
      "Mudra Loan": 11,
    },
  },
  {
    name: "Bandhan Bank",
    logo: bandhan,
    emiFactor: 7,
    lowCibilFactor: 0.82,
    productMultiplier: {
      "Personal Loan": 19,
      "Home Loan": 60,
      "Auto Loan": 27,
      "MSME Loan": 25,
      "Loan Against Property": 72,
      "Mudra Loan": 11,
    },
  },
  {
    name: "Kotak Mahindra Prime",
    logo: kotak,
    emiFactor: 8,
    lowCibilFactor: 0.9,
    productMultiplier: {
      "Personal Loan": 23,
      "Home Loan": 66,
      "Auto Loan": 31,
      "MSME Loan": 29,
      "Loan Against Property": 76,
      "Mudra Loan": 12,
    },
  },
  {
    name: "AU Small Finance Bank",
    logo: au,
    emiFactor: 7,
    lowCibilFactor: 0.83,
    productMultiplier: {
      "Personal Loan": 20,
      "Home Loan": 62,
      "Auto Loan": 28,
      "MSME Loan": 26,
      "Loan Against Property": 73,
      "Mudra Loan": 11,
    },
  },

  {
    name: "ICICI Bank",
    logo: icici,
    emiFactor: 8,
    lowCibilFactor: 0.9,
    productMultiplier: {
      "Personal Loan": 23,
      "Home Loan": 68,
      "Auto Loan": 32,
      "MSME Loan": 30,
      "Loan Against Property": 78,
      "Mudra Loan": 11,
    },
  },
  {
    name: "IDBI Bank",
    logo: idbi,
    emiFactor: 7,
    lowCibilFactor: 0.82,
    productMultiplier: {
      "Personal Loan": 19,
      "Home Loan": 61,
      "Auto Loan": 27,
      "MSME Loan": 25,
      "Loan Against Property": 72,
      "Mudra Loan": 10,
    },
  },
  {
    name: "HDB Financial Services",
    logo: hdb,
    emiFactor: 9,
    lowCibilFactor: 0.92,
    productMultiplier: {
      "Personal Loan": 26,
      "Home Loan": 0,
      "Auto Loan": 34,
      "MSME Loan": 32,
      "Loan Against Property": 0,
      "Mudra Loan": 0,
    },
  },
  {
    name: "Tata Capital",
    logo: tata,
    emiFactor: 9,
    lowCibilFactor: 0.93,
    productMultiplier: {
      "Personal Loan": 27,
      "Home Loan": 0,
      "Auto Loan": 35,
      "MSME Loan": 33,
      "Loan Against Property": 0,
      "Mudra Loan": 0,
    },
  },
  {
    name: "Bajaj Finance",
    logo: bajaj,
    emiFactor: 10,
    lowCibilFactor: 0.95,
    productMultiplier: {
      "Personal Loan": 28,
      "Home Loan": 0,
      "Auto Loan": 36,
      "MSME Loan": 34,
      "Loan Against Property": 0,
      "Mudra Loan": 0,
    },
  },
  {
    name: "Mahindra Finance",
    logo: mahindra,
    emiFactor: 8,
    lowCibilFactor: 0.88,
    productMultiplier: {
      "Personal Loan": 22,
      "Home Loan": 0,
      "Auto Loan": 30,
      "MSME Loan": 28,
      "Loan Against Property": 0,
      "Mudra Loan": 0,
    },
  },
];


const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B0E9B2]";

/* ================= COMPONENT ================= */
const calculateBankEligibility = (
  bank: BankRule,
  income: number,
  emi: number,
  cibil: number,
  product: Product,
  propertyValue?: number
) => {
  const multiplier = bank.productMultiplier[product];

  if (!multiplier) return 0;

  let amount = income * multiplier;

  if (emi > 0) amount -= emi * bank.emiFactor;

  if (cibil < 650) amount *= bank.lowCibilFactor;

  if (
    (product === "Home Loan" || product === "Loan Against Property") &&
    propertyValue
  ) {
    amount = Math.min(amount, propertyValue * 0.7);
  }

  if (product === "Mudra Loan") {
    amount = Math.min(amount, 1000000);
  }

  return Math.max(0, Math.round(amount));
};


const EligibilityCalculator: React.FC = () => {
  const [form, setForm] = useState<FormData>({
    product: "",
    purpose: "",
    fullName: "",
    pan: "",
    aadhaar: "",
    mobile: "",
    email: "",
    city: "",
    employment: "",
    companyName: "",
    monthlyIncome: "",
    existingEmi: "",
    cibil: "",
    propertyValue: "",
    acceptConsent: false,
  });

  const [showResult, setShowResult] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
      return;
    }

    if (["monthlyIncome", "existingEmi", "cibil", "propertyValue"].includes(name))
      setForm((p) => ({ ...p, [name]: value === "" ? "" : Number(value) }));
    else setForm((p) => ({ ...p, [name]: value }));
  };

 

  const handleSubmit = () => {
  if (!form.product || !form.fullName || !form.mobile || !form.monthlyIncome || !form.acceptConsent) {
    alert("Please fill all mandatory fields");
    return;
  }

  if (
    (form.product === "Home Loan" || form.product === "Loan Against Property") &&
    !form.propertyValue
  ) {
    alert("Property value required for selected product");
    return;
  }

  setShowResult(true);
};



  return (
    <main className="bg-[#f8fffb] min-h-screen">

      {/* HERO */}
     
    
<section className="bg-[#F5FFF8]  border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-5 md:py-4 flex flex-col md:flex-row items-center gap-10">
          {/* LEFT */}
          <div className="flex-1">
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#10662A] mb-2">
              Check online eligibility{" "}
              <span className="text-[#390A5D] ">
               with comparison across top banks
              </span>
            </h1>
            <h2 className="text-lg md:text-[16px] font-semibold text-[#10662A] mb-3">
  One Rupeedial application · Multiple bank offers · 100% digital process
</h2>
            <p className="text-sm md:text-base text-[#390A5D] mb-5 leading-relaxed">
              Check your loan eligibility in seconds using Rupeedial’s AI-powered system.
Get expert-verified results with accurate bank-wise comparisons.
One simple application helps you discover the best loan options instantly.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="/expert"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#10662A] text-white text-sm font-semibold shadow-sm none:bg-[#0b4d20] transition"
              >
                Talk to Loan Expert
              </a>
             
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-3 rounded-2xl  " />
             
                <img
                  src={eligibilities}
                  alt="eligibilities"
                  className="w-[260px] sm:w-[300px] md:w-[340px] h-auto  rounded-xl object-contain"
                />
              </div>
            
          </div>
        </div>
      </section>
      {/* FORM */}
      <section className="max-w-5xl mx-auto px-4 py-5">
        <div className="bg-white rounded-xl border shadow p-6 space-y-6">

  <h2 className="text-xl font-bold text-center text-[#10662A]">
    Universal Loan Eligibility Form
  </h2>

  {/* ROW 1 */}
  <div className="grid md:grid-cols-2 gap-4">
    <select name="product" className={inputClass} value={form.product} onChange={handleChange}>
      <option value="">Select Loan Product*</option>
      {Object.keys(PRODUCT_RULES).map((p) => (
        <option key={p} value={p}>{p}</option>
      ))}
    </select>

    <select name="employment" className={inputClass} value={form.employment} onChange={handleChange}>
      <option value="">Employment Type*</option>
      <option value="Salaried">Salaried</option>
      <option value="Self-Employed">Self Employed</option>
      <option value="Business Owner">Business Owner</option>
    </select>
  </div>

  {/* ROW 2 */}
  <div className="grid md:grid-cols-2 gap-4">
    <input name="fullName" placeholder="Full Name*" className={inputClass} value={form.fullName} onChange={handleChange} />
    <input name="mobile" placeholder="Mobile Number*" className={inputClass} value={form.mobile} onChange={handleChange} />
  </div>

  {/* ROW 3 */}
  <div className="grid md:grid-cols-3 gap-4">
    <input type="number" name="monthlyIncome" placeholder="Monthly Income*" className={inputClass} value={form.monthlyIncome} onChange={handleChange} />
    <input type="number" name="existingEmi" placeholder="Existing EMI (Optional)" className={inputClass} value={form.existingEmi} onChange={handleChange} />
    <input type="number" name="cibil" placeholder="CIBIL Score (Optional)" className={inputClass} value={form.cibil} onChange={handleChange} />
  </div>

  {/* CONDITIONAL */}
  {(form.product === "Home Loan" || form.product === "Loan Against Property") && (
    <input
      type="number"
      name="propertyValue"
      placeholder="Property Value*"
      className={inputClass}
      value={form.propertyValue}
      onChange={handleChange}
    />
  )}

  {/* CONSENT */}
  <label className="flex gap-2 text-xs text-[#390A5D]">
    <input type="checkbox" name="acceptConsent" checked={form.acceptConsent} onChange={handleChange} />
    I authorize Rupeedial & partner banks to contact me.
  </label>

  <button
    onClick={handleSubmit}
    className="w-full bg-[#10662A] text-white py-3 rounded-lg font-semibold"
  >
    Check Eligibility
  </button>
</div>

      </section>

      {/* RESULT */}
      {showResult && (
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <div className="bg-white rounded-xl border shadow p-6">
            <h2 className="text-xl font-semibold text-center text-[#10662A] mb-6">
              Bank-wise Eligibility Result
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
             {BANKS.map((bank) => {
  const eligibleAmount = calculateBankEligibility(
    bank,
    Number(form.monthlyIncome),
    Number(form.existingEmi || 0),
    Number(form.cibil || 700),
    form.product as Product,
    Number(form.propertyValue)
  );

  return (
    <div
      key={bank.name}
      className="border rounded-lg p-4 flex justify-between items-center"
    >
      <div>
        <p className="font-semibold text-sm">{bank.name}</p>
        <p className="text-sm text-[#390A5D]">
          Eligible ₹ {eligibleAmount.toLocaleString()}
        </p>
        <span className="text-green-600 text-xs font-semibold">
          Eligible
        </span>
      </div>

      <div className="w-20 h-10 flex items-center justify-center">
        <img
          src={bank.logo}
          alt={bank.name}
          className="max-h-10 object-contain"
        />
      </div>
    </div>
  );
})}

            </div>

            <div className="text-center mt-6">
              <a
                href="/expert"
                className="inline-block bg-[#10662A] text-white px-6 py-3 rounded-lg font-semibold"
              >
                Talk to Loan Expert
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default EligibilityCalculator;
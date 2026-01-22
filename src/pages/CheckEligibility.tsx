import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import CreatableSelect from "react-select/creatable";
import type { SingleValue } from "react-select";

 // 🔥 YE LINE VERY IMPORTANT



/* ================= TYPES ================= */

type Product =
  | "Personal Loan"
  | "Home Loan"
  | "MSME Loan"
  | "Mudra Loan"
  | "Auto Loan"
  | "Credit Card"
  | "Loan Against Property"
  | "Machinery Loan"
  | "Education Loan";

interface FormData {
  product: Product | "";
  fullName: string;
  mobile: string;
  employment: string;
  monthlyIncome: number | "";
  existingEmi: number | "";
  cibil: number | "";
  propertyValue?: number | "";
  courseFee?: number | "";
  acceptConsent: boolean;
}
type SelectOption = {
  label: string;
  value: Product;
};


/* ================= PRODUCT RULES ================= */

const PRODUCT_RULES: Record<Product, { minIncome: number; multiplier: number; maxCap?: number }> =
{
  "Personal Loan": { minIncome: 15000, multiplier: 20, maxCap: 2000000 },

  "Home Loan": { minIncome: 25000, multiplier: 60 },

  "MSME Loan": { minIncome: 20000, multiplier: 36, maxCap: 5000000 },

  "Mudra Loan": { minIncome: 10000, multiplier: 12, maxCap: 1000000 },

  "Auto Loan": { minIncome: 18000, multiplier: 30, maxCap: 3000000 },

  "Credit Card": { minIncome: 18000, multiplier: 30, maxCap: 500000 },

  "Loan Against Property": { minIncome: 30000, multiplier: 80 },

  // 🔹 EDUCATION LOAN LOGIC
  "Education Loan": {
    minIncome: 15000,          // Parent / Guardian income
    multiplier: 20,           // Conservative
    maxCap: 5000000,          // ₹50 lakh max (India realistic)
  },

  // 🔹 MACHINERY LOAN LOGIC
  "Machinery Loan": {
    minIncome: 20000,         // Business income
    multiplier: 40,          // Higher due to asset-backed
    maxCap: 10000000,        // ₹1 crore max
  },
};
const productSelectOptions: SelectOption[] = Object.keys(PRODUCT_RULES).map(
  (p) => ({
    label: p,
    value: p as Product,
  })
);

/* ================= DOCUMENT RULES ================= */

const DOCUMENT_RULES: Record<Product, string[]> = {
  "Personal Loan": ["PAN Card", "Aadhaar Card", "Salary Slip", "Bank Statement"],
  "Home Loan": ["PAN Card", "Aadhaar Card", "Income Proof", "Property Papers"],
  "MSME Loan": ["PAN Card", "GST Certificate", "ITR", "Bank Statement"],
  "Mudra Loan": ["PAN Card", "Aadhaar Card", "Business Proof"],
  "Auto Loan": ["PAN Card", "Aadhaar Card", "Income Proof", "Quotation"],
  "Credit Card": ["PAN Card", "Income Proof"],
  "Loan Against Property": [
    "PAN Card",
    "Aadhaar Card",
    "Property Papers",
    "Income Proof",
  ],
  "Machinery Loan": ["PAN Card", "Quotation", "Bank Statement"],
  "Education Loan": ["PAN Card", "Aadhaar Card", "Admission Letter"],
};

/* ================= BANK DATA ================= */
const DOC_KEY_MAP: Record<string, "kyc" | "incomeProof" | "bankStatement" | "other"> = {
  "PAN Card": "kyc",
  "Aadhaar Card": "kyc",

  "Salary Slip": "incomeProof",
  "Income Proof": "incomeProof",
  "ITR": "incomeProof",
  "GST Certificate": "incomeProof",
  "Business Proof": "incomeProof",

  "Bank Statement": "bankStatement",

  "Property Papers": "other",
  "Quotation": "other",
  "Admission Letter": "other",
};

interface BankRule {
  name: string;
  logo: string;
  productMultiplier: Partial<Record<Product, number>>;
  emiFactor: number;
  lowCibilFactor: number;
  interestRate?: Partial<Record<Product, number>>; // optional
}


// 👉 YAHAN apne saare bank imports + BANKS array paste karo
// (Same as tumne pehle diya tha)

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

// ... baaki sab imports same rakho

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

  "Education Loan": 22,     // 👈 ADD
  "Machinery Loan": 38,    // 👈 ADD
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

  "Education Loan": 22,     // 👈 ADD
  "Machinery Loan": 38,    // 👈 ADD
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

  "Education Loan": 24,    // 👈 ADD
  "Machinery Loan": 41,   // 👈 ADD
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

  "Education Loan": 25,      // 👈 ADD
  "Machinery Loan": 42,     // 👈 ADD
},

  },
  {
    name: "HDFC Bank",
    logo: hdfc,
    emiFactor: 9,
    lowCibilFactor: 0.9,
    productMultiplier: {
  "Personal Loan": 23,
  "Home Loan": 68,
  "Auto Loan": 32,
  "MSME Loan": 30,
  "Loan Against Property": 78,
  "Mudra Loan": 11,

  "Education Loan": 27,     // 👈 ADD
  "Machinery Loan": 44,    // 👈 ADD
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

  "Education Loan": 26,    // 👈 ADD
  "Machinery Loan": 43,   // 👈 ADD
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

  "Education Loan": 27,    // 👈 ADD
  "Machinery Loan": 44,   // 👈 ADD
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
      "Auto Loan": 34,
      "MSME Loan": 32,
    },
  },
  {
    name: "Tata Capital",
    logo: tata,
    emiFactor: 9,
    lowCibilFactor: 0.93,
    productMultiplier: {
      "Personal Loan": 27,
      "Auto Loan": 35,
      "MSME Loan": 33,
      "Education Loan": 20,     
  "Machinery Loan": 40, 
    },
  },
  {
    name: "Bajaj Finance",
    logo: bajaj,
    emiFactor: 10,
    lowCibilFactor: 0.95,
    productMultiplier: {
      "Personal Loan": 28,
      "Auto Loan": 36,
      "MSME Loan": 34,
         "Education Loan": 20,     
  "Machinery Loan": 40, 
    },
  },
  {
    name: "Mahindra Finance",
    logo: mahindra,
    emiFactor: 8,
    lowCibilFactor: 0.88,
    productMultiplier: {
      "Personal Loan": 22,
      "Auto Loan": 30,
      "MSME Loan": 28,
         "Education Loan": 20,     
  "Machinery Loan": 40, 
    },
  },
];
/* ================= UTILS ================= */

const inputClass =
  "w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B0E9B2]";

const calculateBankEligibility = (
  bank: BankRule,
  income: number,
  emi: number,
  cibil: number,
  product: Product,
  propertyValue?: number,
  courseFee?: number        // 👈 YE LINE ADD KARO
) => {

const rule = PRODUCT_RULES[product];

const bankMultiplier = bank.productMultiplier[product];

// ❌ If product rule missing (should never happen)
if (!rule) return 0;

// ✅ For Credit Card, allow fallback to product rule multiplier
let multiplier: number;

if (product === "Credit Card") {
  multiplier = bankMultiplier || rule.multiplier;
} else {
  // ❌ For other products, bank must explicitly support it
  if (!bankMultiplier) return 0;
  multiplier = bankMultiplier;
}


// ❌ Below minimum income
if (income < rule.minIncome) return 0;



// 🏦 Bank strength factor (deterministic, no random)
const bankStrength =
  1 +
  (bank.emiFactor - 6) * 0.02 +
  (bank.lowCibilFactor - 0.75);

// 1️⃣ Base amount
let amount = income * multiplier * bankStrength;

// 2️⃣ EMI impact
if (emi > 0) {
  amount -= emi * bank.emiFactor;
}

// 3️⃣ CIBIL impact
if (cibil && cibil < 650) {
  amount *= bank.lowCibilFactor;
}
// 💳 Credit Card – Bank-wise realistic cap
if (product === "Credit Card") {
  // base cap from rule
  let cardCap = rule.maxCap || 500000;

  // adjust cap by bank profile
  if (bank.emiFactor >= 9) cardCap = 500000;       // HDFC, Bajaj, HDB
  else if (bank.emiFactor >= 8) cardCap = 400000;  // SBI, ICICI, Axis
  else if (bank.emiFactor >= 7) cardCap = 300000;  // PSU banks
  else cardCap = 200000;                           // small banks

  amount = Math.min(amount, cardCap);
}

// 4️⃣ Home Loan / LAP cap
if (
  (product === "Home Loan" || product === "Loan Against Property") &&
  propertyValue
) {
  amount = Math.min(amount, propertyValue * 0.7);
}

// 🎓 Education Loan
if (product === "Education Loan") {
  if (courseFee) {
    const maxByFee = courseFee * 0.8;
    amount = Math.min(amount, maxByFee);
  }

  if (rule.maxCap) {
    amount = Math.min(amount, rule.maxCap);
  }
}

// 🏭 Machinery Loan cap
if (product === "Machinery Loan" && rule.maxCap) {
  amount = Math.min(amount, rule.maxCap);
}

// 🪙 Mudra cap
if (product === "Mudra Loan") {
  amount = Math.min(amount, 1000000);
}

// 5️⃣ General max cap (except Education & Credit Card)
if (rule.maxCap && product !== "Education Loan" && product !== "Credit Card") {
  amount = Math.min(amount, rule.maxCap);
}


return Math.max(0, Math.round(amount));
};   // ✅ CLOSE calculateBankEligibility FUNCTION


/* ================= COMPONENT ================= */


const LoanJourney: React.FC = () => {
  // step: 1 = Form, 1.5 = Bank Result, 2 = Upload, 3 = Disbursal
  const location = useLocation();
  const [applicationId] = useState(
  () => `RD-${Math.floor(100000 + Math.random() * 900000)}`
);

  const [step, setStep] = useState<1 | 1.5 | 2 | 3>(1);
const [selectedBank, setSelectedBank] = useState<string | null>(null);
const [form, setForm] = useState<FormData>({
  product: location.state?.product || "",
  fullName: "",
  mobile: "",
  employment: "",
  monthlyIncome: "",
  existingEmi: "",
  cibil: "",
  propertyValue: "",
  courseFee: "",
  acceptConsent: false,
});



  const [uploadedFiles, setUploadedFiles] = useState<{
  kyc: File[];
  incomeProof: File[];
  bankStatement: File[];
  other: File[];
}>({
  kyc: [],
  incomeProof: [],
  bankStatement: [],
  other: [],
});

const downloadApplication = () => {
  const content = `
Rupeedial Loan Application

Product: ${form.product}
Applicant Name: ${form.fullName}
Mobile: ${form.mobile}
Employment: ${form.employment}
Monthly Income: ${form.monthlyIncome}
Existing EMI: ${form.existingEmi}
CIBIL Score: ${form.cibil}
Property Value: ${form.propertyValue || "N/A"}

Application ID: RD-${Math.floor(100000 + Math.random() * 900000)}

Status: Submitted
`;

  const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Rupeedial_Application.txt";
  link.click();

  window.URL.revokeObjectURL(url);
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      setForm((p) => ({ ...p, [name]: (e.target as HTMLInputElement).checked }));
      return;
    }

    if (["monthlyIncome", "existingEmi", "cibil", "propertyValue", "courseFee"].includes(name))

      setForm((p) => ({ ...p, [name]: value === "" ? "" : Number(value) }));
    else setForm((p) => ({ ...p, [name]: value }));
  };

  /* ================= STEP 1 SUBMIT ================= */

  const handleEligibilitySubmit = () => {
    
    if (
      !form.product ||
      !form.fullName ||
      !form.mobile ||
      !form.monthlyIncome ||
      !form.acceptConsent
    ) {
      alert("Please fill all mandatory fields");
      return;
    }
const rules = PRODUCT_RULES[form.product];

if (form.monthlyIncome < rules.minIncome) {
  alert(`Minimum income required for ${form.product} is ₹${rules.minIncome}`);
  return;
}
if (form.product === "Education Loan" && !form.courseFee) {

  alert("Please enter total course fee for Education Loan");
  return;
}

    if (
      (form.product === "Home Loan" ||
        form.product === "Loan Against Property") &&
      !form.propertyValue
    ) {
      alert("Property value required for selected product");
      return;
    }

    // Show Bank Results
    setStep(1.5);
  };

  /* ================= STEP 2 ================= */

  const requiredDocs = form.product
    ? DOCUMENT_RULES[form.product]
    : [];

 const handleFileChange = (
  type: "kyc" | "incomeProof" | "bankStatement" | "other",
  fileList: FileList | null
) => {
  if (!fileList) return;

 setUploadedFiles((prev) => ({
  ...prev,
  [type]: [...prev[type], ...Array.from(fileList)],
}));
};

 const handleUploadContinue = async () => {
  try {
    // const missing = requiredDocs.filter((doc) => {
    //   const key =
    //     doc === "PAN Card" || doc === "Aadhaar Card" ? "kyc" :
    //     doc === "Salary Slip" || doc === "Income Proof" ? "incomeProof" :
    //     doc === "Bank Statement" ? "bankStatement" :
    //     "other";

    //   return uploadedFiles[key as keyof typeof uploadedFiles].length === 0;
    // });

    // if (missing.length > 0) {
    //   alert("Please upload all required documents.");
    //   return;
    // }

    const fd = new FormData();

    // 🔹 form JSON
    fd.append("formData", JSON.stringify(form));
fd.append("selectedBank", selectedBank || "");
    // 🔹 documents (keys MUST match backend)
    uploadedFiles.kyc.forEach((f) => fd.append("kyc[]", f));
    uploadedFiles.incomeProof.forEach((f) => fd.append("incomeProof[]", f));
    uploadedFiles.bankStatement.forEach((f) => fd.append("bankStatement[]", f));
    uploadedFiles.other.forEach((f) => fd.append("other[]", f));

    const res = await fetch(
  "https://rupeedial.com/rupeedial-backend/public/index.php?action=eligibility/apply",
  {
    method: "POST",
    body: fd,
  }
);


    const data = await res.json();

    if (!data.success) {
      alert("Submission failed: " + data.message);
      return;
    }

    // 🔹 Save lead id from backend
    setStep(3);

  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
  }
};

  return (
    <main className="bg-[#f8fffb] min-h-screen">
  {/* HERO */}
     <section className="bg-gradient-to-b from-[#EFFFF3] to-white border-b border-slate-100">
  <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">

    {/* LEFT */}
    <div>
      <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-[#10662A] mb-3">
        Check Loan Eligibility
        <br />
        <span className="text-[#390A5D]">
          Across 50+ Banks in Seconds
        </span>
      </h1>

      <p className="text-base text-[#390A5D] mb-6 max-w-lg">
        One application. Multiple bank offers.  
        100% digital process with expert assistance.
      </p>

      <div className="flex gap-4">
       <button
  onClick={() => {
    const el = document.getElementById("eligibility-form");
    el?.scrollIntoView({ behavior: "smooth" });
  }}
  className="bg-[#10662A] hover:bg-[#0d5221] text-white px-6 py-3 rounded-lg font-semibold shadow"
>
  Check Now
</button>


        <a
          href="/expert"
          className="border border-[#10662A] text-[#10662A] px-6 py-3 rounded-lg font-semibold hover:bg-green-50"
        >
          Talk to Expert
        </a>
      </div>
    </div>

    {/* RIGHT IMAGE */}
    <div className="flex justify-center">
      <img
        src={eligibilities}
        alt="Eligibility"
        className="w-[300px] md:w-[380px] object-contain"
      />
    </div>

  </div>
</section>

{/* ================= STEP 1 : FORM ================= */}
{step === 1 && (
  <section id="eligibility-form" className="max-w-4xl mx-auto px-4 py-12">
    <div className="bg-white rounded-xl border shadow p-6 space-y-6">

      <h2 className="text-xl font-bold text-center text-[#10662A]">
        Check Loan Eligibility
      </h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="w-full">
          <CreatableSelect<SelectOption, false>
            options={productSelectOptions}
            placeholder="Select or type loan product*"
            isSearchable={true}
            isClearable={true}
            value={
              form.product
                ? { label: form.product, value: form.product }
                : null
            }
            onChange={(selected: SingleValue<SelectOption>) => {
              if (selected) {
                setForm((prev) => ({
                  ...prev,
                  product: selected.value,
                }));
              } else {
                setForm((prev) => ({
                  ...prev,
                  product: "",
                }));
              }
            }}
            styles={{
              control: (base) => ({
                ...base,
                minHeight: "42px",
                borderColor: "#cbd5e1",
                boxShadow: "none",
              }),
              input: (base) => ({
                ...base,
                color: "#000",
              }),
            }}
          />
        </div>

        <select
          name="employment"
          className={inputClass}
          value={form.employment}
          onChange={handleChange}
        >
          <option value="">Employment Type*</option>
          <option value="Salaried">Salaried</option>
          <option value="Self-Employed">Self Employed</option>
          <option value="Business Owner">Business Owner</option>
        </select>
      </div>

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
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="number"
          name="monthlyIncome"
          placeholder="Monthly Income*"
          className={inputClass}
          value={form.monthlyIncome}
          onChange={handleChange}
        />
        <input
          type="number"
          name="existingEmi"
          placeholder="Existing EMI"
          className={inputClass}
          value={form.existingEmi}
          onChange={handleChange}
        />
        <input
          type="number"
          name="cibil"
          placeholder="CIBIL Score"
          className={inputClass}
          value={form.cibil}
          onChange={handleChange}
        />
      </div>

      {(form.product === "Home Loan" ||
        form.product === "Loan Against Property") && (
        <input
          type="number"
          name="propertyValue"
          placeholder="Property Value*"
          className={inputClass}
          value={form.propertyValue}
          onChange={handleChange}
        />
      )}

      {form.product === "Education Loan" && (
        <input
          type="number"
          name="courseFee"
          placeholder="Total Course Fee*"
          className={inputClass}
          value={form.courseFee || ""}
          onChange={handleChange}
        />
      )}

      <label className="flex gap-2 text-xs text-[#390A5D]">
        <input
          type="checkbox"
          name="acceptConsent"
          checked={form.acceptConsent}
          onChange={handleChange}
        />
        I authorize Rupeedial & partner banks to contact me.
      </label>

      <button
        onClick={handleEligibilitySubmit}
        className="w-full bg-[#10662A] hover:bg-[#0d5221] text-white py-3 rounded-lg font-semibold"
      >
        Check Eligibility
      </button>

    </div>
  </section>
)}

      {/* ================= STEP 1.5 : BANK RESULT ================= */}


     {step === 1.5 && (
  <section className="max-w-6xl mx-auto mt-4 px-4 pb-16">
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
            Number(form.propertyValue),
            Number(form.courseFee)
          );

          // ✅ YAHAN LAGENGI YE 2 LINES (MAP KE ANDAR)
          const isEligible = eligibleAmount > 0;
          const isSelected = selectedBank === bank.name;

          return (
            <div
              key={bank.name}
              onClick={() => {
                if (!isEligible) return;
                setSelectedBank(bank.name);
              }}
              className={`
                border rounded-lg p-4 flex items-center gap-4 cursor-pointer
                ${isEligible ? "hover:shadow-md" : "opacity-50 cursor-not-allowed"}
                ${isSelected ? "border-[#10662A] ring-2 ring-[#10662A]" : ""}
              `}
            >
              {/* LEFT: LOGO */}
              <div className="w-24 h-16 flex items-center justify-center flex-shrink-0">
                <img
                  src={bank.logo}
                  alt={bank.name}
                  className="max-h-14 max-w-24 object-contain"
                />
              </div>

              {/* RIGHT: DETAILS */}
              <div className="flex-1 text-right">
                <p className="font-semibold text-sm">{bank.name}</p>

                <p className="text-sm text-[#390A5D]">
                  Eligible ₹ {eligibleAmount.toLocaleString()}
                </p>

                {isEligible ? (
                  <span className="text-green-600 text-xs font-semibold">
                    Eligible
                  </span>
                ) : (
                  <span className="text-red-500 text-xs font-semibold">
                    Not Eligible
                  </span>
                )}

                {isSelected && (
                  <p className="text-xs mt-1 text-[#10662A] font-semibold">
                    Selected
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-8">
        <button
          onClick={() => setStep(1)}
          className="border border-[#10662A] text-[#10662A] px-6 py-2 rounded-lg"
        >
          Back
        </button>

        <button
          onClick={() => {
            if (!selectedBank) {
              alert("Please select a bank to continue");
              return;
            }
            setStep(2);
          }}
          className="bg-[#10662A] hover:bg-[#0d5221] text-white px-8 py-3 rounded-lg font-semibold"
        >
          Continue to Upload Documents
        </button>
      </div>

    </div>
  </section>
)}
      {/* ================= STEP 2 : UPLOAD ================= */}
      {step === 2 && (
        <section className="max-w-4xl mx-auto mt-4 px-4 pb-16">
          <div className="bg-white rounded-xl border shadow p-6 space-y-6">

            <h2 className="text-xl font-bold text-center text-[#10662A]">
              Upload Documents – {form.product}
            </h2>

            <div className="space-y-4">
              {requiredDocs.map((doc) => (
                <div
                  key={doc}
                  className="flex flex-col md:flex-row md:items-center gap-4 border p-4 rounded-lg"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-[#390A5D]">{doc}</p>
                    <p className="text-xs text-gray-500">
                      Upload clear scanned copy
                    </p>
                  </div>

                  <input
  type="file"
  multiple                    // 🔥 MULTIPLE VERY IMPORTANT
  onChange={(e) => {
    const key = DOC_KEY_MAP[doc];   // 👈 "kyc" | "incomeProof" | ...
    handleFileChange(key, e.target.files);
  }}
  className="text-sm"
/>

                </div>
              ))}
            </div>

            <div className="flex justify-between pt-6">
              <button
                onClick={() => setStep(1.5)}
                className="border border-[#10662A] text-[#10662A] px-6 py-2 rounded-lg"
              >
                Back
              </button>

              <button
                onClick={handleUploadContinue}
                className="bg-[#10662A] hover:bg-[#0d5221] text-white px-8 py-3 rounded-lg font-semibold"
              >
                Continue to Disbursal
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ================= STEP 3 : DISBURSAL ================= */}
      {step === 3 && (
        <section className="max-w-3xl mx-auto px-4 pb-20">
          <div className="bg-white rounded-xl border shadow p-8 text-center space-y-6">

            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full mt-8 bg-green-100 flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-[#10662A]">
              Application Submitted Successfully
            </h2>

            <p className="text-[#390A5D]">
              Your <span className="font-semibold">{form.product}</span>{" "}
              application is under review.
            </p>

            <div className="bg-[#EFFFF3] rounded-lg p-4 text-left space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Product:</span>{" "}
                {form.product}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Applicant:</span>{" "}
                {form.fullName}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Application ID:</span>{" "}
                {applicationId}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Expected Response:</span>{" "}
                Within 24–48 hours
              </p>
            </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">

  <button
    onClick={downloadApplication}
    className="bg-[#10662A] hover:bg-[#0d5221] text-white px-6 py-3 rounded-lg font-semibold"
  >
    Download Application
  </button>

  <button
    onClick={() => setStep(1)}
    className="bg-[#10662A] hover:bg-[#0d5221] text-white px-6 py-3 rounded-lg font-semibold"
  >
    Start New Application
  </button>

  <a
    href="/expert"
    className="border border-[#10662A] text-[#10662A] px-6 py-3 rounded-lg font-semibold hover:bg-green-50"
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

export default LoanJourney;

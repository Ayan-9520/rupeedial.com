import React, { useState, useEffect } from "react";
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
   email: string;   
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
  "w-full rounded-md border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#B0E9B2]";

const calculateBankEligibility = (
  bank: BankRule,
  income: number,
  emi: number,
  cibil: number,
  product: Product,
  employment?: string,
  propertyValue?: number,
  courseFee?: number
) => {
  const rule = PRODUCT_RULES[product];
  if (!rule) return 0;

  const bankMultiplier = bank.productMultiplier?.[product];
  const multiplier = bankMultiplier || rule.multiplier;

  // ❌ below income reject
  if (!income || income < rule.minIncome) return 0;

  // 🧮 FOIR (main factor)
  const foir = income > 0 ? emi / income : 0;

  if (foir >= 0.75) return 0;

  // 🧠 risk score system (REAL)
  let riskScore = 1;

  // FOIR impact
  if (foir >= 0.6) riskScore *= 0.6;
  else if (foir >= 0.5) riskScore *= 0.75;
  else riskScore *= 1;

  // CIBIL impact
  if (cibil < 550) return 0;
  else if (cibil < 650) riskScore *= 0.7;
  else if (cibil < 750) riskScore *= 0.9;
  else if (cibil >= 800) riskScore *= 1.15;
  else riskScore *= 1.05;

  // Employment impact
  if (employment === "Self-Employed") riskScore *= 0.9;
  if (employment === "Business Owner") riskScore *= 0.85;
  if (employment === "Salaried") riskScore *= 1.05;

  // Bank strength
  const bankStrength =
    1 +
    (bank.emiFactor - 6) * 0.02 +
    (bank.lowCibilFactor - 0.75);

  // 🧮 FINAL AMOUNT
  let amount = income * multiplier * bankStrength * riskScore;

  // 🏠 Secured loan caps
  if (
    (product === "Home Loan" || product === "Loan Against Property") &&
    propertyValue
  ) {
    amount = Math.min(amount, propertyValue * 0.7);
  }

  // 🎓 Education loan
  if (product === "Education Loan") {
    if (courseFee) {
      amount = Math.min(amount, courseFee * 0.8);
    }
  }

  // 💳 Credit card logic
  if (product === "Credit Card") {
    let cap = 200000;

    if (cibil >= 750) cap = 500000;
    else if (cibil >= 700) cap = 300000;

    amount = Math.min(amount, cap);
  }

  // 🪙 Mudra cap
  if (product === "Mudra Loan") {
    amount = Math.min(amount, 1000000);
  }

  // 🏭 Machinery cap
  if (product === "Machinery Loan" && rule.maxCap) {
    amount = Math.min(amount, rule.maxCap);
  }

  // General cap
  if (rule.maxCap && product !== "Credit Card") {
    amount = Math.min(amount, rule.maxCap);
  }

  if (amount < 0) return 0;

  return Math.round(amount);
};  // ✅ CLOSE calculateBankEligibility FUNCTION

const getInterestRate = (
  bank: BankRule,
  product: Product,
  cibil: number,
  employment?: string
) => {
  let rate = 10;

  // Product base rate
  if (product === "Home Loan") rate = 8.5;
  else if (product === "Personal Loan") rate = 11;
  else if (product === "Auto Loan") rate = 9;
  else if (product === "Education Loan") rate = 10;
  else if (product === "Credit Card") rate = 24;

  // CIBIL impact
  if (cibil >= 800) rate -= 1;
  else if (cibil >= 750) rate -= 0.5;
  else if (cibil < 650) rate += 2;

  // Employment impact
  if (employment === "Self-Employed") rate += 0.5;
  if (employment === "Business Owner") rate += 1;

  // Bank strength adjust
  rate += (10 - bank.emiFactor) * 0.2;

  return Math.round(rate * 10) / 10;
};
/* ================= COMPONENT ================= */


const LoanJourney: React.FC = () => {
  useEffect(() => {
  // ✅ PAGE TITLE
  document.title =
    "Check Loan Eligibility Online | Personal, Home, MSME, Education | RupeeDial";

  // ✅ META DESCRIPTION
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute(
    "content",
    "Check loan eligibility online for personal loan, home loan, MSME, education loan, auto loan and more. Compare eligibility across 50+ banks instantly with RupeeDial."
  );

  // ✅ CANONICAL TAG
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute(
    "href",
    "https://rupeedial.com/check-loan-eligibility"
  );
}, []);

  // step: 1 = Form, 1.5 = Bank Result, 2 = Upload, 3 = Disbursal
  const location = useLocation();
  const [applicationId] = useState(
  () => `RD-${Math.floor(100000 + Math.random() * 900000)}`
);
const [errors, setErrors] = useState<any>({});
  const [step, setStep] = useState<1 | 1.5 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
const [selectedBank, setSelectedBank] = useState<string | null>(null);
const [form, setForm] = useState<FormData>({

product: (location as any)?.state?.product || "",
  fullName: "",
  mobile: "",
    email: "", 
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
const resetApplication = () => {
  setForm({
    product: "",
    fullName: "",
    mobile: "",
     email: "",  
    employment: "",
    monthlyIncome: "",
    existingEmi: "",
    cibil: "",
    propertyValue: "",
    courseFee: "",
    acceptConsent: false,
  });

  setUploadedFiles({
    kyc: [],
    incomeProof: [],
    bankStatement: [],
    other: [],
  });

  setSelectedBank(null);
  setStep(1);
};

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

if (["monthlyIncome", "existingEmi", "cibil", "propertyValue", "courseFee"].includes(name)) {
  const num = parseFloat(value);
  setForm((p) => ({
    ...p,
    [name]: isNaN(num) ? "" : num,
  }));
}
else {
  setForm((p) => ({ ...p, [name]: value }));
}
setErrors((prev:any) => ({
  ...prev,
  [name]: ""
}));
setSelectedBank(null);
};
  /* ================= STEP 1 SUBMIT ================= */

  const handleEligibilitySubmit = () => {
    
  const newErrors: any = {};
if (
  (form.product === "Home Loan" ||
    form.product === "Loan Against Property") &&
  !form.propertyValue
) {
  newErrors.propertyValue = "Required";
}

if (form.product === "Education Loan" && !form.courseFee) {
  newErrors.courseFee = "Required";
}
if (!form.product) newErrors.product = "Required";
if (!form.fullName) newErrors.fullName = "Required";

if (!form.mobile) {
  newErrors.mobile = "Required";
} else if (!/^[6-9]\d{9}$/.test(form.mobile)) {
  newErrors.mobile = "Invalid Mobile";
}

if (!form.email) {
  newErrors.email = "Required";
} else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
  newErrors.email = "Invalid Email";
}
if (!form.employment) newErrors.employment = "Required";
if (!form.monthlyIncome) newErrors.monthlyIncome = "Required";

if (!form.acceptConsent) newErrors.acceptConsent = "Required";

setErrors(newErrors);

if (Object.keys(newErrors).length > 0) return;
if (!form.product) return;
const rules = PRODUCT_RULES[form.product as Product];

if (Number(form.monthlyIncome) < rules.minIncome) {
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
setSelectedBank(null);
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
  [type]: [
  ...prev[type],
  ...Array.from(fileList).filter(
    (f) => !prev[type].some((pf) => pf.name === f.name)
  ),
],
}));
};

 const handleUploadContinue = async () => {
  try {
   const missing = requiredDocs.filter((doc) => {
  const key = DOC_KEY_MAP[doc] || "other";
  return uploadedFiles[key].length === 0;
});

if (missing.length > 0) {
  alert("Please upload all required documents");
  return;
}
setLoading(true);
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
setStep(3);



  } catch (err) {
    console.error(err);
    alert("Server error. Please try again.");
 } finally {
  setLoading(false);
}
};

  return (
    <main className="bg-[#f8fffb] min-h-screen">
  {/* HERO */}
     <section className="bg-gradient-to-b from-[#EFFFF3] to-white border-b border-slate-100">
  <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">

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

      <div className="flex flex-col sm:flex-row gap-3">
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
        className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] object-contain"
      />
    </div>

  </div>
</section>
<div className="max-w-6xl mx-auto px-4 pt-2">
  <div className="rounded-lg border border-green-200 bg-white p-3 text-xs text-[#3A4250]">
    <strong>Disclaimer:</strong> Eligibility shown is indicative, based on user
inputs and internal models. Final approval, interest rate and disbursal depend
on bank / NBFC policies.

  </div>
</div>

{/* ================= STEP 1 : FORM ================= */}
{step === 1 && (
  <section id="eligibility-form" className="max-w-4xl mx-auto px-4 py-6">
    <div className="bg-white rounded-xl border shadow p-6 space-y-3">

      <h2 className="text-xl font-bold text-center text-[#10662A]">
        Check Loan Eligibility
      </h2>
<p className="text-center text-sm text-[#390A5D]  ">
  Fill the details below to instantly check your loan eligibility in just 30 seconds.
</p>

<div className="bg-[#EFFFF3] border border-[#B0E9B2] rounded-lg px-4 py-2 text-xs text-[#10662A] flex flex-wrap justify-between gap-3">
  <span className="font-semibold">How it works:</span>

  <span>1. Select product & employment</span>
  <span>2. Enter income & details</span>
  <span>3. Check bank-wise eligibility</span>
</div>


   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

  <div>
    <CreatableSelect<SelectOption, false>
      options={productSelectOptions}
      placeholder="Select or type loan product*"
      isSearchable
      isClearable
      value={
        form.product
          ? { label: form.product, value: form.product }
          : null
      }
      onChange={(selected: SingleValue<SelectOption>) => {
        setForm((prev) => ({
          ...prev,
          product: selected ? selected.value : "",
        }));

        setErrors((prev:any) => ({
          ...prev,
          product: ""
        }));
      }}
      styles={{
        control: (base) => ({
          ...base,
          minHeight: "42px",
          borderColor: errors.product ? "red" : "#cbd5e1",
        }),
      }}
    />
  </div>

        <select
          name="employment"
         className={`${inputClass} ${errors.employment ? "border-red-500" : "border-slate-300"}`}
          value={form.employment}
          onChange={handleChange}
        >
          <option value="">Employment Type*</option>
          <option value="Salaried">Salaried</option>
          <option value="Self-Employed">Self Employed</option>
          <option value="Business Owner">Business Owner</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input
          name="fullName"
          placeholder="Full Name*"
         className={`${inputClass} ${errors.fullName ? "border-red-500" : "border-slate-300"}`}
          value={form.fullName}
          onChange={handleChange}
        />
        <input
          name="mobile"
          inputMode="numeric"
          maxLength={10}
          placeholder="Mobile Number*"
          className={`${inputClass} ${errors.mobile ? "border-red-500" : "border-slate-300"}`}
          value={form.mobile}
onChange={(e) => {
  const value = e.target.value.replace(/\D/g, "");

  setForm((prev) => ({
    ...prev,
    mobile: value
  }));

  setErrors((prev:any) => ({
    ...prev,
    mobile: ""
  }));
}}
        />
         <input
    type="email"
    name="email"
    placeholder="Email Address*"
    className={`${inputClass} ${errors.email ? "border-red-500" : "border-slate-300"}`}
    value={form.email}
    onChange={handleChange}
  />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input
          type="number"
          name="monthlyIncome"
          placeholder="Monthly Income*"
       className={`${inputClass} ${errors.monthlyIncome ? "border-red-500" : "border-slate-300"}`}
          value={form.monthlyIncome}
          onChange={handleChange}
        />
       {errors.monthlyIncome && <p className="text-red-500 text-xs">{errors.monthlyIncome}</p>}
        <input
          type="number"
          name="existingEmi"
          placeholder="Existing EMI"
       className={`${inputClass} ${errors.existingEmi ? "border-red-500" : "border-slate-300"}`}
          value={form.existingEmi}
          onChange={handleChange}
        />
{errors.existingEmi && <p className="text-red-500 text-xs">{errors.existingEmi}</p>}
        <input
          type="number"
          name="cibil"
          placeholder="CIBIL Score"
          className={`${inputClass} ${errors.cibil ? "border-red-500" : "border-slate-300"}`}
          value={form.cibil}
          onChange={handleChange}
        />
{errors.cibil && <p className="text-red-500 text-xs">{errors.cibil}</p>}
      </div>

      {(form.product === "Home Loan" ||
        form.product === "Loan Against Property") && (
        <input
          type="number"
          name="propertyValue"
          placeholder="Property Value*"
         className={`${inputClass} ${errors.propertyValue ? "border-red-500" : "border-slate-300"}`}
          value={form.propertyValue}
          onChange={handleChange}
        />
        
      )}

      {form.product === "Education Loan" && (
        <input
          type="number"
          name="courseFee"
          placeholder="Total Course Fee*"
          className={`${inputClass} ${errors.courseFee ? "border-red-500" : "border-slate-300"}`}
          value={form.courseFee || ""}
          onChange={handleChange}
        />
        
      )}

     
        <label className={`flex gap-2 text-xs ${errors.acceptConsent ? "text-red-500" : "text-[#390A5D]"}`}>
<input
  type="checkbox"
  name="acceptConsent"
  checked={form.acceptConsent}
  onChange={handleChange}
 className={`h-4 w-4 ${errors.acceptConsent ? "ring-2 ring-red-500" : ""}`}
/>
      I authorize Rupeedial and its partner banks/NBFCs to contact me via call, SMS,
WhatsApp or email for loan assistance as per Privacy Policy.

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

{step === 1.5 && (() => {

  const bankResults = BANKS.map((bank) => {
    const eligibleAmount = calculateBankEligibility(
      bank,
      Number(form.monthlyIncome),
      Number(form.existingEmi || 0),
      Number(form.cibil || 650),
      form.product as Product,
      form.employment,
      form.propertyValue ? Number(form.propertyValue) : undefined,
      form.courseFee ? Number(form.courseFee) : undefined
    );

    return { bank, eligibleAmount };
  }).sort((a, b) => b.eligibleAmount - a.eligibleAmount);

 const maxAmount = bankResults.length
  ? Math.max(...bankResults.map(b => b.eligibleAmount))
  : 0;
const filteredBanks = bankResults.filter(b => b.eligibleAmount >= 5000);

if (filteredBanks.length === 0) {
  return (
    <div className="text-center py-10">
  <p className="text-red-500 font-semibold text-lg mb-3">
    No eligible banks found
  </p>

  <p className="text-sm text-gray-500 mb-5">
    Try increasing your income, reducing EMI or improving CIBIL score
  </p>

  <button
    onClick={() => setStep(1)}
    className="bg-[#10662A] text-white px-6 py-2 rounded-lg"
  >
    Edit Details
  </button>
</div>
  );
}
  return (
    <section className="max-w-6xl mx-auto mt-4 px-4 pb-16">
      <div className="bg-white rounded-xl border shadow p-6">

        <h2 className="text-xl font-semibold text-center text-[#10662A] mb-6">
          Bank-wise Eligibility Result
        </h2>

        <p className="text-xs text-center text-slate-500 mb-3">
          Please select one bank to proceed with document upload and faster processing.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

     {filteredBanks.map(({ bank, eligibleAmount }) => {
const rate = getInterestRate(
  bank,
  form.product as Product,
  Number(form.cibil || 650),
  form.employment
);
  const isSelected = selectedBank === bank.name;
  const isBest = maxAmount > 0 && eligibleAmount === maxAmount;

  return (
    <div
      key={bank.name}
      onClick={() => {
        setSelectedBank(bank.name);
      }}
      className={`
        border rounded-lg p-4 flex items-center gap-4 cursor-pointer
        hover:shadow-md
        ${isSelected ? "border-[#10662A] ring-2 ring-[#10662A]" : ""}
      `}
    >
                <div className="w-24 h-16 flex items-center justify-center flex-shrink-0">
                  <img
                    src={bank.logo}
                    alt={bank.name}
                    className="max-h-14 max-w-24 object-contain"
                  />
                </div>

                <div className="flex-1 text-center sm:text-right">
                  <p className="font-semibold text-sm">{bank.name}</p>

                  <p className="text-sm text-[#390A5D]">
                    Eligible ₹ {eligibleAmount.toLocaleString()}
                  </p>

                  <p className="text-xs text-gray-400">
                    EMI Factor: {bank.emiFactor}
                  </p>

              
               <p className="text-xs text-gray-500">
  Rate: {rate}%
</p>

                  <span className="text-green-600 text-xs font-semibold">
  Eligible
</span>

{isBest && (
  <p className="text-blue-600 text-xs font-bold">
    Best Offer
  </p>
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

        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <button
  onClick={() => setStep(1)}
  className="w-full sm:w-auto border border-[#10662A] text-[#10662A] px-6 py-3 rounded-lg"
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
          
  className="w-full sm:w-auto bg-[#10662A] hover:bg-[#0d5221] text-white px-6 py-3 rounded-lg font-semibold"
>
            Continue to Upload Documents
          </button>
        </div>

      </div>
    </section>
  );

})()}
   
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
    const key = DOC_KEY_MAP[doc] || "other";   // 👈 "kyc" | "incomeProof" | ...
    handleFileChange(key, e.target.files);
  }}
  className="text-sm"
/>

                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button
                onClick={() => setStep(1.5)}
                className="w-full sm:w-auto border border-[#10662A] text-[#10662A] px-6 py-3 rounded-lg"
              >
                Back
              </button>

             <button
  onClick={handleUploadContinue}
  disabled={loading}
                className="w-full sm:w-auto bg-[#10662A] hover:bg-[#0d5221] text-white px-6 py-3 rounded-lg font-semibold"
              >
              {loading ? "Submitting..." : "Continue to Disbursal"}
              </button>
            </div>
          </div>
        </section>
      )}
 <section className="max-w-5xl mx-auto px-4 pb-12">
    <div className="mt-8 bg-[#F5FFF9] border border-[#E0F3E6] rounded-xl p-6">

      <h3 className="text-lg font-semibold text-center text-[#10662A] mb-4">
        Why Choose Rupeedial?
      </h3>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-2 text-sm md:text-[15px] text-[#390A5D]">
        <div className="space-y-2">
          <p>• Real-time service provider with 100% customer satisfaction.</p>
          <p>• Paper work assistance and guided documentation.</p>
          <p>• Option for paperless processing wherever possible.</p>
          <p>• Better, negotiated offers from multiple partners.</p>
          <p>• Easy comparison across multiple loan options.</p>
          <p>• No hidden charges – full transparency.</p>
        </div>

        <div className="space-y-2">
          <p>• Competitive and lower interest rates where eligible.</p>
          <p>• Quick approval and disbursal focused on urgent needs.</p>
          <p>
            • Tailored financial solutions for Indian consumers and business
            entities.
          </p>
          <p>• Safe, secure and convenient process.</p>
          <p>• Everything finance in one place.</p>
          <p>• Friendly and responsive customer support.</p>
        </div>
      </div>
    </div>
  </section>
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
  onClick={resetApplication}
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
  <div className="bg-white rounded-2xl shadow-[0_16px_40px_rgba(9,30,66,0.06)] shadow-sm border border-slate-100 p-5 md:p-6">
            <h2 className="text-xl font-semibold text-[#10662A] mb-3">
              Why Choose Rupeedial
            </h2>
            <div className="h-1 w-12 bg-[#390A5D] rounded-full mb-4" />

           
          </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default LoanJourney;

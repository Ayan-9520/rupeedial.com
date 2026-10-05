import React, { useMemo, useState, useEffect } from "react";
import { apiUrl } from "../config/api";

import lap from "../assets/images/lap.png";

type Step = 1 | 2 | 3 | 4;

interface Step1Form {
 
  fullName: string;
  email: string;
  mobile: string;
  loanAmount: string;
  city: string;
  employmentType: string;
  formMonthlyIncome: string;
  existingEmi: string;
  companyType: string;
  workExperience: string;
  agreePrivacy: boolean;
  purpose: string;
  aadhaar: string;
  pan: string;
  propertyValue: string;
}

interface LoanDetails {

  fullName: string;
  email: string;
  mobile: string;
  loanAmount: number;
  city: string;
  employmentType: string;
 propertyValue: number;
  formMonthlyIncome: number;
  existingEmi: number;
  companyType: string;
  workExperience: string;
  purpose?: string;
  aadhaar?: string;
  pan?: string;
}

interface Offer {
  id: string;
  bankName: string;
  code: string;
  processingTime: string;
  interestRate: number;
  emi: number;
  apr: number;
}



const offers: Offer[] = [
  // 🟢 PUBLIC + PRIVATE BANKS
  {
    id: "sbi",
    bankName: "State Bank of India",
    code: "SBI",
    processingTime: "7 – 12 Days",
    interestRate: 9.15,
    emi: 0,
    apr: 9.6,
  },
  {
    id: "pnb",
    bankName: "Punjab National Bank",
    code: "PNB",
    processingTime: "7 – 12 Days",
    interestRate: 9.10,
    emi: 0,
    apr: 9.6,
  },
  {
    id: "bob",
    bankName: "Bank of Baroda",
    code: "BOB",
    processingTime: "6 – 10 Days",
    interestRate: 9.05,
    emi: 0,
    apr: 9.5,
  },
  {
    id: "icici",
    bankName: "ICICI Bank",
    code: "ICICI",
    processingTime: "5 – 10 Days",
    interestRate: 9.35,
    emi: 0,
    apr: 9.8,
  },
  {
    id: "hdfc",
    bankName: "HDFC Bank",
    code: "HDFC",
    processingTime: "5 – 8 Days",
    interestRate: 9.25,
    emi: 0,
    apr: 9.7,
  },
  {
    id: "axis",
    bankName: "Axis Bank",
    code: "AXIS",
    processingTime: "6 – 9 Days",
    interestRate: 9.40,
    emi: 0,
    apr: 10.0,
  },

  // 🟡 HOUSING FINANCE
  {
    id: "lic",
    bankName: "LIC Housing Finance",
    code: "LIC",
    processingTime: "7 – 12 Days",
    interestRate: 9.20,
    emi: 0,
    apr: 9.6,
  },

  // 🔴 NBFC (High approval, higher rates)
  {
    id: "bajaj",
    bankName: "Bajaj Finserv",
    code: "BAJAJ",
    processingTime: "24 – 48 Hours",
    interestRate: 10.75,
    emi: 0,
    apr: 11.5,
  },
  {
    id: "tata",
    bankName: "Tata Capital",
    code: "TATA",
    processingTime: "2 – 5 Days",
    interestRate: 10.50,
    emi: 0,
    apr: 11.0,
  },
  {
    id: "iifl",
    bankName: "IIFL Finance",
    code: "IIFL",
    processingTime: "24 – 48 Hours",
    interestRate: 11.00,
    emi: 0,
    apr: 12.0,
  },
  {
    id: "aditya",
    bankName: "Aditya Birla Finance",
    code: "ABFL",
    processingTime: "2 – 5 Days",
    interestRate: 10.75,
    emi: 0,
    apr: 11.5,
  },
];

const CITY_LIST = [
  // Metro Cities
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",

  // NCR & Nearby
  "Noida",
  "Gurgaon",
  "Ghaziabad",
  "Faridabad",

  // North India
  "Chandigarh",
  "Jaipur",
  "Lucknow",
  "Kanpur",
  "Varanasi",
  "Agra",
  "Dehradun",
  "Amritsar",
  "Ludhiana",
  "Jalandhar",
  "Shimla",

  // West India
  "Surat",
  "Vadodara",
  "Rajkot",
  "Nashik",
  "Nagpur",
  "Thane",
  "Navi Mumbai",
  "Aurangabad",
  "Indore",
  "Bhopal",
  "Udaipur",
  "Jodhpur",

  // South India
  "Coimbatore",
  "Madurai",
  "Salem",
  "Trichy",
  "Kochi",
  "Trivandrum",
  "Kozhikode",
  "Mangalore",
  "Mysore",
  "Vijayawada",
  "Visakhapatnam",
  "Warangal",

  // East India
  "Patna",
  "Ranchi",
  "Jamshedpur",
  "Bhubaneswar",
  "Cuttack",
  "Durgapur",
  "Asansol",
  "Siliguri",
  "Guwahati",
  "Shillong",

  // Other Important Cities
  "Meerut",
  "Bareilly",
  "Aligarh",
  "Moradabad",
  "Gwalior",
  "Jabalpur",
  "Raipur",
  "Bilaspur",
  "Panaji",
  "Pondicherry",
  "Imphal",
  "Aizawl",
  "Itanagar",
  "Gangtok",
  "Port Blair"
];

const PURPOSES = [
  "Business Expansion",
  "Working Capital",
  "Debt Consolidation",
  "Education",
  "Medical Emergency",
  "Wedding",
  "Personal Needs",
  "Balance Transfer of Existing LAP"
];


// Real-use product types as used in PL business



const loanAmountOptions = [
  500000, 1000000, 2000000, 3000000, 5000000
];

interface BackendResponse {
  success: boolean;
  message?: string;
  leadId?: string;
}
const PROPERTY_LOAN_PERCENT = 0.70;

// Logger setup
const logger = {
  info: (message: string) => console.log(`[INFO] ${new Date().toISOString()} - ${message}`),
};
const calculateEMI = (P: number, rate: number, tenure: number) => {
  if (!P || !rate || !tenure) return 0;

  const monthlyRate = rate / 12 / 100;

  return Math.round(
    (P * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1)
  );
};
const getDays = (text: string) => {
  const nums = text.match(/\d+/g)?.map(Number) || [];
  return nums.length ? Math.min(...nums) : 999;
};
const LapLoanPage: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  useEffect(() => {
  if (showFilters) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
}, [showFilters]);
  useEffect(() => {
  document.title =
    "Loan Against Property Eligibility & Interest Rates | RupeeDial";

  const setMeta = (name: string, content: string) => {
    let tag = document.querySelector(`meta[name="${name}"]`);
    if (!tag) {
      tag = document.createElement("meta");
      tag.setAttribute("name", name);
      document.head.appendChild(tag);
    }
    tag.setAttribute("content", content);
  };

  setMeta(
    "description",
    "Check Loan Against Property eligibility online. Compare LAP interest rates from top banks & NBFCs. Get up to 70% of property value with RupeeDial."
  );

  let canonical = document.querySelector("link[rel='canonical']");
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }
  canonical.setAttribute("href", "https://rupeedial.com/loan-against-property");
}, []);

  const [step, setStep] = useState<Step>(1);
  const [sortBy, setSortBy] = useState<"interest" | "emi" | "processing">("interest");
  const [loadingEligibility, setLoadingEligibility] = useState(false);

  const [form, setForm] = useState<Step1Form>({
    
    fullName: "",
    email: "",
    mobile: "",
    loanAmount: "",
    city: "",
    employmentType: "",
  
    formMonthlyIncome: "",
    existingEmi: "",
    companyType: "",
    workExperience: "",
    agreePrivacy: false,
    purpose: "",
    aadhaar: "",
    pan: "",
  propertyValue: "1000000",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
const [selectedBanks, setSelectedBanks] = useState<Offer[]>([]);
const primaryBank = selectedBanks[0] || null;
const updateLoanDetails = <K extends keyof LoanDetails>(
  key: K,
  value: LoanDetails[K]
) => {
  setLoanDetails((prev) =>
    prev ? { ...prev, [key]: value } : prev
  );
};

const selectedRate = primaryBank?.interestRate ?? 0;




const [interestFilter, setInterestFilter] = useState<string[]>([]);
const [processingFilter, setProcessingFilter] = useState<string[]>([]);


  const [canProceed, setCanProceed] = useState(false);
  const [agreeAppTerms, setAgreeAppTerms] = useState(false);

  const [uploaded, setUploaded] = useState<{
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

  const [leadId, setLeadId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // NEW: decline info
  

  const progressWidth = useMemo(() => `${(step / 4) * 100}%`, [step]);
const maxLoan = useMemo(() => {
  const propertyValue = Number(form.propertyValue || 0);
  if (!propertyValue) return 0;

  return Math.floor(propertyValue * PROPERTY_LOAN_PERCENT);
}, [form.propertyValue]);

 

const filteredOffers = useMemo(() => {
  // ✅ EMI calculation
 let list = offers.map((o) => {
  const tenure = 240;
  const effectiveRate = o.interestRate;

  const emi = calculateEMI(
    Number(form.loanAmount || 0),
    effectiveRate,
    tenure
  );

  return { ...o, emi };
});

// ✅ Interest filter yahan lagao
if (interestFilter.includes("upto11")) {
  list = list.filter((o) => o.interestRate <= 11);
}

if (interestFilter.includes("11to13")) {
  list = list.filter(
    (o) => o.interestRate > 11 && o.interestRate <= 13
  );
}

if (interestFilter.includes("above13")) {
  list = list.filter((o) => o.interestRate > 13);
}

if (processingFilter.includes("instant")) {
  list = list.filter((o) => getDays(o.processingTime) <= 2);
}

if (processingFilter.includes("1to2")) {
  list = list.filter((o) => {
    const d = getDays(o.processingTime);
    return d >= 1 && d <= 2;
  });
}

if (processingFilter.includes("3to7")) {
  list = list.filter((o) => {
    const d = getDays(o.processingTime);
    return d >= 3 && d <= 7;
  });
}
if (sortBy === "interest") {
  list.sort((a, b) => a.interestRate - b.interestRate);
}

if (sortBy === "emi") {
  list.sort((a, b) => a.emi - b.emi);
}

if (sortBy === "processing") {
  list.sort((a, b) => a.processingTime.localeCompare(b.processingTime));
}
const income = Number(form.formMonthlyIncome || 0);
const existingEmi = Number(form.existingEmi || 0);

const maxAllowedEmi = income * 0.6 - existingEmi;

if (maxAllowedEmi <= 0) {
  return [];
}

  // ✅ EMI filter
  list = list.filter((o) => o.emi <= maxAllowedEmi);

  return list;
}, [
  form.loanAmount,
  form.formMonthlyIncome,
  form.existingEmi,
  interestFilter,
  processingFilter,
  sortBy
]);

 
  // ---------- UI helper classes ----------
const optionalFields = ["aadhaar", "pan"];

const getInputClass = (field: string) =>
  `mt-1 block w-full rounded-md px-3 py-2 text-sm shadow-sm border focus:outline-none focus:ring-2 transition
  ${
    optionalFields.includes(field)
      ? "border-slate-300 bg-white focus:ring-[#10662A]" // ❌ no red ever
      : errors[field]
      ? "border-red-500 bg-red-50 focus:ring-red-500"
      : "border-slate-300 bg-white focus:ring-[#10662A]"
  }`;
const getSelectClass = (field: string) =>
  `mt-1 block w-full rounded-md border px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2
  ${
    errors[field]
      ? "border-red-500 focus:ring-red-500"
      : "border-slate-300 focus:ring-[#10662A]"
  }`;
  const errorClass = "mt-1 text-xs text-red-500";

  const primaryBtnClass =
    "inline-flex items-center justify-center rounded-lg bg-[#10662A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed";
  const successBtnClass =
    "inline-flex items-center justify-center rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50 disabled:cursor-not-allowed";
  const warningBtnClass =
    "inline-flex items-center justify-center rounded-lg bg-amber-500 px-5 py-3 text-sm font-semibold text-black shadow-sm transition";
  const backBtnClass =
    "inline-flex items-center justify-center rounded-lg bg-slate-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition";
  const outlineBtnClass =
    "inline-flex items-center justify-center rounded-lg border border-[#10662A] px-5 py-3 text-sm font-semibold text-[#10662A] transition";

  const actionButtonsClass =
    "mt-6 flex flex-wrap items-center justify-center gap-3";

  const setFormValue = <K extends keyof Step1Form>(
    field: K,
    value: Step1Form[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field as string]: "" }));
  };

  // ---------- Handlers ----------
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;
    const { id } = target;

    if (target instanceof HTMLInputElement && target.type === "checkbox") {
      const checked = target.checked;

      if (id === "privacyPolicy") {
        setForm((prev) => ({ ...prev, agreePrivacy: checked }));
        setErrors((prev) => ({ ...prev, agreePrivacy: "" }));
      }

      return;
    }

    const value = target.value;

    if (id === "aadhaar") {
      const digits = value.replace(/\D/g, "").slice(0, 12);
      setFormValue("aadhaar", digits as Step1Form["aadhaar"]);
      return;
    }

    if (id === "pan") {
      const cleaned = value
        .toUpperCase()
        .replace(/[^A-Z0-9]/g, "")
        .slice(0, 10);
      setFormValue("pan", cleaned as Step1Form["pan"]);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [id]: "",
    }));
  };

  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
    const aadhaarRegex = /^\d{12}$/;

  const propertyValueNum = Number(form.propertyValue || 0);

if (!form.propertyValue || propertyValueNum < 1000000) {
  newErrors.propertyValue =
    "Minimum property value must be ₹10,00,000";
}
if (form.existingEmi === "")
  newErrors.existingEmi = "Please enter EMI amount";

if (Number(form.existingEmi) < 0)
  newErrors.existingEmi = "Invalid EMI amount";
if (!form.purpose)
  newErrors.purpose = "Please select purpose of loan";

    if (!form.fullName.trim())
      newErrors.fullName = "Please enter your full name";

    if (!form.email.trim() || !emailRegex.test(form.email))
      newErrors.email = "Please enter a valid email address";

    if (!form.mobile.trim() || form.mobile.length !== 10)
      newErrors.mobile = "Please enter a valid 10-digit mobile number";

    const loanAmountNum = Number(form.loanAmount || 0);
    if (!form.loanAmount || loanAmountNum <= 0)
      newErrors.loanAmount = "Please enter required loan amount";
if (loanAmountNum > maxLoan) {
  newErrors.loanAmount = `Max eligible is ₹${maxLoan.toLocaleString("en-IN")}`;
}
    if (!form.city) newErrors.city = "Please select your city";

    if (!form.employmentType)
      newErrors.employmentType = "Please select employment type";

   

    const formIncome = Number(form.formMonthlyIncome || 0);
    if (!form.formMonthlyIncome || formIncome < 15000)
      newErrors.formMonthlyIncome =
        "Please enter your monthly income (minimum ₹15,000).";

    if (!form.companyType) newErrors.companyType = "Please select company type";

    if (!form.workExperience)
      newErrors.workExperience = "Please select work experience";

    if (!form.agreePrivacy)
      newErrors.agreePrivacy = "You must agree to the privacy policy";

    if (form.aadhaar && !aadhaarRegex.test(form.aadhaar))
      newErrors.aadhaar = "Aadhaar must be 12 digits";

    if (form.pan && !panRegex.test(form.pan))
      newErrors.pan = "Please enter a valid PAN (e.g. ABCDE1234F)";


    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCheckEligibility = () => {
    // reset old decline message


    const isValid = validateStep1();
    const loanAmountNum = Number(form.loanAmount || 0);
    const existingEmiNum = Number(form.existingEmi || 0);

    const formIncome = Number(form.formMonthlyIncome || 0);
    

    if (!isValid) {
      const amount = loanAmountNum;
      if (amount > maxLoan && maxLoan > 0) {
        alert(
          `Based on your entered property value, your approximate home loan eligibility is ₹${maxLoan.toLocaleString("en-IN")}
.\n\nYou have entered a higher loan amount of ₹${amount.toLocaleString(
            "en-IN"
          )}.\n\nPlease reduce the loan amount within your indicative eligibility and try again.`
        );
      } else {
        alert("Please fill all required fields correctly.");
      }
      return;
    }


   

    // if passes, proceed as earlier
    const details: LoanDetails = {
   
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      loanAmount: loanAmountNum,
      city: form.city,
      employmentType: form.employmentType,
     
      formMonthlyIncome: formIncome,
      existingEmi: existingEmiNum,
      companyType: form.companyType,
      workExperience: form.workExperience,
      propertyValue: Number(form.propertyValue || 0),
      purpose: form.purpose || undefined,
      aadhaar: form.aadhaar ? form.aadhaar.trim() : undefined,
      pan: form.pan ? form.pan.trim().toUpperCase() : undefined,
    };

    setLoanDetails(details);
    setStep(2);
    setLoadingEligibility(true);
    setCanProceed(false);

    setTimeout(() => {
      setLoadingEligibility(false);
    }, 1500);
  };

  const handlePrev = () => {
    setStep((prev) => (prev > 1 ? ((prev - 1) as Step) : prev));
  };

  const handleNextFromStep2 = () => {
    if (!loanDetails) return;
    if (!canProceed) {
      alert("Please select an offer to proceed.");
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

const handleSelectOffer = (offer: Offer) => {
  setSelectedBanks((prev) => {
    const exists = prev.find((b) => b.id === offer.id);

    if (exists) {
      const updated = prev.filter((b) => b.id !== offer.id);
      setCanProceed(updated.length > 0);
      return updated;
    } else {
      const updated = [...prev, offer];
      setCanProceed(true);
      return updated;
    }
  });
};



  // generate a client-side lead id: RF-PL-YYYYMMDD-XXXXXX
  const generateClientLeadId = (): string => {
    const now = new Date();
    const y = now.getFullYear().toString();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `RF-PL-${y}${m}${d}-${rand}`;
  };

  const handleSubmitApplication = async (): Promise<void> => {
    if (!agreeAppTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    if (!loanDetails) {
      alert("Missing loan details.");
      return;
    }

    setSubmitting(true);

    try {
      logger.info(`Submitting LAP loan application for user ${loanDetails?.fullName}`);
      const formData = new FormData();

      // JSON fields - backend expects these exact keys
   
      formData.append("loanDetails", JSON.stringify(loanDetails));
     
formData.append(
  "selectedBanks",
  JSON.stringify(
    selectedBanks.map((b) => ({
      id: b.id,
      bankName: b.bankName,
      interestRate: b.interestRate,
      emi: b.emi,
    }))
  )
);

      
     

      // Files
    uploaded.kyc.forEach((file) => formData.append("kyc[]", file));
uploaded.incomeProof.forEach((file) => formData.append("incomeProof[]", file));
uploaded.bankStatement.forEach((file) => formData.append("bankStatement[]", file));
uploaded.other.forEach((file) => formData.append("other[]", file));

      const res = await fetch(
  apiUrl("lap-loan/apply"),
  {
    method: "POST",
    body: formData,
  }
);

      // Pehle plain text lo
      const raw = await res.text();
      console.log("RAW RESPONSE:", raw);

      let json: BackendResponse | null = null;
      try {
        json = raw ? (JSON.parse(raw) as BackendResponse) : null;
      } catch {
        // Agar JSON parse fail ho, to raw text show karo
        throw new Error(
          `Server sent invalid JSON. Status: ${res.status}. Body: ${raw}`
        );
      }

      console.log("API Response:", json);

      if (!res.ok || !json || json.success === false) {
        throw new Error(json?.message || "Something went wrong");
      }

      // Success – backend leadId ya client-side fallback
      const finalLeadId = json.leadId || generateClientLeadId();
      setLeadId(finalLeadId);

      setStep(4);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to submit application";
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "kyc" | "incomeProof" | "bankStatement" | "other"
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setUploaded((prev) => ({ ...prev, [key]: files }));
  };

  const maskAadhaar = (a?: string) => {
    if (!a) return "—";
    if (a.length === 12) return `XXXX-XXXX-${a.slice(-4)}`;
    return `****${a.slice(-4)}`;
  };

  const maskPan = (p?: string) => {
    if (!p) return "—";
    return `***${p.slice(-3).toUpperCase()}`;
  };

  const handleDownloadApplication = () => {
    if (!loanDetails) {
      alert("Application details not available.");
      return;
    }

    const content = `
🟢 Rupeedial - Loan Against Property Application  
────────────────────────────────────────────

📌 Application Details
• Application ID: ${leadId || "-"}
• Bank: ${primaryBank ? primaryBank.bankName : "—"}

• Loan Amount: ₹ ${loanDetails.loanAmount.toLocaleString("en-IN")}
• Interest Rate: ${selectedRate}% p.a
Tenure: Up to 15 years (bank dependent)

EMI: Indicative, subject to sanction


👤 Applicant Details
• Full Name: ${loanDetails.fullName}
• Email: ${loanDetails.email}
• Mobile: ${loanDetails.mobile}
• City: ${loanDetails.city}
• Company Type: ${loanDetails.companyType}
• Employment Type: ${loanDetails.employmentType}
• Monthly Income: ₹ ${loanDetails.formMonthlyIncome.toLocaleString("en-IN")}
• Existing EMIs: ₹ ${loanDetails.existingEmi.toLocaleString("en-IN")}
• Loan Purpose: ${loanDetails.purpose || "-"}

🕒 Generated At
${new Date().toLocaleString("en-IN")}

────────────────────────────────────────────
Thank you for choosing Rupeedial 💚
We will assist you throughout your loan journey!
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Rupeedial-Loan-Application-${leadId || "copy"}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // ---------- JSX ----------
  return (
    <div className="w-full">
      {/* HERO SECTION – PERSONAL LOAN */}
      <section className="w-full bg-[#F5FFF8] border-b border-emerald-50">
        <div className="mx-auto flex max-w-6xl flex-col md:py-6 items-center gap-10 px-4 md:flex-row">
          {/* LEFT */}
          <div className="flex-1 min-w-[260px]">
            <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#10662A] shadow-sm border border-[#d8efe6]">
              Home · Loan
            </div>

            <h1 className="mb-2 text-3xl md:text-4xl font-extrabold text-[#10662A]">
              Big{" "}
              <span className="text-[#390A5D]">Requirements</span>
            </h1>
            <h2 className="text-base md:text-lg font-semibold text-[#10662A] mb-3">
             High-Value Loan • Lower Interest • Longer Tenure
            </h2>
            <p className="text-sm md:text-base text-[#390A5D] mb-5 leading-relaxed">
           Use your residential or commercial property to get a high-value loan at attractive interest rates. Ideal for business expansion, education, wedding, Simple process, quick eligibility check and end-to-end support.
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("pl-wizard");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center rounded-lg bg-[#10662A] px-5 py-3 text-sm font-semibold text-white shadow-sm transition"
              >
                Check LAP Eligibility
              </button>
              <a
                href="/expert"
                className="inline-flex items-center justify-center rounded-lg border border-[#10662A] bg-white px-5 py-3 text-sm font-semibold text-[#10662A] transition"
              >
                Talk to Loan Expert
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex-1 flex justify-center">
            <div className="relative">
             <div className="relative group">
  <div
    className="absolute -inset-3 rounded-2xl 
               opacity-0 
               group-hover:opacity-100 
               transition-all duration-300
               group-hover:shadow-[0_10px_30px_rgba(57,10,93,0.8)]"
  />

  <img
    src={lap}
     alt="Loan Against Property eligibility and interest rates illustration"
    className="relative 
               w-full max-w-[260px] sm:max-w-[300px] md:max-w-[340px] h-auto 
               rounded-xl object-contain
               transition-transform duration-300
               group-hover:scale-105"
  />
</div>

              </div>
            
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="bg-white">
        {/* WIZARD SECTION */}
        <section id="pl-wizard" className="py-10 md:py-14">
          <div className="mx-auto max-w-6xl px-4">
            {/* Step wizard header */}
            <div className="mb-6 rounded-xl border border-slate-200 bg-[#F5FFF8] p-4 shadow-sm">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs md:text-sm font-semibold text-[#390A5D]">
                {[
                  "Fill Personal Details",
                  "Compare Bank Offers",
                  "Complete Application",
                  "Loan Disbursal",
                ].map((title, index) => {
                  const stepNumber = (index + 1) as Step;
                  const isActive = step === stepNumber;
                  const isCompleted = step > stepNumber;

                  const base =
                    "w-40 max-w-full h-12 rounded-lg flex items-center justify-center md:text-xs font-semibold border text-center px-2";
                  const active =
                    "border-[#390A5D] bg-[#390A5D] text-white shadow-sm";
                  const completed =
                    "border-[#10662A] bg-[#10662A] text-white";
                  const inactive =
                    "border-slate-200 bg-slate-100 text-[#390A5D]";

                  const cls = isCompleted
                    ? `${base} ${completed}`
                    : isActive
                    ? `${base} ${active}`
                    : `${base} ${inactive}`;

                  return (
                    <div key={stepNumber} className={cls}>
                      <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full border bg-white/10 text-[11px]">
                        {stepNumber}
                      </span>
                      <span>{title}</span>
                    </div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-[#10662A] transition-all"
                  style={{ width: progressWidth }}
                />
              </div>
            </div>

            {/* STEP 1 */}
            {step === 1 && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
                <div className="mb-4 border-b border-slate-100 pb-4">
                  <h2 className="flex items-center gap-2 text-base font-semibold text-[#390A5D] md:text-lg">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#10662A]/10 text-[#10662A] text-xs font-bold">
                      1
                    </span>
                    Enter Personal &amp; Income Details
                  </h2>
                </div>

                {/* Eligibility + Loan Type */}
                <div className="mb-6 rounded-xl bg-[#B0E9B2] p-4 md:p-5">
                  <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#390A5D]">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm text-[#10662A] text-xs font-bold">
                    LAP
                    </span>
                    Loan Against Property Eligibility &amp; Product Type
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
               <div>
  <label className="text-xs font-semibold text-[#390A5D]">
    Property Value (₹) *
  </label>
  <input
    type="number"
    id="propertyValue"
    className={getInputClass("propertyValue")}
    value={form.propertyValue}
    onChange={handleInputChange}
  />
  <p className="mt-1 text-[11px] text-[#390A5D]">
  Minimum property value: ₹10,00,000
</p>
{errors.propertyValue && (
  <p className={errorClass}>{errors.propertyValue}</p>
)}

</div>


                    <div>
                      <label className="text-xs font-semibold text-[#390A5D]">
                        Eligible Loan % of Property

                      </label>
<input
  type="text"
  className={`${getInputClass("propertyValue")} bg-slate-100`}
value="70% of Property Value"
  readOnly
/>




<p className="mt-1 text-[11px] text-[#390A5D]">
  Approx. 70% of property value
</p>

                    </div>

                    <div>
                     
                    <label className="text-xs font-semibold text-[#390A5D]">
  Approx. Eligible Loan Against Property
</label>

<input
  type="text"
  className={`${getInputClass("maxLoan")} bg-slate-100`}
  value={
    maxLoan > 0
      ? `₹ ${maxLoan.toLocaleString("en-IN")}`
      : "Enter property value"
  }
  readOnly
/>


                    </div>
                  </div>
                </div>

                {/* Main form */}
                <div className="space-y-4">
                  {/* Row: Full Name + Aadhaar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="fullName"
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className={getInputClass("fullName")}
                        value={form.fullName}
                        onChange={handleInputChange}
                      />
                      {errors.fullName && (
                        <p className={errorClass}>{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="aadhaar"
                      >
                        Aadhaar Number
                      </label>
                      <input
                        type="text"
                        id="aadhaar"
                        className={getInputClass("aadhaar")}
                        placeholder="12-digit Aadhaar (optional)"
                        value={form.aadhaar}
                        onChange={handleInputChange}
                      />
                      {errors.aadhaar && (
                        <p className={errorClass}>{errors.aadhaar}</p>
                      )}
                    </div>
                  </div>

                  {/* Row: PAN + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="pan"
                      >
                        PAN Number
                      </label>
                      <input
                        type="text"
                        id="pan"
                        className={getInputClass("pan")}
                        placeholder="Enter PAN (e.g. ABCDE1234F)"
                        value={form.pan}
                        onChange={handleInputChange}
                      />
                      {errors.pan && (
                        <p className={errorClass}>{errors.pan}</p>
                      )}
                    </div>

                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="email"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                       className={getInputClass("email")}
                        value={form.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <p className={errorClass}>{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row: Mobile + Purpose */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="mobile"
                      >
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        className={getInputClass("mobile")}
                        maxLength={10}
                        value={form.mobile}
                        onChange={handleInputChange}
                      />
                      {errors.mobile && (
                        <p className={errorClass}>{errors.mobile}</p>
                      )}
                    </div>

                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="purpose"
                      >
                        Purpose of Loan
                      </label>
                      <select
                        id="purpose"
                        className={getSelectClass("purpose")}
                        value={form.purpose}
                        onChange={handleInputChange}
                        
                      >
                      
                        <option value="">Select Purpose</option>
                        {PURPOSES.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
  {errors.purpose && (
  <p className={errorClass}>{errors.purpose}</p>
)}
                    </div>
                  </div>

                  {/* Row: Loan Amount + City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="loanAmount"
                      >
                        Required Loan Amount (₹) *
                      </label>

                      {/* ek hi input – manual + dropdown */}
                      <input
                        list="loanAmountOptions"
                        type="number"
                        id="loanAmount"
                       className={getInputClass("loanAmount")}
                        placeholder="Enter or select amount"
                        value={form.loanAmount}
                        onChange={handleInputChange}
                        min={50000}
                        step={10000}
                      />

                      {/* dropdown list → isme options show honge */}
                      <datalist id="loanAmountOptions">
                        {loanAmountOptions.map((amount) => (
                          <option key={amount} value={amount}>
                            ₹ {amount.toLocaleString("en-IN")}
                          </option>
                        ))}
                      </datalist>

                     

                    <p className="mt-1 text-[11px] text-[#390A5D]">
  EMI & tenure will be finalized by bank post sanction (15–30 years)
</p>

                    </div>

                    {/* City */}
                    <div>
                      
                      <div>
  <label
    className="text-xs font-semibold text-[#390A5D]"
    htmlFor="city"
  >
    Current City *
  </label>

  {/* INPUT + SEARCH */}
  <input
    type="text"
    id="city"
    list="cityList"
    className={getInputClass("city")}
    placeholder="Type or select your city"
    value={form.city}
    onChange={handleInputChange}
  />

  {/* SUGGESTION LIST */}
  <datalist id="cityList">
    {CITY_LIST.map((c) => (
      <option key={c} value={c} />
    ))}
  </datalist>

  {errors.city && (
    <p className={errorClass}>{errors.city}</p>
  )}
</div>
                     
                    </div>
                  </div>

                  {/* Row: Employment Type + Company Type */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="employmentType"
                      >
                        Employment Type *
                      </label>
                      <select
                        id="employmentType"
                       className={getSelectClass("employmentType")}
                        value={form.employmentType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Employment Type</option>
                        <option value="salaried">Salaried</option>
                        <option value="self-employed">Self Employed</option>
                        <option value="professional">Professional</option>
                      </select>
                      {errors.employmentType && (
                        <p className={errorClass}>
                          {errors.employmentType}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="companyType"
                      >
                        Company Type *
                      </label>
                      <select
                        id="companyType"
                        className={getSelectClass("companyType")}
                        value={form.companyType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select Company Type</option>
                        <option value="mnc">MNC / Listed Company</option>
                        <option value="govt">Government / PSU</option>
                        <option value="pvt-ltd">Private Limited</option>
                        <option value="proprietorship">
                          Proprietorship / Others
                        </option>
                      </select>
                      {errors.companyType && (
                        <p className={errorClass}>{errors.companyType}</p>
                      )}
                    </div>
                  </div>

                  {/* Row: Net Monthly Income + Existing EMI */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="formMonthlyIncome"
                      >
                        Net Monthly Income (₹) *
                      </label>
                      <input
                        type="number"
                        id="formMonthlyIncome"
                        className={getInputClass("formMonthlyIncome")}
                        value={form.formMonthlyIncome}
                        onChange={handleInputChange}
                      />
                      {errors.formMonthlyIncome && (
                        <p className={errorClass}>
                          {errors.formMonthlyIncome}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="existingEmi"
                      >
                        Existing Monthly EMIs (Total ₹)
                      </label>
                      <input
                        type="number"
                        id="existingEmi"
                        className={getInputClass("existingEmi")}
                        value={form.existingEmi}
                        onChange={handleInputChange}
                      />
                      {errors.existingEmi && (
  <p className={errorClass}>{errors.existingEmi}</p>
)}
                    </div>
                  </div>

                  {/* Row: Work Experience */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="workExperience"
                      >
                        Total Work Experience *
                      </label>
                      <select
                        id="workExperience"
                        className={getSelectClass("workExperience")}
                        value={form.workExperience}
                        onChange={handleInputChange}
                      >
                       <option value="">Select Experience</option>
<option value="1-2">1 – 2 years</option>
<option value="2-5">2 – 5 years</option>
<option value="5-10">5 – 10 years</option>
<option value="10+">More than 10 years</option>

                      </select>
                      {errors.workExperience && (
                        <p className={errorClass}>{errors.workExperience}</p>
                      )}
                    </div>

                    <div />
                  </div>

                  <div>
                    <label className="flex items-start gap-2 text-xs text-[#390A5D]">
                      <input
                        type="checkbox"
                        id="privacyPolicy"
                        checked={form.agreePrivacy}
                        onChange={handleInputChange}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-[#10662A] focus:ring-2 focus:ring-[#10662A]"
                      />
                      <span>
                        I authorise Rupeedial and its partner banks / NBFCs to
                        contact me via call / SMS / WhatsApp / email with loan
                        offers. I have read and agree to the{" "}
                        <a
                          href="#"
                          className="text-[#10662A] underline-offset-2"
                        >
                          Privacy Policy
                        </a>
                        .
                      </span>
                    </label>
                    {errors.agreePrivacy && (
                      <p className={errorClass}>{errors.agreePrivacy}</p>
                    )}
                  </div>

                  {/* NEW: Decline reason block */}
                

                  <div className={actionButtonsClass}>
                    <button
                      type="button"
                      className={primaryBtnClass}
                      onClick={handleCheckEligibility}
                    >
                      Check Loan Against Property Eligibility
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 – COMPARE OFFERS */}
            
            {step === 2 && loanDetails && (

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
             

                <div className="mb-4 border-b border-slate-100 pb-4">
                  <h2 className="flex items-center gap-2 text-base font-semibold text-[#390A5D] md:text-lg">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#10662A]/10 text-[#10662A] text-xs font-bold">
                      2
                    </span>
                    Compare Loan Against Property Offers from Top Banks
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
  Based on your property value, profile and selected banks, these offers are suitable for you.
</p>

                </div>

                {loadingEligibility ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="mb-3 h-8 w-8 animate-spin rounded-full border-4 border-[#10662A] border-t-transparent" />
                    <p className="text-sm text-[#390A5D]">
                      Fetching personalised offers from our partner banks...
                    </p>
                  </div>
                  
                ) : (
                  <>
  <button
  onClick={() => setShowFilters(true)}
  className="md:hidden w-full bg-[#10662A] text-white py-2 rounded mb-3"
>
  Filters
</button>
                  <div className="grid gap-4 grid-cols-1 md:grid-cols-[260px,1fr]">
{showFilters && (
  <div
    className="fixed inset-0 bg-black/40 z-40 md:hidden"
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        setShowFilters(false);
      }
    }}
  />
)}
                    {/* FILTERS */}
                  <aside
                  
 className={`
  ${showFilters ? "translate-x-0" : "-translate-x-full"} 
  transition-transform duration-300
  md:translate-x-0
  fixed md:static
  top-0 left-0
  w-[80%] md:w-auto
  h-full md:h-auto
  bg-white z-50
  p-4
`}
>
  <div className="md:hidden flex justify-between mb-3">
  <h3 className="font-semibold text-[#390A5D]">Filters</h3>
  <button onClick={() => setShowFilters(false)}>✕</button>
</div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-[#390A5D]">
                          Filters &amp; Sort by
                        </h3>
                       <button
  type="button"
  className="text-[11px] text-[#10662A]"
 onClick={() => {
  setSortBy("interest");
  setInterestFilter([]);
  setProcessingFilter([]);
}}

>
  Clear All
</button>

                      </div>

                      {/* SORT BY */}
                      <div className="border-t border-slate-200 pt-3 mt-3">
                        <h4 className="text-[11px] font-semibold uppercase text-slate-500 mb-2">
                          Sort By
                        </h4>
                      <label className="mb-1 flex items-center gap-2">
  <input
    type="radio"
    className="h-3 w-3"
    checked={sortBy === "interest"}
    onChange={() => setSortBy("interest")}
  />
  <span>Interest Rate – Low to High</span>
</label>

<label className="mb-1 flex items-center gap-2">
  <input
    type="radio"
    className="h-3 w-3"
    checked={sortBy === "emi"}
    onChange={() => setSortBy("emi")}
  />
  <span>EMI – Low to High</span>
</label>

<label className="mb-1 flex items-center gap-2">
  <input
    type="radio"
    className="h-3 w-3"
    checked={sortBy === "processing"}
    onChange={() => setSortBy("processing")}
  />
  <span>Processing Time</span>
</label>

                      </div>

                   
                      {/* INTEREST RATE */}
                      <div className="border-t border-slate-200 pt-3 mt-3">
                        <h4 className="text-[11px] font-semibold uppercase text-slate-500 mb-2">
                          Interest Rate (p.a.)
                        </h4>
                        <label className="mb-1 flex items-center gap-2">
                          <input
  type="checkbox"
  className="h-3 w-3"
  checked={interestFilter.includes("upto11")}
  onChange={() =>
    setInterestFilter((p) =>
      p.includes("upto11") ? p.filter(x => x !== "upto11") : [...p, "upto11"]
    )
  }
/>

                          <span>Up to 11% p.a.</span>
                        </label>
                        <label className="mb-1 flex items-center gap-2">
                          <input
  type="checkbox"
  className="h-3 w-3"
  checked={interestFilter.includes("11to13")}
  onChange={() =>
    setInterestFilter((p) =>
      p.includes("11to13") ? p.filter(x => x !== "11to13") : [...p, "11to13"]
    )
  }
/>

                          <span>11% – 13% p.a.</span>
                        </label>
                        <label className="mb-1 flex items-center gap-2">
                         <input
  type="checkbox"
  className="h-3 w-3"
  checked={interestFilter.includes("above13")}
  onChange={() =>
    setInterestFilter((p) =>
      p.includes("above13") ? p.filter(x => x !== "above13") : [...p, "above13"]
    )
  }
/>

                          <span>Above 13% p.a.</span>
                        </label>
                      </div>

                      {/* PROCESSING TIME */}
                      <div className="border-t border-slate-200 pt-3 mt-3">
                        <h4 className="text-[11px] font-semibold uppercase text-slate-500 mb-2">
                          Processing Time
                        </h4>
                        {[
  { label: "Instant", key: "instant" },
  { label: "1 - 2 Days", key: "1to2" },
  { label: "3 - 7 Days", key: "3to7" },
].map((t) => (
  <label key={t.key} className="mb-1 flex items-center gap-2">
    <input
      type="checkbox"
      className="h-3 w-3"
      checked={processingFilter.includes(t.key)}
      onChange={() =>
        setProcessingFilter((p) =>
          p.includes(t.key)
            ? p.filter(x => x !== t.key)
            : [...p, t.key]
        )
      }
    />
    <span>{t.label}</span>
  </label>
))}

                      </div>

                      {/* PROCESS TYPE */}
                      <div className="border-t border-slate-200 pt-3 mt-3">
                        <h4 className="text-[11px] font-semibold uppercase text-slate-500 mb-2">
                          Process Type
                        </h4>
                        <label className="mb-1 flex items-center gap-2">
                          <input type="checkbox" className="h-3 w-3" />
                          <span>Fully Digital Journey</span>
                        </label>
                        <label className="mb-1 flex items-center gap-2">
                          <input type="checkbox" className="h-3 w-3" />
                          <span>Assisted / Doorstep Documentation</span>
                        </label>
                      </div>
                    </aside>

                    {/* OFFERS LIST */}
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      {/* Top banner */}
                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#E3F6EC] px-4 py-3 text-xs text-slate-800">
                        <span className="inline-flex items-center rounded-full border border-[#10662A33] bg-white px-3 py-1 text-[11px] font-semibold text-[#10662A]">
                          Get assured rewards on loan disbursal*
                        </span>
                        <div className="text-right">
                          <div>
                            Product:{" "}
                            <span className="font-semibold text-[#390A5D]">
                          
                            </span>
                          </div>
                          <div>
                            Loan Amount:{" "}
                            <span className="font-semibold text-[#390A5D]">
                              ₹{" "}
                              {loanDetails.loanAmount.toLocaleString("en-IN")}
                            </span>{" "}
                           
                          </div>
                        </div>
                      </div>

                      {/* Cards */}
                      <div className="space-y-3">
                     {filteredOffers.map((offer) => {

  const isSelected = selectedBanks.some((b) => b.id === offer.id);

  return (
 <article
  key={offer.id}
  className={`grid gap-4 rounded-xl border bg-white p-4 shadow-sm
  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center
  ${
    isSelected
      ? "border-[#10662A]"
      : "border-slate-200 hover:border-[#10662A]"
  }`}
>
      {/* LEFT – BANK INFO */}
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 font-bold text-purple-700">
          {offer.code}
        </div>
        <div>
          <div className="font-semibold text-[#390A5D]">
            {offer.bankName}
          </div>
          <div className="text-xs text-slate-500">
            Processing Time: {offer.processingTime}
          </div>
        </div>
      </div>

     
     

      {/* INTEREST */}
      <div>
        <div className="text-[11px] text-slate-500">
          Interest Rate (p.a.)
        </div>
        <div className="font-semibold text-[#10662A]">
          {offer.interestRate}% onwards
        </div>
        <div className="text-[11px] text-slate-400">
          APR: {offer.apr}%
        </div>
      </div>

      {/* EMI */}
      <div>
        <div className="text-[11px] text-slate-500">
  Indicative EMI (30 yrs)
</div>


        <div className="font-semibold text-[#10662A]">
          ₹ {offer.emi.toLocaleString("en-IN")}
        </div>
        
      </div>

      {/* ACTION */}
      <div className="text-left md:text-right">
        <button
          type="button"
          onClick={() => handleSelectOffer(offer)}
          className={`rounded-full px-5 py-2 text-xs font-semibold text-white
  ${
    isSelected ? "bg-green-700" : "bg-[#10662A]"
  }`}
        >
          {isSelected ? "Selected" : "Select"}
        </button>

        <div className="mt-1 text-[11px] text-[#10662A] cursor-pointer">
          + View product details
        </div>
      </div>
    </article>
  );
})}

                      </div>

                      <div className={actionButtonsClass}>
                        <button
                          type="button"
                          className={backBtnClass}
                          onClick={handlePrev}
                        >
                          Back to Details
                        </button>
                        <button
                          type="button"
                          className={warningBtnClass}
                          onClick={() => {
                            setLoadingEligibility(true);
                            setTimeout(
                              () => setLoadingEligibility(false),
                              1500
                            );
                          }}
                        >
                          Recalculate
                        </button>
                        <button
                          type="button"
                          className={successBtnClass}
                          onClick={handleNextFromStep2}
                          disabled={!canProceed}
                        >
                          Proceed to Apply
                        </button>
                      </div>
                    </div>
                  </div>
                  </>
                )}
              </div>
            )}

            {/* STEP 3 – APPLICATION FORM (with Document Upload) */}
            {step === 3 && loanDetails && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
                <div className="mb-4 border-b border-slate-100 pb-4">
                  
                  <h2 className="flex items-center gap-2 text-base font-semibold text-[#390A5D] md:text-lg">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#10662A]/10 text-[#10662A] text-xs font-bold">
                      3
                    </span>
                    Complete Your LAP Application
                  </h2>
                </div>

                <div className="mb-5 rounded-xl border border-[#CDEEDB] bg-[#F3FFF7] px-4 py-3">
                  <h3 className="text-sm font-semibold text-[#390A5D]">
                    Selected Bank &amp; Product
                  </h3>
                 <div className="mt-2 space-y-2">
  <div className="text-xs font-semibold text-[#390A5D]">
    Selected Banks
  </div>

  {selectedBanks.map((bank) => (
    <div
      key={bank.id}
      className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs"
    >
      <div>
        <div className="font-semibold text-[#10662A]">
          {bank.bankName}
        </div>
        <div className="text-[11px] text-slate-500">
          Interest: {bank.interestRate}% | EMI: ₹{" "}
          {bank.emi.toLocaleString("en-IN")}
        </div>
      </div>

      <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
        Selected
      </span>
    </div>
  ))}
</div>

                  <p className="mt-1 text-xs text-slate-700">
                    Loan Amount: ₹{" "}
                  Interest Rate & EMI will be finalized post sanction.

                  </p>
                </div>

                {/* Personal & Employment Info */}
                <h3 className="mb-3 text-sm font-semibold text-[#390A5D]">
                  Personal &amp; Employment Information
                </h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
  <label className="text-xs font-semibold text-slate-700">
    Full Name
  </label>
 <input
  type="text"
  className={getInputClass("fullName")}
  value={loanDetails.fullName}
  onChange={(e) =>
    updateLoanDetails("fullName", e.target.value)
  }
/>

</div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Email Address
                    </label>
                    <input
  type="email"
 className={getInputClass("email")}
  value={loanDetails.email}
  onChange={(e) =>
    updateLoanDetails("email", e.target.value)
  }
/>

                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Mobile Number
                    </label>
                   <input
  type="tel"
 className={getInputClass("mobile")}
  value={loanDetails.mobile}
  maxLength={10}
  onChange={(e) =>
    updateLoanDetails(
      "mobile",
      e.target.value.replace(/\D/g, "").slice(0, 10)
    )
  }
/>

                  </div>
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Total Existing EMIs (₹)
                    </label>
                   <input
  type="number"
className={getInputClass("existingEmi")}
  value={loanDetails.existingEmi}
  onChange={(e) =>
    updateLoanDetails("existingEmi", Number(e.target.value || 0))
  }
/>

                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Net Monthly Income (₹)
                    </label>
                    <input
  type="number"
 className={getInputClass("formMonthlyIncome")}
  value={loanDetails.formMonthlyIncome}
  onChange={(e) =>
    updateLoanDetails("formMonthlyIncome", Number(e.target.value || 0))
  }
/>

                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Employment Type
                    </label>
                    <select
  className={getSelectClass("employmentType")}
  value={loanDetails.employmentType}
  onChange={(e) =>
    updateLoanDetails("employmentType", e.target.value)
  }
>

                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self Employed</option>
                      <option value="professional">Professional</option>
                    </select>
                  </div>
                </div>

                

                {/* KYC & details */}
               
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Company Type
                    </label>
                    <input
                      type="text"
                      className={`${getInputClass("CompanyType")} bg-slate-100`}
                      value={loanDetails.companyType}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      City
                    </label>
                    <select
  className={getSelectClass("city")}
  value={loanDetails.city}
  onChange={(e) =>
    updateLoanDetails("city", e.target.value)
  }
>

                      <option value="">Select City</option>
                      {CITY_LIST.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
  

  
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      PAN (masked)
                    </label>
                    <input
                      type="text"
                      className={`${getInputClass("pan")} bg-slate-100`}
                      value={maskPan(loanDetails.pan)}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Aadhaar (masked)
                    </label>
                    <input
                      type="text"
                      className={`${getInputClass("aadhaar")} bg-slate-100`}
                      value={maskAadhaar(loanDetails.aadhaar)}
                      readOnly
                    />
                  </div>
                </div>

              <div className="mt-6">
  <h3 className="mb-3 text-sm font-semibold text-[#390A5D]">
    Document Upload
  </h3>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">

    {/* KYC Documents */}
    <div>
      <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white/80 px-3 py-6 text-center text-xs text-slate-700">
        <span className="mb-2 text-sm font-bold text-[#10662A]">
          KYC Documents
        </span>
        <p className="mb-1 text-[11px]">
          Upload PAN / Aadhaar copies (PDF / JPG / PNG)
        </p>
<input
  name="kyc[]"
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
  multiple
  onChange={(e) => handleFileChange(e, "kyc")}
/>


        <div className="mt-2 text-[11px] text-slate-600">
          {uploaded.kyc.length > 0
            ? `${uploaded.kyc.length} file(s): ${uploaded.kyc
                .map((f) => f.name)
                .join(", ")}`
            : "No files selected"}
        </div>
      </div>
    </div>

     {/* Property Documents */}
<div>
  <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white/80 px-3 py-6 text-center text-xs text-slate-700">
    <span className="mb-2 text-sm font-bold text-[#10662A]">
      Property Documents
    </span>
    <p className="mb-1 text-[11px]">
      (Sale Deed / Registry / Property Tax Receipt)
    </p>
    <input
      name="propertyDocs[]"
      type="file"
      accept=".pdf,.jpg,.jpeg,.png"
      multiple
      onChange={(e) => handleFileChange(e, "other")}
    />
    <div className="mt-2 text-[11px] text-slate-600">
      {uploaded.other.length > 0
        ? `${uploaded.other.length} file(s): ${uploaded.other
            .map((f) => f.name)
            .join(", ")}`
        : "No files selected"}
    </div>
  </div>
</div>


    {/* Income Proof */}
    <div>
      <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white/80 px-3 py-6 text-center text-xs text-slate-700">
        <span className="mb-2 text-sm font-bold text-[#10662A]">
          Income Proof
        </span>
        <p className="mb-1 text-[11px]">
          Salary slips (Salaried) / ITR (Self-employed)
        </p>

        <input
          name="incomeProof[]"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          onChange={(e) => handleFileChange(e, "incomeProof")}
          className="mt-2 w-full text-[10px]"
        />

        <div className="mt-2 text-[11px] text-slate-600">
          {uploaded.incomeProof.length > 0
            ? `${uploaded.incomeProof.length} file(s): ${uploaded.incomeProof
                .map((f) => f.name)
                .join(", ")}`
            : "No files selected"}
        </div>
      </div>
    </div>


      
      

                    {/* Bank Statement */}
                    <div>
                      <div className="flex h-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white/80 px-3 py-6 text-center text-xs text-slate-700">
                        <span className="mb-2 text-sm font-bold text-[#10662A]">
                          Bank Statement
                        </span>
                        <p className="mb-1 text-[11px]">
                          Last 6 months bank statement (PDF)
                        </p>
                        <input
  name="bankStatement[]"
  type="file"
  accept=".pdf,.jpg,.jpeg,.png"
  multiple
  onChange={(e) => handleFileChange(e, "bankStatement")}
/>

                        <div className="mt-2 text-[11px] text-slate-600">
                          {uploaded.bankStatement.length > 0
                            ? `${uploaded.bankStatement.length} file(s): ${uploaded.bankStatement
                                .map((f) => f.name)
                                .join(", ")}`
                            : "No files selected"}
                        </div>
                      </div>
                    </div>

                    
                  
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Loan Purpose
                    </label>
                    <input
                      type="text"
                      className={`${getInputClass("purpose")} bg-slate-100`}
                      value={loanDetails.purpose || "—"}
                      readOnly
                    />
                  </div>
                  <div>
                    
                  </div>
                </div>

                <div className="mt-4">
                  <label className="flex items-start gap-2 text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={agreeAppTerms}
                      onChange={(e) => setAgreeAppTerms(e.target.checked)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-[#10662A] focus:ring-2 focus:ring-[#10662A]"
                    />
                    <span>
                      I confirm that all the details provided above are true and
                      correct. I understand that final approval, loan amount and
                      interest rate are at the sole discretion of the bank /
                      NBFC after verification and credit checks. I agree to the{" "}
                      <a
                        href="#"
                        className="text-[#10662A] underline-offset-2"
                      >
                        Terms &amp; Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-[#10662A] underline-offset-2"
                      >
                        Privacy Policy
                      </a>
                      .
                    </span>
                  </label>
                </div>

                <div className={actionButtonsClass}>
                  <button
                    type="button"
                    className={backBtnClass}
                    onClick={handlePrev}
                  >
                    Back to Offers
                  </button>
                  <button
                    type="button"
                    className={successBtnClass}
                    onClick={handleSubmitApplication}
                    disabled={submitting}
                  >
                    {submitting
                      ? "Submitting..."
                      : "Submit Loan Against Property Application"}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4 – SUCCESS */}
            {step === 4 && loanDetails && (
              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
                <div className="mb-4 border-b border-slate-100 pb-4">
                  <h2 className="flex items-center gap-2 text-base font-semibold text-[#390A5D] md:text-lg">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                      4
                    </span>
                    LAP Application Submitted 
                  </h2>
                </div>

                <div className="flex flex-col items-center py-6">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                    <span className="text-3xl text-emerald-600">✓</span>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-emerald-700">
                    Thank You!
                  </h2><div className="mb-6 max-w-xl text-center text-sm text-slate-700">
  <span>
    Your {" "}
   <span className="font-semibold text-emerald-700">
  Loan Against Property
</span>
{" "}
    has been shared 
  </span>

  <div className="mt-2 space-y-1">
    {selectedBanks.map((bank) => (
      <div key={bank.id} className="flex justify-between text-sm">
        <span className="font-medium text-emerald-700">
          {bank.bankName}
        </span>
        <span>
          ₹ {bank.emi.toLocaleString("en-IN")} @ {bank.interestRate}%
        </span>
      </div>
    ))}
  </div>

  <div className="mt-2">
    The bank will contact you directly for verification.
  </div>
</div>


                  <div className="mb-6 w-full max-w-2xl">
                    <div className="rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-4 py-3 text-left text-xs text-emerald-900">
                      <h3 className="mb-2 text-sm font-semibold">
                        What happens next?
                      </h3>
                      <ul className="list-disc space-y-1 pl-5">
                        <li>
                         Your application will undergo property verification, legal check and valuation.

                        </li>
                        <li>
                          You may receive a verification call / SMS / email from
                          the bank or Rupeedial team.
                        </li>
                        <li>
                          Post verification, the final loan amount, interest
                          rate and EMI will be confirmed.
                        </li>
                        <li>
                          In case of Balance Transfer or BT Cash Out, your
                          existing lender details and foreclosure letter will be
                          required.
                        </li>
                        <li>
                          Rupeedial will remain your single point of contact for
                          any clarification or assistance on this application.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="mb-6 w-full max-w-md">
                    <div className="rounded-xl border border-emerald-500 bg-white px-4 py-3 text-xs text-slate-800 shadow-sm">
                      <h3 className="mb-2 text-sm font-semibold text-emerald-700">
                        Application Snapshot
                      </h3>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            Application ID:
                          </span>
                          <span>{leadId || "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Bank:</span>
                         <div className="space-y-1">
  {selectedBanks.map((bank) => (
    <div key={bank.id} className="flex justify-between">
      <span className="font-medium">{bank.bankName}</span>
      <span>
        ₹ {bank.emi.toLocaleString("en-IN")} @ {bank.interestRate}%
      </span>
    </div>
  ))}
</div>

                        </div>
                       
                        <div className="flex justify-between">
                          <span className="font-medium">Loan Amount:</span>
                          <span>
                            ₹{" "}
                            {loanDetails.loanAmount.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Interest Rate:</span>
                         <span>
  {selectedBanks.length > 1
    ? "Multiple rates (bank dependent)"
    : `${selectedRate}% (indicative)`}
</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={actionButtonsClass}>
                    <button
                      type="button"
                      className={primaryBtnClass}
                      onClick={handleDownloadApplication}
                    >
                      Download Application Copy
                    </button>
                    <button
                      type="button"
                      className={outlineBtnClass}
                      onClick={() => {
                        window.location.href = "/";
                      }}
                    >
                      Back to Home
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* INFO SECTION (desktop only) */}
{/* INFO SECTION – LOAN AGAINST PROPERTY */}
<section className="border-t border-slate-200 bg-white py-10">
  <div className="mx-auto max-w-6xl px-4 sm:px-6">
    <div className="space-y-10 text-sm sm:text-base text-[#390A5D]">

      {/* What is LAP */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-[#10662A] text-left sm:text-center">
          What Is a Loan Against Property (LAP)?
        </h2>
        <p className="leading-relaxed">
          A Loan Against Property (LAP) is a secured loan where you pledge your
          residential or commercial property as collateral to avail a
          high-value loan at comparatively lower interest rates. Banks and
          NBFCs assess your income stability, credit profile, existing
          liabilities and property value to determine eligibility, tenure and
          applicable interest rate.
        </p>
      </div>

      {/* LAP Product Options */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-[#10662A] text-left sm:text-center">
          Loan Against Property Options Available on Rupeedial
        </h2>
        <ul className="list-disc pl-5 space-y-3 leading-relaxed">
          <li>
            <strong>Fresh Loan Against Property:</strong> Ideal for business
            expansion, education, medical expenses or other large financial
            requirements using owned property.
          </li>
          <li>
            <strong>Loan Against Property Top-Up:</strong> Additional funding
            over and above your existing LAP based on repayment track record
            and property value.
          </li>
          <li>
            <strong>Balance Transfer of LAP:</strong> Transfer your existing
            LAP to another lender to reduce interest rate, EMI or improve loan
            terms.
          </li>
          <li>
            <strong>Balance Transfer with Cash-Out:</strong> Shift your LAP to
            a new bank/NBFC and receive extra funds over the outstanding loan
            amount.
          </li>
          <li>
            <strong>Overdraft / Dropline OD Against Property:</strong> Flexible
            credit facility where interest is charged only on the utilised
            amount.
          </li>
        </ul>
      </div>

      {/* Why Rupeedial */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-[#10662A] text-left sm:text-center">
          Why Apply for LAP Through Rupeedial?
        </h2>
        <ul className="list-disc pl-5 space-y-3 leading-relaxed">
          <li>
            <strong>Compare multiple lenders:</strong> Access offers from
            leading banks and NBFCs at one place.
          </li>
          <li>
            <strong>Lower interest & higher eligibility:</strong> Get LAP
            eligibility up to 70–75% of property value, subject to profile.
          </li>
          <li>
            <strong>Transparent comparison:</strong> View indicative EMIs,
            interest rates, APR and processing timelines upfront.
          </li>
          <li>
            <strong>End-to-end assistance:</strong> Dedicated Rupeedial experts
            assist you from eligibility check to disbursal.
          </li>
          <li>
            <strong>Digital & assisted journey:</strong> Upload documents
            online with optional doorstep support.
          </li>
        </ul>
      </div>

      {/* Documents */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-[#10662A] text-left sm:text-center">
          Indicative Documents Required for LAP
        </h2>
        <ul className="list-disc pl-5 space-y-3 leading-relaxed">
          <li>PAN & Aadhaar of applicant(s)</li>
          <li>Income proof – salary slips / ITR / financials</li>
          <li>Last 6–12 months bank statements</li>
          <li>
            Property documents – sale deed, registry, tax receipt or allotment
            letter
          </li>
          <li>
            Existing loan documents (for balance transfer / top-up cases)
          </li>
        </ul>
      </div>

    </div>
  </div>
</section>

<section className="mt-10 bg-[#F5FFF8] py-6">
  <div className="max-w-6xl mx-auto px-4">

    <h2 className="text-xl font-bold text-[#10662A] text-center mb-4">
      Loan Against Property – FAQs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          What is Loan Against Property (LAP)?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          LAP is a secured loan where you pledge your residential or commercial
          property to get higher loan amount at lower interest rates.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          How much loan can I get against my property?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          You can get up to 50–70% of your property’s market value depending on
          eligibility and lender policy.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          Can LAP be used for business or personal needs?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Yes. LAP can be used for business expansion, education, medical or
          other personal requirements.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          Is property possession retained by the owner?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Yes. You continue to use the property while repaying the loan.
        </p>
      </details>

    </div>
  </div>
</section>

      </main>
    </div>
  );
};

export default LapLoanPage;

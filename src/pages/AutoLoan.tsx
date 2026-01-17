import React, { useMemo, useState, useEffect } from "react";
import {
  Car,
  ClipboardCheck,
  CreditCard,
  CheckCheck,
  Calculator,
  ArrowRight,
 

} from "lucide-react";
import AutoLoan from "../assets/images/auto-loan.png";

type Step = 1 | 2 | 3 | 4;

interface Step1Form {
  fullName: string;
  email: string;
  mobile: string;

  carPrice: string;
  carBrand: string;
  carSegment: string;
  carType: string;

  loanAmount: string;
  city: string;
  employmentType: string;
  formMonthlyIncome: string;
  existingEmi: string;
  companyType: string;
  workExperience: string;

  aadhaar: string;
  pan: string;
  agreePrivacy: boolean;
}

interface LoanDetails {
  fullName: string;
  email: string;
  mobile: string;

  carPrice: number;
  carBrand: string;
  carSegment: string;
  carType: string;

  loanAmount: number;
  city: string;
  employmentType: string;
  formMonthlyIncome: number;
  existingEmi: number;
  companyType: string;
  workExperience: string;

  aadhaar?: string;
  pan?: string;
  purpose?: string;
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
  
  {
    id: "hdfc",
    bankName: "HDFC Bank",
    code: "H",
    processingTime: "5 – 7 Days",
    interestRate: 8.75,
    emi: 8000,
    apr: 9.2,
  },
  {
    id: "sbi",
    bankName: "State Bank of India",
    code: "S",
    processingTime: "7 – 10 Days",
    interestRate: 8.6,
    emi: 7900,
    apr: 9.0,
  },
  {
    id: "icici",
    bankName: "ICICI Bank",
    code: "I",
    processingTime: "5 – 7 Days",
    interestRate: 8.9,
    emi: 8050,
    apr: 9.3,
  },
  {
    id: "axis",
    bankName: "Axis Bank",
    code: "A",
    processingTime: "6 – 8 Days",
    interestRate: 9.0,
    emi: 8100,
    apr: 9.4,
  },
  {
    id: "lic",
    bankName: "LIC Housing Finance",
    code: "L",
    processingTime: "7 – 10 Days",
    interestRate: 8.5,
    emi: 7850,
    apr: 8.9,
  },
];

const CAR_BRANDS: Record<string, string[]> = {
  "Maruti Suzuki": ["Swift", "Baleno", "WagonR", "Vitara Brezza"],
  "Hyundai": ["i10", "i20", "Creta", "Venue"],
  "Honda": ["City", "Amaze", "Jazz"],
  "Toyota": ["Fortuner", "Innova", "Camry"],
  "Mahindra": ["Scorpio", "Bolero", "Thar"],
  "Tata": ["Nexon", "Harrier", "Safari"],
  "Kia": ["Seltos", "Sonet", "Carnival"],
  "Ford": ["EcoSport", "Endeavour"],
  "Volkswagen": ["Polo", "Vento"],
  "Renault": ["Kwid", "Triber", "Duster"],
};



interface BackendResponse {
  success: boolean;
  message?: string;
  leadId?: string;
}

const CAR_RULES = {
  new: {
    ltv: 0.85,
    rate: 9.0,
  },
  "used-lt3": {
    ltv: 0.75,
    rate: 10.5,
  },
  "used-3-7": {
    ltv: 0.65,
    rate: 12.0,
  },
} as const;

const AutoLoanPage: React.FC = () => {
  const [sortBy, setSortBy] = useState<"interest" | "emi" | "processing">("interest");
const [interestFilter, setInterestFilter] = useState<string[]>([]);
const [processingFilter, setProcessingFilter] = useState<string[]>([]);
const [submitting, setSubmitting] = useState(false);



const actionButtonsClass = "mt-6 flex flex-wrap gap-3 justify-between";
const backBtnClass =
  "rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold";
const successBtnClass =
  "rounded-lg bg-[#10662A] px-5 py-2 text-sm font-semibold text-white";
const warningBtnClass =
  "rounded-lg bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700";

  const [step, setStep] = useState<Step>(1);
  const [agreeAppTerms, setAgreeAppTerms] = useState(false);


  
  
  const [loadingEligibility, setLoadingEligibility] = useState(false);

  const [form, setForm] = useState<Step1Form>({
    
    fullName: "",
    email: "",
    mobile: "",
    carPrice: "",
    carBrand: "",
    carSegment: "",
    carType: "",
    loanAmount: "",
    city: "",
    employmentType: "",
    formMonthlyIncome: "",
    existingEmi: "0",
    companyType: "",
    workExperience: "",
    aadhaar: "",
    pan: "",
    agreePrivacy: false,
  });



  const [errors, setErrors] = useState<Record<string, string>>({});


  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
  const [selectedBanks, setSelectedBanks] = useState<Offer[]>([]);
  const primaryBank = selectedBanks[0] || null;
  const canProceed = selectedBanks.length > 0;
  // const selectedBank = primaryBank?.bankName || "—";
  // const selectedEmi = primaryBank?.emi ?? 0;

  // const canProceedFromStep2 = selectedBanks.length > 0;



  
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

  const selectedRate = primaryBank?.interestRate ?? 0;
  
const maxLoan = useMemo(() => {
  const price = Number(form.carPrice || 0);
  const rule = CAR_RULES[form.carType as keyof typeof CAR_RULES];

  if (!price || !rule) return 0;
  return Math.floor(price * rule.ltv);
}, [form.carPrice, form.carType]);



  const filteredOffers = useMemo(() => {
  let list = [...offers];

  if (interestFilter.length) {
    list = list.filter((o) => {
      if (interestFilter.includes("upto11")) return o.interestRate <= 11;
      if (interestFilter.includes("11to13"))
        return o.interestRate > 11 && o.interestRate <= 13;
      if (interestFilter.includes("above13")) return o.interestRate > 13;
      return true;
    });
  }

  if (processingFilter.length) {
    list = list.filter((o) => {
      if (processingFilter.includes("instant"))
        return o.processingTime.toLowerCase().includes("instant");
      if (processingFilter.includes("1to2"))
        return o.processingTime.includes("1");
      if (processingFilter.includes("3to7"))
        return o.processingTime.includes("3");
      return true;
    });
  }

  if (sortBy === "interest") list.sort((a, b) => a.interestRate - b.interestRate);
  if (sortBy === "emi") list.sort((a, b) => a.emi - b.emi);
  if (sortBy === "processing")
    list.sort((a, b) => a.processingTime.localeCompare(b.processingTime));

  return list;
}, [interestFilter, processingFilter, sortBy]);

const adjustedOffers = useMemo(() => {
  const rule = CAR_RULES[form.carType as keyof typeof CAR_RULES];
  if (!rule || !loanDetails) return filteredOffers;

  return filteredOffers.map((o) => {
    const finalRate = o.interestRate + (rule.rate - 9);

    const r = finalRate / 12 / 100;
    const n = 60; // 5 years
    const loan = loanDetails.loanAmount;

    const emi = Math.round(
      (loan * r * Math.pow(1 + r, n)) /
        (Math.pow(1 + r, n) - 1)
    );

    return {
      ...o,
      interestRate: Number(finalRate.toFixed(2)),
      emi,
    };
  });
}, [filteredOffers, form.carType, loanDetails]);




useEffect(() => {
  if (maxLoan >= 200000) {
    const validAmounts = [
      200000,
      300000,
      500000,
      700000,
      1000000,
      1500000,
      2000000,
      2500000,
      3000000,
    ].filter((amt) => amt <= maxLoan);

    setForm((prev) => ({
      ...prev,
      loanAmount: String(validAmounts[0] || ""),
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      loanAmount: "",
    }));
  }
}, [maxLoan]);



const goToPrevStep = () => {
  if (step > 1) setStep((step - 1) as Step);
};
const goToNextStep = () => {
  if (step === 2 && selectedBanks.length === 0) {
    alert("Please select a bank offer to continue");
    return;
  }
  if (step === 3 && !loanDetails) {
  alert("Missing loan details. Please start again.");
  setStep(1);
  return;
}

  if (step < 4) setStep((step + 1) as Step);
};

 

const handleSelectOffer = (offer: Offer) => {
  setSelectedBanks((prev) => {
    const exists = prev.find((b) => b.id === offer.id);

    // agar already selected → remove
    if (exists) {
      return prev.filter((b) => b.id !== offer.id);
    }

    // warna add
    return [...prev, offer];
  });
};

 
 // ---------- UI helper classes ----------
const inputClass =
  "mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]";

const selectClass =
  "relative z-50 mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]";


  // ---------- Handlers ----------
const handleInputChange = (
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
) => {
  const target = e.target;
  const name = target.name;
  const value = target.value;

  // Car price validation
  if (name === "carPrice") {
    const price = Number(value);
    setErrors((prev) => ({
      ...prev,
      carPrice:
        price < 200000 ? "Minimum car price must be ₹2,00,000" : "",
    }));
  }

  // Checkbox
  if (target instanceof HTMLInputElement && target.type === "checkbox") {
    setForm((prev) => ({ ...prev, agreePrivacy: target.checked }));
    return;
  }

  // Aadhaar
  if (name === "aadhaar") {
    setForm((prev) => ({
      ...prev,
      aadhaar: value.replace(/\D/g, "").slice(0, 12),
    }));
    return;
  }

  // PAN
  if (name === "pan") {
    setForm((prev) => ({
      ...prev,
      pan: value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10),
    }));
    return;
  }

  setForm((prev) => ({ ...prev, [name]: value }));
  setErrors((prev) => ({ ...prev, [name]: "" }));
};


  const validateStep1 = (): boolean => {
    const newErrors: Record<string, string> = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/i;
    const aadhaarRegex = /^\d{12}$/;

    if (!form.carPrice || Number(form.carPrice) < 200000) {
      newErrors.carPrice = "Minimum car price must be ₹2,00,000";
    }

    if (!form.carBrand) newErrors.carBrand = "Please select car brand";
    if (!form.carSegment) newErrors.carSegment = "Please select car model";
    if (!form.carType) newErrors.carType = "Please select car type";

    if (!form.fullName.trim())
      newErrors.fullName = "Please enter your full name";

    if (!form.email.trim() || !emailRegex.test(form.email))
      newErrors.email = "Please enter a valid email address";

    if (!form.mobile.trim() || form.mobile.length !== 10)
      newErrors.mobile = "Please enter a valid 10-digit mobile number";

    const loanAmountNum = Number(form.loanAmount || 0);
    if (!form.loanAmount || loanAmountNum <= 0)
      newErrors.loanAmount = "Please enter required loan amount";

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

  const handleCheckEligibility = (e?: React.FormEvent) => {
  e?.preventDefault();

    const isValid = validateStep1();
    const loanAmountNum = Number(form.loanAmount || 0);

    if (!isValid) {
      const amount = loanAmountNum;
      if (amount > maxLoan && maxLoan > 0) {
        alert(
          `Based on your entered car value, your approximate car loan eligibility is ₹${maxLoan.toLocaleString("en-IN")}.
\n\nYou have entered a higher loan amount of ₹${amount.toLocaleString(
            "en-IN"
          )}.\n\nPlease reduce the loan amount within your indicative eligibility and try again.`
        );
      } else {
        alert("Please fill all required fields correctly.");
      }
      return;
    }

    const details: LoanDetails = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
      carPrice: Number(form.carPrice),
      carBrand: form.carBrand,
      carSegment: form.carSegment,
      carType: form.carType,
      loanAmount: Number(form.loanAmount),
      city: form.city,
      employmentType: form.employmentType,
      formMonthlyIncome: Number(form.formMonthlyIncome),
      existingEmi: Number(form.existingEmi),
      companyType: form.companyType,
      workExperience: form.workExperience,
      aadhaar: form.aadhaar || undefined,
      pan: form.pan || undefined,
      purpose: "Car Purchase",
    };

  setLoanDetails(details);

// STEP 2 PE JAO
setStep(2);

// STEP-2 INTERNAL STATE RESET
setLoadingEligibility(true);


// FAKE API DELAY
setTimeout(() => {
  setLoadingEligibility(false);
 
}, 1500);

};


 




  // generate a client-side lead id: RF-PL-YYYYMMDD-XXXXXX
  const generateClientLeadId = (): string => {
    const now = new Date();
    const y = now.getFullYear().toString();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(100000 + Math.random() * 900000);
    return `RF-CAR-${y}${m}${d}-${rand}`;
  };

  const handleSubmitApplication = async (): Promise<void> => {
 setSubmitting(true);
if (!agreeAppTerms) {
  alert("Please accept Terms & Conditions");
  return;
}


    if (!loanDetails) {
      alert("Missing loan details.");
      return;
    }

   

    try {
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
  "https://rupeedial.com/rupeedial-backend/public/index.php?action=auto-loan/apply",
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
const CITY_LIST = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

const updateLoanDetails = (
  key: keyof LoanDetails,
  value: LoanDetails[keyof LoanDetails]
) => {

  setLoanDetails((prev) =>
    prev ? { ...prev, [key]: value } : prev
  );
};

const maskPan = (pan?: string) => {
  if (!pan) return "—";
  return pan.slice(0, 2) + "XXXX" + pan.slice(-2);
};

const maskAadhaar = (aadhaar?: string) => {
  if (!aadhaar) return "—";
  return "XXXX XXXX " + aadhaar.slice(-4);
};

  const handleFileChange = (
    
    e: React.ChangeEvent<HTMLInputElement>,
    key: "kyc" | "incomeProof" | "bankStatement" | "other"
  ) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setUploaded((prev) => ({ ...prev, [key]: files }));
  };





  const handleDownloadApplication = () => {
    if (!loanDetails) {
      alert("Application details not available.");
      return;
    }

    const content = `
🟢 Rupeedial - Car Loan Application  
────────────────────────────────────────────

📌 Application Details
• Application ID: ${leadId || "-"}
• Bank: ${primaryBank ? primaryBank.bankName : "—"}

• Loan Amount: ₹ ${loanDetails.loanAmount.toLocaleString("en-IN")}
• Interest Rate: ${selectedRate}% p.a
Tenure: As per bank policy (12–84 months)
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
  const stepClass = (s: Step) =>
  step === s
    ? "border-[#10662A] text-[#10662A]"
    : "border-slate-300 text-slate-400";

const stepIconColor = (s: Step) =>
  step === s ? "text-[#10662A]" : "text-slate-400";
const progress = (step / 4) * 100;
  // ---------- JSX ----------
  return (
    <div className="w-full">
      {/* HERO SECTION – PERSONAL LOAN */}
      <section className="w-full bg-[#F5FFF8] border-b border-emerald-50 pb-6">
        <div className="mx-auto flex max-w-6xl flex-col md:py-6 items-center gap-10 px-4 md:flex-row">
          {/* LEFT */}
          <div className="flex-1 min-w-[260px]">
            <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#10662A] shadow-sm border border-[#d8efe6]">
              Car Loan
            </div>

            <h1 className="mb-2 text-3xl md:text-4xl font-extrabold text-[#10662A]">
              Car Loan –{" "}
              <span className="text-[#390A5D]">Get Your
Dream Car Easily
</span>
            </h1>
            <h2 className="text-base md:text-lg font-semibold text-[#10662A] mb-3">
             Finance for new & used cars from top Banks & NBFCs.
            </h2>
            <p className="text-sm md:text-base text-[#390A5D] mb-5 leading-relaxed">
           Simple online form, instant eligibility check and multiple bank offers. Compare interest rates, EMI aur choose karein best car loan option ek hi jagah par.
</p>
            <div className="flex flex-wrap gap-3">
             <button
  type="button"
  onClick={() => {
    document
      .getElementById("car-wizard")
      ?.scrollIntoView({ behavior: "smooth" });
  }}
  className="inline-flex items-center justify-center rounded-lg bg-[#10662A] px-5 py-3 text-sm font-semibold text-white"
>
Check Auto Loan Eligibility
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
              <img
                src={AutoLoan}
                alt="Home Loan Illustration"
                className="w-[260px] sm:w-[300px] md:w-[340px] h-auto rounded-xl object-contain"
              />
            </div>
          </div>
        </div>
      </section>
 
      {/* MAIN CONTENT */}
      <main className="bg-white">
        {/* WIZARD SECTION */}
  <section id="car-wizard" className="pb-12">
<div className="mx-auto max-w-6xl px-4">
          {/* Step indicators */}
        <div className="w-full rounded-2xl bg-white shadow-md border border-[#d8efe6] p-4 md:p-6 space-y-6">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div
                className={`w-40 max-w-full h-12 rounded-lg flex items-center justify-center md:text-xs font-semibold border text-center px-2 ${stepClass(
                  1
                )}`}
              >
                <Car className={`w-5 h-5 mr-2 ${stepIconColor(1)}`} />
                <span>Car &amp; Loan Details</span>
              </div>
              <div
                className={`w-40 max-w-full h-12 rounded-lg flex items-center justify-center md:text-xs font-semibold border text-center px-2 ${stepClass(
                  2
                )}`}
              >
                <ClipboardCheck className={`w-5 h-5 mr-2 ${stepIconColor(2)}`} />
                <span>Check Eligibility</span>
              </div>
              <div
                className={`w-40 max-w-full h-12 rounded-lg flex items-center justify-center md:text-xs font-semibold border text-center px-2 ${stepClass(
                  3
                )}`}
              >
                <CreditCard className={`w-5 h-5 mr-2 ${stepIconColor(3)}`} />
                <span>Choose Best Offer</span>
              </div>
              <div
                className={`w-40 max-w-full h-12 rounded-lg flex items-center justify-center md:text-xs font-semibold border text-center px-2 ${stepClass(
                  4
                )}`}
              >
                <CheckCheck className={`w-5 h-5 mr-2 ${stepIconColor(4)}`} />
                <span>Final Disbursal</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-2 w-full rounded-full bg-[#d8efe6] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#10662A] transition-all"
                style={{width: `${progress}%`}}
              />
            </div>
          </div>

          {/* ========= STEP 1 ========= */}
          

 {step === 1 && (
  <form onSubmit={handleCheckEligibility}>
    <div className="flex justify-center">
      <div className="w-full max-w-4xl rounded-2xl bg-white shadow-md border p-6 space-y-6">


              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-[#e4f6ea] flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-[#10662A]" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#390A5D]">
                    Enter Car &amp; Loan Details
                  </h2>
                  <p className="text-xs md:text-sm text-[#390A5D] opacity-80">
                    Fill basic details about your car and income to check instant
                    eligibility.
                  </p>
                </div>
              </div>

              {/* Loan estimator */}
              <div className="rounded-xl bg-gradient-to-r from-[#F5FFF8] via-[#F5FFF8] to-white border border-[#d8efe6] p-4 md:p-5 space-y-4 pointer-events-auto">

                <div className="flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-[#10662A]" />
                  <h3 className="font-semibold text-[#390A5D] text-sm md:text-base">
                    Car Loan Estimator
                  </h3>
                </div>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                  
 <div>
  <label className="block text-xs font-medium text-[#390A5D] mb-1">
    Car Type *
  </label>
  <select
    name="carType"
    value={form.carType}
    onChange={handleInputChange}
    className={selectClass}
  >
    <option value="">Select Car Type</option>
    <option value="new">New Car</option>
    <option value="used-lt3">Used Car (less than 3 years)</option>
    <option value="used-3-7">Used Car (3–7 years)</option>
  </select>

  {errors.carType && (
    <p className="text-xs text-red-500 mt-0.5">
      {errors.carType}
    </p>
  )}
</div>
<div>
    <label className="block text-xs font-medium text-[#390A5D] mb-1">
      Car Brand *
    </label>
    <select
      value={form.carBrand}
      onChange={(e) =>
        setForm((p) => ({
          ...p,
          carBrand: e.target.value,
          carSegment: ""
        }))
      }
      className={selectClass}
    >
      <option value="">Select Brand</option>
      {Object.keys(CAR_BRANDS).map((brand) => (
        <option key={brand} value={brand}>
          {brand}
        </option>
      ))}
    </select>
  </div>
   <div>
     <label className="block text-xs font-medium text-[#390A5D] mb-1">
      Car Model / Variant *
    </label>
   <select
  name="carSegment"
  value={form.carSegment}
  onChange={handleInputChange}
  className={selectClass}

>

  <option value="">Select Variant</option>
  {form.carBrand &&
    CAR_BRANDS[form.carBrand]?.map((model) => (
      <option key={model} value={model}>
        {model}
      </option>
    ))}
</select>

  </div>
  {/* Car Price */}
                  <div className="space-y-1">
  <label className="block text-xs font-medium text-[#390A5D]">
    Car On-Road Price (₹) *
  </label>

  <input
    type="number"
    name="carPrice"
    value={form.carPrice}
    onChange={handleInputChange}
    className={inputClass}
    placeholder="Enter car on-road price"
  />

  {errors.carPrice && (
    <p className="text-xs text-red-500 mt-0.5">
      {errors.carPrice}
    </p>
  )}

  <p className="text-[11px] text-[#390A5D] opacity-80">
    Minimum recommended car price: ₹ 2,00,000
  </p>
</div>
                  {/* LTV */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#390A5D]">
                      Eligible Loan % of Car Value
                    </label>
                    <input
  type="number"
  value={
    form.carType
      ? CAR_RULES[form.carType as keyof typeof CAR_RULES].ltv * 100
      : ""
  }
  readOnly
  className="block w-full rounded-lg border border-slate-200 bg-[#F5FFF8] px-3 py-2 text-sm text-[#390A5D]"
/>

                    <p className="text-[11px] text-[#390A5D] opacity-80">
                       Based on selected car type
                    </p>
                  </div>

                  {/* Max Loan */}
                  <div className="space-y-1">
                    <label className="block text-xs font-medium text-[#390A5D]">
                      Approx. Eligible Car Loan
                    </label>
                    <input
                      type="text"
                      readOnly
                      value={
                        maxLoan
                          ? `₹ ${maxLoan.toLocaleString("en-IN")}`
                          : ""
                      }
                      className="block w-full rounded-lg border border-[#9ac7ae] bg-[#F5FFF8] px-3 py-2 text-sm font-semibold text-[#10662A]"
                    />
                    <p className="text-[11px] text-[#390A5D] opacity-80">
                      Actual eligibility will depend on your profile.
                    </p>
                  </div>
                </div>
              </div>

              {/* MAIN FORM */}
             {/* Row 1 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#390A5D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {errors.fullName}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#390A5D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      className={inputClass}
                      placeholder="Enter your email"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#390A5D] mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      name="mobile"
                      value={form.mobile}
                      onChange={handleInputChange}
                      className={inputClass}                      placeholder="Enter 10-digit mobile number"
                    />
                    {errors.mobile && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {errors.mobile}
                      </p>
                    )}
                  </div>
                  <div>
                   
             
<div>
  <label className="block text-xs font-medium text-[#390A5D] mb-1">
    Car Loan Amount Required *
  </label>

  <input
    type="number"
    name="loanAmount"
    value={form.loanAmount}
    onChange={(e) => {
      const value = e.target.value;
      const num = Number(value);

      // allow empty
      if (!value) {
        setForm((p) => ({ ...p, loanAmount: "" }));
        return;
      }

      // block negative
      if (num < 0) return;

      setForm((p) => ({ ...p, loanAmount: value }));

      // validation
      if (num > maxLoan) {
        setErrors((p) => ({
          ...p,
          loanAmount: `Maximum eligible loan is ₹ ${maxLoan.toLocaleString(
            "en-IN"
          )}`,
        }));
      } else {
        setErrors((p) => ({ ...p, loanAmount: "" }));
      }
    }}
    className={inputClass}
    placeholder={`Up to ₹ ${maxLoan.toLocaleString("en-IN")}`}
  />

  {errors.loanAmount && (
    <p className="text-xs text-red-500 mt-0.5">
      {errors.loanAmount}
    </p>
  )}

  <p className="text-[11px] text-[#390A5D] opacity-80">
    Eligible up to ₹ {maxLoan.toLocaleString("en-IN")} based on car value
  </p>
</div>



                    {errors.loanAmount && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {errors.loanAmount}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 3 */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#390A5D] mb-1">
                      City *
                    </label>
                    <select
                     value={form.city}
                       name="city"
                      onChange={handleInputChange}
                      className={selectClass}
                    >
                      <option value="">Select City</option>
                      {[
                        "Delhi",
                        "Mumbai",
                        "Bengaluru",
                        "Chennai",
                        "Hyderabad",
                        "Pune",
                        "Kolkata",
                        "Ahmedabad",
                      ].map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                    {errors.city && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {errors.city}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#390A5D] mb-1">
                      Employment Type *
                    </label>
                    <select
                      name="employmentType"
                      value={form.employmentType}
                      onChange={handleInputChange}
                      className={selectClass}                    >
                      <option value="">Select Employment Type</option>
                      <option value="salaried">Salaried</option>
                      <option value="self-employed">Self-Employed</option>
                      <option value="self-employed-professional">
                        Self Employed Professional
                      </option>
                      <option value="government">Government Employee</option>
                    </select>
                    {errors.employmentType && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {errors.employmentType}
                      </p>
                    )}
                  </div>
                </div>

                {/* Row 4 */}
<div className="grid md:grid-cols-2 gap-4">
  {/* Monthly Income */}
  <div>
    <label className="block text-xs font-medium text-[#390A5D] mb-1">
      Monthly Net Salary / Income (₹) *
    </label>
    <input
      type="number"
      name="formMonthlyIncome"
      value={form.formMonthlyIncome}
      onChange={handleInputChange}
      className={inputClass}
      placeholder="Enter monthly income"
    />
    {errors.formMonthlyIncome && (
      <p className="text-xs text-red-500">{errors.formMonthlyIncome}</p>
    )}
  </div>

  {/* Existing EMI */}
  <div>
    <label className="block text-xs font-medium text-[#390A5D] mb-1">
      Total Existing EMIs (₹)
    </label>
    <input
      type="number"
      name="existingEmi"
      value={form.existingEmi}
      onChange={handleInputChange}
      className={inputClass}
      placeholder="0 if none"
    />
  </div>
</div>

               {/* Row 5 */}
<div className="grid md:grid-cols-2 gap-4">
  <div>
    <label className="block text-xs font-medium text-[#390A5D] mb-1">
      Company Type *
    </label>
    <select
      name="companyType"
      value={form.companyType}
      onChange={handleInputChange}
      className={selectClass}
    >
      <option value="">Select Company Type</option>
      <option value="private">Private Ltd</option>
      <option value="public">Public Ltd</option>
      <option value="government">Government</option>
      <option value="msme">MSME</option>
      <option value="proprietor">Proprietorship</option>
    </select>

    {errors.companyType && (
      <p className="text-xs text-red-500 mt-0.5">
        {errors.companyType}
      </p>
    )}
  </div>

  <div>
    <label className="block text-xs font-medium text-[#390A5D] mb-1">
      Total Work Experience *
    </label>
    <select
      name="workExperience"
      value={form.workExperience}
      onChange={handleInputChange}
      className={selectClass}
    >
      <option value="">Select Experience</option>
      <option value="0-1">Less than 1 year</option>
      <option value="1-3">1 – 3 years</option>
      <option value="3-5">3 – 5 years</option>
      <option value="5+">More than 5 years</option>
    </select>

    {errors.workExperience && (
      <p className="text-xs text-red-500 mt-0.5">
        {errors.workExperience}
      </p>
    )}
  </div>
</div>
 
{/* Row 6 – Aadhaar & PAN */}
<div className="grid md:grid-cols-2 gap-4">
  {/* Aadhaar */}
  <div>
    <label className="block text-xs font-medium text-[#390A5D] mb-1">
      Aadhaar Number
    </label>
    <input
      type="text"
      name="aadhaar"
      value={form.aadhaar}
      onChange={handleInputChange}
      className={inputClass}
      placeholder="12-digit Aadhaar number"
      maxLength={12}
    />
    {errors.aadhaar && (
      <p className="text-xs text-red-500">{errors.aadhaar}</p>
    )}
  </div>

  {/* PAN */}
  <div>
    <label className="block text-xs font-medium text-[#390A5D] mb-1">
      PAN Number
    </label>
    <input
      type="text"
      name="pan"
      value={form.pan}
      onChange={handleInputChange}
      className={inputClass}
      placeholder="ABCDE1234F"
      maxLength={10}
    />
    {errors.pan && (
      <p className="text-xs text-red-500">{errors.pan}</p>
    )}
  </div>
</div>

        

                {/* Privacy */}
                <div className="flex items-start gap-2 text-xs md:text-sm text-[#390A5D]">
                <input
  id="privacyPolicy"
  name="agreePrivacy"
  type="checkbox"
  checked={form.agreePrivacy}
  onChange={handleInputChange}
/>

                  <div>
                    <label htmlFor="privacyPolicy" className="font-medium">
                      I authorize Rupeedial to call or SMS or email me. I have
                      accepted the terms of the{" "}
                      <a href="#" className="text-[#10662A] underline">
                        privacy policy
                      </a>
                      .
                    </label>
                    {errors.agreePrivacy && (
                      <p className="text-xs text-red-500 mt-0.5">
                        {errors.agreePrivacy}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex justify-center pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#10662A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
                  >
                    <ArrowRight className="w-4 h-4" />
                    Check Car Loan Eligibility
                 </button>
      </div>

    
    </div>
    </div>
</form>
)}
  
         {/* STEP 2 – COMPARE OFFERS */}
            
            {step === 2 && loanDetails && (

              <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
             

                <div className="mb-4 border-b border-slate-100 pb-4">
                  <h2 className="flex items-center gap-2 text-base font-semibold text-[#390A5D] md:text-lg">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#10662A]/10 text-[#10662A] text-xs font-bold">
                      2
                    </span>
                    Compare Car Loan Offers from Top Banks
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
  Based on your car value, profile and selected banks, these offers are suitable for you.
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
                  <div className="grid gap-4 md:grid-cols-[260px,minmax(0,1fr)]">
                    {/* FILTERS */}
                    <aside className="rounded-2xl border border-slate-200 bg-white p-4 text-xs text-slate-800 shadow-sm">
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
                     {adjustedOffers.map((offer) => {

  const isSelected = selectedBanks.some((b) => b.id === offer.id);

  return (
    <article
      key={offer.id}
      className={`flex items-center justify-between gap-4 rounded-xl border bg-white px-5 py-4 shadow-sm transition
        ${
          isSelected
            ? "border-[#10662A]"
            : "border-slate-200 hover:border-[#10662A]"
        }`}
    >
      {/* LEFT – BANK INFO */}
      <div className="flex items-center gap-4 w-[30%]">
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
      <div className="w-[15%]">
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
      <div className="w-[15%]">
        <div className="text-[11px] text-slate-500">
  Indicative EMI (5 yrs)
</div>


        <div className="font-semibold text-[#10662A]">
          ₹ {offer.emi.toLocaleString("en-IN")}
        </div>
        
      </div>

      {/* ACTION */}
      <div className="w-[15%] text-right">
       <button
  type="button"
  onClick={() => handleSelectOffer(offer)}
  className={`rounded-full px-5 py-2 text-xs font-semibold text-white transition
    ${
      isSelected
        ? "bg-[#10662A]"
        : "bg-slate-400 hover:bg-[#10662A]"
    }`}
>
  {isSelected ? "Selected ✓" : "Select"}
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
                          onClick={goToPrevStep}
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
                          onClick={goToNextStep}
                          disabled={!canProceed}
                        >
                          Proceed to Apply
                        </button>
                      </div>
                    </div>
                  </div>
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
                    Complete Your Car Loan Application
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
  className={inputClass}
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
  className={inputClass}
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
  className={inputClass}
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
  className={inputClass}
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
  className={inputClass}
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
  className={selectClass}
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
               
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Company Type
                    </label>
                    <input
                      type="text"
                      className={`${inputClass} bg-slate-100`}
                      value={loanDetails.companyType}
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      City
                    </label>
                    <select
  className={selectClass}
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
  

  
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      PAN (masked)
                    </label>
                    <input
                      type="text"
                      className={`${inputClass} bg-slate-100`}
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
                      className={`${inputClass} bg-slate-100`}
                      value={maskAadhaar(loanDetails.aadhaar)}
                      readOnly
                    />
                  </div>
                </div>

              <div className="mt-6">
  <h3 className="mb-3 text-sm font-semibold text-[#390A5D]">
    Document Upload
  </h3>

  <div className="grid gap-4 md:grid-cols-4">

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
      Sale agreement / Allotment letter / Property papers (PDF)
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

                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-slate-700">
                      Loan Purpose
                    </label>
                    <input
                      type="text"
                      className={`${inputClass} bg-slate-100`}
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
                    onClick={goToPrevStep}
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
                      : "Submit Car Loan Application"}
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
                    Car Loan Application Submitted Successfully
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
    Your application for{" "}
   <span className="font-semibold text-emerald-700">
  Car Loan
</span>
{" "}
    has been shared securely with
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
<div className="mt-4 flex justify-center gap-3">
  <button
    type="button"
    onClick={handleDownloadApplication}
    className="rounded-lg bg-[#10662A] px-5 py-2 text-sm font-semibold text-white shadow hover:bg-[#0e5523]"
  >
    ⬇ Download Application
  </button>

  <a
    href="/"
    className="rounded-lg border border-[#10662A] px-5 py-2 text-sm font-semibold text-[#10662A] hover:bg-[#F5FFF8]"
  >
    Go to Home
  </a>
</div>

              </div>
              </div>
            )}
</div></section>
        </main>
        <section className="hidden border-t border-slate-200 bg-white py-10 md:block">
          <div className="mx-auto max-w-6xl px-4">
            <div className="space-y-6 text-sm text-slate-700">
              <div>
                <h2 className="mb-2 text-center text-lg font-semibold text-[#10662A]">
                  What Is a Car Loan?
                </h2>
                <p className="leading-relaxed text-[#390A5D]">
A car loan is a secured financing option in which the vehicle you purchase serves as collateral. Banks and NBFCs assess factors such as your income, credit score, employment profile, and vehicle details to decide your loan eligibility, applicable interest rate, and repayment tenure.


                </p>
              </div>

              <div>
    <h2 className="mb-2 text-center text-lg font-semibold text-[#10662A]">
  Available Car Loan Options
</h2>
<ul className="list-disc space-y-1 pl-5 text-[#390A5D]">
  <li>New car loans for purchasing brand-new vehicles</li>
  <li>Used car loans for pre-owned vehicles up to 7 years old</li>
  <li>Top-up loans on existing car loan accounts</li>
  <li>Balance transfer facility to lower your interest rate</li>
  <li>Special car loans for electric vehicles (EVs)</li>
</ul>

              </div>

              <div>
                <h2 className="mb-2 text-center text-lg font-semibold text-[#10662A]">
  Why Choose Rupeedial for Your Car Loan?
</h2>
<ul className="list-disc space-y-1 pl-5 text-[#390A5D]">
  <li>
    <strong>Compare multiple lenders:</strong> Easily compare interest rates,
    EMIs, charges and processing timelines from top banks and NBFCs in one
    place.
  </li>
  <li>
    <strong>End-to-end digital journey:</strong> Check eligibility, upload
    documents and track your application seamlessly through a mostly online
    process.
  </li>
  <li>
    <strong>Better approval chances:</strong> Offers are personalised based on
    your income, credit score and location, helping you get quicker approvals.
  </li>
  <li>
    <strong>Transparent pricing:</strong> View interest rates, APR, tenure and
    applicable charges upfront with complete clarity and no hidden fees.
  </li>
  <li>
    <strong>Expert support at every step:</strong> Our loan experts assist you
    throughout the journey, from documentation and balance transfer to top-up
    and post-disbursal support.
  </li>
</ul>

              </div>

              <div>
              <h2 className="mb-2 text-center text-lg font-semibold text-[#10662A]">
  Documents You May Need
</h2>
<ul className="list-disc space-y-1 pl-5 text-[#390A5D]">
  <li>Applicant KYC documents such as PAN card and Aadhaar</li>
  <li>Latest 3–6 months salary slips or valid income proof</li>
  <li>Bank account statements for the last 6–12 months</li>
  <li>
    Address proof including utility bill, rent agreement, passport or Aadhaar
  </li>
  <li>
    Form 16, ITR or GST returns, depending on lender and product requirements
  </li>
  <li>
    For balance transfer or cash-out cases: existing loan sanction letter,
    repayment track record and foreclosure statement
  </li>
</ul>


              </div>
            </div>
          </div>
        </section>
      </div>
    );
};

export default AutoLoanPage;

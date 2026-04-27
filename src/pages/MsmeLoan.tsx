// src/pages/Msme.tsx
import React, { useState, useMemo, useEffect } from "react";
import msmeLoan from "../assets/images/msme-loan.png";

type Step = 1 | 2 | 3 | 4;
interface LoanDetails {
  fullName: string;
  email: string;
  mobile: string;
  loanAmount: number;
  businessType: string;
  city: string;
  existingEmi: number;
  purpose: string;
  pan?: string;
  aadhaar?: string;
  employmentType?: string; 
}


interface MsmeForm {
  fullName: string;
  email: string;
  mobile: string;
  annualTurnover: number | "";
  monthlyTurnover: number | "";
  loanAmount: number | "";
  location: string;
  businessType: string;
  constitution: string;
  vintage: string;
  acceptPrivacy: boolean;
  existingEmi: number | "";

  pan: string;        
  aadhaar: string;  
    employmentType: string;   
}

interface Offer {
  id: string;
  bankName: string;
  interestRate: number;
  emi: number;
  tenure: string;
  processingFee: string;

  // 👇 UI ke liye required (HomeLoan jaisa)
  code: string;
  processingTime: string;
  apr: number;
   process: "digital" | "assisted";  
}


const OFFERS: Offer[] = [
  // 🟢 LOW INTEREST (PSU BANKS)
  {
    id: "sbi",
    bankName: "State Bank of India - MSME Loan",
    interestRate: 10.5,
    process: "assisted",
    tenure: "12 – 84 Months",
    processingFee: "Up to 1%",
    code: "SBI",
    processingTime: "5 - 10 Days",
    apr: 11.2,
    emi: 0,
  },
  {
    id: "pnb",
    bankName: "Punjab National Bank - MSME Loan",
    interestRate: 10.75,
    process: "assisted",
    tenure: "12 – 84 Months",
    processingFee: "Up to 1%",
    code: "PNB",
    processingTime: "5 - 10 Days",
    apr: 11.5,
    emi: 0,
  },
  {
    id: "bob",
    bankName: "Bank of Baroda - MSME Loan",
    interestRate: 10.9,
    process: "assisted",
    tenure: "12 – 84 Months",
    processingFee: "Up to 1%",
    code: "BOB",
    processingTime: "5 - 8 Days",
    apr: 11.7,
    emi: 0,
  },

  // 🔵 PRIVATE BANKS (BALANCED)
  {
    id: "icici",
    bankName: "ICICI Bank - Business Loan",
    interestRate: 11.5,
    process: "digital",
    tenure: "12 – 60 Months",
    processingFee: "Up to 2%",
    code: "ICICI",
    processingTime: "2 - 4 Days",
    apr: 12.3,
    emi: 0,
  },
  {
    id: "hdfc",
    bankName: "HDFC Bank - MSME Loan",
    interestRate: 12.25,
    process: "digital",
    tenure: "12 – 72 Months",
    processingFee: "Up to 2%",
    code: "HDFC",
    processingTime: "1 - 3 Days",
    apr: 12.9,
    emi: 0,
  },
  {
    id: "kotak",
    bankName: "Kotak Mahindra - Business Loan",
    interestRate: 12.9,
    process: "digital",
    tenure: "12 – 60 Months",
    processingFee: "Up to 2.5%",
    code: "KOTAK",
    processingTime: "2 - 5 Days",
    apr: 13.6,
    emi: 0,
  },
  {
    id: "axis",
    bankName: "Axis Bank - MSME Loan",
    interestRate: 13.2,
    process: "digital",
    tenure: "12 – 60 Months",
    processingFee: "Up to 2%",
    code: "AXIS",
    processingTime: "2 - 4 Days",
    apr: 14,
    emi: 0,
  },
  {
    id: "indusind",
    bankName: "IndusInd Bank - MSME Loan",
    interestRate: 14.2,
    process: "digital",
    tenure: "12 – 60 Months",
    processingFee: "Up to 2%",
    code: "INDUS",
    processingTime: "2 - 5 Days",
    apr: 15,
    emi: 0,
  },

  // 🟣 NBFC (HIGH APPROVAL – FAST)
  {
    id: "tatacap",
    bankName: "Tata Capital - MSME Loan",
    interestRate: 13.8,
    process: "digital",
    tenure: "12 – 72 Months",
    processingFee: "Up to 2.5%",
    code: "TATA",
    processingTime: "1 - 3 Days",
    apr: 14.5,
    emi: 0,
  },
  {
    id: "bajaj",
    bankName: "Bajaj Finserv - Business Loan",
    interestRate: 14.5,
    process: "digital",
    tenure: "12 – 84 Months",
    processingFee: "Up to 3%",
    code: "BAJAJ",
    processingTime: "Instant",
    apr: 15.8,
    emi: 0,
  },
  {
    id: "iifl",
    bankName: "IIFL Finance - Business Loan",
    interestRate: 15.5,
    process: "digital",
    tenure: "12 – 60 Months",
    processingFee: "Up to 3%",
    code: "IIFL",
    processingTime: "2 - 5 Days",
    apr: 16.2,
    emi: 0,
  },

  // 🔥 NEW ADD (IMPORTANT)
  {
    id: "aditya",
    bankName: "Aditya Birla Finance - MSME Loan",
    interestRate: 15.2,
    process: "digital",
    tenure: "12 – 60 Months",
    processingFee: "Up to 3%",
    code: "AB",
    processingTime: "2 - 5 Days",
    apr: 16,
    emi: 0,
  },
  {
    id: "lendingkart",
    bankName: "Lendingkart - MSME Loan",
    interestRate: 18,
    process: "digital",
    tenure: "6 – 36 Months",
    processingFee: "Up to 2%",
    code: "LK",
    processingTime: "Instant",
    apr: 19,
    emi: 0,
  }
];

const calculateEMI = (P: number, R: number, N: number) => {
  const r = R / 12 / 100;
  return Math.round((P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1));
};

const Msme: React.FC = () => {
  useEffect(() => {
  document.title =
    "MSME Business Loan up to ₹5 Crore | Apply Online – RupeeDial";

  const desc =
    "Apply for MSME business loan up to ₹5 Crore. Compare interest rates from top banks & NBFCs. Fast approval, minimal documents & expert support by RupeeDial.";

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", desc);

  // Canonical
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", "https://rupeedial.com/msme-loan");
}, []);
  const [leadId] = useState(
    () => "MSME-" + Math.floor(Math.random() * 1000000)
  );
  const [step, setStep] = useState<Step>(1);


  // ===== MSME → HomeLoan like flow states =====
  const [loanDetails, setLoanDetails] = useState<LoanDetails | null>(null);
const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingEligibility, setLoadingEligibility] = useState(false);
const [processType, setProcessType] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"interest" | "emi" | "processing">("interest");
  const [interestFilter, setInterestFilter] = useState<string[]>([]);
  const [processingFilter, setProcessingFilter] = useState<string[]>([]);

  const [selectedBanks, setSelectedBanks] = useState<Offer[]>([]);
const handleSelectOffer = (offer: Offer) => {
  const emi = calculateEMI(
    loanDetails!.loanAmount,
    offer.interestRate,
    60
  );

  const updatedOffer = { ...offer, emi };

  setSelectedBanks((prev) =>
    prev.some((b) => b.id === offer.id)
      ? prev.filter((b) => b.id !== offer.id)
      : [...prev, updatedOffer]
  );
};
  const [form, setForm] = useState<MsmeForm>({
    fullName: "",
    email: "",
    mobile: "",
    annualTurnover: 3000000,
    monthlyTurnover: "",
    loanAmount: "",
    location: "",
    businessType: "",
    constitution: "",
    vintage: "",
    acceptPrivacy: false,
    existingEmi: "",
    pan: "",
    aadhaar: "",
    employmentType: "", 
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
if (errors[name]) {
  setErrors(prev => ({ ...prev, [name]: "" }));
}
    // ✅ Checkbox case (only HTMLInputElement has checked)
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      const { checked } = e.target;
      setForm((prev) => ({ ...prev, [name]: checked }));
      return;
    }

    // ✅ Number inputs
    if (type === "number") {
      setForm((prev) => ({
        ...prev,
        [name]: value === "" ? "" : Number(value),
      }));
      return;
    }

    // ✅ Normal text / select etc.
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const eligibleLoan = useMemo(() => {
    const annual =
      typeof form.annualTurnover === "number" ? form.annualTurnover : 0;
    if (!annual || annual <= 0) return 0;
    return Math.round(annual * 0.6); // 60% of annual turnover
  }, [form.annualTurnover]);

  const approvedLoanAmount = useMemo(() => {
    const requested =
      typeof form.loanAmount === "number" ? form.loanAmount : 0;
    if (!requested) return eligibleLoan;
    return Math.min(requested, eligibleLoan);
  }, [form.loanAmount, eligibleLoan]);

  // -------- STEP HANDLERS ----------

const validateStep1 = () => {
  const newErrors: any = {};
if (!form.aadhaar || form.aadhaar.length !== 12)
  newErrors.aadhaar = "Enter valid Aadhaar";

if (form.existingEmi === "" || form.existingEmi < 0)
  newErrors.existingEmi = "Enter valid EMI";
  if (!form.fullName.trim()) newErrors.fullName = "Full Name is required";

  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    newErrors.email = "Enter valid email";

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan))
    newErrors.pan = "Invalid PAN format";

  if (!/^[6-9]\d{9}$/.test(form.mobile))
    newErrors.mobile = "Enter valid mobile (6-9 start)";

  if (!form.loanAmount) newErrors.loanAmount = "Select loan amount";

  if (!form.location) newErrors.location = "Select city";

  if (!form.businessType) newErrors.businessType = "Select business type";

  if (!form.monthlyTurnover || form.monthlyTurnover < 50000)
    newErrors.monthlyTurnover = "Min ₹50,000 required";

  if (!form.vintage) newErrors.vintage = "Select business age";

  if (!form.constitution) newErrors.constitution = "Select constitution";

  if (!form.employmentType)
    newErrors.employmentType = "Select employment type";

  if (!form.acceptPrivacy)
    newErrors.acceptPrivacy = "Accept privacy policy";

  setErrors(newErrors);

  const firstError = Object.keys(newErrors)[0];
  if (firstError) {
    const el = document.querySelector(`[name="${firstError}"]`);
    if (el) (el as HTMLElement).focus();
    window.scrollTo({ top: 300, behavior: "smooth" });
    return false;
  }

  return true;
};
  const goNextFromStep1 = () => {
    if (!validateStep1()) return;

    setTimeout(() => {
      setLoanDetails({
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
        loanAmount: approvedLoanAmount,
        businessType: form.businessType,
        city: form.location,
        existingEmi: typeof form.existingEmi === "number" ? form.existingEmi : 0,
        purpose: "MSME Business Loan",

        pan: form.pan,
        aadhaar: form.aadhaar,
         employmentType: form.employmentType, 
      });


      setStep(2);
    }, 500);
  };



  const canProceed = selectedBanks.length > 0;

  const handleNextFromStep2 = () => {
    if (!canProceed) return;
    setStep(3);
  };
  const updateLoanDetails = <K extends keyof LoanDetails>(
    key: K,
    value: LoanDetails[K]
  ) => {
    setLoanDetails((prev) =>
      prev ? { ...prev, [key]: value } : prev
    );
  };

  const handlePrev = () => {
    setStep((p) => (p > 1 ? ((p - 1) as Step) : p));
  };


  const [agreeAppTerms, setAgreeAppTerms] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitApplication = async () => {
    try {
      if (!loanDetails) return;

      if (!agreeAppTerms) {
        alert("Please accept terms & conditions");
        return;
      }

      setSubmitting(true);

      const formData = new FormData();
      formData.append("loanDetails", JSON.stringify(loanDetails));
      formData.append("selectedBanks", JSON.stringify(selectedBanks));

      uploaded.kyc.forEach(f => formData.append("kyc[]", f));
      uploaded.incomeProof.forEach(f => formData.append("incomeProof[]", f));
      uploaded.bankStatement.forEach(f => formData.append("bankStatement[]", f));
      uploaded.other.forEach(f => formData.append("other[]", f));

      const res = await fetch(
        "https://rupeedial.com/rupeedial-backend/public/index.php?action=msme-loan/apply",

        {
          method: "POST",
          body: formData,
        }
      );

 if (!res.ok) {
  const text = await res.text();
  throw new Error(text);
}
      setStep(4);
    } catch {
      alert("Submission failed");
    } finally {
      setSubmitting(false);
    }
  };



  const selectedRate =
    selectedBanks.length === 1
      ? selectedBanks[0].interestRate
      : "Multiple";

  const handleDownloadApplication = () => {
    if (!loanDetails) return;

    const content = `
MSME LOAN APPLICATION SUMMARY
-----------------------------

Application ID: ${leadId}

Applicant Name: ${loanDetails?.fullName || ""}
Email: ${loanDetails.email}
Mobile: ${loanDetails.mobile}

Loan Type: MSME Business Loan
Loan Amount: ₹ ${loanDetails.loanAmount.toLocaleString("en-IN")}
City: ${loanDetails.city}
Business Type: ${loanDetails.businessType}
Existing EMI: ₹ ${loanDetails.existingEmi}

Selected Banks:
${selectedBanks
        .map(
          (b) =>
            `- ${b.bankName} | Interest: ${b.interestRate}% | EMI: ₹ ${b.emi.toLocaleString(
              "en-IN"
            )}`
        )
        .join("\n")}

Status: Application Submitted Successfully
Next Step: Bank verification & document review
`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `MSME_Loan_Application_${leadId}.txt`;
    link.click();

    URL.revokeObjectURL(url);
  };

  const [uploaded, setUploaded] = useState({
    kyc: [] as File[],
    incomeProof: [] as File[],
    bankStatement: [] as File[],
    other: [] as File[],
  });

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof typeof uploaded
  ) => {
    const files = Array.from(e.target.files ?? []);
const maxSize = 2 * 1024 * 1024; // 2MB

for (const file of files) {
  if (file.size > maxSize) {
    alert(`${file.name} exceeds 2MB limit`);
    return;
  }

  if (!["application/pdf", "image/jpeg", "image/png"].includes(file.type)) {
    alert(`${file.name} invalid format (PDF/JPG/PNG only)`);
    return;
  }
}

setUploaded((p) => ({
  ...p,
  [key]: files,
}));
  };

  // -------- UI HELPERS ----------
  const filteredOffers = useMemo(() => {
    let data = [...OFFERS];
    
    if (processingFilter.length) {
      data = data.filter((o) => {
       if (processingFilter.includes("1to2")) {
  return o.processingTime.includes("1 - 2");
}
if (processingFilter.includes("3to7")) {
  return o.processingTime.includes("3 - 7");
}
if (processingFilter.includes("instant")) {
  return o.processingTime.toLowerCase().includes("instant");
}
        return true;
      });
    }
    if (processType.length > 0) {
  data = data.filter(o => processType.includes(o.process));
}


    if (interestFilter.length) {
      data = data.filter((o) => {
        if (interestFilter.includes("upto11")) return o.interestRate <= 11;
        if (interestFilter.includes("11to13")) return o.interestRate > 11 && o.interestRate <= 13;
        if (interestFilter.includes("above13")) return o.interestRate > 13;
        return true;
      });
    }

    if (sortBy === "interest") data.sort((a, b) => a.interestRate - b.interestRate);
    if (sortBy === "emi") {
data.sort((a, b) =>
  calculateEMI(loanDetails!.loanAmount, a.interestRate, 60) -
  calculateEMI(loanDetails!.loanAmount, b.interestRate, 60)
);
}

    return data;
}, [interestFilter, processingFilter, sortBy, loanDetails, processType]);


  const stepPercent = useMemo(() => {
    switch (step) {
      case 1:
        return 25;
      case 2:
        return 50;
      case 3:
        return 75;
      case 4:
        return 100;
      default:
        return 25;
    }
  }, [step]);
 const CITY_LIST = [
  "Delhi","Mumbai","Bengaluru","Chennai","Hyderabad","Pune",
  "Kolkata","Ahmedabad","Jaipur","Lucknow","Chandigarh",
  "Indore","Bhopal","Nagpur","Surat","Vadodara",
  "Patna","Ranchi","Coimbatore","Visakhapatnam",
  "Noida","Gurgaon","Ghaziabad","Faridabad",
  "Nashik","Aurangabad","Kanpur","Varanasi","Amritsar"
];


  // -------- JSX ----------
  const inputClass =
    "w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#10662A]";

  const selectClass = inputClass;


  const backBtnClass =
    "rounded-lg border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50";

  const warningBtnClass =
    "rounded-lg bg-yellow-100 px-5 py-2 text-sm font-semibold text-yellow-800 hover:bg-yellow-200";

  const successBtnClass =
    "rounded-lg bg-[#10662A] px-6 py-2 text-sm font-semibold text-white hover:bg-[#0b4d20]";

  const primaryBtnClass =
    "rounded-lg bg-[#10662A] px-6 py-2 text-sm font-semibold text-white";

  const outlineBtnClass =
    "rounded-lg border border-[#10662A] px-6 py-2 text-sm font-semibold text-[#10662A]";

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="bg-[#F5FFF8]  border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-6 flex flex-col md:flex-row items-center gap-10">
          {/* LEFT */}
          <div className="flex-1">
            <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#10662A] shadow-sm border border-[#d8efe6]">
              MSME . Loan
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#10662A] mb-3">
              MSME Loans for{" "}
              <span className="text-[#390A5D] ">
                Small &amp; Medium Businesses
              </span>
            </h1>
            <h2 className="text-base md:text-lg font-semibold text-[#10662A] mb-3">
              Fast Approval • Flexible EMI • Multiple Banks
            </h2>
            <p className="text-sm md:text-base text-[#390A5D] mb-5 leading-relaxed">
              Grow your business with MSME loans from top banks &amp; NBFCs.
              Get funding for working capital, machinery purchase, expansion and
              more. Simple process, quick eligibility check and end-to-end
              support.
            </p>
{Object.keys(errors).length > 0 && (
  <div className="bg-red-50 border border-red-200 text-red-700 text-sm p-3 rounded-md">
    Please fix highlighted fields
  </div>
)}
            <div className="flex flex-wrap gap-3">
              <a
                href="#msme-wizard"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#10662A] text-white text-sm font-semibold shadow-sm none:bg-[#0b4d20] transition"
              >
                Check MSME Loan Eligibility
              </a>
              <a
                href="/expert"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#10662A] text-[#10662A] text-sm font-semibold bg-white none:bg-[#e4f6ea] transition"
              >
                Talk to Loan Expert
              </a>
            </div>
            <div className="text-xs text-gray-500 mt-2">
✔ RBI Registered Partners | ✔ No Hidden Charges | ✔ 100% Secure
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
                  src={msmeLoan}
                  alt="MSME Loan Illustration"
                  className="relative 
               w-[260px] sm:w-[300px] md:w-[340px] h-auto 
               rounded-xl object-contain
               transition-transform duration-300
               group-hover:scale-105"
                />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* MAIN WIZARD */}
      <section
        id="msme-wizard"
        className="max-w-6xl mx-auto px-4 py-10 md:py-14"
      >
        {/* STEPS HEADER */}
        <div className="bg-white rounded-xl shadow-md border border-[#d8efe6] p-4 md:p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm font-semibold text-[#390A5D]">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-40 max-w-full h-12 rounded-lg flex items-center justify-center border text-center px-2 ${step === 1
                    ? "bg-[#390A5D] text-white border-[#390A5D]"
                    : step > 1
                      ? "bg-[#10662A] text-white border-[#10662A]"
                      : "bg-[#F5FFF8] text-[#390A5D] border-[#d8efe6]"
                  }`}
              >
                Fill  Details
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-40 max-w-full h-12 rounded-lg flex items-center justify-center border text-center px-2 ${step === 2
                    ? "bg-[#390A5D] text-white border-[#390A5D]"
                    : step > 2
                      ? "bg-[#10662A] text-white border-[#10662A]"
                      : "bg-[#F5FFF8] text-[#390A5D] border-[#d8efe6]"
                  }`}
              >
                Check Eligibility
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-40 max-w-full h-12 rounded-lg flex items-center justify-center border text-center px-2 ${step === 3
                    ? "bg-[#390A5D] text-white border-[#390A5D]"
                    : step > 3
                      ? "bg-[#10662A] text-white border-[#10662A]"
                      : "bg-[#F5FFF8] text-[#390A5D] border-[#d8efe6]"
                  }`}
              >
                Choose Best Offer
              </div>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-40 max-w-full h-12 rounded-lg flex items-center justify-center border text-center px-2 ${step === 4
                    ? "bg-[#390A5D] text-white border-[#390A5D]"
                    : "bg-[#F5FFF8] text-[#390A5D] border-[#d8efe6]"
                  }`}
              >
                Get Disbursal
              </div>
            </div>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-5 h-1.5 w-full bg-[#d8efe6] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#10662A] transition-all duration-300"
              style={{ width: `${stepPercent}%` }}
            />
          </div>
        </div>

        {/* STEP 1: FORM */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-md border border-[#d8efe6] p-4 md:p-6 space-y-6">
            {/* Estimator */}
            <div className="bg-gradient-to-r from-[#F5FFF8] to-white rounded-lg border border-[#d8efe6] p-4 md:p-5">
              <h3 className="text-sm md:text-base font-semibold text-[#390A5D] mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm text-[#10662A] text-xs font-bold">
                  1
                </span>
                MSME Loan Estimator
              </h3>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Annual Business Turnover (₹)*
                  </label>
                  <input
                    type="number"
                    name="annualTurnover"
                    value={form.annualTurnover}
                    onChange={handleChange}
                    className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]"
                    min={500000}
                    placeholder="Eg. 30,00,000"
                  />
                  <p className="mt-1 text-[11px] text-[#390A5D]">
                    Minimum recommended turnover: ₹5,00,000
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Eligible Loan % of Turnover
                  </label>
                  <input
                    type="text"
                    value="60%"
                    readOnly
                    className="w-full rounded-md border border-slate-200 bg-[#F5FFF8] px-3 py-2 text-sm text-[#390A5D]"
                  />
                  <p className="mt-1 text-[11px] text-[#390A5D]">
                    Approx. 60% of annual turnover
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Approx. Eligible MSME Loan
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={
                      eligibleLoan
                        ? `₹ ${eligibleLoan.toLocaleString("en-IN")}`
                        : "₹ 0"
                    }
                    className="w-full rounded-md border border-slate-200 bg-[#F5FFF8] px-3 py-2 text-sm font-semibold text-[#10662A]"
                  />
                </div>
              </div>
            </div>

            {/* Main form */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Full Name*
                  </label>
                 <input
  name="fullName"
  value={form.fullName}
  onChange={handleChange}
  className={`w-full rounded-md px-3 py-2 text-sm border ${
    errors.fullName ? "border-red-500" : "border-slate-200"
  }`}
/>

{errors.fullName && (
  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
)}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Email Address*
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}

                    onChange={handleChange}
                 className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.email ? "border-red-500" : "border-slate-200"
}`}
                    placeholder="name@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {/* PAN */}
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    PAN Number*
                  </label>
                  <input
                    type="text"
                    name="pan"
                   className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.pan ? "border-red-500" : "border-slate-200"
}`}
                    placeholder="ABCDE1234F"
                    maxLength={10}
                    value={form.pan}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        pan: e.target.value
                          .toUpperCase()
                          .replace(/[^A-Z0-9]/g, ""),
                      }))
                    }
                    
                  />
                  {errors.pan && <p className="text-red-500 text-xs">{errors.pan}</p>}
                </div>

                {/* Aadhaar */}
                <div>
                  <label className="text-xs font-semibold text-slate-700">
                    Aadhaar Number
                  </label>
                  <input
                    type="text"
                    name="aadhaar"
                  className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.aadhaar ? "border-red-500" : "border-slate-200"
}`}
                    maxLength={12}
                    value={form.aadhaar}
                    onChange={(e) =>
                      setForm(p => ({
                        ...p,
                        aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12),
                      }))
                    }
                  />
                  {errors.aadhaar && (
  <p className="text-red-500 text-xs">{errors.aadhaar}</p>
)}

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Mobile Number*
                  </label>
                  <input
                    type="text"                 // ✅ number nahi
                    name="mobile"
                    value={form.mobile}         // ✅ Step-1 = form
                    onChange={handleChange}     // ✅ common handler
                    maxLength={10}
                  className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.mobile ? "border-red-500" : "border-slate-200"
}`}
                    placeholder="10-digit mobile number"
                  />
                  {errors.mobile && <p className="text-red-500 text-xs">{errors.mobile}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    MSME Loan Amount Required*
                  </label>
                <div className="flex gap-2">

  {/* Dropdown */}
  <select
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        loanAmount: Number(e.target.value),
      }))
    }
   className={`flex-1 rounded-md px-3 py-2 text-sm border ${
  errors.loanAmount ? "border-red-500" : "border-slate-200"
}`}
  >

    <option value="">Quick Select</option>
    {[
  500000, 1000000, 2000000, 3000000, 5000000,
  10000000, 20000000, 30000000, 50000000
].map(v => (
      <option key={v} value={v}>
        ₹ {v.toLocaleString("en-IN")}
      </option>
    ))}
  </select>

  {/* Manual Input */}
  <input
    type="number"
    name="loanAmount"
    max={eligibleLoan}
    value={form.loanAmount}
    onChange={handleChange}
    placeholder="Enter amount"
    className="flex-1 rounded-md border px-3 py-2 text-sm"
  />

</div>

                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Business Location*
                  </label>
     <div className="flex gap-2">

  {/* Dropdown */}
  <select
    onChange={(e) =>
      setForm((prev) => ({
        ...prev,
        location: e.target.value,
      }))
    }
    className="flex-1 rounded-md border px-3 py-2 text-sm"
  >
    <option value="">Select City</option>
    {CITY_LIST.map((city) => (
      <option key={city} value={city}>
        {city}
      </option>
    ))}
  </select>

  {/* Manual Input */}
  <input
    type="text"
    name="location"
    value={form.location}
    onChange={handleChange}
    placeholder="Enter your city"
    className="flex-1 rounded-md border px-3 py-2 text-sm"
  />

</div> 
 {errors.location && (
  <p className="text-red-500 text-xs">{errors.location}</p>
)}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Business Type*
                  </label>
                  <select
                    name="businessType"
                    value={form.businessType}
                    onChange={handleChange}
                    className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.businessType ? "border-red-500" : "border-slate-200"
}`}

                  >
                    {errors.businessType && (
  <p className="text-red-500 text-xs">{errors.businessType}</p>
)}
                    <option value="">Select Business Type</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="trading">Trading</option>
                    <option value="services">Services</option>
                    <option value="professional">Professional Services</option>
                  </select>
                </div>
                
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Monthly Business Turnover (₹)*
                  </label>
                  <input
                    type="number"
                    name="monthlyTurnover"
                    value={form.monthlyTurnover}
                    onChange={handleChange}
                    min={50000}
                   className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.monthlyTurnover ? "border-red-500" : "border-slate-200"
}`}
                    placeholder="Eg. 1,50,000"
                  />
                  {errors.monthlyTurnover && (
  <p className="text-red-500 text-xs">{errors.monthlyTurnover}</p>
)}
                  <p className="mt-1 text-[11px] text-[#390A5D]">
                    Minimum suggested: ₹50,000 per month
                  </p>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Business Vintage*
                  </label>
                  <select
                    name="vintage"
                    value={form.vintage}
                    onChange={handleChange}
                    className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.vintage ? "border-red-500" : "border-slate-200"
}`}
                  >
                    {errors.vintage && (
  <p className="text-red-500 text-xs">{errors.vintage}</p>
)}
                    <option value="">Select Business Age</option>
                    <option value="lt1">Less than 1 year</option>
                    <option value="1-3">1 – 3 years</option>
                    <option value="3-5">3 – 5 years</option>
                    <option value="gt5">More than 5 years</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Business Constitution*
                  </label>
                  <select
                    name="constitution"
                    value={form.constitution}
                    onChange={handleChange}
                 className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.constitution ? "border-red-500" : "border-slate-200"
}`}
                  >
                    {errors.constitution && (
  <p className="text-red-500 text-xs">{errors.constitution}</p>
)}
                    <option value="">Select Constitution</option>
                    <option value="proprietorship">Proprietorship</option>
                    <option value="partnership">Partnership Firm</option>
                    <option value="pvt-ltd">Private Limited</option>
                    <option value="llp">LLP</option>
                  </select>
                </div>

                {/* Existing EMI (Optional) - same row */}
                <div>
                  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                    Existing EMIs (total per month – optional)
                  </label>
                  <input
                    type="number"
                    name="existingEmi"
                    value={form.existingEmi}
                    onChange={handleChange}
                    className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.existingEmi ? "border-red-500" : "border-slate-200"
}`}
                    placeholder="Total of existing EMIs (if any)"
                  />
                  {errors.existingEmi && (
  <p className="text-red-500 text-xs">{errors.existingEmi}</p>
)}
                </div>
              </div>


<div>
  <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
    Employment Type*
  </label>

  <select
    name="employmentType"
    value={form.employmentType}
    onChange={handleChange}
   className={`w-full rounded-md px-3 py-2 text-sm border ${
  errors.employmentType ? "border-red-500" : "border-slate-200"
}`}
  >
    {errors.employmentType && (
  <p className="text-red-500 text-xs">{errors.employmentType}</p>
)}
    <option value="">Select Type</option>
    <option value="salaried">Salaried</option>
    <option value="self-employed">Self Employed</option>
    <option value="business-owner">Business Owner</option>
  </select>
</div>
              <div className="flex items-start gap-2 pt-1">
                <input
                  id="acceptPrivacy"
                  type="checkbox"
                  name="acceptPrivacy"
                  checked={form.acceptPrivacy}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#10662A] focus:ring-[#10662A]"
                />
                <label
                  htmlFor="acceptPrivacy"
                  className="text-xs text-[#390A5D]"
                >
                  {errors.acceptPrivacy && (
  <p className="text-red-500 text-xs mt-1">
    {errors.acceptPrivacy}
  </p>
)}
                  I authorize Rupeedial / its partners to call, SMS or email me
                  regarding MSME loan assistance. I have read and accepted the{" "}
                  <span className="text-[#10662A] underline cursor-pointer">
                    privacy policy
                  </span>
                  .
                </label>
              </div>

              <div className="flex justify-center mt-4">
                <button
                  type="button"
                  onClick={goNextFromStep1}
                  className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#10662A] text-white text-sm font-semibold shadow-sm none:bg-[#0b4d20] transition"
                >
                  Check MSME Eligibility
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
                Compare MSME Loan Offers from Top Banks
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
                      <input
  type="checkbox"
  className="h-3 w-3"
  checked={processType.includes("digital")}
  onChange={(e) => {
    if (e.target.checked) {
      setProcessType([...processType, "digital"]);
    } else {
      setProcessType(processType.filter(p => p !== "digital"));
    }
  }}
/>
                      <span>Fully Digital Journey</span>
                    </label>
                    <label className="mb-1 flex items-center gap-2">
                      <input
  type="checkbox"
  className="h-3 w-3"
  checked={processType.includes("assisted")}
  onChange={(e) => {
    if (e.target.checked) {
      setProcessType([...processType, "assisted"]);
    } else {
      setProcessType(processType.filter(p => p !== "assisted"));
    }
  }}
/>
                      <span>Assisted / Doorstep Documentation</span>
                    </label>
                  </div>
                </aside>

                {/* OFFERS LIST */}
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                  {/* Top banner */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-green-100 to-blue-50 px-4 py-3 text-xs text-slate-800 shadow-sm">
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold text-green-700 bg-white">
    🔒 100% Secure & Trusted Platform
  </span>

  <span className="text-[11px] font-semibold text-blue-700">
    ⚡ 30+ Banks | Instant Offers | No Hidden Charges
  </span>

  <div className="text-right">
    <div>
      Loan Amount:
      <span className="font-bold text-[#390A5D] ml-1">
        ₹ {loanDetails.loanAmount.toLocaleString("en-IN")}
      </span>
    </div>
  </div>
</div>

                  {/* Cards */}
                  <div className="space-y-3">
                    {filteredOffers.map((offer) => {
                      const emi = calculateEMI(
  loanDetails!.loanAmount,
  offer.interestRate,
  60
);


                      const isSelected = selectedBanks.some((b) => b.id === offer.id);

                      return (
                        <article
                          key={offer.id}
                          className={`flex items-center justify-between gap-4 rounded-2xl border bg-white px-5 py-4 shadow-md hover:shadow-xl transition-all duration-300
        ${isSelected
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

<div className="flex gap-2 mt-1">
  {offer.interestRate < 11.5 && (
    <span className="bg-green-100 text-green-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
      ⭐ Best Offer
    </span>
  )}

  {offer.processingTime.includes("Instant") && (
    <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
      ⚡ Instant Approval
    </span>
  )}

  {offer.interestRate < 12 && offer.process === "digital" && (
    <span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
      🔥 Most Popular
    </span>
  )}
</div>
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
                          {/* EMI */}
<div className="w-[15%]">
  <div className="text-[11px] text-slate-500">
    Indicative EMI
  </div>

  <div className="font-bold text-lg text-[#10662A]">
    ₹ {emi.toLocaleString("en-IN")}
  </div>

  <div className="text-[10px] text-gray-500">
    per month (approx)
  </div>
</div>

                          {/* ACTION */}
                          <div className="w-[15%] text-right">
                            <button
                              type="button"
                              onClick={() => handleSelectOffer(offer)}
                              className={`rounded-full px-5 py-2 text-xs font-semibold text-white
            ${isSelected
                                  ? "bg-[#10662A]"
                                  : "bg-[#10662A]"
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

                  <div className="mt-6 flex justify-between gap-3">
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
                Complete Your MSME Loan Application
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

            <h3 className="mb-3 text-sm font-semibold text-[#390A5D]">
              Review & Edit Application Details
            </h3>

            <div className="grid md:grid-cols-2 gap-4">

              {/* Full Name */}
              <div>
                <label className="text-xs font-semibold">Full Name*</label>
                <input
                  name="fullName"
                  className={inputClass}
                  value={form.fullName}
                  onChange={handleChange}
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-xs font-semibold">Email Address*</label>
                <input
                  name="email"
                  type="email"
                  className={inputClass}
                  value={loanDetails.email}
                  onChange={(e) =>
                    updateLoanDetails("email", e.target.value)
                  }
                />
              </div>

              {/* PAN */}
              <div>
                <label className="text-xs font-semibold">PAN Number*</label>
                <input
                  className={inputClass}
                  maxLength={10}
                  value={loanDetails.pan || ""}
                  onChange={(e) =>
                    updateLoanDetails(
                      "pan",
                      e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
                    )
                  }
                />

              </div>

              {/* Aadhaar */}
              <div>
                <label className="text-xs font-semibold">Aadhaar Number</label>
                <input
  type="text"
  name="aadhaar"
  maxLength={12}
  value={form.aadhaar}
  onChange={(e) =>
    setForm(p => ({
      ...p,
      aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12),
    }))
  }
  className={`${inputClass} ${
    errors.aadhaar ? "border-red-500" : ""
  }`}
/>

{errors.aadhaar && (
  <p className="text-red-500 text-xs">{errors.aadhaar}</p>
)}
              </div>


              {/* Mobile */}
              <div>
                <label className="text-xs font-semibold">Mobile Number*</label>
                <input
                  name="mobile"
                  className={inputClass}
                  value={form.mobile}
                  onChange={handleChange}
                />
              </div>

              {/* Loan Amount */}
              <div>
                <label className="text-xs font-semibold">
                  MSME Loan Amount Required*
                </label>
                <input
                  type="number"
                  className={inputClass}
                  value={loanDetails.loanAmount}
                  onChange={(e) =>
                    updateLoanDetails("loanAmount", Number(e.target.value))
                  }
                />

              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-semibold">Business Location*</label>
                <select
                  name="location"
                  className={selectClass}
                  value={form.location}
                  onChange={handleChange}
                >
                  {CITY_LIST.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Business Type */}
              <div>
                <label className="text-xs font-semibold">Business Type*</label>
                <select
                  name="businessType"
                  className={selectClass}
                  value={form.businessType}
                  onChange={handleChange}
                >
                  <option value="manufacturing">Manufacturing</option>
                  <option value="trading">Trading</option>
                  <option value="services">Services</option>
                  <option value="professional">Professional</option>
                </select>
              </div>

              {/* Monthly Turnover */}
              <div>
                <label className="text-xs font-semibold">
                  Monthly Business Turnover (₹)*
                </label>
                <input
                  name="monthlyTurnover"
                  type="number"
                  className={inputClass}
                  value={form.monthlyTurnover}
                  onChange={handleChange}
                />
              </div>

              {/* Vintage */}
              <div>
                <label className="text-xs font-semibold">Business Vintage*</label>
                <select
                  name="vintage"
                  className={selectClass}
                  value={form.vintage}
                  onChange={handleChange}
                >
                  <option value="lt1">Less than 1 year</option>
                  <option value="1-3">1 – 3 years</option>
                  <option value="3-5">3 – 5 years</option>
                  <option value="gt5">More than 5 years</option>
                </select>
              </div>

              {/* Constitution */}
              <div>
                <label className="text-xs font-semibold">Business Constitution*</label>
                <select
                  name="constitution"
                  className={selectClass}
                  value={form.constitution}
                  onChange={handleChange}
                >
                  <option value="proprietorship">Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="pvt-ltd">Private Limited</option>
                  <option value="llp">LLP</option>
                </select>
              </div>

              {/* Existing EMI */}
              <div>
                <label className="text-xs font-semibold">
                  Existing EMIs (optional)
                </label>
                <input
                  name="existingEmi"
                  type="number"
                  className={inputClass}
                  value={form.existingEmi}
                  onChange={handleChange}
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

            <div className="mt-6 flex justify-between gap-3">
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
                  : "Submit MSME Loan Application"}
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
                MSME Loan Application Submitted Successfully
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
                    MSME Loan
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
                        ₹ {calculateEMI(loanDetails.loanAmount, bank.interestRate, 60).toLocaleString("en-IN")} @ {bank.interestRate}%
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
                              ₹ {calculateEMI(loanDetails.loanAmount, bank.interestRate, 60).toLocaleString("en-IN")} @ {bank.interestRate}%
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
                      <span>{selectedRate}% (indicative)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-between gap-3">
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


      </section>   {/* ✅ CLOSE msme-wizard */}
    <section className="mt-10 flex justify-center px-4">
  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md border border-[#d8efe6] p-5 sm:p-8">

    {/* TITLE */}
    <h2 className="text-xl sm:text-2xl font-bold text-[#10662A] mb-4 text-center">
      What Is MSME Loan?
    </h2>

    {/* DESCRIPTION */}
    <p className="text-sm sm:text-base text-[#390A5D] leading-relaxed text-center max-w-3xl mx-auto">
      MSME (Micro, Small & Medium Enterprises) Loans are customized business loans
      designed for small and medium businesses. These loans help in working
      capital, machinery purchase, expansion and daily operational needs.
    </p>

    {/* BENEFITS */}
    <h3 className="text-lg font-semibold text-[#10662A] mt-8 mb-4 text-center">
      Benefits of MSME Loan
    </h3>

    <ul className="max-w-3xl mx-auto space-y-3 text-sm sm:text-base text-[#390A5D]">
      <li className="flex gap-2">
        <span className="text-[#10662A] font-bold">✓</span>
        Quick processing with minimal documentation
      </li>
      <li className="flex gap-2">
        <span className="text-[#10662A] font-bold">✓</span>
        Flexible usage for business growth & expansion
      </li>
      <li className="flex gap-2">
        <span className="text-[#10662A] font-bold">✓</span>
        Collateral-free options available
      </li>
      <li className="flex gap-2">
        <span className="text-[#10662A] font-bold">✓</span>
        Flexible repayment tenure up to 84 months
      </li>
    </ul>

    {/* DOCUMENTS */}
    <h3 className="text-lg font-semibold text-[#10662A] mt-8 mb-4 text-center">
      Documents Required
    </h3>

    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-[#390A5D]">
      <div>• PAN Card & Aadhaar</div>
      <div>• Business Registration / GST</div>
      <div>• Last 6–12 Months Bank Statement</div>
      <div>• ITR / Financials</div>
      <div>• Business Address Proof</div>
    </div>


  </div>
</section>
<section className="mt-8 bg-[#F5FFF8] py-6">
  <div className="max-w-5xl mx-auto px-4">
    <h2 className="text-xl font-bold text-[#10662A] text-center mb-4">
      MSME Loan – FAQs
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          Who can apply for MSME loan?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Proprietors, partnerships, LLPs and private limited businesses can apply.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          Is collateral required?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Many MSME loans are collateral-free, depending on bank or NBFC policy.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          How much MSME loan can I get?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Loan amount depends on turnover, business vintage and credit profile.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          How fast is MSME loan approval?
        </summary>
        <p className="mt-2 text-xs text-slate-600">
          Initial approvals may start within 24–72 working hours.
        </p>
      </details>

    </div>
  </div>
</section>



    </div>
  );
};

export default Msme;
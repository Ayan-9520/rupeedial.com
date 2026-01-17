import React, { useMemo, useState } from "react";


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

const PURPOSES = [
  "Purchase of New House / Flat",
  "Purchase of Resale Property",
  "Home Construction",
  "Home Renovation / Extension",
  "Plot Purchase + Construction",
  "Balance Transfer",
  "Balance Transfer with Top-Up",
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
const PROPERTY_LOAN_PERCENT = 0.85;
const HomeLoanPage: React.FC = () => {
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
    existingEmi: "0",
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
    let list = [...offers];

    // Interest rate filter
    if (interestFilter.length) {
      list = list.filter((o) => {
        if (interestFilter.includes("upto11")) return o.interestRate <= 11;
        if (interestFilter.includes("11to13"))
          return o.interestRate > 11 && o.interestRate <= 13;
        if (interestFilter.includes("above13")) return o.interestRate > 13;
        return true;
      });
    }

    // Processing time filter
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

    // Sorting
    if (sortBy === "interest") list.sort((a, b) => a.interestRate - b.interestRate);
    if (sortBy === "emi") list.sort((a, b) => a.emi - b.emi);
    if (sortBy === "processing")
      list.sort((a, b) => a.processingTime.localeCompare(b.processingTime));

    return list;
  }, [interestFilter, processingFilter, sortBy]);


  // ---------- UI helper classes ----------
  const inputClass =
    "mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]";
  const selectClass =
    "mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]";
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
        "https://rupeedial.com/rupeedial-backend/public/index.php?action=home-loan/apply",
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
      } catch (e: unknown) {
  console.error(e);
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
🟢 Rupeedial - Home Loan Application  
────────────────────────────────────────────

📌 Application Details
• Application ID: ${leadId || "-"}
• Bank: ${primaryBank ? primaryBank.bankName : "—"}

• Loan Amount: ₹ ${loanDetails.loanAmount.toLocaleString("en-IN")}
• Interest Rate: ${selectedRate}% p.a
Tenure: As per bank policy (15–30 years)
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
              Home Loans for{" "}
              <span className="text-[#390A5D]">Your Dream House</span>
            </h1>
            <h2 className="text-[16px] md:text-[18px] text-[#390A5D]/80 font-medium mb-4">

              Low Interest • High Eligibility • Multiple Banks
            </h2>
            <p className="text-sm md:text-base text-[#390A5D] mb-5 leading-relaxed">
              Fulfil your dream of owning a home with Home Loans from leading banks & NBFCs. Finance purchase, construction or balance transfer of your home loan with simple process, quick eligibility check and end-to-end support.
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
                Check Home Loan Eligibility
              </button>
              <a
                href="/expert"
                className="inline-flex items-center justify-center rounded-lg border border-[#10662A] bg-white px-5 py-3 text-sm font-semibold text-[#10662A] transition"
              >
                Talk to Loan Expert
              </a>
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
              <div className="grid grid-cols-1 gap-3 text-center text-xs md:grid-cols-4 md:text-sm font-semibold text-[#390A5D]">
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
                      HL
                    </span>
                    Home Loan Eligibility &amp; Product Type
                  </h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div>
                      <label className="text-xs font-semibold text-[#390A5D]">
                        Property Value (₹) *
                      </label>
                      <input
                        type="number"
                        id="propertyValue"
                        className={inputClass}
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
                        className={`${inputClass} bg-slate-100`}
                        value="Home Loan"
                        readOnly
                      />




                      <p className="mt-1 text-[11px] text-[#390A5D]">
                        Approx. 85% of property value
                      </p>

                    </div>

                    <div>

                      <label className="text-xs font-semibold text-[#390A5D]">
                        Approx. Eligible Home Loan
                      </label>

                      <input
                        type="text"
                        className={`${inputClass} bg-slate-100`}
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
                  <div className="grid gap-4 md:grid-cols-2">
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
                        className={inputClass}
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
                        className={inputClass}
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
                  <div className="grid gap-4 md:grid-cols-2">
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
                        className={inputClass}
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
                        className={inputClass}
                        value={form.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && (
                        <p className={errorClass}>{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Row: Mobile + Purpose */}
                  <div className="grid gap-4 md:grid-cols-2">
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
                        className={inputClass}
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
                        className={selectClass}
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
                    </div>
                  </div>

                  {/* Row: Loan Amount + City */}
                  <div className="grid gap-4 md:grid-cols-2">
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
                        className={inputClass}
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
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="city"
                      >
                        Current City *
                      </label>
                      <select
                        id="city"
                        className={selectClass}
                        value={form.city}
                        onChange={handleInputChange}
                      >
                        <option value="">Select City</option>
                        {CITY_LIST.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                      {errors.city && (
                        <p className={errorClass}>{errors.city}</p>
                      )}
                    </div>
                  </div>

                  {/* Row: Employment Type + Company Type */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="employmentType"
                      >
                        Employment Type *
                      </label>
                      <select
                        id="employmentType"
                        className={selectClass}
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
                        className={selectClass}
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
                  <div className="grid gap-4 md:grid-cols-2">
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
                        className={inputClass}
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
                        className={inputClass}
                        value={form.existingEmi}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  {/* Row: Work Experience */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label
                        className="text-xs font-semibold text-[#390A5D]"
                        htmlFor="workExperience"
                      >
                        Total Work Experience *
                      </label>
                      <select
                        id="workExperience"
                        className={selectClass}
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
                      Check Home Loan Eligibility
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
                    Compare Home Loan Offers from Top Banks
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
                              className={`flex items-center justify-between gap-4 rounded-xl border bg-white px-5 py-4 shadow-sm transition
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
                                  Indicative EMI (30 yrs)
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
                    Complete Your Home Loan Application
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
                      : "Submit Home Loan Application"}
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
                    Home Loan Application Submitted Successfully
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
                        Home Loan
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
                          <span>{selectedRate}% (indicative)</span>
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
        <section className="hidden border-t border-slate-200 bg-white py-10 md:block">
          <div className="mx-auto max-w-6xl px-4">
            <div className="space-y-6 text-sm text-slate-700">
              <div>
                <h2 className="mb-2 text-center text-lg font-semibold text-[#10662A]">
                  What Is a Home Loan?
                </h2>
                <p className="leading-relaxed text-[#390A5D]">
                  A home loan is a secured financing solution where the property serves as security for the loan. Lenders evaluate your income stability, credit profile, banking history and property documentation to decide the eligible loan amount, interest rate and tenure.

                </p>
              </div>

              <div>
                <h2 className="mb-2 text-center text-lg font-semibold text-[#10662A]">
                  Home Loan Product Types Available on Rupeedial
                </h2>
                <ul className="list-disc space-y-1 pl-5 text-[#390A5D]">
                  <li>
                    <strong>Fresh Home Loan:</strong> A new home loan offered based on your
                    income stability, employment profile and credit score for purchasing or
                    constructing a residential property.
                  </li>
                  <li>
                    <strong>Home Loan Top-Up:</strong> An additional loan facility over and
                    above your existing home loan, available from the same or a different
                    lender to meet extra financial needs.
                  </li>
                  <li>
                    <strong>
                      Balance Transfer – Existing Home Loan:
                    </strong>{" "}
                    Transfer your ongoing home loan to another bank or NBFC to benefit from
                    lower interest rates, reduced EMIs or improved loan terms.
                  </li>
                  <li>
                    <strong>
                      Balance Transfer with Top-Up / Cash Out:
                    </strong>{" "}
                    Shift your home loan to a new lender and receive additional funds over the
                    outstanding loan amount for personal or property-related requirements.
                  </li>
                  <li>
                    <strong>
                      Credit Card Outstanding to Home Loan:
                    </strong>{" "}
                    Consolidate high-interest credit card dues into a structured home loan
                    with longer tenure and lower interest rate for easier repayment.
                  </li>
                  <li>
                    <strong>Personal Overdraft / Dropline OD:</strong>{" "}
                    A flexible credit facility linked to your property, where interest is
                    charged only on the amount utilised, ideal for managing variable cash
                    flow needs.
                  </li>
                </ul>

              </div>

              <div>
                <h2 className="mb-2 text-center text-lg font-semibold text-[#10662A]">
                  Why Apply Through Rupeedial?
                </h2>
                <ul className="list-disc space-y-1 pl-5 text-[#390A5D]">
                  <li>
                    <strong>Compare multiple lenders:</strong> View and compare interest
                    rates, EMIs, fees and processing timelines from leading banks and NBFCs
                    on a single platform.
                  </li>
                  <li>
                    <strong>Completely digital process:</strong> From eligibility assessment
                    to document upload and application tracking, the entire journey is simple
                    and largely online.
                  </li>
                  <li>
                    <strong>Higher approval probability:</strong> Bank offers are curated
                    based on your income profile, credit score and location, increasing the
                    likelihood of faster approvals.
                  </li>
                  <li>
                    <strong>Clear and transparent pricing:</strong> Key details including
                    interest rates, APR, tenure and applicable charges are shown upfront with
                    no hidden costs.
                  </li>
                  <li>
                    <strong>Expert assistance throughout:</strong> The Rupeedial team supports
                    you at every step, from documentation and balance transfer to top-up
                    requests and post-disbursal services.
                  </li>
                </ul>

              </div>

              <div>
                <h2 className="mb-2 text-center text-lg font-semibold text-[#10662A]">
                  Indicative Documents Required
                </h2>
                <ul className="list-disc space-y-1 pl-5 text-[#390A5D]">
                  <li>KYC documents of the applicant – PAN and Aadhaar</li>
                  <li>Recent 3–6 months salary slips or income proof</li>
                  <li>Latest 6–12 months bank account statements</li>
                  <li>
                    Address proof such as utility bill, rent agreement, passport or Aadhaar
                  </li>
                  <li>
                    Form 16, ITR or GST returns, as applicable based on bank or product
                    guidelines
                  </li>
                  <li>
                    For Balance Transfer or Cash-Out cases: existing loan sanction letter,
                    repayment history and foreclosure statement
                  </li>
                </ul>

              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomeLoanPage;

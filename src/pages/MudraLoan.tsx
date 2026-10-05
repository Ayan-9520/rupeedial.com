// src/pages/Msme.tsx
import React, { useState, useMemo, useEffect } from "react";
import { apiUrl } from "../config/api";
import MudraLoan from "../assets/images/mudra-loan.png";
type MudraCategory = "shishu" | "kishore" | "tarun";
 const MUDRA_LIMITS: Record<MudraCategory, number> = {
    shishu: 50000,
    kishore: 500000,
    tarun: 1000000,
  };
type UploadedDocs = {
  kyc: File[];
  bankStatement: File[];
  itr: File[];
  other: File[];
};

const getMudraCategoryFromAmount = (
  amount: number
): MudraCategory | "" => {
  if (amount <= 50000) return "shishu";
  if (amount <= 500000) return "kishore";
  if (amount <= 1000000) return "tarun";
  return "";
};

interface MsmeForm {
  fullName: string;
  email: string;
  mobile: string;
  mudraCategory: MudraCategory | "";

  loanAmount: number | "";
  location: string;
  businessType: string;

  vintage: string;
  acceptPrivacy: boolean;
  existingEmi: number | "";

  pan: string;        // ✅ ADD
  aadhaar: string;    // ✅ ADD
}


const Mudra: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    
  // 🔹 Page Title

  document.title =
    "Mudra Loan Apply Online | Shishu, Kishore & Tarun | RupeeDial";

  // 🔹 Meta Description
  const desc =
    "Apply Mudra Loan online under Pradhan Mantri Mudra Yojana (PMMY). Get Shishu, Kishore & Tarun loans up to ₹10 Lakh. Collateral-free business loans with expert assistance by RupeeDial.";

  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", desc);

  // 🔹 Canonical URL
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", "https://rupeedial.com/mudra-loan");
}, []);

  const [uploaded, setUploaded] = useState<UploadedDocs>({
   
    kyc: [],
    bankStatement: [],
    itr: [],
    other: [],
  });

  const [leadId] = useState(
    () => "Mudra-" + Math.floor(100000 + Math.random() * 900000)
  );
const [successData, setSuccessData] = useState<{
  applicationId: string;
  
} | null>(null);
  const [form, setForm] = useState<MsmeForm>({
    fullName: "",
    email: "",
    mobile: "",
    loanAmount: "",
    location: "",
    businessType: "",

    vintage: "",
    acceptPrivacy: false,
    existingEmi: "",
    pan: "",
    aadhaar: "",
    mudraCategory: "",
  });
const resetForm = () => {
  setForm({
    fullName: "",
    email: "",
    mobile: "",
    loanAmount: "",
    location: "",
    businessType: "",
    vintage: "",
    acceptPrivacy: false,
    existingEmi: "",
    pan: "",
    aadhaar: "",
    mudraCategory: "",
   
  });

  setUploaded({
    kyc: [],
    bankStatement: [],
    itr: [],
    other: [],
  });
};

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setForm((prev) => ({ ...prev, [name]: target.checked }));
      return;
    }

    if (type === "number") {
      const numValue = value === "" ? "" : Number(value);

      setForm((prev) => ({
        ...prev,
        [name]: numValue,
...(name === "loanAmount" &&
  typeof numValue === "number" &&
  prev.mudraCategory === ""
  ? { mudraCategory: getMudraCategoryFromAmount(numValue) }
  : {})

      }));
      return;
    }
setForm((prev) => ({ ...prev, [name]: value }));

// ✅ error remove on typing
setErrors((prev) => {
  const updated = { ...prev };
  delete updated[name];
  return updated;
  
});
  };

 

const handleFileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  key: keyof UploadedDocs
) => {
  const files = e.currentTarget.files;
  if (!files) return;

  const maxSize = 5 * 1024 * 1024;

const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

const validFiles = Array.from(files).filter(file => {
  if (!allowedTypes.includes(file.type)) {
    alert("Only JPG, PNG, PDF allowed");
    return false;
  }

  if (file.size > maxSize) {
    alert("File too large (max 5MB)");
    return false;
  }

  return true;
});
  setUploaded((prev) => ({
    ...prev,
    [key]: validFiles,
  }));
};

  const eligibleLoan = useMemo(() => {
  if (!form.mudraCategory) return 0;
  return MUDRA_LIMITS[form.mudraCategory];
}, [form.mudraCategory]);

  // -------- STEP HANDLERS ----------

 const validateStep1 = (): boolean => {
  const newErrors: Record<string, string> = {};

  if (!form.fullName.trim()) {
    newErrors.fullName = "Full Name is required";
  }

  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    newErrors.email = "Valid Email is required";
  }

  if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) {
    newErrors.pan = "Valid PAN is required";
  }

  if (!/^[6-9]\d{9}$/.test(form.mobile)) {
    newErrors.mobile = "Valid Mobile required";
  }

  if (!form.loanAmount) {
    newErrors.loanAmount = "Enter loan amount";
  }

  if (!form.location) {
    newErrors.location = "Location required";
  }

  if (!form.businessType) {
    newErrors.businessType = "Select business type";
  }

  if (!form.vintage) {
    newErrors.vintage = "Select vintage";
  }

  if (!form.acceptPrivacy) {
    newErrors.acceptPrivacy = "Accept policy";
  }

  if (form.aadhaar && form.aadhaar.length !== 12) {
    newErrors.aadhaar = "Aadhaar must be 12 digits";
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};


const inputClass = `
w-full rounded-md border px-3 py-2 text-sm transition-all
focus:outline-none
`;
const handleFinalSubmit = async () => {
  if (!validateStep1()) return;

  if (loading) return; // ✅ yahan lao

  setLoading(true);// ✅ ADD

  const payload = {
    ...form,
    loanAmount: Number(form.loanAmount),
    existingEmi:
      typeof form.existingEmi === "number" ? form.existingEmi : 0,
  };

  const formData = new FormData();
  formData.append("loanDetails", JSON.stringify(payload));

  uploaded.kyc.forEach((f) => formData.append("kyc[]", f));
  uploaded.bankStatement.forEach((f) =>
    formData.append("bankStatement[]", f)
  );
  uploaded.itr.forEach((f) => formData.append("itr[]", f));
  uploaded.other.forEach((f) => formData.append("other[]", f));

  try {
    const res = await fetch(
      apiUrl("mudra-loan/apply"),
      {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      }
    );

    if (!res.ok) throw new Error("API failed");

    const data = await res.json();

    if (!data?.success) {
      alert(data?.message || "Submission failed");
      return;
    }

    setSuccessData({
      applicationId: data.applicationId || leadId,
    });
    resetForm();
  } catch {
    alert("Submission failed. Please try again.");
  } finally {
    setLoading(false); // ✅ ADD
  }
};
 
  const generateAndDownloadSlip = (applicationId: string) => {
  const content = `
====================================
        MUDRA LOAN APPLICATION
====================================

Application ID : ${applicationId}
Date           : ${new Date().toLocaleDateString("en-IN")}

Applicant Name : ${form.fullName}
Mobile Number  : ${form.mobile}
Email          : ${form.email}

Mudra Category : ${form.mudraCategory.toUpperCase()}
Loan Amount   : ₹${Number(form.loanAmount).toLocaleString("en-IN")}

Business Type : ${form.businessType}
Location      : ${form.location}
Vintage       : ${form.vintage}

Status        : SUBMITTED
Next Step     : BANK VERIFICATION
====================================
`;

  const blob = new Blob([content], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `Mudra_Application_${applicationId}.txt`;
  link.click();
};


  return (
    <div className="bg-white">
      {successData && (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h2 className="text-lg font-bold text-[#10662A] mb-2">
        🎉 Application Submitted Successfully
      </h2>

      <p className="text-sm text-[#390A5D] mb-4">
        Your Mudra Loan application has been submitted successfully.
        Please download your application slip for reference.
      </p>

      <div className="text-sm space-y-1 text-[#390A5D]">
        <p><strong>Application ID:</strong> {successData.applicationId}</p>
        <p><strong>Name:</strong> {form.fullName}</p>
        <p><strong>Mobile:</strong> {form.mobile}</p>
        <p><strong>Email:</strong> {form.email}</p>
        <p>
          <strong>Loan Amount:</strong> ₹
          {Number(form.loanAmount).toLocaleString("en-IN")}
        </p>
        <p>
          <strong>Mudra Category:</strong> {form.mudraCategory.toUpperCase()}
        </p>
      </div>

      <div className="flex gap-3 mt-6">
<button
  onClick={() =>
    generateAndDownloadSlip(successData!.applicationId)
  }

          className="flex-1 rounded-lg bg-[#10662A] text-white py-2 text-sm font-semibold"
        >
          Download Application Slip
        </button>

   <button
  onClick={() => {
    setSuccessData(null);
    resetForm();   // ✅ yahin clear hoga
  }}
>


          Close
        </button>
      </div>
    </div>
  </div>
)}

      {/* HERO */}
      <section className="bg-[#F5FFF8]  border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-6 flex flex-col md:flex-row items-center gap-10">
          {/* LEFT */}
          <div className="flex-1">
            <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#10662A] shadow-sm border border-[#d8efe6]">
              MSME . Loan
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#10662A] mb-3">
              Mudra Loan{" "}
              <span className="text-[#390A5D] ">
                Shishu, Kishore &amp; Tarun
              </span>
            </h1>
            <h2 className="text-base md:text-lg font-semibold text-[#10662A] mb-3">
              Easy Application • Collateral-Free Loans • PM Mudra Yojana
            </h2>
            <p className="text-sm md:text-base text-[#390A5D] mb-5 leading-relaxed">
             Mudra Loans under PMMY provide financial assistance to micro and small enterprises for business growth, asset purchase and working capital requirements, with a simplified application process and guided support.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#msme-wizard"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#10662A] text-white text-sm font-semibold shadow-sm hover:bg-[#0b4d20] transition"
              >
                Check Mudra Loan Eligibility
              </a>
              <a
                href="/expert"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#10662A] text-[#10662A] text-sm font-semibold bg-white hover:bg-[#e4f6ea] transition"
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
    src={MudraLoan}
    alt="Mudra Loan under PM Mudra Yojana – Shishu Kishore Tarun"
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
      <h2 className="text-xl md:text-2xl mt-8 font-bold text-[#10662A] text-center">
  Mudra Loan Application Form (PMMY)
</h2>
<p className="mt-2 text-sm text-[#390A5D] text-center">
  Fill in your basic details to apply under Pradhan Mantri Mudra Yojana.
  Our team will assist you throughout the process.
</p>

      <section
        id="msme-wizard"
        className="max-w-6xl mx-auto px-4 py-10 md:py-14"
      >

        <div className="bg-white rounded-xl shadow-md border border-[#d8efe6] p-4 md:p-6 space-y-6">

          <div className="grid md:grid-cols-3 gap-3">
            {[
              { key: "shishu", label: "Shishu", limit: "Up to ₹50,000" },
              { key: "kishore", label: "Kishore", limit: "Up to ₹5 Lakh" },
              { key: "tarun", label: "Tarun", limit: "Up to ₹10 Lakh" },
            ].map((c) => (
              <label
  key={c.key}
  className={`border rounded-lg p-3 cursor-pointer transition-all
    ${
      form.mudraCategory === c.key
        ? "border-[#10662A] bg-[#e6f4ea] shadow-md"
        : "border-slate-200 hover:border-[#10662A]"
    }
  `}
>
               <input
  type="radio"
  name="mudraCategory"
  value={c.key}
  checked={form.mudraCategory === c.key}
  onChange={() =>
    setForm(p => ({ ...p, mudraCategory: c.key as MudraCategory }))
  }
  className="mr-2 accent-[#10662A]"
/>
                <div className="font-semibold">{c.label}</div>
                <div className="text-xs text-slate-500">{c.limit}</div>
              </label>
            ))}
          </div>


          {/* Main form */}
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                  Full Name*
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}

className={`w-full rounded-md px-3 py-2 text-sm border transition-all
${errors.fullName 
  ? "border-red-500 focus:ring-2 focus:ring-red-500" 
  : "border-slate-200 focus:ring-2 focus:ring-[#10662A]"}
`}
                  placeholder="Enter your full name"
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
                 className={`w-full rounded-md border px-3 py-2 text-sm 
  ${errors.email ? "border-red-500" : "border-slate-200"}
  focus:ring-2 focus:ring-[#10662A]`}
                  placeholder="name@example.com"
                />
                {errors.email && (
  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
)}
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
                  className={`${inputClass} ${errors.pan ? "border-red-500" : ""}`}
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
               {errors.pan && (
  <p className="text-red-500 text-xs mt-1">{errors.pan}</p>
)}
              </div>

              {/* Aadhaar */}
              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  className={`${inputClass} ${errors.aadhaar ? "border-red-500" : ""}`}
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
  <p className="text-red-500 text-xs mt-1">{errors.aadhaar}</p>
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
                 className={`w-full rounded-md border px-3 py-2 text-sm 
  ${errors.mobile ? "border-red-500" : "border-slate-200"}
  focus:ring-2 focus:ring-[#10662A]`}
                  placeholder="10-digit mobile number"
                />
                {errors.mobile && (
  <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
)}
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                  Mudra Loan Amount Required*
                </label>
                <div>


                  <input
                    type="number"
                    name="loanAmount"
                    list="msme-loan-suggestions"
                    value={form.loanAmount}
                    onChange={handleChange}
                    min={5000}
                    placeholder="Enter or select loan amount"
                  className={`${inputClass} ${errors.loanAmount ? "border-red-500" : ""}`}
                  />
{errors.loanAmount && (
  <p className="text-red-500 text-xs mt-1">{errors.loanAmount}</p>
)}
                  <datalist id="msme-loan-suggestions">
                    {[5000, 10000, 25000, 50000, 100000, 300000, 500000, 1000000].map((amt) => (
                      <option key={amt} value={amt} />
                    ))}
                  </datalist>

                  <p className="mt-1 text-[11px] text-[#390A5D]">
                    You can type any amount or choose from suggestions (max ₹{" "}
                    {eligibleLoan.toLocaleString("en-IN")})
                  </p>
                </div>

              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                  Business Location*
                </label>
             <input
  type="text"
  name="location"
  list="cities"
  value={form.location}
  onChange={handleChange}
  className={`${inputClass} ${errors.location ? "border-red-500" : ""}`}
  placeholder="Enter or select city"
/>
{errors.location && (
  <p className="text-red-500 text-xs mt-1">{errors.location}</p>
)}
<datalist id="cities">
  {["Delhi","Mumbai","Bangalore","Lucknow","Jaipur","Bhopal"].map(c => (
    <option key={c} value={c} />
  ))}
</datalist>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                  Business Type*
                </label>
                <select
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 text-sm 
  ${errors.businessType ? "border-red-500" : "border-slate-200"}
  focus:ring-2 focus:ring-[#10662A]`}
                >

                  <option value="">Select Business Type</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="trading">Trading</option>
                  <option value="services">Services</option>
                  <option value="professional">Professional Services</option>
                </select>
{errors.businessType && (
  <p className="text-red-500 text-xs mt-1">{errors.businessType}</p>
)}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                  Business Vintage*
                </label>
                <select
                  name="vintage"
                  value={form.vintage}
                  onChange={handleChange}
                 className={`w-full rounded-md border px-3 py-2 text-sm 
  ${errors.vintage ? "border-red-500" : "border-slate-200"}`}
                >
               
                  <option value="">Select Business Age</option>
                  <option value="lt1">Less than 1 year</option>
                  <option value="1-3">1 – 3 years</option>
                  <option value="3-5">3 – 5 years</option>
                  <option value="gt5">More than 5 years</option>
                </select>
                   {errors.vintage && (
  <p className="text-red-500 text-xs mt-1">{errors.vintage}</p>
)}
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
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]"
                  placeholder="Total of existing EMIs (if any)"
                />
                {errors.existingEmi && (
  <p className="text-red-500 text-xs mt-1">{errors.existingEmi}</p>
)}
              </div>
            </div>



            {/* DOCUMENT UPLOADS */}
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              <div>
                <label className="text-xs font-semibold text-[#390A5D]">
                  KYC Documents (PAN / Aadhaar)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "kyc")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#390A5D]">
                  Bank Statement (Last 6–12 months)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "bankStatement")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#390A5D]">
                  ITR / Financials
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "itr")}
                  className={inputClass}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#390A5D]">
                  Other Supporting Documents
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => handleFileChange(e, "other")}
                  className={inputClass}
                />
              </div>
            </div>


          <div className={`flex items-start gap-2 pt-2 p-3 rounded-md transition-all
  ${errors.acceptPrivacy ? "border border-red-500 bg-red-50" : ""}
`}>
  <input
    id="acceptPrivacy"
    type="checkbox"
    name="acceptPrivacy"
    checked={form.acceptPrivacy}
    onChange={handleChange}
    className={`mt-1 h-4 w-4 cursor-pointer
      ${errors.acceptPrivacy ? "accent-red-500" : "accent-[#10662A]"}
    `}
  />

  <label htmlFor="acceptPrivacy" className="text-xs text-[#390A5D] leading-relaxed cursor-pointer">
    I authorize Rupeedial / its partners to call, SMS or email me
    regarding MSME loan assistance. I have read and accepted the{" "}
    <span className="text-[#10662A] underline">privacy policy</span>.
  </label>
</div>

{/* ✅ ERROR MESSAGE */}
{errors.acceptPrivacy && (
  <p className="text-red-500 text-xs mt-1 ml-1">
    {errors.acceptPrivacy}
  </p>
)}

            <div className="flex justify-center mt-4">
             <button
  type="button"
  onClick={handleFinalSubmit}
  disabled={loading}
  className="rounded-lg border-2 border-[#10662A] bg-[#10662A] px-6 py-2 text-sm font-semibold text-white"
>
  {loading ? "Submitting..." : "Submit Mudra Application"}
</button>


            </div>
          </div>
        </div>

      </section>   {/* ✅ CLOSE msme-wizard */}
      {/* INFO SECTION (What is MSME Loan) */}
<section className="mt-12 flex justify-center px-4">
  <div className="w-full max-w-5xl bg-white rounded-2xl shadow-md border border-[#d8efe6] p-5 sm:p-8">

    <h2 className="text-xl sm:text-2xl font-bold text-[#10662A] text-center mb-4">
      What Is Mudra Loan (PMMY)?
    </h2>

    <p className="text-sm sm:text-base text-[#390A5D] leading-relaxed text-center max-w-3xl mx-auto">
      Mudra Loans under <strong>Pradhan Mantri Mudra Yojana (PMMY)</strong> are
      government-backed business loans designed to support micro and small
      enterprises across India. These loans help entrepreneurs, shop owners,
      traders and service providers meet business funding needs without
      collateral.
    </p>

    <h3 className="text-lg font-semibold text-[#10662A] text-center mt-8 mb-4">
      Benefits of Mudra Loan
    </h3>

    <ul className="max-w-3xl mx-auto space-y-3 text-sm sm:text-base text-[#390A5D]">
      <li className="flex gap-2">
        <span className="font-bold text-[#10662A]">✓</span>
        Fast approval with minimal documentation
      </li>
      <li className="flex gap-2">
        <span className="font-bold text-[#10662A]">✓</span>
        Collateral-free loans under PMMY
      </li>
      <li className="flex gap-2">
        <span className="font-bold text-[#10662A]">✓</span>
        Flexible usage for working capital & business growth
      </li>
      <li className="flex gap-2">
        <span className="font-bold text-[#10662A]">✓</span>
        Suitable for Shishu, Kishore & Tarun categories
      </li>
    </ul>

    <h3 className="text-lg font-semibold text-[#10662A] text-center mt-8 mb-4">
      Documents Required (Indicative)
    </h3>

    <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-[#390A5D]">
      <div>• PAN Card & Aadhaar Card</div>
      <div>• Business Registration / GST / Udyam</div>
      <div>• Last 6–12 Months Bank Statement</div>
      <div>• ITR / Basic Financial Details (if available)</div>
      <div>• Business Address Proof</div>
    </div>

  </div>
</section>

<section className="mt-10 bg-[#F5FFF8] py-8">
  <div className="max-w-6xl mx-auto px-4">

    <h2 className="text-xl font-bold text-[#10662A] text-center mb-6">
      Mudra Loan FAQs
    </h2>

    {/* ✅ 2 in one row */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      <details className="bg-white rounded-lg border border-[#d8efe6] p-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          What is Mudra Loan under PMMY?
        </summary>
        <p className="mt-1 text-xs text-[#390A5D]">
          Government-backed collateral-free business loan under PM Mudra Yojana.
        </p>
      </details>

      <details className="bg-white rounded-lg border border-[#d8efe6] p-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          Mudra loan categories?
        </summary>
        <p className="mt-1 text-xs text-[#390A5D]">
          Shishu (₹50k), Kishore (₹5L), Tarun (₹10L).
        </p>
      </details>

      <details className="bg-white rounded-lg border border-[#d8efe6] p-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          Who can apply?
        </summary>
        <p className="mt-1 text-xs text-[#390A5D]">
          Small business owners, traders & service providers.
        </p>
      </details>

      <details className="bg-white rounded-lg border border-[#d8efe6] p-3">
        <summary className="cursor-pointer text-sm font-semibold text-[#390A5D]">
          Is collateral required?
        </summary>
        <p className="mt-1 text-xs text-[#390A5D]">
          No, Mudra loans are collateral-free.
        </p>
      </details>

     

    </div>
  </div>
</section>


    </div>
 
  );
};

export default Mudra;
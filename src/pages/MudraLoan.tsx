// src/pages/Msme.tsx
import React, { useState, useMemo } from "react";
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
        ...(name === "loanAmount" && typeof numValue === "number"
          ? { mudraCategory: getMudraCategoryFromAmount(numValue) }
          : {}),
      }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

 

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof UploadedDocs
  ) => {
    const files = e.currentTarget.files;
    if (!files) return;

    setUploaded((prev) => ({
      ...prev,
      [key]: Array.from(files),
    }));
  };

  const eligibleLoan = useMemo(() => {
  if (!form.mudraCategory) return 0;
  return MUDRA_LIMITS[form.mudraCategory];
}, [form.mudraCategory]);

  // -------- STEP HANDLERS ----------

  const validateStep1 = (): boolean => {
    const errors: string[] = [];

    if (!form.fullName.trim()) errors.push("Full Name is required");
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.push("Valid Email is required");
    }
    if (!form.mobile || form.mobile.toString().length !== 10) {
      errors.push("Valid 10 digit mobile number is required");
    }
    if (!form.mudraCategory) {
      errors.push("Please select Mudra category (Shishu / Kishore / Tarun)");
    }

    if (!form.loanAmount) {
      errors.push("Please enter Mudra loan amount");
    } else if (
      typeof form.loanAmount === "number" &&
      form.loanAmount > eligibleLoan
    ) {
      errors.push(
        `Maximum allowed amount for selected Mudra category is ₹${eligibleLoan.toLocaleString("en-IN")}`
      );
    }
    if (!form.location) errors.push("Business location is required");
    if (!form.businessType) errors.push("Business type is required");

    if (!form.vintage) errors.push("Business vintage is required");
    if (!form.acceptPrivacy)
      errors.push("You must accept the privacy policy & authorization");

    // existingEmi optional hai, isliye yahan koi error nahi

    if (errors.length) {
      alert(errors[0]); // show first error
      return false;
    }
    return true;
  };


  const inputClass =
    "w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:ring-2 focus:ring-[#10662A]";

 const handleFinalSubmit = async () => {
  if (!validateStep1()) return;

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
  "https://rupeedial.com/rupeedial-backend/public/api/index.php?action=mudra-loan/apply",
  {
    method: "POST",
    body: formData,
  }
);


    if (!res.ok) throw new Error("API failed");

const data = await res.json();

if (!data?.success) {
  throw new Error("Submission failed");
}

setSuccessData({
  applicationId: data.applicationId || leadId,
});
  } catch {
  alert("Submission failed. Please try again.");
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
          onClick={() => setSuccessData(null)}
          className="flex-1 rounded-lg border border-slate-300 py-2 text-sm"
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
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#10662A] text-white text-sm font-semibold shadow-sm none:bg-[#0b4d20] transition"
              >
                Check Mudra Loan Eligibility
              </a>
              <a
                href="/expert"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-[#10662A] text-[#10662A] text-sm font-semibold bg-white none:bg-[#e4f6ea] transition"
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
                src={MudraLoan}
                alt="MSME Loan Illustration"
                className="w-[260px] sm:w-[300px] md:w-[340px] h-auto  rounded-xl object-contain"
              />
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
              <label key={c.key} className="border rounded-lg p-3 cursor-pointer">
                <input
                  type="radio"
                  name="mudraCategory"
                  value={c.key}
                  checked={form.mudraCategory === c.key}
                  onChange={() =>
                    setForm(p => ({ ...p, mudraCategory: c.key as MudraCategory }))
                  }
                  className="hidden"
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

                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]"
                  placeholder="Enter your full name"
                />
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
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]"
                  placeholder="name@example.com"
                />
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
                  className={inputClass}
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
              </div>

              {/* Aadhaar */}
              <div>
                <label className="text-xs font-semibold text-slate-700">
                  Aadhaar Number
                </label>
                <input
                  type="text"
                  name="aadhaar"
                  className={inputClass}
                  maxLength={12}
                  value={form.aadhaar}
                  onChange={(e) =>
                    setForm(p => ({
                      ...p,
                      aadhaar: e.target.value.replace(/\D/g, "").slice(0, 12),
                    }))
                  }
                />

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
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#10662A]"
                  placeholder="10-digit mobile number"
                />
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
                    min={100000}
                    placeholder="Enter or select loan amount"
                    className={inputClass}
                  />

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
                <select
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]"
                >
                  <option value="">Select Location</option>
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
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#390A5D] mb-1.5">
                  Business Type*
                </label>
                <select
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]"
                >
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
                  Business Vintage*
                </label>
                <select
                  name="vintage"
                  value={form.vintage}
                  onChange={handleChange}
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]"
                >
                  <option value="">Select Business Age</option>
                  <option value="lt1">Less than 1 year</option>
                  <option value="1-3">1 – 3 years</option>
                  <option value="3-5">3 – 5 years</option>
                  <option value="gt5">More than 5 years</option>
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
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10662A] focus:border-[#10662A]"
                  placeholder="Total of existing EMIs (if any)"
                />
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
                onClick={handleFinalSubmit}
                className="rounded-lg border-2 border-[#10662A] bg-[#10662A] px-6 py-2 text-sm font-semibold text-[#ffffff]
           "
              >
                Submit Mudra Application
              </button>


            </div>
          </div>
        </div>

      </section>   {/* ✅ CLOSE msme-wizard */}
      {/* INFO SECTION (What is MSME Loan) */}
      <section className="mt-10 bg-white rounded-xl  pl-16 text-left shadow-md border border-[#d8efe6] p-4 md:p-6">
        <h2 className="text-lg  font-bold text-[#10662A] text-center mb-3">
          What Is Mudra Loan (PMMY)?
        </h2>

        <p className="text-sm  pl-32 text-[#390A5D] mb-4">
        Mudra Loans (Pradhan Mantri Mudra Yojana – PMMY) are government-backed business loans designed to support micro and small enterprises across India. These loans help entrepreneurs, shop owners, traders, manufacturers and service providers meet their business funding needs without heavy collateral requirements.
        </p>

        <h3 className="text-base  font-semibold text-[#10662A] mt-4 mb-2 text-center">
          Benefits of MSME Loan
        </h3>

       <ul className="list-disc list-inside pl-32 text-sm text-[#390A5D] space-y-1 mb-4">
  <li>
    <span className="font-semibold">Fast Approval Process</span> — Quick
    eligibility check with minimal documentation under PM Mudra Yojana.
  </li>
  <li>
    <span className="font-semibold">Multi-purpose Usage</span> — Loan amount
    can be used for working capital, machinery purchase, inventory, shop setup
    or business expansion.
  </li>
  <li>
    <span className="font-semibold">Collateral-free Loans</span> — No collateral
    required for eligible Mudra loan categories as per government guidelines.
  </li>
  <li>
    <span className="font-semibold">Flexible Repayment Tenure</span> — Repayment
    period usually ranges from 12 to 60 months, depending on lender policies.
  </li>
</ul>
        <h3 className="text-base font-semibold text-[#10662A] mt-4 mb-2 text-center">
          Documents Required (Indicative)
        </h3>

        <ul className="list-disc list-inside pl-32 text-sm text-[#390A5D] space-y-1">
  <li>Applicant KYC Documents (PAN Card, Aadhaar Card)</li>
  <li>Business Proof / Registration Certificate (GST, Udyam, Shop Act, etc.)</li>
  <li>Bank Statement of Last 6–12 Months</li>
  <li>Income Proof / ITR or Basic Financial Details (if applicable)</li>
  <li>Business Address Proof</li>
</ul>

      </section>
    </div>
 
  );
};

export default Mudra;
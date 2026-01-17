// src/pages/Insurance.tsx
import React, { useState } from "react";
import insurance from "../assets/images/insurance.png";
import jsPDF from "jspdf";

type InsuranceType = "health" | "life" | "motor" | "term" | "travel" | "";

interface UserDetails {
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  age: string;
  insuranceType: InsuranceType;
  coverageType: "individual" | "family" | "";
  members: string;
  sumInsured: string;
  preExisting: "yes" | "no";
  smoker: "yes" | "no";
  existingEmi: string; // ✅ optional EMIs
}

interface Plan {
  id: string;
  name: string;
  sumInsuredLabel: string;
  premiumLabel: string;
  coverageLabel: string;
  cashlessHospitals: string;
  claimSettlement: string;
  note: string;
}

const basePlans: Plan[] = [
  {
    id: "plan1",
    name: "HDFC ERGO Health Insurance",
    sumInsuredLabel: "₹ 5,00,000",
    premiumLabel: "₹ 8,200",
    coverageLabel: "Family Floater",
    cashlessHospitals: "10,000+",
    claimSettlement: "97%",
    note: "No claim bonus, day care procedures & more.",
  },
  {
    id: "plan2",
    name: "ICICI Lombard Health Insurance",
    sumInsuredLabel: "₹ 5,00,000",
    premiumLabel: "₹ 7,900",
    coverageLabel: "Individual",
    cashlessHospitals: "8,500+",
    claimSettlement: "96%",
    note: "In-house claim settlement support.",
  },
  {
    id: "plan3",
    name: "Star Health Family Insurance",
    sumInsuredLabel: "₹ 10,00,000",
    premiumLabel: "₹ 13,500",
    coverageLabel: "Family Floater",
    cashlessHospitals: "12,000+",
    claimSettlement: "96%",
    note: "Good for families with parents included.",
  },
];

const cities = [
  "Delhi",
  "Mumbai",
  "Bengaluru",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Kolkata",
  "Ahmedabad",
];

const InsurancePage: React.FC = () => {
  const insuranceTypeLabel: Record<InsuranceType, string> = {
    health: "Health Insurance",
    term: "Loan Protection / Term Insurance",
    life: "Life Insurance",
    motor: "Motor Insurance",
    travel: "Travel Insurance",
    "": "-",
  };

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loadingQuotes, setLoadingQuotes] = useState(false);
  const [referenceId, setReferenceId] = useState<string>("");
  const [userDetails, setUserDetails] = useState<UserDetails>({
    fullName: "",
    email: "",
    mobile: "",
    city: "",
    age: "",
    insuranceType: "",
    coverageType: "",
    members: "1",
    sumInsured: "500000",
    preExisting: "no",
    smoker: "no",
    existingEmi: "",
  });
  const [plans, setPlans] = useState<Plan[]>(basePlans);
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || null;
function downloadSlip() {
  if (!selectedPlan) {
    alert("No plan found to download.");
    return;
  }

  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("RUPEEDIAL – INSURANCE REQUEST SLIP", 105, 20, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 30);

  doc.line(14, 34, 196, 34);

  let y = 45;

  doc.text(`Name: ${userDetails.fullName}`, 14, y); y += 7;
  doc.text(`Mobile: +91 ${userDetails.mobile}`, 14, y); y += 7;
  doc.text(`City: ${userDetails.city}`, 14, y); y += 7;

  doc.line(14, y, 196, y);
  y += 8;

  doc.text(
    `Insurance Type: ${insuranceTypeLabel[userDetails.insuranceType]}`,
    14,
    y
  ); y += 7;

  doc.text(
    `Sum Insured: ₹ ${Number(userDetails.sumInsured).toLocaleString("en-IN")}`,
    14,
    y
  ); y += 7;

  doc.line(14, y, 196, y);
  y += 8;

  doc.text(`Selected Plan: ${selectedPlan.name}`, 14, y); y += 7;
  doc.text(`Yearly Premium: ${selectedPlan.premiumLabel}`, 14, y); y += 10;

  doc.setFontSize(9);
  doc.text(
    "This is a system-generated slip confirming your insurance request. "
    + "Final policy issuance is subject to insurer underwriting and approval.",
    14,
    y,
    { maxWidth: 180 }
  );

  doc.save("Rupeedial_Insurance_Request.pdf");
}

  // approx premium calculation
  const estimatedPremium = (() => {
    const si = parseFloat(userDetails.sumInsured || "0");
    if (!si || si <= 0) return "₹ 0";

    let riskFactor = 1;
    if (userDetails.smoker === "yes") riskFactor += 0.2;
    if (userDetails.preExisting === "yes") riskFactor += 0.25;

    const approx = Math.round(si * 0.014 * riskFactor);
    return `₹ ${approx.toLocaleString("en-IN")} (indicative)`;
  })();


  const progressPercent = step * 25;

  function handleChange<K extends keyof UserDetails>(
    key: K,
    value: UserDetails[K]
  ) {
    setUserDetails((prev) => ({ ...prev, [key]: value }));
  }

  function validateStep1(): boolean {
    const {
      fullName,
      email,
      mobile,
      city,
      age,
      insuranceType,
      coverageType,
      sumInsured,
    } = userDetails;

    if (
      !fullName.trim() ||
      !email.trim() ||
      !mobile.trim() ||
      !city ||
      !age.trim() ||
      !insuranceType ||
      !coverageType ||
      !sumInsured.trim()
    ) {
      alert("Please fill all required fields.");
      return false;
    }

    if (!/^\d{10}$/.test(mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return false;
    }

    const ageNum = Number(age);
    if (Number.isNaN(ageNum) || ageNum < 18 || ageNum > 75) {
      alert("Please enter valid age between 18 and 75.");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address.");
      return false;
    }

    return true;
  }
async function handleNextFromStep1() {
  if (
    userDetails.insuranceType !== "health" &&
    userDetails.insuranceType !== "term"
  ) {
    alert(
      "Currently, Rupeedial assists with Health and Loan Protection insurance plans only."
    );
    return;
  }

  if (!validateStep1()) return;

  setLoadingQuotes(true);
  setStep(2);

  try {
    const res = await fetch(
      
      "https://rupeedial.com/rupeedial-backend/public/index.php?action=insurance/apply",

      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetails),
      }
    );

    const data = await res.json();

    // ✅ backend ready hoga tab use hoga
    if (data?.success && Array.isArray(data.plans)) {
      setPlans(data.plans);
    } else {
      // 🔥 fallback (MOST IMPORTANT)
      setPlans(basePlans);
    }
  } catch {
    // 🔥 backend down / not ready
    setPlans(basePlans);
  } finally {
    setLoadingQuotes(false);
  }
}



  function handleSelectPlan(id: string) {
    setSelectedPlanId(id);
  }

  function handleNextFromStep2() {
    if (!selectedPlan) {
      alert("Please select a plan first.");
      return;
    }
    setStep(3);
  }

  async function handleSubmitApplication() {
  if (!selectedPlan) {
    alert("Please select a plan first.");
    return;
  }

  try {
    const res = await fetch(
      "https://rupeedial.com/rupeedial-backend/public/index.php?action=insurance/apply"
,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userDetails,
          selectedPlan,
        }),
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Submission failed");
    }

    setReferenceId(data.referenceId);
    setStep(4);
    window.scrollTo({ top: 0, behavior: "smooth" });
  } catch (err) {
  const message =
    err instanceof Error ? err.message : "Unable to fetch plans";
  alert(message);
}

}
function resetWizard() {
  setStep(1);
  setSelectedPlanId(null);
  setReferenceId("");
}

  // ✅ same green input style as Home / LAP
  const inputClass =
    "w-full rounded-md border border-[#B0E9B2] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B0E9B2] focus:border-[#B0E9B2]";
  const selectClass =
    "w-full rounded-md border border-[#B0E9B2] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B0E9B2] focus:border-[#B0E9B2]";

  return (
    <main className="bg-white text-[#390A5D]">
      {/* Hero */}
      <section className="bg-[#F5FFF8] border-b border-[#d8efe6]">
        <div className="max-w-6xl mx-auto px-4 py-10 md:py-12">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-8">
            {/* left */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#10662A] shadow-sm border border-[#d8efe6]">
                Insurance · Loan Protection · Health
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold text-[#10662A] mb-3">
                Insurance That Strengthens{" "}
                <span className="text-[#390A5D]">
                  {" "}
                  Your Loan &amp; Financial Security
                </span>
              </h1>

              <h2 className="text-base md:text-lg font-semibold text-[#10662A] mb-3">
                Expert-recommended insurance plans trusted by banks & NBFCs
              </h2>
              <p>
                Secure your loan EMIs, health and family with insurance plans
                recommended by Rupeedial loan experts. Zero spam. Assisted support.
              </p>
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg bg-[#10662A] px-4 py-2 text-sm font-semibold text-white shadow-sm"
                  onClick={() => {
                    const el = document.getElementById("insurance-wizard");
                    el?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                >
                  Get Free Quote
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg border border-[#10662A] bg-white px-4 py-2 text-sm font-semibold text-[#10662A]"
                  onClick={() => {
                    window.scrollTo({ top: 900, behavior: "smooth" });
                  }}
                >
                  Learn More
                </button>
              </div>
            </div>

            {/* right image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <div className="relative">
                <div className="absolute -top-4 -left-4 rounded-2xl bg-[#e4f6ea] w-24 h-24 blur-2xl opacity-70" />
                <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[#f3e9ff] w-24 h-24 blur-2xl opacity-70" />
                <div className="relative ">
                  <img
                    src={insurance}
                    alt="Insurance illustration"
                    className="w-full max-w-[380px] md:max-w-[420px] h-auto rounded-xl object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Wizard */}
      <section className="py-10 md:py-12 bg-white" id="insurance-wizard">
        <div className="max-w-6xl mx-auto px-4">
          {/* steps header */}
          <div className="bg-[#f5fff8] rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-xs md:text-sm font-semibold">
              {[
                "Choose Plan & Details",
                "View Best Quotes",
                "Share Details",
                "Confirmation",
              ].map((label, index) => {
                const idx = (index + 1) as 1 | 2 | 3 | 4;
                const isActive = step === idx;
                const isCompleted = step > idx;
                const baseClasses =
                  "flex items-center justify-center rounded-xl px-3 py-2 md:py-3 text-center transition";
                let stateClasses = "";
                if (isCompleted) {
                  stateClasses = "bg-[#10662A] text-white";
                } else if (isActive) {
                  stateClasses = "bg-[#390A5D] text-white";
                } else {
                  stateClasses =
                    "bg-slate-100 text-[#390A5D] border border-slate-200";
                }
                return (
                  <div key={label} className={`${baseClasses} ${stateClasses}`}>
                    {isCompleted ? "✓ " : `${idx}. `} {label}
                  </div>
                );
              })}
            </div>

            {/* progress */}
            <div className="mt-4 h-1.5 w-full rounded-full bg-[#f5fff8] overflow-hidden">
              <div
                className="h-full bg-[#10662A] rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* STEP 1 – same green style as Home Loan */}
          {step === 1 && (
            <div className="bg-[#f5fff8] rounded-xl shadow-sm border border-slate-100 p-4 md:p-6 space-y-6">
              {/* summary strip */}
              <div className="bg-[#B0E9B2] rounded-lg p-4 md:p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-sm text-[#10662A] text-sm font-bold">
                    ₹
                  </span>
                  <div>
                    <p className="text-xs font-semibold text-[#390A5D] uppercase tracking-wide">
                      Coverage Summary
                    </p>
                    <p className="text-[13px] text-[#390A5D]">
                      Select sum insured to see an approximate yearly premium.
                    </p>
                    <p className="text-[10px] text-[#390A5D]/70">
                      Final premium may vary after insurer underwriting & medical review
                    </p>

                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] text-[#390A5D]">
                    Estimated Yearly Premium (Indicative)
                  </p>
                  <p className="font-semibold text-sm md:text-base text-[#10662A]">
                    {estimatedPremium}
                  </p>
                </div>
              </div>
              {userDetails.existingEmi && (
                <div className="rounded-lg bg-white border border-[#d8efe6] p-3 text-xs text-[#390A5D]">
                  <p className="font-semibold text-[#10662A]">
                    EMI Impact Insight
                  </p>
                  <p>
                    Your existing monthly EMI is ₹{" "}
                    {Number(userDetails.existingEmi).toLocaleString("en-IN")}. Insurance
                    premium is paid yearly and does not significantly affect your loan EMI
                    or loan eligibility.
                  </p>
                </div>
              )}

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextFromStep1();
                }}
              >
                {/* top row: type + sum insured + coverage (2 columns) */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      Insurance Type *
                    </label>
                    <select
                      className={selectClass}
                      value={userDetails.insuranceType}
                      onChange={(e) =>
                        handleChange(
                          "insuranceType",
                          e.target.value as InsuranceType
                        )
                      }
                    >
                      <option value="">Select type</option>
                      <option value="health">Health Insurance (Recommended with Loans)</option>
                      <option value="term">Loan Protection / Term Insurance</option>

                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      Sum Insured (₹) *
                    </label>
                    <input
                      type="number"
                      min={100000}
                      className={inputClass}
                      value={userDetails.sumInsured}
                      onChange={(e) =>
                        handleChange("sumInsured", e.target.value)
                      }
                    />
                    <p className="mt-1 text-[11px] text-[#390A5D]">
                      Minimum ₹1,00,000
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      Coverage Type *
                    </label>
                    <select
                      className={selectClass}
                      value={userDetails.coverageType}
                      onChange={(e) =>
                        handleChange(
                          "coverageType",
                          e.target.value as UserDetails["coverageType"]
                        )
                      }
                    >
                      <option value="">Select</option>
                      <option value="individual">Individual</option>
                      <option value="family">Family Floater</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs grid grid-cols-1 md:grid-cols-2 gap-4 font-semibold mb-1 text-[#390A5D]">
                      Do you smoke / consume tobacco?
                    </label>
                    <select
                      className={selectClass}
                      value={userDetails.smoker}
                      onChange={(e) =>
                        handleChange(
                          "smoker",
                          e.target.value as UserDetails["smoker"]
                        )
                      }
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                </div>

                {/* personal info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      className={inputClass}
                      value={userDetails.fullName}
                      onChange={(e) =>
                        handleChange("fullName", e.target.value)
                      }
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      className={inputClass}
                      value={userDetails.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="name@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      Mobile Number*
                    </label>
                    <input
                      type="tel"
                      maxLength={10}
                      className={inputClass}
                      value={userDetails.mobile}
                      onChange={(e) =>
                        handleChange(
                          "mobile",
                          e.target.value.replace(/\D/g, "")
                        )
                      }
                      placeholder="10-digit mobile number"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      City*
                    </label>
                    <select
                      className={selectClass}
                      value={userDetails.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* age + members */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      Primary Insured Age*
                    </label>
                    <input
                      type="number"
                      min={18}
                      max={75}
                      className={inputClass}
                      value={userDetails.age}
                      onChange={(e) => handleChange("age", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      No. of Members
                    </label>
                    <select
                      className={selectClass}
                      value={userDetails.members}
                      onChange={(e) =>
                        handleChange("members", e.target.value)
                      }
                    >
                      <option value="1">1 (Self)</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                </div>

                {/* Pre-existing + EMIs */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      Pre-existing Disease
                    </label>
                    <select
                      className={selectClass}
                      value={userDetails.preExisting}
                      onChange={(e) =>
                        handleChange(
                          "preExisting",
                          e.target.value as UserDetails["preExisting"]
                        )
                      }
                    >
                      <option value="no">No</option>
                      <option value="yes">Yes</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-[#390A5D]">
                      Existing EMIs (total per month – optional)
                    </label>
                    <input
                      type="number"
                      min={0}
                      className={inputClass}
                      value={userDetails.existingEmi}
                      onChange={(e) =>
                        handleChange("existingEmi", e.target.value)
                      }
                      placeholder="Eg. 8,000"
                    />
                  </div>
                </div>

                {/* smoker + consent */}
                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

                  <div className="flex items-center mt-6 md:mt-8 text-xs text-[#390A5D]">
                    <input
                      id="policy-consent"
                      type="checkbox"
                      className="h-4 w-4 rounded border-[#B0E9B2] text-[#10662A] focus:ring-[#B0E9B2]"
                      required
                    />
                    <label
                      htmlFor="policy-consent"
                      className="ml-2 leading-relaxed"
                    >
                      I authorize Rupeedial / its partners to call or email me
                      for insurance assistance. I agree to the{" "}
                      <span className="underline underline-offset-2 text-[#10662A]">
                        privacy policy
                      </span>
                      .
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap justify-center md:justify-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center rounded-lg bg-[#10662A] px-6 py-2.5 text-sm font-semibold text-white shadow-sm"
                  >
                    View Best Quotes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="bg-white rounded-2xl shadow-md border border-[#d8efe6] p-4 md:p-6 space-y-6">
              {loadingQuotes ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="h-10 w-10 rounded-full border-2 border-[#10662A] border-t-transparent animate-spin" />
                  <p className="text-sm text-[#390A5D]">
                    Checking best plans across multiple insurers…
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-xl border border-[#d8efe6] bg-[#F5FFF8] px-4 py-3">
                    <div>
                      <p className="text-xs font-semibold text-[#10662A] uppercase tracking-wide">
                        Plans Available
                      </p>
                      <p className="text-[13px] text-[#390A5D]">
                        Based on your details we have shortlisted some of the
                        best plans for you.
                      </p>
                      <p className="text-xs text-[#390A5D] mt-1">
                        Plans recommended by Rupeedial insurance & loan experts
                        based on your financial profile.
                      </p>

                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-[#390A5D]/80">
                        Sum Insured
                      </p>
                      <p className="font-semibold text-sm text-[#10662A]">
                        ₹{" "}
                        {(
                          parseFloat(userDetails.sumInsured || "500000") ||
                          500000
                        ).toLocaleString("en-IN")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {plans.map((plan) => {
                      const isSelected = plan.id === selectedPlanId;
                      return (
                        <div
                          key={plan.id}
                          className={`rounded-2xl border px-4 py-4 md:px-5 md:py-4 transition cursor-pointer ${isSelected
                              ? "border-[#10662A] bg-[#F5FFF8] shadow-sm"
                              : "border-slate-200 bg-white hover:border-[#10662A]/60 hover:shadow-sm"
                            }`}
                          onClick={() => handleSelectPlan(plan.id)}
                        >
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-[#390A5D]">
                                {plan.name}
                              </h3>
                              <p className="mt-1 text-[12px] text-[#390A5D]">
                                {plan.note}
                              </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs md:text-sm text-[#390A5D]">
                              <div>
                                <p className="opacity-70">Sum Insured</p>
                                <p className="font-semibold">
                                  {plan.sumInsuredLabel}
                                </p>
                              </div>
                              <div>
                                <p className="opacity-70">Yearly Premium</p>
                                <p className="font-semibold">
                                  {plan.premiumLabel}
                                </p>
                              </div>
                              <div>
                                <p className="opacity-70">Coverage Type</p>
                                <p className="font-semibold">
                                  {plan.coverageLabel}
                                </p>
                              </div>
                              <div>
                                <p className="opacity-70">Cashless Hospitals</p>
                                <p className="font-semibold">
                                  {plan.cashlessHospitals}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  </div>

                  <div className="flex flex-wrap justify-center md:justify-between gap-3 pt-2">
                    <button
                      type="button"
                      className="inline-flex items-center rounded-lg border border-[#390A5D] bg-white px-4 py-2 text-sm font-semibold text-[#390A5D] hover:bg-[#F5FFF8]"
                      onClick={() => setStep(1)}
                    >
                      ← Back to details
                    </button>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center rounded-lg border border-amber-400 bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100"
                        onClick={handleNextFromStep1}
                      >
                        Recalculate
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center rounded-lg bg-[#10662A] px-4 py-2 text-sm font-semibold text-white shadow-sm disabled:opacity-60"
                        disabled={!selectedPlan}
                        onClick={handleNextFromStep2}
                      >
                        Proceed with selected plan →
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && selectedPlan && (
            <div className="bg-white rounded-2xl shadow-md border border-[#d8efe6] p-4 md:p-6 space-y-6">
              <div className="rounded-2xl border border-[#10662A] bg-[#F5FFF8] px-4 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#10662A] uppercase tracking-wide">
                    Selected Plan
                  </p>
                  <p className="text-sm font-semibold text-[#390A5D]">
                    {selectedPlan.name}
                  </p>
                  <p className="mt-1 text-[12px] text-[#390A5D]">
                    Sum Insured: {selectedPlan.sumInsuredLabel} · Premium:{" "}
                    {selectedPlan.premiumLabel} · Coverage:{" "}
                    {selectedPlan.coverageLabel}
                  </p>
                </div>
              </div>

              {/* read-only summary */}
              <div className="grid md:grid-cols-2 gap-4 text-sm text-[#390A5D]">
                <div className="space-y-2">
                  <p className="font-semibold">Personal Information</p>
                  <div className="rounded-lg border border-slate-200 bg-[#F5FFF8] px-3 py-2">
                    <div className="flex justify-between">
                      <span>Name</span>
                      <span className="font-medium">
                        {userDetails.fullName}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Email</span>
                      <span>{userDetails.email}</span>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>Mobile</span>
                      <span>+91 {userDetails.mobile}</span>
                    </div>
                  </div>

                  <div className="rounded-lg border border-slate-200 bg-[#F5FFF8] px-3 py-2 mt-2 text-xs">
                    <div className="flex justify-between">
                      <span>City</span>
                      <span>{userDetails.city}</span>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span>Age</span>
                      <span>{userDetails.age} yrs</span>
                    </div>
                    {Number(userDetails.age) < 21 && (
                      <p className="mt-1 rounded-md bg-amber-50 px-2 py-1 text-[11px] text-amber-700">
                        Note: Higher loan eligibility is generally available for applicants aged
                        21 years and above.
                      </p>
                    )}

                    <div className="flex justify-between mt-1">
                      <span>Members</span>
                      <span>{userDetails.members}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-semibold">Insurance Details</p>

                  <div className="rounded-lg border border-slate-200 bg-[#F5FFF8] px-4 py-3 text-xs space-y-2">

                    {/* BASIC DETAILS */}
                    <div className="flex justify-between">
                      <span>Type</span>
                      <span className="font-medium">
                        {insuranceTypeLabel[userDetails.insuranceType] || "-"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Coverage</span>
                      <span className="font-medium">
                        {userDetails.coverageType === "family"
                          ? "Family Floater"
                          : "Individual"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Sum Insured</span>
                      <span className="font-medium">
                        {userDetails.sumInsured
                          ? `₹ ${Number(userDetails.sumInsured).toLocaleString("en-IN")}`
                          : "-"}
                      </span>
                    </div>

                    <hr className="my-2 border-dashed border-slate-300" />

                    {/* RISK DETAILS */}
                    <div className="flex justify-between">
                      <span>Pre-existing Condition</span>
                      <span className="font-medium">
                        {userDetails.preExisting === "yes" ? "Yes" : "No"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Smoker / Tobacco</span>
                      <span className="font-medium">
                        {userDetails.smoker === "yes" ? "Yes" : "No"}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Existing EMIs</span>
                      <span className="font-medium">
                        {userDetails.existingEmi
                          ? `₹ ${Number(userDetails.existingEmi).toLocaleString("en-IN")}`
                          : "None"}
                      </span>
                    </div>
                  </div>

                  {/* LOAN ADVISORY – SEPARATE CARD */}
                  <div className="mt-3 rounded-lg border border-[#d8efe6] bg-white px-4 py-3 text-[11px] text-[#390A5D]">
                    <p className="font-semibold text-[#10662A] mb-1">
                      Loan Advisory Insight
                    </p>
                    <p>
                      Maintaining active insurance coverage improves your financial
                      credibility and supports smoother loan approval with banks and
                      NBFC partners.
                    </p>
                  </div>
                </div>


              </div>

              {/* consent + submit */}
              <div className="mt-4">
                <label className="flex items-start gap-2 text-xs text-[#390A5D]">
                  <input
                    type="checkbox"
                    className="mt-[3px] h-4 w-4 rounded border-slate-300 text-[#10662A] focus:ring-[#10662A]"
                    required
                  />
                  <span>
                    I confirm that the above details are correct and authorize
                    Rupeedial / insurance partners to contact me for policy
                    issuance and explanation.
                  </span>
                </label>
              </div>

              <div className="flex flex-wrap justify-center md:justify-between gap-3 pt-3">
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg border border-[#390A5D] bg-white px-4 py-2 text-sm font-semibold text-[#390A5D] hover:bg-[#F5FFF8]"
                  onClick={() => setStep(2)}
                >
                  ← Back to quotes
                </button>
                <button
                  type="button"
                  className="inline-flex items-center rounded-lg bg-[#10662A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
                  onClick={handleSubmitApplication}
                >
                  Submit request →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {step === 4 && selectedPlan && (
            <div className="bg-white rounded-2xl shadow-md border border-[#d8efe6] p-4 md:p-6 space-y-6 text-center">
              <div className="flex flex-col items-center gap-3">
                <div className="h-16 w-16 rounded-full bg-[#F5FFF8] flex items-center justify-center border border-[#10662A]/40">
                  <span className="text-[#10662A] text-3xl">✓</span>
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-[#10662A]">
                  Thank you! Your request is submitted.
                </h2>
                <p className="text-sm max-w-xl text-[#390A5D]">
                  Your insurance request has been submitted successfully for{" "}
                  <span className="font-semibold">{selectedPlan.name}</span>. Our
                  expert will contact you within 24 hours to explain the plan
                  and complete the documentation.
                </p>
              </div>

              <div className="mx-auto max-w-md rounded-2xl border border-[#d8efe6] bg-[#F5FFF8] px-4 py-4 text-sm text-left text-[#390A5D]">
                <p className="font-semibold mb-2">Request Summary</p>
                <div className="space-y-1 text-xs md:text-sm">
                  <div className="flex justify-between">
                    <span>Reference ID</span>
                    <span className="font-medium">
  {referenceId || "Generating..."}
</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plan</span>
                    <span className="font-medium">
                      {selectedPlan.name}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sum Insured</span>
                    <span className="font-medium">
                      {selectedPlan.sumInsuredLabel}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Yearly Premium</span>
                    <span className="font-medium">
                      {selectedPlan.premiumLabel}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
  type="button"
  className="inline-flex items-center rounded-lg border border-[#10662A] bg-[#F5FFF8] px-5 py-2.5 text-sm font-semibold text-[#10662A]"
  onClick={downloadSlip}
>
  Download Slip
</button>
<button
  type="button"
  className="inline-flex items-center rounded-lg border border-[#390A5D] bg-white px-4 py-2 text-sm font-semibold text-[#390A5D]"
  onClick={resetWizard}
>
  Start new request
</button>

                <button
                  type="button"
                  className="inline-flex items-center rounded-lg bg-[#10662A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm"
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  Back to Home
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Info section: What is Insurance */}
      <section className="py-10 md:py-12 bg-[#fbfbfe]">
        <div className="max-w-5xl mx-auto px-4 text-[#390A5D]">
          <h2 className="text-center text-[22px] md:text-[24px] font-bold mb-4 text-[#10662A]">
            What is Insurance?
          </h2>
          <p className="text-sm md:text-[15px] leading-relaxed mb-4">
            Insurance is a contract, represented by a policy, in which an
            individual or entity receives financial protection or reimbursement
            against losses from an insurance company. The company pools clients’
            risks to make payments more affordable for the insured.
          </p>

          <h3 className="text-[18px] font-semibold mt-6 mb-3">
            Insurance Policy Components
          </h3>
          <p className="text-sm md:text-[15px] leading-relaxed mb-3">
            When choosing a policy, it is important to understand how insurance
            works. There are three components — premium, policy limit and
            deductible — that are crucial in most insurance policies.
          </p>

          <ul className="list-disc pl-5 space-y-2 text-sm md:text-[15px]">
            <li>
              <strong>Premium</strong> – The price of a policy, usually paid
              monthly, quarterly or yearly.
            </li>
            <li>
              <strong>Policy Limit</strong> – The maximum amount an insurer will
              pay for a covered loss under a policy.
            </li>
            <li>
              <strong>Deductible</strong> – The amount you pay out of pocket
              before the insurer starts covering the claim.
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
};

export default InsurancePage;

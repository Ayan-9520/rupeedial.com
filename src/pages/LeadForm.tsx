import React, { useState, useMemo  } from "react";


type FormDataType = {
  mobile?: string;
  alternateMobile?: string;
  pincode?: string;
  [key: string]: string | number | undefined;
};

type Loan = {
  type: string;
  emi: string;
  principal: string;
  bank: string;
};

export default function LeadForm() {
const safeNumber = (val: string | number | undefined) => Number(val) || 0;

const generateFormNumber = () => {
  const now = new Date();
  const pad = (n: number) => n.toString().padStart(2, "0");

  return `KFL-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}-${now.getTime().toString().slice(-4)}`;
};


  const [consent, setConsent] = useState(false);
const [formNumber, setFormNumber] = useState(() => generateFormNumber());

  const [income, setIncome] = useState({
    tuition: "",
    admission: "",
    other: ""
  });

  const [formData, setFormData] = useState<FormDataType>({});
const isExistingLoan = String(formData.existingLoan) === "Yes";
const [submitted, setSubmitted] = useState(false);
  const [loans, setLoans] = useState<Loan[]>([
    { type: "", emi: "", principal: "", bank: "" }
  ]);

  const [expense, setExpense] = useState({
    salary: "",
    rent: "",
    electricity: "",
    maintenance: "",
    marketing: "",
    misc: ""
  });

  // ✅ CALCULATIONS (correct order)
const totalObligation = loans.reduce(
  (sum, loan) => sum + safeNumber(loan.emi),
  0
);


const totalIncome = useMemo(() =>
  safeNumber(income.tuition) +
  safeNumber(income.admission) +
  safeNumber(income.other)
, [income]);

const totalExpense = useMemo(() =>
  safeNumber(expense.salary) +
  safeNumber(expense.rent) +
  safeNumber(expense.electricity) +
  safeNumber(expense.maintenance) +
  safeNumber(expense.marketing) +
  safeNumber(expense.misc)
, [expense]);

  const profitMonthly = Math.max(0, totalIncome - totalExpense - totalObligation);
  const profitAnnual = profitMonthly * 12;
  
const [loading, setLoading] = useState(false);
  const addLoanRow = () => {
    setLoans([
      ...loans,
      { type: "", emi: "", principal: "", bank: "" }
    ]);
  };

  const removeLoan = (index: number) => {
    setLoans(loans.filter((_, i) => i !== index));
  };
const requiredFields = [
  "instituteName",
  "contactPerson",
  "mobile",
  "product",
  "loanUrgency",
  "city",
  "state",
  "pincode",
  "loanAmount",
  "tenure",
  "propertyType",
  "propertyLocation",
  "propertyValue"
];
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
    setSubmitted(true);
setTimeout(() => {
  const errorEl = document.querySelector(".error");
  if (errorEl) {
    (errorEl as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}, 100);
  window.scrollTo({ top: 0, behavior: "smooth" });
 
if (loading) return;
setLoading(true);
for (const field of requiredFields) {
  if (!String(formData[field] || "").trim()) {
    alert(`Please fill ${field}`);
    setLoading(false);
    return;
  }
}
  // ✅ validation
const mobileRegex = /^[6-9]\d{9}$/;
if (formData.existingLoan === "Yes") {
  if (
    !String(formData.existingBank || "").trim() ||
    safeNumber(formData.outstandingAmount) <= 0
  ) {
    alert("Please fill existing loan details");
    setLoading(false);
    return;
  }
}
if (!mobileRegex.test(String(formData.mobile || ""))) {
  alert("Enter valid mobile number");
  setLoading(false); // ✅ ADD THIS
  return;
}
if (formData.alternateMobile && !mobileRegex.test(String(formData.alternateMobile))) {
  alert("Invalid alternate mobile number");
  setLoading(false);
  return;
}

const validLoans = loans.filter(
  (loan) =>
    loan.type &&
    safeNumber(loan.emi) > 0
);

if (formData.existingLoan === "Yes" && validLoans.length === 0) {
  alert("Please add at least one existing loan");
  setLoading(false);
  return;
}
if (!/^\d{6}$/.test(String(formData.pincode || ""))) {
  alert("Invalid Pincode");
  setLoading(false);
  return;
}


if (!consent) {
  alert("Please accept consent");
  setLoading(false);
  return;
}

if (totalIncome === 0) {
  alert("Income cannot be zero");
  setLoading(false);
  return;
}

if (totalExpense === 0) {
  alert("Expense cannot be zero");
  setLoading(false);
  return;
}
if (!safeNumber(formData.loanAmount)) {
  alert("Enter valid loan amount");
  setLoading(false);
  return;
}
if (safeNumber(formData.loanAmount) < 10000) {
  alert("Minimum loan amount should be ₹10,000");
  setLoading(false);
  return;
}


const cleanObject = <T extends Record<string, unknown>>(obj: T): Partial<T> => {
  return Object.fromEntries(
Object.entries(obj).filter(([, v]) => v !== "" && v !== null && v !== undefined)
  ) as Partial<T>;
};
  // ✅ final data (single clean object)
  const finalData = {
  formNumber,

  basicDetails: cleanObject(formData),

  income: {
    tuition: safeNumber(income.tuition),
    admission: safeNumber(income.admission),
    other: safeNumber(income.other)
  },

  expense: {
    salary: safeNumber(expense.salary),
    rent: safeNumber(expense.rent),
    electricity: safeNumber(expense.electricity),
    maintenance: safeNumber(expense.maintenance),
    marketing: safeNumber(expense.marketing),
    misc: safeNumber(expense.misc)
  },

  obligations: validLoans.map(l => ({
    ...l,
    emi: safeNumber(l.emi),
    principal: safeNumber(l.principal)
  })),

  summary: {
    totalIncome,
    totalExpense,
    totalObligation,
    profitMonthly,
    profitAnnual
  }
};
  

  // ✅ API CALL
const controller = new AbortController();
const timeoutId = setTimeout(() => controller.abort(), 15000);

fetch("https://rupeedial.com/rupeedial-backend/public/index.php?action=lead/apply", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(finalData),
  signal: controller.signal
})
.then(async (res) => {
  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Invalid server response");
  }

  if (!res.ok) {
    throw new Error(data?.message || "Server Error");
  }

  return data;
})
.then((data) => {
  if (!data.success) {
    throw new Error(data.message);
  }

alert("Lead Saved Successfully ✅");
  resetForm();

})
.catch((err) => {
  if (err.name === "AbortError") {
    alert("Request timeout. Try again.");
  } else {
    alert(err.message || "Something went wrong");
  }
})
.finally(() => {
    clearTimeout(timeoutId);
  setLoading(false); // ✅ MUST
});

}
  const resetForm = () => {
    setFormData({});
    setIncome({ tuition: "", admission: "", other: "" });
    setExpense({
      salary: "",
      rent: "",
      electricity: "",
      maintenance: "",
      marketing: "",
      misc: ""
    });
    setLoans([{ type: "", emi: "", principal: "", bank: "" }]);
    setConsent(false);
     setFormNumber(generateFormNumber());
  };


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
const { name } = e.target;
let { value } = e.target;

if (name === "mobile" || name === "alternateMobile" || name === "pincode") {
  value = value.replace(/\D/g, "");
}

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    setSubmitted(false); 
  };

return (
<>
  <div className="container">
      

<div className="header">
 
  <h1>Rupeedial Lead Form</h1>
</div>
<form onSubmit={handleSubmit} autoComplete="off" noValidate>

{/* TOP BAR */}
<div className="form-grid internal-grid">
<input value={formNumber} readOnly />
<input 
  type="date" 
  name="date" 
  value={formData.date || ""}
  onChange={handleChange} 
  required 
/>
<input 
  name="callerName"
  value={formData.callerName || ""}
  placeholder="Caller Name"  
  onChange={handleChange}
/>

<select
  name="leadSource"
  value={formData.leadSource || ""}
  onChange={handleChange}
  required
>
<option value="">Lead Source</option>
<option>Website</option>
<option>Facebook</option>
<option>Google Ads</option>
<option>Referral</option>
<option>Direct Call</option>
<option>Other</option>
</select>

<input
  name="callerCode"
  value={formData.callerCode || ""}
  placeholder="Caller Code / ID"
  onChange={handleChange}
/>

</div>

{/* 1 BASIC */}
<h2 className="section-title">Basic Details</h2>
<div className="form-grid internal-grid">

<input 
  name="instituteName"
  value={formData.instituteName || ""}
  placeholder="Institute Name"
  onChange={handleChange}
className={submitted && !String(formData.instituteName || "").trim() ? "error" : ""}
/>

<input 
  name="contactPerson"
  value={formData.contactPerson || ""}
  placeholder="Contact Person"
  onChange={handleChange}
  className={submitted && !String(formData.contactPerson || "").trim() ? "error" : ""}
/>

<input 
  name="mobile"
  type="tel"
  value={formData.mobile || ""}
  maxLength={10}
  placeholder="Mobile Number"
  onChange={handleChange}
  className={
  submitted && !/^[6-9]\d{9}$/.test(String(formData.mobile || ""))
    ? "error"
    : ""
}
/>

<input
  name="alternateMobile"
  type="tel"
  maxLength={10}
  placeholder="Alternate Number"
  onChange={handleChange}
/>

<input 
  name="email"
  type="email"
  value={formData.email || ""}
  placeholder="Email Address"
  onChange={handleChange}
  className={
    submitted &&
    formData.email &&
    !/^\S+@\S+\.\S+$/.test(String(formData.email))
      ? "error"
      : ""
  }
/>
</div>
{/* 2 PRODUCT */}
<h2 className="section-title">Product Details</h2>
<div className="form-grid internal-grid">

<select 
  name="product"
  value={formData.product || ""}
  onChange={handleChange}
  className={submitted && !formData.product ? "error" : ""}
>
<option value="">Select Product</option>
<option>Business Loan</option>
<option>School Loan</option>
<option>Personal Loan</option>
<option>LAP</option>
<option>Working Capital</option>
<option>MSME Loan</option>
<option>Startup Loan</option>
<option>Education Loan</option>
<option>Vehicle Loan</option>
<option>Home Loan</option>
<option>Balance Transfer</option>
<option>Overdraft</option>
</select>

<select 
  name="loanUrgency"
  value={formData.loanUrgency || ""}
  onChange={handleChange}
  className={submitted && !formData.loanUrgency ? "error" : ""}
>
<option value="">Loan Urgency</option>
<option>Urgent (Within 3 Days)</option>
<option>Within 15 Days</option>
<option>Within 30 Days</option>
</select>

</div>

{/*  3 LOCATION */} 
<h2 className="section-title">Location Details</h2>
<div className="form-grid internal-grid">

<input
  name="address"
  value={formData.address || ""}
  placeholder="Full Address"
  onChange={handleChange}
/>

<input
  name="area"
  value={formData.area || ""}
  placeholder="Area"
  onChange={handleChange}
/>

<input 
  name="city"
  value={formData.city || ""}
  placeholder="City"
  onChange={handleChange}
  className={submitted && !formData.city ? "error" : ""}
/>

<input
  name="state"
  value={formData.state || ""}
  placeholder="State"
  onChange={handleChange}
  className={submitted && !formData.state ? "error" : ""}
/>

<input
  name="pincode"
  value={formData.pincode || ""}
  placeholder="Pincode"
  maxLength={6}
  onChange={handleChange}
  className={
    submitted && !/^\d{6}$/.test(String(formData.pincode || ""))
      ? "error"
      : ""
  }
/>

<select
  name="propertyOwnership"
  value={formData.propertyOwnership || ""}
  onChange={handleChange}
>
  <option value="">Ownership</option>
  <option>Owned</option>
  <option>Rented</option>
</select>

</div>

{/*  4 INSTITUTE */} 
<h2 className="section-title">Institute Profile</h2>
<div className="form-grid internal-grid">

<select
  name="instituteType"
  value={formData.instituteType || ""}
  onChange={handleChange}
  className={submitted && !formData.instituteType ? "error" : ""}
>
<option value="">Institute Type</option>
<option>School</option>
<option>Coaching</option>
<option>College</option>
</select>

<select
  name="board"
  value={formData.board || ""}
  onChange={handleChange}
  className={
    submitted &&
    (formData.instituteType === "School" || formData.instituteType === "College") &&
    !formData.board
      ? "error"
      : ""
  }
>
<option value="">Board</option>
<option>CBSE</option>
<option>ICSE</option>
<option>State</option>
</select>

<input
  name="yearEstablished"
  value={formData.yearEstablished || ""}
  placeholder="Year Established (e.g. 2010)"
  onChange={handleChange}
  maxLength={4}
  className={
    submitted &&
    (!/^\d{4}$/.test(String(formData.yearEstablished || "")) ||
      Number(formData.yearEstablished) > new Date().getFullYear())
      ? "error"
      : ""
  }
/>

<input
  name="totalBranches"
  type="number"
  min="1"
  value={formData.totalBranches || ""}
  placeholder="Total Branches"
  onChange={handleChange}
  className={
    submitted &&
    (!formData.totalBranches || Number(formData.totalBranches) < 1)
      ? "error"
      : ""
  }
/>

<select
  name="registrationStatus"
  value={formData.registrationStatus || ""}
  onChange={handleChange}
  className={submitted && !formData.registrationStatus ? "error" : ""}
>
<option value="">Registration Status</option>
<option>Registered</option>
<option>Unregistered</option>
</select>

</div>

{/*  5 STUDENTS */} 
<h2 className="section-title">Student Details</h2>
<div className="form-grid internal-grid">

<input
  name="totalStudents"
  type="number"
  min="1"
  value={formData.totalStudents || ""}
  placeholder="Total Students"
  onChange={handleChange}
  className={
    submitted &&
    (!formData.totalStudents || Number(formData.totalStudents) <= 0)
      ? "error"
      : ""
  }
/>

<input 
  name="avgStudents"
  type="number"
  min="0"
  value={formData.avgStudents || ""}
  placeholder="Avg Students per Class"
  onChange={handleChange}
/>

<input 
  name="classes"
  value={formData.classes || ""}
  placeholder="Classes Offered (e.g. 1-12)"
  onChange={handleChange}
  className={submitted && !formData.classes ? "error" : ""}
/>

<input 
  name="growth"
  type="number"
  min="0"
  max="100"
  value={formData.growth || ""}
  placeholder="Student Growth (%)"
  onChange={handleChange}
  className={
    submitted &&
    formData.growth &&
    (Number(formData.growth) < 0 || Number(formData.growth) > 100)
      ? "error"
      : ""
  }
/>

<input 
  name="monthlyFee"
  type="number"
  min="0"
  value={formData.monthlyFee || ""}
  placeholder="Monthly Fee (₹)"
  onChange={handleChange}
/>

<input 
  name="annualFee"
  type="number"
  min="0"
  value={formData.annualFee || ""}
  placeholder="Annual Fee (₹)"
  onChange={handleChange}
/>

<input 
  name="admissionFee"
  type="number"
  min="0"
  value={formData.admissionFee || ""}
  placeholder="Admission Fee (₹)"
  onChange={handleChange}
/>

<input 
  name="otherCharges"
  type="number"
  min="0"
  value={formData.otherCharges || ""}
  placeholder="Other Charges (₹)"
  onChange={handleChange}
/>

</div>


{/*  6 FEES */} 
<h2 className="section-title">Fee Structure</h2>
<div className="form-grid internal-grid">
<input
  name="feeMonthly"
  value={formData.feeMonthly || ""}
  placeholder="Monthly Fee"
  onChange={handleChange}
/>

<input
  name="feeAnnual"
  value={formData.feeAnnual || ""}
  placeholder="Annual Fee"
  onChange={handleChange}
/>

<input
  name="feeAdmission"
  value={formData.feeAdmission || ""}
  placeholder="Admission Fee"
  onChange={handleChange}
/>

<input
  name="feeOther"
  value={formData.feeOther || ""}
  placeholder="Other Charges"
  onChange={handleChange}
/>
</div>

{/*  7 INCOME */} 
<h2  className="section-title">Income</h2>
<div className="form-grid internal-grid">
<input
  type="number"
  value={income.tuition}
  placeholder="Tuition Income"
  onChange={(e) => setIncome({ ...income, tuition: e.target.value })}
/>

<input
  type="number"
  value={income.admission}
  placeholder="Admission Income"
  onChange={(e) => setIncome({ ...income, admission: e.target.value })}
/>

<input
  type="number"
  value={income.other}
  placeholder="Other Income"
  onChange={(e) => setIncome({ ...income, other: e.target.value })}
/>
<input value={totalIncome} readOnly />

</div>

{/*  8 EXPENSE */} 
<h2 className="section-title">Expenses</h2>
<div className="form-grid internal-grid">
<input
  value={expense.salary}
  placeholder="Salary"
  onChange={(e) => setExpense({...expense, salary: e.target.value})}
/>
<input
  value={expense.rent}
  placeholder="Rent"
  onChange={(e) => setExpense({...expense, rent: e.target.value})}
/>
<input
  value={expense.electricity}
  placeholder="Electricity"
  onChange={(e) => setExpense({...expense, electricity: e.target.value})}
/>
<input 
  value={expense.maintenance}
  placeholder="Maintenance" 
  onChange={(e) => setExpense({...expense, maintenance: e.target.value})} 
/>
<input 
  value={expense.marketing}
  placeholder="Marketing" 
  onChange={(e) => setExpense({...expense, marketing: e.target.value})} 
/>

<input 
  value={expense.misc}
  placeholder="Misc" 
  onChange={(e) => setExpense({...expense, misc: e.target.value})} 
/>
<input value={totalExpense} readOnly />
</div>

{/*  9 OBLIGATIONS */} 
<h2  className="section-title">Obligations</h2>

<div className="form-grid internal-grid">
  {loans.map((loan: Loan, index: number) => (
    <div key={index} className="loan-row">

      {/* Loan Type */}
      <select
        value={loan.type}
        onChange={(e) => {
          const updated = [...loans];
          updated[index].type = e.target.value;
          setLoans(updated);
        }}
      >
        <option value="">Loan Type</option>

        {/* Personal */}
        <option>Personal Loan</option>
        <option>Instant Personal Loan</option>
        <option>Salary Based Loan</option>

        {/* Business */}
        <option>Business Loan</option>
        <option>Working Capital Loan</option>
        <option>MSME Loan</option>
        <option>Startup Loan</option>
        <option>Overdraft Facility</option>

        {/* Property */}
        <option>Loan Against Property (LAP)</option>
        <option>Home Loan</option>
        <option>Home Loan Balance Transfer</option>
        <option>Top-Up Loan</option>

        {/* Education */}
        <option>Education Loan</option>

        {/* Vehicle */}
        <option>Car Loan</option>
        <option>Two Wheeler Loan</option>
        <option>Commercial Vehicle Loan</option>

        {/* Special */}
        <option>School / Institute Loan</option>
        <option>Doctor Loan</option>
        <option>Professional Loan (CA/CS)</option>

        {/* Others */}
        <option>Gold Loan</option>
        <option>Credit Card Loan</option>
        <option>Balance Transfer</option>
      </select>

      {/* EMI */}
      <input
        type="number"
        placeholder="EMI (₹)"
        value={loan.emi}
        onChange={(e) => {
          const updated = [...loans];
          updated[index].emi = e.target.value;
          setLoans(updated);
        }}
      />

      {/* Principal */}
      <input
        type="number"
        placeholder="Principal Outstanding (₹)"
        value={loan.principal}
        onChange={(e) => {
          const updated = [...loans];
          updated[index].principal = e.target.value;
          setLoans(updated);
        }}
      />

      {/* Bank */}
      <input
        placeholder="Bank / NBFC Name"
        value={loan.bank}
        onChange={(e) => {
          const updated = [...loans];
          updated[index].bank = e.target.value;
          setLoans(updated);
        }}
      />

      {/* Remove Button */}
      {loans.length > 1 && (
        <button type="button" onClick={() => removeLoan(index)}>
          Remove
        </button>
      )}

    </div>
  ))}
</div>


{/*  ADD BUTTON */} 
<button type="button" onClick={addLoanRow} style={{ marginBottom: "15px" }}>
+ Add Another Loan
</button>

<div className="form-grid internal-grid">
<input value={totalObligation} readOnly />
</div>

{/*  10 PROFIT */} 
<h2 className="section-title">Profit</h2>
<div className="form-grid internal-grid">
<input 
  value={profitMonthly} 
  readOnly 
  style={{ color: profitMonthly < 0 ? "red" : "green" }} 
/>
<input value={profitAnnual} readOnly />
</div>

{/*  11 LOAN */} 
<h2 className="section-title">Loan Details</h2>
<div className="form-grid internal-grid">

<select
  name="loanCategory"
  value={formData.loanCategory || ""}
  onChange={handleChange}
  required
>
<option value="">Select Loan Category</option>
<option>Fresh Loan</option>
<option>Balance Transfer (BT)</option>
<option>Top-Up Loan</option>
<option>Overdraft Facility</option>
</select>

<select
  name="loanProduct"
  value={formData.loanProduct || ""}
  onChange={handleChange}
  required
>
<option value="">Select Loan Product</option>
<option>Business Loan</option>
<option>Loan Against Property (LAP)</option>
<option>Personal Loan</option>
<option>Working Capital</option>
<option>MSME Loan</option>
<option>Startup Loan</option>
<option>Home Loan</option>
<option>Vehicle Loan</option>
</select>

<input
  type="number"
  name="loanAmount"
  required
  value={formData.loanAmount || ""}
  placeholder="Required Loan Amount (₹)"
  onChange={handleChange}
   className={
    submitted && safeNumber(formData.loanAmount) <= 0
      ? "error"
      : ""
  }
/>

<input
  name="tenure"
  required
  type="number"
  value={formData.tenure || ""}
  placeholder="Expected Tenure (Months)"
  onChange={handleChange}
   className={submitted && !formData.tenure ? "error" : ""}
/>

<input
  name="roi"
  type="number"
  value={formData.roi || ""}
  placeholder="Expected ROI (%)"
  onChange={handleChange}
/>

<input
  name="loanPurpose"
  value={formData.loanPurpose || ""}
  placeholder="Purpose of Loan"
  onChange={handleChange}
/>

<select
  name="existingLoan"
  value={formData.existingLoan || ""}
  onChange={handleChange}
>
<option value="">Existing Loan?</option>
<option>Yes</option>
<option>No</option>
</select>
<input
  name="existingBank"
  value={formData.existingBank || ""}
   placeholder="Existing Bank Name"
  onChange={handleChange}
  disabled={!isExistingLoan}
  className={
    submitted && isExistingLoan && !formData.existingBank
      ? "error"
      : ""
  }
/>

<input
  name="outstandingAmount"
  type="number"
  value={formData.outstandingAmount || ""}
  placeholder="Outstanding Loan Amount (₹)"
  onChange={handleChange}
  disabled={!isExistingLoan}
  className={
    submitted && isExistingLoan && safeNumber(formData.outstandingAmount) <= 0
      ? "error"
      : ""
  }
/>

</div>
{/*  12 PROPERTY */} 
<h2 className="section-title">Property Details</h2>
<div className="form-grid internal-grid">

<select
  name="propertyType"
  value={formData.propertyType || ""}
  onChange={handleChange}
  required
  className={submitted && !formData.propertyType ? "error" : ""}
>
<option value="">Property Type</option>

{/*  Residential */} 
<option>Residential - Flat</option>
<option>Residential - Independent House</option>
<option>Residential - Builder Floor</option>
<option>Residential - Plot</option>

{/*  Commercial */} 
<option>Commercial - Shop</option>
<option>Commercial - Office</option>
<option>Commercial - Showroom</option>
<option>Commercial - Godown / Warehouse</option>
<option>Commercial - Industrial Property</option>

</select>

<input 
  name="propertyLocation"
  required
  value={formData.propertyLocation || ""}
   placeholder="Property Location (City / Area)"
  onChange={handleChange}
  className={submitted && !formData.propertyLocation ? "error" : ""}
/>

<input 
  name="propertyValue"
  required
  value={formData.propertyValue || ""}
  placeholder="Property Value (₹)"
  onChange={handleChange}
    className={
    submitted && safeNumber(formData.propertyValue) <= 0
      ? "error"
      : ""
  }
/>

<select
  name="propertyOwnershipType"
  value={formData.propertyOwnershipType || ""}
  onChange={handleChange}
  
>
<option value="">Ownership</option>
<option>Self Owned</option>
<option>Joint Ownership</option>
<option>Inherited</option>
</select>

<select
  name="propertyStatus"
  value={formData.propertyStatus || ""}
  onChange={handleChange}
>
<option value="">Property Status</option>
<option>Ready</option>
<option>Under Construction</option>
<option>Rented</option>
<option>Self Occupied</option>
</select>

<select
  name="documentsAvailable"
  value={formData.documentsAvailable || ""}
  onChange={handleChange}
>
<option value="">Documents Available</option>
<option>Complete (Registry + Map + Tax)</option>
<option>Partial Documents</option>
<option>Only Agreement</option>
<option>Not Available</option>
</select>

</div>

{/*  13 INTERNAL */} 
<h2 className="internal-heading">Internal Use</h2>


<div className="form-grid internal-grid">

<div className="form-group">
<label>Lead Score</label>
<input
  name="leadScore"
  type="number"
  placeholder="Enter Score (0-100)"
  value={formData.leadScore || ""}
  onChange={handleChange}
/>
</div>

<div className="form-group">
<label>Category</label>
<select
  name="leadCategory"
  value={formData.leadCategory || ""}
  onChange={handleChange}
>
  <option value="">Select Category</option>
  <option>A - Hot</option>
  <option>B - Warm</option>
  <option>C - Cold</option>
</select>
</div>

<div className="form-group">
<label>Priority</label>
<select
  name="priority"
  value={formData.priority || ""}
  onChange={handleChange}
>
  <option value="">Select Priority</option>
  <option>High</option>
  <option>Medium</option>
  <option>Low</option>
</select>
</div>

<div className="form-group remarks-box">
<label>Remarks</label>
<textarea
  name="remarks"
  placeholder="Enter remarks..."
  rows={3}
  value={formData.remarks || ""}
  onChange={handleChange}
/>
</div>

<div className="form-group verified-box">
<label>Verified</label>
<select
  name="verified"
  value={formData.verified || ""}
  onChange={handleChange}
>
  <option value="">Select</option>
  <option>Yes</option>
  <option>No</option>
</select>
</div>

</div>

{/*  CONSENT BOX */} 
<div className="consent-box">
  <label className="consent-label">
    <input
      type="checkbox"
      checked={consent}
      onChange={(e) => setConsent(e.target.checked)}
    />
<span className="consent-text">
  I confirm that the information provided is accurate. I authorize <b>Rupeedial</b> to contact me and share my details with banks/NBFCs via call, SMS, WhatsApp, or email for loan processing.
</span>

</label>

</div>
<button type="button" onClick={resetForm}>
  Reset Form
</button>
{/*  SUBMIT */} 
<div className="submit-box">
<button type="submit" disabled={!consent || loading}>
  {loading ? "Submitting..." : "Submit Lead"}
</button>
</div>

</form>

</div>
<style>{`

/* MAIN CONTAINER */
.container {
  max-width: 1000px;
  margin: 30px auto;
  background: #ffffff;
  padding: 30px;
  border-radius: 14px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.08);
  font-family: 'Segoe UI', Arial;
}

/* HEADER */
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-bottom: 25px;
}

.consent-text {
  font-size: 12px;
  color: #333;
}


h1 {
  color: #0f5132;
  font-size: 24px;
  font-weight: 600;
 
}

/* SECTION HEADINGS */
.section-title {
  margin: 30px 0 15px;
  border-left: 5px solid #28a745;
  color: #198754;
  font-size: 18px;
  font-weight: 600;
  background: #f1fff5;
  padding: 10px 14px;
  border-radius: 6px;
}

/* GRID SYSTEM */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 14px;
  margin-bottom: 10px;
}

/* INTERNAL GRID FIX */
.internal-grid {
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  align-items: end;
}

/* INPUTS */
input, select, textarea {
  padding: 11px;
  border-radius: 8px;
  border: 1px solid #dcdcdc;
  font-size: 14px;
  transition: 0.25s;
  width: 100%;
}

/* FOCUS EFFECT */
input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #28a745;
  box-shadow: 0 0 6px rgba(40,167,69,0.3);
}

/* READONLY */
input[readonly] {
  background: #e9f9ee;
  font-weight: bold;
}

/* LOAN ROW */
.loan-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px,1fr));
  gap: 10px;
  margin-bottom: 10px;
}

/* BUTTONS */
button {
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
}

/* ADD BUTTON */
button[type="button"] {
  background: #097c3d;
  color: #fff;
  padding: 9px 15px;
  font-size: 14px;
  margin-top:5px;
}

/* REMOVE BUTTON */
.loan-row button {
  background: #dc3545;
  color: white;
}

/* HOVER */
button:hover {
  transform: translateY(-1px);
  opacity: 0.95;
}

/* REMARK FULL WIDTH */
.remarks-box {
  grid-column: span 2;
}

@media(max-width: 600px){
  .remarks-box {
    grid-column: span 1;
  }
}

/* VERIFIED ALIGN */
.verified-box {
  display: flex;
  flex-direction: column;
  justify-content: end;
}

/* CONSENT BOX */
.consent-box {
  margin-top: 30px;
  padding: 18px;
  background: linear-gradient(135deg, #e6f9ed, #f3fff6);
  border: 1px solid #b7e4c7;
  border-radius: 12px;
}

/* CONSENT LABEL */
.consent-label {
  display: flex;
  align-items: flex-start;  /* top align */
  gap: 12px;
  line-height: 1.6;
}
/* checkbox size & position fix */
.consent-label input {
  margin-top: 4px;
  width: 16px;
  height: 16px;
  cursor: pointer;
}
/* SUBMIT BUTTON */
.submit-box button {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #28a745, #218838);
  color: #fff;
  font-size: 17px;
  font-weight: 600;
  border-radius: 12px;
  margin-top: 15px;
  box-shadow: 0 6px 15px rgba(40,167,69,0.3);
}

/* SUBMIT HOVER */
.submit-box button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(40,167,69,0.4);
}

/* DISABLED */
.submit-box button:disabled {
  background: #a5d6a7;
  box-shadow: none;
  cursor: not-allowed;
}

/* FORM LABELS */
.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 13px;
  margin-bottom: 5px;
  color: #444;
}

/* TEXTAREA */
textarea {
  resize: none;
}

/* SECTION SPACING */
h2 {
  margin-top: 30px;
}

/* MOBILE */
@media(max-width: 600px){
  .container {
    padding: 20px;
  }
}
.internal-grid input,
.internal-grid select {
  height: 42px;
}
  input[readonly] {
  background: #e9f9ee;
  cursor: not-allowed;
}
  input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.error {
  border: 1px solid red !important;
}
`}</style>
</>
  );
}
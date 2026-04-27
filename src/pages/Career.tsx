// src/pages/CareerPage.tsx
import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
interface CareerForm {
  name: string;
  mobile: string;
  email: string;
  position: string;
  experience: string;
  city: string;
  message: string;
  resume?: File; 
 currentCompanyRole?: string;
  noticePeriod?: string;
  expectedSalary?: string;
  source?: string;
}

const CareerPage: React.FC = () => 
  { 

useEffect(() => {
  // Title
  document.title =
    "Careers at RupeeDial | Jobs in Sales, Telecalling & Finance";

  // Meta description
  let meta = document.querySelector('meta[name="description"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "description");
    document.head.appendChild(meta);
  }

  meta.setAttribute(
    "content",
    "Explore career opportunities at RupeeDial. Apply for sales, telecaller, operations and finance jobs. Grow your career with leading banks & NBFCs."
  );

  // Canonical
  let canonical = document.querySelector('link[rel="canonical"]');
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", "https://rupeedial.com/careers");
}, []);

  const [loading, setLoading] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [submitted, setSubmitted] = useState(false);
const [referenceId, setReferenceId] = useState("");

const [form, setForm] = useState<CareerForm>({
  name: "",
  mobile: "",
  email: "",
  position: "",
  experience: "",
  city: "",
  message: "",
  currentCompanyRole: "",
  noticePeriod: "",
  expectedSalary: "",
  source: "",
});


 

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setErrorMessage("");
 
const { name, mobile, position } = form;

  if (!name.trim() || name.trim().length < 3) {
    alert("Please enter a valid name (min 3 characters).");
    return;
  }

  if (!/^[6-9]\d{9}$/.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (!position) {
    alert("Please select the position you are applying for.");
    return;
  }

  if (!form.resume) {
    alert("Please upload your resume.");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("mobile", form.mobile);
    formData.append("email", form.email);
    formData.append("position", form.position);
    formData.append("experience", form.experience);
    formData.append("city", form.city);
    formData.append("message", form.message);
    formData.append("resume", form.resume); // 👈 file
formData.append(
  "currentCompanyRole",
  form.currentCompanyRole || ""
);

formData.append("noticePeriod", form.noticePeriod || "");
formData.append("expectedSalary", form.expectedSalary || "");
formData.append("source", form.source || "");

    const res = await fetch(
      "https://rupeedial.com/rupeedial-backend/public/index.php?action=career/apply",
      {
        method: "POST",
        body: formData,   // 👈 no headers, browser sets multipart
      }
    );

    const data = await res.json();

    if (!data.success) {
      throw new Error(data.message || "Failed to submit");
    }

    // ✅ REAL reference ID from backend
   setReferenceId(data.referenceId);
setSubmitted(true);

setForm({
  name: "",
  mobile: "",
  email: "",
  position: "",
  experience: "",
  city: "",
  message: "",
  currentCompanyRole: "",
  noticePeriod: "",
  expectedSalary: "",
  source: "",
});


  } catch {
  setErrorMessage("Something went wrong. Please try again later.");
}
finally {
    setLoading(false);
  }
};

function downloadApplicationSlip() {
  const doc = new jsPDF();

  doc.setFontSize(14);
  doc.text("RUPEEDIAL – CAREER APPLICATION", 105, 20, { align: "center" });

  doc.setFontSize(10);
  doc.text(`Reference ID: ${referenceId}`, 14, 35);
  doc.text(`Name: ${form.name}`, 14, 45);
  doc.text(`Mobile: ${form.mobile}`, 14, 52);
  doc.text(`Email: ${form.email || "-"}`, 14, 59);
  doc.text(`Position: ${form.position}`, 14, 66);
  doc.text(`City: ${form.city || "-"}`, 14, 73);
  doc.text(`Experience: ${form.experience || "Fresher"}`, 14, 80);

  doc.setFontSize(9);
  doc.text(
    "This is a system-generated acknowledgement of your job application. "
      + "Our HR team will contact you if your profile is shortlisted.",
    14,
    95,
    { maxWidth: 180 }
  );

  doc.save("Rupeedial_Career_Application.pdf");
}


  const inputClass =
    "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#390A5D] shadow-sm focus:border-[#10662A] focus:ring-2 focus:ring-[#10662A]/30 outline-none";
  const selectClass =
    "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#390A5D] shadow-sm focus:border-[#10662A] focus:ring-2 focus:ring-[#10662A]/30 outline-none";
  const textareaClass =
    "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#390A5D] shadow-sm focus:border-[#10662A] focus:ring-2 focus:ring-[#10662A]/30 outline-none resize-none";

  return (
    <div className="career-page bg-white text-[#390A5D]">
      {/* HERO SECTION */}
      <section className="bg-[#F5FFF8] border-b border-[#d8efe6]">
        <div className="max-w-6xl md:py-6 mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[3fr,2fr] items-center">
            {/* Left text */}
            <div>
              <p className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#10662A] bg-white border border-[#d8efe6] rounded-full px-3 py-1 mb-4">
                We&apos;re hiring
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#10662A] animate-pulse" />
              </p>

            

             <h1 className="text-3xl md:text-4xl font-extrabold text-[#10662A] mb-3">
                Build your career with{" "}
                <span className="text-[#390A5D]">Rupeedial</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-[#390A5D] max-w-xl">
                Rupeedial is a fast-growing financial services company working
                with leading banks and NBFCs. Join our team of loan experts,
                relationship managers and operations professionals and grow your
                career in retail finance.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-[#F5FFF8] px-3 py-1 text-xs font-medium text-[#390A5D] border border-[#d8efe6]">
                  <span className="mr-2 text-sm">👥</span> Friendly work culture
                </span>
                <span className="inline-flex items-center rounded-full bg-[#e4f6ea] px-3 py-1 text-xs font-medium text-[#10662A] border border-[#c7ebd5]">
                  <span className="mr-2 text-sm">📈</span> Growth &amp;
                  incentives
                </span>
                <span className="inline-flex items-center rounded-full bg-[#fcefdc] px-3 py-1 text-xs font-medium text-[#b75a00] border border-[#f4d19e]">
                  <span className="mr-2 text-sm">🏦</span> Work with top banks
                </span>
              </div>
            </div>

            {/* Right decorative / stats */}
            <div className="relative">
              <div className="rounded-2xl bg-white shadow-lg border border-[#d8efe6] p-6 sm:p-7">
                <p className="text-xs font-semibold text-[#10662A] uppercase tracking-[0.18em] mb-3">
                  Key highlights
                </p>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-slate-500">Team size</dt>
                    <dd className="text-xl font-semibold text-[#390A5D]">
                      50+
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Partner banks / NBFCs</dt>
                    <dd className="text-xl font-semibold text-[#390A5D]">
                      50+
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">City</dt>
                    <dd className="text-base font-medium text-[#390A5D]">
                      New Delhi (HQ)
                    </dd>
                  </div>
                  <div>
                    <dt className="text-slate-500">Core domains</dt>
                    <dd className="text-base font-medium text-[#390A5D]">
                      Loans &amp; Insurance
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="hidden sm:block absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-tr from-[#e4f6ea]/80 via-[#f3e9ff]/80 to-white blur-2xl opacity-80 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* MAIN BODY */}
      <main className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid gap-10 lg:grid-cols-[3fr,2fr]">
            {/* LEFT – OPENINGS + WHY WORK WITH US */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-bold text-[#390A5D]">
                  Current openings
                </h2>
                <span className="text-xs font-medium text-[#10662A] bg-[#F5FFF8] border border-[#d8efe6] rounded-full px-3 py-1">
                  Sales • Telecalling • Operations
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-6">
                We are always looking for talented, self-motivated and
                customer-focused people. Below are some of the roles where we
                regularly hire.
              </p>

              {/* Job card 1 */}
              <article className="mb-5 rounded-2xl border border-[#d8efe6] bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#390A5D]">
                        Sales Executive – Personal / Business Loan
                      </h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#10662A]">
                        Field / Tele Sales
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-[#e4f6ea] px-2.5 py-1 text-[11px] font-semibold text-[#10662A] border border-[#c7ebd5]">
                      Incentive based
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-[11px] font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <span>📍</span> Delhi NCR
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span>💼</span> 0 – 3 Years
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span>💰</span> Fixed + Attractive incentives
                    </span>
                  </div>

                  <ul className="mt-3 list-disc list-inside text-sm text-slate-700 space-y-1.5">
                    <li>
                      Generate leads for personal loan, business loan, home loan
                      and LAP.
                    </li>
                    <li>
                      Explain product features and documentation to customers.
                    </li>
                    <li>
                      Coordinate with banks and internal team for login and
                      disbursal.
                    </li>
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#F5FFF8] px-2.5 py-1 text-[11px] font-semibold text-[#10662A] border border-[#d8efe6]">
                      Graduates / Undergraduates can apply
                    </span>
                  </div>
                </div>
              </article>

              {/* Job card 2 */}
              <article className="mb-5 rounded-2xl border border-[#d8efe6] bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#390A5D]">
                        Telecaller – Loan Enquiry
                      </h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-[#10662A]">
                        Inbound &amp; Outbound Calling
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-[#f0f6ff] px-2.5 py-1 text-[11px] font-semibold text-[#1d4ed8] border border-[#c7ddff]">
                      Fresher friendly
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-[11px] font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <span>📍</span> New Delhi
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span>💼</span> Fresher / Experienced
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span>⏱</span> Full time
                    </span>
                  </div>

                  <ul className="mt-3 list-disc list-inside text-sm text-slate-700 space-y-1.5">
                    <li>
                      Call customers who have enquired for loans on phone /
                      website.
                    </li>
                    <li>
                      Fix appointments for sales team and maintain regular
                      follow-up.
                    </li>
                    <li>
                      Update call status in CRM and share daily reports.
                    </li>
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#F5FFF8] px-2.5 py-1 text-[11px] font-semibold text-[#10662A] border border-[#d8efe6]">
                      Good communication skills
                    </span>
                    <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700 border border-slate-200">
                      Basic computer knowledge
                    </span>
                  </div>
                </div>
              </article>

              {/* Job card 3 */}
              <article className="mb-6 rounded-2xl border border-[#d8efe6] bg-white shadow-sm hover:shadow-md transition-shadow">
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#390A5D]">
                        Back Office / Operations Executive
                      </h3>
                      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-700">
                        Loan Operations / Documentation
                      </p>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-800 border border-slate-200">
                      Experienced
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-4 text-[11px] font-medium text-slate-500">
                    <span className="inline-flex items-center gap-1">
                      <span>📍</span> New Delhi
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <span>💼</span> 1 – 4 Years
                    </span>
                  </div>

                  <ul className="mt-3 list-disc list-inside text-sm text-slate-700 space-y-1.5">
                    <li>Login customer files with banks and NBFCs.</li>
                    <li>
                      Check documentation, coordinate for queries and approvals.
                    </li>
                    <li>
                      Maintain MIS and support sales team for faster disbursal.
                    </li>
                  </ul>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full bg-[#F5FFF8] px-2.5 py-1 text-[11px] font-semibold text-[#10662A] border border-[#d8efe6]">
                      Experience in loan / finance preferred
                    </span>
                  </div>
                </div>
              </article>

              {/* Why work with us */}
              <section className="rounded-2xl border border-dashed border-[#c7ebd5] bg-[#F5FFF8] px-5 py-4">
                <h2 className="text-base sm:text-lg font-semibold text-[#390A5D] mb-2">
                  Why work with Rupeedial?
                </h2>
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1.5">
                  <li>
                    Work with leading banks &amp; NBFCs across multiple loan
                    products.
                  </li>
                  <li>Attractive incentive structure based on performance.</li>
                  <li>
                    Supportive management and friendly work environment focused
                    on learning.
                  </li>
                  <li>
                    Regular training on products, compliance and sales skills.
                  </li>
                  <li>Clear growth path to become Team Leader / Manager.</li>
                </ul>
              </section>
            </div>

            {/* RIGHT – APPLY FORM */}
            <div>
              <div className="rounded-2xl border border-[#d8efe6] bg-[#F7FAFC] backdrop-blur-sm shadow-sm">
                <div className="border-b border-[#d8efe6] px-5 py-4 bg-white rounded-t-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#10662A]">
                    Apply now
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-[#390A5D]">
                    Share your profile
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Fill the form below and our HR team will contact you for
                    suitable openings.
                  </p>
                </div>
{submitted && (
  <div className="mb-6 rounded-2xl border border-[#c7ebd5] bg-[#F5FFF8] p-5 text-center">
    <div className="text-3xl mb-2">✅</div>

    <h3 className="text-lg font-semibold text-[#10662A]">
      Application Submitted Successfully
    </h3>

    <p className="text-sm text-[#390A5D] mt-1">
      Reference ID: <strong>{referenceId}</strong>
    </p>

    <p className="text-xs text-[#390A5D] mt-2">
      Our HR team will contact you if your profile is shortlisted.
    </p>

    <div className="mt-4 flex flex-wrap justify-center gap-3">
      <button
        type="button"
        onClick={downloadApplicationSlip}
        className="rounded-lg border border-[#10662A] bg-white px-4 py-2 text-sm font-semibold text-[#10662A]"
      >
        Download Application Slip
      </button>

      <button
        type="button"
        onClick={() => setSubmitted(false)}
        className="rounded-lg bg-[#10662A] px-4 py-2 text-sm font-semibold text-white"
      >
        Submit another application
      </button>
    </div>
  </div>
)}

               {!submitted && (
  <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3 text-sm" noValidate>
                  <div>
                    <label
                      htmlFor="cName"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Full name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      id="cName"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="cMobile"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        Mobile number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        id="cMobile"
                        name="mobile"
                        type="text"
                        maxLength={10}
                        value={form.mobile}
                        onChange={handleChange}
                        placeholder="10-digit mobile"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="cEmail"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        Email ID
                      </label>
                      <input
                        id="cEmail"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Optional"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cPosition"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Position applying for{" "}
                      <span className="text-rose-500">*</span>
                    </label>
                    <select
                      id="cPosition"
                      name="position"
                      value={form.position}
                      onChange={handleChange}
                      className={selectClass}
                      required
                    >
                      <option value="">Select position</option>
                      <option value="Sales Executive – Loan">
                        Sales Executive – Loan
                      </option>
                      <option value="Telecaller">Telecaller</option>
                      <option value="Back Office / Operations">
                        Back Office / Operations
                      </option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  <div>
    <label className="block text-xs font-medium text-slate-700 mb-1">
      Current company / role
    </label>
    <input
  name="currentCompanyRole"
  type="text"
  value={form.currentCompanyRole}
  onChange={handleChange}
  placeholder="e.g. Sales Executive at XYZ"
  className={inputClass}
/>

  </div>

  <div>
    <label className="block text-xs font-medium text-slate-700 mb-1">
      Notice period (in days)
    </label>
    <input
      name="noticePeriod"
      type="number"
      min={0}
      value={form.noticePeriod}
      onChange={handleChange}
      placeholder="e.g. 30"
      className={inputClass}
    />
  </div>

  <div>
    <label className="block text-xs font-medium text-slate-700 mb-1">
      Expected salary (per month)
    </label>
    <input
      name="expectedSalary"
      type="number"
      min={0}
      value={form.expectedSalary}
      onChange={handleChange}
      placeholder="e.g. 25000"
      className={inputClass}
    />
  </div>

  <div>
    <label className="block text-xs font-medium text-slate-700 mb-1">
      How did you hear about us?
    </label>
    <select
      name="source"
      value={form.source}
      onChange={handleChange}
      className={selectClass}
    >
      <option value="">Select source</option>
      <option value="Website">Website</option>
      <option value="LinkedIn">LinkedIn</option>
      <option value="Reference">Employee Reference</option>
      <option value="Walk-in">Walk-in</option>
      <option value="Other">Other</option>
    </select>
  </div>
</div>


                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label
                        htmlFor="cExp"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        Total experience (years)
                      </label>
                      <input
                        id="cExp"
                        name="experience"
                        type="number"
                        min={0}
                        value={form.experience}
                        onChange={handleChange}
                        placeholder="e.g. 2"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="cCity"
                        className="block text-xs font-medium text-slate-700 mb-1"
                      >
                        Preferred job location
                      </label>
                      <input
                        id="cCity"
                        name="city"
                        type="text"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="e.g. New Delhi"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="cMsg"
                      className="block text-xs font-medium text-slate-700 mb-1"
                    >
                      Brief profile / message
                    </label>
                    <textarea
                      id="cMsg"
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Tell us about yourself, current role, notice period etc."
                      className={textareaClass}
                    />
                  </div>
                  <div>
  <label
    htmlFor="cResume"
    className="block text-xs font-medium text-slate-700 mb-1"
  >
    Upload Resume (PDF / DOC) <span className="text-rose-500">*</span>
  </label>
  <input
    id="cResume"
    name="resume"
    type="file"
    accept=".pdf,.doc,.docx"
    required
    className="block w-full text-sm border border-slate-300 rounded-lg bg-white px-3 py-2"
    onChange={(e) => {
      const file = e.target.files?.[0];
    setForm((prev) => ({ ...prev, resume: file }));
    }}
  />
  <label className="flex items-start gap-2 text-xs text-slate-600 mt-3">
  <input
    type="checkbox"
    required
    className="mt-1 h-4 w-4 text-[#10662A]"
  />
  <span>
    I authorize Rupeedial to contact me via call, SMS, WhatsApp or email
    regarding my job application.
  </span>
</label>
<button
  type="submit"
  disabled={loading}
  className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-[#10662A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0b4c20] disabled:opacity-60"
>
  {loading ? "Submitting..." : "Submit application"}
</button>

</div>


{errorMessage && (
  <p className="mt-2 text-xs font-medium text-red-600">
    {errorMessage}
  </p>
)}

                  <p className="mt-2 text-[11px] text-slate-500">
                    You can also email your CV to{" "}
                    <a
                      href="mailto:careers@rupeedial.com"
                      className="font-medium text-[#10662A] hover:underline"
                    >
                      careers@rupeedial.com
                    </a>
                  </p>

                
                </form>
)}
              </div>
            </div>
          </div>
        </div>
        <section className="mt-10 bg-[#F5FFF8] py-6">
  <div className="max-w-5xl mx-auto px-4">
    <h2 className="text-lg font-bold text-[#10662A] mb-4 text-center">
      Careers at RupeeDial – FAQs
    </h2>

    <div className="grid md:grid-cols-2 gap-4">

      <details className="bg-white border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer">
          How can I apply for jobs at RupeeDial?
        </summary>
        <p className="mt-2 text-sm">
          You can apply directly through the career form on this page or email
          your resume to careers@rupeedial.com.
        </p>
      </details>

      <details className="bg-white border rounded-lg p-4">
        <summary className="font-semibold cursor-pointer">
          Does RupeeDial charge any fee for jobs?
        </summary>
        <p className="mt-2 text-sm">
          No. RupeeDial does not charge any registration or placement fee.
        </p>
      </details>

    </div>
  </div>
</section>

      </main>
    </div>
  );
};

export default CareerPage;

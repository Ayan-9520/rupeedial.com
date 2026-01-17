import React, { useEffect, useState } from "react";

/* ================= TYPES ================= */

type DsaType = "" | "franchise" | "branch" | "channel" | "referral";

interface Documents {
  pan?: File;
  aadhar?: File;
  bank?: File;
  gst?: File;
  officeProof?: File;
}

/* ================= COMPONENT ================= */

const JoinUs: React.FC = () => {
  const [dsaType, setDsaType] = useState<DsaType>("");
  const [docs, setDocs] = useState<Documents>({});
  const [refCode, setRefCode] = useState("");

  /* ===== Reference Code (Frontend Demo) ===== */
  useEffect(() => {
    setRefCode(
      "DSA-" +
        Math.random().toString(36).substring(2, 6).toUpperCase() +
        Date.now().toString().slice(-4)
    );
  }, []);

  /* ===== File Handler ===== */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Documents
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    setDocs((prev) => ({ ...prev, [key]: e.target.files![0] }));
  };

  /* ===== Submit ===== */
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!docs.pan || !docs.aadhar || !docs.bank) {
    alert("PAN, Aadhar & Bank Proof are mandatory");
    return;
  }


  const formData = new FormData();

// text fields
formData.append("dsaType", dsaType);
formData.append("fullName", (e.target as any).fullName?.value || "");
formData.append("mobile", (e.target as any).mobile?.value || "");
formData.append("email", (e.target as any).email?.value || "");
formData.append("city", (e.target as any).city?.value || "");
formData.append("refCode", refCode);

// mandatory documents
if (docs.pan) formData.append("pan", docs.pan);
if (docs.aadhar) formData.append("aadhar", docs.aadhar);
if (docs.bank) formData.append("bank", docs.bank);

// optional documents
if (docs.gst) formData.append("gst", docs.gst);


fetch(
  "https://rupeedial.com/rupeedial-backend/public/index.php?route=dsa-register",
  {
    method: "POST",
    body: formData,
  }
)
  .then((res) => res.json())
  .then((data) => {
    console.log("Backend response:", data);

    if (data.success) {
      alert("DSA Application submitted successfully");
    } else {
      alert(data.message || "Submission failed");
    }
  })
  .catch((err) => {
    console.error(err);
    alert("Server error");
  });

};


  return (
    <div className="bg-green-50">

      {/* HERO */}
     {/* HERO */}
      <section className="bg-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <span className="bg-green-200 text-green-800 px-4 py-1 rounded-full text-sm">
            RupeeDial DSA Connect
          </span>
          <h1 className="text-4xl font-bold text-green-900 mt-4">
            Join RupeeDial as a DSA Partner
          </h1>
          <p className="text-gray-700 mt-3 text-lg max-w-3xl">
            Partner with RupeeDial and earn high commissions by referring loan
            customers. We manage banks, processing & disbursals — you focus on
            business growth.
          </p>
        </div>
      </section>

      {/* WHAT IS DSA */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          What is RupeeDial DSA Connect?
        </h2>
        <p className="max-w-4xl mx-auto text-gray-700 text-lg">
          RupeeDial DSA Connect is a partner program that allows individuals and
          businesses to earn commission by sourcing loan customers. RupeeDial
          handles credit evaluation, bank coordination, documentation and
          disbursal.
        </p>
      </section>

      {/* WHY JOIN */}
      <section className="py-16 bg-green-50">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
          Why Join RupeeDial?
        </h2>
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            ["High Commission", "Earn up to 95% commission on successful loans"],
            ["Multiple Products", "Personal, Home, MSME, LAP, Auto & Cards"],
            ["Zero Initial Cost", "No joining fee for Channel & Referral DSAs"],
            ["Dedicated Support", "Relationship manager & backend support"],
            ["Fast Payouts", "Transparent, on-time settlements"],
            ["Trusted Brand", "Tie-ups with top banks & NBFCs"],
          ].map(([title, desc], i) => (
            <div key={i} className="bg-white border rounded-xl p-6">
              <h3 className="font-semibold text-green-800 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHO CAN TAKE FRANCHISE */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
          Who Can Take RupeeDial Franchise?
        </h2>
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-6 text-gray-700">
          <ul className="list-disc pl-6 space-y-2">
            <li>Professionals with sales or finance background</li>
            <li>Existing loan agents or DSAs</li>
            <li>Business owners with local market reach</li>
            <li>Individuals with office space in prime location</li>
          </ul>
          <ul className="list-disc pl-6 space-y-2">
            <li>Strong local network in city or district</li>
            <li>Ability to hire small sales team</li>
            <li>Good understanding of banking / finance</li>
            <li>Long-term business vision</li>
          </ul>
        </div>
      </section>

      {/* FRANCHISE PROPOSAL */}
      <section className="py-16 bg-green-50">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
          Franchise Proposal & Commercials
        </h2>

        <div className="max-w-5xl mx-auto px-4 bg-white rounded-xl border p-8 text-gray-700">
          <ul className="list-disc pl-6 space-y-3">
            <li>
              <b>Probation Period:</b> First 90 days performance-based evaluation
            </li>
            <li>
              <b>Franchise Fee:</b> Charged after probation for branding,
              stationery & onboarding support
            </li>
            <li>
              <b>Commission:</b> Up to <b>95%</b> on net payout
              <br />
              <span className="text-sm text-gray-500">
                (TDS & GST applicable as per law, excluded from commission)
              </span>
            </li>
            <li>
              <b>Support:</b> Dedicated RM, marketing creatives & CRM access
            </li>
            <li>
              <b>Territory:</b> City / District level exclusivity (subject to
              performance)
            </li>
          </ul>
        </div>
      </section>

      {/* DOCUMENT REQUIREMENTS – 4 COLUMNS */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-green-900 text-center mb-10">
          Documents Required (By DSA Type)
        </h2>

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 md:grid-cols-2 gap-6">

          {/* Franchise */}
          <div className="border rounded-xl p-6 bg-green-50">
            <h3 className="font-semibold text-green-800 mb-3">
              Franchise Partner
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
              <li>PAN Card *</li>
              <li>Aadhar Card *</li>
              <li>Bank Proof *</li>
              <li>Office Address Proof *</li>
              <li>GST Certificate (Optional)</li>
            </ul>
          </div>

         

          {/* Channel */}
          <div className="border rounded-xl p-6 bg-green-50">
            <h3 className="font-semibold text-green-800 mb-3">
              Channel Partner
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
              <li>PAN Card *</li>
              <li>Aadhar Card *</li>
              <li>Bank Proof *</li>
              <li>GST Certificate (Optional)</li>
            </ul>
          </div>

          {/* Referral */}
          <div className="border rounded-xl p-6 bg-green-50">
            <h3 className="font-semibold text-green-800 mb-3">
              Referral Partner
            </h3>
            <ul className="list-disc pl-5 text-sm space-y-1 text-gray-700">
              <li>PAN Card *</li>
              <li>Aadhar Card *</li>
              <li>Bank Proof *</li>
            </ul>
          </div>

        </div>
      </section>

      {/* JOIN FORM */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-900 text-center mb-8">
            DSA Registration Form
          </h2>

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

            {/* DSA TYPE */}
            <select
              required
              value={dsaType}
              onChange={(e) => {
                setDsaType(e.target.value as DsaType);
                setDocs({});
              }}
              className="md:col-span-2 border rounded-lg px-4 py-3"
            >
              <option value="">Select DSA Type</option>
              <option value="franchise">Franchise Partner</option>
             
              <option value="channel">Channel Partner</option>
              <option value="referral">Referral Partner</option>
            </select>

            {/* BASIC DETAILS */}
           <input
  required
  name="fullName"
  placeholder="Full Name"
  className="border px-4 py-3 rounded-lg"
/>

<input
  required
  name="mobile"
  type="tel"
  pattern="[0-9]{10}"
  placeholder="Mobile Number"
  className="border px-4 py-3 rounded-lg"
/>


<input
  required
  name="email"
  type="email"
  placeholder="Email Address"
  className="border px-4 py-3 rounded-lg"
/>

<input
  required
  name="city"
  placeholder="City"
  className="border px-4 py-3 rounded-lg"
/>



  <input
  name="refCode"
  value={refCode}
  readOnly
  className="md:col-span-2 bg-gray-100 border px-4 py-3 rounded-lg font-semibold"
/>



            {/* DOCUMENT UPLOADS */}
            <div>
              <label className="text-sm font-medium">PAN Card *</label>
              <input type="file" required accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleFileChange(e, "pan")}
                className="w-full border rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-medium">Aadhar Card *</label>
              <input type="file" required accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleFileChange(e, "aadhar")}
                className="w-full border rounded-lg px-3 py-2" />
            </div>

            <div>
              <label className="text-sm font-medium">Bank Proof *</label>
              <input type="file" required accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleFileChange(e, "bank")}
                className="w-full border rounded-lg px-3 py-2" />
            </div>

          

            <div>
              <label className="text-sm font-medium">GST Certificate (Optional)</label>
              <input type="file" accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => handleFileChange(e, "gst")}
                className="w-full border rounded-lg px-3 py-2" />
            </div>

            <button
              type="submit"
              className="md:col-span-2 bg-green-700 hover:bg-green-800 text-white py-4 rounded-lg text-lg font-semibold"
            >
              Submit DSA Application
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default JoinUs;

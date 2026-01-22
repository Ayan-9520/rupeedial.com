import React, { useState } from "react";
import partner from "../assets/images/partnerlogin.png";
/* ================= TYPES ================= */

type DsaType = "" | "franchise" | "branch" | "channel" | "referral";

interface Documents {
  pan?: File;
  aadhar?: File;
  bank?: File;
  gst?: File;
  officeProof?: File;
}
const generateRefCode = (type: DsaType) => {
  let prefix = "PRT";

  if (type === "referral") prefix = "REF";
  else if (type === "channel") prefix = "CHN";
  else if (type === "franchise") prefix = "FRA";

  return (
    prefix +
    "-" +
    Math.random().toString(36).substring(2, 6).toUpperCase() +
    Date.now().toString().slice(-4)
  );
};

/* ================= COMPONENT ================= */

const BecomePartner: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dsaType, setDsaType] = useState<DsaType>("referral");
  const [docs, setDocs] = useState<Documents>({});
 const [refCode, setRefCode] = useState<string>(
  generateRefCode("referral") // default referral
);
const [submitted, setSubmitted] = useState(false);
const [applicationId, setApplicationId] = useState<string | null>(null);


  /* ===== Reference Code (Frontend Demo) ===== */
  
  /* ===== File Handler ===== */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Documents
  ) => {
    if (!e.target.files || !e.target.files[0]) return;
    setDocs((prev) => ({ ...prev, [key]: e.target.files![0] }));
  };
type JoinUsForm = HTMLFormElement & {
  fullName: HTMLInputElement;
  mobile: HTMLInputElement;
  email: HTMLInputElement;
  city: HTMLInputElement;
};

  /* ===== Submit ===== */
 const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (loading) return;
  setLoading(true);

  const form = e.currentTarget as JoinUsForm;

  // Mandatory docs check
  if (!docs.pan || !docs.aadhar || !docs.bank) {
    alert("PAN, Aadhar & Bank Proof are mandatory");
    setLoading(false);
    return;
  }

  // Franchise specific check
  if (dsaType === "franchise" && !docs.officeProof) {
    alert("Office address proof is mandatory for Franchise partners");
    setLoading(false);
    return;
  }

  const formData = new FormData();

  // text fields
  formData.append("dsaType", dsaType);
  formData.append("fullName", form.fullName.value);
  formData.append("mobile", form.mobile.value);
  formData.append("email", form.email.value);
  formData.append("city", form.city.value);
  formData.append("refCode", refCode);

  // documents
  if (docs.pan) formData.append("pan", docs.pan);
  if (docs.aadhar) formData.append("aadhar", docs.aadhar);
  if (docs.bank) formData.append("bank", docs.bank);
  if (docs.officeProof) formData.append("officeProof", docs.officeProof);
  if (docs.gst) formData.append("gst", docs.gst);

 fetch(
  "https://rupeedial.com/rupeedial-backend/public/index.php?action=partner/apply",
  {
    method: "POST",
    body: formData,
  }
)
  .then((res) => res.json())
  .then((data) => {
  setLoading(false);

  if (data.success) {
  setSubmitted(true);
  setApplicationId(data.leadId || refCode);
}
 else {
    alert(data.message || "Submission failed");
  }
})

  .catch((err) => {
    console.error(err);
    setLoading(false);
    alert("Server error");
  });
};

  return (
    <div className="bg-green-50">
{/* HERO + FORM SECTION */}
<section className="py-5 bg-green-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid md:grid-cols-2 gap-12 items-start">
   {/* ================= RIGHT : HERO / INFO CARD ================= */}
      <div className="bg-white rounded-2xl shadow-lg p-10 border sticky top-24">
        <span className="inline-block mb-4 bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm">
          RupeeDial Partner Connect
        </span>

        <h2 className="text-3xl font-extrabold text-green-900 mb-4 leading-tight">
          Build Your Career as a{" "}
          <span className="text-green-700">RupeeDial Partner Partner</span>
        </h2>

        <p className="text-gray-600  text-sm mb-2 leading-relaxed">
          Partner with RupeeDial and earn high commissions by referring loan
          customers. We manage banks, processing & disbursals — you focus on
          business growth.
        </p>
        <p className="text-2xl  text-center font-extrabold text-green-700  leading-tight">
          Partner Application Process
          </p>
 <div className=" rounded-2xl overflow-hidden h-68">
  <img
    src={partner}   // apni image ka path
    alt="Partner Process"
    className="w-full h-full object-cover"
  />
</div>

        

        <div className=" mb-[-100px]">
          {[
            "Up to 95% commission on disbursed cases",
            "Tie-ups with 20+ Banks & NBFCs",
            "Dedicated Relationship Manager",
            "Fast payouts & transparent tracking",
            "Zero joining fee for Channel & Referral",
          ].map((text, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-700 font-bold">
                ✓
              </div>
              <p className="text-gray-700 text-sm">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white   p-6">
     

        </div>

      </div>
      {/* ================= LEFT : FORM CARD ================= */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border">

        {submitted && (
        
            
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {submitted && (
  <div className="bg-white border border-green-300 rounded-xl p-8 text-center mb-10">
    <h2 className="text-2xl font-bold text-green-800 mb-2">
      Application Submitted Successfully 🎉
    </h2>

    <p className="text-green-700 mb-4">
      Your Application ID:
    </p>

    <p className="text-xl font-bold text-green-900 mb-6">
      {applicationId}
    </p>

    <p className="text-green-700 mb-6">
      Our team will contact you within <b>24–48 working hours</b> after document verification.
    </p>

    <button
      onClick={() => (window.location.href = "/")}
      className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-6 py-3 rounded-lg font-semibold"
    >
      Back to Home
    </button>
  </div>
)}

             
            </div>
          
        )}

        <h2 className="text-2xl font-bold text-green-900 mb-1">
          Partner Registration Form
        </h2>
        <p className="text-gray-600 mb-4">
          Fill the form to start your partnership journey with RupeeDial.
        </p>

        {!submitted && (
          <>
           <form 
  onSubmit={handleSubmit} 
  className="grid md:grid-cols-2 gap-6"
  encType="multipart/form-data"   // 🔥 YE LINE ADD KARO
>


              {/* Partner TYPE */}
              <div className="md:col-span-2">
  <label className="block  font-medium text-gray-700">
    Select Partner Type
  </label>

  <div className="flex bg-green-100 rounded-xl ">
   {[
  { label: "Referral Partner", value: "referral" },
  { label: "Channel Partner", value: "channel" },
  { label: "Franchise Partner", value: "franchise" },
].map((item) => (
  <button
    key={item.value}
    type="button"
    onClick={() => {
      const type = item.value as DsaType;
      setDsaType(type);
      setDocs({});
      // Optional: clear old file inputs visually (future improvement)

      setRefCode(generateRefCode(type)); // type ke hisaab se code
    }}
    className={`flex-1 py-2 rounded-lg font-semibold transition
      ${
        dsaType === item.value
          ? "bg-green-700 text-white shadow"
          : "text-green-800 hover:bg-green-200"
      }`}
  >
    {item.label}
  </button>
))}

  </div>
</div>


              {/* BASIC DETAILS */}
              <input
                required
                name="fullName"
                placeholder="Full Name"
                className="border px-2 py-1 rounded-lg"
              />

              <input
                required
                name="mobile"
                type="tel"
                pattern="[0-9]{10}"
                placeholder="Mobile Number"
                className="border px-2 py-1 rounded-lg"
              />

              <input
                required
                name="email"
                type="email"
                placeholder="Email Address"
                className="border px-2 py-1 rounded-lg"
              />

              <input
                required
                name="city"
                placeholder="City"
                className="border px-2 py-1 rounded-lg"
              />

              <input
                name="refCode"
                value={refCode}
                readOnly
                className="md:col-span-2 bg-gray-100 border px-4 py-1 rounded-lg font-semibold"
              />

              {/* DOCUMENT UPLOADS */}
              {dsaType && (
                <>
                  <div>
                    <label className="text-sm font-medium">PAN Card *</label>
                    <input
                      type="file"
                      required
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileChange(e, "pan")}
                      className="w-full border rounded-lg px-3 py-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Aadhar Card *</label>
                    <input
                      type="file"
                      required
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileChange(e, "aadhar")}
                      className="w-full border rounded-lg px-3 py-1"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium">Bank Proof *</label>
                    <input
                      type="file"
                      required
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={(e) => handleFileChange(e, "bank")}
                      className="w-full border rounded-lg px-3 py-1"
                    />
                  </div>

                  {dsaType === "franchise" && (
                    <div>
                      <label className="text-sm font-medium">
                        Office Address Proof *
                      </label>
                      <input
                        type="file"
                        required
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e, "officeProof")}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  )}

                  {dsaType !== "referral" && (
                    <div>
                      <label className="text-sm font-medium">
                        GST Certificate (Optional)
                      </label>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        onChange={(e) => handleFileChange(e, "gst")}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    </div>
                  )}
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 bg-green-700 hover:bg-green-800 text-white py-2 rounded-xl text-lg font-bold shadow-md hover:shadow-lg transition"
              >
                {loading ? "Submitting..." : "Join RupeeDial as Partner"}
              </button>
            </form>

           
          </>
        )}
      </div>

   
    </div>
  </div>
</section>

      {/* WHAT IS Partner */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-green-900 mb-4">
          What is RupeeDial Partner Connect?
        </h2>
        <p className="max-w-4xl mx-auto text-gray-700 text-lg">
          RupeeDial Partner Connect is a partner program that allows individuals and
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
            ["Zero Initial Cost", "No joining fee for Channel & Referral Partners"],
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
            <li>Existing loan agents or Partners</li>
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

        <div className="max-w-5xl mx-auto px-6 bg-white rounded-2xl shadow-lg p-10 text-gray-700">

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
          Documents Required (By Partner Type)
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

     
    </div>
   );
};

export default BecomePartner;

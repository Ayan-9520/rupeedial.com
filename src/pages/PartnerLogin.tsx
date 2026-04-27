import React, { useState, useEffect } from "react";
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


 

/* ================= COMPONENT ================= */

const BecomePartner: React.FC = () => {


  useEffect(() => {
    // Page Title
    document.title =
      "Become a RupeeDial Partner | DSA, Channel & Franchise Program";

    // Meta Description
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute(
      "content",
      "Join RupeeDial Partner Connect program. Become a Referral, Channel or Franchise Partner and earn up to 95% commission with zero joining fee."
    );

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }

    canonical.setAttribute(
      "href",
      "https://rupeedial.com/become-partner"
    );
  }, []);

  const [loading, setLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const [dsaType, setDsaType] = useState<DsaType>("referral");
  const [docs, setDocs] = useState<Documents>({});

  const [submitted, setSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState<string | null>(null);


  /* ===== Reference Code (Frontend Demo) ===== */

  /* ===== File Handler ===== */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof Documents
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ✅ Size check
    if (file.size > 2 * 1024 * 1024) {
      alert("File must be less than 2MB");
      return;
    }

    // ✅ Type check
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.type)) {
      alert("Only JPG, PNG, PDF allowed");
      return;
    }

    setDocs((prev) => ({ ...prev, [key]: file }));
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
    if (!consent) {
      alert("Please authorize RupeeDial to contact you to proceed");
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
      .then(async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Server error");
  }

  return data;
})
      .then((data) => {
        setLoading(false);

        if (data.success) {
          setSubmitted(true);
          setApplicationId(data.leadId);
        } else {
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
      <section className="py-6 bg-green-50">
        <div className="max-w-7xl mx-auto  px-4 sm:px-6">

          {/* ===== SINGLE BIG WHITE CARD ===== */}
          <div className="bg-white rounded-3xl shadow-xl border p-6 sm:p-8 md:p-8">

            {/* ===== TOP : TWO COLUMN LAYOUT ===== */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">

              {/* ================= LEFT : CONTENT ================= */}
              <div className="order-1 md:order-1">

                <span className="inline-block mb-4 bg-green-100 text-green-800 px-4 py-1 rounded-full text-sm">
                  RupeeDial Partner Connect
                </span>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-green-900 mb-4 leading-tight">
                  Build Your Career as a{" "}
                  <span className="text-green-700">RupeeDial Partner</span>
                </h2>

                <p className="text-gray-600 text-sm sm:text-base mb-4 leading-relaxed">
                  Partner with RupeeDial and earn high commissions by referring loan
                  customers. We manage banks, processing & disbursals — you focus on
                  business growth.
                </p>

                <p className="text-xl sm:text-2xl text-center font-extrabold text-green-700 mb-4">
                  Partner Application Process
                </p>

                <div className="rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[16/10]">
                  <img
                    src={partner}
                    alt="Partner Process"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className=" rounded-xl ">
                  <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-5">

                    {[
                      "Up to 95% Commission",
                      "20+ Bank Tie-ups",
                      "Dedicated RM",
                      "Fast Payouts",
                      "Zero Joining Fee",
                    ].map((text, i) => (
                      <div
                        key={i}
                        className="
          flex items-center gap-3 
          bg-white 
          px-2 py-1 
          rounded-xl 
          shadow-md 
          border border-green-200
          hover:border-green-400 
          hover:shadow-lg 
          transition-all duration-200
        "
                      >
                        {/* Green Tick Circle */}
                        <span className="
          flex items-center justify-center 
          w-6 h-6 
          rounded-full 
          bg-green-600 
          text-white 
          text-xs 
          font-bold
        ">
                          ✓
                        </span>

                        <span className="text-green-900 font-semibold text-sm sm:text-base">
                          {text}
                        </span>
                      </div>
                    ))}

                  </div>
                </div>

              </div>

              {/* ================= RIGHT : FORM ================= */}
              <div className="order-2 md:order-2">

                {/* Purple Shadow Form Card */}
                <div className="border border-green-200 rounded-2xl p-3 sm:p-6 shadow-[0_0_30px_rgba(147,51,234,0.15)]">

                  {submitted && (
                    <div className="border border-green-300 rounded-xl p-4 text-center mb-6">
                      <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
                        Application Submitted Successfully 🎉
                      </h2>

                      <p className="text-green-700 mb-2">
                        Your Application ID:
                      </p>

                      <p className="text-lg sm:text-xl font-bold text-green-900 mb-4">
                        {applicationId}
                      </p>

                      <p className="text-green-700 mb-2">
                        Your application is under review
                      </p>

                      <p className="text-green-700 mb-2">
                        Approval Time: <b>24–48 hours</b>
                      </p>

                      <p className="text-sm text-gray-700 mb-4">
                        CRM Login:
                      </p>
                      <p className="text-xs text-gray-500 mb-2">
                        You will receive approval confirmation via Email/SMS.
                      </p>

                      <br />
                      <a
                        href="https://crm.rupeedial.com"
                        target="_blank"
                        className="text-green-700 font-semibold"
                      >
                        https://crm.rupeedial.com
                      </a>


                      <button
                        onClick={() => (window.location.href = "/")}
                        className="border border-green-700 text-green-700 hover:bg-green-700 hover:text-white px-6 py-3 rounded-lg font-semibold"
                      >
                        Back to Home
                      </button>
                    </div>
                  )}

                  {!submitted && (
                    <>
                      <h2 className="text-xl sm:text-2xl font-bold text-green-900 mb-1">
                        Partner Registration Form
                      </h2>
                      <p className="text-gray-600 mb-2 text-sm sm:text-base">
                        Fill the form to start your partnership journey with RupeeDial.
                      </p>

                      <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-6"
                        encType="multipart/form-data"
                      >

                        {/* Partner TYPE */}
                        <div className="sm:col-span-2">
                          <label className="block font-medium text-gray-700 mb-1">
                            Select Partner Type
                          </label>

                          <div className="flex flex-col sm:flex-row bg-green-100 rounded-xl p-1 gap-2 sm:gap-1">
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

                                }}
                                className={`w-full sm:flex-1 py-1 sm:py-1 rounded-lg font-semibold text-sm sm:text-base transition
                            ${dsaType === item.value
                                    ? "bg-green-700 text-white shadow"
                                    : "bg-white text-green-800 hover:bg-green-200"
                                  }`}
                              >
                                {item.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* BASIC DETAILS */}
                        <input required name="fullName" placeholder="Full Name" className="border px-3 py-2 sm:py-3 rounded-lg w-full text-sm sm:text-base" />
                        <input required name="mobile" type="tel" pattern="[6-9][0-9]{9}" placeholder="Mobile Number" className="border px-3 py-1 rounded-lg w-full" />
                        <input required name="email" type="email" placeholder="Email Address" className="border px-3 py-1 rounded-lg w-full" />
                        <input required name="city" placeholder="City" className="border px-3 py-1 rounded-lg w-full" />



                        {/* DOCUMENT UPLOADS */}
                        {dsaType && (
                          <>
                            <div>
                              <label className="text-sm font-medium">PAN Card *</label>
                              <input type="file" required accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, "pan")} className="w-full border rounded-lg px-3 py-2" />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Aadhar Card *</label>
                              <input type="file" required accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, "aadhar")} className="w-full border rounded-lg px-3 py-2" />
                            </div>

                            <div>
                              <label className="text-sm font-medium">Bank Proof *</label>
                              <input type="file" required accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, "bank")} className="w-full border rounded-lg px-3 py-2" />
                            </div>

                            {dsaType === "franchise" && (
                              <div>
                                <label className="text-sm font-medium">Office Address Proof *</label>
                                <input type="file" required accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, "officeProof")} className="w-full border rounded-lg px-3 py-2" />
                              </div>
                            )}

                            {dsaType !== "referral" && (
                              <div>
                                <label className="text-sm font-medium">GST Certificate (Optional)</label>
                                <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={(e) => handleFileChange(e, "gst")} className="w-full border rounded-lg px-3 py-2" />
                              </div>
                            )}
                          </>
                        )}
                        <div className="sm:col-span-2 flex items-start gap-2 text-xs text-gray-600 mt-">
                          <input
                            type="checkbox"
                            checked={consent}
                            onChange={(e) => setConsent(e.target.checked)}
                            className="mt-1 h-4 w-4 text-green-700"
                          />
                          <span>
                            I agree to RupeeDial Terms & Privacy Policy and authorize contact via call, SMS, WhatsApp & email.
                          </span>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                        className="sm:col-span-2 bg-green-700 hover:bg-green-800 text-white py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold w-full"
                        >
                          {loading ? "Please wait..." : "Join RupeeDial as Partner"}
                        </button>

                      </form>
                    </>
                  )}

                </div>
              </div>

            </div>

            {/* ===== BOTTOM PURPLE BENEFITS ROW ===== */}


          </div>
        </div>
      </section>



      {/* WHAT IS Partner */}
      <section className="py-4 bg-white text-center">
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
      <section className="py-10 bg-green-50">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 text-center mb-10">
          Why Join RupeeDial?
        </h2>

        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: "High Commission",
              desc: "Earn up to 95% commission on successful loans",
            },
            {
              title: "Multiple Products",
              desc: "Personal, Home, MSME, LAP, Auto & Cards",
            },
            {
              title: "Zero Initial Cost",
              desc: "No joining fee for Channel & Referral Partners",
            },
            {
              title: "Dedicated Support",
              desc: "Relationship manager & backend support",
            },
            {
              title: "Fast Payouts",
              desc: "Transparent, on-time settlements",
            },
            {
              title: "Trusted Brand",
              desc: "Tie-ups with top banks & NBFCs",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-green-700 rounded-xl p-6 shadow-md hover:bg-green-800 transition-colors duration-200"
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {item.title}
              </h3>
              <p className="text-green-100 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>


      {/* WHO CAN TAKE FRANCHISE */}
      <section className="py-4 bg-white">
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
      <section className="py-4 bg-green-50">
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
      <section className="py-4 bg-white">
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

      <section className="py-10 bg-[#F5FFF8]">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-900 text-center mb-6">
            RupeeDial Partner Program – FAQs
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

            <details className="bg-white border rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                Is there any joining fee to become a RupeeDial partner?
              </summary>
              <p className="mt-2 text-sm text-gray-700">
                No. RupeeDial does not charge any joining fee for Referral or Channel
                Partners. Franchise fee is applicable only after probation period.
              </p>
            </details>

            <details className="bg-white border rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                How much commission can I earn as a partner?
              </summary>
              <p className="mt-2 text-sm text-gray-700">
                Partners can earn up to 95% commission depending on product, bank and
                performance. Payouts are transparent and timely.
              </p>
            </details>

            <details className="bg-white border rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                Who can apply for RupeeDial Partner Connect?
              </summary>
              <p className="mt-2 text-sm text-gray-700">
                Individuals, loan agents, financial advisors, business owners and
                professionals with local market reach can apply.
              </p>
            </details>

            <details className="bg-white border rounded-xl p-4">
              <summary className="font-semibold cursor-pointer">
                How long does partner approval take?
              </summary>
              <p className="mt-2 text-sm text-gray-700">
                Partner applications are usually reviewed within 24–48 working hours
                after document verification.
              </p>
            </details>

          </div>
        </div>
      </section>

    </div>
  );
};

export default BecomePartner;

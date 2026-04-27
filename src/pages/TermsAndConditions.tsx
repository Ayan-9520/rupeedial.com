import React from "react";

const TermsAndConditions: React.FC = () => {
  return (
    <main className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-[#390A5D] mb-2">
          Terms & Conditions
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>

        {/* INTRO */}
        <p className="mb-6 leading-relaxed">
          Welcome to <strong>RupeeDial</strong>. By accessing or using our website
          and services, you agree to be bound by these Terms & Conditions. Please
          read them carefully before using our platform.
        </p>

        {/* SECTION 1 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          1. Nature of Service
        </h2>
        <p className="mb-6">
          RupeeDial is a loan assistance and comparison platform. We do not provide
          loans directly. Our role is limited to connecting users with banks,
          NBFCs, and other regulated lending institutions.
        </p>

        {/* SECTION 2 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          2. Eligibility
        </h2>
        <p className="mb-6">
          By using this website, you confirm that you are at least 18 years old
          and capable of entering into a legally binding agreement under Indian
          law.
        </p>

        {/* SECTION 3 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          3. Loan Approval & Disbursal
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Loan approval is subject to lender policies and eligibility criteria</li>
          <li>Interest rates, fees, and tenure are decided solely by the lender</li>
          <li>RupeeDial does not guarantee loan approval or disbursal</li>
        </ul>

        {/* SECTION 4 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          4. Fees & Charges
        </h2>
        <p className="mb-6">
          RupeeDial does not charge any upfront fees from users. Any charges,
          processing fees, or commissions are levied directly by the lending
          institution as per their policies.
        </p>

        {/* SECTION 5 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          5. User Responsibilities
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Provide accurate and complete information</li>
          <li>Do not submit false, misleading, or fraudulent details</li>
          <li>Maintain confidentiality of your personal information</li>
        </ul>

        {/* SECTION 6 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          6. Communication Consent
        </h2>
        <p className="mb-6">
          By submitting your details, you authorize RupeeDial and its partners to
          contact you via call, SMS, WhatsApp, or email regarding your loan
          inquiry, even if your number is registered under DND.
        </p>

        {/* SECTION 7 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          7. Intellectual Property
        </h2>
        <p className="mb-6">
          All content on this website, including text, graphics, logos, and
          software, is the property of RupeeDial and is protected under applicable
          intellectual property laws.
        </p>

        {/* SECTION 8 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          8. Limitation of Liability
        </h2>
        <p className="mb-6">
          RupeeDial shall not be liable for any direct, indirect, incidental, or
          consequential damages arising from the use of our website or services.
        </p>

        {/* SECTION 9 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          9. Governing Law
        </h2>
        <p className="mb-6">
          These Terms & Conditions shall be governed by and construed in
          accordance with the laws of India. Any disputes shall be subject to the
          exclusive jurisdiction of courts located in India.
        </p>

        {/* SECTION 10 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          10. Changes to Terms
        </h2>
        <p className="mb-6">
          RupeeDial reserves the right to modify these Terms & Conditions at any
          time. Continued use of the website constitutes acceptance of the
          updated terms.
        </p>

        {/* SECTION 11 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          11. Contact Us
        </h2>
        <p className="mb-2">
          For questions regarding these Terms & Conditions, contact us:
        </p>
        <p className="text-sm">
          📧 Email:{" "}
          <a
            href="mailto:contact@rupeedial.com"
            className="text-[#10662A] font-medium"
          >
            contact@rupeedial.com
          </a>
          <br />
          📞 Phone:{" "}
          <a
            href="tel:+917982953129"
            className="text-[#10662A] font-medium"
          >
            +91 79829 53129
          </a>
        </p>

      </div>
    </main>
  );
};

export default TermsAndConditions;

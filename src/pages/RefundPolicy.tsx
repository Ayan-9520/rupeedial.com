import React from "react";

const RefundPolicy: React.FC = () => {
  return (
    <main className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-10 text-gray-800">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-[#390A5D] mb-2">
          Refund Policy
        </h1>

        <p className="text-sm text-gray-500 mb-8">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>

        {/* INTRO */}
        <p className="mb-6 leading-relaxed">
          This Refund Policy outlines the circumstances under which refunds may
          be applicable for services offered by <strong>RupeeDial</strong>.
          Please read this policy carefully before using our platform.
        </p>

        {/* SECTION 1 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          1. No Upfront Fees
        </h2>
        <p className="mb-6">
          RupeeDial does not charge any upfront fees from users for checking loan
          eligibility or for loan assistance services. Therefore, in most cases,
          refunds are not applicable.
        </p>

        {/* SECTION 2 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          2. Payments to Third-Party Lenders
        </h2>
        <p className="mb-6">
          Any fees, processing charges, or other payments made by users directly
          to banks, NBFCs, or other lending institutions are governed by the
          respective lender’s policies. RupeeDial is not responsible for refunds
          related to such payments.
        </p>

        {/* SECTION 3 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          3. Exceptional Cases
        </h2>
        <p className="mb-6">
          In rare situations where a payment is mistakenly made to RupeeDial
          due to a technical error or incorrect transaction, users may contact
          us for review. Any refund in such cases will be processed after
          verification and at RupeeDial’s sole discretion.
        </p>

        {/* SECTION 4 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          4. Refund Processing
        </h2>
        <p className="mb-6">
          If a refund is approved, it will be processed using the original
          method of payment within a reasonable time frame, subject to banking
          procedures and regulations.
        </p>

        {/* SECTION 5 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          5. Changes to This Policy
        </h2>
        <p className="mb-6">
          RupeeDial reserves the right to update or modify this Refund Policy at
          any time. Changes will be effective immediately upon posting on this
          page.
        </p>

        {/* SECTION 6 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          6. Contact Us
        </h2>
        <p className="mb-2">
          For any questions or concerns regarding this Refund Policy, please
          contact us:
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

export default RefundPolicy;

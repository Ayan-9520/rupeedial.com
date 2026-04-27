import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <main className="bg-white">
      <div className="max-w-5xl mx-auto px-6 py-4 text-gray-800">

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-[#390A5D] mb-2">
          Privacy Policy
        </h1>

        <p className="text-sm text-gray-500 mb-4">
          Last updated: {new Date().toLocaleDateString("en-IN")}
        </p>

        {/* INTRO */}
        <p className="mb-6 leading-relaxed">
          <strong>RupeeDial</strong> (“we”, “our”, “us”) is committed to protecting
          your privacy and ensuring transparency in how your personal information
          is collected, used, and shared. This Privacy Policy explains our data
          practices when you visit our website or use our loan assistance services.
        </p>

        {/* SECTION 1 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          1. Information We Collect
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>Personal details such as name, mobile number, email address</li>
          <li>Loan and financial information voluntarily provided by you</li>
          <li>Device, browser type, IP address, and usage data</li>
          <li>Cookies and tracking data for analytics and performance</li>
        </ul>

        {/* SECTION 2 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          2. How We Use Your Information
        </h2>
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>To evaluate eligibility and assist with loan applications</li>
          <li>To share required information with banks and NBFC partners</li>
          <li>To contact you via phone call, SMS, WhatsApp, or email</li>
          <li>To improve website performance and customer experience</li>
          <li>To comply with applicable legal and regulatory obligations</li>
        </ul>

        {/* SECTION 3 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          3. Information Sharing & Disclosure
        </h2>
        <p className="mb-6">
          RupeeDial does not sell or rent your personal data. Information may be
          shared only with verified lending partners, service providers, or
          regulatory authorities strictly for loan processing, verification, and
          compliance purposes.
        </p>

        {/* SECTION 4 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          4. Cookies & Tracking Technologies
        </h2>
        <p className="mb-6">
          We use cookies and similar technologies to analyze traffic, enhance
          functionality, and improve services. You can manage cookie preferences
          through your browser settings.
        </p>

        {/* SECTION 5 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          5. Data Security
        </h2>
        <p className="mb-6">
          We use reasonable administrative, technical, and physical safeguards to
          protect your personal data. However, no method of transmission over the
          internet is completely secure.
        </p>

        {/* SECTION 6 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          6. Sensitive Personal Data
        </h2>
        <p className="mb-6">
          RupeeDial does not knowingly collect sensitive personal data such as
          passwords, biometric data, or financial account credentials unless
          explicitly required for loan processing by a regulated lender.
        </p>

        {/* SECTION 7 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          7. Communication Consent
        </h2>
        <p className="mb-6">
          By submitting your details on our platform, you expressly consent to be
          contacted by RupeeDial and its partners via call, SMS, WhatsApp, or email
          regarding your loan inquiry, even if your number is registered on DND.
        </p>

        {/* SECTION 8 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          8. Third-Party Websites
        </h2>
        <p className="mb-6">
          Our website may contain links to third-party websites. We are not
          responsible for the privacy practices or content of such websites.
        </p>

        {/* SECTION 9 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          9. Policy Updates
        </h2>
        <p className="mb-6">
          RupeeDial may update this Privacy Policy periodically. Any changes will
          be posted on this page and will be effective immediately.
        </p>

        {/* SECTION 10 */}
        <h2 className="text-xl font-semibold text-[#10662A] mb-3">
          10. Contact Information
        </h2>
        <p className="mb-2">
          For any questions or concerns regarding this Privacy Policy, please
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

export default PrivacyPolicy;

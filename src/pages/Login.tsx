import React, { useEffect, useState } from "react";
import { CRM_APP_URL } from "../data/partnerPlans";

const RupeeDialConnect: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"associate" | "employee">(
    "associate"
  );

  useEffect(() => {
    document.title = "Login | RupeeDial Connect CRM";
  }, []);

  // CRM keeps its session on its own domain, so sign-in must happen there.
  const handleLogin = () => {
    window.location.href = `${CRM_APP_URL}/auth?next=/dashboard`;
  };
const handleRegister = () => {
  if (activeTab === "associate") {
    window.location.href = "/partner-login";   // Partner registration page
  } else {
    alert("Employee accounts are created by HR. Please contact HR team.");
  }
};


  return (
    <div className="relative min-h-screen bg-white overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute -top-32 -left-32 w-[420px] h-[420px] bg-green-100 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-[520px] h-[520px] bg-emerald-100 rounded-full blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 min-h-screen py-4 flex items-center justify-center px-4">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">


          {/* ================= LEFT PANEL ================= */}
          <div
  className={`flex flex-col justify-between p-6 sm:p-8 md:p-10 text-white transition-all duration-300 ${
    activeTab === "associate"
      ? "bg-gradient-to-br from-green-700 to-emerald-600"
      : "bg-gradient-to-br from-emerald-800 to-green-700"
  }`}
>

            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-wide">

                RupeeDial Connect
              </h1>

              {activeTab === "associate" ? (
                <p className="text-sm sm:text-base text-green-100 leading-relaxed">
                  A dedicated platform for <b>Associates & Business Partners</b>{" "}
                  to submit customer loan leads, track application status, and
                  grow earnings with RupeeDial.
                </p>
              ) : (
                <p className="text-sm sm:text-base text-green-100 leading-relaxed">
                  Centralized CRM access for <b>RupeeDial Employees</b> to manage
                  leads, process loans, coordinate teams, and ensure compliance.
                </p>
              )}
            </div>

            {/* Feature Points */}
            <div className="mt-10 space-y-4 text-sm">
              {activeTab === "associate" ? (
                <>
                  <div className="flex gap-3">
                    <span className="text-xl">🤝</span>
                    <p>Easy submission of personal, business & secured loan leads</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xl">💰</span>
                    <p>Transparent commission & payout tracking</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xl">📈</span>
                    <p>Performance dashboard to grow your partner business</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex gap-3">
                    <span className="text-xl">📊</span>
                    <p>End-to-end CRM case & lead management</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xl">🧾</span>
                    <p>Loan processing, verification & approvals</p>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-xl">🔐</span>
                    <p>Secure role-based access for every department</p>
                  </div>
                </>
              )}
            </div>

            <p className="text-xs text-green-200">
              © RupeeDial • Secure Fintech CRM Platform
            </p>
          </div>

          {/* ================= RIGHT PANEL ================= */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl font-bold text-green-800 text-center mb-2">
              Login to CRM
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              Access your RupeeDial dashboard securely
            </p>

            {/* Tabs */}
            <div className="flex mb-6 rounded-xl bg-green-100 p-1">
              <button
                className={`w-1/2 py-2 rounded-lg font-semibold transition ${
                  activeTab === "associate"
                    ? "bg-green-600 text-white shadow"
                    : "text-green-700"
                }`}
                onClick={() => setActiveTab("associate")}
              >
                Partner
              </button>
              <button
                className={`w-1/2 py-2 rounded-lg font-semibold transition ${
                  activeTab === "employee"
                    ? "bg-green-600 text-white shadow"
                    : "text-green-700"
                }`}
                onClick={() => setActiveTab("employee")}
              >
                Employee
              </button>
            </div>

            <ul className="mb-6 space-y-3 rounded-2xl border border-green-100 bg-green-50/60 p-4 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="font-bold text-green-700">1.</span>
                {activeTab === "associate"
                  ? "Use the email you registered with as a partner (DSA)."
                  : "Use the official email your admin created for you."}
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-green-700">2.</span>
                You'll sign in securely on the RupeeDial CRM.
              </li>
              <li className="flex gap-2">
                <span className="font-bold text-green-700">3.</span>
                {activeTab === "associate"
                  ? "New partners can log in once their application is approved."
                  : "Access depends on your role and department."}
              </li>
            </ul>

            <button
              onClick={handleLogin}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-lg"
            >
              Continue to CRM login →
            </button>

            <div className="mt-3 text-center">
              <a href="/contact" className="text-sm text-green-700 hover:underline">
                Forgot password? Contact support
              </a>
            </div>


            {/* Register */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500 mt-4 text-center">
  This is a secure login for authorized RupeeDial partners and employees only.
</p>

              <p className="text-sm text-gray-600 mb-1">
                Don’t have an account?
              </p>
              <button
                onClick={handleRegister}
                className="text-green-700 font-semibold hover:underline"
              >
                Join Us / Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RupeeDialConnect;

import React, { useState } from "react";

const associateTypes = [
  "Franchise Partner",
  
  "Channel Partner",
  "Referral Partner",
];

const employeeTypes = [
  "Sales Team",
  "IT Team",
  "Human Resources (HR)",
  "Operations Team",
  "Credit Processing",
  "Customer Support",
  "Compliance Team",
  "Admin Team",
];

const RupeeDialConnect: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"associate" | "employee">(
    "associate"
  );
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
const [error, setError] = useState("");
const [loggingIn, setLoggingIn] = useState(false);
const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
  setError("");

  if (!userType || !username || !password) {
    setError("Please fill all required fields.");
    return;
  }

  // Mobile / Email validation
  const isMobile = /^[0-9]{10}$/.test(username);
  const isEmail = /\S+@\S+\.\S+/.test(username);

  if (!isMobile && !isEmail) {
    setError("Enter a valid 10-digit mobile number or email address.");
    return;
  }

  setLoggingIn(true);

  // 🔹 Yahan future me API call aayega
  console.log({
    loginType: activeTab,
    role: userType,
    username,
  });
fetch("https://rupeedial.com/rupeedial-backend/public/index.php?action=auth/login", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    loginType: activeTab,   // associate / employee
    role: userType,        // Franchise Partner / IT Team etc
    username: username,    // mobile or email
    password: password,
  }),
})
  .then(async (res) => {
    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.message || "Login failed");
    }

    return data;
  })
  .then((data) => {
    setLoggingIn(false);

    // ✅ Login success
    alert("Login successful. Redirecting to CRM...");

    // 🔐 Token / Session store (future)
    localStorage.setItem("crm_token", data.token);

    // 🚀 Redirect to CRM
    window.location.href = "/crm-dashboard";
  })
  .catch((err) => {
    console.error(err);
    setLoggingIn(false);
    setError(err.message || "Server error. Please try again.");
  });

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
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl grid md:grid-cols-2 overflow-hidden">

          {/* ================= LEFT PANEL ================= */}
          <div
            className={`hidden md:flex flex-col justify-between p-10 text-white transition-all duration-300 ${
              activeTab === "associate"
                ? "bg-gradient-to-br from-green-700 to-emerald-600"
                : "bg-gradient-to-br from-emerald-800 to-green-700"
            }`}
          >
            <div>
              <h1 className="text-4xl font-extrabold mb-4 tracking-wide">
                RupeeDial Connect
              </h1>

              {activeTab === "associate" ? (
                <p className="text-green-100 leading-relaxed">
                  A dedicated platform for <b>Associates & Business Partners</b>{" "}
                  to submit customer loan leads, track application status, and
                  grow earnings with RupeeDial.
                </p>
              ) : (
                <p className="text-green-100 leading-relaxed">
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
                onClick={() => {
                  setActiveTab("associate");
                  setUserType("");
                }}
              >
                Partner
              </button>
              <button
                className={`w-1/2 py-2 rounded-lg font-semibold transition ${
                  activeTab === "employee"
                    ? "bg-green-600 text-white shadow"
                    : "text-green-700"
                }`}
                onClick={() => {
                  setActiveTab("employee");
                  setUserType("");
                }}
              >
                Employee
              </button>
            </div>

            {/* User Type */}
            <div className="mb-4">
              <label className="text-sm font-medium">Select User Type</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="mt-1 w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-green-500"
              >
                <option value="">Select role</option>
                {(activeTab === "associate"
                  ? associateTypes
                  : employeeTypes
                ).map((type) => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Mobile / Email */}
            <div className="mb-4">
              <label className="text-sm font-medium">
                Mobile Number / Email Address
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mt-1 w-full rounded-xl border px-4 py-2 focus:ring-2 focus:ring-green-500"
                placeholder="10-digit mobile number or email"

              />
            </div>

            {/* Password */}
            <div className="mb-6 relative">
  <label className="text-sm font-medium">Password</label>
  <input
    type={showPassword ? "text" : "password"}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    className="mt-1 w-full rounded-xl border px-4 py-2 pr-12 focus:ring-2 focus:ring-green-500"
    placeholder="Enter your password"
  />

  {/* Show / Hide Button */}
  <button
    type="button"
    onClick={() => setShowPassword((p) => !p)}
    className="absolute right-3 top-9 text-xs text-green-700 font-semibold"
  >
    {showPassword ? "Hide" : "Show"}
  </button>
</div>

{/* Forgot Password Link */}
<div className="text-right mb-4">
  <a
    href="/forgot-password"
    className="text-sm text-green-700 hover:underline"
  >
    Forgot Password?
  </a>
</div>

{/* Error Message */}
{error && (
  <p className="text-red-600 text-sm text-center mb-4">
    {error}
  </p>
)}

            {/* Login Button */}
           <button
  onClick={handleLogin}
  disabled={loggingIn || !!error}
  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition shadow-lg disabled:opacity-50"
>
  {loggingIn ? "Logging in..." : "Login to CRM"}
</button>


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

import { Link } from "react-router-dom";
// import learn from "../assets/images/learn.png";




/* ================= PAGE ================= */

export default function LearnEarn() {
  return (
    <main className="bg-white text-gray-800">

     

      {/* ================= HERO ================= */}
<section className="relative bg-gradient-to-br from-green-50 via-white to-green-100 py-14 md:py-8 overflow-hidden">

  {/* Background Glow */}
  <div className="absolute top-[-80px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-green-200 opacity-20 blur-3xl rounded-full"></div>

  <div className="relative max-w-4xl mx-auto px-6">

    {/* Card Container */}
    <div className="bg-white/80 backdrop-blur-md border border-green-100 rounded-2xl shadow-lg px-6 md:px-10 py-10 text-center">

      {/* Badge */}
      <div className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-4 py-1 rounded-full mb-5">
        🚀 India’s Fast Growing Partner Program
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-5xl font-bold text-green-800 leading-tight">
        Learn. Connect. Earn More.
      </h2>

      {/* Subtext */}
      <p className="text-base md:text-lg mt-5 text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Refer loan applications and earn high commissions — 
        <span className="font-semibold text-green-700"> no investment, no targets, no pressure.</span>
      </p>

      {/* Trust Line */}
      <p className="mt-4 text-sm text-gray-500">
        Trusted by <span className="font-semibold text-green-700">10,000+ partners</span> • 
        16+ years experience • RBI-compliant
      </p>

      {/* Divider */}
      <div className="w-16 h-1 bg-green-600 mx-auto mt-6 rounded-full"></div>

      {/* Points */}
      <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm text-green-700 font-medium">
        <span className="flex items-center gap-1">✔ Zero Fees</span>
        <span className="flex items-center gap-1">✔ Work Anywhere</span>
        <span className="flex items-center gap-1">✔ Live Earnings</span>
      </div>

      {/* CTA */}
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">

        <Link
          to="/partner-login"
          className="bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-green-800 hover:shadow-xl transition"
        >
          Become a Partner
        </Link>

        <a
          href="#how-it-works"
          className="border border-green-600 text-green-700 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
        >
          How It Works
        </a>

      </div>

      {/* Earnings Highlight */}
      <p className="mt-6 text-sm text-gray-600">
        💰 Top partners earn up to 
        <span className="font-semibold text-green-700"> ₹50,000+/month</span>
      </p>

    </div>
  </div>
</section>

      {/* ================= ABOUT ================= */}
 <section className="bg-gradient-to-br from-green-50 to-white py-16 md:py-8">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-green-800">
        What is Learn & Earn Program?
      </h3>
      <p className="text-gray-600 mt-4 text-lg">
        A simple way to earn by helping people get loans — no selling, no paperwork.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-8 mt-14">

      {/* Card 1 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
        <div className="text-3xl mb-4">📚</div>
        <h4 className="font-semibold text-lg mb-2 text-green-700">
          Learn Basics
        </h4>
        <p className="text-sm text-gray-600">
          Watch short training videos to understand loan products, eligibility, and process.
        </p>
      </div>

      {/* Card 2 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
        <div className="text-3xl mb-4">🔗</div>
        <h4 className="font-semibold text-lg mb-2 text-green-700">
          Share & Refer
        </h4>
        <p className="text-sm text-gray-600">
          Share your referral link or QR code with customers in your network.
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition">
        <div className="text-3xl mb-4">💰</div>
        <h4 className="font-semibold text-lg mb-2 text-green-700">
          Earn Commission
        </h4>
        <p className="text-sm text-gray-600">
          Rupeedial handles verification, processing & disbursal — you earn after approval.
        </p>
      </div>

    </div>

    {/* Bottom Highlight */}
    <div className="mt-14 bg-white border border-green-100 rounded-xl p-6 text-center shadow-sm max-w-3xl mx-auto">
      <p className="text-gray-700 text-sm md:text-base">
        ✔ No documentation work &nbsp;&nbsp; ✔ No bank follow-ups &nbsp;&nbsp; ✔ 100% handled by Rupeedial
      </p>
    </div>

  </div>
</section>
<section className="bg-white py-16 md:py-8">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-green-800">
        How Much Can You Earn?
      </h3>
      <p className="text-gray-600 mt-4 text-lg">
        Your income depends on how many people you refer — here’s a real example.
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-8 mt-14">

      {/* Card 1 */}
      <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-md text-center">
        <h4 className="font-semibold text-lg text-green-700">
          5 Referrals / Month
        </h4>
        <p className="text-gray-500 text-sm mt-2">
          (Personal Loans)
        </p>
        <p className="text-2xl font-bold text-green-800 mt-4">
          ₹15,000 – ₹30,000
        </p>
      </div>

      {/* Card 2 (highlight) */}
      <div className="bg-green-700 text-white p-8 rounded-2xl shadow-lg text-center scale-105">
        <h4 className="font-semibold text-lg">
          10 Referrals / Month
        </h4>
        <p className="text-sm mt-2 opacity-90">
          (Mixed Loan Types)
        </p>
        <p className="text-3xl font-bold mt-4">
          ₹40,000 – ₹80,000
        </p>
        <p className="text-xs mt-3 opacity-80">
          Most popular earning range
        </p>
      </div>

      {/* Card 3 */}
      <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-2xl shadow-md text-center">
        <h4 className="font-semibold text-lg text-green-700">
          20+ Referrals / Month
        </h4>
        <p className="text-gray-500 text-sm mt-2">
          (High Performers)
        </p>
        <p className="text-2xl font-bold text-green-800 mt-4">
          ₹1,00,000+
        </p>
      </div>

    </div>

    {/* Bottom Note */}
    <div className="mt-12 text-center">
      <p className="text-sm text-gray-500">
        *Earnings depend on loan amount, approval rate, and lender payout structure.
      </p>
    </div>

    {/* CTA */}
    <div className="mt-10 text-center">
      <a
        href="/partner-login"
        className="inline-block bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-green-800 transition"
      >
        Start Earning Now
      </a>
    </div>

  </div>
</section>
<section className="bg-white py-16 md:py-8">
  <div className="max-w-7xl mx-auto px-6">

    <div className="text-center max-w-3xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-green-800">
        Real Partner Success Stories
      </h3>
      <p className="text-gray-600 mt-4 text-lg">
        See how people like you are earning with Rupeedial
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8 mt-14">

      <div className="bg-green-50 p-6 rounded-xl shadow">
        <p className="text-sm text-gray-700">
          “I started part-time and now earn ₹40,000/month consistently.”
        </p>
        <h4 className="mt-4 font-semibold text-green-700">
          Ravi Sharma
        </h4>
        <p className="text-xs text-gray-500">Delhi</p>
      </div>

      <div className="bg-green-50 p-6 rounded-xl shadow">
        <p className="text-sm text-gray-700">
          “No pressure, no targets — just referrals and earnings.”
        </p>
        <h4 className="mt-4 font-semibold text-green-700">
          Neha Verma
        </h4>
        <p className="text-xs text-gray-500">Mumbai</p>
      </div>

      <div className="bg-green-50 p-6 rounded-xl shadow">
        <p className="text-sm text-gray-700">
          “Best side income source. Very smooth process.”
        </p>
        <h4 className="mt-4 font-semibold text-green-700">
          Amit Singh
        </h4>
        <p className="text-xs text-gray-500">Lucknow</p>
      </div>

    </div>

  </div>
</section>
<section className="bg-gradient-to-br from-green-50 to-white py-16 md:py-8">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-green-800">
        Real Partner Success Stories
      </h3>
      <p className="text-gray-600 mt-4 text-lg">
        Thousands are already earning with Rupeedial — here’s what they say
      </p>
    </div>

    {/* Cards */}
    <div className="grid md:grid-cols-3 gap-8 mt-14">

      {/* Card 1 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        
        {/* Stars */}
        <div className="text-yellow-400 text-lg">★★★★★</div>

        {/* Review */}
        <p className="text-gray-700 text-sm mt-4 leading-relaxed">
          I started part-time with zero experience. Within 2 months, I was earning 
          ₹40,000+ consistently. The process is simple and fully managed.
        </p>

        {/* User */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-12 h-12 bg-green-100 text-green-700 flex items-center justify-center rounded-full font-bold">
            R
          </div>
          <div>
            <h4 className="font-semibold text-green-800">Ravi Sharma</h4>
            <p className="text-xs text-gray-500">Delhi • ₹40K/month</p>
          </div>
        </div>

      </div>

      {/* Card 2 (Highlight) */}
      <div className="bg-green-700 text-white p-6 rounded-2xl shadow-lg scale-105">
        
        {/* Stars */}
        <div className="text-yellow-300 text-lg">★★★★★</div>

        {/* Review */}
        <p className="text-sm mt-4 leading-relaxed">
          No targets, no pressure. I just share my referral link and Rupeedial handles everything. 
          Best side income source I’ve found.
        </p>

        {/* User */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-12 h-12 bg-white text-green-700 flex items-center justify-center rounded-full font-bold">
            N
          </div>
          <div>
            <h4 className="font-semibold">Neha Verma</h4>
            <p className="text-xs opacity-80">Mumbai • ₹55K/month</p>
          </div>
        </div>

      </div>

      {/* Card 3 */}
      <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition">
        
        {/* Stars */}
        <div className="text-yellow-400 text-lg">★★★★★</div>

        {/* Review */}
        <p className="text-gray-700 text-sm mt-4 leading-relaxed">
          Smooth process and fast payouts. I recommend this to anyone looking 
          for extra income without investment.
        </p>

        {/* User */}
        <div className="flex items-center gap-4 mt-6">
          <div className="w-12 h-12 bg-green-100 text-green-700 flex items-center justify-center rounded-full font-bold">
            A
          </div>
          <div>
            <h4 className="font-semibold text-green-800">Amit Singh</h4>
            <p className="text-xs text-gray-500">Lucknow • ₹30K/month</p>
          </div>
        </div>

      </div>

    </div>

    {/* Bottom Trust Line */}
    <div className="mt-14 text-center">
      <p className="text-sm text-gray-500">
        ⭐ Rated 4.8/5 by 10,000+ partners across India
      </p>
    </div>

  </div>
</section>
<section id="how-it-works" className="bg-white py-16 md:py-8">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-green-800">
        How It Works
      </h3>
      <p className="text-gray-600 mt-4 text-lg">
        Start earning in 4 simple steps — no experience needed
      </p>
    </div>

    {/* Steps */}
    <div className="grid md:grid-cols-4 gap-8 mt-16 relative">

      {[
        {
          step: "01",
          title: "Learn",
          desc: "Understand loan products, eligibility & process through short training videos",
          icon: "📚",
        },
        {
          step: "02",
          title: "Refer",
          desc: "Share your referral link or QR code with your network",
          icon: "🔗",
        },
        {
          step: "03",
          title: "Processing",
          desc: "We handle verification, bank coordination & approvals",
          icon: "⚙️",
        },
        {
          step: "04",
          title: "Earn",
          desc: "Get commission directly in your account after disbursal",
          icon: "💰",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center relative"
        >

          {/* Step Number */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-green-700 text-white text-xs px-3 py-1 rounded-full shadow">
            Step {item.step}
          </div>

          {/* Icon */}
          <div className="text-4xl mb-4 mt-4">{item.icon}</div>

          {/* Title */}
          <h4 className="font-semibold text-green-800 text-lg mb-2">
            {item.title}
          </h4>

          {/* Desc */}
          <p className="text-sm text-gray-600 leading-relaxed">
            {item.desc}
          </p>

        </div>
      ))}

    </div>

    {/* Bottom CTA */}
    <div className="mt-14 text-center">
      <a
        href="/partner-login"
        className="inline-block bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-green-800 transition"
      >
        Start Now — It’s Free
      </a>
    </div>

  </div>
</section>
<section className="bg-gradient-to-br from-green-50 to-white py-16 md:py-8">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-green-800">
        Who Can Join This Program?
      </h3>
      <p className="text-gray-600 mt-4 text-lg">
        Anyone can start earning — no experience or background required
      </p>
    </div>

    {/* Cards */}
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14">

      {[
        {
          title: "Students",
          desc: "Earn part-time without affecting your studies",
          icon: "🎓",
        },
        {
          title: "Housewives",
          desc: "Work from home and earn a stable monthly income",
          icon: "🏡",
        },
        {
          title: "Retired Professionals",
          desc: "Use your experience & network to generate income",
          icon: "👴",
        },
        {
          title: "Freelancers",
          desc: "Add an extra passive income stream easily",
          icon: "💻",
        },
        {
          title: "Community Admins",
          desc: "Monetize your groups or local network",
          icon: "👥",
        },
        {
          title: "Local Influencers",
          desc: "Earn by referring trusted financial solutions",
          icon: "📢",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition duration-300"
        >

          {/* Icon */}
          <div className="text-3xl mb-4">{item.icon}</div>

          {/* Title */}
          <h4 className="font-semibold text-green-800 text-lg mb-2">
            {item.title}
          </h4>

          {/* Desc */}
          <p className="text-sm text-gray-600">
            {item.desc}
          </p>

        </div>
      ))}

    </div>

    {/* Bottom Highlight */}
    <div className="mt-14 text-center">
      <div className="inline-block bg-white border border-green-200 px-6 py-3 rounded-full shadow-sm text-green-700 font-medium">
        🚀 No License Required • No Field Work • No Targets
      </div>
    </div>

  </div>
</section>
<section className="bg-gradient-to-br from-green-50 to-white py-16 md:py-8">
  <div className="max-w-7xl mx-auto px-6">

    {/* Heading */}
    <div className="text-center max-w-3xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-green-800">
        Why Partners Trust Rupeedial
      </h3>
      <p className="text-gray-600 mt-4 text-lg">
        Built on transparency, reliability, and real earnings
      </p>
    </div>

    {/* Stats Row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 text-center">
      {[
        { value: "10,000+", label: "Active Partners" },
        { value: "16+ Years", label: "Industry Experience" },
        { value: "₹50Cr+", label: "Loans Processed" },
        { value: "4.8★", label: "Partner Rating" },
      ].map((item, i) => (
        <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
          <p className="text-2xl font-bold text-green-700">{item.value}</p>
          <p className="text-sm text-gray-500 mt-1">{item.label}</p>
        </div>
      ))}
    </div>

    {/* Features */}
    <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 mt-14">

      {[
        {
          title: "Zero Investment",
          icon: "💸",
        },
        {
          title: "Live Earnings Tracking",
          icon: "📊",
        },
        {
          title: "Fast Payouts",
          icon: "⚡",
        },
        {
          title: "Dedicated Support",
          icon: "🤝",
        },
        {
          title: "100% Compliance Safe",
          icon: "🔐",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-xl transition"
        >

          {/* Icon */}
          <div className="text-3xl mb-3">{item.icon}</div>

          {/* Title */}
          <h4 className="text-sm font-semibold text-green-800">
            {item.title}
          </h4>

        </div>
      ))}

    </div>

    {/* Bottom Trust Line */}
    <div className="mt-14 text-center">
      <p className="text-sm text-gray-500 max-w-2xl mx-auto">
        Rupeedial ensures complete transparency, secure processing, and timely payouts. 
        You focus on referrals — we handle everything else.
      </p>
    </div>

  </div>
</section>
<section className="bg-white py-16 md:py-8 text-center">
  <div className="max-w-4xl mx-auto px-6">

    {/* Heading */}
    <h3 className="text-3xl md:text-4xl font-bold text-green-800 leading-tight">
      Start Your Learn & Earn Journey Today 🚀
    </h3>

    {/* Subtext */}
    <p className="mt-4 text-lg text-gray-600">
      Join thousands of partners earning every month — no investment, no risk.
    </p>

    {/* Benefits */}
    <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-green-700 font-medium">
      <span>✔ 100% Free Registration</span>
      <span>✔ Work From Anywhere</span>
      <span>✔ Fast Payouts</span>
    </div>

    {/* CTA Button */}
    <div className="mt-10">
      <Link
        to="/partner-login"
        className="inline-block bg-green-700 text-white px-10 py-4 rounded-xl font-semibold shadow-md hover:bg-green-800 hover:shadow-lg transition"
      >
        Become a Learn & Earn Partner
      </Link>
    </div>

    {/* Trust Line */}
    <p className="mt-6 text-xs text-gray-500">
      🔒 Secure • Transparent • Trusted by 10,000+ partners
    </p>

    {/* Disclaimer */}
    <div className="mt-10 bg-green-50 border border-green-200 rounded-lg p-4 text-xs text-gray-600">
      <strong>Disclaimer:</strong> Rupeedial is a loan assistance and referral platform. 
      Partners do not provide loans directly. Final approval, commission payout, 
      and disbursal are subject to bank / NBFC policies.
    </div>

  </div>
</section>
    </main>
  );
}

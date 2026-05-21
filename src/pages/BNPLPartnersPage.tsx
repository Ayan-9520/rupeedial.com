import { ShieldCheck, Zap, Users, CreditCard, Star } from "lucide-react";
import { Link } from "react-router-dom";

import kissht from "../assets/bnpl/kissht.png";
import snapmint from "../assets/bnpl/Snapmint.png";
import lazypay from "../assets/bnpl/LazyPay.png";
import simpl from "../assets/bnpl/Simpl.jfif";
import zestmoney from "../assets/bnpl/ZestMoney.jfif";

import moneytap from "../assets/bnpl/MoneyTap.jfif";
import kreditbee from "../assets/bnpl/KreditBee.png";
import paysense from "../assets/bnpl/PaySense.jfif";
import fibe from "../assets/bnpl/Fibe.png";

const lenders = [
  { name: "Kissht", logo: kissht, amount: "₹5K – ₹5L" },
  { name: "Snapmint", logo: snapmint, amount: "₹3K – ₹1L" },
  { name: "LazyPay", logo: lazypay, amount: "₹2K – ₹1L" },
  { name: "Simpl", logo: simpl, amount: "₹500 – ₹20K" },
  { name: "ZestMoney", logo: zestmoney, amount: "₹3K – ₹2L" },

  { name: "MoneyTap", logo: moneytap, amount: "₹10K – ₹5L" },
  { name: "KreditBee", logo: kreditbee, amount: "₹1K – ₹5L" },
  { name: "PaySense", logo: paysense, amount: "₹5K – ₹5L" },
  { name: "Fibe", logo: fibe, amount: "₹5K – ₹5L" }
];

export default function BNPLPartnersPage() {

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}

    <section className="bg-white py-24">

<div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">

{/* LEFT CONTENT */}

<div>

<h1 className="text-4xl md:text-5xl font-bold text-green-700 leading-tight">
Buy Now Pay Later & Instant Loan Partners
</h1>

<p className="text-gray-600 mt-6 text-lg">
RupeeDial connects you with India's leading BNPL platforms and
instant personal loan providers. Compare offers, check eligibility,
and get fast approvals with a fully digital process.
</p>

{/* TAGS */}

<div className="flex flex-wrap gap-3 mt-6">

<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
⚡ Instant Approval
</span>

<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
₹2K – ₹5L Loan Range
</span>

<span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
100% Digital Process
</span>

</div>

{/* BUTTONS */}

<div className="flex gap-4 mt-8">

<Link to="/check-eligibility">
  <button className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700">
    Check Eligibility
  </button>
</Link>

<Link to="/partner-login">
  <button className="border border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50">
    Explore Partners
  </button>
</Link>

</div>

</div>

{/* RIGHT SIDE PARTNER LOGOS */}

<div className="grid grid-cols-3 gap-5">

<img src={kissht} className="bg-white border p-4 rounded-lg shadow"/>
<img src={snapmint} className="bg-white border p-4 rounded-lg shadow"/>
<img src={kreditbee} className="bg-white border p-4 rounded-lg shadow"/>
<img src={fibe} className="bg-white border p-4 rounded-lg shadow"/>
<img src={moneytap} className="bg-white border p-4 rounded-lg shadow"/>


</div>

</div>

</section>

      {/* TRUST STATS */}

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">

          <div className="bg-white p-8 rounded-xl shadow">
            <Users className="mx-auto text-green-600 mb-3" size={32}/>
            <h3 className="text-2xl font-bold">50K+</h3>
            <p className="text-gray-600 text-sm">Customers Served</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <CreditCard className="mx-auto text-green-600 mb-3" size={32}/>
            <h3 className="text-2xl font-bold">₹100Cr+</h3>
            <p className="text-gray-600 text-sm">Loans Facilitated</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <Zap className="mx-auto text-green-600 mb-3" size={32}/>
            <h3 className="text-2xl font-bold">2 Min</h3>
            <p className="text-gray-600 text-sm">Instant Approvals</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <ShieldCheck className="mx-auto text-green-600 mb-3" size={32}/>
            <h3 className="text-2xl font-bold">100%</h3>
            <p className="text-gray-600 text-sm">Secure Process</p>
          </div>

        </div>
      </section>

      {/* LENDER GRID */}

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-14">
            Trusted Lending Partners
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">

            {lenders.map((lender,index)=>(
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition text-center border border-gray-100"
              >

                <img
                  src={lender.logo}
                  alt={lender.name}
                  className="h-12 mx-auto mb-4 object-contain"
                />

                <h3 className="font-semibold text-gray-800">
                  {lender.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  Loan Range
                </p>

                <p className="text-green-600 font-semibold">
                  {lender.amount}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>
<section className="py-20 bg-white">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-3xl font-bold text-center mb-12">
Eligibility Criteria
</h2>

<div className="grid md:grid-cols-4 gap-8 text-center">

<div className="p-6 border rounded-lg">
<h3 className="font-semibold">Age</h3>
<p className="text-gray-600 text-sm mt-2">21 – 55 Years</p>
</div>

<div className="p-6 border rounded-lg">
<h3 className="font-semibold">Employment</h3>
<p className="text-gray-600 text-sm mt-2">Salaried / Self-Employed</p>
</div>

<div className="p-6 border rounded-lg">
<h3 className="font-semibold">Monthly Income</h3>
<p className="text-gray-600 text-sm mt-2">₹15,000 Minimum</p>
</div>

<div className="p-6 border rounded-lg">
<h3 className="font-semibold">Credit Score</h3>
<p className="text-gray-600 text-sm mt-2">650+ Recommended</p>
</div>

</div>

</div>
</section>
<section className="py-20 bg-gray-50">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-3xl font-bold text-center mb-12">
Documents Required
</h2>

<div className="grid md:grid-cols-3 gap-8">

<div className="bg-white p-6 rounded-lg shadow">
<h3 className="font-semibold mb-2">Identity Proof</h3>
<p className="text-gray-600 text-sm">
Aadhaar Card / PAN Card
</p>
</div>

<div className="bg-white p-6 rounded-lg shadow">
<h3 className="font-semibold mb-2">Income Proof</h3>
<p className="text-gray-600 text-sm">
Salary Slip / Bank Statement
</p>
</div>

<div className="bg-white p-6 rounded-lg shadow">
<h3 className="font-semibold mb-2">Address Proof</h3>
<p className="text-gray-600 text-sm">
Aadhaar / Driving License
</p>
</div>

</div>

</div>
</section>
      {/* HOW IT WORKS */}

      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-14">
            How RupeeDial Works
          </h2>

          <div className="grid md:grid-cols-5 gap-8 text-center">

            {[
              "Visit RupeeDial Platform",
              "Fill Quick Eligibility Form",
              "Match with Best Lender",
              "Complete KYC Verification",
              "Loan Disbursal / Credit Line Activated"
            ].map((step,index)=>(
              <div key={index}>

                <div className="w-12 h-12 mx-auto flex items-center justify-center bg-green-600 text-white rounded-full font-bold mb-4">
                  {index+1}
                </div>

                <p className="text-gray-600 text-sm">
                  {step}
                </p>

              </div>
            ))}

          </div>

        </div>
      </section>

      {/* FEATURES */}

      <section className="py-20 bg-gray-50">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-14">
            Why Choose RupeeDial
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-3">
                Compare Multiple Lenders
              </h3>

              <p className="text-gray-600">
                RupeeDial allows you to compare loan offers from several trusted
                NBFCs and BNPL providers in one place to get the best deal.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-3">
                Instant Digital Process
              </h3>

              <p className="text-gray-600">
                Apply online in minutes with minimal documentation and receive
                instant loan approvals through a completely digital journey.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow">
              <h3 className="font-semibold text-lg mb-3">
                Flexible EMI Options
              </h3>

              <p className="text-gray-600">
                Choose repayment tenures and EMI options that fit your financial
                needs and manage your credit responsibly.
              </p>
            </div>

          </div>

        </div>

      </section>


<section className="py-20 bg-white">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-3xl font-bold text-center mb-14">
Customer Reviews
</h2>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

{/* REVIEW 1 */}

<div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">

<div className="flex mb-3 text-yellow-500">
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
</div>

<p className="text-gray-600 text-sm">
I got instant approval through RupeeDial. The process was simple and
completely digital. Highly recommended platform.
</p>

<div className="mt-4">

<h4 className="font-semibold text-gray-800">
Amit Sharma
</h4>

<p className="text-xs text-gray-500">
Delhi
</p>

</div>

</div>


{/* REVIEW 2 */}

<div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">

<div className="flex mb-3 text-yellow-500">
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
</div>

<p className="text-gray-600 text-sm">
RupeeDial helped me compare multiple lenders in one place. I received
loan approval within minutes.
</p>

<div className="mt-4">

<h4 className="font-semibold text-gray-800">
Priya Verma
</h4>

<p className="text-xs text-gray-500">
Mumbai
</p>

</div>

</div>


{/* REVIEW 3 */}

<div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">

<div className="flex mb-3 text-yellow-500">
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
</div>

<p className="text-gray-600 text-sm">
The eligibility check was quick and I was matched with the right lender.
Very smooth and secure process.
</p>

<div className="mt-4">

<h4 className="font-semibold text-gray-800">
Rahul Singh
</h4>

<p className="text-xs text-gray-500">
Bangalore
</p>

</div>

</div>


{/* REVIEW 4 */}

<div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">

<div className="flex mb-3 text-yellow-500">
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
<Star size={18} fill="currentColor"/>
</div>

<p className="text-gray-600 text-sm">
I needed urgent funds and RupeeDial connected me with the best BNPL
partner instantly. Very helpful platform.
</p>

<div className="mt-4">

<h4 className="font-semibold text-gray-800">
Sneha Gupta
</h4>

<p className="text-xs text-gray-500">
Hyderabad
</p>

</div>

</div>

</div>

</div>

</section>
      {/* CTA */}

      <section className="bg-gradient-to-r from-[#10662A] to-green-600 py-20 text-white">

        <div className="max-w-5xl mx-auto text-center px-6">

          <h2 className="text-3xl font-bold mb-4">
            Check Your Loan Eligibility Today
          </h2>

          <p className="text-green-100 mb-8">
            Discover the best BNPL and personal loan offers tailored for your
            financial needs.
          </p>

        <Link to="/check-eligibility">
  <button className="bg-white text-green-700 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition">
    Check Eligibility
  </button>
</Link>

        </div>

      </section>

      {/* DISCLAIMER */}

      <section className="py-10 text-center text-sm text-gray-500 max-w-4xl mx-auto px-6">
        RupeeDial acts as a loan marketplace platform and does not provide loans
        directly. Loan approvals and disbursals are subject to lender policies
        and RBI regulations.
      </section>

    </div>
  )
}

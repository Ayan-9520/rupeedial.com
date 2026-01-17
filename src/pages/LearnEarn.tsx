import { Link } from "react-router-dom";
import learn from "../assets/images/learn.png";
/* ================= STATIC DATA (API READY) ================= */

const WHO_CAN_JOIN = [
  {
    title: "Students & Undergraduates",
    desc: "Earn part-time without affecting studies",
  },
  {
    title: "Housewives",
    desc: "Work from home and earn monthly income",
  },
  {
    title: "Retired Professionals",
    desc: "Use your network to earn post retirement",
  },
  {
    title: "Freelancers",
    desc: "Add a passive income stream",
  },
  {
    title: "Community Admins",
    desc: "Monetize your local or online community",
  },
  {
    title: "Local Influencers",
    desc: "Earn by referring trusted financial solutions",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Learn",
    desc: "Watch short videos explaining loan products, eligibility & documents",
  },
  {
    step: "02",
    title: "Refer",
    desc: "Share your unique referral link or QR code with customers",
  },
  {
    step: "03",
    title: "Processing",
    desc: "Rupeedial verifies applications & assigns banks / DSAs",
  },
  {
    step: "04",
    title: "Earn",
    desc: "Commission credited after successful loan disbursal",
  },
];

const COMMISSIONS = [
  {
    product: "Personal Loan",
    rate: "0.25% – 0.50%",
    example: "₹50,000 – ₹1,00,000 on ₹20L loan",
  },
  {
    product: "Business / MSME Loan",
    rate: "0.50% – 1.00%",
    example: "₹2,50,000 on ₹50L loan",
  },
  {
    product: "Home Loan / LAP",
    rate: "0.10% – 0.30%",
    example: "₹3,00,000 on ₹1Cr loan",
  },
];

/* ================= PAGE ================= */

export default function LearnEarn() {
  return (
    <main className="bg-white text-gray-800">

     

      {/* ================= HERO ================= */}
      <section className="bg-gradient-to-br from-green-50 to-white py-5">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
          <div>
            <h2 className="text-4xl md:text-4xl font-bold text-green-700 leading-tight">
              Learn. Connect. Get Rewarded.
            </h2>

            <p className="text-lg mt-6 max-w-xl">
              Refer loan applications and earn commission — no investment, no targets, no sales pressure.
            </p>

            <ul className="mt-6 space-y-2 text-gray-700">
              <li>✔ Zero registration fees</li>
              <li>✔ Work from anywhere</li>
              <li>✔ Transparent earnings dashboard</li>
            </ul>

            <div className="mt-5 flex gap-4">
              <Link
                to="/partner-login"
                className="bg-green-700 text-white px-5 py-4 rounded-lg font-semibold font-sm hover:bg-green-700 transition"
              >
                Become a Partner
              </Link>

              <a
                href="#how-it-works"
                className="border border-green-600 text-green-600 px-10 py-4 rounded-lg font-semibold hover:bg-green-50 transition"
              >
                How It Works
              </a>
            </div>
          </div>

          <div className="text-center">
 <img
  src={learn}
  className="w-96 h-80 mx-auto object-contain"
/>    </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className=" bg-gradient-to-br from-green-50 to-white py-20">
        <div className=" max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl  text-green-700 font-semibold mb-6">
            What is Learn & Earn?
          </h3>

          <p className="text-gray-600 leading-relaxed text-lg">
            Rupeedial’s Learn & Earn Partner Program enables individuals to earn
            by referring loan applications. You only need to learn basic concepts,
            share your referral link, and Rupeedial handles documentation,
            bank coordination, compliance, and disbursal.
          </p>
        </div>
      </section>

      {/* ================= WHO CAN JOIN ================= */}
      <section className="bg-gradient-to-br from-green-50 to-whitepy-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl text-green-700 font-semibold text-center mb-14">
            Who Can Join This Program?
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {WHO_CAN_JOIN.map((item, i) => (
              <div
                key={i}
                className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="font-semibold  text-green-700 text-lg mb-2">
                  {item.title}
                </h4> 
                <p className="text-sm text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center mt-10 text-green-700 font-medium">
            No license • No field work • No targets
          </p>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl text-green-700 font-semibold text-center mb-14">
            How the Learn & Earn Program Works
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div
                key={i}
                className="border p-8 rounded-xl text-center hover:border-green-600 transition"
              >
                <div className="text-green-600 text-2xl font-bold mb-4">
                  {step.step}
                </div>
                <h4 className="font-semibold mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= COMMISSIONS ================= */}
      <section className="bg-green-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h3 className="text-3xl text-green-700 font-semibold mb-14">
            Commission Structure
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {COMMISSIONS.map((item, i) => (
              <div
                key={i}
                className="bg-white p-10 rounded-xl shadow hover:shadow-lg transition"
              >
                <h4 className="font-semibold text-lg">
                  {item.product}
                </h4>
                <p className="text-green-600 text-2xl font-bold mt-4">
                  {item.rate}
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {item.example}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-gray-600 mt-6">
            *Final commission visible in partner dashboard after login
          </p>
        </div>
      </section>

      {/* ================= TRUST / WHY ================= */}
      <section className=" bg-gradient-to-br from-green-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl text-green-700 font-semibold text-center mb-14">
            Why Partners Trust Rupeedial
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-5 gap-6 text-center">
            {[
              "Zero Investment",
              "Live Earnings",
              "Fast Payouts",
              "Dedicated Support",
              "100% Compliance Safe",
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 border rounded-xl hover:border-green-600 transition"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="bg-gradient-to-br from-green-50 py-5 text-center">
        <h3 className="text-4xl text-green-800 font-semibold mb-6">
          Start Your Learn & Earn Journey Today
        </h3>

        <p className="mb-10 max-w-2xl text-green-800 mx-auto text-lg">
          Join thousands of partners earning every month without risk,
          investment, or field work.
        </p>

        <Link
          to="/partner-login"
          className="inline-block bg-green-800 text-white px-12 py-5 rounded-lg font-semibold  transition"
        >
          Become a Learn & Earn Partner
        </Link>
      </section>

    </main>
  );
}

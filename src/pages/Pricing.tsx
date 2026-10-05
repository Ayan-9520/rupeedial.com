import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ACTIVATION_FEE,
  CATEGORY_LEAD_PRICES,
  CRM_APP_URL,
  PARTNER_PLANS,
  PAYOUT_MIN,
  RECHARGE_MIN,
  cycleLabel,
  cyclePrice,
  effectiveMonthly,
  type PlanCycle,
} from "../data/partnerPlans";
import { ArrowRight, Check } from "lucide-react";

const CYCLES: { id: PlanCycle; label: string; off?: string }[] = [
  { id: "monthly", label: "Monthly" },
  { id: "quarterly", label: "Quarterly", off: "10% off" },
  { id: "yearly", label: "Yearly", off: "20% off" },
];

const PricingPage: React.FC = () => {
  const [cycle, setCycle] = useState<PlanCycle>("monthly");

  useEffect(() => {
    document.title = "Partner Pricing | RupeeDial";
  }, []);

  return (
    <main className="min-h-[70vh] bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-extrabold text-[#10662A] sm:text-3xl">Partner Plans &amp; Pricing</h1>
          <p className="mt-2 text-sm text-gray-600 sm:text-base">
            CRM, LeadBoard, marketing tools and payouts in one place. Cancel anytime.
          </p>
        </div>

        <div className="mx-auto mt-6 flex w-full max-w-md rounded-xl border border-gray-200 bg-white p-1">
          {CYCLES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCycle(c.id)}
              className={`flex-1 rounded-lg px-2 py-2 text-sm font-semibold transition ${
                cycle === c.id ? "bg-[#10662A] text-white" : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {c.label}
              {c.off && (
                <span className={`block text-[10px] font-medium ${cycle === c.id ? "text-green-100" : "text-[#10662A]"}`}>
                  {c.off}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {PARTNER_PLANS.map((plan) => {
            const total = cyclePrice(plan.monthly, cycle);
            const perMo = effectiveMonthly(plan.monthly, cycle);
            return (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-xl border bg-white p-6 ${
                  plan.highlighted ? "border-[#10662A] shadow-md ring-1 ring-[#10662A]" : "border-gray-200 shadow-sm"
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#10662A] px-3 py-1 text-xs font-semibold text-white">
                    Most popular
                  </span>
                )}

                <h2 className="text-lg font-bold text-gray-900">{plan.name}</h2>
                <p className="mt-0.5 text-sm text-gray-500">{plan.tagline}</p>

                <p className="mt-5">
                  <span className="text-3xl font-extrabold tabular-nums text-gray-900">
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm text-gray-500"> / {cycleLabel(cycle)}</span>
                </p>
                <p className="mt-1 h-4 text-xs text-gray-500">
                  {cycle !== "monthly" ? `Works out to ₹${perMo.toLocaleString("en-IN")} per month` : ""}
                </p>

                <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-green-50 p-3 text-center">
                  <div>
                    <p className="text-base font-bold text-[#10662A]">{plan.seats}</p>
                    <p className="text-[11px] text-gray-600">CRM login{plan.seats > 1 ? "s" : ""}</p>
                  </div>
                  <div>
                    <p className="text-base font-bold text-[#10662A]">₹{plan.leadCreditsMonthly.toLocaleString("en-IN")}</p>
                    <p className="text-[11px] text-gray-600">Lead credits / month</p>
                  </div>
                </div>

                <ul className="mt-5 flex-1 space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#10662A]" strokeWidth={3} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={`${CRM_APP_URL}/auth?next=/dashboard/billing`}
                  className={`mt-6 rounded-lg py-3 text-center text-sm font-semibold transition ${
                    plan.highlighted
                      ? "bg-[#10662A] text-white hover:bg-[#0c5222]"
                      : "border border-[#10662A] text-[#10662A] hover:bg-green-50"
                  }`}
                >
                  Choose {plan.name}
                </a>
                <p className="mt-2 text-center text-xs text-gray-500">
                  Not a partner yet?{" "}
                  <Link to="/partner-login" className="font-semibold text-[#10662A] hover:underline">
                    Apply here
                  </Link>
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900">Price per lead</h3>
            <p className="mt-0.5 text-xs text-gray-500">Paid from your LeadBoard wallet credits</p>
            <ul className="mt-4 divide-y divide-gray-100">
              {CATEGORY_LEAD_PRICES.map((c) => (
                <li key={c.key} className="flex items-center justify-between py-2 text-sm">
                  <span className="text-gray-700">{c.label}</span>
                  <span className="font-semibold tabular-nums text-gray-900">₹{c.price}</span>
                </li>
              ))}
            </ul>
            <Link
              to="/leadboard"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#10662A] hover:underline"
            >
              Open LeadBoard <ArrowRight className="h-4 w-4" />
            </Link>
          </section>

          <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900">Good to know</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-gray-700">
              {[
                `One-time activation fee (optional): ₹${ACTIVATION_FEE}`,
                `Minimum wallet recharge: ₹${RECHARGE_MIN}`,
                `Minimum payout to bank: ₹${PAYOUT_MIN}`,
                "Cancel anytime. Unused lead credits stay in your wallet (not refundable as cash).",
                "Growth and Pro Team get a public profile page on RupeeDial.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#10662A]" strokeWidth={3} />
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
};

export default PricingPage;

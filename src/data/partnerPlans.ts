/** Phase 0 locked partner plans — used by /pricing (Phase 1). */

export type PlanCycle = "monthly" | "quarterly" | "yearly";
export type PlanId = "starter" | "growth" | "pro";

export type PartnerPlan = {
  id: PlanId;
  name: string;
  tagline: string;
  monthly: number;
  seats: number;
  leadCreditsMonthly: number;
  highlighted?: boolean;
  features: string[];
};

export const ACTIVATION_FEE = 999;
export const RECHARGE_MIN = 500;
export const PAYOUT_MIN = 1000;

export const CATEGORY_LEAD_PRICES: { key: string; label: string; price: number }[] = [
  { key: "loan", label: "Loan leads", price: 149 },
  { key: "insurance", label: "Insurance leads", price: 149 },
  { key: "credit_card", label: "Credit card leads", price: 79 },
  { key: "investment", label: "Investment leads", price: 129 },
];

export const PARTNER_PLANS: PartnerPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Solo DSA — trial CRM + LeadBoard",
    monthly: 999,
    seats: 1,
    leadCreditsMonthly: 999,
    features: [
      "1 CRM login",
      "LeadBoard purchase",
      "My Leads pipeline",
      "Basic WhatsApp & posts",
      "1 visiting card + QR",
      "Bank payouts (earnings)",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Small team + public profile",
    monthly: 2999,
    seats: 3,
    leadCreditsMonthly: 2500,
    highlighted: true,
    features: [
      "3 CRM seats (team)",
      "₹2,500 lead credits / month",
      "Full marketing (posts, reels, WA)",
      "Card + QR per seat",
      "Public profile: firm.rupeedial.com",
      "Assign leads to callers",
      "Soft HRMS (attendance)",
    ],
  },
  {
    id: "pro",
    name: "Pro Team",
    tagline: "Agency scale + HRMS",
    monthly: 7999,
    seats: 10,
    leadCreditsMonthly: 7000,
    features: [
      "10 CRM seats",
      "₹7,000 lead credits / month",
      "Everything in Growth",
      "Full HRMS + payroll light",
      "Featured directory listing",
      "Team reports + priority payout",
      "Dedicated RM",
    ],
  },
];

export function cyclePrice(monthly: number, cycle: PlanCycle): number {
  if (cycle === "quarterly") return Math.round(monthly * 3 * 0.9);
  if (cycle === "yearly") return Math.round(monthly * 12 * 0.8);
  return monthly;
}

export function cycleLabel(cycle: PlanCycle): string {
  if (cycle === "quarterly") return "quarter";
  if (cycle === "yearly") return "year";
  return "month";
}

export function effectiveMonthly(monthly: number, cycle: PlanCycle): number {
  if (cycle === "quarterly") return Math.round(cyclePrice(monthly, cycle) / 3);
  if (cycle === "yearly") return Math.round(cyclePrice(monthly, cycle) / 12);
  return monthly;
}

/** Local CRM auth (dev). Override with VITE_CRM_APP_URL in production. */
export const CRM_APP_URL =
  (import.meta.env.VITE_CRM_APP_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://localhost:8080";

export const CRM_API_URL =
  (import.meta.env.VITE_CRM_API_URL as string | undefined)?.replace(/\/$/, "") ||
  "http://127.0.0.1:8000";

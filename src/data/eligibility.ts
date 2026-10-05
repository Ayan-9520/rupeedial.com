import union from "../assets/images/union.png";
import bob from "../assets/images/bob.png";
import boi from "../assets/images/boi.png";
import indian from "../assets/images/indian-bank.png";
import canara from "../assets/images/canara.png";
import maha from "../assets/images/maharastra.png";
import central from "../assets/images/central.png";
import uco from "../assets/images/uco.png";
import pnb from "../assets/images/pnb.png";
import sbi from "../assets/images/sbi.png";
import hdfc from "../assets/images/hdfc-b.png";
import axis from "../assets/images/axis.png";
import yes from "../assets/images/yes.png";
import bandhan from "../assets/images/bandhan.jpg";
import kotak from "../assets/images/kotak.png";
import au from "../assets/images/au.jpg";
import icici from "../assets/images/icici.png";
import idbi from "../assets/images/idbi.png";
import hdb from "../assets/images/hdbi.jpg";
import tata from "../assets/images/tcl-logo.webp";
import bajaj from "../assets/images/bajaj.jpg";
import mahindra from "../assets/images/mahindra.jpg";

/* ================= PRODUCTS ================= */

export type Product =
  | "Personal Loan"
  | "Home Loan"
  | "Loan Against Property"
  | "Auto Loan"
  | "Education Loan"
  | "Credit Card"
  | "MSME Loan"
  | "Mudra Loan"
  | "Machinery Loan"
  | "Business Loan"
  | "Working Capital Loan"
  | "Startup Business Loan"
  | "CGTMSE Loan"
  | "PMEGP Loan"
  | "Stand-Up India"
  | "Subsidy Linked MSME"
  | "Export Finance"
  | "Import Finance"
  | "LC / BG"
  | "Invoice Financing"
  | "Cash Credit (CC)"
  | "Overdraft (OD)";

/** term = EMI loan, revolving = limit (interest on usage), card = credit limit */
type ProductKind = "term" | "revolving" | "card";

interface ProductConfig {
  kind: ProductKind;
  baseRate: number;
  tenureMonths: number;
  minIncome: number;
  maxAmount: number;
  minAmount?: number;
  /** retail products penalise self-employed income; business products don't */
  retail: boolean;
}

export const PRODUCTS: Record<Product, ProductConfig> = {
  "Personal Loan": { kind: "term", baseRate: 10.75, tenureMonths: 60, minIncome: 15000, maxAmount: 4000000, retail: true },
  "Home Loan": { kind: "term", baseRate: 8.4, tenureMonths: 240, minIncome: 25000, maxAmount: 100000000, retail: true },
  "Loan Against Property": { kind: "term", baseRate: 9.5, tenureMonths: 180, minIncome: 25000, maxAmount: 100000000, retail: true },
  "Auto Loan": { kind: "term", baseRate: 8.9, tenureMonths: 84, minIncome: 18000, maxAmount: 5000000, retail: true },
  "Education Loan": { kind: "term", baseRate: 9.5, tenureMonths: 120, minIncome: 15000, maxAmount: 7500000, retail: true },
  "Credit Card": { kind: "card", baseRate: 36, tenureMonths: 0, minIncome: 18000, maxAmount: 1000000, retail: true },
  "MSME Loan": { kind: "term", baseRate: 10.5, tenureMonths: 60, minIncome: 20000, maxAmount: 20000000, retail: false },
  "Mudra Loan": { kind: "term", baseRate: 10, tenureMonths: 60, minIncome: 10000, maxAmount: 2000000, retail: false },
  "Machinery Loan": { kind: "term", baseRate: 10.25, tenureMonths: 84, minIncome: 20000, maxAmount: 10000000, retail: false },
  "Business Loan": { kind: "term", baseRate: 12.5, tenureMonths: 60, minIncome: 20000, maxAmount: 7500000, retail: false },
  "Working Capital Loan": { kind: "revolving", baseRate: 10.5, tenureMonths: 12, minIncome: 20000, maxAmount: 50000000, retail: false },
  "Startup Business Loan": { kind: "term", baseRate: 11.5, tenureMonths: 60, minIncome: 15000, maxAmount: 5000000, retail: false },
  "CGTMSE Loan": { kind: "term", baseRate: 10, tenureMonths: 84, minIncome: 15000, maxAmount: 50000000, retail: false },
  "PMEGP Loan": { kind: "term", baseRate: 10, tenureMonths: 84, minIncome: 10000, maxAmount: 4500000, retail: false },
  "Stand-Up India": { kind: "term", baseRate: 9.5, tenureMonths: 84, minIncome: 20000, maxAmount: 10000000, minAmount: 1000000, retail: false },
  "Subsidy Linked MSME": { kind: "term", baseRate: 9.5, tenureMonths: 84, minIncome: 20000, maxAmount: 20000000, retail: false },
  "Export Finance": { kind: "revolving", baseRate: 9.5, tenureMonths: 12, minIncome: 25000, maxAmount: 50000000, retail: false },
  "Import Finance": { kind: "revolving", baseRate: 10, tenureMonths: 12, minIncome: 25000, maxAmount: 50000000, retail: false },
  "LC / BG": { kind: "revolving", baseRate: 1.5, tenureMonths: 12, minIncome: 30000, maxAmount: 50000000, retail: false },
  "Invoice Financing": { kind: "revolving", baseRate: 11, tenureMonths: 3, minIncome: 20000, maxAmount: 30000000, retail: false },
  "Cash Credit (CC)": { kind: "revolving", baseRate: 10.25, tenureMonths: 12, minIncome: 20000, maxAmount: 50000000, retail: false },
  "Overdraft (OD)": { kind: "revolving", baseRate: 10.5, tenureMonths: 12, minIncome: 20000, maxAmount: 25000000, retail: false },
};

export const PRODUCT_GROUPS: { label: string; items: Product[] }[] = [
  { label: "Retail loans", items: ["Personal Loan", "Home Loan", "Loan Against Property", "Auto Loan", "Education Loan", "Credit Card"] },
  { label: "MSME loans", items: ["MSME Loan", "Mudra Loan", "Machinery Loan", "Business Loan", "Working Capital Loan", "Startup Business Loan"] },
  { label: "Government schemes", items: ["CGTMSE Loan", "PMEGP Loan", "Stand-Up India", "Subsidy Linked MSME"] },
  { label: "Trade finance", items: ["Export Finance", "Import Finance", "LC / BG", "Invoice Financing", "Cash Credit (CC)", "Overdraft (OD)"] },
];

export const isProduct = (v: string | null | undefined): v is Product =>
  !!v && Object.prototype.hasOwnProperty.call(PRODUCTS, v);

export const needsPropertyValue = (p: Product | "") =>
  p === "Home Loan" || p === "Loan Against Property";

export const incomeLabel = (p: Product | "") =>
  p && !PRODUCTS[p].retail ? "Monthly business profit" : "Monthly income";

export const DOCUMENTS: Record<Product, string[]> = {
  "Personal Loan": ["PAN Card", "Aadhaar Card", "Salary Slip", "Bank Statement"],
  "Home Loan": ["PAN Card", "Aadhaar Card", "Income Proof", "Property Papers"],
  "Loan Against Property": ["PAN Card", "Aadhaar Card", "Property Papers", "Income Proof"],
  "Auto Loan": ["PAN Card", "Aadhaar Card", "Income Proof", "Vehicle Quotation"],
  "Education Loan": ["PAN Card", "Aadhaar Card", "Admission Letter", "Co-applicant Income Proof"],
  "Credit Card": ["PAN Card", "Income Proof"],
  "MSME Loan": ["PAN Card", "GST Certificate", "ITR", "Bank Statement"],
  "Mudra Loan": ["PAN Card", "Aadhaar Card", "Business Proof"],
  "Machinery Loan": ["PAN Card", "Machinery Quotation", "Bank Statement"],
  "Business Loan": ["PAN Card", "GST Certificate", "ITR", "Bank Statement"],
  "Working Capital Loan": ["PAN Card", "GST Certificate", "Stock Statement", "Bank Statement"],
  "Startup Business Loan": ["PAN Card", "Business Plan", "Bank Statement"],
  "CGTMSE Loan": ["Udyam Registration", "PAN Card", "ITR", "Bank Statement"],
  "PMEGP Loan": ["Aadhaar Card", "PAN Card", "Project Report"],
  "Stand-Up India": ["Aadhaar Card", "Project Report", "Category Proof", "Bank Statement"],
  "Subsidy Linked MSME": ["Udyam Registration", "PAN Card", "Project Report", "ITR"],
  "Export Finance": ["IEC Certificate", "PAN Card", "Export Order", "Bank Statement"],
  "Import Finance": ["IEC Certificate", "PAN Card", "Import Contract", "Bank Statement"],
  "LC / BG": ["PAN Card", "Contract Copy", "Bank Statement"],
  "Invoice Financing": ["PAN Card", "GST Returns", "Invoices", "Bank Statement"],
  "Cash Credit (CC)": ["PAN Card", "Stock Statement", "Bank Statement", "GST Returns"],
  "Overdraft (OD)": ["PAN Card", "Collateral Papers", "ITR", "Bank Statement"],
};

export type DocBucket = "kyc" | "incomeProof" | "bankStatement" | "other";

export const docBucket = (doc: string): DocBucket => {
  if (/PAN|Aadhaar/i.test(doc)) return "kyc";
  if (/Bank Statement/i.test(doc)) return "bankStatement";
  if (/Salary|Income|ITR|GST|Business Proof/i.test(doc)) return "incomeProof";
  return "other";
};

/* ================= LENDERS ================= */

type LenderKind = "psu" | "private" | "sfb" | "nbfc";

export interface Lender {
  name: string;
  logo: string;
  kind: LenderKind;
  /** fine-tune on top of the lender-type spread */
  rateAdj: number;
  /** NBFCs only lend on a subset of products */
  products?: Product[];
}

export const LENDER_KIND_LABEL: Record<LenderKind, string> = {
  psu: "Public sector bank",
  private: "Private bank",
  sfb: "Small finance bank",
  nbfc: "NBFC",
};

const KIND_RULES: Record<LenderKind, { rateSpread: number; foirAdj: number; minCibil: number; lapLtv: number }> = {
  psu: { rateSpread: 0, foirAdj: 0, minCibil: 650, lapLtv: 0.6 },
  private: { rateSpread: 0.5, foirAdj: 0.03, minCibil: 650, lapLtv: 0.65 },
  sfb: { rateSpread: 1.5, foirAdj: 0.03, minCibil: 625, lapLtv: 0.6 },
  nbfc: { rateSpread: 2.5, foirAdj: 0.05, minCibil: 600, lapLtv: 0.6 },
};

export const LENDERS: Lender[] = [
  { name: "State Bank of India", logo: sbi, kind: "psu", rateAdj: -0.1 },
  { name: "Bank of Baroda", logo: bob, kind: "psu", rateAdj: 0 },
  { name: "Punjab National Bank", logo: pnb, kind: "psu", rateAdj: 0 },
  { name: "Union Bank of India", logo: union, kind: "psu", rateAdj: 0.05 },
  { name: "Canara Bank", logo: canara, kind: "psu", rateAdj: 0.05 },
  { name: "Bank of India", logo: boi, kind: "psu", rateAdj: 0.1 },
  { name: "Indian Bank", logo: indian, kind: "psu", rateAdj: 0.1 },
  { name: "Bank of Maharashtra", logo: maha, kind: "psu", rateAdj: -0.05 },
  { name: "Central Bank of India", logo: central, kind: "psu", rateAdj: 0.15 },
  { name: "UCO Bank", logo: uco, kind: "psu", rateAdj: 0.2 },
  { name: "IDBI Bank", logo: idbi, kind: "psu", rateAdj: 0.15 },
  { name: "HDFC Bank", logo: hdfc, kind: "private", rateAdj: -0.1 },
  { name: "ICICI Bank", logo: icici, kind: "private", rateAdj: -0.05 },
  { name: "Axis Bank", logo: axis, kind: "private", rateAdj: 0.1 },
  { name: "Kotak Mahindra Bank", logo: kotak, kind: "private", rateAdj: 0.05 },
  { name: "Yes Bank", logo: yes, kind: "private", rateAdj: 0.35 },
  { name: "Bandhan Bank", logo: bandhan, kind: "private", rateAdj: 0.6 },
  { name: "AU Small Finance Bank", logo: au, kind: "sfb", rateAdj: 0 },
  {
    name: "Bajaj Finance", logo: bajaj, kind: "nbfc", rateAdj: 0,
    products: ["Personal Loan", "Home Loan", "Loan Against Property", "Business Loan", "MSME Loan", "Machinery Loan", "Startup Business Loan"],
  },
  {
    name: "Tata Capital", logo: tata, kind: "nbfc", rateAdj: -0.2,
    products: ["Personal Loan", "Home Loan", "Loan Against Property", "Auto Loan", "Education Loan", "Business Loan", "MSME Loan", "Machinery Loan", "Working Capital Loan", "Invoice Financing"],
  },
  {
    name: "HDB Financial Services", logo: hdb, kind: "nbfc", rateAdj: 0.2,
    products: ["Personal Loan", "Loan Against Property", "Auto Loan", "Business Loan", "MSME Loan", "Machinery Loan"],
  },
  {
    name: "Mahindra Finance", logo: mahindra, kind: "nbfc", rateAdj: 0.3,
    products: ["Auto Loan", "Personal Loan", "Home Loan", "Machinery Loan", "MSME Loan", "Business Loan"],
  },
];

/* ================= ENGINE ================= */

export type Employment = "Salaried" | "Self-Employed" | "Business Owner";

export interface EligibilityInput {
  product: Product;
  employment: Employment | "";
  monthlyIncome: number;
  existingEmi: number;
  /** 0 = customer doesn't know → assumed 700 */
  cibil: number;
  propertyValue?: number;
  courseFee?: number;
}

export type Chance = "High" | "Good" | "Fair";

export interface Offer {
  lender: Lender;
  eligible: boolean;
  reason?: string;
  amount: number;
  rate: number;
  tenureMonths: number;
  /** EMI for term loans; monthly interest at full use for revolving; 0 for cards */
  monthly: number;
  chance: Chance;
}

export const ASSUMED_CIBIL = 700;

const presentValue = (emi: number, annualRate: number, months: number) => {
  const r = annualRate / 12 / 100;
  if (!r) return emi * months;
  return (emi * (1 - Math.pow(1 + r, -months))) / r;
};

export const emiFor = (principal: number, annualRate: number, months: number) => {
  if (!principal || !months) return 0;
  const r = annualRate / 12 / 100;
  if (!r) return principal / months;
  const f = Math.pow(1 + r, months);
  return (principal * r * f) / (f - 1);
};

const baseFoir = (income: number) => {
  if (income < 25000) return 0.4;
  if (income < 50000) return 0.5;
  if (income < 100000) return 0.55;
  return 0.65;
};

const floorTo = (v: number, step: number) => Math.max(0, Math.floor(v / step) * step);

export function evaluateLender(lender: Lender, input: EligibilityInput): Offer {
  const cfg = PRODUCTS[input.product];
  const kind = KIND_RULES[lender.kind];
  const cibil = input.cibil || ASSUMED_CIBIL;
  const income = Math.max(0, input.monthlyIncome);
  const existingEmi = Math.max(0, input.existingEmi);

  let rate = cfg.baseRate + (cfg.kind === "card" ? 0 : kind.rateSpread + lender.rateAdj);
  if (cfg.kind !== "card") {
    if (cibil >= 800) rate -= 0.25;
    else if (cibil >= 750) rate += 0;
    else if (cibil >= 700) rate += 0.35;
    else if (cibil >= 650) rate += 1;
    else rate += 2;
    if (cfg.retail && input.employment && input.employment !== "Salaried") rate += 0.5;
  }
  rate = Math.round(rate * 100) / 100;

  const base: Offer = {
    lender,
    eligible: false,
    amount: 0,
    rate,
    tenureMonths: cfg.tenureMonths,
    monthly: 0,
    chance: "Fair",
  };

  if (lender.products && !lender.products.includes(input.product)) {
    return { ...base, reason: `Doesn't offer ${input.product}` };
  }
  if (income < cfg.minIncome) {
    return { ...base, reason: `Needs income of at least ₹${cfg.minIncome.toLocaleString("en-IN")}/month` };
  }
  if (cibil < kind.minCibil) {
    return { ...base, reason: `Needs a CIBIL score of ${kind.minCibil}+` };
  }

  let foir = baseFoir(income) + kind.foirAdj;
  if (cfg.retail && input.employment && input.employment !== "Salaried") foir -= 0.05;
  if (cibil >= 750) foir *= 1.05;
  else if (cibil < 700) foir *= 0.9;

  const obligationRatio = income ? existingEmi / income : 1;
  let amount = 0;
  let monthly = 0;

  if (cfg.kind === "term") {
    const emiRoom = income * foir - existingEmi;
    if (emiRoom <= 0) {
      return { ...base, reason: "Existing EMIs already use your full repayment capacity" };
    }
    amount = presentValue(emiRoom, rate, cfg.tenureMonths);

    if (input.product === "Home Loan" && input.propertyValue) {
      const pv = input.propertyValue;
      const ltv = pv <= 3000000 ? 0.9 : pv <= 7500000 ? 0.8 : 0.75;
      amount = Math.min(amount, pv * ltv);
    }
    if (input.product === "Loan Against Property" && input.propertyValue) {
      amount = Math.min(amount, input.propertyValue * kind.lapLtv);
    }
    if (input.product === "Education Loan" && input.courseFee) {
      amount = Math.min(amount, input.courseFee);
    }
  } else if (cfg.kind === "revolving") {
    // Monthly profit × 12 → annual; limits are typically ~2× annual profit, less existing obligations.
    const kindFactor = lender.kind === "psu" ? 1 : lender.kind === "private" ? 1.05 : 0.85;
    const cibilFactor = cibil >= 750 ? 1.1 : cibil >= 700 ? 1 : 0.8;
    amount = (income * 12 * 2 - existingEmi * 24) * kindFactor * cibilFactor;
  } else {
    const multiple = cibil >= 750 ? 3 : cibil >= 700 ? 2 : 1.5;
    const kindFactor = lender.kind === "private" ? 1.1 : lender.kind === "psu" ? 0.9 : 1;
    amount = income * multiple * kindFactor * (obligationRatio > 0.5 ? 0.6 : 1);
  }

  amount = Math.min(amount, cfg.maxAmount);
  const step = amount >= 1000000 ? 10000 : 1000;
  amount = floorTo(amount, step);

  const minShow = cfg.minAmount ?? (cfg.kind === "card" ? 20000 : 25000);
  if (amount < minShow) {
    return {
      ...base,
      reason:
        cfg.minAmount && amount > 0
          ? `Minimum loan under this scheme is ₹${cfg.minAmount.toLocaleString("en-IN")}`
          : "Eligible amount is too low for this lender",
    };
  }

  if (cfg.kind === "term") monthly = emiFor(amount, rate, cfg.tenureMonths);
  else if (cfg.kind === "revolving") monthly = (amount * rate) / 12 / 100;

  const chance: Chance =
    cibil >= 750 && obligationRatio < 0.3 ? "High" : cibil >= 700 && obligationRatio < 0.45 ? "Good" : "Fair";

  return { ...base, eligible: true, amount, monthly: Math.round(monthly), chance };
}

export function evaluateAll(input: EligibilityInput): Offer[] {
  return LENDERS.map((l) => evaluateLender(l, input));
}

export const formatINR = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;

export const formatShortINR = (n: number) => {
  if (n >= 10000000) return `₹${(n / 10000000).toFixed(n % 10000000 === 0 ? 0 : 2)} Cr`;
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 2)} L`;
  return formatINR(n);
};

export const tenureLabel = (months: number) =>
  months >= 12 && months % 12 === 0 ? `${months / 12} yrs` : `${months} mo`;

export const PARTNER_TYPES = [
  { value: "dsa", label: "DSA" },
  { value: "sub_dsa", label: "Sub-DSA" },
  { value: "loan_consultant", label: "Loan Consultant" },
  { value: "ca", label: "CA" },
  { value: "gst_consultant", label: "GST Consultant" },
  { value: "insurance_advisor", label: "Insurance Advisor" },
  { value: "property_consultant", label: "Property Consultant" },
  { value: "telecaller", label: "Telecaller" },
  { value: "telecalling_agency", label: "Telecalling Agency" },
  { value: "freelancer", label: "Freelancer" },
  { value: "referral", label: "Referral Partner" },
] as const;

export type PartnerType = (typeof PARTNER_TYPES)[number]["value"];

export const PARTNER_PRODUCTS = [
  { value: "personal_loan", label: "Personal Loan" },
  { value: "business_loan", label: "Business Loan" },
  { value: "msme", label: "MSME Loan" },
  { value: "mudra", label: "Mudra Loan" },
  { value: "home_loan", label: "Home Loan" },
  { value: "lap", label: "Loan Against Property" },
  { value: "auto", label: "Auto Loan" },
  { value: "education", label: "Education Loan" },
  { value: "credit_card", label: "Credit Card" },
  { value: "insurance", label: "Insurance" },
] as const;

export const JOURNEY_STEPS = [
  "KYC",
  "Verification",
  "Agreement",
  "Bank details",
  "Products",
  "Geography",
  "Experience",
  "Training",
  "Activation",
] as const;

export function partnerTypeLabel(value: string | null | undefined) {
  return PARTNER_TYPES.find((t) => t.value === value)?.label || value || "Partner";
}

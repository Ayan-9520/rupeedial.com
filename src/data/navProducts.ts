/** Public header — short menu. Every existing product page stays linked. */
export const headerMenus = [
  {
    label: "Loans",
    links: [
      { to: "/personal-loan", label: "Personal Loan" },
      { to: "/education-loan", label: "Education Loan" },
      { to: "/mudra-loan", label: "Mudra Loan" },
      { to: "/insurance", label: "Insurance" },
    ],
  },
  {
    label: "Business Finance",
    links: [
      { to: "/msme-loan", label: "MSME Loan" },
      { to: "/business-loan", label: "Business Loan" },
      { to: "/startup-business-loan", label: "Startup Business Loan" },
      { to: "/working-capital-loan", label: "Working Capital Loan" },
      { to: "/machinery-loan", label: "Machinery Loan" },
      { to: "/cgtmse-loan", label: "CGTMSE Loan" },
      { to: "/pmegp-loan", label: "PMEGP Loan" },
      { to: "/standup-india", label: "Stand-Up India" },
      { to: "/subsidy-linked-msme", label: "Subsidy Linked MSME" },
      { to: "/export-finance", label: "Export Finance" },
      { to: "/import-finance", label: "Import Finance" },
      { to: "/lc-bg", label: "LC / BG" },
      { to: "/invoice-financing", label: "Invoice Financing" },
      { to: "/cash-credit", label: "Cash Credit (CC)" },
      { to: "/overdraft", label: "Overdraft (OD)" },
    ],
  },
  {
    label: "Home & Property",
    links: [
      { to: "/home-loan", label: "Home Loan" },
      { to: "/lap-loan", label: "Loan Against Property" },
    ],
  },
] as const;

export const headerDirectLinks = [
  { to: "/auto-loan", label: "Auto Finance" },
  { to: "/credit-cards", label: "Credit Cards" },
  { to: "/check-eligibility", label: "Check Eligibility" },
  { to: "/partner-login", label: "Become a Partner" },
] as const;

/** Footer columns — full product list, unchanged routes */
export const productMenus = [
  {
    title: "Retail Loans",
    links: [
      { to: "/home-loan", label: "Home Loan" },
      { to: "/personal-loan", label: "Personal Loan" },
      { to: "/auto-loan", label: "Auto Loan" },
      { to: "/education-loan", label: "Education Loan" },
      { to: "/credit-cards", label: "Credit Cards" },
      { to: "/lap-loan", label: "Loan Against Property" },
      { to: "/insurance", label: "Insurance" },
    ],
  },
  {
    title: "MSME Loans",
    links: [
      { to: "/msme-loan", label: "MSME Loan" },
      { to: "/mudra-loan", label: "Mudra Loan" },
      { to: "/machinery-loan", label: "Machinery Loan" },
      { to: "/working-capital-loan", label: "Working Capital Loan" },
      { to: "/business-loan", label: "Business Loan" },
      { to: "/startup-business-loan", label: "Startup Business Loan" },
    ],
  },
  {
    title: "Government MSME Loans",
    links: [
      { to: "/cgtmse-loan", label: "CGTMSE Loan" },
      { to: "/pmegp-loan", label: "PMEGP Loan" },
      { to: "/standup-india", label: "Stand-Up India" },
      { to: "/subsidy-linked-msme", label: "Subsidy Linked MSME" },
    ],
  },
  {
    title: "Trade Finance",
    links: [
      { to: "/export-finance", label: "Export Finance" },
      { to: "/import-finance", label: "Import Finance" },
      { to: "/lc-bg", label: "LC / BG" },
      { to: "/invoice-financing", label: "Invoice Financing" },
      { to: "/cash-credit", label: "Cash Credit (CC)" },
      { to: "/overdraft", label: "Overdraft (OD)" },
    ],
  },
] as const;

/** Flat list for footer / sitemap-style links */
export const allProductLinks = productMenus.flatMap((col) =>
  col.links.map((l) => ({ ...l, category: col.title }))
);

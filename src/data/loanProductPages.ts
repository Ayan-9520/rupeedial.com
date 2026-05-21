import {
  Briefcase,
  Building2,
  Factory,
  Globe,
  Landmark,
  Package,
  Rocket,
  Ship,
  TrendingUp,
  Wallet,
  FileText,
  Shield,
  IndianRupee,
  type LucideIcon,
} from "lucide-react";

export interface FormFieldConfig {
  name: string;
  placeholder: string;
  type?: "text" | "select";
  options?: string[];
}

export interface LoanProductConfig {
  slug: string;
  productName: string;
  seo: { title: string; description: string };
  hero: {
    badge: string;
    title: string;
    description: string;
    bullets: string[];
    ctaTitle: string;
    ctaSubtitle: string;
  };
  form: {
    title: string;
    subtitle: string;
    submitLabel: string;
    successMessage: string;
    loanAmountPlaceholder?: string;
    showCompanyName?: boolean;
    extraFields?: FormFieldConfig[];
  };
  emi: {
    subtitle: string;
    defaultAmount: number;
    defaultRate: number;
    defaultTenureMonths: number;
    minRate: number;
    maxRate: number;
    minTenure: number;
    maxTenure: number;
  };
  rates: {
    note: string;
    rows: { label: string; value: string }[];
  };
  whatIs: {
    title: string;
    description: string;
    cards: { title: string; description: string; icon: LucideIcon }[];
  };
  eligibility: string[];
  documents: { left: string[]; right: string[] };
  benefits: string[];
  faqs: { q: string; a: string }[];
  showEmiCalculator?: boolean;
}

const msmeRates = (
  rate: string,
  tenure: string,
  fee: string
): LoanProductConfig["rates"] => ({
  note: "Indicative rates from partner banks & NBFCs. Final pricing depends on credit profile, business vintage and lender policy.",
  rows: [
    { label: "Interest Rate", value: rate },
    { label: "Loan Tenure", value: tenure },
    { label: "Processing Fee", value: fee },
    { label: "Loan Amount", value: "₹1 Lakh – ₹10 Crore (lender dependent)" },
    { label: "Collateral", value: "Secured / Unsecured options available" },
  ],
});

const tradeRates = (
  rate: string,
  fee: string
): LoanProductConfig["rates"] => ({
  note: "Trade finance charges vary by bank, transaction type, tenor and client relationship. Rates below are indicative.",
  rows: [
    { label: "Interest / Margin", value: rate },
    { label: "Processing / Commitment Fee", value: fee },
    { label: "Facility Limit", value: "Based on turnover & bank policy" },
    { label: "Tenor", value: "30 days – 12 months (product specific)" },
    { label: "Security", value: "Stock, receivables, LC margin or collateral" },
  ],
});

export const additionalLoanProducts: LoanProductConfig[] = [
  {
    slug: "working-capital-loan",
    productName: "Working Capital Loan",
    seo: {
      title: "Working Capital Loan for MSME | CC & OD Limits | RupeeDial",
      description:
        "Apply for working capital loan to manage inventory, receivables and day-to-day business expenses. Compare CC, OD and term WC limits from top banks.",
    },
    hero: {
      badge: "MSME Working Capital",
      title: "Working Capital Loan for Growing Businesses",
      description:
        "Fund day-to-day operations, raw material purchases, salaries and business cycles with flexible working capital facilities from leading banks & NBFCs.",
      bullets: [
        "Cash Credit (CC) & Overdraft (OD) limits",
        "Fund inventory, debtors & operating expenses",
        "Renewable limits for established businesses",
        "Quick eligibility check with expert support",
      ],
      ctaTitle: "Strengthen Your Business Cash Flow",
      ctaSubtitle:
        "Get the best working capital offers tailored to your turnover and industry.",
    },
    form: {
      title: "Apply for Working Capital Loan",
      subtitle: "Share your business details — our MSME expert will call you within 24 hours.",
      submitLabel: "Get Working Capital Assistance",
      successMessage:
        "Thank you! Our working capital specialist will contact you shortly.",
      extraFields: [
        {
          name: "annualTurnover",
          placeholder: "Annual Turnover (₹)",
        },
        {
          name: "businessVintage",
          placeholder: "Business Vintage",
          type: "select",
          options: ["Less than 1 year", "1–3 years", "3–5 years", "5+ years"],
        },
        {
          name: "facilityType",
          placeholder: "Facility Type",
          type: "select",
          options: ["Cash Credit (CC)", "Overdraft (OD)", "Term Working Capital"],
        },
      ],
    },
    emi: {
      subtitle: "Estimate EMI for term-based working capital facilities.",
      defaultAmount: 2500000,
      defaultRate: 11.5,
      defaultTenureMonths: 36,
      minRate: 9,
      maxRate: 22,
      minTenure: 12,
      maxTenure: 60,
    },
    rates: msmeRates("9% – 16% p.a.", "12 – 60 months", "0.5% – 2% of limit"),
    whatIs: {
      title: "What is a Working Capital Loan?",
      description:
        "Working capital finance helps businesses manage short-term funding needs without disrupting long-term investments.",
      cards: [
        {
          title: "Operational Stability",
          description: "Maintain smooth cash flow during seasonal or credit cycles.",
          icon: Wallet,
        },
        {
          title: "Inventory Funding",
          description: "Purchase raw materials and stock without blocking own funds.",
          icon: Package,
        },
        {
          title: "Business Growth",
          description: "Accept larger orders and scale operations confidently.",
          icon: TrendingUp,
        },
      ],
    },
    eligibility: [
      "Business operational for minimum 2–3 years (flexible for strong financials)",
      "Regular GST filings and bank credits",
      "Positive net worth and acceptable CIBIL / commercial bureau score",
      "Adequate stock and book debts for CC limits",
      "Proprietorship, partnership, LLP or private limited entity",
    ],
    documents: {
      left: [
        "KYC of promoters & business entity",
        "PAN, Aadhaar & GST registration",
        "Partnership deed / MOA-AOA / incorporation certificate",
        "Business address proof",
      ],
      right: [
        "Last 12 months bank statements",
        "ITR & financials (2–3 years)",
        "Stock, debtors & creditors statement",
        "Existing loan sanction letters (if any)",
      ],
    },
    benefits: [
      "Flexible CC / OD limits linked to business activity",
      "Pay interest only on utilized amount",
      "Helps manage receivables and payables efficiently",
      "Top-up and enhancement options for growing MSMEs",
      "Assisted documentation & bank coordination",
    ],
    faqs: [
      {
        q: "What is the difference between CC and OD?",
        a: "Cash Credit is typically secured against stock and book debts, while Overdraft may be offered against FD, property or business relationship. Both are revolving limits.",
      },
      {
        q: "How much working capital can I get?",
        a: "Limits depend on turnover, profitability, banking conduct and security offered. Many MSMEs get ₹10 lakh to ₹5 crore+.",
      },
      {
        q: "Is collateral mandatory?",
        a: "CC limits usually require primary security (stock/debtors). Some banks offer clean OD or BL limits based on strong financials.",
      },
      {
        q: "How long does approval take?",
        a: "With complete documents, sanction can take 5–15 working days depending on the lender.",
      },
    ],
  },
  {
    slug: "business-loan",
    productName: "Business Loan",
    seo: {
      title: "Business Loan for MSME & SMEs | Apply Online | RupeeDial",
      description:
        "Apply for unsecured and secured business loans for expansion, machinery, marketing and working needs. Compare offers from 50+ lenders.",
    },
    hero: {
      badge: "MSME & SME Finance",
      title: "Business Loan for Expansion & Growth",
      description:
        "Get term loans for business expansion, office setup, marketing, technology upgrade and general corporate needs with competitive rates.",
      bullets: [
        "Unsecured loans up to ₹50 lakh+ (profile based)",
        "Secured loans for higher ticket sizes",
        "Minimal documentation for digital lenders",
        "Dedicated RupeeDial relationship manager",
      ],
      ctaTitle: "Scale Your Business with the Right Loan",
      ctaSubtitle: "Compare business loan offers from banks and NBFCs in one application.",
    },
    form: {
      title: "Apply for Business Loan",
      subtitle: "Tell us about your business — get expert-guided bank matching.",
      submitLabel: "Get Business Loan Offers",
      successMessage: "Thank you! Our business loan expert will reach out shortly.",
      extraFields: [
        {
          name: "businessType",
          placeholder: "Business Type",
          type: "select",
          options: [
            "Manufacturing",
            "Trading",
            "Services",
            "Retail",
            "Other",
          ],
        },
        {
          name: "annualTurnover",
          placeholder: "Annual Turnover (₹)",
        },
        {
          name: "gstNumber",
          placeholder: "GST Number (if registered)",
        },
      ],
    },
    emi: {
      subtitle: "Plan your monthly EMI before you apply.",
      defaultAmount: 3000000,
      defaultRate: 13,
      defaultTenureMonths: 48,
      minRate: 10,
      maxRate: 24,
      minTenure: 12,
      maxTenure: 84,
    },
    rates: msmeRates("10.5% – 22% p.a.", "12 – 84 months", "1% – 3% + GST"),
    whatIs: {
      title: "What is a Business Loan?",
      description:
        "A business loan provides lump-sum funding for planned expenses, repayable in EMIs over a fixed tenure.",
      cards: [
        {
          title: "Expand Operations",
          description: "Open new branches, hire staff or enter new markets.",
          icon: Building2,
        },
        {
          title: "No Equity Dilution",
          description: "Grow without giving up ownership unlike investors.",
          icon: Briefcase,
        },
        {
          title: "Flexible Use",
          description: "Use for marketing, tech, inventory or consolidation.",
          icon: IndianRupee,
        },
      ],
    },
    eligibility: [
      "Business vintage of 2+ years (1 year for select NBFCs)",
      "Minimum annual turnover as per lender norms",
      "Profit-making or acceptable cash flows",
      "CIBIL score typically 650+ (higher for better rates)",
      "Valid business registration & GST (where applicable)",
    ],
    documents: {
      left: [
        "Applicant & co-applicant KYC",
        "Business PAN & GST certificate",
        "Constitution proof (Shop Act, LLP deed, etc.)",
        "Ownership proof of residence & office",
      ],
      right: [
        "12 months bank statements (all accounts)",
        "ITR with computation (2–3 years)",
        "GST returns (if applicable)",
        "Existing loan account statements",
      ],
    },
    benefits: [
      "Collateral-free options for eligible MSMEs",
      "Balance transfer for high-cost existing loans",
      "Doorstep collection support via partners",
      "Prepayment options after lock-in (lender specific)",
      "End-to-end assistance from application to disbursal",
    ],
    faqs: [
      {
        q: "Can I get a business loan without collateral?",
        a: "Yes, many banks and NBFCs offer unsecured business loans based on turnover, banking and credit score.",
      },
      {
        q: "What loan amount can MSMEs typically get?",
        a: "From ₹1 lakh up to ₹10 crore+ depending on financials and security.",
      },
      {
        q: "Can proprietors apply?",
        a: "Yes, proprietorships, partnerships, LLPs and companies can apply.",
      },
      {
        q: "Is GST mandatory?",
        a: "GST is preferred for higher limits but some lenders fund non-GST businesses with strong banking.",
      },
    ],
  },
  {
    slug: "startup-business-loan",
    productName: "Startup Business Loan",
    seo: {
      title: "Startup Business Loan India | Seed & Growth Funding | RupeeDial",
      description:
        "Funding for startups and new ventures via bank loans, NBFCs, government schemes and investor-linked credit. Check eligibility on RupeeDial.",
    },
    hero: {
      badge: "Startup & New Venture",
      title: "Startup Business Loan for Early-Stage Founders",
      description:
        "Access credit for prototypes, working capital, marketing and initial scale-up through startup-friendly lenders and government-backed schemes.",
      bullets: [
        "Loans for DPIIT-registered & early-stage startups",
        "Mudra, CGTMSE and Stand-Up India linked options",
        "Guidance on pitch, projections & lender fit",
        "Founder-friendly documentation support",
      ],
      ctaTitle: "Fuel Your Startup Journey",
      ctaSubtitle: "Connect with lenders who understand startup business models.",
    },
    form: {
      title: "Apply for Startup Business Loan",
      subtitle: "Share your startup profile for customized funding options.",
      submitLabel: "Get Startup Funding Guidance",
      successMessage:
        "Thank you! Our startup finance advisor will contact you soon.",
      extraFields: [
        {
          name: "startupStage",
          placeholder: "Startup Stage",
          type: "select",
          options: ["Idea / Prototype", "Early Revenue", "Growth", "Scale-up"],
        },
        {
          name: "industry",
          placeholder: "Industry (IT, Manufacturing, D2C, etc.)",
        },
        {
          name: "dpiitRegistered",
          placeholder: "DPIIT Registered?",
          type: "select",
          options: ["Yes", "No", "Applied"],
        },
      ],
    },
    emi: {
      subtitle: "Estimate EMI for startup term loan facilities.",
      defaultAmount: 1500000,
      defaultRate: 12,
      defaultTenureMonths: 48,
      minRate: 8,
      maxRate: 20,
      minTenure: 12,
      maxTenure: 72,
    },
    rates: msmeRates(
      "8% – 18% p.a. (scheme linked)",
      "12 – 84 months",
      "Nil – 2% (scheme dependent)"
    ),
    whatIs: {
      title: "What is a Startup Business Loan?",
      description:
        "Startup loans help founders fund product development, hiring, marketing and early operations before profitability stabilizes.",
      cards: [
        {
          title: "Launch Faster",
          description: "Access capital without waiting for profitability.",
          icon: Rocket,
        },
        {
          title: "Scheme Benefits",
          description: "Leverage government credit guarantee & subsidy programs.",
          icon: Shield,
        },
        {
          title: "Expert Mentorship",
          description: "RupeeDial guides on lender selection and documentation.",
          icon: FileText,
        },
      ],
    },
    eligibility: [
      "Registered business entity or valid startup registration",
      "Founder KYC and business plan / projections",
      "DPIIT recognition preferred for certain schemes",
      "Acceptable personal and business credit history",
      "Promoter contribution as per scheme (typically 10–25%)",
    ],
    documents: {
      left: [
        "Founder PAN, Aadhaar & address proof",
        "Company incorporation / LLP agreement",
        "DPIIT certificate (if available)",
        "Business plan or project report",
      ],
      right: [
        "Bank statements (6–12 months)",
        "ITR of promoters (if filed)",
        "Pitch deck or revenue proof (if any)",
        "MOU / contracts / purchase orders (if any)",
      ],
    },
    benefits: [
      "Access to collateral-free credit under CGTMSE",
      "Combination of term loan + working capital",
      "Support for women & SC/ST founder schemes",
      "Handholding for first-time entrepreneurs",
      "Single window to compare multiple funding routes",
    ],
    faqs: [
      {
        q: "Can a startup get a loan without revenue?",
        a: "Some schemes and NBFCs fund based on projections, founder profile and collateral/guarantee. Revenue helps secure better terms.",
      },
      {
        q: "Is DPIIT registration required?",
        a: "Not always, but it unlocks startup-specific schemes and lender programs.",
      },
      {
        q: "Do banks fund tech startups?",
        a: "Yes, along with NBFCs and government schemes; lender choice depends on model and cash flows.",
      },
      {
        q: "Can I combine Mudra and startup loan?",
        a: "Multiple facilities may be possible subject to overall exposure norms — our expert will guide you.",
      },
    ],
  },
  {
    slug: "cgtmse-loan",
    productName: "CGTMSE Loan",
    seo: {
      title: "CGTMSE Loan for MSME | Collateral-Free Credit | RupeeDial",
      description:
        "Apply for CGTMSE-backed collateral-free MSME loans up to ₹5 crore. Credit guarantee cover from Government of India via member banks.",
    },
    hero: {
      badge: "Government Credit Guarantee",
      title: "CGTMSE Loan – Collateral-Free MSME Finance",
      description:
        "Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) enables banks to lend without third-party collateral for eligible MSME units.",
      bullets: [
        "Collateral-free loans for micro & small enterprises",
        "Coverage up to ₹5 crore per borrower (as per scheme)",
        "Available through scheduled commercial banks",
        "RupeeDial assists with eligibility & documentation",
      ],
      ctaTitle: "Get Collateral-Free MSME Funding",
      ctaSubtitle: "Apply through RupeeDial for CGTMSE-linked bank facilities.",
    },
    form: {
      title: "Apply for CGTMSE Loan",
      subtitle: "Check if your MSME qualifies for guarantee-backed credit.",
      submitLabel: "Check CGTMSE Eligibility",
      successMessage:
        "Thank you! We will guide you on CGTMSE-eligible bank options.",
      extraFields: [
        {
          name: "msmeCategory",
          placeholder: "MSME Category",
          type: "select",
          options: ["Micro", "Small", "Medium"],
        },
        {
          name: "udyamNumber",
          placeholder: "Udyam Registration Number",
        },
        {
          name: "loanPurpose",
          placeholder: "Loan Purpose",
          type: "select",
          options: [
            "Term Loan",
            "Working Capital",
            "Both",
          ],
        },
      ],
    },
    emi: {
      subtitle: "Estimate EMI for CGTMSE-backed term loans.",
      defaultAmount: 2000000,
      defaultRate: 10.5,
      defaultTenureMonths: 60,
      minRate: 8,
      maxRate: 16,
      minTenure: 12,
      maxTenure: 84,
    },
    rates: {
      note: "Interest rates are set by member banks. CGTMSE provides guarantee cover; annual guarantee fee is borne by the lender.",
      rows: [
        { label: "Interest Rate", value: "Linked to EBLR / MCLR + spread (typically 9% – 14%)" },
        { label: "Maximum Guarantee Cover", value: "Up to ₹5 Cr (as per CGTMSE guidelines)" },
        { label: "Guarantee Fee", value: "Paid by lender to CGTMSE (passed in pricing)" },
        { label: "Collateral", value: "No third-party collateral; primary security may apply" },
        { label: "Tenure", value: "Term loan & WC as per bank policy" },
      ],
    },
    whatIs: {
      title: "What is CGTMSE?",
      description:
        "CGTMSE was set up by GoI and SIDBI to facilitate collateral-free credit to MSMEs through member lending institutions.",
      cards: [
        {
          title: "No Collateral Burden",
          description: "Promoters avoid pledging residential or commercial property.",
          icon: Shield,
        },
        {
          title: "Wider Bank Access",
          description: "Multiple PSU and private banks participate as MLIs.",
          icon: Landmark,
        },
        {
          title: "MSME Empowerment",
          description: "Designed for manufacturing and service MSME units.",
          icon: Factory,
        },
      ],
    },
    eligibility: [
      "New or existing micro / small enterprise (medium as per latest norms)",
      "Valid Udyam registration recommended",
      "Fund-based and non-fund-based credit facilities eligible",
      "Borrower should not be in default to any lender",
      "Activity permitted under CGTMSE scheme guidelines",
    ],
    documents: {
      left: [
        "Udyam registration certificate",
        "KYC of promoters & entity",
        "Business PAN & GST",
        "Project report for new units",
      ],
      right: [
        "Financial statements / ITR",
        "Bank statements (12 months)",
        "Board resolution / partnership letter",
        "Existing loan details (if any)",
      ],
    },
    benefits: [
      "Collateral-free credit for eligible MSMEs",
      "Improves access for first-generation entrepreneurs",
      "Both term loan and working capital covered",
      "Enhances borrowing capacity without personal assets",
      "RupeeDial coordinates with CGTMSE member banks",
    ],
    faqs: [
      {
        q: "Is CGTMSE loan completely without security?",
        a: "Third-party collateral is not required; banks may take primary security like stock, machinery or personal guarantee.",
      },
      {
        q: "What is the maximum loan under CGTMSE?",
        a: "Cover limits are revised periodically; currently up to ₹5 crore for eligible borrowers as per scheme.",
      },
      {
        q: "Who pays the guarantee fee?",
        a: "The member lender pays annual fee to CGTMSE; it may be reflected in overall pricing.",
      },
      {
        q: "How to apply?",
        a: "Apply through a CGTMSE member bank or NBFC. RupeeDial helps match your profile to the right MLI.",
      },
    ],
  },
  {
    slug: "pmegp-loan",
    productName: "PMEGP Loan",
    seo: {
      title: "PMEGP Loan Scheme | Subsidy for New Enterprises | RupeeDial",
      description:
        "Prime Minister Employment Generation Programme (PMEGP) offers margin money subsidy for new micro enterprises in manufacturing & service sector.",
    },
    hero: {
      badge: "Government Subsidy Scheme",
      title: "PMEGP Loan with Margin Money Subsidy",
      description:
        "Start a new micro enterprise with bank credit and government subsidy on project cost for general, special and hill area categories.",
      bullets: [
        "Subsidy on project cost (15% – 35%)",
        "For new units in manufacturing & services",
        "KVIC / DIC routed application process",
        "End-to-end project report assistance",
      ],
      ctaTitle: "Start Your Enterprise with PMEGP",
      ctaSubtitle: "Get guidance on subsidy, bank sanction and documentation.",
    },
    form: {
      title: "Apply for PMEGP Loan",
      subtitle: "Share project details for PMEGP eligibility assessment.",
      submitLabel: "Get PMEGP Application Help",
      successMessage:
        "Thank you! Our PMEGP specialist will guide you on next steps.",
      extraFields: [
        {
          name: "projectCost",
          placeholder: "Total Project Cost (₹)",
        },
        {
          name: "category",
          placeholder: "Applicant Category",
          type: "select",
          options: ["General", "Special (SC/ST/OBC/Minority/Women/Ex-Servicemen)", "Hill / Border Area"],
        },
        {
          name: "sector",
          placeholder: "Sector",
          type: "select",
          options: ["Manufacturing", "Service"],
        },
      ],
    },
    emi: {
      subtitle: "Estimate EMI after subsidy and promoter contribution.",
      defaultAmount: 1000000,
      defaultRate: 9.5,
      defaultTenureMonths: 60,
      minRate: 7,
      maxRate: 14,
      minTenure: 36,
      maxTenure: 84,
    },
    rates: {
      note: "PMEGP subsidy is credited to borrower account after lock-in. Bank loan covers remaining project cost.",
      rows: [
        { label: "Maximum Project Cost", value: "₹50 lakh (manufacturing) / ₹20 lakh (service)" },
        { label: "Subsidy (General)", value: "15% (urban) / 25% (rural)" },
        { label: "Subsidy (Special Category)", value: "25% (urban) / 35% (rural)" },
        { label: "Promoter Contribution", value: "10% (general) / 5% (special)" },
        { label: "Interest Rate", value: "As per bank (typically 10% – 12%)" },
      ],
    },
    whatIs: {
      title: "What is PMEGP?",
      description:
        "PMEGP is a credit-linked subsidy programme to generate employment by promoting new micro enterprises.",
      cards: [
        {
          title: "Capital Subsidy",
          description: "Government contributes margin money to reduce loan burden.",
          icon: IndianRupee,
        },
        {
          title: "New Enterprise Focus",
          description: "For first-time entrepreneurs setting up new units.",
          icon: Rocket,
        },
        {
          title: "Wide Sector Coverage",
          description: "Manufacturing and service activities across India.",
          icon: Factory,
        },
      ],
    },
    eligibility: [
      "Individual above 18 years; no income ceiling",
      "Only one person per family eligible for new unit",
      "Should not have availed subsidy under other schemes for same activity",
      "Minimum VIII pass for projects above ₹10 lakh (manufacturing)",
      "EDP training mandatory before loan disbursement",
    ],
    documents: {
      left: [
        "Aadhaar, PAN & category certificate (if applicable)",
        "Project report / DPR",
        "Quotations for machinery & equipment",
        "Site / address proof",
      ],
      right: [
        "Education certificate",
        "Caste / special category certificate (if applicable)",
        "Passport size photographs",
        "Any prior experience certificates",
      ],
    },
    benefits: [
      "Reduces effective project cost via margin money subsidy",
      "Encourages self-employment in rural & urban areas",
      "Bank loan for balance amount after subsidy & margin",
      "Wide range of activities permitted under guidelines",
      "RupeeDial supports DPR and bank coordination",
    ],
    faqs: [
      {
        q: "Can existing businesses apply for PMEGP?",
        a: "PMEGP is primarily for new units. Existing units may explore other MSME schemes.",
      },
      {
        q: "When is subsidy released?",
        a: "After successful setup, EDP training and lock-in period as per KVIC norms.",
      },
      {
        q: "Which banks sanction PMEGP loans?",
        a: "All scheduled commercial banks, RRBs and select cooperatives as per KVIC list.",
      },
      {
        q: "Is collateral required?",
        a: "CGTMSE cover is often used; banks may take primary security as per policy.",
      },
    ],
  },
  {
    slug: "standup-india",
    productName: "Stand-Up India",
    seo: {
      title: "Stand Up India Loan Scheme | Women & SC/ST Entrepreneurs | RupeeDial",
      description:
        "Stand-Up India facilitates bank loans between ₹10 lakh and ₹1 crore for greenfield enterprises by women and SC/ST entrepreneurs.",
    },
    hero: {
      badge: "Stand-Up India Scheme",
      title: "Stand-Up India Loan for Greenfield Projects",
      description:
        "Bank loans for setting up greenfield manufacturing, services or trading enterprises by women and SC/ST borrowers with composite loan structure.",
      bullets: [
        "Loan size ₹10 lakh – ₹1 crore per enterprise",
        "For women & SC/ST promoters (at least one borrower)",
        "Greenfield projects only",
        "Handholding through Stand-Up India portal & RupeeDial",
      ],
      ctaTitle: "Launch Your Greenfield Enterprise",
      ctaSubtitle: "Get Stand-Up India compliant project financing assistance.",
    },
    form: {
      title: "Apply for Stand-Up India Loan",
      subtitle: "Share greenfield project details for scheme assessment.",
      submitLabel: "Get Stand-Up India Guidance",
      successMessage:
        "Thank you! Our scheme specialist will contact you regarding Stand-Up India.",
      extraFields: [
        {
          name: "promoterCategory",
          placeholder: "Promoter Category",
          type: "select",
          options: ["Women", "SC/ST", "Women + SC/ST Joint"],
        },
        {
          name: "activityType",
          placeholder: "Activity Type",
          type: "select",
          options: ["Manufacturing", "Services", "Trading"],
        },
        {
          name: "projectCost",
          placeholder: "Total Project Cost (₹)",
        },
      ],
    },
    emi: {
      subtitle: "Estimate composite loan EMI (term + working capital).",
      defaultAmount: 5000000,
      defaultRate: 10,
      defaultTenureMonths: 84,
      minRate: 8,
      maxRate: 15,
      minTenure: 36,
      maxTenure: 120,
    },
    rates: {
      note: "Rate of interest is the lowest applicable rate of the bank for that category. Repayment up to 7 years with moratorium.",
      rows: [
        { label: "Loan Amount", value: "₹10 lakh – ₹1 crore" },
        { label: "Borrower", value: "At least one woman or SC/ST promoter (51%+)" },
        { label: "Interest Rate", value: "Lowest applicable rate of the bank" },
        { label: "Repayment", value: "Up to 7 years including moratorium up to 18 months" },
        { label: "Nature", value: "Composite loan: term loan + working capital" },
      ],
    },
    whatIs: {
      title: "What is Stand-Up India?",
      description:
        "Stand-Up India was launched to promote entrepreneurship among women and SC/ST communities through bank credit.",
      cards: [
        {
          title: "Inclusive Entrepreneurship",
          description: "Targets under-represented segments in industry ownership.",
          icon: Briefcase,
        },
        {
          title: "Greenfield Focus",
          description: "First-time venture in manufacturing, services or trading.",
          icon: Building2,
        },
        {
          title: "Handholding Support",
          description: "Connects with SIDBI, NABARD and Dalit Indian Chamber networks.",
          icon: Shield,
        },
      ],
    },
    eligibility: [
      "Borrower should be woman and/or SC/ST (51% shareholding in non-individual)",
      "Greenfield project — first venture of its kind for borrower",
      "Age 18+ and not defaulter to any bank",
      "Project cost and loan within ₹10 lakh – ₹1 crore band",
      "Compliance with bank's credit norms",
    ],
    documents: {
      left: [
        "KYC & category proof (woman / SC/ST)",
        "Detailed project report",
        "Company registration documents",
        "Quotations & estimates",
      ],
      right: [
        "CIBIL report of promoters",
        "Net worth statement",
        "Site lease / ownership documents",
        "Experience certificates (if any)",
      ],
    },
    benefits: [
      "Dedicated scheme for women & SC/ST founders",
      "Composite facility covers setup and working capital",
      "Concessional pricing at bank's lowest rate",
      "Longer repayment with moratorium",
      "RupeeDial helps with bank & handholding connect",
    ],
    faqs: [
      {
        q: "Can trading businesses get Stand-Up India loan?",
        a: "Yes, trading activity is covered as greenfield enterprise subject to bank approval.",
      },
      {
        q: "Is this only for manufacturing?",
        a: "No — manufacturing, services and trading are all eligible.",
      },
      {
        q: "Can two promoters apply together?",
        a: "Yes, at least one should be woman or SC/ST holding 51% in non-individual entities.",
      },
      {
        q: "How is it different from PMEGP?",
        a: "Stand-Up India targets higher ticket greenfield projects; PMEGP focuses on micro units with margin subsidy.",
      },
    ],
  },
  {
    slug: "subsidy-linked-msme",
    productName: "Subsidy Linked MSME",
    seo: {
      title: "Subsidy Linked MSME Loan | Government Schemes | RupeeDial",
      description:
        "Explore MSME loans linked to central and state subsidies — interest subvention, capital subsidy, technology upgradation and more.",
    },
    hero: {
      badge: "Subsidy & Incentive Linked Credit",
      title: "Subsidy Linked MSME Loans & Incentives",
      description:
        "Combine bank credit with applicable government subsidies, interest subvention and state industrial incentives for lower effective cost.",
      bullets: [
        "Interest subvention & capital subsidy schemes",
        "State-specific MSME packages",
        "Technology upgradation (ZED, etc.) linked aid",
        "Expert mapping of scheme + bank product",
      ],
      ctaTitle: "Maximize Benefits on Your MSME Loan",
      ctaSubtitle: "Identify subsidies you can claim along with bank finance.",
    },
    form: {
      title: "Check Subsidy Linked MSME Options",
      subtitle: "Tell us your state, sector and project for scheme matching.",
      submitLabel: "Get Subsidy & Loan Guidance",
      successMessage:
        "Thank you! We will share eligible subsidy-linked MSME options.",
      extraFields: [
        {
          name: "state",
          placeholder: "State",
        },
        {
          name: "schemeInterest",
          placeholder: "Scheme Interest",
          type: "select",
          options: [
            "Interest Subvention",
            "Capital Investment Subsidy",
            "Technology Upgradation",
            "Not Sure – Need Guidance",
          ],
        },
        {
          name: "sector",
          placeholder: "Industry / Sector",
        },
      ],
    },
    emi: {
      subtitle: "Estimate EMI after expected subsidy benefit.",
      defaultAmount: 2500000,
      defaultRate: 9,
      defaultTenureMonths: 60,
      minRate: 7,
      maxRate: 16,
      minTenure: 12,
      maxTenure: 84,
    },
    rates: {
      note: "Effective cost reduces after subsidy. Actual benefit depends on state, sector and timely compliance.",
      rows: [
        { label: "Base Interest Rate", value: "9% – 14% p.a. (bank linked)" },
        { label: "Interest Subvention", value: "Up to 5% for eligible accounts (scheme specific)" },
        { label: "Capital Subsidy", value: "10% – 40% on plant & machinery (state schemes)" },
        { label: "Processing Fee", value: "0.5% – 2%" },
        { label: "Subsidy Disbursement", value: "After verification & lock-in (scheme wise)" },
      ],
    },
    whatIs: {
      title: "What are Subsidy Linked MSME Loans?",
      description:
        "These are regular bank loans where borrowers additionally claim government incentive components reducing net project or interest cost.",
      cards: [
        {
          title: "Lower Effective Cost",
          description: "Subsidies reduce interest or capital expenditure burden.",
          icon: IndianRupee,
        },
        {
          title: "Policy Aligned Growth",
          description: "Supports Make in India, export and employment goals.",
          icon: TrendingUp,
        },
        {
          title: "Scheme Navigation",
          description: "RupeeDial maps central + state benefits to your profile.",
          icon: FileText,
        },
      ],
    },
    eligibility: [
      "Valid MSME / Udyam registration",
      "Activity eligible under relevant central or state scheme",
      "Compliance with investment and employment thresholds",
      "No default on prior subsidy claims",
      "Timely filing of statutory returns (GST, PF, etc.)",
    ],
    documents: {
      left: [
        "Udyam & incorporation documents",
        "Project report with subsidy component",
        "KYC of promoters",
        "Proof of category (if special scheme)",
      ],
      right: [
        "Financials & ITR",
        "Bank statements",
        "Machinery / civil quotations",
        "Previous subsidy utilization certificate (if any)",
      ],
    },
    benefits: [
      "Reduces overall cost of borrowing or investment",
      "Access to both fund-based and incentive components",
      "Supports modernization and capacity expansion",
      "Single advisor for bank + subsidy application",
      "Updates on new central & state notifications",
    ],
    faqs: [
      {
        q: "Can subsidy be claimed after loan disbursal?",
        a: "Most schemes require pre-approval or application before asset purchase; timelines vary.",
      },
      {
        q: "Are subsidies available in all states?",
        a: "Yes, but benefits differ. RupeeDial checks state industrial policies for you.",
      },
      {
        q: "Is collateral still needed?",
        a: "Bank credit norms apply; subsidies do not replace security requirements unless combined with CGTMSE.",
      },
      {
        q: "How long does subsidy credit take?",
        a: "Typically 3–12 months after verification and lock-in, depending on the scheme.",
      },
    ],
  },
  {
    slug: "export-finance",
    productName: "Export Finance",
    seo: {
      title: "Export Finance India | Pre & Post Shipment Credit | RupeeDial",
      description:
        "Export finance solutions including pre-shipment credit, post-shipment credit, export bills discounting and foreign currency facilities.",
    },
    hero: {
      badge: "Trade Finance – Export",
      title: "Export Finance for Global Trade Growth",
      description:
        "Finance your export cycle from production to payment realization with pre-shipment, post-shipment and bill discounting facilities.",
      bullets: [
        "Pre-shipment & post-shipment credit (PC/PCFC)",
        "Export bill discounting & negotiation",
        "Foreign currency & forward cover guidance",
        "Compliance support for shipping documents",
      ],
      ctaTitle: "Scale Your Exports with Right Finance",
      ctaSubtitle: "RupeeDial connects exporters with trade finance desks of top banks.",
    },
    form: {
      title: "Apply for Export Finance",
      subtitle: "Share export turnover and buyer details for facility structuring.",
      submitLabel: "Get Export Finance Assistance",
      successMessage:
        "Thank you! Our trade finance team will contact you shortly.",
      loanAmountPlaceholder: "Facility Limit Required (₹)*",
      extraFields: [
        {
          name: "exportTurnover",
          placeholder: "Annual Export Turnover (₹)",
        },
        {
          name: "buyerCountry",
          placeholder: "Main Buyer Country",
        },
        {
          name: "productType",
          placeholder: "Facility Type",
          type: "select",
          options: [
            "Pre-Shipment Credit",
            "Post-Shipment Credit",
            "Bill Discounting",
            "Export LC",
          ],
        },
      ],
    },
    emi: {
      subtitle: "Estimate interest cost for export credit (indicative).",
      defaultAmount: 5000000,
      defaultRate: 9.5,
      defaultTenureMonths: 6,
      minRate: 7,
      maxRate: 14,
      minTenure: 1,
      maxTenure: 12,
    },
    rates: tradeRates("7% – 12% p.a. (INR / FCY linked)", "0.25% – 1% per transaction"),
    whatIs: {
      title: "What is Export Finance?",
      description:
        "Export finance bridges the gap between production/shipment and receipt of foreign exchange proceeds from overseas buyers.",
      cards: [
        {
          title: "Pre-Shipment Funding",
          description: "Fund raw material and production before goods ship.",
          icon: Package,
        },
        {
          title: "Post-Shipment Credit",
          description: "Finance receivables until export proceeds are realized.",
          icon: Ship,
        },
        {
          title: "Global Reach",
          description: "Support LC, collection bills and buyer credit insurance.",
          icon: Globe,
        },
      ],
    },
    eligibility: [
      "IEC (Import Export Code) holder with export track record",
      "Acceptable counterparty / buyer credit profile",
      "Compliance with FEMA and RBI export guidelines",
      "Shipping documents as per Incoterms",
      "Satisfactory CIBIL / commercial credit history",
    ],
    documents: {
      left: [
        "IEC, PAN, GST & KYC",
        "Export order / PI / contract copy",
        "Shipping documents (invoice, packing list, BL/AWB)",
        "LC or buyer credit terms (if applicable)",
      ],
      right: [
        "Bank statements & export realization history",
        "Financial statements",
        "Insurance / ECGC cover (if applicable)",
        "Forward contract details (if any)",
      ],
    },
    benefits: [
      "Improves cash flow without waiting for buyer payment",
      "Competitive pricing for prime exporters",
      "Packing credit in INR or foreign currency",
      "Bill discounting reduces receivable days",
      "Expert help on LC clauses and documentation",
    ],
    faqs: [
      {
        q: "What is pre-shipment credit?",
        a: "Short-term finance granted before goods are shipped, typically against export order or LC.",
      },
      {
        q: "Can new exporters apply?",
        a: "Banks may start with lower limits and grow based on performance and buyer quality.",
      },
      {
        q: "Is ECGC insurance required?",
        a: "Recommended for buyer credit risk; some facilities are linked to ECGC cover.",
      },
      {
        q: "Which currencies are supported?",
        a: "USD, EUR, GBP and other major currencies as per bank's FCY policy.",
      },
    ],
  },
  {
    slug: "import-finance",
    productName: "Import Finance",
    seo: {
      title: "Import Finance India | LC & Buyer Credit | RupeeDial",
      description:
        "Import finance for raw materials, machinery and goods — suppliers credit, import LC, buyer's credit and customs duty funding.",
    },
    hero: {
      badge: "Trade Finance – Import",
      title: "Import Finance for Suppliers & Inventory",
      description:
        "Manage overseas payments and customs timelines with import LC, suppliers credit, buyers credit and working capital for importers.",
      bullets: [
        "Import LC & suppliers credit arrangements",
        "Buyer's credit for capital goods imports",
        "Trade finance against import documents",
        "FEMA-compliant structuring support",
      ],
      ctaTitle: "Streamline Your Import Payments",
      ctaSubtitle: "Get import finance facilities aligned to your supplier terms.",
    },
    form: {
      title: "Apply for Import Finance",
      subtitle: "Share supplier, commodity and shipment details.",
      submitLabel: "Get Import Finance Assistance",
      successMessage:
        "Thank you! Our import finance advisor will reach out soon.",
      loanAmountPlaceholder: "Import Facility Limit (₹)*",
      extraFields: [
        {
          name: "importValue",
          placeholder: "Annual Import Value (₹)",
        },
        {
          name: "supplierCountry",
          placeholder: "Supplier Country",
        },
        {
          name: "commodity",
          placeholder: "Commodity / Goods Imported",
        },
      ],
    },
    emi: {
      subtitle: "Estimate financing cost for import credit period.",
      defaultAmount: 3000000,
      defaultRate: 10,
      defaultTenureMonths: 6,
      minRate: 8,
      maxRate: 15,
      minTenure: 1,
      maxTenure: 12,
    },
    rates: tradeRates("8% – 13% p.a.", "LC opening 0.25% – 1.5%; commitment charges apply"),
    whatIs: {
      title: "What is Import Finance?",
      description:
        "Import finance helps businesses pay foreign suppliers on time while optimizing working capital and FX risk.",
      cards: [
        {
          title: "Supplier Confidence",
          description: "Timely payments strengthen supplier relationships.",
          icon: Globe,
        },
        {
          title: "LC Backed Security",
          description: "Documentary LC protects both importer and exporter.",
          icon: Shield,
        },
        {
          title: "Capital Goods Funding",
          description: "Buyer's credit for long tenor machinery imports.",
          icon: Factory,
        },
      ],
    },
    eligibility: [
      "Valid IEC and import track record",
      "Satisfactory financials and banking conduct",
      "Compliance with FEMA & RBI import regulations",
      "Acceptable supplier and shipment terms",
      "Margin / LC cash margin as per bank policy",
    ],
    documents: {
      left: [
        "IEC, PAN, GST & KYC",
        "Proforma invoice / import contract",
        "Bill of entry & customs documents (post shipment)",
        "Import LC application (bank format)",
      ],
      right: [
        "Financial statements & bank statements",
        "Insurance & shipping documents",
        "BOE past history for repeat importers",
        "FX hedge / forward details (if any)",
      ],
    },
    benefits: [
      "Supports raw material and capital goods imports",
      "Buyer's credit for competitive long-term rates",
      "Deferred payment aligned to sales cycle",
      "Reduced working capital blockage",
      "Guidance on LC clauses and margin optimization",
    ],
    faqs: [
      {
        q: "What is buyer's credit?",
        a: "Overseas loan to importer's bank for payment to foreign supplier, typically for capital goods with longer tenor.",
      },
      {
        q: "How much margin is needed for import LC?",
        a: "Typically 5%–25% depending on bank, commodity and customer relationship.",
      },
      {
        q: "Can SMEs get import finance?",
        a: "Yes, with IEC, track record and adequate security or LC margin.",
      },
      {
        q: "What is suppliers credit?",
        a: "Credit extended by overseas supplier; bank may add confirmation or discounting.",
      },
    ],
  },
  {
    slug: "lc-bg",
    productName: "LC / BG",
    seo: {
      title: "Letter of Credit & Bank Guarantee | Trade Finance | RupeeDial",
      description:
        "Arrange import/export LC, domestic LC, bank guarantees for tenders, performance, advance payment and financial BG with expert support.",
    },
    hero: {
      badge: "Non-Fund Based Facilities",
      title: "Letter of Credit (LC) & Bank Guarantee (BG)",
      description:
        "Secure domestic and international trade, tenders and contracts with LC and BG facilities from leading banks.",
      bullets: [
        "Import / export / inland LC issuance",
        "Performance, financial & advance BG",
        "Tender & contract compliance instruments",
        "Expert review of clauses & UCP 600 / URDG",
      ],
      ctaTitle: "Get LC or BG for Your Next Deal",
      ctaSubtitle: "Fast coordination with bank trade finance desks via RupeeDial.",
    },
    form: {
      title: "Apply for LC / Bank Guarantee",
      subtitle: "Share transaction or tender details for instrument structuring.",
      submitLabel: "Get LC / BG Assistance",
      successMessage:
        "Thank you! Our trade desk will help structure your LC or BG.",
      loanAmountPlaceholder: "LC / BG Amount (₹)*",
      extraFields: [
        {
          name: "instrumentType",
          placeholder: "Instrument Type",
          type: "select",
          options: [
            "Import LC",
            "Export LC",
            "Inland LC",
            "Performance BG",
            "Financial BG",
            "Advance Payment BG",
          ],
        },
        {
          name: "beneficiaryName",
          placeholder: "Beneficiary / Employer Name",
        },
        {
          name: "validityPeriod",
          placeholder: "Validity / Tenor (e.g. 12 months)",
        },
      ],
    },
    showEmiCalculator: false,
    emi: {
      subtitle: "",
      defaultAmount: 1000000,
      defaultRate: 0,
      defaultTenureMonths: 12,
      minRate: 0,
      maxRate: 1,
      minTenure: 1,
      maxTenure: 36,
    },
    rates: {
      note: "LC/BG are non-fund facilities. Charges include commission, SWIFT, handling and cash margin.",
      rows: [
        { label: "LC Opening Commission", value: "0.25% – 1.5% per quarter or part" },
        { label: "BG Commission", value: "0.50% – 2% p.a. on guarantee amount" },
        { label: "Cash Margin", value: "5% – 100% (based on risk & relationship)" },
        { label: "SWIFT / Handling", value: "₹1,500 – ₹5,000+ per transaction" },
        { label: "Validity Extension", value: "Additional commission on renewal" },
      ],
    },
    whatIs: {
      title: "What are LC and BG?",
      description:
        "A Letter of Credit is a payment undertaking for trade; a Bank Guarantee assures performance or financial obligation to a beneficiary.",
      cards: [
        {
          title: "Payment Assurance",
          description: "LC ensures seller payment on compliant documents.",
          icon: FileText,
        },
        {
          title: "Contract Security",
          description: "BG backs bids, performance and advance recovery.",
          icon: Shield,
        },
        {
          title: "Trade Confidence",
          description: "Enables deals with new domestic & global partners.",
          icon: Landmark,
        },
      ],
    },
    eligibility: [
      "Established relationship with bank or strong financials",
      "Clear underlying contract / trade transaction",
      "Acceptable margin or collateral as per bank",
      "Compliance with KYC, AML and trade regulations",
      "Limit availability under overall exposure cap",
    ],
    documents: {
      left: [
        "LC / BG application form",
        "Underlying contract / PO / tender copy",
        "PAN, GST, IEC (for trade LC)",
        "Board resolution / authorization",
      ],
      right: [
        "Financial statements & bank statements",
        "Margin FD / collateral documents",
        "Previous LC / BG track record",
        "Beneficiary bank details (SWIFT)",
      ],
    },
    benefits: [
      "Enables trade without full advance payment",
      "Required for government & PSU tenders",
      "Structured clauses reduce dispute risk",
      "Inland LC supports domestic supply chains",
      "RupeeDial negotiates margin with relationship banks",
    ],
    faqs: [
      {
        q: "What is the difference between LC and BG?",
        a: "LC is primarily for trade payments on documents; BG assures performance or financial obligation if applicant defaults.",
      },
      {
        q: "How much margin is blocked?",
        a: "Varies from 5% for prime clients to 100% for new or high-risk transactions.",
      },
      {
        q: "Can LC be cancelled easily?",
        a: "Irrevocable LC needs beneficiary consent for amendment/cancellation.",
      },
      {
        q: "How fast can LC be issued?",
        a: "Same day to 2 working days with complete docs and approved limits.",
      },
    ],
  },
  {
    slug: "invoice-financing",
    productName: "Invoice Financing",
    seo: {
      title: "Invoice Financing & Bill Discounting | MSME | RupeeDial",
      description:
        "Unlock cash tied in receivables with invoice discounting, factoring and supply chain finance from banks and NBFCs.",
    },
    hero: {
      badge: "Receivables Finance",
      title: "Invoice Financing for Faster Cash Flow",
      description:
        "Convert outstanding invoices from creditworthy buyers into immediate working capital through discounting and factoring facilities.",
      bullets: [
        "Invoice discounting with recourse / non-recourse",
        "Vendor financing & supply chain programs",
        "Digital onboarding with select fintech lenders",
        "Improve DSO without waiting for buyer payment",
      ],
      ctaTitle: "Unlock Cash from Your Invoices",
      ctaSubtitle: "Get invoice financing limits based on buyer quality and volumes.",
    },
    form: {
      title: "Apply for Invoice Financing",
      subtitle: "Share buyer and outstanding receivable details.",
      submitLabel: "Get Invoice Finance Offers",
      successMessage:
        "Thank you! Our team will evaluate your receivables profile.",
      loanAmountPlaceholder: "Receivables to Finance (₹)*",
      extraFields: [
        {
          name: "anchorBuyer",
          placeholder: "Main Buyer / Anchor Name",
        },
        {
          name: "averageDebtorDays",
          placeholder: "Average Debtor Days (e.g. 60)",
        },
        {
          name: "invoiceType",
          placeholder: "Invoice Type",
          type: "select",
          options: ["B2B Corporate", "Government / PSU", "Export Invoice"],
        },
      ],
    },
    emi: {
      subtitle: "Estimate financing cost for discounted invoice tenure.",
      defaultAmount: 2000000,
      defaultRate: 11,
      defaultTenureMonths: 3,
      minRate: 8,
      maxRate: 18,
      minTenure: 1,
      maxTenure: 6,
    },
    rates: tradeRates("8% – 16% p.a. (discounting rate)", "0.5% – 2% processing per drawdown"),
    whatIs: {
      title: "What is Invoice Financing?",
      description:
        "Businesses sell or pledge receivables to a financier at a discount to receive funds before the invoice due date.",
      cards: [
        {
          title: "Faster Liquidity",
          description: "Access up to 70–90% of invoice value upfront.",
          icon: Wallet,
        },
        {
          title: "Buyer Linked Limits",
          description: "Limits based on anchor buyer creditworthiness.",
          icon: Building2,
        },
        {
          title: "Scalable Facility",
          description: "Grow limit as invoicing volumes increase.",
          icon: TrendingUp,
        },
      ],
    },
    eligibility: [
      "B2B invoices to corporates, PSUs or approved anchors",
      "Minimum 6–12 months relationship with buyers",
      "Acceptable debtor days and collection history",
      "No major disputes on past invoices",
      "GST-compliant billing and e-invoicing where applicable",
    ],
    documents: {
      left: [
        "KYC & GST registration",
        "Sample invoices & PO copies",
        "Buyer master list with payment track record",
        "Ledger of outstanding receivables",
      ],
      right: [
        "12 months bank statements",
        "Financial statements",
        "Existing factoring / limit sanctions",
        "Buyer confirmation or no-objection (if required)",
      ],
    },
    benefits: [
      "Reduces dependence on buyer payment cycles",
      "No need to wait 60–120 days for cash",
      "Confidential discounting options available",
      "Supports MSME vendors in corporate supply chains",
      "Digital drawdown on approved invoices",
    ],
    faqs: [
      {
        q: "Is invoice financing same as factoring?",
        a: "Factoring may include collection service; discounting is often silent and recourse-based.",
      },
      {
        q: "Will buyers know about financing?",
        a: "In notified factoring they may; in confidential discounting, buyer may not be informed.",
      },
      {
        q: "What percentage of invoice is funded?",
        a: "Typically 70%–90% depending on buyer rating and financier policy.",
      },
      {
        q: "Can government invoices be financed?",
        a: "Yes, with specialized programs subject to assignment rules and payment security.",
      },
    ],
  },
  {
    slug: "cash-credit",
    productName: "Cash Credit (CC)",
    seo: {
      title: "Cash Credit Limit for Business | CC Account | RupeeDial",
      description:
        "Apply for cash credit limit against stock and book debts. Revolving working capital facility for traders and manufacturers.",
    },
    hero: {
      badge: "Revolving Working Capital",
      title: "Cash Credit (CC) Limit for Your Business",
      description:
        "A flexible revolving limit to draw funds for inventory and receivables, with interest charged only on utilized amount.",
      bullets: [
        "Limit linked to stock & book debt statement",
        "Renewable annually with stock audit",
        "Ideal for traders, distributors & manufacturers",
        "Competitive pricing from multiple banks",
      ],
      ctaTitle: "Get Your CC Limit Sanctioned",
      ctaSubtitle: "Compare cash credit offers and stock drawing power norms.",
    },
    form: {
      title: "Apply for Cash Credit Limit",
      subtitle: "Share stock, debtors and turnover for limit assessment.",
      submitLabel: "Get CC Limit Assistance",
      successMessage:
        "Thank you! Our working capital expert will contact you for CC sanction.",
      loanAmountPlaceholder: "CC Limit Required (₹)*",
      extraFields: [
        {
          name: "stockValue",
          placeholder: "Average Stock Value (₹)",
        },
        {
          name: "debtorsValue",
          placeholder: "Average Debtors (₹)",
        },
        {
          name: "businessType",
          placeholder: "Business Type",
          type: "select",
          options: ["Trading", "Manufacturing", "Distribution", "Services"],
        },
      ],
    },
    emi: {
      subtitle: "Interest on CC is charged on daily utilized balance (indicative calculator).",
      defaultAmount: 3000000,
      defaultRate: 10.5,
      defaultTenureMonths: 12,
      minRate: 9,
      maxRate: 16,
      minTenure: 1,
      maxTenure: 12,
    },
    rates: {
      note: "CC is a demand facility. Interest is calculated on daily debit balance; stock audit determines drawing power.",
      rows: [
        { label: "Interest Rate", value: "EBLR / MCLR + 1% – 4% spread" },
        { label: "Drawing Power", value: "Typically 60% on stock + 40% on debtors (bank wise)" },
        { label: "Processing Fee", value: "0.5% – 1% of limit" },
        { label: "Stock Audit", value: "Quarterly / half-yearly (charges apply)" },
        { label: "Renewal", value: "Annual review with enhanced limits possible" },
      ],
    },
    whatIs: {
      title: "What is Cash Credit?",
      description:
        "Cash credit is a short-term revolving facility where the borrower withdraws funds up to the sanctioned drawing power against current assets.",
      cards: [
        {
          title: "Pay Interest on Usage",
          description: "Interest applies only on amount drawn, not full limit.",
          icon: Wallet,
        },
        {
          title: "Inventory Linked",
          description: "Limit moves with stock and receivable levels.",
          icon: Package,
        },
        {
          title: "Continuous Operations",
          description: "Ideal for businesses with rolling working capital needs.",
          icon: TrendingUp,
        },
      ],
    },
    eligibility: [
      "Minimum 2–3 years business operations",
      "Regular stock, debtors & creditors statements",
      "Satisfactory banking and GST turnover",
      "Stock insurance where required by bank",
      "Primary security over current assets",
    ],
    documents: {
      left: [
        "KYC, PAN, GST & incorporation docs",
        "Stock & book debt statement (monthly)",
        "Insurance on hypothecated stock",
        "Property docs if collateral additionally offered",
      ],
      right: [
        "12 months bank statements",
        "ITR & financials (2–3 years)",
        "Creditors list & purchase records",
        "Existing CC / limit sanction (if takeover)",
      ],
    },
    benefits: [
      "Flexible withdrawals and repayments within DP",
      "Lower cost vs fixed term loan for short cycles",
      "Enhancement possible with business growth",
      "Can run alongside term loans for capex",
      "RupeeDial helps with stock statement formats",
    ],
    faqs: [
      {
        q: "How is drawing power calculated?",
        a: "Banks apply margin on stock and book debts per industry — e.g. 25% margin on stock means 75% DP.",
      },
      {
        q: "Is CC better than overdraft?",
        a: "CC suits inventory-heavy businesses; OD may suit service firms with simpler banking.",
      },
      {
        q: "What happens if stock audit fails?",
        a: "Drawing power may reduce until position improves or additional security is provided.",
      },
      {
        q: "Can I switch CC from one bank to another?",
        a: "Yes, takeover / enhancement is common with proper documentation.",
      },
    ],
  },
  {
    slug: "overdraft",
    productName: "Overdraft (OD)",
    seo: {
      title: "Overdraft Facility for Business | OD Against Property & FD | RupeeDial",
      description:
        "Business overdraft against property, FD, securities or clean OD for MSMEs. Pay interest only on amount used.",
    },
    hero: {
      badge: "Flexible Overdraft",
      title: "Overdraft (OD) Facility for Businesses",
      description:
        "Access a pre-approved overdraft limit and withdraw funds as needed — interest charged only on the daily outstanding balance.",
      bullets: [
        "OD against property, FD, LIC, securities",
        "Clean OD for select high-rated MSMEs",
        "Instant fund access within sanctioned limit",
        "Suitable for seasonal & variable expenses",
      ],
      ctaTitle: "Get Flexible Overdraft Limit",
      ctaSubtitle: "Compare OD against collateral and clean overdraft options.",
    },
    form: {
      title: "Apply for Overdraft Facility",
      subtitle: "Tell us collateral type and limit required.",
      submitLabel: "Get OD Facility Assistance",
      successMessage:
        "Thank you! Our team will suggest suitable overdraft structures.",
      loanAmountPlaceholder: "OD Limit Required (₹)*",
      extraFields: [
        {
          name: "collateralType",
          placeholder: "Collateral Type",
          type: "select",
          options: [
            "Property",
            "Fixed Deposit",
            "Securities / MF",
            "Clean OD (no collateral)",
            "Other",
          ],
        },
        {
          name: "propertyValue",
          placeholder: "Collateral / Property Value (₹)",
        },
        {
          name: "existingBank",
          placeholder: "Existing Bank (if any)",
        },
      ],
    },
    emi: {
      subtitle: "Indicative interest on average OD utilization for 12 months.",
      defaultAmount: 2000000,
      defaultRate: 11,
      defaultTenureMonths: 12,
      minRate: 9,
      maxRate: 18,
      minTenure: 1,
      maxTenure: 12,
    },
    rates: {
      note: "OD rates depend on collateral type. Secured OD against FD is cheapest; clean OD carries higher spread.",
      rows: [
        { label: "OD against FD / LIC", value: "FD rate + 1% – 2%" },
        { label: "OD against Property", value: "9% – 13% p.a." },
        { label: "Clean / Cash Credit OD", value: "11% – 18% p.a." },
        { label: "Processing Fee", value: "0.25% – 1% of limit" },
        { label: "Renewal", value: "Annual — linked to collateral validity" },
      ],
    },
    whatIs: {
      title: "What is an Overdraft?",
      description:
        "Overdraft allows account holders to withdraw more than their balance up to a sanctioned limit, with flexible repayment.",
      cards: [
        {
          title: "On-Demand Liquidity",
          description: "Withdraw anytime within limit without new application.",
          icon: Wallet,
        },
        {
          title: "Collateral Options",
          description: "Property, FD and securities reduce interest cost.",
          icon: Landmark,
        },
        {
          title: "Interest Savings",
          description: "Repay when cash flows in — reduces interest burden.",
          icon: IndianRupee,
        },
      ],
    },
    eligibility: [
      "For secured OD: clear title collateral with adequate value",
      "For clean OD: strong turnover, banking and CIBIL scores",
      "Existing account relationship preferred",
      "Acceptable debt service coverage",
      "Legal & technical verification for property OD",
    ],
    documents: {
      left: [
        "KYC of applicant & business",
        "Collateral documents (FD receipt, property papers)",
        "Valuation report for property OD",
        "Income / ITR proof",
      ],
      right: [
        "12 months bank statements",
        "Existing loan statements",
        "Business registration & GST",
        "Insurance of mortgaged property",
      ],
    },
    benefits: [
      "Highly flexible compared to term loans",
      "Lower paperwork for renewal vs new loans",
      "Can be linked to current account for auto sweep",
      "Top-up when collateral value rises",
      "Balance transfer from high-cost OD",
    ],
    faqs: [
      {
        q: "OD vs Cash Credit — which is better?",
        a: "OD suits collateral-backed or relationship limits; CC suits stock-heavy trading businesses.",
      },
      {
        q: "Can OD limit be increased?",
        a: "Yes, with enhanced collateral value or improved financials.",
      },
      {
        q: "Is there a minimum utilization charge?",
        a: "Some banks levy commitment charges if utilization is below threshold.",
      },
      {
        q: "What if cheque bounces in OD?",
        a: "Charges apply and repeated defaults may affect renewal.",
      },
    ],
  },
];

export const loanProductRoutes = additionalLoanProducts.map((config) => ({
  path: `/${config.slug}`,
  config,
}));

// src/pages/CreditCards.tsx
import React, { useEffect, useRef, useState } from "react";
import credit from "../assets/images/creditcard.png";
import pnb from "../assets/images/pnb.png";
import sbi from "../assets/images/sbi.png";
import axis from "../assets/images/axis.png";
import hdfc from "../assets/images/hdfc.png";
import idbi from "../assets/images/idbi.png";

import sbisave from "../assets/images/sbi-save.webp";

import tataneu from "../assets/images/tatat-neu.webp";
import american from "../assets/images/american.webp";
import hdfcdinner from "../assets/images/hdfc-dinner.webp";
import axisbank from "../assets/images/axis-bank.webp";
import vistra from "../assets/images/club-vistra.webp";
import idfcfirst from "../assets/images/idfc-first.webp";
import sbisimply from "../assets/images/sbi-simply.webp";
import ifdcbank from "../assets/images/idfc-firstbank.webp";
import amazonpay from "../assets/images/amazon-pay.webp";
import axisreserve from "../assets/images/axis-reserve.webp";
import axisace from "../assets/images/axis-ace.webp";
import platinum from "../assets/images/american-platinam.webp";

// ✅ TYPE
type Card = {
  id: number;
  name: string;
  image: string;
  rating: number;
  type: string;
  bestFor: string;
  rewardRate: string;
  joiningFee: string;
  annualFee: string;
  apr: string;
  url: string;
};

const cards: Card[] = [
  {
    id: 1,
    name: "SBI Cashback Credit Card",
    image: sbisave,
    rating: 4.8,
    type: "Cashback",
    bestFor: "Cashback",
    rewardRate: "1% to 5%",
    joiningFee: "₹999",
    annualFee: "₹999",
    apr: "45%",
    url: "/credit-card/sbi-cashback",
  },
  {
    id: 2,
    name: "Tata Neu Infinity HDFC Bank",
    image: tataneu,
    rating: 4.7,
    type: "Co-Branded",
    bestFor: "Reward Points",
    rewardRate: "1% to 5%",
    joiningFee: "₹1,499",
    annualFee: "₹1,499",
    apr: "41.88%",
    url: "/credit-card/tata-neu-infinity",
  },
  {
    id: 3,
    name: "American Express SmartEarn",
    image: american,
    rating: 4.5,
    type: "Premium",
    bestFor: "Rewards",
    rewardRate: "1% to 10%",
    joiningFee: "₹495",
    annualFee: "₹495",
    apr: "42%",
    url: "/credit-card/amex-smartearn",
  },
  {
    id: 4,
    name: "HDFC Diners Club Metal Edition",
    image: hdfcdinner,
    rating: 4.5,
    type: "Premium",
    bestFor: "Reward Points",
    rewardRate: "3.3% to 33%",
    joiningFee: "₹10,000",
    annualFee: "₹10,000",
    apr: "23.88%",
    url: "/credit-card/hdfc-diners-metal",
  },
  {
    id: 5,
    name: "Axis Bank MyZone",
    image: axisbank,
    rating: 4.5,
    type: "Regular",
    bestFor: "Lifestyle",
    rewardRate: "0.4%",
    joiningFee: "₹500",
    annualFee: "₹500",
    apr: "52.86%",
    url: "/credit-card/axis-myzone",
  },
  {
    id: 6,
    name: "Club Vistara IDFC FIRST Bank",
    image: vistra,
    rating: 4.8,
    type: "Co-Branded",
    bestFor: "Travel",
    rewardRate: "0.8% to 4%",
    joiningFee: "₹4,999",
    annualFee: "₹4,999",
    apr: "42%",
    url: "/credit-card/idfc-vistara",
  },
  {
    id: 7,
    name: "IDFC FIRST Bank Select",
    image: idfcfirst,
    rating: 4.8,
    type: "Regular",
    bestFor: "Lifestyle",
    rewardRate: "0.2% to 1.6%",
    joiningFee: "Free",
    annualFee: "Free",
    apr: "42%",
    url: "/credit-card/idfc-select",
  },
  {
    id: 8,
    name: "SBI SimplyCLICK",
    image: sbisimply,
    rating: 4.7,
    type: "Regular",
    bestFor: "Rewards",
    rewardRate: "0.25% to 2.5%",
    joiningFee: "₹499",
    annualFee: "₹499",
    apr: "42%",
    url: "/credit-card/sbi-simplyclick",
  },
  {
    id: 9,
    name: "IDFC FIRST Bank WOW",
    image: ifdcbank,
    rating: 4.7,
    type: "Regular",
    bestFor: "Students",
    rewardRate: "0.67%",
    joiningFee: "Free",
    annualFee: "Free",
    apr: "42%",
    url: "/credit-card/idfc-wow",
  },
  {
    id: 10,
    name: "Amazon Pay ICICI Bank",
    image: amazonpay,
    rating: 4.7,
    type: "Co-Branded",
    bestFor: "Cashback",
    rewardRate: "1% to 5%",
    joiningFee: "Free",
    annualFee: "Free",
    apr: "42%",
    url: "/credit-card/amazon-pay-icici",
  },
  {
    id: 11,
    name: "Axis Bank Reserve",
    image: axisreserve,
    rating: 4.7,
    type: "Premium",
    bestFor: "Lifestyle",
    rewardRate: "1.5% to 3%",
    joiningFee: "₹50,000",
    annualFee: "₹50,000",
    apr: "42.58%",
    url: "/credit-card/axis-reserve",
  },
  {
    id: 12,
    name: "Axis Bank Ace",
    image: axisace,
    rating: 4.6,
    type: "Regular",
    bestFor: "Cashback",
    rewardRate: "2% to 5%",
    joiningFee: "₹499",
    annualFee: "₹499",
    apr: "52.86%",
    url: "/credit-card/axis-ace",
  },
  {
    id: 13,
    name: "American Express Platinum",
    image: platinum,
    rating: 4.6,
    type: "Premium",
    bestFor: "Lifestyle",
    rewardRate: "1.25% to 2.5%",
    joiningFee: "₹60,000",
    annualFee: "₹60,000",
    apr: "42%",
    url: "/credit-card/amex-platinum",
  },
];


type FormState = {
  name: string;
  mobile: string;
  email: string;
  dob: string;
  income: number | "";
  gender?: "Male" | "Female" | "Other";
};

type Offer = {
  id: string;
  bank: string;
  card: string;
  preApproved: boolean;
  eligibility: number;
};
type SubmissionState =
  | "IDLE"
  | "PENDING"
  | "SUCCESS"
  | "APPROVED"
  | "PRE_APPROVED"
  | "DECLINED"
  | "ERROR";

type SubmissionResult = {
  offerId: string;
  bank: string;
  card: string;
  status: SubmissionState;
  message?: string;
};

type SubmissionLogEntry = {
  application: FormState & { submittedAt: string };
  results: SubmissionResult[];
  timestamp: string;
};

const BANK_LOGOS = [pnb, sbi, axis, idbi, hdfc];

const SAMPLE_CARDS = [
  {
    id: "rewards",
    title: "Rupeedial Rewards Card",
    tagline: "High rewards across everyday spends",
    fee: "₹199/yr",
    perks: [
      "5% rewards on groceries",
      "Dining & travel bonuses",
      "Welcome voucher",
    ],
    accentFrom: "#7dd3fc",
    accentTo: "#60a5fa",
  },
  {
    id: "cashback",
    title: "Rupeedial Cashback Card",
    tagline: "Flat cashback with flexible EMI",
    fee: "₹0 first year",
    perks: ["2% cashback sitewide", "Fuel savings", "No-cost EMI options"],
    accentFrom: "#bbf7d0",
    accentTo: "#86efac",
  },
  {
    id: "travel",
    title: "Rupeedial Travel Card",
    tagline: "Miles, lounges & travel protection",
    fee: "₹499/yr",
    perks: ["Airport lounge access", "Airline miles", "Travel insurance"],
    accentFrom: "#fbcfe8",
    accentTo: "#f472b6",
  },
];

const CreditCards: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    income: "",
    gender: undefined,
  });

  const [errors, setErrors] =
    useState<Partial<Record<keyof FormState, string>>>({});
  const [step, setStep] = useState<number>(1);
  const [offers, setOffers] = useState<Offer[] | null>(null);

  const [selectedOfferIds, setSelectedOfferIds] = useState<
    Record<string, boolean>
  >({});
  const [submissionStatuses, setSubmissionStatuses] = useState<
    Record<string, SubmissionState>
  >({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const [submitModalOpen, setSubmitModalOpen] = useState<boolean>(false);
  const [submissionLog, setSubmissionLog] = useState<SubmissionLogEntry[]>([]);

  const logoRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = logoRef.current;
    if (!el) return;
    let rafId = 0;
    let pos = 0;
    const speed = 0.45;
    const loop = () => {
      pos += speed;
      if (pos > el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((e) => ({ ...e, [k]: "" }));
  };

  const validateStep1 = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.name || form.name.trim().length < 2)
      e.name = "Please enter your full name.";
    if (!/^[6-9]\d{9}$/.test(String(form.mobile)))
      e.mobile = "Enter a valid 10-digit mobile number.";
    if (!/^\S+@\S+\.\S+$/.test(String(form.email)))
      e.email = "Enter a valid email address.";
    if (!form.dob) e.dob = "Enter your date of birth.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    const incomeNum = Number(form.income || 0);
   if (!incomeNum || incomeNum <= 0) {
  e.income = "Enter your monthly income.";
} else if (incomeNum < 15000) {
  e.income = "Minimum income should be ₹15,000";
}
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onProceed = (): void => {
    if (step === 1) {
      if (!validateStep1()) return;
      setStep(2);
      setTimeout(
        () =>
          document
            .getElementById("income-section")
            ?.scrollIntoView({ behavior: "smooth", block: "center" }),
        120
      );
    } else if (step === 2) {
      if (!validateStep2()) return;
      const eligibility = Math.round(Number(form.income || 0) * 12 * 0.45);
      const generated: Offer[] = [
        {
          id: "offer-1",
          bank: "HDFC Bank",
          card: "HDFC Millennia",
          preApproved: eligibility > 100000,
          eligibility,
        },
        {
          id: "offer-2",
          bank: "ICICI Bank",
          card: "ICICI Platinum",
          preApproved: eligibility > 60000,
          eligibility: Math.round(eligibility * 0.9),
        },
        {
          id: "offer-3",
          bank: "Axis Bank",
          card: "Axis Ace",
          preApproved: eligibility > 40000,
          eligibility: Math.round(eligibility * 0.8),
        },
      ];
      setOffers(generated);

      const defaultSelection: Record<string, boolean> = {};
      generated.forEach((o) => (defaultSelection[o.id] = !!o.preApproved));
      setSelectedOfferIds(defaultSelection);

      setStep(3);
      setTimeout(
        () =>
          document
            .getElementById("offers-section")
            ?.scrollIntoView({ behavior: "smooth", block: "center" }),
        140
      );
    }
  };

  // Offer selection helper
  const toggleOfferSelection = (id: string): void => {
    setSelectedOfferIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // image onError handler
  const handleImgError = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    e.currentTarget.src = credit;
  };

  // Simulated API call
// ✅ REAL BACKEND API CALL
const submitToBankApi = async (): Promise<{
  status: SubmissionState;
  leadId: string;
}> => {
  const formData = new FormData();

  formData.append(
    "cardDetails",
    JSON.stringify({
      name: form.name,
      mobile: form.mobile,
      email: form.email,
      dob: form.dob,
      income: form.income,
      gender: form.gender,
    })
  );

  formData.append(
    "selectedBanks",
    JSON.stringify(
      offers
        ?.filter(o => selectedOfferIds[o.id])
        .map(o => ({
          bankName: o.bank,
          cardName: o.card
        }))
    )
  );

  const res = await fetch(
    "https://rupeedial.com/rupeedial-backend/public/index.php?action=credit-card/apply",
    { method: "POST", body: formData }
  );

  const data = await res.json();

  if (!data.success) {
    throw new Error(data.message || "Submission failed");
  }

  return {
    status: "SUCCESS",
    leadId: data.leadId,
  };
};



const submitSelectedOffers = async (): Promise<void> => {
  if (!offers) return;
  if (isSubmitting) return; // 🔒 duplicate submit protection


  const selected = offers.filter(o => selectedOfferIds[o.id]);

  if (selected.length === 0) {
    alert("Please select at least one offer");
    return;
  }

  setSubmitModalOpen(false);
  setIsSubmitting(true);

  // sabko pending dikhao
  const pending: Record<string, SubmissionState> = {};
  selected.forEach(o => (pending[o.id] = "PENDING"));
  setSubmissionStatuses(pending);

  try {
    const res = await submitToBankApi(); // ✅ SINGLE API CALL
setLeadId(res.leadId); 

    // ✅ API success → sabko SUCCESS
    const successStatuses: Record<string, SubmissionState> = {};
    selected.forEach(o => (successStatuses[o.id] = "SUCCESS"));
    setSubmissionStatuses(successStatuses);

    // ✅ DIRECT SUCCESS SCREEN
    setStep(5);

    setTimeout(() => {
      window.location.href = "/";
    }, 3000);

  } catch {
    // ❌ API failed
    const errorStatuses: Record<string, SubmissionState> = {};
    selected.forEach(o => (errorStatuses[o.id] = "ERROR"));
    setSubmissionStatuses(errorStatuses);

    setStep(4);
  } finally {
    setIsSubmitting(false);
  }
};



  const resetFlow = (): void => {
    setForm({
      name: "",
      mobile: "",
      email: "",
      dob: "",
      income: "",
      gender: undefined,
    });
    setErrors({});
    setStep(1);
    setOffers(null);
    setSelectedOfferIds({});
    setSubmissionStatuses({});
    setSubmissionLog([]);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onProceed();
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 pt-10 pb-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-8 md:p-12">
            <div>
              <p className="inline-flex items-center gap-3 text-sm font-medium text-green-700 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Pre-approved Offers
                </span>
                <span className="text-slate-500">
                  Instant check — no hard pull
                </span>
              </p>

              <h1 className="text-3xl md:text-4xl font-extrabold text-[#0b5c0b] mb-4">
                Compare & Apply{" "}
                <span className="text-sky-600">Credit Cards</span> Online
              </h1>

              <p className="text-slate-600 max-w-xl leading-relaxed">
                Fill one simple form and get matched to multiple cards from top
                banks. See pre-qualified offers before you apply — quick, secure
                and transparent.
              </p>

              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  className="bg-[#0b5c0b] hover:bg-[#084f08] text-white px-5 py-3 rounded-md shadow"
                  onClick={() =>
                    document
                      .getElementById("eligibility-card")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                  }
                >
                  Check Eligibility
                </button>

                <button
                  type="button"
                  className="bg-white border border-slate-200 text-[#0b5c0b] px-4 py-3 rounded-md"
                  onClick={() =>
                    document
                      .getElementById("cards-section")
                      ?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                  }
                >
                  View Cards
                </button>
              </div>
            </div>

            <div className="flex justify-center md:justify-end">
              <img
                src={credit}
                alt="Credit illustration"
                loading="lazy"
                className="w-72 md:w-[420px] object-contain"
                onError={handleImgError}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Eligibility card */}
      <section
        id="eligibility-card"
        className="max-w-3xl mx-auto px-4 mt-10 -mt-10"
      >
        <article className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#0b5c0b]">
                Quick Eligibility Check
              </h2>
              <p className="text-sm text-slate-600">
                Complete 2 simple steps — instant results
              </p>
            </div>
            <div className="text-sm text-slate-500">Step {step} of 4</div>
          </div>

          <div className="w-full bg-slate-100 h-3 rounded-full mb-6">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-[#34D399] to-[#0ea5e9]"
              style={{
                width:
                  step === 1 ? "25%" : step === 2 ? "50%" : step === 3
                  ? "75%"
                  : "100%",
              }}
            />
          </div>

          <form onSubmit={handleFormSubmit} aria-labelledby="eligibility-heading">
            {step <= 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {step === 1 && (
                  <>
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Full name
                      </label>
                      <input
                        id="name"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        className="mt-2 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                        placeholder="As on ID"
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="mobile"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Mobile number
                      </label>
                      <input
                        id="mobile"
                        value={form.mobile}
                        onChange={(e) => update("mobile", e.target.value)}
                        className="mt-2 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                        placeholder="10-digit mobile"
                        inputMode="numeric"
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Email address
                      </label>
                      <input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => update("email", e.target.value)}
                        className="mt-2 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                        placeholder="name@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="dob"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Date of birth
                      </label>
                      <input
                        id="dob"
                        type="date"
                        value={form.dob}
                        onChange={(e) => update("dob", e.target.value)}
                        className="mt-2 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                      />
                      {errors.dob && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.dob}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {step === 2 && (
                  <>
                    <div id="income-section">
                      <label
                        htmlFor="income"
                        className="block text-sm font-medium text-slate-700"
                      >
                        Net monthly income (₹)
                      </label>
                      <input
                        id="income"
                        value={String(form.income || "")}
                        onChange={(e) =>
                          update(
                            "income",
                            e.target.value === ""
                              ? ""
                              : Number(e.target.value)
                          )
                        }
                        className="mt-2 block w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-sky-200"
                        inputMode="numeric"
                        placeholder="e.g. 45000"
                      />
                      {errors.income && (
                        <p className="mt-1 text-xs text-red-600">
                          {errors.income}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700">
                        Gender (optional)
                      </label>
                      <div className="mt-2 flex gap-2">
                        {(
                          ["Male", "Female", "Other"] as FormState["gender"][]
                        ).map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => update("gender", g)}
                            className={`px-3 py-2 border rounded-md ${
                              form.gender === g
                                ? "bg-green-50 border-green-300"
                                : ""
                            }`}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2 text-sm text-slate-600">
                      <strong>Privacy:</strong> Soft pre-qualification — no
                      credit score impact. Data is encrypted.
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3: offers */}
            {step === 3 && offers && (
              <div id="offers-section">
                <p className="text-sm text-slate-600 mb-3">
                  Select offers you want to submit. You can choose multiple
                  banks.
                </p>
  {/* ✅ ADD THIS LINE HERE */}
    <p className="text-xs text-slate-500 mb-2">
      You may select multiple banks. Final approval depends on bank verification.
    </p>
                <div className="space-y-3 mb-4">
                  {offers.map((o: Offer) => (
                    <div
                      key={o.id}
                      className="flex items-center justify-between border rounded-md p-4 bg-white"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            BANK_LOGOS[
                              Math.abs(o.bank.length) % BANK_LOGOS.length
                            ]
                          }
                          alt={o.bank}
                          className="h-10 object-contain"
                          loading="lazy"
                          onError={handleImgError}
                        />
                        <div>
                          <div className="font-semibold">
                            {o.bank} —{" "}
                            <span className="text-sm text-slate-500">
                              {o.card}
                            </span>
                          </div>
                          <div className="text-xs text-slate-500">
                            {o.preApproved ? "Pre-approved (Indicative)" : "Eligibility Based"}

                          </div>
                          <div className="text-xs text-slate-600">
                            Eligible approx ₹
                            {Number(o.eligibility || 0).toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <label className="inline-flex items-center">
                          <input
                            type="checkbox"
                            checked={!!selectedOfferIds[o.id]}
                            onChange={() => toggleOfferSelection(o.id)}
                            className="h-5 w-5"
                          />
                        </label>
                        <button
                          className="px-3 py-2 rounded-md bg-[#0b5c0b] text-white"
                          onClick={() => {
                            setSelectedOfferIds({ [o.id]: true });
                            setSubmitModalOpen(true);
                          }}
                        >
                          Apply to this bank
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="px-4 py-2 border rounded-md"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmitModalOpen(true)}
                    className="ml-auto px-6 py-3 rounded-md bg-[#0b5c0b] text-white shadow"
                    disabled={isSubmitting}
                  >
                    Submit to Selected Banks
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: results */}
            {step === 4 && (
              <div id="results-section" className="space-y-4">
                <p className="text-sm text-slate-600">
                  Submission results. You can view individual bank decisions
                  below.
                </p>

                <div className="space-y-3">
                  {offers &&
  offers
    .filter((o) => selectedOfferIds[o.id]) // ✅ ONLY SELECTED BANKS
    .map((o: Offer) => {
      const status = submissionStatuses[o.id] || "PENDING";

                      return (
                        <div
                          key={o.id}
                          className="flex items-center justify-between border rounded-md p-4 bg-white"
                        >
                          <div>
                            <div className="font-semibold">
                              {o.bank} —{" "}
                              <span className="text-sm text-slate-500">
                                {o.card}
                              </span>
                            </div>
                            <div className="text-xs text-slate-500">
                              Eligibility approx ₹
                              {Number(o.eligibility || 0).toLocaleString()}
                            </div>
                          </div>
                          <div className="text-sm">
                            <span
                              className={`px-3 py-1 rounded-full text-white ${
                                status === "PENDING"
                                  ? "bg-yellow-500"
                                  : status === "APPROVED"
                                  ? "bg-green-600"
                                  : status === "SUCCESS"
                                  ? "bg-sky-600"
                                  : status === "DECLINED"
                                  ? "bg-red-600"
                                  : "bg-gray-500"
                              }`}
                            >
                              {status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2 border rounded-md"
                  >
                    Back to offers
                  </button>
                  <button
                    onClick={() => resetFlow()}
                    className="ml-auto px-4 py-2 rounded-md bg-[#0b5c0b] text-white"
                  >
                    Start new application
                  </button>
                </div>
              </div>
            )}
{/* STEP 5: SUCCESS */}
{step === 5 && (
  <div className="text-center py-10">
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
      <svg
        className="w-10 h-10 text-green-600"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 13l4 4L19 7"
        />
      </svg>
    </div>

    <h2 className="text-2xl font-bold text-green-700 mb-2">
      Application Successful 🎉
    </h2>

    <p className="text-slate-600 mb-2">
  Your credit card application has been successfully submitted.
</p>

{leadId && (
  <p className="text-sm text-slate-500">
    Reference ID: <strong>{leadId}</strong>
  </p>
)}


    <p className="text-sm text-slate-500">
      Redirecting to home page...
    </p>
  </div>
)}

            <div className="mt-6 flex items-center gap-3">
              {step > 1 && step < 3 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  className="px-4 py-2 border rounded-md"
                >
                  Back
                </button>
              )}

              {step < 3 && (
                <button
                  type="submit"
                  className="ml-auto px-6 py-3 rounded-md bg-[#0b5c0b] text-white shadow hover:bg-[#084f08]"
                >
                  {step === 1 ? "Proceed" : "Show Offers"}
                </button>
              )}
            </div>
          </form>
        </article>
      </section>

     <main className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">
          All Credit Cards in India
        </h1>

        <div className="space-y-4">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center"
            >
              {/* IMAGE */}
              <div className="w-full md:w-1/6 text-center">
                <img
                  src={card.image}
                  alt={card.name}
                  className="mx-auto h-28 object-contain"
                />
              </div>

              {/* INFO */}
              <div className="w-full md:w-4/6 px-4">
                <h2 className="text-lg font-semibold">{card.name}</h2>

                <div className="text-yellow-500 text-sm mb-1">
                  ★★★★★ <span className="text-slate-500">({card.rating})</span>
                </div>

                <div className="flex flex-wrap gap-2 text-xs mb-2">
                  <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                    {card.type}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Best for {card.bestFor}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-slate-600">
                  <div>
                    Reward Rate
                    <div className="font-semibold">{card.rewardRate}</div>
                  </div>
                  <div>
                    Joining Fee
                    <div className="font-semibold">{card.joiningFee}</div>
                  </div>
                  <div>
                    Annual Fee
                    <div className="font-semibold">{card.annualFee}</div>
                  </div>
                  <div>
                    APR
                    <div className="font-semibold">{card.apr}</div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="w-full md:w-1/6 text-center mt-4 md:mt-0">
                <a
                  href={card.url}
                  className="inline-block bg-[#0b5c0b] text-white px-4 py-2 rounded-md"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
      {/* Cards showcase */}
      <section
        id="cards-section"
        className="max-w-7xl mx-auto px-4 py-12"
      >
        <h3 className="text-2xl font-bold text-[#0b5c0b] mb-6 text-center">
          Popular Cards — Compare Benefits
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {SAMPLE_CARDS.map((c) => (
            <article
              key={c.id}
              className="bg-white rounded-xl shadow p-6 flex flex-col"
            >
              <div
                className="inline-block px-3 py-2 rounded text-white font-semibold mb-4"
                style={{
                  background: `linear-gradient(90deg, ${c.accentFrom}, ${c.accentTo})`,
                }}
              >
                {c.title.split(" ")[1]}
              </div>
              <h4 className="text-lg font-semibold mb-1">{c.title}</h4>
              <p className="text-sm text-slate-600 mb-4">{c.tagline}</p>
              <ul className="text-sm text-slate-700 mb-4 space-y-2 flex-1">
                {c.perks.map((p, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 mt-1 text-green-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Starting {c.fee}
                </div>
                <div className="flex gap-2">
                  <button className="border px-3 py-2 rounded-md text-slate-700">
                    Details
                  </button>
                  <button className="bg-[#0b5c0b] text-white px-3 py-2 rounded-md">
                    Apply
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits & FAQ */}
      <section className="max-w-7xl mx-auto px-4 pb-20 space-y-6">
        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-xl font-bold text-[#0b5c0b] mb-4">
            Why Rupeedial for Cards?
          </h4>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#34D399] to-[#60a5fa] text-white flex items-center justify-center font-semibold">
                Q
              </div>
              <div>
                <div className="font-semibold">Quick pre-qualification</div>
                <div className="text-sm text-slate-600">
                  Soft checks give a pre-qualified shortlist instantly.
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0b5c0b] text-white flex items-center justify-center font-semibold">
                C
              </div>
              <div>
                <div className="font-semibold">Compare & choose</div>
                <div className="text-sm text-slate-600">
                  Side-by-side comparison of fees, rewards and benefits.
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-[#0ea5e9] text-white flex items-center justify-center font-semibold">
                S
              </div>
              <div>
                <div className="font-semibold">Secure process</div>
                <div className="text-sm text-slate-600">
                  Bank-grade encryption and minimal data collection.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h4 className="text-lg font-bold text-[#0b5c0b] mb-3">
            Frequently asked questions
          </h4>
          <div className="space-y-3">
            <details className="p-4 border rounded-md">
              <summary className="font-medium cursor-pointer">
                Does eligibility check affect my credit score?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                No — pre-qualification is a soft inquiry and does not impact
                your credit score.
              </p>
            </details>

            <details className="p-4 border rounded-md">
              <summary className="font-medium cursor-pointer">
                What documents are typically required?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                PAN, Aadhaar, last 3 months bank statements, and income proof
                for some cards.
              </p>
            </details>

            <details className="p-4 border rounded-md">
              <summary className="font-medium cursor-pointer">
                How long does final approval take?
              </summary>
              <p className="mt-2 text-sm text-slate-600">
                Final approval depends on bank verification — typically 1–7
                business days.
              </p>
            </details>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 pb-12 text-center text-xs text-slate-500">
        <div className="inline-block bg-white px-3 py-2 rounded-md shadow">
          *Pre-qualified offers are indicative. Final decision rests with
          issuing bank.
        </div>
      </div>

      {/* Confirmation modal */}
      {submitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-lg w-full p-6">
            <h3 className="text-lg font-bold mb-2">Confirm submission</h3>
            <p className="text-sm text-slate-600 mb-4">
              You're about to submit your application to the selected banks.
              This will start the application process with each bank and show
              instant results if available.
            </p>

            <div className="mb-4">
              <strong>Selected banks:</strong>
              <ul className="mt-2 ml-4 list-disc">
                {offers &&
                  offers
                    .filter((o) => selectedOfferIds[o.id])
                    .map((o) => (
                      <li key={o.id}>
                        {o.bank} — {o.card}
                      </li>
                    ))}
              </ul>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSubmitModalOpen(false)}
                className="px-4 py-2 border rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  setSubmitModalOpen(false);
                  await submitSelectedOffers();
                }}
                className="ml-auto px-6 py-3 rounded-md bg-[#0b5c0b] text-white"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submission log (debug) */}
      {submissionLog.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 pb-12">
          <h4 className="text-sm text-slate-600 mb-2">
            Submission history (local)
          </h4>
          <div className="space-y-3">
            {submissionLog
              .slice()
              .reverse()
              .map((entry, idx) => (
                <div
                  key={idx}
                  className="bg-white p-3 rounded-md shadow-sm border text-xs"
                >
                  <div className="text-slate-700">
                    Submitted at:{" "}
                    {new Date(entry.timestamp).toLocaleString()}
                  </div>
                  <div className="mt-2">
                    {entry.results.map((r, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <strong>{r.bank}</strong> — {r.card}
                        </div>
                        <div className="text-sm text-slate-500">
                          {r.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default CreditCards;

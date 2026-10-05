import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CATEGORY_LEAD_PRICES,
  CRM_API_URL,
  CRM_APP_URL,
} from "../data/partnerPlans";
import { ageLabel, gradeText } from "../data/leadGrades";
import {
  ArrowUpRight,
  Loader2,
  MapPin,
  Search,
  ShoppingBag,
} from "lucide-react";

type MarketLead = {
  id: string;
  display_name: string;
  masked_phone: string;
  city: string;
  loan_amount: number;
  product_category: string;
  product_subtype: string | null;
  score: string;
  price: number;
  employment_type?: string | null;
  lead_grade?: string | null;
  listing_type?: string | null;
  property_type?: string | null;
  created_at?: string | null;
};

const SUBTYPE_WORDS: Record<string, string> = {
  lap: "Loan Against Property",
  msme: "MSME",
  od: "Overdraft",
  cc: "Cash Credit",
  bnpl: "BNPL",
  auto: "Car",
};

const productLabel = (subtype: string | null, category: string) => {
  const isCard = category === "credit_card";
  const raw = (subtype || "")
    .toLowerCase()
    .replace(/^eligibility-/, "")
    .replace(isCard ? /^cc_/ : /^loan_/, "");
  const words = raw.split(/[_\-\s]+/).filter(Boolean);
  if (words.length === 0) return isCard ? "Credit Card" : "Loan";
  const name = words
    .map((w) => SUBTYPE_WORDS[w] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  if (isCard) return `${name} Credit Card`;
  return /loan|property|overdraft|credit|bnpl/i.test(name) ? name : `${name} Loan`;
};

const cityLabel = (city: string) => (!city || city.toLowerCase() === "unknown" ? "India" : city);

const sample = (
  id: string,
  display_name: string,
  city: string,
  product_category: string,
  product_subtype: string,
  loan_amount: number,
  score: string,
  price: number,
): MarketLead => ({
  id,
  display_name,
  masked_phone: "98XXXXXX00",
  city,
  loan_amount,
  product_category,
  product_subtype,
  score,
  price,
});

const SAMPLE_LEADS: MarketLead[] = [
  sample("sample-1", "A*** S***", "Delhi", "loan", "loan_personal", 500000, "hot", 299),
  sample("sample-2", "R*** K***", "Mumbai", "loan", "loan_home", 3500000, "warm", 299),
  sample("sample-3", "P*** M***", "Jaipur", "credit_card", "cc_lifetime_free", 0, "cold", 199),
  sample("sample-4", "V*** G***", "Lucknow", "loan", "loan_business", 1000000, "warm", 299),
];

const LeadBoardPage: React.FC = () => {
  const [items, setItems] = useState<MarketLead[]>([]);
  const [sold, setSold] = useState<MarketLead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [buyOpen, setBuyOpen] = useState<MarketLead | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams({ limit: "48" });
      if (q.trim()) params.set("q", q.trim());
      if (category !== "all") params.set("product_category", category);
      const res = await fetch(`${CRM_API_URL}/api/public/marketplace/leads?${params}`);
      if (!res.ok) throw new Error("Could not load LeadBoard");
      const data = await res.json();
      setItems(data.items ?? []);
      setSold(data.recent_sold ?? []);
      setTotal(data.total ?? 0);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load");
      setItems([]);
      setSold([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.title = "LeadBoard | RupeeDial Partner Marketplace";
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const minPrice = Math.min(...CATEGORY_LEAD_PRICES.map((c) => c.price));

  const soldCards = sold.length > 0 ? sold : items.length > 0 ? [] : SAMPLE_LEADS.slice(1);
  const boardCards: { lead: MarketLead; kind: "live" | "demo" | "sold" }[] = [
    ...(items.length > 0
      ? items.map((lead) => ({ lead, kind: "live" as const }))
      : [{ lead: SAMPLE_LEADS[0], kind: "demo" as const }]),
    ...soldCards.map((lead) => ({ lead, kind: "sold" as const })),
  ];

  return (
    <div className="rd-market-bg min-h-[70vh]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rd-rise flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#10662A]">
              Partner marketplace
            </p>
            <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-[#390A5D] sm:text-5xl">
              LeadBoard
            </h1>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-[#5c4d72]">
              Live requirements from RupeeDial. Identity stays masked until you buy —
              then unlock full contact inside CRM.
            </p>
          </div>
          <Link
            to="/pricing"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-[#10662A]/25 bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#10662A] shadow-[0_8px_30px_rgba(16,102,42,0.08)] backdrop-blur-sm transition hover:border-[#10662A]/50 hover:bg-white"
          >
            See partner plans
            <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="rd-rise rd-rise-delay-1 mt-10 overflow-hidden rounded-[1.35rem] border border-white/80 bg-white/90 p-3 shadow-[0_20px_50px_rgba(16,102,42,0.08)] backdrop-blur-md sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5c4d72]/70" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void load()}
                placeholder="City or product…"
                className="h-12 w-full rounded-2xl border border-[#e3eee6] bg-[#f9fcfa] pl-11 pr-4 text-sm text-[#390A5D] placeholder:text-[#5c4d72]/60 focus:border-[#10662A]/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#10662A]/10"
              />
            </div>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-12 rounded-2xl border border-[#e3eee6] bg-[#f9fcfa] px-4 text-sm font-medium text-[#390A5D] focus:border-[#10662A]/40 focus:outline-none focus:ring-4 focus:ring-[#10662A]/10"
            >
              <option value="all">All categories</option>
              {CATEGORY_LEAD_PRICES.map((c) => (
                <option key={c.key} value={c.key}>
                  {c.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => void load()}
              className="h-12 rounded-2xl bg-gradient-to-b from-[#14803a] to-[#10662A] px-7 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,102,42,0.28)] transition hover:from-[#169443] hover:to-[#0d5222]"
            >
              Search
            </button>
          </div>
        </div>

        <div className="rd-rise rd-rise-delay-2 mt-5 flex flex-wrap items-center gap-3 text-xs text-[#5c4d72]">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#d8ecdd] bg-white/70 px-3 py-1.5 font-medium backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#10662A]" />
            {total} available lead{total === 1 ? "" : "s"}
          </span>
          <span className="font-medium">From ₹{minPrice}</span>
        </div>

        {loading ? (
          <div className="grid place-items-center py-28">
            <Loader2 className="h-8 w-8 animate-spin text-[#10662A]" />
          </div>
        ) : error ? (
          <div className="mt-8 rounded-2xl border border-amber-200/80 bg-amber-50/90 p-6 text-sm text-amber-950">
            {error}. Ensure CRM API is running at <code className="font-mono text-xs">{CRM_API_URL}</code>.
          </div>
        ) : (
          <>
          {items.length === 0 && (
            <div className="mt-8 rounded-2xl border border-[#cfe5d6] bg-white px-5 py-5 text-center">
              <p className="text-base font-bold text-[#390A5D]">Most leads are sold out right now</p>
              <p className="mt-1 text-sm text-[#5c4d72]">
                New leads appear here as soon as a customer applies on RupeeDial. Log in as a partner to buy.
              </p>
            </div>
          )}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {boardCards.map(({ lead, kind }, i) => (
              <article
                key={`${kind}-${lead.id}`}
                className={`rd-lead-card rd-rise group relative flex flex-col overflow-hidden rounded-[1.35rem] border border-[#e2efe6] bg-white ${
                  i % 3 === 1 ? "rd-rise-delay-1" : i % 3 === 2 ? "rd-rise-delay-2" : ""
                }`}
              >
                {kind === "sold" && (
                  <div className="absolute inset-0 z-10 grid place-items-center bg-white/30">
                    <span className="-rotate-12 rounded-lg border-2 border-red-500/80 bg-white/90 px-5 py-1.5 text-lg font-extrabold uppercase tracking-[0.2em] text-red-600 shadow-sm">
                      Sold
                    </span>
                  </div>
                )}
                {kind === "demo" && (
                  <span className="absolute left-4 top-4 z-10 rounded-full bg-[#10662A] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                    Demo
                  </span>
                )}
                <div
                  className={`flex flex-1 flex-col p-6 ${kind === "demo" ? "pt-10" : ""} ${
                    kind === "sold" ? "pointer-events-none select-none blur-[3px] opacity-70" : ""
                  }`}
                  aria-hidden={kind === "sold"}
                >
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#10662A]/35 to-transparent"
                  aria-hidden
                />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-xl font-semibold tracking-tight text-[#390A5D]">
                      {productLabel(lead.product_subtype, lead.product_category)}
                    </h2>
                    <p className="mt-1 flex items-center gap-1.5 text-xs font-medium text-[#5c4d72]">
                      <MapPin className="h-3.5 w-3.5 text-[#10662A]/80" />
                      {cityLabel(lead.city)}
                    </p>
                  </div>
                  <span className="rounded-full border border-[#d8ecdd] bg-[#E8F7EC] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#10662A]">
                    {gradeText(lead.lead_grade)}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-[#5c4d72]">
                  <p><span className="block text-[10px] uppercase tracking-wide">Requirement</span><span className="font-semibold text-[#390A5D]">₹{Number(lead.loan_amount || 0).toLocaleString("en-IN")}</span></p>
                  <p><span className="block text-[10px] uppercase tracking-wide">Profile</span><span className="font-semibold capitalize text-[#390A5D]">{lead.employment_type || "Hidden"}</span></p>
                  <p><span className="block text-[10px] uppercase tracking-wide">Property</span><span className="font-semibold text-[#390A5D]">{lead.property_type || "—"}</span></p>
                  <p><span className="block text-[10px] uppercase tracking-wide">Age</span><span className="font-semibold text-[#390A5D]">{ageLabel(lead.created_at)}</span></p>
                  <p className="col-span-2 capitalize"><span className="font-semibold text-[#390A5D]">{lead.listing_type || "shared"}</span> lead · personal details unlock after purchase</p>
                </div>

                <div className="mt-auto flex items-end justify-between gap-3 rounded-2xl bg-gradient-to-br from-[#f4faf6] to-[#eef7f1] px-4 py-3.5 mt-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#5c4d72]/80">
                      Unlock
                    </p>
                    <p className="mt-0.5 font-display text-2xl font-bold tabular-nums tracking-tight text-[#10662A]">
                      ₹{Number(lead.price).toLocaleString("en-IN")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setBuyOpen(lead)}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-[#14803a] to-[#0a4a1e] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(16,102,42,0.28)] transition hover:brightness-110"
                  >
                    <ShoppingBag className="h-4 w-4" /> Buy
                  </button>
                </div>
                </div>
              </article>
            ))}
          </div>
          </>
        )}
      </div>

      {buyOpen && (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0a1f12]/45 p-4 backdrop-blur-[2px]">
          <div className="rd-rise w-full max-w-md overflow-hidden rounded-[1.5rem] border border-white/20 bg-white shadow-[0_30px_80px_rgba(10,31,18,0.35)]">
            <div className="bg-gradient-to-br from-[#E8F7EC] to-white px-6 pt-6 pb-2">
              <h3 className="font-display text-2xl font-bold text-[#390A5D]">Partner access</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5c4d72]">
                Unlock <strong className="text-[#390A5D]">{buyOpen.display_name}</strong> in{" "}
                {cityLabel(buyOpen.city)} for{" "}
                <strong className="text-[#10662A]">
                  ₹{Number(buyOpen.price).toLocaleString("en-IN")}
                </strong>
                . Login as an approved partner, or apply to join.
              </p>
            </div>
            <div className="flex flex-col gap-2.5 px-6 pb-6 pt-4">
              <a
                href={`${CRM_APP_URL}/auth?next=/dashboard/leadboard`}
                className="rounded-full bg-gradient-to-b from-[#14803a] to-[#10662A] py-3.5 text-center text-sm font-semibold text-white shadow-[0_10px_24px_rgba(16,102,42,0.28)]"
              >
                Partner login (CRM)
              </a>
              <Link
                to="/partner-login"
                className="rounded-full border border-[#10662A]/35 py-3.5 text-center text-sm font-semibold text-[#10662A] hover:bg-[#E8F7EC]"
              >
                Become a Partner
              </Link>
              <Link
                to="/pricing"
                className="py-2 text-center text-xs font-semibold text-[#5c4d72] hover:text-[#10662A]"
              >
                View plans & pricing
              </Link>
              <button
                type="button"
                onClick={() => setBuyOpen(null)}
                className="py-2 text-sm text-[#5c4d72] hover:text-[#390A5D]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadBoardPage;

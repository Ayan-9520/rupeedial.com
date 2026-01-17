// src/pages/ExpertPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
const serviceRouteMap: Record<string, string> = {
  "personal-loan": "/personal-loan",
  "business-loan": "/business-loan",
  "home-loan": "/home-loan",
  "msme-loan": "/msme-loan",
  "mudra-loan": "/mudra-loan",
  "car-loan": "/auto-loan",
  "credit-cards": "/credit-cards",
  "lap": "/lap-loan",
};

type LoanCategory =
  | "all"
  | "home"
  | "business"
  | "car"
  | "personal"
  | "msme"
  | "lap"
  | "credit-card";

interface Expert {
  id: number;
  name: string;
  role: string;
  experience: string;
  speciality: string;
  badge: string;
  categories: LoanCategory[];
  phone?: string;
  locations?: string[]; // e.g. ["New Delhi", "110001"]
  serviceSlug?: string; // optional: "home-loan"
  avatarUrl?: string;
}

interface CallLog {
  id: string;
  expert_id: number | null;
  customer_number: string;
  type: "incoming" | "outgoing";
  status: string;
  duration_sec?: number | null;
  recording_url?: string | null;
  created_at?: string;
}

interface Lead {
  id?: string;
  name: string;
  mobile: string;
  loanType: string;
  city?: string;
  pincode?: string;
  note?: string;
  assignedExpertId?: number | null;
}

/* === SET YOUR PRODUCTION API BASE ===
   Keep this value — backend already hosted on Hostinger as discussed:
*/
const API_BASE = "https://rupeedial.com/rupeedial-backend/api";

const categoryLabels: Record<LoanCategory, string> = {
  all: "All Loan Types",
  home: "Home Loan / LAP",
  business: "Business / SME Loan",
  car: "New / Used Car Loan",
  personal: "Personal Loan",
  msme: "MSME Loan",
  lap: "Loan Against Property",
  "credit-card": "Credit Card",
};

const serviceNav: { label: string; key: LoanCategory; slug?: string }[] = [
  { label: "MSME Loan", key: "msme", slug: "msme-loan" },
  { label: "Mudra Loan", key: "business", slug: "mudra-loan" },
  { label: "Home Loan", key: "home", slug: "home-loan" },
  { label: "Loan Against Property", key: "lap", slug: "lap" },
  { label: "Personal Loan", key: "personal", slug: "personal-loan" },
  { label: "Auto Loan", key: "car", slug: "car-loan" },
  { label: "Credit Cards", key: "credit-card", slug: "credit-cards" },
];

const ExpertPage: React.FC = () => {
  const [loanCategory, setLoanCategory] = useState<LoanCategory>("all");
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [experts, setExperts] = useState<Expert[]>([]);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);
  const [loading, setLoading] = useState(false);

  const [leadForm, setLeadForm] = useState<Lead>({
    name: "",
    mobile: "",
    loanType: "",
    city: "",
    pincode: "",
    note: "",
    assignedExpertId: null,
  });

  const [activeExpert, setActiveExpert] = useState<Expert | null>(null);

  // Load experts from backend (safe parse)
  useEffect(() => {
    let cancelled = false;
    async function loadExperts() {
      try {
        const res = await fetch(`${API_BASE}/get-experts.php`);
        if (!res.ok) throw new Error("Network response not ok");
        const data = await res.json();
        const normalized = (data || []).map((e: any) => ({
          id: Number(e.id || e.ID || 0),
          name: e.name ?? e.full_name ?? "",
          role: e.role ?? "Loan Expert",
          experience: e.experience ?? e.experience_years ?? "",
          speciality: e.speciality ?? e.specialization ?? "",
          badge: e.badge ?? "",
          categories: Array.isArray(e.categories)
            ? e.categories
            : typeof e.categories === "string"
            ? (e.categories as string).split(",").map((s) => s.trim()).filter(Boolean)
            : [],
          locations: Array.isArray(e.locations)
            ? e.locations
            : e.locations
            ? ("" + e.locations).split(",").map((s) => s.trim()).filter(Boolean)
            : [],
          phone: e.phone ?? e.mobile ?? "",
          serviceSlug: e.serviceSlug ?? e.service_slug ?? "",
          avatarUrl: e.avatarUrl ?? e.avatar_url ?? "",
        })) as Expert[];

        if (!cancelled) setExperts(normalized);
      } catch (err) {
        console.error("Failed to fetch experts", err);
        if (!cancelled) setExperts([]);
      }
    }
    loadExperts();
    return () => { cancelled = true; };
  }, []);

  // Filter logic
const visibleExperts = useMemo(() => {
  const k = keyword.trim().toLowerCase();
  const cityStr = city.trim().toLowerCase();
  const pinStr = pincode.trim();

  // 🔹 STEP 1: strict filter
  const filtered = experts.filter((exp) => {
    const catOk =
      loanCategory === "all" ||
      (exp.categories || []).includes(loanCategory);

    const composite = `${exp.name || ""} ${exp.role || ""} ${exp.speciality || ""}`.toLowerCase();
    const kwOk = !k || composite.includes(k);

    let cityOk = true;
    if (cityStr) {
      cityOk = (exp.locations || []).some((loc) =>
        (loc || "").toLowerCase().includes(cityStr)
      );
    }

    let pinOk = true;
    if (pinStr) {
      pinOk = (exp.locations || []).some((loc) =>
        (loc || "").includes(pinStr)
      );
    }

    return catOk && kwOk && cityOk && pinOk;
  });

  // 🔹 STEP 2: fallback logic
  if (filtered.length === 0) {
    return experts; // 👈 show all experts if no match
  }

  return filtered;
}, [experts, loanCategory, keyword, city, pincode]);


  const resultSummary = () => {
    const count = visibleExperts.length;
    const catLabel = categoryLabels[loanCategory];
    const parts: string[] = [];
    parts.push(count === 0 ? "No experts found" : count === 1 ? "Showing 1 expert" : `Showing ${count} experts`);
    if (loanCategory !== "all") parts.push(`for ${catLabel}`);
    if (keyword.trim()) parts.push(`matching "${keyword.trim()}"`);
    if (city.trim()) parts.push(`in ${city.trim()}`);
    if (pincode.trim()) parts.push(`pincode ${pincode.trim()}`);
    return parts.join(" ");
  };

  // Initiate masked call (calls backend initiate endpoint)
  async function initiateMaskedCall(expertId: number, customerNumber: string) {
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("expertId", String(expertId));
      fd.append("customerNumber", customerNumber);

      const res = await fetch(`${API_BASE}/initiate-call.php`, { method: "POST", body: fd });
      const json = await res.json();
      if (json.success) {
        alert(`Call initiated. CallId: ${json.callId || json.call_sid || json.callLogId || "n/a"}`);
        setTimeout(() => loadCallLogs(expertId), 2500);
      } else {
        alert("Failed to initiate call: " + (json.message || "unknown"));
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  // Submit lead
  async function submitLead() {
    if (!leadForm.name || !leadForm.mobile || !leadForm.loanType) {
      alert("Please enter Name, Mobile and Loan Type.");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("name", leadForm.name);
      fd.append("mobile", leadForm.mobile);
      fd.append("loanType", leadForm.loanType);
      fd.append("city", leadForm.city || "");
      fd.append("pincode", leadForm.pincode || "");
      fd.append("note", leadForm.note || "");
      fd.append("assignedExpertId", leadForm.assignedExpertId ? String(leadForm.assignedExpertId) : "");

      const res = await fetch(`${API_BASE}/create-lead.php`, { method: "POST", body: fd });
     const text = await res.text();
console.log("RAW RESPONSE:", text);

let json;
try {
  json = JSON.parse(text);
} catch {
  alert("Lead saved but server response invalid");
  return;
}

if (json.success) {

        alert("Form submitted successfully. Our loan expert will call you shortly.");
        setLeadForm({ name: "", mobile: "", loanType: "", city: "", pincode: "", note: "", assignedExpertId: null });
      } else {
        alert("Lead failed: " + (json.message || "unknown"));
      }
    } catch (e) {
      console.error(e);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  }

  // Load call logs
  async function loadCallLogs(expertId: number) {
    try {
      const res = await fetch(`${API_BASE}/get-call-logs.php?expertId=${expertId}`);
      if (!res.ok) throw new Error("Network response not ok");
      const json = await res.json();
      setCallLogs(json || []);
    } catch (e) {
      console.error("call log error", e);
      setCallLogs([]);
    }
  }

  function openExpertModal(exp: Expert) {
    setActiveExpert(exp);
    loadCallLogs(exp.id);
  }

  const quickChip = (label: string, cat: LoanCategory, kw?: string) => (
    <button
      key={label}
      type="button"
      onClick={() => {
        setLoanCategory(cat);
        if (kw) setKeyword(kw);
        const el = document.getElementById("expert-list");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
      className="inline-flex items-center rounded-full border border-[#d8efe6] bg-white px-3 py-1 text-[11px] font-medium text-[#390A5D] hover:border-[#10662A] hover:bg-[#F5FFF8] transition"
    >
      {label}
    </button>
  );

  // Simple helper to render avatar initials safely
  function initials(name?: string) {
    if (!name) return "NA";
    const parts = name.trim().split(" ").filter(Boolean);
    if (parts.length === 0) return "NA";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return (
    <main className="bg-white text-[#390A5D]">
      {/* Top search */}
      <section className="bg-[#E8F8EE] border-b border-[#d8efe6]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#10662A]">
                  Search Rupeedial Experts
                </p>
                <h1 className="text-lg md:text-xl font-bold text-[#10662A]">Find the right loan expert by service &amp; location</h1>
              </div>
              <p className="text-[11px] text-slate-600">20+ Banks · 7.5 lac+ journeys · 6300+ video reviews</p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const el = document.getElementById("expert-list");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="bg-white rounded-2xl shadow-lg border border-[#d8efe6] px-4 py-3 md:px-5 md:py-4 grid grid-cols-1 md:grid-cols-[280px,1fr,180px,160px,120px] gap-3 items-end"
            >
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Loan Category</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs">🏦</span>
                  <select value={loanCategory} onChange={(e) => setLoanCategory(e.target.value as LoanCategory)} className="w-full rounded-lg border border-slate-300 bg-white px-8 py-2 text-xs md:text-sm text-[#390A5D]">
                    <option value="all">All Loans / Services</option>
                    <option value="home">Home Loan / LAP</option>
                    <option value="business">Business / SME Loan</option>
                    <option value="car">New / Used Car Loan</option>
                    <option value="personal">Personal Loan</option>
                    <option value="credit-card">Credit Card</option>
                    <option value="msme">MSME Loan</option>
                    <option value="lap">Loan Against Property</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Search by loan type / expert name / keyword</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
                  <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="e.g. Home Loan, Business Loan, Amit Sharma..." className="w-full rounded-lg border border-slate-300 bg-white px-8 py-2 text-xs md:text-sm text-[#390A5D]" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">City</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">📍</span>
                  <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="e.g. New Delhi" className="w-full rounded-lg border border-slate-300 bg-white px-8 py-2 text-xs md:text-sm text-[#390A5D]" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">Pincode</label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🏷️</span>
                  <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="e.g. 110001" maxLength={6} className="w-full rounded-lg border border-slate-300 bg-white px-8 py-2 text-xs md:text-sm text-[#390A5D]" />
                </div>
              </div>

              <div>
                <button type="submit" className="w-full inline-flex items-center justify-center rounded-lg bg-[#10662A] px-4 py-2 text-xs md:text-sm font-semibold text-white">Search m tExperts</button>
              </div>
            </form>

            <div className="flex flex-wrap gap-2 mt-1">
              <span className="text-[11px] text-slate-500 mr-1">Popular searches:</span>
              {[
                ["Home Loan Expert", "home", "Home Loan"],
                ["Business / MSME Loan", "business", "Business Loan"],
                ["Car Loan", "car", "Car Loan"],
                ["Personal Loan", "personal", "Personal Loan"],
                ["Credit Card Help", "credit-card", "Credit Card"],
              ].map(([label, cat, kw]) => quickChip(label as string, cat as LoanCategory, kw as string))}
            </div>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-600 mr-2">Services:</span>
                <div className="rounded-xl bg-white border border-[#d8efe6] px-3 py-1 flex gap-2">
                  {serviceNav.map((s) => (
                    <React.Fragment key={s.label}>
                      <Link to={`/${s.slug || s.key}`} className="text-xs text-[#10662A] hover:underline">{s.label}</Link>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero */}
      <section className="bg-[#F5FFF8] border-b border-[#d8efe6]">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid lg:grid-cols-[3fr,2fr] gap-8 items-center">
            <div>
              <p className="inline-flex items-center text-[11px] font-semibold text-[#10662A] bg-white border border-[#d8efe6] rounded-full px-3 py-1 mb-3">Talk to our experts</p>
              <h2 className="text-3xl font-extrabold text-[#10662A]">Get Loan Advice from <span className="text-[#390A5D]">Rupeedial Experts</span></h2>
              <p className="mt-3 text-sm text-[#390A5D] max-w-xl">Confused between bank offers, interest rates or eligibility? Our experienced team helps you compare options across banks & NBFCs and choose the right loan.</p>
            </div>
            <div>
              <div className="rounded-2xl bg-white border border-[#d8efe6] p-5 shadow">
                <p className="text-xs text-[#10662A] font-semibold">Expert Desk</p>
                <h3 className="text-base font-bold text-[#390A5D]">Talk to a Rupeedial Expert</h3>
                <p className="text-xs text-slate-600">Share your loan requirement and our expert will call you within a few working hours.</p>
                <div className="mt-3 rounded-lg bg-[#F5FFF8] border border-[#d8efe6] p-3 text-xs">
                  <div>Call / WhatsApp: <span className="font-semibold">+91 79829 53129</span></div>
                  <div>Email: <span className="font-semibold">info@rupeedial.com</span></div>
                </div>
                <a href="/contact" className="mt-4 inline-block w-full text-center bg-[#10662A] text-white px-4 py-2 rounded">Contact Expert Team</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert list */}
      <section id="expert-list" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-[#10662A]">Meet Our Loan Experts</h2>
          <p className="mt-2 text-sm text-[#390A5D]">A dedicated team with experience in retail & business finance to help you at every step.</p>
        </div>

        <div className="mb-5 mt-6 rounded-xl bg-[#F5FFF8] border border-[#d8efe6] px-4 py-3 text-sm flex items-center justify-between">
          <div className="flex items-center gap-3"><div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#10662A] text-white">i</div><div>{resultSummary()}</div></div>
          <div className="text-xs text-slate-500">Rupeedial experts guide you for eligibility, bank selection & documentation.</div>
        </div>

        {visibleExperts.length === 0 ? (
          <p className="text-center text-sm text-slate-500">No experts found for your search. Try another keyword, category, city, or pincode.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
        {visibleExperts.map((exp) => (
  <div
    key={exp.id}
    className="rounded-2xl border border-[#d8efe6] bg-white shadow hover:shadow-lg transition p-5 flex flex-col"
  >
    {/* Header */}
    <div className="flex items-center gap-3 mb-4">
      <div className="h-14 w-14 rounded-full bg-[#E8F8EE] border border-[#d8efe6] flex items-center justify-center text-lg font-bold text-[#10662A] overflow-hidden">
        {exp.avatarUrl ? (
          <img
            src={exp.avatarUrl}
            alt={exp.name}
            className="h-14 w-14 object-cover"
          />
        ) : (
          initials(exp.name)
        )}
      </div>

      <div>
        <p className="font-semibold text-base">{exp.name || "Unknown"}</p>
        <p className="text-xs text-slate-600">{exp.role}</p>
        <p className="text-[11px] text-slate-400">
          {(exp.locations || []).slice(0, 2).join(", ")}
        </p>
      </div>
    </div>

    {/* Details */}
    <div className="flex-1 text-sm text-[#390A5D] space-y-1">
      <div>
        <strong>Experience:</strong> {exp.experience || "-"}
      </div>
      <div>
        <strong>Speciality:</strong> {exp.speciality || "-"}
      </div>
      <div>
        <span className="inline-flex items-center rounded-full bg-[#F5FFF8] border border-[#d8efe6] px-2 py-0.5 text-[10px] font-semibold text-[#10662A]">
          {exp.badge || "Expert"}
        </span>
      </div>
    </div>

    {/* ✅ WhatsApp Button (FIXED) */}
   {exp.phone && (
  <a
    href={`https://wa.me/91${exp.phone}?text=Hi%20I%20need%20loan%20assistance`}
    target="_blank"
    rel="noreferrer"
    onClick={() => {
      // 🔹 WhatsApp click log (background me)
      fetch(`${API_BASE}/log-whatsapp-click.php`, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          expertId: String(exp.id),
        }).toString(),
      });
    }}
    className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2 text-sm font-semibold text-white hover:bg-[#1ebe5d]"
  >
    💬 WhatsApp Expert
  </a>
)}
    {/* Actions */}
    <div className="mt-3 flex gap-2">
      <button
        onClick={() => {
          const num = window.prompt(
            `Enter your mobile number to request callback from ${exp.name}`
          );
          if (!num) return;
          initiateMaskedCall(exp.id, num);
        }}
        className="flex-1 rounded-lg border border-[#10662A] px-3 py-2 text-sm text-[#10662A] hover:bg-[#F5FFF8]"
      >
        Request Callback
      </button>

      <button
        onClick={() => openExpertModal(exp)}
        className="rounded-lg bg-[#10662A] text-white px-3 py-2 text-sm hover:bg-[#0e5a25]"
      >
        View Profile
      </button>
    </div>

    <div className="mt-3 text-xs text-slate-600">
      Calls: {callLogs.filter((c) => c.expert_id === exp.id).length}
    </div>

   <div className="mt-2 text-xs">
  {exp.serviceSlug ? (
    <Link
      to={serviceRouteMap[exp.serviceSlug] || "/personal-loan"}
      className="text-[#10662A] underline"
    >
      View {exp.serviceSlug.replace("-", " ")} details
    </Link>
  ) : (
    <span className="text-slate-500">Service page not linked</span>
  )}
</div>
  </div>
))}

          </div>
        )}
      </section>

      {/* Quick enquiry form */}
      <section className="bg-[#F7FAFC] border-t border-[#d8efe6]">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-[#10662A]">How Our Experts Help You</h3>
              <p className="mt-2 text-sm text-[#390A5D]">From requirement discussion to disbursal — we guide you end-to-end.</p>

              <ol className="mt-4 space-y-3 text-sm text-[#390A5D]">
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-[#10662A] text-white flex items-center justify-center">1</span><div><strong>Requirement Discussion</strong><div className="text-xs text-slate-600">We check income, existing loans & property details.</div></div></li>
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-[#10662A] text-white flex items-center justify-center">2</span><div><strong>Compare Banks</strong><div className="text-xs text-slate-600">Multiple bank comparison for best rates.</div></div></li>
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-[#10662A] text-white flex items-center justify-center">3</span><div><strong>Documentation & Login</strong><div className="text-xs text-slate-600">Help with documents & bank login followups.</div></div></li>
                <li className="flex gap-3"><span className="w-6 h-6 rounded-full bg-[#10662A] text-white flex items-center justify-center">4</span><div><strong>Approval & Disbursal</strong><div className="text-xs text-slate-600">Support till sanction & disbursal.</div></div></li>
              </ol>
            </div>

            <div className="rounded-2xl bg-white border border-[#d8efe6] p-6 shadow">
              <p className="text-xs uppercase font-semibold tracking-wider text-[#10662A]">Quick expert enquiry</p>
              <h4 className="text-lg font-semibold text-[#390A5D] mt-2">Share your requirement</h4>
              <p className="text-xs text-slate-600 mt-1">Short form — our team will call you for details.</p>

              <form onSubmit={(e) => { e.preventDefault(); submitLead(); }} className="mt-4 space-y-3 text-sm">
                <div>
                  <label className="block text-xs text-slate-700">Full Name*</label>
                  <input value={leadForm.name} onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="Enter your name" />
                </div>

                <div>
                  <label className="block text-xs text-slate-700">Mobile Number*</label>
                  <input value={leadForm.mobile} onChange={(e) => setLeadForm({ ...leadForm, mobile: e.target.value })} type="tel" maxLength={10} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="10 digit mobile" />
                </div>

                <div>
                  <label className="block text-xs text-slate-700">Loan Type*</label>
                  <select value={leadForm.loanType} onChange={(e) => setLeadForm({ ...leadForm, loanType: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2 text-sm">
                    <option value="">Select loan type</option>
                    <option value="personal">Personal Loan</option>
                    <option value="business">Business Loan / MSME</option>
                    <option value="home">Home Loan / LAP</option>
                    <option value="car">Car Loan</option>
                    <option value="credit-card">Credit Card</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs text-slate-700">City</label>
                    <input value={leadForm.city} onChange={(e) => setLeadForm({ ...leadForm, city: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="City" />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-700">Pincode</label>
                    <input value={leadForm.pincode} onChange={(e) => setLeadForm({ ...leadForm, pincode: e.target.value })} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="Pincode" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-slate-700">Brief requirement</label>
                  <textarea value={leadForm.note} onChange={(e) => setLeadForm({ ...leadForm, note: e.target.value })} rows={2} className="w-full rounded border border-slate-300 px-3 py-2 text-sm" placeholder="Loan amount & short note..." />
                </div>

                <button disabled={loading} className="w-full rounded bg-[#10662A] text-white py-2 font-semibold">{loading ? "Submitting..." : "Submit to Expert Team"}</button>

                <p className="text-[11px] text-slate-500">By submitting, you authorize Rupeedial to contact you via call, SMS or email for loan assistance.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Expert modal */}
      {activeExpert && (
        <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-8">
          <div className="absolute inset-0 bg-black/40" onClick={() => setActiveExpert(null)} />
          <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-white border border-[#d8efe6] shadow-lg p-6">
            <div className="flex justify-between items-start gap-3 mb-4">
              <div>
                <h3 className="text-xl font-semibold text-[#10662A]">{activeExpert.name}</h3>
                <p className="text-sm text-slate-600">{activeExpert.role} • {activeExpert.experience}</p>
                <p className="text-sm text-[#390A5D] mt-2"><strong>Speciality:</strong> {activeExpert.speciality}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-600">Badge</div>
                <div className="inline-flex items-center rounded-full bg-[#F5FFF8] border border-[#d8efe6] px-2 py-1 text-sm text-[#10662A] mt-1">{activeExpert.badge}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-[#390A5D] mb-2">Call History</h4>
                <div className="space-y-2 max-h-56 overflow-auto">
                  {callLogs.filter(c => c.expert_id === activeExpert.id).length === 0 ? (
                    <p className="text-xs text-slate-500">No calls yet for this expert.</p>
                  ) : (
                    callLogs.filter(c => c.expert_id === activeExpert.id).map((c) => (
                      <div key={c.id || Math.random().toString(36).slice(2)} className="rounded-md border border-[#eef6ef] p-2 text-[12px]">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold">{c.type === "incoming" ? "Incoming" : "Outgoing"} • {c.customer_number}</div>
                            <div className="text-xs text-slate-600">{c.created_at ? new Date(c.created_at).toLocaleString() : ""}</div>
                          </div>
                          <div className="text-xs text-right">
                            <div>{c.status}</div>
                            <div>{c.duration_sec ? `${Math.floor((c.duration_sec || 0)/60)}m ${(c.duration_sec || 0)%60}s` : "-"}</div>
                          </div>
                        </div>
                        {c.recording_url && <a href={c.recording_url} target="_blank" rel="noreferrer" className="text-[11px] text-[#10662A] underline">Listen recording</a>}
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-3 flex gap-2">
                  <button onClick={() => {
                    const num = window.prompt("Enter customer mobile to start call:");
                    if (!num) return;
                    initiateMaskedCall(activeExpert.id, num);
                  }} className="inline-flex items-center rounded-lg bg-[#10662A] px-3 py-1.5 text-xs font-semibold text-white">Start masked call</button>

                  <button onClick={() => loadCallLogs(activeExpert.id)} className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-[#390A5D]">Refresh logs</button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-[#390A5D] mb-2">Profile & Actions</h4>
                <div className="text-[13px] text-slate-700 mb-3">
                  <div><strong>Phone:</strong> {activeExpert.phone || "-"}</div>
                  <div className="mt-1"><strong>Locations:</strong> {(activeExpert.locations || []).join(", ") || "-"}</div>
                </div>

                <div className="space-y-2">
                  <button onClick={() => {
                    const name = window.prompt("Customer name:");
                    const mobile = window.prompt("Customer mobile:");
                    if (!name || !mobile) return alert("Provide name & mobile");
                    const lead: Lead = { name, mobile, loanType: "personal", city: "", pincode: "", note: `Assigned to ${activeExpert.name}`, assignedExpertId: activeExpert.id };
                    (async () => {
             
             
                      setLoading(true);
                      try {
                        const fd = new FormData();
                        fd.append("name", lead.name);
                        fd.append("mobile", lead.mobile);
                        fd.append("loanType", lead.loanType);
                        fd.append("city", lead.city || "");
                        fd.append("pincode", lead.pincode || "");
                        fd.append("note", lead.note || "");
                        fd.append("assignedExpertId", lead.assignedExpertId ? String(lead.assignedExpertId) : "");
                        const res = await fetch(`${API_BASE}/create-lead.php`, { method: "POST", body: fd });
                        const json = await res.json();
                        if (json.success) alert("Thanks! Our loan expert will contact you shortly");
                        else alert("Failed: " + (json.message || "unknown"));
                      } catch (e) {
                        console.error(e);
                        alert("Network error");
                      } finally {
                        setLoading(false);
                      }
                    })();
                  }} className="w-full inline-flex items-center justify-center rounded-lg bg-[#10662A] px-3 py-2 text-xs font-semibold text-white">Create lead assigned</button>

                  <button onClick={() => setActiveExpert(null)} className="w-full inline-flex items-center justify-center rounded-lg bg-white border border-[#d8efe6] px-3 py-2 text-xs font-semibold text-[#390A5D]">Close</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </main>
  );
};

export default ExpertPage;

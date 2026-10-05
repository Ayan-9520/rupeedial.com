import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CRM_API_URL } from "../data/partnerPlans";
import { Loader2, MapPin, Search, Star } from "lucide-react";

type DirItem = {
  firm_name: string;
  slug: string;
  tagline: string | null;
  city: string;
  state: string | null;
  logo_url: string | null;
  products: string[];
  featured: boolean;
  public_url: string;
};

const PartnersDirectory: React.FC = () => {
  const [items, setItems] = useState<DirItem[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Partner Directory | RupeeDial";
  }, []);

  useEffect(() => {
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const qs = new URLSearchParams();
        if (q.trim()) qs.set("q", q.trim());
        const res = await fetch(`${CRM_API_URL}/api/public/directory/partners?${qs}`);
        if (!res.ok) throw new Error("Directory unavailable");
        const data = (await res.json()) as { items: DirItem[] };
        setItems(data.items || []);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load");
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 200);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#E8F7EC]/80 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#10662A]">Directory</p>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-[#390A5D] mt-2">
            Find a RupeeDial partner
          </h1>
          <p className="text-[#5c4d72] mt-3 text-sm md:text-base">
            Verified DSA & channel partners near you. Growth+ partners publish a public profile.
          </p>
        </div>

        <div className="mt-8 relative max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#5c4d72]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search firm, city, product…"
            className="w-full rounded-xl border border-[#d8ecdd] bg-white pl-10 pr-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10662A]/20"
          />
        </div>

        {loading ? (
          <div className="grid place-items-center py-20">
            <Loader2 className="size-6 animate-spin text-[#10662A]" />
          </div>
        ) : error ? (
          <p className="mt-10 text-sm text-red-700">{error}</p>
        ) : items.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-[#d8ecdd] bg-white p-10 text-center">
            <p className="text-[#5c4d72] text-sm">No published partners yet.</p>
            <Link
              to="/partner-login"
              className="inline-block mt-4 text-sm font-semibold text-[#10662A] hover:underline"
            >
              Become a Partner
            </Link>
          </div>
        ) : (
          <ul className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((p) => (
              <li key={p.slug}>
                <Link
                  to={`/p/${p.slug}`}
                  className="block h-full rounded-2xl border border-[#d8ecdd] bg-white p-5 hover:border-[#10662A]/40 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-3">
                    {p.logo_url ? (
                      <img src={p.logo_url} alt="" className="size-12 rounded-xl object-cover" />
                    ) : (
                      <div className="size-12 rounded-xl bg-[#E8F7EC] grid place-items-center font-bold text-[#10662A]">
                        {p.firm_name.charAt(0)}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="font-semibold text-[#390A5D] truncate">{p.firm_name}</h2>
                        {p.featured && (
                          <Star className="size-3.5 text-amber-500 fill-amber-500 shrink-0" />
                        )}
                      </div>
                      {p.tagline && (
                        <p className="text-xs text-[#5c4d72] mt-0.5 line-clamp-2">{p.tagline}</p>
                      )}
                      <p className="text-xs text-[#5c4d72] mt-2 flex items-center gap-1">
                        <MapPin className="size-3" />
                        {[p.city, p.state].filter(Boolean).join(", ") || "India"}
                      </p>
                    </div>
                  </div>
                  {p.products?.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {p.products.slice(0, 3).map((prod) => (
                        <span
                          key={prod}
                          className="text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-[#E8F7EC] text-[#10662A]"
                        >
                          {prod}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PartnersDirectory;

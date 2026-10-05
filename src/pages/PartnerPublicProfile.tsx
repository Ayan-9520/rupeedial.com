import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CRM_API_URL } from "../data/partnerPlans";
import { Loader2, Mail, MapPin, Phone, ArrowLeft } from "lucide-react";

type Profile = {
  firm_name: string;
  slug: string;
  tagline: string | null;
  bio: string | null;
  city: string;
  state: string | null;
  phone: string | null;
  email: string | null;
  logo_url: string | null;
  products: string[];
  featured: boolean;
  contact_name: string | null;
  public_url: string;
  subdomain_hint: string | null;
};

const PartnerPublicProfile: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`${CRM_API_URL}/api/public/partners/${encodeURIComponent(slug)}`);
        if (res.status === 404) throw new Error("Partner not found");
        if (!res.ok) throw new Error("Could not load profile");
        const data = (await res.json()) as Profile;
        setProfile(data);
        document.title = `${data.firm_name} | RupeeDial Partner`;
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Error");
        setProfile(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="grid place-items-center min-h-[50vh]">
        <Loader2 className="size-6 animate-spin text-[#10662A]" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <h1 className="text-xl font-bold text-[#390A5D]">Partner not found</h1>
        <p className="text-sm text-[#5c4d72] mt-2">{error}</p>
        <Link to="/partners" className="inline-block mt-6 text-sm font-semibold text-[#10662A]">
          ← Back to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-[#10662A] via-[#0d5222] to-[#E8F7EC]">
      <div className="max-w-3xl mx-auto px-4 pt-10 pb-16">
        <Link
          to="/partners"
          className="inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white"
        >
          <ArrowLeft className="size-3.5" /> Directory
        </Link>

        <div className="mt-6 rounded-3xl bg-white shadow-xl overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-[#390A5D] to-[#10662A]" />
          <div className="px-6 md:px-8 pb-8 -mt-10">
            <div className="flex flex-wrap items-end gap-4">
              {profile.logo_url ? (
                <img
                  src={profile.logo_url}
                  alt=""
                  className="size-20 rounded-2xl object-cover border-4 border-white shadow"
                />
              ) : (
                <div className="size-20 rounded-2xl bg-[#E8F7EC] border-4 border-white shadow grid place-items-center text-2xl font-bold text-[#10662A]">
                  {profile.firm_name.charAt(0)}
                </div>
              )}
              <div className="pb-1">
                <h1 className="font-display text-2xl md:text-3xl font-bold text-[#390A5D]">
                  {profile.firm_name}
                </h1>
                {profile.tagline && (
                  <p className="text-sm text-[#5c4d72] mt-1">{profile.tagline}</p>
                )}
                {profile.subdomain_hint && (
                  <p className="text-[11px] font-mono text-[#10662A] mt-1">{profile.subdomain_hint}</p>
                )}
              </div>
            </div>

            {(profile.city || profile.contact_name) && (
              <p className="mt-4 text-sm text-[#5c4d72] flex flex-wrap items-center gap-3">
                {(profile.city || profile.state) && (
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {[profile.city, profile.state].filter(Boolean).join(", ")}
                  </span>
                )}
                {profile.contact_name && <span>· {profile.contact_name}</span>}
                {profile.featured && (
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    Featured
                  </span>
                )}
              </p>
            )}

            {profile.bio && (
              <p className="mt-6 text-sm text-[#390A5D]/90 leading-relaxed whitespace-pre-wrap">
                {profile.bio}
              </p>
            )}

            {profile.products?.length > 0 && (
              <div className="mt-6">
                <div className="text-xs font-semibold uppercase tracking-widest text-[#5c4d72]">
                  Products
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {profile.products.map((p) => (
                    <span
                      key={p}
                      className="text-xs font-semibold px-3 py-1 rounded-full border border-[#d8ecdd] text-[#390A5D]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {profile.phone && (
                <a
                  href={`tel:${profile.phone}`}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#10662A] text-white px-4 py-2.5 text-sm font-semibold"
                >
                  <Phone className="size-4" /> Call
                </a>
              )}
              {profile.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#d8ecdd] px-4 py-2.5 text-sm font-semibold text-[#390A5D]"
                >
                  <Mail className="size-4" /> Email
                </a>
              )}
              <Link
                to="/check-eligibility"
                className="inline-flex items-center gap-2 rounded-xl border border-[#d8ecdd] px-4 py-2.5 text-sm font-semibold text-[#390A5D]"
              >
                Check eligibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPublicProfile;

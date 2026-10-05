import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { productMenus } from "../data/navProducts";

const NotFound: React.FC = () => {
  useEffect(() => {
    document.title = "Page not found | RupeeDial";
  }, []);

  const popular: { to: string; label: string }[] = productMenus
    .flatMap((m) => [...m.links] as { to: string; label: string }[])
    .slice(0, 8);

  return (
    <main className="rd-market-bg min-h-[70vh]">
      <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:py-28">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#10662A]">Error 404</p>
        <h1 className="font-display mt-3 text-4xl font-bold text-[#390A5D] sm:text-5xl">This page doesn't exist</h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] text-[#5c4d72]">
          The link may be old or mistyped. Try one of these instead.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link to="/" className="rounded-xl bg-[#10662A] px-6 py-3 text-sm font-semibold text-white">
            Go to home
          </Link>
          <Link to="/check-eligibility" className="rounded-xl border border-[#10662A]/35 px-6 py-3 text-sm font-semibold text-[#10662A]">
            Check eligibility
          </Link>
        </div>
        <div className="mt-12 grid gap-2 text-left sm:grid-cols-2">
          {popular.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="flex items-center justify-between rounded-xl border border-[#e2efe6] bg-white px-4 py-3 text-sm font-medium text-[#390A5D] hover:border-[#10662A]/40"
            >
              {l.label}
              <ArrowRight className="h-4 w-4 text-[#10662A]" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
};

export default NotFound;

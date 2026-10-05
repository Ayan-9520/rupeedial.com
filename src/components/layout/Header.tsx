import React, { useState, useEffect, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Phone,
  ArrowRight,
  Home,
  FileCheck,
  BookOpen,
  Info,
  Mail,
  LayoutGrid,
  BadgeIndianRupee,
  GraduationCap,
} from "lucide-react";
import { productMenus } from "../../data/navProducts";

const joinUsLinks = [
  { to: "/partner-login", icon: "🤝", title: "Become a Partner", desc: "CRM, LeadBoard & profile" },
  { to: "/partners", icon: "📍", title: "Partner Directory", desc: "Find DSAs near you" },
  { to: "/pricing", icon: "₹", title: "Partner plans", desc: "Starter · Growth · Pro" },
  { to: "/bnpl-partners", icon: "🚀", title: "BNPL Partners", desc: "Buy now pay later" },
  { to: "/career", icon: "💼", title: "Careers", desc: "Jobs at RupeeDial" },
  { to: "/expert", icon: "📞", title: "Talk to Expert", desc: "Loan counselling" },
];

const DROPDOWN_CLOSE_MS = 200;

const primaryNavLinks = [
  { to: "/learn&earn", label: "Learn & Earn", icon: GraduationCap, exact: true },
  { to: "/leadboard", label: "LeadBoard", icon: LayoutGrid },
  { to: "/check-eligibility", label: "Eligibility", icon: FileCheck },
];

const pricingLink = { to: "/pricing", label: "Pricing", icon: BadgeIndianRupee };


const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSection, setMobileSection] = useState<"products" | "join" | null>(null);
  const [productsOpen, setProductsOpen] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);
  const productsTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const joinTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const location = useLocation();

  const clearProductsTimer = () => {
    if (productsTimer.current) clearTimeout(productsTimer.current);
  };
  const clearJoinTimer = () => {
    if (joinTimer.current) clearTimeout(joinTimer.current);
  };

  const openProducts = () => {
    clearProductsTimer();
    clearJoinTimer();
    setJoinOpen(false);
    setProductsOpen(true);
  };
  const closeProducts = () => {
    clearProductsTimer();
    productsTimer.current = setTimeout(() => setProductsOpen(false), DROPDOWN_CLOSE_MS);
  };

  const openJoin = () => {
    clearJoinTimer();
    clearProductsTimer();
    setProductsOpen(false);
    setJoinOpen(true);
  };
  const closeJoin = () => {
    clearJoinTimer();
    joinTimer.current = setTimeout(() => setJoinOpen(false), DROPDOWN_CLOSE_MS);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setMobileSection(null);
    setProductsOpen(false);
    setJoinOpen(false);
  }, [location.pathname]);

  useEffect(
    () => () => {
      clearProductsTimer();
      clearJoinTimer();
    },
    []
  );

  const isActive = useCallback(
    (path: string, exact?: boolean) =>
      exact ? location.pathname === path : location.pathname.startsWith(path),
    [location.pathname]
  );

  const toggleMobileSection = (section: "products" | "join") =>
    setMobileSection((prev) => (prev === section ? null : section));

  const desktopLinkClass = (active: boolean) =>
    `relative py-2 text-[13px] xl:text-sm font-bold tracking-tight transition-colors duration-300 ease-premium group/link whitespace-nowrap ${
      active ? "text-[#0D4F20]" : "text-[#0a3d1c] hover:text-[#0D4F20]"
    }`;

  const DesktopNavLink = ({
    to,
    label,
    exact,
  }: {
    to: string;
    label: string;
    exact?: boolean;
  }) => {
    const active = isActive(to, exact);
    return (
      <Link to={to} className={desktopLinkClass(active)}>
        {label}
        <span
          className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#10662A] to-[#4ade80] transition-all duration-300 ease-premium ${
            active ? "w-full opacity-100" : "w-0 opacity-0 group-hover/link:w-full group-hover/link:opacity-100"
          }`}
        />
      </Link>
    );
  };

  const DropdownTrigger = ({ label, open }: { label: string; open: boolean }) => (
    <button
      type="button"
      className={`${desktopLinkClass(open)} inline-flex items-center gap-1`}
      aria-haspopup="true"
      aria-expanded={open}
    >
      {label}
      <ChevronDown
        className={`w-3.5 h-3.5 transition-transform duration-300 ease-premium ${
          open ? "rotate-180" : ""
        }`}
      />
      <span
        className={`absolute left-0 -bottom-0.5 h-[2px] rounded-full bg-[#10662A] transition-all duration-300 ease-premium ${
          open ? "w-full" : "w-0"
        }`}
      />
    </button>
  );

  const mobileLinkClass = (active: boolean) =>
    `flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-[#E8F7EC] to-[#f0fdf4] text-[#0D4F20] shadow-sm ring-1 ring-[#10662A]/15"
        : "text-slate-700 hover:bg-[#f5fcf7] active:scale-[0.99]"
    }`;

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-[90] overflow-visible transition-shadow duration-300 ${
          scrolled
            ? "border-b border-[#b8dfc0] bg-white shadow-[0_4px_20px_rgba(16,102,42,0.1)]"
            : "border-b border-[#a8d4b0] bg-[#EAF8EC] shadow-[0_2px_12px_rgba(16,102,42,0.06)]"
        }`}
      >
        <div className="mx-auto grid h-[var(--header-h)] max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 sm:px-6 lg:px-8">
          {/* Logo — oversized + clipped so wordmark matches menu weight (PNG has tagline padding) */}
          <Link
            to="/"
            className="group/logo relative z-10 flex h-full shrink-0 items-center overflow-hidden"
            aria-label="RupeeDial home"
          >
            <img
              src="/rupeediallogo.png"
              alt="RupeeDial"
              className="h-[165%] w-auto max-w-[min(260px,48vw)] object-contain object-left transition-transform duration-300 group-hover/logo:scale-[1.03] sm:max-w-[300px]"
            />
          </Link>

          {/* Desktop nav — centered column */}
          <nav
            className="hidden min-w-0 items-center justify-center gap-2.5 xl:flex 2xl:gap-3.5"
            aria-label="Main navigation"
          >
            <DesktopNavLink to="/" label="Home" exact />

            <div className="relative" onMouseEnter={openProducts} onMouseLeave={closeProducts}>
              <DropdownTrigger label="Products" open={productsOpen} />
            </div>

            {primaryNavLinks.map((link) => (
              <DesktopNavLink
                key={link.to}
                to={link.to}
                label={link.label}
                exact={"exact" in link ? link.exact : undefined}
              />
            ))}

            <div className="relative" onMouseEnter={openJoin} onMouseLeave={closeJoin}>
              <DropdownTrigger label="Partners" open={joinOpen} />
              {joinOpen && (
                <div className="absolute left-1/2 top-full z-[110] w-[280px] -translate-x-1/2 pt-3">
                  <div className="overflow-hidden rounded-xl border border-[#cfe7d5] bg-white p-2 shadow-[0_16px_48px_rgba(16,102,42,0.18)]">
                    {joinUsLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-[#E8F7EC]"
                      >
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#dff3e5] text-base">
                          {item.icon}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold text-[#10662A]">{item.title}</span>
                          <span className="block truncate text-[11px] text-slate-600">{item.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <DesktopNavLink to={pricingLink.to} label={pricingLink.label} />
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden shrink-0 items-center justify-end gap-2 xl:flex">
            <a
              href="tel:+917982953129"
              className="hidden 2xl:inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-semibold text-[#10662A] transition-colors hover:bg-[#E8F7EC]"
            >
              <Phone className="h-3.5 w-3.5" />
              +91 79829 53129
            </a>
            <Link
              to="/check-eligibility"
              className="group/cta relative overflow-hidden rounded-xl bg-gradient-to-r from-[#10662A] via-[#0d5a26] to-[#0D4F20] px-4 py-2 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(16,102,42,0.3)]"
            >
              <span className="relative">Apply Loan</span>
            </Link>
            <Link
              to="/login"
              className="rounded-xl border-2 border-[#10662A]/70 px-4 py-2 text-sm font-semibold text-[#10662A] transition-all duration-300 hover:border-[#10662A] hover:bg-[#10662A] hover:text-white hover:shadow-md"
            >
              Login
            </Link>
          </div>

          {/* Mobile / tablet menu button */}
          <button
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="col-start-3 flex h-11 w-11 items-center justify-center justify-self-end rounded-xl border border-[#10662A]/30 bg-white text-[#10662A] shadow-sm transition-all duration-300 hover:border-[#10662A]/50 hover:bg-[#E8F7EC] active:scale-95 xl:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <Menu
              className={`absolute h-5 w-5 transition-all duration-300 ${
                mobileOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute h-5 w-5 transition-all duration-300 ${
                mobileOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </button>
        </div>
      </header>

      {productsOpen && (
        <div
          className="fixed inset-x-0 z-[100] hidden xl:block"
          style={{ top: "calc(var(--header-h) - 16px)" }}
          onMouseEnter={openProducts}
          onMouseLeave={closeProducts}
        >
          <div className="h-4" aria-hidden />
          <div className="animate-nav-dropdown border-b border-[#cfe7d5] bg-white shadow-[0_12px_40px_rgba(16,102,42,0.15)]">
            <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
              <div className="mb-4 h-1 rounded-full bg-gradient-to-r from-[#10662A] via-[#3cb371] to-[#10662A]" />
              <div className="grid grid-cols-2 gap-x-8 gap-y-4 lg:grid-cols-4">
                {productMenus.map((col) => (
                  <div key={col.title}>
                    <h3 className="mb-2.5 border-b border-[#d8ecdd] pb-2 text-[10px] font-bold uppercase tracking-widest text-[#10662A]">
                      {col.title}
                    </h3>
                    <ul className="space-y-0.5">
                      {col.links.map((link) => (
                        <li key={link.to}>
                          <Link
                            to={link.to}
                            className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[12px] font-medium transition-all duration-200 ${
                              isActive(link.to)
                                ? "bg-[#E8F7EC] text-[#0D4F20]"
                                : "text-[#1a3d28] hover:bg-[#f0fdf4] hover:text-[#0D4F20]"
                            }`}
                            onClick={() => setProductsOpen(false)}
                          >
                            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#10662A]" />
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#d8ecdd] bg-[#f5fcf7] px-4 py-3">
                <p className="text-xs text-[#390A5D]">
                  <span className="font-bold text-[#10662A]">50+ lenders</span>
                  <span className="text-slate-600"> · compare rates in minutes</span>
                </p>
                <Link
                  to="/check-eligibility"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-[#10662A] px-4 py-2 text-xs font-semibold text-white shadow-md transition-all hover:bg-[#0D4F20]"
                  onClick={() => setProductsOpen(false)}
                >
                  Check Eligibility
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile drawer overlay */}
      <div
        className={`xl:hidden fixed inset-0 z-[55] bg-[#0a2e14]/30 backdrop-blur-[2px] transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden={!mobileOpen}
      />

      {/* Mobile drawer panel */}
      <aside
        id="mobile-nav-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`xl:hidden fixed top-0 right-0 z-[58] flex h-[100dvh] w-[min(100%,360px)] flex-col border-l border-[#cfe7d5]/80 bg-white shadow-[-8px_0_40px_rgba(16,102,42,0.12)] transition-transform duration-500 ease-premium ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#e2f3e6] bg-gradient-to-r from-[#f0fdf4] to-white px-5 py-4 pt-[max(1rem,env(safe-area-inset-top))]">
          <img
            src="/rupeediallogo.png"
            alt="RupeeDial"
            className="h-14 w-auto max-w-[200px] object-contain object-left"
          />
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-[#10662A] transition-colors hover:bg-[#E8F7EC]"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable nav */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 scrollbar-hide" aria-label="Mobile navigation">
          <div className="space-y-1">
            <Link
              to="/"
              className={mobileLinkClass(isActive("/", true))}
              onClick={() => setMobileOpen(false)}
            >
              <Home className="h-5 w-5 shrink-0 text-[#10662A]" />
              Home
            </Link>

            <div className="overflow-hidden rounded-xl border border-[#d9ebde]/80">
              <button
                type="button"
                onClick={() => toggleMobileSection("products")}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left text-[15px] font-semibold text-[#10662A] transition-colors hover:bg-[#f5fcf7]"
                aria-expanded={mobileSection === "products"}
              >
                <span>Products</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    mobileSection === "products" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-premium ${
                  mobileSection === "products" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-2 border-t border-[#e2f3e6] bg-[#fafdfa] px-3 py-3">
                    {productMenus.map((col) => (
                      <div key={col.title} className="rounded-lg bg-white p-3 shadow-sm ring-1 ring-[#e2f3e6]">
                        <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-[#10662A]">
                          {col.title}
                        </p>
                        <ul className="space-y-0.5">
                          {col.links.map((link) => (
                            <li key={link.to}>
                              <Link
                                to={link.to}
                                className={`block rounded-lg px-2.5 py-2 text-[13px] font-medium transition-colors ${
                                  isActive(link.to)
                                    ? "bg-[#E8F7EC] text-[#0D4F20]"
                                    : "text-[#245233] hover:bg-[#f0fdf4]"
                                }`}
                                onClick={() => setMobileOpen(false)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {primaryNavLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.to, "exact" in link ? link.exact : undefined);
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={mobileLinkClass(active)}
                  onClick={() => setMobileOpen(false)}
                >
                  <Icon className="h-5 w-5 shrink-0 text-[#10662A]" />
                  {link.label}
                </Link>
              );
            })}

            <div className="overflow-hidden rounded-xl border border-[#d9ebde]/80">
              <button
                type="button"
                onClick={() => toggleMobileSection("join")}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left text-[15px] font-semibold text-[#10662A] transition-colors hover:bg-[#f5fcf7]"
                aria-expanded={mobileSection === "join"}
              >
                <span>Partners</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${
                    mobileSection === "join" ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-premium ${
                  mobileSection === "join" ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="space-y-1 border-t border-[#e2f3e6] bg-[#fafdfa] p-3">
                    {joinUsLinks.map((item) => (
                      <Link
                        key={item.to}
                        to={item.to}
                        className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-white"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#dff3e5] text-base">
                          {item.icon}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-[#10662A]">{item.title}</span>
                          <span className="block text-xs text-slate-500">{item.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link
              to={pricingLink.to}
              className={mobileLinkClass(isActive(pricingLink.to))}
              onClick={() => setMobileOpen(false)}
            >
              <pricingLink.icon className="h-5 w-5 shrink-0 text-[#10662A]" />
              {pricingLink.label}
            </Link>
            <Link to="/about" className={mobileLinkClass(isActive("/about"))} onClick={() => setMobileOpen(false)}>
              <Info className="h-5 w-5 shrink-0 text-[#10662A]" />
              About
            </Link>
            <Link to="/contact" className={mobileLinkClass(isActive("/contact"))} onClick={() => setMobileOpen(false)}>
              <Mail className="h-5 w-5 shrink-0 text-[#10662A]" />
              Contact
            </Link>
            <Link to="/blog" className={mobileLinkClass(isActive("/blog"))} onClick={() => setMobileOpen(false)}>
              <BookOpen className="h-5 w-5 shrink-0 text-[#10662A]" />
              Blog
            </Link>
          </div>
        </nav>

        {/* Sticky footer CTAs */}
        <div className="shrink-0 space-y-2.5 border-t border-[#e2f3e6] bg-gradient-to-t from-[#f0fdf4] to-white p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a
            href="tel:+917982953129"
            className="flex items-center justify-center gap-2 rounded-xl border border-[#cfe7d5] bg-white py-3 text-sm font-semibold text-[#10662A] transition-colors hover:bg-[#E8F7EC]"
          >
            <Phone className="h-4 w-4" />
            Call +91 79829 53129
          </a>
          <Link
            to="/check-eligibility"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#10662A] to-[#0D4F20] py-3.5 text-sm font-semibold text-white shadow-lg transition-transform active:scale-[0.98]"
            onClick={() => setMobileOpen(false)}
          >
            Apply Loan
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/login"
            className="flex items-center justify-center rounded-xl border-2 border-[#10662A] py-3 text-sm font-semibold text-[#10662A] transition-all hover:bg-[#10662A] hover:text-white"
            onClick={() => setMobileOpen(false)}
          >
            Login
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Header;

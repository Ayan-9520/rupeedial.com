import {
  ShieldCheck,
  Zap,
  Users,
  UserCheck,
  Network,
  BadgeCheck,
} from "lucide-react";

const trustPoints = [
  {
    icon: Network,
    title: "Multiple Lenders",
    desc: "Compare loan offers from multiple trusted banks on one platform.",
  },
  {
    icon: Zap,
    title: "Quick Approvals",
    desc: "Fast-track processing to get approvals in minutes, not days.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Digital Process",
    desc: "100% safe and encrypted online application journey.",
  },
  {
    icon: UserCheck,
    title: "Expert Financial Advisors",
    desc: "Dedicated loan experts to guide you at every step.",
  },
  {
    icon: Users,
    title: "Strong DSA Network",
    desc: "Wide partner network ensuring higher approval chances.",
  },
  {
    icon: BadgeCheck,
    title: "Transparent Process",
    desc: "No hidden charges with complete loan transparency.",
  },
];

export default function WhyTrustRupeeDial() {
  return (
    <section className="w-full bg-gradient-to-b from-green-50 to-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-4xl font-bold text-[#10662A]">
            Why Thousands Trust RupeeDial
          </h2>
          <p className="mt-3 text-[#390A5D]/80 max-w-2xl mx-auto">
            We simplify loan comparison with speed, security, and expert
            guidance — helping you make smarter financial decisions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trustPoints.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="group rounded-2xl border border-[#d7eadb] bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#E8F7EC] text-[#10662A] mb-4 group-hover:bg-[#10662A] group-hover:text-white transition">
                  <Icon size={22} />
                </div>

                <h3 className="text-lg font-semibold text-[#390A5D] mb-2">
                  {item.title}
                </h3>

                <p className="text-sm text-[#390A5D]/75 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
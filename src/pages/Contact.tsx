// src/pages/ContactPage.tsx
import React, { useState } from "react";
import { MapPin, PhoneCall, Send, ExternalLink } from "lucide-react";

type ContactForm = {
  name: string;
  mobile: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof ContactForm, string>>;

const ContactPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<ContactForm>({
    name: "",
    mobile: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusType, setStatusType] = useState<"success" | "error" | "">("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 3) {
      newErrors.name = "Please enter a valid name (min 3 characters).";
    }

    if (!form.mobile.trim()) {
      newErrors.mobile = "Please enter your mobile number.";
    } else if (!/^[6-9]\d{9}$/.test(form.mobile.trim())) {
      newErrors.mobile =
        "Mobile must be a valid 10-digit number starting with 6/7/8/9.";
    }

    if (form.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email.trim())) {
        newErrors.email = "Please enter a valid email address.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setStatusMessage("");
  setStatusType("");

  if (!validate()) {
    setStatusType("error");
    setStatusMessage("Please correct the highlighted fields.");
    return;
  }

  setLoading(true);

  try {
    
    
  const res = await fetch(
  "https://rupeedial.com/rupeedial-backend/public/index.php?action=contact/apply",
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  }
);
    

 

const data = await res.json();

if (!res.ok || !data.success) {
  throw new Error(data.message || "Failed");
}

setStatusType("success");
setStatusMessage(
  "Thank you! Your message has been sent. Our team will contact you shortly."
);

// ✅ ADD THIS
setSubmitted(true);

setForm({
  name: "",
  mobile: "",
  email: "",
  message: "",
});
setErrors({});

  } catch {
    setStatusType("error");
    setStatusMessage("Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  const inputClass = (hasError: boolean) =>
    `w-full rounded-lg border bg-white px-3 py-2 text-sm text-[#390A5D] placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#10662A]/30 ${
      hasError ? "border-red-400" : "border-slate-300 focus:border-[#10662A]"
    }`;

  return (
    <div className="bg-white text-[#390A5D]">
      {/* HERO SECTION */}
      <section className="bg-[#F5FFF8] border-b border-[#d8efe6]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid gap-8 lg:grid-cols-[3fr,2fr] items-center">
            {/* Left hero content */}
            <div>
              <p className="inline-flex items-center text-[11px] font-semibold uppercase tracking-[0.22em] text-[#10662A] bg-white border border-[#d8efe6] rounded-full px-3 py-1 mb-3">
                Get in touch
                <span className="ml-2 h-1.5 w-1.5 rounded-full bg-[#10662A] animate-pulse" />
              </p>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#10662A] leading-tight">
                Contact <span className="text-[#390A5D]">Rupeedial</span>
              </h1>

              <p className="mt-3 max-w-xl text-sm sm:text-base text-[#390A5D]">
                Have a question about loans, insurance or need help with your
                application? Reach out to us via phone, email or by filling the
                form below. Our team will be happy to assist you.
              </p>

              <div className="mt-5 flex flex-wrap gap-3">
                <span className="inline-flex items-center rounded-full bg-[#F5FFF8] px-3 py-1 text-xs font-medium text-[#390A5D] border border-[#d8efe6]">
                  <span className="mr-2 text-sm">📞</span> +91 79829 53129
                </span>
                <span className="inline-flex items-center rounded-full bg-[#e4f6ea] px-3 py-1 text-xs font-medium text-[#10662A] border border-[#c7ebd5]">
                  <span className="mr-2 text-sm">✉️</span> info@rupeedial.com
                </span>
                <span className="inline-flex items-center rounded-full bg-[#fcefdc] px-3 py-1 text-xs font-medium text-[#b75a00] border border-[#f4d19e]">
                  <span className="mr-2 text-sm">📍</span> New Delhi (HQ)
                </span>
              </div>
            </div>

            {/* Right hero cards */}
            <div className="grid gap-4 md:grid-cols-1">
              {/* Office Address Card */}
              <div className="rounded-2xl border border-[#d8efe6] bg-white p-4 shadow-sm">
                <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#390A5D]">
                  {/* Location Icon Circle */}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5FFF8]">
                    <MapPin className="w-4 h-4 text-[#10662A]" />
                  </span>
                  Office Address
                </h2>

                <p className="text-sm leading-relaxed text-slate-700">
                  Office No. 292, Anarkali Commercial Complex,
                  <br />
                  Jhandewalan, Near Videocon Tower,
                  <br />
                  New Delhi – 110055, India
                </p>

                <a
                  href="https://www.google.com/maps/search/?api=1&query=Office+No.+292,+Anarkali+Commercial+Complex,+Jhandewalan,+New+Delhi+110055"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center text-xs font-semibold text-[#10662A] hover:underline"
                >
                  View on Google Maps
                  <span className="ml-1">
                    <ExternalLink className="w-3 h-3" />
                  </span>
                </a>
              </div>

              {/* Help Line Card */}
              <div className="rounded-2xl border border-[#d8efe6] bg-white p-4 shadow-sm">
                <h2 className="mb-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-[#390A5D]">
                  {/* Help / Phone Icon Circle */}
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5FFF8]">
                    <PhoneCall className="w-4 h-4 text-[#10662A]" />
                  </span>
                  Help Line
                </h2>

                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Phone:</span> +91 79829 53129
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  <span className="font-semibold">Email:</span>{" "}
                  <a
                    href="mailto:info@rupeedial.com"
                    className="text-[#10662A] underline-offset-2 hover:underline"
                  >
                    info@rupeedial.com
                  </a>
                </p>

                <p className="mt-2 text-[11px] text-slate-500">
                  Timings: Monday to Saturday, 10:00 AM – 7:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT – FORM + MAP */}
      <main className="bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* LEFT – CONTACT FORM */}
            <div>
              <div className="rounded-2xl border border-[#d8efe6] bg-[#F7FAFC] shadow-sm">
                <div className="border-b border-[#d8efe6] px-5 py-4 bg-white rounded-t-2xl">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#10662A]">
                    Contact form
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-[#390A5D]">
                    Write to us
                  </h2>
                  <p className="mt-1 text-xs text-slate-600">
                    Fill in your details and we will get back to you as soon as
                    possible.
                  </p>
                </div>

                <div className="px-5 py-4">
                  {statusMessage && (
                    <div
                      className={`mb-3 rounded-lg px-3 py-2 text-xs ${
                        statusType === "success"
                          ? "bg-emerald-50 text-[#10662A] border border-[#c7ebd5]"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {statusMessage}
                    </div>
                  )}
{submitted && (
  <div className="mb-4 rounded-lg border border-[#c7ebd5] bg-[#F5FFF8] px-4 py-3 text-sm text-[#10662A]">
    ✅ Your enquiry has been successfully submitted.
    <br />
    Our team will contact you shortly.
  </div>
)}

                  {!submitted && (
  <form className="space-y-3" onSubmit={handleSubmit}>
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="mb-1 block text-xs font-medium text-slate-700"
                      >
                        Name <span className="ml-0.5 text-rose-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Enter your full name"
                        className={inputClass(!!errors.name)}
                        value={form.name}
                        onChange={handleChange}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Mobile */}
                    <div>
                      <label
                        htmlFor="mobile"
                        className="mb-1 block text-xs font-medium text-slate-700"
                      >
                        Mobile Number{" "}
                        <span className="ml-0.5 text-rose-500">*</span>
                      </label>
                      <input
                        id="mobile"
                        name="mobile"
                        type="tel"
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        className={inputClass(!!errors.mobile)}
                        value={form.mobile}
                        onChange={handleChange}
                      />
                      {errors.mobile && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.mobile}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="mb-1 block text-xs font-medium text-slate-700"
                      >
                        Email ID (optional)
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                        className={inputClass(!!errors.email)}
                        value={form.email}
                        onChange={handleChange}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-600">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="mb-1 block text-xs font-medium text-slate-700"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        placeholder="Tell us how we can help you..."
                        className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#390A5D] placeholder:text-slate-400 shadow-sm focus:border-[#10662A] focus:outline-none focus:ring-2 focus:ring-[#10662A]/30 resize-none"
                        value={form.message}
                        onChange={handleChange}
                      />
                    </div>

                   <button
  type="submit"
  disabled={loading}
  className="mt-1 inline-flex items-center justify-center rounded-lg bg-[#10662A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#0b4c20] disabled:opacity-60"
>
  <Send className="w-4 h-4 mr-2" />
  {loading ? "Sending..." : "Send Message"}
</button>



                    <p className="pt-1 text-[11px] text-slate-500">
                      By submitting this form, you authorize Rupeedial to
                      contact you via phone / email / SMS regarding your
                      enquiry.
                    </p>
                  </form>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT – MAP CARD */}
            <div>
              <div className="rounded-2xl bg-white border border-[#d8efe6] shadow-sm h-full flex flex-col">
                <div className="border-b border-[#d8efe6] px-5 py-4">
                  <h3 className="text-sm font-semibold text-[#390A5D]">
                    Our Location
                  </h3>
                  <p className="mt-1 text-xs text-slate-600">
                    Rupeedial office in New Delhi
                  </p>
                </div>
                <div className="flex-1 h-[260px] md:h-[320px] w-full overflow-hidden rounded-b-2xl">
                  <iframe
                    className="h-full w-full"
                    src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=RUPEEDIAL%20GANDHINAGAR%20BANDRA%20EAST&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    style={{ border: 0 }}
                    title="Rupeedial Location Map"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;

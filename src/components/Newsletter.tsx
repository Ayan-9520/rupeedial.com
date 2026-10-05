import { useState } from "react";
import { apiUrl, newsletterSubscribeUrl } from "../config/api";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (!trimmed) {
      setMessage({ type: "err", text: "Please enter your email address." });
      return;
    }
    if (!/\S+@\S+\.\S+/.test(trimmed)) {
      setMessage({ type: "err", text: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    setMessage(null);

    const endpoints = [apiUrl("newsletter/subscribe"), newsletterSubscribeUrl];

    try {
      let lastError = "Subscription failed. Please try again.";
      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: trimmed }),
          });
          const data = await res.json();
          if (data.success) {
            setMessage({ type: "ok", text: data.message || "Subscribed successfully!" });
            setEmail("");
            return;
          }
          lastError = data.message || lastError;
        } catch {
          /* try next */
        }
      }
      setMessage({ type: "err", text: lastError });
    } catch {
      setMessage({ type: "err", text: "Something went wrong. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-green-50 py-14 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-3">
          Get Exclusive Loan Offers & Finance Updates
        </h2>

        <p className="text-gray-600 mb-8">
          Get loan offers, EMI tips, credit card deals & smart finance updates directly in your inbox.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center max-w-2xl mx-auto">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
            disabled={loading}
            className="flex-1 border border-gray-300 rounded-full px-6 py-4 shadow-sm outline-none focus:ring-2 focus:ring-green-600 disabled:opacity-60"
          />

          <button
            type="button"
            onClick={handleSubscribe}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 font-semibold shadow-md hover:scale-105 transition-all duration-300 rounded-full disabled:opacity-60 disabled:hover:scale-100"
          >
            {loading ? "Subscribing…" : "Subscribe"}
          </button>
        </div>

        {message && (
          <p
            className={`text-sm mt-4 ${
              message.type === "ok" ? "text-green-700" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}

        <p className="text-sm text-gray-500 mt-4">
          🔒 No spam. Only useful finance updates.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;

/** Central API base — set VITE_API_BASE in .env for local/staging */
export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://rupeedial.com/rupeedial-backend/public/index.php";

export const PUBLIC_API_ROOT = API_BASE.replace(/\/index\.php$/, "");

export const EXPERT_API_BASE =
  import.meta.env.VITE_EXPERT_API_BASE ||
  "https://rupeedial.com/rupeedial-backend/api";

export function apiUrl(action: string): string {
  return `${API_BASE}?action=${encodeURIComponent(action)}`;
}

/** Standalone PHP files — work when index.php on server is outdated */
export const newsletterSubscribeUrl = `${PUBLIC_API_ROOT}/newsletter-subscribe.php`;
export const productLoanApplyUrl = `${PUBLIC_API_ROOT}/product-loan-apply.php`;

export const GRADE_LABELS: Record<string, string> = {
  L0: "Raw",
  L1: "Contactable",
  L2: "Interested",
  L3: "Verified",
  L4: "Eligible",
  L5: "Document Ready",
  L6: "Application Ready",
  Login: "Login",
  Sanction: "Sanction",
  Disbursement: "Disbursement",
};

export function gradeText(code: string | null | undefined) {
  if (!code) return "L1 Contactable";
  const label = GRADE_LABELS[code] || code;
  return code === label ? label : `${code} ${label}`;
}

export function ageLabel(iso: string | null | undefined) {
  if (!iso) return "—";
  const mins = Math.max(1, Math.round((Date.now() - new Date(iso).getTime()) / 60000));
  if (mins < 60) return `${mins} min`;
  const hrs = Math.round(mins / 60);
  if (hrs < 48) return `${hrs} hrs`;
  return `${Math.round(hrs / 24)} days`;
}

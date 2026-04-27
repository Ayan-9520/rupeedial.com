import { NavLink, useParams } from "react-router-dom";
import { autoLoanCategories } from "../../data/blogCategories";

export default function BlogCategoryTabs() {
  const { product } = useParams<{ product: string }>();

  // ❗ Only Auto Loan supported right now
  if (!product || product !== "auto-loan") return null;

  const categories = autoLoanCategories[product];

  if (!categories) return null;

  return (
    <div className="flex flex-wrap gap-4 border-b pb-3">
      {categories.map((cat) => {
        const label =
          cat === "all"
            ? "All"
            : cat.replace("-", " ").replace(/\b\w/g, (c) => c.toUpperCase());

        return (
          <NavLink
            key={cat}
            to={cat === "all" ? `/blog/${product}` : `/blog/${product}/${cat}`}
            className={({ isActive }) =>
              `text-sm font-medium pb-2 border-b-2 transition ${
                isActive
                  ? "text-green-700 border-green-700"
                  : "text-gray-500 border-transparent hover:text-green-600"
              }`
            }
          >
            {label}
          </NavLink>
        );
      })}
    </div>
  );
}

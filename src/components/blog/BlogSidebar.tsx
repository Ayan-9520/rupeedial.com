import { NavLink } from "react-router-dom";
import { blogProducts } from "../../data/blogProducts";

export default function BlogProductSidebar() {
  return (
    <div className="bg-white rounded-2xl shadow p-5 space-y-3">
      
      <h3 className="font-semibold text-lg text-[#0D4F20]">
        Blog Categories
      </h3>

      {blogProducts.map((item) => (
        <NavLink
          key={item.slug}
          to={`/blog/${item.slug}`}
          className={({ isActive }) =>
            `
            block px-4 py-3 rounded-lg text-sm font-medium transition
            ${
              isActive
                ? "bg-green-600 text-white shadow"
                : "bg-green-50 text-green-800 hover:bg-green-100"
            }
          `
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
}

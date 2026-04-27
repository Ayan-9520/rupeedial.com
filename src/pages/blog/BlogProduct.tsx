import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BlogCard from "../../components/blog/BlogCard";
import BlogProductSidebar from "../../components/blog/BlogSidebar";
import BlogCategoryTabs from "../../components/blog/BlogCategoryTabs";
import BlogHero from "../../components/blog/BlogHero";

/* ================= FRONTEND STATIC BLOGS ================= */
import { autoLoanBlogs } from "../../data/blogs/autoLoanBlogs";
import { personalLoanBlogs } from "../../data/blogs/personalLoanBlogs";
import { homeLoanBlogs } from "../../data/blogs/homeLoanBlogs";
import { lapLoanBlogs } from "../../data/blogs/lapLoanBlogs";
import { msmeLoanBlogs } from "../../data/blogs/msmeLoanBlogs";
import { machineryLoanBlogs } from "../../data/blogs/machineryLoanBlogs";
import { creditCardBlogs } from "../../data/blogs/creditCardBlogs";
import { insuranceBlogs } from "../../data/blogs/insuranceBlogs";
import { educationLoanBlogs } from "../../data/blogs/educationLoanBlogs";

export default function BlogProduct() {
  const { product, category } = useParams();
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const activeCategory = category || "all";

  useEffect(() => {
    async function loadBlogs() {
      try {
        /* 1️⃣ BACKEND BLOGS */
        const res = await fetch(
          "https://rupeedial.com/rupeedial-backend/public/index.php?action=blogs"
        );
        const backendBlogs = await res.json();

        /* 2️⃣ FRONTEND BLOG MAP (9 PRODUCTS) */
        const frontendBlogMap: Record<string, any[]> = {
          "auto-loan": autoLoanBlogs,
          "personal-loan": personalLoanBlogs,
          "home-loan": homeLoanBlogs,
          "lap-loan": lapLoanBlogs,
          "msme-loan": msmeLoanBlogs,
          "machinery-loan": machineryLoanBlogs,
          "credit-card": creditCardBlogs,
          "insurance": insuranceBlogs,
          "education-loan": educationLoanBlogs,
        };

        const frontendBlogs = frontendBlogMap[product || ""] || [];

        /* 3️⃣ MERGE (BACKEND FIRST) */
        const mergedBlogs = [
          ...(Array.isArray(backendBlogs) ? backendBlogs : []),
          ...frontendBlogs,
        ];

        setBlogs(mergedBlogs);
      } catch (err) {
        console.error("Blog fetch error", err);
      } finally {
        setLoading(false);
      }
    }

    loadBlogs();
  }, [product]);

  /* ================= FILTER (PRODUCT + CATEGORY) ================= */
/* ================= FILTER (PRODUCT + CATEGORY) ================= */

const normalize = (v?: string) =>
  v?.replace(/s$/, "").toLowerCase(); // credit-cards → credit-card

const filteredBlogs = blogs.filter((blog) => {
  if (!blog?.product) return false;

  // product match
  if (normalize(blog.product) !== normalize(product)) return false;

  // category match
  if (activeCategory === "all") return true;

  return blog.category === activeCategory;
});

  const productTitle = product
    ?.replace("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <BlogHero title={`${productTitle} Blogs`} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT SIDEBAR */}
        <aside className="lg:col-span-3">
          <BlogProductSidebar />
        </aside>

        {/* MAIN CONTENT */}
        <section className="lg:col-span-9 space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-[#0D4F20]">
              {productTitle} Blogs
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Latest guides, eligibility, EMI tips & expert advice
            </p>
          </div>

          <BlogCategoryTabs />

          {loading ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              Loading blogs...
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              No blogs available.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog) => (
                <BlogCard key={blog.slug} blog={blog} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

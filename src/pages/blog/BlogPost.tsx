import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import BlogHero from "../../components/blog/BlogHero";
import BlogProductSidebar from "../../components/blog/BlogSidebar";
import BlogRightSidebar from "../../components/blog/BlogRightSidebar";

/* ALL FRONTEND BLOGS */
import { autoLoanBlogs } from "../../data/blogs/autoLoanBlogs";
import { personalLoanBlogs } from "../../data/blogs/personalLoanBlogs";
import { homeLoanBlogs } from "../../data/blogs/homeLoanBlogs";
import { lapLoanBlogs } from "../../data/blogs/lapLoanBlogs";
import { msmeLoanBlogs } from "../../data/blogs/msmeLoanBlogs";
import { machineryLoanBlogs } from "../../data/blogs/machineryLoanBlogs";
import { creditCardBlogs } from "../../data/blogs/creditCardBlogs";
import { insuranceBlogs } from "../../data/blogs/insuranceBlogs";
import { educationLoanBlogs } from "../../data/blogs/educationLoanBlogs";

export default function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);

  useEffect(() => {
    async function loadBlog() {
      try {
        // 1️⃣ BACKEND FIRST
        const res = await fetch(
          `https://rupeedial.com/rupeedial-backend/public/index.php?action=blogs/${slug}`
        );
        const data = await res.json();

        if (data?.slug) {
          setBlog(data);
          return;
        }

        // 2️⃣ FRONTEND FALLBACK
        const allFrontendBlogs = [
          ...autoLoanBlogs,
          ...personalLoanBlogs,
          ...homeLoanBlogs,
          ...lapLoanBlogs,
          ...msmeLoanBlogs,
          ...machineryLoanBlogs,
          ...creditCardBlogs,
          ...insuranceBlogs,
          ...educationLoanBlogs,
        ];

        setBlog(allFrontendBlogs.find((b) => b.slug === slug) || null);
      } catch (err) {
        console.error(err);
      }
    }

    loadBlog();
  }, [slug]);

  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <BlogHero title={blog.title} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3">
          <BlogProductSidebar />
        </aside>

       <main className="lg:col-span-6 w-full min-w-0">
  <article className="bg-[#F9FFF6] rounded-2xl shadow p-8">
    {blog.image && (
      <img
        src={
          blog.image.startsWith("http")
            ? blog.image
            : `/images/blogs/${blog.image}`
        }
        alt={blog.title}
        className="w-full h-[320px] object-cover rounded-xl mb-6"
      />
    )}

    <h1 className="text-3xl font-bold text-[#0D4F20] mb-6">
      {blog.title}
    </h1>

    <div
      className="prose prose-green max-w-none"
      dangerouslySetInnerHTML={{ __html: blog.content }}
    />
  </article>
</main>

        <aside className="lg:col-span-3">
          <BlogRightSidebar
            currentSlug={blog.slug}
            product={blog.product}
            category={blog.category}
          />
        </aside>
      </div>
    </div>
  );
}

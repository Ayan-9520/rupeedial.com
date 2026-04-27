import { Link } from "react-router-dom";

/* ALL FRONTEND BLOG SOURCES */
import { autoLoanBlogs } from "../../data/blogs/autoLoanBlogs";
import { personalLoanBlogs } from "../../data/blogs/personalLoanBlogs";
import { homeLoanBlogs } from "../../data/blogs/homeLoanBlogs";
import { lapLoanBlogs } from "../../data/blogs/lapLoanBlogs";
import { msmeLoanBlogs } from "../../data/blogs/msmeLoanBlogs";
import { machineryLoanBlogs } from "../../data/blogs/machineryLoanBlogs";
import { creditCardBlogs } from "../../data/blogs/creditCardBlogs";
import { insuranceBlogs } from "../../data/blogs/insuranceBlogs";
import { educationLoanBlogs } from "../../data/blogs/educationLoanBlogs";

interface Props {
  currentSlug: string;
  product: string;
  category?: string;
}

export default function BlogRightSidebar({
  currentSlug,
  product,
}: Props) {
  /* PRODUCT → BLOG MAP */
  const blogMap: Record<string, any[]> = {
    "auto-loan": autoLoanBlogs,
    "personal-loan": personalLoanBlogs,
    "home-loan": homeLoanBlogs,
    "lap-loan": lapLoanBlogs,
    "msme-loan": msmeLoanBlogs,
    "machinery-loan": machineryLoanBlogs,
    "credit-card": creditCardBlogs,
    insurance: insuranceBlogs,
    "education-loan": educationLoanBlogs,
  };

  const relatedBlogs =
    blogMap[product]
      ?.filter((b) => b.slug !== currentSlug)
      .slice(0, 4) || [];

  if (relatedBlogs.length === 0) return null;

  return (
    <div className="space-y-6">
      {/* CTA BOX */}
      <div className="bg-green-900 text-white p-6 rounded-xl">
        <h3 className="text-lg font-semibold">Check Loan Eligibility</h3>
        <p className="text-sm mt-1">
          Compare banks & get best interest rates.
        </p>
        <Link
          to="/check-eligibility"
          className="inline-block mt-3 bg-white text-green-900 px-4 py-2 rounded-lg font-medium"
        >
          Check Now →
        </Link>
      </div>

      {/* RELATED BLOGS */}
      <div className="bg-white rounded-xl shadow p-4">
        <h4 className="font-semibold text-gray-800 mb-4">
          Related Blogs
        </h4>

        <div className="space-y-4">
          {relatedBlogs.map((blog) => (
            <Link
              key={blog.slug}
              to={`/blog/post/${blog.slug}`}
              className="flex gap-3 items-start"
            >
              {blog.image && (
                <img
                  src={`/images/blogs/${blog.image}`}
                  alt={blog.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}

              <div>
                <p className="text-sm font-medium text-gray-800 leading-snug">
                  {blog.title}
                </p>
                {blog.category && (
                  <span className="text-xs text-green-600">
                    {blog.category.replace("-", " ")}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

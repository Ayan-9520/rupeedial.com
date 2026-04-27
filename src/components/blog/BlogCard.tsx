import { Link } from "react-router-dom";

export default function BlogCard({ blog }: any) {
  return (
    <div className="bg-green-50 rounded-2xl shadow p-4 flex flex-col">
      {/* IMAGE */}
      <div className="w-full h-[180px] overflow-hidden rounded-xl bg-gray-100">
        {blog.image && (
          <img
            src={
              blog.image.startsWith("http")
                ? blog.image
                : `/images/blogs/${blog.image}`
            }
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) =>
              ((e.target as HTMLImageElement).style.display = "none")
            }
          />
        )}
      </div>

      {/* CONTENT */}
      <h3 className="font-semibold text-purple-800 text-lg mt-4 line-clamp-2">
        {blog.title}
      </h3>

      <p className="text-sm text-gray-600 mt-1 line-clamp-3">
        {blog.excerpt}
      </p>

      <Link
        to={`/blog/post/${blog.slug}`}
        className="mt-auto inline-block pt-3 text-green-700 font-medium"
      >
        Read More →
      </Link>
    </div>
  );
}

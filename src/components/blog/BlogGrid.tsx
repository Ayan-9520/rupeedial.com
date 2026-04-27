import BlogCard from "./BlogCard";

export default function BlogGrid({ blogs }: { blogs: any[] }) {
  if (!blogs.length) {
    return <p className="text-gray-500">No blogs found.</p>;
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((b) => (
        <BlogCard key={b.id} blog={b} />
      ))}
    </div>
  );
}

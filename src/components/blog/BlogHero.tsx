interface BlogHeroProps {
  title?: string;
}

export default function BlogHero({ title }: BlogHeroProps) {
  return (
    <div className="w-full mb-10">
      <img
        src="/images/blogs/new-car-2.png"
        alt={title ?? "Loan Blogs"}
        className="w-full h-[160px] object-cover rounded-xl"
      />
    </div>
  );
}

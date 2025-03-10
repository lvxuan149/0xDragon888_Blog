import Image from 'next/image';
import Link from 'next/link';

const BlogList = ({ posts }) => {
  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <Link href={`/blogs/${post.slug}`} key={post.slug}>
          <div className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {post.meta.banner && (
              <div className="relative h-48 w-full">
                <Image
                  src={post.meta.banner.src || post.meta.banner}
                  alt={post.meta.title}
                  className="object-cover"
                  fill
                  priority
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-2">{post.meta.title}</h2>
              <p className="text-gray-600 mb-2">{post.meta.description}</p>
              <div className="flex items-center text-sm text-gray-500">
                <span>{post.meta.date}</span>
                <span className="mx-2">•</span>
                <span>{post.meta.author}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {post.meta.tags?.map((tag) => (
                  <span key={tag} className="bg-gray-100 px-2 py-1 rounded-md text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default BlogList;
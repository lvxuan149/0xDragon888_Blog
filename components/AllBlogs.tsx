import Image from 'next/image';  // 添加这行导入
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import { formatDate } from "@/lib/formatDate";

const Blog = ({ article, hoveredIndex, setHoveredIndex, idx }: any) => {
  return (
    <Link
      className="relative md:p-8"
      href={`/blogs/${article.slug}`}
      onMouseEnter={() => setHoveredIndex(idx)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* 添加图片显示 */}
      {article.banner && (
        <div className="relative w-full h-48 mb-4">
          <Image
            src={article.banner}
            alt={article.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
      )}
      
      <AnimatePresence>
        {hoveredIndex === idx && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-zinc-800/[0.8]  rounded-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <div className="relative z-50">
        <small className="md:border-l md:border-zinc-700 md:pl-4 text-zinc-500 block">
          {formatDate(article.date)}
        </small>
        <h2 className="text-zinc-200 font-bold text-lg mt-4">
          {article.title}
        </h2>
        <p className="text-zinc-200 font-normal text-sm mt-4 leading-loose max-w-4xl">
          {article.description}
        </p>
        
        {/* Display categories */}
        {article.categories && article.categories.length > 0 && (
          <div className="flex gap-2 mt-4">
            {article.categories.map((category: string) => (
              <span 
                key={category} 
                className="text-xs px-2 py-1 bg-zinc-700/50 text-zinc-400 rounded"
              >
                {category}
              </span>
            ))}
          </div>
        )}
        
        <p className="text-primary-900 text-sm mt-6 block">Read More</p>
      </div>
    </Link>
  );
};

export default function AllBlogs({ blogs }: any) {
  console.log(blogs); // 检查 blogs 数据结构
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);
  
  // Get category and tag from URL query parameters
  const { category, tag } = router.query;
  
  // Filter blogs based on category or tag
  useEffect(() => {
    if (category) {
      setFilteredBlogs(
        blogs.filter((blog: any) => 
          blog.categories?.includes(category as string)
        )
      );
    } else if (tag) {
      setFilteredBlogs(
        blogs.filter((blog: any) => 
          blog.tags?.includes(tag as string)
        )
      );
    } else {
      setFilteredBlogs(blogs);
    }
  }, [blogs, category, tag]);
  
  // Display active filter if any
  const activeFilter = category || tag;
  
  return (
    <div className="">
      {activeFilter && (
        <div className="mb-8 flex items-center">
          <span className="text-zinc-400">Filtered by: </span>
          <span className="ml-2 px-3 py-1 bg-zinc-800 text-primary-900 rounded-full text-sm">
            {activeFilter as string}
          </span>
          <button 
            onClick={() => router.push('/blogs')}
            className="ml-2 text-zinc-500 hover:text-zinc-300"
            aria-label="Clear filter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
      
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-zinc-400">No blogs found for this filter.</p>
          <button 
            onClick={() => router.push('/blogs')}
            className="mt-4 px-4 py-2 bg-zinc-800 text-primary-900 rounded-md hover:bg-zinc-700 transition-colors"
          >
            View all blogs
          </button>
        </div>
      ) : (
        <div className="flex max-w-3xl flex-col space-y-16">
          {filteredBlogs.map((article: any, idx: number) => (
            <Blog
              key={article.slug}
              article={article}
              idx={idx}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
            />
          ))}
        </div>
      )}
    </div>
  );
}

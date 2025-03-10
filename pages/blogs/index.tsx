import Head from "next/head";

import { formatDate } from "@/lib/formatDate";

import { getAllBlogs } from "@/lib/getAllBlogs";
import { Container } from "@/components/Container";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import AllBlogs from "@/components/AllBlogs";
import { getUserRepositories } from "@/lib/github";
import { Repository } from "@/types/repos";

export default function BlogsPage({ blogs }: any) {
  // Extract all unique categories and tags from blogs
  const allCategories = Array.from(
    new Set(blogs.flatMap((blog: any) => blog.categories || []))
  ) as string[];
  
  const allTags = Array.from(
    new Set(blogs.flatMap((blog: any) => blog.tags || []))
  ) as string[];
  
  // Count occurrences of each tag for popularity
  const tagCounts = blogs.flatMap((blog: any) => blog.tags || [])
    .reduce((acc: Record<string, number>, tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {});
  
  // Sort tags by popularity (count)
  const popularTags = Object.keys(tagCounts)
    .sort((a, b) => tagCounts[b] - tagCounts[a])
    .slice(0, 10); // Get top 10 tags

  console.log(blogs); // 检查 blogs 的值

  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    const loadRepos = async () => {
      const fetchedRepos = await getUserRepositories('0xDragon888');
      setRepos(fetchedRepos);
    };
    loadRepos();
  }, []);

  console.log(repos); // 检查 repos 的值

  return (
    <Container title={`Blogs | 0xDragon888`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 md:mt-20 relative">
        <div>
          <h1 className="font-bold text-3xl md:text-5xl md:leading-tight max-w-3xl">
            <span className="text-zinc-900 dark:text-white">All of my</span>
            <span className="text-primary-900 dark:text-primary-900"> Technical Knowledge</span>
            <span className="text-zinc-900 dark:text-white"> in one place</span>
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base max-w-2xl mt-8 md:leading-loose tracking-wide">
            I'm obsessed with writing bad code. I'm also obsessed with writing.
            Here, I write about my experiences with code and the things I've
            learned along the way.
          </p>
        </div>
        
        <div className="mt-20 flex flex-col md:flex-row gap-10">
          <div className="md:w-2/3">
            <AllBlogs blogs={blogs} />
          </div>
          
          <div className="md:w-1/3 space-y-8">
            {/* Categories section */}
            <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Categories</h2>
              <div className="flex flex-col gap-2">
                {allCategories.map((category: string) => (
                  <div key={category} className="flex items-center justify-between">
                    <Link 
                      href={`/blogs?category=${encodeURIComponent(category)}`}
                      className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700/70 hover:bg-primary-100 dark:hover:bg-primary-900/20 text-zinc-700 dark:text-zinc-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-full text-sm transition-colors"
                    >
                      {category}
                      <span className="text-zinc-500 ml-1">
                        ({blogs.filter((blog: any) => blog.categories?.includes(category)).length})
                      </span>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Popular tags section */}
            <div className="bg-white dark:bg-zinc-800/50 rounded-xl p-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-4">Popular Tags</h2>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag: string) => (
                  <Link 
                    key={tag}
                    href={`/blogs?tag=${encodeURIComponent(tag)}`}
                    className="px-3 py-1 bg-zinc-200 dark:bg-zinc-700/70 hover:bg-primary-100 dark:hover:bg-primary-900/20 text-zinc-700 dark:text-zinc-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-full text-sm transition-colors"
                  >
                    {tag} <span className="text-zinc-500">({tagCounts[tag]})</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const blogs = await getAllBlogs();
  console.log('Available blogs:', blogs.length); // 添加日志以验证博客数量
  
  return {
    props: {
      blogs: blogs.map(({ component, ...meta }) => meta),
    },
  };
}

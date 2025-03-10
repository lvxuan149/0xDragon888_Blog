import { useRouter } from 'next/router'
import Link from 'next/link'
import { Container } from '@/components/Container'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { ThemeToggle } from '@/components/ThemeToggle'

interface BlogLayoutProps {
  children: React.ReactNode
  meta: {
    title: string
    date: string
    categories?: string[]
    tags?: string[]
  }
  isRssFeed?: boolean
  previousPathname?: string
}

export function BlogLayout({ children, meta, isRssFeed = false, previousPathname }: BlogLayoutProps) {
  const router = useRouter()

  if (isRssFeed) {
    return children
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-xl font-bold text-gray-900 dark:text-white">
                0xDragon888
              </Link>
              <Link href="/blogs" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Blogs
              </Link>
            </nav>
            <div className="flex items-center space-x-6">
              <Link href="/contact" className="text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
                Contact Me
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose dark:prose-invert max-w-none">
          <div className="mb-8 space-y-4">
            {previousPathname && (
              <button
                type="button"
                onClick={() => router.back()}
                className="flex items-center text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                返回
              </button>
            )}
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl text-gray-900 dark:text-white">
              {meta.title}
            </h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
              <time dateTime={meta.date}>{formatDate(meta.date)}</time>
            </div>
            {meta.categories && meta.categories.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500 dark:text-gray-400">分类：</span>
                {meta.categories.map(category => (
                  <Link
                    key={category}
                    href={`/blogs?category=${encodeURIComponent(category)}`}
                    className="text-sm bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
            {meta.tags && meta.tags.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-500 dark:text-gray-400">标签：</span>
                {meta.tags.map(tag => (
                  <Link
                    key={tag}
                    href={`/blogs?tag=${encodeURIComponent(tag)}`}
                    className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}
          </div>
          {children}
        </article>
      </main>
    </div>
  )
}

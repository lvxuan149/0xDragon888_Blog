import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // 等待客户端挂载完成
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
      aria-label="切换主题"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
      ) : (
        <MoonIcon className="h-5 w-5 text-zinc-900 dark:text-zinc-100" />
      )}
    </button>
  )
}
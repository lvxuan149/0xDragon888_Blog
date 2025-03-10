import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider 
      attribute="class" 
      enableSystem={true} 
      defaultTheme="light"    // 已经设置为 light
      disableTransitionOnChange={false}
    >
      <div className="min-h-screen antialiased bg-white dark:bg-zinc-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  )
}

export default App

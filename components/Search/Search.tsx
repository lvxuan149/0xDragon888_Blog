import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { HiOutlineSearch } from 'react-icons/hi';

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [pagefind, setPagefind] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadPagefind = async () => {
      try {
        // 动态加载 pagefind 脚本
        const script = document.createElement('script');
        script.src = '/_pagefind/pagefind.js';
        await new Promise((resolve, reject) => {
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });
        // @ts-ignore
        setPagefind(window.pagefind);
      } catch (error) {
        console.error('Failed to load pagefind:', error);
      }
    };
    loadPagefind();
  }, []);

  const handleSearch = async (value: string) => {
    setSearch(value);
    if (!value || !pagefind) return setResults([]);
    
    const search = await pagefind.search(value);
    const results = await Promise.all(search.results.map((r: any) => r.data()));
    setResults(results);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center text-sm font-medium text-zinc-400 hover:text-zinc-200"
      >
        <HiOutlineSearch className="h-5 w-5 mr-1" />
        Search
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24"
      >
        <div className="fixed inset-0 bg-zinc-900/50 backdrop-blur" />
        
        <Dialog.Panel className="relative w-full max-w-xl transform rounded-xl bg-zinc-800 p-6 shadow-2xl">
          <input
            type="text"
            placeholder="..."
            className="w-full bg-zinc-700 text-zinc-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />

          {results.length > 0 && (
            <div className="mt-4 max-h-[60vh] overflow-auto">
              {results.map((result, index) => (
                <a
                  key={index}
                  href={result.url}
                  className="block p-4 hover:bg-zinc-700 rounded-lg mt-2"
                  onClick={() => setIsOpen(false)}
                >
                  <h3 className="text-zinc-200 font-medium">{result.meta.title}</h3>
                  <p className="text-zinc-400 text-sm mt-1">{result.excerpt}</p>
                </a>
              ))}
            </div>
          )}
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ChunkErrorBoundary } from '../src/components/ui/ChunkErrorBoundary'
import { motion, AnimatePresence } from 'framer-motion'

export const Route = createFileRoute('/code')({
  component: CodeWithErrorBoundary,
})

function CodeWithErrorBoundary() {
  return (
    <ChunkErrorBoundary chunkName="code">
      <Code />
    </ChunkErrorBoundary>
  )
}

interface Repository {
  name: string
  description: string
  language: string
  license?: string
  url: string
  updated: string
  stars: number
  forks: number
}

async function fetchRepositories(): Promise<Repository[]> {
  const response = await fetch('/repos.json')

  if (!response.ok) {
    throw new Error(`Failed to load repository data`)
  }

  const data = await response.json()
  return data.repos
}

const languageColors: Record<string, string> = {
  Rust: '#DEA584',
  TypeScript: '#3178C6',
  Zig: '#F7A41D',
  Swift: '#F05138',
  CSS: '#563D7C',
  Other: '#888888',
}

function Code() {
  const [activeLanguage, setActiveLanguage] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const { data: repositories = [], isLoading } = useQuery({
    queryKey: ['githubRepos'],
    queryFn: fetchRepositories,
    staleTime: 3600000,
  })

  const languages = Array.from(new Set(repositories.map(r => r.language))).sort()

  const filteredRepos = repositories
    .filter(repo => {
      const languageMatch = activeLanguage === 'all' || repo.language === activeLanguage
      const searchMatch = searchQuery === '' ||
        repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        repo.description.toLowerCase().includes(searchQuery.toLowerCase())
      return languageMatch && searchMatch
    })

  const tabs = [
    { id: 'all', label: `All (${repositories.length})` },
    ...languages.map(lang => ({
      id: lang,
      label: `${lang} (${repositories.filter(r => r.language === lang).length})`,
    })),
  ]

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl mb-6 text-[#1B3022] tracking-tighter leading-none font-serif italic"
          >
            Code
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-[#1B3022]/60 font-serif italic max-w-2xl mx-auto mb-12"
          >
            Open-source projects growing in the garden.
          </motion.p>

          <div className="flex justify-center mb-12 overflow-x-auto pb-4 scrollbar-hide md:max-w-6xl md:mx-auto md:w-full">
            <div className="bg-white/50 backdrop-blur-sm p-1 rounded-full sketch-border border-[#1B3022]/5 flex flex-wrap md:flex-nowrap gap-0.5 md:gap-1 md:w-full md:justify-center">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveLanguage(tab.id)}
                  className={`px-3 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-bold uppercase tracking-widest transition-all duration-300 ${
                    activeLanguage === tab.id
                      ? 'bg-[#1B3022] text-white shadow-lg scale-105'
                      : 'text-[#1B3022]/40 hover:text-[#1B3022] hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <svg
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1B3022]/30"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search repositories..."
                className="w-full bg-white/50 backdrop-blur-sm pl-14 pr-6 py-4 rounded-full sketch-border border-[#1B3022]/5 text-[#1B3022] placeholder-[#1B3022]/30 text-sm focus:outline-none focus:border-[#5F7D61]/30 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1B3022]/30 hover:text-[#1B3022] transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLanguage + searchQuery}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl sketch-border border-[#1B3022]/5 animate-pulse">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-5 h-5 bg-[#1B3022]/10 rounded" />
                        <div className="h-5 w-32 bg-[#1B3022]/10 rounded" />
                      </div>
                      <div className="h-4 w-full bg-[#1B3022]/5 rounded mb-2" />
                      <div className="h-4 w-3/4 bg-[#1B3022]/5 rounded mb-4" />
                      <div className="flex gap-4">
                        <div className="h-3 w-16 bg-[#1B3022]/5 rounded" />
                        <div className="h-3 w-24 bg-[#1B3022]/5 rounded ml-auto" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredRepos.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredRepos.map((repo, index) => (
                    <motion.a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="group bg-white/50 backdrop-blur-sm p-6 rounded-2xl sketch-border border-[#1B3022]/5 hover:shadow-lg hover:border-[#5F7D61]/20 transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-[#5F7D61]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                          <h3 className="font-bold text-[#1B3022] group-hover:text-[#5F7D61] transition-colors">
                            {repo.name}
                          </h3>
                        </div>
                        <svg className="w-4 h-4 text-[#1B3022]/20 group-hover:text-[#5F7D61] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>

                      <p className="text-sm text-[#1B3022]/60 mb-4 leading-relaxed line-clamp-2">
                        {repo.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-[#1B3022]/40">
                        <span className="flex items-center gap-1.5">
                          <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{ backgroundColor: languageColors[repo.language] || '#888' }}
                          />
                          {repo.language}
                        </span>
                        {repo.stars > 0 && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                            </svg>
                            {repo.stars}
                          </span>
                        )}
                        {repo.forks > 0 && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7V3m10 4V3M5 21h14a2 2 0 002-2V7H3v12a2 2 0 002 2zM12 10v4m0 0l-2-2m2 2l2-2" />
                            </svg>
                            {repo.forks}
                          </span>
                        )}
                        {repo.license && (
                          <span className="flex items-center gap-1">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                            </svg>
                            {repo.license}
                          </span>
                        )}
                        <span className="ml-auto">
                          Updated {new Date(repo.updated).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-6xl mb-6 opacity-20">🍂</div>
                  <h3 className="text-2xl font-serif italic text-[#1B3022]/40">No repositories found...</h3>
                  <button
                    onClick={() => { setSearchQuery(''); setActiveLanguage('all') }}
                    className="mt-6 text-[#D4A373] font-bold hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/pastel-sketchbook"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#5F7D61] hover:text-[#1B3022] font-bold text-sm uppercase tracking-widest transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View all on GitHub
          </a>
        </motion.div>
      </div>
    </div>
  )
}

/**
 * Classify unlinked wiki videos into book chapters based on topic/tag overlap.
 * Uses filtered Jaccard similarity with stop word removal and minimum overlap.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

interface WikiVideoDetail {
  summary: string
  takeaways: string[]
  topics: string[]
  related?: { id: string; sharedTopics: string[] }[]
}

interface WikiVideo {
  id: string
  title: string
  views: number
  date: string
  category: string
  tags?: string[]
  detail?: WikiVideoDetail
}

interface WikiCategory {
  name: string
  description: string
  related: string[]
  videoCount: number
  totalViews: number
  topTags: { tag: string; count: number }[]
  clusters: { name: string; videos: WikiVideo[] }[]
  videos: WikiVideo[]
}

interface WikiBundle {
  generatedAt: string
  totalVideos: number
  categories: WikiCategory[]
  crossCategoryTags: { tag: string; categories: string[]; videos: { id: string; title: string; views: number; date: string; category: string }[] }[]
}

interface BookChapter {
  number: number
  title: string
  summary: string
  videoIds: string[]
  tags: string[]
}

interface Book {
  id: string
  title: string
  subtitle: string
  description: string
  chapters: BookChapter[]
}

interface BooksData {
  generatedAt: string
  books: Book[]
}

const STOP_WORDS = new Set([
  'this', 'that', 'the', 'and', 'for', 'with', 'from', 'into', 'via',
  'but', 'not', 'are', 'was', 'has', 'its', 'can', 'how', 'new',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight',
  'nine', 'ten', 'first', 'second', 'layer', 'level', 'old', 'end',
  'era', 'age', 'world', 'core', 'over', 'each', 'does', 'set',
  'our', 'out', 'key', 'big', 'top', 'low', 'far', 'get', 'way',
  'make', 'made', 'case', 'code', 'deep', 'true', 'real', 'best',
  'some', 'than', 'more', 'most', 'much', 'also', 'even', 'just',
  'well', 'part', 'role', 'kind', 'form', 'year', 'years', 'time',
  'long', 'very', 'still', 'across', 'within', 'without', 'high',
  'between', 'through', 'during', 'before', 'after', 'above',
  'below', 'under', 'about', 'around', 'every', 'where',
])

const CATEGORY_CHAPTER_MAP: Record<string, Set<number>> = {
  kubernetes: new Set([1, 2, 3, 4, 5, 8, 9, 10]),
  development: new Set([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]),
  finance: new Set([7, 9, 10]),
  security: new Set([2, 16]),
  programming: new Set([10, 11, 17]),
  korea: new Set([]),
}

// -- Normalize helpers --

function norm(s: string): string {
  return s.toLowerCase().replace(/[-_\s]+/g, ' ').trim()
}

function tokenize(s: string): string[] {
  return norm(s)
    .split(/[\s,;:.!?()/\\&]+/)
    .filter((t) => t.length > 2 && !STOP_WORDS.has(t))
}

function tagTokens(s: string): string[] {
  return norm(s)
    .split(/[-_\s]+/)
    .filter((t) => t.length > 1 && !STOP_WORDS.has(t))
}

function jaccardFiltered(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0
  let intersection = 0
  for (const item of a) {
    if (b.has(item)) intersection++
  }
  const union = a.size + b.size - intersection
  return union === 0 ? 0 : intersection / union
}

// -- Load data --

function loadJSON<T>(rel: string): T {
  return JSON.parse(readFileSync(resolve(ROOT, 'public', rel), 'utf-8')) as T
}

const wiki = loadJSON<WikiBundle>('wiki-bundle.json')
const books = loadJSON<BooksData>('books.json')

// -- Book lookup --

const linkedVideos = new Set<string>()
for (const book of books.books) {
  for (const ch of book.chapters) {
    for (const vid of ch.videoIds) {
      linkedVideos.add(vid)
    }
  }
}

// -- Chapter profiles with meaningful tokens only --

interface ChapterSig {
  bookId: string
  bookTitle: string
  number: number
  title: string
  sig: Set<string> // combined meaningful signature words
}

function buildChapterSigs(): ChapterSig[] {
  return books.books.flatMap((book) =>
    book.chapters.map((ch) => {
      const sig = new Set<string>()

      // Tags are high-signal
      for (const t of ch.tags) {
        for (const tok of tagTokens(t)) sig.add(tok)
      }

      // Extract topic-significant words from summary (capitalized nouns, key terms)
      const summaryLower = ch.summary.toLowerCase()
      const significantWords = [
        'kubernetes', 'cluster', 'etcd', 'kubelet', 'pod', 'zero', 'trust',
        'spire', 'cilium', 'istio', 'workload', 'identity', 'aks', 'acr',
        'azure', 'ai', 'mlops', 'pipeline', 'gitops', 'microservices',
        'grpc', 'rabbitmq', 'cdc', 'debezium', 'networking', 'ingress',
        'observability', 'tracing', 'opentelemetry', 'event', 'driven',
        'architecture', 'control', 'plane', 'wealth', 'retirement',
        'compound', 'interest', 'hedonic', 'treadmill', 'clickhouse',
        'database', 'frontend', 'solidjs', 'tanstack', 'tauri', 'desktop',
        'repository', 'pattern', 'rfc', 'tcp', 'udp', 'http', 'tls',
        'memory', 'alignment', 'zero', 'copy', 'cache', 'simd', 'vector',
        'rust', 'hyper', 'axum', 'tonic', 'tokio', 'tower', 'serde',
        'thiserror', 'anyhow', 'go', 'goroutine', 'gc', 'concurrency',
        'onnx', 'candle', 'burn', 'inference', 'badgerdb', 'scylladb',
        'duckdb', 'helm', 'lsm', 'flutter', 'dart', 'impeller', 'wasm',
        'dio', 'riverpod', 'genkit', 'cryptography', 'aead', 'tink',
        'argon2', 'password', 'mojo', 'llvm', 'ownership',
        'database', 'data', 'streaming', 'change', 'capture',
        'compiler', 'zig', 'comptime', 'programming', 'language',
        'machine', 'learning', 'inference', 'ml', 'enterprise',
      ]
      for (const w of significantWords) {
        if (summaryLower.includes(w)) sig.add(w)
      }

      // Extract specific keywords from summary
      const summaryTokens = tokenize(ch.summary)
      for (const t of summaryTokens) {
        // Only add longer/more specific tokens
        if (t.length > 4 || t.includes('-') || t.includes('.')) sig.add(t)
      }

      return {
        bookId: book.id,
        bookTitle: book.title,
        number: ch.number,
        title: ch.title,
        sig,
      }
    }),
  )
}

const chapterSigs = buildChapterSigs()

// -- Also build a keyword index per chapter from the summary for matching --

interface ChapterKeywordIndex {
  bookId: string
  bookTitle: string
  number: number
  title: string
  keywords: string[]
}

function buildKeywordIndex(): ChapterKeywordIndex[] {
  return books.books.flatMap((book) =>
    book.chapters.map((ch) => {
      const summary = ch.summary.toLowerCase()
      const keywords: string[] = []

      // Extract chapter-specific keywords from summary
      const topicWords = [
        'kubernetes', 'cluster', 'control plane', 'etcd', 'scheduler',
        'kubelet', 'pod', 'reconciliation', 'city planning',
        'zero trust', 'spire', 'cilium', 'istio', 'l3', 'l4', 'l7',
        'workload identity', 'perimeter security', 'firewall',
        'azure devops', 'acr', 'aks', 'azure ai', 'ai pipeline',
        'ci/cd', 'gitops', 'canary', 'blue-green',
        'microservices', 'rest', 'messaging', 'event-driven', 'cdc',
        'change data capture', 'kubenet', 'azure cni', 'ingress',
        'shift-left', 'conventional commits', 'trunk-based',
        'hedonic treadmill', 'wealth', '401k', 'ira', 'social security',
        'retirement red zone', 'compound interest',
        'clickhouse', 'distributed complexity', 'ai agents',
        'w3c trace context', 'opentelemetry', 'debezium', 'push architecture',
        'compensating transactions', 'strangler fig',
        'solidjs', 'async signals', 'tauri', 'velox', 'tanstack query',
        'repository pattern', 'esm',
        'rfc 862', 'rfc 2119', 'ip', 'tcp', 'udp', 'dns', 'http', 'tls',
        'poisson', 'tweedie', 'shannon', 'throughput',
        'memory layout', 'alignment', 'sendfile', 'apache arrow',
        'simd', 'vector', 'struct of arrays', 'array of structs',
        'hyper', 'axum', 'tonic', 'protobuf',
        'tokio', 'rayon', 'tower', 'thiserror', 'anyhow', 'sqlx',
        'serde', 'ron', 'feature flags',
        'louvain', 'leiden', 'community detection',
        'tigerbeetle', 'tigerstyle', 'nasa power of ten',
        'zig', 'comptime', 'allocator', 'error sets', 'simd',
        'go', 'goroutine', 'green tea gc', 'scheduler',
        'onnx', 'candle', 'burn', 'ssa', 'wasm',
        'badgerdb', 'lsm-tree', 'scylladb', 'shared-nothing',
        'duckdb', 'helixdb', 'graph-vector',
        'flutter', 'canvaskit', 'impeller', 'dart',
        'dio', 'riverpod', 'genkit', 'agent skills',
        'aead', 'tink', 'argon2id', 'password hashing',
        'mojo', 'ownership', 'functional programming',
        'distributed', 'system design', 'architecture',
        'security', 'identity', 'authentication',
        'data', 'storage', 'database',
      ]
      for (const w of topicWords) {
        if (summary.includes(w)) keywords.push(w)
      }

      return {
        bookId: book.id,
        bookTitle: book.title,
        number: ch.number,
        title: ch.title,
        keywords,
      }
    }),
  )
}

const keywordIndex = buildKeywordIndex()

// -- Classification --

interface ClassifiedVideo {
  id: string
  title: string
  views: number
  category: string
  tags: string[]
  topics: string[]
  bestBook: string
  bestChapter: number
  bestChapterTitle: string
  score: number
  matchReason: string
}

function classifyVideo(v: WikiVideo): ClassifiedVideo | null {
  // Build video signature (meaningful tokens only)
  const videoSig = new Set<string>()

  if (v.tags) {
    for (const t of v.tags) {
      for (const tok of tagTokens(t)) videoSig.add(tok)
    }
  }

  if (v.detail?.topics) {
    for (const t of v.detail.topics) {
      for (const tok of tagTokens(t)) videoSig.add(tok)
    }
  }

  if (v.detail?.summary) {
    // Add significant domain words from summary
    const summaryLower = v.detail.summary.toLowerCase()
    const domainWords = [
      'kubernetes', 'k8s', 'cluster', 'pod', 'deployment', 'service',
      'istio', 'envoy', 'service mesh', 'zero trust', 'identity',
      'aks', 'azure', 'docker', 'container', 'helm',
      'rust', 'cargo', 'tokio', 'axum', 'tonic', 'tower', 'serde',
      'zig', 'comptime', 'allocator', 'simd', 'vectorize',
      'go', 'golang', 'goroutine', 'channel', 'gc',
      'flutter', 'dart', 'impeller', 'riverpod', 'dio',
      'database', 'sqlite', 'duckdb', 'postgres', 'badgerdb',
      'redis', 'scylladb', 'dynamodb',
      'frontend', 'react', 'solidjs', 'tauri', 'tanstack',
      'observability', 'opentelemetry', 'tracing', 'metrics',
      'ai', 'llm', 'machine learning', 'pipeline',
      'security', 'authentication', 'oauth', 'zero trust',
      'networking', 'tcp', 'http', 'grpc', 'dns',
      'architecture', 'design pattern', 'microservices',
      'event', 'streaming', 'cdc', 'debezium',
      'memory', 'cache', 'performance', 'optimization',
      'type', 'safety', 'error', 'handling',
      'crypto', 'encryption', 'aead', 'tink',
      'compiler', 'intermediate', 'representation',
      'platform', 'enterprise', 'cloud', 'native',
      'agent', 'workflow', 'automation', 'cli',
      'testing', 'quality', 'review', 'deployment',
      'finance', 'wealth', 'retirement', 'investing',
      'trading', 'market', 'stock', 'etf', 'portfolio',
      'probability', 'statistics', 'risk', 'model',
      'korea', 'travel', 'spanish', 'language',
      'graph', 'algorithm', 'community', 'detection',
      'scalability', 'reliability', 'resilience',
    ]
    for (const w of domainWords) {
      if (summaryLower.includes(w)) videoSig.add(w)
    }
  }

  // Also extract from title
  const titleLower = v.title.toLowerCase()
  const titleKeywords = ['rust', 'zig', 'go', 'flutter', 'dart', 'kubernetes', 'k8s',
    'aks', 'azure', 'simd', 'tcp', 'http', 'dns', 'tls', 'rfc',
    'memory', 'cache', 'simd', 'algorithm', 'database', 'sql',
    'ai', 'llm', 'agent', 'pipeline', 'frontend', 'react',
    'observability', 'tracing', 'opentelemetry',
    'microservices', 'grpc', 'rest', 'api',
    'security', 'zero trust', 'identity', 'oauth',
    'compiler', 'type', 'serialization',
    'flutter', 'wasm', 'desktop', 'tauri',
    'architecture', 'design', 'pattern',
    'cryptography', 'encryption', 'password',
    'finance', 'wealth', 'retirement', 'market',
    'zig', 'comptime', 'allocator',
    'go', 'goroutine', 'concurrency',
    'rust', 'tokio', 'axum', 'tower',
  ]
  for (const w of titleKeywords) {
    if (titleLower.includes(w)) videoSig.add(w)
  }

  // Tally chapter votes
  interface ChapterVote {
    bookTitle: string
    chapterNumber: number
    chapterTitle: string
    bookId: string
    score: number
    reasons: string[]
  }

  const votes: ChapterVote[] = []

  // Method 1: Jaccard on filtered sigs
  for (const sig of chapterSigs) {
    const baseScore = jaccardFiltered(videoSig, sig.sig)
    if (baseScore === 0) continue

    // Find matching terms
    const overlap: string[] = []
    for (const t of videoSig) {
      if (sig.sig.has(t)) overlap.push(t)
    }

    // Count meaningful matches (exclude very short generic terms)
    const meaningfulMatches = overlap.filter((t) => t.length > 3 || t.includes('-')).length

    // Require at least 2 meaningful matches for a real connection
    if (meaningfulMatches >= 2) {
      const reason = overlap.slice(0, 6).join(', ')
      votes.push({
        bookTitle: sig.bookTitle,
        chapterNumber: sig.number,
        chapterTitle: sig.title,
        bookId: sig.bookId,
        score: baseScore,
        reasons: [reason],
      })
    }
  }

  // Method 2: Keyword matching
  const categories = v.detail?.topics ? v.detail.topics.map((t) => t.toLowerCase()) : []
  for (const idx of keywordIndex) {
    let matchCount = 0
    const matched: string[] = []
    for (const kw of idx.keywords) {
      // Check in video summary
      if (v.detail?.summary && v.detail.summary.toLowerCase().includes(kw)) {
        matchCount++
        matched.push(kw)
        continue
      }
      // Check in video topics
      if (categories.some((c) => c.includes(kw))) {
        matchCount++
        matched.push(kw)
        continue
      }
      // Check in title
      if (titleLower.includes(kw)) {
        matchCount++
        matched.push(kw)
        continue
      }
      // Check in tags
      if (v.tags?.some((t) => tagTokens(t).includes(kw))) {
        matchCount++
        matched.push(kw)
        continue
      }
    }

    if (matchCount >= 2) {
      const existing = votes.find(
        (v) => v.bookId === idx.bookId && v.chapterNumber === idx.number,
      )
      const kwScore = matchCount / Math.max(idx.keywords.length, 1)
      if (existing) {
        existing.score = Math.max(existing.score, kwScore)
        existing.reasons.push(`keywords: ${matched.slice(0, 5).join(', ')}`)
      } else {
        votes.push({
          bookTitle: idx.bookTitle,
          chapterNumber: idx.number,
          chapterTitle: idx.title,
          bookId: idx.bookId,
          score: kwScore,
          reasons: [`keywords: ${matched.slice(0, 5).join(', ')}`],
        })
      }
    }
  }

  // Apply category filter
  const allowedChapters = CATEGORY_CHAPTER_MAP[v.category] || new Set<number>()
  const filtered = votes.filter((v) => allowedChapters.size === 0 || allowedChapters.has(v.chapterNumber))

  if (filtered.length === 0) return null

  // Pick best
  filtered.sort((a, b) => b.score - a.score)

  const best = filtered[0]
  const allReasons = Array.from(new Set(best.reasons.flatMap((r) => r.split('; ').map((s) => s.trim()))))
  return {
    id: v.id,
    title: v.title,
    views: v.views,
    category: v.category,
    tags: v.tags ?? [],
    topics: v.detail?.topics ?? [],
    bestBook: best.bookTitle,
    bestChapter: best.chapterNumber,
    bestChapterTitle: best.chapterTitle,
    score: Math.round(best.score * 1000) / 1000,
    matchReason: allReasons.slice(0, 3).join('; '),
  }
}

// -- Run --

const allVideos: WikiVideo[] = []
for (const cat of wiki.categories) {
  for (const v of cat.videos) {
    if (!linkedVideos.has(v.id)) {
      allVideos.push({ ...v, category: cat.name })
    }
  }
}

const classified: ClassifiedVideo[] = []
const unclassified: WikiVideo[] = []

for (const v of allVideos) {
  const result = classifyVideo(v)
  if (result) {
    classified.push(result)
  } else {
    unclassified.push(v)
  }
}

classified.sort((a, b) => b.score - a.score || b.views - a.views)

// -- Output --

console.log('\n=== CLASSIFIED VIDEOS ===\n')
console.log(`Total missing: ${allVideos.length}`)
console.log(`Classified: ${classified.length}`)
console.log(`Unclassified: ${unclassified.length}\n`)

const byBook = new Map<string, ClassifiedVideo[]>()
for (const c of classified) {
  const key = c.bestBook
  if (!byBook.has(key)) byBook.set(key, [])
  byBook.get(key)!.push(c)
}

for (const [book, videos] of byBook) {
  const byChapter = new Map<number, ClassifiedVideo[]>()
  for (const v of videos) {
    if (!byChapter.has(v.bestChapter)) byChapter.set(v.bestChapter, [])
    byChapter.get(v.bestChapter)!.push(v)
  }

  console.log(`\n═══ ${book.toUpperCase()} ═══`)
  console.log(`Total candidates: ${videos.length}`)

  const sortedChapters = [...byChapter.entries()].sort((a, b) => a[0] - b[0])
  for (const [chNum, chVids] of sortedChapters) {
    const chTitle = chVids[0].bestChapterTitle
    const totalViews = chVids.reduce((s, v) => s + v.views, 0)
    console.log(`\n  Ch ${chNum}: ${chTitle} (${chVids.length} videos, ${fmtViews(totalViews)} views)`)
    chVids.sort((a, b) => b.score - a.score || b.views - a.views)
    for (const v of chVids) {
      const cat = v.category.padEnd(14)
      const score = v.score.toFixed(3)
      const views = String(v.views).padStart(5)
      console.log(`    [${cat}] s:${score} v:${views}  ${v.title}`)
      if (v.matchReason) {
        console.log(`           → ${v.matchReason}`)
      }
    }
  }
}

if (unclassified.length > 0) {
  console.log('\n\n=== UNCLASSIFIED ===\n')
  for (const v of unclassified) {
    const cat = v.category.padEnd(14)
    const views = String(v.views).padStart(5)
    console.log(`  [${cat}] v:${views}  ${v.title}`)
    if (v.tags && v.tags.length > 0) {
      console.log(`           tags: ${v.tags.join(', ')}`)
    }
  }
}

const output = {
  generatedAt: new Date().toISOString(),
  classified: classified.map((c) => ({
    videoId: c.id,
    title: c.title,
    category: c.category,
    bookId: books.books.find((b) => b.title === c.bestBook)?.id ?? '',
    chapterNumber: c.bestChapter,
    score: c.score,
    matchReason: c.matchReason,
  })),
  unclassified: unclassified.map((v) => ({
    videoId: v.id,
    title: v.title,
    category: v.category,
    tags: v.tags ?? [],
  })),
}

const outPath = resolve(ROOT, 'public', 'book-classification.json')
writeFileSync(outPath, JSON.stringify(output, null, 2))
console.log(`\n\nDetailed JSON written to public/book-classification.json`)

function fmtViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

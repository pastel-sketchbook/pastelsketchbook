/**
 * Merge book classification results into books.json.
 * Reads current books.json + book-classification.json, produces updated books.json
 * with new videos added to their matched chapters.
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const PUBLIC = resolve(ROOT, 'public')

// -- Load --

const books = JSON.parse(readFileSync(resolve(PUBLIC, 'books.json'), 'utf-8'))
const classification = JSON.parse(readFileSync(resolve(PUBLIC, 'book-classification.json'), 'utf-8'))

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

// Build lookup: bookId → Map<chapterNumber, chapter>
const bookLookup = new Map<string, Map<number, BookChapter>>()
for (const book of books.books) {
  const chapters = new Map<number, BookChapter>()
  for (const ch of book.chapters) {
    chapters.set(ch.number, ch)
  }
  bookLookup.set(book.id, chapters)
}

// -- Track additions --

type Addition = {
  videoId: string
  title: string
  category: string
  score: number
  matchReason: string
}

const additions: Addition[] = []
const alreadyPresent: string[] = []
const noChapterMatch: Addition[] = []

// -- Merge --

for (const entry of classification.classified) {
  const chapters = bookLookup.get(entry.bookId)
  if (!chapters) {
    noChapterMatch.push(entry)
    continue
  }

  const chapter = chapters.get(entry.chapterNumber)
  if (!chapter) {
    noChapterMatch.push(entry)
    continue
  }

  if (chapter.videoIds.includes(entry.videoId)) {
    alreadyPresent.push(entry.videoId)
    continue
  }

  chapter.videoIds.push(entry.videoId)
  additions.push({
    videoId: entry.videoId,
    title: entry.title,
    category: entry.category,
    score: entry.score,
    matchReason: entry.matchReason,
  })
}

// -- Deduplicate within each chapter (some videos may appear in multiple classifications) --
for (const book of books.books) {
  for (const ch of book.chapters) {
    ch.videoIds = [...new Set(ch.videoIds)]
  }
}

// -- Compute new stats --
const addedVideos = additions.length
const totalVideos = books.books.reduce(
  (s: number, b: Book) => s + b.chapters.reduce((cs: number, c: BookChapter) => cs + c.videoIds.length, 0),
  0,
)
const totalChapters = books.books.reduce((s: number, b: Book) => s + b.chapters.length, 0)

// -- Update generatedAt --
books.generatedAt = new Date().toISOString()

// -- Write --

const outPath = resolve(PUBLIC, 'books.json')
writeFileSync(outPath, JSON.stringify(books, null, 2))

// -- Report --

console.log(`📚 Updated books.json`)
console.log()
console.log(`  Added:     ${addedVideos} videos across ${totalChapters} chapters`)
console.log(`  Total now: ${totalVideos} videos (was ${totalVideos - addedVideos})`)
console.log(`  Skipped:   ${alreadyPresent.length} already present`)
console.log(`  No match:  ${noChapterMatch.length} unassignable`)
console.log()

// Per-book breakdown
for (const book of books.books) {
  const bookAdded = additions.filter((a) => {
    const chapters = bookLookup.get(book.id)
    return chapters?.has(
      classification.classified.find((c: { videoId: string }) => c.videoId === a.videoId)?.chapterNumber ?? 0,
    )
  })
  const chBreakdown = book.chapters
    .map((ch: BookChapter) => {
      const chAdditions = additions.filter((a) => {
        const entry = classification.classified.find(
          (c: { videoId: string }) => c.videoId === a.videoId,
        )
        return entry && entry.bookId === book.id && entry.chapterNumber === ch.number
      })
      return { num: ch.number, title: ch.title, before: ch.videoIds.length - chAdditions.length, after: ch.videoIds.length, added: chAdditions.length }
    })
    .filter((c: { added: number }) => c.added > 0)

  if (chBreakdown.length > 0) {
    console.log(`── ${book.title} ──`)
    for (const ch of chBreakdown) {
      console.log(`  Ch ${ch.num}: ${ch.title}`)
      console.log(`           ${ch.before} → ${ch.after} videos (+${ch.added})`)
    }
    console.log()
  }
}

if (noChapterMatch.length > 0) {
  console.log(`⚠ ${noChapterMatch.length} videos could not be placed (check bookId/chapter mismatch):`)
  for (const n of noChapterMatch.slice(0, 5)) {
    console.log(`  - [${n.category}] ${n.title} → ${n.bookId} ch${n.chapterNumber}`)
  }
}

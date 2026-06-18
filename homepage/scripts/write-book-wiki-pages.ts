/**
 * Write book classification results as zmd-indexed markdown pages in wiki/books/.
 * Run after classify-to-books.ts generates public/book-classification.json.
 * Then `zmd update` to reindex.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const WIKI = resolve(ROOT, '..', 'wiki')

interface ClassifiedEntry {
  videoId: string
  title: string
  category: string
  bookId: string
  chapterNumber: number
  score: number
  matchReason: string
}

interface ClassificationOutput {
  generatedAt: string
  classified: ClassifiedEntry[]
  unclassified: { videoId: string; title: string; category: string; tags: string[] }[]
}

// -- Load classification --

const classification = JSON.parse(
  readFileSync(resolve(ROOT, 'public', 'book-classification.json'), 'utf-8'),
) as ClassificationOutput

const BOOK_LABELS: Record<string, string> = {
  'architects-sketchbook': "The Architect's Sketchbook",
  'internals-companion': 'The Internals Companion',
}

// Group by book → chapter
const byBook = new Map<string, Map<number, ClassifiedEntry[]>>()
for (const entry of classification.classified) {
  if (!byBook.has(entry.bookId)) byBook.set(entry.bookId, new Map())
  const chapters = byBook.get(entry.bookId)!
  if (!chapters.has(entry.chapterNumber)) chapters.set(entry.chapterNumber, [])
  chapters.get(entry.chapterNumber)!.push(entry)
}

// Ensure wiki/books/ exists
const booksDir = resolve(WIKI, 'books')
mkdirSync(booksDir, { recursive: true })

// Helper: map category to readable label
function catLabel(c: string): string {
  const labels: Record<string, string> = {
    development: 'Development',
    kubernetes: 'Kubernetes',
    finance: 'Finance',
    security: 'Security',
    programming: '프로그래밍',
    korea: 'Learn Spanish',
  }
  return labels[c] || c.charAt(0).toUpperCase() + c.slice(1)
}

// -- Write book index page --

function writeBookIndex() {
  const lines: string[] = [
    '# Book Classification',
    '',
    `Auto-generated classification of wiki videos into books and chapters.`,
    `Generated: ${classification.generatedAt}`,
    '',
    `- **Classified**: ${classification.classified.length} videos`,
    `- **Unclassified**: ${classification.unclassified.length} videos`,
    '',
    '---',
    '',
  ]

  for (const [bookId, chapters] of byBook) {
    const bookLabel = BOOK_LABELS[bookId] || bookId
    const total = [...chapters.values()].reduce((s, v) => s + v.length, 0)
    const totalViews = [...chapters.values()]
      .flat()
      .reduce((s, v) => s + (classification.classified.find((c) => c.videoId === v.videoId) ? 1 : 0), 0)
    lines.push(`## ${bookLabel}`)
    lines.push('')
    lines.push(`| Chapter | Videos | Top Picks |`)
    lines.push(`|---------|--------|-----------|`)
    const sortedCh = [...chapters.entries()].sort((a, b) => a[0] - b[0])
    for (const [chNum, entries] of sortedCh) {
      const top3 = entries
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map((e) => `[${e.title}](zmd://wiki/books/${bookId}-ch${chNum}.md)`)
        .join(', ')
      const count = entries.length
      lines.push(`| ${chNum} | ${count} | ${top3} |`)
    }
    lines.push('')
  }

  // Unclassified
  if (classification.unclassified.length > 0) {
    lines.push('---')
    lines.push('')
    lines.push('## Unclassified')
    lines.push('')
    lines.push('| Category | Title | Tags |')
    lines.push('|----------|-------|------|')
    const byCat = new Map<string, typeof classification.unclassified>()
    for (const u of classification.unclassified) {
      if (!byCat.has(u.category)) byCat.set(u.category, [])
      byCat.get(u.category)!.push(u)
    }
    for (const [cat, entries] of byCat) {
      for (const e of entries) {
        const tags = e.tags.length > 0 ? e.tags.join(', ') : '-'
        lines.push(`| ${catLabel(cat)} | ${e.title} | ${tags} |`)
      }
    }
    lines.push('')
  }

  const outPath = resolve(booksDir, 'index.md')
  writeFileSync(outPath, lines.join('\n'))
  console.log(`Wrote ${outPath}`)
}

// -- Write per-book chapter pages --

function writeChapterPages() {
  for (const [bookId, chapters] of byBook) {
    const bookLabel = BOOK_LABELS[bookId] || bookId
    const mdBookId = bookId

    for (const [chNum, entries] of chapters) {
      const lines: string[] = [
        `# ${bookLabel} — Chapter ${chNum}`,
        '',
        `Book: \`${bookId}\``,
        '',
        `**${entries.length} videos** classified to this chapter.`,
        '',
        '| # | Video | Category | Score | Views | Match Reason |',
        '|---|-------|----------|-------|-------|-------------|',
      ]

      entries
        .sort((a, b) => b.score - a.score)
        .forEach((e, i) => {
          const vidLink = `[${e.title}](https://youtu.be/${e.videoId})`
          const cat = catLabel(e.category)
          const score = e.score.toFixed(3)
          lines.push(
            `| ${i + 1} | ${vidLink} | ${cat} | ${score} | [detail](zmd://wiki/videos/details/${e.videoId}.md) | ${e.matchReason || '-'} |`,
          )
        })

      lines.push('')
      lines.push('---')
      lines.push(`_Auto-classified at ${classification.generatedAt}_`)

      const outPath = resolve(booksDir, `${mdBookId}-ch${chNum}.md`)
      writeFileSync(outPath, lines.join('\n'))
      console.log(`Wrote ${outPath}`)
    }
  }
}

// -- Write per-book overview pages --

function writeBookOverviewPages() {
  for (const [bookId, chapters] of byBook) {
    const bookLabel = BOOK_LABELS[bookId] || bookId
    const mdBookId = bookId

    const lines: string[] = [
      `# ${bookLabel} — Classified Videos`,
      '',
      `Overview of all ${[...chapters.values()].reduce((s, v) => s + v.length, 0)} videos classified to this book.`,
      '',
      '## Contents',
      '',
    ]

    const sortedCh = [...chapters.entries()].sort((a, b) => a[0] - b[0])
    for (const [chNum, entries] of sortedCh) {
      const count = entries.length
      lines.push(`- [Chapter ${chNum}](zmd://wiki/books/${mdBookId}-ch${chNum}.md) — ${count} videos`)
    }

    lines.push('')
    lines.push('---')
    lines.push(`_Auto-classified at ${classification.generatedAt}_`)

    const outPath = resolve(booksDir, `${mdBookId}.md`)
    writeFileSync(outPath, lines.join('\n'))
    console.log(`Wrote ${outPath}`)
  }
}

// -- Also append book references to existing detail pages where applicable --

function annotateDetailPages() {
  let annotated = 0
  for (const entry of classification.classified) {
    const detailPath = resolve(WIKI, 'videos', 'details', `${entry.videoId}.md`)
    try {
      let content = readFileSync(detailPath, 'utf-8')

      // Check if already annotated
      if (content.includes('<!-- book-classification -->')) continue

      const bookLabel = BOOK_LABELS[entry.bookId] || entry.bookId
      const annotation = `
<!-- book-classification -->
_Belongs to: **[${bookLabel}](zmd://wiki/books/${entry.bookId}.md) — Chapter ${entry.chapterNumber}** (confidence: ${(entry.score * 100).toFixed(0)}%)_
`
      // Append before the last line or at end
      content = content.trimEnd() + annotation

      writeFileSync(detailPath, content)
      annotated++
    } catch {
      // Detail page might not exist, skip
    }
  }
  console.log(`Annotated ${annotated} detail pages with book references`)
}

// -- Main --

console.log('Writing book wiki pages...')
writeBookIndex()
writeBookOverviewPages()
writeChapterPages()
annotateDetailPages()

console.log('\nDone. Run `zmd update wiki` to reindex.')

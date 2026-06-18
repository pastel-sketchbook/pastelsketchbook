import type { WikiBundle } from '../types/wiki'

export interface BookChapter {
  number: number
  title: string
  summary: string
  videoIds: string[]
  tags: string[]
}

export interface Book {
  id: string
  title: string
  subtitle: string
  description: string
  chapters: BookChapter[]
}

export interface BooksData {
  generatedAt: string
  books: Book[]
}

export interface BookRef {
  bookId: string
  bookTitle: string
  chapterNumber: number
  chapterTitle: string
}

export async function fetchBooks(): Promise<BooksData> {
  const res = await fetch('/books.json')
  if (!res.ok) throw new Error(`Failed to load books: ${res.status}`)
  return res.json()
}

export function buildBookVideoLookup(books: BooksData): Map<string, BookRef[]> {
  const map = new Map<string, BookRef[]>()
  for (const book of books.books) {
    for (const chapter of book.chapters) {
      for (const vid of chapter.videoIds) {
        const refs = map.get(vid) || []
        refs.push({
          bookId: book.id,
          bookTitle: book.title,
          chapterNumber: chapter.number,
          chapterTitle: chapter.title,
        })
        map.set(vid, refs)
      }
    }
  }
  return map
}

export function buildCategoryBookLookup(books: BooksData, wiki: WikiBundle): Map<string, BookRef[]> {
  const videoToRefs = buildBookVideoLookup(books)
  const categoryMap = new Map<string, BookRef[]>()
  for (const cat of wiki.categories) {
    const refs: BookRef[] = []
    for (const v of cat.videos) {
      const videoRefs = videoToRefs.get(v.id)
      if (videoRefs) {
        for (const r of videoRefs) {
          if (!refs.some((existing) => existing.bookId === r.bookId && existing.chapterNumber === r.chapterNumber)) {
            refs.push(r)
          }
        }
      }
    }
    if (refs.length > 0) {
      categoryMap.set(cat.name, refs)
    }
  }
  return categoryMap
}

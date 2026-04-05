import { WikiBundleSchema, type WikiBundle } from '../types/wiki'

// -- Display Labels --

export const CATEGORY_LABELS: Record<string, string> = {
  korea: 'Learn Spanish',
  programming: '\ud504\ub85c\uadf8\ub798\ubc0d',
}

export const CATEGORY_COLORS: Record<string, string> = {
  development: '#e05562',
  kubernetes: '#34c4a0',
  finance: '#e09030',
  korea: '#4ab0c8',
  security: '#d06898',
  programming: '#d4a520',
}

// -- Formatters --

export function fmtViews(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

export function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export function catLabel(name: string): string {
  return CATEGORY_LABELS[name] || name.charAt(0).toUpperCase() + name.slice(1)
}

// -- Data Fetching --

export async function fetchWikiBundle(): Promise<WikiBundle> {
  const response = await fetch('/wiki-bundle.json')
  if (!response.ok) throw new Error(`Failed to load wiki: ${response.status}`)
  const data = await response.json()
  return WikiBundleSchema.parse(data)
}

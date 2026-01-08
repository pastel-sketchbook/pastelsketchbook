/**
 * Centralized video configuration
 * Single source of truth for all video IDs across the app
 */

import { z } from 'zod'

// Schema for validating video metadata responses
export const VideoMetadataSchema = z.object({
  id: z.string(),
  title: z.string(),
  views: z.number().nonnegative(),
  date: z.string().datetime()
})

export const VideoMetadataResponseSchema = z.object({
  videos: z.array(VideoMetadataSchema),
  source: z.enum(['api', 'fallback', 'placeholder']).optional(),
  timestamp: z.string().datetime().optional()
})

export type VideoMetadata = z.infer<typeof VideoMetadataSchema>
export type VideoMetadataResponse = z.infer<typeof VideoMetadataResponseSchema>

export const VIDEO_CONFIG = {
  korea: [
    'V2cZl5s4EKU',
    'G3ys6d2w3yc',
    'L9sxbq8ugoU',
    'vNHblhm9oQo',
    '4h84JgKkt94',
    'a6KG7zSZfwo',
    'CASZX56r-tk',
    'EvcUSPWkOA8',
    'JlPl9MskqJM',
    'drVBXipEOAs'
  ],
  finance: [
    's1BoGn9r7oE',
    'EMXUbohWsWs',
    'KBfVy5-M-5k',
    'MDNRiJN7aEg',
    'nnL78ZVifZU',
    'tPDFgVAp4c4',
    '0Wtng6Ou3O4',
    '-WYyOwj8EYU'
  ],
  kubernetes: ['A7eoKD5m6Ek', 'snRi_JET1bg', '8ycnldvJmuA', 'ftODZr2_V5Q'],
  development: [
    'z_Ydy_-cI1U',
    'axvxGj3yOgA',
    'Xhq99-YHXCY',
    'PNFlYx8HiOM',
    'pzVOjl6mOD4',
    'olsB3bJxA2A',
    'IF5sNQH-01c',
    '2kvYb2pVe5o',
    'TLqdeHlAo3A',
    'SHa7rFntlkU'
  ]
} as const

export const allVideoIds = [
  ...VIDEO_CONFIG.korea,
  ...VIDEO_CONFIG.finance,
  ...VIDEO_CONFIG.kubernetes,
  ...VIDEO_CONFIG.development
]

export const videoCategories: Record<string, keyof typeof VIDEO_CONFIG> = {}

Object.entries(VIDEO_CONFIG).forEach(([category, ids]) => {
  ids.forEach((id) => {
    videoCategories[id] = category as keyof typeof VIDEO_CONFIG
  })
})

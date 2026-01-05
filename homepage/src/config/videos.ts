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
    'L9sxbq8ugoU',
    'vNHblhm9oQo',
    '4h84JgKkt94',
    'CASZX56r-tk',
    'EvcUSPWkOA8',
    'JlPl9MskqJM',
    'drVBXipEOAs'
  ],
  finance: [
    'tPDFgVAp4c4',
    'nnL78ZVifZU',
    'MDNRiJN7aEg',
    'KBfVy5-M-5k',
    'EMXUbohWsWs'
  ],
  kubernetes: ['8ycnldvJmuA', 'ftODZr2_V5Q'],
  development: [
    'Xhq99-YHXCY',
    'PNFlYx8HiOM',
    'pzVOjl6mOD4',
    'olsB3bJxA2A',
    'IF5sNQH-01c',
    '2kvYb2pVe5o',
    'TLqdeHlAo3A'
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

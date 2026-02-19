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
  date: z.string().datetime(),
  tags: z.array(z.string()).optional()
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
    'drVBXipEOAs',
    'awa_UWXFOao',
    'nxuaOP3C1Ns',
    'QLcNRIHYmj0',
    'rwNfzJanPmk',
    'rxQvDuohbt8',
    'kvdBJSRUchA'
  ],
  finance: [
    '9z6mOWQgU84',
    'bn-Nvmxgur8',
    'ybR0RxXj2_M',
    'K1O4kHjFJaQ',
    'MBnVggs6k5g',
    'nfD3KzIriM8',
    's1BoGn9r7oE',
    'EMXUbohWsWs',
    'KBfVy5-M-5k',
    'MDNRiJN7aEg',
    'nnL78ZVifZU',
    'tPDFgVAp4c4'
  ],
  kubernetes: ['mYClRFIlsFc', '7eoxSgjwYlM', '5Ztm7JNVa8E', 'P_xUJi_qt-Q', 'okVlu1qseI4', 'eI2DXGISpbk', 'MIZ0ATwu7C0', 'rgY4KTMFOMs', 'BsiQrEaF3kU', 'Q4qm1hvVR2A', 'WHonjixQgBY', 'KpSjLQpswW4', '4b-H6ZaoNUE', '_sxPf3tHq3s', '0U-SUJCmKAU', 'VxWyvAO3qb8', 'A4-foXsdQiA', 'C6wLm6NRZW4', 'ctKLD4d146g', 'OnwiaDRj1-k', 'R2zktRqz81U', 'N4nRAfBZ3BE', 'C5HqbzLRYZ0', 'rJTUB-u8U2Y', 'A7eoKD5m6Ek', 'snRi_JET1bg', '8ycnldvJmuA', 'ftODZr2_V5Q'],
  development: [
    'QBUQvfZJpaM',
    '5Vloo08zQ7o',
    '5-ZNXQegVhs',
    'kQc99Io3pCo',
    'JfGgWiiCTA0',
    'zwVDEAKKPZY',
    'cWozmWrqnxs',
    'joYJ6rPN3UI',
    'Qo3oJv4uyBI',
    'cEwAbu6FFRo',
    'IZX3_9rZeMU',
    'KDnTY0Svmr0',
    'qxOOl1hx1zU',
    '0Sed1oggMKY',
    'A96r5gqwUrI',
    'ZlEq2jFb8tI',
    'TmlqoKqMD2Y',
    '5st-kLcNrE8',
    'xV2EAL3NAVM',
    '2Ni8zfsxW6o',
    'd_0swhS1LyQ',
    'TDWC1fFhn9g',
    'V2LbQqD1lMM',
    'h31-NtagNoU',
    'o9yaniXkM-0',
    'RDa6WtZmW8E',
    'gBb1zn-QtY4',
    'Ul0ixBpd5iM',
    '43UjmZtW2JU',
    'US7oyxbcJCc',
    'DCGTYftRGWE',
    '3Fpey_L_XRU',
    'cJl2cchaHL8',
    'qbBA7GWZbu4',
    'P58Zt8A_1Mc',
    'MaP2i4dTiQk',
    'Pp36ysjfWd8',
    'JBh6rzeS-Qc',
    '9yov-ZVv-Bo',
    'xVmoqBYlQMU',
    '5KB2zLGjaps',
    'LWc3AAHoxnU',
    'Z06RjO-zFxI',
    'HOetEEw0ogM',
    '0NLj8g2hQNk',
    '0ttrfTfP864',
    'SeYrpzDTn6A',
    'FDYu2fllfuE',
    'tmerUd7eiy4',
    'tqDisu2tmG0',
    '9oSUtndLto4',
    'yOOQNnaOLeM',
    '4_mBGmXA244',
    'KCuGqld6nOc',
    'B2x09utLjtM',
    '7zFqW-ZcEbo',
    'js95nIDeA-c',
    'BAxPZdgmgRQ',
    'z_Ydy_-cI1U',
    'axvxGj3yOgA',
    'Xhq99-YHXCY',
    'PNFlYx8HiOM',
    'pzVOjl6mOD4',
    'olsB3bJxA2A',
    'IF5sNQH-01c',
    '2kvYb2pVe5o',
    'TLqdeHlAo3A',
    'FdmBtPScnQs'
  ],
  programming: [
    'T5FjMjTQCBI',
    'F6aMGDfVAFg',
    'D1Hth_78ftg',
    'gKYw0_jkNFI',
    'qyqLjeu8Hng',
    'iEn_PMcBlDk',
    'dsxuWtfzBGI',
    'GVq5DvGFLpI'
  ]
} as const

export const allVideoIds = [
  ...VIDEO_CONFIG.korea,
  ...VIDEO_CONFIG.finance,
  ...VIDEO_CONFIG.kubernetes,
  ...VIDEO_CONFIG.development,
  ...VIDEO_CONFIG.programming
]

export const videoCategories: Record<string, keyof typeof VIDEO_CONFIG> = {}

Object.entries(VIDEO_CONFIG).forEach(([category, ids]) => {
  ids.forEach((id) => {
    videoCategories[id] = category as keyof typeof VIDEO_CONFIG
  })
})

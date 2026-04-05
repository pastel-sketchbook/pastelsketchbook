import { z } from 'zod'

// -- Zod Schemas --

export const WikiVideoSchema = z.object({
  id: z.string(),
  title: z.string(),
  views: z.number().nonnegative(),
  date: z.string(),
})

export const WikiClusterSchema = z.object({
  name: z.string(),
  videos: z.array(WikiVideoSchema),
})

export const WikiCategorySchema = z.object({
  name: z.string(),
  description: z.string(),
  related: z.array(z.string()),
  videoCount: z.number().nonnegative(),
  totalViews: z.number().nonnegative(),
  topTags: z.array(z.object({ tag: z.string(), count: z.number() })),
  clusters: z.array(WikiClusterSchema),
  videos: z.array(WikiVideoSchema),
})

export const WikiBundleSchema = z.object({
  generatedAt: z.string(),
  totalVideos: z.number().nonnegative(),
  categories: z.array(WikiCategorySchema),
  crossCategoryTags: z.array(
    z.object({
      tag: z.string(),
      categories: z.array(z.string()),
    }),
  ),
})

// -- Inferred Types --

export type WikiVideo = z.infer<typeof WikiVideoSchema>
export type WikiCluster = z.infer<typeof WikiClusterSchema>
export type WikiCategory = z.infer<typeof WikiCategorySchema>
export type WikiBundle = z.infer<typeof WikiBundleSchema>

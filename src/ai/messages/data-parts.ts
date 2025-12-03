import z from 'zod'

export const errorSchema = z.object({
  message: z.string(),
})

export const dataPartSchema = z.object({
  'tweet-search': z.object({
    query: z.string(),
    status: z.enum(['searching', 'done', 'error']),
    resultsCount: z.number().optional(),
    results: z.array(z.object({
      title: z.string(),
      url: z.string(),
      author: z.string().optional(),
      text: z.string().optional(),
      publishedDate: z.string().optional(),
      score: z.number().optional(),
    })).optional(),
    error: errorSchema.optional(),
  }),
})

export type DataPart = z.infer<typeof dataPartSchema>


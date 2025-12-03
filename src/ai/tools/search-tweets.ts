import { tool } from 'ai'
import { z } from 'zod'
import Exa from 'exa-js'
import type { UIMessage, UIMessageStreamWriter } from 'ai'

interface Params {
  writer: UIMessageStreamWriter<UIMessage>
}

export function searchTweets({ writer }: Params) {
  return tool({
    description: 'Search for tweets using the Exa API. Use this when users ask to find or search for tweets about specific topics.',
    parameters: z.object({
      query: z.string().describe('The search query for finding tweets'),
      numResults: z.number().optional().default(10).describe('Number of results to return (default: 10)'),
    }),
    execute: async ({ query, numResults }) => {
      try {
        const exaApiKey = process.env.EXA_API_KEY
        
        if (!exaApiKey) {
          throw new Error('EXA_API_KEY is not configured')
        }

        const exa = new Exa(exaApiKey)
        
        const result = await exa.searchAndContents(query, {
          category: 'tweet',
          text: true,
          type: 'auto',
          numResults,
        })

        // Write a data part to show we're processing
        writer.writeData({
          type: 'tweet-search-progress',
          query,
          resultsFound: result.results.length,
        })

        return {
          success: true,
          query,
          resultsCount: result.results.length,
          results: result.results.map((tweet: any) => ({
            title: tweet.title,
            url: tweet.url,
            author: tweet.author,
            text: tweet.text,
            publishedDate: tweet.publishedDate,
            score: tweet.score,
          })),
        }
      } catch (error) {
        console.error('Error searching tweets:', error)
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Failed to search tweets',
        }
      }
    },
  })
}

import { tool } from 'ai'
import { z } from 'zod'
import Exa from 'exa-js'
import type { UIMessage, UIMessageStreamWriter } from 'ai'
import type { DataPart } from '../messages/data-parts'

interface Params {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>
}

export function searchTweets({ writer }: Params) {
  return tool({
    description: 'Search for tweets using the Exa API. Use this when users ask to find or search for tweets about specific topics. Always use this tool when users want to find tweets.',
    inputSchema: z.object({
      query: z.string().describe('The search query for finding tweets'),
      numResults: z.number().optional().default(10).describe('Number of results to return (default: 10)'),
    }),
    execute: async ({ query, numResults }, { toolCallId }) => {
      // Write initial status
      writer.write({
        id: toolCallId,
        type: 'data-tweet-search',
        data: {
          query,
          status: 'searching',
        },
      })

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

        const formattedResults = result.results.map((tweet: any) => ({
          title: tweet.title,
          url: tweet.url,
          author: tweet.author,
          text: tweet.text,
          publishedDate: tweet.publishedDate,
          score: tweet.score,
        }))

        // Write success status with results
        writer.write({
          id: toolCallId,
          type: 'data-tweet-search',
          data: {
            query,
            status: 'done',
            resultsCount: formattedResults.length,
            results: formattedResults,
          },
        })

        // Return formatted text response
        const resultsList = formattedResults
          .map((tweet, index) => {
            return `**${index + 1}. ${tweet.title}**
- **Author**: ${tweet.author || 'Unknown'}
- **URL**: ${tweet.url}
- **Date**: ${tweet.publishedDate || 'Unknown'}
${tweet.text ? `- **Content**: ${tweet.text.substring(0, 200)}${tweet.text.length > 200 ? '...' : ''}` : ''}
`
          })
          .join('\n---\n\n')

        return `## Tweet Search Results

**Query**: "${query}"
**Found**: ${formattedResults.length} tweets

---

${resultsList}`
      } catch (error) {
        console.error('Error searching tweets:', error)
        const errorMessage = error instanceof Error ? error.message : 'Failed to search tweets'
        
        // Write error status
        writer.write({
          id: toolCallId,
          type: 'data-tweet-search',
          data: {
            query,
            status: 'error',
            error: { message: errorMessage },
          },
        })

        return `❌ **Tweet Search Error**

Failed to search for tweets with query: "${query}"

**Error**: ${errorMessage}

Please try again with a different query.`
      }
    },
  })
}

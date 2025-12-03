import type { ChatUIMessage } from '@/lib/chat-context'
import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  streamText,
} from 'ai'
import { getOpenRouterModel, getModelId } from '@/ai/openrouter'
import { tools } from '@/ai/tools'

interface BodyData {
  messages: ChatUIMessage[]
  modelId?: string
}

export async function POST(req: Request) {
  let messages: ChatUIMessage[], modelId: string | undefined;
  
  try {
    const body = await req.text()
    
    if (!body) {
      return Response.json(
        { error: 'BAD_REQUEST', message: 'Empty request body' }, 
        { status: 400 }
      )
    }
    
    const parsed = JSON.parse(body) as BodyData
    messages = parsed.messages
    modelId = parsed.modelId
  } catch (error) {
    console.error('JSON parsing error:', error)
    return Response.json(
      { error: 'BAD_REQUEST', message: 'Invalid JSON in request body' }, 
      { status: 400 }
    )
  }
  
  const actualModelId = modelId || getModelId()
  const model = getOpenRouterModel()

  const systemPrompt = `You are a helpful AI assistant with the ability to search for tweets using the Exa API.

IMPORTANT: When users ask you to find, search, or look for tweets about ANY topic, you MUST use the searchTweets tool. Do not try to answer without using the tool.

The searchTweets tool will:
- Search Twitter/X for tweets matching the user's query
- Return tweet content, URLs, authors, publication dates, and relevance scores
- Provide up to 10 results by default

After receiving the search results, present them in a clear, organized way with context about what you found. You can answer follow-up questions about the tweets and help users refine their searches.

Always use the searchTweets tool when users want to find tweets - never skip it or try to answer without searching.`

  return createUIMessageStreamResponse({
    stream: createUIMessageStream({
      originalMessages: messages,
      execute: ({ writer }) => {
        const result = streamText({
          model,
          system: systemPrompt,
          messages: convertToModelMessages(messages),
          tools: tools({ writer }),
          onError: (error) => {
            console.error('Error communicating with AI')
            console.error(JSON.stringify(error, null, 2))
          },
        })
        result.consumeStream()
        writer.merge(
          result.toUIMessageStream({
            sendReasoning: false,
            sendStart: false,
            messageMetadata: () => ({
              model: actualModelId,
            }),
          })
        )
      },
    }),
  })
}

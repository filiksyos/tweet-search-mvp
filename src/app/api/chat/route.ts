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

When users ask you to find or search for tweets, use the searchTweets tool to query the Exa API.
The tool will return tweet content, URLs, authors, and other metadata.

Present the results in a clear, organized way and provide context about what you found.
You can answer follow-up questions about the tweets and help users refine their searches.`

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

import type { InferUITools, UIMessage, UIMessageStreamWriter } from 'ai'
import { searchTweets } from './search-tweets'

interface Params {
  writer: UIMessageStreamWriter<UIMessage>
}

export function tools({ writer }: Params) {
  return {
    searchTweets: searchTweets({ writer }),
  }
}

export type ToolSet = InferUITools<ReturnType<typeof tools>>

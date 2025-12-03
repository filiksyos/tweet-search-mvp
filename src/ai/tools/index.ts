import type { InferUITools, UIMessage, UIMessageStreamWriter } from 'ai'
import type { DataPart } from '../messages/data-parts'
import { searchTweets } from './search-tweets'

interface Params {
  writer: UIMessageStreamWriter<UIMessage<never, DataPart>>
}

export function tools({ writer }: Params) {
  return {
    searchTweets: searchTweets({ writer }),
  }
}

export type ToolSet = InferUITools<ReturnType<typeof tools>>

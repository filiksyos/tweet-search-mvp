import type { ChatUIMessage } from '@/lib/chat-context'
import { Text } from './text'
import { TweetSearch } from './tweet-search'
import { memo } from 'react'

interface Props {
  part: ChatUIMessage['parts'][number]
  partIndex: number
}

export const MessagePart = memo(function MessagePart({
  part,
}: Props) {
  if (part.type === 'text') {
    return <Text part={part} />
  } else if (part.type === 'data-tweet-search') {
    return <TweetSearch message={part.data} />
  }
  return null
})


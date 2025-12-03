'use client'

import type { ChatUIMessage } from '@/lib/chat-context'
import { MessagePart } from './message-part/index'
import { BotIcon, UserIcon } from 'lucide-react'
import { memo } from 'react'
import { cn } from '@/lib/utils'

interface Props {
  message: ChatUIMessage
}

export const Message = memo(function Message({ message }: Props) {
  return (
    <div
      className={cn({
        'mr-20': message.role === 'assistant',
        'ml-20': message.role === 'user',
      })}
    >
      {/* Message Header */}
      <div className="flex items-center gap-2 text-sm font-medium font-mono text-primary mb-1.5">
        {message.role === 'user' ? (
          <>
            <UserIcon className="ml-auto w-4" />
            <span>You</span>
          </>
        ) : (
          <>
            <BotIcon className="w-4" />
            <span>Assistant</span>
          </>
        )}
      </div>

      {/* Message Content */}
      <div className="space-y-1.5">
        {message.parts.map((part, index) => (
          <MessagePart key={index} part={part} partIndex={index} />
        ))}
      </div>
    </div>
  )
})

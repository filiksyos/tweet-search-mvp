'use client'

import { ChatUIMessage, useSharedChatContext } from '@/lib/chat-context'
import { useChat } from '@ai-sdk/react'
import { Message } from './message'
import { ChatInput } from './chat-input'
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation'
import { MessageCircleIcon } from 'lucide-react'

export function Chat() {
  const { chat } = useSharedChatContext()
  const { messages, sendMessage, status } = useChat<ChatUIMessage>({ 
    chat
  })

  const handleSendMessage = (text: string) => {
    sendMessage({ text })
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-card">
        <div className="flex items-center space-x-2">
          <MessageCircleIcon className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-semibold">Tweet Search MVP</h1>
        </div>
      </div>

      {/* Messages Area */}
      {messages.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MessageCircleIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Search for tweets</p>
            <p className="text-sm">Ask me to find tweets about any topic and I&apos;ll search using the Exa API.</p>
          </div>
        </div>
      ) : (
        <Conversation className="flex-1">
          <ConversationContent className="space-y-4">
            {messages.map((message) => (
              <Message key={message.id} message={message} />
            ))}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>
      )}

      {/* Input Area */}
      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={status === 'streaming' || status === 'submitted'}
      />
    </div>
  )
}

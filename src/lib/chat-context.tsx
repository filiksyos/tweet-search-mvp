'use client'

import { type ReactNode, useState } from 'react'
import { Chat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { createContext, useContext, useMemo } from 'react'
import type { DataPart } from '@/ai/messages/data-parts'

export interface ChatUIMessage {
  id: string
  role: 'user' | 'assistant'
  text: string
  parts: Array<
    | {
        type: 'text'
        text: string
      }
    | {
        type: 'data-tweet-search'
        data: DataPart['tweet-search']
      }
  >
}

interface ChatContextValue {
  chat: Chat<ChatUIMessage>
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined)

export function ChatProvider({ children }: { children: ReactNode }) {
  const chat = useMemo(
    () =>
      new Chat<ChatUIMessage>({
        transport: new DefaultChatTransport({
          api: '/api/chat'
        }),
        onError: (error) => {
          console.error('Error sending message:', error)
        },
      }),
    []
  )

  return (
    <ChatContext.Provider value={{ chat }}>
      {children}
    </ChatContext.Provider>
  )
}

export function useSharedChatContext() {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useSharedChatContext must be used within a ChatProvider')
  }
  return context
}

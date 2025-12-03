'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SendIcon } from 'lucide-react'
import { useState } from 'react'

interface ChatInputProps {
  onSendMessage: (message: string) => void
  disabled?: boolean
}

export function ChatInput({ onSendMessage, disabled }: ChatInputProps) {
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !disabled) {
      onSendMessage(input.trim())
      setInput('')
    }
  }

  return (
    <form
      className="flex items-center p-4 space-x-2 border-t bg-background"
      onSubmit={handleSubmit}
    >
      <Input
        className="flex-1"
        disabled={disabled}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        value={input}
      />
      <Button 
        type="submit" 
        disabled={disabled || !input.trim()}
        size="icon"
      >
        <SendIcon className="w-4 h-4" />
      </Button>
    </form>
  )
}

import type { ChatUIMessage } from '@/lib/chat-context'
import { MarkdownRenderer } from '@/components/markdown-renderer/markdown-renderer'

export function Text({ part }: { part: Extract<ChatUIMessage['parts'][number], { type: 'text' }> }) {
  return (
    <div className="text-sm px-3.5 py-3 border bg-secondary/90 text-secondary-foreground border-border rounded-md font-mono">
      <MarkdownRenderer content={part.text} />
    </div>
  )
}


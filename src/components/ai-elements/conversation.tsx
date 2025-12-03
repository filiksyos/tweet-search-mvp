'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Button } from '@/components/ui/button'
import { ArrowDownIcon } from 'lucide-react'

const Conversation = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative flex flex-col overflow-hidden', className)}
    {...props}
  />
))
Conversation.displayName = 'Conversation'

const ConversationContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <ScrollArea.Root className="flex-1 overflow-hidden">
    <ScrollArea.Viewport className="h-full w-full">
      <div
        ref={ref}
        className={cn('p-4', className)}
        {...props}
      >
        {children}
      </div>
    </ScrollArea.Viewport>
    <ScrollArea.Scrollbar
      className="flex select-none touch-none p-0.5 bg-muted transition-colors duration-150 ease-out hover:bg-muted/80 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
      orientation="vertical"
    >
      <ScrollArea.Thumb className="flex-1 bg-border rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
    </ScrollArea.Scrollbar>
  </ScrollArea.Root>
))
ConversationContent.displayName = 'ConversationContent'

function ConversationScrollButton() {
  const [showButton, setShowButton] = React.useState(false)

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    })
  }

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      setShowButton(scrollTop + windowHeight < documentHeight - 100)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!showButton) return null

  return (
    <div className="absolute bottom-4 right-4">
      <Button
        size="icon"
        variant="secondary"
        onClick={scrollToBottom}
        className="rounded-full shadow-lg"
      >
        <ArrowDownIcon className="w-4 h-4" />
      </Button>
    </div>
  )
}

export { Conversation, ConversationContent, ConversationScrollButton }

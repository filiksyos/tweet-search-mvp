'use client'

import { ExternalLinkIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TweetResultProps {
  title: string
  url: string
  author?: string
  text?: string
  publishedDate?: string
  score?: number
}

export function TweetResult({
  title,
  url,
  author,
  text,
  publishedDate,
  score,
}: TweetResultProps) {
  return (
    <div className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <h3 className="font-semibold text-sm mb-1">{title}</h3>
          {author && (
            <p className="text-xs text-muted-foreground mb-2">@{author}</p>
          )}
          {text && (
            <p className="text-sm text-foreground mb-2 line-clamp-3">{text}</p>
          )}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {publishedDate && (
              <span>{new Date(publishedDate).toLocaleDateString()}</span>
            )}
            {score && (
              <span className="text-xs">Relevance: {(score * 100).toFixed(0)}%</span>
            )}
          </div>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 p-2 hover:bg-accent rounded-md transition-colors"
        >
          <ExternalLinkIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  )
}

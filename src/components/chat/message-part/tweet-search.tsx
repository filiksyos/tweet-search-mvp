'use client'

import type { DataPart } from '@/ai/messages/data-parts'
import { Button } from '@/components/ui/button'
import { SearchIcon, ExternalLinkIcon, MessageSquare, CalendarIcon, UserIcon } from 'lucide-react'

interface TweetSearchProps {
  message: DataPart['tweet-search']
}

export function TweetSearch({ message }: TweetSearchProps) {
  const { query, status, resultsCount, results, error } = message

  return (
    <div className="text-sm px-3.5 py-3 border bg-background border-border rounded-md font-mono">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3 font-medium">
        <MessageSquare className="w-4 h-4" />
        <span>Tweet Search</span>
        {status === 'searching' && (
          <div className="ml-2 w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
        )}
      </div>

      {/* Status: Searching */}
      {status === 'searching' && (
        <div className="text-muted-foreground">Searching Twitter...</div>
      )}

      {/* Error */}
      {error && (
        <div className="text-destructive bg-destructive/10 border border-destructive/20 rounded p-2 mt-2">
          Error: {error.message}
        </div>
      )}

      {/* Results */}
      {results && results.length > 0 && (
        <div className="mt-3">
          <div className="text-muted-foreground mb-3 flex items-center gap-1">
            <SearchIcon className="w-3 h-3" />
            Found {resultsCount || results.length} tweet{results.length !== 1 ? 's' : ''}:
          </div>
          
          <div className="space-y-3">
            {results.map((tweet, index) => (
              <div key={index} className="border border-border rounded p-3 bg-card hover:bg-accent/50 transition-colors">
                <div className="space-y-2">
                  {/* Tweet Title/Content */}
                  <h3 className="font-medium text-card-foreground">
                    {tweet.title || 'Tweet'}
                  </h3>
                  
                  {/* Tweet Text */}
                  {tweet.text && (
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {tweet.text}
                    </p>
                  )}
                  
                  {/* Metadata */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                    {tweet.author && (
                      <div className="flex items-center gap-1">
                        <UserIcon className="w-3 h-3" />
                        <span>{tweet.author}</span>
                      </div>
                    )}
                    {tweet.publishedDate && (
                      <div className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        <span>{new Date(tweet.publishedDate).toLocaleDateString()}</span>
                      </div>
                    )}
                    {tweet.score !== undefined && (
                      <div className="text-xs">
                        Score: {tweet.score.toFixed(2)}
                      </div>
                    )}
                  </div>
                  
                  {/* Action Button */}
                  {tweet.url && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      asChild
                      className="mt-2"
                    >
                      <a 
                        href={tweet.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        View Tweet
                        <ExternalLinkIcon className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {status === 'done' && (!results || results.length === 0) && (
        <div className="text-muted-foreground mt-2">
          No tweets found for &ldquo;{query}&rdquo;
        </div>
      )}
    </div>
  )
}


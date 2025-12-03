# Tweet Search MVP

AI-powered tweet search application built with Next.js, OpenRouter, and Exa API.

## Features

- 🐦 **Tweet Search**: Search for tweets using Exa API with intelligent query generation
- 💬 **AI Chat Interface**: Real-time AI-powered chat with streaming responses
- 🎨 **Modern UI**: Beautiful components built with Radix UI and Tailwind CSS
- 🌙 **Dark Mode**: Full dark mode support

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **AI**: AI SDK, OpenRouter API
- **Search**: Exa API for tweet search
- **UI**: Radix UI, Tailwind CSS, Lucide Icons
- **State**: Zustand

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/filiksyos/tweet-search-mvp.git
   cd tweet-search-mvp
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your API keys:
   ```env
   OPENROUTER_API_KEY=your_openrouter_api_key_here
   AI_MODEL=google/gemini-2.5-pro
   EXA_API_KEY=your_exa_api_key_here
   ```

   - Get OpenRouter API key: https://openrouter.ai/keys
   - Get Exa API key: https://exa.ai

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

Ask the AI to search for tweets:

- "Find tweets about AI advancements"
- "Search for tweets discussing climate change"
- "Show me tweets about the latest tech news"

The AI will use the Exa API to search Twitter and display relevant tweets with content and metadata.

## Project Structure

```
src/
├── ai/
│   ├── tools/
│   │   ├── index.ts              # Tool composition
│   │   └── search-tweets.ts      # Tweet search tool
│   └── openrouter.ts             # AI provider config
├── app/
│   ├── api/chat/
│   │   └── route.ts              # Chat API endpoint
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/
│   ├── ai-elements/
│   │   └── conversation.tsx      # Conversation UI
│   ├── chat/
│   │   ├── chat.tsx              # Main chat component
│   │   ├── message.tsx           # Message display
│   │   └── chat-input.tsx        # Chat input
│   ├── ui/
│   │   ├── button.tsx            # Button component
│   │   └── input.tsx             # Input component
│   └── tweet-result.tsx          # Tweet display
└── lib/
    ├── chat-context.tsx          # Chat state management
    └── utils.ts                  # Utilities
```

## License

MIT

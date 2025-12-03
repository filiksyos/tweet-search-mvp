import type { Metadata } from "next";
import "./globals.css";
import { ChatProvider } from "@/lib/chat-context";

export const metadata: Metadata = {
  title: "Tweet Search MVP",
  description: "AI-powered tweet search with Exa API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ChatProvider>{children}</ChatProvider>
      </body>
    </html>
  );
}

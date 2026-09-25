import type { Metadata } from "next"
import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"
import { Toaster } from "sonner"
import AuthSessionProvider from "@/components/providers/session-provider"
import Script from "next/script"

export const metadata: Metadata = {
  title: {
    default: "Nexora — AI Workspace",
    template: "%s | Nexora",
  },
  description:
    "Nexora is an AI workspace for multi-model chat, document intelligence, web search, and AI-powered productivity.",
  keywords: [
    "Nexora",
    "AI workspace",
    "AI chat",
    "RAG",
    "document AI",
    "multi-model AI",
    "AI productivity",
  ],
  authors: [{ name: "Sohail Khan" }],
  creator: "Sohail Khan",
  metadataBase: new URL("https://nexora-ai-dusky.vercel.app"),
  openGraph: {
    title: "Nexora — AI Workspace",
    description:
      "An AI workspace for multi-model chat, document intelligence, web search, and AI-powered productivity.",
    url: "https://nexora-ai-dusky.vercel.app",
    siteName: "Nexora",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexora — AI Workspace",
    description:
      "An AI workspace for multi-model chat, document intelligence, web search, and AI-powered productivity.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthSessionProvider>
          <ThemeProvider>
            {children}
            <Toaster richColors position="top-right" />
          </ThemeProvider>
        </AuthSessionProvider>

        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
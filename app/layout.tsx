import { ThemeProvider } from "@/components/providers/theme-provider"
import "./globals.css"
import { Toaster } from "sonner"
import AuthSessionProvider from "@/components/providers/session-provider"
import Script from "next/script"

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
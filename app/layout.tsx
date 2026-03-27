import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'V4 Email Sorter Dave',
  description: 'Intelligent email sorting and response management'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={cn(
        'min-h-screen bg-background font-sans antialiased',
        inter.className
      )}>
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex">
                <h1 className="text-lg font-semibold">V4 Email Sorter Dave</h1>
              </div>
              <nav className="flex items-center space-x-6 text-sm font-medium">
                <a href="/" className="text-foreground/60 hover:text-foreground">Dashboard</a>
                <a href="/emails" className="text-foreground/60 hover:text-foreground">Emails</a>
                <a href="/responses" className="text-foreground/60 hover:text-foreground">Responses</a>
                <a href="/analytics" className="text-foreground/60 hover:text-foreground">Analytics</a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built by V4 Email Sorter Dave. Email management made simple.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
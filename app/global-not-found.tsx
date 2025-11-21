// Import global styles and fonts
import './globals.css'
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import Image from 'next/image'
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/contexts/ThemeContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Essa página não existe',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <ThemeProvider>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body>
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center text-center space-y-8">
              <Image
                className="dark:invert"
                src="/logo.svg"
                alt="Logo da Konexo"
                width={80}
                height={80}
                priority
              />
              <h1 className="text-6xl font-bold bg-[linear-gradient(90deg,#421A60,#711B87,#9F1882,#DD2BAD)] dark:bg-[linear-gradient(90deg,#29D757,#72EB8B,#8FE479,#BEE49F)] bg-clip-text text-transparent">404</h1>
              <h2 className="text-2xl font-semibold">Página não encontrada</h2>
              <p className="text-muted-foreground">
                A página que você está procurando não existe ou foi removida.
              </p>
              <a
                href="/"
                className="inline-block px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Voltar ao início
              </a>
            </div>
          </div>
        </body>
      </html>
    </ThemeProvider>
  )
}
import type { Metadata } from 'next'
import {
  ClerkProvider,
  Show,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/nextjs'

import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AI Agentic Document System',
  description: 'AI Video Calls + Document Intelligence + Agent Workflows',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#05070c] text-white`}
      >
        <ClerkProvider>

          {/* HEADER */}
          <header className="fixed top-0 left-0 w-full h-16 bg-[#0a0d14]/90 backdrop-blur-md border-b border-white/10 z-50 flex items-center justify-between px-6">

            {/* Brand */}
            <div className="text-sm font-medium text-white/70">
              AI Agent System
            </div>

            {/* Auth Section */}
            <div className="flex items-center gap-3">
              <Show when="signed-out">
                <SignInButton />
                <SignUpButton>
                  <button className="bg-purple-600 hover:bg-purple-500 transition text-white rounded-full px-4 py-2 text-sm font-medium">
                    Sign Up
                  </button>
                </SignUpButton>
              </Show>

              <Show when="signed-in">
                <UserButton />
              </Show>
            </div>

          </header>

          {/* MAIN CONTENT */}
          <main className="pt-16 h-screen w-screen overflow-hidden">
            {children}
          </main>

        </ClerkProvider>
      </body>
    </html>
  )
}
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CrypTwitter',
  description: 'Twitter post funcionality in Blockchain',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Head>
        <title>CrypTwitter | Login</title>
        <meta charSet='utf-8' />
      </Head>
      <body className={`${inter.className} h-screen bg-black flex justify-center`}>{children}</body>
    </html>
  )
}
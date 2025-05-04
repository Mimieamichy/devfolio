import type {Metadata} from 'next';
import {Geist} from 'next/font/google'; // Keep Geist or choose another font
import './globals.css';
import {cn} from '@/lib/utils';
import {ThemeProvider} from '@/components/theme-provider';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Toaster } from "@/components/ui/toaster";


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: 'DevFolio - Frontend Developer Portfolio',
  description: 'A modern, professional developer portfolio built with Next.js, TypeScript, and TailwindCSS.',
  keywords: ['frontend developer', 'react developer', 'next.js', 'typescript', 'portfolio', 'web developer'],
  authors: [{ name: 'Your Name Here' }], // Update with your name
  // Add more SEO tags as needed (Open Graph, Twitter Cards)
  openGraph: {
    title: 'DevFolio - Frontend Developer Portfolio',
    description: 'Showcasing frontend development projects and skills.',
    type: 'website',
    // url: 'https://yourdomain.com', // Add your deployed URL
    // images: [ // Add a preview image
    //   {
    //     url: 'https://yourdomain.com/og-image.png',
    //     width: 1200,
    //     height: 630,
    //     alt: 'DevFolio Portfolio Preview',
    //   },
    // ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col bg-background">
             <Header />
             <main className="flex-1 w-full">{children}</main>

             <Footer />
             <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

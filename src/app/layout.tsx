import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anniversary Spesial untuk Anggun - Cinta Abadi",
  description: "Halaman anniversary romantis dengan musik Ed Sheeran, galeri kenangan, dan pesan cinta yang tak terlupakan. Dibuat dengan penuh cinta untuk Anggun tercinta.",
  keywords: ["anniversary", "cinta", "romantis", "Ed Sheeran", "kenangan", "Anggun", "love", "romance"],
  authors: [{ name: "Dengan Cinta" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Anniversary Spesial untuk Anggun",
    description: "Halaman anniversary romantis dengan musik Ed Sheeran dan galeri kenangan indah",
    url: "https://anniversary-anggun.vercel.app",
    siteName: "Anniversary Anggun",
    type: "website",
    images: [
      {
        url: "/paris-romance.png",
        width: 1200,
        height: 630,
        alt: "Anniversary Romantis untuk Anggun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Anniversary Spesial untuk Anggun",
    description: "Halaman anniversary romantis dengan musik Ed Sheeran dan galeri kenangan indah",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}

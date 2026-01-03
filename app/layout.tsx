import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifJp = Noto_Serif_JP({
  variable: "--font-noto-serif-jp",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Tarot Journey",
  description: "Follow a guided tarot pull and journal what the cards reveal.",
  metadataBase: process.env.NEXT_PUBLIC_SITE_URL
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined,
  openGraph: {
    title: "Tarot Journey",
    description: "Follow a guided tarot pull and journal what the cards reveal.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Tarot Journey",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarot Journey",
    description: "Follow a guided tarot pull and journal what the cards reveal.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="bg-[#e7ecff]">
      <head>
        <meta name="darkreader-lock" content="true" />
        <link rel="icon" href="/logo/icon.png" type="image/png" sizes="any" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifJp.variable} antialiased bg-[#e7ecff] text-slate-900`}
      >
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1TLR66CNNX"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-1TLR66CNNX');`}
        </Script>
      </body>
    </html>
  );
}

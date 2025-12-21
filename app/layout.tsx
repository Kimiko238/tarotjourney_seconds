import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tarot Journey",
  description: "Follow a guided tarot pull and journal what the cards reveal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" data-theme="light" className="bg-[#e7ecff]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#e7ecff] text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}

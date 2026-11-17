import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Noto_Sans_TC } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const tc = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-tc",
  display: "swap",
});
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "浩穎研究室｜猛健樂，真的需要一直加量嗎？",
  description:
    "浩穎的個人獨立研究：為什麼我認為 tirzepatide（猛健樂）2.5 mg 值得重新討論。數據、文獻與我的觀點。本文不構成醫療建議。",
  authors: [{ name: "浩穎" }],
  openGraph: {
    title: "猛健樂，真的需要一直加量嗎？— 浩穎研究室",
    description: "如果低劑量就有效，為什麼一定要往上加？WRITTEN BY 浩穎",
    type: "article",
    locale: "zh_TW",
  },
};

export const viewport: Viewport = {
  themeColor: "#07080A",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-Hant-TW" className={`${inter.variable} ${tc.variable} ${mono.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}

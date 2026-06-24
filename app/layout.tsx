import type { Metadata } from "next";
import { JetBrains_Mono, Noto_Sans_TC } from "next/font/google";
import BottomNav from "@/components/app/BottomNav";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  weight: ["400", "500", "700"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "交易助手 ｜ 進場前，先看一眼",
  description:
    "交易助手：上傳交易圖表，系統快速分析方向、進場位置、壓力支撐區與風險報酬比，幫你判斷這筆單值不值得做。不預測未來，只幫你避開爛單。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant" className={`${jetbrainsMono.variable} ${notoSansTC.variable}`}>
      <body className="bg-[#05080a]">
        <div className="app-backdrop" />
        {children}
        <BottomNav />
      </body>
    </html>
  );
}

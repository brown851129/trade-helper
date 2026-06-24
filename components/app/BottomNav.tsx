"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

function HomeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}
function AnalyzeIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
}
function IntroIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}
function HistoryIcon({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isAnalyze =
    pathname === "/analyze" ||
    pathname.startsWith("/analyzing") ||
    pathname.startsWith("/result");
  const isIntro = pathname === "/intro";
  const isHistory = pathname === "/history";

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 flex h-[68px] w-full max-w-[480px] -translate-x-1/2 items-stretch border-t border-white/5 bg-[#030807]/92 backdrop-blur-xl">
      {/* 首頁 */}
      <Link href="/" className="flex flex-1 flex-col items-center justify-center gap-[3px]">
        <div className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
          isHome ? "bg-[#2fe3a0] shadow-[0_0_18px_rgba(47,227,160,0.5)]" : ""
        }`}>
          <span className={isHome ? "text-[#030807]" : "text-white/30"}>
            <HomeIcon />
          </span>
        </div>
        <span className={`text-[10px] font-bold ${isHome ? "text-[#2fe3a0]" : "text-white/30"}`}>首頁</span>
      </Link>

      {/* 分析 */}
      <Link href="/analyze" className="flex flex-1 flex-col items-center justify-center gap-[3px]">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
            isAnalyze
              ? "bg-[#2fe3a0] shadow-[0_0_18px_rgba(47,227,160,0.5)]"
              : ""
          }`}
        >
          <span className={isAnalyze ? "text-[#030807]" : "text-white/30"}>
            <AnalyzeIcon />
          </span>
        </div>
        <span className={`text-[10px] font-bold ${isAnalyze ? "text-[#2fe3a0]" : "text-white/30"}`}>
          分析
        </span>
      </Link>

      {/* 介紹 */}
      <Link href="/intro" className="flex flex-1 flex-col items-center justify-center gap-[3px]">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
            isIntro
              ? "bg-[#2fe3a0] shadow-[0_0_18px_rgba(47,227,160,0.5)]"
              : ""
          }`}
        >
          <span className={isIntro ? "text-[#030807]" : "text-white/30"}>
            <IntroIcon />
          </span>
        </div>
        <span className={`text-[10px] font-bold ${isIntro ? "text-[#2fe3a0]" : "text-white/30"}`}>
          介紹
        </span>
      </Link>

      {/* 紀錄 */}
      <Link href="/history" className="flex flex-1 flex-col items-center justify-center gap-[3px]">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all duration-200 ${
            isHistory
              ? "bg-[#2fe3a0] shadow-[0_0_18px_rgba(47,227,160,0.5)]"
              : ""
          }`}
        >
          <span className={isHistory ? "text-[#030807]" : "text-white/30"}>
            <HistoryIcon />
          </span>
        </div>
        <span className={`text-[10px] font-bold ${isHistory ? "text-[#2fe3a0]" : "text-white/30"}`}>
          紀錄
        </span>
      </Link>
    </nav>
  );
}

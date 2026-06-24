"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import RadarScan from "@/components/app/RadarScan";

const STEPS = [
  "辨識趨勢方向",
  "分析結構型態",
  "尋找支撐與壓力",
  "計算風險報酬比",
  "生成分析觀點",
];

// 前 4 步的動畫總時長（ms），第 5 步等 API 完成後才觸發
const STEP_INTERVAL = 1300;
const MIN_ANIM_MS = 4 * STEP_INTERVAL + 400;

export default function AnalyzingPage() {
  const router = useRouter();
  const [done, setDone] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    // 防止 React StrictMode 雙重執行
    if (startedRef.current) return;
    startedRef.current = true;

    const image = sessionStorage.getItem("pendingImage");
    const mimeType = sessionStorage.getItem("pendingMime") ?? "image/jpeg";

    if (!image) {
      router.replace("/analyze");
      return;
    }

    const startTime = Date.now();
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 前 4 步逐步點亮
    for (let i = 0; i < 4; i++) {
      timers.push(
        setTimeout(() => setDone(i + 1), (i + 1) * STEP_INTERVAL)
      );
    }

    function finalize(data: unknown) {
      // 完成最後一步後短暫停留再跳轉
      setDone(5);
      sessionStorage.removeItem("pendingImage");
      sessionStorage.removeItem("pendingMime");
      sessionStorage.setItem("analyzeResult", JSON.stringify(data));
      setTimeout(() => router.push("/result"), 700);
    }

    // 真實 API 呼叫
    fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image, mimeType }),
    })
      .then((res) => {
        if (!res.ok)
          return res.json().then((e) =>
            Promise.reject(new Error(e.error ?? `HTTP ${res.status}`))
          );
        return res.json();
      })
      .then((data) => {
        // 確保動畫至少跑到第 4 步才結束，避免 UI 跳太快
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, MIN_ANIM_MS - elapsed);
        timers.push(setTimeout(() => finalize(data), remaining));
      })
      .catch((err: Error) => {
        timers.forEach(clearTimeout);
        setError(err.message || "分析失敗，請重試");
      });

    return () => timers.forEach(clearTimeout);
  }, [router]);

  // ── 錯誤畫面 ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col border-x border-white/5 bg-[#030807] text-white antialiased">
        <header className="border-b border-white/5 px-5 py-3.5 text-center">
          <h1 className="text-base font-semibold text-white">分析中</h1>
        </header>
        <div className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-red-400/20 bg-red-400/10 text-red-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 8v4M12 16h.01" />
            </svg>
          </div>
          <div>
            <p className="text-base font-bold text-white">分析失敗</p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{error}</p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/analyze")}
            className="rounded-xl bg-[#2fe3a0] px-8 py-3 text-sm font-black text-black"
          >
            重新上傳
          </button>
        </div>
      </div>
    );
  }

  // ── 正常分析畫面 ──────────────────────────────────────────────────────────
  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col border-x border-white/5 bg-[#030807] text-white antialiased">
      <header className="border-b border-white/5 px-5 py-3.5 text-center">
        <h1 className="text-base font-semibold text-white">分析中</h1>
      </header>

      <main className="flex flex-1 flex-col items-center px-5 py-10 pb-[88px]">
        <RadarScan />

        <h2 className="mt-9 text-lg font-bold text-white">AI 正在分析圖表</h2>
        <p className="mt-2 text-center text-sm leading-relaxed text-white/50">
          系統正在進行結構識別與關鍵位置分析
          <br />
          預計完成時間 10 – 30 秒
        </p>

        {/* 步驟清單 */}
        <div className="mt-9 w-full max-w-sm space-y-2.5">
          {STEPS.map((s, i) => {
            const isDone = i < done;
            const isActive = i === done;
            return (
              <div
                key={s}
                className={`app-card flex items-center gap-3 px-4 py-3.5 transition-opacity duration-300 ${
                  isDone || isActive ? "opacity-100" : "opacity-35"
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${
                    isDone
                      ? "border-[#2fe3a0] bg-[#2fe3a0]/15 text-[#2fe3a0]"
                      : isActive
                      ? "border-[#2fe3a0]/50 text-[#2fe3a0]"
                      : "border-white/15 text-white/30"
                  }`}
                >
                  {isDone ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : isActive ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin" style={{ animationDuration: "1.2s" }}>
                      <path d="M21 12a9 9 0 1 1-6.2-8.6" strokeLinecap="round" />
                    </svg>
                  ) : (
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                  )}
                </span>
                <span className={`text-sm ${isDone || isActive ? "text-white" : "text-white/40"}`}>
                  {s}
                </span>
                {isDone && (
                  <span className="ml-auto text-[11px] font-bold text-[#2fe3a0]">完成</span>
                )}
              </div>
            );
          })}
        </div>

        {/* 提示 */}
        <div className="mt-8 w-full max-w-sm rounded-xl border border-[#2fe3a0]/20 bg-[#2fe3a0]/[0.06] px-4 py-3.5">
          <p className="text-xs font-semibold text-[#2fe3a0]">小提醒</p>
          <p className="mt-1 text-xs leading-relaxed text-white/50">
            分析結果僅供參考，最終決策由您自行判斷。
          </p>
        </div>
      </main>
    </div>
  );
}

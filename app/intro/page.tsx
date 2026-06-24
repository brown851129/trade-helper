"use client";

import SiteHeader from "@/components/app/SiteHeader";

const ANALYZE_ITEMS = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "交易方向",
    desc: "判斷多空\n趨勢結構",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="m10 15 5-3-5-3v6Z" fill="currentColor" />
      </svg>
    ),
    title: "進場區域",
    desc: "找出最佳\n進場範圍",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 12h18M3 6h18M3 18h18" />
      </svg>
    ),
    title: "支撐壓力",
    desc: "關鍵價位\n強度分析",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "風險報酬",
    desc: "計算風報比\n評估交易價值",
  },
];

const GRADES = [
  { range: "0-59", grade: "C級", desc: "低品質機會", color: "text-white/30" },
  { range: "60-74", grade: "B級", desc: "一般機會", color: "text-amber-400/90" },
  { range: "75-89", grade: "A級", desc: "高品質機會", color: "text-[#2fe3a0]", active: true },
  { range: "90-100", grade: "S級", desc: "頂級機會", color: "text-cyan-400" },
];

const STEPS = [
  { num: "1", title: "上傳圖表", desc: "TradingView、\nBybit 或 Binance\n截圖" },
  { num: "2", title: "AI 分析中", desc: "10 秒內完成\n多維度分析" },
  { num: "3", title: "獲得結果", desc: "查看評分與\n詳細分析觀點" },
  { num: "4", title: "做出決策", desc: "依據分析結果\n執行交易計畫" },
];

const FAQ = [
  "評分高就一定會賺錢嗎？",
  "AI 分析準確嗎？",
  "支援哪些平台的圖表？",
  "我的圖表會被儲存或公開嗎？",
];

export default function IntroPage() {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col border-x border-white/5 bg-[#030807] text-white antialiased">
      <SiteHeader />

      <main className="flex-1 pb-[88px]">
        {/* Hero 區塊與原圖插圖還原 */}
        <section className="relative px-5 pb-6 pt-6 overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(47,227,160,0.12),transparent)]" />
          
          <div className="relative flex items-center justify-between gap-2">
            <div className="flex-1">
              <h1 className="text-[28px] font-black leading-[1.2] tracking-tight text-white">
                什麼是
                <br />
                <span className="text-[#2fe3a0] drop-shadow-[0_0_12px_rgba(47,227,160,0.4)]">交易助手</span>？
              </h1>
              <p className="mt-3.5 text-[12.5px] leading-relaxed text-white/50 font-medium">
                交易助手是你的 AI 交易分析夥伴，
                <br />
                上傳圖表後，快速評估交易品質，
                <br />
                幫助你做出更理性的進場決策。
              </p>
            </div>

            {/* 3D 放大鏡插圖 */}
            <div className="relative shrink-0 mr-[-8px]">
              <div className="absolute inset-[-20%] rounded-full bg-[#2fe3a0]/8 blur-2xl" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/magnifier-3d.png"
                alt="交易分析插圖"
                width={130}
                height={130}
                className="relative z-10 object-contain drop-shadow-[0_0_24px_rgba(47,227,160,0.35)]"
              />
            </div>
          </div>
        </section>

        {/* 我們分析什麼 */}
        <section className="px-5 pb-6">
          <h2 className="mb-3 text-[14px] font-black tracking-tight text-white/80">我們分析什麼？</h2>
          <div className="grid grid-cols-2 gap-3">
            {ANALYZE_ITEMS.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/5 bg-white/[0.015] p-4 backdrop-blur-md">
                <span className="mb-3.5 flex h-9 w-9 items-center justify-center rounded-xl border border-[#2fe3a0]/20 bg-[#2fe3a0]/5 text-[#2fe3a0]">
                  {item.icon}
                </span>
                <p className="text-[13px] font-black text-white">{item.title}</p>
                <p className="mt-1 whitespace-pre-line text-[11px] leading-normal text-white/40 font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 評分機制還原 */}
        <section className="px-5 pb-6">
          <h2 className="text-[14px] font-black tracking-tight text-white/80">評分機制</h2>
          <p className="mb-3 text-[11px] text-white/40 font-medium">綜合多項指標，給出交易品質評分。</p>
          
          <div className="rounded-2xl border border-white/5 bg-white/[0.01] overflow-hidden">
            <div className="grid grid-cols-4 split-line">
              {GRADES.map((g, i) => (
                <div
                  key={g.grade}
                  className={`relative flex flex-col items-center gap-1 px-1 py-4 text-center transition-all ${
                    g.active ? "bg-[#2fe3a0]/5 border-x border-[#2fe3a0]/10" : ""
                  }`}
                >
                  {/* A級霓虹發光條 */}
                  {g.active && (
                    <div className="absolute top-0 inset-x-0 h-[2px] bg-[#2fe3a0] shadow-[0_0_8px_#2fe3a0]" />
                  )}
                  <span className="text-[10px] font-mono text-white/30">{g.range}</span>
                  <span className={`text-[15px] font-black tracking-tight ${g.color}`}>{g.grade}</span>
                  <span className={`text-[9px] font-bold ${g.active ? "text-[#2fe3a0]" : "text-white/30"}`}>{g.desc}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.015] px-4 py-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#2fe3a0]/20 bg-[#2fe3a0]/5 text-[#2fe3a0]">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </span>
            <p className="text-[11px] leading-normal text-white/50 font-medium">
              評分越高，代表交易條件越完整，勝率與風報比越佳
            </p>
          </div>
        </section>

        {/* 使用流程 */}
        <section className="px-5 pb-6">
          <h2 className="mb-3 text-[14px] font-black tracking-tight text-white/80">使用流程</h2>
          <div className="flex items-start justify-between">
            {STEPS.map((step, i) => (
              <div key={step.num} className="flex flex-1 flex-col items-center text-center relative">
                {/* 流程圓圈圖示與連線 */}
                <div className="flex w-full items-center justify-center relative z-10">
                  <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.02] text-white/80">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white/60">
                      {i === 0 && <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" /></>}
                      {i === 1 && <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6M9 13h4" /></>}
                      {i === 2 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" /></>}
                      {i === 3 && <path d="M20 6 9 17l-5-5" stroke="#2fe3a0" strokeWidth="2.5" />}
                    </svg>
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#2fe3a0] text-[9px] font-black text-[#030807]">
                      {step.num}
                    </span>
                  </div>
                </div>
                <p className="mt-2.5 text-[11.5px] font-black text-white/90">{step.title}</p>
                <p className="mt-1 whitespace-pre-line text-[9.5px] leading-snug text-white/30 font-medium">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 常見問題 */}
        <section className="px-5">
          <h2 className="mb-3 text-[14px] font-black tracking-tight text-white/80">常見問題</h2>
          <div className="flex flex-col gap-2">
            {FAQ.map((q) => (
              <div key={q} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.015] px-4 py-3.5 transition-all hover:bg-white/[0.03]">
                <span className="text-[12.5px] text-white/70 font-semibold">{q}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 text-white/30">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}
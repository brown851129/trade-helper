import Link from "next/link";
import SiteHeader from "@/components/app/SiteHeader";

function ScoreRing() {
  return (
    <div className="relative flex h-[240px] w-[240px] shrink-0 items-center justify-center xs:h-[260px] xs:w-[260px]">
      {/* 背景霓虹光暈 */}
      <div className="absolute inset-0 rounded-full bg-[#2fe3a0]/10 blur-3xl" />

      {/* 外圈裝飾環 */}
      <div className="absolute h-[220px] w-[220px] rounded-full border border-[#2fe3a0]/10 xs:h-[240px] xs:w-[240px]" />
      <div className="absolute h-[190px] w-[190px] rounded-full border border-[#2fe3a0]/15 xs:h-[205px] xs:w-[205px]" />

      {/* 進度條主環 (採用 3/4 圓效果的邊框) */}
      <div className="absolute h-[170px] w-[170px] rounded-full border-[8px] border-[#2fe3a0] border-l-[#2fe3a0]/20 shadow-[0_0_40px_rgba(47,227,160,.4)] xs:h-[185px] xs:w-[185px]" />
      
      {/* 進度條亮點小圓點 */}
      <div className="absolute right-[30px] top-[40px] h-5 w-5 rounded-full bg-[#2fe3a0] shadow-[0_0_20px_rgba(47,227,160,.9)] xs:right-[36px] xs:top-[48px] xs:h-6 xs:w-6" />

      {/* 分數文字 */}
      <div className="relative flex flex-col items-center">
        <div className="flex items-end leading-none">
          <span className="font-mono text-[3.8rem] font-black text-[#2fe3a0] drop-shadow-[0_0_25px_rgba(47,227,160,.6)] xs:text-[4.2rem]">
            84
          </span>
          <span className="mb-2 ml-0.5 font-mono text-sm text-white/40 xs:mb-3 xs:ml-1 xs:text-lg">/100</span>
        </div>
        <span className="mt-1.5 rounded-xl border border-white/20 bg-black/60 px-3 py-1 text-[11px] font-bold text-white tracking-wide xs:mt-2 xs:px-4 xs:py-1.5 xs:text-[13px]">
          A級交易機會
        </span>
      </div>
    </div>
  );
}

const CHECKLIST = ["建議方向", "建議進場區", "支撐壓力位", "風險報酬比"];

const NAV_CARDS = [
  {
    href: "/intro",
    title: "產品介紹",
    desc: "了解交易助手\n如何幫助你",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    href: "/intro#value",
    title: "核心價值",
    desc: "不預測未來\n只評估交易品質",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    href: "/result",
    title: "分析範例",
    desc: "看看實際分析\n結果長怎樣",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col overflow-x-hidden border-x border-white/5 bg-[#030807] font-sans text-white antialiased">
      <SiteHeader />

      <main className="relative flex flex-1 flex-col px-6 pb-[88px] pt-6">
        {/* 背景右上角綠色漸層霓虹 */}
        <div className="pointer-events-none absolute right-[-10%] top-[-5%] h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(47,227,160,0.15)_0%,transparent_65%)]" />

        {/* 上半部：標題與分數圓環區塊 */}
        <section className="relative flex items-start justify-between">
          <div className="z-10 flex flex-col pt-4">
            <h1 className="text-[2.6rem] font-black leading-tight tracking-tight text-white xs:text-[3rem]">
              這筆單，
            </h1>
            <h2 className="mt-2 text-[2.4rem] font-black leading-tight tracking-tight xs:text-[2.8rem]">
              <span className="text-[#2fe3a0] drop-shadow-[0_0_15px_rgba(47,227,160,0.4)]">
                值得
              </span>
              做嗎？
            </h2>
          </div>

          {/* 透過負 margin 讓圓環優雅地靠右切邊，不會撐開螢幕寬度 */}
          <div className="absolute right-[-40px] top-[-10px] z-0 xs:right-[-30px]">
            <ScoreRing />
          </div>
        </section>

        {/* 中間：介紹文案與 Checklist */}
        <section className="relative z-10 mt-12 text-[16px] leading-relaxed text-white/70 xs:mt-16 xs:text-[17px]">
          <div className="space-y-0.5 font-medium">
            <p>上傳 TradingView、</p>
            <p>Bybit 或 Binance 圖表，</p>
            <p>10秒內獲得：</p>
          </div>

          <div className="mt-4 space-y-2.5">
            {CHECKLIST.map((item) => (
              <div key={item} className="flex items-center gap-3 text-white/90">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[#2fe3a0] text-[#2fe3a0]">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 12 4 4 8-8" />
                  </svg>
                </span>
                <span className="font-medium text-[15px]">{item}</span>
              </div>
            ))}
          </div>

          <p className="pt-6 text-[18px] font-medium leading-relaxed text-white/80">
            不預測未來，
            <br />
            只幫你
            <span className="mx-1 text-[#2fe3a0] underline decoration-[#2fe3a0]/80 underline-offset-4 font-bold">
              避開爛單
            </span>
            。
          </p>
        </section>

        {/* 中下半部：主按鈕區 */}
        <section className="relative z-10 mt-10 flex flex-col gap-3.5">
          <Link
            href="/analyze"
            className="flex h-[64px] items-center justify-center gap-2 rounded-2xl bg-[#2fe3a0] text-[20px] font-black text-black shadow-[0_0_30px_rgba(47,227,160,.4)] transition-transform active:scale-[0.98]"
          >
            開始分析
            <span className="text-xl font-light">›</span>
          </Link>

          <Link
            href="/result"
            className="flex h-[56px] items-center justify-center gap-2 rounded-2xl border border-[#2fe3a0]/30 bg-black/40 text-[16px] font-semibold text-[#2fe3a0] backdrop-blur-md transition-colors hover:bg-[#2fe3a0]/5"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            查看分析範例
          </Link>
        </section>

        {/* 下半部：三欄導覽卡片 */}
        <section className="relative z-10 mt-8 grid grid-cols-3 gap-3">
          {NAV_CARDS.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] backdrop-blur-md transition-all hover:bg-white/[0.06]"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#2fe3a0]/35 bg-[#2fe3a0]/10 text-[#2fe3a0]">
                {card.icon}
              </div>

              <p className="text-[16px] font-bold text-white tracking-tight">{card.title}</p>
              <p className="mt-1.5 whitespace-pre-line text-[12px] leading-normal text-white/40">
                {card.desc}
              </p>

              <div className="mt-4 flex h-7 w-7 items-center justify-center rounded-lg border border-white/5 bg-white/[0.04] text-white/40 text-sm ml-0">
                ›
              </div>
            </Link>
          ))}
        </section>
      </main>

    </div>
  );
}
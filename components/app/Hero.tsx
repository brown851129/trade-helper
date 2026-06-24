import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* trading desk photo */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-desk.png')" }}
      />
      {/* darken for readability */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#06090c]/92 via-[#06090c]/85 to-[#06090c]" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(700px_400px_at_20%_18%,rgba(47,227,160,0.10),transparent_70%)]" />

      <div className="px-5 pb-12 pt-12">
        {/* eyebrow */}
        <p className="mb-4 flex items-center gap-2 text-sm font-medium text-mint">
          <span>▸</span>
          不預測未來，只幫你避開爛單。
        </p>

        {/* headline */}
        <h1 className="text-[2.4rem] font-bold leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,1)]">
          這筆單，
          <br />
          <span className="text-mint">值得做嗎</span>？
        </h1>

        {/* sub */}
        <p className="mt-5 max-w-md text-sm leading-relaxed text-ink drop-shadow-[0_1px_12px_rgba(0,0,0,1)]">
          上傳交易圖表，快速分析方向、進場區、壓力支撐位與風險報酬比。幫助你判斷現在是否適合進場。
        </p>

        {/* buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/analyze"
            className="btn-primary flex items-center justify-center gap-2 py-4 text-base font-semibold"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 16V4M6 10l6-6 6 6" />
              <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
            </svg>
            開始分析
          </Link>
          <Link
            href="/result"
            className="btn-ghost flex items-center justify-center gap-2 py-4 text-base font-medium"
          >
            查看範例
          </Link>
        </div>

        {/* support note */}
        <p className="mt-5 text-xs text-ink-faint">
          支援 TradingView、Bybit、Binance 等圖表截圖
        </p>
      </div>
    </section>
  );
}

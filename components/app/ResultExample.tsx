function Stat({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 px-4 py-2.5 last:border-b-0 sm:flex-col sm:items-start sm:gap-0.5 sm:py-2">
      <span className="text-[11px] text-white/80">{label}</span>
      <span className="text-sm font-medium text-ink">{children}</span>
    </div>
  );
}

export default function ResultExample() {
  return (
    <section id="example" className="scroll-mt-20">
      <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-ink">
        分析結果
      </h2>

      <div className="app-card overflow-hidden">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/8 px-4 py-3">
          <span className="font-mono text-xs tracking-wider text-ink">
            XRPUSDT · 1H
          </span>
          <span className="rounded-md border border-mint/40 bg-mint/10 px-2 py-0.5 text-[11px] font-semibold text-mint">
            高品質交易
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_190px]">
          {/* chart side */}
          <div className="border-b border-white/8 p-3 sm:border-b-0 sm:border-r">
            <div className="mb-2 flex items-end gap-2 px-1">
              <span className="font-mono text-3xl font-bold leading-none text-mint">78</span>
              <span className="mb-0.5 font-mono text-xs text-ink-faint">/ 100</span>
            </div>
            <div className="h-[180px] overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/xrp.png" alt="XRP chart" className="h-full w-full object-cover" />
            </div>
          </div>

          {/* stats side */}
          <div className="flex flex-col">
            <Stat label="建議方向">
              <span className="text-mint">做多 LONG</span>
            </Stat>
            <Stat label="進場區">
              <span className="font-mono">0.6120 – 0.6180</span>
            </Stat>
            <Stat label="壓力區">
              <span className="font-mono text-danger">0.6480</span>
            </Stat>
            <Stat label="支撐區">
              <span className="font-mono text-mint">0.5980</span>
            </Stat>
            <Stat label="風險報酬比">
              <span className="font-mono">1 : 2.6</span>
            </Stat>
          </div>
        </div>

        {/* AI note */}
        <div className="border-t border-white/8 p-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded border border-mint/30 bg-mint/10 text-[10px] font-bold text-mint">
              AI
            </span>
            <span className="text-sm font-semibold text-ink">分析觀點</span>
          </div>
          <p className="text-[13px] leading-relaxed text-ink-dim">
            價格於上升結構回踩支撐並守住，量能收斂，下方支撐明確。若於 0.6120 –
            0.6180 區間進場、跌破 0.5980 出場，可取得約 1:2.6 的風險報酬比。整體結構完整，屬條件較佳的交易機會。
          </p>
        </div>
      </div>
    </section>
  );
}

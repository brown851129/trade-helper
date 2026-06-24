type Item = { icon: React.ReactNode; title: string; desc: string };

const ITEMS: Item[] = [
  {
    icon: (
      <>
        <path d="m17 7-5-5-5 5M12 2v20m-5-5 5 5 5-5" />
      </>
    ),
    title: "建議方向",
    desc: "判斷目前偏向做多、做空或觀望。",
  },
  {
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
        <circle cx="12" cy="12" r="2" />
      </>
    ),
    title: "建議進場區間",
    desc: "評估現在是否適合進場，或等待更好的位置。",
  },
  {
    icon: (
      <>
        <path d="M4 6h16" />
        <path d="m12 21-5-7h10z" />
      </>
    ),
    title: "壓力位置",
    desc: "標出上方可能遇到賣壓的位置。",
  },
  {
    icon: (
      <>
        <path d="M4 18h16" />
        <path d="m12 3 5 7H7z" />
      </>
    ),
    title: "支撐位置",
    desc: "標出下方可能出現買盤的位置。",
  },
  {
    icon: (
      <>
        <path d="M12 3v18M5 7h14" />
        <path d="M5 7 2 13h6zM19 7l-3 6h6z" />
      </>
    ),
    title: "風險報酬比",
    desc: "評估這筆單是否划算。",
  },
  {
    icon: (
      <>
        <path d="m12 3 2.6 5.6 6 .7-4.4 4 1.2 5.9L12 18l-5.4 1.2 1.2-5.9-4.4-4 6-.7z" />
      </>
    ),
    title: "交易品質評分",
    desc: "用分數判斷這筆單的完整度。",
  },
  {
    icon: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 9h6v6H9z" />
        <path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3" />
      </>
    ),
    title: "AI 分析觀點",
    desc: "用簡單文字說明為什麼可以做，或為什麼不建議做。",
  },
];

export default function AutoAnalyze() {
  return (
    <section className="scroll-mt-20">
      <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-ink">
        系統將自動分析
      </h2>
      <div className="grid grid-cols-2 gap-3">
        {ITEMS.map((it) => (
          <div key={it.title} className="app-card app-card-hover p-4">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg border border-mint/25 bg-mint/10 text-mint">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {it.icon}
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-ink">{it.title}</h3>
            <p className="mt-1 text-[11px] leading-relaxed text-ink-dim">{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

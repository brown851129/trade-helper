const CARDS = [
  {
    icon: (
      <>
        <path d="M12 16V4M6 10l6-6 6 6" />
        <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </>
    ),
    title: "想進場就上傳",
    desc: "看到機會就上傳分析，不用等老師通知。",
  },
  {
    icon: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </>
    ),
    title: "快速獲得第二觀點",
    desc: "AI 快速分析方向、進場區、壓力支撐位與風險報酬比。",
  },
  {
    icon: (
      <>
        <path d="M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
    title: "避開低品質交易",
    desc: "不是每一筆單都值得做，先看交易品質再決定。",
  },
];

export default function WhyUse() {
  return (
    <section className="scroll-mt-20">
      <h2 className="mb-6 text-center text-xl font-bold tracking-tight text-ink">
        為什麼使用交易助手？
      </h2>
      <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
        {CARDS.map((c) => (
          <div key={c.title} className="app-card app-card-hover p-5 text-center sm:text-left">
            <div className="mx-auto mb-3.5 flex h-11 w-11 items-center justify-center rounded-xl border border-mint/25 bg-mint/10 text-mint sm:mx-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {c.icon}
              </svg>
            </div>
            <h3 className="text-[15px] font-semibold text-ink">{c.title}</h3>
            <p className="mt-1.5 text-xs leading-relaxed text-ink-dim">{c.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

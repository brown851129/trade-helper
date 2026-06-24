import Link from "next/link";
import RecordRow from "./RecordRow";
import { RECENT } from "./data";

export default function RecentRecords() {
  return (
    <section id="recent" className="scroll-mt-20">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight text-ink">最近分析紀錄</h2>
        <Link
          href="/history"
          className="flex items-center gap-1 text-xs text-mint transition-opacity hover:opacity-80"
        >
          查看全部
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>

      <div className="flex flex-col gap-2.5">
        {RECENT.map((t) => (
          <RecordRow key={t.sym} t={t} />
        ))}
      </div>
    </section>
  );
}

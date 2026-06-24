"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/app/PageHeader";

type AnalyzeResult = {
  score: number;
  grade: "S" | "A" | "B" | "C";
  worthIt: string;
  direction: string;
  advantage: string;
  disadvantage: string;
  mainIssue: string;
  expectedReturn: string;
  action: string;
  analysis: string;
  riskWarning: string;
};

const GRADE_LABEL: Record<string, string> = {
  S: "S級 — 頂級機會",
  A: "A級 — 高品質機會",
  B: "B級 — 一般機會",
  C: "C級 — 低品質機會",
};

const GRADE_STYLE: Record<string, { ring: string; text: string; badge: string }> = {
  S: { ring: "#7df9ff", text: "text-cyan-300", badge: "text-cyan-300 border-cyan-300/40 bg-cyan-300/10" },
  A: { ring: "#2fe3a0", text: "text-[#2fe3a0]", badge: "text-[#2fe3a0] border-[#2fe3a0]/40 bg-[#2fe3a0]/10" },
  B: { ring: "#fbbf24", text: "text-amber-400", badge: "text-amber-400 border-amber-400/40 bg-amber-400/10" },
  C: { ring: "#6b7280", text: "text-white/40", badge: "text-white/40 border-white/15 bg-white/5" },
};

const WORTH_STYLE: Record<string, string> = {
  "值得參與": "text-[#2fe3a0] border-[#2fe3a0]/30 bg-[#2fe3a0]/10",
  "謹慎評估": "text-amber-400 border-amber-400/30 bg-amber-400/10",
  "不建議參與": "text-red-400 border-red-400/30 bg-red-400/10",
};

function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const style = GRADE_STYLE[grade] ?? GRADE_STYLE.C;
  const R = 52;
  const circ = 2 * Math.PI * R;
  return (
    <div className="relative flex h-[148px] w-[148px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 136 136" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="68" cy="68" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle
          cx="68" cy="68" r={R} fill="none"
          stroke={style.ring} strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - Math.min(100, Math.max(0, score)) / 100)}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 10px ${style.ring}99)` }}
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <div className="flex items-end leading-none">
          <span className={`font-mono text-[38px] font-black tracking-tighter ${style.text}`}>{score}</span>
          <span className="mb-2 ml-0.5 font-mono text-[13px] text-white/30">/100</span>
        </div>
        <span className={`mt-1.5 text-[11px] font-bold ${style.text}`}>交易品質</span>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 px-4 py-3">
      <span className="shrink-0 text-[12px] text-white/40">{label}</span>
      <span className={`text-right text-[12px] leading-relaxed ${valueClass ?? "text-white/80"}`}>{value}</span>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
      <div className="border-b border-white/5 bg-white/[0.01] px-4 py-2.5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">{title}</p>
      </div>
      <div className="divide-y divide-white/[0.05]">{children}</div>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<AnalyzeResult | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("analyzeResult");
    if (!raw) {
      router.replace("/analyze");
      return;
    }
    try {
      setResult(JSON.parse(raw) as AnalyzeResult);
    } catch {
      router.replace("/analyze");
    }
  }, [router]);

  if (!result) {
    return (
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col items-center justify-center border-x border-white/5 bg-[#030807] text-white antialiased">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2fe3a0] border-t-transparent" />
      </div>
    );
  }

  const gs = GRADE_STYLE[result.grade] ?? GRADE_STYLE.C;
  const worthClass = WORTH_STYLE[result.worthIt] ?? "text-white/60 border-white/10 bg-white/5";
  const dirIsLong = result.direction.includes("LONG");
  const dirIsShort = result.direction.includes("SHORT");
  const dirClass = dirIsLong ? "text-[#2fe3a0] font-bold" : dirIsShort ? "text-red-400 font-bold" : "text-white/60";

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col border-x border-white/5 bg-[#030807] text-white antialiased">
      <PageHeader
        title="分析結果"
        backHref="/analyze"
        action={
          <button
            type="button"
            aria-label="分享"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 hover:bg-white/5 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        }
      />

      <main className="flex flex-1 flex-col gap-3 px-4 py-4 pb-[88px]">

        {/* 評分圓環 + 評級 */}
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] py-6">
          <ScoreRing score={result.score} grade={result.grade} />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className={`rounded-lg border px-3.5 py-1.5 text-[13px] font-bold ${gs.badge}`}>
              {GRADE_LABEL[result.grade] ?? result.grade}
            </span>
            <span className={`rounded-lg border px-3.5 py-1.5 text-[13px] font-bold ${worthClass}`}>
              {result.worthIt}
            </span>
          </div>
        </div>

        {/* 交易概況 */}
        <SectionCard title="交易概況">
          <Row label="優勢方向" value={result.direction} valueClass={dirClass} />
          <Row label="建議行動" value={result.action} valueClass="text-white/80" />
          <Row label="$1000 預期回報" value={result.expectedReturn} valueClass="font-mono text-white/80 text-right" />
        </SectionCard>

        {/* 深度分析 */}
        <SectionCard title="深度分析">
          <Row label="最大優勢" value={result.advantage} valueClass="text-[#2fe3a0]/90" />
          <Row label="最大缺點" value={result.disadvantage} valueClass="text-red-400/90" />
          <Row label="最大問題" value={result.mainIssue} valueClass="text-amber-400/90" />
        </SectionCard>

        {/* AI 分析觀點 */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="flex h-[18px] items-center rounded border border-[#2fe3a0]/20 bg-[#2fe3a0]/10 px-1.5 text-[10px] font-black tracking-wide text-[#2fe3a0]">
              AI
            </span>
            <span className="text-sm font-bold text-white">分析觀點</span>
          </div>
          <p className="text-[13px] leading-[1.8] text-white/60">{result.analysis}</p>
        </div>

        {/* 風險提醒 */}
        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
          <div className="mb-2.5 flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <path d="m10.29 3.86-8.6 14.9A2 2 0 0 0 3.43 22h17.14a2 2 0 0 0 1.74-2.97l-8.57-14.9a2 2 0 0 0-3.45.73Z" />
              <path d="M12 9v4M12 17h.01" />
            </svg>
            <span className="text-sm font-bold text-amber-400">風險提醒</span>
          </div>
          <p className="text-[13px] leading-relaxed text-amber-400/80">{result.riskWarning}</p>
        </div>

        {/* 儲存紀錄 */}
        <Link
          href="/history"
          className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#2fe3a0] py-4 text-[15px] font-black text-black shadow-[0_0_20px_rgba(47,227,160,0.2)] transition-transform active:scale-[0.99]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
            <path d="M17 21v-8H7v8M7 3v5h8" />
          </svg>
          儲存紀錄
        </Link>

        {/* 再次分析 */}
        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("analyzeResult");
            router.push("/analyze");
          }}
          className="flex items-center justify-center gap-1.5 py-2 text-[13px] text-white/30 transition-colors hover:text-white/60"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
            <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
            <path d="M16 21h5v-5" />
          </svg>
          重新分析另一張圖
        </button>

      </main>
    </div>
  );
}

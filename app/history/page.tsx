"use client";

import { useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/app/SiteHeader";
import Sparkline from "@/components/app/Sparkline";
import { HISTORY, OUTCOME_BADGE, type Trade } from "@/components/app/data";

type Tab = "all" | "long" | "short";

const TABS: { key: Tab; label: string }[] = [
  { key: "all", label: "全部" },
  { key: "long", label: "做多" },
  { key: "short", label: "做空" },
];

const GRADE_COLOR: Record<string, string> = {
  S: "text-[#7df9ff]",
  A: "text-[#2fe3a0]",
  B: "text-amber-400",
  C: "text-white/40",
};

const SHIELD_COLOR: Record<string, string> = {
  S: "#7df9ff",
  A: "#2fe3a0",
  B: "#fbbf24",
  C: "#8a9a98",
};

function GradeShield({ grade }: { grade: Trade["grade"] }) {
  const c = SHIELD_COLOR[grade] ?? "#2fe3a0";
  return (
    <div className="relative flex h-8 w-8 items-center justify-center">
      <svg width="28" height="32" viewBox="0 0 32 36" fill="none" className="absolute inset-0 h-full w-full">
        <path
          d="M16 1L2 7v10c0 8.5 6 16.4 14 18.6C24 33.4 30 25.5 30 17V7L16 1z"
          fill={`${c}12`}
          stroke={`${c}50`}
          strokeWidth="1.5"
        />
      </svg>
      <span className="relative font-mono text-[13px] font-black" style={{ color: c }}>
        {grade}
      </span>
    </div>
  );
}

function RecordCard({ t }: { t: Trade }) {
  const isLong = t.dirEn === "LONG";
  const gradeColor = GRADE_COLOR[t.grade] ?? "text-[#2fe3a0]";
  const gradeLabel = `${t.grade} 級交易機會`;

  return (
    <div className="rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition-all active:scale-[0.99]">
      <div className="flex items-start gap-3">
        {/* 左：K 線縮圖 */}
        <div className="h-[52px] w-[88px] shrink-0 overflow-hidden rounded-lg border border-white/[0.04] bg-white/[0.015] p-1.5 flex items-end">
          <Sparkline trend={t.trend} className="h-full w-full" />
        </div>

        {/* 中：文字資訊 */}
        <div className="flex min-w-0 flex-1 flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-black tracking-tight text-white">{t.sym}</span>
            <span
              className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${
                isLong ? "bg-[#2fe3a0]/10 text-[#2fe3a0]" : "bg-red-500/10 text-red-400"
              }`}
            >
              {isLong ? "做多 LONG" : "做空 SHORT"}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-white/30">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            <span>{t.dateStr ?? t.time}</span>
          </div>

          {t.entryRange && (
            <div className="flex flex-wrap gap-x-3 gap-y-0.5 text-[11px]">
              <span>
                <span className="text-white/30">進場區 </span>
                <span className="font-mono text-white/70">{t.entryRange}</span>
              </span>
              {t.exitPrice && (
                <span>
                  <span className="text-white/30">結束價 </span>
                  <span className="font-mono text-white/70">{t.exitPrice}</span>
                </span>
              )}
            </div>
          )}

          <span
            className={`inline-flex w-fit items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold ${OUTCOME_BADGE[t.outcome]}`}
          >
            {t.result}
            {t.outcome === "win" && (
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6 9 17l-5-5" />
              </svg>
            )}
          </span>
        </div>

        {/* 右：評分 + 盾牌 + 箭頭 */}
        <div className="flex shrink-0 flex-col items-end gap-1">
          <div className="flex items-end leading-none">
            <span className="font-mono text-[22px] font-black tracking-tighter text-[#2fe3a0]">{t.score}</span>
            <span className="mb-0.5 ml-0.5 font-mono text-[9px] text-white/30">/100</span>
          </div>
          <p className={`text-[9px] font-bold ${gradeColor}`}>{gradeLabel}</p>
          <GradeShield grade={t.grade} />
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="mt-0.5 text-white/20"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const [tab, setTab] = useState<Tab>("all");

  const rows =
    tab === "all"
      ? HISTORY
      : tab === "long"
      ? HISTORY.filter((t) => t.dirEn === "LONG")
      : HISTORY.filter((t) => t.dirEn === "SHORT");

  const wins = HISTORY.filter((t) => t.outcome === "win").length;
  const tp1 = Math.round((wins / HISTORY.length) * 100);
  const avgScore = Math.round(HISTORY.reduce((s, t) => s + t.score, 0) / HISTORY.length);
  const maxT = HISTORY.reduce((m, t) => (t.score > m.score ? t : m), HISTORY[0]);

  const STATS = [
    {
      label: "總分析次數",
      value: `${HISTORY.length}`,
      unit: "次",
      icon: (
        <path d="M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" />
      ),
    },
    {
      label: "平均評分",
      value: `${avgScore}`,
      unit: "分",
      icon: <path d="M12 20v-6M6 20V10M18 20V4" />,
    },
    {
      label: "勝率 (TP1)",
      value: `${tp1}%`,
      unit: "",
      icon: (
        <>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </>
      ),
    },
    {
      label: "最高評分",
      value: `${maxT.score}`,
      unit: maxT.sym.replace("USDT", ""),
      icon: (
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
      ),
    },
  ];

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col border-x border-white/5 bg-[#030807] text-white antialiased">
      <SiteHeader />

      {/* 頁面標題 */}
      <div className="flex items-end justify-between px-5 pb-3 pt-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">分析紀錄</h1>
          <p className="mt-0.5 text-xs text-white/40">查看你所有的分析結果與歷史</p>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-white/60 transition-colors hover:text-white"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          搜尋紀錄
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* 分頁 + 篩選 */}
      <div className="flex items-center justify-between px-5 pb-3 pt-1">
        <div className="flex gap-1.5 rounded-xl border border-white/5 bg-white/[0.02] p-1">
          {TABS.map((tb) => (
            <button
              key={tb.key}
              type="button"
              onClick={() => setTab(tb.key)}
              className={`rounded-lg px-3.5 py-1 text-xs font-bold transition-all ${
                tab === tb.key
                  ? "bg-[#2fe3a0]/10 text-[#2fe3a0]"
                  : "text-white/40 hover:text-white/80"
              }`}
            >
              {tb.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-xs font-medium text-white/40 transition-colors hover:text-white"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
          篩選
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>
      </div>

      <main className="flex flex-1 flex-col px-4 pb-[88px]">
        {/* 數據看板 */}
        <div className="mb-4 grid grid-cols-4 divide-x divide-white/5 overflow-hidden rounded-xl border border-white/5 bg-white/[0.015]">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col items-center px-1 py-3.5 text-center">
              <div className="mb-1 flex items-center gap-1 text-white/30">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  {s.icon}
                </svg>
                <span className="text-[9px] font-bold leading-tight tracking-tight">{s.label}</span>
              </div>
              <span className="font-mono text-[20px] font-black leading-none text-[#2fe3a0]">{s.value}</span>
              <span className="mt-1 text-[9px] font-medium text-white/40">{s.unit}</span>
            </div>
          ))}
        </div>

        {/* 紀錄卡片列表 */}
        <div className="flex flex-col gap-3">
          {rows.map((t, i) => (
            <RecordCard key={`${t.sym}-${i}`} t={t} />
          ))}
          {rows.length === 0 && (
            <p className="py-16 text-center text-sm font-medium text-white/30">這個分類目前沒有紀錄。</p>
          )}
        </div>

        {/* 底部計數 + 載入更多 */}
        {rows.length > 0 && (
          <div className="mt-5 flex flex-col items-center gap-3">
            <p className="text-[11px] font-medium text-white/30">共 {HISTORY.length} 筆紀錄</p>
            <button
              type="button"
              className="flex items-center gap-1 rounded-xl border border-white/5 bg-white/[0.01] px-5 py-2 text-xs font-bold text-white/50 transition-colors hover:text-white"
            >
              載入更多
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

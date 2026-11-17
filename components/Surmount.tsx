"use client";

import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ErrorBar,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { sources, surmount1 } from "@/lib/data";
import Reveal from "./Reveal";
import SourceLink from "./SourceLink";

const NEON = "#B6FF3B";

const data = surmount1.arms.map((a) => ({
  ...a,
  // ErrorBar 需要 [下方距離, 上方距離]
  err: [Number((a.value - a.ciLow).toFixed(1)), Number((a.ciHigh - a.value).toFixed(1))],
}));

type TipProps = { active?: boolean; payload?: { payload: (typeof data)[number] }[] };

function Tip({ active, payload }: TipProps) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload;
  return (
    <div className="rounded-xl border border-white/15 bg-ink/95 px-4 py-3 text-sm shadow-2xl backdrop-blur">
      <p className="font-mono text-xs text-mute">{p.group}</p>
      <p className="mt-1 font-mono text-2xl font-bold text-white">−{p.value.toFixed(1)}%</p>
      <p className="mt-1 font-mono text-[11px] text-mute">
        95% CI −{p.ciHigh.toFixed(1)} 至 −{p.ciLow.toFixed(1)}
      </p>
    </div>
  );
}

export default function Surmount() {
  const [active, setActive] = useState<number | null>(null);
  const [showCI, setShowCI] = useState(true);

  return (
    <section className="relative border-t border-line py-24 sm:py-36">
      <div className="container-x">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="eyebrow">03 — 大型臨床試驗</span>
            <span className="tag-fact">研究事實</span>
          </div>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">那高劑量真的比較有效嗎？</h2>
          <p className="mt-6 text-2xl font-bold">
            答案是：<span className="text-neon">平均而言，是。</span>
          </p>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-white/75">
            SURMOUNT-1 是隨機、雙盲、安慰劑對照的第三期試驗，共納入{" "}
            <b className="text-white">{surmount1.n.toLocaleString()} 人</b>（無糖尿病的肥胖或過重成人），觀察{" "}
            <b className="text-white">{surmount1.weeks} 週</b>。
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-12 rounded-3xl border border-line bg-panel p-4 pt-6 sm:p-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-2">
              <p className="eyebrow">第 72 週平均體重下降（%）</p>
              <button
                type="button"
                onClick={() => setShowCI((v) => !v)}
                className={`rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider transition ${
                  showCI ? "border-neon/50 text-neon" : "border-white/15 text-mute hover:text-white"
                }`}
                aria-pressed={showCI}
              >
                {showCI ? "● " : "○ "}95% 信賴區間
              </button>
            </div>
            <div className="h-[340px] w-full sm:h-[420px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 36, right: 8, left: -18, bottom: 0 }}
                  onMouseLeave={() => setActive(null)}
                >
                  <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                  <XAxis
                    dataKey="group"
                    tickLine={false}
                    axisLine={{ stroke: "rgba(255,255,255,0.15)" }}
                    tick={{ fill: "#C9CDD3", fontSize: 13, fontFamily: "var(--font-mono)" }}
                  />
                  <YAxis
                    domain={[0, 25]}
                    ticks={[0, 5, 10, 15, 20, 25]}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#6B717A", fontSize: 11, fontFamily: "var(--font-mono)" }}
                    tickFormatter={(v) => `${v}%`}
                  />
                  <Tooltip content={<Tip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                  <Bar
                    dataKey="value"
                    radius={[8, 8, 0, 0]}
                    maxBarSize={88}
                    animationDuration={1400}
                    animationEasing="ease-out"
                    onMouseEnter={(_, i) => setActive(i)}
                  >
                    {data.map((d, i) => {
                      const base = d.dose === 0 ? "rgba(255,255,255,0.18)" : NEON;
                      const dim = active !== null && active !== i;
                      return <Cell key={d.group} fill={base} fillOpacity={dim ? 0.25 : d.dose === 0 ? 1 : 0.35 + d.dose / 25} />;
                    })}
                    <LabelList
                      dataKey="value"
                      position="top"
                      offset={showCI ? 18 : 10}
                      formatter={(v: number) => `${v.toFixed(1)}%`}
                      style={{ fill: "#fff", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-mono)" }}
                    />
                    {showCI && <ErrorBar dataKey="err" width={10} strokeWidth={1.5} stroke="rgba(255,255,255,0.7)" />}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-3 px-2 text-xs leading-relaxed text-mute">
              數值為原始論文報告之平均體重變化百分比（以正值呈現「下降」）。圖表未做任何調整或外推。出處 [2]
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-line p-7 sm:p-9">
              <span className="tag-view">我的解讀</span>
              <div className="mt-6 flex items-end gap-6 font-mono">
                <div>
                  <p className="text-xs text-mute">劑量</p>
                  <p className="text-4xl font-bold sm:text-5xl">×3</p>
                  <p className="mt-1 text-xs text-mute">5 → 15 mg</p>
                </div>
                <div className="pb-6 text-2xl text-white/30">vs</div>
                <div>
                  <p className="text-xs text-mute">平均減重</p>
                  <p className="text-4xl font-bold text-neon sm:text-5xl">×1.39</p>
                  <p className="mt-1 text-xs text-mute">15.0% → 20.9%</p>
                </div>
              </div>
              <p className="mt-7 leading-relaxed text-white/80">
                5 mg 增加到 15 mg，劑量變成三倍，但平均減重幅度並沒有變成三倍。
                這不代表高劑量沒價值——對需要更大幅度減重的人，多出來的那 5.9 個百分點可能非常重要。
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col justify-between rounded-3xl border border-neon/30 bg-neon/[0.04] p-7 sm:p-9">
              <p className="text-2xl font-black leading-snug sm:text-3xl">
                「劑量越高，平均效果通常越好，不代表每個人都需要最高劑量。」
              </p>
              <p className="mt-6 font-mono text-xs tracking-[0.2em] text-neon">— 浩穎</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-line bg-panel p-6 text-[15px] leading-relaxed text-white/70">
            <p className="mb-2 font-bold text-white">特別註明</p>
            <p>
              SURMOUNT-1 <b className="text-white">沒有長期 2.5 mg 維持組</b>（2.5 mg 只在加量期使用），不能用來證明 2.5 mg
              與其他劑量療效相當。另外，日本研究（6 個月）與 SURMOUNT-1（72 週）的族群、設計與時間長度都不同，兩邊的數字不能直接互相比較。
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <SourceLink href={sources.surmount.url}>查看 NEJM 原文</SourceLink>
            <span className="text-xs text-mute">
              出處：Jastreboff AM, et al. <i>N Engl J Med</i> 2022. [2]
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

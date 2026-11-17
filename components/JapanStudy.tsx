"use client";

import { motion } from "framer-motion";
import { japanStudy as d, sources } from "@/lib/data";
import CountUp from "./CountUp";
import Reveal from "./Reveal";
import SourceLink from "./SourceLink";

const SCALE = 20; // 長條以 20% 為滿格，兩邊同一尺度

function Bar({ value, max, accent }: { value: number; max: number; accent: boolean }) {
  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
      <motion.div
        className={`absolute inset-y-0 left-0 rounded-full ${accent ? "bg-neon" : "bg-white/60"}`}
        initial={{ width: 0 }}
        whileInView={{ width: `${(value / max) * 100}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

function Panel({
  dose,
  n,
  wl,
  kg,
  ae,
  accent,
}: {
  dose: string;
  n: number;
  wl: number;
  kg: number;
  ae: number;
  accent: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl border p-6 sm:p-9 ${
        accent ? "border-neon/40 bg-gradient-to-b from-neon/[0.08] to-transparent" : "border-line bg-panel"
      }`}
    >
      <div className="flex items-baseline justify-between">
        <span className={`font-mono text-2xl font-bold sm:text-3xl ${accent ? "text-neon" : "text-white"}`}>{dose}</span>
        <span className="font-mono text-xs text-mute">n = {n}</span>
      </div>

      <p className="eyebrow mt-8">6 個月平均體重下降</p>
      <p
        className={`mt-2 font-mono font-bold leading-none tracking-tighter ${accent ? "text-neon" : "text-white"}`}
        style={{ fontSize: "clamp(3.5rem, 13vw, 7.5rem)" }}
      >
        <CountUp to={wl} suffix="%" />
      </p>
      <p className="mt-2 font-mono text-sm text-mute">≈ −{kg.toFixed(1)} kg</p>
      <div className="mt-5">
        <Bar value={wl} max={SCALE} accent={accent} />
      </div>

      <div className="mt-8 border-t border-line pt-6">
        <p className="eyebrow">不良事件比例</p>
        <p className="mt-2 font-mono text-3xl font-bold sm:text-4xl">
          <CountUp to={ae} decimals={0} suffix="%" />
        </p>
        <div className="mt-4">
          <Bar value={ae} max={100} accent={false} />
        </div>
      </div>
    </div>
  );
}

export default function JapanStudy() {
  return (
    <section id="data" className="relative border-t border-line py-24 sm:py-36">
      <div className="container-x">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="eyebrow">02 — 研究數據</span>
            <span className="tag-fact">研究事實</span>
          </div>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">不要只聽我說，直接看數據。</h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-10 max-w-3xl">
            <p className="text-sm font-bold tracking-wide text-neon">日本低劑量研究（2026）</p>
            <p className="mt-3 text-lg leading-relaxed text-white/80">
              一項日本多中心前瞻性研究，比較沒有糖尿病的肥胖成人使用 2.5 mg 與 5 mg 的結果。
              共 <b className="text-white">{d.analysed} 人</b>完成分析（2.5 mg {d.n25} 人、5 mg {d.n5} 人），觀察
              <b className="text-white">六個月</b>，兩組皆合併生活型態介入。
            </p>
          </div>
        </Reveal>

        <div className="relative mt-12 grid gap-4 md:grid-cols-2 md:gap-6">
          <Reveal>
            <Panel dose="2.5 mg" n={d.n25} wl={d.weightLoss.d25} kg={d.weightLossKg.d25} ae={d.adverseEvents.d25} accent />
          </Reveal>
          <Reveal delay={0.12}>
            <Panel dose="5 mg" n={d.n5} wl={d.weightLoss.d5} kg={d.weightLossKg.d5} ae={d.adverseEvents.d5} accent={false} />
          </Reveal>
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-line bg-ink font-mono text-xs text-mute">
              VS
            </span>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-line p-5">
              <p className="eyebrow">兩組差距</p>
              <p className="mt-2 font-mono text-3xl font-bold">0.8 <span className="text-base text-mute">個百分點</span></p>
            </div>
            <div className="rounded-2xl border border-line p-5">
              <p className="eyebrow">統計檢定</p>
              <p className="mt-2 font-mono text-3xl font-bold">p = {d.pValue}</p>
              <p className="mt-1 text-sm text-mute">未達顯著差異</p>
            </div>
            <div className="rounded-2xl border border-line p-5">
              <p className="eyebrow">劑量</p>
              <p className="mt-2 font-mono text-3xl font-bold">×2</p>
              <p className="mt-1 text-sm text-mute">5 mg 是 2.5 mg 的兩倍</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 rounded-3xl border border-neon/30 bg-neon/[0.04] p-7 sm:p-10">
            <span className="tag-view">我的觀點</span>
            <p className="mt-5 text-2xl font-black leading-snug sm:text-4xl">
              「劑量增加一倍，<br className="sm:hidden" />
              平均減重效果卻沒有跟著增加一倍。」
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 rounded-2xl border border-line bg-panel p-6 text-[15px] leading-relaxed text-white/70">
            <p className="mb-3 font-bold text-white">必須講清楚的限制</p>
            <ul className="space-y-2">
              <li>— 這是小型、<b className="text-white">非隨機分組</b>研究，不能證明兩個劑量具有相同療效。</li>
              <li>
                — 留在 2.5 mg 或加到 5 mg，是醫病共同決策決定的。早期反應好的人可能本來就比較會留在
                2.5 mg，這可能讓低劑量組看起來比較好。
              </li>
              <li>— 只追蹤六個月，且是完成追蹤者的分析，不能證明 2.5 mg 適合所有人長期使用。</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <SourceLink href={sources.japan.url}>查看原始研究</SourceLink>
            <span className="text-xs text-mute">
              出處：Amioka M, et al. <i>Diabetes, Obesity and Metabolism</i>, 2026. [1]
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

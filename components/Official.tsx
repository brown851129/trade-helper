"use client";

import { motion } from "framer-motion";
import { sources } from "@/lib/data";
import Reveal from "./Reveal";
import SourceLink from "./SourceLink";

const steps = [
  { when: "第 1–4 週", dose: "2.5 mg", note: "起始劑量，每週一次" },
  { when: "第 5 週起", dose: "5 mg", note: "四週後增加至每週 5 mg" },
  { when: "之後視需要", dose: "+2.5 mg", note: "至少 4 週後再增加，最高每週 15 mg" },
];

export default function Official() {
  return (
    <section className="relative border-t border-line py-24 sm:py-36">
      <div className="container-x">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="eyebrow">05 — 官方立場</span>
            <span className="tag-fact">官方仿單</span>
          </div>
          <h2 className="max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
            既然 2.5 mg 可能有效，<br className="hidden sm:block" />
            為什麼官方還是建議加量？
          </h2>
          <p className="mt-6 text-lg text-white/70">根據 FDA 核准的 Mounjaro 仿單：</p>
        </Reveal>

        <div className="relative mt-12">
          <motion.div
            aria-hidden
            className="absolute left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-neon via-white/20 to-white/5 md:left-0 md:right-0 md:top-[19px] md:bottom-auto md:h-px md:w-auto md:origin-left md:bg-gradient-to-r"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <ol className="relative grid gap-8 md:grid-cols-3 md:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.when} delay={0.15 + i * 0.12}>
                <li className="flex gap-5 md:block">
                  <span
                    className={`relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-mono text-xs ${
                      i === 0 ? "border-neon bg-neon text-ink" : "border-white/20 bg-ink text-white/70"
                    }`}
                  >
                    {i + 1}
                  </span>
                  <div className="md:mt-6">
                    <p className="font-mono text-xs tracking-wider text-mute">{s.when}</p>
                    <p className={`mt-1 font-mono text-4xl font-bold ${i === 0 ? "text-neon" : "text-white"}`}>{s.dose}</p>
                    <p className="mt-2 text-sm text-white/65">{s.note}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-panel p-6 leading-relaxed text-white/75">
              <p className="mb-2 font-bold text-white">重點</p>
              <p>
                <b className="text-neon">2.5 mg 是起始劑量，不是標準維持劑量。</b>
                大型臨床試驗與核准療程尚未建立充分證據，支持一般患者長期使用 2.5 mg 作為維持治療。
              </p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/[0.03] p-6 leading-relaxed text-white/75">
              <p className="mb-2 font-bold text-white">所以請記得</p>
              <p>
                不能把我的個人觀點當成自行調整劑量的依據。任何劑量變更都應該和你的醫師討論。
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-mute">
            補充：在美國，Mounjaro 的 FDA 核准適應症是第二型糖尿病的血糖控制；同成分用於體重管理的美國品牌為 Zepbound。
            各國核准的適應症與劑量規定可能不同，請以當地仿單與醫師判斷為準。
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <SourceLink href={sources.fda.url}>查看 FDA 官方仿單</SourceLink>
            <span className="text-xs text-mute">出處：FDA, MOUNJARO Prescribing Information. [3]</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

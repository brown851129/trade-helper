"use client";

import { motion } from "framer-motion";
import Reveal from "./Reveal";

const ladder = ["2.5", "5", "7.5", "10", "12.5", "15"];

export default function Opinion() {
  return (
    <section id="view" className="relative border-t border-line py-24 sm:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <Reveal>
            <div className="mb-6 flex items-center gap-3">
              <span className="eyebrow">01 — 我的觀點</span>
              <span className="tag-view">浩穎觀點</span>
            </div>
            <h2 className="text-3xl font-black leading-tight sm:text-5xl">我一直覺得一件事情很奇怪。</h2>
          </Reveal>

          <div className="mt-10 space-y-5 text-lg leading-[1.9] text-white/80">
            <Reveal delay={0.05}>
              <p>猛健樂從 2.5 mg 開始。</p>
              <p>接著 5 mg、7.5 mg、10 mg，甚至 15 mg。</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-white">但問題來了。</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>
                如果一個人使用 2.5 mg，就已經明顯降低食慾、減少進食，甚至持續減重。
                <br />
                那他為什麼一定要繼續加量？
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>我不是說每個人都只需要 2.5 mg。我想討論的是：</p>
            </Reveal>
            <Reveal delay={0.25}>
              <blockquote className="border-l-2 border-neon pl-5 text-xl font-bold leading-relaxed text-white sm:text-2xl">
                我們是不是太習慣按照劑量表往上走，卻忽略了每個人的實際反應？
              </blockquote>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="mt-12 rounded-2xl border border-line bg-panel p-6">
              <span className="tag-fact">事實</span>
              <p className="mt-3 leading-relaxed text-white/75">
                目前官方核准療程以 2.5 mg 作為起始劑量，四週後增加至 5 mg；2.5 mg 並非標準維持劑量。
              </p>
              <div className="my-5 h-px bg-line" />
              <span className="tag-view">我的推論</span>
              <p className="mt-3 leading-relaxed text-white/90">
                但我認為，對於低劑量反應良好的人，是否有更個人化的治療方式，是值得研究的問題。
              </p>
            </div>
          </Reveal>
        </div>

        {/* 劑量階梯視覺 */}
        <Reveal delay={0.15} className="lg:pt-24">
          <p className="eyebrow mb-5">仿單劑量階梯（需要時，至少 4 週後再加 2.5 mg）</p>
          <ol className="space-y-2.5">
            {ladder.map((d, i) => (
              <motion.li
                key={d}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`flex items-center gap-4 rounded-xl border px-5 py-3.5 ${
                  i === 0 ? "border-neon/60 bg-neon/[0.07]" : "border-line bg-white/[0.02]"
                }`}
              >
                <span className="w-10 font-mono text-xs text-mute">{String(i + 1).padStart(2, "0")}</span>
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className={`absolute inset-y-0 left-0 rounded-full ${i === 0 ? "bg-neon" : "bg-white/35"}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(Number(d) / 15) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <span className={`w-20 text-right font-mono text-lg ${i === 0 ? "font-bold text-neon" : "text-white/70"}`}>
                  {d} mg
                </span>
              </motion.li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-relaxed text-mute">
            我的問題是：如果第一格就有反應，往下走的每一步，是為了治療目標，還是為了把表格走完？
          </p>
        </Reveal>
      </div>
    </section>
  );
}

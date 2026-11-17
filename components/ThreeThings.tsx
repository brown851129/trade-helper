"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Reveal from "./Reveal";

const items = [
  {
    no: "01",
    title: "食慾降低，不代表一定要加量",
    view: "如果低劑量已經產生明顯反應，我認為應該先評估治療成果，而不是自動進到下一格。",
    caveat: "但食慾降低不等於體重、血糖及其他健康指標都已達標。評估要看完整的指標。",
  },
  {
    no: "02",
    title: "副作用也應該納入比較",
    view: "我認為不能只看減掉多少公斤，也要看身體能不能承受。",
    caveat: "噁心、嘔吐、腹瀉、便祕，都是 tirzepatide 已知的副作用。在日本研究中，5 mg 組的不良事件比例（50%）高於 2.5 mg 組（35%）。",
  },
  {
    no: "03",
    title: "我更在意長期結果",
    view: "我不在意一個月能瘦得多誇張。我在意的是半年、一年後，能不能維持效果。",
    caveat: "目前 2.5 mg 長期維持的高品質證據仍然不足。所以這是一個值得繼續研究的問題，而不是已經得到證實的答案。",
  },
];

export default function ThreeThings() {
  const [open, setOpen] = useState<number>(0);

  return (
    <section className="relative border-t border-line py-24 sm:py-36">
      <div className="container-x">
        <Reveal>
          <div className="mb-6 flex items-center gap-3">
            <span className="eyebrow">04 — 被忽略的事</span>
            <span className="tag-view">浩穎觀點</span>
          </div>
          <h2 className="text-3xl font-black leading-tight sm:text-5xl">我認為大家忽略的三件事</h2>
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={it.no} delay={i * 0.1}>
                <motion.button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 24 }}
                  className={`group relative w-full overflow-hidden rounded-3xl border p-7 text-left transition-colors sm:p-8 ${
                    isOpen ? "border-neon/50 bg-neon/[0.05]" : "border-line bg-panel hover:border-white/20"
                  }`}
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px origin-left bg-neon"
                    initial={false}
                    animate={{ scaleX: isOpen ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={`font-mono text-5xl font-bold leading-none transition-colors sm:text-6xl ${
                        isOpen ? "text-neon" : "text-white/15 group-hover:text-white/30"
                      }`}
                    >
                      {it.no}
                    </span>
                    <motion.span
                      className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/15 font-mono text-sm"
                      animate={{ rotate: isOpen ? 45 : 0 }}
                    >
                      +
                    </motion.span>
                  </div>
                  <h3 className="mt-8 text-xl font-bold leading-snug sm:text-2xl">{it.title}</h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-5">
                          <p className="leading-relaxed text-white/90">{it.view}</p>
                          <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-white/60">
                            {it.caveat}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "framer-motion";
import Reveal from "./Reveal";

const headline = ["猛健樂", "不是在比", "誰打得多。"];

export default function Conclusion() {
  const reduce = useReducedMotion();
  return (
    <section className="noise relative overflow-hidden border-t border-line py-28 sm:py-44">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative">
        <Reveal>
          <div className="mb-10 flex items-center gap-3">
            <span className="eyebrow">06 — 結論</span>
            <span className="tag-view">浩穎觀點</span>
          </div>
        </Reveal>

        <h2 className="font-black leading-[1.02] tracking-tight" style={{ fontSize: "clamp(3rem, 12vw, 9.5rem)" }}>
          {headline.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 2 ? "text-neon" : ""}`}
                initial={reduce ? false : { y: "105%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="space-y-4 text-lg leading-[1.9] text-white/80">
              <p>我不否認高劑量可能帶來更大的減重效果。</p>
              <p>我也不否認有些人確實需要更高劑量。</p>
              <p className="text-white">但我不認同把加量本身當成治療目標。</p>
              <p>如果有人在 2.5 mg 就出現明顯效果，那這件事值得被認真研究。</p>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="rounded-3xl border border-neon/40 bg-neon/[0.05] p-7 sm:p-10">
              <p className="eyebrow !text-neon">我的核心觀點</p>
              <p className="mt-5 text-2xl font-bold leading-snug sm:text-3xl">
                「不是每個人都需要最高劑量。真正重要的是在醫療評估下，找到能達成治療目標、風險又能接受的劑量。」
              </p>
              <p className="mt-10 text-right text-2xl font-black tracking-wider">— 浩穎</p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-20 border-t border-line pt-10">
            <p className="eyebrow mb-6">看完只要記得三件事</p>
            <ol className="grid gap-4 md:grid-cols-3">
              {[
                "這是浩穎寫的。",
                "2.5 mg 對部分人可能有明顯效果，但長期維持的證據仍不足。",
                "加量應該服務於治療目標，而不是成為目的本身。",
              ].map((t, i) => (
                <li key={t} className="flex gap-4 rounded-2xl border border-line p-5">
                  <span className="font-mono text-sm text-neon">{["一", "二", "三"][i]}</span>
                  <span className="leading-relaxed text-white/85">{t}</span>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { sources } from "@/lib/data";
import Reveal from "./Reveal";

const list = [sources.japan, sources.surmount, sources.fda];

export default function References() {
  return (
    <section id="refs" className="relative border-t border-line py-24 sm:py-32">
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">07 — 參考文獻</span>
          <h2 className="mt-6 text-3xl font-black sm:text-5xl">參考文獻</h2>
          <p className="mt-4 text-white/60">每一篇都可以點開看原文。不要相信我，去看原始資料。</p>
        </Reveal>

        <ol className="mt-12 divide-y divide-line border-y border-line">
          {list.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.08}>
              <li>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-3 py-7 transition-colors sm:grid-cols-[60px_1fr_auto] sm:items-center sm:gap-6"
                >
                  <span className="font-mono text-sm text-mute group-hover:text-neon">[{s.id}]</span>
                  <span>
                    <span className="block text-lg font-bold group-hover:text-neon">{s.label}</span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-white/55">{s.citation}</span>
                    <span className="mt-2 block break-all font-mono text-[11px] text-white/35">{s.url}</span>
                  </span>
                  <span className="hidden font-mono text-xl text-white/40 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-neon sm:block">
                    ↗
                  </span>
                </a>
              </li>
            </Reveal>
          ))}
        </ol>
        <p className="mt-6 text-xs leading-relaxed text-mute">
          數據核對日期：2026-11-17。日本研究數據取自 PubMed／期刊摘要；SURMOUNT-1 數據取自 NEJM 原文摘要；劑量規定取自 FDA 核准仿單。
        </p>
      </div>
    </section>
  );
}

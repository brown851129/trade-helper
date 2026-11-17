"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const numY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const chars = "2.5".split("");

  return (
    <section
      id="top"
      ref={ref}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden pt-16"
    >
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[42%] h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-neon/20 blur-[120px]"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease }}
      />

      <motion.div style={{ opacity: fade }} className="container-x relative z-10 py-16">
        <motion.p
          className="eyebrow mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          Independent Research · Tirzepatide / Mounjaro
        </motion.p>

        <motion.h1
          className="max-w-4xl text-[2.1rem] font-black leading-[1.15] tracking-tight sm:text-5xl md:text-6xl"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease }}
        >
          猛健樂，真的需要一直加量嗎？
        </motion.h1>
        <motion.h2
          className="mt-4 max-w-3xl text-lg font-medium text-white/65 sm:text-2xl"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.25, ease }}
        >
          為什麼我認為 2.5 mg 就值得重新討論？
        </motion.h2>

        {/* 主視覺數字 */}
        <motion.div style={{ y: numY }} className="relative mt-10 sm:mt-14">
          <div className="flex items-end gap-3 sm:gap-5">
            <span
              className="flex font-mono font-bold leading-[0.8] tracking-tightest text-neon"
              style={{ fontSize: "clamp(7rem, 30vw, 22rem)" }}
              aria-label="2.5 mg"
            >
              {chars.map((c, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  initial={reduce ? false : { opacity: 0, y: "40%", filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                  transition={{ duration: 1.1, delay: 0.45 + i * 0.12, ease }}
                >
                  {c}
                </motion.span>
              ))}
            </span>
            <motion.span
              className="mb-[0.6em] font-mono text-3xl font-medium text-white/80 sm:text-6xl"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.95, ease }}
            >
              mg
            </motion.span>
          </div>
          <motion.div
            className="mt-6 h-px w-full max-w-xl origin-left bg-gradient-to-r from-neon via-neon/40 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.4, delay: 1, ease }}
          />
          <motion.p
            className="mt-6 max-w-xl text-xl font-medium leading-relaxed sm:text-2xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease }}
          >
            「如果低劑量就有效，<br className="sm:hidden" />
            為什麼一定要往上加？」
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.35 }}
        >
          <p className="font-mono text-xs tracking-[0.2em] text-white">
            WRITTEN BY <span className="font-sans text-base font-bold tracking-normal text-neon">浩穎</span>
          </p>
          <p className="font-mono text-xs tracking-[0.15em] text-mute">2026.11｜個人獨立研究</p>
        </motion.div>
      </motion.div>

      <motion.a
        href="#view"
        aria-label="往下閱讀"
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 font-mono text-[10px] tracking-[0.3em] text-mute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <span className="flex flex-col items-center gap-2">
          SCROLL
          <motion.span
            className="block h-8 w-px bg-white/40"
            animate={reduce ? {} : { scaleY: [0.2, 1, 0.2], originY: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}

"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const links = [
  { href: "#data", label: "研究數據" },
  { href: "#view", label: "我的觀點" },
  { href: "#refs", label: "參考文獻" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5" aria-label="浩穎研究室 首頁">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-neon font-mono text-[11px] font-bold text-ink">
            HY
          </span>
          <span className="text-[15px] font-bold tracking-wide">浩穎研究室</span>
        </a>
        <nav className="flex items-center text-[13px] text-white/70 sm:text-sm">
          {links.map((l, i) => (
            <span key={l.href} className="flex items-center">
              {i > 0 && <span className="mx-2 text-white/20 sm:mx-3">｜</span>}
              <a href={l.href} className="transition-colors hover:text-neon">
                {l.label}
              </a>
            </span>
          ))}
        </nav>
      </div>
      <motion.div style={{ scaleX: progress }} className="h-px origin-left bg-neon" />
    </header>
  );
}

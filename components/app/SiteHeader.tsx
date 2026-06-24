import Link from "next/link";
import Logo from "./Logo";

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#05080a]/88 backdrop-blur-xl">
      <div className="flex items-center justify-between px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-mint">
            <Logo size={26} />
          </span>
          <span className="leading-tight">
            <span className="block text-[15px] font-bold tracking-wide text-ink">
              交易助手
            </span>
            <span className="block text-[10px] text-ink-faint">
              進場前，先看一眼。
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="設定"
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-ink-dim transition-colors hover:text-ink"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="通知"
            className="relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-ink-dim transition-colors hover:text-ink"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-mint shadow-[0_0_6px_rgba(47,227,160,1)]" />
          </button>
        </div>
      </div>
    </header>
  );
}

import Logo from "./Logo";

export default function AppFooter() {
  return (
    <footer className="mt-16 border-t border-white/5 px-5 py-8">
      <div className="flex items-center gap-2.5">
        <span className="text-mint">
          <Logo size={22} />
        </span>
        <span className="text-sm font-bold text-ink">交易助手</span>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-ink-faint">
        不預測未來，只幫你避開爛單。
        <br />
        分析結果僅供參考，最終決策由您自行判斷。
      </p>
      <p className="mt-4 font-mono text-[10px] tracking-widest text-ink-faint/70">
        © 2026 交易助手 · SYSTEM ONLINE
      </p>
    </footer>
  );
}

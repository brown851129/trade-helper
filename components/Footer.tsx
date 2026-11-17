export default function Footer() {
  return (
    <footer className="border-t border-line pb-10 pt-12">
      <div className="container-x">
        <div className="rounded-2xl border border-amber-300/30 bg-amber-300/[0.06] p-5 sm:p-6" role="note">
          <p className="text-sm font-bold text-amber-200">醫療聲明</p>
          <p className="mt-1.5 text-sm leading-relaxed text-white/80">
            本文僅供研究討論，不構成醫療建議，處方藥劑量應由醫師評估。請勿依本文內容自行調整或停止用藥。
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-bold">浩穎研究室</p>
          <p className="font-mono text-xs text-mute">© 2026 浩穎研究室｜Written by 浩穎</p>
        </div>
      </div>
    </footer>
  );
}

"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SiteHeader from "@/components/app/SiteHeader";
import Sparkline from "@/components/app/Sparkline";
import { RECENT, GRADE_COLOR } from "@/components/app/data";

// ─── 五角雷達圖（靜態示例） ───────────────────────────────────────────────────
function PentaChart() {
  const cx = 100, cy = 100, maxR = 64;
  function pt(i: number, r: number) {
    const a = ((i * 72 - 90) * Math.PI) / 180;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as [number, number];
  }
  const axes = [0, 1, 2, 3, 4];
  const data = [85, 88, 82, 78, 87];
  const labels = ["趨勢結構", "支撐壓力", "風險報酬", "量能分析", "進場位置"];
  const outerPts = axes.map((i) => pt(i, maxR));
  const dataPts = data.map((v, i) => pt(i, (v / 100) * maxR));
  const outerPath = outerPts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ") + " Z";
  const dataPath = dataPts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ") + " Z";
  const labelConfig: { anchor: "middle" | "start" | "end"; dy: number; dx: number }[] = [
    { anchor: "middle", dy: -12, dx: 0 },
    { anchor: "start", dy: 2, dx: 4 },
    { anchor: "start", dy: 14, dx: 0 },
    { anchor: "end", dy: 14, dx: 0 },
    { anchor: "end", dy: 2, dx: -4 },
  ];
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
      {[0.25, 0.5, 0.75, 1].map((level) => {
        const pts = axes.map((i) => pt(i, maxR * level));
        const p = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ") + " Z";
        return <path key={level} d={p} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />;
      })}
      {axes.map((i) => { const [x, y] = pt(i, maxR); return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.8" />; })}
      <path d={outerPath} fill="none" stroke="rgba(47,227,160,0.15)" strokeWidth="1" />
      <path d={dataPath} fill="rgba(47,227,160,0.22)" stroke="#2fe3a0" strokeWidth="1.5" />
      {dataPts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5" fill="#2fe3a0" />)}
      {labelConfig.map((cfg, i) => {
        const [x, y] = pt(i, maxR);
        return (
          <g key={i}>
            <text x={x + cfg.dx} y={y + cfg.dy} textAnchor={cfg.anchor} fill="rgba(255,255,255,0.45)" fontSize="9" fontWeight="500">{labels[i]}</text>
            <text x={x + cfg.dx} y={y + cfg.dy + 10} textAnchor={cfg.anchor} fill="#2fe3a0" fontSize="9" fontWeight="bold" fontFamily="monospace">{data[i]}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── 圓形進度條（靜態示例） ──────────────────────────────────────────────────
function CircleProgress({ pct = 65 }: { pct?: number }) {
  const R = 20, circ = 2 * Math.PI * R;
  return (
    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
      <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90 h-full w-full">
        <circle cx="24" cy="24" r={R} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
        <circle cx="24" cy="24" r={R} fill="none" stroke="#2fe3a0" strokeWidth="3.5"
          strokeDasharray={circ} strokeDashoffset={circ * (1 - pct / 100)} strokeLinecap="round" />
      </svg>
      <span className="relative font-mono text-[11px] font-bold text-[#2fe3a0]">{pct}%</span>
    </div>
  );
}

// ─── 分數圓環（靜態示例） ────────────────────────────────────────────────────
function ScoreCircle() {
  const R = 52, circ = 2 * Math.PI * R;
  return (
    <div className="relative flex h-[140px] w-[140px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 136 136" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="68" cy="68" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle cx="68" cy="68" r={R} fill="none" stroke="#2fe3a0" strokeWidth="6"
          strokeDasharray={circ} strokeDashoffset={circ * 0.18} strokeLinecap="round"
          style={{ filter: "drop-shadow(0 0 8px #2fe3a088)" }} />
      </svg>
      <div className="relative flex flex-col items-center">
        <div className="flex items-end leading-none">
          <span className="font-mono text-[34px] font-black tracking-tighter text-[#2fe3a0]">84</span>
          <span className="mb-1.5 ml-0.5 font-mono text-[12px] text-white/30">/100</span>
        </div>
        <span className="mt-1.5 text-center text-[11px] font-bold tracking-wide text-[#2fe3a0]">A級交易機會</span>
        <span className="mt-0.5 text-[9px] text-white/30 font-medium">高品質機會</span>
      </div>
    </div>
  );
}

const RESULT_STATS = [
  { label: "建議方向", value: "做多 LONG ↗", valueClass: "text-[#2fe3a0] font-bold" },
  { label: "建議進場區", value: "0.6120 ~ 0.6180", valueClass: "font-mono text-white/90" },
  { label: "壓力區", value: "0.6480", valueClass: "font-mono text-white/90" },
  { label: "支撐區", value: "0.5980", valueClass: "font-mono text-white/90" },
  { label: "風險報酬比", value: "1 : 2.6", valueClass: "font-mono text-white/90" },
];

// ─── 圖片壓縮（最長邊 1280px，輸出 JPEG 0.85） ───────────────────────────────
async function compressImage(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const MAX = 1280;
      const scale = Math.min(1, MAX / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      canvas.getContext("2d")!.drawImage(img, 0, 0, w, h);
      URL.revokeObjectURL(url);
      const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
      resolve({ base64: dataUrl.split(",")[1], mimeType: "image/jpeg" });
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("圖片載入失敗")); };
    img.src = url;
  });
}

// ─── 頁面主體 ────────────────────────────────────────────────────────────────
export default function AnalyzePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      setFileError("圖片大小不能超過 10MB");
      return;
    }
    setFileError(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    // reset input so same file can be re-selected
    e.target.value = "";
  }

  async function handleSubmit() {
    if (!selectedFile || isSubmitting) return;
    try {
      setIsSubmitting(true);
      const { base64, mimeType } = await compressImage(selectedFile);
      sessionStorage.setItem("pendingImage", base64);
      sessionStorage.setItem("pendingMime", mimeType);
      router.push("/analyzing");
    } catch {
      setFileError("圖片處理失敗，請重試");
      setIsSubmitting(false);
    }
  }

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col border-x border-white/5 bg-[#030807] text-white antialiased">
      <SiteHeader />

      {/* 頁面標題 */}
      <div className="flex items-end justify-between px-5 pb-3 pt-5">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white">分析</h1>
          <p className="mt-0.5 text-xs text-white/40">上傳圖表，獲得 AI 分析結果</p>
        </div>
        <Link href="/history" className="flex items-center gap-1 text-xs text-white/50 transition-colors hover:text-white">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" />
          </svg>
          分析紀錄
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>

      <main className="flex flex-1 flex-col gap-4 px-4 pb-[88px]">

        {/* ① 上傳圖表截圖 */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md">

          {/* 隱藏的 file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />

          {previewUrl ? (
            /* 已選擇圖片：顯示預覽 */
            <div className="flex flex-col gap-4">
              <div className="relative overflow-hidden rounded-xl border border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt="圖表預覽"
                  className="h-auto w-full object-contain"
                  style={{ maxHeight: 220 }}
                />
                {/* 重新選擇按鈕 */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute right-2 top-2 flex items-center gap-1 rounded-lg border border-white/10 bg-[#030807]/80 px-2.5 py-1.5 text-[11px] font-bold text-white/70 backdrop-blur-sm transition hover:bg-white/10"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  更換
                </button>
              </div>

              {fileError && (
                <p className="text-center text-[12px] text-red-400">{fileError}</p>
              )}

              {/* 開始分析按鈕 */}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2fe3a0] py-3.5 text-[15px] font-black text-black shadow-[0_0_24px_rgba(47,227,160,0.25)] transition-all active:scale-[0.99] disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-spin">
                      <path d="M21 12a9 9 0 1 1-6.2-8.6" strokeLinecap="round" />
                    </svg>
                    準備中...
                  </>
                ) : (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                    開始 AI 分析
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-white/30">
                分析約需 10 – 30 秒，請耐心等候
              </p>
            </div>
          ) : (
            /* 未選擇圖片：顯示上傳 UI */
            <div className="flex flex-col items-center gap-5 text-center">
              <div className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl border border-[#2fe3a0]/20 bg-[#2fe3a0]/8 text-[#2fe3a0] shadow-[0_0_24px_rgba(47,227,160,0.12)]">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 16V4M7 9l5-5 5 5" />
                  <path d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
                </svg>
              </div>

              <div className="space-y-1">
                <p className="text-[17px] font-black tracking-tight text-white">上傳圖表截圖</p>
                <p className="text-[13px] font-medium text-white/40">支援 TradingView、Bybit、Binance</p>
                <p className="text-[12px] text-white/25">PNG / JPG 格式，最大 10MB</p>
              </div>

              {fileError && (
                <p className="text-[12px] text-red-400">{fileError}</p>
              )}

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full rounded-xl bg-[#2fe3a0] py-3.5 text-center text-[15px] font-black text-black shadow-[0_0_24px_rgba(47,227,160,0.25)] transition-transform active:scale-[0.99]"
              >
                選擇圖片
              </button>

              <div className="flex items-center gap-1.5 text-[11px] text-white/30">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                你的圖片僅用於分析，不會被儲存或分享
              </div>
            </div>
          )}
        </div>

        {/* ② 分析中 — 三步驟流程（靜態示例） */}
        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4 backdrop-blur-md">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold text-white">分析中...</p>
              <p className="mt-0.5 text-xs text-white/40">AI 正在分析圖表，請稍候</p>
            </div>
            <CircleProgress pct={65} />
          </div>
          <div className="mt-5 flex items-center justify-between px-2">
            {[
              { label: "圖表解析", active: true, icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" /> },
              { label: "多維度分析", active: false, icon: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></> },
              { label: "生成報告", active: false, icon: <path d="M20 6 9 17l-5-5" /> },
            ].map((step, i) => (
              <div key={step.label} className="relative flex flex-1 flex-col items-center">
                <div className="flex w-full items-center justify-center">
                  <div className={`h-[1px] flex-1 ${i === 0 ? "invisible" : "bg-white/10"}`} />
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all ${step.active ? "border-[#2fe3a0] bg-[#2fe3a0]/15 text-[#2fe3a0] shadow-[0_0_12px_rgba(47,227,160,0.3)]" : "border-white/10 bg-white/[0.02] text-white/30"}`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">{step.icon}</svg>
                  </div>
                  <div className={`h-[1px] flex-1 ${i === 2 ? "invisible" : "bg-white/10"}`} />
                </div>
                <p className={`mt-2 text-[11px] font-bold ${step.active ? "text-[#2fe3a0]" : "text-white/30"}`}>{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ③ 分析結果（靜態示例） */}
        <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-md">
          <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.01] px-4 py-3">
            <p className="text-sm font-bold text-white tracking-wide">分析結果</p>
            <p className="font-mono text-[11px] text-white/30">2024/05/24 14:30</p>
          </div>
          <div className="flex items-center gap-3 px-4 py-4">
            <ScoreCircle />
            <div className="flex flex-1 flex-col divide-y divide-white/[0.06]">
              {RESULT_STATS.map((s) => (
                <div key={s.label} className="flex items-center justify-between py-[7px]">
                  <span className="text-[11px] font-medium text-white/40">{s.label}</span>
                  <span className={`text-[12px] ${s.valueClass}`}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="border-t border-white/5 bg-white/[0.005] px-4 pb-4 pt-3.5">
            <div className="mb-2.5 flex items-center gap-1.5">
              <span className="flex h-[18px] items-center rounded border border-[#2fe3a0]/20 bg-[#2fe3a0]/10 px-1.5 text-[10px] font-black tracking-wide text-[#2fe3a0]">AI</span>
              <span className="text-sm font-bold text-white/90">分析觀點</span>
            </div>
            <div className="flex items-center gap-2">
              <p className="flex-1 text-[12px] font-medium leading-relaxed text-white/60">
                價格於上升結構回踩支撐並守住，量能收斂，下方支撐明確。若於進場區進場，跌破支撐離場，可取得合理風險報酬比。
              </p>
              <div className="h-[130px] w-[130px] shrink-0"><PentaChart /></div>
            </div>
          </div>
        </div>

        {/* ④ 最近分析 */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-bold text-white">最近分析</p>
            <Link href="/history" className="flex items-center gap-0.5 text-xs text-white/40 transition-colors hover:text-white">
              查看全部
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="m9 18 6-6-6-6" /></svg>
            </Link>
          </div>
          <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-1">
            {RECENT.map((t) => {
              const isLong = t.dirEn === "LONG";
              return (
                <div key={t.sym} className="w-[112px] shrink-0 rounded-2xl border border-white/5 bg-white/[0.025] p-3">
                  <p className="truncate text-[12px] font-black tracking-tight text-white">{t.sym.replace("USDT", "")}</p>
                  <span className={`mt-0.5 inline-block rounded px-1.5 py-0.5 text-[8px] font-bold ${isLong ? "bg-[#2fe3a0]/10 text-[#2fe3a0]" : "bg-red-500/10 text-red-400"}`}>
                    {isLong ? "LONG" : "SHORT"}
                  </span>
                  <div className="mt-2 overflow-hidden">
                    <Sparkline trend={t.trend} className="h-6 w-full" />
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <span className={`rounded border px-1 py-0.5 text-[8px] font-bold ${GRADE_COLOR[t.grade]}`}>{t.grade}</span>
                    <div className="flex items-end leading-none">
                      <span className="font-mono text-[18px] font-black text-[#2fe3a0]">{t.score}</span>
                      <span className="ml-0.5 font-mono text-[8px] text-white/30">/100</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>
    </div>
  );
}

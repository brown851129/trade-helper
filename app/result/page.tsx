"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/app/PageHeader";

type AdamScore = {
  structure?: number;
  trigger?: number;
  risk?: number;
  image?: number;
  total?: number;
  level?: "A+" | "A" | "B" | "C" | "D" | string;
  action?: "EXECUTE" | "WATCH" | "REJECT" | string;
};

type VisualPlan = {
  summary?: string;
  resistanceZone?: string;
  supportZone?: string;
  entryLabel?: string;
  stopLossLabel?: string;
  tp1Label?: string;
  tp2Label?: string;
  pathLabel?: string;
  scenarioA?: string;
  scenarioB?: string;
  scenarioC?: string;
};

type AdamStructureEngine = {
  liquidityConfirmation?: string;
  structureShift?: string;
  trendConfirmation?: string;
  retestValidation?: string;
  tradeTrigger?: string;
};

type ChartBounds = {
  chartTopY?: number | null;
  chartBottomY?: number | null;
  chartLeftX?: number | null;
  chartRightX?: number | null;
  confidence?: string;
};

type PriceScale = {
  priceTop?: number | null;
  priceBottom?: number | null;
  visibleHigh?: number | null;
  visibleLow?: number | null;
  confidence?: string;
};

type PriceZone = {
  low?: number | null;
  high?: number | null;
  label?: string;
};

type ImageMeta = {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
};

type AnalyzeResult = {
  score?: number;
  grade?: "S" | "A" | "B" | "C" | "D" | string;

  marketType?: string;
  marketState?: string;
  trendDirection?: string;
  worthIt?: string;
  direction?: string;

  keyHigh?: number | null;
  keyLow?: number | null;
  chartBounds?: ChartBounds;
  priceScale?: PriceScale;
  resistanceZone?: PriceZone;
  supportZone?: PriceZone;
  scenarioA?: string;
  scenarioB?: string;
  scenarioC?: string;

  currentStatus?: string;
  statusDescription?: string;
  positionAction?: string;
  nextAction?: string;
  marketBias?: string;

  adamStructureEngine?: AdamStructureEngine;

  entry?: number | null;
  stopLoss?: number | null;
  tp1?: number | null;
  tp2?: number | null;
  riskPct?: string | null;
  riskReward?: string | null;

  conditionalEntry?: number | null;
  conditionalStopLoss?: number | null;
  conditionalTp1?: number | null;
  conditionalTp2?: number | null;
  conditionalRiskReward?: string | null;

  adamScore?: AdamScore;
  visualPlan?: VisualPlan;

  advantage?: string;
  disadvantage?: string;
  mainIssue?: string;
  entryReason?: string;
  invalidReason?: string;
  expectedReturn?: string;
  action?: string;
  analysis?: string;
  riskWarning?: string;
};

const GRADE_LABEL: Record<string, string> = {
  "A+": "A+級 — 頂級機會",
  S: "S級 — 頂級機會",
  A: "A級 — 高品質機會",
  B: "B級 — 觀察機會",
  C: "C級 — 低品質機會",
  D: "D級 — 不建議交易",
};

const GRADE_STYLE: Record<string, { ring: string; text: string; badge: string }> = {
  "A+": {
    ring: "#7df9ff",
    text: "text-cyan-300",
    badge: "text-cyan-300 border-cyan-300/40 bg-cyan-300/10",
  },
  S: {
    ring: "#7df9ff",
    text: "text-cyan-300",
    badge: "text-cyan-300 border-cyan-300/40 bg-cyan-300/10",
  },
  A: {
    ring: "#2fe3a0",
    text: "text-[#2fe3a0]",
    badge: "text-[#2fe3a0] border-[#2fe3a0]/40 bg-[#2fe3a0]/10",
  },
  B: {
    ring: "#fbbf24",
    text: "text-amber-400",
    badge: "text-amber-400 border-amber-400/40 bg-amber-400/10",
  },
  C: {
    ring: "#6b7280",
    text: "text-white/40",
    badge: "text-white/40 border-white/15 bg-white/5",
  },
  D: {
    ring: "#ef4444",
    text: "text-red-400",
    badge: "text-red-400 border-red-400/40 bg-red-400/10",
  },
};

const WORTH_STYLE: Record<string, string> = {
  值得參與: "text-[#2fe3a0] border-[#2fe3a0]/30 bg-[#2fe3a0]/10",
  接近交易: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  謹慎評估: "text-amber-400 border-amber-400/30 bg-amber-400/10",
  不建議參與: "text-red-400 border-red-400/30 bg-red-400/10",
};

function valueText(value: unknown, fallback = "—") {
  if (value === null || value === undefined || value === "") return fallback;
  return String(value);
}

function priceText(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) return "—";
  return Number(value).toLocaleString("en-US", { maximumFractionDigits: 2 });
}

function isValidNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

function parseRangeFromText(text?: string) {
  if (!text) return null;

  const matches = text.replace(/,/g, "").match(/-?\d+(\.\d+)?/g);

  if (!matches || matches.length < 2) return null;

  const a = Number(matches[0]);
  const b = Number(matches[1]);

  if (!Number.isFinite(a) || !Number.isFinite(b)) return null;

  return {
    low: Math.min(a, b),
    high: Math.max(a, b),
  };
}

function getZone(result: AnalyzeResult, type: "resistance" | "support") {
  const zone = type === "resistance" ? result.resistanceZone : result.supportZone;
  const visualText =
    type === "resistance"
      ? result.visualPlan?.resistanceZone
      : result.visualPlan?.supportZone;

  if (isValidNumber(zone?.low) && isValidNumber(zone?.high)) {
    return {
      low: Math.min(zone.low, zone.high),
      high: Math.max(zone.low, zone.high),
      label: zone.label ?? visualText ?? "",
    };
  }

  const parsed = parseRangeFromText(visualText);

  if (parsed) {
    return {
      ...parsed,
      label: visualText ?? "",
    };
  }

  return null;
}

function getScaledChartBounds(result: AnalyzeResult, imageMeta: ImageMeta | null) {
  if (!imageMeta) return null;

  const bounds = result.chartBounds;
  const chartTopY = bounds?.chartTopY;
  const chartBottomY = bounds?.chartBottomY;
  const chartLeftX = bounds?.chartLeftX;
  const chartRightX = bounds?.chartRightX;

  if (
    isValidNumber(chartTopY) &&
    isValidNumber(chartBottomY) &&
    isValidNumber(chartLeftX) &&
    isValidNumber(chartRightX) &&
    chartBottomY > chartTopY &&
    chartRightX > chartLeftX
  ) {
    const scaleX = imageMeta.width / imageMeta.naturalWidth;
    const scaleY = imageMeta.height / imageMeta.naturalHeight;

    return {
      top: chartTopY * scaleY,
      bottom: chartBottomY * scaleY,
      left: chartLeftX * scaleX,
      right: chartRightX * scaleX,
      width: (chartRightX - chartLeftX) * scaleX,
      height: (chartBottomY - chartTopY) * scaleY,
    };
  }

  return {
    top: imageMeta.height * 0.08,
    bottom: imageMeta.height * 0.86,
    left: imageMeta.width * 0.08,
    right: imageMeta.width * 0.9,
    width: imageMeta.width * 0.82,
    height: imageMeta.height * 0.78,
  };
}

function priceToY(price: number | null | undefined, result: AnalyzeResult, imageMeta: ImageMeta | null) {
  if (!isValidNumber(price)) return null;

  const chart = getScaledChartBounds(result, imageMeta);
  const priceTop = result.priceScale?.priceTop;
  const priceBottom = result.priceScale?.priceBottom;

  if (
    !chart ||
    !isValidNumber(priceTop) ||
    !isValidNumber(priceBottom) ||
    priceTop === priceBottom
  ) {
    return null;
  }

  const y =
    chart.top +
    ((priceTop - price) / (priceTop - priceBottom)) * chart.height;

  return Math.max(chart.top, Math.min(chart.bottom, y));
}

function zoneStyle(
  zone: { low: number; high: number } | null,
  result: AnalyzeResult,
  imageMeta: ImageMeta | null,
  fallbackTopPct: number
) {
  const chart = getScaledChartBounds(result, imageMeta);

  if (!chart) {
    return {
      left: "8%",
      top: `${fallbackTopPct}%`,
      width: "82%",
      height: "10%",
    };
  }

  if (!zone) {
    return {
      left: chart.left,
      top: imageMeta ? imageMeta.height * (fallbackTopPct / 100) : 0,
      width: chart.width,
      height: imageMeta ? imageMeta.height * 0.1 : 24,
    };
  }

  const yHigh = priceToY(zone.high, result, imageMeta);
  const yLow = priceToY(zone.low, result, imageMeta);

  if (yHigh === null || yLow === null) {
    return {
      left: chart.left,
      top: imageMeta ? imageMeta.height * (fallbackTopPct / 100) : 0,
      width: chart.width,
      height: imageMeta ? imageMeta.height * 0.1 : 24,
    };
  }

  return {
    left: chart.left,
    top: Math.min(yHigh, yLow),
    width: chart.width,
    height: Math.max(8, Math.abs(yLow - yHigh)),
  };
}

function lineStyle(
  price: number | null | undefined,
  result: AnalyzeResult,
  imageMeta: ImageMeta | null,
  fallbackTopPct: number
) {
  const chart = getScaledChartBounds(result, imageMeta);
  const y = priceToY(price, result, imageMeta);

  if (!chart || y === null) {
    return {
      left: "8%",
      top: `${fallbackTopPct}%`,
      width: "82%",
    };
  }

  return {
    left: chart.left,
    top: y,
    width: chart.width,
  };
}

function ScoreRing({ score, grade }: { score: number; grade: string }) {
  const style = GRADE_STYLE[grade] ?? GRADE_STYLE.C;
  const R = 52;
  const circ = 2 * Math.PI * R;

  return (
    <div className="relative flex h-[148px] w-[148px] shrink-0 items-center justify-center">
      <svg viewBox="0 0 136 136" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="68" cy="68" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
        <circle
          cx="68"
          cy="68"
          r={R}
          fill="none"
          stroke={style.ring}
          strokeWidth="6"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - Math.min(100, Math.max(0, score)) / 100)}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 10px ${style.ring}99)` }}
        />
      </svg>

      <div className="relative flex flex-col items-center">
        <div className="flex items-end leading-none">
          <span className={`font-mono text-[38px] font-black tracking-tighter ${style.text}`}>
            {score}
          </span>
          <span className="mb-2 ml-0.5 font-mono text-[13px] text-white/30">/100</span>
        </div>
        <span className={`mt-1.5 text-[11px] font-bold ${style.text}`}>Adam Score</span>
      </div>
    </div>
  );
}

function Row({ label, value, valueClass }: { label: string; value: string; valueClass?: string }) {
  return (
    <div className="flex items-start justify-between gap-3 px-4 py-3">
      <span className="shrink-0 text-[12px] text-white/40">{label}</span>
      <span className={`text-right text-[12px] leading-relaxed ${valueClass ?? "text-white/80"}`}>
        {value}
      </span>
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
      <div className="border-b border-white/5 bg-white/[0.01] px-4 py-2.5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">{title}</p>
      </div>
      <div className="divide-y divide-white/[0.05]">{children}</div>
    </div>
  );
}

function MiniScoreBar({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));

  return (
    <div className="px-4 py-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[12px] text-white/40">{label}</span>
        <span className="font-mono text-[12px] text-white/70">
          {value}/{max}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-[#2fe3a0]" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageMeta, setImageMeta] = useState<ImageMeta | null>(null);

  function updateImageMeta() {
    const img = imageRef.current;
    if (!img) return;

    setImageMeta({
      width: img.clientWidth,
      height: img.clientHeight,
      naturalWidth: img.naturalWidth || img.clientWidth,
      naturalHeight: img.naturalHeight || img.clientHeight,
    });
  }

  useEffect(() => {
    const raw = sessionStorage.getItem("analyzeResult");

    const possibleImageKeys = [
      "analyzeImage",
      "uploadedImage",
      "chartImage",
      "imagePreview",
      "analyzeImagePreview",
      "lastAnalyzeImage",
    ];

    for (const key of possibleImageKeys) {
  const img = sessionStorage.getItem(key);

  if (img) {
    const mime =
      sessionStorage.getItem("analyzeMime") ?? "image/jpeg";

    const src = img.startsWith("data:")
      ? img
      : `data:${mime};base64,${img}`;

    setImageSrc(src);
    break;
  }

    }

    if (!raw) {
      router.replace("/analyze");
      return;
    }

    try {
      setResult(JSON.parse(raw) as AnalyzeResult);
    } catch {
      router.replace("/analyze");
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener("resize", updateImageMeta);
    return () => window.removeEventListener("resize", updateImageMeta);
  }, []);

  const display = useMemo(() => {
    if (!result) return null;

    const score = result.adamScore?.total ?? result.score ?? 0;
    const grade = result.adamScore?.level ?? result.grade ?? "C";
    const worthIt = result.worthIt ?? "不建議參與";

    return { score, grade, worthIt };
  }, [result]);

  if (!result || !display) {
    return (
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col items-center justify-center border-x border-white/5 bg-[#030807] text-white antialiased">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#2fe3a0] border-t-transparent" />
      </div>
    );
  }

  const gs = GRADE_STYLE[display.grade] ?? GRADE_STYLE.C;
  const worthClass = WORTH_STYLE[display.worthIt] ?? "text-white/60 border-white/10 bg-white/5";

  const direction = result.direction ?? "觀望 WAIT";
  const dirIsLong = direction.includes("LONG");
  const dirIsShort = direction.includes("SHORT");
  const dirClass = dirIsLong
    ? "text-[#2fe3a0] font-bold"
    : dirIsShort
      ? "text-red-400 font-bold"
      : "text-white/60";

  const visual = result.visualPlan;
  const resistance = getZone(result, "resistance");
  const support = getZone(result, "support");

  const tradePlan =
    result.expectedReturn ||
    `進場：${priceText(result.entry)} ｜ SL：${priceText(result.stopLoss)} ｜ TP1：${priceText(result.tp1)} ｜ TP2：${priceText(result.tp2)} ｜ 風險：${valueText(result.riskPct)}`;

  return (
    <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[480px] flex-col border-x border-white/5 bg-[#030807] text-white antialiased">
      <PageHeader
        title="分析結果"
        backHref="/analyze"
        action={
          <button
            type="button"
            aria-label="分享"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/40 hover:bg-white/5 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        }
      />

      <main className="flex flex-1 flex-col gap-3 px-4 py-4 pb-[88px]">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] py-6">
          <ScoreRing score={display.score} grade={display.grade} />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className={`rounded-lg border px-3.5 py-1.5 text-[13px] font-bold ${gs.badge}`}>
              {GRADE_LABEL[display.grade] ?? display.grade}
            </span>
            <span className={`rounded-lg border px-3.5 py-1.5 text-[13px] font-bold ${worthClass}`}>
              {display.worthIt}
            </span>
          </div>
        </div>

        {imageSrc && (
          <div className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02]">
            <div className="border-b border-white/5 px-4 py-2.5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-white/40">
                Adam 圖表標註
              </p>
            </div>

            <div className="relative">
              <img
                ref={imageRef}
                src={imageSrc}
                alt="原始圖表"
                className="block w-full object-contain"
                onLoad={updateImageMeta}
              />

              {/* 阻力區 */}
              <div
                className="absolute rounded-md border border-red-400/70 bg-red-500/10"
                style={zoneStyle(resistance, result, imageMeta, 18)}
              >
                <div className="absolute right-2 top-1 rounded bg-red-500/80 px-2 py-0.5 text-[10px] font-bold text-white">
                  阻力區 {resistance?.label ?? visual?.resistanceZone ?? ""}
                </div>
              </div>

              {/* 支撐區 */}
              <div
                className="absolute rounded-md border border-[#2fe3a0]/70 bg-[#2fe3a0]/10"
                style={zoneStyle(support, result, imageMeta, 68)}
              >
                <div className="absolute right-2 top-1 rounded bg-[#2fe3a0]/80 px-2 py-0.5 text-[10px] font-bold text-black">
                  支撐區 {support?.label ?? visual?.supportZone ?? ""}
                </div>
              </div>

              {/* 進場線 */}
              <div
                className="absolute border-t border-dashed border-yellow-300"
                style={lineStyle(result.entry, result, imageMeta, 50)}
              >
                <span className="absolute right-0 -top-5 rounded bg-yellow-300 px-2 py-0.5 text-[10px] font-bold text-black">
                  {visual?.entryLabel ?? `Entry ${priceText(result.entry)}`}
                </span>
              </div>

              {/* SL 線 */}
              <div
                className="absolute border-t border-dashed border-red-400"
                style={lineStyle(result.stopLoss, result, imageMeta, 26)}
              >
                <span className="absolute left-0 -top-5 rounded bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  {visual?.stopLossLabel ?? `SL ${priceText(result.stopLoss)}`}
                </span>
              </div>

              {/* TP1 線 */}
              <div
                className="absolute border-t border-dashed border-cyan-300"
                style={lineStyle(result.tp1, result, imageMeta, 62)}
              >
                <span className="absolute left-0 -top-5 rounded bg-cyan-400 px-2 py-0.5 text-[10px] font-bold text-black">
                  {visual?.tp1Label ?? `TP1 ${priceText(result.tp1)}`}
                </span>
              </div>

              {/* TP2 線 */}
              <div
                className="absolute border-t border-dashed border-blue-400"
                style={lineStyle(result.tp2, result, imageMeta, 78)}
              >
                <span className="absolute left-0 -top-5 rounded bg-blue-500 px-2 py-0.5 text-[10px] font-bold text-white">
                  {visual?.tp2Label ?? `TP2 ${priceText(result.tp2)}`}
                </span>
              </div>

              {/* 預期路徑 */}
              <div className="absolute right-[12%] top-[42%] rounded-lg border border-cyan-300/40 bg-black/70 px-2 py-1 text-[10px] font-bold text-cyan-300">
                {visual?.pathLabel ?? "預期路徑"}
              </div>

              {/* 情境 */}
              <div className="absolute bottom-3 left-3 right-3 rounded-lg border border-white/10 bg-black/70 p-2 text-[10px] leading-relaxed text-white/80">
                <p>
                  <span className="text-[#2fe3a0]">Scenario A：</span>
                  {visual?.scenarioA ?? result.scenarioA ?? "主要情境"}
                </p>
                <p className="mt-1">
                  <span className="text-amber-400">Scenario B：</span>
                  {visual?.scenarioB ?? result.scenarioB ?? "備用情境"}
                </p>
              </div>
            </div>
          </div>
        )}
        

        <SectionCard title="交易概況">
          <Row label="目前狀態" value={valueText(result.currentStatus, "目前空手中")} valueClass="text-white/80" />
          <Row label="狀態說明" value={valueText(result.statusDescription)} valueClass="text-white/70" />
          <Row label="優勢方向" value={direction} valueClass={dirClass} />
          <Row label="建議行動" value={valueText(result.action)} valueClass="text-white/80" />
          <Row label="下一步" value={valueText(result.nextAction)} valueClass="text-amber-400/90" />
          <Row label="$1000 預期回報" value={tradePlan} valueClass="font-mono text-white/80 text-right" />
        </SectionCard>

        <SectionCard title="Adam Score">
          <MiniScoreBar label="Structure 結構" value={result.adamScore?.structure ?? 0} max={40} />
          <MiniScoreBar label="Trigger 觸發" value={result.adamScore?.trigger ?? 0} max={30} />
          <MiniScoreBar label="Risk 風險" value={result.adamScore?.risk ?? 0} max={20} />
          <MiniScoreBar label="Image 圖片" value={result.adamScore?.image ?? 0} max={10} />
          <Row label="Adam Action" value={valueText(result.adamScore?.action)} valueClass="text-[#2fe3a0]/90 font-bold" />
        </SectionCard>

        <SectionCard title="Adam 結構引擎">
          <Row label="流動性確認" value={valueText(result.adamStructureEngine?.liquidityConfirmation)} />
          <Row label="結構轉換" value={valueText(result.adamStructureEngine?.structureShift)} />
          <Row label="趨勢確認" value={valueText(result.adamStructureEngine?.trendConfirmation)} />
          <Row label="回踩驗證" value={valueText(result.adamStructureEngine?.retestValidation)} />
          <Row label="交易觸發" value={valueText(result.adamStructureEngine?.tradeTrigger)} />
        </SectionCard>

        <SectionCard title="交易點位">
          <Row label="建議進場" value={priceText(result.entry)} valueClass="font-mono text-[#2fe3a0]/90" />
          <Row label="有效止損" value={priceText(result.stopLoss)} valueClass="font-mono text-red-400/90" />
          <Row label="TP1" value={priceText(result.tp1)} valueClass="font-mono text-white/80" />
          <Row label="TP2" value={priceText(result.tp2)} valueClass="font-mono text-white/80" />
          <Row label="風險" value={valueText(result.riskPct)} valueClass="font-mono text-amber-400/90" />
          <Row label="RR" value={valueText(result.riskReward)} valueClass="font-mono text-white/70" />
        </SectionCard>

        <SectionCard title="AI 標註計畫">
          <Row label="圖面重點" value={valueText(visual?.summary)} />
          <Row label="阻力區" value={valueText(visual?.resistanceZone)} valueClass="text-red-400/90" />
          <Row label="支撐區" value={valueText(visual?.supportZone)} valueClass="text-[#2fe3a0]/90" />
          <Row label="進場標籤" value={valueText(visual?.entryLabel)} />
          <Row label="SL 標籤" value={valueText(visual?.stopLossLabel)} valueClass="text-red-400/90" />
          <Row label="TP1 標籤" value={valueText(visual?.tp1Label)} />
          <Row label="TP2 標籤" value={valueText(visual?.tp2Label)} />
          <Row label="預期路徑" value={valueText(visual?.pathLabel)} valueClass="text-cyan-300/90" />
          <Row label="Scenario A" value={valueText(visual?.scenarioA)} />
          <Row label="Scenario B" value={valueText(visual?.scenarioB)} />
        </SectionCard>

        <SectionCard title="深度分析">
          <Row label="最大優勢" value={valueText(result.advantage)} valueClass="text-[#2fe3a0]/90" />
          <Row label="最大缺點" value={valueText(result.disadvantage)} valueClass="text-red-400/90" />
          <Row label="最大問題" value={valueText(result.mainIssue)} valueClass="text-amber-400/90" />
          <Row label="進場理由" value={valueText(result.entryReason)} valueClass="text-white/70" />
          <Row label="失效條件" value={valueText(result.invalidReason)} valueClass="text-red-400/90" />
        </SectionCard>

        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
          <div className="mb-3 flex items-center gap-1.5">
            <span className="flex h-[18px] items-center rounded border border-[#2fe3a0]/20 bg-[#2fe3a0]/10 px-1.5 text-[10px] font-black tracking-wide text-[#2fe3a0]">
              AI
            </span>
            <span className="text-sm font-bold text-white">分析觀點</span>
          </div>
          <p className="text-[13px] leading-[1.8] text-white/60">{valueText(result.analysis)}</p>
        </div>

        <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-4">
          <div className="mb-2.5 flex items-center gap-1.5">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400">
              <path d="m10.29 3.86-8.6 14.9A2 2 0 0 0 3.43 22h17.14a2 2 0 0 0 1.74-2.97l-8.57-14.9a2 2 0 0 0-3.45.73Z" />
              <path d="M12 9v4M12 17h.01" />
            </svg>
            <span className="text-sm font-bold text-amber-400">風險提醒</span>
          </div>
          <p className="text-[13px] leading-relaxed text-amber-400/80">{valueText(result.riskWarning)}</p>
        </div>

        <Link
          href="/history"
          className="mt-1 flex items-center justify-center gap-2 rounded-xl bg-[#2fe3a0] py-4 text-[15px] font-black text-black shadow-[0_0_20px_rgba(47,227,160,0.2)] transition-transform active:scale-[0.99]"
        >
          儲存紀錄
        </Link>

        <button
          type="button"
          onClick={() => {
            sessionStorage.removeItem("analyzeResult");
            router.push("/analyze");
          }}
          className="flex items-center justify-center gap-1.5 py-2 text-[13px] text-white/30 transition-colors hover:text-white/60"
        >
          重新分析另一張圖
        </button>
      </main>
    </div>
  );
}
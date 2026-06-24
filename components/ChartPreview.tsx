// 抽象 K 線圖表畫布（純視覺，固定座標避免 SSR/CSR 不一致）。

type Candle = { x: number; o: number; c: number; h: number; l: number };

// y 越小 = 價格越高。圖表區約 30~210。
const CANDLES: Candle[] = [
  { x: 20, o: 170, c: 150, h: 140, l: 178 },
  { x: 42, o: 150, c: 158, h: 144, l: 166 },
  { x: 64, o: 158, c: 132, h: 126, l: 162 },
  { x: 86, o: 132, c: 140, h: 124, l: 150 },
  { x: 108, o: 140, c: 118, h: 110, l: 146 },
  { x: 130, o: 118, c: 126, h: 108, l: 134 },
  { x: 152, o: 126, c: 104, h: 96, l: 132 },
  { x: 174, o: 104, c: 112, h: 96, l: 120 },
  { x: 196, o: 112, c: 92, h: 84, l: 118 },
  { x: 218, o: 92, c: 100, h: 82, l: 108 },
  { x: 240, o: 100, c: 124, h: 92, l: 130 },
  { x: 262, o: 124, c: 110, h: 102, l: 132 },
  { x: 284, o: 110, c: 86, h: 78, l: 116 },
  { x: 306, o: 86, c: 94, h: 74, l: 100 },
  { x: 328, o: 94, c: 72, h: 64, l: 100 },
  { x: 350, o: 72, c: 80, h: 62, l: 88 },
  { x: 372, o: 80, c: 60, h: 52, l: 86 },
  { x: 394, o: 60, c: 68, h: 50, l: 76 },
  { x: 416, o: 68, c: 50, h: 42, l: 74 },
  { x: 438, o: 50, c: 58, h: 42, l: 66 },
  { x: 460, o: 58, c: 76, h: 50, l: 82 },
  { x: 482, o: 76, c: 64, h: 56, l: 84 },
  { x: 504, o: 64, c: 46, h: 38, l: 70 },
  { x: 526, o: 46, c: 54, h: 36, l: 62 },
];

const EMA = CANDLES.map((c) => `${c.x},${(c.o + c.c) / 2 + 18}`).join(" ");

export default function ChartPreview() {
  return (
    <div className="relative h-full min-h-[260px] w-full overflow-hidden">
      {/* scan beam */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-60">
        <div className="scan-beam animate-scan" />
      </div>

      <svg
        viewBox="0 0 560 240"
        className="h-full w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={`h${y}`} x1="0" x2="560" y1={y} y2={y} stroke="rgba(0,255,170,0.07)" strokeWidth="1" />
        ))}
        {[70, 140, 210, 280, 350, 420, 490].map((x) => (
          <line key={`v${x}`} x1={x} x2={x} y1="10" y2="230" stroke="rgba(0,255,170,0.05)" strokeWidth="1" />
        ))}

        <polyline points={EMA} fill="none" stroke="#7df9ff" strokeOpacity="0.5" strokeWidth="1.5" />

        {CANDLES.map((c, i) => {
          const up = c.c < c.o;
          const color = up ? "#00ffae" : "#ff5d73";
          const top = Math.min(c.o, c.c);
          const bodyH = Math.max(Math.abs(c.o - c.c), 2);
          return (
            <g key={i}>
              <line x1={c.x} x2={c.x} y1={c.h} y2={c.l} stroke={color} strokeOpacity="0.7" strokeWidth="1" />
              <rect x={c.x - 5} y={top} width="10" height={bodyH} fill={color} fillOpacity={up ? "0.85" : "0.7"} />
            </g>
          );
        })}

        {/* 壓力 / 進場 / 支撐 區帶 */}
        <line x1="0" x2="560" y1="54" y2="54" stroke="#ff5d73" strokeOpacity="0.4" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="0" x2="560" y1="120" y2="120" stroke="#00ffae" strokeOpacity="0.5" strokeDasharray="4 4" strokeWidth="1" />
        <line x1="0" x2="560" y1="186" y2="186" stroke="#00ffae" strokeOpacity="0.3" strokeDasharray="4 4" strokeWidth="1" />
      </svg>

      {/* axis labels */}
      <div className="pointer-events-none absolute right-2 top-[44px] border border-rose-400/30 bg-base-900/90 px-1.5 py-0.5 font-mono text-[9px] text-rose-400/90">
        壓力 0.6480
      </div>
      <div className="pointer-events-none absolute right-2 top-[110px] border border-accent/30 bg-base-900/90 px-1.5 py-0.5 font-mono text-[9px] text-accent">
        進場 0.6150
      </div>
      <div className="pointer-events-none absolute right-2 top-[176px] border border-accent/20 bg-base-900/90 px-1.5 py-0.5 font-mono text-[9px] text-accent/70">
        支撐 0.5980
      </div>
    </div>
  );
}

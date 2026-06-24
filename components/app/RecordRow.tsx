import Sparkline from "./Sparkline";
import { DIR_COLOR, OUTCOME_BADGE, type Trade } from "./data";

export default function RecordRow({
  t,
  showRr = false,
}: {
  t: Trade;
  showRr?: boolean;
}) {
  return (
    <div className="app-card app-card-hover flex items-center gap-3 px-4 py-3.5">
      {/* sparkline */}
      <div className="flex h-10 w-12 shrink-0 items-center justify-center rounded-lg bg-white/[0.03]">
        <Sparkline trend={t.trend} />
      </div>

      {/* symbol + dir */}
      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-semibold text-ink">{t.sym}</div>
        <div className={`mt-0.5 text-xs ${DIR_COLOR[t.dir]}`}>
          {t.dir}
          {t.dirEn ? ` ${t.dirEn}` : ""}
        </div>
      </div>

      {/* rr (optional) */}
      {showRr && t.rr ? (
        <div className="shrink-0 text-right">
          <div className="font-mono text-[10px] uppercase tracking-wider text-ink-faint">
            風報比
          </div>
          <div className="font-mono text-xs text-ink-dim">{t.rr}</div>
        </div>
      ) : null}

      {/* score */}
      <div className="shrink-0 text-right">
        <div className="font-mono text-lg font-bold leading-none text-mint">
          {t.score}
          <span className="ml-0.5 text-[11px] font-normal text-ink-faint">分</span>
        </div>
      </div>

      {/* result + time */}
      <div className="flex w-[72px] shrink-0 flex-col items-end gap-1">
        <span
          className={`whitespace-nowrap rounded-md border px-2 py-0.5 text-[11px] ${OUTCOME_BADGE[t.outcome]}`}
        >
          {t.result}
        </span>
        <span className="text-[10px] text-ink-faint">{t.time}</span>
      </div>
    </div>
  );
}

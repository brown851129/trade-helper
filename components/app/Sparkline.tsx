import type { Trend } from "./data";

const PATHS: Record<Trend, { pts: string; color: string }> = {
  up: { pts: "0,20 9,15 18,17 27,9 36,11 48,3", color: "#2fe3a0" },
  down: { pts: "0,3 9,8 18,6 27,14 36,12 48,21", color: "#ff5d73" },
  flat: { pts: "0,12 9,10 18,13 27,11 36,12 48,11", color: "#5a6b6b" },
};

export default function Sparkline({
  trend,
  className = "",
}: {
  trend: Trend;
  className?: string;
}) {
  const { pts, color } = PATHS[trend];
  return (
    <svg
      width="48"
      height="24"
      viewBox="0 0 48 24"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <polyline
        points={pts}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

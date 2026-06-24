export default function RadarScan() {
  return (
    <div className="relative mx-auto h-52 w-52">
      {/* concentric rings */}
      {[1, 0.72, 0.46, 0.22].map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full border border-mint/15"
          style={{
            inset: `${(1 - s) * 50}%`,
          }}
        />
      ))}
      {/* cross lines */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-mint/10" />
      <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-mint/10" />

      {/* pinging blip rings */}
      <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-radarPing rounded-full border border-mint/40" />

      {/* rotating sweep */}
      <div
        className="absolute inset-0 animate-radar rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(47,227,160,0) 0deg, rgba(47,227,160,0) 270deg, rgba(47,227,160,0.35) 350deg, rgba(47,227,160,0.55) 360deg)",
          WebkitMaskImage: "radial-gradient(circle, black 0%, black 100%)",
        }}
      />

      {/* center dot */}
      <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-mint shadow-[0_0_12px_rgba(47,227,160,0.9)]" />
      {/* moving target blip */}
      <div className="absolute left-[70%] top-[34%] h-2 w-2 animate-pulseGlow rounded-full bg-mint shadow-[0_0_10px_rgba(47,227,160,0.9)]" />
    </div>
  );
}

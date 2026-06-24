// 交易助手 標誌：重畫成向量的「上升雙箭頭」(致敬原 TA 上升箭頭 logo)
// 透過 className 上色（預設繼承 currentColor），可縮放、透明背景。

export default function Logo({
  className = "",
  size = 28,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 38 L32 15 L52 38"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 53 L32 30 L52 53"
        stroke="currentColor"
        strokeOpacity="0.45"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

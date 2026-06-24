import Link from "next/link";

export default function PageHeader({
  title,
  backHref = "/",
  action,
}: {
  title: string;
  backHref?: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="sticky top-0 z-40 grid grid-cols-[40px_1fr_auto] items-center gap-2 border-b border-white/5 bg-[#06090c]/85 px-4 py-3.5 backdrop-blur-xl">
      <Link
        href={backHref}
        aria-label="返回"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-ink-dim transition-colors hover:bg-white/5 hover:text-ink"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </Link>
      <h1 className="text-center text-base font-semibold text-ink">{title}</h1>
      <div className="flex min-w-[40px] justify-end">{action}</div>
    </header>
  );
}

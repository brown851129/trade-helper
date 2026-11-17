type Props = { href: string; children: React.ReactNode; className?: string };

export default function SourceLink({ href, children, className = "" }: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm text-white/85 transition hover:border-neon hover:text-neon ${className}`}
    >
      {children}
      <span aria-hidden className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        ↗
      </span>
    </a>
  );
}

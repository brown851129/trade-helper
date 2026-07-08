import Image from "next/image";

export default function Logo({
  className = "",
  size = 28,
}: {
  className?: string;
  size?: number;
}) 
{
  return (
    <Image
      src="/logo.png"
      alt="Adam Trading OS"
      width={size}
      height={size}
      className={className}
      priority
    />
  );
}
type GlowProps = {
  className?: string;
};

export default function Glow({ className = "" }: GlowProps) {
  return (
    <div
      className={`absolute rounded-full blur-[120px] opacity-50 ${className}`}
    />
  );
}
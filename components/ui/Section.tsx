type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Section({
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      className={`relative w-full min-h-screen overflow-hidden ${className}`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-6 md:px-12">
        {children}
      </div>
    </section>
  );
}
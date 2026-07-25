"use client";

interface ConstellationSceneProps {
  active?: boolean;
  onComplete?: () => void;
}

export default function ConstellationScene({
  active = true,
  onComplete,
}: ConstellationSceneProps) {
  if (!active) return null;

  return (
    <section className="flex min-h-screen items-center justify-center bg-black text-white">
      <button
        type="button"
        onClick={onComplete}
        className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.3em] text-white/80"
      >
        Continue
      </button>
    </section>
  );
}

"use client";

interface SkipButtonProps {
  onSkip?: () => void;
}

export default function SkipButton({ onSkip }: SkipButtonProps) {
  return (
    <button
      type="button"
      onClick={onSkip}
      className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white/80"
    >
      Skip
    </button>
  );
}

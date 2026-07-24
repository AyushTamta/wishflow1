"use client";

export default function Stars() {
  return (
    <>
      {Array.from({ length: 140 }).map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 55}%`,
            opacity: Math.random(),
            animationDelay: `${Math.random() * 4}s`,
          }}
        />
      ))}
    </>
  );
}
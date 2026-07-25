"use client";

interface FilmWrapProps {
  side: "left" | "right";
}

export default function FilmWrap({ side }: FilmWrapProps) {
  const left = side === "left";

  return (
    <div
      className="pointer-events-none absolute top-1/2 z-30 -translate-y-1/2"
      style={{
        left: left ? 155 : undefined,
        right: left ? undefined : 155,
      }}
    >
      <svg
        width="170"
        height="170"
        viewBox="0 0 170 170"
        className={left ? "" : "-scale-x-100"}
      >
        <defs>
          <path
            id={`film-path-${side}`}
            d="M15 120
               C55 120 78 118 96 92
               C108 72 120 55 150 50"
          />
        </defs>

        {/* Film body */}
        <use
          href={`#film-path-${side}`}
          stroke="#26221d"
          strokeWidth="42"
          fill="none"
          strokeLinecap="round"
        />

        {/* Metallic highlight */}
        <use
          href={`#film-path-${side}`}
          stroke="rgba(255,255,255,.08)"
          strokeWidth="2"
          fill="none"
        />

        {/* Top perforations */}
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={`t-${i}`}
            x={20 + i * 9}
            y={102 - i * 3.7}
            width="4"
            height="7"
            rx="1"
            fill="#0b0b0b"
          />
        ))}

        {/* Bottom perforations */}
        {Array.from({ length: 14 }).map((_, i) => (
          <rect
            key={`b-${i}`}
            x={20 + i * 9}
            y={130 - i * 3.7}
            width="4"
            height="7"
            rx="1"
            fill="#0b0b0b"
          />
        ))}
      </svg>
    </div>
  );
}
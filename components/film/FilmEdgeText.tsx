"use client";

interface FilmEdgeTextProps {
  width: number;
}

export default function FilmEdgeText({
  width,
}: FilmEdgeTextProps) {
  const STEP = 520;
  const count = Math.ceil(width / STEP) + 2;

  const topText = [
    "KODAK",
    "35MM",
    "400TX",
    "5247",
    "EASTMAN",
    "SAFETY FILM",
  ];

  const bottomText = [
    "5247",
    "KODAK",
    "35MM",
    "400TX",
    "EASTMAN",
    "24A",
  ];

  return (
    <>
      {/* TOP */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute top-[4px] flex select-none items-center whitespace-nowrap"
          style={{
            left: `${i * STEP + 50}px`,
            gap: 18,
            fontSize: 7,
            letterSpacing: "0.32em",
            color: "#9a8d74",
            fontFamily:
              '"SFMono-Regular", ui-monospace, monospace',
            textShadow:
              "0 1px 0 rgba(255,255,255,.06), 0 -1px 0 rgba(0,0,0,.6)",
          }}
        >
          {topText.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </div>
      ))}

      {/* BOTTOM */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={`bottom-${i}`}
          className="absolute bottom-[4px] flex select-none items-center whitespace-nowrap"
          style={{
            left: `${i * STEP + 120}px`,
            gap: 18,
            fontSize: 7,
            letterSpacing: "0.32em",
            color: "#8f836b",
            fontFamily:
              '"SFMono-Regular", ui-monospace, monospace',
            textShadow:
              "0 1px 0 rgba(255,255,255,.05), 0 -1px 0 rgba(0,0,0,.6)",
          }}
        >
          {bottomText.map((item, idx) => (
            <span key={idx}>{item}</span>
          ))}
        </div>
      ))}
    </>
  );
}
"use client";

interface FilmHoleRowProps {
  count: number;
}

export default function FilmHoleRow({
  count,
}: FilmHoleRowProps) {
  return (
    <div
      className="flex items-center"
      style={{
        height: 22,
        paddingLeft: 8,
        paddingRight: 8,
        gap: 3,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="relative flex-shrink-0 overflow-hidden rounded-[3px]"
          style={{
            width: 5,
            height: 10,
            background: "#050505",
            boxShadow: `
              inset 0 1px 1px rgba(255,255,255,.08),
              inset 0 -1px 2px rgba(0,0,0,.9)
            `,
          }}
        >
          {/* metallic highlight */}
          <div
            className="absolute left-0 top-0 h-full w-[1px]"
            style={{
              background: "rgba(255,255,255,.18)",
            }}
          />

          {/* right shadow */}
          <div
            className="absolute right-0 top-0 h-full w-[1px]"
            style={{
              background: "rgba(0,0,0,.55)",
            }}
          />

          {/* subtle gloss */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,.04), transparent 45%, rgba(0,0,0,.18))",
            }}
          />
        </div>
      ))}
    </div>
  );
}
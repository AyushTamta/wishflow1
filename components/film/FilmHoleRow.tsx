"use client";

export default function FilmHoleRow() {
  return (
    <div
      className="relative h-[22px] w-full"
      style={{
        backgroundImage:
          "repeating-linear-gradient(90deg,#050505 0 5px,transparent 5px 8px)",
        backgroundPosition: "center",
        backgroundRepeat: "repeat-x",
        backgroundSize: "8px 10px",
        boxShadow: "inset 0 1px rgba(255,255,255,.08), inset 0 -1px rgba(0,0,0,.9)",
      }}
    />
  );
}

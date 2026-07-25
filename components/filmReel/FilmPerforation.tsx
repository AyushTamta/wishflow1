// components/filmReel/FilmPerforation.tsx

interface FilmPerforationProps {
  side: "left" | "right";
}

export default function FilmPerforation({
  side,
}: FilmPerforationProps) {
  return (
    <div
      className={`absolute ${
        side === "left" ? "left-2" : "right-2"
      } top-3 bottom-3 flex flex-col justify-between`}
    >
      {Array.from({ length: 18 }).map((_, i) => (
        <div
          key={i}
          className="h-3 w-2 rounded-sm bg-[#ded8c8]"
        />
      ))}
    </div>
  );
}
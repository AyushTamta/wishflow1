interface FilmHoleRowProps {
  count: number;
}

export default function FilmHoleRow({
  count,
}: FilmHoleRowProps) {
  return (
    <div className="flex justify-between px-4">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-[10px] w-[15px] rounded-[3px] bg-black shadow-inner"
        />
      ))}
    </div>
  );
}
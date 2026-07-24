"use client";

type Props = {
  image: string;
  caption: string;
};

export default function MemoryCard({
  image,
  caption,
}: Props) {
  return (
    <div className="rounded-3xl overflow-hidden bg-white/5 backdrop-blur-lg border border-white/10">
      <img
        src={image}
        alt=""
        className="w-full h-[500px] object-cover"
      />

      <div className="p-6">
        <p>{caption}</p>
      </div>
    </div>
  );
}
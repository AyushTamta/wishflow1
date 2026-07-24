"use client";

export default function Sky() {
  return (
    <div
      className="absolute inset-0"
      style={{
        background: `
          radial-gradient(circle at 50% 10%, rgba(255,255,255,.06), transparent 20%),
          linear-gradient(
            to bottom,
            #02030a 0%,
            #07152c 45%,
            #091c3c 70%,
            #081726 100%
          )
        `,
      }}
    />
  );
}
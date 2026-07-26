"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function UnlockPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const unlock = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    const response = await fetch("/api/unlock", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setError(data?.error ?? "Please try again.");
      setSubmitting(false);
      return;
    }

    router.replace("/");
    router.refresh();
  };

  return (
    <main className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#050403] px-5 text-center">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(211,157,70,.18),transparent_30%),radial-gradient(circle_at_15%_90%,rgba(91,25,29,.3),transparent_30%),linear-gradient(145deg,#040302,#17100a_55%,#030303)]" />
      <section className="relative w-full max-w-md rounded-[2rem] border border-[#e6c67a]/30 bg-black/35 px-6 py-10 shadow-[0_0_100px_rgba(0,0,0,.65)] backdrop-blur-sm sm:px-10">
        <p className="text-[10px] font-semibold uppercase tracking-[0.48em] text-[#f2c867]">Private screening</p>
        <h1 className="mt-5 font-serif text-4xl text-[#fff0c8]">One more thing…</h1>
        <p className="mt-4 text-sm leading-relaxed text-white/65">Enter the password to begin Ambay&apos;s birthday story.</p>
        <form onSubmit={unlock} className="mt-8">
          <label className="sr-only" htmlFor="password">Password</label>
          <input id="password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" className="w-full rounded-xl border border-[#e6c67a]/35 bg-black/40 px-4 py-3 text-center text-[#fff0c8] outline-none placeholder:text-white/30 focus:border-[#e6c67a]/80" required />
          {error && <p className="mt-3 text-sm text-[#f2a98a]">{error}</p>}
          <button type="submit" disabled={submitting} className="mt-5 w-full rounded-full border border-[#e6c67a]/60 bg-[#e6c67a]/15 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#fff0c8] transition hover:bg-[#e6c67a]/25 disabled:opacity-60">
            {submitting ? "Unlocking…" : "Unlock the story →"}
          </button>
        </form>
      </section>
    </main>
  );
}

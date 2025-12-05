"use client";

import Link from "next/link";

export default function TutoSkeleton({ title, emoji, children }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-black text-white p-8">
      <main className="w-full max-w-3xl flex flex-col gap-8">
        <Link
          href="/tutos"
          className="group inline-flex w-fit items-center gap-2 rounded-full border-2 border-dashed border-white/30 bg-white/5 px-4 py-1.5 text-sm transition-all hover:scale-110 hover:border-white hover:bg-white hover:text-black leading-loose">
          ← retour
        </Link>

        <h1 className="text-5xl font-bold tracking-tight flex items-center gap-4">
          <span className="text-6xl">{emoji}</span> {title}
        </h1>

        <div className="space-y-4 leading-loose">
          {children}
        </div>

        <p className="mt-10 text-center text-sm text-zinc-600 italic">
          juice5 — le libre c'est bien
        </p>
      </main>
    </div>
  );
}

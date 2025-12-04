"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function TutosLibres() {
  const tutos = [
    {
      titre: "Installer Linux (Ubuntu)",
      description:
        "Guide simple pour installer Ubuntu sur ton PC sans prise de tête.",
      emoji: "🐧",
      href: "/tutos/linux-install",
    },
    {
      titre: "Passer de Chrome à Firefox",
      description:
        "Exporter tes données, installer les extensions et retrouver tes marques.",
      emoji: "🦊",
      href: "/tutos/firefox",
    },
    {
      titre: "Héberger tes fichiers avec Nextcloud",
      description:
        "Créer ta propre alternative libre à Google Drive, chez toi ou en ligne.",
      emoji: "☁️",
      href: "/tutos/nextcloud",
    },
    {
      titre: "Passer à LibreOffice",
      description:
        "Ouvrir, modifier et exporter tous tes documents sans Microsoft Office.",
      emoji: "📄",
      href: "/tutos/libreoffice",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8">
      <main className="flex w-full max-w-5xl flex-col items-center gap-12 p-4 text-center">
        <h1 className="animate-pulse text-6xl font-bold tracking-tight transition-all hover:scale-110 hover:tracking-wider">
          les tutos libres
        </h1>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {tutos.map((tuto, index) => (
            <Link
              key={index}
              href={tuto.href}
              className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-dashed border-white/20 bg-zinc-900 p-6 transition-all hover:rotate-2 hover:scale-105 hover:border-solid hover:border-white hover:bg-zinc-800"
            >
              <div className="absolute -right-8 -top-8 text-9xl opacity-5 transition-all group-hover:rotate-12 group-hover:scale-110">
                {tuto.emoji}
              </div>
              <div className="relative flex h-full flex-col gap-3">
                <div className="text-4xl transition-all group-hover:animate-bounce">
                  {tuto.emoji}
                </div>
                <h2 className="text-2xl font-bold">{tuto.titre}</h2>
                <p className="text-sm leading-relaxed text-white/80">{tuto.description}</p>
                <div className="mt-auto flex items-center gap-2 text-xs font-semibold transition-all group-hover:gap-3">
                  ouvrir <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-4 text-center text-sm italic text-zinc-500">
          juice5 — le savoir libre, ça régale
        </p>
      </main>
    </div>
  );
}

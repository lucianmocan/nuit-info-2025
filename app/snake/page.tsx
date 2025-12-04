"use client";

import SnakeGame from "./SnakeGame";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function SnakePage() {
    const [showSnake, setShowSnake] = useState(true);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">

            {/* 🔙 Bouton retour */}
            <Link
                href="./../"
                className="mb-6 text-white/80 hover:text-white transition text-sm underline"
            >
                ← Back Home
            </Link>

            {/* 🐍 Jeu Snake */}
            {showSnake ? (
                <SnakeGame />
            ) : (
                <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
                    {/* contenu alternatif si besoin */}
                </div>
            )}
        </div>
    );
}

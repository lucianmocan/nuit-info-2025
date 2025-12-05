"use client";

import React, { useEffect, useState } from "react";
import SnakeGame from "../snake/SnakeGame";  // ← adapte le chemin !
import "./BackgroundFloatingImage.css";

export default function FloatingOffscreenImage() {
  const [pos, setPos] = useState({ top: "-20%", left: "-20%" });
  const [showModal, setShowModal] = useState(false);

  const moveToRandomPosition = () => {
    const newTop = Math.random() * 80 + 10;
    const newLeft = Math.random() * 80 + 10;

    setPos({
      top: `${newTop}%`,
      left: `${newLeft}%`,
    });
  };

  const moveOffscreen = () => {
    const side = Math.floor(Math.random() * 4);

    if (side === 0) setPos({ top: "-20%", left: `${Math.random() * 100}%` });
    if (side === 1) setPos({ top: `${Math.random() * 100}%`, left: "120%" });
    if (side === 2) setPos({ top: "120%", left: `${Math.random() * 100}%` });
    if (side === 3) setPos({ top: `${Math.random() * 100}%`, left: "-20%" });
  };

  useEffect(() => {
    const sequence = () => {
      moveToRandomPosition();
      setTimeout(() => moveToRandomPosition(), 3000);
      setTimeout(() => moveOffscreen(), 6000);
    };

    sequence();
    const interval = setInterval(sequence, 9000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* --- IMAGE FLOTTANTE CLIQUABLE --- */}
      <img
        src="/python.png"
        alt="floating"
        className="floating-img"
        onClick={handleClick}
        style={{
          zIndex: 1,
          opacity: 0.25,
          top: pos.top,
          left: pos.left,
          position: "absolute",
          cursor: "pointer",
        }}
      />

      {/* --- MODAL SNAKE --- */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative rounded-2xl bg-zinc-900 p-4 border-4 border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bouton fermer */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-4 -right-4 bg-white text-black font-bold rounded-full w-8 h-8"
            >
              ✕
            </button>

            <SnakeGame />
          </div>
        </div>
      )}
    </>
  );
}

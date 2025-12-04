import React, { useEffect, useState } from "react";
import "./BackgroundFloatingImage.css";

export default function FloatingOffscreenImage() {
  const [pos, setPos] = useState({ top: "-20%", left: "-20%" }); // start off-screen

  const moveToRandomPosition = () => {
    const newTop = Math.random() * 80 + 10;  // stays inside 10–90%
    const newLeft = Math.random() * 80 + 10;

    setPos({
      top: `${newTop}%`,
      left: `${newLeft}%`,
    });
  };

  const moveOffscreen = () => {
    // pick a random direction to leave the screen
    const side = Math.floor(Math.random() * 4); // 0=top, 1=right, 2=bottom, 3=left

    if (side === 0) setPos({ top: "-20%", left: `${Math.random() * 100}%` });
    if (side === 1) setPos({ top: `${Math.random() * 100}%`, left: "120%" });
    if (side === 2) setPos({ top: "120%", left: `${Math.random() * 100}%` });
    if (side === 3) setPos({ top: `${Math.random() * 100}%`, left: "-20%" });
  };

  useEffect(() => {
    const sequence = () => {
      moveToRandomPosition();                 // 1) Enter somewhere
      setTimeout(() => moveToRandomPosition(), 3000);  // 2) Move again
      setTimeout(() => moveOffscreen(), 6000);         // 3) Leave screen
    };

    sequence();
    const interval = setInterval(sequence, 9000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    alert("Clicked!");
  };

  return (
    <img
      src="/python.png"
      alt="floating"
      className="floating-img"
      onClick={handleClick}
      style={{
        zIndex: 0,
        opacity: 0.2,
        top: pos.top,
        left: pos.left,
      }}
    />
  );
}
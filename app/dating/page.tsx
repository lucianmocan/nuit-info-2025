"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DatingPage() {
  // Data structure for the 20 items
  // "Smash" = Good (Open Source/Sovereign), "Pass" = Bad (Big Tech/Surveillance)
  const items = [
    { id: 1, name: "Linux", type: "good", image: "/dating/linux.png", description: "Le pingouin qui domine le monde (des serveurs)" },
    { id: 2, name: "Windows", type: "bad", image: "/dating/windows.png", description: "L'écran bleu de la mort" },
    { id: 3, name: "Firefox", type: "good", image: "/dating/firefox.png", description: "Le renard de feu qui te protège" },
    { id: 4, name: "Chrome", type: "bad", image: "/dating/chrome.png", description: "Mange ta RAM et tes données" },
    { id: 5, name: "Signal", type: "good", image: "/dating/signal.png", description: "Chiffré de bout en bout, pour de vrai" },
    { id: 6, name: "WhatsApp", type: "bad", image: "/dating/whatsapp.png", description: "Zuck lit tes messages (probablement)" },
    { id: 7, name: "VLC", type: "good", image: "/dating/vlc.png", description: "Le cône qui lit tout, même tes pensées" },
    { id: 8, name: "Adobe", type: "bad", image: "/dating/adobe.png", description: "Abonnement mensuel pour respirer" },
    { id: 9, name: "ProtonMail", type: "good", image: "/dating/proton.png", description: "Tes emails dans un bunker suisse" },
    { id: 10, name: "Gmail", type: "bad", image: "/dating/gmail.png", description: "On lit tes mails pour la pub" },
    { id: 11, name: "Blender", type: "good", image: "/dating/blender.png", description: "3D gratuite et surpuissante" },
    { id: 12, name: "TikTok", type: "bad", image: "/dating/tiktok.png", description: "Ton temps de cerveau disponible" },
    { id: 13, name: "LibreOffice", type: "good", image: "/dating/libreoffice.png", description: "Comme Word mais sans le trombone" },
    { id: 14, name: "Microsoft Teams", type: "bad", image: "/dating/teams.png", description: "L'enfer du télétravail" },
    { id: 15, name: "Tor", type: "good", image: "/dating/tor.png", description: "L'oignon qui fait pleurer la NSA" },
    { id: 16, name: "Facebook", type: "bad", image: "/dating/facebook.png", description: "C'est pour les vieux maintenant" },
    { id: 17, name: "Matrix", type: "good", image: "/dating/matrix.png", description: "Pilule rouge ou pilule bleue ?" },
    { id: 18, name: "Amazon", type: "bad", image: "/dating/amazon.png", description: "Jeff Bezos a assez d'argent" },
    { id: 19, name: "DuckDuckGo", type: "good", image: "/dating/duckduckgo.png", description: "Le canard qui ne te traque pas" },
    { id: 20, name: "Google", type: "bad", image: "/dating/google.png", description: "Ils savent où tu habites" },
  ];

  const nirdFacts = [
    "Le numérique émet 4% des gaz à effet de serre mondiaux, soit plus que l'aviation civile.",
    "Fabriquer un ordinateur de 2kg nécessite 800kg de matières premières.",
    "La fin du support de Windows 10 en 2025 menace de rendre obsolètes 240 millions de PC.",
    "NIRD signifie Numérique Inclusif, Responsable et Durable.",
    "L'école doit former des citoyens éclairés, pas des consommateurs captifs.",
    "Les logiciels libres sont des biens communs numériques, accessibles à tous."
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [lastSwipe, setLastSwipe] = useState<"smash" | "pass" | null>(null);
  
  // Cooldown state
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showCooldown, setShowCooldown] = useState(false);
  const [cooldownTimer, setCooldownTimer] = useState(0);
  const [cooldownFact, setCooldownFact] = useState("");

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showCooldown && cooldownTimer > 0) {
      interval = setInterval(() => {
        setCooldownTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showCooldown, cooldownTimer]);

  const handleSwipe = (action: "smash" | "pass") => {
    const now = Date.now();
    
    // If clicking too fast (less than 800ms), trigger cooldown
    if (now - lastClickTime < 800) {
      setCooldownFact(nirdFacts[Math.floor(Math.random() * nirdFacts.length)]);
      setCooldownTimer(5);
      setShowCooldown(true);
      return;
    }

    setLastClickTime(now);
    const currentItem = items[currentIndex];
    
    // Logic: 
    // Smash (Like) -> Correct if item is "good"
    // Pass (Dislike) -> Correct if item is "bad"
    const isCorrect = 
      (action === "smash" && currentItem.type === "good") || 
      (action === "pass" && currentItem.type === "bad");

    if (isCorrect) setScore(score + 1);
    setLastSwipe(action);

    setTimeout(() => {
      if (currentIndex < items.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setLastSwipe(null);
      } else {
        setGameOver(true);
      }
    }, 1000);
  };

  const closeCooldown = () => {
    setShowCooldown(false);
    setLastClickTime(Date.now()); // Reset timer to avoid immediate re-trigger
  };

  const resetGame = () => {
    setCurrentIndex(0);
    setScore(0);
    setGameOver(false);
    setLastSwipe(null);
  };

  const currentItem = items[currentIndex];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <Link href="/" className="absolute top-8 left-8 group flex items-center gap-2 rounded-full border-2 border-dashed border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium transition-all hover:rotate-[-5deg] hover:scale-110 hover:border-white hover:bg-white hover:text-black">
        <span className="transition-transform group-hover:-translate-x-2">←</span>
        retour au menu
      </Link>

      {!gameOver ? (
        <div className="flex flex-col items-center gap-12 max-w-2xl w-full">
          <div className="text-center space-y-2">
            <h1 className="text-5xl font-black tracking-tighter uppercase italic">smash or pass</h1>
            <p className="text-zinc-400 font-mono">tech edition ({currentIndex + 1}/{items.length})</p>
          </div>

          <div className={`relative w-full bg-zinc-900 rounded-3xl border-4 border-dashed border-white p-12 flex flex-col items-center gap-8 transition-all duration-1000 ease-out ${lastSwipe === 'smash' ? 'rotate-12 translate-x-40 opacity-0' : lastSwipe === 'pass' ? '-rotate-12 -translate-x-40 opacity-0' : 'hover:scale-[1.02]'}`}>
            
            {/* Stamps */}
            <div className={`absolute top-12 right-12 z-20 rotate-[-15deg] border-8 border-green-500 px-6 py-2 text-6xl font-black text-green-500 opacity-0 transition-opacity duration-200 ${lastSwipe === 'smash' ? 'opacity-100' : ''}`}>
                BASED
            </div>
            <div className={`absolute top-12 left-12 z-20 rotate-[15deg] border-8 border-red-500 px-6 py-2 text-6xl font-black text-red-500 opacity-0 transition-opacity duration-200 ${lastSwipe === 'pass' ? 'opacity-100' : ''}`}>
                CRINGE
            </div>

            <div className="relative w-full h-80">
               <Image 
                 src={currentItem.image} 
                 alt={currentItem.name} 
                 layout="fill" 
                 objectFit="contain" 
                 className="drop-shadow-2xl transition-transform duration-300 hover:scale-110"
               />
            </div>
            
            <div className="text-center space-y-4">
              <h2 className="text-6xl font-black uppercase italic tracking-tighter">{currentItem.name}</h2>
              <p className="text-2xl font-medium text-zinc-300">{currentItem.description}</p>
            </div>
          </div>

          <div className="flex gap-12 w-full justify-center">
            <button 
              onClick={() => handleSwipe("pass")}
              className="group relative w-24 h-24 rounded-full border-4 border-dashed border-red-500 bg-transparent text-5xl flex items-center justify-center transition-all hover:scale-110 hover:bg-red-500 hover:text-white hover:border-solid hover:rotate-[-12deg]"
            >
              <span className="group-hover:animate-pulse">❌</span>
            </button>
            <button 
              onClick={() => handleSwipe("smash")}
              className="group relative w-24 h-24 rounded-full border-4 border-dashed border-green-500 bg-transparent text-5xl flex items-center justify-center transition-all hover:scale-110 hover:bg-green-500 hover:text-white hover:border-solid hover:rotate-[12deg]"
            >
              <span className="group-hover:animate-pulse">💚</span>
            </button>
          </div>
          <p className="text-xs text-zinc-600">
            smash = c'est validé (open source/éthique)<br/>
            pass = poubelle (surveillance/gafam)
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-8 text-center animate-in fade-in zoom-in duration-500">
          <h2 className="text-6xl font-bold mb-4">Terminé !</h2>
          <div className="text-9xl mb-4">
            {score > 15 ? "🏆" : score > 10 ? "😐" : "💀"}
          </div>
          <p className="text-2xl">
            Ton score de résistance : <span className="font-bold text-purple-400">{score}/{items.length}</span>
          </p>
          <p className="text-zinc-400 max-w-md">
            {score > 15 ? "Tu es un véritable résistant numérique. De Gaulle serait fier." : 
             score > 10 ? "Pas mal, mais tu as encore quelques mouchards dans ta poche." : 
             "C'est la catastrophe. Tu es littéralement un panneau publicitaire ambulant."}
          </p>

          <div className="mt-12 flex flex-col gap-6 items-center max-w-2xl rounded-3xl border-4 border-dashed border-purple-500/50 bg-purple-900/10 p-8">
            <div className="text-center space-y-4">
              <h3 className="text-3xl font-black uppercase italic text-purple-400">PASSEZ À L'ACTION</h3>
              <p className="text-lg text-zinc-300 leading-relaxed">
                Le "Smash or Pass", c'est marrant 5 minutes. Mais dans la vraie vie, la fin de Windows 10 va bientôt rendre obsolètes des millions de PC scolaires. <br/><br/>
                <span className="font-bold text-white">La résistance s'organise déjà.</span> Rejoignez le mouvement pour un numérique <span className="text-purple-400 font-bold">Inclusif, Responsable et Durable</span>. Installez Linux, sauvez des ordis, et reprenez le contrôle.
              </p>
            </div>

            <a 
              href="https://nird.forge.apps.education.fr/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-full border-4 border-white bg-white px-8 py-4 text-xl font-black text-black transition-all hover:scale-105 hover:bg-purple-500 hover:text-white hover:border-purple-500"
            >
              <span className="relative z-10">REJOINDRE LA DÉMARCHE NIRD ↗</span>
            </a>
            <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
              pour une école libre et souveraine
            </p>
          </div>

          <button 
            onClick={resetGame}
            className="mt-4 rounded-full border-2 border-dashed border-zinc-700 px-6 py-2 text-sm font-medium text-zinc-500 transition-all hover:border-zinc-500 hover:text-zinc-300"
          >
            recommencer le test
          </button>
        </div>
      )}
      {showCooldown && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
          <div className="max-w-lg w-full bg-zinc-900 rounded-3xl border-4 border-dashed border-red-500 p-8 text-center animate-in zoom-in duration-300">
            <div className="text-6xl mb-4 animate-bounce">🚨</div>
            <h3 className="text-3xl font-black text-red-500 mb-2 uppercase">Woah, doucement !</h3>
            <p className="text-zinc-400 mb-6">Tu swipes plus vite que ton ombre. Prends le temps de lire, c'est pas une course.</p>
            
            <div className="bg-zinc-800 rounded-xl p-6 mb-6 border border-zinc-700">
              <p className="text-lg font-medium text-white italic">"{cooldownFact}"</p>
            </div>

            <div className="aspect-video w-full overflow-hidden rounded-xl border-2 border-zinc-700 mb-6">
              <iframe 
                width="100%" 
                height="100%" 
                src="https://www.youtube.com/embed/9CXKU9_TWGY?autoplay=1" 
                title="Je vous ai compris" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>

            {cooldownTimer > 0 ? (
              <div className="text-4xl font-mono font-bold text-white">
                {cooldownTimer}s
              </div>
            ) : (
              <button
                onClick={closeCooldown}
                className="w-full rounded-full bg-white px-6 py-3 font-bold text-black transition-all hover:scale-105 hover:bg-red-500 hover:text-white"
              >
                J'ai compris, je me calme
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

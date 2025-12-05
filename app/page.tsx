"use client";

import SnakeGame from "./snake/SnakeGame"; // adapte le chemin si besoin
import BackgroundFloatingImage from "./components/movingImg";


import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const viewParam = searchParams.get("view");

  const presidents = [
    {
      nom: "Emmanuel Macron",
      annees: "2017–en cours",
      description:
        "A promu la souveraineté numérique européenne pour réduire la dépendance aux géants américains et chinois, en appelant à une 'préférence européenne' dans les technologies comme l'IA et le cloud, tout en maintenant des partenariats avec des entreprises US sans actions directes augmentant la dépendance.",
      src: "/heads/download.jpeg",
    },
    {
      nom: "François Hollande",
      annees: "2012–2017",
      description:
        "A lancé l'initiative French Tech en 2013 pour booster les startups françaises, inspiré du modèle américain, et visité la Silicon Valley en 2014 pour attirer les talents expatriés, favorisant ainsi des liens plus étroits avec les écosystèmes tech US sans mesures explicitement augmentant la dépendance.",
      src: "/heads/download (1).jpeg",
    },
    {
      nom: "Nicolas Sarkozy",
      annees: "2007–2012",
      description:
        "A vu Google comme un partenaire pour la numérisation des bibliothèques françaises, allouant des fonds publics en réponse aux efforts de Google, et promu une régulation d'Internet inspirée de modèles globaux, renforçant indirectement l'influence des plateformes américaines en France.",
      src: "/heads/download (2).jpeg",
    },
    {
      nom: "Jacques Chirac",
      annees: "1995–2007",
      description:
        "A poursuivi une politique d'indépendance technologique européenne, critiquant la domination américaine et promouvant une Europe multipolaire, sans actions spécifiques augmentant la dépendance aux géants US ; au contraire, il a visé à réduire la dépendances aux technologies américaines dans la défense et l'économie.",
      src: "/heads/download (3).jpeg",
    },
    {
      nom: "François Mitterrand",
      annees: "1981–1995",
      description:
        "A visité la Silicon Valley en 1984 pour rencontrer des leaders tech américains, favorisant des échanges et une ouverture à l'innovation US, tout en nationalisant des industries pour renforcer l'indépendance française, avec un bilan mixte sur la dépendance tech.",
      src: "/heads/download (4).jpeg",
    },
    {
      nom: "Valéry Giscard d'Estaing",
      annees: "1974–1981",
      description:
        "A promu la 'francisation' des industries, réduisant le contrôle étranger dans les télécoms (comme ITT américain), et favorisé la coopération européenne pour l'autonomie, sans actions directes augmentant la dépendance aux technologies US.",
      src: "/heads/download (5).jpeg",
    },
    {
      nom: "Georges Pompidou",
      annees: "1969–1974",
      description:
        "A décidé en 1969 de construire des centrales nucléaires basées sur la technologie américaine, rendant la France dépendante de l'uranium enrichi US, marquant un abandon partiel de l'indépendance technologique gaulliste pour des raisons d'efficacité.",
      src: "/heads/download (6).jpeg",
    },
  ];

  interface President {
    nom: string;
    annees: string;
    description: string;
    src: string;
  }

  const [modalPresident, setModalPresident] = useState<President | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showSnake, setShowSnake] = useState(false);

  useEffect(() => {
    if (viewParam === "menu") {
      setShowMenu(true);
    }
  }, [viewParam]);

  const openModal = (president: President) => {
    setModalPresident(president);
  };

  const closeModal = () => {
    setModalPresident(null);
  };

  const handleDemarrer = () => {
    setShowMenu(true);
    setShowSnake(false);
  };

  const handleBack = () => {
    setShowMenu(false);
    setShowSnake(false);
    router.push("/");
  };

  const handleSnake = () => {
    setShowSnake(true);
    setShowMenu(false);
  }

  const quotes = [
    { text: "Je vous ai compris", font: "var(--font-pinyon)", animation: "pptZoom" },
    { text: "Mangez des pommes", font: "var(--font-great-vibes)", animation: "pptSlideLeft" },
    { text: "La force tranquille", font: "var(--font-parisienne)", animation: "pptFadeUp" },
    { text: "Le changement c'est maintenant", font: "var(--font-allura)", animation: "pptSpin" },
    { text: "Parce que c'est notre projet", font: "var(--font-tangerine)", animation: "pptBounce" },
    { text: "Au revoir", font: "var(--font-pinyon)", animation: "pptFlip" },
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <BackgroundFloatingImage />
      {!showMenu ? (
        <main className="flex w-full flex-col items-center justify-center gap-16 p-8 text-center">
          <div className="relative h-40 flex items-center justify-center">
            <span className="absolute -left-24 top-1/2 -translate-y-1/2 select-none text-9xl font-serif text-zinc-700 opacity-50">
              «
            </span>
            <h1 
              key={currentQuoteIndex}
              className="relative z-10 text-7xl md:text-8xl font-bold tracking-tight text-white transition-all hover:scale-110 hover:tracking-wider"
              style={{ 
                fontFamily: quotes[currentQuoteIndex].font,
                animation: `${quotes[currentQuoteIndex].animation} 1.5s cubic-bezier(0.25, 1, 0.5, 1) both`
              }}
            >
              {quotes[currentQuoteIndex].text}
            </h1>
            <span className="absolute -right-24 top-1/2 -translate-y-1/2 select-none text-9xl font-serif text-zinc-700 opacity-50">
              »
            </span>
          </div>

          <div className="relative flex -space-x-4 pt-8">
            {presidents.map((president, index) => (
              <div
                key={index}
                className="group relative cursor-pointer transition-all hover:z-50"
                onClick={() => openModal(president)}
                style={{
                  zIndex: presidents.length - index,
                  animation: `float ${2 + index * 0.3}s ease-in-out infinite`,
                  animationDelay: `${index * 0.2}s`,
                }}
              >
                <div className="relative h-20 w-20 transform rounded-full border-2 border-white/20 transition-all duration-300 ease-in-out hover:scale-[2] hover:rotate-[360deg] hover:border-4 hover:border-white">
                  <Image
                    src={president.src}
                    alt={president.nom}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-full grayscale transition-all duration-300 group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500/0 via-pink-500/0 to-blue-500/0 transition-all duration-300 group-hover:from-purple-500/30 group-hover:via-pink-500/30 group-hover:to-blue-500/30"></div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleDemarrer}
            className="group relative mt-8 overflow-hidden rounded-full border-4 border-dashed border-white bg-black px-8 py-4 text-lg font-semibold text-white transition-all hover:rotate-2 hover:scale-110 hover:border-solid hover:bg-white hover:text-black"
          >
            <span className="relative z-10 transition-all group-hover:tracking-widest">
              démarrer. c'est français
            </span>
          </button>

          <style jsx>{`
            @keyframes float {
              0%,
              100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }
            @keyframes pptZoom { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            @keyframes pptSlideLeft { from { transform: translateX(-100vw) rotate(-10deg); opacity: 0; } to { transform: translateX(0) rotate(0); opacity: 1; } }
            @keyframes pptFadeUp { from { transform: translateY(50px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
            @keyframes pptSpin { from { transform: rotate(-180deg) scale(0); opacity: 0; } to { transform: rotate(0) scale(1); opacity: 1; } }
            @keyframes pptBounce { 0% { transform: translateY(-100px); opacity: 0; } 60% { transform: translateY(20px); opacity: 1; } 100% { transform: translateY(0); } }
            @keyframes pptFlip { from { transform: perspective(400px) rotateX(90deg); opacity: 0; } to { transform: perspective(400px) rotateX(0); opacity: 1; } }
          `}</style>
        </main>
      ) : (
        <main className="flex w-full max-w-6xl flex-col items-center justify-center gap-8 p-8">
          <div className="flex w-full items-center justify-between">
            <button
              onClick={handleBack}
              className="group flex items-center gap-2 rounded-full border-2 border-dashed border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium transition-all hover:rotate-[-5deg] hover:scale-110 hover:border-white hover:bg-white hover:text-black"
            >
              <span className="transition-transform group-hover:-translate-x-2">
                ←
              </span>
              nope
            </button>
            <h1 className="text-4xl font-bold tracking-tight transition-all hover:scale-110 hover:tracking-widest md:text-5xl">
              qu'est-ce qu'on fait ?
            </h1>
            <div className="w-24"></div>
          </div>

          <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
                        <Link href="/dating" className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-dashed border-white/20 bg-zinc-900 p-6 transition-all hover:rotate-2 hover:scale-105 hover:border-solid hover:border-white hover:bg-zinc-800">
              <div className="absolute -right-8 -top-8 text-9xl opacity-5 transition-all group-hover:rotate-12 group-hover:scale-110">
                💘
              </div>
              <div className="relative flex h-full flex-col gap-3">
                <div className="text-4xl transition-all group-hover:animate-bounce">
                  💘
                </div>
                <h2 className="text-2xl font-bold">tinder pour la résistance</h2>
                <p className="text-sm leading-relaxed text-white/80">
                  swipe right sur linux, left sur windows. genre tinder mais au lieu de ghoster des gens tu ghostes microsoft
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs font-semibold transition-all group-hover:gap-3">
                  let's go <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>

            <Link href="/quiz" className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-dashed border-white/20 bg-zinc-900 p-6 transition-all hover:-rotate-2 hover:scale-105 hover:border-solid hover:border-white hover:bg-zinc-800">
              <div className="absolute -left-8 -bottom-8 text-9xl opacity-5 transition-all group-hover:-rotate-12 group-hover:scale-110">
                📊
              </div>
              <div className="relative flex h-full flex-col gap-3">
                <div className="text-4xl transition-all group-hover:animate-spin">
                  📊
                </div>
                <h2 className="text-2xl font-bold">t'es à quel point vendu ?</h2>
                <p className="text-sm leading-relaxed text-white/80">
                  quiz rapide pour savoir si t'es plus dépendant de google que de l'oxygène. spoiler: tu l'es probablement
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs font-semibold transition-all group-hover:gap-3">
                  on check <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>

            <Link href="/oss-translate" className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-dashed border-white/20 bg-zinc-900 p-6 transition-all hover:-rotate-2 hover:scale-105 hover:border-solid hover:border-white hover:bg-zinc-800">
              <div className="absolute -right-8 -bottom-8 text-9xl opacity-5 transition-all group-hover:rotate-180 group-hover:scale-110">
                🔄
              </div>
              <div className="relative flex h-full flex-col gap-3">
                <div className="text-4xl transition-all group-hover:rotate-180">
                  🔄
                </div>
                <h2 className="text-2xl font-bold">freeslator version based</h2>
                <p className="text-sm leading-relaxed text-white/80">
                  windows → linux, chrome → firefox, zoom → jitsi. on traduit ta vie numérique en mode open source
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs font-semibold transition-all group-hover:gap-3">
                  traduis moi ça <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>

            <Link href="/tutos" className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-dashed border-white/20 bg-zinc-900 p-6 transition-all hover:rotate-2 hover:scale-105 hover:border-solid hover:border-white hover:bg-zinc-800">
              <div className="absolute -left-8 -top-8 text-9xl opacity-5 transition-all group-hover:-rotate-12 group-hover:scale-110">
                📚
              </div>
              <div className="relative flex h-full flex-col gap-3">
                <div className="text-4xl transition-all group-hover:animate-pulse">
                  📚
                </div>
                <h2 className="text-2xl font-bold">les tutos d'antoine</h2>
                <p className="text-sm leading-relaxed text-white/80">
                  podcasts, vidéos, tout le bordel. genre netflix mais éducatif et ça parle de souveraineté numérique
                </p>
                <div className="mt-auto flex items-center gap-2 text-xs font-semibold transition-all group-hover:gap-3">
                  j'y vais <span className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          </div>

            <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
                <Link
                  href="/snake"
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border-4 border-dashed border-white/20 bg-zinc-900 p-6 transition-all hover:rotate-2 hover:scale-105 hover:border-solid hover:border-white hover:bg-zinc-800"
                >
                  <div className="absolute -right-8 -top-8 text-9xl opacity-5 transition-all group-hover:rotate-12 group-hover:scale-110">
                      <Image
                        src="/imgs/snake.png"
                        alt="Snake BG"
                        width={120}
                        height={120}
                        className="opacity-100"
                      />
                  </div>
                  <div className="relative flex h-full flex-col gap-3">
                    <div className="text-4xl transition-all group-hover:animate-bounce">
                      <Image
                        src="/imgs/snake.png"
                        alt="Snake BG"
                        width={120}
                        height={120}
                        className="opacity-100"
                      />
                    </div>
                    <h2 className="text-2xl font-bold">Go play snake you little brat</h2>
                    <p className="text-sm leading-relaxed text-white/80">
                      SNAKE
                    </p>
                    <div className="mt-auto flex items-center gap-2 text-xs font-semibold transition-all group-hover:gap-3">
                      Snake Go <span className="transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
            </div>

          <p className="mt-4 text-center text-sm italic text-zinc-500">
            juice5 — on déconne pas avec la liberté (enfin si un peu)
          </p>
        </main>
      )}

      {modalPresident && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={closeModal}
        >
          <div
            className="relative flex w-full max-w-4xl flex-col items-center gap-8 rounded-3xl border-4 border-dashed border-white bg-zinc-900 p-8 text-white shadow-2xl md:flex-row"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "modalSlideIn 0.5s ease-out",
            }}
          >
            <div className="absolute -right-4 -top-4 rotate-12 text-6xl opacity-20">
              👑
            </div>
            <div className="absolute -bottom-4 -left-4 -rotate-12 text-6xl opacity-20">
              🇫🇷
            </div>
            <div className="group relative h-64 w-64 flex-shrink-0">
              <div className="absolute inset-0 animate-spin-slow rounded-full border-4 border-dashed border-white/30"></div>
              <div className="relative h-full w-full rounded-full border-4 border-white transition-all group-hover:scale-105">
                <Image
                  src={modalPresident.src}
                  alt={modalPresident.nom}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full grayscale transition-all duration-300 group-hover:grayscale-0"
                />
              </div>
            </div>
            <div className="text-left">
              <h3 className="text-4xl font-bold text-white">
                {modalPresident.nom}
              </h3>
              <p className="text-md mt-2 font-mono text-zinc-400">
                {modalPresident.annees}
              </p>
              <p className="mt-4 text-lg leading-relaxed">
                {modalPresident.description}
              </p>
              <button
                onClick={closeModal}
                className="mt-6 rounded-full border-2 border-dashed border-white bg-transparent px-6 py-2 font-semibold transition-all hover:rotate-2 hover:scale-105 hover:border-solid hover:bg-white hover:text-black"
              >
                ça va j'ai compris
              </button>
            </div>
          </div>

          <style jsx>{`
            @keyframes modalSlideIn {
              from {
                opacity: 0;
                transform: scale(0.8) rotate(-5deg);
              }
              to {
                opacity: 1;
                transform: scale(1) rotate(0deg);
              }
            }
            @keyframes spin-slow {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
            .animate-spin-slow {
              animation: spin-slow 3s linear infinite;
            }
          `}</style>
        </div>
      )}

      {showSnake && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md"
          onClick={() => setShowSnake(false)}
        >
          <div
            className="relative flex w-full max-w-4xl flex-col items-center gap-4 rounded-3xl border-4 border-dashed border-white bg-zinc-900 p-8 text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              animation: "modalSlideIn 0.5s ease-out",
            }}
          >
            <div className="flex w-full items-center justify-between mb-4">
              <h2 className="text-3xl font-bold">Snake Game</h2>
              <button
                onClick={() => setShowSnake(false)}
                className="rounded-full border-2 border-dashed border-white bg-transparent px-4 py-2 font-semibold transition-all hover:rotate-2 hover:scale-105 hover:border-solid hover:bg-white hover:text-black"
              >
                fermer
              </button>
            </div>
            <div className="w-full flex justify-center">
              <SnakeGame percentageWidth={70} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

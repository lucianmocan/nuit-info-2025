"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const questions = [
    {
      question: "Ton PC te demande de faire une mise à jour Windows au milieu d'une présentation. Ta réaction ?",
      options: [
        { text: "Je pleure et j'attends 2h", points: 10 },
        { text: "J'ai un Mac, ça n'arrive jamais (lol)", points: 5 },
        { text: "Je suis sous Linux, je mets à jour quand JE veux", points: 0 },
      ],
    },
    {
      question: "C'est quoi pour toi le 'Cloud' ?",
      options: [
        { text: "Un nuage magique où vivent mes photos", points: 10 },
        { text: "L'ordinateur de quelqu'un d'autre", points: 0 },
        { text: "Un truc payant d'Apple", points: 5 },
      ],
    },
    {
      question: "Windows 10 ne sera plus supporté bientôt. Tu fais quoi ?",
      options: [
        { text: "J'achète un nouveau PC, l'ancien est foutu", points: 10 },
        { text: "Je force l'install de Windows 11 en bidouillant", points: 5 },
        { text: "J'installe Linux et je repars pour 10 ans", points: 0 },
      ],
    },
    {
      question: "Ton école/boîte utilise Office 365. Ton avis ?",
      options: [
        { text: "C'est la vie, je ne connais que ça", points: 10 },
        { text: "C'est pratique mais cher", points: 5 },
        { text: "LibreOffice fait pareil pour 0€ et sans espionnage", points: 0 },
      ],
    },
    {
      question: "Tu cherches une info sur le net. Tu utilises...",
      options: [
        { text: "Google, y'a d'autres trucs ?", points: 10 },
        { text: "Bing (tu es un psychopathe)", points: 8 },
        { text: "Qwant, DuckDuckGo ou Ecosia", points: 0 },
      ],
    },
    {
      question: "Pour toi, 'Open Source' ça veut dire...",
      options: [
        { text: "Un truc de hacker gratuit mais moche", points: 10 },
        { text: "Un logiciel dont le code est ouvert et auditable", points: 0 },
        { text: "Une marque de jus de fruit ?", points: 15 },
      ],
    },
    {
      question: "Tu dois envoyer un gros fichier. Tu utilises...",
      options: [
        { text: "WeTransfer ou Google Drive", points: 10 },
        { text: "Une clé USB (la vieille école)", points: 5 },
        { text: "FileSender ou un service hébergé en France", points: 0 },
      ],
    },
    {
      question: "Ton navigateur web préféré ?",
      options: [
        { text: "Google Chrome (je donne tout à Google)", points: 10 },
        { text: "Edge (je donne tout à Microsoft)", points: 10 },
        { text: "Firefox (je résiste encore)", points: 0 },
      ],
    },
    {
      question: "La démarche NIRD, ça te parle ?",
      options: [
        { text: "C'est une insulte en anglais ?", points: 10 },
        { text: "Numérique Inclusif, Responsable et Durable", points: 0 },
        { text: "Un nouveau groupe de K-Pop", points: 5 },
      ],
    },
    {
      question: "Tu as besoin d'un logiciel de retouche photo...",
      options: [
        { text: "Je crack Photoshop (c'est mal)", points: 5 },
        { text: "Je paie l'abo Adobe (c'est cher)", points: 10 },
        { text: "J'utilise GIMP ou Krita", points: 0 },
      ],
    },
    {
      question: "Tes mots de passe ressemblent à...",
      options: [
        { text: "123456 ou le nom de mon chat", points: 15 },
        { text: "Un truc compliqué que j'oublie tout le temps", points: 5 },
        { text: "J'utilise un gestionnaire (Bitwarden, Keepass...)", points: 0 },
      ],
    },
    {
      question: "L'obsolescence programmée, c'est...",
      options: [
        { text: "Une théorie du complot", points: 10 },
        { text: "Un fait réel pour nous faire racheter des trucs", points: 0 },
        { text: "Je change d'iPhone tous les ans de toute façon", points: 20 },
      ],
    },
    {
      question: "Pour la visio, tu préfères...",
      options: [
        { text: "Zoom ou Teams", points: 10 },
        { text: "Discord", points: 5 },
        { text: "Jitsi ou BigBlueButton", points: 0 },
      ],
    },
    {
      question: "Tes données personnelles sont...",
      options: [
        { text: "Pas grave, j'ai rien à cacher", points: 15 },
        { text: "En sécurité chez Apple (crois-y)", points: 10 },
        { text: "À moi, et je veux qu'elles le restent", points: 0 },
      ],
    },
    {
      question: "Si on te dit 'Souveraineté Numérique', tu penses...",
      options: [
        { text: "C'est un truc de politique chiant", points: 10 },
        { text: "C'est essentiel pour ne pas être une colonie numérique", points: 0 },
        { text: "Ça veut dire acheter français ?", points: 5 },
      ],
    },
  ];

  const handleAnswer = (points: number) => {
    setScore(score + points);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    if (score < 30) return {
      title: "RÉSISTANT CONFIRMÉ",
      desc: "Bravo ! Tu es libre comme l'air. Tu utilises probablement Arch Linux (btw). Continue de prêcher la bonne parole.",
      color: "text-green-500",
      img: "🛡️"
    };
    if (score < 80) return {
      title: "CITOYEN CONSCIENT",
      desc: "Pas mal ! Tu fais des efforts mais tu as encore quelques chaînes aux pieds. Lâche ce Google Drive, tu peux le faire.",
      color: "text-yellow-500",
      img: "🤔"
    };
    return {
      title: "PIGEON CERTIFIÉ",
      desc: "Aïe... Tu es la vache à lait des GAFAM. Ils connaissent mieux ta vie que ta propre mère. Il est temps de changer !",
      color: "text-red-500",
      img: "💸"
    };
  };

  const resultData = showResult ? getResult() : null;

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col items-center justify-center font-sans">
      <Link href="/?view=menu" className="absolute top-8 left-8 group flex items-center gap-2 rounded-full border-2 border-dashed border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium transition-all hover:rotate-[-5deg] hover:scale-110 hover:border-white hover:bg-white hover:text-black">
        <span className="transition-transform group-hover:-translate-x-2">←</span>
        retour au menu
      </Link>
      <div className="w-full max-w-3xl">
        <div className="flex items-center justify-end mb-12">
          <div className="text-zinc-500 font-mono text-sm">
            QUESTION {currentQuestion + 1}/{questions.length}
          </div>
        </div>

        {!showResult ? (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-500">
            <h1 className="min-h-[160px] flex items-center justify-center text-3xl md:text-4xl font-bold mb-12 text-center leading-tight">
              {questions[currentQuestion].question}
            </h1>

            <div className="grid gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.points)}
                  className="group relative w-full p-6 text-left rounded-xl border-2 border-dashed border-zinc-700 hover:border-white hover:bg-zinc-900 transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium group-hover:text-white text-zinc-300">
                      {option.text}
                    </span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xl">
                      →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center animate-in zoom-in duration-500">
            <div className="text-9xl mb-6 animate-bounce">
              {resultData?.img}
            </div>
            <h2 className={`text-5xl font-black mb-4 ${resultData?.color}`}>
              {resultData?.title}
            </h2>
            <p className="text-xl text-zinc-300 mb-12 max-w-xl leading-relaxed">
              {resultData?.desc}
            </p>

            <div className="w-full max-w-2xl rounded-3xl border-4 border-dashed border-purple-500/30 bg-purple-900/10 p-8 relative overflow-hidden group hover:border-purple-500 transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-9xl rotate-12 group-hover:rotate-0 transition-transform duration-500">
                🐧
              </div>
              
              <h3 className="text-2xl font-bold text-purple-400 mb-4 relative z-10">
                Envie de te libérer ?
              </h3>
              <p className="text-zinc-300 mb-8 relative z-10">
                La démarche <strong>NIRD</strong> (Numérique Inclusif, Responsable et Durable) aide les écoles et les citoyens à reprendre le contrôle.
                Passe à Linux, reconditionne ton vieux PC et rejoins la résistance !
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                <a 
                  href="https://nird.forge.apps.education.fr/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full bg-purple-600 text-white font-bold hover:bg-purple-500 hover:scale-105 transition-all shadow-lg shadow-purple-900/20"
                >
                  Découvrir NIRD ↗
                </a>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-8 py-3 rounded-full border-2 border-white/20 hover:bg-white hover:text-black hover:border-white transition-all font-semibold"
                >
                  Refaire le test
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

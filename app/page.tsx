"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
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
        "A poursuivi une politique d'indépendance technologique européenne, critiquant la domination américaine et promouvant une Europe multipolaire, sans actions spécifiques augmentant la dépendance aux géants US ; au contraire, il a visé à réduire la reliance sur les technologies américaines dans la défense et l'économie.",
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

  const openModal = (president: President) => {
    setModalPresident(president);
  };

  const closeModal = () => {
    setModalPresident(null);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <main className="flex w-full flex-col items-center justify-center gap-16 p-8 text-center">
        <h1 className="text-7xl font-bold tracking-tight">JUICE5</h1>

        <div className="flex -space-x-4 pt-8">
          {presidents.map((president, index) => (
            <div
              key={index}
              className="group relative cursor-pointer"
              onClick={() => openModal(president)}
            >
              <div className="relative h-20 w-20 transform rounded-full border-2 border-black transition-transform duration-300 ease-in-out hover:scale-125">
                <Image
                  src={president.src}
                  alt={president.nom}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
            </div>
          ))}
        </div>

        <button className="mt-8 rounded-full bg-white px-8 py-4 text-lg font-semibold text-black transition-transform hover:scale-105">
          démarrer. c'est français
        </button>
      </main>

      {modalPresident && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeModal}
        >
          <div
            className="relative flex w-full max-w-4xl flex-col items-center gap-8 rounded-lg bg-zinc-900 p-8 text-white md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 w-64 flex-shrink-0 rounded-full border-4 border-white">
              <Image
                src={modalPresident.src}
                alt={modalPresident.nom}
                layout="fill"
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <div className="text-left">
              <h3 className="text-3xl font-bold">{modalPresident.nom}</h3>
              <p className="text-md text-zinc-400">{modalPresident.annees}</p>
              <p className="mt-4 text-lg">{modalPresident.description}</p>
              <button
                onClick={closeModal}
                className="mt-6 rounded-full bg-white px-6 py-2 font-semibold text-black"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

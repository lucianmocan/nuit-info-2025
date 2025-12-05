import React from 'react';
import Link from 'next/link';

const PodcastsPage = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-8">
      <Link href="/tutos" className="absolute top-8 left-8 group flex items-center gap-2 rounded-full border-2 border-dashed border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium transition-all hover:rotate-[-5deg] hover:scale-110 hover:border-white hover:bg-white hover:text-black">
        <span className="transition-transform group-hover:-translate-x-2">←</span>
        retour aux tutos
      </Link>
      <main className="flex w-full max-w-3xl flex-col items-center gap-8">
        <h1 className="text-5xl font-bold tracking-tight">Podcasts</h1>
        <div className="w-full rounded-2xl border-4 border-dashed border-white/20 bg-zinc-900 p-8 transition-all hover:border-solid hover:border-white">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl">🎙️</div>
            <div className="flex-grow">
              <h2 className="text-3xl font-bold">Les femmes dans le numérique</h2>
              <p className="mt-2 text-white/80">
                Céleste et Violette discutent sur le rôle des femmes dans l'informatique.
              </p>
              <audio controls className="w-full mt-4">
                <source src="/podcast/femmes_numerique.mp3" type="audio/mpeg" />
                Votre navigateur ne supporte pas l'élément audio.
              </audio>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PodcastsPage;

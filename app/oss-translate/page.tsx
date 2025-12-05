"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Fuse from "fuse.js";

export default function OSSTranslator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<any>(null);
  const [isThinking, setIsThinking] = useState(false);

  // The "Dictionary" - A list of proprietary software and their open source alternatives
  const dictionary = [
    // Browsers & Web
    { proprietary: "Google Chrome", openSource: "Firefox", description: "Le renard qui ne te traque pas." },
    { proprietary: "Chrome", openSource: "Firefox", description: "Le renard qui ne te traque pas." },
    { proprietary: "Microsoft Edge", openSource: "Brave", description: "Bloque les pubs par défaut." },
    { proprietary: "Safari", openSource: "Firefox", description: "Libère-toi de l'écosystème Apple." },
    { proprietary: "Opera", openSource: "Vivaldi / Firefox", description: "Pas 100% libre, mais bien plus respectueux." },
    { proprietary: "Google Search", openSource: "DuckDuckGo / SearXNG", description: "Cherche sans être le produit." },
    { proprietary: "Bing", openSource: "DuckDuckGo", description: "Même Microsoft ne l'utilise pas vraiment." },

    // OS
    { proprietary: "Windows", openSource: "Linux (Ubuntu/Mint)", description: "La liberté, la vraie. Fini les écrans bleus." },
    { proprietary: "macOS", openSource: "Linux (Pop!_OS)", description: "Aussi beau, mais c'est toi le chef." },
    { proprietary: "Android", openSource: "/e/OS / LineageOS", description: "Ton téléphone, sans Google." },
    { proprietary: "iOS", openSource: "GrapheneOS", description: "Sécurité maximale, surveillance minimale." },

    // Office & Productivity
    { proprietary: "Microsoft Office", openSource: "LibreOffice", description: "Tout pareil, mais gratuit et libre." },
    { proprietary: "Word", openSource: "LibreOffice Writer", description: "Écris sans trombone qui t'espionne." },
    { proprietary: "Excel", openSource: "LibreOffice Calc", description: "Tes tableaux croisés dynamiques en toute liberté." },
    { proprietary: "PowerPoint", openSource: "LibreOffice Impress", description: "Des diapos qui claquent, sans licence." },
    { proprietary: "Google Docs", openSource: "CryptPad / OnlyOffice", description: "Collaboration en temps réel, chiffrée." },
    { proprietary: "Google Sheets", openSource: "EtherCalc / OnlyOffice", description: "Tes chiffres t'appartiennent." },
    { proprietary: "Google Slides", openSource: "OnlyOffice", description: "Présente sans Google." },
    { proprietary: "Notion", openSource: "AppFlowy / Anytype", description: "Ta base de connaissances, locale et privée." },
    { proprietary: "Evernote", openSource: "Joplin", description: "Tes notes synchronisées, chiffrées de bout en bout." },
    { proprietary: "Trello", openSource: "Kanboard / Wekan", description: "Gère tes projets sans que Atlassian regarde." },
    { proprietary: "Google Keep", openSource: "Carnet / Joplin", description: "Des post-its numériques qui restent à toi." },
    { proprietary: "Google Calendar", openSource: "Proton Calendar", description: "Ton emploi du temps n'est pas à vendre." },
    { proprietary: "Doodle", openSource: "Framadate", description: "Planifie des réunions sans tracker publicitaire." },

    // Creative
    { proprietary: "Photoshop", openSource: "GIMP", description: "Wilber > Adobe. Apprends les raccourcis, ça vaut le coup." },
    { proprietary: "Adobe Illustrator", openSource: "Inkscape", description: "Vecteurs libres pour esprits libres." },
    { proprietary: "Adobe InDesign", openSource: "Scribus", description: "Mise en page pro, sans abonnement." },
    { proprietary: "Adobe Premiere", openSource: "Kdenlive", description: "Montage pro sans abonnement mensuel." },
    { proprietary: "After Effects", openSource: "Natron", description: "Effets spéciaux nodaux, comme les grands." },
    { proprietary: "Lightroom", openSource: "Darktable", description: "Développe tes RAW comme un pro." },
    { proprietary: "Figma", openSource: "Penpot", description: "Design et prototype, open source et web-based." },
    { proprietary: "Canva", openSource: "Penpot / Inkscape", description: "Fais tes visuels sans template propriétaire." },
    { proprietary: "Sketch", openSource: "Penpot", description: "L'alternative libre pour l'UI/UX." },
    { proprietary: "Blender", openSource: "Blender", description: "Attends... c'est déjà le roi du game." },
    { proprietary: "Maya", openSource: "Blender", description: "Pourquoi payer une fortune ?" },
    { proprietary: "3ds Max", openSource: "Blender", description: "Sérieux, utilise Blender." },
    { proprietary: "Cinema 4D", openSource: "Blender", description: "Toujours Blender." },
    { proprietary: "FL Studio", openSource: "LMMS", description: "Fais du son sans payer la licence." },
    { proprietary: "GarageBand", openSource: "Audacity", description: "Enregistre et édite simplement." },
    { proprietary: "Audition", openSource: "Audacity / Ardour", description: "Mixage audio pro et libre." },

    // Communication
    { proprietary: "WhatsApp", openSource: "Signal", description: "La référence. Snowden l'utilise, toi aussi devrais." },
    { proprietary: "Messenger", openSource: "Signal", description: "Zuck ne lira pas tes messages." },
    { proprietary: "Telegram", openSource: "Signal", description: "Telegram n'est pas chiffré par défaut. Signal si." },
    { proprietary: "Discord", openSource: "Revolt / Element", description: "Comme Discord, mais tu possèdes tes données." },
    { proprietary: "Skype", openSource: "Jitsi Meet", description: "Visio sans compte, sans installation." },
    { proprietary: "Zoom", openSource: "Jitsi Meet / BigBlueButton", description: "Pas de limite de 40 minutes ici." },
    { proprietary: "Microsoft Teams", openSource: "Mattermost / Rocket.Chat", description: "Chat d'équipe auto-hébergé." },
    { proprietary: "Slack", openSource: "Mattermost", description: "Moins de RAM, plus de vie privée." },
    { proprietary: "Gmail", openSource: "Proton Mail / Tutanota", description: "Tes emails chiffrés en Suisse ou en Allemagne." },
    { proprietary: "Outlook", openSource: "Thunderbird", description: "Le client mail increvable." },

    // Social Media
    { proprietary: "Twitter", openSource: "Mastodon", description: "L'oiseau est libre, rejoins le fédiverse." },
    { proprietary: "X", openSource: "Mastodon", description: "Quitte l'enfer d'Elon." },
    { proprietary: "Instagram", openSource: "Pixelfed", description: "Tes photos, sans l'algo qui te rend dépressif." },
    { proprietary: "Facebook", openSource: "Diaspora*", description: "Le réseau social décentralisé." },
    { proprietary: "Reddit", openSource: "Lemmy", description: "Des communautés gérées par la communauté." },
    { proprietary: "YouTube", openSource: "PeerTube / NewPipe", description: "Vidéo décentralisée ou client respectueux." },
    { proprietary: "Twitch", openSource: "Owncast", description: "Streame depuis ton propre serveur." },
    { proprietary: "TikTok", openSource: "Lâche ton tel", description: "Sérieux, va dehors." },
    { proprietary: "Tinder", openSource: "Alovoa", description: "Rencontres open source (oui ça existe)." },

    // Cloud & Utilities
    { proprietary: "Google Drive", openSource: "Nextcloud", description: "Ton cloud, chez toi (ou chez un hébergeur éthique)." },
    { proprietary: "Dropbox", openSource: "Nextcloud", description: "Reprends le contrôle de tes fichiers." },
    { proprietary: "iCloud", openSource: "Nextcloud", description: "Tes photos t'appartiennent." },
    { proprietary: "WeTransfer", openSource: "Lufi / Tresorit Send", description: "Envoi de fichiers chiffré et temporaire." },
    { proprietary: "Google Photos", openSource: "Immich / Photoprism", description: "Tes souvenirs, pas ceux de Google." },
    { proprietary: "Google Maps", openSource: "OpenStreetMap", description: "La carte du monde par les gens, pour les gens." },
    { proprietary: "Waze", openSource: "Organic Maps", description: "Navigation hors-ligne et respectueuse." },
    { proprietary: "Google Earth", openSource: "Marble", description: "Le globe virtuel libre." },
    { proprietary: "Google Translate", openSource: "LibreTranslate", description: "Traduction sans envoyer tes textes à Google." },
    { proprietary: "DeepL", openSource: "LibreTranslate", description: "Moins précis peut-être, mais privé." },
    { proprietary: "1Password", openSource: "Bitwarden / KeePassXC", description: "Tes mots de passe t'appartiennent." },
    { proprietary: "LastPass", openSource: "Bitwarden", description: "Passe à l'open source, c'est plus sûr." },
    { proprietary: "Dashlane", openSource: "Bitwarden", description: "Gratuit, libre, sécurisé." },
    { proprietary: "Google Authenticator", openSource: "Aegis / Raivo", description: "2FA avec backups, enfin." },
    { proprietary: "Authy", openSource: "Aegis", description: "Ne laisse pas tes clés 2FA dans le cloud fermé." },
    { proprietary: "TeamViewer", openSource: "RustDesk", description: "Prise en main à distance, sans licence commerciale abusive." },
    { proprietary: "AnyDesk", openSource: "RustDesk", description: "L'alternative libre qui monte." },
    { proprietary: "WinRAR", openSource: "7-Zip", description: "Pourquoi payer pour dézipper ?" },
    { proprietary: "CCleaner", openSource: "BleachBit", description: "Nettoie ton PC sans bloatware." },
    { proprietary: "Adobe Acrobat", openSource: "Okular / PDF Arranger", description: "Lis et modifie tes PDF librement." },
    { proprietary: "VirtualBox", openSource: "QEMU / KVM", description: "Virtualisation native et performante." },
    { proprietary: "VMware", openSource: "Proxmox", description: "Gère tes VMs comme un pro." },
    { proprietary: "Docker Desktop", openSource: "Podman", description: "Conteneurs sans daemon root." },
    { proprietary: "Postman", openSource: "Hoppscotch", description: "Teste tes API en toute légèreté." },
    { proprietary: "Firebase", openSource: "Supabase / Appwrite", description: "Backend as a Service, mais open source." },
    { proprietary: "Heroku", openSource: "Coolify / Dokku", description: "Héberge tes apps toi-même." },
    { proprietary: "Vercel", openSource: "Coolify", description: "Ton propre PaaS." },
    { proprietary: "GitHub", openSource: "GitLab / Forgejo", description: "Le code, c'est mieux quand c'est vraiment libre." },
    { proprietary: "VS Code", openSource: "VSCodium", description: "VS Code sans la télémétrie Microsoft." },
    { proprietary: "ChatGPT", openSource: "Mistral / Llama (Local)", description: "L'IA qui tourne chez toi, pas chez Sam Altman." },
    { proprietary: "Copilot", openSource: "Continue / Tabby", description: "L'IA de code qui ne fuite pas ton code." },
    { proprietary: "Siri", openSource: "Mycroft", description: "L'assistant vocal qui ne t'écoute pas tout le temps." },
    { proprietary: "Alexa", openSource: "Home Assistant", description: "Domotique privée et locale." },
    { proprietary: "Google Home", openSource: "Home Assistant", description: "Ta maison, tes règles." },
    { proprietary: "Google Analytics", openSource: "Matomo / Plausible", description: "Respecte la vie privée de tes visiteurs." },

    // Entertainment & Education
    { proprietary: "Spotify", openSource: "Spotube", description: "La musique sans pub et sans tracking." },
    { proprietary: "Netflix", openSource: "Jellyfin", description: "Ton propre Netflix avec tes propres films." },
    { proprietary: "Steam", openSource: "Lutris / Heroic", description: "Lance tes jeux (même Epic/GOG) librement." },
    { proprietary: "Minecraft", openSource: "Luanti", description: "Le monde de cubes infini et libre." },
    { proprietary: "Roblox", openSource: "Veloren", description: "RPG voxel multijoueur open source." },
    { proprietary: "Kindle", openSource: "KOReader", description: "Lis tes ebooks sans DRM." },
    { proprietary: "Audible", openSource: "Audiobookshelf", description: "Tes livres audio, ton serveur." },
    { proprietary: "GoodReads", openSource: "BookWyrm", description: "Partage tes lectures sur le fédiverse." },
    { proprietary: "Duolingo", openSource: "LibreLingo", description: "Apprends des langues sans la chouette maléfique." },
    { proprietary: "Strava", openSource: "FitoTrack", description: "Tes données sportives restent sur ton téléphone." },
    { proprietary: "Google Classroom", openSource: "Moodle", description: "L'apprentissage libre." },
    { proprietary: "Kahoot", openSource: "ClassQuiz", description: "Des quiz funs et respectueux des données élèves." },
  ];

  const fuse = new Fuse(dictionary, {
    keys: ["proprietary"],
    threshold: 0.4, // Fuzzy match sensitivity
  });

  useEffect(() => {
    if (input.length > 1) {
      setIsThinking(true);
      const timer = setTimeout(() => {
        const results = fuse.search(input);
        if (results.length > 0) {
          setResult(results[0].item);
        } else {
          setResult(null);
        }
        setIsThinking(false);
      }, 500); // Fake "AI" delay
      return () => clearTimeout(timer);
    } else {
      setResult(null);
      setIsThinking(false);
    }
  }, [input]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-4">
      <Link href="/?view=menu" className="absolute top-8 left-8 group flex items-center gap-2 rounded-full border-2 border-dashed border-white/30 bg-white/5 px-5 py-2.5 text-sm font-medium transition-all hover:rotate-[-5deg] hover:scale-110 hover:border-white hover:bg-white hover:text-black">
        <span className="transition-transform group-hover:-translate-x-2">←</span>
        retour au menu
      </Link>

      <div className="w-full max-w-5xl flex flex-col gap-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-black tracking-tighter uppercase italic">
            <span className="text-white">Freeslator</span>
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-zinc-400 font-mono text-xl">version <span className="text-white font-bold bg-green-600 px-2 py-0.5 rounded-md">BASED</span></p>
            <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-mono text-zinc-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              100+ définitions & expanding
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          {/* Input Side */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4">
              <span className="font-mono text-zinc-400 uppercase tracking-widest text-sm">Langue source</span>
              <span className="font-bold text-red-500 bg-red-500/10 px-3 py-1 rounded-full text-xs border border-red-500/20">PROPRIÉTAIRE (CRINGE)</span>
            </div>
            <div className="relative group">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tape un truc de normie ici... (ex: Gmail, Windows, Photoshop)"
                className="w-full h-64 bg-zinc-900 rounded-3xl border-4 border-dashed border-zinc-700 p-8 text-3xl font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-white focus:bg-zinc-800 transition-all resize-none"
              />
              <div className="absolute bottom-6 right-6 text-zinc-600 text-sm">
                {input.length} chars
              </div>
            </div>
          </div>

          {/* Output Side */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between px-4">
              <span className="font-mono text-zinc-400 uppercase tracking-widest text-sm">Traduction</span>
              <span className="font-bold text-green-500 bg-green-500/10 px-3 py-1 rounded-full text-xs border border-green-500/20">OPEN SOURCE (BASED)</span>
            </div>
            <div className={`relative w-full h-64 bg-zinc-900 rounded-3xl border-4 border-dashed ${result ? 'border-green-500 bg-green-900/10' : 'border-zinc-700'} p-8 flex flex-col justify-center transition-all duration-300`}>

              {isThinking ? (
                <div className="flex flex-col items-center gap-4 text-zinc-500 animate-pulse">
                  <div className="text-4xl">🤔</div>
                  <p className="font-mono">Analyse du niveau de cringe...</p>
                </div>
              ) : result ? (
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex items-center gap-4">
                    <h2 className="text-5xl font-black text-white">{result.openSource}</h2>
                    <span className="text-4xl animate-bounce">✅</span>
                  </div>
                  <p className="text-xl text-zinc-300 font-medium border-l-4 border-green-500 pl-4 italic">
                    "{result.description}"
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-4 text-zinc-600 opacity-50">
                  <div className="text-6xl grayscale">✨</div>
                  <p className="font-mono text-center">En attente de cringe à traduire...</p>
                </div>
              )}

              {/* Decorative Stamp */}
              {result && (
                <div className="absolute -top-6 -right-6 rotate-12 border-4 border-green-500 text-green-500 font-black text-2xl px-4 py-2 bg-black rounded-lg shadow-xl animate-in zoom-in duration-300">
                  100% LIBRE
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-12 flex flex-col items-center gap-6">
          <div className="max-w-2xl rounded-2xl border-2 border-dashed border-purple-500/30 bg-purple-900/5 p-6">
            <p className="text-zinc-300 mb-4">
              <span className="text-purple-400 font-bold">Envie d'aller plus loin ?</span> <br/>
              Découvre comment libérer ton école ou ton entreprise de la dépendance aux GAFAM.
            </p>
            <a
              href="https://nird.forge.apps.education.fr/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2 font-bold text-black transition-all hover:scale-105 hover:bg-purple-500 hover:text-white"
            >
              Découvrir la démarche NIRD ↗
            </a>
          </div>

          <p className="text-zinc-500 text-sm italic">
            Propulsé par <span className="font-bold text-white">Fuse.js</span> (parce que télécharger un modèle de 3GB pour ça c'est pas écolo)
          </p>
        </div>
      </div>
    </div>
  );
}


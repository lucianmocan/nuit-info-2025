"use client";

import { useState } from "react";

export default function OSSTranslator() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const dictionary = {
    "Google Docs": "OnlyOffice",
    "Google Drive": "Nextcloud",
    "iCloud": "Nextcloud",
    "OneDrive": "Nextcloud",
    "Microsoft Office": "LibreOffice, OnlyOffice",
    "Microsoft Teams": "Mattermost",
    "Slack": "Mattermost",
    "Zoom": "Jitsi Meet",
    "Photoshop": "GIMP",
    "Illustrator": "Inkscape",
    "Windows": "Linux",
    "macOS": "Linux"
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const key = input.trim();
    setResult(dictionary[key] || "Aucune alternative trouvée.");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <h1 className="animate-pulse text-7xl font-bold tracking-tight transition-all hover:scale-110 hover:tracking-wider">OSS Translator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nom d'une techno ou service (ex: Slack)"
          className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded-xl"
        />
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded-xl"
        >
          Traduire
        </button>
      </form>
      {result && (
        <div className="mt-4 p-3 bg-gray-800 text-white rounded-xl text-sm">
          <strong>Alternative open source :</strong> {result}
        </div>
      )}
    </main>
  );
}


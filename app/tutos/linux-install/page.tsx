import TutoSkeleton from "../skeleton";

export default function InstallerLinux() {
  return (
    <TutoSkeleton title="Installer Linux" emoji="🐧">
        <p>Installer Linux simplement et rapidement, c'est parti !</p>
        <h1 className="text-2xl font-bold">Étape 1 : Sauvegarder vos données</h1>
        <p>
            Même si l'installation se passe mal, vous ne le regretterez pas !<br/>
            Avant toute chose, donc, copiez tous vos fichiers sur un support de stockage externe de type disque dur USB.
        </p>
        <h1 className="text-2xl font-bold">Étape 2 : Téléchargez Linux</h1>
        <p>
            Linux est distribué sous plusieurs versions, appelées "distributions". La distribution que nous vous recommandons ici est "Linux Mint", car elle est très simple d'utilisation et prête à l'emploi : l'idéal si vous débutez !<br/>
            Pour télécharger Linux Mint, il vous suffit de vous rendre sur <a href="https://linuxmint.com/download.php">le site officiel</a>. Ici, vous avez le choix entre plusieurs variantes proposant des interfaces différentes. La variante la plus populaire et la plus moderne est "Cinnamon", c'est donc celle que nous vous recommandons.<br/>
            Après vous sont présentés plusieurs serveurs hébergeant Linux Mint. Choisissez simplement celui se trouvant le plus proche de votre localisation.
        </p>
        <h1 className="text-2xl font-bold">Étape 3 : Préparez votre clé USB d'installation</h1>
        <p>
            L'installation de Linux n'est pas aussi simple que d'installer un logiciel. Heureusement, elle n'est pas compliquée pour autant !<br/>
            Pour la suite, vous allez avoir besoin d'une clé USB d'au moins 8 Go. Attention : faites bien une sauvegarde des données qu'elle contient, car elles seront supprimées !<br/>
            Nous allons copier Linux Mint sur la clé USB avec un logiciel nommé balenaEtcher. Cela rendra la clé démarrable par votre ordinateur. <a href="https://etcher.balena.io/#download-etcher">Téléchargez</a>, puis lancez balenaEtcher.<br/>
            D'abord, choisissez le fichier que vous venez de télécharger, puis sélectionnez votre clé USB. Enfin, cliquez sur "Flash!". Le fichier va être écrit sur la clé. Quand ce sera terminé, votre clé USB sera prête !
        </p>
        <h1 className="text-2xl font-bold">Étape 4 : Démarrez votre ordinateur sur la clé USB</h1>
        <p>
            Habituellement, votre ordinateur démarre sur le disque dur, car c'est là que se trouve le système d'exploitation. Pour l'installation de Linux, on va plutôt démarrer sur la clé USB. Celle-ci va ensuite installer Linux sur votre ordinateur.<br/>
            Pour ce faire, ouvrez le menu Démarrer, puis, tout en maintenant la touche Maj. enfoncée, cliquez sur le bouton Arrêter, puis sur "Redémarrer". Dans le menu suivant, choisissez "Utiliser un périphérique", puis cliquez sur votre clé USB (probablement nommée "USB" ou "UEFI USB"). Si elle n'apparaît pas, redémarrez puis essayez à nouveau.<br/>
            Votre clé USB va maintenant démarrer. Un autre menu va vous proposer de démarrer Linux Mint, sélectionnez donc "Start Linux Mint".
        </p>
        <h1 className="text-2xl font-bold">Étape 5 : Installer Linux</h1>
        <p>
            Vous voilà sur le bureau de Linux Mint ! Le système n'est pas encore installé, mais vous pouvez déjà l'essayer pour voir s'il vous convient. Attention cependant : toute application que vous installez et tout fichier que vous créez sera supprimé après redémarrage, s'il n'est pas sauvegardé.<br/>
            Pour installer le système, double-cliquez sur l'icône "Install Linux Mint". Il vous sera demandé successivement votre langue, disposition du clavier, connexion à Internet, puis arrivera le moment où vous devrez choisir le type d'installation à effectuer.<br/>
            Vous voulez vous débarrasser de Windows définitivement ? Sélectionnez "Effacer le disque et installer Linux Mint". Vous préférez le garder au cas où vous en auriez encore besoin ? Choisissez plutôt "Installer Linux Mint à côté de Windows". Dans le deuxième cas, l'étape suivante vous permettra de choisir l'espace disque à allouer à chaque système en glissant le séparateur entre les 2 blocs représentant Linux et Windows.<br/>
            Vous avez atteint le point de non-retour. Une fenêtre va s'ouvrir pour confirmer les changements à appliquer. Si tout est bon pour vous, cliquez sur "Continuer".<br/>
            À partir de maintenant, l'installateur va commencer à modifier votre disque dur et y installer Linux. Dans la suite, vous allez pouvoir choisir votre pays, votre nom d'utilisateur et le nom de votre ordinateur.<br/>
            Lorsque l'installation sera terminée, il vous suffira de cliquer sur "Redémarrer maintenant".
        </p>
        <p>
            Et voilà, vous avez réussi à installer Linux sur votre ordinateur !
        </p>
    </TutoSkeleton>
  );
}
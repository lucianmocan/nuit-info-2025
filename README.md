# NDICVE

Un outil en ligne pour facilement rechercher/visualiser des CVEs.

## Installation

```bash
git clone https://github.com/lucianmocan/nuit-info-2025.git
cd nuit-info-2025
git checkout cve
cd ndicve
```

### Using `uv`

```bash
uv sync
uv run reflex run
```

### Manually

```bash
python -m venv venv
source venv/bin/activate
pip install reflex requests
python -m reflex run
```

## Architecture

Le fichier `ndicve/code/cve.py` s'occupe de la logique et de l'utilisation de l'API [cvedb de Shodan](https://cvedb.shodan.io/docs#/).
Le reste est une interface web réalisée grâce à [Reflex](https://reflex.dev), un framework full-stack Python.

## Fonctionnalités

Le site est en deux pages, en plus de disposer d'une barre de recherche.

### Liste des CVEs et graphiques

La page principale liste les CVEs, ainsi que des graphiques représentant le nombre de CVE par produit/vendeur.

### Détails d'une CVE

Cliquer sur une CVE de cette liste permet d'obtenir des détails, comme les versions de logiciel affectées ainsi qu'un descriptif et différentes sources.

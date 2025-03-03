#  Système d'Automatisation Asynchrone

Ce projet automatise la génération et la surveillance de contenu pour un ensemble de fichiers (`index.html`, `style.css`, `scripts.js`, `server.json`). Il utilise une approche asynchrone pour optimiser les performances et la réactivité.

## ️ Fonctionnalités

* **Création de Répertoire :** Initialisation de la structure du projet.
* **Génération de Contenu :** Création et modification automatique de contenu.
* **Enregistrement d'Endpoints :** Gestion dynamique des points de terminaison (si applicable).
* **Surveillance des Modifications :** Détection des changements de fichiers et régénération automatique.

## ⚙️ Prérequis

* Node.js (avec npm ou yarn) ou Make
* `chokidar` (pour la surveillance des fichiers avec Node.js)

##  Installation

1.  Clonez le dépôt :

    ```bash
    git clone <votre-repo>
    cd <votre-projet>
    ```

2.  Installez les dépendances (si vous utilisez Node.js) :

    ```bash
    npm install
    ```

##  Utilisation

### Avec Node.js (npm)

* Initialisation du projet :

    ```bash
    node init.js
    ```

* Démarrage du système de surveillance :

    ```bash
    npm run dev
    ```

* Construction unique de tous les fichiers :

    ```bash
    npm run build:all
    ```

### Avec Make

* Initialisation du projet :

    ```bash
    ./init.sh
    ```

* Démarrage du système de surveillance :

    ```bash
    make watch
    ```

* Construction unique de tous les fichiers :

    ```bash
    make
    ```

### Avec build.sh

* Initialisation du projet :

    ```bash
    ./init.sh
    ```

* Démarrage du système de surveillance :

    ```bash
    ./build.sh watch
    ```

* Construction unique de tous les fichiers :

    ```bash
    ./build.sh build
    ```

##  Documentation de l'Algorithme

1.  **Création du Répertoire :**

    * Un script (`init.sh` ou `init.js`) crée la structure de base du projet, y compris les répertoires et les fichiers initiaux.

2.  **Génération de Contenu :**

    * Des fonctions Node.js manipulent les fichiers pour ajouter ou modifier du contenu.
    * Par exemple, une fonction peut ajouter un élément `<h1>` à `index.html`.

3.  **Enregistrement d'Endpoints :**

    * Si le projet inclut un serveur, les points de terminaison sont enregistrés dynamiquement.
    * Le fichier `server.json` stocke la configuration des endpoints.

4.  **Surveillance des Modifications :**

    * `chokidar` (Node.js) ou `make watch` surveille les fichiers.
    * Lorsqu'une modification est détectée, les fonctions de génération de contenu sont exécutées.

##  Contribution

Les contributions sont les bienvenues ! Veuillez ouvrir une issue ou une pull request pour toute amélioration.

##  Licence

Ce projet est sous licence MIT.
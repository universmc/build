#!/bin/bash

# Nom du projet par défaut
project_name="Allocation_Universelle"

# Vérifier si un nom de projet est passé en argument
if [ "$#" -eq 1 ]; then
  project_name="$1"
fi

# Créer les répertoires
mkdir -p .setup build

# Créer les fichiers
touch index.html styles.css scripts.js content.svg server.json

# Initialiser un projet npm
git clone https://github.com/universmc/package
node run.js
# Créer un fichier .gitignore
cat > .gitignore << EOF
node_modules
build
.vscode
EOF

echo "Projet $project_name créé avec succès !"
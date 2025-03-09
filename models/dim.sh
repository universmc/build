#!/bin/bash

# Vérifier que les arguments m et n sont fournis
if [ "$#" -ne 2 ]; then
  echo "Usage: $0 <nombre_lignes> <nombre_colonnes>"
  exit 1
fi

m=$1
n=$2

# Vérifier que m et n sont des entiers positifs
if ! [[ "$m" =~ ^[0-9]+$ ]] || ! [[ "$n" =~ ^[0-9]+$ ]]; then
  echo "Les dimensions doivent être des entiers positifs."
  exit 1
fi

# Générer la matrice
for ((i=0; i<m; i++)); do
  ligne=""
  for ((j=0; j<n; j++)); do
    # Générer un nombre aléatoire entre 1 et 100
    valeur=$((RANDOM % 100 + 1))
    if [ -z "$ligne" ]; then
      ligne="$valeur"
    else
      ligne="$ligne $valeur"
    fi
  done
  echo "$ligne"
done
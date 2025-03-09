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

# Générer la matrice avec des valeurs séquentielles
valeur=1
for ((i=0; i<m; i++)); do
  ligne=""
  for ((j=0; j<n; j++)); do
    if [ -z "$ligne" ]; then
      ligne="$valeur"
    else
      ligne="$ligne $valeur"
    fi
    valeur=$((valeur + 1))
  done
  echo "$ligne"
done
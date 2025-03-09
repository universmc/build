#!/bin/bash
# Ce script prend une matrice au format '[1,2],[3,4],[5,6]'
# et affiche sa transposée dans le même format.

if [ "$#" -ne 1 ]; then
    echo "Usage: $0 \"[a,b],[c,d],...\""
    exit 1
fi

input="$1"

# Étape 1. Remplacer "],[", par un saut de ligne pour que chaque ligne devienne une ligne.
# Supprimer également le crochet ouvrant de début et le crochet fermant de fin.
rows=$(echo "$input" | sed 's/\],\[/\n/g; s/^\[//; s/\]$//')

# Lire les lignes dans un tableau
matrix_rows=()
while IFS= read -r line; do
    matrix_rows+=("$line")
done <<< "$rows"

# Déterminer le nombre de lignes.
nrows=${#matrix_rows[@]}

# Obtenir le nombre de colonnes en divisant la première ligne par des virgules.
IFS=',' read -ra first_row <<< "${matrix_rows[0]}"
ncols=${#first_row[@]}

# Nous utiliserons un tableau associatif pour simuler un tableau 2D où la clé est "r,c".
declare -A matrix2D

# Analyser la matrice dans le tableau associatif.
for ((i=0; i<nrows; i++)); do
    IFS=',' read -ra rowElements <<< "${matrix_rows[i]}"
    for ((j=0; j<ncols; j++)); do
        matrix2D["$i,$j"]="${rowElements[j]}"
    done
done

# Calculer la transposée.
# Dans la transposée, il y aura ncols lignes et nrows colonnes.
transpose=""

for ((j=0; j<ncols; j++)); do
    row_str=""
    for ((i=0; i<nrows; i++)); do
        if [ $i -gt 0 ]; then
            row_str+=","
        fi
        row_str+="${matrix2D["$i,$j"]}"
    done
    # Encapsuler la ligne dans des crochets. Si ce n'est pas la première ligne transposée, ajouter une virgule avant.
    if [ -z "$transpose" ]; then
        transpose="[$row_str]"
    else
        transpose+=",[$row_str]"
    fi
done

# Afficher la matrice transposée dans le même format.
echo "$transpose"
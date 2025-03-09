const fonctionsCognitives = require('./cognitive_functions');

// Utilisation de la fonction orientation
const date = new Date();
const lieu = "univers";

console.log(fonctionsCognitives.orientation(date, lieu));
// Utilisation de la fonction attention
console.log(fonctionsCognitives.attention("espace & temps"));

// Utilisation de la fonction langage
console.log(fonctionsCognitives.langage("prompt --engine --help"));
// Utilisation de la fonction mémoire
fonctionsCognitives.memoire.encoder("deepSeek", "cognito");
console.log(fonctionsCognitives.memoire.recuperer("deepSeek"));
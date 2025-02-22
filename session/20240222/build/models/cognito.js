const fonctionsCognitives = require('./cognitive_functions');

// Utilisation de la fonction attention
console.log(fonctionsCognitives.attention("un objet brillant"));

// Utilisation de la fonction orientation
const date = new Date();
const lieu = "Paris";
console.log(fonctionsCognitives.orientation(date, lieu));

// Utilisation de la fonction mémoire
fonctionsCognitives.memoire.encoder("nom", "John Doe");
console.log(fonctionsCognitives.memoire.recuperer("nom"));

// Utilisation de la fonction langage
console.log(fonctionsCognitives.langage("Bonjour le monde !"));
const monModule = require('./tensorflow');

// Utilisez les fonctions et classes exportées
const resultat = monModule.multiplier(tf.tensor([1, 2, 3]), 2);
console.log(resultat.arraySync()); // Affiche [2, 4, 6]

const predicteur = new monModule.Predicteur(monModeleTensorFlowJs);
const prediction = predicteur.predire(monEntree);
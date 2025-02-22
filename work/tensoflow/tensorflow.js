// Importez TensorFlow.js
const tf = require('@tensorflow/tfjs');

// Fonction d'exemple : Multiplier un tenseur par un scalaire
function multiplier(tenseur, scalaire) {
  return tenseur.mul(scalaire);
}

// Classe d'exemple : Prédiction avec un modèle simple
class Predicteur {
  constructor(model) {
    this.model = model;
  }

  predire(input) {
    return this.model.predict(input);
  }
}

// Exportez les éléments que vous souhaitez rendre accessibles
module.exports = {
  multiplier,
  Predicteur
};
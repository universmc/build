// cognitive_functions.js

/**
 * Fonctions cognitives de base.
 */
const cognitiveFunctions = {
    /**
     * Attention : Capacité à se concentrer sur un stimulus spécifique.
     * @param {any} stimulus Le stimulus sur lequel se concentrer.
     * @returns {string} Un message indiquant que l'attention est focalisée.
     */
    attention: (stimulus) => {
      return `Attention focalisée sur : ${stimulus}`;
    },
  
    /**
     * Orientation : Capacité à se situer dans le temps et l'espace.
     * @param {Date} date La date actuelle.
     * @param {string} lieu Le lieu actuel.
     * @returns {string} Un message indiquant l'orientation.
     */
    orientation: (date, lieu) => {
      return `Nous sommes le ${date.toLocaleDateString()} dans l'${lieu}.`;
    },
  
    /**
     * Mémoire : Capacité à encoder, stocker et récupérer des informations.
     * (Implémentation simplifiée, la mémoire réelle est plus complexe)
     */
    memoire: {
      stockage: {}, // Objet pour stocker les informations
  
      /**
       * Encoder une information.
       * @param {string} cle La clé pour identifier l'information.
       * @param {any} valeur L'information à stocker.
       */
      encoder: (cle, valeur) => {
        cognitiveFunctions.memoire.stockage[cle] = valeur;
      },
  
      /**
       * Récupérer une information.
       * @param {string} cle La clé de l'information à récupérer.
       * @returns {any} L'information récupérée ou undefined si elle n'existe pas.
       */
      recuperer: (cle) => {
        return cognitiveFunctions.memoire.stockage[cle];
      },
    },
  
    /**
     * Langage : Capacité à comprendre et s'exprimer.
     * @param {string} message Le message à traiter.
     * @param {boolean} comprendre Si le message doit être compris ou exprimé.
     * @returns {string} Le message traité.
     */
    langage: (message, comprendre = true) => {
      if (comprendre) {
        return `Compréhension du message : ${message}`;
      } else {
        return `Expression du message : ${message}`;
      }
    },
  };
  
  module.exports = cognitiveFunctions;
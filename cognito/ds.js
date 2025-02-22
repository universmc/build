
// script.js
require('dotenv').config(); // Charge les variables d'environnement depuis .env
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const models = require('./models.json');
const modelesIA = {};

function initialiserModeles() {
  models.forEach(model => {
    modelesIA[model.name] = {
      instance: groq,
      info: model
    };
  });
  console.log("Modèles chargés et initialisés:", modelesIA);
}

async function utiliserModele(nomModele, contexte, options = {}) {
  const modele = modelesIA[nomModele];
  if (!modele) {
    throw new Error(`Le modèle ${nomModele} n'existe pas.`);
  }

  const { temperature, max_tokens, top_p, stream, stop } = {
    ...modele.info,
    ...options,
  };

  try {
    const chatCompletion = await modele.instance.chat.completions.create({
      messages: [{ role: "user", content: contexte }],
      model: modele.info.model,
      temperature,
      max_tokens,
      top_p,
      stop,
      stream,
    });

    if (!chatCompletion || !chatCompletion.choices || chatCompletion.choices.length === 0 || !chatCompletion.choices[0].message || !chatCompletion.choices[0].message.content) {
      console.error("Réponse de l'API invalide:", chatCompletion);
      throw new Error("Réponse de l'API Groq invalide ou vide.");
    }

    return chatCompletion.choices[0].message.content;

  } catch (erreur) {
    console.error(`Erreur lors de l'appel à l'API Groq:`, erreur);
    throw erreur;
  }
}

async function exempleUtilisation() {
  initialiserModeles();

  try {
    const resultat = await utiliserModele(
      "deepSeek", // Assurez-vous que ce nom correspond à un modèle dans models.json
      "Convertis ce contexte au format HTML: test: la véritable réussite de la préservation de la vie humaine",
      { temperature: 0.8, max_tokens: 2048 }
    );
    console.log("Résultat:", resultat);
  } catch (erreur) {
    console.error("Erreur dans exempleUtilisation:", erreur);
  }
}

exempleUtilisation();

module.exports = { initialiserModeles, utiliserModele };
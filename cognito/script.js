const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY }); // Important : Clé API Groq

const models = require('./models.json'); // Chargement du JSON avec require
const modelesIA = {};

function initialiserModeles() { // Plus besoin de paramètre car on utilise 'models'
  models.forEach(model => {
    modelesIA[model.name] = {
      instance: groq, // Utilisez l'instance groq déjà créée
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
    const chatCompletion = await modele.instance.chat.completions.create({ // Pas besoin de modele.info.model ici
      messages: [{ role: "user", content: contexte }],
      model: modele.info.model, // Utilisez modele.info.model pour le nom du modèle
      temperature,
      max_tokens,
      top_p,
      stop,
      stream,
    });
    return chatCompletion.choices[0]?.message?.content;
  } catch (erreur) {
    console.error(`Erreur lors de l'appel à l'API Groq:`, erreur);
    throw erreur;
  }
}

async function exempleUtilisation() {
  initialiserModeles(); // Initialisation des modèles

  try {
    const resultat = await utiliserModele(
      "Mistral", // Assurez-vous que "Mistral" est dans models.json
      "Convertis ce contexte au format HTML: test: la véritable réussite de la préservation de la vie humaine",
      { temperature: 0.8, max_tokens: 2048 }
    );
    console.log("Résultat:", resultat);
  } catch (erreur) {
    console.error("Erreur lors de l'utilisation du modèle:", erreur);
  }
}

exempleUtilisation();

module.exports = { initialiserModeles, utiliserModele };
const fs = require('fs');
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const models = require('./models.json'); // Chemin relatif correct

const modelesIA = {}; // Objet pour stocker les instances de Groq et les infos des modèles

function initialiserModeles(models) {
  models.forEach(model => {
    modelesIA[model.name] = {
      instance: new Groq(),
      info: model
    };
  });
}
async function utiliserModele(nomModele, contexte, options = {}) {
  const modele = modelesIA[nomModele];
  if (!modele) {
    throw new Error(`Le modèle ${nomModele} n'existe pas.`);
  }

  const { temperature, max_tokens, top_p, stream, stop } = { ...modele.info, ...options };

  try {
    const chatCompletion = await modele.instance.chat.completions.create({
      messages: [
        { role: "user", content: contexte }
      ],
      model: modele.info.model,
      temperature,
      max_tokens,
      top_p,
      stop,
      stream
    });
    return chatCompletion.choices[0]?.message?.content;
  } catch (error) {
    console.error(`Erreur lors de l'appel à l'API Groq:`, error);
    throw error;
  }
}

// 'models' est déjà un objet JavaScript, pas besoin de JSON.parse
console.log(models);
initialiserModeles(models);
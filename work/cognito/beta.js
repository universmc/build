// script.js
require('dotenv').config();
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
      stream, // Utiliser la valeur de 'stream' du fichier models.json
    });

    if (stream) { // Gérer le streaming si 'stream' est true
      if (chatCompletion.body) {
        let fullContent = ""; // Accumuler le contenu reçu par chunks
        for await (const chunk of chatCompletion.body) {
          const decodedChunk = new TextDecoder().decode(chunk);
          try {
            const jsonChunk = JSON.parse(decodedChunk);
            if (jsonChunk.choices && jsonChunk.choices[0] && jsonChunk.choices[0].delta && jsonChunk.choices[0].delta.content) {
              const content = jsonChunk.choices[0].delta.content;
              fullContent += content; // Ajouter le chunk au contenu total
              console.log("Chunk:", content); // Afficher chaque chunk individuellement (optionnel)
              // Ici, vous pouvez mettre à jour l'affichage en temps réel si nécessaire
            }
          } catch (error) {
            console.error("Erreur lors du parsing JSON:", error, decodedChunk);
          }
        }
        return fullContent; // Retourner le contenu complet à la fin du stream
      } else {
        console.error("Réponse de l'API invalide: Pas de corps de réponse.");
        throw new Error("Réponse de l'API Groq invalide ou vide.");
      }
    } else { // Gérer la réponse non-streamée
      if (!chatCompletion || !chatCompletion.choices || chatCompletion.choices.length === 0 || !chatCompletion.choices[0].message || !chatCompletion.choices[0].message.content) {
        console.error("Réponse de l'API invalide:", chatCompletion);
        throw new Error("Réponse de l'API Groq invalide ou vide.");
      }
      return chatCompletion.choices[0].message.content;
    }

  } catch (erreur) {
    console.error(`Erreur lors de l'appel à l'API Groq:`, erreur);
    throw erreur;
  }
}


async function exempleUtilisation() {
  initialiserModeles();

  try {
    const resultat = await utiliserModele(
      "Mistral",
      "Convertis ce contexte au format HTML: test: la véritable réussite de la préservation de la vie humaine",
      { temperature: 0.8, max_tokens: 2048 } // Les options peuvent être surchargées ici
    );
    console.log("Résultat complet:", resultat); // Afficher le résultat final
  } catch (erreur) {
    console.error("Erreur dans exempleUtilisation:", erreur);
  }
}

exempleUtilisation();

module.exports = { initialiserModeles, utiliserModele };
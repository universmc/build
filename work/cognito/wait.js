// script.js
require('dotenv').config();
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const fs = require('fs');
const path = require('path');

const models = require('./models.json');
const outputDir = path.join(__dirname, 'output');

fs.mkdirSync(outputDir, { recursive: true });

/**
 * Fonction pour interagir avec un modèle de langage et obtenir une complétion de texte.
 * @param {string} modelName Le nom du modèle à utiliser.
 * @param {string} prompt Le texte d'entrée (prompt) pour le modèle.
 * @param {object} options Options pour la requête (e.g., temperature, max_tokens, format).
 * @returns {Promise<string>} Une promesse qui se résout avec le texte de la complétion.
 * @throws {Error} Si le modèle n'existe pas ou si la réponse de l'API est invalide.
 */
async function completeText(modelName, prompt, options = {}) {
  const model = models.find(m => m.name === modelName);
  if (!model) {
    throw new Error(`Le modèle ${modelName} n'existe pas.`);
  }

  const { temperature, max_tokens, top_p, stream, stop } = {
    ...model,
    ...options
  };

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model.model,
      temperature,
      max_tokens,
      top_p,
      stop,
      stream,
    });

    let fullContent = "";

    if (stream) {
      if (chatCompletion.body) {
        for await (const chunk of chatCompletion.body) {
          const decodedChunk = new TextDecoder().decode(chunk);
          try {
            const jsonChunk = JSON.parse(decodedChunk);
            if (jsonChunk.choices && jsonChunk.choices[0] && jsonChunk.choices[0].delta && jsonChunk.choices[0].delta.content) {
              fullContent += jsonChunk.choices[0].delta.content;
              console.log("Chunk:", jsonChunk.choices[0].delta.content);
            }
          } catch (error) {
            console.error("Erreur parsing JSON:", error, decodedChunk);
          }
        }
      } else {
        throw new Error("Réponse API invalide: Pas de corps de réponse.");
      }
    } else {
      if (!chatCompletion || !chatCompletion.choices || chatCompletion.choices.length === 0 || !chatCompletion.choices[0].message || !chatCompletion.choices[0].message.content) {
        throw new Error("Réponse API invalide: Structure invalide.");
      }
      fullContent = chatCompletion.choices[0].message.content;
    }

    // Gestion du format de sortie
    let fileContent = fullContent;
    const format = options.format || 'txt';

    switch (format) {
      case 'md':
        fileContent = `# Réponse du modèle ${modelName}\n\n${fullContent}`;
        break;
      case 'html':
        fileContent = `<!DOCTYPE html><html><head><title>Réponse du modèle ${modelName}</title></head><body><h1>Réponse du modèle ${modelName}</h1><pre>${fullContent}</pre></body></html>`;
        break;
      default:
        break;
    }

    // Enregistrement dans un fichier
    const timestamp = Date.now();
    const filename = `${modelName}_${timestamp}.${format}`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, fileContent);
    console.log(`Réponse enregistrée dans: ${filepath}`);

    return fullContent;

  } catch (error) {
    console.error("Erreur API Groq:", error);
    throw error;
  }
}

/**
 * Fonction exemple pour tester l'interaction avec l'API Groq.
 */
async function testCompletion() {
  try {
    const result = await completeText("Mixtral", "Écris un poème sur l'hiver.", { temperature: 0.7, format: 'md' });
    console.log("Résultat:\n", result);

    const resultHtml = await completeText("Mixtral", "Écris un poème sur l'hiver.", { temperature: 0.7, format: 'html' });
    console.log("Résultat HTML:\n", resultHtml);
  } catch (error) {
    console.error("Erreur testCompletion:", error);
  }
}

testCompletion();
require('dotenv').config();
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const fs = require('fs');
const path = require('path');

const models = require('./models.json');
const outputDir = path.join(__dirname, 'output');

fs.mkdirSync(outputDir, { recursive: true });

async function generateHTML(modelName, prompt, options = {}) {
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

    let htmlContent = "";

    if (stream) {
      if (chatCompletion.body) {
        for await (const chunk of chatCompletion.body) {
          const decodedChunk = new TextDecoder().decode(chunk);
          try {
            const jsonChunk = JSON.parse(decodedChunk);
            if (jsonChunk.choices && jsonChunk.choices[0] && jsonChunk.choices[0].delta && jsonChunk.choices[0].delta.content) {
              htmlContent += jsonChunk.choices[0].delta.content;
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
      htmlContent = chatCompletion.choices[0].message.content;
    }


    // Structure HTML de base avec doctype et balises sémantiques
    const fullHTML = `<!DOCTYPE html>
<html lang="fr">  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Réponse du modèle ${modelName}</title>
  <meta name="description" content="Contenu généré par le modèle ${modelName}"> <meta name="keywords" content="IA, modèle de langage, ${modelName}"> <link rel="canonical" href=""> </head>
<body>
  <header>
    <h1>Réponse du modèle ${modelName}</h1>
  </header>
  <main>
    <article>
      ${htmlContent} </article>
  </main>
  <footer>
    <p>Contenu généré par l'IA</p>
  </footer>
</body>
</html>`;


    const timestamp = Date.now();
    const filename = `${modelName}_${timestamp}.html`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, fullHTML);
    console.log(`Réponse enregistrée dans: ${filepath}`);

    return fullHTML; // Retourne le HTML complet

  } catch (error) {
    console.error("Erreur API Groq:", error);
    throw error;
  }
}

async function testHTMLGeneration() {
  try {
    const html = await generateHTML("Mixtral", "Crée une liste de 3 idées de projets innovants en utilisant le web sémantique", { temperature: 0.7 });
    console.log("HTML généré:\n", html);
  } catch (error) {
    console.error("Erreur testHTMLGeneration:", error);
  }
}

testHTMLGeneration();
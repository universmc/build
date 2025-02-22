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

  const { temperature, max_tokens, top_p, stream, stop } = { ...model, ...options };

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

    let content = "";
    if (stream) { // Gestion du streaming
      if (chatCompletion.body) {
        for await (const chunk of chatCompletion.body) {
          const decodedChunk = new TextDecoder().decode(chunk);
          try {
            const jsonChunk = JSON.parse(decodedChunk);
            if (jsonChunk.choices && jsonChunk.choices[0] && jsonChunk.choices[0].delta && jsonChunk.choices[0].delta.content) {
              content += jsonChunk.choices[0].delta.content;
              console.log("Chunk:", jsonChunk.choices[0].delta.content);
            }
          } catch (error) {
            console.error("Erreur parsing JSON:", error, decodedChunk);
          }
        }
      } else {
        throw new Error("Réponse API invalide: Pas de corps de réponse.");
      }
    } else { // Gestion de la réponse non-streamée
      if (!chatCompletion || !chatCompletion.choices || chatCompletion.choices.length === 0 || !chatCompletion.choices[0].message || !chatCompletion.choices[0].message.content) {
        throw new Error("Réponse API invalide: Structure invalide.");
      }
      content = chatCompletion.choices[0].message.content;
    }

    // Génération du HTML avec CDN
    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Génération de contenu avec ${modelName}</title>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  </head>
<body>
  <div class="container">
    <h1>Contenu généré avec ${modelName}</h1>
    <div id="content">${content}</div> 
  </div>

  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

  <script>
    // Ajoutez votre code JavaScript ici pour manipuler le contenu, utiliser les CDN, etc.
    // Exemple:
    // const contentDiv = document.getElementById('content');
    // contentDiv.innerHTML = \`${content}\`; // Injection du contenu (déjà fait plus haut)
    // ...
  </script>
</body>
</html>`;

    const timestamp = Date.now();
    const filename = `${modelName}_${timestamp}.html`;
    const filepath = path.join(outputDir, filename);

    fs.writeFileSync(filepath, htmlContent);
    console.log(`Fichier HTML généré: ${filepath}`);

    return htmlContent; // Retourne le HTML généré

  } catch (error) {
    console.error("Erreur API Groq:", error);
    throw error;
  }
}

async function testHTMLGeneration() {
  try {
    const html = await generateHTML("Mixtral", "Crée un tableau en HTML avec des données fictives.");
    console.log("HTML généré:\n", html);
  } catch (error) {
    console.error("Erreur testHTMLGeneration:", error);
  }
}

testHTMLGeneration();
const { pipeline } = require('@xenova/transformers');
const fs = require('fs').promises; // Pour gérer les fichiers de manière asynchrone
const path = require('path');

// Chemin vers votre fichier db_prompt.json
const dbPath = path.join(__dirname, 'db_prompt.json');

// Fonction pour charger le fichier JSON
async function loadPromptDatabase() {
    try {
        const data = await fs.readFile(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Erreur lors du chargement de db_prompt.json :', error);
        return [];
    }
}

// Fonction pour sauvegarder le fichier JSON
async function savePromptDatabase(data, outputPath = 'db_prompt_updated.json') {
    try {
        await fs.writeFile(outputPath, JSON.stringify(data, null, 4), 'utf8');
        console.log(`Données sauvegardées dans ${outputPath}`);
    } catch (error) {
        console.error('Erreur lors de la sauvegarde :', error);
    }
}

// Fonction principale pour manipuler les prompts avec Transformers.js
async function processPrompts() {
    // Charger la base de données JSON
    const prompts = await loadPromptDatabase();
    
    // Exemple : Charger un pipeline de Transformers.js pour analyser les prompts
    // (Ici, on simule une tâche comme l'analyse de sentiment, mais vous pourriez adapter pour d'autres usages)
    const classifier = await pipeline('sentiment-analysis', 'distilbert-base-uncased-finetuned-sst-2-english');

    // Traiter chaque prompt
    const updatedPrompts = await Promise.all(prompts.map(async (entry) => {
        // Exemple : Analyser le sentiment du prompt
        const sentiment = await classifier(entry.prompt);
        return {
            ...entry,
            analysis: {
                sentiment: sentiment[0].label,
                score: sentiment[0].score
            }
        };
    }));

    // Sauvegarder les données mises à jour
    await savePromptDatabase(updatedPrompts);
    console.log('Prompts traités avec succès :', updatedPrompts);
}

// Exécuter le script
processPrompts().catch(console.error);
import { pipeline } from 'https://cdn.jsdelivr.net/npm/@huggingface/transformers@latest/dist/transformers.min.js';

document.getElementById('process-button').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value;
    const resultDiv = document.getElementById('result');

    resultDiv.textContent = "Chargement..."; // Indiquer le chargement

    try {
        const classifier = await pipeline('sentiment-analysis');
        const result = await classifier(textInput);
        resultDiv.textContent = JSON.stringify(result, null, 2); // Afficher le résultat
    } catch (error) {
        console.error("Erreur :", error);
        resultDiv.textContent = "Erreur lors de l'analyse.";
    }
});
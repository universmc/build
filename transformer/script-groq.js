import { Groq } from 'groq-sdk';
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

document.getElementById('process-button').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value;
    const resultDiv = document.getElementById('result');

    resultDiv.textContent = "Chargement...";

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: textInput }],
            model: "gemma2-9b-it", // Ou un autre modèle Groq
            temperature: 0.6,
            max_tokens: 2048,
            top_p: 1,
            stop: null,
            stream: false
        });

        const responseContent = chatCompletion.choices[0]?.message?.content;
        resultDiv.textContent = responseContent;

    } catch (error) {
        console.error("Erreur :", error);
        resultDiv.textContent = "Erreur lors de la requête à Groq.";
    }
});
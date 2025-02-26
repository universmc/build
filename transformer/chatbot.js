const { Groq } = require('groq-sdk');
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function sendMessage(message) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gemma2-9b-it", // Ou un autre modèle Groq
            temperature: 0.7, // Ajustez la "créativité" du bot
            max_tokens: 150, // Limitez la longueur des réponses
        });

        return chatCompletion.choices[0]?.message?.content;
    } catch (error) {
        console.error("Erreur lors de la requête à Groq:", error);
        return "Une erreur s'est produite. Veuillez réessayer.";
    }
}

// Fonction pour ajouter un message à l'interface
function addMessage(message, sender) {
    const chatbox = document.getElementById('chatbox');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.textContent = message;
    chatbox.appendChild(messageDiv);

    // Faire défiler vers le bas pour voir les nouveaux messages
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Gestion de l'envoi du message
document.getElementById('message-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    addMessage(message, 'user'); // Ajouter le message de l'utilisateur

    messageInput.value = ''; // Effacer le champ de saisie

    const response = await sendMessage(message); // Envoyer le message à Groq
    addMessage(response, 'bot'); // Ajouter la réponse du bot
});
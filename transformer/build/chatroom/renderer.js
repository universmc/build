document.getElementById('send-button').addEventListener('click', async () => {
    const message = document.getElementById('text-input').value;
    const responseDiv = document.getElementById('response');

    responseDiv.textContent = "Chargement...";

    try {
        const response = await window.electronAPI.groqRequest(message);
        responseDiv.textContent = response;
    } catch (error) {
        console.error("Erreur dans renderer.js:", error);
        responseDiv.textContent = "Erreur lors de la requête.";
    }
});
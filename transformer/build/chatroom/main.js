require('dotenv').config();
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs'); // Importez le module fs

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
        },
    });

    win.loadFile('index.html');
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
// Chemin vers le fichier historique.json
const historyFilePath = path.join(__dirname, 'historique.json');

// Fonction pour charger l'historique depuis le fichier
function loadHistory() {
    try {
        const data = fs.readFileSync(historyFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        // Si le fichier n'existe pas ou s'il y a une erreur, on retourne un tableau vide
        return [];
    }
}

// Fonction pour enregistrer l'historique dans le fichier
function saveHistory(history) {
    fs.writeFileSync(historyFilePath, JSON.stringify(history, null, 2));
}
// Gestion des messages asynchrones du processus de rendu
ipcMain.handle('groq-request', async (event, message) => {
    try {
        // Charger l'historique
        let history = loadHistory();

        const { Groq } = require('groq-sdk');
        const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: message }],
            model: "gemma2-9b-it",
            temperature: 0.7,
            max_tokens: 150,
        });

        const response = chatCompletion.choices[0].message.content;

        // Ajouter le message et la réponse à l'historique
        history.push({ user: message, bot: response });

        // Enregistrer l'historique
        saveHistory(history);

        return response;
    } catch (error) {
        console.error("Erreur dans ipcMain:", error);
        return "Erreur lors de la requête à Groq.";
    }
});
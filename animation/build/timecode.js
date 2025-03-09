// timeline.js

// Récupération des éléments canvas et des contextes 2D
const canvas = document.getElementById('timelineCanvas'); // Canvas pour la timeline
const ctx = canvas.getContext('2d'); // Contexte 2D de la timeline
const timeDisplayCanvas = document.getElementById('timeDisplayCanvas'); // Canvas pour l'affichage du temps
const timeDisplayCtx = timeDisplayCanvas.getContext('2d'); // Contexte 2D de l'affichage du temps

// Récupération des boutons de contrôle
const startButton = document.getElementById('startButton'); // Bouton de démarrage
const stopButton = document.getElementById('stopButton'); // Bouton d'arrêt

// Variables pour les données de la timeline et l'état de l'animation
let timelineData = []; // Tableau pour stocker les événements de la timeline
let currentTime = 0; // Temps actuel de l'animation (en millisecondes)
let animationDuration = 10000; // Durée totale de l'animation (10 secondes)
let startTime; // Timestamp du début de l'animation
let animationRunning = false; // Indique si l'animation est en cours

/**
 * Initialise les données de la timeline.
 * @param {Array} data Tableau d'objets représentant les événements de la timeline.
 */
function initializeTimeline(data) {
    timelineData = data;
}

/**
 * Dessine la timeline et met à jour l'affichage du temps.
 * @param {number} timestamp Timestamp actuel (fourni par requestAnimationFrame).
 */
function drawTimeline(timestamp) {
    // Initialisation du temps de démarrage
    if (!startTime) {
        startTime = timestamp;
    }

    // Calcul du temps écoulé et limitation à la durée totale
    const elapsed = timestamp - startTime;
    currentTime = Math.min(elapsed, animationDuration);

    // Effacement des canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timeDisplayCtx.clearRect(0, 0, timeDisplayCanvas.width, timeDisplayCanvas.height);

    // Dessin de la ligne de base de la timeline
    ctx.beginPath();
    ctx.moveTo(50, canvas.height / 2);
    ctx.lineTo(canvas.width - 50, canvas.height / 2);
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // Dessin des événements de la timeline
    timelineData.forEach(event => {
        const eventPosition = mapTime(event.time, 0, animationDuration, 50, canvas.width - 50);
        ctx.beginPath();
        ctx.arc(eventPosition, canvas.height / 2, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#007bff';
        ctx.fill();
        ctx.stroke();
    });

    // Dessin du curseur de temps actuel
    const currentPosition = mapTime(currentTime, 0, animationDuration, 50, canvas.width - 50);
    ctx.beginPath();
    ctx.moveTo(currentPosition, 0);
    ctx.lineTo(currentPosition, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    // Affichage du temps écoulé
    displayTime(currentTime / 1000); // Conversion en secondes

    // Boucle d'animation (si l'animation est en cours et pas terminée)
    if (currentTime < animationDuration && animationRunning) {
        requestAnimationFrame(drawTimeline);
    } else {
        animationRunning = false; // Arrêt de l'animation
    }
}

/**
 * Convertit une valeur d'une plage à une autre.
 * @param {number} value Valeur à convertir.
 * @param {number} start1 Début de la plage d'entrée.
 * @param {number} stop1 Fin de la plage d'entrée.
 * @param {number} start2 Début de la plage de sortie.
 * @param {number} stop2 Fin de la plage de sortie.
 * @returns {number} Valeur convertie.
 */
function mapTime(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

/**
 * Affiche le temps écoulé dans le canvas dédié.
 * @param {number} seconds Temps écoulé en secondes.
 */
function displayTime(seconds) {
    timeDisplayCtx.font = '20px Arial';
    timeDisplayCtx.fillStyle = '#333';
    timeDisplayCtx.fillText(`Temps: ${seconds.toFixed(2)}s`, 10, 30);
}

// Données de la timeline (exemple)
const sampleData = [
    { time: 2000, label: 'Événement 1' },
    { time: 5000, label: 'Événement 2' },
    { time: 8000, label: 'Événement 3' }
];

// Initialisation de la timeline
initializeTimeline(sampleData);

// Gestionnaire d'événement pour le bouton de démarrage
startButton.addEventListener('click', () => {
    if (!animationRunning) {
        animationRunning = true;
        startTime = null; // Réinitialisation du temps de démarrage
        currentTime = 0; // Réinitialisation du temps actuel
        requestAnimationFrame(drawTimeline); // Démarrage de l'animation
    }
});

// Gestionnaire d'événement pour le bouton d'arrêt
stopButton.addEventListener('click', () => {
    animationRunning = false; // Arrêt de l'animation
});
// timeline.js

const canvas = document.getElementById('timelineCanvas');
const ctx = canvas.getContext('2d');

let timelineData = []; // Tableau pour stocker les données de la timeline (événements, dates, etc.)
let currentTime = 0; // Temps actuel de l'animation
let animationDuration = 10000; // Durée totale de l'animation (10 secondes par exemple)
let startTime;

// Fonction pour initialiser les données de la timeline
function initializeTimeline(data) {
    timelineData = data;
    // Trier les événements par date, etc.
}

// Fonction pour dessiner la timeline
function drawTimeline(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }

    const elapsed = timestamp - startTime;
    currentTime = Math.min(elapsed, animationDuration); // Limiter le temps actuel à la durée totale

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la ligne de base de la timeline
    ctx.beginPath();
    ctx.moveTo(50, canvas.height / 2);
    ctx.lineTo(canvas.width - 50, canvas.height / 2);
    ctx.strokeStyle = '#333';
    ctx.stroke();

    // Dessiner les événements de la timeline
    timelineData.forEach(event => {
        const eventPosition = mapTime(event.time, 0, animationDuration, 50, canvas.width - 50);
        ctx.beginPath();
        ctx.arc(eventPosition, canvas.height / 2, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#007bff';
        ctx.fill();
        ctx.stroke();
    });

    // Dessiner le curseur de temps actuel
    const currentPosition = mapTime(currentTime, 0, animationDuration, 50, canvas.width - 50);
    ctx.beginPath();
    ctx.moveTo(currentPosition, 0);
    ctx.lineTo(currentPosition, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    if (currentTime < animationDuration) {
        requestAnimationFrame(drawTimeline);
    }
}

// Fonction utilitaire pour mapper une valeur d'une plage à une autre
function mapTime(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

// Exemple de données de la timeline
const sampleData = [
    { time: 1000, label: 'Événement 1' },
    { time: 2000, label: 'Événement 2' },
    { time: 3000, label: 'Événement 3' },
    { time: 4000, label: 'Événement 4' },
    { time: 5000, label: 'Événement 5' },
    { time: 6000, label: 'Événement 6' },
    { time: 7000, label: 'Événement 7' },
    { time: 8000, label: 'Événement 8' }
];

initializeTimeline(sampleData);
requestAnimationFrame(drawTimeline);
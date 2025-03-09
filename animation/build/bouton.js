// timeline.js

const canvas = document.getElementById('timelineCanvas');
const ctx = canvas.getContext('2d');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

let timelineData = [];
let currentTime = 0;
let animationDuration = 10000;
let startTime;
let animationRunning = false;

function initializeTimeline(data) {
    timelineData = data;
}

function drawTimeline(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }

    const elapsed = timestamp - startTime;
    currentTime = Math.min(elapsed, animationDuration);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dessiner la ligne de base, les événements et le curseur de temps (comme avant)
    ctx.beginPath();
    ctx.moveTo(50, canvas.height / 2);
    ctx.lineTo(canvas.width - 50, canvas.height / 2);
    ctx.strokeStyle = '#333';
    ctx.stroke();

    timelineData.forEach(event => {
        const eventPosition = mapTime(event.time, 0, animationDuration, 50, canvas.width - 50);
        ctx.beginPath();
        ctx.arc(eventPosition, canvas.height / 2, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#007bff';
        ctx.fill();
        ctx.stroke();
    });

    const currentPosition = mapTime(currentTime, 0, animationDuration, 50, canvas.width - 50);
    ctx.beginPath();
    ctx.moveTo(currentPosition, 0);
    ctx.lineTo(currentPosition, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    if (currentTime < animationDuration && animationRunning) {
        requestAnimationFrame(drawTimeline);
    } else {
        animationRunning = false;
    }
}

function mapTime(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

const sampleData = [
    { time: 2000, label: 'Événement 1' },
    { time: 5000, label: 'Événement 2' },
    { time: 8000, label: 'Événement 3' }
];

initializeTimeline(sampleData);

startButton.addEventListener('click', () => {
    if (!animationRunning) {
        animationRunning = true;
        startTime = null;
        currentTime = 0;
        requestAnimationFrame(drawTimeline);
    }
});

// Gestionnaire d'événement pour le bouton d'arrêt
stopButton.addEventListener('click', () => {
    animationRunning = false; // Arrêter l'animation
});
// timeline.js

const canvas = document.getElementById('timelineCanvas');
const ctx = canvas.getContext('2d');
const timeDisplayCanvas = document.getElementById('timeDisplayCanvas');
const timeDisplayCtx = timeDisplayCanvas.getContext('2d');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const leftButton = document.getElementById('leftButton');
const rightButton = document.getElementById('rightButton');

let timelineData = [];
let currentTime = 0;
let animationDuration = 10000;
let startTime;
let animationRunning = false;
let frameOffset = 0; // Décalage actuel des événements

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

    // Dessiner la ligne de base, les événements et le curseur de temps
    ctx.beginPath();
    ctx.moveTo(50, canvas.height / 2);
    ctx.lineTo(canvas.width - 50, canvas.height / 2);
    ctx.strokeStyle = '#333';
    ctx.stroke();

    timelineData.forEach((event, index) => {
        // Appliquer le décalage aux événements
        const adjustedTime = event.time + frameOffset;
        const eventPosition = mapTime(adjustedTime, 0, animationDuration, 50, canvas.width - 50);

        // Dessiner les événements
        ctx.beginPath();
        ctx.arc(eventPosition, canvas.height / 2, 5, 0, 2 * Math.PI);
        ctx.fillStyle = '#007bff';
        ctx.fill();
        ctx.stroke();

        // Afficher le label de l'événement
        ctx.fillText(event.label, eventPosition, canvas.height / 2 - 15);
    });

    const currentPosition = mapTime(currentTime, 0, animationDuration, 50, canvas.width - 50);
    ctx.beginPath();
    ctx.moveTo(currentPosition, 0);
    ctx.lineTo(currentPosition, canvas.height);
    ctx.strokeStyle = 'red';
    ctx.stroke();

    displayTime(currentTime / 1000);

    if (currentTime < animationDuration && animationRunning) {
        requestAnimationFrame(drawTimeline);
    } else {
        animationRunning = false;
    }
}

function mapTime(value, start1, stop1, start2, stop2) {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function displayTime(seconds) {
    timeDisplayCtx.clearRect(0, 0, timeDisplayCanvas.width, timeDisplayCanvas.height);
    timeDisplayCtx.font = '20px Arial';
    timeDisplayCtx.fillStyle = '#333';
    timeDisplayCtx.fillText(`Temps: ${seconds.toFixed(2)}s`, 10, 30);
}

const sampleData = [
    { time: 1000, label: 'Événement 1' },
    { time: 2000, label: 'Événement 2' },
    { time: 3000, label: 'Événement 3' },
    { time: 5000, label: 'Événement 4' },
    { time: 8000, label: 'Événement 5' }
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

stopButton.addEventListener('click', () => {
    animationRunning = false;
});

leftButton.addEventListener('click', () => {
    frameOffset -= 500; // Décaler les événements de 500ms vers la gauche
    drawTimeline(performance.now()); // Redessiner la timeline avec le nouveau décalage
});

rightButton.addEventListener('click', () => {
    frameOffset += 500; // Décaler les événements de 500ms vers la droite
    drawTimeline(performance.now()); // Redessiner la timeline avec le nouveau décalage
});
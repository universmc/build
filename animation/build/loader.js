const canvas = document.getElementById('loaderCanvas');
const ctx = canvas.getContext('2d');
let progress = 0;
const duration = 5000; // Durée de l'animation en millisecondes
let startTime;

function drawLoader(timestamp) {
    if (!startTime) {
        startTime = timestamp;
    }
    const elapsed = timestamp - startTime;
    progress = Math.min(elapsed / duration, 1); // Limiter à 1 (100%)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#3498db';
    ctx.fillRect(0, 0, canvas.width * progress, canvas.height);

    // Ajouter un effet de clignotement ou un filtre basé sur le timestamp
    if (Math.floor(timestamp / 500) % 2 === 0) {
        ctx.globalAlpha = 0.8; // Réduire l'opacité à intervalles réguliers
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)'; // Ajoute un calque blanc semi transparent.
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.globalAlpha = 1;
    }

    if (progress < 1) {
        requestAnimationFrame(drawLoader);
    }
}

requestAnimationFrame(drawLoader);
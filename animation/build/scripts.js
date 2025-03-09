document.addEventListener('DOMContentLoaded', () => {
    const svgObject = document.querySelector('#mon-canvas object');
  
    svgObject.addEventListener('load', () => {
      const svgDoc = svgObject.contentDocument;
      const cercle = svgDoc.getElementById('mon-cercle');
  
      // Animation basée sur les keyframes CSS
      cercle.style.animation = 'mon-animation 2s infinite alternate';
  
      // Animation JavaScript frame par frame (exemple)
      function animerFrameParFrame() {
        const startTime = performance.now();
        function animate(currentTime) {
          const elapsedTime = currentTime - startTime;
          cercle.style.filter = `hue-rotate(${elapsedTime / 10}deg)`; // Exemple de filtre dynamique
          requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
      }
  
      animerFrameParFrame();
    });
  });
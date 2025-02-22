// script.js
const videoInput = document.getElementById('videoInput');
const monterVideo = document.getElementById('monterVideo');
const resultat = document.getElementById('resultat');

monterVideo.addEventListener('click', () => {

    
  const fichierVideo = videoInput.files[0];

  if (fichierVideo) {
    // 1. Envoyer le fichier vidéo à votre API
    const formData = new FormData();
    formData.append('video', fichierVideo);

    fetch('/api/monter', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      // 2. Afficher le résultat (URL de la vidéo montée)
      resultat.innerHTML = `<video src="${data.url}" controls></video>`;
    })
    .catch(error => {
      console.error('Erreur:', error);
      resultat.textContent = 'Une erreur s\'est produite.';
    });
  } else {
    resultat.textContent = 'Veuillez sélectionner un fichier vidéo.';
  }
});
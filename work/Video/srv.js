const express = require('express');
const multer = require('multer');
const { execFile } = require('child_process');
const path = require('path'); // Importez le module path

const app = express();
const port = 3000;

// Configuration de Multer pour gérer les uploads de fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, 'uploads'); // Chemin absolu vers le dossier d'uploads
    console.log("Destination:", uploadPath);
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + '-' + file.originalname;
    console.log("Filename:", filename);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Route pour gérer le montage vidéo
app.post('/api/monter', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Aucun fichier vidéo n\'a été envoyé.' });
  }

  const videoPath = req.file.path;
  const outputDir = path.join(__dirname, 'montage'); // Chemin absolu vers le dossier de montage
  const outputPath = path.join(outputDir, Date.now() + '-montage.mp4'); // Chemin absolu vers le fichier de sortie

  // Assurez-vous que le dossier de montage existe
  const fs = require('fs'); // Importez le module fs
  fs.mkdirSync(outputDir, { recursive: true }); // Crée le dossier s'il n'existe pas

  const command = ['ffmpeg', '-i', videoPath, '-vf', 'scale=720:480', outputPath];

  console.log("Commande FFmpeg:", command.join(' ')); // Affiche la commande complète

  execFile('ffmpeg', command, (error, stdout, stderr) => {
    if (error) {
      console.error('Erreur FFmpeg:', error);
      console.error('Stdout FFmpeg:', stdout);
      console.error('Stderr FFmpeg:', stderr);
      return res.status(500).json({ error: 'Erreur lors du montage de la vidéo.', details: stderr }); // Inclure les détails de l'erreur
    } else {
      console.log('Montage réussi !');
      res.json({ url: `/${path.relative(__dirname, outputPath)}` }); // Chemin relatif depuis la racine du projet
    }
  });
});

// Middleware pour servir les fichiers statiques (HTML, CSS, JS)
app.use(express.static('.'));

// Middleware pour servir les vidéos montées
app.use('/montage', express.static(path.join(__dirname, 'montage'))); // Serveur statique pour les vidéos montées

// Démarrer le serveur
app.listen(port, () => {
  console.log(`API de montage vidéo écoutant sur le port ${port}`);
});
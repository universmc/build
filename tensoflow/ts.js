const tf = require('@tensorflow/tfjs');
// 1. Modèle de données (exemple - IMPORTANT : plus de données !)
const data = [
  { input: [0.2, 0.5], output: [0.8, 0.3] }, // Exemple : couleur et taille normalisées
  { input: [0.8, 0.1], output: [0.2, 0.9] },
  { input: [0.5, 0.7], output: [0.5, 0.6] },
  { input: [0.1, 0.3], output: [0.9, 0.1] },
  // ... BEAUCOUP plus de données pour un modèle qui apprendra quelque chose
];

// 2. Modèle TensorFlow.js (exemple)
const model = tf.sequential();
model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [2] }));
model.add(tf.layers.dense({ units: 2 })); // 2 sorties (deux valeurs numériques)

// 3. Entraînement du modèle
model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

// Convertir les données en tenseurs pour l'entraînement
const xs = tf.tensor(data.map(d => d.input));
const ys = tf.tensor(data.map(d => d.output));

model.fit(xs, ys, { epochs: 100 }).then(() => {  // Ajout d'un then pour la prédiction après l'entrainement
  // 4. Génération de styles SCSS (CORRECTED)
  const input = [Math.random(), Math.random()]; // Tableau de 2 valeurs
  const output = model.predict(tf.tensor([input])).arraySync()[0];

  // Important : Interprétation des sorties (dé-normalisation)
  const color = `rgb(${Math.floor(output[0] * 255)}, ${Math.floor(output[1] * 255)}, 0)`; // Exemple : conversion en RGB
  const fontSize = `${Math.floor(output[1] * 30) + 10}px`; // Exemple : taille entre 10px et 40px

  const scss = `
.element {
  color: ${color};
  font-size: ${fontSize};
}
`;

  console.log(scss);
});
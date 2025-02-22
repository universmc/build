const tf = require('@tensorflow/tfjs-node'); // Importation pour Node.js

// 1. Données d'entraînement (plus de données !)
const data = [
  { input: [0.2, 0.5], output: [0.8, 0.3] },
  { input: [0.8, 0.1], output: [0.2, 0.9] },
  { input: [0.5, 0.7], output: [0.5, 0.6] },
  { input: [0.1, 0.3], output: [0.9, 0.1] },
  { input: [0.3, 0.6], output: [0.7, 0.4] },
  { input: [0.7, 0.2], output: [0.3, 0.8] },
  { input: [0.6, 0.4], output: [0.4, 0.7] },
  { input: [0.4, 0.8], output: [0.6, 0.2] },
  // ... beaucoup plus de données !
];

// 2. Modèle TensorFlow.js
const model = tf.sequential();
model.add(tf.layers.dense({ units: 10, activation: 'relu', inputShape: [2] }));
model.add(tf.layers.dense({ units: 2 }));

// 3. Entraînement du modèle
model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

const xs = tf.tensor(data.map(d => d.input));
const ys = tf.tensor(data.map(d => d.output));

model.fit(xs, ys, { epochs: 100 }).then(() => {
  // 4. Génération et affichage (dans Node.js)
  const input = [Math.random(), Math.random()];
  const output = model.predict(tf.tensor([input])).arraySync()[0];

  const couleur = `rgb(${Math.floor(output[0] * 255)}, ${Math.floor(output[1] * 255)}, 0)`;
  const taillePolice = `${Math.floor(output[1] * 30) + 10}px`;

  console.log(`
    <div style="color: ${couleur}; font-size: ${taillePolice}">
      Couleur : ${couleur}, Taille : ${taillePolice}
    </div>
  `);

  // 5. Création de SVG (avec D3.js dans Node.js)
  const d3 = require('d3'); // Assurez-vous d'installer d3: npm install d3

  const svg = d3.create('svg')
    .attr('width', 200)
    .attr('height', 200);

  svg.append('circle')
    .attr('cx', 100)
    .attr('cy', 100)
    .attr('r', output[1] * 50)
    .attr('fill', couleur);

  console.log(svg.node().outerHTML); // Affiche le code SVG dans la console
});
// Installation de d3.js
// npm install d3

// Importation de d3.js
import * as d3 from 'd3';

// Création d'un élément SVG
const svg = d3.create('svg')
  .attr('width', 400)
  .attr('height', 400);

// Ajout d'un cercle
svg.append('circle')
  .attr('cx', 200)
  .attr('cy', 200)
  .attr('r', 50)
  .attr('fill', 'red');

// Ajout de l'élément SVG au conteneur HTML
svgContainer.appendChild(svg.node());
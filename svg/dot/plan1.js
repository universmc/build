const svg = d3.select("#plan-svg");
const plan = svg.append("g").attr("id", "plan"); // Groupe pour le plan SVG
const width = svg.attr("width");
const height = svg.attr("height");

// Charger le SVG du plan
d3.xml("plan.svg").then(xml => {
  const importedPlan = xml.documentElement;
  plan.node().append(importedPlan); // Ajouter le plan au SVG

  // Créer la grille (exemple)
  const gridSize = 50; // Taille des cellules de la grille

  for (let x = 0; x <= width; x += gridSize) {
    svg.append("line")
      .attr("class", "grid-line")
      .attr("x1", x)
      .attr("y1", 0)
      .attr("x2", x)
      .attr("y2", height);
  }

  for (let y = 0; y <= height; y += gridSize) {
    svg.append("line")
      .attr("class", "grid-line")
      .attr("x1", 0)
      .attr("y1", y)
      .attr("x2", width)
      .attr("y2", y);
  }

  // Gestion des clics pour ajouter des points
  svg.on("click", function(event) {
    const coords = d3.pointer(event); // Obtenir les coordonnées du clic
    const x = coords[0];
    const y = coords[1];

    svg.append("circle")
      .attr("class", "point")
      .attr("cx", x)
      .attr("cy", y);

      // Ici, vous pouvez ajouter la logique pour stocker
      // les coordonnées et d'autres informations sur le point.
      console.log("Point ajouté en x:", x, "y:", y);
  });
});



// Bouton d'ajout de point (exemple)
const addPointButton = d3.select("#add-point");

addPointButton.on("click", function() {
    //  Ajouter un point à des coordonnées spécifiques (exemple)
    const x = 200;
    const y = 150;

    svg.append("circle")
      .attr("class", "point")
      .attr("cx", x)
      .attr("cy", y);

      console.log("Point ajouté par bouton en x:", x, "y:", y);
});
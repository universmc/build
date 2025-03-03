// Charger le SVG
d3.xml("plan.svg").then(function(xml) {
    const svg = d3.select("#container").append("div").html(xml.documentElement).select("#monPlan");
  
    // Données (exemple)
    const data = [
      { x: 150, y: 150, name: "Point A" },
      { x: 450, y: 350, name: "Point B" },
      { x: 250, y: 400, name: "Point C" }
    ];
  
    // Créer une échelle pour les coordonnées (facultatif, mais recommandé)
    const xScale = d3.scaleLinear().domain([0, 800]).range([0, 800]); // Ajustez les domaines
    const yScale = d3.scaleLinear().domain([0, 600]).range([0, 600]); // Ajustez les domaines
  
    // Ajouter les points
    svg.selectAll(".point")
      .data(data)
      .enter().append("circle")
      .attr("class", "point")
      .attr("cx", d => xScale(d.x)) // Utiliser l'échelle pour x
      .attr("cy", d => yScale(d.y)) // Utiliser l'échelle pour y
      .on("click", handleClick); // Ajouter un gestionnaire d'événements click
  
      // Gestionnaire d'événements click
      function handleClick(event, d) {
          console.log("Point cliqué :", d.name);
          // Ajoutez ici le code pour gérer le clic sur un point (par exemple, afficher des informations, modifier les coordonnées, etc.)
      }
  
      // Exemple de liens (à adapter)
      const links = [
        { source: data[0], target: data[1] },
        { source: data[1], target: data[2] }
      ];
  
      // Ajouter les liens
      svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("x1", d => xScale(d.source.x))
        .attr("y1", d => yScale(d.source.y))
        .attr("x2", d => xScale(d.target.x))
        .attr("y2", d => yScale(d.target.y));
  
  });
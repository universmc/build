fetch('scripts.json')
    .then(response => response.json())
    .then(data => {
        const contentDiv = document.getElementById('content');
        data.forEach(niveau => {
            const niveauDiv = document.createElement('div');
            niveauDiv.classList.add('niveau');
            niveauDiv.innerHTML = `<h2>${niveau.niveau}</h2>`;
            const zonesList = document.createElement('ul');
            niveau.zones.forEach(zone => {
                const zoneItem = document.createElement('li');
                zoneItem.classList.add('zone');
                zoneItem.textContent = zone;
                zonesList.appendChild(zoneItem);
            });
            niveauDiv.appendChild(zonesList);
            contentDiv.appendChild(niveauDiv);
        });
    });
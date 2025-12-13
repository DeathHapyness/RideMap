const map = L.map('map', { minZoom: 4.5 });
map.setView([-23.5505, -46.6333], 7);

// Tile layers claro e escuro
window.lightTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; OpenStreetMap contributors'
});

window.darkTileLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
});

if (document.body.classList.contains('darkmode')) {
    window.darkTileLayer.addTo(map);
} else {
    window.lightTileLayer.addTo(map);
}

window.map = map;

const meuIcone = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

async function carregarPistas() {
    try {
        const response = await fetch('/api/spots');
        const pistas = await response.json();
        
        pistas.forEach(pista => {
            const popupContent = `
                <div style="min-width: 200px;">
                    <h5>${pista.nome}</h5>
                    <p><strong>📍</strong> ${pista.cidade}, ${pista.estado}</p>
                    <p><strong>🎯</strong> ${pista.tipo}</p>
                    <p><strong>📊</strong> ${pista.dificuldade}</p>
                    <p><strong>Descricao:</strong>${pista.descricao || ''}</p>
                </div>
            `;
            
            L.marker([pista.latitude, pista.longitude], { icon: meuIcone })
                .bindPopup(popupContent)
                .addTo(map);
        });
        
    } catch (error) {
        console.error('Erro ao carregar pistas:', error);
    }
}

carregarPistas();

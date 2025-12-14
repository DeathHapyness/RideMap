// Aguardar o DOM e o Leaflet estarem prontos
document.addEventListener('DOMContentLoaded', function() {
    const mapElement = document.getElementById('map');

    if (!mapElement || typeof L === 'undefined') {
        return;
    }
    
    let map;
    try {
        map = L.map('map', { minZoom: 4.5, zoomControl: true });
        map.setView([-15.7801, -47.9292], 5);
    } catch (error) {
        return;
    }

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

    // Criar ícone vermelho personalizado usando SVG
    const meuIcone = L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="marker-pin"></div>
            <div class="marker-pulse"></div>
        `,
        iconSize: [30, 42],
        iconAnchor: [15, 42],
        popupAnchor: [0, -42]
    });

    async function carregarPistas() {
        try {
            const response = await fetch('/api/spots');
            const pistas = await response.json();
            
            if (!pistas || pistas.length === 0) return;
            
            pistas.forEach((pista) => {
                const lat = parseFloat(pista.latitude);
                const lng = parseFloat(pista.longitude);
                
                const popupContent = `
                    <div style="min-width: 200px;">
                        <h5 style="color: #FF6B35; margin-bottom: 10px;">${pista.nome}</h5>
                        <p style="margin: 5px 0;"><strong>📍</strong> ${pista.cidade}, ${pista.estado}</p>
                        <p style="margin: 5px 0;"><strong>🎯</strong> ${pista.tipo}</p>
                        <p style="margin: 5px 0;"><strong>📊</strong> ${pista.dificuldade}</p>
                        <p style="margin: 5px 0;"><strong>Descrição:</strong> ${pista.descricao || 'Sem descrição'}</p>
                        <p style="margin: 5px 0;"><strong>Imagens do local:</strong><br>${pista.imgsHtml}</p>
                    </div>
                `;
                
                L.marker([lat, lng], { 
                    icon: meuIcone,
                    zIndexOffset: 1000
                })
                .bindPopup(popupContent)
                .addTo(map);
            });
        } catch (error) {
            console.error('Erro ao carregar pistas:', error);
        }
    }

    carregarPistas();
});

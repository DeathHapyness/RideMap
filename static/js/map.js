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

    // Array para guardar todos os marcadores
    let todosOsMarcadores = [];

    // Função para filtrar e atualizar marcadores
    window.atualizarMarcadores = function(filters = {}) {
        // Remove todos os marcadores do mapa
        todosOsMarcadores.forEach(marker => map.removeLayer(marker));
        todosOsMarcadores = [];

        // Busca pistas com filtros
        const params = new URLSearchParams();
        if (filters.tipo && filters.tipo.length > 0) {
            params.append('tipo', filters.tipo[0]);
        }
        if (filters.dificuldade && filters.dificuldade.length > 0) {
            params.append('dificuldade', filters.dificuldade[0]);
        }
        if (filters.estado && filters.estado.length > 0) {
            params.append('estado', filters.estado[0]);
        }

        // Usa rota de filtros se houver qualquer filtro aplicado
        const hasFilters = (filters.tipo && filters.tipo.length > 0) || 
                          (filters.dificuldade && filters.dificuldade.length > 0) || 
                          (filters.estado && filters.estado.length > 0);
        
        const url = hasFilters 
            ? `/api/dashboard?${params.toString()}`
            : '/api/spots';

        fetch(url)
            .then(response => response.json())
            .then(pistas => {
                if (!pistas || pistas.length === 0) {
                    Swal.fire({
                        icon: 'info',
                        title: 'Nenhuma pista encontrada',
                        text: 'Não há pistas com esses filtros. Tente outros critérios.',
                        timer: 3000
                    });
                    return;
                }

                pistas.forEach((pista) => {
                    const lat = parseFloat(pista.latitude);
                    const lng = parseFloat(pista.longitude);
                    //conferir se a imagem esta sendo puxada do bd -> pista.imagens = linha 103
                    const popupContent = `
                        <div style="min-width: 200px;">
                            <h5 style="color: #FF6B35; margin-bottom: 10px;">${pista.nome}</h5>
                            <p style="margin: 5px 0;"><strong>📍</strong> ${pista.cidade}, ${pista.estado}</p>
                            <p style="margin: 5px 0;"><strong>🎯</strong> ${pista.tipo}</p>
                            <p style="margin: 5px 0;"><strong>📊</strong> ${pista.dificuldade}</p>
                            <p style="margin: 5px 0;"><strong>Descrição:</strong> ${pista.descricao || 'Sem descrição'}</p>
                        </div>
                    `;
                    
                    const marker = L.marker([lat, lng], { 
                        icon: meuIcone,
                        zIndexOffset: 1000
                    })
                    .bindPopup(popupContent)
                    .addTo(map);

                    todosOsMarcadores.push(marker);
                });
            })
            .catch(error => {
                console.error('Erro ao filtrar pistas:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao aplicar filtros. Tente novamente.'
                });
            });
    };

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
                        <p style="margin: 5px 0;"><strong>⭐</strong> ${pista.avaliacao || 'Sem avaliações'}</p>
                        <p style="margin: 5px 0;"><strong>Descrição:</strong> ${pista.descricao || 'Sem descrição'}</p>
                        <p style="margin: 5px 0;"><strong>Imagens:</strong></p>
                        <p style="margin: 5px 0 5px 10px;">${pista.imagens || 'Sem imagens'}</p>
                    </div>
                `;
                
                const marker = L.marker([lat, lng], { 
                    icon: meuIcone,
                    zIndexOffset: 1000
                })
                .bindPopup(popupContent)
                .addTo(map);

                todosOsMarcadores.push(marker);
            });
        } catch (error) {
            console.error('Erro ao carregar pistas:', error);
        }
    }

    carregarPistas();
});

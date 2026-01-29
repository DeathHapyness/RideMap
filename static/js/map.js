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

    let todosOsMarcadores = [];

    window.atualizarMarcadores = function(filters = {}) {
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
                            <p style="margin: 5px 0;"><strong>📍Localizacao:</strong> ${pista.cidade}, ${pista.estado}</p>
                            <p style="margin: 5px 0;"><strong>🎯Localização:</strong> ${pista.tipo}</p>
                            <p style="margin: 5px 0;"><strong>📊Dificuldade:</strong> ${pista.dificuldade}</p>
                            <p style="margin: 5px 0;"><strong>⭐Avaliação:</strong> ${pista.avaliacao || 'Sem avaliações'}</p>
                            <p style="margin: 5px 0;"><strong>Descrição:</strong> ${pista.descricao || 'Sem descrição'}</p>
                            <p style="margin: 5px 0;"><strong>Imagens:</strong></p>
                            <p style="margin: 5px 0 5px 10px;">
                                ${pista.fotos_pistas && pista.fotos_pistas[0] 
                                ? pista.fotos_pistas[0] 
                                : 'Sem imagens'}
                            </p>
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
                        <p style="margin: 5px 0;"><strong>📍Localizacao:</strong> ${pista.cidade}, ${pista.estado}</p>
                        <p style="margin: 5px 0;"><strong>🎯Dificuldade:</strong> ${pista.tipo}</p>
                        <p style="margin: 5px 0;"><strong>📊Dificuldade:</strong> ${pista.dificuldade}</p>
                        <p style="margin: 5px 0;"><strong>⭐Avaliação:</strong> ${pista.avaliacao || 'Sem avaliações'}</p>
                        <p style="margin: 5px 0;"><strong>Descrição:</strong> ${pista.descricao || 'Sem descrição'}</p>
                        <p style="margin: 5px 0;"><strong>Imagens:</strong></p>
                        <p style="margin: 5px 0 5px 10px;">
                            ${pista.fotos_pistas && pista.fotos_pistas[0] 
                            ? pista.fotos_pistas[0] 
                            : 'Sem imagens'}
                        </p>
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


function criarModalPopup() {
  //** Verifica se já existe (para não duplicar)
  if (document.getElementById('modalPopupAviso')) {
    return;
  }
  
  const modalHTML = `
    <div class="modal fade" id="modalPopupAviso" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Avisos</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div class="progress mb-3" style="height: 25px;">
              <div class="progress-bar" id="barraProgresso" role="progressbar" style="width: 100%;">
                <span id="tempoRestante">10s</span>
              </div>
            </div>
            <div id="corpoPopupAviso"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

document.addEventListener('DOMContentLoaded', async () => {
  const response = await fetch('/api/admin/avisos');
  const data = await response.json();
  const jaExibido = sessionStorage.getItem('avisoExibido');
  
  // Se tiver avisos
  if (data.success && data.avisos.length > 0) {
    
    criarModalPopup();
    
    const avisoMaisRecente = data.avisos[0];
    document.getElementById('corpoPopupAviso').innerHTML = `
      <h5>Tipo: ${avisoMaisRecente.tipo}</h5>
      <strong>Aviso: ${avisoMaisRecente.titulo}</strong>
      <h5>Mensagem: ${avisoMaisRecente.mensagem}</h5>
    `;
    
    //*Abre o modal NAO MEXER  
    const modalPopupAviso = new bootstrap.Modal(document.getElementById('modalPopupAviso'));
    modalPopupAviso.show();
    
    let tempoTotal = 10;
    let tempoRestante = tempoTotal;
    
    const intervalo = setInterval(() => {
      tempoRestante -= 0.1;
      const porcentagem = (tempoRestante / tempoTotal) * 100;
      
      document.getElementById('barraProgresso').style.width = `${porcentagem}%`;
      document.getElementById('tempoRestante').textContent = tempoRestante.toFixed(1) + 's';
      
      if (tempoRestante <= 0) {
        clearInterval(intervalo);
        modalPopupAviso.hide();
      }
    }, 100);
  }
});

function logout() {
    sessionStorage.clear();
}
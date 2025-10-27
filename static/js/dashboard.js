// Define o objeto Alertas ANTES de tudo
const Alertas = {
    carregando: (texto) => {
        Swal.fire({
            title: texto,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading()
        });
    },
    fecharCarregando: () => {
        Swal.close();
    },
    sucesso: (titulo, texto) => {
        return Swal.fire({
            icon: 'success',
            title: titulo,
            text: texto
        });
    },
    erro: (titulo, texto) => {
        Swal.fire({
            icon: 'error',
            title: titulo,
            text: texto
        });
    },
    info: (titulo, texto) => {
        Swal.fire({
            icon: 'info',
            title: titulo,
            text: texto
        });
    },
    validacaoFormulario: (campos) => {
        Swal.fire({
            icon: 'warning',
            title: 'Campos obrigatórios',
            html: 'Preencha: ' + campos.join(', ')
        });
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
        window.location.href = '/login';
        return;
    }
    
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    if (hamburgerBtn) {
        hamburgerBtn.style.display = 'block';
        hamburgerBtn.style.visibility = 'visible';
        hamburgerBtn.style.opacity = '1';
    }
    
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay-menu');
    const logoutBtn = document.getElementById('logoutBtn');
    let touchStartX = 0;
    let touchEndX = 0;

    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    }

    function closeMenu() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        hamburgerBtn.classList.remove('active');
    }

    hamburgerBtn.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0 && !sidebar.classList.contains('active')) {
                toggleMenu();
            } else if (swipeDistance < 0 && sidebar.classList.contains('active')) {
                closeMenu();
            }
        }
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('user');
            window.location.href = '/logout';
        });
    }

    const btnSalvarPerfil = document.getElementById('btnSalvarPerfil');
    if (btnSalvarPerfil) {
        btnSalvarPerfil.addEventListener('click', salvarPerfil);
    }

    loadUserProfile();
});

function loadUserProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const userName = document.querySelector('.user-name');
        const userAvatar = document.querySelector('.user-avatar');
        if (userName) userName.textContent = user.nome;
        if (userAvatar && user.avatar) {
            userAvatar.src = user.avatar;
        }
    }
}

async function showMySpots() {
    const modal = new bootstrap.Modal(document.getElementById('minhasPistasModal'));
    modal.show();
        const lista = document.getElementById('minhasPistasLista');
    lista.innerHTML = '<p class="text-center">Carregando...</p>';
    try {
        const response = await fetch('/api/minhas-pistas');
        const pistas = await response.json();
        if (pistas.length === 0) {
            lista.innerHTML = '<p class="text-center text-muted">Você ainda não enviou nenhuma pista.</p>';
            return;
        }
        let html = '';
        pistas.forEach(pista => {
          pistas.forEach(pista => {
    let badge = '';
    if (pista.status === 'pendente') {
        badge = '<span class="badge bg-warning">⏳ Pendente</span>';
    } else if (pista.status === 'aprovada') {
        badge = '<span class="badge bg-success">✅ Aprovada</span>';
    } else {
        badge = '<span class="badge bg-danger">❌ Rejeitada</span>';
    }
    html += `
        <div class="card mb-3">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <h5>${pista.nome} ${badge}</h5>
                        <p><strong>📍 Local:</strong> ${pista.cidade}, ${pista.estado}</p>
                        <p><strong>🎯 Tipo:</strong> ${pista.tipo} | <strong>📊 Dificuldade:</strong> ${pista.dificuldade}</p>
                        <p>${pista.descricao}</p>
                    </div>
                    <div class="col-md-4 text-end">
                        <small class="text-muted">Enviada em: ${new Date(pista.data_criacao).toLocaleDateString()}</small>
                    </div>
                </div>
            </div>
        </div>
    `;
});
        });
        
        lista.innerHTML = html;
        
    } catch (error) {
        console.error('Erro:', error);
        lista.innerHTML = '<p class="text-center text-danger">Erro ao carregar suas pistas.</p>';
    }
}
function showAddSpot() {
    const modalAdicionarPista = new bootstrap.Modal(document.getElementById('addSpotModal'));
    
    $('#spotState').select2({
        dropdownParent: $('#addSpotModal'),
        placeholder: 'Selecione o estado...',
        width: '100%'
    });

    $('#spotType').select2({
        dropdownParent: $('#addSpotModal'),
        placeholder: 'Selecione o tipo...',
        width: '100%'
    });

    $('#spotDifficulty').select2({
        dropdownParent: $('#addSpotModal'),
        placeholder: 'Selecione a dificuldade...',
        width: '100%'
    });
    
    function inicializarMapaPicker() {
        const mapaPicker = L.map('mapaPicker').setView([-15.7801, -47.9292], 4);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19
        }).addTo(mapaPicker);
        
        let marcadorTemp = null;

        function atualizarCoordenadas(lat, lng) {
            document.getElementById('spotLatitude').value = lat.toFixed(6);
            document.getElementById('spotLongitude').value = lng.toFixed(6);
        }

        mapaPicker.on('click', function(e) {
            if (marcadorTemp) {
                mapaPicker.removeLayer(marcadorTemp);
            }
            marcadorTemp = L.marker(e.latlng).addTo(mapaPicker);
            atualizarCoordenadas(e.latlng.lat, e.latlng.lng);
        });

        setTimeout(() => {
            mapaPicker.invalidateSize();
        }, 100);
    }

    modalAdicionarPista.show();

    document.getElementById('addSpotModal').addEventListener('shown.bs.modal', function() {
        inicializarMapaPicker();
    }, { once: true });

    const inputFotos = document.getElementById('spotPhotos');
    inputFotos.addEventListener('change', function(e) {
        const areaPreview = document.createElement('div');
        areaPreview.className = 'preview-fotos';
        
        const previewAntigo = document.querySelector('.preview-fotos');
        if (previewAntigo) {
            previewAntigo.remove();
        }

        Array.from(this.files).forEach(arquivo => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-foto';
                areaPreview.appendChild(img);
            }
            reader.readAsDataURL(arquivo);
        });

        this.parentElement.appendChild(areaPreview);
    });
}

function showProfile() {
    const perfilContainer = document.getElementById('perfilContainer');
    const perfilOverlay = document.getElementById('perfilOverlay');
    
    if (!perfilContainer) {
        console.error('perfilContainer não encontrado!');
        return;
    }
    
    // Remove display inline e adiciona classe
    perfilContainer.style.display = 'block';
    perfilContainer.style.opacity = '1';
    perfilContainer.style.visibility = 'visible';
    
    if (perfilOverlay) {
        perfilOverlay.style.display = 'block';
        perfilOverlay.style.opacity = '1';
        perfilOverlay.style.visibility = 'visible';
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const perfilNome = document.getElementById('perfilNome');
        const perfilAvatar = document.getElementById('perfilAvatar');
        
        if (perfilNome) perfilNome.value = user.nome;
        
        if (perfilAvatar) {
            perfilAvatar.src = user.avatar || '/static/img/default-avatar.png';
        };
    };
};

function fecharPerfil() {
    const perfilContainer = document.getElementById('perfilContainer');
    const perfilOverlay = document.getElementById('perfilOverlay');
    
    if (perfilContainer) {
        perfilContainer.style.display = 'none';
    }
    
    if (perfilOverlay) {
        perfilOverlay.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (userFromSession.nome) {
        localStorage.setItem('user', JSON.stringify(userFromSession));
    }
});

function hideProfile() {
    const perfilContainer = document.getElementById('perfilContainer');
    const perfilOverlay = document.getElementById('perfilOverlay');

    if (perfilContainer) perfilContainer.style.display = 'none';
    if (perfilOverlay) perfilOverlay.style.display = 'none';
}

async function uploadAvatar(input) {
    if (!input.files || !input.files[0]) return;
    
    const file = input.files[0];
    
    if (file.size > 5 * 1024 * 1024) {
        alert('Arquivo muito grande! Máximo 5MB.');
        return;
    }
    
    if (!file.type.startsWith('image/')) {
        alert('Por favor, selecione uma imagem!');
        return;
    }
    
    const formData = new FormData();
    formData.append('avatar', file);
    
    try {
        const response = await fetch('/update-avatar', {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            console.log(data);
            console.log(document.getElementById('perfilAvatar'));
            document.getElementById('perfilAvatar').src = data.avatar_url;
            document.getElementById('fotosPerfil').src = data.avatar_url;
            const user = JSON.parse(localStorage.getItem('user'));
            user.avatar = data.avatar_url;
            localStorage.setItem('user', JSON.stringify(user));
            console.log(document.querySelector('.user-avatar'));
            
            alert('Foto atualizada com sucesso!');
        } else {
            alert('Erro ao atualizar foto: ' + data.error);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar foto!');
    }
}

async function salvarPerfil() {
    const novoNome = document.getElementById('perfilNome').value;
    
    if (!novoNome || novoNome.trim() === '') {
        alert('Por favor, preencha o nome!');
        return;
    }
    
    try {
        const response = await fetch('/update-profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: novoNome
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            const user = JSON.parse(localStorage.getItem('user'));
            user.nome = novoNome;
            localStorage.setItem('user', JSON.stringify(user));
            
            const userName = document.querySelector('.user-name');
            if (userName) userName.textContent = novoNome;

            alert('Nome atualizado com sucesso!');
            hideProfile();
        } else {
            alert('Erro: ' + data.error);
        }
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao salvar!');
    }
}

async function enviarNovaPista() {
    const nome = document.getElementById('spotName').value;
    const cidade = document.getElementById('spotCity').value;
    const estado = document.getElementById('spotState').value;
    const tipo = document.getElementById('spotType').value;
    const dificuldade = document.getElementById('spotDifficulty').value;
    const descricao = document.getElementById('spotDescription').value;
    const latitude = document.getElementById('spotLatitude').value;
    const longitude = document.getElementById('spotLongitude').value;

    const camposVazios = [];
    if (!nome) camposVazios.push('Nome da Pista');
    if (!cidade) camposVazios.push('Cidade');
    if (!estado) camposVazios.push('Estado');
    if (!tipo) camposVazios.push('Tipo');
    if (!dificuldade) camposVazios.push('Dificuldade');
    if (!descricao) camposVazios.push('Descrição');
    if (!latitude || !longitude) camposVazios.push('Localização (clique no mapa)');

    if (camposVazios.length > 0) {
        Alertas.validacaoFormulario(camposVazios);
        return;
    }
    
    Alertas.carregando('Salvando nova pista...');

    try {
        const response = await fetch('/api/pistas/criar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: nome,
                cidade: cidade,
                estado: estado,
                tipo: tipo,
                dificuldade: dificuldade,
                descricao: descricao,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude)
            })
        });

        const data = await response.json();
        
        Alertas.fecharCarregando();
        
        if (data.success) {
            Alertas.sucesso('Pista enviada para análise!', 'Você será notificado quando for aprovada.')
            .then(() => {
                const modal = bootstrap.Modal.getInstance(document.getElementById('addSpotModal'));
                modal.hide();
                document.getElementById('addSpotForm').reset();
            });
        } else {
            Alertas.erro('Erro ao enviar pista', data.error);
        }
    } catch (error) {
        console.error('Erro:', error);
        Alertas.fecharCarregando();
        Alertas.erro('Erro!', 'Não foi possível enviar a pista.');
    }
}

let ultimoTotal = 0;

async function verificarNotificacoes() {
    try {
        const response = await fetch('/api/notificacoes/count');
        const data = await response.json();
        
        const badge = document.querySelector('.badge-notificacoes');
        
        if (data.total > 0) {
            badge.style.display = 'inline-block';
            badge.textContent = data.total;
        } else {
            badge.style.display = 'none';
        }
        
        if (data.total > ultimoTotal && ultimoTotal !== 0) {
            alert('📬 Nova notificação!');
        }
        
        ultimoTotal = data.total;
        
    } catch (error) {
        console.error('Erro:', error);
    }
}

setInterval(verificarNotificacoes, 5000);
verificarNotificacoes();

function toggleNotificacoes() {
    const dropdown = document.getElementById('notificacoesDropdown');
    
    if (dropdown.style.display === 'none' || dropdown.style.display === '') {
        dropdown.style.display = 'block';
        carregarNotificacoes(); // ← ADICIONADO
    } else {
        dropdown.style.display = 'none';
    }
}

function fecharNotificacoes() {
    const dropdown = document.getElementById('notificacoesDropdown');
    dropdown.style.display = 'none';
}

async function carregarNotificacoes() {
    try {
        const response = await fetch('/api/notificacoes');
        const notificacoes = await response.json();
        
        const lista = document.getElementById('notificacoesLista');
        
        if (notificacoes.length === 0) {
            lista.innerHTML = '<p class="text-center text-muted">Nenhuma notificação</p>';
            return;
        }
        
        let html = '';
        notificacoes.forEach(notif => {
            const icone = notif.tipo === 'pista_aprovada' ? '✅' : '❌';
            const classe = notif.lida ? '' : 'nao-lida';
            
            html += `
                <div class="notificacao-item ${classe}" onclick="marcarComoLida(${notif.id})">
                    <div style="font-size: 1.2rem;">${icone}</div>
                    <div style="flex: 1;">
                        <p style="margin: 0;">${notif.mensagem}</p>
                        <small class="text-muted">${formatarData(notif.data_criacao)}</small>
                    </div>
                </div>
            `;
        });
        
        lista.innerHTML = html;
        
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('notificacoesLista').innerHTML = '<p class="text-center text-danger">Erro ao carregar</p>';
    }
}

function formatarData(data) {
    const agora = new Date();
    const dataNotif = new Date(data);
    const diff = Math.floor((agora - dataNotif) / 1000);
    
    if (diff < 60) return 'Agora';
    if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`;
    return `${Math.floor(diff / 86400)} dias atrás`;
}

async function marcarComoLida(id) {
    try {
        await fetch(`/api/notificacoes/marcar-lida/${id}`, {
            method: 'POST'
        });
        
        verificarNotificacoes();
        carregarNotificacoes();
        
    } catch (error) {
        console.error('Erro:', error);
    }
}
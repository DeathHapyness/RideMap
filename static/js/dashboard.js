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

function showMySpots() {
    Alertas.carregando('Carregando suas pistas...');
    
    setTimeout(() => {
        Alertas.fecharCarregando();
        Alertas.info('Nenhuma pista encontrada', 'Você ainda não adicionou nenhuma pista.');
    }, 1000);
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

    perfilContainer.style.display = 'block';
    if (perfilOverlay) perfilOverlay.style.display = 'block';

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const perfilNome = document.getElementById('perfilNome');
        const perfilAvatar = document.getElementById('perfilAvatar');
        
        if (perfilNome) perfilNome.value = user.nome;
        if (perfilAvatar) perfilAvatar.src = user.avatar || '/static/img/default-avatar.png';
    }
}

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
            document.getElementById('perfilAvatar').src = data.avatar_url + '?t=' + Date.now();
            
            const user = JSON.parse(localStorage.getItem('user'));
            user.avatar = data.avatar_url;
            localStorage.setItem('user', JSON.stringify(user));

            const userAvatar = document.querySelector('.user-avatar');
            if (userAvatar) {
                userAvatar.src = data.avatar_url + '?t=' + Date.now();
            }
            
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
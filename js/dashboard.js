document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.querySelector('.hamburger-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay-menu');
    const logoutBtn = document.getElementById('logoutBtn');
    let touchStartX = 0;
    let touchEndX = 0;

    // Função para alternar o menu
    function toggleMenu() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    }

    // Função para fechar o menu
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

    // botao para sair 
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {

            localStorage.removeItem('user');
            
            const hamburgerBtn = document.querySelector('.hamburger-btn');
            if (hamburgerBtn) hamburgerBtn.style.display = 'none';
            
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.remove('active');
            
            const overlayMenu = document.querySelector('.overlay-menu');
            if (overlayMenu) overlayMenu.classList.remove('active');
            
            // Mostrar elementos da interface inicial
            const overlay = document.getElementById('overlay');
            if (overlay) overlay.style.display = 'block';
            
            const features = document.getElementById('features');
            if (features) features.style.display = 'block';
            
            const overlayContent = document.getElementById('overlay-conteudo');
            if (overlayContent) overlayContent.hidden = false;
            
            window.location.reload();
        });
    }
});

// Funções do usuário
function loadUserProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        document.querySelector('.user-name').textContent = user.nome;
        if (user.avatar) {
            document.querySelector('.user-avatar').src = user.avatar;
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
    // Pegar o modal do Bootstrap
    const modalAdicionarPista = new bootstrap.Modal(document.getElementById('addSpotModal'));
    
    // configuracoes do Select2 na interface de adicionar pista
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
        // comeca mostrando no brasil
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

    // exibir o modal
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
    Alertas.carregando('Carregando perfil...');
    
    setTimeout(() => {
        Alertas.fecharCarregando();
        const usuario = JSON.parse(localStorage.getItem('user'));
        
        if (usuario) {
            Swal.fire({
                title: 'Seu Perfil',
                html: `
                    <div class="text-center">
                        <img src="${usuario.avatar}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%; margin-bottom: 15px;">
                        <h3>${usuario.nome}</h3>
                        <p>${usuario.email}</p>
                    </div>
                `,
                ...configPadrao,
                confirmButtonText: 'Fechar'
            });
        } else {
            Alertas.erro('Erro', 'Não foi possível carregar as informações do perfil');
        }
    }, 800);
}

function enviarNovaPista() {
    const nome = document.getElementById('spotName').value;
    const cidade = document.getElementById('spotCity').value;
    const estado = document.getElementById('spotState').value;
    const tipo = document.getElementById('spotType').value;
    const dificuldade = document.getElementById('spotDifficulty').value;
    const descricao = document.getElementById('spotDescription').value;
    const latitude = document.getElementById('spotLatitude').value;
    const longitude = document.getElementById('spotLongitude').value;
    const fotos = document.getElementById('spotPhotos').files;

    // Lista de campos vazios
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

    // Criar objeto com dados da pista
    const dadosPista = {
        nome: nome,
        cidade: cidade,
        estado: estado,
        tipo: tipo,
        dificuldade: dificuldade,
        descricao: descricao,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        usuario_id: JSON.parse(localStorage.getItem('user')).id
    };

    console.log('Dados da nova pista:', dadosPista);
    
   
    // terminar de codar para enviar ao backend,apenas simulação por no momento
    // Mostrar loading
    Alertas.carregando('Salvando nova pista...');

    setTimeout(() => {
        Alertas.fecharCarregando();
        Alertas.sucesso('Pista adicionada!', 'A pista foi adicionada com sucesso.')
        .then(() => {
            const modal = bootstrap.Modal.getInstance(document.getElementById('addSpotModal'));
            modal.hide();
            document.getElementById('addSpotForm').reset();
            Alertas.toast('A pista já está disponível no mapa!', 'success');
        });
    }, 1500);
}

document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
});
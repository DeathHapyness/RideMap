document.addEventListener('DOMContentLoaded', function() {
    carregarEstatisticas();
    carregarPistasPendentes();
    inicializarNavegacao();
    
    // Event listener para filtro de status (PISTAS)
    const filterStatus = document.getElementById('filterStatus');
    if (filterStatus) {
        filterStatus.addEventListener('change', aplicarFiltros);
    }
    
    // Event listener para busca (PISTAS)
    const searchInput = document.getElementById('searchPistas');
    if (searchInput) {
        let timeoutId;
        searchInput.addEventListener('input', function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(aplicarFiltros, 300);
        });
    }
    
    // Event listener para filtro de role (USUÁRIOS)
    const filterRole = document.getElementById('filterRole');
    if (filterRole) {
        filterRole.addEventListener('change', aplicarFiltrosUsuarios);
    }
    
    // Event listener para busca (USUÁRIOS)
    const searchUsuarios = document.getElementById('searchUsuarios');
    if (searchUsuarios) {
        let timeoutId;
        searchUsuarios.addEventListener('input', function() {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(aplicarFiltrosUsuarios, 300);
        });
    }
});

// Sistema de navegação entre views
function inicializarNavegacao() {
    const navBtns = document.querySelectorAll('.admin-nav-btn');
    const views = document.querySelectorAll('.admin-view');
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetView = this.getAttribute('data-view');
            
            // Remove active de todos os botões e views
            navBtns.forEach(b => b.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));
            
            // Adiciona active no botão clicado
            this.classList.add('active');
            
            // Mostra a view correspondente
            const viewElement = document.getElementById(`view-${targetView}`);
            if (viewElement) {
                viewElement.classList.add('active');
            }
            
            // Carregar dados específicos da view
            if (targetView === 'moderacao') {
                carregarTodasPistas();
            } else if (targetView === 'usuarios') {
                carregarTodosUsuarios();
            }
        });
    });
}

async function carregarPistasPendentes() {
    try {
        const response = await fetch('/api/admin/pistas-pendentes');
        const pistas = await response.json();
        
        const totalPendentes = document.getElementById('totalPendentes');
        const listaPistas = document.getElementById('listaPistas');
        
        totalPendentes.textContent = pistas.length;
        
        if (pistas.length === 0) {
            listaPistas.innerHTML = '<p class="text-center text-muted">Nenhuma pista pendente no momento.</p>';
            return;
        }
        
        let html = '';
        pistas.forEach(pista => {
            html += `
                <div class="pista-card" id="pista-${pista.id}">
                    <div class="row">
                        <div class="col-md-8">
                            <h4><i class="fas fa-map-marker-alt"></i> ${pista.nome}</h4>
                            <p><strong>Cidade:</strong> ${pista.cidade}, ${pista.estado}</p>
                            <p><strong>Tipo:</strong> ${pista.tipo} | <strong>Dificuldade:</strong> ${pista.dificuldade}</p>
                            <p><strong>Descrição:</strong> ${pista.descricao}</p>
                            <p class="text-muted"><small>Enviado por: ${pista.usuario_nome}</small></p>
                        </div>
                        <div class="col-md-4 text-end">
                            <button class="btn btn-aprovar mb-2 w-100" onclick="aprovarPista(${pista.id})">
                                <i class="fas fa-check"></i> Aprovar
                            </button>
                            <button class="btn btn-rejeitar w-100" onclick="rejeitarPista(${pista.id})">
                                <i class="fas fa-times"></i> Rejeitar
                            </button>
                        </div>
                    </div>
                </div>
            `;
        });
        
        listaPistas.innerHTML = html;
        
    } catch (error) {
        console.error('Erro:', error);
        Swal.fire('Erro!', 'Não foi possível carregar as pistas.', 'error');
    }
}

async function aprovarPista(id) {
    const result = await Swal.fire({
        title: 'Aprovar pista?',
        text: 'A pista ficará visível no mapa.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, aprovar!',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        try {
            const response = await fetch(`/api/admin/aprovar-pista/${id}`, {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.success) {
                Swal.fire('Aprovada!', 'A pista foi aprovada com sucesso.', 'success');
                document.getElementById(`pista-${id}`).remove();
                
                const total = document.getElementById('totalPendentes');
                total.textContent = parseInt(total.textContent) - 1;
            } else {
                Swal.fire('Erro!', data.error, 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            Swal.fire('Erro!', 'Não foi possível aprovar a pista.', 'error');
        }
    }
}

async function rejeitarPista(id) {
    const { value: motivo } = await Swal.fire({
        title: 'Rejeitar pista',
        input: 'textarea',
        inputLabel: 'Motivo da rejeição',
        inputPlaceholder: 'Digite o motivo...',
        showCancelButton: true,
        confirmButtonText: 'Rejeitar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Você precisa informar um motivo!';
            }
        }
    });
    
    if (motivo) {
        try {
            const response = await fetch(`/api/admin/rejeitar-pista/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ motivo: motivo })
            });
            
            const data = await response.json();
            
            if (data.success) {
                Swal.fire('Rejeitada!', 'A pista foi rejeitada e o usuário foi notificado.', 'success');
                document.getElementById(`pista-${id}`).remove();
                
                const total = document.getElementById('totalPendentes');
                total.textContent = parseInt(total.textContent) - 1;
            } else {
                Swal.fire('Erro!', data.error, 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            Swal.fire('Erro!', 'Não foi possível rejeitar a pista.', 'error');
        }
    }
}

async function carregarEstatisticas() {
  try {
    // Total de usuários
    const resUsuarios = await fetch('/api/admin');
    const dataUsuarios = await resUsuarios.json();
    document.getElementById('totalUsuarios').textContent = dataUsuarios.total;
    
    // Total de pistas ativas
    const resPistas = await fetch('/api/admin/pistas-ativas');
    const dataPistas = await resPistas.json();
    document.getElementById('totalPistas').textContent = dataPistas.total;
    
  } catch (error) {
    console.error('Erro ao carregar estatísticas:', error);
  }
}

// ==================== GERENCIAMENTO DE TABELA DE PISTAS ====================

let todasPistas = []; 
let pistasFiltradas = [];

async function carregarTodasPistas() {
    try {
        const response = await fetch('/api/admin/todas-pistas');
        const data = await response.json();
        
        if (data.success) {
            todasPistas = data.pistas;
            aplicarFiltros();
        }
    } catch (error) {
        console.error('Erro ao carregar pistas:', error);
        const tbody = document.getElementById('listaPistasTabela');
        tbody.innerHTML = '<tr><td colspan="8" class="text-center text-danger">Erro ao carregar pistas</td></tr>';
    }
}


function aplicarFiltros() {
    const filtroStatus = document.getElementById('filterStatus').value;
    const termoBusca = document.getElementById('searchPistas').value.toLowerCase();
    
    pistasFiltradas = todasPistas.filter(pista => {

        const passaStatus = filtroStatus === 'todas' || pista.status === filtroStatus;
        
        const passaBusca = !termoBusca || 
            pista.nome.toLowerCase().includes(termoBusca) ||
            (pista.localizacao && pista.localizacao.toLowerCase().includes(termoBusca)) ||
            (pista.cidade && pista.cidade.toLowerCase().includes(termoBusca)) ||
            (pista.estado && pista.estado.toLowerCase().includes(termoBusca)) ||
            (pista.tipo && pista.tipo.toLowerCase().includes(termoBusca)) ||
            (pista.dificuldade && pista.dificuldade.toLowerCase().includes(termoBusca));
        
        return passaStatus && passaBusca;
    });
    
    renderizarTabela();
}

function renderizarTabela() {
    const tbody = document.getElementById('listaPistasTabela');
    
    if (pistasFiltradas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center">Nenhuma pista encontrada</td></tr>';
        return;
    }
    
    const html = pistasFiltradas.map(pista => {
        const statusClass = pista.status === 'pendente' ? 'pendente' : 
                           pista.status === 'ativa' ? 'ativa' : 'rejeitada';
        
        const statusText = pista.status === 'pendente' ? 'Pendente' : 
                          pista.status === 'ativa' ? 'Ativa' : 'Rejeitada';
        
        const data = new Date(pista.criado_em).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // Botões de ação baseados no status
        let botoesAcao = '';
        if (pista.status === 'pendente') {
            botoesAcao = `
                <button class="btn-action btn-aprovar" onclick="aprovarPista(${pista.id})" title="Aprovar">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn-action btn-rejeitar" onclick="rejeitarPista(${pista.id})" title="Rejeitar">
                    <i class="fas fa-times"></i>
                </button>
            `;
        }
        
        botoesAcao += `
            <button class="btn-action btn-ver" onclick="verPistaNoMapa(${pista.latitude}, ${pista.longitude})" title="Ver no Mapa">
                <i class="fas fa-map-marker-alt"></i>
            </button>
        `;
        
        return `
            <tr>
                <td><strong>#${pista.id}</strong></td>
                <td><strong>${pista.nome}</strong></td>
                <td>${pista.localizacao}</td>
                <td>${pista.tipo}</td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${pista.usuario_nome || 'Desconhecido'}</td>
                <td>${data}</td>
                <td style="white-space: nowrap;">${botoesAcao}</td>
            </tr>
        `;
    }).join('');
    
    tbody.innerHTML = html;
}

async function aprovarPista(id) {
    const result = await Swal.fire({
        title: 'Aprovar pista?',
        text: 'A pista ficará visível no mapa.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, aprovar!',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        try {
            const response = await fetch(`/api/admin/aprovar-pista/${id}`, {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.success) {
                Swal.fire('Aprovada!', 'A pista foi aprovada com sucesso.', 'success');
                
                const pista = todasPistas.find(p => p.id === id);
                if (pista) pista.status = 'ativa';
                
                carregarEstatisticas();
                aplicarFiltros();
            } else {
                Swal.fire('Erro!', data.error, 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            Swal.fire('Erro!', 'Não foi possível aprovar a pista.', 'error');
        }
    }
}

async function rejeitarPista(id) {
    const { value: motivo } = await Swal.fire({
        title: 'Rejeitar pista',
        input: 'textarea',
        inputLabel: 'Motivo da rejeição',
        inputPlaceholder: 'Digite o motivo...',
        showCancelButton: true,
        confirmButtonText: 'Rejeitar',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Você precisa informar um motivo!';
            }
        }
    });
    
    if (motivo) {
        try {
            const response = await fetch(`/api/admin/rejeitar-pista/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ motivo: motivo })
            });
            
            const data = await response.json();
            
            if (data.success) {
                Swal.fire('Rejeitada!', 'A pista foi rejeitada e o usuário foi notificado.', 'success');
                
                // Atualizar o status da pista no cache
                const pista = todasPistas.find(p => p.id === id);
                if (pista) pista.status = 'rejeitada';
                
                carregarEstatisticas();
                aplicarFiltros();
            } else {
                Swal.fire('Erro!', data.error, 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            Swal.fire('Erro!', 'Não foi possível rejeitar a pista.', 'error');
        }
    }
}

// ==================== GERENCIAMENTO DE USUÁRIOS ====================

let todosUsuarios = [];
let usuariosFiltrados = [];

// Carregar todos os usuários
async function carregarTodosUsuarios() {
    try {
        const response = await fetch('/api/admin/todos-usuarios');
        const data = await response.json();
        
        if (data.success && data.usuarios) {
            todosUsuarios = data.usuarios;
            aplicarFiltrosUsuarios();
        }
    } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        const tbody = document.getElementById('listaUsuariosTabela');
        if (tbody) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Erro ao carregar usuários</td></tr>';
        }
    }
}

function aplicarFiltrosUsuarios() {
    const filtroRole = document.getElementById('filterRole');
    const termoBusca = document.getElementById('searchUsuarios');
    
    if (!filtroRole || !termoBusca) return;
    
    const roleValue = filtroRole.value;
    const searchValue = termoBusca.value.toLowerCase();
    
    usuariosFiltrados = todosUsuarios.filter(usuario => {

        const passaRole = roleValue === 'todos' || usuario.role === roleValue;
        
        const passaBusca = !searchValue || 
            usuario.nome.toLowerCase().includes(searchValue) ||
            usuario.email.toLowerCase().includes(searchValue);
        
        return passaRole && passaBusca;
    });
    
    renderizarTabelaUsuarios();
}

// Renderizar tabela de usuários
function renderizarTabelaUsuarios() {
    const tbody = document.getElementById('listaUsuariosTabela');
    
    if (!tbody) return;
    
    if (usuariosFiltrados.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center">Nenhum usuário encontrado</td></tr>';
        return;
    }
    
    const html = usuariosFiltrados.map(usuario => {
        const statusClass = usuario.ativo ? 'ativa' : 'rejeitada';
        const statusText = usuario.ativo ? 'Ativo' : 'Inativo';
        
        const roleClass = usuario.role === 'admin' ? 'pendente' : 'ativa';
        const roleText = usuario.role === 'admin' ? 'Admin' : 'Usuário';
        
        // Data formatada
        const dataCriacao = new Date(usuario.data_criacao).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        // Última atividade
        const ultimaAtividade = usuario.ultima_atividade 
            ? new Date(usuario.ultima_atividade).toLocaleDateString('pt-BR')
            : 'Nunca';
        
        let botoesAcao = '';
        if (usuario.ativo) {
            botoesAcao = `
                <button class="btn-action btn-rejeitar" onclick="desativarUsuario(${usuario.id})" title="Desativar">
                    <i class="fas fa-user-slash"></i>
                </button>
            `;
        } else {
            botoesAcao = `
                <button class="btn-action btn-aprovar" onclick="ativarUsuario(${usuario.id})" title="Ativar">
                    <i class="fas fa-user-check"></i>
                </button>
            `;
        }
        
        botoesAcao += `
            <button class="btn-action btn-editar" onclick="editarUsuario(${usuario.id})" title="Editar">
                <i class="fas fa-edit"></i>
            </button>
        `;
        
        return `
            <tr>
                <td><strong>#${usuario.id}</strong></td>
                <td><strong>${usuario.nome}</strong></td>
                <td>${usuario.email}</td>
                <td><span class="status-badge ${roleClass}">${roleText}</span></td>
                <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                <td>${usuario.total_pistas || 0}</td>
                <td>${dataCriacao}</td>
                <td style="white-space: nowrap;">${botoesAcao}</td>
            </tr>
        `;
    }).join('');
    
    tbody.innerHTML = html;
}

// Desativar usuário
async function desativarUsuario(id) {
    const { value: motivo } = await Swal.fire({
        title: 'Desativar usuário?',
        text: 'O usuário não poderá mais fazer login.',
        icon: 'warning',
        input: 'textarea',
        inputPlaceholder: 'Digite o motivo da desativação...',
        showCancelButton: true,
        confirmButtonText: 'Sim, desativar!',
        cancelButtonText: 'Cancelar',
        inputValidator: (value) => {
            if (!value) {
                return 'Você precisa informar um motivo!';
            }
        }
    });
    
    if (motivo) {
        try {
            const response = await fetch(`/api/admin/desativar-usuario/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ motivo })
            });
            
            const data = await response.json();
            
            if (data.success) {
                Swal.fire('Desativado!', 'O usuário foi desativado com sucesso.', 'success');
                
                // Atualizar no cache
                const usuario = todosUsuarios.find(u => u.id === id);
                if (usuario) usuario.ativo = false;
                
                aplicarFiltrosUsuarios();
            } else {
                Swal.fire('Erro!', data.error, 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            Swal.fire('Erro!', 'Não foi possível desativar o usuário.', 'error');
        }
    }
}

// Ativar usuário
async function ativarUsuario(id) {
    const result = await Swal.fire({
        title: 'Ativar usuário?',
        text: 'O usuário poderá fazer login novamente.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sim, ativar!',
        cancelButtonText: 'Cancelar'
    });
    
    if (result.isConfirmed) {
        try {
            const response = await fetch(`/api/admin/ativar-usuario/${id}`, {
                method: 'POST'
            });
            
            const data = await response.json();
            
            if (data.success) {
                Swal.fire('Ativado!', 'O usuário foi ativado com sucesso.', 'success');
                
                // Atualizar no cache
                const usuario = todosUsuarios.find(u => u.id === id);
                if (usuario) usuario.ativo = true;
                
                aplicarFiltrosUsuarios();
            } else {
                Swal.fire('Erro!', data.error, 'error');
            }
        } catch (error) {
            console.error('Erro:', error);
            Swal.fire('Erro!', 'Não foi possível ativar o usuário.', 'error');
        }
    }
}

function editarUsuario(id) {
    Swal.fire('Em desenvolvimento', 'Funcionalidade de edição será implementada em breve.', 'info');
}
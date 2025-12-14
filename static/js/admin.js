document.addEventListener('DOMContentLoaded', function() {
    carregarEstatisticas();
    carregarPistasPendentes();
});

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
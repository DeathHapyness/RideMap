//Administração de avisos 
document.addEventListener('DOMContentLoaded', function() {
    
    // Botão abrir modal
    const btnNovoAviso = document.getElementById('btnNovoAviso');
    if (btnNovoAviso) {
        btnNovoAviso.addEventListener('click', function() {
            const modal = new bootstrap.Modal(document.getElementById('modalAviso'));
            modal.show();
        });
    }
    
    carregarAvisos();
    
});

async function carregarAvisos() {
    try {
        const response = await fetch('/api/admin/avisos');
        const data = await response.json();
        
        if (data.success) {
            const listaAvisos = document.getElementById('listaAvisos');
            if (listaAvisos) {
                if (data.avisos.length === 0) {
                    listaAvisos.innerHTML = '<p class="text-center text-muted">Nenhum aviso ativo.</p>';
                    return;
                }
                
                let html = '';
                data.avisos.forEach(aviso => {
                    html += `
                        <div class="aviso-card" id="aviso-${aviso.id}">
                            <h5>${aviso.titulo}</h5>
                            <p>${aviso.mensagem}</p>
                            <small class="text-muted">Publicado em: ${new Date(aviso.criado_em).toLocaleDateString('pt-BR')}</small>
                        </div>
                    `;
                });
                listaAvisos.innerHTML = html;
            }
        }
    } catch (error) {
        console.error('Erro ao carregar avisos:', error);
    }
}
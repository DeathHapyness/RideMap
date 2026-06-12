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

document.getElementById('btnSalvarAviso').addEventListener('click', async function() {
  const titulo = document.getElementById('tituloAviso').value;
  const mensagem = document.getElementById('mensagemAviso').value;
  
  if (!titulo || !mensagem) {
    alert('Preencha o título e a mensagem!');
    return;
  }
  
  try {
    const response = await fetch('/api/admin/avisos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, mensagem, tipo: document.getElementById('tipoAviso').value, expira_em: document.getElementById('expira_em').value })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Aviso criado com sucesso!');
      // Fecha o modal
      bootstrap.Modal.getInstance(document.getElementById('modalNovoAviso')).hide(); //**arrumar isso depois
      document.getElementById('tituloAviso').value = '';
      document.getElementById('mensagemAviso').value = '';
      document.getElementById('expira_em').value = '';
      // Recarrega a lista de avisos
      carregarAvisos();
    } else {
      alert('Erro ao criar aviso: ' + data.error);
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao criar aviso');
  }
});

async function carregarAvisos() {
    try {
        const response = await fetch('/api/admin/avisos');
        const data = await response.json();
        console.log(data, "Fazendo,requisição");
        
        if (data.success) {
            const listaAvisos = document.getElementById('listaAvisos');
            if (listaAvisos) {
                console.log(data.avisos, "Carregando avisos");
                if (data.avisos.length === 0) {
                    listaAvisos.innerHTML = '<p class="text-center text-muted">Nenhum aviso ativo.</p>';
                    return;
                }
                
                let html = '';
                data.avisos.forEach(aviso => {
                  html += `
        <div class="aviso-card aviso-${aviso.tipo}" id="aviso-${aviso.id}">
            <h1 style="color: var(--text);">Tipo:${aviso.tipo}</h1>
            <h5 style="color: var(--text);">Aviso:${aviso.titulo}</h5>
            <h5  style="color: var(--text);">Mensagem:${aviso.mensagem}</h5>
            <h5 style="color: var(--orange-end);">Datas:</h5>
            <small class="text-muted">Publicado em: ${new Date(aviso.data_criacao).toLocaleDateString('pt-BR')}</small>
            <small class="text-muted">Expira em: ${new Date(aviso.expira_em).toLocaleDateString('pt-BR')}</small>
            <h5 style="color: var(--text);">ID:${aviso.id}</h5>
                    <p>---------------------------------------</p>
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

document.addEventListener('DOMContentLoaded', async () => {
  
  // Verifica se já mostrou nesta sessão
  const jaExibido = sessionStorage.getItem('popupAvisosExibido');
  
  if (jaExibido) {
    console.log('Popup já foi exibido nesta sessão');
    return; // Para aqui, não faz nada
  }
  
  // Continua normalmente se ainda não exibiu...
  const response = await fetch('/api/admin/avisos');
  const data = await response.json();
  
  if (data.success && data.avisos.length > 0) {
    
    criarModalPopup();
    
    const avisoMaisRecente = data.avisos[0];
    document.getElementById('corpoPopupAviso').innerHTML = `...`;
    
    // Abre
    const modalPopupAviso = new bootstrap.Modal(document.getElementById('modalPopupAviso'));
    modalPopupAviso.show();
    
    // MARCA QUE JÁ EXIBIU
    sessionStorage.setItem('popupAvisosExibido', 'true');
    
    // Barra de progresso...
  }
});


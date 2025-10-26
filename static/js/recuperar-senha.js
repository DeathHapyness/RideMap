document.getElementById('formRecuperarSenha').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('emailRecuperar').value;
    const alertSucesso = document.getElementById('alertSucesso');
    const btnEnviar = e.target.querySelector('.btn-enviar');
    
    btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Enviando...';
    btnEnviar.disabled = true;
    
    try {
        const response = await fetch('/recuperar-senha', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alertSucesso.style.display = 'block';
            document.getElementById('emailRecuperar').value = '';
            
            setTimeout(() => {
                alertSucesso.style.display = 'none';
            }, 5000);
        } else {
            alert(data.error || 'Erro ao enviar email');
        }
        
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao processar solicitação');
    } finally {
        btnEnviar.innerHTML = '<i class="fas fa-paper-plane me-2"></i> Enviar Link de Recuperação';
        btnEnviar.disabled = false;
    }
});
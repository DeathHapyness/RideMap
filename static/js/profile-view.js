// Trocar avatar
const btnTrocarAvatar = document.getElementById('btnTrocarAvatar');
const perfilAvatarInput = document.getElementById('perfilAvatarInput');
const perfilAvatar = document.getElementById('perfilAvatar');

if (btnTrocarAvatar) {
    btnTrocarAvatar.addEventListener('click', () => {
        perfilAvatarInput.click();
    });
}

if (perfilAvatarInput) {
    perfilAvatarInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('avatar', file);

        try {
            Swal.fire({
                title: 'Enviando...',
                allowOutsideClick: false,
                didOpen: () => Swal.showLoading()
            });

            const response = await fetch('/update-avatar', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            
            if (data.success) {
                perfilAvatar.src = data.avatar_url;
                Swal.fire('Sucesso!', 'Foto atualizada!', 'success');
            } else {
                Swal.fire('Erro', data.error || 'Erro ao atualizar foto', 'error');
            }
        } catch (error) {
            Swal.fire('Erro', 'Erro ao atualizar foto', 'error');
        }
    });
}

// Atualizar perfil
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById('perfilNome').value.trim();

        if (!nome || nome.length < 3) {
            Swal.fire('Erro', 'Nome deve ter no mínimo 3 caracteres', 'error');
            return;
        }

        try {
            const response = await fetch('/update-profile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome })
            });

            const data = await response.json();
            
            if (data.success) {
               alert("Perfil atualizado com sucesso!\nRefaça o login para sua nova foto de perfil aparecer");
                location.reload();
            } else {
                alert(data.error || 'Erro ao atualizar perfil');
            }
        } catch (error) {
            Swal.fire('Erro', 'Erro ao atualizar perfil', 'error');
        }
    });
}

// Alterar senha
const passwordForm = document.getElementById('passwordForm');
if (passwordForm) {
    passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const senhaAtual = document.getElementById('senhaAtual').value;
        const novaSenha = document.getElementById('novaSenha').value;
        const confirmarSenha = document.getElementById('confirmarSenha').value;

        if (!senhaAtual || !novaSenha || !confirmarSenha) {
            Swal.fire('Erro', 'Preencha todos os campos', 'error');
            return;
        }

        if (novaSenha !== confirmarSenha) {
            Swal.fire('Erro', 'As senhas não coincidem', 'error');
            return;
        }

        if (novaSenha.length < 8) {
            Swal.fire('Erro', 'Senha deve ter no mínimo 8 caracteres', 'error');
            return;
        }

        try {
            const response = await fetch('/alterar-senha', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ senhaAtual, novaSenha })
            });

            const data = await response.json();
            
            if (data.success) {
                Swal.fire('Sucesso!', 'Senha alterada!', 'success');
                passwordForm.reset();
            } else {
                Swal.fire('Erro', data.error || 'Erro ao alterar senha', 'error');
            }
        } catch (error) {
            Swal.fire('Erro', 'Erro ao alterar senha', 'error');
        }
    });
}
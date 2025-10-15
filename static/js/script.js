const explorarSC = document.getElementById('btnExplorar');
const overley = document.getElementById('overlay-conteudo');
const overlay = document.getElementById('overlay');
const features = document.getElementById('features');
const btnAparecer = document.getElementById('btnAparecer');
const loginScreen = document.getElementById('loginScreen');

//nao mexer,se retirado o botao de reaparecer overley quebra 
btnAparecer.hidden = true;

explorarSC.addEventListener('click', () => {
    overley.hidden = true;
    overlay.hidden = true;
    features.hidden = true;
    btnAparecer.hidden = false;
    if (loginScreen) loginScreen.hidden = true;
});

btnAparecer.addEventListener('click', () => {
    overley.hidden = false;
    overlay.hidden = false;
    features.hidden = false;
    btnAparecer.hidden = true;
});

const btnLoginManual = document.getElementById('btnLoginManual');
const loginContainer = document.getElementById('loginScreen');

btnLoginManual.addEventListener('click', () => {
    loginContainer.hidden = false;
    overlay.hidden = true;
    features.hidden = true;
    overley.hidden = true;
    btnAparecer.hidden = true;
});

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'closeLogin') {
        loginContainer.hidden = true;
        overlay.hidden = false;
        features.hidden = false;
        overley.hidden = false;
        btnAparecer.hidden = true;
    }
});

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Função para verificar se o usuário existe no banco de dados
async function verificarUsuario(email, senha) {
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        return null;
    }
}

// Botão de login
const btnEntrar = document.getElementById('bntEntrar');
if (btnEntrar) {
    btnEntrar.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const email = document.querySelector('.sign-in input[type="email"]').value;
        const senha = document.querySelector('.sign-in input[type="password"]').value;
        
        // Validação simples
        if (!email || !senha) {
            Swal.fire({
                title: 'Atenção',
                text: 'Por favor, preencha todos os campos',
                icon: 'warning'
            });
            return;
        }
        
        // Verifica se o usuário existe no banco
        const usuarioEncontrado = await verificarUsuario(email, senha);
        
        if (!usuarioEncontrado || usuarioEncontrado.error) {
            Swal.fire({
                title: 'Erro',
                text: 'Usuário não encontrado ou senha incorreta.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Se chegou aqui, o usuário existe e a senha está correta
        const userData = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            avatar: usuarioEncontrado.avatar || '/img/default-avatar.png'
        };

        // Salva usuário
        localStorage.setItem('user', JSON.stringify(userData));
        
        // Esconde elementos de login
        loginContainer.hidden = true;
        overlay.hidden = true;
        features.hidden = true;
        overley.hidden = true;
        btnAparecer.hidden = true;
        
        // Mostra menu
        const hamburgerBtn = document.querySelector('.hamburger-btn');
        if (hamburgerBtn) hamburgerBtn.style.display = 'block';
        
        // Atualiza interface
        const userName = document.querySelector('.user-name');
        const userAvatar = document.querySelector('.user-avatar');
        if (userName) userName.textContent = userData.nome;
        if (userAvatar) userAvatar.src = userData.avatar;

        // Mostra mensagem de sucesso
        Swal.fire({
            icon: 'success',
            title: 'Bem-vindo!',
            text: `Olá, ${userData.nome}!`,
            showConfirmButton: false,
            timer: 1500
        });
    });
}

const btnCadastrar = document.querySelector('.sign-up form button[type="button"]');
if (btnCadastrar) {
    btnCadastrar.addEventListener('click', function(e) {
        e.preventDefault();
        const inputs = document.querySelectorAll('.sign-up form input');
        let algumVazio = false;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                algumVazio = true;
                input.classList.add('input-erro');
            } else {
                input.classList.remove('input-erro');
            }
        });

        if (algumVazio) {
            Swal.fire({
                title: 'Atenção',
                text: 'Por favor, preencha todos os campos: Nome, Email e Senha',
                icon: 'warning'
            });
            return;
        }

        // Mostra loading
        Swal.fire({
            title: 'Criando sua conta...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });
        
        setTimeout(() => {
            Swal.fire({
                icon: 'success',
                title: 'Conta criada!',
                text: 'Sua conta foi criada com sucesso. Faça login para continuar.',
                confirmButtonText: 'OK'
            });
            container.classList.remove("active");
        }, 1500);
    });
}

function loadUserProfile() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const userName = document.querySelector('.user-name');
        const userAvatar = document.querySelector('.user-avatar');
        if (userName) userName.textContent = user.nome;
        if (user.avatar && userAvatar) userAvatar.src = user.avatar;
    }
}

//logica de vizualizacao do perfil
function showProfile() {
    const perfilContainer = document.getElementById('perfilContainer');
    if (!perfilContainer) return;

    // Esconde overlay ou seções principais
    overlay.hidden = true;
    features.hidden = true;
    btnAparecer.hidden = false;

    // Mostra o perfil
    perfilContainer.style.display = 'block';

    // Carrega dados do usuário do localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        const perfilNome = document.getElementById('perfilNome');
        const perfilAvatar = document.getElementById('perfilAvatar');
        if (perfilNome) perfilNome.value = user.nome;
        if (perfilAvatar) perfilAvatar.src = user.avatar || '/img/default-avatar.png';
    }
}

function hideProfile() {
    const perfilContainer = document.getElementById('perfilContainer');
    if (perfilContainer) perfilContainer.style.display = 'none';
    overlay.hidden = false;
    features.hidden = false;
    btnAparecer.hidden = true;
}
const explorarSC = document.getElementById('btnExplorar');
const overley = document.getElementById('overlay-conteudo');
const overlay = document.getElementById('overlay');
const features = document.getElementById('features');
const btnAparecer = document.getElementById('btnAparecer');
const loginScreen = document.getElementById('loginScreen');

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
            const error = await response.json();
            return error;
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao verificar usuário:', error);
        return { error: 'Erro ao conectar com o servidor' };
    }
}

const btnEntrar = document.getElementById('bntEntrar');
if (btnEntrar) {
    btnEntrar.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const email = document.querySelector('.sign-in input[type="email"]').value;
        const senha = document.querySelector('.sign-in input[type="password"]').value;
        
        if (!email || !senha) {
            Swal.fire({
                title: 'Atenção',
                text: 'Por favor, preencha todos os campos',
                icon: 'warning'
            });
            return;
        }
        
        const usuarioEncontrado = await verificarUsuario(email, senha);
        
        if (!usuarioEncontrado || usuarioEncontrado.error) {
            Swal.fire({
                title: 'Erro',
                text: usuarioEncontrado?.error || 'Usuário não encontrado ou senha incorreta.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        const userData = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            avatar: usuarioEncontrado.avatar || '/img/default-avatar.png'
        };

        localStorage.setItem('user', JSON.stringify(userData));

        Swal.fire({
            icon: 'success',
            title: 'Bem-vindo!',
            text: `Olá, ${usuarioEncontrado.nome}!`,
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            window.location.href = '/dashboard';
        }, 1500);
    });
}

const btnCadastrar = document.querySelector('.sign-up form button[type="button"]');
if (btnCadastrar) {
    btnCadastrar.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const nome = document.querySelector('.sign-up input[placeholder*="Nome"]').value;
        const email = document.querySelector('.sign-up input[type="email"]').value;
        const senha = document.querySelector('.sign-up input[type="password"]').value;

        if (!nome || !email || !senha) {
            Swal.fire({
                title: 'Atenção',
                text: 'Por favor, preencha todos os campos: Nome, Email e Senha',
                icon: 'warning'
            });
            return;
        }

        Swal.fire({
            title: 'Criando sua conta...',
            allowOutsideClick: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha })
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire({
                    icon: 'success',
                    title: 'Conta criada!',
                    text: 'Sua conta foi criada com sucesso. Faça login para continuar.',
                    confirmButtonText: 'OK'
                });
                container.classList.remove("active");
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: data.error || 'Não foi possível criar a conta. Tente novamente.',
                });
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Não foi possível criar a conta. Tente novamente.',
            });
        }
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

function showProfile() {
    const perfilContainer = document.getElementById('perfilContainer');
    if (!perfilContainer) return;

    overlay.hidden = true;
    features.hidden = true;
    btnAparecer.hidden = false;

    perfilContainer.style.display = 'block';

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

document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
});
console.log('🚀 script.js CARREGADO!');
const explorarSC = document.getElementById('btnExplorar');
const overley = document.getElementById('overlay-conteudo');
const overlay = document.getElementById('overlay');
const features = document.getElementById('features');
const btnAparecer = document.getElementById('btnAparecer');
const loginScreen = document.getElementById('loginScreen');

if (btnAparecer) btnAparecer.hidden = true;

if (explorarSC) {
    explorarSC.addEventListener('click', () => {
        if (overley) overley.hidden = true;
        if (overlay) overlay.hidden = true;
        if (features) features.hidden = true;
        if (btnAparecer) btnAparecer.hidden = false;
        if (loginScreen) loginScreen.hidden = true;
    });
}

if (btnAparecer) {
    btnAparecer.addEventListener('click', () => {
        if (overley) overley.hidden = false;
        if (overlay) overlay.hidden = false;
        if (features) features.hidden = false;
        btnAparecer.hidden = true;
    });
}

const btnLoginManual = document.getElementById('btnLoginManual');
const loginContainer = document.getElementById('loginScreen');

if (btnLoginManual && loginContainer) {
    btnLoginManual.addEventListener('click', () => {
        loginContainer.hidden = false;
        if (overlay) overlay.hidden = true;
        if (features) features.hidden = true;
        if (overley) overley.hidden = true;
        if (btnAparecer) btnAparecer.hidden = true;
    });
}

document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'closeLogin') {
        if (loginContainer) loginContainer.hidden = true;
        if (overlay) overlay.hidden = false;
        if (features) features.hidden = false;
        if (overley) overley.hidden = false;
        if (btnAparecer) btnAparecer.hidden = true;
    }
});

const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

if (registerBtn && container) {
    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });
}

if (loginBtn && container) {
    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });
}

// Função para abrir o modal de registro
function handleRegister() {
    if (container) {
        container.classList.add("active");
    }
}

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
        
        const emailInput = document.querySelector('.sign-in input[type="email"]');
        const senhaInput = document.querySelector('.sign-in input[type="password"]');
        
        if (!emailInput || !senhaInput) return;
        
        const email = emailInput.value;
        const senha = senhaInput.value;
        
        if (!email || !senha) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Atenção',
                    text: 'Por favor, preencha todos os campos',
                    icon: 'warning'
                });
            } else {
                alert('Por favor, preencha todos os campos');
            }
            return;
        }
        
        const usuarioEncontrado = await verificarUsuario(email, senha);
        
        if (!usuarioEncontrado || usuarioEncontrado.error) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Erro',
                    text: usuarioEncontrado?.error || 'Usuário não encontrado ou senha incorreta.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                alert(usuarioEncontrado?.error || 'Usuário não encontrado ou senha incorreta.');
            }
            return;
        }

        // Salvar no localStorage
        const userData = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            avatar: usuarioEncontrado.avatar || '/img/default-avatar.png'
        };

        try {
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
            console.error('Erro ao salvar no localStorage:', e);
        }

        if (typeof Swal !== 'undefined') {
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
        } else {
            window.location.href = '/dashboard';
        }
    });
}

// Função global para login com Google (comentada - implementar com Appwrite no futuro)
function loginWithGoogle() {
    alert('Login com Google será implementado em breve!');
    // TODO: Implementar OAuth2 com Appwrite
}

// Função global para login manual
function handleLogin() {
    const emailInput = document.querySelector('.sign-in input[type="email"]');
    const senhaInput = document.querySelector('.sign-in input[type="password"]');
    if (!emailInput || !senhaInput) return;
    const email = emailInput.value;
    const senha = senhaInput.value;
    if (!email || !senha) {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Atenção',
                text: 'Por favor, preencha todos os campos',
                icon: 'warning'
            });
        } else {
            alert('Por favor, preencha todos os campos');
        }
        return;
    }
    verificarUsuario(email, senha).then(usuarioEncontrado => {
        if (!usuarioEncontrado || usuarioEncontrado.error) {
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Erro',
                    text: usuarioEncontrado?.error || 'Usuário não encontrado ou senha incorreta.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } else {
                alert(usuarioEncontrado?.error || 'Usuário não encontrado ou senha incorreta.');
            }
            return;
        }
        // Salvar no localStorage
        const userData = {
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.nome,
            email: usuarioEncontrado.email,
            avatar: usuarioEncontrado.avatar || '/img/default-avatar.png'
        };
        try {
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
            console.error('Erro ao salvar no localStorage:', e);
        }
        if (typeof Swal !== 'undefined') {
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
        } else {
            window.location.href = '/dashboard';
        }
    });
}

// Usar event delegation no documento para capturar cliques no botão
console.log('Event delegation registrado para cadastro');

document.addEventListener('click', async function(e) {
    console.log('Clique detectado em:', e.target.id, e.target);
    
    // Verificar se o clique foi no botão de cadastrar
    if (e.target && e.target.id === 'btnCadastrar') {
        e.preventDefault();
        console.log('✅ Botão cadastrar clicado!');
        
        const nomeInput = document.getElementById('registerName');
        const emailInput = document.getElementById('registerEmail');
        const senhaInput = document.getElementById('registerPassword');
        
        console.log('Inputs encontrados:', { nomeInput, emailInput, senhaInput });
        
        if (!nomeInput || !emailInput || !senhaInput) {
            console.error('Inputs não encontrados!');
            alert('Erro: Campos não encontrados!');
            return;
        }
        
        const nome = nomeInput.value;
        const email = emailInput.value;
        const senha = senhaInput.value;

        console.log('Valores capturados:', { nome, email, senha });

        if (!nome || !email || !senha) {
            console.warn('Campos vazios!');
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Atenção',
                    text: 'Por favor, preencha todos os campos: Nome, Email e Senha',
                    icon: 'warning'
                });
            } else {
                alert('Por favor, preencha todos os campos: Nome, Email e Senha');
            }
            return;
        }

        console.log('Enviando requisição para /register...');

        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Criando sua conta...',
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        }

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, senha })
            });

            console.log('Resposta recebida:', response.status);
            const data = await response.json();
            console.log('Dados:', data);

            if (response.ok) {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'success',
                        title: 'Conta criada!',
                        text: 'Sua conta foi criada com sucesso. Faça login para continuar.',
                        confirmButtonText: 'OK'
                    });
                } else {
                    alert('Conta criada com sucesso! Faça login para continuar.');
                }
                if (container) container.classList.remove("active");
            } else {
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: data.error || 'Não foi possível criar a conta. Tente novamente.',
                    });
                } else {
                    alert(data.error || 'Não foi possível criar a conta. Tente novamente.');
                }
            }
        } catch (error) {
            console.error('Erro ao cadastrar:', error);
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Não foi possível criar a conta. Tente novamente.',
                });
            } else {
                alert('Não foi possível criar a conta. Tente novamente.');
            }
        }
    }
});

function loadUserProfile() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const userName = document.querySelector('.user-name');
            const userAvatar = document.querySelector('.user-avatar');
            if (userName) userName.textContent = user.nome;
            if (userAvatar && user.avatar) userAvatar.src = user.avatar;
        }
    } catch (error) {
        console.error('Erro ao carregar perfil do localStorage:', error);
    }
}

function showProfile() {
    const perfilContainer = document.getElementById('perfilContainer');
    if (!perfilContainer) return;

    if (overlay) overlay.hidden = true;
    if (features) features.hidden = true;
    if (btnAparecer) btnAparecer.hidden = false;

    perfilContainer.style.display = 'block';

    try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            const perfilNome = document.getElementById('perfilNome');
            const perfilAvatar = document.getElementById('perfilAvatar');
            if (perfilNome) perfilNome.value = user.nome;
            if (perfilAvatar) perfilAvatar.src = user.avatar || '/img/default-avatar.png';
        }
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
    }
}

function hideProfile() {
    const perfilContainer = document.getElementById('perfilContainer');
    if (perfilContainer) perfilContainer.style.display = 'none';
    if (overlay) overlay.hidden = false;
    if (features) features.hidden = false;
    if (btnAparecer) btnAparecer.hidden = true;
}

// Carrega o perfil do usuário quando a página é carregada
document.addEventListener('DOMContentLoaded', () => {
    try {
        loadUserProfile();
    } catch (error) {
        console.error('Erro no DOMContentLoaded:', error);
    }
});
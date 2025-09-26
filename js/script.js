
const explorarSC = document.getElementById('btnExplorar');
const overley = document.getElementById('overlay-conteudo');
const overlay = document.getElementById('overlay');
const features = document.getElementById('features');
const btnAparecer = document.getElementById('btnAparecer');
const loginScreen = document.getElementById('loginScreen');


//nao mexer,se retirado o botao de reaparecer overley quebra 
btnAparecer.hidden = true;


// Esconde overlay, login e features, mostra botão de aparecer
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

// Botão cancelar fecha o modal e volta overlay
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'closeLogin') {
        loginContainer.hidden = true;
        overlay.hidden = false;
        features.hidden = false;
        overley.hidden = false;
        btnAparecer.hidden = true;
    }
});

// funcao para alternar entre login e cadastro
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});


// Função para verificar se os campos estão preenchidos

const btnEntrar = document.querySelector('.sign-in form button[type="button"]');
if (btnEntrar) {
    btnEntrar.addEventListener('click', function(e) {
        e.preventDefault();
        const inputs = document.querySelectorAll('.sign-in form input');
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
            alert('Preencha todos os campos para entrar!');
            return;
        }
    });
}

//funcao para verificar campos de cadastro

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
            alert('Preencha todos os campos para se cadastrar!');
            return;
        }
        // Aqui você pode colocar a lógica de cadastro real
    });
}

function abrirLogin() {
    alert('Função de login com Google não implementada no momento.');
}


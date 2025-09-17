
const explorarSC = document.getElementById('btnExplorar');
const overley = document.getElementById('overlay-conteudo');
const overlay = document.getElementById('overlay');
const features = document.getElementById('features');
const btnAparecer = document.getElementById('btnAparecer');


//nao mexer,se retirado o botao de reaparecer overley quebra 
btnAparecer.hidden = true;

explorarSC.addEventListener('click', () => {
    overley.hidden = true;
    overlay.hidden = true;
    features.hidden = true;
    btnAparecer.hidden = false;
});

btnAparecer.addEventListener('click', () => {
    overley.hidden = false;
    overlay.hidden = false;
    features.hidden = false;
    btnAparecer.hidden = true;
});


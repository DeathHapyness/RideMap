let darkmode = localStorage.getItem('darkmode');
const themeSwitch = document.getElementById('theme-switch');

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.backgroundImage = `linear-gradient(   rgba(223, 223, 223, 0.8), rgba(252, 137, 60, 0.07)), url('/static/img/backgrounds/flechas-dsh-light.jpg')`;
    }
};

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.705), rgba(252, 137, 60, 0.212)), url('/static/img/backgrounds/flechas-dashboard.jpg')`;
    }
};

if(darkmode === 'active'){
    enableDarkMode();
}   

themeSwitch.addEventListener('click', () => {
    darkmode = localStorage.getItem('darkmode');
    darkmode !== 'active' ? enableDarkMode() : disableDarkMode();
});
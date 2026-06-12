const setSidebarMenuIconsColor = (color) => {
    const icons = document.querySelectorAll('.sidebar .menu-item i');
    icons.forEach(icon => icon.style.color = color);
};

const updateThemeIcon = (isDark) => {
    const themeIcon = document.querySelector('#theme-switch i');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    }
};

const enableDarkMode = () => {
    document.body.classList.add('darkmode');
    localStorage.setItem('darkmode', 'active');
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.backgroundImage = `linear-gradient(rgba(2, 2, 2, 0.44), rgba(107, 107, 107, 0.29)), url('/static/img/backgrounds/flechas-dashboard.jpg')`;
        setSidebarMenuIconsColor('white');
    }
    
    if (window.map && window.lightTileLayer && window.darkTileLayer) {
        window.map.removeLayer(window.lightTileLayer);
        window.darkTileLayer.addTo(window.map);
        console.log('Mapa alterado para tema escuro');
    }
    
    updateThemeIcon(true);
    console.log('Dark mode ativado');
};

const disableDarkMode = () => {
    document.body.classList.remove('darkmode');
    localStorage.setItem('darkmode', null);
    
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.style.backgroundImage = `linear-gradient(rgba(255, 255, 255, 0.48), rgba(204, 204, 204, 0.21)), url('/static/img/backgrounds/flechas-dsh-light.jpg')`;
        setSidebarMenuIconsColor('black');
    }
    
    if (window.map && window.lightTileLayer && window.darkTileLayer) {
        window.map.removeLayer(window.darkTileLayer);
        window.lightTileLayer.addTo(window.map);
        console.log('Mapa alterado para tema claro');
    }
    
    updateThemeIcon(false);
    console.log('Dark mode desativado');
};

const toggleDarkMode = () => {
    const currentMode = localStorage.getItem('darkmode');
    if (currentMode === 'active') {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const darkmode = localStorage.getItem('darkmode');
    
    if (darkmode === 'active') {
        enableDarkMode();
    } else {
        
        updateThemeIcon(false);
    }
    
    const themeSwitch = document.getElementById('theme-switch');
    if (themeSwitch) {
        themeSwitch.addEventListener('click', (e) => {
            e.preventDefault();
            toggleDarkMode();
        });
        console.log('Dark mode switch inicializado');
    } else {
        console.warn('Botão de dark mode não encontrado');
    }
});

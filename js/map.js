const map = L.map('map', { minZoom: 4.5 });
map.setView([33.987164, -118.475601], 20);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const meuIcone = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

const pistas = [
    { lat: 33.987164, lng: -118.475601, desc: "Venice Beach Skatepark - Los Angeles, EUA" },
    { lat: 41.5878, lng: -93.6166, desc: "Lauridsen Skatepark - Iowa, EUA" },
    { lat: 48.858844, lng: 2.294351, desc: "Le Dôme Skatepark - Paris, França" },
    { lat: -23.561684, lng: -46.655981, desc: "Pista do Ibirapuera - São Paulo, Brasil" },
    { lat: -33.8688, lng: 151.2093, desc: "Bondi Skatepark - Sydney, Austrália" },
    { lat: 35.6895, lng: 139.6917, desc: "Murasaki Park Tokyo - Japão" },
    { lat: 51.5074, lng: -0.1278, desc: "Southbank Skate Space - Londres, Reino Unido" },
    { lat: 40.4168, lng: -3.7038, desc: "Skatepark Madrid Rio - Espanha" },
    { lat: 55.7558, lng: 37.6173, desc: "Gorky Park Skatepark - Moscou, Rússia" },
    { lat: 52.5200, lng: 13.4050, desc: "Skatehalle Berlin - Alemanha" }
];

for (let i = 0; i < pistas.length; i++) {
    L.marker([pistas[i].lat, pistas[i].lng], { icon: meuIcone }).addTo(map);
    const popupzinho = L.popup();
    popupzinho.setContent(pistas[i].desc);
    L.marker([pistas[i].lat, pistas[i].lng], { icon: meuIcone }).bindPopup(popupzinho).addTo(map);
}

for (let j = 0; j < pistas.length; j++) {
    const lat = pistas[j].lat;
    const lng = pistas[j].lng;
    const desc = pistas[j].desc;
    const marker = L.marker([lat, lng], { icon: meuIcone });
    map.addLayer(marker);
    marker.bindPopup(desc);
}

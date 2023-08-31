const Lokasi=document.getElementById ("map")

fetch("https://demo-tiger.vercel.app/lokasi").then((Tiger)=> {
    return Tiger.json()
}).then((Tiger) => {
    var map = L.map('map').setView(Tiger, 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
var marker = L.marker(Tiger).addTo(map);
});
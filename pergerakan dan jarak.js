const Lokasi = document.getElementById("map");

fetch("https://demo-tiger.vercel.app/history-pergerakan")
  .then((Tiger) => {
    return Tiger.json();
  })
  .then((Tiger) => {
    var map = L.map("map").setView([Tiger[0][0], Tiger[0][1]], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
    var marker = L.polyline(Tiger).addTo(map);
  });

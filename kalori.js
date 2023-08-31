const Kalori = document.getElementById("Kalori");

fetch("https://demo-tiger.vercel.app/kalori")
  .then((Tiger) => {
    return Tiger.json();
  })
  .then((Tiger) => {
    let i = 0;
    setInterval(() => {
      Kalori.innerText = Tiger[i];
      i++;
    }, 1000);
  });

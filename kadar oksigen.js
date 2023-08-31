const Saturasi=document.getElementById ("Saturasi")

fetch("https://demo-tiger.vercel.app/oksigen").then((Tiger)=> {
    return Tiger.json()
}).then((Tiger) => 
{ let i = 0;
    setInterval(() => 
    { Saturasi.innerText = Tiger[i];
    i++ }, 60000);
});
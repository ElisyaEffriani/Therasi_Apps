const Detak_Jantung=document.getElementById ("Detak Jantung")

fetch("https://demo-tiger.vercel.app/bpm").then((Tiger)=> {
    return Tiger.json()
}).then((Tiger) => 
{ let i = 0;
    setInterval(() => 
    { Detak_Jantung.innerText = Tiger[i];
    i++ }, 60000);
});
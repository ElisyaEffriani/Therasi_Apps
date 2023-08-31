// // Variable
// let variable="Welcome"
// console.log(variable);

// //data primitive
// let umur = 16
//  console.log(umur >= 17);

// //Array data modern
//  let Pemenang_KIR=["mulati","brigita","naufal","echa"]
// console.log(Pemenang_KIR[Pemenang_KIR.length-1]);

// // Gabungan Array Object 
// let KIR_SMAVEN = [ 
//     {Nama : "Mulati" ,
//     Judul : "Alga",
//     },
//     {Nama : "Brigita" ,
//     Judul : "Kopi",
//     },
//     {Nama : "Echa" ,
//     Judul : "APGUD",
//     }
// ]
// console.log(KIR_SMAVEN[2].Nama);

// //Program Kondisi
// const Status_Karya = "Submit"
// switch (Status_Karya) {
//     case "Belum jadi":
//         console.log("Segera Selesaikan!");
//         break;
//     case "Progres":
//         console.log("Good, segera submit!");
//             break;
//      case "Submit":
//         console.log("Thank You!");
//             break;
//     default:
//         break;
// }

// // Pengulangan / Looping
// for (let Anggota of KIR_SMAVEN)
// {console.log(Anggota.Nama);
// }

// //Fungsi - Nama_fungsi(parameter)
// function Greetings(Nama) {
//     return "Welcome, "+ Nama + "!" 
// }
// console.log(Greetings(Pemenang_KIR[0]));

// // DOM (docomunet object modal)
// const Data= document.getElementById("Data")
// const Kalori = [ 
//     ["10.05",270],
//     ["10.45",290],
//     ["11.05",300],
// ];
// function tambahElement(Waktu, Kalori) {
// const tr = Data.children[0].cloneNode(true)
// tr.children[0].innerText = Waktu
// tr.children[1].innerText = Kalori + " Cal"
// Data.append(tr)
// }
// for (let Kal of Kalori) {
//     tambahElement(Kal[0], Kal [1])
// }

//http request
const Detak_Jantung=document.getElementById ("Detak Jantung")

fetch("https://demo-tiger.vercel.app/bpm").then((Tiger)=> {
    return Tiger.json()
}).then((Tiger) => 
{ let i = 0;
    setInterval(() => 
    { Detak_Jantung.innerText = Tiger[i];
    i++ }, 1000);
});

const Suhu=document.getElementById ("Suhu")

fetch("https://demo-tiger.vercel.app/suhu").then((Tiger)=> {
    return Tiger.json()
}).then((Tiger) => 
{ let i = 0;
    setInterval(() => 
    { Suhu.innerText = Tiger[i];
    i++ }, 1000);
    console.log(Tiger [0]);
});

const Saturasi=document.getElementById ("Saturasi")

fetch("https://demo-tiger.vercel.app/oksigen").then((Tiger)=> {
    return Tiger.json()
}).then((Tiger) => 
{ let i = 0;
    setInterval(() => 
    { Saturasi.innerText = Tiger[i];
    i++ }, 1000);
});

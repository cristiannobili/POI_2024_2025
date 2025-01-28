import { createNavigator } from './navigator.js';
import { carica, salva, list } from "./carica_salva.js";
import { cTable,cTableAdmin } from './tables.js';
import { createLogin } from './login.js';
import { viewDetails } from './detail.js';

const navigator = createNavigator(document.querySelector('#container'));

//https://postimg.cc/gallery/hX12655
const luoghiModal = document.getElementById("luoghiModal")
const tableCont = document.getElementById('table-container');
const tableContAd = document.getElementById("table-container-ad");
const homeBtn = document.getElementById("home-btn-ad");
const titleModal = document.getElementById("modal-title");
const addPlaceBtn = document.getElementById("add-btn-ad");

// inizializzazione mappa
let zoom = 4;
let maxZoom = 10;
let minZoom = 4;
let map = L.map('map').setView([-27.3585804, 132.5606708], zoom);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: maxZoom,
  minZoom: minZoom,
  attribution:
    '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);



let tokenMap, myToken;
fetch('./conf.json') // carica le variabili da conf.json
  .then((response) => {
    if (!response.ok) {
      console.log('Errore nel caricamento del file JSON');
    }
    return response.json();
  })
  .then((data) => {
    tokenMap = data.tokenMap;
    myToken = data.cacheToken;
    console.log(tokenMap);
    carica().then(() => {
      console.log(list);
      renderLuoghi();
      cTable(tableCont, list, viewDetails);
      cTableAdmin(tableContAd, list, cancella, modifica)
    });
  })
  .catch((error) => console.error('Errore:', error));







//funzione per inviare i dati del form
function SubmForm() {
  let nome = document.getElementById('name').value;
  let descS = document.getElementById('descS').value;
  let descL = document.getElementById('descL').value;
  let foto = document.getElementById('foto').value.split(',');
  let per = document.getElementById('per').value;
  let tipo = document.getElementById('tipo').value;
  let att = document.getElementById('att').value;
  let prz = document.getElementById('prz').value;
  let dur = document.getElementById('dur').value;
  let ff = document.getElementById('ff').value;
  let vic = document.getElementById('vic').value;
  let punt = document.getElementById('punt').value;

  const esitoDiv = document.getElementById('esito');

  if (!nome || !foto || !per || !tipo || !att || !prz || !dur || !ff || !vic || !punt) {
    esitoDiv.innerHTML = '<div class="alert alert-danger">Compila tutti i campi!</div>';
    return;
  }

  let indAU = nome + ', Australia';
  let url = `https://us1.locationiq.com/v1/search?key=${tokenMap}&q=${encodeURIComponent(indAU)}&format=json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.error === 'Unable to geocode') {
        esitoDiv.innerHTML = '<div class="alert alert-danger">Nome non valido o inesistente!</div>';
      } else {
        let lat = data[0].lat;
        let lon = data[0].lon;

        const k = {
          id: uuid.v4(),  //genera un'id unicop
          nome: indAU,
          descS: descS,
          descL: descL,
          foto: foto,
          per: per,
          tipo: tipo,
          att: att,
          prz: prz,
          dur: dur,
          lat: lat,
          lon: lon,
          ff: ff,
          vic: vic,
          punt: punt
        };

        list.push(k);

        salva().then(() => {
          renderLuoghi();
        });

        esitoDiv.innerHTML = '<div class="alert alert-success">Luogo aggiunto con successo!</div>';

        //reset variabili
        document.getElementById('name').value = '';
        document.getElementById('descS').value = '';
        document.getElementById('descL').value = '',
        document.getElementById('foto').value = '';
        document.getElementById('per').value = '';
        document.getElementById('tipo').value = '';
        document.getElementById('att').value = '';
        document.getElementById('prz').value = '';
        document.getElementById('dur').value = '';
        document.getElementById('ff').value = '';
        document.getElementById('vic').value = '';
        document.getElementById('punt').value = '';

        //chiusura modale
        luoghiModal.style.display = 'none';
        document.body.classList.remove('modal-open');
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) {
          backdrop.remove();
        }
        esitoDiv.innerHTML = "";
        cTable(tableCont, list, viewDetails);
        cTableAdmin(tableContAd, list, cancella, modifica)
      }
    })
    .catch(error => {
      console.error("Errore durante il controllo dell'nome:", error);
      esitoDiv.innerHTML = '<div class="alert alert-danger">Si è verificato un errore durante la verifica dell\'nome!</div>';
    });
}




function renderLuoghi() {
  for (let i = 0; i < list.length; i++) {
    let luogo = list[i];
    const coords = [luogo.lat, luogo.lon];
    const marker = L.marker(coords).addTo(map);

    const popupContent = `
        <b> Name:</b> ${luogo.nome}<br>
        <b>Type:</b> ${luogo.tipo}<br>
        <b>Main activities:</b> ${luogo.att}<br>
        <b>Best Season:</b> ${luogo.per}<br>
        <b>Recommended Duration:</b> ${luogo.dur}<br>
        <b>Family-Friendly:</b> ${luogo.ff}<br>
        <a class="view-details-link" onclick="connettiDett('${luogo.id}')">View Details</a>
    `;

    marker.bindPopup(popupContent);
  }
}

function connettiDett(id) {
  window.location.hash = ""; // Resetta l'hash
  window.location.hash = "detail_" + id; // Imposta il nuovo hash
  viewDetails(id);
}
window.connettiDett = connettiDett


//GESTIONE BOTTONI
const filterBtn = document.getElementById('filter-btn');
const resetBtn = document.getElementById('reset-btn');

document.getElementById("submit").onclick = () => {
  SubmForm();
}

filterBtn.onclick = () => { //funzione filtro
  console.log('Funzione filtro');
  let ind1 = document.getElementById('filterS').value;
  console.log(ind1);
  let filteredList = list.filter((k) =>
    k.nome.toLowerCase().includes(ind1.toLowerCase())
  );
  console.log(filteredList);
  cTable(tableCont, filteredList, viewDetails);
  
};
resetBtn.onclick = () => {
  cTable(tableCont, list, viewDetails);
  document.getElementById('filterS').value = '';
};

addPlaceBtn.onclick = () => {
  titleModal.innerHTML = "ADD NEW PLACE"
  //reset variabili ogni volta che viene clickato il tasto ADD
  document.getElementById('name').value = '';
  document.getElementById('descS').value = '';
  document.getElementById('descL').value = '';
  document.getElementById('foto').value = '';
  document.getElementById('per').value = '';
  document.getElementById('tipo').value = '';
  document.getElementById('att').value = '';
  document.getElementById('prz').value = '';
  document.getElementById('dur').value = '';
  document.getElementById('ff').value = '';
  document.getElementById('vic').value = '';
  document.getElementById('punt').value = '';
}

homeBtn.onclick = () => { //sett l'hash alla home
  window.location.hash = 'home';
  document.body.style.overflow = 'auto';
}
function cancella(i){
  list.splice(i, 1);
  salva().then(() =>{
    cTable(tableCont, list, viewDetails);
    cTableAdmin(tableContAd, list, cancella, modifica)
    carica().then(()=>{
      renderLuoghi();
    })
    
  })
  
}

function modifica(i){
  const luogo = list[i];
  document.getElementById('name').value = luogo.nome;
  document.getElementById('descS').value = luogo.descS;
  document.getElementById('descL').value = luogo.descL;
  document.getElementById('foto').value = luogo.foto;
  document.getElementById('per').value = luogo.per;
  document.getElementById('tipo').value = luogo.tipo
  document.getElementById('att').value = luogo.att
  document.getElementById('prz').value = luogo.prz
  document.getElementById('dur').value = luogo.dur
  document.getElementById('ff').value = luogo.ff
  document.getElementById('vic').value = luogo.vic
  document.getElementById('punt').value = luogo.punt
  titleModal.innerHTML = "EDIT PLACE";

  document.getElementById("submit").onclick = () => {
    luogo.nome = document.getElementById('name').value;
    luogo.descS = document.getElementById('descS').value;
    luogo.descL = document.getElementById('descL').value;
    luogo.foto = document.getElementById('foto').value.split(',');
    luogo.per = document.getElementById('per').value;
    luogo.tipo = document.getElementById('tipo').value;
    luogo.att = document.getElementById('att').value;
    luogo.prz = document.getElementById('prz').value;
    luogo.dur = document.getElementById('dur').value;
    luogo.ff = document.getElementById('ff').value;
    luogo.vic = document.getElementById('vic').value;
    luogo.punt = document.getElementById('punt').value;
    luoghiModal.style.display = 'none';
    document.body.classList.remove('modal-open');
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
    salva().then(() =>{
    cTable(tableCont, list, viewDetails);
    cTableAdmin(tableContAd, list, cancella, modifica)
    carica().then(()=>{
      renderLuoghi();
    })
    
  })
}}
createLogin();

window.addEventListener("load", () => { //ogni volta che carica il DOM verifica su che pagina si trovi cosí da generare in caso la pagina di dettaglio (serve per potere salvare la pagiNa di dettglio sei preferiti del browser)
  const currentHash = window.location.hash;

  if (currentHash.includes("#details_")) {
    const id = currentHash.split("_")[1];  
    if (list.length > 0) {// verifico se i dtai sono già disponibili
      viewDetails(id);
    } else { // aspetto che i dati vengano caricati prima di chiamare viewDetails
      carica().then(() => {
        viewDetails(id);
      }).catch(error => {
        console.error("Errore nel caricamento dei dati:", error);
      });
    }
  } else {
    document.getElementById("home").style.display = 'block';
    document.getElementById('details-container').style.display = 'none';
  }
});
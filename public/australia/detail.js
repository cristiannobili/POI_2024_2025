import { carica, salva, list } from "./carica_salva.js"; 

export function viewDetails(id) { // funzione per visualizzare i dettagli di un elemento specifico
    const homePage = document.getElementById("home");
    const detailPageCont = document.getElementById('details-container'); 
    const hash = "details_" + id;  
    console.log(hash);
    window.location.hash = hash; // imposta l'hash specifico del luogo
    homePage.style.display = 'none'; 
    detailPageCont.innerHTML = "";  

    const luogo = list.find(l => l.id === id); // cerco l'elemento nella lista con l'ID corrispondente
    if (luogo) { // se lo trova
        const detailPage = // creo il template
            `<div id="detail_${id}" class="page">
                <div class="container">
                    <div class="header-sp">
                        <h1 class="text-center my-4">${luogo.nome}</h1> <!-- Nome del luogo -->
                        <a href="#home" id="home-btn-ad" class="home-button"> <!-- Bottone per tornare alla home -->
                            <svg class="home-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                            </svg>
                        </a>
                    </div>
                    <main>
                        <div class="content">
                            <div id="myCarousel" class="carousel slide" data-bs-ride="carousel"> <!-- Carousel per le immagini -->
                                <div id="carousel" class="carousel-inner"></div> <!-- Contenitore delle immagini del carousel -->
                                <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Precedente</span> <!-- Bottone precedente -->
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Successivo</span> <!-- Bottone successivo -->
                                </button>
                            </div>
                            <div class="description mt-4">
                                <h2 id="title-sp">${luogo.tipo}</h2> <!-- Tipo del luogo -->
                                <p id="desc-sp">${luogo.descL}</p> <!-- Descrizione del luogo -->
                            </div>
                        </div>
                    </main>
                </div>
            </div>`;

        detailPageCont.innerHTML = detailPage; 

        const carouselInner = document.getElementById('carousel'); 
        luogo.foto.forEach((foto, index) => { // per ogni foto creo una immagine da aggiungere al coarosello
            const activeClass = index === 0 ? 'active' : ''; // imposto la classe active per la prima foto cosí che la mostra per prima
            const imgElement =
                `<div class="carousel-item ${activeClass}">
                    <img src="${foto}" class="d-block w-100 car-img" alt="Immagine ${index + 1}"> 
                </div>`;
            carouselInner.innerHTML += imgElement;
        });

        const homeBtn = document.getElementById("home-btn-ad"); 
        homeBtn.onclick = () => { 
            window.location.hash = "#home"; 
            homePage.style.display = 'block'; 
            detailPageCont.style.display = 'none';
        };
    }
}

window.addEventListener("hashchange", () => { // Ogni volta che cambia l'hash esegue questo codice
    const currentHash = window.location.hash; // prendo l'hash corrente

    const homePage = document.getElementById("home"); 
    const detailPageCont = document.getElementById('details-container'); 

    if (currentHash === "#home") { // se sono nella home mostro la home e nascondo il dettaglio
        homePage.style.display = 'block';
        detailPageCont.style.display = 'none'; 
    } else if (currentHash.includes("#details_")) { //viceversa
        homePage.style.display = 'none'; 
        detailPageCont.style.display = 'block'; 
    }
});


//Faccio la stessa cosa per la prima volta
const currentHash = window.location.hash; // Ottiene l'hash corrente
if (currentHash === "#home") { // Se l'hash è #home
    document.getElementById("home").style.display = 'block'; 
    document.getElementById('details-container').style.display = 'none'; 
} else if (currentHash.includes("#details_")) { // viceversa
    document.getElementById("home").style.display = 'none'; 
    document.getElementById('details-container').style.display = 'block'; 
}

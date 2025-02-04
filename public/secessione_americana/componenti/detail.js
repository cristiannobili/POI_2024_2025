export const createDetail = (parentElement) => {
    let data= [];
    let inizioIndex=0;
    const self = {
        setData: (dato) => {
            data = dato;
        },
        navigateToDetail: (id) => {
            // Aggiorna l'URL con l'ID del posto
            window.history.pushState({}, "", `#Posto+${id}`); 
            inizioIndex = data.findIndex((d) => d.name.id === id);
            console.log(inizioIndex)
            console.log(data)  
            let URL = window.location.href
            URL = URL.split("#Posto+")
            console.log(URL)
            const page = document.getElementById("Posto");
            const home = document.getElementById("home");
            const admin = document.getElementById("admin")
            if (URL[1]!=""){
            if (page) {
                page.classList.remove("hidden");
                page.classList.add("visible");
                home.classList.remove("visible");
                home.classList.add("hidden");
            }
            // Ora carichiamo i dettagli specifici del posto
            console.log(data)
            const item = data.find(d => d.name.id.split("-")[0] === URL[1].split("-")[0]);
            if (item) {
                console.log(item)
                const template = `
                    <div class="container mt-5">
                        <header class="mb-4">
                            <div class="d-flex justify-content-between align-items-center">
                                <h1 class="titoloClass">${item.name.Titolo}</h1>
                                <a href="" class="btn btn-outline-secondary"><- Torna ad HOME</a>
                            </div>
                        </header>
                        <div class="row">
                            <div class="col-md-1">
                                <button type="button" id="indietro" >indietro</button>
                            </div>
                            <div class="col-md-7">
                                <section class="mb-4">
                                    <h2 class="h5 mt-3 txt-bold">Descrizione</h2>
                                    <p class="mt-3">${item.name.Paragrafo_1}</p>
                                </section>
                                <section class="mb-4">
                                    <h2 class="h5 mt-3 txt-bold">Conseguenze</h2>
                                    <p class="mt-3">${item.name.Paragrafo_2}</p>
                                </section>
                                <section class="mb-4">
                                    <h2 class="h5 mt-3 txt-bold">Riflessioni</h2>
                                    <p class="mt-3">${item.name.Paragrafo_3}</p>
                                </section>
                            </div>
                            <div class="col-md-3">
                                <div class="">
                                    <span class="text-center">
                                        <img src="${item.name.Immagine_1}" alt="${item.name.Titolo}" class="immaginiDetail img-hover-shadow mt-3" />
                                    </span>
                                </div>
                            </div>
                            <div class="col-md-1">
                                <button type="button" id="avanti">avanti</button>
                            </div>
                        </div>
                    </div>`;
                
                // Carica il template all'interno del div della pagina
                page.innerHTML = template;
                document.querySelector("#indietro").onclick = () => {
                    self.indietro()
                }
                document.querySelector("#avanti").onclick = () => {
                    self.avanti()
                }
            }
            else if(URL[1]=="" || URL[1]=="home"){
                if (page) {
                    console.log(URL[1])
                    home.classList.remove("hidden");
                    home.classList.add("visible");
                    page.classList.remove("visible");
                    page.classList.add("hidden");
                    admin.classList.remove("visible");
                    admin.classList.add("hidden");
                }
            }
            else if(URL[1]=="admin"){
                if (page) {
                    console.log(URL[1])
                    admin.classList.remove("hidden");
                    admin.classList.add("visible");
                    page.classList.remove("visible");
                    page.classList.add("hidden");
                    home.classList.remove("visible");
                    home.classList.add("hidden");
                }
            }
            }     
        },
        avanti:()=> {if ((inizioIndex + 1) <= data.length) {
            inizioIndex += 1 
            console.log(data,inizioIndex)
            const id=data[inizioIndex].name.id
            self.navigateToDetail(id)
        }},
        indietro:()=> {if ((inizioIndex - 1) >= 0) {
            inizioIndex -= 1 
            const id=data[inizioIndex].name.id
            self.navigateToDetail(id)
        }},
    };
    return self;
};


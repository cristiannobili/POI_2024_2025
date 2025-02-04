export const createDetail = (parentElement) => {
    let data = [];
    let inizioIndex = 0;
    const self = {
        render: () => {
            const urlNow = window.location.href;
            const id = urlNow.split("#")[1]; 
            const item = data.find((d) => d.id === id);
            if (item) {
                const template = `
                    <div class="container mt-5">
                        <header class="mb-4">
                            <div class="d-flex justify-content-between align-items-center">
                                <h1 class="h3 mt-3">${item.Titolo}</h1>
                                <a href="index.html" class="btn btn-outline-secondary">Torna ad HOME</a>
                            </div>
                        </header>

                        <div class="row">
                            <div class="col-md-8">
                                <section class="mb-4">
                                    <h2 class="h5 mt-3">Descrizione</h2>
                                    <p class="mt-3">${item.Paragrafo_1}</p>
                                </section>
                                <section class="mb-4">
                                    <h2 class="h5 mt-3">Conseguenze</h2>
                                    <p class="mt-3">${item.Paragrafo_2}</p>
                                </section>
                                <section class="mb-4">
                                    <h2 class="h5 mt-3">Riflessioni</h2>
                                    <p class="mt-3">${item.Paragrafo_3}</p>
                                </section>
                            </div>
                            <div class="col-md-4">
                                <div  id="carosello" class="border rounded bg-light d-flex align-items-center justify-content-center">
                                    <table>
                                        <tr>
                                            <td><button type="button" class="btn btn-secondary">&#8592</button></td>

                                            <td>
                                                <img src="assets/ContenutoImg/Appomattox .png">
                                            </td>

                                            <td><button type="button" class="btn btn-secondary">&#8594</button></td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>`;
                parentElement.innerHTML = template;
            } else {
                parentElement.innerHTML = `
                    <div class="container mt-5 text-center">
                        <h1 class="h3">Dettaglio non trovato</h1>
                        <p>Il contenuto richiesto non è disponibile.</p>
                        <a href="index.html" class="btn btn-outline-secondary">Torna ad HOME</a>
                    </div>`;
            }
        },
        setData: (dato) => {
            data = dato;
        },
        navigateToDetail: (id) => {
            // Aggiorna l'URL con l'ID del posto
            window.history.pushState({}, "", `#${id}`); 
            inizioIndex = data.findIndex((d) => d.name.id === id);
            console.log(inizioIndex)
            console.log(data)       
        },
        avanti:()=> {if ((inizioIndex + 1) <= data.length) {inizioIndex += 5}},
        indietro:()=> {if ((inizioIndex - 1) >= 0) {inizioIndex -= 5}},
    };
    return self;
};


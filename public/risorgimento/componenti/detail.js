export const createDetail = (parentElement) => {
    const divdetail = document.querySelector("#detail");
    divdetail.classList.add("hidden");
    let data = [];
    
    return {
        setData: (datomappa) => {
            data = datomappa;
        },
        render: (id) => {
            const selectedData = data.find((d) => d.name.id == id);

            document.querySelectorAll('.page').forEach((page) => {
                page.classList.add('hidden');
            });

            parentElement.classList.remove('hidden');

            if (selectedData) {
                const template = 
    '<div class="container-detail">' +
        '<div class="row">' +
            '<div class="col-md-6">' +
                '<div id="carousel" class="carousel slide" data-bs-ride="carousel">' +
                    '<div class="carousel-inner">' +
                        '<div class="carousel-item active">' +
                            '<img src="' + selectedData.name.url_foto1 + '" class="d-block w-100" alt="...">' +
                        '</div>' +
                        '<div class="carousel-item">' +
                            '<img src="' + selectedData.name.url_foto2 + '" class="d-block w-100" alt="...">' +
                        '</div>' +
                        '<div class="carousel-item">' +
                            '<img src="' + selectedData.name.url_foto3 + '" class="d-block w-100" alt="...">' +
                        '</div>' +
                        '<div class="carousel-item">' +
                            '<img src="' + selectedData.name.url_foto4 + '" class="d-block w-100" alt="...">' +
                        '</div>' +
                        '<div class="carousel-item">' +
                            '<img src="' + selectedData.name.url_foto5 + '" class="d-block w-100" alt="...">' +
                        '</div>' +
                    '</div>' +
                    '<button class="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">' +
                        '<span class="carousel-control-prev-icon" aria-hidden="true"></span>' +
                        '<span class="visually-hidden">Previous</span>' +
                    '</button>' +
                    '<button class="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">' +
                        '<span class="carousel-control-next-icon" aria-hidden="true"></span>' +
                        '<span class="visually-hidden">Next</span>' +
                    '</button>' +
                '</div>' +
            '</div>' +

            '<div class="col-md-6">' +
                '<div class="info-box">' +
                    '<a href="#home">' +
                        '<button class="close">⬅️</button>' +
                    '</a>' +
                    '<h2 style="font-family: "Liter", serif;"><strong></strong> ' + selectedData.name.titolo + '</p>' +
                    '<p style="font-family: Hall Fetica, sans-serif;"><strong>Anno:</strong> ' + selectedData.name.anno + '</p>' +
                    '<p style="font-family: Hall Fetica, sans-serif;"><strong>Durata:</strong> ' + selectedData.name.durata + '</p>' +
                    '<p style="max-height: 150px; overflow-y: auto;font-family: Hall Fetica; sans-serif;"><strong>Descrizione:</strong> ' + selectedData.name.descrizione + '</p>' +
                    '<p style="font-family: Hall Fetica, sans-serif;"><strong>Personaggi chiave:</strong> ' + selectedData.name.personaggi + '</p>' +
                    '<p style="font-family: Hall Fetica, sans-serif;"><strong>Fazioni:</strong> ' + selectedData.name.fazioni + '</p>' +
                    '<p style="font-family: Hall Fetica, sans-serif;"><strong>Vittime:</strong> ' + selectedData.name.vittime + '</p>' +
                    '<p style="font-family: Hall Fetica, sans-serif;"><strong>Feriti:</strong> ' + selectedData.name.feriti + '</p>' +
                    '<p style="font-family: Hall Fetica, sans-serif;"><strong>Conseguenze:</strong> ' + selectedData.name.conseguenze + '</p>' +
                '</div>' +
            '</div>' +
        '</div>' +
    '</div>';
                parentElement.innerHTML = template;
            } else {
                parentElement.innerHTML = `
                    <div class="container mt-5">
                        <h1 class="h3 text-danger">Dettaglio non trovato</h1>
                        <a href="#home" class="btn btn-primary mt-3">Torna ad HOME</a>
                    </div>`;
            }
        },
    };
};
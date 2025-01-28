export const createMap = () => {
    let places = []; // Lista di tutti i luoghi

    // Inizializza la mappa centrata
    const map = L.map('map').setView([45, 8], 5);

    // Aggiungi i tile alla mappa
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    return {
        setData: (datomappa) => {
            places = datomappa; // Aggiorna la lista dei luoghi
        },
        render: () => {//aggiorna la mappa
            places.forEach(place => {
                const marker = L.marker(place.coords).addTo(map);//crea popup
                marker.bindPopup(`
                    <b><a href="#detail_${place.name.id}">${place.name.luogo}</a></b><br>
                    Titolo: ${place.name.titolo}<br>
                    Anno: ${place.name.anno}<br>
                    Durata: ${place.name.durata}<br>
                    Personaggi: ${place.name.personaggi}<br>
                    Fazioni: ${place.name.fazioni}<br>
                    Vittime: ${place.name.vittime}<br>
                    Feriti: ${place.name.feriti}
                `);
            });
        },
    };
};
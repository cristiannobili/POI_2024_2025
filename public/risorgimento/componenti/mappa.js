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
                    <b style="font-family: Ragilen, sans-serif;"><a href="#detail_${place.name.id}">${place.name.luogo}</a></b><br>
                    <span style="font-family: Ragilen, sans-serif;">Titolo: ${place.name.titolo}</span><br>
                    <span style="font-family: Ragilen, sans-serif;">Anno: ${place.name.anno}</span><br>
                    <span style="font-family: Ragilen, sans-serif;">Durata: ${place.name.durata}</span><br>
                    <span style="font-family: Ragilen, sans-serif;">Personaggi: ${place.name.personaggi}</span><br>
                    <span style="font-family: Ragilen, sans-serif;">Fazioni: ${place.name.fazioni}</span><br>
                    <span style="font-family: Ragilen, sans-serif;">Vittime: ${place.name.vittime}</span><br>
                    <span style="font-family: Ragilen, sans-serif;">Feriti: ${place.name.feriti}</span>
                `);
            });
        },
    };
};
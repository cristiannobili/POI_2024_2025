export const createMap = () =>{
    let minZoom=4;
    let zoom = 4;
    let maxZoom = 5;
    let map = L.map('map').setView([37.697948,-97.314835], zoom);
    let places = [];
     return{
        setData: (dato) =>{places=dato},
        add: (dato) =>{
                map.setView(dato.coords, zoom);
                places.push(dato);
            },
        render: (detailComp) => {
            L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
               maxZoom: maxZoom,
               minZoom: minZoom
               //attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            places.forEach((place) => {
                let iconaBattaglia = L.icon({
                    iconUrl: 'war2.png',
                    iconSize: [40, 40],
                    iconAnchor: [22, 94],
                    popupAnchor: [-3, -76],
                    shadowSize: [68, 95],
                    shadowAnchor: [22, 94]
                });
                const marker = L.marker(place.coords, {icon: iconaBattaglia}).addTo(map);
                marker.bindPopup(`
                    <h4 id="${place.name.id}">${place.name.Titolo}</h4>
                    <p>Data: ${place.name.Datainizio}</p>
                    <p>Ora: ${place.name.Datafine}</p>
                    <p>N° Feriti: ${place.name.feriti}</p>
                    <p>N° Morti: ${place.name.morti}</p>
                `);
                
                marker.on("mouseover", () => {
                    marker.openPopup();
                });
                marker.on("mouseout", () => {
                    marker.closePopup();
                });
                marker.on("click", () => {
                    detailComp.navigateToDetail(place.name.id);
                });

            });
     }
    }
}
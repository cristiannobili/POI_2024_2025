//import { v4 as uuidv4 } from 'uuid';
import { v4 as uuidv4 } from 'https://cdn.jsdelivr.net/npm/uuid@9.0.0/dist/esm-browser/index.js';


export const createForm = (parentElement) => {

    return { 
        render: (form,table1, mappa, conf,compFetch, tabellaAdmin,detailComp) => {
            //creazione input
            parentElement.innerHTML = 
                `<div>Posizione 📍<br/><input id="Posizione" type="text" class="form-control"/></div>`+
                `<div>Titolo <br/><input id="Titolo" type="text" class="form-control"/></div>`+
                `<div>Data di inizio <br/><input id="Data_inizio" type="date" class="form-control"/></div>`+
                `<div>Data di fine <br/><input id="Data_fine" type="date" class="form-control"/></div>`+
                `<div>Paragrafo 1<br/><input id="Paragrafo_1" type="text" class="form-control"/></div>`+
                `<div>Paragrafo 2<br/><input id="Paragrafo_2" type="text" class="form-control"/></div>`+
                `<div>Paragrafo 3<br/><input id="Paragrafo_3" type="text" class="form-control"/></div>`+
                `<div>Numero feriti<br/><input id="Feriti" type="number" class="form-control"/></div>`+
                `<div>Numero morti <br/><input id="Morti" type="number" class="form-control"/></div>`+
                `<div>immagine 1<br/><input id="Immagine_1" type="text" class="form-control"/></div>`+
                `<div>immagine 2<br/><input id="Immagine_2" type="text" class="form-control mb-3"/></div>`+
                `<div id="outputform"></div>`
            //lettura valori inseriti;
            document.querySelector("#Aggiungi").onclick = () => {
                const Posizione = document.querySelector("#Posizione").value;
                const Titolo = document.querySelector("#Titolo").value;
                const Datainizio = document.querySelector("#Data_inizio").value;
                const Datafine = document.querySelector("#Data_fine").value;
                const Paragrafo_1 = document.querySelector("#Paragrafo_1").value;
                const Paragrafo_2 = document.querySelector("#Paragrafo_2").value;
                const Paragrafo_3 = document.querySelector("#Paragrafo_3").value;
                const feriti = document.querySelector("#Feriti").value;
                const morti = document.querySelector("#Morti").value;
                const Immagine_1 = document.querySelector("#Immagine_1").value;
                const Immagine_2 = document.querySelector("#Immagine_2").value;
                if (Titolo === "" || Posizione === "" || Datafine === "" || Datainizio ==="") {
                    // LUTENTE NON HA INSERITO CORRETTAMENTE I DATI
                    outputform.innerHTML="ko";
                }else{
                    const adesso = new Date();
                    const [anno, mese, giorno] = Datainizio.split("-");
                    const dataInput = new Date(anno, mese-1, giorno, 0, 0, 0, 0);
                    const [anno1,mese1,giorno1] = Datafine.split("-");
                    const dataInput1 = new Date(anno1, mese1-1, giorno1, 0, 0, 0, 0);
                    if (dataInput < adesso && dataInput1 < adesso && dataInput <= dataInput1){
                        outputform.innerHTML="ok"; 
                        const idunico = uuidv4();//ID GENERATO CASUALMENTE 
                        const dataDiz = {
                            "id" : idunico,
                            "Posizione" : Posizione,
                            "Titolo" : Titolo,
                            "Datainizio" : Datainizio,
                            "Datafine" : Datafine,
                            "Paragrafo_1" : Paragrafo_1,
                            "Paragrafo_2" : Paragrafo_2,
                            "Paragrafo_3" : Paragrafo_3,
                            "feriti" : feriti,
                            "morti" : morti,
                            "Immagine_1" : Immagine_1,
                            "Immagine_2" : Immagine_2
                        }
                        let url="https://us1.locationiq.com/v1/search?key=%TOKEN &q=%NOME, &format=json&"
                        url = url.replace("%TOKEN",conf.token)
                        url = url.replace("%NOME",Posizione)
                        fetch(url)
                        .then(r => r.json())
                        .then(data => {
                            const dato ={
                                name: dataDiz,
                                coords: [data[0].lat, data[0].lon]
                            }
                            //if(data[0].display_name.toLowerCase().includes("milano") && data[0].lat <= 45.6174047 && data[0].lat >= 45.1821072 && data[0].lon <= 9.4936171 && data[0].lon >= 8.7253673){
                            table1.addData(dato,compFetch);
                            table1.render();
                            mappa.add(dato);
                            mappa.render(detailComp);
                            console.log(dato)
                            tabellaAdmin.addData(dato)
                            tabellaAdmin.render(conf,form,tabellaAdmin,mappa,table1,detailComp)
                            outputform.innerHTML="ok";
                            //}else{
                                //outputform.innerHTML="ko";
                            //}
                        })
                    } else {
                        outputform.innerHTML="DATA INVALIDA";
                    }
                    document.querySelector("#Posizione").value = "";
                    document.querySelector("#Titolo").value = "";
                    document.querySelector("#Data_inizio").value = "";
                    document.querySelector("#Data_fine").value = "";
                    document.querySelector("#Paragrafo_1").value = "";
                    document.querySelector("#Paragrafo_2").value = "";
                    document.querySelector("#Paragrafo_3").value = "";
                    document.querySelector("#Feriti").value = "";
                    document.querySelector("#Morti").value = "";
                    document.querySelector("#Immagine_1").value = "";
                    document.querySelector("#Immagine_2").value = "";
                }
            }
        }
    }
}
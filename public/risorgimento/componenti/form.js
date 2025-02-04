export const createForm = (parentElement, Map,tableComponent) => {
    let dato_lista = []; //lista generale
    let callback = null;


    let token_mappe = "";

    fetch("conf.json").then(r => r.json()).then(conf => {//fa fetch a conf per prendere il token per ottenere la lat e long di un posto
        token_mappe = conf.token;
    });
    return {
        setLabels: (labels) => {
            dato_lista = labels;
        },
        onsubmit: (callbackInput) => {
            callback = callbackInput;
        },
        render: (table1, compFetch, mappe) => {
            parentElement.innerHTML =//creazione campi di input
                `<div class="mb-3"><input type="text" class="form-control" name="luogo" id="luogo" placeholder="Inserisci il luogo"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="titolo" id="titolo" placeholder="Inserisci un titolo"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="anno" id="anno" placeholder="Inserisci un anno"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="durata" id="durata" placeholder="Inserisci una durata"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="descrizione" id="descrizione" placeholder="Inserisci una descrizione"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="personaggi" id="personaggi" placeholder="Inserisci i personaggi chiave"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="fazioni" id="fazioni" placeholder="Inserisci le fazioni coinvolte"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="vittime" id="vittime" placeholder="Inserisci le vittime"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="feriti" id="feriti" placeholder="Inserisci i feriti"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="conseguenze" id="conseguenze" placeholder="Inserisci le conseguenze"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="url_foto1" id="url_foto1" placeholder="Inserisci url foto 1"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="url_foto2" id="url_foto2" placeholder="Inserisci url foto 2"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="url_foto3" id="url_foto3" placeholder="Inserisci url foto 3"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="url_foto4" id="url_foto4" placeholder="Inserisci url foto 4"></div>` +
                `<div class="mb-3"><input type="text" class="form-control" name="url_foto5" id="url_foto5" placeholder="Inserisci url foto 5"></div>` +
                `<div id="outputform1"></div>` +
                `<button id="Aggiungi" style="background-color:rgb(31, 166, 214); color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-size: 16px; transition: background-color 0.3s ease;">Aggiungi</button>`


            document.querySelector("#Aggiungi").onclick = () => {//premo pulsante aggiungi
                //leggo cosa inserisce utente
                const luogo = document.querySelector("#luogo").value;
                const titolo = document.querySelector("#titolo").value;
                let anno = document.querySelector("#anno").value;
                const durata = document.querySelector("#durata").value;
                const descrizione = document.querySelector("#descrizione").value;
                const personaggi = document.querySelector("#personaggi").value;
                const fazioni = document.querySelector("#fazioni").value;
                const vittime = document.querySelector("#vittime").value;
                const feriti = document.getElementById("feriti").value;
                const conseguenze = document.getElementById("conseguenze").value;
                const url_foto1 = document.getElementById("url_foto1").value;
                const url_foto2 = document.getElementById("url_foto2").value;
                const url_foto3 = document.getElementById("url_foto3").value;
                const url_foto4 = document.getElementById("url_foto4").value;
                const url_foto5 = document.getElementById("url_foto5").value;
                const id = uuid.v4();//creo id tramite la libreria uuid
                //controllo se sono pieni i campi obbligatori
                if (luogo === "" || titolo === "" || anno === "" || durata === "" || descrizione === "" || personaggi === "" || fazioni === "" || vittime === "" || feriti === "" || conseguenze === "" || url_foto1 === "" || url_foto2 === "" || url_foto3 === "" || url_foto4 === "" || url_foto5 === "") {
                    outputform.innerHTML = "KO - Campi obbligatori mancanti";
                }
                else {
                    //creo dizionario
                    const datodizionario = {
                        "luogo": luogo,
                        "titolo": titolo,
                        "anno": anno,
                        "durata": durata,
                        "descrizione": descrizione,
                        "personaggi": personaggi,
                        "fazioni": fazioni,
                        "vittime": vittime,
                        "feriti": feriti,
                        "conseguenze": conseguenze,
                        "url_foto1": url_foto1,
                        "url_foto2": url_foto2,
                        "url_foto3": url_foto3,
                        "url_foto4": url_foto4,
                        "url_foto5": url_foto5,
                        "id": id
                    };
                    //faccio fetch a servizio per lat e lon
                    const template = "https://us1.locationiq.com/v1/search?key=%TOKEN&q=%LUOGO&format=json&";
                    let url = template.replace("%LUOGO", luogo).replace("%TOKEN", token_mappe);
                    fetch(url)
                        .then(response => response.json())
                        .then(data => {
                            //creo datomappa
                            const datomappa={//creo dato formato sa name che continene i parametri della form e coords ha le coordinate
                                name: datodizionario,
                                coords:[data[0].lat, data[0].lon]
                            }
                            dato_lista.push(datomappa);//lo pusha dentro la lista
                            //faccio set
                            compFetch.setData(dato_lista).then(data => {//faccio la fetch per fare set della cache remota
                                compFetch.getData().then(result=>{//faccio get per cache remota
                                    dato_lista=result
                                    table1.setData(result)
                                    table1.render()
                                    Map.setData(result)
                                    Map.render()
                                })
                            })
                            outputform.innerHTML = "KO - Campi obbligatori mancanti";
                        });    
                    

                    //azzero campi
                    document.querySelector("#luogo").value = "";
                    document.querySelector("#titolo").value = "";
                    document.querySelector("#anno").value = "";
                    document.querySelector("#durata").value = "";
                    document.querySelector("#descrizione").value = "";
                    document.querySelector("#personaggi").value = "";
                    document.querySelector("#fazioni").value = "";
                    document.querySelector("#vittime").value = "";
                    document.querySelector("#feriti").value = "";
                    document.querySelector("#vittime").value = "";
                    document.querySelector("#conseguenze").value = "";
                    document.querySelector("#url_foto1").value = "";
                    document.querySelector("#url_foto2").value = "";
                    document.querySelector("#url_foto3").value = "";
                    document.querySelector("#url_foto4").value = "";
                    document.querySelector("#url_foto5").value = "";
                }
                

                // Resetta i campi
                document.querySelector("#luogo").value = "";
                document.querySelector("#titolo").value = "";
                document.querySelector("#anno").value = "";
                document.querySelector("#durata").value = "";
                document.querySelector("#descrizione").value = "";
                document.querySelector("#personaggi").value = "";
                document.querySelector("#fazioni").value = "";
                document.querySelector("#vittime").value = "";
                document.querySelector("#feriti").value = "";
                document.querySelector("#vittime").value = "";
                document.querySelector("#conseguenze").value = "";
                document.querySelector("#url_foto1").value = "";
                document.querySelector("#url_foto2").value = "";
                document.querySelector("#url_foto3").value = "";
                document.querySelector("#url_foto4").value = "";
                document.querySelector("#url_foto5").value = "";
            }
        }
    };
};  
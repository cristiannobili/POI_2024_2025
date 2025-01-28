export const tableComponent = () => {//compoennte per tabella home
    let data = [];
    //template per ogni riga conh href sul titolo
    let templateRow = `
    <tr class="tbl1">
        <td><a href="#detail_#D10">#D1</a></td>
        <td>#D2</td>
        <td>#D3</td>
        <td>#D4</td>            
    </tr>
    `;

    let parentElement;

    return {
        setData: (datomappa) => {
            data = datomappa; 
        },
        setParentElement: (pr) => {
            parentElement = pr;  
        },
        render: () => {
            //creo il table head
            let html = `
                <table class="tbl1">
                    <thead>
                        <tr class="border">
                            <th>Titolo</th>
                            <th>Anno</th>
                            <th>Personaggi</th>
                            <th>Fazioni</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            //faccio ciclo for e sostituisco i valori che mi interessano nella riga della tabella
            data.forEach((elemento) => {
                let row = templateRow
                    .replace("#D10", elemento.name.id)    
                    .replace("#D1", elemento.name.titolo)  
                    .replace("#D2", elemento.name.anno)    
                    .replace("#D3", elemento.name.personaggi) 
                    .replace("#D4", elemento.name.fazioni); 
                html += row;
            });

            html += `</tbody></table>`;

            // Inserisce html nella pagina
            parentElement.innerHTML = html;
        },
    };
};

export const tableComponent2 = (Map,compFetch,table1,table2) => {//componente per tabella admin
    let data = [];
    let parentElement;
    let formContainer;

    return {
        setData: (datomappa) => {
            data = datomappa;
        },
        addData: (datomappa) => {
            data.push(datomappa);
        },
        setParentElement: (pr) => {
            parentElement = pr;
        },
        getData: () => data,
        render: () => {
            //creo table head 
            let html = `
                <table class="tbl1">
                    <thead>
                        <tr class="border">
                            <th>Titolo</th>
                            <th>Interazioni</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            data.forEach((elemento, i) => { // scorre tutta la lista e sostituisce i valori che mi interessano e crea anche i bottoni modifica e elimina con id assegnati con ciclo for
                let templateRow = `
                <tr class="tbl1">
                    <td><a href="#detail_${elemento.name.id}">${elemento.name.titolo}</a></td>
                    <td>
                        <button class="edit-btn" id="bottonemodifica${i}">Modifica</button>
                        <button class="delete-btn" id="bottoneelimina${i}">Elimina</button>
                    </td>
                </tr>
                `;
                html += templateRow;
            });

            html += `</tbody></table>`;
            parentElement.innerHTML = html;

            // Aggiungi i listener per i pulsanti dopo il rendering
            data.forEach((_, i) => {//assegno ad ogni bottone onclick e per ogni funzione
                document.getElementById(`bottoneelimina${i}`).onclick = () => cancella(i);
                document.getElementById(`bottonemodifica${i}`).onclick = () => modifica(i);
            });
        },
        
    };

    function cancella(i) {//funzione per cancellare e riceve come indice il valore del bottone
        data.splice(i, 1); // Rimuove l'elemento alla posizione i
        compFetch.setData(data).then(() => {
            compFetch.getData().then((result) => {
                table1.setData(result); 
                table1.render();         // Fa render tabella
                Map.setData(result);     // Aggiorna la mappa
                Map.render();            // Rende la mappa aggiornata
                table2.setData(result);  // Aggiorna table2 con i dati più recenti
                table2.render();
            });
        });
    }
    function modifica(i) {//funzione per modificare
        const elemento = data[i];  // Trova l'elemento corrispondente all'indice i
        cancella(i);//chiama cancella per non avere doppioni della stesso punto di interesse
        // Riempi di nuovo i campi di input della form 
        document.querySelector("#luogo").value = elemento.name.luogo;
        document.querySelector("#titolo").value = elemento.name.titolo;
        document.querySelector("#anno").value = elemento.name.anno;
        document.querySelector("#durata").value = elemento.name.durata;
        document.querySelector("#descrizione").value = elemento.name.descrizione;
        document.querySelector("#personaggi").value = elemento.name.personaggi;
        document.querySelector("#fazioni").value = elemento.name.fazioni;
        document.querySelector("#vittime").value = elemento.name.vittime;
        document.querySelector("#feriti").value = elemento.name.feriti;
        document.querySelector("#conseguenze").value = elemento.name.conseguenze;
        document.querySelector("#url_foto1").value = elemento.name.url_foto1;
        document.querySelector("#url_foto2").value = elemento.name.url_foto2;
        document.querySelector("#url_foto3").value = elemento.name.url_foto3;
        document.querySelector("#url_foto4").value = elemento.name.url_foto4;
        document.querySelector("#url_foto5").value = elemento.name.url_foto5;
    }
};


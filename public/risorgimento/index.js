const tabella = document.getElementById("tabella"); //legge div tabella
const tabella2 = document.getElementById("tabella2"); //legge di tabella 2
const paginadetail = document.getElementById("detail"); //legge div detail
const formElement = document.getElementById("form"); //legge div form
//importa tutti i componenti dai file
import { tableComponent,tableComponent2 } from './componenti/tabella.js';
import { createForm } from './componenti/form.js';
import { generateFetchComponent } from './componenti/fetch_componenti.js';
import { createMap } from './componenti/mappa.js';
import { createLogin } from './componenti/login.js';
import { createNavigator } from "./componenti/navigator.js";
import { createDetail } from "./componenti/detail.js";

//fa fetch al conf json 
fetch("conf.json")
    .then((r) => r.json())
    .then((conf) => {
        const compFetch = generateFetchComponent();

        // Crea componente tabella
        const table1 = tableComponent();
        table1.setParentElement(tabella,compFetch);
        //crea componente mappa
        const Map = createMap();
        //crea componente tabella 2
        const table2 = tableComponent2(Map, compFetch, table1);
        table2.setParentElement(tabella2);
        //crea componente login
        const login=createLogin();
        //crea componente navigator
        const navigator = createNavigator(document.querySelector("#container"));

        //fa render mappa
        Map.render();

        // Crea componente form e passa mappa e tabella anche
        const form = createForm(formElement, Map, table1);


        // Carica i dati di configurazione
        compFetch.caricaDati(conf);

        // Configura e renderizza la form
        form.render(table1, compFetch, Map);
        //carica componente per visualizzare i detail
        const detailComp = createDetail(paginadetail);


        // Recupera i dati e li imposta per i vari componenti
        compFetch.getData().then((data) => {
            form.setLabels(data);
            table1.setData(data); 
            table1.render(); 
            table2.setData(data); 
            table2.render();
            Map.setData(data); 
            Map.render();
            detailComp.setData(data);
            //controlla se ci sono interazioni 
            window.addEventListener('hashchange', () => {
                //legge l url
                const hash = window.location.hash;
                //se ce detail 
                if (hash.startsWith("#detail_")) {
                    // prende id dalla URL eliminando il resto per avere solo id
                    const id = hash.replace("#detail_", "");
                    //chiama render dtail passando l'id
                    detailComp.render(id);
                } else if (hash === "#home") {//se nella url ce home
                    // aggiunge hidden a tutti
                    document.querySelectorAll('.page').forEach((page) => {
                        page.classList.add('hidden');
                    });
                    document.getElementById('home').classList.remove('hidden');//rimuove hidden da home
                } else if (hash === "#admin") {
                    // se è la pagina admin
                    document.querySelectorAll('.page').forEach((page) => {
                        page.classList.add('hidden');//aggiunge a tutte le altre hidden
                    });
                    document.getElementById('admin').classList.remove('hidden');// lo rimuove solo alla pagina home
                }
            });
            //serve per quando l utente ricarica la pagina
            if (window.location.hash.startsWith("#detail_")) {//controlla se si trova dentro detail
                const id = window.location.hash.replace("#detail_", "");//prende id togliendo detail dalla url
                document.querySelectorAll('.page').forEach((page) => {
                    page.classList.add('hidden');//aggiunge a tutte le pagine hidden
                });
                document.getElementById('detail').classList.remove('hidden');//rimuove alla pagina detail la classe hidden
                detailComp.render(id);
            } else if (window.location.hash === "#home") {//controlla se è pagina home
                document.querySelectorAll('.page').forEach((page) => {
                    page.classList.add('hidden');//aggiunge hiddenn a tutte le pagine
                });
                document.getElementById('home').classList.remove('hidden');//rimuove hidden a home
            } else if (window.location.hash === "#admin") {//controlla se la pagina admin
                document.querySelectorAll('.page').forEach((page) => {
                    page.classList.add('hidden');//aggiunge hidden a tutte le pagina
                });
                document.getElementById('admin').classList.remove('hidden');//rimuove hidden da admin
            }
            
        });
        

    });
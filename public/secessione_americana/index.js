const tabella = document.getElementById("tabella");
const formElement = document.getElementById("form");
const formLogin = document.getElementById("formlogin");
const bottone_formlogin = document.getElementById("Login");
const bottone_admin = document.getElementById("buttonadmin");
const paginaPosto = document.getElementById("pagina_posto");
const tabellaAdmin1 = document.getElementById("tabellaAdmin");
document.body.focus();
bottone_admin.classList.add("d-none");

import {tableComponent} from './componenti/table.js';
import {createForm} from './componenti/form.js';
import {createFormLogin} from './componenti/form_login.js';
import { createLogin } from './componenti/login.js';
import {generateFetchComponent} from './componenti/fetch_component.js';
import {createMap} from './componenti/mappa.js';
import {ricerca} from './componenti/barra_ricerca.js';
import {createNavigator} from "./componenti/navigator.js";
import {createDetail} from "./componenti/detail.js";
import {createTableAdmin} from "./componenti/tabellaAdmin.js";


let dati_fetch;


fetch("conf.json").then(r => r.json()).then(conf => {
    console.log(conf)
    const fetchComp = generateFetchComponent();
    const Map=createMap()
    const table1 = tableComponent();
    const detailComp = createDetail(paginaPosto);
    const navigator = createNavigator(document.querySelector("#container"),detailComp);
    const form_login=createFormLogin(formLogin)
    const Login = createLogin()
    const form = createForm(formElement);
    const tabellaAdmin = createTableAdmin(fetchComp);

    fetchComp.caricaDati(conf)
    fetchComp.getData().then(p => {
        if (p == null){p = []}

        console.log("PPPP: ", p)
        dati_fetch=p;
        table1.setParentElement(tabella);
        table1.setData(p);
        table1.render();
        let posti = document.querySelectorAll(".marker")
        posti.forEach((pst)=>{
            pst.onclick=()=>{
                dati_fetch.forEach(df=>{
                    if(df.name.Titolo===pst.innerText){
                        detailComp.navigateToDetail(df.name.id);
                    }
                })
            }
        })
        detailComp.setData(p);

        //TABELLA ADMIN
        tabellaAdmin.setParentElement(tabellaAdmin1);
        tabellaAdmin.setData(p);
        tabellaAdmin.render(conf,form,tabellaAdmin,Map,table1,detailComp);

        //detailComp.render();
        Map.setData(p)
        Map.render(detailComp)
    });
    form.render(form,table1, Map, conf, fetchComp, tabellaAdmin,detailComp);
    form_login.render(Login,bottone_admin)
    //BARRA DI RICERCA
    let filtro = document.querySelector("#filtro");

    if (filtro) {
        filtro.addEventListener('input', function() {
            console.log("filtro")
            let dati = table1.exportData();
            let new_data = ricerca(filtro.value, dati);
            table1.dati_filtro(new_data);
            table1.render();
            let posti = document.querySelectorAll(".marker")
            posti.forEach((pst)=>{
                pst.onclick=()=>{
                    dati_fetch.forEach(df=>{
                        if(df.name.Titolo===pst.innerText){
                            detailComp.navigateToDetail(df.name.id);
                        }
                    })
                }
            })
        });
    }else {
        console.error("Elemento filtro non trovato!");
    }

    (function(history) {
        const pushState = history.pushState;
        const replaceState = history.replaceState;
    
        function onUrlChange() {
            console.log("URL cambiato:", window.location.href);
            let URL = window.location.href
            URL = URL.split("#")
            console.log(URL)
            const page = document.getElementById("pagina_posto");
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
            console.log(dati_fetch)
            const item = dati_fetch.find(d => d.name.id.split("-")[0] === URL[1].split("-")[0]);
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
                            <div class="col-md-8">
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
                            <div class="col-md-4">
                                <div class="">
                                    <span class="text-center">
                                        <img src="${item.name.Immagine_1}" alt="${item.name.Titolo}" class="immaginiDetail img-hover-shadow mt-3" />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>`;
                
                // Carica il template all'interno del div della pagina
                page.innerHTML = template;
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
        }}
    
        history.pushState = function(...args) {
            pushState.apply(history, args);
            onUrlChange();
        };
    
        history.replaceState = function(...args) {
            replaceState.apply(history, args);
            onUrlChange();
        };
    
        window.addEventListener("popstate", onUrlChange);
        window.addEventListener("hashchange", onUrlChange);
    })(window.history);
    

    setInterval(()=>{
        fetchComp.getData().then(p => {
            table1.setData(p);
            table1.render();
            tabellaAdmin.setData(p);
            tabellaAdmin.render(conf,form,tabellaAdmin,Map,table1,detailComp);
            Map.setData(p)
            Map.render(detailComp)
            console.log("ok")
            console.log(p)
            let posti = document.querySelectorAll(".marker")
            posti.forEach((pst)=>{
                pst.onclick=()=>{
                    dati_fetch.forEach(df=>{
                        if(df.name.Titolo===pst.innerText){
                            detailComp.navigateToDetail(df.name.id);
                        }
                    })
                }
            })
            detailComp.setData(p);
            });
    },300000)
});
window.addEventListener("load", function () {
    let risposta = sessionStorage.getItem("login");
    console.log(risposta)
    if (risposta==="true"){
        bottone_admin.classList.remove("d-none")
    }
});


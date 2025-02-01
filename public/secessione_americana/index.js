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
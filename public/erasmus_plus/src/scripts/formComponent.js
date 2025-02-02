import { toggleModal } from "../../assets/js/modals.js"

export const generateModalForm = (parentElement) => {
    let configuration;
    let submitCallback, cancelCallback;
    let idForm;

    return {
        build: (inputConfiguration, inputIdForm) => {
            configuration = inputConfiguration;
            idForm = inputIdForm;
        },
        onsubmit: (inputCallback) => {
            submitCallback = inputCallback;
        },
        oncancel: (inputCallback) => {
            cancelCallback = inputCallback;
        },
        render: (preValues) => {
            /*
            *Output*
            const loginFormOutput = {
                "username": "falconeandrea",
                "password": "test1234",
                "remember-me": "true",
                "loginSubmit" : "button"
            }

            const poiFormOutput = {
                name: "kts-schole",
                description: "Kurt-Tucholsky is a high school ...",
                adress: "Richard-Wagner-Straße 41, 24943 Flensburg, Germany",
                price: "/",
                duration: "/",
                imageLink: "drive.google.com/......."
            }
            */

            //Creazione del Form
            let html = '<form id="form' + idForm + '" class="space-y-4 w-full">';


            let labels = Object.keys(configuration);
            //let values = Object.values(configuration) ;

            labels.forEach(e => {
                if (preValues == null) {

                    html += `
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-light mb-1"
                                for="${e}">
                                ${e}
                            </label>
                            <input
                                class="${configuration[e][1]}"
                                type="${configuration[e][0]}" name=${e} id=${e}>
                        </div>
                    </div>`
                     
                } else {
                    html += `
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label class="block uppercase tracking-wide text-gray-700 text-xs font-light mb-1"
                                for="${e}">
                                ${e}
                            </label>
                            <input
                                class="${configuration[e][1]}"
                                type="${configuration[e][0]}" name=${e} id=${e} value="${preValues[e]}">
                        </div>
                    </div>`
                }

            });

            html += `<div class="mt-5">
                            <button type="button" id="submitButton${idForm}" class='bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded'>
                                Submit </button>
                            <span
                                class='close-modal cursor-pointer bg-red-200 hover:bg-red-500 text-red-900 font-bold py-2 px-4 rounded'>
                                Close
                            </span>
                        </div></form>`
            
            html += '<div style="color: red;" id="errorDiv' + idForm + '"></div>';

            parentElement.innerHTML = html;
            //console.log(html);
            document.querySelectorAll('.close-modal').forEach(btn => {
                toggleModal('remove', btn);
            });
            //Creazione del Bottone
            //const submitButton = document.querySelector(values[values.length - 1]) ;
            const submitButton = document.getElementById("submitButton" + idForm);

            submitButton.onclick = () => {
                let result = labels.map((name) => {
                    return document.getElementById(name).value ? document.getElementById(name).value : document.getElementById(name).checked;
                })

                //console.log(result) ;
                submitCallback(result, configuration);
            }
            /*
            document.querySelectorAll(".clearForm").forEach(b => { // per i pulsanti che svuotano i campi del form
                b.onclick = () => {
                    document.querySelectorAll(".form-control").forEach(e => e.value = "");
                    document.querySelector("#hourInput").value = configuration[0];
                    document.getElementById("resultLabel").innerText = "";

                    cancelCallback();
                }
            });*/
        },
        setStatus: (text) => {
            document.getElementById("errorDiv" + idForm).innerText = text;
        },
        setType: (inputType) => {
            type = inputType;
        },
        clear: () => {
            document.querySelectorAll(".form-control").forEach(e => e.value = "");
            document.querySelector("#hourInput").value = configuration[0];
        }
    };
};
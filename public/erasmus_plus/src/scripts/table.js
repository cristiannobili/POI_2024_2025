import { keySelector } from "../utils/keySelector.js";
import { toggleModal } from "../../assets/js/modals.js"

export const createHomeTable = (parentElement, pubsub) => {
    //let pageCreator;
    let data;
    let fetchComponent;
    return {
        render: async function () {
            if (!data) throw new Error("No data to render");
            let listToShow = data;
            let rows = 0;
            let html = `<table class="table-fixed max-h-64 overflow-y-auto">
						    <thead id="points-head" class="bg-gray-300 text-black px-2 py-3 border-solid border-gray-400 border-b">
                                <tr>
                                    <th class="border w-1/2 px-4 py-2">Title</th>
                                    <th class="border w-1/2 px-4 py-2">Adress</th>
                                </tr>
							</thead>
		                    <tbody>`;

            for (const element in listToShow) {
                html += `<tr class="${(rows % 2 == 0) ? "bg-gray-200 text-black" : "bg-white text-black"}">
                            <td class="border px-4 py-2"><a style="color: ${(rows % 2 == 0) ? 'blue' : '#2c5282'}" href="#${listToShow[element].hash}">${listToShow[element].name}</a></td>
							<td class="border px-4 py-2">${listToShow[element].adress}</td>
						</tr>`;
                rows++;
            };

            html += `</tbody></table>`;

            parentElement.innerHTML = html;
        },
        renderFiltered: async function (filtered) {
            if (!data) throw new Error("No data to render");
            filtered = filtered === " " ? "Flensburg" : filtered;
            let listToShow = data;
            let rows = 0;

            let html = `<table class="table-fixed max-h-64 overflow-y-auto">
						    <thead id="points-head" class="bg-gray-300 text-black px-2 py-3 border-solid border-gray-400 border-b">
                                <tr>
                                    <th class="border w-1/2 px-4 py-2">Title</th>
                                    <th class="border w-1/2 px-4 py-2">Adress</th>
                                </tr>
							</thead>
		                    <tbody style:"overflow: scroll">`;

            for (const element in listToShow) {
                if (((listToShow[element].name).toLowerCase()).includes((filtered.toLowerCase()))) {
                    html += `<tr class="${(rows % 2 == 0) ? "bg-gray-200 text-black" : "bg-white text-black"}">
                            <td class="border px-4 py-2"><a style="color: ${(rows % 2 == 0) ? 'blue' : '#2c5282'}" href="#${listToShow[element].hash}">${listToShow[element].name}</a></td>
							<td class="border px-4 py-2">${listToShow[element].adress}</td>
						</tr>`;
                rows++;
                };
            }
            html += `</tbody></table>`;

            parentElement.innerHTML = html;
        },
        build: async function (fetchC) {
            //pageCreator = pageC;
            fetchComponent = fetchC;
            data = keySelector(((await fetchComponent.getData()).flensburg), ["name", "adress", "hash"]);
            pubsub.subscribe("changePOI", async () => {
                data = keySelector(((await fetchComponent.getData()).flensburg), ["name", "adress", "hash"]);
                await this.render();
            });
        }

    };
};

export const createAdminTable = (parentElement, pubsub) => {
    let data;
    let fetchComponent;
    return {
        render: async function () {
            if (!data) throw new Error("No data to render");
            let listToShow = data.flensburg;
            let rows = 0;
            let html = `
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead id="points-head" class="text-xs text-slate-200 shadow-lg uppercase bg-neutral-400 sticky top-0 border border-hidden">
                            <tr >
                                <th class="w-1/4 h-[70px] h-100 px-4 py-2">Title</th>
                                <th class="w-1/6 h-[70px] h-100 px-4 py-2">Description</th>
                                <th class="w-1/6 h-[70px] h-100 px-4 py-2">Address</th>
                                <th class="w-1/6 h-[70px] h-100 px-4 py-2">Coords</th>
                                <th class="w-1/6 h-[70px] h-100 px-4 py-2">Price</th>
                                <th class="w-1/7 h-[70px] h-100 px-4 py-2">Photo</th>
                                <th class="w-1/5 h-[70px] h-100 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>`;
                        
            for (const element in listToShow) {
                html += `<tr class="shadow-lg border border-hidden ${(rows % 2 == 0) ? "bg-gray-400 text-black" : "bg-gray-300 text-black"}">
                            <td class="px-4 py-2">${listToShow[element].name}</td>
                            <td class="px-4 py-2"><div class="max-h-[150px] overflow-y-auto p-2 text-justify">
                                `+ listToShow[element].description + `
                            </div></td>
                            <td class="px-4 py-2">${listToShow[element].adress}</td>
                            <td class="px-4 py-2">${parseFloat(listToShow[element].lat).toFixed(2) + ", " + parseFloat(listToShow[element].lon).toFixed(2)}</td>
                            <td class="px-4 py-2">${listToShow[element].price}</td>
                            <td class="px-4 py-2 relative group"><div class="px-4 py-2">`;
                                listToShow[element].imageLink.forEach(img => {
                                    html += `<img src="` + img + `" class="rounded-lg duration-700 ease-in-out object-cover rounded-lg cursor-pointer group-hover:opacity-70" data-carousel-item>`;
                                    html += `<div class="absolute top-0 right-full mr-2 hidden group-hover:flex z-50 w-64 h-64"> <img src="${img}" class="w-full h-full object-cover rounded-lg shadow-lg border"></div>`;
                                })
                html += `   </div></td>
                            <td class="px-4 py-2">
                                <button type="button" id="edit-`+ element + `"
                                    data-modal="editPOI" class="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white"><i class="fas fa-edit"></i></button>
                                <button type="button" id="remove-`+ element + `"
                                    class="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-red-500"><i class="fas fa-trash"></i></button> 
                            </td>
                        </tr>`
                rows++;
            };

            html += `</tbody></table>`;

            parentElement.innerHTML = html;

            for (const key in listToShow) {
                document.getElementById("remove-" + key).onclick = async () => {
                    delete data.flensburg[key];
                    await fetchComponent.setData(data);
                    pubsub.publish("changePOI");
                }
                toggleModal('add', document.getElementById("edit-" + key));
                document.getElementById("edit-" + key).onclick = () => {
                    pubsub.publish("editPOI", [listToShow, key]);
                    console.log("edit-" + key);
                }
            }
        },
        build: async function (fetchC) {
            fetchComponent = fetchC;
            data = (await fetchComponent.getData());
            pubsub.subscribe("changePOI", async () => {
                data = (await fetchComponent.getData());
                await this.render();
            });
        }
    };
};
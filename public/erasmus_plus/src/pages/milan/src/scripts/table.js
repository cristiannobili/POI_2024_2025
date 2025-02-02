import { keySelector } from "../utils/keySelector.js";
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
		                    <tbody style:"overflow: scroll">`;

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
            filtered = filtered === " " ? "Milan" : filtered;
            let listToShow = data;

            let html = `
                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <caption class="text-lg font-semibold text-left text-gray-900 dark:text-white p-4 sticky top-0"> List of all POI </caption>
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
                            <tr>
                                <th scope="col" class="px-6 py-3 break-words whitespace-normal p-2">Title</th>
                                <th scope="col" class="px-6 py-3 break-words whitespace-normal p-2">Address</th>
                            </tr>
                        </thead>
                        <tbody>`;
            for (const element in listToShow) {
                if (((listToShow[element].name).toLowerCase()).includes((filtered.toLowerCase()))) {
                    html += `<tr
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="px-6 py-4 break-words whitespace-normal p-2"><button id="#`+ listToShow[element].hash + `"
                                        class="text-blue-600 dark:text-blue-400 hover:underline">`+ listToShow[element].name + `</button></td>
                                <td class="px-6 py-4 break-words whitespace-normal p-2">`+ listToShow[element].adress + `</td>
                            </tr>`
                };
            }
            html += `
                    </tbody>
                </table>
            `;
            parentElement.innerHTML = html;
        },
        build: async function (fetchC) {
            //pageCreator = pageC;
            fetchComponent = fetchC;
            data = keySelector(((await fetchComponent.getData()).milan), ["name", "adress", "hash"]);
            pubsub.subscribe("changePOI", async () => {
                data = keySelector(((await fetchComponent.getData()).milan), ["name", "adress", "hash"]);
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
            let listToShow = data.milan;
            let html = `
                    <table class="table-responsive w-full rounded">
                        <thead>
                            <tr>
                                <th class="border w-1/4 px-4 py-2">Title</th>
                                <th class="border w-1/6 px-4 py-2">Description</th>
                                <th class="border w-1/6 px-4 py-2">Address</th>
                                <th class="border w-1/6 px-4 py-2">Coords</th>
                                <th class="border w-1/6 px-4 py-2">Price</th>
                                <th class="border w-1/7 px-4 py-2">Photo</th>
                                <th class="border w-1/5 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>`;
                        
            for (const element in listToShow) {
                html += `<tr>
                            <td class="border px-4 py-2">${listToShow[element].name}</td>
                            <td class="border px-4 py-2"><div class="max-h-[150px] overflow-y-auto p-2 text-justify">
                                `+ listToShow[element].description + `
                            </div></td>
                            <td class="border px-4 py-2">${listToShow[element].adress}</td>
                            <td class="border px-4 py-2">${parseFloat(listToShow[element].lat).toFixed(2) + ", " + parseFloat(listToShow[element].lon).toFixed(2)}</td>
                            <td class="border px-4 py-2">${listToShow[element].price}</td>
                            <td class="border px-4 py-2"><div class="border px-4 py-2">`;
                                listToShow[element].imageLink.forEach(img => {
                                    html += `<img src="` + img + `" class="rounded-lg duration-700 ease-in-out" data-carousel-item>`;
                                })
                html += `   </div></td>
                            <td class="border px-4 py-2">
                                <button type="button" id="edit-`+ element + `"
                                    class="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-white"><i class="fas fa-edit"></i></button>
                                <button type="button" id="remove-`+ element + `"
                                    class="bg-teal-300 cursor-pointer rounded p-1 mx-1 text-red-500"><i class="fas fa-trash"></i></button> 
                            </td>
                        </tr>`
            };

            html += `</tbody></table>`;

            parentElement.innerHTML = html;

            for (const key in listToShow) {
                document.getElementById("remove-" + key).onclick = async () => {
                    delete data.milan[key];
                    await fetchComponent.setData(data);
                    pubsub.publish("changePOI");
                }
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
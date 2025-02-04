export const createPage = (parentElement, pubsub) => {
    let fetchComponent;
    let data;
    const TEMPLATE_PHOTOGALLERY = `<div>
            <img class="h-auto max-w-full rounded-lg" src="%URL" alt="">
        </div>` ;

    //nella table manca ```html come classe
    const TEMPLATE = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-2">
        <div class="flex justify-center">
            <div id="gallery" class="relative w-full" data-carousel="slide">
                <!-- Carousel wrapper -->
                <div id="photogallery_%ID_PHOTOGALLERY" class="grid grid-cols-2 gap-2">
                    %PHOTOGALLERY_CONTENT
                </div>
            </div>    
    </div>

    <div class="max-w-lg mx-auto p-4">
        <table class="w-full border-collapse border border-gray-300 text-black">
            <thead class="bg-gray-200 text-4xl">
            <tr>
                <th class="border border-gray-300 p-2">Title POI</th>
                <th class="border border-gray-300 p-2">Address</th>
                <th class="border border-gray-300 p-2">Coordinates</th>
                <th class="border border-gray-300 p-2">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr class="bg-white text-2xl">
                <td class="border border-gray-300 p-2">%POI_TITLE</td>
                <td class="border border-gray-300 p-2">%ADRESS</td>
                <td class="border border-gray-300 p-2">%POI_LATITUDE, %POI_LONGITUDE</td>
                <td class="border border-gray-300 p-2">%POI_PRICE</td>
            </tr>
            <tr class="bg-gray-200 text-4xl">
                <th class="border border-gray-300 p-2" colspan="4">Description</th>
            </tr>
            <tr class="bg-white text-xl">
                <td class="border border-gray-300 p-2" colspan="4">%POI_DESCRIPTION</td>
            </tr>
            </tbody>
        </table>
    </div>` ;


    function render(poiData) {
        let htmlPage = `<article class="mt-16 poiPage hidden" id="` + poiData.hash + `">`;

        htmlPage += TEMPLATE.replace("%PHOTO_TITLE", poiData.name);
        let imgsHtml = "";
        poiData.imageLink.forEach((element) => {
            imgsHtml += TEMPLATE_PHOTOGALLERY.replace("%URL", element);
            imgsHtml = imgsHtml.replace("%ALT", poiData.name);
        });
        htmlPage = htmlPage.replace("%ID_PHOTOGALLERY", poiData.hash);
        htmlPage = htmlPage.replace("%PHOTOGALLERY_CONTENT", imgsHtml);
        htmlPage = htmlPage.replace("%POI_TITLE", poiData.name);
        htmlPage = htmlPage.replace("%ADRESS", poiData.adress);
        htmlPage = htmlPage.replace("%POI_LATITUDE", parseFloat(poiData.lat).toFixed(2));
        htmlPage = htmlPage.replace("%POI_LONGITUDE", parseFloat(poiData.lon).toFixed(2));
        htmlPage = htmlPage.replace("%POI_PRICE", poiData.price);
        htmlPage = htmlPage.replace("%POI_DESCRIPTION", poiData.description);
        htmlPage += `</article>`

        parentElement.innerHTML += htmlPage;
    }


    return {
        build: async function (fetchC) {
            fetchComponent = fetchC;
            data = (await fetchComponent.getData()).milan
            parentElement.innerHTML = "";
            for(const key in data){
                render(data[key])
            }
            pubsub.subscribe("changePOI", async () => {
                data = (await fetchComponent.getData()).milan
                parentElement.innerHTML = "";
                for(const key in data){
                    render(data[key])
                }
            })
        }
    }
}
export const createDetail = (parentElement) => {
    const self = {
        navigateToDetail: (id) => {
            // Aggiorna l'URL con l'ID del posto
            window.history.pushState({}, "", `#${id}`); 
            inizioIndex = data.findIndex((d) => d.name.id === id);
            console.log(inizioIndex)
            console.log(data)       
        },
        avanti:()=> {if ((inizioIndex + 1) <= data.length) {inizioIndex += 5}},
        indietro:()=> {if ((inizioIndex - 1) >= 0) {inizioIndex -= 5}},
    };
    return self;
};


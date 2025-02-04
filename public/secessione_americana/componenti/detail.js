export const createDetail = (parentElement) => {
    const self = {
        navigateToDetail: (id) => {
            // Aggiorna l'URL con l'ID del posto
            window.history.pushState({}, "", `#${id}`);        
        }
    };
    return self;
};


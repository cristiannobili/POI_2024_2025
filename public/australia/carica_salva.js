let myToken, myKey;
export let list = [];

fetch('./conf.json') // carica le variabili da conf.json
    .then(response => {
        if (!response.ok) {
            console.log('Errore nel caricamento del file JSON');
        }
        return response.json();
    })
    .then(data => {
        myToken = data.cacheToken;
        myKey = data.myKey;
        //console.log(myKey)
        //console.log(myToken)
    })
    .catch(error => console.error('Errore:', error));


export function carica() {
    return fetch('https://ws.cipiaceinfo.it/cache/get', {
            headers: {
                'Content-Type': 'application/json',
                key: myToken,
            },
            method: 'POST',
            body: JSON.stringify({
                key: myKey,
            }),
        })
        .then((r) => r.json())
        .then((r) => {
            console.log('Dati caricati:', r.result);
            list = r.result || [];
            
        })
        .catch((err) => console.log('Errore durante il caricamento:', err));
}

export function salva() {
    return fetch('https://ws.cipiaceinfo.it/cache/set', {
            headers: {
                'Content-Type': 'application/json',
                key: myToken,
            },
            method: 'POST',
            body: JSON.stringify({
                key: myKey,
                value: list,
            }),
        })
        .then((r) => r.json())
        .then((r) => {
            console.log('Dati salvati:', r);
            return r;
        })
        .catch((err) => console.log('Errore durante il salvataggio:', err));
}


export const ricerca = (input,dati) =>{
    let lista = []
    dati.forEach(element => {
      if (element.name.Titolo.toLowerCase().includes(input.toLowerCase())){
        lista.push(element)
      }
    });
    return lista
  }
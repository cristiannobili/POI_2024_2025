export const tableComponent = () => {
    let data= [];
    let data2= [];
    let inizioIndex = 0;
    let tipo="";
    let templateRow = `
        <tr class="tbl1">
            <td class = "border border-slate-600 marker" >#D1</td>
            <td class = "border border-slate-600" >#D2</td>
            <td class = "border border-slate-600" >#D3</td>
            <td class = "border border-slate-600" >#D4</td>
            <td class = "border border-slate-600" >#D5</td>
        </tr>
    `;
    let parentElement;

    return {
        togliDati: (inizio, fine) => {data.splice(inizio, fine)}, 
        setData: (dato) =>{
            data=dato;
            data2=dato},
        addData: (dato,compFetch) => {
            data.push(dato);
            compFetch.setData(data).then(dato => {
                compFetch.getData().then(dato=>{
                    data=dato;
                    data2=dato;
                })
            })
        },
        setParentElement: (pr) => {
            parentElement = pr;
        },
        avanti:()=> {if ((inizioIndex + 5) <= data.length) {inizioIndex += 5}},
        indietro:()=> {if ((inizioIndex - 5) >= 0) {inizioIndex -= 5}},
        reset_inizio: () => {inizioIndex=0},
        dati_filtro: (new_Data) => {data2=new_Data},
        setTipo: (tip)=>{tipo=tip;},
        exportData: () => {return data;},
        render: () => {
            
            let html = ` <tr class="table-light"><th class="table-light">Nome Battaglia</th><th class="table-light">Breve Descrizione</th>
            <th class="table-light">Feriti</th><th class="table-light">Inizio</th><th class="table-light">Fine</th></tr>`
                console.log("DATA 2222222: ", data2)
                data2.forEach((el) => {
                        let html2 = "";
                        html2 += templateRow.replace("#D1", el.name.Titolo);
                        html2 = html2.replace("#D2", el.name.Paragrafo_1);
                        html2 = html2.replace("#D3", el.name.feriti);
                        html2 = html2.replace("#D4", el.name.Datainizio);
                        html2 = html2.replace("#D5", el.name.Datafine);  
                        html += html2;             
                });
            
            
            
            parentElement.innerHTML = html;
        },
    }
};

//COMPONENTE TABELLA
export const cTable = (parentElement, data, viewDetails) => {
    let html =
        '<table><thead><tr><th>Name</th><th>Description</th><th>Type</th><th>Average price</th><th>Best season</th><th>Recommended duration</th><th>Family-friendly</th><th>Score</th></tr></thead>';
    
    for (let i = 0; i < data.length; i++) {
        let luogo = data[i];
        html += `<tr id="row/${luogo.id}" class="click-row">
                    <td>${luogo.nome}</td>
                    <td>${luogo.descS}</td>
                    <td>${luogo.tipo}</td>
                    <td>${luogo.prz}</td>
                    <td>${luogo.per}</td>
                    <td>${luogo.dur}</td>
                    <td>${luogo.ff}</td>
                    <td>${luogo.punt}</td>
                 </tr>`;
    }
    html += '</table>';
    parentElement.innerHTML = html;


    const rows = parentElement.querySelectorAll('.click-row');
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const id = row.id.split('/')[1];
            console.log("ID "+id)
            window.location.hash = "detail_" + id;
            viewDetails(id);  
        });
    });
};



export const cTableAdmin = (parentElement, data, cancellaCB, modificaCB) => {
    let html =
        '<table class="table-ad"><thead><tr><th>Name</th><th>Short Description</th><th>Long Description</th><th>Type</th><th>Main activities</th><th>Average price</th><th>Best season</th><th>Recommended duration</th><th>Coordinates</th><th>Family-friendly</th><th>Close to</th><th>Score</th><th>Edit</th><th>Delete</th></tr></thead>';
    for (let i = 0; i < data.length; i++) {
        let luogo = data[i];
        let descSs = accorcia(luogo.descS, 3);
        let descLs = accorcia(luogo.descL, 3); 
        let coordinates = `${luogo.lat}, ${luogo.lon}`;
        
        html += `<tr>
                    <td>${luogo.nome}</td>
                    <td>${descSs}</td> 
                    <td>${descLs}</td> 
                    <td>${luogo.tipo}</td>
                    <td>${luogo.att}</td>
                    <td>${luogo.prz}</td>
                    <td>${luogo.per}</td>
                    <td>${luogo.dur}</td>
                    <td>${coordinates}</td>
                    <td>${luogo.ff}</td>
                    <td>${luogo.vic}</td>
                    <td>${luogo.punt}</td>
                    <td><button id="editBtn${i}" class="edit-btn" data-bs-toggle="modal" data-bs-target="#luoghiModal">Edit</button></td>
                    <td><button id="delBtn${i}" class="del-btn">Delete</button></td>
                 </tr>`;
    }
    html += '</table>';
    parentElement.innerHTML = html;

    for (let i = 0; i < data.length; i++) {
        document.getElementById(`delBtn${i}`).onclick = () => cancellaCB(i);
        document.getElementById(`editBtn${i}`).onclick = () => modificaCB(i);
    }
};

const accorcia = (desc, lim) => { //Funzione per mostarre solo le prime 3 parole delle descrizioni
    const words = desc.split(' ');
    if (words.length > lim) {
        return words.slice(0, lim).join(' ') + '...'; 
    }
    return desc;
};
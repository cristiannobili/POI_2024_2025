export const createFormLogin = (parentElement) => {
    return { 
        render: (login,bottone_aggiungi) => {
            parentElement.innerHTML = 
                `<div><p id="pnome" class="form-label">Nome</p><input id="Nome" type="text" class="form-control"/></div>`+
                `<div><p id="ppassword" class="form-label">Password</p><input id="Password" type="password" class="form-control"/></div>`
            document.querySelector("#Login").onclick = () => {
                const Nome = document.querySelector("#Nome").value;
                const Password = document.querySelector("#Password").value;
                console.log(Nome,Password)
                if (Nome === "" || Password === "" ) {
                    outputform.innerHTML="ko";
                }else{
                    login.login(Nome,Password).then((r)=>{
                        console.log(r)
                        if(r===true){
                            login.sessionstorage()
                        }
                        let risposta = sessionStorage.getItem("login");
                        console.log(risposta)
                        if (risposta==="true"){
                            login.render(bottone_aggiungi)
                        }
                    })
            }
        }
    }
}
}

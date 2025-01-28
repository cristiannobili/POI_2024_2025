export const createLogin=()=>{
    sessionStorage.setItem("login", "false");
    return{
        login:(nome,password)=>{
            return new Promise((resolve, reject) => {
                fetch("http://ws.cipiaceinfo.it/credential/login", { 
                  method: "POST",
                  headers: {
                     "content-type": "application/json",
                     "key": "3819207b-2545-44f5-9bce-560b484b2f0f"
                  },
                  body: JSON.stringify({
                     username: nome,
                     password: password
                  })
                })
                .then(r => r.json())
                .then(r => {
                    console.log(r.result)
                     resolve(r.result); 
                  })
                .catch(reject);
              })
        },
        sessionstorage:()=>{
            sessionStorage.setItem("login", "true");
            console.log("sessionstorage");
        },
        render:(bottone_aggiungi)=>{
            console.log(bottone_aggiungi)
            bottone_aggiungi.classList.remove("d-none");
        }
    }
}
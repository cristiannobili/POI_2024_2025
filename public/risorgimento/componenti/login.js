let myToken="";//prende token da conf json
fetch("conf.json").then(r => r.json()).then(conf => {
    myToken = conf.cacheToken;
});

export const createLogin = () => {
  //legge valori inseriti dalla form
    const inputName = document.querySelector("#name");
    const inputPassword = document.querySelector("#password");
    const loginButton = document.querySelector("#login");
    const logindiv = document.querySelector("#divlogin");//legge div che contiene la login
    const divPrivate = document.querySelector("#private");//legge div che contiene form e tabella admin
    const divLogin = document.querySelector("#login");
  
    divPrivate.classList.add("hidden");//aggiunge hidden a div form e tabella
    let isLogged = sessionStorage.getItem("Logged") || false;
  
    const login = (username, password) => {//fa fetch a ws
      return new Promise((resolve, reject) => {
        fetch("http://ws.cipiaceinfo.it/credential/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "key": myToken,
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        })
          .then((r) => r.json())
          .then((r) => {
            resolve(r.result);
          })
          .catch((error) => {
            reject(error);
          });
      });
    };
  
    loginButton.onclick = () => {// se clicco il bottone
      login(inputName.value, inputPassword.value) //legge i valori inseriti
        .then((result) => {
          if (result) {//se è corretto
            isLogged = true;
            sessionStorage.setItem("Logged", true);
            logindiv.classList.remove("visible");//rimuove visivle da div login
            logindiv.classList.add("hidden"); //e aggiunge hidden
            divPrivate.classList.remove("hidden"); //rimuove hidden da div forme tabella
            divPrivate.classList.add("visible");//e aggiunge visible
          }
        })
        .catch((error) => {//se sbaglio a inserire i dati
          console.error("Errore durante il login:", error);
        });
    };
  
    return {
      isLogged: () => isLogged,
    };
  };
  
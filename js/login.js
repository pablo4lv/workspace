//Redirige al index en caso de estar logeado
var loggedin = localStorage.getItem("email");
if (loggedin){
    window.location = "index.html"
};

//Invoca la funcion submit desde el formulario
window.addEventListener("load", function () {
    const formSearch = document.getElementById("formSearch");
    formSearch.addEventListener("submit", submit);
});

//Guarda los datos del login y redirige al index
async function submit(e){
    e.preventDefault();
    localStorage.setItem("email",document.getElementById("email").value);
    localStorage.setItem("password",document.getElementById("password").value);
    window.location.href = "index.html"
}

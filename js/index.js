document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        window.location = "products.html"
    });
});

// // Redirige el index al login en caso de no estar logeado
// var loggedin = localStorage.getItem("email")
// if (!loggedin){
//     window.location = "login.html"
// }else{
//     let barra = document.getElementById("barra");
//     let a = `
//             <li class="nav-item">
//                  <a class="nav-link" id="user">${localStorage.getItem("email")}</a>
//              </li>
//             `
//     barra.innerHTML += a;
// }

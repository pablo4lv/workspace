// Constante con la id de la categoría guardada.
const id = localStorage.catID;
// Constante con la url de la categoría.
const P_URL = PRODUCTS_URL + id + EXT_TYPE;
// Variable para almacenar la categoría.
let Category = null;

// Muestra la lista de productos al terminar de cargarse la página.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(P_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            Category = resultObj.data;
            showProductsList()
        }
    });
});

// Toma como parámetro el id del producto y lo almacena en el objeto localStorage del navegador.
// Al clickear sobre un producto, redirige a la página product-info.html
function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}


function showProductsList(){
    // Array con los productos.
    let prod = Category.products;
    // Variable para almacenar el contenido y luego agregarlo al body.
    let htmlContentToAppend = "";
    // Agrega el nombre de la categoría debajo del título.
    document.getElementById("catname").innerHTML += Category.catName;
    // Agrega la información de los productos al párrafo.
    for(let i = 0; i < prod.length; i++){

        htmlContentToAppend += `
        <div onclick="setProdID(${prod[i].id})" class="list-group-item list-group-item-action cursor-active">
            <div class="row">
                <div class="col-3">
                    <img src="${prod[i].image}" alt="${prod[i].description}" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">${prod[i].name + " - " + prod[i].currency +" "+ prod[i].cost}</h4>
                        <small class="text-muted">${prod[i].soldCount} artículos</small>
                    </div>
                    <p class="mb-1">${prod[i].description}</p>
                </div>
            </div>
        </div>
        `

        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

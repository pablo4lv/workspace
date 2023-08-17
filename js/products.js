// Constante con la id de la categoría guardada.
const id = localStorage.catID;
// Constante con la url de la categoría.
const P_URL = PRODUCTS_URL + id + EXT_TYPE;
// Variable para almacenar la categoría.
let Category = null;

const PRECIO = "precio";
const REELEVANCIA = "reelevancia";
let currentProductsArray = null;
let currentSortCriteria = undefined;

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
        <small class="text-muted">${prod[i].soldCount} artículos disponibles</small>
        </div>
        <p class="mb-1">${prod[i].description}</p>
        </div>
        </div>
        </div>
        `
        
        document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
    }
}

// Muestra la lista de productos al terminar de cargarse la página.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(P_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            Category = resultObj.data;

            // Agrega el nombre de la categoría debajo del título.
            document.getElementById("catname").innerHTML += Category.catName;

            showProductsList()
        }
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowProducts(REELEVANCIA, Category.products);
    });

    document.getElementById("precio").addEventListener("click", function(){
        sortAndShowProducts(PRECIO, Category.products);
    });
});


function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

function sortProducts(criteria, array){
    let result = [];
    if (criteria === REELEVANCIA)
    {
        result = array.sort(function(a, b) {
            if ( a.soldCount < b.soldCount ){ return -1; }
            if ( a.soldCount > b.soldCount ){ return 1; }
            return 0;
        });
    }else if (criteria === PRECIO){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }

    return result;
}

//falta un toggle en reelevancia y precios, orden creciente y decreciente
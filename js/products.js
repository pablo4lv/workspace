// Constante con la id de la categoría guardada.
const id = localStorage.catID;
// Constante con la url de la categoría.
const P_URL = PRODUCTS_URL + id + EXT_TYPE;
// Variable para almacenar la categoría.
let Category = null;

//Variables utilizadas más adelante en el filtro según precio.
let minCount = undefined;
let maxCount = undefined;

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
    if (prod[0] !== undefined){
        for(let i = 0; i < prod.length; i++){
            
            //Filtra los elementos del array cuyo precio se encuentre dentro del rango definido por minCount y maxCount.
            if (((minCount == undefined) || (minCount != undefined && parseInt(prod[i].cost) >= minCount)) &&
                ((maxCount == undefined) || (maxCount != undefined && parseInt(prod[i].cost) <= maxCount))){

                    //Filtra los elementos del array que incluyan el texto del input en su nombre o descripcion. 
                    if(searchterms === "" || 
                    (prod[i].name.toLowerCase().includes(searchterms) || prod[i].description.toLowerCase().includes(searchterms)))

                {
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
                }
            }

            document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
        }}

    //Si la categoría no tiene productos, muestra en pantalla... algo?
    else
    {
        document.getElementById("prod-list-container").innerHTML = `NO HAY`
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

    document.getElementById("precio1").addEventListener("click", function(e){
        sortAndShowProducts(CRECIENTE, Category.products);
    });

    document.getElementById("precio2").addEventListener("click", function(e){
        sortAndShowProducts(DECRECIENTE, Category.products);
    });

    //Limpia los campos del filtro y resetea las variables minCount y maxCount.
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    //Evento para setear las variables minCount y maxCount según el rango de precio de los inputs. Luego filtra el array y lo muestra.
    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});

//Constantes auxiliares para reordenar el array.
let currentProductsArray = null;
let currentSortCriteria = undefined;

function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

//Constantes para reordenar el array.
const CRECIENTE = "creciente";
const DECRECIENTE = "decreciente"
const REELEVANCIA = "reelevancia";

//Reordena el array según el criterio.
function sortProducts(criteria, array){
    let result = [];
    if (criteria === REELEVANCIA)
    {
        result = array.sort(function(a, b) {
            if ( a.soldCount < b.soldCount ){ return 1; }
            if ( a.soldCount > b.soldCount ){ return -1; }
        })
    }else 
    if (criteria === CRECIENTE){
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
        })
    }else
    if (criteria === DECRECIENTE)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return 1; }
            if ( a.cost > b.cost ){ return -1; }
        })
    }

    return result;
}

//Constantes para la barra de búsqueda y su valor.
const search = document.getElementById("search");
let searchterms = "";

//Evento que muestra los elementos filtrados cada vez que se hace input en la barra.
search.addEventListener("input",(e) => {
    searchterms = e.target.value.toLowerCase();
    showProductsList()
})

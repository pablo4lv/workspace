//Constante con la id del producto.
const id = localStorage.ProdID;
//Constante con la info del producto a partir de la id.
const Prod_URL = PRODUCT_INFO_URL + id + EXT_TYPE;
//Variable para guardar la info del producto.
let Product = null; //cambiar en products.js tmb

//Muestra la info del producto al cargar la pagina
document.addEventListener("DOMContentLoaded",function(e){
    getJSONData(Prod_URL).then(function(resultObj){
        if (resultObj.status == "ok"){
            Product = resultObj.data;
            ShowProductInfo()
        }
    })
})

function ShowProductInfo(){
    console.log(Product)
}

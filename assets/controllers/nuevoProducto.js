console.log('first')

const nombre = sessionStorage.getItem('nombre')
const precio = sessionStorage.getItem('precio')
const descripcion = sessionStorage.getItem('descripcion')
console.log(nombre, precio, descripcion)

const inputNombre = document.getElementById("name")
const inputPrecio = document.getElementById("precio")
const inputDescripcion = document.getElementById("descripcion")
const agregarProductoBtn = document.querySelector(".addProducto__btn")

const datosCargado =  () => {
    inputNombre.value = nombre
    inputPrecio.value = precio
    inputDescripcion.value = descripcion

}
document.addEventListener("DOMContentLoaded",  () => {
     datosCargado()
})

agregarProductoBtn.addEventListener("cick", () => {
    sessionStorage.clear()
    console.log(inputNombre.value)

})
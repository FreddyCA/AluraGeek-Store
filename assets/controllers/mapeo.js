import { consultasApi } from "../service/clienteService.js";

const contenedorStar = document.getElementById("productos__box--star")
const templateStar = document.getElementById("productos__star").content
const fragmentoStar = document.createDocumentFragment()

// star
const obtenerDataStar = async () => {
    const data = await consultasApi.productosStar();
    if (data !== undefined) {
        maquetar(data)
    }
}
let ancho = 5
const maquetar = (data) => {
    data.forEach((element, index) => {
        if (index < ancho) {
            // console.log(index)
            templateStar.querySelector(".producto__molde--img").setAttribute("src", element.img);
            templateStar.querySelector(".producto__molde--img").setAttribute("alt", element.nombre);
            templateStar.querySelector(".producto__molde--nombre").textContent = element.nombre;
            templateStar.querySelector(".producto__molde--precio").textContent = element.precio;
            let cloneStar = document.importNode(templateStar, true)
            fragmentoStar.appendChild(cloneStar)
            return
        }
    });
    contenedorStar.appendChild(fragmentoStar)
}

obtenerDataStar()

document.addEventListener("DOMContentLoaded", (e) => {
    e.preventDefault()
    dimension()
    console.log('hola')
})
window.addEventListener("resize", (e) =>{
    e.preventDefault()
    dimension()
})

const dimension = () => {
    if (window.innerWidth <= 768) {
        console.log('4 elementos')
    } else {
        console.log('mas de 4')
    }
    
}





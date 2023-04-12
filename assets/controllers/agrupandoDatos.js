const seleccionandoDatos = () => {
    const editar = document.querySelectorAll(".producto__herramienta--editar")
    editar.forEach(element => {
        element.addEventListener("mouseover", (e) => {
            const elementoMolde = e.target.parentNode.parentNode
            extrayendoData(elementoMolde)
        })
    });
}

let nombreProducto = null

const extrayendoData = async (elementoMolde) => {
    const elementosGrupo = elementoMolde.children[1].children
    const nombre = elementosGrupo[0].textContent
    const precio = elementosGrupo[1].textContent
    const descripcion = elementosGrupo[2].textContent
    // console.log(nombre, precio, descripcion)
    nombreProducto = nombre
    console.log(nombreProducto)
    
}


export const paraEditar = {
    seleccionandoDatos,
    nombreProducto
}
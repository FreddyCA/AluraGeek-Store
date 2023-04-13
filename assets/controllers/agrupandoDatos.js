const seleccionandoDatos = () => {
    const editar = document.querySelectorAll(".producto__herramienta--editar")
    editar.forEach(element => {
        element.addEventListener("click", async (e) => {
            const elementoMolde = e.target.parentNode.parentNode
            await extrayendoData(elementoMolde)
        })
    });
}

let estado = false

const extrayendoData = async (elementoMolde) => {
    const elementosGrupo = elementoMolde.children[1].children
    const nombre = elementosGrupo[0].textContent
    const precio = elementosGrupo[1].textContent
    const descripcion = elementosGrupo[2].textContent
    estado = true
    // console.log(nombre, precio, descripcion)
    await agregandoAlStorage(nombre, precio, descripcion, estado)
}

const agregandoAlStorage = async (nombre, precio, descripcion, estado) => {
    sessionStorage.setItem('nombre', nombre)
    sessionStorage.setItem('precio', precio)
    sessionStorage.setItem('descripcion', descripcion)
    sessionStorage.setItem('estado', estado)
}

export const paraEditar = {
    seleccionandoDatos,
}
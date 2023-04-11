
const habilitado = async () => {
    console.log('hola editar')
    const editar = document.querySelector(".producto__herramienta--editar")
    const borrar = document.querySelector(".producto__herramienta--borrar")
    editar.addEventListener("click", () => {
        console.log("clik editar")
    })
    
    borrar.addEventListener("mouseover", () => {
        console.log("clik borrar")
    })
}

export const funcHbilitado = {
    habilitado
}
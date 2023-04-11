const botonLogin = document.querySelector(".cabecera__login--link")

let estado
const existeElemento = () => {
    if (botonLogin !== null) {
        console.log('existe en el doom')
        estado = true;
    } else {
        console.log('no existe en el dom')
        estado = false
    }
    return estado
}


export const usuarioLogin = {
    existeElemento
}
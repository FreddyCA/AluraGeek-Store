const contentVacioStar = document.getElementById("productos__box--star")
const contentVacioConsolas = document.getElementById("productos__box--consolas")
const contentVacioVarios = document.getElementById("productos__box--varios")


const productosStar = async () => {
    try {
        const resultado = await fetch("http://localhost:3000/star")
        const data = await resultado.json();
        // console.log("star",data)
        if (!resultado.ok) throw {status: resultado.status, statusText: resultado.statusText};
        return data
    } catch (error) {
        let message = error.statusText || "ocurrio un error"
        let contenido = `<h2>${message}</h2>`;
        contentVacioStar.insertAdjacentHTML("afterbegin", contenido)
    }
}

const productosConsolas = async () => {
    try {
        const resultado = await fetch("http://localhost:3000/consolas")
        const data = await resultado.json();
        // console.log("consolas",data)
        if (!resultado.ok) throw {status: resultado.status, statusText: resultado.statusText};
        return data
    } catch (error) {
        let message = error.statusText || "ocurrio un error"
        let contenido = `<h2>${message}</h2>`
        contentVacioConsolas.insertAdjacentHTML("afterbegin", contenido)
    }
}

const productosVarios = async () => {
    try {
        const resultado = await fetch("http://localhost:3000/varios")
        const data = await resultado.json();
        // console.log("varios",data)
        if (!resultado.ok) throw {status: resultado.status, statusText: resultado.statusText};
        return data
    } catch (error) {
        let message = error.statusText || "ocurrio un error"
        let contenido = `<h2>${message}</h2>`
        contentVacioVarios.insertAdjacentHTML("afterbegin", contenido)
    }
}

export const consultasApi = {
    productosStar,
    productosConsolas,
    productosVarios
};



const contentVacioStar = document.getElementById("productos__box--star")
const contentVacioConsolas = document.getElementById("productos__box--consolas")
const contentVacioVarios = document.getElementById("productos__box--varios")


const productosStar = async () => {
    try {
        const resultado = await fetch("https://prueba-carga-e2485-default-rtdb.firebaseio.com/star.json")
        const data = await resultado.json();
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
        const resultado = await fetch("https://prueba-carga-e2485-default-rtdb.firebaseio.com/consolas.json")
        const data = await resultado.json();
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
        const resultado = await fetch("https://prueba-carga-e2485-default-rtdb.firebaseio.com/varios.json")
        const data = await resultado.json();
        if (!resultado.ok) throw {status: resultado.status, statusText: resultado.statusText};
        return data
    } catch (error) {
        let message = error.statusText || "ocurrio un error"
        let contenido = `<h2>${message}</h2>`
        contentVacioVarios.insertAdjacentHTML("afterbegin", contenido)
    }
}

const productosConsolasGeneral = async (url) => {
    try {
        const resultado = await fetch(url)
        const data = await resultado.json();
        if (!resultado.ok) throw { status: resultado.status, statusText:resultado.statusText}
        return data
    } catch (error) {
        let message = error.statusText || "Ocurrio un error"
        return message
    }
}

export const consultasApi = {
    productosStar,
    productosConsolas,
    productosVarios,
    productosConsolasGeneral
};



const elementoStar = async () => {
    try {
        const resultado = await fetch("http://localhost:3000/star")
        const data = await resultado.json();
        console.log("uno",data)
        return data
    } catch (error) {
        console.log("error", error)
    }
}

const elementoConsola = async () => {
    try {
        const resultado = await fetch("http://localhost:3000/consolas")
        const data2 = await resultado.json();
        console.log("dos",data2)
        return data2
    } catch (error) {
        console.log("error", error)
    }
}

const elementoVarios = async () => {
    try {
        const resultado = await fetch("http://localhost:3000/varios")
        const data3 = await resultado.json();
        console.log("tres",data3)
        return data3
    } catch (error) {
        console.log("error", error)
    }
}




// export const paraCliente = {
//     elementoStar,
//     elementoConsola,
//     elementoVarios,
//     elementodos
// }
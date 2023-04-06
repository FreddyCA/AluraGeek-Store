import { paraCliente } from "../../service/pruebas.js";


const obtenerData = async () => {
    const data = await paraCliente.elementoStar();
    console.log("modulo satr",data)
}

obtenerData()
// paraCliente.elementouno()
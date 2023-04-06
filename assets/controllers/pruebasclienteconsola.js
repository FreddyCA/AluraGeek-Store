import { paraCliente } from "../../service/pruebas.js";


const obtenerData = async () => {
    const data = await paraCliente.elementoConsola();
    console.log("modulo consola",data)
}

obtenerData()
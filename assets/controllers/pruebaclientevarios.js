import { paraCliente } from "../../service/pruebas.js";

const obtenerData = async () => {
    const data = await paraCliente.elementoVarios();
    console.log("modulo varios",data)
}
obtenerData()
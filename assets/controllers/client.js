import { clienteServices } from "../../service/clienteService.js";


// clienteServices.prueba()
clienteServices.listaProductosStar().then((data) => {
    data.forEach(element => {
        console.log(element)
    });
})
import { consultasApi } from "../service/clienteService.js";
import { paraEditar } from "./agrupandoDatos.js";

const contenedorStar = document.getElementById("productos__box--star");
const contenedorConsola = document.getElementById("productos__box--consolas");
const contenedorVarios = document.getElementById("productos__box--varios");
const templateMolde = document.getElementById("productos__molde").content;
const fragmentoMolde = document.createDocumentFragment();

const agregarProducto = document.querySelector(".productos__agregar");
agregarProducto.addEventListener("click", () => {
  sessionStorage.clear();
});

const obtenerDataStar = async () => {
  const dataStart = await consultasApi.productosStar();
  return dataStart;
};

const obtenerDataConsola = async () => {
  const dataConsola = await consultasApi.productosConsolas();
  return dataConsola;
};

const obtenerDataVarios = async () => {
  const dataVarios = await consultasApi.productosVarios();
  return dataVarios;
};

document.addEventListener("DOMContentLoaded", async () => {
  const dataStart = await obtenerDataStar();
  const dataConsola = await obtenerDataConsola();
  const dataVarios = await obtenerDataVarios();
  armarMaqueta(dataStart, contenedorStar);
  armarMaqueta(dataConsola, contenedorConsola);
  armarMaqueta(dataVarios, contenedorVarios);
  paraEditar.seleccionandoDatos();
});

const armarMaqueta = (data, lugar) => {
  if (data !== undefined) {
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        templateMolde
          .querySelector(".producto__molde--img")
          .setAttribute("src", element.img);
        templateMolde
          .querySelector(".producto__molde--img")
          .setAttribute("alt", element.nombre);
        templateMolde.querySelector(".producto__molde--nombre").textContent =
          element.nombre;
        templateMolde.querySelector(".producto__molde--nombre").setAttribute("id", key)
        templateMolde.querySelector(".producto__molde--precio").textContent =
          element.precio;
        templateMolde.querySelector(
          ".producto__molde--descripcion"
        ).textContent = element.descripcion;
        let cloneElemento = document.importNode(templateMolde, true);
        fragmentoMolde.appendChild(cloneElemento);
      }
    }
  }
  lugar.appendChild(fragmentoMolde);
};

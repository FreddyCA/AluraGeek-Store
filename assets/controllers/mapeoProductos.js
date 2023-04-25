import { consultasApi } from "../service/clienteService.js";
import { paraEditar } from "./agrupandoDatos.js";
import { cargando } from "./loading.js";
import { cerrarSesion } from "./datosImagen.js";
import { producto } from "./detallesProducto.js";
import { buscador } from "./buscador.js";
import { inputsContacto } from "./contacto.js";

const contenedorStar = document.getElementById("productos__box--star");
const contenedorConsola = document.getElementById("productos__box--consolas");
const contenedorVarios = document.getElementById("productos__box--varios");
const templateMolde = document.getElementById("productos__molde").content;
const fragmentoMolde = document.createDocumentFragment();

const cerrarBtn = document.querySelector(".cabecera__usuario--cerrar");
const volverBtn = document.querySelector(".productos__volver");

volverBtn.addEventListener("click", () => {
  history.back();
});

cerrarBtn.addEventListener("click", async () => {
  const contextoDelete = await swal({
    title: "¿Está seguro de cerrar sesión?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });
  if (contextoDelete) {
    await cerrarSesion();
    window.location.replace("../../index.html");
  }
});

const vemosProducto = async () => {
  await producto.detallesProducto();
};

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
  cargando.mostrarCargando();
  const dataStart = await obtenerDataStar();
  const dataConsola = await obtenerDataConsola();
  const dataVarios = await obtenerDataVarios();
  armarMaqueta(dataStart, contenedorStar);
  armarMaqueta(dataConsola, contenedorConsola);
  armarMaqueta(dataVarios, contenedorVarios);
  paraEditar.seleccionandoDatos();
  await vemosProducto();
  buscador();
  inputsContacto()
  cargando.quitarCargando();
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
        templateMolde
          .querySelector(".producto__molde--nombre")
          .setAttribute("id", key);
        templateMolde.querySelector(
          ".producto__molde--precio"
        ).textContent = `$ ${element.precio}`;
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

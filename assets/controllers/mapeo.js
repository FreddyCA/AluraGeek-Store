import { consultasApi } from "../service/clienteService.js";
const contenedorStar = document.getElementById("productos__box--star");
const contenedorConsola = document.getElementById("productos__box--consolas");
const contenedorVarios = document.getElementById("productos__box--varios");

const templateStar = document.getElementById("productos__star").content;
const fragmentoStar = document.createDocumentFragment();

// obteniendo start
let cacheDataStart = null;
const obtenerDataStar = async () => {
  const dataStart = await consultasApi.productosStar();
  return dataStart;
};
const elementosStar = async () => {
  if (!cacheDataStart) {
    cacheDataStart = await obtenerDataStar();
  }
  return cacheDataStart;
};

// obteniendo consola
let cacheDataConsola = null;
const obtenerDataConsola = async () => {
  const dataConsola = await consultasApi.productosConsolas();
  return dataConsola;
};
const elementosConsola = async () => {
  if (!cacheDataConsola) {
    cacheDataConsola = await obtenerDataConsola();
  }
  return cacheDataConsola;
};

// obteniedo varios
let cacheDataVarios = null;
const obtenerDataVarios = async () => {
  const dataVarios = await consultasApi.productosVarios();
  return dataVarios;
};
const elementosVarios = async () => {
  if (!cacheDataVarios) {
    cacheDataVarios = await obtenerDataVarios();
  }
  return cacheDataVarios;
};

// cargando archivos

document.addEventListener("DOMContentLoaded", async () => {
  await elementosStar();
  await elementosConsola();
  await elementosVarios();
  armarMaqueta(cacheDataStart, contenedorStar);
  armarMaqueta(cacheDataConsola, contenedorConsola);
  armarMaqueta(cacheDataVarios, contenedorVarios);
});

window.addEventListener("resize", async () => {
  restablecerMaqueta(contenedorStar);
  restablecerMaqueta(contenedorConsola)
  restablecerMaqueta(contenedorVarios)
  armarMaqueta(cacheDataStart, contenedorStar);
  armarMaqueta(cacheDataConsola, contenedorConsola);
  armarMaqueta(cacheDataVarios, contenedorVarios);
});

const restablecerMaqueta = (campo) => {
  while (campo.firstChild) {
    campo.removeChild(campo.firstChild);
  }
};

const armarMaqueta = (data, campo) => {
    if (data !== undefined) {
        if (window.innerWidth <= 768) {
            maquetar(data, 4, campo);
          } else {
            maquetar(data, 5, campo);
          }
    }
};

const maquetar = (data, columnas, campo) => {
  data.forEach((element, index) => {
    if (index < columnas) {
      templateStar
        .querySelector(".producto__molde--img")
        .setAttribute("src", element.img);
      templateStar
        .querySelector(".producto__molde--img")
        .setAttribute("alt", element.nombre);
      templateStar.querySelector(".producto__molde--nombre").textContent =
        element.nombre;
      templateStar.querySelector(".producto__molde--precio").textContent =
        element.precio;
      let cloneStar = document.importNode(templateStar, true);
      fragmentoStar.appendChild(cloneStar);
    }
  });
  campo.appendChild(fragmentoStar);
};

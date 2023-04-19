import { consultasApi } from "../service/clienteService.js";
import { usuarioLogin } from "../service/usuario.js";
import { cargando } from "./loading.js";

const contenedorStar = document.getElementById("productos__box--star");
const contenedorConsola = document.getElementById("productos__box--consolas");
const contenedorVarios = document.getElementById("productos__box--varios");
const templateValidado = document.getElementById(
  "productos__si--validado"
).content;
const templateNoValidado = document.getElementById(
  "productos__no--validado"
).content;
let templateValido = null;

const fragmentoStar = document.createDocumentFragment();

let loginActivo = true;
const menuNav = () => {
  loginActivo = usuarioLogin.existeElemento();

  let cabeceraContenedor = document.querySelector(".cabecera__contenedor");
  const btlogin = cabeceraContenedor.querySelector(".cabecera__login--link");
  const nameLogin = cabeceraContenedor.querySelector(".cabecera__usuario");
  if (loginActivo) {
    templateValido = templateNoValidado;
    nameLogin.remove();
  } else {
    templateValido = templateValidado;
    btlogin.remove();
  }
};

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
  cargando.mostrarCargando()
  menuNav();
  await elementosStar();
  await elementosConsola();
  await elementosVarios();
  armarMaqueta(cacheDataStart, contenedorStar);
  armarMaqueta(cacheDataConsola, contenedorConsola);
  armarMaqueta(cacheDataVarios, contenedorVarios);
  cargando.quitarCargando()
});

window.addEventListener("resize", async () => {
  restablecerMaqueta(contenedorStar);
  restablecerMaqueta(contenedorConsola);
  restablecerMaqueta(contenedorVarios);
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
  let contador = 0;
  for (const key in data) {
    if (contador >= columnas) {
      break
    }
    contador++
    if (Object.hasOwnProperty.call(data, key)) {
      const element = data[key];
      templateValido
        .querySelector(".producto__molde--img")
        .setAttribute("src", element.img);
      templateValido
        .querySelector(".producto__molde--img")
        .setAttribute("alt", element.nombre);
      templateValido.querySelector(".producto__molde--nombre").textContent =
        element.nombre;
      templateValido.querySelector(".producto__molde--precio").textContent =
        element.precio;
      let cloneStar = document.importNode(templateValido, true);
      fragmentoStar.appendChild(cloneStar);
    }
    campo.appendChild(fragmentoStar);
  }

};

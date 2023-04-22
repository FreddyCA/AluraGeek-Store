import { cerrarSesion } from "./datosImagen.js";
import { consultasApi } from "../service/clienteService.js";
import { cargando } from "./loading.js";
const cerrarBtn = document.querySelector(".cabecera__usuario--cerrar");
const productoImagen = document.querySelector(".productoA__img");
const productoNombre = document.querySelector(".productoA__nombre");
const productoPrecio = document.querySelector(".productoA__precio");
const productoDesc = document.querySelector(".productoA__desc");
const campoSimilares = document.querySelector(".productos__box");
const templateValido = document.getElementById(
  "productos__si--validado"
).content;
const fragmentoStar = document.createDocumentFragment();
const btnBack = document.querySelector(".productoA__atras")
btnBack.addEventListener("click", () => {
  history.back();
})

document.addEventListener("DOMContentLoaded", async () => {
  cargando.mostrarCargando()
  await armandoUrl();
  cargando.quitarCargando()
});

const armandoUrl = async () => {
  const categoria = sessionStorage.getItem("cajaDet");
  const idNombre = sessionStorage.getItem("nombreDet");
  if (sessionStorage.length > 0) {
    const url = "https://prueba-carga-e2485-default-rtdb.firebaseio.com/";
    const urlGeneral = `${url}${categoria}/${idNombre}.json`;
    const data = await consultasApi.productosConsolasGeneral(urlGeneral);
    const urlGrupo = `${url}${categoria}.json`;
    const dataGeneral = await consultasApi.productosConsolasGeneral(urlGrupo);
    armarProducto(data);
    maquetar(dataGeneral, campoSimilares, templateValido, idNombre);
    informacionDetalle(categoria);
    return;
  }
};

const informacionDetalle = (categoria) => {
  const detalles = document.querySelectorAll(".producto__molde--link");
  if ( detalles.length === 0) {
    const mih3 = document.createElement('h4')
    mih3.textContent = 'No hay productos similares'
    campoSimilares.appendChild(mih3)
  }
  detalles.forEach((element) => {
    element.addEventListener("click", (e) => {
      const cajaId = categoria;
      const elementoCaja = e.target.parentNode.parentNode;
      const nombreId = elementoCaja.querySelector(
        ".producto__molde--nombre"
      ).id;
      sessionStorage.setItem("cajaDet", cajaId);
      sessionStorage.setItem("nombreDet", nombreId);
    });
  });
};

const maquetar = (data, campo, templateValido, idNombre) => {
  for (const key in data) {
    if (Object.hasOwnProperty.call(data, key)) {
      if (key !== idNombre) {
        const element = data[key];
        templateValido
          .querySelector(".producto__molde--img")
          .setAttribute("src", element.img);
        templateValido
          .querySelector(".producto__molde--img")
          .setAttribute("alt", element.nombre);
        templateValido.querySelector(".producto__molde--nombre").textContent =
          element.nombre;
        templateValido
          .querySelector(".producto__molde--nombre")
          .setAttribute("id", key);
        templateValido.querySelector(".producto__molde--precio").textContent =
          element.precio;
        let cloneStar = document.importNode(templateValido, true);
        fragmentoStar.appendChild(cloneStar);
      }
    }
    campo.appendChild(fragmentoStar);
  }
};

const armarProducto = (data) => {
  productoImagen.setAttribute("src", data.img);
  productoImagen.setAttribute("alt", data.nombre);
  productoNombre.textContent = data.nombre;
  productoPrecio.textContent = `$ ${data.precio}`;
  productoDesc.textContent = data.descripcion;
};

cerrarBtn.addEventListener("click", async () => {
  const contextoDelete = await swal({
    title: "¿Está seguro de cerrar sesión?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });
  if (contextoDelete) {
    await cerrarSesion();
    sessionStorage.clear();
    window.location.replace("../../index.html");
  }
});

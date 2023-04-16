import { paraSubir } from "./agregarObjeto.js";

const inputImagen = document.getElementById("imagen");
const imagenPreview = document.querySelector(".addProducto__imagen--load");
let archivoImagen = null;
let uuid = null;
const inputCampo = document.getElementById("selectCampo");
const inputNombre = document.getElementById("name");
const inputPrecio = document.getElementById("precio");
const inputDescripcion = document.getElementById("descripcion");
const agregarProductoBtn = document.querySelector(".addProducto__btn");

const btnAtras = document.querySelector(".addProducto__atras");
btnAtras.addEventListener("click", () => {
  history.back();
});

inputImagen.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  archivoImagen = file;
  uuid = self.crypto.randomUUID();
  reader.addEventListener("load", function () {
    const image = new Image();
    image.src = reader.result;
    imagenPreview.innerHTML = "";
    imagenPreview.appendChild(image);
    imagenPreview.style.display = "block";
  });

  if (file) {
    reader.readAsDataURL(file);
  } else {
    imagenPreview.innerHTML = "";
    imagenPreview.style.display = "none";
  }
});

agregarProductoBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if ((await archivoImagen) == null) {
    // agregar loading caragando etc
    console.log("cargue la imagen");
    return;
  }
  await obtenerCampo();
});

const obtenerCampo = async () => {
  const textoCampoSeleccionado = inputCampo.value;
  const textoNombre = inputNombre.value;
  const textoPrecio = inputPrecio.value;
  const textoDescripcion = inputDescripcion.value;
  await paraSubir.subirObjeto(
    uuid,
    archivoImagen,
    textoCampoSeleccionado,
    textoNombre,
    textoPrecio,
    textoDescripcion
  );
};

const datosCargado = () => {
  const nombre = sessionStorage.getItem("nombre");
  const precio = sessionStorage.getItem("precio");
  const descripcion = sessionStorage.getItem("descripcion");
  inputNombre.value = nombre;
  inputPrecio.value = precio;
  inputDescripcion.value = descripcion;
};

document.addEventListener("DOMContentLoaded", () => {
  datosCargado();
});

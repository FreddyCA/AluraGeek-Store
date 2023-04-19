import { paraSubir } from "./agregarObjeto.js";
import { consultasApi } from "../service/clienteService.js";
import { subirArchivo } from "./datosImagen.js";
import { URLimagenDelete } from "./datosImagen.js";
import { cargando } from "./loading.js";

const inputImagen = document.getElementById("imagen");
const imagenPreview = document.querySelector(".addProducto__imagen--load");
let archivoImagen = null;
let uuid = null;
let estadoEdit = false;
let contenedorData = null;
const inputCampo = document.getElementById("selectCampo");
const inputNombre = document.getElementById("name");
const inputPrecio = document.getElementById("precio");
const inputDescripcion = document.getElementById("descripcion");
const agregarProductoBtn = document.querySelector(".addProducto__btn");
const editarBtn = document.querySelector(".addProducto__btn--edit");
const spacioSelect = document.querySelector(".addProducto__caja--select");
const nombreSelect = document.querySelector(".addProducto__nombre--select");
let urlData = null;
let imagenActual = null;
let imgData = null;
let urlImg = null;

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
  cargando.mostrarCargando()
  if ((await archivoImagen) == null) {
    // agregar loading caragando etc
    console.log("cargue la imagen");
    return;
  }
  await obtenerCampo();
  cargando.quitarCargando()
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

const editarDatos = async () => {
  if (sessionStorage.length > 0) {
    cargando.mostrarCargando()
    editarBtn.style.display = "block";
    agregarProductoBtn.style.display = "none";
    const id = sessionStorage.getItem("idNew");
    const idMayor = sessionStorage.getItem("idNewMayor");
    const contenedor = idMayor.split("--");
    contenedorData = contenedor[1];
    const urlGeneral =
      "https://prueba-carga-e2485-default-rtdb.firebaseio.com/";
    urlData = `${urlGeneral}${contenedorData}/${id}.json`;
    const dataGeneral = await consultasApi.productosConsolasGeneral(urlData);

    const nombre = dataGeneral.nombre;
    const precio = dataGeneral.precio;
    const descripcion = dataGeneral.descripcion;

    inputNombre.value = nombre;
    inputPrecio.value = precio;
    inputDescripcion.value = descripcion;

    inputCampo.querySelectorAll("option").forEach((opcion) => {
      if (opcion.value === contenedorData) {
        opcion.selected = true;
      }
    });


    const image = new Image();
    image.src = dataGeneral.img;
    imagenActual = image.src;
    imagenPreview.innerHTML = "";
    imagenPreview.appendChild(image);
    imagenPreview.style.display = "block";

    cargando.quitarCargando()

    inputImagen.addEventListener("change", () => {
      uuid = self.crypto.randomUUID();
      estadoEdit = true;
    });
    definirCampo(contenedorData);
    spacioSelect.addEventListener("click", (e) => {
      nombreSelect.textContent = "No se puede cambiar la categoría*";
      nombreSelect.style.color = "red";
    });
    return;
  }
};

const definirCampo = (contenedor) => {
  const spanElemento = document.createElement("span");
  inputCampo.querySelectorAll("option").forEach((opcion) => {
    if (opcion.value === contenedor) {
      spanElemento.textContent = opcion.textContent;
      spanElemento.classList.add("addProducto__texto");
      inputCampo.replaceWith(spanElemento);
      return;
    }
  });
};

editarBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  cargando.mostrarCargando()
  if (imagenPreview.style.display === "none") {
    console.log("falta imagen");
    return;
  }

  if (estadoEdit == true) {
    urlImg = await subirArchivo(archivoImagen, uuid);
    URLimagenDelete(imagenActual);
  } else {
    urlImg = imagenActual;
  }

  imgData = urlImg;
  const nombreData = inputNombre.value;
  const precioData = inputPrecio.value;
  const descripcionData = inputDescripcion.value;

  const dataGeneralSinImagen = {
    nombre: nombreData,
    precio: precioData,
    descripcion: descripcionData,
  };

  const dataGeneralConImagen = {
    img: imgData,
    nombre: nombreData,
    precio: precioData,
    descripcion: descripcionData,
  };
  if (estadoEdit === false) {
    await parchandoData(dataGeneralSinImagen);
  } else {
    await parchandoData(dataGeneralConImagen);
  }
  cargando.quitarCargando()
  sessionStorage.clear();
});



const parchandoData = async (data) => {
  try {
    const respuesta = await fetch(urlData, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });
    if (respuesta.status === 200) {
      await swal("El Producto fue editado", {
        icon: "success",
      });
      history.back();
    } else {
      throw new Error("Intente más tarde");
    }
  } catch (error) {
    swal("ERROR: No se pudo editar", "Intente mas tarde", "error");
  }
};





document.addEventListener("DOMContentLoaded", async () => {
  await editarDatos();
});

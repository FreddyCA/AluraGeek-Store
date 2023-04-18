import { paraSubir } from "./agregarObjeto.js";
import { consultasApi } from "../service/clienteService.js";
import { subirArchivo } from "./datosImagen.js";

const inputImagen = document.getElementById("imagen");
const imagenPreview = document.querySelector(".addProducto__imagen--load");
let archivoImagen = null;
let uuid = null;
let estadoEdit = false;
let contenedorData = null
const inputCampo = document.getElementById("selectCampo");
const inputNombre = document.getElementById("name");
const inputPrecio = document.getElementById("precio");
const inputDescripcion = document.getElementById("descripcion");
const agregarProductoBtn = document.querySelector(".addProducto__btn");
const editarBtn = document.querySelector(".addProducto__btn--edit");
let urlData = null

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

const editarDatos = async () => {
  if (sessionStorage.length > 0) {
    // agregarProductoBtn.textContent = 'Enviar datos'
    editarBtn.style.display = "block";
    agregarProductoBtn.style.display = "none";
    console.log("si hay datos, no se salta a otro codigo");
    const id = sessionStorage.getItem("idNew");
    const idMayor = sessionStorage.getItem("idNewMayor");
    const contenedor = idMayor.split("--");
    contenedorData = contenedor[1];

    console.log(id);
    const urlGeneral =
      "https://prueba-carga-e2485-default-rtdb.firebaseio.com/";
    urlData = `${urlGeneral}${contenedorData}/${id}.json`;
    console.log(urlData);
    const dataGeneral = await consultasApi.productosConsolasGeneral(urlData);

    const nombre = dataGeneral.nombre;
    const precio = dataGeneral.precio;
    const descripcion = dataGeneral.descripcion;

    inputNombre.value = nombre;
    inputPrecio.value = precio;
    inputDescripcion.value = descripcion;

    console.log(contenedorData);
    inputCampo.querySelectorAll("option").forEach((opcion) => {
      if (opcion.value === contenedorData) {
        opcion.selected = true;
      }
    });

    const image = new Image();
    image.src = dataGeneral.img;
    imagenPreview.innerHTML = "";
    imagenPreview.appendChild(image);
    imagenPreview.style.display = "block";

    inputImagen.addEventListener("change", () => {
      console.log("imagen cambiada");
      uuid = self.crypto.randomUUID();
      estadoEdit = true;
      console.log(archivoImagen);
    });
    return;
  }
  console.log("saltando al codigo, no hay datos");
};



editarBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  if (imagenPreview.style.display === "none") {
    console.log("falta imagen");
    return;
  }

  // subiendo archivo
  if (estadoEdit == true) {
    const urlImg = await subirArchivo(archivoImagen, uuid);
    console.log(urlImg);
    console.log('hay que eliminar la anterior imagen')
  }

  const campoData = inputCampo.value;
  const nombreData = inputNombre.value;
  const precioData = inputPrecio.value;
  const descripcionData = inputDescripcion.value;

  if (campoData !== contenedorData ) {
    console.log("es distinto campo, se debe eliminar y crear otro nodo")
    return
  }
  const dataGeneralSinImagen = {
    nombre: nombreData,
    precio: precioData,
    descripcion: descripcionData,
  };
  await parchandoData(dataGeneralSinImagen)
  console.log('se parcho')
  // console.log(campoData, nombreData, precioData, descripcionData, estadoEdit);
});

const parchandoData = async (data ) => {

  try {
    const respuesta = await fetch(urlData, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      body: JSON.stringify(data)
    });
    if (respuesta.status === 200) {
      console.log("parchado exitosamente")
    } else { 
      console.log("Error")
    }
    
  } catch (error) {
    console.log(error)
  }

  // console.log(data)
  console.log(urlData)
};




document.addEventListener("DOMContentLoaded", async () => {
  await editarDatos();
});

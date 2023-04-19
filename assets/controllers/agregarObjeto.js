import { subirArchivo } from "./datosImagen.js";
const subirObjeto = async (
  uuid,
  archivoImagen,
  textoCampoSeleccionado,
  textoNombre,
  textoPrecio,
  textoDescripcion
) => {
  const urlImg = await subiendoImagen(archivoImagen, uuid);
  await armandoData(
    urlImg,
    textoCampoSeleccionado,
    textoNombre,
    textoPrecio,
    textoDescripcion
  );
};

const subiendoImagen = async (archivo, uuid) => {
  const respuesta = await subirArchivo(archivo, uuid);
  return respuesta;
};

const armandoData = async (
  urlImg,
  textoCampoSeleccionado,
  textoNombre,
  textoPrecio,
  textoDescripcion
) => {
  const urlApi = "https://prueba-carga-e2485-default-rtdb.firebaseio.com/";
  const campo = textoCampoSeleccionado;
  const urlPOST = `${urlApi}${campo}.json`;
  const data = {
    img: urlImg,
    nombre: textoNombre,
    precio: textoPrecio,
    descripcion: textoDescripcion,
  };

  await postData(urlPOST, data);
};

const postData = async (urlPOST, data) => {
  try {
    const response = await fetch(urlPOST, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 200) {
      await swal({
        title: "¡Buen Trabajo!",
        text: "El producto fue agregado exitosamente",
        icon: "success",
        button: "ok",
      });
      history.back();
    } else {
        throw new Error('Proceso fallido')
    }
  } catch (error) {
    await swal({
        title: error,
        text: "ERROR: No se pudo agregar",
        icon: "error",
        button: "ok",
      });
  }
};

export const paraSubir = {
  subirObjeto,
  postData
};

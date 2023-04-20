import { URLimagenDelete } from "./datosImagen.js";
import { cargando } from "./loading.js";
const borrandoObjeto = async (id, idMayor, imagenURL) => {
  const nombreSeparado = idMayor.split("--");
  const nombreContenedor = nombreSeparado[1];
  const estadoDelete = await confirmarDelete();
  if (estadoDelete) {
    cargando.mostrarCargando()
    const urlGeneral = "https://prueba-carga-e2485-default-rtdb.firebaseio.com";
    const urlDirecto = `${urlGeneral}/${nombreContenedor}/${id}.json`;
    await deleteData(urlDirecto, imagenURL);
  }
  cargando.quitarCargando()
};

const confirmarDelete = async () => {
  const contextoDelete = await swal({
    title: "¿Está seguro de eliminar el Producto?",
    text: "Una vez eliminado, no habrá modo de recuperarlo",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });
  return contextoDelete;
};

const deleteData = async (url, imagenURL) => {
  try {
    const respuesta = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    if (respuesta.status === 200) {
      await eliminarDataImagen(imagenURL)
      await swal("El Producto fue eliminado", {
        icon: "success",
      });
      document.location.reload();
    } else {
      throw new Error("Intente más tarde");
    }
  } catch (error) {
    swal("ERROR: No se pudo eliminar", "Intente mas tarde", "error");
  }
};

const eliminarDataImagen = async (imagenURL) => {
  URLimagenDelete(imagenURL)
}

export const deleteObjeto = {
  borrandoObjeto,
  deleteData
};

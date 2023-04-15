const borrandoObjeto = async (id, idMayor) => {
  const nombreSeparado = idMayor.split("--");
  const nombreContenedor = nombreSeparado[1];
  const estadoDelete = await confirmarDelete();
  if (estadoDelete) {
    const urlGeneral = "https://prueba-carga-e2485-default-rtdb.firebaseio.com";
    const urlDirecto = `${urlGeneral}/${nombreContenedor}/${id}.json`;

    const analisis = await deleteData(urlDirecto);
    if (analisis) {
      // document.location.reload();
    } else {
      // swal("ERROR: No se pudo eliminar", "Intente más tarde", "error");
    }
  }
};

const confirmarDelete = async () => {
  const contextoDelete = await swal({
    title: "¿Está seguro de eliminar el Producto?",
    text: "Una vez eliminado, no habrá modo de recuperarlo",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  });
  // if (contextoDelete) {
  //   // await swal("El Producto fue eliminado", {
  //   //   icon: "success",
  //   // });
  // } else {
  //   swal("El Producto NO fue eliminado");
  //   return false;
  // }
  return true;
};

const deleteData = async (url) => {
  try {
    const respuesta = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    if (respuesta.status === 200) {
      await swal("El Producto fue eliminado", {
        icon: "success",
      });
      document.location.reload();

      // return true;

    } else {
      throw new Error('Intente más tarde')
      // return false;
    }
  } catch (error) {
    swal("ERROR: No se pudo eliminar", error, "error");
    // return false;
  }
};

export const deleteObjeto = {
  borrandoObjeto,
};

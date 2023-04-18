import { deleteObjeto } from "./borrarObjeto.js";

const seleccionandoDatos = () => {
  const editar = document.querySelectorAll(".producto__herramienta--editar");
  editar.forEach((element) => {
    element.addEventListener("click", async (e) => {
      const elementoMolde = e.target.parentNode.parentNode;
      await extrayendoData(elementoMolde);
    });
  });
  const borrar = document.querySelectorAll(".producto__herramienta--borrar");
  borrar.forEach((element) => {
    element.addEventListener("click", async (e) => {
      const elementoMolde = e.target.parentNode.parentNode;
      await extrayendoId(elementoMolde);
    });
  });
};

const extrayendoId = async (elementoMolde) => {
  const elementosGrupo = elementoMolde.children[1].children;
  const id = elementosGrupo[0].id;
  const elementoMayor = elementoMolde.parentNode;
  const idMayor = elementoMayor.id;
  const fuenteImagen = elementoMolde.children[0].src;
  await enviandoId(id, idMayor, fuenteImagen);
};

const enviandoId = async (id, idMayor, imagenURL) => {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("idMayor", idMayor);

  await deleteObjeto.borrandoObjeto(id, idMayor, imagenURL);
};

const extrayendoData = async (elementoMolde) => {
  const elementosGrupo = elementoMolde.children[1].children;
  const id = elementosGrupo[0].id;
  const elementoMayor = elementoMolde.parentNode
  const idMayor = elementoMayor.id
  await addStorage(id, idMayor)


  const nombre = elementosGrupo[0].textContent;
  const precio = elementosGrupo[1].textContent;
  const descripcion = elementosGrupo[2].textContent;

  await agregandoAlStorage(nombre, precio, descripcion, id);
};

const addStorage= async (id, idMayor) => {
  sessionStorage.setItem("idNew", id)
  sessionStorage.setItem("idNewMayor", idMayor)
}

export const paraEditar = {
  seleccionandoDatos,
};

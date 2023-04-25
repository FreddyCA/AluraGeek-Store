export const buscador = () => {
  const inputBuscar = document.querySelector(".cabecera__buscar--input");
  const inputImg = document.querySelector(".cabecera__buscar--img");
  inputBuscar.value = ''
  inputBuscar.setAttribute("maxlength", 35)
  const listaSimilares = document.querySelector(
    ".cabecera__buscar--resultados"
  );
  const elementosNodo = Array.from(
    document.querySelectorAll(".producto__molde--nombre")
  );
  const elementosTexto = elementosNodo.map((element) =>
    element.textContent.toLowerCase()
  );
  let timeArmado
  inputBuscar.addEventListener("input", async () => {
    await eliminandoLista()
    clearTimeout(timeArmado)
    timeArmado = setTimeout(armandoLista, 500)
  })
  const eliminandoLista = async () => {
    while (listaSimilares.firstChild) {
      listaSimilares.removeChild(listaSimilares.firstChild);
    }
  };
  const armandoLista = () => {
    const valorInput = inputBuscar.value.trim().toLowerCase();
    if (valorInput.length < 2) {
      return;
    }
    const conincidencias = elementosTexto.filter((elemento) => {
      return elemento.includes(valorInput);
    });
    conincidencias.forEach((elemento) => {
      const li = document.createElement("li");
      li.textContent = elemento;
      li.classList.add("cabecera__buscar--lista");
      listaSimilares.appendChild(li);
    });
    const buscadorInput = document.querySelector(".cabecera__buscar");
    document.addEventListener("click", (e) => {
      if (
        !buscadorInput.contains(e.target) &&
        !listaSimilares.contains(e.target)
      ) {
        eliminandoLista();
      }
    });
    const elementosBuscado = document.querySelectorAll(
      ".cabecera__buscar--lista"
    );
    elementosBuscado.forEach((element) => {
      element.addEventListener("click", (e) => {
        const ElementoSeleccionado = e.target.textContent;
        const listaElementosDom = document.querySelectorAll(
          ".producto__molde--nombre"
        );
        listaElementosDom.forEach((element) => {
          const elementoTexto = element.textContent.toLowerCase();
          if (elementoTexto === ElementoSeleccionado) {
            element.scrollIntoView({ block: "center", behavior: "smooth" });
            const moldeSeleccionado = element.closest(".producto__molde");
            function resaltando() {
                const previoLetra = element.style.fontWeight
                const previoBg = moldeSeleccionado.style.background
              element.style.fontWeight = "bold";
              moldeSeleccionado.style.background = "#CFE4FA";
              setTimeout(() => {
                element.style.fontWeight = previoLetra;
                moldeSeleccionado.style.background = previoBg;
              }, 3000);
            }
            resaltando()
            eliminandoLista();
            return;
          }
        });
      });
    });
  }
  inputImg.addEventListener("mousedown", () => {
    eliminandoLista()
    armandoLista()
  });
};

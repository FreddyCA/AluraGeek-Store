export const buscador = () => {
  console.log("hola");
  const inputBuscar = document.querySelector(".cabecera__buscar--input");
  const inputImg = document.querySelector(".cabecera__buscar--img");

  const listaSimilares = document.querySelector(
    ".cabecera__buscar--resultados"
  );

  const elementosNodo = Array.from(
    document.querySelectorAll(".producto__molde--nombre")
  );
  const elementosTexto = elementosNodo.map((element) =>
    element.textContent.toLowerCase()
  );

  const elementosId = elementosNodo.map((element) => {
    // element.id
    console.log(element.id)
  })
//   console.log(elementosId)
  //   const elementos = ["manzana", "pera", "banana", "naranja"];
  inputImg.addEventListener("click", () => {
    // console.log() hay que reiniciar la lista
    const valorInput = inputBuscar.value.trim().toLowerCase();
    console.log(valorInput);
    if (valorInput.length < 2) {
      return;
    }
    const conincidencias = elementosTexto.filter((elemento) => {
      return elemento.includes(valorInput);
    });
    // console.log(conincidencias);
    conincidencias.forEach((elemento) => {
      const li = document.createElement("li");
      li.textContent = elemento;
      li.classList.add("cabecera__buscar--lista")
      listaSimilares.appendChild(li);
    });

    const elementosBuscado = document.querySelectorAll(".cabecera__buscar--lista")
    elementosBuscado.forEach(element => {
        element.addEventListener("click", (e) => {
            console.log('click elementos', e)
            console.log('click elementos', e.target.value.textContent)
        })
    });
    console.log(elementosBuscado)
    // console.log(listaSimilares);
  });
};

// const searchInput = document.querySelector(".cabecera__buscar--input");
// const elements = Array.from(document.querySelectorAll(".producto__molde--nombre"));
// const texts = elements.map(element => element.textContent)

// searchInput.addEventListener("input", () => {
//   console.log(texts)
//   const searchText = searchInput.value.toLowerCase().trim();
//   if (searchText === "") {
//     elements.forEach((element) => element.classList.remove("highlight"));
//     return;
//   }
//   const foundElements = elements.filter((element) =>
//     element.textContent.toLowerCase().includes(searchText)
//   );
//   elements.forEach((element) => element.classList.remove("highlight"));
//   foundElements.forEach((element) => element.classList.add("highlight"));
//   if (foundElements.length > 0) {
//     foundElements[0].scrollIntoView();
//   }
// });

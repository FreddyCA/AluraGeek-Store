export const inputsContacto = () => {
  console.log("contacto");
  const nombreInput = document.querySelector(".rodapie__form--nombre");
  const mensajeInput = document.querySelector(".rodapie__form--mensaje");
  const contactoBtn = document.querySelector(".rodapie__form--btn");
  const formulario = document.querySelector(".rodapie__form");
  const mensajeError = document.createElement("p");

  nombreInput.addEventListener("input", (e) => {
    const campoInput = e.target;
    const textoNombre = nombreInput.value;
    espaciosBlanco(textoNombre, "Nombre");
    textosInvalidos(textoNombre, "Nombre", campoInput, 50);
  });

  mensajeInput.addEventListener("input", (e) => {
    console.log("hola")
    const campoInput = e.target;
    const textoNombre = nombreInput.value;
    espaciosBlanco(textoNombre, "Mensaje");
    textosInvalidos(textoNombre, "Mensaje", campoInput, 1500);
    console.log(campoInput)
  });

  const espaciosBlanco = (texto, campo) => {
    if (texto.trim() == "") {
      console.log("esat vacio");
      mensajeError.textContent = `El ${campo} no puede estar vacío`;
      formulario.appendChild(mensajeError);
      return;
    } else {
      if (formulario.contains(mensajeError)) {
        mensajeError.remove();
      }
      return;
    }
  };

  const textosInvalidos = (texto, campo, campoInput, cantidad) => {
    let regexMen = /[<>{}^'"`´;$+\:=?\[\]\\]/g;
    if (regexMen.test(texto)) {
      const longInput = texto.length;
      campoInput.setAttribute("maxlength", longInput);
      mensajeError.textContent = `El ${campo} no admite caracteres extraños`;
      formulario.appendChild(mensajeError);
      return;
    } else {
      campoInput.setAttribute("maxlength", cantidad);
      if (formulario.contains(mensajeError)) {
        mensajeError.remove();
      }
      return;
    }
  };
};

export const inputsContacto = () => {
  const nombreInput = document.querySelector(".rodapie__form--nombre");
  const mensajeInput = document.querySelector(".rodapie__form--mensaje");
  const mensajesError = document.querySelectorAll(".rodapie__form--error");
  const formulario = document.querySelector(".rodapie__form");
  formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    let verificandoError = false;
    mensajesError.forEach((mensaje) => {
      if (mensaje.textContent !== "") {
        verificandoError = true;
        return;
      }
    });
    if (verificandoError) {
      swal({
        text: "ERROR: No se pudo enviar el mensaje",
        icon: "error",
        button: "ok",
      });
      return;
    }
    formulario.submit();
    nombreInput.value = ''
    mensajeInput.value = ''
  });

  nombreInput.addEventListener("input", (e) => {
    const textoNombre = nombreInput.value;
    const campoInput = e.target;
    espaciosBlanco(textoNombre, "Nombre", 0);
    textosInvalidos(textoNombre, "Nombre", 0, 50, campoInput);
  });

  mensajeInput.addEventListener("input", (e) => {
    const campoInput = e.target;
    const textoNombre = mensajeInput.value;
    espaciosBlanco(textoNombre, "Mensaje", 1);
    textosInvalidos(textoNombre, "Mensaje", 1, 1500, campoInput);
  });
  let estadoMensajeVacio = false;
  const espaciosBlanco = (texto, campo, array) => {
    if (texto.trim() == "") {
      mensajesError[array].textContent = `El ${campo} no puede estar vacío`;
      estadoMensajeVacio = true;
      return;
    } else {
      mensajesError[array].textContent = "";
      estadoMensajeVacio = false;
    }
  };

  const textosInvalidos = (texto, campo, array, cantidad, campoInput) => {
    let regexMen = /[<>{}^'"`´;$+\:=?\[\]\\]/g;
    if (regexMen.test(texto)) {
      const longInput = texto.length;
      campoInput.setAttribute("maxlength", longInput);
      mensajesError[
        array
      ].textContent = `El ${campo} no admite caracteres extraños`;
      return;
    } else {
      campoInput.setAttribute("maxlength", cantidad);
      if (estadoMensajeVacio === false) {
        mensajesError[array].textContent = "";
      }
      return;
    }
  };
};

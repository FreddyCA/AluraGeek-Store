const mostrarCargando = () => {
    swal({
        title: "Cargando",
        text: "Por favor, espere un momento...",
        buttons: false,
        closeOnClickOutside: false,
        closeOnEsc: false,
      });
}

const quitarCargando = () => {
    swal.close();
}



export const cargando = {
    mostrarCargando,
    quitarCargando
}

const detallesProducto = async () => {
  const arrayProductosDetalle = document.querySelectorAll(
    ".producto__molde--link"
  );
  arrayProductosDetalle.forEach((element) => {
    element.addEventListener("click", (e) => {
      const elementoCajaId = e.target.closest('.productos__box').id;
      const cajaIdArray = elementoCajaId.split("--")
      const cajaId = cajaIdArray[1]
      const elementoCaja = e.target.parentNode.parentNode;
      const nombreId = elementoCaja.querySelector(".producto__molde--nombre").id
      sessionStorage.setItem('cajaDet', cajaId)
      sessionStorage.setItem('nombreDet', nombreId)
    });
  });
};

export const producto = {
  detallesProducto
}

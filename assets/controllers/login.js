import { login } from "./datosImagen.js";

const correo = document.querySelector(".login__correo");
const contrasena = document.querySelector(".login__password");
const loginBtn = document.querySelector(".login__btn");

loginBtn.addEventListener("click", async (e) => {
  const email = correo.value;
  const password = contrasena.value;

   const conexion = await login(email, password)
   if (conexion === "Buxm7Oy7MzSBL4jjc69fibvgfIG2") {
    history.back();
   }
});


// const validarUsuario = () => {
//     if ((correo.value === admin) && (contrasena.value === adminPassword)) {
//         window.location.href = "../../index.html";
//         estadoLogin = true
//     } else {
//         estadoLogin = false
//     }
//     return estadoLogin
// }

// const avisoIncorrecto = () => {
//     if (estadoLogin) {
//         incorrecto.style.visibility = "hidden";
//     } else {
//         incorrecto.style.visibility = "visible"
//     }
// }

import { login } from "./datosImagen.js";
console.log("hola login");

const admin = "admin@gmail.com";
const adminPassword = "admin99";
let estadoLogin = true;


const correo = document.querySelector(".login__correo");
const contrasena = document.querySelector(".login__password");
const loginBtn = document.querySelector(".login__btn");
// const incorrecto = document.querySelector(".login__incorrecto");

loginBtn.addEventListener("click", async (e) => {
  // e.preventDefault()
  console.log(correo.value);
  const email = correo.value;
  console.log(contrasena.value);
  const password = contrasena.value;

   const conexion = await login(email, password)
   console.log(conexion)
   if (conexion === "Buxm7Oy7MzSBL4jjc69fibvgfIG2") {
    console.log("bienvenido", conexion)
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

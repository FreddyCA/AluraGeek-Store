import { inputsContacto } from "./contacto.js";
import { login } from "./datosImagen.js";

const correo = document.querySelector(".login__correo");
const contrasena = document.querySelector(".login__password");
const loginBtn = document.querySelector(".login__btn");

document.addEventListener("DOMContentLoaded", () => {
  inputsContacto()
})

loginBtn.addEventListener("click", async (e) => {
  const email = correo.value;
  const password = contrasena.value;

   const conexion = await login(email, password)
   if (conexion === "Buxm7Oy7MzSBL4jjc69fibvgfIG2") {
    history.back();
   }
});


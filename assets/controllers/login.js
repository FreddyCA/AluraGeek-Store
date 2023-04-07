console.log('login')

const admin = "carlomagno@gmail.com"
const adminPassword = "ONEAlura"

const correo = document.querySelector(".login__correo")
const contrasena = document.querySelector(".login__password")
const loginBtn = document.querySelector(".login__btn")

loginBtn.addEventListener("click", () => {
    console.log('click bton')
    if ((correo.value === admin) && (contrasena.value === adminPassword)) {
        console.log('correcto')
        window.location.href = "../../index.html";
        return
    } else {
        console.log('no es')
    }
})

const valido = () => {
    usarioValido = true
    return usarioValido
}

export const loginUsuario = {
    valido
}


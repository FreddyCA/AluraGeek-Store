import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCICsEy6WB7s49wE8He8w49NVZNWZxTBPw",
  authDomain: "prueba-carga-e2485.firebaseapp.com",
  projectId: "prueba-carga-e2485",
  storageBucket: "prueba-carga-e2485.appspot.com",
  messagingSenderId: "568792523205",
  appId: "1:568792523205:web:345ad0e5325bfdd7396bac",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export const subirArchivo = async (archivo, nombre) => {
  const storageRef = ref(storage, nombre);
  await uploadBytes(storageRef, archivo);
  const url = await getDownloadURL(storageRef);
  return url;
};

export const URLimagenDelete = async (url) => {
  if (url !== undefined) {
    const imgRef = ref(storage, url);
    await deleteObject(imgRef);
  }
};

const auth = getAuth(app);

export const login = async (email, password) => {
  // console.log("llegaste al login")
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user.uid;
  } catch (error) {
    // const errorMensaje = error.message
    const errorCode = error.code;
    if (errorCode === "auth/user-not-found") {
      console.log("usuario incorrecto");
    } else if (errorCode === "auth/wrong-password") {
      console.log("contraseña incorrecta");
    } else if (errorCode === "auth/invalid-email") {
      console.log("usuario y contraseña incorrectos");
    } else {
      console.log("ocurrio un error", errorCode);
    }
    return null;
  }
};

export const cerrarSesion = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    swal("ERROR", "Intente mas tarde", "error");
  }
};
export const inicioSesion = async () => {
  let estado = false; // Inicializar la variable estado
  await new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user && user.uid === "Buxm7Oy7MzSBL4jjc69fibvgfIG2") {
        estado = true;
      }
      resolve();
    });
  });
  return estado;
};

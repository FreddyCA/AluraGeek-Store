import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-storage.js";

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
  const imgRef = ref(storage, url)
  await deleteObject(imgRef)
}


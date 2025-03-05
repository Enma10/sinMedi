// Importa Firebase y los módulos necesarios
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // <-- Agregado GoogleAuthProvider

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCcgG5jPxsRXxjFu47rogs89FNc1IZIOik",
  authDomain: "sinmedidapp.firebaseapp.com",
  projectId: "sinmedidapp",
  storageBucket: "sinmedidapp.appspot.com",
  messagingSenderId: "423987386995",
  appId: "1:423987386995:web:772118f9eec75524652806",
  measurementId: "G-6Q75MY3HBB"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Instancia de autenticación
export const auth = getAuth(app);

// Proveedor de Google para autenticación
export const provider = new GoogleAuthProvider(); // <-- Agregado y exportado

// Puedes exportar la app completa si es necesario
export default app;

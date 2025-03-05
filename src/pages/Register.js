import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from '../config/firebaseConfig';
import '../styles/Register.css';
import logo from '../images/logo.png';

const Register = () => {
  const navigate = useNavigate();
  const [registro, setRegistro] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    contraseña: '',
    confirmarContraseña: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistro({ ...registro, [name]: value });
  };

  const handleRegister = () => {
    const { nombre, correo, telefono, contraseña, confirmarContraseña } = registro;

    if (!nombre || !correo || !telefono || !contraseña || !confirmarContraseña) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      alert("Las contraseñas no coinciden.");
      return;
    }

    // Obtener registros anteriores
    const registrosPrevios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const nuevoRegistro = { ...registro, id: Date.now() };

    // Guardar en localStorage
    localStorage.setItem('usuarios', JSON.stringify([...registrosPrevios, nuevoRegistro]));

    alert("Usuario registrado con éxito.");
    navigate('/profile'); // Redirigir a Profile después de registrar
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const nuevoRegistro = {
        id: Date.now(),
        nombre: result.user.displayName,
        correo: result.user.email,
        telefono: result.user.phoneNumber || 'No registrado',
        contraseña: 'Registrado con Google', // No se guarda contraseña real
      };

      // Guardar en localStorage
      const registrosPrevios = JSON.parse(localStorage.getItem('usuarios')) || [];
      localStorage.setItem('usuarios', JSON.stringify([...registrosPrevios, nuevoRegistro]));

      alert("Usuario registrado con Google.");
      navigate('/profile'); // Redirigir a Profile después de registrar
    } catch (error) {
      console.error("Error en autenticación con Google:", error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <img src={logo} alt="Logo" className="register-logo" />
        <h1>Crear Cuenta</h1>
        <input type="text" name="nombre" placeholder="Nombre completo" onChange={handleChange} />
        <input type="email" name="correo" placeholder="Correo electrónico" onChange={handleChange} />
        <input type="tel" name="telefono" placeholder="Número de teléfono" onChange={handleChange} />
        <input type="password" name="contraseña" placeholder="Contraseña" onChange={handleChange} />
        <input type="password" name="confirmarContraseña" placeholder="Confirmar contraseña" onChange={handleChange} />

        <button className="register-button" onClick={handleRegister}>Registrarse</button>

        <button className="register-button" onClick={handleGoogleRegister}>
          Registrarse con Google
        </button>

        <p className="login-link">
          ¿Ya tienes cuenta? <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#1565c0', textDecoration: 'underline' }}>Inicia sesión</span>
        </p>
      </div>
    </div>
  );
}

export default Register;

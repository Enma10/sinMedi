import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'; // Asegúrate de que la imagen está en src/images/
import '../styles/Login.css';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <h1>Iniciar Sesión</h1>
        <input type="text" placeholder="Correo electrónico" />
        <input type="password" placeholder="Contraseña" />
        <button className="login-button">Ingresar</button>
        
        <p className="register-link">
          ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

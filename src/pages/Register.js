import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';
import logo from '../images/logo.png'; // Asegúrate de que la imagen está en src/images/

const Register = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* Botones provisionales para navegar entre vistas */}
      <div className="temp-navigation">
        <button onClick={() => navigate('/admin')}>Ir a Admin</button>
        <button onClick={() => navigate('/profile')}>Ir a Profile</button>
      </div>

      <div className="register-container">
        <div className="register-box">
          <img src={logo} alt="Logo" className="register-logo" /> {/* Logo agregado */}
          <h1>Crear Cuenta</h1>
          <input type="text" placeholder="Nombre completo" />
          <input type="email" placeholder="Correo electrónico" />
          <input type="password" placeholder="Contraseña" />
          <input type="password" placeholder="Confirmar contraseña" />
          <button className="register-button">Registrarse</button>

          <p className="login-link">
            ¿Ya tienes cuenta? <span onClick={() => navigate('/')} style={{ cursor: 'pointer', color: '#1565c0', textDecoration: 'underline' }}>Inicia sesión</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

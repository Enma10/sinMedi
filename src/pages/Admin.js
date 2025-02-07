import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Admin.css';

const Admin = () => {
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [modalType, setModalType] = useState(null);

  const pacientes = [
    { 
      id: 1, 
      nombre: 'Juan Pérez', 
      edad: 35, 
      peso: '80kg', 
      talla: '1.75m', 
      antes: '/images/juan_antes.jpg', 
      despues: '/images/juan_despues.jpg',
      calificaciones: { caminata: 8, alimentacion: 7, ejercicio: 9 }
    },
    { 
      id: 2, 
      nombre: 'María Gómez', 
      edad: 29, 
      peso: '65kg', 
      talla: '1.60m', 
      antes: '/images/maria_antes.jpg', 
      despues: '/images/maria_despues.jpg',
      calificaciones: { caminata: 9, alimentacion: 10, ejercicio: 8 }
    }
  ];

  const openModal = (paciente, type) => {
    setSelectedPaciente(paciente);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedPaciente(null);
    setModalType(null);
  };

  return (
    <div className="admin-page">
      {/* Botones para cambiar de vistas (se eliminarán después) */}
      <div className="temp-navigation">
        <Link to="/register" className="temp-button">Ir a Registro</Link>
        <Link to="/profile" className="temp-button">Ir a Perfil</Link>
      </div>

      <div className="admin-container">
        <h1 className="admin-title">Panel de Administración</h1>

        <div className="pacientes-list">
          {pacientes.map((paciente) => (
            <div key={paciente.id} className="paciente-card">
              <h3>{paciente.nombre}</h3>
              <div className="buttons">
                <button onClick={() => openModal(paciente, 'info')}>
                  Ver Información
                </button>
                <button onClick={() => openModal(paciente, 'calificaciones')}>
                  Ver Calificaciones
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedPaciente && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={closeModal}>X</button>

            {modalType === 'info' && (
              <>
                <h2>Información de {selectedPaciente.nombre}</h2>
                <p>Edad: {selectedPaciente.edad} años</p>
                <p>Peso: {selectedPaciente.peso}</p>
                <p>Talla: {selectedPaciente.talla}</p>
                <h3>Fotos de Progreso</h3>
                <div className="image-container">
                  <img src={selectedPaciente.antes} alt="Antes" className="progress-img" />
                  <img src={selectedPaciente.despues} alt="Después" className="progress-img" />
                </div>
              </>
            )}

            {modalType === 'calificaciones' && (
              <>
                <h2>Calificaciones de {selectedPaciente.nombre}</h2>
                <p>Caminata: {selectedPaciente.calificaciones.caminata}/10</p>
                <p>Alimentación: {selectedPaciente.calificaciones.alimentacion}/10</p>
                <p>Ejercicio: {selectedPaciente.calificaciones.ejercicio}/10</p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;

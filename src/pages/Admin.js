import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Admin.css';

const Admin = () => {
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({});
  const [fieldStatus, setFieldStatus] = useState({});
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    // Cargar usuarios desde localStorage al montar el componente
    const usuariosGuardados = JSON.parse(localStorage.getItem('usuarios')) || [];
    const pacientesConDatos = usuariosGuardados.map(usuario => ({
      ...usuario,
      edad: usuario.edad || 'No registrada',
      peso: usuario.peso || 'No registrado',
      talla: usuario.talla || 'No registrada',
      antes: usuario.antes || '/images/default_antes.jpg',
      despues: usuario.despues || '/images/default_despues.jpg',
      calificaciones: usuario.calificaciones || { caminata: 0, alimentacion: 0, ejercicio: 0 },
      expediente: usuario.expediente || [],
    }));

    setPacientes(pacientesConDatos);
  }, []);

  const openModal = (paciente, type) => {
    setSelectedPaciente(paciente);
    setModalType(type);
  };

  const closeModal = () => {
    setSelectedPaciente(null);
    setModalType(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleStatusChange = (e, name) => {
    const { value } = e.target;
    setFieldStatus({ ...fieldStatus, [name]: value });

    if (value === "No Aplica") {
      setFormData({ ...formData, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (window.confirm('¿Estás seguro de enviar este formulario?')) {
      const expediente = {
        datos: formData,
        fecha: new Date().toLocaleDateString(),
        tipo: selectedPaciente.expediente.length === 0 ? 'Inicial' : 'Final', // Diferenciar entre inicial y final
      };

      const updatedPacientes = pacientes.map(paciente => 
        paciente.id === selectedPaciente.id 
          ? { ...paciente, expediente: [...paciente.expediente, expediente] } 
          : paciente
      );

      setPacientes(updatedPacientes);
      localStorage.setItem('usuarios', JSON.stringify(updatedPacientes)); // Guardar cambios en localStorage
      setFormData({});
      setFieldStatus({});
      closeModal();
    }
  };

  const toggleExpediente = (index) => {
    const updatedPacientes = [...pacientes];
    updatedPacientes[index].isExpedienteOpen = !updatedPacientes[index].isExpedienteOpen;
    setPacientes(updatedPacientes);
  };

  return (
    <div className="admin-page">
      <div className="admin-container">
        <h1 className="admin-title">Panel de Administración</h1>

        {pacientes.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <div className="pacientes-list">
            {pacientes.map((paciente, index) => (
              <div key={paciente.id} className="paciente-card">
                <h3>{paciente.nombre}</h3>
                <p>Correo: {paciente.correo}</p>
                <p>Teléfono: {paciente.telefono}</p>
                <div className="buttons">
                  <button onClick={() => openModal(paciente, 'info')}>Ver Información</button>
                  <button onClick={() => openModal(paciente, 'calificaciones')}>Ver Calificaciones</button>
                  <button onClick={() => openModal(paciente, 'formulario')}>Llenar Formulario</button>
                </div>

                <div className="expedientes">
                  <button className="expediente-button" onClick={() => toggleExpediente(index)}>
                    {paciente.isExpedienteOpen ? 'Ocultar Expedientes' : 'Mostrar Expedientes'}
                  </button>

                  {paciente.isExpedienteOpen && (
                    <ul className="expediente-list">
                      {paciente.expediente.length > 0 ? (
                        paciente.expediente.map((exp, index) => (
                          <li key={index}>
                            <strong>{exp.tipo === 'Inicial' ? 'Datos Iniciales' : 'Datos Finales'}:</strong>
                            <ul>
                              {exp.datos && Object.keys(exp.datos).map((key, idx) => (
                                <li key={idx}>
                                  <strong>{key}:</strong> 
                                  {exp.datos[key] && exp.datos[key] !== "No Aplica" 
                                    ? exp.datos[key] 
                                    : "No Aplica"}
                                </li>
                              ))}
                            </ul>
                            <p><strong>Fecha de llenado:</strong> {exp.fecha}</p>
                          </li>
                        ))
                      ) : (
                        <li>No hay expedientes guardados.</li>
                      )}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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

            {modalType === 'formulario' && (
              <>
                <h2>Hoja de recolección de datos</h2>
                <form onSubmit={handleSubmit}>
                  {["Estatura", "Peso", "Grasa Corporal", "Agua Corporal", "Masa Muscular", "Cintura", "Cadera", "Frecuencia Cardiaca", "Glucosa", "Colesterol", "Triglicéridos", "Presión Arterial", "Aptitud Cardiorrespiratoria", "Nivel de actividad física", "Consumo calórico", "Atención plena", "Bienestar subjetivo", "Apreciación corporal"].map((field) => (
                    <div key={field} className="form-group">
                      <label>{field}: </label>
                      <select 
                        name={`${field}-status`} 
                        value={fieldStatus[field] || "Sí Aplica"}
                        onChange={(e) => handleStatusChange(e, field)} 
                      >
                        <option value="Sí Aplica">Sí Aplica</option>
                        <option value="No Aplica">No Aplica</option>
                      </select>
                      <input 
                        type="text" 
                        name={field} 
                        value={formData[field] || ''} 
                        onChange={handleChange} 
                        disabled={fieldStatus[field] === "No Aplica"}
                      />
                    </div>
                  ))}

                  <button type="submit">Enviar</button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;


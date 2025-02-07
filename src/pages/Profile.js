import React, { useState } from "react";
import "../styles/Profile.css";

const Profile = () => {
  const [showDataModal, setShowDataModal] = useState(false);
  const [showRatingsModal, setShowRatingsModal] = useState(false);

  return (
    <div>
      {/* Botón de WhatsApp FUERA del container */}
      <a
        href="https://wa.me/7228402209" 
        className="whatsapp-button"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="35"
          height="35"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M12 2C6.48 2 2 6.48 2 12c0 1.92.54 3.71 1.48 5.23L2 22l4.9-1.47C8.31 21.46 10.09 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2m0 18c-1.69 0-3.26-.53-4.57-1.43l-.33-.22-2.91.87.93-2.83-.21-.33A8.06 8.06 0 014 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8m4.37-5.33c-.24-.12-1.42-.7-1.64-.78s-.38-.12-.54.12c-.16.24-.62.78-.76.94s-.28.18-.52.06-1.02-.38-1.94-1.19c-.72-.63-1.19-1.42-1.32-1.66s-.01-.37.11-.49c.12-.12.26-.32.38-.48.12-.16.16-.24.24-.4.08-.16.04-.3-.02-.42s-.54-1.29-.74-1.78c-.2-.48-.4-.42-.54-.42h-.46c-.16 0-.42.06-.64.3s-.84.82-.84 2 .86 2.36.98 2.52c.12.16 1.69 2.58 4.1 3.62 1.54.67 2.14.72 2.91.6.44-.07 1.42-.58 1.62-1.14.2-.56.2-1.03.14-1.14-.06-.11-.22-.18-.46-.3"
          />
        </svg>
      </a>

      {/* Contenedor del perfil */}
      <div className="profile-container">
        <div className="profile-box">
          <h1>Mi Perfil</h1>
          <img
            src="/path-to-user-photo.jpg"
            alt="Foto de perfil"
            className="profile-photo"
          />

          <div className="photo-upload">
            <label>Foto Antes:</label>
            <input type="file" accept="image/*" />
            <label>Foto Después:</label>
            <input type="file" accept="image/*" />
          </div>

          <button className="profile-button" onClick={() => setShowDataModal(true)}>
            Registrar Datos
          </button>
          <button className="profile-button" onClick={() => setShowRatingsModal(true)}>
            Calificar Caminatas
          </button>

          <div className="audio-section">
            <h3>Audios de Motivación</h3>
            <audio controls>
              <source src="/path-to-motivation-audio.mp3" type="audio/mpeg" />
              Tu navegador no soporta el audio.
            </audio>
          </div>
        </div>
      </div>

      {/* Modal para registrar datos */}
      {showDataModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowDataModal(false)}>X</button>
            <h2>Registrar Datos</h2>
            {/* Contenido del modal */}
            <form>
              <label>
                Peso:
                <input type="number" placeholder="Ingrese su peso" />
              </label>
              <label>
                Talla:
                <input type="number" placeholder="Ingrese su talla" />
              </label>
              <button className="profile-button" type="submit">Guardar</button>
            </form>
          </div>
        </div>
      )}

      {/* Modal para calificar caminatas */}
      {showRatingsModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-modal" onClick={() => setShowRatingsModal(false)}>X</button>
            <h2>Calificar Actividades</h2>
            {/* Contenido del modal */}
            <form>
              <label>
                Calificación:
                <input type="number" min="1" max="5" placeholder="Califique la caminata" />
              </label>
              <button className="profile-button" type="submit">Guardar</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

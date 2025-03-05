import React, { useState, useEffect } from 'react';
import "../styles/Caminatas.css";
import { Link } from 'react-router-dom';

const Caminatas = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [audioUrl, setAudioUrl] = useState('');
  const [rating, setRating] = useState(1);
  const [followedInstructions, setFollowedInstructions] = useState(1);

  useEffect(() => {
    // Construye la ruta correcta de los audios dentro de public/
    setAudioUrl(`${process.env.PUBLIC_URL}/audios/Audio${currentWeek}.mp3`);
  }, [currentWeek]);

  const handleRatingChange = (e) => setRating(e.target.value);
  const handleFollowInstructionsChange = (e) => setFollowedInstructions(e.target.value);

  const handleNextDay = () => {
    if (currentDay < 7) {
      setCurrentDay(currentDay + 1);
      setRating(1);
      setFollowedInstructions(1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < 8) {
      setCurrentWeek(currentWeek + 1);
      setCurrentDay(1);
      setRating(1);
      setFollowedInstructions(1);
    }
  };

  return (
    <div className="caminatas-container">
      <div className="caminatas-box">
        <h1>Semana {currentWeek} - Día {currentDay} de Caminatas</h1>

        <div className="audio-section">
          <h3>Audio de Caminata para esta Semana</h3>
          <audio key={audioUrl} controls>
            <source src={audioUrl} type="audio/mpeg" />
            Tu navegador no soporta el audio.
          </audio>
        </div>

        <div className="rating-section">
          <h3>¿Qué tan bien te sentiste durante la caminata?</h3>
          <div className="input-group">
            <label>
              Calificación (1-10):
              <input
                type="number"
                min="1"
                max="10"
                value={rating}
                onChange={handleRatingChange}
              />
            </label>
            <label>
              ¿Qué tanto cumpliste con la recomendación de la caminata? (1-10):
              <input
                type="number"
                min="1"
                max="10"
                value={followedInstructions}
                onChange={handleFollowInstructionsChange}
              />
            </label>
          </div>
        </div>

        <div className="next-buttons">
          <button className="next-day-btn" onClick={handleNextDay} disabled={currentDay >= 7}>
            Avanzar al siguiente día
          </button>

          <button className="next-week-btn" onClick={handleNextWeek} disabled={currentWeek >= 8 || currentDay !== 7}>
            Avanzar a la siguiente semana
          </button>
        </div>

        {currentWeek >= 8 && <p>¡Has completado el programa de caminatas!</p>}

        <Link to="/profile">
          <button className="profile-button">Perfil</button>
        </Link>
      </div>
    </div>
  );
};

export default Caminatas;

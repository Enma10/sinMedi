import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Comidas.css";

const Comidas = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [audioUrl, setAudioUrl] = useState('');
  const [rating, setRating] = useState(0);
  const [followedInstructions, setFollowedInstructions] = useState(0);

  const weeklyAudioUrls = [
    "/audios/comidas-semana-1.mp3",
    "/audios/comidas-semana-2.mp3",
    "/audios/comidas-semana-3.mp3",
    "/audios/comidas-semana-4.mp3",
    "/audios/comidas-semana-5.mp3",
    "/audios/comidas-semana-6.mp3",
    "/audios/comidas-semana-7.mp3",
    "/audios/comidas-semana-8.mp3",
  ];

  useEffect(() => {
    setAudioUrl(weeklyAudioUrls[currentWeek - 1]);
  }, [currentWeek]);

  const handleRatingChange = (e) => {
    const value = Math.max(0, Math.min(10, Number(e.target.value)));
    setRating(value);
  };

  const handleFollowInstructionsChange = (e) => {
    const value = Math.max(0, Math.min(100, Number(e.target.value)));
    setFollowedInstructions(value);
  };

  const handleNextDay = () => {
    if (currentDay < 7) {
      setCurrentDay(currentDay + 1);
      setRating(0);
      setFollowedInstructions(0);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < 8) {
      setCurrentWeek(currentWeek + 1);
      setCurrentDay(1);
      setRating(0);
      setFollowedInstructions(0);
    }
  };

  return (
    <div className="comidas-container">
      <div className="comidas-box">
        <h1>Semana {currentWeek} - Día {currentDay} del Plan de Comidas</h1>

        <div className="audio-section">
          <h3>Audio del Plan de Comidas para esta Semana</h3>
          <audio controls>
            <source src={audioUrl} type="audio/mpeg" />
            Tu navegador no soporta el audio.
          </audio>
        </div>

        <div className="rating-section">
          <h3>¿Qué tan bien seguiste el plan de comidas hoy?</h3>
          <div className="input-group">
            <label>
              Calificación (0-10):
              <input
                type="number"
                min="0"
                max="10"
                value={rating}
                onChange={handleRatingChange}
              />
            </label>
            <label>
              ¿Cuánto seguiste las instrucciones? (0-100%):
              <input
                type="number"
                min="0"
                max="100"
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

        {currentWeek >= 8 && <p>¡Has completado el plan de comidas!</p>}

        <Link to="/profile">
          <button className="profile-button">Perfil</button>
        </Link>
      </div>
    </div>
  );
};

export default Comidas;

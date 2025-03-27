import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Comidas.css";

const Comidas = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [audioUrl, setAudioUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [followedInstructions, setFollowedInstructions] = useState(0);

  // Array con las imágenes para cada semana
  const images = [
    `${process.env.PUBLIC_URL}/imagesAlimentacion/semana1.gif`,
    `${process.env.PUBLIC_URL}/imagesAlimentacion/semana2.gif`,
    `${process.env.PUBLIC_URL}/imagesAlimentacion/semana3.gif`,
    `${process.env.PUBLIC_URL}/imagesAlimentacion/semana4.gif`,
    `${process.env.PUBLIC_URL}/imagesAlimentacion/semana5.gif`,
    `${process.env.PUBLIC_URL}/imagesAlimentacion/semana6.gif`,
    `${process.env.PUBLIC_URL}/imagesAlimentacion/semana7.gif`,
    `${process.env.PUBLIC_URL}/imagesAlimentacion/semana8.gif`
  ];

  useEffect(() => {
    const newAudioUrl = `${process.env.PUBLIC_URL}/audiosAlimentacion/audioA${currentWeek}.mp3`;
    setAudioUrl(newAudioUrl);

    // Forzar la carga del audio
    const audio = new Audio(newAudioUrl);
    audio.load();
  }, [currentWeek]);

  const handleRatingChange = (e) => {
    const value = Math.max(0, Math.min(10, Number(e.target.value)));
    setRating(value);
  };

  const handleFollowInstructionsChange = (e) => {
    const value = Math.max(0, Math.min(10, Number(e.target.value)));
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
          <audio key={audioUrl} controls>
            <source src={audioUrl} type="audio/mpeg" />
            Tu navegador no soporta el audio.
          </audio>
        </div>

        {/* Mostrar la imagen correspondiente a la semana actual */}
        <div className="image-section">
          <img src={images[currentWeek - 1]} alt={`Semana ${currentWeek}`} className="week-image" />
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
              ¿Cuánto seguiste las instrucciones? (0-10):
              <input
                type="number"
                min="0"
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

        {currentWeek >= 8 && <p>¡Has completado el plan de comidas!</p>}

        <Link to="/profile">
          <button className="profile-button">Perfil</button>
        </Link>
      </div>
    </div>
  );
};

export default Comidas;
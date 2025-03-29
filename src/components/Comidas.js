import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Comidas.css";

const Comidas = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [audioUrl, setAudioUrl] = useState("");
  const [rating, setRating] = useState(0);
  const [followedInstructions, setFollowedInstructions] = useState(0);
  const [generalFeeling, setGeneralFeeling] = useState(0);
  const [videoSeen, setVideoSeen] = useState(false); // Estado para controlar si el video se ha visto

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

  // Array de audios para cada semana
  const audios = [
    `${process.env.PUBLIC_URL}/audiosAlimentacion/AudioA1.mp3`,
    `${process.env.PUBLIC_URL}/audiosAlimentacion/AudioA2.mp3`,
    `${process.env.PUBLIC_URL}/audiosAlimentacion/AudioA3.mp3`,
    `${process.env.PUBLIC_URL}/audiosAlimentacion/AudioA4.mp3`,
    `${process.env.PUBLIC_URL}/audiosAlimentacion/AudioA5.mp3`,
    `${process.env.PUBLIC_URL}/audiosAlimentacion/AudioA6.mp3`,
    `${process.env.PUBLIC_URL}/audiosAlimentacion/AudioA7.mp3`,
    `${process.env.PUBLIC_URL}/audiosAlimentacion/AudioA8.mp3`
  ];

  useEffect(() => {
    // Establecer el audio de la semana actual
    const newAudioUrl = audios[currentWeek - 1];
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

  const handleGeneralFeelingChange = (e) => {
    const value = Math.max(0, Math.min(10, Number(e.target.value)));
    setGeneralFeeling(value);
  };

  const handleNextDay = () => {
    if (currentDay < 7) {
      setCurrentDay(currentDay + 1);
      setRating(0);
      setFollowedInstructions(0);
      setGeneralFeeling(0);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < 8) {
      setCurrentWeek(currentWeek + 1);
      setCurrentDay(1);
      setRating(0);
      setFollowedInstructions(0);
      setGeneralFeeling(0);
    }
  };

  const handleVideoSeen = () => {
    setVideoSeen(true);
  };

  if (!videoSeen) {
    return (
      <div className="intro-video-container">
        <div className="video-container">
          <h3>Bienvenido al plan de alimentacion basado en comidas caseras</h3>
          <video width="80%" controls>
            <source src={`${process.env.PUBLIC_URL}/videos/presentacion.mp4`} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          <button className="advance-button" onClick={handleVideoSeen}>Avanzar a la semana</button>
        </div>
      </div>
    );
  }

  return (
    <div className="comidas-container">
      <div className="comidas-box">
        <h1>Semana {currentWeek} Plan de alimentación basado en comidas caseras</h1>

        <div className="audio-section">
          <h3>Indicaciones: sigue las recomendaciones del plan de alimentación y escucha el audio al menos una vez por semana.</h3>
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
          <h3>Al finalizar la semana responde:</h3>
          <h3>Del 0 al 10 qué tanto seguiste la recomendación de escuchar el audio (0-10):</h3>
          <div className="input-group">
            <label>
              <input
                type="number"
                min="0"
                max="10"
                value={rating}
                onChange={handleRatingChange}
              />
            </label>
            <label>
              <h3>Del 0 al 10 qué tanto seguiste las recomendaciones del plan de alimentación basado en comidas caseras (0-10):</h3>
              <input
                type="number"
                min="0"
                max="10"
                value={followedInstructions}
                onChange={handleFollowInstructionsChange}
              />
            </label>
            <label>
              <h3>Del 0 al 10 cómo te sentiste de manera general esta semana (0-10):</h3>
              <input
                type="number"
                min="0"
                max="10"
                value={generalFeeling}
                onChange={handleGeneralFeelingChange}
              />
            </label>
          </div>
        </div>

        <div className="next-buttons">
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

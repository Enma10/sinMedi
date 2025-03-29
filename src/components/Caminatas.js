import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import "../styles/Caminatas.css";
import { Link } from 'react-router-dom';

const Caminatas = () => {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [currentDay, setCurrentDay] = useState(1);
  const [audioUrl, setAudioUrl] = useState('');
  const [rating, setRating] = useState(1);
  const [followedInstructions, setFollowedInstructions] = useState(1);
  const [dayCompleted, setDayCompleted] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  useEffect(() => {
    setAudioUrl(`${process.env.PUBLIC_URL}/audios/Audio${currentWeek}.mp3`);
  }, [currentWeek]);

  const handleRatingChange = (e) => setRating(e.target.value);
  const handleFollowInstructionsChange = (e) => setFollowedInstructions(e.target.value);
  const handleCheckboxChange = () => setDayCompleted(!dayCompleted);
  const handleVideoWatched = () => setVideoWatched(true);

  const handleNextDay = () => {
    if (currentDay < 7 && dayCompleted) {
      setCurrentDay(currentDay + 1);
      setRating(1);
      setFollowedInstructions(1);
      setDayCompleted(false);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < 8 && currentDay === 7 && dayCompleted) {
      setCurrentWeek(currentWeek + 1);
      setCurrentDay(1);
      setRating(1);
      setFollowedInstructions(1);
      setDayCompleted(false);
    }
  };

  // Generar las rutas de las imágenes para cada semana y día
  const images = Array.from({ length: 7 }, (_, index) => {
    return `${process.env.PUBLIC_URL}/images/week${currentWeek}/day${currentWeek}_${index + 1}.jpg`;  
  });

  return (
    <div className="caminatas-container">
      {!videoWatched ? (
        <div className="video-section">
          <h2>Introducción a las Caminatas</h2>
          <video width="100%" controls>
            <source src="/videos/introduccion.mp4" type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
          <button className="advance-button" onClick={handleVideoWatched}>
            Avanzar a las semanas
          </button>
        </div>
      ) : (
        <div className="caminatas-box">
          <h1>Semana {currentWeek} de Caminata a intensidad moderada</h1>

          <div className="audio-section">
            <h3>Indicaciones: sigue las recomendaciones de caminata y escucha el audio al menos una vez por semana.</h3>
            <audio key={audioUrl} controls>
              <source src={audioUrl} type="audio/mpeg" />
              Tu navegador no soporta el audio.
            </audio>
          </div>

          <div className="carousel-section">
            <Carousel 
              showThumbs={false} 
              autoPlay 
              infiniteLoop 
              interval={3000}  
              transitionTime={500} 
              stopOnHover={false} 
            >
              {images.map((img, index) => (
                <div key={index}>
                  <img 
                    src={img} 
                    alt={`Semana ${currentWeek} - Día ${index + 1}`} 
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <h3>Al finalizar la semana responde:</h3>
            <div className="rating-section">
            <h3>Del 0 al 10 qué tanto seguiste la recomendacion de escuchar el audio (0-10):</h3>
              <div className="input-group">
                <label>
                  <input type="number" min="1" max="10" value={rating} onChange={handleRatingChange} />
                </label>
                <label>
                <h3>Del 0 al 10 qué tanto realizaste la caminata a intensidad moderada (0-10):</h3>
                  <input type="number" min="1" max="10" value={followedInstructions} onChange={handleFollowInstructionsChange} />
                </label>
                <label>
                <h3>Del 0 al 10 comó te sentiste de manera general esta semana (0-10):</h3>
                  <input type="number" min="1" max="10" value={followedInstructions} onChange={handleFollowInstructionsChange} />
                </label>
              </div>
            </div>

          <div className="next-buttons">
            <button className="next-week-btn" onClick={handleNextWeek} disabled={currentWeek >= 8 || currentDay !== 7 || !dayCompleted}>
              Avanzar a la siguiente semana
            </button>
          </div>

          {currentWeek >= 8 && <p>¡Has completado el programa de caminatas!</p>}

          <Link to="/profile">
            <button className="profile-button">Perfil</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Caminatas;


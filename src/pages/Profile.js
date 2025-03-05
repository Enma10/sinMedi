import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Profile.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Profile = () => {
  const [ratingsCaminatas, setRatingsCaminatas] = useState(Array(8).fill({ rating: null, completed: false }));
  const [ratingsComidas, setRatingsComidas] = useState(Array(8).fill({ rating: null, completed: false }));
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [beforePhoto, setBeforePhoto] = useState(null);
  const [afterPhoto, setAfterPhoto] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [showBeforeAfter, setShowBeforeAfter] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Cargar las fotos guardadas en localStorage
    const savedProfilePhoto = localStorage.getItem("profilePhoto");
    const savedBeforePhoto = localStorage.getItem("beforePhoto");
    const savedAfterPhoto = localStorage.getItem("afterPhoto");
    const savedRatingsCaminatas = JSON.parse(localStorage.getItem("ratingsCaminatas")) || [];
    const savedRatingsComidas = JSON.parse(localStorage.getItem("ratingsComidas")) || [];

    setProfilePhoto(savedProfilePhoto);
    setBeforePhoto(savedBeforePhoto);
    setAfterPhoto(savedAfterPhoto);
    setRatingsCaminatas(savedRatingsCaminatas);
    setRatingsComidas(savedRatingsComidas);
  }, []);

  const handleRatingCaminata = (week, rating) => {
    const updatedRatings = [...ratingsCaminatas];
    updatedRatings[week - 1] = { rating, completed: true };
    setRatingsCaminatas(updatedRatings);
    localStorage.setItem("ratingsCaminatas", JSON.stringify(updatedRatings));
  };

  const handleRatingComida = (week, rating) => {
    const updatedRatings = [...ratingsComidas];
    updatedRatings[week - 1] = { rating, completed: true };
    setRatingsComidas(updatedRatings);
    localStorage.setItem("ratingsComidas", JSON.stringify(updatedRatings));
  };

  const handleImageUpload = (e, type) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) { // Verificar que sea una imagen
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setProfilePhoto(reader.result);
          localStorage.setItem("profilePhoto", reader.result);
        } else if (type === "before") {
          setBeforePhoto(reader.result);
          localStorage.setItem("beforePhoto", reader.result);
        } else if (type === "after") {
          setAfterPhoto(reader.result);
          localStorage.setItem("afterPhoto", reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor selecciona un archivo de imagen.");
    }
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsImageModalOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalOpen(false);
    setSelectedImage("");
  };

  const toggleBeforeAfter = () => {
    setShowBeforeAfter(!showBeforeAfter);
  };

  const getProgressData = (ratings) => ({
    labels: Array.from({ length: 8 }, (_, i) => `Semana ${i + 1}`),
    datasets: [
      {
        label: "Progreso",
        data: ratings.map(w => w.rating),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)",
      },
    ],
  });

  return (
    <div>
      <div className="profile-container">
        <div className="profile-box">
          <h1>Mi Perfil</h1>

          <img
            src={profilePhoto || "/images/default-profile.jpg"}
            alt="Foto de perfil"
            className="profile-photo small-photo"
            onClick={() => handleImageClick(profilePhoto || "/images/default-profile.jpg")}
          />

          <div className="photo-upload">
            <label>Foto de Perfil:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "profile")}
            />
          </div>

          <div className="photo-upload">
            <label>Foto Antes:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "before")}
            />
          </div>

          <div className="photo-upload">
            <label>Foto Después:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "after")}
            />
          </div>

          <div className="show-hide-btn">
            <button onClick={toggleBeforeAfter}>
              {showBeforeAfter ? "Ocultar Fotos" : "Mostrar Fotos Antes/Después"}
            </button>
          </div>

          {showBeforeAfter && (
            <div className="before-after-photos">
              {beforePhoto && (
                <img
                  src={beforePhoto}
                  alt="Foto de antes"
                  className="before-photo small-photo"
                  onClick={() => handleImageClick(beforePhoto)}
                />
              )}
              {afterPhoto && (
                <img
                  src={afterPhoto}
                  alt="Foto de después"
                  className="after-photo small-photo"
                  onClick={() => handleImageClick(afterPhoto)}
                />
              )}
            </div>
          )}

          <div className="tabs">
            <Link to="/caminatas">
              <button className="profile-button">Caminatas</button>
            </Link>
            <Link to="/comidas">
              <button className="profile-button">Plan Alimenticio</button>
            </Link>
          </div>

          <div className="progress-container">
            <h3>Progreso de Caminatas</h3>
            {ratingsCaminatas.map((week, index) => (
              <div key={index}>
                <span>Semana {index + 1}:</span>
                <button
                  disabled={week.completed}
                  onClick={() => handleRatingCaminata(index + 1, prompt('Ingresa la calificación de la caminata:'))}
                >
                  {week.completed ? `Completada (Calificación: ${week.rating})` : 'Calificar'}
                </button>
              </div>
            ))}
            <Line data={getProgressData(ratingsCaminatas)} />

            <h3>Progreso de Plan Alimenticio</h3>
            {ratingsComidas.map((week, index) => (
              <div key={index}>
                <span>Semana {index + 1}:</span>
                <button
                  disabled={week.completed}
                  onClick={() => handleRatingComida(index + 1, prompt('Ingresa la calificación del plan alimenticio:'))}
                >
                  {week.completed ? `Completada (Calificación: ${week.rating})` : 'Calificar'}
                </button>
              </div>
            ))}
            <Line data={getProgressData(ratingsComidas)} />
          </div>

          <button className="profile-button logout-button" onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {isImageModalOpen && (
        <div className="image-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={handleCloseImageModal}>X</button>
            <img src={selectedImage} alt="Imagen seleccionada" className="large-image" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

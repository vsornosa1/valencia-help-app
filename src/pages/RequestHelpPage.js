import React, { useState } from "react";
import "../styles/RequestHelpPage.css";
import axios from "axios";

const RequestHelpPage = () => {
  const [description, setDescription] = useState("");
  const [contactInfo, setContactInfo] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:5000/requests", {
      description,
      contactInfo,
      latitude: 39.4699, // Puedes obtener estas coordenadas de un formulario
      longitude: -0.3763,
    });
    console.log("Solicitud enviada:", response.data);
  } catch (error) {
    console.error("Error al enviar la solicitud:", error);
  }
};


  return (
    <div className="form-container">
      <h2>Solicitar Ayuda</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          placeholder="Describe tu necesidad"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tu contacto"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
        <button type="submit">Enviar Solicitud</button>
      </form>
    </div>
  );
};

export default RequestHelpPage;

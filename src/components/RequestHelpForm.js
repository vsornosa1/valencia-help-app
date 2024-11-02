import React, { useState } from "react";
import "../styles/RequestHelpForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGlassWater,
  faBurger,
  faTools,
  faUsers,
  faPills,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

const RequestHelpForm = ({ onSubmit, onClose }) => {
  const [resources, setResources] = useState({
    Agua: false,
    Comida: false,
    Palas: false,
    Gente: false,
    Medicamentos: false,
  });
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [details, setDetails] = useState("");

  const handleResourceChange = (e) => {
    const { name, checked } = e.target;
    setResources({ ...resources, [name]: checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      resources: Object.keys(resources).filter((key) => resources[key]),
      name,
      contact,
      details,
    };
    onSubmit(requestData);
  };

  return (
    <form className="request-help-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Solicita Ayuda</h2>
        <button type="button" className="close-button" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className="resources">
        {Object.entries(resources).map(([key, value]) => (
          <label key={key} >
            <input
              type="checkbox"
              name={key}
              checked={value}
              onChange={handleResourceChange}
            />
            <span className="checkmark"></span>
            <FontAwesomeIcon
              icon={
                key === "Agua"
                  ? faGlassWater
                  : key === "Comida"
                  ? faBurger
                  : key === "Palas"
                  ? faTools
                  : key === "Gente"
                  ? faUsers
                  : faPills
              }
            />
            <span style={{ margin: "5px" }}>{key}</span>
          </label>
        ))}
      </div>
      <div className="contact-info">
        <input
          type="text"
          placeholder="Tu nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Número de contacto"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          required
        />
      </div>
      <div className="details">
        <textarea
          placeholder="Detalles adicionales"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows="4"
        />
      </div>
      <button type="submit" className="confirm-button">
        Confirmar Solicitud
      </button>
    </form>
  );
};

export default RequestHelpForm;

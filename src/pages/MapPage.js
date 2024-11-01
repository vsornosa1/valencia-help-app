import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axios from "axios";
import "../styles/MapPage.css";

// Define custom icon
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapPage = () => {
  const [requests, setRequests] = useState([]);
  const [newRequest, setNewRequest] = useState(null);

  // Fetch requests from the backend
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/requests");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  // Add a new request
  const addRequest = async (lat, lng) => {
    const description = prompt("Describe las necesidades de recursos:");
    const contactInfo = prompt("Ingresa tus datos de contacto:");
    if (description && contactInfo) {
      const requestData = {
        description,
        contactInfo,
        latitude: lat,
        longitude: lng,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/requests",
          requestData
        );
        setRequests([...requests, response.data]);
      } catch (error) {
        console.error("Error creating request:", error);
      }
    }
  };

  // Handle map click to add a new marker
  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setNewRequest({ lat, lng });
        addRequest(lat, lng);
      },
    });
    return null;
  };

  return (
    <MapContainer center={[39.4699, -0.3763]} zoom={13} className="map">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapClickHandler />
      {requests.map((request) => (
        <Marker
          key={request._id}
          position={[request.latitude, request.longitude]}
          icon={icon}
        >
          <Popup>
            {request.description}
            <br />
            Contacto: {request.contactInfo}
          </Popup>
        </Marker>
      ))}
      {newRequest && (
        <Marker position={[newRequest.lat, newRequest.lng]} icon={icon}>
          <Popup>¡Nueva solicitud creada!</Popup>
        </Marker>
      )}
    </MapContainer>
  );
};

export default MapPage;

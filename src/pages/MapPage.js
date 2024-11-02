import React, { useState, useEffect } from "react";
import RequestHelpForm from "../components/RequestHelpForm";
import MarkerClusterGroup from "react-leaflet-cluster";
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

const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const MapPage = () => {
  const [requests, setRequests] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showForm, setShowForm] = useState(false);

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

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setSelectedLocation({ lat, lng });
        setShowForm(true);
      },
    });
    return null;
  };

  const handleRequestHelp = async (requestData) => {
    if (selectedLocation) {
      const { lat, lng } = selectedLocation;
      const requestDataWithLocation = {
        ...requestData,
        latitude: lat,
        longitude: lng,
      };
      try {
        const response = await axios.post(
          "http://localhost:5000/requests",
          requestDataWithLocation
        );
        setRequests([...requests, response.data]);
        setSelectedLocation(null);
        setShowForm(false);
      } catch (error) {
        console.error("Error creating request:", error);
      }
    }
  };

  return (
    <div className="map-page">
      <MapContainer center={[39.4699, -0.3763]} zoom={13} className="map">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapClickHandler />
        <MarkerClusterGroup>
          {requests.map((request) => (
            <Marker
              key={request._id}
              position={[request.latitude, request.longitude]}
              icon={icon}
            >
              <Popup>
                <h3> ¡{request.name} necesita ayuda! </h3>
                {/* <h4> ⌛{request.createdAt} </h4> 
                {JSON.stringify(request)}*/}
                {request.contact && <p>📲 Móvil: +34 {request.contact}</p>}
                <i style={{ display: "block", marginBottom: "20px" }}>🚩 {request.details}</i>
                {request.resources.length > 0 && <b>Recursos solicitados:</b>}
                <ul>
                  {request.resources?.map((resource, index) => (
                    <li key={index}>{resource}</li>
                  ))}
                </ul>
              </Popup>
            </Marker>
          ))}
          {selectedLocation && (
            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={icon}
            >
              <Popup>¡Ubicación seleccionada para nueva solicitud!</Popup>
            </Marker>
          )}
        </MarkerClusterGroup>
      </MapContainer>
      {showForm && (
        <div className="form-overlay">
          <RequestHelpForm
            onSubmit={handleRequestHelp}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
    </div>
  );
};

export default MapPage;

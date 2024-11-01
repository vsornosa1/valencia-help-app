import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import RequestHelpPage from "./pages/RequestHelpPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/request-help" element={<RequestHelpPage />} />
      </Routes>
    </Router>
  );
}

export default App;

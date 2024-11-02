import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MapPage from "./pages/MapPage";
import RequestHelpForm from "./components/RequestHelpForm";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MapPage />} />
        <Route path="/request-help" element={<RequestHelpForm />} />
      </Routes>
    </Router>
  );
}

export default App;

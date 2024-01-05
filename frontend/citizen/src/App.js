import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Map from "./components/Map";
import ReportDashboard from "./components/ReportDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/report" element={<ReportDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

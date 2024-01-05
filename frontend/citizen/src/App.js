import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Map from "./components/Map";
import ReportForm from "./components/ReportForm";


function App() {
  return (
    <div className="App">
      <Router>

        <Routes>
          <Route path="/" element={<Map />} />
          <Route path="/report" element={<ReportForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

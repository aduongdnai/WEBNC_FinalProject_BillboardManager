import Map from "./components/Map";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ManageWardAndDistrict from "./components/ManageWardAndDistrict";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import { UserProvider } from "./components/LoginSignup/userContext";
import Sidebar from "./components/Sidebar/Sidebar";
import AdLocationPage from "./components/adLocation/AdLocationPage";
import AdBoardsDisplay from "./components/AdBoard/AdBoardsDisplay";
import ViewAndReviewRequests from "./components/adLocation/ViewAndReviewRequests";
import ReportDashboard from "./components/ReportDashboard";

function App() {
  return (
    <UserProvider>
      <div style={{ display: "flex" }}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/map" element={<Map />} />
            <Route path="/manage" element={<ManageWardAndDistrict />} />
            <Route path="/login" element={<Login />} />
            <Route path="/report" element={<ReportDashboard />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Navigate replace to="/map" />} />
            <Route path="/ad-locations" element={<AdLocationPage />} />
            <Route
              path="/ad-boards/:locationId"
              element={<AdBoardsDisplay />}
            />
            <Route path="/" element={<Navigate replace to="/map" />} />
            <Route
              path="/view-requests"
              element={<ViewAndReviewRequests />}
            />{" "}
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

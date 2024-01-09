import Map from "./components/Map";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import TableQueryByArea from "./components/TableQueryByArea";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import { UserProvider } from "./components/LoginSignup/userContext";
import Sidebar from "./components/Sidebar/Sidebar";
import AdLocationPage from "./components/adLocation/AdLocationPage";
import AdBoardsDisplay from "./components/AdBoard/AdBoardsDisplay";
import ReportDashboard from "./components/ReportDashboard";
import AdvertisingLicenseRequestList from "./components/AdvertisingLicenseRequestList";
import Account from "./components/Account/Account"
import ReviewRequestsPage from "./components/adLocation/ReviewRequestsPage";
import io from "socket.io-client";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import ManageDistrict from "./components/ManageDistrict";
import ManageWard from "./components/ManageWard";



const socket = io("http://127.0.0.1:5000");


function App() {
  const toast = useToast();

  useEffect(() => {
    // Simulate authentication with a secret token
    socket.emit("authenticate", "CLIENT");

    // Listen for messages from the server
    socket.on("notification", (data) => {
      console.log("Received notification:", data);

      toast({
        title: `Báo cáo mới`,
        description: `Bạn có báo cáo mới từ ${data.senderName}, \nKiểu loại: ${data.reportType}, \nKhu vực: ${data.area}`,
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
        position: "bottom-right",
      });
    });
  }, []);

  return (
    <UserProvider>
      <div style={{ display: "flex" }}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/map" element={<Map />} />
            <Route path="/table-area" element={<TableQueryByArea />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<Navigate replace to="/map" />} />
            <Route path="/report" element={<ReportDashboard />} />
            <Route path="/" element={<Navigate replace to="/map" />} />
            <Route path="/ad-locations" element={<AdLocationPage />} />
            <Route path="/manage-district" element={<ManageDistrict />} />
            <Route path="/manage-ward" element={<ManageWard />} />
            <Route
              path="/ad-boards/:locationId"
              element={<AdBoardsDisplay />}
            />
            <Route
              path="/advertisinglicense"
              element={<AdvertisingLicenseRequestList />}
            />
            <Route path="/" element={<Navigate replace to="/map" />} />
            
            <Route path="/view-requests" element={<ReviewRequestsPage />} />{" "}
            {/* Add the new route */}
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

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
import ManageDistrict from "./components/ManageDistrict";
import ManageWard from "./components/ManageWard";
import ReportDashboard from "./components/ReportDashboard";
import AdvertisingLicenseRequestList from "./components/AdvertisingLicenseRequestList";
import Account from "./components/Account/Account";
import ReviewRequestsPage from "./components/adLocation/ReviewRequestsPage";
import ReviewBoardRequestsPage from "./components/AdBoard/ReviewBoardRequestsPage";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import Premium from "./components/Account/Premium";
import NotifyProvider from "./Providers/NotifyProvider";
import ManageAdvertisingType from "./components/ManageAdvertisingType";
import TableQueryByAdType from "./components/TableQueryByAdType";
import { useSelector } from "react-redux";
import ProtectedProvider from "./Providers/ProtectedProvider";
import ReportDetail from "./components/ReportDetail";
import ReportTypesManagement from "./components/ReportTypesManagement";
const socket = io("http://127.0.0.1:5000");




function App() {
  const userData = useSelector(state => state.auth.userData);
  var userArea;
  if(userData.role === "CB-So") userArea = "Hồ Chí Minh";
  else if(userData.role === "CB-Quan") userArea = `Quận ${userData.district}, Hồ Chí Minh`
  else userArea = `Phường ${userData.ward}, Quận ${userData.district}, Hồ Chí Minh`
  const toast = useToast();
  const [report, setReport] = useState();
  const [isClick, setIsClick] = useState();

  useEffect(() => {
    // Simulate authentication with a secret token
    socket.emit("authenticate", "CLIENT");
    // Listen for messages from the server
    socket.on("notification", (data) => {
      console.log("Received notification:", data);
      toast.closeAll();
      setIsClick(false);

      toast({
        title: `Báo cáo mới`,
        description: (
          <>
            Bạn có báo cáo mới từ {data.senderName}, <br />
            Kiểu loại: {data.reportType}
            <br />
            Khu vực: {data.area} <br />
            <button
              onClick={() => {
                setIsClick(true);
              }}
            >
              <b>Xem chi tiết</b>
            </button>
          </>
        ),
        duration: 5000,
        isClosable: true,
        variant: "left-accent",
        position: "bottom-right",
      });
      setReport(data);
    });
  }, []);

  return (
    <UserProvider>
      <div style={{ display: "flex" }}>
        <Router>
          <Sidebar />
          <Routes>
            <Route
              path="/map"
              element={
                <ProtectedProvider>
                  <NotifyProvider isClick={isClick} report={report}>
                    <Map />
                  </NotifyProvider>
                </ProtectedProvider>
              }
            />
            <Route
              path="/table-area"
              element={
                <ProtectedProvider>
                  
                  <TableQueryByArea area={userArea}/>
                </ProtectedProvider>
              }
            />
            <Route
              path="/manage-district"
              element={
                <ProtectedProvider>
                  <ManageDistrict />
                </ProtectedProvider>
              }
            />
            <Route
              path="/manage-ward"
              element={
                <ProtectedProvider>
                  <ManageWard />
                </ProtectedProvider>
              }
            />
            <Route
              path="/manage-advertising-type"
              element={
                <ProtectedProvider>
                  <ManageAdvertisingType />
                </ProtectedProvider>
              }
            />
            <Route
              path="/table-advertising-type"
              element={
                <ProtectedProvider>
                  <TableQueryByAdType />
                </ProtectedProvider>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Account />} />
            <Route
              path="/report"
              element={
                <ProtectedProvider>
                  <ReportDashboard />
                </ProtectedProvider>
              }
            />
            <Route
              path="/report/:rpId"
              element={
                <ProtectedProvider>
                  <ReportDetail />
                </ProtectedProvider>
              }
            />
            <Route
              path="/report-types"
              element={
                <ProtectedProvider>
                  <ReportTypesManagement />
                </ProtectedProvider>
              }
            />
            <Route path="/" element={<Navigate replace to="/map" />} />
            <Route path="/manage-location" element={<AdLocationPage />} />
            <Route path="/premium" element={<Premium />} />
            <Route
              path="/ad-boards/:locationId"
              element={<AdBoardsDisplay />}
            />
            <Route
              path="/advertisinglicense"
              element={
                <ProtectedProvider>
                  <AdvertisingLicenseRequestList />
                </ProtectedProvider>
              }
            />
            <Route path="/" element={<Navigate replace to="/map" />} />
            <Route
              path="/view-requests"
              element={<ReviewRequestsPage />}
            />{" "}
            {/* Add the new route */}
            <Route
              path="/review-board-request"
              element={<ReviewBoardRequestsPage />}
            />{" "}
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

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
import io from "socket.io-client";
import { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import NotifyProvider from "./Providers/NotifyProvider";
import ManageAdvertisingType from "./components/ManageAdvertisingType";
import TableQueryByAdType from "./components/TableQueryByAdType";
import { useSelector } from "react-redux";
import ProtectedProvider from "./Providers/ProtectedProvider";
import ReportDetail from "./components/ReportDetail";
import ReportTypesManagement from "./components/ReportTypesManagement";
import TableQueryAdBoardByArea from "./components/TableQueryAdBoardByArea";
import AdLocationEditRequestList from "./components/AdLocationEditRequestList";
import AdBoardEditRequestList from "./components/AdBoardEditRequestList";
import NotFound from "./components/NotFound/indesx";
const socket = io("http://127.0.0.1:5000");




function App() {
  const userData = useSelector(state => state.auth.userData);
  var userArea;
  if (userData?.role === "CB-So") userArea = "Hồ Chí Minh";
  else if (userData?.role === "CB-Quan") userArea = `Quận ${userData.district}, Hồ Chí Minh`
  else userArea = `Phường ${userData?.ward}, Quận ${userData?.district}, Hồ Chí Minh`
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
    socket.on("UPDATE_LOCATION_NOTIFICATION", (data) => {
      console.log("Received notification:", data);
      toast.closeAll();
      if (userData?.email === data._doc.userRequest) {
        console.log("Data");
        toast({
          title: `Yêu cầu chỉnh sửa điểm đặt quảng cáo của bạn đã được phản hồi`,
          description: (
            <>
              <b>Thời điểm phản hồi:</b> {new Date(data._doc.updatedAt).toLocaleString()} <br />
              <b>Địa điểm:</b> {data.location.address}<br />
              <b>Trạng thái:</b> {data._doc.status}
            </>
          ),
          duration: 5000,
          isClosable: true,
          variant: "left-accent",
          position: "bottom-right",
        });
      }
    });
    socket.on("UPDATE_ADBOARD_NOTIFICATION", (data) => {
      console.log("Received notification:", data);
      toast.closeAll();
      if (userData?.email === data._doc.userRequest) {
        toast({
          title: `Yêu cầu chỉnh sửa bảng quảng cáo của bạn đã được phản hồi`,
          description: (
            <>
              <b>Thời điểm phản hồi:</b> {new Date(data._doc.updatedAt).toLocaleString()} <br />
              <b>Địa điểm:</b> {data.adLocation.address}<br />
              <b>Loại bảng:</b> {data.adBoard.boardType}<br />
              <b>Trạng thái:</b> {data._doc.status}
            </>
          ),
          duration: 5000,
          isClosable: true,
          variant: "left-accent",
          position: "bottom-right",
        });
      }
    });
  }, []);

  return (
    <UserProvider>
      <div style={{ display: "flex" }}>
        <Router>
          {userData ? <Sidebar /> : <></>}
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

                  {userData?.role != "CB-So" ? <TableQueryByArea area={userArea} /> : <Navigate replace to="/manage-location" />}
                </ProtectedProvider>
              }
            />
            <Route
              path="/table-adboard"
              element={
                <ProtectedProvider>
                  <TableQueryAdBoardByArea />
                </ProtectedProvider>
              }
            />
            <Route
              path="/manage-district"
              element={
                <ProtectedProvider>
                  {userData?.role !== "CB-So" ? <Navigate replace to="/map" /> : <ManageDistrict />}
                </ProtectedProvider>
              }
            />
            <Route
              path="/manage-ward"
              element={
                <ProtectedProvider>
                  {userData?.role !== "CB-So" ? <Navigate replace to="/map" /> : <ManageWard />}
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

            <Route path="/signup" element={<ProtectedProvider>
              {userData?.role !== "CB-So" ? <Navigate replace to="/map" /> : <Signup />}
            </ProtectedProvider>} />

            <Route path="/account" element={<ProtectedProvider><Account /></ProtectedProvider>} />
            <Route
              path="/report"
              element={
                <ProtectedProvider>
                  <NotifyProvider isClick={isClick} report={report}>
                    <ReportDashboard />
                  </NotifyProvider>
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

            <Route path="/manage-location" element={
              <ProtectedProvider>
                {userData?.role !== "CB-So" ? <Navigate replace to="/map" /> : <AdLocationPage />}
              </ProtectedProvider>
            }
            />

            <Route
              path="/ad-boards/:locationId"
              element={<ProtectedProvider>
                {userData?.role !== "CB-So" ? <Navigate replace to="/map" /> : <AdBoardsDisplay />}
              </ProtectedProvider>}
            />

            <Route
              path="/advertisinglicense"
              element={
                <ProtectedProvider>
                  <AdvertisingLicenseRequestList />
                </ProtectedProvider>
              }
            />
            <Route
              path="/adlocation-edit-request-list"
              element={
                <ProtectedProvider>
                  <AdLocationEditRequestList />
                </ProtectedProvider>
              }
            />
            <Route
              path="/adboard-edit-request-list"
              element={
                <ProtectedProvider>
                  <AdBoardEditRequestList />
                </ProtectedProvider>
              }
            />
            <Route path="/" element={<Navigate replace to="/map" />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </UserProvider>
  );
}

export default App;

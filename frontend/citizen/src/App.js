import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Map from "./components/Map";
import ReportDashboard from "./components/ReportDashboard";
import io from 'socket.io-client';
import { useEffect } from "react";
import { useToast } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import NotificationProvider from "./Provider/NotificationProvider";
import { useState } from "react";
const socket = io('http://127.0.0.1:5000');

function App() {
  const toast = useToast();
  const rp = useSelector((state) => state.report.reports);
  const rpLocation = useSelector((state) => state.report.reportLocations);
  const [report, setReport] = useState();
  const [isClick, setIsClick] = useState();
  localStorage.setItem("viewNotify", false)
  useEffect(() => {
    // Simulate authentication with a secret token
    socket.emit('authenticate', 'CITIZEN');

    // Listen for messages from the server
    socket.on('notification', (data) => {
      console.log('Received notification:', data);
      const report_find = rp.find((r) => r._id === data._id)
      if (report_find) {
        let k = -1;
        for (let i = 0; i < rp.length; i++) {
          if (rp[i]._id === data._id) {
            rp[i] = data;
            k = i;
          }
        }
        if (k !== -1) {
          console.log(rp[k]);
        }
        toast.closeAll();
        setIsClick(false)// Close all existing toasts
        toast({
          title: `Phản hồi báo cáo`,
          description: (
            <>
              Bạn có phản hồi báo cáo ở khu vực {data.area}, <br />
              Kiểu loại: {data.reportType}, <br />
              Thời điểm báo cáo: {data.time} <br />
              <button onClick={handleButtonClick}><b>Xem chi tiết</b></button>
            </>
          ),
          duration: 5000,
          isClosable: true,
          variant: 'left-accent',
          position: 'bottom-right',
          onClose: () => { setIsClick(false) }
        });
        setReport(report_find);
      }
      const reportLocations_find = rpLocation.find((r) => r._id === data._id)
      if (reportLocations_find) {
        let k = -1;
        for (let i = 0; i < rpLocation.length; i++) {
          if (rpLocation[i]._id === data._id) {
            rpLocation[i] = data;
            k = i;
          }
        }
        if (k !== -1) {
          console.log(rpLocation[k]);
        }
        toast.closeAll();
        setIsClick(false)// Close all existing toasts
        toast({
          title: `Phản hồi báo cáo`,
          description: (
            <>
              Bạn có phản hồi báo cáo ở khu vực {data.area}, <br />
              Kiểu loại: {data.reportType}, <br />
              Thời điểm báo cáo: {data.time} <br />
              <button onClick={handleButtonClick}><b>Xem chi tiết</b></button>
            </>
          ),
          duration: 5000,
          isClosable: true,
          variant: 'left-accent',
          position: 'bottom-right',
          onClose: () => { setIsClick(false) }
        });
        setReport(reportLocations_find);
      }
    });
    const handleButtonClick = () => {

      setIsClick(true)
    }
  }, [rp, toast]);

  return (
    <div className="App">
      <Router>
        <Routes>

          <Route path="/" element={<NotificationProvider isClick={isClick} report={report}><Map /></NotificationProvider>} />
          <Route path="/report" element={<NotificationProvider isClick={isClick} report={report}><ReportDashboard /></NotificationProvider>} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;

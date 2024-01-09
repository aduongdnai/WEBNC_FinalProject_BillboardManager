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
  const [report, setReport] = useState();
  const [isClick, setIsClick] = useState();
  localStorage.setItem("viewNotify",false)
  useEffect(() => {
    // Simulate authentication with a secret token
    socket.emit('authenticate', 'CITIZEN');

    // Listen for messages from the server
    socket.on('notification', (data) => {
      console.log('Received notification:', data);
      const report_find = rp.find((r) => r._id === data._id)
      if (report_find) {
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
          onClose: () => {setIsClick(false)}
        });
        setReport(report_find);
      }
    });
    const handleButtonClick = ()=>{
      
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

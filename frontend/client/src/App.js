import Map from "./components/Map";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ManageWardAndDistrict from "./components/ManageWardAndDistrict";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar/Sidebar";
import { Flex } from "@chakra-ui/react";


function App() {
  return (
    <div style={{display:"flex"}}>
      <Sidebar/>
    <Router>
      <Routes>
        <Route path="/map" element={<Map/>}/>
        <Route path="/manage" element={<ManageWardAndDistrict/>}/>
        <Route path="/" element={<Navigate replace to="/map"/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

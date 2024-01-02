import Map from "./components/Map";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ManageWardAndDistrict from "./components/ManageWardAndDistrict";
import NavBar from "./components/NavBar";
import Login from "./components/LoginSignup/Login";
import Signup from "./components/LoginSignup/Signup";
import { UserProvider } from "./components/LoginSignup/userContext";
import Sidebar from "./components/Sidebar/Sidebar";
import { Flex } from "@chakra-ui/react";


  
function App() {
  
  return (
    <UserProvider>
<div style={{display:"flex"}}>
    <Router>
      <Sidebar/>
      <Routes>
        <Route path="/map" element={<Map/>}/>
        <Route path="/manage" element={<ManageWardAndDistrict/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/" element={<Navigate replace to="/map"/>}/>
      </Routes>
    </Router>
    </div>
    </UserProvider>
  );
}

export default App;

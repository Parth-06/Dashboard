import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";
import Upload from "./Components/Upoload/Upload";
import Register from "./Components/LoginRegi/Register";
import Login from "./Components/LoginRegi/Login";
import SideNavbar from "./Components/SideBar/Sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProSidebarProvider } from "react-pro-sidebar";
import UserData from "./Components/UserData/UserData";
import Logout from "./Components/Logout/Logout";
function App() {
  return (
    <div className="App">
      <ProSidebarProvider>
        <Router>
          <SideNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/userdata" element={<UserData />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </Router>
      </ProSidebarProvider>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={true}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={0}
        theme="light"
      />
    </div>
  );
}

export default App;

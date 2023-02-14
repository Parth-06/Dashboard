import React, { useEffect, useState } from "react";
import { Sidebar, Menu, useProSidebar } from "react-pro-sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import "./Sidebar.css";
const SideNavbar = () => {
  const { collapseSidebar } = useProSidebar();
  const navigate = useNavigate();
  const location = useLocation();
  const [userDetails, setuserDetails] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);

  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  useEffect(() => {
    if (location.pathname !== "/login" || location.pathname !== "/register") {
      const Callmainpage = async () => {
        try {
          const res = await fetch("/home", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            credentials: "include",
          });
          const user = await res.json();
          setuserDetails(user);
          if (!res.status === 200) {
            const error = new Error(res.error);
            throw error;
          }
        } catch (err) {
          console.log(err);
        }
      };
      Callmainpage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (location.pathname === "/login") return null;
  if (location.pathname === "/register") return null;
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar
        defaultCollapsed
        backgroundColor="#1F2A40"
        collapsedWidth={windowWidth > 800 ? "65px" : "0px"}
        rootStyles={
          windowWidth < 800
            ? {
                border: "none",
              }
            : {}
        }
      >
        <Menu
          menuItemStyles={{
            button: ({ level, active, disabled }) => {
              if (level === 0)
                return {
                  color: "white",
                  backgroundColor: "#1F2A40",
                };
            },
          }}
        >
          <div className="nav_header">
            <i className="fas fa-bars" onClick={() => collapseSidebar()}></i>
            <h1>ADMINS</h1>
          </div>
          <div className="nav_profile">
            <img
              src="https://e7.pngegg.com/pngimages/717/24/png-clipart-computer-icons-user-profile-user-account-avatar-heroes-silhouette-thumbnail.png"
              className="nav_profile_img"
            />
            <h3>{userDetails?.name}</h3>
          </div>
          <div className="border"></div>
          <span className="nav_menu" onClick={() => navigate("/")}>
            <i className="fas fa-home"></i> Dashboard
          </span>
          <span className="nav_menu" onClick={() => navigate("/upload")}>
            <i className="fas fa-upload"></i> Upload
          </span>
          <span className="nav_menu" onClick={() => navigate("/userdata")}>
            <i className="fas fa-user"></i> Userdata
          </span>
        </Menu>
      </Sidebar>
    </div>
  );
};

export default SideNavbar;

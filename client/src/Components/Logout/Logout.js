import React from "react";
import "./Logout.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
const Logout = () => {
  const navigate = useNavigate();
  const Logoutpage = async () => {
    try {
      const res = await fetch("/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
      });

      navigate("/login");
      toast.error("Logout");
      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
      console.warn(err.responseText);
    }
  };
  return (
    <div className="logout">
      <Navbar />
      <button className="logout_btn" onClick={Logoutpage}>
        Logout
      </button>
    </div>
  );
};

export default Logout;

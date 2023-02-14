import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./UserData.css";
import Table from "./Table";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserData = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
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
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
        toast.error("Please Login For Better Experience");
        navigate("/login");
      }
    };
    Callmainpage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchuserdata = async () => {
      try {
        const res = await fetch("/fetchuserdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });
        const user = await res.json();
        setUserData(user);
        if (!res.status === 200) {
          const error = new Error(res.error);
          throw error;
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchuserdata();
  }, []);

  return (
    <div className="userdata">
      <Navbar />
      <h1>Uploded Data</h1>
      <div className="userdata_table">
        <Table userData={userData} />
      </div>
    </div>
  );
};

export default UserData;

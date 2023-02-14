import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "./LoginRegi.css";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();

    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (res.status === 400 || !data) {
      console.log("invalid");
      toast.error("Invaid Login Details");
    } else {
      toast.success("Login successfully");
      navigate("/");
    }
  };

  return (
    <div className="register">
      <div className="login__logo">
        <img src="https://www.warpbay.com/logo.svg" alt="wobot_logo" />
        <h1>Warpbay</h1>
      </div>
      <div className="login__box">
        <div className="register__box--text">
          <h3>Login</h3>
        </div>
        <form className="register__form">
          <div className="register__form--input">
            <label className="register__form--label">Email </label>
            <input
              type="text"
              placeholder="e.g. example@xyz.com"
              className="register__form--textInput"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="register__form--label" htmlFor="catogory">
              Password
            </label>
            <input
              type="text"
              placeholder="************"
              className="register__form--textInput"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="register__form--btn" onClick={handleClick}>
              Login
            </button>
            <button
              className="register__form--btn"
              onClick={() => navigate("/register")}
            >
              Regsiter
            </button>
          </div>
        </form>
      </div>
      <div className="register_fotter">
        <h4>Terms of use | </h4>
        <h4> &nbsp;Privacy policy</h4>
      </div>
    </div>
  );
};

export default Login;

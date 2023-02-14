import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./LoginRegi.css";

const Regsiter = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const navigate = useNavigate();
  let name, value;

  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const postData = async (e) => {
    e.preventDefault();

    const { name, email, password, cpassword } = user;

    const res = await fetch("/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        cpassword,
      }),
    });

    const data = await res.json();
    if (res.status === 422 || !data) {
      toast.error("Unseccessfull");
      console.log("invalid");
    } else {
      navigate("/login");
      toast.success("Registered Successfully");
    }
  };

  return (
    <div className="register">
      <div className="register__logo">
        <img src="https://www.warpbay.com/logo.svg" alt="wobot_logo" />
        <h1>Warpbay</h1>
      </div>
      <div className="register__box">
        <div className="register__box--text">
          <h3>Register</h3>
        </div>
        <form className="register__form">
          <div className="register__form--input">
            <label className="register__form--label">Your name </label>
            <input
              type="text"
              placeholder="e.g. John Smith"
              className="register__form--textInput"
              required
              value={user.name}
              onChange={handleInput}
              name="name"
            />
            <label className="register__form--label">Email </label>
            <input
              type="email"
              placeholder="e.g. example@xyz.com"
              className="register__form--textInput"
              required
              value={user.email}
              onChange={handleInput}
              name="email"
            />
            <label className="register__form--label" htmlFor="catogory">
              Password
            </label>
            <input
              type="text"
              placeholder="************"
              className="register__form--textInput"
              required
              value={user.password}
              onChange={handleInput}
              name="password"
            />
            <label className="register__form--label" htmlFor="catogory">
              Confirm Password
            </label>
            <input
              type="text"
              placeholder="************"
              className="register__form--textInput"
              required
              value={user.cpassword}
              onChange={handleInput}
              name="cpassword"
            />
            <button className="register__form--btn" onClick={postData}>
              Get Started
            </button>
            <button
              className="register__form--btn"
              onClick={() => navigate("/login")}
            >
              Login
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

export default Regsiter;

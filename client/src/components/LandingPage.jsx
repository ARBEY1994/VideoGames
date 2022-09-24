import React from "react";
import { Link } from "react-router-dom";
import "../components/styles/landingPage.css";
import logo from "./styles/imagenes/logo.png";

export default function LandingPage() {
  return (
    <div className="background">
      <div>
        <img src={logo} alt="" />
      </div>
      <p className="title">
        <span>search your favorite video games</span>
      </p>
      <div className="enter">
        <Link to="/Home">
          <button className="buttonLanding">let's go </button>
        </Link>
      </div>
    </div>
  );
}

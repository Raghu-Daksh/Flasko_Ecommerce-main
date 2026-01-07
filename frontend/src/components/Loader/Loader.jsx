import React from "react";
import "./Loader.css";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader-wrapper">
      <div className="loader-card">
        <div className="spinner"></div>
        <p className="loader-text">{text}</p>
      </div>
    </div>
  );
};

export default Loader;

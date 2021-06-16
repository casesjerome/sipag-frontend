import React from "react";

import "./LoadingElement.css";

const LoadingElement = () => {
  return (
    <div className="container-fluid d-flex justify-content-center loading-overlay">
      <div className="lds">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingElement;

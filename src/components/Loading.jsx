import React from "react";
import { useSelector } from "react-redux";
import "../assets/css/loading.css";

export default function Loading() {
  const { isLoading, message } = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return (
    <div className="loadingOverlay">
      <div className="loadingContainer">
        <div className="loadingAnimation">
          <div className="loadingSquare"></div>
          <div className="loadingSquare"></div>
          <div className="loadingSquare"></div>
        </div>
        {message && <p className="loadingMessage">{message}</p>}
      </div>
    </div>
  );
}

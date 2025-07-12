import React from "react";
import "../assets/css/homeCard.css";
import { useNavigate } from "react-router-dom";

export default function HomeCard() {
  const navigate = useNavigate();
  function goToCanvas() {
    navigate("/Home/canvas");
  }
  function goToMyUploads() {
    navigate("/uploads");
  }
  return (
    <div className="homeCardContainer">
      <div className="homeSection">
        <div className="homeSectionAppsContainer">
          <div className="homeAppItemCont action-button-cont">
            <button
              className="homeActionLinks nothing-button"
              onClick={goToCanvas}
            >
              Draw
            </button>
            <button className="homeActionLinks nothing-button">
              My Uploads
            </button>
          </div>
          <div className="homeAppItemCont" style={{ display: "block" }}>
            <div className="recentUploadsHeading">Recent Uploads</div>
            <div className="homeAppItemCont">
              <div className="canvasImages"></div>
              <div className="canvasImages"></div>
              <div className="canvasImages"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

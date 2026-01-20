import "../assets/css/homeCard.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ThumbnailComp from "./ThumbnailComp";

export default function HomeCard() {
  const navigate = useNavigate();
  const userDataImages = useSelector(
    (state) => state.authUserData.allUploadsURL,
  );
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
              {userDataImages.map((obj) => {
                // conosle.log(Object.values(obj)[0], "Object")
                return (
                  <ThumbnailComp srcURL={Object.values(obj)[0]?.secure_id} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

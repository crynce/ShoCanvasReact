import React from "react";
import { useSelector } from "react-redux";

export default function ThumbnailComp({ srcURL }) {
  const userDataImages = useSelector(
    (state) => state.authUserData.allUploadsURL
  );
  console.log(userDataImages, "userImages");
  return (
    <div className="thumbnailCompCont">
      <img src={srcURL} alt="" className="canvasImages" />
    </div>
  );
}

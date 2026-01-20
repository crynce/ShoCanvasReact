import React from "react";
import { useSelector } from "react-redux";

export default function ThumbnailComp({ srcURL }) {
  const userDataImages = useSelector(
    (state) => state.authUserData.allUploadsURL,
  );
  return (
    <div>
      <img
        src={srcURL}
        alt=""
        className="h-52 w-52 object-contain object-center rounded-lg transition-transform duration-200 hover:scale-105 hover:cursor-pointer"
      />
    </div>
  );
}

import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const userID = useSelector((state) => state.authUserData.uid);
  console.log("protected", userID, "protected");
  // console.log(userID, "protected");
  return userID ? children : <Navigate to="/" />;
}

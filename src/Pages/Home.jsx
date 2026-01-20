import React from "react";
import Navbar from "../components/Navbar";
import "../assets/css/home.css";
import HomeCard from "../components/HomeCard";
import { useNavigationLoading } from "../hooks/useNavigationLoading";

export default function Home() {
  useNavigationLoading();
  console.log("ran");

  return (
    <div className="homeContainer">
      <Navbar />
      <HomeCard />
    </div>
  );
}

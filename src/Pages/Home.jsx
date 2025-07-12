import React from "react";
import Navbar from "../components/Navbar";
import "../assets/css/home.css";
import HomeCard from "../components/HomeCard";

export default function Home() {
  return (
    <div className="homeContainer">
      <Navbar />
      <HomeCard />
    </div>
  );
}

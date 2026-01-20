import React from "react";
import Navbar from "../components/Navbar";
import HomeCard from "../components/HomeCard";
import { useNavigationLoading } from "../hooks/useNavigationLoading";

export default function Home() {
  useNavigationLoading();

  return (
    <div className="box-border max-h-screen w-full">
      <Navbar />
      <HomeCard />
    </div>
  );
}

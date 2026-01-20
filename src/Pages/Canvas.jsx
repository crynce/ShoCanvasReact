import React, { useEffect, useRef } from "react";
import "../assets/css/canvas.css";
import { URL_FOR_IMAGE_UPLOAD } from "../utility/utils";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { pushLinkToFirebase, updateUploadData } from "../store/uploadReducer";
import { useNavigate } from "react-router-dom";
import { useNavigationLoading } from "../hooks/useNavigationLoading";
import { startLoading, stopLoading } from "../store/loadingReducer";
import { authStorage } from "../utility/authStorage";

export default function Canvas() {
  useNavigationLoading();

  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas - set both CSS and drawing surface size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200;

    // Set canvas CSS size to match
    canvas.style.display = "block";
    canvas.style.touchAction = "none"; // Prevent default touch behavior

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      let x, y;

      if (e.touches) {
        x = (e.touches[0].clientX - rect.left) * scaleX;
        y = (e.touches[0].clientY - rect.top) * scaleY;
      } else {
        x = (e.clientX - rect.left) * scaleX;
        y = (e.clientY - rect.top) * scaleY;
      }

      return { x, y };
    };

    const startDraw = (e) => {
      drawingRef.current = true;
      const { x, y } = getPos(e);
      ctx.beginPath();
      ctx.moveTo(x, y);
    };

    const draw = (e) => {
      if (!drawingRef.current) return;
      const { x, y } = getPos(e);
      ctx.lineTo(x, y);
      ctx.stroke();
      e.preventDefault();
    };

    const stopDraw = () => {
      drawingRef.current = false;
      ctx.closePath();
    };

    // Mouse events
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);
    canvas.addEventListener("mouseout", stopDraw);

    // Touch events
    canvas.addEventListener("touchstart", startDraw);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDraw);

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - 200;
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);
      canvas.removeEventListener("mouseout", stopDraw);

      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDraw);

      window.removeEventListener("resize", handleResize);
    };
  }, []);
  async function submit() {
    const canvas = canvasRef.current;
    try {
      dispatch(startLoading("Uploading your artwork..."));

      let blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png"),
      );

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "imgesDump");

      const response = await fetch(URL_FOR_IMAGE_UPLOAD, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      const { public_id, secure_url, asset_id } = result;

      const userUID = authStorage.getUID();
      dispatch(
        pushLinkToFirebase({ public_id, secure_url, asset_id, uid: userUID }),
      );
      dispatch(stopLoading());
      clearCanvas();
    } catch (err) {
      console.log(err, "error in uploading");
      dispatch(stopLoading());
    }
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function galleryNavHandler() {
    navigate("/Home");
  }

  return (
    <div className="app-container">
      <Navbar />
      <canvas
        ref={canvasRef}
        id="canvasPlayground"
        className="canvasPlayground"
      ></canvas>
      <div className="action-button-cont">
        <button className="nothing-button" onClick={submit}>
          Submit
        </button>
        <button className="nothing-button" onClick={galleryNavHandler}>
          back to Home
        </button>
        <button className="nothing-button" onClick={clearCanvas}>
          Clear Canvas
        </button>
      </div>
    </div>
  );
}

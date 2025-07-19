import React, { useEffect, useRef } from "react";
import "../assets/css/canvas.css";
import { URL_FOR_IMAGE_UPLOAD } from "../utility/utils";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { pushLinkToFirebase, updateUploadData } from "../store/uploadReducer";
import { useNavigate } from "react-router-dom";

export default function Canvas() {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userUID = useSelector((state) => state.authUserData.uid);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Resize canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 200;

    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      if (e.touches) {
        return {
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        };
      } else {
        return {
          x: e.offsetX,
          y: e.offsetY,
        };
      }
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
    };

    // Mouse events
    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDraw);

    // Touch events
    canvas.addEventListener("touchstart", startDraw);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDraw);

    // Cleanup
    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDraw);

      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDraw);
    };
  }, []);
  async function submit() {
    const canvas = canvasRef.current;
    try {
      let blob = await new Promise((resolve) =>
        canvas.toBlob(resolve, "image/png")
      );

      const formData = new FormData();
      formData.append("file", blob);
      formData.append("upload_preset", "imgesDump");

      const response = await fetch(URL_FOR_IMAGE_UPLOAD, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      // console.log(result, "result");
      const { public_id, secure_url, asset_id } = result;

      // dispatch(updateUploadData({ public_id, secure_url, asset_id }));
      dispatch(
        pushLinkToFirebase({ public_id, secure_url, asset_id, uid: userUID })
      );
      clearCanvas();
    } catch (err) {
      console.log(err, "error in uploading");
    }
    // dispatch(
    //   pushLinkToFirebase({ public_id, secure_url, asset_id, uid: userUID })
    // );
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

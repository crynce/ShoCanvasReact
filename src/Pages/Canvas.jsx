import React, { useEffect, useRef } from "react";
import "../assets/css/canvas.css";

export default function Canvas() {
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const URL = "https://api.cloudinary.com/v1_1/dljuam21j/image/upload";

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
    let blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );

    const formData = new FormData();
    formData.append("file", blob);
    formData.append("upload_preset", "imgesDump");

    const response = await fetch(URL, {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log(result, "result");
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <div className="app-container">
      <nav className="navbarCont">
        <h1 className="canvasBrandName">Sho-Canvas</h1>
        <sub className="subscript">Draw anyThing</sub>
      </nav>
      <canvas
        ref={canvasRef}
        id="canvasPlayground"
        className="canvasPlayground"
      ></canvas>
      <div className="action-button-cont">
        <button className="nothing-button" onClick={submit}>
          Submit
        </button>
        <button className="nothing-button" onClick={clearCanvas}>
          Clear Canvas
        </button>
      </div>
    </div>
  );
}

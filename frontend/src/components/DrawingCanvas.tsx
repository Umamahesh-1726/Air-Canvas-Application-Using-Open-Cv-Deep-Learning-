import React, { useState, useRef } from "react";
import { Paintbrush, Trash2, Undo2, Save } from "lucide-react";

const DrawingCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("red");
  const [gesture] = useState("none");
  const [connected] = useState(false);

  // ---- Canvas Drawing Logic ----
  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas || !isDrawing) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "drawing.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  const colors = ["red", "blue", "green", "yellow", "purple", "orange", "black"];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      {/* ---------- Top Header ---------- */}
      <div className="flex items-center justify-between w-full p-4 bg-white border-b shadow-sm">
        <div className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
          🎨 AI Canvas - Gesture Control
        </div>
        <div
          className={`px-3 py-1 rounded-md text-sm font-medium ${
            connected ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {connected ? "Connected" : "Disconnected"}
        </div>
      </div>

      {/* ---------- Main Content ---------- */}
      <div className="flex w-full max-w-6xl gap-6 px-4 mt-6">
        {/* Left Panel: Gesture Feed */}
        <div className="flex flex-col w-1/2 gap-4">
          <div className="relative bg-black rounded-lg shadow-md h-[400px] flex items-start justify-start p-3 text-white font-semibold">
            <div className="absolute top-2 left-2">
              Gesture: <span className="text-yellow-400">{gesture}</span>
            </div>
            <div className="absolute top-2 right-2">
              <div className="w-6 h-6 bg-red-600 border-2 border-white rounded-full"></div>
            </div>
          </div>

          {/* Gesture Commands Card */}
          <div className="p-4 text-gray-800 bg-white rounded-lg shadow-md">
            <h3 className="mb-2 text-lg font-semibold text-center">
              Gesture Commands
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <div>☝️ <span className="font-bold">Point:</span> Draw</div>
              <div>✊ <span className="font-bold">Fist:</span> Clear</div>
              <div>✌️ <span className="font-bold">Two Fingers:</span> Undo</div>
              <div>🖐️ <span className="font-bold">Palm:</span> Pause</div>
              <div>🤟 <span className="font-bold">Three+:</span> Change Color</div>
              <div>👍 <span className="font-bold">Thumbs Up:</span> Save</div>
            </div>
          </div>
        </div>

        {/* Right Panel: Drawing Canvas */}
        <div className="flex flex-col items-center w-1/2">
          <canvas
            ref={canvasRef}
            width={500}
            height={400}
            className="bg-white border rounded-lg shadow-md cursor-crosshair"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-4">
            <button
              onClick={() => setIsDrawing(!isDrawing)}
              className="flex items-center gap-1 px-3 py-1 text-white bg-green-500 rounded-md shadow-sm hover:bg-green-600"
            >
              <Paintbrush size={16} /> Drawing
            </button>
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1 px-3 py-1 text-white bg-red-500 rounded-md shadow-sm hover:bg-red-600"
            >
              <Trash2 size={16} /> Clear
            </button>
            <button
              onClick={() => console.log("Undo")}
              className="flex items-center gap-1 px-3 py-1 text-white bg-pink-400 rounded-md shadow-sm hover:bg-pink-500"
            >
              <Undo2 size={16} /> Undo
            </button>
            <button
              onClick={saveDrawing}
              className="flex items-center gap-1 px-3 py-1 text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-600"
            >
              <Save size={16} /> Save
            </button>
          </div>

          {/* Color Palette */}
          <div className="flex gap-3 mt-3">
            {colors.map((color) => (
              <div
                key={color}
                onClick={() => setCurrentColor(color)}
                className={`w-8 h-8 rounded-full cursor-pointer border-2 ${
                  currentColor === color
                    ? "border-black scale-110"
                    : "border-transparent"
                }`}
                style={{ backgroundColor: color }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrawingCanvas;

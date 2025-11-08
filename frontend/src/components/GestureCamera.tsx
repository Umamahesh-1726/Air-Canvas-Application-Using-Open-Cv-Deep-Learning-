import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';

interface GestureCameraProps {
  gesture: string;
  confidence: number;
}

const GestureCamera: React.FC<GestureCameraProps> = ({ gesture, confidence }) => {
  const webcamRef = useRef<Webcam>(null);

  return (
    <div className="flex flex-col items-start justify-between w-full max-w-6xl p-4 mx-auto space-y-4 md:flex-row md:space-y-0 md:space-x-6">
      {/* Webcam Frame with Gesture Info */}
      <div className="relative w-full overflow-hidden border-4 border-gray-300 shadow-lg md:w-2/3 aspect-video rounded-2xl">
        <Webcam
          ref={webcamRef}
          audio={false}
          mirrored={true}
          screenshotFormat="image/jpeg"
          className="object-cover w-full h-full"
        />
        {/* Overlay Label */}
        <div className="absolute top-0 left-0 px-4 py-2 text-sm text-white bg-black bg-opacity-50 rounded-br-xl">
          Gesture: <span className="font-bold">{gesture}</span>
        </div>
        <div className="absolute top-0 right-0 px-4 py-2 text-sm text-white bg-black bg-opacity-50 rounded-bl-xl">
          Confidence: <span className="font-bold">{confidence.toFixed(1)}%</span>
        </div>
      </div>

      {/* Commands Panel */}
      <div className="w-full p-4 bg-white border-2 border-gray-200 shadow-xl md:w-1/3 rounded-2xl">
        <h2 className="mb-4 text-xl font-bold text-center">Gesture Commands</h2>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center"><span className="mr-2 text-lg">✋</span>Open Palm – Change Color</li>
          <li className="flex items-center"><span className="mr-2 text-lg">👇</span>Pointing – Draw Line</li>
          <li className="flex items-center"><span className="mr-2 text-lg">👊</span>Fist – Clear Canvas</li>
          <li className="flex items-center"><span className="mr-2 text-lg">✌</span>Peace Sign – Change Color</li>
          <li className="flex items-center"><span className="mr-2 text-lg">👌</span>OK Sign – Save Drawing</li>
        </ul>
      </div>
    </div>
  );
};

export default GestureCamera;

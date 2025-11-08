import React from 'react';

const VideoFeed: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-8">
      <h1 className="mb-4 text-2xl font-bold text-blue-700">🎥 Live Air Canvas Feed</h1>
      <img
        src="http://127.0.0.1:5000/video"
        alt="Air Canvas Stream"
        className="border border-gray-300 rounded-lg shadow-md"
        width="640"
        height="480"
      />
    </div>
  );
};

export default VideoFeed;

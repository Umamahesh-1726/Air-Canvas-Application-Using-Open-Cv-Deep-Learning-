import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Gallery: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('gallery');
    if (stored) {
      setImages(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    localStorage.setItem('gallery', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Gallery</h1>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-white bg-indigo-600 rounded-lg shadow hover:bg-indigo-700"
        >
          Back to Canvas
        </button>
      </div>

      {images.length === 0 ? (
        <p className="text-lg text-gray-600">No saved drawings yet.</p>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {images.map((img, idx) => (
            <div key={idx} className="flex flex-col items-center p-3 bg-white shadow rounded-xl">
              <img
                src={img}
                alt={`Drawing ${idx}`}
                className="object-contain w-full h-auto border rounded max-h-48"
              />
              <div className="flex gap-2 mt-3">
                <a
                  href={img}
                  download={`drawing-${idx}.png`}
                  className="text-sm text-blue-500 underline"
                >
                  Download
                </a>
                <a
                  href={img}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-green-500 underline"
                >
                  View
                </a>
                <button
                  onClick={() => handleDelete(idx)}
                  className="text-sm text-red-500 underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;

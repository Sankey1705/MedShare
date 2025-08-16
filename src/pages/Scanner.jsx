// src/pages/ScanUpload.jsx
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state; // ✅ medicine data from DonationForm

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Unable to access camera. Please allow permission.");
    }
  };

  // Capture photo
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/png");
      setCapturedImage(imageData);
    }
  };

  // Simulate upload + navigate with updated data
  const handleUpload = () => {
    if (!capturedImage) {
      alert("Please capture a photo first!");
      return;
    }

    // Merge scanned image into formData
    const updatedData = {
      ...formData,
      scannedImage: capturedImage,
    };

    console.log("Uploaded Image with formData:", updatedData);

    navigate("/MedOverview", { state: updatedData }); // ✅ pass data forward
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">
          ←
        </button>
        <h2 className="text-lg font-semibold">Scan & Upload</h2>
      </div>

      {/* Camera preview */}
      {!capturedImage ? (
        <div className="relative w-full max-w-sm h-80 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute border-4 border-white w-56 h-56 rounded-lg"></div>
        </div>
      ) : (
        <img
          src={capturedImage}
          alt="Captured"
          className="w-full max-w-sm rounded-2xl mb-4"
        />
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>

      {/* Buttons */}
      <div className="mt-6 space-y-3 w-full max-w-sm">
        {!capturedImage ? (
          <>
            <button
              onClick={startCamera}
              className="w-full bg-blue-500 text-white py-3 rounded-full font-medium"
            >
              Start Camera
            </button>
            <button
              onClick={capturePhoto}
              className="w-full bg-green-500 text-white py-3 rounded-full font-medium"
            >
              Capture Photo
            </button>
          </>
        ) : (
          <button
            onClick={handleUpload}
            className="w-full bg-blue-500 text-white py-3 rounded-full font-medium"
          >
            Upload & Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default Scanner;

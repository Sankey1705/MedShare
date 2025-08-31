// src/pages/ScanUpload.jsx
import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase"; // ✅ Firestore
import { doc, updateDoc } from "firebase/firestore";

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state; // ✅ data passed from DonationForm (must include docId)

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

  // Capture photo with 10KB restriction
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);

      // compress image → jpeg with quality 0.5
      let imageData = canvas.toDataURL("image/jpeg", 0.5);

      // check size in bytes
      const imageSize = Math.round((imageData.length * 3) / 4); // Base64 size formula

      if (imageSize > 10 * 1024) {
        alert("Image must be less than 10KB. Try retaking closer or smaller frame.");
        return;
      }

      setCapturedImage(imageData);
    }
  };

  // Upload to Firestore → Update same document
  const handleUpload = async () => {
    if (!capturedImage) {
      alert("Please capture a photo first!");
      return;
    }

    if (!formData?.docId) {
      alert("No donation document found to update.");
      return;
    }

    try {
      // ✅ update existing doc instead of creating new one
      const donationRef = doc(db, "donations", formData.docId);
      await updateDoc(donationRef, {
        scannedImage: capturedImage,
      });

      console.log("Donation updated with image:", formData.docId);
      

      // Pass forward with updated data
      const updatedData = { ...formData, scannedImage: capturedImage };
      navigate("/MedOverview", { state: updatedData });
    } catch (error) {
      console.error("Error updating donation:", error);
      alert("Failed to save donation.");
    }
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
              Capture Photo (Max 10KB)
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

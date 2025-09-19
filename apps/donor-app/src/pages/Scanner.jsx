// src/pages/ScanUpload.jsx
import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const streamRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state; // includes docId

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch (err) {
      console.error("Camera error:", err);
      alert("Unable to access camera. Please allow permission.");
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  };

  // Capture photo
  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");
      setCapturedImage(imageData);
      stopCamera();
    }
  };

  // Retake photo
  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  // Upload captured photo
  const handleUpload = async () => {
    if (!capturedImage) return alert("Please capture a photo first!");
    if (!formData?.docId) return alert("No donation document found!");

    setLoading(true);

    try {
      // Convert base64 → Blob → File
      const res = await fetch(capturedImage);
      const blob = await res.blob();
      const file = new File([blob], "scan.jpg", { type: "image/jpeg" });

      // Prepare FormData
      const fd = new FormData();
      fd.append("file", file);

      console.log("Uploading file to backend...");

      // Send to backend
      const uploadRes = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: fd,
      });

      if (!uploadRes.ok) {
        const text = await uploadRes.text();
        throw new Error(`Upload failed: ${uploadRes.status} - ${text}`);
      }

      const data = await uploadRes.json();
      if (!data.ok) throw new Error(data.error || "Cloudinary upload failed");

      console.log("Upload success:", data);

      // Update Firestore doc
      const donationRef = doc(db, "donations", formData.docId);
      await updateDoc(donationRef, {
        scannedImageUrl: data.url,
        cloudinaryId: data.publicId,
      });

      console.log("Firestore updated with Cloudinary URL:", data.url);

      navigate("/MedOverview", {
        state: { ...formData, scannedImageUrl: data.url },
      });
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Upload failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cleanup
  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="w-full flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">
          ←
        </button>
        <h2 className="text-lg font-semibold">Scan & Upload</h2>
      </div>

      {/* Camera or captured image */}
      {!capturedImage ? (
        <div className="relative w-full max-w-sm h-80 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
          {cameraActive && (
            <div className="absolute border-4 border-white w-56 h-56 rounded-lg"></div>
          )}
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
            {!cameraActive ? (
              <button
                onClick={startCamera}
                className="w-full bg-blue-500 text-white py-3 rounded-full font-medium"
              >
                Start Camera
              </button>
            ) : (
              <button
                onClick={capturePhoto}
                className="w-full bg-green-500 text-white py-3 rounded-full font-medium"
              >
                Capture Photo
              </button>
            )}
          </>
        ) : (
          <>
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full bg-blue-500 text-white py-3 rounded-full font-medium"
            >
              {loading ? "Uploading..." : "Upload & Continue"}
            </button>
            <button
              onClick={retakePhoto}
              className="w-full bg-gray-500 text-white py-3 rounded-full font-medium"
            >
              Retake Photo
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Scanner;

// src/pages/Scanner.jsx
import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [capturedFile, setCapturedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const draftData = location.state?.draftData || {};

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch (err) {
      console.error("Camera start error:", err);
      alert("Camera access denied");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const video = videoRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        
        const file = new File([blob], `scan_${Date.now()}.jpg`, { type: "image/jpeg" });
        setCapturedFile(file);
        setPreview(URL.createObjectURL(blob));
        stopCamera();
      },
      "image/jpeg",
      0.95
    );
  };

  const retakePhoto = () => {
    setCapturedFile(null);
    setPreview(null);
    startCamera();
  };

  const handleUpload = async () => {
    if (!capturedFile || !draftData?.docId) return alert("Capture image first!");
    setLoading(true);

    try {
      const fd = new FormData();
      fd.append("file", capturedFile);
      fd.append("folder", "scanned_images");

      const uploadRes = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: fd,
      });
      const data = await uploadRes.json();
      if (!data.url) throw new Error(data.error || "Upload failed");

      await updateDoc(doc(db, "donations", draftData.docId), {
        scannedImageUrl: data.url,
        scannedImageCloudinaryId: data.publicId,
        status: "pending",
      });

      navigate("/confirm-pickup", { state: { docId: draftData.docId } });
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => () => stopCamera(), []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full flex items-center mb-4">
        <button onClick={() => navigate(-1, { state: { draftData } })} className="mr-3 text-xl">←</button>
        <h2 className="text-lg font-semibold">Scan & Upload</h2>
      </div>

      {!preview ? (
        <div className="relative w-full max-w-sm h-80 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          {cameraActive && <div className="absolute border-4 border-white w-56 h-56 rounded-lg"></div>}
        </div>
      ) : (
        <img src={preview} alt="Captured" className="w-full max-w-sm rounded-2xl mb-4" />
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>

      <div className="mt-6 space-y-3 w-full max-w-sm">
        {!preview ? (
          !cameraActive ? (
            <button onClick={startCamera} className="w-full bg-blue-500 text-white py-3 rounded-full font-medium">Start Camera</button>
          ) : (
            <button onClick={capturePhoto} className="w-full bg-green-500 text-white py-3 rounded-full font-medium">Capture Photo</button>
          )
        ) : (
          <>
            <button onClick={handleUpload} disabled={loading} className="w-full bg-blue-500 text-white py-3 rounded-full font-medium">
              {loading ? "Uploading..." : "Upload & Continue"}
            </button>
            <button onClick={retakePhoto} className="w-full bg-gray-500 text-white py-3 rounded-full font-medium">Retake Photo</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Scanner;

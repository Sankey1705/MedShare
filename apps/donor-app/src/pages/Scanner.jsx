import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const Scanner = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [capturedImage, setCapturedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Load draft data if coming back from DonationForm
  const draftData = location.state?.draftData || {};
  const [formData, setFormData] = useState(draftData);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      videoRef.current.srcObject = stream;
      setCameraActive(true);
    } catch (err) {
      console.error(err);
      alert("Camera access denied");
    }
  };

  const stopCamera = () => {
  if (streamRef.current) {
    streamRef.current.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }

  if (videoRef.current) {
    videoRef.current.srcObject = null; // <- check before using
  }

  setCameraActive(false);
};

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);
    setCapturedImage(canvas.toDataURL("image/jpeg"));
    stopCamera();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleUpload = async () => {
    if (!capturedImage || !formData?.docId) return alert("Capture image first!");
    setLoading(true);

    try {
      const res = await fetch(capturedImage);
      const blob = await res.blob();
      const file = new File([blob], "scan.jpg", { type: "image/jpeg" });

      const fd = new FormData();
      fd.append("file", file);
      fd.append("folder", "scanned_images");

      const uploadRes = await fetch("http://localhost:5000/upload", { method: "POST", body: fd });
      const data = await uploadRes.json();
      if (!data.ok) throw new Error(data.error);

      // Update donation doc with scanned image but keep it in pending
      await updateDoc(doc(db, "donations", formData.docId), {
        scannedImageUrl: data.url,
        scannedImageCloudinaryId: data.publicId,
      });

      // Navigate to ConfirmPickup with current draft/form data
      navigate("/confirm-pickup", { state: { ...formData, scannedImageUrl: data.url } });
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  return () => {
    stopCamera(); // safe now even if component is unmounted
  };
}, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="w-full flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">←</button>
        <h2 className="text-lg font-semibold">Scan & Upload</h2>
      </div>

      {!capturedImage ? (
        <div className="relative w-full max-w-sm h-80 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
          {cameraActive && <div className="absolute border-4 border-white w-56 h-56 rounded-lg"></div>}
        </div>
      ) : (
        <img src={capturedImage} alt="Captured" className="w-full max-w-sm rounded-2xl mb-4" />
      )}

      <canvas ref={canvasRef} className="hidden"></canvas>

      <div className="mt-6 space-y-3 w-full max-w-sm">
        {!capturedImage ? (
          <>
            {!cameraActive ? (
              <button onClick={startCamera} className="w-full bg-blue-500 text-white py-3 rounded-full font-medium">Start Camera</button>
            ) : (
              <button onClick={capturePhoto} className="w-full bg-green-500 text-white py-3 rounded-full font-medium">Capture Photo</button>
            )}
          </>
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

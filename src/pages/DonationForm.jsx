// src/pages/DonationForm.jsx
import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase"; // ✅ import auth
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth"; // ✅ auth hook

const DonationForm = () => {
  const navigate = useNavigate();
  const [currentUser] = useAuthState(auth); // ✅ get logged-in user

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    expiry: "",
    category: "",
    receiptBase64: "", // store base64 instead of File
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files && files[0]) {
      const file = files[0];

      // Restrict size to 10 KB
      if (file.size > 10 * 1024) {
        alert("File size must be less than 10 KB!");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, receiptBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Save donation in Firestore
      const docRef = await addDoc(collection(db, "donations"), {
        ...formData,
        createdAt: serverTimestamp(),
        userId: currentUser ? currentUser.uid : null, // ✅ store UID
      });

      navigate("/scanner", { state: { docId: docRef.id, ...formData } });
    } catch (error) {
      console.error("Error saving donation:", error);
      alert("Failed to save donation.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">←</button>
        <h2 className="text-xl font-semibold">Donate Medicine</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow p-5 space-y-4 border">
        <div>
          <label className="block text-sm font-medium mb-1">Name of medicine</label>
          <input
            type="text"
            name="name"
            placeholder="Enter medicine name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Describe medicine"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-xl px-3 py-2"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date Of Expiration</label>
          <div className="relative">
            <input
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 pr-10"
              required
            />
            <FiCalendar className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Select Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Upload receipt of medicines</label>
          <input type="file" name="receipt" accept="image/*" onChange={handleChange} />
          {formData.receiptBase64 && (
            <img
              src={formData.receiptBase64}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white font-medium rounded-full py-3 hover:bg-blue-600 transition">
          Next
        </button>
      </form>
    </div>
  );
};

export default DonationForm;

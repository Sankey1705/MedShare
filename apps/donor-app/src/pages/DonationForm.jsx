// src/pages/DonationForm.jsx
import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import axios from "axios";

const DonationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentUser] = useAuthState(auth);

  const draftData = location.state?.draftData || {};

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    description: "",
    notes: "",
    expiry: "",
    category: "",
    condition: "",
    receiptUrl: "",
    receiptCloudinaryId: "",
    docId: draftData.docId || null,
    ...draftData,
  });

  const handleChange = async (e) => {
  const { name, value, files } = e.target;

  if (files && files[0]) {
    const file = files[0];

    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB!");
      return;
    }

    try {
      const formDataObj = new FormData();
      formDataObj.append("file", file); // 👈 MUST match backend
      formDataObj.append("folder", "medicine_receipts"); // 👈 use correct folder

      const res = await axios.post("http://localhost:5000/upload", formDataObj, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFormData((prev) => ({
        ...prev,
        receiptUrl: res.data.url, // 👈 match preview field
        receiptCloudinaryId: res.data.publicId, // 👈 keep reference if needed
      }));
    } catch (error) {
      console.error("Upload failed:", error.response?.data || error.message);
      alert("Failed to upload image.");
    }
  } else {
    setFormData({ ...formData, [name]: value });
  }
};



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return alert("Please login first");

    try {
      let updatedFormData = { ...formData };

      if (formData.docId) {
        // update existing donation
        await updateDoc(doc(db, "donations", formData.docId), {
          ...formData,
          status: "pending",
          updatedAt: serverTimestamp(),
        });
      } else {
        // create new donation
        const docRef = await addDoc(collection(db, "donations"), {
          ...formData,
          userId: currentUser.uid,
          status: "pending",
          createdAt: serverTimestamp(),
        });
        updatedFormData = { ...formData, docId: docRef.id };
        setFormData(updatedFormData);

        // immediately update doc with its id (so docId never null)
        await updateDoc(doc(db, "donations", docRef.id), { docId: docRef.id });
      }

      navigate("/scanner", { state: { draftData: updatedFormData } });
    } catch (err) {
      console.error("Donation save failed:", err);
      alert("Failed to save donation.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate(-1, { state: { draftData: formData } })}
          className="mr-3 text-xl"
        >
          ←
        </button>
        <h2 className="text-xl font-semibold">Donate Medicine</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-5 space-y-4 border"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
        </div>

        {/* Quantity */}
        <div>
          <label className="block text-sm font-medium mb-1">Quantity *</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            rows={3}
          />
        </div>

        {/* Expiry */}
        <div>
          <label className="block text-sm font-medium mb-1">Expiry *</label>
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

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">Category *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2"
            required
          />
        </div>

        {/* Condition */}
        <div>
          <label className="block text-sm font-medium mb-1">Condition *</label>
          <select
            name="condition"
            value={formData.condition}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 bg-white"
            required
          >
            <option value="">Select</option>
            <option value="Sealed">Sealed</option>
            <option value="Unopened">Unopened</option>
            <option value="Opened">Opened</option>
            <option value="Partially Used">Partially Used</option>
            <option value="New without Box">New without Box</option>
          </select>
        </div>

        {/* Receipt */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload Receipt *
          </label>
          {!formData.receiptUrl ? (
            <label className="block border-2 border-dashed rounded-xl p-4 text-center text-gray-500 cursor-pointer">
              <input
                type="file"
                name="receipt"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                required
              />
              <p>📄 Receipt Image</p>
              <p className="text-xs">Click here to upload</p>
            </label>
          ) : (
            <img
              src={formData.receiptUrl}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-lg border"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-medium rounded-full py-3 hover:bg-blue-600 transition"
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default DonationForm;

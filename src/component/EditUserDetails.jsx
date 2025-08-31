// src/component/EditUserDetails.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";

const EditUserDetails = ({ userId, name, phone, address }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name, phone, address });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!userId) return alert("User ID missing!");

    try {
      setLoading(true);
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });
      setLoading(false);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user details:", err);
      setLoading(false);
      alert("Failed to update details. Try again.");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-4 border">
      <h3 className="text-base font-semibold mb-3">Your Details</h3>

      {isEditing ? (
        <>
          {/* Editable Inputs */}
          <div className="mb-2">
            <p className="text-sm text-gray-600">Name</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          <div className="mb-2">
            <p className="text-sm text-gray-600">Phone Number</p>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-600">Address</p>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="2"
              className="w-full border rounded p-2 text-sm"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="flex-1 bg-blue-500 text-white rounded-full py-2 hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setFormData({ name, phone, address });
              }}
              className="flex-1 border rounded-full py-2 text-gray-500 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Display Mode */}
          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Name</p>
            <p className="text-sm font-medium">{formData.name}</p>
          </div>

          <div className="flex justify-between mb-2">
            <p className="text-sm text-gray-600">Phone Number</p>
            <p className="text-sm font-medium">{formData.phone}</p>
          </div>

          <div className="mb-3">
            <p className="text-sm text-gray-600">Address</p>
            <p className="text-sm font-medium">{formData.address}</p>
          </div>

          <button
            onClick={() => setIsEditing(true)}
            className="w-full border rounded-full py-2 flex items-center justify-center text-blue-500 border-blue-400 hover:bg-blue-50"
          >
            ✏️ Edit Details
          </button>
        </>
      )}
    </div>
  );
};

export default EditUserDetails;

// src/pages/EditDetailsPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EditDetailsPage = () => {
  const navigate = useNavigate();

  // You can load this from user profile / API later
  const [formData, setFormData] = useState({
    name: "John Doe",
    phone: "+91 98765 43210",
    address:
      "Zero Miles, Near Zero Miles Freedom Park Metro Station, Sitaburdi, 440022, Nagpur",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Updated User Details:", formData);
    // Later: update API or global state (context / redux)
    navigate("/MedOverview"); // 👈 go back to ConfirmPickupPage
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">
          ←
        </button>
        <h2 className="text-xl font-semibold">Edit Details</h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSave}
        className="bg-white rounded-2xl shadow p-5 space-y-4 border"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium mb-1">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            rows="3"
            value={formData.address}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Save Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white rounded-full py-3 hover:bg-blue-600 transition"
        >
          Save Details
        </button>
      </form>
    </div>
  );
};

export default EditDetailsPage;

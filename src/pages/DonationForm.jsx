import React, { useState } from "react";
import { FiCalendar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const DonationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    expiry: "",
    category: "",
    receipt: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);

    // ✅ send data dynamically to PickupDetailsPage
    navigate("/scanner", { state: formData });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">
          ←
        </button>
        <h2 className="text-xl font-semibold">Donate Medicine</h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow p-5 space-y-4 border"
      >
        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Name of medicine
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter medicine name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Describe medicine"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          ></textarea>
        </div>

        {/* Expiration Date */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Date Of Expiration
          </label>
          <div className="relative">
            <input
              type="date"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              className="w-full border rounded-xl px-3 py-2 pr-10 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <FiCalendar className="absolute right-3 top-3 text-gray-500" />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Select Category
          </label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        {/* Receipt Upload */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload receipt of medicines
          </label>
          <label className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-4 cursor-pointer hover:bg-gray-50">
            <input
              type="file"
              name="receipt"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 text-blue-500 flex items-center justify-center rounded-lg mb-2">
                📄
              </div>
              <p className="text-sm text-gray-500">Receipt Image</p>
              <p className="text-xs text-gray-400">Click here to upload</p>
            </div>
          </label>
        </div>

        {/* Button */}
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

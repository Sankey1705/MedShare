// src/component/MedicineCard.jsx
import React from "react";

const MedicineCard = ({
  name = "Medicine Name",
  description = "No description provided",
  tag = "General",
  expiry = "N/A",
  image = "https://via.placeholder.com/64", // fallback if no scanned image
  status, // ✅ optional status
}) => (
  <div className="flex items-center bg-white rounded-xl shadow p-3 border mb-3">
    {/* Medicine Image (scanned) */}
    <img
      src={image}
      alt="medicine"
      className="w-16 h-16 object-cover rounded-lg mr-4"
    />

    {/* Medicine Details */}
    <div>
      <h4 className="text-md font-bold">{name}</h4>
      <p className="text-sm text-gray-600">Description: {description}</p>

      <div className="flex items-center flex-wrap gap-2 mt-1">
        <span className="px-2 py-1 border border-blue-500 text-blue-500 text-xs rounded-full">
          {tag}
        </span>
        <span className="text-sm text-gray-700">
          Expiration date: {expiry}
        </span>
      </div>

      {/* ✅ Status (only if passed) */}
      {status && (
        <p className="mt-2 text-sm font-medium text-green-600">{status}</p>
      )}
    </div>
  </div>
);

export default MedicineCard;

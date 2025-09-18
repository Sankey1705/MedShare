// src/component/MyDonationCard.jsx
import React from "react";

const MyDonationCard = ({ name, description, category, expiry, imageUrl, status }) => {
  return (
    <div className="flex items-start bg-white rounded-2xl shadow-md p-3 mb-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={name}
          className="w-20 h-20 rounded-lg object-cover mr-4"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-lg mr-4" />
      )}

      <div className="flex-1">
        <h3 className="font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {description || "No description"}
        </p>

        <div className="flex items-center justify-between mt-2">
          <span className="text-xs border border-blue-500 text-blue-500 px-3 py-1 rounded-full">
            {category}
          </span>
          <span className="text-xs text-gray-500">Expiration: {expiry}</span>
        </div>

        {/* ✅ Arriving status (only if provided) */}
        {status && (
          <p className="text-xs text-green-600 mt-2">{status}</p>
        )}
      </div>
    </div>
  );
};

export default MyDonationCard;

// src/component/MedicineCardArriving.jsx
import React from "react";

const MedicineCardArriving = ({ name, description, tag, expiry, image, status }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4 border">
      {/* Medicine Info */}
      <div className="flex items-center">
        <img src={image} alt="medicine" className="w-16 h-16 mr-4 rounded-md" />
        <div>
          <h4 className="text-md font-bold">{name}</h4>
          <p className="text-sm text-gray-600">
            Description: {description}
          </p>
          <div className="flex items-center flex-wrap gap-2 mt-1">
            <span className="px-2 py-1 border border-blue-500 text-blue-500 text-xs rounded-full">
              {tag}
            </span>
            <span className="text-sm text-gray-700">
              Expiration date : {expiry}
            </span>
          </div>
        </div>
      </div>

      {/* Status Strip */}
      {status && (
        <div className="bg-blue-100 text-blue-600 text-center py-2 rounded-lg mt-3">
          {status}
        </div>
      )}
    </div>
  );
};

export default MedicineCardArriving;

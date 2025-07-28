import React from 'react';

const MedicineCard = ({ name, description, tag, expiry, image }) => (
  <div className="bg-white p-4 rounded-xl shadow mb-4 border">
    <div className="flex items-center">
      <img src={image} alt="medicine" className="w-16 h-16 mr-4" />
      <div>
        <h4 className="text-md font-bold">{name}</h4>
        <p className="text-sm text-gray-600">Description: {description}</p>
        <p className="text-sm mt-1">
          <span className="px-2 py-1 border border-blue-500 text-blue-500 text-xs rounded-full">
            {tag}
          </span>
        </p>
        <p className="text-sm mt-1 text-gray-700">Expiration date: {expiry}</p>
      </div>
    </div>
    <div className="mt-2 text-center text-sm text-blue-700 bg-blue-100 p-2 rounded-md">
      Arriving Tomorrow For Pickup
    </div>
  </div>
);

export default MedicineCard;

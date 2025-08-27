    // src/component/EditUserDetails.jsx
import React from "react";

const EditUserDetails = ({ name, phone, address, onEdit }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 mb-4 border">
      <h3 className="text-base font-semibold mb-3">Your Details</h3>

      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-600">Name</p>
        <p className="text-sm font-medium">{name}</p>
      </div>

      <div className="flex justify-between mb-2">
        <p className="text-sm text-gray-600">Phone Number</p>
        <p className="text-sm font-medium">{phone}</p>
      </div>

      <div className="mb-3">
        <p className="text-sm text-gray-600">Address</p>
        <p className="text-sm font-medium">{address}</p>
      </div>

      <button
        onClick={onEdit}
        className="w-full border rounded-full py-2 flex items-center justify-center text-blue-500 border-blue-400 hover:bg-blue-50"
      >
        ✏️ Edit Details
      </button>
    </div>
  );
};

export default EditUserDetails;

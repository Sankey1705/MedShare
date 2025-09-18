import React from "react";
import placeholderImg from "../../asset/medicine1.jpg"; // add a placeholder image in assets

const MedicineCardReciver = ({ image, name, description, category }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-3">
      <img
        src={image || placeholderImg}  // ✅ fallback if image missing
        alt={name}
        className="w-full h-32 object-cover rounded-xl"
      />
      <span className="text-sm text-blue-600 border border-blue-600 rounded-full px-2 py-1 inline-block mt-2">
        {category || "General"}   {/* ✅ fallback for missing tag */}
      </span>
      <h3 className="font-semibold text-lg mt-2">{name}</h3>
      <p className="text-gray-500 text-sm">{description}</p>
    </div>
  );
};

export default MedicineCardReciver;

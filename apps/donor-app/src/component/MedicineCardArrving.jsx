import React from "react";
import MedicineCard from "./MedicineCard";  //remove this compo

const MedicineCardArrving = ({ name, description, tag, expiry, image, status }) => {
  return (
    <div className="bg-white rounded-xl shadow border overflow-hidden mb-4">
      <div className="p-4">
        <MedicineCard
          name={name}
          description={description}
          tag={tag}
          expiry={expiry}
          image={image}
        />
      </div>
      {status && (
        <div className="bg-blue-100 text-blue-700 text-center text-sm py-2">
          {status}
        </div>
      )}
    </div>
  );
};

export default MedicineCardArrving;

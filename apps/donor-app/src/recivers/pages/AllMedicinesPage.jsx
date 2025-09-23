import React from "react";
import { useNavigate } from "react-router-dom";

const AllMedicinesPage = () => {
  const navigate = useNavigate();
  const medicines = JSON.parse(localStorage.getItem("availableMedicines")) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="flex items-center mb-4">
        <button onClick={() => navigate(-1)} className="mr-2 text-xl">←</button>
        <h2 className="text-lg font-semibold">All Medicines</h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {medicines.map((med) => (
          <div key={med.id} onClick={() => navigate(`/medicine/${med.id}`)}>
            <img
              src={med.image}
              alt={med.name}
              className="w-full h-32 object-cover rounded-xl"
            />
            <p className="font-medium">{med.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMedicinesPage;

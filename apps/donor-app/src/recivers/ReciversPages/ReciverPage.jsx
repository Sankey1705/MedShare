// src/pages/ReceiverPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../../component/BottomNav";
import bikeImg from "../../asset/receiver_bike.png"; 
import MedicineCardReciver from "../ReciversComponents/MedicineCardReciver"; 
import Header from "../../component/Header"; 
import med1 from "../../asset/medicine1.jpg";

const ReceiverPage = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("availableMedicines");
    if (saved) {
      setMedicines(JSON.parse(saved));
    } else {
      setMedicines([
        {
          id: 1,
          name: "Medicine Name",
          description: "Necessitati Dignissimos Dignissimos Repre",
          category: "Liver Medicines",   // ✅ changed tag → category
          expiry: "21/05/2027",
          image: med1,   // ✅ fixed image import
        },
        {
          id: 2,
          name: "Medicine Name",
          description: "Necessitati Dignissimos Dignissimos Repre",
          category: "Liver Medicines",   // ✅ changed tag → category
          expiry: "20/05/2026",
             // ✅ will fallback if missing
        },
      ]);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* ✅ Reusable Header */}
      <Header userType="Receiver" switchTo="Donor" bikeImage={bikeImg} />

      {/* Search Bar */}
      <div className="p-4">
        <h3 className="font-semibold mb-2">Search For Medicines</h3>
        <input
          type="text"
          placeholder="Search for medicines"
          className="w-full border rounded-full px-4 py-2 focus:ring focus:outline-none"
        />
      </div>

      {/* Medicine List */}
      <div className="p-4 flex-1 overflow-y-auto">
        <h3 className="font-semibold mb-2">Available Medicines</h3>
        <div className="grid grid-cols-2 gap-4">
          {medicines.map((med) => (
            <div key={med.id} onClick={() => navigate(`/medicine/${med.id}`)}>
              <MedicineCardReciver {...med} />
            </div>
          ))}
        </div>
      </div>

      <BottomNav userType="Receiver" />
    </div>
  );
};

export default ReceiverPage;

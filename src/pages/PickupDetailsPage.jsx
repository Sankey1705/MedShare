// src/pages/PickupDetailsPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MedicineCardArrving from "../component/MedicineCardArrving";
import UserDetailsCard from "../component/UserDetailsCard";
import medicineImg from "../asset/medicine.png"; // fallback if no image

const PickupDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const medicine = location.state || {}; // ✅ dynamic data passed from MedOverview

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">
          ←
        </button>
        <h2 className="text-xl font-semibold">Pickup Details</h2>
      </div>

      {/* Medicine Details (dynamic, arriving style) */}
      <MedicineCardArrving
        name={medicine.name || "Medicine Name"}
        description={medicine.description || "No description provided"}
        tag={medicine.category || "General"}
        expiry={medicine.expiry || "N/A"}
        image={
          medicine.receipt
            ? URL.createObjectURL(medicine.receipt)
            : medicineImg
        }
        status="Arriving Tomorrow For Pickup"
      />

      {/* User Details */}
      <UserDetailsCard
        name="John Doe"
        phone="+91 98765 43210"
        address="Zero Miles, Near Zero Miles Freedom Park Metro Station, Sitaburdi, 440022, Nagpur"
      />

      {/* Back Button */}
      <button
        onClick={() => navigate("/donor")}
        className="w-full bg-blue-500 text-white font-medium rounded-full py-3 hover:bg-blue-600 transition mt-6"
      >
        Back to Donor Page
      </button>
    </div>
  );
};

export default PickupDetailsPage;

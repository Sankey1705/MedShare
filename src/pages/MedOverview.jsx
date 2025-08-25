// src/pages/MedOverview.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MedicineCard from "../component/MedicineCard";
import UserDetailsCard from "../component/UserDetailsCard";
import medicineImg from "../asset/medicine.png"; // fallback image

const MedOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formData = location.state || {}; // ✅ data from Scanner

  const handleEditDetails = () => {
    navigate("/edit-details", { state: formData }); // pass existing data
  };

  const handleConfirmPickup = () => {
    navigate("/pickup-details", { state: formData }); // ✅ pass data to next page
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">
          ←
        </button>
        <h2 className="text-xl font-semibold">Confirm Pickup</h2>
      </div>

      {/* Medicine Info */}
      <div className="bg-white rounded-xl shadow border p-4 mb-4">
        <MedicineCard
          name={formData.name || "Medicine Name"}
          description={formData.description || "Medicine description goes here"}
          tag={formData.category || "General"}
          expiry={formData.expiry || "DD/MM/YYYY"}
          image={formData.scannedImage || medicineImg} // ✅ scanned image from Scanner
        />
      </div>

      {/* User Details */}
      <UserDetailsCard
        name={formData.userName || "John Doe"}
        phone={formData.phone || "+91 98765 43210"}
        address={
          formData.address ||
          "Zero Miles, Near Zero Miles Freedom Park Metro Station, Sitaburdi, Nagpur"
        }
        onEdit={handleEditDetails}
      />

      {/* Confirm Button */}
      <button
        onClick={handleConfirmPickup}
        className="w-full bg-blue-500 text-white rounded-full py-3 mt-auto hover:bg-blue-600 transition"
      >
        Confirm Pickup
      </button>
    </div>
  );
};

export default MedOverview;

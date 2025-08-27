// src/pages/PickupDetailsPage.jsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MedicineCard from "../component/MedicineCard";
import EditUserDetails from "../component/EditUserDetails";
import medicineImg from "../asset/medicine.png";

const PickupDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const medicine = location.state || {};

  const handleBackToDonor = () => {
    // ✅ Save final medicine details in localStorage with status
    const medicineData = {
      name: medicine.name || "Medicine Name",
      description: medicine.description || "No description provided",
      tag: medicine.category || "General",
      expiry: medicine.expiry || "N/A",
      image: medicine.scannedImage || medicineImg,
      status: "Arriving Tomorrow For Pickup", // ✅ use status
    };

    localStorage.setItem("medicineData", JSON.stringify(medicineData));

    navigate("/donor");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">
          ←
        </button>
        <h2 className="text-xl font-semibold">Pickup Details</h2>
      </div>

      {/* Medicine Details */}
      <MedicineCard
        name={medicine.name || "Medicine Name"}
        description={medicine.description || "No description provided"}
        tag={medicine.category || "General"}
        expiry={medicine.expiry || "N/A"}
        image={medicine.scannedImage || medicineImg}
        status="Arriving Tomorrow For Pickup" // ✅ use status prop
      />

      {/* User Details */}
      <EditUserDetails
        name={medicine.userName || "John Doe"}
        phone={medicine.phone || "+91 98765 43210"}
        address={
          medicine.address ||
          "Zero Miles, Near Zero Miles Freedom Park Metro Station, Sitaburdi, 440022, Nagpur"
        }
      />

      {/* Back Button */}
      <button
        onClick={handleBackToDonor}
        className="w-full bg-blue-500 text-white font-medium rounded-full py-3 hover:bg-blue-600 transition mt-6"
      >
        Back to Donor Page
      </button>
    </div>
  );
};

export default PickupDetailsPage;

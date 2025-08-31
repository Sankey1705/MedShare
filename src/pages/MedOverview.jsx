// src/pages/MedOverview.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import MedicineCard from "../component/MedicineCard";
import EditUserDetails from "../component/EditUserDetails";
import medicineImg from "../asset/medicine.png"; // fallback image

const MedOverview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { docId } = location.state || {}; // ✅ Donation docId passed from Scanner

  const [donation, setDonation] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ Fetch medicine + user details
  useEffect(() => {
    const fetchData = async () => {
      if (!docId) return;

      try {
        // 1. Get medicine donation
        const donationRef = doc(db, "donations", docId);
        const donationSnap = await getDoc(donationRef);

        if (donationSnap.exists()) {
          const donationData = donationSnap.data();
          setDonation(donationData);

          // 2. Fetch user details (assuming stored under "users/{uid}")
          if (donationData.userId) {
            const userRef = doc(db, "users", donationData.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
              setUser(userSnap.data());
            }
          }
        }
      } catch (error) {
        console.error("Error fetching donation:", error);
      }
    };

    fetchData();
  }, [docId]);

  const handleEditDetails = () => {
    navigate("/edit-details", { state: { ...donation, ...user } });
  };

  const handleConfirmPickup = () => {
    navigate("/pickup-details", { state: { ...donation, ...user } });
  };

  if (!donation) {
    return <p className="text-center mt-10">Loading donation details...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">←</button>
        <h2 className="text-xl font-semibold">Confirm Pickup</h2>
      </div>

      {/* Medicine Info */}
      <div className="bg-white rounded-xl shadow border p-4 mb-4">
        <MedicineCard
          name={donation.name || "Medicine Name"}
          description={donation.description || "Medicine description goes here"}
          tag={donation.category || "General"}
          expiry={donation.expiry || "DD/MM/YYYY"}
          image={donation.receiptBase64 || medicineImg}
        />
      </div>

      {/* User Details */}
      {user && (
        <EditUserDetails
  userId={donation.userId}   // ✅ so we can update Firestore
  name={user?.name || "John Doe"}
  phone={user?.phone || "Not provided"}
  address={user?.address || "No address available"}
/>
      )}

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

// src/pages/PickupDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import MedicineCard from "../component/MedicineCard";
import EditUserDetails from "../component/EditUserDetails";
import medicineImg from "../asset/medicine.png";

const PickupDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { docId } = location.state || {};

  const [donation, setDonation] = useState(null);
  const [user, setUser] = useState(null);

  // ✅ fetch donation + user from Firestore
  useEffect(() => {
    const fetchData = async () => {
      if (!docId) return;
      try {
        const donationRef = doc(db, "donations", docId);
        const donationSnap = await getDoc(donationRef);
        if (donationSnap.exists()) {
          const donationData = donationSnap.data();
          setDonation(donationData);

          if (donationData.userId) {
            const userRef = doc(db, "users", donationData.userId);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) setUser({ id: donationData.userId, ...userSnap.data() });
          }
        }
      } catch (err) {
        console.error("Error fetching details:", err);
      }
    };
    fetchData();
  }, [docId]);

  const handleBackToDonor = () => {
    navigate("/donor",{ state: { docId, ...donation, ...user }});
  };

  if (!donation) {
    return <p className="text-center mt-10">Loading pickup details...</p>;
  }


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
        name={donation.name || "Medicine Name"}
        description={donation.description || "No description provided"}
        tag={donation.category || "General"}
        expiry={donation.expiry || "N/A"}
        image={donation.scannedImage || medicineImg}
        status="Arriving Tomorrow For Pickup" // ✅ visible now
      />

      {/* User Details (read-only) */}
      {user && (
        <EditUserDetails
          userId={user.id}
          name={user.name}
          phone={user.phone}
          address={user.address}
          readOnly={true} // ✅ hide edit button
        />
      )}

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

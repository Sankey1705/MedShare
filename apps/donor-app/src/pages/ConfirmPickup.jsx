import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import MyDonationCard from "../component/MyDonationCard";
import EditUserDetails from "../component/EditUserDetails";
import medicineImg from "../asset/medicine.png";

const ConfirmPickup = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { docId } = location.state || {};

  const [donation, setDonation] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!docId) return;
      try {
        const donationRef = doc(db, "donations", docId);
        const snap = await getDoc(donationRef);
        if (snap.exists()) {
          setDonation(snap.data());
          const userRef = doc(db, "users", snap.data().userId);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) setUser(userSnap.data());
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [docId]);

  const handleConfirmPickup = async () => {
    if (!docId || !donation) return;
    try {
      await updateDoc(doc(db, "donations", docId), {
        status: "ready_for_pickup",
        pickupConfirmedAt: new Date(),
      });
      navigate("/pickup-details", { state: { docId, ...donation, ...user } });
    } catch (err) {
      console.error(err);
      alert("Failed to confirm pickup");
    }
  };

  if (!donation) return <p className="text-center mt-10">Loading donation...</p>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4">
      <div className="flex items-center mb-6">
        <button onClick={() => navigate(-1)} className="mr-3 text-xl">←</button>
        <h2 className="text-xl font-semibold">Confirm Pickup</h2>
      </div>

      <div className="bg-white rounded-xl shadow border p-4 mb-4">
        <MyDonationCard
          name={donation.name || "Medicine Name"}
          description={donation.description || "No description"}
          category={donation.category || "General"}
          expiry={donation.expiry || "DD/MM/YYYY"}
          imageUrl={donation.scannedImageUrl || medicineImg}
          status=""
        />
      </div>

      {user && (
        <EditUserDetails
          userId={donation.userId}
          name={user?.name || "John Doe"}
          phone={user?.phone || "Not provided"}
          address={user?.address || "No address available"}
        />
      )}

      <button onClick={handleConfirmPickup} className="w-full bg-blue-500 text-white rounded-full py-3 mt-auto hover:bg-blue-600 transition">
        Confirm Pickup
      </button>
    </div>
  );
};

export default ConfirmPickup;
